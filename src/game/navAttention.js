import {
  AUTO_SPEED_UP_COST,
  BYTES_ID,
  COMPUTE_ENTITY_CAP,
  COMPUTE_MERGE_RATIO,
  INTRO_BYTE_COMBINE_COST,
  MONEY_ID,
  PRESTIGE_SPEED_BONUS_UNLOCK_COST,
  TICKSPEED_AUTOBUYER_COST,
  TIER_DEFINITIONS,
} from 'game/layers'
import {
  getAutoPrestigeCost,
  getDiskSizesToShow,
  getGlobalTickspeedMultiplierCost,
  getIntroKilobyteConversionCost,
  getOverclockRequirement,
  getPrestigeDoublePpUpgradeCost,
  getPurchaseBlockSize,
  getSmartAutobuyerCost,
  getSpeedUpRequirement,
  getTierAffordableQuantity,
  getTierSpendableAmount,
  isAutoClaimCoreUnlockAvailable,
  isAutoMergeCloudsIntoDatacenterUnlockAvailable,
  isAutoMergeClustersIntoNetworkUnlockAvailable,
  isAutoMergeCoresIntoNodeUnlockAvailable,
  isAutoMergeDatacentersIntoSupercomputerUnlockAvailable,
  isAutoMergeFabricsIntoCloudUnlockAvailable,
  isAutoMergeGridsIntoFabricUnlockAvailable,
  isAutoMergeNetworksIntoGridUnlockAvailable,
  isAutoMergeNodesIntoClusterUnlockAvailable,
  isAutoMergeSupercomputersIntoMegacomputerUnlockAvailable,
  isBandwidthTurnAvailable,
  isComputeCloudsMergeStartAvailable,
  isComputeClustersMergeStartAvailable,
  isComputeCoreClaimAvailable,
  isComputeCoreConversionUnlocked,
  isComputeCoresMergeStartAvailable,
  isComputeDatacentersMergeStartAvailable,
  isComputeFabricsMergeStartAvailable,
  isComputeGridsMergeStartAvailable,
  isComputeNetworksMergeStartAvailable,
  isComputeNodesMergeStartAvailable,
  isComputeSupercomputersMergeStartAvailable,
  isComputeUpgradeTurnAvailable,
  isDiskBuildTurnAvailable,
  isDiskCacheBlockReleasable,
  isDiskFillAvailable,
  isGlobalTickspeedMultiplierUnlocked,
  isIntroConversionUnlocked,
  isMemoryCapacityUpgradeAvailable,
  isProductionFrozen,
  isStorageUnlocked,
  isTierUnlocked,
} from 'game/engine'

// Attention dots on AppNav — lit when a destination has a pending player action. Levels:
//   'high'   — time-sensitive / high-value (Memory full, full purchase level, Prestige freeze,
//              redeemable disk, combine ready) → larger emphasis dot
//   'normal' — other actionable cues (Invest/Build, PP upgrades, merges, Speed Up, …)
//   false    — nothing pending
// Pure predicates over game state; the UI only renders the dot. Engine re-validates on click.

export const ATTENTION_HIGH = 'high'
export const ATTENTION_NORMAL = 'normal'

const lastTier = () => TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]

const COMPUTE_INSTANT_MERGE_BOUNDARIES = [
  { input: 'computeCores', output: 'computeNodes', auto: 'autoMergeCoresIntoNode' },
  { input: 'computeNodes', output: 'computeClusters', auto: 'autoMergeNodesIntoCluster' },
  { input: 'computeClusters', output: 'computeNetworks', auto: 'autoMergeClustersIntoNetwork' },
  { input: 'computeNetworks', output: 'computeGrids', auto: 'autoMergeNetworksIntoGrid' },
  { input: 'computeGrids', output: 'computeFabrics', auto: 'autoMergeGridsIntoFabric' },
  { input: 'computeFabrics', output: 'computeClouds', auto: 'autoMergeFabricsIntoCloud' },
  { input: 'computeClouds', output: 'computeDatacenters', auto: 'autoMergeCloudsIntoDatacenter' },
  { input: 'computeDatacenters', output: 'computeSupercomputers', auto: 'autoMergeDatacentersIntoSupercomputer' },
  { input: 'computeSupercomputers', output: 'computeMegacomputers', auto: 'autoMergeSupercomputersIntoMegacomputer' },
]

const COMPUTE_AUTO_MERGE_UNLOCKS = [
  isAutoMergeCoresIntoNodeUnlockAvailable,
  isAutoMergeNodesIntoClusterUnlockAvailable,
  isAutoMergeClustersIntoNetworkUnlockAvailable,
  isAutoMergeNetworksIntoGridUnlockAvailable,
  isAutoMergeGridsIntoFabricUnlockAvailable,
  isAutoMergeFabricsIntoCloudUnlockAvailable,
  isAutoMergeCloudsIntoDatacenterUnlockAvailable,
  isAutoMergeDatacentersIntoSupercomputerUnlockAvailable,
  isAutoMergeSupercomputersIntoMegacomputerUnlockAvailable,
]

const COMPUTE_RESERVE_MERGE_STARTS = [
  isComputeCoresMergeStartAvailable,
  isComputeNodesMergeStartAvailable,
  isComputeClustersMergeStartAvailable,
  isComputeNetworksMergeStartAvailable,
  isComputeGridsMergeStartAvailable,
  isComputeFabricsMergeStartAvailable,
  isComputeCloudsMergeStartAvailable,
  isComputeDatacentersMergeStartAvailable,
  isComputeSupercomputersMergeStartAvailable,
]

const isMemoryFull = state => (state.intro?.bits ?? 0) >= (state.intro?.capacity ?? 0)

const isCombineAvailable = state =>
  !(state.intro?.byteCreated ?? false) && (state.intro?.bits ?? 0) >= INTRO_BYTE_COMBINE_COST

const isTransferBlockAffordable = state =>
  isIntroConversionUnlocked(state) &&
  (state.intro?.bits ?? 0) >= getIntroKilobyteConversionCost(state)

const pickLevel = (high, normal) => {
  if (high) return ATTENTION_HIGH
  if (normal) return ATTENTION_NORMAL
  return false
}

/** True when some unlocked tier can afford every remaining unit of its current purchase level. */
export const hasAffordableFullLevel = state => {
  if (isProductionFrozen(state)) return false
  const blockSize = getPurchaseBlockSize(state)
  return TIER_DEFINITIONS.some(tier => {
    if (!isTierUnlocked(state)(tier)) return false
    const level = state.purchaseLevels?.[tier.id] ?? 1
    const levelProgress = state.purchaseLevelProgress?.[tier.id] ?? 0
    const remaining = Math.max(0, blockSize - levelProgress)
    if (remaining <= 0) return false
    const affordable = getTierAffordableQuantity(
      tier,
      level,
      blockSize,
      levelProgress,
      getTierSpendableAmount(state, tier),
      Number.MAX_SAFE_INTEGER,
    )
    return affordable >= remaining
  })
}

export const hasAffordableGlobalTickspeed = state => {
  if (isProductionFrozen(state)) return false
  if (!isGlobalTickspeedMultiplierUnlocked(state)) return false
  const cost = getGlobalTickspeedMultiplierCost(state.globalTickspeedMultiplier ?? 0)
  return (state.resources[BYTES_ID] ?? 0) >= cost
}

export const hasSpeedUpAvailable = state => {
  if (isProductionFrozen(state)) return false
  const tier = lastTier()
  if (!isTierUnlocked(state)(tier)) return false
  const level = state.purchaseLevels?.[tier.id] ?? 1
  return level >= getSpeedUpRequirement(state.speedUpCount ?? 0)
}

export const hasOverclockAvailable = state => {
  if (isProductionFrozen(state)) return false
  const tier = lastTier()
  if (!isTierUnlocked(state)(tier)) return false
  const level = state.purchaseLevels?.[tier.id] ?? 1
  return level >= getOverclockRequirement(state.overclockCount ?? 0)
}

/** Ladder-view cues on Factory (buys, prestige, Speed Up / Overclock, Money tickspeed). */
export const hasTiersGameAttention = state =>
  isProductionFrozen(state) ||
  hasAffordableFullLevel(state) ||
  hasAffordableGlobalTickspeed(state) ||
  hasSpeedUpAvailable(state) ||
  hasOverclockAvailable(state)

/** PP Upgrades view — unspent PP can buy at least one upgrade. */
export const hasAffordablePpUpgrade = state => {
  if ((state.prestige?.count ?? 0) < 1) return false
  const points = state.prestige?.points ?? 0
  if (points >= getPrestigeDoublePpUpgradeCost(state.prestigeDoublePpLevel ?? 0)) return true
  if (isProductionFrozen(state)) return false
  const allTiersFullyAutomated = TIER_DEFINITIONS.every(tier =>
    Boolean(state.smartAutobuyer?.[tier.id]) && Boolean(state.tierTickspeedAutobuyer?.[tier.id]),
  )
  return (
    TIER_DEFINITIONS.some(tier =>
      isTierUnlocked(state)(tier) &&
      (state.autobuyers[tier.id] ?? null) !== null &&
      !state.smartAutobuyer?.[tier.id] &&
      points >= getSmartAutobuyerCost(tier.id),
    ) ||
    (!state.prestigeSpeedBonusUnlocked && points >= PRESTIGE_SPEED_BONUS_UNLOCK_COST) ||
    (!(state.autoSpeedUp ?? false) && points >= AUTO_SPEED_UP_COST) ||
    (!(state.autoGlobalTickspeed ?? false) && points >= TICKSPEED_AUTOBUYER_COST) ||
    (allTiersFullyAutomated && points >= getAutoPrestigeCost(state.autoPrestige ?? 0))
  )
}

export const hasTiersAttention = state =>
  hasTiersGameAttention(state) || hasAffordablePpUpgrade(state)

export const getTiersAttentionLevel = state =>
  pickLevel(
    isProductionFrozen(state) || hasAffordableFullLevel(state),
    hasTiersAttention(state),
  )

export const hasFoundryAttention = state =>
  isMemoryFull(state) ||
  isCombineAvailable(state) ||
  isMemoryCapacityUpgradeAvailable(state) ||
  isBandwidthTurnAvailable(state) ||
  isDiskBuildTurnAvailable(state) ||
  isComputeCoreClaimAvailable(state) ||
  isTransferBlockAffordable(state) ||
  isDiskFillAvailable(state)

export const getFoundryAttentionLevel = state =>
  pickLevel(
    isMemoryFull(state) || isCombineAvailable(state) || isDiskFillAvailable(state),
    hasFoundryAttention(state),
  )

export const hasStorageAttention = state => {
  if (!isStorageUnlocked(state)) return false
  if (isDiskFillAvailable(state)) return true
  return getDiskSizesToShow(state).some(size => isDiskCacheBlockReleasable(state, size))
}

export const getStorageAttentionLevel = state => {
  if (!isStorageUnlocked(state)) return false
  return pickLevel(
    isDiskFillAvailable(state),
    hasStorageAttention(state),
  )
}

const hasInstantMergeAvailable = state =>
  COMPUTE_INSTANT_MERGE_BOUNDARIES.some(({ input, output, auto }) => {
    if (state.intro?.[auto]) return false
    const held = state.intro?.[input] ?? 0
    const out = state.intro?.[output] ?? 0
    return held >= COMPUTE_MERGE_RATIO && out < COMPUTE_ENTITY_CAP
  })

export const hasComputeAttention = state => {
  if (!isComputeCoreConversionUnlocked(state)) return false
  return (
    isComputeUpgradeTurnAvailable(state) ||
    hasInstantMergeAvailable(state) ||
    COMPUTE_AUTO_MERGE_UNLOCKS.some(fn => fn(state)) ||
    COMPUTE_RESERVE_MERGE_STARTS.some(fn => fn(state)) ||
    isAutoClaimCoreUnlockAvailable(state)
  )
}

export const getComputeAttentionLevel = state => {
  if (!isComputeCoreConversionUnlocked(state)) return false
  return pickLevel(
    isComputeUpgradeTurnAvailable(state) || hasInstantMergeAvailable(state),
    hasComputeAttention(state),
  )
}

/** Prefer the stronger of two attention levels. */
export const maxAttention = (a, b) => {
  if (a === ATTENTION_HIGH || b === ATTENTION_HIGH) return ATTENTION_HIGH
  if (a === ATTENTION_NORMAL || b === ATTENTION_NORMAL) return ATTENTION_NORMAL
  return false
}

/**
 * Map of AppNav page id → 'high' | 'normal' | false.
 * Storage attention folds into Foundry (Memory | Storage second-level tabs).
 */
export const getNavAttention = state => ({
  game: getTiersAttentionLevel(state),
  foundry: maxAttention(getFoundryAttentionLevel(state), getStorageAttentionLevel(state)),
  boosters: getComputeAttentionLevel(state),
  compute: false,
})
