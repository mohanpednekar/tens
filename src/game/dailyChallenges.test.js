import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import {
  DAILY_FORMATS,
  buyDailyClockSpeed,
  buyDailyTier,
  canRestartDailyRun,
  forfeitDailyRun,
  generateDailyChallenge,
  getDailyCredits,
  getMsUntilNextUtcDay,
  getUtcDateId,
  isDailyChallengesAvailable,
  overclockDailyRun,
  restartDailyRun,
  scaleUpDailyRun,
  startDailyRun,
  tickDailyRuns,
} from './dailyChallenges'
import { createInitialGameState } from './engine'
import { DAILY_CHALLENGES_FEATURE, TIER_DEFINITIONS } from './layers'

const T0 = Date.UTC(2026, 10, 12, 10, 0, 0)
const purged = () => ({ ...createInitialGameState(), purge: { ...createInitialGameState().purge, count: 1 } })

beforeEach(() => { DAILY_CHALLENGES_FEATURE.enabled = true })
afterEach(() => { DAILY_CHALLENGES_FEATURE.enabled = false })

describe('generator', () => {
  test('is deterministic and varies by date/format', () => {
    expect(generateDailyChallenge('2026-11-12', '1h')).toEqual(generateDailyChallenge('2026-11-12', '1h'))
    expect(generateDailyChallenge('2026-11-12', '1h')).not.toEqual(generateDailyChallenge('2026-11-12', '10m'))
    const seeds = new Set(Array.from({ length: 30 }, (_, i) => generateDailyChallenge(`2026-12-${String(i + 1).padStart(2, '0')}`, '10h').seed))
    expect(seeds.size).toBe(30)
  })

  test('UTC date ids ignore the local timezone', () => {
    expect(getUtcDateId(Date.UTC(2026, 11, 31, 23, 59, 59))).toBe('2026-12-31')
    expect(getUtcDateId(Date.UTC(2027, 0, 1))).toBe('2027-01-01')
    expect(getMsUntilNextUtcDay(Date.UTC(2026, 11, 31, 23, 0, 0))).toBe(3600000)
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

  test('a run past its limit below the floor expires and earns nothing; a gap is clamped to the limit', () => {
    const started = startDailyRun('10m', T0)(purged())
    const after = tickDailyRuns(T0 + 100 * 3600 * 1000)(started)
    expect(after.daily.runs['10m']).toBeFalsy()
    expect(after.daily.results['2026-11-12']['10m'].lastOutcome).toBe('expired')
    expect(getDailyCredits(after, '2026-11-12').total).toBe(0)
  })

  test('a run past its limit beyond the floor completes for the participation credit only', () => {
    const started = startDailyRun('10m', T0)(purged())
    const run = started.daily.runs['10m']
    const near = { ...started, daily: { ...started.daily, runs: { '10m': { ...run, earnedBits: 10 ** (run.def.targetExponent - 0.5) * 8 } } } }
    const after = tickDailyRuns(T0 + 601 * 1000)(near)
    expect(after.daily.results['2026-11-12']['10m'].lastOutcome).toBe('completed')
    expect(getDailyCredits(after, '2026-11-12')).toEqual({ wins: 0, participation: 1, total: 1 })
  })

  test('credits are capped at 4 under unlimited retries', () => {
    let state = purged()
    for (let attempt = 0; attempt < 3; attempt++) {
      for (const { id } of DAILY_FORMATS) {
        state = startDailyRun(id, T0)(state)
        const run = state.daily.runs[id]
        state = { ...state, daily: { ...state.daily, runs: { ...state.daily.runs, [id]: { ...run, earnedBits: 10 ** (run.def.targetExponent + 1) * 8, lastTickAt: T0 } } } }
        state = tickDailyRuns(T0 + 1000)(state)
      }
    }
    expect(getDailyCredits(state, '2026-11-12')).toEqual({ wins: 3, participation: 1, total: 4 })
    expect(state.daily.results['2026-11-12']['10m'].attempts).toBe(3)
  })
})

// Reference bot: spends every action interval on Clock Speed, tiers (top-down), Scale Up and Overclock. Every
// generated definition must be won inside 90% of the limit (per-format action cadence below).
describe('solvability (reference bot)', () => {
  const cadence = { '10m': 2, '1h': 30, '10h': 600 }
  const dates = ['2026-11-12', '2026-12-31', '2027-01-01', '2027-02-28']
  test.each(DAILY_FORMATS.flatMap(format => dates.map(date => [format.id, date])))('%s on %s is winnable', (formatId, date) => {
    const start = Date.parse(`${date}T00:00:00Z`) + 1000
    let state = startDailyRun(formatId, start)(purged())
    const limit = DAILY_FORMATS.find(format => format.id === formatId).seconds * 0.9
    let t = 0
    while (t < limit && state.daily.runs[formatId]) {
      t += cadence[formatId]
      const now = start + t * 1000
      state = tickDailyRuns(now)(state)
      if (!state.daily.runs[formatId]) break
      state = buyDailyClockSpeed(formatId, now)(state)
      for (let i = TIER_DEFINITIONS.length - 1; i >= 0; i--) state = buyDailyTier(formatId, TIER_DEFINITIONS[i].id, now)(state)
      state = scaleUpDailyRun(formatId, now)(state)
      state = overclockDailyRun(formatId, now)(state)
    }
    expect(state.daily.results[date]?.[formatId]?.won).toBe(true)
  }, 120000)
})
