import { describe, expect, it } from 'vitest'
import {
  applyAutobuyerMilestones,
  applyOfflineProgress,
  buyAutoPrestige,
  buyAutoPrestigeAutobuyer,
  buyAutoSpeedUp,
  buyGlobalTickspeedMultiplier,
  buyPrestigeSpeedBonus,
  buySmartAutobuyer,
  buyTickspeedAutobuyer,
  buyTickspeedMultiplier,
  buyTier,
  buyTierQuantity,
  combineIntroByte,
  consumeXpForLastTierTickspeed,
  convertIntroBitsToKilobytes,
  createInitialGameState,
  getIntroProductionRate,
  isIntroConversionUnlocked,
  pickIntroCapacityMilestone,
  pickIntroProductionMilestone,
  setAutobuyerEnabled,
  setAutoGlobalTickspeedEnabled,
  setAutoPrestigeAutobuyerEnabled,
  setAutoPrestigeEnabled,
  setAutoSpeedUpEnabled,
  setTierTickspeedAutobuyerEnabled,
  formatAmount,
  formatCurrency,
  formatOfflineDuration,
  getAutobuyerUnlockCost,
  getAutobuyerUnlockMilestone,
  getAutoPrestigeAttemptRate,
  getAutoPrestigeCost,
  getCostEpochExponent,
  getEffectiveTierTickSpeedSeconds,
  getGlobalTickspeedMultiplierCost,
  getGlobalTickspeedProductionMultiplier,
  getGlobalTickspeedRegularStep,
  getIntroProductionMilestoneCost,
  getIntroProductionMilestoneMaxClaims,
  getIntroTransferBudget,
  getLastTierXpTickspeedMinConsumption,
  getLastTierXpTickspeedMultiplier,
  getMoneyExponent,
  getOfflineEffectiveSeconds,
  getOverclockRequirement,
  getPrestigePointsAwarded,
  getPrestigeProductionMultiplier,
  getPrestigeProgressPercent,
  getPurchaseBlockSize,
  getPurchaseMilestoneMultiplier,
  getSmartAutobuyerCost,
  getTierTickspeedAutobuyerMilestone,
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
  overclockGame,
  prestigeGame,
  speedUpGame,
  tapIntroBit,
  tickGame,
  tickIntroAutoInvest,
  tickIntroProduction,
} from './engine'
import { AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_SPEED_UP_COST, DEFAULT_PURCHASE_BLOCK_SIZE, getTierBaseTickSpeedSeconds, GOOGOL, INTRO_AUTO_INVEST_THRESHOLD, INTRO_BITS_PER_KILOBYTE_CONVERSION, INTRO_BYTE_COMBINE_COST, INTRO_CAPACITY_MULTIPLIER, INTRO_MIN_TICK_SPEED_SECONDS, INTRO_PRODUCTION_MULTIPLIER_STEP, INTRO_STARTING_CAPACITY, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR, MAX_OFFLINE_SECONDS, MONEY_ID, PRESTIGE_SPEED_BONUS_UNLOCK_COST, PRESTIGE_THRESHOLD, TICKSPEED_AUTOBUYER_COST, TIER_DEFINITIONS } from './layers'

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

const withPurchaseLevel = (state, tierId, level) => ({
  ...state,
  purchaseLevels: { ...state.purchaseLevels, [tierId]: level },
})

const withPurchaseLevelProgress = (state, tierId, progress) => ({
  ...state,
  purchaseLevelProgress: { ...state.purchaseLevelProgress, [tierId]: progress },
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

const withPrestigeCount = (state, count) => ({
  ...state,
  prestige: { ...state.prestige, count },
})

const withSmartAutobuyer = (state, tierId, smart = true) => ({
  ...state,
  smartAutobuyer: { ...state.smartAutobuyer, [tierId]: smart },
})

const withTierTickspeedAutobuyer = (state, tierId, active = true) => ({
  ...state,
  tierTickspeedAutobuyer: { ...state.tierTickspeedAutobuyer, [tierId]: active },
})

const withAutobuyerEnabled = (state, tierId, enabled) => ({
  ...state,
  autobuyersEnabled: { ...state.autobuyersEnabled, [tierId]: enabled },
})

const withTierTickspeedAutobuyerEnabled = (state, tierId, enabled) => ({
  ...state,
  tierTickspeedAutobuyerEnabled: { ...state.tierTickspeedAutobuyerEnabled, [tierId]: enabled },
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

const withOverclockCount = (state, count) => ({
  ...state,
  overclockCount: count,
})

const withAutoSpeedUp = (state, active = true) => ({
  ...state,
  autoSpeedUp: active,
})

const withAutoGlobalTickspeed = (state, active = true) => ({
  ...state,
  autoGlobalTickspeed: active,
})

const withAutoSpeedUpEnabled = (state, enabled) => ({
  ...state,
  autoSpeedUpEnabled: enabled,
})

const withAutoGlobalTickspeedEnabled = (state, enabled) => ({
  ...state,
  autoGlobalTickspeedEnabled: enabled,
})

const withAutoPrestigeEnabled = (state, enabled) => ({
  ...state,
  autoPrestigeEnabled: enabled,
})

const withAutoPrestigeAutobuyer = (state, active = true) => ({
  ...state,
  autoPrestigeAutobuyer: active,
})

const withAutoPrestigeAutobuyerEnabled = (state, enabled) => ({
  ...state,
  autoPrestigeAutobuyerEnabled: enabled,
})

// isLastTierTickspeedXpUnlocked is a live check against the last tier's current owned count vs.
// the current (dynamic) block size (see engine.js) — this helper ensures that's satisfied by
// raising owned to at least that block size if it isn't already there, without clobbering a test's
// own higher value for it.
const withLastTierTickspeedXpUnlocked = (state, unlocked = true) => ({
  ...state,
  owned: {
    ...state.owned,
    [lastTier.id]: unlocked ? Math.max(state.owned[lastTier.id] ?? 0, getPurchaseBlockSize(state)) : state.owned[lastTier.id],
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

const withIntro = (state, overrides) => ({
  ...state,
  intro: { ...state.intro, ...overrides },
})

// Drops the given top-level keys from state entirely (rather than setting them to null/undefined)
// — used to simulate a state object that predates a field's introduction, exercising this file's
// many `?.`/`??` defensive fallbacks (see engine.js) that a value merely being falsy/0 doesn't.
const omit = (state, ...keys) => {
  const copy = { ...state }
  keys.forEach(key => delete copy[key])
  return copy
}

// TIER_DEFINITIONS[0] ('Kilobytes') both costs and produces the base currency (Bits) — the
// entry-level generator (the standalone Byte Foundry pre-game tap screen sits below it).
// TIER_DEFINITIONS[1] ('Megabytes') is the first tier that needs unlocking (a full purchase
// block of Kilobytes owned) and produces Kilobytes.
const tensTier = TIER_DEFINITIONS[0]
const thousandsTier = TIER_DEFINITIONS[1]

// ─── createInitialGameState ─────────────────────────────────────────────────

describe('createInitialGameState', () => {
  it('starts with MONEY_STARTING_AMOUNT money', () => {
    const state = createInitialGameState()
    expect(state.resources[MONEY_ID]).toBe(1)
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

  it('initialises all tiers with autobuyersEnabled/tierTickspeedAutobuyerEnabled = true', () => {
    const state = createInitialGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(state.autobuyersEnabled[tier.id]).toBe(true)
      expect(state.tierTickspeedAutobuyerEnabled[tier.id]).toBe(true)
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

  it('initialises the three global automations\' enabled (pause/resume) flags to true', () => {
    const state = createInitialGameState()
    expect(state.autoSpeedUpEnabled).toBe(true)
    expect(state.autoGlobalTickspeedEnabled).toBe(true)
    expect(state.autoPrestigeEnabled).toBe(true)
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

// ─── Byte Foundry intro ────────────────────────────────────────────────────────

describe('getIntroProductionRate', () => {
  it('is 1 bit/sec at the starting tickSpeedSeconds/productionMultiplier', () => {
    const { intro } = createInitialGameState()
    expect(getIntroProductionRate(intro)).toBe(1)
  })

  it('scales inversely with tickSpeedSeconds', () => {
    expect(getIntroProductionRate({ productionMultiplier: 1, tickSpeedSeconds: 0.5 })).toBe(2)
    expect(getIntroProductionRate({ productionMultiplier: 1, tickSpeedSeconds: 0.125 })).toBe(8)
  })

  it('scales directly with productionMultiplier once tickSpeedSeconds is floored', () => {
    expect(getIntroProductionRate({ productionMultiplier: 2, tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS })).toBe(2 / INTRO_MIN_TICK_SPEED_SECONDS)
    expect(getIntroProductionRate({ productionMultiplier: 4, tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS })).toBe(4 / INTRO_MIN_TICK_SPEED_SECONDS)
  })
})

describe('tapIntroBit', () => {
  it('credits the current production rate (getIntroProductionRate), not a flat 1, once the rate has grown', () => {
    const state = withIntro(createInitialGameState(), { tickSpeedSeconds: 0.25, productionMultiplier: 1, capacity: 1000 })
    const after = tapIntroBit(state)
    expect(after.intro.bits).toBe(4)
  })

  it('still credits exactly 1 bit at the starting rate (unchanged bootstrap behavior)', () => {
    const state = createInitialGameState()
    const after = tapIntroBit(state)
    expect(after.intro.bits).toBe(1)
  })

  it('caps at capacity rather than overshooting', () => {
    const state = withIntro(createInitialGameState(), { bits: 7, capacity: 8, productionMultiplier: 1, tickSpeedSeconds: 0.1 })
    const after = tapIntroBit(state)
    expect(after.intro.bits).toBe(8)
  })

  it('is a no-op once already full', () => {
    const state = withIntro(createInitialGameState(), { bits: 8, capacity: 8 })
    expect(tapIntroBit(state)).toBe(state)
  })

  it('keeps working after mainGameUnlocked — nothing about tapping ever freezes', () => {
    const state = withIntro(createInitialGameState(), { mainGameUnlocked: true, bits: 0, capacity: 8 })
    const after = tapIntroBit(state)
    expect(after.intro.bits).toBe(1)
  })
})

describe('combineIntroByte', () => {
  it('consumes INTRO_BYTE_COMBINE_COST bits and sets byteCreated', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_BYTE_COMBINE_COST })
    const after = combineIntroByte(state)
    expect(after.intro.byteCreated).toBe(true)
    expect(after.intro.bits).toBe(0)
  })

  it('is a no-op below the combine cost', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_BYTE_COMBINE_COST - 1 })
    expect(combineIntroByte(state)).toBe(state)
  })

  it('is a no-op once already created', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_BYTE_COMBINE_COST, byteCreated: true })
    expect(combineIntroByte(state)).toBe(state)
  })
})

describe('pickIntroCapacityMilestone', () => {
  it('requires a full balance, drains it, and multiplies capacity by INTRO_CAPACITY_MULTIPLIER', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY, capacity: INTRO_STARTING_CAPACITY, byteCreated: true })
    const after = pickIntroCapacityMilestone(state)
    expect(after.intro.bits).toBe(0)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY * INTRO_CAPACITY_MULTIPLIER)
  })

  it('is a no-op below a full balance', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY - 1, capacity: INTRO_STARTING_CAPACITY })
    expect(pickIntroCapacityMilestone(state)).toBe(state)
  })

  it('keeps working after mainGameUnlocked — nothing about Sacrifice ever freezes', () => {
    const state = withIntro(createInitialGameState(), { mainGameUnlocked: true, bits: INTRO_STARTING_CAPACITY, capacity: INTRO_STARTING_CAPACITY })
    const after = pickIntroCapacityMilestone(state)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY * INTRO_CAPACITY_MULTIPLIER)
  })

  it('does not touch tickSpeedSeconds/productionMultiplier', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY, capacity: INTRO_STARTING_CAPACITY, tickSpeedSeconds: 0.25, productionMultiplier: 2,
    })
    const after = pickIntroCapacityMilestone(state)
    expect(after.intro.tickSpeedSeconds).toBe(0.25)
    expect(after.intro.productionMultiplier).toBe(2)
  })
})

describe('getIntroProductionMilestoneCost', () => {
  it('is INTRO_STARTING_CAPACITY at tier 0, growing by INTRO_CAPACITY_MULTIPLIER per tier', () => {
    expect(getIntroProductionMilestoneCost(0)).toBe(INTRO_STARTING_CAPACITY)
    expect(getIntroProductionMilestoneCost(1)).toBe(INTRO_STARTING_CAPACITY * INTRO_CAPACITY_MULTIPLIER)
    expect(getIntroProductionMilestoneCost(2)).toBe(INTRO_STARTING_CAPACITY * INTRO_CAPACITY_MULTIPLIER ** 2)
    expect(getIntroProductionMilestoneCost(3)).toBe(INTRO_STARTING_CAPACITY * INTRO_CAPACITY_MULTIPLIER ** 3)
  })
})

describe('getIntroProductionMilestoneMaxClaims', () => {
  it('grants 2 claims for the three tiers below INTRO_AUTO_INVEST_THRESHOLD (1/10/100 Bytes)', () => {
    expect(getIntroProductionMilestoneMaxClaims(0)).toBe(2)
    expect(getIntroProductionMilestoneMaxClaims(1)).toBe(2)
    expect(getIntroProductionMilestoneMaxClaims(2)).toBe(2)
  })

  it('grants only 1 claim from the tier reaching INTRO_AUTO_INVEST_THRESHOLD (1000 Bytes) on', () => {
    expect(getIntroProductionMilestoneCost(3)).toBe(INTRO_AUTO_INVEST_THRESHOLD)
    expect(getIntroProductionMilestoneMaxClaims(3)).toBe(1)
    expect(getIntroProductionMilestoneMaxClaims(4)).toBe(1)
    expect(getIntroProductionMilestoneMaxClaims(5)).toBe(1)
  })
})

describe('pickIntroProductionMilestone', () => {
  it('halves tickSpeedSeconds (speeds up delivery) while that stays at/above INTRO_MIN_TICK_SPEED_SECONDS', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY, tickSpeedSeconds: 1, productionMultiplier: 1 })
    const after = pickIntroProductionMilestone(state)
    expect(after.intro.tickSpeedSeconds).toBe(1 / INTRO_PRODUCTION_MULTIPLIER_STEP)
    expect(after.intro.productionMultiplier).toBe(1)
  })

  it('spends exactly this tier\'s cost, independent of the (much larger) current capacity', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY, capacity: 8000, tickSpeedSeconds: 1 })
    const after = pickIntroProductionMilestone(state)
    expect(after.intro.bits).toBe(0)
  })

  it('does not require a full Memory balance — only enough bits to cover this tier\'s cost', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY, capacity: 8000, tickSpeedSeconds: 1 })
    expect(state.intro.bits).toBeLessThan(state.intro.capacity)
    const after = pickIntroProductionMilestone(state)
    expect(after.intro).not.toBe(state.intro)
  })

  it('switches to multiplying productionMultiplier once halving tickSpeedSeconds would breach the floor', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY, tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS, productionMultiplier: 1,
    })
    const after = pickIntroProductionMilestone(state)
    expect(after.intro.tickSpeedSeconds).toBe(INTRO_MIN_TICK_SPEED_SECONDS)
    expect(after.intro.productionMultiplier).toBe(INTRO_PRODUCTION_MULTIPLIER_STEP)
  })

  it('doubles the effective bits/sec rate either way', () => {
    const speedingUp = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY, tickSpeedSeconds: 1, productionMultiplier: 1 })
    const afterSpeedUp = pickIntroProductionMilestone(speedingUp)
    expect(getIntroProductionRate(afterSpeedUp.intro)).toBe(getIntroProductionRate(speedingUp.intro) * INTRO_PRODUCTION_MULTIPLIER_STEP)

    const scalingAmount = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY, tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS, productionMultiplier: 2 })
    const afterScaleUp = pickIntroProductionMilestone(scalingAmount)
    expect(getIntroProductionRate(afterScaleUp.intro)).toBe(getIntroProductionRate(scalingAmount.intro) * INTRO_PRODUCTION_MULTIPLIER_STEP)
  })

  it('grants a second claim at the same tier 0 cost before advancing', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY, tickSpeedSeconds: 1, productionMultiplier: 1 })
    const afterFirst = pickIntroProductionMilestone(state)
    expect(afterFirst.intro.productionMilestoneTier).toBe(0)
    expect(afterFirst.intro.productionMilestoneTierClaims).toBe(1)

    const refilled = withIntro(afterFirst, { bits: INTRO_STARTING_CAPACITY })
    const afterSecond = pickIntroProductionMilestone(refilled)
    expect(afterSecond.intro.productionMilestoneTier).toBe(1)
    expect(afterSecond.intro.productionMilestoneTierClaims).toBe(0)
  })

  it('advances tier only after both claims at a 2-claim tier are used, then is claimable again at the new (10x) cost', () => {
    const twiceClaimed = withIntro(createInitialGameState(), {
      bits: 0, tickSpeedSeconds: 1, productionMultiplier: 1, productionMilestoneTier: 1, productionMilestoneTierClaims: 0,
    })
    const refilled = withIntro(twiceClaimed, { bits: getIntroProductionMilestoneCost(1) })
    const after = pickIntroProductionMilestone(refilled)
    expect(after.intro.productionMilestoneTier).toBe(1)
    expect(after.intro.productionMilestoneTierClaims).toBe(1)
    expect(after.intro.bits).toBe(0)
  })

  it('grants only a single claim per tier once past INTRO_AUTO_INVEST_THRESHOLD (tier 4+)', () => {
    const state = withIntro(createInitialGameState(), {
      bits: getIntroProductionMilestoneCost(4), tickSpeedSeconds: 1, productionMultiplier: 1, productionMilestoneTier: 4, productionMilestoneTierClaims: 0,
    })
    const after = pickIntroProductionMilestone(state)
    expect(after.intro.productionMilestoneTier).toBe(5)
    expect(after.intro.productionMilestoneTierClaims).toBe(0)
  })

  it('is a no-op below this tier\'s cost', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY - 1 })
    expect(pickIntroProductionMilestone(state)).toBe(state)
  })

  it('is a no-op once every claim at the current tier has already been made (defensive — normal play never leaves state in this shape, since a completed tier auto-advances)', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY, productionMilestoneTier: 0, productionMilestoneTierClaims: 2,
    })
    expect(pickIntroProductionMilestone(state)).toBe(state)
  })

  it('keeps working after mainGameUnlocked — nothing about Invest ever freezes', () => {
    const state = withIntro(createInitialGameState(), { mainGameUnlocked: true, bits: INTRO_STARTING_CAPACITY, tickSpeedSeconds: 1, productionMultiplier: 1 })
    const after = pickIntroProductionMilestone(state)
    expect(after.intro).not.toBe(state.intro)
  })
})

describe('isIntroConversionUnlocked', () => {
  it('is false below INTRO_CONVERSION_UNLOCK_CAPACITY', () => {
    const state = withIntro(createInitialGameState(), { capacity: 800 })
    expect(isIntroConversionUnlocked(state)).toBe(false)
  })

  it('is true once capacity reaches INTRO_CONVERSION_UNLOCK_CAPACITY', () => {
    const state = withIntro(createInitialGameState(), { capacity: 1000 })
    expect(isIntroConversionUnlocked(state)).toBe(true)
  })
})

describe('getIntroTransferBudget', () => {
  it('is INTRO_AUTO_INVEST_THRESHOLD (DEFAULT_PURCHASE_BLOCK_SIZE Kilobyte units) at a fresh cycle\'s default block size', () => {
    expect(getIntroTransferBudget(createInitialGameState())).toBe(INTRO_AUTO_INVEST_THRESHOLD)
  })

  it('grows with the Kilobyte tier\'s own current purchase block size, not a fixed constant', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withPurchaseLevel(createInitialGameState(), lastTier.id, 101)
    expect(getPurchaseBlockSize(state)).toBe(9)
    expect(getIntroTransferBudget(state)).toBe(9 * INTRO_BITS_PER_KILOBYTE_CONVERSION)
  })
})

describe('convertIntroBitsToKilobytes', () => {
  const firstTierId = TIER_DEFINITIONS[0].id

  it('spends INTRO_BITS_PER_KILOBYTE_CONVERSION bits and grants 1 free unit of the first tier', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_BITS_PER_KILOBYTE_CONVERSION, capacity: 1000 })
    const after = convertIntroBitsToKilobytes(state)
    expect(after.intro.bits).toBe(0)
    expect(after.owned[firstTierId]).toBe(1)
  })

  it('is a no-op below the conversion cost', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_BITS_PER_KILOBYTE_CONVERSION - 1, capacity: 1000 })
    expect(convertIntroBitsToKilobytes(state)).toBe(state)
  })

  it('flips mainGameUnlocked and grows bitsTransferredThisCycle on a successful convert', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_BITS_PER_KILOBYTE_CONVERSION, capacity: 1000 })
    const after = convertIntroBitsToKilobytes(state)
    expect(after.intro.mainGameUnlocked).toBe(true)
    expect(after.intro.bitsTransferredThisCycle).toBe(INTRO_BITS_PER_KILOBYTE_CONVERSION)
  })

  it('keeps working after mainGameUnlocked, as long as budget remains', () => {
    const state = withIntro(createInitialGameState(), {
      mainGameUnlocked: true, bits: INTRO_BITS_PER_KILOBYTE_CONVERSION, capacity: 2000, bitsTransferredThisCycle: INTRO_BITS_PER_KILOBYTE_CONVERSION,
    })
    const after = convertIntroBitsToKilobytes(state)
    expect(after.intro.bitsTransferredThisCycle).toBe(INTRO_BITS_PER_KILOBYTE_CONVERSION * 2)
    expect(after.owned[firstTierId]).toBe(1)
  })

  it('is a no-op once this cycle\'s shared transfer budget is exhausted', () => {
    const state = withIntro(createInitialGameState(), {
      mainGameUnlocked: true, bits: INTRO_BITS_PER_KILOBYTE_CONVERSION, capacity: INTRO_AUTO_INVEST_THRESHOLD, bitsTransferredThisCycle: INTRO_AUTO_INVEST_THRESHOLD,
    })
    expect(convertIntroBitsToKilobytes(state)).toBe(state)
  })

  it('is a no-op if the remaining budget can\'t cover a full 1000-bit transfer', () => {
    const state = withIntro(createInitialGameState(), {
      mainGameUnlocked: true, bits: INTRO_BITS_PER_KILOBYTE_CONVERSION, capacity: INTRO_AUTO_INVEST_THRESHOLD, bitsTransferredThisCycle: INTRO_AUTO_INVEST_THRESHOLD - 500,
    })
    expect(convertIntroBitsToKilobytes(state)).toBe(state)
  })

  it('respects the dynamic (block-size-grown) budget rather than the old fixed 8000', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withIntro(withPurchaseLevel(createInitialGameState(), lastTier.id, 101), {
      mainGameUnlocked: true, bits: INTRO_BITS_PER_KILOBYTE_CONVERSION, bitsTransferredThisCycle: INTRO_AUTO_INVEST_THRESHOLD,
    })
    // Block size grew to 9 (see getPurchaseBlockSize), so the transfer budget is now 9000 bits —
    // another 1000-bit transfer is still allowed even though bitsTransferredThisCycle already
    // equals the OLD fixed 8000 constant this replaced.
    expect(getPurchaseBlockSize(state)).toBe(9)
    const after = convertIntroBitsToKilobytes(state)
    expect(after.intro.bitsTransferredThisCycle).toBe(INTRO_AUTO_INVEST_THRESHOLD + INTRO_BITS_PER_KILOBYTE_CONVERSION)
  })
})

describe('tickIntroProduction', () => {
  it('is a no-op before byteCreated', () => {
    const state = createInitialGameState()
    expect(tickIntroProduction(1)(state)).toBe(state)
  })

  it('keeps producing after mainGameUnlocked — nothing about passive production ever freezes', () => {
    const state = withIntro(createInitialGameState(), { byteCreated: true, mainGameUnlocked: true, tickSpeedSeconds: 1, productionMultiplier: 1, capacity: 100 })
    const after = tickIntroProduction(1)(state)
    expect(after.intro.bits).toBe(1)
  })

  it('delivers nothing before a full tickSpeedSeconds period has accumulated, banking the partial progress', () => {
    const state = withIntro(createInitialGameState(), { byteCreated: true, tickSpeedSeconds: 1, productionMultiplier: 1, capacity: 100 })
    const after = tickIntroProduction(0.4)(state)
    expect(after.intro.bits).toBe(0)
    expect(after.intro.productionAccumulator).toBeCloseTo(0.4)
  })

  it('delivers exactly one batch once a full period elapses, banking the remainder', () => {
    const state = withIntro(createInitialGameState(), { byteCreated: true, tickSpeedSeconds: 1, productionMultiplier: 3, capacity: 100 })
    const after = tickIntroProduction(1.4)(state)
    expect(after.intro.bits).toBe(3)
    expect(after.intro.productionAccumulator).toBeCloseTo(0.4)
  })

  it('delivers multiple batches in one call when several periods elapse at once', () => {
    const state = withIntro(createInitialGameState(), { byteCreated: true, tickSpeedSeconds: 0.5, productionMultiplier: 2, capacity: 1000 })
    const after = tickIntroProduction(2)(state)
    // 2s / 0.5s per period = 4 periods, 2 bits each.
    expect(after.intro.bits).toBe(8)
  })

  it('caps delivered bits at capacity rather than overshooting', () => {
    const state = withIntro(createInitialGameState(), { byteCreated: true, bits: 5, capacity: 8, tickSpeedSeconds: 1, productionMultiplier: 10 })
    const after = tickIntroProduction(1)(state)
    expect(after.intro.bits).toBe(8)
  })
})

describe('tickIntroAutoInvest', () => {
  const firstTierId = TIER_DEFINITIONS[0].id

  it('is a no-op below INTRO_AUTO_INVEST_THRESHOLD', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_AUTO_INVEST_THRESHOLD - 1 })
    expect(tickIntroAutoInvest(state)).toBe(state)
  })

  it('grants 8 units, spends the full threshold, and flips mainGameUnlocked, on a fresh cycle', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_AUTO_INVEST_THRESHOLD, capacity: INTRO_AUTO_INVEST_THRESHOLD, byteCreated: true })
    const after = tickIntroAutoInvest(state)
    expect(after.owned[firstTierId]).toBe(INTRO_AUTO_INVEST_THRESHOLD / INTRO_BITS_PER_KILOBYTE_CONVERSION)
    expect(after.intro.bits).toBe(0)
    expect(after.intro.mainGameUnlocked).toBe(true)
    expect(after.intro.bitsTransferredThisCycle).toBe(INTRO_AUTO_INVEST_THRESHOLD)
  })

  it('keeps working after mainGameUnlocked, transferring only the remaining budget once some has already been manually converted', () => {
    const state = withIntro(createInitialGameState(), {
      mainGameUnlocked: true, bits: INTRO_AUTO_INVEST_THRESHOLD, capacity: 80000, byteCreated: true, bitsTransferredThisCycle: 3000,
    })
    const after = tickIntroAutoInvest(state)
    expect(after.intro.bitsTransferredThisCycle).toBe(INTRO_AUTO_INVEST_THRESHOLD)
    expect(after.intro.bits).toBe(INTRO_AUTO_INVEST_THRESHOLD - 5000)
    expect(after.owned[firstTierId]).toBe(5000 / INTRO_BITS_PER_KILOBYTE_CONVERSION)
  })

  it('is a no-op once this cycle\'s shared transfer budget is fully exhausted', () => {
    const state = withIntro(createInitialGameState(), {
      mainGameUnlocked: true, bits: INTRO_AUTO_INVEST_THRESHOLD, capacity: INTRO_AUTO_INVEST_THRESHOLD, byteCreated: true, bitsTransferredThisCycle: INTRO_AUTO_INVEST_THRESHOLD,
    })
    expect(tickIntroAutoInvest(state)).toBe(state)
  })

  it('triggers at the dynamic (block-size-grown) threshold, not the old fixed 8000', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const grown = withPurchaseLevel(createInitialGameState(), lastTier.id, 101)
    expect(getPurchaseBlockSize(grown)).toBe(9)

    // Bits at exactly the OLD fixed threshold (8000) isn't enough yet — the grown budget is 9000.
    const notYetFull = withIntro(grown, { bits: INTRO_AUTO_INVEST_THRESHOLD, capacity: 10000, byteCreated: true })
    expect(tickIntroAutoInvest(notYetFull)).toBe(notYetFull)

    const full = withIntro(notYetFull, { bits: 9000 })
    const after = tickIntroAutoInvest(full)
    expect(after.intro.mainGameUnlocked).toBe(true)
    expect(after.intro.bitsTransferredThisCycle).toBe(9000)
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

  it('switches to exponential notation at the threshold, like formatCurrency', () => {
    expect(formatAmount(999999)).toBe('999,999')
    expect(formatAmount(1000000)).toBe('1e6')
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
    expect(formatCurrency(0)).toBe('0 b')
  })

  it('formats a comma-grouped mid-size amount with a b suffix, just below the exponential threshold', () => {
    expect(formatCurrency(999999)).toBe('999,999 b')
  })

  it('switches to exponential notation at the threshold, like formatAmount', () => {
    expect(formatCurrency(1000000)).toBe('1e6 b')
  })

  it('switches to exponential notation at huge magnitudes', () => {
    expect(formatCurrency(1e21)).toBe('1e21 b')
  })

  it('treats negative values as 0', () => {
    expect(formatCurrency(-5)).toBe('0 b')
  })

  it('floors fractional amounts instead of rounding, so it never overstates the balance', () => {
    expect(formatCurrency(1.6)).toBe('1 b')
    expect(formatCurrency(1.999)).toBe('1 b')
    expect(formatCurrency(2)).toBe('2 b')
  })
})

// ─── getCostEpochExponent ────────────────────────────────────────────────────

describe('getCostEpochExponent', () => {
  it('follows the 1, 2, 4, 7, 11, 16 progression across epochs 0-5', () => {
    expect(getCostEpochExponent(0)).toBe(1)
    expect(getCostEpochExponent(1)).toBe(2)
    expect(getCostEpochExponent(2)).toBe(4)
    expect(getCostEpochExponent(3)).toBe(7)
    expect(getCostEpochExponent(4)).toBe(11)
    expect(getCostEpochExponent(5)).toBe(16)
  })

  it('clamps a negative epoch to 0', () => {
    expect(getCostEpochExponent(-1)).toBe(1)
  })
})

// ─── getTierCost ─────────────────────────────────────────────────────────────
// getTierCost now takes a tier's current LEVEL directly (not a lifetime purchased count) — level
// is tracked directly in state (purchaseLevels), not derived via division. See getPurchaseBlockSize
// tests below for the block-size-growth mechanic, and getTierBulkQuantity for within-level capping.
//
// getTierCost returns the PER-UNIT price — fixed for a given tier+level, independent of blockSize
// entirely (no division happens anywhere in this formula). A level's TOTAL cost (every purchase
// within it, summed) is this per-unit price times the CURRENT blockSize (see getTierQuantityCost
// below) — the total that scales with block size, not the per-unit price itself.

describe('getTierCost', () => {
  const tier = { baseCost: 10 }

  it('costs baseCost at level 1', () => {
    expect(getTierCost(tier, 1)).toBe(10)
  })

  it('costs baseCost * 10^1 at level 2', () => {
    expect(getTierCost(tier, 2)).toBe(100)
  })

  it('costs baseCost * 10^3 at level 3', () => {
    expect(getTierCost(tier, 3)).toBe(10000)
  })

  it('costs baseCost * 10^6 at level 4', () => {
    expect(getTierCost(tier, 4)).toBe(1e7)
  })

  it('costs baseCost * 10^10 at level 5', () => {
    expect(getTierCost(tier, 5)).toBe(1e11)
  })

  it('scales a larger baseCost by the same epoch-exponent multiplier, not a compounded power', () => {
    const thousands = { baseCost: 1e3 }
    expect(getTierCost(thousands, 1)).toBe(1e3)
    expect(getTierCost(thousands, 2)).toBe(1e4)
    expect(getTierCost(thousands, 3)).toBe(1e6)
    expect(getTierCost(thousands, 4)).toBe(1e9)
    expect(getTierCost(thousands, 5)).toBe(1e13)
  })

  it('treats level 0 and negative levels as level 1', () => {
    expect(getTierCost(tier, 0)).toBe(10)
    expect(getTierCost(tier, -1)).toBe(10)
  })

  it('is independent of blockSize — the per-unit price is fixed regardless of how big the current block is', () => {
    // getTierQuantityCost multiplies this fixed per-unit price by however many units are bought —
    // completing an entire level costs per-unit price × blockSize, which grows if blockSize grows,
    // even though the per-unit price itself never changes.
    expect(getTierQuantityCost(tier, 1, 8, 0, 8)).toBe(80) // full level at blockSize 8: 10/unit × 8
    expect(getTierQuantityCost(tier, 1, 13, 0, 13)).toBe(130) // full level at blockSize 13: 10/unit × 13
  })
})

// ─── getTierBulkQuantity / getTierQuantityCost ────────────────────────────────
// Both now take blockSize/levelProgress explicitly (read directly from state by callers) instead
// of a tier + lifetime purchased count.

describe('getTierBulkQuantity', () => {
  it('returns the requested quantity when it fits entirely in the current block', () => {
    expect(getTierBulkQuantity(8, 0, 8)).toBe(8)
    expect(getTierBulkQuantity(8, 0, 1)).toBe(1)
  })

  it('caps at the units remaining in the current block', () => {
    expect(getTierBulkQuantity(8, 5, 8)).toBe(3)
    expect(getTierBulkQuantity(8, 7, 8)).toBe(1)
  })

  it('returns 0 when nothing was requested', () => {
    expect(getTierBulkQuantity(8, 0, 0)).toBe(0)
  })

  it('supports a block size other than the default (configurable block size)', () => {
    expect(getTierBulkQuantity(12, 0, 100)).toBe(12)
    expect(getTierBulkQuantity(12, 10, 100)).toBe(2)
  })

  it('returns 0 once progress already meets or exceeds the block size', () => {
    expect(getTierBulkQuantity(8, 8, 8)).toBe(0)
    expect(getTierBulkQuantity(8, 9, 8)).toBe(0)
  })
})

describe('getTierQuantityCost', () => {
  const tier = { baseCost: 10 }

  it('multiplies the fixed per-unit cost by the capped bulk quantity', () => {
    expect(getTierQuantityCost(tier, 1, 8, 0, 8)).toBe(80) // 10/unit × 8 units = 80 (the level total at blockSize 8)
    expect(getTierQuantityCost(tier, 1, 8, 5, 8)).toBe(30) // only 3 fit in the current block: 10 × 3
    expect(getTierQuantityCost(tier, 2, 8, 0, 8)).toBe(800) // next level: per-unit 100 × 8 = 800
  })

  it('scales the level total with block size, while the per-unit price stays fixed', () => {
    expect(getTierQuantityCost(tier, 1, 13, 0, 13)).toBe(130) // 10/unit × 13 units at a grown block size
  })
})

describe('getTierAffordableQuantity', () => {
  const tier = { baseCost: 8 } // per-unit cost at level 1 is a fixed 8, regardless of blockSize

  it('returns the full block-capped quantity when fully affordable', () => {
    expect(getTierAffordableQuantity(tier, 1, 8, 0, 1000, 8)).toBe(8)
  })

  it('caps at what can actually be afforded, partial-filling a bulk request', () => {
    // $40 at $8/unit affords 5, even though 8 were requested
    expect(getTierAffordableQuantity(tier, 1, 8, 0, 40, 8)).toBe(5)
  })

  it('returns 0 when nothing is affordable', () => {
    expect(getTierAffordableQuantity(tier, 1, 8, 0, 0, 8)).toBe(0)
  })

  it('never exceeds the block boundary even with unlimited funds', () => {
    expect(getTierAffordableQuantity(tier, 1, 8, 5, 1_000_000, 8)).toBe(3)
  })

  it('falls back to the block-capped quantity when the per-unit cost is 0, avoiding a divide-by-zero', () => {
    const freeTier = { baseCost: 0 }
    expect(getTierAffordableQuantity(freeTier, 1, 8, 0, 0, 8)).toBe(8)
  })
})

// ─── getPurchaseBlockSize ──────────────────────────────────────────────────────

describe('getPurchaseBlockSize', () => {
  it('is DEFAULT_PURCHASE_BLOCK_SIZE (8) on a fresh state', () => {
    expect(getPurchaseBlockSize(createInitialGameState())).toBe(8)
  })

  it('stays at the default while the last tier is below level 101', () => {
    expect(getPurchaseBlockSize(withPurchaseLevel(createInitialGameState(), lastTier.id, 100))).toBe(8)
  })

  it('grows by 1 once the last tier reaches level 101 (100 levels completed)', () => {
    expect(getPurchaseBlockSize(withPurchaseLevel(createInitialGameState(), lastTier.id, 101))).toBe(9)
  })

  it('grows by 1 again at level 201 (200 levels completed)', () => {
    expect(getPurchaseBlockSize(withPurchaseLevel(createInitialGameState(), lastTier.id, 201))).toBe(10)
  })

  it('is unaffected by any other tier\'s level, only the last tier\'s', () => {
    const state = withPurchaseLevel(createInitialGameState(), tensTier.id, 500)
    expect(getPurchaseBlockSize(state)).toBe(8)
  })

  it('falls back to the default when purchaseLevels is missing from state entirely', () => {
    expect(getPurchaseBlockSize({})).toBe(DEFAULT_PURCHASE_BLOCK_SIZE)
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

describe('getAutobuyerUnlockMilestone', () => {
  it('requires 1 prestige for the first tier', () => {
    expect(getAutobuyerUnlockMilestone(tensTier.id)).toBe(1)
  })

  it('increases by 1 prestige per subsequent tier, up to 10 for the 10th/last tier', () => {
    expect(getAutobuyerUnlockMilestone(thousandsTier.id)).toBe(2)
    expect(getAutobuyerUnlockMilestone(TIER_DEFINITIONS[9].id)).toBe(10)
  })

  it('treats an unrecognized tier id as index 0 (the earliest milestone)', () => {
    expect(getAutobuyerUnlockMilestone('does_not_exist')).toBe(1)
  })
})

describe('getTierTickspeedAutobuyerMilestone', () => {
  it('requires 12 prestiges for the first tier', () => {
    expect(getTierTickspeedAutobuyerMilestone(tensTier.id)).toBe(12)
  })

  it('increases by 2 prestiges per subsequent tier, up to 30 for the 10th/last tier', () => {
    expect(getTierTickspeedAutobuyerMilestone(thousandsTier.id)).toBe(14)
    expect(getTierTickspeedAutobuyerMilestone(TIER_DEFINITIONS[9].id)).toBe(30)
  })

  it('treats an unrecognized tier id as index 0 (the earliest milestone)', () => {
    expect(getTierTickspeedAutobuyerMilestone('does_not_exist')).toBe(12)
  })
})

describe('applyAutobuyerMilestones', () => {
  it('unlocks no tier autobuyers before the first prestige', () => {
    const state = withPrestigeCount(createInitialGameState(), 0)
    expect(applyAutobuyerMilestones(state)).toBe(state)
  })

  it('unlocks exactly the tiers whose milestone is met, and nothing else', () => {
    const state = withPrestigeCount(createInitialGameState(), 3)
    const after = applyAutobuyerMilestones(state)
    expect(after.autobuyers[TIER_DEFINITIONS[0].id]).toBe(1)
    expect(after.autobuyers[TIER_DEFINITIONS[1].id]).toBe(1)
    expect(after.autobuyers[TIER_DEFINITIONS[2].id]).toBe(1)
    expect(after.autobuyers[TIER_DEFINITIONS[3].id]).toBeNull()
  })

  it('never unlocks a tier tickspeed autobuyer before prestige 12', () => {
    const state = withPrestigeCount(createInitialGameState(), 11)
    const after = applyAutobuyerMilestones(state)
    expect(after.tierTickspeedAutobuyer[TIER_DEFINITIONS[0].id]).toBe(false)
  })

  it('unlocks the first tier tickspeed autobuyer at prestige 12, the second at 14', () => {
    const state = withPrestigeCount(createInitialGameState(), 14)
    const after = applyAutobuyerMilestones(state)
    expect(after.tierTickspeedAutobuyer[TIER_DEFINITIONS[0].id]).toBe(true)
    expect(after.tierTickspeedAutobuyer[TIER_DEFINITIONS[1].id]).toBe(true)
    expect(after.tierTickspeedAutobuyer[TIER_DEFINITIONS[2].id]).toBe(false)
  })

  it('never revokes an already-unlocked tier, even if reached by other means', () => {
    const state = withPrestigeCount(
      withAutobuyer(createInitialGameState(), TIER_DEFINITIONS[5].id),
      0
    )
    const after = applyAutobuyerMilestones(state)
    expect(after.autobuyers[TIER_DEFINITIONS[5].id]).toBe(1)
  })

  it('returns the same state reference when nothing newly qualifies', () => {
    const state = withPrestigeCount(createInitialGameState(), 0)
    expect(applyAutobuyerMilestones(state)).toBe(state)
  })

  it('treats a missing prestige field entirely as count 0 rather than crashing', () => {
    const state = { autobuyers: {}, tierTickspeedAutobuyer: {} }
    expect(applyAutobuyerMilestones(state)).toBe(state)
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

  it('defaults to no Overclock boost (the pre-Overclock 1% regular step) when overclockCount is omitted', () => {
    expect(getGlobalTickspeedProductionMultiplier(9)).toBeCloseTo(1.01 ** 9)
  })

  it('raises the REGULAR step (not the milestone step) once overclockCount > 0', () => {
    // Overclock raises the regular per-level step from 1% to 1.1% (overclockCount 1), but the
    // level-10 milestone step stays at the fixed 10% — Overclock only touches regular levels.
    expect(getGlobalTickspeedProductionMultiplier(9, 1)).toBeCloseTo(1.011 ** 9)
    expect(getGlobalTickspeedProductionMultiplier(10, 1)).toBeCloseTo(1.011 ** 9 * 1.10)
  })

  it('stacks a further 0.1 percentage points onto the regular step per additional Overclock activation', () => {
    expect(getGlobalTickspeedProductionMultiplier(9, 2)).toBeCloseTo(1.012 ** 9)
    expect(getGlobalTickspeedProductionMultiplier(9, 5)).toBeCloseTo(1.015 ** 9)
  })

  it('is still 1 (no bonus) at level 0 regardless of overclockCount', () => {
    expect(getGlobalTickspeedProductionMultiplier(0, 5)).toBe(1)
    expect(getGlobalTickspeedProductionMultiplier(null, 5)).toBe(1)
  })
})

describe('getGlobalTickspeedRegularStep', () => {
  it('is the baseline 1% (0.01) with no Overclock activations', () => {
    expect(getGlobalTickspeedRegularStep(0)).toBe(0.01)
  })

  it('adds 0.1 percentage points (0.001) per Overclock activation', () => {
    expect(getGlobalTickspeedRegularStep(1)).toBeCloseTo(0.011)
    expect(getGlobalTickspeedRegularStep(2)).toBeCloseTo(0.012)
    expect(getGlobalTickspeedRegularStep(10)).toBeCloseTo(0.02)
  })

  it('treats a negative count as 0', () => {
    expect(getGlobalTickspeedRegularStep(-1)).toBe(0.01)
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
  // This formula deliberately keys off GOOGOL's own clean 10^100 exponent, not the live
  // PRESTIGE_THRESHOLD (GOOGOL * BITS_PER_BYTE) the game actually gates Prestige on — an 8x
  // constant factor is negligible at this scale (see layers.js/docs/DESIGN_HISTORY.md), so these
  // tests intentionally exercise the formula at GOOGOL itself, not PRESTIGE_THRESHOLD.
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

  it('awards 0 points below 1 money, including negative input clamped to 0', () => {
    expect(getPrestigePointsAwarded(0)).toBe(0)
    expect(getPrestigePointsAwarded(0.5)).toBe(0)
    expect(getPrestigePointsAwarded(-100)).toBe(0)
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

// getPurchaseMilestoneMultiplier now takes a tier's current LEVEL directly, not a lifetime
// purchased count.
describe('getPurchaseMilestoneMultiplier', () => {
  it('returns 1 at level 1', () => {
    expect(getPurchaseMilestoneMultiplier(1)).toBe(1)
  })

  it('doubles at each level, same as the cost epoch', () => {
    expect(getPurchaseMilestoneMultiplier(2)).toBe(2)
    expect(getPurchaseMilestoneMultiplier(3)).toBe(4)
    expect(getPurchaseMilestoneMultiplier(4)).toBe(8)
  })

  it('treats level 0 and negative levels as level 1', () => {
    expect(getPurchaseMilestoneMultiplier(0)).toBe(1)
    expect(getPurchaseMilestoneMultiplier(-1)).toBe(1)
  })

  it('uses a 10x jump instead of 2x for the 10th completed level (level 11)', () => {
    // 9 regular levels (2^9 = 512) × 1 mega level (10x) = 5120, not the 2^10 = 1024 a plain
    // doubling ladder would give. This "every 10th level" mega cadence stays fixed at 10 levels,
    // independent of the (now variable) purchase block size.
    expect(getPurchaseMilestoneMultiplier(10)).toBe(2 ** 9)
    expect(getPurchaseMilestoneMultiplier(11)).toBe(5120)
  })

  it('resumes regular 2x levels after a mega level, on top of its 10x', () => {
    expect(getPurchaseMilestoneMultiplier(12)).toBe(2 ** 10 * 10)
  })

  it('applies a second 10x mega level at level 21', () => {
    expect(getPurchaseMilestoneMultiplier(21)).toBe(2 ** 18 * 10 ** 2)
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

// getSpeedUpRequirement now returns a LEVEL target for the last tier (not a lifetime-purchased-count
// threshold), since how many purchases a level corresponds to depends on the current block size.
describe('getSpeedUpRequirement', () => {
  it('is level 2 for the first activation (speedUpCount 0)', () => {
    expect(getSpeedUpRequirement(0)).toBe(2)
  })

  it('increases by one level per prior activation', () => {
    expect(getSpeedUpRequirement(1)).toBe(3)
    expect(getSpeedUpRequirement(2)).toBe(4)
    expect(getSpeedUpRequirement(3)).toBe(5)
  })

  it('treats a negative count as 0', () => {
    expect(getSpeedUpRequirement(-1)).toBe(2)
  })
})

describe('getOverclockRequirement', () => {
  it('is level 10 for the first activation (overclockCount 0)', () => {
    expect(getOverclockRequirement(0)).toBe(10)
  })

  it('increases by a fixed 10 levels per prior activation, not shrinking relative to itself like getSpeedUpRequirement', () => {
    expect(getOverclockRequirement(1)).toBe(20)
    expect(getOverclockRequirement(2)).toBe(30)
    expect(getOverclockRequirement(3)).toBe(40)
  })

  it('treats a negative count as 0', () => {
    expect(getOverclockRequirement(-1)).toBe(10)
  })
})

// ─── isProductionFrozen ──────────────────────────────────────────────────────

describe('isProductionFrozen', () => {
  it('is false below PRESTIGE_THRESHOLD', () => {
    // PRESTIGE_THRESHOLD - 1 rounds back to PRESTIGE_THRESHOLD at this magnitude (float precision), so use a value
    // that's meaningfully smaller instead of relying on an off-by-one difference.
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD / 10)
    expect(isProductionFrozen(state)).toBe(false)
  })

  it('is true at exactly PRESTIGE_THRESHOLD', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    expect(isProductionFrozen(state)).toBe(true)
  })

  it('is true above PRESTIGE_THRESHOLD', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD * 2)
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

  it('keeps tier 1 locked when tier 0 is owned < PURCHASE_BLOCK_SIZE (8)', () => {
    const state = withOwned(createInitialGameState(), TIER_DEFINITIONS[0].id, 7)
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[1])).toBe(false)
  })

  it('unlocks tier 1 when tier 0 is owned ≥ PURCHASE_BLOCK_SIZE (8)', () => {
    const state = withOwned(createInitialGameState(), TIER_DEFINITIONS[0].id, 8)
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[1])).toBe(true)
  })

  it('unlocks tier 2 only after tier 1 is owned ≥ PURCHASE_BLOCK_SIZE (8)', () => {
    const lockedState = withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 7)
    const unlockedState = withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 8)
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

  it('treats a missing owned entry as 0 for both the tier itself and its predecessor', () => {
    const state = { owned: {} }
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
    // Deliberately GOOGOL, not PRESTIGE_THRESHOLD — this formula keys off GOOGOL's own clean
    // exponent (see the getPrestigePointsAwarded describe block above).
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
    // Deliberately GOOGOL, not PRESTIGE_THRESHOLD — same reasoning as getMoneyExponent above.
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
    expect(getEffectiveTierTickSpeedSeconds(createInitialGameState(), tensTier.id)).toBe(2)
  })

  it('shrinks by the per-tier tickspeed multiplier', () => {
    const state = withTickspeedLevel(createInitialGameState(), tensTier.id, 3)
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBeCloseTo(2 / 1.21)
  })

  it('shrinks by the global tickspeed multiplier too, applied to every tier', () => {
    // Level 10 = 9 regular 1% levels compounded, then the level-10 milestone at 10% instead of 1%.
    const globalMultiplier = 1.01 ** 9 * 1.10
    const state = withGlobalTickspeedMultiplier(createInitialGameState(), 10)
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBeCloseTo(2 / globalMultiplier)
    // Megabytes' own base tickspeed is 3s (tier index 2 → tierIndex + 2), so the same global
    // multiplier shrinks it from a different starting point than Kilobytes' 2s.
    expect(getEffectiveTierTickSpeedSeconds(state, thousandsTier.id)).toBeCloseTo(3 / globalMultiplier)
  })

  it('stacks both multiplicatively, not additively', () => {
    // Per-tier level 2 → ×1.1, global level 10 (1.01^9 * 1.10 ≈ ×1.2031) → combined, not simply
    // additive.
    const globalMultiplier = 1.01 ** 9 * 1.10
    const state = withGlobalTickspeedMultiplier(
      withTickspeedLevel(createInitialGameState(), tensTier.id, 2),
      10
    )
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBeCloseTo(2 / (1.1 * globalMultiplier))
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
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBe(2)
  })

  it('falls back to baseline (level 1, no global multiplier) when tickspeedLevels/globalTickspeedMultiplier are missing from state entirely', () => {
    expect(getEffectiveTierTickSpeedSeconds({ owned: {} }, tensTier.id)).toBe(2)
  })

  it('falls back to 0 already-consumed XP for the last tier when lastTierXpConsumed is missing from state entirely', () => {
    const lastTierId = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id
    const baseTickSpeed = getTierBaseTickSpeedSeconds(lastTierId)
    const state = { owned: { [lastTierId]: 1000 } }
    expect(getEffectiveTierTickSpeedSeconds(state, lastTierId)).toBeCloseTo(baseTickSpeed)
  })

  it('raises the effective tickspeed once a global tickspeed level is already bought, via Overclock\'s boosted per-level step', () => {
    // 5 Overclock activations raise the regular step from 1% to 1.5% (5 * OVERCLOCK_PRODUCTION_STEP).
    const state = withOverclockCount(withGlobalTickspeedMultiplier(createInitialGameState(), 9), 5)
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBeCloseTo(2 / (1.015 ** 9))
  })

  it('has no effect at all while the global tickspeed multiplier is still at level 0/not yet bought', () => {
    // Overclock only raises the per-level step of an existing global tickspeed level — with 0
    // levels bought, there's nothing for that boosted step to compound, so the effective tickspeed
    // is unaffected regardless of overclockCount.
    const state = withOverclockCount(createInitialGameState(), 5)
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBe(2)
  })

  it('stacks the boosted global tickspeed step multiplicatively with the per-tier tickspeed multiplier', () => {
    const state = withOverclockCount(
      withGlobalTickspeedMultiplier(
        withTickspeedLevel(createInitialGameState(), tensTier.id, 2),
        9
      ),
      5
    )
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id))
      .toBeCloseTo(2 / (1.1 * 1.015 ** 9))
  })

  it('falls back to 0 Overclock activations (the baseline 1% step) when overclockCount is missing from state entirely', () => {
    const state = omit(withGlobalTickspeedMultiplier(createInitialGameState(), 9), 'overclockCount')
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBeCloseTo(2 / (1.01 ** 9))
  })
})

// ─── getTierProductionProgressPercent ───────────────────────────────────────

describe('getTierProductionProgressPercent', () => {
  it('is 0% on a fresh state', () => {
    expect(getTierProductionProgressPercent(createInitialGameState(), thousandsTier.id)).toBe(0)
  })

  it('reflects a partial fraction of a tier\'s tickspeed', () => {
    // Megabytes' base tickspeed is 3s — half a second's worth of elapsed time banks about a sixth
    // of it.
    const state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    const afterHalfSecond = tickGame(0.5)(state)
    expect(getTierProductionProgressPercent(afterHalfSecond, thousandsTier.id)).toBe(17)
  })

  it('drops back down to the banked remainder once a batch fires', () => {
    const state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    const afterThreeSeconds = tickGame(3)(state)
    // Megabytes' base tickspeed is 3s: a single 3-second tick crosses the threshold and delivers
    // a batch, banking 0s of remainder.
    expect(getTierProductionProgressPercent(afterThreeSeconds, thousandsTier.id)).toBe(0)
  })

  it('is 100% for a 2s-tickspeed tier with a full period already banked', () => {
    expect(getTierProductionProgressPercent(
      { tierProductionAccumulators: { [tensTier.id]: 2 } },
      tensTier.id
    )).toBe(100)
  })

  it('reports 100% instead of the wrapped remainder when the previous accumulator just crossed the threshold', () => {
    // Kilobytes' tickspeed is 2s: a previous accumulator of 1 plus the default 1 elapsed second
    // crosses 2s, so a delivery just happened even though the freshly-wrapped remainder is 0.
    const state = { tierProductionAccumulators: { [tensTier.id]: 0 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 1)).toBe(100)
  })

  it('falls through to the normal calculation when the previous accumulator has not yet crossed the threshold', () => {
    // previousAccumulator (0.4) + elapsedSeconds (0.1) = 0.5, below Kilobytes' 2s tickspeed
    // threshold, so this falls through to the normal accumulated/tickSpeed calculation using the
    // raw stored accumulator (0.5) instead of reporting 100.
    const state = { tierProductionAccumulators: { [tensTier.id]: 0.5 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0.4, 0.1)).toBe(25)
  })

  it('reports a 2s-tickspeed tier as 100% once the previous accumulator plus the default elapsed second reaches the threshold', () => {
    const state = { tierProductionAccumulators: { [tensTier.id]: 0 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 1)).toBe(100)
  })

  it('measures against the shrunk effective tickspeed once a tier has a tickspeed multiplier level', () => {
    // Level 2 → ×1.1 effective speed (see getEffectiveTierTickSpeedSeconds), so the period shrinks
    // from 2s to 2/1.1s — half of that banked is 50% of the way there, not 45.45% of the raw 2s.
    const state = withTickspeedLevel(
      { tierProductionAccumulators: { [tensTier.id]: (2 / 1.1) / 2 } },
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
    // Kilobytes' tickspeed is 2s: a previous accumulator of 1.95 plus a 0.1 elapsed tick crosses 2s.
    const state = { tierProductionAccumulators: { [tensTier.id]: 0.05 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 1.95, 0.1)).toBe(100)
  })

  it('does not report 100% early when a fractional elapsedSeconds has not yet crossed the threshold', () => {
    const state = { tierProductionAccumulators: { [tensTier.id]: 0.85 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0.75, 0.1)).toBe(43)
  })

  it('falls back to 0 accumulated when tierProductionAccumulators is missing from state entirely', () => {
    expect(getTierProductionProgressPercent({}, tensTier.id)).toBe(0)
  })
})

// ─── getTierSpendableAmount ──────────────────────────────────────────────────

describe('getTierSpendableAmount', () => {
  it('returns the balance of the tier\'s cost resource (the base currency, for every tier)', () => {
    const state = withMoney(createInitialGameState(), 42)
    TIER_DEFINITIONS.forEach(tier => {
      expect(getTierSpendableAmount(state, tier)).toBe(42)
    })
  })

  it('falls back to 0 when the cost resource is missing from state.resources entirely', () => {
    const state = { resources: {} }
    TIER_DEFINITIONS.forEach(tier => {
      expect(getTierSpendableAmount(state, tier)).toBe(0)
    })
  })
})

// ─── getTierPurchasedCount ───────────────────────────────────────────────────

describe('getTierPurchasedCount', () => {
  it('returns a tier\'s purchased count', () => {
    const state = withPurchased(createInitialGameState(), tensTier.id, 5)
    expect(getTierPurchasedCount(state, tensTier.id)).toBe(5)
  })

  it('falls back to 0 when purchased is missing from state entirely', () => {
    expect(getTierPurchasedCount({}, tensTier.id)).toBe(0)
  })
})

// ─── buyTier ─────────────────────────────────────────────────────────────────

describe('buyTier', () => {
  it('deducts cost and increments owned/purchased', () => {
    const state = withMoney(createInitialGameState(), 1000) // enough for exactly 1 unit
    // tensTier (baseCost 1000) level 1: per-unit cost = 1000
    const after = buyTier(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(1)
    expect(after.purchased[tensTier.id]).toBe(1)
    expect(after.resources[MONEY_ID]).toBe(0)
  })

  it('returns the same state object when funds are insufficient', () => {
    const state = withMoney(createInitialGameState(), 0)
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

  it('refuses to buy once production is frozen at PRESTIGE_THRESHOLD, even with plenty of funds', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    expect(buyTier(tensTier.id)(state)).toBe(state)
  })

  it('cost is flat within a level, then jumps 10x at the next level', () => {
    const costAtLevel1 = getTierCost(tensTier, 1, 8)
    const costAtLevel2 = getTierCost(tensTier, 2, 8)
    expect(costAtLevel2).toBe(costAtLevel1 * 10)
  })

  it('can chain multiple purchases', () => {
    let state = withMoney(createInitialGameState(), 2000)
    state = buyTier(tensTier.id)(state)
    state = buyTier(tensTier.id)(state)
    expect(state.owned[tensTier.id]).toBe(2)
  })

  it('an unlocked higher tier is purchasable directly with the base currency', () => {
    const cost = getTierCost(thousandsTier, 1, 8)
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
    const cost = getTierCost(thousandsTier, 1, 8)
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
      getTierCost(thousandsTier, 0, 8) - 1
    )
    expect(buyTier(thousandsTier.id)(state)).toBe(state)
  })

  it('deducts the current flat cost on each consecutive purchase within a block', () => {
    let state = withMoney(createInitialGameState(), 5000)
    state = buyTier(tensTier.id)(state) // per-unit cost 1000, purchased 0→1
    state = buyTier(tensTier.id)(state) // cost 1000 (flat), purchased 1→2
    expect(state.owned[tensTier.id]).toBe(2)
    expect(state.purchased[tensTier.id]).toBe(2)
    expect(state.resources[MONEY_ID]).toBe(5000 - 1000 - 1000)
  })

  it('uses purchaseLevels (not owned) for cost scaling', () => {
    const state = withMoney(
      withOwned(createInitialGameState(), tensTier.id, 50),
      1000
    )

    expect(state.purchaseLevels[tensTier.id]).toBe(1)
    expect(getTierCost(tensTier, state.purchaseLevels[tensTier.id], 8)).toBe(1000)

    const after = buyTier(tensTier.id)(state)
    expect(after.resources[MONEY_ID]).toBe(0)
    expect(after.owned[tensTier.id]).toBe(51)
    expect(after.purchased[tensTier.id]).toBe(1)
  })

  it('engages the last tier\'s XP tickspeed mechanic (a live owned >= current block size check) once a purchase brings owned to a full level', () => {
    const state = withMoney(
      withPurchaseLevelProgress(
        withPurchased(withOwned(createInitialGameState(), lastTier.id, 7), lastTier.id, 7),
        lastTier.id,
        7
      ),
      getTierCost(lastTier, 1, 8)
    )
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(false)
    const after = buyTier(lastTier.id)(state)
    expect(after.owned[lastTier.id]).toBe(8)
    expect(isLastTierTickspeedXpUnlocked(after)).toBe(true)
  })

  it('does not engage the last tier\'s XP tickspeed mechanic before owned reaches a full block', () => {
    const state = withMoney(
      withPurchased(unlockedLastTierState(), lastTier.id, 5),
      getTierCost(lastTier, 1, 8)
    )
    const after = buyTier(lastTier.id)(state)
    expect(after.owned[lastTier.id]).toBe(2)
    expect(isLastTierTickspeedXpUnlocked(after)).toBe(false)
  })

  it('permanently latches everUnlockedTierIds for a tier the instant it becomes newly buyable', () => {
    // Buying the 8th Bytes (tensTier) unlocks Kilobytes (thousandsTier) — confirm the permanent
    // flag is set the same instant, not just the live owned >= current-block-size condition.
    const state = withMoney(
      withOwned(createInitialGameState(), tensTier.id, 7),
      getTierCost(tensTier, 1, 8)
    )
    expect(state.everUnlockedTierIds[thousandsTier.id]).toBe(false)
    const after = buyTier(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(8)
    expect(after.everUnlockedTierIds[thousandsTier.id]).toBe(true)
  })

  it('leaves everUnlockedTierIds unchanged when the purchase does not cross any tier\'s unlock threshold', () => {
    const state = withMoney(createInitialGameState(), 1000)
    const after = buyTier(tensTier.id)(state)
    expect(after.everUnlockedTierIds[thousandsTier.id]).toBe(false)
  })

  it('a grown blockSize does not change the per-unit price', () => {
    // Growing blockSize to 9 (last tier at level 101) doesn't change tensTier's own per-unit price
    // at all — getTierCost is independent of blockSize entirely (see getTierCost's own tests).
    const state = withMoney(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 101),
      1100
    )
    expect(getPurchaseBlockSize(state)).toBe(9)
    const after = buyTier(tensTier.id)(state)
    expect(after.resources[MONEY_ID]).toBe(100) // per-unit cost is still 1000, same as at the default blockSize 8
  })

  it('falls back to defaults (level 1, 0 progress, 0 owned) when purchaseLevels/purchaseLevelProgress/owned entries are missing from state for this tier', () => {
    const state = {
      resources: { [MONEY_ID]: 1000 },
      owned: {},
      purchased: {},
      everUnlockedTierIds: {},
    }
    const after = buyTier(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(1)
    expect(after.purchaseLevels[tensTier.id]).toBe(1)
    expect(after.purchaseLevelProgress[tensTier.id]).toBe(1)
  })

  it('still latches a newly-reached tier\'s everUnlockedTierIds when that field is missing from state entirely', () => {
    const state = {
      resources: { [MONEY_ID]: 1000 },
      owned: { [tensTier.id]: 7 },
      purchased: {},
      purchaseLevels: {},
      purchaseLevelProgress: {},
    }
    const after = buyTier(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(8)
    expect(after.everUnlockedTierIds[thousandsTier.id]).toBe(true)
  })
})

// ─── buyTierQuantity ─────────────────────────────────────────────────────────

describe('buyTierQuantity', () => {
  it('buys the full requested quantity when affordable and within the same block', () => {
    const state = withMoney(createInitialGameState(), 10000)
    // tensTier (baseCost 1000) level 1: fixed per-unit cost = 1000
    const after = buyTierQuantity(tensTier.id, 8)(state)
    expect(after.owned[tensTier.id]).toBe(8)
    expect(after.purchased[tensTier.id]).toBe(8)
    expect(after.resources[MONEY_ID]).toBe(10000 - 1000 * 8)
  })

  it('costs more in total to complete a level once blockSize has grown, at the same fixed per-unit price', () => {
    // Growing blockSize to 9 (last tier at level 101) means tensTier's level 1 now requires 9
    // purchases instead of 8 — at the same fixed per-unit price of 1000, that's 9000 total instead
    // of 8000.
    const state = withMoney(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 101),
      10000
    )
    expect(getPurchaseBlockSize(state)).toBe(9)
    const after = buyTierQuantity(tensTier.id, 9)(state)
    expect(after.purchaseLevels[tensTier.id]).toBe(2) // level completed
    expect(after.resources[MONEY_ID]).toBe(10000 - 9000) // 9 units × $1000/unit = $9000
  })

  it('caps the purchase at the block boundary even with unlimited funds', () => {
    const state = withMoney(
      withPurchaseLevelProgress(createInitialGameState(), tensTier.id, 5),
      1_000_000
    )
    const after = buyTierQuantity(tensTier.id, 10)(state)
    // Only 3 more fit in the current level (5 already done, block size 8) — completes the level.
    expect(after.purchased[tensTier.id]).toBe(3)
    expect(after.purchaseLevels[tensTier.id]).toBe(2)
    expect(after.purchaseLevelProgress[tensTier.id]).toBe(0)
  })

  it('stops early when funds run out partway through', () => {
    const state = withMoney(createInitialGameState(), 3000) // affords 3 at the fixed per-unit cost of 1000
    const after = buyTierQuantity(tensTier.id, 10)(state)
    expect(after.purchased[tensTier.id]).toBe(3)
    expect(after.resources[MONEY_ID]).toBe(0)
  })

  it('returns the same state object for a locked tier', () => {
    const state = createInitialGameState()
    expect(buyTierQuantity(thousandsTier.id, 10)(state)).toBe(state)
  })

  it('returns the same state object for an unknown tier ID', () => {
    const state = createInitialGameState()
    expect(buyTierQuantity('does_not_exist', 10)(state)).toBe(state)
  })

  it('returns the same state object as a no-op for a zero or negative quantity', () => {
    const state = withMoney(createInitialGameState(), 1000)
    expect(buyTierQuantity(tensTier.id, 0)(state)).toBe(state)
    expect(buyTierQuantity(tensTier.id, -5)(state)).toBe(state)
  })

  it('falls back to 0 levelProgress when purchaseLevelProgress is missing from state entirely', () => {
    const state = {
      resources: { [MONEY_ID]: 3000 },
      owned: {},
      purchased: {},
      everUnlockedTierIds: {},
      purchaseLevels: {},
    }
    const after = buyTierQuantity(tensTier.id, 3)(state)
    expect(after.owned[tensTier.id]).toBe(3)
  })
})

// ─── tickGame ────────────────────────────────────────────────────────────────

describe('tickGame', () => {
  it('produces money from Kilobytes generators over a full 2s tick', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 5)
    const after = tickGame(2)(state)
    // 5 generators × 1 full 2s tick = +5 money
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

  it('freezes entirely (returns the same state object) once Money reaches PRESTIGE_THRESHOLD', () => {
    const state = withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id, 5)
    expect(tickGame(1)(state)).toBe(state)
  })

  it('does not immediately auto-prestige at PRESTIGE_THRESHOLD if Auto-Prestige was just bought (attempt budget starts at 0, not yet crossed 1)', () => {
    const state = withAutoPrestige(withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id, 5))
    const after = tickGame(1)(state)
    expect(after.prestige.count).toBe(0)
    expect(after.resources[MONEY_ID]).toBe(PRESTIGE_THRESHOLD)
    expect(after.autoPrestigeAttemptBudget).toBeCloseTo(1 / 1000)
  })

  it('automatically prestiges the instant its attempt budget crosses 1, once Money is at PRESTIGE_THRESHOLD', () => {
    const state = withAutoPrestigeBudget(
      withAutoPrestige(withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id, 5)),
      0.9995 // + the level-1 rate (1/1000) crosses 1 this tick
    )
    const after = tickGame(1)(state)
    expect(after.prestige.count).toBe(1)
    expect(after.resources[MONEY_ID]).toBe(1)
    expect(after.owned[tensTier.id]).toBe(0)
    expect(after.autoPrestigeAttemptBudget).toBe(0)
  })

  it('does not accumulate or fire the Auto-Prestige attempt budget while paused (autoPrestigeEnabled false), even at PRESTIGE_THRESHOLD', () => {
    const state = withAutoPrestigeEnabled(
      withAutoPrestigeBudget(
        withAutoPrestige(withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id, 5)),
        0.9995
      ),
      false
    )
    const after = tickGame(1)(state)
    expect(after).toBe(state) // frozen + paused Auto-Prestige short-circuits to a same-reference no-op
    expect(after.prestige.count).toBe(0)
    expect(after.autoPrestigeAttemptBudget).toBe(0.9995)
  })

  it('does not accumulate the Auto-Prestige attempt budget during ordinary play while paused', () => {
    const state = withAutoPrestigeEnabled(withAutoPrestige(createInitialGameState()), false)
    const after = tickGame(1)(state)
    expect(after.autoPrestigeAttemptBudget).toBe(0)
  })

  it('resumes accumulating/firing the Auto-Prestige attempt budget once re-enabled', () => {
    const paused = withAutoPrestigeEnabled(
      withAutoPrestigeBudget(
        withAutoPrestige(withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id, 5)),
        0.9995
      ),
      false
    )
    const resumed = setAutoPrestigeEnabled(true)(paused)
    const after = tickGame(1)(resumed)
    expect(after.prestige.count).toBe(1)
  })

  it('keeps banking the Auto-Prestige attempt budget tick after tick while frozen, without firing early', () => {
    let state = withAutoPrestige(withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id, 5))
    for (let i = 0; i < 500; i++) state = tickGame(1)(state)
    // 500 ticks at the level-1 rate (1/1000) accumulates to 0.5 — still frozen, not yet fired.
    expect(state.prestige.count).toBe(0)
    expect(state.autoPrestigeAttemptBudget).toBeCloseTo(0.5)
    for (let i = 0; i < 500; i++) state = tickGame(1)(state)
    // Another 500 ticks crosses the 1.0 threshold — fires now, exactly once.
    expect(state.prestige.count).toBe(1)
    expect(state.resources[MONEY_ID]).toBe(1)
  })

  it('accumulates the Auto-Prestige attempt budget during ordinary (non-frozen) play too, not only once frozen', () => {
    const state = withAutoPrestige(createInitialGameState())
    const after = tickGame(1)(state)
    expect(after.autoPrestigeAttemptBudget).toBeCloseTo(1 / 1000)
  })

  it('falls back to 0 attempt budget when autoPrestigeAttemptBudget is missing from state entirely (frozen branch)', () => {
    const state = omit(
      withAutoPrestige(withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id, 5)),
      'autoPrestigeAttemptBudget'
    )
    const after = tickGame(1)(state)
    expect(after.autoPrestigeAttemptBudget).toBeCloseTo(1 / 1000)
  })

  it('falls back to 0 attempt budget when autoPrestigeAttemptBudget is missing from state entirely (non-frozen accumulation)', () => {
    const state = omit(withAutoPrestige(createInitialGameState()), 'autoPrestigeAttemptBudget')
    const after = tickGame(1)(state)
    expect(after.autoPrestigeAttemptBudget).toBeCloseTo(1 / 1000)
  })

  it('accumulates the Auto-Prestige attempt budget when autoPrestigeEnabled is missing from state entirely (defaults to active)', () => {
    const state = omit(withAutoPrestige(createInitialGameState()), 'autoPrestigeEnabled')
    const after = tickGame(1)(state)
    expect(after.autoPrestigeAttemptBudget).toBeCloseTo(1 / 1000)
  })

  it('lets an unlocked autobuyer buy when autobuyersEnabled is missing from state entirely (defaults to active)', () => {
    const state = omit(withMoney(withAutobuyer(createInitialGameState(), tensTier.id, 1), 1000), 'autobuyersEnabled')
    const after = tickGame(1)(state)
    expect(after.owned[tensTier.id]).toBeGreaterThan(0)
  })

  it('lets an active tier tickspeed autobuyer upgrade when tierTickspeedAutobuyerEnabled is missing from state entirely (defaults to active)', () => {
    const state = omit(
      withResource(withTierTickspeedAutobuyer(unlockedLastTierState(), lastTier.id), lastTier.id, 11),
      'tierTickspeedAutobuyerEnabled'
    )
    const after = tickGame(1)(state)
    expect(after.tickspeedLevels[lastTier.id]).toBe(2)
  })

  it('lets the global tickspeed autobuyer upgrade when autoGlobalTickspeedEnabled is missing from state entirely (defaults to active)', () => {
    const state = omit(
      withMoney(withAutoGlobalTickspeed(withOwned(createInitialGameState(), thousandsTier.id, 1)), 100),
      'autoGlobalTickspeedEnabled'
    )
    const after = tickGame(1)(state)
    expect(after.globalTickspeedMultiplier).toBe(1)
  })

  it('lets the Auto-Prestige Autobuyer re-level Auto-Prestige when autoPrestigeAutobuyerEnabled is missing from state entirely (defaults to active)', () => {
    const state = omit(
      withPrestigePoints(withAutoPrestigeAutobuyer(withAutoPrestige(createInitialGameState(), 1)), 2000),
      'autoPrestigeAutobuyerEnabled'
    )
    const after = tickGame(1)(state)
    expect(after.autoPrestige).toBe(2)
  })

  it('lets Auto Speed Up trigger automatically when autoSpeedUpEnabled is missing from state entirely (defaults to active)', () => {
    const state = omit(
      withAutoSpeedUp(withPurchaseLevel(createInitialGameState(), lastTier.id, 2)),
      'autoSpeedUpEnabled'
    )
    const after = tickGame(1)(state)
    expect(after.speedUpCount).toBe(1)
  })

  it('applies no Speed Up production bonus (falls back to 0) when speedUpCount is missing from state entirely', () => {
    const state = omit(withOwned(createInitialGameState(), tensTier.id, 1), 'speedUpCount')
    const after = tickGame(2)(state)
    expect(after.resources[MONEY_ID]).toBeGreaterThan(state.resources[MONEY_ID])
  })

  it('scales production with elapsed time', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 1)
    const after = tickGame(6)(state) // 3 full 2s ticks
    expect(after.resources[MONEY_ID]).toBe(state.resources[MONEY_ID] + 3)
  })

  it('still delivers a 2s-tickspeed tier\'s production on the 10th tick despite fractional elapsedSeconds floating-point drift', () => {
    // Summing 0.2 ten times lands on 1.9999999999999998 in IEEE-754, not exactly 2 — matching a
    // live tick loop accumulating fractional elapsedSeconds. Without the epsilon tolerance in
    // tickGame's ticksElapsed calculation, this would delay delivery to an 11th tick instead of
    // firing on the 10th, as it does at a coarser (e.g. 1-tick-per-second) granularity.
    let state = withOwned(createInitialGameState(), tensTier.id, 1)
    for (let i = 0; i < 10; i++) state = tickGame(0.2)(state)
    expect(state.resources[MONEY_ID]).toBe(2) // 1 starting + 1 tick's worth of production
  })

  it('does not apply the Prestige Points production-speed bonus until it has been unlocked', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 1)
    const boosted = withPrestigePoints(base, 100) // +100% → ×2, but not yet unlocked
    expect(tickGame(2)(boosted).resources[MONEY_ID]).toBe(base.resources[MONEY_ID] + 1)
  })

  it('applies the Prestige Points production-speed bonus once unlocked', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 1)
    const boosted = withPrestigeSpeedBonusUnlocked(withPrestigePoints(base, 100)) // +100% → ×2
    expect(tickGame(2)(boosted).resources[MONEY_ID]).toBe(
      base.resources[MONEY_ID] + 2
    )
  })

  it('floors a fractional Prestige Points production multiplier instead of crediting a fraction', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 1)
    // +50% → ×1.5, raw production 1 × 1.5 = 1.5
    const boosted = withPrestigeSpeedBonusUnlocked(withPrestigePoints(base, 50))
    const after = tickGame(2)(boosted)
    expect(after.resources[MONEY_ID]).toBe(base.resources[MONEY_ID] + 1) // floor(1.5) = 1
  })

  it('multiplies production by the Speed Up multiplier', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 5)
    const sped = withSpeedUpCount(base, 2) // ×4
    const after = tickGame(2)(sped)
    expect(after.resources[MONEY_ID]).toBe(base.resources[MONEY_ID] + 20) // 5 × 4
  })

  it('stacks the Speed Up multiplier with the Prestige Point speed bonus', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 10)
    // ×2 (Speed Up) × ×2 (+100% PP bonus) = ×4
    const state = withSpeedUpCount(
      withPrestigeSpeedBonusUnlocked(withPrestigePoints(base, 100)), 1
    )
    const after = tickGame(2)(state)
    expect(after.resources[MONEY_ID]).toBe(base.resources[MONEY_ID] + 40) // 10 × 4
  })

  it('Megabytes generators produce Kilobytes resource and owned generators once its 3s base tickspeed accumulates, banking fractional sub-second ticks along the way', () => {
    let state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    // Megabytes' base tickspeed is 3s — twenty-nine 0.1s ticks (the live game's real 10Hz cadence)
    // only accumulate toward that, they don't produce yet.
    for (let i = 0; i < 29; i++) {
      state = tickGame(0.1)(state)
      expect(state.resources[tensTier.id]).toBe(0)
    }
    expect(state.owned[tensTier.id]).toBe(10)
    // The 30th 0.1s tick crosses the 3s threshold and delivers one tick's worth (owned × 1).
    state = tickGame(0.1)(state)
    expect(state.resources[tensTier.id]).toBe(2)
    expect(state.owned[tensTier.id]).toBe(12) // 10 initial + 2 produced
  })

  it('a tier further down the line banks fractional sub-second ticks the same way', () => {
    const millionsTier = TIER_DEFINITIONS[2]
    let state = withOwned(
      withOwned(createInitialGameState(), thousandsTier.id, 10), // unlocks Gigabytes
      millionsTier.id, 5
    )
    // Gigabytes' base tickspeed is 4s — the first 39 sub-second ticks only accumulate toward that
    // threshold, no production yet.
    for (let i = 0; i < 39; i++) {
      state = tickGame(0.1)(state)
      expect(state.resources[thousandsTier.id]).toBe(0)
    }
    // The 40th tick crosses the 4s threshold and delivers exactly one tick's worth (owned × 1).
    state = tickGame(0.1)(state)
    expect(state.resources[thousandsTier.id]).toBe(5)
  })

  it('awards XP when money crosses a power-of-10 milestone', () => {
    const state = {
      ...withOwned(createInitialGameState(), tensTier.id, 10),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 95 },
      prestige: { xp: 0, points: 0, count: 0, highestMilestone: 1 },
    }
    const after = tickGame(2)(state) // full 2s tick: +10 money → crosses 100
    expect(after.prestige.xp).toBeGreaterThan(0)
  })

  it('does not reduce xp or highestMilestone when money is below the watermark exponent (e.g. just after spending it)', () => {
    // owned: 0 so no production changes money across the tick — isolates the
    // currentMilestone <= highestMilestone guard: money's exponent (1, for 50) is now below the
    // watermark (2), which without the guard would compute a negative XP delta and regress
    // highestMilestone.
    const state = {
      ...createInitialGameState(),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 50 },
      prestige: { xp: 10, points: 0, count: 0, highestMilestone: 2 },
    }
    const after = tickGame(1)(state)
    expect(after.prestige.xp).toBe(10)
    expect(after.prestige.highestMilestone).toBe(2)
  })

  it('an unlocked-but-not-upgraded autobuyer (level 0) already buys 1 generator per tick', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 1000),
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
    // getTickspeedProductionMultiplier): per-unit cost at level 1, blockSize 8, is 1000 —
    // 1000 - 1000 (cost), and tensTier's own 2s tickspeed hasn't accumulated a full period within
    // this single 1s tick, so no production lands yet = 0.
    expect(after.resources[MONEY_ID]).toBe(0)
  })

  it('the tickspeed multiplier level has no effect on purchase-attempt frequency — every unlocked level buys exactly 1 per tick', () => {
    const runTicks = (level, ticks) => {
      let result = withAutobuyer(withMoney(createInitialGameState(), 1_000_000), tensTier.id, level)
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
    // Per-unit cost at level 1, blockSize 8, is 8/8=1 — the entire block costs $8. $7 affords 7
    // units individually but not the full block of 8, so a batch-size-10 (non-smart) autobuyer
    // holds rather than trickling in a partial purchase.
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 7),
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.owned[tensTier.id]).toBe(0)
    expect(after.resources[MONEY_ID]).toBe(7)
  })

  it('without smart, a tier with only its $1 starting balance never buys anything at batch size 10 (the bootstrap stall)', () => {
    // tier01's per-unit cost at level 1, blockSize 8, is 8/8=$1 — the entire first block costs $8
    // total. MONEY_STARTING_AMOUNT is $1, well short of that, so a non-"smart" autobuyer with a
    // full-block batch size holds rather than trickling in a partial purchase — the reason
    // smartAutobuyer exists (see the next test). This stall isn't specific to tier01: every tier
    // stalls the same way from a starting balance smaller than its own full-block price (see the
    // following test for a much pricier tier).
    const state = withAutobuyer(
      createInitialGameState(),
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.owned[tensTier.id]).toBe(0)
    expect(after.purchased[tensTier.id]).toBe(0)
    expect(after.resources[MONEY_ID]).toBe(1)
  })

  it('the bootstrap stall still applies to a tier whose baseCost is large relative to available money', () => {
    // thousandsTier (baseCost $1,000,000) at level 1, blockSize 8: per-unit cost $1,000,000, full
    // block $8,000,000. With only $500 available, a batch-size-10 (non-smart) autobuyer still
    // holds rather than buying anything.
    const state = withAutobuyer(
      withMoney(withOwned(createInitialGameState(), tensTier.id, 8), 500),
      thousandsTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.owned[thousandsTier.id]).toBe(0)
    expect(after.purchased[thousandsTier.id]).toBe(0)
    // tensTier's own 2s tickspeed hasn't accumulated a full period within this single 1s tick, so
    // its 8 owned generators don't produce yet either — the balance stays untouched at $500.
    expect(after.resources[MONEY_ID]).toBe(500)
  })

  it('a smart tier buys one at a time (ignoring the batch size) instead of stalling on the first block', () => {
    const state = withSmartAutobuyer(
      withAutobuyer(
        withMoney(createInitialGameState(), 1000), // affords exactly 1 unit, not the full block
        tensTier.id
      ),
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.purchased[tensTier.id]).toBe(1)
    expect(after.owned[tensTier.id]).toBe(1)
    // Per-unit cost at level 1 is $1,000: money spent on the single unit ($1,000 → $0). tensTier's
    // own 2s tickspeed hasn't accumulated a full period within this single 1s tick, so that unit's
    // production doesn't land until the next tick.
    expect(after.resources[MONEY_ID]).toBe(0)
  })

  it('a smart tier reverts to the normal (full-block) batch size once past its first level', () => {
    const state = withSmartAutobuyer(
      withAutobuyer(
        withMoney(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), 65), // 2nd level: per-unit cost is now 80/8=$10 (10x epoch jump); $65 affords 6, still short of the full block of 8
        tensTier.id
      ),
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.purchaseLevels[tensTier.id]).toBe(2) // unchanged — holds for the full block, same as non-smart
    expect(after.purchaseLevelProgress[tensTier.id]).toBe(0)
    expect(after.resources[MONEY_ID]).toBe(65)
  })

  it('with a batch size above 1, autobuyer buys the whole block at once once affordable', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), 9000),
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    // Pays for 8 units ($8,000 total, per-unit cost $1,000) at the normal rate — no purchase-yield
    // bonus (block is capped at the current block size regardless of the requested batch size of
    // 10).
    expect(after.owned[tensTier.id]).toBe(8)
    expect(after.purchased[tensTier.id]).toBe(8)
    // Cost drains money to $1,000. tensTier's own 2s tickspeed hasn't accumulated a full period
    // within this single 1s tick, so no production lands yet this same tick.
    expect(after.resources[MONEY_ID]).toBe(1000)
  })

  it('caps an autobuyer batch purchase at the remaining units in the current cost block', () => {
    const state = withAutobuyer(
      withMoney(withPurchaseLevelProgress(createInitialGameState(), tensTier.id, 5), 3500), // only 3 units left in this block
      tensTier.id
    )
    const after = tickGame(1, 10)(state)
    expect(after.purchaseLevels[tensTier.id]).toBe(2)
    expect(after.purchaseLevelProgress[tensTier.id]).toBe(0)
    // Pays for the 3 remaining units in the block at the normal rate ($1,000 each, $3,000 total) —
    // no purchase-yield bonus. $3,500 - $3,000 = $500.
    expect(after.owned[tensTier.id]).toBe(3)
    // tensTier's own 2s tickspeed hasn't accumulated a full period within this single 1s tick, so
    // no production lands yet — the balance is just the $500 left over from the purchase.
    expect(after.resources[MONEY_ID]).toBe(500)
  })

  it('when multiple autobuyers compete for the same money, the higher tier is bought first', () => {
    // $1,000,000 affords exactly 1 Megabyte (per-unit cost $1,000,000), leaving nothing for a
    // Kilobyte purchase ($1,000 per unit).
    const state = withAutobuyer(
      withAutobuyer(
        withMoney(withOwned(createInitialGameState(), tensTier.id, 10), 1_000_000),
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

  it('automatically consumes XP for the last tier once it is XP-unlocked and its tier tickspeed autobuyer is bought, resetting every other tier and Money the same way a manual consumption does', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    let state = createInitialGameState()
    state = withLastTierTickspeedXpUnlocked(state)
    state = withTierTickspeedAutobuyer(state, lastTier.id)
    state = withOwned(state, thousandsTier.id, 30)
    state = withResource(state, thousandsTier.id, 30)
    state = withMoney(state, 5) // stays within the same milestone exponent as the default watermark, so checkMilestones doesn't grant incidental XP
    state = withXP(state, 50)

    const after = tickGame(1)(state)
    expect(after.lastTierXpConsumed).toBe(50)
    expect(after.prestige.xp).toBe(0)
    expect(after.owned[thousandsTier.id]).toBe(0)
    expect(after.resources[thousandsTier.id]).toBe(0)
    expect(after.resources[MONEY_ID]).toBe(0)
  })

  it('does not auto-consume XP for the last tier when unspent XP is below the minimum required consumption', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    let state = createInitialGameState()
    state = withLastTierTickspeedXpUnlocked(state)
    state = withTierTickspeedAutobuyer(state, lastTier.id)
    state = withLastTierXpConsumed(state, 100) // min consumption is ceil(0.1 * 100) = 10
    state = withOwned(state, thousandsTier.id, 30)
    state = withResource(state, thousandsTier.id, 30)
    state = withXP(state, 5) // below the 10 XP minimum

    const after = tickGame(1)(state)
    expect(after.lastTierXpConsumed).toBe(100)
    expect(after.prestige.xp).toBe(5)
    expect(after.owned[thousandsTier.id]).toBe(30)
    expect(after.resources[thousandsTier.id]).toBe(30)
  })

  it('does not auto-consume XP for the last tier while its tier tickspeed autobuyer is paused (tierTickspeedAutobuyerEnabled false), even once XP-unlocked', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    let state = createInitialGameState()
    state = withLastTierTickspeedXpUnlocked(state)
    state = withTierTickspeedAutobuyer(state, lastTier.id)
    state = withTierTickspeedAutobuyerEnabled(state, lastTier.id, false)
    state = withOwned(state, thousandsTier.id, 30)
    state = withResource(state, thousandsTier.id, 30)
    state = withMoney(state, 5)
    state = withXP(state, 50)

    const after = tickGame(1)(state)
    expect(after.lastTierXpConsumed).toBe(0)
    expect(after.prestige.xp).toBe(50)
    expect(after.owned[thousandsTier.id]).toBe(30)
    expect(after.resources[thousandsTier.id]).toBe(30)
  })

  it('regression: before the last tier is XP-unlocked, its tier tickspeed autobuyer still drives the ordinary buyTickspeedMultiplier auto-upgrade, untouched by the XP-consumption branch', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    let state = createInitialGameState()
    state = withOwned(state, lastTier.id, 1) // below the block-size threshold, so not XP-unlocked
    state = withResource(state, lastTier.id, 11)
    state = withTierTickspeedAutobuyer(state, lastTier.id)
    state = withXP(state, 50)
    state = withMoney(state, 0)
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(false)

    const after = tickGame(1)(state)
    expect(after.tickspeedLevels[lastTier.id]).toBe(2)
    expect(after.prestige.xp).toBe(50)
    expect(after.lastTierXpConsumed).toBe(0)
  })

  it('does not scale a single delivery\'s amount by the tickspeed multiplier — it speeds up delivery frequency instead', () => {
    // Level 3 → ×1.21 (see getTickspeedProductionMultiplier), so this tier's effective tickspeed
    // period shrinks from the base 2s to 2/1.21s. Passing exactly that shrunk period as
    // elapsedSeconds triggers exactly one delivery — confirming it's still just `owned` (10), not
    // owned × 1.21 (12): the multiplier no longer inflates the delivered amount, only how soon the
    // next one arrives. Zero money so the autobuyer purchase step (which would otherwise buy
    // another unit and change `owned` before production is calculated) can't interfere.
    const tickspeedMultiplier = getTickspeedProductionMultiplier(3)
    const state = withMoney(
      withTickspeedLevel(withOwned(createInitialGameState(), tensTier.id, 10), tensTier.id, 3),
      0
    )
    const after = tickGame(2 / tickspeedMultiplier)(state)
    expect(after.resources[MONEY_ID]).toBe(10)
  })

  it('fires more delivery ticks within a fixed elapsed window at a higher tickspeed level, without changing the per-tick amount', () => {
    // Over a fixed 10-second window, the baseline (level 1, 2s period) delivers floor(10/2) = 5
    // batches of 10 = 50 total; level 3 (×1.21 speed, ~1.653s period) delivers
    // floor(10 × 1.21 / 2) = 6 batches of the same 10 each = 60 total — the same ×1.21 economy
    // bonus as before, now arrived at via more (not bigger) deliveries.
    const baseline = withMoney(withOwned(createInitialGameState(), tensTier.id, 10), 0)
    expect(tickGame(10)(baseline).resources[MONEY_ID]).toBe(50)

    const sped = withMoney(
      withTickspeedLevel(withOwned(createInitialGameState(), tensTier.id, 10), tensTier.id, 3),
      0
    )
    expect(tickGame(10)(sped).resources[MONEY_ID]).toBe(60)
  })

  it('speeds up every tier\'s delivery frequency at once via the global tickspeed multiplier, without changing the per-tick amount', () => {
    // Global level 10 = 9 regular 1% levels compounded, then the level-10 milestone at 10%
    // instead of 1% (see getGlobalTickspeedProductionMultiplier) — 1.01^9 * 1.10 ≈ ×1.2031, the
    // same frequency-scaling effect as the per-tier multiplier above, applied uniformly to every
    // tier at once, no per-tier tickspeed level involved here at all. Over a 100-second window
    // against tensTier's 2s base period: baseline delivers floor(100/2) = 50 batches of 10 = 500,
    // while floor(100 × 1.2031 / 2) = 60 batches of 10 = 600.
    const state = withMoney(
      withGlobalTickspeedMultiplier(withOwned(createInitialGameState(), tensTier.id, 10), 10),
      0
    )
    const after = tickGame(100)(state)
    expect(after.resources[MONEY_ID]).toBe(600)
  })

  it('stacks the global tickspeed multiplier multiplicatively with the per-tier tickspeed multiplier — both speed up the same delivery frequency together', () => {
    // Per-tier level 2 → ×1.1, global level 10 → 1.01^9 * 1.10 ≈ ×1.2031 → combined ≈ ×1.3234, not
    // simply additive. Over a 100-second window against tensTier's 2s base period:
    // floor(100 × 1.3234 / 2) = 66 batches of 10 each = 660.
    const state = withGlobalTickspeedMultiplier(
      withMoney(
        withTickspeedLevel(withOwned(createInitialGameState(), tensTier.id, 10), tensTier.id, 2),
        0
      ),
      10
    )
    const after = tickGame(100)(state)
    expect(after.resources[MONEY_ID]).toBe(660)
  })

  it('automatically triggers Speed Up when Auto Speed Up is bought and the last tier is eligible', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withAutoSpeedUp(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 2)
    )
    const after = tickGame(1)(state)
    expect(after.speedUpCount).toBe(1)
    expect(after.purchaseLevels[lastTier.id]).toBe(1)
  })

  it('does not trigger Speed Up automatically when the last tier is not yet eligible', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withAutoSpeedUp(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 1)
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

  it('does not trigger Speed Up automatically while Auto Speed Up is paused (autoSpeedUpEnabled false), even when eligible', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withAutoSpeedUpEnabled(
      withAutoSpeedUp(withPurchaseLevel(createInitialGameState(), lastTier.id, 2)),
      false
    )
    const after = tickGame(1)(state)
    expect(after.speedUpCount).toBe(0)
  })

  it('resumes triggering Speed Up automatically once Auto Speed Up is re-enabled', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const paused = withAutoSpeedUpEnabled(
      withAutoSpeedUp(withPurchaseLevel(createInitialGameState(), lastTier.id, 2)),
      false
    )
    const resumed = setAutoSpeedUpEnabled(true)(paused)
    const after = tickGame(1)(resumed)
    expect(after.speedUpCount).toBe(1)
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

  it('does not upgrade the global tickspeed multiplier automatically while the Tickspeed Autobuyer is paused (autoGlobalTickspeedEnabled false)', () => {
    const state = withAutoGlobalTickspeedEnabled(
      withAutoGlobalTickspeed(withMoney(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 10)),
      false
    )
    const after = tickGame(1)(state)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('resumes automatically upgrading the global tickspeed multiplier once the Tickspeed Autobuyer is re-enabled', () => {
    const paused = withAutoGlobalTickspeedEnabled(
      withAutoGlobalTickspeed(withMoney(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 10)),
      false
    )
    const resumed = setAutoGlobalTickspeedEnabled(true)(paused)
    const after = tickGame(1)(resumed)
    expect(after.globalTickspeedMultiplier).toBe(1)
  })

  it('automatically upgrades Auto-Prestige when the Auto-Prestige Autobuyer is bought and it is affordable', () => {
    const state = withAutoPrestigeAutobuyer(
      withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), getAutoPrestigeCost(1))
    )
    const after = tickGame(1)(state)
    expect(after.autoPrestige).toBe(2)
  })

  it('does not upgrade Auto-Prestige automatically without enough PP', () => {
    const state = withAutoPrestigeAutobuyer(
      withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), getAutoPrestigeCost(1) - 1)
    )
    const after = tickGame(1)(state)
    expect(after.autoPrestige).toBe(1)
  })

  it('does not upgrade Auto-Prestige automatically without the Auto-Prestige Autobuyer bought', () => {
    const state = withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), getAutoPrestigeCost(1))
    const after = tickGame(1)(state)
    expect(after.autoPrestige).toBe(1)
  })

  it('does not upgrade Auto-Prestige automatically while the Auto-Prestige Autobuyer is paused (autoPrestigeAutobuyerEnabled false)', () => {
    const state = withAutoPrestigeAutobuyerEnabled(
      withAutoPrestigeAutobuyer(withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), getAutoPrestigeCost(1))),
      false
    )
    const after = tickGame(1)(state)
    expect(after.autoPrestige).toBe(1)
  })

  it('resumes automatically upgrading Auto-Prestige once the Auto-Prestige Autobuyer is re-enabled', () => {
    const paused = withAutoPrestigeAutobuyerEnabled(
      withAutoPrestigeAutobuyer(withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), getAutoPrestigeCost(1))),
      false
    )
    const resumed = setAutoPrestigeAutobuyerEnabled(true)(paused)
    const after = tickGame(1)(resumed)
    expect(after.autoPrestige).toBe(2)
  })

  it('does not purchase automatically while a tier\'s autobuyer is paused (autobuyersEnabled false), even when affordable', () => {
    const state = withAutobuyerEnabled(
      withAutobuyer(withMoney(createInitialGameState(), 10000), tensTier.id),
      tensTier.id,
      false
    )
    const after = tickGame(1)(state)
    expect(after.owned[tensTier.id]).toBe(0)
    // Treated exactly like "never unlocked" for automation purposes — the attempt budget stops
    // accumulating too, not just the purchase itself.
    expect(after.autobuyerAttemptBudgets[tensTier.id]).toBe(0)
  })

  it('resumes purchasing automatically once a paused tier\'s autobuyer is re-enabled', () => {
    const paused = withAutobuyerEnabled(
      withAutobuyer(withMoney(createInitialGameState(), 10000), tensTier.id),
      tensTier.id,
      false
    )
    const resumed = setAutobuyerEnabled(tensTier.id, true)(paused)
    const after = tickGame(1)(resumed)
    expect(after.owned[tensTier.id]).toBe(1)
  })

  it('pausing one tier\'s autobuyer does not affect a different tier\'s autobuyer', () => {
    const state = withAutobuyerEnabled(
      withAutobuyer(
        withAutobuyer(withMoney(withOwned(createInitialGameState(), thousandsTier.id, 1), 2_000_000), tensTier.id),
        thousandsTier.id
      ),
      tensTier.id,
      false
    )
    const after = tickGame(1)(state)
    expect(after.owned[tensTier.id]).toBe(0)
    expect(after.owned[thousandsTier.id]).toBeGreaterThan(1)
  })

  it('does not upgrade a tier\'s own tickspeed multiplier automatically while its tier tickspeed autobuyer is paused (tierTickspeedAutobuyerEnabled false)', () => {
    const tier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 2]
    const state = withTierTickspeedAutobuyerEnabled(
      withTierTickspeedAutobuyer(
        withResource(withOwned(createInitialGameState(), tier.id, 1), tier.id, 101),
        tier.id
      ),
      tier.id,
      false
    )
    const after = tickGame(1)(state)
    expect(after.tickspeedLevels[tier.id]).toBe(1)
  })

  it('resumes automatically upgrading a tier\'s own tickspeed multiplier once its tier tickspeed autobuyer is re-enabled', () => {
    const tier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 2]
    const paused = withTierTickspeedAutobuyerEnabled(
      withTierTickspeedAutobuyer(
        withResource(withOwned(createInitialGameState(), tier.id, 1), tier.id, 101),
        tier.id
      ),
      tier.id,
      false
    )
    const resumed = setTierTickspeedAutobuyerEnabled(tier.id, true)(paused)
    const after = tickGame(1)(resumed)
    expect(after.tickspeedLevels[tier.id]).toBe(2)
  })

  it('pausing one tier\'s tier tickspeed autobuyer does not affect a different tier\'s', () => {
    const tierA = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 2]
    const tierB = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 3]
    const state = withTierTickspeedAutobuyerEnabled(
      withTierTickspeedAutobuyer(
        withTierTickspeedAutobuyer(
          withResource(
            withResource(withOwned(withOwned(createInitialGameState(), tierA.id, 1), tierB.id, 1), tierA.id, 101),
            tierB.id,
            1001
          ),
          tierA.id
        ),
        tierB.id
      ),
      tierA.id,
      false
    )
    const after = tickGame(1)(state)
    expect(after.tickspeedLevels[tierA.id]).toBe(1)
    expect(after.tickspeedLevels[tierB.id]).toBe(2)
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
    // tensTier's own 2s tickspeed fits 5 full periods into 10 simulated seconds: 5 generators × 5
    // periods = +25 money
    expect(after.resources[MONEY_ID]).toBe(state.resources[MONEY_ID] + 25)
  })

  it('is a no-op for a gap too short to register a single simulated second', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 5)
    const after = applyOfflineProgress(5)(state) // 0.5 simulated seconds → floors to 0
    expect(after).toBe(state)
  })

  it('runs an active autobuyer across each simulated second, not just once', () => {
    const state = withAutobuyer(withMoney(createInitialGameState(), 100000), tensTier.id, 2)
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

  it('formats an exact hour with 0 minutes rather than dropping to the minutes-only branch', () => {
    expect(formatOfflineDuration(3600)).toBe('1h 0m')
  })

  it('formats an exact minute with 0 seconds rather than dropping to the seconds-only branch', () => {
    expect(formatOfflineDuration(60)).toBe('1m 0s')
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

  it('refuses to level up once production is frozen at PRESTIGE_THRESHOLD, even with plenty of the tier\'s own resource', () => {
    const state = withMoney(
      withResource(unlockedLastTierState(), lastTier.id, 11),
      PRESTIGE_THRESHOLD
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

  it('falls back to level 1 (baseline) when tickspeedLevels is missing from state entirely, upgrading to level 2', () => {
    const state = omit(withResource(unlockedLastTierState(), lastTier.id, 11), 'tickspeedLevels')
    const after = buyTickspeedMultiplier(lastTier.id)(state)
    expect(after.tickspeedLevels[lastTier.id]).toBe(2)
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

  it('refuses to spend once production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(
      withPrestigePoints(withAutobuyer(unlockedLastTierState(), lastTier.id, 1), 100),
      PRESTIGE_THRESHOLD
    )
    expect(buySmartAutobuyer(lastTier.id)(state)).toBe(state)
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

  it('refuses to spend once production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(withPrestigePoints(createInitialGameState(), 1000), PRESTIGE_THRESHOLD)
    expect(buyAutoPrestige(state)).toBe(state)
  })
})

describe('buyAutoPrestigeAutobuyer', () => {
  it(`spends ${AUTO_PRESTIGE_AUTOBUYER_COST} PP to permanently automate re-leveling Auto-Prestige`, () => {
    const state = withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), AUTO_PRESTIGE_AUTOBUYER_COST)
    const after = buyAutoPrestigeAutobuyer(state)
    expect(after.autoPrestigeAutobuyer).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('returns the same state when Auto-Prestige has not been activated yet (still null)', () => {
    const state = withPrestigePoints(createInitialGameState(), AUTO_PRESTIGE_AUTOBUYER_COST)
    expect(buyAutoPrestigeAutobuyer(state)).toBe(state)
  })

  it('returns the same state when there are not enough points', () => {
    const state = withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), AUTO_PRESTIGE_AUTOBUYER_COST - 1)
    expect(buyAutoPrestigeAutobuyer(state)).toBe(state)
  })

  it('returns the same state when already bought (one-time purchase)', () => {
    const state = withAutoPrestigeAutobuyer(
      withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), AUTO_PRESTIGE_AUTOBUYER_COST)
    )
    expect(buyAutoPrestigeAutobuyer(state)).toBe(state)
  })

  it('refuses to spend once production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(
      withPrestigePoints(withAutoPrestige(createInitialGameState(), 1), AUTO_PRESTIGE_AUTOBUYER_COST),
      PRESTIGE_THRESHOLD
    )
    expect(buyAutoPrestigeAutobuyer(state)).toBe(state)
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

  it('falls back to false when owned/globalTickspeedMultiplier are missing from state entirely', () => {
    expect(isGlobalTickspeedMultiplierUnlocked({ owned: {} })).toBe(false)
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

  it('refuses to spend once production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), PRESTIGE_THRESHOLD)
    expect(buyGlobalTickspeedMultiplier(state)).toBe(state)
  })

  it('returns the same state when Money is missing from state.resources entirely (falls back to 0, insufficient)', () => {
    const state = { resources: {}, owned: { [TIER_DEFINITIONS[1].id]: 1 }, globalTickspeedMultiplier: null }
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

  it('refuses to spend once production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(
      withPrestigePoints(createInitialGameState(), PRESTIGE_SPEED_BONUS_UNLOCK_COST),
      PRESTIGE_THRESHOLD
    )
    expect(buyPrestigeSpeedBonus(state)).toBe(state)
  })
})

// ─── prestigeGame ────────────────────────────────────────────────────────────

describe('prestigeGame', () => {
  it('does nothing when money < PRESTIGE_THRESHOLD', () => {
    // PRESTIGE_THRESHOLD - 1 rounds back to PRESTIGE_THRESHOLD at this magnitude (float precision), so use a value
    // that's meaningfully smaller instead of relying on an off-by-one difference.
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD / 10)
    expect(prestigeGame(state)).toBe(state)
  })

  it('does nothing when money is undefined or non-finite (corrupted save)', () => {
    const undefinedMoney = withMoney(createInitialGameState(), undefined)
    expect(prestigeGame(undefinedMoney)).toBe(undefinedMoney)

    const nanMoney = withMoney(createInitialGameState(), NaN)
    expect(prestigeGame(nanMoney)).toBe(nanMoney)
  })

  it('increments prestige count by 1', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    const after = prestigeGame(state)
    expect(after.prestige.count).toBe(1)
  })

  it('awards 1 Prestige Point at exactly PRESTIGE_THRESHOLD', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    const after = prestigeGame(state)
    expect(after.prestige.points).toBe(1)
  })

  it('awards more Prestige Points once the exponent reaches a further full multiple of 100', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD * 1e100)
    const after = prestigeGame(state)
    expect(after.prestige.points).toBe(2)
  })

  it('adds newly-awarded points on top of any already-unspent points', () => {
    const state = withPrestigePoints(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), 10)
    const after = prestigeGame(state)
    expect(after.prestige.points).toBe(11)
  })

  it('keeps an unlocked autobuyer permanently active across prestige, resetting the tier\'s tickspeed level to baseline (1)', () => {
    const state = withTickspeedLevel(
      withAutobuyer(
        withMoney(createInitialGameState(), PRESTIGE_THRESHOLD),
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
      withMoney(createInitialGameState(), PRESTIGE_THRESHOLD),
      tensTier.id
    )
    const after = prestigeGame(state)
    expect(after.smartAutobuyer[tensTier.id]).toBe(true)
  })

  it('keeps the tier tickspeed autobuyer flag permanently across prestige', () => {
    const state = withTierTickspeedAutobuyer(
      withMoney(createInitialGameState(), PRESTIGE_THRESHOLD),
      tensTier.id
    )
    const after = prestigeGame(state)
    expect(after.tierTickspeedAutobuyer[tensTier.id]).toBe(true)
  })

  it('keeps a paused (disabled) per-tier autobuyer/tier tickspeed autobuyer permanently paused across prestige', () => {
    const state = withTierTickspeedAutobuyerEnabled(
      withAutobuyerEnabled(
        withTierTickspeedAutobuyer(
          withAutobuyer(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id),
          tensTier.id
        ),
        tensTier.id,
        false
      ),
      tensTier.id,
      false
    )
    const after = prestigeGame(state)
    expect(after.autobuyersEnabled[tensTier.id]).toBe(false)
    expect(after.tierTickspeedAutobuyerEnabled[tensTier.id]).toBe(false)
  })

  it('keeps the Auto-Prestige level permanently across prestige', () => {
    const state = withAutoPrestige(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), 3)
    const after = prestigeGame(state)
    expect(after.autoPrestige).toBe(3)
  })

  it('resets the global tickspeed multiplier level to not-yet-bought across prestige, same as Speed Up', () => {
    const state = withGlobalTickspeedMultiplier(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), 3)
    const after = prestigeGame(state)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('keeps the prestige speed bonus unlock permanently across prestige', () => {
    const state = withPrestigeSpeedBonusUnlocked(
      withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    )
    const after = prestigeGame(state)
    expect(after.prestigeSpeedBonusUnlocked).toBe(true)
  })

  it('resets the Speed Up count to 0 across prestige', () => {
    const state = withSpeedUpCount(
      withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), 3
    )
    const after = prestigeGame(state)
    expect(after.speedUpCount).toBe(0)
  })

  it('resets the Overclock count to 0 across prestige, same as Speed Up', () => {
    const state = withOverclockCount(
      withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), 3
    )
    const after = prestigeGame(state)
    expect(after.overclockCount).toBe(0)
  })

  it('keeps the Auto Speed Up flag permanently across prestige', () => {
    const state = withAutoSpeedUp(
      withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    )
    const after = prestigeGame(state)
    expect(after.autoSpeedUp).toBe(true)
  })

  it('keeps the Tickspeed Autobuyer flag permanently across prestige', () => {
    const state = withAutoGlobalTickspeed(
      withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    )
    const after = prestigeGame(state)
    expect(after.autoGlobalTickspeed).toBe(true)
  })

  it('keeps the Auto-Prestige Autobuyer flag permanently across prestige', () => {
    const state = withAutoPrestigeAutobuyer(
      withAutoPrestige(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), 1)
    )
    const after = prestigeGame(state)
    expect(after.autoPrestigeAutobuyer).toBe(true)
  })

  it('keeps a paused (disabled) global automation permanently paused across prestige, same as the parent unlock flag', () => {
    const state = withAutoPrestigeAutobuyerEnabled(
      withAutoPrestigeEnabled(
        withAutoGlobalTickspeedEnabled(
          withAutoSpeedUpEnabled(
            withAutoPrestigeAutobuyer(
              withAutoPrestige(
                withAutoGlobalTickspeed(
                  withAutoSpeedUp(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD))
                ),
                1
              )
            ),
            false
          ),
          false
        ),
        false
      ),
      false
    )
    const after = prestigeGame(state)
    expect(after.autoSpeedUpEnabled).toBe(false)
    expect(after.autoGlobalTickspeedEnabled).toBe(false)
    expect(after.autoPrestigeEnabled).toBe(false)
    expect(after.autoPrestigeAutobuyerEnabled).toBe(false)
  })

  it('resets the Auto-Prestige attempt budget to 0 on prestige', () => {
    const state = withAutoPrestigeBudget(
      withAutoPrestige(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)),
      0.7
    )
    const after = prestigeGame(state)
    expect(after.autoPrestigeAttemptBudget).toBe(0)
  })

  it('resets XP to 0, a run-scoped currency unlike Prestige Points', () => {
    const state = withXP(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), 7)
    const after = prestigeGame(state)
    expect(after.prestige.xp).toBe(0)
  })

  it('resets money to starting amount', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD + 99999)
    const after = prestigeGame(state)
    expect(after.resources[MONEY_ID]).toBe(1)
  })

  it('resets all owned counts to 0, along with every tier\'s purchaseLevels/purchaseLevelProgress', () => {
    const state = withPurchaseLevelProgress(
      withPurchaseLevel(
        withOwned(
          withMoney(createInitialGameState(), PRESTIGE_THRESHOLD),
          tensTier.id, 50
        ),
        tensTier.id, 5
      ),
      tensTier.id, 3
    )
    const after = prestigeGame(state)
    TIER_DEFINITIONS.forEach(tier => {
      expect(after.owned[tier.id]).toBe(0)
      expect(after.purchaseLevels[tier.id]).toBe(1)
      expect(after.purchaseLevelProgress[tier.id]).toBe(0)
    })
    // Resetting the last tier's level also resets the (derived) block size back to the default.
    expect(getPurchaseBlockSize(after)).toBe(DEFAULT_PURCHASE_BLOCK_SIZE)
  })

  it('keeps an unlocked tier\'s autobuyer flag active across prestige', () => {
    const state = withAutobuyer(
      withMoney(createInitialGameState(), PRESTIGE_THRESHOLD),
      tensTier.id, 1
    )
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).not.toBeNull()
  })

  it('resets a tier\'s tickspeed level back to the baseline (1) on prestige', () => {
    const state = withTickspeedLevel(
      withMoney(createInitialGameState(), PRESTIGE_THRESHOLD),
      tensTier.id, 3
    )
    const after = prestigeGame(state)
    expect(after.tickspeedLevels[tensTier.id]).toBe(1)
  })

  it('auto-unlocks the first tier\'s autobuyer on the very first prestige (milestone 1)', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    const after = prestigeGame(state)
    expect(after.autobuyers[tensTier.id]).toBe(1)
  })

  it('leaves a later tier\'s autobuyer locked (null) until its own milestone is reached', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    const after = prestigeGame(state)
    expect(after.prestige.count).toBe(1)
    expect(after.autobuyers[thousandsTier.id]).toBeNull()
  })

  it('resets the last tier\'s owned count (disengaging its live XP tickspeed check) and resets lastTierXpConsumed to 0 across prestige', () => {
    const state = withLastTierXpConsumed(
      withLastTierTickspeedXpUnlocked(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)),
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
      withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), thousandsTier.id, 50),
      thousandsTier.id,
      true
    )
    const after = prestigeGame(state)
    expect(after.owned[thousandsTier.id]).toBe(0)
    expect(after.everUnlockedTierIds[thousandsTier.id]).toBe(false)
    expect(isTierUnlocked(after)(thousandsTier)).toBe(false)
  })

  it('falls back to fresh-state defaults for every permanent automation flag when the incoming state predates them entirely (e.g. a state that never went through storage.js\'s schema-migration fallbacks)', () => {
    const fresh = createInitialGameState()
    const state = omit(
      withMoney(fresh, PRESTIGE_THRESHOLD),
      'autobuyers', 'autobuyersEnabled', 'smartAutobuyer', 'tierTickspeedAutobuyer',
      'tierTickspeedAutobuyerEnabled', 'autoPrestige', 'autoPrestigeEnabled',
      'autoPrestigeAutobuyer', 'autoPrestigeAutobuyerEnabled', 'prestigeSpeedBonusUnlocked',
      'autoSpeedUp', 'autoSpeedUpEnabled', 'autoGlobalTickspeed', 'autoGlobalTickspeedEnabled'
    )
    const after = prestigeGame(state)
    // The first tier's autobuyer auto-unlocks at milestone 1 (this prestige's count reaches 1) —
    // confirms the autobuyers fallback produced a real object (not undefined) applyAutobuyerMilestones
    // could safely build on, with every other tier still correctly null (not undefined).
    expect(after.autobuyers[tensTier.id]).toBe(1)
    expect(after.autobuyers[thousandsTier.id]).toBeNull()
    expect(after.autobuyersEnabled).toEqual(fresh.autobuyersEnabled)
    expect(after.smartAutobuyer).toEqual(fresh.smartAutobuyer)
    expect(after.tierTickspeedAutobuyer).toEqual(fresh.tierTickspeedAutobuyer)
    expect(after.tierTickspeedAutobuyerEnabled).toEqual(fresh.tierTickspeedAutobuyerEnabled)
    expect(after.autoPrestige).toBe(fresh.autoPrestige)
    expect(after.autoPrestigeEnabled).toBe(fresh.autoPrestigeEnabled)
    expect(after.autoPrestigeAutobuyer).toBe(fresh.autoPrestigeAutobuyer)
    expect(after.autoPrestigeAutobuyerEnabled).toBe(fresh.autoPrestigeAutobuyerEnabled)
    expect(after.prestigeSpeedBonusUnlocked).toBe(fresh.prestigeSpeedBonusUnlocked)
    expect(after.autoSpeedUp).toBe(fresh.autoSpeedUp)
    expect(after.autoSpeedUpEnabled).toBe(fresh.autoSpeedUpEnabled)
    expect(after.autoGlobalTickspeed).toBe(fresh.autoGlobalTickspeed)
    expect(after.autoGlobalTickspeedEnabled).toBe(fresh.autoGlobalTickspeedEnabled)
  })

  it('resets the Byte Foundry\'s Memory/gate/transfer budget across prestige, but keeps the generator and its upgrades permanent', () => {
    const state = withIntro(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), {
      bits: 500,
      capacity: 8000,
      byteCreated: true,
      tickSpeedSeconds: 0.125,
      productionMultiplier: 4,
      productionMilestoneTier: 3,
      productionMilestoneTierClaims: 1,
      productionAccumulator: 2.5,
      mainGameUnlocked: true,
      bitsTransferredThisCycle: 8000,
    })
    const after = prestigeGame(state)
    // Memory + the gate + the transfer budget reset to fresh.
    expect(after.intro.bits).toBe(0)
    expect(after.intro.productionAccumulator).toBe(0)
    expect(after.intro.mainGameUnlocked).toBe(false)
    expect(after.intro.bitsTransferredThisCycle).toBe(0)
    // The generator and every upgrade to it are permanent — carried over unchanged.
    expect(after.intro.capacity).toBe(8000)
    expect(after.intro.byteCreated).toBe(true)
    expect(after.intro.tickSpeedSeconds).toBe(0.125)
    expect(after.intro.productionMultiplier).toBe(4)
    expect(after.intro.productionMilestoneTier).toBe(3)
    expect(after.intro.productionMilestoneTierClaims).toBe(1)
  })

  it('resets resources/owned together with the intro\'s Memory in the same prestige, with no stale Byte-Foundry-granted units left over', () => {
    const state = withIntro(
      withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id, 8),
      { bits: 4000, capacity: 8000, byteCreated: true, mainGameUnlocked: true, bitsTransferredThisCycle: 4000 }
    )
    const after = prestigeGame(state)
    expect(after.owned[tensTier.id]).toBe(0)
    expect(after.intro.bits).toBe(0)
    expect(after.intro.mainGameUnlocked).toBe(false)
    expect(after.intro.bitsTransferredThisCycle).toBe(0)
    // capacity/byteCreated (the generator) are untouched by this same reset — no stale bits, but
    // no stale/wiped generator progress either.
    expect(after.intro.capacity).toBe(8000)
    expect(after.intro.byteCreated).toBe(true)
  })

  it('falls back to fresh generator defaults when the incoming state predates the Byte Foundry intro field entirely', () => {
    const fresh = createInitialGameState()
    const state = omit(withMoney(fresh, PRESTIGE_THRESHOLD), 'intro')
    const after = prestigeGame(state)
    expect(after.intro).toEqual(fresh.intro)
  })
})

// ─── speedUpGame ─────────────────────────────────────────────────────────────

describe('speedUpGame', () => {
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  const eligibleState = () => withPurchaseLevel(createInitialGameState(), lastTier.id, 2)

  it('does nothing when the last tier is below the required level', () => {
    const state = withPurchaseLevel(createInitialGameState(), lastTier.id, 1)
    expect(speedUpGame(state)).toBe(state)
  })

  it('does nothing while production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(eligibleState(), PRESTIGE_THRESHOLD)
    expect(speedUpGame(state)).toBe(state)
  })

  it('increments speedUpCount by 1', () => {
    const after = speedUpGame(eligibleState())
    expect(after.speedUpCount).toBe(1)
  })

  it('requires one more level on each subsequent activation', () => {
    // After 1 prior activation, the requirement is level 3, not the level 2 the first cycle needed.
    const stillLevel2 = withSpeedUpCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 2), 1
    )
    expect(speedUpGame(stillLevel2)).toBe(stillLevel2)

    const level3 = withSpeedUpCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 3), 1
    )
    const after = speedUpGame(level3)
    expect(after.speedUpCount).toBe(2)
  })

  it('stacks across repeated activations', () => {
    // getSpeedUpRequirement(2) = level 4
    const state = withSpeedUpCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 4), 2
    )
    const after = speedUpGame(state)
    expect(after.speedUpCount).toBe(3)
  })

  it('resets money to the starting amount', () => {
    const state = withMoney(eligibleState(), 99999)
    const after = speedUpGame(state)
    expect(after.resources[MONEY_ID]).toBe(1)
  })

  it('resets all owned and purchased counts to 0, along with every tier\'s purchaseLevels/purchaseLevelProgress', () => {
    const state = withPurchaseLevelProgress(
      withOwned(eligibleState(), tensTier.id, 50),
      tensTier.id, 3
    )
    const after = speedUpGame(state)
    TIER_DEFINITIONS.forEach(tier => {
      expect(after.owned[tier.id]).toBe(0)
      expect(after.purchased[tier.id]).toBe(0)
      expect(after.purchaseLevels[tier.id]).toBe(1)
      expect(after.purchaseLevelProgress[tier.id]).toBe(0)
    })
    // Resetting the last tier's level also resets the (derived) block size back to the default.
    expect(getPurchaseBlockSize(after)).toBe(DEFAULT_PURCHASE_BLOCK_SIZE)
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

  it('keeps a paused (disabled) per-tier autobuyer/tier tickspeed autobuyer permanently paused', () => {
    const state = withTierTickspeedAutobuyerEnabled(
      withAutobuyerEnabled(
        withTierTickspeedAutobuyer(withAutobuyer(eligibleState(), tensTier.id), tensTier.id),
        tensTier.id,
        false
      ),
      tensTier.id,
      false
    )
    const after = speedUpGame(state)
    expect(after.autobuyersEnabled[tensTier.id]).toBe(false)
    expect(after.tierTickspeedAutobuyerEnabled[tensTier.id]).toBe(false)
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

  it('keeps the Auto-Prestige Autobuyer flag permanently', () => {
    const state = withAutoPrestigeAutobuyer(withAutoPrestige(eligibleState(), 1))
    const after = speedUpGame(state)
    expect(after.autoPrestigeAutobuyer).toBe(true)
  })

  it('keeps a paused (disabled) global automation permanently paused, same as the parent unlock flag', () => {
    const state = withAutoPrestigeAutobuyerEnabled(
      withAutoPrestigeEnabled(
        withAutoGlobalTickspeedEnabled(
          withAutoSpeedUpEnabled(
            withAutoPrestigeAutobuyer(
              withAutoPrestige(
                withAutoGlobalTickspeed(withAutoSpeedUp(eligibleState())),
                1
              )
            ),
            false
          ),
          false
        ),
        false
      ),
      false
    )
    const after = speedUpGame(state)
    expect(after.autoSpeedUpEnabled).toBe(false)
    expect(after.autoGlobalTickspeedEnabled).toBe(false)
    expect(after.autoPrestigeEnabled).toBe(false)
    expect(after.autoPrestigeAutobuyerEnabled).toBe(false)
  })

  it('leaves Prestige Points and count untouched, but resets XP to 0', () => {
    const state = withXP(withPrestigePoints(eligibleState(), 42), 7)
    const after = speedUpGame(state)
    expect(after.prestige.points).toBe(42)
    expect(after.prestige.count).toBe(0)
    expect(after.prestige.xp).toBe(0)
  })

  it('resets the highestMilestone watermark to the fresh initial value, so the next run earns XP from scratch instead of only past the previous run\'s peak', () => {
    const state = {
      ...eligibleState(),
      prestige: { ...eligibleState().prestige, highestMilestone: 30 },
    }
    const after = speedUpGame(state)
    expect(after.prestige.highestMilestone).toBe(createInitialGameState().prestige.highestMilestone)
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

  it('falls back to fresh-state defaults for every permanent automation flag when the incoming state predates them entirely', () => {
    const fresh = createInitialGameState()
    const state = omit(
      eligibleState(),
      'autobuyers', 'autobuyersEnabled', 'smartAutobuyer', 'tierTickspeedAutobuyer',
      'tierTickspeedAutobuyerEnabled', 'autoPrestige', 'autoPrestigeEnabled',
      'autoPrestigeAutobuyer', 'autoPrestigeAutobuyerEnabled', 'prestigeSpeedBonusUnlocked',
      'autoSpeedUp', 'autoSpeedUpEnabled', 'autoGlobalTickspeed', 'autoGlobalTickspeedEnabled'
    )
    const after = speedUpGame(state)
    expect(after.autobuyers).toEqual(fresh.autobuyers)
    expect(after.autobuyersEnabled).toEqual(fresh.autobuyersEnabled)
    expect(after.smartAutobuyer).toEqual(fresh.smartAutobuyer)
    expect(after.tierTickspeedAutobuyer).toEqual(fresh.tierTickspeedAutobuyer)
    expect(after.tierTickspeedAutobuyerEnabled).toEqual(fresh.tierTickspeedAutobuyerEnabled)
    expect(after.autoPrestige).toBe(fresh.autoPrestige)
    expect(after.autoPrestigeEnabled).toBe(fresh.autoPrestigeEnabled)
    expect(after.autoPrestigeAutobuyer).toBe(fresh.autoPrestigeAutobuyer)
    expect(after.autoPrestigeAutobuyerEnabled).toBe(fresh.autoPrestigeAutobuyerEnabled)
    expect(after.prestigeSpeedBonusUnlocked).toBe(fresh.prestigeSpeedBonusUnlocked)
    expect(after.autoSpeedUp).toBe(fresh.autoSpeedUp)
    expect(after.autoSpeedUpEnabled).toBe(fresh.autoSpeedUpEnabled)
    expect(after.autoGlobalTickspeed).toBe(fresh.autoGlobalTickspeed)
    expect(after.autoGlobalTickspeedEnabled).toBe(fresh.autoGlobalTickspeedEnabled)
  })

  it('falls back to level 1 for the last tier when purchaseLevels is missing from state entirely, which never meets the (≥2) requirement', () => {
    const state = omit(withMoney(createInitialGameState(), 1), 'purchaseLevels')
    expect(speedUpGame(state)).toBe(state)
  })

  it('falls back to 0 when speedUpCount is missing from state entirely', () => {
    const state = omit(eligibleState(), 'speedUpCount')
    const after = speedUpGame(state)
    expect(after.speedUpCount).toBe(1)
  })

  it('keeps overclockCount permanently across an ordinary Speed Up', () => {
    const state = withOverclockCount(eligibleState(), 4)
    const after = speedUpGame(state)
    expect(after.overclockCount).toBe(4)
  })

  it('keeps the Byte Foundry intro state permanently untouched across speed up, unlike prestige', () => {
    const seededIntro = {
      bits: 500, capacity: 8000, byteCreated: true, tickSpeedSeconds: 0.125, productionMultiplier: 4,
      productionMilestoneTier: 3, productionMilestoneTierClaims: 1, productionAccumulator: 2.5,
      mainGameUnlocked: true, bitsTransferredThisCycle: 8000,
    }
    const state = withIntro(eligibleState(), seededIntro)
    const after = speedUpGame(state)
    expect(after.intro).toEqual(seededIntro)
  })
})

// ─── overclockGame ───────────────────────────────────────────────────────────

describe('overclockGame', () => {
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  // getOverclockRequirement(0) = 10
  const eligibleState = () => withPurchaseLevel(createInitialGameState(), lastTier.id, 10)

  it('does nothing when the last tier is below the required level', () => {
    const state = withPurchaseLevel(createInitialGameState(), lastTier.id, 9)
    expect(overclockGame(state)).toBe(state)
  })

  it('does nothing while production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(eligibleState(), PRESTIGE_THRESHOLD)
    expect(overclockGame(state)).toBe(state)
  })

  it('increments overclockCount by 1', () => {
    const after = overclockGame(eligibleState())
    expect(after.overclockCount).toBe(1)
  })

  it('requires 10 more levels on each subsequent activation, not the +1 ladder Speed Up uses', () => {
    // After 1 prior activation, the requirement is level 20, not level 11.
    const stillLevel10 = withOverclockCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 10), 1
    )
    expect(overclockGame(stillLevel10)).toBe(stillLevel10)

    const level20 = withOverclockCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 20), 1
    )
    const after = overclockGame(level20)
    expect(after.overclockCount).toBe(2)
  })

  it('resets speedUpCount to 0, wiping Speed Up\'s own stacking bonus', () => {
    const state = withSpeedUpCount(eligibleState(), 5)
    const after = overclockGame(state)
    expect(after.speedUpCount).toBe(0)
  })

  it('resets money to the starting amount', () => {
    const state = withMoney(eligibleState(), 99999)
    const after = overclockGame(state)
    expect(after.resources[MONEY_ID]).toBe(1)
  })

  it('resets all owned and purchased counts to 0, along with every tier\'s purchaseLevels/purchaseLevelProgress', () => {
    const state = withPurchaseLevelProgress(
      withOwned(eligibleState(), tensTier.id, 50),
      tensTier.id, 3
    )
    const after = overclockGame(state)
    TIER_DEFINITIONS.forEach(tier => {
      expect(after.owned[tier.id]).toBe(0)
      expect(after.purchased[tier.id]).toBe(0)
      expect(after.purchaseLevels[tier.id]).toBe(1)
      expect(after.purchaseLevelProgress[tier.id]).toBe(0)
    })
    expect(getPurchaseBlockSize(after)).toBe(DEFAULT_PURCHASE_BLOCK_SIZE)
  })

  it('keeps an unlocked tier\'s autobuyer flag active across Overclock', () => {
    const state = withAutobuyer(eligibleState(), tensTier.id, 1)
    const after = overclockGame(state)
    expect(after.autobuyers[tensTier.id]).not.toBeNull()
  })

  it('resets a tier\'s tickspeed level back to the baseline (1) on Overclock', () => {
    const state = withTickspeedLevel(eligibleState(), tensTier.id, 3)
    const after = overclockGame(state)
    expect(after.tickspeedLevels[tensTier.id]).toBe(1)
  })

  it('keeps the smart autobuyer flag permanently', () => {
    const state = withSmartAutobuyer(eligibleState(), tensTier.id)
    const after = overclockGame(state)
    expect(after.smartAutobuyer[tensTier.id]).toBe(true)
  })

  it('keeps the tier tickspeed autobuyer flag permanently', () => {
    const state = withTierTickspeedAutobuyer(eligibleState(), tensTier.id)
    const after = overclockGame(state)
    expect(after.tierTickspeedAutobuyer[tensTier.id]).toBe(true)
  })

  it('keeps the Auto-Prestige level permanently', () => {
    const state = withAutoPrestige(eligibleState(), 3)
    const after = overclockGame(state)
    expect(after.autoPrestige).toBe(3)
  })

  it('resets the global tickspeed multiplier level back to not-yet-bought (null)', () => {
    const state = withGlobalTickspeedMultiplier(eligibleState(), 3)
    const after = overclockGame(state)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('keeps the Tickspeed Autobuyer (automation toggle) permanently even though the level itself resets', () => {
    const state = withAutoGlobalTickspeed(withGlobalTickspeedMultiplier(eligibleState(), 3))
    const after = overclockGame(state)
    expect(after.autoGlobalTickspeed).toBe(true)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('keeps the prestige speed bonus unlock permanently', () => {
    const state = withPrestigeSpeedBonusUnlocked(eligibleState())
    const after = overclockGame(state)
    expect(after.prestigeSpeedBonusUnlocked).toBe(true)
  })

  it('keeps the Auto Speed Up flag permanently', () => {
    const state = withAutoSpeedUp(eligibleState())
    const after = overclockGame(state)
    expect(after.autoSpeedUp).toBe(true)
  })

  it('keeps the Auto-Prestige Autobuyer flag permanently', () => {
    const state = withAutoPrestigeAutobuyer(withAutoPrestige(eligibleState(), 1))
    const after = overclockGame(state)
    expect(after.autoPrestigeAutobuyer).toBe(true)
  })

  it('keeps a paused (disabled) global automation permanently paused, same as the parent unlock flag', () => {
    const state = withAutoPrestigeAutobuyerEnabled(
      withAutoPrestigeEnabled(
        withAutoGlobalTickspeedEnabled(
          withAutoSpeedUpEnabled(
            withAutoPrestigeAutobuyer(
              withAutoPrestige(
                withAutoGlobalTickspeed(withAutoSpeedUp(eligibleState())),
                1
              )
            ),
            false
          ),
          false
        ),
        false
      ),
      false
    )
    const after = overclockGame(state)
    expect(after.autoSpeedUpEnabled).toBe(false)
    expect(after.autoGlobalTickspeedEnabled).toBe(false)
    expect(after.autoPrestigeEnabled).toBe(false)
    expect(after.autoPrestigeAutobuyerEnabled).toBe(false)
  })

  it('leaves Prestige Points and count untouched, but resets XP to 0', () => {
    const state = withXP(withPrestigePoints(eligibleState(), 42), 7)
    const after = overclockGame(state)
    expect(after.prestige.points).toBe(42)
    expect(after.prestige.count).toBe(0)
    expect(after.prestige.xp).toBe(0)
  })

  it('resets the highestMilestone watermark to the fresh initial value', () => {
    const state = {
      ...eligibleState(),
      prestige: { ...eligibleState().prestige, highestMilestone: 30 },
    }
    const after = overclockGame(state)
    expect(after.prestige.highestMilestone).toBe(createInitialGameState().prestige.highestMilestone)
  })

  it('resets the last tier\'s owned count (disengaging its live XP tickspeed check) and resets lastTierXpConsumed to 0 across Overclock', () => {
    const state = withLastTierXpConsumed(
      withLastTierTickspeedXpUnlocked(eligibleState()),
      42
    )
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(true)
    const after = overclockGame(state)
    expect(after.owned[lastTier.id]).toBe(0)
    expect(isLastTierTickspeedXpUnlocked(after)).toBe(false)
    expect(after.lastTierXpConsumed).toBe(0)
  })

  it('resets everUnlockedTierIds on Overclock, same as owned/purchased, so a tier relocks like it always has', () => {
    const state = withEverUnlockedTierIds(
      withOwned(eligibleState(), thousandsTier.id, 50),
      thousandsTier.id,
      true
    )
    const after = overclockGame(state)
    expect(after.owned[thousandsTier.id]).toBe(0)
    expect(after.everUnlockedTierIds[thousandsTier.id]).toBe(false)
    expect(isTierUnlocked(after)(thousandsTier)).toBe(false)
  })

  it('falls back to fresh-state defaults for every permanent automation flag when the incoming state predates them entirely', () => {
    const fresh = createInitialGameState()
    const state = omit(
      eligibleState(),
      'autobuyers', 'autobuyersEnabled', 'smartAutobuyer', 'tierTickspeedAutobuyer',
      'tierTickspeedAutobuyerEnabled', 'autoPrestige', 'autoPrestigeEnabled',
      'autoPrestigeAutobuyer', 'autoPrestigeAutobuyerEnabled', 'prestigeSpeedBonusUnlocked',
      'autoSpeedUp', 'autoSpeedUpEnabled', 'autoGlobalTickspeed', 'autoGlobalTickspeedEnabled'
    )
    const after = overclockGame(state)
    expect(after.autobuyers).toEqual(fresh.autobuyers)
    expect(after.autobuyersEnabled).toEqual(fresh.autobuyersEnabled)
    expect(after.smartAutobuyer).toEqual(fresh.smartAutobuyer)
    expect(after.tierTickspeedAutobuyer).toEqual(fresh.tierTickspeedAutobuyer)
    expect(after.tierTickspeedAutobuyerEnabled).toEqual(fresh.tierTickspeedAutobuyerEnabled)
    expect(after.autoPrestige).toBe(fresh.autoPrestige)
    expect(after.autoPrestigeEnabled).toBe(fresh.autoPrestigeEnabled)
    expect(after.autoPrestigeAutobuyer).toBe(fresh.autoPrestigeAutobuyer)
    expect(after.autoPrestigeAutobuyerEnabled).toBe(fresh.autoPrestigeAutobuyerEnabled)
    expect(after.prestigeSpeedBonusUnlocked).toBe(fresh.prestigeSpeedBonusUnlocked)
    expect(after.autoSpeedUp).toBe(fresh.autoSpeedUp)
    expect(after.autoSpeedUpEnabled).toBe(fresh.autoSpeedUpEnabled)
    expect(after.autoGlobalTickspeed).toBe(fresh.autoGlobalTickspeed)
    expect(after.autoGlobalTickspeedEnabled).toBe(fresh.autoGlobalTickspeedEnabled)
  })

  it('falls back to level 1 for the last tier when purchaseLevels is missing from state entirely, which never meets the (≥10) requirement', () => {
    const state = omit(withMoney(createInitialGameState(), 1), 'purchaseLevels')
    expect(overclockGame(state)).toBe(state)
  })

  it('falls back to 0 when overclockCount is missing from state entirely', () => {
    const state = omit(eligibleState(), 'overclockCount')
    const after = overclockGame(state)
    expect(after.overclockCount).toBe(1)
  })

  it('keeps the Byte Foundry intro state permanently untouched across overclock, unlike prestige', () => {
    const seededIntro = {
      bits: 500, capacity: 8000, byteCreated: true, tickSpeedSeconds: 0.125, productionMultiplier: 4,
      productionMilestoneTier: 3, productionMilestoneTierClaims: 1, productionAccumulator: 2.5,
      mainGameUnlocked: true, bitsTransferredThisCycle: 8000,
    }
    const state = withIntro(eligibleState(), seededIntro)
    const after = overclockGame(state)
    expect(after.intro).toEqual(seededIntro)
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

  it('refuses to spend once production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(
      withPrestigePoints(createInitialGameState(), AUTO_SPEED_UP_COST),
      PRESTIGE_THRESHOLD
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

  it('refuses to spend once production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(
      withPrestigePoints(createInitialGameState(), TICKSPEED_AUTOBUYER_COST),
      PRESTIGE_THRESHOLD
    )
    expect(buyTickspeedAutobuyer(state)).toBe(state)
  })
})

// ─── setAutoSpeedUpEnabled / setAutoGlobalTickspeedEnabled / setAutoPrestigeEnabled ─────────────

describe('setAutoSpeedUpEnabled', () => {
  it('toggles autoSpeedUpEnabled once Auto Speed Up is bought', () => {
    const state = withAutoSpeedUp(createInitialGameState())
    const paused = setAutoSpeedUpEnabled(false)(state)
    expect(paused.autoSpeedUpEnabled).toBe(false)
    const resumed = setAutoSpeedUpEnabled(true)(paused)
    expect(resumed.autoSpeedUpEnabled).toBe(true)
  })

  it('returns the same state when Auto Speed Up has not been bought yet', () => {
    const state = createInitialGameState()
    expect(setAutoSpeedUpEnabled(false)(state)).toBe(state)
  })

  it('is not gated by isProductionFrozen — toggling a preference is always possible', () => {
    const state = withMoney(withAutoSpeedUp(createInitialGameState()), PRESTIGE_THRESHOLD)
    const after = setAutoSpeedUpEnabled(false)(state)
    expect(after.autoSpeedUpEnabled).toBe(false)
  })
})

describe('setAutoGlobalTickspeedEnabled', () => {
  it('toggles autoGlobalTickspeedEnabled once the Tickspeed Autobuyer is bought', () => {
    const state = withAutoGlobalTickspeed(createInitialGameState())
    const paused = setAutoGlobalTickspeedEnabled(false)(state)
    expect(paused.autoGlobalTickspeedEnabled).toBe(false)
    const resumed = setAutoGlobalTickspeedEnabled(true)(paused)
    expect(resumed.autoGlobalTickspeedEnabled).toBe(true)
  })

  it('returns the same state when the Tickspeed Autobuyer has not been bought yet', () => {
    const state = createInitialGameState()
    expect(setAutoGlobalTickspeedEnabled(false)(state)).toBe(state)
  })

  it('is not gated by isProductionFrozen', () => {
    const state = withMoney(withAutoGlobalTickspeed(createInitialGameState()), PRESTIGE_THRESHOLD)
    const after = setAutoGlobalTickspeedEnabled(false)(state)
    expect(after.autoGlobalTickspeedEnabled).toBe(false)
  })
})

describe('setAutoPrestigeEnabled', () => {
  it('toggles autoPrestigeEnabled once Auto-Prestige is bought', () => {
    const state = withAutoPrestige(createInitialGameState(), 1)
    const paused = setAutoPrestigeEnabled(false)(state)
    expect(paused.autoPrestigeEnabled).toBe(false)
    const resumed = setAutoPrestigeEnabled(true)(paused)
    expect(resumed.autoPrestigeEnabled).toBe(true)
  })

  it('returns the same state when Auto-Prestige has not been bought yet (still null)', () => {
    const state = createInitialGameState()
    expect(setAutoPrestigeEnabled(false)(state)).toBe(state)
  })

  it('is not gated by isProductionFrozen', () => {
    const state = withMoney(withAutoPrestige(createInitialGameState(), 1), PRESTIGE_THRESHOLD)
    const after = setAutoPrestigeEnabled(false)(state)
    expect(after.autoPrestigeEnabled).toBe(false)
  })
})

describe('setAutoPrestigeAutobuyerEnabled', () => {
  it('toggles autoPrestigeAutobuyerEnabled once the Auto-Prestige Autobuyer is bought', () => {
    const state = withAutoPrestigeAutobuyer(withAutoPrestige(createInitialGameState(), 1))
    const paused = setAutoPrestigeAutobuyerEnabled(false)(state)
    expect(paused.autoPrestigeAutobuyerEnabled).toBe(false)
    const resumed = setAutoPrestigeAutobuyerEnabled(true)(paused)
    expect(resumed.autoPrestigeAutobuyerEnabled).toBe(true)
  })

  it('returns the same state when the Auto-Prestige Autobuyer has not been bought yet', () => {
    const state = createInitialGameState()
    expect(setAutoPrestigeAutobuyerEnabled(false)(state)).toBe(state)
  })

  it('is not gated by isProductionFrozen', () => {
    const state = withMoney(withAutoPrestigeAutobuyer(withAutoPrestige(createInitialGameState(), 1)), PRESTIGE_THRESHOLD)
    const after = setAutoPrestigeAutobuyerEnabled(false)(state)
    expect(after.autoPrestigeAutobuyerEnabled).toBe(false)
  })
})

describe('setAutobuyerEnabled', () => {
  it('toggles a tier\'s autobuyersEnabled once its autobuyer is unlocked', () => {
    const state = withAutobuyer(createInitialGameState(), thousandsTier.id)
    const paused = setAutobuyerEnabled(thousandsTier.id, false)(state)
    expect(paused.autobuyersEnabled[thousandsTier.id]).toBe(false)
    const resumed = setAutobuyerEnabled(thousandsTier.id, true)(paused)
    expect(resumed.autobuyersEnabled[thousandsTier.id]).toBe(true)
  })

  it('returns the same state when this tier\'s autobuyer has not been unlocked yet', () => {
    const state = createInitialGameState()
    expect(setAutobuyerEnabled(thousandsTier.id, false)(state)).toBe(state)
  })

  it('only affects the targeted tier', () => {
    const state = withAutobuyer(withAutobuyer(createInitialGameState(), tensTier.id), thousandsTier.id)
    const after = setAutobuyerEnabled(thousandsTier.id, false)(state)
    expect(after.autobuyersEnabled[thousandsTier.id]).toBe(false)
    expect(after.autobuyersEnabled[tensTier.id]).toBe(true)
  })

  it('is not gated by isProductionFrozen — toggling a preference is always possible', () => {
    const state = withMoney(withAutobuyer(createInitialGameState(), thousandsTier.id), PRESTIGE_THRESHOLD)
    const after = setAutobuyerEnabled(thousandsTier.id, false)(state)
    expect(after.autobuyersEnabled[thousandsTier.id]).toBe(false)
  })
})

describe('setTierTickspeedAutobuyerEnabled', () => {
  it('toggles a tier\'s tierTickspeedAutobuyerEnabled once its tier tickspeed autobuyer is bought', () => {
    const state = withTierTickspeedAutobuyer(createInitialGameState(), thousandsTier.id)
    const paused = setTierTickspeedAutobuyerEnabled(thousandsTier.id, false)(state)
    expect(paused.tierTickspeedAutobuyerEnabled[thousandsTier.id]).toBe(false)
    const resumed = setTierTickspeedAutobuyerEnabled(thousandsTier.id, true)(paused)
    expect(resumed.tierTickspeedAutobuyerEnabled[thousandsTier.id]).toBe(true)
  })

  it('returns the same state when this tier\'s tier tickspeed autobuyer has not been bought yet', () => {
    const state = createInitialGameState()
    expect(setTierTickspeedAutobuyerEnabled(thousandsTier.id, false)(state)).toBe(state)
  })

  it('only affects the targeted tier', () => {
    const state = withTierTickspeedAutobuyer(withTierTickspeedAutobuyer(createInitialGameState(), tensTier.id), thousandsTier.id)
    const after = setTierTickspeedAutobuyerEnabled(thousandsTier.id, false)(state)
    expect(after.tierTickspeedAutobuyerEnabled[thousandsTier.id]).toBe(false)
    expect(after.tierTickspeedAutobuyerEnabled[tensTier.id]).toBe(true)
  })

  it('is not gated by isProductionFrozen', () => {
    const state = withMoney(withTierTickspeedAutobuyer(createInitialGameState(), thousandsTier.id), PRESTIGE_THRESHOLD)
    const after = setTierTickspeedAutobuyerEnabled(thousandsTier.id, false)(state)
    expect(after.tierTickspeedAutobuyerEnabled[thousandsTier.id]).toBe(false)
  })
})

// ─── isLastTierTickspeedXpUnlocked ──────────────────────────────────────────

describe('isLastTierTickspeedXpUnlocked', () => {
  it('is false on a fresh state', () => {
    expect(isLastTierTickspeedXpUnlocked(createInitialGameState())).toBe(false)
  })

  it('is false while the last tier\'s owned count is below PURCHASE_BLOCK_SIZE (8), regardless of its purchased count', () => {
    const state = withOwned(
      withPurchased(createInitialGameState(), lastTier.id, 50),
      lastTier.id,
      7
    )
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(false)
  })

  it('is true once the last tier\'s owned count reaches PURCHASE_BLOCK_SIZE (8)', () => {
    const state = withOwned(createInitialGameState(), lastTier.id, 8)
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(true)
  })

  it('is true above 8 owned too', () => {
    const state = withOwned(createInitialGameState(), lastTier.id, 250)
    expect(isLastTierTickspeedXpUnlocked(state)).toBe(true)
  })

  it('reverts to false once owned drops back below 8 after having been unlocked', () => {
    const unlocked = withOwned(createInitialGameState(), lastTier.id, 8)
    expect(isLastTierTickspeedXpUnlocked(unlocked)).toBe(true)
    const droppedBack = withOwned(unlocked, lastTier.id, 3)
    expect(isLastTierTickspeedXpUnlocked(droppedBack)).toBe(false)
  })

  it('is false when owned is missing from state entirely', () => {
    expect(isLastTierTickspeedXpUnlocked({})).toBe(false)
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

  it('refuses to spend once production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(
      withXP(withLastTierTickspeedXpUnlocked(createInitialGameState()), 100),
      PRESTIGE_THRESHOLD
    )
    expect(consumeXpForLastTierTickspeed(10)(state)).toBe(state)
  })

  it('falls back to 0 already-consumed XP when lastTierXpConsumed is missing from state entirely', () => {
    const state = omit(
      withXP(withLastTierTickspeedXpUnlocked(createInitialGameState()), 50),
      'lastTierXpConsumed'
    )
    const after = consumeXpForLastTierTickspeed(20)(state)
    expect(after.lastTierXpConsumed).toBe(20)
  })
})
