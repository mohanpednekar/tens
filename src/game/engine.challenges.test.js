import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  applyOfflineProgress, autoCompleteChallenges, buyAutomationIntervalUpgrade, buyAutobuyerIntervalUpgrade, buyGlobalTickspeedMultiplier,
  buyTierTickspeedIntervalUpgrade, consumeXpForLastTierTickspeed, createInitialGameState, enterChallenge, eraGame, exitChallenge,
  getActiveChallenge, getEffectiveTierTickSpeedSeconds, getPurgeGoalBits, getTierScaleUpMultiplier, isChallengeUnlocked,
  isProductionFrozen, overclockGame, purgeGame, resetByteFoundry, scaleUpGame, tickGame,
} from './engine'
import { CHALLENGE_BY_ID, CHALLENGE_DEFINITIONS, ERA_ELIGIBILITY_PP, LIVE_CHALLENGE_IDS, MONEY_ID, PURGE_THRESHOLD, SCOPE_CREEP_PURGE_GOAL, TIER_DEFINITIONS } from './layers'

const LAST_TIER = TIER_DEFINITIONS[TIER_DEFINITIONS.length - 1].id
const FIRST_TIER = TIER_DEFINITIONS[0].id

// Every global automation owned, so F21–F25 are all unlocked.
const withAutomations = overrides => ({
  ...createInitialGameState(),
  autoGlobalTickspeed: true,
  autoScaleUp: true,
  autoXpTickspeed: true,
  autoOverclock: true,
  autoPurge: 1,
  purge: { ...createInitialGameState().purge, points: 1e9, count: 4 },
  ...overrides,
})
const atGoal = (state, money = PURGE_THRESHOLD) => ({ ...state, resources: { ...state.resources, [MONEY_ID]: money } })
const SHIPPED_LIVE = [...LIVE_CHALLENGE_IDS]
const makeLive = (...ids) => ids.forEach(id => LIVE_CHALLENGE_IDS.add(id))

beforeEach(() => LIVE_CHALLENGE_IDS.clear())
afterEach(() => LIVE_CHALLENGE_IDS.clear())

describe('challenge registry', () => {
  it('defines F21–F25 as Factory-layer global challenges with unique ids', () => {
    expect(CHALLENGE_DEFINITIONS.map(def => def.id)).toEqual(['F21', 'F22', 'F23', 'F24', 'F25'])
    expect(new Set(CHALLENGE_DEFINITIONS.map(def => def.layer))).toEqual(new Set(['F']))
    expect(CHALLENGE_BY_ID.F25.goal).toBe(SCOPE_CREEP_PURGE_GOAL)
    expect(SCOPE_CREEP_PURGE_GOAL).toBeGreaterThan(PURGE_THRESHOLD)
  })

  it('ships F21–F25 live', () => {
    expect(SHIPPED_LIVE).toEqual(['F21', 'F22', 'F23', 'F24', 'F25'])
  })
})

describe('with no live challenge (shipped behaviour)', () => {
  it('cannot be entered, does not gate upgrades and Purges as before', () => {
    const state = withAutomations()
    expect(enterChallenge('F21')(state)).toBe(state)
    const bought = buyAutomationIntervalUpgrade('speedUp')(state)
    expect(bought.automationIntervalLevels.speedUp).toBe(1)
    const purged = purgeGame(atGoal(state))
    expect(purged.purge.count).toBe(5)
    expect(purged.purge.points).toBeGreaterThan(state.purge.points)
  })

  it('ignores an active challenge id that is not live', () => {
    const state = { ...withAutomations(), challenges: { ...createInitialGameState().challenges, active: 'F25' } }
    expect(getActiveChallenge(state)).toBeNull()
    expect(getPurgeGoalBits(state)).toBe(PURGE_THRESHOLD)
    expect(isProductionFrozen(atGoal(state))).toBe(true)
  })
})

describe('enter / exit', () => {
  it('enter resets the Factory cycle with no PP and no Purge count, and records the entry', () => {
    makeLive('F21')
    const state = atGoal(withAutomations(), 1e50)
    const next = enterChallenge('F21')(state)
    expect(next.challenges.active).toBe('F21')
    expect(next.challenges.activeSeconds).toBe(0)
    expect(next.challenges.enteredCount).toBe(1)
    expect(next.resources[MONEY_ID]).toBeLessThan(1e50)
    expect(next.purge.points).toBe(state.purge.points)
    expect(next.purge.count).toBe(state.purge.count)
    expect(next.autoGlobalTickspeed).toBe(true)
  })

  it('invalid enters return the same reference: not live, locked, unknown, or another already active', () => {
    const state = withAutomations()
    expect(enterChallenge('F21')(state)).toBe(state)
    makeLive('F21', 'F22')
    expect(enterChallenge('nope')(state)).toBe(state)
    const locked = withAutomations({ autoGlobalTickspeed: false })
    expect(isChallengeUnlocked(locked, 'F21')).toBe(false)
    expect(enterChallenge('F21')(locked)).toBe(locked)
    const inChallenge = enterChallenge('F21')(state)
    expect(enterChallenge('F22')(inChallenge)).toBe(inChallenge)
  })

  it('exit restarts the cycle with no reward and counts the exit; exit outside a challenge is a no-op', () => {
    makeLive('F21')
    const state = withAutomations()
    expect(exitChallenge(state)).toBe(state)
    const inChallenge = enterChallenge('F21')(state)
    const left = exitChallenge(atGoal(inChallenge, 1e40))
    expect(left.challenges.active).toBeNull()
    expect(left.challenges.exitedCount).toBe(1)
    expect(left.challenges.completed).toEqual({})
    expect(left.purge.points).toBe(state.purge.points)
    expect(left.purge.count).toBe(state.purge.count)
    expect(left.resources[MONEY_ID]).toBeLessThan(1e40)
  })
})

describe('completion', () => {
  it('first completion is an ordinary Purge that records completion and best time', () => {
    makeLive('F21')
    const running = { ...enterChallenge('F21')(withAutomations()) }
    running.challenges = { ...running.challenges, activeSeconds: 500 }
    const done = purgeGame(atGoal(running))
    expect(done.challenges).toMatchObject({ active: null, activeSeconds: 0, completed: { F21: true }, bestSeconds: { F21: 500 } })
    expect(done.purge.count).toBe(running.purge.count + 1)
    expect(done.purge.points).toBeGreaterThan(running.purge.points)
    expect(done.prestigeMuseum.history.length).toBe(1)
  })

  it('repeat completion keeps the faster best time and awards no PP and no Purge count', () => {
    makeLive('F21')
    const base = withAutomations()
    const first = { ...enterChallenge('F21')(base) }
    first.challenges = { ...first.challenges, activeSeconds: 500 }
    const completed = purgeGame(atGoal(first))
    const again = { ...enterChallenge('F21')(completed) }
    expect(again.challenges.active).toBe('F21')
    again.challenges = { ...again.challenges, activeSeconds: 300 }
    const repeat = purgeGame(atGoal(again))
    expect(repeat.challenges.bestSeconds.F21).toBe(300)
    expect(repeat.challenges.active).toBeNull()
    expect(repeat.purge.points).toBe(completed.purge.points)
    expect(repeat.purge.count).toBe(completed.purge.count)
    expect(repeat.prestigeMuseum.history.length).toBe(1)

    const slower = { ...enterChallenge('F21')(repeat) }
    slower.challenges = { ...slower.challenges, activeSeconds: 900 }
    expect(purgeGame(atGoal(slower)).challenges.bestSeconds.F21).toBe(300)
  })

  it('completions and best times survive Purge and Reboot; a full reset clears them', () => {
    makeLive('F21')
    const running = enterChallenge('F21')(withAutomations())
    const completed = purgeGame(atGoal(running))
    const afterPurge = purgeGame(atGoal(completed))
    expect(afterPurge.challenges.completed.F21).toBe(true)
    const rebooted = eraGame({ ...afterPurge, purge: { ...afterPurge.purge, points: ERA_ELIGIBILITY_PP } })
    expect(rebooted.challenges.completed.F21).toBe(true)
    expect(rebooted.challenges.bestSeconds.F21).toBe(0)
    expect(createInitialGameState().challenges.completed).toEqual({})
  })
})

describe('what ends or keeps an active challenge', () => {
  it('Reboot clears the active challenge without completing it', () => {
    makeLive('F21')
    const running = enterChallenge('F21')(withAutomations({ purge: { ...createInitialGameState().purge, points: ERA_ELIGIBILITY_PP, count: 4 } }))
    const rebooted = eraGame(running)
    expect(rebooted).not.toBe(running)
    expect(rebooted.challenges.active).toBeNull()
    expect(rebooted.challenges.completed).toEqual({})
    expect(rebooted.challenges.enteredCount).toBe(1)
  })

  it('Scale Up, Overclock and Reformat Byte Foundry leave it active', () => {
    makeLive('F21')
    const running = enterChallenge('F21')(withAutomations())
    const scalable = { ...running, purchaseLevels: { ...running.purchaseLevels, [FIRST_TIER]: 4 } }
    const scaled = scaleUpGame(scalable)
    expect(scaled).not.toBe(scalable)
    expect(scaled.challenges.active).toBe('F21')
    const overclockable = { ...running, purchaseLevels: { ...running.purchaseLevels, [LAST_TIER]: 8 } }
    const overclocked = overclockGame(overclockable)
    expect(overclocked).not.toBe(overclockable)
    expect(overclocked.challenges.active).toBe('F21')
    expect(resetByteFoundry(running).challenges.active).toBe('F21')
  })
})

describe('speed-upgrade gate', () => {
  it('refuses the three speed-upgrade functions until the live challenge is completed', () => {
    makeLive('F21')
    const state = withAutomations()
    expect(buyAutomationIntervalUpgrade('speedUp')(state)).toBe(state)
    expect(buyAutomationIntervalUpgrade('scaleUp')(state).automationIntervalLevels.scaleUp).toBe(1) // F22 not live
    const completed = { ...state, challenges: { ...state.challenges, completed: { F21: true } } }
    expect(buyAutomationIntervalUpgrade('speedUp')(completed).automationIntervalLevels.speedUp).toBe(1)
  })

  it('gates tier autobuyer and tier tickspeed chains for live challenges that target them', () => {
    const tierChallenge = { id: 'T1', layer: 'F', automation: { kind: 'tierAutobuyer', key: FIRST_TIER }, effect: 'none', goal: PURGE_THRESHOLD }
    const tickChallenge = { id: 'T2', layer: 'F', automation: { kind: 'tierTickspeed', key: FIRST_TIER }, effect: 'none', goal: PURGE_THRESHOLD }
    CHALLENGE_DEFINITIONS.push(tierChallenge, tickChallenge)
    CHALLENGE_BY_ID.T1 = tierChallenge
    CHALLENGE_BY_ID.T2 = tickChallenge
    try {
      makeLive('T1', 'T2')
      const state = withAutomations({
        autobuyers: { ...createInitialGameState().autobuyers, [FIRST_TIER]: 1 },
        tierTickspeedAutobuyer: { ...createInitialGameState().tierTickspeedAutobuyer, [FIRST_TIER]: true },
      })
      expect(buyAutobuyerIntervalUpgrade(FIRST_TIER)(state)).toBe(state)
      expect(buyTierTickspeedIntervalUpgrade(FIRST_TIER)(state)).toBe(state)
      const completed = { ...state, challenges: { ...state.challenges, completed: { T1: true, T2: true } } }
      expect(buyAutobuyerIntervalUpgrade(FIRST_TIER)(completed).autobuyerIntervalLevels[FIRST_TIER]).toBe(1)
      expect(buyTierTickspeedIntervalUpgrade(FIRST_TIER)(completed).tierTickspeedIntervalLevels[FIRST_TIER]).toBe(1)
      // Existing-save auto-complete covers both level maps too.
      const legacy = { ...state, autobuyerIntervalLevels: { ...state.autobuyerIntervalLevels, [FIRST_TIER]: 2 }, tierTickspeedIntervalLevels: { ...state.tierTickspeedIntervalLevels, [FIRST_TIER]: 1 } }
      expect(autoCompleteChallenges(legacy).challenges.completed).toEqual({ T1: true, T2: true })
    } finally {
      CHALLENGE_DEFINITIONS.splice(CHALLENGE_DEFINITIONS.indexOf(tierChallenge), 1)
      CHALLENGE_DEFINITIONS.splice(CHALLENGE_DEFINITIONS.indexOf(tickChallenge), 1)
      delete CHALLENGE_BY_ID.T1
      delete CHALLENGE_BY_ID.T2
    }
  })
})

describe('auto-complete for existing saves', () => {
  it('completes live challenges whose automation already has a speed level; idempotent; no best time', () => {
    makeLive('F21', 'F22')
    const state = withAutomations({ automationIntervalLevels: { ...createInitialGameState().automationIntervalLevels, speedUp: 2 } })
    const next = autoCompleteChallenges(state)
    expect(next.challenges.completed).toEqual({ F21: true })
    expect(next.challenges.bestSeconds).toEqual({})
    expect(autoCompleteChallenges(next)).toBe(next)
  })

  it('does nothing while nothing is live or no level is held', () => {
    const held = withAutomations({ automationIntervalLevels: { ...createInitialGameState().automationIntervalLevels, speedUp: 2 } })
    expect(autoCompleteChallenges(held)).toBe(held)
    makeLive('F21')
    const none = withAutomations()
    expect(autoCompleteChallenges(none)).toBe(none)
  })
})

describe('global challenge rules', () => {
  it('F21 disables Clock Speed (by hand/automation) and its tickspeed effect, Overclock included', () => {
    makeLive('F21')
    const free = { ...withAutomations(), resources: { ...createInitialGameState().resources, [MONEY_ID]: 1e9 }, purchaseLevels: { ...createInitialGameState().purchaseLevels, [FIRST_TIER]: 2 } }
    expect(buyGlobalTickspeedMultiplier(free)).not.toBe(free)
    const running = { ...enterChallenge('F21')(free), globalTickspeedMultiplier: 5, resources: free.resources, purchaseLevels: free.purchaseLevels }
    expect(buyGlobalTickspeedMultiplier(running)).toBe(running)
    const plain = { ...running, globalTickspeedMultiplier: null, overclockLastClaimCompletedLevels: null }
    expect(getEffectiveTierTickSpeedSeconds(running, FIRST_TIER)).toBe(getEffectiveTierTickSpeedSeconds(plain, FIRST_TIER))
  })

  it('F22 keeps the Scale Up counters but applies no doubling', () => {
    makeLive('F22')
    const state = withAutomations({ scaleUpTierCounts: { ...createInitialGameState().scaleUpTierCounts, [FIRST_TIER]: 3 } })
    expect(getTierScaleUpMultiplier(state, FIRST_TIER)).toBe(8)
    const running = { ...enterChallenge('F22')(state), scaleUpTierCounts: state.scaleUpTierCounts }
    expect(getTierScaleUpMultiplier(running, FIRST_TIER)).toBe(1)
  })

  it('F23 disables Restage and F24 disables Overclock (same reference)', () => {
    makeLive('F23', 'F24')
    const restage = enterChallenge('F23')(withAutomations())
    const withXp = { ...restage, purge: { ...restage.purge, xp: 1e6 }, owned: { ...restage.owned, [LAST_TIER]: 5 } }
    expect(consumeXpForLastTierTickspeed(1e6)(withXp)).toBe(withXp)
    const oc = enterChallenge('F24')(withAutomations())
    const ready = { ...oc, purchaseLevels: { ...oc.purchaseLevels, [LAST_TIER]: 8 } }
    expect(overclockGame(ready)).toBe(ready)
  })

  it('F25 raises the goal: no freeze or Purge between 1 Googol Bytes and the raised goal', () => {
    makeLive('F25')
    const state = withAutomations({ purge: { ...createInitialGameState().purge, points: 1e9, count: 4 } })
    const between = atGoal(state, PURGE_THRESHOLD * 10)
    expect(isProductionFrozen(between)).toBe(true)
    expect(purgeGame(between)).not.toBe(between)

    const running = enterChallenge('F25')(state)
    expect(getPurgeGoalBits(running)).toBe(SCOPE_CREEP_PURGE_GOAL)
    const insideRun = atGoal(running, PURGE_THRESHOLD * 10)
    expect(isProductionFrozen(insideRun)).toBe(false)
    expect(purgeGame(insideRun)).toBe(insideRun)
    const ticked = tickGame(1)(insideRun)
    expect(ticked.resources[MONEY_ID]).toBeGreaterThanOrEqual(insideRun.resources[MONEY_ID])

    const reached = atGoal(running, SCOPE_CREEP_PURGE_GOAL)
    expect(isProductionFrozen(reached)).toBe(true)
    const done = purgeGame(reached)
    expect(done.challenges.completed.F25).toBe(true)
    expect(done.purge.points).toBeGreaterThan(running.purge.points)
  })
})

describe('challenge clock', () => {
  it('counts live ticks and offline replay, and is a no-op reference outside a challenge', () => {
    makeLive('F21')
    const idle = withAutomations()
    expect(tickGame(1)(idle).challenges).toBe(idle.challenges)
    const running = enterChallenge('F21')(idle)
    expect(tickGame(0.5)(running).challenges.activeSeconds).toBeCloseTo(0.5)
    expect(applyOfflineProgress(30)(running).challenges.activeSeconds).toBe(30)
  })
})
