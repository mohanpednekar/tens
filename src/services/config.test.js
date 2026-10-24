import { describe, expect, it } from 'vitest'
import {
  ADMOB_TEST_REWARDED_IDS,
  ADS_ENABLED,
  CLOUD_SAVE_ENABLED,
  IAP_ENABLED,
  IAP_PRODUCTS,
  IS_NATIVE_BUILD,
  PRIVACY_POLICY_URL,
  TERMS_URL,
  getRewardedAdUnit,
} from 'services/config'

describe('services/config', () => {
  it('ships every optional feature off by default', () => {
    expect(IS_NATIVE_BUILD).toBe(false)
    expect(ADS_ENABLED).toBe(false)
    expect(IAP_ENABLED).toBe(false)
    expect(CLOUD_SAVE_ENABLED).toBe(false)
  })

  it('uses Google test rewarded units in dev or when no real id is configured', () => {
    const ids = { android: 'ca-app-pub-real/1', ios: undefined }
    expect(getRewardedAdUnit('android', { dev: true, ids })).toEqual({ adId: ADMOB_TEST_REWARDED_IDS.android, isTesting: true })
    expect(getRewardedAdUnit('ios', { dev: false, ids })).toEqual({ adId: ADMOB_TEST_REWARDED_IDS.ios, isTesting: true })
    expect(getRewardedAdUnit('android', { dev: false, ids })).toEqual({ adId: 'ca-app-pub-real/1', isTesting: false })
  })

  it('defines a non-consumable remove-ads product and a consumable placeholder', () => {
    expect(IAP_PRODUCTS.removeAds).toEqual({ id: 'tens_remove_ads', type: 'non_consumable' })
    expect(IAP_PRODUCTS.supportTip).toEqual({ id: 'tens_support_tip', type: 'consumable' })
  })

  it('points the policy links at the GitHub Pages copies', () => {
    expect(PRIVACY_POLICY_URL).toBe('https://mohanpednekar.github.io/tens/privacy.html')
    expect(TERMS_URL).toBe('https://mohanpednekar.github.io/tens/terms.html')
  })
})
