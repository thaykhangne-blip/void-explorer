import test from 'node:test';
import assert from 'node:assert/strict';
import { getVoidWeaponDamageMultiplier, getVoidWeaponBeamEnergyGain, getVoidWeaponStatBonuses } from '../src/systems/voidWeaponCombat.js';

test('weapon stat bonuses are deterministic and tolerate missing values', () => {
 assert.deepEqual(getVoidWeaponStatBonuses({ attackPercent: 12, hpPercent: 5, armorFlat: 3 }), { attackMultiplier: 1.12, hpMultiplier: 1.05, armorFlat: 3 });
 assert.deepEqual(getVoidWeaponStatBonuses({}), { attackMultiplier: 1, hpMultiplier: 1, armorFlat: 0 });
});

test('Cinderwake and Stillwinter only amplify their matching status targets', () => {
 assert.equal(getVoidWeaponDamageMultiplier({ type: 'burning_target_damage', damagePercent: 15 }, { burn: 2 }), 1.15);
 assert.equal(getVoidWeaponDamageMultiplier({ type: 'burning_target_damage', damagePercent: 15 }, { burn: 0 }), 1);
 assert.equal(getVoidWeaponDamageMultiplier({ type: 'frozen_target_damage_and_shield', damagePercent: 15 }, { frozen: 1 }), 1.15);
 assert.equal(getVoidWeaponDamageMultiplier({ type: 'frozen_target_damage_and_shield', damagePercent: 15 }, {}), 1);
});

test('Last Requiem uses full low-health bonus on regular enemies and reduced bonus on bosses', () => {
 const effect = { type: 'low_health_target_damage', thresholdPercent: 30, damagePercent: 20, bossDamagePercent: 8 };
 assert.equal(getVoidWeaponDamageMultiplier(effect, { hp: 20, maxHp: 100 }), 1.2);
 assert.equal(getVoidWeaponDamageMultiplier(effect, { hp: 20, maxHp: 100, isMiniBoss: true }), 1.08);
 assert.equal(getVoidWeaponDamageMultiplier(effect, { hp: 40, maxHp: 100 }), 1);
});

test('Event Horizon adds beam damage only to laser/beam attacks', () => {
 const effect = { type: 'piercing_beam_scaling', damagePercent: 10 };
 assert.equal(getVoidWeaponDamageMultiplier(effect, {}, 'LASER'), 1.1);
 assert.equal(getVoidWeaponDamageMultiplier(effect, {}, 'BEAM'), 1.1);
 assert.equal(getVoidWeaponDamageMultiplier(effect, {}, 'PROJECTILE'), 1);
});

test('Event Horizon energy is granted for additional unique targets and respects its per-shot cap', () => {
 const effect = { type: 'piercing_beam_scaling', energyPerAdditionalTarget: 2, energyPerShotCap: 8 };
 assert.equal(getVoidWeaponBeamEnergyGain(effect, 1, 0), 0);
 assert.equal(getVoidWeaponBeamEnergyGain(effect, 2, 0), 2);
 assert.equal(getVoidWeaponBeamEnergyGain(effect, 3, 2), 2);
 assert.equal(getVoidWeaponBeamEnergyGain(effect, 5, 6), 2);
 assert.equal(getVoidWeaponBeamEnergyGain(effect, 6, 8), 0);
});

test('unrelated weapon effects do not grant beam energy', () => {
 assert.equal(getVoidWeaponBeamEnergyGain({ type: 'hull_restore_on_kill', energyPerAdditionalTarget: 2, energyPerShotCap: 8 }, 3, 0), 0);
});
