// Ultimate rank rules shared by the ability system.
// Mastery rank is a level, not a generic damage multiplier: each core's Q
// interprets that rank according to its own mechanics.
export const MAX_ULTIMATE_MASTERY_RANK = 5;

export function getUltimateMasteryRank(nextRank) {
  return Math.max(0, Math.min(MAX_ULTIMATE_MASTERY_RANK, Math.floor(Number(nextRank) || 0)));
}

// Elemental Q summons one mini-core at rank 0, adding one per rank through 4.
// Rank 5 keeps the five-core cap and empowers their damage instead.
export function getElementalSummonCount(rank) {
  const level = getUltimateMasteryRank(rank);
  return Math.min(5, level + 1);
}
