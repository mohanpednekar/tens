import { render, screen } from '@testing-library/react'
import BoostBadge, { getComputeBoostDescription, isDataStreamBoosted, isFactoryTierBoosted } from 'components/BoostBadge'
import { COMPUTE_BOOST_PRESETS } from 'game/layers'
import { ThemeProvider } from 'theme'

const activeIntro = { computeBoostType: 'standard', computeBoostTierIndex: 2, computeBoostRemainingSeconds: 90, computeBoostStacks: 1 }
const multiplier = COMPUTE_BOOST_PRESETS.standard.multiplier

describe('BoostBadge helpers', () => {
  it('reports nothing boosted while no boost is active', () => {
    expect(isDataStreamBoosted({ computeBoostType: null })).toBe(false)
    expect(isFactoryTierBoosted({ computeBoostType: null }, 0)).toBe(false)
    expect(getComputeBoostDescription({ computeBoostType: null })).toBeNull()
  })

  it('boosts the Data Stream and only the covered Factory tiers', () => {
    expect(isDataStreamBoosted(activeIntro)).toBe(true)
    expect(isFactoryTierBoosted(activeIntro, 0)).toBe(true)
    expect(isFactoryTierBoosted(activeIntro, 1)).toBe(true)
    expect(isFactoryTierBoosted(activeIntro, 2)).toBe(false)
  })

  it('describes the multiplier, preset, time left and stacks', () => {
    const description = getComputeBoostDescription({ ...activeIntro, computeBoostStacks: 3 })
    expect(description).toContain(`×${multiplier}`)
    expect(description).toContain('Standard Compute Boost')
    expect(description).toContain('left')
    expect(description).toContain('3 stacked')
  })
})

describe('BoostBadge', () => {
  const renderBadge = props => render(<ThemeProvider mode="dark"><BoostBadge {...props} /></ThemeProvider>)

  it('renders the symbol with the full description as its accessible name and tooltip', () => {
    renderBadge({ intro: activeIntro })
    const badge = screen.getByRole('img', { name: /Boosted ×/ })
    expect(badge).toHaveTextContent(`×${multiplier}`)
    expect(badge).toHaveAttribute('title', getComputeBoostDescription(activeIntro))
  })

  it('renders nothing when inactive or not boosted', () => {
    const { container } = renderBadge({ intro: { computeBoostType: null } })
    expect(container).toBeEmptyDOMElement()
    renderBadge({ intro: activeIntro, boosted: false })
    expect(screen.queryByRole('img')).toBeNull()
  })
})
