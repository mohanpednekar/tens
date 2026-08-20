# Graph Report - tens  (2026-08-20)

## Corpus Check
- 69 files · ~240,695 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 906 nodes · 1895 edges · 69 communities (57 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8cd77b43`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- isAutoMergeUnlockAvailable
- MainPage/index.jsx
- layers.js
- engine.test.js
- App.jsx
- Button/index.jsx
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
- Changelog
- Economy model reference
- CLAUDE.md
- AGENTS.md
- Game design
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
- tickGame
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- Copilot Instructions
- graphify
- extraction-spec.md
- MAINPAGE_REFERENCE.md
- PWA_REFERENCE.md
- THEMING_REFERENCE.md
- formatCurrency
- package.json
- ComputePage/index.jsx
- App.test.jsx
- getComputeBoostTierDurationSeconds
- ByteFoundryPage
- Design history & rationale
- OfflineProgressNotice/index.jsx
- storage.js
- InfoPage/index.jsx
- clampNonNegative
- getTierCost
- DiskArrayRow/index.jsx
- tickComputeMergeBoundary
- getDiskSize
- isComputeCoreConversionUnlocked
- applyOfflineProgress
- buyGlobalTickspeedMultiplier
- isProductionFrozen
- buySmartAutobuyer

## God Nodes (most connected - your core abstractions)
1. `Economy model` - 50 edges
2. `clampNonNegative()` - 42 edges
3. `MainPage()` - 42 edges
4. `useIncrementalGame()` - 41 edges
5. `tickGame()` - 37 edges
6. `ByteFoundryPage()` - 23 edges
7. `isProductionFrozen()` - 20 edges
8. `createInitialGameState()` - 15 edges
9. `ComputePage()` - 15 edges
10. `Economy model reference` - 15 edges

## Surprising Connections (you probably didn't know these)
- `simulateRun()` --calls--> `buyTierQuantity()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `tickGame()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `buyPrestigeSpeedBonus()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `createInitialGameState()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `getSpeedUpRequirement()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (69 total, 12 thin omitted)

### Community 0 - "isAutoMergeUnlockAvailable"
Cohesion: 0.18
Nodes (11): enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+3 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (56): Money, BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, CategoryHeading, CenteredCard, COMPUTE_BOOST_LABELS (+48 more)

### Community 2 - "layers.js"
Cohesion: 0.07
Nodes (36): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SPEED_UP_COST, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_FIELDS (+28 more)

### Community 3 - "engine.test.js"
Cohesion: 0.06
Nodes (11): isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable(), isComputeFabricsMergeStartAvailable(), isComputeGridsMergeStartAvailable(), isComputeMergeReserveStartAvailable(), isComputeNetworksMergeStartAvailable() (+3 more)

### Community 4 - "App.jsx"
Cohesion: 0.09
Nodes (24): App(), rootElement, reportWebVitals(), AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb() (+16 more)

### Community 5 - "Button/index.jsx"
Cohesion: 0.15
Nodes (17): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+9 more)

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): jsdom, devDependencies, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom, @testing-library/react (+15 more)

### Community 7 - "Economy model"
Cohesion: 0.04
Nodes (50): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Economy model, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model (+42 more)

### Community 8 - "ByteFoundryPage/index.jsx"
Cohesion: 0.08
Nodes (30): DiskArrayRow(), floorToDecimals(), formatAmount(), formatBitsInNearestUnit(), formatCacheSize(), formatDiskSize, formatMemoryAmount(), getBitUnit() (+22 more)

### Community 9 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 10 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 15 - "engine.js"
Cohesion: 0.07
Nodes (54): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyTickspeedAutobuyer(), combineIntroByte(), currencyNumberFormatter, enableAutoClaimCore() (+46 more)

### Community 17 - "Automation workflows"
Cohesion: 0.20
Nodes (10): Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning, PR follow-up (`autonomous-pr-followup.yml`) — security reasoning, Scheduled maintenance (`autonomous-maintenance.yml`) — job status reconciliation (+2 more)

### Community 22 - "Changelog"
Cohesion: 0.08
Nodes (23): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+15 more)

### Community 23 - "Economy model reference"
Cohesion: 0.08
Nodes (24): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Game state shape, Key engine functions (`src/game/engine.js`), Multiplier outcomes are floored, Multiplier overflow safety (+16 more)

### Community 24 - "CLAUDE.md"
Cohesion: 0.09
Nodes (21): Architecture, Automation workflows, Changelog convention, Commands, Documentation, Economy model, End-to-end testing, Funding (+13 more)

### Community 25 - "AGENTS.md"
Cohesion: 0.09
Nodes (20): Adding a new tier, Architecture, Automation design principles, Budget discipline, Byte Foundry, Changelog convention, Code review tooling, Commands (+12 more)

### Community 26 - "Game design"
Cohesion: 0.20
Nodes (9): Autobuyers, Core economy, Game architecture, Game design, Prestige, Production layers, Scripts, Security notes (+1 more)

### Community 27 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 2. Load the repo's invariants, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Procedure, Stance: adversarial

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
Cohesion: 0.33
Nodes (5): Auto-merge (`pr-auto-merge.yml`), Automation workflows, Orchestration model, PR follow-up (`autonomous-pr-followup.yml`), Scheduled maintenance (`autonomous-maintenance.yml`)

### Community 33 - "Shared components reference"
Cohesion: 0.29
Nodes (6): `Button/index.jsx`, `DiskArrayRow/index.jsx`, `Money/index.js`, `OfflineProgressNotice/index.jsx`, Shared components reference, `StatCard/index.js`

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
Cohesion: 0.50
Nodes (3): Usage, What it does, When editing the simulation

### Community 38 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 39 - "tickGame"
Cohesion: 0.21
Nodes (20): buyTickspeedMultiplier(), buyTier(), buyTierQuantity(), consumeXpForLastTierTickspeed(), getLastTierId(), getPurchaseBlockSize(), getTierAffordableQuantity(), getTierBulkQuantity() (+12 more)

### Community 48 - "formatCurrency"
Cohesion: 0.60
Nodes (5): formatCurrency(), formatMoneyBalance(), formatScientific(), RESOURCE_SYMBOL(), formatCost()

### Community 49 - "package.json"
Cohesion: 0.05
Nodes (43): @fontsource/inter, @fontsource/space-grotesk, browserslist, development, production, dependencies, @fontsource/inter, @fontsource/space-grotesk (+35 more)

### Community 50 - "ComputePage/index.jsx"
Cohesion: 0.07
Nodes (26): COMPUTE_MERGE_RESERVE_CAP, ActiveBoostRow, ArmedStatusText, AutoBadge, BoostRow, CompactButton, COMPUTE_BOOST_DISPLAY, ENTITY_ROWS (+18 more)

### Community 51 - "App.test.jsx"
Cohesion: 0.13
Nodes (11): ALL_TIER_IDS, AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_BOOST_MAX_STACKS, INTRO_BITS_PER_KILOBYTE_CONVERSION, INTRO_CONVERSION_UNLOCK_CAPACITY, INTRO_MIN_TICK_SPEED_SECONDS, INTRO_STARTING_CAPACITY (+3 more)

### Community 52 - "getComputeBoostTierDurationSeconds"
Cohesion: 0.27
Nodes (10): activateComputeBoost(), canReclaimComputeBoost(), getComputeBoostMultiplier(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), getComputeBoostTierMultiplier(), isValidComputeBoostTier(), reclaimComputeBoost() (+2 more)

### Community 53 - "ByteFoundryPage"
Cohesion: 0.20
Nodes (21): canActivateComputeBoost(), canStackComputeBoost(), getDiskCost(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), isBandwidthAvailable(), isBandwidthTurnAvailable(), isComputeBoostTurnAvailable() (+13 more)

### Community 54 - "Design history & rationale"
Cohesion: 0.25
Nodes (7): Architecture / MainPage UI decisions, Design history & rationale, Distribution, Documentation, Testing, Why a PWA instead of Capacitor/native app-store distribution, Why semver/changelog started at v0.5.0, not v0.1.0-from-inception

### Community 55 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.33
Nodes (5): VisuallyHidden, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, StatCard

### Community 57 - "storage.js"
Cohesion: 0.21
Nodes (13): COMPUTE_CORES_PER_NODE, DEFAULT_PURCHASE_BLOCK_SIZE, MONEY_ID, TIER_DEFINITIONS, LEGACY_REMOVED_TIER_IDS, LEGACY_TIER_ID_MAP, loadGameState(), loadLastSaveTimestamp() (+5 more)

### Community 58 - "InfoPage/index.jsx"
Cohesion: 0.14
Nodes (13): COMPUTE_BOOST_PRESETS, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RATIO, DISK_BUILD_COST_MULTIPLIER, INTRO_BYTE_COMBINE_COST, INTRO_CAPACITY_MULTIPLIER, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, INTRO_DISK_UNLOCK_CAPACITY (+5 more)

### Community 59 - "clampNonNegative"
Cohesion: 0.11
Nodes (34): OfflineProgressNotice(), applyAutobuyerMilestones(), buyAutoPrestige(), checkMilestones(), clampNonNegative(), countGlobalTickspeedMilestones(), formatOfflineDuration(), getAutobuyerUnlockMilestone() (+26 more)

### Community 60 - "getTierCost"
Cohesion: 0.17
Nodes (13): convertIntroBitsToKilobytes(), getCostEpochExponent(), getIntroKilobyteConversionCost(), getMatchingTierForDiskSize(), getTierCost(), getTierDiskRedeemCost(), getTierQuantityCost(), isDiskCacheBlockReleasable() (+5 more)

### Community 61 - "DiskArrayRow/index.jsx"
Cohesion: 0.20
Nodes (9): CacheBlock, CacheBlocksRow, DiskSizeRow, DiskSquare, RebuildingText, RowLabel, SquaresRow, DISK_ARRAY_LADDER_CAP (+1 more)

### Community 62 - "tickComputeMergeBoundary"
Cohesion: 0.17
Nodes (12): startComputeMergeReserve(), tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer(), tickAutoMergeFabricsIntoCloud(), tickAutoMergeGridsIntoFabric(), tickAutoMergeNetworksIntoGrid() (+4 more)

### Community 63 - "getDiskSize"
Cohesion: 0.50
Nodes (5): getDiskBuildBaseSeconds(), getDiskBuildSeconds(), getDiskSize(), getFirstTierCost(), startDiskBuild()

### Community 64 - "isComputeCoreConversionUnlocked"
Cohesion: 0.50
Nodes (5): claimComputeCore(), isComputeCoreClaimAvailable(), isComputeCoreConversionUnlocked(), mintComputeCoreIfReady(), tickComputeCoreConversion()

### Community 65 - "applyOfflineProgress"
Cohesion: 1.00
Nodes (3): applyOfflineProgress(), getOfflineEffectiveSeconds(), computeOfflineCatchUp()

### Community 66 - "buyGlobalTickspeedMultiplier"
Cohesion: 0.67
Nodes (3): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), isGlobalTickspeedMultiplierUnlocked()

### Community 67 - "isProductionFrozen"
Cohesion: 0.23
Nodes (12): cliValues, defaultPPValues, simulateRun(), allResourceIds(), buyPrestigeSpeedBonus(), createInitialGameState(), getSpeedUpRequirement(), isProductionFrozen() (+4 more)

### Community 68 - "buySmartAutobuyer"
Cohesion: 0.67
Nodes (3): buySmartAutobuyer(), getAutobuyerUnlockCost(), getSmartAutobuyerCost()

## Knowledge Gaps
- **411 isolated node(s):** `session-start.sh script`, `defaultPPValues`, `cliValues`, `seededState`, `baseUrl` (+406 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 20 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 20 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `defaultPPValues`, `cliValues` to the rest of the system?**
  _411 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.034482758620689655 - nodes in this community are weakly interconnected._
- **Should `layers.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07396870554765292 - nodes in this community are weakly interconnected._
- **Should `engine.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05537098560354374 - nodes in this community are weakly interconnected._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08912655971479501 - nodes in this community are weakly interconnected._