// Every tier is bought directly with Ones (Money); production cascades down
// through `producesResourceId` into the tier below's owned/resource count.
// `id` is a naming-agnostic key (tier01…tier10), decoupled from `name`/`symbol`
// so a future re-theme never has to touch state keys, tests, or save data.
// 'tier01' intentionally has costResourceId === producesResourceId: it is the
// entry-level money generator, bought with Ones to produce more Ones.
// `baseTickSpeedSeconds` is each tier's own independent base production cadence, in seconds (see
// getTierBaseTickSpeedSeconds/tickGame in engine.js) — a plain per-tier field, not derived from
// tier order, so any single tier's cadence can be tuned or upgraded directly without touching a
// shared formula or any other tier.
export const TIER_DEFINITIONS = [
  { id: 'tier01', name: 'Tens',          symbol: 'Tens', baseCost: 10,   costResourceId: 'Ones', producesResourceId: 'Ones',   baseTickSpeedSeconds: 1 },
  { id: 'tier02', name: 'Thousands',     symbol: 'Ks',   baseCost: 1E3,  costResourceId: 'Ones', producesResourceId: 'tier01', baseTickSpeedSeconds: 2 },
  { id: 'tier03', name: 'Millions',      symbol: 'Ms',   baseCost: 1E6,  costResourceId: 'Ones', producesResourceId: 'tier02', baseTickSpeedSeconds: 3 },
  { id: 'tier04', name: 'Billions',      symbol: 'Bs',   baseCost: 1E9,  costResourceId: 'Ones', producesResourceId: 'tier03', baseTickSpeedSeconds: 4 },
  { id: 'tier05', name: 'Trillions',     symbol: 'Ts',   baseCost: 1E12, costResourceId: 'Ones', producesResourceId: 'tier04', baseTickSpeedSeconds: 5 },
  { id: 'tier06', name: 'Quadrillions',  symbol: 'Qs',   baseCost: 1E15, costResourceId: 'Ones', producesResourceId: 'tier05', baseTickSpeedSeconds: 6 },
  { id: 'tier07', name: 'Pentillions',   symbol: 'Ps',   baseCost: 1E18, costResourceId: 'Ones', producesResourceId: 'tier06', baseTickSpeedSeconds: 7 },
  { id: 'tier08', name: 'Hexillions',    symbol: 'Hs',   baseCost: 1E21, costResourceId: 'Ones', producesResourceId: 'tier07', baseTickSpeedSeconds: 8 },
  { id: 'tier09', name: 'Septillions',   symbol: 'Ss',   baseCost: 1E24, costResourceId: 'Ones', producesResourceId: 'tier08', baseTickSpeedSeconds: 9 },
  { id: 'tier10', name: 'Octillions',    symbol: 'Os',   baseCost: 1E27, costResourceId: 'Ones', producesResourceId: 'tier09', baseTickSpeedSeconds: 10 },
]


export const RESOURCE_SYMBOL = tierId => TIER_DEFINITIONS.find(t => t.id === tierId)?.symbol || '$'

// How often (in seconds) a tier's production is delivered as a single batch rather than
// continuously every global 1s tick (see engine.js's tickGame / tierProductionAccumulators) —
// simply reads that tier's own independent baseTickSpeedSeconds field above. Balance-neutral: a
// tier still produces the exact same total amount over time, it's just delivered every N seconds
// instead of continuously. An unrecognized tier id falls back to 1s rather than throwing.
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

// Each unspent Prestige Point adds a flat 1% production-speed bonus, uniformly across every
// tier (see engine.js's getPrestigeProductionMultiplier) — replaces the old "prestige level
// doubles production" mechanic. Spending points on autobuyer automation trades this bonus away.
export const PRESTIGE_POINT_SPEED_BONUS = 0.01
// PP cost to permanently automate the first tier's autobuyer Upgrades (see engine.js's
// getAutobuyerAutomationCost) — doubles for each subsequent tier.
export const AUTOBUYER_AUTOMATION_BASE_COST = 1
// The "smart" autobuyer (see engine.js's getSmartAutobuyerCost/buySmartAutobuyer) costs this many
// times more PP than automating that same tier's autobuyer Upgrades.
export const SMART_AUTOBUYER_COST_MULTIPLIER = 10
// Base PP cost of Auto-Prestige's first level (see engine.js's getAutoPrestigeCost/
// buyAutoPrestige) — a single global upgrade track, not per-tier, so unlike the tier costs above
// it scales by level rather than by tier index; AUTO_PRESTIGE_COST_MULTIPLIER below doubles it
// each level.
export const AUTO_PRESTIGE_COST = 100
// Auto-Prestige's cost doubles with each level purchased (see engine.js's getAutoPrestigeCost).
export const AUTO_PRESTIGE_COST_MULTIPLIER = 2
// Auto-Prestige's base check cadence at level 1: once unlocked, it attempts to prestige roughly
// this often (see engine.js's getAutoPrestigeAttemptRate) — only actually firing once Money has
// reached GOOGOL. Each level beyond the first speeds this up by 10%, compounding.
export const AUTO_PRESTIGE_BASE_INTERVAL_SECONDS = 1000
