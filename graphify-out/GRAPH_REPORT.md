# Graph Report - tens  (2026-11-22)

## Corpus Check
- 249 files · ~618,526 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 33 file(s) not represented in the graph (top: (none) 11, .xml 9, .properties 2)

## Summary
- 3682 nodes · 10947 edges · 198 communities (157 shown, 41 thin omitted)
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 2318 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bf71433b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- engine.achievements.test.js
- MainPage/index.jsx
- Disks
- ComputePage/index.jsx
- layers.js
- Key engine functions (`src/game/engine.js`)
- engine.challengesTier.test.js
- Automation workflows
- dailyChallenges.js
- engine.test.js
- useIncrementalGame
- SettingsPage/index.jsx
- run-simulation.mjs
- App.foundry.test.jsx
- FactoryTab.jsx
- isComputeMergeReserveStartAvailable
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
- scaleUpGame
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
- run-simulation.mjs
- Package.swift
- CapApp-SPM/README.md
- Key engine functions (`src/game/engine.js`)
- stryker.config.json
- check-graphify-freshness.mjs
- Automation workflows
- Economy model — Byte Foundry (full text)
- scripts
- capacitor.build.gradle
- palette.md
- ref_node_url
- config.js
- BuyModeToggle/index.jsx
- capacitor.settings.gradle
- adversarialReviewMarker.js
- settings.gradle
- body
- palette.md
- getAutomationIntervalUpgradeCost
- AchievementsPage/index.jsx
- jsconfig.json
- Store listing drafts
- with
- ExampleInstrumentedTest.java
- normalizePoolMemoryCapacity
- End-to-end specs (Playwright)
- Copilot Instructions
- with
- Approved design
- Button
- pr-low-risk-eligible.sh
- @playwright/test
- slot
- steps
- backlog-issue-hygiene.sh
- MilestonesPage/index.jsx
- check-graphify-freshness.mjs
- Procedure
- Forced priority order
- Shared components reference
- Constants (`src/game/layers.js`)
- epic-407-issue-hygiene.sh
- lint-conflict-markers.mjs
- dev-team/SKILL.md
- navAttention.test.js
- store-release-notes.mjs
- env
- on
- AchievementToasts/index.jsx
- resolutions
- optimize-ai-files/SKILL.md
- Android release (Google Play)
- Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03
- programmer.md
- qa.md
- isBuyMaxUnlocked
- BoostTimerBar/index.jsx
- getComputeBoostLanes
- claude-deny-settings.sh
- pr-head-guard.sh
- sync-release-milestones.sh
- model
- permissions
- adversarialReviewMarker.js
- inputs
- browserslist
- store-release.yml
- theme/index.jsx
- AchievementsPage/index.test.jsx
- ChallengesPage/index.jsx
- mergeState
- End-to-end specs (Playwright)
- pull_request_template.md
- followup
- jsconfig.json
- admobAdapter.js
- getComputeFieldEffectiveCap
- MainActivity.java
- dev-team/SKILL.md
- Compact screen layouts (epic #1135)
- large-screen-mockups/generate.mjs
- publish-strategy.sh
- PWA support reference
- tickComputeMergeBoundary
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- orphan-branch-scan.sh
- pr-low-risk-eligible.sh
- resolve-pr-threads.sh
- sweep-stalled-auto-prs.sh
- .claude/CLAUDE.md
- session-start.sh
- AppNav/index.jsx
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
- seeds.mjs
- env
- env
- Store release (Google Play + App Store) — automated pipeline
- env
- with
- simulate-run-times/SKILL.md
- env
- simulate-daily-challenges.mjs
- SpeedDetailsPopover/index.jsx
- economy-change-review/SKILL.md
- play_status
- play_track
- clampNonNegative
- ios_action
- Foundry multiplier bar: one diverging bar tried and dropped (2026-10)
- AutoBoostPresetPicker/index.jsx
- getPrestigePowersPerPp
- Faster autobuyer unlocks, 5× challenge unlocks, cheaper PP upgrades (2026-11)
- FactoryTab.test.jsx
- Distribution
- Documentation

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 269 edges
2. `MainPage()` - 121 edges
3. `useIncrementalGame()` - 114 edges
4. `ByteFoundryPage()` - 110 edges
5. `MainPage reference` - 105 edges
6. `tickGame()` - 88 edges
7. `Testing` - 87 edges
8. `clampNonNegative()` - 85 edges
9. `createInitialGameState()` - 85 edges
10. `Economy model — Byte Foundry (full text)` - 85 edges

## Surprising Connections (you probably didn't know these)
- `Production speed bonus: automatic log10 → 1 PP purchase, 1 + log10(n) with ×1.1 first Purge — 2026-11-15 (#1098, #1097, #1100)` --references--> `buyPrestigeSpeedBonus()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js
- `Tier cost spacing growth and the 1.0 level-multiplier base (2026-11-21, #1178)` --references--> `getTierCostExponent()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js
- `Theming` --references--> `clearGameState()`  [INFERRED]
  CLAUDE.md → src/game/storage.js
- `2026-08-29 - Prototype Pollution in Dev Mode Field Editing` --references--> `setValueAtPath()`  [INFERRED]
  .jules/sentinel.md → src/pages/DevModePage/stateFields.js
- `Data Stream balance kept through Prestige (#1096)` --references--> `buildEraIntroReset()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (198 total, 41 thin omitted)

### Community 0 - "engine.achievements.test.js"
Cohesion: 0.16
Nodes (21): Security notes, Spent QB gates last-tier credit; last tier may spend to 0 (2026-11), Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, The last tier's XP-funded tickspeed, Tickspeed multiplier, buyTickspeedMultiplier(), detectAchievements(), getAutobuyerUnlockCost() (+13 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.05
Nodes (72): formatDiskSizeInPoolUnit(), formatPoolBalance(), formatPoolBalanceStable(), formatSpeedText(), formatThreeSignificant(), getDataStreamSpeedExponent(), getPoolBalanceUnit(), getPoolFixedUnit() (+64 more)

### Community 2 - "Disks"
Cohesion: 0.09
Nodes (56): Byte Foundry, What it does, `DiskArrayRow/index.jsx`, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate (+48 more)

### Community 3 - "ComputePage/index.jsx"
Cohesion: 0.13
Nodes (29): isComputeMergeStartAvailableAtBoundary(), ArmedStatusText, BoostCard, BoostRow, BoostsHint, canMerge(), ChargerBadge, ChargerStatus (+21 more)

### Community 4 - "layers.js"
Cohesion: 0.03
Nodes (109): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, CHALLENGE_BOUNDARIES, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, decrementFullDiskCount(), FILL_CURVE_LN_A, FILL_CURVE_LN_B (+101 more)

### Community 5 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.08
Nodes (70): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, Cache Warm targets the highest pool being filled (2026-11-19) (+62 more)

### Community 6 - "engine.challengesTier.test.js"
Cohesion: 0.12
Nodes (36): Purge code rename: reboot → purge (2026-11, #987), Achievements (epic #1046, basic slice), Prestige Points, autobuyer unlock, and the tickspeed multiplier, Tiers, Prestige, Reboot (Era ascension), applyCacheWarm(), applyChallengeStepEffects(), autoCompleteChallenges(), SHIPPED_LIVE (+28 more)

### Community 7 - "Automation workflows"
Cohesion: 0.06
Nodes (71): Bits subline under MoneyHero; `+n/8` dropped from tier Buy buttons — 2026-11-09, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Single-line tier rows; exponential notation from 10,000 (2026-11), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, App.jsx routing and the Foundry gate, MainPage reference, progressFill() (+63 more)

### Community 8 - "dailyChallenges.js"
Cohesion: 0.05
Nodes (68): Daily challenges: seeded conditions, head start, calculated targets (2026-11), Daily challenges (epic #1062), AUTOMATION_BY_KEY, buildDailyCandidate(), calculateAttemptMark(), calculateTarget(), createRng(), DAILY_AUTOMATIONS (+60 more)

### Community 9 - "engine.test.js"
Cohesion: 0.03
Nodes (67): AUTOBUYER_UNIT_BATCH, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric, enableAutoMergeNetworksIntoGrid (+59 more)

### Community 10 - "useIncrementalGame"
Cohesion: 0.15
Nodes (29): Architecture, Security notes, `OfflineProgressNotice/index.jsx`, Buy max mode, Buy mode (Level / Single), Offline progress, Native apps (Capacitor — #70), Native apps (Capacitor) reference (+21 more)

### Community 11 - "SettingsPage/index.jsx"
Cohesion: 0.10
Nodes (45): Settings + Milestones (#1143), styled-components, ButtonContent(), getEonsAwarded(), buildClearSlotConfirmMessage(), CloudSaveSection(), DELETE_STEP_MESSAGES, errorStatus() (+37 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.10
Nodes (41): ButtonIcon, ButtonLabel, VisuallyHidden, getFlopsAutobuyerUnlockEra(), getGlobalAutomationUnlockMilestone(), getTierTickspeedIntervalSeconds(), Badge, Category (+33 more)

### Community 13 - "App.foundry.test.jsx"
Cohesion: 0.07
Nodes (35): version, @testing-library/user-event, derivePurchaseFieldsFromCounts(), expandSettingsSections(), openSettings(), seedMainGameState(), ALL_TIER_IDS, derivePurchaseFieldsFromCounts() (+27 more)

### Community 14 - "FactoryTab.jsx"
Cohesion: 0.10
Nodes (39): react, Banner, ChallengeBanner(), Rule, Text, Title, ChallengeExitButton(), Actions (+31 more)

### Community 15 - "isComputeMergeReserveStartAvailable"
Cohesion: 0.17
Nodes (12): Boosters: manual merge on automated tiers became instant (2026-10), instantComputeMergeAtBoundary(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable(), isComputeFabricsMergeStartAvailable(), isComputeGridsMergeStartAvailable() (+4 more)

### Community 16 - "getTierCost"
Cohesion: 0.12
Nodes (44): wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Factory tier cost series: shared linear increments → per-tier constant increments — 2026-11-16 (#1098), Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check (+36 more)

### Community 17 - "storage.js"
Cohesion: 0.14
Nodes (39): Dev Mode, Dev Mode Reference, adaptSaveForLoad(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), BUY_MAX_PREFERENCE_KEY, BUY_UNIT_PREFERENCE_KEY, clearAllSaveProgress() (+31 more)

### Community 18 - "DevModePage/index.jsx"
Cohesion: 0.10
Nodes (43): ButtonGrid, describeNumber(), Details, DevModePage(), FieldControls, FieldLabel, FieldNode(), FieldRow (+35 more)

### Community 19 - "with"
Cohesion: 0.05
Nodes (42): concurrency, cancel-in-progress, group, if, runs-on, steps, timeout-minutes, GH_TOKEN (+34 more)

### Community 20 - "store-assets/generate.mjs"
Cohesion: 0.17
Nodes (21): NAVIGATION, args, captureScene(), main(), PORT, renderFeatureGraphic(), writeOpaquePng(), APP_STORE_SLOT_LIMIT (+13 more)

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

### Community 26 - "navAttention.js"
Cohesion: 0.11
Nodes (30): Sacrifice confirm: in-game dialog; Core warning only when unlocked, buySleepModeCapUpgrade(), getAutobuyerIntervalSeconds(), getAutomationIntervalSeconds(), getLiveChallengeForAutomation(), getPrestigeDoublePpUpgradeCost(), getSleepModeCapLevel(), getSleepModeCapUpgradeCost() (+22 more)

### Community 27 - "scaleUpGame"
Cohesion: 0.08
Nodes (42): 2. Load the repo's invariants, Overclock no longer banks completed levels — 2026-11-11, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, `scaleUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry, Speed Up renamed to Scale Up and redesigned from a last-tier-only gate to a per-tier unlock ladder — 2026-09-09, Starting Money reduced from 10 to 1, Storage auto-redeem toggle button removed for now, default flipped to always-on, The Byte Foundry becomes a per-Prestige-cycle mechanic, not a one-time gate (+34 more)

### Community 28 - "DiskArrayRow/index.jsx"
Cohesion: 0.09
Nodes (49): A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit, Pool isolation: disk write-cache merges no longer cross pool boundaries, The "stranded disks never touch write-cache either" rule (from the two Devin Review findings above) itself turned out to be the bug: it permanently starved every disk size past the first one (+41 more)

### Community 29 - "InfoPage/index.jsx"
Cohesion: 0.07
Nodes (35): Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getTierTickspeedAutobuyerMilestone(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTOBUYER_INTERVAL_UPGRADE_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_STEP, BUY_MAX_UNLOCK_COST (+27 more)

### Community 30 - "env"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 31 - "gradlew"
Cohesion: 0.08
Nodes (32): devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2, jsdom@^31.0.0, sharp@^0.35.5, @stryker-mutator/core@^10.1.1, @stryker-mutator/vitest-runner@^10.1.1, @testing-library/dom@^10.4.1 (+24 more)

### Community 32 - "DailyTab.jsx"
Cohesion: 0.12
Nodes (31): canRestartDailyRun(), generateDailyChallenge(), getDailyCredits(), getMsUntilNextUtcDay(), getRunProgress(), getUtcDateId(), isDailyAutomationOn(), ActionButton (+23 more)

### Community 33 - "Shared components reference"
Cohesion: 0.06
Nodes (31): #988 leftover mixed labels after stacking onto #990 (2026-11), Bits subline adds no Factory header height — 2026-11-09, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost lanes (parallel multipliers + same-multiplier queue), Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Stream balance kept through Prestige (#1096), Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale (+23 more)

### Community 34 - "App.jsx"
Cohesion: 0.22
Nodes (16): Prestige info is hidden until first prestige, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), isComputeFlopsPageRevealed(), isPerksPageRevealed(), getComputeFlopsAttentionLevel() (+8 more)

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
Cohesion: 0.20
Nodes (14): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), isPlainObject(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), isPlainObject() (+6 more)

### Community 41 - "env"
Cohesion: 0.07
Nodes (27): CEILING_FULL, CLAUDE_OUTCOME, CODE_SCANNING_ALERTS, DEPENDABOT_ALERTS, DEPENDABOT_PRS, EVENT_SCHEDULE, FAILING_PRS, GH_TOKEN (+19 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.16
Nodes (22): Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight(), getComputeFlopsTotal(), BoostText (+14 more)

### Community 43 - "DataLakePanel/index.jsx"
Cohesion: 0.05
Nodes (115): Changed, actCapacityUpgrade(), actFoundry(), `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18 (+107 more)

### Community 44 - "steps"
Cohesion: 0.06
Nodes (32): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, default, description (+24 more)

### Community 45 - "steps"
Cohesion: 0.08
Nodes (24): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, FAIL_MARKER, GH_TOKEN (+16 more)

### Community 46 - "Economy model"
Cohesion: 0.08
Nodes (41): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost (+33 more)

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
Cohesion: 0.14
Nodes (11): createPrefixedStorage(), installStoragePrefix(), rootElement, reportWebVitals(), AUTH_ERROR_MESSAGES, loadCloudSave(), createMonetizationService(), getMonetizationService() (+3 more)

### Community 55 - "orphan-branch-scan.sh"
Cohesion: 0.16
Nodes (15): ADS_PLUGIN, BASE_PLUGINS, buildIncludePlugins(), config, IAP_PLUGIN, root, srcPath, buildFeaturesModule() (+7 more)

### Community 56 - "run-simulation.mjs"
Cohesion: 0.15
Nodes (19): actMainBuys(), actPlayer(), actSoftResets(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, formatCapacityLabel(), MAX_TICKS (+11 more)

### Community 57 - "Package.swift"
Cohesion: 0.10
Nodes (18): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+10 more)

### Community 58 - "CapApp-SPM/README.md"
Cohesion: 0.11
Nodes (19): dependencies, @capacitor/android@^8.5.3, @capacitor/ios@^8.5.3, @capacitor/splash-screen@^8.0.2, firebase@^13.2.0, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0, react@^19.3.1 (+11 more)

### Community 59 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.12
Nodes (40): A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Fill multiplier 10× → 0.1× (log-linear) and a multiplicative tap bonus — 2026-10-30, Tap bonuses moved from buffer fills to their consumers (2026-11), Key engine functions (`src/game/engine.js`), Pool Memory Capacity and Bandwidth, Tap, Compile and Data Stream, Upgrade Data Stream (Capacity / Bitrate) (+32 more)

### Community 60 - "stryker.config.json"
Cohesion: 0.10
Nodes (19): concurrency, coverageAnalysis, htmlReporter, fileName, jsonReporter, fileName, mutate, plugins (+11 more)

### Community 61 - "check-graphify-freshness.mjs"
Cohesion: 0.20
Nodes (12): ALLOWED_TOP_LEVEL_KEYS, analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findMalformedGraphEntries(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef() (+4 more)

### Community 62 - "Automation workflows"
Cohesion: 0.10
Nodes (20): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, CodeQL (`codeql.yml`), Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Main CI heal (`main-ci-heal.yml`, #37) (+12 more)

### Community 63 - "Economy model — Byte Foundry (full text)"
Cohesion: 0.14
Nodes (35): Foundry-reset rebuild moved off the fill multiplier (2026-10), Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch, "Free" Foundry-reset rebuild means one fill per disk, not zero bits (2026-11), Lake disk fills: full-pool start, uninterruptible (2026-11), Provision Disk: buffer-funded at a fixed speed, never fill-multiplied (2026-11), Upgrade Capacity / Upgrade Speed, Economy model — Byte Foundry (full text), Foundry Mechanics Reference (+27 more)

### Community 64 - "scripts"
Cohesion: 0.09
Nodes (22): scripts, android:aab, android:apk:release, audit, build, build:capacitor, build:dev, bump-version (+14 more)

### Community 65 - "capacitor.build.gradle"
Cohesion: 0.15
Nodes (10): deleteAccountAndData(), app, auth, db, deleteAccount(), downloadSave(), requireUser(), saveDocFor() (+2 more)

### Community 66 - "palette.md"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, on, push, permissions (+8 more)

### Community 67 - "ref_node_url"
Cohesion: 0.11
Nodes (13): workflow, workflowPath, script, zeroWork, bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks() (+5 more)

### Community 68 - "config.js"
Cohesion: 0.16
Nodes (12): @revenuecat/purchases-capacitor@14.1.0, @revenuecat/purchases-capacitor, ADMOB_TEST_REWARDED_IDS, IAP_PRODUCTS, PRIVACY_POLICY_URL, realRewardedIds, REMOVE_ADS_ENTITLEMENT, REVENUECAT_API_KEYS (+4 more)

### Community 69 - "BuyModeToggle/index.jsx"
Cohesion: 0.60
Nodes (4): BuyModeToggle(), ChoiceButton, OPTIONS, Row

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

### Community 75 - "getAutomationIntervalUpgradeCost"
Cohesion: 0.47
Nodes (6): Perks regrouped by feature: Unlocks / Upgrades / Toggles → Automation / Prestige — 2026-11-03, getAutobuyerIntervalUpgradeCost(), getAutomationIntervalUpgradeCost(), getSiCleanDoublingFactor(), getTierTickspeedIntervalUpgradeCost(), siCleanSeriesCost()

### Community 76 - "AchievementsPage/index.jsx"
Cohesion: 0.14
Nodes (23): Achievements (epic #1046, basic slice), Economy model, getAchievementGroupStars(), getAchievementProgress(), getAchievementReward(), getAchievementShortRequirement(), getAchievementStars(), ACHIEVEMENT_SERIES_BY_MEMBER (+15 more)

### Community 77 - "jsconfig.json"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Manual, Scripts, Security notes (+1 more)

### Community 78 - "Store listing drafts"
Cohesion: 0.14
Nodes (13): Apple — App Privacy ("nutrition label"), Cloud save on, Cloud save on (Firebase config set; ads and IAP off), Content rating (Play IARC questionnaire / App Store age rating), Google Play — Data safety, Listing text, No optional features (no Firebase config, ads and IAP off), Store assets (+5 more)

### Community 79 - "with"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, fetch-depth, github_token, node-version (+5 more)

### Community 81 - "normalizePoolMemoryCapacity"
Cohesion: 0.19
Nodes (34): Fixed, Removed, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09, Devin Review on PR #614: a false-update bug, a stale comment, and a deliberately-unfixed legacy-save ambiguity — 2026-09-09 (+26 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.21
Nodes (10): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), overwrite(), pngSize(), renderSplash() (+2 more)

### Community 83 - "Copilot Instructions"
Cohesion: 0.17
Nodes (11): concurrency, cancel-in-progress, group, jobs, name, permissions, contents, id-token (+3 more)

### Community 84 - "with"
Cohesion: 0.17
Nodes (12): with, base_branch, branch_prefix, claude_args, claude_code_oauth_token, fetch-depth, github_token, install (+4 more)

### Community 85 - "Approved design"
Cohesion: 0.07
Nodes (27): Approved design, Control Room early (S2): only unlocked cards; empty right column dropped, Control Room (opt-in): Supply loop left, Factory centre, PP desk + Runs right, Desktop browser 1920×1080: same layout by size (shared max content width per pane is required, #1156), Galaxy Z Fold 7 inner (984×1016): two portrait pages, divider locked on the fold, Galaxy Z Fold 7 inner held sideways (1040×932): two portrait pages; fold is horizontal here, so treated as flat, iPhone Duo inner, held sideways (~890×626 pt): icon rail + two portrait pages on the fold, Large-screen layout mockups (epic #1152) (+19 more)

### Community 86 - "Button"
Cohesion: 0.10
Nodes (27): `Button/index.jsx`, renderDiskArrayRow(), Button, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, pulse (+19 more)

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

### Community 95 - "Forced priority order"
Cohesion: 0.26
Nodes (19): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Forced priority order, flooredBitsLabel(), floorToDecimals() (+11 more)

### Community 96 - "Shared components reference"
Cohesion: 0.15
Nodes (12): `AchievementToasts/index.jsx`, `AppMenu/index.jsx`, `AppNav/index.jsx`, `BoostBadge/index.jsx`, `BuyMaxToggle/index.jsx`, `BuyModeToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx` (+4 more)

### Community 97 - "Constants (`src/game/layers.js`)"
Cohesion: 0.15
Nodes (29): actTickspeed(), `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Prestige and the Googol freeze, The global tickspeed multiplier, buyGlobalTickspeedMultiplier() (+21 more)

### Community 98 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 99 - "lint-conflict-markers.mjs"
Cohesion: 0.33
Nodes (7): findConflictMarkers(), isScannable(), main(), MARKER_RE, E, L, R

### Community 100 - "dev-team/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 101 - "navAttention.test.js"
Cohesion: 0.08
Nodes (26): vitest, buyComputeFlopsTier(), getComputeFlopsAffordableQuantity(), AUTOMATION_INTERVAL_CONFIG, BITS_PER_BYTE, CHALLENGE_DEFINITIONS, CLOCK_DRIFT_INTERVAL_SECONDS, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC (+18 more)

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
Cohesion: 0.17
Nodes (15): ACHIEVEMENT_TOAST_MAX_VISIBLE, ACHIEVEMENT_TOAST_STAGGER_MS, ACHIEVEMENT_TOAST_VISIBLE_MS, AchievementToasts(), createScheduler(), pump(), getEarnedIds(), isTabHidden() (+7 more)

### Community 106 - "resolutions"
Cohesion: 0.25
Nodes (8): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/@grpc/grpc-js, **/nanoid, **/typed-rest-client/qs, **/uuid

### Community 107 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 108 - "Android release (Google Play)"
Cohesion: 0.25
Nodes (7): Android release (Google Play), Build the signed AAB, Edge-to-edge, splash, icon, One-time setup, Optional features (all off by default), Permission audit, Upload to a testing track

### Community 109 - "Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03"
Cohesion: 0.20
Nodes (24): Boosters: timer bar with Pop / Forfeit / Stack; preset switch refunds unused stacks (2026-10), Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Compute Boost, activateComputeBoost(), autoBoostFromTier(), canActivateComputeBoost() (+16 more)

### Community 110 - "programmer.md"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 111 - "qa.md"
Cohesion: 0.29
Nodes (7): steps, continue-on-error, id, if, name, run, uses

### Community 112 - "isBuyMaxUnlocked"
Cohesion: 0.12
Nodes (18): BuyMaxToggle(), Switch, isBuyMaxUnlocked(), AutomationRow(), Cell, CellAction, CellHead, Details (+10 more)

### Community 113 - "BoostTimerBar/index.jsx"
Cohesion: 0.20
Nodes (18): BoostLane, BoostLaneRow(), BoostTimerBar(), BoostTimerRow, BoostTimerStack, CompactButton, describeCoveredTiers(), formatPresetDuration() (+10 more)

### Community 114 - "getComputeBoostLanes"
Cohesion: 0.23
Nodes (15): Architecture 4b — `ComputePage/index.jsx`, boostGlow, boostPulse, COMPUTE_BOOST_LABELS, getComputeBoostDescription(), isBoostActive(), isDataStreamBoosted(), isFactoryTierBoosted() (+7 more)

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
Nodes (14): platforms, play_rollout, upload_listing, default, description, options, type, default (+6 more)

### Community 122 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 123 - "store-release.yml"
Cohesion: 0.17
Nodes (11): concurrency, cancel-in-progress, group, jobs, name, on, push, workflow_dispatch (+3 more)

### Community 124 - "theme/index.jsx"
Cohesion: 0.16
Nodes (12): GlobalStyle, getSystemThemeMode(), DEFAULT_MODE, font, MODES, motion, palette, radius (+4 more)

### Community 126 - "AchievementsPage/index.test.jsx"
Cohesion: 0.22
Nodes (10): Theming reference, AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle, gameWith() (+2 more)

### Community 127 - "ChallengesPage/index.jsx"
Cohesion: 0.39
Nodes (8): isDailyChallengesAvailable(), ChallengeStartDialog(), CHALLENGE_TABS, ChallengesPage(), Header, RootDiv, TabBar, TabButton

### Community 128 - "mergeState"
Cohesion: 0.20
Nodes (12): Testing, Migration in `src/save-migration/`, runs on every load — 2026-08-22, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, createEmptyDataLakes(), createEmptyDataLakeTier(), applyPendingComputeGrants(), getLegacyPendingTransferCount(), isLegacyDataLakeTier() (+4 more)

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

### Community 134 - "getComputeFieldEffectiveCap"
Cohesion: 0.22
Nodes (11): Power merge chain and charge-built Chargers (2026-11-20, #1141), getChargerUnlockProgress(), getComputeChargeSeconds(), getComputeChargeTransfers(), getComputeFieldEffectiveCap(), getComputeReserveHeld(), isComputeChargeAvailable(), isComputeCharging() (+3 more)

### Community 137 - "Compact screen layouts (epic #1135)"
Cohesion: 0.29
Nodes (7): Challenges — `ChallengesPage` Factory / Daily tabs (#1139), Compact screen layouts (epic #1135), Compute (Flops) — `ComputeFlopsPage` (#1138), Factory feature cards (#1137), Firmware → Automation (#1140), Foundry open pool (#1142), Power merge chain (#1141)

### Community 138 - "large-screen-mockups/generate.mjs"
Cohesion: 0.18
Nodes (13): applyTweaks(), args, capturePane(), main(), outDir, PORT, galleryMarkdown(), cleanups (+5 more)

### Community 141 - "tickComputeMergeBoundary"
Cohesion: 0.18
Nodes (11): tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer(), tickAutoMergeFabricsIntoCloud(), tickAutoMergeGridsIntoFabric(), tickAutoMergeNetworksIntoGrid(), tickAutoMergeNodesIntoCluster() (+3 more)

### Community 151 - "AppNav/index.jsx"
Cohesion: 0.31
Nodes (9): APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem, pulseHigh (+1 more)

### Community 175 - "seeds.mjs"
Cohesion: 0.27
Nodes (13): BUY_QUANTITY, seedState(), buildSeeds(), CAREER_PURGES, earnedIds(), FOUNDRY_SNAPSHOT_SECONDS, playCareer(), playFreshSave() (+5 more)

### Community 176 - "env"
Cohesion: 0.18
Nodes (11): env, if, runs-on, timeout-minutes, PLAY_ROLLOUT, PLAY_STATUS, PLAY_TRACK, TENS_ADMOB_APP_ID_ANDROID (+3 more)

### Community 177 - "env"
Cohesion: 0.20
Nodes (10): ASC_ISSUER_ID, ASC_KEY_ID, ASC_KEY_P8, KEY_ALIAS, KEY_PASSWORD, KEYSTORE, PLAY_JSON, PLAY_SERVICE_ACCOUNT_JSON (+2 more)

### Community 178 - "Store release (Google Play + App Store) — automated pipeline"
Cohesion: 0.15
Nodes (12): Changing the assets, Devices covered, GitHub secrets (Settings → Secrets and variables → Actions → Secrets), GitHub variables (same page → Variables), Known release blocker, Large-screen and foldable readiness (app side), Maintainer prerequisites (in order), Running locally (+4 more)

### Community 179 - "env"
Cohesion: 0.20
Nodes (10): APPLE_TEAM_ID, IOS_ACTION, TENS_ADMOB_APP_ID_IOS, VITE_ADMOB_REWARDED_ID_IOS, VITE_REVENUECAT_API_KEY_IOS, env, if, runs-on (+2 more)

### Community 180 - "with"
Cohesion: 0.17
Nodes (15): steps, steps, if, name, run, uses, with, bundler-cache (+7 more)

### Community 181 - "simulate-run-times/SKILL.md"
Cohesion: 0.40
Nodes (4): Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run

### Community 182 - "env"
Cohesion: 0.25
Nodes (8): env, UPLOAD_LISTING, VITE_FIREBASE_API_KEY, VITE_FIREBASE_APP_ID, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_TENS_ADS_ENABLED, VITE_TENS_IAP_ENABLED

### Community 183 - "simulate-daily-challenges.mjs"
Cohesion: 0.22
Nodes (5): args, dates, DAYS, FROM, ONE

### Community 184 - "SpeedDetailsPopover/index.jsx"
Cohesion: 0.39
Nodes (7): react-dom@^19.3.1, react-dom, Heading, Note, Panel, Rows, SpeedDetailsPopover()

### Community 185 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 186 - "play_status"
Cohesion: 0.40
Nodes (5): play_status, default, description, options, type

### Community 187 - "play_track"
Cohesion: 0.40
Nodes (5): play_track, default, description, options, type

### Community 188 - "clampNonNegative"
Cohesion: 0.11
Nodes (35): 5. Authorization boundary, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Daily challenges (epic #1062), Pause/resume for the global automations, Reboot and Kernels (#407), Tier autobuyer/tier-tickspeed-autobuyer milestones, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, addActivePlaySeconds() (+27 more)

### Community 189 - "ios_action"
Cohesion: 0.40
Nodes (5): ios_action, default, description, options, type

### Community 190 - "Foundry multiplier bar: one diverging bar tried and dropped (2026-10)"
Cohesion: 0.25
Nodes (8): Bitrate exponent moves 10% toward 1.0 per new Disk size (2026-11), Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Pool-reset achievements tune Bitrate's within-pool exponent steps (2026-11), Speed exponent rises with Foundry-reset Disk-size unlocks (2026-10), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), basisBitsForRawRate()

### Community 191 - "AutoBoostPresetPicker/index.jsx"
Cohesion: 0.60
Nodes (4): AutoBoostPresetPicker(), PresetButton, Row, COMPUTE_BOOST_DISPLAY

### Community 192 - "getPrestigePowersPerPp"
Cohesion: 0.67
Nodes (4): getPrestigeDoublePpHalvingLevels(), getPrestigePowersPerPp(), getPrestigePpPerPower(), compressionStep()

### Community 193 - "Faster autobuyer unlocks, 5× challenge unlocks, cheaper PP upgrades (2026-11)"
Cohesion: 0.67
Nodes (3): Compact layouts per screen — three reversed decisions (2026-11-19, epic #1135), Faster autobuyer unlocks, 5× challenge unlocks, cheaper PP upgrades (2026-11), No grandfathering of unpurchased or unearned unlocks (2026-11-18, #1130)

### Community 194 - "FactoryTab.test.jsx"
Cohesion: 0.22
Nodes (7): getAutobuyerBulkExtraLevels(), getAutobuyerBulkLevels(), getAutobuyerIntervalMaxLevel(), getAutobuyerSpeedUpgradeMaxLevel(), getAutomationIntervalMaxLevel(), getIntervalMaxLevelForBase(), getTierTickspeedIntervalMaxLevel()

## Knowledge Gaps
- **7 isolated node(s):** `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js`, `file:src/game/storagePrefix.test.js`, `file:src/pages/SettingsPage/ManualSaveSection.jsx` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1189 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design history & rationale` connect `Shared components reference` to `engine.achievements.test.js`, `Disks`, `Key engine functions (`src/game/engine.js`)`, `engine.challengesTier.test.js`, `Automation workflows`, `dailyChallenges.js`, `isComputeMergeReserveStartAvailable`, `getTierCost`, `navAttention.js`, `scaleUpGame`, `DataLakePanel/index.jsx`, `Economy model`, `Key engine functions (`src/game/engine.js`)`, `Foundry multiplier bar: one diverging bar tried and dropped (2026-10)`, `Economy model — Byte Foundry (full text)`, `Faster autobuyer unlocks, 5× challenge unlocks, cheaper PP upgrades (2026-11)`, `Distribution`, `Documentation`, `capacitor.settings.gradle`, `getAutomationIntervalUpgradeCost`, `jsconfig.json`, `normalizePoolMemoryCapacity`, `Constants (`src/game/layers.js`)`, `Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 268 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `activateComputeBoost()` and `applyAutobuyerMilestones()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 268 INFERRED edges - model-reasoned connections that need verification._
- **What connects `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05368382080710848 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `navAttention.test.js` to `engine.achievements.test.js`, `layers.js`, `admobAdapter.js`, `engine.challengesTier.test.js`, `dailyChallenges.js`, `engine.test.js`, `useIncrementalGame`, `SettingsPage/index.jsx`, `App.foundry.test.jsx`, `storage.js`, `gradlew`, `DailyTab.jsx`, `adaptSaveForCurrentSchema`, `file-task-issue/SKILL.md`, `orphan-branch-scan.sh`, `capacitor.build.gradle`, `FactoryTab.test.jsx`, `config.js`, `adversarialReviewMarker.js`, `Button`, `AchievementsPage/index.test.jsx`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `MainPage()` (e.g. with `Byte Foundry` and `Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework`) actually correct?**
  _`MainPage()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `Disks` be split into smaller, more focused modules?**
  _Cohesion score 0.08571428571428572 - nodes in this community are weakly interconnected._