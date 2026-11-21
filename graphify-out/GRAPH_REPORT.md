# Graph Report - tens  (2026-11-21)

## Corpus Check
- 233 files · ~605,111 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 9, (none) 8, .properties 2)

## Summary
- 3437 nodes · 10507 edges · 182 communities (144 shown, 38 thin omitted)
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 2304 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0dbae42c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- One-shot auto-convert
- MainPage/index.jsx
- Testing
- ComputePage/index.jsx
- layers.js
- tickPoolBufferFill
- createInitialGameState
- Automation workflows
- dailyChallenges.js
- engine.test.js
- engine.js
- SettingsPage/index.jsx
- run-simulation.mjs
- App.foundry.test.jsx
- FactoryTab.jsx
- engine.computeFlops.test.js
- getTierCost
- storage.js
- DevModePage/index.jsx
- with
- Key engine functions (`src/game/engine.js`)
- bump-version.mjs
- [Unreleased]
- steps
- ComputeFlopsPage/index.jsx
- auto-merge-after-adversarial-approve
- AGENTS.md
- Economy model
- normalizePoolMemoryCapacity
- applyAutobuyerMilestones
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
- tickGameCore
- steps
- clampNonNegative
- Procedure
- Automation workflows
- manifest.mjs
- backlog-issue-hygiene.sh
- pr-conflict-sweep.yml
- steps
- epic-407-issue-hygiene.sh
- useIncrementalGame
- orphan-branch-scan.sh
- generate-pwa-icons.mjs
- Package.swift
- CapApp-SPM/README.md
- vitest
- stryker.config.json
- ref_node_path
- Automation workflows
- Dev Mode Reference
- scripts
- capacitor.build.gradle
- palette.md
- android/build.gradle
- config.js
- Button/index.jsx
- capacitor.settings.gradle
- ref_node_fs
- settings.gradle
- body
- palette.md
- isProductionFrozen
- pull_request_template.md
- jsconfig.json
- Store listing drafts
- with
- ExampleInstrumentedTest.java
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- with
- Approved design
- enable-auto-merge-if-eligible.sh
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
- MainPage reference
- Android release (Google Play)
- env
- on
- BoostTimerBar/index.jsx
- resolutions
- optimize-ai-files/SKILL.md
- Foundry multiplier bar: one diverging bar tried and dropped (2026-10)
- hasAffordableAutomationPerk
- programmer.md
- qa.md
- Button
- dailyChallenges.test.js
- getPoolBufferBits
- claude-deny-settings.sh
- pr-head-guard.sh
- sync-release-milestones.sh
- model
- permissions
- adversarialReviewMarker.js
- generate.mjs
- BuyModeToggle/index.jsx
- AutomationRow
- DiskArrayRow/index.jsx
- resetByteFoundry
- ChallengesPage/index.jsx
- challengeUi.js
- End-to-end specs (Playwright)
- pull_request_template.md
- followup
- jsconfig.json
- startDailyRun
- Daily challenges (epic #1062)
- MainActivity.java
- dev-team/SKILL.md
- Compact screen layouts (epic #1135)
- admobAdapter.js
- publish-strategy.sh
- PWA support reference
- mergeState
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- orphan-branch-scan.sh
- pr-low-risk-eligible.sh
- resolve-pr-threads.sh
- sweep-stalled-auto-prs.sh
- .claude/CLAUDE.md
- session-start.sh
- SpeedDetailsPopover/index.jsx
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
- economy-change-review/SKILL.md
- AutoBoostPresetPicker/index.jsx
- VisuallyHidden
- isBuyMaxUnlocked
- Native apps (Capacitor — #70)
- getPrestigePowersPerPp
- browserslist

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 268 edges
2. `MainPage()` - 121 edges
3. `useIncrementalGame()` - 113 edges
4. `ByteFoundryPage()` - 110 edges
5. `MainPage reference` - 104 edges
6. `Testing` - 87 edges
7. `tickGame()` - 86 edges
8. `clampNonNegative()` - 85 edges
9. `Economy model — Byte Foundry (full text)` - 85 edges
10. `createInitialGameState()` - 83 edges

## Surprising Connections (you probably didn't know these)
- `A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too` --references--> `formatCapacityLabel()`  [INFERRED]
  docs/DESIGN_HISTORY.md → .claude/skills/simulate-run-times/run-simulation.mjs
- `Release (`release.yml`)` --references--> `extractVersionSection()`  [INFERRED]
  docs/AUTOMATION.md → scripts/bump-version.mjs
- `Scheduled maintenance (`autonomous-maintenance.yml`)` --references--> `gh()`  [INFERRED]
  docs/AUTOMATION.md → scripts/verify-maintainer-checklist.mjs
- `Storage auto-redeem toggle button removed for now, default flipped to always-on` --references--> `createInitialGameState()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (182 total, 38 thin omitted)

### Community 0 - "One-shot auto-convert"
Cohesion: 0.18
Nodes (21): Power merge chain and charge-built Chargers (2026-11-20, #1141), Removing Claim Core: superseded by Data Lake Boosters, One-shot auto-convert, Architecture 4b — `ComputePage/index.jsx`, Architecture — page renderers, getChargerUnlockProgress(), getComputeChargeSeconds(), getComputeChargeTransfers() (+13 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.05
Nodes (76): Fill multiplier 10× → 0.1× (log-linear) and a multiplicative tap bonus — 2026-10-30, formatDiskSizeInPoolUnit(), formatPoolBalance(), formatPoolBalanceStable(), formatSpeedText(), formatThreeSignificant(), getComputeBoostPoolMultiplier(), getDataStreamSpeedExponent() (+68 more)

### Community 2 - "Testing"
Cohesion: 0.07
Nodes (67): What it does, `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks (+59 more)

### Community 3 - "ComputePage/index.jsx"
Cohesion: 0.13
Nodes (29): isComputeMergeStartAvailableAtBoundary(), ArmedStatusText, BoostCard, BoostRow, BoostsHint, canMerge(), ChargerBadge, ChargerStatus (+21 more)

### Community 4 - "layers.js"
Cohesion: 0.03
Nodes (105): TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, ACHIEVEMENT_BY_ID, AUTOBUYER_BASE_INTERVAL_SECONDS, AUTOBUYER_BULK_MAX_EXTRA_LEVELS, AUTOBUYER_INTERVAL_MULTIPLIER, AUTOBUYER_INTERVAL_UPGRADE_BASE_COST, AUTOBUYER_MIN_INTERVAL_SECONDS, AUTOBUYER_UNLOCK_BASE_COST (+97 more)

### Community 5 - "tickPoolBufferFill"
Cohesion: 0.17
Nodes (31): A fourth Codex round: the "absolute ceiling" clamp itself was too high, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Cache Warm targets the highest pool being filled (2026-11-19), Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card, Foundry Memory always keeps the highest Disk row (issue #389), Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Pool cards gated on a capacity threshold too; read cache pre-fills on pool unlock; manual transfer-block UI removed (+23 more)

### Community 6 - "createInitialGameState"
Cohesion: 0.05
Nodes (57): Security notes, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, @testing-library/react, vitest, withExpediteDisks(), lateGame(), allResourceIds(), applyChallengeStepEffects() (+49 more)

### Community 7 - "Automation workflows"
Cohesion: 0.06
Nodes (68): Bits subline under MoneyHero; `+n/8` dropped from tier Buy buttons — 2026-11-09, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Single-line tier rows; exponential notation from 10,000 (2026-11), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, ButtonIcon, ButtonLabel, formatAsCleanBytesIfExactMultiple() (+60 more)

### Community 8 - "dailyChallenges.js"
Cohesion: 0.10
Nodes (39): AUTOMATION_BY_KEY, buildDailyCandidate(), calculateAttemptMark(), calculateTarget(), createRng(), DAILY_CHECK_IN_PLANS, DAILY_MAX_CREDITS, DAILY_MAX_GENERATION_ATTEMPTS (+31 more)

### Community 9 - "engine.test.js"
Cohesion: 0.04
Nodes (36): getDataLakeCurrentDiskFillFraction, isAnyComputeMergeInFlight(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable(), isComputeFabricsMergeStartAvailable(), isComputeGridsMergeStartAvailable() (+28 more)

### Community 10 - "engine.js"
Cohesion: 0.05
Nodes (66): applyCacheWarm(), AUTO_MERGE_TICKERS, AUTOBUYER_UNIT_BATCH, BIT_UNIT_SYMBOLS, buyCacheWarm(), buyPlaytimeBonus(), CHALLENGE_BOUNDARIES, COMPUTE_MERGE_TIMER_FIELDS (+58 more)

### Community 11 - "SettingsPage/index.jsx"
Cohesion: 0.14
Nodes (27): Settings + Milestones (#1143), getEonsAwarded(), buildClearSlotConfirmMessage(), Body, buildSparklinePath(), Caption, Chevron, Group (+19 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.11
Nodes (37): getAutobuyerBulkLevels(), getAutomationIntervalSeconds(), getFlopsAutobuyerUnlockEra(), getGlobalAutomationUnlockMilestone(), getTierTickspeedIntervalSeconds(), isOverflowModeUnlocked(), Badge, Category (+29 more)

### Community 13 - "App.foundry.test.jsx"
Cohesion: 0.06
Nodes (44): seedDataLakeSave(), version, @testing-library/user-event, derivePurchaseFieldsFromCounts(), expandSettingsSections(), openSettings(), seedMainGameState(), ALL_TIER_IDS (+36 more)

### Community 14 - "FactoryTab.jsx"
Cohesion: 0.13
Nodes (30): Button, ChallengeExitButton(), Actions, Body, Card, ConfirmDialog(), Overlay, Title (+22 more)

### Community 15 - "engine.computeFlops.test.js"
Cohesion: 0.15
Nodes (14): Prestige Points, autobuyer unlock, and the tickspeed multiplier, buyComputeFlopsTier(), buyPrestigeDoublePp(), buyTierTickspeedIntervalUpgrade(), getAutomationIntervalMaxLevel(), getComputeFlopsAffordableQuantity(), getIntervalMaxLevelForBase(), getTierTickspeedIntervalMaxLevel() (+6 more)

### Community 16 - "getTierCost"
Cohesion: 0.13
Nodes (42): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Factory tier cost series: shared linear increments → per-tier constant increments — 2026-11-16 (#1098), Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price (+34 more)

### Community 17 - "storage.js"
Cohesion: 0.14
Nodes (31): buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), buildResetActiveSlotConfirmMessage(), buildResetByteFoundryConfirmMessage(), BUY_MAX_PREFERENCE_KEY, BUY_UNIT_PREFERENCE_KEY, coerceMeta(), completeDummySupporterPurchase() (+23 more)

### Community 18 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (42): ButtonGrid, describeNumber(), Details, DevModePage(), FieldControls, FieldLabel, FieldNode(), FieldRow (+34 more)

### Community 19 - "with"
Cohesion: 0.05
Nodes (42): concurrency, cancel-in-progress, group, if, runs-on, steps, timeout-minutes, GH_TOKEN (+34 more)

### Community 20 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.09
Nodes (61): A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Per-pool Bandwidth capped at sqrt(Capacity); Data Lake capacity doubling funded by draining the lake; idle output liquidates into Bits, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity), Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps (+53 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.05
Nodes (41): concurrency, cancel-in-progress, group, CI_RUN_BRANCH, CI_RUN_CONCLUSION, GH_TOKEN, if, runs-on (+33 more)

### Community 22 - "[Unreleased]"
Cohesion: 0.05
Nodes (43): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+35 more)

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
Cohesion: 0.09
Nodes (38): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, enableAutoMerge(), getAutobuyerIntervalSeconds(), getOverclockRequirement(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable() (+30 more)

### Community 27 - "Economy model"
Cohesion: 0.08
Nodes (29): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor (+21 more)

### Community 28 - "normalizePoolMemoryCapacity"
Cohesion: 0.13
Nodes (53): Removed, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09, Devin Review on PR #614: a false-update bug, a stale comment, and a deliberately-unfixed legacy-save ambiguity — 2026-09-09, Foundry-reset rebuild moved off the fill multiplier (2026-10) (+45 more)

### Community 29 - "applyAutobuyerMilestones"
Cohesion: 0.31
Nodes (9): Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getTierTickspeedAutobuyerMilestone(), Header, InfoPage(), RootDiv, Section (+1 more)

### Community 30 - "env"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 31 - "gradlew"
Cohesion: 0.08
Nodes (30): devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2, jsdom@^31.0.0, @stryker-mutator/core@^10.1.1, @stryker-mutator/vitest-runner@^10.1.1, @testing-library/dom@^10.4.1, @testing-library/jest-dom@^7.0.1 (+22 more)

### Community 32 - "DailyTab.jsx"
Cohesion: 0.13
Nodes (30): canRestartDailyRun(), getDailyCredits(), getMsUntilNextUtcDay(), getRunProgress(), getUtcDateId(), isDailyAutomationOn(), ActionButton, AUTOMATION_GROUPS (+22 more)

### Community 33 - "Shared components reference"
Cohesion: 0.05
Nodes (40): #988 leftover mixed labels after stacking onto #990 (2026-11), Bits subline adds no Factory header height — 2026-11-09, Boosters: manual merge on automated tiers became instant (2026-10), CLAUDE.md Economy model duplication trim — 2026-09-03, Compact layouts per screen — three reversed decisions (2026-11-19, epic #1135), Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Daily challenges: seeded conditions, head start, calculated targets (2026-11), Data Stream balance kept through Prestige (#1096) (+32 more)

### Community 34 - "App.jsx"
Cohesion: 0.12
Nodes (28): Prestige info is hidden until first prestige, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon (+20 more)

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
Cohesion: 0.19
Nodes (16): Purge code rename: reboot → purge (2026-11, #987), adaptSaveForLoad(), SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), isPlainObject(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS (+8 more)

### Community 41 - "env"
Cohesion: 0.07
Nodes (27): CEILING_FULL, CLAUDE_OUTCOME, CODE_SCANNING_ALERTS, DEPENDABOT_ALERTS, DEPENDABOT_PRS, EVENT_SCHEDULE, FAILING_PRS, GH_TOKEN (+19 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.17
Nodes (20): Money, canBuyComputeFlopsTier(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierProductionMultiplier(), BoostText, BuyButton, cell (+12 more)

### Community 43 - "DataLakePanel/index.jsx"
Cohesion: 0.06
Nodes (99): actFoundry(), `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17 (+91 more)

### Community 44 - "tickGameCore"
Cohesion: 0.09
Nodes (51): Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock no longer banks completed levels — 2026-11-11, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Reintroducing the 1s-10s tickspeed ladder, Spent QB gates last-tier credit; last tier may spend to 0 (2026-11), Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Achievements (epic #1046, basic slice) (+43 more)

### Community 45 - "steps"
Cohesion: 0.08
Nodes (24): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, FAIL_MARKER, GH_TOKEN (+16 more)

### Community 46 - "clampNonNegative"
Cohesion: 0.11
Nodes (28): Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Speed Up renamed to Scale Up and redesigned from a last-tier-only gate to a per-tier unlock ladder — 2026-09-09, Why Scale Up exists, and why its requirement escalates, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation (+20 more)

### Community 47 - "Procedure"
Cohesion: 0.16
Nodes (19): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation (DevModePage) (+11 more)

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

### Community 54 - "useIncrementalGame"
Cohesion: 0.15
Nodes (30): Architecture, Security notes, `OfflineProgressNotice/index.jsx`, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, Buy max mode, Buy mode (Level / Single), Offline progress (+22 more)

### Community 55 - "orphan-branch-scan.sh"
Cohesion: 0.16
Nodes (15): ADS_PLUGIN, BASE_PLUGINS, buildIncludePlugins(), config, IAP_PLUGIN, root, srcPath, buildFeaturesModule() (+7 more)

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.10
Nodes (27): actCapacityUpgrade(), actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPurges, defaultPPValues (+19 more)

### Community 57 - "Package.swift"
Cohesion: 0.10
Nodes (18): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+10 more)

### Community 58 - "CapApp-SPM/README.md"
Cohesion: 0.10
Nodes (21): dependencies, @capacitor/android@^8.5.3, @capacitor/ios@^8.5.3, @capacitor/splash-screen@^8.0.2, firebase@^13.2.0, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0, react@^19.3.1 (+13 more)

### Community 59 - "vitest"
Cohesion: 0.08
Nodes (29): Theming reference, styled-components, renderDiskArrayRow(), renderButton(), NoticeActions, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay (+21 more)

### Community 60 - "stryker.config.json"
Cohesion: 0.10
Nodes (19): concurrency, coverageAnalysis, htmlReporter, fileName, jsonReporter, fileName, mutate, plugins (+11 more)

### Community 61 - "ref_node_path"
Cohesion: 0.26
Nodes (8): bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main(), sanitizeExpressions(), script

### Community 62 - "Automation workflows"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, CodeQL (`codeql.yml`), Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Main CI heal (`main-ci-heal.yml`, #37) (+10 more)

### Community 63 - "Dev Mode Reference"
Cohesion: 0.28
Nodes (16): Dev Mode, Dev Mode Reference, clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot(), discardIncompatibleActiveSaveIfNeeded(), getActiveSlotId() (+8 more)

### Community 64 - "scripts"
Cohesion: 0.10
Nodes (20): scripts, android:aab, android:apk:release, audit, build, build:capacitor, build:dev, bump-version (+12 more)

### Community 65 - "capacitor.build.gradle"
Cohesion: 0.15
Nodes (10): deleteAccountAndData(), app, auth, db, deleteAccount(), downloadSave(), requireUser(), saveDocFor() (+2 more)

### Community 66 - "palette.md"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, on, push, permissions (+8 more)

### Community 67 - "android/build.gradle"
Cohesion: 0.15
Nodes (14): match, yml, ALLOWED_TOP_LEVEL_KEYS, analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findMalformedGraphEntries(), findUncoveredGraphifyFiles() (+6 more)

### Community 68 - "config.js"
Cohesion: 0.16
Nodes (12): LegalSection(), LinkRow, ADMOB_TEST_REWARDED_IDS, IAP_PRODUCTS, PRIVACY_POLICY_URL, realRewardedIds, REMOVE_ADS_ENTITLEMENT, REVENUECAT_API_KEYS (+4 more)

### Community 69 - "Button/index.jsx"
Cohesion: 0.20
Nodes (12): `Button/index.jsx`, getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, pulse, resolveColor(), VARIANT_TOKEN, Body (+4 more)

### Community 70 - "capacitor.settings.gradle"
Cohesion: 0.12
Nodes (16): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Main CI heal checkout is default-branch tip, not `workflow_run.head_sha` — 2026-11-11, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit (+8 more)

### Community 71 - "ref_node_fs"
Cohesion: 0.11
Nodes (14): workflow, workflowPath, script, zeroWork, ADMOB_TEST_APP_ID_IOS, applyManagedAdsKeys(), buildManagedBlock(), END_MARKER (+6 more)

### Community 72 - "settings.gradle"
Cohesion: 0.13
Nodes (14): jobs, test, name, on, pull_request, push, permissions, contents (+6 more)

### Community 73 - "body"
Cohesion: 0.14
Nodes (13): description, label, placeholder, value, body, attributes, id, type (+5 more)

### Community 74 - "palette.md"
Cohesion: 0.14
Nodes (13): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+5 more)

### Community 75 - "isProductionFrozen"
Cohesion: 0.15
Nodes (32): actSoftResets(), The Byte Foundry becomes a per-Prestige-cycle mechanic, not a one-time gate, The Byte generator becomes permanent — only "Memory" and the gate reset each Prestige, Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Multiplier overflow safety, Overclock, Pause/resume for per-tier automations, Pause/resume for the global automations (+24 more)

### Community 76 - "pull_request_template.md"
Cohesion: 0.29
Nodes (13): getCompletedAchievementGroups(), isAchievementEarned(), AchievementsPage(), Badge, Detail, Group, GroupHeading, Header (+5 more)

### Community 77 - "jsconfig.json"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Manual, Scripts, Security notes (+1 more)

### Community 78 - "Store listing drafts"
Cohesion: 0.15
Nodes (12): Apple — App Privacy ("nutrition label"), Content rating (Play IARC questionnaire / App Store age rating), Default build, Default build (cloud save on, ads and IAP off), Google Play — Data safety, Listing text, Store assets still needed, Store listing drafts (+4 more)

### Community 79 - "with"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, fetch-depth, github_token, node-version (+5 more)

### Community 81 - "publish-strategy.sh"
Cohesion: 0.22
Nodes (14): Compute Boost lanes (parallel multipliers + same-multiplier queue), boostGlow, boostPulse, COMPUTE_BOOST_LABELS, getComputeBoostDescription(), isBoostActive(), isDataStreamBoosted(), isFactoryTierBoosted() (+6 more)

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

### Community 86 - "enable-auto-merge-if-eligible.sh"
Cohesion: 0.17
Nodes (9): createPrefixedStorage(), installStoragePrefix(), rootElement, reportWebVitals(), createMonetizationService(), getMonetizationService(), createNoopMonetizationService(), NO_ENTITLEMENTS (+1 more)

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
Cohesion: 0.20
Nodes (9): 1. Establish scope, 2. Load the repo's invariants, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure (+1 more)

### Community 95 - "Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03"
Cohesion: 0.20
Nodes (24): Boosters: timer bar with Pop / Forfeit / Stack; preset switch refunds unused stacks (2026-10), Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Compute Boost, activateComputeBoost(), autoBoostFromTier(), canActivateComputeBoost() (+16 more)

### Community 96 - "Shared components reference"
Cohesion: 0.17
Nodes (11): `AppMenu/index.jsx`, `AppNav/index.jsx`, `BoostBadge/index.jsx`, `BuyMaxToggle/index.jsx`, `BuyModeToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js` (+3 more)

### Community 97 - "ext-loader.mjs"
Cohesion: 0.22
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

### Community 101 - "MainPage reference"
Cohesion: 0.11
Nodes (47): Byte Foundry, Fixed, "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Architecture / MainPage UI decisions, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate (+39 more)

### Community 102 - "Android release (Google Play)"
Cohesion: 0.25
Nodes (7): Android release (Google Play), Build the signed AAB, Edge-to-edge, splash, icon, One-time setup, Optional features (all off by default), Permission audit, Upload to a testing track

### Community 103 - "env"
Cohesion: 0.25
Nodes (8): CI_RUN_BRANCH, CI_RUN_CONCLUSION, EVENT_NAME, GH_TOKEN, ISSUE_IS_PR, ISSUE_NUMBER, REVIEW_PR_NUMBER, env

### Community 104 - "on"
Cohesion: 0.25
Nodes (8): types, on, issue_comment, pull_request_review, workflow_run, types, types, workflows

### Community 105 - "BoostTimerBar/index.jsx"
Cohesion: 0.20
Nodes (18): BoostLane, BoostLaneRow(), BoostTimerBar(), BoostTimerRow, BoostTimerStack, CompactButton, describeCoveredTiers(), formatPresetDuration() (+10 more)

### Community 106 - "resolutions"
Cohesion: 0.25
Nodes (8): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/@grpc/grpc-js, **/nanoid, **/typed-rest-client/qs, **/uuid

### Community 107 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 108 - "Foundry multiplier bar: one diverging bar tried and dropped (2026-10)"
Cohesion: 0.29
Nodes (7): Bitrate exponent moves 10% toward 1.0 per new Disk size (2026-11), Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Pool-reset achievements tune Bitrate's within-pool exponent steps (2026-11), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), basisBitsForRawRate()

### Community 109 - "hasAffordableAutomationPerk"
Cohesion: 0.20
Nodes (14): Perks regrouped by feature: Unlocks / Upgrades / Toggles → Automation / Prestige — 2026-11-03, buySleepModeCapUpgrade(), getAutobuyerIntervalUpgradeCost(), getAutomationIntervalUpgradeCost(), getPrestigeDoublePpUpgradeCost(), getSiCleanDoublingFactor(), getSleepModeCapLevel(), getSleepModeCapUpgradeCost() (+6 more)

### Community 110 - "programmer.md"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 111 - "qa.md"
Cohesion: 0.29
Nodes (7): steps, continue-on-error, id, if, name, run, uses

### Community 112 - "Button"
Cohesion: 0.19
Nodes (19): react, ButtonContent(), CloudSaveSection(), DELETE_STEP_MESSAGES, errorStatus(), IMPORT_ERRORS, ManualSaveSection(), SaveText (+11 more)

### Community 113 - "dailyChallenges.test.js"
Cohesion: 0.12
Nodes (13): DAILY_AUTOMATIONS, DAILY_BOT_ACTION_ORDER, DAILY_FORMAT_BY_ID, DAILY_FORMATS, DAILY_GENERATOR_VERSION, DAILY_MODIFIER_POOL, DAILY_OBJECTIVE_KINDS, forfeitDailyRun() (+5 more)

### Community 114 - "getPoolBufferBits"
Cohesion: 0.46
Nodes (8): Lake disk fills: full-pool start, uninterruptible (2026-11), areStoragePoolDisksFull(), getPoolBufferBits(), isDataLakeAcquiring(), isDataLakeDiskFillInProgress(), isDataLakeDiskFillStartAllowed(), isDataLakePoolDrainAvailable(), isStoragePoolBufferFull()

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

### Community 121 - "generate.mjs"
Cohesion: 0.17
Nodes (12): applyTweaks(), args, capturePane(), cleanups, main(), NAVIGATION, outDir, PORT (+4 more)

### Community 122 - "BuyModeToggle/index.jsx"
Cohesion: 0.60
Nodes (4): BuyModeToggle(), ChoiceButton, OPTIONS, Row

### Community 123 - "AutomationRow"
Cohesion: 0.14
Nodes (15): AutomationRow(), Cell, CellAction, CellHead, Details, InlineAction, InlineMeta, NameButton (+7 more)

### Community 124 - "DiskArrayRow/index.jsx"
Cohesion: 0.12
Nodes (31): activeDiskColor(), CacheBlock, CacheBlocksRow, CacheFillIndicator, DiskArrayRow(), diskGlowPulse, DiskSizeRow, DiskSquare (+23 more)

### Community 126 - "resetByteFoundry"
Cohesion: 0.30
Nodes (14): Reset Byte Foundry convenience-auto now includes Capacity/Sacrifice — 2026-08-25, Reset Byte Foundry's convenience replay didn't cover partial Provision Disk passes — 2026-09-08, Speed exponent rises with Foundry-reset Disk-size unlocks (2026-10), Two more gaps in Reset Byte Foundry's convenience-replay caps — 2026-09-08, Upgrade Data Stream (Capacity / Bitrate), captureFoundryUpgradeCaps(), getMaxActiveDiskLadderStep(), getPoolReachableDiskLadderStep() (+6 more)

### Community 127 - "ChallengesPage/index.jsx"
Cohesion: 0.29
Nodes (8): isDailyChallengesAvailable(), DAILY_CHALLENGES_FEATURE, CHALLENGE_TABS, ChallengesPage(), Header, RootDiv, TabBar, TabButton

### Community 128 - "challengeUi.js"
Cohesion: 0.36
Nodes (10): Banner, ChallengeBanner(), Rule, Text, Title, formatChallengeGoal(), formatChallengeTime(), getChallengeReadouts() (+2 more)

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

### Community 133 - "startDailyRun"
Cohesion: 0.25
Nodes (7): Achievements (epic #1046, basic slice), Daily challenges (epic #1062), Economy model, generate(), generateDailyChallenge(), getDailyChallengeValidation(), startDailyRun()

### Community 134 - "Daily challenges (epic #1062)"
Cohesion: 0.52
Nodes (7): Daily challenges (epic #1062), getRunValue(), isRunWon(), playDailyRun(), setRun(), settleRun(), tickDailyRuns()

### Community 137 - "Compact screen layouts (epic #1135)"
Cohesion: 0.29
Nodes (7): Challenges — `ChallengesPage` Factory / Daily tabs (#1139), Compact screen layouts (epic #1135), Compute (Flops) — `ComputeFlopsPage` (#1138), Factory feature cards (#1137), Firmware → Automation (#1140), Foundry open pool (#1142), Power merge chain (#1141)

### Community 138 - "admobAdapter.js"
Cohesion: 0.25
Nodes (8): @capacitor-community/admob@^8.2.1, @capacitor/core@^8.5.3, @capacitor-community/admob, @capacitor/core, getRewardedAdUnit(), createAdMobAdapter(), createRewardedAdCache(), REWARDED_AD_MAX_AGE_MS

### Community 141 - "mergeState"
Cohesion: 0.18
Nodes (12): Added, Removed, Testing, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Save persistence, Three more findings from a Devin bot review pass on the pool-overflow Data Lake rework PR: an overflow rate that asymptotically never completes, a lifetime-counter bug, and dropped legacy transfers, End-to-end testing, Testing reference (+4 more)

### Community 151 - "SpeedDetailsPopover/index.jsx"
Cohesion: 0.39
Nodes (7): react-dom@^19.3.1, react-dom, Heading, Note, Panel, Rows, SpeedDetailsPopover()

### Community 175 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 176 - "AutoBoostPresetPicker/index.jsx"
Cohesion: 0.60
Nodes (4): AutoBoostPresetPicker(), PresetButton, Row, COMPUTE_BOOST_DISPLAY

### Community 177 - "VisuallyHidden"
Cohesion: 0.40
Nodes (5): VisuallyHidden, PpButton, PpPurchaseButton(), progressPercent(), TierSymbol()

### Community 178 - "isBuyMaxUnlocked"
Cohesion: 0.70
Nodes (3): BuyMaxToggle(), Switch, isBuyMaxUnlocked()

### Community 179 - "Native apps (Capacitor — #70)"
Cohesion: 0.50
Nodes (3): Native apps (Capacitor — #70), Native apps (Capacitor) reference, serializeSaveForExport()

### Community 180 - "getPrestigePowersPerPp"
Cohesion: 0.67
Nodes (4): getPrestigeDoublePpHalvingLevels(), getPrestigePowersPerPp(), getPrestigePpPerPower(), compressionStep()

### Community 181 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

## Knowledge Gaps
- **7 isolated node(s):** `PackageDescription`, `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js`, `file:src/game/storagePrefix.test.js` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1071 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design history & rationale` connect `Shared components reference` to `MainPage/index.jsx`, `Testing`, `createInitialGameState`, `Automation workflows`, `mergeState`, `getTierCost`, `Key engine functions (`src/game/engine.js`)`, `AGENTS.md`, `Economy model`, `normalizePoolMemoryCapacity`, `adaptSaveForCurrentSchema`, `DataLakePanel/index.jsx`, `tickGameCore`, `clampNonNegative`, `generate-pwa-icons.mjs`, `capacitor.settings.gradle`, `jsconfig.json`, `publish-strategy.sh`, `Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03`, `MainPage reference`, `Foundry multiplier bar: one diverging bar tried and dropped (2026-10)`, `hasAffordableAutomationPerk`, `getPoolBufferBits`, `resetByteFoundry`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 267 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `activateComputeBoost()` and `applyAutobuyerMilestones()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 267 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.050616050616050616 - nodes in this community are weakly interconnected._
- **Why does `createInitialGameState()` connect `createInitialGameState` to `One-shot auto-convert`, `Testing`, `dailyChallenges.js`, `engine.test.js`, `engine.js`, `mergeState`, `App.foundry.test.jsx`, `engine.computeFlops.test.js`, `storage.js`, `DevModePage/index.jsx`, `Key engine functions (`src/game/engine.js`)`, `Economy model`, `normalizePoolMemoryCapacity`, `clampNonNegative`, `Procedure`, `manifest.mjs`, `useIncrementalGame`, `generate-pwa-icons.mjs`, `Dev Mode Reference`, `isProductionFrozen`, `Procedure`, `Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03`, `MainPage reference`, `dailyChallenges.test.js`, `resetByteFoundry`, `ChallengesPage/index.jsx`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `MainPage()` (e.g. with `Byte Foundry` and `Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework`) actually correct?**
  _`MainPage()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `Testing` be split into smaller, more focused modules?**
  _Cohesion score 0.07146087743102668 - nodes in this community are weakly interconnected._