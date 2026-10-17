// Shared target selection for all player-core primary auto-attacks.
// The game supplies a nearest-target selector that includes live singular cores and enemies.
export function getPrimaryAttackTarget({ player, core, coreTargetRange, nearestTarget }) {
 if (!player) return null;
 const coreId = core?.id || 'ember';
 const extendedProjectileCore = ['ember', 'frost', 'remielle', 'elemental'].includes(coreId);
 const rangeLimited = ['nature', 'flash', 'remielle', 'nova', 'elemental', 'ember', 'frost'].includes(coreId);
 const maxRange = extendedProjectileCore ? coreTargetRange * 1.5 : (rangeLimited ? coreTargetRange : Infinity);
 // Use one selector for every target type so minibosses, normal enemies, and singular cores
 // are all eligible instead of special cases silently excluding one category.
 return nearestTarget(maxRange);
}
