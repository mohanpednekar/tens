// Every tier is bought directly with Ones (Money); production cascades down
// through `producesResourceId` into the tier below's owned/resource count.
// `id` is a naming-agnostic key (tier01…tier10), decoupled from `name`/`symbol`
// so a future re-theme never has to touch state keys, tests, or save data.
// 'tier01' intentionally has costResourceId === producesResourceId: it is the
// entry-level money generator, bought with Ones to produce more Ones.
// `baseTickSpeedSeconds` is each tier's own independent base production cadence, in seconds (see
// getTierBaseTickSpeedSeconds/tickGame in engine.js) — a plain per-tier field, not derived from
// tier order, so any single tier's cadence can be tuned or upgraded directly without touching a
// shared formula or any other tier. Each tier's cadence increases by 1s down the list — tier01=1s
// (matching the global 100ms/10Hz tick rate — see TICK_RATE_MS below) up through tier10=10s — since
// a slower cadence divides that tier's real throughput (see getTierBaseTickSpeedSeconds below) by
// up to 10x for the last tier, on top of the already-steep Fibonacci-driven cost curve (see
// getTierCost in engine.js). This exact 1s-10s ladder was tried once before the tickspeed-multiplier
// system existed and reverted to a uniform 1s because nothing could offset the slowdown; now that
// both the per-tier (tickspeedLevels) and global (globalTickspeedMultiplier) tickspeed multipliers
// exist to shrink getEffectiveTierTickSpeedSeconds back down, later tiers are meant to be sped back
// up by investing in those rather than being structurally unable to keep pace — see
// docs/DESIGN_HISTORY.md for both the original revert and this reintroduction.
export const TIER_DEFINITIONS = [
  { id: 'tier01', name: 'Bytes',      symbol: 'B',  baseCost: 10,   costResourceId: 'Ones', producesResourceId: 'Ones',   baseTickSpeedSeconds: 1 },
  { id: 'tier02', name: 'Kilobytes',  symbol: 'KB', baseCost: 1E3,  costResourceId: 'Ones', producesResourceId: 'tier01', baseTickSpeedSeconds: 2 },
  { id: 'tier03', name: 'Megabytes',  symbol: 'MB', baseCost: 1E6,  costResourceId: 'Ones', producesResourceId: 'tier02', baseTickSpeedSeconds: 3 },
  { id: 'tier04', name: 'Gigabytes',  symbol: 'GB', baseCost: 1E9,  costResourceId: 'Ones', producesResourceId: 'tier03', baseTickSpeedSeconds: 4 },
  { id: 'tier05', name: 'Terabytes',  symbol: 'TB', baseCost: 1E12, costResourceId: 'Ones', producesResourceId: 'tier04', baseTickSpeedSeconds: 5 },
  { id: 'tier06', name: 'Petabytes',  symbol: 'PB', baseCost: 1E15, costResourceId: 'Ones', producesResourceId: 'tier05', baseTickSpeedSeconds: 6 },
  { id: 'tier07', name: 'Exabytes',   symbol: 'EB', baseCost: 1E18, costResourceId: 'Ones', producesResourceId: 'tier06', baseTickSpeedSeconds: 7 },
  { id: 'tier08', name: 'Zettabytes', symbol: 'ZB', baseCost: 1E21, costResourceId: 'Ones', producesResourceId: 'tier07', baseTickSpeedSeconds: 8 },
  { id: 'tier09', name: 'Yottabytes', symbol: 'YB', baseCost: 1E24, costResourceId: 'Ones', producesResourceId: 'tier08', baseTickSpeedSeconds: 9 },
  { id: 'tier10', name: 'Ronnabytes', symbol: 'RB', baseCost: 1E27, costResourceId: 'Ones', producesResourceId: 'tier09', baseTickSpeedSeconds: 10 },
]


export const RESOURCE_SYMBOL = tierId => TIER_DEFINITIONS.find(t => t.id === tierId)?.symbol || '$'

// How often (in seconds) a tier's production is delivered as a single batch rather than
// continuously every global tick (see engine.js's tickGame / tierProductionAccumulators) —
// simply reads that tier's own independent baseTickSpeedSeconds field above. Not balance-neutral:
// a tier's real per-second throughput is divided by its own tickspeed (see tickGame in
// engine.js), which is why later tiers' 1s-10s ladder above leans on the tickspeed-multiplier
// system (getEffectiveTierTickSpeedSeconds) to be offset back down. An unrecognized tier id falls
// back to 1s rather than throwing.
export const getTierBaseTickSpeedSeconds = tierId =>
  TIER_DEFINITIONS.find(t => t.id === tierId)?.baseTickSpeedSeconds ?? 1

export const MONEY_ID = 'Ones'
export const MONEY_STARTING_AMOUNT = 10
export const GOOGOL = 1e100
// The global tick fires 10x a second (a sub-second granularity, not "one tick = one real
// second") — engine.js's tickGame receives elapsedSeconds = TICK_RATE_MS / 1000 = 0.1 per call,
// and every real-world-time-based rate (autobuyer/Auto-Prestige attempt budgets) is explicitly
// scaled by elapsedSeconds so real-world cadence stays identical to a slower tick rate; only the
// update granularity (and animation smoothness) increases.
export const TICK_RATE_MS = 100

// Progress accrued while the game wasn't open (see engine.js's applyOfflineProgress) is
// simulated at 10% of normal speed — a courtesy for short absences, not a way to make the
// autobuyer loop outrun active play.
export const OFFLINE_PROGRESS_SPEED_MULTIPLIER = 0.1
// Real-world elapsed time is capped at 24 hours before the speed multiplier is applied, so a
// very long absence can't turn into an unbounded simulation loop on load.
export const MAX_OFFLINE_SECONDS = 24 * 60 * 60

// A tier's production doubles at every block-of-10-purchases milestone (see engine.js's
// getPurchaseMilestoneMultiplier) — the per-block multiplier normally applied.
export const PURCHASE_MILESTONE_MULTIPLIER_BASE = 2
// Every 10th such block (i.e. every 100th lifetime purchase) uses this larger multiplier instead
// of PURCHASE_MILESTONE_MULTIPLIER_BASE for that one block — a bigger milestone every 100
// purchases on top of the regular one every 10 (see engine.js's getPurchaseMilestoneMultiplier).
export const PURCHASE_MILESTONE_MEGA_MULTIPLIER_BASE = 10

// Each unspent Prestige Point adds a flat 1% production-speed bonus, uniformly across every
// tier (see engine.js's getPrestigeProductionMultiplier) — replaces the old "prestige level
// doubles production" mechanic. Spending points on autobuyer automation trades this bonus away.
// This bonus is inert until unlocked (see PRESTIGE_SPEED_BONUS_UNLOCK_COST below) — it no longer
// applies automatically just from holding points.
export const PRESTIGE_POINT_SPEED_BONUS = 0.01
// One-time PP cost to unlock the passive production-speed bonus above (see engine.js's
// buyPrestigeSpeedBonus) — before this is bought, unspent Prestige Points grant no production
// bonus at all, regardless of balance. Permanent once bought, like autobuyer automation/Smart/
// Auto-Prestige. The priciest of the four global PP automation unlocks (see AUTO_SPEED_UP_COST/
// TICKSPEED_AUTOBUYER_COST/AUTO_PRESTIGE_COST below), since it's a passive, always-on bonus rather
// than a one-shot action.
export const PRESTIGE_SPEED_BONUS_UNLOCK_COST = 10000
// Per-tier base cost for the tickspeed multiplier ladder (see engine.js's
// getTickspeedMultiplierBaseCost/getTickspeedMultiplierCost) — 10^10 for the first tier (index 0),
// decreasing by a power of ten per subsequent tier (10^9, 10^8, … 10^1 for the 10th/last tier).
// Reaching level L on a tier costs this base raised to L. This ladder is Money-funded only (see
// buyTickspeedMultiplier) — the separate PP-funded autobuyer unlock (see
// AUTOBUYER_UNLOCK_BASE_COST below) no longer reuses it.
export const TICKSPEED_MULTIPLIER_BASE_EXPONENT = 10
// Each tickspeed multiplier level compounds a tier's
// production by another 10% (see engine.js's getTickspeedProductionMultiplier) — the same 1.1x
// compounding rate that used to drive autobuyer purchase-attempt frequency before that effect was
// moved to production instead (see "Tickspeed multiplier" in CLAUDE.md).
export const TICKSPEED_PRODUCTION_STEP = 0.1
// PP cost to permanently unlock the first tier's autobuyer (see engine.js's
// getAutobuyerUnlockCost) — a flat, small per-tier increment (not a power-of-ten ladder like the
// tickspeed multiplier above): 1 PP for the first tier, up through 10 PP for the 10th/last tier.
export const AUTOBUYER_UNLOCK_BASE_COST = 1
// The "smart" autobuyer (see engine.js's getSmartAutobuyerCost/buySmartAutobuyer) costs this many
// times more PP than unlocking that same tier's autobuyer (getAutobuyerUnlockCost) — 10 PP through
// 100 PP across the ten tiers.
export const SMART_AUTOBUYER_COST_MULTIPLIER = 10
// The per-tier tickspeed autobuyer (see engine.js's getTierTickspeedAutobuyerCost/
// buyTierTickspeedAutobuyer) — automates that tier's own Money-funded tickspeed multiplier —
// costs this many times more PP than unlocking that same tier's autobuyer
// (getAutobuyerUnlockCost): 2 PP through 20 PP across the ten tiers. Cheaper than Smart's 10x
// multiplier, since it only automates one additional purchase rather than the tier's whole buying
// cadence.
export const TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER = 2
// The global tickspeed multiplier (see engine.js's getGlobalTickspeedProductionMultiplier/
// buyGlobalTickspeedMultiplier) speeds up *every* tier's production at once — unlike the per-tier
// tickspeed multiplier, this is a single global upgrade track (mirroring Auto-Prestige's
// null/level pattern), not something bought separately per tier. Every level compounds this rate
// (1%) — the same ×1.01-per-level growth the design always had — except a milestone level (see
// GLOBAL_TICKSPEED_MILESTONE_STEP below) compounds by that larger rate instead, for that one level
// only.
export const GLOBAL_TICKSPEED_PRODUCTION_STEP = 0.01
// The compounding rate a *milestone* level of the global tickspeed multiplier uses in place of
// GLOBAL_TICKSPEED_PRODUCTION_STEP above (10% instead of the regular 1%, still multiplicative —
// see getGlobalTickspeedProductionMultiplier). Milestone *spacing* widens by a factor of ten every
// time the level crosses another power-of-ten range: every 10th level up to 100 (10, 20, …, 100),
// then every 100th level up to 1000 (200, 300, …, 1000), then every 1000th level up to 10000, and
// so on indefinitely (see getGlobalTickspeedProductionMultiplier's countGlobalTickspeedMilestones
// helper).
export const GLOBAL_TICKSPEED_MILESTONE_STEP = 0.10
// Base PP cost of Auto-Prestige's first level (see engine.js's getAutoPrestigeCost/
// buyAutoPrestige) — a single global upgrade track, not per-tier, so unlike the tier costs above
// it scales by level rather than by tier index; AUTO_PRESTIGE_COST_MULTIPLIER below doubles it
// each level. Priced above AUTO_SPEED_UP_COST (see below) since Auto-Prestige only ever fires
// once per run at most, versus Speed Up's much higher activation frequency.
export const AUTO_PRESTIGE_COST = 1000
// Auto-Prestige's cost doubles with each level purchased (see engine.js's getAutoPrestigeCost).
export const AUTO_PRESTIGE_COST_MULTIPLIER = 2
// Auto-Prestige's base check cadence at level 1: once unlocked, it attempts to prestige roughly
// this often (see engine.js's getAutoPrestigeAttemptRate) — only actually firing once Money has
// reached GOOGOL. Each level beyond the first speeds this up by 10%, compounding.
export const AUTO_PRESTIGE_BASE_INTERVAL_SECONDS = 1000
// Per-activation production-speed multiplier base for Speed Up (see engine.js's
// getSpeedUpMultiplier/speedUpGame) — production is multiplied by SPEED_UP_MULTIPLIER_BASE raised
// to state.speedUpCount, so each activation doubles it (1x, 2x, 4x, 8x, …). Unlike the Prestige
// Point speed bonus above, this is unconditional — no PP-spent unlock step, it applies as soon as
// speedUpCount > 0.
export const SPEED_UP_MULTIPLIER_BASE = 2
// One-time PP cost to permanently automate Speed Up (see engine.js's buyAutoSpeedUp) — once
// bought, tickGame triggers speedUpGame automatically the instant it's eligible, with no manual
// click needed. Cheaper than PRESTIGE_SPEED_BONUS_UNLOCK_COST/AUTO_PRESTIGE_COST since Speed Up
// itself fires far more often than either of those two over a run — but pricier than
// TICKSPEED_AUTOBUYER_COST below, since the global tickspeed multiplier it automates is a much
// smaller, earlier-game upgrade than Speed Up.
export const AUTO_SPEED_UP_COST = 100
// One-time PP cost to automate the (Money-funded) global tickspeed multiplier — once bought,
// tickGame calls buyGlobalTickspeedMultiplier automatically every tick, re-validating its own
// eligibility internally (see engine.js's buyTickspeedAutobuyer/tickGame). The cheapest of all
// four global PP automation unlocks (see PRESTIGE_SPEED_BONUS_UNLOCK_COST/AUTO_SPEED_UP_COST
// above and AUTO_PRESTIGE_COST below), since the global tickspeed multiplier it automates is a
// much smaller, earlier-game upgrade (unlocked as soon as the second tier is owned) than any of
// the actions those other three automate.
export const TICKSPEED_AUTOBUYER_COST = 20
// Whenever the last tier's currently-owned count is >= 10, its Money-funded tickspeed multiplier
// (see TICKSPEED_MULTIPLIER_BASE_EXPONENT/buyTickspeedMultiplier above) is replaced by an
// XP-funded one instead (see engine.js's isLastTierTickspeedXpUnlocked/
// getLastTierXpTickspeedMultiplier/consumeXpForLastTierTickspeed) — each XP ever consumed this way
// adds a flat, non-compounding LAST_TIER_XP_TICKSPEED_STEP (1%) to the last tier's own delivery
// frequency, permanently (this accumulated bonus is never lost, even while owned dips below 10 and
// the mechanic is temporarily disengaged). "Last tier" (not a hardcoded tier id) so this stays
// correct if TIER_DEFINITIONS ever grows a new final entry.
export const LAST_TIER_XP_TICKSPEED_STEP = 0.01
// Each single XP-consumption action must be at least this fraction of the cumulative XP already
// consumed this way (see engine.js's getLastTierXpTickspeedMinConsumption) — so repeat
// consumptions can't trickle in one XP at a time forever; the required minimum grows alongside
// however much has already been invested, mirroring the game's other escalating-cost patterns
// (getTierCost's epoch multiplier, getSpeedUpRequirement).
export const LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT = 0.1
// The very first consumption has cumulative XP consumed = 0, so
// LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_PERCENT alone would compute a minimum of 0 — this floor
// gives that first action (and any other case the percentage still rounds to 0) a real minimum of
// 1 XP instead.
export const LAST_TIER_XP_TICKSPEED_MIN_CONSUMPTION_FLOOR = 1
