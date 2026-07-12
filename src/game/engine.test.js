import { describe, expect, it } from 'vitest'
import {
  buyAutobuyer,
  buyTier,
  createInitialGameState,
  formatAmount,
  getAutobuyerCost,
  getAutobuyerUnlockPPCost,
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

  it('scales 10x starting at owned = 10 (epoch 1)', () => {
    // epoch=1, within=0 → 10 * 10 * 1.0 = 100
    expect(getTierCost(tier, 10)).toBeCloseTo(100)
    // epoch=1, within=9 → 10 * 10 * 1.9 = 190
    expect(getTierCost(tier, 19)).toBeCloseTo(190)
  })

  it('scales 10x again at owned = 20 (epoch 2)', () => {
    // epoch=2, within=0 → 10 * 100 * 1.0 = 1000
    expect(getTierCost(tier, 20)).toBeCloseTo(1000)
  })

  it('treats negative owned as 0', () => {
    expect(getTierCost(tier, -1)).toBe(10)
  })
})

// ─── getAutobuyerUnlockPPCost ─────────────────────────────────────────────────

describe('getAutobuyerUnlockPPCost', () => {
  it('costs 1 PP for layer 0', () => {
    expect(getAutobuyerUnlockPPCost(0)).toBe(1)
  })

  it('costs 2 PP for layer 1', () => {
    expect(getAutobuyerUnlockPPCost(1)).toBe(2)
  })

  it('costs 4 PP for layer 2', () => {
    expect(getAutobuyerUnlockPPCost(2)).toBe(4)
  })

  it('treats negative index as 0', () => {
    expect(getAutobuyerUnlockPPCost(-1)).toBe(1)
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

  it('cost increases after each purchase', () => {
    const costAt0 = getTierCost(tensTier, 0)
    const costAt1 = getTierCost(tensTier, 1)
    expect(costAt1).toBeGreaterThan(costAt0)
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

  it('deducts the current scaled cost on each consecutive purchase', () => {
    let state = withMoney(createInitialGameState(), 1000)
    state = buyTier(tensTier.id)(state) // cost 10, purchased 0→1
    state = buyTier(tensTier.id)(state) // cost 11, purchased 1→2
    expect(state.owned[tensTier.id]).toBe(2)
    expect(state.purchased[tensTier.id]).toBe(2)
    expect(state.resources[MONEY_ID]).toBe(1000 - 10 - 11)
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

  it('awards a PP when money crosses a power-of-10 milestone', () => {
    const state = {
      ...withOwned(createInitialGameState(), tensTier.id, 10),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 95 },
      prestige: { pp: 0, level: 0, highestMilestone: 1 },
    }
    const after = tickGame(1)(state) // +10 money → crosses 100
    expect(after.prestige.pp).toBeGreaterThan(0)
  })

  it('active autobuyer (level 1) purchases 1 generator per tick', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 100),
      tensTier.id
    )
    const after = tickGame(1)(state)
    expect(after.owned[tensTier.id]).toBe(1)
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
})

// ─── buyAutobuyer ────────────────────────────────────────────────────────────

describe('buyAutobuyer', () => {
  it('unlocks to level 0 (inactive) by spending PP (layer 0 costs 1 PP)', () => {
    const state = withPP(createInitialGameState(), 1)
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(0)
    expect(after.prestige.pp).toBe(0)
  })

  it('returns the same state when PP is insufficient for unlock', () => {
    const state = withPP(createInitialGameState(), 0)
    expect(buyAutobuyer(tensTier.id)(state)).toBe(state)
  })

  it('upgrades from level 0 to 1 and deducts 10 of the tier\'s own resource', () => {
    const state = withResource(
      withAutobuyer(createInitialGameState(), tensTier.id, 0),
      tensTier.id,
      10
    )
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
    expect(after.resources[tensTier.id]).toBe(0)
  })

  it('upgrades from level 1 to 2 and deducts 100 of the tier\'s own resource', () => {
    const state = withResource(
      withAutobuyer(createInitialGameState(), tensTier.id, 1),
      tensTier.id,
      100
    )
    const after = buyAutobuyer(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(2)
    expect(after.resources[tensTier.id]).toBe(0)
  })

  it('returns the same state for an unknown tier ID', () => {
    const state = withMoney(createInitialGameState(), 100)
    expect(buyAutobuyer('does_not_exist')(state)).toBe(state)
  })

  it('returns the same state for a locked tier even when PP is available', () => {
    const state = withPP(createInitialGameState(), 10)
    expect(buyAutobuyer(thousandsTier.id)(state)).toBe(state)
  })

  it('unlocks higher-layer autobuyer to level 0 (layer 1 costs 2 PP)', () => {
    const state = withPP(
      withOwned(createInitialGameState(), tensTier.id, 10),
      2
    )
    const after = buyAutobuyer(thousandsTier.id)(state)
    expect(after.autobuyers[thousandsTier.id]).toBe(0)
    expect(after.prestige.pp).toBe(0)
  })

  it('upgrades higher-layer autobuyer from 0 to 1 using the tier\'s own resource', () => {
    const state = withResource(
      withAutobuyer(
        withOwned(createInitialGameState(), tensTier.id, 10),
        thousandsTier.id,
        0
      ),
      thousandsTier.id,
      10
    )
    const after = buyAutobuyer(thousandsTier.id)(state)
    expect(after.autobuyers[thousandsTier.id]).toBe(1)
    expect(after.resources[thousandsTier.id]).toBe(0)
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
      withOwned(createInitialGameState(), tensTier.id, 50),
      PRESTIGE_PP_COST
    )
    const after = prestigeGame(state)
    TIER_DEFINITIONS.forEach(tier => {
      expect(after.owned[tier.id]).toBe(0)
    })
  })

  it('keeps unlocked autobuyers unlocked (level 0) on prestige', () => {
    const state = withPP(
      withAutobuyer(createInitialGameState(), tensTier.id, 0),
      PRESTIGE_PP_COST
    )
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).toBe(0)
  })

  it('resets active autobuyer levels back to 0 on prestige', () => {
    const state = withPP(
      withAutobuyer(createInitialGameState(), tensTier.id, 2),
      PRESTIGE_PP_COST
    )
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).toBe(0)
  })
})
