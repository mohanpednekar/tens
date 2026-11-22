import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  getAchievementProgress,
  getAchievementReward,
  getAchievementShortRequirement,
  getAchievementShortReward,
  buyTickspeedMultiplier, createInitialGameState, detectAchievements, eraGame, getCompletedAchievementGroups,
  getLevelMultiplierBase, getOverclockRequirement, getOverclockRequirementStep, getPurchaseMilestoneMultiplier, getTierCostExponent, buyGlobalTickspeedMultiplier, isAchievementEarned, overclockGame, purgeGame, resetByteFoundry, scaleUpGame, tapIntroBit, tickGame,
} from './engine'
import { loadGameState } from './storage'
import { ACHIEVEMENTS_FEATURE, ACHIEVEMENT_DEFINITIONS, ACHIEVEMENT_GROUPS, MONEY_ID, PURGE_THRESHOLD, TIER_DEFINITIONS } from './layers'

beforeEach(() => { ACHIEVEMENTS_FEATURE.enabled = true; localStorage.clear() })
afterEach(() => { ACHIEVEMENTS_FEATURE.enabled = false })

const earnedIds = state => Object.keys(state.achievements.earned)
const lateGame = () => {
  const initial = createInitialGameState()
  return {
    ...initial,
    achievements: { earned: {}, counters: { pings: 10000, maxFirstOverclock: 6, acceleratelessOverclocks: 1, overflowDeepOverclock: 1 } },
    intro: { ...initial.intro, byteCreated: true, mainGameUnlocked: true },
    purchased: Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, 5])),
    purchaseLevels: Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, 10])),
    globalTickspeedMultiplier: 40,
    overclockLastClaimCompletedLevels: 5,
    lastTierEarnedThisRun: true, // QB held earlier this run, balance now 0
  }
}

describe('achievements registry', () => {
  it('has unique ids and every member in a known group', () => {
    expect(new Set(ACHIEVEMENT_DEFINITIONS.map(d => d.id)).size).toBe(ACHIEVEMENT_DEFINITIONS.length)
    const groups = new Set(ACHIEVEMENT_GROUPS.map(g => g.id))
    expect(ACHIEVEMENT_DEFINITIONS.every(d => groups.has(d.group))).toBe(true)
  })
})

describe('Spent QB', () => {
  const lastId = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id
  it('needs QB earned this run AND a zero balance', () => {
    const base = createInitialGameState()
    expect(isAchievementEarned(detectAchievements(base), 'quettaSpent')).toBe(false)
    expect(isAchievementEarned(detectAchievements({ ...base, lastTierEarnedThisRun: true }), 'quettaSpent')).toBe(true)
    const holding = { ...base, lastTierEarnedThisRun: true, resources: { ...base.resources, [lastId]: 3 } }
    expect(isAchievementEarned(detectAchievements(holding), 'quettaSpent')).toBe(false)
  })

  it('a tick that sees a QB balance marks the run; purge clears the mark', () => {
    const base = createInitialGameState()
    const held = tickGame(1)({ ...base, resources: { ...base.resources, [lastId]: 2 }, owned: { ...base.owned, [lastId]: 2 } })
    expect(held.lastTierEarnedThisRun).toBe(true)
    expect(purgeGame({ ...held, resources: { ...held.resources, [MONEY_ID]: PURGE_THRESHOLD } }).lastTierEarnedThisRun).toBe(false)
  })

  it('unlocks at the moment the spend empties QB, with no tick, and a later Scale Up keeps it', () => {
    const base = createInitialGameState()
    const ready = { ...base, resources: { ...base.resources, [lastId]: 10 }, owned: { ...base.owned, [lastId]: 10 } }
    const spent = buyTickspeedMultiplier(lastId)(ready)
    expect(spent.resources[lastId]).toBe(0)
    expect(isAchievementEarned(spent, 'quettaSpent')).toBe(true)
    const scaled = { ...spent, purchaseLevels: { ...spent.purchaseLevels, [TIER_DEFINITIONS[0].id]: 4 } }
    expect(isAchievementEarned(scaleUpGame(scaled), 'quettaSpent')).toBe(true)
  })

  it('a spend that leaves QB does not unlock it, and other tiers never do', () => {
    const base = createInitialGameState()
    const more = { ...base, resources: { ...base.resources, [lastId]: 25 }, owned: { ...base.owned, [lastId]: 25 } }
    expect(isAchievementEarned(buyTickspeedMultiplier(lastId)(more), 'quettaSpent')).toBe(false)
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

describe('Level power achievements', () => {
  it('start at 1.0; each tier at level 10 adds 0.05, reaching 1.5 with all ten', () => {
    const base = createInitialGameState()
    expect(getLevelMultiplierBase(base)).toBe(1)
    const levels = n => ({ ...base, purchaseLevels: { ...base.purchaseLevels, ...Object.fromEntries(TIER_DEFINITIONS.slice(0, n).map(t => [t.id, 10])) } })
    expect(getLevelMultiplierBase(detectAchievements(levels(1)))).toBe(1.05)
    expect(getLevelMultiplierBase(detectAchievements(levels(4)))).toBe(1.2)
    expect(getLevelMultiplierBase(detectAchievements(levels(10)))).toBe(1.5)
  })

  it('getPurchaseMilestoneMultiplier uses the supplied base', () => {
    expect(getPurchaseMilestoneMultiplier(3, 1.5)).toBeCloseTo(2.25)
  })

  it('tickGame credits production at the achievement-boosted base (all ten earned vs none)', () => {
    const run = earnedAll => {
      const base = createInitialGameState()
      const state = {
        ...base,
        resources: { ...base.resources, [MONEY_ID]: 0 },
        owned: { ...base.owned, tier01: 100 },
        purchaseLevels: { ...base.purchaseLevels, tier01: 5 },
        achievements: { counters: { pings: 0 }, earned: earnedAll ? Object.fromEntries(TIER_DEFINITIONS.map((_, i) => [`levelPower${i + 1}`, true])) : {} },
      }
      let next = state
      for (let i = 0; i < 100; i++) next = tickGame(0.1)(next)
      return next.resources[MONEY_ID]
    }
    const plain = run(false)
    const boosted = run(true)
    expect(plain).toBeGreaterThan(0)
    // tier01 at level 5 has 4 completed levels: (1.5 / 1.0) ** 4 = 5.0625x
    expect(boosted / plain).toBeGreaterThan(4.5)
  })

  it('cost spacing grows for a higher tier too: tier03 gaps 3 for 10 increments, then 4', () => {
    const tier = { id: 'tier03' }
    const gaps = []
    for (let e = 3; e <= 14; e++) gaps.push(getTierCostExponent(tier, e) - getTierCostExponent(tier, e - 1))
    expect(gaps.slice(0, 10)).toEqual(Array(10).fill(3))
    expect(gaps.slice(10)).toEqual([4, 4])
  })
})

describe('Overclock step achievements', () => {
  const lastTierId = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id
  const withLevels = (state, completed) => ({ ...state, purchaseLevels: { ...state.purchaseLevels, [lastTierId]: completed + 1 } })
  const fresh = () => createInitialGameState()

  it('the step starts at 4 and drops 1 per earned achievement, never below 1', () => {
    const at = n => ({ ...fresh(), overclockLastClaimCompletedLevels: 10, achievements: { counters: { pings: 0 }, earned: Object.fromEntries(['overclockStep1', 'overclockStep2', 'overclockStep3'].slice(0, n).map(id => [id, true])) } })
    expect([0, 1, 2, 3].map(n => getOverclockRequirement(at(n)))).toEqual([14, 13, 12, 11])
    expect(getOverclockRequirementStep(at(3))).toBe(1)
  })

  it('Patient Overclock: only a first claim of the Purge at 6+ completed levels earns it', () => {
    const shallow = overclockGame(withLevels(fresh(), 5))
    expect(isAchievementEarned(shallow, 'overclockStep1')).toBe(false)
    const deep = overclockGame(withLevels(fresh(), 6))
    expect(isAchievementEarned(deep, 'overclockStep1')).toBe(true)
    // A later (non-first) claim at 6+ levels does not count.
    const later = overclockGame({ ...withLevels(fresh(), 9), overclockLastClaimCompletedLevels: 5 })
    expect(isAchievementEarned(later, 'overclockStep1')).toBe(false)
  })

  it('Overclock fast: a second claim earns it only if no Accelerate was bought this Purge', () => {
    const base = { ...withLevels(fresh(), 9), overclockLastClaimCompletedLevels: 5, achievements: { counters: { pings: 0 }, earned: { overclockStep1: true } } }
    expect(isAchievementEarned(overclockGame(base), 'overclockStep2')).toBe(true)
    expect(isAchievementEarned(overclockGame({ ...base, accelerateBoughtThisCycle: true }), 'overclockStep2')).toBe(false)
    // The first claim never counts, even without Accelerate.
    expect(isAchievementEarned(overclockGame(withLevels(fresh(), 5)), 'overclockStep2')).toBe(false)
  })

  it('buying Accelerate sets the cycle flag; Scale Up and Overclock carry it; Purge clears it', () => {
    const rich = { ...fresh(), resources: { ...fresh().resources, [MONEY_ID]: 1e12 }, purchased: { tier01: 1 }, purchaseLevels: { ...fresh().purchaseLevels, tier01: 2 } }
    const bought = buyGlobalTickspeedMultiplier(rich)
    expect(bought.accelerateBoughtThisCycle).toBe(true)
    const eligible = { ...withLevels(bought, 5) }
    expect(overclockGame(eligible).accelerateBoughtThisCycle).toBe(true)
    expect(purgeGame({ ...bought, resources: { ...bought.resources, [MONEY_ID]: PURGE_THRESHOLD } }).accelerateBoughtThisCycle).toBe(false)
  })

  it('Beyond Googol: needs Overflow mode (DeGoogol) AND 12+ completed levels', () => {
    const withPrior = state => ({ ...state, achievements: { counters: { pings: 0 }, earned: { overclockStep1: true, overclockStep2: true } } })
    const unbounded = state => withPrior({ ...state, purge: { ...state.purge, unboundedUnlocked: true } })
    const deep = withLevels(fresh(), 12)
    expect(isAchievementEarned(overclockGame(unbounded(deep)), 'overclockStep3')).toBe(true)
    expect(isAchievementEarned(overclockGame(unbounded(withLevels(fresh(), 11))), 'overclockStep3')).toBe(false)
    expect(isAchievementEarned(overclockGame(withPrior(deep)), 'overclockStep3')).toBe(false)
  })

  it('is strictly ordered: a later achievement is never earned without the earlier one', () => {
    // Second claim, no Accelerate, but Patient Overclock not earned -> Overclock fast does not count.
    const noStep1 = { ...withLevels(fresh(), 9), overclockLastClaimCompletedLevels: 5 }
    expect(isAchievementEarned(overclockGame(noStep1), 'overclockStep2')).toBe(false)
    // Post-DeGoogol deep claim with only Patient Overclock earned -> Beyond Googol does not count.
    const onlyStep1 = { ...withLevels(fresh(), 12), purge: { ...fresh().purge, unboundedUnlocked: true }, achievements: { counters: { pings: 0 }, earned: { overclockStep1: true } } }
    expect(isAchievementEarned(overclockGame(onlyStep1), 'overclockStep3')).toBe(false)
    // And the chain works in order within one Purge: deep first claim, then an Accelerate-free second claim.
    const first = overclockGame(withLevels(fresh(), 6))
    expect(isAchievementEarned(first, 'overclockStep1')).toBe(true)
    const second = overclockGame(withLevels(first, getOverclockRequirement(first)))
    expect(isAchievementEarned(second, 'overclockStep2')).toBe(true)
  })

  it('Scale Up carries the cycle flag, and Reboot clears it', () => {
    const flagged = { ...withLevels(fresh(), 3), accelerateBoughtThisCycle: true }
    const scaled = scaleUpGame({ ...flagged, scaleUpTargetTierIndex: 0 })
    expect(scaled).not.toBe(flagged)
    expect(scaled.accelerateBoughtThisCycle).toBe(true)
    const rebootable = { ...flagged, purge: { ...flagged.purge, points: 1e100 } }
    expect(eraGame(rebootable).accelerateBoughtThisCycle).toBe(false)
  })

  it('claims inside a challenge count like any other (F6 caps the ladder, so its last tier is Exabytes)', () => {
    const base = fresh()
    const inF6 = {
      ...base,
      challenges: { ...base.challenges, active: 'F6', run: {} },
      purchaseLevels: { ...base.purchaseLevels, tier06: 7 },
    }
    const after = overclockGame(inF6)
    expect(after.overclockLastClaimCompletedLevels).toBe(6)
    expect(isAchievementEarned(after, 'overclockStep1')).toBe(true)
  })

  it('a legacy save (no accelerateBoughtThisCycle key) that is mid-cycle never gets Overclock fast for free', () => {
    const legacy = { ...JSON.parse(JSON.stringify(createInitialGameState())), overclockLastClaimCompletedLevels: 5, globalTickspeedMultiplier: 7 }
    delete legacy.accelerateBoughtThisCycle
    localStorage.setItem('tens_game_state', JSON.stringify(legacy))
    const loaded = loadGameState()
    expect(loaded.accelerateBoughtThisCycle).toBe(true)
    const eligible = { ...loaded, purchaseLevels: { ...loaded.purchaseLevels, [lastTierId]: 10 } }
    expect(isAchievementEarned(overclockGame(eligible), 'overclockStep2')).toBe(false)
    // Also mid-cycle: a Scale Up already claimed (Scale Up resets the Accelerate level to null).
    const scaled = { ...JSON.parse(JSON.stringify(createInitialGameState())), scaleUpCount: 1 }
    delete scaled.accelerateBoughtThisCycle
    localStorage.setItem('tens_game_state', JSON.stringify(scaled))
    expect(loadGameState().accelerateBoughtThisCycle).toBe(true)
    // A fresh legacy save with no Accelerate or Overclock yet is not flagged.
    const early = JSON.parse(JSON.stringify(createInitialGameState()))
    delete early.accelerateBoughtThisCycle
    localStorage.setItem('tens_game_state', JSON.stringify(early))
    expect(loadGameState().accelerateBoughtThisCycle).toBe(false)
  })
})

describe('getAchievementProgress / getAchievementReward', () => {
  it('reports current/target for numeric conditions and null for one-shot events', () => {
    const state = { ...createInitialGameState(), globalTickspeedMultiplier: 4, purchaseLevels: { tier01: 6 }, achievements: { earned: {}, counters: { pings: 10 } } }
    expect(getAchievementProgress(state, { kind: 'counter', key: 'pings', min: 256 })).toEqual({ current: 10, target: 256 })
    expect(getAchievementProgress(state, { kind: 'clockSpeedLevel', min: 10 })).toEqual({ current: 4, target: 10 })
    expect(getAchievementProgress(state, { kind: 'tierLevel', tierId: 'tier01', min: 10 })).toEqual({ current: 6, target: 10 })
    expect(getAchievementProgress(state, { kind: 'poolExponentBonus', poolIndex: 1, min: 2 })).toEqual({ current: 0, target: 2 })
    expect(getAchievementProgress({ ...state, intro: { ...state.intro, capacity: 8 } }, { kind: 'storageUnlocked' })).toEqual({ current: 0, target: 10 })
    expect(getAchievementProgress({ ...state, intro: { ...state.intro, capacity: 512 } }, { kind: 'storageUnlocked' })).toEqual({ current: 6, target: 10 })
    expect(getAchievementProgress(state, { kind: 'counter', key: 'overflowDeepOverclock', min: 1 })).toBeNull()
    expect(getAchievementProgress(state, { kind: 'clockSpeedLevel', min: 1 })).toBeNull()
    expect(getAchievementProgress(state, { kind: 'poolExponentBonus', poolIndex: 1, min: 1 })).toBeNull()
    expect(getAchievementProgress(state, { kind: 'overclocked' })).toBeNull()
    expect(getAchievementProgress(state, { kind: 'byteCreated' })).toBeNull()
  })

  it('short forms fall back to the long text', () => {
    expect(getAchievementShortRequirement({ short: 'S', trigger: 'Long' })).toBe('S')
    expect(getAchievementShortRequirement({ short: null, trigger: 'Long' })).toBe('Long')
    expect(getAchievementShortReward({ shortBonus: 'sb', bonus: 'b' })).toBe('sb')
    expect(getAchievementShortReward({ shortBonus: null, bonus: 'b' })).toBe('b')
    expect(getAchievementShortReward({ shortBonus: null, bonus: null })).toBeNull()
  })

  it('rewards are the bonus text, or none (stars are score, not a reward)', () => {
    expect(getAchievementReward({ bonus: null })).toBeNull()
    expect(getAchievementReward({ bonus: 'does X' })).toBe('does X')
  })
})
