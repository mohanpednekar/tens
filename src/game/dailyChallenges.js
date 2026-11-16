// Daily challenges (epic #1062). Pure state functions over `state.daily`
// (`{ runs: { [formatId]: run | null }, results: { [dateId]: { [formatId]: result } } }`).
//
// Each run is an isolated Factory-only game (`run.game`) with its own tier ladder, Clock Speed, Scale Up and
// Overclock — nothing leaks to or from the main save. A definition is derived on the device from (UTC date, format)
// with a seeded PRNG and has three seeded parts:
//   1. modified conditions — run-wide levers (`DAILY_MODIFIER_POOL`), carried on the run's game as `runLevers`;
//   2. seeded progress — the reference bot plays a seeded warm-up and the run starts right after its last
//      Scale Up / Overclock: the multipliers it built are kept, the ladder is fresh, nothing produces yet;
//   3. a seeded objective with a calculated target — what to do (earn Bytes, own a tier's units, complete levels
//      of a tier, reach a Clock Speed level, Overclock at a final-tier level: `DAILY_OBJECTIVE_KINDS`) is drawn
//      from the objectives the reference bot makes progress on, and how much is what the bot had reached at a
//      seeded moment inside the calibration band (after half the time limit, no later than the format's bot
//      ceiling), rounded down to a clean number.
// So the reference bot always wins in (limit / 2, botCeilingSeconds], and a run that never acts achieves nothing.
// Server time, fetched definitions, rewards, weekly/monthly milestones and streaks are later slices. Every
// function takes `nowMs` as an argument.
import {
  buyGlobalTickspeedMultiplier,
  buyTickspeedMultiplier,
  buyTierQuantity,
  consumeXpForLastTierTickspeed,
  createInitialGameState,
  formatAmount,
  getOverclockLevel,
  overclockGame,
  scaleUpGame,
  tickGame,
} from './engine'
import { BITS_PER_BYTE, DAILY_CHALLENGES_FEATURE, MONEY_ID, TIER_DEFINITIONS } from './layers'

// Bump whenever generator data or the reference bot changes; a run on another version is dropped.
export const DAILY_GENERATOR_VERSION = 2
export const DAILY_MAX_CREDITS = 4
// A run that hits its time limit short of the target still counts as completed past this share of the way (in
// powers of ten for the amount objectives, in levels for the level ones) to the target.
export const DAILY_COMPLETION_FLOOR = 0.5
// Candidates per (date, format) before the fixed known-good fallback (no modifiers, no head start) is used.
export const DAILY_MAX_GENERATION_ATTEMPTS = 8
// Candidates whose bot reaches past this are rejected: a run must stay well clear of the 1 Googol Bytes freeze.
export const DAILY_MAX_TARGET_BYTES = 1e80
const WARMUP_STEP_SECONDS = 30
const BOT_MAX_PASSES = 20
const BUY_ALL = Number.MAX_SAFE_INTEGER

// `stepSeconds`: a run advances in whole steps of this size, live and in the reference simulation alike, so the
// calibration is exact. `botCeilingSeconds` (internal, never shown to players): the reference bot must win by
// then, and no sooner than half the limit. `warmupSeconds`: seeded head-start range. `startExponent`: range of the
// power of ten in the seeded starting balance (DAILY_START_MANTISSAS value × 10^n Bytes, re-granted by every
// soft reset).
export const DAILY_FORMATS = [
  { id: '10m', label: '10 minutes', seconds: 600, stepSeconds: 1, botCeilingSeconds: 540, style: 'Hands-on: every second counts', warmupSeconds: [14400, 21600], startExponent: [3, 9], modifierCount: [1, 2] },
  { id: '1h', label: '1 hour', seconds: 3600, stepSeconds: 5, botCeilingSeconds: 3000, style: 'Steady: check in now and then', warmupSeconds: [7200, 14400], startExponent: [3, 9], modifierCount: [1, 2] },
  { id: '10h', label: '10 hours', seconds: 36000, stepSeconds: 30, botCeilingSeconds: 28800, style: 'Passive: a few well-timed decisions', warmupSeconds: [0, 3600], startExponent: [3, 8], modifierCount: [1, 2] },
]
export const DAILY_START_MANTISSAS = [1, 2, 5]
export const DAILY_FORMAT_BY_ID = Object.fromEntries(DAILY_FORMATS.map(format => [format.id, format]))

// Modified conditions: each challenge draws `modifierCount` distinct levers and one value for each. The levers are
// the engine's run-wide challenge levers (`getChallengeLever`).
export const DAILY_MODIFIER_POOL = [
  { lever: 'production', values: [0.25, 0.5, 2, 4], describe: value => `Production ×${value}` },
  { lever: 'clockSpeedPower', values: [0.5, 0.75, 1.5, 2], describe: value => `Clock Speed ^${value}` },
  { lever: 'scaleUpPower', values: [0.5, 0.75, 1.5, 2], describe: value => `Scale Up ^${value}` },
  { lever: 'costMultiplier', values: [0.1, 0.5, 5, 25], describe: value => `Costs ×${value}` },
]

export const getUtcDateId = nowMs => new Date(nowMs).toISOString().slice(0, 10)

// Milliseconds until the next UTC midnight.
export const getMsUntilNextUtcDay = nowMs => {
  const date = new Date(nowMs)
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1) - nowMs
}

const hashString = text => {
  let hash = 2166136261
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

// mulberry32: tiny deterministic PRNG.
const createRng = seed => {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const pickInt = (rng, [min, max]) => min + Math.floor(rng() * (max - min + 1))

// --- Run game primitives (shared by live play and the reference simulation) ---

const withLevers = (game, levers) => (game.runLevers === levers ? game : { ...game, runLevers: levers })
const getStartBits = def => def.startBytes * BITS_PER_BYTE

// One step of production. Returns the new game and the Bits it produced.
const stepRunGame = (game, def, stepSeconds) => {
  const before = game.resources[MONEY_ID] ?? 0
  const next = withLevers(tickGame(stepSeconds, 1)(game), def.levers)
  return [next, Math.max(0, (next.resources[MONEY_ID] ?? 0) - before)]
}

// A Factory engine action on a run's game; the same reference comes back when it does nothing. `reseed` (Scale Up /
// Overclock soft resets): a run has no Foundry to refill the wiped balance, so the reset grants the starting
// balance again — the multipliers it earns are the point.
const applyRunAction = (game, def, action, reseed = false) => {
  const acted = action(game)
  if (acted === game) return game
  const next = withLevers(acted, def.levers)
  return reseed ? { ...next, resources: { ...next.resources, [MONEY_ID]: getStartBits(def) } } : next
}

// Every Factory action a run accepts (the same ones the Factory page offers): `make(arg)` builds the engine action.
// `reseed` marks the soft resets that wipe the balance.
const RUN_ACTIONS = {
  buyTier: { make: tierId => buyTierQuantity(tierId, BUY_ALL) },
  tierTickspeed: { make: tierId => buyTickspeedMultiplier(tierId) },
  clockSpeed: { make: () => buyGlobalTickspeedMultiplier },
  scaleUp: { make: () => scaleUpGame, reseed: true },
  overclock: { make: () => overclockGame, reseed: true },
  restage: { make: amount => consumeXpForLastTierTickspeed(amount), reseed: true },
}

// --- Objectives ---

// Everything a run can be asked to do. A run tracks one number per objective key (`run.metrics`): Bytes earned,
// and the peak this run of each tier's owned units, each tier's completed levels, the Clock Speed level, and the
// final-tier completed level an Overclock was claimed at. `amount` kinds grow by orders of magnitude (targets are
// rounded to few significant digits, progress is in powers of ten); the others are whole levels.
const LAST_TIER = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
export const DAILY_OBJECTIVE_KINDS = {
  earn: { weight: 2, amount: true, describe: target => `Earn ${formatAmount(target)} B` },
  own: { weight: 1, amount: true, perTier: true, describe: (target, tier) => `Own ${formatAmount(target)} ${tier.name}` },
  levels: { weight: 1, perTier: true, describe: (target, tier) => `Complete ${target} level${target === 1 ? '' : 's'} of ${tier.name}` },
  clock: { weight: 2, describe: target => `Reach Clock Speed level ${target}` },
  overclock: { weight: 3, describe: target => `Overclock at ${target} ${LAST_TIER.symbol} levels` },
}
const OBJECTIVES = Object.entries(DAILY_OBJECTIVE_KINDS).flatMap(([kind, entry]) => (entry.perTier
  ? TIER_DEFINITIONS.map(tier => ({ key: `${kind}:${tier.id}`, kind, tier, ...entry }))
  : [{ key: kind, kind, ...entry }]))
const OBJECTIVE_BY_KEY = Object.fromEntries(OBJECTIVES.map(objective => [objective.key, objective]))
const ZERO_METRICS = Object.fromEntries(OBJECTIVES.map(objective => [objective.key, 0]))

const readMetrics = (game, earnedBits, previous) => {
  const next = { ...previous, earn: earnedBits / BITS_PER_BYTE, clock: Math.max(previous.clock, game.globalTickspeedMultiplier ?? 0) }
  for (const tier of TIER_DEFINITIONS) {
    next[`own:${tier.id}`] = Math.max(previous[`own:${tier.id}`], game.owned?.[tier.id] ?? 0)
    next[`levels:${tier.id}`] = Math.max(previous[`levels:${tier.id}`], (game.purchaseLevels?.[tier.id] ?? 1) - 1)
  }
  return next
}

// --- Tracked play: `{ game, earnedBits, metrics }`, advanced the same way live and in the simulation ---

const trackStep = (tracked, def, stepSeconds) => {
  const [game, gained] = stepRunGame(tracked.game, def, stepSeconds)
  const earnedBits = tracked.earnedBits + gained
  return { game, earnedBits, metrics: readMetrics(game, earnedBits, tracked.metrics) }
}

// One `RUN_ACTIONS` action; the same reference comes back when it does nothing.
const trackAction = (tracked, def, actionName, arg) => {
  const entry = RUN_ACTIONS[actionName]
  const game = applyRunAction(tracked.game, def, entry.make(arg), entry.reseed)
  if (game === tracked.game) return tracked
  const metrics = readMetrics(game, tracked.earnedBits, tracked.metrics)
  if (actionName === 'overclock') metrics.overclock = Math.max(metrics.overclock, getOverclockLevel(game) ?? 0)
  return { game, earnedBits: tracked.earnedBits, metrics }
}

// Reference bot: between steps it takes everything on offer — Clock Speed, tiers top-down, Scale Up,
// Overclock — until nothing changes (per-tier tickspeed and Restage are left alone: taking tickspeed greedily made
// no measurable difference in the sweep). `[actionName, arg]` pairs, exported so tests can replay it through
// the public run action.
const TIER_IDS_TOP_DOWN = TIER_DEFINITIONS.map(tier => tier.id).reverse()
export const DAILY_BOT_ACTION_ORDER = [
  ['clockSpeed'],
  ...TIER_IDS_TOP_DOWN.map(tierId => ['buyTier', tierId]),
  ['scaleUp'],
  ['overclock'],
]
const botAct = (tracked, def, onReset) => {
  let current = tracked
  for (let pass = 0; pass < BOT_MAX_PASSES; pass++) {
    let next = current
    for (const [actionName, arg] of DAILY_BOT_ACTION_ORDER) {
      const acted = trackAction(next, def, actionName, arg)
      if (RUN_ACTIONS[actionName].reseed && acted !== next) onReset?.(acted.game)
      next = acted
    }
    if (next === current) break
    current = next
  }
  return current
}

// Bot play from `game`. `series[i]` = the metrics at time i steps, after the bot has acted there (index 0 = its
// opening moves) — the moment a live player who acts right after each step would be measured.
const simulateBot = (game, def, stepSeconds, steps, onReset) => {
  let tracked = botAct({ game, earnedBits: 0, metrics: ZERO_METRICS }, def, onReset)
  const series = [tracked.metrics]
  for (let i = 0; i < steps; i++) {
    tracked = botAct(trackStep(tracked, def, stepSeconds), def, onReset)
    series.push(tracked.metrics)
  }
  return series
}

// Largest number with `digits` significant digits that is ≤ value.
const floorToSignificant = (value, digits) => {
  if (!(value > 0)) return 0
  const unit = 10 ** (Math.floor(Math.log10(value)) - digits + 1)
  let rounded = Math.floor(value / unit) * unit
  while (rounded > value) rounded -= unit
  return rounded
}

const describeHeadStart = game => ({
  scaleUps: Math.max(0, ...Object.values(game.scaleUpTierCounts ?? {})),
  overclock: getOverclockLevel(game) ?? 0,
})

// The target for one objective from the bot's play: what it had reached at `targetStep`, rounded down for the amount
// kinds, provided that is more than it had at half the limit. Null when the bot made no such progress.
const calculateTarget = (objective, atHalf, atTarget) => {
  if (!objective.amount) return atTarget > atHalf ? atTarget : null
  for (let digits = 1; digits <= 4; digits++) {
    const rounded = floorToSignificant(atTarget, digits)
    if (rounded > atHalf) return rounded
  }
  return null
}

// One candidate (`attempt`: retry index, or 'fallback' for the fixed known-good definition). Returns
// `{ def, startGame, validation }`, or null when the bot makes no new progress inside the band on any objective
// or overshoots the cap. Exported for tests and scripts/simulate-daily-challenges.mjs.
export const buildDailyCandidate = (dateId, formatId, attempt) => {
  const format = DAILY_FORMAT_BY_ID[formatId]
  const fallback = attempt === 'fallback'
  const seed = hashString(`${dateId}|${formatId}|v${DAILY_GENERATOR_VERSION}|${attempt}`)
  const rng = createRng(seed)

  // Seeded starting balance: 1, 2 or 5 × a seeded power of ten (the fallback uses a plain 10,000 B).
  const startBytes = fallback ? 1e4 : DAILY_START_MANTISSAS[Math.floor(rng() * DAILY_START_MANTISSAS.length)] * 10 ** pickInt(rng, format.startExponent)
  const modifiers = []
  if (!fallback) {
    const pool = [...DAILY_MODIFIER_POOL]
    const count = pickInt(rng, format.modifierCount)
    for (let i = 0; i < count; i++) {
      const [entry] = pool.splice(Math.floor(rng() * pool.length), 1)
      modifiers.push({ lever: entry.lever, value: entry.values[Math.floor(rng() * entry.values.length)] })
    }
  }
  const levers = Object.fromEntries(modifiers.map(modifier => [modifier.lever, modifier.value]))
  const warmupSeconds = fallback ? 0 : pickInt(rng, format.warmupSeconds.map(seconds => seconds / WARMUP_STEP_SECONDS)) * WARMUP_STEP_SECONDS
  const stepsHalf = format.seconds / 2 / format.stepSeconds
  const stepsCeiling = format.botCeilingSeconds / format.stepSeconds
  // The moment the bot's progress is read for the target: after half the limit, up to the ceiling.
  const targetStep = fallback ? stepsCeiling : stepsHalf + 1 + Math.floor(rng() * (stepsCeiling - stepsHalf))

  const def = {
    dateId,
    formatId,
    seed,
    generatorVersion: DAILY_GENERATOR_VERSION,
    limitSeconds: format.seconds,
    stepSeconds: format.stepSeconds,
    startBytes, // starting balance in Bytes, granted again by every soft reset
    levers,
    conditions: modifiers.map(modifier => DAILY_MODIFIER_POOL.find(entry => entry.lever === modifier.lever).describe(modifier.value)),
  }
  const fresh = createInitialGameState()
  fresh.resources = { ...fresh.resources, [MONEY_ID]: getStartBits(def) }
  // Head start: the state right after the warm-up's last soft reset (the fresh state when it never reset).
  let startGame = withLevers(fresh, levers)
  const keepReset = game => { startGame = game }
  const warmupStart = startGame
  simulateBot(warmupStart, def, WARMUP_STEP_SECONDS, warmupSeconds / WARMUP_STEP_SECONDS, keepReset)

  const series = simulateBot(startGame, def, format.stepSeconds, targetStep)
  // Rejected: the run would brush the Purge freeze.
  if (series[targetStep].earn > DAILY_MAX_TARGET_BYTES) return null
  // Every objective the bot advanced inside the band, with its calculated target; one is drawn by weight.
  const viable = OBJECTIVES
    .filter(objective => !fallback || objective.key === 'earn')
    .map(objective => ({ objective, target: calculateTarget(objective, series[stepsHalf][objective.key], series[targetStep][objective.key]) }))
    .filter(option => option.target !== null)
  if (viable.length === 0) return null
  let pick = rng() * viable.reduce((sum, option) => sum + option.objective.weight, 0)
  const chosen = viable.find(option => (pick -= option.objective.weight) < 0) ?? viable[viable.length - 1]
  const { objective, target } = chosen

  return {
    def: {
      ...def,
      objective: { key: objective.key, kind: objective.kind, target, label: objective.describe(target, objective.tier) },
      headStart: describeHeadStart(startGame),
    },
    startGame,
    validation: {
      attempt,
      warmupSeconds,
      botSeconds: series.findIndex(metrics => metrics[objective.key] >= target) * format.stepSeconds,
    },
  }
}

const generated = new Map()
const generate = (dateId, formatId) => {
  const key = `${dateId}|${formatId}`
  let entry = generated.get(key)
  if (!entry) {
    for (let attempt = 0; attempt < DAILY_MAX_GENERATION_ATTEMPTS && !entry; attempt++) entry = buildDailyCandidate(dateId, formatId, attempt)
    entry ??= buildDailyCandidate(dateId, formatId, 'fallback')
    if (generated.size > 64) generated.clear()
    generated.set(key, entry)
  }
  return entry
}

// Same (dateId, formatId, version) → deeply equal definition. No Math.random, no Date. Memoised (it simulates).
export const generateDailyChallenge = (dateId, formatId) => generate(dateId, formatId).def
// Developer-only record of how a definition was validated (retry index, warm-up, the bot's winning time).
export const getDailyChallengeValidation = (dateId, formatId) => generate(dateId, formatId).validation

// Reachable once the save has completed its first Purge (a Reboot resets the Purge count but keeps the unlock), and only while the rollout switch is on.
export const isDailyChallengesAvailable = state =>
  DAILY_CHALLENGES_FEATURE.enabled && ((state.purge?.count ?? 0) >= 1 || (state.era?.count ?? 0) >= 1)

const getRunValue = run => run.metrics?.[run.def.objective?.key] ?? 0
const isRunWon = run => getRunValue(run) >= run.def.objective?.target

// Share of the way to the target: in powers of ten for the amount objectives, in levels for the others.
export const getRunProgress = run => {
  const objective = run.def.objective
  if (!objective) return 0
  const value = getRunValue(run)
  if (value >= objective.target) return 1
  if (!OBJECTIVE_BY_KEY[objective.key]?.amount) return Math.max(0, value / objective.target)
  const high = Math.log10(Math.max(1, objective.target))
  return high > 0 ? Math.min(1, Math.max(0, Math.log10(Math.max(1, value)) / high)) : 0
}

const setRun = (state, formatId, run) => ({
  ...state,
  daily: { ...state.daily, runs: { ...state.daily.runs, [formatId]: run } },
})

// Settles a run when its target is reached (won) or its limit passed (completed past the floor, else expired).
const settleRun = (state, formatId, finishedMs) => {
  const run = state.daily.runs[formatId]
  if (!run) return state
  const won = isRunWon(run)
  const timedOut = run.simSeconds >= run.def.limitSeconds
  if (!won && !timedOut) return state

  const completed = won || getRunProgress(run) >= DAILY_COMPLETION_FLOOR
  const previous = state.daily.results[run.def.dateId]?.[formatId] ?? { won: false, completed: false, bestSeconds: null, attempts: 0 }
  const bestSeconds = won
    ? (previous.bestSeconds === null ? run.simSeconds : Math.min(previous.bestSeconds, run.simSeconds))
    : previous.bestSeconds
  const result = {
    won: previous.won || won,
    completed: previous.completed || completed,
    bestSeconds,
    attempts: previous.attempts + 1,
    lastOutcome: won ? 'won' : completed ? 'completed' : 'expired',
    lastFinishedAt: finishedMs,
  }
  const next = setRun(state, formatId, null)
  return {
    ...next,
    daily: {
      ...next.daily,
      results: { ...next.daily.results, [run.def.dateId]: { ...next.daily.results[run.def.dateId], [formatId]: result } },
    },
  }
}

// A run of this format may only start for the current UTC date and when none of that format is active.
export const startDailyRun = (formatId, nowMs) => state => {
  if (!isDailyChallengesAvailable(state) || !DAILY_FORMAT_BY_ID[formatId] || state.daily.runs[formatId]) return state
  const { def, startGame } = generate(getUtcDateId(nowMs), formatId)
  return setRun(state, formatId, {
    def,
    game: startGame,
    startedAt: nowMs,
    lastTickAt: nowMs,
    simSeconds: 0,
    earnedBits: 0,
    metrics: ZERO_METRICS,
  })
}

export const forfeitDailyRun = formatId => state =>
  state.daily.runs[formatId] ? setRun(state, formatId, null) : state

// Restart is allowed only while the run's originating UTC date is still current (checked at commit time);
// otherwise the same state reference comes back and the run is untouched.
export const canRestartDailyRun = (state, formatId, nowMs) => {
  const run = state.daily.runs[formatId]
  return Boolean(run) && run.def.dateId === getUtcDateId(nowMs)
}

export const restartDailyRun = (formatId, nowMs) => state => {
  if (!canRestartDailyRun(state, formatId, nowMs)) return state
  return startDailyRun(formatId, nowMs)(forfeitDailyRun(formatId)(state))
}

// Advances every active run by the whole steps of real time since its last tick (never past its limit), then
// settles it. Time short of a whole step is carried over to the next call.
export const tickDailyRuns = nowMs => state => {
  let next = state
  for (const format of DAILY_FORMATS) {
    const run = next.daily?.runs?.[format.id]
    if (!run) continue
    if (run.def.generatorVersion !== DAILY_GENERATOR_VERSION) {
      next = setRun(next, format.id, null) // a run from another generator can't be played by this one
      continue
    }
    const { stepSeconds, limitSeconds } = run.def
    const stepsLeft = Math.max(0, Math.round((limitSeconds - run.simSeconds) / stepSeconds))
    const stepsDue = Math.min(stepsLeft, Math.max(0, Math.floor((nowMs - run.lastTickAt) / 1000 / stepSeconds)))
    // A device clock that went backwards restarts the wait from now.
    const lastTickAt = nowMs < run.lastTickAt ? nowMs : run.lastTickAt + stepsDue * stepSeconds * 1000
    if (stepsDue === 0 && lastTickAt === run.lastTickAt && stepsLeft > 0) continue
    let tracked = { game: run.game, earnedBits: run.earnedBits, metrics: run.metrics }
    let stepsDone = 0
    while (stepsDone < stepsDue) {
      tracked = trackStep(tracked, run.def, stepSeconds)
      stepsDone++
      // Settle at the step that crosses the target, so the recorded time doesn't depend on when the player returns.
      if (tracked.metrics[run.def.objective.key] >= run.def.objective.target) break
    }
    next = settleRun(
      setRun(next, format.id, { ...run, ...tracked, lastTickAt, simSeconds: run.simSeconds + stepsDone * stepSeconds }),
      format.id,
      nowMs,
    )
  }
  return next
}

// Applies one Factory action (`RUN_ACTIONS` name + argument) to a run's own game, then settles the run if that
// action met its objective (a level bought, an Overclock claimed).
export const playDailyRun = (formatId, actionName, arg, nowMs) => state => {
  if (!Object.hasOwn(RUN_ACTIONS, actionName)) return state
  // Catch the run up (and settle it) through the action's timestamp first, so a purchase can't retroactively
  // speed up a gap that already ended the run.
  const caught = tickDailyRuns(nowMs)(state)
  const run = caught.daily.runs[formatId]
  if (!run) return caught
  const before = { game: run.game, earnedBits: run.earnedBits, metrics: run.metrics }
  const tracked = trackAction(before, run.def, actionName, arg)
  return tracked === before ? caught : settleRun(setRun(caught, formatId, { ...run, ...tracked }), formatId, nowMs)
}

// Credits for one UTC date: 1 per distinct format won + 1 once for any won/completed run. Max 4.
export const getDailyCredits = (state, dateId) => {
  const day = Object.values(state.daily?.results?.[dateId] ?? {})
  const wins = day.filter(result => result.won).length
  const participation = day.some(result => result.won || result.completed) ? 1 : 0
  return { wins, participation, total: wins + participation }
}
