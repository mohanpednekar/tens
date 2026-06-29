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

  it('tens tier costs ones', () => {
    const tens = TIER_DEFINITIONS.find(t => t.id === 'tens')
    expect(tens.costResourceId).toBe('ones')
  })

  it('each tier above ones costs the same lower-layer resource it produces', () => {
    TIER_DEFINITIONS.slice(1).forEach(tier => {
      expect(tier.costResourceId).toBe(
        tier.producesResourceId,
        `tier ${tier.id} should cost and produce ${tier.producesResourceId}`
      )
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
