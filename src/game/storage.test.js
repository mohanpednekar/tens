import { beforeEach, describe, expect, it } from 'vitest'
import { createInitialGameState } from './engine'
import { TIER_DEFINITIONS } from './layers'
import { clearGameState, loadGameState, saveGameState } from './storage'

beforeEach(() => {
  localStorage.clear()
})

describe('loadGameState', () => {
  it('returns null when nothing is saved', () => {
    expect(loadGameState()).toBeNull()
  })

  it('returns null for corrupt localStorage data', () => {
    localStorage.setItem('tens_game_state', 'not-json!!!')
    expect(loadGameState()).toBeNull()
  })
})

describe('saveGameState / loadGameState round-trip', () => {
  it('preserves money', () => {
    const state = {
      ...createInitialGameState(),
      resources: { ...createInitialGameState().resources, money: 12345 },
    }
    saveGameState(state)
    expect(loadGameState().resources.money).toBe(12345)
  })

  it('preserves owned counts', () => {
    const state = {
      ...createInitialGameState(),
      owned: { ...createInitialGameState().owned, ones: 42 },
    }
    saveGameState(state)
    expect(loadGameState().owned.ones).toBe(42)
  })

  it('preserves purchased counts', () => {
    const state = {
      ...createInitialGameState(),
      purchased: { ...createInitialGameState().purchased, ones: 12 },
    }
    saveGameState(state)
    expect(loadGameState().purchased.ones).toBe(12)
  })

  it('preserves prestige level and PP', () => {
    const state = {
      ...createInitialGameState(),
      prestige: { pp: 7, level: 3, highestMilestone: 5 },
    }
    saveGameState(state)
    const loaded = loadGameState()
    expect(loaded.prestige.level).toBe(3)
    expect(loaded.prestige.pp).toBe(7)
  })

  it('preserves autobuyer flags', () => {
    const state = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, ones: true },
    }
    saveGameState(state)
    expect(loadGameState().autobuyers.ones).toBe(true)
  })
})

describe('schema migration', () => {
  it('adds missing autobuyers field from an older save', () => {
    const { autobuyers: _dropped, ...oldSave } = createInitialGameState()
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.autobuyers).toBeDefined()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.autobuyers).toHaveProperty(tier.id)
    })
  })

  it('fills in missing resource keys from newer tiers', () => {
    const partial = {
      ...createInitialGameState(),
      resources: { money: 10 }, // only money, missing all others
    }
    localStorage.setItem('tens_game_state', JSON.stringify(partial))
    const loaded = loadGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.resources).toHaveProperty(tier.producesResourceId)
    })
  })

  it('fills in missing owned keys for newer tiers', () => {
    const partial = {
      ...createInitialGameState(),
      owned: { ones: 5 }, // only ones, missing others
    }
    localStorage.setItem('tens_game_state', JSON.stringify(partial))
    const loaded = loadGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.owned).toHaveProperty(tier.id)
    })
    expect(loaded.owned.ones).toBe(5) // existing value preserved
  })

  it('adds purchased from owned for older saves missing purchased', () => {
    const { purchased: _dropped, ...oldSave } = {
      ...createInitialGameState(),
      owned: { ...createInitialGameState().owned, ones: 7 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.purchased.ones).toBe(7)
  })
})

describe('clearGameState', () => {
  it('removes the saved state so loadGameState returns null', () => {
    saveGameState(createInitialGameState())
    clearGameState()
    expect(loadGameState()).toBeNull()
  })
})
