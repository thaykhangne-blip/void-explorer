import { cores } from '../data/cores.js';
import { VOID_WEAPON_BY_ID } from '../data/voidWeapons.js';

const CORE_IDS = new Set(cores.map(core => core.id));
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
      refinementLevel: Math.max(0, Math.floor(Number(entry.refinementLevel) || 0))
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
  return instance ? VOID_WEAPON_BY_ID[instance.weaponId] || null : null;
}
