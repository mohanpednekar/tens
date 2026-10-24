import { loadSplashScreenModule } from 'virtual:tens-features'
import { getMonetizationService } from 'services/monetization'

/**
 * Native (Capacitor) start-up work, run once after the first React render. A no-op — and absent
 * from the bundle — in the GitHub Pages web build.
 */
export const initNativeShell = () => {
  if (!loadSplashScreenModule) return
  loadSplashScreenModule().then(({ SplashScreen }) => SplashScreen.hide()).catch(() => {})
  // Gathers ad consent (UMP / ATT) and RevenueCat entitlements up front when those flags are on.
  getMonetizationService().init().catch(() => {})
}
