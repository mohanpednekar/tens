import { MONEY_ID, MONEY_STARTING_AMOUNT, PRESTIGE_PP_COST, TIER_DEFINITIONS } from './layers'

const clampNonNegative = value => Math.max(0, Number.isFinite(value) ? value : 0)

const allResourceIds = () => [MONEY_ID, ...TIER_DEFINITIONS.map(t => t.id)]

export const createInitialGameState = () => ({
  resources: allResourceIds().reduce((acc, id) => ({
    ...acc,
    [id]: id === MONEY_ID ? MONEY_STARTING_AMOUNT : 0,
  }), {}),
  owned: TIER_DEFINITIONS.reduce((acc, tier) => ({
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

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: safeValue < 100 ? 2 : 0,
  }).format(safeValue)
}

// Linear cost: baseCost * (1 + 0.1 * owned) — adds 10% of base per purchase
export const getTierCost = (tier, owned) =>
  tier.baseCost * (1 + 0.1 * clampNonNegative(owned))

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

  const newResources = TIER_DEFINITIONS.reduce((resources, tier) => {
    if (!isTierUnlocked(state)(tier)) return resources
    const production = (state.owned[tier.id] ?? 0) * elapsedSeconds * multiplier
    return {
      ...resources,
      [tier.producesResourceId]: clampNonNegative(resources[tier.producesResourceId] + production),
    }
  }, { ...state.resources })

  return {
    ...state,
    resources: newResources,
    prestige: checkMilestones(newResources, state.prestige),
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

// Spending PRESTIGE_PP_COST PP gains 1 Prestige Level and resets all progress
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
