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

	#region Class: UsrProcess_ba5fc23MethodsWrapper

	/// <exclude/>
	public class UsrProcess_ba5fc23MethodsWrapper : ProcessModel
	{

		public UsrProcess_ba5fc23MethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			
			var service = new Terrasoft.Configuration
			    .UsrMCITRestoredPointsExpiryService(UserConnection);
			
			// Verify ledger before processing
			if (service.CountExpiryLedgerIssues() > 0) {
			    throw new System.InvalidOperationException(
			        "Expiry ledger has existing inconsistencies.");
			}
			
			// Run expiry processing
			service.ProcessPendingExpiries(
			    batchSize: 100,
			    maxRecordsPerRun: 1000
			);
			
			// Verify ledger after processing
			if (service.CountExpiryLedgerIssues() > 0) {
			    throw new System.InvalidOperationException(
			        "Expiry ledger verification failed.");
			}
			
			return true;
		}

		#endregion

	}

	#endregion

}

