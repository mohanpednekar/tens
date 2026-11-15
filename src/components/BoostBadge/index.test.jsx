import { getComputeBoostDescription, isDataStreamBoosted, isFactoryTierBoosted } from 'components/BoostBadge'
import { COMPUTE_BOOST_PRESETS } from 'game/layers'

const multiplier = COMPUTE_BOOST_PRESETS.standard.multiplier
const activeIntro = { computeBoosts: { standard: { queue: [2], remainingSeconds: 90 } } }

describe('BoostBadge helpers', () => {
  it('reports nothing boosted while no boost is active', () => {
    expect(isDataStreamBoosted({})).toBe(false)
    expect(isFactoryTierBoosted({}, 0)).toBe(false)
    expect(getComputeBoostDescription({})).toBeNull()
  })

  it('boosts the Data Stream and only the covered Factory tiers', () => {
    expect(isDataStreamBoosted(activeIntro)).toBe(true)
    expect(isFactoryTierBoosted(activeIntro, 0)).toBe(true)
    expect(isFactoryTierBoosted(activeIntro, 1)).toBe(true)
    expect(isFactoryTierBoosted(activeIntro, 2)).toBe(false)
  })

  it('describes the lanes covering that tier: its own multiplier, whole-lane time left and waiting boosts', () => {
    const intro = { computeBoosts: {
      standard: { queue: [2, 1, 1], remainingSeconds: 90 },
      sustain: { queue: [1], remainingSeconds: 30 },
    } }
    const both = getComputeBoostDescription(intro, 0)
    expect(both).toContain(`Boosted ×${multiplier + COMPUTE_BOOST_PRESETS.sustain.multiplier}`)
    expect(both).toContain('Balanced')
    expect(both).toContain('Eco')
    expect(both).toContain('2 queued')
    // Tier 2 (index 1) is covered only by the tier-2 Balanced head.
    const only = getComputeBoostDescription(intro, 1)
    expect(only).toContain(`Boosted ×${multiplier}`)
    expect(only).not.toContain('Eco')
    expect(getComputeBoostDescription(intro, 2)).toBeNull()
  })
})
