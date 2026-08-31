# Graph Report - tens  (2026-08-31)

## Corpus Check
- 107 files · ~336,179 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1485 nodes · 3745 edges · 108 communities (90 shown, 18 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 82 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `556e19d5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- MainPage
- MainPage/index.jsx
- engine.js
- ByteFoundryPage/index.jsx
- tokens.js
- isComputeBoostTurnAvailable
- devDependencies
- Economy model
- getDataLakeTier
- What You Must Do When Invoked
- jsconfig.json
- generate-pwa-icons.mjs
- session-start.sh
- autobuyer-reload.e2e.js
- navAttention.js
- capacitorConfig.test.js
- Automation workflows
- [Unreleased]
- Economy model reference
- CLAUDE.md
- AGENTS.md
- Tens
- Procedure
- graphify reference: extra exports and benchmark
- economy-change-review/SKILL.md
- file-task-issue/SKILL.md
- graphify reference: query, path, explain
- Automation workflows
- Shared components reference
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- simulate-run-times/SKILL.md
- pull_request_template.md
- OfflineProgressNotice/index.jsx
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- Copilot Instructions
- graphify
- extraction-spec.md
- MAINPAGE_REFERENCE.md
- PWA_REFERENCE.md
- THEMING_REFERENCE.md
- useIncrementalGame.js
- dependencies
- ComputePage/index.jsx
- tickComputeMergeBoundary
- DevModePage/index.jsx
- useIncrementalGame
- isProvisionDiskAvailable
- development
- SettingsPage/index.jsx
- navAttention.test.js
- Button/index.jsx
- scripts
- DiskArrayRow/index.jsx
- ByteFoundryPage
- bump-version.mjs
- App.test.jsx
- DataLakePanel/index.jsx
- run-simulation.mjs
- engine.test.js
- tickGame
- ComputeFlopsPage/index.jsx
- canDepositDiskToDataLake
- actFoundry
- package.json
- InfoPage/index.jsx
- Testing
- Era ascension and Eons (#407)
- sentinel.md
- palette.md
- Design history & rationale
- prestigeGame
- getStoragePoolBandwidth
- backlog-issue-hygiene.sh
- bolt.md
- epic-407-issue-hygiene.sh
- App.jsx
- isDiskFillAvailable
- getUnlockedStoragePoolCount
- clampNonNegative
- sync-release-milestones.sh
- adversarialReviewMarker.js
- MilestonesPage/index.jsx
- getDiskLadderSizeBits
- publish-strategy.sh
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- pr-low-risk-eligible.test.js
- AppNav/index.jsx
- buyGlobalTickspeedMultiplier
- INTRO_COMPUTE_CORE_UNLOCK_CAPACITY
- buyTickspeedMultiplier
- AppMenu/index.jsx
- ConfirmDialog/index.jsx
- formatBitsInNearestUnit
- isComputeCoreConversionUnlocked
- eraEligibleState
- applyOfflineProgress
- hasAffordableComputeFlopsTier

## God Nodes (most connected - your core abstractions)
1. `clampNonNegative()` - 72 edges
2. `useIncrementalGame()` - 68 edges
3. `Economy model` - 56 edges
4. `tickGame()` - 51 edges
5. `MainPage()` - 49 edges
6. `isProductionFrozen()` - 36 edges
7. `ByteFoundryPage()` - 33 edges
8. `ComputePage()` - 26 edges
9. `createInitialGameState()` - 24 edges
10. `formatAmount()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `actFoundry()` --calls--> `activateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `canActivateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `canStartBoosterTransfer()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `isBandwidthAvailable()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `isDiskFillAvailable()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (108 total, 18 thin omitted)

### Community 0 - "MainPage"
Cohesion: 0.16
Nodes (22): countGlobalTickspeedMilestones(), formatAmount(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getAutoPrestigeAttemptRate(), getEffectiveTierTickSpeedSeconds() (+14 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (58): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments, CategoryHeading (+50 more)

### Community 2 - "engine.js"
Cohesion: 0.06
Nodes (71): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, DATA_LAKE_SUB_SIZE_TOTAL, MEMORY_BINARY_UNIT_SYMBOLS, plainNumberFormatter, scientificNumberFormatter (+63 more)

### Community 3 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (31): ActionsRow, BalanceText, DataStreamCard, Divider, FillableStatCard, Header, MilestoneButtonContent, MilestoneCostLine (+23 more)

### Community 4 - "tokens.js"
Cohesion: 0.10
Nodes (22): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), GlobalStyle (+14 more)

### Community 5 - "isComputeBoostTurnAvailable"
Cohesion: 0.19
Nodes (16): activateComputeBoost(), canActivateComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), getBiggestComputeTierWaitingOnMerge(), getComputeBoostMultiplier(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField() (+8 more)

### Community 6 - "devDependencies"
Cohesion: 0.08
Nodes (25): @capacitor/cli, jsdom, devDependencies, @capacitor/cli, jsdom, @playwright/test, sharp, @testing-library/dom (+17 more)

### Community 7 - "Economy model"
Cohesion: 0.04
Nodes (56): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+48 more)

### Community 8 - "getDataLakeTier"
Cohesion: 0.33
Nodes (11): getVisibleLakeTierIndexes(), decomposeDataLakeDeposits(), doubleDataLakeCapacity(), getBoosterPurchaseCost(), getBoosterTransferPlan(), getDataLakeCapacityLevel(), getDataLakeDepositedUnits(), getDataLakeTier() (+3 more)

### Community 9 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 10 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 15 - "navAttention.js"
Cohesion: 0.12
Nodes (27): enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+19 more)

### Community 16 - "capacitorConfig.test.js"
Cohesion: 0.38
Nodes (3): root, srcPath, createViteConfig()

### Community 17 - "Automation workflows"
Cohesion: 0.15
Nodes (13): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning, PR follow-up (`autonomous-pr-followup.yml`) — security reasoning (+5 more)

### Community 22 - "[Unreleased]"
Cohesion: 0.06
Nodes (31): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+23 more)

### Community 23 - "Economy model reference"
Cohesion: 0.11
Nodes (18): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Game state shape, Key engine functions (`src/game/engine.js`), Multiplier outcomes are floored, Offline progress (+10 more)

### Community 24 - "CLAUDE.md"
Cohesion: 0.08
Nodes (25): Architecture, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Cursor Cloud GitHub access, Dev Mode, Documentation (+17 more)

### Community 25 - "AGENTS.md"
Cohesion: 0.08
Nodes (22): Adding a new tier, Architecture, Automation design principles, Automation engines (Claude now, Cursor successor), Budget discipline, Byte Foundry, Changelog convention, Code review tooling (+14 more)

### Community 26 - "Tens"
Cohesion: 0.17
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes, Tens

### Community 27 - "Procedure"
Cohesion: 0.20
Nodes (9): 1. Establish scope, 2. Load the repo's invariants, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure (+1 more)

### Community 28 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 29 - "economy-change-review/SKILL.md"
Cohesion: 0.29
Nodes (6): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 5. Authorization boundary, 6. Report

### Community 30 - "file-task-issue/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 31 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 32 - "Automation workflows"
Cohesion: 0.22
Nodes (8): Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Cursor-powered successor engine, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Orchestration model, PR follow-up (`autonomous-pr-followup.yml`), Scheduled maintenance (`autonomous-maintenance.yml`)

### Community 33 - "Shared components reference"
Cohesion: 0.17
Nodes (11): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `ByteFoundryPage` pool layout, `ConfirmDialog/index.jsx`, `DiskArrayRow/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js` (+3 more)

### Community 34 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 35 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 36 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 37 - "simulate-run-times/SKILL.md"
Cohesion: 0.33
Nodes (5): Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run

### Community 38 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 39 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.16
Nodes (11): VisuallyHidden, Body, Card, IncompatibleSaveNotice(), Overlay, Title, NoticeText, OfflineNoticeCard (+3 more)

### Community 48 - "useIncrementalGame.js"
Cohesion: 0.05
Nodes (38): enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric, enableAutoMergeNetworksIntoGrid, enableAutoMergeNodesIntoCluster (+30 more)

### Community 49 - "dependencies"
Cohesion: 0.12
Nodes (17): @capacitor/core, @fontsource/inter, @fontsource/space-grotesk, dependencies, @capacitor/core, @fontsource/inter, @fontsource/space-grotesk, react (+9 more)

### Community 50 - "ComputePage/index.jsx"
Cohesion: 0.07
Nodes (34): canStartBoosterTransfer(), formatOfflineDuration(), getNextComputeMergeDurationUpgradeIndex(), ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostRow (+26 more)

### Community 51 - "tickComputeMergeBoundary"
Cohesion: 0.14
Nodes (15): getComputeMergeDurationSeconds(), getCoreEarnTimeSeconds(), startComputeMergeReserve(), startComputeMergeReserveAtBoundary(), tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer() (+7 more)

### Community 52 - "DevModePage/index.jsx"
Cohesion: 0.12
Nodes (21): ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow, Header (+13 more)

### Community 53 - "useIncrementalGame"
Cohesion: 0.08
Nodes (69): seedState(), seedDataLakeSave(), allResourceIds(), applyFlopsAutobuyerMilestones(), buildEraIntroReset(), captureFoundryUpgradeCaps(), createEmptyDataLakes(), createEmptyDataLakeTier() (+61 more)

### Community 54 - "isProvisionDiskAvailable"
Cohesion: 0.33
Nodes (9): getDiskCost(), getDiskSize(), getMaxActiveDiskLadderStep(), getPoolBufferBits(), getProvisionDiskSeconds(), isDiskLadderExhaustedForActivePools(), isProvisionDiskAvailable(), isProvisionDiskTurnAvailable() (+1 more)

### Community 55 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 57 - "SettingsPage/index.jsx"
Cohesion: 0.13
Nodes (14): CodeForm, CodeInput, Header, LockedNote, MuseumItem, MuseumList, RootDiv, Row (+6 more)

### Community 58 - "navAttention.test.js"
Cohesion: 0.12
Nodes (15): BYTES_ID, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_BYTE_COMBINE_COST, INTRO_CONVERSION_UNLOCK_CAPACITY, INTRO_DISK_UNLOCK_CAPACITY (+7 more)

### Community 59 - "Button/index.jsx"
Cohesion: 0.19
Nodes (13): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+5 more)

### Community 60 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 61 - "DiskArrayRow/index.jsx"
Cohesion: 0.08
Nodes (43): CacheBlock, CacheBlocksRow, CacheFlushFill, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, manualPulse (+35 more)

### Community 62 - "ByteFoundryPage"
Cohesion: 0.32
Nodes (13): applyIntroProductionDoublingToIntro(), getComputeBandwidthSacrificeField(), getComputeBandwidthSacrificeLabel(), getEffectiveComputeBandwidthSacrificeIndex(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), isBandwidthAvailable(), isBandwidthTurnAvailable() (+5 more)

### Community 63 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 64 - "App.test.jsx"
Cohesion: 0.09
Nodes (19): version, ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS (+11 more)

### Community 65 - "DataLakePanel/index.jsx"
Cohesion: 0.16
Nodes (18): BareDivider, CapacityCell, DataLakePanel(), DoubleCapacityButton, LakeGrid, LakeHeaderRow, LakeName, LakeRow (+10 more)

### Community 66 - "run-simulation.mjs"
Cohesion: 0.15
Nodes (18): actPlayer(), actSoftResets(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+10 more)

### Community 67 - "engine.test.js"
Cohesion: 0.05
Nodes (16): canForfeitComputeBoost(), clearIntroCapacityUpgradeQueue(), forfeitComputeBoost(), getAutobuyerUnlockCost(), getTickspeedMultiplierBaseCost(), getTierProductionProgressPercent(), isAnyComputeMergeInFlight(), isUpgradeComputeMergeDurationAvailable() (+8 more)

### Community 68 - "tickGame"
Cohesion: 0.26
Nodes (19): actMainBuys(), wouldAutobuyerStall(), buyTier(), buyTierQuantity(), getCostEpochExponent(), getPurchaseBlockSize(), getTierAffordableQuantity(), getTierBulkQuantity() (+11 more)

### Community 69 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.18
Nodes (10): Money, FlopsHero, Header, Hint, RootDiv, TierList, TierMeta, TierName (+2 more)

### Community 70 - "canDepositDiskToDataLake"
Cohesion: 0.83
Nodes (4): canDepositDiskToDataLake(), depositDiskToDataLake(), getDataLakeTierIndex(), tickDiskAutoDeposit()

### Community 71 - "actFoundry"
Cohesion: 0.14
Nodes (18): actFoundry(), combineIntroByte(), convertIntroBitsToKilobytes(), eraseAllComputeTokens(), getIntroKilobyteConversionCost(), isDiskBuildBelowCap(), isInvestProgressBelowCap(), isMemoryCapacityAtCap() (+10 more)

### Community 72 - "package.json"
Cohesion: 0.18
Nodes (10): name, packageManager, private, resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid (+2 more)

### Community 73 - "InfoPage/index.jsx"
Cohesion: 0.08
Nodes (28): applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getStoragePoolCapacity(), getTierTickspeedAutobuyerMilestone(), CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_TIER_POWER_STEP (+20 more)

### Community 74 - "Testing"
Cohesion: 0.11
Nodes (19): Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap, Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever, Data Lake refill gating: staged 9 → 99 → 999 capacity from disk-array completion (+11 more)

### Community 75 - "Era ascension and Eons (#407)"
Cohesion: 0.25
Nodes (8): Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 76 - "sentinel.md"
Cohesion: 0.40
Nodes (4): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs., 2026-08-29 - Prototype Pollution in Dev Mode Field Editing

### Community 77 - "palette.md"
Cohesion: 0.50
Nodes (3): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2025-01-31 - Focus Visible Styles for custom trigger elements

### Community 78 - "Design history & rationale"
Cohesion: 0.17
Nodes (12): Architecture / MainPage UI decisions, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale, Distribution, Documentation, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Sacrifice confirm: in-game dialog; Core warning only when unlocked (+4 more)

### Community 79 - "prestigeGame"
Cohesion: 0.31
Nodes (9): checkMilestones(), getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp(), getPrestigePpEarnProgressPercent(), getPrestigePpPerPower(), getPrestigeProgressPercent() (+1 more)

### Community 80 - "getStoragePoolBandwidth"
Cohesion: 0.23
Nodes (14): canStartDiskWriteCacheMerge(), decrementFullDiskCount(), getDiskReadCacheFlushSeconds(), getDiskWriteCacheFlushSeconds(), getDiskWriteCacheSegmentSeconds(), getIntroProductionRate(), getPoolBufferCapacity(), getPoolIndexForDiskSize() (+6 more)

### Community 81 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 83 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 84 - "App.jsx"
Cohesion: 0.23
Nodes (13): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), isComputeFlopsPageRevealed(), buildResetActiveSlotConfirmMessage(), buildResetByteFoundryConfirmMessage(), getActiveSlotDisplayName() (+5 more)

### Community 85 - "isDiskFillAvailable"
Cohesion: 0.26
Nodes (13): isDiskFillAvailable(), isStorageUnlocked(), getFoundryAttentionLevel(), getNavAttention(), getStorageAttentionLevel(), getTiersAttentionLevel(), hasFoundryAttention(), hasStorageAttention() (+5 more)

### Community 86 - "getUnlockedStoragePoolCount"
Cohesion: 0.27
Nodes (10): getPoolLastDiskSize(), getStoragePoolCount(), getUnlockedStoragePoolCount(), isAnyDataLakeCapacityDoublingAvailable(), isComputeUpgradeAvailable(), isIdleDiskLiquidationAvailable(), isIdleDiskLiquidationTurnAvailable(), isStoragePoolUnlocked() (+2 more)

### Community 87 - "clampNonNegative"
Cohesion: 0.15
Nodes (31): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyComputeAutoBoost(), buyComputeFlopsTier(), buyHyperscaler(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus() (+23 more)

### Community 88 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 89 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 90 - "MilestonesPage/index.jsx"
Cohesion: 0.18
Nodes (11): isEraEligible(), Badge, Category, CategoryHeading, Header, List, MilestonesPage(), RootDiv (+3 more)

### Community 91 - "getDiskLadderSizeBits"
Cohesion: 0.31
Nodes (9): getDataLakeSubSizeStep(), getDataLakeTransferCapacity(), getDataLakeTransferDurationSeconds(), getDataLakeUnitBits(), getDiskLadderSizeBits(), getDiskLadderStep(), getNextDiskLadderSize(), isDiskArrayFullyBuilt() (+1 more)

### Community 96 - "AppNav/index.jsx"
Cohesion: 0.20
Nodes (9): APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem, pulseHigh (+1 more)

### Community 97 - "buyGlobalTickspeedMultiplier"
Cohesion: 0.32
Nodes (8): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), isGlobalTickspeedMultiplierUnlocked(), hasAffordableGlobalTickspeed(), hasOverclockAvailable(), hasSpeedUpAvailable(), hasTiersGameAttention(), lastTier()

### Community 100 - "buyTickspeedMultiplier"
Cohesion: 0.48
Nodes (7): actTickspeed(), buyTickspeedMultiplier(), consumeXpForLastTierTickspeed(), getLastTierId(), getLastTierXpTickspeedMinConsumption(), getTickspeedMultiplierCost(), isLastTierTickspeedXpUnlocked()

### Community 101 - "AppMenu/index.jsx"
Cohesion: 0.29
Nodes (6): AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle

### Community 102 - "ConfirmDialog/index.jsx"
Cohesion: 0.29
Nodes (6): Actions, Body, Card, ConfirmDialog(), Overlay, Title

### Community 103 - "formatBitsInNearestUnit"
Cohesion: 0.33
Nodes (7): floorToDecimals(), formatBitsInNearestSiUnit(), formatBitsInNearestUnit(), formatMemoryAmount(), getMemoryUnit(), getSiByteUnit(), formatMemoryBalance()

### Community 104 - "isComputeCoreConversionUnlocked"
Cohesion: 0.70
Nodes (5): isComputeCoreConversionUnlocked(), isComputeUpgradeTurnAvailable(), getComputeAttentionLevel(), hasComputeAttention(), hasInstantMergeAvailable()

### Community 105 - "eraEligibleState"
Cohesion: 0.50
Nodes (4): eraEligibleState(), withIntro(), withPoolBuffer(), withPrestigePoints()

### Community 106 - "applyOfflineProgress"
Cohesion: 1.00
Nodes (3): applyOfflineProgress(), getOfflineEffectiveSeconds(), computeOfflineCatchUp()

## Knowledge Gaps
- **595 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+590 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `Design history & rationale` to `Automation workflows`, `Tens`, `Testing`, `Economy model`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 25 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 25 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _595 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.03502824858757062 - nodes in this community are weakly interconnected._
- **Should `engine.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0590990990990991 - nodes in this community are weakly interconnected._