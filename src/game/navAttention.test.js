import { describe, expect, it } from 'vitest'
import {
  createInitialGameState,
  getIntroKilobyteConversionCost,
} from 'game/engine'
import {
  COMPUTE_MERGE_RATIO,
  DEFAULT_PURCHASE_BLOCK_SIZE,
  INTRO_BYTE_COMBINE_COST,
  INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  INTRO_CONVERSION_UNLOCK_CAPACITY,
  INTRO_DISK_UNLOCK_CAPACITY,
  INTRO_STARTING_CAPACITY,
  MONEY_ID,
  PRESTIGE_THRESHOLD,
  TICKSPEED_AUTOBUYER_COST,
  TIER_DEFINITIONS,
} from 'game/layers'
import {
  ATTENTION_HIGH,
  ATTENTION_NORMAL,
  getNavAttention,
  hasAffordableFullLevel,
  hasAffordablePpUpgrade,
  hasComputeAttention,
  hasFoundryAttention,
  hasOverclockAvailable,
  hasSpeedUpAvailable,
  hasStorageAttention,
  hasTiersAttention,
  hasTiersGameAttention,
  maxAttention,
} from './navAttention'

const withIntro = (introOverrides = {}) => {
  const state = createInitialGameState()
  return {
    ...state,
    intro: { ...state.intro, ...introOverrides },
  }
}

const lastTierId = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id

/** Invest (Bandwidth) available, Sacrifice blocked — a normal-level Foundry cue. */
const investReadyIntro = {
  bits: INTRO_STARTING_CAPACITY,
  capacity: INTRO_STARTING_CAPACITY,
  byteCreated: true,
  productionMilestoneTierClaims: 0,
}

/** Compute Boost available with nothing higher-ranked pending. */
const computeBoostReadyIntro = {
  capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
  bits: 0,
  byteCreated: true,
  productionMilestoneTierClaims: 2,
  computeCores: 1,
}

describe('navAttention', () => {
  it('lights Foundry when Memory is full', () => {
    const state = withIntro({
      bits: INTRO_STARTING_CAPACITY,
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: true,
    })
    expect(hasFoundryAttention(state)).toBe(true)
    expect(getNavAttention(state).foundry).toBe('high')
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

  it('lights Ladder when a full purchase level is affordable', () => {
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
    expect(getNavAttention(state).game).toBe('high')
  })

  it('lights Ladder when prestige is required (production frozen)', () => {
    const state = {
      ...createInitialGameState(),
      intro: { ...createInitialGameState().intro, mainGameUnlocked: true },
      resources: { ...createInitialGameState().resources, [MONEY_ID]: PRESTIGE_THRESHOLD },
    }
    expect(hasTiersGameAttention(state)).toBe(true)
    expect(getNavAttention(state).game).toBe('high')
  })

  it('does not light Ladder on a fresh unlocked save with almost no money', () => {
    const state = {
      ...createInitialGameState(),
      intro: { ...createInitialGameState().intro, mainGameUnlocked: true, byteCreated: true },
    }
    expect(hasAffordableFullLevel(state)).toBe(false)
    expect(hasTiersGameAttention(state)).toBe(false)
  })

  it('lights Foundry (via folded Storage attention) when a full disk is redeemable', () => {
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
    expect(getNavAttention(state).foundry).toBe('high')
    expect(getNavAttention(state).storage).toBeUndefined()
  })

  it('does not light Storage before Storage unlocks', () => {
    const state = withIntro({
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: true,
      disks: { 8000: 1 },
    })
    expect(hasStorageAttention(state)).toBe(false)
  })

  it('lights Foundry at normal when a transfer block is affordable but Memory is not full', () => {
    const capacity = INTRO_CONVERSION_UNLOCK_CAPACITY * 10
    const base = withIntro({
      capacity,
      byteCreated: true,
      mainGameUnlocked: false,
    })
    const cost = getIntroKilobyteConversionCost(base)
    expect(cost).toBeLessThan(capacity)
    const state = withIntro({
      bits: cost,
      capacity,
      byteCreated: true,
      mainGameUnlocked: false,
    })
    expect(hasFoundryAttention(state)).toBe(true)
    expect(getNavAttention(state).foundry).toBe(ATTENTION_NORMAL)
  })

  it('lights Foundry at high when Invest is available on a full Memory balance', () => {
    const state = withIntro(investReadyIntro)
    expect(hasFoundryAttention(state)).toBe(true)
    expect(getNavAttention(state).foundry).toBe(ATTENTION_HIGH)
  })

  it('maxAttention prefers high over normal', () => {
    expect(maxAttention(ATTENTION_HIGH, ATTENTION_NORMAL)).toBe(ATTENTION_HIGH)
    expect(maxAttention(ATTENTION_NORMAL, false)).toBe(ATTENTION_NORMAL)
    expect(maxAttention(false, false)).toBe(false)
  })

  it('lights Compute when a Compute Boost turn is available', () => {
    const state = withIntro(computeBoostReadyIntro)
    expect(hasComputeAttention(state)).toBe(true)
    expect(getNavAttention(state).compute).toBe(ATTENTION_HIGH)
  })

  it('does not light Compute before Compute unlocks', () => {
    const state = withIntro({
      capacity: INTRO_STARTING_CAPACITY,
      byteCreated: true,
      computeCores: 1,
    })
    expect(hasComputeAttention(state)).toBe(false)
    expect(getNavAttention(state).compute).toBe(false)
  })

  it('lights Compute at high when an instant Core→Node merge is available', () => {
    const state = withIntro({
      capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
      bits: 0,
      byteCreated: true,
      productionMilestoneTierClaims: 2,
      computeCores: COMPUTE_MERGE_RATIO,
      computeNodes: 0,
      autoMergeCoresIntoNode: false,
    })
    expect(hasComputeAttention(state)).toBe(true)
    expect(getNavAttention(state).compute).toBe(ATTENTION_HIGH)
  })

  it('lights Compute at normal when Core→Node auto-merge unlock is available', () => {
    // 10 Nodes unlocks Core→Node auto-merge, but also funds a Node-tier Boost (high). An already-
    // active max-stacked boost blocks starting a new one; zero Cores blocks Stack / Core merges.
    const state = withIntro({
      capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
      bits: 0,
      byteCreated: true,
      productionMilestoneTierClaims: 2,
      computeCores: 0,
      computeNodes: 10,
      autoMergeCoresIntoNode: false,
      autoMergeNodesIntoCluster: true,
      autoClaimCoreEnabled: true,
      computeBoostType: 'burst',
      computeBoostTierIndex: 1,
      computeBoostStacks: 10,
      computeBoostRemainingSeconds: 60,
    })
    expect(hasComputeAttention(state)).toBe(true)
    expect(getNavAttention(state).compute).toBe(ATTENTION_NORMAL)
  })

  it('lights Ladder when Speed Up is available on the last tier', () => {
    const state = {
      ...createInitialGameState(),
      intro: { ...createInitialGameState().intro, mainGameUnlocked: true, byteCreated: true },
      purchaseLevels: { [lastTierId]: 6 },
      everUnlockedTierIds: { [lastTierId]: true },
      speedUpCount: 0,
    }
    expect(hasSpeedUpAvailable(state)).toBe(true)
    expect(hasTiersGameAttention(state)).toBe(true)
    expect(getNavAttention(state).game).toBe(ATTENTION_NORMAL)
  })

  it('lights Ladder when Overclock is available on the last tier', () => {
    const state = {
      ...createInitialGameState(),
      intro: { ...createInitialGameState().intro, mainGameUnlocked: true, byteCreated: true },
      purchaseLevels: { [lastTierId]: 2 },
      everUnlockedTierIds: { [lastTierId]: true },
      overclockCount: 0,
      speedUpCount: 99, // Speed Up needs level 105 — keep it unavailable so this isolates Overclock
    }
    expect(hasOverclockAvailable(state)).toBe(true)
    expect(hasSpeedUpAvailable(state)).toBe(false)
    expect(hasTiersGameAttention(state)).toBe(true)
    expect(getNavAttention(state).game).toBe(ATTENTION_NORMAL)
  })

  it('lights Ladder (Upgrades) when an affordable PP automation unlock is available', () => {
    const state = {
      ...createInitialGameState(),
      intro: { ...createInitialGameState().intro, mainGameUnlocked: true, byteCreated: true },
      prestige: { count: 1, points: TICKSPEED_AUTOBUYER_COST },
      autoGlobalTickspeed: false,
      // Keep money low so Ladder high-cues (full purchase level) stay off.
      resources: { ...createInitialGameState().resources, [MONEY_ID]: 0 },
    }
    expect(hasAffordablePpUpgrade(state)).toBe(true)
    expect(hasTiersAttention(state)).toBe(true)
    expect(getNavAttention(state).game).toBe(ATTENTION_NORMAL)
  })

  it('does not light PP upgrades before the first Prestige', () => {
    const state = {
      ...createInitialGameState(),
      intro: { ...createInitialGameState().intro, mainGameUnlocked: true, byteCreated: true },
      prestige: { count: 0, points: TICKSPEED_AUTOBUYER_COST },
      autoGlobalTickspeed: false,
    }
    expect(hasAffordablePpUpgrade(state)).toBe(false)
  })
})
