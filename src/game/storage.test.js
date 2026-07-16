import { beforeEach, describe, expect, it } from 'vitest'
import { createInitialGameState } from './engine'
import { MONEY_ID, TIER_DEFINITIONS } from './layers'
import { clearGameState, loadGameState, loadLastSaveTimestamp, saveGameState } from './storage'

const tensTier = TIER_DEFINITIONS[0]

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
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 12345 },
    }
    saveGameState(state)
    expect(loadGameState().resources[MONEY_ID]).toBe(12345)
  })

  it('preserves owned counts', () => {
    const state = {
      ...createInitialGameState(),
      owned: { ...createInitialGameState().owned, [tensTier.id]: 42 },
    }
    saveGameState(state)
    expect(loadGameState().owned[tensTier.id]).toBe(42)
  })

  it('preserves purchased counts', () => {
    const state = {
      ...createInitialGameState(),
      purchased: { ...createInitialGameState().purchased, [tensTier.id]: 12 },
    }
    saveGameState(state)
    expect(loadGameState().purchased[tensTier.id]).toBe(12)
  })

  it('preserves prestige count, points, and XP', () => {
    const state = {
      ...createInitialGameState(),
      prestige: { xp: 7, points: 4, count: 3, highestMilestone: 5 },
    }
    saveGameState(state)
    const loaded = loadGameState()
    expect(loaded.prestige.count).toBe(3)
    expect(loaded.prestige.points).toBe(4)
    expect(loaded.prestige.xp).toBe(7)
  })

  it('preserves autobuyer levels', () => {
    const state = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, [tensTier.id]: 2 },
    }
    saveGameState(state)
    expect(loadGameState().autobuyers[tensTier.id]).toBe(2)
  })

  it('migrates legacy boolean autobuyer true to level 1', () => {
    const rawState = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, [tensTier.id]: true },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(rawState))
    expect(loadGameState().autobuyers[tensTier.id]).toBe(1)
  })

  it('migrates legacy boolean autobuyer false to null (locked)', () => {
    const rawState = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, [tensTier.id]: false },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(rawState))
    expect(loadGameState().autobuyers[tensTier.id]).toBeNull()
  })

  it('preserves a numeric autobuyer level of 0 (unlocked but idle) rather than relocking it', () => {
    // Regression test: level 0 is a legitimate current-schema value (unlocked, not yet
    // upgraded, or reset to 0 by a prestige) — it must survive a save/load round-trip
    // unchanged, not be conflated with the legacy boolean `false` and remapped to null.
    const rawState = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, [tensTier.id]: 0 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(rawState))
    expect(loadGameState().autobuyers[tensTier.id]).toBe(0)
  })

  it('preserves a fractional autobuyer attempt budget', () => {
    const state = {
      ...createInitialGameState(),
      autobuyerAttemptBudgets: { ...createInitialGameState().autobuyerAttemptBudgets, [tensTier.id]: 0.7 },
    }
    saveGameState(state)
    expect(loadGameState().autobuyerAttemptBudgets[tensTier.id]).toBeCloseTo(0.7)
  })

  it('preserves a fractional tier production accumulator', () => {
    const state = {
      ...createInitialGameState(),
      tierProductionAccumulators: { ...createInitialGameState().tierProductionAccumulators, [tensTier.id]: 0.4 },
    }
    saveGameState(state)
    expect(loadGameState().tierProductionAccumulators[tensTier.id]).toBeCloseTo(0.4)
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

  it('defaults autobuyerAttemptBudgets to 0 for every tier on a save that predates it', () => {
    const { autobuyerAttemptBudgets: _dropped, ...oldSave } = createInitialGameState()
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.autobuyerAttemptBudgets[tier.id]).toBe(0)
    })
  })

  it('defaults tierProductionAccumulators to 0 for every tier on a save that predates it', () => {
    const { tierProductionAccumulators: _dropped, ...oldSave } = createInitialGameState()
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.tierProductionAccumulators[tier.id]).toBe(0)
    })
  })

  it('fills in missing resource keys from newer tiers', () => {
    const partial = {
      ...createInitialGameState(),
      resources: { [MONEY_ID]: 10 }, // only money, missing all others
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
      owned: { [tensTier.id]: 5 }, // only the first tier, missing others
    }
    localStorage.setItem('tens_game_state', JSON.stringify(partial))
    const loaded = loadGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.owned).toHaveProperty(tier.id)
    })
    expect(loaded.owned[tensTier.id]).toBe(5) // existing value preserved
  })

  it('adds purchased from owned for older saves missing purchased', () => {
    const { purchased: _removedForTest, ...oldSave } = {
      ...createInitialGameState(),
      owned: { ...createInitialGameState().owned, [tensTier.id]: 7 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.purchased[tensTier.id]).toBe(7)
  })

  it('migrates a legacy save\'s prestige.pp into prestige.xp, and level into count', () => {
    const oldSave = {
      ...createInitialGameState(),
      prestige: { pp: 5, level: 2, highestMilestone: 3 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.prestige.xp).toBe(5)
    expect(loaded.prestige.count).toBe(2)
  })

  it('prefers an explicit xp value over a legacy pp value when both are present', () => {
    const oldSave = {
      ...createInitialGameState(),
      prestige: { pp: 5, xp: 9, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.prestige.xp).toBe(9)
  })

  it('prefers an explicit count value over a legacy level value when both are present', () => {
    const oldSave = {
      ...createInitialGameState(),
      prestige: { xp: 0, level: 5, count: 9, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.prestige.count).toBe(9)
  })

  it('defaults prestige.points to 0, autobuyerAutomation/smartAutobuyer to false, and autoPrestige to null for saves that predate them', () => {
    const oldSave = {
      resources: { Ones: 10 },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.prestige.points).toBe(0)
    expect(loaded.autoPrestige).toBeNull()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.autobuyerAutomation[tier.id]).toBe(false)
      expect(loaded.smartAutobuyer[tier.id]).toBe(false)
    })
  })

  it('preserves a saved smartAutobuyer flag', () => {
    const state = {
      ...createInitialGameState(),
      smartAutobuyer: { ...createInitialGameState().smartAutobuyer, [tensTier.id]: true },
    }
    saveGameState(state)
    expect(loadGameState().smartAutobuyer[tensTier.id]).toBe(true)
  })

  it('preserves a saved Auto-Prestige level', () => {
    const state = { ...createInitialGameState(), autoPrestige: 3 }
    saveGameState(state)
    expect(loadGameState().autoPrestige).toBe(3)
  })

  it('migrates a legacy boolean autoPrestige true to level 1', () => {
    const rawState = { ...createInitialGameState(), autoPrestige: true }
    localStorage.setItem('tens_game_state', JSON.stringify(rawState))
    expect(loadGameState().autoPrestige).toBe(1)
  })

  it('migrates a legacy boolean autoPrestige false to null (not yet bought)', () => {
    const rawState = { ...createInitialGameState(), autoPrestige: false }
    localStorage.setItem('tens_game_state', JSON.stringify(rawState))
    expect(loadGameState().autoPrestige).toBeNull()
  })

  it('remaps legacy name-based tier ids to the new tier0N ids', () => {
    const oldSave = {
      resources: { Ones: 10, Tens: 3, Thousands: 1 },
      owned: { Tens: 3, Thousands: 1 },
      purchased: { Tens: 6, Thousands: 1 },
      autobuyers: { Tens: 2, Thousands: null },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.resources.tier01).toBe(3)
    expect(loaded.resources.tier02).toBe(1)
    expect(loaded.owned.tier01).toBe(3)
    expect(loaded.owned.tier02).toBe(1)
    expect(loaded.purchased.tier01).toBe(6)
    expect(loaded.purchased.tier02).toBe(1)
    expect(loaded.autobuyers.tier01).toBe(2)
    expect(loaded.autobuyers.tier02).toBeNull()
  })

  it('drops data under removed legacy tier ids (Nonillions/Decillions) without error', () => {
    const oldSave = {
      resources: { Ones: 10, Nonillions: 5, Decillions: 2 },
      owned: { Nonillions: 5, Decillions: 2 },
      purchased: { Nonillions: 5, Decillions: 2 },
      autobuyers: { Nonillions: 1, Decillions: null },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.resources.Nonillions).toBeUndefined()
    expect(loaded.resources.Decillions).toBeUndefined()
    expect(loaded.owned.Nonillions).toBeUndefined()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.owned).toHaveProperty(tier.id)
    })
  })
})

describe('clearGameState', () => {
  it('removes the saved state so loadGameState returns null', () => {
    saveGameState(createInitialGameState())
    clearGameState()
    expect(loadGameState()).toBeNull()
  })
})

describe('saveGameState / loadLastSaveTimestamp', () => {
  it('returns null when nothing has ever been saved', () => {
    expect(loadLastSaveTimestamp()).toBeNull()
  })

  it('records a timestamp when the game is saved', () => {
    const before = Date.now()
    saveGameState(createInitialGameState())
    const after = Date.now()
    const timestamp = loadLastSaveTimestamp()
    expect(timestamp).toBeGreaterThanOrEqual(before)
    expect(timestamp).toBeLessThanOrEqual(after)
  })

  it('returns null for a corrupt stored timestamp', () => {
    saveGameState(createInitialGameState())
    localStorage.setItem('tens_last_save_timestamp', 'not-a-number')
    expect(loadLastSaveTimestamp()).toBeNull()
  })

  it('is cleared by clearGameState', () => {
    saveGameState(createInitialGameState())
    clearGameState()
    expect(loadLastSaveTimestamp()).toBeNull()
  })
})
