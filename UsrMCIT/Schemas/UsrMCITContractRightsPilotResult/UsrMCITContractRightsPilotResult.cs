 // UsrMCITContractNativeRightsPilot
// MCIT / Realese — staged native object-operation permission pilot.
// Scope is deliberately fixed to one known test functional role and one object.
// Does not change role lifecycle, users, record permissions, or direct grants.
// Do not deploy as a substitute for a reviewed, general-purpose permissions bridge.
namespace Terrasoft.Configuration
{
    using System;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using Terrasoft.Core;
    using Terrasoft.Core.DB;
    using Terrasoft.Core.Entities;
    using Terrasoft.Web.Common;

    [DataContract]
    public class UsrMCITContractRightsPilotResult
    {
        [DataMember] public bool Success { get; set; }
        [DataMember] public string Message { get; set; }
        [DataMember] public Guid MCITRoleId { get; set; }
        [DataMember] public Guid NativeRoleId { get; set; }
        [DataMember] public string NativeRoleName { get; set; }
        [DataMember] public string ObjectName { get; set; }
        [DataMember] public bool CanRead { get; set; }
        [DataMember] public bool CanCreate { get; set; }
        [DataMember] public bool CanEdit { get; set; }
        [DataMember] public bool CanDelete { get; set; }
        [DataMember] public bool Applied { get; set; }
    }

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrMCITContractNativeRightsPilot : BaseService
    {
        private const string ContractObject = "UsrMCITContract";
        private const string ScreenCode = "CONTRACTS";
        private const string TestRoleName = "Addon trial";
        private static readonly Guid TestNativeRoleId =
            new Guid("A7DE099C-004A-4140-B261-D41F8CC618A9");

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        public UsrMCITContractRightsPilotResult PreviewAddonTrial()
        {
            try
            {
                RequireAdministrator();
                var preview = ReadDesiredRights();
                preview.Message = "Preview only. No native rights changed. Review values before applying.";
                return preview;
            }
            catch (Exception ex)
            {
                return new UsrMCITContractRightsPilotResult { Success = false,
                    Message = ex.Message, ObjectName = ContractObject };
            }
        }

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        public UsrMCITContractRightsPilotResult ApplyAddonTrial(bool confirm)
        {
            try
            {
                RequireAdministrator();
                if (!confirm) throw new InvalidOperationException(
                    "Apply requires confirm=true after reviewing PreviewAddonTrial.");

                var uc = UserConnection;
                // Use the same advisory lock as UsrMCITRoleFormService to prevent
                // activation/deactivation of the test role mid-application.
                using (var db = uc.EnsureDBConnection())
                {
                    bool ownsTransaction = db.TransactionDepth == 0;
                    if (ownsTransaction) db.StartTransaction();
                    try
                    {
                        new CustomQuery(uc, @"
DECLARE @r int;
EXEC @r = sys.sp_getapplock @Resource=N'UsrMCITRoleFormService.v1',
  @LockMode=N'Exclusive', @LockOwner=N'Transaction', @LockTimeout=15000;
IF @r < 0 THROW 51000, 'Role configuration is busy. Retry shortly.', 1;").Execute(db);

                        var desired = ReadDesiredRights(); // Re-read under lock.
                        // Always write every CRUD flag, including explicit Delete=false;
                        // creating a new native role permission row must NOT grant Delete.
                        uc.DBSecurityEngine.SetEntitySchemaReadingAllowed(
                            TestNativeRoleId, ContractObject, desired.CanRead);
                        uc.DBSecurityEngine.SetEntitySchemaAppendingAllowed(
                            TestNativeRoleId, ContractObject, desired.CanCreate);
                        uc.DBSecurityEngine.SetEntitySchemaEditingAllowed(
                            TestNativeRoleId, ContractObject, desired.CanEdit);
                        uc.DBSecurityEngine.SetEntitySchemaDeletingAllowed(
                            TestNativeRoleId, ContractObject, false);
                        if (ownsTransaction) db.CommitTransaction();
                        desired.Applied = true;
                        desired.Message = "Applied native object-operation rights to Addon trial only. " +
                            "Other role grants, direct user denials, record permissions, " +
                            "system-operation overrides and cache refresh can affect effective access.";
                        return desired;
                    }
                    catch
                    {
                        if (ownsTransaction) db.RollbackTransaction();
                        throw;
                    }
                }
            }
            catch (Exception ex)
            {
                return new UsrMCITContractRightsPilotResult { Success = false,
                    Message = ex.Message, ObjectName = ContractObject };
            }
        }

        private void RequireAdministrator()
        {
            UserConnection.DBSecurityEngine.CheckCanExecuteOperation("CanManageAdministration");
            UserConnection.DBSecurityEngine.CheckCanExecuteOperation("CanManageUsers");
        }

        private UsrMCITContractRightsPilotResult ReadDesiredRights()
        {
            // Server-owned role and screen. Never trust client-supplied IDs for grants.
            var x = new UsrMCITRoleFormEngine(UserConnection);
            var matches = x.Rows("UsrMCITRole", "UsrRole", TestNativeRoleId)
                .Where(r => x.IsStatus(r, "Active")).ToList();
            if (matches.Count != 1)
                throw new InvalidOperationException("Exactly one active MCIT version of Addon trial is required.");
            var role = matches[0];
            if (!String.Equals(x.Text(role, "UsrName").Trim(), TestRoleName,
                StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("The linked MCIT role is not Addon trial.");
            var native = x.Read("SysAdminUnit", TestNativeRoleId);
            if (!String.Equals(x.Text(native, "Name").Trim(), TestRoleName,
                StringComparison.OrdinalIgnoreCase) ||
                Convert.ToInt32(x.Value(native, "SysAdminUnitTypeValue")) != 6 ||
                Convert.ToInt32(x.Value(native, "ConnectionType")) != 0 ||
                !Convert.ToBoolean(x.Value(native, "Active")))
                throw new InvalidOperationException("Linked native role must be the active internal Addon trial functional role.");

            var screens = x.Rows("UsrMCITPermissionScreen", "UsrScreenCode", ScreenCode)
                .Where(s => Convert.ToBoolean(x.Value(s, "UsrIsActive"))).ToList();
            if (screens.Count != 1)
                throw new InvalidOperationException("Expected one active canonical Contracts screen.");
            Guid screenId = screens[0].PrimaryColumnValue;

var grants = x.Rows("UsrMCITRoleScreenPermission", "UsrMCITRole", role.PrimaryColumnValue)
    .Where(permissionRow => x.Id(permissionRow, "UsrScreen") == screenId)
    .ToList();

            if (grants.Count != 1)
                throw new InvalidOperationException("Expected exactly one Contracts permission row for Addon trial.");
            var p = grants[0];
            bool view = Convert.ToBoolean(x.Value(p, "UsrCanView"));
            bool create = view && Convert.ToBoolean(x.Value(p, "UsrCanCreate"));
            bool edit = view && Convert.ToBoolean(x.Value(p, "UsrCanEdit"));
            // Do not toggle the object-security feature or record-security feature.
            // Preserve native System administrators permissions and all direct grants.
            return new UsrMCITContractRightsPilotResult
            {
                Success = true,
                MCITRoleId = role.PrimaryColumnValue,
                NativeRoleId = TestNativeRoleId,
                NativeRoleName = TestRoleName,
                ObjectName = ContractObject,
                CanRead = view,
                CanCreate = create,
                CanEdit = edit,
                CanDelete = false,
                Applied = false
            };
        }
    }
}
