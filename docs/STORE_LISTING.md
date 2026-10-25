# Store listing drafts

Drafts for Google Play and the App Store, based on what the app actually collects (see
`public/privacy.html`). Answers are given for the **default build** (cloud save on, ads and IAP
off) and the changes needed when `VITE_TENS_ADS_ENABLED` / `VITE_TENS_IAP_ENABLED` are turned on.
Re-check every answer whenever a flag or SDK changes.

## Listing text

**App name:** Tens

**Short description (Play, ≤ 80 chars):**
> An incremental idle game where every upgrade is a power of ten.

**Subtitle (App Store, ≤ 30 chars):** Idle game in powers of ten

**Promotional text (App Store, ≤ 170 chars):**
> Tap bits into bytes, build disk arrays, and climb from Kilobytes to Quettabytes. Prestige, ascend Eras and watch the numbers explode — no paywalls.

**Full description (≤ 4000 chars):**
> Tens is an incremental game built around one idea: every cost, every upgrade and every reward is a power of ten.
>
> Start in the Byte Foundry, tapping a stream of bits into your very first Kilobyte. Combine, upgrade capacity and speed, and provision disk arrays that automatically feed your growing Byte Factory. Buy tiers from Kilobytes all the way up to Quettabytes, each one producing the tier below it, and watch your production cascade down the ladder.
>
> • Ten storage tiers, from Kilobytes to Quettabytes
> • A hands-on Byte Foundry with disks, data lakes and boosters
> • Merge Cores into Nodes, Clusters and beyond for powerful boosts
> • Latency, Scale Up and Overclock to speed up every run
> • Prestige at one Googol Bytes for permanent upgrades and automation
> • Ascend Eras for Eons and an even deeper meta game
> • Offline progress — your factory keeps working while you're away
> • Optional cloud save to continue on another device
> • Light and dark themes, multiple save slots
> • Plays fully offline, no account required
>
> Every part of the game is free to play. Nothing is locked behind a purchase.

**Category:** Games → Simulation (Play: Simulation; App Store primary: Games, secondary: Simulation / Strategy)
**Tags (Play):** Idle, Incremental, Casual, Offline
**Keywords (App Store, ≤ 100 chars):** `idle,incremental,clicker,tap,bytes,prestige,offline,numbers,factory,tycoon`
**Support URL:** https://github.com/mohanpednekar/tens/issues
**Marketing URL:** https://mohanpednekar.github.io/tens/
**Privacy policy:** https://mohanpednekar.github.io/tens/privacy.html
**Account deletion URL (Play):** https://mohanpednekar.github.io/tens/privacy.html#delete-account

## Content rating (Play IARC questionnaire / App Store age rating)

| Question | Answer |
|---|---|
| Category | Game |
| Violence, blood, gore | No |
| Sexual content, nudity | No |
| Profanity / crude humour | No |
| Fear / horror | No |
| Controlled substances (drugs, alcohol, tobacco) | No |
| Gambling: simulated gambling, real-money gambling, loot boxes | No (no random paid rewards) |
| User-generated content / users can interact or communicate | No |
| Shares user location | No |
| Digital purchases | No by default; **Yes** when IAP is enabled (remove ads, tip) |
| Ads | No by default; **Yes** when ads are enabled (opt-in rewarded video: 100%-speed offline progress) |
| Unrestricted web access | No (policy links open in the system browser) |
| Medical / treatment info | No |

Expected result: IARC **Everyone / PEGI 3**; App Store **4+**.
Target audience (Play): 13+ (not designed for children; avoids the Families policy requirements on
ad SDKs). Answer "No" to "Could the app unintentionally appeal to children?" only if the store
assets stay neutral; otherwise reconsider before enabling ads.

## Google Play — Data safety

### Default build (cloud save on, ads and IAP off)

- **Does your app collect or share any of the required user data types?** Yes
- **Is all of the user data collected by your app encrypted in transit?** Yes (HTTPS only)
- **Do you provide a way for users to request that their data is deleted?** Yes — in-app
  (Settings → Cloud save → Delete account and data) and via the web URL above.

| Data type | Collected | Shared | Optional? | Purposes |
|---|---|---|---|---|
| Personal info → Email address | Yes | No | Optional (only with a cloud save account) | App functionality, Account management |
| Personal info → User IDs | Yes | No | Optional | App functionality, Account management |
| App activity → Other user-generated content *(game save)* | Yes | No | Optional | App functionality |

Not collected: location, financial info, contacts, messages, photos/videos, audio, files, calendar,
health, web history, device or other IDs, app interactions, crash logs, diagnostics.
Firebase Authentication also processes IP addresses for sign-in security — check Firebase's
"Privacy and security → Data disclosure" page when filling in the form and declare anything it
lists for Authentication and Firestore.

### When ads are enabled (AdMob, per Google's AdMob Data safety guidance)

Add:

| Data type | Collected | Shared | Optional? | Purposes |
|---|---|---|---|---|
| Location → Approximate location *(from IP)* | Yes | Yes | No | Advertising or marketing, Fraud prevention |
| App activity → App interactions | Yes | Yes | No | Advertising or marketing, Analytics |
| App info and performance → Diagnostics | Yes | Yes | No | Advertising or marketing, Analytics |
| Device or other IDs → Device or other IDs *(advertising ID)* | Yes | Yes | No | Advertising or marketing, Fraud prevention |

Also: **App content → Ads → "Yes, my app contains ads"**, and the **Advertising ID** declaration
(uses AD_ID: Yes, purpose: Advertising or marketing).

### When IAP is enabled (Google Play Billing + RevenueCat)

Add:

| Data type | Collected | Shared | Optional? | Purposes |
|---|---|---|---|---|
| Financial info → Purchase history | Yes | No *(RevenueCat acts as a service provider)* | Optional | App functionality |
| Device or other IDs *(RevenueCat anonymous app user id)* | Yes | No | Optional | App functionality |

Payment details are handled by Google Play and never reach the app.

## Apple — App Privacy ("nutrition label")

### Default build

**Data Linked to You** (purpose: App Functionality; not used for tracking):
- Contact Info → **Email Address**
- Identifiers → **User ID**
- User Content → **Gameplay Content** (the cloud save)

**Data Used to Track You:** none. **Data Not Linked to You:** none.

### When ads are enabled

Add, per Google's AdMob App Store guidance:
- **Data Used to Track You:** Identifiers → Device ID (IDFA, only if the user allows tracking);
  Usage Data → Advertising Data; Location → Coarse Location
- **Data Linked to You / Not Linked:** Usage Data → Product Interaction, Advertising Data;
  Diagnostics → Performance Data, Crash Data; Location → Coarse Location
  (purposes: Third-Party Advertising, Analytics)

### When IAP is enabled

Add: Purchases → **Purchase History** (Linked to You, App Functionality). RevenueCat's app user id
is covered by Identifiers → User ID.

## Store assets still needed

- Play: 512×512 icon (from `public/pwa-512x512.png`), 1024×500 feature graphic, 2–8 phone
  screenshots (16:9 or 9:16, ≥ 1080 px), optional 7"/10" tablet screenshots.
- App Store: 1024×1024 icon (no alpha; `ios/App/App/Assets.xcassets/AppIcon.appiconset`),
  6.9" (1320×2868) and 6.5" (1284×2778) iPhone screenshots, 13" iPad screenshots if iPad stays
  enabled, optional app preview video.
