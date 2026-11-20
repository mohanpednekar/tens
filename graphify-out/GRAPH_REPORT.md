# Graph Report - tens  (2026-11-20)

## Corpus Check
- 233 files · ~603,376 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 9, (none) 8, .properties 2)

## Summary
- 3487 nodes · 10542 edges · 176 communities (135 shown, 41 thin omitted)
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 2298 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f5dacda7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Hierarchical lake disks
- MainPage/index.jsx
- Testing
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
- getStoragePoolBandwidth
- bump-version.mjs
- Changelog
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
- tickDiskLevelOneCachePull
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
- engine.challengesTier.test.js
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
- Forced priority order
- Android release (Google Play)
- env
- on
- BoostTimerBar/index.jsx
- resolutions
- optimize-ai-files/SKILL.md
- Foundry multiplier bar: one diverging bar tried and dropped (2026-10)
- designer.md
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
- doubleDataLakeCapacity
- BuyModeToggle/index.jsx
- getDataLakeUnitBits
- DiskArrayRow/index.jsx
- isComputeMergeReserveStartAvailable
- ChallengesPage/index.jsx
- tickComputeMergeBoundary
- End-to-end specs (Playwright)
- pull_request_template.md
- followup
- jsconfig.json
- startDailyRun
- Daily challenges (epic #1062)
- MainActivity.java
- dev-team/SKILL.md
- Compact screen layouts (epic #1135)
- README.md
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

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 267 edges
2. `MainPage()` - 122 edges
3. `useIncrementalGame()` - 113 edges
4. `ByteFoundryPage()` - 110 edges
5. `MainPage reference` - 103 edges
6. `Testing` - 87 edges
7. `tickGame()` - 86 edges
8. `clampNonNegative()` - 85 edges
9. `Economy model — Byte Foundry (full text)` - 85 edges
10. `createInitialGameState()` - 83 edges

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

## Communities (176 total, 41 thin omitted)

### Community 0 - "Hierarchical lake disks"
Cohesion: 0.13
Nodes (46): `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe (+38 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.05
Nodes (78): Fill multiplier 10× → 0.1× (log-linear) and a multiplicative tap bonus — 2026-10-30, formatPoolBalanceStable(), formatSpeedText(), formatThreeSignificant(), getComputeBoostMultiplier(), getDataStreamBaseMultiplierPercent(), getDataStreamDeliveredRate(), getDataStreamEffectMultiplier() (+70 more)

### Community 2 - "Testing"
Cohesion: 0.08
Nodes (58): A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim (+50 more)

### Community 3 - "ComputePage/index.jsx"
Cohesion: 0.10
Nodes (39): Power merge chain and charge-built Chargers (2026-11-20, #1141), getChargerUnlockProgress(), getComputeChargeSeconds(), getComputeChargeTransfers(), getComputeFieldEffectiveCap(), isComputeChargeAvailable(), isComputeCharging(), isComputeMergeStartAvailableAtBoundary() (+31 more)

### Community 4 - "layers.js"
Cohesion: 0.04
Nodes (104): allResourceIds(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, CHALLENGE_BOUNDARIES, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, decrementFullDiskCount(), FILL_CURVE_LN_A (+96 more)

### Community 5 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.10
Nodes (62): Byte Foundry, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, Cache Warm targets the highest pool being filled (2026-11-19) (+54 more)

### Community 6 - "createInitialGameState"
Cohesion: 0.09
Nodes (59): Security notes, 2. Load the repo's invariants, actSoftResets(), `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, Purge code rename: reboot → purge (2026-11, #987), `scaleUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry, Speed Up renamed to Scale Up and redesigned from a last-tier-only gate to a per-tier unlock ladder — 2026-09-09, Spent QB gates last-tier credit; last tier may spend to 0 (2026-11) (+51 more)

### Community 7 - "Automation workflows"
Cohesion: 0.06
Nodes (76): Bits subline under MoneyHero; `+n/8` dropped from tier Buy buttons — 2026-11-09, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Single-line tier rows; exponential notation from 10,000 (2026-11), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, The global tickspeed multiplier, MainPage reference, buyGlobalTickspeedMultiplier(), formatAsCleanBytesIfExactMultiple() (+68 more)

### Community 8 - "dailyChallenges.js"
Cohesion: 0.08
Nodes (43): AUTOMATION_BY_KEY, buildDailyCandidate(), calculateAttemptMark(), calculateTarget(), createRng(), DAILY_CHECK_IN_PLANS, DAILY_MAX_CREDITS, DAILY_MAX_GENERATION_ATTEMPTS (+35 more)

### Community 9 - "engine.test.js"
Cohesion: 0.05
Nodes (16): getDataLakeCurrentDiskFillFraction, getDataStreamFillFraction(), getLastTierLevelCreditIntervalSeconds(), isAnyComputeMergeInFlight(), allChallengesCompleted(), eraEligibleState(), noOtherUpgradesLeft, PROV_FIRST (+8 more)

### Community 10 - "engine.js"
Cohesion: 0.06
Nodes (61): Architecture, `OfflineProgressNotice/index.jsx`, Buy max mode, Buy mode (Level / Single), Offline progress, Native apps (Capacitor — #70), Native apps (Capacitor) reference, addActivePlaySeconds() (+53 more)

### Community 11 - "SettingsPage/index.jsx"
Cohesion: 0.14
Nodes (27): Settings + Milestones (#1143), getEonsAwarded(), buildClearSlotConfirmMessage(), Body, buildSparklinePath(), Caption, Chevron, Group (+19 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.06
Nodes (65): Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, ButtonIcon, ButtonLabel, VisuallyHidden, BuyMaxToggle(), Switch, getAutobuyerBulkLevels(), getAutobuyerUnlockMilestone() (+57 more)

### Community 13 - "App.foundry.test.jsx"
Cohesion: 0.06
Nodes (37): derivePurchaseFieldsFromCounts(), expandSettingsSections(), openSettings(), seedMainGameState(), withExpediteDisks(), ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), expandSettingsSections() (+29 more)

### Community 14 - "FactoryTab.jsx"
Cohesion: 0.12
Nodes (33): Banner, ChallengeBanner(), Rule, Text, Title, ChallengeExitButton(), StatCard, formatChallengeGoal() (+25 more)

### Community 15 - "navAttention.test.js"
Cohesion: 0.10
Nodes (20): everythingUnlocked(), AUTOMATION_INTERVAL_CONFIG, BITS_PER_BYTE, CHALLENGE_DEFINITIONS, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP, COMPUTE_MERGE_RATIO (+12 more)

### Community 16 - "getTierCost"
Cohesion: 0.14
Nodes (39): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Architecture / MainPage UI decisions, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check, Purchase block size became a runtime-configurable, growing value — `getTierLevel` replaced by direct state tracking (+31 more)

### Community 17 - "storage.js"
Cohesion: 0.11
Nodes (53): Dev Mode, Security notes, Dev Mode Reference, createEmptyDataLakes(), createEmptyDataLakeTier(), adaptSaveForLoad(), applyDevGameStateJson(), buildDefaultMeta() (+45 more)

### Community 18 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (42): ButtonGrid, describeNumber(), Details, DevModePage(), FieldControls, FieldLabel, FieldNode(), FieldRow (+34 more)

### Community 19 - "with"
Cohesion: 0.05
Nodes (42): concurrency, cancel-in-progress, group, if, runs-on, steps, timeout-minutes, GH_TOKEN (+34 more)

### Community 20 - "getStoragePoolBandwidth"
Cohesion: 0.16
Nodes (29): Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Foundry-reset rebuild moved off the fill multiplier (2026-10), Per-pool Bandwidth capped at sqrt(Capacity); Data Lake capacity doubling funded by draining the lake; idle output liquidates into Bits, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity), Tap bonuses moved from buffer fills to their consumers (2026-11), Pool Memory Capacity and Bandwidth, getComputeMergeDurationSeconds() (+21 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.05
Nodes (41): concurrency, cancel-in-progress, group, CI_RUN_BRANCH, CI_RUN_CONCLUSION, GH_TOKEN, if, runs-on (+33 more)

### Community 22 - "Changelog"
Cohesion: 0.11
Nodes (18): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+10 more)

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
Cohesion: 0.08
Nodes (41): Sacrifice confirm: in-game dialog; Core warning only when unlocked, buySleepModeCapUpgrade(), getAutobuyerBaseIntervalSeconds(), getAutobuyerIntervalSeconds(), getAutobuyerIntervalSecondsAtLevel(), getPrestigeDoublePpUpgradeCost(), getSleepModeCapLevel(), getSleepModeCapUpgradeCost() (+33 more)

### Community 27 - "Economy model"
Cohesion: 0.07
Nodes (42): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative (+34 more)

### Community 28 - "normalizePoolMemoryCapacity"
Cohesion: 0.12
Nodes (56): Fixed, Removed, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09, Devin Review on PR #614: a false-update bug, a stale comment, and a deliberately-unfixed legacy-save ambiguity — 2026-09-09 (+48 more)

### Community 29 - "ExampleInstrumentedTest.java"
Cohesion: 0.07
Nodes (30): TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTOBUYER_INTERVAL_UPGRADE_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_STEP, BUY_MAX_UNLOCK_COST, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, CACHE_WARM_UNLOCK_COST, COMPUTE_FLOPS_LAST_TIER_COST_PP (+22 more)

### Community 30 - "env"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 31 - "gradlew"
Cohesion: 0.07
Nodes (35): browserslist, development, production, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0, devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2 (+27 more)

### Community 32 - "DailyTab.jsx"
Cohesion: 0.14
Nodes (28): getDailyCredits(), getMsUntilNextUtcDay(), getRunProgress(), isDailyAutomationOn(), ActionButton, AUTOMATION_GROUPS, AutomationSwitches(), BackBanner (+20 more)

### Community 33 - "Shared components reference"
Cohesion: 0.07
Nodes (27): #988 leftover mixed labels after stacking onto #990 (2026-11), Bits subline adds no Factory header height — 2026-11-09, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost lanes (parallel multipliers + same-multiplier queue), Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Stream balance kept through Prestige (#1096), Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale (+19 more)

### Community 34 - "App.jsx"
Cohesion: 0.11
Nodes (29): Prestige info is hidden until first prestige, Theming reference, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop (+21 more)

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
Cohesion: 0.15
Nodes (22): Money, canBuyComputeFlopsTier(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight(), getComputeFlopsTotal(), isComputeFlopsPageRevealed(), BoostText (+14 more)

### Community 43 - "DataLakePanel/index.jsx"
Cohesion: 0.10
Nodes (38): Pool-local flushes, ActionButton, BareDivider, DataLakePanel(), formatLakeTimeLeft(), LakeBlock, LakeCaption, LakeFilledText (+30 more)

### Community 44 - "tickGame"
Cohesion: 0.15
Nodes (34): Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Key engine functions (`src/game/engine.js`) (+26 more)

### Community 45 - "steps"
Cohesion: 0.08
Nodes (24): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, FAIL_MARKER, GH_TOKEN (+16 more)

### Community 46 - "tickDiskLevelOneCachePull"
Cohesion: 0.13
Nodes (25): Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Storage funding rebuilt push→pull: the manual Redeem button and autobuyer-gated auto-redeem are gone (issue #571), Why Scale Up exists, and why its requirement escalates (+17 more)

### Community 47 - "Procedure"
Cohesion: 0.17
Nodes (16): Security, 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation (+8 more)

### Community 48 - "Automation workflows"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 49 - "manifest.mjs"
Cohesion: 0.10
Nodes (30): applyTweaks(), args, capturePane(), main(), NAVIGATION, outDir, PORT, startDevServer() (+22 more)

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
Cohesion: 0.27
Nodes (9): NoticeActions, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), createMonetizationService(), getMonetizationService(), createNoopMonetizationService() (+1 more)

### Community 55 - "orphan-branch-scan.sh"
Cohesion: 0.18
Nodes (14): ADS_PLUGIN, BASE_PLUGINS, buildIncludePlugins(), config, IAP_PLUGIN, root, buildFeaturesModule(), createViteConfig() (+6 more)

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.13
Nodes (23): actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPurges, defaultPPValues, emit() (+15 more)

### Community 57 - "Package.swift"
Cohesion: 0.10
Nodes (18): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+10 more)

### Community 58 - "CapApp-SPM/README.md"
Cohesion: 0.14
Nodes (14): dependencies, @capacitor/android@^8.5.3, @capacitor/ios@^8.5.3, @capacitor/splash-screen@^8.0.2, firebase@^13.2.0, react@^19.3.1, react-is@^19.3.1, @revenuecat/purchases-capacitor@14.1.0 (+6 more)

### Community 59 - "vitest"
Cohesion: 0.06
Nodes (34): @testing-library/react@^16.3.3, vitest@5.1.0, @testing-library/react, vitest, renderDiskArrayRow(), renderButton(), renderNotice(), summary (+26 more)

### Community 60 - "stryker.config.json"
Cohesion: 0.10
Nodes (19): concurrency, coverageAnalysis, htmlReporter, fileName, jsonReporter, fileName, mutate, plugins (+11 more)

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.10
Nodes (16): yaml@^2.9.1, yaml, workflow, workflowPath, script, zeroWork, bashSyntaxError(), collectYamlFiles() (+8 more)

### Community 62 - "Automation workflows"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, CodeQL (`codeql.yml`), Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Main CI heal (`main-ci-heal.yml`, #37) (+10 more)

### Community 63 - "engine.challengesTier.test.js"
Cohesion: 0.16
Nodes (19): Overclock no longer banks completed levels — 2026-11-11, withChallenge(), withRun(), getChallengeClockSpeedMultiplier(), getChallengeClockSpeedStep(), getChallengeEffectTier(), getChallengeLever(), getChallengeProductionMultiplier() (+11 more)

### Community 64 - "scripts"
Cohesion: 0.10
Nodes (20): scripts, android:aab, android:apk:release, audit, build, build:capacitor, build:dev, bump-version (+12 more)

### Community 65 - "capacitor.build.gradle"
Cohesion: 0.12
Nodes (12): deleteAccountAndData(), app, auth, db, deleteAccount(), downloadSave(), requireUser(), saveDocFor() (+4 more)

### Community 66 - "palette.md"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, on, push, permissions (+8 more)

### Community 67 - "android/build.gradle"
Cohesion: 0.20
Nodes (12): ALLOWED_TOP_LEVEL_KEYS, analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findMalformedGraphEntries(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef() (+4 more)

### Community 68 - "config.js"
Cohesion: 0.10
Nodes (20): @capacitor-community/admob@^8.2.1, @capacitor/core@^8.5.3, @capacitor-community/admob, @capacitor/core, LegalSection(), LinkRow, ADMOB_TEST_REWARDED_IDS, getRewardedAdUnit() (+12 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.14
Nodes (21): styled-components@^6.6.0, react, styled-components, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, progressFill() (+13 more)

### Community 70 - "capacitor.settings.gradle"
Cohesion: 0.12
Nodes (16): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Main CI heal checkout is default-branch tip, not `workflow_run.head_sha` — 2026-11-11, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit (+8 more)

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.18
Nodes (11): match, yml, ADMOB_TEST_APP_ID_IOS, applyManagedAdsKeys(), buildManagedBlock(), END_MARKER, escapeXml(), SKADNETWORK_IDS (+3 more)

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
Cohesion: 0.11
Nodes (33): Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Factory tier cost series: shared linear increments → per-tier constant increments — 2026-11-16 (#1098), Pause/resume for the global automations, PP Compute (Flops), Reboot and Kernels (#407), The last tier's XP-funded tickspeed, Tier autobuyer/tier-tickspeed-autobuyer milestones (+25 more)

### Community 76 - "pull_request_template.md"
Cohesion: 0.32
Nodes (11): AchievementsPage(), Badge, Detail, Group, GroupHeading, Header, List, NameButton (+3 more)

### Community 77 - "jsconfig.json"
Cohesion: 0.25
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Manual, Scripts, Security notes, Tens

### Community 78 - "Store listing drafts"
Cohesion: 0.15
Nodes (12): Apple — App Privacy ("nutrition label"), Content rating (Play IARC questionnaire / App Store age rating), Default build, Default build (cloud save on, ads and IAP off), Google Play — Data safety, Listing text, Store assets still needed, Store listing drafts (+4 more)

### Community 79 - "with"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, fetch-depth, github_token, node-version (+5 more)

### Community 81 - "publish-strategy.sh"
Cohesion: 0.21
Nodes (15): Architecture 4b — `ComputePage/index.jsx`, boostGlow, boostPulse, COMPUTE_BOOST_LABELS, getComputeBoostDescription(), isBoostActive(), isDataStreamBoosted(), isFactoryTierBoosted() (+7 more)

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
Cohesion: 0.13
Nodes (14): react-dom@^19.3.1, web-vitals@^6.2.3, react-dom, web-vitals, Heading, Note, Panel, Rows (+6 more)

### Community 87 - "pr-low-risk-eligible.sh"
Cohesion: 0.35
Nodes (9): allVerifiableChecked(), applyChecks(), CHECKLIST_ISSUE, CHECKS, gh(), main(), runChecks(), BODY (+1 more)

### Community 88 - "@playwright/test"
Cohesion: 0.17
Nodes (4): seededState, @playwright/test@^1.64.1, @playwright/test, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY

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
Cohesion: 0.17
Nodes (27): Boosters: timer bar with Pop / Forfeit / Stack; preset switch refunds unused stacks (2026-10), Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake capacity Upgrade removed from the forced priority order — array completion is now the only gate, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Compute Boost, activateComputeBoost(), autoBoostFromTier() (+19 more)

### Community 96 - "Shared components reference"
Cohesion: 0.14
Nodes (13): `AppMenu/index.jsx`, `AppNav/index.jsx`, `BoostBadge/index.jsx`, `Button/index.jsx`, `BuyMaxToggle/index.jsx`, `BuyModeToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx` (+5 more)

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

### Community 101 - "Forced priority order"
Cohesion: 0.18
Nodes (25): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Forced priority order, flooredBitsLabel() (+17 more)

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
Cohesion: 0.15
Nodes (23): AutoBoostPresetPicker(), PresetButton, Row, BoostLane, BoostLaneRow(), BoostTimerBar(), BoostTimerRow, BoostTimerStack (+15 more)

### Community 106 - "resolutions"
Cohesion: 0.25
Nodes (8): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/@grpc/grpc-js, **/nanoid, **/typed-rest-client/qs, **/uuid

### Community 107 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 108 - "Foundry multiplier bar: one diverging bar tried and dropped (2026-10)"
Cohesion: 0.25
Nodes (8): Bitrate exponent moves 10% toward 1.0 per new Disk size (2026-11), Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Pool-reset achievements tune Bitrate's within-pool exponent steps (2026-11), Speed exponent rises with Foundry-reset Disk-size unlocks (2026-10), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), basisBitsForRawRate()

### Community 109 - "designer.md"
Cohesion: 0.25
Nodes (11): Perks regrouped by feature: Unlocks / Upgrades / Toggles → Automation / Prestige — 2026-11-03, buyAutomationIntervalUpgrade(), getAutobuyerIntervalUpgradeCost(), getAutomationIntervalMaxLevel(), getAutomationIntervalUpgradeCost(), getLiveChallengeForAutomation(), getSiCleanDoublingFactor(), isAutomationIntervalChainAvailable() (+3 more)

### Community 110 - "programmer.md"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 111 - "qa.md"
Cohesion: 0.29
Nodes (7): steps, continue-on-error, id, if, name, run, uses

### Community 112 - "Button"
Cohesion: 0.25
Nodes (16): Button, ButtonContent(), CloudSaveSection(), DELETE_STEP_MESSAGES, errorStatus(), IMPORT_ERRORS, ManualSaveSection(), SaveText (+8 more)

### Community 113 - "dailyChallenges.test.js"
Cohesion: 0.12
Nodes (15): canRestartDailyRun(), DAILY_AUTOMATIONS, DAILY_BOT_ACTION_ORDER, DAILY_FORMAT_BY_ID, DAILY_FORMATS, DAILY_GENERATOR_VERSION, DAILY_MODIFIER_POOL, DAILY_OBJECTIVE_KINDS (+7 more)

### Community 114 - "getPoolBufferBits"
Cohesion: 0.23
Nodes (16): A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Lake disk fills: full-pool start, uninterruptible (2026-11), applyDataLakeOverflow(), areStoragePoolDisksFull(), getDataLakeOverflowRatePercent(), getPoolBufferBits() (+8 more)

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

### Community 121 - "doubleDataLakeCapacity"
Cohesion: 0.16
Nodes (15): Changed, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap, Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever, Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Precision loss at large magnitudes in the SI-clean transform — fixed with a closed-form computation (+7 more)

### Community 122 - "BuyModeToggle/index.jsx"
Cohesion: 0.60
Nodes (4): BuyModeToggle(), ChoiceButton, OPTIONS, Row

### Community 123 - "getDataLakeUnitBits"
Cohesion: 0.29
Nodes (13): actCapacityUpgrade(), actFoundry(), formatCapacityLabel(), A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, `getDataLakeManualFillBitsNeeded` could offer a fill that Scale Out would immediately erase, seedDataLakeSave(), fillDataLakeBuffer(), fillDataLakeManually() (+5 more)

### Community 124 - "DiskArrayRow/index.jsx"
Cohesion: 0.10
Nodes (37): `DiskArrayRow/index.jsx`, activeDiskColor(), CacheBlock, CacheBlocksRow, CacheFillIndicator, DiskArrayRow(), diskGlowPulse, DiskSizeRow (+29 more)

### Community 126 - "isComputeMergeReserveStartAvailable"
Cohesion: 0.17
Nodes (12): Boosters: manual merge on automated tiers became instant (2026-10), instantComputeMergeAtBoundary(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable(), isComputeFabricsMergeStartAvailable(), isComputeGridsMergeStartAvailable() (+4 more)

### Community 127 - "ChallengesPage/index.jsx"
Cohesion: 0.26
Nodes (9): isDailyChallengesAvailable(), DAILY_CHALLENGES_FEATURE, base(), CHALLENGE_TABS, ChallengesPage(), Header, RootDiv, TabBar (+1 more)

### Community 128 - "tickComputeMergeBoundary"
Cohesion: 0.18
Nodes (11): tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer(), tickAutoMergeFabricsIntoCloud(), tickAutoMergeGridsIntoFabric(), tickAutoMergeNetworksIntoGrid(), tickAutoMergeNodesIntoCluster() (+3 more)

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
Cohesion: 0.43
Nodes (8): Daily challenges: seeded conditions, head start, calculated targets (2026-11), Daily challenges (epic #1062), getRunValue(), isRunWon(), playDailyRun(), setRun(), settleRun(), tickDailyRuns()

### Community 137 - "Compact screen layouts (epic #1135)"
Cohesion: 0.29
Nodes (7): Challenges — `ChallengesPage` Factory / Daily tabs (#1139), Compact screen layouts (epic #1135), Compute (Flops) — `ComputeFlopsPage` (#1138), Factory feature cards (#1137), Firmware → Automation (#1140), Foundry open pool (#1142), Power merge chain (#1141)

### Community 141 - "mergeState"
Cohesion: 0.06
Nodes (35): Accessibility, Added, Added, Added, Added, Added, Added, Added (+27 more)

## Knowledge Gaps
- **7 isolated node(s):** `PackageDescription`, `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js`, `file:src/game/storagePrefix.test.js` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1067 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `capacitor.build.gradle`, `layers.js`, `config.js`, `createInitialGameState`, `adversarialReviewMarker.js`, `adaptSaveForCurrentSchema`, `engine.test.js`, `App.foundry.test.jsx`, `navAttention.test.js`, `Button`, `dailyChallenges.test.js`, `storage.js`, `file-task-issue/SKILL.md`, `orphan-branch-scan.sh`, `ChallengesPage/index.jsx`, `engine.challengesTier.test.js`, `gradlew`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Are the 266 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `activateComputeBoost()` and `applyAutobuyerMilestones()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 266 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Hierarchical lake disks` be split into smaller, more focused modules?**
  _Cohesion score 0.12560386473429952 - nodes in this community are weakly interconnected._
- **Why does `Design history & rationale` connect `Shared components reference` to `Hierarchical lake disks`, `MainPage/index.jsx`, `Testing`, `Key engine functions (`src/game/engine.js`)`, `Daily challenges (epic #1062)`, `Automation workflows`, `createInitialGameState`, `README.md`, `mergeState`, `getTierCost`, `getStoragePoolBandwidth`, `Distribution`, `AGENTS.md`, `Economy model`, `normalizePoolMemoryCapacity`, `tickGame`, `tickDiskLevelOneCachePull`, `Documentation`, `generate-pwa-icons.mjs`, `engine.challengesTier.test.js`, `capacitor.settings.gradle`, `clampNonNegative`, `Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03`, `Foundry multiplier bar: one diverging bar tried and dropped (2026-10)`, `designer.md`, `getPoolBufferBits`, `isComputeMergeReserveStartAvailable`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `MainPage()` (e.g. with `Byte Foundry` and `Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework`) actually correct?**
  _`MainPage()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._