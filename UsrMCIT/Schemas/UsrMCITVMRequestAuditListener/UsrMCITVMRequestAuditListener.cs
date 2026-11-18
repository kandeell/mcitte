/*
 * MCIT Business Audit — VM Request Entity Event Listener (V1)
 * Create as a Creatio "Source code" schema in the UsrMCIT package.
 * Schema name suggestion: UsrMCITVMRequestAuditListener
 *
 * Requires:
 *   UsrVMRequest object, columns UsrNumber and UsrStatus (lookup).
 *   UsrMCITBusinessAuditEvent object registered in Creatio with the fields used below.
 *
 * Server-side entity events capture ORM saves, NOT direct SQL writes. This initial
 * version records successful inserts and updates. Permission/retention hardening
 * is required before production.
 */
using System;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration
{
    [EntityEventListener(SchemaName = "UsrVMRequest")]
    public class UsrMCITVMRequestAuditListener : BaseEntityEventListener
    {
        private const string AuditSchema = "UsrMCITBusinessAuditEvent";
        private const string RequestSchema = "UsrVMRequest";

        public override void OnInserted(object sender, EntityAfterEventArgs e)
        {
            base.OnInserted(sender, e);
            var request = (Entity)sender;
            WriteAudit(request, e.PrimaryColumnValue, "VM_REQUEST_CREATED",
                "Created", "Request created", null, null, null);
        }

        public override void OnUpdated(object sender, EntityAfterEventArgs e)
        {
            base.OnUpdated(sender, e);
            var request = (Entity)sender;
            var changed = e.ModifiedColumnValues;
            var status = changed == null ? null :
                (changed.FindByName("UsrStatus") ?? changed.FindByName("UsrStatusId"));

            if (status != null && !Object.Equals(status.OldValue, status.Value))
            {
                // Only status lookup IDs are logged here, not arbitrary field data.
                WriteAudit(request, e.PrimaryColumnValue, "VM_REQUEST_STATUS_CHANGED",
                    "Status changed", "Request status changed", "UsrStatus",
                    ToSafeText(status.OldValue), ToSafeText(status.Value));
            }
            else
            {
                // One generic update event; do not log possibly sensitive field values.
                WriteAudit(request, e.PrimaryColumnValue, "VM_REQUEST_UPDATED",
                    "Updated", "Request updated", null, null, null);
            }
        }

        private static string ToSafeText(object value)
        {
            return value == null ? "" : value.ToString();
        }

        private static string RequestNumber(Entity request)
        {
            // Partial entity updates might not have UsrNumber loaded.
            if (!request.GetIsColumnValueLoaded("UsrNumber"))
            {
                return "";
            }
            var number = request.GetTypedColumnValue<string>("UsrNumber") ?? "";
            return number.Length <= 100 ? number : number.Substring(0, 100);
        }

        private static void WriteAudit(
            Entity request,
            Guid requestId,
            string eventCode,
            string action,
            string description,
            string fieldName,
            string oldValue,
            string newValue)
        {
            var userConnection = request.UserConnection;
            var schema = userConnection.EntitySchemaManager.GetInstanceByName(AuditSchema);
            var audit = schema.CreateEntity(userConnection);
            audit.SetDefColumnValues();

            var requestNumber = RequestNumber(request);
            var label = String.IsNullOrWhiteSpace(requestNumber)
                ? "VM Request " + requestId.ToString("D")
                : "VM Request " + requestNumber;

            audit.SetColumnValue("UsrName", label);
            audit.SetColumnValue("UsrEventCode", eventCode);
            audit.SetColumnValue("UsrModule", "VM Requests");
            audit.SetColumnValue("UsrRecordSchema", RequestSchema);
            audit.SetColumnValue("UsrRecordId", requestId);
            audit.SetColumnValue("UsrRecordNumber", requestNumber);
            audit.SetColumnValue("UsrAction", action);
            audit.SetColumnValue("UsrOutcome", "Success");
            audit.SetColumnValue("UsrDescription", description);

            var contactId = userConnection.CurrentUser.ContactId;
            if (contactId != Guid.Empty)
            {
                audit.SetColumnValue("UsrActorId", contactId);
            }
            if (!String.IsNullOrEmpty(fieldName))
            {
                audit.SetColumnValue("UsrFieldName", fieldName);
            }
            if (!String.IsNullOrEmpty(oldValue))
            {
                audit.SetColumnValue("UsrOldValue", oldValue);
            }
            if (!String.IsNullOrEmpty(newValue))
            {
                audit.SetColumnValue("UsrNewValue", newValue);
            }

            // Intentionally no UsrCorrelationId: no shared process correlation is known.
            // Save through Creatio's entity ORM, not an ad-hoc SQL statement.
            audit.Save(false);
        }
    }
}
