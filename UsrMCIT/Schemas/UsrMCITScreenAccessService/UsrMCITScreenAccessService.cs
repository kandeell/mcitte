// MCIT runtime screen-permission resolver — independent C# source schema.
// Restored from the Screen Access Service baseline with current canonical mappings.
// IMPORTANT: This is a permission decision service, NOT a global HTTP or
// data-service authorization interceptor. Protected C# APIs MUST call Demand()
// and native object/record/operation permissions MUST be configured separately.
namespace Terrasoft.Configuration
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using Terrasoft.Web.Common;

    [DataContract]
    public sealed class UsrMCITScreenAccessResult
    {
        [DataMember] public bool Success { get; set; }
        [DataMember] public string Message { get; set; }
        [DataMember] public bool CanView { get; set; }
        [DataMember] public bool CanCreate { get; set; }
        [DataMember] public bool CanEdit { get; set; }
        [DataMember] public bool CanApprove { get; set; }
        [DataMember] public bool CanAssign { get; set; }
        [DataMember] public bool CanExport { get; set; }
        [DataMember] public bool CanConfigure { get; set; }
        [DataMember] public bool CanActivate { get; set; }

        public bool Allows(string action)
        {
            switch (action) {
                case "View": return CanView;
                case "Create": return CanCreate;
                case "Edit": return CanEdit;
                case "Approve": return CanApprove;
                case "Assign": return CanAssign;
                case "Export": return CanExport;
                case "Configure": return CanConfigure;
                case "Activate": return CanActivate;
                default: return false;
            }
        }
    }

    public static class UsrMCITScreenAccess
    {
        private static readonly string[] FlagNames = new [] {
            "UsrCanView", "UsrCanCreate", "UsrCanEdit", "UsrCanApprove",
            "UsrCanAssign", "UsrCanExport", "UsrCanConfigure", "UsrCanActivate"
        };

        // Resolve legacy MODULE aliases to their single active MCIT catalog record.
        // No role permissions are merged or modified here.
        private static readonly Dictionary<string, string> ScreenAliases =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                { "MODULE:UsrMCITAddOn", "ADDON_CONFIGURATION" },
                { "MODULE:UsrAdministrationHome", "ADMINISTRATION_HOME" },
                { "MODULE:UsrMCITAuditLog", "AUDIT_LOG" },
                { "MODULE:UsrMCITContract", "CONTRACTS" },
                { "MODULE:UsrFinanceConfig", "FINANCE_CONFIGURATION" },
                { "MODULE:UsrMCITLookupGroup", "LOOKUP_DATA" },
                { "MODULE:UsrMCIT", "MCIT" },
                { "MODULE:UsrProject", "PROJECTS" },
                { "MODULE:UsrMCITReportCatalog", "REPORT_CATALOG" },
                { "MODULE:UsrMCITResourceType", "RESOURCE_CATALOG" },
                { "MODULE:UsrMCITRole", "ROLES" },
                { "MODULE:UsrMCITPortalUserAccess", "USER_DIRECTORY" },
                { "MODULE:UsrVirtualMachine", "VM_INVENTORY" }
            };

        private static string CanonicalCode(string requestedCode)
        {
            var code = (requestedCode ?? "").Trim();
            string canonical;
            return ScreenAliases.TryGetValue(code, out canonical) ? canonical : code;
        }

        // Run this only inside trusted server code. The screen code and action
        // MUST be server-owned constants, not blindly accepted from a request.
        public static void Demand(UserConnection uc, string trustedScreenCode, string action)
        {
            if (Array.IndexOf(new[] {"View","Create","Edit","Approve","Assign","Export","Configure","Activate"}, action) < 0)
                throw new UnauthorizedAccessException("Unsupported MCIT screen action.");
            var grant = Resolve(uc, trustedScreenCode);
            if (!grant.Success || !grant.Allows(action))
                throw new UnauthorizedAccessException("MCIT access denied for " + action + " on " + trustedScreenCode + ".");
        }

        // No client-supplied user or role IDs; the authenticated Creatio session
        // is the only authority for user identity.
        public static UsrMCITScreenAccessResult Resolve(UserConnection uc, string screenCode)
        {
            var denied = new UsrMCITScreenAccessResult { Success = false,
                Message = "Permission evaluation failed; access denied." };
            if (uc == null || uc.CurrentUser == null || uc.CurrentUser.Id == Guid.Empty ||
                String.IsNullOrWhiteSpace(screenCode) || screenCode.Length > 128)
                return denied;
            try {
                var screens = ReadRows(uc, "UsrMCITPermissionScreen", "UsrScreenCode", CanonicalCode(screenCode));
                if (screens.Count != 1 || !Flag(screens[0], "UsrIsActive")) {
                    denied.Success = true;
                    denied.Message = "Screen missing, ambiguous, or inactive; access denied.";
                    return denied;
                }
                Guid screenId = screens[0].PrimaryColumnValue;
                if (screenId == Guid.Empty) return denied;

                // Preserve existing administrator access to registered active screens.
                if (uc.DBSecurityEngine.GetCanExecuteOperation("CanManageAdministration")) {
                    return new UsrMCITScreenAccessResult {
                        Success = true,
                        Message = "Administrator access granted.",
                        CanView = true,
                        CanCreate = true,
                        CanEdit = true,
                        CanApprove = true,
                        CanAssign = true,
                        CanExport = true,
                        CanConfigure = true,
                        CanActivate = true
                    };
                }

                var nativeRoleIds = new HashSet<Guid>(
                    ReadRows(uc, "SysUserInRole", "SysUser", uc.CurrentUser.Id)
                        .Select(m => LookupId(m, "SysRole")).Where(id => id != Guid.Empty));
                if (nativeRoleIds.Count == 0) {
                    denied.Success = true;
                    denied.Message = "No directly assigned native roles found.";
                    return denied;
                }

                var statusColumn = uc.EntitySchemaManager.GetInstanceByName("UsrMCITRole")
                    .Columns.FirstOrDefault(c => c.Name == "UsrMCITRoleStatuses");
                if (statusColumn == null || statusColumn.ReferenceSchema == null) return denied;
                var activeStatuses = ReadRows(uc, statusColumn.ReferenceSchema.Name,
                    statusColumn.ReferenceSchema.PrimaryDisplayColumn.Name, "Active");
                if (activeStatuses.Count != 1) return denied;
                Guid activeStatusId = activeStatuses[0].PrimaryColumnValue;

                var activeRoles = ReadRows(uc, "UsrMCITRole", "UsrMCITRoleStatuses", activeStatusId)
                    .Where(r => nativeRoleIds.Contains(LookupId(r, "UsrRole"))).ToList();
                var eligibleRoleIds = new HashSet<Guid>();
                foreach (var role in activeRoles) {
                    var nativeId = LookupId(role, "UsrRole");
                    if (nativeId == Guid.Empty) continue;
                    var native = ReadRows(uc, "SysAdminUnit", "Id", nativeId);
                    if (native.Count != 1 || !Flag(native[0], "Active")) continue;
                    eligibleRoleIds.Add(role.PrimaryColumnValue);
                }

                var result = new UsrMCITScreenAccessResult { Success = true,
                    Message = "Evaluated active MCIT roles for current user." };
                if (eligibleRoleIds.Count == 0) return result;
                var permissions = ReadRows(uc, "UsrMCITRoleScreenPermission", "UsrScreen", screenId)
                    .Where(p => eligibleRoleIds.Contains(LookupId(p, "UsrMCITRole"))).ToList();
                // ANY assigned active role may grant access (positive grant semantics).
                // Non-View flags do NOT grant anything unless View is also true.
                foreach (var p in permissions) {
                    if (!Flag(p, FlagNames[0])) continue;
                    result.CanView = true;
                    result.CanCreate |= Flag(p, FlagNames[1]);
                    result.CanEdit |= Flag(p, FlagNames[2]);
                    result.CanApprove |= Flag(p, FlagNames[3]);
                    result.CanAssign |= Flag(p, FlagNames[4]);
                    result.CanExport |= Flag(p, FlagNames[5]);
                    result.CanConfigure |= Flag(p, FlagNames[6]);
                    result.CanActivate |= Flag(p, FlagNames[7]);
                }
                return result;
            } catch (Exception) {
                // Fail closed. Do not return table details or stack traces to clients.
                return denied;
            }
        }

        // Elevated READS of permission metadata only: ordinary non-admin users
        // should not need direct query rights on authorization configuration.
        // This does NOT grant elevated access to business data or mutations.
        private static List<Entity> ReadRows(UserConnection uc, string schema,
            string filterColumn, object filterValue)
        {
            var q = new EntitySchemaQuery(uc.EntitySchemaManager, schema) {
                UseAdminRights = true
            };
            q.PrimaryQueryColumn.IsAlwaysSelect = true;
            q.AddAllSchemaColumns();
            q.Filters.Add(q.CreateFilterWithParameters(
                FilterComparisonType.Equal, filterColumn, filterValue));
            return q.GetEntityCollection(uc).ToList();
        }

        private static Guid LookupId(Entity entity, string column)
        {
            var c = entity.Schema.Columns.FirstOrDefault(x => x.Name == column);
            if (c == null) return Guid.Empty;
            var value = entity.GetColumnValue(c.ColumnValueName);
            return value is Guid ? (Guid)value : Guid.Empty;
        }

        private static bool Flag(Entity entity, string column)
        {
            var c = entity.Schema.Columns.FirstOrDefault(x => x.Name == column);
            if (c == null) return false;
            var value = entity.GetColumnValue(c.ColumnValueName);
            return value is bool && (bool)value;
        }
    }

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrMCITScreenAccessService : BaseService
    {
        // UI-only introspection for the CURRENT logged-in user. The client does
        // NOT enforce security; protected endpoints still call Demand().
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        public UsrMCITScreenAccessResult Get(string screenCode)
        {
            return UsrMCITScreenAccess.Resolve(UserConnection, screenCode);
        }
    }
}
