/**
 * MonetizationService contract (services/monetization/index.js returns one of these):
 *
 *   init(): Promise<void>                       — safe to call more than once
 *   showRewarded(placement): Promise<{ shown, rewarded, reason? }>
 *                                               — grant the reward only when `rewarded` is true
 *   purchase(productKey): Promise<{ ok, cancelled?, reason?, entitlements? }>
 *                                               — productKey is a key of IAP_PRODUCTS
 *   restore(): Promise<{ ok, reason?, entitlements? }>
 *   getEntitlements(): Promise<{ removeAds: boolean }>
 *   adsAvailable / iapAvailable: boolean        — whether UI should offer those actions at all
 *
 * The no-op implementation backs web builds and native builds with both flags off.
 */
export const NO_ENTITLEMENTS = Object.freeze({ removeAds: false })

export const createNoopMonetizationService = () => ({
  adsAvailable: false,
  iapAvailable: false,
  init: async () => {},
  showRewarded: async () => ({ shown: false, rewarded: false, reason: 'ads_disabled' }),
  purchase: async () => ({ ok: false, reason: 'iap_disabled' }),
  restore: async () => ({ ok: false, reason: 'iap_disabled' }),
  getEntitlements: async () => NO_ENTITLEMENTS,
})
