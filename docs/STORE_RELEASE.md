# Store release (Google Play + App Store) — automated pipeline

How Tens gets from a merged version bump to both stores with as little manual work as the stores
allow. Manual build/signing detail lives in `docs/RELEASE_ANDROID.md` / `docs/RELEASE_IOS.md`;
privacy/rating answers in `docs/STORE_LISTING.md`.

## What is automated

| Piece | Source of truth | Tool |
|---|---|---|
| Listing text (name, descriptions, keywords, URLs, categories, review notes) | `fastlane/metadata/{android,ios}/` (committed) | fastlane `supply` / `deliver` |
| Screenshots, 6 scenes per device (table below) | real app captures of bot-played saves, `scripts/store-assets/{manifest,seeds}.mjs` | `yarn store:assets` (Playwright) |
| Feature graphic 1024×500, Play icon 512×512 | `scripts/store-assets/manifest.mjs`, `public/pwa-512x512.png` | `yarn store:assets` |
| "What's new" release notes (Play ≤ 500, App Store ≤ 4000 chars) | `CHANGELOG.md` section of the `package.json` version; `fastlane/release-notes.txt` overrides | `yarn store:notes` |
| Signed, R8-minified AAB → Play track | `android/` + `TENS_UPLOAD_*` | `yarn android:aab` → `fastlane android deploy` |
| Signed IPA → TestFlight (cloud-managed signing, build number = latest + 1) | `ios/` + App Store Connect API key | `fastlane ios beta` |
| Submit for App Review | — | `fastlane ios submit` |
| Play track promotion / staged rollout | — | `fastlane android promote` / `deploy rollout:` |

### Devices covered

| Store | Device class | Pixels | Upload |
|---|---|---|---|
| Play | Phone 9:16 | 1080×1920 | supply `phoneScreenshots` |
| Play | 7" / 10" tablet 9:16 | 1206×2144 / 1440×2560 | supply `seven/tenInchScreenshots` |
| Play | Foldable inner 3:4, inner 1:1, outer 10:16 (required from April 2027) | 1725×2300, 1800×1800, 1200×1920 | **manual** — supply has no foldable image type yet; files in `fastlane/play-foldable/` |
| App Store | iPhone 6.3" (the required iPhone slot) | 1206×2622 | deliver |
| App Store | iPhone 6.9" / 6.5" | 1320×2868 / 1284×2778 | deliver |
| App Store | iPhone Duo outer + inner (one "iPhone Duo" slot, max 10 → 5 scenes each; reported required from April 2027 — re-check Apple's spec page) | 1398×2034 + 2007×2853 | deliver (fastlane ≥ 2.242 knows both sizes) |
| App Store | iPad 13" (required: the app runs on iPad) | 2064×2752 | deliver |

Every capture uses the device's real viewport, so it shows exactly how the app lays out there
(Apple 2.3.3). On tablets, the iPhone Duo inner display and unfolded foldables that is still today's
single phone-width column until the large-screen epic #1152 ships its rail / split / hinge-aware
layouts; regenerate after each of those lands.

Seeds are real playthroughs by the `simulate-run-times` bot (`seeds.mjs`): a fresh save ~50 min in
(Foundry scene) and a save five Purges in, captured mid-cycle with the most Factory tiers on screen
(every other scene). Achievement unlock toasts are hidden everywhere except the achievements scene,
where the seed leaves one qualifying achievement un-earned so the game raises its own toast.

### Large-screen and foldable readiness (app side)

- Android: targetSdk 36 makes the app resizable / multi-window on ≥ 600 dp screens regardless of
  manifest locks; the manifest sets no orientation lock and handles configuration changes in the
  WebView, so folding/unfolding keeps game state. Play's adaptive Tier 3 ("fill the display without
  letterboxing") becomes mandatory in April 2027 (apps) / August 2027 (games) — epic #1152.
- iOS/iPadOS: `TARGETED_DEVICE_FAMILY = 1,2`, all four iPad orientations and no
  `UIRequiresFullScreen`, so iPad multitasking / Stage Manager work; the iPhone Duo inner display
  ignores orientation locks and gets a regular-width size class — the web layout already reflows to
  any width, and #1152 adds the regular-width layouts.

Generated images and release notes are gitignored and rebuilt on every release, so they never go
stale against the UI or changelog.

**On demand, without releasing:** Actions → **Store assets** → Run workflow (`store-assets.yml`,
optional `devices` / `scenes` filters) builds the full image set + release notes and attaches it as
the `tens-store-assets-<run>` artifact. No secrets, nothing uploaded to a store. You can also ask
Claude to run it (`store-release` skill).

`.github/workflows/store-release.yml` runs all of it:

- **Tag push** `v*` (pushed by `release.yml` after a `yarn bump-version` PR merges) — when repository
  variable `STORE_AUTO_RELEASE` is `true`: Play **internal** track + **TestFlight**, listing included.
- **Manual dispatch** — platforms, Play track (`internal`/`alpha` = closed/`beta` = open/`production`/
  `none`), status (`draft` until first publish), staged rollout fraction, iOS action (`testflight`/
  `submit`/`none`), listing on/off. Uploads the signed AAB as an artifact (not in promote mode).
- **Promote** a tested Play build: `play_promote_from` (`internal`/`alpha`/`beta`) + `play_track`
  (e.g. `production`) + `play_status` + optional `play_rollout` (a fraction in (0, 1], e.g. `0.2`)
  moves the dispatched checkout's version code — the same version the iOS job ships — and only if
  it is completed or rolling out on the source track (never a draft or halted build). No rebuild
  (Play rejects re-uploading a version code); with `upload_listing` on, the listing is pushed for it. The Play side of "ship it" is always a
  promotion, never a production upload of the same version.

Production promotion and App Review submission are deliberately manual dispatches. Both jobs run in
the `store-release` GitHub environment: add required reviewers there (Settings → Environments) so
every store run, tag-triggered or dispatched, waits for your approval, and optionally move the
store secrets into that environment.

## What can never be automated (store policy / no API)

One-time, in the consoles — answers to copy are in `docs/STORE_LISTING.md`:

- Creating the developer accounts, identity/tax/banking verification, accepting agreements.
- Creating the app record (Play Console; App Store Connect → New App).
- **Play: the very first AAB must be uploaded by hand** (the API cannot create the first release).
  Run the workflow with `play_track: none` (uploads nothing, so it needs no Play credentials),
  download the `tens-android-store-release` artifact, drag `app-release.aab` into Internal testing.
  Play attaches listing edits to a release, so listing uploads also start working only after this.
- Play **foldable screenshots** (until fastlane supply supports them): upload
  `fastlane/play-foldable/` from the same artifact in Play Console → Store listing.
- Play **App content** forms: Data safety, Content rating (IARC), Target audience, Ads, Privacy
  policy, Account deletion URL, Government apps / Financial features / Health declarations.
- Apple **App Privacy** labels and **Age rating** questionnaire; App Review contact (name, phone, email).
- Play's **closed test with 12 testers for 14 days** (personal developer accounts created after
  Nov 2023) before production access is granted.
- The App Review / Play review decisions themselves.

After those, each later release is: merge the version-bump PR → (auto) internal + TestFlight →
dispatch `play_promote_from: internal` + `play_track: production` and `ios_action: submit` when happy.

## Known release blocker

- **Supporter pack in store builds**: Settings offers an unlock code and a "Dummy checkout (free)"
  that unlock extra save slots / System log / Task Manager. Apple 3.1.1 forbids unlocking features
  outside In-App Purchase, and the dummy checkout reads as unfinished to reviewers. Hide it in native
  builds unless IAP is on, or wire it to IAP, before the first App Store submission (#1192).

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

Recommended: Settings → Environments → `store-release` (created on the first run) → Required
reviewers = you, and keep these secrets as environment secrets there.

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
bundle exec fastlane android promote from:internal to:production rollout:0.2   # this checkout's version; or version_code:
bundle exec fastlane android metadata track:internal   # listing only; needs a release on that track
```

Credentials are read only from the environment (`PLAY_SERVICE_ACCOUNT_JSON`, `ASC_KEY_ID`,
`ASC_ISSUER_ID`, `ASC_KEY_P8`, `APPLE_TEAM_ID`, `TENS_UPLOAD_*`).

## Tooling choice

The Anthropic plugin directory (checked 2026-11) has store-screenshot and mobile-QA plugins, all
community-tier with no ratings or install counts: an Expo/React Native + Maestro pipeline (wrong
stack), a remote screenshot service (would send unreleased app captures to a third party), and
"privileged" emulator/inspection plugins (broad local access, v0.x). None beat the in-repo
Playwright pipeline on fit, security or reliability, so none is installed; the project instead
carries its own `store-release` skill and `store-compliance` agent. fastlane (MIT, maintained under
the Mobile Native Foundation, the de-facto standard for store uploads) is pinned via `Gemfile.lock`.

## Changing the assets

- Listing copy: edit the `.txt` files under `fastlane/metadata/` (limits: Play title 30, short
  description 80, full 4000; App Store name/subtitle 30, keywords 100, promotional text 170).
- Screenshot scenes/devices: `SCENES`/`DEVICES` in `scripts/store-assets/manifest.mjs`;
  `manifest.test.js` pins every size against the stores' rules. Seeds: `seeds.mjs` (bot play —
  never hand-set state). Iterate with `yarn store:assets --devices phone --only factory` — any
  filter writes a preview to `fastlane/preview/` (never uploaded); only a full run refreshes the
  upload folders, which it rebuilds from scratch.
- Feature graphic: `featureGraphicHtml` in the same file.
