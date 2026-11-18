// MCIT Universal Screen-Permission Engine — Phase 1 (safe registry + native sync).
// One shared mapping and one existing lifecycle entry point.
// This replaces the CODE of the existing UsrMCITContractNativeRightsAutoSync
// source-code schema; DO NOT create a new schema with the same class.
//
// ACTIVATED NATIVE TARGETS: All nine known mapped objects.
// Registering native rights is NOT the same as enabling operation permissions.
// RESOURCE_CATALOG is a BaseLookup and still needs a separate CanManageLookups
// design for Create/Edit; no global operation is granted by this source.
// This schema DOES NOT enable native operation permission switches and DOES NOT
// intercept reads, REST endpoints, or business actions automatically.
namespace Terrasoft.Configuration
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;

    public static class UsrMCITUniversalPermissionEngine
    {
        private sealed class MappedObject
        {
            internal readonly string ScreenCode;
            internal readonly string ObjectName;
            internal readonly bool SyncNativeRights;
            internal readonly bool RequireInitializedGrant;

            internal MappedObject(string screenCode, string objectName,
                bool syncNativeRights, bool requireInitializedGrant = false)
            {
                ScreenCode = screenCode;
                ObjectName = objectName;
                SyncNativeRights = syncNativeRights;
                RequireInitializedGrant = requireInitializedGrant;
            }
        }

        // Explicit allowlist: never discover arbitrary object names from client
        // input or from screen captions. Each association must be reviewed.
        // Multiple business objects per screen need further mappings/guards.
        private static readonly MappedObject[] Registry = new[] {
            new MappedObject("CONTRACTS", "UsrMCITContract", true, true),
            new MappedObject("ADDON_CONFIGURATION", "UsrMCITAddOn", true),

            // Unified native-rights mappings. Object-level enforcement still requires a reviewed cutover.
            new MappedObject("REPORT_CATALOG", "UsrMCITReportCatalog", true),
            new MappedObject("USER_DIRECTORY", "UsrMCITPortalUserAccess", true),
            new MappedObject("LOOKUP_DATA", "UsrMCITLookupGroup", true),
            new MappedObject("VM_INVENTORY", "UsrVirtualMachine", true),
            new MappedObject("PROJECTS", "UsrProject", true),
            new MappedObject("AUDIT_LOG", "UsrMCITAuditLog", true),
            // BaseLookup: grants are synchronized, but Create/Edit still require a safe
            // Creatio lookup-management strategy; DO NOT grant CanManageLookups globally.
            new MappedObject("RESOURCE_CATALOG", "UsrMCITResourceType", true)
        };

        // One method for protected server-side actions. It delegates identity,
        // multiple active-role grants and canonical screen resolution to the
        // ALREADY-TESTED UsrMCITScreenAccess implementation.
        // TRUSTED server code only: action and object name must be constants.
        public static void DemandForObject(UserConnection uc, string trustedObjectName,
            string action)
        {
            if (uc == null) throw new ArgumentNullException("uc");
            if (String.IsNullOrWhiteSpace(trustedObjectName))
                throw new UnauthorizedAccessException("MCIT object name is required.");
            var matches = Registry.Where(m =>
                String.Equals(m.ObjectName, trustedObjectName,
                    StringComparison.OrdinalIgnoreCase)).ToList();
            if (matches.Count != 1)
                throw new UnauthorizedAccessException(
                    "MCIT object has no unique permission mapping: " + trustedObjectName);
            // Unknown actions are denied by Demand(). No Delete action exists
            // in the eight MCIT screen permission flags.
            UsrMCITScreenAccess.Demand(uc, matches[0].ScreenCode, action);
        }

        public static void DemandForScreen(UserConnection uc, string trustedScreenCode,
            string action)
        {
            if (uc == null) throw new ArgumentNullException("uc");
            // The existing resolver validates ANY active canonical screen code.
            // This allows a trusted custom handler to check any of the eight
            // MCIT actions even if the page has no single primary data object.
            UsrMCITScreenAccess.Demand(uc, trustedScreenCode, action);
        }

        private sealed class NativeTarget
        {
            internal string ObjectName;
            internal bool CanRead;
            internal bool CanCreate;
            internal bool CanEdit;
        }

        // Called only from the existing, authorized role lifecycle while its
        // SQL transaction and application lock are held. Do not add a public
        // REST endpoint that accepts an arbitrary role ID and invokes this.
        public static void ReconcileNativeRights(UserConnection uc, Guid mcitRoleId)
        {
            if (uc == null) throw new ArgumentNullException("uc");
            if (mcitRoleId == Guid.Empty)
                throw new InvalidOperationException("Missing MCIT role ID.");

            var engine = new UsrMCITRoleFormEngine(uc);
            engine.RequireManager();
            var role = engine.Read("UsrMCITRole", mcitRoleId);

            Guid nativeId = engine.Id(role, "UsrRole");
            Guid otherNativeId = engine.Id(role, "UsrCreatioFunctionalRole");
            if (nativeId == Guid.Empty || otherNativeId != nativeId)
                throw new InvalidOperationException(
                    "The MCIT role requires matching native functional-role links.");

            bool active = engine.IsStatus(role, "Active");
            bool inactive = engine.IsStatus(role, "Inactive");
            bool draft = engine.IsStatus(role, "Draft");
            if (!active && !inactive && !draft)
                throw new InvalidOperationException("Unsupported MCIT role status.");

            // A legacy cloned Draft may point to the *same* native role as its
            // active source. It must NEVER revoke the source role's rights.
            var history = engine.Rows("UsrMCITRoleChangeLog", "UsrMCITRole", mcitRoleId);
            if (history.Any(e => engine.Text(e, "UsrFieldName") ==
                    UsrMCITRoleFormEngine.DraftMarker))
                throw new InvalidOperationException(
                    "Legacy cloned draft cannot synchronize a shared native role.");

            bool inPlaceDraft = draft && history.Any(e =>
                engine.Text(e, "UsrFieldName") ==
                    UsrMCITRoleFormEngine.InPlaceDraftMarker &&
                String.Equals(engine.Text(e, "UsrOldValue"),
                    mcitRoleId.ToString(), StringComparison.OrdinalIgnoreCase));
            if (draft && !inPlaceDraft)
                throw new InvalidOperationException(
                    "Only a verified in-place Draft can pause native rights.");

            var versions = engine.Versions(nativeId);
            if (!versions.Any(v => v.PrimaryColumnValue == mcitRoleId))
                throw new InvalidOperationException("Native role does not belong to this MCIT role.");
            int activeVersions = versions.Count(v => engine.IsStatus(v, "Active"));
            if (activeVersions != (active ? 1 : 0))
                throw new InvalidOperationException(
                    "Conflicting active MCIT role versions; native sync stopped.");

            var native = new Terrasoft.Core.Configuration.SysAdminUnit(uc);
            if (!native.FetchFromDB(nativeId))
                throw new InvalidOperationException("Linked Creatio role is missing.");
            UsrMCITRolePolicy.ValidateNativeRole(nativeId,
                (int)native.SysAdminUnitTypeValue,
                (int)native.ConnectionType,
                native.ParentRoleId,
                native.Name);
            if (!String.Equals((engine.Text(role, "UsrName") ?? "").Trim(),
                    (native.Name ?? "").Trim(), StringComparison.OrdinalIgnoreCase) ||
                native.Active != active)
                throw new InvalidOperationException(
                    "MCIT and native role name/status disagree; rights sync stopped.");

            // PRE-VALIDATE every enabled mapping before changing the first grant.
            // This does not activate object-operation security switches.
            var targets = Registry.Where(m => m.SyncNativeRights)
                .Select(m => ReadTarget(uc, engine, mcitRoleId, active, m))
                .ToList();
            if (targets.Count == 0)
                throw new InvalidOperationException("No native-rights mappings are enabled.");

            foreach (var target in targets)
            {
                uc.DBSecurityEngine.SetEntitySchemaReadingAllowed(nativeId,
                    target.ObjectName, target.CanRead);
                uc.DBSecurityEngine.SetEntitySchemaAppendingAllowed(nativeId,
                    target.ObjectName, target.CanCreate);
                uc.DBSecurityEngine.SetEntitySchemaEditingAllowed(nativeId,
                    target.ObjectName, target.CanEdit);
                // No Delete flag exists in the MCIT screen permission model.
                uc.DBSecurityEngine.SetEntitySchemaDeletingAllowed(nativeId,
                    target.ObjectName, false);
            }
        }

        private static NativeTarget ReadTarget(UserConnection uc,
            UsrMCITRoleFormEngine engine, Guid mcitRoleId, bool active,
            MappedObject mapping)
        {
            // Object must exist; never turn a typo into an unintended grant.
            uc.EntitySchemaManager.GetInstanceByName(mapping.ObjectName);
            var target = new NativeTarget { ObjectName = mapping.ObjectName };
            if (!active) return target;

            // One active *canonical* screen row. Legacy MODULE aliases do not
            // contribute to native grants.
            var screens = engine.Rows("UsrMCITPermissionScreen", "UsrScreenCode",
                    mapping.ScreenCode)
                .Where(s => Convert.ToBoolean(engine.Value(s, "UsrIsActive")))
                .ToList();
            if (screens.Count != 1)
                throw new InvalidOperationException(
                    "Expected one active screen catalog row: " + mapping.ScreenCode);

            var grants = engine.Rows("UsrMCITRoleScreenPermission", "UsrMCITRole",
                    mcitRoleId)
                .Where(g => engine.Id(g, "UsrScreen") ==
                    screens[0].PrimaryColumnValue)
                .ToList();
            if (grants.Count > 1 ||
                (mapping.RequireInitializedGrant && grants.Count != 1))
                throw new InvalidOperationException(
                    "Missing or duplicate permission row for: " + mapping.ScreenCode);
            if (grants.Count == 0) return target;

            Entity grant = grants[0];
            target.CanRead = Convert.ToBoolean(engine.Value(grant, "UsrCanView"));
            target.CanCreate = target.CanRead &&
                Convert.ToBoolean(engine.Value(grant, "UsrCanCreate"));
            target.CanEdit = target.CanRead &&
                Convert.ToBoolean(engine.Value(grant, "UsrCanEdit"));
            return target;
        }
    }

    // Backward-compatible adapter. Existing CreateDraft / Activate / Deactivate
    // hooks call this name. Do not change role lifecycle source code.
    public static class UsrMCITContractNativeRightsAutoSync
    {
        public static void Reconcile(UserConnection uc, Guid mcitRoleId)
        {
            UsrMCITUniversalPermissionEngine.ReconcileNativeRights(uc, mcitRoleId);
        }
    }
}
