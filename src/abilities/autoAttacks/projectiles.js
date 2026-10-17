// Shared projectile math used by core auto-attacks.
// Extra projectiles apply the same configurable damage penalty across cores.
export function getProjectileDamageMultiplier(totalShots, baseShots, penalty = 0.12) {
  const extraShots = Math.max(0, (Number(totalShots) || 0) - (Number(baseShots) || 0));
  const perShotPenalty = Number.isFinite(Number(penalty)) ? Number(penalty) : 0.12;
  return Math.pow(1 - perShotPenalty, extraShots);
}
