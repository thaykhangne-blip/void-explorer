// Shared target selection for all player-core primary auto-attacks.
// Every core has a finite targeting radius. Singular cores receive priority only when
// they are inside that same radius, rather than bypassing range limits.
export function getPrimaryAttackTarget({ player, core, coreTargetRange, nearestTarget }) {
 if (!player) return null;
 const coreId = core?.id || 'ember';
 const extendedProjectileCore = ['ember', 'frost', 'remielle', 'elemental'].includes(coreId);
 const maxRange = extendedProjectileCore ? coreTargetRange * 1.5 : coreTargetRange;
 // nearestTarget prioritizes the singularity only if it is within maxRange;
 // otherwise, a normal enemy in range remains a valid target.
 return nearestTarget(maxRange);
}
