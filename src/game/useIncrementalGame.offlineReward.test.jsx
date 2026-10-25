import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createInitialGameState, getOfflineRewardBonusSeconds } from './engine'
import { saveGameState } from './storage'
import { useIncrementalGame } from './useIncrementalGame'

const AWAY_SECONDS = 2 * 3600

const seedSaveAway = seconds => {
  saveGameState(createInitialGameState())
  localStorage.setItem('tens_last_save_timestamp', String(Date.now() - seconds * 1000))
}

describe('useIncrementalGame claimOfflineAdReward', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => localStorage.clear())

  it('tops a reduced-speed absence up to 100% once, and marks the summary claimed', () => {
    seedSaveAway(AWAY_SECONDS)
    const { result, unmount } = renderHook(() => useIncrementalGame())
    const summary = result.current.offlineProgress
    expect(summary).toMatchObject({ effectiveSeconds: Math.floor(summary.elapsedRealSeconds / 2) })

    let claimed
    act(() => { claimed = result.current.claimOfflineAdReward(summary) })
    expect(claimed).toBe(true)
    expect(result.current.offlineProgress).toMatchObject({
      rewardClaimed: true,
      effectiveSeconds: summary.effectiveSeconds + getOfflineRewardBonusSeconds(summary.elapsedRealSeconds),
    })

    act(() => { claimed = result.current.claimOfflineAdReward(summary) })
    expect(claimed).toBe(false)
    act(() => { claimed = result.current.claimOfflineAdReward(result.current.offlineProgress) })
    expect(claimed).toBe(false)
    unmount()
  })

  it('still pays out when the notice was dismissed during the video', () => {
    seedSaveAway(AWAY_SECONDS)
    const { result, unmount } = renderHook(() => useIncrementalGame())
    const summary = result.current.offlineProgress
    act(() => result.current.dismissOfflineProgress())
    const before = result.current.state
    let claimed
    act(() => { claimed = result.current.claimOfflineAdReward(summary) })
    expect(claimed).toBe(true)
    expect(result.current.state).not.toBe(before)
    expect(result.current.offlineProgress).toBeNull()
    unmount()
  })

  it('ignores a missing summary', () => {
    const { result, unmount } = renderHook(() => useIncrementalGame())
    expect(result.current.claimOfflineAdReward(null)).toBe(false)
    unmount()
  })
})
