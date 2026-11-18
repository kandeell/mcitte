 // Creatio source-code schema: UsrMCITAddOnApiAccessGuard
// Intended for Configuration > UsrMCIT > Add > Source code.
// This is deliberately a DISTINCT class from UsrMCITAddOnScreenPermissionListener
// in Files/src/cs/UsrMCITPermissionRuntime.cs, to avoid CS0101/CS0111.
// Do not paste into UsrMCITScreenAccessService or PermissionRuntime.
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration.UsrMCIT.EntryPoints.EntityEventListeners
{
    [EntityEventListener(SchemaName = "UsrMCITAddOn")]
    public class UsrMCITAddOnApiAccessGuard : BaseEntityEventListener
    {
        public override void OnInserting(object sender, EntityBeforeEventArgs e)
        {
            base.OnInserting(sender, e);
            var entity = (Entity)sender;
            Terrasoft.Configuration.UsrMCITScreenAccess.Demand(
                entity.UserConnection, "ADDON_CONFIGURATION", "Create");
        }

        public override void OnUpdating(object sender, EntityBeforeEventArgs e)
        {
            base.OnUpdating(sender, e);
            var entity = (Entity)sender;
            Terrasoft.Configuration.UsrMCITScreenAccess.Demand(
                entity.UserConnection, "ADDON_CONFIGURATION", "Edit");
        }
    }
}
