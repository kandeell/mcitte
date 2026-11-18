 // UsrMCITScopeApprovalGuard - new Creatio Source Code schema in package UsrMCIT.
// Secures approval contents against post-submission substitution and prevents
// requesters from directly setting an Approved status in OData/REST/UI.
// This guard is for the CONTRACT PILOT; extend deliberately for new scope types.
namespace Terrasoft.Configuration
{
    using System;
    using System.Linq;
    using Terrasoft.Core.Entities;
    using Terrasoft.Core.Entities.Events;

    [EntityEventListener(SchemaName = "UsrMCITScopeEditRequest")]
    public sealed class UsrMCITScopeApprovalGuard : BaseEntityEventListener
    {
        public override void OnInserting(object sender, EntityBeforeEventArgs e)
        {
            base.OnInserting(sender, e);
            var row = (Entity)sender;
            var x = new UsrMCITRoleFormEngine(row.UserConnection);
            Guid contractId;
            if (!String.Equals(x.Text(row, "UsrStatus").Trim(),
                    "Pending", StringComparison.OrdinalIgnoreCase) ||
                !String.Equals(x.Text(row, "UsrScopeType").Trim(),
                    "Contract Scope", StringComparison.OrdinalIgnoreCase) ||
                x.Id(row, "UsrUser") == Guid.Empty ||
                !Guid.TryParseExact(x.Text(row, "UsrRequestedValues").Trim(),
                    "D", out contractId) || contractId == Guid.Empty)
                throw new InvalidOperationException(
                    "Only Pending exact-contract approval requests may be created.");
        }

        public override void OnUpdating(object sender, EntityBeforeEventArgs e)
        {
            base.OnUpdating(sender, e);
            var row = (Entity)sender;
            var x = new UsrMCITRoleFormEngine(row.UserConnection);
            var modified = row.GetChangedColumnValues()
                .Select(value => value.Column.Name).ToArray();
            if (modified.Any(name => name == "UsrUser" || name == "UsrScopeType" ||
                name == "UsrRequestedValues" || name == "UsrReason"))
                throw new InvalidOperationException(
                    "Submitted approval target, requested contract and reason are immutable.");

            if (modified.Contains("UsrStatus")) {
                // Administrative approval BPMN and authenticated apply service must
                // have manager privileges. Ordinary requesters cannot self-approve.
                x.RequireManager();
                var original = x.Read("UsrMCITScopeEditRequest", row.PrimaryColumnValue);
                string from = x.Text(original, "UsrStatus").Trim();
                string to = x.Text(row, "UsrStatus").Trim();
                bool valid = (from == "Pending" && (to == "Approved" || to == "Rejected")) ||
                    (from == "Approved" && to == "Applied");
                if (!valid)
                    throw new InvalidOperationException(
                        "Illegal approval status transition: " + from + " -> " + to);
            }
        }

        public override void OnDeleting(object sender, EntityBeforeEventArgs e)
        {
            base.OnDeleting(sender, e);
            var row = (Entity)sender;
            new UsrMCITRoleFormEngine(row.UserConnection).RequireManager();
        }
    }
}
