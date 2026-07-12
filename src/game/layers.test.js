import { describe, expect, it } from 'vitest'
import {
  AUTOBUYER_XP_COST_BASE,
  GOOGOL,
  MONEY_ID,
  RESOURCE_SYMBOL,
  TIER_DEFINITIONS,
  TICK_RATE_MS,
} from './layers'

describe('TIER_DEFINITIONS', () => {
  it('has exactly 12 tiers', () => {
    expect(TIER_DEFINITIONS).toHaveLength(12)
  })

  it('each tier has all required fields', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(tier).toHaveProperty('id')
      expect(tier).toHaveProperty('name')
      expect(tier).toHaveProperty('symbol')
      expect(tier).toHaveProperty('baseCost')
      expect(tier).toHaveProperty('costResourceId')
      expect(tier).toHaveProperty('producesResourceId')
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

  it('first tier is Tens and both costs and produces Ones (money)', () => {
    expect(TIER_DEFINITIONS[0].id).toBe('Tens')
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

  it('AUTOBUYER_XP_COST_BASE is a positive number', () => {
    expect(AUTOBUYER_XP_COST_BASE).toBeGreaterThan(0)
  })
})
