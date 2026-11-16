import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import {
  applyOfflineProgress, buyTierQuantity, createInitialGameState, enterChallenge, exitChallenge, getActiveChallenge,
  getLiveChallengeForAutomation, isChallengeUnlocked, tickGame,
} from 'game/engine'
import { AUTOMATION_INTERVAL_CONFIG, CHALLENGE_DEFINITIONS, LIVE_CHALLENGE_IDS, MONEY_ID, TIER_DEFINITIONS } from 'game/layers'

// Registry consistency + property tests for challenge mode (#1044). Uses the shipped live set (no clearing).
const everythingUnlocked = () => {
  const base = createInitialGameState()
  return {
    ...base,
    autoGlobalTickspeed: true, autoScaleUp: true, autoXpTickspeed: true, autoOverclock: true, autoPurge: 1,
    purge: { ...base.purge, points: 1e9, count: 4 },
    autobuyers: { ...base.autobuyers, ...Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, base.autobuyers?.[t.id] ?? { enabled: true }])) },
    tierTickspeedAutobuyer: Object.fromEntries(TIER_DEFINITIONS.map(t => [t.id, true])),
    resources: { ...base.resources, [MONEY_ID]: 1e12 },
  }
}

describe('challenge registry consistency', () => {
  it('has unique codes F1–F25 and every challenge targets an existing automation', () => {
    const ids = CHALLENGE_DEFINITIONS.map(def => def.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toEqual(Array.from({ length: 25 }, (_, i) => `F${i + 1}`))
    const tierIds = new Set(TIER_DEFINITIONS.map(t => t.id))
    CHALLENGE_DEFINITIONS.forEach(({ automation: { kind, key } }) => {
      if (kind === 'global') expect(Object.keys(AUTOMATION_INTERVAL_CONFIG)).toContain(key)
      else expect(tierIds.has(key)).toBe(true)
    })
  })

  it('every live challenge gates exactly one upgrade chain and no chain has two challenges', () => {
    const chains = CHALLENGE_DEFINITIONS.map(({ automation: { kind, key } }) => `${kind}:${key}`)
    expect(new Set(chains).size).toBe(chains.length)
    CHALLENGE_DEFINITIONS.filter(def => LIVE_CHALLENGE_IDS.has(def.id)).forEach(def => {
      expect(getLiveChallengeForAutomation(def.automation.kind, def.automation.key)?.id).toBe(def.id)
    })
  })

  it('every challenge is locked on a fresh save and unlocked once its automation is owned', () => {
    const fresh = createInitialGameState()
    const owned = everythingUnlocked()
    CHALLENGE_DEFINITIONS.forEach(def => {
      expect(isChallengeUnlocked(fresh, def.id)).toBe(false)
      expect(isChallengeUnlocked(owned, def.id)).toBe(true)
    })
  })
})

describe('challenge mode (property-based)', () => {
  const action = fc.oneof(
    fc.record({ kind: fc.constant('tick'), dt: fc.double({ min: 0, max: 60, noNaN: true }) }),
    fc.record({ kind: fc.constant('buy'), tier: fc.integer({ min: 0, max: TIER_DEFINITIONS.length - 1 }) }),
    fc.record({ kind: fc.constant('offline'), dt: fc.integer({ min: 1, max: 120 }) }),
  )
  const apply = (state, a) => {
    if (a.kind === 'tick') return tickGame(a.dt)(state)
    if (a.kind === 'offline') return applyOfflineProgress(a.dt)(state)
    return buyTierQuantity(TIER_DEFINITIONS[a.tier].id, 1)(state)
  }

  it.each(CHALLENGE_DEFINITIONS.map(def => [def.id]))('%s: resources never go negative or non-finite across generated sequences', id => {
    fc.assert(fc.property(fc.array(action, { maxLength: 5 }), actions => {
      let state = enterChallenge(id)(everythingUnlocked())
      expect(getActiveChallenge(state)?.id).toBe(id)
      // enterChallenge resets the Factory cycle, so fund the run AFTER entering
      state = { ...state, resources: { ...state.resources, [MONEY_ID]: 1e12 } }
      actions.forEach(a => {
        state = apply(state, a)
        Object.values(state.resources).forEach(v => {
          expect(Number.isFinite(v)).toBe(true)
          expect(v).toBeGreaterThanOrEqual(0)
        })
      })
    }), { numRuns: 200 })
  }, 120000)

  it.each(CHALLENGE_DEFINITIONS.map(def => [def.id]))('%s: invalid enter/exit actions return the same state reference', id => {
    const fresh = createInitialGameState()
    expect(enterChallenge(id)(fresh)).toBe(fresh) // locked
    expect(exitChallenge(fresh)).toBe(fresh) // not in a challenge
    const active = enterChallenge(id)(everythingUnlocked())
    expect(enterChallenge(id)(active)).toBe(active) // already active
    expect(enterChallenge('nope')(active)).toBe(active) // unknown
  })
})
