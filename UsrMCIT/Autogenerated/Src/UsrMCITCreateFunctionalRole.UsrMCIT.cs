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
			Set<bool>("ProvisioningSuccess", false);
			Set<Guid>("CreatedRoleId", Guid.Empty);
			Set<string>("ProvisioningError", "");
			try {
			    Guid roleId = Get<Guid>("MCITRoleId");
			    Guid nativeId = Terrasoft.Configuration.UsrMCITRoleSynchronization.Synchronize(UserConnection, roleId);
			    Set<Guid>("CreatedRoleId", nativeId);
			    Set<bool>("ProvisioningSuccess", true);
			} catch (Exception error) {
			    string details = error.ToString();
			
			    Set<string>(
			        "ProvisioningError",
			        details.Length > 250
			            ? details.Substring(0, 250)
			            : details
			    );
			}
			
			return true;
		}

		#endregion

	}

	#endregion

}

