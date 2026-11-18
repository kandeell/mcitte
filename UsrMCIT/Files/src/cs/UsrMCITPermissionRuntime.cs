using System;
using System.Collections.Generic;
using System.Globalization;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;
namespace Terrasoft.Configuration
{
    public static class UsrMCITPermissionPolicy
    {
        private static readonly HashSet<string> ScreenFlags = new HashSet<string>(StringComparer.Ordinal) {
            "UsrCanView","UsrCanCreate","UsrCanEdit","UsrCanApprove","UsrCanAssign",
            "UsrCanExport","UsrCanConfigure","UsrCanActivate"
        };
        public static bool HasManagedRole(UserConnection c)
        {
            var query = (Select)new Select(c).Top(1).Column("r", "Id")
                .From("UsrMCITRole").As("r")
                .InnerJoin("SysAdminUnitInRole").As("m").On("m", "SysAdminUnitRoleId").IsEqual("r", "UsrRoleId")
                .Where("m", "SysAdminUnitId").IsEqual(Column.Parameter(c.CurrentUser.Id));
            return query.ExecuteScalar<Guid>() != Guid.Empty;
        }

        // One authoritative permission evaluator for custom MCIT server actions.
        // Every caller must pass a trusted constant, never a client-provided object/action.
        public static void DemandScreenAction(UserConnection c, string screenCode, string flag)
        {
            if (c == null) throw new ArgumentNullException("c");
            if (!ScreenFlags.Contains(flag))
                throw new ArgumentException("Unsupported MCIT action.");
            if (String.IsNullOrWhiteSpace(screenCode))
                throw new ArgumentException("Screen code is required.");

            // The shared resolver applies the same canonical mapping, active-role
            // status, direct native memberships and administrator exception as the UI.
            UsrMCITScreenAccess.Demand(c, screenCode, flag.Substring("UsrCan".Length));
        }

        // Backward-compatible entry point used by Resource Catalog entity listeners.
        // Do not allow unmanaged users through: lack of a grant must fail closed.
        public static bool CanUseScreen(UserConnection c, string moduleCode, string flag)
        {
            if (c == null) throw new ArgumentNullException("c");
            if (!ScreenFlags.Contains(flag))
                throw new ArgumentException("Unknown MCIT screen action.");
            if (String.IsNullOrWhiteSpace(moduleCode))
                throw new ArgumentException("Module code is required.");

            string requestedCode = moduleCode.StartsWith("MODULE:", StringComparison.OrdinalIgnoreCase)
                ? moduleCode : "MODULE:" + moduleCode.Trim();
            var access = UsrMCITScreenAccess.Resolve(c, requestedCode);
            return access.Success && access.Allows(flag.Substring("UsrCan".Length));
        }

        public static bool CanViewReport(UserConnection c, string reportCode)
        {
            if (c.DBSecurityEngine.GetCanExecuteOperation("CanManageAdministration")) return true;
            return HasFlag(c, "UsrMCITRoleReportingPermission", "UsrReportId", "UsrMCITPermissionReport",
                "UsrReportCode", reportCode, "UsrCanView");
        }
        private static bool HasFlag(UserConnection c, string permission, string foreignKey, string catalog,
            string codeColumn, string code, string flag)
        {
            var query = (Select)new Select(c).Top(1).Column("p", "Id").From(permission).As("p")
                .InnerJoin("UsrMCITRole").As("r").On("r", "Id").IsEqual("p", "UsrMCITRoleId")
                .InnerJoin("SysAdminUnit").As("n").On("n", "Id").IsEqual("r", "UsrRoleId")
                .InnerJoin("SysAdminUnitInRole").As("m").On("m", "SysAdminUnitRoleId").IsEqual("n", "Id")
                .InnerJoin(catalog).As("d").On("d", "Id").IsEqual("p", foreignKey)
                .Where("m", "SysAdminUnitId").IsEqual(Column.Parameter(c.CurrentUser.Id))
                .And("n", "Active").IsEqual(Column.Parameter(true))
                .And("d", "UsrIsActive").IsEqual(Column.Parameter(true))
                .And("d", codeColumn).IsEqual(Column.Parameter(code))
                .And("p", flag).IsEqual(Column.Parameter(true));
            return query.ExecuteScalar<Guid>() != Guid.Empty;
        }
    }
    public static class UsrMCITAdministrativePermissionBridge
    {
        // Only verified native equivalents are mapped. SLA management and audit export stay
        // MCIT application flags; neither silently grants broad solution/export permissions.
        public static readonly Dictionary<string, string> NativeOperations = new Dictionary<string, string> {
            {"UsrCanManageUsers","CanManageUsers"},
            {"UsrCanManageRoles","CanManageAdministration"},
            {"UsrCanManageWorkflows","CanManageProcessDesign"},
            {"UsrCanViewAuditLog","CanViewSysOperationAudit"},
            {"UsrCanSystemConfigure","CanManageSolution"}
        };
        public static Dictionary<string, bool> ReadFlags(Entity entity)
        {
            var result = new Dictionary<string, bool>();
            foreach (var item in NativeOperations) result[item.Key] = entity.GetTypedColumnValue<bool>(item.Key);
            return result;
        }
        public static void Apply(Entity entity, Dictionary<string, bool> before)
        {
            var c = entity.UserConnection;
            var role = c.EntitySchemaManager.GetInstanceByName("UsrMCITRole").CreateEntity(c);
            if (!role.FetchFromDB(entity.GetTypedColumnValue<Guid>("UsrMCITRoleId")))
                throw new InvalidOperationException("The owning MCIT role does not exist.");
            var engine = new UsrMCITRoleFormEngine(c);
            // Draft grants never reach the shared native identity.
            if (engine.IsStatus(role, "Draft")) return;
            Guid id = UsrMCITRolePolicy.ResolveLink(role.GetTypedColumnValue<Guid>("UsrRoleId"),
                role.GetTypedColumnValue<Guid>("UsrCreatioFunctionalRoleId"));
            var native = new Terrasoft.Core.Configuration.SysAdminUnit(c);
            if (id == Guid.Empty || !native.FetchFromDB(id)) throw new InvalidOperationException("Synchronize the MCIT role first.");
            UsrMCITRolePolicy.ValidateNativeRole(id, (int)native.SysAdminUnitTypeValue, (int)native.ConnectionType, native.ParentRoleId, native.Name);
            foreach (var item in NativeOperations)
            {
                bool next = entity.GetTypedColumnValue<bool>(item.Key);
                bool previous = before.ContainsKey(item.Key) && before[item.Key];
                if (next == previous) continue;
                c.DBSecurityEngine.CheckCanChangeAdminOperationGrantee();
                Guid operation = c.DBSecurityEngine.GetAdminOperationId(item.Value);
                if (operation == Guid.Empty) throw new InvalidOperationException("Required native operation is missing: " + item.Value);
                if (next && native.Active) c.DBSecurityEngine.SetAdminOperationGrantee(operation, id, true);
                else c.DBSecurityEngine.DeleteAdminOperationGrantee(operation, id);
            }
            c.DBSecurityEngine.ClearOperationRightsCache();
        }
        public static void ReconcileActiveRole(UserConnection c, Guid roleId)
        {
            var config = c.EntitySchemaManager.GetInstanceByName("UsrMCITRoleAdministrativePermission").CreateEntity(c);
            if (!config.FetchFromDB("UsrMCITRole", roleId)) return;
            var opposite = new Dictionary<string, bool>();
            foreach (var item in NativeOperations)
            {
                // Only explicitly enabled MCIT flags own a native grant on status changes.
                // False/default flags never remove unrelated target grants.
                bool enabled = config.GetTypedColumnValue<bool>(item.Key);
                opposite[item.Key] = enabled ? false : enabled;
            }
            Apply(config, opposite);
        }
        public static void ValidateGrantChange(Entity entity, Dictionary<string, bool> before)
        {
            foreach (var item in NativeOperations)
            {
                if (entity.GetTypedColumnValue<bool>(item.Key) == (before.ContainsKey(item.Key) && before[item.Key])) continue;
                entity.UserConnection.DBSecurityEngine.CheckCanChangeAdminOperationGrantee();
                if (entity.UserConnection.DBSecurityEngine.GetAdminOperationId(item.Value) == Guid.Empty)
                    throw new InvalidOperationException("Required native operation is missing: " + item.Value);
            }
        }
    }
}
namespace Terrasoft.Configuration.UsrMCIT.EntryPoints.EntityEventListeners
{
    [EntityEventListener(SchemaName = "UsrMCITRoleAdministrativePermission")]
    public class UsrMCITAdministrativeGrantEntityEventListener : BaseEntityEventListener
    {
        private static readonly System.Runtime.CompilerServices.ConditionalWeakTable<Entity, Dictionary<string, bool>> Snapshots =
            new System.Runtime.CompilerServices.ConditionalWeakTable<Entity, Dictionary<string, bool>>();
        public override void OnSaving(object sender, EntityBeforeEventArgs e)
        {
            base.OnSaving(sender, e); var entity = (Entity)sender;
            UsrMCITRoleSynchronization.ValidatePermission(entity);
            var existing = entity.Schema.CreateEntity(entity.UserConnection);
            var before = existing.FetchFromDB(entity.PrimaryColumnValue) ?
                UsrMCITAdministrativePermissionBridge.ReadFlags(existing) : new Dictionary<string, bool>();
            UsrMCITAdministrativePermissionBridge.ValidateGrantChange(entity, before);
            Snapshots.Remove(entity); Snapshots.Add(entity, before);
        }
        public override void OnSaved(object sender, EntityAfterEventArgs e)
        {
            base.OnSaved(sender, e); var entity = (Entity)sender; Dictionary<string, bool> before;
            if (!Snapshots.TryGetValue(entity, out before)) throw new InvalidOperationException("Administrative grant save snapshot is missing.");
            try { if (!UsrMCITRoleFormEngine.IsInternal) UsrMCITAdministrativePermissionBridge.Apply(entity, before); }
            finally { Snapshots.Remove(entity); }
        }
        public override void OnDeleting(object sender, EntityBeforeEventArgs e)
        {
            throw new InvalidOperationException("Clear administrative permission flags instead of deleting the configuration.");
        }
    }
    // Protect Add-on mutations even if a caller bypasses the Freedom UI buttons.
    // This does not replace native object/record permissions and does not elevate them.
    [EntityEventListener(SchemaName = "UsrMCITAddOn")]
    public class UsrMCITAddOnScreenPermissionListener : BaseEntityEventListener
    {
        public override void OnInserting(object sender, EntityBeforeEventArgs e)
        {
            base.OnInserting(sender, e);
            UsrMCITScreenAccess.Demand(((Entity)sender).UserConnection,
                "ADDON_CONFIGURATION", "Create");
        }

        public override void OnUpdating(object sender, EntityBeforeEventArgs e)
        {
            base.OnUpdating(sender, e);
            UsrMCITScreenAccess.Demand(((Entity)sender).UserConnection,
                "ADDON_CONFIGURATION", "Edit");
        }
    }

    [EntityEventListener(SchemaName = "UsrMCITResourceType")]
    public class UsrMCITResourceTypeEntityEventListener : BaseEntityEventListener
    {
        private static double? Number(Entity entity, string column)
        {
            object raw = entity.GetColumnValue(column); if (raw == null || raw == DBNull.Value) return null;
            double value = Convert.ToDouble(raw, CultureInfo.InvariantCulture);
            if (Double.IsNaN(value) || Double.IsInfinity(value)) throw new InvalidOperationException("Resource numeric values must be finite.");
            return value;
        }
        public override void OnSaving(object sender, EntityBeforeEventArgs e)
        {
            base.OnSaving(sender, e); var entity = (Entity)sender;
            string name = (entity.GetTypedColumnValue<string>("Name") ?? "").Trim();
            string code = (entity.GetTypedColumnValue<string>("UsrCode") ?? "").Trim();
            if (name.Length == 0 || code.Length == 0) throw new InvalidOperationException("Resource name and code are required.");
            entity.SetColumnValue("Name", name); entity.SetColumnValue("UsrCode", code);
            var duplicate = (Select)new Select(entity.UserConnection).Top(1).Column("Id").From("UsrMCITResourceType")
                .Where("UsrCode").IsEqual(Column.Parameter(code))
                .And("Id").IsNotEqual(Column.Parameter(entity.PrimaryColumnValue));
            if (duplicate.ExecuteScalar<Guid>() != Guid.Empty) throw new InvalidOperationException("Resource code already exists.");
            double? min = Number(entity, "UsrMinValue"), max = Number(entity, "UsrMaxValue"), step = Number(entity, "UsrIncrement");
            if (min.HasValue && min < 0 || max.HasValue && max < 0 || step.HasValue && step < 0)
                throw new InvalidOperationException("Resource limits and increments cannot be negative.");
            if (min.HasValue && max.HasValue && min > max) throw new InvalidOperationException("Minimum exceeds maximum.");
            var start = entity.GetTypedColumnValue<DateTime>("UsrStartDate");
            var end = entity.GetTypedColumnValue<DateTime>("UsrEndDate");
            if (start != DateTime.MinValue && end != DateTime.MinValue && start > end)
                throw new InvalidOperationException("End date precedes start date.");
        }
        public override void OnInserting(object sender, EntityBeforeEventArgs e)
        {
            base.OnInserting(sender, e);
            if (!UsrMCITPermissionPolicy.CanUseScreen(((Entity)sender).UserConnection, "UsrMCITResourceType", "UsrCanCreate"))
                throw new UnauthorizedAccessException("MCIT Resource Catalog creation permission is required.");
        }
        public override void OnUpdating(object sender, EntityBeforeEventArgs e)
        {
            base.OnUpdating(sender, e);
            if (!UsrMCITPermissionPolicy.CanUseScreen(((Entity)sender).UserConnection, "UsrMCITResourceType", "UsrCanEdit"))
                throw new UnauthorizedAccessException("MCIT Resource Catalog editing permission is required.");
        }
    }
}
