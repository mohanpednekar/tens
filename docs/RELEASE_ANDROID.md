# Android release (Google Play)

Tens ships to Play as a Capacitor 8 wrapper around the same Vite web build that GitHub Pages serves
(`webDir: dist`). Package: `com.mohanpednekar.tens`, minSdk 34, compileSdk/targetSdk 36.

## One-time setup

1. **Android Studio / SDK** — install Android Studio (SDK Platform 36, Build-Tools 36) and JDK 21.
   Node.js **24.12+** (Firebase's engine floor; CI uses Node 24).
2. **Upload key** — create it once and back it up somewhere safe (password manager + offline copy).
   Losing it means asking Play support for an upload-key reset.

   ```sh
   keytool -genkeypair -v -keystore ~/keys/tens-upload.jks -alias tens-upload \
     -keyalg RSA -keysize 4096 -validity 10000
   ```

3. **Signing credentials** — never commit them (`*.jks`, `*.keystore`, `android/keystore.properties`
   are gitignored). Pick one place `android/app/build.gradle` reads them from (checked in this order):
   - Gradle property, e.g. in `~/.gradle/gradle.properties` (outside the repo):
     ```properties
     TENS_UPLOAD_STORE_FILE=/home/you/keys/tens-upload.jks
     TENS_UPLOAD_STORE_PASSWORD=…
     TENS_UPLOAD_KEY_ALIAS=tens-upload
     TENS_UPLOAD_KEY_PASSWORD=…
     ```
   - Environment variables with the same names (CI).
   - `android/keystore.properties` with the same keys (local convenience, gitignored).

   `bundleRelease`/`assembleRelease` fail with a clear error when any of the four is missing, so an
   unsigned bundle can never be produced by accident.
4. **Play Console** — create the app (default language, "Game", Free), accept Play App Signing
   (Google holds the app signing key; you upload with the upload key above).

## Build the signed AAB

```sh
yarn install --frozen-lockfile
yarn android:aab
# = yarn build:capacitor && cap sync android && (cd android && ./gradlew bundleRelease)
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`, plus the R8 mapping file at
`android/app/build/outputs/mapping/release/mapping.txt` (upload it to Play Console → App bundle
explorer → Downloads → ReTrace mapping, or Play does it automatically for AABs).

- **Version** — `versionName` is `package.json`'s `version`; `versionCode` is derived from it
  (`major*10000 + minor*100 + patch`, so 0.5.0 → 500). Every Play upload needs a higher
  versionCode: bump the version (`yarn bump-version`) or override once with
  `-PTENS_VERSION_CODE=501` / `TENS_VERSION_CODE=501`.
- **R8** — release builds run with `minifyEnabled true` + `shrinkResources true`
  (`proguard-android-optimize.txt` + `android/app/proguard-rules.pro`). Capacitor and every plugin
  ship consumer keep rules; the app-level file keeps the bridge classes and line numbers.
  `mobile-build.yml`'s `android-release` job builds the minified release with a throwaway key and
  boots it on an API 34 emulator (`scripts/android-boot-smoke.sh`), failing on a crash or if the game
  UI never renders. Run the same check locally against a connected device/emulator:
  `yarn android:apk:release && scripts/android-boot-smoke.sh android/app/build/outputs/apk/release/app-release.apk`.

## Optional features (all off by default)

Set these as **shell/CI environment variables** before `yarn android:aab` — the Capacitor CLI reads
`process.env` (not `.env` files) to decide which native SDKs to compile in, and Vite reads the same
names (also from `.env.production.local`) for the JS side. Web (GitHub Pages) builds ignore the ad
and IAP flags entirely.

| Variable | Effect |
|---|---|
| `VITE_TENS_ADS_ENABLED=true` | Compiles in AdMob (`@capacitor-community/admob`) + rewarded video |
| `TENS_ADMOB_APP_ID_ANDROID` | Real AdMob app id (Gradle property or env; defaults to Google's sample id) |
| `VITE_ADMOB_REWARDED_ID_ANDROID` | Real rewarded ad unit id (dev builds always use Google's test unit) |
| `VITE_TENS_IAP_ENABLED=true` | Compiles in RevenueCat (`@revenuecat/purchases-capacitor`, Play Billing 8) |
| `VITE_REVENUECAT_API_KEY_ANDROID` | RevenueCat public Google API key (`goog_…`) |
| `VITE_IAP_REMOVE_ADS_ID` / `VITE_IAP_SUPPORT_TIP_ID` | Override product ids (defaults `tens_remove_ads`, `tens_support_tip`) |
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID` | Enables Cloud save (Firebase Auth email/password + Firestore) on every platform |

With ads/IAP off the AAB contains no ad SDK, no `AD_ID` and no `BILLING` permission — only
`INTERNET`. Turning a flag on changes the Data safety answers (docs/STORE_LISTING.md).

Play Billing: `android/app/build.gradle` fails a release build whose resolved
`com.android.billingclient:billing` is older than 8.x.

Cloud save setup: Firebase console → Authentication → enable Email/Password; Firestore → create
database (production mode) and deploy `firestore.rules` (`firebase deploy --only firestore:rules`).
The JS SDK works inside the WebView, so no `google-services.json` is needed.

## Upload to a testing track

1. Play Console → **Test and release → Testing → Internal testing** → Create new release → upload
   `app-release.aab` → release notes → Save → Review → **Start rollout**. Add testers (email list or
   Google Group) under the Testers tab and share the opt-in link. Internal builds are available
   within minutes and skip review.
2. **Closed testing** (required before production for new personal developer accounts: at least 12
   testers opted in for 14 continuous days) → create a track, add a Google Group of testers, promote
   the internal release or upload a new AAB, submit for review.
3. Before the first review: complete **App content** (Privacy policy URL
   `https://mohanpednekar.github.io/tens/privacy.html`, Ads declaration, Data safety, Content
   rating, Target audience, Account deletion URL
   `https://mohanpednekar.github.io/tens/privacy.html#delete-account`) and the **Store listing**
   (docs/STORE_LISTING.md).
4. Promote to **Production** once the closed test requirement is met.

## Permission audit

The app manifest declares only `android.permission.INTERNET` (Firebase; ads/purchases when on). The
Capacitor template's `FileProvider` was removed — it only serves camera capture for
`<input type="file">`, which the game never uses. Plugin SDKs add their own permissions only when
synced in (`capacitor.config.js` `includePlugins`): AdMob adds `ACCESS_NETWORK_STATE` and
`com.google.android.gms.permission.AD_ID`; RevenueCat adds `com.android.vending.BILLING`.

## Edge-to-edge, splash, icon

- Android 15+ forces edge-to-edge. `capacitor.config.js` sets `SystemBars.insetsHandling: 'native'`
  with `viewport-fit=cover` (index.html), and every page pads with `env(safe-area-inset-*)`.
- Splash: Android 12+ system splash (brand background `#0C0D11` + adaptive icon), hidden from JS as
  soon as React mounts (`src/services/nativeShell.js`), auto-hidden after 3 s as a fallback.
- Icons/splash images are generated by `yarn gen-pwa-icons` (see docs/PWA_REFERENCE.md).
