/* Persistent Void Weapon inventory helpers. No DOM or game-loop dependencies. */
import { voidWeapons, VOID_WEAPON_BY_ID } from '../data/voidWeapons.js';

export const VOID_WEAPON_SAVE_DEFAULTS = Object.freeze({
  voidWeaponInventory: {},
  equippedVoidWeapons: {},
  voidWeaponClaims: []
});

const CORE_IDS = new Set(VOID_WEAPON_SIGNATURE_CORE_IDS_SAFE());
function VOID_WEAPON_SIGNATURE_CORE_IDS_SAFE() {
  return voidWeapons.map(weapon => weapon.signatureCoreId);
}

function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export function normalizeVoidWeaponSave(saveData = {}) {
  const normalized = { ...saveData };
  const inventory = isRecord(normalized.voidWeaponInventory) ? normalized.voidWeaponInventory : {};
  const equipped = isRecord(normalized.equippedVoidWeapons) ? normalized.equippedVoidWeapons : {};
  const claims = Array.isArray(normalized.voidWeaponClaims) ? normalized.voidWeaponClaims : [];

  normalized.voidWeaponInventory = {};
  for (const [id, count] of Object.entries(inventory)) {
    if (Object.prototype.hasOwnProperty.call(VOID_WEAPON_BY_ID, id)) {
      const safeCount = Math.floor(Number(count));
      if (Number.isFinite(safeCount) && safeCount > 0) normalized.voidWeaponInventory[id] = safeCount;
    }
  }

  normalized.equippedVoidWeapons = {};
  for (const [coreId, weaponId] of Object.entries(equipped)) {
    if (CORE_IDS.has(coreId) &&
        Object.prototype.hasOwnProperty.call(VOID_WEAPON_BY_ID, weaponId) &&
        (normalized.voidWeaponInventory[weaponId] || 0) > 0) {
      normalized.equippedVoidWeapons[coreId] = weaponId;
    }
  }

  normalized.voidWeaponClaims = [...new Set(
    claims.filter(key => typeof key === 'string' && /^\d+:(5|10|15|20)$/.test(key))
  )];
  return normalized;
}

export function getVoidWeapon(weaponId) {
  return VOID_WEAPON_BY_ID[weaponId] || null;
}

export function getOwnedVoidWeapons(saveData) {
  const safe = normalizeVoidWeaponSave(saveData);
  return voidWeapons
    .filter(weapon => safe.voidWeaponInventory[weapon.id] > 0)
    .map(weapon => ({ ...weapon, copies: safe.voidWeaponInventory[weapon.id] }));
}

export function grantVoidWeapon(saveData, weaponId, copies = 1) {
  const safe = normalizeVoidWeaponSave(saveData);
  const amount = Math.floor(Number(copies));
  if (!VOID_WEAPON_BY_ID[weaponId] || !Number.isFinite(amount) || amount < 1) {
    return { saveData: safe, granted: false, reason: 'invalid-weapon-or-count' };
  }
  safe.voidWeaponInventory[weaponId] = (safe.voidWeaponInventory[weaponId] || 0) + amount;
  return { saveData: safe, granted: true, weaponId, copies: amount, totalCopies: safe.voidWeaponInventory[weaponId] };
}

export function equipVoidWeapon(saveData, coreId, weaponId) {
  const safe = normalizeVoidWeaponSave(saveData);
  if (!CORE_IDS.has(coreId)) return { saveData: safe, equipped: false, reason: 'invalid-core' };
  if (!VOID_WEAPON_BY_ID[weaponId]) return { saveData: safe, equipped: false, reason: 'invalid-weapon' };
  if (!(safe.voidWeaponInventory[weaponId] > 0)) return { saveData: safe, equipped: false, reason: 'not-owned' };
  safe.equippedVoidWeapons[coreId] = weaponId;
  return { saveData: safe, equipped: true, coreId, weaponId };
}

export function unequipVoidWeapon(saveData, coreId) {
  const safe = normalizeVoidWeaponSave(saveData);
  if (!CORE_IDS.has(coreId)) return { saveData: safe, unequipped: false, reason: 'invalid-core' };
  delete safe.equippedVoidWeapons[coreId];
  return { saveData: safe, unequipped: true, coreId };
}

export function getVoidWeaponBonuses(saveData, coreId) {
  const safe = normalizeVoidWeaponSave(saveData);
  const weaponId = safe.equippedVoidWeapons[coreId];
  const weapon = weaponId ? VOID_WEAPON_BY_ID[weaponId] : null;
  if (!weapon) return { weapon: null, stats: { atkPct: 0, hpPct: 0, armorPct: 0 }, signaturePassive: null };
  return {
    weapon,
    stats: { ...weapon.stats },
    signaturePassive: weapon.signatureCoreId === coreId ? weapon.passive : null
  };
}

export function claimVoidWeaponMilestone(saveData, worldId, roomNumber) {
  const safe = normalizeVoidWeaponSave(saveData);
  const world = Number(worldId);
  const milestone = Number(roomNumber);
  const key = `${world}:${milestone}`;
  if (!Number.isInteger(world) || world < 0 || world > 3 ||
      ![5, 10, 15, 20].includes(milestone) || safe.voidWeaponClaims.includes(key)) {
    return { saveData: safe, claimed: false, key };
  }
  safe.voidWeaponClaims.push(key);
  return { saveData: safe, claimed: true, key };
}
