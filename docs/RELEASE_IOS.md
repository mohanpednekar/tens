# iOS release (App Store)

The iOS app is the same Capacitor 8 project (`ios/App`, Swift Package Manager — no CocoaPods).
Bundle id `com.mohanpednekar.tens`, display name **Tens**, deployment target iOS 18.0,
`MARKETING_VERSION` mirrors `package.json` (bump it with each release), build number =
`CURRENT_PROJECT_VERSION`.

**Building requires macOS with Xcode 16+.** Without a Mac, use a cloud build service — e.g.
Ionic Appflow, Codemagic, Bitrise or a GitHub Actions `macos-latest` runner with your signing
certificate and provisioning profile stored as secrets (`mobile-build.yml` already builds the
unsigned Simulator app on `macos-latest`).

## One-time setup

1. Enroll in the **Apple Developer Program** (USD 99/year) and accept the agreements in App Store
   Connect (**Paid Apps** agreement + banking/tax are required before any IAP can be sold).
2. **Certificates, Identifiers & Profiles**: register the App ID `com.mohanpednekar.tens`
   (enable *In-App Purchase* if IAP will be used).
3. **App Store Connect → My Apps → +**: new iOS app, bundle id above, SKU `tens`, primary language.
4. In Xcode (`yarn cap:ios` opens it): target **App → Signing & Capabilities** → select your Team,
   keep *Automatically manage signing*. Add the *In-App Purchase* capability when IAP is enabled.

## Prepare the project

```sh
yarn install --frozen-lockfile
yarn cap:ios          # build:capacitor → cap sync ios → configure Info.plist → open Xcode
```

`scripts/configure-ios-plist.mjs` (`yarn ios:configure`) manages the ad keys in `Info.plist`:

- `GADApplicationIdentifier` — always present (Google's sample id unless `TENS_ADMOB_APP_ID_IOS`
  is set).
- `NSUserTrackingUsageDescription` and `SKAdNetworkItems` — **only when `VITE_TENS_ADS_ENABLED=true`**.
  The app then shows the App Tracking Transparency prompt before Google's consent form and the
  first ad request. With ads off neither key exists and ATT is never requested.

`ITSAppUsesNonExemptEncryption = false` is set (the app only uses HTTPS), so no export-compliance
question appears for each build.

Optional features use the same environment variables as Android (docs/RELEASE_ANDROID.md), with
iOS keys: `VITE_ADMOB_REWARDED_ID_IOS`, `TENS_ADMOB_APP_ID_IOS`, `VITE_REVENUECAT_API_KEY_IOS`
(`appl_…`). Export them in the shell before `yarn cap:ios` so `cap sync` links the matching SDKs.

## TestFlight

1. Xcode → select **Any iOS Device (arm64)** → **Product → Archive**.
2. Organizer → **Distribute App → App Store Connect → Upload** (automatic signing).
   CLI alternative on a Mac/CI:
   ```sh
   xcodebuild -project ios/App/App.xcodeproj -scheme App -configuration Release \
     -archivePath build/Tens.xcarchive archive
   xcodebuild -exportArchive -archivePath build/Tens.xcarchive \
     -exportOptionsPlist ExportOptions.plist -exportPath build/   # method: app-store-connect
   xcrun altool --upload-app -f build/App.ipa -t ios --apiKey <KEY_ID> --apiIssuer <ISSUER_ID>
   ```
3. App Store Connect → **TestFlight**: the build appears after processing (~15–30 min). Internal
   testers (up to 100 team members) can install immediately; external testers need a short Beta
   App Review.

## App Store submission

1. App Store Connect → the app → **iOS App → 1.0 Prepare for Submission**: screenshots (6.9" and
   6.5" iPhone; 13" iPad if iPad stays supported), description/keywords/support URL
   (docs/STORE_LISTING.md), Privacy Policy URL `https://mohanpednekar.github.io/tens/privacy.html`.
2. **App Privacy** → answer the nutrition-label questions (docs/STORE_LISTING.md).
3. **Age rating** questionnaire (docs/STORE_LISTING.md).
4. If IAP is on: create the products (`tens_remove_ads` Non-Consumable, `tens_support_tip`
   Consumable) under **Monetization → In-App Purchases**, attach them to the version, and add a
   review screenshot for each.
5. Select the build, add review notes (no login required; cloud save is optional — provide a demo
   account if it is enabled), **Submit for Review**.

Guideline notes: account deletion is available in-app (Settings → Cloud save → Delete account and
data, guideline 5.1.1(v)); sign-in is email/password only, so Sign in with Apple is not required
(4.8); purchases include a Restore button (3.1.1).
