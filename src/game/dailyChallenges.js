// Daily challenges (epic #1062, basic playable slice). Pure state functions over `state.daily`
// (`{ runs: { [formatId]: run | null }, results: { [dateId]: { [formatId]: result } } }`).
//
// Each run is an isolated Factory-only game (`run.game`, from createInitialGameState) with its own tier ladder,
// Clock Speed, Scale Up and Overclock — nothing leaks to or from the main save. Definitions are derived on the
// device from (UTC date, format) with a seeded PRNG; server time, the fetched/validated generator, rewards,
// weekly/monthly milestones and streaks are later slices. Every function takes `nowMs` as an argument.
import {
  buyGlobalTickspeedMultiplier,
  buyTierQuantity,
  createInitialGameState,
  overclockGame,
  scaleUpGame,
  tickGame,
} from './engine'
import { BITS_PER_BYTE, DAILY_CHALLENGES_FEATURE, MONEY_ID } from './layers'

export const DAILY_GENERATOR_VERSION = 1
export const DAILY_MAX_CREDITS = 4
// A run that hits its time limit short of the target still counts as completed past this share of the way
// (in powers of ten) from its starting balance to the target.
export const DAILY_COMPLETION_FLOOR = 0.5
// Catch-up is chunked into at most this many ticks per run per call so long gaps cannot freeze the UI.
export const DAILY_MAX_TICKS_PER_CALL = 300
const BUY_ALL = Number.MAX_SAFE_INTEGER

// Exponents are powers of ten in Bytes. A run is won when the Bytes it has EARNED (production only — not the
// balance, which buying spends) reach 10^targetExponent. Starting balance = 10^startExponent Bytes. Targets were
// tuned against a naive reference bot (`dailyChallenges.test.js`); balance is a later slice (#1067).
export const DAILY_FORMATS = [
  { id: '10m', label: '10 minutes', seconds: 600, style: 'Hands-on: every second counts', startBase: 4, startSpread: 1, targetBase: 3, targetSpread: 1 },
  { id: '1h', label: '1 hour', seconds: 3600, style: 'Steady: check in now and then', startBase: 4, startSpread: 1, targetBase: 4, targetSpread: 0 },
  { id: '10h', label: '10 hours', seconds: 36000, style: 'Passive: a few well-timed decisions', startBase: 4, startSpread: 1, targetBase: 12, targetSpread: 2 },
]
export const DAILY_FORMAT_BY_ID = Object.fromEntries(DAILY_FORMATS.map(format => [format.id, format]))

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

// Same (dateId, formatId, version) → deeply equal definition. No Math.random, no Date.
export const generateDailyChallenge = (dateId, formatId) => {
  const format = DAILY_FORMAT_BY_ID[formatId]
  const seed = hashString(`${dateId}|${formatId}|v${DAILY_GENERATOR_VERSION}`)
  const rng = createRng(seed)
  const startExponent = format.startBase + Math.floor(rng() * (format.startSpread + 1))
  const targetExponent = format.targetBase + Math.floor(rng() * (format.targetSpread + 1))
  return {
    dateId,
    formatId,
    seed,
    generatorVersion: DAILY_GENERATOR_VERSION,
    limitSeconds: format.seconds,
    startExponent, // starting balance = 10^startExponent Bytes
    targetExponent, // target = 10^targetExponent Bytes
  }
}

// Reachable once the save has completed its first Purge (a Reboot resets the Purge count but keeps the unlock), and only while the rollout switch is on.
export const isDailyChallengesAvailable = state =>
  DAILY_CHALLENGES_FEATURE.enabled && ((state.purge?.count ?? 0) >= 1 || (state.era?.count ?? 0) >= 1)

const getRunEarnedBytes = run => run.earnedBits / BITS_PER_BYTE
const getStartBits = def => 10 ** def.startExponent * BITS_PER_BYTE

export const getRunProgress = run => {
  return Math.min(1, Math.max(0, Math.log10(Math.max(1, getRunEarnedBytes(run))) / run.def.targetExponent))
}

const setRun = (state, formatId, run) => ({
  ...state,
  daily: { ...state.daily, runs: { ...state.daily.runs, [formatId]: run } },
})

// Settles a run when its target is reached (won) or its limit passed (completed past the floor, else expired).
const settleRun = (state, formatId, finishedMs) => {
  const run = state.daily.runs[formatId]
  if (!run) return state
  const won = getRunEarnedBytes(run) >= 10 ** run.def.targetExponent
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
  const def = generateDailyChallenge(getUtcDateId(nowMs), formatId)
  const game = createInitialGameState()
  game.resources = { ...game.resources, [MONEY_ID]: getStartBits(def) }
  return setRun(state, formatId, {
    def,
    game,
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

// Advances every active run by the real time since its last tick (clamped to its limit), then settles it.
export const tickDailyRuns = nowMs => state => {
  let next = state
  for (const format of DAILY_FORMATS) {
    const run = next.daily?.runs?.[format.id]
    if (!run) continue
    const dt = Math.min(Math.max(0, (nowMs - run.lastTickAt) / 1000), run.def.limitSeconds - run.simSeconds)
    let game = run.game
    let earnedBits = run.earnedBits
    let elapsed = dt
    if (dt > 0) {
      const ticks = Math.min(DAILY_MAX_TICKS_PER_CALL, Math.max(1, Math.ceil(dt)))
      const step = dt / ticks
      for (let i = 0; i < ticks; i++) {
        const before = game.resources[MONEY_ID] ?? 0
        game = tickGame(step, 1)(game)
        earnedBits += Math.max(0, (game.resources[MONEY_ID] ?? 0) - before)
        // Settle at the tick that crosses the target, so the recorded time doesn't depend on when the player returns.
        if (earnedBits / BITS_PER_BYTE >= 10 ** run.def.targetExponent) {
          elapsed = (i + 1) * step
          break
        }
      }
    }
    next = settleRun(
      setRun(next, format.id, { ...run, game, lastTickAt: nowMs, simSeconds: run.simSeconds + elapsed, earnedBits }),
      format.id,
      nowMs,
    )
  }
  return next
}

// Applies a Factory engine action to a run's own game (a target is only ever reached by production, in a tick).
// `reseed` (Scale Up / Overclock soft resets): a run has no Foundry to refill the wiped balance, so the reset
// grants the starting balance again — the multipliers it earns are the point.
const playRun = (formatId, nowMs, action, reseed = false) => state => {
  // Catch the run up (and settle it) through the action's timestamp first, so a purchase can't retroactively
  // speed up a gap that already ended the run.
  const caught = tickDailyRuns(nowMs)(state)
  const run = caught.daily.runs[formatId]
  if (!run) return caught
  let game = action(run.game)
  if (game === run.game) return caught
  if (reseed) game = { ...game, resources: { ...game.resources, [MONEY_ID]: getStartBits(run.def) } }
  return setRun(caught, formatId, { ...run, game })
}

export const buyDailyTier = (formatId, tierId, nowMs) => playRun(formatId, nowMs, buyTierQuantity(tierId, BUY_ALL))
export const buyDailyClockSpeed = (formatId, nowMs) => playRun(formatId, nowMs, buyGlobalTickspeedMultiplier)
export const scaleUpDailyRun = (formatId, nowMs) => playRun(formatId, nowMs, scaleUpGame, true)
export const overclockDailyRun = (formatId, nowMs) => playRun(formatId, nowMs, overclockGame, true)

// Credits for one UTC date: 1 per distinct format won + 1 once for any won/completed run. Max 4.
export const getDailyCredits = (state, dateId) => {
  const day = Object.values(state.daily?.results?.[dateId] ?? {})
  const wins = day.filter(result => result.won).length
  const participation = day.some(result => result.won || result.completed) ? 1 : 0
  return { wins, participation, total: wins + participation }
}
