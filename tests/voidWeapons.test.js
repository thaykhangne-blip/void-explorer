import test from 'node:test';
import assert from 'node:assert/strict';
import {
  claimVoidWeaponMilestone,
  equipVoidWeapon,
  getVoidWeaponBonuses,
  normalizeVoidWeaponSave,
  resolveVoidWeaponMilestoneReward,
  unequipVoidWeapon
} from '../src/systems/voidWeapons.js';

const baseSave = () => ({
  coreCurrency: 0,
  voidWeaponInventory: {},
  equippedVoidWeapons: {},
  voidWeaponClaims: [],
  pendingVoidWeaponRewards: []
});

test('milestone reward grants and queues a weapon on a 5% roll', () => {
  const result = resolveVoidWeaponMilestoneReward(baseSave(), 0, 5, () => 0);
  assert.equal(result.awarded, true);
  assert.equal(result.reward.type, 'weapon');
  assert.equal(result.saveData.voidWeaponInventory[result.reward.weaponId], 1);
  assert.equal(result.saveData.voidWeaponClaims.includes('0:5'), true);
  assert.equal(result.saveData.pendingVoidWeaponRewards.length, 1);
});

test('milestone reward grants Nexus Fragments outside the weapon roll', () => {
  const result = resolveVoidWeaponMilestoneReward(baseSave(), 2, 10, () => 0.05);
  assert.equal(result.awarded, true);
  assert.deepEqual(result.reward, {
    type: 'nexus-fragments',
    amount: 25,
    worldId: 2,
    roomNumber: 10,
    claimKey: '2:10'
  });
  assert.equal(result.saveData.coreCurrency, 25);
  assert.equal(result.saveData.voidWeaponInventory && Object.keys(result.saveData.voidWeaponInventory).length, 0);
});

test('the same milestone cannot be claimed twice or rerolled', () => {
  const first = resolveVoidWeaponMilestoneReward(baseSave(), 1, 15, () => 0.99);
  const second = resolveVoidWeaponMilestoneReward(first.saveData, 1, 15, () => 0);
  assert.equal(first.awarded, true);
  assert.equal(second.awarded, false);
  assert.equal(second.saveData.coreCurrency, first.saveData.coreCurrency);
  assert.equal(second.saveData.voidWeaponInventory['cinder-oath'] || 0, 0);
  assert.equal(second.saveData.pendingVoidWeaponRewards.length, 1);
});

test('tutorial, invalid worlds, and non-milestone rooms never claim rewards', () => {
  for (const [world, room] of [[-1, 5], [4, 5], [0, 6], [0, 21]]) {
    const result = resolveVoidWeaponMilestoneReward(baseSave(), world, room, () => 0);
    assert.equal(result.awarded, false);
    assert.equal(result.saveData.coreCurrency, 0);
    assert.equal(result.saveData.pendingVoidWeaponRewards.length, 0);
  }
});

test('save normalization preserves valid claims and pending rewards, rejects malformed claims', () => {
  const normalized = normalizeVoidWeaponSave({
    ...baseSave(),
    voidWeaponClaims: ['0:5', 'not-a-claim', '0:5'],
    pendingVoidWeaponRewards: [
      { type: 'nexus-fragments', amount: 15, worldId: 0, roomNumber: 5, claimKey: '0:5' },
      { type: 'weapon', weaponId: 'unknown', worldId: 0, roomNumber: 5, claimKey: '0:5' },
      { type: 'nexus-fragments', amount: 20, worldId: 0, roomNumber: 10, claimKey: '0:10' }
    ]
  });
  assert.deepEqual(normalized.voidWeaponClaims, ['0:5']);
  assert.equal(normalized.pendingVoidWeaponRewards.length, 1);
  assert.equal(normalized.pendingVoidWeaponRewards[0].claimKey, '0:5');
});

test('legacy saves with no Void Weapon fields normalize safely', () => {
  const normalized = normalizeVoidWeaponSave({ coreCurrency: 12, unlockedWorlds: 2 });
  assert.deepEqual(normalized.voidWeaponInventory, {});
  assert.deepEqual(normalized.equippedVoidWeapons, {});
  assert.deepEqual(normalized.voidWeaponClaims, []);
  assert.deepEqual(normalized.pendingVoidWeaponRewards, []);
  assert.equal(normalized.coreCurrency, 12);
});


test('equipping a weapon exposes its stats and only its signature passive on the matching core', () => {
  const owned = {
    ...baseSave(),
    voidWeaponInventory: { 'cinder-oath': 1, 'stillpoint': 1 }
  };
  const offSignature = equipVoidWeapon(owned, 'frost', 'cinder-oath');
  assert.equal(offSignature.equipped, true);
  assert.equal(getVoidWeaponBonuses(offSignature.saveData, 'frost').stats.atkPct, 0.12);
  assert.equal(getVoidWeaponBonuses(offSignature.saveData, 'frost').signaturePassive, null);
  const onSignature = equipVoidWeapon(offSignature.saveData, 'ember', 'cinder-oath');
  assert.equal(getVoidWeaponBonuses(onSignature.saveData, 'ember').signaturePassive.effectId, 'ashen-verdict');
  const removed = unequipVoidWeapon(onSignature.saveData, 'ember');
  assert.equal(removed.unequipped, true);
  assert.equal(getVoidWeaponBonuses(removed.saveData, 'ember').weapon, null);
});

test('weapon bonuses reject unowned weapons and invalid core equipment', () => {
  const empty = baseSave();
  assert.equal(equipVoidWeapon(empty, 'ember', 'cinder-oath').reason, 'not-owned');
  assert.equal(equipVoidWeapon(empty, 'unknown-core', 'cinder-oath').reason, 'invalid-core');
  assert.equal(getVoidWeaponBonuses(empty, 'ember').stats.atkPct, 0);
});
