import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  getAchievementProductionMultiplier, getAchievementStars,
  getAchievementProgress,
  getAchievementReward,
  getAchievementShortRequirement,
  getAchievementShortReward,
  buyTickspeedMultiplier, createInitialGameState, detectAchievements, eraGame, getCompletedAchievementGroups,
  getLevelMultiplierBase, getOverclockRequirement, getOverclockRequirementStep, getPurchaseMilestoneMultiplier, getTierCostExponent, buyGlobalTickspeedMultiplier, isAchievementEarned, consumeXpForLastTierTickspeed, restageManually, overclockGame, purgeGame, resetByteFoundry, scaleUpGame, tapIntroBit, tickGame,
  activateComputeBoost, buyTierQuantity, getPurgeGoalBits, stackComputeBoost, withManualPurchaseMark,
} from './engine'
import { loadGameState } from './storage'
import { getLevelPowerAchievementLevel, ACHIEVEMENTS_FEATURE, ACHIEVEMENT_DEFINITIONS, ACHIEVEMENT_GROUPS, CHALLENGE_DEFINITIONS, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_TIER_FIELDS, MONEY_ID, PURGE_THRESHOLD, TIER_DEFINITIONS } from './layers'

beforeEach(() => { ACHIEVEMENTS_FEATURE.enabled = true; localStorage.clear() })
afterEach(() => { ACHIEVEMENTS_FEATURE.enabled = false })

const earnedIds = state => Object.keys(state.achievements.earned)
const lateGame = () => {
  const initial = createInitialGameState()
  return {
    ...initial,
    achievements: {
      earned: {},
      counters: {
        pings: 10000, emptyRestages: 1, maxFirstOverclock: 6, acceleratelessOverclocks: 1, overflowDeepOverclock: 1,
        reformats: 1, kernelsEarned: 100, quickReboots: 1, turboBoosts: 1, maxBoostStack: 1, purgeWaitSeconds: 60,
        handsFreePurges: 1, automatedPings: 1, purges: 64,
      },
    },
    resources: { ...initial.resources, [MONEY_ID]: PURGE_THRESHOLD },
    purge: { ...initial.purge, count: 64, unboundedUnlocked: true },
    era: { count: 1 },
    prestigeDoublePpLevel: 10,
    autoPurge: 5,
    automationIntervalLevels: { ...initial.automationIntervalLevels, purge: 100 },
    autobuyers: Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, 1])),
    computeFlops: { ...initial.computeFlops, owned: { ...initial.computeFlops.owned, flop10: 1 } },
    intro: { ...initial.intro, byteCreated: true, mainGameUnlocked: true, computeNodes: 1, computeMegacomputers: 1 },
    purchased: Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, 5])),
    purchaseLevels: Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, 11])),
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

describe('Spent QB', () => {
  const lastId = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id
  const restageReady = (qb = 0) => {
    const base = createInitialGameState()
    return {
      ...base,
      scaleUpTierCounts: { ...base.scaleUpTierCounts, [lastId]: 1 },
      purge: { ...base.purge, xp: 5 },
      resources: { ...base.resources, [MONEY_ID]: 100, [lastId]: qb },
      owned: { ...base.owned, [TIER_DEFINITIONS[0].id]: 7, [lastId]: qb },
    }
  }

  it('a 0 QB balance alone never earns it, even with Restage ready (e.g. right after the last-tier Scale Up)', () => {
    const ready = restageReady()
    expect(isAchievementEarned(detectAchievements(ready), 'quettaSpent')).toBe(false)
    expect(isAchievementEarned(tickGame(1)(ready), 'quettaSpent')).toBe(false)
  })

  it('a manual Restage clicked at 0 QB runs (wiping every tier and Bits) and earns it', () => {
    const after = restageManually(5)(restageReady())
    expect(after.purge.xp).toBe(0)
    expect(after.owned[TIER_DEFINITIONS[0].id]).toBe(0)
    expect(after.resources[MONEY_ID]).toBe(0)
    expect(after.achievements.counters.emptyRestages).toBe(1)
    expect(isAchievementEarned(after, 'quettaSpent')).toBe(true)
  })

  it('a manual Restage while holding QB does not earn it', () => {
    const after = restageManually(5)(restageReady(3))
    expect(after.purge.xp).toBe(0)
    expect(isAchievementEarned(after, 'quettaSpent')).toBe(false)
  })

  it('Auto Restage (consumeXpForLastTierTickspeed) keeps the 0 QB guard', () => {
    const ready = restageReady()
    expect(consumeXpForLastTierTickspeed(5)(ready)).toBe(ready)
  })

  it.each([
    ['Restage not unlocked', s => ({ ...s, scaleUpTierCounts: { ...s.scaleUpTierCounts, [lastId]: 0 } })],
    ['XP below the Restage minimum', s => ({ ...s, purge: { ...s.purge, xp: 0 } })],
  ])('a manual Restage at 0 QB is still a no-op with %s', (_, tweak) => {
    const state = tweak(restageReady())
    expect(restageManually(5)(state)).toBe(state)
  })

  it('spending QB to 0 with the tickspeed upgrade does not earn it', () => {
    const spent = buyTickspeedMultiplier(lastId)(restageReady(10))
    expect(spent.resources[lastId]).toBe(0)
    expect(isAchievementEarned(spent, 'quettaSpent')).toBe(false)
  })

  it('is counted only with the feature on', () => {
    ACHIEVEMENTS_FEATURE.enabled = false
    const after = restageManually(5)(restageReady())
    expect(after.purge.xp).toBe(0)
    expect(after.achievements.counters.emptyRestages).toBeUndefined()
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

  it('earns Reclamation achievements retroactively from recorded pool compactions', () => {
    const previous = lateGame()
    const poolExponentBonuses = Object.fromEntries(Array.from({ length: 10 }, (_, index) => [index + 1, 2]))
    const awarded = detectAchievements({ ...previous, intro: { ...previous.intro, poolExponentBonuses } })
    expect(earnedIds(awarded)).toHaveLength(ACHIEVEMENT_DEFINITIONS.length)
    expect(getCompletedAchievementGroups(awarded)).toEqual(ACHIEVEMENT_GROUPS.map(g => g.id))
  })

  it('earns retroactively on a tick', () => {
    const next = tickGame(0.1)({ ...lateGame(), autoPurgeEnabled: false })
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
    expect(earnedIds(purgeGame(purgeable))).toEqual(expect.arrayContaining(ids))
    expect(earnedIds(resetByteFoundry(earned()))).toEqual(expect.arrayContaining(ids))
    expect(earnedIds(scaleUpGame(earned()))).toEqual(ids)
    expect(earnedIds(overclockGame(earned()))).toEqual(ids)
    const rebootable = { ...earned(), purge: { ...earned().purge, points: 1e100 } }
    expect(earnedIds(eraGame(rebootable))).toEqual(expect.arrayContaining(ids))
  })
})

describe('Level power achievements', () => {
  it('start at 1.0; each tier at its required level adds 0.05, reaching 1.5 with all ten', () => {
    const base = createInitialGameState()
    expect(getLevelMultiplierBase(base)).toBe(1)
    const levels = n => ({ ...base, purchaseLevels: { ...base.purchaseLevels, ...Object.fromEntries(TIER_DEFINITIONS.slice(0, n).map((t, i) => [t.id, getLevelPowerAchievementLevel(i + 1) + 1])) } })
    expect(getLevelMultiplierBase(detectAchievements(levels(1)))).toBe(1.05)
    expect(getLevelMultiplierBase(detectAchievements(levels(4)))).toBe(1.2)
    expect(getLevelMultiplierBase(detectAchievements(levels(10)))).toBe(1.5)
  })

  it('the required level is 5 for tiers 1–5, then the tier number (6, 7, 8, 9, 10)', () => {
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(getLevelPowerAchievementLevel)).toEqual([5, 5, 5, 5, 5, 6, 7, 8, 9, 10])
    const base = createInitialGameState()
    // One level short of every requirement earns nothing; exactly the requirement earns that tier only.
    const short = { ...base, purchaseLevels: { ...base.purchaseLevels, ...Object.fromEntries(TIER_DEFINITIONS.map((t, i) => [t.id, getLevelPowerAchievementLevel(i + 1)])) } }
    expect(getLevelMultiplierBase(detectAchievements(short))).toBe(1)
    const tier7 = { ...base, purchaseLevels: { ...base.purchaseLevels, tier07: 8 } }
    expect(isAchievementEarned(detectAchievements(tier7), 'levelPower7')).toBe(true)
    expect(isAchievementEarned(detectAchievements({ ...base, purchaseLevels: { ...base.purchaseLevels, tier07: 7 } }), 'levelPower7')).toBe(false)
    expect(isAchievementEarned(detectAchievements({ ...base, purchaseLevels: { ...base.purchaseLevels, tier02: 6 } }), 'levelPower2')).toBe(true)
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
        purchaseLevels: { ...base.purchaseLevels, tier01: 4 }, // below tier01's Level power requirement (5), so 'none' stays at 1.0
        achievements: { counters: { pings: 0 }, earned: earnedAll ? Object.fromEntries(TIER_DEFINITIONS.map((_, i) => [`levelPower${i + 1}`, true])) : {} },
      }
      let next = state
      for (let i = 0; i < 100; i++) next = tickGame(0.1)(next)
      return next.resources[MONEY_ID]
    }
    const plain = run(false)
    const boosted = run(true)
    expect(plain).toBeGreaterThan(0)
    // tier01 at level 4 has 3 completed levels: (1.5 / 1.0) ** 3 = 3.375x
    expect(boosted / plain).toBeGreaterThan(3)
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
    expect(getAchievementProgress(state, { kind: 'tierLevel', tierId: 'tier01', min: 10 })).toEqual({ current: 5, target: 9 })
    expect(getAchievementProgress(state, { kind: 'poolsCompacted', min: 3 })).toEqual({ current: 0, target: 3 })
    expect(getAchievementProgress({ ...state, intro: { ...state.intro, poolExponentBonuses: { 1: 2, 4: 1, 5: 0 } } }, { kind: 'poolsCompacted', min: 3 })).toEqual({ current: 2, target: 3 })
    expect(getAchievementProgress({ ...state, intro: { ...state.intro, capacity: 8 } }, { kind: 'storageUnlocked' })).toEqual({ current: 0, target: 10 })
    expect(getAchievementProgress({ ...state, intro: { ...state.intro, capacity: 512 } }, { kind: 'storageUnlocked' })).toEqual({ current: 6, target: 10 })
    expect(getAchievementProgress(state, { kind: 'counter', key: 'overflowDeepOverclock', min: 1 })).toBeNull()
    expect(getAchievementProgress(state, { kind: 'counter', key: 'maxFirstOverclock', min: 6 })).toBeNull()
    expect(getAchievementProgress(state, { kind: 'clockSpeedLevel', min: 1 })).toBeNull()
    expect(getAchievementProgress(state, { kind: 'poolsCompacted', min: 1 })).toBeNull()
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

describe('Power, Purge and Reboot achievements (#1051)', () => {
  const base = () => createInitialGameState()
  const withCounters = (state, counters) => ({ ...state, achievements: { ...state.achievements, counters: { ...state.achievements.counters, ...counters } } })

  it('lifetime Purges survive Reboot and earn the Purge count achievements from far past their point', () => {
    const s = { ...base(), purge: { ...base().purge, count: 0 }, achievements: { earned: {}, counters: { pings: 0, purges: 70 } } }
    const next = detectAchievements(s)
    for (const id of ['startAllOver', 'tenTypes', 'hex10', 'bit64']) expect(isAchievementEarned(next, id)).toBe(true)
  })

  it('a Purge bumps the lifetime count, and earns Look ma, no hands only without a manual purchase', () => {
    const ready = { ...base(), resources: { ...base().resources, [MONEY_ID]: PURGE_THRESHOLD } }
    const hands = purgeGame(ready)
    expect(hands.achievements.counters.purges).toBe(1)
    expect(isAchievementEarned(hands, 'noHands')).toBe(true)
    const manual = purgeGame({ ...ready, manualPurchaseThisCycle: true })
    expect(isAchievementEarned(manual, 'noHands')).toBe(false)
    expect(manual.manualPurchaseThisCycle).toBe(false)
  })

  it('manual purchase mark is set by a successful manual buy and carried through Scale Up', () => {
    const state = { ...base(), resources: { ...base().resources, [MONEY_ID]: 1e6 } }
    const tier = TIER_DEFINITIONS[0].id
    const bought = withManualPurchaseMark(buyTierQuantity(tier, 1))(state)
    expect(bought.manualPurchaseThisCycle).toBe(true)
    const nothing = withManualPurchaseMark(buyTierQuantity(tier, 1))(base())
    expect(nothing.manualPurchaseThisCycle).toBe(false)
    expect(buyTierQuantity(tier, 1)(state).manualPurchaseThisCycle).toBe(false)
  })

  it('a Reboot records Kernels, Kernel panic (two within an hour of play) and Reformat is counted', () => {
    const ready = () => ({ ...base(), purge: { ...base().purge, points: 1e100 } })
    const first = eraGame(ready())
    expect(isAchievementEarned(first, 'offAndOn')).toBe(true)
    expect(first.achievements.counters.kernelsEarned).toBeGreaterThan(0)
    expect(isAchievementEarned(first, 'kernelPanic')).toBe(false)
    const second = eraGame({ ...first, purge: { ...first.purge, points: 1e100 }, activePlaySeconds: first.activePlaySeconds + 600 })
    expect(isAchievementEarned(second, 'kernelPanic')).toBe(true)
    const late = eraGame({ ...first, purge: { ...first.purge, points: 1e100 }, activePlaySeconds: first.activePlaySeconds + 7200 })
    expect(isAchievementEarned(late, 'kernelPanic')).toBe(false)
    expect(isAchievementEarned(resetByteFoundry(base()), 'rmRf')).toBe(true)
  })

  it('Popcorn needs 100 lifetime Kernels', () => {
    expect(isAchievementEarned(detectAchievements(withCounters(base(), { kernelsEarned: 99 })), 'popcorn')).toBe(false)
    expect(isAchievementEarned(detectAchievements(withCounters(base(), { kernelsEarned: 100 })), 'popcorn')).toBe(true)
  })

  it('Remind me later counts continuous unclaimed-Purge seconds and resets when claimed', () => {
    const frozen = { ...base(), resources: { ...base().resources, [MONEY_ID]: PURGE_THRESHOLD } }
    const half = tickGame(30)(frozen)
    expect(half.achievements.counters.purgeWaitSeconds).toBe(30)
    expect(isAchievementEarned(half, 'remindMeLater')).toBe(false)
    expect(isAchievementEarned(tickGame(30)(half), 'remindMeLater')).toBe(true)
    const claimed = tickGame(1)({ ...half, resources: { ...half.resources, [MONEY_ID]: 0 } })
    expect(claimed.achievements.counters.purgeWaitSeconds).toBe(0)
  })

  it('Compression, Zip bomb, Auto-Purge and Overflow achievements read current state', () => {
    const s = detectAchievements({ ...base(), prestigeDoublePpLevel: 6 })
    for (const id of ['lossless', 'middleOut', 'zipBomb']) expect(isAchievementEarned(s, id)).toBe(true)
    expect(isAchievementEarned(detectAchievements({ ...base(), prestigeDoublePpLevel: 4 }), 'zipBomb')).toBe(false)
    const fast = detectAchievements({ ...base(), autoPurge: 1, automationIntervalLevels: { ...base().automationIntervalLevels, purge: 100 } })
    expect(isAchievementEarned(fast, 'whileTrue')).toBe(true)
    const overflow = detectAchievements({ ...base(), purge: { ...base().purge, unboundedUnlocked: true }, resources: { ...base().resources, [MONEY_ID]: PURGE_THRESHOLD } })
    expect(isAchievementEarned(overflow, 'notABug')).toBe(true)
    expect(isAchievementEarned(detectAchievements({ ...base(), resources: { ...base().resources, [MONEY_ID]: PURGE_THRESHOLD } }), 'notABug')).toBe(false)
  })

  it('autobuyer achievements and Ping while fully automated', () => {
    const some = { ...base(), autobuyers: { ...base().autobuyers, [TIER_DEFINITIONS[0].id]: 1 } }
    expect(isAchievementEarned(detectAchievements(some), 'scriptKiddie')).toBe(true)
    expect(isAchievementEarned(detectAchievements(some), 'cronJob')).toBe(false)
    const all = { ...base(), autobuyers: Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, 1])) }
    expect(isAchievementEarned(detectAchievements(all), 'cronJob')).toBe(true)
    expect(isAchievementEarned(tapIntroBit(all), 'stillClicker')).toBe(true)
    expect(isAchievementEarned(tapIntroBit(some), 'stillClicker')).toBe(false)
  })

  it('Power achievements: page, Battery, Fusion, Turbo and Stack Overflow', () => {
    const intro = patch => ({ ...base(), intro: { ...base().intro, ...patch } })
    expect(isAchievementEarned(detectAchievements(intro({ computeCoresEverEarned: 1 })), 'powerUser')).toBe(true)
    const battery = detectAchievements(intro({ computeClusters: 1 }))
    expect(isAchievementEarned(battery, 'batteriesIncluded')).toBe(true)
    expect(isAchievementEarned(battery, 'coldFusion')).toBe(false)
    expect(isAchievementEarned(detectAchievements(intro({ computeMegacomputers: 1 })), 'coldFusion')).toBe(true)
    const boosted = activateComputeBoost('burst', 1)({ ...base(), intro: { ...base().intro, computeBoosts: {}, ...Object.fromEntries(COMPUTE_BOOST_TIER_FIELDS.map(f => [f, COMPUTE_BOOST_MAX_STACKS + 1])) } })
    expect(boosted.achievements.counters.turboBoosts).toBe(1)
    let stacked = boosted
    for (let i = 0; i < COMPUTE_BOOST_MAX_STACKS; i += 1) stacked = stackComputeBoost('burst')(stacked)
    expect(isAchievementEarned(stacked, 'stackOverflow')).toBe(true)
  })
})

describe('review follow-ups (#1199)', () => {
  it('Reboot seeds lifetime Purges and Kernels from legacy state', () => {
    const s = createInitialGameState()
    const legacy = { ...s, purge: { ...s.purge, count: 63, points: 1e100 }, eons: { balance: 99 } }
    const after = eraGame(legacy)
    expect(after.achievements.counters.purges).toBe(63)
    expect(after.achievements.counters.kernelsEarned).toBeGreaterThanOrEqual(100)
    expect(isAchievementEarned(after, 'popcorn')).toBe(true)
  })

  it('a Purge in Overflow past a Googol earns the achievement even though it resets the balance', () => {
    const s = createInitialGameState()
    const ready = { ...s, purge: { ...s.purge, unboundedUnlocked: true }, resources: { ...s.resources, [MONEY_ID]: PURGE_THRESHOLD } }
    expect(isAchievementEarned(purgeGame(ready), 'notABug')).toBe(true)
  })

  it('Power user follows the Power tab predicate (Capacity unlocks it)', () => {
    const s = createInitialGameState()
    expect(isAchievementEarned(detectAchievements({ ...s, intro: { ...s.intro, capacity: 1e12 } }), 'powerUser')).toBe(true)
  })
})

describe('review follow-ups (#1199, round 2)', () => {
  it('Popcorn counts an unspent Kernel balance on load', () => {
    const s = createInitialGameState()
    expect(isAchievementEarned(detectAchievements({ ...s, eons: { balance: 100 } }), 'popcorn')).toBe(true)
  })

  it('records Overflow on a repeat challenge completion, which awards no Purge count', () => {
    const s = createInitialGameState()
    const id = CHALLENGE_DEFINITIONS[0].id
    const inChallenge = {
      ...s,
      purge: { ...s.purge, unboundedUnlocked: true },
      challenges: { ...s.challenges, active: id, completed: { [id]: true } },
    }
    const ready = { ...inChallenge, resources: { ...inChallenge.resources, [MONEY_ID]: Math.max(PURGE_THRESHOLD, getPurgeGoalBits(inChallenge)) } }
    const next = purgeGame(ready)
    expect(next.purge.count).toBe(ready.purge.count) // a replay awards no Purge
    expect(next.achievements.counters.overflowPurges).toBe(1)
    expect(isAchievementEarned(next, 'notABug')).toBe(true)
  })

  it('records Overflow on a tick that exceeds a Googol even when Auto Overclock resets the balance in that tick', () => {
    const s = createInitialGameState()
    const ready = {
      ...s,
      purge: { ...s.purge, unboundedUnlocked: true },
      resources: { ...s.resources, [MONEY_ID]: PURGE_THRESHOLD },
      autoPurge: null,
      autoOverclock: true,
      purchaseLevels: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, 6])),
      owned: { ...s.owned, ...Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, 1])) },
      automationAttemptBudgets: { speedUp: 1, scaleUp: 1, overclock: 1 },
    }
    const next = tickGame(120)(ready)
    expect(next.overclockLastClaimCompletedLevels).not.toBeNull() // the Overclock reset ran this tick
    expect(next.resources[MONEY_ID]).toBeLessThan(PURGE_THRESHOLD) // ...and discarded the past-Googol balance
    expect(next.achievements.counters.overflowPurges).toBe(1)
    expect(isAchievementEarned(next, 'notABug')).toBe(true)
  })
})

describe('getAchievementProductionMultiplier', () => {
  it('is 1 with no stars and adds 1% per star additively', () => {
    const base = createInitialGameState()
    expect(getAchievementProductionMultiplier(base)).toBe(1)
    const earned = { helloWorld: true, itCompiles: true, pingOfDeath: true }
    const state = { ...base, achievements: { ...base.achievements, earned } }
    expect(getAchievementProductionMultiplier(state)).toBeCloseTo(1 + 0.01 * getAchievementStars(state), 10)
    expect(getAchievementStars(state)).toBeGreaterThanOrEqual(3)
  })
})
