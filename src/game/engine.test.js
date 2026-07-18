import { describe, expect, it } from 'vitest'
import {
  applyOfflineProgress,
  buyAutobuyer,
  buyAutobuyerAutomation,
  buyAutoPrestige,
  buyAutoSpeedUp,
  buyPrestigeSpeedBonus,
  buySmartAutobuyer,
  buyTier,
  buyTierQuantity,
  createInitialGameState,
  formatAmount,
  formatCurrency,
  formatOfflineDuration,
  getAutobuyerAttemptRate,
  getAutobuyerAutomationCost,
  getAutobuyerCost,
  getAutoPrestigeAttemptRate,
  getAutoPrestigeCost,
  getCostEpochExponent,
  getMoneyExponent,
  getOfflineEffectiveSeconds,
  getPrestigePointsAwarded,
  getPrestigeProductionMultiplier,
  getPrestigeProgressPercent,
  getPurchaseMilestoneMultiplier,
  getSmartAutobuyerCost,
  getSpeedUpMultiplier,
  getSpeedUpRequirement,
  getTierAffordableQuantity,
  getTierBulkQuantity,
  getTierCost,
  getTierProductionProgressPercent,
  getTierPurchasedCount,
  getTierQuantityCost,
  getTierSpendableAmount,
  isProductionFrozen,
  isTierUnlocked,
  prestigeGame,
  speedUpGame,
  tickGame,
} from './engine'
import { AUTO_SPEED_UP_COST, GOOGOL, MAX_OFFLINE_SECONDS, MONEY_ID, PRESTIGE_SPEED_BONUS_UNLOCK_COST, TIER_DEFINITIONS } from './layers'

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

const withPrestigePoints = (state, points) => ({
  ...state,
  prestige: { ...state.prestige, points },
})

const withAutobuyerAutomation = (state, tierId, automated = true) => ({
  ...state,
  autobuyerAutomation: { ...state.autobuyerAutomation, [tierId]: automated },
})

const withSmartAutobuyer = (state, tierId, smart = true) => ({
  ...state,
  smartAutobuyer: { ...state.smartAutobuyer, [tierId]: smart },
})

const withAutoPrestige = (state, level = 1) => ({
  ...state,
  autoPrestige: level,
})

const withAutoPrestigeBudget = (state, budget) => ({
  ...state,
  autoPrestigeAttemptBudget: budget,
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

  it('initialises all tiers with autobuyerAutomation = false', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.autobuyerAutomation[tier.id]).toBe(false)
    })
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

// ─── getAutobuyerAutomationCost ───────────────────────────────────────────────

describe('getAutobuyerAutomationCost', () => {
  it('costs 1 PP for the first tier', () => {
    expect(getAutobuyerAutomationCost(tensTier.id)).toBe(1)
  })

  it('doubles for each subsequent tier', () => {
    expect(getAutobuyerAutomationCost(thousandsTier.id)).toBe(2)
    expect(getAutobuyerAutomationCost(TIER_DEFINITIONS[2].id)).toBe(4)
  })

  it('costs 512 PP for the last (10th) tier', () => {
    expect(getAutobuyerAutomationCost(TIER_DEFINITIONS[9].id)).toBe(512)
  })

  it('treats an unknown tier id as index 0 (cheapest tier)', () => {
    expect(getAutobuyerAutomationCost('does_not_exist')).toBe(1)
  })
})

// ─── getSmartAutobuyerCost ────────────────────────────────────────────────────

describe('getSmartAutobuyerCost', () => {
  it('costs 10x the automation cost for the first tier', () => {
    expect(getSmartAutobuyerCost(tensTier.id)).toBe(10)
  })

  it('costs 10x the automation cost for later tiers', () => {
    expect(getSmartAutobuyerCost(thousandsTier.id)).toBe(20)
    expect(getSmartAutobuyerCost(TIER_DEFINITIONS[9].id)).toBe(5120)
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

// ─── getTierProductionProgressPercent ───────────────────────────────────────

describe('getTierProductionProgressPercent', () => {
  it('is 0% on a fresh state', () => {
    expect(getTierProductionProgressPercent(createInitialGameState(), thousandsTier.id)).toBe(0)
  })

  it('reflects a partial fraction of a tier\'s tickspeed', () => {
    // Thousands' base tickspeed is 1s (same as every tier) — half a second's worth of elapsed
    // time banks half of it.
    const state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    const afterHalfSecond = tickGame(0.5)(state)
    expect(getTierProductionProgressPercent(afterHalfSecond, thousandsTier.id)).toBe(50)
  })

  it('drops back down to the banked remainder once a batch fires', () => {
    const state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    const afterOneTick = tickGame(1)(state)
    // The 1st tick crosses the 1s threshold and delivers a batch, banking 0s of remainder.
    expect(getTierProductionProgressPercent(afterOneTick, thousandsTier.id)).toBe(0)
  })

  it('is 100% for a 1s-tickspeed tier with a full second already banked', () => {
    expect(getTierProductionProgressPercent(
      { tierProductionAccumulators: { [tensTier.id]: 1 } },
      tensTier.id
    )).toBe(100)
  })

  it('reports 100% instead of the wrapped remainder when the previous accumulator just crossed the threshold', () => {
    // Thousands' tickspeed is 1s (same as every tier): a previous accumulator of 0 plus the
    // default 1 elapsed second crosses 1s, so a delivery just happened even though the
    // freshly-wrapped remainder is 0.
    const state = { tierProductionAccumulators: { [thousandsTier.id]: 0 } }
    expect(getTierProductionProgressPercent(state, thousandsTier.id, 0)).toBe(100)
  })

  it('falls through to the normal calculation when the previous accumulator has not yet crossed the threshold', () => {
    // previousAccumulator (0.4) + elapsedSeconds (0.1) = 0.5, below the 1s tickspeed threshold,
    // so this falls through to the normal accumulated/tickSpeed calculation using the raw stored
    // accumulator (0.5) instead of reporting 100.
    const state = { tierProductionAccumulators: { [thousandsTier.id]: 0.5 } }
    expect(getTierProductionProgressPercent(state, thousandsTier.id, 0.4, 0.1)).toBe(50)
  })

  it('reports a 1s-tickspeed tier as 100% for any non-negative previous accumulator', () => {
    const state = { tierProductionAccumulators: { [tensTier.id]: 0 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0)).toBe(100)
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
    // Tens' tickspeed is 1s: a previous accumulator of 0.95 plus a 0.1 elapsed tick crosses 1s.
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

  it('Thousands generators produce Tens resource and owned generators once its 1s base tickspeed accumulates, banking fractional sub-second ticks along the way', () => {
    let state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    // Every tier's base tickspeed is 1s — nine 0.1s ticks (the live game's real 10Hz cadence)
    // only accumulate toward that, they don't produce yet.
    for (let i = 0; i < 9; i++) {
      state = tickGame(0.1)(state)
      expect(state.resources[tensTier.id]).toBe(0)
    }
    expect(state.owned[tensTier.id]).toBe(10)
    // The 10th 0.1s tick crosses the 1s threshold and delivers one tick's worth (owned × 1).
    state = tickGame(0.1)(state)
    expect(state.resources[tensTier.id]).toBe(2)
    expect(state.owned[tensTier.id]).toBe(12) // 10 initial + 2 produced
  })

  it('a tier further down the line banks fractional sub-second ticks the same way', () => {
    const millionsTier = TIER_DEFINITIONS[2]
    let state = withOwned(
      withOwned(createInitialGameState(), thousandsTier.id, 10), // unlocks Millions
      millionsTier.id, 5
    )
    // The first 9 sub-second ticks only accumulate toward the 1s threshold — no production yet.
    for (let i = 0; i < 9; i++) {
      state = tickGame(0.1)(state)
      expect(state.resources[thousandsTier.id]).toBe(0)
    }
    // The 10th tick crosses the threshold and delivers exactly one tick's worth (owned × 1).
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

  it('automatically upgrades an autobuyer once per tick when automation is bought for that tier', () => {
    // Zero money so the ordinary autobuyer tier-purchase step (which also competes for money
    // and would otherwise nudge resources.tier01 via its own owned/resources sync) can't fire —
    // isolates this tick to just the automated Upgrade purchase under test.
    const state = withAutobuyerAutomation(
      withMoney(
        withResource(
          withAutobuyer(createInitialGameState(), tensTier.id, 1),
          tensTier.id,
          1_000_001
        ),
        0
      ),
      tensTier.id
    )
    const after = tickGame(1)(state)
    expect(after.autobuyers[tensTier.id]).toBe(2)
    expect(after.resources[tensTier.id]).toBe(1)
  })

  it('does not auto-upgrade a tier without automation bought', () => {
    const state = withResource(
      withAutobuyer(createInitialGameState(), tensTier.id, 1),
      tensTier.id,
      1_000_001
    )
    const after = tickGame(1)(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
  })

  it('auto-upgrade is a no-op when the tier cannot yet afford the next level', () => {
    const state = withAutobuyerAutomation(
      withAutobuyer(createInitialGameState(), tensTier.id, 1),
      tensTier.id
    )
    const after = tickGame(1)(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
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

  it('refuses to activate/upgrade once production is frozen at GOOGOL, even with plenty of the tier\'s own resource', () => {
    const state = withMoney(
      withResource(createInitialGameState(), tensTier.id, 1001),
      GOOGOL
    )
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

// ─── buyAutobuyerAutomation ──────────────────────────────────────────────────

describe('buyAutobuyerAutomation', () => {
  it('spends 1 PP to automate the first tier when its autobuyer is active', () => {
    const state = withPrestigePoints(
      withAutobuyer(createInitialGameState(), tensTier.id, 1),
      1
    )
    const after = buyAutobuyerAutomation(tensTier.id)(state)
    expect(after.autobuyerAutomation[tensTier.id]).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('costs 2 PP for the second tier', () => {
    const state = withPrestigePoints(
      withAutobuyer(createInitialGameState(), thousandsTier.id, 1),
      2
    )
    const after = buyAutobuyerAutomation(thousandsTier.id)(state)
    expect(after.autobuyerAutomation[thousandsTier.id]).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('returns the same state when there are not enough points', () => {
    const state = withPrestigePoints(
      withAutobuyer(createInitialGameState(), tensTier.id, 1),
      0
    )
    expect(buyAutobuyerAutomation(tensTier.id)(state)).toBe(state)
  })

  it('returns the same state when the tier\'s autobuyer is not yet active (non-first tiers only — see the first-tier bypass tests below)', () => {
    const state = withPrestigePoints(createInitialGameState(), 100)
    expect(buyAutobuyerAutomation(thousandsTier.id)(state)).toBe(state)
  })

  it('the first tier bypasses the "must already be active" requirement, activating its autobuyer at the baseline level as part of the same purchase', () => {
    const state = withPrestigePoints(createInitialGameState(), 1) // tier01's autobuyer is locked
    const after = buyAutobuyerAutomation(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
    expect(after.autobuyerAutomation[tensTier.id]).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('leaves an already-active first tier\'s autobuyer level untouched when automating', () => {
    const state = withPrestigePoints(
      withAutobuyer(createInitialGameState(), tensTier.id, 3),
      1
    )
    const after = buyAutobuyerAutomation(tensTier.id)(state)
    expect(after.autobuyers[tensTier.id]).toBe(3)
    expect(after.autobuyerAutomation[tensTier.id]).toBe(true)
  })

  it('still refuses to bypass-activate the first tier without enough points', () => {
    const state = withPrestigePoints(createInitialGameState(), 0)
    expect(buyAutobuyerAutomation(tensTier.id)(state)).toBe(state)
  })

  it('returns the same state when already automated (one-time purchase)', () => {
    const state = withAutobuyerAutomation(
      withPrestigePoints(withAutobuyer(createInitialGameState(), tensTier.id, 1), 100),
      tensTier.id
    )
    expect(buyAutobuyerAutomation(tensTier.id)(state)).toBe(state)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(
      withPrestigePoints(withAutobuyer(createInitialGameState(), tensTier.id, 1), 100),
      GOOGOL
    )
    expect(buyAutobuyerAutomation(tensTier.id)(state)).toBe(state)
  })

  it('returns the same state for an unknown tier id', () => {
    const state = withPrestigePoints(createInitialGameState(), 100)
    expect(buyAutobuyerAutomation('does_not_exist')(state)).toBe(state)
  })
})

// ─── buySmartAutobuyer ────────────────────────────────────────────────────────

describe('buySmartAutobuyer', () => {
  it('spends 10 PP to make the first tier smart once its autobuyer Upgrades are already automated', () => {
    const state = withPrestigePoints(
      withAutobuyerAutomation(withAutobuyer(createInitialGameState(), tensTier.id, 1), tensTier.id),
      10
    )
    const after = buySmartAutobuyer(tensTier.id)(state)
    expect(after.smartAutobuyer[tensTier.id]).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('costs 20 PP for the second tier', () => {
    const state = withPrestigePoints(
      withAutobuyerAutomation(withAutobuyer(createInitialGameState(), thousandsTier.id, 1), thousandsTier.id),
      20
    )
    const after = buySmartAutobuyer(thousandsTier.id)(state)
    expect(after.smartAutobuyer[thousandsTier.id]).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('returns the same state when auto-upgrade automation has not been bought yet, even with plenty of points', () => {
    const state = withPrestigePoints(
      withAutobuyer(createInitialGameState(), tensTier.id, 1),
      100
    )
    expect(buySmartAutobuyer(tensTier.id)(state)).toBe(state)
  })

  it('returns the same state when there are not enough points', () => {
    const state = withPrestigePoints(
      withAutobuyerAutomation(withAutobuyer(createInitialGameState(), tensTier.id, 1), tensTier.id),
      9
    )
    expect(buySmartAutobuyer(tensTier.id)(state)).toBe(state)
  })

  it('returns the same state when the tier\'s autobuyer is not yet active (so automation can\'t be bought either)', () => {
    const state = withPrestigePoints(createInitialGameState(), 100)
    expect(buySmartAutobuyer(tensTier.id)(state)).toBe(state)
  })

  it('returns the same state when already smart (one-time purchase)', () => {
    const state = withSmartAutobuyer(
      withPrestigePoints(
        withAutobuyerAutomation(withAutobuyer(createInitialGameState(), tensTier.id, 1), tensTier.id),
        100
      ),
      tensTier.id
    )
    expect(buySmartAutobuyer(tensTier.id)(state)).toBe(state)
  })

  it('refuses to spend once production is frozen at GOOGOL', () => {
    const state = withMoney(
      withPrestigePoints(
        withAutobuyerAutomation(withAutobuyer(createInitialGameState(), tensTier.id, 1), tensTier.id),
        100
      ),
      GOOGOL
    )
    expect(buySmartAutobuyer(tensTier.id)(state)).toBe(state)
  })

  it('returns the same state for an unknown tier id', () => {
    const state = withPrestigePoints(createInitialGameState(), 100)
    expect(buySmartAutobuyer('does_not_exist')(state)).toBe(state)
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

  it('keeps autobuyer automation permanently across prestige', () => {
    const state = withAutobuyerAutomation(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id
    )
    const after = prestigeGame(state)
    expect(after.autobuyerAutomation[tensTier.id]).toBe(true)
  })

  it('keeps the smart autobuyer flag permanently across prestige', () => {
    const state = withSmartAutobuyer(
      withMoney(createInitialGameState(), GOOGOL),
      tensTier.id
    )
    const after = prestigeGame(state)
    expect(after.smartAutobuyer[tensTier.id]).toBe(true)
  })

  it('keeps the Auto-Prestige level permanently across prestige', () => {
    const state = withAutoPrestige(withMoney(createInitialGameState(), GOOGOL), 3)
    const after = prestigeGame(state)
    expect(after.autoPrestige).toBe(3)
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

  it('resets the Auto-Prestige attempt budget to 0 on prestige', () => {
    const state = withAutoPrestigeBudget(
      withAutoPrestige(withMoney(createInitialGameState(), GOOGOL)),
      0.7
    )
    const after = prestigeGame(state)
    expect(after.autoPrestigeAttemptBudget).toBe(0)
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

  it('keeps an active autobuyer active at the baseline level (1)', () => {
    const state = withAutobuyer(eligibleState(), tensTier.id, 3)
    const after = speedUpGame(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
  })

  it('leaves a not-yet-active autobuyer locked (null)', () => {
    const after = speedUpGame(eligibleState())
    expect(after.autobuyers[tensTier.id]).toBeNull()
  })

  it('keeps autobuyer automation permanently', () => {
    const state = withAutobuyerAutomation(eligibleState(), tensTier.id)
    const after = speedUpGame(state)
    expect(after.autobuyerAutomation[tensTier.id]).toBe(true)
  })

  it('keeps the smart autobuyer flag permanently', () => {
    const state = withSmartAutobuyer(eligibleState(), tensTier.id)
    const after = speedUpGame(state)
    expect(after.smartAutobuyer[tensTier.id]).toBe(true)
  })

  it('keeps the Auto-Prestige level permanently', () => {
    const state = withAutoPrestige(eligibleState(), 3)
    const after = speedUpGame(state)
    expect(after.autoPrestige).toBe(3)
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

  it('leaves Prestige Points, count, and XP completely untouched', () => {
    const state = withXP(withPrestigePoints(eligibleState(), 42), 7)
    const after = speedUpGame(state)
    expect(after.prestige.points).toBe(42)
    expect(after.prestige.count).toBe(0)
    expect(after.prestige.xp).toBe(7)
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
