/* Void Weapon definitions.
 * Data only: inventory, stat application, and signature passive execution are
 * implemented in later stages. Percentages are stored as whole numbers.
 */
export const VOID_WEAPONS = [
  {
    id: 'cinderwake',
    name: 'Cinderwake',
    symbol: '♨',
    color: '#ff9c65',
    signatureCoreId: 'ember',
    stats: { hpPercent: 5, attackPercent: 12, armorFlat: 3 },
    passive: {
      id: 'ashenVerdict',
      name: 'Ashen Verdict',
      description: 'Burning enemies take 15% increased damage from Ember. Defeating a burning enemy slightly extends nearby burn effects.',
      effect: {
        type: 'burning_target_damage',
        damagePercent: 15,
        extendNearbyBurnOnKill: true
      }
    }
  },
  {
    id: 'stillwinter',
    name: 'Stillwinter',
    symbol: '❄',
    color: '#8cecff',
    signatureCoreId: 'frost',
    stats: { hpPercent: 12, attackPercent: 3, armorFlat: 8 },
    passive: {
      id: 'absoluteZero',
      name: 'Absolute Zero',
      description: 'Frozen enemies take 15% increased damage. Hitting a frozen enemy grants a small temporary shield, subject to an internal cooldown.',
      effect: {
        type: 'frozen_target_damage_and_shield',
        damagePercent: 15,
        shieldOnHit: true,
        shieldCooldownSeconds: 6
      }
    }
  },
  {
    id: 'eventHorizon',
    name: 'Event Horizon',
    symbol: '✦',
    color: '#d2a0ff',
    signatureCoreId: 'nova',
    stats: { hpPercent: 4, attackPercent: 8, armorFlat: 4 },
    passive: {
      id: 'singularityLine',
      name: 'Singularity Line',
      description: 'Piercing attacks deal 10% increased damage. Each additional enemy hit by the same beam grants a small amount of ultimate energy, up to a per-shot cap.',
      effect: {
        type: 'piercing_beam_scaling',
        damagePercent: 10,
        energyPerAdditionalTarget: 2,
        energyPerShotCap: 8
      }
    }
  },
  {
    id: 'stormglass',
    name: 'Stormglass',
    symbol: 'ϟ',
    color: '#ffe875',
    signatureCoreId: 'flash',
    stats: { hpPercent: 5, attackPercent: 7, armorFlat: 5 },
    passive: {
      id: 'afterimageCircuit',
      name: 'Afterimage Circuit',
      description: 'Dashing increases attack speed for a short duration. Repeated triggers refresh the duration instead of stacking.',
      effect: {
        type: 'attack_speed_after_dash',
        attackSpeedPercent: 15,
        durationSeconds: 3,
        stacking: 'refresh'
      }
    }
  },
  {
    id: 'verdantOath',
    name: 'Verdant Oath',
    symbol: '❧',
    color: '#70e58a',
    signatureCoreId: 'nature',
    stats: { hpPercent: 8, attackPercent: 7, armorFlat: 5 },
    passive: {
      id: 'reclamation',
      name: 'Reclamation',
      description: 'Defeating an enemy restores a small amount of hull. Bosses and minibosses instead trigger a modest recovery when crossing a health threshold.',
      effect: {
        type: 'hull_restore_on_kill',
        hullPerKill: 1,
        eliteThresholdRestore: 5,
        eliteThresholdPercent: 50
      }
    }
  },
  {
    id: 'prismfall',
    name: 'Prismfall',
    symbol: '◈',
    color: '#ff71cd',
    signatureCoreId: 'elemental',
    stats: { hpPercent: 5, attackPercent: 8, armorFlat: 4 },
    passive: {
      id: 'fracturedSpectrum',
      name: 'Fractured Spectrum',
      description: 'Critical hits create a small prismatic burst that damages nearby enemies. Each target can be hit once per burst.',
      effect: {
        type: 'critical_prismatic_burst',
        burstDamagePercent: 35,
        radius: 72,
        perTargetHitLimit: 1
      }
    }
  },
  {
    id: 'lastRequiem',
    name: 'Last Requiem',
    symbol: '⟡',
    color: '#ff304f',
    signatureCoreId: 'vengeance',
    stats: { hpPercent: 6, attackPercent: 10, armorFlat: 2 },
    passive: {
      id: 'debtCollector',
      name: 'Debt Collector',
      description: 'Deal bonus damage to enemies below 30% health. Bosses receive a reduced bonus.',
      effect: {
        type: 'low_health_target_damage',
        thresholdPercent: 30,
        damagePercent: 20,
        bossDamagePercent: 8
      }
    }
  },
  {
    id: 'dawnsEmbrace',
    name: "Dawn's Embrace",
    symbol: '✧',
    color: '#ff9ed8',
    signatureCoreId: 'remielle',
    stats: { hpPercent: 8, attackPercent: 6, armorFlat: 5 },
    passive: {
      id: 'wingsUnbound',
      name: 'Wings Unbound',
      description: 'Periodically summon a spectral feather that seeks a nearby enemy. The feather gains a bonus while Auralis feather mechanics are active.',
      effect: {
        type: 'homing_spectral_feather',
        intervalSeconds: 5,
        damagePercent: 45,
        auralisFeatherBonusPercent: 25
      }
    }
  }
];

export const VOID_WEAPON_BY_ID = Object.freeze(
  Object.fromEntries(VOID_WEAPONS.map(weapon => [weapon.id, weapon]))
);

export const VOID_WEAPON_SIGNATURE_CORE_IDS = Object.freeze(
  Object.fromEntries(VOID_WEAPONS.map(weapon => [weapon.id, weapon.signatureCoreId]))
);
