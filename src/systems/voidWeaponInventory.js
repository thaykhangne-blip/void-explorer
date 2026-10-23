import { cores } from '../data/cores.js';
import { VOID_WEAPON_BY_ID } from '../data/voidWeapons.js';

const CORE_IDS = new Set(cores.map(core => core.id));
export const VOID_WEAPON_MAX_REFINEMENT = 5;
let instanceSequence = 0;

function makeInstanceId() {
  instanceSequence += 1;
  let entropy = '';
  try {
    if (globalThis.crypto?.randomUUID) entropy = globalThis.crypto.randomUUID();
  } catch {}
  if (!entropy) entropy = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${instanceSequence.toString(36)}`;
  return `vw-${entropy}`;
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Sanitize/migrate Void Weapon fields without touching unrelated save data.
 * Inventory entries are individual copies, while weaponId points to a definition.
 */
export function normalizeVoidWeaponSave(saveData = {}) {
  const sourceInventory = Array.isArray(saveData.voidWeaponInventory)
    ? saveData.voidWeaponInventory
    : [];
  const seenInstanceIds = new Set();
  const inventory = [];

  for (const entry of sourceInventory) {
    if (!isRecord(entry) || !VOID_WEAPON_BY_ID[entry.weaponId]) continue;
    let instanceId = typeof entry.instanceId === 'string' ? entry.instanceId.trim() : '';
    if (!instanceId || seenInstanceIds.has(instanceId)) instanceId = makeInstanceId();
    seenInstanceIds.add(instanceId);
    inventory.push({
      instanceId,
      weaponId: entry.weaponId,
      acquiredAt: Number.isFinite(Number(entry.acquiredAt)) ? Number(entry.acquiredAt) : Date.now(),
      refinementLevel: Math.min(VOID_WEAPON_MAX_REFINEMENT, Math.max(0, Math.floor(Number(entry.refinementLevel) || 0)))
    });
  }

  const ownedIds = new Set(inventory.map(item => item.instanceId));
  const sourceEquipped = isRecord(saveData.equippedVoidWeapons) ? saveData.equippedVoidWeapons : {};
  const equipped = {};
  const equippedInstances = new Set();

  for (const coreId of CORE_IDS) {
    const instanceId = sourceEquipped[coreId];
    if (typeof instanceId !== 'string' || !ownedIds.has(instanceId) || equippedInstances.has(instanceId)) continue;
    equipped[coreId] = instanceId;
    equippedInstances.add(instanceId);
  }

  return {
    voidWeaponInventory: inventory,
    equippedVoidWeapons: equipped,
    voidWeaponDataVersion: 1
  };
}

/** Create a separate inventory entry for every acquisition, including duplicates. */
export function addVoidWeapon(saveData, weaponId, acquiredAt = Date.now()) {
  if (!saveData || !VOID_WEAPON_BY_ID[weaponId]) return null;
  const normalized = normalizeVoidWeaponSave(saveData);
  saveData.voidWeaponInventory = normalized.voidWeaponInventory;
  saveData.equippedVoidWeapons = normalized.equippedVoidWeapons;
  saveData.voidWeaponDataVersion = normalized.voidWeaponDataVersion;

  const instance = {
    instanceId: makeInstanceId(),
    weaponId,
    acquiredAt: Number.isFinite(Number(acquiredAt)) ? Number(acquiredAt) : Date.now(),
    refinementLevel: 0
  };
  saveData.voidWeaponInventory.push(instance);
  return instance;
}

/**
 * Equip an owned instance to a core. An instance can be assigned to only one core;
 * moving it automatically clears its previous assignment.
 */
export function equipVoidWeapon(saveData, coreId, instanceId) {
  if (!saveData || !CORE_IDS.has(coreId)) return { ok: false, reason: 'invalid-core' };
  const normalized = normalizeVoidWeaponSave(saveData);
  const inventory = normalized.voidWeaponInventory;
  const instance = inventory.find(item => item.instanceId === instanceId);
  if (!instance) return { ok: false, reason: 'not-owned' };

  const equipped = { ...normalized.equippedVoidWeapons };
  for (const [assignedCoreId, assignedInstanceId] of Object.entries(equipped)) {
    if (assignedInstanceId === instanceId) delete equipped[assignedCoreId];
  }
  equipped[coreId] = instanceId;

  saveData.voidWeaponInventory = inventory;
  saveData.equippedVoidWeapons = equipped;
  saveData.voidWeaponDataVersion = normalized.voidWeaponDataVersion;
  return {
    ok: true,
    instance,
    signatureActive: VOID_WEAPON_BY_ID[instance.weaponId].signatureCoreId === coreId
  };
}

export function unequipVoidWeapon(saveData, coreId) {
  if (!saveData || !CORE_IDS.has(coreId)) return false;
  const normalized = normalizeVoidWeaponSave(saveData);
  const equipped = { ...normalized.equippedVoidWeapons };
  const hadWeapon = Object.prototype.hasOwnProperty.call(equipped, coreId);
  delete equipped[coreId];
  saveData.voidWeaponInventory = normalized.voidWeaponInventory;
  saveData.equippedVoidWeapons = equipped;
  saveData.voidWeaponDataVersion = normalized.voidWeaponDataVersion;
  return hadWeapon;
}

export function getEquippedVoidWeapon(saveData, coreId) {
  if (!saveData || !CORE_IDS.has(coreId)) return null;
  const normalized = normalizeVoidWeaponSave(saveData);
  const instanceId = normalized.equippedVoidWeapons[coreId];
  return normalized.voidWeaponInventory.find(item => item.instanceId === instanceId) || null;
}

export function getVoidWeaponDefinition(instance) {
  if (!instance) return null;
  const definition = VOID_WEAPON_BY_ID[instance.weaponId];
  if (!definition) return null;
  const level = Math.max(0, Math.min(5, Math.floor(Number(instance.refinementLevel) || 0)));
  if (!level) return definition;
  const stats = { hpPercent: definition.stats.hpPercent + level * 2, attackPercent: definition.stats.attackPercent + level * 2, armorFlat: definition.stats.armorFlat + level };
  const effect = { ...definition.passive.effect };
  for (const key of ['damagePercent','bossDamagePercent','energyPerAdditionalTarget','hullPerKill','eliteThresholdRestore','attackSpeedPercent','burstDamagePercent','auralisFeatherBonusPercent']) if (typeof effect[key] === 'number') effect[key] *= 1 + level * 0.1;
  return { ...definition, stats, passive: { ...definition.passive, effect }, refinementLevel: level };
}

export function refineVoidWeapon(saveData, instanceId) {
  if (!saveData || typeof instanceId !== 'string') return { ok: false, reason: 'invalid-save' };
  const normalized = normalizeVoidWeaponSave(saveData), inventory = normalized.voidWeaponInventory;
  const target = inventory.find(item => item.instanceId === instanceId);
  if (!target) return { ok: false, reason: 'not-owned' };
  if (target.refinementLevel >= VOID_WEAPON_MAX_REFINEMENT) return { ok: false, reason: 'max-refinement' };
  const equippedIds = new Set(Object.values(normalized.equippedVoidWeapons));
  const material = inventory.find(item => item.instanceId !== target.instanceId && item.weaponId === target.weaponId && !equippedIds.has(item.instanceId));
  if (!material) return { ok: false, reason: 'duplicate-required' };
  target.refinementLevel += 1;
  saveData.voidWeaponInventory = inventory.filter(item => item.instanceId !== material.instanceId);
  saveData.equippedVoidWeapons = normalized.equippedVoidWeapons;
  saveData.voidWeaponDataVersion = normalized.voidWeaponDataVersion;
  return { ok: true, instance: target, consumedInstanceId: material.instanceId };
}
