 
namespace Terrasoft.Configuration
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using Terrasoft.Web.Common;

    [DataContract]
    public class MCITReportReadResult
    {
        [DataMember]
        public bool OperationPermissionsEnabled { get; set; }

        [DataMember]
        public List<MCITReportUserResult> Users { get; set; }
    }

    [DataContract]
    public class MCITReportUserResult
    {
        [DataMember]
        public string UserName { get; set; }

        [DataMember]
        public bool CanRead { get; set; }
    }

    [ServiceContract]
    [AspNetCompatibilityRequirements(
        RequirementsMode =
        AspNetCompatibilityRequirementsMode.Required)]
    public class UsrMCITReportReadDiagnostic : BaseService
    {
        [OperationContract]
        [WebInvoke(
            Method = "POST",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Wrapped)]
        public MCITReportReadResult Check()
        {
            var security = UserConnection.DBSecurityEngine;

            // Only authorized administrators may run this diagnostic.
            if (!security.GetCanExecuteOperation(
                    "CanManageAdministration") ||
                !security.GetCanExecuteOperation(
                    "CanManageUsers"))
            {
                throw new UnauthorizedAccessException(
                    "Administrator permissions required.");
            }

            const string objectName = "UsrMCITReportCatalog";

            var users = new List<MCITReportUserResult>();

            users.Add(CheckUser(
                "Supervisor",
                "7F3B869F-34F3-4F20-AB4D-7480A5FDF647",
                objectName));

            users.Add(CheckUser(
                "ahmed",
                "A90975D0-5E36-45ED-B18E-FBE5C6750319",
                objectName));

            users.Add(CheckUser(
                "Omar",
                "CF8EBEFF-6DC6-4715-BCDA-E941C53F3688",
                objectName));

            return new MCITReportReadResult
            {
                OperationPermissionsEnabled =
                    security.GetIsEntitySchemaAdministratedByOperations(
                        objectName),
                Users = users
            };
        }

        private MCITReportUserResult CheckUser(
            string name, string id, string objectName)
        {
            return new MCITReportUserResult
            {
                UserName = name,
                CanRead = UserConnection.DBSecurityEngine
                    .GetIsEntitySchemaReadingAllowed(
                        Guid.Parse(id), objectName)
            };
        }
    }
}
