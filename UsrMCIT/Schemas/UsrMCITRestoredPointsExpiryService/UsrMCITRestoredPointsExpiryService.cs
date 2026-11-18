
using System;
using System.Collections.Generic;
using System.Data;
using Terrasoft.Core;
using Terrasoft.Core.DB;

namespace Terrasoft.Configuration
{
    public class UsrMCITRestoredPointsExpiryService
    {
        private readonly UserConnection _userConnection;

        private static readonly Guid RestorationTypeId =
            new Guid("A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9");

        private static readonly Guid ConsumptionTypeId =
            new Guid("CCE3062D-A79E-4ADB-BAFE-F731CA2B3340");

        private static readonly Guid ConsumptionFromRestoredTypeId =
            new Guid("DB304861-706C-4974-94AF-F337300181D0");

        private static readonly Guid ExpiryTypeId =
            new Guid("D453D044-57BC-46CE-87FA-90E640B2E6F8");

        private static readonly Guid RestoredBalanceId =
            new Guid("BA34D604-C14E-49E1-80A4-1AAE00302C3F");

        public UsrMCITRestoredPointsExpiryService(
            UserConnection userConnection)
        {
            _userConnection = userConnection
                ?? throw new ArgumentNullException(
                    nameof(userConnection));
        }

        private sealed class Candidate
        {
            public Guid Id { get; set; }
            public DateTime ExpirationDate { get; set; }
        }

        // Find expired restorations that still have
        // unused points and have not been processed.
        // Uses keyset pagination for bounded batches.
        private List<Candidate> FindPending(
            int batchSize,
            DateTime lastDate,
            Guid lastId)
        {
            const string sql = @"
SELECT TOP (@BatchSize)
    r.Id,
    r.UsrExpirationDate
FROM dbo.UsrPointTransaction r
WHERE r.UsrTransactionTypeId = @RestorationTypeId
  AND r.UsrExpirationDate <= CONVERT(date, GETDATE())

  AND (
        r.UsrExpirationDate > @LastDate
        OR (
            r.UsrExpirationDate = @LastDate
            AND r.Id > @LastId
        )
  )

  AND NOT EXISTS (
      SELECT 1
      FROM dbo.UsrPointTransaction e
      WHERE e.UsrOriginTransactionId = r.Id
        AND e.UsrTransactionTypeId = @ExpiryTypeId
  )

  AND r.UsrQuantity > COALESCE((
      SELECT SUM(a.UsrQuantity)
      FROM dbo.UsrPointAllocation a
      INNER JOIN dbo.UsrPointTransaction t
          ON t.Id = a.UsrUsageTransactionId
      WHERE a.UsrSourceTransactionId = r.Id
        AND t.UsrTransactionTypeId IN (
            @ConsumptionTypeId,
            @ConsumptionFromRestoredTypeId
        )
  ), 0)

ORDER BY
    r.UsrExpirationDate,
    r.Id;";

            var results = new List<Candidate>();

            using (var db = _userConnection.EnsureDBConnection())
            {
                var query = new CustomQuery(_userConnection, sql)
                    .WithParameter("BatchSize", batchSize)
                    .WithParameter(
                        "RestorationTypeId",
                        RestorationTypeId)
                    .WithParameter(
                        "ConsumptionTypeId",
                        ConsumptionTypeId)
                    .WithParameter(
                        "ConsumptionFromRestoredTypeId",
                        ConsumptionFromRestoredTypeId)
                    .WithParameter(
                        "ExpiryTypeId",
                        ExpiryTypeId)
                    .WithParameter("LastDate", lastDate)
                    .WithParameter("LastId", lastId);

                using (IDataReader reader = query.ExecuteReader(db))
                {
                    while (reader.Read())
                    {
                        results.Add(new Candidate
                        {
                            Id = reader.GetGuid(0),
                            ExpirationDate = reader.GetDateTime(1)
                        });
                    }
                }
            }

            return results;
        }

        // Atomically post one expiry transaction
        // and one matching allocation.
        // Returns false if already processed,
        // ineligible, or fully consumed.
        public bool PostExpiry(Guid restorationId)
        {
            if (restorationId == Guid.Empty)
            {
                throw new ArgumentException(
                    "Restoration Transaction ID is missing.");
            }

            Guid actorId =
                _userConnection.CurrentUser.ContactId;

            const string sql = @"
SET NOCOUNT ON;

DECLARE @LockResult int;

DECLARE @Resource nvarchar(255) =
    N'MCIT-Expiry-' +
    CONVERT(nvarchar(36), @RestorationId);

EXEC @LockResult = sys.sp_getapplock
    @Resource = @Resource,
    @LockMode = 'Exclusive',
    @LockOwner = 'Transaction',
    @LockTimeout = 15000;

IF @LockResult < 0
    THROW 51001,
        'Could not acquire restoration expiry lock.', 1;

DECLARE @Restored decimal(18,8);
DECLARE @Consumed decimal(18,8) = 0;
DECLARE @Remaining decimal(18,8);

-- Lock the source restoration.
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

-- Prevent duplicate expiry posting.
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

-- Count both generic and restored-specific
-- consumption transactions allocated
-- against this restoration.
SELECT @Consumed =
    COALESCE(SUM(a.UsrQuantity), 0)
FROM dbo.UsrPointAllocation a WITH (UPDLOCK, HOLDLOCK)
INNER JOIN dbo.UsrPointTransaction t
    ON t.Id = a.UsrUsageTransactionId
WHERE a.UsrSourceTransactionId = @RestorationId
  AND t.UsrTransactionTypeId IN (
      @ConsumptionTypeId,
      @ConsumptionFromRestoredTypeId
  );

SET @Remaining = @Restored - @Consumed;

IF @Remaining < 0
    THROW 51002,
        'Consumed points exceed restored points.', 1;

-- Nothing left to expire.
IF @Remaining = 0
BEGIN
    SELECT CAST(0 AS int);
    RETURN;
END;

DECLARE @ExpiryId uniqueidentifier = NEWID();

-- Create expiry transaction.
INSERT INTO dbo.UsrPointTransaction (
    Id,
    CreatedOn,
    CreatedById,
    ModifiedOn,
    ModifiedById,
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
    GETDATE(),
    @ActorId,
    GETDATE(),
    @ActorId,
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
    THROW 51003,
        'Could not create expiry transaction.', 1;

-- Create matching expiry allocation.
INSERT INTO dbo.UsrPointAllocation (
    Id,
    CreatedOn,
    CreatedById,
    ModifiedOn,
    ModifiedById,
    UsrName,
    UsrSourceTransactionId,
    UsrUsageTransactionId,
    UsrQuantity
)
VALUES (
    NEWID(),
    GETDATE(),
    @ActorId,
    GETDATE(),
    @ActorId,
    N'Restored Points Expiry Allocation',
    @RestorationId,
    @ExpiryId,
    @Remaining
);

IF @@ROWCOUNT <> 1
    THROW 51004,
        'Could not create expiry allocation.', 1;

SELECT CAST(1 AS int);";

            using (var db =
                _userConnection.EnsureDBConnection())
            {
                db.StartTransaction(
                    IsolationLevel.Serializable);

                try
                {
                    var query =
                        new CustomQuery(_userConnection, sql)
                        .WithParameter(
                            "RestorationId",
                            restorationId)
                        .WithParameter(
                            "RestorationTypeId",
                            RestorationTypeId)
                        .WithParameter(
                            "ConsumptionTypeId",
                            ConsumptionTypeId)
                        .WithParameter(
                            "ConsumptionFromRestoredTypeId",
                            ConsumptionFromRestoredTypeId)
                        .WithParameter(
                            "ExpiryTypeId",
                            ExpiryTypeId)
                        .WithParameter(
                            "RestoredBalanceId",
                            RestoredBalanceId)
                        .WithParameter(
                            "ActorId",
                            actorId);

                    int result =
                        query.ExecuteScalar<int>(db);

                    db.CommitTransaction();

                    return result == 1;
                }
                catch
                {
                    db.RollbackTransaction();
                    throw;
                }
            }
        }

        // Verify that every expiry transaction
        // has exactly one matching allocation
        // with the correct source and quantity.
        public int CountExpiryLedgerIssues()
        {
            const string sql = @"
SELECT COUNT(*)
FROM dbo.UsrPointTransaction e

OUTER APPLY (
    SELECT
        COUNT(*) AS AllocationCount,
        COALESCE(SUM(a.UsrQuantity), 0)
            AS AllocatedPoints
    FROM dbo.UsrPointAllocation a
    WHERE a.UsrUsageTransactionId = e.Id
) x

OUTER APPLY (
    SELECT
        COUNT(*) AS MatchingSourceCount
    FROM dbo.UsrPointAllocation a
    WHERE a.UsrUsageTransactionId = e.Id
      AND a.UsrSourceTransactionId =
          e.UsrOriginTransactionId
) y

WHERE e.UsrTransactionTypeId = @ExpiryTypeId
  AND (
       e.UsrOriginTransactionId IS NULL
       OR x.AllocationCount <> 1
       OR y.MatchingSourceCount <> 1
       OR x.AllocatedPoints <> e.UsrQuantity
  );";

            using (var db =
                _userConnection.EnsureDBConnection())
            {
                return new CustomQuery(_userConnection, sql)
                    .WithParameter(
                        "ExpiryTypeId",
                        ExpiryTypeId)
                    .ExecuteScalar<int>(db);
            }
        }

        // Process bounded batches without
        // selecting the same candidate twice
        // in one run.
        public int ProcessPendingExpiries(
            int batchSize = 100,
            int maxRecordsPerRun = 1000)
        {
            if (batchSize < 1 || batchSize > 1000)
            {
                throw new ArgumentOutOfRangeException(
                    nameof(batchSize));
            }

            if (maxRecordsPerRun < 1)
            {
                throw new ArgumentOutOfRangeException(
                    nameof(maxRecordsPerRun));
            }

            int scanned = 0;
            int posted = 0;

            var failures = new List<string>();

            DateTime lastDate =
                new DateTime(1753, 1, 1);

            Guid lastId = Guid.Empty;

            while (scanned < maxRecordsPerRun)
            {
                int take = Math.Min(
                    batchSize,
                    maxRecordsPerRun - scanned);

                List<Candidate> candidates =
                    FindPending(take, lastDate, lastId);

                if (candidates.Count == 0)
                {
                    break;
                }

                foreach (Candidate candidate in candidates)
                {
                    lastDate = candidate.ExpirationDate;
                    lastId = candidate.Id;
                    scanned++;

                    try
                    {
                        if (PostExpiry(candidate.Id))
                        {
                            posted++;
                        }
                    }
                    catch (Exception ex)
                    {
                        failures.Add(
                            candidate.Id + ": " + ex.Message);
                    }
                }

                if (candidates.Count < take)
                {
                    break;
                }
            }

            if (failures.Count > 0)
            {
                throw new InvalidOperationException(
                    "MCIT expiry processing failed for " +
                    failures.Count +
                    " restoration(s). Details: " +
                    string.Join("; ", failures));
            }

            // Report an unfinished backlog
            // when the safety limit is reached.
            if (scanned == maxRecordsPerRun &&
                FindPending(1, lastDate, lastId).Count > 0)
            {
                throw new InvalidOperationException(
                    "MCIT expiry processing reached its " +
                    "per-run limit. Additional pending " +
                    "restorations remain.");
            }

            return posted;
        }
    }
}
