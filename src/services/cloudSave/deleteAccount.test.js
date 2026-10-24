import { describe, expect, it, vi } from 'vitest'
import { deleteAccountAndData } from 'services/cloudSave/deleteAccount'
import { describeCloudError, loadCloudSave } from 'services/cloudSave'

const steps = () => {
  const calls = []
  const step = name => vi.fn(async () => { calls.push(name) })
  return { calls, reauthenticate: step('reauthenticate'), deleteSaveData: step('delete_data'), deleteAuthUser: step('delete_user') }
}

describe('deleteAccountAndData', () => {
  it('re-authenticates, deletes the cloud save, then the user — in that order', async () => {
    const s = steps()
    expect(await deleteAccountAndData(s)).toEqual({ ok: true })
    expect(s.calls).toEqual(['reauthenticate', 'delete_data', 'delete_user'])
  })

  it.each([
    ['reauthenticate', 'auth/invalid-credential', ['reauthenticate']],
    ['deleteSaveData', 'permission-denied', ['reauthenticate', 'delete_data']],
    ['deleteAuthUser', 'auth/network-request-failed', ['reauthenticate', 'delete_data', 'delete_user']],
  ])('stops when %s fails and reports the step', async (failing, code, expectedCalls) => {
    const s = steps()
    const original = s[failing]
    s[failing] = vi.fn(async () => {
      await original()
      throw Object.assign(new Error('boom'), { code })
    })
    const result = await deleteAccountAndData(s)
    expect(result).toEqual({ ok: false, step: { reauthenticate: 'reauthenticate', deleteSaveData: 'delete_data', deleteAuthUser: 'delete_user' }[failing], code })
    expect(s.calls).toEqual(expectedCalls)
  })
})

describe('cloud save loader', () => {
  it('resolves null without loading Firebase when no Firebase config is built in', async () => {
    expect(await loadCloudSave()).toBeNull()
  })

  it('maps Firebase error codes to player-facing text', () => {
    expect(describeCloudError('auth/invalid-credential')).toMatch(/incorrect/)
    expect(describeCloudError('something/else')).toMatch(/try again/)
  })
})
