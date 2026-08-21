import { describe, expect, it } from 'vitest'
import {
  AUTO_PRESTIGE_BASE_INTERVAL_SECONDS,
  AUTO_PRESTIGE_COST,
  AUTO_PRESTIGE_COST_MULTIPLIER,
  AUTO_SPEED_UP_COST,
  BITS_PER_BYTE,
  COMPUTE_BOOST_PRESETS,
  COMPUTE_BOOST_TIER_FIELDS,
  COMPUTE_BOOST_TIER_POWER_STEP,
  COMPUTE_CORES_PER_NODE,
  COMPUTE_ENTITY_CAP,
  DISK_ARRAY_LADDER_CAP,
  DISK_BUILD_COST_MULTIPLIER,
  DISK_CACHE_BLOCK_COUNT,
  DISK_LADDER_BASE_SIZE_BITS,
  DISK_LADDER_SIZE_MULTIPLIER,
  getTierBaseTickSpeedSeconds,
  GOOGOL,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  INTRO_DISK_UNLOCK_CAPACITY,
  MONEY_ID,
  OVERCLOCK_MULTIPLIER_STEP,
  OVERCLOCK_REQUIREMENT_STEP,
  PRESTIGE_POINT_SPEED_BONUS,
  PRESTIGE_SPEED_BONUS_UNLOCK_COST,
  PRESTIGE_THRESHOLD,
  RESOURCE_SYMBOL,
  SMART_AUTOBUYER_COST_MULTIPLIER,
  SPEED_UP_MULTIPLIER_BASE,
  TICKSPEED_MULTIPLIER_BASE_EXPONENT,
  TICKSPEED_PRODUCTION_STEP,
  TIER_DEFINITIONS,
  TICK_RATE_MS,
} from './layers'

describe('TIER_DEFINITIONS', () => {
  it('has exactly 10 tiers', () => {
    expect(TIER_DEFINITIONS).toHaveLength(10)
  })

  it('each tier has all required fields', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(tier).toHaveProperty('id')
      expect(tier).toHaveProperty('name')
      expect(tier).toHaveProperty('symbol')
      expect(tier).toHaveProperty('baseCost')
      expect(tier).toHaveProperty('costResourceId')
      expect(tier).toHaveProperty('producesResourceId')
      expect(tier).toHaveProperty('baseTickSpeedSeconds')
    })
  })

  it('tier IDs are unique', () => {
    const ids = TIER_DEFINITIONS.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every tier baseCost is a positive number', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(tier.baseCost).toBeGreaterThan(0)
    })
  })

  it('baseCost strictly increases from one tier to the next', () => {
    for (let i = 1; i < TIER_DEFINITIONS.length; i++) {
      expect(TIER_DEFINITIONS[i].baseCost).toBeGreaterThan(TIER_DEFINITIONS[i - 1].baseCost)
    }
  })

  it('every tier baseTickSpeedSeconds is a positive number', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(tier.baseTickSpeedSeconds).toBeGreaterThan(0)
    })
  })

  it('baseTickSpeedSeconds increases by 1s per tier, from 1s to 10s', () => {
    TIER_DEFINITIONS.forEach((tier, index) => {
      expect(tier.baseTickSpeedSeconds).toBe(index + 1)
    })
  })

  it('first tier is Kilobytes and both costs and produces the base currency (Bits)', () => {
    expect(TIER_DEFINITIONS[0].id).toBe('tier01')
    expect(TIER_DEFINITIONS[0].name).toBe('Kilobytes')
    expect(TIER_DEFINITIONS[0].costResourceId).toBe(MONEY_ID)
    expect(TIER_DEFINITIONS[0].producesResourceId).toBe(MONEY_ID)
  })

  it('last tier is Quettabytes', () => {
    expect(TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].name).toBe('Quettabytes')
  })

  it('no tier is named Bytes — Bytes are produced by the Byte Foundry intro, not a purchasable tier', () => {
    expect(TIER_DEFINITIONS.some(tier => tier.name === 'Bytes')).toBe(false)
  })

  it('every tier is bought with the base currency (Bits)', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(tier.costResourceId).toBe(MONEY_ID)
    })
  })

  it('each tier above the first produces the tier immediately below it', () => {
    TIER_DEFINITIONS.slice(1).forEach((tier, index) => {
      expect(tier.producesResourceId).toBe(TIER_DEFINITIONS[index].id)
    })
  })
})

describe('RESOURCE_SYMBOL', () => {
  it('returns each tier\'s own symbol for its id', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(RESOURCE_SYMBOL(tier.id)).toBe(tier.symbol)
    })
  })

  it('falls back to b for MONEY_ID', () => {
    expect(RESOURCE_SYMBOL(MONEY_ID)).toBe('b')
  })

  it('falls back to b for an unknown resource id', () => {
    expect(RESOURCE_SYMBOL('does_not_exist')).toBe('b')
  })

  it('does not mutate TIER_DEFINITIONS when called', () => {
    const before = JSON.stringify(TIER_DEFINITIONS)
    RESOURCE_SYMBOL('anything')
    expect(JSON.stringify(TIER_DEFINITIONS)).toBe(before)
  })
})

describe('getTierBaseTickSpeedSeconds', () => {
  it('is 1 second for the first tier', () => {
    expect(getTierBaseTickSpeedSeconds(TIER_DEFINITIONS[0].id)).toBe(1)
  })

  it('matches each tier\'s own defined baseTickSpeedSeconds (1s through 10s)', () => {
    TIER_DEFINITIONS.forEach((tier, index) => {
      expect(getTierBaseTickSpeedSeconds(tier.id)).toBe(index + 1)
    })
  })

  it('falls back to 1 second for an unrecognized tier id', () => {
    expect(getTierBaseTickSpeedSeconds('does_not_exist')).toBe(1)
  })
})

describe('constants', () => {
  it('MONEY_ID is base', () => {
    expect(MONEY_ID).toBe('base')
  })

  it('GOOGOL is 10^100', () => {
    expect(GOOGOL).toBe(1e100)
  })

  it('BITS_PER_BYTE is 8', () => {
    expect(BITS_PER_BYTE).toBe(8)
  })

  it('PRESTIGE_THRESHOLD is GOOGOL * BITS_PER_BYTE (1 Googol Bytes, in Bits)', () => {
    expect(PRESTIGE_THRESHOLD).toBe(GOOGOL * BITS_PER_BYTE)
    expect(PRESTIGE_THRESHOLD).toBe(8e100)
  })

  it('TICK_RATE_MS is a positive number', () => {
    expect(TICK_RATE_MS).toBeGreaterThan(0)
  })

  it('PRESTIGE_POINT_SPEED_BONUS is 0.01 (1% per unspent Prestige Point)', () => {
    expect(PRESTIGE_POINT_SPEED_BONUS).toBe(0.01)
  })

  it('TICKSPEED_MULTIPLIER_BASE_EXPONENT is 10 (first tier\'s base cost is 10^10)', () => {
    expect(TICKSPEED_MULTIPLIER_BASE_EXPONENT).toBe(10)
  })

  it('TICKSPEED_PRODUCTION_STEP is 0.1 (10% production per tickspeed level)', () => {
    expect(TICKSPEED_PRODUCTION_STEP).toBe(0.1)
  })

  it('SMART_AUTOBUYER_COST_MULTIPLIER is 10 (smart costs 10x the unlock cost)', () => {
    expect(SMART_AUTOBUYER_COST_MULTIPLIER).toBe(10)
  })

  it('AUTO_PRESTIGE_COST is 1000', () => {
    expect(AUTO_PRESTIGE_COST).toBe(1000)
  })

  it('PRESTIGE_SPEED_BONUS_UNLOCK_COST is 10000', () => {
    expect(PRESTIGE_SPEED_BONUS_UNLOCK_COST).toBe(10000)
  })

  it('AUTO_SPEED_UP_COST is 20', () => {
    expect(AUTO_SPEED_UP_COST).toBe(20)
  })

  it('AUTO_PRESTIGE_COST_MULTIPLIER is 2 (cost doubles per level)', () => {
    expect(AUTO_PRESTIGE_COST_MULTIPLIER).toBe(2)
  })

  it('AUTO_PRESTIGE_BASE_INTERVAL_SECONDS is 1000', () => {
    expect(AUTO_PRESTIGE_BASE_INTERVAL_SECONDS).toBe(1000)
  })

  it('SPEED_UP_MULTIPLIER_BASE is 2 (production doubles per activation)', () => {
    expect(SPEED_UP_MULTIPLIER_BASE).toBe(2)
  })

  it('OVERCLOCK_MULTIPLIER_STEP is 0.1 (×1.1 per claimed Overclock level, folded into the Tickspeed multiplier\'s own step)', () => {
    expect(OVERCLOCK_MULTIPLIER_STEP).toBe(0.1)
  })

  it('OVERCLOCK_REQUIREMENT_STEP is 1 (the per-cycle escalation step, on top of getOverclockRequirement\'s own fixed +2 floor)', () => {
    expect(OVERCLOCK_REQUIREMENT_STEP).toBe(1)
  })

  it('INTRO_COMPUTE_CORE_UNLOCK_CAPACITY is 8,000,000 bits (1 MB in Memory\'s own B/KB/MB display scale)', () => {
    expect(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY).toBe(8000000)
    expect(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY).toBe(1000 * 1000 * BITS_PER_BYTE)
  })

  it('COMPUTE_CORES_PER_NODE is 8', () => {
    expect(COMPUTE_CORES_PER_NODE).toBe(8)
  })

  it('COMPUTE_ENTITY_CAP is 10', () => {
    expect(COMPUTE_ENTITY_CAP).toBe(10)
  })

  it('INTRO_DISK_UNLOCK_CAPACITY is 80,000 bits (10 KB in Memory\'s own B/KB/MB display scale)', () => {
    expect(INTRO_DISK_UNLOCK_CAPACITY).toBe(80000)
    expect(INTRO_DISK_UNLOCK_CAPACITY).toBe(10 * 1000 * BITS_PER_BYTE)
  })

  it('DISK_BUILD_COST_MULTIPLIER is 10 (a disk costs 10x its own Byte-accurate size to build)', () => {
    expect(DISK_BUILD_COST_MULTIPLIER).toBe(10)
  })

  it('DISK_ARRAY_LADDER_CAP is 10 (disks per size before the build ladder advances)', () => {
    expect(DISK_ARRAY_LADDER_CAP).toBe(10)
  })

  it('DISK_LADDER_BASE_SIZE_BITS is 8000 (1 KB) and DISK_LADDER_SIZE_MULTIPLIER is 10 (every Byte power-of-ten size)', () => {
    expect(DISK_LADDER_BASE_SIZE_BITS).toBe(8000)
    expect(DISK_LADDER_SIZE_MULTIPLIER).toBe(10)
  })

  it('DISK_CACHE_BLOCK_COUNT is 8 (a disk array\'s cache splits into 8 equal releasable blocks)', () => {
    expect(DISK_CACHE_BLOCK_COUNT).toBe(8)
  })

  it('COMPUTE_BOOST_PRESETS base (tier 1 / Core) values are 1 minute (Burst x32), 10 minutes (Standard x8), 1 hour (Sustain x2)', () => {
    expect(COMPUTE_BOOST_PRESETS.burst).toEqual({ multiplier: 32, durationSeconds: 60 })
    expect(COMPUTE_BOOST_PRESETS.standard).toEqual({ multiplier: 8, durationSeconds: 600 })
    expect(COMPUTE_BOOST_PRESETS.sustain).toEqual({ multiplier: 2, durationSeconds: 3600 })
  })

  it('COMPUTE_BOOST_TIER_POWER_STEP is 4 (each compute-ladder tier is 4x as powerful as the previous one)', () => {
    expect(COMPUTE_BOOST_TIER_POWER_STEP).toBe(4)
  })

  it('COMPUTE_BOOST_TIER_FIELDS lists all 10 compute-ladder entities, lowest tier (Core) first', () => {
    expect(COMPUTE_BOOST_TIER_FIELDS).toEqual([
      'computeCores', 'computeNodes', 'computeClusters', 'computeNetworks', 'computeGrids',
      'computeFabrics', 'computeClouds', 'computeDatacenters', 'computeSupercomputers', 'computeMegacomputers',
    ])
  })
})
