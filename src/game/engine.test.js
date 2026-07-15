import { describe, expect, it } from 'vitest'
import {
  applyOfflineProgress,
  buyAutobuyer,
  buyTier,
  buyTierQuantity,
  createInitialGameState,
  formatAmount,
  formatCurrency,
  formatOfflineDuration,
  getAutobuyerAttemptRate,
  getAutobuyerCost,
  getMoneyExponent,
  getOfflineEffectiveSeconds,
  getPrestigeProgressPercent,
  getPurchaseMilestoneMultiplier,
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
import { GOOGOL, MAX_OFFLINE_SECONDS, MONEY_ID, TIER_DEFINITIONS } from './layers'

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

  it('initialises all autobuyer attempt budgets to 0', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.autobuyerAttemptBudgets[tier.id]).toBe(0)
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

// ─── getAutobuyerCost ────────────────────────────────────────────────────────

describe('getAutobuyerCost', () => {
  it('costs 1000 resources for level 0 → 1 (activation, no autobuyer yet)', () => {
    expect(getAutobuyerCost(0)).toBe(1000)
  })

  it('costs 1,000,000 resources for level 1 → 2', () => {
    expect(getAutobuyerCost(1)).toBe(1_000_000)
  })

  it('costs 1,000,000,000 resources for level 2 → 3', () => {
    expect(getAutobuyerCost(2)).toBe(1_000_000_000)
  })

  it('treats negative level as 0 (returns 1000)', () => {
    expect(getAutobuyerCost(-1)).toBe(1000)
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

// ─── getAutobuyerProductionMultiplier ────────────────────────────────────────

describe('getPurchaseMilestoneMultiplier', () => {
  it('returns 1 within the first block of 10 purchases', () => {
    expect(getPurchaseMilestoneMultiplier(0)).toBe(1)
    expect(getPurchaseMilestoneMultiplier(9)).toBe(1)
  })

  it('doubles at each block-of-10 boundary, same as the cost epoch', () => {
    expect(getPurchaseMilestoneMultiplier(10)).toBe(2)
    expect(getPurchaseMilestoneMultiplier(19)).toBe(2)
    expect(getPurchaseMilestoneMultiplier(20)).toBe(4)
    expect(getPurchaseMilestoneMultiplier(30)).toBe(8)
  })

  it('treats negative purchased counts as 0', () => {
    expect(getPurchaseMilestoneMultiplier(-1)).toBe(1)
  })
})

describe('getAutobuyerAttemptRate', () => {
  it('returns 1 (baseline) for a freshly-activated autobuyer (level 1)', () => {
    expect(getAutobuyerAttemptRate(1)).toBe(1)
  })

  it('returns 1 for a not-yet-activated autobuyer (null)', () => {
    expect(getAutobuyerAttemptRate(null)).toBe(1)
  })

  it('compounds by 10% per level above 1', () => {
    expect(getAutobuyerAttemptRate(2)).toBeCloseTo(1.1)
    expect(getAutobuyerAttemptRate(3)).toBeCloseTo(1.21)
    expect(getAutobuyerAttemptRate(4)).toBeCloseTo(1.331)
  })

  it('treats levels at or below 1 as the baseline rate', () => {
    expect(getAutobuyerAttemptRate(0)).toBe(1)
    expect(getAutobuyerAttemptRate(-1)).toBe(1)
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

  it('an unlocked-but-not-upgraded autobuyer (level 0) already buys 1 generator per tick', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 100),
      tensTier.id,
      0
    )
    const after = tickGame(1)(state)
    // Level 0 = 1 purchase attempt per tick (rate 1.0) — unlocking alone already enables
    // purchasing, with no Upgrade needed.
    expect(after.owned[tensTier.id]).toBe(1)
    expect(after.purchased[tensTier.id]).toBe(1)
    // Production depends only on purchased milestones now (see getPurchaseMilestoneMultiplier),
    // not on autobuyer level: 100 - 10 (cost) + 1 × 1sec × 1 (still under 10 purchases) = 91.
    expect(after.resources[MONEY_ID]).toBe(91)
  })

  it('a level-1 autobuyer\'s single-tick purchase count matches level 0 exactly — the 10% speed-up only shows up over many ticks', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 100),
      tensTier.id,
      1
    )
    const after = tickGame(1)(state)
    // Level 1's 1.1x attempt rate only fires 1 purchase in a single tick, same as level 0 — the
    // fractional 0.1 remainder carries into future ticks rather than buying twice immediately.
    expect(after.owned[tensTier.id]).toBe(1)
    expect(after.purchased[tensTier.id]).toBe(1)
    expect(after.resources[MONEY_ID]).toBe(91)
  })

  it('a level-2 autobuyer buys 10% more often than level 1 (the baseline) over many ticks', () => {
    const runTicks = (level, ticks) => {
      let result = withAutobuyer(withMoney(createInitialGameState(), 10000), tensTier.id, level)
      for (let i = 0; i < ticks; i++) result = tickGame(1)(result)
      return result
    }
    // Level 1 (baseline, rate 1.0) fires exactly 1 attempt/tick → 10 purchases over 10 ticks.
    expect(runTicks(1, 10).purchased[tensTier.id]).toBe(10)
    // Level 2 fires at rate 1.1/tick — the fractional remainder accumulates across ticks and
    // fires an 11th purchase within the same 10 ticks.
    expect(runTicks(2, 10).purchased[tensTier.id]).toBe(11)
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
    // Pays for 10 units ($100 total) at the normal rate — no purchase-yield bonus.
    expect(after.owned[tensTier.id]).toBe(10)
    expect(after.purchased[tensTier.id]).toBe(10)
    // Cost drains money to 0, but the same tick's production from the 10 owned generators
    // (Tens produces its own cost resource) is doubled by the purchase-milestone multiplier —
    // purchased just crossed from 0-9 into the 10-19 block (see getPurchaseMilestoneMultiplier)
    // — adding 10 × 2 = 20 back.
    expect(after.resources[MONEY_ID]).toBe(20)
  })

  it('caps an autobuyer batch purchase at the remaining units in the current cost block', () => {
    const state = withAutobuyer(
      withMoney(withPurchased(createInitialGameState(), tensTier.id, 7), 30), // only 3 units left in this block
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.purchased[tensTier.id]).toBe(10)
    // Pays for the 3 remaining units in the block at the normal rate — no purchase-yield bonus.
    expect(after.owned[tensTier.id]).toBe(3)
    // 3 owned generators produce 3 money each, doubled by the purchase-milestone multiplier —
    // purchased just crossed into the 10-19 block: 3 × 1sec × 2 = 6 money.
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

// ─── getOfflineEffectiveSeconds ──────────────────────────────────────────────

describe('getOfflineEffectiveSeconds', () => {
  it('scales elapsed real seconds down to 10%', () => {
    expect(getOfflineEffectiveSeconds(100)).toBe(10)
  })

  it('floors a fractional result', () => {
    expect(getOfflineEffectiveSeconds(15)).toBe(1) // 1.5 → 1
  })

  it('caps real elapsed time at MAX_OFFLINE_SECONDS before scaling', () => {
    expect(getOfflineEffectiveSeconds(MAX_OFFLINE_SECONDS * 10)).toBe(
      Math.floor(MAX_OFFLINE_SECONDS * 0.1)
    )
  })

  it('treats negative input as 0', () => {
    expect(getOfflineEffectiveSeconds(-50)).toBe(0)
  })
})

// ─── applyOfflineProgress ─────────────────────────────────────────────────────

describe('applyOfflineProgress', () => {
  it('produces resources for 10% of the elapsed real time', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 5)
    const after = applyOfflineProgress(100)(state) // 100s real → 10 simulated seconds
    // 5 generators × 10 simulated seconds = +50 money
    expect(after.resources[MONEY_ID]).toBe(state.resources[MONEY_ID] + 50)
  })

  it('is a no-op for a gap too short to register a single simulated second', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 5)
    const after = applyOfflineProgress(5)(state) // 0.5 simulated seconds → floors to 0
    expect(after).toBe(state)
  })

  it('runs an active autobuyer across each simulated second, not just once', () => {
    const state = withAutobuyer(withMoney(createInitialGameState(), 1000), tensTier.id, 2)
    const after = applyOfflineProgress(100)(state) // 10 simulated seconds/ticks
    // A level-2 autobuyer's 1.1x attempt rate accumulates a fractional budget across ticks
    // (see tickGame) — over 10 simulated ticks that's 9 ticks firing 1 purchase each plus a
    // 10th tick whose carried-over remainder fires 2, for 11 total — capped by real funds/time
    // rather than bought in one lump sum.
    expect(after.purchased[tensTier.id]).toBe(11)
  })
})

// ─── formatOfflineDuration ────────────────────────────────────────────────────

describe('formatOfflineDuration', () => {
  it('formats seconds-only durations', () => {
    expect(formatOfflineDuration(45)).toBe('45s')
  })

  it('formats minutes and seconds', () => {
    expect(formatOfflineDuration(90)).toBe('1m 30s')
  })

  it('formats hours and minutes, omitting seconds', () => {
    expect(formatOfflineDuration(3725)).toBe('1h 2m')
  })

  it('clamps negative input to 0s', () => {
    expect(formatOfflineDuration(-10)).toBe('0s')
  })
})

// ─── buyAutobuyer ────────────────────────────────────────────────────────────

describe('buyAutobuyer', () => {
  it('activates a not-yet-active autobuyer (null → 1) by spending 1000 of the tier\'s own resource, keeping 1 generator', () => {
    const state = withResource(createInitialGameState(), tensTier.id, 1001)
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
    expect(after.resources[tensTier.id]).toBe(1)
  })

  it('returns the same state when the tier\'s own resource is insufficient to activate', () => {
    const state = withResource(createInitialGameState(), tensTier.id, 500)
    expect(buyAutobuyer(tensTier.id)(state)).toBe(state)
  })

  it('upgrades from level 1 to 2 and deducts 1,000,000 of the tier\'s own resource, keeping 1 generator', () => {
    const state = withResource(
      withAutobuyer(createInitialGameState(), tensTier.id, 1),
      tensTier.id,
      1_000_001
    )
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(2)
    expect(after.resources[tensTier.id]).toBe(1)
  })

  it('upgrades from level 2 to 3 and deducts 1,000,000,000 of the tier\'s own resource, keeping 1 generator', () => {
    const state = withResource(
      withAutobuyer(createInitialGameState(), tensTier.id, 2),
      tensTier.id,
      1_000_000_001
    )
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(3)
    expect(after.resources[tensTier.id]).toBe(1)
  })

  it('refuses to activate when paying the cost would leave zero generators', () => {
    // Exactly enough to cover the cost, but that would drain resources/owned to 0 — since
    // those two move together, the tier would be left with no generators at all.
    const state = withResource(createInitialGameState(), tensTier.id, 1000)
    expect(buyAutobuyer(tensTier.id)(state)).toBe(state)
  })

  it('leaves owned in sync with resources after activating (keeps 1 generator)', () => {
    const state = withOwned(
      withResource(createInitialGameState(), tensTier.id, 1001),
      tensTier.id,
      1001
    )
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(1)
    expect(after.resources[tensTier.id]).toBe(1)
  })

  it('returns the same state for an unknown tier ID', () => {
    const state = withMoney(createInitialGameState(), 100)
    expect(buyAutobuyer('does_not_exist')(state)).toBe(state)
  })

  it('returns the same state for a locked tier even with plenty of its own resource', () => {
    const state = withResource(createInitialGameState(), thousandsTier.id, 10_000)
    expect(buyAutobuyer(thousandsTier.id)(state)).toBe(state)
  })

  it('activates a higher-layer autobuyer using the tier\'s own resource, keeping 1 generator', () => {
    const state = withResource(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id,
      1001
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

  it('keeps an active autobuyer active at the baseline level (1) on prestige', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id, 1
    )
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
  })

  it('resets upgraded autobuyer levels back to the baseline (1) on prestige', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id, 3
    )
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
  })

  it('leaves a not-yet-active autobuyer locked (null) on prestige', () => {
    const state = withMoney(createInitialGameState(), GOOGOL)
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).toBeNull()
  })
})
