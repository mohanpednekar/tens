import { AdMob, AdmobConsentStatus, RewardAdPluginEvents } from '@capacitor-community/admob'
import { Capacitor } from '@capacitor/core'
import { getRewardedAdUnit } from 'services/config'
import { createRewardedAdCache } from './rewardedAdCache'

// Loaded only when ADS_ENABLED (services/config.js) — never part of a web bundle.
export const createAdMobAdapter = () => {
  const platform = Capacitor.getPlatform()
  const unit = getRewardedAdUnit(platform)
  // Keeps one rewarded video loaded ahead of time so "▶ 100% speed" plays instantly.
  const cache = createRewardedAdCache(() => AdMob.prepareRewardVideoAd({ adId: unit.adId, isTesting: unit.isTesting }))

  return {
    init: async () => {
      // iOS App Tracking Transparency prompt (NSUserTrackingUsageDescription is only added to
      // Info.plist when ads are enabled — scripts/configure-ios-plist.mjs).
      if (platform === 'ios') {
        const { status } = await AdMob.trackingAuthorizationStatus()
        if (status === 'notDetermined') await AdMob.requestTrackingAuthorization()
      }
      // Google UMP consent (GDPR/US state privacy) before any ad request.
      const consent = await AdMob.requestConsentInfo()
      if (consent.isConsentFormAvailable && consent.status === AdmobConsentStatus.REQUIRED) {
        await AdMob.showConsentForm()
      }
      await AdMob.initialize({ initializeForTesting: unit.isTesting })
      cache.preload().catch(() => {})
    },
    showRewarded: async () => {
      let rewarded = false
      const handles = []
      try {
        await cache.take()
        const done = new Promise(resolve => {
          handles.push(
            AdMob.addListener(RewardAdPluginEvents.Rewarded, () => { rewarded = true }),
            AdMob.addListener(RewardAdPluginEvents.Dismissed, () => resolve('dismissed')),
            AdMob.addListener(RewardAdPluginEvents.FailedToShow, () => resolve('failed_to_show')),
          )
        })
        await AdMob.showRewardVideoAd()
        const outcome = await done
        return { shown: outcome === 'dismissed', rewarded, ...(outcome === 'dismissed' ? {} : { reason: outcome }) }
      } catch {
        return { shown: false, rewarded: false, reason: 'load_failed' }
      } finally {
        await Promise.all(handles.map(async handle => (await handle).remove()))
        // Start loading the next video right away so the following offer is instant too.
        cache.preload().catch(() => {})
      }
    },
  }
}
