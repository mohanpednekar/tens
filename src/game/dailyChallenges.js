// Daily challenges (epic #1062). Pure state functions over `state.daily`
// (`{ runs: { [formatId]: run | null }, results: { [dateId]: { [formatId]: result } } }`).
//
// Each run is an isolated Factory-only game (`run.game`) with its own tier ladder, Accelerate, Scale Up and
// Overclock — nothing leaks to or from the main save. A definition is derived on the device from (UTC date, format)
// with a seeded PRNG and has these seeded parts:
//   1. modified conditions — run-wide levers (`DAILY_MODIFIER_POOL`), carried on the run's game as `runLevers`;
//   2. seeded progress — the reference bot plays a seeded warm-up and the run starts right after its last
//      Scale Up / Overclock: the multipliers it built are kept, the ladder is fresh, nothing produces yet;
//   3. a seeded objective with a calculated target — what to do (reach a balance, own a tier's units, complete levels
//      of a tier, reach an Accelerate level, Overclock at a final-tier level: `DAILY_OBJECTIVE_KINDS`) is drawn
//      from the objectives the reference bot makes progress on, and how much is what the bot had reached at a
//      seeded moment inside the calibration band (after half the time limit, no later than the format's bot
//      ceiling), rounded down to a clean number.
//   4. automations — real engine automations inside the run, by format (`automations` in DAILY_FORMATS): a seeded
//      mix in the 10-minute run, buying only in the 1-hour run, everything in the 10-hour run. The run offers a
//      switch for each one it has.
// The reference bot plays every step in the 10-minute and 1-hour runs; in the 10-hour run it only acts at
// check-ins `checkInSeconds` apart, where it holds or releases the Scale Up / Overclock automations.
// It always wins in [limit / 2, botCeilingSeconds] — a candidate outside that band is discarded and regenerated —
// and a run nobody touches reaches neither the target nor the lower attempt mark that counts a run as attempted.
// Nothing here reads the player's main save: a definition and its starting state depend only on (date, format,
// version), so every player gets the same challenge.
// Server time, fetched definitions, rewards, weekly/monthly milestones and streaks are later slices. Every
// function takes `nowMs` as an argument.
import {
  buyGlobalTickspeedMultiplier,
  buyTickspeedMultiplier,
  buyTierQuantity,
  restageManually,
  createInitialGameState,
  formatAmount,
  getOverclockLevel,
  mergeRunPeaks,
  overclockGame,
  scaleUpGame,
  setAutoGlobalTickspeedEnabled,
  setAutoOverclockEnabled,
  setAutoScaleUpEnabled,
  setAutoXpTickspeedEnabled,
  setAutobuyerEnabled,
  setTierTickspeedAutobuyerEnabled,
  tickGame,
} from './engine'
import { BITS_PER_BYTE, DAILY_CHALLENGES_FEATURE, MONEY_ID, TIER_DEFINITIONS } from './layers'

// Bump whenever generator data, the reference bot, or the engine behavior the generator simulates (e.g. the order
// automations run in within a tick) changes; a run on another version is dropped.
export const DAILY_GENERATOR_VERSION = 9
export const DAILY_MAX_CREDITS = 4
// Candidates per (date, format) before the fixed known-good fallback (no modifiers, no head start) is used.
export const DAILY_MAX_GENERATION_ATTEMPTS = 8
// Candidates whose bot's balance reaches past this are rejected: a run must stay well clear of the 1 Googol Bytes freeze.
export const DAILY_MAX_TARGET_BYTES = 1e80
const WARMUP_STEP_SECONDS = 30
const BOT_MAX_PASSES = 20
const BUY_ALL = Number.MAX_SAFE_INTEGER

// `stepSeconds`: a run advances in whole steps of this size, live and in the reference simulation alike, so the
// calibration is exact. `botCeilingSeconds` (internal, never shown to players): the reference bot must win by
// then, and no sooner than half the limit. `warmupSeconds`: seeded head-start range. `startExponent`: range of the
// power of ten in the seeded starting balance (DAILY_START_MANTISSAS value × 10^n Bytes, re-granted by every
// soft reset). `automations`: 'mix' = a seeded subset (never all, Kilobytes autobuyer always on), 'buying' = tier
// autobuyers + Auto Accelerate, 'all' = every automation. `checkInSeconds`: when set, the reference bot only acts
// at the start and every that many seconds (otherwise it acts every step). `startPaused`: automations the run
// has but that start switched off — releasing them is the player's decision.
export const DAILY_FORMATS = [
  { id: '10m', label: '10 minutes', seconds: 600, stepSeconds: 1, botCeilingSeconds: 540, style: 'Hands-on: every second counts', warmupSeconds: [14400, 21600], startExponent: [3, 9], modifierCount: [1, 2], automations: 'mix', checkInSeconds: null },
  { id: '1h', label: '1 hour', seconds: 3600, stepSeconds: 5, botCeilingSeconds: 3000, style: 'Steady: check in now and then', warmupSeconds: [7200, 14400], startExponent: [3, 9], modifierCount: [1, 2], automations: 'buying', checkInSeconds: null },
  { id: '10h', label: '10 hours', seconds: 36000, stepSeconds: 120, botCeilingSeconds: 28800, style: 'Passive: a few well-timed decisions', warmupSeconds: [0, 3600], startExponent: [3, 8], modifierCount: [1, 2], automations: 'all', startPaused: ['scaleUp', 'restage', 'overclock'], checkInSeconds: 12600 },
]
export const DAILY_START_MANTISSAS = [1, 2, 5]
export const DAILY_FORMAT_BY_ID = Object.fromEntries(DAILY_FORMATS.map(format => [format.id, format]))

// Modified conditions: each challenge draws `modifierCount` distinct levers and one value for each. The levers are
// the engine's run-wide challenge levers (`getChallengeLever`).
export const DAILY_MODIFIER_POOL = [
  { lever: 'production', values: [0.25, 0.5, 2, 4], describe: value => `Production ×${value}` },
  { lever: 'clockSpeedPower', values: [0.5, 0.75, 1.5, 2], describe: value => `Accelerate ^${value}` },
  { lever: 'scaleUpPower', values: [0.5, 0.75, 1.5, 2], describe: value => `Scale Up ^${value}` },
  { lever: 'costMultiplier', values: [0.1, 0.5, 5, 25], describe: value => `Costs ×${value}` },
]

// Every automation a run can carry — the engine's own (unlock flag + pause preference), so they behave exactly as
// in the main game. `group`: 'buy' (a tier's autobuyer), 'tickspeed' (a tier's tickspeed autobuyer), 'global'.
export const DAILY_AUTOMATIONS = [
  ...TIER_DEFINITIONS.map(tier => ({
    key: `buy:${tier.id}`, group: 'buy', label: tier.symbol,
    unlock: game => ({ ...game, autobuyers: { ...game.autobuyers, [tier.id]: 1 } }),
    set: enabled => setAutobuyerEnabled(tier.id, enabled),
    isOn: game => game.autobuyersEnabled?.[tier.id] ?? true,
  })),
  ...TIER_DEFINITIONS.map(tier => ({
    key: `tickspeed:${tier.id}`, group: 'tickspeed', label: tier.symbol,
    unlock: game => ({ ...game, tierTickspeedAutobuyer: { ...game.tierTickspeedAutobuyer, [tier.id]: true } }),
    set: enabled => setTierTickspeedAutobuyerEnabled(tier.id, enabled),
    isOn: game => game.tierTickspeedAutobuyerEnabled?.[tier.id] ?? true,
  })),
  { key: 'speedUp', group: 'global', label: 'Accelerate', unlock: game => ({ ...game, autoGlobalTickspeed: true }), set: setAutoGlobalTickspeedEnabled, isOn: game => game.autoGlobalTickspeedEnabled ?? true },
  { key: 'scaleUp', group: 'global', label: 'Scale Up', unlock: game => ({ ...game, autoScaleUp: true }), set: setAutoScaleUpEnabled, isOn: game => game.autoScaleUpEnabled ?? true },
  { key: 'restage', group: 'global', label: 'Restage', unlock: game => ({ ...game, autoXpTickspeed: true }), set: setAutoXpTickspeedEnabled, isOn: game => game.autoXpTickspeedEnabled ?? true },
  { key: 'overclock', group: 'global', label: 'Overclock', unlock: game => ({ ...game, autoOverclock: true }), set: setAutoOverclockEnabled, isOn: game => game.autoOverclockEnabled ?? true },
]
const AUTOMATION_BY_KEY = Object.fromEntries(DAILY_AUTOMATIONS.map(automation => [automation.key, automation]))
export const isDailyAutomationOn = (game, key) => Boolean(AUTOMATION_BY_KEY[key]?.isOn(game))

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

const pickAutomations = (rng, mode) => {
  const keys = DAILY_AUTOMATIONS.map(automation => automation.key)
  if (mode === 'all') return keys
  if (mode === 'buying') return keys.filter(key => key.startsWith('buy:') || key === 'speedUp')
  // 'mix': tier autobuyers one by one (Kilobytes always), the tickspeed autobuyers as a block, each global one.
  const tickspeed = rng() < 0.5
  const picked = keys.filter(key => {
    if (key === `buy:${TIER_DEFINITIONS[0].id}`) return true
    if (key.startsWith('buy:')) return rng() < 0.65
    if (key.startsWith('tickspeed:')) return tickspeed
    return rng() < 0.5
  })
  return picked.length === keys.length ? picked.filter(key => key !== 'scaleUp') : picked
}

// --- Run game primitives (shared by live play and the reference simulation) ---

const withLevers = (game, levers) => (game.runLevers === levers ? game : { ...game, runLevers: levers })
const getStartBits = def => def.startBytes * BITS_PER_BYTE
// Changes whenever a soft reset (Scale Up, Overclock, Restage) happened, claimed by hand or by an automation.
const getResetSignature = game => `${game.scaleUpCount ?? 0}|${game.overclockLastClaimCompletedLevels ?? ''}|${game.lastTierXpConsumed ?? 0}`

// Finishes any change to a run's game: keeps the levers attached and, after a soft reset, grants the starting
// balance again (a run has no Foundry to refill the wiped balance — the multipliers the reset earns are the point).
const settleGame = (before, after, def) => {
  const game = withLevers(after, def.levers)
  return getResetSignature(before) === getResetSignature(game)
    ? game
    : { ...game, resources: { ...game.resources, [MONEY_ID]: getStartBits(def) } }
}

// Every Factory action a run accepts (the ones the Factory page offers, plus the automation switches):
// `make(arg)` builds the engine action.
const RUN_ACTIONS = {
  buyTier: { make: tierId => buyTierQuantity(tierId, BUY_ALL) },
  tierTickspeed: { make: tierId => buyTickspeedMultiplier(tierId) },
  clockSpeed: { make: () => buyGlobalTickspeedMultiplier },
  scaleUp: { make: () => scaleUpGame },
  overclock: { make: () => overclockGame },
  restage: { make: amount => restageManually(amount) },
  // arg: { key, enabled } — pause or resume one of the run's automations.
  automation: { make: arg => (Object.hasOwn(AUTOMATION_BY_KEY, arg?.key ?? '') ? AUTOMATION_BY_KEY[arg.key].set(Boolean(arg.enabled)) : game => game) },
}

// --- Objectives ---

// Everything a run can be asked to do. A run tracks one number per objective key (`run.metrics`), each the peak
// this run: the balance in Bytes (not Bytes produced — autobuyers spend inside a step, so production is not
// observable from outside the engine), each tier's owned units, each tier's completed levels, the Accelerate level, and the
// final-tier completed level an Overclock was claimed at. `amount` kinds grow by orders of magnitude (targets are
// rounded to few significant digits, progress is in powers of ten); the others are whole levels.
const LAST_TIER = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1]
export const DAILY_OBJECTIVE_KINDS = {
  balance: { weight: 2, amount: true, describe: target => `Reach a balance of ${formatAmount(target)} B` },
  own: { weight: 1, amount: true, wholeUnits: true, perTier: true, describe: (target, tier) => `Own ${formatAmount(target)} ${tier.name}` },
  levels: { weight: 1, perTier: true, describe: (target, tier) => `Complete ${target} level${target === 1 ? '' : 's'} of ${tier.name}` },
  clock: { weight: 2, describe: target => `Reach Accelerate level ${target}` },
  overclock: { weight: 3, describe: target => `Overclock at ${target} ${LAST_TIER.symbol} levels` },
}
const OBJECTIVES = Object.entries(DAILY_OBJECTIVE_KINDS).flatMap(([kind, entry]) => (entry.perTier
  ? TIER_DEFINITIONS.map(tier => ({ key: `${kind}:${tier.id}`, kind, tier, ...entry }))
  : [{ key: kind, kind, ...entry }]))
const OBJECTIVE_BY_KEY = Object.fromEntries(OBJECTIVES.map(objective => [objective.key, objective]))
const ZERO_METRICS = Object.fromEntries(OBJECTIVES.map(objective => [objective.key, 0]))

// A run's game carries `runPeaks` (engine.js `mergeRunPeaks`): the highest balance, owned units, purchase levels
// and Accelerate level it has held — raised inside the engine's tick just before its reset automations, and
// here after every step and action, with the re-granted balance left out (see settleGame).
const EMPTY_PEAKS = { balance: 0, clock: 0, owned: {}, purchaseLevels: {} }
const withPeaks = (game, source = game) => ({ ...game, runPeaks: mergeRunPeaks(game.runPeaks ?? EMPTY_PEAKS, source) })

// The metrics of a game whose `runPeaks` are up to date. `before` is the game it came from: an Overclock claimed
// in between (by hand or by Auto Overclock) counts.
const readMetrics = (before, game, previous) => {
  const peaks = game.runPeaks
  const next = { ...previous, balance: Math.max(previous.balance, peaks.balance / BITS_PER_BYTE), clock: Math.max(previous.clock, peaks.clock) }
  for (const tier of TIER_DEFINITIONS) {
    next[`own:${tier.id}`] = Math.max(previous[`own:${tier.id}`], peaks.owned[tier.id] ?? 0)
    next[`levels:${tier.id}`] = Math.max(previous[`levels:${tier.id}`], (peaks.purchaseLevels[tier.id] ?? 1) - 1)
  }
  const overclock = getOverclockLevel(game) ?? 0
  if (overclock !== (getOverclockLevel(before) ?? 0)) next.overclock = Math.max(previous.overclock, overclock)
  return next
}

// --- Tracked play: `{ game, metrics }`, advanced the same way live and in the simulation ---

// One step of production and automation. `onReset(game)` hears about a soft reset.
const trackStep = (tracked, def, stepSeconds, onReset) => {
  const before = tracked.game
  // Peaks are taken from the ticked game (and, inside the tick, from just before any automatic reset) — before
  // settleGame re-grants a balance, so a granted balance is never mistaken for one the run built up.
  const ticked = withPeaks(tickGame(stepSeconds, BUY_ALL)(before))
  const game = settleGame(before, ticked, def)
  if (onReset && getResetSignature(before) !== getResetSignature(game)) onReset(game)
  return { game, metrics: readMetrics(before, game, tracked.metrics) }
}

// One `RUN_ACTIONS` action; the same reference comes back when it does nothing.
const trackAction = (tracked, def, actionName, arg, onReset) => {
  const before = tracked.game
  const acted = RUN_ACTIONS[actionName].make(arg)(before)
  if (acted === before) return tracked
  // A soft reset rebuilds the game and drops the peaks: carry them over, then raise them to the acted state.
  const game = settleGame(before, withPeaks({ ...acted, runPeaks: before.runPeaks }, acted), def)
  if (onReset && getResetSignature(before) !== getResetSignature(game)) onReset(game)
  return { game, metrics: readMetrics(before, game, tracked.metrics) }
}

// --- Reference bot ---

// The sweep: everything on offer — Accelerate, tiers top-down, Scale Up, Overclock — until nothing changes
// (per-tier tickspeed and Restage are left alone: taking tickspeed greedily made no measurable difference in the
// sweep). `[actionName, arg]` pairs, exported so tests can replay it through the public run action.
const TIER_IDS_TOP_DOWN = TIER_DEFINITIONS.map(tier => tier.id).reverse()
export const DAILY_BOT_ACTION_ORDER = [
  ['clockSpeed'],
  ...TIER_IDS_TOP_DOWN.map(tierId => ['buyTier', tierId]),
  ['scaleUp'],
  ['overclock'],
]
const sweep = (tracked, def, onReset) => {
  let current = tracked
  for (let pass = 0; pass < BOT_MAX_PASSES; pass++) {
    let next = current
    for (const [actionName, arg] of DAILY_BOT_ACTION_ORDER) next = trackAction(next, def, actionName, arg, onReset)
    if (next === current) break
    current = next
  }
  return current
}

// A run opens with fresh peaks taken from its starting state, so its starting balance is never progress and
// nothing reached before the run (the warm-up) counts.
const startPeaks = game => ({ ...game, runPeaks: mergeRunPeaks(EMPTY_PEAKS, game) })
const START = game => ({ game, metrics: readMetrics(game, game, ZERO_METRICS) })

// The sweeping bot from `game`. `series[i]` = the metrics at time i steps, after the bot has acted there (index 0 =
// its opening moves) — the moment a live player who acts right after each step would be measured.
const simulateSweeping = (game, def, stepSeconds, steps, onReset) => {
  let tracked = sweep(START(game), def, onReset)
  const series = [tracked.metrics]
  for (let i = 0; i < steps; i++) {
    tracked = sweep(trackStep(tracked, def, stepSeconds, onReset), def, onReset)
    series.push(tracked.metrics)
  }
  return series
}

// Check-in bot (the passive format). The run's reset automations start paused (`startPaused`); the bot touches
// the run only at check-ins, and only to release (switch on) or hold (switch off) them. Each plan below is one
// whole-run schedule, as `[checkInIndex, key, enabled]` moves; every plan is simulated once and the best one per
// objective is used.
const RELEASE = (keys, at = 0) => keys.map(key => [at, key, true])
export const DAILY_CHECK_IN_PLANS = [
  RELEASE(['scaleUp', 'restage', 'overclock']),
  RELEASE(['scaleUp', 'restage']),
  [...RELEASE(['scaleUp', 'restage']), ...RELEASE(['overclock'], 1)],
  [...RELEASE(['scaleUp', 'restage']), ...RELEASE(['overclock'], 2)],
  [...RELEASE(['scaleUp', 'restage', 'overclock']), [1, 'overclock', false]],
  [...RELEASE(['scaleUp', 'restage', 'overclock']), [2, 'scaleUp', false], [2, 'overclock', false]],
  RELEASE(['overclock', 'restage']),
]
// A plan as the bot's whole interaction with a run: `[{ step, actions: [[actionName, arg]] }]`.
const schedulePlan = (plan, checkInSteps) => {
  const byStep = new Map()
  for (const [checkIn, key, enabled] of plan) {
    const step = checkIn * checkInSteps
    byStep.set(step, [...(byStep.get(step) ?? []), ['automation', { key, enabled }]])
  }
  return [...byStep].map(([step, actions]) => ({ step, actions })).sort((a, b) => a.step - b.step)
}
const simulateSchedule = (game, def, stepSeconds, steps, schedule) => {
  let tracked = START(game)
  const series = []
  for (let step = 0; step <= steps; step++) {
    if (step > 0) tracked = trackStep(tracked, def, stepSeconds)
    const due = schedule.find(entry => entry.step === step)
    if (due) for (const [actionName, arg] of due.actions) tracked = trackAction(tracked, def, actionName, arg)
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
// kinds, provided that is more than it had at half the limit and more than an untouched run reaches by the limit.
// Null when the bot made no such progress.
const calculateTarget = (objective, atHalf, atTarget, untouched) => {
  const floor = Math.max(atHalf, untouched)
  if (!objective.amount) return atTarget > floor ? atTarget : null
  for (let digits = 1; digits <= 4; digits++) {
    const rounded = floorToSignificant(atTarget, digits)
    if (rounded > floor) return rounded
  }
  return null
}

// The attempt mark: a slightly lower target that makes a run count as attempted. It lies strictly between what an
// untouched run reaches by the limit and the target, so starting a run and leaving never earns it. Null when there
// is no room for one.
const calculateAttemptMark = (objective, target, untouched) => {
  if (!objective.amount) {
    const mark = Math.max(untouched + 1, target - Math.max(1, Math.round(target * 0.2)))
    return mark < target ? mark : null
  }
  // Owned units only come whole, so their mark is rounded up to a whole unit (a balance can be any amount).
  const attainable = mark => (objective.wholeUnits ? Math.ceil(mark) : mark)
  for (const divisor of [10, 4, 2]) {
    const mark = attainable(floorToSignificant(target / divisor, 1))
    if (mark > untouched && mark < target) return mark
  }
  const between = attainable(floorToSignificant(Math.sqrt(Math.max(1, untouched) * target), 2))
  return between > untouched && between < target ? between : null
}

// Objectives in a seeded weighted order (each drawn without replacement, by weight).
const drawObjectiveOrder = (rng, objectives) => {
  const left = [...objectives]
  const order = []
  while (left.length > 0) {
    let pick = rng() * left.reduce((sum, objective) => sum + objective.weight, 0)
    let index = left.findIndex(objective => (pick -= objective.weight) < 0)
    if (index < 0) index = left.length - 1
    order.push(...left.splice(index, 1))
  }
  return order
}

// One candidate (`attempt`: retry index, or 'fallback' for the fixed known-good definition). Returns
// `{ def, startGame, validation }`, or null when no objective is viable or the bot overshoots the cap. Exported
// for tests and scripts/simulate-daily-challenges.mjs.
export const buildDailyCandidate = (dateId, formatId, attempt) => {
  const format = DAILY_FORMAT_BY_ID[formatId]
  const fallback = attempt === 'fallback'
  const seed = hashString(`${dateId}|${formatId}|v${DAILY_GENERATOR_VERSION}|${attempt}`)
  const rng = createRng(seed)

  // Seeded starting balance: 1, 2 or 5 × a seeded power of ten (the fallback uses a plain 1,000,000 B).
  const startBytes = fallback ? 1e6 : DAILY_START_MANTISSAS[Math.floor(rng() * DAILY_START_MANTISSAS.length)] * 10 ** pickInt(rng, format.startExponent)
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
  // The fallback has no automations at all (an untouched run then achieves nothing) and a sweeping bot.
  const automations = fallback ? [] : pickAutomations(rng, format.automations)
  const checkIn = Boolean(format.checkInSeconds) && !fallback
  const warmupSeconds = fallback ? 0 : pickInt(rng, format.warmupSeconds.map(seconds => seconds / WARMUP_STEP_SECONDS)) * WARMUP_STEP_SECONDS
  const stepsLimit = format.seconds / format.stepSeconds
  const stepsHalf = stepsLimit / 2
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
    automations, // DAILY_AUTOMATIONS keys this run has
  }
  let fresh = createInitialGameState()
  fresh.resources = { ...fresh.resources, [MONEY_ID]: getStartBits(def) }
  for (const key of automations) fresh = AUTOMATION_BY_KEY[key].unlock(fresh)
  fresh = startPeaks(withLevers(fresh, levers))
  // Head start: the state right after the warm-up's last soft reset (the fresh state when it never reset).
  let startGame = fresh
  simulateSweeping(fresh, def, WARMUP_STEP_SECONDS, warmupSeconds / WARMUP_STEP_SECONDS, game => { startGame = game })
  for (const key of (fallback ? [] : format.startPaused ?? [])) startGame = settleGame(startGame, AUTOMATION_BY_KEY[key].set(false)(startGame), def)
  startGame = startPeaks(startGame)

  // A run nobody touches (automations only, as they start): the target and the attempt mark must lie beyond what
  // it reaches by the limit, and it must stay clear of the Purge freeze.
  const untouchedSeries = [START(startGame).metrics]
  for (let tracked = START(startGame), step = 0; step < stepsLimit; step++) {
    tracked = trackStep(tracked, def, format.stepSeconds)
    untouchedSeries.push(tracked.metrics)
  }
  if (untouchedSeries[stepsLimit].balance > DAILY_MAX_TARGET_BYTES) return null
  const untouched = untouchedSeries[stepsLimit]
  // The fallback takes the first viable objective in the fixed list order (no seed involved).
  const options = fallback ? OBJECTIVES : drawObjectiveOrder(rng, OBJECTIVES)
  // `{ objective, target, attemptMark, botSeconds }` when the objective is viable on this play of the bot and the
  // bot's winning time is inside the calibration band; otherwise null (the caller moves on, or discards).
  const assess = (objective, series) => {
    const target = calculateTarget(objective, series[stepsHalf][objective.key], series[targetStep][objective.key], untouched[objective.key])
    if (target === null) return null
    const attemptMark = calculateAttemptMark(objective, target, untouched[objective.key])
    if (attemptMark === null) return null
    const botSeconds = series.findIndex(metrics => metrics[objective.key] >= target) * format.stepSeconds
    return botSeconds >= format.seconds / 2 && botSeconds <= format.botCeilingSeconds ? { objective, target, attemptMark, botSeconds } : null
  }
  let chosen = null
  if (checkIn) {
    // Every plan is played once (all metrics are tracked together); an objective takes the plan that leaves it
    // highest, and the first objective in the seeded order with a viable target is the day's.
    const plays = DAILY_CHECK_IN_PLANS
      .map(plan => schedulePlan(plan, format.checkInSeconds / format.stepSeconds))
      .map(plan => ({ plan, series: simulateSchedule(startGame, def, format.stepSeconds, targetStep, plan) }))
      .filter(play => play.series[targetStep].balance <= DAILY_MAX_TARGET_BYTES)
    for (const objective of options) {
      const best = plays.reduce((top, play) => (!top || play.series[targetStep][objective.key] > top.series[targetStep][objective.key] ? play : top), null)
      const assessed = best && assess(objective, best.series)
      if (assessed) { chosen = { ...assessed, plan: best.plan }; break }
    }
  } else {
    const series = simulateSweeping(startGame, def, format.stepSeconds, targetStep)
    // Rejected: the run would brush the Purge freeze.
    if (series[targetStep].balance > DAILY_MAX_TARGET_BYTES) return null
    // The first objective, in the seeded order, that the bot advanced inside the band.
    for (const objective of options) {
      chosen = assess(objective, series)
      if (chosen) { chosen = { ...chosen, plan: null }; break }
    }
  }
  if (!chosen) return null
  const { objective, target, attemptMark, botSeconds, plan } = chosen

  return {
    def: {
      ...def,
      objective: {
        key: objective.key,
        kind: objective.kind,
        target,
        label: objective.describe(target, objective.tier),
        attemptMark, // reaching this much counts the run as attempted (participation), even without a win
        attemptLabel: objective.describe(attemptMark, objective.tier),
      },
      headStart: describeHeadStart(startGame),
    },
    startGame,
    validation: {
      attempt,
      warmupSeconds,
      botSeconds,
      plan, // check-in format: the bot's whole interaction, `[{ step, actions }]`; null when it sweeps every step
    },
  }
}

const generated = new Map()
const generate = (dateId, formatId) => {
  const key = `${dateId}|${formatId}`
  let entry = generated.get(key)
  if (!entry) {
    for (let attempt = 0; attempt < DAILY_MAX_GENERATION_ATTEMPTS && !entry; attempt++) entry = buildDailyCandidate(dateId, formatId, attempt)
    // The fallback draws nothing from the seed, so it is the same definition for every date — and known good
    // (asserted for every format in dailyChallenges.test.js).
    entry ??= buildDailyCandidate(dateId, formatId, 'fallback')
    if (generated.size > 64) generated.clear()
    generated.set(key, entry)
  }
  return entry
}

// Same (dateId, formatId, version) → deeply equal definition. No Math.random, no Date. Memoised (it simulates).
export const generateDailyChallenge = (dateId, formatId) => generate(dateId, formatId).def
// Developer-only record of how a definition was validated (retry index, warm-up, the bot's winning time and plan).
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

// Settles a run when its target is reached (won) or its limit passed (completed past its attempt mark, else expired).
const settleRun = (state, formatId, finishedMs) => {
  const run = state.daily.runs[formatId]
  if (!run) return state
  const won = isRunWon(run)
  const timedOut = run.simSeconds >= run.def.limitSeconds
  if (!won && !timedOut) return state

  // Attempted: the run reached its attempt mark (always beyond what an untouched run gets to).
  const completed = won || getRunValue(run) >= run.def.objective.attemptMark
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
    metrics: START(startGame).metrics,
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
    let tracked = { game: run.game, metrics: run.metrics }
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
  const before = { game: run.game, metrics: run.metrics }
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
