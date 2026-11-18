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

	#region Class: UsrProcess_8d3847eMethodsWrapper

	/// <exclude/>
	public class UsrProcess_8d3847eMethodsWrapper : ProcessModel
	{

		public UsrProcess_8d3847eMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			// MCIT Sync Portal Users — paste into a Creatio Script task (NOT a C# source file class).
			// Source: SysAdminUnit (internal users, SysAdminUnitTypeValue = 4).
			// Destination: UsrMCITPortalUserAccess (one row per UsrUser).
			// Idempotent: never changes existing Portal User Access rows.
			// Run only in an authorized environment as a user with read/write access.
			
			var manager = UserConnection.EntitySchemaManager;
			
			// 1. Resolve Portal status lookup records by name instead of assuming IDs.
			var statusQuery = new Terrasoft.Core.Entities.EntitySchemaQuery(manager, "UsrMCITUserStatus");
			statusQuery.PrimaryQueryColumn.IsAlwaysSelect = true;
			var statusNameColumn = statusQuery.AddColumn("Name");
			var statusIds = new System.Collections.Generic.Dictionary<string, System.Guid>(
			    System.StringComparer.OrdinalIgnoreCase);
			foreach (var status in statusQuery.GetEntityCollection(UserConnection)) {
			    var name = status.GetTypedColumnValue<string>(statusNameColumn.Name);
			    if (!System.String.IsNullOrWhiteSpace(name)) {
			        statusIds[name.Trim()] = status.PrimaryColumnValue;
			    }
			}
			if (!statusIds.ContainsKey("Active") || !statusIds.ContainsKey("Inactive")) {
			    throw new System.Exception("MCIT User Status lookup needs Active and Inactive rows.");
			}
			
			// 2. Read the SysAdminUnit user IDs that already have a Portal Access row.
			var existingQuery = new Terrasoft.Core.Entities.EntitySchemaQuery(
			    manager, "UsrMCITPortalUserAccess");
			existingQuery.PrimaryQueryColumn.IsAlwaysSelect = true;
			var existingUserColumn = existingQuery.AddColumn("UsrUser.Id");
			var existingUserIds = new System.Collections.Generic.HashSet<System.Guid>();
			foreach (var access in existingQuery.GetEntityCollection(UserConnection)) {
			    var linkedId = access.GetTypedColumnValue<System.Guid>(existingUserColumn.Name);
			    if (linkedId != System.Guid.Empty) existingUserIds.Add(linkedId);
			}
			
			// 3. Read real Creatio internal users, including Supervisor.
			var userQuery = new Terrasoft.Core.Entities.EntitySchemaQuery(manager, "SysAdminUnit");
			userQuery.PrimaryQueryColumn.IsAlwaysSelect = true;
			var userNameColumn = userQuery.AddColumn("Name");
			var userActiveColumn = userQuery.AddColumn("Active");
			userQuery.Filters.Add(userQuery.CreateFilterWithParameters(
			    Terrasoft.Core.Entities.FilterComparisonType.Equal,
			    "SysAdminUnitTypeValue", 4));
			
			var portalSchema = manager.GetInstanceByName("UsrMCITPortalUserAccess");
			var displayNameColumn = portalSchema.Columns.FindByName("UsrDisplayName")
			    ?? portalSchema.Columns.FindByCaption("Display Name");
			
			int created = 0;
			int alreadyExisted = 0;
			int excluded = 0;
			
			foreach (var user in userQuery.GetEntityCollection(UserConnection)) {
			    var userId = user.PrimaryColumnValue;
			    var userName = user.GetTypedColumnValue<string>(userNameColumn.Name);
			    var isActive = user.GetTypedColumnValue<bool>(userActiveColumn.Name);
			
			    if (userId == System.Guid.Empty || System.String.IsNullOrWhiteSpace(userName)) {
			        excluded++;
			        continue;
			    }
			    userName = userName.Trim();
			    // Service-only integration account is not a human user in the MCIT directory.
			    if (userName.Equals("SysPortalConnection", System.StringComparison.OrdinalIgnoreCase)) {
			        excluded++;
			        continue;
			    }
			    if (existingUserIds.Contains(userId)) {
			        alreadyExisted++;
			        continue;
			    }
			
			    // 4. Collect directly assigned functional roles for the new user's summary.
			    var rolesQuery = new Terrasoft.Core.Entities.EntitySchemaQuery(manager, "SysUserInRole");
			    var roleNameColumn = rolesQuery.AddColumn("SysRole.Name");
			    rolesQuery.Filters.Add(rolesQuery.CreateFilterWithParameters(
			        Terrasoft.Core.Entities.FilterComparisonType.Equal, "SysUser", userId));
			    rolesQuery.Filters.Add(rolesQuery.CreateFilterWithParameters(
			        Terrasoft.Core.Entities.FilterComparisonType.Equal,
			        "SysRole.SysAdminUnitTypeValue", 6));
			    var assignedRoles = new System.Collections.Generic.SortedSet<string>(
			        System.StringComparer.OrdinalIgnoreCase);
			    foreach (var member in rolesQuery.GetEntityCollection(UserConnection)) {
			        var roleName = member.GetTypedColumnValue<string>(roleNameColumn.Name);
			        if (!System.String.IsNullOrWhiteSpace(roleName)) assignedRoles.Add(roleName.Trim());
			    }
			    var roleSummary = System.String.Join(", ", assignedRoles);
			    if (roleSummary.Length > 500) {
			        throw new System.Exception("Assigned roles summary is longer than 500 characters for " + userName);
			    }
			
			    // 5. Add a missing row. Crucially: UsrUserId is the SysAdminUnit.Id,
			    //    NOT the display name, and NOT the Portal Access row Id.
			    var accessEntity = portalSchema.CreateEntity(UserConnection);
			    accessEntity.SetDefColumnValues();
			    accessEntity.SetColumnValue("UsrUserId", userId);
			    accessEntity.SetColumnValue("UsrName", userName);
			    if (displayNameColumn != null && displayNameColumn.Name != "Name") {
			        accessEntity.SetColumnValue(displayNameColumn.Name, userName);
			    }
			    accessEntity.SetColumnValue("UsrUserStatusId", statusIds[isActive ? "Active" : "Inactive"]);
			    accessEntity.SetColumnValue("UsrScopeSummary", "Contracts: 0, Authorities: 0");
			    accessEntity.SetColumnValue("UsrAssignedRolesSummary", roleSummary);
			    // Last Sign-in is intentionally left blank until the actual session sync runs.
			    if (!accessEntity.Save()) {
			        throw new System.Exception("Failed to create MCIT Portal Access for " + userName);
			    }
			    existingUserIds.Add(userId);
			    created++;
			}
			
			System.Diagnostics.Trace.WriteLine(
			    "MCIT Sync Portal Users: created=" + created +
			    ", already existed=" + alreadyExisted + ", excluded=" + excluded);
			return true;
		}

		#endregion

	}

	#endregion

}

