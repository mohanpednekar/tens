import { describe, expect, it } from 'vitest'
import {
  buyAutobuyer,
  buyTier,
  buyTierQuantity,
  buyTierQuantityWithYield,
  createInitialGameState,
  formatAmount,
  formatCurrency,
  getAutobuyerCost,
  getAutobuyerUnlockXPCost,
  getAutobuyerYieldMultiplier,
  getMoneyExponent,
  getPrestigeProgressPercent,
  getTierAffordableQuantity,
  getTierBulkQuantity,
  getTierCost,
  getTierPurchasedCount,
  getTierQuantityCost,
  getTierSpendableAmount,
  isTierUnlocked,
  prestigeGame,
  productionMultiplier,
  tickGame,
} from './engine'
import { GOOGOL, MONEY_ID, TIER_DEFINITIONS } from './layers'

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

const withXP = (state, xp) => ({
  ...state,
  prestige: { ...state.prestige, xp },
})

const withAutobuyer = (state, tierId, level = 1) => ({
  ...state,
  autobuyers: { ...state.autobuyers, [tierId]: level },
})

const withPrestigeLevel = (state, level) => ({
  ...state,
  prestige: { ...state.prestige, level },
})

// TIER_DEFINITIONS[0] ('Tens') both costs and produces Ones (money) — the
// entry-level generator. TIER_DEFINITIONS[1] ('Thousands') is the first
// tier that needs unlocking (10 Tens owned) and produces Tens.
const tensTier = TIER_DEFINITIONS[0]
const thousandsTier = TIER_DEFINITIONS[1]

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

  it('initialises all autobuyers as null (locked)', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.autobuyers[tier.id]).toBeNull()
    })
  })

  it('starts at prestige level 0 with 0 XP', () => {
    const { prestige } = createInitialGameState()
    expect(prestige.level).toBe(0)
    expect(prestige.xp).toBe(0)
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

// ─── formatCurrency ──────────────────────────────────────────────────────────

describe('formatCurrency', () => {
  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0')
  })

  it('formats a comma-grouped mid-size amount with a $ prefix, just below the exponential threshold', () => {
    expect(formatCurrency(999999)).toBe('$999,999')
  })

  it('switches to exponential notation at the threshold, like formatAmount', () => {
    expect(formatCurrency(1000000)).toBe('$1E6')
  })

  it('switches to exponential notation at huge magnitudes', () => {
    expect(formatCurrency(1e21)).toBe('$1E21')
  })

  it('treats negative values as 0', () => {
    expect(formatCurrency(-5)).toBe('$0')
  })

  it('floors fractional amounts instead of rounding, so it never overstates the balance', () => {
    expect(formatCurrency(1.6)).toBe('$1')
    expect(formatCurrency(1.999)).toBe('$1')
    expect(formatCurrency(2)).toBe('$2')
  })
})

// ─── getTierCost ─────────────────────────────────────────────────────────────

describe('getTierCost', () => {
  const tier = { baseCost: 10 }

  it('costs baseCost when 0 owned', () => {
    expect(getTierCost(tier, 0)).toBe(10)
  })

  it('stays flat within the first epoch (0 – 9)', () => {
    expect(getTierCost(tier, 1)).toBe(10)
    expect(getTierCost(tier, 9)).toBe(10)
  })

  it('scales 10x starting at owned = 10 (epoch 1), then stays flat within it', () => {
    // epoch=1 → 10 * 10 = 100, flat for owned 10-19
    expect(getTierCost(tier, 10)).toBe(100)
    expect(getTierCost(tier, 19)).toBe(100)
  })

  it('scales 10x again at owned = 20 (epoch 2)', () => {
    // epoch=2 → 10 * 100 = 1000
    expect(getTierCost(tier, 20)).toBe(1000)
  })

  it('treats negative owned as 0', () => {
    expect(getTierCost(tier, -1)).toBe(10)
  })
})

// ─── getTierBulkQuantity / getTierQuantityCost ────────────────────────────────

describe('getTierBulkQuantity', () => {
  const tier = { baseCost: 10 }

  it('returns the requested quantity when it fits entirely in the current block', () => {
    expect(getTierBulkQuantity(tier, 0, 10)).toBe(10)
    expect(getTierBulkQuantity(tier, 0, 1)).toBe(1)
  })

  it('caps at the units remaining in the current block', () => {
    expect(getTierBulkQuantity(tier, 5, 10)).toBe(5)
    expect(getTierBulkQuantity(tier, 9, 10)).toBe(1)
  })

  it('returns 0 when nothing was requested', () => {
    expect(getTierBulkQuantity(tier, 0, 0)).toBe(0)
  })
})

describe('getTierQuantityCost', () => {
  const tier = { baseCost: 10 }

  it('multiplies the flat per-unit cost by the capped bulk quantity', () => {
    expect(getTierQuantityCost(tier, 0, 10)).toBe(100)
    expect(getTierQuantityCost(tier, 5, 10)).toBe(50) // only 5 fit in the current block
    expect(getTierQuantityCost(tier, 10, 10)).toBe(1000) // next block, flat cost 100 × 10
  })
})

describe('getTierAffordableQuantity', () => {
  const tier = { baseCost: 10 }

  it('returns the full block-capped quantity when fully affordable', () => {
    expect(getTierAffordableQuantity(tier, 0, 1000, 10)).toBe(10)
  })

  it('caps at what can actually be afforded, partial-filling a bulk request', () => {
    // $35 at $10/unit affords 3, even though 10 were requested
    expect(getTierAffordableQuantity(tier, 0, 35, 10)).toBe(3)
  })

  it('returns 0 when nothing is affordable', () => {
    expect(getTierAffordableQuantity(tier, 0, 5, 10)).toBe(0)
  })

  it('never exceeds the block boundary even with unlimited funds', () => {
    expect(getTierAffordableQuantity(tier, 5, 1_000_000, 10)).toBe(5)
  })
})

// ─── getAutobuyerUnlockXPCost ─────────────────────────────────────────────────

describe('getAutobuyerUnlockXPCost', () => {
  it('costs 1 XP for layer 0', () => {
    expect(getAutobuyerUnlockXPCost(0)).toBe(1)
  })

  it('costs 2 XP for layer 1', () => {
    expect(getAutobuyerUnlockXPCost(1)).toBe(2)
  })

  it('costs 4 XP for layer 2', () => {
    expect(getAutobuyerUnlockXPCost(2)).toBe(4)
  })

  it('treats negative index as 0', () => {
    expect(getAutobuyerUnlockXPCost(-1)).toBe(1)
  })
})

// ─── getAutobuyerCost ────────────────────────────────────────────────────────

describe('getAutobuyerCost', () => {
  it('costs 10 resources for level 0 → 1 (first upgrade after unlock)', () => {
    expect(getAutobuyerCost(0)).toBe(10)
  })

  it('costs 100 resources for level 1 → 2', () => {
    expect(getAutobuyerCost(1)).toBe(100)
  })

  it('costs 1000 resources for level 2 → 3', () => {
    expect(getAutobuyerCost(2)).toBe(1000)
  })

  it('treats negative level as 0 (returns 10)', () => {
    expect(getAutobuyerCost(-1)).toBe(10)
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

// ─── getAutobuyerYieldMultiplier ────────────────────────────────────────

describe('getAutobuyerYieldMultiplier', () => {
  it('returns 1 (no-op) for an unlocked-but-idle autobuyer (level 0)', () => {
    expect(getAutobuyerYieldMultiplier(0)).toBe(1)
  })

  it('returns 1 for a locked autobuyer (null)', () => {
    expect(getAutobuyerYieldMultiplier(null)).toBe(1)
  })

  it('doubles per level', () => {
    expect(getAutobuyerYieldMultiplier(1)).toBe(2)
    expect(getAutobuyerYieldMultiplier(2)).toBe(4)
    expect(getAutobuyerYieldMultiplier(3)).toBe(8)
  })

  it('treats negative levels as 0', () => {
    expect(getAutobuyerYieldMultiplier(-1)).toBe(1)
  })
})

// ─── isTierUnlocked ──────────────────────────────────────────────────────────

describe('isTierUnlocked', () => {
  it('always unlocks tier 0', () => {
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

// ─── getMoneyExponent ──────────────────────────────────────────────────────────

describe('getMoneyExponent', () => {
  it('reads as 0 below 1', () => {
    expect(getMoneyExponent(0)).toBe(0)
    expect(getMoneyExponent(0.5)).toBe(0)
  })

  it('floors to the order of magnitude', () => {
    expect(getMoneyExponent(1)).toBe(0)
    expect(getMoneyExponent(9.999)).toBe(0)
    expect(getMoneyExponent(10)).toBe(1)
    expect(getMoneyExponent(999)).toBe(2)
    expect(getMoneyExponent(1000)).toBe(3)
  })

  it('reaches 100 at a Googol', () => {
    expect(getMoneyExponent(GOOGOL)).toBe(100)
  })

  it('treats negative and non-finite values as 0', () => {
    expect(getMoneyExponent(-5)).toBe(0)
    expect(getMoneyExponent(NaN)).toBe(0)
  })
})

// ─── getPrestigeProgressPercent ─────────────────────────────────────────────────

describe('getPrestigeProgressPercent', () => {
  it('is 0% below an exponent of 1', () => {
    expect(getPrestigeProgressPercent(0)).toBe(0)
    expect(getPrestigeProgressPercent(5)).toBe(0)
  })

  it('is 100% at a Googol', () => {
    expect(getPrestigeProgressPercent(GOOGOL)).toBe(100)
  })

  it('never exceeds 100% beyond a Googol', () => {
    expect(getPrestigeProgressPercent(GOOGOL * 1e10)).toBe(100)
  })

  it('scales linearly with the exponent (Googol is exponent 100)', () => {
    expect(getPrestigeProgressPercent(1e50)).toBe(50)
    expect(getPrestigeProgressPercent(1e25)).toBe(25)
  })
})

// ─── getTierSpendableAmount ──────────────────────────────────────────────────

describe('getTierSpendableAmount', () => {
  it('returns the balance of the tier\'s cost resource (Ones, for every tier)', () => {
    const state = withMoney(createInitialGameState(), 42)
    TIER_DEFINITIONS.forEach(tier => {
      expect(getTierSpendableAmount(state, tier)).toBe(42)
    })
  })
})

// ─── buyTier ─────────────────────────────────────────────────────────────────

describe('buyTier', () => {
  it('deducts cost and increments owned/purchased', () => {
    const state = createInitialGameState() // $10
    const after = buyTier(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(1)
    expect(after.purchased[tensTier.id]).toBe(1)
    expect(after.resources[MONEY_ID]).toBe(0)
  })

  it('returns the same state object when funds are insufficient', () => {
    const state = withMoney(createInitialGameState(), 5)
    expect(buyTier(tensTier.id)(state)).toBe(state)
  })

  it('returns the same state object for a locked tier', () => {
    const state = createInitialGameState()
    expect(buyTier(thousandsTier.id)(state)).toBe(state)
  })

  it('returns the same state object for an unknown tier ID', () => {
    const state = createInitialGameState()
    expect(buyTier('does_not_exist')(state)).toBe(state)
  })

  it('cost stays flat within a block of 10, then jumps 10x at the boundary', () => {
    const costAt0 = getTierCost(tensTier, 0)
    const costAt9 = getTierCost(tensTier, 9)
    const costAt10 = getTierCost(tensTier, 10)
    expect(costAt9).toBe(costAt0)
    expect(costAt10).toBe(costAt0 * 10)
  })

  it('can chain multiple purchases', () => {
    let state = withMoney(createInitialGameState(), 1000)
    state = buyTier(tensTier.id)(state)
    state = buyTier(tensTier.id)(state)
    expect(state.owned[tensTier.id]).toBe(2)
  })

  it('an unlocked higher tier is purchasable directly with Ones', () => {
    const cost = getTierCost(thousandsTier, 0)
    const state = withMoney(
      withOwned(createInitialGameState(), tensTier.id, 10),
      cost
    )
    const after = buyTier(thousandsTier.id)(state)
    expect(after.owned[thousandsTier.id]).toBe(1)
    expect(after.purchased[thousandsTier.id]).toBe(1)
    expect(after.resources[MONEY_ID]).toBe(0)
  })

  it('buying a higher tier does not touch the tier below\'s owned/resource count', () => {
    const cost = getTierCost(thousandsTier, 0)
    const state = withMoney(
      withOwned(createInitialGameState(), tensTier.id, 10),
      cost
    )
    const after = buyTier(thousandsTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(10)
  })

  it('does not buy an unlocked tier when funds are insufficient', () => {
    const state = withMoney(
      withOwned(createInitialGameState(), tensTier.id, 10),
      getTierCost(thousandsTier, 0) - 1
    )
    expect(buyTier(thousandsTier.id)(state)).toBe(state)
  })

  it('deducts the current flat cost on each consecutive purchase within a block', () => {
    let state = withMoney(createInitialGameState(), 1000)
    state = buyTier(tensTier.id)(state) // cost 10, purchased 0→1
    state = buyTier(tensTier.id)(state) // cost 10 (flat), purchased 1→2
    expect(state.owned[tensTier.id]).toBe(2)
    expect(state.purchased[tensTier.id]).toBe(2)
    expect(state.resources[MONEY_ID]).toBe(1000 - 10 - 10)
  })

  it('uses purchased count (not owned) for cost scaling', () => {
    const state = withMoney(
      withPurchased(
        withOwned(createInitialGameState(), tensTier.id, 50),
        tensTier.id,
        0
      ),
      10
    )

    expect(getTierPurchasedCount(state, tensTier.id)).toBe(0)
    expect(getTierCost(tensTier, getTierPurchasedCount(state, tensTier.id))).toBe(10)

    const after = buyTier(tensTier.id)(state)
    expect(after.resources[MONEY_ID]).toBe(0)
    expect(after.owned[tensTier.id]).toBe(51)
    expect(after.purchased[tensTier.id]).toBe(1)
  })
})

// ─── buyTierQuantity ─────────────────────────────────────────────────────────

describe('buyTierQuantity', () => {
  it('buys the full requested quantity when affordable and within the same block', () => {
    const state = withMoney(createInitialGameState(), 1000)
    const after = buyTierQuantity(tensTier.id, 10)(state)
    expect(after.owned[tensTier.id]).toBe(10)
    expect(after.purchased[tensTier.id]).toBe(10)
    expect(after.resources[MONEY_ID]).toBe(1000 - 10 * 10)
  })

  it('caps the purchase at the block boundary even with unlimited funds', () => {
    const state = withMoney(
      withPurchased(createInitialGameState(), tensTier.id, 5),
      1_000_000
    )
    const after = buyTierQuantity(tensTier.id, 10)(state)
    expect(after.purchased[tensTier.id]).toBe(10) // only 5 more fit in the block
  })

  it('stops early when funds run out partway through', () => {
    const state = withMoney(createInitialGameState(), 35) // affords 3 at cost 10 each
    const after = buyTierQuantity(tensTier.id, 10)(state)
    expect(after.purchased[tensTier.id]).toBe(3)
    expect(after.resources[MONEY_ID]).toBe(5)
  })

  it('returns the same state object for a locked tier', () => {
    const state = createInitialGameState()
    expect(buyTierQuantity(thousandsTier.id, 10)(state)).toBe(state)
  })

  it('returns the same state object for an unknown tier ID', () => {
    const state = createInitialGameState()
    expect(buyTierQuantity('does_not_exist', 10)(state)).toBe(state)
  })
})

// ─── buyTierQuantityWithYield ────────────────────────────────────────────────

describe('buyTierQuantityWithYield', () => {
  it('pays the normal cost but credits owned/resources with quantity × yieldMultiplier', () => {
    const state = withMoney(createInitialGameState(), 100)
    const after = buyTierQuantityWithYield(tensTier.id, 10, 2)(state)
    expect(after.purchased[tensTier.id]).toBe(10) // paid quantity, drives cost scaling
    expect(after.owned[tensTier.id]).toBe(20) // 10 × yieldMultiplier 2
    expect(after.resources[tensTier.id]).toBe(20)
    expect(after.resources[MONEY_ID]).toBe(0) // cost is unaffected by the yield bonus
  })

  it('a yieldMultiplier of 1 behaves like a plain purchase', () => {
    const state = withMoney(createInitialGameState(), 100)
    const after = buyTierQuantityWithYield(tensTier.id, 10, 1)(state)
    expect(after.owned[tensTier.id]).toBe(10)
    expect(after.purchased[tensTier.id]).toBe(10)
  })

  it('caps the paid quantity at what is affordable, then applies the yield bonus to that amount', () => {
    const state = withMoney(createInitialGameState(), 35) // affords 3 at cost 10 each
    const after = buyTierQuantityWithYield(tensTier.id, 10, 2)(state)
    expect(after.purchased[tensTier.id]).toBe(3)
    expect(after.owned[tensTier.id]).toBe(6) // 3 × yieldMultiplier 2
    expect(after.resources[MONEY_ID]).toBe(5)
  })

  it('returns the same state object when nothing is affordable', () => {
    const state = withMoney(createInitialGameState(), 0)
    expect(buyTierQuantityWithYield(tensTier.id, 10, 2)(state)).toBe(state)
  })

  it('returns the same state object for a locked tier', () => {
    const state = createInitialGameState()
    expect(buyTierQuantityWithYield(thousandsTier.id, 10, 2)(state)).toBe(state)
  })
})

// ─── tickGame ────────────────────────────────────────────────────────────────

describe('tickGame', () => {
  it('produces money from Tens generators over 1 second', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 5)
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
    const state = withOwned(createInitialGameState(), tensTier.id, 1)
    const after = tickGame(3)(state)
    expect(after.resources[MONEY_ID]).toBe(state.resources[MONEY_ID] + 3)
  })

  it('applies prestige multiplier to production', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 1)
    const boosted = withPrestigeLevel(base, 1) // ×2
    expect(tickGame(1)(boosted).resources[MONEY_ID]).toBe(
      base.resources[MONEY_ID] + 2
    )
  })

  it('Thousands generators produce Tens resource and owned generators', () => {
    const state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    const after = tickGame(1)(state)
    expect(after.resources[tensTier.id]).toBe(2)
    expect(after.owned[tensTier.id]).toBe(12) // 10 initial + 2 produced
  })

  it('awards XP when money crosses a power-of-10 milestone', () => {
    const state = {
      ...withOwned(createInitialGameState(), tensTier.id, 10),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 95 },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    const after = tickGame(1)(state) // +10 money → crosses 100
    expect(after.prestige.xp).toBeGreaterThan(0)
  })

  it('active autobuyer (level 1) pays for 1 generator but yields 2 via its level-1 bonus', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 100),
      tensTier.id
    )
    const after = tickGame(1)(state)
    // Pays for 1 unit ($10), but the level-1 autobuyer yield bonus (2^1) credits 2 owned.
    expect(after.owned[tensTier.id]).toBe(2)
    expect(after.purchased[tensTier.id]).toBe(1)
    expect(after.resources[MONEY_ID]).toBeLessThan(100)
  })

  it('autobuyer does not purchase when funds are insufficient', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 0),
      tensTier.id
    )
    const after = tickGame(1)(state)
    expect(after.owned[tensTier.id]).toBe(0)
  })

  it('with a batch size above 1, autobuyer holds until it can afford the entire block', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 65), // affords 6 at $10/unit, not the full block of 10
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.owned[tensTier.id]).toBe(0)
    expect(after.resources[MONEY_ID]).toBe(65)
  })

  it('with a batch size above 1, autobuyer buys the whole block at once once affordable', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 100),
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    // Pays for 10 units ($100 total), but the level-1 autobuyer yield bonus (2^1) credits 20 owned.
    expect(after.owned[tensTier.id]).toBe(20)
    expect(after.purchased[tensTier.id]).toBe(10)
    // Cost drains money to 0, but the same tick's production from the 20 newly-owned
    // generators (Tens produces its own cost resource) adds 20 back.
    expect(after.resources[MONEY_ID]).toBe(20)
  })

  it('caps an autobuyer batch purchase at the remaining units in the current cost block', () => {
    const state = withAutobuyer(
      withMoney(withPurchased(createInitialGameState(), tensTier.id, 7), 30), // only 3 units left in this block
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.purchased[tensTier.id]).toBe(10)
    // Pays for the 3 remaining units in the block, but the level-1 autobuyer yield bonus (2^1)
    // credits 6 owned.
    expect(after.owned[tensTier.id]).toBe(6)
    // 6 owned generators produce 6 money.
    expect(after.resources[MONEY_ID]).toBe(6)
  })

  it('when multiple autobuyers compete for the same money, the higher tier is bought first', () => {
    // $1,000 affords exactly one of: 1 Thousands ($1,000) or 1 Tens ($10) — not both.
    const state = withAutobuyer(
      withAutobuyer(
        withMoney(withOwned(createInitialGameState(), tensTier.id, 10), 1000),
        tensTier.id
      ),
      thousandsTier.id
    )
    const after = tickGame(1)(state)
    expect(after.purchased[thousandsTier.id]).toBe(1)
    expect(after.purchased[tensTier.id]).toBe(0)
  })
})

// ─── buyAutobuyer ────────────────────────────────────────────────────────────

describe('buyAutobuyer', () => {
  it('unlocks to level 0 (inactive) by spending XP (layer 0 costs 1 XP)', () => {
    const state = withXP(createInitialGameState(), 1)
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(0)
    expect(after.prestige.xp).toBe(0)
  })

  it('returns the same state when XP is insufficient for unlock', () => {
    const state = withXP(createInitialGameState(), 0)
    expect(buyAutobuyer(tensTier.id)(state)).toBe(state)
  })

  it('upgrades from level 0 to 1 and deducts 10 of the tier\'s own resource, keeping 1 generator', () => {
    const state = withResource(
      withAutobuyer(createInitialGameState(), tensTier.id, 0),
      tensTier.id,
      11
    )
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
    expect(after.resources[tensTier.id]).toBe(1)
  })

  it('upgrades from level 1 to 2 and deducts 100 of the tier\'s own resource, keeping 1 generator', () => {
    const state = withResource(
      withAutobuyer(createInitialGameState(), tensTier.id, 1),
      tensTier.id,
      101
    )
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(2)
    expect(after.resources[tensTier.id]).toBe(1)
  })

  it('refuses to upgrade when paying the cost would leave zero generators', () => {
    // Exactly enough to cover the cost, but that would drain resources/owned to 0 — since
    // those two move together, the tier would be left with no generators at all.
    const state = withResource(
      withAutobuyer(createInitialGameState(), tensTier.id, 0),
      tensTier.id,
      10
    )
    expect(buyAutobuyer(tensTier.id)(state)).toBe(state)
  })

  it('leaves owned in sync with resources after an upgrade that keeps 1 generator', () => {
    const state = withOwned(
      withResource(
        withAutobuyer(createInitialGameState(), tensTier.id, 0),
        tensTier.id,
        11
      ),
      tensTier.id,
      11
    )
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(1)
    expect(after.resources[tensTier.id]).toBe(1)
  })

  it('returns the same state for an unknown tier ID', () => {
    const state = withMoney(createInitialGameState(), 100)
    expect(buyAutobuyer('does_not_exist')(state)).toBe(state)
  })

  it('returns the same state for a locked tier even when XP is available', () => {
    const state = withXP(createInitialGameState(), 10)
    expect(buyAutobuyer(thousandsTier.id)(state)).toBe(state)
  })

  it('unlocks higher-layer autobuyer to level 0 (layer 1 costs 2 XP)', () => {
    const state = withXP(
      withOwned(createInitialGameState(), tensTier.id, 10),
      2
    )
    const after = buyAutobuyer(thousandsTier.id)(state)
    expect(after.autobuyers[thousandsTier.id]).toBe(0)
    expect(after.prestige.xp).toBe(0)
  })

  it('upgrades higher-layer autobuyer from 0 to 1 using the tier\'s own resource, keeping 1 generator', () => {
    const state = withResource(
      withAutobuyer(
        withOwned(createInitialGameState(), tensTier.id, 10),
        thousandsTier.id,
        0
      ),
      thousandsTier.id,
      11
    )
    const after = buyAutobuyer(thousandsTier.id)(state)
    expect(after.autobuyers[thousandsTier.id]).toBe(1)
    expect(after.resources[thousandsTier.id]).toBe(1)
  })
})

// ─── prestigeGame ────────────────────────────────────────────────────────────

describe('prestigeGame', () => {
  it('does nothing when money < GOOGOL', () => {
    // GOOGOL - 1 rounds back to GOOGOL at this magnitude (float precision), so use a value
    // that's meaningfully smaller instead of relying on an off-by-one difference.
    const state = withMoney(createInitialGameState(), GOOGOL / 10)
    expect(prestigeGame(state)).toBe(state)
  })

  it('does nothing when money is undefined or non-finite (corrupted save)', () => {
    const undefinedMoney = withMoney(createInitialGameState(), undefined)
    expect(prestigeGame(undefinedMoney)).toBe(undefinedMoney)

    const nanMoney = withMoney(createInitialGameState(), NaN)
    expect(prestigeGame(nanMoney)).toBe(nanMoney)
  })

  it('increments prestige level by 1', () => {
    const state = withMoney(createInitialGameState(), GOOGOL)
    const after = prestigeGame(state)
    expect(after.prestige.level).toBe(1)
  })

  it('leaves XP untouched', () => {
    const state = withXP(withMoney(createInitialGameState(), GOOGOL), 7)
    const after = prestigeGame(state)
    expect(after.prestige.xp).toBe(7)
  })

  it('resets money to starting amount', () => {
    const state = withMoney(createInitialGameState(), GOOGOL + 99999)
    const after = prestigeGame(state)
    expect(after.resources[MONEY_ID]).toBe(10)
  })

  it('resets all owned counts to 0', () => {
    const state = withOwned(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id, 50
    )
    const after = prestigeGame(state)
    TIER_DEFINITIONS.forEach(tier => {
      expect(after.owned[tier.id]).toBe(0)
    })
  })

  it('keeps unlocked autobuyers unlocked (level 0) on prestige', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id, 0
    )
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).toBe(0)
  })

  it('resets active autobuyer levels back to 0 on prestige', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id, 2
    )
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).toBe(0)
  })
})
