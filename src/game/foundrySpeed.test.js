import { PURGE_THRESHOLD } from './layers.js'
import { loadGameState, saveGameState } from './storage.js'
import {
  combineIntroByte, createInitialGameState, getFillCurveDelta, getFillCurveSeconds, getFoundrySpeed,
  getFoundrySpeedCooldownSeconds, getFoundrySpeedRemainingSeconds, getPoolAvailableFillRate,
  getPoolBufferCapacity, getPoolCapacityUnlockThresholdBits, provisionDisk, purgeGame, resetByteFoundry,
  saveFoundrySpeed, tapIntroBit, tickPoolBufferFill, tickQueuedDiskBuild,
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
    const benchmark = fillPool(initial, 1, 1)
    const selected = saveFoundrySpeed(1.5, 123)(benchmark)
    const purged = purgeGame({ ...selected, resources: { ...selected.resources, base: PURGE_THRESHOLD } })
    expect(purged.purge.count).toBe(1)
    expect(getFoundrySpeed(purged.intro)).toBe(1.5)
    expect(purged.intro.foundrySpeedSavedAtMs).toBe(123)
    expect(benchmark.intro.foundrySpeedFillTimes[1]).toBeDefined()
    expect(purged.intro.foundrySpeedFillTimes).toEqual(benchmark.intro.foundrySpeedFillTimes)
  })

  it('loads old saves at the current maximum and keeps a chosen speed, cooldown, and completed benchmark', () => {
    const oldIntro = { byteCreated: true, capacity: getPoolCapacityUnlockThresholdBits(2) }
    localStorage.setItem('tens_game_state', JSON.stringify({ intro: oldIntro }))
    try {
      expect(getFoundrySpeed(loadGameState().intro)).toBe(2)
      const initial = withEarned(atPool(2), 'foundrySprint')
      const benchmark = fillPool(initial, 1, 1)
      const one = saveFoundrySpeed(1, 0)(benchmark)
      saveGameState({ ...one, intro: { ...one.intro, foundrySpeedTrial: { kind: 'sprint' }, foundrySpeedBenchmark: { seconds: 30 } } })
      const loaded = loadGameState()
      expect(getFoundrySpeed(loaded.intro)).toBe(1)
      expect(getFoundrySpeedRemainingSeconds(loaded, 30_000)).toBe(3570)
      expect(loaded.intro.foundrySpeedFillTimes).toEqual(benchmark.intro.foundrySpeedFillTimes)
      expect(loaded.intro.foundrySpeedFills).toEqual({})
      expect(loaded.intro.foundrySpeedTrial).toBeUndefined()
      expect(loaded.intro.foundrySpeedBenchmark).toBeUndefined()
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

// Prepare real staging supply and use the same delivery step that runs in normal tickGame.
const fillPool = (state, pool, target, speed = getFoundrySpeed(state.intro)) => {
  const capacity = getPoolBufferCapacity(state, pool)
  const rate = getPoolAvailableFillRate(state, pool)
  const elapsed = getFillCurveSeconds(state.intro.poolBuffers[pool] ?? 0, capacity * target, capacity, rate, speed)
  return tickPoolBufferFill(elapsed + 0.01)({ ...state, intro: { ...state.intro, bits: state.intro.capacity } })
}

describe('Foundry speed achievements in live staging', () => {
  it('recognizes a faster partial fill only after an ordinary manual Provision Disk draw', () => {
    const filled = fillPool(atPool(2), 1, 0.3)
    expect(filled.achievements.earned.foundrySprint).toBeUndefined()
    expect(filled.intro.foundrySpeedFills[1].splitSeconds).toBeGreaterThan(0)
    const armed = provisionDisk(filled)
    const next = tickQueuedDiskBuild(0.1)(armed)
    expect(next.intro.poolBuffers[1]).toBeLessThan(filled.intro.poolBuffers[1])
    expect(next.achievements.earned.foundrySprint).toBe(true)
  })

  it('beats an earlier maximum fill with a live 1× fill in the same pool', () => {
    const initial = withEarned(atPool(2), 'foundrySprint')
    const recorded = fillPool(initial, 1, 1)
    expect(recorded.intro.foundrySpeedFillTimes[1].seconds).toBeGreaterThan(0)
    const saved = saveFoundrySpeed(1, 0)(recorded)
    const refill = { ...saved, intro: { ...saved.intro, poolBuffers: {} } }
    const won = fillPool(refill, 1, 1)
    expect(won.achievements.earned.foundrySlowWins).toBe(true)
    expect(getFoundrySpeedCooldownSeconds(won)).toBe(600)
  })

  it('records a real maximum-to-1× handoff in a late pool and rejects fixed settings', () => {
    const initial = withEarned(atPool(4), 'foundrySprint', 'foundrySlowWins')
    for (let tenth = 10; tenth <= 100; tenth += 1) {
      expect(getFillCurveSeconds(0.1, 1, 1, 1, tenth / 10)).toBeGreaterThanOrEqual(0.9)
    }
    const fixed = fillPool(initial, 4, 1)
    expect(fixed.achievements.earned.foundryHandoff).toBeUndefined()
    const halfway = fillPool(initial, 4, 0.5)
    expect(halfway.intro.foundrySpeedFills[4]?.early).toBe(true)
    const switched = saveFoundrySpeed(1, 12_300)(halfway)
    expect(switched.intro.foundrySpeedFills[4]?.switched).toBe(true)
    const won = fillPool(switched, 4, 1)
    expect(won.achievements.earned.foundryHandoff).toBe(true)
    expect(getFoundrySpeedCooldownSeconds(won)).toBe(60)
  })
})
