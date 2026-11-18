// Replacement Creatio source-code schema: UsrMCITContractScopeListener
// Replaces the previous grant-only listener; never keep both implementations.
// Access assignment changes reconcile both the new and previous user, including
// deactivation, reassignment and deletion. No direct SQL writes to native rights.
namespace Terrasoft.Configuration
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using Terrasoft.Core.Entities.Events;

    public abstract class UsrMCITScopeAccessChangeListenerBase : BaseEntityEventListener
    {
        private sealed class Snapshot { internal Guid OldUser; }
        private static readonly ConditionalWeakTable<Entity, Snapshot> Snapshots =
            new ConditionalWeakTable<Entity, Snapshot>();

        private static Guid StoredUser(Entity changed)
        {
            var x = new UsrMCITRoleFormEngine(changed.UserConnection);
            var old = x.Rows(changed.Schema.Name, "Id", changed.PrimaryColumnValue);
            if (old.Count > 1) throw new InvalidOperationException(
                "Duplicate assignment IDs in " + changed.Schema.Name);
            return old.Count == 0 ? Guid.Empty : x.Id(old[0], "UsrUser");
        }
        private static Guid SavedUser(Entity changed)
        {
            var x = new UsrMCITRoleFormEngine(changed.UserConnection);
            return x.Id(x.Read(changed.Schema.Name, changed.PrimaryColumnValue), "UsrUser");
        }
        private static void Track(Entity entity)
        {
            var oldUser = StoredUser(entity);
            Snapshots.Remove(entity);
            Snapshots.Add(entity, new Snapshot { OldUser = oldUser });
        }
        private static void Apply(Entity entity, bool deleted)
        {
            Snapshot prior;
            Guid oldUser = Snapshots.TryGetValue(entity, out prior)
                ? prior.OldUser : Guid.Empty;
            Snapshots.Remove(entity);
            Guid currentUser = deleted ? Guid.Empty : SavedUser(entity);
            var users = new HashSet<Guid> { oldUser, currentUser };
            users.Remove(Guid.Empty);
            foreach (Guid userId in users)
                UsrMCITDataScopeRuntime.ReconcileUser(entity.UserConnection, userId);
        }
        public override void OnSaving(object sender, EntityBeforeEventArgs e)
        {
            base.OnSaving(sender, e);
            Track((Entity)sender);
        }
        public override void OnSaved(object sender, EntityAfterEventArgs e)
        {
            base.OnSaved(sender, e);
            Apply((Entity)sender, false);
        }
        public override void OnDeleting(object sender, EntityBeforeEventArgs e)
        {
            base.OnDeleting(sender, e);
            Track((Entity)sender);
        }
        public override void OnDeleted(object sender, EntityAfterEventArgs e)
        {
            base.OnDeleted(sender, e);
            Apply((Entity)sender, true);
        }
    }

    [EntityEventListener(SchemaName = "UsrMCITUserContractAccess")]
    public class UsrMCITContractScopeListener : UsrMCITScopeAccessChangeListenerBase { }

    [EntityEventListener(SchemaName = "UsrMCITUserAuthorityAccess")]
    public class UsrMCITAuthorityScopeListener : UsrMCITScopeAccessChangeListenerBase { }

    [EntityEventListener(SchemaName = "UsrMCITRoleAssignment")]
    public class UsrMCITScopeRoleAssignmentListener : UsrMCITScopeAccessChangeListenerBase { }

    // Re-evaluate newly created/modified/deleted business records. Existing MCIT
    // audit listeners remain unchanged and continue logging their own events.
    public abstract class UsrMCITScopedRecordListenerBase : BaseEntityEventListener
    {
        public override void OnSaved(object sender, EntityAfterEventArgs e)
        {
            base.OnSaved(sender, e);
            UsrMCITDataScopeRuntime.ReconcileAllUsers(((Entity)sender).UserConnection);
        }
        public override void OnDeleted(object sender, EntityAfterEventArgs e)
        {
            base.OnDeleted(sender, e);
            UsrMCITDataScopeRuntime.ReconcileAllUsers(((Entity)sender).UserConnection);
        }
    }

    // Do NOT enable record listeners on end-user-editable business objects until
    // rights sync can run through a reviewed manager-authorized, transactional
    // service account. Otherwise a user save can fail on CanManageAdministration.
    // [EntityEventListener(SchemaName = "UsrMCITContract")]
    // public class UsrMCITContractScopeRecordListener : UsrMCITScopedRecordListenerBase { }

    // Enable the following listeners along with their EnabledTargets flags and
    // record-rights switches only after preflight and relationship validation.
    // [EntityEventListener(SchemaName = "UsrAuthority")]
    // public class UsrMCITAuthorityScopeRecordListener : UsrMCITScopedRecordListenerBase { }
    // [EntityEventListener(SchemaName = "UsrProject")]
    // public class UsrMCITProjectScopeRecordListener : UsrMCITScopedRecordListenerBase { }
    // [EntityEventListener(SchemaName = "UsrVMRequest")]
    // public class UsrMCITVMRequestScopeRecordListener : UsrMCITScopedRecordListenerBase { }
    // [EntityEventListener(SchemaName = "UsrVirtualMachine")]
    // public class UsrMCITVirtualMachineScopeRecordListener : UsrMCITScopedRecordListenerBase { }
}
