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

  it('describes every running lane: multiplier, preset, time left and queue', () => {
    const intro = { computeBoosts: {
      standard: { queue: [2, 1, 1], remainingSeconds: 90 },
      sustain: { queue: [1], remainingSeconds: 30 },
    } }
    const description = getComputeBoostDescription(intro)
    expect(description).toContain(`×${multiplier + COMPUTE_BOOST_PRESETS.sustain.multiplier}`)
    expect(description).toContain('Balanced')
    expect(description).toContain('Eco')
    expect(description).toContain('left')
    expect(description).toContain('3 queued')
  })
})
