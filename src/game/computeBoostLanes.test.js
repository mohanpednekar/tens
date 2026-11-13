import { describe, expect, it } from 'vitest'
import {
  activateComputeBoost,
  canForfeitComputeBoost,
  canReclaimComputeBoost,
  createInitialGameState,
  forfeitComputeBoost,
  getComputeBoostLanes,
  getComputeBoostMultiplier,
  getComputeBoostPoolMultiplier,
  getFactoryTierBoostMultiplier,
  reclaimComputeBoost,
  stackComputeBoost,
  tickComputeBoost,
} from 'game/engine'
import { COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS } from 'game/layers'

const P = COMPUTE_BOOST_PRESETS
const withIntro = (overrides = {}) => {
  const base = createInitialGameState()
  return { ...base, intro: { ...base.intro, ...overrides } }
}
const run = (state, ...steps) => steps.reduce((s, step) => step(s), state)

describe('Compute Boost lanes', () => {
  it('different multipliers run in parallel and their multipliers add up', () => {
    const state = run(
      withIntro({ computeCores: 2, computeNodes: 1 }),
      activateComputeBoost('burst', 1),
      activateComputeBoost('standard', 2),
    )
    expect(getComputeBoostLanes(state.intro).map(l => l.type)).toEqual(['burst', 'standard'])
    expect(state.intro.computeCores).toBe(1)
    expect(state.intro.computeNodes).toBe(0)
    expect(getComputeBoostMultiplier(state.intro)).toBe(P.burst.multiplier + P.standard.multiplier)
    // Tier 1 is covered by both lanes, tier 2 only by the tier-2 Balanced boost, tier 3 by none.
    expect(getFactoryTierBoostMultiplier(state.intro, 1)).toBe(P.burst.multiplier + P.standard.multiplier)
    expect(getFactoryTierBoostMultiplier(state.intro, 2)).toBe(P.standard.multiplier)
    expect(getFactoryTierBoostMultiplier(state.intro, 3)).toBe(1)
    expect(getComputeBoostPoolMultiplier(state.intro, 1)).toBe(1 + (P.burst.poolBonusPercent + P.standard.poolBonusPercent) / 100)
    expect(getComputeBoostPoolMultiplier(state.intro, 2)).toBe(1 + P.standard.poolBonusPercent / 100)
  })

  it('same multiplier queues behind the running boost in descending strength, never preempting it', () => {
    const state = run(
      withIntro({ computeCores: 3, computeNodes: 1, computeClusters: 1, computeNetworks: 1 }),
      activateComputeBoost('burst', 1), // running head
      activateComputeBoost('burst', 2),
      activateComputeBoost('burst', 4),
      activateComputeBoost('burst', 1),
      activateComputeBoost('burst', 3),
    )
    const [lane] = getComputeBoostLanes(state.intro)
    expect(lane.queue).toEqual([1, 4, 3, 2, 1])
    expect(lane.remainingSeconds).toBe(P.burst.durationSeconds)
    // Only the running head (tier 1) counts for coverage until it finishes.
    expect(getFactoryTierBoostMultiplier(state.intro, 2)).toBe(1)
  })

  it('hands over to the next queued boost (carrying overshoot) and clears when the lane is empty', () => {
    const d = P.burst.durationSeconds
    const state = run(
      withIntro({ computeCores: 1, computeNodes: 1 }),
      activateComputeBoost('burst', 1),
      activateComputeBoost('burst', 2),
    )
    const mid = tickComputeBoost(d + 10)(state)
    const [lane] = getComputeBoostLanes(mid.intro)
    expect(lane.queue).toEqual([2])
    expect(lane.remainingSeconds).toBe(d - 10)
    expect(getFactoryTierBoostMultiplier(mid.intro, 2)).toBe(P.burst.multiplier)
    expect(getComputeBoostLanes(tickComputeBoost(d)(mid).intro)).toEqual([])
  })

  it('lanes tick independently', () => {
    const state = run(
      withIntro({ computeCores: 2 }),
      activateComputeBoost('burst', 1),
      activateComputeBoost('sustain', 1),
    )
    const after = tickComputeBoost(P.burst.durationSeconds)(state)
    expect(getComputeBoostLanes(after.intro).map(l => l.type)).toEqual(['sustain'])
    expect(tickComputeBoost(1)(withIntro())).toEqual(withIntro())
  })

  it('caps a lane at COMPUTE_BOOST_MAX_STACKS and no-ops without a token', () => {
    let state = withIntro({ computeCores: COMPUTE_BOOST_MAX_STACKS + 2 })
    for (let i = 0; i < COMPUTE_BOOST_MAX_STACKS + 2; i += 1) state = activateComputeBoost('standard', 1)(state)
    expect(getComputeBoostLanes(state.intro)[0].queue).toHaveLength(COMPUTE_BOOST_MAX_STACKS)
    expect(state.intro.computeCores).toBe(2)
    const empty = withIntro({ computeCores: 0 })
    expect(activateComputeBoost('burst', 1)(empty)).toBe(empty)
  })

  it('stack queues another boost of the running head tier', () => {
    const state = run(withIntro({ computeNodes: 2 }), activateComputeBoost('burst', 2), stackComputeBoost('burst'))
    expect(getComputeBoostLanes(state.intro)[0].queue).toEqual([2, 2])
    expect(state.intro.computeNodes).toBe(0)
    expect(stackComputeBoost('standard')(state)).toBe(state)
  })

  it('pop refunds the weakest queued boost; forfeit only once nothing is queued, per lane', () => {
    const state = run(
      withIntro({ computeCores: 3, computeNodes: 1 }),
      activateComputeBoost('burst', 1),
      activateComputeBoost('burst', 1),
      activateComputeBoost('burst', 2),
      activateComputeBoost('standard', 1),
    )
    expect(getComputeBoostLanes(state.intro).find(l => l.type === 'burst').queue).toEqual([1, 2, 1])
    expect(canForfeitComputeBoost(state, 'burst')).toBe(false)
    expect(canForfeitComputeBoost(state, 'standard')).toBe(true)

    const popped = reclaimComputeBoost('burst')(state)
    expect(getComputeBoostLanes(popped.intro).find(l => l.type === 'burst').queue).toEqual([1, 2])
    expect(popped.intro.computeCores).toBe(state.intro.computeCores + 1)
    const popped2 = reclaimComputeBoost('burst')(popped)
    expect(popped2.intro.computeNodes).toBe(popped.intro.computeNodes + 1)
    expect(canReclaimComputeBoost(popped2, 'burst')).toBe(false)
    expect(reclaimComputeBoost('burst')(popped2)).toBe(popped2)

    const forfeited = forfeitComputeBoost('burst')(popped2)
    expect(getComputeBoostLanes(forfeited.intro).map(l => l.type)).toEqual(['standard'])
    expect(forfeitComputeBoost('burst')(forfeited)).toBe(forfeited)
    expect(forfeitComputeBoost('standard')(state)).not.toBe(state)
  })

  it('reads a pre-lane save (type/tier/stacks/pooled timer) as one lane and replaces it on the next write', () => {
    const d = P.standard.durationSeconds
    const legacy = withIntro({
      computeBoostType: 'standard', computeBoostTierIndex: 2, computeBoostStacks: 3, computeBoostRemainingSeconds: 2.5 * d,
      computeCores: 1,
    })
    const [lane] = getComputeBoostLanes(legacy.intro)
    expect(lane).toEqual({ type: 'standard', queue: [2, 2, 2], remainingSeconds: 0.5 * d })
    const next = activateComputeBoost('burst', 1)(legacy)
    expect(next.intro.computeBoostType).toBeUndefined()
    expect(Object.keys(next.intro.computeBoosts).sort()).toEqual(['burst', 'standard'])
  })
})
