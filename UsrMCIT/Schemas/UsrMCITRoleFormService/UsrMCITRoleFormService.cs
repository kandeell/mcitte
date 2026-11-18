// ONE Creatio Source code schema: UsrMCITRoleFormService
// Target: .NET Framework Creatio on SQL Server. Requires existing UsrMCIT objects.
// Configuration management, NOT a global replacement for native Creatio authorization.
namespace Terrasoft.Configuration
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Runtime.CompilerServices;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using Terrasoft.Common;
    using Terrasoft.Core;
    using Terrasoft.Core.DB;
    using Terrasoft.Core.Entities;
    using Terrasoft.Core.Entities.Events;
    using Terrasoft.Web.Common;

    [DataContract]
    public class UsrMCITRoleFormResult
    {
        [DataMember] public bool Success { get; set; }
        [DataMember] public string Message { get; set; }
        [DataMember] public Guid RoleId { get; set; }
        [DataMember] public Guid NativeRoleId { get; set; }
        [DataMember] public string Status { get; set; }
        [DataMember] public bool CanManage { get; set; }
        [DataMember] public bool CanEdit { get; set; }
        [DataMember] public bool CanCreateDraft { get; set; }
        [DataMember] public bool CanActivate { get; set; }
        [DataMember] public bool CanDeactivate { get; set; }
        [DataMember] public bool CanDiscardDraft { get; set; }
        [DataMember] public bool CanAssign { get; set; }
        [DataMember] public Guid DraftStatusId { get; set; }
    }

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrMCITRoleFormService : BaseService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        public UsrMCITRoleFormResult Execute(string action, Guid roleId, Guid userId)
        {
            try {
                var engine = new UsrMCITRoleFormEngine(UserConnection);
                engine.RequireManager();
                engine.ValidateSchema();
                if (action == "Inspect") return engine.Inspect(roleId, "Configuration loaded.");
                // Serializes service mutations across IIS workers on SQL Server; no user SQL.
                using (var db = UserConnection.EnsureDBConnection()) {
                    db.StartTransaction();
                    try {
                        new CustomQuery(UserConnection, @"
DECLARE @r int;
EXEC @r = sys.sp_getapplock @Resource=N'UsrMCITRoleFormService.v1',
    @LockMode=N'Exclusive', @LockOwner=N'Transaction', @LockTimeout=15000;
IF @r < 0 THROW 51000, 'Role configuration is busy. Retry shortly.', 1;").Execute(db);
                        using (UsrMCITRoleFormEngine.Internal()) {
                            string message;
                            switch (action) {
                                // Save flow: ensure an unsaved/new draft has exactly one administrative
                                // permission row and its lookup rows before native-role synchronization.
                                // Initialize is idempotent, keeps existing flags, and skips active/inactive roles.
                                case "Provision": engine.Initialize(roleId); UsrMCITRoleSynchronization.Synchronize(UserConnection, roleId); message = "Native role and configuration synchronized."; break;
                                case "RepairNative": engine.RepairNative(roleId); message = "Missing native role link repaired. No existing native role was adopted."; break;
                                case "Initialize": engine.Initialize(roleId); message = "Permission rows initialized. Existing flags were preserved."; break;
                                // Idempotent after merges: register MCIT workplace screens and seed
                                // missing role/screen links with all flags OFF, including active roles.
                                case "SyncScreens":
                                    int added = engine.SyncScreensAndRolePermissions();
                                    message = "MCIT screen discovery completed. Created " + added +
                                        " missing screen permission rows (all disabled).";
                                    break;
                                case "AbandonDraft": roleId = engine.AbandonDraft(roleId); message = "Draft archived without changing the source role."; break;
                                case "CreateDraft": roleId = engine.CreateDraft(roleId); UsrMCITDataScopeRuntime.ReconcileAllUsers(UserConnection); message = "This role is now an editable Draft. Its native functional role and managed grants are paused until activation."; break;
                                // Lifecycle actions skip automatic Provision in the Freedom UI, so initialize
                                // a draft here too. This repairs older drafts saved before the Save-flow fix.
                                case "Activate": engine.Initialize(roleId); roleId = engine.Activate(roleId); UsrMCITContractNativeRightsAutoSync.Reconcile(UserConnection, roleId); UsrMCITDataScopeRuntime.ReconcileAllUsers(UserConnection); message = "Configuration activated; object rights and managed record scopes synchronized."; break;
                                // Deletion is deliberately NOT exposed through native DataGrid delete.
                                // This action checks dependencies and cleans up MCIT-owned details transactionally.
                                case "DeleteRole":
                                    string deleteMessage = engine.DeleteRole(roleId, db);
                                    db.CommitTransaction();
                                    return new UsrMCITRoleFormResult {
                                        Success = true, RoleId = roleId, Status = "Deleted", CanManage = true,
                                        Message = deleteMessage
                                    };
                                case "Deactivate": engine.Deactivate(roleId); UsrMCITContractNativeRightsAutoSync.Reconcile(UserConnection, roleId); UsrMCITDataScopeRuntime.ReconcileAllUsers(UserConnection); message = "MCIT role deactivated; managed record scopes reconciled; memberships retained."; break;
                                case "Assign": engine.Assign(roleId, userId, true); UsrMCITDataScopeRuntime.ReconcileUser(UserConnection, userId); message = "User assigned. Sign out and back in before testing permissions."; break;
                                case "Unassign": engine.Assign(roleId, userId, false); UsrMCITDataScopeRuntime.ReconcileUser(UserConnection, userId); message = "Direct membership removed. Inherited access from other roles may remain."; break;
                                default: throw new InvalidOperationException("Unknown role action.");
                            }
                            var result = engine.Inspect(roleId, message);
                            db.CommitTransaction();
                            return result;
                        }
                    } catch { db.RollbackTransaction(); throw; }
                }
            } catch (Exception ex) {
                return new UsrMCITRoleFormResult { Success = false, Message = ex.Message, RoleId = roleId };
            }
        }
    }

    public sealed class UsrMCITRoleFormEngine
    {
        internal const string RoleSchema = "UsrMCITRole";
        internal const string StatusColumn = "UsrMCITRoleStatuses";
        internal const string DraftMarker = "__MCITDraftSourceV1";
        internal const string InPlaceDraftMarker = "__MCITInPlaceDraftV1";
        internal readonly UserConnection Uc;
        [ThreadStatic] private static int internalDepth;
        public static bool IsInternal { get { return internalDepth > 0; } }
        private sealed class InternalScope : IDisposable {
            public InternalScope() { internalDepth++; }
            public void Dispose() { internalDepth--; }
        }
        public static IDisposable Internal()
        {
            return new InternalScope();
        }
        public UsrMCITRoleFormEngine(UserConnection uc) { Uc = uc; }
        internal static readonly string[] ScreenFlags = {
            "UsrCanView", "UsrCanCreate", "UsrCanEdit", "UsrCanApprove", "UsrCanAssign",
            "UsrCanExport", "UsrCanConfigure", "UsrCanActivate"
        };
        internal static readonly string[] AdminFlags = {
            "UsrCanManageUsers", "UsrCanManageRoles", "UsrCanManageWorkflows", "UsrCanManageSLAPolicies",
            "UsrCanViewAuditLog", "UsrCanExportAuditLog", "UsrCanSystemConfigure"
        };
        internal static readonly Dictionary<string, string[]> Details = new Dictionary<string, string[]> {
            { "UsrMCITRoleScreenPermission", new [] { "UsrScreen" }.Concat(ScreenFlags).ToArray() },
            { "UsrMCITRoleDataScopeRule", new [] { "UsrScopeType", "UsrAllowedValues", "UsrDescription", "UsrSortOrder" } },
            { "UsrMCITRoleQueuePermission", new [] { "UsrQueue", "UsrIsEnabled" } },
            { "UsrMCITRoleReportingPermission", new [] { "UsrReport", "UsrCanView" } },
            { "UsrMCITRoleAdministrativePermission", AdminFlags }
        };
        internal static readonly Dictionary<string, string> Keys = new Dictionary<string, string> {
            { "UsrMCITRoleScreenPermission", "UsrScreen" },
            { "UsrMCITRoleDataScopeRule", "UsrScopeType" },
            { "UsrMCITRoleQueuePermission", "UsrQueue" },
            { "UsrMCITRoleReportingPermission", "UsrReport" },
            { "UsrMCITRoleAdministrativePermission", null }
        };
        public static void InitializeTrusted(UserConnection uc, Guid roleId) {
            var x = new UsrMCITRoleFormEngine(uc); x.RequireManager();
            using (Internal()) { x.Initialize(roleId); }
        }
        public static void DiscoverTrusted(UserConnection uc) {
            var x = new UsrMCITRoleFormEngine(uc); x.RequireManager();
            using (Internal()) { x.DiscoverScreens(); }
        }
        internal EntitySchema Schema(string name) { return Uc.EntitySchemaManager.GetInstanceByName(name); }
        internal EntitySchemaColumn Column(string schema, string name) {
var c = Schema(schema).Columns.FirstOrDefault(column => column.Name == name);            if (c == null) throw new InvalidOperationException("Missing schema column: " + schema + "." + name);
            return c;
        }
        // Entity APIs take a value name; ESQ filters take schema column names (NO guessed Id suffix).
        internal object Value(Entity e, string column) {
            return e.GetColumnValue(Column(e.Schema.Name, column).ColumnValueName);
        }
        internal Guid Id(Entity e, string column) {
            var v = Value(e, column); return v is Guid ? (Guid)v : Guid.Empty;
        }
        internal string Text(Entity e, string column) { var value = Value(e, column); return value is DateTime ? ((DateTime)value).ToString("O", CultureInfo.InvariantCulture) : (Convert.ToString(value, CultureInfo.InvariantCulture) ?? ""); }
        internal void Set(Entity e, string column, object value) {
            e.SetColumnValue(Column(e.Schema.Name, column).ColumnValueName, value);
        }
        internal Entity New(string schema) {
            var e = Schema(schema).CreateEntity(Uc); e.UseAdminRights = false;
            e.SetDefColumnValues(); e.PrimaryColumnValue = Guid.NewGuid(); return e;
        }
        internal Entity Read(string schema, Guid id) {
            var e = Schema(schema).CreateEntity(Uc); e.UseAdminRights = false;
            if (id == Guid.Empty || !e.FetchFromDB(id)) throw new InvalidOperationException("Record is missing or inaccessible: " + schema + " / " + id);
            return e;
        }
        internal List<Entity> Rows(string schema, string column = null, object value = null) {
            var q = new EntitySchemaQuery(Uc.EntitySchemaManager, schema) { UseAdminRights = false };
            q.PrimaryQueryColumn.IsAlwaysSelect = true; q.AddAllSchemaColumns();
            if (column != null) q.Filters.Add(q.CreateFilterWithParameters(FilterComparisonType.Equal, column, value));
            return q.GetEntityCollection(Uc).ToList();
        }
        internal void Save(Entity e) { if (!e.Save()) throw new InvalidOperationException("Save failed: " + e.Schema.Name); }
        internal void Delete(Entity e) { if (!e.Delete()) throw new InvalidOperationException("Delete failed: " + e.Schema.Name); }
        internal bool CanManage() { return Uc.DBSecurityEngine.GetCanExecuteOperation("CanManageUsers") && Uc.DBSecurityEngine.GetCanExecuteOperation("CanManageAdministration"); }
        internal void RequireManager() {
            Uc.DBSecurityEngine.CheckCanExecuteOperation("CanManageAdministration");
            if (!CanManage()) throw new UnauthorizedAccessException("The CanManageUsers system operation is required to manage roles.");
        }
        internal void ValidateSchema() {
            foreach (var c in new [] { "UsrName", "UsrDescription", "UsrRoleCategory", "UsrScopeBehavior", "UsrRole", StatusColumn }) Column(RoleSchema, c);
            foreach (var pair in Details) {
                Column(pair.Key, "UsrMCITRole"); foreach (var c in pair.Value) Column(pair.Key, c);
            }
            foreach (var c in new [] { "UsrScreenName", "UsrScreenCode", "UsrIsActive", "UsrSortOrder" }) Column("UsrMCITPermissionScreen", c);
            foreach (var c in new [] { "UsrMCITRole", "UsrFieldName", "UsrOldValue", "UsrNewValue", "UsrChangeType" }) Column("UsrMCITRoleChangeLog", c);
            if (Column("UsrMCITRoleScreenPermission", "UsrScreen").ReferenceSchema.Name != "UsrMCITPermissionScreen")
                throw new InvalidOperationException("UsrScreen must reference UsrMCITPermissionScreen.");
            StatusId("Draft"); StatusId("Active"); StatusId("Inactive");
        }
        internal Guid StatusId(string name) {
            var schema = Column(RoleSchema, StatusColumn).ReferenceSchema;
            var rows = Rows(schema.Name, schema.PrimaryDisplayColumn.Name, name);
            if (rows.Count != 1) throw new InvalidOperationException("Expected exactly one status named '" + name + "' in " + schema.Name + ".");
            return rows[0].PrimaryColumnValue;
        }
        internal string Status(Entity role) {
            var schema = Column(RoleSchema, StatusColumn).ReferenceSchema;
            Guid id = Id(role, StatusColumn); if (id == Guid.Empty) return "";
            return Text(Read(schema.Name, id), schema.PrimaryDisplayColumn.Name);
        }
        internal bool IsStatus(Entity role, string status) { return Id(role, StatusColumn) == StatusId(status); }
        internal List<Entity> Versions(Guid native) {
            return native == Guid.Empty ? new List<Entity>() : Rows(RoleSchema, "UsrRole", native);
        }
        internal UsrMCITRoleFormResult Inspect(Guid id, string message) {
            var r = new UsrMCITRoleFormResult { Success = true, RoleId = id, CanManage = CanManage(), Message = message, DraftStatusId = StatusId("Draft") };
            if (id == Guid.Empty) { r.Status = "Draft"; r.CanEdit = r.CanManage; return r; }
            var role = Read(RoleSchema, id); r.Status = Status(role); r.NativeRoleId = Id(role, "UsrRole");
            r.CanEdit = r.CanManage && IsStatus(role, "Draft");
            bool hasLineage = Rows("UsrMCITRoleChangeLog", "UsrMCITRole", id).Any(e => Text(e, "UsrFieldName") == DraftMarker);
            bool inPlaceDraft = Rows("UsrMCITRoleChangeLog", "UsrMCITRole", id).Any(e =>
                Text(e, "UsrFieldName") == InPlaceDraftMarker &&
                String.Equals(Text(e, "UsrOldValue"), id.ToString(), StringComparison.OrdinalIgnoreCase));
            bool shared = r.NativeRoleId != Guid.Empty && Versions(r.NativeRoleId).Any(e => e.PrimaryColumnValue != id);
            bool ambiguousDraft = IsStatus(role, "Draft") && shared && !hasLineage && !inPlaceDraft;
            r.CanCreateDraft = r.CanManage && !hasLineage && (IsStatus(role, "Active") || IsStatus(role, "Inactive"));
            r.CanDiscardDraft = r.CanEdit && hasLineage;
            r.CanActivate = r.CanEdit && !ambiguousDraft;
            r.CanDeactivate = r.CanManage && !hasLineage && IsStatus(role, "Active");
            r.CanAssign = r.CanManage && IsStatus(role, "Active") && r.NativeRoleId != Guid.Empty;
            return r;
        }
        internal void Log(Guid role, string field, object before, object after, string type) {
            if (field != DraftMarker && String.Equals(
                Convert.ToString(before, CultureInfo.InvariantCulture) ?? "",
                Convert.ToString(after, CultureInfo.InvariantCulture) ?? "", StringComparison.Ordinal)) return;
            using (Internal()) {
                var log = New("UsrMCITRoleChangeLog"); Set(log, "UsrMCITRole", role);
                Set(log, "UsrFieldName", field); Set(log, "UsrOldValue", Convert.ToString(before, CultureInfo.InvariantCulture) ?? "");
                Set(log, "UsrNewValue", Convert.ToString(after, CultureInfo.InvariantCulture) ?? "");
                Set(log, "UsrChangeType", type); Save(log);
            }
        }
        private Entity Native(Entity role) {
            Guid id = Id(role, "UsrRole"); if (id == Guid.Empty) return null;
            var native = Read("SysAdminUnit", id);
            if (Convert.ToInt32(Value(native, "SysAdminUnitTypeValue")) != 6)
                throw new InvalidOperationException("Linked Creatio role must be a functional role (type 6).");
            return native;
        }
        internal void RepairNative(Guid roleId) {
            UsrMCITRoleSynchronization.Synchronize(Uc, roleId);
        }
        internal void Initialize(Guid roleId) {
            var role = Read(RoleSchema, roleId);
            if (!IsStatus(role, "Draft")) return; // Never silently modify active/inactive configuration.
            DiscoverScreens();
            SeedLookup(roleId, "UsrMCITRoleScreenPermission", "UsrScreen");
            SeedLookup(roleId, "UsrMCITRoleQueuePermission", "UsrQueue");
            SeedLookup(roleId, "UsrMCITRoleReportingPermission", "UsrReport");
            var admins = Rows("UsrMCITRoleAdministrativePermission", "UsrMCITRole", roleId);
            if (admins.Count > 1) throw new InvalidOperationException("Duplicate administrative permission rows.");
            if (admins.Count == 0) {
                var e = New("UsrMCITRoleAdministrativePermission"); Set(e, "UsrMCITRole", roleId);
                foreach (var f in AdminFlags) Set(e, f, false); Save(e);
            }
            var scopeRows = Rows("UsrMCITRoleDataScopeRule", "UsrMCITRole", roleId);
            var defaults = new [] {
                new [] {"Contract Scope", "Assigned contracts only", "Limits access to assigned contracts"},
                new [] {"Authority Scope", "All", "Limits access to specific government authorities"},
                new [] {"Project Scope", "All", "Project-level filtering"}
            };
            for (int i = 0; i < defaults.Length; i++) {
                var d = defaults[i];
                if (scopeRows.Any(e => String.Equals(Text(e, "UsrScopeType"), d[0], StringComparison.OrdinalIgnoreCase))) continue;
                var scope = New("UsrMCITRoleDataScopeRule"); Set(scope, "UsrMCITRole", roleId);
                Set(scope, "UsrScopeType", d[0]); Set(scope, "UsrAllowedValues", d[1]);
                Set(scope, "UsrDescription", d[2]); Set(scope, "UsrSortOrder", (i + 1) * 10); Save(scope);
            }
            // These values retain the uploaded page defaults; record access requires server enforcement.
            ValidateDetails(roleId);
        }
       
private void DiscoverScreens()
{
    // Discover registered Creatio sections.
    // Reuse existing MCIT screen definitions.
    // Never modify existing permissions here.

    Column("SysModule", "Code");
    Column("SysModule", "Caption");

    var catalog = Rows("UsrMCITPermissionScreen");

    // Known Creatio module codes mapped to MCIT canonical codes.
    var canonicalModules = new Dictionary<string, string>(
        StringComparer.OrdinalIgnoreCase)
    {
        { "UsrMCITAddOn", "ADDON_CONFIGURATION" },
        { "UsrAdministrationHome", "ADMINISTRATION_HOME" },
        { "UsrMCITAuditLog", "AUDIT_LOG" },
        { "UsrMCITContract", "CONTRACTS" },
        { "UsrFinanceConfig", "FINANCE_CONFIGURATION" },
        { "UsrMCITLookupGroup", "LOOKUP_DATA" },
        { "UsrMCIT", "MCIT" },
        { "UsrProject", "PROJECTS" },
        { "UsrMCITReportCatalog", "REPORT_CATALOG" },
        { "UsrMCITResourceType", "RESOURCE_CATALOG" },
        { "UsrMCITRole", "ROLES" },
        { "UsrMCITPortalUserAccess", "USER_DIRECTORY" },
        { "UsrVirtualMachine", "VM_INVENTORY" }
    };

    // Detect genuine duplicate codes.
    foreach (var group in catalog.GroupBy(
        x => Text(x, "UsrScreenCode").Trim(),
        StringComparer.OrdinalIgnoreCase))
    {
        if (!String.IsNullOrWhiteSpace(group.Key) &&
            group.Count() > 1)
        {
            throw new InvalidOperationException(
                "Duplicate MCIT screen code: " + group.Key);
        }
    }

    var codes = new HashSet<string>(
        catalog.Select(x => Text(x, "UsrScreenCode").Trim()),
        StringComparer.OrdinalIgnoreCase);


var mcitWorkplaceIds = new HashSet<Guid>
{
    Guid.Parse("B9BD6DAF-0053-4FA6-A62E-80BEDBEFB64A"),
    Guid.Parse("C9969EEF-85A8-4D8C-87AB-5CB6DC4534A0"),
    Guid.Parse("D9F8B75B-2B8C-4C5A-BFC6-6363AD4705EE")
};

var allowedModuleIds = new HashSet<Guid>(
    Rows("SysModuleInWorkplace")
        .Where(link => mcitWorkplaceIds.Contains(
            Id(link, "SysWorkplace")))
        .Select(link => Id(link, "SysModule"))
);


foreach (var module in Rows("SysModule").Where(
    module =>
        allowedModuleIds.Contains(module.PrimaryColumnValue) &&
        Text(module, "Code").Trim().StartsWith(
            "Usr", StringComparison.OrdinalIgnoreCase)))
    {
        string rawCode = Text(module, "Code").Trim();
        string caption = Text(module, "Caption").Trim();

        if (String.IsNullOrWhiteSpace(rawCode) ||
            String.IsNullOrWhiteSpace(caption))
        {
            continue;
        }

        string moduleCode = rawCode;

        if (moduleCode.StartsWith(
            "MODULE:", StringComparison.OrdinalIgnoreCase))
        {
            moduleCode = moduleCode.Substring("MODULE:".Length);
        }

        string canonicalCode;
        bool isKnownMCITModule =
            canonicalModules.TryGetValue(
                moduleCode, out canonicalCode);

        string targetCode = isKnownMCITModule
            ? canonicalCode
            : rawCode;

        // Check canonical, raw and legacy module identifiers.
        // This also preserves inactive records.
        if (codes.Contains(targetCode) ||
            codes.Contains(moduleCode) ||
            codes.Contains("MODULE:" + moduleCode))
        {
            continue;
        }

        // Do not register an additional screen when
        // an existing definition already has its caption.
        bool nameExists = catalog.Any(x =>
            String.Equals(
                Text(x, "UsrScreenName").Trim(),
                caption,
                StringComparison.OrdinalIgnoreCase));

        if (nameExists)
        {
            continue;
        }

        // Register a genuinely new section once.
        var screen = New("UsrMCITPermissionScreen");

        Set(screen, "UsrScreenCode", targetCode);
        Set(screen, "UsrScreenName", caption);
        Set(screen, "UsrIsActive", true);
        Set(screen, "UsrSortOrder", 1000);

        Save(screen);

        codes.Add(targetCode);
        catalog.Add(screen);
    }
}

        // Run only from the manager-authorized Execute("SyncScreens") transaction and
        // Internal() scope. This method is additive and never changes existing grants.
        internal int SyncScreensAndRolePermissions()
        {
            DiscoverScreens();

            // Restrict seeding to Usr* modules that are actually in MCIT workplaces.
            // A module present in two workplaces is still counted once.
            var workplaceIds = new HashSet<Guid> {
                Guid.Parse("B9BD6DAF-0053-4FA6-A62E-80BEDBEFB64A"),
                Guid.Parse("C9969EEF-85A8-4D8C-87AB-5CB6DC4534A0"),
                Guid.Parse("D9F8B75B-2B8C-4C5A-BFC6-6363AD4705EE")
            };
            var moduleIds = new HashSet<Guid>(
                Rows("SysModuleInWorkplace")
                    .Where(link => workplaceIds.Contains(Id(link, "SysWorkplace")))
                    .Select(link => Id(link, "SysModule")));

            var moduleCodes = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var moduleCaptions = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            foreach (var module in Rows("SysModule")) {
                if (!moduleIds.Contains(module.PrimaryColumnValue)) continue;
                string code = Text(module, "Code").Trim();
                string caption = Text(module, "Caption").Trim();
                if (!code.StartsWith("Usr", StringComparison.OrdinalIgnoreCase) ||
                    String.IsNullOrWhiteSpace(caption)) continue;
                moduleCodes.Add(code);
                moduleCodes.Add("MODULE:" + code);
                moduleCaptions.Add(caption);
            }

            // Existing canonical codes (REPORT_CATALOG etc.) match by caption;
            // newly discovered module-code records match by code. Do not touch
            // unrelated Creatio permission screens.
            var screens = Rows("UsrMCITPermissionScreen")
                .Where(s => Convert.ToBoolean(Value(s, "UsrIsActive")) &&
                    (moduleCodes.Contains(Text(s, "UsrScreenCode").Trim()) ||
                     moduleCaptions.Contains(Text(s, "UsrScreenName").Trim())))
                .ToList();
            var screenIds = new HashSet<Guid>(screens.Select(s => s.PrimaryColumnValue));
            int created = 0;

            foreach (var role in Rows(RoleSchema)) {
                Guid roleId = role.PrimaryColumnValue;
                var existing = Rows("UsrMCITRoleScreenPermission", "UsrMCITRole", roleId)
                    .Where(p => screenIds.Contains(Id(p, "UsrScreen")))
                    .ToList();

                // Refuse to hide pre-existing duplicates; never overwrite grants.
                if (existing.GroupBy(p => Id(p, "UsrScreen"))
                        .Any(group => group.Count() > 1))
                    throw new InvalidOperationException(
                        "Duplicate MCIT screen permissions for role " + roleId);

                var assigned = new HashSet<Guid>(existing.Select(p => Id(p, "UsrScreen")));
                foreach (var screen in screens) {
                    Guid screenId = screen.PrimaryColumnValue;
                    if (!assigned.Add(screenId)) continue;

                    var grant = New("UsrMCITRoleScreenPermission");
                    Set(grant, "UsrMCITRole", roleId);
                    Set(grant, "UsrScreen", screenId);
                    foreach (var flag in ScreenFlags) Set(grant, flag, false);
                    Save(grant);
                    created++;
                }
            }
            return created;
        }

        private void SeedLookup(Guid role, string schema, string key) {
            var existing = Rows(schema, "UsrMCITRole", role);
            if (existing.GroupBy(e => Id(e, key)).Any(g => g.Count() > 1)) throw new InvalidOperationException("Duplicate rows: " + schema);
            var used = new HashSet<Guid>(existing.Select(e => Id(e, key)));
            var lookup = Column(schema, key).ReferenceSchema;
            foreach (var item in Rows(lookup.Name)) {
                if (lookup.Columns.Any(c => c.Name == "UsrIsActive") && !Convert.ToBoolean(Value(item, "UsrIsActive"))) continue;
                if (!used.Add(item.PrimaryColumnValue)) continue;
                var e = New(schema); Set(e, "UsrMCITRole", role); Set(e, key, item.PrimaryColumnValue);
                foreach (var f in Details[schema].Where(f => f.StartsWith("UsrCan") || f == "UsrIsEnabled")) Set(e, f, false);
                Save(e);
            }
        }
        internal void ValidateDetails(Guid role) {
            foreach (var pair in Keys) {
                var rows = Rows(pair.Key, "UsrMCITRole", role);
                if (pair.Value == null) {
                    if (rows.Count != 1) throw new InvalidOperationException("Exactly one administrative permission row is required.");
                } else {
                    var keys = rows.Select(e => Text(e, pair.Value).Trim()).ToArray();
                    if (keys.Any(k => String.IsNullOrEmpty(k) || k == Guid.Empty.ToString()) ||
                        keys.Distinct(StringComparer.OrdinalIgnoreCase).Count() != keys.Length)
                        throw new InvalidOperationException("Missing or duplicate key in " + pair.Key);
                }
                foreach (var e in rows) ValidateRow(e);
            }
        }
        internal void ValidateRow(Entity e) {
            if (e.Schema.Name == "UsrMCITRoleScreenPermission" &&
                ScreenFlags.Skip(1).Any(f => Convert.ToBoolean(Value(e, f))) && !Convert.ToBoolean(Value(e, "UsrCanView")))
                throw new InvalidOperationException("Enable View before granting another screen action.");
            if (e.Schema.Name == "UsrMCITRoleDataScopeRule") {
                string type = Text(e, "UsrScopeType").Trim();
                string mode = Text(e, "UsrAllowedValues").Trim();
                bool allowed =
                    (String.Equals(type, "Contract Scope", StringComparison.OrdinalIgnoreCase) &&
                        (String.Equals(mode, "All", StringComparison.OrdinalIgnoreCase) ||
                         String.Equals(mode, "Assigned contracts only", StringComparison.OrdinalIgnoreCase))) ||
                    (String.Equals(type, "Authority Scope", StringComparison.OrdinalIgnoreCase) &&
                        (String.Equals(mode, "All", StringComparison.OrdinalIgnoreCase) ||
                         String.Equals(mode, "Assigned authorities only", StringComparison.OrdinalIgnoreCase))) ||
                    (String.Equals(type, "Project Scope", StringComparison.OrdinalIgnoreCase) &&
                        (String.Equals(mode, "All", StringComparison.OrdinalIgnoreCase) ||
                         String.Equals(mode, "Assigned authority projects only", StringComparison.OrdinalIgnoreCase)));
                if (!allowed) throw new InvalidOperationException(
                    "Unsupported Data Scope rule: " + type + " / " + mode);
            }
        }
        // Convert the current role itself into a Draft. No extra MCIT role,
        // temporary name, cloned permission rows, or duplicate role ID is created.
        // The linked native role is paused so edits cannot be used until Activate.
        internal Guid CreateDraft(Guid roleId) {
            var role = Read(RoleSchema, roleId);
            if (!IsStatus(role, "Active") && !IsStatus(role, "Inactive"))
                throw new InvalidOperationException("Create Draft requires an Active or Inactive role.");
            if (Rows("UsrMCITRoleChangeLog", "UsrMCITRole", roleId)
                    .Any(e => Text(e, "UsrFieldName") == DraftMarker))
                throw new InvalidOperationException("A legacy version draft cannot be converted in place.");
            var native = Native(role);
            if (native == null || Id(role, "UsrCreatioFunctionalRole") != native.PrimaryColumnValue)
                throw new InvalidOperationException("Both native role links must agree before converting to Draft.");
            var versions = Versions(native.PrimaryColumnValue);
            if (versions.Any(v => v.PrimaryColumnValue != roleId &&
                    (IsStatus(v, "Draft") || IsStatus(v, "Active"))))
                throw new InvalidOperationException("Another active or draft version shares this native role. Resolve it first.");
            string previous = Status(role);
            Set(role, StatusColumn, StatusId("Draft"));
            Save(role);
            Log(roleId, InPlaceDraftMarker, roleId, previous, "In-place draft lineage");
            Log(roleId, "Form.Status", previous, "Draft", "Edit current role");
            // Important: unlike a version-copy draft, THIS role owns the native role.
            UsrMCITRoleSynchronization.Synchronize(Uc, roleId);
            RevokeNativeAdminOperations(roleId, native.PrimaryColumnValue);
            UsrMCITContractNativeRightsAutoSync.Reconcile(Uc, roleId);
            return roleId;
        }

        private void RevokeNativeAdminOperations(Guid roleId, Guid nativeId) {
            var rows = Rows("UsrMCITRoleAdministrativePermission", "UsrMCITRole", roleId);
            if (rows.Count > 1) throw new InvalidOperationException("Duplicate administrative permission rows.");
            if (rows.Count == 0) return;
            bool changed = false;
            foreach (var operation in UsrMCITAdministrativePermissionBridge.NativeOperations) {
                if (!Convert.ToBoolean(Value(rows[0], operation.Key))) continue;
                Uc.DBSecurityEngine.CheckCanChangeAdminOperationGrantee();
                Guid operationId = Uc.DBSecurityEngine.GetAdminOperationId(operation.Value);
                if (operationId == Guid.Empty)
                    throw new InvalidOperationException("Native operation is missing: " + operation.Value);
                Uc.DBSecurityEngine.DeleteAdminOperationGrantee(operationId, nativeId);
                changed = true;
            }
            if (changed) Uc.DBSecurityEngine.ClearOperationRightsCache();
        }
        // Delete only an unused Draft or Inactive MCIT configuration.
        // Delete the native functional role only when this MCIT role was its creator
        // (the provisioning service assigns the same GUID), no versions/users remain,
        // and Creatio itself permits the native entity deletion. Otherwise preserve it.
        // Called inside the service's SQL transaction, application lock, and Internal() scope.
        internal string DeleteRole(Guid roleId, DBExecutor db) {
            RequireManager();
            var role = Read(RoleSchema, roleId);
            string status = Status(role);
            if (status != "Draft" && status != "Inactive")
                throw new InvalidOperationException("Deactivate the role before deleting it. Active configurations cannot be deleted.");

            Guid nativeId = Id(role, "UsrRole");
            Guid alternateNativeId = Id(role, "UsrCreatioFunctionalRole");
            if (nativeId != Guid.Empty && alternateNativeId != Guid.Empty && nativeId != alternateNativeId)
                throw new InvalidOperationException("MCIT role native links disagree. Repair the links before deletion.");
            var siblings = Versions(nativeId).Where(e => e.PrimaryColumnValue != roleId).ToList();
            bool otherAlternateLinks = nativeId != Guid.Empty &&
                Rows(RoleSchema, "UsrCreatioFunctionalRole", nativeId)
                    .Any(e => e.PrimaryColumnValue != roleId);
            // The provisioning service creates the original native functional role
            // using the same Id as the MCIT role. Drafts share the source role Id.
            // Never delete a pre-existing/adopted or otherwise unproven SysAdminUnit.
            bool deleteOwnedNative = nativeId != Guid.Empty && nativeId == roleId &&
                siblings.Count == 0 && !otherAlternateLinks;
            Entity nativeForDeletion = null;
            if (deleteOwnedNative) {
                nativeForDeletion = Native(role); // Confirms SysAdminUnitTypeValue = 6.
                // Protect against roles used as parents of native user/role records.
                int childCount = new CustomQuery(Uc,
                    "SELECT COUNT(1) FROM dbo.SysAdminUnit WHERE ParentRoleId = '" +
                    nativeId.ToString("D") + "'").ExecuteScalar<int>(db);
                if (childCount != 0)
                    throw new InvalidOperationException("The native functional role has children. Move those assignments before deleting it.");
            }
            // A draft may link to the same native role as an active source. Never remove
            // that shared role or its users while deleting only the draft configuration.
            if (nativeId != Guid.Empty && siblings.Count == 0 &&
                Rows("SysUserInRole", "SysRole", nativeId).Count != 0)
                throw new InvalidOperationException("The linked Creatio role still has assigned users. Unassign them before deleting this last MCIT role version.");

            // Draft lineage is stored in change history, not a dedicated relationship.
            // Do not orphan a newer draft whose source is the role being deleted.
            if (Rows("UsrMCITRoleChangeLog", "UsrFieldName", DraftMarker)
                .Any(e => Id(e, "UsrMCITRole") != roleId &&
                    String.Equals(Text(e, "UsrOldValue").Trim(), roleId.ToString("D"), StringComparison.OrdinalIgnoreCase)))
                throw new InvalidOperationException("A different draft still depends on this source role. Discard or activate that draft before deleting the source.");

            // Fail closed if an unrelated Usr* table has a role lookup or FK.
            // SQL Server check is intentionally limited to dependency detection: no raw DELETE.
            // The only deleted tables are the explicit MCIT-owned tables below.
            EnsureNoExternalRoleReferences(roleId, db);

            // The installed Administrative Permission event listener deliberately refuses
            // normal Entity.Delete() operations (even when the service is authorized).
            // This service is the ONLY approved cleanup path. Verify that deleting an
            // Inactive configuration cannot silently leave previously granted operations.
            var adminRows = Rows("UsrMCITRoleAdministrativePermission", "UsrMCITRole", roleId);
            if (adminRows.Count > 1)
                throw new InvalidOperationException("Multiple administrative permission rows found; repair duplicates before deletion.");
            if (status == "Inactive" && adminRows.Any(a =>
                AdminFlags.Any(f => Convert.ToBoolean(Value(a, f)))))
                throw new InvalidOperationException(
                    "Inactive role still has enabled administrative flags. Revoke its native operations and clear the flags through an approved role change before deleting the configuration.");

            // Draft flags are staged settings; they were not published through Activate.
            // An Inactive role may be removed here only when all admin flags are false.
            // Native rights are managed by Creatio's own SysAdminUnit entity deletion;
            // never use a direct SQL DELETE against native security tables.
            foreach (var pair in Details) {
                foreach (var row in Rows(pair.Key, "UsrMCITRole", roleId)) {
                    if (pair.Key == "UsrMCITRoleAdministrativePermission")
                        DeleteOwnedRecordDirect(db, pair.Key, row.PrimaryColumnValue);
                    else
                        Delete(row);
                }
            }
            foreach (var log in Rows("UsrMCITRoleChangeLog", "UsrMCITRole", roleId)) Delete(log);

            // Delete the prevalidated MCIT row directly because an installed role
            // listener prevents ordinary deletes of linked configurations.
            DeleteOwnedRecordDirect(db, RoleSchema, roleId);

            if (deleteOwnedNative) {
                // Verify dependencies INSIDE the service transaction, after the
                // UsrMCITRole row has been deleted. The read-only SQL diagnostic
                // runs before deletion and naturally sees both native role FKs.
                // The GUID is generated by Guid.ToString, not from user SQL input.
                string nativeGuid = nativeId.ToString("D");
                int remainingLinks = new CustomQuery(Uc,
                    "SELECT COUNT(1) FROM dbo.UsrMCITRole " +
                    "WHERE UsrRoleId = '" + nativeGuid + "' " +
                    "OR UsrCreatioFunctionalRoleId = '" + nativeGuid + "'")
                    .ExecuteScalar<int>(db);
                if (remainingLinks != 0)
                    throw new InvalidOperationException(
                        "Native role deletion stopped: " + remainingLinks +
                        " MCIT role reference(s) still exist inside the transaction. " +
                        "No changes were committed.");

                // Keep Creatio's native entity deletion lifecycle and its checks.
                // Do NOT use raw DELETE on SysAdminUnit or disable system guards.
                bool nativeDeleteReturnedTrue;
                try {
                    // Keep the Creatio native entity lifecycle. Never issue SQL DELETE
                    // against SysAdminUnit or suppress its entity/event handlers.
                    nativeDeleteReturnedTrue = nativeForDeletion.Delete();
                } catch (Exception ex) {
                    throw new InvalidOperationException(
                        "Creatio functional-role deletion threw for " + nativeGuid +
                        ": " + ex.GetBaseException().Message +
                        ". Transaction will be rolled back.", ex);
                }

                // Some custom/native entity implementations may report false even
                // after the row is removed. Check the database using the SAME
                // DBExecutor/transaction before treating this as a completed delete.
                int nativeRowsRemaining = new CustomQuery(Uc,
                    "SELECT COUNT(1) FROM dbo.SysAdminUnit WHERE Id = '" +
                    nativeGuid + "'").ExecuteScalar<int>(db);
                int mcitLinksRemaining = new CustomQuery(Uc,
                    "SELECT COUNT(1) FROM dbo.UsrMCITRole WHERE UsrRoleId = '" +
                    nativeGuid + "' OR UsrCreatioFunctionalRoleId = '" +
                    nativeGuid + "'").ExecuteScalar<int>(db);
                if (nativeRowsRemaining != 0 || mcitLinksRemaining != 0) {
                    throw new InvalidOperationException(
                        "Native role deletion could not be verified for " + nativeGuid +
                        ". SysAdminUnit.Delete() returned " + nativeDeleteReturnedTrue +
                        "; remaining native rows=" + nativeRowsRemaining +
                        "; remaining MCIT links=" + mcitLinksRemaining +
                        ". Transaction will be rolled back.");
                }
                // The SQL row is absent and no MCIT link remains in the transaction.
                // A false API return is preserved in the message for investigation;
                // do not silently mask inconsistent platform behavior.
                return nativeDeleteReturnedTrue
                    ? "MCIT role and linked Creatio functional role deleted."
                    : "MCIT role and linked native role removed; verified in SQL inside " +
                      "the transaction although SysAdminUnit.Delete() returned false. " +
                      "Check functional-role cache and access after refreshing.";
            }
            return nativeId == Guid.Empty
                ? "MCIT role deleted. It had no linked native functional role."
                : "MCIT role deleted. Linked Creatio functional role was preserved " +
                  "because it is shared or cannot be proven to belong to this role.";
        }

        // Narrow, parameterized deletion for two MCIT-owned tables whose normal
        // entity deletion listeners prohibit cleanup. This bypasses *entity event
        // callbacks*, so the service must perform all authorization/dependency checks
        // BEFORE calling this helper; DB constraints/triggers still apply.
        private void DeleteOwnedRecordDirect(DBExecutor db, string schema, Guid id) {
            if (schema != RoleSchema && schema != "UsrMCITRoleAdministrativePermission")
                throw new InvalidOperationException("Direct deletion is not permitted for: " + schema);
            if (id == Guid.Empty) throw new InvalidOperationException("Missing record identifier.");
            int deleted = new Terrasoft.Core.DB.Delete(Uc)
                .From(schema).Where("Id").IsEqual(Terrasoft.Core.DB.Column.Parameter(id)).Execute(db);
            if (deleted != 1)
                throw new InvalidOperationException("Deletion did not affect exactly one " + schema + " row.");
        }

        private void EnsureNoExternalRoleReferences(Guid roleId, DBExecutor db) {
            // GUID is a typed value, not supplied SQL. Names come only from SQL Server catalog
            // metadata and are escaped with QUOTENAME in the generated SELECT queries.
            // Known detail and audit tables are intentionally excluded: DeleteRole cleans them.
            string sql = @"
DECLARE @roleId uniqueidentifier = '" + roleId.ToString("D") + @"';
DECLARE @found int = 0;
DECLARE @check nvarchar(max) = N'';
SELECT @check = @check + CAST(
    N'IF EXISTS (SELECT TOP (1) 1 FROM ' + QUOTENAME(s.name) + N'.' + QUOTENAME(t.name)
    + N' WHERE ' + QUOTENAME(c.name) + N' = @p) SET @hit=1;' AS nvarchar(max))
FROM sys.tables t
JOIN sys.schemas s ON t.schema_id = s.schema_id
JOIN sys.columns c ON c.object_id = t.object_id
WHERE t.name LIKE N'Usr%'
  AND c.system_type_id = 36
  AND t.name NOT IN (
      N'UsrMCITRole', N'UsrMCITRoleChangeLog', N'UsrMCITRoleScreenPermission',
      N'UsrMCITRoleDataScopeRule', N'UsrMCITRoleQueuePermission',
      N'UsrMCITRoleReportingPermission', N'UsrMCITRoleAdministrativePermission'
  )
  AND (c.name IN (N'UsrMCITRoleId', N'UsrMCITRole', N'RoleId')
       OR EXISTS (SELECT 1 FROM sys.foreign_key_columns fk
           WHERE fk.parent_object_id = t.object_id AND fk.parent_column_id = c.column_id
             AND fk.referenced_object_id = OBJECT_ID(N'dbo.UsrMCITRole')));
IF LEN(@check) > 0
    EXEC sys.sp_executesql @check, N'@p uniqueidentifier, @hit int OUTPUT',
        @p=@roleId, @hit=@found OUTPUT;
SELECT @found;";
            if (new CustomQuery(Uc, sql).ExecuteScalar<int>(db) != 0)
                throw new InvalidOperationException("Other MCIT records still reference this role. Remove those links before deleting it.");
        }

        internal Guid AbandonDraft(Guid id) {
            var draft = Read(RoleSchema, id);
            if (!IsStatus(draft, "Draft")) throw new InvalidOperationException("Only a draft can be discarded.");
            var markers = Rows("UsrMCITRoleChangeLog", "UsrMCITRole", id).Where(e => Text(e, "UsrFieldName") == DraftMarker).ToList();
            if (markers.Count != 1) throw new InvalidOperationException("This is not a version draft. No record was deleted.");
            Guid source = Guid.Parse(Text(markers[0], "UsrOldValue")); Read(RoleSchema, source);
            Set(draft, "UsrName", "Discarded draft " + id.ToString("N"));
            Set(draft, StatusColumn, StatusId("Inactive")); Save(draft);
            Log(id, "Form.Discarded", "Draft", "Inactive", "Discard draft");
            return source;
        }
        internal Guid Activate(Guid roleId) {
            var draft = Read(RoleSchema, roleId);
            if (!IsStatus(draft, "Draft")) throw new InvalidOperationException("Only a draft can be activated.");
            ValidateDetails(roleId);
            if (String.IsNullOrWhiteSpace(Text(draft, "UsrName"))) throw new InvalidOperationException("Role Name is required.");
            if (Id(draft, "UsrRoleCategory") == Guid.Empty || Id(draft, "UsrScopeBehavior") == Guid.Empty)
                throw new InvalidOperationException("Role Category and Scope Behavior are required before activation.");
            var markers = Rows("UsrMCITRoleChangeLog", "UsrMCITRole", roleId).Where(e => Text(e, "UsrFieldName") == DraftMarker).ToList();
            if (markers.Count > 1) throw new InvalidOperationException("Duplicate draft lineage.");
            Entity source = null;
            string name = Text(draft, "UsrName").Trim();
            if (markers.Count == 1) {
                source = Read(RoleSchema, Guid.Parse(Text(markers[0], "UsrOldValue")));
                if (Text(source, "ModifiedOn") != Text(markers[0], "UsrNewValue")) throw new InvalidOperationException("Source role changed since drafting. Activation stopped; review the newer source before rebuilding the draft.");
                if (!IsStatus(source, "Active") && !IsStatus(source, "Inactive")) throw new InvalidOperationException("Draft source has an unexpected status.");
                if (Id(source, "UsrRole") != Id(draft, "UsrRole")) throw new InvalidOperationException("Draft and source native role links differ.");
                string suffix = " [draft " + roleId.ToString("N").Substring(0, 8) + "]";
                if (name == Text(source, "UsrName") + suffix) name = Text(source, "UsrName");
            } else if (Id(draft, "UsrRole") != Guid.Empty && Versions(Id(draft, "UsrRole")).Any(e => e.PrimaryColumnValue != roleId)) {
                bool inPlace = Rows("UsrMCITRoleChangeLog", "UsrMCITRole", roleId)
                    .Any(e => Text(e, "UsrFieldName") == InPlaceDraftMarker &&
                        String.Equals(Text(e, "UsrOldValue"), roleId.ToString(), StringComparison.OrdinalIgnoreCase));
                if (!inPlace || Versions(Id(draft, "UsrRole")).Any(e => e.PrimaryColumnValue != roleId &&
                        (IsStatus(e, "Active") || IsStatus(e, "Draft"))))
                    throw new InvalidOperationException("Shared native role without safe in-place draft lineage. Activation stopped.");
            }
            var target = source ?? draft;
            Guid targetId = target.PrimaryColumnValue, nativeId = Id(target, "UsrRole");
            if (Versions(nativeId).Any(e => e.PrimaryColumnValue != targetId && IsStatus(e, "Active")))
                throw new InvalidOperationException("Another active version uses this native role.");
            if (Rows(RoleSchema, "UsrName", name).Any(e => e.PrimaryColumnValue != targetId && e.PrimaryColumnValue != roleId))
                throw new InvalidOperationException("Role name already exists.");
            var native = Native(target);
            if (Rows("SysAdminUnit", "Name", name).Any(e => native == null || e.PrimaryColumnValue != native.PrimaryColumnValue))
                throw new InvalidOperationException("A different native user/role already uses this name. It will not be reused automatically.");
            var previousAdmin = Rows("UsrMCITRoleAdministrativePermission", "UsrMCITRole", targetId).SingleOrDefault();
            var previousFlags = previousAdmin == null ? new Dictionary<string,bool>() :
                UsrMCITAdministrativePermissionBridge.ReadFlags(previousAdmin);
            if (source != null) {
                // Preserve the original MCIT role ID and all contract/other foreign references.
                Set(draft, "UsrName", "Archived draft " + roleId.ToString("N"));
                Set(draft, StatusColumn, StatusId("Inactive")); Save(draft);
                foreach (var c in new [] { "UsrRoleCategory", "UsrScopeBehavior", "UsrDescription" }) {
                    Log(targetId, "Form." + c, Value(target, c), Value(draft, c), "Activate draft");
                    Set(target, c, Value(draft, c));
                }
                foreach (var pair in Details) CopyConfiguration(roleId, targetId, pair.Key, pair.Value);
            }
            Log(targetId, "Form.UsrName", Text(target, "UsrName"), name, "Activate");
            string oldStatus = Status(target);
            Set(target, "UsrName", name); Set(target, StatusColumn, StatusId("Active")); Save(target);
            UsrMCITRoleSynchronization.Synchronize(Uc, targetId);
            var currentAdmin = Rows("UsrMCITRoleAdministrativePermission", "UsrMCITRole", targetId).Single();
            UsrMCITAdministrativePermissionBridge.Apply(currentAdmin, previousFlags);
            Log(targetId, "Form.Status", oldStatus, "Active", "Activate");
            if (source != null) {
                Log(targetId, "Form.AppliedDraft", "", roleId, "Activate draft");
                Log(roleId, "Form.AppliedTo", "", targetId, "Archive draft");
            }
            return targetId;
        }
        private void CopyConfiguration(Guid fromRole, Guid toRole, string schema, string[] columns) {
            string key = Keys[schema];
            var targetRows = Rows(schema, "UsrMCITRole", toRole);
            Func<Entity, string> keyOf = e => key == null ? "singleton" : Text(e, key).Trim();
            if (targetRows.GroupBy(keyOf, StringComparer.OrdinalIgnoreCase).Any(g => g.Count() > 1))
                throw new InvalidOperationException("Duplicate target permission rows: " + schema);
            var remaining = targetRows.ToDictionary(keyOf, e => e, StringComparer.OrdinalIgnoreCase);
            foreach (var src in Rows(schema, "UsrMCITRole", fromRole)) {
                Entity dst; string k = keyOf(src);
                if (!remaining.TryGetValue(k, out dst)) { dst = New(schema); Set(dst, "UsrMCITRole", toRole); }
                else remaining.Remove(k);
                foreach (var c in columns) {
                    object before = Value(dst, c), after = Value(src, c);
                    if (!Object.Equals(before, after)) Log(toRole, "Form." + c, before, after, "Apply draft");
                    Set(dst, c, after);
                }
                Save(dst);
            }
            foreach (var removed in remaining.Values) {
                Log(toRole, "Form.RemovedRow", removed.PrimaryColumnValue, schema, "Apply draft"); Delete(removed);
            }
        }
        internal void Deactivate(Guid id) {
            var role = Read(RoleSchema, id);
            if (!IsStatus(role, "Active")) throw new InvalidOperationException("Only an active configuration can be deactivated.");
            Set(role, StatusColumn, StatusId("Inactive")); Save(role);
            UsrMCITRoleSynchronization.Synchronize(Uc, id);
            Log(id, "Form.Status", "Active", "Inactive", "Deactivate");
            // Memberships remain; runtime disables the native role and reconciles enabled MCIT operations.
        }
        internal void Assign(Guid roleId, Guid userId, bool add) {
            var role = Read(RoleSchema, roleId);
            if (!IsStatus(role, "Active")) throw new InvalidOperationException("Manage memberships on the active version only.");
            var native = Native(role); if (native == null) throw new InvalidOperationException("Activate/provision the role first.");
            var user = Read("SysAdminUnit", userId);
            if (Convert.ToInt32(Value(user, "SysAdminUnitTypeValue")) != 4) throw new InvalidOperationException("Select a user account, not a role or group.");
            if (Convert.ToInt32(Value(user, "ConnectionType")) != 0)
                throw new InvalidOperationException("Select an internal user account.");
            if (!Convert.ToBoolean(Value(native, "Active"))) throw new InvalidOperationException("The native role is inactive.");
            if (add && !Convert.ToBoolean(Value(user, "Active"))) throw new InvalidOperationException("Cannot assign an inactive user.");
            var memberships = Rows("SysUserInRole", "SysRole", native.PrimaryColumnValue).Where(e => Id(e, "SysUser") == userId).ToList();
            if (memberships.Count > 1) throw new InvalidOperationException("Duplicate native memberships. Resolve before changing.");
            if (!add && memberships.Count == 0)
                throw new InvalidOperationException("This user has no direct membership in this role. Inherited membership must be changed at its source.");
            if (add && memberships.Count == 0) {
                var e = New("SysUserInRole"); Set(e, "SysRole", native.PrimaryColumnValue); Set(e, "SysUser", userId); Save(e);
                Log(roleId, "Form.AssignedUser", "", userId, "Assign");
            }
            if (!add && memberships.Count == 1) { Delete(memberships[0]); Log(roleId, "Form.AssignedUser", userId, "", "Unassign"); }
        }

        // Integration point for protected custom server actions. Not called automatically by other pages.
        // Add calls only after agreeing trusted screen-code/action mappings. Native access checks still apply.
        public static void DemandScreen(UserConnection uc, string trustedScreenCode, string action)
        {
            var x = new UsrMCITRoleFormEngine(uc);
            string flag = "UsrCan" + action;
            if (!ScreenFlags.Contains(flag)) throw new UnauthorizedAccessException("Unsupported action.");
            var screens = x.Rows("UsrMCITPermissionScreen", "UsrScreenCode", trustedScreenCode);
            if (screens.Count != 1 || !Convert.ToBoolean(x.Value(screens[0], "UsrIsActive"))) throw new UnauthorizedAccessException("Screen is not registered or active.");
            var roles = new HashSet<Guid>(x.Rows("SysUserInRole", "SysUser", uc.CurrentUser.Id).Select(e => x.Id(e, "SysRole")));
            foreach (var role in x.Rows(RoleSchema, StatusColumn, x.StatusId("Active"))) {
                if (!roles.Contains(x.Id(role, "UsrRole"))) continue;
                var p = x.Rows("UsrMCITRoleScreenPermission", "UsrMCITRole", role.PrimaryColumnValue).Where(e => x.Id(e, "UsrScreen") == screens[0].PrimaryColumnValue).ToList();
                if (p.Count == 1 && Convert.ToBoolean(x.Value(p[0], "UsrCanView")) && Convert.ToBoolean(x.Value(p[0], flag))) return;
            }
            throw new UnauthorizedAccessException("This role does not permit this screen action.");
        }
    }

    // All listeners below live in this SAME source code schema.
    public abstract class UsrMCITRoleFormGuardBase : BaseEntityEventListener
    {
        private sealed class Pending { public Guid Role; public List<string[]> Changes = new List<string[]>(); }
        private static readonly ConditionalWeakTable<Entity, Pending> PendingChanges = new ConditionalWeakTable<Entity, Pending>();
        public override void OnSaving(object sender, EntityBeforeEventArgs e) {
            base.OnSaving(sender, e);
            var entity = (Entity)sender; var x = new UsrMCITRoleFormEngine(entity.UserConnection);
            x.RequireManager();
            if (UsrMCITRoleFormEngine.IsInternal) return;
            var schema = entity.Schema.Name;
            Entity old = null;
            var existing = x.Rows(schema, "Id", entity.PrimaryColumnValue);
            if (existing.Count > 0) old = existing[0];
            // Validate an effective snapshot for partial DataService updates without
            // overwriting unspecified fields or manufacturing changed audit values.
            var changed = entity.GetChangedColumnValues().ToList();
            Entity effective = entity;
            if (old != null) {
                effective = x.Read(schema, entity.PrimaryColumnValue);
                foreach (var c in changed.Where(c => c.Name == c.Column.ColumnValueName)) effective.SetColumnValue(c.Column.ColumnValueName, c.Value);
            }
            Guid roleId;
            if (schema == UsrMCITRoleFormEngine.RoleSchema) {
                roleId = entity.PrimaryColumnValue;
                if (old != null && !x.IsStatus(old, "Draft")) throw new InvalidOperationException("Active/inactive configurations are read-only. Use Create Draft.");
                if (old == null) x.Set(entity, UsrMCITRoleFormEngine.StatusColumn, x.StatusId("Draft"));
                if (!x.IsStatus(effective, "Draft")) throw new InvalidOperationException("Use the Activate button to change role status.");
                if ((old == null && x.Id(effective, "UsrRole") != Guid.Empty) || (old != null && x.Id(old, "UsrRole") != x.Id(effective, "UsrRole")))
                    throw new InvalidOperationException("The linked native role is managed by the role service.");
                if ((old == null && x.Id(effective, "UsrCreatioFunctionalRole") != Guid.Empty) ||
                    (old != null && x.Id(old, "UsrCreatioFunctionalRole") != x.Id(effective, "UsrCreatioFunctionalRole")))
                    throw new InvalidOperationException("The alternate native role link is managed by the role service.");
                string name = x.Text(effective, "UsrName").Trim();
                if (String.IsNullOrEmpty(name)) throw new InvalidOperationException("Role Name is required.");
                if (x.Rows(schema, "UsrName", name).Any(r => r.PrimaryColumnValue != entity.PrimaryColumnValue)) throw new InvalidOperationException("Role name already exists.");
                x.Set(entity, "UsrName", name);
            } else {
                roleId = x.Id(effective, "UsrMCITRole");
                if (old != null && x.Id(old, "UsrMCITRole") != roleId) throw new InvalidOperationException("Permission rows cannot be moved to another role.");
                var role = x.Read(UsrMCITRoleFormEngine.RoleSchema, roleId);
                if (!x.IsStatus(role, "Draft")) throw new InvalidOperationException("Permissions can be edited only on a draft.");
                var key = UsrMCITRoleFormEngine.Keys[schema];
                if (old != null && key != null && schema != "UsrMCITRoleDataScopeRule" && !Object.Equals(x.Value(old, key), x.Value(effective, key)))
                    throw new InvalidOperationException("The permission catalog item cannot be changed; edit its flags.");
                if (x.Rows(schema, "UsrMCITRole", roleId).Any(r => r.PrimaryColumnValue != entity.PrimaryColumnValue &&
                    (key == null || String.Equals(x.Text(r, key).Trim(), x.Text(effective, key).Trim(), StringComparison.OrdinalIgnoreCase))))
                    throw new InvalidOperationException("Duplicate permission/scope row for this role.");
                x.ValidateRow(effective);
            }
            var pending = new Pending { Role = roleId };
            foreach (var c in entity.GetChangedColumnValues()
                .Where(c => c.Name == c.Column.ColumnValueName)
                .GroupBy(c => c.Column.Name).Select(g => g.First())) {
                if (!c.Column.Name.StartsWith("Usr", StringComparison.Ordinal)) continue;
                object beforeValue = old == null ? null : x.Value(old, c.Column.Name);
                object afterValue = x.Value(entity, c.Column.Name);
                if (Object.Equals(beforeValue, afterValue)) continue;
                string before = Convert.ToString(beforeValue, CultureInfo.InvariantCulture) ?? "";
                string after = Convert.ToString(afterValue, CultureInfo.InvariantCulture) ?? "";
                if (before == after) continue;
                // Default false flags on externally created rows are not permission grants.
                if (old == null && afterValue is bool && !(bool)afterValue) continue;
                pending.Changes.Add(new [] {c.Column.Name, before, after});
            }
            PendingChanges.Remove(entity); PendingChanges.Add(entity, pending);
        }
        public override void OnSaved(object sender, EntityAfterEventArgs e) {
            base.OnSaved(sender, e); var entity = (Entity)sender; Pending p;
            if (!PendingChanges.TryGetValue(entity, out p)) return;
            PendingChanges.Remove(entity); var x = new UsrMCITRoleFormEngine(entity.UserConnection);
            foreach (var c in p.Changes) x.Log(p.Role, "Form." + c[0], c[1], c[2], "Edit " + entity.Schema.Name);
        }
        public override void OnDeleting(object sender, EntityBeforeEventArgs e) {
            base.OnDeleting(sender, e); var entity = (Entity)sender; var x = new UsrMCITRoleFormEngine(entity.UserConnection);
            x.RequireManager(); if (UsrMCITRoleFormEngine.IsInternal) return;
            if (entity.Schema.Name == UsrMCITRoleFormEngine.RoleSchema) throw new InvalidOperationException("Use the Delete Selected button in Roles Management. Standard delete is blocked to protect native roles.");
            var stored = x.Read(entity.Schema.Name, entity.PrimaryColumnValue);
            if (!x.IsStatus(x.Read(UsrMCITRoleFormEngine.RoleSchema, x.Id(stored, "UsrMCITRole")), "Draft"))
                throw new InvalidOperationException("Permissions can be removed only from a draft.");
            var pending = new Pending { Role = x.Id(stored, "UsrMCITRole") };
            pending.Changes.Add(new [] { "DeletedRow", stored.PrimaryColumnValue.ToString(), stored.Schema.Name });
            PendingChanges.Remove(entity); PendingChanges.Add(entity, pending);
        }
        public override void OnDeleted(object sender, EntityAfterEventArgs e) {
            base.OnDeleted(sender, e); var entity = (Entity)sender; Pending p;
            if (!PendingChanges.TryGetValue(entity, out p)) return;
            PendingChanges.Remove(entity); var x = new UsrMCITRoleFormEngine(entity.UserConnection);
            foreach (var c in p.Changes) x.Log(p.Role, "Form." + c[0], c[1], c[2], "Delete permission");
        }
    }
    [EntityEventListener(SchemaName = "UsrMCITRole")]
    public class UsrMCITRoleFormRoleGuard : UsrMCITRoleFormGuardBase { }
    [EntityEventListener(SchemaName = "UsrMCITRoleScreenPermission")]
    public class UsrMCITRoleFormScreenGuard : UsrMCITRoleFormGuardBase { }
    [EntityEventListener(SchemaName = "UsrMCITRoleDataScopeRule")]
    public class UsrMCITRoleFormScopeGuard : UsrMCITRoleFormGuardBase { }
    [EntityEventListener(SchemaName = "UsrMCITRoleQueuePermission")]
    public class UsrMCITRoleFormQueueGuard : UsrMCITRoleFormGuardBase { }
    [EntityEventListener(SchemaName = "UsrMCITRoleReportingPermission")]
    public class UsrMCITRoleFormReportGuard : UsrMCITRoleFormGuardBase { }
    [EntityEventListener(SchemaName = "UsrMCITRoleAdministrativePermission")]
    public class UsrMCITRoleFormAdminGuard : UsrMCITRoleFormGuardBase { }
    [EntityEventListener(SchemaName = "UsrMCITRoleChangeLog")]
    public class UsrMCITRoleFormLineageGuard : BaseEntityEventListener
    {
        private void Protect(object sender) {
            if (UsrMCITRoleFormEngine.IsInternal) return;
            var entity = (Entity)sender; var x = new UsrMCITRoleFormEngine(entity.UserConnection);
            string field = x.Text(entity, "UsrFieldName");
            bool reserved = field == UsrMCITRoleFormEngine.DraftMarker ||
                field == UsrMCITRoleFormEngine.InPlaceDraftMarker;
            var old = x.Rows(entity.Schema.Name, "Id", entity.PrimaryColumnValue);
            if (reserved || old.Any(r =>
                x.Text(r, "UsrFieldName") == UsrMCITRoleFormEngine.DraftMarker ||
                x.Text(r, "UsrFieldName") == UsrMCITRoleFormEngine.InPlaceDraftMarker))
                throw new UnauthorizedAccessException("Draft lineage is managed by the role service.");
        }
        public override void OnSaving(object sender, EntityBeforeEventArgs e) { base.OnSaving(sender, e); Protect(sender); }
        public override void OnDeleting(object sender, EntityBeforeEventArgs e) { base.OnDeleting(sender, e); Protect(sender); }
    }
}

