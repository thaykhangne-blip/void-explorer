/* Void Weapon definitions. IDs are stable save-data keys; signatureCoreId must match src/data/cores.js IDs. */
export const voidWeapons = [
  {
    id: 'cinder-oath',
    name: 'Cinder Oath',
    signatureCoreId: 'ember',
    rarity: 'legendary',
    color: '#ff9c65',
    glyph: '♨',
    description: 'A blade forged inside a dying star.',
    stats: { atkPct: 0.12, hpPct: 0.08, armorPct: 0 },
    passive: {
      name: 'Ashen Verdict',
      description: 'Burning enemies take 15% increased damage from critical hits. Defeating a burning enemy has a 20% chance to spread its remaining burn to a nearby enemy.',
      effectId: 'ashen-verdict'
    }
  },
  {
    id: 'stillpoint',
    name: 'Stillpoint',
    signatureCoreId: 'frost',
    rarity: 'legendary',
    color: '#8cecff',
    glyph: '❄',
    description: 'A weapon preserved beyond the end of time.',
    stats: { atkPct: 0, hpPct: 0.10, armorPct: 0.15 },
    passive: {
      name: 'Absolute Zero',
      description: 'Frozen enemies receive 20% increased damage. When Frost activates its shield, nearby enemies gain 2 Chill stacks.',
      effectId: 'absolute-zero'
    }
  },
  {
    id: 'eventide-array',
    name: 'Eventide Array',
    signatureCoreId: 'nova',
    rarity: 'legendary',
    color: '#d2a0ff',
    glyph: '✧',
    description: 'A precision instrument designed to pierce collapsed space.',
    stats: { atkPct: 0.14, hpPct: 0, armorPct: 0.06 },
    passive: {
      name: 'Infinite Line',
      description: 'Each additional enemy pierced by a laser increases that attack’s damage by 8%, up to 32% additional damage.',
      effectId: 'infinite-line'
    }
  },
  {
    id: 'thunderclap-protocol',
    name: 'Thunderclap Protocol',
    signatureCoreId: 'flash',
    rarity: 'legendary',
    color: '#ffe875',
    glyph: 'ϟ',
    description: 'A weapon that reaches its target before the shot is visible.',
    stats: { atkPct: 0.10, hpPct: 0.10, armorPct: 0 },
    passive: {
      name: 'Cascade Failure',
      description: 'Chain lightning deals 15% more damage per successive jump, up to 45% additional damage. The bonus resets after each attack sequence.',
      effectId: 'cascade-failure'
    }
  },
  {
    id: 'verdant-covenant',
    name: 'Verdant Covenant',
    signatureCoreId: 'nature',
    rarity: 'legendary',
    color: '#70e58a',
    glyph: '❧',
    description: 'A living relic grown around a forgotten reactor.',
    stats: { atkPct: 0.08, hpPct: 0.12, armorPct: 0 },
    passive: {
      name: 'Symbiotic Engine',
      description: 'Each living summoned drone restores 0.5% of maximum HP every 5 seconds. While at least one drone is active, Nature deals 10% increased damage.',
      effectId: 'symbiotic-engine'
    }
  },
  {
    id: 'prism-paradox',
    name: 'Prism Paradox',
    signatureCoreId: 'elemental',
    rarity: 'legendary',
    color: '#ff71cd',
    glyph: '◈',
    description: 'A crystalline weapon that refuses to obey a single law of physics.',
    stats: { atkPct: 0.10, hpPct: 0, armorPct: 0.10 },
    passive: {
      name: 'Spectrum Collapse',
      description: 'Each distinct elemental effect on an enemy grants 4% bonus critical damage, up to 20%. Critical hits against enemies carrying at least three different elemental effects restore 2 energy.',
      effectId: 'spectrum-collapse'
    }
  },
  {
    id: 'blood-dividend',
    name: 'Blood Dividend',
    signatureCoreId: 'vengeance',
    rarity: 'legendary',
    color: '#ff304f',
    glyph: '⟡',
    description: 'A weapon built on the principle that survival always has a cost.',
    stats: { atkPct: 0.15, hpPct: 0.05, armorPct: 0 },
    passive: {
      name: 'Debt Collection',
      description: 'While below 50% HP, gain 15% increased damage. Defeating an enemy restores 2% of maximum HP, with a 2-second internal cooldown.',
      effectId: 'debt-collection'
    }
  },
  {
    id: 'last-light-first-dawn',
    name: 'Last Light, First Dawn',
    signatureCoreId: 'remielle',
    rarity: 'legendary',
    color: '#ff9ed8',
    glyph: '✦',
    description: 'A fragment of light left behind by a universe that no longer exists.',
    stats: { atkPct: 0.10, hpPct: 0.10, armorPct: 0 },
    passive: {
      name: 'Luminous Afterimage',
      description: 'Each Light Crystal grants 4% increased Void Burst damage, up to 20%. Triggering Lumox at four stacks has a 25% chance to generate one additional Light Crystal.',
      effectId: 'luminous-afterimage'
    }
  }
];

export const VOID_WEAPON_BY_ID = Object.freeze(
  Object.fromEntries(voidWeapons.map(weapon => [weapon.id, weapon]))
);

export const VOID_WEAPON_SIGNATURE_CORE_IDS = Object.freeze(
  voidWeapons.map(weapon => weapon.signatureCoreId)
);
