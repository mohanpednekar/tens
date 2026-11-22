# Graph Report - tens  (2026-11-22)

## Corpus Check
- 244 files · ~615,740 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 33 file(s) not represented in the graph (top: (none) 11, .xml 9, .properties 2)

## Summary
- 3616 nodes · 10840 edges · 191 communities (149 shown, 42 thin omitted)
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 2318 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f1ebdb7f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- One-shot auto-convert
- MainPage/index.jsx
- DiskArrayRow/index.jsx
- ComputePage/index.jsx
- layers.js
- Key engine functions (`src/game/engine.js`)
- createInitialGameState
- Automation workflows
- dailyChallenges.js
- engine.test.js
- engine.js
- SettingsPage/index.jsx
- run-simulation.mjs
- App.foundry.test.jsx
- FactoryTab.jsx
- navAttention.test.js
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
- AGENTS.md
- Economy model
- normalizePoolMemoryCapacity
- ExampleInstrumentedTest.java
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
- tickGame
- steps
- buyGlobalTickspeedMultiplier
- Procedure
- Automation workflows
- manifest.mjs
- backlog-issue-hygiene.sh
- pr-conflict-sweep.yml
- steps
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- orphan-branch-scan.sh
- generate-pwa-icons.mjs
- Package.swift
- CapApp-SPM/README.md
- vitest
- stryker.config.json
- optimize-ai-files/SKILL.md
- Automation workflows
- Dev Mode Reference
- scripts
- capacitor.build.gradle
- palette.md
- android/build.gradle
- config.js
- sync-release-milestones.sh
- capacitor.settings.gradle
- adversarialReviewMarker.js
- settings.gradle
- body
- palette.md
- clampNonNegative
- engine.achievements.test.js
- jsconfig.json
- Store listing drafts
- with
- ExampleInstrumentedTest.java
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- with
- Approved design
- src/index.jsx
- pr-low-risk-eligible.sh
- @playwright/test
- slot
- steps
- backlog-issue-hygiene.sh
- MilestonesPage/index.jsx
- check-graphify-freshness.mjs
- Procedure
- Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03
- Shared components reference
- ext-loader.mjs
- epic-407-issue-hygiene.sh
- lint-conflict-markers.mjs
- dev-team/SKILL.md
- FactoryTab.test.jsx
- store-release-notes.mjs
- env
- on
- BoostTimerBar/index.jsx
- resolutions
- optimize-ai-files/SKILL.md
- Foundry multiplier bar: one diverging bar tried and dropped (2026-10)
- getAutomationIntervalUpgradeCost
- programmer.md
- qa.md
- Button
- dailyChallenges.test.js
- Testing
- claude-deny-settings.sh
- pr-head-guard.sh
- sync-release-milestones.sh
- model
- permissions
- adversarialReviewMarker.js
- inputs
- vitest
- store-release.yml
- StoragePage/index.jsx
- isComputeMergeReserveStartAvailable
- ChallengesPage/index.jsx
- tickComputeMergeBoundary
- End-to-end specs (Playwright)
- pull_request_template.md
- followup
- jsconfig.json
- admobAdapter.js
- Daily challenges (epic #1062)
- MainActivity.java
- dev-team/SKILL.md
- VisuallyHidden
- README.md
- publish-strategy.sh
- PWA support reference
- Migration in `src/save-migration/`, runs on every load — 2026-08-22
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- orphan-branch-scan.sh
- pr-low-risk-eligible.sh
- resolve-pr-threads.sh
- sweep-stalled-auto-prs.sh
- .claude/CLAUDE.md
- session-start.sh
- Distribution
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
- Documentation
- env
- env
- Store release (Google Play + App Store) — automated pipeline
- env
- with
- ChallengeBanner/index.jsx
- env
- steps
- SpeedDetailsPopover/index.jsx
- platforms
- play_status
- play_track
- AutoBoostPresetPicker/index.jsx
- isBuyMaxUnlocked
- browserslist

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 269 edges
2. `MainPage()` - 121 edges
3. `useIncrementalGame()` - 114 edges
4. `ByteFoundryPage()` - 110 edges
5. `MainPage reference` - 105 edges
6. `Testing` - 87 edges
7. `tickGame()` - 86 edges
8. `clampNonNegative()` - 85 edges
9. `createInitialGameState()` - 85 edges
10. `Economy model — Byte Foundry (full text)` - 85 edges

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

## Communities (191 total, 42 thin omitted)

### Community 0 - "One-shot auto-convert"
Cohesion: 0.13
Nodes (24): `AppNav/index.jsx`, Compact layouts per screen — three reversed decisions (2026-11-19, epic #1135), Faster autobuyer unlocks, 5× challenge unlocks, cheaper PP upgrades (2026-11), No grandfathering of unpurchased or unearned unlocks (2026-11-18, #1130), Power merge chain and charge-built Chargers (2026-11-20, #1141), Sacrifice confirm: in-game dialog; Core warning only when unlocked, One-shot auto-convert, enableAutoMerge() (+16 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (112): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Fill multiplier 10× → 0.1× (log-linear) and a multiplicative tap bonus — 2026-10-30, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Forced priority order, Pool Memory Capacity and Bandwidth (+104 more)

### Community 2 - "DiskArrayRow/index.jsx"
Cohesion: 0.06
Nodes (82): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382) (+74 more)

### Community 3 - "ComputePage/index.jsx"
Cohesion: 0.13
Nodes (29): isComputeMergeStartAvailableAtBoundary(), ArmedStatusText, BoostCard, BoostRow, BoostsHint, canMerge(), ChargerBadge, ChargerStatus (+21 more)

### Community 4 - "layers.js"
Cohesion: 0.04
Nodes (102): allResourceIds(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, CHALLENGE_BOUNDARIES, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, FILL_CURVE_LN_A, FILL_CURVE_LN_B (+94 more)

### Community 5 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.08
Nodes (71): Byte Foundry, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Cache Warm targets the highest pool being filled (2026-11-19) (+63 more)

### Community 6 - "createInitialGameState"
Cohesion: 0.10
Nodes (47): Security notes, 2. Load the repo's invariants, Purge code rename: reboot → purge (2026-11, #987), Achievements (epic #1046, basic slice), Prestige Points, autobuyer unlock, and the tickspeed multiplier, Tiers, Prestige, Reboot (Era ascension), applyCacheWarm(), applyChallengeStepEffects() (+39 more)

### Community 7 - "Automation workflows"
Cohesion: 0.06
Nodes (79): Bits subline under MoneyHero; `+n/8` dropped from tier Buy buttons — 2026-11-09, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Single-line tier rows; exponential notation from 10,000 (2026-11), Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix, Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, MainPage reference, formatAsCleanBytesIfExactMultiple(), formatBytes() (+71 more)

### Community 8 - "dailyChallenges.js"
Cohesion: 0.08
Nodes (43): AUTOMATION_BY_KEY, buildDailyCandidate(), calculateAttemptMark(), calculateTarget(), createRng(), DAILY_CHECK_IN_PLANS, DAILY_MAX_CREDITS, DAILY_MAX_GENERATION_ATTEMPTS (+35 more)

### Community 9 - "engine.test.js"
Cohesion: 0.05
Nodes (16): getDataLakeCurrentDiskFillFraction, getLastTierLevelCreditIntervalSeconds(), isAnyComputeMergeInFlight(), startComputeCharge(), allChallengesCompleted(), eraEligibleState(), noOtherUpgradesLeft, PROV_FIRST (+8 more)

### Community 10 - "engine.js"
Cohesion: 0.07
Nodes (56): Architecture, `OfflineProgressNotice/index.jsx`, Buy mode (Level / Single), Offline progress, addActivePlaySeconds(), applyOfflineProgress(), applyOfflineRewardBonus(), AUTOBUYER_UNIT_BATCH (+48 more)

### Community 11 - "SettingsPage/index.jsx"
Cohesion: 0.14
Nodes (27): Settings + Milestones (#1143), getEonsAwarded(), buildClearSlotConfirmMessage(), Body, buildSparklinePath(), Caption, Chevron, Group (+19 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.08
Nodes (51): getFlopsAutobuyerUnlockEra(), getGlobalAutomationUnlockMilestone(), getTierTickspeedIntervalSeconds(), getTierTickspeedIntervalUpgradeCost(), AutomationRow(), Badge, Category, CategoryHeading (+43 more)

### Community 13 - "App.foundry.test.jsx"
Cohesion: 0.07
Nodes (35): version, @testing-library/user-event, derivePurchaseFieldsFromCounts(), expandSettingsSections(), openSettings(), seedMainGameState(), withExpediteDisks(), ALL_TIER_IDS (+27 more)

### Community 14 - "FactoryTab.jsx"
Cohesion: 0.14
Nodes (24): Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, getChallengeTitle(), getChallengeUnlockCondition(), getAutobuyerUnlockMilestone(), getChallengeUnlockPurges(), getTierTickspeedAutobuyerMilestone(), isChallengeCompleted(), ChallengesTab() (+16 more)

### Community 15 - "navAttention.test.js"
Cohesion: 0.10
Nodes (18): secondsToNext(), BITS_PER_BYTE, CLOCK_DRIFT_INTERVAL_SECONDS, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, DUTY_CYCLE_WINDOW_SECONDS, HARD_REFRESH_INTERVAL_SECONDS, INTRO_BYTE_COMBINE_COST (+10 more)

### Community 16 - "getTierCost"
Cohesion: 0.09
Nodes (56): 5. Authorization boundary, wouldAutobuyerStall(), Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run, Architecture / MainPage UI decisions (+48 more)

### Community 17 - "storage.js"
Cohesion: 0.13
Nodes (32): 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, createEmptyDataLakes(), createEmptyDataLakeTier(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), BUY_MAX_PREFERENCE_KEY, BUY_UNIT_PREFERENCE_KEY, coerceMeta() (+24 more)

### Community 18 - "DevModePage/index.jsx"
Cohesion: 0.10
Nodes (43): ButtonGrid, describeNumber(), Details, DevModePage(), FieldControls, FieldLabel, FieldNode(), FieldRow (+35 more)

### Community 19 - "with"
Cohesion: 0.05
Nodes (42): concurrency, cancel-in-progress, group, if, runs-on, steps, timeout-minutes, GH_TOKEN (+34 more)

### Community 20 - "store-assets/generate.mjs"
Cohesion: 0.11
Nodes (31): applyTweaks(), args, capturePane(), main(), outDir, PORT, galleryMarkdown(), cleanups (+23 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.05
Nodes (41): concurrency, cancel-in-progress, group, CI_RUN_BRANCH, CI_RUN_CONCLUSION, GH_TOKEN, if, runs-on (+33 more)

### Community 22 - "[Unreleased]"
Cohesion: 0.04
Nodes (44): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+36 more)

### Community 23 - "steps"
Cohesion: 0.05
Nodes (39): concurrency, cancel-in-progress, group, GH_TOKEN, RUN_CONCLUSION, RUN_HEAD_SHA, RUN_ID, RUN_NAME (+31 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.06
Nodes (39): runs-on, steps, runs-on, steps, concurrency, cancel-in-progress, group, runs-on (+31 more)

### Community 25 - "auto-merge-after-adversarial-approve"
Cohesion: 0.06
Nodes (38): env, if, runs-on, steps, timeout-minutes, env, if, runs-on (+30 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.10
Nodes (32): buySleepModeCapUpgrade(), getLiveChallengeForAutomation(), getPrestigeDoublePpUpgradeCost(), getSleepModeCapLevel(), getSleepModeCapUpgradeCost(), isAutomationIntervalChainUnlocked, isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable() (+24 more)

### Community 27 - "Economy model"
Cohesion: 0.07
Nodes (45): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Prestige history: why PP replaced direct production doubling, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, Reintroducing the 1s-10s tickspeed ladder (+37 more)

### Community 28 - "normalizePoolMemoryCapacity"
Cohesion: 0.08
Nodes (80): Fixed, Removed, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09, Devin Review on PR #614: a false-update bug, a stale comment, and a deliberately-unfixed legacy-save ambiguity — 2026-09-09 (+72 more)

### Community 29 - "ExampleInstrumentedTest.java"
Cohesion: 0.07
Nodes (32): A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTOBUYER_INTERVAL_UPGRADE_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_STEP, AUTOMATION_INTERVAL_CONFIG, BUY_MAX_UNLOCK_COST, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER (+24 more)

### Community 30 - "env"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 31 - "gradlew"
Cohesion: 0.09
Nodes (28): devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2, jsdom@^31.0.0, @stryker-mutator/core@^10.1.1, @stryker-mutator/vitest-runner@^10.1.1, @testing-library/dom@^10.4.1, @testing-library/jest-dom@^7.0.1 (+20 more)

### Community 32 - "DailyTab.jsx"
Cohesion: 0.13
Nodes (30): StatCard, canRestartDailyRun(), getDailyCredits(), getMsUntilNextUtcDay(), getUtcDateId(), isDailyAutomationOn(), ActionButton, AUTOMATION_GROUPS (+22 more)

### Community 33 - "Shared components reference"
Cohesion: 0.07
Nodes (30): #988 leftover mixed labels after stacking onto #990 (2026-11), Bits subline adds no Factory header height — 2026-11-09, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost lanes (parallel multipliers + same-multiplier queue), Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Stream balance kept through Prestige (#1096), Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale (+22 more)

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
Cohesion: 0.13
Nodes (20): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report, Testing, SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason() (+12 more)

### Community 41 - "env"
Cohesion: 0.07
Nodes (27): CEILING_FULL, CLAUDE_OUTCOME, CODE_SCANNING_ALERTS, DEPENDABOT_ALERTS, DEPENDABOT_PRS, EVENT_SCHEDULE, FAILING_PRS, GH_TOKEN (+19 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.09
Nodes (35): 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, Money, buyComputeFlopsTier(), buyComputeFlopsTierQuantity(), canBuyComputeFlopsTier(), formatComputeFlopsTotal(), getComputeFlopsAffordableAndCost(), getComputeFlopsAffordableQuantity() (+27 more)

### Community 43 - "DataLakePanel/index.jsx"
Cohesion: 0.06
Nodes (117): Changed, actCapacityUpgrade(), actFoundry(), formatCapacityLabel(), `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too (+109 more)

### Community 44 - "tickGame"
Cohesion: 0.09
Nodes (53): A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock no longer banks completed levels — 2026-11-11, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too (+45 more)

### Community 45 - "steps"
Cohesion: 0.08
Nodes (24): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, FAIL_MARKER, GH_TOKEN (+16 more)

### Community 46 - "buyGlobalTickspeedMultiplier"
Cohesion: 0.27
Nodes (11): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, The global tickspeed multiplier, buyGlobalTickspeedMultiplier(), isGlobalTickspeedMultiplierUnlocked(), getTiersAttentionLevel(), hasAffordableGlobalTickspeed(), hasPurgeAttention(), hasScaleUpAvailable() (+3 more)

### Community 47 - "Procedure"
Cohesion: 0.17
Nodes (17): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation (DevModePage), 2026-08-25 - Defense in Depth: Content Security Policy (+9 more)

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
Cohesion: 0.09
Nodes (21): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+13 more)

### Community 54 - "file-task-issue/SKILL.md"
Cohesion: 0.17
Nodes (12): NoticeActions, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), renderNotice(), summary, createMonetizationService() (+4 more)

### Community 55 - "orphan-branch-scan.sh"
Cohesion: 0.18
Nodes (14): ADS_PLUGIN, BASE_PLUGINS, buildIncludePlugins(), config, IAP_PLUGIN, root, buildFeaturesModule(), createViteConfig() (+6 more)

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.13
Nodes (22): actMainBuys(), actPlayer(), actSoftResets(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPurges (+14 more)

### Community 57 - "Package.swift"
Cohesion: 0.10
Nodes (18): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+10 more)

### Community 58 - "CapApp-SPM/README.md"
Cohesion: 0.09
Nodes (23): dependencies, @capacitor/android@^8.5.3, @capacitor/ios@^8.5.3, @capacitor/splash-screen@^8.0.2, firebase@^13.2.0, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0, react@^19.3.1 (+15 more)

### Community 59 - "vitest"
Cohesion: 0.09
Nodes (23): styled-components, renderDiskArrayRow(), ui(), renderButton(), renderWithTheme(), wrap(), wrap(), renderInTheme() (+15 more)

### Community 60 - "stryker.config.json"
Cohesion: 0.10
Nodes (19): concurrency, coverageAnalysis, htmlReporter, fileName, jsonReporter, fileName, mutate, plugins (+11 more)

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.10
Nodes (16): yaml@^2.9.1, yaml, workflow, workflowPath, script, zeroWork, bashSyntaxError(), collectYamlFiles() (+8 more)

### Community 62 - "Automation workflows"
Cohesion: 0.10
Nodes (19): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, CodeQL (`codeql.yml`), Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Main CI heal (`main-ci-heal.yml`, #37) (+11 more)

### Community 63 - "Dev Mode Reference"
Cohesion: 0.26
Nodes (17): Dev Mode, Security notes, Dev Mode Reference, adaptSaveForLoad(), clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot() (+9 more)

### Community 64 - "scripts"
Cohesion: 0.09
Nodes (22): scripts, android:aab, android:apk:release, audit, build, build:capacitor, build:dev, bump-version (+14 more)

### Community 65 - "capacitor.build.gradle"
Cohesion: 0.13
Nodes (12): deleteAccountAndData(), app, auth, db, deleteAccount(), downloadSave(), requireUser(), saveDocFor() (+4 more)

### Community 66 - "palette.md"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, on, push, permissions (+8 more)

### Community 67 - "android/build.gradle"
Cohesion: 0.15
Nodes (14): match, yml, ALLOWED_TOP_LEVEL_KEYS, analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findMalformedGraphEntries(), findUncoveredGraphifyFiles() (+6 more)

### Community 68 - "config.js"
Cohesion: 0.16
Nodes (12): LegalSection(), LinkRow, ADMOB_TEST_REWARDED_IDS, IAP_PRODUCTS, PRIVACY_POLICY_URL, realRewardedIds, REMOVE_ADS_ENTITLEMENT, REVENUECAT_API_KEYS (+4 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.12
Nodes (26): `Button/index.jsx`, Button, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, progressFill(), pulse (+18 more)

### Community 70 - "capacitor.settings.gradle"
Cohesion: 0.12
Nodes (16): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Main CI heal checkout is default-branch tip, not `workflow_run.head_sha` — 2026-11-11, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit (+8 more)

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.29
Nodes (9): ADMOB_TEST_APP_ID_IOS, applyManagedAdsKeys(), buildManagedBlock(), END_MARKER, escapeXml(), SKADNETWORK_IDS, START_MARKER, plist (+1 more)

### Community 72 - "settings.gradle"
Cohesion: 0.13
Nodes (14): jobs, test, name, on, pull_request, push, permissions, contents (+6 more)

### Community 73 - "body"
Cohesion: 0.14
Nodes (13): description, label, placeholder, value, body, attributes, id, type (+5 more)

### Community 74 - "palette.md"
Cohesion: 0.14
Nodes (13): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+5 more)

### Community 75 - "clampNonNegative"
Cohesion: 0.14
Nodes (26): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Buy max mode, Prestige info is hidden until first prestige, Reboot and Kernels (#407), Tier autobuyer/tier-tickspeed-autobuyer milestones, applyFlopsAutobuyerMilestones(), buyAutobuyerIntervalUpgrade(), buyAutomationIntervalUpgrade() (+18 more)

### Community 76 - "engine.achievements.test.js"
Cohesion: 0.07
Nodes (51): Achievements (epic #1046, basic slice), Economy model, ACHIEVEMENT_TOAST_MAX_VISIBLE, ACHIEVEMENT_TOAST_STAGGER_MS, ACHIEVEMENT_TOAST_VISIBLE_MS, AchievementToasts(), createScheduler(), pump() (+43 more)

### Community 77 - "jsconfig.json"
Cohesion: 0.25
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Manual, Scripts, Security notes, Tens

### Community 78 - "Store listing drafts"
Cohesion: 0.14
Nodes (13): Apple — App Privacy ("nutrition label"), Cloud save on, Cloud save on (Firebase config set; ads and IAP off), Content rating (Play IARC questionnaire / App Store age rating), Google Play — Data safety, Listing text, No optional features (no Firebase config, ads and IAP off), Store assets (+5 more)

### Community 79 - "with"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, fetch-depth, github_token, node-version (+5 more)

### Community 81 - "publish-strategy.sh"
Cohesion: 0.19
Nodes (17): `BoostBadge/index.jsx`, Architecture 4b — `ComputePage/index.jsx`, boostGlow, boostPulse, COMPUTE_BOOST_LABELS, getComputeBoostDescription(), isBoostActive(), isDataStreamBoosted() (+9 more)

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

### Community 86 - "src/index.jsx"
Cohesion: 0.31
Nodes (4): createPrefixedStorage(), installStoragePrefix(), rootElement, reportWebVitals()

### Community 87 - "pr-low-risk-eligible.sh"
Cohesion: 0.35
Nodes (9): allVerifiableChecked(), applyChecks(), CHECKLIST_ISSUE, CHECKS, gh(), main(), runChecks(), BODY (+1 more)

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

### Community 93 - "check-graphify-freshness.mjs"
Cohesion: 0.38
Nodes (7): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear()

### Community 94 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 95 - "Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03"
Cohesion: 0.23
Nodes (21): Boosters: timer bar with Pop / Forfeit / Stack; preset switch refunds unused stacks (2026-10), Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Compute Boost, activateComputeBoost(), autoBoostFromTier(), canActivateComputeBoost() (+13 more)

### Community 96 - "Shared components reference"
Cohesion: 0.18
Nodes (10): `AchievementToasts/index.jsx`, `AppMenu/index.jsx`, `BuyMaxToggle/index.jsx`, `BuyModeToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference (+2 more)

### Community 97 - "ext-loader.mjs"
Cohesion: 0.20
Nodes (5): args, dates, DAYS, FROM, ONE

### Community 98 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 99 - "lint-conflict-markers.mjs"
Cohesion: 0.33
Nodes (7): findConflictMarkers(), isScannable(), main(), MARKER_RE, E, L, R

### Community 100 - "dev-team/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 101 - "FactoryTab.test.jsx"
Cohesion: 0.12
Nodes (14): getAutobuyerBaseIntervalSeconds(), getAutobuyerBulkExtraLevels(), getAutobuyerBulkLevels(), getAutobuyerIntervalMaxLevel(), getAutobuyerIntervalSeconds(), getAutobuyerIntervalSecondsAtLevel(), getAutobuyerSpeedUpgradeMaxLevel(), getAutomationIntervalMaxLevel() (+6 more)

### Community 102 - "store-release-notes.mjs"
Cohesion: 0.15
Nodes (19): Android release (Google Play), Build the signed AAB, Edge-to-edge, splash, icon, One-time setup, Optional features (all off by default), Permission audit, Upload to a testing track, APP_STORE_LIMIT (+11 more)

### Community 103 - "env"
Cohesion: 0.25
Nodes (8): CI_RUN_BRANCH, CI_RUN_CONCLUSION, EVENT_NAME, GH_TOKEN, ISSUE_IS_PR, ISSUE_NUMBER, REVIEW_PR_NUMBER, env

### Community 104 - "on"
Cohesion: 0.25
Nodes (8): types, on, issue_comment, pull_request_review, workflow_run, types, types, workflows

### Community 105 - "BoostTimerBar/index.jsx"
Cohesion: 0.19
Nodes (20): BoostLane, BoostLaneRow(), BoostTimerBar(), BoostTimerRow, BoostTimerStack, CompactButton, describeCoveredTiers(), formatPresetDuration() (+12 more)

### Community 106 - "resolutions"
Cohesion: 0.25
Nodes (8): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/@grpc/grpc-js, **/nanoid, **/typed-rest-client/qs, **/uuid

### Community 107 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 108 - "Foundry multiplier bar: one diverging bar tried and dropped (2026-10)"
Cohesion: 0.29
Nodes (7): Bitrate exponent moves 10% toward 1.0 per new Disk size (2026-11), Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Pool-reset achievements tune Bitrate's within-pool exponent steps (2026-11), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), basisBitsForRawRate()

### Community 109 - "getAutomationIntervalUpgradeCost"
Cohesion: 0.60
Nodes (5): Perks regrouped by feature: Unlocks / Upgrades / Toggles → Automation / Prestige — 2026-11-03, getAutobuyerIntervalUpgradeCost(), getAutomationIntervalUpgradeCost(), getSiCleanDoublingFactor(), siCleanSeriesCost()

### Community 110 - "programmer.md"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 111 - "qa.md"
Cohesion: 0.29
Nodes (7): steps, continue-on-error, id, if, name, run, uses

### Community 112 - "Button"
Cohesion: 0.24
Nodes (16): react, ButtonContent(), CloudSaveSection(), DELETE_STEP_MESSAGES, errorStatus(), IMPORT_ERRORS, ManualSaveSection(), SaveText (+8 more)

### Community 113 - "dailyChallenges.test.js"
Cohesion: 0.11
Nodes (18): Daily challenges (epic #1062), DAILY_AUTOMATIONS, DAILY_BOT_ACTION_ORDER, DAILY_FORMAT_BY_ID, DAILY_FORMATS, DAILY_GENERATOR_VERSION, DAILY_MODIFIER_POOL, DAILY_OBJECTIVE_KINDS (+10 more)

### Community 114 - "Testing"
Cohesion: 0.09
Nodes (27): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Compute Boost base presets: fixing a total-extra-production ordering bug, Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755), Cost icon: 🎯 replaced by 🏷️ (`COST_ICON`) (+19 more)

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
Nodes (14): ios_action, play_rollout, upload_listing, default, description, options, type, default (+6 more)

### Community 122 - "vitest"
Cohesion: 0.21
Nodes (9): Native apps (Capacitor — #70), Native apps (Capacitor) reference, @testing-library/react, vitest, saveGameState(), serializeSaveForExport(), slotTimestampKey(), withEarned() (+1 more)

### Community 123 - "store-release.yml"
Cohesion: 0.17
Nodes (11): concurrency, cancel-in-progress, group, jobs, name, on, push, workflow_dispatch (+3 more)

### Community 124 - "StoragePage/index.jsx"
Cohesion: 0.70
Nodes (4): Header, RootDiv, StoragePage(), Title

### Community 126 - "isComputeMergeReserveStartAvailable"
Cohesion: 0.17
Nodes (12): Boosters: manual merge on automated tiers became instant (2026-10), instantComputeMergeAtBoundary(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable(), isComputeFabricsMergeStartAvailable(), isComputeGridsMergeStartAvailable() (+4 more)

### Community 127 - "ChallengesPage/index.jsx"
Cohesion: 0.26
Nodes (9): isDailyChallengesAvailable(), DAILY_CHALLENGES_FEATURE, base(), CHALLENGE_TABS, ChallengesPage(), Header, RootDiv, TabBar (+1 more)

### Community 128 - "tickComputeMergeBoundary"
Cohesion: 0.20
Nodes (10): tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer(), tickAutoMergeFabricsIntoCloud(), tickAutoMergeGridsIntoFabric(), tickAutoMergeNetworksIntoGrid(), tickAutoMergeNodesIntoCluster() (+2 more)

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
Nodes (8): @capacitor-community/admob@^8.2.1, @capacitor/core@^8.5.3, @capacitor-community/admob, @capacitor/core, getRewardedAdUnit(), createAdMobAdapter(), createRewardedAdCache(), REWARDED_AD_MAX_AGE_MS

### Community 134 - "Daily challenges (epic #1062)"
Cohesion: 0.39
Nodes (9): Daily challenges: seeded conditions, head start, calculated targets (2026-11), Daily challenges (epic #1062), getRunProgress(), getRunValue(), isRunWon(), playDailyRun(), setRun(), settleRun() (+1 more)

### Community 137 - "VisuallyHidden"
Cohesion: 0.14
Nodes (14): Challenges — `ChallengesPage` Factory / Daily tabs (#1139), Compact screen layouts (epic #1135), Compute (Flops) — `ComputeFlopsPage` (#1138), Factory feature cards (#1137), Firmware → Automation (#1140), Foundry open pool (#1142), Power merge chain (#1141), ButtonIcon (+6 more)

### Community 176 - "env"
Cohesion: 0.20
Nodes (10): env, if, runs-on, PLAY_ROLLOUT, PLAY_STATUS, PLAY_TRACK, TENS_ADMOB_APP_ID_ANDROID, VITE_ADMOB_REWARDED_ID_ANDROID (+2 more)

### Community 177 - "env"
Cohesion: 0.20
Nodes (10): ASC_ISSUER_ID, ASC_KEY_ID, ASC_KEY_P8, KEY_ALIAS, KEY_PASSWORD, KEYSTORE, PLAY_JSON, PLAY_SERVICE_ACCOUNT_JSON (+2 more)

### Community 178 - "Store release (Google Play + App Store) — automated pipeline"
Cohesion: 0.22
Nodes (8): Changing the assets, GitHub secrets (Settings → Secrets and variables → Actions → Secrets), GitHub variables (same page → Variables), Maintainer prerequisites (in order), Running locally, Store release (Google Play + App Store) — automated pipeline, What can never be automated (store policy / no API), What is automated

### Community 179 - "env"
Cohesion: 0.22
Nodes (9): APPLE_TEAM_ID, IOS_ACTION, TENS_ADMOB_APP_ID_IOS, VITE_ADMOB_REWARDED_ID_IOS, VITE_REVENUECAT_API_KEY_IOS, env, if, runs-on (+1 more)

### Community 180 - "with"
Cohesion: 0.22
Nodes (9): with, bundler-cache, cache, distribution, if-no-files-found, java-version, name, path (+1 more)

### Community 181 - "ChallengeBanner/index.jsx"
Cohesion: 0.44
Nodes (8): Banner, ChallengeBanner(), Rule, Text, Title, formatChallengeGoal(), formatChallengeTime(), getChallengeReadouts()

### Community 182 - "env"
Cohesion: 0.25
Nodes (8): env, UPLOAD_LISTING, VITE_FIREBASE_API_KEY, VITE_FIREBASE_APP_ID, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_TENS_ADS_ENABLED, VITE_TENS_IAP_ENABLED

### Community 183 - "steps"
Cohesion: 0.53
Nodes (6): steps, steps, if, name, run, uses

### Community 184 - "SpeedDetailsPopover/index.jsx"
Cohesion: 0.60
Nodes (5): Heading, Note, Panel, Rows, SpeedDetailsPopover()

### Community 185 - "platforms"
Cohesion: 0.40
Nodes (5): platforms, default, description, options, type

### Community 186 - "play_status"
Cohesion: 0.40
Nodes (5): play_status, default, description, options, type

### Community 187 - "play_track"
Cohesion: 0.40
Nodes (5): play_track, default, description, options, type

### Community 188 - "AutoBoostPresetPicker/index.jsx"
Cohesion: 0.60
Nodes (4): AutoBoostPresetPicker(), PresetButton, Row, COMPUTE_BOOST_DISPLAY

### Community 189 - "isBuyMaxUnlocked"
Cohesion: 0.70
Nodes (3): BuyMaxToggle(), Switch, isBuyMaxUnlocked()

### Community 190 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

## Knowledge Gaps
- **7 isolated node(s):** `PackageDescription`, `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js`, `file:src/game/storagePrefix.test.js` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1156 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `layers.js`, `admobAdapter.js`, `createInitialGameState`, `engine.test.js`, `App.foundry.test.jsx`, `navAttention.test.js`, `storage.js`, `gradlew`, `adaptSaveForCurrentSchema`, `file-task-issue/SKILL.md`, `orphan-branch-scan.sh`, `capacitor.build.gradle`, `android/build.gradle`, `config.js`, `adversarialReviewMarker.js`, `engine.achievements.test.js`, `FactoryTab.test.jsx`, `Button`, `dailyChallenges.test.js`, `ChallengesPage/index.jsx`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 268 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `activateComputeBoost()` and `applyAutobuyerMilestones()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 268 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `One-shot auto-convert` be split into smaller, more focused modules?**
  _Cohesion score 0.12681159420289856 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `scripts` to `gradlew`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `MainPage()` (e.g. with `Byte Foundry` and `Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework`) actually correct?**
  _`MainPage()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.042074212078869744 - nodes in this community are weakly interconnected._