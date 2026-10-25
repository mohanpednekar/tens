// Capacitor config (#70). A .js config (rather than JSON) so native monetization plugins are only
// compiled into the Android/iOS binaries when their flag is on: with TENS ADS/IAP flags off (the
// default), `cap sync` leaves the AdMob and RevenueCat native SDKs out entirely — no AD_ID or
// BILLING permission, no ad SDK privacy manifest. The same VITE_TENS_* env vars drive the JS side
// (viteConfigFactory.js resolveFeatureFlags → services/config.js), so one switch controls both halves. See docs/RELEASE_ANDROID.md.
export const ADS_PLUGIN = '@capacitor-community/admob'
export const IAP_PLUGIN = '@revenuecat/purchases-capacitor'
export const BASE_PLUGINS = ['@capacitor/splash-screen']

export const buildIncludePlugins = (env = process.env) => [
  ...BASE_PLUGINS,
  ...(env.VITE_TENS_ADS_ENABLED === 'true' ? [ADS_PLUGIN] : []),
  ...(env.VITE_TENS_IAP_ENABLED === 'true' ? [IAP_PLUGIN] : []),
]

const config = {
  appId: 'com.mohanpednekar.tens',
  appName: 'Tens',
  webDir: 'dist',
  includePlugins: buildIncludePlugins(),
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SystemBars: {
      // Android 15+ forces edge-to-edge; the WebView honors viewport-fit=cover and the app's CSS
      // pads with env(safe-area-inset-*) (GlobalStyle, AppNav, overlays).
      insetsHandling: 'native',
      initialViewportFitValueHint: 'cover',
    },
    SplashScreen: {
      // Hidden as soon as React mounts (services/nativeShell.js); auto-hide is only a fallback.
      launchAutoHide: true,
      launchShowDuration: 3000,
      backgroundColor: '#0c0d11',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
  },
  experimental: {
    ios: {
      spm: {
        swiftToolsVersion: '6.0',
      },
    },
  },
}

export default config
// The Capacitor CLI loads this file with require(); Node's require(esm) returns the
// 'module.exports' export when present, so the CLI sees the plain config object.
export { config as 'module.exports' }
