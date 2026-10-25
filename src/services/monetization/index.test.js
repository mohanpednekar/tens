import { describe, expect, it, vi } from 'vitest'
import { createMonetizationService, getMonetizationService } from 'services/monetization'
import { createNoopMonetizationService } from 'services/monetization/noop'

const fakeAds = (overrides = {}) => ({
  init: vi.fn(async () => {}),
  showRewarded: vi.fn(async () => ({ shown: true, rewarded: true })),
  ...overrides,
})

const fakeIap = (overrides = {}) => ({
  init: vi.fn(async () => {}),
  getEntitlements: vi.fn(async () => ({ removeAds: false })),
  purchase: vi.fn(async () => ({ ok: true, entitlements: { removeAds: true } })),
  restore: vi.fn(async () => ({ ok: true, entitlements: { removeAds: true } })),
  ...overrides,
})

describe('MonetizationService', () => {
  it('is the no-op service in this (flags-off) build', async () => {
    const service = getMonetizationService()
    expect(service.adsAvailable).toBe(false)
    expect(service.iapAvailable).toBe(false)
    expect(await service.showRewarded('any')).toEqual({ shown: false, rewarded: false, reason: 'ads_disabled' })
    expect(await service.purchase('removeAds')).toEqual({ ok: false, reason: 'iap_disabled' })
    expect(await service.restore()).toEqual({ ok: false, reason: 'iap_disabled' })
    expect(await service.getEntitlements()).toEqual({ removeAds: false })
  })

  it('falls back to the no-op service when no adapter loader is given', () => {
    expect(Object.keys(createMonetizationService())).toEqual(Object.keys(createNoopMonetizationService()))
  })

  it('initializes each adapter once and delegates rewarded ads', async () => {
    const ads = fakeAds()
    const loadAds = vi.fn(async () => ads)
    const service = createMonetizationService({ loadAds })
    await Promise.all([service.init(), service.init()])
    expect(loadAds).toHaveBeenCalledTimes(1)
    expect(ads.init).toHaveBeenCalledTimes(1)
    expect(await service.showRewarded('bonus')).toEqual({ shown: true, rewarded: true })
    expect(ads.showRewarded).toHaveBeenCalledWith('bonus')
  })

  it('grants rewards without an ad once remove-ads is owned', async () => {
    const ads = fakeAds()
    const service = createMonetizationService({
      loadAds: async () => ads,
      loadIap: async () => fakeIap({ getEntitlements: async () => ({ removeAds: true }) }),
    })
    expect(await service.showRewarded('bonus')).toEqual({ shown: false, rewarded: true, reason: 'ad_free' })
    expect(ads.showRewarded).not.toHaveBeenCalled()
  })

  it('tracks entitlements returned by purchase and restore', async () => {
    const iap = fakeIap()
    const service = createMonetizationService({ loadIap: async () => iap })
    expect(await service.getEntitlements()).toEqual({ removeAds: false })
    expect(await service.purchase('removeAds')).toMatchObject({ ok: true })
    expect(iap.purchase).toHaveBeenCalledWith('removeAds')
    expect(await service.getEntitlements()).toEqual({ removeAds: true })
    expect(await service.restore()).toMatchObject({ ok: true })
  })

  it('reports unavailable instead of throwing when an adapter fails to load or init', async () => {
    const service = createMonetizationService({
      loadAds: async () => { throw new Error('plugin missing') },
      loadIap: async () => fakeIap({ init: async () => { throw new Error('no api key') } }),
    })
    expect(await service.showRewarded('bonus')).toEqual({ shown: false, rewarded: false, reason: 'ads_unavailable' })
    expect(await service.purchase('removeAds')).toEqual({ ok: false, reason: 'iap_unavailable' })
    expect(await service.restore()).toEqual({ ok: false, reason: 'iap_unavailable' })
  })
})
