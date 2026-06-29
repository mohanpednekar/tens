import { AUTOBUYER_PP_COST_BASE, MONEY_ID, MONEY_STARTING_AMOUNT, PRESTIGE_PP_COST, TIER_DEFINITIONS } from './layers'

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
  autobuyers: TIER_DEFINITIONS.reduce((acc, tier) => ({
    ...acc,
    [tier.id]: false,
  }), {}),
  prestige: {
    pp: 0,
    level: 0,
    highestMilestone: Math.floor(Math.log10(MONEY_STARTING_AMOUNT)),
  },
})

export const formatAmount = value => {
  const safeValue = clampNonNegative(value)

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: safeValue < 100 ? 2 : 0,
  }).format(safeValue)
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

// PP cost for an autobuyer doubles with each layer index
export const getAutobuyerCost = layerIndex =>
  AUTOBUYER_PP_COST_BASE * (2 ** clampNonNegative(layerIndex))

// Each Prestige Level doubles production at every tier
export const productionMultiplier = prestigeLevel => 2 ** clampNonNegative(prestigeLevel)

// First tier is always unlocked; each subsequent tier unlocks when you own ≥1 of the tier below
export const isTierUnlocked = state => tier => {
  const tierIndex = TIER_DEFINITIONS.findIndex(t => t.id === tier.id)
  if (tierIndex === 0) return true
  const prevTier = TIER_DEFINITIONS[tierIndex - 1]
  return (state.owned[prevTier.id] ?? 0) >= 1
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

  // Apply autobuyers: evaluate affordability against the pre-tick state snapshot
  // so every active autobuyer gets a fair opportunity regardless of evaluation
  // order. buyTier re-validates internally and returns the state unchanged when
  // a purchase fails, so a tier is safely skipped if a shared cost resource was
  // exhausted by an earlier purchase in the same tick.
  const affordableTiers = TIER_DEFINITIONS.filter(tier =>
    state.autobuyers[tier.id] &&
    isTierUnlocked(state)(tier) &&
    (state.resources[tier.costResourceId] ?? 0) >= getTierCost(tier, state.owned[tier.id] ?? 0)
  )
  const stateAfterAutobuyers = affordableTiers.reduce((s, tier) => buyTier(tier.id)(s), state)

  const newResources = TIER_DEFINITIONS.reduce((resources, tier) => {
    if (!isTierUnlocked(stateAfterAutobuyers)(tier)) return resources
    const production = (stateAfterAutobuyers.owned[tier.id] ?? 0) * elapsedSeconds * multiplier
    return {
      ...resources,
      [tier.producesResourceId]: clampNonNegative(resources[tier.producesResourceId] + production),
    }
  }, { ...stateAfterAutobuyers.resources })

  return {
    ...stateAfterAutobuyers,
    resources: newResources,
    prestige: checkMilestones(newResources, stateAfterAutobuyers.prestige),
  }
}

export const buyTier = tierId => state => {
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state

  const owned = state.owned[tierId] ?? 0
  const cost = getTierCost(tier, owned)

  if ((state.resources[tier.costResourceId] ?? 0) < cost) return state

  return {
    ...state,
    resources: {
      ...state.resources,
      [tier.costResourceId]: clampNonNegative(state.resources[tier.costResourceId] - cost),
    },
    owned: {
      ...state.owned,
      [tierId]: owned + 1,
    },
  }
}

// Spend PP to buy a permanent autobuyer for a tier (persists through prestige)
export const buyAutobuyer = tierId => state => {
  const tierIndex = TIER_DEFINITIONS.findIndex(t => t.id === tierId)
  if (tierIndex === -1) return state
  if (state.autobuyers[tierId]) return state

  const cost = getAutobuyerCost(tierIndex)
  if (state.prestige.pp < cost) return state

  return {
    ...state,
    prestige: {
      ...state.prestige,
      pp: state.prestige.pp - cost,
    },
    autobuyers: {
      ...state.autobuyers,
      [tierId]: true,
    },
  }
}

// Spending PRESTIGE_PP_COST PP gains 1 Prestige Level and resets all progress.
// Autobuyers are permanent — they survive the reset.
export const prestigeGame = state => {
  if (state.prestige.pp < PRESTIGE_PP_COST) return state

  const initial = createInitialGameState()
  return {
    ...initial,
    autobuyers: { ...state.autobuyers },
    prestige: {
      ...initial.prestige,
      pp: state.prestige.pp - PRESTIGE_PP_COST,
      level: state.prestige.level + 1,
    },
  }
}
