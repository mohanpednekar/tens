import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createInitialGameState, eraGame } from './engine'
import { ERA_ELIGIBILITY_PP, MONEY_ID, MONEY_STARTING_AMOUNT, COMPUTE_FLOPS_TIER_DEFINITIONS, PRESTIGE_UNBOUNDED_MIN_COUNT, TIER_DEFINITIONS } from './layers'
import { applyDevGameStateJson, clearAllSaveProgress, clearDevGameState, clearGameState, clearSaveSlot, completeDummySupporterPurchase, discardIncompatibleActiveSaveIfNeeded, getActiveSlotId, isDevModeActive, isSupporterUnlocked, listSaveSlots, loadGameState, loadLastSaveTimestamp, loadSavesMeta, loadThemePreference, redeemSupporterUnlockCode, renameSaveSlot, saveGameState, saveThemePreference, setActiveSaveSlot, setDevModeActive, SAVE_SCHEMA_VERSION, THEME_PREFERENCE_KEY, buildEraseAllSavesConfirmMessage, buildResetActiveSlotConfirmMessage, buildResetByteFoundryConfirmMessage, FREE_SLOT_COUNT, SUPPORTER_SLOT_COUNT, SUPPORTER_UNLOCK_CODE } from './storage'

const tensTier = TIER_DEFINITIONS[0]

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

  it('preserves a numeric autobuyer level of 0 (unlocked but idle)', () => {
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
  it('stamps saveSchemaVersion on every save', () => {
    saveGameState(createInitialGameState())
    const raw = JSON.parse(localStorage.getItem('tens_game_state'))
    expect(raw.saveSchemaVersion).toBe(SAVE_SCHEMA_VERSION)
    expect(loadGameState().resources[MONEY_ID]).toBe(createInitialGameState().resources[MONEY_ID])
  })
})

describe('discardIncompatibleActiveSaveIfNeeded', () => {
  it('removes an incompatible save and returns the reason code', () => {
    localStorage.setItem('tens_game_state', JSON.stringify({ resources: { Ones: 10 } }))
    expect(discardIncompatibleActiveSaveIfNeeded()).toBe('legacy_money_id')
    expect(loadGameState()).toBeNull()
    expect(localStorage.getItem('tens_game_state')).toBeNull()
  })

  it('is a no-op for a compatible partial save', () => {
    localStorage.setItem('tens_game_state', JSON.stringify({ intro: { mainGameUnlocked: true } }))
    expect(discardIncompatibleActiveSaveIfNeeded()).toBeNull()
    expect(loadGameState()?.intro.mainGameUnlocked).toBe(true)
  })
})

describe('schema merge on load', () => {
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

  it('defaults prestige.points to 0, smartAutobuyer/tierTickspeedAutobuyer to false, and autoPrestige to null for saves missing those fields', () => {
    const oldSave = {
      intro: { mainGameUnlocked: true },
      resources: { [MONEY_ID]: 10 },
      autobuyers: { [tensTier.id]: 1 },
      prestige: { xp: 0, count: 0, highestMilestone: 1 },
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

  it('forward-fills Era/Eons fields and Flops autobuyer milestones from a v1 save', () => {
    localStorage.setItem('tens_game_state', JSON.stringify({
      saveSchemaVersion: 1,
      intro: { mainGameUnlocked: true },
      prestige: { count: PRESTIGE_UNBOUNDED_MIN_COUNT, points: 0, xp: 0, highestMilestone: 0 },
      era: { count: 2 },
    }))
    const loaded = loadGameState()
    expect(loaded.prestige.unboundedUnlocked).toBe(true)
    expect(loaded.era.count).toBe(2)
    expect(loaded.eons.balance).toBe(0)
    expect(loaded.computeFlopsAutobuyers[COMPUTE_FLOPS_TIER_DEFINITIONS[0].id]).toBe(1)
    expect(loaded.computeFlopsAutobuyers[COMPUTE_FLOPS_TIER_DEFINITIONS[1].id]).toBe(1)
  })

  it('preserves Era ascension and automation flags after save round-trip', () => {
    const tier0 = TIER_DEFINITIONS[0].id
    let state = createInitialGameState()
    state = {
      ...state,
      intro: { ...state.intro, mainGameUnlocked: true, byteCreated: true },
      prestige: { ...state.prestige, points: ERA_ELIGIBILITY_PP, count: 3 },
      autobuyers: { ...state.autobuyers, [tier0]: 1 },
      autobuyersEnabled: { ...state.autobuyersEnabled, [tier0]: false },
    }
    state = eraGame(state)
    saveGameState(state)

    const loaded = loadGameState()
    expect(loaded.era.count).toBe(1)
    expect(loaded.eons.balance).toBe(1)
    expect(loaded.autobuyers[tier0]).toBe(1)
    expect(loaded.autobuyersEnabled[tier0]).toBe(false)
    expect(loaded.intro.mainGameUnlocked).toBe(false)
  })

  it('defaults autoSpeedUpEnabled/autoGlobalTickspeedEnabled/autoPrestigeEnabled to true for saves missing those fields', () => {
    const oldSave = {
      intro: { mainGameUnlocked: true },
      resources: { [MONEY_ID]: 10 },
      autoSpeedUp: true,
      autoGlobalTickspeed: true,
      autoPrestige: 2,
      prestige: { xp: 0, count: 0, highestMilestone: 1 },
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

  it('defaults autobuyersEnabled/tierTickspeedAutobuyerEnabled to true for every tier on a save missing those fields', () => {
    const oldSave = {
      intro: { mainGameUnlocked: true },
      resources: { [MONEY_ID]: 10 },
      autobuyers: { [tensTier.id]: 1 },
      tierTickspeedAutobuyer: { [tensTier.id]: true },
      prestige: { xp: 0, count: 0, highestMilestone: 1 },
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

  it('preserves a saved Auto-Prestige level', () => {
    const state = { ...createInitialGameState(), autoPrestige: 3 }
    saveGameState(state)
    expect(loadGameState().autoPrestige).toBe(3)
  })

  it('does not crash when resources is missing from the save entirely, falling back to fresh defaults', () => {
    const oldSave = {
      prestige: { xp: 0, count: 0, highestMilestone: 1 },
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.resources[MONEY_ID]).toBe(createInitialGameState().resources[MONEY_ID])
  })

  it('strips a stale lastTierTickspeedXpUnlocked flag from an older save (replaced by a live owned >= 10 check)', () => {
    const oldSave = {
      intro: { mainGameUnlocked: true },
      resources: { [MONEY_ID]: 10 },
      lastTierTickspeedXpUnlocked: true,
    }
    localStorage.setItem('tens_game_state', JSON.stringify(oldSave))
    const loaded = loadGameState()
    expect(loaded.lastTierTickspeedXpUnlocked).toBeUndefined()
  })

  it('discards legacy resources.Ones instead of loading them', () => {
    localStorage.setItem('tens_game_state', JSON.stringify({
      resources: { Ones: 12345 },
      prestige: { xp: 0, count: 0, highestMilestone: 1 },
    }))
    expect(discardIncompatibleActiveSaveIfNeeded()).toBe('legacy_money_id')
    expect(loadGameState()).toBeNull()
  })

  it('discards intro.completed saves instead of backfilling mainGameUnlocked', () => {
    localStorage.setItem('tens_game_state', JSON.stringify({
      intro: { completed: true },
      prestige: { xp: 0, count: 0, highestMilestone: 1 },
    }))
    expect(discardIncompatibleActiveSaveIfNeeded()).toBe('legacy_intro_gate')
    expect(loadGameState()).toBeNull()
  })

  it('preserves a save\'s own in-progress intro state', () => {
    const state = {
      ...createInitialGameState(),
      intro: {
        bits: 5, productionAccumulator: 0.2, capacity: 80, byteCreated: true, tickSpeedSeconds: 0.5,
        productionMultiplier: 2, productionMilestoneTier: 1, productionMilestoneTierClaims: 1,
        mainGameUnlocked: false,
        capacityUpgradeQueued: false,
        disks: { 8000: 1 }, disksBuiltTotal: { 8000: 1 }, diskCache: { 8000: 250 },
        diskBuild: { size: 80000, remainingSeconds: 4, totalSeconds: 10 },
        diskReadCacheFlush: {},
        diskWriteCache: {},
        diskAutoRedeemedSizes: {}, computeCores: 0, computeCoresEverEarned: 0, computeNodes: 0,
        computeClusters: 0, computeNetworks: 0, computeGrids: 0, computeFabrics: 0, computeClouds: 0,
        computeDatacenters: 0, computeSupercomputers: 0, computeMegacomputers: 0,
        computeMergePageUnlocked: false,
        autoClaimCoreEnabled: false, autoMergeCoresIntoNode: false, autoMergeNodesIntoCluster: false,
        autoMergeClustersIntoNetwork: false,
        autoMergeNetworksIntoGrid: false, autoMergeGridsIntoFabric: false, autoMergeFabricsIntoCloud: false,
        autoMergeCloudsIntoDatacenter: false, autoMergeDatacentersIntoSupercomputer: false,
        autoMergeSupercomputersIntoMegacomputer: false,
        computeMergeDurationUpgrades: 0,
        computeAutoBoostType: 'standard',
        computeCoresMergeRemainingSeconds: 0, computeNodesMergeRemainingSeconds: 0,
        computeClustersMergeRemainingSeconds: 0, computeNetworksMergeRemainingSeconds: 0,
        computeGridsMergeRemainingSeconds: 0, computeFabricsMergeRemainingSeconds: 0,
        computeCloudsMergeRemainingSeconds: 0, computeDatacentersMergeRemainingSeconds: 0,
        computeSupercomputersMergeRemainingSeconds: 0,
        computeBoostType: null, computeBoostTierIndex: null, computeBoostStacks: 0, computeBoostRemainingSeconds: 0,
        computeFundedBandwidthClaims: 0, computeBandwidthSacrificeIndex: 0,
        foundryResetCaps: null,
        dataLakes: createInitialGameState().intro.dataLakes,
      },
    }
    saveGameState(state)
    const loaded = loadGameState()
    expect(loaded.intro).toEqual(state.intro)
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

describe('supporter unlock + save slots', () => {
  it('starts with one unlocked slot and no supporter flag', () => {
    const meta = loadSavesMeta()
    expect(meta.unlockedSlotCount).toBe(FREE_SLOT_COUNT)
    expect(meta.supporterUnlocked).toBe(false)
    expect(listSaveSlots().filter(s => s.unlocked)).toHaveLength(FREE_SLOT_COUNT)
  })

  it('rejects an invalid unlock code', () => {
    expect(redeemSupporterUnlockCode('nope').ok).toBe(false)
    expect(isSupporterUnlocked()).toBe(false)
  })

  it('redeems TENS-SUPPORT (case-insensitive) and unlocks three slots', () => {
    const result = redeemSupporterUnlockCode('tens support')
    expect(result.ok).toBe(true)
    expect(isSupporterUnlocked()).toBe(true)
    expect(loadSavesMeta().unlockedSlotCount).toBe(SUPPORTER_SLOT_COUNT)
    expect(listSaveSlots().every(s => s.unlocked)).toBe(true)
  })

  it('dummy purchase grants the same entitlement', () => {
    expect(completeDummySupporterPurchase().ok).toBe(true)
    expect(isSupporterUnlocked()).toBe(true)
    expect(completeDummySupporterPurchase().already).toBe(true)
  })

  it('keeps slot 0 on the legacy tens_game_state key and isolates other slots', () => {
    saveGameState({
      ...createInitialGameState(),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 111 },
    })
    expect(JSON.parse(localStorage.getItem('tens_game_state')).resources[MONEY_ID]).toBe(111)

    redeemSupporterUnlockCode(SUPPORTER_UNLOCK_CODE)
    expect(setActiveSaveSlot('1').ok).toBe(true)
    expect(loadGameState()).toBeNull()
    saveGameState({
      ...createInitialGameState(),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 222 },
    })
    expect(localStorage.getItem('tens_slot_1_state')).toBeTruthy()

    expect(setActiveSaveSlot('0').ok).toBe(true)
    expect(loadGameState().resources[MONEY_ID]).toBe(111)

    clearGameState()
    expect(loadGameState()).toBeNull()
    expect(setActiveSaveSlot('1').ok).toBe(true)
    expect(loadGameState().resources[MONEY_ID]).toBe(222)
  })

  it('refuses switching to a locked slot', () => {
    expect(setActiveSaveSlot('2').ok).toBe(false)
  })

  it('renames an unlocked slot', () => {
    redeemSupporterUnlockCode(SUPPORTER_UNLOCK_CODE)
    expect(renameSaveSlot('1', 'Alt run').ok).toBe(true)
    expect(listSaveSlots().find(s => s.id === '1').name).toBe('Alt run')
  })

  it('clearSaveSlot wipes one slot and leaves others + unlock intact', () => {
    redeemSupporterUnlockCode(SUPPORTER_UNLOCK_CODE)
    saveGameState({
      ...createInitialGameState(),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 111 },
    })
    setActiveSaveSlot('1')
    saveGameState({
      ...createInitialGameState(),
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 222 },
    })

    expect(clearSaveSlot('0').ok).toBe(true)
    setActiveSaveSlot('0')
    expect(loadGameState()).toBeNull()
    setActiveSaveSlot('1')
    expect(loadGameState().resources[MONEY_ID]).toBe(222)
    expect(isSupporterUnlocked()).toBe(true)
  })

  it('clearAllSaveProgress wipes every slot but keeps supporterUnlocked', () => {
    redeemSupporterUnlockCode(SUPPORTER_UNLOCK_CODE)
    renameSaveSlot('1', 'Alt')
    saveGameState(createInitialGameState())
    setActiveSaveSlot('1')
    saveGameState(createInitialGameState())

    expect(clearAllSaveProgress().ok).toBe(true)
    expect(isSupporterUnlocked()).toBe(true)
    expect(listSaveSlots().find(s => s.id === '1').name).toBe('Alt')
    setActiveSaveSlot('0')
    expect(loadGameState()).toBeNull()
    setActiveSaveSlot('1')
    expect(loadGameState()).toBeNull()
  })

  it('reset confirm message names the active slot and mentions survivors when unlocked', () => {
    redeemSupporterUnlockCode(SUPPORTER_UNLOCK_CODE)
    renameSaveSlot('0', 'Main run')
    const message = buildResetActiveSlotConfirmMessage()
    expect(message).toContain('Main run')
    expect(message).toMatch(/other save slots/i)
    expect(message).toMatch(/supporter unlock/i)
    expect(buildEraseAllSavesConfirmMessage()).toMatch(/supporter unlock/i)
  })

  it('Byte Foundry reset confirm names losses and what stays', () => {
    renameSaveSlot('0', 'Foundry wipe')
    const message = buildResetByteFoundryConfirmMessage()
    expect(message).toContain('Foundry wipe')
    expect(message).toMatch(/capacity/i)
    expect(message).toMatch(/convenience/i)
    expect(message).toMatch(/auto-press/i)
    expect(message).toMatch(/invest/i)
    expect(message).toMatch(/disks\/storage/i)
    expect(message).toMatch(/compute/i)
    expect(message).toMatch(/also kept:\s*factory\b/i)
    expect(message).toMatch(/prestige points/i)
  })
})

describe('theme preference', () => {
  it('loadThemePreference returns system when unset', () => {
    expect(loadThemePreference()).toBe('system')
  })

  it('saveThemePreference persists system/light/dark and ignores invalid values on load', () => {
    saveThemePreference('light')
    expect(localStorage.getItem(THEME_PREFERENCE_KEY)).toBe('light')
    expect(loadThemePreference()).toBe('light')
    saveThemePreference('system')
    expect(localStorage.getItem(THEME_PREFERENCE_KEY)).toBe('system')
    expect(loadThemePreference()).toBe('system')
    localStorage.setItem(THEME_PREFERENCE_KEY, 'sepia')
    expect(loadThemePreference()).toBe('system')
  })

  it('clearGameState does not clear theme preference', () => {
    saveThemePreference('dark')
    saveGameState(createInitialGameState())
    clearGameState()
    expect(loadThemePreference()).toBe('dark')
  })
})

describe('Dev Mode', () => {
  it('defaults to inactive', () => {
    expect(isDevModeActive()).toBe(false)
    expect(getActiveSlotId()).toBe('0')
  })

  it('setDevModeActive redirects getActiveSlotId without touching saves meta', () => {
    setDevModeActive(true)
    expect(isDevModeActive()).toBe(true)
    expect(getActiveSlotId()).toBe('dev')
    expect(loadSavesMeta().activeSlotId).toBe('0')
    setDevModeActive(false)
    expect(isDevModeActive()).toBe(false)
    expect(getActiveSlotId()).toBe('0')
  })

  it('isolates the dev save from the real active slot', () => {
    const real = { ...createInitialGameState(), resources: { ...createInitialGameState().resources, [MONEY_ID]: 111 } }
    saveGameState(real)

    setDevModeActive(true)
    expect(loadGameState()).toBeNull()
    const dev = { ...createInitialGameState(), resources: { ...createInitialGameState().resources, [MONEY_ID]: 222 } }
    saveGameState(dev)
    expect(loadGameState().resources[MONEY_ID]).toBe(222)

    setDevModeActive(false)
    expect(loadGameState().resources[MONEY_ID]).toBe(111)
  })

  it('clearDevGameState only wipes the dev save', () => {
    saveGameState(createInitialGameState())
    setDevModeActive(true)
    saveGameState({ ...createInitialGameState(), resources: { ...createInitialGameState().resources, [MONEY_ID]: 999 } })
    clearDevGameState()
    expect(loadGameState()).toBeNull()
    setDevModeActive(false)
    expect(loadGameState().resources[MONEY_ID]).toBe(MONEY_STARTING_AMOUNT)
  })

  it('applyDevGameStateJson refuses to run outside Dev Mode', () => {
    const result = applyDevGameStateJson(JSON.stringify({ resources: { [MONEY_ID]: 5 } }), createInitialGameState())
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('dev_mode_inactive')
  })

  it('applyDevGameStateJson rejects invalid JSON without touching the dev save', () => {
    setDevModeActive(true)
    const currentState = { ...createInitialGameState(), resources: { ...createInitialGameState().resources, [MONEY_ID]: 42 } }
    saveGameState(currentState)
    const result = applyDevGameStateJson('not-json!!!', currentState)
    expect(result.ok).toBe(false)
    expect(result.reason).toBe('invalid_json')
    expect(loadGameState().resources[MONEY_ID]).toBe(42)
  })

  it('applyDevGameStateJson merges a partial object onto the current live state, not the parsed object alone', () => {
    setDevModeActive(true)
    const currentState = { ...createInitialGameState(), intro: { ...createInitialGameState().intro, mainGameUnlocked: true } }
    const result = applyDevGameStateJson(
      JSON.stringify({ resources: { [MONEY_ID]: 5e50 }, prestige: { points: 1000 } }),
      currentState,
    )
    expect(result.ok).toBe(true)
    expect(result.state.resources[MONEY_ID]).toBe(5e50)
    expect(result.state.prestige.points).toBe(1000)
    // A field the caller never mentioned (mainGameUnlocked) survives from currentState — a bare
    // { resources, prestige } object alone (no intro at all) would otherwise trip
    // getSaveIncompatibilityReason's 'missing_intro' legacy check and fail outright.
    expect(result.state.intro.mainGameUnlocked).toBe(true)
    // A sibling key inside the merged resources object (bytes) also survives, rather than being
    // dropped by a wholesale replace of the whole `resources` field.
    expect(result.state.resources.bytes).toBe(currentState.resources.bytes)
    expect(loadGameState().resources[MONEY_ID]).toBe(5e50)
  })
})
