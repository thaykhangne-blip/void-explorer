/* Void Weapon definitions. IDs are stable save-data keys; signatureCoreId must match src/data/cores.js IDs. */
export const voidWeapons = [
  {
    id: 'cinder-oath',
    name: 'Cinder Oath',
    category: 'signature',
    signatureCoreId: 'ember',
    rarity: 'legendary',
    color: '#ff9c65',
    glyph: '♨',
    description: 'EMBER · BURNING CRITICAL STRIKES',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: {
      name: 'Cinder Oath',
      effectId: 'cinder-oath',
      statKey: 'critChance',
      values: [0.12, 0.14, 0.16, 0.18, 0.20],
      description: 'Critical Rate: +12% / 14% / 16% / 18% / 20%. Ashen Verdict: Burning enemies take 25% / 30% / 35% / 40% / 45% more damage. Infernal Barrage: Auto-attacks spawn 1 / 1 / 2 / 2 / 2 additional smaller homing fireballs. Each fireball damages nearby enemies and applies Burn. Fireballs inherit player damage bonuses but cannot spawn more fireballs.'
    }
  },
  {
    id: 'stillpoint',
    name: 'Stillpoint',
    category: 'signature',
    signatureCoreId: 'frost',
    rarity: 'legendary',
    color: '#8cecff',
    glyph: '❄',
    description: 'FROST · FREEZE AND SHATTER',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: {
      name: 'Stillpoint',
      effectId: 'stillpoint',
      statKey: 'critChance',
      values: [0.08, 0.10, 0.12, 0.14, 0.16],
      description: 'Critical Rate: +8% / 10% / 12% / 14% / 16%. Absolute Zero: Frozen enemies take 25% / 30% / 35% / 40% / 45% more damage. Glacial Shatter: Auto-attacking a frozen enemy triggers an explosion for 100% / 125% / 150% / 175% / 200% ATK as bonus damage, damaging nearby enemies and applying 1 / 1 / 2 / 2 / 3 Chill stacks.'
    }
  },
  {
    id: 'eventide-array',
    name: 'Eventide Array',
    category: 'signature',
    signatureCoreId: 'nova',
    rarity: 'legendary',
    color: '#d2a0ff',
    glyph: '✧',
    description: 'NOVA · LASER PENETRATION',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: {
      name: 'Eventide Array',
      effectId: 'eventide-array',
      statKey: 'fireRate',
      values: [0.10, 0.12, 0.14, 0.16, 0.18],
      description: 'Attack Speed: +10% / 12% / 14% / 16% / 18%. Infinite Line: Each additional enemy pierced by a laser increases that laser’s damage by 12% / 15% / 18% / 21% / 24%, stacking up to four times. Event Horizon: Every 5 / 4 / 3 / 3 / 2 auto-attacks, the next attack fires an enhanced piercing beam dealing 200% / 225% / 250% / 275% / 300% ATK. The beam pierces all enemies and gains the full Infinite Line bonus.'
    }
  },
  {
    id: 'thunderclap-protocol',
    name: 'Thunderclap Protocol',
    category: 'signature',
    signatureCoreId: 'flash',
    rarity: 'legendary',
    color: '#ffe875',
    glyph: 'ϟ',
    description: 'FLASH · CHAIN LIGHTNING',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: {
      name: 'Thunderclap Protocol',
      effectId: 'thunderclap-protocol',
      statKey: 'fireRate',
      values: [0.12, 0.14, 0.16, 0.18, 0.20],
      description: 'Attack Speed: +12% / 14% / 16% / 18% / 20%. Cascade Failure: Each successive chain-lightning jump increases that jump’s damage by 20% / 25% / 30% / 35% / 40%, stacking up to three times. Overload Circuit: Every 6 / 5 / 4 / 3 / 3 auto-attacks, the next hit triggers a surge dealing 150% / 175% / 200% / 225% / 250% ATK as bonus damage. It chains to 3 / 4 / 5 / 6 / 7 additional enemies, prioritizing targets not yet hit by the surge.'
    }
  },
  {
    id: 'verdant-covenant',
    name: 'Verdant Covenant',
    category: 'signature',
    signatureCoreId: 'nature',
    rarity: 'legendary',
    color: '#70e58a',
    glyph: '❧',
    description: 'NATURE · DRONES AND SYMBIOSIS',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: {
      name: 'Verdant Covenant',
      effectId: 'verdant-covenant',
      statKey: 'critDamage',
      values: [0.20, 0.24, 0.28, 0.32, 0.36],
      description: 'Critical Damage: +20% / 24% / 28% / 32% / 36%. Symbiotic Engine: Each active summoned drone increases all damage dealt by 5% / 6% / 7% / 8% / 9%, stacking up to five times. Predatory Bloom: Every 5 / 4 / 4 / 3 / 3 seconds, each active drone launches a homing seed dealing 80% / 100% / 120% / 140% / 160% ATK. With at least three drones, seeds explode on impact for 50% of their damage to nearby enemies.'
    }
  },
  {
    id: 'prism-paradox',
    name: 'Prism Paradox',
    category: 'signature',
    signatureCoreId: 'elemental',
    rarity: 'legendary',
    color: '#ff71cd',
    glyph: '◈',
    description: 'ELEMENTAL · REACTION CASCADES',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: {
      name: 'Prism Paradox',
      effectId: 'prism-paradox',
      statKey: 'critDamage',
      values: [0.20, 0.25, 0.30, 0.35, 0.40],
      description: 'Critical Damage: +20% / 25% / 30% / 35% / 40%. Spectrum Collapse: Each distinct elemental effect on a target increases damage dealt to it by 8% / 10% / 12% / 14% / 16%, up to three effects. Prismatic Detonation: Hitting a target with 3 / 3 / 2 / 2 / 2 distinct effects triggers a burst for 150% / 175% / 200% / 225% / 250% ATK. The burst spreads the triggering effects to nearby enemies.'
    }
  },
  {
    id: 'blood-dividend',
    name: 'Blood Dividend',
    category: 'signature',
    signatureCoreId: 'vengeance',
    rarity: 'legendary',
    color: '#ff304f',
    glyph: '⟡',
    description: 'VENGEANCE · RISK AND EXECUTION',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: {
      name: 'Blood Dividend',
      effectId: 'blood-dividend',
      statKey: 'hpPct',
      values: [0.25, 0.30, 0.35, 0.40, 0.45],
      description: 'Max HP: +25% / 30% / 35% / 40% / 45%. Debt Collection: Below 50% HP, deal 20% / 25% / 30% / 35% / 40% more damage. Crimson Reprisal: While above 50% HP, each 1% of Max HP above that threshold increases final damage by 0.5% / 0.6% / 0.7% / 0.8% / 0.9%, capped at 50% / 60% / 70% / 80% / 90% bonus damage.'
    }
  },
  {
    id: 'last-light-first-dawn',
    name: 'Last Light, First Dawn',
    category: 'signature',
    signatureCoreId: 'remielle',
    rarity: 'legendary',
    color: '#ff9ed8',
    glyph: '✦',
    description: 'REMIELLE · LIGHT CRYSTALS AND FEATHERS',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: {
      name: 'Last Light, First Dawn',
      effectId: 'last-light-first-dawn',
      statKey: 'critChance',
      values: [0.10, 0.12, 0.14, 0.16, 0.18],
      description: 'Critical Rate: +10% / 12% / 14% / 16% / 18%. Luminous Afterimage: Each Light Crystal increases Void Burst damage by 8% / 10% / 12% / 14% / 16%, up to five stacks. Dawn’s Echo: Triggering Lumox at four stacks launches 2 / 3 / 4 / 5 / 6 luminous feathers. Each feather deals 75% / 90% / 105% / 120% / 135% ATK and pierces one additional enemy per refinement rank. Each activation has a 25% / 30% / 35% / 40% / 45% chance to generate one Light Crystal.'
    }
  },
  {
    id: 'fracture-drive',
    name: 'Fracture Drive',
    signatureCoreId: null,
    category: 'general',
    rarity: 'rare',
    color: '#67d6ff',
    glyph: '⌁',
    description: 'GENERAL · RAW DAMAGE',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: { name: 'Kinetic Overdrive', effectId: 'general-fracture-drive', statKey: 'damage', values: [0.08, 0.10, 0.12, 0.14, 0.16], description: 'Damage: +8% / 10% / 12% / 14% / 16%. A universal weapon calibration that increases all damage dealt, regardless of equipped core.' }
  },
  {
    id: 'pale-orbit',
    name: 'Pale Orbit',
    signatureCoreId: null,
    category: 'general',
    rarity: 'rare',
    color: '#c8d6ff',
    glyph: '◌',
    description: 'GENERAL · CRITICAL PRECISION',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: { name: 'Deadeye Alignment', effectId: 'general-pale-orbit', statKey: 'critChance', values: [0.06, 0.08, 0.10, 0.12, 0.14], description: 'Critical Rate: +6% / 8% / 10% / 12% / 14%. A universal targeting array that improves critical chance for any core.' }
  },
  {
    id: 'bastion-weave',
    name: 'Bastion Weave',
    signatureCoreId: null,
    category: 'general',
    rarity: 'rare',
    color: '#75e0bd',
    glyph: '⬡',
    description: 'GENERAL · HULL REINFORCEMENT',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: { name: 'Layered Integrity', effectId: 'general-bastion-weave', statKey: 'hpPct', values: [0.12, 0.14, 0.16, 0.18, 0.20], description: 'Max HP: +12% / 14% / 16% / 18% / 20%. A universal hull reinforcement system compatible with every core.' }
  },
  {
    id: 'parallax-crown',
    name: 'Parallax Crown',
    signatureCoreId: null,
    category: 'general',
    rarity: 'unique',
    color: '#d6a4ff',
    glyph: '✥',
    description: 'GENERAL · CRITICAL AMPLIFICATION',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: { name: 'Critical Mass', effectId: 'general-parallax-crown', statKey: 'critDamage', values: [0.16, 0.19, 0.22, 0.25, 0.28], description: 'Critical Damage: +16% / 19% / 22% / 25% / 28%. Amplifies critical hits from any core without requiring a matching signature.' }
  },
  {
    id: 'chrono-spindle',
    name: 'Chrono Spindle',
    signatureCoreId: null,
    category: 'general',
    rarity: 'unique',
    color: '#ffe28b',
    glyph: '⧖',
    description: 'GENERAL · ATTACK TEMPO',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: { name: 'Accelerated Cycle', effectId: 'general-chrono-spindle', statKey: 'fireRate', values: [0.10, 0.12, 0.14, 0.16, 0.18], description: 'Attack Speed: +10% / 12% / 14% / 16% / 18%. Compresses the firing cycle for any equipped core.' }
  },
  {
    id: 'singularity-compass',
    name: 'Singularity Compass',
    signatureCoreId: null,
    category: 'general',
    rarity: 'unique',
    color: '#ff9eb2',
    glyph: '⊙',
    description: 'GENERAL · DAMAGE CALIBRATION',
    stats: { atkPct: 0, hpPct: 0, armorPct: 0 },
    passive: { name: 'Convergence Index', effectId: 'general-singularity-compass', statKey: 'damage', values: [0.14, 0.16, 0.18, 0.20, 0.22], description: 'Damage: +14% / 16% / 18% / 20% / 22%. A universal calibration that increases all damage dealt by any core.' }
  },

];

export const VOID_WEAPON_BY_ID = Object.freeze(
  Object.fromEntries(voidWeapons.map(weapon => [weapon.id, weapon]))
);

export const VOID_WEAPON_SIGNATURE_CORE_IDS = Object.freeze(
  voidWeapons.filter(weapon => weapon.category === 'signature').map(weapon => weapon.signatureCoreId)
);
