# Store release (Google Play + App Store) — automated pipeline

How Tens gets from a merged version bump to both stores with as little manual work as the stores
allow. Manual build/signing detail lives in `docs/RELEASE_ANDROID.md` / `docs/RELEASE_IOS.md`;
privacy/rating answers in `docs/STORE_LISTING.md`.

## What is automated

| Piece | Source of truth | Tool |
|---|---|---|
| Listing text (name, descriptions, keywords, URLs, categories, review notes) | `fastlane/metadata/{android,ios}/` (committed) | fastlane `supply` / `deliver` |
| Screenshots — Play phone, 7" and 10" tablet; iPhone 6.9"/6.5", iPad 13" (6 scenes each) | real app captures, `scripts/store-assets/manifest.mjs` | `yarn store:assets` (Playwright) |
| Feature graphic 1024×500, Play icon 512×512 | `scripts/store-assets/manifest.mjs`, `public/pwa-512x512.png` | `yarn store:assets` |
| "What's new" release notes (Play ≤ 500, App Store ≤ 4000 chars) | `CHANGELOG.md` section of the `package.json` version; `fastlane/release-notes.txt` overrides | `yarn store:notes` |
| Signed, R8-minified AAB → Play track | `android/` + `TENS_UPLOAD_*` | `yarn android:aab` → `fastlane android deploy` |
| Signed IPA → TestFlight (cloud-managed signing, build number = latest + 1) | `ios/` + App Store Connect API key | `fastlane ios beta` |
| Submit for App Review | — | `fastlane ios submit` |
| Play track promotion / staged rollout | — | `fastlane android promote` / `deploy rollout:` |

Generated images and release notes are gitignored and rebuilt on every release, so they never go
stale against the UI or changelog.

`.github/workflows/store-release.yml` runs all of it:

- **Tag push** `v*` (pushed by `release.yml` after a `yarn bump-version` PR merges) — when repository
  variable `STORE_AUTO_RELEASE` is `true`: Play **internal** track + **TestFlight**, listing included.
- **Manual dispatch** — platforms, Play track (`internal`/`alpha` = closed/`beta` = open/`production`/
  `none`), status (`draft` until first publish), staged rollout fraction, iOS action (`testflight`/
  `submit`/`none`), listing on/off. Always uploads the signed AAB as an artifact.

Production promotion and App Review submission are deliberately manual dispatches.

## What can never be automated (store policy / no API)

One-time, in the consoles — answers to copy are in `docs/STORE_LISTING.md`:

- Creating the developer accounts, identity/tax/banking verification, accepting agreements.
- Creating the app record (Play Console; App Store Connect → New App).
- **Play: the very first AAB must be uploaded by hand** (the API cannot create the first release).
  Run the workflow with `play_track: none`, download the `tens-android-store-release` artifact, drag
  `app-release.aab` into Internal testing.
- Play **App content** forms: Data safety, Content rating (IARC), Target audience, Ads, Privacy
  policy, Account deletion URL, Government apps / Financial features / Health declarations.
- Apple **App Privacy** labels and **Age rating** questionnaire; App Review contact (name, phone, email).
- Play's **closed test with 12 testers for 14 days** (personal developer accounts created after
  Nov 2023) before production access is granted.
- The App Review / Play review decisions themselves.

After those, each later release is: merge the version-bump PR → (auto) internal + TestFlight →
dispatch `production` / `submit` when happy.

## Maintainer prerequisites (in order)

1. **Google Play Console** account (one-time USD 25), identity verified. An *organization* account
   (needs a D-U-N-S number) skips the 12-tester closed-test rule.
2. **Apple Developer Program** (USD 99/year); accept agreements in App Store Connect (Paid Apps +
   tax/banking only if IAP will ever be sold).
3. **Upload keystore** (`docs/RELEASE_ANDROID.md` step 2), backed up offline.
4. **Play service account**: Google Cloud console → create project → enable *Google Play Android
   Developer API* → IAM → service account → JSON key. Play Console → Users and permissions → invite
   the service-account email → app permissions: *Release to testing tracks*, *Release to production*,
   *Manage store presence*.
5. **App Store Connect API key**: Users and Access → Integrations → App Store Connect API → Team key
   with **Admin** role (needed for cloud-managed signing) → download the `.p8` (once only). Note the
   Key ID and Issuer ID. Team ID: developer.apple.com → Membership.
6. Register the App ID `com.mohanpednekar.tens` and create the app in App Store Connect (SKU `tens`).
   App names are globally unique on the App Store; the listing uses **"Tens: Idle Powers of Ten"**
   (`fastlane/metadata/*/name.txt`/`title.txt`) — change it there if it is taken.
7. Create the Play app (Game, Free) and accept Play App Signing.
8. Decide the feature flags for store builds (ads, IAP, cloud save). Default (none set) = no data
   collected at all; set repository *variables* below and update the privacy answers if any is on.
9. Add the GitHub secrets/variables below, run the workflow with `play_track: none`, upload the first
   AAB by hand, fill the console forms, then switch to automated runs.

### GitHub secrets (Settings → Secrets and variables → Actions → Secrets)

| Secret | Value |
|---|---|
| `ANDROID_UPLOAD_KEYSTORE_BASE64` | `base64 -w0 tens-upload.jks` (macOS: `base64 -i tens-upload.jks`) |
| `TENS_UPLOAD_STORE_PASSWORD`, `TENS_UPLOAD_KEY_PASSWORD` | keystore / key passwords |
| `TENS_UPLOAD_KEY_ALIAS` | e.g. `tens-upload` |
| `PLAY_SERVICE_ACCOUNT_JSON` | full JSON key file text |
| `ASC_KEY_ID`, `ASC_ISSUER_ID` | App Store Connect API key ids |
| `ASC_KEY_P8` | full `.p8` file text, including the BEGIN/END lines |

### GitHub variables (same page → Variables)

| Variable | Value |
|---|---|
| `APPLE_TEAM_ID` | 10-character Team ID |
| `STORE_AUTO_RELEASE` | `true` to ship every version tag to internal + TestFlight |
| `VITE_TENS_ADS_ENABLED`, `VITE_TENS_IAP_ENABLED`, `VITE_FIREBASE_*`, ad-unit / RevenueCat ids | optional features (`docs/RELEASE_ANDROID.md` "Optional features") |

## Running locally

```sh
bundle install                          # Ruby 3.3+; Gemfile pins fastlane
yarn store:assets                       # images → fastlane/… (PW_CHROMIUM_PATH as for e2e)
yarn store:notes                        # release notes for package.json's version
yarn android:aab && bundle exec fastlane android deploy track:internal metadata:true
bundle exec fastlane ios beta           # macOS + Xcode 16+
bundle exec fastlane ios submit automatic_release:false
bundle exec fastlane android promote from:internal to:production rollout:0.2
```

Credentials are read only from the environment (`PLAY_SERVICE_ACCOUNT_JSON`, `ASC_KEY_ID`,
`ASC_ISSUER_ID`, `ASC_KEY_P8`, `APPLE_TEAM_ID`, `TENS_UPLOAD_*`).

## Changing the assets

- Listing copy: edit the `.txt` files under `fastlane/metadata/` (limits: Play title 30, short
  description 80, full 4000; App Store name/subtitle 30, keywords 100, promotional text 170).
- Screenshot scenes/devices: `SCENES`/`DEVICES` in `scripts/store-assets/manifest.mjs`;
  `manifest.test.js` pins every size against the stores' rules.
- Feature graphic: `featureGraphicHtml` in the same file.
