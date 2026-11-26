import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { createInitialGameState, isBuyMaxUnlocked } from './engine'
import { MONEY_ID } from './layers'
import { saveGameState } from './storage'
import { useIncrementalGame } from './useIncrementalGame'

const seedBits = bits => {
  const fresh = createInitialGameState()
  saveGameState({ ...fresh, intro: { ...fresh.intro, mainGameUnlocked: true }, resources: { ...fresh.resources, [MONEY_ID]: bits } })
}

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

const click = (result, times, name = 'buyTierQuantity', arg = 'tier01') => {
  for (let i = 0; i < times; i += 1) act(() => result.current.actions[name](arg))
}

describe('useIncrementalGame Buy-max rush achievement', () => {
  beforeEach(() => localStorage.clear())

  it('10 successful manual clicks on one Buy button unlock Buy max', () => {
    seedBits(1e12)
    const { result, unmount } = renderHook(() => useIncrementalGame())
    act(() => result.current.setBuyUnitMode(true))
    expect(isBuyMaxUnlocked(result.current.state)).toBe(false)
    click(result, 9)
    expect(isBuyMaxUnlocked(result.current.state)).toBe(false)
    click(result, 1)
    expect(result.current.state.achievements.earned.buyMaxRush).toBe(true)
    expect(isBuyMaxUnlocked(result.current.state)).toBe(true)
    unmount()
  })

  it('a click on a different button in between restarts the count', () => {
    seedBits(1e12)
    const { result, unmount } = renderHook(() => useIncrementalGame())
    act(() => result.current.setBuyUnitMode(true))
    click(result, 5)
    click(result, 1, 'buyTickspeedMultiplier')
    click(result, 5)
    expect(isBuyMaxUnlocked(result.current.state)).toBe(false)
    unmount()
  })

  it('clicks that buy nothing never count', () => {
    seedBits(0)
    const { result, unmount } = renderHook(() => useIncrementalGame())
    click(result, 12)
    expect(isBuyMaxUnlocked(result.current.state)).toBe(false)
    unmount()
  })
})
