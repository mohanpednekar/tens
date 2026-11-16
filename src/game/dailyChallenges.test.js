import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import {
  DAILY_AUTOMATIONS,
  DAILY_BOT_ACTION_ORDER,
  DAILY_FORMATS,
  DAILY_FORMAT_BY_ID,
  DAILY_GENERATOR_VERSION,
  DAILY_MODIFIER_POOL,
  DAILY_OBJECTIVE_KINDS,
  buildDailyCandidate,
  canRestartDailyRun,
  forfeitDailyRun,
  generateDailyChallenge,
  getDailyChallengeValidation,
  getDailyCredits,
  getMsUntilNextUtcDay,
  getRunProgress,
  getUtcDateId,
  isDailyAutomationOn,
  isDailyChallengesAvailable,
  playDailyRun,
  restartDailyRun,
  startDailyRun,
  tickDailyRuns,
} from './dailyChallenges'
import { createInitialGameState } from './engine'
import { DAILY_CHALLENGES_FEATURE } from './layers'

const T0 = Date.UTC(2026, 10, 12, 10, 0, 0)
const purged = () => ({ ...createInitialGameState(), purge: { ...createInitialGameState().purge, count: 1 } })
const withRun = (state, formatId, patch) => ({
  ...state,
  daily: { ...state.daily, runs: { ...state.daily.runs, [formatId]: { ...state.daily.runs[formatId], ...patch } } },
})
// Sets a run's objective metric (and the earned Bits behind it, for the earn objective).
const withValue = (state, formatId, value) => {
  const run = state.daily.runs[formatId]
  const { key } = run.def.objective
  return withRun(state, formatId, { metrics: { ...run.metrics, [key]: value }, ...(key === 'earn' ? { earnedBits: value * 8 } : {}) })
}
const isAmount = def => DAILY_OBJECTIVE_KINDS[def.objective.kind].amount
const isoDates = (from, days) => Array.from({ length: days }, (_, i) => new Date(Date.parse(`${from}T00:00:00Z`) + i * 86400000).toISOString().slice(0, 10))
const inBand = (format, seconds) => seconds > format.seconds / 2 && seconds <= format.botCeilingSeconds

beforeEach(() => { DAILY_CHALLENGES_FEATURE.enabled = true })
afterEach(() => { DAILY_CHALLENGES_FEATURE.enabled = false })

describe('generator', () => {
  test('is deterministic and varies by date/format', () => {
    expect(generateDailyChallenge('2026-11-12', '1h')).toEqual(generateDailyChallenge('2026-11-12', '1h'))
    expect(buildDailyCandidate('2026-11-12', '1h', 0)).toEqual(buildDailyCandidate('2026-11-12', '1h', 0))
    expect(generateDailyChallenge('2026-11-12', '1h')).not.toEqual(generateDailyChallenge('2026-11-12', '10m'))
    const targets = new Set(isoDates('2026-12-01', 10).map(date => generateDailyChallenge(date, '10h').objective.label))
    expect(targets.size).toBeGreaterThan(5)
    const balances = new Set(isoDates('2026-12-01', 10).map(date => generateDailyChallenge(date, '10h').startBytes))
    expect(balances.size).toBeGreaterThan(3)
  })

  test('a definition carries modified conditions, a head start and a calculated target', () => {
    for (const format of DAILY_FORMATS) {
      const def = generateDailyChallenge('2026-11-12', format.id)
      expect(def.generatorVersion).toBe(DAILY_GENERATOR_VERSION)
      expect(DAILY_OBJECTIVE_KINDS[def.objective.kind]).toBeTruthy()
      expect(def.objective.target).toBeGreaterThan(0)
      expect(def.objective.label).toBeTruthy()
      if (!isAmount(def)) expect(Number.isInteger(def.objective.target)).toBe(true)
      expect(def.stepSeconds).toBe(format.stepSeconds)
      expect(def.conditions.length).toBe(Object.keys(def.levers).length)
      for (const [lever, value] of Object.entries(def.levers)) {
        expect(DAILY_MODIFIER_POOL.find(entry => entry.lever === lever).values).toContain(value)
      }
      expect([1, 2, 5]).toContain(Number(def.startBytes.toExponential(0)[0]))
      expect(def.startBytes).toBeGreaterThanOrEqual(10 ** format.startExponent[0])
      expect(def.startBytes).toBeLessThanOrEqual(5 * 10 ** format.startExponent[1])
      expect(def.headStart).toEqual({ scaleUps: expect.any(Number), overclock: expect.any(Number) })
      // The internal validation record never rides along in the definition a run stores.
      expect(def).not.toHaveProperty('botSeconds')
    }
  })

  test('UTC date ids ignore the local timezone', () => {
    expect(getUtcDateId(Date.UTC(2026, 11, 31, 23, 59, 59))).toBe('2026-12-31')
    expect(getUtcDateId(Date.UTC(2027, 0, 1))).toBe('2027-01-01')
    expect(getMsUntilNextUtcDay(Date.UTC(2026, 11, 31, 23, 0, 0))).toBe(3600000)
  })
})

// The reference bot must win every definition after half the time limit and no later than the format's ceiling
// (9 min / 50 min / 8 h). `scripts/simulate-daily-challenges.mjs` runs the same check over longer ranges.
describe('calibration (reference bot)', () => {
  const dates = [...isoDates('2026-11-12', 12), '2026-12-31', '2027-01-01', '2027-02-28', '2028-02-29']

  test.each(DAILY_FORMATS.map(format => [format.id]))('%s: every definition is won inside the band', formatId => {
    const format = DAILY_FORMAT_BY_ID[formatId]
    const records = dates.map(date => ({ def: generateDailyChallenge(date, formatId), validation: getDailyChallengeValidation(date, formatId) }))
    for (const { validation } of records) expect(inBand(format, validation.botSeconds)).toBe(true)
    expect(records.filter(record => record.validation.attempt === 'fallback').length).toBeLessThanOrEqual(1)
    expect(new Set(records.map(record => record.def.conditions.join('+'))).size).toBeGreaterThan(4)
    expect(new Set(records.map(record => record.def.objective.kind)).size).toBeGreaterThan(1)
  }, 120000)

  test.each(DAILY_FORMATS.map(format => [format.id]))('%s: the fixed fallback definition is inside the band', formatId => {
    const fallback = buildDailyCandidate('2026-11-12', formatId, 'fallback')
    expect(fallback.def.conditions).toEqual([])
    expect(fallback.def.objective.kind).toBe('earn')
    expect(inBand(DAILY_FORMAT_BY_ID[formatId], fallback.validation.botSeconds)).toBe(true)
  })

  // Replays the bot through the public run actions: live play reproduces the simulated winning time exactly.
  test.each(DAILY_FORMATS.map(format => [format.id]))('%s: live play matches the simulation', formatId => {
    const format = DAILY_FORMAT_BY_ID[formatId]
    const date = '2026-11-14'
    const start = Date.parse(`${date}T00:00:00Z`) + 1000
    const { plan } = getDailyChallengeValidation(date, formatId)
    let state = startDailyRun(formatId, start)(purged())
    for (let step = 0; step <= format.seconds / format.stepSeconds && state.daily.runs[formatId]; step++) {
      const now = start + step * format.stepSeconds * 1000
      state = tickDailyRuns(now)(state)
      if (plan) {
        // Check-in format: the bot's whole interaction is its plan.
        for (const [name, arg] of plan.find(entry => entry.step === step)?.actions ?? []) state = playDailyRun(formatId, name, arg, now)(state)
        continue
      }
      for (let pass = 0; pass < 20 && state.daily.runs[formatId]; pass++) {
        const before = state.daily.runs[formatId].game
        for (const [name, arg] of DAILY_BOT_ACTION_ORDER) state = playDailyRun(formatId, name, arg, now)(state)
        if (state.daily.runs[formatId]?.game === before) break
      }
    }
    const result = state.daily.results[date][formatId]
    expect(result.won).toBe(true)
    expect(result.bestSeconds).toBe(getDailyChallengeValidation(date, formatId).botSeconds)
  }, 120000)

  // The 10-hour format may have leave-it-running days; the active formats never do.
  test.each([['10m'], ['1h']])('%s: a run nobody touches does not win', formatId => {
    for (const date of dates.slice(0, 6)) {
      const start = Date.parse(`${date}T00:00:00Z`) + 1000
      const after = tickDailyRuns(start + DAILY_FORMAT_BY_ID[formatId].seconds * 1000)(startDailyRun(formatId, start)(purged()))
      expect(after.daily.results[date][formatId].won).toBe(false)
    }
  })
})

describe('automations', () => {
  const keys = DAILY_AUTOMATIONS.map(automation => automation.key)
  test('each format carries its own set', () => {
    for (const date of isoDates('2026-11-12', 6)) {
      const mix = generateDailyChallenge(date, '10m').automations
      expect(mix).toContain('buy:tier01')
      expect(mix.length).toBeLessThan(keys.length)
      expect(generateDailyChallenge(date, '1h').automations).toEqual(keys.filter(key => key.startsWith('buy:') || key === 'speedUp'))
      expect(generateDailyChallenge(date, '10h').automations).toEqual(keys)
    }
  })

  test('a run starts with its automations on, and the switch pauses and resumes one', () => {
    const started = startDailyRun('10h', T0)(purged())
    expect(keys.every(key => isDailyAutomationOn(started.daily.runs['10h'].game, key))).toBe(true)
    const paused = playDailyRun('10h', 'automation', { key: 'overclock', enabled: false }, T0)(started)
    expect(isDailyAutomationOn(paused.daily.runs['10h'].game, 'overclock')).toBe(false)
    expect(isDailyAutomationOn(playDailyRun('10h', 'automation', { key: 'overclock', enabled: true }, T0)(paused).daily.runs['10h'].game, 'overclock')).toBe(true)
    // An automation the run does not have cannot be switched.
    const hour = startDailyRun('1h', T0)(purged())
    expect(playDailyRun('1h', 'automation', { key: 'scaleUp', enabled: false }, T0)(hour)).toBe(hour)
    expect(playDailyRun('1h', 'automation', { key: 'nope', enabled: false }, T0)(hour)).toBe(hour)
  })

  test('automation plays the run: an untouched 10-hour run makes progress and never runs dry after an automatic reset', () => {
    const started = startDailyRun('10h', T0)(purged())
    const later = tickDailyRuns(T0 + 4 * 3600 * 1000)(started)
    const run = later.daily.runs['10h']
    if (run) {
      expect(run.metrics.earn).toBeGreaterThan(0)
      expect(run.game.resources.base).toBeGreaterThan(0)
    } else expect(later.daily.results['2026-11-12']['10h']).toBeTruthy()
  })
})

describe('review regressions', () => {
  test('a Reboot (Purge count back to 0) keeps Daily available', () => {
    const state = { ...createInitialGameState(), era: { ...createInitialGameState().era, count: 1 } }
    expect(isDailyChallengesAvailable(state)).toBe(true)
  })

  test('a purchase after the deadline cannot rescue a run: it settles first', () => {
    const started = startDailyRun('10m', T0)(purged())
    const after = playDailyRun('10m', 'buyTier', 'tier01', T0 + 601 * 1000)(started)
    expect(after.daily.runs['10m']).toBeFalsy()
    expect(after.daily.results['2026-11-12']['10m'].lastOutcome).toBe('expired')
  })

  test('a win is timed at the crossing step, not at when the player returns', () => {
    const started = startDailyRun('10m', T0)(purged())
    const there = withValue(started, '10m', started.daily.runs['10m'].def.objective.target)
    const after = tickDailyRuns(T0 + 600 * 1000)(there)
    expect(after.daily.results['2026-11-12']['10m'].won).toBe(true)
    expect(after.daily.results['2026-11-12']['10m'].bestSeconds).toBe(1)
  })

  test('a run from another generator version is dropped without a result', () => {
    const started = startDailyRun('1h', T0)(purged())
    const stale = withRun(started, '1h', { def: { dateId: '2026-11-12', formatId: '1h', generatorVersion: 1, limitSeconds: 3600, targetExponent: 4 } })
    const after = tickDailyRuns(T0 + 1000)(stale)
    expect(after.daily.runs['1h']).toBeNull()
    expect(after.daily.results['2026-11-12']).toBeUndefined()
  })
})

describe('stepping', () => {
  test('a run advances in whole steps and carries the remainder; a gap is clamped to the limit', () => {
    const started = startDailyRun('10h', T0)(purged())
    expect(tickDailyRuns(T0 + 119 * 1000)(started)).toBe(started)
    const once = tickDailyRuns(T0 + 1000 * 1000)(started)
    expect(once.daily.runs['10h'].simSeconds).toBe(960)
    expect(once.daily.runs['10h'].lastTickAt).toBe(T0 + 960 * 1000)
    expect(tickDailyRuns(T0 + 1079 * 1000)(once)).toBe(once)
    expect(tickDailyRuns(T0 + 1080 * 1000)(once).daily.runs['10h'].simSeconds).toBe(1080)
  })

  test('a device clock that went backwards restarts the wait from now, once', () => {
    const started = startDailyRun('10m', T0)(purged())
    const back = tickDailyRuns(T0 - 5000)(started)
    expect(back.daily.runs['10m'].lastTickAt).toBe(T0 - 5000)
    expect(back.daily.runs['10m'].simSeconds).toBe(0)
    expect(tickDailyRuns(T0 - 5000)(back)).toBe(back)
    expect(tickDailyRuns(T0 - 3000)(back).daily.runs['10m'].simSeconds).toBe(2)
  })

  test('the run game carries the challenge levers through purchases and soft resets', () => {
    const started = startDailyRun('1h', T0)(purged())
    const { levers } = started.daily.runs['1h'].def
    expect(started.daily.runs['1h'].game.runLevers).toEqual(levers)
    const bought = playDailyRun('1h', 'buyTier', 'tier01', T0)(started)
    expect(bought.daily.runs['1h'].game).not.toBe(started.daily.runs['1h'].game)
    expect(tickDailyRuns(T0 + 60 * 1000)(bought).daily.runs['1h'].game.runLevers).toEqual(levers)
  })
})

describe('objectives', () => {
  test('a level objective is met by the purchase itself and settles at once', () => {
    const started = startDailyRun('10m', T0)(purged())
    const run = started.daily.runs['10m']
    const leveled = withRun(started, '10m', { def: { ...run.def, objective: { key: 'levels:tier01', kind: 'levels', target: 1, label: 'Complete 1 level of Kilobytes' } } })
    let state = leveled
    for (let i = 0; i < 20 && state.daily.runs['10m']; i++) state = playDailyRun('10m', 'buyTier', 'tier01', T0)(state)
    expect(state.daily.results['2026-11-12']['10m']).toMatchObject({ won: true, bestSeconds: 0 })
  })

  test('the Overclock objective counts only an Overclock claimed in the run', () => {
    const started = startDailyRun('10m', T0)(purged())
    expect(started.daily.runs['10m'].metrics.overclock).toBe(0)
    const run = started.daily.runs['10m']
    const ready = withRun(started, '10m', { game: { ...run.game, purchaseLevels: Object.fromEntries(Object.keys(run.game.purchaseLevels).map(id => [id, 30])) } })
    const after = playDailyRun('10m', 'overclock', undefined, T0)(ready)
    const metrics = after.daily.runs['10m']?.metrics ?? null
    if (metrics) expect(metrics.overclock).toBeGreaterThanOrEqual(5)
    else expect(after.daily.results['2026-11-12']['10m'].won).toBe(true)
  })
})

describe('run actions', () => {
  test('a claimed Scale Up re-grants the starting balance', () => {
    const started = startDailyRun('10m', T0)(purged())
    const run = started.daily.runs['10m']
    const ready = withRun(started, '10m', { game: { ...run.game, purchaseLevels: Object.fromEntries(Object.keys(run.game.purchaseLevels).map(id => [id, 20])) } })
    const after = playDailyRun('10m', 'scaleUp', undefined, T0)(ready)
    expect(after.daily.runs['10m'].game).not.toBe(ready.daily.runs['10m'].game)
    expect(after.daily.runs['10m'].game.resources.base).toBe(run.def.startBytes * 8)
    expect(after.daily.runs['10m'].game.runLevers).toEqual(run.def.levers)
  })

  test('an unknown action, or one that is not available, is a no-op', () => {
    const started = startDailyRun('10m', T0)(purged())
    expect(playDailyRun('10m', 'purge', undefined, T0)(started)).toBe(started)
    expect(playDailyRun('10m', 'constructor', undefined, T0)(started)).toBe(started)
    expect(playDailyRun('10m', 'scaleUp', undefined, T0)(started)).toBe(started)
    expect(playDailyRun('10m', 'tierTickspeed', 'tier01', T0)(started)).toBe(started)
  })
})

describe('progress', () => {
  test('is the share of the way to the target in powers of ten for an amount objective', () => {
    const def = { objective: { key: 'earn', kind: 'earn', target: 1000 } }
    expect(getRunProgress({ def, metrics: { earn: 50 } })).toBeCloseTo(Math.log10(50) / 3, 5)
    expect(getRunProgress({ def, metrics: { earn: 0 } })).toBe(0)
    expect(getRunProgress({ def, metrics: { earn: 1000 } })).toBe(1)
  })

  test('is the share of the levels for a level objective', () => {
    const def = { objective: { key: 'levels:tier02', kind: 'levels', target: 8 } }
    expect(getRunProgress({ def, metrics: { 'levels:tier02': 2 } })).toBe(0.25)
    expect(getRunProgress({ def, metrics: { 'levels:tier02': 9 } })).toBe(1)
  })
})

describe('availability and lifecycle', () => {
  test('needs a first Purge and the rollout switch', () => {
    expect(isDailyChallengesAvailable(purged())).toBe(true)
    expect(isDailyChallengesAvailable(createInitialGameState())).toBe(false)
    DAILY_CHALLENGES_FEATURE.enabled = false
    expect(isDailyChallengesAvailable(purged())).toBe(false)
    const state = createInitialGameState()
    expect(startDailyRun('10m', T0)(state)).toBe(state)
  })

  test('start is idempotent per format, runs are isolated from the main game', () => {
    const state = purged()
    const started = startDailyRun('10m', T0)(state)
    expect(started.daily.runs['10m'].def.dateId).toBe('2026-11-12')
    expect(startDailyRun('10m', T0)(started)).toBe(started)
    const { daily: _runs, ...mainWithoutDaily } = started
    const { daily: _initial, ...before } = state
    expect(mainWithoutDaily).toEqual(before)
  })

  test('forfeit earns nothing; restart only while the originating UTC date is current', () => {
    const started = startDailyRun('1h', T0)(purged())
    expect(forfeitDailyRun('1h')(started).daily.runs['1h']).toBeFalsy()
    expect(getDailyCredits(forfeitDailyRun('1h')(started), '2026-11-12').total).toBe(0)
    const tomorrow = Date.UTC(2026, 10, 13, 0, 0, 1)
    expect(canRestartDailyRun(started, '1h', T0)).toBe(true)
    expect(canRestartDailyRun(started, '1h', tomorrow)).toBe(false)
    expect(restartDailyRun('1h', tomorrow)(started)).toBe(started)
    expect(restartDailyRun('1h', T0 + 1000)(started).daily.runs['1h'].startedAt).toBe(T0 + 1000)
  })

  test('a run past its limit beyond the floor completes for the participation credit only', () => {
    const started = startDailyRun('10m', T0)(purged())
    const { def } = started.daily.runs['10m']
    const near = withValue(started, '10m', isAmount(def) ? def.objective.target ** 0.75 : def.objective.target * 0.75)
    const after = tickDailyRuns(T0 + 601 * 1000)(near)
    expect(after.daily.results['2026-11-12']['10m'].lastOutcome).toBe('completed')
    expect(getDailyCredits(after, '2026-11-12')).toEqual({ wins: 0, participation: 1, total: 1 })
  })

  test('credits are capped at 4 under unlimited retries', () => {
    let state = purged()
    for (let attempt = 0; attempt < 3; attempt++) {
      for (const { id, stepSeconds } of DAILY_FORMATS) {
        state = startDailyRun(id, T0)(state)
        state = withValue(state, id, state.daily.runs[id].def.objective.target)
        state = tickDailyRuns(T0 + stepSeconds * 1000)(state)
      }
    }
    expect(getDailyCredits(state, '2026-11-12')).toEqual({ wins: 3, participation: 1, total: 4 })
    expect(state.daily.results['2026-11-12']['10m'].attempts).toBe(3)
  })
})
