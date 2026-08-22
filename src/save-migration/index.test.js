import { describe, expect, it } from 'vitest'
import { SAVE_SCHEMA_VERSION, adaptSaveForCurrentSchema, getSaveIncompatibilityReason } from 'save-migration'

describe('getSaveIncompatibilityReason', () => {
  it('accepts a save stamped with the current schema version', () => {
    expect(getSaveIncompatibilityReason({ saveSchemaVersion: SAVE_SCHEMA_VERSION, resources: { Ones: 5 } }))
      .toBeNull()
  })

  it.each([
    ['legacy_money_id', { resources: { Ones: 1 } }],
    ['missing_intro', { resources: { base: 1 } }],
    ['legacy_intro_gate', { intro: { completed: true } }],
    ['legacy_storage_fields', { intro: { storageBanks: {} } }],
    ['legacy_prestige_xp', { intro: { mainGameUnlocked: true }, prestige: { pp: 1 } }],
    ['legacy_prestige_count', { intro: { mainGameUnlocked: true }, prestige: { level: 2 } }],
    ['legacy_boolean_autobuyers', { intro: { mainGameUnlocked: true }, autobuyers: { tier01: true } }],
    ['legacy_boolean_auto_prestige', { intro: { mainGameUnlocked: true }, autoPrestige: true }],
    ['legacy_tier_ids', { intro: { mainGameUnlocked: true }, owned: { Tens: 1 } }],
  ])('flags %s', (reason, payload) => {
    expect(getSaveIncompatibilityReason(payload)).toBe(reason)
  })
})

describe('adaptSaveForCurrentSchema', () => {
  it('returns current-schema game state stripped of the envelope', () => {
    const result = adaptSaveForCurrentSchema({ saveSchemaVersion: SAVE_SCHEMA_VERSION, intro: { mainGameUnlocked: true } })
    expect(result).toEqual({ ok: true, payload: { intro: { mainGameUnlocked: true } } })
  })

  it('passes through an unstamped partial save that already matches the current shape', () => {
    const partial = { intro: { mainGameUnlocked: true } }
    expect(adaptSaveForCurrentSchema(partial)).toEqual({ ok: true, payload: partial })
  })

  it('returns a reason when it cannot produce a current-compatible save', () => {
    expect(adaptSaveForCurrentSchema({ resources: { Ones: 1 } })).toEqual({ ok: false, reason: 'legacy_money_id' })
  })

  it('passes through saveSchemaVersion 1 for mergeState forward-fill', () => {
    const payload = { intro: { mainGameUnlocked: true }, prestige: { count: 5, points: 0 } }
    expect(adaptSaveForCurrentSchema({ saveSchemaVersion: 1, ...payload })).toEqual({
      ok: true,
      payload,
    })
  })
})
