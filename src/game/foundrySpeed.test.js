import { PURGE_THRESHOLD } from './layers.js'
import { loadGameState, saveGameState } from './storage.js'
import {
  applyOfflineProgress, combineIntroByte, createInitialGameState, getFillCurveDelta, getFillCurveSeconds,
  getFoundrySpeed, getFoundrySpeedCooldownSeconds, getFoundrySpeedRemainingSeconds,
  getPoolCapacityUnlockThresholdBits, purgeGame, resetByteFoundry, saveFoundrySpeed, spendFoundrySprintData,
  startFoundrySpeedTrial, tapIntroBit, tickFoundrySpeedTrial,
} from './engine.js'

const SECOND = 1000
const atPool = (pool, intro = {}) => {
  const state = createInitialGameState()
  const capacity = getPoolCapacityUnlockThresholdBits(pool)
  return { ...state, intro: { ...state.intro, byteCreated: true, capacity, speedCapacity: capacity, ...intro } }
}

const withEarned = (state, ...ids) => ({
  ...state,
  achievements: { ...state.achievements, earned: Object.fromEntries(ids.map(id => [id, true])) },
})

describe('Foundry speed progression', () => {
  it('requires eight one-bit pings to compile a byte', () => {
    let state = createInitialGameState()
    for (let count = 1; count <= 8; count += 1) {
      state = tapIntroBit(state)
      expect(state.intro.bits).toBe(count)
      if (count < 8) expect(combineIntroByte(state)).toBe(state)
    }
    expect(combineIntroByte(state).intro.byteCreated).toBe(true)
  })

  it('starts at 1×, follows the maximum, and preserves a lower choice across unlocks and Reformat', () => {
    expect(getFoundrySpeed(createInitialGameState().intro)).toBe(1)
    expect(getFoundrySpeed(atPool(1).intro)).toBe(1)
    expect(getFoundrySpeed(atPool(2).intro)).toBe(2)
    expect(getFoundrySpeed(atPool(3).intro)).toBe(3)
    const selected = saveFoundrySpeed(1.4, 100)(atPool(2))
    expect(getFoundrySpeed(atPool(3, { foundrySpeedSelection: selected.intro.foundrySpeedSelection }).intro)).toBe(1.4)
    const reformatted = resetByteFoundry(selected)
    expect(getFoundrySpeed(reformatted.intro)).toBe(1)
    expect(reformatted.intro.foundrySpeedSelection).toBe(1.4)
    expect(reformatted.intro.foundrySpeedSavedAtMs).toBe(100)
  })

  it('persists changed selections only, and shortens the existing cooldown as achievements are earned', () => {
    const initial = atPool(3)
    expect(saveFoundrySpeed(3, 0)(initial)).toBe(initial)
    const saved = saveFoundrySpeed(1, 0)(initial)
    expect(getFoundrySpeedCooldownSeconds(saved)).toBe(36_000)
    expect(saveFoundrySpeed(2, 3600 * SECOND)(saved)).toBe(saved)
    const sprint = withEarned(saved, 'foundrySprint')
    expect(getFoundrySpeedCooldownSeconds(sprint)).toBe(3600)
    expect(getFoundrySpeedRemainingSeconds(sprint, 3599 * SECOND)).toBe(1)
    const maximum = saveFoundrySpeed(3, 3600 * SECOND)(sprint)
    expect(maximum.intro.foundrySpeedSelection).toBeNull()
    expect(getFoundrySpeed({ ...maximum.intro, capacity: getPoolCapacityUnlockThresholdBits(4) })).toBe(4)
    expect(maximum.intro.foundrySpeedSavedAtMs).toBe(3600 * SECOND)
  })

  it('keeps the saved speed, cooldown, and comparison benchmark through a Purge', () => {
    const initial = withEarned(atPool(2), 'foundrySprint')
    const benchmark = tickFoundrySpeedTrial(40)(startFoundrySpeedTrial(0)(initial))
    const selected = saveFoundrySpeed(1.5, 123)(benchmark)
    const purged = purgeGame({ ...selected, resources: { ...selected.resources, base: PURGE_THRESHOLD } })
    expect(purged.purge.count).toBe(1)
    expect(getFoundrySpeed(purged.intro)).toBe(1.5)
    expect(purged.intro.foundrySpeedSavedAtMs).toBe(123)
    expect(purged.intro.foundrySpeedBenchmark).toEqual(benchmark.intro.foundrySpeedBenchmark)
  })

  it('loads old saves at the current maximum and keeps a chosen speed, cooldown, and completed benchmark', () => {
    const oldIntro = { byteCreated: true, capacity: getPoolCapacityUnlockThresholdBits(2) }
    localStorage.setItem('tens_game_state', JSON.stringify({ intro: oldIntro }))
    try {
      expect(getFoundrySpeed(loadGameState().intro)).toBe(2)
      const initial = withEarned(atPool(2), 'foundrySprint')
      const benchmark = tickFoundrySpeedTrial(40)(startFoundrySpeedTrial(0)(initial))
      const one = saveFoundrySpeed(1, 0)(benchmark)
      saveGameState(startFoundrySpeedTrial(0)(one))
      const loaded = loadGameState()
      expect(getFoundrySpeed(loaded.intro)).toBe(1)
      expect(getFoundrySpeedRemainingSeconds(loaded, 30_000)).toBe(3570)
      expect(loaded.intro.foundrySpeedBenchmark).toEqual(benchmark.intro.foundrySpeedBenchmark)
      expect(loaded.intro.foundrySpeedTrial).toBeNull()
    } finally {
      localStorage.clear()
    }
  })

  it('uses linear delivery at 1× and reports a higher setting as quicker early but slower in total', () => {
    const fillTime = (end, speed) => getFillCurveSeconds(0, end, 100, 10, speed)
    expect(fillTime(100, 1)).toBe(10)
    expect(getFillCurveDelta(20, 100, 10, 3, 1)).toBe(30)
    expect(fillTime(25, 2)).toBeLessThan(fillTime(25, 1))
    expect(fillTime(100, 2)).toBeGreaterThan(fillTime(100, 1))
  })
})

describe('Foundry speed achievement attempts', () => {
  it('retries a missed Sprint and spends the test data while leaving actual staging alone', () => {
    const initial = atPool(2, { poolBuffers: { 1: 8_000, 2: 8_000_000 } })
    const firstAttempt = startFoundrySpeedTrial(0)(initial)
    expect(spendFoundrySprintData(firstAttempt)).toBe(firstAttempt)
    const missed = tickFoundrySpeedTrial(20)(firstAttempt)
    expect(missed.intro.foundrySpeedTrial.result).toBe('missed')
    expect(spendFoundrySprintData(missed)).toBe(missed)
    const filled = tickFoundrySpeedTrial(2)(startFoundrySpeedTrial(20_000)(missed))
    expect(filled.achievements.earned.foundrySprint).toBeUndefined()
    const spent = spendFoundrySprintData(filled)
    expect(spent.intro.foundrySpeedTrial.bits).toBeCloseTo(filled.intro.foundrySpeedTrial.bits - filled.intro.foundrySpeedTrial.capacity * 0.1)
    expect(spent.achievements.earned.foundrySprint).toBe(true)
    expect(spent.intro.poolBuffers).toBe(initial.intro.poolBuffers)
  })

  it('compares two full fills at matching test capacity and in the same pool', () => {
    const initial = withEarned(atPool(2), 'foundrySprint')
    const benchmark = tickFoundrySpeedTrial(40)(startFoundrySpeedTrial(0)(initial))
    expect(benchmark.intro.foundrySpeedBenchmark.seconds).toBeGreaterThan(30)
    const one = saveFoundrySpeed(1, 0)(benchmark)
    const expanded = { ...one, intro: { ...one.intro, capacity: getPoolCapacityUnlockThresholdBits(3) } }
    expect(startFoundrySpeedTrial(0)(expanded)).toBe(expanded)
    const won = tickFoundrySpeedTrial(30)(startFoundrySpeedTrial(0)(one))
    expect(won.achievements.earned.foundrySlowWins).toBe(true)
    expect(getFoundrySpeedCooldownSeconds(won)).toBe(600)
  })

  it('requires an eligible mid-fill save and rules out every supported fixed setting', () => {
    const initial = withEarned(atPool(4), 'foundrySprint', 'foundrySlowWins')
    const start = startFoundrySpeedTrial(0)(initial)
    for (let tenth = 10; tenth <= 100; tenth += 1) {
      expect(getFillCurveSeconds(0, 1, 1, 1 / 30, tenth / 10)).toBeGreaterThanOrEqual(30)
    }
    expect(tickFoundrySpeedTrial(25)(start).intro.foundrySpeedTrial.result).toBe('missed')
    expect(saveFoundrySpeed(1, 0)(start).intro.foundrySpeedTrial).toBeNull()
    expect(applyOfflineProgress(2)(start).intro.foundrySpeedTrial).toBeNull()

    let state = start
    for (let step = 0; step < 81; step += 1) state = tickFoundrySpeedTrial(0.1)(state)
    state = saveFoundrySpeed(1, 8100)(state)
    for (let step = 0; step < 170; step += 1) state = tickFoundrySpeedTrial(0.1)(state)
    expect(state.intro.foundrySpeedTrial.result).toBe('passed')
    expect(state.achievements.earned.foundryHandoff).toBe(true)
    expect(getFoundrySpeedCooldownSeconds(state)).toBe(60)
  })
})
