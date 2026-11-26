import { describe, expect, it } from 'vitest'
import { createInitialGameState } from 'game/engine'
import { getLifetimePurgeCount, getProductionBonusFactors, getStatsOverview, getStatsSections } from 'game/stats'

const ids = state => getStatsSections(state).map(section => section.id)
const stat = (state, sectionId, statId) => getStatsSections(state).find(s => s.id === sectionId)?.stats.find(s => s.id === statId)

describe('getStatsSections', () => {
  it('shows only Time, Foundry and Bonuses on a fresh save', () => {
    expect(ids(createInitialGameState())).toEqual(['time', 'foundry', 'bonuses'])
  })

  it('reveals each layer once it has been reached', () => {
    const base = createInitialGameState()
    const state = {
      ...base,
      intro: { ...base.intro, mainGameUnlocked: true },
      purge: { ...base.purge, count: 3, points: 12, highestAward: 5 },
      era: { count: 1 },
      eons: { balance: 2 },
      computeFlops: { ...base.computeFlops, pageUnlocked: true },
    }
    expect(ids(state)).toEqual(['time', 'factory', 'foundry', 'purge', 'compute', 'reboot', 'challenges', 'bonuses'])
    expect(stat(state, 'purge', 'points').value).toBe('12 PP')
    expect(stat(state, 'purge', 'best').value).toBe('5 PP')
    expect(stat(state, 'reboot', 'kernelsEarned').value).toBe('2')
  })

  it('counts reached tiers, completed levels and the top tier', () => {
    const base = createInitialGameState()
    const state = {
      ...base,
      intro: { ...base.intro, mainGameUnlocked: true },
      owned: { ...base.owned, tier01: 5, tier02: 1 },
      purchaseLevels: { ...base.purchaseLevels, tier01: 4, tier02: 2 },
    }
    expect(stat(state, 'factory', 'tiers')).toMatchObject({ value: '2/10', progress: 0.2 })
    expect(stat(state, 'factory', 'levels').value).toBe('4')
    expect(stat(state, 'factory', 'highestTier').value).toBe('Megabytes')
  })

  it('tallies Daily wins and attempts across dates', () => {
    const base = createInitialGameState()
    const state = {
      ...base,
      purge: { ...base.purge, count: 1 },
      daily: { runs: {}, results: { d1: { short: { won: true, attempts: 2 } }, d2: { long: { won: false, attempts: 1 } } } },
    }
    expect(stat(state, 'challenges', 'dailyWins').value).toBe('1')
    expect(stat(state, 'challenges', 'dailyAttempts').value).toBe('3')
  })

  it('keeps every progress value within 0..1', () => {
    const base = createInitialGameState()
    const state = { ...base, intro: { ...base.intro, mainGameUnlocked: true }, resources: { ...base.resources, base: 1e300 } }
    getStatsSections(state).flatMap(s => s.stats).filter(s => s.progress !== undefined)
      .forEach(s => {
        expect(s.progress).toBeGreaterThanOrEqual(0)
        expect(s.progress).toBeLessThanOrEqual(1)
      })
  })
})

describe('getStatsOverview / factors', () => {
  it('uses the larger of the lifetime counter and purge.count', () => {
    const base = createInitialGameState()
    expect(getLifetimePurgeCount({ ...base, purge: { ...base.purge, count: 2 }, achievements: { earned: {}, counters: { purges: 7 } } })).toBe(7)
  })

  it('multiplies the global production factors', () => {
    const base = createInitialGameState()
    const state = { ...base, achievements: { earned: { helloWorld: true }, counters: { pings: 0 } } }
    const factors = getProductionBonusFactors(state)
    expect(factors.total).toBeCloseTo(factors.purge * factors.playtime * factors.stars)
    expect(getStatsOverview(state).map(t => t.id)).toEqual(['playTime', 'purges', 'stars', 'bonus'])
  })
})
