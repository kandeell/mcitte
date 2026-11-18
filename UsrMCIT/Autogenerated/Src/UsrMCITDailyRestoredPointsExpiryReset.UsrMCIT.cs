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

	#region Class: UsrMCITDailyRestoredPointsExpiryResetMethodsWrapper

	/// <exclude/>
	public class UsrMCITDailyRestoredPointsExpiryResetMethodsWrapper : ProcessModel
	{

		public UsrMCITDailyRestoredPointsExpiryResetMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			
			var service = new Terrasoft.Configuration
			    .UsrMCITRestoredPointsExpiryService(UserConnection);
			
			// 1. Check existing expiry ledger consistency.
			int issuesBefore = service.CountExpiryLedgerIssues();
			
			if (issuesBefore > 0)
			{
			    throw new System.InvalidOperationException(
			        "MCIT expiry ledger has " + issuesBefore +
			        " issue(s) before processing.");
			}
			
			// 2. Process pending restorations.
			int posted = service.ProcessPendingExpiries(
			    batchSize: 100,
			    maxRecordsPerRun: 1000
			);
			
			// 3. Verify ledger consistency after processing.
			int issuesAfter = service.CountExpiryLedgerIssues();
			
			if (issuesAfter > 0)
			{
			    throw new System.InvalidOperationException(
			        "MCIT expiry ledger has " + issuesAfter +
			        " issue(s) after processing.");
			}
			
			return true;
		}

		#endregion

	}

	#endregion

}

