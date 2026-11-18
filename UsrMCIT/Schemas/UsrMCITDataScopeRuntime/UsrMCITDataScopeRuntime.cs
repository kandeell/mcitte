// New Creatio source-code schema: UsrMCITDataScopeRuntime
// REVIEW-BEFORE-DEPLOY: depends on UsrMCITScopeManagedGrant custom object (README).
// Scope grants are per-user, never placed on a shared native functional role.
// Explicitly synchronized Read only: edit/delete and object-level rights are NOT inferred.
namespace Terrasoft.Configuration
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Terrasoft.Core;
    using Terrasoft.Core.Configuration;
    using Terrasoft.Core.DB;
    using Terrasoft.Core.Entities;

    public static class UsrMCITDataScopeRuntime
    {
        // Start with the existing working contract pilot. Enable further targets only after
        // creating their native record-rights tables and mapping screen rights (README).
        private static readonly string[] EnabledTargets = { "UsrMCITContract" };
        private const string LedgerSchema = "UsrMCITScopeManagedGrant";
        private const int MaxRowsPerObject = 10000;
        private const int MaxUsers = 3000;

        private sealed class ManagedGrant
        {
            internal Entity Ledger;
            internal string Schema;
            internal Guid RecordId;
            internal Guid RightId;
        }

        private static bool HasColumn(UsrMCITRoleFormEngine x, string schema, string column)
        {
            return x.Schema(schema).Columns.Any(c => c.Name == column);
        }
        private static string Text(UsrMCITRoleFormEngine x, Entity e, string column)
        {
            return x.Text(e, column).Trim();
        }
        private static bool Yes(UsrMCITRoleFormEngine x, Entity e, string column)
        {
            return Convert.ToBoolean(x.Value(e, column));
        }

        // Validate all dependencies BEFORE making a security mutation.
        private static void Preflight(UserConnection uc, UsrMCITRoleFormEngine x)
        {
            x.RequireManager();
            uc.DBSecurityEngine.CheckCanExecuteOperation(
                "CanChangeEntitySchemaRecordRight");
            foreach (var name in new[] {
                "UsrName", "UsrUser", "UsrSchemaName", "UsrRecordId", "UsrRightRecordId"
            }) x.Column(LedgerSchema, name);
            x.Column("UsrMCITRoleAssignment", "UsrUser");
            x.Column("UsrMCITRoleAssignment", "UsrRole");
            x.Column("UsrMCITRoleAssignment", "UsrIsCurrent");
            x.Column("UsrMCITRole", "UsrCreatioFunctionalRole");
            x.Column("UsrMCITRole", "UsrRole");
            x.Column("UsrMCITRoleDataScopeRule", "UsrAllowedValues");
            foreach (string schema in EnabledTargets) {
                x.Schema(schema);
                string rights = RightsTable(schema);
                // Diagnostic reads only. All table identifiers originate in EnabledTargets.
                var sql = "SELECT CASE WHEN OBJECT_ID(N'dbo." + rights +
                    "', N'U') IS NULL THEN 0 ELSE 1 END";
                if (new CustomQuery(uc, sql).ExecuteScalar<int>() != 1)
                    throw new InvalidOperationException("Record-level permissions not initialized: " + schema);
            }
        }

        private static string RightsTable(string schema)
        {
            if (schema == "UsrMCITContract" || schema == "UsrAuthority" ||
                schema == "UsrProject" || schema == "UsrVMRequest" ||
                schema == "UsrVirtualMachine") return "Sys" + schema + "Right";
            throw new InvalidOperationException("Unreviewed scoped schema: " + schema);
        }

        private static List<Entity> EligibleRoles(UsrMCITRoleFormEngine x, Guid userId)
        {
            var account = x.Read("SysAdminUnit", userId);
            if (!Yes(x, account, "Active") ||
                Convert.ToInt32(x.Value(account, "SysAdminUnitTypeValue")) != 4)
                return new List<Entity>();
            var memberships = new HashSet<Guid>(x.Rows("SysUserInRole", "SysUser", userId)
                .Select(e => x.Id(e, "SysRole")));
            var result = new Dictionary<Guid, Entity>();
            foreach (var a in x.Rows("UsrMCITRoleAssignment", "UsrUser", userId)) {
                if (!Yes(x, a, "UsrIsCurrent")) continue;
                Guid roleId = x.Id(a, "UsrRole");
                if (roleId == Guid.Empty) continue;
                Entity role = x.Read("UsrMCITRole", roleId);
                if (!x.IsStatus(role, "Active")) continue;
                Guid native = x.Id(role, "UsrRole");
                if (native == Guid.Empty || native != x.Id(role, "UsrCreatioFunctionalRole") ||
                    !memberships.Contains(native)) continue;
                Entity nativeRole = x.Read("SysAdminUnit", native);
                if (!Yes(x, nativeRole, "Active") ||
                    Convert.ToInt32(x.Value(nativeRole, "SysAdminUnitTypeValue")) != 6) continue;
                result[roleId] = role;
            }
            return result.Values.ToList();
        }

        private static bool ViewEnabled(UsrMCITRoleFormEngine x, Guid roleId, string code)
        {
            var screens = x.Rows("UsrMCITPermissionScreen", "UsrScreenCode", code)
                .Where(e => Yes(x, e, "UsrIsActive")).ToList();
            if (screens.Count == 0) return false; // No verified screen mapping: no grant.
            if (screens.Count > 1) throw new InvalidOperationException("Duplicate screen code: " + code);
            var grants = x.Rows("UsrMCITRoleScreenPermission", "UsrMCITRole", roleId)
                .Where(e => x.Id(e, "UsrScreen") == screens[0].PrimaryColumnValue).ToList();
            if (grants.Count > 1) throw new InvalidOperationException("Duplicate screen grant: " + code);
            return grants.Count == 1 && Yes(x, grants[0], "UsrCanView");
        }

        private static string Scope(UsrMCITRoleFormEngine x, Guid roleId, string type)
        {
            var rows = x.Rows("UsrMCITRoleDataScopeRule", "UsrMCITRole", roleId)
                .Where(e => String.Equals(Text(x, e, "UsrScopeType"), type,
                    StringComparison.OrdinalIgnoreCase)).ToList();
            if (rows.Count != 1) return ""; // Missing/duplicate rules grant nothing.
            return Text(x, rows[0], "UsrAllowedValues");
        }

        private static bool IsMode(string actual, string expected)
        {
            return String.Equals(actual, expected, StringComparison.OrdinalIgnoreCase);
        }

        private static bool HasActiveAccess(UsrMCITRoleFormEngine x, string schema,
            Guid userId, string targetColumn, Guid targetId)
        {
            if (targetId == Guid.Empty) return false;
            return x.Rows(schema, "UsrUser", userId).Any(a =>
                Yes(x, a, "UsrIsActive") && x.Id(a, targetColumn) == targetId);
        }

        private static bool AllowedContract(UsrMCITRoleFormEngine x, Guid roleId,
            Guid userId, Guid contractId)
        {
            string mode = Scope(x, roleId, "Contract Scope");
            if (IsMode(mode, "All")) return true;
            if (IsMode(mode, "Assigned contracts only"))
                return HasActiveAccess(x, "UsrMCITUserContractAccess", userId,
                    "UsrContract", contractId);
            return false;
        }

        private static bool AllowedAuthority(UsrMCITRoleFormEngine x, Guid roleId,
            Guid userId, Guid authorityId)
        {
            string mode = Scope(x, roleId, "Authority Scope");
            if (IsMode(mode, "All")) return true;
            if (IsMode(mode, "Assigned authorities only"))
                return HasActiveAccess(x, "UsrMCITUserAuthorityAccess", userId,
                    "UsrAuthority", authorityId);
            return false;
        }

        private static bool AllowedProject(UsrMCITRoleFormEngine x, Guid roleId,
            Guid userId, Guid projectId)
        {
            string mode = Scope(x, roleId, "Project Scope");
            if (IsMode(mode, "All")) return true;
            // No direct user/project assignment object exists. Only derived authority scope.
            if (!IsMode(mode, "Assigned authority projects only") || projectId == Guid.Empty)
                return false;
            var project = x.Read("UsrProject", projectId);
            Guid accountId = x.Id(project, "UsrAuthority"); // Actually Account lookup.
            if (accountId == Guid.Empty) return false;
            foreach (var authority in x.Rows("UsrAuthority", "UsrAccount", accountId)) {
                if (AllowedAuthority(x, roleId, userId, authority.PrimaryColumnValue) &&
                    HasActiveAccess(x, "UsrMCITUserAuthorityAccess", userId,
                        "UsrAuthority", authority.PrimaryColumnValue)) return true;
            }
            return false;
        }

        private static bool RoleAllows(UsrMCITRoleFormEngine x, Entity role, Guid userId,
            string schema, Entity record)
        {
            Guid roleId = role.PrimaryColumnValue;
            if (schema == "UsrMCITContract")
                return ViewEnabled(x, roleId, "CONTRACTS") &&
                    AllowedContract(x, roleId, userId, record.PrimaryColumnValue);
            if (schema == "UsrAuthority")
                return ViewEnabled(x, roleId, "AUTHORITIES") &&
                    AllowedAuthority(x, roleId, userId, record.PrimaryColumnValue);
            if (schema == "UsrProject")
                return ViewEnabled(x, roleId, "PROJECTS") &&
                    AllowedProject(x, roleId, userId, record.PrimaryColumnValue);
            if (schema == "UsrVMRequest" || schema == "UsrVirtualMachine") {
                string screen = schema == "UsrVMRequest" ? "REQUEST_QUEUE" : "VM_INVENTORY";
                if (!ViewEnabled(x, roleId, screen)) return false;
                // BOTH parent scopes must permit the record, not just one.
                if (!HasColumn(x, schema, "UsrContract") ||
                    !HasColumn(x, schema, "UsrProject")) return false;
                Guid contractId = x.Id(record, "UsrContract");
                Guid projectId = x.Id(record, "UsrProject");
                if (contractId == Guid.Empty ||
                    !AllowedContract(x, roleId, userId, contractId)) return false;
                string pMode = Scope(x, roleId, "Project Scope");
                return IsMode(pMode, "All") ||
                    (projectId != Guid.Empty && AllowedProject(x, roleId, userId, projectId));
            }
            return false;
        }

        private static List<Entity> Records(UsrMCITRoleFormEngine x, string schema)
        {
            // Manager-only security reconciliation must inspect records even when
            // current record-right settings would hide them from ordinary queries.
            var q = new EntitySchemaQuery(x.Uc.EntitySchemaManager, schema) {
                UseAdminRights = true
            };
            q.PrimaryQueryColumn.IsAlwaysSelect = true;
            q.AddAllSchemaColumns();
            var rows = q.GetEntityCollection(x.Uc).ToList();
            if (rows.Count > MaxRowsPerObject)
                throw new InvalidOperationException("Scope backfill exceeds limit for " + schema);
            return rows;
        }

        private static int CountRight(UserConnection uc, string schema, Guid userId,
            Guid recordId, Guid rightId)
        {
            // Only READ the native rights table. Never write native permission tables with SQL.
            string table = RightsTable(schema);
            string sql = "SELECT COUNT(1) FROM dbo." + table +
                " WHERE SysAdminUnitId='" + userId.ToString("D") +
                "' AND RecordId='" + recordId.ToString("D") +
                "' AND Operation=0";
            // A ledger-owned Allow must stay exactly Allow (not Deny or delegation).
            // Without a ledger ID, any existing right (including Deny) is preserved.
            if (rightId != Guid.Empty) sql += " AND RightLevel=1 AND Id='" +
                rightId.ToString("D") + "'";
            return new CustomQuery(uc, sql).ExecuteScalar<int>();
        }

        // Idempotent, per-user grant synchronization. Changes ONLY rights whose IDs
        // were recorded in the custom ledger. Unrelated manual and inherited rights remain.
        public static void ReconcileUser(UserConnection uc, Guid userId)
        {
            if (uc == null) throw new ArgumentNullException("uc");
            if (userId == Guid.Empty) return;
            var x = new UsrMCITRoleFormEngine(uc);
            Preflight(uc, x);
            var roles = EligibleRoles(x, userId);
            var ledger = x.Rows(LedgerSchema, "UsrUser", userId)
                .Select(row => new ManagedGrant {
                    Ledger = row, Schema = Text(x, row, "UsrSchemaName"),
                    RecordId = x.Id(row, "UsrRecordId"),
                    RightId = x.Id(row, "UsrRightRecordId")
                }).ToList();
            if (ledger.Any(row => row.RightId == Guid.Empty))
                throw new InvalidOperationException("Managed grant ledger contains empty right identifiers.");
            if (ledger.GroupBy(row => row.Schema + ":" + row.RecordId)
                .Any(g => g.Count() > 1))
                throw new InvalidOperationException("Duplicate managed grant ledger rows.");
            foreach (var row in ledger)
                if (!EnabledTargets.Contains(row.Schema) || row.RecordId == Guid.Empty)
                    throw new InvalidOperationException("Unknown managed record in grant ledger.");
            var existing = ledger.ToDictionary(row => row.Schema + ":" + row.RecordId);
            foreach (string schema in EnabledTargets) {
                foreach (Entity record in Records(x, schema)) {
                    string key = schema + ":" + record.PrimaryColumnValue;
                    ManagedGrant managed;
                    bool wasManaged = existing.TryGetValue(key, out managed);
                    if (wasManaged) existing.Remove(key);
                    bool shouldRead = roles.Any(role => RoleAllows(x, role, userId, schema, record));
                    if (shouldRead) {
                        if (wasManaged) {
                            if (CountRight(uc, schema, userId, record.PrimaryColumnValue,
                                    managed.RightId) != 1)
                                throw new InvalidOperationException(
                                    "A managed right has been changed externally: " + key);
                        } else if (CountRight(uc, schema, userId, record.PrimaryColumnValue,
                                Guid.Empty) == 0) {
                            Guid right = uc.DBSecurityEngine.SetEntitySchemaRecordOperationRightLevel(
                                userId, schema, record.PrimaryColumnValue,
                                EntitySchemaRecordRightOperation.Read,
                                EntitySchemaRecordRightLevel.Allow);
                            if (right == Guid.Empty) throw new InvalidOperationException(
                                "Creatio did not create a record grant for: " + key);
                            try {
                                Entity marker = x.New(LedgerSchema);
                                x.Set(marker, "UsrName", key);
                                x.Set(marker, "UsrUser", userId);
                                x.Set(marker, "UsrSchemaName", schema);
                                x.Set(marker, "UsrRecordId", record.PrimaryColumnValue);
                                x.Set(marker, "UsrRightRecordId", right);
                                x.Save(marker);
                            } catch {
                                uc.DBSecurityEngine.DeleteEntitySchemaRecordRightLevel(
                                    EntitySchemaRecordRightOperation.Read,
                                    RightsTable(schema), right);
                                throw;
                            }
                        }
                    } else if (wasManaged) RemoveManaged(uc, x, userId, managed);
                }
            }
            // These are ledger rows for records removed from the business object.
            foreach (var stale in existing.Values)
                RemoveManaged(uc, x, userId, stale);
        }

        private static void RemoveManaged(UserConnection uc, UsrMCITRoleFormEngine x,
            Guid userId, ManagedGrant managed)
        {
            int rightCount = CountRight(uc, managed.Schema, userId,
                managed.RecordId, managed.RightId);
            if (rightCount > 1) throw new InvalidOperationException(
                "Duplicate native grant ID: " + managed.RightId);
            if (rightCount == 1)
                uc.DBSecurityEngine.DeleteEntitySchemaRecordRightLevel(
                    EntitySchemaRecordRightOperation.Read,
                    RightsTable(managed.Schema), managed.RightId);
            x.Delete(managed.Ledger);
        }

        public static void ReconcileAllUsers(UserConnection uc)
        {
            var x = new UsrMCITRoleFormEngine(uc);
            Preflight(uc, x);
            var users = new HashSet<Guid>(x.Rows("UsrMCITRoleAssignment")
                .Select(e => x.Id(e, "UsrUser")));
            foreach (var row in x.Rows(LedgerSchema)) users.Add(x.Id(row, "UsrUser"));
            users.Remove(Guid.Empty);
            if (users.Count > MaxUsers)
                throw new InvalidOperationException("Bulk scope reconciliation exceeds user limit.");
            foreach (Guid id in users) ReconcileUser(uc, id);
        }
    }
}
