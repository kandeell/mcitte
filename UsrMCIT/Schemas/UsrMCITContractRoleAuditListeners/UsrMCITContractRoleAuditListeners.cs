
/*
 * MCIT Contract and Role Audit Listeners V2
 * Creatio Realese | Package: UsrMCIT
 * Source-code schema name: UsrMCITContractRoleAuditListeners *
 * Source objects: UsrMCITContract / UsrMCITRole
 * Destination: UsrMCITBusinessAuditEvent
 */

using System;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration
{
    [EntityEventListener(SchemaName = "UsrMCITContract")]
    public class UsrMCITContractAuditListener : BaseEntityEventListener
    {
        public override void OnInserted(object sender, EntityAfterEventArgs e)
        {
            base.OnInserted(sender, e);

            UsrMCITContractRoleAuditWriter.Write(
                (Entity)sender,
                e.PrimaryColumnValue,
                "MCIT_CONTRACT_CREATED",
                "Contracts",
                "UsrMCITContract",
                "Created");
        }

        public override void OnUpdated(object sender, EntityAfterEventArgs e)
        {
            base.OnUpdated(sender, e);

            UsrMCITContractRoleAuditWriter.Write(
                (Entity)sender,
                e.PrimaryColumnValue,
                "MCIT_CONTRACT_UPDATED",
                "Contracts",
                "UsrMCITContract",
                "Updated");
        }
    }

    [EntityEventListener(SchemaName = "UsrMCITRole")]
    public class UsrMCITRoleAuditListener : BaseEntityEventListener
    {
        public override void OnInserted(object sender, EntityAfterEventArgs e)
        {
            base.OnInserted(sender, e);

            UsrMCITContractRoleAuditWriter.Write(
                (Entity)sender,
                e.PrimaryColumnValue,
                "MCIT_ROLE_CREATED",
                "MCIT Roles",
                "UsrMCITRole",
                "Created");
        }

        public override void OnUpdated(object sender, EntityAfterEventArgs e)
        {
            base.OnUpdated(sender, e);

            UsrMCITContractRoleAuditWriter.Write(
                (Entity)sender,
                e.PrimaryColumnValue,
                "MCIT_ROLE_UPDATED",
                "MCIT Roles",
                "UsrMCITRole",
                "Updated");
        }
    }

    internal static class UsrMCITContractRoleAuditWriter
    {
        private const string AuditSchemaName = "UsrMCITBusinessAuditEvent";

        internal static void Write(
            Entity source,
            Guid sourceId,
            string eventCode,
            string module,
            string sourceSchema,
            string action)
        {
            var uc = source.UserConnection;

            var auditSchema = uc.EntitySchemaManager
                .GetInstanceByName(AuditSchemaName);

            var audit = auditSchema.CreateEntity(uc);
            audit.SetDefColumnValues();

            var identifier = ReadIdentifier(
                source,
                sourceId,
                sourceSchema);

            var identifierOrId =
                String.IsNullOrWhiteSpace(identifier)
                    ? sourceId.ToString("D")
                    : identifier;

            var label =
                module + " " + action + " - " + identifierOrId;

            audit.SetColumnValue(
                "UsrName",
                Limit(label, 250));

            audit.SetColumnValue("UsrEventCode", eventCode);
            audit.SetColumnValue("UsrModule", module);
            audit.SetColumnValue("UsrRecordSchema", sourceSchema);
            audit.SetColumnValue("UsrRecordId", sourceId);

            if (!String.IsNullOrWhiteSpace(identifier))
            {
                audit.SetColumnValue(
                    "UsrRecordNumber",
                    identifier);
            }

            audit.SetColumnValue("UsrAction", action);
            audit.SetColumnValue("UsrOutcome", "Success");

            audit.SetColumnValue(
                "UsrDescription",
                module + " entity " + action.ToLowerInvariant());

            var actorId = uc.CurrentUser.ContactId;

            if (actorId != Guid.Empty)
            {
                audit.SetColumnValue("UsrActorId", actorId);
            }

            audit.Save(false);
        }

        private static string ReadIdentifier(
            Entity source,
            Guid id,
            string schemaName)
        {
            string columnName = null;

            if (schemaName == "UsrMCITContract")
            {
                columnName = "UsrNumber";
            }
            else if (source.Schema.PrimaryDisplayColumn != null)
            {
                columnName =
                    source.Schema.PrimaryDisplayColumn.Name;
            }

            if (String.IsNullOrWhiteSpace(columnName)
                || columnName == "Id")
            {
                return "";
            }

            try
            {
                if (source.GetIsColumnValueLoaded(columnName))
                {
                    var loadedValue =
                        source.GetColumnValue(columnName);

                    if (loadedValue != null &&
                        !String.IsNullOrWhiteSpace(
                            loadedValue.ToString()))
                    {
                        return Limit(
                            loadedValue.ToString(),
                            100);
                    }
                }

                var esq = new EntitySchemaQuery(
                    source.UserConnection.EntitySchemaManager,
                    schemaName);

                var displayColumn = esq.AddColumn(columnName);

                var found = esq.GetEntity(
                    source.UserConnection,
                    id);

                if (found != null)
                {
                    var value = found.GetColumnValue(
                        displayColumn.Name);

                    if (value != null)
                    {
                        return Limit(value.ToString(), 100);
                    }
                }
            }
            catch (Exception)
            {
                // Optional identifier enrichment.
                // The event can still be saved using its GUID.
            }

            return "";
        }

        private static string Limit(
            string value,
            int maxLength)
        {
            return value != null && value.Length > maxLength
                ? value.Substring(0, maxLength)
                : value ?? "";
        }
    }
}
