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
  it('rejects non-plain-object payloads (arrays, class instances, primitives)', () => {
    for (const raw of [[], [{ intro: {} }], new Date(), new Map(), 'save', 42, null]) {
      expect(adaptSaveForCurrentSchema(raw)).toEqual({ ok: false, reason: 'invalid_payload' })
    }
  })

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
    const payload = { intro: { mainGameUnlocked: true }, purge: { count: 5, points: 0 } }
    expect(adaptSaveForCurrentSchema({ saveSchemaVersion: 1, ...payload })).toEqual({
      ok: true,
      payload,
    })
  })

  const expectPurgeShape = payload => {
    expect(payload.purge).toMatchObject({ points: 9, count: 4 })
    expect(payload.autoPurge).toBe(3)
    expect(payload.autoPurgeEnabled).toBe(false)
    expect(payload.autoPurgeAttemptBudget).toBe(0.5)
    expect(payload.automationIntervalLevels).toEqual({ speedUp: 2, purge: 5 })
    expect(payload.automationAttemptBudgets).toEqual({ speedUp: 0.25 })
    expect(payload.prestigeMuseum.history[0]).toEqual({ id: 'x', purgeNumber: 3 })
    for (const key of ['reboot', 'prestige', 'autoReboot', 'autoPrestige', 'autoRebootEnabled', 'autoPrestigeEnabled']) {
      expect(payload).not.toHaveProperty(key)
    }
  }
  const rebootKeyed = {
    reboot: { points: 9, count: 4 },
    autoReboot: 3,
    autoRebootEnabled: false,
    autoRebootAttemptBudget: 0.5,
    automationIntervalLevels: { latency: 2, reboot: 5 },
    automationAttemptBudgets: { latency: 0.25 },
    prestigeMuseum: { history: [{ id: 'x', rebootNumber: 3 }] },
  }
  const prestigeKeyed = {
    prestige: { points: 9, count: 4, xp: 0 },
    autoPrestige: 3,
    autoPrestigeEnabled: false,
    autoPrestigeAttemptBudget: 0.5,
    automationIntervalLevels: { latency: 2, prestige: 5 },
    automationAttemptBudgets: { latency: 0.25 },
    prestigeMuseum: { history: [{ id: 'x', prestigeNumber: 3 }] },
  }

  it.each([
    ['v1', { saveSchemaVersion: 1, ...rebootKeyed }],
    ['v2', { saveSchemaVersion: 2, ...rebootKeyed }],
    ['unstamped reboot-keyed', { intro: { mainGameUnlocked: true }, ...rebootKeyed }],
    ['unstamped pre-Reboot prestige-keyed', { intro: { mainGameUnlocked: true }, ...prestigeKeyed }],
  ])('migrates a %s save to purge-named keys', (_label, raw) => {
    const result = adaptSaveForCurrentSchema(raw)
    expect(result.ok).toBe(true)
    expect(result.payload).not.toHaveProperty('saveSchemaVersion')
    expectPurgeShape(result.payload)
  })

  it('leaves a v3 save untouched apart from stripping the envelope', () => {
    const payload = { purge: { points: 1, count: 2 }, automationIntervalLevels: { purge: 1 } }
    expect(adaptSaveForCurrentSchema({ saveSchemaVersion: 3, ...payload })).toEqual({ ok: true, payload })
  })

  it('keeps an existing purge key when a legacy key is also present', () => {
    const { payload } = adaptSaveForCurrentSchema({ saveSchemaVersion: 2, purge: { points: 1 }, reboot: { points: 99 } })
    expect(payload.purge).toEqual({ points: 1 })
    expect(payload).not.toHaveProperty('reboot')
  })
})
