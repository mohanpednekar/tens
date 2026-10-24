import { loadAdsModule, loadIapModule } from 'virtual:tens-features'
import { NO_ENTITLEMENTS, createNoopMonetizationService } from './noop'

/**
 * Composes the enabled adapters behind the MonetizationService contract (see ./noop.js). Adapters
 * are injected as loaders so tests can exercise the composition without the native plugins.
 * Owning remove-ads turns every rewarded placement into an instant reward (no ad shown) — ads are
 * opt-in and never block content.
 */
export const createMonetizationService = ({ loadAds = null, loadIap = null } = {}) => {
  if (!loadAds && !loadIap) return createNoopMonetizationService()

  let initPromise = null
  let ads = null
  let iap = null
  let entitlements = NO_ENTITLEMENTS

  const init = () => {
    initPromise ??= (async () => {
      const [adsAdapter, iapAdapter] = await Promise.all([
        loadAds ? loadAds().catch(() => null) : null,
        loadIap ? loadIap().catch(() => null) : null,
      ])
      if (iapAdapter) {
        try {
          await iapAdapter.init()
          iap = iapAdapter
          entitlements = await iap.getEntitlements()
        } catch {
          iap = null
        }
      }
      if (adsAdapter) {
        try {
          await adsAdapter.init()
          ads = adsAdapter
        } catch {
          ads = null
        }
      }
    })()
    return initPromise
  }

  const withEntitlements = result => {
    if (result?.entitlements) entitlements = result.entitlements
    return result
  }

  return {
    adsAvailable: Boolean(loadAds),
    iapAvailable: Boolean(loadIap),
    init,
    showRewarded: async placement => {
      await init()
      if (entitlements.removeAds) return { shown: false, rewarded: true, reason: 'ad_free' }
      if (!ads) return { shown: false, rewarded: false, reason: 'ads_unavailable' }
      return ads.showRewarded(placement)
    },
    purchase: async productKey => {
      await init()
      if (!iap) return { ok: false, reason: 'iap_unavailable' }
      return withEntitlements(await iap.purchase(productKey))
    },
    restore: async () => {
      await init()
      if (!iap) return { ok: false, reason: 'iap_unavailable' }
      return withEntitlements(await iap.restore())
    },
    getEntitlements: async () => {
      await init()
      return entitlements
    },
  }
}

let service = null

/** App-wide singleton. Each module loader is null (and its code unbundled) when its flag is off. */
export const getMonetizationService = () => {
  service ??= createMonetizationService({
    loadAds: loadAdsModule && (() => loadAdsModule().then(m => m.createAdMobAdapter())),
    loadIap: loadIapModule && (() => loadIapModule().then(m => m.createRevenueCatAdapter())),
  })
  return service
}
