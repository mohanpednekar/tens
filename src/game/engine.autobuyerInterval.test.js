import { buyAutobuyerIntervalUpgrade, createInitialGameState, getAutobuyerIntervalMaxLevel, getAutobuyerIntervalSeconds, getAutobuyerIntervalUpgradeCost, tickGame } from './engine'

const withPp = (points, autobuyer = 1) => {
  const s = createInitialGameState()
  return { ...s, prestige: { ...s.prestige, points }, autobuyers: { ...s.autobuyers, tier01: autobuyer } }
}

describe('autobuyer interval upgrade', () => {
  it('costs 1 PP doubling on the 125-based ladder', () => {
    expect([0, 1, 2, 6, 7, 8, 9, 10, 11].map(getAutobuyerIntervalUpgradeCost)).toEqual([1, 2, 4, 64, 125, 250, 500, 1000, 2000])
  })

  it('multiplies the interval by 0.9 per level and caps at 10ms', () => {
    let s = withPp(1e30)
    s = buyAutobuyerIntervalUpgrade('tier01')(s)
    expect(s.prestige.points).toBe(1e30 - 1)
    expect(getAutobuyerIntervalSeconds(s, 'tier01')).toBeCloseTo(0.9)
    for (let i = 0; i < 60; i++) s = buyAutobuyerIntervalUpgrade('tier01')(s)
    expect(s.autobuyerIntervalLevels.tier01).toBe(getAutobuyerIntervalMaxLevel())
    expect(getAutobuyerIntervalSeconds(s, 'tier01')).toBe(0.01)
  })

  it('is a no-op without PP or without the autobuyer unlocked', () => {
    const poor = withPp(0)
    expect(buyAutobuyerIntervalUpgrade('tier01')(poor)).toBe(poor)
    const locked = withPp(10, null)
    expect(buyAutobuyerIntervalUpgrade('tier01')(locked)).toBe(locked)
  })

  it('banks attempts faster at a shorter interval', () => {
    const base = withPp(0)
    const fast = { ...base, autobuyerIntervalLevels: { ...base.autobuyerIntervalLevels, tier01: getAutobuyerIntervalMaxLevel() } }
    const a = tickGame(0.1)(base)
    const b = tickGame(0.1)(fast)
    expect(b.owned.tier01 + b.autobuyerAttemptBudgets.tier01).toBeGreaterThanOrEqual(a.owned.tier01 + a.autobuyerAttemptBudgets.tier01)
  })
})
