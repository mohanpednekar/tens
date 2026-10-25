import { describe, expect, it, vi } from 'vitest'
import { createRewardedAdCache } from 'services/monetization/rewardedAdCache'

describe('createRewardedAdCache', () => {
  it('loads once ahead of time and reuses that ad for the next show', async () => {
    const load = vi.fn(async () => {})
    const cache = createRewardedAdCache(load)
    await cache.preload()
    await cache.preload()
    await cache.take()
    expect(load).toHaveBeenCalledTimes(1)
  })

  it('loads a fresh ad after one is consumed', async () => {
    const load = vi.fn(async () => {})
    const cache = createRewardedAdCache(load)
    await cache.take()
    await cache.preload()
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('reloads an ad older than its max age', async () => {
    let t = 0
    const load = vi.fn(async () => {})
    const cache = createRewardedAdCache(load, { now: () => t, maxAgeMs: 1000 })
    await cache.preload()
    t = 1500
    await cache.take()
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('retries after a failed load', async () => {
    const load = vi.fn().mockRejectedValueOnce(new Error('no fill')).mockResolvedValue()
    const cache = createRewardedAdCache(load)
    await expect(cache.preload()).rejects.toThrow('no fill')
    await cache.take()
    expect(load).toHaveBeenCalledTimes(2)
  })
})
