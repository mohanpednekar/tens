import { ADDRESS_SPACE_TIER_COUNT, CHALLENGE_BY_ID, CHALLENGE_DEFINITIONS, DUTY_CYCLE_WINDOW_SECONDS, HALF_DUPLEX_PRODUCTION_MULTIPLIER, LIVE_CHALLENGE_IDS, MONEY_ID, PREMIUM_TIER_COST_MULTIPLIER, PURGE_THRESHOLD, TIER_BY_ID, TIER_DEFINITIONS, TIER_INDEX_BY_ID } from '../layers.js'
import { clampNonNegative } from './core.js'

// Challenge-mode rule helpers (epic #1037) — moved verbatim out of engine.js (issue #1212, slice 1).
// Leaf module: depends only on layers.js and core.js, never on engine.js. engine.js re-exports the
// originally-public names; the rest are module-internal helpers that engine.js imports back.

// ── Challenge mode (epic #1037) ───────────────────────────────────────────────────────────────────
// A challenge is "live" only while its id is in LIVE_CHALLENGE_IDS (empty in shipped code until #1039);
// an active challenge that is not live is ignored everywhere, so nothing changes for players.
export const isChallengeLive = id => Boolean(CHALLENGE_BY_ID[id]) && LIVE_CHALLENGE_IDS.has(id)

export const getActiveChallenge = state => {
  const id = state.challenges?.active
  return id && isChallengeLive(id) ? CHALLENGE_BY_ID[id] : null
}

export const isChallengeCompleted = (state, id) => Boolean(state.challenges?.completed?.[id])

export const hasChallengeEffect = (state, effect) => getActiveChallenge(state)?.effect === effect

// The tier (id) a tier-scoped challenge rule applies to, or null when that rule is not the active one.
export const getChallengeEffectTier = (state, effect) => {
  const def = getActiveChallenge(state)
  return def?.effect === effect ? def.automation.key : null
}

// Peaks of an isolated Daily challenge run (see tickGame): `previous` raised to what `state` holds now.
export const mergeRunPeaks = (previous, state) => ({
  balance: Math.max(previous.balance ?? 0, clampNonNegative(state.resources?.[MONEY_ID])),
  clock: Math.max(previous.clock ?? 0, state.globalTickspeedMultiplier ?? 0),
  owned: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, Math.max(previous.owned?.[tier.id] ?? 0, state.owned?.[tier.id] ?? 0)])),
  purchaseLevels: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, Math.max(previous.purchaseLevels?.[tier.id] ?? 1, state.purchaseLevels?.[tier.id] ?? 1)])),
})

// Run-wide lever of the active challenge (see tierChallenge in layers.js); `fallback` when none applies.
// `state.runLevers` carries the same levers for an isolated Daily challenge run (dailyChallenges.js) — the main
// save never has that field.
export const getChallengeLever = (state, name, fallback) => getActiveChallenge(state)?.levers?.[name] ?? state.runLevers?.[name] ?? fallback

// Challenge-driven output factor of one tier (F1 Half Duplex on Kilobytes, plus the run-wide `production` lever) —
// shared by tickGame's production and MainPage's per-delivery preview so the two always agree.
export const getChallengeProductionMultiplier = (state, tierId) =>
  (getChallengeEffectTier(state, 'halfDuplex') === tierId ? HALF_DUPLEX_PRODUCTION_MULTIPLIER : 1) * getChallengeLever(state, 'production', 1)

// The tier as priced during the run (F4 Premium Tier and the `costMultiplier` lever; a copy — TIER_DEFINITIONS is never edited).
export const getChallengeTier = (state, tierId) => {
  const tier = TIER_BY_ID[tierId]
  if (!tier) return tier
  const factor = (getChallengeEffectTier(state, 'premiumTier') === tierId ? PREMIUM_TIER_COST_MULTIPLIER : 1) * getChallengeLever(state, 'costMultiplier', 1)
  return factor === 1 ? tier : { ...tier, baseCost: tier.baseCost * factor }
}

// F6 Address Space: only the first ADDRESS_SPACE_TIER_COUNT tiers exist for the run.
export const getEffectiveTierCount = state => (hasChallengeEffect(state, 'addressSpace') ? ADDRESS_SPACE_TIER_COUNT : TIER_DEFINITIONS.length)

export const getEffectiveLastTier = state => TIER_DEFINITIONS[getEffectiveTierCount(state) - 1]

// F19 Duty Cycle: whether the on-window is currently open (30 s on, 30 s off of challenge time).
export const isDutyCycleOn = state => Math.floor(clampNonNegative(state.challenges?.activeSeconds) / DUTY_CYCLE_WINDOW_SECONDS + 1e-9) % 2 === 0

// The tier's tickspeed level as it acts on production (F11 gated, F18 chained, F19 off-window read as baseline 1).
export const getEffectiveTickspeedLevel = (state, tierId) => {
  const level = state.tickspeedLevels?.[tierId] ?? 1
  if (!getActiveChallenge(state)) return level
  if (getChallengeEffectTier(state, 'clockGated') === tierId) return 1
  if (getChallengeEffectTier(state, 'dutyCycle') === tierId && !isDutyCycleOn(state)) return 1
  if (getChallengeEffectTier(state, 'daisyChain') === tierId) {
    const predecessor = TIER_DEFINITIONS[(TIER_INDEX_BY_ID[tierId] ?? 1) - 1]
    return Math.min(level, state.tickspeedLevels?.[predecessor.id] ?? 1)
  }
  return level
}

// The Money level a run must reach to Purge: PURGE_THRESHOLD, or the active challenge's raised goal.
export const getPurgeGoalBits = state => getActiveChallenge(state)?.goal ?? PURGE_THRESHOLD

// Gate for the three speed-upgrade buyers: refused while the target automation has a LIVE challenge
// that is not yet completed. Costs are untouched.
export const getLiveChallengeForAutomation = (kind, key) =>
  CHALLENGE_DEFINITIONS.find(def => def.automation.kind === kind && def.automation.key === key && isChallengeLive(def.id)) ?? null

export const isSpeedUpgradeChallengeGated = (state, kind, key) => {
  const def = getLiveChallengeForAutomation(kind, key)
  return Boolean(def) && !isChallengeCompleted(state, def.id)
}
