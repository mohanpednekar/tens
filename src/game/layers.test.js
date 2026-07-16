import { describe, expect, it } from 'vitest'
import {
  AUTO_PRESTIGE_BASE_INTERVAL_SECONDS,
  AUTO_PRESTIGE_COST,
  AUTO_PRESTIGE_COST_MULTIPLIER,
  AUTOBUYER_AUTOMATION_BASE_COST,
  getTierBaseTickSpeedSeconds,
  GOOGOL,
  MONEY_ID,
  PRESTIGE_POINT_SPEED_BONUS,
  RESOURCE_SYMBOL,
  SMART_AUTOBUYER_COST_MULTIPLIER,
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

  it('baseTickSpeedSeconds is 1 for the first tier and increases by exactly 1 per subsequent tier', () => {
    expect(TIER_DEFINITIONS[0].baseTickSpeedSeconds).toBe(1)
    for (let i = 1; i < TIER_DEFINITIONS.length; i++) {
      expect(TIER_DEFINITIONS[i].baseTickSpeedSeconds).toBe(TIER_DEFINITIONS[i - 1].baseTickSpeedSeconds + 1)
    }
  })

  it('first tier is Tens and both costs and produces Ones (money)', () => {
    expect(TIER_DEFINITIONS[0].id).toBe('tier01')
    expect(TIER_DEFINITIONS[0].costResourceId).toBe(MONEY_ID)
    expect(TIER_DEFINITIONS[0].producesResourceId).toBe(MONEY_ID)
  })

  it('every tier is bought with Ones (money)', () => {
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

  it('falls back to $ for MONEY_ID', () => {
    expect(RESOURCE_SYMBOL(MONEY_ID)).toBe('$')
  })

  it('falls back to $ for an unknown resource id', () => {
    expect(RESOURCE_SYMBOL('does_not_exist')).toBe('$')
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

  it('increases by 1 second per subsequent tier, up to 10 seconds for the 10th', () => {
    TIER_DEFINITIONS.forEach((tier, index) => {
      expect(getTierBaseTickSpeedSeconds(tier.id)).toBe(index + 1)
    })
  })

  it('falls back to 1 second for an unrecognized tier id', () => {
    expect(getTierBaseTickSpeedSeconds('does_not_exist')).toBe(1)
  })
})

describe('constants', () => {
  it('MONEY_ID is Ones', () => {
    expect(MONEY_ID).toBe('Ones')
  })

  it('GOOGOL is 10^100', () => {
    expect(GOOGOL).toBe(1e100)
  })

  it('TICK_RATE_MS is a positive number', () => {
    expect(TICK_RATE_MS).toBeGreaterThan(0)
  })

  it('PRESTIGE_POINT_SPEED_BONUS is 0.01 (1% per unspent Prestige Point)', () => {
    expect(PRESTIGE_POINT_SPEED_BONUS).toBe(0.01)
  })

  it('AUTOBUYER_AUTOMATION_BASE_COST is 1 (first tier costs 1 PP)', () => {
    expect(AUTOBUYER_AUTOMATION_BASE_COST).toBe(1)
  })

  it('SMART_AUTOBUYER_COST_MULTIPLIER is 10 (smart costs 10x automation)', () => {
    expect(SMART_AUTOBUYER_COST_MULTIPLIER).toBe(10)
  })

  it('AUTO_PRESTIGE_COST is 100', () => {
    expect(AUTO_PRESTIGE_COST).toBe(100)
  })

  it('AUTO_PRESTIGE_COST_MULTIPLIER is 2 (cost doubles per level)', () => {
    expect(AUTO_PRESTIGE_COST_MULTIPLIER).toBe(2)
  })

  it('AUTO_PRESTIGE_BASE_INTERVAL_SECONDS is 1000', () => {
    expect(AUTO_PRESTIGE_BASE_INTERVAL_SECONDS).toBe(1000)
  })
})
