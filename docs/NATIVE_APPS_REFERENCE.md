# Native apps (Capacitor) reference

Moved verbatim from `CLAUDE.md` (cost hygiene). `CLAUDE.md` keeps a short summary; this file is the full detail.

## Native apps (Capacitor — #70)

Android and iOS apps wrap the same web build via Capacitor 8 (not yet store-signed):

- `@capacitor/core`/`android`/`ios` + `@capacitor/cli`; `capacitor.config.js` names the app **Tens**
  (`appId: com.mohanpednekar.tens`, `webDir: dist`). It is ESM loaded by the CLI via `require(esm)`
  (`export { config as 'module.exports' }`); `includePlugins` syncs `@capacitor/splash-screen` always
  and AdMob / RevenueCat only when `VITE_TENS_ADS_ENABLED` / `VITE_TENS_IAP_ENABLED` are `true` in
  the shell env, so flags-off binaries carry no ad/billing SDK or permission. `android/` (Gradle) and `ios/` (Xcode project,
  Swift Package Manager — no CocoaPods) are committed; regenerate only via `npx cap add`, never by hand.
- Minimum OS = oldest still receiving security updates (maintainer policy; no older OS support):
  Android 14 (`minSdkVersion = 34`, `android/variables.gradle`) and iOS 18
  (`IPHONEOS_DEPLOYMENT_TARGET`, which `cap sync` also writes into `CapApp-SPM/Package.swift`; `.v18`
  needs `experimental.ios.spm.swiftToolsVersion: "6.0"` in `capacitor.config.js`). Raise both as
  vendors drop security support.
- `yarn build:capacitor` sets `CAPACITOR=1` so Vite uses `base: './'` and omits `VitePWA` — a
  Workbox SW under Capacitor's origin is redundant/harmful; `yarn build` for Pages is unchanged.
  Then `cap sync` (or `yarn cap:android`/`yarn cap:ios`) copies `dist/` into both projects.
- Native icons/splash come from `yarn gen-pwa-icons` (see `docs/PWA_REFERENCE.md`). Splash hides on
  React mount (`services/nativeShell.js`); edge-to-edge via `SystemBars.insetsHandling: 'native'` +
  `viewport-fit=cover` + per-page `env(safe-area-inset-*)` padding.
- **Release:** compile/target SDK 36; `android/app/build.gradle` signs release from
  `TENS_UPLOAD_*` Gradle props/env/`android/keystore.properties` (gitignored; release tasks fail if
  unset), runs R8 (`minifyEnabled` + `shrinkResources`), derives versionName/versionCode from
  `package.json`, and fails if Play Billing < 8 resolves. Manifest declares only `INTERNET`.
  Full steps: `docs/RELEASE_ANDROID.md`, `docs/RELEASE_IOS.md`, `docs/STORE_LISTING.md`.
- **Optional features (all off by default):** `viteConfigFactory.js`'s `resolveFeatureFlags` +
  `virtual:tens-features` module export the flags and one loader per feature — `null` when off, so
  ad/IAP/Firebase code is never bundled (web builds can never enable ads/IAP). Cloud save turns on
  when `VITE_FIREBASE_API_KEY`/`_PROJECT_ID`/`_APP_ID` are set. See `docs/DESIGN_HISTORY.md`.
- `.github/workflows/mobile-build.yml` builds an unsigned debug APK, a throwaway-key-signed minified
  release (AAB + emulator boot check via `scripts/android-boot-smoke.sh`) and an iOS Simulator `.app`
  as workflow artifacts (manual dispatch, or native-path changes) — see `docs/AUTOMATION.md`.
- The one rewarded-ad placement is the offline notice's **▶ 100% speed** bonus (`claimOfflineAdReward`,
  `applyOfflineRewardBonus` — see `docs/ECONOMY_REFERENCE.md`'s "Offline progress").
- Saves are `localStorage` inside each app's WebView, separate from the browser/PWA's saves; the
  optional cloud save (`storage.js` `serializeSaveForExport`/`importSaveJson`) bridges devices.

