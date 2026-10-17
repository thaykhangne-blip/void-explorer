// Shared target selection for the player's primary auto-attack.
// The game provides target range rules and the common nearest-target selector.
export function getPrimaryAttackTarget({ player, core, coreTargetRange, nearestTarget }) {
 if (!player) return null;
 const coreId = core?.id || 'ember';
 const extendedProjectileCore = ['ember', 'frost', 'remielle', 'elemental'].includes(coreId);
 const rangeLimited = ['nature', 'flash', 'remielle', 'nova', 'elemental', 'ember', 'frost'].includes(coreId);
 const maxRange = extendedProjectileCore ? coreTargetRange * 1.5 : (rangeLimited ? coreTargetRange : Infinity);
 return nearestTarget(maxRange);
}
