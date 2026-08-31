import { describe, expect, it } from 'vitest'
import {
  activateComputeBoost,
  isAnyComputeMergeInFlight,
  tickAutoComputeBoost,
  setComputeAutoBoostType,
  buyComputeAutoBoost,
  canBuyComputeFlopsTier,
  canForfeitComputeBoost,
  forfeitComputeBoost,
  upgradeComputeMergeDuration,
  isUpgradeComputeMergeDurationAvailable,
  getNextComputeMergeDurationUpgradeIndex,
  getComputeMergeDurationSeconds,
  getCoreEarnTimeSeconds,
  getBiggestComputeTierWaitingOnMerge,
  applyAutobuyerMilestones,
  applyOfflineProgress,
  buyAutoPrestige,
  buyAutoPrestigeAutobuyer,
  buyAutoSpeedUp,
  buyGlobalTickspeedMultiplier,
  buyComputeFlopsTier,
  buyHyperscaler,
  buyPrestigeDoublePp,
  buyPrestigeSpeedBonus,
  buySmartAutobuyer,
  buyTickspeedAutobuyer,
  buyTickspeedMultiplier,
  buyTier,
  buyTierQuantity,
  canActivateComputeBoost,
  canReclaimComputeBoost,
  canStackComputeBoost,
  combineIntroByte,
  normalizePoolMemoryCapacity,
  consumeXpForLastTierTickspeed,
  convertIntroBitsToKilobytes,
  createInitialGameState,
  eraGame,
  enableAutoMergeClustersIntoNetwork,
  enableAutoMergeCloudsIntoDatacenter,
  enableAutoMergeCoresIntoNode,
  enableAutoMergeDatacentersIntoSupercomputer,
  enableAutoMergeFabricsIntoCloud,
  enableAutoMergeGridsIntoFabric,
  enableAutoMergeNetworksIntoGrid,
  enableAutoMergeNodesIntoCluster,
  enableAutoMergeSupercomputersIntoMegacomputer,
  getIntroProductionRate,
  isEraEligible,
  isIntroConversionUnlocked,
  isStorageUnlocked,
  pickIntroCapacityMilestone,
  pickIntroProductionMilestone,
  tickIntroProduction,
  queueIntroCapacityUpgrade,
  clearIntroCapacityUpgradeQueue,
  isBitFundedBandwidthAvailable,
  isComputeFundedBandwidthAvailable,
  rollbackComputeFundedBandwidth,
  eraseAllComputeTokens,
  tickQueuedCapacityUpgrade,
  setAutobuyerEnabled,
  setAutoGlobalTickspeedEnabled,
  setAutoPrestigeAutobuyerEnabled,
  setAutoPrestigeEnabled,
  setAutoSpeedUpEnabled,
  setComputeFlopsAutobuyerEnabled,
  setTierTickspeedAutobuyerEnabled,
  formatAmount,
  formatBitsInNearestUnit,
  formatBytes,
  formatCurrency,
  formatDiskSize,
  formatMemoryAmount,
  formatMoneyBalance,
  formatOfflineDuration,
  getAutobuyerUnlockCost,
  getAutobuyerUnlockMilestone,
  getAutoPrestigeAttemptRate,
  getAutoPrestigeCost,
  getComputeBandwidthSacrificeField,
  getComputeBandwidthSacrificeLabel,
  getComputeBoostMultiplier,
  getComputeBoostTierDurationSeconds,
  getComputeBoostTierMultiplier,
  getCostEpochExponent,
  getDiskCost,
  getDiskLadderSizeBits,
  getNextDiskLadderSize,
  getDiskRedeemTierName,
  getDiskSize,
  getPoolIndexForDiskSize,
  getStoragePoolCount,
  getStoragePoolBandwidth,
  getStoragePoolCapacity,
  getUnlockedStoragePoolCount,
  isStoragePoolUnlocked,
  getDiskSizesToShow,
  getRelevantDiskSizesForFoundry,
  getEffectiveTierTickSpeedSeconds,
  getEonsAwarded,
  getFlopsAutobuyerUnlockEra,
  getHyperscalerFlopsBoostRate,
  getGlobalTickspeedMultiplierCost,
  getGlobalTickspeedProductionMultiplier,
  getIntroKilobyteConversionCost,
  getIntroProductionMilestoneCost,
  getIntroProductionMilestoneMaxClaims,
  getLastTierXpTickspeedMinConsumption,
  getLastTierXpTickspeedMultiplier,
  getMemoryUnit,
  getMoneyExponent,
  getOfflineEffectiveSeconds,
  getOverclockMultiplier,
  getOverclockRequirement,
  getPrestigeDoublePpUpgradeCost,
  getPrestigePointsAwarded,
  getPrestigePowersPerPp,
  getPrestigePpPerPower,
  getPrestigeProductionMultiplier,
  getPrestigeProgressPercent,
  getNextBytePowerProgressFraction,
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
  isAutoMergeClustersIntoNetworkUnlockAvailable,
  isAutoMergeCloudsIntoDatacenterUnlockAvailable,
  isAutoMergeCoresIntoNodeUnlockAvailable,
  isAutoMergeDatacentersIntoSupercomputerUnlockAvailable,
  isAutoMergeFabricsIntoCloudUnlockAvailable,
  isAutoMergeGridsIntoFabricUnlockAvailable,
  isAutoMergeNetworksIntoGridUnlockAvailable,
  isAutoMergeNodesIntoClusterUnlockAvailable,
  isAutoMergeSupercomputersIntoMegacomputerUnlockAvailable,
  isBandwidthAvailable,
  isBandwidthTurnAvailable,
  isComputeBoostTurnAvailable,
  isComputeCloudsMergeStartAvailable,
  isComputeClustersMergeStartAvailable,
  isComputeCoreConversionUnlocked,
  isComputeCoresMergeStartAvailable,
  isComputeDatacentersMergeStartAvailable,
  isComputeFabricsMergeStartAvailable,
  isComputeGridsMergeStartAvailable,
  isComputeNetworksMergeStartAvailable,
  isComputeNodesMergeStartAvailable,
  isComputeSupercomputersMergeStartAvailable,
  isComputeUpgradeAvailable,
  isComputeUpgradeTurnAvailable,
  isProvisionDiskAvailable,
  isDiskLadderExhaustedForActivePools,
  isProvisionDiskTurnAvailable,
  isDiskCacheBlockReleasable,
  isDiskCacheBlockAutoReleaseEligible,
  isDiskCacheBlockManualReleaseAvailable,
  isDiskAutoRedeemEligible,
  isDiskManualRedeemAvailable,
  isDiskFillAvailable,
  isDiskRedeemable,
  isGlobalTickspeedMultiplierUnlocked,
  isLastTierTickspeedXpUnlocked,
  isMemoryCapacityAtCap,
  isMemoryCapacityUpgradeAvailable,
  isProductionFrozen,
  isUnboundedPrestigeUnlocked,
  isTierUnlocked,
  mergeComputeClustersIntoNetwork,
  mergeComputeCloudsIntoDatacenter,
  mergeComputeCoresIntoNode,
  mergeComputeDatacentersIntoSupercomputer,
  mergeComputeFabricsIntoCloud,
  mergeComputeGridsIntoFabric,
  mergeComputeNetworksIntoGrid,
  mergeComputeNodesIntoCluster,
  mergeComputeSupercomputersIntoMegacomputer,
  overclockGame,
  pinMuseumEntry,
  reclaimComputeBoost,
  prestigeGame,
  redeemDisk,
  releaseDiskCacheBlock,
  resetByteFoundry,
  speedUpGame,
  stackComputeBoost,
  startComputeCloudsMerge,
  startComputeClustersMerge,
  startComputeCoresMerge,
  startComputeDatacentersMerge,
  startComputeFabricsMerge,
  startComputeGridsMerge,
  startComputeNetworksMerge,
  startComputeNodesMerge,
  startComputeSupercomputersMerge,
  provisionDisk,
  tapIntroBit,
  tickFoundryResetConvenience,
  tickAutoMergeClustersIntoNetwork,
  unpinMuseumEntry,
  tickAutoMergeCloudsIntoDatacenter,
  tickAutoMergeCoresIntoNode,
  tickAutoMergeDatacentersIntoSupercomputer,
  tickAutoMergeFabricsIntoCloud,
  tickAutoMergeGridsIntoFabric,
  tickAutoMergeNetworksIntoGrid,
  tickAutoMergeNodesIntoCluster,
  tickAutoMergeSupercomputersIntoMegacomputer,
  tickComputeBoost,
  tickDiskAutoDeposit,
  tickDiskAutoFill,
  tickDiskAutoRedeem,
  tickDiskAutoReleaseCache,
  tickProvisionDisk,
  tickDiskWriteCache,
  getDiskReadCacheFlush,
  getDiskReadCacheFlushSeconds,
  canDepositDiskToDataLake,
  depositDiskToDataLake,
  doubleDataLakeCapacity,
  getDataLakeCapacity,
  getDataLakeCapacityDoublingCost,
  getDataLakeCapacityLevel,
  isDataLakeCapacityDoublingAvailable,
  isDataLakeCapacityDoublingTurnAvailable,
  isDataLakeCapacityMaxed,
  startBoosterTransfer,
  canStartBoosterTransfer,
  getDataLakeTierIndex,
  getDataLakeSubSize,
  getDataLakeTransferCapacity,
  getDataLakeAvailableUnits,
  getDataLakeDepositedUnits,
  getDataLakeTier,
  isIdleDiskLiquidationAvailable,
  isIdleDiskLiquidationTurnAvailable,
  tickIdleDiskLiquidation,
  getPoolBufferCapacity,
  getPoolBufferBits,
  tickPoolBufferFill,
  getBoosterPurchaseCost,
  tickDataLakeTransfers,
  getDiskLadderStep,
  getDiskWriteCacheMerge,
  isDiskReadCacheFlushPaused,
  isDiskWriteCacheCollectPaused,
  tickGame,
  tickIntroAutoInvest,
} from './engine'
import { AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_SPEED_UP_COST, BITS_PER_BYTE, BYTES_ID, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_CORES_PER_NODE, COMPUTE_ENTITY_CAP, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_FLOPS_TIER_DEFINITIONS, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, COMPUTE_MERGE_DURATION_UPGRADE_COUNT, COMPUTE_MERGE_RATIO, COMPUTE_MERGE_RESERVE_CAP, COMPUTE_MERGE_STEP_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, DATA_LAKE_CAPACITY_MAX_LEVEL, DATA_LAKE_TIER_COUNT, DATA_LAKE_TRANSFER_BANDWIDTH_MULTIPLIER, DATA_LAKE_TRANSFER_CAPACITY_MAX, DEFAULT_PURCHASE_BLOCK_SIZE, DISK_ARRAY_LADDER_CAP, DISK_BUILD_COST_MULTIPLIER, DISK_CACHE_BLOCK_COUNT, DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER, DISK_LADDER_BASE_SIZE_BITS, DISK_LADDER_SIZE_MULTIPLIER, ERA_ELIGIBILITY_PP, getTierBaseTickSpeedSeconds, GOOGOL, INTRO_BANDWIDTH_COST_MULTIPLIER, INTRO_BITS_PER_KILOBYTE_CONVERSION, INTRO_BYTE_COMBINE_COST, INTRO_CAPACITY_CAP_BITS, INTRO_CAPACITY_DOUBLING_STEP, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, INTRO_DISK_UNLOCK_CAPACITY, INTRO_MIN_TICK_SPEED_SECONDS, INTRO_PRODUCTION_MULTIPLIER_STEP, INTRO_STARTING_CAPACITY, INTRO_STARTING_TICK_SPEED_SECONDS, LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR, MEMORY_BINARY_UNIT_STEP, MAX_OFFLINE_SECONDS, MONEY_ID, MUSEUM_PIN_CAP, OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS, PRESTIGE_SPEED_BONUS_UNLOCK_COST, PRESTIGE_THRESHOLD, PRESTIGE_UNBOUNDED_MIN_COUNT, TICK_RATE_MS, TICKSPEED_AUTOBUYER_COST, TIER_DEFINITIONS } from './layers'

// ─── helpers ────────────────────────────────────────────────────────────────

const withMoney = (state, amount) => ({
  ...state,
  resources: { ...state.resources, [MONEY_ID]: amount },
})

const withBytes = (state, amount) => ({
  ...state,
  resources: { ...state.resources, [BYTES_ID]: amount },
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

// Seeds a size's own POOL buffer directly (see intro.poolBuffers) — the currency Provision
// Disk/the cache fill-from-Memory pass now spend from exclusively, since tickPoolBufferFill's own
// bandwidth-throttled top-up from intro.bits isn't in play for tests isolating a different
// mechanic. Defaults to pool 1 (FIRST_DISK_SIZE's own pool) when no poolIndex is passed.
const withPoolBuffer = (state, bits, poolIndex = 1) =>
  withIntro(state, { poolBuffers: { ...state.intro.poolBuffers, [poolIndex]: bits } })

// Drops the given top-level keys from state entirely (rather than setting them to null/undefined)
// — used to simulate a state object that predates a field's introduction, exercising this file's
// many `?.`/`??` defensive fallbacks (see engine.js) that a value merely being falsy/0 doesn't.
const omit = (state, ...keys) => {
  const copy = { ...state }
  keys.forEach(key => delete copy[key])
  return copy
}

// TIER_DEFINITIONS[0] ('Kilobytes') costs Bits but produces Bytes — the Factory's byte-scale
// output currency. TIER_DEFINITIONS[1] ('Megabytes') is the first tier that needs unlocking (a full
// purchase block of Kilobytes owned) and produces Kilobytes.
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
  it('consumes INTRO_BYTE_COMBINE_COST bits and leaves Capacity on its doubling ladder', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_BYTE_COMBINE_COST })
    const after = combineIntroByte(state)
    expect(after.intro.byteCreated).toBe(true)
    expect(after.intro.bits).toBe(0)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY)
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

// Pool Memory Capacity doubles from each pool's start bound up to its end bound.
const noOtherUpgradesLeft = { byteCreated: true, productionMilestoneTierClaims: 2 }

// getDiskSize's own real-Byte-accurate ladder — a fresh cycle's smallest disk is 8000 bits (1 KB),
// matching tier01's own level-1 per-unit cost (1000 Bits) expressed in bits via BITS_PER_BYTE.
const FIRST_DISK_SIZE = getTierCost(TIER_DEFINITIONS[0], 1) * BITS_PER_BYTE

describe('isMemoryCapacityUpgradeAvailable', () => {
  it('is available when the selected pool is full and no higher-priority action is available', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY, capacity: INTRO_STARTING_CAPACITY, ...noOtherUpgradesLeft,
    })
    expect(isMemoryCapacityUpgradeAvailable(state)).toBe(true)
  })

  it('stays false at the pool end bound with a full balance', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_CAPACITY_CAP_BITS, capacity: INTRO_CAPACITY_CAP_BITS, ...noOtherUpgradesLeft,
    })
    expect(isMemoryCapacityAtCap(state)).toBe(true)
    expect(isMemoryCapacityUpgradeAvailable(state)).toBe(false)
  })
})

describe('isMemoryCapacityAtCap / normalizePoolMemoryCapacity', () => {
  it('is false below the pool end bound and true at/above it', () => {
    expect(isMemoryCapacityAtCap(withIntro(createInitialGameState(), { capacity: INTRO_STARTING_CAPACITY }))).toBe(false)
    expect(isMemoryCapacityAtCap(withIntro(createInitialGameState(), { capacity: INTRO_CAPACITY_CAP_BITS }))).toBe(true)
  })

  it('normalizePoolMemoryCapacity does not raise capacity to the end bound', () => {
    const state = withIntro(createInitialGameState(), {
      byteCreated: true, capacity: INTRO_STARTING_CAPACITY, capacityUpgradeQueued: true,
    })
    const after = normalizePoolMemoryCapacity(state)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY)
    expect(after.intro.capacityUpgradeQueued).toBe(false)
  })

  it('normalizePoolMemoryCapacity is a no-op before Combine', () => {
    const state = withIntro(createInitialGameState(), { byteCreated: false, capacity: INTRO_STARTING_CAPACITY })
    expect(normalizePoolMemoryCapacity(state)).toBe(state)
  })
})

describe('pickIntroCapacityMilestone', () => {
  it('doubles Capacity and drains the full balance', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY, capacity: INTRO_STARTING_CAPACITY, ...noOtherUpgradesLeft,
    })
    const after = pickIntroCapacityMilestone(state)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY * INTRO_CAPACITY_DOUBLING_STEP)
    expect(after.intro.bits).toBe(0)
  })

  it('is a no-op at the pool end bound', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_CAPACITY_CAP_BITS, capacity: INTRO_CAPACITY_CAP_BITS, ...noOtherUpgradesLeft,
    })
    const after = pickIntroCapacityMilestone(state)
    expect(after).toBe(state)
    expect(after.intro.bits).toBe(INTRO_CAPACITY_CAP_BITS)
    expect(after.intro.capacity).toBe(INTRO_CAPACITY_CAP_BITS)
  })
})

describe('storage pools', () => {
  it('unlocks pool 2 only after all three pool 1 arrays reach the build cap', () => {
    const partial = withIntro(createInitialGameState(), {
      disksBuiltTotal: {
        [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 10]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 100]: DISK_ARRAY_LADDER_CAP - 1,
      },
    })
    expect(isStoragePoolUnlocked(partial, 2)).toBe(false)
    const complete = withIntro(partial, {
      disksBuiltTotal: {
        ...partial.intro.disksBuiltTotal,
        [FIRST_DISK_SIZE * 100]: DISK_ARRAY_LADDER_CAP,
      },
    })
    expect(isStoragePoolUnlocked(complete, 2)).toBe(true)
    expect(getUnlockedStoragePoolCount(complete)).toBe(2)
  })

  it('keeps lower-pool bandwidth and capacity fixed without dividing by higher unlocked pools', () => {
    const state = withIntro(createInitialGameState(), {
      byteCreated: true,
      bits: 0,
      capacity: 1024 * 1024 * 8,
      disksBuiltTotal: Object.fromEntries(
        [...Array(3)].map((_, index) => [getDiskLadderSizeBits(index + 1), DISK_ARRAY_LADDER_CAP]),
      ),
    })
    expect(getStoragePoolBandwidth(state, 2)).toBe(getIntroProductionRate(state.intro))
    expect(getStoragePoolBandwidth(state, 1)).toBe(getIntroProductionRate(state.intro))
    expect(getStoragePoolCapacity(state, 2)).toBe(state.intro.capacity)
    expect(getStoragePoolCapacity(state, 1)).toBe(INTRO_CAPACITY_CAP_BITS)
  })

  it('caps a pool\'s own Bandwidth at the square root of its own Capacity once the production rate outgrows it', () => {
    const state = withIntro(createInitialGameState(), {
      byteCreated: true,
      capacity: 4_000_000, // sqrt(4,000,000) = 2,000 — a clean cap value
      productionMultiplier: 999_999, // far above the cap
    })
    expect(getIntroProductionRate(state.intro)).toBeGreaterThan(2_000)
    expect(getStoragePoolBandwidth(state, 1)).toBe(2_000)
  })

  it('leaves Bandwidth at the raw production rate while it stays under sqrt(Capacity)', () => {
    const state = withIntro(createInitialGameState(), {
      byteCreated: true,
      capacity: 4_000_000, // sqrt = 2,000
      productionMultiplier: 500, // under the cap
    })
    expect(getStoragePoolBandwidth(state, 1)).toBe(getIntroProductionRate(state.intro))
    expect(getStoragePoolBandwidth(state, 1)).toBe(500)
  })

  it('moves the Data Stream Capacity ceiling forward when pool 2 unlocks', () => {
    const pool1Complete = withIntro(createInitialGameState(), {
      capacity: INTRO_CAPACITY_CAP_BITS,
      disksBuiltTotal: {
        [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 10]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 100]: DISK_ARRAY_LADDER_CAP,
      },
    })
    expect(isMemoryCapacityAtCap(withIntro(pool1Complete, { disksBuiltTotal: {} }))).toBe(true)
    expect(getUnlockedStoragePoolCount(pool1Complete)).toBe(2)
    expect(isMemoryCapacityAtCap(pool1Complete)).toBe(false)
  })
})

describe('pool buffers', () => {
  it('getPoolBufferCapacity matches the pool\'s own Capacity exactly', () => {
    // The fraction is 1 — the buffer's own ceiling matches the pool's Capacity exactly (see
    // getPoolBufferCapacity's own doc comment for why any meaningfully smaller fraction leaves a
    // pool's own largest disk permanently unaffordable).
    const state = withIntro(createInitialGameState(), { capacity: 4_000_000 })
    expect(getPoolBufferCapacity(state, 1)).toBe(getStoragePoolCapacity(state, 1))
    expect(getPoolBufferCapacity(state, 1)).toBe(4_000_000)
  })

  it('getPoolBufferBits defaults to 0 for an untouched pool', () => {
    expect(getPoolBufferBits(createInitialGameState(), 1)).toBe(0)
  })

  it('tickPoolBufferFill is a same-reference no-op below INTRO_DISK_UNLOCK_CAPACITY, even with production flowing', () => {
    const state = withIntro(createInitialGameState(), { byteCreated: true, capacity: INTRO_DISK_UNLOCK_CAPACITY - 1 })
    expect(tickPoolBufferFill(1)(state)).toBe(state)
  })

  it('tickPoolBufferFill transfers bits out of intro.bits into the pool\'s own buffer, capped at its own Bandwidth × elapsedSeconds', () => {
    const state = withIntro(createInitialGameState(), {
      byteCreated: true,
      bits: 1000,
      capacity: 4_000_000, // sqrt = 2,000 bits/sec pool 1 Bandwidth cap
      productionMultiplier: 999_999, // far above the cap, so the cap (not the rate) binds
    })
    const after = tickPoolBufferFill(1)(state)
    expect(after.intro.poolBuffers[1]).toBe(1000)
    expect(after.intro.bits).toBe(0)
  })

  it('tickPoolBufferFill stops at the pool\'s own buffer room, leaving the remainder in intro.bits', () => {
    const state = withIntro(createInitialGameState(), {
      byteCreated: true,
      bits: 1_000_000,
      capacity: 500_000, // buffer capacity = 500,000 — deliberately below the seeded bits balance
      productionMultiplier: 999_999,
    })
    const after = tickPoolBufferFill(1e6)(state) // ample elapsed time — room, not rate, binds
    const bufferCapacity = getPoolBufferCapacity(state, 1)
    expect(bufferCapacity).toBe(500_000)
    expect(after.intro.poolBuffers[1]).toBe(bufferCapacity)
    expect(after.intro.bits).toBe(1_000_000 - bufferCapacity)
  })

  it('tickPoolBufferFill allocates "leftover speed" across unlocked pools ascending — an earlier pool\'s own Bandwidth cap always claims first', () => {
    const kb100 = FIRST_DISK_SIZE * 100
    const state = withIntro(createInitialGameState(), {
      byteCreated: true,
      bits: 1_000_000,
      capacity: 4_000_000, // pool 1 Bandwidth cap = sqrt(4,000,000) = 2,000 bits/sec
      productionMultiplier: 999_999, // total "Data Stream rate" far exceeds any single pool's cap
      disksBuiltTotal: {
        [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 10]: DISK_ARRAY_LADDER_CAP,
        [kb100]: DISK_ARRAY_LADDER_CAP,
      }, // unlocks pool 2
    })
    const after = tickPoolBufferFill(1)(state)
    // Pool 1 reserves exactly its own 2,000 bits/sec cap off the top of the shared rate; pool 2
    // gets whatever's left of the (effectively unlimited, here) remaining rate, still bounded by
    // its own Bandwidth cap and buffer room.
    expect(after.intro.poolBuffers[1]).toBe(2000)
    expect(after.intro.poolBuffers[2]).toBeGreaterThan(0)
    expect(after.intro.bits).toBe(1_000_000 - after.intro.poolBuffers[1] - after.intro.poolBuffers[2])
  })

  it('tickPoolBufferFill is a same-reference no-op with nothing to transfer (empty Buffer)', () => {
    const state = withIntro(createInitialGameState(), { byteCreated: true, bits: 0, capacity: 4_000_000 })
    expect(tickPoolBufferFill(1)(state)).toBe(state)
  })

  it('provisionDisk/isProvisionDiskAvailable read from the pool buffer that tickPoolBufferFill actually fills — the two stay consistent end to end', () => {
    let state = withIntro(createInitialGameState(), {
      byteCreated: true,
      bits: getDiskCost(FIRST_DISK_SIZE),
      capacity: 4_000_000,
      productionMultiplier: 999_999,
      productionMilestoneTierClaims: 2,
    })
    expect(isProvisionDiskAvailable(state)).toBe(false) // nothing in the pool buffer yet
    state = tickPoolBufferFill(1000)(state) // ample elapsed time to fully fund it at the pool's own capped rate
    expect(isProvisionDiskAvailable(state)).toBe(true)
    const after = provisionDisk(state)
    expect(after.intro.diskBuild).not.toBeNull()
  })
})

describe('queueIntroCapacityUpgrade / tickQueuedCapacityUpgrade', () => {
  it('queues a Capacity upgrade before the Buffer is full', () => {
    const state = withIntro(createInitialGameState(), { bits: 1, capacity: INTRO_STARTING_CAPACITY, byteCreated: true })
    const queued = queueIntroCapacityUpgrade(state)
    expect(queued).not.toBe(state)
    expect(queued.intro.capacityUpgradeQueued).toBe(true)
  })

  it('clearIntroCapacityUpgradeQueue clears a legacy queued flag', () => {
    const queued = withIntro(createInitialGameState(), { capacityUpgradeQueued: true })
    const cleared = clearIntroCapacityUpgradeQueue(queued)
    expect(cleared.intro.capacityUpgradeQueued).toBe(false)
    expect(clearIntroCapacityUpgradeQueue(cleared)).toBe(cleared)
  })

  it('tickQueuedCapacityUpgrade clears the legacy flag and doubles a full Capacity', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY,
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: true,
      capacityUpgradeQueued: true,
      productionMilestoneTierClaims: 2,
    })
    const after = tickQueuedCapacityUpgrade(state)
    expect(after.intro.capacityUpgradeQueued).toBe(false)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY * INTRO_CAPACITY_DOUBLING_STEP)
    expect(after.intro.bits).toBe(0)
  })

  it('refuses to queue once pool 1 is already at its capacity end bound', () => {
    const state = withIntro(createInitialGameState(), { capacity: INTRO_CAPACITY_CAP_BITS, byteCreated: true })
    expect(queueIntroCapacityUpgrade(state)).toBe(state)
  })
})

describe('eraseAllComputeTokens', () => {
  it('wipes ladder balances and an active Boost, leaving unlock flags alone', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 4,
      computeNodes: 2,
      autoMergeCoresIntoNode: true,
      computeCoresEverEarned: 20,
      computeBoostType: 'burst',
      computeBoostTierIndex: 1,
      computeBoostStacks: 2,
      computeBoostRemainingSeconds: 30,
      computeCoresMergeRemainingSeconds: 15,
    })
    const after = eraseAllComputeTokens(state)
    expect(after.intro.computeCores).toBe(0)
    expect(after.intro.computeNodes).toBe(0)
    expect(after.intro.computeBoostType).toBe(null)
    expect(after.intro.computeBoostStacks).toBe(0)
    expect(after.intro.computeCoresMergeRemainingSeconds).toBe(0)
    expect(after.intro.autoMergeCoresIntoNode).toBe(true)
    expect(after.intro.computeCoresEverEarned).toBe(20)
  })
})

describe('resetByteFoundry', () => {
  it('wipes Capacity/upgrades/Disks/Compute to scratch and records convenience caps', () => {
    const initial = createInitialGameState()
    const diskSize = INTRO_STARTING_CAPACITY * 8000
    const state = {
      ...initial,
      resources: { ...initial.resources, base: 50_000, tier01: 3 },
      owned: { ...initial.owned, tier01: 12, tier02: 2 },
      prestige: { ...initial.prestige, points: 42, count: 3, xp: 10 },
      autobuyers: { ...initial.autobuyers, tier01: true },
      intro: {
        ...initial.intro,
        bits: 500,
        capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
        byteCreated: true,
        tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS,
        productionMultiplier: 8,
        productionMilestoneTier: 4,
        productionMilestoneTierClaims: 1,
        mainGameUnlocked: true,
        capacityUpgradeQueued: true,
        disks: { [diskSize]: 2 },
        disksBuiltTotal: { [diskSize]: 5 },
        diskCache: { [diskSize]: 100 },
        computeCores: 7,
        computeCoresEverEarned: 20,
        computeMergePageUnlocked: true,
      },
    }

    const after = resetByteFoundry(state)
    const freshIntro = createInitialGameState().intro

    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY)
    expect(after.intro.bits).toBe(0)
    expect(after.intro.byteCreated).toBe(false)
    expect(after.intro.tickSpeedSeconds).toBe(freshIntro.tickSpeedSeconds)
    expect(after.intro.productionMultiplier).toBe(freshIntro.productionMultiplier)
    expect(after.intro.productionMilestoneTier).toBe(0)
    expect(after.intro.productionMilestoneTierClaims).toBe(0)
    expect(after.intro.disks).toEqual({})
    expect(after.intro.disksBuiltTotal).toEqual({})
    expect(after.intro.computeCores).toBe(0)
    expect(after.intro.mainGameUnlocked).toBe(true)
    expect(after.intro.foundryResetCaps).toEqual({
      byteCreated: true,
      productionMilestoneTier: 4,
      productionMilestoneTierClaims: 1,
      disksBuiltTotal: { [String(diskSize)]: 5 },
      capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
    })
    expect(after.resources).toEqual(state.resources)
    expect(after.owned).toEqual(state.owned)
    expect(after.prestige).toEqual(state.prestige)
  })

  it('merges caps across repeated Foundry resets', () => {
    const initial = createInitialGameState()
    const first = resetByteFoundry({
      ...initial,
      intro: {
        ...initial.intro,
        byteCreated: true,
        productionMilestoneTier: 2,
        productionMilestoneTierClaims: 1,
        disksBuiltTotal: { 8000: 3 },
        mainGameUnlocked: true,
      },
    })
    const second = resetByteFoundry({
      ...first,
      intro: {
        ...first.intro,
        byteCreated: true,
        productionMilestoneTier: 5,
        productionMilestoneTierClaims: 0,
        capacity: INTRO_DISK_UNLOCK_CAPACITY,
        disksBuiltTotal: { 8000: 1, 80000: 2 },
      },
    })
    expect(second.intro.foundryResetCaps.byteCreated).toBe(true)
    expect(second.intro.foundryResetCaps.productionMilestoneTier).toBe(5)
    expect(second.intro.foundryResetCaps.productionMilestoneTierClaims).toBe(0)
    expect(second.intro.foundryResetCaps.disksBuiltTotal['8000']).toBe(3)
    expect(second.intro.foundryResetCaps.disksBuiltTotal['80000']).toBe(2)
    expect(second.intro.foundryResetCaps.capacity).toBe(INTRO_DISK_UNLOCK_CAPACITY)
  })

  it('keeps the Foundry gate closed when mainGameUnlocked was still false', () => {
    const state = withIntro(createInitialGameState(), {
      bits: 8,
      byteCreated: true,
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      mainGameUnlocked: false,
      disks: { 8000: 1 },
      computeCores: 2,
    })
    const after = resetByteFoundry(state)
    expect(after.intro.mainGameUnlocked).toBe(false)
    expect(after.intro.byteCreated).toBe(false)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY)
    expect(after.intro.foundryResetCaps.byteCreated).toBe(true)
  })
})

describe('tickFoundryResetConvenience', () => {
  it('auto-combines and auto-Invests up to caps without touching Capacity beyond its own cap', () => {
    const caps = {
      byteCreated: true,
      productionMilestoneTier: 1,
      productionMilestoneTierClaims: 0,
      disksBuiltTotal: {},
    }
    // Enough Memory for Combine (8) + first Invest claim (INTRO_STARTING_CAPACITY).
    let state = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY + INTRO_BYTE_COMBINE_COST,
      capacity: INTRO_STARTING_CAPACITY * 100,
      foundryResetCaps: caps,
      mainGameUnlocked: true,
    })

    state = tickFoundryResetConvenience(state)
    expect(state.intro.byteCreated).toBe(true)
    // At least one Invest claim should have fired (tier advanced or claims bumped).
    expect(
      state.intro.productionMilestoneTier > 0
      || state.intro.productionMilestoneTierClaims > 0
      || state.intro.productionMultiplier > 1
      || state.intro.tickSpeedSeconds < INTRO_STARTING_TICK_SPEED_SECONDS,
    ).toBe(true)
    // Combine leaves Capacity on its current doubling ladder value.
    expect(state.intro.capacity).toBe(INTRO_STARTING_CAPACITY * 100)

    // Keep auto-Investing while Memory can cover the bit-funded path.
    for (let i = 0; i < 20; i += 1) {
      state = {
        ...state,
        intro: {
          ...state.intro,
          bits: Math.max(state.intro.bits, getIntroProductionMilestoneCost(state.intro.productionMilestoneTier) + 1),
        },
      }
      state = tickFoundryResetConvenience(state)
    }
    expect(state.intro.productionMilestoneTier).toBe(1)
    expect(state.intro.productionMilestoneTierClaims).toBe(0)
    expect(state.intro.capacity).toBe(INTRO_STARTING_CAPACITY * 100)
  })

  it('auto-starts Provision Disk when under the per-size cap', () => {
    const size = getDiskLadderSizeBits(1)
    const state = withIntro(createInitialGameState(), {
      // provisionDisk (called directly by this reducer's own auto-replay) now spends from that
      // size's own POOL buffer, not the shared Data Stream Buffer — tickFoundryResetConvenience
      // doesn't itself run tickPoolBufferFill, so this seeds the buffer directly.
      poolBuffers: { 1: getDiskCost(size) + 10 },
      capacity: getDiskCost(size) * 10,
      byteCreated: true,
      productionMilestoneTier: 99,
      productionMilestoneTierClaims: 0,
      foundryResetCaps: {
        byteCreated: true,
        productionMilestoneTier: 0,
        productionMilestoneTierClaims: 0,
        disksBuiltTotal: { [String(size)]: 2 },
      },
    })
    const after = tickFoundryResetConvenience(state)
    expect(after.intro.diskBuild).not.toBeNull()
    expect(after.intro.diskBuild.size).toBe(size)
  })

  it('is a no-op without foundryResetCaps', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_BYTE_COMBINE_COST,
      capacity: INTRO_STARTING_CAPACITY * 10,
    })
    expect(tickFoundryResetConvenience(state)).toBe(state)
  })

  it('never auto-upgrades Capacity when the cap has no headroom above the current capacity', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY,
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: true,
      productionMilestoneTier: 99,
      productionMilestoneTierClaims: 0,
      foundryResetCaps: {
        byteCreated: true,
        productionMilestoneTier: 0,
        productionMilestoneTierClaims: 0,
        disksBuiltTotal: {},
      },
    })
    const after = tickFoundryResetConvenience(state)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY)
    expect(after.intro.capacityUpgradeQueued).toBe(false)
  })

  it('does not auto-upgrade Capacity during convenience', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY,
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: true,
      productionMilestoneTier: 99,
      productionMilestoneTierClaims: 0,
      foundryResetCaps: {
        byteCreated: true,
        productionMilestoneTier: 0,
        productionMilestoneTierClaims: 0,
        disksBuiltTotal: {},
        capacity: INTRO_CAPACITY_CAP_BITS,
      },
    })
    const after = tickFoundryResetConvenience(state)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY)
    expect(after.intro.bits).toBe(INTRO_STARTING_CAPACITY)
  })

  it('auto-Combine during convenience leaves Capacity on the doubling ladder', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_BYTE_COMBINE_COST,
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: false,
      productionMilestoneTier: 99,
      productionMilestoneTierClaims: 0,
      foundryResetCaps: {
        byteCreated: true,
        productionMilestoneTier: 0,
        productionMilestoneTierClaims: 0,
        disksBuiltTotal: {},
        capacity: INTRO_CAPACITY_CAP_BITS,
      },
    })
    const after = tickFoundryResetConvenience(state)
    expect(after.intro.byteCreated).toBe(true)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY)
  })
})

describe('getIntroProductionMilestoneCost', () => {
  it('is INTRO_STARTING_CAPACITY at tier 0, growing by INTRO_BANDWIDTH_COST_MULTIPLIER per tier', () => {
    expect(getIntroProductionMilestoneCost(0)).toBe(INTRO_STARTING_CAPACITY)
    expect(getIntroProductionMilestoneCost(1)).toBe(INTRO_STARTING_CAPACITY * INTRO_BANDWIDTH_COST_MULTIPLIER)
    expect(getIntroProductionMilestoneCost(2)).toBe(INTRO_STARTING_CAPACITY * INTRO_BANDWIDTH_COST_MULTIPLIER ** 2)
    expect(getIntroProductionMilestoneCost(3)).toBe(INTRO_STARTING_CAPACITY * INTRO_BANDWIDTH_COST_MULTIPLIER ** 3)
  })
})

describe('getIntroProductionMilestoneMaxClaims', () => {
  it('grants 2 claims for the three cheapest tiers (0/1/2 — 1/4/16 Bytes), then 1 for every tier after', () => {
    expect(getIntroProductionMilestoneMaxClaims(0)).toBe(2)
    expect(getIntroProductionMilestoneMaxClaims(1)).toBe(2)
    expect(getIntroProductionMilestoneMaxClaims(2)).toBe(2)
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

  it('requires 2 claims to advance from tiers 0-2 (the three cheapest, 1/4/16 Bytes), but only 1 from tier 3 on', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY, tickSpeedSeconds: 1, productionMultiplier: 1 })
    const afterFirstTier0Claim = pickIntroProductionMilestone(state)
    expect(afterFirstTier0Claim.intro.productionMilestoneTier).toBe(0)
    expect(afterFirstTier0Claim.intro.productionMilestoneTierClaims).toBe(1)

    const refilledForSecondClaim = withIntro(afterFirstTier0Claim, { bits: INTRO_STARTING_CAPACITY })
    const afterSecondTier0Claim = pickIntroProductionMilestone(refilledForSecondClaim)
    expect(afterSecondTier0Claim.intro.productionMilestoneTier).toBe(1)
    expect(afterSecondTier0Claim.intro.productionMilestoneTierClaims).toBe(0)

    const refilled = withIntro(afterSecondTier0Claim, { bits: getIntroProductionMilestoneCost(4), productionMilestoneTier: 4 })
    const afterTier4 = pickIntroProductionMilestone(refilled)
    expect(afterTier4.intro.productionMilestoneTier).toBe(5)
    expect(afterTier4.intro.productionMilestoneTierClaims).toBe(0)
  })

  it('spends exactly the claimed tier\'s cost, draining bits to 0 when the balance matches it exactly', () => {
    const state = withIntro(createInitialGameState(), {
      bits: getIntroProductionMilestoneCost(3), tickSpeedSeconds: 1, productionMultiplier: 1, productionMilestoneTier: 3,
    })
    const after = pickIntroProductionMilestone(state)
    expect(after.intro.productionMilestoneTier).toBe(4)
    expect(after.intro.bits).toBe(0)
  })

  it('is a no-op below this tier\'s cost', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY - 1 })
    expect(pickIntroProductionMilestone(state)).toBe(state)
  })

  it('is a no-op once every claim at the current tier has already been made (defensive — normal play never leaves state in this shape, since a completed tier auto-advances)', () => {
    const tier0AlreadyClaimedTwice = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY, productionMilestoneTier: 0, productionMilestoneTierClaims: 2,
    })
    expect(pickIntroProductionMilestone(tier0AlreadyClaimedTwice)).toBe(tier0AlreadyClaimedTwice)

    const tier3AlreadyClaimedOnce = withIntro(createInitialGameState(), {
      bits: getIntroProductionMilestoneCost(3), productionMilestoneTier: 3, productionMilestoneTierClaims: 1,
    })
    expect(pickIntroProductionMilestone(tier3AlreadyClaimedOnce)).toBe(tier3AlreadyClaimedOnce)
  })

  it('keeps working after mainGameUnlocked — nothing about Invest ever freezes', () => {
    const state = withIntro(createInitialGameState(), { mainGameUnlocked: true, bits: INTRO_STARTING_CAPACITY, tickSpeedSeconds: 1, productionMultiplier: 1 })
    const after = pickIntroProductionMilestone(state)
    expect(after.intro).not.toBe(state.intro)
  })

  it('is a no-op while a Disk Fill (higher priority) is currently available', () => {
    const state = withIntro(createInitialGameState(), {
      bits: INTRO_STARTING_CAPACITY, tickSpeedSeconds: 1, productionMultiplier: 1, disks: { [FIRST_DISK_SIZE]: 1 },
    })
    expect(pickIntroProductionMilestone(state)).toBe(state)
  })

  it('sacrifices COMPUTE_ENTITY_CAP Cores for ×2 when bit cost exceeds capacity (#323)', () => {
    // Tier 10 costs 8 * 4^10 = 8,388,608 bits; capacity (INTRO_COMPUTE_CORE_UNLOCK_CAPACITY) is
    // 4,194,304 bits → compute path. Rate already at floor from prior invests.
    const state = withIntro(createInitialGameState(), {
      capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
      bits: 0,
      productionMilestoneTier: 10,
      productionMilestoneTierClaims: 0,
      tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS,
      productionMultiplier: 128,
      computeCores: COMPUTE_ENTITY_CAP,
      computeBandwidthSacrificeIndex: 0,
      computeFundedBandwidthClaims: 0,
    })
    expect(isBitFundedBandwidthAvailable(state)).toBe(false)
    expect(isComputeFundedBandwidthAvailable(state)).toBe(true)
    const after = pickIntroProductionMilestone(state)
    expect(after.intro.computeCores).toBe(0)
    expect(after.intro.computeBandwidthSacrificeIndex).toBe(1)
    expect(after.intro.computeFundedBandwidthClaims).toBe(1)
    expect(after.intro.productionMultiplier).toBe(256)
    expect(getIntroProductionRate(after.intro)).toBe(getIntroProductionRate(state.intro) * INTRO_PRODUCTION_MULTIPLIER_STEP)
  })

  it('compute-funded Bandwidth is a no-op below COMPUTE_ENTITY_CAP of the next tier', () => {
    const state = withIntro(createInitialGameState(), {
      capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
      bits: 0,
      productionMilestoneTier: 10,
      tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS,
      productionMultiplier: 128,
      computeCores: COMPUTE_ENTITY_CAP - 1,
    })
    expect(isComputeFundedBandwidthAvailable(state)).toBe(false)
    expect(pickIntroProductionMilestone(state)).toBe(state)
  })

  it('wraps the sacrifice index back to Cores after Megacomputers instead of permanently dead-ending once pool 1 is capacity-capped', () => {
    // At INTRO_CAPACITY_CAP_BITS (pool 1's hard cap), Sacrifice can never fire again, so the
    // compute-funded overflow's own historical "walk the list once, then wait for a Sacrifice
    // reset" behavior would otherwise make Bandwidth a permanent no-op once every tier from
    // Megacomputers onward has been used. Wrapping back to Cores keeps it alive indefinitely.
    const atMegacomputers = withIntro(createInitialGameState(), {
      capacity: INTRO_CAPACITY_CAP_BITS,
      bits: 0,
      productionMilestoneTier: 50,
      tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS,
      productionMultiplier: 128,
      computeBandwidthSacrificeIndex: 9, // last index (Megacomputers)
      computeMegacomputers: COMPUTE_ENTITY_CAP,
    })
    expect(isComputeFundedBandwidthAvailable(atMegacomputers)).toBe(true)
    const afterMegacomputers = pickIntroProductionMilestone(atMegacomputers)
    expect(afterMegacomputers.intro.computeMegacomputers).toBe(0)
    // Wrapped, not terminated — back to index 0 (Cores), not 10.
    expect(afterMegacomputers.intro.computeBandwidthSacrificeIndex).toBe(0)

    // The wrapped state can immediately fund another claim off Cores — Bandwidth keeps
    // progressing even though Sacrifice itself is permanently unavailable at the cap.
    const withCores = withIntro(afterMegacomputers, { computeCores: COMPUTE_ENTITY_CAP })
    expect(isComputeFundedBandwidthAvailable(withCores)).toBe(true)
    const afterCores = pickIntroProductionMilestone(withCores)
    expect(afterCores.intro.computeCores).toBe(0)
    expect(afterCores.intro.computeBandwidthSacrificeIndex).toBe(1)
  })

  it('getComputeBandwidthSacrificeField/Label normalize an out-of-range persisted index instead of returning null forever', () => {
    // A save written before this fix could have computeBandwidthSacrificeIndex sitting at exactly
    // COMPUTE_BOOST_TIER_FIELDS.length (10) — the old terminal value. Reads should treat it the
    // same as index 0 (Cores), not stay permanently out of range.
    const state = withIntro(createInitialGameState(), { computeBandwidthSacrificeIndex: 10 })
    expect(getComputeBandwidthSacrificeField(state)).toBe('computeCores')
    expect(getComputeBandwidthSacrificeLabel(state)).toBe('Cores')
  })
})

describe('rollbackComputeFundedBandwidth / Sacrifice wipe (#324)', () => {
  it('rewinds compute-funded Invest steps and resets the sacrifice index', () => {
    const funded = withIntro(createInitialGameState(), {
      capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
      bits: 0,
      productionMilestoneTier: 8,
      productionMilestoneTierClaims: 0,
      tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS,
      productionMultiplier: 256,
      computeFundedBandwidthClaims: 1,
      computeBandwidthSacrificeIndex: 1,
      computeCores: 0,
    })
    const after = rollbackComputeFundedBandwidth(funded)
    expect(after.intro.computeFundedBandwidthClaims).toBe(0)
    expect(after.intro.computeBandwidthSacrificeIndex).toBe(0)
    expect(after.intro.productionMultiplier).toBe(128)
    expect(after.intro.productionMilestoneTier).toBe(7)
  })

  it('pickIntroCapacityMilestone at the ceiling leaves Compute state untouched', () => {
    const state = withIntro(createInitialGameState(), {
      capacity: INTRO_CAPACITY_CAP_BITS,
      bits: INTRO_CAPACITY_CAP_BITS,
      byteCreated: true,
      tickSpeedSeconds: INTRO_MIN_TICK_SPEED_SECONDS,
      productionMultiplier: 256,
      productionMilestoneTier: 8,
      productionMilestoneTierClaims: 1,
      computeCores: 5,
      computeNodes: 3,
      computeFundedBandwidthClaims: 1,
      computeBandwidthSacrificeIndex: 1,
      diskBuild: { size: 8000, remainingSeconds: 1, totalSeconds: 1 },
      computeBoostType: 'burst',
      computeBoostTierIndex: 1,
      computeBoostStacks: COMPUTE_BOOST_MAX_STACKS,
      computeBoostRemainingSeconds: 30,
    })
    expect(isMemoryCapacityUpgradeAvailable(state)).toBe(false)
    const after = pickIntroCapacityMilestone(state)
    expect(after).toBe(state)
    expect(after.intro.computeCores).toBe(5)
    expect(after.intro.computeFundedBandwidthClaims).toBe(1)
  })
})

// Base and forced-priority-turn predicates for the Byte Foundry's recurring "upgrade"
// actions — Disk Fill > Speed > Provision Disk > Compute; Capacity ×2 uses the shared full-Buffer
// ladder outside that ordering (see CLAUDE.md's "Byte Foundry" section).
describe('isDiskFillAvailable', () => {
  it('is false with no built disks', () => {
    expect(isDiskFillAvailable(withIntro(createInitialGameState(), {}))).toBe(false)
  })

  it('is true with a FULL disk whose own fixed corresponding tier is at its required level', () => {
    const state = withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } })
    expect(isDiskFillAvailable(state)).toBe(true)
  })

  it('is false with a FULL disk whose own fixed corresponding tier hasn\'t reached the required level yet', () => {
    const futureDiskSize = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withIntro(createInitialGameState(), { disks: { [futureDiskSize]: 1 } })
    expect(isDiskFillAvailable(state)).toBe(false)
  })

  it('is false with a built disk that is still EMPTY', () => {
    const state = withIntro(createInitialGameState(), { disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 } })
    expect(isDiskFillAvailable(state)).toBe(false)
  })
})

describe('isBandwidthAvailable', () => {
  it('is true once the current Invest tier\'s cost is affordable and unclaimed', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY })
    expect(isBandwidthAvailable(state)).toBe(true)
  })

  it('is false below the current tier\'s cost', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY - 1 })
    expect(isBandwidthAvailable(state)).toBe(false)
  })

  it('is false once every claim at the current tier is used up', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY, productionMilestoneTierClaims: 2 })
    expect(isBandwidthAvailable(state)).toBe(false)
  })
})

describe('isProvisionDiskAvailable', () => {
  it('is true once the currently-offered disk size\'s build cost is affordable out of its own pool buffer', () => {
    const state = withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE))
    expect(isProvisionDiskAvailable(state)).toBe(true)
  })

  it('is false below the build cost', () => {
    const state = withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE) - 1)
    expect(isProvisionDiskAvailable(state)).toBe(false)
  })

  it('a full pool buffer alone is not enough — a full shared Data Stream Buffer (intro.bits) does not fund Provision Disk any more', () => {
    const state = withIntro(createInitialGameState(), { bits: getDiskCost(FIRST_DISK_SIZE) })
    expect(isProvisionDiskAvailable(state)).toBe(false)
  })

  it('is false while an array is already mid-build, even with the build cost affordable', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), {
      diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
    })
    expect(isProvisionDiskAvailable(state)).toBe(false)
  })

  it('is false once the disk ladder is exhausted for every currently-active pool, even with the (stale) build cost fully affordable', () => {
    const size10KB = FIRST_DISK_SIZE * DISK_LADDER_SIZE_MULTIPLIER
    const size100KB = size10KB * DISK_LADDER_SIZE_MULTIPLIER
    const state = withPoolBuffer(withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [size10KB]: DISK_ARRAY_LADDER_CAP, [size100KB]: DISK_ARRAY_LADDER_CAP },
    }), getDiskCost(size100KB))
    expect(isProvisionDiskAvailable(state)).toBe(false)
  })
})

describe('isComputeUpgradeAvailable', () => {
  it('is false below INTRO_COMPUTE_CORE_UNLOCK_CAPACITY even with a Compute Core in hand', () => {
    const state = withIntro(createInitialGameState(), { capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY - 1, computeCores: 1 })
    expect(isComputeUpgradeAvailable(state)).toBe(false)
  })

  it('is false once unlocked but with no Compute Core to spend', () => {
    const state = withIntro(createInitialGameState(), { capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeCores: 0 })
    expect(isComputeUpgradeAvailable(state)).toBe(false)
  })

  it('is true once unlocked with at least 1 Compute Core available to spend', () => {
    const state = withIntro(createInitialGameState(), { capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeCores: 1 })
    expect(isComputeUpgradeAvailable(state)).toBe(true)
  })
})

describe('isBandwidthTurnAvailable', () => {
  it('matches isBandwidthAvailable with no Disk Fill pending', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY })
    expect(isBandwidthTurnAvailable(state)).toBe(true)
  })

  it('is false while a Disk Fill (higher priority) is currently available, even though Bandwidth itself is affordable', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_STARTING_CAPACITY, disks: { [FIRST_DISK_SIZE]: 1 } })
    expect(isBandwidthTurnAvailable(state)).toBe(false)
  })
})

describe('isProvisionDiskTurnAvailable', () => {
  it('matches isProvisionDiskAvailable with nothing ranked above it pending', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), { productionMilestoneTierClaims: 2 })
    expect(isProvisionDiskTurnAvailable(state)).toBe(true)
  })

  it('is false while Bandwidth (higher priority) is currently available', () => {
    // Bandwidth (Speed/Invest) still spends from the shared Data Stream Buffer directly (it's not
    // pool-scoped) — bits must cover its own tier-0 cost for it to actually outrank Provision Disk.
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), { bits: INTRO_STARTING_CAPACITY })
    expect(isProvisionDiskTurnAvailable(state)).toBe(false)
  })

  it('is false while a Disk Fill (higher priority) is currently available', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), {
      productionMilestoneTierClaims: 2, disks: { [FIRST_DISK_SIZE]: 1 },
    })
    expect(isProvisionDiskTurnAvailable(state)).toBe(false)
  })
})

describe('isComputeBoostTurnAvailable / isComputeUpgradeTurnAvailable', () => {
  const computeReady = { capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, computeCores: 1, productionMilestoneTierClaims: 2 }

  it('matches canActivateComputeBoost with nothing ranked above Compute pending', () => {
    const state = withIntro(createInitialGameState(), computeReady)
    expect(isComputeBoostTurnAvailable(state, 'burst', 1)).toBe(true)
    expect(isComputeUpgradeTurnAvailable(state)).toBe(true)
  })

  it('is false while Bandwidth (higher priority) is currently available', () => {
    const state = withIntro(createInitialGameState(), { ...computeReady, bits: INTRO_STARTING_CAPACITY, productionMilestoneTierClaims: 0 })
    expect(isComputeBoostTurnAvailable(state, 'burst', 1)).toBe(false)
    expect(isComputeUpgradeTurnAvailable(state)).toBe(false)
  })

  it('is false while a Disk Fill (higher priority) is currently available', () => {
    const state = withIntro(createInitialGameState(), { ...computeReady, disks: { [FIRST_DISK_SIZE]: 1 } })
    expect(isComputeBoostTurnAvailable(state, 'burst', 1)).toBe(false)
    expect(isComputeUpgradeTurnAvailable(state)).toBe(false)
  })

  it('is false while Provision Disk (higher priority) is currently available', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), computeReady)
    expect(isComputeBoostTurnAvailable(state, 'burst', 1)).toBe(false)
    expect(isComputeUpgradeTurnAvailable(state)).toBe(false)
  })
})

describe('isIntroConversionUnlocked', () => {
  it('is false below INTRO_CONVERSION_UNLOCK_CAPACITY', () => {
    const state = withIntro(createInitialGameState(), { capacity: 800 })
    expect(isIntroConversionUnlocked(state)).toBe(false)
  })

  it('is true once capacity reaches INTRO_CONVERSION_UNLOCK_CAPACITY', () => {
    const state = withIntro(createInitialGameState(), { capacity: INTRO_BITS_PER_KILOBYTE_CONVERSION })
    expect(isIntroConversionUnlocked(state)).toBe(true)
  })
})

describe('isStorageUnlocked', () => {
  it('is false below INTRO_DISK_UNLOCK_CAPACITY (80,000 bits, "9.765 KiB" in Memory\'s own binary scale)', () => {
    const state = withIntro(createInitialGameState(), { capacity: INTRO_DISK_UNLOCK_CAPACITY - 1 })
    expect(isStorageUnlocked(state)).toBe(false)
  })

  it('is true once capacity reaches INTRO_DISK_UNLOCK_CAPACITY', () => {
    const state = withIntro(createInitialGameState(), { capacity: INTRO_DISK_UNLOCK_CAPACITY })
    expect(isStorageUnlocked(state)).toBe(true)
  })
})

describe('getMemoryUnit', () => {
  it('is null before byteCreated — nothing to denominate in yet', () => {
    expect(getMemoryUnit(INTRO_STARTING_CAPACITY, false)).toBeNull()
  })

  it('stays in raw Bytes (divisor BITS_PER_BYTE) below the KiB threshold', () => {
    expect(getMemoryUnit(INTRO_STARTING_CAPACITY, true)).toEqual({ symbol: 'B', divisor: BITS_PER_BYTE })
  })

  it('steps up through multiple binary units as capacity grows, matching tier symbols with an "i"', () => {
    // 4,194,304 bits = 512 KiB in Memory's own binary scale (see INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
    // half of pool 1's INTRO_CAPACITY_CAP_BITS / 1 MiB).
    expect(getMemoryUnit(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, true)).toEqual({ symbol: 'KiB', divisor: BITS_PER_BYTE * MEMORY_BINARY_UNIT_STEP })
  })

  it('caps at the largest unit (QiB) rather than running off the end of the symbol list', () => {
    const hugeCapacity = BITS_PER_BYTE * MEMORY_BINARY_UNIT_STEP ** 11
    expect(getMemoryUnit(hugeCapacity, true)).toEqual({ symbol: 'QiB', divisor: BITS_PER_BYTE * MEMORY_BINARY_UNIT_STEP ** 10 })
  })

  it('1 KiB is 1.024x a real (SI) KB — 1024 Bytes, not 1000', () => {
    const oneKiB = getMemoryUnit(BITS_PER_BYTE * MEMORY_BINARY_UNIT_STEP, true)
    expect(oneKiB).toEqual({ symbol: 'KiB', divisor: BITS_PER_BYTE * MEMORY_BINARY_UNIT_STEP })
    expect(oneKiB.divisor / BITS_PER_BYTE).toBe(1024)
  })
})

describe('formatMemoryAmount', () => {
  it('renders raw bits with singular/plural grammar when there is no unit yet', () => {
    expect(formatMemoryAmount(1, null)).toBe('1 bit')
    expect(formatMemoryAmount(2, null)).toBe('2 bits')
  })

  it('renders in the given unit, flooring rather than rounding so a balance never overstates', () => {
    const unit = { symbol: 'KiB', divisor: 1024 }
    expect(formatMemoryAmount(2047, unit)).toBe('1.999 KiB')
  })
})

describe('formatBitsInNearestUnit', () => {
  it('picks the binary unit that best fits the given amount itself', () => {
    expect(formatBitsInNearestUnit(INTRO_COMPUTE_CORE_UNLOCK_CAPACITY)).toBe('512 KiB')
  })

  it('renders exactly INTRO_CAPACITY_CAP_BITS (pool 1\'s cap) as 1 MiB', () => {
    expect(formatBitsInNearestUnit(INTRO_CAPACITY_CAP_BITS)).toBe('1 MiB')
  })
})

describe('getIntroKilobyteConversionCost', () => {
  it('is tier01\'s own starting per-unit cost (1000, matching INTRO_BITS_PER_KILOBYTE_CONVERSION) on a fresh cycle', () => {
    expect(getIntroKilobyteConversionCost(createInitialGameState())).toBe(INTRO_BITS_PER_KILOBYTE_CONVERSION)
  })

  it('grows to tier01\'s own CURRENT per-unit level cost as it levels up, not a fixed rate', () => {
    const state = withPurchaseLevel(createInitialGameState(), TIER_DEFINITIONS[0].id, 2)
    expect(getIntroKilobyteConversionCost(state)).toBe(getTierCost(TIER_DEFINITIONS[0], 2) * BITS_PER_BYTE)
    expect(getIntroKilobyteConversionCost(state)).toBe(80000)
  })
})

describe('convertIntroBitsToKilobytes', () => {
  const firstTierId = TIER_DEFINITIONS[0].id
  const level1Cost = getTierCost(TIER_DEFINITIONS[0], 1) * BITS_PER_BYTE // 8000, === INTRO_BITS_PER_KILOBYTE_CONVERSION
  const level2Cost = getTierCost(TIER_DEFINITIONS[0], 2) * BITS_PER_BYTE // 80,000

  it('spends tier01\'s CURRENT per-unit cost (getIntroKilobyteConversionCost) and grants 1 free unit', () => {
    const state = withIntro(createInitialGameState(), { bits: level1Cost, capacity: level1Cost })
    const after = convertIntroBitsToKilobytes(state)
    expect(after.intro.bits).toBe(0)
    expect(after.owned[firstTierId]).toBe(1)
  })

  it('is a no-op below the current conversion cost', () => {
    const state = withIntro(createInitialGameState(), { bits: level1Cost - 1, capacity: level1Cost })
    expect(convertIntroBitsToKilobytes(state)).toBe(state)
  })

  it('flips mainGameUnlocked on a successful convert', () => {
    const state = withIntro(createInitialGameState(), { bits: level1Cost, capacity: level1Cost })
    const after = convertIntroBitsToKilobytes(state)
    expect(after.intro.mainGameUnlocked).toBe(true)
  })

  // Regression test for a past design: the conversion cost used to be a flat
  // INTRO_BITS_PER_KILOBYTE_CONVERSION forever, undervaluing a transfer once tier01's real price
  // grew past it — see docs/DESIGN_HISTORY.md. The cost now steps up mid-sequence exactly like a
  // manual Buy would.
  it('steps its own cost up once tier01 levels up, and keeps working indefinitely — there is no per-cycle transfer cap', () => {
    const totalBits = DEFAULT_PURCHASE_BLOCK_SIZE * level1Cost + 2 * level2Cost
    const state = withIntro(createInitialGameState(), { mainGameUnlocked: true, bits: totalBits, capacity: totalBits })
    let after = state
    for (let i = 0; i < DEFAULT_PURCHASE_BLOCK_SIZE + 2; i++) after = convertIntroBitsToKilobytes(after)
    expect(after.intro.bits).toBe(0)
    expect(after.owned[firstTierId]).toBe(DEFAULT_PURCHASE_BLOCK_SIZE + 2)
    expect(after.purchaseLevels[firstTierId]).toBe(2)
  })

  it('advances the first tier\'s own purchaseLevelProgress on every convert, rolling over once a level completes', () => {
    const totalBits = DEFAULT_PURCHASE_BLOCK_SIZE * level1Cost + level2Cost
    const state = withIntro(withPurchaseLevel(createInitialGameState(), firstTierId, 1), {
      bits: totalBits, capacity: totalBits,
    })
    let after = state
    for (let i = 0; i < DEFAULT_PURCHASE_BLOCK_SIZE; i++) after = convertIntroBitsToKilobytes(after)
    expect(after.purchaseLevels[firstTierId]).toBe(2)
    expect(after.purchaseLevelProgress[firstTierId]).toBe(0)

    const afterOneMore = convertIntroBitsToKilobytes(after)
    expect(afterOneMore.purchaseLevelProgress[firstTierId]).toBe(1)
    expect(afterOneMore.intro.bits).toBe(0)
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

  it('returns the same state reference for a true zero-delta tick, not just an equal-valued one', () => {
    const state = withIntro(createInitialGameState(), { byteCreated: true, tickSpeedSeconds: 1, productionMultiplier: 1, capacity: 100 })
    expect(tickIntroProduction(0)(state)).toBe(state)
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

  it('is a no-op below a single INTRO_BITS_PER_KILOBYTE_CONVERSION unit', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_BITS_PER_KILOBYTE_CONVERSION - 1 })
    expect(tickIntroAutoInvest(state)).toBe(state)
  })

  // Regression test: an earlier version waited for a whole getPurchaseBlockSize(state)-sized batch
  // (8000 bits at a fresh cycle) before converting anything at all, which made the transfer-block
  // row look permanently stuck on block 1 (pinned at 100%, bits clamped past 1000) for the entire
  // time bits climbed from 1000 up toward the full batch — see docs/DESIGN_HISTORY.md. Converting a
  // single unit as soon as it's affordable is what makes the row advance live, block by block.
  it('converts a single unit as soon as one is affordable, without waiting for a whole batch', () => {
    const state = withIntro(createInitialGameState(), { bits: INTRO_BITS_PER_KILOBYTE_CONVERSION + 500, capacity: 80000, byteCreated: true })
    const after = tickIntroAutoInvest(state)
    expect(after.owned[firstTierId]).toBe(1)
    expect(after.intro.bits).toBe(500)
    expect(after.intro.mainGameUnlocked).toBe(true)
  })

  it('converts every complete unit that fits in a single call, not just one, when several are affordable at once', () => {
    const state = withIntro(createInitialGameState(), { bits: 5 * INTRO_BITS_PER_KILOBYTE_CONVERSION, capacity: 10000, byteCreated: true })
    const after = tickIntroAutoInvest(state)
    expect(after.owned[firstTierId]).toBe(5)
    expect(after.intro.bits).toBe(0)
  })

  // Same "at most one level's worth per call" safety bound buyTierQuantity's own autobuyer path
  // uses (getTierBulkQuantity) — so an extreme bits balance can't loop this an unbounded number of
  // times in a single tick; a jump spanning more than one level's worth of units completes the
  // rest on a later tick instead.
  it('caps at the current level\'s remaining block boundary, leaving the rest for a later call', () => {
    const level1Cost = getTierCost(TIER_DEFINITIONS[0], 1) * BITS_PER_BYTE // 8000
    const level2Cost = getTierCost(TIER_DEFINITIONS[0], 2) * BITS_PER_BYTE // 80,000
    const bitsForTwoFullLevels = DEFAULT_PURCHASE_BLOCK_SIZE * level1Cost + DEFAULT_PURCHASE_BLOCK_SIZE * level2Cost
    const state = withIntro(createInitialGameState(), { bits: bitsForTwoFullLevels, capacity: bitsForTwoFullLevels, byteCreated: true })
    const after = tickIntroAutoInvest(state)
    expect(after.owned[firstTierId]).toBe(DEFAULT_PURCHASE_BLOCK_SIZE)
    expect(after.purchaseLevels[firstTierId]).toBe(2)
    expect(after.purchaseLevelProgress[firstTierId]).toBe(0)
    expect(after.intro.bits).toBe(DEFAULT_PURCHASE_BLOCK_SIZE * level2Cost)

    const again = tickIntroAutoInvest(after)
    expect(again.owned[firstTierId]).toBe(DEFAULT_PURCHASE_BLOCK_SIZE * 2)
    expect(again.intro.bits).toBe(0)
  })

  it('fires again every time another unit becomes affordable, with no per-cycle cap', () => {
    const state = withIntro(createInitialGameState(), {
      mainGameUnlocked: true, bits: INTRO_BITS_PER_KILOBYTE_CONVERSION, capacity: 80000, byteCreated: true,
    })
    const after = tickIntroAutoInvest(state)
    expect(after.intro.bits).toBe(0)
    expect(after.owned[firstTierId]).toBe(1)

    const again = withIntro(after, { bits: INTRO_BITS_PER_KILOBYTE_CONVERSION })
    const afterAgain = tickIntroAutoInvest(again)
    expect(afterAgain.intro.bits).toBe(0)
    expect(afterAgain.owned[firstTierId]).toBe(2)
  })
})

// ─── Byte Foundry Storage (bank blocks) ───────────────────────────────────────

describe('getDiskSize', () => {
  it('starts at 8000 bits (1 KB, Byte-accurate) on a fresh cycle', () => {
    const state = createInitialGameState()
    expect(getDiskSize(state)).toBe(FIRST_DISK_SIZE)
    expect(getDiskSize(state)).toBe(DISK_LADDER_BASE_SIZE_BITS)
    expect(getDiskSize(state)).toBe(8000)
  })

  it('is independent of tier01\'s own level cost — it does not advance just because tier01 levels up', () => {
    const state = withPurchaseLevel(createInitialGameState(), tensTier.id, 5)
    expect(getDiskSize(state)).toBe(FIRST_DISK_SIZE)
  })

  it('advances to the next Byte power-of-ten size once DISK_ARRAY_LADDER_CAP disks have ever been built at the current size', () => {
    const state = withIntro(createInitialGameState(), { disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP } })
    expect(getDiskSize(state)).toBe(FIRST_DISK_SIZE * DISK_LADDER_SIZE_MULTIPLIER) // 80,000 = 10 KB
  })

  it('does not regress after disks of the maxed-out size are later redeemed — the ladder only ever advances', () => {
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP },
      disks: { [FIRST_DISK_SIZE]: 3 }, // some already redeemed, some still full — either way, below the cap
    })
    expect(getDiskSize(state)).toBe(FIRST_DISK_SIZE * DISK_LADDER_SIZE_MULTIPLIER)
  })

  it('advances through 10 KB then 100 KB — every size within pool 1\'s own funded ladder is offered (issue #368)', () => {
    const size10KB = FIRST_DISK_SIZE * DISK_LADDER_SIZE_MULTIPLIER
    const size100KB = size10KB * DISK_LADDER_SIZE_MULTIPLIER
    const after10KB = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP },
    })
    expect(getDiskSize(after10KB)).toBe(size10KB)
    expect(size10KB).toBe(80000)

    const after100KB = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [size10KB]: DISK_ARRAY_LADDER_CAP },
    })
    expect(getDiskSize(after100KB)).toBe(size100KB)
    expect(size100KB).toBe(800000)
  })

  it('advances to 1 MB once pool 2 is unlocked', () => {
    const size10KB = FIRST_DISK_SIZE * DISK_LADDER_SIZE_MULTIPLIER
    const size100KB = size10KB * DISK_LADDER_SIZE_MULTIPLIER
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: {
        [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP,
        [size10KB]: DISK_ARRAY_LADDER_CAP,
        [size100KB]: DISK_ARRAY_LADDER_CAP,
      },
    })
    expect(getDiskSize(state)).toBe(size100KB * DISK_LADDER_SIZE_MULTIPLIER)
  })
})

describe('isDiskLadderExhaustedForActivePools', () => {
  it('is false before the 100 KB array is fully built', () => {
    const size10KB = FIRST_DISK_SIZE * DISK_LADDER_SIZE_MULTIPLIER
    const size100KB = size10KB * DISK_LADDER_SIZE_MULTIPLIER
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [size10KB]: DISK_ARRAY_LADDER_CAP, [size100KB]: DISK_ARRAY_LADDER_CAP - 1 },
    })
    expect(isDiskLadderExhaustedForActivePools(state)).toBe(false)
  })

  it('is false at pool 1 completion because pool 2 is now active', () => {
    const size10KB = FIRST_DISK_SIZE * DISK_LADDER_SIZE_MULTIPLIER
    const size100KB = size10KB * DISK_LADDER_SIZE_MULTIPLIER
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [size10KB]: DISK_ARRAY_LADDER_CAP, [size100KB]: DISK_ARRAY_LADDER_CAP },
    })
    expect(isDiskLadderExhaustedForActivePools(state)).toBe(false)
  })

  it('is true only once pool 10\'s largest array is fully built', () => {
    const disksBuiltTotal = {}
    for (let step = 1; step <= DATA_LAKE_TIER_COUNT * 3; step += 1) {
      disksBuiltTotal[getDiskLadderSizeBits(step)] = DISK_ARRAY_LADDER_CAP
    }
    const state = withIntro(createInitialGameState(), { disksBuiltTotal })
    expect(getUnlockedStoragePoolCount(state)).toBe(DATA_LAKE_TIER_COUNT)
    expect(isDiskLadderExhaustedForActivePools(state)).toBe(true)
  })
})

describe('getNextDiskLadderSize', () => {
  it('returns the canonical ladder size for every step, including the ones where ×10 drifts in floating point', () => {
    for (let step = 1; step < DATA_LAKE_TIER_COUNT * 3; step += 1) {
      const sourceSize = getDiskLadderSizeBits(step)
      expect(getNextDiskLadderSize(sourceSize)).toBe(getDiskLadderSizeBits(step + 1))
      expect(getDiskLadderStep(getNextDiskLadderSize(sourceSize))).toBe(step + 1)
    }
    // Step 22 → 23 is the first transition where sourceSize * 10 !== getDiskLadderSizeBits(23).
    expect(getDiskLadderSizeBits(22) * DISK_LADDER_SIZE_MULTIPLIER).not.toBe(getDiskLadderSizeBits(23))
  })
})

describe('getDiskCost', () => {
  it('is DISK_BUILD_COST_MULTIPLIER times the disk\'s own size — no further BITS_PER_BYTE conversion needed, the size itself is already Byte-accurate', () => {
    // A real 1 KB (8000-bit) disk costs 80,000 bits ("10 KB") to build — see the "Byte Foundry
    // Storage" comment in layers.js for the Kilobit->Kilobyte bug this fixed.
    expect(getDiskCost(FIRST_DISK_SIZE)).toBe(FIRST_DISK_SIZE * DISK_BUILD_COST_MULTIPLIER)
    expect(getDiskCost(FIRST_DISK_SIZE)).toBe(80000)
  })
})

describe('formatDiskSize', () => {
  // Disk sizes are real, Byte-accurate bit counts (see getDiskSize above), rendered in the SI B/KB/
  // MB/… scale — Storage stays SI even though Memory Capacity's own formatBitsInNearestUnit moved
  // to binary units (see docs/DESIGN_HISTORY.md). formatDiskSize is deliberately NOT the same
  // function as formatBitsInNearestUnit any more (it once was, back when both scales were SI — see
  // that history entry) — a disk size must never render in Ki/Mi units.
  it('is NOT the same function as formatBitsInNearestUnit (SI vs. binary scale)', () => {
    expect(formatDiskSize).not.toBe(formatBitsInNearestUnit)
  })

  it('renders a fresh cycle\'s disk size (8000 bits) as "1 KB", not a raw bit count', () => {
    expect(formatDiskSize(FIRST_DISK_SIZE)).toBe('1 KB')
  })

  it('renders a fractional Byte below the 1-Byte (8-bit) threshold', () => {
    expect(formatDiskSize(4)).toBe('0.5 B')
  })

  it('scales into KB/MB/… reusing TIER_DEFINITIONS\' own symbols', () => {
    expect(formatDiskSize(getTierCost(tensTier, 2) * BITS_PER_BYTE)).toBe('10 KB')
    expect(formatDiskSize(1000000 * BITS_PER_BYTE)).toBe('1 MB')
  })
})

describe('getDiskSizesToShow', () => {
  it('shows only the currently-offered size (at 0 built) on a fresh cycle', () => {
    const state = createInitialGameState()
    expect(getDiskSizesToShow(state)).toEqual([getDiskSize(state)])
  })

  it('includes every size ever built, even after its disks have all been redeemed back to 0 full', () => {
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 3 },
      disks: { [FIRST_DISK_SIZE]: 0 },
    })
    expect(getDiskSizesToShow(state)).toContain(FIRST_DISK_SIZE)
  })

  it('includes a size that is currently held but has no matching disksBuiltTotal entry (a migrated pre-ladder save)', () => {
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: {},
      disks: { [FIRST_DISK_SIZE]: 2 },
    })
    expect(getDiskSizesToShow(state)).toContain(FIRST_DISK_SIZE)
  })

  it('excludes a size with a zero/absent entry in both maps that also is not the currently-offered size', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const level3Size = getTierCost(tensTier, 3) * BITS_PER_BYTE
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [level3Size]: 0 },
      disks: { [level3Size]: 0 },
    })
    // Reaching DISK_ARRAY_LADDER_CAP at the first size advances the currently-offered size to
    // level2Size — leaving level3Size present as a key in both maps, but at 0 in each, and not current.
    expect(getDiskSize(state)).toBe(level2Size)
    expect(getDiskSizesToShow(state)).not.toContain(level3Size)
  })

  it('de-duplicates a size present in both maps and sorts the result ascending', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [level2Size]: 4 },
      disks: { [level2Size]: 2 },
    })
    // Reaching DISK_ARRAY_LADDER_CAP at the first size has advanced the ladder to level2Size (the
    // currently-offered size) — the first size still shows because it was built, level2Size shows
    // only once despite appearing in disksBuiltTotal, disks, AND as the current size.
    expect(getDiskSize(state)).toBe(level2Size)
    expect(getDiskSizesToShow(state)).toEqual([FIRST_DISK_SIZE, level2Size])
  })
})

describe('getRelevantDiskSizesForFoundry', () => {
  it('includes the currently-offered size when tier01 is at its required level 1', () => {
    const state = createInitialGameState()
    expect(getRelevantDiskSizesForFoundry(state)).toEqual([FIRST_DISK_SIZE])
  })

  it('keeps an older built size while its own fixed tier is still at the right level, even after the ladder advances', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP },
    })
    expect(getDiskSize(state)).toBe(level2Size)
    // 1 KB still maps to Kilobytes' level 1; highest (10 KB offer) is also kept even though it does not match.
    expect(getRelevantDiskSizesForFoundry(state)).toEqual([FIRST_DISK_SIZE, level2Size])
  })

  it('still keeps the highest shown size once no shown size\'s own fixed corresponding tier is at the required level', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withPurchaseLevel(
      withIntro(createInitialGameState(), {
        disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP },
      }),
      tensTier.id,
      3
    )
    expect(getDiskSize(state)).toBe(level2Size)
    expect(getRelevantDiskSizesForFoundry(state)).toEqual([level2Size])
  })

  it('lists multiple matching sizes ascending (smallest first)', () => {
    const megabyteDiskSize = getTierCost(TIER_DEFINITIONS[1], 1) * BITS_PER_BYTE
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1, [megabyteDiskSize]: 1 },
    })
    expect(getRelevantDiskSizesForFoundry(state)).toEqual([FIRST_DISK_SIZE, megabyteDiskSize])
  })
})

describe('provisionDisk', () => {
  // Provision Disk ranks below Bandwidth in the Byte Foundry's forced priority order (see
  // isProvisionDiskTurnAvailable) — Bandwidth's own tier-0 cost (8 bits) is trivially affordable at
  // every balance these tests use, so every test that expects a build to actually FIRE must mark
  // the current Invest tier's claims already used up (mirroring noOtherUpgradesLeft above).
  const bandwidthExhausted = { productionMilestoneTierClaims: 2 }

  // Default createInitialGameState() production rate is exactly 1 bit/sec (INTRO_BYTE_BASE_RATE ×
  // productionMultiplier ÷ tickSpeedSeconds = 1×1÷1), so at 1x Memory bandwidth a base build's
  // totalSeconds is numerically equal to the disk's own size in bits.

  it('spends the build cost from its own pool buffer immediately and starts a timed build — does not construct the disk yet', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), bandwidthExhausted)

    const after = provisionDisk(state)
    expect(after.intro.poolBuffers[1]).toBe(0)
    // Not constructed yet — only tickProvisionDisk, once the countdown finishes, increments this.
    expect(after.intro.disksBuiltTotal[FIRST_DISK_SIZE]).toBeUndefined()
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBeUndefined()
    expect(after.intro.diskBuild).toEqual({ size: FIRST_DISK_SIZE, remainingSeconds: FIRST_DISK_SIZE, totalSeconds: FIRST_DISK_SIZE })
  })

  it('the FIRST disk ever built at the smallest size takes exactly the time to fill it at 1x Memory bandwidth', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), bandwidthExhausted)
    const after = provisionDisk(state)
    expect(after.intro.diskBuild.totalSeconds).toBe(FIRST_DISK_SIZE)
  })

  it('a 10 KB disk\'s first build takes 10x as long as the smallest size\'s — base time tracks its own real size', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(level2Size)), {
      ...bandwidthExhausted,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP }, // advances the ladder to level2Size
    })
    const after = provisionDisk(state)
    expect(after.intro.diskBuild).toEqual({ size: level2Size, remainingSeconds: level2Size, totalSeconds: level2Size })
  })

  it('a 1 MB disk uses pool 2 bandwidth for pacing while spending pool 2\'s own buffer', () => {
    const megabyteSize = FIRST_DISK_SIZE * 1000
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(megabyteSize), 2), {
      capacity: getDiskCost(megabyteSize),
      byteCreated: true,
      ...bandwidthExhausted,
      disksBuiltTotal: {
        [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 10]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 100]: DISK_ARRAY_LADDER_CAP,
      },
    })
    const after = provisionDisk(state)
    expect(after.intro.poolBuffers[2]).toBe(0)
    expect(after.intro.diskBuild).toEqual({
      size: megabyteSize,
      remainingSeconds: megabyteSize,
      totalSeconds: megabyteSize,
    })
  })

  it('building the 6th disk of a size takes 6x that size\'s base build time — ordinal is read from disksBuiltTotal at the moment the build starts', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), {
      ...bandwidthExhausted,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 5 }, // 5 already built — this build is the 6th
    })
    const after = provisionDisk(state)
    expect(after.intro.diskBuild.totalSeconds).toBe(FIRST_DISK_SIZE * 6)
  })

  it('is a no-op below the build cost', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE) - 1), bandwidthExhausted)
    expect(provisionDisk(state)).toBe(state)
  })

  it('is a no-op while an array is already mid-build', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), {
      ...bandwidthExhausted,
      diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
    })
    expect(provisionDisk(state)).toBe(state)
  })

  it('is a no-op while Bandwidth (higher priority) is currently available', () => {
    // Bandwidth (Speed/Invest) still spends from the shared Data Stream Buffer directly (it's not
    // pool-scoped) — bits must cover its own tier-0 cost for it to actually outrank Provision Disk.
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), { bits: INTRO_STARTING_CAPACITY })
    expect(provisionDisk(state)).toBe(state)
  })

  it('is a no-op while a Disk Fill (higher priority) is currently available', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), {
      ...bandwidthExhausted, disks: { [FIRST_DISK_SIZE]: 1 },
    })
    expect(provisionDisk(state)).toBe(state)
  })
})

describe('tickProvisionDisk', () => {
  it('is a same-reference no-op when no build is in progress', () => {
    const state = withIntro(createInitialGameState(), { diskBuild: null })
    expect(tickProvisionDisk(1)(state)).toBe(state)
  })

  it('counts remainingSeconds down by elapsedSeconds without completing early', () => {
    const state = withIntro(createInitialGameState(), {
      diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 6, totalSeconds: 6 },
    })
    const after = tickProvisionDisk(2)(state)
    expect(after.intro.diskBuild).toEqual({ size: FIRST_DISK_SIZE, remainingSeconds: 4, totalSeconds: 6 })
    expect(after.intro.disksBuiltTotal[FIRST_DISK_SIZE]).toBeUndefined()
  })

  it('completes the build once the countdown reaches 0 — increments disksBuiltTotal and clears diskBuild', () => {
    const state = withIntro(createInitialGameState(), {
      diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
    })
    const after = tickProvisionDisk(1)(state)
    expect(after.intro.diskBuild).toBeNull()
    expect(after.intro.disksBuiltTotal[FIRST_DISK_SIZE]).toBe(1)
  })

  it('completes the build when elapsedSeconds overshoots remainingSeconds', () => {
    const state = withIntro(createInitialGameState(), {
      diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
    })
    const after = tickProvisionDisk(5)(state)
    expect(after.intro.diskBuild).toBeNull()
    expect(after.intro.disksBuiltTotal[FIRST_DISK_SIZE]).toBe(1)
  })

  it('accumulates onto an existing disksBuiltTotal count for that size rather than overwriting it', () => {
    const state = withIntro(createInitialGameState(), {
      diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 5 },
    })
    const after = tickProvisionDisk(1)(state)
    expect(after.intro.disksBuiltTotal[FIRST_DISK_SIZE]).toBe(6)
  })
})

describe('tickGame Provision Disk integration', () => {
  it('completes a full build through tickGame itself, not just the raw reducer', () => {
    const state = withIntro(createInitialGameState(), {
      diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
    })
    const after = tickGame(1)(state)
    expect(after.intro.diskBuild).toBeNull()
    expect(after.intro.disksBuiltTotal[FIRST_DISK_SIZE]).toBe(1)
  })
})

// While intro.diskBuild?.size === X, every operation against size-X disks is a no-op — even a full
// disk/full cache block that would otherwise qualify — resuming the instant the build completes.
describe('Disk array IO lockout during a build', () => {
  it('tickDiskAutoFill skips the mid-build size entirely, while another size still fills normally', () => {
    // Only the pool's own smallest size (FIRST_DISK_SIZE) ever keeps a read cache (see
    // isDiskReadCacheEligible) — level2Size is a good "unrelated size" stand-in here precisely
    // because it has no read-cache path of its own to disturb either way.
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), {
      bits: FIRST_DISK_SIZE,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1, [level2Size]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: FIRST_DISK_SIZE }, // already full — read cache pours into the empty disk
      diskBuild: { size: level2Size, remainingSeconds: 1, totalSeconds: 1 },
    })
    const after = tickDiskAutoFill(1e12)(state)
    // The mid-build size stays untouched (it never had a read cache to begin with)...
    expect(after.intro.diskCache?.[level2Size] ?? 0).toBe(0)
    expect(after.intro.disks?.[level2Size] ?? 0).toBe(0)
    // ...while the smallest size's read cache still pours into its own empty disk normally,
    // proving the lockout is scoped to the building size and doesn't block an unrelated one.
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(1)
    expect(after.intro.diskCache?.[FIRST_DISK_SIZE] ?? 0).toBe(0)
    expect(after.intro.bits).toBe(FIRST_DISK_SIZE)
  })

  it('tickDiskAutoRedeem skips a full, otherwise-redeemable disk of the mid-build size', () => {
    const state = withAutobuyer(
      withIntro(createInitialGameState(), {
        disks: { [FIRST_DISK_SIZE]: 1 },
        diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
      }),
      tensTier.id, 1
    )
    expect(tickDiskAutoRedeem(state)).toBe(state)
  })

  it('redeemDisk is a no-op against the mid-build size, even with a full disk in hand', () => {
    const state = withIntro(createInitialGameState(), {
      disks: { [FIRST_DISK_SIZE]: 1 },
      diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
    })
    expect(redeemDisk(FIRST_DISK_SIZE)(state)).toBe(state)
  })

  it('isDiskCacheBlockReleasable is false and releaseDiskCacheBlock is a no-op against the mid-build size, even with a full cache block', () => {
    const blockBits = FIRST_DISK_SIZE / DISK_CACHE_BLOCK_COUNT
    const state = withIntro(createInitialGameState(), {
      diskCache: { [FIRST_DISK_SIZE]: blockBits },
      diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
    })
    expect(isDiskCacheBlockReleasable(state, FIRST_DISK_SIZE)).toBe(false)
    expect(releaseDiskCacheBlock(FIRST_DISK_SIZE)(state)).toBe(state)
  })

  it('every operation against the size resumes working the instant its build completes', () => {
    const blockBits = FIRST_DISK_SIZE / DISK_CACHE_BLOCK_COUNT
    const state = withAutobuyer(
      withIntro(createInitialGameState(), {
        disks: { [FIRST_DISK_SIZE]: 1 },
        disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
        diskCache: { [FIRST_DISK_SIZE]: blockBits },
        diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
      }),
      tensTier.id, 1
    )
    const afterBuild = tickProvisionDisk(1)(state)
    expect(afterBuild.intro.diskBuild).toBeNull()
    // Disk takes priority — cache stays blocked while the full redeemable disk exists.
    expect(isDiskCacheBlockReleasable(afterBuild, FIRST_DISK_SIZE)).toBe(false)
    expect(tickDiskAutoRedeem(afterBuild)).not.toBe(afterBuild)
  })
})

describe('tickDiskAutoFill', () => {
  const blockBits = FIRST_DISK_SIZE / DISK_CACHE_BLOCK_COUNT
  // Storage unlocks at 80_000 capacity; seed that so bit balances in these tests aren't above
  // capacity (which would look "full" and trip the capacity&lt;block dump path).
  const storageCapacity = 80_000

  it('is a same-reference no-op with no built disks', () => {
    const state = withIntro(createInitialGameState(), { bits: 5000, capacity: storageCapacity })
    expect(tickDiskAutoFill(1e12)(state)).toBe(state)
  })

  it('is a same-reference no-op when Memory has no bits at all to add to the cache', () => {
    const state = withIntro(createInitialGameState(), {
      bits: 0,
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
    })
    expect(tickDiskAutoFill(1e12)(state)).toBe(state)
  })

  it('leaves Memory untouched when bits are fewer than one cache block — progress stays visible in Memory', () => {
    const state = withIntro(createInitialGameState(), {
      bits: blockBits - 1,
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
    })
    expect(tickDiskAutoFill(1e12)(state)).toBe(state)
  })

  it('transfers whole cache blocks only, leaving a sub-block remainder in its pool buffer', () => {
    // A pool buffer's own capacity (Capacity / MEMORY_BINARY_UNIT_STEP) must itself exceed one
    // cache block for the sub-block-remainder edge case below (getPoolBufferCapacity < one block)
    // to stay out of play here — storageCapacity alone (78-bit buffer cap) would trigger it.
    const ampleCapacity = blockBits * MEMORY_BINARY_UNIT_STEP * 2
    const state = withIntro(withPoolBuffer(createInitialGameState(), blockBits * 3 + 250), {
      capacity: ampleCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      disks: { [FIRST_DISK_SIZE]: 1 }, // no empty disk — only cache refill
    })
    const after = tickDiskAutoFill(1e12)(state)
    expect(after.intro.diskCache[FIRST_DISK_SIZE]).toBe(blockBits * 3)
    expect(after.intro.poolBuffers[1]).toBe(250)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(1)
  })

  it('caps a single call\'s cache refill from its pool buffer at CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER × rate × elapsedSeconds, even with a huge banked balance', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), blockBits * 5), {
      // far more than the 1-second budget below could ever move
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      disks: { [FIRST_DISK_SIZE]: 1 }, // no empty container — isolates the cache-refill budget
    })
    // Default production rate is 1 bit/sec, so 1 elapsed second's budget is 10 bits — far below one
    // full block (1000 bits) — yet still a real, nonzero, continuous (not block-quantized) transfer.
    const budget = CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER * 1 * 1
    const after = tickDiskAutoFill(1)(state)
    expect(after.intro.diskCache[FIRST_DISK_SIZE]).toBe(budget)
    expect(after.intro.poolBuffers[1]).toBe(blockBits * 5 - budget)
  })

  it('dumps the whole pool buffer balance when the pool buffer\'s own clamped capacity is smaller than one cache block', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), INTRO_STARTING_CAPACITY), {
      capacity: INTRO_STARTING_CAPACITY,
      disksBuiltTotal: {
        [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 10]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 100]: DISK_ARRAY_LADDER_CAP,
      },
      disks: { [FIRST_DISK_SIZE]: 1 },
    })
    const after = tickDiskAutoFill(1e12)(state)
    expect(after.intro.diskCache[FIRST_DISK_SIZE]).toBe(INTRO_STARTING_CAPACITY)
    expect(after.intro.poolBuffers[1]).toBe(0)
  })

  it('refills exactly one whole block once elapsed time covers that block\'s own bandwidth-capped duration', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), blockBits * 5), {
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      disks: { [FIRST_DISK_SIZE]: 1 },
    })
    const oneBlockSeconds = blockBits / (CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER * 1)
    const after = tickDiskAutoFill(oneBlockSeconds)(state)
    expect(after.intro.diskCache[FIRST_DISK_SIZE]).toBe(blockBits)
    expect(after.intro.poolBuffers[1]).toBe(blockBits * 4)
  })

  it('keeps an already-full read cache full and does not pour into an empty disk while that size\'s own fixed tier is at its required level', () => {
    const state = withIntro(createInitialGameState(), {
      bits: 0,
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: FIRST_DISK_SIZE },
    })
    expect(tickDiskAutoFill(1e12)(state)).toBe(state)
  })

  it('fills read cache from its pool buffer, then pours into an empty disk once its own fixed tier moves past the required level', () => {
    const state = withIntro(withPoolBuffer(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), FIRST_DISK_SIZE * 2), {
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
    })
    const afterPour = tickDiskAutoFill(1e12)(state)
    expect(afterPour.intro.disks[FIRST_DISK_SIZE]).toBe(1)
    expect(afterPour.intro.diskCache?.[FIRST_DISK_SIZE] ?? 0).toBe(0)
    expect(afterPour.intro.poolBuffers[1]).toBe(FIRST_DISK_SIZE)

    const afterRefill = tickDiskAutoFill(1e12)(afterPour)
    expect(afterRefill.intro.diskCache[FIRST_DISK_SIZE]).toBe(FIRST_DISK_SIZE)
    expect(afterRefill.intro.poolBuffers[1]).toBe(0)
  })

  it('pours a full read cache into an empty disk once its own fixed tier moves past the required level, leaving its pool buffer for the next cache refill', () => {
    const state = withIntro(withPoolBuffer(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), FIRST_DISK_SIZE), {
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: FIRST_DISK_SIZE },
    })
    const after = tickDiskAutoFill(1e12)(state)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(1)
    expect(after.intro.diskCache?.[FIRST_DISK_SIZE] ?? 0).toBe(0)
    expect(after.intro.poolBuffers[1]).toBe(FIRST_DISK_SIZE)
  })

  it('only the pool\'s smallest size ever accumulates a read cache — a second built size never does, however much its pool buffer holds', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withIntro(withPoolBuffer(withPurchaseLevel(createInitialGameState(), tensTier.id, 3), FIRST_DISK_SIZE * 2 + level2Size), {
      capacity: FIRST_DISK_SIZE * 2 + level2Size,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 2, [level2Size]: 1 },
    })
    const after = tickDiskAutoFill(1e12)(state)
    // The smallest size fills its own read cache and pours it into its empty disk as usual...
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(1)
    expect(after.intro.diskCache?.[FIRST_DISK_SIZE] ?? 0).toBe(0)
    // ...but level2Size never gets a read cache or an auto-filled disk at all — only a write-cache
    // ripple from FIRST_DISK_SIZE (a separate mechanism, see tickDiskWriteCache) can fill it.
    expect(after.intro.disks?.[level2Size] ?? 0).toBe(0)
    expect(after.intro.diskCache?.[level2Size] ?? 0).toBe(0)
    expect(after.intro.poolBuffers[1]).toBe(FIRST_DISK_SIZE + level2Size)
  })

  it('self-heals a save carrying a stale read cache for a size that is no longer read-cache-eligible, refunding it to its own pool buffer', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [level2Size]: 1 },
      // A save from before only the smallest size kept a read cache could still carry one here.
      diskCache: { [level2Size]: level2Size },
    })
    const after = tickDiskAutoFill(0)(state)
    expect(after.intro.diskCache?.[level2Size] ?? 0).toBe(0)
    expect(after.intro.poolBuffers[1]).toBe(level2Size)
  })

  it('self-heals a save carrying a stale in-flight read-cache flush for a now-ineligible size, dropping it without touching its pool buffer', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [level2Size]: 1 },
      // A save from before only the smallest size kept a read cache could still carry a full cache
      // mid-flush into an empty disk at this now-ineligible size.
      diskCache: { [level2Size]: level2Size },
      diskReadCacheFlush: { [level2Size]: { remainingSeconds: 5, totalSeconds: 10 } },
    })
    const after = tickDiskAutoFill(1)(state)
    expect(after.intro.diskReadCacheFlush?.[level2Size]).toBeUndefined()
    // The stale cache itself is still refunded to its pool buffer (same as the sibling test above)
    // — the flush entry is just the timer wrapped around it, dropped alongside.
    expect(after.intro.diskCache?.[level2Size] ?? 0).toBe(0)
    expect(after.intro.poolBuffers[1]).toBe(level2Size)
    // No disk was ever credited from this stale, now-abandoned flush.
    expect(after.intro.disks?.[level2Size] ?? 0).toBe(0)
  })

  it('does not pour read cache into an empty disk while that size\'s own fixed tier is at its required level, even with surplus Memory', () => {
    const state = withIntro(createInitialGameState(), {
      bits: 1_000_000,
      capacity: 1_000_000,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 2 },
      disks: { [FIRST_DISK_SIZE]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: FIRST_DISK_SIZE },
    })
    const after = tickDiskAutoFill(1e12)(state)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(1)
    expect(after.intro.diskCache[FIRST_DISK_SIZE]).toBe(FIRST_DISK_SIZE)
    expect(after.intro.bits).toBe(1_000_000)
  })

  it('still tops up cache when every disk of that size is already full', () => {
    // See the "sub-block remainder" test above for why this needs a buffer capacity larger than
    // storageCapacity alone would give (getPoolBufferCapacity < one block would otherwise dump the
    // whole balance instead of stopping cleanly at a whole-block boundary).
    const ampleCapacity = blockBits * MEMORY_BINARY_UNIT_STEP * 2
    const state = withIntro(withPoolBuffer(createInitialGameState(), blockBits * 2 + 100), {
      capacity: ampleCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      disks: { [FIRST_DISK_SIZE]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: 0 },
    })
    const after = tickDiskAutoFill(1e12)(state)
    expect(after.intro.diskCache[FIRST_DISK_SIZE]).toBe(blockBits * 2)
    expect(after.intro.poolBuffers[1]).toBe(100)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(1)
  })

  it('dumps a full-but-sub-block pool buffer balance into cache when its own capacity cannot hold one block', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), 500), {
      capacity: 500, // full Memory, but below one FIRST_DISK_SIZE cache block (blockBits = 1000)
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      disks: { [FIRST_DISK_SIZE]: 1 },
    })
    const after = tickDiskAutoFill(1e12)(state)
    expect(after.intro.diskCache[FIRST_DISK_SIZE]).toBe(500)
    expect(after.intro.poolBuffers[1]).toBe(0)
  })

  it('starts a timed read-cache flush instead of pouring instantly when an empty disk is ready', () => {
    const state = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), {
      bits: 0,
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: FIRST_DISK_SIZE },
    })
    const expectedSeconds = getDiskReadCacheFlushSeconds(state, FIRST_DISK_SIZE)
    // Default production rate is 1 bit/sec; a DISK filling FROM a cache runs at
    // DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER (2x) that rate.
    expect(expectedSeconds).toBe(blockBits / DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER)

    const started = tickDiskAutoFill(0)(state)
    expect(started.intro.disks?.[FIRST_DISK_SIZE] ?? 0).toBe(0)
    expect(started.intro.diskCache[FIRST_DISK_SIZE]).toBe(FIRST_DISK_SIZE)
    const flush = getDiskReadCacheFlush(started, FIRST_DISK_SIZE)
    expect(flush).toEqual({ remainingSeconds: expectedSeconds, totalSeconds: expectedSeconds })
  })

  it('paces read-cache flushes at the full Byte Foundry bandwidth for every unlocked pool', () => {
    const megabyteSize = FIRST_DISK_SIZE * 1000
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: {
        [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 10]: DISK_ARRAY_LADDER_CAP,
        [FIRST_DISK_SIZE * 100]: DISK_ARRAY_LADDER_CAP,
        [megabyteSize]: 1,
      },
    })
    const pool2FlushSeconds = getDiskReadCacheFlushSeconds(state, megabyteSize)
    const pool1FlushSeconds = getDiskReadCacheFlushSeconds(state, FIRST_DISK_SIZE)
    expect(pool2FlushSeconds).toBe(megabyteSize / DISK_CACHE_BLOCK_COUNT / DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER)
    expect(pool1FlushSeconds).toBe(FIRST_DISK_SIZE / DISK_CACHE_BLOCK_COUNT / DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER)
  })

  it('completes the read-cache flush after one cache-block production duration and fills the disk', () => {
    const state = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), {
      bits: 0,
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: FIRST_DISK_SIZE },
    })
    const flushSeconds = getDiskReadCacheFlushSeconds(state, FIRST_DISK_SIZE)
    const mid = tickDiskAutoFill(flushSeconds / 2)(state)
    expect(getDiskReadCacheFlush(mid, FIRST_DISK_SIZE).remainingSeconds).toBeCloseTo(flushSeconds / 2)
    expect(mid.intro.disks?.[FIRST_DISK_SIZE] ?? 0).toBe(0)

    const done = tickDiskAutoFill(flushSeconds / 2)(mid)
    expect(getDiskReadCacheFlush(done, FIRST_DISK_SIZE)).toBeNull()
    expect(done.intro.disks[FIRST_DISK_SIZE]).toBe(1)
    expect(done.intro.diskCache?.[FIRST_DISK_SIZE] ?? 0).toBe(0)
  })

  it('pauses an in-flight read-cache flush while that size\'s own fixed tier is at its required level', () => {
    const unlocked = withPurchaseLevel(createInitialGameState(), tensTier.id, 2)
    const state = withIntro(unlocked, {
      bits: 0,
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: FIRST_DISK_SIZE },
    })
    const flushSeconds = getDiskReadCacheFlushSeconds(state, FIRST_DISK_SIZE)
    const started = tickDiskAutoFill(0)(state)
    expect(getDiskReadCacheFlush(started, FIRST_DISK_SIZE)).toBeTruthy()

    // Drop back to level 1 — FIRST_DISK_SIZE's own fixed tier is at its required level again — flush must pause.
    const pausedState = withPurchaseLevel(started, tensTier.id, 1)
    expect(isDiskReadCacheFlushPaused(pausedState, FIRST_DISK_SIZE)).toBe(true)
    const afterPauseTick = tickDiskAutoFill(flushSeconds)(pausedState)
    expect(getDiskReadCacheFlush(afterPauseTick, FIRST_DISK_SIZE).remainingSeconds).toBe(flushSeconds)
    expect(afterPauseTick.intro.disks?.[FIRST_DISK_SIZE] ?? 0).toBe(0)
  })

  it('scales flush duration with Byte Foundry production rate (one cache block / rate)', () => {
    const fast = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), {
      bits: 0,
      capacity: storageCapacity,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: FIRST_DISK_SIZE },
      productionMultiplier: 8,
      tickSpeedSeconds: 1,
    })
    expect(getDiskReadCacheFlushSeconds(fast, FIRST_DISK_SIZE)).toBe(blockBits / 8 / DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER)
  })

  it('tickGame advances an in-flight read-cache flush by exactly one tick of elapsed time (not twice)', () => {
    const flushSeconds = 10
    const state = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), {
      bits: 0,
      capacity: storageCapacity,
      byteCreated: true,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: FIRST_DISK_SIZE },
      diskReadCacheFlush: {
        [FIRST_DISK_SIZE]: { remainingSeconds: flushSeconds, totalSeconds: flushSeconds },
      },
    })
    const elapsed = TICK_RATE_MS / 1000
    const after = tickGame(elapsed)(state)
    expect(getDiskReadCacheFlush(after, FIRST_DISK_SIZE).remainingSeconds).toBeCloseTo(
      flushSeconds - elapsed,
      9,
    )
  })
})

describe('tickDiskWriteCache', () => {
  const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE

  it('starts collecting when 10 full disks exist at the source size and the target has an empty container', () => {
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [level2Size]: 1 },
      disks: {
        [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP,
        [level2Size]: 0,
      },
    })
    const after = tickDiskWriteCache(0)(state)
    const merge = getDiskWriteCacheMerge(after, level2Size)
    expect(merge).toBeTruthy()
    expect(merge.sourceSize).toBe(FIRST_DISK_SIZE)
    expect(merge.segmentsCollected).toBe(0)
    expect(merge.flushTotalSeconds).toBeGreaterThan(0)
  })

  it('times a freshly-started merge off the current production rate — flush is a DISK filling FROM cache (2x), each collect segment is a CACHE filling FROM Disks (2x)', () => {
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [level2Size]: 1 },
      disks: {
        [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP,
        [level2Size]: 0,
      },
    })
    const after = tickDiskWriteCache(0)(state)
    const merge = getDiskWriteCacheMerge(after, level2Size)
    // Default production rate is 1 bit/sec.
    expect(merge.flushTotalSeconds).toBe(level2Size / DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER)
    expect(merge.segmentTotalSeconds).toBe(FIRST_DISK_SIZE / CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER)
    // 10 source-disk segments sum to exactly one target's own size, so — with both multipliers
    // currently equal — the two phases happen to take the same total time (see the doc comment on
    // getDiskWriteCacheSegmentSeconds in engine.js for why this is coincidental, not structural).
    expect(merge.segmentTotalSeconds * DISK_ARRAY_LADDER_CAP).toBe(merge.flushTotalSeconds)
  })

  it('scales a freshly-started merge\'s timings with Byte Foundry production rate', () => {
    const fast = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [level2Size]: 1 },
      disks: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [level2Size]: 0 },
      productionMultiplier: 8,
      tickSpeedSeconds: 1,
      // Ample headroom above sqrt(capacity) — pool 1's own Bandwidth cap — so the rate itself, not
      // that cap, is what's under test here (see getStoragePoolBandwidth).
      capacity: level2Size,
    })
    const after = tickDiskWriteCache(0)(fast)
    const merge = getDiskWriteCacheMerge(after, level2Size)
    expect(merge.flushTotalSeconds).toBe(level2Size / (8 * DISK_FILL_FROM_CACHE_BANDWIDTH_MULTIPLIER))
    expect(merge.segmentTotalSeconds).toBe(FIRST_DISK_SIZE / (8 * CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER))
  })

  it('collects one segment per timed slice and empties a source disk on each segment completion', () => {
    const state = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [level2Size]: 1 },
      disks: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP },
      diskWriteCache: {
        [level2Size]: {
          sourceSize: FIRST_DISK_SIZE,
          segmentsCollected: 0,
          segmentRemainingSeconds: 1,
          segmentTotalSeconds: 1,
          flushRemainingSeconds: 10,
          flushTotalSeconds: 10,
        },
      },
    })
    const after = tickDiskWriteCache(1)(state)
    const merge = getDiskWriteCacheMerge(after, level2Size)
    expect(merge.segmentsCollected).toBe(1)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(DISK_ARRAY_LADDER_CAP - 1)
  })

  it('pauses collect while the source size has an active tier claim but still flushes once collect finishes', () => {
    const flushTotalSeconds = 10
    const segmentTotalSeconds = flushTotalSeconds / DISK_ARRAY_LADDER_CAP
    const state = withIntro(createInitialGameState(), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [level2Size]: 1 },
      disks: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP },
      diskWriteCache: {
        [level2Size]: {
          sourceSize: FIRST_DISK_SIZE,
          segmentsCollected: 0,
          segmentRemainingSeconds: segmentTotalSeconds,
          segmentTotalSeconds,
          flushRemainingSeconds: flushTotalSeconds,
          flushTotalSeconds,
        },
      },
    })
    expect(isDiskWriteCacheCollectPaused(state, level2Size)).toBe(true)
    const paused = tickDiskWriteCache(1)(state)
    expect(getDiskWriteCacheMerge(paused, level2Size).segmentsCollected).toBe(0)
    expect(paused.intro.disks[FIRST_DISK_SIZE]).toBe(DISK_ARRAY_LADDER_CAP)

    const collecting = tickDiskWriteCache(0)(
      withPurchaseLevel(paused, tensTier.id, 2)
    )
    const mergeAfterStart = getDiskWriteCacheMerge(collecting, level2Size)
    expect(mergeAfterStart.segmentsCollected).toBe(0)
    expect(mergeAfterStart.segmentRemainingSeconds).toBeGreaterThan(0)

    const afterSegment = tickDiskWriteCache(mergeAfterStart.segmentTotalSeconds)(collecting)
    expect(getDiskWriteCacheMerge(afterSegment, level2Size).segmentsCollected).toBe(1)

    let readyToFlush = afterSegment
    for (let i = 1; i < DISK_ARRAY_LADDER_CAP; i += 1) {
      readyToFlush = tickDiskWriteCache(segmentTotalSeconds)(
        withPurchaseLevel(readyToFlush, tensTier.id, 2)
      )
    }
    expect(getDiskWriteCacheMerge(readyToFlush, level2Size).segmentsCollected).toBe(DISK_ARRAY_LADDER_CAP)

    const afterFlush = tickDiskWriteCache(flushTotalSeconds)(readyToFlush)
    expect(getDiskWriteCacheMerge(afterFlush, level2Size)).toBeNull()
    expect(afterFlush.intro.disks[level2Size]).toBe(1)
  })

  it('clears write cache on flush without overfilling when read cache already filled the target slot', () => {
    const flushTotalSeconds = 10
    const state = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 3), {
      disksBuiltTotal: { [FIRST_DISK_SIZE]: DISK_ARRAY_LADDER_CAP, [level2Size]: 1 },
      disks: { [FIRST_DISK_SIZE]: 0, [level2Size]: 1 },
      diskWriteCache: {
        [level2Size]: {
          sourceSize: FIRST_DISK_SIZE,
          segmentsCollected: DISK_ARRAY_LADDER_CAP,
          segmentRemainingSeconds: 0,
          segmentTotalSeconds: 1,
          flushRemainingSeconds: 0,
          flushTotalSeconds,
        },
      },
    })
    const afterFlush = tickDiskWriteCache(0)(state)
    expect(getDiskWriteCacheMerge(afterFlush, level2Size)).toBeNull()
    expect(afterFlush.intro.disks[level2Size]).toBe(1)
  })
})

describe('isDiskCacheBlockReleasable / releaseDiskCacheBlock', () => {
  const blockBits = FIRST_DISK_SIZE / DISK_CACHE_BLOCK_COUNT // 1000 bits per block

  it('is false below one full block', () => {
    const state = withIntro(createInitialGameState(), { diskCache: { [FIRST_DISK_SIZE]: blockBits - 1 } })
    expect(isDiskCacheBlockReleasable(state, FIRST_DISK_SIZE)).toBe(false)
  })

  it('is true once the cache holds at least one full block, with an eligible tier still matching this size and no full redeemable disk', () => {
    const state = withIntro(createInitialGameState(), { diskCache: { [FIRST_DISK_SIZE]: blockBits } })
    expect(isDiskCacheBlockReleasable(state, FIRST_DISK_SIZE)).toBe(true)
  })

  it('is false while a full redeemable disk of the same size exists — disks take priority over cache', () => {
    const state = withIntro(createInitialGameState(), {
      disks: { [FIRST_DISK_SIZE]: 1 },
      diskCache: { [FIRST_DISK_SIZE]: blockBits },
    })
    expect(isDiskCacheBlockReleasable(state, FIRST_DISK_SIZE)).toBe(false)
    expect(releaseDiskCacheBlock(FIRST_DISK_SIZE)(state)).toBe(state)
  })

  it('is false — and releaseDiskCacheBlock is a same-reference no-op — once this size\'s fixed corresponding tier is no longer at its required level', () => {
    // tier01 leveled past FIRST_DISK_SIZE's required level — same "no longer redeemable" case
    // isDiskRedeemable's own tests exercise, but for the cache's manual release instead of a full
    // disk's redeem.
    const state = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), {
      diskCache: { [FIRST_DISK_SIZE]: blockBits },
    })
    expect(isDiskCacheBlockReleasable(state, FIRST_DISK_SIZE)).toBe(false)
    expect(releaseDiskCacheBlock(FIRST_DISK_SIZE)(state)).toBe(state)
  })

  it('releases exactly one block\'s worth of bits into resources.base (Bits), leaving Memory itself untouched', () => {
    const state = withIntro(createInitialGameState(), { bits: 0, diskCache: { [FIRST_DISK_SIZE]: blockBits * 3 } })
    const after = releaseDiskCacheBlock(FIRST_DISK_SIZE)(state)
    expect(after.resources[MONEY_ID]).toBe(state.resources[MONEY_ID] + blockBits)
    expect(after.intro.bits).toBe(0)
    expect(after.intro.diskCache[FIRST_DISK_SIZE]).toBe(blockBits * 2)
  })

  it('is a same-reference no-op below one full block', () => {
    const state = withIntro(createInitialGameState(), { diskCache: { [FIRST_DISK_SIZE]: blockBits - 1 } })
    expect(releaseDiskCacheBlock(FIRST_DISK_SIZE)(state)).toBe(state)
  })
})

describe('isDiskCacheBlockAutoReleaseEligible / isDiskCacheBlockManualReleaseAvailable / tickDiskAutoReleaseCache', () => {
  const blockBits = FIRST_DISK_SIZE / DISK_CACHE_BLOCK_COUNT

  it('manual release is available when cache is releasable but the matching tier is not Smart', () => {
    const state = withAutobuyer(
      withIntro(createInitialGameState(), { diskCache: { [FIRST_DISK_SIZE]: blockBits } }),
      tensTier.id,
      1
    )
    expect(isDiskCacheBlockManualReleaseAvailable(state, FIRST_DISK_SIZE)).toBe(true)
    expect(isDiskCacheBlockAutoReleaseEligible(state, FIRST_DISK_SIZE)).toBe(false)
  })

  it('auto-release is eligible once Smart is on, autobuyer is active, and no matching disk exists', () => {
    const state = withSmartAutobuyer(
      withAutobuyer(
        withIntro(createInitialGameState(), { diskCache: { [FIRST_DISK_SIZE]: blockBits } }),
        tensTier.id,
        1
      ),
      tensTier.id
    )
    expect(isDiskCacheBlockAutoReleaseEligible(state, FIRST_DISK_SIZE)).toBe(true)
    expect(isDiskCacheBlockManualReleaseAvailable(state, FIRST_DISK_SIZE)).toBe(false)
  })

  it('auto-release is blocked while a full redeemable disk of the same size exists, even with Smart on', () => {
    const state = withSmartAutobuyer(
      withAutobuyer(
        withIntro(createInitialGameState(), {
          disks: { [FIRST_DISK_SIZE]: 1 },
          diskCache: { [FIRST_DISK_SIZE]: blockBits },
        }),
        tensTier.id,
        1
      ),
      tensTier.id
    )
    expect(isDiskCacheBlockAutoReleaseEligible(state, FIRST_DISK_SIZE)).toBe(false)
    expect(isDiskCacheBlockManualReleaseAvailable(state, FIRST_DISK_SIZE)).toBe(false)
  })

  it('tickDiskAutoReleaseCache releases one block when Smart autobuyer is active and no disk is available', () => {
    const state = withSmartAutobuyer(
      withAutobuyer(
        withIntro(createInitialGameState(), { diskCache: { [FIRST_DISK_SIZE]: blockBits * 2 } }),
        tensTier.id,
        1
      ),
      tensTier.id
    )
    const after = tickDiskAutoReleaseCache(state)
    expect(after.resources[MONEY_ID]).toBe(state.resources[MONEY_ID] + blockBits)
    expect(after.intro.diskCache[FIRST_DISK_SIZE]).toBe(blockBits)
  })

  it('tickDiskAutoReleaseCache is a no-op without Smart, leaving cache for manual release', () => {
    const state = withAutobuyer(
      withIntro(createInitialGameState(), { diskCache: { [FIRST_DISK_SIZE]: blockBits } }),
      tensTier.id,
      1
    )
    expect(tickDiskAutoReleaseCache(state)).toBe(state)
  })
})

describe('isDiskRedeemable / getDiskRedeemTierName', () => {
  it('is true only when tier01 is CURRENTLY at exactly the level this disk size fixedly corresponds to', () => {
    const state = withPurchaseLevel(createInitialGameState(), tensTier.id, 2) // now sitting at level 2
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE // disk step 2 — tier01's own level 2
    expect(isDiskRedeemable(state, level2Size)).toBe(true) // level matches exactly
    expect(isDiskRedeemable(state, FIRST_DISK_SIZE)).toBe(false) // step 1/level 1 — already past it
    expect(isDiskRedeemable(state, getTierCost(tensTier, 3) * BITS_PER_BYTE)).toBe(false) // step 3/level 3 — not there yet
    expect(getDiskRedeemTierName(state, level2Size)).toBe(tensTier.name)
    expect(getDiskRedeemTierName(state, FIRST_DISK_SIZE)).toBeNull()
  })

  it('is not redeemable once tier01\'s level jumps straight past the level a disk was fixedly sized for', () => {
    // An autobuyer burst can complete more than one level in a single tick (see tickGame's
    // autobuyer loop), skipping level 2 (this disk's own fixed corresponding level) entirely on
    // the way to level 5 — the disk stays full and held, not lost, but won't redeem again until a
    // Speed Up/Overclock/Prestige resets tier01's level back down through exactly level 2 again.
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withPurchaseLevel(createInitialGameState(), tensTier.id, 5)
    expect(isDiskRedeemable(state, level2Size)).toBe(false)
  })

  it('each tier owns its own disk-ladder range — a step-4 disk (tier02\'s own first level) never involves tier01', () => {
    const secondTier = TIER_DEFINITIONS[1]
    const secondTierSize = getTierCost(secondTier, 1) * BITS_PER_BYTE // disk step 4 — tier02's own level 1
    const state = createInitialGameState()
    expect(isDiskRedeemable(state, secondTierSize)).toBe(true)
    expect(getDiskRedeemTierName(state, secondTierSize)).toBe(secondTier.name)
  })

  it('a disk\'s tier is fixed by its own size alone — a different tier\'s level has no bearing on it', () => {
    // Disk ladder step 4 (1 MB) is tier02's (Megabytes') own first local level — purely by
    // position (getDataLakeTierIndex/getDataLakeSubSize), never by any tier's current cost. Under
    // the OLD price-coincidence design, whichever tier's price happened to match a size could shift
    // with level; under the fixed mapping, tier01's level is simply irrelevant to this size,
    // however far it's progressed.
    const secondTier = TIER_DEFINITIONS[1]
    const step4Size = getDiskLadderSizeBits(4)

    const state = withPurchaseLevel(withPurchaseLevel(createInitialGameState(), tensTier.id, 4), secondTier.id, 1)
    expect(getDiskRedeemTierName(state, step4Size)).toBe(secondTier.name)

    const withDisk = withIntro(state, { disks: { [step4Size]: 1 } })
    const after = redeemDisk(step4Size)(withDisk)
    expect(after.owned[tensTier.id]).toBe(0) // tier01 untouched — this size was never its to redeem
    expect(after.owned[secondTier.id]).toBeGreaterThan(0)
  })
})

describe('redeemDisk', () => {
  it('consumes one matching disk and completes tier01\'s current level in one shot', () => {
    const state = withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 2 } })

    const after = redeemDisk(FIRST_DISK_SIZE)(state)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(1)
    // Grants the whole level-1 block (DEFAULT_PURCHASE_BLOCK_SIZE, 8) in one redeem, not 1 unit —
    // "fills one level" is a full level completion (see redeemDisk's own doc comment).
    expect(after.owned[tensTier.id]).toBe(8)
    expect(after.purchaseLevels[tensTier.id]).toBe(2)
    expect(after.purchaseLevelProgress[tensTier.id]).toBe(0)
  })

  it('removes the denomination key entirely once its count reaches 0, rather than leaving a 0 entry', () => {
    const state = withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } })

    const after = redeemDisk(FIRST_DISK_SIZE)(state)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBeUndefined()
  })

  it('is a no-op if no disk of that size is held', () => {
    const state = createInitialGameState()
    expect(redeemDisk(FIRST_DISK_SIZE)(state)).toBe(state)
  })

  it('is a no-op while its corresponding tier isn\'t currently at this disk\'s required level', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withIntro(createInitialGameState(), { disks: { [level2Size]: 1 } })
    expect(redeemDisk(level2Size)(state)).toBe(state)
  })

  it('is a no-op for a disk sized for a level tier01 skipped straight past in one burst — it stays held, not lost', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withPurchaseLevel(
      withIntro(createInitialGameState(), { disks: { [level2Size]: 1 } }),
      tensTier.id,
      5
    )
    expect(redeemDisk(level2Size)(state)).toBe(state)
  })

  it('does not sync-fill after a manual redeem — Forced Priority can hand Memory to Bandwidth first', () => {
    const state = withIntro(createInitialGameState(), {
      bits: FIRST_DISK_SIZE,
      disksBuiltTotal: { [FIRST_DISK_SIZE]: 2 },
      disks: { [FIRST_DISK_SIZE]: 1 },
      diskCache: {},
    })
    const after = redeemDisk(FIRST_DISK_SIZE)(state)
    // Completes tier01's whole level 1 (DEFAULT_PURCHASE_BLOCK_SIZE, 8), not just 1 unit.
    expect(after.owned[tensTier.id]).toBe(8)
    // Emptied, but Memory is left intact for Bandwidth/Invest rather than pulled into cache here.
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBeUndefined()
    expect(after.intro.bits).toBe(FIRST_DISK_SIZE)
    expect(after.intro.diskCache[FIRST_DISK_SIZE] ?? 0).toBe(0)
  })

  it('bypasses isProductionFrozen, same as convertIntroBitsToKilobytes', () => {
    const state = withMoney(withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } }), PRESTIGE_THRESHOLD)
    expect(isProductionFrozen(state)).toBe(true)

    const after = redeemDisk(FIRST_DISK_SIZE)(state)
    // Completes tier01's whole level 1 (DEFAULT_PURCHASE_BLOCK_SIZE, 8), not just 1 unit.
    expect(after.owned[tensTier.id]).toBe(8)
  })

  it('is a no-op while the disk\'s own size is currently mid-build, even though it is otherwise full and redeemable', () => {
    const state = withIntro(createInitialGameState(), {
      disks: { [FIRST_DISK_SIZE]: 1 },
      diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
    })
    expect(redeemDisk(FIRST_DISK_SIZE)(state)).toBe(state)
  })
})

describe('isDiskAutoRedeemEligible / isDiskManualRedeemAvailable', () => {
  it('manual redeem is available for a full matching disk when the tier has no autobuyer', () => {
    const state = withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } })
    expect(isDiskManualRedeemAvailable(state, FIRST_DISK_SIZE)).toBe(true)
    expect(isDiskAutoRedeemEligible(state, FIRST_DISK_SIZE)).toBe(false)
  })

  it('auto-redeem is eligible once the matching tier\'s autobuyer is unlocked and enabled', () => {
    const state = withAutobuyer(
      withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } }),
      tensTier.id,
      1
    )
    expect(isDiskAutoRedeemEligible(state, FIRST_DISK_SIZE)).toBe(true)
    expect(isDiskManualRedeemAvailable(state, FIRST_DISK_SIZE)).toBe(false)
  })

  it('falls back to manual after that size has already auto-redeemed this cycle', () => {
    const state = withAutobuyer(
      withIntro(createInitialGameState(), {
        disks: { [FIRST_DISK_SIZE]: 1 },
        diskAutoRedeemedSizes: { [FIRST_DISK_SIZE]: true },
      }),
      tensTier.id,
      1
    )
    expect(isDiskAutoRedeemEligible(state, FIRST_DISK_SIZE)).toBe(false)
    expect(isDiskManualRedeemAvailable(state, FIRST_DISK_SIZE)).toBe(true)
  })
})

describe('tickDiskAutoRedeem', () => {
  it('is a no-op when the matching tier has no autobuyer purchased at all', () => {
    const state = withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } })
    expect(tickDiskAutoRedeem(state)).toBe(state)
  })

  it('is a no-op when the matching tier\'s autobuyer is purchased but paused', () => {
    const state = withAutobuyerEnabled(
      withAutobuyer(withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } }), tensTier.id, 1),
      tensTier.id,
      false
    )
    expect(tickDiskAutoRedeem(state)).toBe(state)
  })

  it('fires when the matching tier\'s autobuyer is unlocked and enabled', () => {
    const state = withAutobuyer(withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } }), tensTier.id, 1)

    const after = tickDiskAutoRedeem(state)
    // Completes tier01's whole level 1 (DEFAULT_PURCHASE_BLOCK_SIZE, 8), not just 1 unit.
    expect(after.owned[tensTier.id]).toBe(8)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBeUndefined()
    expect(after.intro.diskAutoRedeemedSizes[FIRST_DISK_SIZE]).toBe(true)
  })

  it('is a no-op while the held disk\'s corresponding tier isn\'t currently at its required level', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withAutobuyer(withIntro(createInitialGameState(), { disks: { [level2Size]: 1 } }), tensTier.id, 1)
    expect(tickDiskAutoRedeem(state)).toBe(state)
  })

  it('only the exact-match size is eligible when multiple sizes are held — a smaller, no-longer-matching disk stays untouched', () => {
    const level2Size = getTierCost(tensTier, 2) * BITS_PER_BYTE
    const state = withPurchaseLevel(
      withAutobuyer(
        withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1, [level2Size]: 1 } }),
        tensTier.id, 1
      ),
      tensTier.id,
      2
    )

    const after = tickDiskAutoRedeem(state)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(1) // tier past its required level — no longer eligible
    expect(after.intro.disks[level2Size]).toBeUndefined() // tier at its required level — redeemed
  })

  it('auto-redeems a given size at most once per real Prestige cycle, leaving a further eligible disk of that size for a manual redeem', () => {
    const state = withAutobuyer(withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 2 } }), tensTier.id, 1)

    const after = tickDiskAutoRedeem(state)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(1)
    expect(after.intro.diskAutoRedeemedSizes[FIRST_DISK_SIZE]).toBe(true)

    const secondTick = tickDiskAutoRedeem(after)
    expect(secondTick).toBe(after) // no-op — already auto-redeemed this cycle
  })

  it('is a no-op against a size currently mid-build, even with a matching active autobuyer', () => {
    const state = withAutobuyer(
      withIntro(createInitialGameState(), {
        disks: { [FIRST_DISK_SIZE]: 1 },
        diskBuild: { size: FIRST_DISK_SIZE, remainingSeconds: 1, totalSeconds: 1 },
      }),
      tensTier.id, 1
    )
    expect(tickDiskAutoRedeem(state)).toBe(state)
  })
})

describe('isComputeCoreConversionUnlocked', () => {
  it('is false below INTRO_COMPUTE_CORE_UNLOCK_CAPACITY', () => {
    const state = withIntro(createInitialGameState(), { capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY / 10 })
    expect(isComputeCoreConversionUnlocked(state)).toBe(false)
  })

  it('is true once capacity reaches INTRO_COMPUTE_CORE_UNLOCK_CAPACITY', () => {
    const state = withIntro(createInitialGameState(), { capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY })
    expect(isComputeCoreConversionUnlocked(state)).toBe(true)
  })
})

describe('Compute Boost reclaim (reclaimComputeBoost / canReclaimComputeBoost)', () => {
  it('canReclaimComputeBoost/reclaimComputeBoost are false/a same-reference no-op while no boost is active', () => {
    const state = withIntro(createInitialGameState(), { computeBoostType: null })
    expect(canReclaimComputeBoost(state)).toBe(false)
    expect(reclaimComputeBoost(state)).toBe(state)
  })

  it('reclaims the only stack: refunds 1 token of the funding tier and clears the boost fully back to inactive', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 2,
      computeBoostType: 'standard',
      computeBoostTierIndex: 1, // Core
      computeBoostStacks: 1,
      computeBoostRemainingSeconds: getComputeBoostTierDurationSeconds('standard', 1),
    })
    expect(canReclaimComputeBoost(state)).toBe(true)
    const after = reclaimComputeBoost(state)
    expect(after.intro.computeCores).toBe(3)
    expect(after.intro.computeBoostType).toBe(null)
    expect(after.intro.computeBoostTierIndex).toBe(null)
    expect(after.intro.computeBoostStacks).toBe(0)
    expect(after.intro.computeBoostRemainingSeconds).toBe(0)
  })

  it('reclaims from a higher tier\'s own field, at that tier\'s own base duration', () => {
    const state = withIntro(createInitialGameState(), {
      computeClusters: 2, // tier 3
      computeBoostType: 'burst',
      computeBoostTierIndex: 3,
      computeBoostStacks: 1,
      computeBoostRemainingSeconds: getComputeBoostTierDurationSeconds('burst', 3),
    })
    const after = reclaimComputeBoost(state)
    expect(after.intro.computeClusters).toBe(3)
    expect(after.intro.computeCores).toBe(0) // untouched — the funding tier was Clusters, not Cores
    expect(after.intro.computeBoostType).toBe(null)
  })

  it('reclaims one of several stacks: refunds 1 token, subtracts one duration\'s worth, decrements stacks, boost stays active', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 0,
      computeBoostType: 'standard',
      computeBoostTierIndex: 1,
      computeBoostStacks: 3,
      computeBoostRemainingSeconds: getComputeBoostTierDurationSeconds('standard', 1) * 3,
    })
    const after = reclaimComputeBoost(state)
    expect(after.intro.computeCores).toBe(1)
    expect(after.intro.computeBoostType).toBe('standard')
    expect(after.intro.computeBoostTierIndex).toBe(1)
    expect(after.intro.computeBoostStacks).toBe(2)
    expect(after.intro.computeBoostRemainingSeconds).toBe(getComputeBoostTierDurationSeconds('standard', 1) * 2)
  })

  it('is the exact inverse of activateComputeBoost — activate then reclaim returns to the pre-activation balance/duration', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 5 })
    const activated = activateComputeBoost('burst', 1)(state)
    const reclaimed = reclaimComputeBoost(activated)
    expect(reclaimed.intro.computeCores).toBe(5)
    expect(reclaimed.intro.computeBoostType).toBe(null)
    expect(reclaimed.intro.computeBoostTierIndex).toBe(null)
    expect(reclaimed.intro.computeBoostRemainingSeconds).toBe(0)
  })

  it('refund never exceeds COMPUTE_ENTITY_CAP even if more tokens were earned while the boost was running', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: COMPUTE_ENTITY_CAP,
      computeBoostType: 'sustain',
      computeBoostTierIndex: 1,
      computeBoostStacks: 1,
      computeBoostRemainingSeconds: getComputeBoostTierDurationSeconds('sustain', 1),
    })
    const after = reclaimComputeBoost(state)
    expect(after.intro.computeCores).toBe(COMPUTE_ENTITY_CAP)
  })

  it('remaining duration never goes negative when reclaiming after some of it has already ticked away', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 0,
      computeBoostType: 'burst',
      computeBoostTierIndex: 1,
      computeBoostStacks: 1,
      computeBoostRemainingSeconds: 1, // less than burst's own base 60s duration
    })
    const after = reclaimComputeBoost(state)
    expect(after.intro.computeBoostRemainingSeconds).toBe(0)
    expect(after.intro.computeBoostType).toBe(null)
  })
})

describe.each([
  { tick: tickAutoMergeCoresIntoNode, enable: enableAutoMergeCoresIntoNode, isUnlockAvailable: isAutoMergeCoresIntoNodeUnlockAvailable, start: startComputeCoresMerge, isStartAvailable: isComputeCoresMergeStartAvailable, inputField: 'computeCores', outputField: 'computeNodes', autoFlagField: 'autoMergeCoresIntoNode', timerField: 'computeCoresMergeRemainingSeconds', boundaryIndex: 0, label: 'coresIntoNode' },
  { tick: tickAutoMergeNodesIntoCluster, enable: enableAutoMergeNodesIntoCluster, isUnlockAvailable: isAutoMergeNodesIntoClusterUnlockAvailable, start: startComputeNodesMerge, isStartAvailable: isComputeNodesMergeStartAvailable, inputField: 'computeNodes', outputField: 'computeClusters', autoFlagField: 'autoMergeNodesIntoCluster', timerField: 'computeNodesMergeRemainingSeconds', boundaryIndex: 1, label: 'nodesIntoCluster' },
  { tick: tickAutoMergeClustersIntoNetwork, enable: enableAutoMergeClustersIntoNetwork, isUnlockAvailable: isAutoMergeClustersIntoNetworkUnlockAvailable, start: startComputeClustersMerge, isStartAvailable: isComputeClustersMergeStartAvailable, inputField: 'computeClusters', outputField: 'computeNetworks', autoFlagField: 'autoMergeClustersIntoNetwork', timerField: 'computeClustersMergeRemainingSeconds', boundaryIndex: 2, label: 'clustersIntoNetwork' },
  { tick: tickAutoMergeNetworksIntoGrid, enable: enableAutoMergeNetworksIntoGrid, isUnlockAvailable: isAutoMergeNetworksIntoGridUnlockAvailable, start: startComputeNetworksMerge, isStartAvailable: isComputeNetworksMergeStartAvailable, inputField: 'computeNetworks', outputField: 'computeGrids', autoFlagField: 'autoMergeNetworksIntoGrid', timerField: 'computeNetworksMergeRemainingSeconds', boundaryIndex: 3, label: 'networksIntoGrid' },
  { tick: tickAutoMergeGridsIntoFabric, enable: enableAutoMergeGridsIntoFabric, isUnlockAvailable: isAutoMergeGridsIntoFabricUnlockAvailable, start: startComputeGridsMerge, isStartAvailable: isComputeGridsMergeStartAvailable, inputField: 'computeGrids', outputField: 'computeFabrics', autoFlagField: 'autoMergeGridsIntoFabric', timerField: 'computeGridsMergeRemainingSeconds', boundaryIndex: 4, label: 'gridsIntoFabric' },
  { tick: tickAutoMergeFabricsIntoCloud, enable: enableAutoMergeFabricsIntoCloud, isUnlockAvailable: isAutoMergeFabricsIntoCloudUnlockAvailable, start: startComputeFabricsMerge, isStartAvailable: isComputeFabricsMergeStartAvailable, inputField: 'computeFabrics', outputField: 'computeClouds', autoFlagField: 'autoMergeFabricsIntoCloud', timerField: 'computeFabricsMergeRemainingSeconds', boundaryIndex: 5, label: 'fabricsIntoCloud' },
  { tick: tickAutoMergeCloudsIntoDatacenter, enable: enableAutoMergeCloudsIntoDatacenter, isUnlockAvailable: isAutoMergeCloudsIntoDatacenterUnlockAvailable, start: startComputeCloudsMerge, isStartAvailable: isComputeCloudsMergeStartAvailable, inputField: 'computeClouds', outputField: 'computeDatacenters', autoFlagField: 'autoMergeCloudsIntoDatacenter', timerField: 'computeCloudsMergeRemainingSeconds', boundaryIndex: 6, label: 'cloudsIntoDatacenter' },
  { tick: tickAutoMergeDatacentersIntoSupercomputer, enable: enableAutoMergeDatacentersIntoSupercomputer, isUnlockAvailable: isAutoMergeDatacentersIntoSupercomputerUnlockAvailable, start: startComputeDatacentersMerge, isStartAvailable: isComputeDatacentersMergeStartAvailable, inputField: 'computeDatacenters', outputField: 'computeSupercomputers', autoFlagField: 'autoMergeDatacentersIntoSupercomputer', timerField: 'computeDatacentersMergeRemainingSeconds', boundaryIndex: 7, label: 'datacentersIntoSupercomputer' },
  { tick: tickAutoMergeSupercomputersIntoMegacomputer, enable: enableAutoMergeSupercomputersIntoMegacomputer, isUnlockAvailable: isAutoMergeSupercomputersIntoMegacomputerUnlockAvailable, start: startComputeSupercomputersMerge, isStartAvailable: isComputeSupercomputersMergeStartAvailable, inputField: 'computeSupercomputers', outputField: 'computeMegacomputers', autoFlagField: 'autoMergeSupercomputersIntoMegacomputer', timerField: 'computeSupercomputersMergeRemainingSeconds', boundaryIndex: 8, label: 'supercomputersIntoMegacomputer' },
])('auto-merge / reserve-merge timer: $label', ({ tick, enable, isUnlockAvailable, start, isStartAvailable, inputField, outputField, autoFlagField, timerField, boundaryIndex }) => {
  const durationOf = (introOverrides = {}) =>
    getComputeMergeDurationSeconds(withIntro(createInitialGameState(), introOverrides), boundaryIndex)

  it('tick is a same-reference no-op while the auto flag is unset, even with the input entity completely full', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_ENTITY_CAP })
    expect(tick(1)(state)).toBe(state)
  })

  it('tick is a same-reference no-op once enabled but the input entity is below COMPUTE_ENTITY_CAP (the auto-trigger threshold is stricter than the manual button\'s own COMPUTE_MERGE_RATIO)', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO, [autoFlagField]: true })
    expect(tick(1)(state)).toBe(state)
  })

  it('tick auto-starts a reserve merge once enabled and the input entity is completely full — moving COMPUTE_MERGE_RATIO out of the input and starting the timer, without granting the output yet', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_ENTITY_CAP, [autoFlagField]: true })
    const after = tick(1)(state)
    expect(after.intro[inputField]).toBe(COMPUTE_ENTITY_CAP - COMPUTE_MERGE_RATIO)
    expect(after.intro[outputField]).toBe(0)
    expect(after.intro[timerField]).toBe(durationOf() - 1) // the same tick's elapsedSeconds also counts down
  })

  it('tick does not start a second reserve merge while one is already in flight, even if the input has refilled back to COMPUTE_ENTITY_CAP', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_ENTITY_CAP, [autoFlagField]: true, [timerField]: durationOf() })
    const after = tick(1)(state)
    expect(after.intro[inputField]).toBe(COMPUTE_ENTITY_CAP) // untouched — no second merge started
    expect(after.intro[timerField]).toBe(durationOf() - 1) // only the in-flight merge's own timer ticks down
  })

  it('tick completes an in-flight merge once its full duration has elapsed, granting 1 of the output and clearing the timer', () => {
    const state = withIntro(createInitialGameState(), { [autoFlagField]: true, [timerField]: 1 })
    const after = tick(1)(state)
    expect(after.intro[outputField]).toBe(1)
    expect(after.intro[timerField]).toBe(0)
  })

  it('tick caps the completed output at COMPUTE_ENTITY_CAP defensively, even if the output somehow filled up while the merge was in flight', () => {
    const state = withIntro(createInitialGameState(), { [autoFlagField]: true, [timerField]: 1, [outputField]: COMPUTE_ENTITY_CAP })
    const after = tick(1)(state)
    expect(after.intro[outputField]).toBe(COMPUTE_ENTITY_CAP)
    expect(after.intro[timerField]).toBe(0)
  })

  it('isStartAvailable requires the auto flag unlocked, no merge already in flight, at least COMPUTE_MERGE_RATIO of the input, and room under COMPUTE_ENTITY_CAP on the output', () => {
    expect(isStartAvailable(withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO, [autoFlagField]: true }))).toBe(true)
    expect(isStartAvailable(withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO }))).toBe(false) // not unlocked
    expect(isStartAvailable(withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO - 1, [autoFlagField]: true }))).toBe(false) // below threshold
    expect(isStartAvailable(withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO, [autoFlagField]: true, [timerField]: durationOf() }))).toBe(false) // already in flight
    expect(isStartAvailable(withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO, [autoFlagField]: true, [outputField]: COMPUTE_ENTITY_CAP }))).toBe(false) // output capped
  })

  it('start (manual click) is a same-reference no-op below isStartAvailable\'s own gate', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO - 1, [autoFlagField]: true })
    expect(start(state)).toBe(state)
  })

  it('start (manual click) fires at the lower COMPUTE_MERGE_RATIO (8) threshold — "the button is enabled only when there are at least 8 tokens available"', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO, [autoFlagField]: true })
    const after = start(state)
    expect(after.intro[inputField]).toBe(0)
    expect(after.intro[timerField]).toBe(durationOf())
    expect(after.intro[outputField]).toBe(0)
  })

  it('isUnlockAvailable requires COMPUTE_ENTITY_CAP of the OUTPUT entity held and not already enabled', () => {
    const notEnough = withIntro(createInitialGameState(), { [outputField]: COMPUTE_ENTITY_CAP - 1 })
    expect(isUnlockAvailable(notEnough)).toBe(false)
    const enough = withIntro(createInitialGameState(), { [outputField]: COMPUTE_ENTITY_CAP })
    expect(isUnlockAvailable(enough)).toBe(true)
    const alreadyEnabled = withIntro(createInitialGameState(), { [outputField]: COMPUTE_ENTITY_CAP, [autoFlagField]: true })
    expect(isUnlockAvailable(alreadyEnabled)).toBe(false)
  })

  it('enable is a same-reference no-op below isUnlockAvailable\'s own gate', () => {
    const state = withIntro(createInitialGameState(), { [outputField]: COMPUTE_ENTITY_CAP - 1 })
    expect(enable(state)).toBe(state)
  })

  it('enable sacrifices ALL 10 held units of the output entity and permanently flips the auto flag', () => {
    const state = withIntro(createInitialGameState(), { [outputField]: COMPUTE_ENTITY_CAP })
    const after = enable(state)
    expect(after.intro[outputField]).toBe(0)
    expect(after.intro[autoFlagField]).toBe(true)
  })

  it('the auto flag is permanent — carried over unchanged by a real Prestige', () => {
    const state = withMoney(withIntro(createInitialGameState(), { [autoFlagField]: true }), PRESTIGE_THRESHOLD)
    expect(prestigeGame(state).intro[autoFlagField]).toBe(true)
  })

  it('an in-flight merge timer is permanent — carried over unchanged by a real Prestige rather than being cancelled', () => {
    const state = withMoney(withIntro(createInitialGameState(), { [autoFlagField]: true, [timerField]: durationOf() - 5 }), PRESTIGE_THRESHOLD)
    expect(prestigeGame(state).intro[timerField]).toBe(durationOf() - 5)
  })

  it('is wired into tickGame — a real tick auto-starts a reserve merge once enabled and the input is full', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_ENTITY_CAP, [autoFlagField]: true, byteCreated: true })
    const after = tickGame(1)(state)
    expect(after.intro[inputField]).toBe(COMPUTE_ENTITY_CAP - COMPUTE_MERGE_RATIO)
    expect(after.intro[timerField]).toBeGreaterThan(0)
  })

  it('is wired into tickGame — a real tick completes an in-flight merge once its duration fully elapses', () => {
    const state = withIntro(createInitialGameState(), { [autoFlagField]: true, [timerField]: durationOf(), byteCreated: true })
    const after = tickGame(durationOf())(state)
    expect(after.intro[outputField]).toBe(1)
    expect(after.intro[timerField]).toBe(0)
  })
})

describe('compute merge duration from live Core earn ×10 / upgraded ×5 (issues #377/#380)', () => {
  it('Core→Node is COMPUTE_MERGE_CORE_EARN_MULTIPLIER × getCoreEarnTimeSeconds; each next step is ×10', () => {
    const state = createInitialGameState()
    const coreEarn = getCoreEarnTimeSeconds(state)
    expect(coreEarn).toBe(INTRO_STARTING_CAPACITY) // capacity 8, rate 1
    expect(getComputeMergeDurationSeconds(state, 0)).toBe(coreEarn * COMPUTE_MERGE_CORE_EARN_MULTIPLIER)
    for (let i = 1; i < COMPUTE_MERGE_DURATION_UPGRADE_COUNT; i += 1) {
      expect(getComputeMergeDurationSeconds(state, i)).toBe(
        getComputeMergeDurationSeconds(state, i - 1) * COMPUTE_MERGE_STEP_MULTIPLIER,
      )
    }
  })

  it('scales with capacity and Invest rate (no hardcoded second table)', () => {
    const slow = withIntro(createInitialGameState(), { capacity: 8000, productionMultiplier: 1, tickSpeedSeconds: 1 })
    const fast = withIntro(createInitialGameState(), { capacity: 8000, productionMultiplier: 2, tickSpeedSeconds: 1 })
    expect(getComputeMergeDurationSeconds(slow, 0)).toBe(8000 * COMPUTE_MERGE_CORE_EARN_MULTIPLIER)
    expect(getComputeMergeDurationSeconds(fast, 0)).toBe(getComputeMergeDurationSeconds(slow, 0) / 2)
  })

  it('upgrading Core→Node makes it ×5 of Core earn and cascades later layers', () => {
    const locked = withIntro(createInitialGameState(), {
      autoMergeCoresIntoNode: true,
      computeCores: COMPUTE_ENTITY_CAP,
    })
    expect(isUpgradeComputeMergeDurationAvailable(locked)).toBe(true)
    expect(getNextComputeMergeDurationUpgradeIndex(locked)).toBe(0)
    const after = upgradeComputeMergeDuration(locked)
    expect(after.intro.computeCores).toBe(0)
    expect(after.intro.computeMergeDurationUpgrades).toBe(1)
    const coreEarn = getCoreEarnTimeSeconds(after)
    expect(getComputeMergeDurationSeconds(after, 0)).toBe(coreEarn * COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED)
    expect(getComputeMergeDurationSeconds(after, 1)).toBe(
      getComputeMergeDurationSeconds(after, 0) * COMPUTE_MERGE_STEP_MULTIPLIER,
    )
  })

  it('a second upgrade makes Node→Cluster ×5 of Core→Node', () => {
    const state = withIntro(createInitialGameState(), {
      computeMergeDurationUpgrades: 1,
      autoMergeNodesIntoCluster: true,
      computeNodes: COMPUTE_ENTITY_CAP,
    })
    const after = upgradeComputeMergeDuration(state)
    expect(after.intro.computeMergeDurationUpgrades).toBe(2)
    expect(getComputeMergeDurationSeconds(after, 1)).toBe(
      getComputeMergeDurationSeconds(after, 0) * COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED,
    )
  })

  it('upgrade is a same-reference no-op without auto-merge unlocked or enough input held', () => {
    const noAuto = withIntro(createInitialGameState(), { computeCores: COMPUTE_ENTITY_CAP })
    expect(upgradeComputeMergeDuration(noAuto)).toBe(noAuto)
    const tooFew = withIntro(createInitialGameState(), {
      autoMergeCoresIntoNode: true,
      computeCores: COMPUTE_ENTITY_CAP - 1,
    })
    expect(upgradeComputeMergeDuration(tooFew)).toBe(tooFew)
  })

  it('the upgrade count is permanent across Prestige', () => {
    const state = withMoney(withIntro(createInitialGameState(), {
      computeMergeDurationUpgrades: 3,
      autoMergeCoresIntoNode: true,
    }), PRESTIGE_THRESHOLD)
    expect(prestigeGame(state).intro.computeMergeDurationUpgrades).toBe(3)
  })

  it('a newly started Core→Node merge snapshots the live upgraded duration', () => {
    const state = withIntro(createInitialGameState(), {
      computeMergeDurationUpgrades: 1,
      autoMergeCoresIntoNode: true,
      computeCores: COMPUTE_MERGE_RATIO,
    })
    const after = startComputeCoresMerge(state)
    expect(after.intro.computeCoresMergeRemainingSeconds).toBe(getComputeMergeDurationSeconds(state, 0))
  })
})

describe('buyComputeAutoBoost / tickAutoComputeBoost (30 PP unlock)', () => {
  it(`spends ${30} PP to unlock auto-Boost permanently`, () => {
    const state = withPrestigePoints(createInitialGameState(), COMPUTE_AUTO_BOOST_UNLOCK_COST)
    const after = buyComputeAutoBoost(state)
    expect(after.computeAutoBoostUnlocked).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('is a same-reference no-op below cost or when already unlocked', () => {
    const tooFew = withPrestigePoints(createInitialGameState(), COMPUTE_AUTO_BOOST_UNLOCK_COST - 1)
    expect(buyComputeAutoBoost(tooFew)).toBe(tooFew)
    const unlocked = { ...createInitialGameState(), computeAutoBoostUnlocked: true, prestige: { ...createInitialGameState().prestige, points: 100 } }
    expect(buyComputeAutoBoost(unlocked)).toBe(unlocked)
  })

  it('survives Prestige once unlocked; preference defaults to standard', () => {
    const state = withMoney({
      ...withIntro(createInitialGameState(), { computeAutoBoostType: 'burst' }),
      computeAutoBoostUnlocked: true,
    }, PRESTIGE_THRESHOLD)
    const after = prestigeGame(state)
    expect(after.computeAutoBoostUnlocked).toBe(true)
    expect(after.intro.computeAutoBoostType).toBe('burst')
  })

  it('tickAutoComputeBoost is a no-op until unlocked', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: COMPUTE_ENTITY_CAP,
      computeCoresMergeRemainingSeconds: 10,
      autoMergeCoresIntoNode: true,
    })
    expect(isAnyComputeMergeInFlight(state)).toBe(true)
    expect(tickAutoComputeBoost(state)).toBe(state)
  })

  it('once unlocked, activates the preferred preset from the biggest tier waiting on its own merge', () => {
    const state = {
      ...withIntro(createInitialGameState(), {
        computeCores: COMPUTE_ENTITY_CAP,
        computeNodes: COMPUTE_ENTITY_CAP,
        computeCoresMergeRemainingSeconds: 10,
        computeNodesMergeRemainingSeconds: 10,
        autoMergeCoresIntoNode: true,
        autoMergeNodesIntoCluster: true,
        computeAutoBoostType: 'standard',
        productionMilestoneTierClaims: 2, // avoid Bandwidth priority blocking
      }),
      computeAutoBoostUnlocked: true,
    }
    expect(getBiggestComputeTierWaitingOnMerge(state)).toBe(2) // Nodes > Cores
    const after = tickAutoComputeBoost(state)
    expect(after.intro.computeBoostType).toBe('standard')
    expect(after.intro.computeBoostTierIndex).toBe(2)
    expect(after.intro.computeNodes).toBe(COMPUTE_ENTITY_CAP - 1)
    expect(after.intro.computeCores).toBe(COMPUTE_ENTITY_CAP) // untouched — not the biggest waiting
  })

  it('stacks the active boost when its funding tier is the biggest waiting on merge', () => {
    const state = {
      ...withIntro(createInitialGameState(), {
        computeCores: COMPUTE_ENTITY_CAP,
        computeCoresMergeRemainingSeconds: 10,
        computeBoostType: 'standard',
        computeBoostTierIndex: 1,
        computeBoostStacks: 1,
        computeBoostRemainingSeconds: 100,
        productionMilestoneTierClaims: 2,
      }),
      computeAutoBoostUnlocked: true,
    }
    const after = tickAutoComputeBoost(state)
    expect(after.intro.computeBoostStacks).toBe(2)
    expect(after.intro.computeCores).toBe(COMPUTE_ENTITY_CAP - 1)
  })

  it('does not stack a boost funded by a smaller tier when a bigger tier is waiting on merge', () => {
    const state = {
      ...withIntro(createInitialGameState(), {
        computeCores: COMPUTE_ENTITY_CAP,
        computeNodes: COMPUTE_ENTITY_CAP,
        computeCoresMergeRemainingSeconds: 10,
        computeNodesMergeRemainingSeconds: 10,
        computeBoostType: 'standard',
        computeBoostTierIndex: 1, // funded by Cores, but Nodes are the biggest waiting
        computeBoostStacks: 1,
        computeBoostRemainingSeconds: 100,
        productionMilestoneTierClaims: 2,
      }),
      computeAutoBoostUnlocked: true,
    }
    expect(tickAutoComputeBoost(state)).toBe(state)
  })

  it('ignores a full tier whose own merge is not in flight', () => {
    const state = {
      ...withIntro(createInitialGameState(), {
        computeCores: COMPUTE_ENTITY_CAP,
        computeNodes: COMPUTE_ENTITY_CAP,
        computeCoresMergeRemainingSeconds: 10, // only Cores are waiting
        computeAutoBoostType: 'burst',
        productionMilestoneTierClaims: 2,
      }),
      computeAutoBoostUnlocked: true,
    }
    expect(getBiggestComputeTierWaitingOnMerge(state)).toBe(1)
    const after = tickAutoComputeBoost(state)
    expect(after.intro.computeBoostTierIndex).toBe(1)
    expect(after.intro.computeNodes).toBe(COMPUTE_ENTITY_CAP)
  })

  it('setComputeAutoBoostType updates the preference; unknown keys are a no-op', () => {
    const state = createInitialGameState()
    expect(state.intro.computeAutoBoostType).toBe('standard')
    const after = setComputeAutoBoostType('burst')(state)
    expect(after.intro.computeAutoBoostType).toBe('burst')
    expect(setComputeAutoBoostType('nope')(after)).toBe(after)
  })
})

describe.each([
  { merge: mergeComputeCoresIntoNode, inputField: 'computeCores', outputField: 'computeNodes', autoFlagField: 'autoMergeCoresIntoNode', label: 'mergeComputeCoresIntoNode' },
  { merge: mergeComputeNodesIntoCluster, inputField: 'computeNodes', outputField: 'computeClusters', autoFlagField: 'autoMergeNodesIntoCluster', label: 'mergeComputeNodesIntoCluster' },
  { merge: mergeComputeClustersIntoNetwork, inputField: 'computeClusters', outputField: 'computeNetworks', autoFlagField: 'autoMergeClustersIntoNetwork', label: 'mergeComputeClustersIntoNetwork' },
  { merge: mergeComputeNetworksIntoGrid, inputField: 'computeNetworks', outputField: 'computeGrids', autoFlagField: 'autoMergeNetworksIntoGrid', label: 'mergeComputeNetworksIntoGrid' },
  { merge: mergeComputeGridsIntoFabric, inputField: 'computeGrids', outputField: 'computeFabrics', autoFlagField: 'autoMergeGridsIntoFabric', label: 'mergeComputeGridsIntoFabric' },
  { merge: mergeComputeFabricsIntoCloud, inputField: 'computeFabrics', outputField: 'computeClouds', autoFlagField: 'autoMergeFabricsIntoCloud', label: 'mergeComputeFabricsIntoCloud' },
  { merge: mergeComputeCloudsIntoDatacenter, inputField: 'computeClouds', outputField: 'computeDatacenters', autoFlagField: 'autoMergeCloudsIntoDatacenter', label: 'mergeComputeCloudsIntoDatacenter' },
  { merge: mergeComputeDatacentersIntoSupercomputer, inputField: 'computeDatacenters', outputField: 'computeSupercomputers', autoFlagField: 'autoMergeDatacentersIntoSupercomputer', label: 'mergeComputeDatacentersIntoSupercomputer' },
  { merge: mergeComputeSupercomputersIntoMegacomputer, inputField: 'computeSupercomputers', outputField: 'computeMegacomputers', autoFlagField: 'autoMergeSupercomputersIntoMegacomputer', label: 'mergeComputeSupercomputersIntoMegacomputer' },
])('$label', ({ merge, inputField, outputField, autoFlagField }) => {
  it('is a same-reference no-op once the auto flag has ever been unlocked — merging fully transitions to the timed reserve system (issue #321)', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO, [autoFlagField]: true })
    expect(merge(state)).toBe(state)
  })

  it('is a same-reference no-op below COMPUTE_MERGE_RATIO of the input entity', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO - 1 })
    expect(merge(state)).toBe(state)
  })

  it('converts every complete group of COMPUTE_MERGE_RATIO into 1 of the output entity, banking the remainder', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO * 2 + 3 })
    const after = merge(state)
    expect(after.intro[outputField]).toBe(2)
    expect(after.intro[inputField]).toBe(3)
  })

  it('accumulates onto any already-permanent output balance rather than overwriting it', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO, [outputField]: 7 })
    const after = merge(state)
    expect(after.intro[outputField]).toBe(8)
  })

  it('is a same-reference no-op once the output is already at COMPUTE_ENTITY_CAP, even with enough input to merge', () => {
    const state = withIntro(createInitialGameState(), {
      [inputField]: COMPUTE_MERGE_RATIO * 3,
      [outputField]: COMPUTE_ENTITY_CAP,
    })
    expect(merge(state)).toBe(state)
  })

  it('caps the gain at the remaining room under COMPUTE_ENTITY_CAP, leaving surplus input unconverted rather than overflowing the output past the cap', () => {
    const state = withIntro(createInitialGameState(), {
      [inputField]: COMPUTE_MERGE_RATIO * 3, // enough for 3 more of the output
      [outputField]: COMPUTE_ENTITY_CAP - 1, // only room for 1 more
    })
    const after = merge(state)
    expect(after.intro[outputField]).toBe(COMPUTE_ENTITY_CAP)
    expect(after.intro[inputField]).toBe(COMPUTE_MERGE_RATIO * 2) // only 1 group spent
  })

  it('is never fired automatically by tickGame — only ever by an explicit player action', () => {
    const state = withIntro(createInitialGameState(), { [inputField]: COMPUTE_MERGE_RATIO * 2, byteCreated: true })
    const after = tickGame(1)(state)
    expect(after.intro[outputField]).toBe(0)
    expect(after.intro[inputField]).toBe(COMPUTE_MERGE_RATIO * 2)
  })

  it('is permanent — carried over unchanged by a real Prestige', () => {
    const state = withMoney(
      withIntro(createInitialGameState(), { [outputField]: 4 }),
      PRESTIGE_THRESHOLD
    )
    const after = prestigeGame(state)
    expect(after.intro[outputField]).toBe(4)
  })
})

describe('tickGame Compute Core/Node integration', () => {
  it('carries computeCores/computeCoresEverEarned/computeNodes through a real Prestige unchanged, same permanence as the Byte generator/Storage', () => {
    const state = withMoney(
      withIntro(createInitialGameState(), {
        computeCores: 5, computeCoresEverEarned: 13, computeNodes: 2, byteCreated: true, capacity: 800,
      }),
      PRESTIGE_THRESHOLD
    )
    const after = prestigeGame(state)
    expect(after.intro.computeCores).toBe(5)
    expect(after.intro.computeCoresEverEarned).toBe(13)
    expect(after.intro.computeNodes).toBe(2)
    // Memory itself still resets fresh, unlike the permanent Compute counters above.
    expect(after.intro.bits).toBe(0)
  })

  it('carries every merge-chain entity (Clusters through Megacomputers) through a real Prestige unchanged', () => {
    const state = withMoney(
      withIntro(createInitialGameState(), {
        computeClusters: 3, computeNetworks: 2, computeGrids: 1, computeFabrics: 4,
        computeClouds: 1, computeDatacenters: 1, computeSupercomputers: 1, computeMegacomputers: 1,
        computeMergePageUnlocked: true, byteCreated: true, capacity: 800,
      }),
      PRESTIGE_THRESHOLD
    )
    const after = prestigeGame(state)
    expect(after.intro.computeClusters).toBe(3)
    expect(after.intro.computeNetworks).toBe(2)
    expect(after.intro.computeGrids).toBe(1)
    expect(after.intro.computeFabrics).toBe(4)
    expect(after.intro.computeClouds).toBe(1)
    expect(after.intro.computeDatacenters).toBe(1)
    expect(after.intro.computeSupercomputers).toBe(1)
    expect(after.intro.computeMegacomputers).toBe(1)
    expect(after.intro.computeMergePageUnlocked).toBe(true)
  })
})

describe('getComputeBoostTierMultiplier / getComputeBoostTierDurationSeconds', () => {
  it('tier 1 (Core) returns each preset\'s own base multiplier/duration unscaled', () => {
    expect(getComputeBoostTierMultiplier('burst', 1)).toBe(COMPUTE_BOOST_PRESETS.burst.multiplier)
    expect(getComputeBoostTierDurationSeconds('burst', 1)).toBe(COMPUTE_BOOST_PRESETS.burst.durationSeconds)
  })

  it('scales the multiplier by COMPUTE_BOOST_TIER_POWER_STEP and duration by COMPUTE_BOOST_TIER_DURATION_STEP per tier', () => {
    // Tier 5 (Grid): 4^4 power, 2^4 duration vs tier 1.
    expect(getComputeBoostTierMultiplier('burst', 5)).toBe(COMPUTE_BOOST_PRESETS.burst.multiplier * COMPUTE_BOOST_TIER_POWER_STEP ** 4)
    expect(getComputeBoostTierDurationSeconds('burst', 5)).toBe(COMPUTE_BOOST_PRESETS.burst.durationSeconds * COMPUTE_BOOST_TIER_DURATION_STEP ** 4)
  })

  it('tier 3 (Cluster) is 4^2 power and 2^2 duration vs base', () => {
    expect(getComputeBoostTierMultiplier('standard', 3)).toBe(COMPUTE_BOOST_PRESETS.standard.multiplier * (COMPUTE_BOOST_TIER_POWER_STEP ** 2))
    expect(getComputeBoostTierDurationSeconds('standard', 3)).toBe(COMPUTE_BOOST_PRESETS.standard.durationSeconds * (COMPUTE_BOOST_TIER_DURATION_STEP ** 2))
  })

  it('returns 0 for an invalid boostType or an out-of-range tierIndex', () => {
    expect(getComputeBoostTierMultiplier('does_not_exist', 1)).toBe(0)
    expect(getComputeBoostTierMultiplier('burst', 0)).toBe(0)
    expect(getComputeBoostTierMultiplier('burst', 11)).toBe(0)
    expect(getComputeBoostTierDurationSeconds('burst', 0)).toBe(0)
  })
})

describe('getComputeBoostMultiplier', () => {
  it('is 1 (no bonus) when no boost is active', () => {
    expect(getComputeBoostMultiplier(createInitialGameState().intro)).toBe(1)
    expect(getComputeBoostMultiplier({ computeBoostType: null })).toBe(1)
  })

  it('returns the active preset\'s own tier-scaled multiplier', () => {
    expect(getComputeBoostMultiplier({ computeBoostType: 'burst', computeBoostTierIndex: 1 })).toBe(COMPUTE_BOOST_PRESETS.burst.multiplier)
    expect(getComputeBoostMultiplier({ computeBoostType: 'standard', computeBoostTierIndex: 1 })).toBe(COMPUTE_BOOST_PRESETS.standard.multiplier)
    expect(getComputeBoostMultiplier({ computeBoostType: 'sustain', computeBoostTierIndex: 1 })).toBe(COMPUTE_BOOST_PRESETS.sustain.multiplier)
    expect(getComputeBoostMultiplier({ computeBoostType: 'burst', computeBoostTierIndex: 3 })).toBe(getComputeBoostTierMultiplier('burst', 3))
  })
})

describe('canActivateComputeBoost', () => {
  it('is false below 1 token of the selected tier', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 0 })
    expect(canActivateComputeBoost(state, 'burst', 1)).toBe(false)
  })

  it('is true with at least 1 token of the selected tier and no boost currently active', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 1 })
    expect(canActivateComputeBoost(state, 'burst', 1)).toBe(true)
  })

  it('is true funded from a higher tier (e.g. Clusters, tier 3), checking that tier\'s own field', () => {
    const state = withIntro(createInitialGameState(), { computeClusters: 1 })
    expect(canActivateComputeBoost(state, 'burst', 3)).toBe(true)
    expect(canActivateComputeBoost(state, 'burst', 2)).toBe(false) // Nodes (tier 2) not held
  })

  it('is false for the same type+tier while a boost is already active (use Stack); different type/tier needs forfeitConfirmed', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 5, computeNodes: 5, computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: 1 })
    expect(canActivateComputeBoost(state, 'burst', 1)).toBe(false) // same type/tier — use Stack
    expect(canActivateComputeBoost(state, 'standard', 1)).toBe(false) // different type, no forfeit confirm
    expect(canActivateComputeBoost(state, 'burst', 2)).toBe(false) // different tier, no forfeit confirm
    expect(canActivateComputeBoost(state, 'standard', 1, true)).toBe(true) // forfeit-confirmed replace
    expect(canActivateComputeBoost(state, 'burst', 2, true)).toBe(true)
    expect(canActivateComputeBoost(state, 'burst', 1, true)).toBe(false) // same type+tier still blocked
  })

  it('is false for an unrecognized preset name', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 1 })
    expect(canActivateComputeBoost(state, 'does_not_exist', 1)).toBe(false)
  })

  it('is false for an out-of-range tierIndex', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 1 })
    expect(canActivateComputeBoost(state, 'burst', 0)).toBe(false)
    expect(canActivateComputeBoost(state, 'burst', 11)).toBe(false)
  })
})

describe('activateComputeBoost', () => {
  it('spends exactly 1 token of the selected tier, regardless of preset', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 5 })
    const after = activateComputeBoost('sustain', 1)(state)
    expect(after.intro.computeCores).toBe(4)
  })

  it('starts a fresh boost at the tier-scaled multiplier and base duration, recording the funding tier', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 1 })
    const after = activateComputeBoost('standard', 1)(state)
    expect(after.intro.computeBoostType).toBe('standard')
    expect(after.intro.computeBoostTierIndex).toBe(1)
    expect(after.intro.computeBoostStacks).toBe(1)
    expect(after.intro.computeBoostRemainingSeconds).toBe(COMPUTE_BOOST_PRESETS.standard.durationSeconds)
  })

  it('funded from a higher tier, spends that tier\'s own field and scales up the multiplier (duration stays base)', () => {
    const state = withIntro(createInitialGameState(), { computeClusters: 1 })
    const after = activateComputeBoost('burst', 3)(state)
    expect(after.intro.computeClusters).toBe(0)
    expect(after.intro.computeBoostTierIndex).toBe(3)
    expect(after.intro.computeBoostRemainingSeconds).toBe(getComputeBoostTierDurationSeconds('burst', 3))
    expect(getComputeBoostMultiplier(after.intro)).toBe(getComputeBoostTierMultiplier('burst', 3))
  })

  it('is a same-reference no-op below 1 token of the selected tier', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 0 })
    expect(activateComputeBoost('burst', 1)(state)).toBe(state)
  })

  it('is a same-reference no-op while the same type+tier boost is already active (see stackComputeBoost instead)', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 5, computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: 1 })
    expect(activateComputeBoost('burst', 1)(state)).toBe(state)
  })

  it('is a same-reference no-op when replacing a different boost without forfeitConfirmed', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 5, computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: 1, computeBoostRemainingSeconds: 30 })
    expect(activateComputeBoost('standard', 1)(state)).toBe(state)
  })

  it('with forfeitConfirmed, replaces a different active boost with no refund of the forfeited stacks', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 5,
      computeBoostType: 'burst',
      computeBoostTierIndex: 1,
      computeBoostStacks: 2,
      computeBoostRemainingSeconds: 90,
    })
    const after = activateComputeBoost('standard', 1, true)(state)
    expect(after.intro.computeBoostType).toBe('standard')
    expect(after.intro.computeBoostStacks).toBe(1)
    expect(after.intro.computeBoostRemainingSeconds).toBe(COMPUTE_BOOST_PRESETS.standard.durationSeconds)
    expect(after.intro.computeCores).toBe(4) // spent 1 for the new boost; no refund of the 2 burst stacks
  })

  it('forfeitComputeBoost clears the active boost with no token refund', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 3,
      computeBoostType: 'burst',
      computeBoostTierIndex: 1,
      computeBoostStacks: 2,
      computeBoostRemainingSeconds: 40,
    })
    expect(canForfeitComputeBoost(state)).toBe(true)
    const after = forfeitComputeBoost(state)
    expect(after.intro.computeBoostType).toBe(null)
    expect(after.intro.computeBoostStacks).toBe(0)
    expect(after.intro.computeBoostRemainingSeconds).toBe(0)
    expect(after.intro.computeCores).toBe(3)
  })

  it('forfeitComputeBoost is a same-reference no-op while no boost is active', () => {
    const state = createInitialGameState()
    expect(forfeitComputeBoost(state)).toBe(state)
  })

  it('is a same-reference no-op while Bandwidth (higher priority) is currently available', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 1, bits: INTRO_STARTING_CAPACITY })
    expect(activateComputeBoost('burst', 1)(state)).toBe(state)
  })

  it('is a same-reference no-op while Provision Disk (higher priority) is currently available', () => {
    const state = withIntro(withPoolBuffer(createInitialGameState(), getDiskCost(FIRST_DISK_SIZE)), {
      computeCores: 1, productionMilestoneTierClaims: 2,
    })
    expect(activateComputeBoost('burst', 1)(state)).toBe(state)
  })

  it('is a same-reference no-op while a Disk Fill (higher priority) is currently available', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 1, productionMilestoneTierClaims: 2, disks: { [FIRST_DISK_SIZE]: 1 },
    })
    expect(activateComputeBoost('burst', 1)(state)).toBe(state)
  })
})

describe('canStackComputeBoost / stackComputeBoost', () => {
  it('canStackComputeBoost is false while no boost is active', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 5 })
    expect(canStackComputeBoost(state)).toBe(false)
  })

  it('canStackComputeBoost is true with a boost active and at least 1 more token of its OWN funding tier held', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 1, computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: 1 })
    expect(canStackComputeBoost(state)).toBe(true)
  })

  it('canStackComputeBoost is false below COMPUTE_BOOST_MAX_STACKS-worth already stacked', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 1, computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: COMPUTE_BOOST_MAX_STACKS,
    })
    expect(canStackComputeBoost(state)).toBe(false)
  })

  it('canStackComputeBoost is false with no more tokens of the ACTIVE tier held, even if a DIFFERENT tier has plenty', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 0, computeNodes: 5, computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: 1,
    })
    expect(canStackComputeBoost(state)).toBe(false)
  })

  it('stackComputeBoost spends 1 more of the active tier, increments stacks, and adds that tier\'s own duration — never compounding the multiplier', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 2, computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: 1, computeBoostRemainingSeconds: 3,
    })
    const after = stackComputeBoost(state)
    expect(after.intro.computeCores).toBe(1)
    expect(after.intro.computeBoostStacks).toBe(2)
    expect(after.intro.computeBoostRemainingSeconds).toBe(3 + COMPUTE_BOOST_PRESETS.burst.durationSeconds)
    expect(getComputeBoostMultiplier(after.intro)).toBe(COMPUTE_BOOST_PRESETS.burst.multiplier)
  })

  it('stackComputeBoost always extends the ACTIVE tier, regardless of any other tier a player might hold', () => {
    const state = withIntro(createInitialGameState(), {
      computeClusters: 1, computeCores: 99, computeBoostType: 'burst', computeBoostTierIndex: 3, computeBoostStacks: 1,
    })
    const after = stackComputeBoost(state)
    expect(after.intro.computeClusters).toBe(0)
    expect(after.intro.computeCores).toBe(99) // untouched — the active boost was funded by Clusters, not Cores
  })

  it('stackComputeBoost is a same-reference no-op below canStackComputeBoost\'s own gate', () => {
    const state = withIntro(createInitialGameState(), { computeCores: 5 })
    expect(stackComputeBoost(state)).toBe(state)
  })

  it('stackComputeBoost is a same-reference no-op while Bandwidth (higher priority) is currently available', () => {
    const state = withIntro(createInitialGameState(), {
      computeCores: 1, bits: INTRO_STARTING_CAPACITY, computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: 1,
    })
    expect(stackComputeBoost(state)).toBe(state)
  })
})

describe('tickComputeBoost', () => {
  it('is a same-reference no-op while no boost is active', () => {
    const state = withIntro(createInitialGameState(), { computeBoostType: null })
    expect(tickComputeBoost(1)(state)).toBe(state)
  })

  it('counts remaining duration down by elapsedSeconds', () => {
    const state = withIntro(createInitialGameState(), { computeBoostType: 'burst', computeBoostStacks: 1, computeBoostRemainingSeconds: 10 })
    const after = tickComputeBoost(3)(state)
    expect(after.intro.computeBoostRemainingSeconds).toBe(7)
    expect(after.intro.computeBoostType).toBe('burst')
  })

  it('clears back to inactive once remaining duration reaches 0', () => {
    const state = withIntro(createInitialGameState(), { computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: 2, computeBoostRemainingSeconds: 1 })
    const after = tickComputeBoost(1)(state)
    expect(after.intro.computeBoostType).toBeNull()
    expect(after.intro.computeBoostTierIndex).toBeNull()
    expect(after.intro.computeBoostStacks).toBe(0)
    expect(after.intro.computeBoostRemainingSeconds).toBe(0)
  })

  it('clears back to inactive when elapsedSeconds overshoots the remaining duration', () => {
    const state = withIntro(createInitialGameState(), { computeBoostType: 'burst', computeBoostStacks: 1, computeBoostRemainingSeconds: 1 })
    const after = tickComputeBoost(5)(state)
    expect(after.intro.computeBoostType).toBeNull()
  })
})

describe('tickGame Compute Boost integration', () => {
  it('multiplies Memory\'s own passive production while a boost is active', () => {
    const state = withIntro(createInitialGameState(), {
      // Capacity stays well under INTRO_DISK_UNLOCK_CAPACITY (80,000) — Storage/pool buffers
      // aren't revealed yet, so tickPoolBufferFill can't siphon any of this tick's production
      // away from intro.bits before the assertion below reads it.
      byteCreated: true, capacity: 1_000,
      computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: 1, computeBoostRemainingSeconds: 10,
    })
    const after = tickGame(1)(state)
    // Base rate is 1 bit/sec at the starting values; burst (tier 1 / Core) multiplies it ×32.
    expect(after.intro.bits).toBe(COMPUTE_BOOST_PRESETS.burst.multiplier)
  })

  it('multiplies tier01\'s own production while a boost is active, leaving every other tier unaffected', () => {
    const secondTier = TIER_DEFINITIONS[1]
    const state = withOwned(
      withOwned(
        withIntro(createInitialGameState(), { computeBoostType: 'standard', computeBoostTierIndex: 1, computeBoostStacks: 1, computeBoostRemainingSeconds: 60 }),
        tensTier.id, 1
      ),
      secondTier.id, 1
    )
    // tier01's own baseTickSpeedSeconds is 1s, so a 1-second tick completes exactly one full period.
    const after = tickGame(1)(state)
    // tier01 produces 1 unit/period at the starting values; standard multiplies it ×8, and each
    // Byte is mirrored into Bits at BITS_PER_BYTE on top of the 1-money starting balance.
    expect(after.resources[BYTES_ID]).toBe(COMPUTE_BOOST_PRESETS.standard.multiplier)
    expect(after.resources[MONEY_ID]).toBe(1 + COMPUTE_BOOST_PRESETS.standard.multiplier * BITS_PER_BYTE)
    // The second tier (produces tier01 itself) is NOT boosted — its own production this tick (if
    // any) is unmultiplied, so tier01's owned count only ever reflects tier02's own unboosted rate,
    // confirming the boost credit above landed solely via tier01's resource production, not owned.
    expect(after.owned[tensTier.id]).toBe(1)
  })

  it('counts the boost down as part of a regular tick, alongside everything else', () => {
    const state = withIntro(createInitialGameState(), { computeBoostType: 'sustain', computeBoostStacks: 1, computeBoostRemainingSeconds: 5 })
    const after = tickGame(1)(state)
    expect(after.intro.computeBoostRemainingSeconds).toBe(4)
  })

  it('carries the boost through a real Prestige as run-scoped state — resets, unlike computeCores/computeNodes', () => {
    const state = withMoney(
      withIntro(createInitialGameState(), {
        computeCores: 5, computeNodes: 2,
        computeBoostType: 'burst', computeBoostTierIndex: 1, computeBoostStacks: 3, computeBoostRemainingSeconds: 7,
      }),
      PRESTIGE_THRESHOLD
    )
    const after = prestigeGame(state)
    expect(after.intro.computeCores).toBe(5) // permanent, carried over
    expect(after.intro.computeNodes).toBe(2) // permanent, carried over
    expect(after.intro.computeBoostType).toBeNull() // run-scoped, reset
    expect(after.intro.computeBoostTierIndex).toBeNull()
    expect(after.intro.computeBoostStacks).toBe(0)
    expect(after.intro.computeBoostRemainingSeconds).toBe(0)
  })

  it('carries the boost through Speed Up/Overclock untouched — an intra-cycle soft reset, not a new cycle', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withIntro(
      withPurchaseLevel(createInitialGameState(), lastTier.id, getSpeedUpRequirement(0)),
      { computeBoostType: 'sustain', computeBoostTierIndex: 2, computeBoostStacks: 4, computeBoostRemainingSeconds: 200 }
    )
    const after = speedUpGame(state)
    expect(after.intro.computeBoostType).toBe('sustain')
    expect(after.intro.computeBoostTierIndex).toBe(2)
    expect(after.intro.computeBoostStacks).toBe(4)
    expect(after.intro.computeBoostRemainingSeconds).toBe(200)
  })
})

describe('tickGame Disk auto-redeem integration', () => {
  it('auto-redeems a matching disk as part of a regular tick', () => {
    const state = withAutobuyer(withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } }), tensTier.id, 1)

    const after = tickGame(1)(state)
    expect(after.owned[tensTier.id]).toBeGreaterThanOrEqual(1)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBeUndefined()
  })

  it('refills that size\'s disk from read cache ASAP after auto-redeem when tier no longer blocks ladder use', () => {
    const state = withAutobuyer(
      withIntro(createInitialGameState(), {
        bits: FIRST_DISK_SIZE * 2,
        disksBuiltTotal: { [FIRST_DISK_SIZE]: 1 },
        disks: { [FIRST_DISK_SIZE]: 1 },
        diskCache: { [FIRST_DISK_SIZE]: FIRST_DISK_SIZE },
      }),
      tensTier.id,
      1
    )
    const afterRedeem = tickDiskAutoRedeem(state)
    expect(afterRedeem).not.toBe(state)
    // Completes tier01's whole level 1 (DEFAULT_PURCHASE_BLOCK_SIZE, 8), not just 1 unit.
    expect(afterRedeem.owned[tensTier.id]).toBe(8)
    expect(afterRedeem.intro.diskAutoRedeemedSizes[FIRST_DISK_SIZE]).toBe(true)
    expect(afterRedeem.intro.disks[FIRST_DISK_SIZE]).toBeUndefined()

    const afterFill = tickDiskAutoFill(1e12)(withPurchaseLevel(afterRedeem, tensTier.id, 2))
    expect(afterFill.intro.disks[FIRST_DISK_SIZE]).toBe(1)
    expect(afterFill.intro.diskCache?.[FIRST_DISK_SIZE] ?? 0).toBe(0)
    expect(afterFill.intro.bits).toBe(FIRST_DISK_SIZE * 2)
  })

  // Regression: tickDiskAutoRedeem used to only run after tickGame's normal (non-frozen) path, so
  // it was silently unreachable once isProductionFrozen — unlike redeemDisk itself, which
  // deliberately bypasses the freeze (see redeemDisk's own tests above).
  it('auto-redeems a matching disk even while production is frozen, with no Auto-Prestige bought', () => {
    const state = withMoney(
      withAutobuyer(withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } }), tensTier.id, 1),
      PRESTIGE_THRESHOLD
    )
    expect(isProductionFrozen(state)).toBe(true)

    const after = tickGame(1)(state)
    // Completes tier01's whole level 1 (DEFAULT_PURCHASE_BLOCK_SIZE, 8), not just 1 unit.
    expect(after.owned[tensTier.id]).toBe(8)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBeUndefined()
  })

  it('auto-redeems a matching disk even while frozen with Auto-Prestige accumulating (attempt budget not yet full)', () => {
    const state = withMoney(
      withPrestigePoints(
        withAutobuyer(withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } }), tensTier.id, 1),
        0
      ),
      PRESTIGE_THRESHOLD
    )
    const frozenState = { ...state, autoPrestige: 1 }
    expect(isProductionFrozen(frozenState)).toBe(true)

    const after = tickGame(0.001)(frozenState) // tiny elapsed time — attempt budget stays well below 1
    // Completes tier01's whole level 1 (DEFAULT_PURCHASE_BLOCK_SIZE, 8), not just 1 unit.
    expect(after.owned[tensTier.id]).toBe(8)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBeUndefined()
    expect(after.resources[MONEY_ID]).toBe(PRESTIGE_THRESHOLD) // still frozen — no Prestige fired yet
  })

  it('auto-redeems against the fresh post-Prestige tier01 level when Auto-Prestige fires the same tick', () => {
    const state = withMoney(
      withAutobuyer(withIntro(createInitialGameState(), { disks: { [FIRST_DISK_SIZE]: 1 } }), tensTier.id, 1),
      PRESTIGE_THRESHOLD
    )
    const frozenState = { ...state, autoPrestige: 1, autoPrestigeAttemptBudget: 1 } // budget already full
    expect(isProductionFrozen(frozenState)).toBe(true)

    const after = tickGame(1)(frozenState)
    expect(after.resources[MONEY_ID]).toBeLessThan(PRESTIGE_THRESHOLD) // Prestige fired, resources reset
    // tier01 resets to level 1 (cost 1000) on Prestige — the level-1-sized disk is still redeemable,
    // completing that whole level (DEFAULT_PURCHASE_BLOCK_SIZE, 8), not just 1 unit.
    expect(after.owned[tensTier.id]).toBe(8)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBeUndefined()
  })
})

describe('prestigeGame keeps Storage permanent', () => {
  it('carries disks/disksBuiltTotal/diskCache/diskBuild through a real Prestige unchanged, like the Byte generator itself', () => {
    const state = withMoney(
      withIntro(createInitialGameState(), {
        disks: { [FIRST_DISK_SIZE]: 3 },
        disksBuiltTotal: { [FIRST_DISK_SIZE]: 5 },
        diskCache: { [FIRST_DISK_SIZE]: 250 },
        diskBuild: { size: FIRST_DISK_SIZE * 10, remainingSeconds: 4, totalSeconds: 10 },
      }),
      PRESTIGE_THRESHOLD
    )

    const after = prestigeGame(state)
    expect(after.intro.disks[FIRST_DISK_SIZE]).toBe(3)
    expect(after.intro.disksBuiltTotal[FIRST_DISK_SIZE]).toBe(5)
    expect(after.intro.diskCache[FIRST_DISK_SIZE]).toBe(250)
    expect(after.intro.diskBuild).toEqual({ size: FIRST_DISK_SIZE * 10, remainingSeconds: 4, totalSeconds: 10 })
  })

  it('resets diskAutoRedeemedSizes fresh every real Prestige, unlike the permanent Storage fields above', () => {
    const state = withMoney(
      withIntro(createInitialGameState(), { diskAutoRedeemedSizes: { [FIRST_DISK_SIZE]: true } }),
      PRESTIGE_THRESHOLD
    )

    const after = prestigeGame(state)
    expect(after.intro.diskAutoRedeemedSizes).toEqual({})
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

// ─── formatBytes ───────────────────────────────────────────────────────────

describe('formatBytes', () => {
  it('formats a comma-grouped amount with a B suffix, just below the exponential threshold', () => {
    expect(formatBytes(500)).toBe('500 B')
    expect(formatBytes(999999)).toBe('999,999 B')
  })

  it('switches to exponential notation at the threshold, like formatCurrency', () => {
    expect(formatBytes(1000000)).toBe('1e6 B')
  })

  it('treats negative values as 0', () => {
    expect(formatBytes(-5)).toBe('0 B')
  })

  it('floors fractional amounts instead of rounding', () => {
    expect(formatBytes(1.9)).toBe('1 B')
  })
})

// ─── formatMoneyBalance ──────────────────────────────────────────────────────
// MainPage's own MoneyHero balance readout only — every other formatCurrency call (costs,
// production rates, the Prestige overlay) is unaffected by this and stays in raw Bits.

describe('formatMoneyBalance', () => {
  it('is identical to formatCurrency below the 8000-bit (1000-Byte) threshold', () => {
    expect(formatMoneyBalance(0)).toBe(formatCurrency(0))
    expect(formatMoneyBalance(500)).toBe(formatCurrency(500))
    expect(formatMoneyBalance(7999)).toBe(formatCurrency(7999))
  })

  it('switches to whole Bytes (floored, ÷ BITS_PER_BYTE) with a B suffix at/above the threshold', () => {
    expect(formatMoneyBalance(8000)).toBe('1,000 B')
    expect(formatMoneyBalance(8000)).not.toContain(' b')
  })

  it('floors rather than rounds when converting to Bytes, so it never overstates the balance', () => {
    expect(formatMoneyBalance(8007)).toBe('1,000 B') // 1000.875 Bytes floors to 1000
    expect(formatMoneyBalance(8008)).toBe('1,001 B')
  })

  it('reuses formatCurrency\'s own exponential-notation threshold once converted to Bytes', () => {
    expect(formatMoneyBalance(999_999 * BITS_PER_BYTE)).toBe('999,999 B') // 999,999 Bytes — still plain
    expect(formatMoneyBalance(1_000_000 * BITS_PER_BYTE)).toBe('1e6 B') // 1,000,000 Bytes — switches to scientific
  })

  it('renders huge balances in scientific notation, matching formatCurrency\'s own behavior', () => {
    expect(formatMoneyBalance(8e21)).toBe('1e21 B')
  })

  it('treats negative values as 0', () => {
    expect(formatMoneyBalance(-5)).toBe('0 b')
  })
})

// ─── getCostEpochExponent ────────────────────────────────────────────────────

describe('getCostEpochExponent', () => {
  it('follows the 1, 2, 3, 5, 8, 13 Fibonacci progression across epochs 0-5', () => {
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

  it('costs baseCost * 10^2 at level 3', () => {
    expect(getTierCost(tier, 3)).toBe(1000)
  })

  it('costs baseCost * 10^4 at level 4', () => {
    expect(getTierCost(tier, 4)).toBe(1e5)
  })

  it('costs baseCost * 10^7 at level 5', () => {
    expect(getTierCost(tier, 5)).toBe(1e8)
  })

  it('scales a larger baseCost by the same epoch-exponent multiplier, not a compounded power', () => {
    const thousands = { baseCost: 1e3 }
    expect(getTierCost(thousands, 1)).toBe(1e3)
    expect(getTierCost(thousands, 2)).toBe(1e4)
    expect(getTierCost(thousands, 3)).toBe(1e5)
    expect(getTierCost(thousands, 4)).toBe(1e7)
    expect(getTierCost(thousands, 5)).toBe(1e10)
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

  it('treats Object.prototype member names as unrecognized tier ids', () => {
    for (const id of ['toString', 'constructor', '__proto__', 'valueOf']) {
      const state = createInitialGameState()
      expect(getTickspeedMultiplierCost(id, 2)).toBe(10 ** 10)
      expect(getAutobuyerUnlockCost(id)).toBe(1)
      expect(buyTier(id)(state)).toBe(state)
      expect(buyTierQuantity(id, 5)(state)).toBe(state)
      expect(buyTickspeedMultiplier(id)(state)).toBe(state)
      expect(buyComputeFlopsTier(id)(state)).toBe(state)
      expect(canBuyComputeFlopsTier(state, id)).toBe(false)
    }
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

  it('multiplies the REGULAR step by getOverclockMultiplier(overclockCount) once overclockCount > 0', () => {
    // overclockCount 5 -> getOverclockMultiplier(5) = 1.1^5 = 1.61051, so the regular step becomes
    // 0.01 * 1.61051 = 0.0161051 (1.61051%) instead of the flat 1%.
    const boostedRegularStep = 0.01 * 1.1 ** 5
    expect(getGlobalTickspeedProductionMultiplier(9, 5)).toBeCloseTo((1 + boostedRegularStep) ** 9)
  })

  it('multiplies the MILESTONE step by the same Overclock factor, not just the regular step', () => {
    const overclockFactor = 1.1 ** 5
    const boostedRegularStep = 0.01 * overclockFactor
    const boostedMilestoneStep = 0.10 * overclockFactor
    // Level 10 = 9 regular levels (boosted) + 1 milestone level (also boosted).
    expect(getGlobalTickspeedProductionMultiplier(10, 5))
      .toBeCloseTo((1 + boostedRegularStep) ** 9 * (1 + boostedMilestoneStep))
  })

  it('is still 1 (no bonus) at level 0 regardless of overclockCount', () => {
    expect(getGlobalTickspeedProductionMultiplier(0, 5)).toBe(1)
    expect(getGlobalTickspeedProductionMultiplier(null, 5)).toBe(1)
  })
})

describe('getOverclockMultiplier', () => {
  it('is 1 (no bonus) with no Overclock levels claimed', () => {
    expect(getOverclockMultiplier(0)).toBe(1)
  })

  it('compounds ×1.1 (1 + OVERCLOCK_MULTIPLIER_STEP) per claimed level', () => {
    expect(getOverclockMultiplier(1)).toBeCloseTo(1.1)
    expect(getOverclockMultiplier(2)).toBeCloseTo(1.1 ** 2)
    expect(getOverclockMultiplier(10)).toBeCloseTo(1.1 ** 10)
  })

  it('treats a negative count as 0', () => {
    expect(getOverclockMultiplier(-1)).toBe(1)
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
  it('awards exactly 1 point at exactly PRESTIGE_THRESHOLD', () => {
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD)).toBe(1)
  })

  it('stays at 1 point until a full 64 excess money-exponent powers are reached', () => {
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD * 10)).toBe(1)
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD * 1e9)).toBe(1)
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD * 1e63)).toBe(1)
  })

  it('awards 2 points once 64 excess powers beyond Googol are reached', () => {
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD * 1e64)).toBe(2)
  })

  it('awards 4 points at 192 excess powers (three full 64-power blocks beyond base)', () => {
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD * 1e192)).toBe(4)
  })

  it('halves powers-per-PP with each Double PP upgrade through level 6', () => {
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD * 1e64, 1)).toBe(3)
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD * 1e32, 1)).toBe(2)
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD * 1e64, 6)).toBe(65)
  })

  it('doubles PP-per-power after level 6 instead of halving further', () => {
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD, 7)).toBe(2)
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD * 1e64, 7)).toBe(130)
  })

  it('returns 0 below PRESTIGE_THRESHOLD, including at GOOGOL alone', () => {
    expect(getPrestigePointsAwarded(0)).toBe(0)
    expect(getPrestigePointsAwarded(GOOGOL)).toBe(0)
    expect(getPrestigePointsAwarded(PRESTIGE_THRESHOLD / 10)).toBe(0)
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
  it('is level 6 (displayed level 5) for the first activation (speedUpCount 0)', () => {
    expect(getSpeedUpRequirement(0)).toBe(6)
  })

  it('increases by one level per prior activation', () => {
    expect(getSpeedUpRequirement(1)).toBe(7)
    expect(getSpeedUpRequirement(2)).toBe(8)
    expect(getSpeedUpRequirement(3)).toBe(9)
  })

  it('treats a negative count as 0', () => {
    expect(getSpeedUpRequirement(-1)).toBe(6)
  })
})

describe('getOverclockRequirement', () => {
  it('is level 2 for the first claim (overclockCount 0) — not level 1, which a fresh, untouched last tier already sits at', () => {
    expect(getOverclockRequirement(0)).toBe(2)
  })

  it('increases by one more than the last claimed level, same +1-per-cycle shape as getSpeedUpRequirement', () => {
    expect(getOverclockRequirement(1)).toBe(3)
    expect(getOverclockRequirement(2)).toBe(4)
    expect(getOverclockRequirement(3)).toBe(5)
  })

  it('treats a negative count as 0', () => {
    expect(getOverclockRequirement(-1)).toBe(2)
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

  it('is false at/above PRESTIGE_THRESHOLD once unbounded Prestige is unlocked (100+ prestiges)', () => {
    const state = withPrestigeCount(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD * 2), 100)
    expect(isProductionFrozen(state)).toBe(false)
    expect(isUnboundedPrestigeUnlocked(state)).toBe(true)
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

  it('keeps tier 1 locked when tier 0 has only fully purchased one level (level 2)', () => {
    const state = withPurchaseLevel(createInitialGameState(), TIER_DEFINITIONS[0].id, 2)
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[1])).toBe(false)
  })

  it('unlocks tier 1 when tier 0 has fully purchased two levels (level 3)', () => {
    const state = withPurchaseLevel(createInitialGameState(), TIER_DEFINITIONS[0].id, 3)
    expect(isTierUnlocked(state)(TIER_DEFINITIONS[1])).toBe(true)
  })

  it('unlocks tier 2 only after tier 1 has fully purchased two levels (level 3)', () => {
    const lockedState = withPurchaseLevel(createInitialGameState(), TIER_DEFINITIONS[1].id, 2)
    const unlockedState = withPurchaseLevel(createInitialGameState(), TIER_DEFINITIONS[1].id, 3)
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

// ─── getNextBytePowerProgressFraction ─────────────────────────────────────────
// MainPage's 8-segment bar under MoneyHero — progress toward the next 10^n Bytes, in Bits.

describe('getNextBytePowerProgressFraction', () => {
  it('is 0 for empty / non-positive balances', () => {
    expect(getNextBytePowerProgressFraction(0)).toBe(0)
    expect(getNextBytePowerProgressFraction(-10)).toBe(0)
  })

  it('matches the 5e7 Bytes → 4/8 (0.5) example toward 1e8 Bytes', () => {
    // 5e7 Bytes = 4e8 Bits; next power is 1e8 Bytes = 8e8 Bits → 4e8/8e8 = 0.5
    expect(getNextBytePowerProgressFraction(5e7 * BITS_PER_BYTE)).toBe(0.5)
  })

  it('progresses within a Bytes order of magnitude toward the next power of ten', () => {
    // 2e6 Bytes → next 1e7 → 0.2
    expect(getNextBytePowerProgressFraction(2e6 * BITS_PER_BYTE)).toBeCloseTo(0.2)
    // Exactly 1e6 Bytes → next 1e7 → 0.1
    expect(getNextBytePowerProgressFraction(1e6 * BITS_PER_BYTE)).toBeCloseTo(0.1)
  })

  it('treats sub-Byte balances as progress toward 1 Byte', () => {
    // 4 Bits = 0.5 Bytes → next power 10^0 = 1 Byte → 0.5
    expect(getNextBytePowerProgressFraction(4)).toBe(0.5)
  })

  it('never exceeds 1', () => {
    expect(getNextBytePowerProgressFraction(PRESTIGE_THRESHOLD)).toBeLessThanOrEqual(1)
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
    // Megabytes' own base tickspeed is 2s (tier index 1 → tierIndex + 1), so the same global
    // multiplier shrinks it from a different starting point than Kilobytes' 1s.
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

  it('falls back to baseline (level 1, no global multiplier) when tickspeedLevels/globalTickspeedMultiplier are missing from state entirely', () => {
    expect(getEffectiveTierTickSpeedSeconds({ owned: {} }, tensTier.id)).toBe(1)
  })

  it('falls back to 0 already-consumed XP for the last tier when lastTierXpConsumed is missing from state entirely', () => {
    const lastTierId = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id
    const baseTickSpeed = getTierBaseTickSpeedSeconds(lastTierId)
    const state = { owned: { [lastTierId]: 1000 } }
    expect(getEffectiveTierTickSpeedSeconds(state, lastTierId)).toBeCloseTo(baseTickSpeed)
  })

  it('boosts the global tickspeed multiplier\'s own regular step once claimed, when a level is already bought', () => {
    // 5 claimed Overclock levels multiply the regular 1% step by getOverclockMultiplier(5) = 1.1^5,
    // folded directly into the global tickspeed multiplier itself — not a separate factor.
    const state = withOverclockCount(withGlobalTickspeedMultiplier(createInitialGameState(), 9), 5)
    const boostedRegularStep = 0.01 * 1.1 ** 5
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBeCloseTo(1 / (1 + boostedRegularStep) ** 9)
  })

  it('has no effect at all while the global tickspeed multiplier is still at level 0/not yet bought', () => {
    // Overclock only boosts the per-level step of an existing global tickspeed level — with 0
    // levels bought, there's nothing for that boosted step to compound over, so the effective
    // tickspeed is unaffected regardless of overclockCount.
    const state = withOverclockCount(createInitialGameState(), 5)
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBe(1)
  })

  it('stacks the boosted global tickspeed step multiplicatively with the per-tier tickspeed multiplier', () => {
    const state = withOverclockCount(
      withGlobalTickspeedMultiplier(
        withTickspeedLevel(createInitialGameState(), tensTier.id, 2),
        9
      ),
      5
    )
    const boostedRegularStep = 0.01 * 1.1 ** 5
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id))
      .toBeCloseTo(1 / (1.1 * (1 + boostedRegularStep) ** 9))
  })

  it('falls back to 0 Overclock levels (no bonus) when overclockCount is missing from state entirely', () => {
    const state = omit(withGlobalTickspeedMultiplier(createInitialGameState(), 9), 'overclockCount')
    expect(getEffectiveTierTickSpeedSeconds(state, tensTier.id)).toBeCloseTo(1 / (1.01 ** 9))
  })
})

// ─── getTierProductionProgressPercent ───────────────────────────────────────

describe('getTierProductionProgressPercent', () => {
  it('is 0% on a fresh state', () => {
    expect(getTierProductionProgressPercent(createInitialGameState(), thousandsTier.id)).toBe(0)
  })

  it('reflects a partial fraction of a tier\'s tickspeed', () => {
    // Megabytes' base tickspeed is 2s — half a second's worth of elapsed time banks a quarter
    // of it.
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
    // Megabytes' base tickspeed is 2s: a single 2-second tick crosses the threshold and delivers
    // a batch, banking 0s of remainder.
    expect(getTierProductionProgressPercent(afterTwoSeconds, thousandsTier.id)).toBe(0)
  })

  it('is 100% for a 1s-tickspeed tier with a full period already banked', () => {
    expect(getTierProductionProgressPercent(
      { tierProductionAccumulators: { [tensTier.id]: 1 } },
      tensTier.id
    )).toBe(100)
  })

  it('reports 100% instead of the wrapped remainder when the previous accumulator just crossed the threshold', () => {
    // Kilobytes' tickspeed is 1s: a previous accumulator of 1 plus the default 1 elapsed second
    // crosses 1s, so a delivery just happened even though the freshly-wrapped remainder is 0.
    const state = { tierProductionAccumulators: { [tensTier.id]: 0 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 1)).toBe(100)
  })

  it('falls through to the normal calculation when the previous accumulator has not yet crossed the threshold', () => {
    // previousAccumulator (0.4) + elapsedSeconds (0.1) = 0.5, below Kilobytes' 1s tickspeed
    // threshold, so this falls through to the normal accumulated/tickSpeed calculation using the
    // raw stored accumulator (0.5) instead of reporting 100.
    const state = { tierProductionAccumulators: { [tensTier.id]: 0.5 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0.4, 0.1)).toBe(50)
  })

  it('reports a 1s-tickspeed tier as 100% once the previous accumulator plus the default elapsed second reaches the threshold', () => {
    const state = { tierProductionAccumulators: { [tensTier.id]: 0 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 1)).toBe(100)
  })

  it('measures against the shrunk effective tickspeed once a tier has a tickspeed multiplier level', () => {
    // Level 2 → ×1.1 effective speed (see getEffectiveTierTickSpeedSeconds), so the period shrinks
    // from 1s to 1/1.1s — half of that banked is 50% of the way there, not 45.45% of the raw 1s.
    const state = withTickspeedLevel(
      { tierProductionAccumulators: { [tensTier.id]: (1 / 1.1) / 2 } },
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
    // Kilobytes' tickspeed is 1s: a previous accumulator of 0.95 plus a 0.1 elapsed tick crosses 1s.
    const state = { tierProductionAccumulators: { [tensTier.id]: 0.05 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0.95, 0.1)).toBe(100)
  })

  it('does not report 100% early when a fractional elapsedSeconds has not yet crossed the threshold', () => {
    const state = { tierProductionAccumulators: { [tensTier.id]: 0.85 } }
    expect(getTierProductionProgressPercent(state, tensTier.id, 0.75, 0.1)).toBe(85)
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
      withPurchaseLevel(withOwned(createInitialGameState(), tensTier.id, 16), tensTier.id, 3),
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
    // Completing tensTier's 2nd level (owned 15 → 16, purchaseLevels 2 → 3) unlocks thousandsTier —
    // confirm the permanent flag is set the same instant, not just the live two-full-levels condition.
    const state = withMoney(
      withPurchaseLevelProgress(
        withPurchaseLevel(withOwned(createInitialGameState(), tensTier.id, 15), tensTier.id, 2),
        tensTier.id,
        7
      ),
      getTierCost(tensTier, 2, 8)
    )
    expect(state.everUnlockedTierIds[thousandsTier.id]).toBe(false)
    const after = buyTier(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(16)
    expect(after.purchaseLevels[tensTier.id]).toBe(3)
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
      resources: { [MONEY_ID]: getTierCost(tensTier, 2) },
      owned: { [tensTier.id]: 15 },
      purchased: {},
      purchaseLevels: { [tensTier.id]: 2 },
      purchaseLevelProgress: { [tensTier.id]: 7 },
    }
    const after = buyTier(tensTier.id)(state)
    expect(after.owned[tensTier.id]).toBe(16)
    expect(after.purchaseLevels[tensTier.id]).toBe(3)
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
  it('produces Bytes from Kilobytes generators over a full 1s tick', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 5)
    const after = tickGame(1)(state)
    // 5 generators × 1 full 1s tick = +5 Bytes
    expect(after.resources[BYTES_ID]).toBe(
      state.resources[BYTES_ID] + 5
    )
    expect(after.owned[BYTES_ID]).toBeUndefined()
  })

  it('mirrors Kilobyte Byte production into Bits so MoneyHero / Prestige keep moving', () => {
    // Regression: #430 redirected tier01 onto BYTES_ID; without a Bits mirror, MoneyHero
    // (resources.base) and Prestige stayed frozen despite Factory production.
    const state = withOwned(createInitialGameState(), tensTier.id, 5)
    const after = tickGame(1)(state)
    expect(after.resources[BYTES_ID]).toBe(state.resources[BYTES_ID] + 5)
    expect(after.resources[MONEY_ID]).toBe(state.resources[MONEY_ID] + 5 * BITS_PER_BYTE)
    expect(formatMoneyBalance(after.resources[MONEY_ID])).not.toBe(
      formatMoneyBalance(state.resources[MONEY_ID]),
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

  it('does not freeze production at PRESTIGE_THRESHOLD when unbounded Prestige is unlocked', () => {
    const state = withPrestigeCount(withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id, 5), 100)
    const after = tickGame(1)(state)
    expect(after).not.toBe(state)
    expect(after.resources[MONEY_ID]).toBeGreaterThanOrEqual(PRESTIGE_THRESHOLD)
  })

  it('automatically prestiges in unbounded mode when Auto-Prestige budget crosses 1 at PRESTIGE_THRESHOLD', () => {
    const state = withPrestigeCount(
      withAutoPrestigeBudget(
        withAutoPrestige(withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), tensTier.id, 5)),
        1,
      ),
      100,
    )
    const after = tickGame(0)(state)
    expect(after.prestige.count).toBe(101)
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
      withBytes(withAutoGlobalTickspeed(withOwned(createInitialGameState(), thousandsTier.id, 1)), 10),
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
      withAutoSpeedUp(withPurchaseLevel(createInitialGameState(), lastTier.id, 6)),
      'autoSpeedUpEnabled'
    )
    const after = tickGame(1)(state)
    expect(after.speedUpCount).toBe(1)
  })

  it('applies no Speed Up production bonus (falls back to 0) when speedUpCount is missing from state entirely', () => {
    const state = omit(withOwned(createInitialGameState(), tensTier.id, 1), 'speedUpCount')
    const after = tickGame(2)(state)
    expect(after.resources[BYTES_ID]).toBeGreaterThan(state.resources[BYTES_ID])
  })

  it('scales production with elapsed time', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 1)
    const after = tickGame(3)(state) // 3 full 1s ticks
    expect(after.resources[BYTES_ID]).toBe(state.resources[BYTES_ID] + 3)
  })

  it('still delivers a 1s-tickspeed tier\'s production on the 10th tick despite fractional elapsedSeconds floating-point drift', () => {
    // Summing 0.1 ten times lands on 0.9999999999999999 in IEEE-754, not exactly 1 — matching a
    // live tick loop accumulating fractional elapsedSeconds. Without the epsilon tolerance in
    // tickGame's ticksElapsed calculation, this would delay delivery to an 11th tick instead of
    // firing on the 10th, as it does at a coarser (e.g. 1-tick-per-second) granularity.
    let state = withOwned(createInitialGameState(), tensTier.id, 1)
    for (let i = 0; i < 10; i++) state = tickGame(0.1)(state)
    expect(state.resources[BYTES_ID]).toBe(1) // 1 tick's worth of Byte production
  })

  it('does not apply the Prestige Points production-speed bonus until it has been unlocked', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 1)
    const boosted = withPrestigePoints(base, 100) // +100% → ×2, but not yet unlocked
    expect(tickGame(1)(boosted).resources[BYTES_ID]).toBe(base.resources[BYTES_ID] + 1)
  })

  it('applies the Prestige Points production-speed bonus once unlocked', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 1)
    const boosted = withPrestigeSpeedBonusUnlocked(withPrestigePoints(base, 100)) // +100% → ×2
    expect(tickGame(1)(boosted).resources[BYTES_ID]).toBe(
      base.resources[BYTES_ID] + 2
    )
  })

  it('floors a fractional Prestige Points production multiplier instead of crediting a fraction', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 1)
    // +50% → ×1.5, raw production 1 × 1.5 = 1.5
    const boosted = withPrestigeSpeedBonusUnlocked(withPrestigePoints(base, 50))
    const after = tickGame(1)(boosted)
    expect(after.resources[BYTES_ID]).toBe(base.resources[BYTES_ID] + 1) // floor(1.5) = 1
  })

  it('multiplies production by the Speed Up multiplier', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 5)
    const sped = withSpeedUpCount(base, 2) // ×4
    const after = tickGame(1)(sped)
    expect(after.resources[BYTES_ID]).toBe(base.resources[BYTES_ID] + 20) // 5 × 4
  })

  it('stacks the Speed Up multiplier with the Prestige Point speed bonus', () => {
    const base = withOwned(createInitialGameState(), tensTier.id, 10)
    // ×2 (Speed Up) × ×2 (+100% PP bonus) = ×4
    const state = withSpeedUpCount(
      withPrestigeSpeedBonusUnlocked(withPrestigePoints(base, 100)), 1
    )
    const after = tickGame(1)(state)
    expect(after.resources[BYTES_ID]).toBe(base.resources[BYTES_ID] + 40) // 10 × 4
  })

  it('Megabytes generators produce Kilobytes resource and owned generators once its 2s base tickspeed accumulates, banking fractional sub-second ticks along the way', () => {
    let state = withOwned(
      withOwned(createInitialGameState(), tensTier.id, 10),
      thousandsTier.id, 2
    )
    // Megabytes' base tickspeed is 2s — nineteen 0.1s ticks (the live game's real 10Hz cadence)
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
      withOwned(createInitialGameState(), thousandsTier.id, 10), // unlocks Gigabytes
      millionsTier.id, 5
    )
    // Gigabytes' base tickspeed is 3s — the first 29 sub-second ticks only accumulate toward that
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
      ...createInitialGameState(),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 95 },
      prestige: { xp: 0, points: 0, count: 0, highestMilestone: 1 },
    }
    const after = tickGame(0)({
      ...state,
      resources: { ...state.resources, [MONEY_ID]: 1000 },
    })
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
    // 1000 - 1000 (cost) = 0, and tensTier's own 1s tickspeed exactly completes one period within
    // this same 1s tick, so the freshly-bought unit already produces once this tick, landing 1 Byte
    // plus 1 × BITS_PER_BYTE Bits mirrored for MoneyHero / Prestige.
    expect(after.resources[MONEY_ID]).toBe(BITS_PER_BYTE)
    expect(after.resources[BYTES_ID]).toBe(1)
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
    // tensTier's own 1s tickspeed exactly completes one period within this single 1s tick, so its
    // 8 pre-owned generators already produce once — Bytes +8 and Bits mirrored +8 × BITS_PER_BYTE.
    expect(after.resources[MONEY_ID]).toBe(500 + 8 * BITS_PER_BYTE)
    expect(after.resources[BYTES_ID]).toBe(8)
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
    // own 1s tickspeed exactly completes one period within this same 1s tick, so that unit already
    // produces once this tick, landing 1 Byte plus BITS_PER_BYTE Bits mirrored.
    expect(after.resources[MONEY_ID]).toBe(BITS_PER_BYTE)
    expect(after.resources[BYTES_ID]).toBe(1)
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
    // Cost drains money to $1,000. tensTier's own 1s tickspeed exactly completes one period within
    // this same 1s tick, so the freshly-bought 8 units already produce once — and since this
    // purchase completes the whole level-1 block, the level-2 purchase milestone doubles that
    // delivery (see getPurchaseMilestoneMultiplier): 8 × 2 = 16 Bytes, mirrored into Bits.
    expect(after.resources[MONEY_ID]).toBe(1000 + 16 * BITS_PER_BYTE)
    expect(after.resources[BYTES_ID]).toBe(16)
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
    // tensTier's own 1s tickspeed exactly completes one period within this same 1s tick, so the
    // freshly-bought 3 units already produce once — and since this purchase completes the whole
    // level-1 block (purchaseLevels reaches 2, asserted above), the level-2 purchase milestone
    // doubles that delivery (see getPurchaseMilestoneMultiplier): 3 × 2 = 6 Bytes, mirrored into Bits.
    expect(after.resources[MONEY_ID]).toBe(500 + 6 * BITS_PER_BYTE)
    expect(after.resources[BYTES_ID]).toBe(6)
  })

  it('when multiple autobuyers compete for the same money, the higher tier is bought first', () => {
    // $1,000,000 affords exactly 1 Megabyte (per-unit cost $1,000,000), leaving nothing for a
    // Kilobyte purchase ($1,000 per unit).
    const state = withAutobuyer(
      withAutobuyer(
        withMoney(
          withPurchaseLevel(withOwned(createInitialGameState(), tensTier.id, 16), tensTier.id, 3),
          1_000_000
        ),
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
    expect(after.resources[BYTES_ID]).toBe(10)
  })

  it('fires more delivery ticks within a fixed elapsed window at a higher tickspeed level, without changing the per-tick amount', () => {
    // Over a fixed 10-second window, the baseline (level 1, 1s period) delivers floor(10/1) = 10
    // batches of 10 = 100 total; level 3 (×1.21 speed, ~0.826s period) delivers
    // floor(10 × 1.21 / 1) = 12 batches of the same 10 each = 120 total — the same ×1.21 economy
    // bonus as before, now arrived at via more (not bigger) deliveries.
    const baseline = withMoney(withOwned(createInitialGameState(), tensTier.id, 10), 0)
    expect(tickGame(10)(baseline).resources[BYTES_ID]).toBe(100)

    const sped = withMoney(
      withTickspeedLevel(withOwned(createInitialGameState(), tensTier.id, 10), tensTier.id, 3),
      0
    )
    expect(tickGame(10)(sped).resources[BYTES_ID]).toBe(120)
  })

  it('speeds up every tier\'s delivery frequency at once via the global tickspeed multiplier, without changing the per-tick amount', () => {
    // Global level 10 = 9 regular 1% levels compounded, then the level-10 milestone at 10%
    // instead of 1% (see getGlobalTickspeedProductionMultiplier) — 1.01^9 * 1.10 ≈ ×1.2031, the
    // same frequency-scaling effect as the per-tier multiplier above, applied uniformly to every
    // tier at once, no per-tier tickspeed level involved here at all. Over a 100-second window
    // against tensTier's 1s base period: baseline delivers floor(100/1) = 100 batches of 10 = 1000,
    // while floor(100 × 1.2031 / 1) = 120 batches of 10 = 1200.
    const state = withMoney(
      withGlobalTickspeedMultiplier(withOwned(createInitialGameState(), tensTier.id, 10), 10),
      0
    )
    const after = tickGame(100)(state)
    expect(after.resources[BYTES_ID]).toBe(1200)
  })

  it('stacks the global tickspeed multiplier multiplicatively with the per-tier tickspeed multiplier — both speed up the same delivery frequency together', () => {
    // Per-tier level 2 → ×1.1, global level 10 → 1.01^9 * 1.10 ≈ ×1.2031 → combined ≈ ×1.3234, not
    // simply additive. Over a 100-second window against tensTier's 1s base period:
    // floor(100 × 1.3234 / 1) = 132 batches of 10 each = 1320.
    const state = withGlobalTickspeedMultiplier(
      withMoney(
        withTickspeedLevel(withOwned(createInitialGameState(), tensTier.id, 10), tensTier.id, 2),
        0
      ),
      10
    )
    const after = tickGame(100)(state)
    expect(after.resources[BYTES_ID]).toBe(1320)
  })

  it('automatically triggers Speed Up when Auto Speed Up is bought and the last tier is eligible', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withAutoSpeedUp(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 6)
    )
    const after = tickGame(1)(state)
    expect(after.speedUpCount).toBe(1)
    expect(after.purchaseLevels[lastTier.id]).toBe(1)
  })

  it('does not trigger Speed Up automatically when the last tier is not yet eligible', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const state = withAutoSpeedUp(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 5)
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
      withAutoSpeedUp(withPurchaseLevel(createInitialGameState(), lastTier.id, 6)),
      false
    )
    const after = tickGame(1)(state)
    expect(after.speedUpCount).toBe(0)
  })

  it('resumes triggering Speed Up automatically once Auto Speed Up is re-enabled', () => {
    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const paused = withAutoSpeedUpEnabled(
      withAutoSpeedUp(withPurchaseLevel(createInitialGameState(), lastTier.id, 6)),
      false
    )
    const resumed = setAutoSpeedUpEnabled(true)(paused)
    const after = tickGame(1)(resumed)
    expect(after.speedUpCount).toBe(1)
  })

  it('automatically upgrades the global tickspeed multiplier when the Tickspeed Autobuyer is bought and it is affordable', () => {
    const state = withAutoGlobalTickspeed(
      withBytes(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 10)
    )
    const after = tickGame(1)(state)
    expect(after.globalTickspeedMultiplier).toBe(1)
  })

  it('does not upgrade the global tickspeed multiplier automatically without enough Bytes', () => {
    const state = withAutoGlobalTickspeed(
      withBytes(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 9)
    )
    const after = tickGame(1)(state)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('does not upgrade the global tickspeed multiplier automatically without the Tickspeed Autobuyer bought', () => {
    const state = withBytes(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 10)
    const after = tickGame(1)(state)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('does not upgrade the global tickspeed multiplier automatically while the Tickspeed Autobuyer is paused (autoGlobalTickspeedEnabled false)', () => {
    const state = withAutoGlobalTickspeedEnabled(
      withAutoGlobalTickspeed(withBytes(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 10)),
      false
    )
    const after = tickGame(1)(state)
    expect(after.globalTickspeedMultiplier).toBeNull()
  })

  it('resumes automatically upgrading the global tickspeed multiplier once the Tickspeed Autobuyer is re-enabled', () => {
    const paused = withAutoGlobalTickspeedEnabled(
      withAutoGlobalTickspeed(withBytes(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 10)),
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
  it('runs at 100% speed at or below the full-speed threshold', () => {
    expect(getOfflineEffectiveSeconds(300)).toBe(300)
    expect(getOfflineEffectiveSeconds(OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS)).toBe(
      OFFLINE_PROGRESS_FULL_SPEED_THRESHOLD_SECONDS
    )
  })

  it('scales the entire elapsed duration down to 50% once past the full-speed threshold', () => {
    expect(getOfflineEffectiveSeconds(1000)).toBe(500)
  })

  it('floors a fractional result once past the threshold', () => {
    expect(getOfflineEffectiveSeconds(1001)).toBe(500) // 500.5 → 500
  })

  it('caps real elapsed time at MAX_OFFLINE_SECONDS before scaling', () => {
    expect(getOfflineEffectiveSeconds(MAX_OFFLINE_SECONDS * 10)).toBe(
      Math.floor(MAX_OFFLINE_SECONDS * 0.5)
    )
  })

  it('treats negative input as 0', () => {
    expect(getOfflineEffectiveSeconds(-50)).toBe(0)
  })
})

// ─── applyOfflineProgress ─────────────────────────────────────────────────────

describe('applyOfflineProgress', () => {
  it('produces resources at 100% speed for a gap at or below the full-speed threshold', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 5)
    const after = applyOfflineProgress(100)(state) // 100s real, below threshold → 100 simulated seconds
    // tensTier's own 1s tickspeed fits 100 full periods into 100 simulated seconds: 5 generators ×
    // 100 periods = +500 Bytes
    expect(after.resources[BYTES_ID]).toBe(state.resources[BYTES_ID] + 500)
  })

  it('produces resources for 50% of the elapsed real time once past the full-speed threshold', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 5)
    const after = applyOfflineProgress(1000)(state) // 1000s real, past threshold → 500 simulated seconds
    // tensTier's own 1s tickspeed fits 500 full periods into 500 simulated seconds: 5 generators ×
    // 500 periods = +2500 Bytes
    expect(after.resources[BYTES_ID]).toBe(state.resources[BYTES_ID] + 2500)
  })

  it('is a no-op for a gap too short to register a single simulated second', () => {
    const state = withOwned(createInitialGameState(), tensTier.id, 5)
    const after = applyOfflineProgress(0.5)(state) // below threshold, at 100% speed → floors to 0
    expect(after).toBe(state)
  })

  it('runs an active autobuyer across each simulated second, not just once', () => {
    const state = withAutobuyer(withMoney(createInitialGameState(), 1000000), tensTier.id, 2)
    const after = applyOfflineProgress(20)(state) // 20s real, below threshold → 20 simulated seconds/ticks
    // The autobuyer attempt rate is flat (1/tick) regardless of tickspeed level (see tickGame) —
    // 20 simulated ticks fire exactly 20 purchases, one per tick, rather than bought in one lump
    // sum.
    expect(after.purchased[tensTier.id]).toBe(20)
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
  it('spends 10 Bytes to activate Clock Speed (global tickspeed multiplier) at level 1', () => {
    const state = withBytes(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 10)
    const after = buyGlobalTickspeedMultiplier(state)
    expect(after.globalTickspeedMultiplier).toBe(1)
    expect(after.resources[BYTES_ID]).toBe(0)
  })

  it('costs 100 Bytes for level 1 → 2, another power of ten each level after that', () => {
    const state = withBytes(
      withGlobalTickspeedMultiplier(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 1),
      100
    )
    const after = buyGlobalTickspeedMultiplier(state)
    expect(after.globalTickspeedMultiplier).toBe(2)
    expect(after.resources[BYTES_ID]).toBe(0)

    const state2 = withBytes(
      withGlobalTickspeedMultiplier(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 2),
      1000
    )
    const after2 = buyGlobalTickspeedMultiplier(state2)
    expect(after2.globalTickspeedMultiplier).toBe(3)
    expect(after2.resources[BYTES_ID]).toBe(0)
  })

  it('returns the same state when not enough tier02 is owned to unlock it yet, even with plenty of Bytes', () => {
    const state = withBytes(createInitialGameState(), 1000)
    expect(buyGlobalTickspeedMultiplier(state)).toBe(state)
  })

  it('returns the same state when there is not enough Bytes to activate', () => {
    const state = withBytes(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 9)
    expect(buyGlobalTickspeedMultiplier(state)).toBe(state)
  })

  it('returns the same state when there is not enough Bytes to upgrade', () => {
    const state = withBytes(
      withGlobalTickspeedMultiplier(withOwned(createInitialGameState(), TIER_DEFINITIONS[1].id, 1), 1),
      99
    )
    expect(buyGlobalTickspeedMultiplier(state)).toBe(state)
  })

  it('stays purchasable even if tier02 is reset back to 0 once the multiplier is already active', () => {
    const state = withBytes(withGlobalTickspeedMultiplier(createInitialGameState(), 1), 100)
    const after = buyGlobalTickspeedMultiplier(state)
    expect(after.globalTickspeedMultiplier).toBe(2)
  })

  it('refuses to spend once production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withBytes(withOwned(withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), TIER_DEFINITIONS[1].id, 1), 10)
    expect(buyGlobalTickspeedMultiplier(state)).toBe(state)
  })

  it('returns the same state when Bytes are missing from state.resources entirely (falls back to 0, insufficient)', () => {
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

// ─── buyPrestigeDoublePp / getPrestigeDoublePpUpgradeCost ────────────────────

describe('getPrestigeDoublePpUpgradeCost', () => {
  it('costs 100 PP for the first upgrade', () => {
    expect(getPrestigeDoublePpUpgradeCost(0)).toBe(100)
  })

  it('costs 100^(level+1) PP for each subsequent level', () => {
    expect(getPrestigeDoublePpUpgradeCost(1)).toBe(10_000)
    expect(getPrestigeDoublePpUpgradeCost(2)).toBe(1_000_000)
  })
})

describe('getPrestigePowersPerPp / getPrestigePpPerPower', () => {
  it('halves powers-per-PP for the first six upgrades', () => {
    expect(getPrestigePowersPerPp(0)).toBe(64)
    expect(getPrestigePowersPerPp(1)).toBe(32)
    expect(getPrestigePowersPerPp(6)).toBe(1)
  })

  it('doubles PP-per-power after the sixth upgrade', () => {
    expect(getPrestigePpPerPower(6)).toBe(1)
    expect(getPrestigePpPerPower(7)).toBe(2)
    expect(getPrestigePpPerPower(8)).toBe(4)
  })
})

describe('buyPrestigeDoublePp', () => {
  it('spends the upgrade cost and increments prestigeDoublePpLevel', () => {
    const state = withPrestigePoints(createInitialGameState(), 100)
    const after = buyPrestigeDoublePp(state)
    expect(after.prestigeDoublePpLevel).toBe(1)
    expect(after.prestige.points).toBe(0)
  })

  it('is a no-op without enough PP', () => {
    const state = withPrestigePoints(createInitialGameState(), 99)
    expect(buyPrestigeDoublePp(state)).toBe(state)
  })

  it('is not blocked by production freeze at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(withPrestigePoints(createInitialGameState(), 100), PRESTIGE_THRESHOLD)
    const after = buyPrestigeDoublePp(state)
    expect(after.prestigeDoublePpLevel).toBe(1)
  })

  it('latches Compute Flops pageUnlocked so reveal survives spending exactly 100 PP', () => {
    const state = withPrestigePoints(createInitialGameState(), 100)
    expect(state.computeFlops.pageUnlocked).toBe(false)
    const after = buyPrestigeDoublePp(state)
    expect(after.computeFlops.pageUnlocked).toBe(true)
    expect(after.prestige.points).toBe(0)
  })

  it('carries prestigeDoublePpLevel across prestige', () => {
    const state = withPrestigePoints(
      { ...withMoney(createInitialGameState(), PRESTIGE_THRESHOLD), prestigeDoublePpLevel: 2 },
      0,
    )
    const after = prestigeGame(state)
    expect(after.prestigeDoublePpLevel).toBe(2)
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

  it('appends a Prestige museum history entry and carries it across Speed Up', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    const after = prestigeGame(state)
    expect(after.prestigeMuseum.history).toHaveLength(1)
    expect(after.prestigeMuseum.history[0].prestigeNumber).toBe(1)
    expect(after.prestigeMuseum.history[0].pointsAwarded).toBe(1)

    const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
    const readyToSpeedUp = {
      ...after,
      purchaseLevels: { ...after.purchaseLevels, [lastTier.id]: getSpeedUpRequirement(0) },
      owned: { ...after.owned, [lastTier.id]: DEFAULT_PURCHASE_BLOCK_SIZE },
    }
    const sped = speedUpGame(readyToSpeedUp)
    expect(sped.prestigeMuseum.history).toHaveLength(1)
    expect(sped.prestigeMuseum.history[0].id).toBe(after.prestigeMuseum.history[0].id)
  })

  it('pins and unpins museum entries up to the pin cap', () => {
    const withHistory = {
      ...createInitialGameState(),
      prestigeMuseum: {
        history: [
          { id: 'a', at: 1, prestigeNumber: 1, pointsAwarded: 1, moneyBits: 1 },
          { id: 'b', at: 2, prestigeNumber: 2, pointsAwarded: 1, moneyBits: 1 },
        ],
        pinnedIds: [],
      },
    }
    const pinned = pinMuseumEntry('a')(withHistory)
    expect(pinned.prestigeMuseum.pinnedIds).toEqual(['a'])
    expect(unpinMuseumEntry('a')(pinned).prestigeMuseum.pinnedIds).toEqual([])
    expect(pinMuseumEntry('missing')(withHistory)).toBe(withHistory)
  })

  it('refuses to pin past MUSEUM_PIN_CAP, leaving state unchanged', () => {
    const history = Array.from({ length: 11 }, (_, i) => ({
      id: `entry${i}`,
      at: i,
      prestigeNumber: i + 1,
      pointsAwarded: 1,
      moneyBits: 1,
    }))
    const pinnedIds = history.slice(0, MUSEUM_PIN_CAP).map(entry => entry.id)
    expect(pinnedIds).toHaveLength(MUSEUM_PIN_CAP)
    const atCap = {
      ...createInitialGameState(),
      prestigeMuseum: { history, pinnedIds },
    }
    const result = pinMuseumEntry('entry10')(atCap)
    expect(result).toBe(atCap)
    expect(result.prestigeMuseum.pinnedIds).toHaveLength(MUSEUM_PIN_CAP)
  })

  it('awards 1 Prestige Point at exactly PRESTIGE_THRESHOLD', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD)
    const after = prestigeGame(state)
    expect(after.prestige.points).toBe(1)
  })

  it('awards more Prestige Points once 64 excess money-exponent powers beyond Googol are reached', () => {
    const state = withMoney(createInitialGameState(), PRESTIGE_THRESHOLD * 1e64)
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

  it('resets the Byte Foundry\'s Memory/gate across prestige, but keeps the generator and its upgrades permanent', () => {
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
    })
    const after = prestigeGame(state)
    // Memory + the gate reset to fresh.
    expect(after.intro.bits).toBe(0)
    expect(after.intro.productionAccumulator).toBe(0)
    expect(after.intro.mainGameUnlocked).toBe(false)
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
      { bits: 4000, capacity: 8000, byteCreated: true, mainGameUnlocked: true }
    )
    const after = prestigeGame(state)
    expect(after.owned[tensTier.id]).toBe(0)
    expect(after.intro.bits).toBe(0)
    expect(after.intro.mainGameUnlocked).toBe(false)
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
  const eligibleState = () => withPurchaseLevel(createInitialGameState(), lastTier.id, 6)

  it('does nothing when the last tier is below the required level', () => {
    const state = withPurchaseLevel(createInitialGameState(), lastTier.id, 5)
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
    // After 1 prior activation, the requirement is level 7, not the level 6 the first cycle needed.
    const stillLevel6 = withSpeedUpCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 6), 1
    )
    expect(speedUpGame(stillLevel6)).toBe(stillLevel6)

    const level7 = withSpeedUpCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 7), 1
    )
    const after = speedUpGame(level7)
    expect(after.speedUpCount).toBe(2)
  })

  it('stacks across repeated activations', () => {
    // getSpeedUpRequirement(2) = level 8
    const state = withSpeedUpCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 8), 2
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

  it('keeps prestigeDoublePpLevel permanently', () => {
    const state = { ...eligibleState(), prestigeDoublePpLevel: 3 }
    const after = speedUpGame(state)
    expect(after.prestigeDoublePpLevel).toBe(3)
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

  it('falls back to level 1 for the last tier when purchaseLevels is missing from state entirely, which never meets the (≥6) requirement', () => {
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
      mainGameUnlocked: true,
      disks: { 8000: 2 }, disksBuiltTotal: { 8000: 5 }, diskCache: { 8000: 4000 }, diskBuild: null,
      diskAutoRedeemedSizes: { 8000: true }, computeCores: 3, computeNodes: 1,
      computeClusters: 2, computeNetworks: 1, computeGrids: 0, computeMergePageUnlocked: true,
      computeBoostType: 'burst', computeBoostStacks: 2, computeBoostRemainingSeconds: 5,
    }
    const state = withIntro(eligibleState(), seededIntro)
    const after = speedUpGame(state)
    expect(after.intro).toEqual(state.intro)
  })
})

// ─── overclockGame ───────────────────────────────────────────────────────────

describe('overclockGame', () => {
  const lastTier = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
  // getOverclockRequirement(0) = 2 — a fresh state's last tier starts at level 1 by default, so it
  // takes one real level of progress (to level 2) before the first claim of a cycle is eligible;
  // level 1 alone is never enough (see the +2 floor in getOverclockRequirement's own comment).
  const eligibleState = () => withPurchaseLevel(createInitialGameState(), lastTier.id, 2)

  it('does nothing when the last tier is still at its untouched default level (1) — the first claim of a cycle is never free', () => {
    const state = withPurchaseLevel(createInitialGameState(), lastTier.id, 1)
    expect(overclockGame(state)).toBe(state)
  })

  it('does nothing when the last tier is below the required level', () => {
    // overclockCount 3 requires level 5; level 4 isn't there yet.
    const state = withOverclockCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 4), 3
    )
    expect(overclockGame(state)).toBe(state)
  })

  it('does nothing while production is frozen at PRESTIGE_THRESHOLD', () => {
    const state = withMoney(eligibleState(), PRESTIGE_THRESHOLD)
    expect(overclockGame(state)).toBe(state)
  })

  it('sets overclockCount to the last tier\'s current level on a claim', () => {
    const after = overclockGame(eligibleState())
    expect(after.overclockCount).toBe(2)
  })

  it('requires one more level than the last claim, same +1-per-cycle shape as Speed Up\'s own ladder', () => {
    // After 1 prior claim (now at level 2), the requirement is level 3, not level 2 again.
    const stillLevel2 = withOverclockCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 2), 1
    )
    expect(overclockGame(stillLevel2)).toBe(stillLevel2)

    const level3 = withOverclockCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 3), 1
    )
    const after = overclockGame(level3)
    expect(after.overclockCount).toBe(3)
  })

  it('jumps straight to the last tier\'s current level in one claim when behind, instead of requiring one claim per intermediate level', () => {
    // Last claimed at level 5 (overclockCount 5, requirement 7), but the last tier has since
    // reached level 8 — a single claim should catch all the way up to 8, not just to 7.
    const state = withOverclockCount(
      withPurchaseLevel(createInitialGameState(), lastTier.id, 8), 5
    )
    const after = overclockGame(state)
    expect(after.overclockCount).toBe(8)
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

  it('keeps prestigeDoublePpLevel permanently', () => {
    const state = { ...eligibleState(), prestigeDoublePpLevel: 3 }
    const after = overclockGame(state)
    expect(after.prestigeDoublePpLevel).toBe(3)
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

  it('falls back to level 1 for the last tier when purchaseLevels is missing from state entirely, which still falls short of the (≥2) requirement', () => {
    const state = omit(createInitialGameState(), 'purchaseLevels')
    expect(overclockGame(state)).toBe(state)
  })

  it('falls back to 0 when overclockCount is missing from state entirely', () => {
    const state = omit(eligibleState(), 'overclockCount')
    const after = overclockGame(state)
    expect(after.overclockCount).toBe(2)
  })

  it('keeps the Byte Foundry intro state permanently untouched across overclock, unlike prestige', () => {
    const seededIntro = {
      bits: 500, capacity: 8000, byteCreated: true, tickSpeedSeconds: 0.125, productionMultiplier: 4,
      productionMilestoneTier: 3, productionMilestoneTierClaims: 1, productionAccumulator: 2.5,
      mainGameUnlocked: true,
      disks: { 8000: 2 }, disksBuiltTotal: { 8000: 5 }, diskCache: { 8000: 4000 }, diskBuild: null,
      diskAutoRedeemedSizes: { 8000: true }, computeCores: 3, computeNodes: 1,
      computeClusters: 2, computeNetworks: 1, computeGrids: 0, computeMergePageUnlocked: true,
      computeBoostType: 'burst', computeBoostStacks: 2, computeBoostRemainingSeconds: 5,
    }
    const state = withIntro(eligibleState(), seededIntro)
    const after = overclockGame(state)
    expect(after.intro).toEqual(state.intro)
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

// ─── Era ascension (#407/#410) ───────────────────────────────────────────────

const eraEligibleState = (overrides = {}) => {
  let state = withPrestigePoints(createInitialGameState(), ERA_ELIGIBILITY_PP)
  state = withIntro(state, {
    byteCreated: true,
    mainGameUnlocked: true,
    capacity: INTRO_STARTING_CAPACITY * 100,
    computeCores: 5,
    disks: { [FIRST_DISK_SIZE]: 3 },
    foundryResetCaps: { combineCount: 2 },
    ...overrides.intro,
  })
  state = {
    ...state,
    resources: { ...state.resources, [MONEY_ID]: PRESTIGE_THRESHOLD },
    owned: { ...state.owned, [TIER_DEFINITIONS[0].id]: 10 },
    autobuyers: { ...state.autobuyers, [TIER_DEFINITIONS[0].id]: 1 },
    smartAutobuyer: { ...state.smartAutobuyer, [TIER_DEFINITIONS[0].id]: true },
    prestigeDoublePpLevel: 2,
    computeFlops: {
      pageUnlocked: true,
      owned: { [COMPUTE_FLOPS_TIER_DEFINITIONS[0].id]: 5 },
      cumulativeBoost: { [TIER_DEFINITIONS[0].id]: 0.01 },
    },
    hyperscalerCount: 2,
    eons: { balance: 3 },
    eonsUpgrades: { ...createInitialGameState().eonsUpgrades, eonAmplifierLevel: 1 },
    era: { count: 0 },
    prestige: { ...state.prestige, count: 50 },
    ...overrides,
  }
  return state
}

describe('isEraEligible', () => {
  it('requires unspent PP >= ERA_ELIGIBILITY_PP (1 Googol PP)', () => {
    expect(isEraEligible(withPrestigePoints(createInitialGameState(), 0))).toBe(false)
    expect(isEraEligible(withPrestigePoints(createInitialGameState(), ERA_ELIGIBILITY_PP))).toBe(true)
  })
})

describe('getEonsAwarded / buyHyperscaler / getHyperscalerFlopsBoostRate', () => {
  it('awards 1 + eonAmplifierLevel Eons per Era', () => {
    const state = withPrestigePoints(createInitialGameState(), ERA_ELIGIBILITY_PP)
    expect(getEonsAwarded(state)).toBe(1)
    expect(getEonsAwarded({
      ...state,
      eonsUpgrades: { ...state.eonsUpgrades, eonAmplifierLevel: 2 },
    })).toBe(3)
  })

  it('buyHyperscaler spends escalating Eons and increases hyperscaler boost rate', () => {
    const state = { ...createInitialGameState(), eons: { balance: 11 }, hyperscalerCount: 0 }
    const afterFirst = buyHyperscaler(state)
    expect(afterFirst.eons.balance).toBe(10)
    expect(afterFirst.hyperscalerCount).toBe(1)
    expect(getHyperscalerFlopsBoostRate(afterFirst)).toBeGreaterThan(0)
    const broke = { ...createInitialGameState(), eons: { balance: 0 }, hyperscalerCount: 0 }
    expect(buyHyperscaler(broke)).toBe(broke)
  })
})

describe('eraGame', () => {
  it('is a no-op when PP balance is below ERA_ELIGIBILITY_PP', () => {
    const state = withPrestigePoints(createInitialGameState(), 0)
    expect(eraGame(state)).toBe(state)
  })

  it('resets Ladder cycle fields and prestige PP/count/doublePpLevel', () => {
    const state = eraEligibleState()
    const after = eraGame(state)
    expect(after.resources[MONEY_ID]).toBe(1)
    expect(after.owned[TIER_DEFINITIONS[0].id]).toBe(0)
    expect(after.prestige.points).toBe(0)
    expect(after.prestige.count).toBe(0)
    expect(after.prestigeDoublePpLevel).toBe(0)
  })

  it('wipes Foundry assets ordinary Prestige kept but keeps byteCreated and resets Buffer', () => {
    const state = eraEligibleState()
    const after = eraGame(state)
    expect(after.intro.byteCreated).toBe(true)
    expect(after.intro.mainGameUnlocked).toBe(false)
    expect(after.intro.bits).toBe(0)
    expect(after.intro.capacity).toBe(INTRO_STARTING_CAPACITY)
    expect(isIntroConversionUnlocked(after)).toBe(false)
    expect(after.intro.computeCores).toBe(0)
    expect(after.intro.disks).toEqual({})
    expect(after.intro.foundryResetCaps).toEqual({})
    expect(after.autobuyers[TIER_DEFINITIONS[0].id]).toBe(1)
    expect(after.smartAutobuyer[TIER_DEFINITIONS[0].id]).toBe(true)
  })

  it('resets computeFlops owned and cumulativeBoost but keeps pageUnlocked', () => {
    const state = eraEligibleState()
    const after = eraGame(state)
    expect(after.computeFlops.pageUnlocked).toBe(true)
    expect(after.computeFlops.owned[COMPUTE_FLOPS_TIER_DEFINITIONS[0].id]).toBe(0)
    expect(after.computeFlops.cumulativeBoost[TIER_DEFINITIONS[0].id]).toBe(0)
  })

  it('persists hyperscalers, Eons balance (+ award), and increments era.count', () => {
    const state = eraEligibleState()
    const after = eraGame(state)
    expect(after.hyperscalerCount).toBe(2)
    expect(after.eons.balance).toBe(3 + getEonsAwarded(state))
    expect(after.era.count).toBe(1)
  })

  it('latches unboundedUnlocked from prestige.count before reset', () => {
    const below = eraEligibleState({ prestige: { ...eraEligibleState().prestige, count: 50 } })
    expect(eraGame(below).prestige.unboundedUnlocked).toBe(false)

    const atThreshold = eraEligibleState({ prestige: { ...eraEligibleState().prestige, count: 100 } })
    expect(eraGame(atThreshold).prestige.unboundedUnlocked).toBe(true)
  })

  it('unlocks KFlops autobuyer at Era 1 via applyFlopsAutobuyerMilestones', () => {
    const after = eraGame(eraEligibleState())
    expect(after.computeFlopsAutobuyers[COMPUTE_FLOPS_TIER_DEFINITIONS[0].id]).toBe(1)
    expect(after.computeFlopsAutobuyers[COMPUTE_FLOPS_TIER_DEFINITIONS[1].id]).toBeNull()
    expect(getFlopsAutobuyerUnlockEra(COMPUTE_FLOPS_TIER_DEFINITIONS[0].id)).toBe(1)
    expect(getFlopsAutobuyerUnlockEra(COMPUTE_FLOPS_TIER_DEFINITIONS[1].id)).toBe(2)
  })

  it('unlocks MFlops autobuyer when ascending to Era 2', () => {
    const state = eraEligibleState({ era: { count: 1 } })
    const after = eraGame(state)
    expect(after.era.count).toBe(2)
    expect(after.computeFlopsAutobuyers[COMPUTE_FLOPS_TIER_DEFINITIONS[0].id]).toBe(1)
    expect(after.computeFlopsAutobuyers[COMPUTE_FLOPS_TIER_DEFINITIONS[1].id]).toBe(1)
  })
})

describe('eraGame carry/reset matrix (#407)', () => {
  const flop0 = COMPUTE_FLOPS_TIER_DEFINITIONS[0].id
  const tier0 = TIER_DEFINITIONS[0].id

  const richState = () => eraEligibleState({
    autoPrestige: 2,
    autoPrestigeEnabled: false,
    tierTickspeedAutobuyer: { ...createInitialGameState().tierTickspeedAutobuyer, [tier0]: true },
    computeAutoBoostUnlocked: true,
    prestigeMuseum: { history: [{ id: 'p1-1', at: 1, prestigeNumber: 1, pointsAwarded: 1, moneyBits: 1 }], pinnedIds: [] },
    intro: {
      byteCreated: true,
      mainGameUnlocked: true,
      autoMergeCoresIntoNode: true,
    },
    prestige: {
      ...eraEligibleState().prestige,
      unboundedUnlocked: true,
    },
  })

  it.each([
    ['prestigeMuseum.history', s => s.prestigeMuseum.history],
    ['autoPrestige level', s => s.autoPrestige],
    ['autoPrestigeEnabled pause flag', s => s.autoPrestigeEnabled],
    ['tierTickspeedAutobuyer unlock', s => s.tierTickspeedAutobuyer[tier0]],
    ['computeAutoBoostUnlocked', s => s.computeAutoBoostUnlocked],
    ['autoMergeCoresIntoNode', s => s.intro.autoMergeCoresIntoNode],
    ['hyperscalerCount', s => s.hyperscalerCount],
    ['prestige.unboundedUnlocked latch', s => s.prestige.unboundedUnlocked],
    ['computeFlops.pageUnlocked', s => s.computeFlops.pageUnlocked],
  ])('carries %s through Era ascension', (_label, pick) => {
    const state = richState()
    const after = eraGame(state)
    expect(pick(after)).toEqual(pick(state))
  })

  it.each([
    ['prestige.points', s => s.prestige.points, 0],
    ['prestige.count', s => s.prestige.count, 0],
    ['prestigeDoublePpLevel', s => s.prestigeDoublePpLevel, 0],
    ['owned tier0', s => s.owned[tier0], 0],
    ['computeFlops owned', s => s.computeFlops.owned[flop0], 0],
    ['intro.computeCores', s => s.intro.computeCores, 0],
    ['intro.foundryResetCaps', s => s.intro.foundryResetCaps, {}],
  ])('resets %s on Era ascension', (_label, pick, expected) => {
    const after = eraGame(richState())
    expect(pick(after)).toEqual(expected)
  })

  it('clears in-flight disk build on Era ascension', () => {
    const state = eraEligibleState({
      intro: {
        ...eraEligibleState().intro,
        diskBuild: { size: 8000, remainingSeconds: 5, totalSeconds: 10 },
      },
    })
    expect(eraGame(state).intro.diskBuild).toBeNull()
  })

  it('carries paused tier autobuyer flags through Era ascension', () => {
    const state = eraEligibleState({
      autobuyersEnabled: { ...eraEligibleState().autobuyersEnabled, [tier0]: false },
    })
    expect(eraGame(state).autobuyersEnabled[tier0]).toBe(false)
  })
})

describe('tickComputeFlopsAutobuyers via tickGame', () => {
  it('spends PP and increments owned when a Flops autobuyer is unlocked and budgeted', () => {
    const flopId = COMPUTE_FLOPS_TIER_DEFINITIONS[0].id
    const initial = createInitialGameState()
    const state = {
      ...withPrestigePoints(initial, 5000),
      computeFlops: {
        ...initial.computeFlops,
        pageUnlocked: true,
      },
      computeFlopsAutobuyers: { ...initial.computeFlopsAutobuyers, [flopId]: 1 },
      computeFlopsAutobuyerAttemptBudgets: { ...initial.computeFlopsAutobuyerAttemptBudgets, [flopId]: 1 },
    }
    const after = tickGame(0.1)(state)
    expect(after.computeFlops.owned[flopId]).toBe(1)
    expect(after.prestige.points).toBeLessThan(5000)
  })

  it('does not buy when the Flops autobuyer is paused', () => {
    const flopId = COMPUTE_FLOPS_TIER_DEFINITIONS[0].id
    const initial = createInitialGameState()
    let state = {
      ...withPrestigePoints(initial, 5000),
      computeFlops: { ...initial.computeFlops, pageUnlocked: true },
      computeFlopsAutobuyers: { ...initial.computeFlopsAutobuyers, [flopId]: 1 },
      computeFlopsAutobuyerAttemptBudgets: { ...initial.computeFlopsAutobuyerAttemptBudgets, [flopId]: 1 },
    }
    state = setComputeFlopsAutobuyerEnabled(flopId, false)(state)
    const after = tickGame(0.1)(state)
    expect(after.computeFlops.owned[flopId]).toBe(0)
    expect(after.prestige.points).toBe(5000)
  })
})

describe('Data Lakes', () => {
  const kb1 = DISK_LADDER_BASE_SIZE_BITS
  const kb10 = kb1 * 10
  const kb100 = kb1 * 100
  const mb1 = kb1 * 1000

  it('maps disk ladder sizes to storage tiers and sub-sizes', () => {
    expect(getDiskLadderStep(kb1)).toBe(1)
    expect(getDataLakeTierIndex(kb1)).toBe(1)
    expect(getDataLakeSubSize(kb1)).toBe(1)
    expect(getDataLakeTierIndex(kb10)).toBe(1)
    expect(getDataLakeSubSize(kb10)).toBe(10)
    expect(getDataLakeTierIndex(kb100)).toBe(1)
    expect(getDataLakeSubSize(kb100)).toBe(100)
    expect(getDataLakeTierIndex(mb1)).toBe(2)
    expect(getDataLakeSubSize(mb1)).toBe(1)
  })

  it('getBoosterPurchaseCost counts in-flight transfers as well as completed purchases, so starting several concurrently still escalates correctly', () => {
    const state = withIntro(createInitialGameState(), {
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 2, transfers: [{ remainingSeconds: 10 }] },
      },
    })
    // 2 completed + 1 in flight => the NEXT one to start would be the 4th.
    expect(getBoosterPurchaseCost(1)(state)).toBe(4)
  })

  it('depositDiskToDataLake consumes one full disk and credits the matching lake slot, once the array is fully built', () => {
    const state = withIntro(createInitialGameState(), { disks: { [kb1]: 2 }, disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP } })
    const after = depositDiskToDataLake(kb1)(state)
    expect(after.intro.disks[kb1]).toBe(1)
    expect(after.intro.dataLakes[1].deposits[1]).toBe(1)
    expect(getDataLakeDepositedUnits(1)(after)).toBe(1)
  })

  it('depositDiskToDataLake is a no-op at DISK_ARRAY_LADDER_CAP for a sub-size', () => {
    let state = withIntro(createInitialGameState(), {
      disks: { [kb1]: 10 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP },
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: {
          deposits: { 1: DISK_ARRAY_LADDER_CAP, 10: 0, 100: 0 },
          purchased: 0,
        },
      },
    })
    for (let i = 0; i < 3; i += 1) {
      state = depositDiskToDataLake(kb1)(state)
    }
    expect(state.intro.dataLakes[1].deposits[1]).toBe(DISK_ARRAY_LADDER_CAP)
    expect(state.intro.disks[kb1]).toBe(10)
  })

  it('depositDiskToDataLake is a no-op — and canDepositDiskToDataLake false — while the array has a full disk but is not yet COMPLETELY built (disksBuiltTotal below DISK_ARRAY_LADDER_CAP)', () => {
    const state = withIntro(createInitialGameState(), {
      disks: { [kb1]: 1 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP - 1 },
    })
    expect(canDepositDiskToDataLake(state, kb1)).toBe(false)
    expect(depositDiskToDataLake(kb1)(state)).toBe(state)
  })

  it('staged Data Lake capacity: the array-completion gate opens each sub-size independently of the lake\'s own capacity level', () => {
    // capacityLevel maxed so the level-based purchasable cap (see below) never binds here —
    // isolates the PHYSICAL array-completion gate from that separate ladder.
    let state = withIntro(createInitialGameState(), {
      disks: { [kb1]: 10, [kb10]: 10, [kb100]: 10 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP },
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 0, transfers: [], capacityLevel: DATA_LAKE_CAPACITY_MAX_LEVEL },
      },
    })
    expect(canDepositDiskToDataLake(state, kb1)).toBe(true)
    expect(canDepositDiskToDataLake(state, kb10)).toBe(false)
    expect(canDepositDiskToDataLake(state, kb100)).toBe(false)
    for (let i = 0; i < 10; i += 1) state = depositDiskToDataLake(kb1)(state)
    expect(getDataLakeDepositedUnits(1)(state)).toBe(10)
    expect(canDepositDiskToDataLake(state, kb1)).toBe(false) // sub-slot at DISK_ARRAY_LADDER_CAP

    // The ×10 array also completes — its sub-slot opens up.
    state = withIntro(state, { disksBuiltTotal: { ...state.intro.disksBuiltTotal, [kb10]: DISK_ARRAY_LADDER_CAP } })
    expect(canDepositDiskToDataLake(state, kb10)).toBe(true)
    expect(canDepositDiskToDataLake(state, kb100)).toBe(false)
    for (let i = 0; i < 10; i += 1) state = depositDiskToDataLake(kb10)(state)
    expect(getDataLakeDepositedUnits(1)(state)).toBe(110)
  })

  it('getDataLakeCapacityLevel/getDataLakeCapacity default to level 0 (1 unit) for a fresh lake', () => {
    const state = createInitialGameState()
    expect(getDataLakeCapacityLevel(state, 1)).toBe(0)
    expect(getDataLakeCapacity(state, 1)).toBe(1)
    // Cost is the lake's abstract unit-count capacity converted into real bits via its own
    // per-unit face value (getDataLakeUnitBits(1) = the ×1/1 KB disk's own size, 8000 bits) — the
    // same currency Disks themselves are priced in, not a bare unit count.
    expect(getDataLakeCapacityDoublingCost(state, 1)).toBe(1 * 8000)
  })

  // A lake holding DISK_ARRAY_LADDER_CAP (10) of every sub-size totals 10 + 100 + 1,000 = 1,110
  // units — comfortably above the 1,024 hard cap, so this always reads as "full" regardless of the
  // lake's current capacity level, matching how a real fully-built pool's deposits would sit.
  const brimfulDeposits = { 1: DISK_ARRAY_LADDER_CAP, 10: DISK_ARRAY_LADDER_CAP, 100: DISK_ARRAY_LADDER_CAP }
  const withFullLake = (state, tierIndex = 1) => ({
    ...state,
    intro: {
      ...state.intro,
      dataLakes: { ...state.intro.dataLakes, [tierIndex]: { ...getDataLakeTier(state, tierIndex), deposits: brimfulDeposits } },
    },
  })

  it('isDataLakeCapacityDoublingAvailable/TurnAvailable gate on the lake being full (not Bits) and the forced priority order', () => {
    // Not full — a fresh lake holds nothing, short of the starting 1-unit capacity.
    expect(isDataLakeCapacityDoublingAvailable(withIntro(createInitialGameState(), { ...noOtherUpgradesLeft }), 1)).toBe(false)
    // Full, and nothing ranked above it (Disk Fill/Bandwidth/Provision Disk/Compute) is available.
    const diskLadderExhausted = { disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP, [kb10]: DISK_ARRAY_LADDER_CAP, [kb100]: DISK_ARRAY_LADDER_CAP } }
    const full = withFullLake(withIntro(createInitialGameState(), { ...noOtherUpgradesLeft, ...diskLadderExhausted }))
    expect(isDataLakeCapacityDoublingAvailable(full, 1)).toBe(true)
    expect(isDataLakeCapacityDoublingTurnAvailable(full, 1)).toBe(true)
    // A redeemable full disk (Disk Fill) outranks it — same forced-priority chain Sacrifice uses.
    const diskFillBlocks = withFullLake(withIntro(createInitialGameState(), { disks: { [kb1]: 1 }, ...noOtherUpgradesLeft }))
    expect(isDiskFillAvailable(diskFillBlocks)).toBe(true)
    expect(isDataLakeCapacityDoublingTurnAvailable(diskFillBlocks, 1)).toBe(false)
  })

  it('doubleDataLakeCapacity is a no-op while the lake isn\'t full or a higher-priority action is available', () => {
    const notFull = withIntro(createInitialGameState(), { ...noOtherUpgradesLeft })
    expect(doubleDataLakeCapacity(1)(notFull)).toBe(notFull)

    const blockedByDiskFill = withFullLake(withIntro(createInitialGameState(), { disks: { [kb1]: 1 }, ...noOtherUpgradesLeft }))
    expect(doubleDataLakeCapacity(1)(blockedByDiskFill)).toBe(blockedByDiskFill)
  })

  it('doubleDataLakeCapacity drains the lake\'s own deposits (not Bits) and doubles its level/capacity', () => {
    const state = withFullLake(withIntro(createInitialGameState(), {
      bits: 42, // untouched — this mechanic no longer spends Data Stream Bits at all.
      disksBuiltTotal: Object.fromEntries(
        [...Array(30)].map((_, index) => [getDiskLadderSizeBits(index + 1), DISK_ARRAY_LADDER_CAP]),
      ),
      ...noOtherUpgradesLeft,
    }))
    const after = doubleDataLakeCapacity(1)(state)
    expect(after.intro.bits).toBe(42)
    expect(getDataLakeDepositedUnits(1)(after)).toBe(0)
    expect(getDataLakeCapacityLevel(after, 1)).toBe(1)
    expect(getDataLakeCapacity(after, 1)).toBe(2)
    expect(getDataLakeCapacityDoublingCost(after, 1)).toBe(2 * 8000)
    // Doesn't disturb other lakes.
    expect(getDataLakeCapacityLevel(after, 2)).toBe(0)
  })

  it('doubleDataLakeCapacity hard-caps at DATA_LAKE_CAPACITY_MAX_LEVEL — capacity never exceeds 1,024 units', () => {
    let state = withIntro(createInitialGameState(), {
      disksBuiltTotal: Object.fromEntries(
        [...Array(30)].map((_, index) => [getDiskLadderSizeBits(index + 1), DISK_ARRAY_LADDER_CAP]),
      ),
      ...noOtherUpgradesLeft,
      productionMilestoneTier: 100,
      productionMilestoneTierClaims: 1,
    })
    for (let i = 0; i < DATA_LAKE_CAPACITY_MAX_LEVEL; i += 1) {
      state = withFullLake(state)
      state = doubleDataLakeCapacity(1)(state)
    }
    expect(getDataLakeCapacityLevel(state, 1)).toBe(DATA_LAKE_CAPACITY_MAX_LEVEL)
    expect(getDataLakeCapacity(state, 1)).toBe(1024)
    expect(isDataLakeCapacityMaxed(state, 1)).toBe(true)
    state = withFullLake(state)
    expect(isDataLakeCapacityDoublingAvailable(state, 1)).toBe(false)
    expect(doubleDataLakeCapacity(1)(state)).toBe(state) // no-op once maxed, even while full
  })

  describe('idle disk liquidation', () => {
    // Pool 1's own arrays fully built, its lake already at the hard cap (so it can never absorb
    // another deposit), and one further completed disk at the pool's LAST (largest, ×100) size
    // sitting idle with nowhere to go.
    const maxedLakePool1 = withIntro(createInitialGameState(), {
      ...noOtherUpgradesLeft,
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP, [kb10]: DISK_ARRAY_LADDER_CAP, [kb100]: DISK_ARRAY_LADDER_CAP },
      disks: { [kb100]: 1 },
      dataLakes: { 1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 0, capacityLevel: DATA_LAKE_CAPACITY_MAX_LEVEL } },
    })

    it('isIdleDiskLiquidationAvailable/TurnAvailable are true only once the pool\'s Lake is maxed and nothing else is available', () => {
      expect(isIdleDiskLiquidationAvailable(maxedLakePool1, 1)).toBe(true)
      expect(isIdleDiskLiquidationTurnAvailable(maxedLakePool1, 1)).toBe(true)

      // Lake not yet maxed — no idle disk to liquidate into.
      const notMaxed = withIntro(maxedLakePool1, {
        dataLakes: { 1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 0, capacityLevel: 0 } },
      })
      expect(isIdleDiskLiquidationAvailable(notMaxed, 1)).toBe(false)

      // No idle disk on hand.
      const noIdleDisk = withIntro(maxedLakePool1, { disks: {} })
      expect(isIdleDiskLiquidationAvailable(noIdleDisk, 1)).toBe(false)

      // A redeemable full disk (Disk Fill) elsewhere outranks it.
      const diskFillBlocks = withIntro(maxedLakePool1, { disks: { ...maxedLakePool1.intro.disks, [kb1]: 1 } })
      expect(isDiskFillAvailable(diskFillBlocks)).toBe(true)
      expect(isIdleDiskLiquidationTurnAvailable(diskFillBlocks, 1)).toBe(false)
    })

    it('tickIdleDiskLiquidation liquidates the idle disk straight into Bits', () => {
      const after = tickIdleDiskLiquidation(maxedLakePool1)
      expect(after).not.toBe(maxedLakePool1)
      expect(after.intro.disks[kb100] ?? 0).toBe(0)
      expect(after.intro.bits).toBe(maxedLakePool1.intro.bits + kb100)
    })

    it('tickIdleDiskLiquidation is a same-reference no-op once nothing is eligible', () => {
      const nothingToLiquidate = withIntro(createInitialGameState(), { ...noOtherUpgradesLeft })
      expect(tickIdleDiskLiquidation(nothingToLiquidate)).toBe(nothingToLiquidate)
    })
  })

  it('doubleDataLakeCapacity/isDataLakeCapacityDoublingAvailable are same-reference no-ops for an out-of-range tierIndex', () => {
    const state = withIntro(createInitialGameState(), { bits: Number.MAX_SAFE_INTEGER, ...noOtherUpgradesLeft })
    expect(isDataLakeCapacityDoublingAvailable(state, 0)).toBe(false)
    expect(isDataLakeCapacityDoublingAvailable(state, DATA_LAKE_TIER_COUNT + 1)).toBe(false)
    expect(doubleDataLakeCapacity(0)(state)).toBe(state)
    expect(doubleDataLakeCapacity(DATA_LAKE_TIER_COUNT + 1)(state)).toBe(state)
  })

  it('a lake\'s own capacity level (1,024 at max) hard-caps the total below what a fully-built pool could incidentally hold (1,110)', () => {
    let state = withIntro(createInitialGameState(), {
      disks: { [kb1]: 10, [kb10]: 10, [kb100]: 10 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP, [kb10]: DISK_ARRAY_LADDER_CAP, [kb100]: DISK_ARRAY_LADDER_CAP },
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 0, transfers: [], capacityLevel: DATA_LAKE_CAPACITY_MAX_LEVEL },
      },
    })
    expect(getDataLakeCapacity(state, 1)).toBe(1024)
    for (let i = 0; i < 10; i += 1) state = depositDiskToDataLake(kb1)(state)
    for (let i = 0; i < 10; i += 1) state = depositDiskToDataLake(kb10)(state)
    for (let i = 0; i < 10; i += 1) state = depositDiskToDataLake(kb100)(state)
    // 10×1 + 10×10 + 10×100 would total 1,110 if unrestricted, but the 1,024 level cap stops the
    // ×100 place one disk short: 110 + 9×100 = 1,010, then the 10th ×100 deposit would push the
    // total to 1,110 > 1,024, so it's blocked and that disk stays undeposited.
    expect(state.intro.dataLakes[1].deposits).toEqual({ 1: 10, 10: 10, 100: 9 })
    expect(getDataLakeDepositedUnits(1)(state)).toBe(1010)
    expect(state.intro.disks[kb100]).toBe(1)
    expect(canDepositDiskToDataLake(state, kb100)).toBe(false)
  })

  it('startBoosterTransfer decomposes deposits correctly after a partial spend, largest-denomination-first', () => {
    // capacityLevel maxed so a full 10-unit ×1 sub-slot deposit isn't blocked by the much smaller
    // starting capacity (1 unit at level 0); tier01 bumped past level 1 so kb1 disks aren't
    // currently redeemable — otherwise Disk Fill would outrank the Data Lake deposit path (same
    // reasoning as the tickDiskAutoDeposit tests above).
    let state = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), {
      disks: { [kb1]: 10 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP },
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 0, transfers: [], capacityLevel: DATA_LAKE_CAPACITY_MAX_LEVEL },
      },
    })
    for (let i = 0; i < 10; i += 1) state = depositDiskToDataLake(kb1)(state)
    expect(getDataLakeDepositedUnits(1)(state)).toBe(10)
    expect(state.intro.dataLakes[1].deposits).toEqual({ 1: 10, 10: 0, 100: 0 })

    // Spend 1 unit via a Booster purchase — decomposeDataLakeDeposits must correctly re-derive the
    // post-spend breakdown from the raw total, largest-denomination-first: 0×100 + 0×10 + 9×1 = 9,
    // not simply "10 minus 1 in the ones place" (which happens to be the same result here, but only
    // because the total re-decomposes cleanly — see the cross-boundary case below).
    state = startBoosterTransfer(1)(state)
    expect(state.intro.computeCores).toBe(1)
    expect(getDataLakeDepositedUnits(1)(state)).toBe(9)
    expect(state.intro.dataLakes[1].deposits).toEqual({ 1: 9, 10: 0, 100: 0 })
  })

  it('startBoosterTransfer decomposes deposits correctly after a spend that borrows across sub-size boundaries', () => {
    // All 900 units banked in the ×100 place only — spending 3 leaves 897, which does NOT
    // decompose as "900 minus 3 in the hundreds place" (that would be invalid, since a sub-slot
    // caps at DISK_ARRAY_LADDER_CAP (10) — 8.97×100 isn't a valid bucket count). The greedy
    // largest-denomination-first pass must instead re-derive 8×100 + 9×10 + 7×1 = 897 from the raw
    // total, borrowing down into the ×10 and ×1 places that started at zero.
    let state = withIntro(createInitialGameState(), {
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 9 }, purchased: 2, transfers: [] },
      },
    })
    expect(getDataLakeDepositedUnits(1)(state)).toBe(900)
    expect(getBoosterPurchaseCost(1)(state)).toBe(3) // purchased: 2 => the 3rd purchase costs 3.

    state = startBoosterTransfer(1)(state)
    expect(state.intro.computeCores).toBe(1)
    expect(getDataLakeDepositedUnits(1)(state)).toBe(897)
    expect(state.intro.dataLakes[1].deposits).toEqual({ 1: 7, 10: 9, 100: 8 })
  })

  it('tickDiskAutoDeposit auto-feeds the pool\'s Data Lake once a size is no longer redeemable — no manual click needed', () => {
    const state = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), {
      disks: { [kb1]: 2 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP },
    })
    const after = tickDiskAutoDeposit(state)
    expect(after.intro.disks[kb1]).toBe(1)
    expect(getDataLakeDepositedUnits(1)(after)).toBe(1)
  })

  it('tickDiskAutoDeposit defers to a currently-redeemable disk — disks always take priority over the Data Lake', () => {
    // kb1's default (level 1) per-unit cost is exactly kb1 bits, so it's currently redeemable.
    const state = withIntro(createInitialGameState(), {
      disks: { [kb1]: 2 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP },
    })
    expect(tickDiskAutoDeposit(state)).toBe(state)
  })

  it('tickGame drives tickDiskAutoDeposit on every tick, so a full disk auto-deposits with no manual action', () => {
    const state = withIntro(withPurchaseLevel(createInitialGameState(), tensTier.id, 2), {
      disks: { [kb1]: 1 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP },
    })
    const after = tickGame(0.1)(state)
    expect(after.intro.disks?.[kb1] ?? 0).toBe(0)
    expect(getDataLakeDepositedUnits(1)(after)).toBe(1)
  })

  it('startBoosterTransfer fully covered by deposits spends them instantly and grants the Booster with no transfer', () => {
    let state = withIntro(createInitialGameState(), {
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 3, 10: 0, 100: 0 }, purchased: 0, transfers: [] },
      },
    })
    expect(getBoosterPurchaseCost(1)(state)).toBe(1)
    state = startBoosterTransfer(1)(state)
    expect(state.intro.computeCores).toBe(1)
    expect(state.intro.dataLakes[1].deposits).toEqual({ 1: 2, 10: 0, 100: 0 })
    expect(state.intro.dataLakes[1].purchased).toBe(1)
    expect(state.intro.dataLakes[1].transfers).toEqual([])
    expect(getDataLakeAvailableUnits(1)(state)).toBe(2)

    state = startBoosterTransfer(1)(state)
    expect(state.intro.computeCores).toBe(2)
    // 2 - 2 (2nd Booster's cost) = 0 deposited left.
    expect(getDataLakeAvailableUnits(1)(state)).toBe(0)
    expect(getBoosterPurchaseCost(1)(state)).toBe(3)
  })

  it('getDataLakeTransferCapacity is staged 0 -> 1 -> 2 -> 3 as the ×1/×10/×100 arrays complete, same gate as the deposited-capacity progression', () => {
    let state = withIntro(createInitialGameState(), { disksBuiltTotal: {} })
    expect(getDataLakeTransferCapacity(state, 1)).toBe(0)

    state = withIntro(state, { disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP } })
    expect(getDataLakeTransferCapacity(state, 1)).toBe(1)

    state = withIntro(state, { disksBuiltTotal: { ...state.intro.disksBuiltTotal, [kb10]: DISK_ARRAY_LADDER_CAP } })
    expect(getDataLakeTransferCapacity(state, 1)).toBe(2)

    state = withIntro(state, { disksBuiltTotal: { ...state.intro.disksBuiltTotal, [kb100]: DISK_ARRAY_LADDER_CAP } })
    expect(getDataLakeTransferCapacity(state, 1)).toBe(DATA_LAKE_TRANSFER_CAPACITY_MAX)
    expect(getDataLakeTransferCapacity(state, 1)).toBe(3)
  })

  it('startBoosterTransfer sources any cost beyond deposits live from held Disks, queues a timed transfer at 10x bandwidth, and does not grant the Booster yet', () => {
    let state = withIntro(createInitialGameState(), {
      disks: { [kb1]: 1 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP },
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 0, transfers: [] },
      },
    })
    expect(getDataLakeTransferCapacity(state, 1)).toBe(1)
    expect(canStartBoosterTransfer(state, 1)).toBe(true)

    state = startBoosterTransfer(1)(state)
    // The 1 kb1 disk was consumed live, not deposited.
    expect(state.intro.disks[kb1] ?? 0).toBe(0)
    expect(state.intro.computeCores).toBe(0)
    expect(state.intro.dataLakes[1].purchased).toBe(0)
    expect(state.intro.dataLakes[1].transfers).toHaveLength(1)
    // 1 unit = 1 kb1-disk's worth of bits, at 10x the default 1 bit/sec production rate.
    const expectedSeconds = kb1 / (DATA_LAKE_TRANSFER_BANDWIDTH_MULTIPLIER * 1)
    expect(state.intro.dataLakes[1].transfers[0].remainingSeconds).toBeCloseTo(expectedSeconds)

    // A 2nd concurrent start needs a 2nd free transfer slot — capacity is only 1 here.
    expect(canStartBoosterTransfer(state, 1)).toBe(false)
  })

  it('canStartBoosterTransfer is false when neither deposits nor held Disks can cover the cost', () => {
    const state = withIntro(createInitialGameState(), {
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 0, transfers: [] },
      },
    })
    expect(canStartBoosterTransfer(state, 1)).toBe(false)
    expect(startBoosterTransfer(1)(state)).toBe(state)
  })

  it('startBoosterTransfer funds a live transfer from many small held Disks even when no single larger sub-size Disk is held — held counts are NOT capped at the deposited buffer\'s own DISK_ARRAY_LADDER_CAP (10)', () => {
    // 10 held kb1 disks (a size's array holds up to DISK_ARRAY_LADDER_CAP = 10) is a completely
    // valid state once that array is fully built and none have been deposited/redeemed yet. A cost
    // of exactly 10 units decomposes, deposit-buffer-style, as "1 kb10 disk" — which isn't held —
    // but the 10 kb1 disks are worth the identical 10 units and must fund it just as well.
    const state = withIntro(createInitialGameState(), {
      disks: { [kb1]: 10 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP },
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 9, transfers: [] },
      },
    })
    expect(getBoosterPurchaseCost(1)(state)).toBe(10)
    expect(canStartBoosterTransfer(state, 1)).toBe(true)

    const after = startBoosterTransfer(1)(state)
    expect(after.intro.disks[kb1] ?? 0).toBe(0)
    expect(after.intro.dataLakes[1].transfers).toHaveLength(1)
  })

  it('startBoosterTransfer splits one Booster\'s cost across deposits AND a live Disk transfer in the same call', () => {
    const state = withIntro(createInitialGameState(), {
      disks: { [kb1]: 1 },
      disksBuiltTotal: { [kb1]: DISK_ARRAY_LADDER_CAP },
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        // purchased: 1 => next cost is 2; 1 unit already deposited covers half of it.
        1: { deposits: { 1: 1, 10: 0, 100: 0 }, purchased: 1, transfers: [] },
      },
    })
    expect(getBoosterPurchaseCost(1)(state)).toBe(2)

    const after = startBoosterTransfer(1)(state)
    // The 1 deposited unit is spent instantly...
    expect(after.intro.dataLakes[1].deposits).toEqual({ 1: 0, 10: 0, 100: 0 })
    // ...and the other 1 unit is sourced live from the held kb1 disk, as a transfer still in flight.
    expect(after.intro.disks[kb1] ?? 0).toBe(0)
    expect(after.intro.dataLakes[1].transfers).toHaveLength(1)
    expect(after.intro.dataLakes[1].purchased).toBe(1) // not yet granted — the live half is still pending
    expect(after.intro.computeCores).toBe(0)
  })

  it('tickDataLakeTransfers resolves multiple transfers completing in the same tick, both within one tier and across different tiers', () => {
    let state = withIntro(createInitialGameState(), {
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        // Tier 1: 2 concurrent transfers, both due to complete this tick.
        1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 0, transfers: [{ remainingSeconds: 3 }, { remainingSeconds: 5 }] },
        // Tier 2: 1 transfer, also due to complete this tick.
        2: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 0, transfers: [{ remainingSeconds: 5 }] },
      },
    })
    state = tickDataLakeTransfers(5)(state)
    expect(state.intro.dataLakes[1].transfers).toEqual([])
    expect(state.intro.dataLakes[1].purchased).toBe(2)
    expect(state.intro.dataLakes[2].transfers).toEqual([])
    expect(state.intro.dataLakes[2].purchased).toBe(1)
    // Tier 1 grants computeCores (COMPUTE_BOOST_TIER_FIELDS[0]), tier 2 grants computeNodes
    // (COMPUTE_BOOST_TIER_FIELDS[1]) — both this tick, from separate lakes' transfers.
    expect(state.intro.computeCores).toBe(2)
    expect(state.intro.computeNodes).toBe(1)
  })

  it('tickDataLakeTransfers counts an in-flight transfer down and, on completion, grants the Booster and frees the slot', () => {
    let state = withIntro(createInitialGameState(), {
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 0 }, purchased: 0, transfers: [{ remainingSeconds: 10 }] },
      },
    })
    state = tickDataLakeTransfers(4)(state)
    expect(state.intro.dataLakes[1].transfers).toEqual([{ remainingSeconds: 6 }])
    expect(state.intro.computeCores).toBe(0)

    state = tickDataLakeTransfers(6)(state)
    expect(state.intro.dataLakes[1].transfers).toEqual([])
    expect(state.intro.dataLakes[1].purchased).toBe(1)
    expect(state.intro.computeCores).toBe(1)
  })

  it('tickDataLakeTransfers is a same-reference no-op while nothing is in flight', () => {
    const state = createInitialGameState()
    expect(tickDataLakeTransfers(5)(state)).toBe(state)
  })

  it('startBoosterTransfer can exceed COMPUTE_ENTITY_CAP — capacity is lake-limited, not inventory-capped', () => {
    let state = withIntro(createInitialGameState(), {
      computeCores: COMPUTE_ENTITY_CAP,
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 9 }, purchased: 0, transfers: [] },
      },
    })
    state = startBoosterTransfer(1)(state)
    expect(state.intro.computeCores).toBe(COMPUTE_ENTITY_CAP + 1)
  })

  it('tier-1 Boosters latch computeMergePageUnlocked via computeCoresEverEarned, whether granted instantly or via a completed transfer', () => {
    let state = withIntro(createInitialGameState(), {
      dataLakes: {
        ...createInitialGameState().intro.dataLakes,
        1: { deposits: { 1: 0, 10: 0, 100: 9 }, purchased: 0, transfers: [] },
      },
    })
    for (let i = 0; i < COMPUTE_CORES_PER_NODE; i += 1) {
      state = startBoosterTransfer(1)(state)
    }
    expect(state.intro.computeMergePageUnlocked).toBe(true)
    expect(state.intro.computeCoresEverEarned).toBe(COMPUTE_CORES_PER_NODE)
  })

  it('createInitialGameState seeds all DATA_LAKE_TIER_COUNT lakes with empty transfers', () => {
    const lakes = createInitialGameState().intro.dataLakes
    expect(Object.keys(lakes)).toHaveLength(DATA_LAKE_TIER_COUNT)
    expect(lakes[1].transfers).toEqual([])
  })

  it('prestigeGame carries dataLakes (deposits/purchased/transfers/capacityLevel) through a real Prestige unchanged', () => {
    const seededLake = {
      deposits: { 1: 3, 10: 1, 100: 0 },
      purchased: 4,
      transfers: [{ remainingSeconds: 12 }],
      capacityLevel: 4,
    }
    const state = withMoney(
      withIntro(createInitialGameState(), {
        dataLakes: {
          ...createInitialGameState().intro.dataLakes,
          1: seededLake,
        },
      }),
      PRESTIGE_THRESHOLD,
    )
    const after = prestigeGame(state)
    expect(after.intro.dataLakes[1]).toEqual(seededLake)
    expect(after.intro.dataLakes[2]).toEqual(createInitialGameState().intro.dataLakes[2])
  })

  it('eraGame resets dataLakes with the rest of the Foundry on Era ascension', () => {
    const seededLake = {
      deposits: { 1: 3, 10: 1, 100: 0 },
      purchased: 4,
      transfers: [{ remainingSeconds: 12 }],
      capacityLevel: 4,
    }
    const state = eraEligibleState({
      intro: {
        ...eraEligibleState().intro,
        dataLakes: {
          ...createInitialGameState().intro.dataLakes,
          1: seededLake,
        },
      },
    })
    const after = eraGame(state)
    expect(after.intro.dataLakes).toEqual(createInitialGameState().intro.dataLakes)
    expect(after.intro.dataLakes[1]).not.toEqual(seededLake)
  })
})

describe('prestigeGame unboundedUnlocked latch', () => {
  it('sets prestige.unboundedUnlocked when count crosses PRESTIGE_UNBOUNDED_MIN_COUNT', () => {
    const state = withMoney(
      withPrestigeCount(createInitialGameState(), PRESTIGE_UNBOUNDED_MIN_COUNT - 1),
      PRESTIGE_THRESHOLD,
    )
    const after = prestigeGame(state)
    expect(after.prestige.count).toBe(PRESTIGE_UNBOUNDED_MIN_COUNT)
    expect(after.prestige.unboundedUnlocked).toBe(true)
    expect(isUnboundedPrestigeUnlocked(after)).toBe(true)
  })
})
