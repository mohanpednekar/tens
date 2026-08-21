import { describe, expect, it } from 'vitest'
import {
  createInitialGameState,
  getIntroKilobyteConversionCost,
} from 'game/engine'
import {
  DEFAULT_PURCHASE_BLOCK_SIZE,
  INTRO_BYTE_COMBINE_COST,
  INTRO_CONVERSION_UNLOCK_CAPACITY,
  INTRO_DISK_UNLOCK_CAPACITY,
  INTRO_STARTING_CAPACITY,
  MONEY_ID,
  PRESTIGE_THRESHOLD,
  TIER_DEFINITIONS,
} from 'game/layers'
import {
  getNavAttention,
  hasAffordableFullLevel,
  hasFoundryAttention,
  hasStorageAttention,
  hasTiersAttention,
  hasTiersGameAttention,
} from './navAttention'

const withIntro = (introOverrides = {}) => {
  const state = createInitialGameState()
  return {
    ...state,
    intro: { ...state.intro, ...introOverrides },
  }
}

describe('navAttention', () => {
  it('lights Foundry when Memory is full', () => {
    const state = withIntro({
      bits: INTRO_STARTING_CAPACITY,
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: true,
    })
    expect(hasFoundryAttention(state)).toBe(true)
    expect(getNavAttention(state).foundry).toBe(true)
  })

  it('lights Foundry when combine into a Byte is ready', () => {
    const state = withIntro({
      bits: INTRO_BYTE_COMBINE_COST,
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: false,
    })
    expect(hasFoundryAttention(state)).toBe(true)
  })

  it('lights Foundry when a transfer block is affordable', () => {
    const base = withIntro({
      capacity: INTRO_CONVERSION_UNLOCK_CAPACITY,
      byteCreated: true,
      mainGameUnlocked: false,
    })
    const state = withIntro({
      bits: getIntroKilobyteConversionCost(base),
      capacity: INTRO_CONVERSION_UNLOCK_CAPACITY,
      byteCreated: true,
      mainGameUnlocked: false,
    })
    expect(hasFoundryAttention(state)).toBe(true)
  })

  it('stays quiet on Foundry with empty Memory and nothing else pending', () => {
    const state = withIntro({
      bits: 0,
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: true,
    })
    expect(hasFoundryAttention(state)).toBe(false)
  })

  it('lights Tiers when a full purchase level is affordable', () => {
    const tier01 = TIER_DEFINITIONS[0]
    const unitCost = 1000 // tier01 baseCost
    const state = {
      ...createInitialGameState(),
      intro: { ...createInitialGameState().intro, mainGameUnlocked: true, byteCreated: true },
      resources: { ...createInitialGameState().resources, [MONEY_ID]: unitCost * DEFAULT_PURCHASE_BLOCK_SIZE },
      purchaseLevels: { [tier01.id]: 1 },
      purchaseLevelProgress: { [tier01.id]: 0 },
      unlocked: { [tier01.id]: true },
    }
    // Fresh save already unlocks tier01; ensure spendable covers a full block.
    expect(hasAffordableFullLevel(state)).toBe(true)
    expect(hasTiersGameAttention(state)).toBe(true)
    expect(hasTiersAttention(state)).toBe(true)
    expect(getNavAttention(state).game).toBe(true)
  })

  it('lights Tiers when prestige is required (production frozen)', () => {
    const state = {
      ...createInitialGameState(),
      intro: { ...createInitialGameState().intro, mainGameUnlocked: true },
      resources: { ...createInitialGameState().resources, [MONEY_ID]: PRESTIGE_THRESHOLD },
    }
    expect(hasTiersGameAttention(state)).toBe(true)
    expect(getNavAttention(state).game).toBe(true)
  })

  it('does not light Tiers on a fresh unlocked save with almost no money', () => {
    const state = {
      ...createInitialGameState(),
      intro: { ...createInitialGameState().intro, mainGameUnlocked: true, byteCreated: true },
    }
    expect(hasAffordableFullLevel(state)).toBe(false)
    expect(hasTiersGameAttention(state)).toBe(false)
  })

  it('lights Storage when a full disk is redeemable', () => {
    // 8000-bit disk matches tier01's fresh per-unit cost (1000 Bytes × 8 bits).
    const diskSize = 8000
    const state = withIntro({
      capacity: INTRO_DISK_UNLOCK_CAPACITY,
      byteCreated: true,
      mainGameUnlocked: true,
      disks: { [diskSize]: 1 },
      disksBuiltTotal: { [diskSize]: 1 },
    })
    expect(hasStorageAttention(state)).toBe(true)
    expect(getNavAttention(state).storage).toBe(true)
  })

  it('does not light Storage before Storage unlocks', () => {
    const state = withIntro({
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: true,
      disks: { 8000: 1 },
    })
    expect(hasStorageAttention(state)).toBe(false)
  })
})
