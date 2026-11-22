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

	#region Class: UsrMCITProcessSingleExpiredRestorationMethodsWrapper

	/// <exclude/>
	public class UsrMCITProcessSingleExpiredRestorationMethodsWrapper : ProcessModel
	{

		public UsrMCITProcessSingleExpiredRestorationMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			
			Guid restorationId = Get<Guid>("UsrRestorationTransactionId");
			
			if (restorationId == Guid.Empty) {
			    throw new InvalidOperationException(
			        "Restoration Transaction ID is missing.");
			}
			
			var restorationTypeId = new Guid(
			    "A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9");
			var consumptionTypeId = new Guid(
			    "CCE3062D-A79E-4ADB-BAFE-F731CA2B3340");
			var expiryTypeId = new Guid(
			    "D453D044-57BC-46CE-87FA-90E640B2E6F8");
			var restoredBalanceId = new Guid(
			    "BA34D604-C14E-49E1-80A4-1AAE00302C3F");
			
			Guid actorId = UserConnection.CurrentUser.ContactId;
			
			string sql = @"
			SET NOCOUNT ON;
			
			DECLARE @LockResult int;
			DECLARE @Resource nvarchar(255) =
			    N'MCIT-Expiry-' + CONVERT(nvarchar(36), @RestorationId);
			
			EXEC @LockResult = sys.sp_getapplock
			    @Resource = @Resource,
			    @LockMode = 'Exclusive',
			    @LockOwner = 'Transaction',
			    @LockTimeout = 15000;
			
			IF @LockResult < 0
			    THROW 51001, 'Could not acquire restoration expiry lock.', 1;
			
			DECLARE @Restored decimal(18,8);
			DECLARE @Consumed decimal(18,8) = 0;
			DECLARE @Remaining decimal(18,8);
			
			SELECT @Restored = UsrQuantity
			FROM dbo.UsrPointTransaction WITH (UPDLOCK, HOLDLOCK)
			WHERE Id = @RestorationId
			  AND UsrTransactionTypeId = @RestorationTypeId
			  AND UsrExpirationDate <= CONVERT(date, GETDATE());
			
			IF @Restored IS NULL
			BEGIN
			    SELECT CAST(0 AS int);
			    RETURN;
			END;
			
			IF EXISTS (
			    SELECT 1
			    FROM dbo.UsrPointTransaction WITH (UPDLOCK, HOLDLOCK)
			    WHERE UsrOriginTransactionId = @RestorationId
			      AND UsrTransactionTypeId = @ExpiryTypeId
			)
			BEGIN
			    SELECT CAST(0 AS int);
			    RETURN;
			END;
			
			SELECT @Consumed = COALESCE(SUM(a.UsrQuantity), 0)
			FROM dbo.UsrPointAllocation a WITH (UPDLOCK, HOLDLOCK)
			JOIN dbo.UsrPointTransaction t
			    ON t.Id = a.UsrUsageTransactionId
			WHERE a.UsrSourceTransactionId = @RestorationId
			  AND t.UsrTransactionTypeId = @ConsumptionTypeId;
			
			SET @Remaining = @Restored - @Consumed;
			
			IF @Remaining < 0
			    THROW 51002, 'Consumed points exceed restored points.', 1;
			
			IF @Remaining = 0
			BEGIN
			    SELECT CAST(0 AS int);
			    RETURN;
			END;
			
			DECLARE @ExpiryId uniqueidentifier = NEWID();
			
			INSERT INTO dbo.UsrPointTransaction (
			    Id,
			    CreatedOn, CreatedById,
			    ModifiedOn, ModifiedById,
			    UsrName,
			    UsrQuantity,
			    UsrTransactionDate,
			    UsrTransactionTypeId,
			    UsrContractId,
			    UsrOriginTransactionId,
			    UsrSourceBalanceId,
			    UsrConfigVersionId,
			    UsrVirtualMachineId,
			    UsrRequestId,
			    UsrRequestItemId,
			    UsrActorId,
			    UsrReason
			)
			SELECT
			    @ExpiryId,
			    GETDATE(), @ActorId,
			    GETDATE(), @ActorId,
			    N'Restored Points Expiry',
			    @Remaining,
			    GETDATE(),
			    @ExpiryTypeId,
			    r.UsrContractId,
			    @RestorationId,
			    @RestoredBalanceId,
			    r.UsrConfigVersionId,
			    r.UsrVirtualMachineId,
			    r.UsrRequestId,
			    r.UsrRequestItemId,
			    @ActorId,
			    N'Unused restored points expired after one year'
			FROM dbo.UsrPointTransaction r
			WHERE r.Id = @RestorationId;
			
			IF @@ROWCOUNT <> 1
			    THROW 51003, 'Could not create expiry transaction.', 1;
			
			INSERT INTO dbo.UsrPointAllocation (
			    Id,
			    CreatedOn, CreatedById,
			    ModifiedOn, ModifiedById,
			    UsrName,
			    UsrSourceTransactionId,
			    UsrUsageTransactionId,
			    UsrQuantity
			)
			VALUES (
			    NEWID(),
			    GETDATE(), @ActorId,
			    GETDATE(), @ActorId,
			    N'Restored Points Expiry Allocation',
			    @RestorationId,
			    @ExpiryId,
			    @Remaining
			);
			
			IF @@ROWCOUNT <> 1
			    THROW 51004, 'Could not create expiry allocation.', 1;
			
			SELECT CAST(1 AS int);
			";
			
			using (var db = UserConnection.EnsureDBConnection()) {
			    db.StartTransaction(System.Data.IsolationLevel.Serializable);
			
			    try {
			        var query = new Terrasoft.Core.DB.CustomQuery(
			            UserConnection, sql)
			            .WithParameter("RestorationId", restorationId)
			            .WithParameter("RestorationTypeId", restorationTypeId)
			            .WithParameter("ConsumptionTypeId", consumptionTypeId)
			            .WithParameter("ExpiryTypeId", expiryTypeId)
			            .WithParameter("RestoredBalanceId", restoredBalanceId)
			            .WithParameter("ActorId", actorId);
			
			        int result = query.ExecuteScalar<int>(db);
			
			        db.CommitTransaction();
			    }
			    catch {
			        db.RollbackTransaction();
			        throw;
			    }
			}
			
			return true;
		}

		#endregion

	}

	#endregion

}

