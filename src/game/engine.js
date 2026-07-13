import { AUTOBUYER_XP_COST_BASE, GOOGOL, MONEY_ID, MONEY_STARTING_AMOUNT, TIER_DEFINITIONS } from './layers'

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
    [tier.id]: null,
  }), {}),
  prestige: {
    xp: 0,
    level: 0,
    highestMilestone: Math.floor(Math.log10(MONEY_STARTING_AMOUNT)),
  },
})

// Cached at module scope — Intl.NumberFormat construction is relatively expensive and these
// run many times per render/tick.
const plainNumberFormatter = new Intl.NumberFormat('en-US')
const scientificNumberFormatter = new Intl.NumberFormat('en-US', { notation: 'scientific' })
const currencyNumberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

// Values at/above this switch from plain comma-grouped digits to exponential notation
// (e.g. "6.5E13") for readability, shared by formatAmount and formatCurrency.
const EXPONENTIAL_NOTATION_THRESHOLD = 1_000_000

export const formatAmount = value => {
  const safeValue = clampNonNegative(value)

  if (safeValue < EXPONENTIAL_NOTATION_THRESHOLD) return plainNumberFormatter.format(safeValue)
  return scientificNumberFormatter.format(safeValue)
}

// Comma-grouped currency string below the threshold, exponential above it (same threshold and
// notation as formatAmount) — money can reach 100+ digit balances near the Googol prestige
// requirement, so it can't stay full-digit forever. Floors rather than rounds so a displayed
// amount never overstates the actual spendable balance (e.g. a fractional 1.6 balance from a
// non-integer tick shows as $1, not a misleading $2).
export const formatCurrency = value => {
  const safeValue = Math.floor(clampNonNegative(value))
  return safeValue < EXPONENTIAL_NOTATION_THRESHOLD
    ? `$${currencyNumberFormatter.format(safeValue)}`
    : `$${scientificNumberFormatter.format(safeValue)}`
}

// Cost is flat across each block of 10 purchases, jumping 10x at every block boundary.
// epoch = floor(purchased / 10); cost = baseCost * 10^epoch
export const getTierCost = (tier, purchased) => {
  const epoch = Math.floor(clampNonNegative(purchased) / 10)
  return tier.baseCost * (10 ** epoch)
}

// How many units a bulk purchase actually buys: capped by the requested quantity and by the
// units remaining in the current cost block (so every unit bought is at the same price).
export const getTierBulkQuantity = (tier, purchased, requestedQuantity) => {
  const within = clampNonNegative(purchased) % 10
  return Math.max(0, Math.min(clampNonNegative(requestedQuantity), 10 - within))
}

export const getTierQuantityCost = (tier, purchased, requestedQuantity) =>
  getTierCost(tier, purchased) * getTierBulkQuantity(tier, purchased, requestedQuantity)

// How many units are actually affordable: capped by the block boundary (getTierBulkQuantity)
// and further capped by what `spendable` can pay for at the flat per-unit price. This is what
// buyTierQuantity will actually purchase (it stops as soon as a unit becomes unaffordable), so
// UI previews should use this rather than getTierBulkQuantity alone.
export const getTierAffordableQuantity = (tier, purchased, spendable, requestedQuantity) => {
  const blockCapped = getTierBulkQuantity(tier, purchased, requestedQuantity)
  const unitCost = getTierCost(tier, purchased)
  if (unitCost <= 0) return blockCapped
  return Math.min(blockCapped, Math.floor(clampNonNegative(spendable) / unitCost))
}

// XP cost to unlock an autobuyer (null → 0, locked to inactive). Doubles per tier layer.
// Layer 0 → 1 XP, layer 1 → 2 XP, layer 2 → 4 XP, …
export const getAutobuyerUnlockXPCost = tierIndex =>
  AUTOBUYER_XP_COST_BASE * (2 ** clampNonNegative(tierIndex))

// Resource cost to upgrade an autobuyer from currentLevel to currentLevel+1.
// Level 0→1 costs 10, level 1→2 costs 100, level 2→3 costs 1000, …  (10^(level+1))
export const getAutobuyerCost = currentLevel =>
  10 ** (clampNonNegative(currentLevel) + 1)

// Each Prestige Level doubles production at every tier
export const productionMultiplier = prestigeLevel => 2 ** clampNonNegative(prestigeLevel)

// Each Upgrade level (the autobuyer's level) also doubles that tier's own production: level 0
// (unlocked but idle) is a no-op multiplier (2^0 = 1), so the visible effect only starts once a
// level is actually purchased — the same level also grants another auto-purchase attempt per
// tick (see tickGame).
export const getAutobuyerProductionMultiplier = autobuyerLevel =>
  2 ** clampNonNegative(autobuyerLevel ?? 0)

// First tier is always unlocked; each subsequent tier unlocks when you own ≥10 of the tier below.
// Already-owned tiers stay unlocked so older saves remain playable after rule changes.
export const isTierUnlocked = state => tier => {
  const tierIndex = TIER_DEFINITIONS.findIndex(t => t.id === tier.id)
  if (tierIndex === 0) return true
  if ((state.owned[tier.id] ?? 0) > 0) return true
  const prevTier = TIER_DEFINITIONS[tierIndex - 1]
  return (state.owned[prevTier.id] ?? 0) >= 10
}

// Money's order of magnitude, floored (money < 1 has no positive exponent, so reads as 0).
export const getMoneyExponent = money => {
  const safeMoney = clampNonNegative(money)
  return safeMoney < 1 ? 0 : Math.floor(Math.log10(safeMoney))
}

// How far the current money exponent is toward GOOGOL's exponent (100), as a whole percent.
export const getPrestigeProgressPercent = money => {
  const googolExponent = Math.floor(Math.log10(GOOGOL))
  const percent = (getMoneyExponent(money) / googolExponent) * 100
  return Math.min(100, Math.max(0, Math.round(percent)))
}

const checkMilestones = (resources, prestige) => {
  const money = clampNonNegative(resources[MONEY_ID])
  if (money < 10) return prestige

  const currentMilestone = getMoneyExponent(money)
  if (currentMilestone <= prestige.highestMilestone) return prestige

  return {
    ...prestige,
    xp: prestige.xp + (currentMilestone - prestige.highestMilestone),
    highestMilestone: currentMilestone,
  }
}

// autobuyerBatchSize mirrors the manual ×1/×10 toggle, but only governs autobuyer purchases
// (the manual Buy button always buys 1 — see buyTier). At 1 (default), each attempt buys a
// single unit as soon as it's affordable, same as always. Above 1, each attempt only buys once
// the tier can afford the *entire* current cost block up to that size — it holds and waits
// rather than trickling in a partial purchase.
export const tickGame = (elapsedSeconds, autobuyerBatchSize = 1) => state => {
  const multiplier = productionMultiplier(state.prestige.level)

  // Apply autobuyers: for each tier, attempt up to `level` purchases per tick. buyTierQuantity
  // re-validates internally and returns the state unchanged when a purchase fails, so a tier is
  // safely skipped if a shared cost resource was exhausted. Every tier is costed in the same
  // resource (Money), so autobuyers compete for the same pool — processed highest tier first so
  // a higher tier always gets first claim on limited funds.
  const stateAfterAutobuyers = [...TIER_DEFINITIONS].reverse().reduce((s, tier) => {
    const level = s.autobuyers[tier.id] ?? 0
    if (!level || !isTierUnlocked(s)(tier)) return s
    let result = s
    for (let i = 0; i < level; i++) {
      const purchased = getTierPurchasedCount(result, tier.id)
      const blockMax = getTierBulkQuantity(tier, purchased, autobuyerBatchSize)
      const affordable = getTierAffordableQuantity(tier, purchased, getTierSpendableAmount(result, tier), autobuyerBatchSize)
      if (affordable < blockMax) break // can't afford the full current-cost batch yet — hold
      const next = buyTierQuantity(tier.id, blockMax)(result)
      if (next === result) break
      result = next
    }
    return result
  }, state)

  const newResources = { ...stateAfterAutobuyers.resources }
  const newOwned = { ...stateAfterAutobuyers.owned }

  TIER_DEFINITIONS.forEach(tier => {
    if (!isTierUnlocked(stateAfterAutobuyers)(tier)) return
    const tierMultiplier = getAutobuyerProductionMultiplier(stateAfterAutobuyers.autobuyers[tier.id])
    const production = (stateAfterAutobuyers.owned[tier.id] ?? 0) * elapsedSeconds * multiplier * tierMultiplier

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

// Buys up to `quantity` units of a tier, capped at the current cost-block boundary so every
// unit purchased is at the same price. Stops early if a purchase becomes unaffordable.
export const buyTierQuantity = (tierId, quantity) => state => {
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state

  const purchased = getTierPurchasedCount(state, tierId)
  const cappedQuantity = getTierBulkQuantity(tier, purchased, quantity)

  let result = state
  for (let i = 0; i < cappedQuantity; i++) {
    const next = buyTier(tierId)(result)
    if (next === result) break // can no longer afford
    result = next
  }
  return result
}

// Unlock the autobuyer for a tier by spending XP (null → 0, inactive).
// Then upgrade it by spending the tier's own cost-resource in powers of 10
// (level N → N+1: costs 10^(N+1), so 0→1=10, 1→2=100, …).
export const buyAutobuyer = tierId => state => {
  const tier = TIER_DEFINITIONS.find(t => t.id === tierId)
  if (!tier || !isTierUnlocked(state)(tier)) return state

  const tierIndex = TIER_DEFINITIONS.findIndex(t => t.id === tierId)
  const currentLevel = state.autobuyers[tierId] ?? null

  if (currentLevel === null) {
    // Unlock: spend XP → level becomes 0 (inactive)
    const xpCost = getAutobuyerUnlockXPCost(tierIndex)
    if ((state.prestige.xp ?? 0) < xpCost) return state
    return {
      ...state,
      prestige: {
        ...state.prestige,
        xp: (state.prestige.xp ?? 0) - xpCost,
      },
      autobuyers: {
        ...state.autobuyers,
        [tierId]: 0,
      },
    }
  }

  // Upgrade: spend cost resource (10^(currentLevel+1))
  const cost = getAutobuyerCost(currentLevel)
  const available = state.resources[tier.id] ?? 0
  if (available < cost) return state

  return {
    ...state,
    resources: {
      ...state.resources,
      [tier.id]: clampNonNegative(available - cost),
    },
    owned: {
      ...state.owned,
      [tier.id]: clampNonNegative(available - cost),
    },
    autobuyers: {
      ...state.autobuyers,
      [tierId]: currentLevel + 1,
    },
  }
}

// Reaching GOOGOL money gains 1 Prestige Level and resets all progress.
// XP is untouched by prestige (it only ever gated autobuyer unlocks, not prestige).
// Autobuyer unlocks are permanent across prestige (non-null stays unlocked at level 0),
// while run-funded autobuyer levels reset to 0.
export const prestigeGame = state => {
  if (clampNonNegative(state.resources[MONEY_ID]) < GOOGOL) return state

  const initial = createInitialGameState()
  const resetAutobuyers = Object.fromEntries(
    Object.entries(initial.autobuyers).map(([tierId]) => {
      const level = state.autobuyers[tierId] ?? null
      return [tierId, level === null ? null : 0]
    })
  )
  return {
    ...initial,
    autobuyers: resetAutobuyers,
    prestige: {
      ...initial.prestige,
      xp: state.prestige.xp,
      level: state.prestige.level + 1,
    },
  }
}
