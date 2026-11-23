import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { createInitialGameState } from './engine'
import { MONEY_ID } from './layers'
import { saveGameState } from './storage'
import { useIncrementalGame } from './useIncrementalGame'

const seed = () => {
  const fresh = createInitialGameState()
  saveGameState({
    ...fresh,
    intro: { ...fresh.intro, mainGameUnlocked: true },
    resources: { ...fresh.resources, [MONEY_ID]: 1e12 },
    manualPurchaseThisCycle: false,
    buyMaxUnlocked: true,
  })
}

describe('useIncrementalGame manual purchase marking', () => {
  beforeEach(() => { localStorage.clear(); seed() })

  it.each([
    ['batched Buy', () => {}],
    ['unit-mode Buy', result => result.current.setBuyUnitMode(true)],
    ['Buy-max Buy', result => result.current.setBuyMaxMode(true)],
  ])('a manual %s sets manualPurchaseThisCycle', (_name, setup) => {
    const { result, unmount } = renderHook(() => useIncrementalGame())
    expect(result.current.state.manualPurchaseThisCycle).toBe(false)
    act(() => setup(result))
    act(() => result.current.actions.buyTierQuantity('tier01'))
    expect(result.current.state.owned.tier01).toBeGreaterThan(0)
    expect(result.current.state.manualPurchaseThisCycle).toBe(true)
    unmount()
  })
})
