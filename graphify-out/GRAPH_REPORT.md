# Graph Report - tens  (2026-11-16)

## Corpus Check
- 225 files · ~574,489 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 9, (none) 8, .properties 2)

## Summary
- 3191 nodes · 9856 edges · 165 communities (127 shown, 38 thin omitted)
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 2170 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `332432a5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lint-workflow-shell.mjs
- MainPage/index.jsx
- AppDelegate
- engine.js
- navAttention.js
- ComputePage/index.jsx
- engine.test.js
- Automation workflows
- tickGame
- App.jsx
- CLAUDE.md
- with
- run-simulation.mjs
- Key engine functions (`src/game/engine.js`)
- DevModePage/index.jsx
- engine.js
- getEffectiveTierTickSpeedSeconds
- InfoPage/index.jsx
- dailyChallenges.js
- storage.js
- with
- bump-version.mjs
- MilestonesPage/index.jsx
- getStoragePoolBandwidth
- App.test.jsx
- AchievementsPage/index.test.jsx
- AGENTS.md
- Button/index.jsx
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- Economy model — Byte Foundry (full text)
- createInitialGameState
- Shared components reference
- DataLakePanel
- getTierCost
- resolutions
- challengeUi.js
- MainActivity.java
- [Unreleased]
- Testing
- devDependencies
- DiskArrayRow/index.jsx
- scripts
- ByteFoundryPage
- steps
- clampNonNegative
- Procedure
- Automation workflows
- ref_node_fs
- backlog-issue-hygiene.sh
- steps
- package.json
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- orphan-branch-scan.sh
- generate-pwa-icons.mjs
- Package.swift
- CapApp-SPM/README.md
- classify-claude-failure.sh
- BoostBadge/index.jsx
- optimize-ai-files/SKILL.md
- @playwright/test
- PerksPage/index.jsx
- pr-conflict-sweep.yml
- palette.md
- with
- sync-release-milestones.sh
- adversarialReviewMarker.js
- config.js
- steps
- hasAffordableAutomationPerk
- pull_request_template.md
- jsconfig.json
- styled-components
- env
- capacitorConfig.test.js
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- createInitialGameState
- tickGame
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- browserslist
- formatCurrency
- src/index.jsx
- steps
- .claude/CLAUDE.md
- check-graphify-freshness.mjs
- simulate-challenges.mjs
- session-start.sh
- slot
- Store listing drafts
- Shared components reference
- dev-team/SKILL.md
- with
- isProductionFrozen
- autonomous-maintenance.yml
- OfflineProgressNotice/index.jsx
- resolve-pr-threads.sh
- steps
- Design history & rationale
- getFillMultiplierPercent
- updates
- AppMenu
- AchievementsPage/index.jsx
- claude-deny-settings.sh
- pr-head-guard.sh
- Architecture / MainPage UI decisions
- dependencies
- capacitorConfig.test.js
- navAttention.test.js
- stryker.config.json
- engine.challengesTier.test.js
- config.js
- ref_node_fs
- firebaseBackend.js
- Store listing drafts
- engine.js
- Android release (Google Play)
- admobAdapter.js
- verify-maintainer-checklist.mjs
- OfflineProgressNotice/index.jsx
- contrast.js
- getDiskSizesToShow
- simulate-daily-challenges.mjs
- Android release (Google Play)
- env
- on
- Tens
- lint-conflict-markers.mjs
- Foundry multiplier bar: one diverging bar tried and dropped (2026-10)
- steps
- mergeState
- iOS release (App Store)
- autonomous-pr-followup.yml
- VisuallyHidden
- model
- permissions
- followup
- PWA support reference
- buyTickspeedMultiplier
- formatCurrency
- android-boot-smoke.sh
- file:scripts/lint-conflict-markers.mjs
- file:scripts/lint-conflict-markers.test.js
- file:src/game/storagePrefix.js
- file:src/game/storagePrefix.test.js
- file:src/pages/SettingsPage/ManualSaveSection.jsx
- AutoBoostPresetPicker/index.jsx
- isBuyMaxUnlocked
- browserslist
- getAutomationIntervalMaxLevel

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 258 edges
2. `Byte Foundry` - 178 edges
3. `MainPage()` - 119 edges
4. `ByteFoundryPage()` - 108 edges
5. `useIncrementalGame()` - 106 edges
6. `MainPage reference` - 105 edges
7. `Testing` - 87 edges
8. `Economy model — Byte Foundry (full text)` - 86 edges
9. `createInitialGameState()` - 80 edges
10. `clampNonNegative()` - 79 edges

## Surprising Connections (you probably didn't know these)
- `Security` --references--> `safeJsonParse()`  [INFERRED]
  CHANGELOG.md → src/game/storage.js
- `Added` --references--> `getVisibleStoragePoolCount()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `Added` --references--> `queueIntroCapacityUpgrade()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `Automation workflows` --references--> `gh()`  [INFERRED]
  CLAUDE.md → scripts/verify-maintainer-checklist.mjs

## Import Cycles
- None detected.

## Communities (165 total, 38 thin omitted)

### Community 0 - "lint-workflow-shell.mjs"
Cohesion: 0.31
Nodes (9): yaml@^2.9.1, yaml, bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main() (+1 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.06
Nodes (60): Money, formatBytes(), getNextBytePowerProgressFraction(), isPrestigeSpeedBonusUnlocked(), RESOURCE_SYMBOL(), BalancesSentinel, BitsBalance, BuyButton (+52 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "engine.js"
Cohesion: 0.04
Nodes (59): ACHIEVEMENT_BY_ID, AUTOBUYER_BASE_INTERVAL_SECONDS, AUTOBUYER_BULK_MAX_EXTRA_LEVELS, AUTOBUYER_INTERVAL_MULTIPLIER, AUTOBUYER_MIN_INTERVAL_SECONDS, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOMATION_INTERVAL_CONFIG (+51 more)

### Community 4 - "navAttention.js"
Cohesion: 0.12
Nodes (31): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Sacrifice confirm: in-game dialog; Core warning only when unlocked, isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable() (+23 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (81): Boosters: timer bar with Pop / Forfeit / Stack; preset switch refunds unused stacks (2026-10), Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Architecture 4b — `ComputePage/index.jsx`, BoostLane, BoostLaneRow() (+73 more)

### Community 6 - "engine.test.js"
Cohesion: 0.06
Nodes (8): getDataLakeCurrentDiskFillFraction, eraEligibleState(), noOtherUpgradesLeft, PROV_FIRST, provBase(), withIntro(), withPoolBuffer(), withPrestigePoints()

### Community 7 - "Automation workflows"
Cohesion: 0.12
Nodes (16): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Main CI heal checkout is default-branch tip, not `workflow_run.head_sha` — 2026-11-11, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit (+8 more)

### Community 8 - "tickGame"
Cohesion: 0.08
Nodes (40): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework (+32 more)

### Community 9 - "App.jsx"
Cohesion: 0.12
Nodes (27): Prestige info is hidden until first prestige, Theming reference, styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), APP_NAV_BOTTOM_PAD (+19 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.10
Nodes (20): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Funding, GitHub Milestones (release grouping), graphify (+12 more)

### Community 11 - "with"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, fetch-depth, github_token, node-version (+5 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.15
Nodes (19): actPlayer(), actSoftResets(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPurges, defaultPPValues (+11 more)

### Community 13 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.07
Nodes (65): What it does, "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title (+57 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (42): ButtonGrid, describeNumber(), Details, DevModePage(), FieldControls, FieldLabel, FieldNode(), FieldRow (+34 more)

### Community 15 - "engine.js"
Cohesion: 0.06
Nodes (57): Architecture, `OfflineProgressNotice/index.jsx`, Buy max mode, Offline progress, Native apps (Capacitor — #70), Native apps (Capacitor) reference, applyOfflineProgress(), applyOfflineRewardBonus() (+49 more)

### Community 16 - "getEffectiveTierTickSpeedSeconds"
Cohesion: 0.05
Nodes (39): concurrency, cancel-in-progress, group, GH_TOKEN, RUN_CONCLUSION, RUN_HEAD_SHA, RUN_ID, RUN_NAME (+31 more)

### Community 17 - "InfoPage/index.jsx"
Cohesion: 0.08
Nodes (30): version, TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTOBUYER_UNLOCK_MILESTONE_STEP, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_RESERVE_CAP, DATA_LAKE_CAPACITY_BY_LEVEL (+22 more)

### Community 18 - "dailyChallenges.js"
Cohesion: 0.07
Nodes (65): Daily challenges (epic #1062), Daily challenges (epic #1062), applyRunAction(), BOT_ACTIONS, botAct(), buildDailyCandidate(), canRestartDailyRun(), createRng() (+57 more)

### Community 19 - "storage.js"
Cohesion: 0.11
Nodes (53): Dev Mode, Security notes, Dev Mode Reference, PURGE_UNBOUNDED_MIN_COUNT, adaptSaveForLoad(), applyDevGameStateJson(), buildClearSlotConfirmMessage(), buildDefaultMeta() (+45 more)

### Community 20 - "with"
Cohesion: 0.05
Nodes (41): concurrency, cancel-in-progress, group, CI_RUN_BRANCH, CI_RUN_CONCLUSION, GH_TOKEN, if, runs-on (+33 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 22 - "MilestonesPage/index.jsx"
Cohesion: 0.35
Nodes (10): isEraEligible(), Badge, Category, CategoryHeading, Header, List, MilestonesPage(), RootDiv (+2 more)

### Community 23 - "getStoragePoolBandwidth"
Cohesion: 0.06
Nodes (37): env, if, runs-on, steps, timeout-minutes, env, if, runs-on (+29 more)

### Community 24 - "App.test.jsx"
Cohesion: 0.08
Nodes (20): ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_CORES_PER_NODE, COMPUTE_ENTITY_AUTO_MERGE_CAP (+12 more)

### Community 25 - "AchievementsPage/index.test.jsx"
Cohesion: 0.12
Nodes (21): @testing-library/react, AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle, ACHIEVEMENTS_FEATURE (+13 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.09
Nodes (26): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+18 more)

### Community 27 - "Button/index.jsx"
Cohesion: 0.18
Nodes (13): `Button/index.jsx`, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, pulse, resolveColor(), VARIANT_TOKEN (+5 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.14
Nodes (32): ButtonContent(), getEonsAwarded(), CloudSaveSection(), DELETE_STEP_MESSAGES, errorStatus(), buildSparklinePath(), Header, LockedNote (+24 more)

### Community 30 - "Economy model — Byte Foundry (full text)"
Cohesion: 0.12
Nodes (56): Byte Foundry, Fixed, Removed, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09 (+48 more)

### Community 32 - "createInitialGameState"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 33 - "Shared components reference"
Cohesion: 0.12
Nodes (22): Changed, 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 5. Authorization boundary, 6. Report, Testing (+14 more)

### Community 34 - "DataLakePanel"
Cohesion: 0.06
Nodes (111): Changed, Pool-local flushes, actCapacityUpgrade(), actFoundry(), `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too (+103 more)

### Community 35 - "getTierCost"
Cohesion: 0.17
Nodes (34): actMainBuys(), wouldAutobuyerStall(), Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check, Purchase block size became a runtime-configurable, growing value — `getTierLevel` replaced by direct state tracking, Purchase level resized from 10 to 8, and the cost-epoch sequence changed from Fibonacci to triangular (+26 more)

### Community 36 - "resolutions"
Cohesion: 0.29
Nodes (7): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/@grpc/grpc-js, **/nanoid, **/uuid

### Community 37 - "challengeUi.js"
Cohesion: 0.20
Nodes (13): seedState(), Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, getChallengeUnlockCondition(), applyAutobuyerMilestones(), getAutobuyerUnlockCost(), getAutobuyerUnlockMilestone(), getBitRotCorruption(), getTierTickspeedAutobuyerMilestone() (+5 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.05
Nodes (36): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+28 more)

### Community 40 - "Testing"
Cohesion: 0.06
Nodes (96): Byte Foundry, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main` (+88 more)

### Community 41 - "devDependencies"
Cohesion: 0.08
Nodes (30): devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2, jsdom@^31.0.0, sharp@^0.35.5, @stryker-mutator/core@^10.1.1, @stryker-mutator/vitest-runner@^10.1.1, @testing-library/dom@^10.4.1 (+22 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.07
Nodes (70): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping, Idle disk liquidation removed entirely — stranded disks now just sit idle instead of being converted to Bits (+62 more)

### Community 43 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, android:aab, android:apk:release, audit, build, build:capacitor, build:dev, bump-version (+11 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.04
Nodes (91): Speed exponent rises with Foundry-reset Disk-size unlocks (2026-10), COST_ICON, LeadIcon, formatPoolBalanceStable(), formatSpeedText(), formatThreeSignificant(), getComputeBoostMultiplier(), getComputeBoostPoolMultiplier() (+83 more)

### Community 45 - "steps"
Cohesion: 0.06
Nodes (39): runs-on, steps, runs-on, steps, concurrency, cancel-in-progress, group, runs-on (+31 more)

### Community 46 - "clampNonNegative"
Cohesion: 0.09
Nodes (49): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Factory tier cost series: shared linear increments → per-tier constant increments — 2026-11-16 (#1098), Production speed bonus: 10k PP unlock +1%/PP → automatic log10(Purge count) — 2026-11-09, PP Compute (Flops), 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, applyFlopsAutobuyerMilestones(), buyAutobuyerIntervalUpgrade(), buyAutomationIntervalUpgrade() (+41 more)

### Community 47 - "Procedure"
Cohesion: 0.20
Nodes (9): 1. Establish scope, 2. Load the repo's invariants, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure (+1 more)

### Community 48 - "Automation workflows"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, CodeQL (`codeql.yml`), Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Main CI heal (`main-ci-heal.yml`, #37) (+10 more)

### Community 49 - "ref_node_fs"
Cohesion: 0.13
Nodes (6): workflow, workflowPath, script, zeroWork, script, script

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 51 - "steps"
Cohesion: 0.08
Nodes (24): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, FAIL_MARKER, GH_TOKEN (+16 more)

### Community 52 - "package.json"
Cohesion: 0.09
Nodes (22): description, inputs, install, node-version, default, description, required, name (+14 more)

### Community 53 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 54 - "file-task-issue/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.23
Nodes (10): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), overwrite(), pngSize(), renderSplash() (+2 more)

### Community 60 - "BoostBadge/index.jsx"
Cohesion: 0.23
Nodes (12): Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), boostGlow, boostPulse, COMPUTE_BOOST_LABELS, getComputeBoostDescription(), isBoostActive(), isDataStreamBoosted(), isFactoryTierBoosted() (+4 more)

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 62 - "@playwright/test"
Cohesion: 0.20
Nodes (3): seededState, @playwright/test@^1.64.1, @playwright/test

### Community 63 - "PerksPage/index.jsx"
Cohesion: 0.08
Nodes (49): getChallengeTitle(), getAutobuyerBaseIntervalSeconds(), getAutobuyerBulkExtraLevels(), getAutobuyerBulkLevels(), getAutobuyerIntervalMaxLevel(), getAutobuyerIntervalSeconds(), getAutobuyerIntervalSecondsAtLevel(), getAutobuyerSpeedUpgradeMaxLevel() (+41 more)

### Community 64 - "pr-conflict-sweep.yml"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_REPO, GH_TOKEN, jobs, sweep, name (+14 more)

### Community 66 - "palette.md"
Cohesion: 0.14
Nodes (13): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+5 more)

### Community 68 - "with"
Cohesion: 0.05
Nodes (42): concurrency, cancel-in-progress, group, if, runs-on, steps, timeout-minutes, GH_TOKEN (+34 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 73 - "config.js"
Cohesion: 0.09
Nodes (22): BEFORE_SHA, GH_TOKEN, jobs, tag-and-release, name, on, push, permissions (+14 more)

### Community 74 - "steps"
Cohesion: 0.06
Nodes (31): name, permissions, runs-on, steps, strategy, jobs, analyze, include (+23 more)

### Community 75 - "hasAffordableAutomationPerk"
Cohesion: 0.21
Nodes (12): Perks regrouped by feature: Unlocks / Upgrades / Toggles → Automation / Prestige — 2026-11-03, getAutobuyerIntervalUpgradeCost(), getAutomationIntervalUpgradeCost(), getLiveChallengeForAutomation(), getPrestigeDoublePpUpgradeCost(), getSiCleanDoublingFactor(), getTierTickspeedIntervalUpgradeCost(), isAutomationIntervalChainUnlocked (+4 more)

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "styled-components"
Cohesion: 0.17
Nodes (24): react, Button, Banner, ChallengeBanner(), Rule, Text, Title, ChallengeExitButton() (+16 more)

### Community 79 - "env"
Cohesion: 0.08
Nodes (26): CEILING_FULL, CLAUDE_OUTCOME, CODE_SCANNING_ALERTS, DEPENDABOT_ALERTS, DEPENDABOT_PRS, FAILING_PRS, GH_TOKEN, INPUT_MODEL (+18 more)

### Community 80 - "capacitorConfig.test.js"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, on, push, permissions (+8 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 84 - "createInitialGameState"
Cohesion: 0.06
Nodes (53): Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run, Overclock no longer banks completed levels — 2026-11-11, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, `scaleUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry, Speed Up renamed to Scale Up and redesigned from a last-tier-only gate to a per-tier unlock ladder — 2026-09-09 (+45 more)

### Community 85 - "tickGame"
Cohesion: 0.12
Nodes (23): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, Architecture / MainPage UI decisions, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Adding a new tier, Challenge mode (epic #1037, engine slice #1038), Game state shape, Multiplier overflow safety (+15 more)

### Community 88 - "browserslist"
Cohesion: 0.13
Nodes (14): jobs, test, name, on, pull_request, push, permissions, contents (+6 more)

### Community 89 - "formatCurrency"
Cohesion: 0.14
Nodes (13): description, label, placeholder, value, body, attributes, id, type (+5 more)

### Community 90 - "src/index.jsx"
Cohesion: 0.17
Nodes (12): with, base_branch, branch_prefix, claude_args, claude_code_oauth_token, fetch-depth, github_token, install (+4 more)

### Community 91 - "steps"
Cohesion: 0.06
Nodes (31): concurrency, cancel-in-progress, group, MUTATE_OVERRIDE, mutate, jobs, mutation, default (+23 more)

### Community 93 - "check-graphify-freshness.mjs"
Cohesion: 0.21
Nodes (12): ALLOWED_TOP_LEVEL_KEYS, analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findMalformedGraphEntries(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef() (+4 more)

### Community 94 - "simulate-challenges.mjs"
Cohesion: 0.11
Nodes (26): E, actCapacityUpgrade(), actFoundry(), actMainBuys(), actPlayer(), actPlayerBitRot(), actSoftResets(), actSpeedBonus() (+18 more)

### Community 96 - "slot"
Cohesion: 0.20
Nodes (10): slot, on, schedule, workflow_dispatch, cron, default, description, options (+2 more)

### Community 98 - "Store listing drafts"
Cohesion: 0.18
Nodes (11): jobs, maintenance, runs-on, steps, timeout-minutes, continue-on-error, id, if (+3 more)

### Community 99 - "Shared components reference"
Cohesion: 0.18
Nodes (10): `AppMenu/index.jsx`, `AppNav/index.jsx`, `BoostBadge/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference (+2 more)

### Community 101 - "with"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 102 - "isProductionFrozen"
Cohesion: 0.09
Nodes (55): Security notes, Tiers, Prestige, Reboot (Era ascension), Purge code rename: reboot → purge (2026-11, #987), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Achievements (epic #1046, basic slice), Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier (+47 more)

### Community 103 - "autonomous-maintenance.yml"
Cohesion: 0.18
Nodes (10): concurrency, cancel-in-progress, group, name, permissions, contents, id-token, issues (+2 more)

### Community 104 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.17
Nodes (9): createPrefixedStorage(), installStoragePrefix(), rootElement, reportWebVitals(), createMonetizationService(), getMonetizationService(), createNoopMonetizationService(), NO_ENTITLEMENTS (+1 more)

### Community 106 - "steps"
Cohesion: 0.07
Nodes (28): concurrency, cancel-in-progress, group, GH_TOKEN, TARGET_INPUT, target_sha, jobs, open-revert-pr (+20 more)

### Community 107 - "Design history & rationale"
Cohesion: 0.07
Nodes (27): #988 leftover mixed labels after stacking onto #990 (2026-11), Bits subline adds no Factory header height — 2026-11-09, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost lanes (parallel multipliers + same-multiplier queue), Daily challenges: seeded conditions, head start, calculated targets (2026-11), Data Stream balance kept through Prestige (#1096), Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale (+19 more)

### Community 114 - "AchievementsPage/index.jsx"
Cohesion: 0.20
Nodes (18): Achievements (epic #1046, basic slice), Economy model, detectAchievements(), getCompletedAchievementGroups(), isAchievementConditionMet(), isAchievementEarned(), ACHIEVEMENT_DEFINITIONS, ACHIEVEMENT_GROUPS (+10 more)

### Community 117 - "Architecture / MainPage UI decisions"
Cohesion: 0.20
Nodes (13): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation (DevModePage) (+5 more)

### Community 118 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, @capacitor/android@^8.5.3, @capacitor/ios@^8.5.3, @capacitor/splash-screen@^8.0.2, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0, react@^19.3.1, react-is@^19.3.1 (+11 more)

### Community 119 - "capacitorConfig.test.js"
Cohesion: 0.16
Nodes (15): ADS_PLUGIN, BASE_PLUGINS, buildIncludePlugins(), config, IAP_PLUGIN, root, srcPath, buildFeaturesModule() (+7 more)

### Community 120 - "navAttention.test.js"
Cohesion: 0.12
Nodes (15): vitest, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_BYTE_COMBINE_COST, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY (+7 more)

### Community 121 - "stryker.config.json"
Cohesion: 0.10
Nodes (19): concurrency, coverageAnalysis, htmlReporter, fileName, jsonReporter, fileName, mutate, plugins (+11 more)

### Community 122 - "engine.challengesTier.test.js"
Cohesion: 0.15
Nodes (13): withChallenge(), withRun(), getLastTierId(), getTickspeedMultiplierBaseCost(), getTickspeedMultiplierCost(), getTickspeedMultiplierRequirement(), getTickspeedMultiplierSpend(), ADDRESS_SPACE_TIER_COUNT (+5 more)

### Community 125 - "config.js"
Cohesion: 0.16
Nodes (11): ADMOB_TEST_REWARDED_IDS, FIREBASE_CONFIG, IAP_PRODUCTS, PRIVACY_POLICY_URL, realRewardedIds, REMOVE_ADS_ENTITLEMENT, REVENUECAT_API_KEYS, SITE_URL (+3 more)

### Community 126 - "ref_node_fs"
Cohesion: 0.19
Nodes (11): match, yml, ADMOB_TEST_APP_ID_IOS, applyManagedAdsKeys(), buildManagedBlock(), END_MARKER, escapeXml(), SKADNETWORK_IDS (+3 more)

### Community 127 - "firebaseBackend.js"
Cohesion: 0.14
Nodes (11): firebase@^13.2.0, firebase, deleteAccountAndData(), app, auth, db, deleteAccount(), downloadSave() (+3 more)

### Community 129 - "Store listing drafts"
Cohesion: 0.15
Nodes (12): Apple — App Privacy ("nutrition label"), Content rating (Play IARC questionnaire / App Store age rating), Default build, Default build (cloud save on, ads and IAP off), Google Play — Data safety, Listing text, Store assets still needed, Store listing drafts (+4 more)

### Community 130 - "engine.js"
Cohesion: 0.05
Nodes (46): Boosters: manual merge on automated tiers became instant (2026-10), BIT_UNIT_SYMBOLS, CHALLENGE_BOUNDARIES, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, decrementFullDiskCount(), FILL_CURVE_LN_A, FILL_CURVE_LN_B (+38 more)

### Community 131 - "Android release (Google Play)"
Cohesion: 0.39
Nodes (7): react-dom@^19.3.1, react-dom, Heading, Note, Panel, Rows, SpeedDetailsPopover()

### Community 132 - "admobAdapter.js"
Cohesion: 0.25
Nodes (8): @capacitor-community/admob@^8.2.1, @capacitor/core@^8.5.3, @capacitor-community/admob, @capacitor/core, getRewardedAdUnit(), createAdMobAdapter(), createRewardedAdCache(), REWARDED_AD_MAX_AGE_MS

### Community 133 - "verify-maintainer-checklist.mjs"
Cohesion: 0.38
Nodes (9): allVerifiableChecked(), applyChecks(), CHECKLIST_ISSUE, CHECKS, gh(), main(), runChecks(), BODY (+1 more)

### Community 134 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.29
Nodes (8): @testing-library/user-event, NoticeActions, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), renderNotice(), summary

### Community 135 - "contrast.js"
Cohesion: 0.38
Nodes (7): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear()

### Community 136 - "getDiskSizesToShow"
Cohesion: 0.70
Nodes (4): Header, RootDiv, StoragePage(), Title

### Community 137 - "simulate-daily-challenges.mjs"
Cohesion: 0.22
Nodes (5): args, dates, DAYS, FROM, ONE

### Community 138 - "Android release (Google Play)"
Cohesion: 0.25
Nodes (7): Android release (Google Play), Build the signed AAB, Edge-to-edge, splash, icon, One-time setup, Optional features (all off by default), Permission audit, Upload to a testing track

### Community 139 - "env"
Cohesion: 0.25
Nodes (8): CI_RUN_BRANCH, CI_RUN_CONCLUSION, EVENT_NAME, GH_TOKEN, ISSUE_IS_PR, ISSUE_NUMBER, REVIEW_PR_NUMBER, env

### Community 140 - "on"
Cohesion: 0.25
Nodes (8): types, on, issue_comment, pull_request_review, workflow_run, types, types, workflows

### Community 141 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Manual, Scripts, Security notes (+1 more)

### Community 142 - "lint-conflict-markers.mjs"
Cohesion: 0.43
Nodes (6): findConflictMarkers(), isScannable(), main(), MARKER_RE, L, R

### Community 143 - "Foundry multiplier bar: one diverging bar tried and dropped (2026-10)"
Cohesion: 0.29
Nodes (7): Bitrate exponent moves 10% toward 1.0 per new Disk size (2026-11), Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Pool-reset achievements tune Bitrate's within-pool exponent steps (2026-11), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), basisBitsForRawRate()

### Community 144 - "steps"
Cohesion: 0.29
Nodes (7): steps, continue-on-error, id, if, name, run, uses

### Community 145 - "mergeState"
Cohesion: 0.18
Nodes (13): Added, Removed, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Save persistence, createEmptyDataLakes(), createEmptyDataLakeTier(), applyPendingComputeGrants(), getLegacyPendingTransferCount() (+5 more)

### Community 146 - "iOS release (App Store)"
Cohesion: 0.33
Nodes (5): App Store submission, iOS release (App Store), One-time setup, Prepare the project, TestFlight

### Community 147 - "autonomous-pr-followup.yml"
Cohesion: 0.33
Nodes (5): concurrency, cancel-in-progress, group, jobs, name

### Community 148 - "VisuallyHidden"
Cohesion: 0.22
Nodes (9): ButtonIcon, ButtonLabel, VisuallyHidden, MilestoneBadge(), PpButton, PpPurchaseButton(), progressPercent(), RowControls (+1 more)

### Community 149 - "model"
Cohesion: 0.40
Nodes (5): model, default, description, options, type

### Community 150 - "permissions"
Cohesion: 0.40
Nodes (5): permissions, actions, contents, id-token, pull-requests

### Community 151 - "followup"
Cohesion: 0.50
Nodes (4): if, runs-on, timeout-minutes, followup

### Community 153 - "buyTickspeedMultiplier"
Cohesion: 0.48
Nodes (7): buyTickspeedMultiplier(), getChallengeEffectTier(), getEffectiveTickspeedLevel(), getTickspeedChargeLevel(), getTierTickspeedRequirement(), getTierTickspeedSpend(), isTierTickspeedBlockedByChallenge()

### Community 154 - "formatCurrency"
Cohesion: 0.60
Nodes (6): Bits subline under MoneyHero; `+n/8` dropped from tier Buy buttons — 2026-11-09, Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatCurrency(), formatMoneyBalance(), formatScientific()

### Community 161 - "AutoBoostPresetPicker/index.jsx"
Cohesion: 0.60
Nodes (4): AutoBoostPresetPicker(), PresetButton, Row, COMPUTE_BOOST_DISPLAY

### Community 162 - "isBuyMaxUnlocked"
Cohesion: 0.70
Nodes (3): BuyMaxToggle(), Switch, isBuyMaxUnlocked()

### Community 163 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 164 - "getAutomationIntervalMaxLevel"
Cohesion: 0.67
Nodes (3): getAutomationIntervalMaxLevel(), getIntervalMaxLevelForBase(), getTierTickspeedIntervalMaxLevel()

## Knowledge Gaps
- **7 isolated node(s):** `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js`, `file:src/game/storagePrefix.test.js`, `file:src/pages/SettingsPage/ManualSaveSection.jsx` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 960 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design history & rationale` connect `Design history & rationale` to `engine.js`, `navAttention.js`, `ComputePage/index.jsx`, `Automation workflows`, `tickGame`, `Tens`, `Key engine functions (`src/game/engine.js`)`, `Foundry multiplier bar: one diverging bar tried and dropped (2026-10)`, `mergeState`, `AGENTS.md`, `formatCurrency`, `Economy model — Byte Foundry (full text)`, `DataLakePanel`, `Testing`, `DiskArrayRow/index.jsx`, `clampNonNegative`, `hasAffordableAutomationPerk`, `createInitialGameState`, `tickGame`, `isProductionFrozen`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Are the 257 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `activateComputeBoost()` and `applyAutobuyerMilestones()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 257 INFERRED edges - model-reasoned connections that need verification._
- **What connects `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06400409626216078 - nodes in this community are weakly interconnected._
- **Why does `[Unreleased]` connect `[Unreleased]` to `mergeState`, `DataLakePanel`, `Economy model — Byte Foundry (full text)`, `Shared components reference`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 177 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 177 INFERRED edges - model-reasoned connections that need verification._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._