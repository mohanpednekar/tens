import { describe, expect, it } from 'vitest'
import {
  AUTO_PRESTIGE_BASE_INTERVAL_SECONDS,
  AUTO_PRESTIGE_COST,
  AUTO_PRESTIGE_COST_MULTIPLIER,
  AUTO_SPEED_UP_COST,
  BITS_PER_BYTE,
  BYTES_ID,
  COMPUTE_AUTO_BOOST_UNLOCK_COST,
  COMPUTE_BOOST_PRESETS,
  COMPUTE_BOOST_TIER_DURATION_STEP,
  COMPUTE_BOOST_TIER_FIELDS,
  COMPUTE_BOOST_TIER_POWER_STEP,
  COMPUTE_CORES_PER_NODE,
  COMPUTE_ENTITY_CAP,
  DATA_LAKE_CAPACITY_BY_LEVEL,
  DATA_LAKE_CAPACITY_MAX_LEVEL,
  DATA_LAKE_OVERFLOW_MAX_PERCENT,
  DATA_LAKE_OVERFLOW_MIN_PERCENT,
  DATA_LAKE_SUB_SIZE_DISK_CAPS,
  DATA_LAKE_SUB_SIZES,
  DATA_LAKE_TIER_COUNT,
  DATA_LAKE_TIER_LABELS,
  COMPUTE_MERGE_CORE_EARN_MULTIPLIER,
  COMPUTE_MERGE_DURATION_UPGRADE_COUNT,
  COMPUTE_MERGE_STEP_MULTIPLIER,
  COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED,
  DISK_ARRAY_LADDER_CAP,
  DISK_BUILD_COST_MULTIPLIER,
  DISK_CACHE_BLOCK_COUNT,
  DISK_LADDER_BASE_SIZE_BITS,
  DISK_LADDER_SIZE_MULTIPLIER,
  getTierBaseTickSpeedSeconds,
  GOOGOL,
  FILL_MULTIPLIER_MAX_PERCENT,
  FILL_MULTIPLIER_MIN_PERCENT,
  FILL_MULTIPLIER_TAP_BONUS_PERCENT,
  FILL_MULTIPLIER_TAP_CAP_PERCENT,
  FILL_MULTIPLIER_TAP_DECAY_PERCENT_PER_SECOND,
  INTRO_BANDWIDTH_COST_MULTIPLIER,
  INTRO_CAPACITY_CAP_BITS,
  INTRO_CAPACITY_DOUBLING_STEP,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  INTRO_DISK_UNLOCK_CAPACITY,
  INTRO_STARTING_CAPACITY,
  MEMORY_BINARY_UNIT_STEP,
  MONEY_ID,
  OVERCLOCK_MULTIPLIER_STEP,
  OVERCLOCK_REQUIREMENT_STEP,
  POOL_CAPACITY_SI_STEP,
  PRESTIGE_DOUBLE_PP_UPGRADE_COST_BASE,
  PRESTIGE_POINT_SPEED_BONUS,
  PRESTIGE_POWERS_PER_PP_BASE,
  PRESTIGE_SPEED_BONUS_UNLOCK_COST,
  PRESTIGE_THRESHOLD,
  PRESTIGE_UNBOUNDED_MIN_COUNT,
  RESOURCE_SYMBOL,
  SMART_AUTOBUYER_COST_MULTIPLIER,
  SPEED_UP_MULTIPLIER_BASE,
  TICKSPEED_MULTIPLIER_BASE_EXPONENT,
  TICKSPEED_PRODUCTION_STEP,
  TIER_DEFINITIONS,
  TIER_BY_ID,
  TIER_INDEX_BY_ID,
  COMPUTE_FLOPS_TIER_DEFINITIONS,
  COMPUTE_FLOPS_TIER_BY_ID,
  COMPUTE_FLOPS_TIER_INDEX_BY_ID,
  TICK_RATE_MS,
  getStoragePoolMemoryBounds,
} from './layers'

describe('tier lookup dictionaries', () => {
  it('map every definition id to its entry and index', () => {
    TIER_DEFINITIONS.forEach((tier, index) => {
      expect(TIER_BY_ID[tier.id]).toBe(tier)
      expect(TIER_INDEX_BY_ID[tier.id]).toBe(index)
    })
    COMPUTE_FLOPS_TIER_DEFINITIONS.forEach((flopTier, index) => {
      expect(COMPUTE_FLOPS_TIER_BY_ID[flopTier.id]).toBe(flopTier)
      expect(COMPUTE_FLOPS_TIER_INDEX_BY_ID[flopTier.id]).toBe(index)
    })
  })

  it('return undefined for Object.prototype member names rather than an inherited value', () => {
    for (const id of ['toString', 'constructor', '__proto__', 'valueOf', 'hasOwnProperty']) {
      expect(TIER_BY_ID[id]).toBeUndefined()
      expect(TIER_INDEX_BY_ID[id]).toBeUndefined()
      expect(COMPUTE_FLOPS_TIER_BY_ID[id]).toBeUndefined()
      expect(COMPUTE_FLOPS_TIER_INDEX_BY_ID[id]).toBeUndefined()
    }
  })
})

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

  it('first tier is Kilobytes, costs Bits, and produces Bytes', () => {
    expect(TIER_DEFINITIONS[0].id).toBe('tier01')
    expect(TIER_DEFINITIONS[0].name).toBe('Kilobytes')
    expect(TIER_DEFINITIONS[0].costResourceId).toBe(MONEY_ID)
    expect(TIER_DEFINITIONS[0].producesResourceId).toBe(BYTES_ID)
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

  it('returns B for BYTES_ID', () => {
    expect(RESOURCE_SYMBOL(BYTES_ID)).toBe('B')
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

  it('PRESTIGE_UNBOUNDED_MIN_COUNT is 100', () => {
    expect(PRESTIGE_UNBOUNDED_MIN_COUNT).toBe(100)
  })

  it('PRESTIGE_POWERS_PER_PP_BASE is 64', () => {
    expect(PRESTIGE_POWERS_PER_PP_BASE).toBe(64)
  })

  it('PRESTIGE_DOUBLE_PP_UPGRADE_COST_BASE is 100', () => {
    expect(PRESTIGE_DOUBLE_PP_UPGRADE_COST_BASE).toBe(100)
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

  it('POOL_CAPACITY_SI_STEP is 1000 (pool Capacity end bounds land on clean SI powers of 1000 Bytes)', () => {
    expect(POOL_CAPACITY_SI_STEP).toBe(1000)
  })

  it('INTRO_COMPUTE_CORE_UNLOCK_CAPACITY is 4,000,000 bits (500 KB SI) — half of pool 1\'s INTRO_CAPACITY_CAP_BITS', () => {
    expect(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY).toBe(4000000)
    expect(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY).toBe(INTRO_CAPACITY_CAP_BITS / INTRO_CAPACITY_DOUBLING_STEP)
    expect(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY).toBe(BITS_PER_BYTE * 500_000)
  })

  it('INTRO_CAPACITY_CAP_BITS is 8,000,000 bits (exactly 1 MB SI) — large enough to afford building pool 1\'s own largest (100 KB) Disk', () => {
    expect(INTRO_CAPACITY_CAP_BITS).toBe(8000000)
    expect(INTRO_CAPACITY_CAP_BITS).toBe(BITS_PER_BYTE * POOL_CAPACITY_SI_STEP ** 2)
  })

  it('INTRO_CAPACITY_DOUBLING_STEP is 2 (shared binary Capacity ladder spacing)', () => {
    expect(INTRO_CAPACITY_DOUBLING_STEP).toBe(2)
  })

  it('INTRO_BANDWIDTH_COST_MULTIPLIER is 4 (Speed\'s own cost ladder steps ×4 per tier)', () => {
    expect(INTRO_BANDWIDTH_COST_MULTIPLIER).toBe(4)
  })

  it('FILL_MULTIPLIER_* span exactly 100 percentage points, centered on 100% at 50% full', () => {
    expect(FILL_MULTIPLIER_MAX_PERCENT).toBe(150)
    expect(FILL_MULTIPLIER_MIN_PERCENT).toBe(50)
    expect(FILL_MULTIPLIER_MAX_PERCENT - FILL_MULTIPLIER_MIN_PERCENT).toBe(100)
  })

  it('FILL_MULTIPLIER_TAP_BONUS_PERCENT is 5 and FILL_MULTIPLIER_TAP_DECAY_PERCENT_PER_SECOND is 1', () => {
    expect(FILL_MULTIPLIER_TAP_BONUS_PERCENT).toBe(5)
    expect(FILL_MULTIPLIER_TAP_DECAY_PERCENT_PER_SECOND).toBe(1)
  })

  it('FILL_MULTIPLIER_TAP_CAP_PERCENT is 200 (the cumulative fill + tap-bonus ceiling)', () => {
    expect(FILL_MULTIPLIER_TAP_CAP_PERCENT).toBe(200)
  })

  it('getStoragePoolMemoryBounds delimits pool Memory Capacity start/end on the shared SI-aligned ladder', () => {
    expect(getStoragePoolMemoryBounds(1)).toEqual({
      startBits: INTRO_STARTING_CAPACITY,
      endBits: INTRO_CAPACITY_CAP_BITS,
    })
    // Pool 2 (Megabyte pool) ends at exactly 1 GB (SI), pool 3 (Gigabyte pool) at exactly 1 TB —
    // and so on, matching Storage's own SI display convention throughout.
    expect(getStoragePoolMemoryBounds(2).endBits).toBe(BITS_PER_BYTE * POOL_CAPACITY_SI_STEP ** 3)
    expect(getStoragePoolMemoryBounds(3).endBits).toBe(BITS_PER_BYTE * POOL_CAPACITY_SI_STEP ** 4)
  })

  it('MEMORY_BINARY_UNIT_STEP is 1024 (Data Stream Buffer display\'s own binary unit ladder — 1 KiB = 1024 Bytes; no longer governs where a pool\'s Capacity end bound itself lands, see POOL_CAPACITY_SI_STEP)', () => {
    expect(MEMORY_BINARY_UNIT_STEP).toBe(1024)
  })

  it('COMPUTE_CORES_PER_NODE is 8', () => {
    expect(COMPUTE_CORES_PER_NODE).toBe(8)
  })

  it('COMPUTE_ENTITY_CAP is 10', () => {
    expect(COMPUTE_ENTITY_CAP).toBe(10)
  })

  it('COMPUTE_MERGE duration multipliers are 10× Core earn / 10× step / 5× upgraded, with 9 boundaries', () => {
    expect(COMPUTE_MERGE_CORE_EARN_MULTIPLIER).toBe(10)
    expect(COMPUTE_MERGE_STEP_MULTIPLIER).toBe(10)
    expect(COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED).toBe(5)
    expect(COMPUTE_MERGE_DURATION_UPGRADE_COUNT).toBe(9)
  })

  it('COMPUTE_AUTO_BOOST_UNLOCK_COST is 30 PP', () => {
    expect(COMPUTE_AUTO_BOOST_UNLOCK_COST).toBe(30)
  })

  it('INTRO_DISK_UNLOCK_CAPACITY is 8,192 bits ("1 KiB" in Memory\'s own binary display scale) — deliberately equal to pool 1\'s own capacity-unlock threshold (BITS_PER_BYTE * MEMORY_BINARY_UNIT_STEP), see engine.js\'s getPoolCapacityUnlockThresholdBits(1)', () => {
    expect(INTRO_DISK_UNLOCK_CAPACITY).toBe(8192)
    expect(INTRO_DISK_UNLOCK_CAPACITY).toBe(BITS_PER_BYTE * MEMORY_BINARY_UNIT_STEP)
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

  it('COMPUTE_BOOST_PRESETS base (tier 1 / Core) values are 10 minutes (Burst x20), 1 hour (Standard x5), 10 hours (Sustain x2)', () => {
    expect(COMPUTE_BOOST_PRESETS.burst).toEqual({ multiplier: 20, durationSeconds: 600 })
    expect(COMPUTE_BOOST_PRESETS.standard).toEqual({ multiplier: 5, durationSeconds: 3600 })
    expect(COMPUTE_BOOST_PRESETS.sustain).toEqual({ multiplier: 2, durationSeconds: 36000 })
  })

  it('total extra production ((multiplier - 1) * durationSeconds) increases Burst -> Standard -> Sustain', () => {
    const extra = preset => (preset.multiplier - 1) * preset.durationSeconds
    expect(extra(COMPUTE_BOOST_PRESETS.burst)).toBe(190 * 60) // 190 minutes, in seconds
    expect(extra(COMPUTE_BOOST_PRESETS.standard)).toBe(240 * 60)
    expect(extra(COMPUTE_BOOST_PRESETS.sustain)).toBe(600 * 60)
    expect(extra(COMPUTE_BOOST_PRESETS.burst)).toBeLessThan(extra(COMPUTE_BOOST_PRESETS.standard))
    expect(extra(COMPUTE_BOOST_PRESETS.standard)).toBeLessThan(extra(COMPUTE_BOOST_PRESETS.sustain))
  })

  it('COMPUTE_BOOST_TIER_POWER_STEP is 4 (each compute-ladder tier is 4x as powerful as the previous one)', () => {
    expect(COMPUTE_BOOST_TIER_POWER_STEP).toBe(4)
  })

  it('COMPUTE_BOOST_TIER_DURATION_STEP is 2 (each merge tier doubles Boost duration)', () => {
    expect(COMPUTE_BOOST_TIER_DURATION_STEP).toBe(2)
  })

  it('COMPUTE_BOOST_TIER_FIELDS lists all 10 compute-ladder entities, lowest tier (Core) first', () => {
    expect(COMPUTE_BOOST_TIER_FIELDS).toEqual([
      'computeCores', 'computeNodes', 'computeClusters', 'computeNetworks', 'computeGrids',
      'computeFabrics', 'computeClouds', 'computeDatacenters', 'computeSupercomputers', 'computeMegacomputers',
    ])
  })

  it('DATA_LAKE constants define 10 KB…QB lakes with a level-3 hard cap on capacity-ladder advances', () => {
    expect(DATA_LAKE_TIER_COUNT).toBe(10)
    expect(DATA_LAKE_TIER_LABELS).toEqual(['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'RB', 'QB'])
    expect(DATA_LAKE_CAPACITY_MAX_LEVEL).toBe(3)
  })

  it('DATA_LAKE_CAPACITY_BY_LEVEL climbs a plain decade-power-of-10 ladder — 1, 10, 100, 1,000 — matching pool Capacity\'s own decade-power shape (getDecadePowerEquivalentBits)', () => {
    expect(DATA_LAKE_CAPACITY_BY_LEVEL).toEqual([1, 10, 100, 1000])
    expect(DATA_LAKE_CAPACITY_BY_LEVEL).toHaveLength(DATA_LAKE_CAPACITY_MAX_LEVEL + 1)
    expect(DATA_LAKE_CAPACITY_BY_LEVEL[DATA_LAKE_CAPACITY_MAX_LEVEL]).toBe(1000)
  })

  it('DATA_LAKE_SUB_SIZE_DISK_CAPS (10/9/9) sum exactly to the maxed level\'s own 1,000-unit capacity, one entry per DATA_LAKE_SUB_SIZES', () => {
    expect(DATA_LAKE_SUB_SIZE_DISK_CAPS).toHaveLength(DATA_LAKE_SUB_SIZES.length)
    const total = DATA_LAKE_SUB_SIZES.reduce((sum, subSize, index) => sum + subSize * DATA_LAKE_SUB_SIZE_DISK_CAPS[index], 0)
    expect(total).toBe(DATA_LAKE_CAPACITY_BY_LEVEL[DATA_LAKE_CAPACITY_MAX_LEVEL])
    expect(DATA_LAKE_SUB_SIZE_DISK_CAPS).toEqual([10, 9, 9])
  })

  it('DATA_LAKE_OVERFLOW_MAX_PERCENT/MIN_PERCENT bound the lake-overflow rate at 50%..0%', () => {
    expect(DATA_LAKE_OVERFLOW_MAX_PERCENT).toBe(50)
    expect(DATA_LAKE_OVERFLOW_MIN_PERCENT).toBe(0)
    expect(DATA_LAKE_OVERFLOW_MAX_PERCENT).toBeGreaterThan(DATA_LAKE_OVERFLOW_MIN_PERCENT)
  })
})
