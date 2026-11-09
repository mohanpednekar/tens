import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createInitialGameState, getOfflineRewardBonusSeconds } from './engine'
import { TICK_RATE_MS } from './layers'
import { saveGameState } from './storage'
import { useIncrementalGame } from './useIncrementalGame'

const AWAY_SECONDS = 2 * 3600

const seedSaveAway = seconds => {
  const fresh = createInitialGameState()
  // A producing Kilobytes tier, so catch-up and bonus seconds show up in the Bits balance.
  saveGameState({ ...fresh, intro: { ...fresh.intro, mainGameUnlocked: true }, owned: { ...fresh.owned, tier01: 5 } })
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

describe('useIncrementalGame background catch-up vs. a just-claimed bonus', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' })
  })

  // Claim + resume in the same batch, as when a rewarded video closes and the app is foregrounded.
  const resumeAfterVideo = claim => {
    seedSaveAway(AWAY_SECONDS)
    const { result, unmount } = renderHook(() => useIncrementalGame())
    const summary = result.current.offlineProgress
    vi.setSystemTime(Date.now() + 30_000)
    act(() => {
      if (claim) result.current.claimOfflineAdReward(summary)
      document.dispatchEvent(new Event('visibilitychange'))
    })
    const snapshot = { money: result.current.state.resources.base, offlineProgress: result.current.offlineProgress }
    unmount()
    return snapshot
  }

  it('keeps the bonus and the claimed notice when a short background gap is caught up', () => {
    const withoutClaim = resumeAfterVideo(false)
    localStorage.clear()
    const withClaim = resumeAfterVideo(true)
    vi.useRealTimers()
    expect(withClaim.money).toBeGreaterThan(withoutClaim.money)
    expect(withClaim.offlineProgress).toMatchObject({ rewardClaimed: true })
    expect(withoutClaim.offlineProgress).not.toBeNull()
  })
})

describe('useIncrementalGame hidden-tab ticks vs active playtime', () => {
  let visibility = 'visible'

  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    visibility = 'visible'
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => visibility,
    })
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('credits playtime while visible, not while hidden, and still ticks the game when hidden', () => {
    const fresh = createInitialGameState()
    saveGameState({
      ...fresh,
      intro: { ...fresh.intro, mainGameUnlocked: true },
      owned: { ...fresh.owned, tier01: 5 },
    })
    const { result, unmount } = renderHook(() => useIncrementalGame())
    const startPlay = result.current.state.activePlaySeconds

    act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
    const afterVisiblePlay = result.current.state.activePlaySeconds
    expect(afterVisiblePlay).toBeGreaterThan(startPlay)

    visibility = 'hidden'
    const moneyBeforeHidden = result.current.state.resources.base
    // 1s gap is under BACKGROUND_TICK_GAP_THRESHOLD_SECONDS (2s) — the throttled-hidden-tab case.
    vi.setSystemTime(Date.now() + 1000)
    // One live tick is 0.1s; Kilobytes produce once per second, so ten ticks are needed
    // to prove the hidden path still runs tickGame.
    for (let i = 0; i < 10; i += 1) {
      act(() => { vi.advanceTimersByTime(TICK_RATE_MS) })
    }
    expect(result.current.state.activePlaySeconds).toBe(afterVisiblePlay)
    expect(result.current.state.resources.base).toBeGreaterThan(moneyBeforeHidden)

    unmount()
    vi.useRealTimers()
  })
})
