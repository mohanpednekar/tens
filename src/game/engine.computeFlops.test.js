import {
  buyAutoSpeedUp,
  buyComputeFlopsTier,
  createInitialGameState,
  getComputeFlopsTotal,
  getComputeFlopsTierProductionMultiplier,
  isComputeFlopsPageRevealed,
  latchComputeFlopsPageUnlocked,
  prestigeGame,
  speedUpGame,
  tickComputeFlops,
  tickGame,
} from './engine'
import { AUTO_SPEED_UP_COST, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP, PRESTIGE_THRESHOLD, TICK_RATE_MS } from './layers'

const elapsed = TICK_RATE_MS / 1000

describe('Compute Flops screen', () => {
  it('is hidden below COMPUTE_FLOPS_REVEAL_PP and latches once revealed', () => {
    let state = createInitialGameState()
    state = { ...state, prestige: { ...state.prestige, points: COMPUTE_FLOPS_REVEAL_PP - 1 } }
    expect(isComputeFlopsPageRevealed(state)).toBe(false)
    state = { ...state, prestige: { ...state.prestige, points: COMPUTE_FLOPS_REVEAL_PP } }
    expect(isComputeFlopsPageRevealed(state)).toBe(true)
    const latched = latchComputeFlopsPageUnlocked(state)
    expect(latched.computeFlops.pageUnlocked).toBe(true)
  })

  it('cannot buy KFlops below COMPUTE_FLOPS_FIRST_TIER_COST_PP even when revealed', () => {
    let state = createInitialGameState()
    state = latchComputeFlopsPageUnlocked({
      ...state,
      prestige: { ...state.prestige, points: COMPUTE_FLOPS_REVEAL_PP },
    })
    expect(buyComputeFlopsTier('flop01')(state)).toBe(state)
    state = {
      ...state,
      prestige: { ...state.prestige, points: COMPUTE_FLOPS_FIRST_TIER_COST_PP },
    }
    const after = buyComputeFlopsTier('flop01')(state)
    expect(after).not.toBe(state)
    expect(after.computeFlops.owned.flop01).toBe(1)
    expect(after.prestige.points).toBe(0)
  })

  it('accumulates Flops boost linearly with owned count and elapsed time', () => {
    let state = createInitialGameState()
    state = buyComputeFlopsTier('flop01')({
      ...state,
      prestige: { ...state.prestige, points: COMPUTE_FLOPS_FIRST_TIER_COST_PP },
    })
    state = tickComputeFlops(10)(state)
    const expected = COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC * 10
    expect(state.computeFlops.cumulativeBoost.tier01).toBeCloseTo(expected, 10)
    expect(getComputeFlopsTotal(state)).toBeCloseTo(expected, 10)
    expect(getComputeFlopsTierProductionMultiplier(state, 'tier01')).toBeCloseTo(1 + expected, 10)
  })

  it('applies Flops boost to tier production in tickGame', () => {
    const base = {
      ...createInitialGameState(),
      owned: { ...createInitialGameState().owned, tier01: 100 },
      resources: { ...createInitialGameState().resources, base: 1e6 },
    }
    const bought = buyComputeFlopsTier('flop01')({
      ...base,
      prestige: { ...base.prestige, points: COMPUTE_FLOPS_FIRST_TIER_COST_PP },
    })
    const withFlop = {
      ...bought,
      computeFlops: {
        ...bought.computeFlops,
        cumulativeBoost: { ...bought.computeFlops.cumulativeBoost, tier01: 1 },
      },
    }
    const withoutFlop = { ...base, prestige: { ...base.prestige, points: 0 } }
    const afterWith = tickGame(1)(withFlop)
    const afterWithout = tickGame(1)(withoutFlop)
    expect(afterWith.resources.base).toBeGreaterThan(afterWithout.resources.base)
  })

  it('carries owned Flops tiers across prestige but resets cumulative boost', () => {
    let state = createInitialGameState()
    state = buyComputeFlopsTier('flop01')({
      ...state,
      prestige: { ...state.prestige, points: COMPUTE_FLOPS_FIRST_TIER_COST_PP },
    })
    state = tickComputeFlops(5)(state)
    state = {
      ...state,
      resources: { ...state.resources, base: PRESTIGE_THRESHOLD },
    }
    const after = prestigeGame(state)
    expect(after.computeFlops.owned.flop01).toBe(1)
    expect(after.computeFlops.cumulativeBoost.tier01).toBe(0)
    expect(getComputeFlopsTotal(after)).toBe(0)
  })

  it('speedUpGame preserves owned Flops units and resets cumulativeBoost', () => {
    let state = buyComputeFlopsTier('flop01')({
      ...createInitialGameState(),
      prestige: { xp: 0, points: COMPUTE_FLOPS_FIRST_TIER_COST_PP, count: 1, highestMilestone: 1 },
    })
    state = tickComputeFlops(5)(state)
    state = {
      ...state,
      purchaseLevels: {
        ...state.purchaseLevels,
        tier10: 10,
      },
      speedUpCount: 0,
    }
    const after = speedUpGame(state)
    expect(after).not.toBe(state)
    expect(after.computeFlops.owned.flop01).toBe(1)
    expect(after.computeFlops.cumulativeBoost.tier01).toBe(0)
  })

  it('buyAutoSpeedUp latches pageUnlocked so reveal survives spending below reveal PP', () => {
    let state = {
      ...createInitialGameState(),
      prestige: { xp: 0, points: COMPUTE_FLOPS_REVEAL_PP, count: 1, highestMilestone: 1 },
    }
    expect(isComputeFlopsPageRevealed(state)).toBe(true)
    expect(state.computeFlops.pageUnlocked).toBe(false)
    state = buyAutoSpeedUp(state)
    expect(state.computeFlops.pageUnlocked).toBe(true)
    expect(isComputeFlopsPageRevealed(state)).toBe(true)
    expect(state.prestige.points).toBe(COMPUTE_FLOPS_REVEAL_PP - AUTO_SPEED_UP_COST)
  })
})
