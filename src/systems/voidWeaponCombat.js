export function getVoidWeaponDamageMultiplier(effect, target, tag = '') {
 if (!effect || !target) return 1;
 switch (effect.type) {
  case 'burning_target_damage':
   return (target.burn || 0) > 0 ? 1 + (Number(effect.damagePercent) || 0) / 100 : 1;
  case 'frozen_target_damage_and_shield':
   return (target.frozen || 0) > 0 ? 1 + (Number(effect.damagePercent) || 0) / 100 : 1;
  case 'low_health_target_damage': {
   const hp = Number(target.hp), maxHp = Number(target.maxHp) || hp;
   if (!(maxHp > 0) || hp / maxHp > (Number(effect.thresholdPercent) || 30) / 100) return 1;
   const boss = !!(target.isBoss || target.isMiniBoss || target.isFinalBoss || target.role === 'boss');
   return 1 + (Number(boss ? effect.bossDamagePercent : effect.damagePercent) || 0) / 100;
  }
  case 'piercing_beam_scaling':
   return /(LASER|BEAM)/i.test(String(tag)) ? 1 + (Number(effect.damagePercent) || 0) / 100 : 1;
  default: return 1;
 }
}

export function getVoidWeaponBeamEnergyGain(effect, uniqueTargetCount, energyGranted = 0) {
 if (effect?.type !== 'piercing_beam_scaling' || uniqueTargetCount <= 1) return 0;
 const perTarget = Math.max(0, Number(effect.energyPerAdditionalTarget) || 0);
 const cap = Math.max(0, Number(effect.energyPerShotCap) || 0);
 return Math.min(perTarget, Math.max(0, cap - energyGranted));
}

export function getVoidWeaponStatBonuses(stats = {}) {
 return {
  attackMultiplier: 1 + Math.max(0, Number(stats.attackPercent) || 0) / 100,
  hpMultiplier: 1 + Math.max(0, Number(stats.hpPercent) || 0) / 100,
  armorFlat: Number(stats.armorFlat) || 0
 };
}
