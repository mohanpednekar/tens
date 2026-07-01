import { describe, expect, it } from 'vitest'
import {
  buyAutobuyer,
  buyTier,
  createInitialGameState,
  formatAmount,
  getAutobuyerCost,
  getTierCost,
  getTierPurchasedCount,
  getTierSpendableAmount,
  isTierUnlocked,
  prestigeGame,
  productionMultiplier,
  tickGame,
} from './engine'
import { MONEY_ID, PRESTIGE_PP_COST, TIER_DEFINITIONS } from './layers'

// ─── helpers ────────────────────────────────────────────────────────────────

const withMoney = (state, amount) => ({
  ...state,
  resources: { ...state.resources, [MONEY_ID]: amount },
})

const withResource = (state, resourceId, amount) => ({
  ...state,
  resources: { ...state.resources, [resourceId]: amount },
})

const withOwned = (state, tierId, count) => ({
  ...state,
  owned: { ...state.owned, [tierId]: count },
})

const withPurchased = (state, tierId, count) => ({
  ...state,
  purchased: { ...state.purchased, [tierId]: count },
})

const withPP = (state, pp) => ({
  ...state,
  prestige: { ...state.prestige, pp },
})

const withAutobuyer = (state, tierId) => ({
  ...state,
  autobuyers: { ...state.autobuyers, [tierId]: true },
})

const withPrestigeLevel = (state, level) => ({
  ...state,
  prestige: { ...state.prestige, level },
})

// ─── createInitialGameState ─────────────────────────────────────────────────

describe('createInitialGameState', () => {
  it('starts with MONEY_STARTING_AMOUNT money', () => {
    const state = createInitialGameState()
    expect(state.resources[MONEY_ID]).toBe(10)
  })

  it('initialises all tiers with owned = 0', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.owned[tier.id]).toBe(0)
    })
  })

  it('initialises all tiers with purchased = 0', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.purchased[tier.id]).toBe(0)
    })
  })

  it('initialises all autobuyers as false', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.autobuyers[tier.id]).toBe(false)
    })
  })

  it('starts at prestige level 0 with 0 PP', () => {
    const { prestige } = createInitialGameState()
    expect(prestige.level).toBe(0)
    expect(prestige.pp).toBe(0)
  })

  it('initialises all non-money resources to 0', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      if (tier.producesResourceId !== MONEY_ID) {
        expect(state.resources[tier.producesResourceId]).toBe(0)
      }
    })
  })
})

// ─── formatAmount ────────────────────────────────────────────────────────────

describe('formatAmount', () => {
  it('formats zero', () => {
    expect(formatAmount(0)).toBe('0')
  })

  it('formats small decimals', () => {
    // Intl.NumberFormat with maximumFractionDigits:2 trims trailing zeros
    expect(formatAmount(1.5)).toBe('1.5')
    expect(formatAmount(1.55)).toBe('1.55')
  })

  it('formats large integers without decimals', () => {
    expect(formatAmount(1000)).toBe('1,000')
  })

  it('treats negative values as 0', () => {
    expect(formatAmount(-5)).toBe('0')
  })

  it('treats non-finite values as 0', () => {
    expect(formatAmount(Infinity)).toBe('0')
    expect(formatAmount(NaN)).toBe('0')
  })
})

// ─── getTierCost ─────────────────────────────────────────────────────────────

describe('getTierCost', () => {
  const tier = { baseCost: 10 }

  it('costs baseCost when 0 owned', () => {
    expect(getTierCost(tier, 0)).toBe(10)
  })

  it('increases 10 % per purchase within the first epoch (0 – 9)', () => {
    expect(getTierCost(tier, 1)).toBeCloseTo(11)
    expect(getTierCost(tier, 9)).toBeCloseTo(19)
  })

  it('doubles the increment starting at owned = 10 (epoch 1)', () => {
    // epoch=1, within=0 → 10 * 2 * 1.0 = 20
    expect(getTierCost(tier, 10)).toBeCloseTo(20)
    // epoch=1, within=9 → 10 * 2 * 1.9 = 38
    expect(getTierCost(tier, 19)).toBeCloseTo(38)
  })

  it('doubles again at owned = 20 (epoch 2)', () => {
    // epoch=2, within=0 → 10 * 4 * 1.0 = 40
    expect(getTierCost(tier, 20)).toBeCloseTo(40)
  })

  it('treats negative owned as 0', () => {
    expect(getTierCost(tier, -1)).toBe(10)
  })
})

// ─── getAutobuyerCost ────────────────────────────────────────────────────────

describe('getAutobuyerCost', () => {
  it('costs 1 PP for layer 0 (ones)', () => {
    expect(getAutobuyerCost(0)).toBe(1)
  })

  it('doubles with each layer', () => {
    expect(getAutobuyerCost(1)).toBe(2)
    expect(getAutobuyerCost(2)).toBe(4)
    expect(getAutobuyerCost(3)).toBe(8)
  })

  it('costs 512 PP for layer 9 (billions)', () => {
    expect(getAutobuyerCost(9)).toBe(512)
  })
})

// ─── productionMultiplier ────────────────────────────────────────────────────

describe('productionMultiplier', () => {
  it('returns 1 at level 0', () => {
    expect(productionMultiplier(0)).toBe(1)
  })

  it('doubles per prestige level', () => {
    expect(productionMultiplier(1)).toBe(2)
    expect(productionMultiplier(2)).toBe(4)
    expect(productionMultiplier(3)).toBe(8)
  })

  it('treats negative levels as 0', () => {
    expect(productionMultiplier(-1)).toBe(1)
  })
})

// ─── isTierUnlocked ──────────────────────────────────────────────────────────

describe('isTierUnlocked', () => {
  it('always unlocks tier 0 (ones)', () => {
    const state = createInitialGameState()
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[0])).toBe(true)
  })

  it('locks tier 1 when tier 0 is not owned', () => {
    const state = createInitialGameState()
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[1])).toBe(false)
  })

  it('keeps tier 1 locked when tier 0 is owned < 10', () => {
    const state = withOwned(createInitialGameState(), TIER_DEFINITIONS[0].id, 9)
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[1])).toBe(false)
  })

  it('unlocks tier 1 when tier 0 is owned ≥ 10', () => {
    const state = withOwned(createInitialGameState(), TIER_DEFINITIONS[0].id, 10)
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[1])).toBe(true)
  })

  it('unlocks tier 2 only after tier 1 is owned ≥ 10', () => {
    const lockedState = withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 9)
    const unlockedState = withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 10)
    expect(isTierUnlocked(lockedState)(TIER_DEFINITIONS[2])).toBe(false)
    expect(isTierUnlocked(unlockedState)(TIER_DEFINITIONS[2])).toBe(true)
  })

  it('keeps an already-owned tier unlocked for older saves', () => {
    const state = withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1)
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[1])).toBe(true)
  })
})

// ─── buyTier ─────────────────────────────────────────────────────────────────

describe('buyTier', () => {
  const onesTier = TIER_DEFINITIONS[0]

  it('deducts cost and increments owned', () => {
    const state = createInitialGameState() // $10
    const after = buyTier(onesTier.id)(state)
    expect(after.owned[onesTier.id]).toBe(1)
    expect(after.purchased[onesTier.id]).toBe(1)
    expect(after.resources[MONEY_ID]).toBe(0)
  })

  it('returns the same state object when funds are insufficient', () => {
    const state = withMoney(createInitialGameState(), 5)
    expect(buyTier(onesTier.id)(state)).toBe(state)
  })

  it('returns the same state object for a locked tier', () => {
    const state = createInitialGameState()
    expect(buyTier(TIER_DEFINITIONS[1].id)(state)).toBe(state)
  })

  it('returns the same state object for an unknown tier ID', () => {
    const state = createInitialGameState()
    expect(buyTier('does_not_exist')(state)).toBe(state)
  })

  it('cost increases after each purchase', () => {
    const costAt0 = getTierCost(onesTier, 0) // 10
    const costAt1 = getTierCost(onesTier, 1) // 11
    expect(costAt1).toBeGreaterThan(costAt0)
  })

  it('can chain multiple purchases', () => {
    let state = withMoney(createInitialGameState(), 1000)
    state = buyTier(onesTier.id)(state)
    state = buyTier(onesTier.id)(state)
    expect(state.owned[onesTier.id]).toBe(2)
  })

  it('uses generated lower-tier resources as the spendable amount', () => {
    const tensTier = TIER_DEFINITIONS[1]
    const state = withResource(createInitialGameState(), 'ones', 7)
    expect(getTierSpendableAmount(state, tensTier)).toBe(7)
  })

  it('tens tier is purchasable by spending ones resources after owning 10 ones', () => {
    const tensTier = TIER_DEFINITIONS[1]
    const state = withResource(
      withOwned(createInitialGameState(), onesTier.id, 10),
      onesTier.id,
      10
    )
    const after = buyTier(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(1)
    expect(after.owned[onesTier.id]).toBe(10)
    expect(after.resources[onesTier.id]).toBe(0)
  })

  it('fresh-game progression: buying 10 ones credits spendable ones, enabling first tens purchase', () => {
    const tensTier = TIER_DEFINITIONS[1]
    // Total cost to buy 10 ones: $10 + $11 + … + $19 = $145
    let state = withMoney(createInitialGameState(), 145)
    for (let i = 0; i < 10; i++) {
      state = buyTier(onesTier.id)(state)
    }
    expect(state.owned[onesTier.id]).toBe(10)
    expect(state.resources[onesTier.id]).toBe(10)
    expect(isTierUnlocked(state)(tensTier)).toBe(true)

    const after = buyTier(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(1)
    expect(after.owned[onesTier.id]).toBe(10)
    expect(after.resources[onesTier.id]).toBe(0)
  })

  it('higher tiers are purchasable by spending produced resources from the previous tier', () => {
    const tensTier = TIER_DEFINITIONS[1]
    const hundredsTier = TIER_DEFINITIONS[2]
    const state = withResource(
      withOwned(
        withOwned(createInitialGameState(), onesTier.id, 10),
        tensTier.id,
        10
      ),
      tensTier.id,
      10
    )
    const after = buyTier(hundredsTier.id)(state)
    expect(after.owned[hundredsTier.id]).toBe(1)
    expect(after.owned[tensTier.id]).toBe(10)
    expect(after.resources[tensTier.id]).toBe(0)
  })

  it('uses purchased count for cost when owned is higher from generation', () => {
    const state = withMoney(
      withPurchased(
        withOwned(createInitialGameState(), onesTier.id, 50),
        onesTier.id,
        0
      ),
      10
    )

    expect(getTierPurchasedCount(state, onesTier.id)).toBe(0)
    expect(getTierCost(onesTier, getTierPurchasedCount(state, onesTier.id))).toBe(10)

    const after = buyTier(onesTier.id)(state)
    expect(after.resources[MONEY_ID]).toBe(0)
    expect(after.owned[onesTier.id]).toBe(51)
    expect(after.purchased[onesTier.id]).toBe(1)
  })
})

// ─── tickGame ────────────────────────────────────────────────────────────────

describe('tickGame', () => {
  it('produces money from Ones generators over 1 second', () => {
    const state = withOwned(createInitialGameState(), 'ones', 5)
    const after = tickGame(1)(state)
    // 5 generators × 1 sec = +5 money
    expect(after.resources[MONEY_ID]).toBe(
      state.resources[MONEY_ID] + 5
    )
  })

  it('produces nothing when no generators are owned', () => {
    const state = createInitialGameState()
    const after = tickGame(1)(state)
    expect(after.resources[MONEY_ID]).toBe(state.resources[MONEY_ID])
  })

  it('scales production with elapsed time', () => {
    const state = withOwned(createInitialGameState(), 'ones', 1)
    const after = tickGame(3)(state)
    expect(after.resources[MONEY_ID]).toBe(state.resources[MONEY_ID] + 3)
  })

  it('applies prestige multiplier to production', () => {
    const base = withOwned(createInitialGameState(), 'ones', 1)
    const boosted = withPrestigeLevel(base, 1) // ×2
    expect(tickGame(1)(boosted).resources[MONEY_ID]).toBe(
      base.resources[MONEY_ID] + 2
    )
  })

  it('tens generators produce ones resource and owned generators', () => {
    const state = withOwned(
      withOwned(createInitialGameState(), 'ones', 10),
      'tens', 2
    )
    const after = tickGame(1)(state)
    expect(after.resources.ones).toBe(2)
    expect(after.owned.ones).toBe(12) // 10 initial + 2 produced
  })

  it('awards a PP when money crosses a power-of-10 milestone', () => {
    const state = {
      ...withOwned(createInitialGameState(), 'ones', 10),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 95 },
      prestige: { pp: 0, level: 0, highestMilestone: 1 },
    }
    const after = tickGame(1)(state) // +10 money → crosses 100
    expect(after.prestige.pp).toBeGreaterThan(0)
  })

  it('active autobuyer purchases 1 generator per tick', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 100),
      'ones'
    )
    const after = tickGame(1)(state)
    expect(after.owned.ones).toBe(1)
    expect(after.resources[MONEY_ID]).toBeLessThan(100)
  })

  it('autobuyer does not purchase when funds are insufficient', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 0),
      'ones'
    )
    const after = tickGame(1)(state)
    expect(after.owned.ones).toBe(0)
  })
})

// ─── buyAutobuyer ────────────────────────────────────────────────────────────

describe('buyAutobuyer', () => {
  it('activates the autobuyer and deducts PP', () => {
    const state = withPP(createInitialGameState(), 1)
    const after = buyAutobuyer(TIER_DEFINITIONS[0].id)(state)
    expect(after.autobuyers[TIER_DEFINITIONS[0].id]).toBe(true)
    expect(after.prestige.pp).toBe(0)
  })

  it('returns the same state when PP is insufficient', () => {
    const state = withPP(createInitialGameState(), 0)
    expect(buyAutobuyer(TIER_DEFINITIONS[0].id)(state)).toBe(state)
  })

  it('returns the same state when autobuyer is already owned', () => {
    const state = withPP(withAutobuyer(createInitialGameState(), TIER_DEFINITIONS[0].id), 10)
    expect(buyAutobuyer(TIER_DEFINITIONS[0].id)(state)).toBe(state)
  })

  it('returns the same state for an unknown tier ID', () => {
    const state = withPP(createInitialGameState(), 100)
    expect(buyAutobuyer('does_not_exist')(state)).toBe(state)
  })

  it('charges exponentially more PP for higher layers', () => {
    // Layer 0 costs 1, layer 1 costs 2, layer 2 costs 4
    const state = withPP(createInitialGameState(), 4)
    const after = buyAutobuyer(TIER_DEFINITIONS[2].id)(state)
    expect(after.autobuyers[TIER_DEFINITIONS[2].id]).toBe(true)
    expect(after.prestige.pp).toBe(0)
  })
})

// ─── prestigeGame ────────────────────────────────────────────────────────────

describe('prestigeGame', () => {
  it('does nothing when PP < PRESTIGE_PP_COST', () => {
    const state = withPP(createInitialGameState(), PRESTIGE_PP_COST - 1)
    expect(prestigeGame(state)).toBe(state)
  })

  it('increments prestige level by 1', () => {
    const state = withPP(createInitialGameState(), PRESTIGE_PP_COST)
    const after = prestigeGame(state)
    expect(after.prestige.level).toBe(1)
  })

  it('deducts PRESTIGE_PP_COST from PP', () => {
    const state = withPP(createInitialGameState(), PRESTIGE_PP_COST + 3)
    const after = prestigeGame(state)
    expect(after.prestige.pp).toBe(3)
  })

  it('resets money to starting amount', () => {
    const state = withPP(withMoney(createInitialGameState(), 99999), PRESTIGE_PP_COST)
    const after = prestigeGame(state)
    expect(after.resources[MONEY_ID]).toBe(10)
  })

  it('resets all owned counts to 0', () => {
    const state = withPP(
      withOwned(createInitialGameState(), 'ones', 50),
      PRESTIGE_PP_COST
    )
    const after = prestigeGame(state)
    TIER_DEFINITIONS.forEach(tier => {
      expect(after.owned[tier.id]).toBe(0)
    })
  })

  it('preserves autobuyers after prestige', () => {
    const state = withPP(
      withAutobuyer(createInitialGameState(), 'ones'),
      PRESTIGE_PP_COST
    )
    const after = prestigeGame(state)
    expect(after.autobuyers.ones).toBe(true)
  })
})
