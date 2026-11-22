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

	#region Class: UsrMCITRepairTechnicalRoleMethodsWrapper

	/// <exclude/>
	public class UsrMCITRepairTechnicalRoleMethodsWrapper : ProcessModel
	{

		public UsrMCITRepairTechnicalRoleMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			
			Guid mcitRoleId = new Guid(
			    "D48DAECB-0226-4C65-AB8E-937B0170294B"
			);
			
			Guid nativeRoleId =
			    Terrasoft.Configuration.UsrMCITRoleSynchronization
			        .Synchronize(UserConnection, mcitRoleId);
			
			return true;
		}

		#endregion

	}

	#endregion

}

