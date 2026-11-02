namespace Terrasoft.Core.Process
{

	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Drawing;
	using System.Globalization;
	using System.Text;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Process;
	using Terrasoft.Core.Process.Configuration;

	#region Class: UsrProcess_e66223cMethodsWrapper

	/// <exclude/>
	public class UsrProcess_e66223cMethodsWrapper : ProcessModel
	{

		public UsrProcess_e66223cMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			
			var accessQuery = new Terrasoft.Core.Entities.EntitySchemaQuery(
			    UserConnection.EntitySchemaManager,
			    "UsrMCITPortalUserAccess"
			);
			
			accessQuery.PrimaryQueryColumn.IsAlwaysSelect = true;
			
			var userCol = accessQuery.AddColumn("UsrUser.Id");
			var summaryCol = accessQuery.AddColumn("UsrAssignedRolesSummary");
			
			var accessRecords = accessQuery.GetEntityCollection(UserConnection);
			
			foreach (var access in accessRecords)
			{
			    var userId = access.GetTypedColumnValue<System.Guid>(userCol.Name);
			
			    if (userId == System.Guid.Empty)
			        continue;
			
			    // Read directly assigned functional roles
			    var roleQuery = new Terrasoft.Core.Entities.EntitySchemaQuery(
			        UserConnection.EntitySchemaManager,
			        "SysUserInRole"
			    );
			
			    var roleNameCol = roleQuery.AddColumn("SysRole.Name");
			
			    roleQuery.Filters.Add(
			        roleQuery.CreateFilterWithParameters(
			            Terrasoft.Core.Entities.FilterComparisonType.Equal,
			            "SysUser",
			            userId
			        )
			    );
			
			    // Functional roles have type 6
			    roleQuery.Filters.Add(
			        roleQuery.CreateFilterWithParameters(
			            Terrasoft.Core.Entities.FilterComparisonType.Equal,
			            "SysRole.SysAdminUnitTypeValue",
			            6
			        )
			    );
			
			    var roles = new System.Collections.Generic.SortedSet<string>(
			        System.StringComparer.OrdinalIgnoreCase
			    );
			
			    foreach (var role in roleQuery.GetEntityCollection(UserConnection))
			    {
			        var name = role.GetTypedColumnValue<string>(roleNameCol.Name);
			
			        if (!string.IsNullOrWhiteSpace(name))
			            roles.Add(name);
			    }
			
			    var summary = string.Join(", ", roles);
			
			    if (summary.Length > 500)
			        throw new System.Exception("Assigned roles exceed 500 characters.");
			
			    var oldSummary =
			        access.GetTypedColumnValue<string>(summaryCol.Name) ?? "";
			
			    if (oldSummary != summary)
			    {
			        access.SetColumnValue("UsrAssignedRolesSummary", summary);
			        access.Save();
			    }
			}
			
			return true;
		}

		#endregion

	}

	#endregion

}

