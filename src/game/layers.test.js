import { describe, expect, it } from 'vitest'
import {
  AUTOBUYER_PP_COST_BASE,
  MONEY_ID,
  PRESTIGE_PP_COST,
  RESOURCE_NAMES,
  RESOURCE_SYMBOL,
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
      expect(tier).toHaveProperty('baseCost')
      expect(tier).toHaveProperty('costResourceId')
      expect(tier).toHaveProperty('producesResourceId')
    })
  })

  it('all tier baseCosts are 10', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(tier.baseCost).toBe(10)
    })
  })

  it('tier IDs are unique', () => {
    const ids = TIER_DEFINITIONS.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('first tier is ones and costs money', () => {
    expect(TIER_DEFINITIONS[0].id).toBe('ones')
    expect(TIER_DEFINITIONS[0].costResourceId).toBe('money')
  })

  it('tens tier costs money (not ones) so it is purchasable with accumulated money', () => {
    const tens = TIER_DEFINITIONS.find(t => t.id === 'tens')
    expect(tens.costResourceId).toBe('money')
  })

  it('each tier from index 2 onward costs the resource produced by the tier below it', () => {
    for (let i = 2; i < TIER_DEFINITIONS.length; i++) {
      expect(TIER_DEFINITIONS[i].costResourceId).toBe(
        TIER_DEFINITIONS[i - 1].producesResourceId,
        `tier ${TIER_DEFINITIONS[i].id} should cost ${TIER_DEFINITIONS[i - 1].producesResourceId}`
      )
    }
  })

  it('no circular dependency: tiers above ones do not produce the same resource they cost', () => {
    // Ones tier intentionally costs and produces money (self-referential by design).
    // All other tiers must cost a different resource than they produce.
    TIER_DEFINITIONS.slice(1).forEach(tier => {
      expect(tier.producesResourceId).not.toBe(tier.costResourceId)
    })
  })
})

describe('RESOURCE_NAMES', () => {
  it('has an entry for MONEY_ID', () => {
    expect(RESOURCE_NAMES).toHaveProperty(MONEY_ID)
  })

  it('has an entry for every costResourceId used by a tier', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(
        RESOURCE_NAMES,
        `missing RESOURCE_NAMES entry for costResourceId '${tier.costResourceId}' (tier '${tier.id}')`
      ).toHaveProperty(tier.costResourceId)
    })
  })

  it('has an entry for every producesResourceId used by a tier', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(
        RESOURCE_NAMES,
        `missing RESOURCE_NAMES entry for producesResourceId '${tier.producesResourceId}' (tier '${tier.id}')`
      ).toHaveProperty(tier.producesResourceId)
    })
  })
})

describe('RESOURCE_SYMBOL', () => {
  it('has an entry for MONEY_ID', () => {
    expect(RESOURCE_SYMBOL).toHaveProperty(MONEY_ID)
  })

  it('has an entry for every costResourceId used by a tier', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(
        RESOURCE_SYMBOL,
        `missing RESOURCE_SYMBOL entry for costResourceId '${tier.costResourceId}' (tier '${tier.id}')`
      ).toHaveProperty(tier.costResourceId)
    })
  })

  it('has an entry for every producesResourceId used by a tier', () => {
    TIER_DEFINITIONS.forEach(tier => {
      expect(
        RESOURCE_SYMBOL,
        `missing RESOURCE_SYMBOL entry for producesResourceId '${tier.producesResourceId}' (tier '${tier.id}')`
      ).toHaveProperty(tier.producesResourceId)
    })
  })
})

describe('constants', () => {
  it('MONEY_ID is money', () => {
    expect(MONEY_ID).toBe('money')
  })

  it('PRESTIGE_PP_COST is a positive integer', () => {
    expect(PRESTIGE_PP_COST).toBeGreaterThan(0)
    expect(Number.isInteger(PRESTIGE_PP_COST)).toBe(true)
  })

  it('TICK_RATE_MS is a positive number', () => {
    expect(TICK_RATE_MS).toBeGreaterThan(0)
  })

  it('AUTOBUYER_PP_COST_BASE is a positive number', () => {
    expect(AUTOBUYER_PP_COST_BASE).toBeGreaterThan(0)
  })
})
