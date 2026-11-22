 // UsrMCITScopeApplyService - one new Creatio Source Code schema in package UsrMCIT.
// Staging/review build: relies on the already compiled UsrMCITRoleFormEngine and
// UsrMCITDataScopeRuntime. Does NOT use the unfinished privileged apply BPMN.
// Apply is intentionally synchronous and restricted to trusted administrators.
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
    public sealed class UsrMCITScopeApplyResult
    {
        [DataMember] public bool Success { get; set; }
        [DataMember] public string Message { get; set; }
        [DataMember] public Guid RequestId { get; set; }
        [DataMember] public Guid UserId { get; set; }
        [DataMember] public Guid ContractId { get; set; }
        [DataMember] public bool AssignmentCreated { get; set; }
    }

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public sealed class UsrMCITScopeApplyService : BaseService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        public UsrMCITScopeApplyResult ApplyApprovedContract(Guid requestId)
        {
            var result = new UsrMCITScopeApplyResult { RequestId = requestId };
            try {
                if (requestId == Guid.Empty)
                    throw new ArgumentException("A saved approval request ID is required.");

                var x = new UsrMCITRoleFormEngine(UserConnection);
                // The authenticated WCF caller, not a BPMN system identity, must be
                // authorized. No client-supplied target user, contract or status.
                x.RequireManager();
                UserConnection.DBSecurityEngine.CheckCanExecuteOperation(
                    "CanChangeEntitySchemaRecordRight");

                using (var db = UserConnection.EnsureDBConnection()) {
                    db.StartTransaction();
                    try {
                        // Transaction-owned SQL Server application locks serialize
                        // calls for the same approval, including two browser tabs.
                        Lock(db, "UsrMCITScopeApply.Request." + requestId.ToString("D"));

                        Entity approval = x.Read("UsrMCITScopeEditRequest", requestId);
                        if (!String.Equals(x.Text(approval, "UsrStatus").Trim(),
                                "Approved", StringComparison.OrdinalIgnoreCase))
                            throw new InvalidOperationException(
                                "This request is not Approved or has already been applied.");
                        if (!String.Equals(x.Text(approval, "UsrScopeType").Trim(),
                                "Contract Scope", StringComparison.OrdinalIgnoreCase))
                            throw new InvalidOperationException(
                                "The approved scope is not Contract Scope.");

                        Guid userId = x.Id(approval, "UsrUser");
                        string storedValue = x.Text(approval, "UsrRequestedValues").Trim();
                        Guid contractId;
                        // One and only one GUID; no CSVs, contract names or caller overrides.
                        if (userId == Guid.Empty ||
                            !Guid.TryParseExact(storedValue, "D", out contractId) ||
                            contractId == Guid.Empty)
                            throw new InvalidOperationException(
                                "Approval must identify one saved target user and contract GUID.");

                        Lock(db, "UsrMCITScopeApply.User." + userId.ToString("D"));
                        Entity user = x.Read("SysAdminUnit", userId);
                        if (!Convert.ToBoolean(x.Value(user, "Active")) ||
                            Convert.ToInt32(x.Value(user, "SysAdminUnitTypeValue")) != 4)
                            throw new InvalidOperationException("Target is not an active Creatio user.");
                        Entity contract = x.Read("UsrMCITContract", contractId);

                        var rows = x.Rows("UsrMCITUserContractAccess", "UsrUser", userId)
                            .Where(row => x.Id(row, "UsrContract") == contractId).ToList();
                        if (rows.Count > 1)
                            throw new InvalidOperationException(
                                "Duplicate user/contract assignments detected. Repair before applying.");

                        bool created = false;
                        if (rows.Count == 0) {
                            var assignment = x.New("UsrMCITUserContractAccess");
                            x.Set(assignment, "UsrUser", userId);
                            x.Set(assignment, "UsrContract", contractId);
                            x.Set(assignment, "UsrIsActive", true);
                            // Optional name, only if the object's schema contains one.
                            if (x.Schema("UsrMCITUserContractAccess").Columns
                                .Any(c => c.Name == "UsrName")) {
                                x.Set(assignment, "UsrName", (x.Text(user, "Name") + " — " +
                                    x.Text(contract, "UsrName")).Substring(0,
                                        Math.Min(250, (x.Text(user, "Name") + " — " +
                                            x.Text(contract, "UsrName")).Length)));
                            }
                            x.Save(assignment); // Fires existing contract scope listener.
                            created = true;
                        } else if (!Convert.ToBoolean(x.Value(rows[0], "UsrIsActive"))) {
                            x.Set(rows[0], "UsrIsActive", true);
                            x.Save(rows[0]); // Fires listener for reactivation.
                        }

                        // Also reconcile if the assignment was already active.
                        UsrMCITDataScopeRuntime.ReconcileUser(UserConnection, userId);

                        // Fail closed: do not mark Applied when no native direct Read Allow
                        // exists. This uses read-only SQL, never writes native right tables.
                        var sql = "SELECT COUNT(1) FROM dbo.SysUsrMCITContractRight " +
                            "WHERE SysAdminUnitId='" + userId.ToString("D") + "' " +
                            "AND RecordId='" + contractId.ToString("D") + "' " +
                            "AND Operation=0 AND RightLevel=1";
                        if (new CustomQuery(UserConnection, sql).ExecuteScalar<int>() < 1)
                            throw new InvalidOperationException(
                                "No native contract Read Allow after reconciliation. " +
                                "Check active roles, screen View, scope and ledger permissions.");

                        x.Set(approval, "UsrStatus", "Applied");
                        x.Save(approval);
                        db.CommitTransaction();
                        result.Success = true;
                        result.UserId = userId;
                        result.ContractId = contractId;
                        result.AssignmentCreated = created;
                        result.Message = "Approved contract assignment applied and native Read Allow verified.";
                        return result;
                    } catch {
                        db.RollbackTransaction();
                        throw;
                    }
                }
            } catch (Exception ex) {
                // Do not disclose record contents; the UI displays errors to admin.
                result.Success = false;
                result.Message = ex.Message;
                return result;
            }
        }

        private void Lock(DBExecutor db, string resource)
        {
            // 'resource' only contains a fixed prefix and a validated Guid string.
            var sql = "DECLARE @r int; EXEC @r = sys.sp_getapplock " +
                "@Resource=N'" + resource + "', @LockMode=N'Exclusive', " +
                "@LockOwner=N'Transaction', @LockTimeout=15000; " +
                "IF @r < 0 THROW 51000, 'Scope apply is busy. Retry later.', 1;";
            new CustomQuery(UserConnection, sql).Execute(db);
        }
    }
}
