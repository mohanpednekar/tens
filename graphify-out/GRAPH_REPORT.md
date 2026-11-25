# Graph Report - tens  (2026-11-25)

## Corpus Check
- 256 files · ~633,716 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 33 file(s) not represented in the graph (top: (none) 11, .xml 9, .properties 2)

## Summary
- 3795 nodes · 11348 edges · 191 communities (152 shown, 39 thin omitted)
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 2387 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8794623a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useIncrementalGame
- MainPage/index.jsx
- Key engine functions (`src/game/engine.js`)
- ComputePage/index.jsx
- layers.js
- Key engine functions (`src/game/engine.js`)
- buyTickspeedMultiplier
- Automation workflows
- dailyChallenges.js
- engine.test.js
- useIncrementalGame.js
- SettingsPage/index.jsx
- run-simulation.mjs
- App.foundry.test.jsx
- FactoryTab.jsx
- ButtonContent
- getTierCost
- storage.js
- DevModePage/index.jsx
- with
- store-assets/generate.mjs
- bump-version.mjs
- [Unreleased]
- steps
- ComputeFlopsPage/index.jsx
- auto-merge-after-adversarial-approve
- navAttention.js
- mergeState
- DiskArrayRow/index.jsx
- InfoPage/index.jsx
- env
- gradlew
- DailyTab.jsx
- Shared components reference
- App.jsx
- steps
- steps
- simulate-challenges.mjs
- MainActivity.java
- steps
- adaptSaveForCurrentSchema
- env
- DiskArrayRow/index.jsx
- DataLakePanel/index.jsx
- steps
- steps
- Economy model
- Procedure
- Automation workflows
- manifest.mjs
- backlog-issue-hygiene.sh
- pr-conflict-sweep.yml
- steps
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- orphan-branch-scan.sh
- tickGame
- Package.swift
- CapApp-SPM/README.md
- Testing
- stryker.config.json
- check-graphify-freshness.mjs
- Automation workflows
- Forced priority order
- scripts
- capacitor.build.gradle
- palette.md
- ref_node_url
- config.js
- lint-workflow-shell.mjs
- capacitor.settings.gradle
- adversarialReviewMarker.js
- settings.gradle
- body
- palette.md
- resetByteFoundry
- AchievementsPage/index.jsx
- jsconfig.json
- Store listing drafts
- with
- ExampleInstrumentedTest.java
- Economy model — Byte Foundry (full text)
- End-to-end specs (Playwright)
- Copilot Instructions
- with
- Approved design
- styled-components
- pr-low-risk-eligible.sh
- @playwright/test
- slot
- steps
- backlog-issue-hygiene.sh
- MilestonesPage/index.jsx
- browserslist
- Procedure
- Changelog
- Shared components reference
- clampNonNegative
- epic-407-issue-hygiene.sh
- lint-conflict-markers.mjs
- dev-team/SKILL.md
- createInitialGameState
- store-release-notes.mjs
- env
- on
- AchievementToasts/index.jsx
- resolutions
- optimize-ai-files/SKILL.md
- Android release (Google Play)
- Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04
- programmer.md
- qa.md
- BoostTimerBar/index.jsx
- getComputeBoostLanes
- claude-deny-settings.sh
- pr-head-guard.sh
- sync-release-milestones.sh
- model
- permissions
- adversarialReviewMarker.js
- inputs
- Daily challenges (epic #1062)
- store-release.yml
- theme/index.jsx
- dailyChallenges.test.js
- ChallengesPage/index.jsx
- OfflineProgressNotice/index.jsx
- End-to-end specs (Playwright)
- pull_request_template.md
- followup
- jsconfig.json
- admobAdapter.js
- MainActivity.java
- dev-team/SKILL.md
- Compact screen layouts (epic #1135)
- large-screen-mockups/generate.mjs
- publish-strategy.sh
- PWA support reference
- One-shot auto-convert
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- orphan-branch-scan.sh
- pr-low-risk-eligible.sh
- resolve-pr-threads.sh
- sweep-stalled-auto-prs.sh
- .claude/CLAUDE.md
- session-start.sh
- FUNDING.yml
- Package.swift
- CapApp-SPM/README.md
- android-boot-smoke.sh
- classify-claude-failure.sh
- claude-deny-settings.sh
- pr-head-guard.sh
- file:scripts/lint-conflict-markers.mjs
- file:scripts/lint-conflict-markers.test.js
- file:src/game/storagePrefix.js
- file:src/game/storagePrefix.test.js
- file:src/pages/SettingsPage/ManualSaveSection.jsx
- scripts/autonomous-maintenance-workflow.test.js
- engine.achievements.test.js
- env
- env
- Store release (Google Play + App Store) — automated pipeline
- env
- with
- simulate-run-times/SKILL.md
- env
- reboot-simulation.mjs
- SpeedDetailsPopover/index.jsx
- Dev Mode Reference
- play_status
- challengeUi.js
- ios_action
- Foundry multiplier bar: one diverging bar tried and dropped (2026-10)
- AutoBoostPresetPicker/index.jsx
- platforms
- play_promote_from

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 279 edges
2. `MainPage()` - 121 edges
3. `useIncrementalGame()` - 120 edges
4. `ByteFoundryPage()` - 111 edges
5. `MainPage reference` - 105 edges
6. `clampNonNegative()` - 97 edges
7. `PerksPage()` - 93 edges
8. `tickGame()` - 91 edges
9. `createInitialGameState()` - 90 edges
10. `Testing` - 87 edges

## Surprising Connections (you probably didn't know these)
- `Release (`release.yml`)` --references--> `extractVersionSection()`  [INFERRED]
  docs/AUTOMATION.md → scripts/bump-version.mjs
- `Scheduled maintenance (`autonomous-maintenance.yml`)` --references--> `gh()`  [INFERRED]
  docs/AUTOMATION.md → scripts/verify-maintainer-checklist.mjs
- `Storage auto-redeem toggle button removed for now, default flipped to always-on` --references--> `createInitialGameState()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `Why `getTierCost` uses a multiplier form, not a literal power` --references--> `getTierCost()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (191 total, 39 thin omitted)

### Community 0 - "useIncrementalGame"
Cohesion: 0.17
Nodes (26): Architecture, Security notes, `OfflineProgressNotice/index.jsx`, Buy max mode, Buy mode (Level / Single), Offline progress, Native apps (Capacitor — #70), Native apps (Capacitor) reference (+18 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (107): Fill multiplier 10× → 0.1× (log-linear) and a multiplicative tap bonus — 2026-10-30, Reclamation decoupled from the exponent upgrades; 20 achievements cut to 5 (2026-11), Speed exponent rises with Foundry-reset Disk-size unlocks (2026-10), Pool Memory Capacity and Bandwidth, Upgrade Data Stream (Capacity / Bitrate), LeadIcon, formatDiskSizeInPoolUnit(), formatPoolBalanceStable() (+99 more)

### Community 2 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.09
Nodes (64): Byte Foundry, What it does, `DiskArrayRow/index.jsx`, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Data Stream balance kept through Prestige (#1096), Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382) (+56 more)

### Community 3 - "ComputePage/index.jsx"
Cohesion: 0.13
Nodes (29): isComputeMergeStartAvailableAtBoundary(), ArmedStatusText, BoostCard, BoostRow, BoostsHint, canMerge(), ChargerBadge, ChargerStatus (+21 more)

### Community 4 - "layers.js"
Cohesion: 0.03
Nodes (93): ACHIEVEMENT_SERIES, ACHIEVEMENTS_FEATURE, AUTO_HYPERSCALER_EON_COST, AUTO_PURGE_BEST_MULTIPLIER_OPTIONS, AUTO_PURGE_MAX_PP_EXPONENT, AUTO_PURGE_MIN_SECONDS_OPTIONS, AUTOBUYER_BASE_INTERVAL_SECONDS, AUTOBUYER_BULK_MAX_EXTRA_LEVELS (+85 more)

### Community 5 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.11
Nodes (51): A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Cache Warm targets the highest pool being filled (2026-11-19), Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card (+43 more)

### Community 6 - "buyTickspeedMultiplier"
Cohesion: 0.18
Nodes (21): actTickspeed(), `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, The last tier's XP-funded tickspeed, Tickspeed multiplier, buyTickspeedMultiplier(), consumeXpForLastTierTickspeed(), consumeXpForLastTierTickspeedCore(), getChallengeEffectTier() (+13 more)

### Community 7 - "Automation workflows"
Cohesion: 0.06
Nodes (74): Bits subline under MoneyHero; `+n/8` dropped from tier Buy buttons — 2026-11-09, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Single-line tier rows; exponential notation from 10,000 (2026-11), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, The global tickspeed multiplier, MainPage reference, progressFill(), buyGlobalTickspeedMultiplier() (+66 more)

### Community 8 - "dailyChallenges.js"
Cohesion: 0.09
Nodes (41): AUTOMATION_BY_KEY, buildDailyCandidate(), calculateAttemptMark(), calculateTarget(), createRng(), DAILY_CHECK_IN_PLANS, DAILY_MAX_CREDITS, DAILY_MAX_GENERATION_ATTEMPTS (+33 more)

### Community 9 - "engine.test.js"
Cohesion: 0.04
Nodes (39): Boosters: manual merge on automated tiers became instant (2026-10), getDataLakeCurrentDiskFillFraction, getLastTierLevelCreditIntervalSeconds(), instantComputeMergeAtBoundary(), isAnyComputeMergeInFlight(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable() (+31 more)

### Community 10 - "useIncrementalGame.js"
Cohesion: 0.06
Nodes (58): AUTO_MERGE_TICKERS, AUTOBUYER_UNIT_BATCH, BIT_UNIT_SYMBOLS, CHALLENGE_BOUNDARIES, COMPUTE_LADDER_FIELDS, COMPUTE_MERGE_TIMER_FIELDS, createEmptyDataLakes(), createEmptyDataLakeTier() (+50 more)

### Community 11 - "SettingsPage/index.jsx"
Cohesion: 0.14
Nodes (26): Settings + Milestones (#1143), buildClearSlotConfirmMessage(), Body, buildSparklinePath(), Caption, Chevron, Group, HeadButton (+18 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.05
Nodes (90): Perks regrouped by feature: Unlocks / Upgrades / Toggles → Automation / Prestige — 2026-11-03, VisuallyHidden, BuyMaxToggle(), Switch, getChallengeTitle(), canBuyAutoHyperscaler(), getAutobuyerBaseIntervalSeconds(), getAutobuyerBulkExtraLevels() (+82 more)

### Community 13 - "App.foundry.test.jsx"
Cohesion: 0.05
Nodes (45): seedDataLakeSave(), version, @testing-library/user-event, derivePurchaseFieldsFromCounts(), expandSettingsSections(), openSettings(), seedMainGameState(), ALL_TIER_IDS (+37 more)

### Community 14 - "FactoryTab.jsx"
Cohesion: 0.10
Nodes (38): react, Banner, ChallengeBanner(), Rule, Text, Title, ChallengeExitButton(), Actions (+30 more)

### Community 15 - "ButtonContent"
Cohesion: 0.14
Nodes (27): `Button/index.jsx`, Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb() (+19 more)

### Community 16 - "getTierCost"
Cohesion: 0.12
Nodes (45): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Factory tier cost series: shared linear increments → per-tier constant increments — 2026-11-16 (#1098), Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model (+37 more)

### Community 17 - "storage.js"
Cohesion: 0.15
Nodes (26): 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, EON_UPGRADE_DEFINITIONS, buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), BUY_MAX_PREFERENCE_KEY, BUY_UNIT_PREFERENCE_KEY, coerceMeta(), completeDummySupporterPurchase() (+18 more)

### Community 18 - "DevModePage/index.jsx"
Cohesion: 0.10
Nodes (43): ButtonGrid, describeNumber(), Details, DevModePage(), FieldControls, FieldLabel, FieldNode(), FieldRow (+35 more)

### Community 19 - "with"
Cohesion: 0.05
Nodes (42): concurrency, cancel-in-progress, group, if, runs-on, steps, timeout-minutes, GH_TOKEN (+34 more)

### Community 20 - "store-assets/generate.mjs"
Cohesion: 0.14
Nodes (25): Changing the assets, NAVIGATION, args, captureScene(), filtered, main(), out(), PORT (+17 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.05
Nodes (41): concurrency, cancel-in-progress, group, CI_RUN_BRANCH, CI_RUN_CONCLUSION, GH_TOKEN, if, runs-on (+33 more)

### Community 22 - "[Unreleased]"
Cohesion: 0.09
Nodes (23): Accessibility, Added, Added, Added, Added, Added, Added, Added (+15 more)

### Community 23 - "steps"
Cohesion: 0.05
Nodes (39): concurrency, cancel-in-progress, group, GH_TOKEN, RUN_CONCLUSION, RUN_HEAD_SHA, RUN_ID, RUN_NAME (+31 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.06
Nodes (39): runs-on, steps, runs-on, steps, concurrency, cancel-in-progress, group, runs-on (+31 more)

### Community 25 - "auto-merge-after-adversarial-approve"
Cohesion: 0.06
Nodes (38): env, if, runs-on, steps, timeout-minutes, env, if, runs-on (+30 more)

### Community 26 - "navAttention.js"
Cohesion: 0.09
Nodes (41): Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, buySleepModeCapUpgrade(), getSleepModeCapLevel(), getSleepModeCapUpgradeCost(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable() (+33 more)

### Community 27 - "mergeState"
Cohesion: 0.14
Nodes (14): Added, Removed, Compact layouts per screen — three reversed decisions (2026-11-19, epic #1135), Faster autobuyer unlocks, 5× challenge unlocks, cheaper PP upgrades (2026-11), Migration in `src/save-migration/`, runs on every load — 2026-08-22, No grandfathering of unpurchased or unearned unlocks (2026-11-18, #1130), Save persistence, End-to-end testing (+6 more)

### Community 28 - "DiskArrayRow/index.jsx"
Cohesion: 0.11
Nodes (33): activeDiskColor(), CacheBlock, CacheBlocksRow, CacheFillIndicator, DiskArrayRow(), diskGlowPulse, DiskSizeRow, DiskSquare (+25 more)

### Community 29 - "InfoPage/index.jsx"
Cohesion: 0.07
Nodes (35): Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getTierTickspeedAutobuyerMilestone(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTOBUYER_INTERVAL_UPGRADE_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_STEP, BUY_MAX_UNLOCK_COST (+27 more)

### Community 30 - "env"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 31 - "gradlew"
Cohesion: 0.09
Nodes (28): devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2, jsdom@^31.0.0, @stryker-mutator/core@^10.1.1, @stryker-mutator/vitest-runner@^10.1.1, @testing-library/dom@^10.4.1, @testing-library/jest-dom@^7.0.1 (+20 more)

### Community 32 - "DailyTab.jsx"
Cohesion: 0.14
Nodes (29): canRestartDailyRun(), getDailyCredits(), getMsUntilNextUtcDay(), getUtcDateId(), isDailyAutomationOn(), ActionButton, AUTOMATION_GROUPS, AutomationSwitches() (+21 more)

### Community 33 - "Shared components reference"
Cohesion: 0.06
Nodes (33): #988 leftover mixed labels after stacking onto #990 (2026-11), Bits subline adds no Factory header height — 2026-11-09, CLAUDE.md Economy model duplication trim — 2026-09-03, Design history & rationale, Distribution, Documentation, Feature-card pairs stay side by side on phones (2026-11), Feature cards: half-width pairs → full-width rows; Clock Speed → Accelerate (2026-11-20) (+25 more)

### Community 34 - "App.jsx"
Cohesion: 0.15
Nodes (21): Theming reference, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot (+13 more)

### Community 35 - "steps"
Cohesion: 0.06
Nodes (31): name, permissions, runs-on, steps, strategy, jobs, analyze, include (+23 more)

### Community 36 - "steps"
Cohesion: 0.06
Nodes (31): concurrency, cancel-in-progress, group, MUTATE_OVERRIDE, mutate, jobs, mutation, default (+23 more)

### Community 37 - "simulate-challenges.mjs"
Cohesion: 0.10
Nodes (25): actCapacityUpgrade(), actFoundry(), actMainBuys(), actPlayer(), actPlayerBitRot(), actSoftResets(), actSpeedBonus(), actTickspeed() (+17 more)

### Community 38 - "MainActivity.java"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 39 - "steps"
Cohesion: 0.07
Nodes (28): concurrency, cancel-in-progress, group, GH_TOKEN, TARGET_INPUT, target_sha, jobs, open-revert-pr (+20 more)

### Community 40 - "adaptSaveForCurrentSchema"
Cohesion: 0.12
Nodes (21): Changed, 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report, Testing, SAVE_SCHEMA_VERSION (+13 more)

### Community 41 - "env"
Cohesion: 0.07
Nodes (27): CEILING_FULL, CLAUDE_OUTCOME, CODE_SCANNING_ALERTS, DEPENDABOT_ALERTS, DEPENDABOT_PRS, EVENT_SCHEDULE, FAILING_PRS, GH_TOKEN (+19 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.12
Nodes (27): PP Compute (Flops), Money, buyComputeFlopsTier(), canBuyComputeFlopsTier(), formatComputeFlopsTotal(), getComputeFlopsAffordableQuantity(), getComputeFlopsTierCost(), getComputeFlopsTierProductionMultiplier() (+19 more)

### Community 43 - "DataLakePanel/index.jsx"
Cohesion: 0.06
Nodes (113): Changed, actFoundry(), `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17 (+105 more)

### Community 44 - "steps"
Cohesion: 0.06
Nodes (32): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, default, description (+24 more)

### Community 45 - "steps"
Cohesion: 0.08
Nodes (24): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, FAIL_MARKER, GH_TOKEN (+16 more)

### Community 46 - "Economy model"
Cohesion: 0.05
Nodes (70): actSoftResets(), Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework (+62 more)

### Community 47 - "Procedure"
Cohesion: 0.17
Nodes (17): Security, 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation (DevModePage) (+9 more)

### Community 48 - "Automation workflows"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 49 - "manifest.mjs"
Cohesion: 0.15
Nodes (20): ALL_NAV, cardHtml(), composeControlRoom(), composeFrame(), composePanes(), composeRaw(), COMPOSERS, composeSingle() (+12 more)

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.09
Nodes (22): description, inputs, install, node-version, default, description, required, name (+14 more)

### Community 51 - "pr-conflict-sweep.yml"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_REPO, GH_TOKEN, jobs, sweep, name (+14 more)

### Community 52 - "steps"
Cohesion: 0.09
Nodes (22): BEFORE_SHA, GH_TOKEN, jobs, tag-and-release, name, on, push, permissions (+14 more)

### Community 53 - "epic-407-issue-hygiene.sh"
Cohesion: 0.10
Nodes (20): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+12 more)

### Community 54 - "file-task-issue/SKILL.md"
Cohesion: 0.17
Nodes (9): createPrefixedStorage(), installStoragePrefix(), rootElement, reportWebVitals(), createMonetizationService(), getMonetizationService(), createNoopMonetizationService(), NO_ENTITLEMENTS (+1 more)

### Community 55 - "orphan-branch-scan.sh"
Cohesion: 0.16
Nodes (15): ADS_PLUGIN, BASE_PLUGINS, buildIncludePlugins(), config, IAP_PLUGIN, root, srcPath, buildFeaturesModule() (+7 more)

### Community 56 - "tickGame"
Cohesion: 0.07
Nodes (44): 2. Load the repo's invariants, actPlayer(), actSpeedBonus(), BUY_QUANTITY, countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, formatCapacityLabel(), MAX_TICKS (+36 more)

### Community 57 - "Package.swift"
Cohesion: 0.10
Nodes (19): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+11 more)

### Community 58 - "CapApp-SPM/README.md"
Cohesion: 0.10
Nodes (21): dependencies, @capacitor/android@^8.6.2, @capacitor/ios@^8.6.2, @capacitor/splash-screen@^8.0.2, firebase@^13.2.0, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0, react@^19.3.1 (+13 more)

### Community 59 - "Testing"
Cohesion: 0.07
Nodes (49): A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim (+41 more)

### Community 60 - "stryker.config.json"
Cohesion: 0.10
Nodes (19): concurrency, coverageAnalysis, htmlReporter, fileName, jsonReporter, fileName, mutate, plugins (+11 more)

### Community 61 - "check-graphify-freshness.mjs"
Cohesion: 0.21
Nodes (12): ALLOWED_TOP_LEVEL_KEYS, analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findMalformedGraphEntries(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef() (+4 more)

### Community 62 - "Automation workflows"
Cohesion: 0.10
Nodes (20): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, CodeQL (`codeql.yml`), Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Main CI heal (`main-ci-heal.yml`, #37) (+12 more)

### Community 63 - "Forced priority order"
Cohesion: 0.27
Nodes (19): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Forced priority order, flooredBitsLabel(), floorToDecimals() (+11 more)

### Community 64 - "scripts"
Cohesion: 0.09
Nodes (22): scripts, android:aab, android:apk:release, audit, build, build:capacitor, build:dev, bump-version (+14 more)

### Community 65 - "capacitor.build.gradle"
Cohesion: 0.13
Nodes (12): deleteAccountAndData(), app, auth, db, deleteAccount(), downloadSave(), requireUser(), saveDocFor() (+4 more)

### Community 66 - "palette.md"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, on, push, permissions (+8 more)

### Community 67 - "ref_node_url"
Cohesion: 0.13
Nodes (6): workflow, workflowPath, script, zeroWork, script, script

### Community 68 - "config.js"
Cohesion: 0.16
Nodes (12): LegalSection(), LinkRow, ADMOB_TEST_REWARDED_IDS, IAP_PRODUCTS, PRIVACY_POLICY_URL, realRewardedIds, REMOVE_ADS_ENTITLEMENT, REVENUECAT_API_KEYS (+4 more)

### Community 69 - "lint-workflow-shell.mjs"
Cohesion: 0.31
Nodes (9): yaml@^2.9.1, yaml, bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main() (+1 more)

### Community 70 - "capacitor.settings.gradle"
Cohesion: 0.12
Nodes (16): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Main CI heal checkout is default-branch tip, not `workflow_run.head_sha` — 2026-11-11, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit (+8 more)

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.15
Nodes (13): match, yml, ADMOB_TEST_APP_ID_IOS, applyManagedAdsKeys(), buildManagedBlock(), END_MARKER, escapeXml(), SKADNETWORK_IDS (+5 more)

### Community 72 - "settings.gradle"
Cohesion: 0.13
Nodes (14): jobs, test, name, on, pull_request, push, permissions, contents (+6 more)

### Community 73 - "body"
Cohesion: 0.14
Nodes (13): description, label, placeholder, value, body, attributes, id, type (+5 more)

### Community 74 - "palette.md"
Cohesion: 0.14
Nodes (13): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+5 more)

### Community 75 - "resetByteFoundry"
Cohesion: 0.57
Nodes (7): Reset Byte Foundry convenience-auto now includes Capacity/Sacrifice — 2026-08-25, Reset Byte Foundry's convenience replay didn't cover partial Provision Disk passes — 2026-09-08, Two more gaps in Reset Byte Foundry's convenience-replay caps — 2026-09-08, captureFoundryUpgradeCaps(), mergeFoundryUpgradeCaps(), resetByteFoundry(), resetByteFoundryCore()

### Community 76 - "AchievementsPage/index.jsx"
Cohesion: 0.17
Nodes (23): getAchievementGroupStars(), getAchievementReward(), getAchievementShortRequirement(), getAchievementShortReward(), getAchievementStars(), getCompletedAchievementGroups(), isAchievementEarned(), ACHIEVEMENT_SERIES_BY_MEMBER (+15 more)

### Community 77 - "jsconfig.json"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Manual, Scripts, Security notes (+1 more)

### Community 78 - "Store listing drafts"
Cohesion: 0.14
Nodes (13): Apple — App Privacy ("nutrition label"), Cloud save on, Cloud save on (Firebase config set; ads and IAP off), Content rating (Play IARC questionnaire / App Store age rating), Google Play — Data safety, Listing text, No optional features (no Firebase config, ads and IAP off), Store assets (+5 more)

### Community 79 - "with"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, fetch-depth, github_token, node-version (+5 more)

### Community 81 - "Economy model — Byte Foundry (full text)"
Cohesion: 0.13
Nodes (55): Fixed, Removed, actCapacityUpgrade(), Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+47 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.18
Nodes (12): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp@^0.35.5, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), overwrite() (+4 more)

### Community 83 - "Copilot Instructions"
Cohesion: 0.17
Nodes (11): concurrency, cancel-in-progress, group, jobs, name, permissions, contents, id-token (+3 more)

### Community 84 - "with"
Cohesion: 0.17
Nodes (12): with, base_branch, branch_prefix, claude_args, claude_code_oauth_token, fetch-depth, github_token, install (+4 more)

### Community 85 - "Approved design"
Cohesion: 0.07
Nodes (27): Approved design, Control Room early (S2): only unlocked cards; empty right column dropped, Control Room (opt-in): Supply loop left, Factory centre, PP desk + Runs right, Desktop browser 1920×1080: same layout by size (shared max content width per pane is required, #1156), Galaxy Z Fold 7 inner (984×1016): two portrait pages, divider locked on the fold, Galaxy Z Fold 7 inner held sideways (1040×932): two portrait pages; fold is horizontal here, so treated as flat, iPhone Duo inner, held sideways (~890×626 pt): icon rail + two portrait pages on the fold, Large-screen layout mockups (epic #1152) (+19 more)

### Community 86 - "styled-components"
Cohesion: 0.26
Nodes (10): styled-components, BuyModeToggle(), ChoiceButton, OPTIONS, Row, Body, Card, IncompatibleSaveNotice() (+2 more)

### Community 87 - "pr-low-risk-eligible.sh"
Cohesion: 0.31
Nodes (11): allVerifiableChecked(), applyChecks(), CHECKLIST_ISSUE, CHECKS, classifyProjectsError(), formatReport(), gh(), main() (+3 more)

### Community 88 - "@playwright/test"
Cohesion: 0.20
Nodes (3): seededState, @playwright/test@^1.64.1, @playwright/test

### Community 89 - "slot"
Cohesion: 0.20
Nodes (10): slot, on, schedule, workflow_dispatch, cron, default, description, options (+2 more)

### Community 90 - "steps"
Cohesion: 0.20
Nodes (10): maintenance, runs-on, steps, timeout-minutes, continue-on-error, id, if, name (+2 more)

### Community 91 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 92 - "MilestonesPage/index.jsx"
Cohesion: 0.38
Nodes (9): isEraEligible(), Badge, Category, Event, Header, MilestonesPage(), RebootLine, RootDiv (+1 more)

### Community 93 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 94 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 95 - "Changelog"
Cohesion: 0.11
Nodes (18): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+10 more)

### Community 96 - "Shared components reference"
Cohesion: 0.15
Nodes (12): `AchievementToasts/index.jsx`, `AppMenu/index.jsx`, `AppNav/index.jsx`, `BoostBadge/index.jsx`, `BuyMaxToggle/index.jsx`, `BuyModeToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx` (+4 more)

### Community 97 - "clampNonNegative"
Cohesion: 0.08
Nodes (73): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Purge code rename: reboot → purge (2026-11, #987), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Achievements (epic #1046, basic slice), Constants (`src/game/layers.js`), Pause/resume for per-tier automations, Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier (+65 more)

### Community 98 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 99 - "lint-conflict-markers.mjs"
Cohesion: 0.33
Nodes (7): findConflictMarkers(), isScannable(), main(), MARKER_RE, E, L, R

### Community 100 - "dev-team/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 101 - "createInitialGameState"
Cohesion: 0.07
Nodes (39): @testing-library/react, vitest, withExpediteDisks(), purged(), lateGame(), allResourceIds(), autoCompleteChallenges(), SHIPPED_LIVE (+31 more)

### Community 102 - "store-release-notes.mjs"
Cohesion: 0.17
Nodes (18): 1. Re-verify store rules (they change several times a year), 2. Assets, 3. Copy and privacy, 4. Ship, APP_STORE_LIMIT, changelogSection(), firstSentence(), formatNotes() (+10 more)

### Community 103 - "env"
Cohesion: 0.25
Nodes (8): CI_RUN_BRANCH, CI_RUN_CONCLUSION, EVENT_NAME, GH_TOKEN, ISSUE_IS_PR, ISSUE_NUMBER, REVIEW_PR_NUMBER, env

### Community 104 - "on"
Cohesion: 0.25
Nodes (8): types, on, issue_comment, pull_request_review, workflow_run, types, types, workflows

### Community 105 - "AchievementToasts/index.jsx"
Cohesion: 0.18
Nodes (14): ACHIEVEMENT_TOAST_MAX_VISIBLE, ACHIEVEMENT_TOAST_STAGGER_MS, ACHIEVEMENT_TOAST_VISIBLE_MS, AchievementToasts(), createScheduler(), pump(), getEarnedIds(), isTabHidden() (+6 more)

### Community 106 - "resolutions"
Cohesion: 0.25
Nodes (8): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/@grpc/grpc-js, **/nanoid, **/typed-rest-client/qs, **/uuid

### Community 107 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 108 - "Android release (Google Play)"
Cohesion: 0.25
Nodes (7): Android release (Google Play), Build the signed AAB, Edge-to-edge, splash, icon, One-time setup, Optional features (all off by default), Permission audit, Upload to a testing track

### Community 109 - "Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04"
Cohesion: 0.16
Nodes (23): Boosters: timer bar with Pop / Forfeit / Stack; preset switch refunds unused stacks (2026-10), Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Compute Boost, activateComputeBoostCore(), canActivateComputeBoost(), canForfeitComputeBoost() (+15 more)

### Community 110 - "programmer.md"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 111 - "qa.md"
Cohesion: 0.29
Nodes (7): steps, continue-on-error, id, if, name, run, uses

### Community 113 - "BoostTimerBar/index.jsx"
Cohesion: 0.20
Nodes (18): BoostLane, BoostLaneRow(), BoostTimerBar(), BoostTimerRow, BoostTimerStack, CompactButton, describeCoveredTiers(), formatPresetDuration() (+10 more)

### Community 114 - "getComputeBoostLanes"
Cohesion: 0.23
Nodes (14): Compute Boost lanes (parallel multipliers + same-multiplier queue), Architecture 4b — `ComputePage/index.jsx`, boostGlow, boostPulse, COMPUTE_BOOST_LABELS, getComputeBoostDescription(), isBoostActive(), isDataStreamBoosted() (+6 more)

### Community 115 - "claude-deny-settings.sh"
Cohesion: 0.33
Nodes (5): App Store submission, iOS release (App Store), One-time setup, Prepare the project, TestFlight

### Community 116 - "pr-head-guard.sh"
Cohesion: 0.33
Nodes (5): concurrency, cancel-in-progress, group, jobs, name

### Community 117 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 118 - "model"
Cohesion: 0.40
Nodes (5): model, default, description, options, type

### Community 119 - "permissions"
Cohesion: 0.40
Nodes (5): permissions, actions, contents, id-token, pull-requests

### Community 120 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 121 - "inputs"
Cohesion: 0.14
Nodes (14): play_rollout, play_track, upload_listing, default, description, type, default, description (+6 more)

### Community 122 - "Daily challenges (epic #1062)"
Cohesion: 0.39
Nodes (9): Daily challenges: seeded conditions, head start, calculated targets (2026-11), Daily challenges (epic #1062), getRunProgress(), getRunValue(), isRunWon(), playDailyRun(), setRun(), settleRun() (+1 more)

### Community 123 - "store-release.yml"
Cohesion: 0.17
Nodes (11): concurrency, cancel-in-progress, group, jobs, name, on, push, workflow_dispatch (+3 more)

### Community 124 - "theme/index.jsx"
Cohesion: 0.06
Nodes (46): Theming, Layout classes (#1153, epic #1152), AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle (+38 more)

### Community 126 - "dailyChallenges.test.js"
Cohesion: 0.13
Nodes (12): DAILY_AUTOMATIONS, DAILY_BOT_ACTION_ORDER, DAILY_FORMAT_BY_ID, DAILY_FORMATS, DAILY_GENERATOR_VERSION, DAILY_MODIFIER_POOL, DAILY_OBJECTIVE_KINDS, forfeitDailyRun() (+4 more)

### Community 127 - "ChallengesPage/index.jsx"
Cohesion: 0.20
Nodes (13): Daily challenges (epic #1062), generate(), generateDailyChallenge(), getDailyChallengeValidation(), isDailyChallengesAvailable(), startDailyRun(), DAILY_CHALLENGES_FEATURE, CHALLENGE_TABS (+5 more)

### Community 128 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.20
Nodes (12): renderDiskArrayRow(), NoticeActions, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), renderNotice(), summary (+4 more)

### Community 129 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 130 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 131 - "followup"
Cohesion: 0.50
Nodes (4): if, runs-on, timeout-minutes, followup

### Community 132 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 133 - "admobAdapter.js"
Cohesion: 0.25
Nodes (8): @capacitor-community/admob@^8.2.1, @capacitor/core@^8.6.2, @capacitor-community/admob, @capacitor/core, getRewardedAdUnit(), createAdMobAdapter(), createRewardedAdCache(), REWARDED_AD_MAX_AGE_MS

### Community 137 - "Compact screen layouts (epic #1135)"
Cohesion: 0.29
Nodes (7): Challenges — `ChallengesPage` Factory / Daily tabs (#1139), Compact screen layouts (epic #1135), Compute (Flops) — `ComputeFlopsPage` (#1138), Factory feature cards (#1137), Firmware → Automation (#1140), Foundry open pool (#1142), Power merge chain (#1141)

### Community 138 - "large-screen-mockups/generate.mjs"
Cohesion: 0.20
Nodes (13): applyTweaks(), args, capturePane(), main(), outDir, PORT, galleryMarkdown(), cleanups (+5 more)

### Community 141 - "One-shot auto-convert"
Cohesion: 0.14
Nodes (25): Power merge chain and charge-built Chargers (2026-11-20, #1141), Sacrifice confirm: in-game dialog; Core warning only when unlocked, Sacrifice for 10x Capacity gated behind every other currently-possible action, One-shot auto-convert, Architecture — page renderers, autoBoostFromTier(), enableAutoMerge(), getChargerUnlockProgress() (+17 more)

### Community 175 - "engine.achievements.test.js"
Cohesion: 0.13
Nodes (21): Level power per-tier level requirements (2026-11-23), Spent QB gates last-tier credit; last tier may spend to 0 (2026-11), Achievements (epic #1046, basic slice), Economy model, activateComputeBoost(), areAllTierAutobuyersUnlocked(), bumpAchievementCounter(), detectAchievements() (+13 more)

### Community 176 - "env"
Cohesion: 0.15
Nodes (13): env, environment, if, runs-on, timeout-minutes, PLAY_PROMOTE_FROM, PLAY_ROLLOUT, PLAY_STATUS (+5 more)

### Community 177 - "env"
Cohesion: 0.20
Nodes (10): ASC_ISSUER_ID, ASC_KEY_ID, ASC_KEY_P8, KEY_ALIAS, KEY_PASSWORD, KEYSTORE, PLAY_JSON, PLAY_SERVICE_ACCOUNT_JSON (+2 more)

### Community 178 - "Store release (Google Play + App Store) — automated pipeline"
Cohesion: 0.17
Nodes (11): Devices covered, GitHub secrets (Settings → Secrets and variables → Actions → Secrets), GitHub variables (same page → Variables), Known release blocker, Large-screen and foldable readiness (app side), Maintainer prerequisites (in order), Running locally, Store release (Google Play + App Store) — automated pipeline (+3 more)

### Community 179 - "env"
Cohesion: 0.18
Nodes (11): APPLE_TEAM_ID, IOS_ACTION, TENS_ADMOB_APP_ID_IOS, VITE_ADMOB_REWARDED_ID_IOS, VITE_REVENUECAT_API_KEY_IOS, env, environment, if (+3 more)

### Community 180 - "with"
Cohesion: 0.17
Nodes (15): steps, steps, if, name, run, uses, with, bundler-cache (+7 more)

### Community 181 - "simulate-run-times/SKILL.md"
Cohesion: 0.33
Nodes (5): Reboot loop, Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run

### Community 182 - "env"
Cohesion: 0.25
Nodes (8): env, UPLOAD_LISTING, VITE_FIREBASE_API_KEY, VITE_FIREBASE_APP_ID, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_TENS_ADS_ENABLED, VITE_TENS_IAP_ENABLED

### Community 183 - "reboot-simulation.mjs"
Cohesion: 0.10
Nodes (15): actSpendPP(), argv, buyCapped(), buyWhilePossible(), maxPurges, maxSeconds, recent, rows (+7 more)

### Community 184 - "SpeedDetailsPopover/index.jsx"
Cohesion: 0.39
Nodes (7): react-dom@^19.3.1, react-dom, Heading, Note, Panel, Rows, SpeedDetailsPopover()

### Community 185 - "Dev Mode Reference"
Cohesion: 0.21
Nodes (21): Dev Mode, Dev Mode Reference, adaptSaveForLoad(), clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot(), discardIncompatibleActiveSaveIfNeeded() (+13 more)

### Community 186 - "play_status"
Cohesion: 0.40
Nodes (5): play_status, default, description, options, type

### Community 188 - "challengeUi.js"
Cohesion: 0.29
Nodes (6): getBitRotCorruption(), BITS_PER_BYTE, CLOCK_DRIFT_INTERVAL_SECONDS, DUTY_CYCLE_WINDOW_SECONDS, HARD_REFRESH_INTERVAL_SECONDS, PURGE_THRESHOLD

### Community 189 - "ios_action"
Cohesion: 0.40
Nodes (5): ios_action, default, description, options, type

### Community 190 - "Foundry multiplier bar: one diverging bar tried and dropped (2026-10)"
Cohesion: 0.29
Nodes (7): Bitrate exponent moves 10% toward 1.0 per new Disk size (2026-11), Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Pool-reset achievements tune Bitrate's within-pool exponent steps (2026-11), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), basisBitsForRawRate()

### Community 191 - "AutoBoostPresetPicker/index.jsx"
Cohesion: 0.60
Nodes (4): AutoBoostPresetPicker(), PresetButton, Row, COMPUTE_BOOST_DISPLAY

### Community 192 - "platforms"
Cohesion: 0.40
Nodes (5): platforms, default, description, options, type

### Community 193 - "play_promote_from"
Cohesion: 0.40
Nodes (5): play_promote_from, default, description, options, type

## Knowledge Gaps
- **7 isolated node(s):** `PackageDescription`, `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js`, `file:src/game/storagePrefix.test.js` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1219 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `createInitialGameState` to `OfflineProgressNotice/index.jsx`, `useIncrementalGame`, `layers.js`, `admobAdapter.js`, `engine.test.js`, `App.foundry.test.jsx`, `ButtonContent`, `gradlew`, `adaptSaveForCurrentSchema`, `engine.achievements.test.js`, `file-task-issue/SKILL.md`, `orphan-branch-scan.sh`, `Dev Mode Reference`, `capacitor.build.gradle`, `config.js`, `adversarialReviewMarker.js`, `theme/index.jsx`, `dailyChallenges.test.js`, `ChallengesPage/index.jsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 278 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `activateComputeBoost()` and `applyAutobuyerMilestones()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 278 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.039866555462885735 - nodes in this community are weakly interconnected._
- **Why does `Design history & rationale` connect `Shared components reference` to `MainPage/index.jsx`, `Key engine functions (`src/game/engine.js`)`, `Key engine functions (`src/game/engine.js`)`, `Automation workflows`, `engine.test.js`, `run-simulation.mjs`, `One-shot auto-convert`, `getTierCost`, `navAttention.js`, `mergeState`, `DataLakePanel/index.jsx`, `Economy model`, `engine.achievements.test.js`, `tickGame`, `Testing`, `Foundry multiplier bar: one diverging bar tried and dropped (2026-10)`, `capacitor.settings.gradle`, `resetByteFoundry`, `jsconfig.json`, `Economy model — Byte Foundry (full text)`, `clampNonNegative`, `Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04`, `getComputeBoostLanes`, `Daily challenges (epic #1062)`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `MainPage()` (e.g. with `Byte Foundry` and `Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework`) actually correct?**
  _`MainPage()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `Key engine functions (`src/game/engine.js`)` be split into smaller, more focused modules?**
  _Cohesion score 0.08928571428571429 - nodes in this community are weakly interconnected._