import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  createInitialGameState, detectAchievements, eraGame, getCompletedAchievementGroups, isAchievementEarned,
  overclockGame, purgeGame, resetByteFoundry, scaleUpGame, tapIntroBit, tickGame,
} from './engine'
import { ACHIEVEMENTS_FEATURE, ACHIEVEMENT_DEFINITIONS, ACHIEVEMENT_GROUPS, MONEY_ID, PURGE_THRESHOLD, TIER_DEFINITIONS } from './layers'

beforeEach(() => { ACHIEVEMENTS_FEATURE.enabled = true })
afterEach(() => { ACHIEVEMENTS_FEATURE.enabled = false })

const earnedIds = state => Object.keys(state.achievements.earned)
const lateGame = () => {
  const initial = createInitialGameState()
  return {
    ...initial,
    achievements: { earned: {}, counters: { pings: 10000 } },
    intro: { ...initial.intro, byteCreated: true, mainGameUnlocked: true },
    purchased: Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, 5])),
    globalTickspeedMultiplier: 40,
    overclockLastClaimCompletedLevels: 5,
  }
}

describe('achievements registry', () => {
  it('has unique ids and every member in a known group', () => {
    expect(new Set(ACHIEVEMENT_DEFINITIONS.map(d => d.id)).size).toBe(ACHIEVEMENT_DEFINITIONS.length)
    const groups = new Set(ACHIEVEMENT_GROUPS.map(g => g.id))
    expect(ACHIEVEMENT_DEFINITIONS.every(d => groups.has(d.group))).toBe(true)
  })
})

describe('detectAchievements', () => {
  it('is inert with the feature off', () => {
    ACHIEVEMENTS_FEATURE.enabled = false
    const state = lateGame()
    expect(detectAchievements(state)).toBe(state)
    expect(tapIntroBit(createInitialGameState()).achievements.counters.pings).toBe(0)
  })

  it('earns every already-satisfied achievement from a far-past state, then returns the same reference', () => {
    const next = detectAchievements(lateGame())
    // Reclamation achievements require actual Compact Pool history; being far into Factory
    // progression does not earn rewards for Storage pool resets the player never performed.
    expect(earnedIds(next)).toHaveLength(ACHIEVEMENT_DEFINITIONS.filter(d => d.group !== 'foundry').length)
    expect(getCompletedAchievementGroups(next)).toEqual(ACHIEVEMENT_GROUPS.filter(g => g.id !== 'foundry').map(g => g.id))
    expect(detectAchievements(next)).toBe(next)
  })

  it('earns Foundry Reclamation achievements retroactively from recorded pool bonuses', () => {
    const previous = lateGame()
    const poolExponentBonuses = Object.fromEntries(Array.from({ length: 10 }, (_, index) => [index + 1, 2]))
    const awarded = detectAchievements({ ...previous, intro: { ...previous.intro, poolExponentBonuses } })
    expect(earnedIds(awarded)).toHaveLength(ACHIEVEMENT_DEFINITIONS.length)
    expect(getCompletedAchievementGroups(awarded)).toEqual(ACHIEVEMENT_GROUPS.map(g => g.id))
  })

  it('earns retroactively on a tick', () => {
    const next = tickGame(0.1)(lateGame())
    expect(isAchievementEarned(next, 'megahertzMyth')).toBe(true)
  })

  it('counts Pings and earns Hello, World / Ping of Death', () => {
    let state = createInitialGameState()
    state = tapIntroBit(state)
    expect(state.achievements.counters.pings).toBe(1)
    expect(isAchievementEarned(state, 'helloWorld')).toBe(true)
    expect(isAchievementEarned(state, 'pingOfDeath')).toBe(false)
    const fresh = createInitialGameState()
    const nearly = { ...fresh, achievements: { ...fresh.achievements, counters: { pings: 255 } } }
    expect(isAchievementEarned(tapIntroBit(nearly), 'pingOfDeath')).toBe(true)
    expect(tapIntroBit(state)).toBe(state) // already full: not counted
  })

  it('a group is complete only when every member is earned', () => {
    const state = createInitialGameState()
    expect(getCompletedAchievementGroups(state)).toEqual([])
    const partial = { ...state, achievements: { ...state.achievements, earned: { tickTock: true, megahertzMyth: true } } }
    expect(getCompletedAchievementGroups(partial)).toEqual([])
  })
})

describe('persistence across resets', () => {
  const earned = () => detectAchievements(lateGame())

  it('survives Purge, Scale Up, Overclock, Reformat and Reboot', () => {
    const ids = earnedIds(earned())
    const purgeable = { ...earned(), resources: { ...earned().resources, [MONEY_ID]: PURGE_THRESHOLD } }
    expect(earnedIds(purgeGame(purgeable))).toEqual(ids)
    expect(earnedIds(resetByteFoundry(earned()))).toEqual(ids)
    expect(earnedIds(scaleUpGame(earned()))).toEqual(ids)
    expect(earnedIds(overclockGame(earned()))).toEqual(ids)
    const rebootable = { ...earned(), purge: { ...earned().purge, points: 1e100 } }
    expect(earnedIds(eraGame(rebootable))).toEqual(ids)
  })
})
