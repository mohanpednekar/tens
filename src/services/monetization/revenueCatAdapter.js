import { Capacitor } from '@capacitor/core'
import { PRODUCT_CATEGORY, PURCHASES_ERROR_CODE, Purchases } from '@revenuecat/purchases-capacitor'
import { IAP_PRODUCTS, REMOVE_ADS_ENTITLEMENT, REVENUECAT_API_KEYS } from 'services/config'

// Loaded only when IAP_ENABLED (services/config.js) — never part of a web bundle. RevenueCat's
// Android SDK (purchases-capacitor 13.x) uses Play Billing Library 8; android/app/build.gradle
// fails the release build if an older billing client ever resolves.
export const toEntitlements = customerInfo => ({
  removeAds: Boolean(customerInfo?.entitlements?.active?.[REMOVE_ADS_ENTITLEMENT]),
})

export const createRevenueCatAdapter = () => {
  const apiKey = REVENUECAT_API_KEYS[Capacitor.getPlatform()]

  return {
    init: async () => {
      if (!apiKey) throw new Error('RevenueCat API key missing for this platform')
      await Purchases.configure({ apiKey })
    },
    getEntitlements: async () => toEntitlements((await Purchases.getCustomerInfo()).customerInfo),
    purchase: async productKey => {
      const product = IAP_PRODUCTS[productKey]
      if (!product) return { ok: false, reason: 'unknown_product' }
      try {
        const { products } = await Purchases.getProducts({
          productIdentifiers: [product.id],
          type: PRODUCT_CATEGORY.NON_SUBSCRIPTION,
        })
        if (!products.length) return { ok: false, reason: 'product_not_found' }
        const { customerInfo } = await Purchases.purchaseStoreProduct({ product: products[0] })
        return { ok: true, entitlements: toEntitlements(customerInfo) }
      } catch (error) {
        if (error?.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR || error?.userCancelled) {
          return { ok: false, cancelled: true }
        }
        return { ok: false, reason: 'purchase_failed' }
      }
    },
    restore: async () => {
      try {
        const { customerInfo } = await Purchases.restorePurchases()
        return { ok: true, entitlements: toEntitlements(customerInfo) }
      } catch {
        return { ok: false, reason: 'restore_failed' }
      }
    },
  }
}
