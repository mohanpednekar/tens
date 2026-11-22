---
name: store-release
description: Prepares or ships a Tens release to Google Play and the App Store (iPhone, iPad, iPhone Duo, Android phones/tablets/foldables) — regenerates store screenshots/feature graphic/release notes, checks them, runs the fastlane lanes or the store-release workflow, and re-verifies store rules that drift (screenshot slots, foldable/large-screen requirements, privacy answers). Use when asked to release, prepare store assets, update the store listing, or check store readiness.
---

Runbook for agents; the human-facing reference is `docs/STORE_RELEASE.md` (read its "Maintainer
prerequisites" and "What can never be automated" before promising anything is automatic).

## 1. Re-verify store rules (they change several times a year)

Check the official pages, not memory or vendor blogs, and fix `DEVICES` in
`scripts/store-assets/manifest.mjs` + its test when anything moved:
- Apple screenshot specifications (developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications)
  — required iPhone slot, iPhone Duo outer/inner sizes and deadline, iPad 13".
- Google Play adaptive quality standards / games large-screen blog — foldable screenshot ratios and
  deadlines, Tier 3 criteria.
- Installed fastlane (`Gemfile.lock`): does `deliver/lib/deliver/app_screenshot.rb` know every
  Apple size? Does `supply` support foldable images yet (until it does, `fastlane/play-foldable/`
  is a manual Play Console upload)?
Prefer first-party sources; when only secondary sources exist, say so in the PR.

## 2. Assets

When the user just wants the assets (no release), dispatch `store-assets.yml` (GitHub MCP
`actions_run_trigger`, inputs `devices`/`scenes`) and hand them the run's artifact link — don't
build or zip them locally. Generate locally only when iterating on the generator itself.

1. `yarn store:assets` (~3 min; `PW_CHROMIUM_PATH` as for e2e; `--devices id,id` / `--only scene`
   to iterate). Seeds are real bot playthroughs (`scripts/store-assets/seeds.mjs`, built on
   `.claude/skills/simulate-run-times/bot.mjs`) — never hand-edit game state for a screenshot.
2. Look at every device's set (contact sheet with sharp, as in a UI aesthetic review): no toast
   except on the achievements scene, no freeze overlay, no empty screens, nothing clipped at the
   device's real viewport. If a scene is thin because the bot never reaches that feature, pick a
   different real scene instead of faking state.
3. `yarn store:notes`; read the output — only player-facing lines (filter: `isPlayerFacing`). For a
   launch or a large release write `fastlane/release-notes.txt` instead.

## 3. Copy and privacy

Run the `store-compliance` agent (`.claude/agents/store-compliance.md`) on the listing and the
build flags before every upload that changes copy, flags or SDKs.

## 4. Ship

- CI: `store-release.yml` (dispatch inputs in `docs/STORE_RELEASE.md`). Tag pushes ship to Play
  internal + TestFlight only when `STORE_AUTO_RELEASE` is `true`.
- Local: `bundle exec fastlane android deploy track:internal metadata:true`,
  `bundle exec fastlane ios beta`, then `ios submit` / `android promote` only on the maintainer's
  explicit request — production and App Review are human decisions.
- Never put credentials in files, logs or PR text; lanes read them from the environment only.
