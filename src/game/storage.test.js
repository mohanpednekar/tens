import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createInitialGameState } from './engine'
import { DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_AUTO_INVEST_THRESHOLD, MONEY_ID, TIER_DEFINITIONS } from './layers'
import { clearGameState, loadGameState, loadLastSaveTimestamp, saveGameState } from './storage'

const tensTier = TIER_DEFINITIONS[0]
const thousandsTier = TIER_DEFINITIONS[1]

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('loadGameState', () => {
  it('returns null when nothing is saved', () => {
    expect(loadGameState()).toBeNull()
  })

  it('returns null for corrupt localStorage data', () => {
    localStorage.setItem('tens_game_state', 'not-json!!!')
    expect(loadGameState()).toBeNull()
  })

  it('returns null (rather than throwing) when localStorage.getItem itself throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError: private browsing')
    })
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

  it('preserves a saved tickspeedLevels value', () => {
    const state = {
      ...createInitialGameState(),
      tickspeedLevels: { ...createInitialGameState().tickspeedLevels, [tensTier.id]: 4 },
    }
    saveGameState(state)
    expect(loadGameState().tickspeedLevels[tensTier.id]).toBe(4)
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

  it('retroactively unlocks tier autobuyers a save\'s prestige.count already qualifies for under the new milestone-based unlock', () => {
    const saved = {
      ...createInitialGameState(),
      prestige: { ...createInitialGameState().prestige, count: 3 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(saved))
    const loaded = loadGameState()
    expect(loaded.autobuyers[TIER_DEFINITIONS[0].id]).toBe(1)
    expect(loaded.autobuyers[TIER_DEFINITIONS[1].id]).toBe(1)
    expect(loaded.autobuyers[TIER_DEFINITIONS[2].id]).toBe(1)
    expect(loaded.autobuyers[TIER_DEFINITIONS[3].id]).toBeNull()
  })

  it('never revokes a tier autobuyer already unlocked via the old PP-cost purchase', () => {
    const saved = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, [TIER_DEFINITIONS[5].id]: 1 },
      prestige: { ...createInitialGameState().prestige, count: 0 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(saved))
    const loaded = loadGameState()
    expect(loaded.autobuyers[TIER_DEFINITIONS[5].id]).toBe(1)
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

  it('derives purchaseLevels/purchaseLevelProgress from owned when both purchased and the new fields predate the save', () => {
    const { purchased: _droppedPurchased, purchaseLevels: _droppedLevels, purchaseLevelProgress: _droppedProgress, ...oldSave } = {
      ...createInitialGameState(),
      owned: { ...createInitialGameState().owned, [tensTier.id]: 19 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    // Same derivation as the purchased-count case above, fed through the saved.purchased ??
    // saved.owned fallback since this save has no purchased field at all.
    expect(loaded.purchaseLevels[tensTier.id]).toBe(3)
    expect(loaded.purchaseLevelProgress[tensTier.id]).toBe(3)
  })

  it('derives purchaseLevels/purchaseLevelProgress from a legacy purchased count on a save that predates those fields', () => {
    const { purchaseLevels: _droppedLevels, purchaseLevelProgress: _droppedProgress, ...oldSave } = {
      ...createInitialGameState(),
      purchased: { ...createInitialGameState().purchased, [tensTier.id]: 19 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    // 19 purchased at the default block size of 8: two full levels (16) completed, 3 left over —
    // level 3 (1-indexed), progress 3.
    expect(loaded.purchaseLevels[tensTier.id]).toBe(3)
    expect(loaded.purchaseLevelProgress[tensTier.id]).toBe(3)
  })

  it('derives level 1 / progress 0 from a legacy purchased count of 0', () => {
    const { purchaseLevels: _droppedLevels, purchaseLevelProgress: _droppedProgress, ...oldSave } = createInitialGameState()
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.purchaseLevels[tier.id]).toBe(1)
      expect(loaded.purchaseLevelProgress[tier.id]).toBe(0)
    })
  })

  it('derives exactly level 2 / progress 0 from a legacy purchased count equal to one full block size', () => {
    const { purchaseLevels: _droppedLevels, purchaseLevelProgress: _droppedProgress, ...oldSave } = {
      ...createInitialGameState(),
      purchased: { ...createInitialGameState().purchased, [tensTier.id]: DEFAULT_PURCHASE_BLOCK_SIZE },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.purchaseLevels[tensTier.id]).toBe(2)
    expect(loaded.purchaseLevelProgress[tensTier.id]).toBe(0)
  })

  it('prefers an explicit purchaseLevels/purchaseLevelProgress value over deriving one from purchased, per tier', () => {
    const base = createInitialGameState()
    const oldSave = {
      ...base,
      purchased: { ...base.purchased, [tensTier.id]: 19, [thousandsTier.id]: 19 },
      // Only tensTier carries an explicit (current-schema) value — thousandsTier has none, so it
      // must still be derived from its own purchased count instead of falling back to a default.
      purchaseLevels: { [tensTier.id]: 99 },
      purchaseLevelProgress: { [tensTier.id]: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.purchaseLevels[tensTier.id]).toBe(99)
    expect(loaded.purchaseLevelProgress[tensTier.id]).toBe(1)
    expect(loaded.purchaseLevels[thousandsTier.id]).toBe(3)
    expect(loaded.purchaseLevelProgress[thousandsTier.id]).toBe(3)
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

  it('defaults prestige.points to 0, smartAutobuyer/tierTickspeedAutobuyer to false, and autoPrestige to null for saves that predate them', () => {
    const oldSave = {
      resources: { Ones: 10 },
      autobuyers: { [tensTier.id]: 1 },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.prestige.points).toBe(0)
    expect(loaded.autoPrestige).toBeNull()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.smartAutobuyer[tier.id]).toBe(false)
      // Even for tensTier, already unlocked above — no backward-compat grandfathering, same as
      // smartAutobuyer: this is a new purchase requirement for every save going forward.
      expect(loaded.tierTickspeedAutobuyer[tier.id]).toBe(false)
    })
  })

  it('defaults autoSpeedUpEnabled/autoGlobalTickspeedEnabled/autoPrestigeEnabled to true for saves that predate the pause/resume feature', () => {
    const oldSave = {
      resources: { Ones: 10 },
      autoSpeedUp: true,
      autoGlobalTickspeed: true,
      autoPrestige: 2,
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.autoSpeedUpEnabled).toBe(true)
    expect(loaded.autoGlobalTickspeedEnabled).toBe(true)
    expect(loaded.autoPrestigeEnabled).toBe(true)
  })

  it('preserves an explicitly-paused (false) autoSpeedUpEnabled/autoGlobalTickspeedEnabled/autoPrestigeEnabled value', () => {
    const state = {
      ...createInitialGameState(),
      autoSpeedUp: true,
      autoSpeedUpEnabled: false,
      autoGlobalTickspeed: true,
      autoGlobalTickspeedEnabled: false,
      autoPrestige: 1,
      autoPrestigeEnabled: false,
    }
    saveGameState(state)
    const loaded = loadGameState()
    expect(loaded.autoSpeedUpEnabled).toBe(false)
    expect(loaded.autoGlobalTickspeedEnabled).toBe(false)
    expect(loaded.autoPrestigeEnabled).toBe(false)
  })

  it('backfills autobuyersEnabled/tierTickspeedAutobuyerEnabled to true for every tier on a save that predates the per-tier pause/resume feature', () => {
    const oldSave = {
      resources: { Ones: 10 },
      autobuyers: { [tensTier.id]: 1 },
      tierTickspeedAutobuyer: { [tensTier.id]: true },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.autobuyersEnabled[tier.id]).toBe(true)
      expect(loaded.tierTickspeedAutobuyerEnabled[tier.id]).toBe(true)
    })
  })

  it('preserves an explicitly-paused (false) autobuyersEnabled/tierTickspeedAutobuyerEnabled value', () => {
    const state = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, [tensTier.id]: 1 },
      autobuyersEnabled: { ...createInitialGameState().autobuyersEnabled, [tensTier.id]: false },
      tierTickspeedAutobuyer: { ...createInitialGameState().tierTickspeedAutobuyer, [tensTier.id]: true },
      tierTickspeedAutobuyerEnabled: { ...createInitialGameState().tierTickspeedAutobuyerEnabled, [tensTier.id]: false },
    }
    saveGameState(state)
    const loaded = loadGameState()
    expect(loaded.autobuyersEnabled[tensTier.id]).toBe(false)
    expect(loaded.tierTickspeedAutobuyerEnabled[tensTier.id]).toBe(false)
  })

  it('preserves a saved smartAutobuyer flag', () => {
    const state = {
      ...createInitialGameState(),
      smartAutobuyer: { ...createInitialGameState().smartAutobuyer, [tensTier.id]: true },
    }
    saveGameState(state)
    expect(loadGameState().smartAutobuyer[tensTier.id]).toBe(true)
  })

  it('preserves a saved tierTickspeedAutobuyer flag', () => {
    const state = {
      ...createInitialGameState(),
      tierTickspeedAutobuyer: { ...createInitialGameState().tierTickspeedAutobuyer, [tensTier.id]: true },
    }
    saveGameState(state)
    expect(loadGameState().tierTickspeedAutobuyer[tensTier.id]).toBe(true)
  })

  it('defaults everUnlockedTierIds to the fresh-state default (only the first tier true) on a save that predates it', () => {
    const { everUnlockedTierIds: _dropped, ...oldSave } = createInitialGameState()
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.everUnlockedTierIds[TIER_DEFINITIONS[0].id]).toBe(true)
    TIER_DEFINITIONS.slice(1).forEach(tier => {
      expect(loaded.everUnlockedTierIds[tier.id]).toBe(false)
    })
  })

  it('preserves a saved everUnlockedTierIds flag', () => {
    const state = {
      ...createInitialGameState(),
      everUnlockedTierIds: { ...createInitialGameState().everUnlockedTierIds, [tensTier.id]: true },
    }
    saveGameState(state)
    expect(loadGameState().everUnlockedTierIds[tensTier.id]).toBe(true)
  })

  it('defaults tickspeedLevels to 1 for every tier on a save that predates it', () => {
    const { tickspeedLevels: _dropped, ...oldSave } = createInitialGameState()
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    TIER_DEFINITIONS.forEach(tier => {
      expect(loaded.tickspeedLevels[tier.id]).toBe(1)
    })
  })

  it('recovers a legacy per-tier tickspeed level that used to be stored directly in autobuyers, before tickspeedLevels existed as its own field', () => {
    // Before this schema change, a tier's tickspeed level lived in autobuyers[tierId] itself
    // (autobuyer unlock and the tickspeed level were the same field) — a pre-migration save with
    // autobuyers.tensTier = 3 must recover that 3 into the new tickspeedLevels field rather than
    // silently resetting the player's tickspeed progress back to the baseline.
    const oldSave = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, [tensTier.id]: 3 },
    }
    const { tickspeedLevels: _dropped, ...rawSave } = oldSave
    localStorage.setItem('tens_game_state', JSON.stringify(rawSave))
    const loaded = loadGameState()
    expect(loaded.tickspeedLevels[tensTier.id]).toBe(3)
    expect(loaded.autobuyers[tensTier.id]).not.toBeNull()
  })

  it('recovers a legacy per-tier tickspeed level of exactly 2, the lowest value above the v > 1 baseline', () => {
    const oldSave = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, [tensTier.id]: 2 },
    }
    const { tickspeedLevels: _dropped, ...rawSave } = oldSave
    localStorage.setItem('tens_game_state', JSON.stringify(rawSave))
    const loaded = loadGameState()
    expect(loaded.tickspeedLevels[tensTier.id]).toBe(2)
  })

  it('does not recover a legacy tickspeed level from a legacy autobuyer value of exactly 1, since 1 is the baseline, not a level above it', () => {
    const oldSave = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, [tensTier.id]: 1 },
    }
    const { tickspeedLevels: _dropped, ...rawSave } = oldSave
    localStorage.setItem('tens_game_state', JSON.stringify(rawSave))
    const loaded = loadGameState()
    expect(loaded.tickspeedLevels[tensTier.id]).toBe(1)
  })

  it('prefers an explicit current-schema tickspeedLevels value over a legacy level recovered from autobuyers, when a save somehow has both', () => {
    const rawSave = {
      ...createInitialGameState(),
      autobuyers: { ...createInitialGameState().autobuyers, [tensTier.id]: 3 },
      tickspeedLevels: { ...createInitialGameState().tickspeedLevels, [tensTier.id]: 5 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(rawSave))
    const loaded = loadGameState()
    expect(loaded.tickspeedLevels[tensTier.id]).toBe(5)
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

  it('forwards a legacy resources.Ones balance to resources.base (MONEY_ID renamed from Ones to base)', () => {
    const oldSave = {
      resources: { Ones: 12345 },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.resources[MONEY_ID]).toBe(12345)
    expect(loaded.resources.Ones).toBeUndefined()
  })

  it('forwards a legacy resources.Ones balance of exactly 0 (not just a truthy amount)', () => {
    // The migration guard is `migratedResourcesRaw.base === undefined && legacyOnes !== undefined`
    // — an explicit undefined check, not a truthy check — so a legacy balance of exactly 0 must
    // still forward to resources.base rather than falling through to the fresh default.
    const oldSave = {
      resources: { Ones: 0 },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.resources[MONEY_ID]).toBe(0)
  })

  it('does not crash when resources is missing from the save entirely, falling back to fresh defaults', () => {
    const oldSave = {
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.resources[MONEY_ID]).toBe(createInitialGameState().resources[MONEY_ID])
  })

  it('prefers an explicit resources.base value over a legacy resources.Ones value when both are present', () => {
    const oldSave = {
      resources: { Ones: 5, base: 999 },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.resources[MONEY_ID]).toBe(999)
  })

  it('remaps legacy name-based tier ids to the new tier0N ids, shifted down one slot (Tens was old Bytes/tier01, now dropped; Thousands was old Kilobytes/tier02, now tier01)', () => {
    const oldSave = {
      resources: { Ones: 10, Tens: 3, Thousands: 1, Millions: 2 },
      owned: { Tens: 3, Thousands: 1, Millions: 2 },
      purchased: { Tens: 6, Thousands: 1, Millions: 2 },
      autobuyers: { Tens: 2, Thousands: null, Millions: 1 },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    // Tens (old tier01/Bytes) has no successor — dropped, not carried to new tier01.
    expect(loaded.resources.tier01).toBe(1) // from Thousands (old tier02/Kilobytes), not Tens' 3
    expect(loaded.resources.tier02).toBe(2) // from Millions (old tier03/Megabytes)
    expect(loaded.owned.tier01).toBe(1)
    expect(loaded.owned.tier02).toBe(2)
    expect(loaded.purchased.tier01).toBe(1)
    expect(loaded.purchased.tier02).toBe(2)
    expect(loaded.autobuyers.tier01).toBeNull() // from Thousands
    expect(loaded.autobuyers.tier02).toBe(1) // from Millions
  })

  it('shifts already-current-scheme tierNN keys down one slot too (old tier02/Kilobytes data becomes new tier01, old tier10/Ronnabytes data has no new home and is dropped)', () => {
    const oldSave = {
      resources: { base: 10, tier01: 999, tier02: 5, tier10: 7 },
      owned: { tier01: 999, tier02: 5, tier10: 7 },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    // Old tier01 (Bytes) data (999) is dropped, not misread as new tier01 (Kilobytes).
    expect(loaded.owned.tier01).toBe(5) // from old tier02 (Kilobytes)
    // Old tier10 (Ronnabytes) has no new tier11 to move to — dropped, new tier10 (Quettabytes)
    // starts fresh at 0, not misread as 7.
    expect(loaded.owned.tier10).toBe(0)
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

  it('strips a stale lastTierTickspeedXpUnlocked flag from an older save (replaced by a live owned >= 10 check)', () => {
    const oldSave = {
      resources: { Ones: 10 },
      lastTierTickspeedXpUnlocked: true,
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.lastTierTickspeedXpUnlocked).toBeUndefined()
  })

  it('backfills mainGameUnlocked to true (and a fully-spent transfer budget) for a save from before the Byte Foundry intro existed (no intro field at all)', () => {
    const oldSave = {
      resources: { base: 5000 },
      owned: { [tensTier.id]: 3 },
      prestige: { xp: 0, level: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.intro.mainGameUnlocked).toBe(true)
    expect(loaded.intro.bitsTransferredThisCycle).toBe(INTRO_AUTO_INVEST_THRESHOLD)
  })

  it('preserves a save\'s own in-progress intro state rather than backfilling it', () => {
    const state = {
      ...createInitialGameState(),
      intro: {
        bits: 5, productionAccumulator: 0.2, capacity: 80, byteCreated: true, tickSpeedSeconds: 0.5,
        productionMultiplier: 2, productionMilestoneTier: 1, productionMilestoneTierClaims: 1,
        mainGameUnlocked: false, bitsTransferredThisCycle: 0,
        storageBanks: { 1000: 1 }, storageBanksBuiltTotal: { 1000: 1 }, storageAutoRedeemEnabled: true,
        storageAutoRedeemedSizes: {},
      },
    }
    saveGameState(state)
    const loaded = loadGameState()
    expect(loaded.intro).toEqual(state.intro)
  })

  it('backfills mainGameUnlocked from an old boolean intro.completed field for a save that predates the mainGameUnlocked/bitsTransferredThisCycle split', () => {
    const unlockedOldSave = {
      ...createInitialGameState(),
      intro: { bits: 0, capacity: 8000, byteCreated: true, tickSpeedSeconds: 1, productionMultiplier: 1, completed: true },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(unlockedOldSave))
    const loadedUnlocked = loadGameState()
    expect(loadedUnlocked.intro.mainGameUnlocked).toBe(true)
    expect(loadedUnlocked.intro.bitsTransferredThisCycle).toBe(INTRO_AUTO_INVEST_THRESHOLD)

    const midGateOldSave = {
      ...createInitialGameState(),
      intro: { bits: 3, capacity: 8, byteCreated: false, tickSpeedSeconds: 1, productionMultiplier: 1, completed: false },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(midGateOldSave))
    const loadedMidGate = loadGameState()
    expect(loadedMidGate.intro.mainGameUnlocked).toBe(false)
    expect(loadedMidGate.intro.bitsTransferredThisCycle).toBe(0)
  })

  it('resets the removed productionMilestoneClaimedAtCapacity marker to a fresh tier 0 rather than misreading it', () => {
    const oldSave = {
      ...createInitialGameState(),
      intro: {
        bits: 0, capacity: 8000, byteCreated: true, tickSpeedSeconds: 1, productionMultiplier: 1,
        productionMilestoneClaimedAtCapacity: 800, mainGameUnlocked: true, bitsTransferredThisCycle: 0,
      },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.intro.productionMilestoneTier).toBe(0)
    expect(loaded.intro.productionMilestoneTierClaims).toBe(0)
  })

})

describe('clearGameState', () => {
  it('removes the saved state so loadGameState returns null', () => {
    saveGameState(createInitialGameState())
    clearGameState()
    expect(loadGameState()).toBeNull()
  })

  it('fails silently (rather than throwing) when localStorage.removeItem throws', () => {
    saveGameState(createInitialGameState())
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('quota exceeded')
    })
    expect(() => clearGameState()).not.toThrow()
  })

  it('fails silently even when only the second of its two removeItem calls throws', () => {
    // clearGameState removes the game-state key, then the last-save-timestamp key — confirm a
    // failure specifically on the second removal is caught too, not just a failure on the first
    // (same convention as saveGameState's own "second setItem call throws" test above).
    saveGameState(createInitialGameState())
    let callCount = 0
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      callCount += 1
      if (callCount === 2) throw new Error('quota exceeded')
    })
    expect(() => clearGameState()).not.toThrow()
  })
})

describe('saveGameState error handling', () => {
  it('fails silently (rather than throwing) when localStorage.setItem throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })
    expect(() => saveGameState(createInitialGameState())).not.toThrow()
  })

  it('fails silently even when only the second of its two setItem calls throws', () => {
    // saveGameState writes the game-state key, then the last-save-timestamp key — confirm a
    // failure specifically on the second write is caught too, not just a failure on the first.
    let callCount = 0
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      callCount += 1
      if (callCount === 2) throw new Error('QuotaExceededError')
    })
    expect(() => saveGameState(createInitialGameState())).not.toThrow()
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

  it('returns null (rather than throwing) when localStorage.getItem itself throws', () => {
    saveGameState(createInitialGameState())
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError: private browsing')
    })
    expect(loadLastSaveTimestamp()).toBeNull()
  })

  it('is cleared by clearGameState', () => {
    saveGameState(createInitialGameState())
    clearGameState()
    expect(loadLastSaveTimestamp()).toBeNull()
  })
})
