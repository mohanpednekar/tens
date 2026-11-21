import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { createInitialGameState } from 'game/engine'
import { saveGameState, serializeSaveForExport, setActiveSaveSlot } from 'game/storage'
import { useIncrementalGame } from 'game/useIncrementalGame'

const withEarned = earned => ({ ...createInitialGameState(), achievements: { earned, counters: { pings: 0 } } })

// Wholesale state replacements must bump the toast baseline epoch and carry the loaded (pre-catch-up) earned map.
describe('useIncrementalGame achievementBaseline', () => {
  beforeEach(() => localStorage.clear())

  it('starts at epoch 0 with the saved earned map', () => {
    saveGameState(withEarned({ helloWorld: true }))
    const { result, unmount } = renderHook(() => useIncrementalGame())
    expect(result.current.achievementBaseline).toEqual({ epoch: 0, earned: { helloWorld: true } })
    unmount()
  })

  it('switchSaveSlot rebaselines to the target slot\'s earned map', () => {
    localStorage.setItem('tens_saves_meta', JSON.stringify({ supporterUnlocked: true }))
    saveGameState(withEarned({ helloWorld: true }))
    setActiveSaveSlot(1)
    saveGameState(withEarned({ itCompiles: true, pingOfDeath: true }))
    setActiveSaveSlot(0)
    const { result, unmount } = renderHook(() => useIncrementalGame())
    act(() => { result.current.switchSaveSlot(1) })
    expect(result.current.achievementBaseline.epoch).toBe(1)
    expect(Object.keys(result.current.achievementBaseline.earned).sort()).toEqual(['itCompiles', 'pingOfDeath'])
    unmount()
  })

  it('applyCloudSave rebaselines to the imported earned map', () => {
    const { result, unmount } = renderHook(() => useIncrementalGame())
    act(() => { result.current.applyCloudSave(serializeSaveForExport(withEarned({ helloWorld: true }))) })
    expect(result.current.achievementBaseline).toEqual({ epoch: 1, earned: { helloWorld: true } })
    unmount()
  })

  it('resetGame rebaselines to an empty map', () => {
    saveGameState(withEarned({ helloWorld: true }))
    const { result, unmount } = renderHook(() => useIncrementalGame())
    act(() => { result.current.resetGame() })
    expect(result.current.achievementBaseline).toEqual({ epoch: 1, earned: {} })
    unmount()
  })
})
