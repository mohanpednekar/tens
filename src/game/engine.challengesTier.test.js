import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  buyTickspeedMultiplier, buyTierQuantity, createInitialGameState, enterChallenge, getBitRotCorruption, getEffectiveTierCount,
  getEffectiveTierTickSpeedSeconds, getTickspeedMultiplierCost, getTickspeedMultiplierSpend, getTierCost, getTierTickspeedRequirement, getTierTickspeedSpend, getTierScaleUpMultiplier,
  isTierUnlocked, tickDiskLevelOneCachePull, tickDiskPull, tickGame,
} from './engine'
import { BIT_ROT_GRACE_SECONDS, CHALLENGE_DEFINITIONS, LIVE_CHALLENGE_IDS, MONEY_ID, TIER_DEFINITIONS, WRITE_LOCK_HALT_SECONDS } from './layers'

const T = index => TIER_DEFINITIONS[index].id

// A state past Purge 20 with every tier autobuyer and tier tickspeed autobuyer unlocked, but not running any
// (autobuyers off so each test isolates its rule), entered into challenge `id`.
const runOf = (id, patch = () => ({})) => {
  const base = createInitialGameState()
  const unlocked = {
    ...base,
    purge: { ...base.purge, count: 20 },
    autobuyers: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, 1])),
    tierTickspeedAutobuyer: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, true])),
  }
  const entered = enterChallenge(id)(unlocked)
  const quiet = { ...entered, autobuyers: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, null])) }
  return { ...quiet, ...patch(quiet) }
}
const withChallenge = (state, patch) => ({ ...state, challenges: { ...state.challenges, ...patch } })
const withRun = (state, patch) => withChallenge(state, { run: { ...state.challenges.run, ...patch } })
const setMap = (state, field, tierId, value) => ({ ...state, [field]: { ...state[field], [tierId]: value } })

let shippedLive
beforeEach(() => { shippedLive = [...LIVE_CHALLENGE_IDS] })
afterEach(() => { LIVE_CHALLENGE_IDS.clear(); shippedLive.forEach(id => LIVE_CHALLENGE_IDS.add(id)) })

describe('F1–F20 are enterable once their automation is unlocked', () => {
  it.each(CHALLENGE_DEFINITIONS.filter(def => Number(def.id.slice(1)) <= 20).map(def => [def.id, def]))('%s', (id, def) => {
    const run = runOf(id)
    expect(run.challenges.active).toBe(id)
    expect(def.automation.key).toMatch(/^tier/)
    const locked = createInitialGameState()
    expect(enterChallenge(id)(locked)).toBe(locked)
  })
})

describe('tier autobuyer challenges', () => {
  it('F1 Half Duplex halves Kilobytes production, and is inert under another challenge', () => {
    const seed = state => ({ owned: { ...state.owned, [T(0)]: 1000 } })
    const gain = id => {
      const start = runOf(id, seed)
      return tickGame(1)(start).resources[MONEY_ID] - start.resources[MONEY_ID]
    }
    expect(gain('F2')).toBeGreaterThan(0)
    expect(gain('F1') / gain('F2')).toBeCloseTo(0.5, 1)
  })

  it('F2 Write Lock: a Megabytes purchase halts production (restarting, not stacking) and the halt counts down', () => {
    const start = runOf('F2', state => ({ resources: { ...state.resources, [MONEY_ID]: 1e12 }, owned: { ...state.owned, [T(0)]: 1000, [T(1)]: 1 } }))
    const bought = buyTierQuantity(T(1), 1)(start)
    expect(bought.challenges.run.haltSeconds).toBe(WRITE_LOCK_HALT_SECONDS)
    const halted = tickGame(1)(withRun(bought, { haltSeconds: 5 }))
    expect(halted.challenges.run.haltSeconds).toBe(4)
    expect(halted.resources[MONEY_ID]).toBe(bought.resources[MONEY_ID])
    const resumed = tickGame(1)(withRun(bought, { haltSeconds: 0 }))
    expect(resumed.resources[MONEY_ID]).toBeGreaterThan(bought.resources[MONEY_ID])
    const other = runOf('F1', state => ({ resources: { ...state.resources, [MONEY_ID]: 1e12 }, owned: { ...state.owned, [T(1)]: 1 } }))
    expect(buyTierQuantity(T(1), 1)(other).challenges.run.haltSeconds).toBe(0)
  })

  it('F3 Cascade Delete wipes lower tiers on a Gigabytes purchase but keeps levels', () => {
    const start = runOf('F3', state => ({
      resources: { ...state.resources, [MONEY_ID]: 1e15, [T(0)]: 50, [T(1)]: 50 },
      owned: { ...state.owned, [T(0)]: 50, [T(1)]: 50, [T(2)]: 1 },
      purchaseLevels: { ...state.purchaseLevels, [T(0)]: 4 },
    }))
    const bought = buyTierQuantity(T(2), 1)(start)
    expect(bought.owned[T(2)]).toBeGreaterThan(1)
    expect(bought.owned[T(0)]).toBe(0)
    expect(bought.owned[T(1)]).toBe(0)
    expect(bought.purchaseLevels[T(0)]).toBe(4)
    expect(buyTierQuantity(T(1), 1)(start).owned[T(0)]).toBe(50) // buying a different tier is fine
  })

  it('F4 Premium Tier makes Terabytes cost ×1000', () => {
    const unit = getTierCost(TIER_DEFINITIONS[3], 1)
    const seed = money => state => ({ resources: { ...state.resources, [MONEY_ID]: money }, owned: { ...state.owned, [T(3)]: 1 } })
    expect(buyTierQuantity(T(3), 1)(runOf('F4', seed(unit * 2))).owned[T(3)]).toBe(1)
    expect(buyTierQuantity(T(3), 1)(runOf('F4', seed(unit * 2000))).owned[T(3)]).toBeGreaterThan(1)
    expect(buyTierQuantity(T(3), 1)(runOf('F1', seed(unit * 2))).owned[T(3)]).toBeGreaterThan(1)
  })

  it('F5 Hard Refresh resets Petabytes at each 5-minute mark, one long tick equal to many', () => {
    const seed = state => ({ owned: { ...state.owned, [T(4)]: 50 }, resources: { ...state.resources, [T(4)]: 50 } })
    const near = withChallenge(runOf('F5', seed), { activeSeconds: 299.5 })
    const after = tickGame(1)(near)
    expect(after.owned[T(4)]).toBe(0)
    expect(after.challenges.run.refreshes).toBe(1)
    const long = tickGame(700)(withChallenge(runOf('F5', seed), { activeSeconds: 0 }))
    expect(long.challenges.run.refreshes).toBe(2)
    let stepped = withChallenge(runOf('F5', seed), { activeSeconds: 0 })
    for (let i = 0; i < 7000; i++) stepped = tickGame(0.1)(stepped)
    expect(stepped.challenges.run.refreshes).toBe(2)
    expect(tickGame(1)(withChallenge(runOf('F1', seed), { activeSeconds: 299.5 })).owned[T(4)]).toBe(50)
  })

  it('F6 Address Space leaves six tiers, with Exabytes as the final tier for Scale Up', () => {
    const run = runOf('F6', state => ({ everUnlockedTierIds: Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, true])), owned: { ...state.owned, [T(5)]: 1, [T(6)]: 1, [T(7)]: 5 } }))
    expect(getEffectiveTierCount(run)).toBe(6)
    expect(isTierUnlocked(run)(TIER_DEFINITIONS[5])).toBe(true)
    expect(isTierUnlocked(run)(TIER_DEFINITIONS[6])).toBe(false)
    expect(isTierUnlocked(run)(TIER_DEFINITIONS[7])).toBe(false)
    expect(TIER_DEFINITIONS).toHaveLength(10)
    expect(getEffectiveTierCount(runOf('F1'))).toBe(10)
  })

  it('F7 Single Instance: Zettabytes never double, other tiers do', () => {
    const counts = Object.fromEntries(TIER_DEFINITIONS.map(tier => [tier.id, 2]))
    const run = runOf('F7', () => ({ scaleUpTierCounts: counts }))
    expect(getTierScaleUpMultiplier(run, T(6))).toBe(1)
    expect(getTierScaleUpMultiplier(run, T(5))).toBe(4)
    expect(getTierScaleUpMultiplier(runOf('F1', () => ({ scaleUpTierCounts: counts })), T(6))).toBe(4)
  })

  it('F8 Memory Leak decays Yottabytes 1% per second, a long tick matching many short ones', () => {
    const seed = state => ({ owned: { ...state.owned, [T(7)]: 100000 }, resources: { ...state.resources, [T(7)]: 100000 } })
    const long = tickGame(10)(runOf('F8', seed))
    let stepped = runOf('F8', seed)
    for (let i = 0; i < 100; i++) stepped = tickGame(0.1)(stepped)
    expect(long.owned[T(7)]).toBeGreaterThan(89000)
    expect(long.owned[T(7)]).toBeLessThan(91000)
    expect(Math.abs(long.owned[T(7)] - stepped.owned[T(7)])).toBeLessThan(5)
    expect(tickGame(10)(runOf('F1', seed)).owned[T(7)]).toBe(100000)
  })

  it('F9 Bit Rot restarts the cycle when corruption overtakes Bits, keeps the challenge active, and counts the loss', () => {
    const run = runOf('F9')
    expect(getBitRotCorruption(run)).toBe(0)
    const rotting = withRun(withChallenge(run, { activeSeconds: 1000 }), { cycleSeconds: BIT_ROT_GRACE_SECONDS + 200 })
    expect(getBitRotCorruption(rotting)).toBeGreaterThan(rotting.resources[MONEY_ID])
    const after = tickGame(1)({ ...rotting, resources: { ...rotting.resources, [MONEY_ID]: 5 } })
    expect(after.challenges.active).toBe('F9')
    expect(after.challenges.bitRotLosses).toBe(1)
    expect(after.challenges.run.cycleSeconds).toBe(0)
    expect(after.challenges.activeSeconds).toBeGreaterThan(1000)
    expect(getBitRotCorruption(after)).toBe(0)
    const safe = tickGame(1)({ ...rotting, resources: { ...rotting.resources, [MONEY_ID]: 1e12 } })
    expect(safe.challenges.bitRotLosses).toBe(0)
    expect(getBitRotCorruption(withRun(runOf('F1'), { cycleSeconds: 1e6 }))).toBe(0)
  })

  it('F9 over one long gap equals the same gap in ticks', () => {
    const start = withRun(runOf('F9'), { cycleSeconds: BIT_ROT_GRACE_SECONDS - 1 })
    let stepped = start
    for (let i = 0; i < 600; i++) stepped = tickGame(1)(stepped)
    const long = tickGame(600)(start)
    expect(long.challenges.bitRotLosses).toBe(stepped.challenges.bitRotLosses)
    expect(long.challenges.activeSeconds).toBeCloseTo(stepped.challenges.activeSeconds)
  })

  it('F10 Flat Rate removes the per-level multiplier on Quettabytes only', () => {
    const production = (id, level) => {
      const start = runOf(id, state => ({
        owned: { ...state.owned, [T(9)]: 10 },
        purchaseLevels: { ...state.purchaseLevels, [T(9)]: level },
      }))
      return tickGame(10)(start).owned[T(8)]
    }
    expect(production('F10', 12)).toBe(production('F10', 1))
    expect(production('F1', 12)).toBeGreaterThan(production('F1', 1))
  })
})

describe('review regressions', () => {
  it('F19: a segment is produced at its starting phase, so tick size does not change the result', () => {
    const seed = state => ({ owned: { ...state.owned, [T(8)]: 100 }, tickspeedLevels: { ...state.tickspeedLevels, [T(8)]: 20 } })
    const one = tickGame(30)(runOf('F19', seed))
    let stepped = runOf('F19', seed)
    for (let i = 0; i < 300; i++) stepped = tickGame(0.1)(stepped)
    expect(Math.abs(one.owned[T(7)] - stepped.owned[T(7)]) / stepped.owned[T(7)]).toBeLessThan(0.1)
  })

  it('F2: a purchase by the autobuyer during a tick halts that tick\'s production', () => {
    const start = runOf('F2', state => ({
      resources: { ...state.resources, [MONEY_ID]: 1e12 },
      owned: { ...state.owned, [T(0)]: 1000, [T(1)]: 1 },
      autobuyers: { ...state.autobuyers, [T(1)]: 1 },
      autobuyerAttemptBudgets: { ...state.autobuyerAttemptBudgets, [T(1)]: 1 },
    }))
    const after = tickGame(2)(start)
    expect(after.challenges.run.haltSeconds).toBeGreaterThan(0)
    expect(after.owned[T(0)]).toBe(1000)
  })

  it('F2: a tickspeed upgrade during a halt cannot release banked production', () => {
    const start = runOf('F2', state => ({
      owned: { ...state.owned, [T(0)]: 1000 },
      tierProductionAccumulators: { ...state.tierProductionAccumulators, [T(0)]: 0.95 },
    }))
    const halted = withRun(setMap(start, 'tickspeedLevels', T(0), 2), { haltSeconds: 10 })
    expect(tickGame(0.1)(halted).resources[MONEY_ID]).toBe(halted.resources[MONEY_ID])
  })

  it('F20: the displayed spend/requirement selectors match what the purchase charges', () => {
    const start = runOf('F20', state => ({ resources: { ...state.resources, [T(9)]: 50 }, owned: { ...state.owned, [T(9)]: 50 } }))
    const spend = getTierTickspeedSpend(start, T(9), 2)
    expect(spend).toBe(getTickspeedMultiplierCost(T(9), 2))
    expect(getTierTickspeedRequirement(start, T(9), 2)).toBe(spend + 1)
    expect(getTierTickspeedSpend(runOf('F2'), T(9), 2)).toBeLessThan(spend)
  })

  it('an Auto Purge completion records the whole segment in the best time', () => {
    const base = runOf('F2')
    const goal = { ...base, resources: { ...base.resources, [MONEY_ID]: 1e300 }, autoPurge: 1, autoPurgeAttemptBudget: 5, purge: { ...base.purge, unboundedUnlocked: true } }
    const done = tickGame(0.1)(goal)
    expect(done.challenges.active).toBeNull()
    expect(done.challenges.bestSeconds.F2).toBeCloseTo(0.1)
  })

  it('F6: Storage never funds tiers that do not exist', () => {
    const run = runOf('F6')
    expect(tickDiskPull(run)).toBe(run)
    expect(tickDiskLevelOneCachePull(run)).toBe(run)
  })
})

describe('tier tickspeed challenges', () => {
  const secondsAt = (id, tierIndex, level, patch = () => ({})) =>
    getEffectiveTierTickSpeedSeconds(runOf(id, state => {
      const patched = patch(state)
      return { ...patched, tickspeedLevels: { ...state.tickspeedLevels, ...patched.tickspeedLevels, [T(tierIndex)]: level } }
    }), T(tierIndex))

  it('F11 Clock Gated: Kilobytes tickspeed cannot be bought and does not act', () => {
    const rich = state => ({ resources: { ...state.resources, [T(0)]: 1e30 }, owned: { ...state.owned, [T(0)]: 1e30 } })
    const run = runOf('F11', rich)
    expect(buyTickspeedMultiplier(T(0))(run)).toBe(run)
    expect(secondsAt('F11', 0, 6)).toBe(secondsAt('F11', 0, 1))
    const other = runOf('F2', rich)
    expect(buyTickspeedMultiplier(T(0))(other)).not.toBe(other)
  })

  it('F12 Half Step: each Megabytes level gives 5%', () => {
    expect(secondsAt('F12', 1, 3)).toBeCloseTo(secondsAt('F12', 1, 1) / 1.05 ** 2)
    expect(secondsAt('F2', 1, 3)).toBeCloseTo(secondsAt('F2', 1, 1) / 1.1 ** 2)
  })

  it('F13 Clock Skew doubles Gigabytes\' base period', () => {
    expect(secondsAt('F13', 2, 1)).toBeCloseTo(2 * secondsAt('F2', 2, 1))
    expect(secondsAt('F13', 3, 1)).toBeCloseTo(secondsAt('F2', 3, 1))
  })

  it('F14 Rate Limit: Terabytes tickspeed stops three levels above baseline', () => {
    const rich = level => state => ({ resources: { ...state.resources, [T(3)]: 1e300 }, owned: { ...state.owned, [T(3)]: 1e300 }, tickspeedLevels: { ...state.tickspeedLevels, [T(3)]: level } })
    expect(buyTickspeedMultiplier(T(3))(runOf('F14', rich(3))).tickspeedLevels[T(3)]).toBe(4)
    const capped = runOf('F14', rich(4))
    expect(buyTickspeedMultiplier(T(3))(capped)).toBe(capped)
    expect(buyTickspeedMultiplier(T(3))(runOf('F2', rich(4))).tickspeedLevels[T(3)]).toBe(5)
  })

  it('F15 Clock Drift loses a Petabytes level at each 10-minute mark, never below baseline', () => {
    const seed = level => state => ({ tickspeedLevels: { ...state.tickspeedLevels, [T(4)]: level } })
    expect(tickGame(1)(withChallenge(runOf('F15', seed(5)), { activeSeconds: 599.5 })).tickspeedLevels[T(4)]).toBe(4)
    expect(tickGame(1300)(runOf('F15', seed(5))).tickspeedLevels[T(4)]).toBe(3)
    expect(tickGame(3000)(runOf('F15', seed(2))).tickspeedLevels[T(4)]).toBe(1)
    expect(tickGame(1)(withChallenge(runOf('F1', seed(5)), { activeSeconds: 599.5 })).tickspeedLevels[T(4)]).toBe(5)
  })

  it('F16 Egress Fees: level L costs what level L+1 normally costs', () => {
    const normal = getTickspeedMultiplierSpend(T(5), 2)
    const seed = amount => state => ({ resources: { ...state.resources, [T(5)]: amount }, owned: { ...state.owned, [T(5)]: amount } })
    const poor = runOf('F16', seed(normal * 2))
    expect(buyTickspeedMultiplier(T(5))(poor)).toBe(poor)
    expect(buyTickspeedMultiplier(T(5))(runOf('F16', seed(getTickspeedMultiplierCost(T(5), 3) * 2))).tickspeedLevels[T(5)]).toBe(2)
    expect(buyTickspeedMultiplier(T(5))(runOf('F2', seed(normal * 2))).tickspeedLevels[T(5)]).toBe(2)
  })

  it('F17 Noisy Neighbour lengthens other tiers\' periods per Zettabytes level, not Zettabytes\' own', () => {
    const base = secondsAt('F2', 0, 1, state => ({ tickspeedLevels: { ...state.tickspeedLevels, [T(6)]: 3 } }))
    expect(secondsAt('F17', 0, 1, state => ({ tickspeedLevels: { ...state.tickspeedLevels, [T(6)]: 3 } }))).toBeCloseTo(base * 1.02 ** 2)
    expect(secondsAt('F17', 6, 3)).toBeCloseTo(secondsAt('F2', 6, 3))
  })

  it('F18 Daisy Chain: Yottabytes tickspeed cannot exceed Zettabytes\'', () => {
    const rich = zLevel => state => ({
      resources: { ...state.resources, [T(7)]: 1e300 }, owned: { ...state.owned, [T(7)]: 1e300 },
      tickspeedLevels: { ...state.tickspeedLevels, [T(6)]: zLevel, [T(7)]: zLevel },
    })
    const capped = runOf('F18', rich(2))
    expect(buyTickspeedMultiplier(T(7))(capped)).toBe(capped)
    expect(buyTickspeedMultiplier(T(7))(runOf('F2', rich(2))).tickspeedLevels[T(7)]).toBe(3)
    const dropped = runOf('F18', state => ({ tickspeedLevels: { ...state.tickspeedLevels, [T(6)]: 1, [T(7)]: 4 } }))
    expect(getEffectiveTierTickSpeedSeconds(dropped, T(7))).toBeCloseTo(secondsAt('F2', 7, 1))
  })

  it('F19 Duty Cycle: the Ronnabytes bonus applies only in the on-window', () => {
    const at = seconds => getEffectiveTierTickSpeedSeconds(withChallenge(runOf('F19', state => ({ tickspeedLevels: { ...state.tickspeedLevels, [T(8)]: 5 } })), { activeSeconds: seconds }), T(8))
    expect(at(15)).toBeCloseTo(secondsAt('F2', 8, 5))
    expect(at(45)).toBeCloseTo(secondsAt('F2', 8, 1))
    expect(at(75)).toBeCloseTo(at(15))
  })

  it('F20 Burn Rate: a Quettabytes tickspeed level spends its full requirement', () => {
    const cost = getTickspeedMultiplierCost(T(9), 2)
    const seed = state => ({ resources: { ...state.resources, [T(9)]: cost + 5 }, owned: { ...state.owned, [T(9)]: cost + 5 } })
    expect(buyTickspeedMultiplier(T(9))(runOf('F20', seed)).owned[T(9)]).toBe(5)
    expect(buyTickspeedMultiplier(T(9))(runOf('F2', seed)).owned[T(9)]).toBeGreaterThan(cost / 2)
  })
})
