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

	#region Class: UsrMCITCreateFunctionalRoleMethodsWrapper

	/// <exclude/>
	public class UsrMCITCreateFunctionalRoleMethodsWrapper : ProcessModel
	{

		public UsrMCITCreateFunctionalRoleMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			
			Guid mcitRoleId = Get<Guid>("MCITRoleId");
			string roleName = Get<string>("RoleName");
			Guid parentRoleId = Get<Guid>("AllEmployeesRoleId");
			
			Set<bool>("ProvisioningSuccess", false);
			Set<Guid>("CreatedRoleId", Guid.Empty);
			Set<string>("ProvisioningError", "");
			
			try
			{
			    if (mcitRoleId == Guid.Empty)
			        throw new Exception("MCIT Role ID is missing.");
			
			    roleName = (roleName ?? "").Trim();
			    if (string.IsNullOrWhiteSpace(roleName))
			        throw new Exception("Role name is required.");
			
			    if (parentRoleId == Guid.Empty)
			        throw new Exception("All employees role was not found.");
			
			    // Check again to avoid reusing an existing functional role.
			    var query = new Terrasoft.Core.DB.Select(UserConnection)
			        .Top(1)
			        .Column("Id")
			        .From("SysAdminUnit")
			        .Where("Name").IsEqual(
			            Terrasoft.Core.DB.Column.Parameter(roleName))
			        .And("SysAdminUnitTypeValue").IsEqual(
			            Terrasoft.Core.DB.Column.Parameter(6))
			        as Terrasoft.Core.DB.Select;
			
			    Guid existingId = query.ExecuteScalar<Guid>();
			
			    if (existingId != Guid.Empty)
			        throw new Exception("Functional Role already exists.");
			
			    // Create the native system administration unit.
			    var role = new Terrasoft.Core.Configuration.SysAdminUnit(
			        UserConnection
			    );
			
			    role.SetDefColumnValues();
			    role.Id = Guid.NewGuid();
			    role.Name = roleName;
			    role.SysAdminUnitTypeValue =
			        Terrasoft.Core.DB.SysAdminUnitType.FunctionalRole;
			    role.ConnectionType = Terrasoft.Core.UserType.General;
			    role.ParentRoleId = parentRoleId;
			    role.Active = true;
			
			    if (!role.Save())
			        throw new Exception("Unable to save Functional Role.");
			
			    Set<Guid>("CreatedRoleId", role.Id);
			    Set<bool>("ProvisioningSuccess", true);
			}
			catch (Exception ex)
			{
			    Set<string>("ProvisioningError", ex.Message);
			    Set<bool>("ProvisioningSuccess", false);
			}
			
			return true;
		}

		#endregion

	}

	#endregion

}

