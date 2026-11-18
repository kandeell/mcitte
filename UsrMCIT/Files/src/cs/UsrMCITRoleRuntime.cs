using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration
{
    // Owns only MCIT custom-role links and configuration. Never migrates users or memberships.
    public static class UsrMCITRolePolicy
    {
        public static Guid ResolveLink(Guid first, Guid second)
        {
            if (first != Guid.Empty && second != Guid.Empty && first != second)
                throw new InvalidOperationException("The two MCIT native-role links disagree.");
            return first != Guid.Empty ? first : second;
        }
        public static bool IsActive(string status)
        {
            if (String.Equals(status, "Active", StringComparison.OrdinalIgnoreCase)) return true;
            if (String.Equals(status, "Draft", StringComparison.OrdinalIgnoreCase) ||
                String.Equals(status, "Inactive", StringComparison.OrdinalIgnoreCase)) return false;
            throw new InvalidOperationException("Select an MCIT role status before synchronizing.");
        }
        public static Guid StableId(string key)
        {
            using (var sha = SHA256.Create())
            {
                var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes("UsrMCIT/" + key));
                var guidBytes = new byte[16]; Array.Copy(bytes, guidBytes, 16);
                return new Guid(guidBytes);
            }
        }
        public static void ValidateNativeRole(Guid id, int kind, int connectionType, Guid parent, string name)
        {
            if (id == Guid.Empty || kind != 6 || connectionType != 0 || parent == Guid.Empty ||
                String.Equals(name, "System administrators", StringComparison.OrdinalIgnoreCase) ||
                String.Equals(name, "All employees", StringComparison.OrdinalIgnoreCase) ||
                String.Equals(name, "All external users", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("The mapped identity is not an editable internal functional role.");
        }
    }

    public static class UsrMCITRoleSynchronization
    {
        private static readonly Guid AllEmployees = new Guid("a29a3ba5-4b0d-de11-9a51-005056c00008");
        public static void DemandAdministrator(UserConnection connection)
        {
            connection.DBSecurityEngine.CheckCanExecuteOperation("CanManageAdministration");
        }
        private static Entity NewEntity(UserConnection connection, string schema)
        {
            return connection.EntitySchemaManager.GetInstanceByName(schema).CreateEntity(connection);
        }
        private static Guid ReadId(UserConnection connection, string schema, string column, object value)
        {
            return ((Select)new Select(connection).Top(1).Column("Id").From(schema)
                .Where(column).IsEqual(Column.Parameter(value))).ExecuteScalar<Guid>();
        }
        private static void Save(Entity entity)
        {
            if (!entity.Save()) throw new InvalidOperationException("Creatio did not save " + entity.Schema.Name + ".");
        }
        public static Guid Synchronize(UserConnection connection, Guid mcitRoleId)
        {
            DemandAdministrator(connection);
            using (var executor = connection.EnsureDBConnection())
            {
                bool ownsTransaction = executor.TransactionDepth == 0;
                if (ownsTransaction) executor.StartTransaction(IsolationLevel.Serializable);
                try
                {
                    new CustomQuery(connection, @"
DECLARE @r int;
EXEC @r = sys.sp_getapplock @Resource=N'UsrMCITRoleFormService.v1',
 @LockMode=N'Exclusive', @LockOwner=N'Transaction', @LockTimeout=15000;
IF @r < 0 THROW 51000, 'Role configuration is busy. Retry shortly.', 1;").Execute(executor);
                    var mcit = NewEntity(connection, "UsrMCITRole");
                    if (!mcit.FetchFromDB(mcitRoleId)) throw new InvalidOperationException("MCIT role does not exist.");
                    string name = (mcit.GetTypedColumnValue<string>("UsrName") ?? "").Trim();
                    if (name.Length == 0) throw new InvalidOperationException("Role name is required.");
                    Guid linked = UsrMCITRolePolicy.ResolveLink(
                        mcit.GetTypedColumnValue<Guid>("UsrRoleId"),
                        mcit.GetTypedColumnValue<Guid>("UsrCreatioFunctionalRoleId"));
                    // A version draft shares its source identity but never renames/disables it.
                    var engine = new UsrMCITRoleFormEngine(connection);
                    engine.RequireManager();
                    var markers = engine.Rows("UsrMCITRoleChangeLog", "UsrMCITRole", mcitRoleId)
                        .Where(x => engine.Text(x, "UsrFieldName") == UsrMCITRoleFormEngine.DraftMarker).ToList();
                    var inPlaceMarkers = engine.Rows("UsrMCITRoleChangeLog", "UsrMCITRole", mcitRoleId)
                        .Where(x => engine.Text(x, "UsrFieldName") == UsrMCITRoleFormEngine.InPlaceDraftMarker).ToList();
                    bool inPlaceDraft = engine.IsStatus(mcit, "Draft") && inPlaceMarkers.Count > 0 &&
                        inPlaceMarkers.All(x => String.Equals(engine.Text(x, "UsrOldValue"),
                            mcitRoleId.ToString(), StringComparison.OrdinalIgnoreCase));
                    bool shared = linked != Guid.Empty && engine.Versions(linked)
                        .Any(x => x.PrimaryColumnValue != mcitRoleId);
                    // Legacy cloned drafts leave the source native role active.
                    // In-place drafts must instead reach the normal status synchronizer,
                    // disabling their own native role while the configuration is edited.
                    if (markers.Count > 0 || (shared && engine.IsStatus(mcit, "Draft") && !inPlaceDraft))
                    {
                        if (markers.Count != 1 || linked == Guid.Empty)
                            throw new InvalidOperationException("Shared draft lineage is missing or ambiguous. Restore/review its history before provisioning.");
                        Guid sourceId;
                        if (!Guid.TryParse(engine.Text(markers[0], "UsrOldValue"), out sourceId))
                            throw new InvalidOperationException("Invalid draft source.");
                        var source = engine.Read("UsrMCITRole", sourceId);
                        if (engine.Id(source, "UsrRole") != linked)
                            throw new InvalidOperationException("Draft and source role links differ.");
                        var mapped = new Terrasoft.Core.Configuration.SysAdminUnit(connection);
                        if (!mapped.FetchFromDB(linked)) throw new InvalidOperationException("Source native role is missing.");
                        UsrMCITRolePolicy.ValidateNativeRole(linked, (int)mapped.SysAdminUnitTypeValue,
                            (int)mapped.ConnectionType, mapped.ParentRoleId, mapped.Name);
                        EnsureConfiguration(connection, mcitRoleId);
                        if (ownsTransaction) executor.CommitTransaction();
                        return linked;
                    }
                    if (shared)
                    {
                        bool otherActive = engine.Versions(linked).Any(x =>
                            x.PrimaryColumnValue != mcitRoleId && engine.IsStatus(x, "Active"));
                        if (otherActive)
                            throw new InvalidOperationException("Another active MCIT record owns this native role. Review the version mapping.");
                        if (engine.IsStatus(mcit, "Inactive"))
                        {
                            bool provenSource = engine.Rows("UsrMCITRoleChangeLog", "UsrFieldName", UsrMCITRoleFormEngine.DraftMarker)
                                .Any(x => String.Equals(engine.Text(x, "UsrOldValue"), mcitRoleId.ToString(), StringComparison.OrdinalIgnoreCase));
                            if (!provenSource) throw new InvalidOperationException("Shared inactive role has no surviving source lineage. Review it before synchronization.");
                        }
                    }
                    Guid nativeId = linked == Guid.Empty ? mcitRoleId : linked;
                    var native = new Terrasoft.Core.Configuration.SysAdminUnit(connection);
                    bool exists = native.FetchFromDB(nativeId);
                    if (!exists && linked != Guid.Empty)
                        throw new InvalidOperationException("The mapped native role no longer exists. Review the mapping.");
                    if (exists)
                    {
                        UsrMCITRolePolicy.ValidateNativeRole(native.Id, (int)native.SysAdminUnitTypeValue,
                            (int)native.ConnectionType, native.ParentRoleId, native.Name);
                    }
                    var duplicate = ((Select)new Select(connection).Top(1).Column("Id").From("SysAdminUnit")
                        .Where("Name").IsEqual(Column.Parameter(name))
                        .And("Id").IsNotEqual(Column.Parameter(nativeId))).ExecuteScalar<Guid>();
                    if (duplicate != Guid.Empty)
                        throw new InvalidOperationException("A native identity already uses this name. Map the existing functional role explicitly.");
                    Guid statusId = mcit.GetTypedColumnValue<Guid>("UsrMCITRoleStatusesId");
                    var status = NewEntity(connection, "UsrMCITRoleStatus");
                    if (statusId == Guid.Empty || !status.FetchFromDB(statusId))
                        throw new InvalidOperationException("Role status does not exist.");
                    bool active = UsrMCITRolePolicy.IsActive(status.GetTypedColumnValue<string>("Name"));
                    if (!exists)
                    {
                        var anchor = new Terrasoft.Core.Configuration.SysAdminUnit(connection);
                        if (!anchor.FetchFromDB(AllEmployees))
                            throw new InvalidOperationException("The native All employees anchor is missing.");
                        native.SetDefColumnValues(); native.Id = nativeId; native.Name = name;
                        native.SysAdminUnitTypeValue = SysAdminUnitType.FunctionalRole;
                        native.ConnectionType = UserType.General; native.ParentRoleId = AllEmployees;
                    }
                    if (!exists || native.Name != name || native.Active != active)
                    {
                        native.Name = name; native.Active = active; Save(native);
                    }
                    bool changed = mcit.GetTypedColumnValue<Guid>("UsrRoleId") != nativeId ||
                        mcit.GetTypedColumnValue<Guid>("UsrCreatioFunctionalRoleId") != nativeId ||
                        !String.IsNullOrEmpty(mcit.GetTypedColumnValue<string>("UsrProvisioningError"));
                    if (changed)
                    {
                        mcit.SetColumnValue("UsrRoleId", nativeId);
                        mcit.SetColumnValue("UsrCreatioFunctionalRoleId", nativeId);
                        mcit.SetColumnValue("UsrProvisioningError", "");

                        using (UsrMCITRoleFormEngine.Internal())
                        {
                            Save(mcit);
                        }
                    }
                    EnsureConfiguration(connection, mcitRoleId);
                    if (!engine.IsStatus(mcit, "Draft"))
                        UsrMCITAdministrativePermissionBridge.ReconcileActiveRole(connection, mcitRoleId);
                    if (ownsTransaction) executor.CommitTransaction();
                    return nativeId;
                }
                catch
                {
                    if (ownsTransaction) executor.RollbackTransaction();
                    throw;
                }
            }
        }
        private static void EnsureChild(UserConnection connection, string schema, Guid roleId,
            string lookupColumn, Guid lookupId)
        {
            var values = new Dictionary<string, object> { { "UsrMCITRoleId", roleId } };
            if (lookupColumn != null) values.Add(lookupColumn, lookupId);
            var child = NewEntity(connection, schema);
            var existing = (Select)new Select(connection)
                .Top(1)
                .Column("Id")
                .From(schema)
                .Where("UsrMCITRoleId").IsEqual(Column.Parameter(roleId));

            if (lookupColumn != null)
            {
                existing.And(lookupColumn).IsEqual(Column.Parameter(lookupId));
            }

            if (existing.ExecuteScalar<Guid>() != Guid.Empty)
            {
                return;
            }
            child.SetDefColumnValues();
            child.PrimaryColumnValue = UsrMCITRolePolicy.StableId(schema + "/" + roleId + "/" + lookupId);
            foreach (var item in values) child.SetColumnValue(item.Key, item.Value);
            Save(child);
        }
        public static void EnsureConfiguration(UserConnection connection, Guid roleId)
        {
            UsrMCITRoleFormEngine.InitializeTrusted(connection, roleId);
        }
        // Discover actual registered target section schemas; no source page/module IDs.
        public static void EnsureCatalog(UserConnection connection)
        {
            UsrMCITRoleFormEngine.DiscoverTrusted(connection);
        }
        public static void ValidatePermission(Entity entity)
        {
            DemandAdministrator(entity.UserConnection);
            Guid roleId = entity.GetTypedColumnValue<Guid>("UsrMCITRoleId");
            var role = NewEntity(entity.UserConnection, "UsrMCITRole");
            if (roleId == Guid.Empty || !role.FetchFromDB(roleId))
                throw new InvalidOperationException("Save the owning MCIT role before changing permissions.");
            var select = (Select)new Select(entity.UserConnection).Top(1).Column("Id").From(entity.Schema.Name)
                .Where("UsrMCITRoleId").IsEqual(Column.Parameter(roleId))
                .And("Id").IsNotEqual(Column.Parameter(entity.PrimaryColumnValue));
            if (entity.Schema.Name != "UsrMCITRoleAdministrativePermission")
            {
                string foreignKey = entity.Schema.Name == "UsrMCITRoleReportingPermission" ? "UsrReportId" : "UsrScreenId";
                Guid value = entity.GetTypedColumnValue<Guid>(foreignKey);
                if (value == Guid.Empty) throw new InvalidOperationException("Select the permission definition.");
                select.And(foreignKey).IsEqual(Column.Parameter(value));
            }
            if (select.ExecuteScalar<Guid>() != Guid.Empty)
                throw new InvalidOperationException("This role already has this permission configuration.");
        }
    }
}
namespace Terrasoft.Configuration.UsrMCIT.EntryPoints.EntityEventListeners
{
    [EntityEventListener(SchemaName = "UsrMCITRole")]
    public class UsrMCITRoleEntityEventListener : BaseEntityEventListener
    {
        public override void OnSaving(object sender, EntityBeforeEventArgs e)
        {
            base.OnSaving(sender, e);
            UsrMCITRoleSynchronization.DemandAdministrator(((Entity)sender).UserConnection);
        }
        public override void OnSaved(object sender, EntityAfterEventArgs e)
        {
            base.OnSaved(sender, e); var entity = (Entity)sender;
            // Service-owned draft/archive saves must never mutate the source native role.
            if (UsrMCITRoleFormEngine.IsInternal) return;
            if (!entity.GetChangedColumnValues().Any(x => x.Name == "UsrName" ||
                x.Name == "UsrMCITRoleStatusesId" || x.Name == "UsrRoleCategoryId")) return;
            UsrMCITRoleSynchronization.Synchronize(entity.UserConnection, entity.PrimaryColumnValue);
        }
        public override void OnDeleting(object sender, EntityBeforeEventArgs e)
        {
            base.OnDeleting(sender, e);
            UsrMCITRoleSynchronization.DemandAdministrator(((Entity)sender).UserConnection);
            var entity = (Entity)sender;
            if (entity.GetTypedColumnValue<Guid>("UsrRoleId") != Guid.Empty || entity.GetTypedColumnValue<Guid>("UsrCreatioFunctionalRoleId") != Guid.Empty)
                throw new InvalidOperationException("Deactivate linked MCIT roles instead of deleting them. Native memberships are retained.");
        }
    }
    public abstract class UsrMCITPermissionEntityEventListener : BaseEntityEventListener
    {
        public override void OnSaving(object sender, EntityBeforeEventArgs e)
        {
            base.OnSaving(sender, e); UsrMCITRoleSynchronization.ValidatePermission((Entity)sender);
        }
        public override void OnDeleting(object sender, EntityBeforeEventArgs e)
        {
            base.OnDeleting(sender, e);
            UsrMCITRoleSynchronization.DemandAdministrator(((Entity)sender).UserConnection);
        }
    }
    [EntityEventListener(SchemaName = "UsrMCITRoleAdministrativePermission")]
    public class UsrMCITRoleAdministrativePermissionEntityEventListener : UsrMCITPermissionEntityEventListener { }
    [EntityEventListener(SchemaName = "UsrMCITRoleReportingPermission")]
    public class UsrMCITRoleReportingPermissionEntityEventListener : UsrMCITPermissionEntityEventListener { }
    [EntityEventListener(SchemaName = "UsrMCITRoleScreenPermission")]
    public class UsrMCITRoleScreenPermissionEntityEventListener : UsrMCITPermissionEntityEventListener { }
    [EntityEventListener(SchemaName = "SysModule")]
    public class UsrMCITModuleEntityEventListener : BaseEntityEventListener
    {
        public override void OnSaved(object sender, EntityAfterEventArgs e)
        {
            base.OnSaved(sender, e); var entity = (Entity)sender;
            if (!entity.UserConnection.DBSecurityEngine.GetCanExecuteOperation("CanManageAdministration")) return;
            if (!entity.GetChangedColumnValues().Any(x => x.Name == "Code" || x.Name == "Caption" ||
                x.Name == "SectionSchemaUId")) return;
            UsrMCITRoleSynchronization.EnsureCatalog(entity.UserConnection);
        }
    }
}
