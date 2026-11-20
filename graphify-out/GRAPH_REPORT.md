# Graph Report - tens  (2026-11-20)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 3390 nodes · 10302 edges · 175 communities (133 shown, 42 thin omitted)
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 2191 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `354109fd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Byte Foundry
- MainPage/index.jsx
- AppDelegate
- layers.js
- layers.js
- Key engine functions (`src/game/engine.js`)
- clampNonNegative
- Automation workflows
- dailyChallenges.js
- engine.test.js
- engine.js
- SettingsPage/index.jsx
- run-simulation.mjs
- App.foundry.test.jsx
- FactoryTab.jsx
- createInitialGameState
- getTierCost
- storage.js
- DevModePage/index.jsx
- with
- Testing
- bump-version.mjs
- MilestonesPage/index.jsx
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
- scripts
- tickGame
- steps
- scaleUpGame
- Procedure
- Automation workflows
- ref_node_fs
- backlog-issue-hygiene.sh
- pr-conflict-sweep.yml
- steps
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- orphan-branch-scan.sh
- generate-pwa-icons.mjs
- Package.swift
- CapApp-SPM/README.md
- classify-claude-failure.sh
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
- lint-workflow-shell.mjs
- pull_request_template.md
- jsconfig.json
- Store listing drafts
- with
- ExampleInstrumentedTest.java
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- with
- admobAdapter.js
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- @playwright/test
- slot
- steps
- backlog-issue-hygiene.sh
- MilestonesPage/index.jsx
- check-graphify-freshness.mjs
- Procedure
- session-start.sh
- Shared components reference
- ext-loader.mjs
- epic-407-issue-hygiene.sh
- lint-conflict-markers.mjs
- dev-team/SKILL.md
- hasTiersGameAttention
- Android release (Google Play)
- env
- on
- resolve-pr-threads.sh
- resolutions
- optimize-ai-files/SKILL.md
- Foundry multiplier bar: one diverging bar tried and dropped (2026-10)
- designer.md
- programmer.md
- qa.md
- graphify reference: query, path, explain
- resetByteFoundry
- getPrestigePointsAwarded
- claude-deny-settings.sh
- pr-head-guard.sh
- sync-release-milestones.sh
- model
- permissions
- adversarialReviewMarker.js
- isBuyMaxUnlocked
- BuyModeToggle/index.jsx
- getPrestigeDoublePpUpgradeCost
- variables.gradle
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- CapApp-SPM.swift
- End-to-end specs (Playwright)
- pull_request_template.md
- followup
- jsconfig.json
- getPrestigePowersPerPp
- coerceMeta
- MainActivity.java
- dev-team/SKILL.md
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- publish-strategy.sh
- PWA support reference
- End-to-end testing
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- orphan-branch-scan.sh
- pr-low-risk-eligible.sh
- resolve-pr-threads.sh
- sweep-stalled-auto-prs.sh
- .claude/CLAUDE.md
- session-start.sh
- extraction-spec.md
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

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 258 edges
2. `Byte Foundry` - 178 edges
3. `MainPage()` - 122 edges
4. `useIncrementalGame()` - 113 edges
5. `ByteFoundryPage()` - 109 edges
6. `MainPage reference` - 103 edges
7. `Testing` - 87 edges
8. `clampNonNegative()` - 85 edges
9. `Economy model — Byte Foundry (full text)` - 85 edges
10. `createInitialGameState()` - 81 edges

## Surprising Connections (you probably didn't know these)
- `Data Lake Boosters: spending real deposits, not a separate "used" ledger` --references--> `getDataLakeDepositedUnits()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js
- `Hierarchical Data Lake disks + direct pool disk fills (2026-11, #1087)` --references--> `getDataLakeReachableUnits()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js
- `Storage auto-redeem toggle button removed for now, default flipped to always-on` --references--> `createInitialGameState()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js
- `Theming` --references--> `clearGameState()`  [INFERRED]
  CLAUDE.md → src/game/storage.js
- `Added` --references--> `mergeState()`  [INFERRED]
  CHANGELOG.md → src/game/storage.js

## Import Cycles
- None detected.

## Communities (175 total, 42 thin omitted)

### Community 0 - "Byte Foundry"
Cohesion: 0.06
Nodes (111): Changed, actCapacityUpgrade(), actFoundry(), formatCapacityLabel(), `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too (+103 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (111): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Speed exponent rises with Foundry-reset Disk-size unlocks (2026-10), isDataStreamBoosted(), isPoolBoosted() (+103 more)

### Community 2 - "AppDelegate"
Cohesion: 0.05
Nodes (91): Fixed, `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim (+83 more)

### Community 3 - "layers.js"
Cohesion: 0.05
Nodes (87): Boosters: timer bar with Pop / Forfeit / Stack; preset switch refunds unused stacks (2026-10), Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Architecture 4b — `ComputePage/index.jsx`, Foundry Mechanics Reference, AutoBoostPresetPicker() (+79 more)

### Community 4 - "layers.js"
Cohesion: 0.03
Nodes (85): ACHIEVEMENT_BY_ID, ADDRESS_SPACE_TIER_COUNT, AUTOBUYER_BASE_INTERVAL_SECONDS, AUTOBUYER_BULK_MAX_EXTRA_LEVELS, AUTOBUYER_INTERVAL_MULTIPLIER, AUTOBUYER_MIN_INTERVAL_SECONDS, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START (+77 more)

### Community 5 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.08
Nodes (78): Byte Foundry, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, Fill multiplier 10× → 0.1× (log-linear) and a multiplicative tap bonus — 2026-10-30 (+70 more)

### Community 6 - "clampNonNegative"
Cohesion: 0.08
Nodes (74): Security notes, 2. Load the repo's invariants, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Production speed bonus: 10k PP unlock +1%/PP → automatic log10(Purge count) — 2026-11-09, Purge code rename: reboot → purge (2026-11, #987), Achievements (epic #1046, basic slice), Pause/resume for the global automations, Prestige Points, autobuyer unlock, and the tickspeed multiplier (+66 more)

### Community 7 - "Automation workflows"
Cohesion: 0.06
Nodes (73): Bits subline under MoneyHero; `+n/8` dropped from tier Buy buttons — 2026-11-09, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Overclock no longer banks completed levels — 2026-11-11, Single-line tier rows; exponential notation from 10,000 (2026-11), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, MainPage reference, progressFill(), formatAsCleanBytesIfExactMultiple() (+65 more)

### Community 8 - "dailyChallenges.js"
Cohesion: 0.05
Nodes (68): Daily challenges: seeded conditions, head start, calculated targets (2026-11), Daily challenges (epic #1062), AUTOMATION_BY_KEY, buildDailyCandidate(), calculateAttemptMark(), calculateTarget(), createRng(), DAILY_AUTOMATIONS (+60 more)

### Community 9 - "engine.test.js"
Cohesion: 0.04
Nodes (40): Boosters: manual merge on automated tiers became instant (2026-10), getDataLakeCurrentDiskFillFraction, getLastTierLevelCreditIntervalSeconds(), instantComputeMergeAtBoundary(), isAnyComputeMergeInFlight(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable() (+32 more)

### Community 10 - "engine.js"
Cohesion: 0.05
Nodes (63): AUTO_MERGE_TICKERS, AUTOBUYER_UNIT_BATCH, autoCompleteChallenges(), BIT_UNIT_SYMBOLS, buyComputeFlopsTier(), CHALLENGE_BOUNDARIES, COMPUTE_MERGE_TIMER_FIELDS, createEmptyDataLakes() (+55 more)

### Community 11 - "SettingsPage/index.jsx"
Cohesion: 0.08
Nodes (53): styled-components, renderDiskArrayRow(), ButtonContent(), StatCard, getEonsAwarded(), buildClearSlotConfirmMessage(), wrap(), wrap() (+45 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.07
Nodes (59): ButtonIcon, ButtonLabel, VisuallyHidden, getAutobuyerBulkLevels(), getCacheWarmTier(), getFlopsAutobuyerUnlockEra(), getGlobalAutomationUnlockMilestone(), getTierTickspeedIntervalSeconds() (+51 more)

### Community 13 - "App.foundry.test.jsx"
Cohesion: 0.06
Nodes (39): version, @testing-library/user-event, derivePurchaseFieldsFromCounts(), expandSettingsSections(), openSettings(), seedMainGameState(), ALL_TIER_IDS, derivePurchaseFieldsFromCounts() (+31 more)

### Community 14 - "FactoryTab.jsx"
Cohesion: 0.08
Nodes (46): react, Banner, ChallengeBanner(), Rule, Text, Title, ChallengeExitButton(), Actions (+38 more)

### Community 15 - "createInitialGameState"
Cohesion: 0.07
Nodes (37): seedDataLakeSave(), @testing-library/react, vitest, withExpediteDisks(), lateGame(), allResourceIds(), withAutomations(), everythingUnlocked() (+29 more)

### Community 16 - "getTierCost"
Cohesion: 0.11
Nodes (48): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Factory tier cost series: shared linear increments → per-tier constant increments — 2026-11-16 (#1098), Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model (+40 more)

### Community 17 - "storage.js"
Cohesion: 0.13
Nodes (43): Dev Mode, Security notes, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Dev Mode Reference, adaptSaveForLoad(), applyPendingComputeGrants(), buildEraseAllSavesConfirmMessage(), BUY_MAX_PREFERENCE_KEY (+35 more)

### Community 18 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (42): ButtonGrid, describeNumber(), Details, DevModePage(), FieldControls, FieldLabel, FieldNode(), FieldRow (+34 more)

### Community 19 - "with"
Cohesion: 0.05
Nodes (42): concurrency, cancel-in-progress, group, if, runs-on, steps, timeout-minutes, GH_TOKEN (+34 more)

### Community 20 - "Testing"
Cohesion: 0.08
Nodes (42): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug, Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755) (+34 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.05
Nodes (41): concurrency, cancel-in-progress, group, CI_RUN_BRANCH, CI_RUN_CONCLUSION, GH_TOKEN, if, runs-on (+33 more)

### Community 22 - "MilestonesPage/index.jsx"
Cohesion: 0.05
Nodes (39): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+31 more)

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
Nodes (37): `AppNav/index.jsx`, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Sacrifice confirm: in-game dialog; Core warning only when unlocked, getAutobuyerIntervalSeconds(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable() (+29 more)

### Community 27 - "Economy model"
Cohesion: 0.08
Nodes (37): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder (+29 more)

### Community 28 - "normalizePoolMemoryCapacity"
Cohesion: 0.18
Nodes (36): Removed, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09, Devin Review on PR #614: a false-update bug, a stale comment, and a deliberately-unfixed legacy-save ambiguity — 2026-09-09, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit (+28 more)

### Community 29 - "ExampleInstrumentedTest.java"
Cohesion: 0.07
Nodes (35): seedState(), Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getTierTickspeedAutobuyerMilestone(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTOBUYER_INTERVAL_UPGRADE_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_STEP (+27 more)

### Community 30 - "env"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 31 - "gradlew"
Cohesion: 0.08
Nodes (32): browserslist, development, production, devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2, jsdom@^31.0.0, sharp@^0.35.5 (+24 more)

### Community 32 - "DailyTab.jsx"
Cohesion: 0.12
Nodes (31): canRestartDailyRun(), generateDailyChallenge(), getDailyCredits(), getMsUntilNextUtcDay(), getRunProgress(), getUtcDateId(), isDailyAutomationOn(), ActionButton (+23 more)

### Community 33 - "Shared components reference"
Cohesion: 0.06
Nodes (32): #988 leftover mixed labels after stacking onto #990 (2026-11), Bits subline adds no Factory header height — 2026-11-09, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost lanes (parallel multipliers + same-multiplier queue), Data Stream balance kept through Prestige (#1096), Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale, Distribution (+24 more)

### Community 34 - "App.jsx"
Cohesion: 0.11
Nodes (28): Prestige info is hidden until first prestige, Theming reference, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop (+20 more)

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
Cohesion: 0.14
Nodes (24): Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight(), getComputeFlopsTotal(), isComputeFlopsPageRevealed() (+16 more)

### Community 43 - "scripts"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 44 - "tickGame"
Cohesion: 0.19
Nodes (25): Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Constants (`src/game/layers.js`), Multiplier outcomes are floored (+17 more)

### Community 45 - "steps"
Cohesion: 0.08
Nodes (24): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, FAIL_MARKER, GH_TOKEN (+16 more)

### Community 46 - "scaleUpGame"
Cohesion: 0.14
Nodes (23): actSoftResets(), Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, Speed Up renamed to Scale Up and redesigned from a last-tier-only gate to a per-tier unlock ladder — 2026-09-09 (+15 more)

### Community 47 - "Procedure"
Cohesion: 0.13
Nodes (23): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation (DevModePage) (+15 more)

### Community 48 - "Automation workflows"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 49 - "ref_node_fs"
Cohesion: 0.20
Nodes (22): Architecture, `OfflineProgressNotice/index.jsx`, Buy max mode, Offline progress, Native apps (Capacitor — #70), Native apps (Capacitor) reference, addActivePlaySeconds(), applyOfflineProgress() (+14 more)

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
Cohesion: 0.16
Nodes (15): ADS_PLUGIN, BASE_PLUGINS, buildIncludePlugins(), config, IAP_PLUGIN, root, srcPath, buildFeaturesModule() (+7 more)

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.15
Nodes (19): actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPurges, defaultPPValues, emit() (+11 more)

### Community 57 - "Package.swift"
Cohesion: 0.10
Nodes (18): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+10 more)

### Community 58 - "CapApp-SPM/README.md"
Cohesion: 0.11
Nodes (19): dependencies, @capacitor/android@^8.5.3, @capacitor/ios@^8.5.3, @capacitor/splash-screen@^8.0.2, firebase@^13.2.0, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0, react@^19.3.1 (+11 more)

### Community 59 - "classify-claude-failure.sh"
Cohesion: 0.13
Nodes (16): renderButton(), renderWithTheme(), GlobalStyle, getSystemThemeMode(), buildTheme(), DEFAULT_MODE, font, MODES (+8 more)

### Community 60 - "stryker.config.json"
Cohesion: 0.10
Nodes (19): concurrency, coverageAnalysis, htmlReporter, fileName, jsonReporter, fileName, mutate, plugins (+11 more)

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.13
Nodes (6): workflow, workflowPath, script, zeroWork, script, script

### Community 62 - "Automation workflows"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, CodeQL (`codeql.yml`), Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Main CI heal (`main-ci-heal.yml`, #37) (+10 more)

### Community 63 - "engine.challengesTier.test.js"
Cohesion: 0.19
Nodes (16): Spent QB gates last-tier credit; last tier may spend to 0 (2026-11), buyTickspeedMultiplier(), runOf(), withChallenge(), withRun(), detectAchievements(), getLastTierId(), getTickspeedChargeLevel() (+8 more)

### Community 64 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, android:aab, android:apk:release, audit, build, build:capacitor, build:dev, bump-version (+11 more)

### Community 65 - "capacitor.build.gradle"
Cohesion: 0.16
Nodes (9): deleteAccountAndData(), app, auth, db, deleteAccount(), downloadSave(), requireUser(), saveDocFor() (+1 more)

### Community 66 - "palette.md"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, on, push, permissions (+8 more)

### Community 67 - "android/build.gradle"
Cohesion: 0.21
Nodes (12): ALLOWED_TOP_LEVEL_KEYS, analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findMalformedGraphEntries(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef() (+4 more)

### Community 68 - "config.js"
Cohesion: 0.17
Nodes (10): ADMOB_TEST_REWARDED_IDS, FIREBASE_CONFIG, IAP_PRODUCTS, PRIVACY_POLICY_URL, realRewardedIds, REMOVE_ADS_ENTITLEMENT, REVENUECAT_API_KEYS, SITE_URL (+2 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.20
Nodes (14): `Button/index.jsx`, Button, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, pulse, resolveColor() (+6 more)

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

### Community 75 - "lint-workflow-shell.mjs"
Cohesion: 0.29
Nodes (9): yaml@^2.9.1, yaml, bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main() (+1 more)

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
Cohesion: 0.23
Nodes (10): `BoostBadge/index.jsx`, Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), boostGlow, boostPulse, COMPUTE_BOOST_LABELS, getComputeBoostDescription(), isBoostActive(), isFactoryTierBoosted() (+2 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.21
Nodes (10): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), overwrite(), pngSize(), renderSplash() (+2 more)

### Community 83 - "Copilot Instructions"
Cohesion: 0.17
Nodes (11): concurrency, cancel-in-progress, group, jobs, name, permissions, contents, id-token (+3 more)

### Community 84 - "with"
Cohesion: 0.17
Nodes (12): with, base_branch, branch_prefix, claude_args, claude_code_oauth_token, fetch-depth, github_token, install (+4 more)

### Community 85 - "admobAdapter.js"
Cohesion: 0.25
Nodes (8): @capacitor-community/admob@^8.2.1, @capacitor/core@^8.5.3, @capacitor-community/admob, @capacitor/core, getRewardedAdUnit(), createAdMobAdapter(), createRewardedAdCache(), REWARDED_AD_MAX_AGE_MS

### Community 86 - "enable-auto-merge-if-eligible.sh"
Cohesion: 0.24
Nodes (6): web-vitals@^6.2.3, web-vitals, createPrefixedStorage(), installStoragePrefix(), rootElement, reportWebVitals()

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

### Community 95 - "session-start.sh"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 96 - "Shared components reference"
Cohesion: 0.22
Nodes (8): `AppMenu/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`, `Switch/index.js`

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

### Community 101 - "hasTiersGameAttention"
Cohesion: 0.39
Nodes (8): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, getTiersAttentionLevel(), hasOverclockAvailable(), hasPurgeAttention(), hasScaleUpAvailable(), hasTiersAttention(), hasTiersGameAttention(), isGlobalAutomationFast()

### Community 102 - "Android release (Google Play)"
Cohesion: 0.25
Nodes (7): Android release (Google Play), Build the signed AAB, Edge-to-edge, splash, icon, One-time setup, Optional features (all off by default), Permission audit, Upload to a testing track

### Community 103 - "env"
Cohesion: 0.25
Nodes (8): CI_RUN_BRANCH, CI_RUN_CONCLUSION, EVENT_NAME, GH_TOKEN, ISSUE_IS_PR, ISSUE_NUMBER, REVIEW_PR_NUMBER, env

### Community 104 - "on"
Cohesion: 0.25
Nodes (8): types, on, issue_comment, pull_request_review, workflow_run, types, types, workflows

### Community 105 - "resolve-pr-threads.sh"
Cohesion: 0.39
Nodes (7): react-dom@^19.3.1, react-dom, Heading, Note, Panel, Rows, SpeedDetailsPopover()

### Community 106 - "resolutions"
Cohesion: 0.25
Nodes (8): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/@grpc/grpc-js, **/nanoid, **/typed-rest-client/qs, **/uuid

### Community 107 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 108 - "Foundry multiplier bar: one diverging bar tried and dropped (2026-10)"
Cohesion: 0.29
Nodes (7): Bitrate exponent moves 10% toward 1.0 per new Disk size (2026-11), Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Pool-reset achievements tune Bitrate's within-pool exponent steps (2026-11), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), basisBitsForRawRate()

### Community 109 - "designer.md"
Cohesion: 0.38
Nodes (7): Perks regrouped by feature: Unlocks / Upgrades / Toggles → Automation / Prestige — 2026-11-03, getAutobuyerIntervalUpgradeCost(), getAutomationIntervalUpgradeCost(), getLiveChallengeForAutomation(), getSiCleanDoublingFactor(), isAutomationIntervalChainUnlocked, hasAffordableAutomationPerk()

### Community 110 - "programmer.md"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 111 - "qa.md"
Cohesion: 0.29
Nodes (7): steps, continue-on-error, id, if, name, run, uses

### Community 112 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 113 - "resetByteFoundry"
Cohesion: 0.73
Nodes (6): Reset Byte Foundry convenience-auto now includes Capacity/Sacrifice — 2026-08-25, Reset Byte Foundry's convenience replay didn't cover partial Provision Disk passes — 2026-09-08, Two more gaps in Reset Byte Foundry's convenience-replay caps — 2026-09-08, captureFoundryUpgradeCaps(), mergeFoundryUpgradeCaps(), resetByteFoundry()

### Community 114 - "getPrestigePointsAwarded"
Cohesion: 0.53
Nodes (6): Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Prestige and the Googol freeze, Unit and component tests (Vitest), getMoneyExponent(), getPrestigePointsAwarded(), getPurgePercent()

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

### Community 121 - "isBuyMaxUnlocked"
Cohesion: 0.70
Nodes (3): BuyMaxToggle(), Switch, isBuyMaxUnlocked()

### Community 122 - "BuyModeToggle/index.jsx"
Cohesion: 0.60
Nodes (4): BuyModeToggle(), ChoiceButton, OPTIONS, Row

### Community 123 - "getPrestigeDoublePpUpgradeCost"
Cohesion: 0.50
Nodes (5): buySleepModeCapUpgrade(), getPrestigeDoublePpUpgradeCost(), getSleepModeCapLevel(), getSleepModeCapUpgradeCost(), hasAffordablePrestigePerk()

### Community 124 - "variables.gradle"
Cohesion: 0.70
Nodes (4): Header, RootDiv, StoragePage(), Title

### Community 126 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 127 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 128 - "CapApp-SPM.swift"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

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

### Community 133 - "getPrestigePowersPerPp"
Cohesion: 0.67
Nodes (4): getPrestigeDoublePpHalvingLevels(), getPrestigePowersPerPp(), getPrestigePpPerPower(), compressionStep()

### Community 134 - "coerceMeta"
Cohesion: 0.83
Nodes (4): buildDefaultMeta(), coerceMeta(), defaultSlotName(), withSupporterSlots()

## Knowledge Gaps
- **7 isolated node(s):** `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js`, `file:src/game/storagePrefix.test.js`, `file:src/pages/SettingsPage/ManualSaveSection.jsx` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1070 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design history & rationale` connect `Shared components reference` to `Byte Foundry`, `AppDelegate`, `layers.js`, `Key engine functions (`src/game/engine.js`)`, `clampNonNegative`, `Automation workflows`, `dailyChallenges.js`, `engine.test.js`, `getTierCost`, `Testing`, `AGENTS.md`, `Economy model`, `normalizePoolMemoryCapacity`, `tickGame`, `scaleUpGame`, `engine.challengesTier.test.js`, `capacitor.settings.gradle`, `jsconfig.json`, `hasTiersGameAttention`, `Foundry multiplier bar: one diverging bar tried and dropped (2026-10)`, `designer.md`, `resetByteFoundry`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 257 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `activateComputeBoost()` and `applyAutobuyerMilestones()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 257 INFERRED edges - model-reasoned connections that need verification._
- **What connects `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Byte Foundry` be split into smaller, more focused modules?**
  _Cohesion score 0.05720606826801517 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `createInitialGameState` to `DailyTab.jsx`, `capacitor.build.gradle`, `layers.js`, `config.js`, `clampNonNegative`, `adversarialReviewMarker.js`, `dailyChallenges.js`, `engine.test.js`, `adaptSaveForCurrentSchema`, `SettingsPage/index.jsx`, `App.foundry.test.jsx`, `storage.js`, `admobAdapter.js`, `file-task-issue/SKILL.md`, `orphan-branch-scan.sh`, `engine.challengesTier.test.js`, `gradlew`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 177 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 177 INFERRED edges - model-reasoned connections that need verification._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.038558786346396964 - nodes in this community are weakly interconnected._