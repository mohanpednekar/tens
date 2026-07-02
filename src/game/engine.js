import { MONEY_ID, MONEY_STARTING_AMOUNT, PRESTIGE_PP_COST, TIER_DEFINITIONS } from './layers'

const clampNonNegative = value => Math.max(0, Number.isFinite(value) ? value : 0)

// Collect all unique resource IDs referenced by the tier definitions
const allResourceIds = () => {
  const ids = new Set([MONEY_ID])
  TIER_DEFINITIONS.forEach(t => {
    ids.add(t.costResourceId)
    ids.add(t.producesResourceId)
  })
  return [...ids]
}

export const createInitialGameState = () => ({
  resources: allResourceIds().reduce((acc, id) => ({
    ...acc,
    [id]: id === MONEY_ID ? MONEY_STARTING_AMOUNT : 0,
  }), {}),
  owned: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 0,
  }), {}),
  purchased: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 0,
  }), {}),
  autobuyers: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: 0,
  }), {}),
  prestige: {
    pp: 0,
    level: 0,
    highestMilestone: Math.floor(Math.log10(MONEY_STARTING_AMOUNT)),
  },
})

export const formatAmount = value => {
  const safeValue = clampNonNegative(value)

  if (safeValue < 1000000000) return new Intl.NumberFormat('en-US').format(safeValue)
  return new Intl.NumberFormat('en-US', { notation: 'scientific' }).format(safeValue)
}

// Cost doubles the per-purchase increment every 10 upgrades.
// epoch = floor(owned / 10), within = owned % 10
// cost = baseCost * 2^epoch * (1 + 0.1 * within)
export const getTierCost = (tier, owned) => {
  const n = clampNonNegative(owned)
  const epoch = Math.floor(n / 10)
  const within = n % 10
  return tier.baseCost * (2 ** epoch) * (1 + 0.1 * within)
}

// Resource cost to upgrade an autobuyer from currentLevel to currentLevel+1.
// Level 0→1 costs 10, level 1→2 costs 100, level 2→3 costs 1000, …
export const getAutobuyerCost = currentLevel =>
  10 ** (clampNonNegative(currentLevel) + 1)

// Each Prestige Level doubles production at every tier
export const productionMultiplier = prestigeLevel => 2 ** clampNonNegative(prestigeLevel)

// First tier is always unlocked; each subsequent tier unlocks when you own ≥10 of the tier below.
// Already-owned tiers stay unlocked so older saves remain playable after rule changes.
export const isTierUnlocked = state => tier => {
  const tierIndex = TIER_DEFINITIONS.findIndex(t => t.id === tier.id)
  if (tierIndex === 0) return true
  if ((state.owned[tier.id] ?? 0) > 0) return true
  const prevTier = TIER_DEFINITIONS[tierIndex - 1]
  return (state.owned[prevTier.id] ?? 0) >= 10
}

const checkMilestones = (resources, prestige) => {
  const money = clampNonNegative(resources[MONEY_ID])
  if (money < 10) return prestige

  const currentMilestone = Math.floor(Math.log10(money))
  if (currentMilestone <= prestige.highestMilestone) return prestige

  return {
    ...prestige,
    pp: prestige.pp + (currentMilestone - prestige.highestMilestone),
    highestMilestone: currentMilestone,
  }
}

export const tickGame = elapsedSeconds => state => {
  const multiplier = productionMultiplier(state.prestige.level)

  // Apply autobuyers: for each tier, attempt to purchase `level` generators per tick.
  // buyTier re-validates internally and returns the state unchanged when a purchase fails,
  // so a tier is safely skipped if a shared cost resource was exhausted.
  const stateAfterAutobuyers = TIER_DEFINITIONS.reduce((s, tier) => {
    const level = s.autobuyers[tier.id] ?? 0
    if (!level || !isTierUnlocked(s)(tier)) return s
    let result = s
    for (let i = 0; i < level; i++) {
      const next = buyTier(tier.id)(result)
      if (next === result) break // can no longer afford
      result = next
    }
    return result
  }, state)

  const newResources = { ...stateAfterAutobuyers.resources }
  const newOwned = { ...stateAfterAutobuyers.owned }

  TIER_DEFINITIONS.forEach(tier => {
    if (!isTierUnlocked(stateAfterAutobuyers)(tier)) return
    const production = (stateAfterAutobuyers.owned[tier.id] ?? 0) * elapsedSeconds * multiplier
    
    newResources[tier.producesResourceId] = clampNonNegative((newResources[tier.producesResourceId] ?? 0) + production)
    // If the produced resource is also a tier (generator), add to owned count
    if (tier.producesResourceId !== MONEY_ID) {
      newOwned[tier.producesResourceId] = clampNonNegative((newOwned[tier.producesResourceId] ?? 0) + production)
    }
  })

  return {
    ...stateAfterAutobuyers,
    resources: newResources,
    owned: newOwned,
    prestige: checkMilestones(newResources, stateAfterAutobuyers.prestige),
  }
}

export const getTierSpendableAmount = (state, tier) =>
  state.resources[tier.costResourceId] ?? 0

export const getTierPurchasedCount = (state, tierId) =>
  state.purchased?.[tierId] ?? 0

export const buyTier = tierId => state => {
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state

  const purchased = getTierPurchasedCount(state, tierId)
  const cost = getTierCost(tier, purchased)

  if (getTierSpendableAmount(state, tier) < cost) return state

  const costResourceOwnedCount = state.owned[tier.costResourceId]
  const ownedUpdates = {
    [tierId]: (state.owned[tierId] ?? 0) + 1,
  }

  if (costResourceOwnedCount !== undefined) {
    ownedUpdates[tier.costResourceId] = clampNonNegative(costResourceOwnedCount - cost)
  }

  return {
    ...state,
    resources: {
      ...state.resources,
      [tier.costResourceId]: clampNonNegative((state.resources[tier.costResourceId] ?? 0) - cost),
      [tierId]: (state.resources[tierId] ?? 0) + 1,
    },
    owned: { ...state.owned, ...ownedUpdates },
    purchased: {
      ...state.purchased,
      [tierId]: purchased + 1,
    },
  }
}

// Spend the tier's own cost-resource to unlock or upgrade the autobuyer for a tier.
// Level 0→1 costs 10, level 1→2 costs 100, … (10^(level+1) of tier.costResourceId).
// Autobuyers reset on prestige since they are funded by in-run resources.
export const buyAutobuyer = tierId => state => {
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state

  const currentLevel = state.autobuyers[tierId] ?? 0
  const cost = getAutobuyerCost(currentLevel)
  const available = state.resources[tier.costResourceId] ?? 0
  if (available < cost) return state

  return {
    ...state,
    resources: {
      ...state.resources,
      [tier.costResourceId]: clampNonNegative(available - cost),
    },
    autobuyers: {
      ...state.autobuyers,
      [tierId]: currentLevel + 1,
    },
  }
}

// Spending PRESTIGE_PP_COST PP gains 1 Prestige Level and resets all progress.
// Autobuyers are funded by in-run resources and reset with everything else.
export const prestigeGame = state => {
  if (state.prestige.pp < PRESTIGE_PP_COST) return state

  const initial = createInitialGameState()
  return {
    ...initial,
    prestige: {
      ...initial.prestige,
      pp: state.prestige.pp - PRESTIGE_PP_COST,
      level: state.prestige.level + 1,
    },
  }
}
