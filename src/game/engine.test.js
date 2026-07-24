import { describe, expect, it } from 'vitest'
import {
  applyOfflineProgress,
  buyAutobuyerUnlock,
  buyAutoPrestige,
  buyAutoSpeedUp,
  buyGlobalTickspeedMultiplier,
  buyPrestigeSpeedBonus,
  buySmartAutobuyer,
  buyTierTickspeedAutobuyer,
  buyTickspeedAutobuyer,
  buyTickspeedMultiplier,
  buyTier,
  buyTierQuantity,
  consumeXpForLastTierTickspeed,
  createInitialGameState,
  formatAmount,
  formatCurrency,
  formatOfflineDuration,
  getAutobuyerUnlockCost,
  getAutoPrestigeAttemptRate,
  getAutoPrestigeCost,
  getCostEpochExponent,
  getEffectiveTierTickSpeedSeconds,
  getGlobalTickspeedMultiplierCost,
  getGlobalTickspeedProductionMultiplier,
  getLastTierXpTickspeedMinConsumption,
  getLastTierXpTickspeedMultiplier,
  getMoneyExponent,
  getOfflineEffectiveSeconds,
  getPrestigePointsAwarded,
  getPrestigeProductionMultiplier,
  getPrestigeProgressPercent,
  getPurchaseMilestoneMultiplier,
  getSmartAutobuyerCost,
  getTierTickspeedAutobuyerCost,
  getSpeedUpMultiplier,
  getSpeedUpRequirement,
  getTickspeedMultiplierBaseCost,
  getTickspeedMultiplierCost,
  getTickspeedProductionMultiplier,
  getTierAffordableQuantity,
  getTierBulkQuantity,
  getTierCost,
  getTierProductionProgressPercent,
  getTierPurchasedCount,
  getTierQuantityCost,
  getTierSpendableAmount,
  isGlobalTickspeedMultiplierUnlocked,
  isLastTierTickspeedXpUnlocked,
  isProductionFrozen,
  isTierUnlocked,
  prestigeGame,
  speedUpGame,
  tickGame,
} from './engine'
import { AUTO_SPEED_UP_COST, getTierBaseTickSpeedSeconds, GOOGOL, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR, MAX_OFFLINE_SECONDS, MONEY_ID, PRESTIGE_SPEED_BONUS_UNLOCK_COST, TICKSPEED_AUTOBUYER_COST, TIER_DEFINITIONS } from './layers'

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

const withTickspeedLevel = (state, tierId, level) => ({
  ...state,
  tickspeedLevels: { ...state.tickspeedLevels, [tierId]: level },
})

const withPrestigePoints = (state, points) => ({
  ...state,
  prestige: { ...state.prestige, points },
})

const withSmartAutobuyer = (state, tierId, smart = true) => ({
  ...state,
  smartAutobuyer: { ...state.smartAutobuyer, [tierId]: smart },
})

const withTierTickspeedAutobuyer = (state, tierId, active = true) => ({
  ...state,
  tierTickspeedAutobuyer: { ...state.tierTickspeedAutobuyer, [tierId]: active },
})

const withAutoPrestige = (state, level = 1) => ({
  ...state,
  autoPrestige: level,
})

const withAutoPrestigeBudget = (state, budget) => ({
  ...state,
  autoPrestigeAttemptBudget: budget,
})

const withGlobalTickspeedMultiplier = (state, level = 1) => ({
  ...state,
  globalTickspeedMultiplier: level,
})

const withPrestigeSpeedBonusUnlocked = (state, unlocked = true) => ({
  ...state,
  prestigeSpeedBonusUnlocked: unlocked,
})

const withSpeedUpCount = (state, count) => ({
  ...state,
  speedUpCount: count,
})

const withAutoSpeedUp = (state, active = true) => ({
  ...state,
  autoSpeedUp: active,
})

const withAutoGlobalTickspeed = (state, active = true) => ({
  ...state,
  autoGlobalTickspeed: active,
})

// isLastTierTickspeedXpUnlocked is a live check against the last tier's current owned count (see
// engine.js) — this helper ensures that's satisfied by raising owned to at least 10 if it isn't
// already there, without clobbering a test's own higher value for it.
const withLastTierTickspeedXpUnlocked = (state, unlocked = true) => ({
  ...state,
  owned: {
    ...state.owned,
    [lastTier.id]: unlocked ? Math.max(state.owned[lastTier.id] ?? 0, 10) : state.owned[lastTier.id],
  },
})

const withLastTierXpConsumed = (state, amount) => ({
  ...state,
  lastTierXpConsumed: amount,
})

const withEverUnlockedTierIds = (state, tierId, unlocked = true) => ({
  ...state,
  everUnlockedTierIds: { ...state.everUnlockedTierIds, [tierId]: unlocked },
})

// TIER_DEFINITIONS[0] ('Bytes') both costs and produces Ones (money) — the
// entry-level generator. TIER_DEFINITIONS[1] ('Kilobytes') is the first
// tier that needs unlocking (10 Bytes owned) and produces Bytes.
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

  it('initialises every tier\'s tickspeed level at the baseline (1), independent of autobuyer unlock', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.tickspeedLevels[tier.id]).toBe(1)
    })
  })

  it('initialises all autobuyer attempt budgets to 0', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.autobuyerAttemptBudgets[tier.id]).toBe(0)
    })
  })

  it('initialises all tier production accumulators to 0', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.tierProductionAccumulators[tier.id]).toBe(0)
    })
  })

  it('starts at prestige count 0 with 0 points and 0 XP', () => {
    const { prestige } = createInitialGameState()
    expect(prestige.count).toBe(0)
    expect(prestige.points).toBe(0)
    expect(prestige.xp).toBe(0)
  })

  it('initialises all tiers with smartAutobuyer = false', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.smartAutobuyer[tier.id]).toBe(false)
    })
  })

  it('initialises prestigeSpeedBonusUnlocked as false', () => {
    const state = createInitialGameState()
    expect(state.prestigeSpeedBonusUnlocked).toBe(false)
  })

  it('initialises autoPrestige to null (not yet bought) and its attempt budget to 0', () => {
    const state = createInitialGameState()
    expect(state.autoPrestige).toBeNull()
    expect(state.autoPrestigeAttemptBudget).toBe(0)
  })

  it('initialises speedUpCount to 0', () => {
    const state = createInitialGameState()
    expect(state.speedUpCount).toBe(0)
  })

  it('initialises autoSpeedUp to false', () => {
    const state = createInitialGameState()
    expect(state.autoSpeedUp).toBe(false)
  })

  it('initialises with the last tier\'s XP tickspeed mechanic disengaged and lastTierXpConsumed at 0', () => {
    const state = createInitialGameState()
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(false)
    expect(state.lastTierXpConsumed).toBe(0)
  })

  it('initialises everUnlockedTierIds with only the first tier true', () => {
    const state = createInitialGameState()
    expect(state.everUnlockedTierIds[TIER_DEFINITIONS[0].id]).toBe(true)
    TIER_DEFINITIONS.slice(1).forEach(tier => {
      expect(state.everUnlockedTierIds[tier.id]).toBe(false)
    })
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
    expect(formatCurrency(1000000)).toBe('$1e6')
  })

  it('switches to exponential notation at huge magnitudes', () => {
    expect(formatCurrency(1e21)).toBe('$1e21')
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

// ─── getCostEpochExponent ────────────────────────────────────────────────────

describe('getCostEpochExponent', () => {
  it('follows the Fibonacci sequence 1, 2, 3, 5, 8, 13 across epochs 0-5', () => {
    expect(getCostEpochExponent(0)).toBe(1)
    expect(getCostEpochExponent(1)).toBe(2)
    expect(getCostEpochExponent(2)).toBe(3)
    expect(getCostEpochExponent(3)).toBe(5)
    expect(getCostEpochExponent(4)).toBe(8)
    expect(getCostEpochExponent(5)).toBe(13)
  })

  it('clamps a negative epoch to 0', () => {
    expect(getCostEpochExponent(-1)).toBe(1)
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

  it('jumps to baseCost * 10^1 at owned = 10 (epoch 1), then stays flat within it', () => {
    // epoch=1 → fib 2 → baseCost * 10^(2-1) = 10 * 10 = 100, flat for owned 10-19
    expect(getTierCost(tier, 10)).toBe(100)
    expect(getTierCost(tier, 19)).toBe(100)
  })

  it('jumps to baseCost * 10^2 at owned = 20 (epoch 2)', () => {
    // epoch=2 → fib 3 → 10 * 10^(3-1) = 1000
    expect(getTierCost(tier, 20)).toBe(1000)
  })

  it('skips to baseCost * 10^4 at owned = 30 (epoch 3, first Fibonacci divergence)', () => {
    // epoch=3 → fib 5 (not 4) → 10 * 10^(5-1) = 1e5, flat for owned 30-39
    expect(getTierCost(tier, 30)).toBe(1e5)
    expect(getTierCost(tier, 39)).toBe(1e5)
  })

  it('reaches baseCost * 10^7 at owned = 40 (epoch 4)', () => {
    // epoch=4 → fib 8 → 10 * 10^(8-1) = 1e8
    expect(getTierCost(tier, 40)).toBe(1e8)
  })

  it('scales a larger baseCost by the same Fibonacci-driven multiplier, not a compounded power', () => {
    const thousands = { baseCost: 1e3 }
    expect(getTierCost(thousands, 0)).toBe(1e3)
    expect(getTierCost(thousands, 10)).toBe(1e4)
    expect(getTierCost(thousands, 20)).toBe(1e5)
    expect(getTierCost(thousands, 30)).toBe(1e7)
    expect(getTierCost(thousands, 40)).toBe(1e10)
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

describe('getTickspeedMultiplierBaseCost', () => {
  it('is 10^10 for the first tier (index 0)', () => {
    expect(getTickspeedMultiplierBaseCost(0)).toBe(10 ** 10)
  })

  it('decreases by a power of ten per subsequent tier', () => {
    expect(getTickspeedMultiplierBaseCost(1)).toBe(10 ** 9)
    expect(getTickspeedMultiplierBaseCost(2)).toBe(10 ** 8)
  })

  it('is 10^1 for the 10th/last tier (index 9)', () => {
    expect(getTickspeedMultiplierBaseCost(9)).toBe(10)
  })

  it('clamps an out-of-range index into the valid range', () => {
    expect(getTickspeedMultiplierBaseCost(-1)).toBe(10 ** 10)
    expect(getTickspeedMultiplierBaseCost(99)).toBe(10)
  })
})

describe('getTickspeedMultiplierCost', () => {
  it('costs nothing (base^0 = 1) for level 1 — the free baseline every tier already starts at', () => {
    expect(getTickspeedMultiplierCost(tensTier.id, 1)).toBe(1)
    expect(getTickspeedMultiplierCost(thousandsTier.id, 1)).toBe(1)
  })

  it('costs exactly the tier base for the first real purchase (level 1 → 2)', () => {
    expect(getTickspeedMultiplierCost(tensTier.id, 2)).toBe(10 ** 10)
    expect(getTickspeedMultiplierCost(thousandsTier.id, 2)).toBe(10 ** 9)
  })

  it('raises the tier base to (targetLevel - 1) for later levels', () => {
    expect(getTickspeedMultiplierCost(thousandsTier.id, 4)).toBe((10 ** 9) ** 3)
  })

  it('treats an unrecognized tier id as index 0 (the priciest base)', () => {
    expect(getTickspeedMultiplierCost('does_not_exist', 2)).toBe(10 ** 10)
  })
})

describe('getAutobuyerUnlockCost', () => {
  it('costs 1 PP for the first tier, independent of the (much steeper) tickspeed multiplier ladder', () => {
    expect(getAutobuyerUnlockCost(tensTier.id)).toBe(1)
  })

  it('increases by 1 PP per subsequent tier, up to 10 PP for the 10th/last tier', () => {
    expect(getAutobuyerUnlockCost(thousandsTier.id)).toBe(2)
    expect(getAutobuyerUnlockCost(TIER_DEFINITIONS[9].id)).toBe(10)
  })

  it('treats an unrecognized tier id as index 0 (the cheapest tier)', () => {
    expect(getAutobuyerUnlockCost('does_not_exist')).toBe(1)
  })
})

describe('getTickspeedProductionMultiplier', () => {
  it('is 1 (no bonus) at level 1 (just unlocked)', () => {
    expect(getTickspeedProductionMultiplier(1)).toBe(1)
  })

  it('treats a locked (null) tier as level 1, no bonus', () => {
    expect(getTickspeedProductionMultiplier(null)).toBe(1)
  })

  it('compounds by 10% per level above 1', () => {
    expect(getTickspeedProductionMultiplier(2)).toBeCloseTo(1.1)
    expect(getTickspeedProductionMultiplier(3)).toBeCloseTo(1.21)
    expect(getTickspeedProductionMultiplier(4)).toBeCloseTo(1.331)
  })
})

// ─── getGlobalTickspeedMultiplierCost / getGlobalTickspeedProductionMultiplier ──

describe('getGlobalTickspeedMultiplierCost', () => {
  it('costs 10 Money to activate (level 0 → 1)', () => {
    expect(getGlobalTickspeedMultiplierCost(0)).toBe(10)
  })

  it('costs another power of ten per level after that', () => {
    expect(getGlobalTickspeedMultiplierCost(1)).toBe(100)
    expect(getGlobalTickspeedMultiplierCost(2)).toBe(1000)
  })

  it('treats a negative level as 0', () => {
    expect(getGlobalTickspeedMultiplierCost(-1)).toBe(10)
  })
})

describe('getGlobalTickspeedProductionMultiplier', () => {
  it('is 1 (no bonus) at level 0 / not yet bought', () => {
    expect(getGlobalTickspeedProductionMultiplier(0)).toBe(1)
    expect(getGlobalTickspeedProductionMultiplier(null)).toBe(1)
  })

  it('compounds the regular 1% step below the first milestone, same as before milestones existed', () => {
    expect(getGlobalTickspeedProductionMultiplier(1)).toBeCloseTo(1.01)
    expect(getGlobalTickspeedProductionMultiplier(9)).toBeCloseTo(1.01 ** 9)
  })

  it('compounds the milestone 10% step instead of the regular 1% step at the first milestone (level 10)', () => {
    // 9 regular levels (1-9) at 1% each, then level 10 (the milestone) at 10% instead of 1%.
    expect(getGlobalTickspeedProductionMultiplier(10)).toBeCloseTo(1.01 ** 9 * 1.10)
  })

  it('resumes the regular 1% step after a milestone, on top of what came before', () => {
    // Levels 11-15 are regular (1% each), on top of the level-10 milestone.
    expect(getGlobalTickspeedProductionMultiplier(15)).toBeCloseTo(1.01 ** 9 * 1.10 * 1.01 ** 5)
  })

  it('compounds a second milestone step at the next 10-spaced milestone (level 20)', () => {
    expect(getGlobalTickspeedProductionMultiplier(20)).toBeCloseTo(1.01 ** 18 * 1.10 ** 2)
  })

  it('compounds 10 milestone steps and 90 regular steps by level 100', () => {
    expect(getGlobalTickspeedProductionMultiplier(100)).toBeCloseTo(1.01 ** 90 * 1.10 ** 10)
  })

  it('milestone spacing widens to every 100 levels beyond level 100 — no new milestone until level 200', () => {
    expect(getGlobalTickspeedProductionMultiplier(101)).toBeCloseTo(1.01 ** 91 * 1.10 ** 10)
    expect(getGlobalTickspeedProductionMultiplier(199)).toBeCloseTo(1.01 ** 189 * 1.10 ** 10)
    expect(getGlobalTickspeedProductionMultiplier(200)).toBeCloseTo(1.01 ** 189 * 1.10 ** 11)
  })

  it('compounds 19 milestone steps and 981 regular steps by level 1000', () => {
    expect(getGlobalTickspeedProductionMultiplier(1000)).toBeCloseTo(1.01 ** 981 * 1.10 ** 19)
  })

  it('milestone spacing widens again to every 1000 levels beyond level 1000', () => {
    expect(getGlobalTickspeedProductionMultiplier(1999)).toBeCloseTo(1.01 ** 1980 * 1.10 ** 19)
    expect(getGlobalTickspeedProductionMultiplier(2000)).toBeCloseTo(1.01 ** 1980 * 1.10 ** 20)
  })
})

// ─── getPrestigeProductionMultiplier ─────────────────────────────────────────

describe('getPrestigeProductionMultiplier', () => {
  it('returns 1 with 0 unspent Prestige Points', () => {
    expect(getPrestigeProductionMultiplier(0)).toBe(1)
  })

  it('adds a flat 1% per unspent point', () => {
    expect(getPrestigeProductionMultiplier(1)).toBeCloseTo(1.01)
    expect(getPrestigeProductionMultiplier(50)).toBeCloseTo(1.5)
    expect(getPrestigeProductionMultiplier(100)).toBeCloseTo(2)
  })

  it('treats negative points as 0', () => {
    expect(getPrestigeProductionMultiplier(-10)).toBe(1)
  })
})

// ─── getPrestigePointsAwarded ─────────────────────────────────────────────────

describe('getPrestigePointsAwarded', () => {
  it('awards exactly 1 point at exactly GOOGOL', () => {
    expect(getPrestigePointsAwarded(GOOGOL)).toBe(1)
  })

  it('stays at 1 point until a full further 100 orders of magnitude are reached', () => {
    expect(getPrestigePointsAwarded(GOOGOL * 10)).toBe(1)
    expect(getPrestigePointsAwarded(GOOGOL * 1e9)).toBe(1)
    expect(getPrestigePointsAwarded(GOOGOL * 1e99)).toBe(1)
  })

  it('awards 2 points once the exponent reaches 200 (double the Googol exponent)', () => {
    expect(getPrestigePointsAwarded(GOOGOL * 1e100)).toBe(2)
  })

  it('awards 3 points at exponent 300', () => {
    expect(getPrestigePointsAwarded(GOOGOL * 1e200)).toBe(3)
  })
})

// ─── getSmartAutobuyerCost ────────────────────────────────────────────────────

describe('getSmartAutobuyerCost', () => {
  it('costs 10x the unlock cost for the first tier', () => {
    expect(getSmartAutobuyerCost(tensTier.id)).toBe(10)
  })

  it('costs 10x the unlock cost for later tiers', () => {
    expect(getSmartAutobuyerCost(thousandsTier.id)).toBe(20)
    expect(getSmartAutobuyerCost(TIER_DEFINITIONS[9].id)).toBe(100)
  })
})

describe('getTierTickspeedAutobuyerCost', () => {
  it('costs 2x the unlock cost for the first tier', () => {
    expect(getTierTickspeedAutobuyerCost(tensTier.id)).toBe(2)
  })

  it('costs 2x the unlock cost for later tiers', () => {
    expect(getTierTickspeedAutobuyerCost(thousandsTier.id)).toBe(4)
    expect(getTierTickspeedAutobuyerCost(TIER_DEFINITIONS[9].id)).toBe(20)
  })
})

// ─── getAutoPrestigeCost ──────────────────────────────────────────────────────

describe('getAutoPrestigeCost', () => {
  it('costs the base 1000 PP to activate (level 0 → 1)', () => {
    expect(getAutoPrestigeCost(0)).toBe(1000)
  })

  it('doubles each level after that', () => {
    expect(getAutoPrestigeCost(1)).toBe(2000)
    expect(getAutoPrestigeCost(2)).toBe(4000)
    expect(getAutoPrestigeCost(3)).toBe(8000)
  })

  it('treats negative levels as 0', () => {
    expect(getAutoPrestigeCost(-1)).toBe(1000)
  })
})

// ─── getAutoPrestigeAttemptRate ───────────────────────────────────────────────

describe('getAutoPrestigeAttemptRate', () => {
  it('is 1/1000 at the baseline (level 1) — fires roughly every 1000 ticks', () => {
    expect(getAutoPrestigeAttemptRate(1)).toBeCloseTo(1 / 1000)
  })

  it('treats a not-yet-bought (null) level as the baseline rate, defensively', () => {
    expect(getAutoPrestigeAttemptRate(null)).toBeCloseTo(1 / 1000)
  })

  it('compounds by 10% per level above 1', () => {
    expect(getAutoPrestigeAttemptRate(2)).toBeCloseTo(1.1 / 1000)
    expect(getAutoPrestigeAttemptRate(3)).toBeCloseTo(1.21 / 1000)
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

  it('uses a 10x block instead of 2x for the 10th block-of-10 (i.e. the 100th purchase)', () => {
    // 9 regular blocks (2^9 = 512) × 1 mega block (10x) = 5120, not the 2^10 = 1024 a plain
    // doubling ladder would give.
    expect(getPurchaseMilestoneMultiplier(99)).toBe(2 ** 9)
    expect(getPurchaseMilestoneMultiplier(100)).toBe(5120)
    expect(getPurchaseMilestoneMultiplier(109)).toBe(5120)
  })

  it('resumes regular 2x blocks after a mega block, on top of its 10x', () => {
    expect(getPurchaseMilestoneMultiplier(110)).toBe(2 ** 10 * 10)
  })

  it('applies a second 10x mega block at the 200th purchase', () => {
    expect(getPurchaseMilestoneMultiplier(200)).toBe(2 ** 18 * 10 ** 2)
  })
})

// ─── getSpeedUpMultiplier ─────────────────────────────────────────────────────

describe('getSpeedUpMultiplier', () => {
  it('is 1x (no bonus) with no Speed Up activations', () => {
    expect(getSpeedUpMultiplier(0)).toBe(1)
  })

  it('doubles per activation', () => {
    expect(getSpeedUpMultiplier(1)).toBe(2)
    expect(getSpeedUpMultiplier(2)).toBe(4)
    expect(getSpeedUpMultiplier(3)).toBe(8)
  })

  it('treats a negative count as 0', () => {
    expect(getSpeedUpMultiplier(-1)).toBe(1)
  })
})

describe('getSpeedUpRequirement', () => {
  it('is 10 for the first activation (speedUpCount 0)', () => {
    expect(getSpeedUpRequirement(0)).toBe(10)
  })

  it('increases by another full block of 10 per prior activation', () => {
    expect(getSpeedUpRequirement(1)).toBe(20)
    expect(getSpeedUpRequirement(2)).toBe(30)
    expect(getSpeedUpRequirement(3)).toBe(40)
  })

  it('treats a negative count as 0', () => {
    expect(getSpeedUpRequirement(-1)).toBe(10)
  })
})

// ─── isProductionFrozen ──────────────────────────────────────────────────────

describe('isProductionFrozen', () => {
  it('is false below GOOGOL', () => {
    // GOOGOL - 1 rounds back to GOOGOL at this magnitude (float precision), so use a value
    // that's meaningfully smaller instead of relying on an off-by-one difference.
    const state = withMoney(createInitialGameState(), GOOGOL / 10)
    expect(isProductionFrozen(state)).toBe(false)
  })

  it('is true at exactly GOOGOL', () => {
    const state = withMoney(createInitialGameState(), GOOGOL)
    expect(isProductionFrozen(state)).toBe(true)
  })

  it('is true above GOOGOL', () => {
    const state = withMoney(createInitialGameState(), GOOGOL * 2)
    expect(isProductionFrozen(state)).toBe(true)
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

  it('stays unlocked via the permanent everUnlockedTierIds flag even if both its own and its predecessor\'s owned are 0', () => {
    const state = withEverUnlockedTierIds(createInitialGameState(), TIER_DEFINITIONS[2].id, true)
    expect(state.owned[TIER_DEFINITIONS[2].id]).toBe(0)
    expect(state.owned[TIER_DEFINITIONS[1].id]).toBe(0)
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[2])).toBe(true)
  })

  it('stays locked when everUnlockedTierIds is false and neither live condition is met', () => {
    const state = withEverUnlockedTierIds(createInitialGameState(), TIER_DEFINITIONS[1].id, false)
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[1])).toBe(false)
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

// ─── getEffectiveTierTickSpeedSeconds ───────────────────────────────────────

describe('getEffectiveTierTickSpeedSeconds', () => {
  it('equals the tier\'s raw base tickspeed when neither multiplier is active', () => {
    expect(getEffectiveTierTickSpeedSeconds(createInitialGameState(), tensTier.id)).toBe(1)
  })

  it('shrinks by the per-tier tickspeed multiplier', () => {
    const state = withTickspeedLevel(createInitialGameState(), tensTier.id, 3)
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBeCloseTo(1 / 1.21)
  })

  it('shrinks by the global tickspeed multiplier too, applied to every tier', () => {
    // Level 10 = 9 regular 1% levels compounded, then the level-10 milestone at 10% instead of 1%.
    const globalMultiplier = 1.01 ** 9 * 1.10
    const state = withGlobalTickspeedMultiplier(createInitialGameState(), 10)
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBeCloseTo(1 / globalMultiplier)
    // Kilobytes' own base tickspeed is 2s (tier index 1 → tierIndex + 1), so the same global
    // multiplier shrinks it from a different starting point than Bytes' 1s.
    expect(getEffectiveTierTickSpeedSeconds(state, thousandsTier.id)).toBeCloseTo(2 / globalMultiplier)
  })

  it('stacks both multiplicatively, not additively', () => {
    // Per-tier level 2 → ×1.1, global level 10 (1.01^9 * 1.10 ≈ ×1.2031) → combined, not simply
    // additive.
    const globalMultiplier = 1.01 ** 9 * 1.10
    const state = withGlobalTickspeedMultiplier(
      withTickspeedLevel(createInitialGameState(), tensTier.id, 2),
      10
    )
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBeCloseTo(1 / (1.1 * globalMultiplier))
  })

  it('uses the XP-funded multiplier for the last tier once unlocked, ignoring its (stale) tickspeedLevels entry', () => {
    const lastTierId = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id
    const baseTickSpeed = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].baseTickSpeedSeconds
    const state = withLastTierXpConsumed(
      withTickspeedLevel(
        withLastTierTickspeedXpUnlocked(createInitialGameState()),
        lastTierId,
        5 // would normally shrink the period a lot — must be ignored once XP-unlocked
      ),
      37
    )
    expect(getEffectiveTierTickSpeedSeconds(state, lastTierId)).toBeCloseTo(baseTickSpeed / (1.01 ** 37))
  })

  it('never returns a non-finite or zero period even once the last tier\'s XP multiplier overflows to Infinity', () => {
    // 1.01^xpConsumed overflows double-precision float to Infinity somewhere around xpConsumed ~
    // 71,333 — reachable in principle within a single run, before the next Prestige/Speed Up resets
    // lastTierXpConsumed back to 0 (see MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS in engine.js) —
    // dividing the base period by Infinity would give exactly 0, which corrupts tickGame's
    // accumulator math.
    const lastTierId = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id
    expect(getLastTierXpTickspeedMultiplier(1_000_000)).toBe(Infinity)
    const state = withLastTierXpConsumed(withLastTierTickspeedXpUnlocked(createInitialGameState()), 1_000_000)
    const period = getEffectiveTierTickSpeedSeconds(state, lastTierId)
    expect(Number.isFinite(period)).toBe(true)
    expect(period).toBeGreaterThan(0)
  })

  it('leaves every other tier on the normal per-tier tickspeed ladder even once the last tier is XP-unlocked', () => {
    const state = withLastTierTickspeedXpUnlocked(createInitialGameState())
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBe(1)
  })
})

// ─── getTierProductionProgressPercent ───────────────────────────────────────

describe('getTierProductionProgressPercent', () => {
  it('is 0% on a fresh state', () => {
    expect(getTierProductionProgressPercent(createInitialGameState(), thousandsTier.id)).toBe(0)
  })

  it('reflects a partial fraction of a tier\'s tickspeed', () => {
    // Kilobytes' base tickspeed is 2s — half a second's worth of elapsed time banks a quarter of
    // it.
    const state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    const afterHalfSecond = tickGame(0.5)(state)
    expect(getTierProductionProgressPercent(afterHalfSecond, thousandsTier.id)).toBe(25)
  })

  it('drops back down to the banked remainder once a batch fires', () => {
    const state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    const afterTwoSeconds = tickGame(2)(state)
    // Kilobytes' base tickspeed is 2s: a single 2-second tick crosses the threshold and delivers
    // a batch, banking 0s of remainder.
    expect(getTierProductionProgressPercent(afterTwoSeconds, thousandsTier.id)).toBe(0)
  })

  it('is 100% for a 1s-tickspeed tier with a full second already banked', () => {
    expect(getTierProductionProgressPercent(
      { tierProductionAccumulators: { [tensTier.id]: 1 } },
      tensTier.id
    )).toBe(100)
  })

  it('reports 100% instead of the wrapped remainder when the previous accumulator just crossed the threshold', () => {
    // Bytes' tickspeed is 1s: a previous accumulator of 0 plus the default 1 elapsed second
    // crosses 1s, so a delivery just happened even though the freshly-wrapped remainder is 0.
    const state = { tierProductionAccumulators: { [tensTier.id]: 0 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0)).toBe(100)
  })

  it('falls through to the normal calculation when the previous accumulator has not yet crossed the threshold', () => {
    // previousAccumulator (0.4) + elapsedSeconds (0.1) = 0.5, below Bytes' 1s tickspeed
    // threshold, so this falls through to the normal accumulated/tickSpeed calculation using the
    // raw stored accumulator (0.5) instead of reporting 100.
    const state = { tierProductionAccumulators: { [tensTier.id]: 0.5 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0.4, 0.1)).toBe(50)
  })

  it('reports a 1s-tickspeed tier as 100% for any non-negative previous accumulator', () => {
    const state = { tierProductionAccumulators: { [tensTier.id]: 0 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0)).toBe(100)
  })

  it('measures against the shrunk effective tickspeed once a tier has a tickspeed multiplier level', () => {
    // Level 2 → ×1.1 effective speed (see getEffectiveTierTickSpeedSeconds), so the period shrinks
    // from 1s to 1/1.1s — half of that banked is 50% of the way there, not 45.45% of the raw 1s.
    const state = withTickspeedLevel(
      { tierProductionAccumulators: { [tensTier.id]: 1 / 1.1 / 2 } },
      tensTier.id,
      2
    )
    expect(getTierProductionProgressPercent(state, tensTier.id)).toBe(50)
  })

  it('ignores a null/undefined previous accumulator, preserving the 2-arg behavior', () => {
    const state = { tierProductionAccumulators: { [thousandsTier.id]: 0 } }
    expect(getTierProductionProgressPercent(state, thousandsTier.id, null)).toBe(0)
    expect(getTierProductionProgressPercent(state, thousandsTier.id, undefined)).toBe(0)
  })

  it('defaults elapsedSeconds to 1, matching a full real second (e.g. offline-progress replay)', () => {
    const state = { tierProductionAccumulators: { [thousandsTier.id]: 0 } }
    expect(getTierProductionProgressPercent(state, thousandsTier.id, 1)).toBe(
      getTierProductionProgressPercent(state, thousandsTier.id, 1, 1)
    )
  })

  it('accepts a fractional elapsedSeconds (e.g. a 10Hz live tick) for the just-delivered check', () => {
    // Bytes' tickspeed is 1s: a previous accumulator of 0.95 plus a 0.1 elapsed tick crosses 1s.
    const state = { tierProductionAccumulators: { [tensTier.id]: 0.05 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0.95, 0.1)).toBe(100)
  })

  it('does not report 100% early when a fractional elapsedSeconds has not yet crossed the threshold', () => {
    const state = { tierProductionAccumulators: { [tensTier.id]: 0.85 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0.75, 0.1)).toBe(85)
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

  it('refuses to buy once production is frozen at GOOGOL, even with plenty of funds', () => {
    const state = withMoney(createInitialGameState(), GOOGOL)
    expect(buyTier(tensTier.id)(state)).toBe(state)
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

  it('engages the last tier\'s XP tickspeed mechanic (a live owned >= 10 check) once a purchase brings owned to 10', () => {
    const state = withMoney(
      withPurchased(withOwned(createInitialGameState(), lastTier.id, 9), lastTier.id, 9),
      getTierCost(lastTier, 9)
    )
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(false)
    const after = buyTier(lastTier.id)(state)
    expect(after.owned[lastTier.id]).toBe(10)
    expect(isLastTierTickspeedXpUnlocked(after)).toBe(true)
  })

  it('does not engage the last tier\'s XP tickspeed mechanic before owned reaches 10', () => {
    const state = withMoney(
      withPurchased(unlockedLastTierState(), lastTier.id, 5),
      getTierCost(lastTier, 5)
    )
    const after = buyTier(lastTier.id)(state)
    expect(after.owned[lastTier.id]).toBe(2)
    expect(isLastTierTickspeedXpUnlocked(after)).toBe(false)
  })

  it('permanently latches everUnlockedTierIds for a tier the instant it becomes newly buyable', () => {
    // Buying the 10th Bytes (tensTier) unlocks Kilobytes (thousandsTier) — confirm the permanent
    // flag is set the same instant, not just the live owned >= 10 condition.
    const state = withMoney(
      withOwned(createInitialGameState(), tensTier.id, 9),
      getTierCost(tensTier, 0)
    )
    expect(state.everUnlockedTierIds[thousandsTier.id]).toBe(false)
    const after = buyTier(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(10)
    expect(after.everUnlockedTierIds[thousandsTier.id]).toBe(true)
  })

  it('leaves everUnlockedTierIds unchanged when the purchase does not cross any tier\'s unlock threshold', () => {
    const state = withMoney(createInitialGameState(), 1000)
    const after = buyTier(tensTier.id)(state)
    expect(after.everUnlockedTierIds[thousandsTier.id]).toBe(false)
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
  it('produces money from Bytes generators over 1 second', () => {
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

  it('permanently latches everUnlockedTierIds for a tier the instant passive production (not a manual buy) first gives it any owned', () => {
    // Bootstrap owned generators on the 3rd tier directly (simulating an already-unlocked tier),
    // with thousandsTier (2nd tier) starting at 0 owned and not yet flagged. The 3rd tier's own
    // production credits thousandsTier's owned/resources (producesResourceId chains down one
    // tier at a time) — once that first delivery lands, thousandsTier's live "owned > 0" unlock
    // condition is satisfied for the first time, purely via production, with no buyTier call at all.
    const megabytesTier = TIER_DEFINITIONS[2]
    const state = withOwned(createInitialGameState(), megabytesTier.id, 5)
    expect(state.owned[thousandsTier.id]).toBe(0)
    expect(state.everUnlockedTierIds[thousandsTier.id]).toBe(false)
    const after = tickGame(getTierBaseTickSpeedSeconds(megabytesTier.id))(state)
    expect(after.owned[thousandsTier.id]).toBeGreaterThan(0)
    expect(after.everUnlockedTierIds[thousandsTier.id]).toBe(true)
  })

  it('freezes entirely (returns the same state object) once Money reaches GOOGOL', () => {
    const state = withOwned(withMoney(createInitialGameState(), GOOGOL), tensTier.id, 5)
    expect(tickGame(1)(state)).toBe(state)
  })

  it('does not immediately auto-prestige at GOOGOL if Auto-Prestige was just bought (attempt budget starts at 0, not yet crossed 1)', () => {
    const state = withAutoPrestige(withOwned(withMoney(createInitialGameState(), GOOGOL), tensTier.id, 5))
    const after = tickGame(1)(state)
    expect(after.prestige.count).toBe(0)
    expect(after.resources[MONEY_ID]).toBe(GOOGOL)
    expect(after.autoPrestigeAttemptBudget).toBeCloseTo(1 / 1000)
  })

  it('automatically prestiges the instant its attempt budget crosses 1, once Money is at GOOGOL', () => {
    const state = withAutoPrestigeBudget(
      withAutoPrestige(withOwned(withMoney(createInitialGameState(), GOOGOL), tensTier.id, 5)),
      0.9995 // + the level-1 rate (1/1000) crosses 1 this tick
    )
    const after = tickGame(1)(state)
    expect(after.prestige.count).toBe(1)
    expect(after.resources[MONEY_ID]).toBe(10)
    expect(after.owned[tensTier.id]).toBe(0)
    expect(after.autoPrestigeAttemptBudget).toBe(0)
  })

  it('keeps banking the Auto-Prestige attempt budget tick after tick while frozen, without firing early', () => {
    let state = withAutoPrestige(withOwned(withMoney(createInitialGameState(), GOOGOL), tensTier.id, 5))
    for (let i = 0; i < 500; i++) state = tickGame(1)(state)
    // 500 ticks at the level-1 rate (1/1000) accumulates to 0.5 — still frozen, not yet fired.
    expect(state.prestige.count).toBe(0)
    expect(state.autoPrestigeAttemptBudget).toBeCloseTo(0.5)
    for (let i = 0; i < 500; i++) state = tickGame(1)(state)
    // Another 500 ticks crosses the 1.0 threshold — fires now, exactly once.
    expect(state.prestige.count).toBe(1)
    expect(state.resources[MONEY_ID]).toBe(10)
  })

  it('accumulates the Auto-Prestige attempt budget during ordinary (non-frozen) play too, not only once frozen', () => {
    const state = withAutoPrestige(createInitialGameState())
    const after = tickGame(1)(state)
    expect(after.autoPrestigeAttemptBudget).toBeCloseTo(1 / 1000)
  })

  it('scales production with elapsed time', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 1)
    const after = tickGame(3)(state)
    expect(after.resources[MONEY_ID]).toBe(state.resources[MONEY_ID] + 3)
  })

  it('still delivers a 1s-tickspeed tier\'s production on the 10th tick despite fractional elapsedSeconds floating-point drift', () => {
    // Summing 0.1 ten times lands on 0.9999999999999999 in IEEE-754, not exactly 1 — matching a
    // 10Hz live tick loop (elapsedSeconds = TICK_RATE_MS / 1000 = 0.1 per call). Without the
    // epsilon tolerance in tickGame's ticksElapsed calculation, this would delay delivery to an
    // 11th tick instead of firing on the 10th, as it does at a coarser (e.g. 1-tick-per-second)
    // granularity.
    let state = withOwned(createInitialGameState(), tensTier.id, 1)
    for (let i = 0; i < 10; i++) state = tickGame(0.1)(state)
    expect(state.resources[MONEY_ID]).toBe(11) // 10 starting + 1 tick's worth of production
  })

  it('does not apply the Prestige Points production-speed bonus until it has been unlocked', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 1)
    const boosted = withPrestigePoints(base, 100) // +100% → ×2, but not yet unlocked
    expect(tickGame(1)(boosted).resources[MONEY_ID]).toBe(base.resources[MONEY_ID] + 1)
  })

  it('applies the Prestige Points production-speed bonus once unlocked', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 1)
    const boosted = withPrestigeSpeedBonusUnlocked(withPrestigePoints(base, 100)) // +100% → ×2
    expect(tickGame(1)(boosted).resources[MONEY_ID]).toBe(
      base.resources[MONEY_ID] + 2
    )
  })

  it('floors a fractional Prestige Points production multiplier instead of crediting a fraction', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 1)
    // +50% → ×1.5, raw production 1 × 1.5 = 1.5
    const boosted = withPrestigeSpeedBonusUnlocked(withPrestigePoints(base, 50))
    const after = tickGame(1)(boosted)
    expect(after.resources[MONEY_ID]).toBe(base.resources[MONEY_ID] + 1) // floor(1.5) = 1
  })

  it('multiplies production by the Speed Up multiplier', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 5)
    const sped = withSpeedUpCount(base, 2) // ×4
    const after = tickGame(1)(sped)
    expect(after.resources[MONEY_ID]).toBe(base.resources[MONEY_ID] + 20) // 5 × 4
  })

  it('stacks the Speed Up multiplier with the Prestige Point speed bonus', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 10)
    // ×2 (Speed Up) × ×2 (+100% PP bonus) = ×4
    const state = withSpeedUpCount(
      withPrestigeSpeedBonusUnlocked(withPrestigePoints(base, 100)), 1
    )
    const after = tickGame(1)(state)
    expect(after.resources[MONEY_ID]).toBe(base.resources[MONEY_ID] + 40) // 10 × 4
  })

  it('Kilobytes generators produce Bytes resource and owned generators once its 2s base tickspeed accumulates, banking fractional sub-second ticks along the way', () => {
    let state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    // Kilobytes' base tickspeed is 2s — nineteen 0.1s ticks (the live game's real 10Hz cadence)
    // only accumulate toward that, they don't produce yet.
    for (let i = 0; i < 19; i++) {
      state = tickGame(0.1)(state)
      expect(state.resources[tensTier.id]).toBe(0)
    }
    expect(state.owned[tensTier.id]).toBe(10)
    // The 20th 0.1s tick crosses the 2s threshold and delivers one tick's worth (owned × 1).
    state = tickGame(0.1)(state)
    expect(state.resources[tensTier.id]).toBe(2)
    expect(state.owned[tensTier.id]).toBe(12) // 10 initial + 2 produced
  })

  it('a tier further down the line banks fractional sub-second ticks the same way', () => {
    const millionsTier = TIER_DEFINITIONS[2]
    let state = withOwned(
      withOwned(createInitialGameState(), thousandsTier.id, 10), // unlocks Megabytes
      millionsTier.id, 5
    )
    // Megabytes' base tickspeed is 3s — the first 29 sub-second ticks only accumulate toward that
    // threshold, no production yet.
    for (let i = 0; i < 29; i++) {
      state = tickGame(0.1)(state)
      expect(state.resources[thousandsTier.id]).toBe(0)
    }
    // The 30th tick crosses the 3s threshold and delivers exactly one tick's worth (owned × 1).
    state = tickGame(0.1)(state)
    expect(state.resources[thousandsTier.id]).toBe(5)
  })

  it('awards XP when money crosses a power-of-10 milestone', () => {
    const state = {
      ...withOwned(createInitialGameState(), tensTier.id, 10),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 95 },
      prestige: { xp: 0, points: 0, count: 0, highestMilestone: 1 },
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
    // Level 0 = 1 purchase attempt per tick (the flat baseline rate) — unlocking alone already
    // enables purchasing, with no tickspeed level needed.
    expect(after.owned[tensTier.id]).toBe(1)
    expect(after.purchased[tensTier.id]).toBe(1)
    // Production depends only on purchased milestones now (see getPurchaseMilestoneMultiplier) —
    // the tickspeed multiplier at level 0/1 is still ×1, no bonus yet (see
    // getTickspeedProductionMultiplier): 100 - 10 (cost) + 1 × 1sec × 1 (still under 10
    // purchases) = 91.
    expect(after.resources[MONEY_ID]).toBe(91)
  })

  it('the tickspeed multiplier level has no effect on purchase-attempt frequency — every unlocked level buys exactly 1 per tick', () => {
    const runTicks = (level, ticks) => {
      let result = withAutobuyer(withMoney(createInitialGameState(), 10000), tensTier.id, level)
      for (let i = 0; i < ticks; i++) result = tickGame(1)(result)
      return result
    }
    // Purchase-attempt rate is now flat regardless of tickspeed level — level 1 and level 2 both
    // fire exactly 1 attempt/tick, 10 purchases over 10 ticks (the level 2+ production bonus is
    // covered separately, see the production-multiplier tests below).
    expect(runTicks(1, 10).purchased[tensTier.id]).toBe(10)
    expect(runTicks(2, 10).purchased[tensTier.id]).toBe(10)
  })

  it('scales the autobuyer attempt budget by elapsedSeconds, so real-world purchase cadence is unaffected by tick granularity', () => {
    const oneSecondTick = withAutobuyer(withMoney(createInitialGameState(), 10000), tensTier.id, 1)
    const tenTenthSecondTicks = withAutobuyer(withMoney(createInitialGameState(), 10000), tensTier.id, 1)
    // A single elapsedSeconds=1 call vs. ten elapsedSeconds=0.1 calls (10x more often, as at a
    // 10Hz tick rate) must reach the same real-world purchase count after 1 real second.
    let tenTicksResult = tenTenthSecondTicks
    for (let i = 0; i < 10; i++) tenTicksResult = tickGame(0.1)(tenTicksResult)
    expect(tenTicksResult.purchased[tensTier.id]).toBe(tickGame(1)(oneSecondTick).purchased[tensTier.id])
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

  it('without smart, a tier with only its $10 starting balance never buys anything at batch size 10 (the bootstrap stall)', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 10),
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.purchased[tensTier.id]).toBe(0)
    expect(after.resources[MONEY_ID]).toBe(10)
  })

  it('a smart tier buys one at a time (ignoring the batch size) instead of stalling on the first block', () => {
    const state = withSmartAutobuyer(
      withAutobuyer(
        withMoney(createInitialGameState(), 10), // same stall scenario as above
        tensTier.id
      ),
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.purchased[tensTier.id]).toBe(1)
    expect(after.owned[tensTier.id]).toBe(1)
    // Money is spent on the single unit ($10 → $0) but that unit's own production adds $1 back
    // this same tick (owned(1) × 1sec × 1 prestige multiplier × 1 milestone multiplier).
    expect(after.resources[MONEY_ID]).toBe(1)
  })

  it('a smart tier reverts to the normal (full-block) batch size once past its first 10 purchases', () => {
    const state = withSmartAutobuyer(
      withAutobuyer(
        withMoney(withPurchased(createInitialGameState(), tensTier.id, 10), 65), // 2nd block: unit cost is now $100 (10x epoch jump), $65 affords 0
        tensTier.id
      ),
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.purchased[tensTier.id]).toBe(10) // unchanged — holds for the full block, same as non-smart
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
    // (Bytes produces its own cost resource) is doubled by the purchase-milestone multiplier —
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
    // $1,000 affords exactly one of: 1 Kilobytes ($1,000) or 1 Bytes ($10) — not both.
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

  it('automatically upgrades a tier\'s tickspeed multiplier once per tick once its tier tickspeed autobuyer is bought, with no autobuyer unlock required', () => {
    // The last tier (index 9) has the cheapest tickspeed base (10), so level 1 → 2 costs a
    // testable 10^1 = 10 — the tickspeed cost ladder is otherwise astronomically large for
    // earlier tiers (see getTickspeedMultiplierBaseCost). Zero money so the ordinary autobuyer
    // tier-purchase step (which competes for money) can't interfere; withOwned marks the tier as
    // already-unlocked (isTierUnlocked) without needing the full prerequisite chain.
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withMoney(
      withResource(
        withTierTickspeedAutobuyer(withOwned(createInitialGameState(), lastTier.id, 1), lastTier.id),
        lastTier.id,
        11
      ),
      0
    )
    expect(state.autobuyers[lastTier.id]).toBeNull()
    const after = tickGame(1)(state)
    expect(after.tickspeedLevels[lastTier.id]).toBe(2)
    expect(after.resources[lastTier.id]).toBe(1)
  })

  it('does not auto-upgrade a tier\'s tickspeed multiplier without its tier tickspeed autobuyer bought, even though the autobuyer itself is unlocked', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withMoney(
      withResource(
        withAutobuyer(withOwned(createInitialGameState(), lastTier.id, 1), lastTier.id, 1),
        lastTier.id,
        101
      ),
      0
    )
    const after = tickGame(1)(state)
    expect(after.tickspeedLevels[lastTier.id]).toBe(1)
    expect(after.resources[lastTier.id]).toBe(101)
  })

  it('does not auto-upgrade a tier\'s tickspeed multiplier without its tier tickspeed autobuyer bought, even when the autobuyer itself was never unlocked either', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withResource(
      withOwned(createInitialGameState(), lastTier.id, 1),
      lastTier.id,
      1000
    )
    const after = tickGame(1)(state)
    expect(after.autobuyers[lastTier.id]).toBeNull()
    expect(after.tickspeedLevels[lastTier.id]).toBe(1)
    expect(after.resources[lastTier.id]).toBe(1000)
  })

  it('auto-upgrade is a no-op when the tier cannot yet afford the next level', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withTierTickspeedAutobuyer(withOwned(createInitialGameState(), lastTier.id, 1), lastTier.id)
    const after = tickGame(1)(state)
    expect(after.tickspeedLevels[lastTier.id]).toBe(1)
  })

  it('does not scale a single delivery\'s amount by the tickspeed multiplier — it speeds up delivery frequency instead', () => {
    // Level 3 → ×1.21 (see getTickspeedProductionMultiplier), so this tier's effective tickspeed
    // period shrinks from the base 1s to 1/1.21s. Passing exactly that shrunk period as
    // elapsedSeconds triggers exactly one delivery — confirming it's still just `owned` (10), not
    // owned × 1.21 (12): the multiplier no longer inflates the delivered amount, only how soon the
    // next one arrives. Zero money so the autobuyer purchase step (which would otherwise buy
    // another unit and change `owned` before production is calculated) can't interfere.
    const tickspeedMultiplier = getTickspeedProductionMultiplier(3)
    const state = withMoney(
      withTickspeedLevel(withOwned(createInitialGameState(), tensTier.id, 10), tensTier.id, 3),
      0
    )
    const after = tickGame(1 / tickspeedMultiplier)(state)
    expect(after.resources[MONEY_ID]).toBe(10)
  })

  it('fires more delivery ticks within a fixed elapsed window at a higher tickspeed level, without changing the per-tick amount', () => {
    // Over a fixed 10-second window, the baseline (level 1, 1s period) delivers 10 batches of 10
    // = 100 total; level 3 (×1.21 speed, ~0.826s period) delivers floor(10 × 1.21) = 12 batches of
    // the same 10 each = 120 total — the same ×1.21 economy bonus as before, now arrived at via
    // more (not bigger) deliveries.
    const baseline = withMoney(withOwned(createInitialGameState(), tensTier.id, 10), 0)
    expect(tickGame(10)(baseline).resources[MONEY_ID]).toBe(100)

    const sped = withMoney(
      withTickspeedLevel(withOwned(createInitialGameState(), tensTier.id, 10), tensTier.id, 3),
      0
    )
    expect(tickGame(10)(sped).resources[MONEY_ID]).toBe(120)
  })

  it('speeds up every tier\'s delivery frequency at once via the global tickspeed multiplier, without changing the per-tick amount', () => {
    // Global level 10 = 9 regular 1% levels compounded, then the level-10 milestone at 10%
    // instead of 1% (see getGlobalTickspeedProductionMultiplier) — 1.01^9 * 1.10 ≈ ×1.2031, the
    // same frequency-scaling effect as the per-tier multiplier above, applied uniformly to every
    // tier at once, no per-tier tickspeed level involved here at all. Over a 100-second window:
    // baseline delivers 100 batches of 10 = 1000, while floor(100 × 1.2031) = 120 batches of 10 =
    // 1200.
    const state = withMoney(
      withGlobalTickspeedMultiplier(withOwned(createInitialGameState(), tensTier.id, 10), 10),
      0
    )
    const after = tickGame(100)(state)
    expect(after.resources[MONEY_ID]).toBe(1200)
  })

  it('stacks the global tickspeed multiplier multiplicatively with the per-tier tickspeed multiplier — both speed up the same delivery frequency together', () => {
    // Per-tier level 2 → ×1.1, global level 10 → 1.01^9 * 1.10 ≈ ×1.2031 → combined ≈ ×1.3234, not
    // simply additive. Over a 100-second window: floor(100 × 1.3234) = 132 batches of 10 each =
    // 1320.
    const state = withGlobalTickspeedMultiplier(
      withMoney(
        withTickspeedLevel(withOwned(createInitialGameState(), tensTier.id, 10), tensTier.id, 2),
        0
      ),
      10
    )
    const after = tickGame(100)(state)
    expect(after.resources[MONEY_ID]).toBe(1320)
  })

  it('automatically triggers Speed Up when Auto Speed Up is bought and the last tier is eligible', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withAutoSpeedUp(
      withPurchased(createInitialGameState(), lastTier.id, 10)
    )
    const after = tickGame(1)(state)
    expect(after.speedUpCount).toBe(1)
    expect(after.purchased[lastTier.id]).toBe(0)
  })

  it('does not trigger Speed Up automatically when the last tier is not yet eligible', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withAutoSpeedUp(
      withPurchased(createInitialGameState(), lastTier.id, 9)
    )
    const after = tickGame(1)(state)
    expect(after.speedUpCount).toBe(0)
  })

  it('does not trigger Speed Up automatically without Auto Speed Up bought', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withPurchased(createInitialGameState(), lastTier.id, 10)
    const after = tickGame(1)(state)
    expect(after.speedUpCount).toBe(0)
  })

  it('automatically upgrades the global tickspeed multiplier when the Tickspeed Autobuyer is bought and it is affordable', () => {
    const state = withAutoGlobalTickspeed(
      withMoney(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 10)
    )
    const after = tickGame(1)(state)
    expect(after.globalTickspeedMultiplier).toBe(1)
  })

  it('does not upgrade the global tickspeed multiplier automatically without enough Money', () => {
    const state = withAutoGlobalTickspeed(
      withMoney(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 9)
    )
    const after = tickGame(1)(state)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('does not upgrade the global tickspeed multiplier automatically without the Tickspeed Autobuyer bought', () => {
    const state = withMoney(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 10)
    const after = tickGame(1)(state)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('never corrupts the second-to-last tier\'s owned/resources into NaN even once the last tier\'s XP multiplier overflows to Infinity', () => {
    // Regression test for MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS: without the safety floor in
    // getEffectiveTierTickSpeedSeconds, an overflowed (Infinity) multiplier divides the period down
    // to exactly 0, which turns ticksElapsed into Infinity and the accumulator update into
    // `Infinity * 0 = NaN` — permanently zeroing the produced tier's owned/resources every tick from
    // then on (clampNonNegative treats non-finite values as 0).
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const secondToLastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 2]
    const state = withOwned(
      withLastTierXpConsumed(withLastTierTickspeedXpUnlocked(createInitialGameState()), 1_000_000),
      lastTier.id,
      50
    )
    const after = tickGame(getTierBaseTickSpeedSeconds(lastTier.id))(state)
    expect(Number.isNaN(after.owned[secondToLastTier.id])).toBe(false)
    expect(Number.isNaN(after.resources[secondToLastTier.id])).toBe(false)
    expect(after.owned[secondToLastTier.id]).toBeGreaterThan(0)
    // A second tick should keep producing normally rather than staying stuck at a corrupted value.
    const afterTwice = tickGame(getTierBaseTickSpeedSeconds(lastTier.id))(after)
    expect(afterTwice.owned[secondToLastTier.id]).toBeGreaterThan(after.owned[secondToLastTier.id])
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
    // The autobuyer attempt rate is flat (1/tick) regardless of tickspeed level (see tickGame) —
    // 10 simulated ticks fire exactly 10 purchases, one per tick, rather than bought in one lump
    // sum.
    expect(after.purchased[tensTier.id]).toBe(10)
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

// The last tier (index 9) has the cheapest tickspeed base (10 — see
// getTickspeedMultiplierBaseCost), keeping its unlock/level-up costs (10, 100, 1000, …) testable;
// earlier tiers' costs are astronomically large by design (e.g. the first tier's unlock alone
// costs 10^10 PP). withOwned marks it as already-unlocked (isTierUnlocked) without needing the
// full prerequisite chain up from tier01.
const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
const unlockedLastTierState = () => withOwned(createInitialGameState(), lastTier.id, 1)

describe('buyTickspeedMultiplier', () => {
  it('upgrades from level 1 to 2 with no autobuyer unlock at all, deducting exactly the tier\'s base cost (10), keeping 1 generator', () => {
    const state = withResource(unlockedLastTierState(), lastTier.id, 11)
    expect(state.autobuyers[lastTier.id]).toBeNull()
    const after = buyTickspeedMultiplier(lastTier.id)(state)
    expect(after.tickspeedLevels[lastTier.id]).toBe(2)
    expect(after.resources[lastTier.id]).toBe(1)
  })

  it('returns the same state for a tier that is not itself unlocked yet', () => {
    const state = withResource(createInitialGameState(), thousandsTier.id, 1000)
    expect(buyTickspeedMultiplier(thousandsTier.id)(state)).toBe(state)
  })

  it('upgrades from level 2 to 3, deducting the base cost squared (100), keeping 1 generator', () => {
    const state = withResource(
      withTickspeedLevel(unlockedLastTierState(), lastTier.id, 2),
      lastTier.id,
      101
    )
    const after = buyTickspeedMultiplier(lastTier.id)(state)
    expect(after.tickspeedLevels[lastTier.id]).toBe(3)
    expect(after.resources[lastTier.id]).toBe(1)
  })

  it('returns the same state when the tier\'s own resource is insufficient', () => {
    const state = withResource(unlockedLastTierState(), lastTier.id, 5)
    expect(buyTickspeedMultiplier(lastTier.id)(state)).toBe(state)
  })

  it('refuses to level up once production is frozen at GOOGOL, even with plenty of the tier\'s own resource', () => {
    const state = withMoney(
      withResource(unlockedLastTierState(), lastTier.id, 11),
      GOOGOL
    )
    expect(buyTickspeedMultiplier(lastTier.id)(state)).toBe(state)
  })

  it('refuses to level up when paying the cost would leave zero generators', () => {
    // Exactly enough to cover the cost, but that would drain resources/owned to 0 — since those
    // two move together, the tier would be left with no generators at all.
    const state = withResource(unlockedLastTierState(), lastTier.id, 10)
    expect(buyTickspeedMultiplier(lastTier.id)(state)).toBe(state)
  })

  it('leaves owned in sync with resources after leveling up (keeps 1 generator)', () => {
    // owned is deliberately kept below 10 here (unlockedLastTierState's default of 1) so the last
    // tier's live XP tickspeed check (see isLastTierTickspeedXpUnlocked) doesn't engage and disable
    // this (Money-funded) tickspeed button — this test is about the owned/resources sync behavior
    // buyTickspeedMultiplier itself has, not the last-tier XP mechanic.
    const state = withResource(unlockedLastTierState(), lastTier.id, 11)
    const after = buyTickspeedMultiplier(lastTier.id)(state)
    expect(after.owned[lastTier.id]).toBe(1)
    expect(after.resources[lastTier.id]).toBe(1)
  })

  it('returns the same state for an unknown tier ID', () => {
    const state = withMoney(createInitialGameState(), 100)
    expect(buyTickspeedMultiplier('does_not_exist')(state)).toBe(state)
  })

  it('is a no-op for the last tier while its tickspeed is XP-unlocked (owned >= 10), even with plenty of the tier\'s own resource', () => {
    const state = withResource(
      withLastTierTickspeedXpUnlocked(unlockedLastTierState()),
      lastTier.id,
      1_000_000
    )
    expect(buyTickspeedMultiplier(lastTier.id)(state)).toBe(state)
  })

  it('resumes working for the last tier once owned drops back below 10 (XP tickspeed disengaged)', () => {
    const state = withResource(
      withOwned(unlockedLastTierState(), lastTier.id, 1),
      lastTier.id,
      11
    )
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(false)
    const after = buyTickspeedMultiplier(lastTier.id)(state)
    expect(after.tickspeedLevels[lastTier.id]).toBe(2)
  })
})

// ─── buyAutobuyerUnlock ───────────────────────────────────────────────────────

describe('buyAutobuyerUnlock', () => {
  it('unlocks a tier\'s autobuyer at level 1 by spending its PP unlock cost', () => {
    const state = withPrestigePoints(unlockedLastTierState(), 10)
    const after = buyAutobuyerUnlock(lastTier.id)(state)
    expect(after.autobuyers[lastTier.id]).toBe(1)
    expect(after.prestige.points).toBe(0)
  })

  it('costs just 1 PP for the first tier — the cheapest of the ten', () => {
    const state = withPrestigePoints(createInitialGameState(), 1)
    const after = buyAutobuyerUnlock(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
    expect(after.prestige.points).toBe(0)
  })

  it('returns the same state when there are not enough points', () => {
    const state = withPrestigePoints(unlockedLastTierState(), 9)
    expect(buyAutobuyerUnlock(lastTier.id)(state)).toBe(state)
  })

  it('returns the same state when already unlocked (one-time purchase)', () => {
    const state = withPrestigePoints(withAutobuyer(unlockedLastTierState(), lastTier.id, 1), 100)
    expect(buyAutobuyerUnlock(lastTier.id)(state)).toBe(state)
  })

  it('returns the same state for a tier that is not yet itself unlocked (isTierUnlocked)', () => {
    const state = withPrestigePoints(createInitialGameState(), 100)
    expect(buyAutobuyerUnlock(thousandsTier.id)(state)).toBe(state)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(withPrestigePoints(unlockedLastTierState(), 100), GOOGOL)
    expect(buyAutobuyerUnlock(lastTier.id)(state)).toBe(state)
  })

  it('returns the same state for an unknown tier id', () => {
    const state = withPrestigePoints(createInitialGameState(), 100)
    expect(buyAutobuyerUnlock('does_not_exist')(state)).toBe(state)
  })
})

// ─── buySmartAutobuyer ────────────────────────────────────────────────────────

describe('buySmartAutobuyer', () => {
  it('spends 10x the unlock cost to make a tier smart once its autobuyer is unlocked', () => {
    const state = withPrestigePoints(withAutobuyer(unlockedLastTierState(), lastTier.id, 1), 100)
    const after = buySmartAutobuyer(lastTier.id)(state)
    expect(after.smartAutobuyer[lastTier.id]).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('costs 10x the first tier\'s unlock cost (10 PP)', () => {
    const state = withPrestigePoints(withAutobuyer(createInitialGameState(), tensTier.id, 1), 10)
    const after = buySmartAutobuyer(tensTier.id)(state)
    expect(after.smartAutobuyer[tensTier.id]).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('returns the same state when the tier\'s autobuyer is not yet unlocked, even with plenty of points', () => {
    const state = withPrestigePoints(unlockedLastTierState(), 1000)
    expect(buySmartAutobuyer(lastTier.id)(state)).toBe(state)
  })

  it('returns the same state when there are not enough points', () => {
    const state = withPrestigePoints(withAutobuyer(unlockedLastTierState(), lastTier.id, 1), 99)
    expect(buySmartAutobuyer(lastTier.id)(state)).toBe(state)
  })

  it('returns the same state when already smart (one-time purchase)', () => {
    const state = withSmartAutobuyer(
      withPrestigePoints(withAutobuyer(unlockedLastTierState(), lastTier.id, 1), 100),
      lastTier.id
    )
    expect(buySmartAutobuyer(lastTier.id)(state)).toBe(state)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(
      withPrestigePoints(withAutobuyer(unlockedLastTierState(), lastTier.id, 1), 100),
      GOOGOL
    )
    expect(buySmartAutobuyer(lastTier.id)(state)).toBe(state)
  })

  it('returns the same state for an unknown tier id', () => {
    const state = withPrestigePoints(createInitialGameState(), 100)
    expect(buySmartAutobuyer('does_not_exist')(state)).toBe(state)
  })
})

describe('buyTierTickspeedAutobuyer', () => {
  it('spends 2x the unlock cost to make a tier tickspeed-automated, with no autobuyer unlock prerequisite', () => {
    const state = withPrestigePoints(unlockedLastTierState(), 20)
    expect(state.autobuyers[lastTier.id]).toBeNull()
    const after = buyTierTickspeedAutobuyer(lastTier.id)(state)
    expect(after.tierTickspeedAutobuyer[lastTier.id]).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('costs 2x the first tier\'s unlock cost (2 PP)', () => {
    const state = withPrestigePoints(createInitialGameState(), 2)
    const after = buyTierTickspeedAutobuyer(tensTier.id)(state)
    expect(after.tierTickspeedAutobuyer[tensTier.id]).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('returns the same state for a tier that is not itself unlocked yet, even with plenty of points', () => {
    const state = withPrestigePoints(createInitialGameState(), 1000)
    expect(buyTierTickspeedAutobuyer(thousandsTier.id)(state)).toBe(state)
  })

  it('returns the same state when there are not enough points', () => {
    const state = withPrestigePoints(unlockedLastTierState(), 19)
    expect(buyTierTickspeedAutobuyer(lastTier.id)(state)).toBe(state)
  })

  it('returns the same state when already bought (one-time purchase)', () => {
    const state = withTierTickspeedAutobuyer(
      withPrestigePoints(unlockedLastTierState(), 20),
      lastTier.id
    )
    expect(buyTierTickspeedAutobuyer(lastTier.id)(state)).toBe(state)
  })

  it('is independent of Smart — buying one does not affect the other', () => {
    const state = withPrestigePoints(withAutobuyer(unlockedLastTierState(), lastTier.id, 1), 20)
    const after = buyTierTickspeedAutobuyer(lastTier.id)(state)
    expect(after.tierTickspeedAutobuyer[lastTier.id]).toBe(true)
    expect(after.smartAutobuyer[lastTier.id]).toBe(false)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(
      withPrestigePoints(unlockedLastTierState(), 20),
      GOOGOL
    )
    expect(buyTierTickspeedAutobuyer(lastTier.id)(state)).toBe(state)
  })

  it('returns the same state for an unknown tier id', () => {
    const state = withPrestigePoints(createInitialGameState(), 20)
    expect(buyTierTickspeedAutobuyer('does_not_exist')(state)).toBe(state)
  })
})

// ─── buyAutoPrestige ──────────────────────────────────────────────────────────

describe('buyAutoPrestige', () => {
  it('spends 1000 PP to activate Auto-Prestige at level 1', () => {
    const state = withPrestigePoints(createInitialGameState(), 1000)
    const after = buyAutoPrestige(state)
    expect(after.autoPrestige).toBe(1)
    expect(after.prestige.points).toBe(0)
  })

  it('costs 2000 PP for level 1 → 2, doubling each level after that', () => {
    const state = withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), 2000)
    const after = buyAutoPrestige(state)
    expect(after.autoPrestige).toBe(2)
    expect(after.prestige.points).toBe(0)

    const state2 = withPrestigePoints(withAutoPrestige(createInitialGameState(), 2), 4000)
    const after2 = buyAutoPrestige(state2)
    expect(after2.autoPrestige).toBe(3)
    expect(after2.prestige.points).toBe(0)
  })

  it('returns the same state when there are not enough points to activate', () => {
    const state = withPrestigePoints(createInitialGameState(), 999)
    expect(buyAutoPrestige(state)).toBe(state)
  })

  it('returns the same state when there are not enough points to upgrade', () => {
    const state = withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), 1999)
    expect(buyAutoPrestige(state)).toBe(state)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(withPrestigePoints(createInitialGameState(), 1000), GOOGOL)
    expect(buyAutoPrestige(state)).toBe(state)
  })
})

// ─── buyGlobalTickspeedMultiplier ───────────────────────────────────────────────

describe('isGlobalTickspeedMultiplierUnlocked', () => {
  it('is false with no tier02 owned and no level bought yet', () => {
    expect(isGlobalTickspeedMultiplierUnlocked(createInitialGameState())).toBe(false)
  })

  it('is true once at least 1 of the second tier is owned', () => {
    const state = withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1)
    expect(isGlobalTickspeedMultiplierUnlocked(state)).toBe(true)
  })

  it('stays true once the multiplier is already active, even with tier02 owned count back at 0', () => {
    const state = withGlobalTickspeedMultiplier(createInitialGameState(), 1)
    expect(isGlobalTickspeedMultiplierUnlocked(state)).toBe(true)
  })
})

describe('buyGlobalTickspeedMultiplier', () => {
  it('spends 10 Money to activate the global tickspeed multiplier at level 1', () => {
    const state = withMoney(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 10)
    const after = buyGlobalTickspeedMultiplier(state)
    expect(after.globalTickspeedMultiplier).toBe(1)
    expect(after.resources[MONEY_ID]).toBe(0)
  })

  it('costs 100 Money for level 1 → 2, another power of ten each level after that', () => {
    const state = withMoney(
      withGlobalTickspeedMultiplier(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 1),
      100
    )
    const after = buyGlobalTickspeedMultiplier(state)
    expect(after.globalTickspeedMultiplier).toBe(2)
    expect(after.resources[MONEY_ID]).toBe(0)

    const state2 = withMoney(
      withGlobalTickspeedMultiplier(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 2),
      1000
    )
    const after2 = buyGlobalTickspeedMultiplier(state2)
    expect(after2.globalTickspeedMultiplier).toBe(3)
    expect(after2.resources[MONEY_ID]).toBe(0)
  })

  it('returns the same state when not enough tier02 is owned to unlock it yet, even with plenty of Money', () => {
    const state = withMoney(createInitialGameState(), 1000)
    expect(buyGlobalTickspeedMultiplier(state)).toBe(state)
  })

  it('returns the same state when there is not enough Money to activate', () => {
    const state = withMoney(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 9)
    expect(buyGlobalTickspeedMultiplier(state)).toBe(state)
  })

  it('returns the same state when there is not enough Money to upgrade', () => {
    const state = withMoney(
      withGlobalTickspeedMultiplier(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 1),
      99
    )
    expect(buyGlobalTickspeedMultiplier(state)).toBe(state)
  })

  it('stays purchasable even if tier02 is reset back to 0 once the multiplier is already active', () => {
    const state = withMoney(withGlobalTickspeedMultiplier(createInitialGameState(), 1), 100)
    const after = buyGlobalTickspeedMultiplier(state)
    expect(after.globalTickspeedMultiplier).toBe(2)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), GOOGOL)
    expect(buyGlobalTickspeedMultiplier(state)).toBe(state)
  })
})

// ─── buyPrestigeSpeedBonus ─────────────────────────────────────────────────────

describe('buyPrestigeSpeedBonus', () => {
  it(`spends ${PRESTIGE_SPEED_BONUS_UNLOCK_COST} PP to permanently unlock the passive production-speed bonus`, () => {
    const state = withPrestigePoints(createInitialGameState(), PRESTIGE_SPEED_BONUS_UNLOCK_COST)
    const after = buyPrestigeSpeedBonus(state)
    expect(after.prestigeSpeedBonusUnlocked).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('leaves any points beyond the cost unspent', () => {
    const state = withPrestigePoints(createInitialGameState(), PRESTIGE_SPEED_BONUS_UNLOCK_COST + 50)
    const after = buyPrestigeSpeedBonus(state)
    expect(after.prestige.points).toBe(50)
  })

  it('returns the same state when there are not enough points', () => {
    const state = withPrestigePoints(createInitialGameState(), PRESTIGE_SPEED_BONUS_UNLOCK_COST - 1)
    expect(buyPrestigeSpeedBonus(state)).toBe(state)
  })

  it('returns the same state when already unlocked (one-time purchase)', () => {
    const state = withPrestigeSpeedBonusUnlocked(
      withPrestigePoints(createInitialGameState(), PRESTIGE_SPEED_BONUS_UNLOCK_COST)
    )
    expect(buyPrestigeSpeedBonus(state)).toBe(state)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(
      withPrestigePoints(createInitialGameState(), PRESTIGE_SPEED_BONUS_UNLOCK_COST),
      GOOGOL
    )
    expect(buyPrestigeSpeedBonus(state)).toBe(state)
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

  it('increments prestige count by 1', () => {
    const state = withMoney(createInitialGameState(), GOOGOL)
    const after = prestigeGame(state)
    expect(after.prestige.count).toBe(1)
  })

  it('awards 1 Prestige Point at exactly GOOGOL', () => {
    const state = withMoney(createInitialGameState(), GOOGOL)
    const after = prestigeGame(state)
    expect(after.prestige.points).toBe(1)
  })

  it('awards more Prestige Points once the exponent reaches a further full multiple of 100', () => {
    const state = withMoney(createInitialGameState(), GOOGOL * 1e100)
    const after = prestigeGame(state)
    expect(after.prestige.points).toBe(2)
  })

  it('adds newly-awarded points on top of any already-unspent points', () => {
    const state = withPrestigePoints(withMoney(createInitialGameState(), GOOGOL), 10)
    const after = prestigeGame(state)
    expect(after.prestige.points).toBe(11)
  })

  it('keeps an unlocked autobuyer permanently active across prestige, resetting the tier\'s tickspeed level to baseline (1)', () => {
    const state = withTickspeedLevel(
      withAutobuyer(
        withMoney(createInitialGameState(), GOOGOL),
        tensTier.id,
        1
      ),
      tensTier.id,
      3
    )
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).not.toBeNull()
    expect(after.tickspeedLevels[tensTier.id]).toBe(1)
  })

  it('keeps the smart autobuyer flag permanently across prestige', () => {
    const state = withSmartAutobuyer(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id
    )
    const after = prestigeGame(state)
    expect(after.smartAutobuyer[tensTier.id]).toBe(true)
  })

  it('keeps the tier tickspeed autobuyer flag permanently across prestige', () => {
    const state = withTierTickspeedAutobuyer(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id
    )
    const after = prestigeGame(state)
    expect(after.tierTickspeedAutobuyer[tensTier.id]).toBe(true)
  })

  it('keeps the Auto-Prestige level permanently across prestige', () => {
    const state = withAutoPrestige(withMoney(createInitialGameState(), GOOGOL), 3)
    const after = prestigeGame(state)
    expect(after.autoPrestige).toBe(3)
  })

  it('resets the global tickspeed multiplier level to not-yet-bought across prestige, same as Speed Up', () => {
    const state = withGlobalTickspeedMultiplier(withMoney(createInitialGameState(), GOOGOL), 3)
    const after = prestigeGame(state)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('keeps the prestige speed bonus unlock permanently across prestige', () => {
    const state = withPrestigeSpeedBonusUnlocked(
      withMoney(createInitialGameState(), GOOGOL)
    )
    const after = prestigeGame(state)
    expect(after.prestigeSpeedBonusUnlocked).toBe(true)
  })

  it('keeps the Speed Up count permanently across prestige', () => {
    const state = withSpeedUpCount(
      withMoney(createInitialGameState(), GOOGOL), 3
    )
    const after = prestigeGame(state)
    expect(after.speedUpCount).toBe(3)
  })

  it('keeps the Auto Speed Up flag permanently across prestige', () => {
    const state = withAutoSpeedUp(
      withMoney(createInitialGameState(), GOOGOL)
    )
    const after = prestigeGame(state)
    expect(after.autoSpeedUp).toBe(true)
  })

  it('keeps the Tickspeed Autobuyer flag permanently across prestige', () => {
    const state = withAutoGlobalTickspeed(
      withMoney(createInitialGameState(), GOOGOL)
    )
    const after = prestigeGame(state)
    expect(after.autoGlobalTickspeed).toBe(true)
  })

  it('resets the Auto-Prestige attempt budget to 0 on prestige', () => {
    const state = withAutoPrestigeBudget(
      withAutoPrestige(withMoney(createInitialGameState(), GOOGOL)),
      0.7
    )
    const after = prestigeGame(state)
    expect(after.autoPrestigeAttemptBudget).toBe(0)
  })

  it('resets XP to 0, a run-scoped currency unlike Prestige Points', () => {
    const state = withXP(withMoney(createInitialGameState(), GOOGOL), 7)
    const after = prestigeGame(state)
    expect(after.prestige.xp).toBe(0)
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

  it('keeps an unlocked tier\'s autobuyer flag active across prestige', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id, 1
    )
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).not.toBeNull()
  })

  it('resets a tier\'s tickspeed level back to the baseline (1) on prestige', () => {
    const state = withTickspeedLevel(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id, 3
    )
    const after = prestigeGame(state)
    expect(after.tickspeedLevels[tensTier.id]).toBe(1)
  })

  it('leaves a not-yet-active autobuyer locked (null) on prestige', () => {
    const state = withMoney(createInitialGameState(), GOOGOL)
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).toBeNull()
  })

  it('resets the last tier\'s owned count (disengaging its live XP tickspeed check) and resets lastTierXpConsumed to 0 across prestige', () => {
    const state = withLastTierXpConsumed(
      withLastTierTickspeedXpUnlocked(withMoney(createInitialGameState(), GOOGOL)),
      42
    )
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(true)
    const after = prestigeGame(state)
    expect(after.owned[lastTier.id]).toBe(0)
    expect(isLastTierTickspeedXpUnlocked(after)).toBe(false)
    expect(after.lastTierXpConsumed).toBe(0)
    // Buying back up to 10 re-engages the live check, but with nothing banked — the multiplier
    // starts fresh at the baseline (×1), not at the pre-reset bonus.
    const reEngaged = withOwned(after, lastTier.id, 10)
    expect(isLastTierTickspeedXpUnlocked(reEngaged)).toBe(true)
    expect(getLastTierXpTickspeedMultiplier(reEngaged.lastTierXpConsumed)).toBe(1)
  })

  it('resets everUnlockedTierIds on prestige, same as owned/purchased, so a tier relocks like it always has', () => {
    const state = withEverUnlockedTierIds(
      withOwned(withMoney(createInitialGameState(), GOOGOL), thousandsTier.id, 50),
      thousandsTier.id,
      true
    )
    const after = prestigeGame(state)
    expect(after.owned[thousandsTier.id]).toBe(0)
    expect(after.everUnlockedTierIds[thousandsTier.id]).toBe(false)
    expect(isTierUnlocked(after)(thousandsTier)).toBe(false)
  })
})

// ─── speedUpGame ─────────────────────────────────────────────────────────────

describe('speedUpGame', () => {
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  const eligibleState = () => withPurchased(createInitialGameState(), lastTier.id, 10)

  it('does nothing when the last tier has fewer than 10 lifetime purchases', () => {
    const state = withPurchased(createInitialGameState(), lastTier.id, 9)
    expect(speedUpGame(state)).toBe(state)
  })

  it('does nothing while production is frozen at GOOGOL', () => {
    const state = withMoney(eligibleState(), GOOGOL)
    expect(speedUpGame(state)).toBe(state)
  })

  it('increments speedUpCount by 1', () => {
    const after = speedUpGame(eligibleState())
    expect(after.speedUpCount).toBe(1)
  })

  it('requires a full block of 10 more on each subsequent activation', () => {
    // After 1 prior activation, the requirement is 20, not the flat 10 the first cycle needed.
    const stillTen = withSpeedUpCount(
      withPurchased(createInitialGameState(), lastTier.id, 10), 1
    )
    expect(speedUpGame(stillTen)).toBe(stillTen)

    const twenty = withSpeedUpCount(
      withPurchased(createInitialGameState(), lastTier.id, 20), 1
    )
    const after = speedUpGame(twenty)
    expect(after.speedUpCount).toBe(2)
  })

  it('stacks across repeated activations', () => {
    // getSpeedUpRequirement(2) = 30
    const state = withSpeedUpCount(
      withPurchased(createInitialGameState(), lastTier.id, 30), 2
    )
    const after = speedUpGame(state)
    expect(after.speedUpCount).toBe(3)
  })

  it('resets money to the starting amount', () => {
    const state = withMoney(eligibleState(), 99999)
    const after = speedUpGame(state)
    expect(after.resources[MONEY_ID]).toBe(10)
  })

  it('resets all owned and purchased counts to 0', () => {
    const state = withOwned(eligibleState(), tensTier.id, 50)
    const after = speedUpGame(state)
    TIER_DEFINITIONS.forEach(tier => {
      expect(after.owned[tier.id]).toBe(0)
      expect(after.purchased[tier.id]).toBe(0)
    })
  })

  it('keeps an unlocked tier\'s autobuyer flag active across Speed Up', () => {
    const state = withAutobuyer(eligibleState(), tensTier.id, 1)
    const after = speedUpGame(state)
    expect(after.autobuyers[tensTier.id]).not.toBeNull()
  })

  it('resets a tier\'s tickspeed level back to the baseline (1) on Speed Up', () => {
    const state = withTickspeedLevel(eligibleState(), tensTier.id, 3)
    const after = speedUpGame(state)
    expect(after.tickspeedLevels[tensTier.id]).toBe(1)
  })

  it('leaves a not-yet-active autobuyer locked (null)', () => {
    const after = speedUpGame(eligibleState())
    expect(after.autobuyers[tensTier.id]).toBeNull()
  })

  it('keeps the smart autobuyer flag permanently', () => {
    const state = withSmartAutobuyer(eligibleState(), tensTier.id)
    const after = speedUpGame(state)
    expect(after.smartAutobuyer[tensTier.id]).toBe(true)
  })

  it('keeps the tier tickspeed autobuyer flag permanently', () => {
    const state = withTierTickspeedAutobuyer(eligibleState(), tensTier.id)
    const after = speedUpGame(state)
    expect(after.tierTickspeedAutobuyer[tensTier.id]).toBe(true)
  })

  it('keeps the Auto-Prestige level permanently', () => {
    const state = withAutoPrestige(eligibleState(), 3)
    const after = speedUpGame(state)
    expect(after.autoPrestige).toBe(3)
  })

  it('resets the global tickspeed multiplier level back to not-yet-bought (null)', () => {
    // Unlike Prestige (see the prestigeGame describe block above), Speed Up is a much more
    // frequent soft-reset — the global tickspeed multiplier resets along with everything else
    // rather than carrying over, so a repeatedly-Speed-Up'd run can't keep stacking it for free.
    const state = withGlobalTickspeedMultiplier(eligibleState(), 3)
    const after = speedUpGame(state)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('keeps the Tickspeed Autobuyer (automation toggle) permanently even though the level itself resets', () => {
    const state = withAutoGlobalTickspeed(withGlobalTickspeedMultiplier(eligibleState(), 3))
    const after = speedUpGame(state)
    expect(after.autoGlobalTickspeed).toBe(true)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('keeps the prestige speed bonus unlock permanently', () => {
    const state = withPrestigeSpeedBonusUnlocked(eligibleState())
    const after = speedUpGame(state)
    expect(after.prestigeSpeedBonusUnlocked).toBe(true)
  })

  it('keeps the Auto Speed Up flag permanently', () => {
    const state = withAutoSpeedUp(eligibleState())
    const after = speedUpGame(state)
    expect(after.autoSpeedUp).toBe(true)
  })

  it('keeps the Tickspeed Autobuyer flag permanently', () => {
    const state = withAutoGlobalTickspeed(eligibleState())
    const after = speedUpGame(state)
    expect(after.autoGlobalTickspeed).toBe(true)
  })

  it('leaves Prestige Points and count untouched, but resets XP to 0', () => {
    const state = withXP(withPrestigePoints(eligibleState(), 42), 7)
    const after = speedUpGame(state)
    expect(after.prestige.points).toBe(42)
    expect(after.prestige.count).toBe(0)
    expect(after.prestige.xp).toBe(0)
  })

  it('resets the last tier\'s owned count (disengaging its live XP tickspeed check) and resets lastTierXpConsumed to 0 across Speed Up', () => {
    const state = withLastTierXpConsumed(
      withLastTierTickspeedXpUnlocked(eligibleState()),
      42
    )
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(true)
    const after = speedUpGame(state)
    expect(after.owned[lastTier.id]).toBe(0)
    expect(isLastTierTickspeedXpUnlocked(after)).toBe(false)
    expect(after.lastTierXpConsumed).toBe(0)
  })

  it('resets everUnlockedTierIds on Speed Up, same as owned/purchased, so a tier relocks like it always has', () => {
    const state = withEverUnlockedTierIds(
      withOwned(eligibleState(), thousandsTier.id, 50),
      thousandsTier.id,
      true
    )
    const after = speedUpGame(state)
    expect(after.owned[thousandsTier.id]).toBe(0)
    expect(after.everUnlockedTierIds[thousandsTier.id]).toBe(false)
    expect(isTierUnlocked(after)(thousandsTier)).toBe(false)
  })
})

// ─── buyAutoSpeedUp ──────────────────────────────────────────────────────────

describe('buyAutoSpeedUp', () => {
  it(`spends ${AUTO_SPEED_UP_COST} PP to permanently enable Auto Speed Up`, () => {
    const state = withPrestigePoints(createInitialGameState(), AUTO_SPEED_UP_COST)
    const after = buyAutoSpeedUp(state)
    expect(after.autoSpeedUp).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('returns the same state when there are not enough points', () => {
    const state = withPrestigePoints(createInitialGameState(), AUTO_SPEED_UP_COST - 1)
    expect(buyAutoSpeedUp(state)).toBe(state)
  })

  it('returns the same state when already enabled (one-time purchase)', () => {
    const state = withAutoSpeedUp(
      withPrestigePoints(createInitialGameState(), AUTO_SPEED_UP_COST)
    )
    expect(buyAutoSpeedUp(state)).toBe(state)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(
      withPrestigePoints(createInitialGameState(), AUTO_SPEED_UP_COST),
      GOOGOL
    )
    expect(buyAutoSpeedUp(state)).toBe(state)
  })
})

describe('buyTickspeedAutobuyer', () => {
  it(`spends ${TICKSPEED_AUTOBUYER_COST} PP to permanently automate the global tickspeed multiplier`, () => {
    const state = withPrestigePoints(createInitialGameState(), TICKSPEED_AUTOBUYER_COST)
    const after = buyTickspeedAutobuyer(state)
    expect(after.autoGlobalTickspeed).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('returns the same state when there are not enough points', () => {
    const state = withPrestigePoints(createInitialGameState(), TICKSPEED_AUTOBUYER_COST - 1)
    expect(buyTickspeedAutobuyer(state)).toBe(state)
  })

  it('returns the same state when already enabled (one-time purchase)', () => {
    const state = withAutoGlobalTickspeed(
      withPrestigePoints(createInitialGameState(), TICKSPEED_AUTOBUYER_COST)
    )
    expect(buyTickspeedAutobuyer(state)).toBe(state)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(
      withPrestigePoints(createInitialGameState(), TICKSPEED_AUTOBUYER_COST),
      GOOGOL
    )
    expect(buyTickspeedAutobuyer(state)).toBe(state)
  })
})

// ─── isLastTierTickspeedXpUnlocked ──────────────────────────────────────────

describe('isLastTierTickspeedXpUnlocked', () => {
  it('is false on a fresh state', () => {
    expect(isLastTierTickspeedXpUnlocked(createInitialGameState())).toBe(false)
  })

  it('is false while the last tier\'s owned count is below 10, regardless of its purchased count', () => {
    const state = withOwned(
      withPurchased(createInitialGameState(), lastTier.id, 50),
      lastTier.id,
      9
    )
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(false)
  })

  it('is true once the last tier\'s owned count reaches 10', () => {
    const state = withOwned(createInitialGameState(), lastTier.id, 10)
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(true)
  })

  it('is true above 10 owned too', () => {
    const state = withOwned(createInitialGameState(), lastTier.id, 250)
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(true)
  })

  it('reverts to false once owned drops back below 10 after having been unlocked', () => {
    const unlocked = withOwned(createInitialGameState(), lastTier.id, 10)
    expect(isLastTierTickspeedXpUnlocked(unlocked)).toBe(true)
    const droppedBack = withOwned(unlocked, lastTier.id, 3)
    expect(isLastTierTickspeedXpUnlocked(droppedBack)).toBe(false)
  })
})

// ─── getLastTierXpTickspeedMultiplier ───────────────────────────────────────

describe('getLastTierXpTickspeedMultiplier', () => {
  it('is ×1 (no bonus) with 0 XP consumed', () => {
    expect(getLastTierXpTickspeedMultiplier(0)).toBe(1)
  })

  it('compounds 1% per XP consumed, matching every other tier\'s multiplicative tickspeed form', () => {
    expect(getLastTierXpTickspeedMultiplier(37)).toBeCloseTo(1.01 ** 37)
    expect(getLastTierXpTickspeedMultiplier(100)).toBeCloseTo(1.01 ** 100)
  })

  it('grows faster than flat/additive growth once enough XP has been consumed', () => {
    // 1.01^100 ≈ 2.7048 — well above the +100% (×2) a flat/additive formula would give.
    expect(getLastTierXpTickspeedMultiplier(100)).toBeGreaterThan(2)
  })

  it('treats a negative/undefined amount as 0', () => {
    expect(getLastTierXpTickspeedMultiplier(-5)).toBe(1)
    expect(getLastTierXpTickspeedMultiplier(undefined)).toBe(1)
  })
})

// ─── getLastTierXpTickspeedMinConsumption ───────────────────────────────────

describe('getLastTierXpTickspeedMinConsumption', () => {
  it(`is the floor (${LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR}) before any XP has been consumed`, () => {
    expect(getLastTierXpTickspeedMinConsumption(0)).toBe(LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR)
  })

  it('is 10% of cumulative XP consumed so far, rounded up', () => {
    expect(getLastTierXpTickspeedMinConsumption(100)).toBe(10)
    expect(getLastTierXpTickspeedMinConsumption(101)).toBe(11) // ceil(10.1)
  })

  it('never drops below the floor even for a small non-zero cumulative amount', () => {
    expect(getLastTierXpTickspeedMinConsumption(5)).toBe(LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR)
  })
})

// ─── consumeXpForLastTierTickspeed ──────────────────────────────────────────

describe('consumeXpForLastTierTickspeed', () => {
  it('returns the same state when not yet unlocked, regardless of available XP', () => {
    const state = withXP(createInitialGameState(), 100)
    expect(consumeXpForLastTierTickspeed(50)(state)).toBe(state)
  })

  it('spends XP, grows lastTierXpConsumed, and resets tier 1 through the second-to-last tier\'s owned/resources counts to 0', () => {
    const secondToLastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 2]
    const state = withXP(
      withResource(
        withOwned(
          withLastTierTickspeedXpUnlocked(createInitialGameState()),
          secondToLastTier.id,
          77
        ),
        secondToLastTier.id,
        77
      ),
      50
    )
    const after = consumeXpForLastTierTickspeed(20)(state)
    expect(after.prestige.xp).toBe(30)
    expect(after.lastTierXpConsumed).toBe(20)
    expect(after.owned[secondToLastTier.id]).toBe(0)
    expect(after.resources[secondToLastTier.id]).toBe(0)
  })

  it('does not relock a tier whose owned it resets to 0, as long as it was ever unlocked (the everUnlockedTierIds fix)', () => {
    // Regression test: a tier reaching owned > 0 always latches everUnlockedTierIds permanently
    // (see buyTier/tickGame's latchEverUnlockedTiers calls) before this reset could ever run, so
    // isTierUnlocked must stay true even though both this tier's and its predecessor's owned drop
    // to 0 in the same action — otherwise every reset tier (and everything cascading from it)
    // would vanish from the Game view and stop producing/being buyable until it re-earns its way
    // back up from scratch.
    const megabytesTier = TIER_DEFINITIONS[2]
    const state = withXP(
      withEverUnlockedTierIds(
        withEverUnlockedTierIds(
          withOwned(withLastTierTickspeedXpUnlocked(createInitialGameState()), megabytesTier.id, 50),
          thousandsTier.id,
          true
        ),
        megabytesTier.id,
        true
      ),
      50
    )
    const after = consumeXpForLastTierTickspeed(20)(state)
    expect(after.owned[megabytesTier.id]).toBe(0)
    expect(after.owned[thousandsTier.id]).toBe(0)
    expect(isTierUnlocked(after)(megabytesTier)).toBe(true)
    expect(isTierUnlocked(after)(thousandsTier)).toBe(true)
  })

  it('does not touch the last tier\'s own owned/resources/purchased counts', () => {
    const state = withXP(
      withResource(
        withOwned(
          withPurchased(unlockedLastTierState(), lastTier.id, 15),
          lastTier.id,
          15
        ),
        lastTier.id,
        15
      ),
      50
    )
    const unlocked = withLastTierTickspeedXpUnlocked(state)
    const after = consumeXpForLastTierTickspeed(1)(unlocked)
    expect(after.owned[lastTier.id]).toBe(15)
    expect(after.resources[lastTier.id]).toBe(15)
    expect(after.purchased[lastTier.id]).toBe(15)
  })

  it('leaves every tier\'s purchased ("level") count completely untouched', () => {
    const state = withXP(
      withPurchased(
        withLastTierTickspeedXpUnlocked(createInitialGameState()),
        tensTier.id,
        25
      ),
      50
    )
    const after = consumeXpForLastTierTickspeed(20)(state)
    expect(after.purchased[tensTier.id]).toBe(25)
  })

  it('resets the Money balance to 0 alongside every other tier\'s owned/resources', () => {
    const state = withXP(
      withMoney(withLastTierTickspeedXpUnlocked(createInitialGameState()), 999999),
      50
    )
    const after = consumeXpForLastTierTickspeed(20)(state)
    expect(after.resources[MONEY_ID]).toBe(0)
  })

  it('accumulates lastTierXpConsumed across repeated consumptions', () => {
    let state = withXP(withLastTierTickspeedXpUnlocked(createInitialGameState()), 1000)
    state = consumeXpForLastTierTickspeed(10)(state) // min consumption is 1 XP; spend 10
    expect(state.lastTierXpConsumed).toBe(10)
    // Next minimum is ceil(0.1 * 10) = 1, well under the 100 available — spend more than the floor.
    state = consumeXpForLastTierTickspeed(5)(state)
    expect(state.lastTierXpConsumed).toBe(15)
  })

  it('refuses a consumption below the required minimum (10% of cumulative XP consumed so far)', () => {
    const state = withXP(
      withLastTierXpConsumed(withLastTierTickspeedXpUnlocked(createInitialGameState()), 100),
      50
    )
    // Minimum is ceil(0.1 * 100) = 10 — 9 is below it.
    expect(consumeXpForLastTierTickspeed(9)(state)).toBe(state)
  })

  it('refuses to spend more XP than is available', () => {
    const state = withXP(withLastTierTickspeedXpUnlocked(createInitialGameState()), 5)
    expect(consumeXpForLastTierTickspeed(6)(state)).toBe(state)
  })

  it('refuses a zero or non-positive amount', () => {
    const state = withXP(withLastTierTickspeedXpUnlocked(createInitialGameState()), 100)
    expect(consumeXpForLastTierTickspeed(0)(state)).toBe(state)
    expect(consumeXpForLastTierTickspeed(-5)(state)).toBe(state)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(
      withXP(withLastTierTickspeedXpUnlocked(createInitialGameState()), 100),
      GOOGOL
    )
    expect(consumeXpForLastTierTickspeed(10)(state)).toBe(state)
  })
})
