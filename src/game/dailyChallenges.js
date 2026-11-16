// Daily challenges (epic #1062). Pure state functions over `state.daily`
// (`{ runs: { [formatId]: run | null }, results: { [dateId]: { [formatId]: result } } }`).
//
// Each run is an isolated Factory-only game (`run.game`) with its own tier ladder, Clock Speed, Scale Up and
// Overclock — nothing leaks to or from the main save. A definition is derived on the device from (UTC date, format)
// with a seeded PRNG and has three seeded parts:
//   1. modified conditions — run-wide levers (`DAILY_MODIFIER_POOL`), carried on the run's game as `runLevers`;
//   2. seeded progress — the reference bot plays a seeded warm-up and the run starts right after its last
//      Scale Up / Overclock: the multipliers it built are kept, the ladder is fresh, nothing produces yet;
//   3. a calculated target — the Bytes the reference bot has earned at a seeded moment inside the calibration
//      band (after half the time limit, no later than the format's bot ceiling), rounded down to a clean number.
// So the reference bot always wins in (limit / 2, botCeilingSeconds], and a run that never acts earns nothing.
// Server time, fetched definitions, rewards, weekly/monthly milestones and streaks are later slices. Every
// function takes `nowMs` as an argument.
import {
  buyGlobalTickspeedMultiplier,
  buyTickspeedMultiplier,
  buyTierQuantity,
  consumeXpForLastTierTickspeed,
  createInitialGameState,
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
// powers of ten) to the target.
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
const BOT_ACTIONS = DAILY_BOT_ACTION_ORDER.map(([name, arg]) => ({ action: RUN_ACTIONS[name].make(arg), reseed: Boolean(RUN_ACTIONS[name].reseed) }))
const botAct = (game, def, onReset) => {
  let current = game
  for (let pass = 0; pass < BOT_MAX_PASSES; pass++) {
    let next = current
    for (const { action, reseed } of BOT_ACTIONS) {
      const acted = applyRunAction(next, def, action, reseed)
      if (reseed && acted !== next) onReset?.(acted)
      next = acted
    }
    if (next === current) break
    current = next
  }
  return current
}

// Cumulative Bits earned after each step (index 0 = before the first step).
const simulate = (game, def, stepSeconds, steps, act) => {
  const earned = [0]
  let current = game
  for (let i = 0; i < steps; i++) {
    if (act) current = act(current, def)
    const [next, gained] = stepRunGame(current, def, stepSeconds)
    current = next
    earned.push(earned[i] + gained)
  }
  return { game: current, earned }
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

// One candidate (`attempt`: retry index, or 'fallback' for the fixed known-good definition). Returns
// `{ def, startGame, validation }`, or null when the bot earns nothing new inside the band or overshoots the cap.
// Exported for tests and scripts/simulate-daily-challenges.mjs.
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
  // The moment the bot's earnings are read for the target: after half the limit, up to the ceiling.
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
  simulate(startGame, def, WARMUP_STEP_SECONDS, warmupSeconds / WARMUP_STEP_SECONDS, (game, runDef) => botAct(game, runDef, keepReset))

  const bot = simulate(startGame, def, format.stepSeconds, targetStep, botAct).earned
  const halfBytes = bot[stepsHalf] / BITS_PER_BYTE
  const reachedBytes = bot[targetStep] / BITS_PER_BYTE
  let targetBytes = 0
  for (let digits = 1; digits <= 4 && !(targetBytes > halfBytes); digits++) targetBytes = floorToSignificant(reachedBytes, digits)
  // Rejected: the bot earned nothing new inside the band, or the run would brush the Purge freeze.
  if (!(targetBytes > halfBytes) || reachedBytes > DAILY_MAX_TARGET_BYTES) return null

  return {
    def: { ...def, targetBytes, headStart: describeHeadStart(startGame) },
    startGame,
    validation: {
      attempt,
      warmupSeconds,
      botSeconds: bot.findIndex(bits => bits / BITS_PER_BYTE >= targetBytes) * format.stepSeconds,
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

const getRunEarnedBytes = run => run.earnedBits / BITS_PER_BYTE
const isRunWon = run => getRunEarnedBytes(run) >= run.def.targetBytes

// Share of the way to the target, in powers of ten.
export const getRunProgress = run => {
  if (isRunWon(run)) return 1
  const high = Math.log10(Math.max(1, run.def.targetBytes))
  return high > 0 ? Math.min(1, Math.max(0, Math.log10(Math.max(1, getRunEarnedBytes(run))) / high)) : 0
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
    let game = run.game
    let earnedBits = run.earnedBits
    let stepsDone = 0
    while (stepsDone < stepsDue) {
      const [stepped, gained] = stepRunGame(game, run.def, stepSeconds)
      game = stepped
      earnedBits += gained
      stepsDone++
      // Settle at the step that crosses the target, so the recorded time doesn't depend on when the player returns.
      if (earnedBits / BITS_PER_BYTE >= run.def.targetBytes) break
    }
    next = settleRun(
      setRun(next, format.id, { ...run, game, lastTickAt, simSeconds: run.simSeconds + stepsDone * stepSeconds, earnedBits }),
      format.id,
      nowMs,
    )
  }
  return next
}

// Applies one Factory action (`RUN_ACTIONS` name + argument) to a run's own game. A target is only ever reached by
// production, in a tick.
export const playDailyRun = (formatId, actionName, arg, nowMs) => state => {
  if (!Object.hasOwn(RUN_ACTIONS, actionName)) return state
  const entry = RUN_ACTIONS[actionName]
  // Catch the run up (and settle it) through the action's timestamp first, so a purchase can't retroactively
  // speed up a gap that already ended the run.
  const caught = tickDailyRuns(nowMs)(state)
  const run = caught.daily.runs[formatId]
  if (!run) return caught
  const game = applyRunAction(run.game, run.def, entry.make(arg), entry.reseed)
  return game === run.game ? caught : setRun(caught, formatId, { ...run, game })
}

// Credits for one UTC date: 1 per distinct format won + 1 once for any won/completed run. Max 4.
export const getDailyCredits = (state, dateId) => {
  const day = Object.values(state.daily?.results?.[dateId] ?? {})
  const wins = day.filter(result => result.won).length
  const participation = day.some(result => result.won || result.completed) ? 1 : 0
  return { wins, participation, total: wins + participation }
}
