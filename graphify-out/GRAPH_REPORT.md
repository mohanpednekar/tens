# Graph Report - tens  (2026-08-24)

## Corpus Check
- 96 files · ~290,055 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1306 nodes · 3236 edges · 95 communities (78 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 82 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `383e55e2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- navAttention.js
- MainPage/index.jsx
- layers.js
- engine.test.js
- tokens.js
- SettingsPage/index.jsx
- devDependencies
- Economy model
- ByteFoundryPage/index.jsx
- What You Must Do When Invoked
- jsconfig.json
- generate-pwa-icons.mjs
- session-start.sh
- autobuyer-reload.e2e.js
- engine.js
- vite.config.js
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
- run-simulation.mjs
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- Copilot Instructions
- graphify
- extraction-spec.md
- MAINPAGE_REFERENCE.md
- PWA_REFERENCE.md
- THEMING_REFERENCE.md
- MainPage
- dependencies
- ComputePage/index.jsx
- MilestonesPage/index.jsx
- startDiskBuild
- ByteFoundryPage
- Design history & rationale
- development
- storage.js
- Button/index.jsx
- layers.test.js
- scripts
- DiskArrayRow/index.jsx
- Era ascension and Eons (#407)
- actFoundry
- App.test.jsx
- package.json
- clampNonNegative
- tickGame
- DataLakePanel/index.jsx
- ComputeFlopsPage/index.jsx
- Tier production tickspeed
- ConfirmDialog/index.jsx
- InfoPage/index.jsx
- Testing
- navAttention.test.js
- isComputeCoreConversionUnlocked
- canDepositDiskToDataLake
- isDiskFillAvailable
- getDiskSizesToShow
- buyGlobalTickspeedMultiplier
- backlog-issue-hygiene.sh
- pickIntroCapacityMilestone
- epic-407-issue-hygiene.sh
- getPrestigePointsAwarded
- engine.computeFlops.test.js
- INTRO_COMPUTE_CORE_UNLOCK_CAPACITY
- sync-release-milestones.sh
- adversarialReviewMarker.js
- Issue tracking for interactive sessions
- publish-strategy.sh
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- pr-low-risk-eligible.test.js

## God Nodes (most connected - your core abstractions)
1. `clampNonNegative()` - 71 edges
2. `useIncrementalGame()` - 64 edges
3. `Economy model` - 54 edges
4. `MainPage()` - 49 edges
5. `tickGame()` - 47 edges
6. `isProductionFrozen()` - 36 edges
7. `ByteFoundryPage()` - 26 edges
8. `createInitialGameState()` - 24 edges
9. `ComputePage()` - 24 edges
10. `DiskArrayRow()` - 20 edges

## Surprising Connections (you probably didn't know these)
- `seedDataLakeSave()` --calls--> `createInitialGameState()`  [EXTRACTED]
  e2e/data-lake.e2e.js → src/game/engine.js
- `actFoundry()` --calls--> `canActivateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `combineIntroByte()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `isBandwidthAvailable()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `isDiskBuildAvailable()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (95 total, 17 thin omitted)

### Community 0 - "navAttention.js"
Cohesion: 0.11
Nodes (30): enableAutoMerge(), getIntroKilobyteConversionCost(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable() (+22 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (58): OfflineProgressNotice(), formatOfflineDuration(), BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill (+50 more)

### Community 2 - "layers.js"
Cohesion: 0.07
Nodes (28): AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_MERGE_BOUNDARIES, DATA_LAKE_MAX_DISK_LADDER_STEP, DATA_LAKE_SUB_SIZES, FLOPS_AUTOBUYER_ERA_START, FLOPS_AUTOBUYER_ERA_STEP (+20 more)

### Community 3 - "engine.test.js"
Cohesion: 0.04
Nodes (30): clearIntroCapacityUpgradeQueue(), getBoosterPurchaseTotalCost(), getComputeMergeDurationSeconds(), getCoreEarnTimeSeconds(), getDiskReadCacheFlushSeconds(), getIntroProductionRate(), getMaxBoosterPurchasesForCapacity(), getTickspeedMultiplierBaseCost() (+22 more)

### Community 4 - "tokens.js"
Cohesion: 0.10
Nodes (22): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), GlobalStyle (+14 more)

### Community 5 - "SettingsPage/index.jsx"
Cohesion: 0.12
Nodes (19): getEonsAwarded(), MUSEUM_PIN_CAP, buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote (+11 more)

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): jsdom, devDependencies, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom, @testing-library/react (+15 more)

### Community 7 - "Economy model"
Cohesion: 0.04
Nodes (54): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+46 more)

### Community 8 - "ByteFoundryPage/index.jsx"
Cohesion: 0.09
Nodes (26): floorToDecimals(), formatBitsInNearestUnit(), formatMemoryAmount(), getComputeBandwidthSacrificeField(), getComputeBandwidthSacrificeLabel(), getMemoryUnit(), INTRO_CAPACITY_MULTIPLIER, ActionsRow (+18 more)

### Community 9 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 10 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 15 - "engine.js"
Cohesion: 0.07
Nodes (65): allResourceIds(), applyOfflineProgress(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, buildEraIntroReset(), buyHyperscaler(), canBuyHyperscaler(), canForfeitComputeBoost() (+57 more)

### Community 17 - "Automation workflows"
Cohesion: 0.15
Nodes (13): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning, PR follow-up (`autonomous-pr-followup.yml`) — security reasoning (+5 more)

### Community 22 - "[Unreleased]"
Cohesion: 0.06
Nodes (30): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+22 more)

### Community 23 - "Economy model reference"
Cohesion: 0.13
Nodes (15): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Game state shape, Key engine functions (`src/game/engine.js`), Offline progress, Overclock (+7 more)

### Community 24 - "CLAUDE.md"
Cohesion: 0.10
Nodes (20): Architecture, Automation workflows, Changelog convention, Commands, Documentation, Economy model, End-to-end testing, Funding (+12 more)

### Community 25 - "AGENTS.md"
Cohesion: 0.08
Nodes (22): Adding a new tier, Architecture, Automation design principles, Automation engines (Claude now, Cursor successor), Budget discipline, Byte Foundry, Changelog convention, Code review tooling (+14 more)

### Community 26 - "Tens"
Cohesion: 0.25
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
Cohesion: 0.29
Nodes (6): Auto-merge (`pr-auto-merge.yml`), Automation workflows, Cursor-powered successor engine, Orchestration model, PR follow-up (`autonomous-pr-followup.yml`), Scheduled maintenance (`autonomous-maintenance.yml`)

### Community 33 - "Shared components reference"
Cohesion: 0.18
Nodes (10): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `ConfirmDialog/index.jsx`, `DiskArrayRow/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, `OfflineProgressNotice/index.jsx` (+2 more)

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

### Community 39 - "run-simulation.mjs"
Cohesion: 0.10
Nodes (28): actMainBuys(), actPlayer(), actSoftResets(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges (+20 more)

### Community 48 - "MainPage"
Cohesion: 0.13
Nodes (25): countGlobalTickspeedMilestones(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getAutoPrestigeAttemptRate(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier() (+17 more)

### Community 49 - "dependencies"
Cohesion: 0.13
Nodes (15): @fontsource/inter, @fontsource/space-grotesk, dependencies, @fontsource/inter, @fontsource/space-grotesk, react, react-dom, react-is (+7 more)

### Community 50 - "ComputePage/index.jsx"
Cohesion: 0.07
Nodes (33): canActivateComputeBoost(), getNextComputeMergeDurationUpgradeIndex(), isComputeBoostTurnAvailable(), ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostRow (+25 more)

### Community 51 - "MilestonesPage/index.jsx"
Cohesion: 0.14
Nodes (15): getFlopsAutobuyerUnlockEra(), isEraEligible(), COMPUTE_FLOPS_TIER_DEFINITIONS, ERA_ELIGIBILITY_PP, TIER_DEFINITIONS, Badge, Category, CategoryHeading (+7 more)

### Community 52 - "startDiskBuild"
Cohesion: 0.18
Nodes (11): canStartDiskWriteCacheMerge(), combineIntroByte(), decrementFullDiskCount(), getDiskBuildBaseSeconds(), getDiskBuildSeconds(), getNextDiskLadderSize(), isDiskBuildBelowCap(), isInvestProgressBelowCap() (+3 more)

### Community 53 - "ByteFoundryPage"
Cohesion: 0.30
Nodes (14): applyIntroProductionDoublingToIntro(), getDiskCost(), getDiskSize(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), isBandwidthAvailable(), isBandwidthTurnAvailable(), isBitFundedBandwidthAvailable() (+6 more)

### Community 54 - "Design history & rationale"
Cohesion: 0.22
Nodes (9): Architecture / MainPage UI decisions, Design history & rationale, Distribution, Documentation, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Sacrifice confirm: in-game dialog; Core warning only when unlocked, Save persistence, Why a PWA instead of Capacitor/native app-store distribution (+1 more)

### Community 55 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 57 - "storage.js"
Cohesion: 0.05
Nodes (76): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon, MenuButton (+68 more)

### Community 58 - "Button/index.jsx"
Cohesion: 0.15
Nodes (16): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+8 more)

### Community 59 - "layers.test.js"
Cohesion: 0.11
Nodes (18): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_MERGE_DURATION_UPGRADE_COUNT, DATA_LAKE_TIER_LABELS, DISK_LADDER_BASE_SIZE_BITS, DISK_LADDER_SIZE_MULTIPLIER (+10 more)

### Community 60 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, audit, build, dev, gen-pwa-icons, start, test, test:e2e (+1 more)

### Community 61 - "DiskArrayRow/index.jsx"
Cohesion: 0.08
Nodes (44): CacheBlock, CacheBlocksRow, CacheFlushFill, CellLabel, DepositRow, DiskArrayRow(), DiskSizeRow, DiskSquare (+36 more)

### Community 62 - "Era ascension and Eons (#407)"
Cohesion: 0.25
Nodes (8): Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 63 - "actFoundry"
Cohesion: 0.14
Nodes (18): actFoundry(), activateComputeBoost(), canReclaimComputeBoost(), convertIntroBitsToKilobytes(), getBiggestComputeTierWaitingOnMerge(), getComputeBoostMultiplier(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField() (+10 more)

### Community 64 - "App.test.jsx"
Cohesion: 0.12
Nodes (13): ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_CORES_PER_NODE (+5 more)

### Community 65 - "package.json"
Cohesion: 0.18
Nodes (10): name, packageManager, private, resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid (+2 more)

### Community 66 - "clampNonNegative"
Cohesion: 0.22
Nodes (20): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyComputeAutoBoost(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus(), buySmartAutobuyer(), buyTickspeedAutobuyer() (+12 more)

### Community 67 - "tickGame"
Cohesion: 0.21
Nodes (21): wouldAutobuyerStall(), buyTickspeedMultiplier(), buyTier(), buyTierQuantity(), getCostEpochExponent(), getLastTierId(), getPurchaseBlockSize(), getTierAffordableQuantity() (+13 more)

### Community 68 - "DataLakePanel/index.jsx"
Cohesion: 0.18
Nodes (18): DataLakePanel(), getVisibleLakeTierIndexes(), LakeList, LakeName, LakeRow, LakeStats, canPurchaseBoosterFromDataLake(), createEmptyDataLakeTier() (+10 more)

### Community 69 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.13
Nodes (21): Money, buyComputeFlopsTier(), canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight() (+13 more)

### Community 71 - "Tier production tickspeed"
Cohesion: 0.67
Nodes (3): Multiplier outcomes are floored, Production figure (tick-progress ring removed), Tier production tickspeed

### Community 72 - "ConfirmDialog/index.jsx"
Cohesion: 0.15
Nodes (12): Actions, Body, Card, ConfirmDialog(), Overlay, Title, Body, Card (+4 more)

### Community 73 - "InfoPage/index.jsx"
Cohesion: 0.12
Nodes (15): COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, COMPUTE_MERGE_RESERVE_CAP, COMPUTE_MERGE_STEP_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, DATA_LAKE_SLOT_MAX (+7 more)

### Community 74 - "Testing"
Cohesion: 0.22
Nodes (9): Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake refill gating: staged 9 → 99 → 999 capacity from disk-array completion, Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382), Disk ladder offers every Byte power-of-ten size (issue #368), Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Removing Claim Core: superseded by Data Lake Boosters, Testing (+1 more)

### Community 75 - "navAttention.test.js"
Cohesion: 0.15
Nodes (12): COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_BYTE_COMBINE_COST, INTRO_DISK_UNLOCK_CAPACITY, INTRO_STARTING_CAPACITY, MONEY_ID, TICKSPEED_AUTOBUYER_COST, ATTENTION_NORMAL (+4 more)

### Community 76 - "isComputeCoreConversionUnlocked"
Cohesion: 0.70
Nodes (5): isComputeCoreConversionUnlocked(), isComputeUpgradeTurnAvailable(), getComputeAttentionLevel(), hasComputeAttention(), hasInstantMergeAvailable()

### Community 77 - "canDepositDiskToDataLake"
Cohesion: 0.43
Nodes (7): canDepositDiskToDataLake(), depositDiskToDataLake(), getDataLakeSubSize(), getDataLakeTierIndex(), getDiskLadderSizeBits(), getDiskLadderStep(), isDiskArrayFullyBuilt()

### Community 78 - "isDiskFillAvailable"
Cohesion: 0.27
Nodes (12): canStackComputeBoost(), isComputeUpgradeAvailable(), isDiskFillAvailable(), isMemoryCapacityUpgradeAvailable(), isStackComputeBoostTurnAvailable(), isStorageUnlocked(), getFoundryAttentionLevel(), getStorageAttentionLevel() (+4 more)

### Community 79 - "getDiskSizesToShow"
Cohesion: 0.40
Nodes (5): getDiskSizesToShow(), Header, RootDiv, StoragePage(), Title

### Community 80 - "buyGlobalTickspeedMultiplier"
Cohesion: 0.32
Nodes (8): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), isGlobalTickspeedMultiplierUnlocked(), hasAffordableGlobalTickspeed(), hasOverclockAvailable(), hasSpeedUpAvailable(), hasTiersGameAttention(), lastTier()

### Community 81 - "backlog-issue-hygiene.sh"
Cohesion: 0.47
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing(), backlog-issue-hygiene.sh script

### Community 82 - "pickIntroCapacityMilestone"
Cohesion: 0.50
Nodes (4): eraseAllComputeTokens(), pickIntroCapacityMilestone(), rewindOneIntroProductionClaim(), rollbackComputeFundedBandwidth()

### Community 83 - "epic-407-issue-hygiene.sh"
Cohesion: 0.50
Nodes (7): add_label_if_missing(), close_if_open(), has_marker_comment(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 84 - "getPrestigePointsAwarded"
Cohesion: 0.36
Nodes (8): checkMilestones(), getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp(), getPrestigePpEarnProgressPercent(), getPrestigePpPerPower(), getPrestigeProgressPercent()

### Community 85 - "engine.computeFlops.test.js"
Cohesion: 0.29
Nodes (6): AUTO_SPEED_UP_COST, BYTES_ID, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP, PRESTIGE_THRESHOLD, TICK_RATE_MS

### Community 88 - "sync-release-milestones.sh"
Cohesion: 0.60
Nodes (4): assign_milestone(), ensure_milestone(), run(), sync-release-milestones.sh script

### Community 89 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 91 - "Issue tracking for interactive sessions"
Cohesion: 0.67
Nodes (3): Cursor Cloud GitHub access, GitHub Milestones (release grouping), Issue tracking for interactive sessions

## Knowledge Gaps
- **522 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+517 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 25 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 25 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _522 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `navAttention.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10752688172043011 - nodes in this community are weakly interconnected._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.03389830508474576 - nodes in this community are weakly interconnected._