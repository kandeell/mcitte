using System;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Runtime.Serialization;
using System.Security;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Core.DB;
using Terrasoft.Core.Entities;
using Terrasoft.Web.Common;

namespace Terrasoft.Configuration
{
    [DataContract]
    public class UsrMCITResourceCreateRequest
    {
        [DataMember] public string Name { get; set; }
        [DataMember] public string ArabicName { get; set; }
        [DataMember] public string Code { get; set; }
        [DataMember] public string Unit { get; set; }
        [DataMember] public decimal? MinValue { get; set; }
        [DataMember] public decimal? MaxValue { get; set; }
        [DataMember] public decimal? Increment { get; set; }
        [DataMember] public string StartDate { get; set; }
        [DataMember] public string EndDate { get; set; }
        [DataMember] public bool IsActive { get; set; }
        [DataMember] public string CategoryId { get; set; }
    }

    [DataContract]
    public class UsrMCITSecureOperationResult
    {
        [DataMember] public bool Success { get; set; }
        [DataMember] public string Message { get; set; }
        [DataMember] public Guid RecordId { get; set; }
    }

    [ServiceContract]
    [AspNetCompatibilityRequirements(
        RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrMCITSecureOperationsService : BaseService
    {
        [OperationContract]
        [WebInvoke(
            Method = "POST",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Wrapped)]
        public UsrMCITSecureOperationResult CreateResource(
            UsrMCITResourceCreateRequest resource)
        {
            try
            {
                // Authorize using the authenticated user's *current* MCIT role.
                // No caller-supplied role, screen, object, or SQL identifiers.
                UsrMCITPermissionPolicy.DemandScreenAction(
                    UserConnection, "RESOURCE_CATALOG", "UsrCanCreate");

                if (resource == null)
                    throw new ArgumentException("Resource data is required.");

                string name = (resource.Name ?? "").Trim();
                string code = (resource.Code ?? "").Trim();
                string arabicName = (resource.ArabicName ?? "").Trim();
                string unit = (resource.Unit ?? "").Trim();

                if (name.Length == 0 || code.Length == 0)
                    throw new ArgumentException(
                        "English Name and Resource code are required.");

                if ((resource.MinValue.HasValue && resource.MinValue.Value < 0) ||
                    (resource.MaxValue.HasValue && resource.MaxValue.Value < 0) ||
                    (resource.Increment.HasValue && resource.Increment.Value < 0))
                    throw new ArgumentException(
                        "Resource values must not be negative.");

                if (resource.Increment.HasValue && resource.Increment.Value == 0)
                    throw new ArgumentException(
                        "Increment must be greater than zero when specified.");

                if (resource.MinValue.HasValue && resource.MaxValue.HasValue &&
                    resource.MinValue.Value > resource.MaxValue.Value)
                    throw new ArgumentException("Minimum exceeds maximum.");

                DateTime? start = ParseDate(resource.StartDate, "Start Date");
                DateTime? end = ParseDate(resource.EndDate, "End Date");
                if (start.HasValue && end.HasValue && start.Value > end.Value)
                    throw new ArgumentException("End Date precedes Start Date.");

                // Category metadata comes from the fixed server-side schema,
                // never from a client-selected table name.
                var schema = UserConnection.EntitySchemaManager
                    .GetInstanceByName("UsrMCITResourceType");
                Guid categoryId = Guid.Empty;
                if (!String.IsNullOrWhiteSpace(resource.CategoryId))
                {
                    if (!Guid.TryParse(resource.CategoryId, out categoryId) ||
                        categoryId == Guid.Empty)
                        throw new ArgumentException("Invalid Category identifier.");

                    var column = schema.Columns.FirstOrDefault(
                        x => x.Name == "UsrCategory");
                    if (column == null || column.ReferenceSchema == null)
                        throw new InvalidOperationException(
                            "Category lookup is missing.");

                    Select categoryQuery = new Select(UserConnection);
                    categoryQuery.Top(1)
                        .Column("Id")
                        .From(column.ReferenceSchema.Name)
                        .Where("Id")
                        .IsEqual(Column.Parameter(categoryId));

                    if (categoryQuery.ExecuteScalar<Guid>() == Guid.Empty)
                        throw new ArgumentException(
                            "Selected Category does not exist.");
                }

                Select duplicateQuery = new Select(UserConnection);
                duplicateQuery.Top(1)
                    .Column("Id")
                    .From("UsrMCITResourceType")
                    .Where("UsrCode")
                    .IsEqual(Column.Parameter(code));
                if (duplicateQuery.ExecuteScalar<Guid>() != Guid.Empty)
                    throw new ArgumentException("Resource code already exists.");

                // Deliberate, narrowly scoped exception to BaseLookup Save events.
                // The MCIT permission check above is mandatory. This DB Insert
                // bypasses BaseLookup's CanManageLookups event and ALSO bypasses
                // normal entity events / default record-right initialization.
                // Use only for the fixed UsrMCITResourceType object.
                Guid newId = Guid.NewGuid();
                Guid currentContactId = UserConnection.CurrentUser.ContactId;
                DateTime now = DateTime.UtcNow;

                Insert insert = new Insert(UserConnection)
                    .Into("UsrMCITResourceType")
                    .Set("Id", Column.Parameter(newId))
                    .Set("CreatedOn", Column.Parameter(now))
                    .Set("CreatedById", Column.Parameter(currentContactId))
                    .Set("ModifiedOn", Column.Parameter(now))
                    .Set("ModifiedById", Column.Parameter(currentContactId))
                    .Set("Name", Column.Parameter(name))
                    .Set("Description", Column.Parameter(String.Empty))
                    .Set("ProcessListeners", Column.Parameter(0))
                    .Set("UsrCode", Column.Parameter(code))
                    .Set("UsrArabicName", Column.Parameter(arabicName))
                    .Set("UsrUnit", Column.Parameter(unit))
                    .Set("UsrActive", Column.Parameter(resource.IsActive))
                    .Set("UsrAllContracts", Column.Parameter(false))
                    .Set("UsrMinValue", Column.Parameter(resource.MinValue ?? 0m))
                    .Set("UsrMaxValue", Column.Parameter(resource.MaxValue ?? 0m))
                    .Set("UsrIncrement", Column.Parameter(resource.Increment ?? 0m));

                if (categoryId != Guid.Empty)
                    insert.Set("UsrCategoryId", Column.Parameter(categoryId));
                if (start.HasValue)
                    insert.Set("UsrStartDate", Column.Parameter(start.Value));
                if (end.HasValue)
                    insert.Set("UsrEndDate", Column.Parameter(end.Value));

                int affectedRows = insert.Execute();
                if (affectedRows != 1)
                    throw new InvalidOperationException(
                        "Resource insert did not affect exactly one row.");

                Trace.TraceInformation(
                    "MCIT Resource created. Id={0}; CreatedByContact={1}",
                    newId, currentContactId);

                return new UsrMCITSecureOperationResult
                {
                    Success = true,
                    RecordId = newId,
                    Message = "Resource created."
                };
            }
            catch (SecurityException)
            {
                return new UsrMCITSecureOperationResult
                {
                    Success = false,
                    Message = "Resource Catalog Create permission is required."
                };
            }
            catch (UnauthorizedAccessException)
            {
                return new UsrMCITSecureOperationResult
                {
                    Success = false,
                    Message = "Resource Catalog Create permission is required."
                };
            }
            catch (ArgumentException error)
            {
                return new UsrMCITSecureOperationResult
                {
                    Success = false,
                    Message = error.Message
                };
            }
            catch (Exception error)
            {
                Trace.TraceError("MCIT CreateResource failed: " + error);
                return new UsrMCITSecureOperationResult
                {
                    Success = false,
                    Message = "Resource save failed. Check the Creatio server logs."
                };
            }
        }

        private static DateTime? ParseDate(string value, string label)
        {
            if (String.IsNullOrWhiteSpace(value))
                return null;

            DateTime parsed;
            if (!DateTime.TryParseExact(
                value.Trim(), "yyyy-MM-dd", CultureInfo.InvariantCulture,
                DateTimeStyles.None, out parsed))
                throw new ArgumentException(label + " must use yyyy-MM-dd.");

            return parsed;
        }
    }
}
