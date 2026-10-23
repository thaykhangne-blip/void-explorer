import test from 'node:test';
import assert from 'node:assert/strict';
import { addVoidWeapon, equipVoidWeapon, normalizeVoidWeaponSave, refineVoidWeapon, getVoidWeaponDefinition } from '../src/systems/voidWeaponInventory.js';
import { getVoidWeaponRefinementBonuses } from '../src/systems/voidWeaponCombat.js';

function makeSave() { return { voidWeaponInventory: [], equippedVoidWeapons: {} }; }

test('refinement consumes one spare duplicate and upgrades the selected copy', () => {
  const save = makeSave();
  const target = addVoidWeapon(save, 'cinderwake', 1);
  const duplicate = addVoidWeapon(save, 'cinderwake', 2);
  const result = refineVoidWeapon(save, target.instanceId);
  assert.equal(result.ok, true);
  assert.equal(result.consumedInstanceId, duplicate.instanceId);
  assert.equal(save.voidWeaponInventory.length, 1);
  assert.equal(save.voidWeaponInventory[0].refinementLevel, 1);
  assert.equal(getVoidWeaponDefinition(save.voidWeaponInventory[0]).stats.attackPercent, 14);
});

test('equipped duplicate cannot be consumed as refinement material', () => {
  const save = makeSave();
  const target = addVoidWeapon(save, 'stillwinter', 1);
  const duplicate = addVoidWeapon(save, 'stillwinter', 2);
  equipVoidWeapon(save, 'frost', duplicate.instanceId);
  assert.equal(refineVoidWeapon(save, target.instanceId).reason, 'duplicate-required');
  assert.equal(save.voidWeaponInventory.length, 2);
});

test('refinement is capped at five and save normalization clamps invalid ranks', () => {
  const save = makeSave();
  const target = addVoidWeapon(save, 'eventHorizon', 1);
  target.refinementLevel = 99;
  assert.equal(normalizeVoidWeaponSave(save).voidWeaponInventory[0].refinementLevel, 5);
  assert.equal(refineVoidWeapon(save, target.instanceId).reason, 'max-refinement');
});

test('each refinement adds 2% HP and attack plus one armor', () => {
  const result = getVoidWeaponRefinementBonuses({ hpPercent: 5, attackPercent: 12, armorFlat: 3 }, 2);
  assert.ok(Math.abs(result.attackMultiplier - 1.16) < 1e-10);
  assert.ok(Math.abs(result.hpMultiplier - 1.09) < 1e-10);
  assert.equal(result.armorFlat, 5);
});

test('refinement fails safely when no matching duplicate exists', () => {
  const save = makeSave();
  const target = addVoidWeapon(save, 'prismfall', 1);
  assert.equal(refineVoidWeapon(save, target.instanceId).reason, 'duplicate-required');
  assert.equal(save.voidWeaponInventory[0].refinementLevel, 0);
});
