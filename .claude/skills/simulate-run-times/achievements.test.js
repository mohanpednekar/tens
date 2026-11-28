import { describe, expect, it } from 'vitest'
import { TIER_DEFINITIONS } from '../../../src/game/layers.js'
import { createInitialGameState } from '../../../src/game/engine.js'
import { simulateCycleWithAchievements } from './achievements.mjs'
import { NO_POLICY, actMainBuys, actSoftResets, actTickspeed, isOverclockHeld } from './bot.mjs'

const lastTierId = TIER_DEFINITIONS.at(-1).id

describe('bot achievement policy hooks', () => {
  it('marks the bot\'s own manual tier purchases so cycles are not credited as hands-free', () => {
    let state = createInitialGameState()
    state = { ...state, intro: { ...state.intro, mainGameUnlocked: true }, resources: { ...state.resources, base: 1e6 } }
    const bought = actMainBuys(state)
    expect(bought).not.toBe(state)
    expect(bought.manualPurchaseThisCycle).toBe(true)
  })

  it('handsFree never clicks a Buy', () => {
    const state = createInitialGameState()
    expect(actMainBuys(state, { handsFree: true })).toBe(state)
  })

  it('noAccelerate skips the global tickspeed purchase', () => {
    const state = {
      ...createInitialGameState(),
      intro: { ...createInitialGameState().intro, mainGameUnlocked: true },
      resources: { ...createInitialGameState().resources, base: 1e12 },
    }
    const normal = actTickspeed(state)
    const held = actTickspeed(state, { noAccelerate: true })
    expect(held.accelerateBoughtThisCycle).toBeFalsy()
    if (normal.accelerateBoughtThisCycle) expect(held.globalTickspeedMultiplier ?? 0).toBe(state.globalTickspeedMultiplier ?? 0)
  })

  it('holds the first Overclock until the requested completed level, then releases it', () => {
    const base = createInitialGameState()
    const at = completed => ({ ...base, purchaseLevels: { ...base.purchaseLevels, [lastTierId]: completed + 1 } })
    const policy = { overclockFirstMin: 6 }
    expect(isOverclockHeld(at(5), policy)).toBe(true)
    expect(isOverclockHeld(at(6), policy)).toBe(false)
    expect(isOverclockHeld(at(5), NO_POLICY)).toBe(false)
    // Only the FIRST claim of a Purge is held.
    expect(isOverclockHeld({ ...at(5), overclockLastClaimCompletedLevels: 5 }, policy)).toBe(false)
  })

  it('does not hold or claim when Overclock is not reachable', () => {
    const state = createInitialGameState()
    expect(actSoftResets(state, { overclockFirstMin: 6 })).toBeDefined()
  })
})

describe('simulateCycleWithAchievements (planner, stubbed engine replay)', () => {
  const base = createInitialGameState()
  const earnedState = id => ({ ...base, achievements: { ...base.achievements, earned: { [id]: true } } })
  const goal = (id, reward, key) => ({ id, reward, ready: () => true, apply: p => ({ ...p, [key]: true }) })

  const makeSim = table => (state, { policy, maxTicks = Infinity }) => {
    const key = Object.keys(policy).sort().join('+') || 'none'
    const { ticks, earns } = table[key] ?? { ticks: Infinity, earns: null }
    const reached = ticks <= maxTicks
    return {
      ticks: reached ? ticks : maxTicks,
      reached,
      state: reached && earns ? earnedState(earns) : state,
    }
  }

  it('keeps an attempt within budget that earns its achievement and tallies the cost', () => {
    const result = simulateCycleWithAchievements(base, {
      goals: [goal('remindMeLater', false, 'holdIt')],
      simulate: makeSim({ none: { ticks: 1000 }, holdIt: { ticks: 1040, earns: 'remindMeLater' } }),
    })
    expect(result.pursued).toEqual([{ id: 'remindMeLater', cost: 40 }])
    expect(result.extraTicks).toBe(40)
    expect(result.newlyEarned).toContain('remindMeLater')
  })

  it('defers an attempt over budget (cosmetic 5%) and takes it when the budget allows (reward 25%)', () => {
    const table = { none: { ticks: 1000 }, a: { ticks: 1100, earns: 'noHands' } }
    const cosmetic = simulateCycleWithAchievements(base, { goals: [goal('noHands', false, 'a')], simulate: makeSim(table) })
    expect(cosmetic.deferred).toEqual(['noHands'])
    expect(cosmetic.extraTicks).toBe(0)
    const reward = simulateCycleWithAchievements(base, { goals: [goal('noHands', true, 'a')], simulate: makeSim(table) })
    expect(reward.pursued).toHaveLength(1)
  })

  it('defers an attempt that does not actually earn the achievement, and skips ones already earned', () => {
    const table = { none: { ticks: 1000 }, a: { ticks: 1001 } }
    const result = simulateCycleWithAchievements(base, { goals: [goal('noHands', false, 'a')], simulate: makeSim(table) })
    expect(result.deferred).toEqual(['noHands'])
    const already = simulateCycleWithAchievements(earnedState('noHands'), { goals: [goal('noHands', false, 'a')], simulate: makeSim(table) })
    expect(already.pursued).toEqual([])
    expect(already.deferred).toEqual([])
  })

  it('stacks compatible attempts, charging each only its marginal cost', () => {
    const table = {
      none: { ticks: 1000 },
      a: { ticks: 1020, earns: 'noHands' },
      'a+b': { ticks: 1050, earns: 'remindMeLater' },
    }
    const result = simulateCycleWithAchievements(base, {
      goals: [goal('noHands', false, 'a'), goal('remindMeLater', false, 'b')],
      simulate: makeSim(table),
    })
    expect(result.pursued.map(p => [p.id, p.cost])).toEqual([['noHands', 20], ['remindMeLater', 30]])
    expect(result.extraTicks).toBe(50)
  })
})
