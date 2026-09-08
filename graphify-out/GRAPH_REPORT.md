# Graph Report - tens  (2026-09-08)

## Corpus Check
<<<<<<< HEAD
- 108 files · ~419,660 words
||||||| 9ad631f
- 108 files · ~416,605 words
=======
- 108 files · ~419,277 words
>>>>>>> main
- Verdict: corpus is large enough that graph structure adds value.

## Summary
<<<<<<< HEAD
- 1586 nodes · 4000 edges · 102 communities (83 shown, 16 thin omitted)
||||||| 9ad631f
- 1580 nodes · 3983 edges · 99 communities (80 shown, 16 thin omitted)
=======
- 1582 nodes · 3983 edges · 98 communities (79 shown, 16 thin omitted)
>>>>>>> main
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
<<<<<<< HEAD
- Built from commit: `361af903`
||||||| 9ad631f
- Built from commit: `3770d86e`
=======
- Built from commit: `389ec123`
>>>>>>> main
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- storage.js
- MainPage/index.jsx
- layers.js
- ByteFoundryPage/index.jsx
<<<<<<< HEAD
- tokens.js
- getStoragePoolBandwidth
||||||| 9ad631f
- styled-components
- contrast.js
=======
- styled-components
- engine.js
>>>>>>> main
- devDependencies
- Economy model
- optimize-ai-files/SKILL.md
- What You Must Do When Invoked
- jsconfig.json
- generate-pwa-icons.mjs
- session-start.sh
- @playwright/test
<<<<<<< HEAD
- engine.test.js
- vitest
||||||| 9ad631f
- getUnlockedStoragePoolCount
- vitest
=======
- getStoragePoolBandwidth
- capacitorConfig.test.js
>>>>>>> main
- Automation workflows
- package.json
<<<<<<< HEAD
- provisionDisk
- getDiskLadderSizeBits
||||||| 9ad631f
- actFoundry
- getStoragePoolBandwidth
=======
- getDataStreamBaseMultiplierPercent
- getDiskLadderSizeBits
>>>>>>> main
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
<<<<<<< HEAD
- ComputePage
||||||| 9ad631f
- activateComputeBoost
=======
- tickGame
>>>>>>> main
- dependencies
- ComputePage/index.jsx
<<<<<<< HEAD
- engine.js
||||||| 9ad631f
- engine.test.js
=======
- useIncrementalGame.js
>>>>>>> main
- DevModePage/index.jsx
- App.test.jsx
- MilestonesPage/index.jsx
- browserslist
<<<<<<< HEAD
- ByteFoundryPage
||||||| 9ad631f
- pickIntroProductionMilestone
=======
- applyDevGameStateJson
>>>>>>> main
- SettingsPage/index.jsx
- InfoPage/index.jsx
- Button/index.jsx
- scripts
- DiskArrayRow/index.jsx
- tickGame
- bump-version.mjs
- App.jsx
<<<<<<< HEAD
- storage.test.js
- tickComputeMergeBoundary
||||||| 9ad631f
- isAutoMergeUnlockAvailable
- engine.js
=======
- save-migration/index.js
- engine.test.js
>>>>>>> main
- navAttention.js
- navAttention.test.js
<<<<<<< HEAD
- loadSavesMeta
- styled-components
||||||| 9ad631f
- run-simulation.mjs
- ConfirmDialog/index.jsx
=======
- createInitialGameState
- ConfirmDialog/index.jsx
>>>>>>> main
- DataLakePanel/index.jsx
<<<<<<< HEAD
- getOverclockRequirement
||||||| 9ad631f
- AppNav/index.jsx
=======
- contrast.js
>>>>>>> main
- clampNonNegative
- Testing
<<<<<<< HEAD
- isTierUnlocked
||||||| 9ad631f
=======
- pickIntroProductionMilestone
>>>>>>> main
- sentinel.md
- palette.md
- Design history & rationale
<<<<<<< HEAD
- save-migration/index.js
- tapPoolBuffer
||||||| 9ad631f
- AppMenu/index.jsx
=======
- buyGlobalTickspeedMultiplier
- isDevModeActive
>>>>>>> main
- backlog-issue-hygiene.sh
- bolt.md
- epic-407-issue-hygiene.sh
- ComputeFlopsPage/index.jsx
- buyTickspeedMultiplier
- MainPage
- sync-release-milestones.sh
- adversarialReviewMarker.js
- resolutions
<<<<<<< HEAD
- src/index.jsx
||||||| 9ad631f
- react
=======
>>>>>>> main
- publish-strategy.sh
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- pr-low-risk-eligible.test.js
<<<<<<< HEAD
- engine.computeFlops.test.js
||||||| 9ad631f
- buyGlobalTickspeedMultiplier
=======
>>>>>>> main
- Era ascension and Eons (#407)
- Issue tracking for interactive sessions
- Tier production tickspeed
- Documentation

## God Nodes (most connected - your core abstractions)
1. `clampNonNegative()` - 72 edges
2. `useIncrementalGame()` - 71 edges
<<<<<<< HEAD
3. `Testing` - 57 edges
4. `Economy model` - 56 edges
||||||| 9ad631f
3. `Economy model` - 56 edges
4. `Testing` - 54 edges
=======
3. `Economy model` - 56 edges
4. `Testing` - 56 edges
>>>>>>> main
5. `tickGame()` - 52 edges
6. `MainPage()` - 49 edges
7. `ByteFoundryPage()` - 38 edges
8. `isProductionFrozen()` - 36 edges
9. `DataLakePanel()` - 25 edges
10. `createInitialGameState()` - 24 edges

## Surprising Connections (you probably didn't know these)
<<<<<<< HEAD
- `actFoundry()` --calls--> `buyBooster()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `combineIntroByte()`  [EXTRACTED]
||||||| 9ad631f
- `actFoundry()` --calls--> `activateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `buyBooster()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `canActivateComputeBoost()`  [EXTRACTED]
=======
- `actFoundry()` --calls--> `convertIntroBitsToKilobytes()`  [EXTRACTED]
>>>>>>> main
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `convertIntroBitsToKilobytes()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `getVisibleStoragePoolCount()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `isBoosterPurchaseAvailable()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `pickIntroProductionMilestone()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `provisionDisk()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

<<<<<<< HEAD
## Communities (102 total, 16 thin omitted)
||||||| 9ad631f
## Communities (99 total, 16 thin omitted)
=======
## Communities (98 total, 16 thin omitted)
>>>>>>> main

### Community 0 - "storage.js"
<<<<<<< HEAD
Cohesion: 0.17
Nodes (23): applyFlopsAutobuyerMilestones(), createEmptyDataLakes(), createEmptyDataLakeTier(), normalizePoolMemoryCapacity(), COMPUTE_BOOST_TIER_FIELDS, COMPUTE_CORES_PER_NODE, applyDevGameStateJson(), applyPendingComputeGrants() (+15 more)
||||||| 9ad631f
Cohesion: 0.08
Nodes (66): applyFlopsAutobuyerMilestones(), buildEraIntroReset(), createEmptyDataLakes(), createEmptyDataLakeTier(), eraGame(), getEonsAwarded(), getFlopsAutobuyerUnlockEra(), PRESTIGE_UNBOUNDED_MIN_COUNT (+58 more)
=======
Cohesion: 0.18
Nodes (27): buildClearSlotConfirmMessage(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), buildResetActiveSlotConfirmMessage(), buildResetByteFoundryConfirmMessage(), coerceMeta(), completeDummySupporterPurchase(), defaultSlotName() (+19 more)
>>>>>>> main

### Community 1 - "MainPage/index.jsx"
<<<<<<< HEAD
Cohesion: 0.04
Nodes (55): GLOBAL_TICKSPEED_PRODUCTION_STEP, BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments (+47 more)
||||||| 9ad631f
Cohesion: 0.03
Nodes (59): GLOBAL_TICKSPEED_PRODUCTION_STEP, BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments (+51 more)
=======
Cohesion: 0.04
Nodes (58): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments, CategoryHeading (+50 more)
>>>>>>> main

### Community 2 - "layers.js"
<<<<<<< HEAD
Cohesion: 0.05
Nodes (53): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_FLOPS_TIER_BY_ID (+45 more)
||||||| 9ad631f
Cohesion: 0.06
Nodes (44): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_FLOPS_TIER_BY_ID, COMPUTE_FLOPS_TIER_INDEX_BY_ID (+36 more)
=======
Cohesion: 0.05
Nodes (57): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SPEED_UP_COST, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_DURATION_STEP (+49 more)
>>>>>>> main

### Community 3 - "ByteFoundryPage/index.jsx"
<<<<<<< HEAD
Cohesion: 0.06
Nodes (43): flooredBitsLabel(), floorToDecimals(), formatBitsInNearestSiUnit(), formatBitsInNearestUnit(), formatDiskSizeStable(), formatMemoryAmount(), formatMemoryAmountStable(), getDiskCost() (+35 more)
||||||| 9ad631f
Cohesion: 0.07
Nodes (34): formatBitsInNearestUnit(), getMemoryUnit(), ActionsRow, BalanceText, clampGaugeValue(), clampPercent(), DataStreamCard, ExpandToggleButton (+26 more)
=======
Cohesion: 0.07
Nodes (32): getDiskCost(), ActionsRow, BalanceText, clampGaugeValue(), clampPercent(), DataStreamCard, ExpandToggleButton, FillableStatCard (+24 more)
>>>>>>> main

<<<<<<< HEAD
### Community 4 - "tokens.js"
Cohesion: 0.10
Nodes (22): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), GlobalStyle (+14 more)
||||||| 9ad631f
### Community 4 - "styled-components"
Cohesion: 0.13
Nodes (16): styled-components, GlobalStyle, getSystemThemeMode(), ThemeProvider(), buildTheme(), DEFAULT_MODE, font, MODES (+8 more)
=======
### Community 4 - "styled-components"
Cohesion: 0.13
Nodes (15): styled-components, GlobalStyle, getSystemThemeMode(), ThemeProvider(), buildTheme(), DEFAULT_MODE, font, MODES (+7 more)
>>>>>>> main

<<<<<<< HEAD
### Community 5 - "getStoragePoolBandwidth"
Cohesion: 0.16
Nodes (21): getCoreEarnTimeSeconds(), getDecadePowerEquivalentBits(), getDiskReadCacheFlushSeconds(), getDiskWriteCacheFlushSeconds(), getDiskWriteCacheSegmentSeconds(), getIntroProductionRate(), getPoolBufferCapacity(), getPoolEffectMultiplier() (+13 more)
||||||| 9ad631f
### Community 5 - "contrast.js"
Cohesion: 0.38
Nodes (7): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear()
=======
### Community 5 - "engine.js"
Cohesion: 0.07
Nodes (40): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, DATA_LAKE_OVERFLOW_SEGMENT_LIMIT, flooredBitsLabel(), floorToDecimals(), formatBitsInNearestSiUnit() (+32 more)
>>>>>>> main

### Community 6 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, @capacitor/cli, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom, @testing-library/react (+5 more)

### Community 7 - "Economy model"
Cohesion: 0.04
Nodes (56): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+48 more)

### Community 8 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 9 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 10 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 11 - "generate-pwa-icons.mjs"
Cohesion: 0.25
Nodes (5): sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, targets

<<<<<<< HEAD
### Community 15 - "engine.test.js"
Cohesion: 0.04
Nodes (22): captureFoundryUpgradeCaps(), clearIntroCapacityUpgradeQueue(), getAutobuyerUnlockCost(), getComputeBoostMultiplier(), getDataStreamEffectMultiplier(), getNextSiDoubledValue(), getTickspeedMultiplierBaseCost(), getTierProductionProgressPercent() (+14 more)
||||||| 9ad631f
### Community 15 - "getUnlockedStoragePoolCount"
Cohesion: 0.15
Nodes (21): getDataStreamBaseMultiplierPercent(), getDataStreamFillFraction(), getDecadePowerEquivalentBits(), getFillMultiplierPercent(), getPoolBaseMultiplierPercent(), getPoolBufferCapacity(), getPoolBufferFillFraction(), getPoolEffectMultiplier() (+13 more)
=======
### Community 15 - "getStoragePoolBandwidth"
Cohesion: 0.12
Nodes (27): canStartDiskWriteCacheMerge(), decrementFullDiskCount(), getCoreEarnTimeSeconds(), getDecadePowerEquivalentBits(), getDiskReadCacheFlushSeconds(), getDiskWriteCacheFlushSeconds(), getDiskWriteCacheSegmentSeconds(), getIntroProductionRate() (+19 more)
>>>>>>> main

### Community 16 - "capacitorConfig.test.js"
Cohesion: 0.24
Nodes (6): vite, vite-plugin-pwa, @vitejs/plugin-react, root, srcPath, createViteConfig()

### Community 17 - "Automation workflows"
Cohesion: 0.15
Nodes (13): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning, PR follow-up (`autonomous-pr-followup.yml`) — security reasoning (+5 more)

### Community 18 - "package.json"
Cohesion: 0.12
Nodes (15): name, packageManager, private, type, @capacitor/cli, @capacitor/core, @fontsource/inter, @fontsource/space-grotesk (+7 more)

<<<<<<< HEAD
### Community 19 - "provisionDisk"
Cohesion: 0.18
Nodes (13): combineIntroByte(), getDiskProvisionPassesCollected(), getDiskSize(), getMaxActiveDiskLadderStep(), getProvisionDiskSeconds(), isDiskBuildBelowCap(), isDiskLadderExhaustedForActivePools(), isInvestProgressBelowCap() (+5 more)
||||||| 9ad631f
### Community 19 - "actFoundry"
Cohesion: 0.15
Nodes (16): actFoundry(), combineIntroByte(), convertIntroBitsToKilobytes(), eraseAllComputeTokens(), getIntroProductionRate(), getPoolCapacityUnlockThresholdBits(), getVisibleStoragePoolCount(), isInvestProgressBelowCap() (+8 more)
=======
### Community 19 - "getDataStreamBaseMultiplierPercent"
Cohesion: 0.47
Nodes (6): getDataStreamBaseMultiplierPercent(), getDataStreamFillFraction(), getFillMultiplierPercent(), getPoolBaseMultiplierPercent(), getPoolBufferFillFraction(), tickFillMultiplierDecay()
>>>>>>> main

<<<<<<< HEAD
### Community 20 - "getDiskLadderSizeBits"
Cohesion: 0.20
Nodes (14): canStartDiskWriteCacheMerge(), decrementFullDiskCount(), getDataLakeCapacityUnlockArraySize(), getDataLakeSubSize(), getDataLakeSubSizeStep(), getDataLakeTierIndex(), getDiskLadderSizeBits(), getDiskLadderStep() (+6 more)
||||||| 9ad631f
### Community 20 - "getStoragePoolBandwidth"
Cohesion: 0.14
Nodes (23): canStartDiskWriteCacheMerge(), decrementFullDiskCount(), getDataLakeCapacityUnlockArraySize(), getDataLakeSubSize(), getDataLakeSubSizeStep(), getDataLakeTierIndex(), getDiskLadderSizeBits(), getDiskLadderStep() (+15 more)
=======
### Community 20 - "getDiskLadderSizeBits"
Cohesion: 0.47
Nodes (6): getDataLakeCapacityUnlockArraySize(), getDataLakeSubSizeStep(), getDiskLadderSizeBits(), getDiskLadderStep(), getDiskSizeForTierLevel(), getNextDiskLadderSize()
>>>>>>> main

### Community 22 - "[Unreleased]"
Cohesion: 0.06
Nodes (32): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+24 more)

### Community 23 - "Economy model reference"
Cohesion: 0.13
Nodes (15): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Game state shape, Key engine functions (`src/game/engine.js`), Offline progress, Overclock (+7 more)

### Community 24 - "CLAUDE.md"
Cohesion: 0.09
Nodes (21): AI-instruction file cost hygiene, Architecture, Automation workflows, Capacitor foundation (in progress — #70), Commands, Dev Mode, Economy model, End-to-end testing (+13 more)

### Community 25 - "AGENTS.md"
Cohesion: 0.08
Nodes (23): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engines (Claude now, Cursor successor), Budget discipline, Byte Foundry, Changelog convention (+15 more)

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
Cohesion: 0.18
Nodes (10): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Cursor-powered successor engine, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Orchestration model, PR follow-up (`autonomous-pr-followup.yml`) (+2 more)

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

<<<<<<< HEAD
### Community 39 - "run-simulation.mjs"
Cohesion: 0.13
Nodes (18): actMainBuys(), actPlayer(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+10 more)
||||||| 9ad631f
### Community 39 - "tickGame"
Cohesion: 0.20
Nodes (26): actMainBuys(), actTickspeed(), wouldAutobuyerStall(), buyTickspeedMultiplier(), buyTier(), buyTierQuantity(), consumeXpForLastTierTickspeed(), getIntroKilobyteConversionCost() (+18 more)
=======
### Community 39 - "run-simulation.mjs"
Cohesion: 0.14
Nodes (21): actPlayer(), actSoftResets(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+13 more)
>>>>>>> main

<<<<<<< HEAD
### Community 48 - "ComputePage"
Cohesion: 0.23
Nodes (20): actFoundry(), activateComputeBoost(), canActivateComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), getBiggestComputeTierWaitingOnMerge(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField() (+12 more)
||||||| 9ad631f
### Community 48 - "activateComputeBoost"
Cohesion: 0.18
Nodes (15): activateComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), getBiggestComputeTierWaitingOnMerge(), getComputeBoostMultiplier(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), getComputeBoostTierMultiplier() (+7 more)
=======
### Community 48 - "tickGame"
Cohesion: 0.23
Nodes (23): actMainBuys(), wouldAutobuyerStall(), buyTickspeedMultiplier(), buyTier(), buyTierQuantity(), convertIntroBitsToKilobytes(), getIntroKilobyteConversionCost(), getLastTierId() (+15 more)
>>>>>>> main

### Community 49 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, @capacitor/core, @fontsource/inter, @fontsource/space-grotesk, react, react-dom, react-is, styled-components (+1 more)

### Community 50 - "ComputePage/index.jsx"
Cohesion: 0.06
<<<<<<< HEAD
Nodes (33): getNextComputeMergeDurationUpgradeIndex(), COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_MERGE_RESERVE_CAP, COMPUTE_MERGE_STEP_MULTIPLIER, ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow (+25 more)
||||||| 9ad631f
Nodes (31): COMPUTE_MERGE_STEP_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostRow, canMerge() (+23 more)
=======
Nodes (40): canForfeitComputeBoost(), canReclaimComputeBoost(), forfeitComputeBoost(), getComputeBoostTierDurationSeconds(), getComputeBoostTierMultiplier(), getNextComputeMergeDurationUpgradeIndex(), isUpgradeComputeMergeDurationAvailable(), isValidComputeBoostTier() (+32 more)
>>>>>>> main

<<<<<<< HEAD
### Community 51 - "engine.js"
Cohesion: 0.06
Nodes (61): applyOfflineProgress(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, canForfeitComputeBoost(), clearDiskBuildQueue(), COMPUTE_MERGE_TIMER_FIELDS, countGlobalTickspeedMilestones(), currencyNumberFormatter (+53 more)
||||||| 9ad631f
### Community 51 - "engine.test.js"
Cohesion: 0.03
Nodes (65): applyOfflineProgress(), canForfeitComputeBoost(), captureFoundryUpgradeCaps(), clearDiskBuildQueue(), doubleDataLakeCapacity(), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode (+57 more)
=======
### Community 51 - "useIncrementalGame.js"
Cohesion: 0.06
Nodes (45): applyOfflineProgress(), clearDiskBuildQueue(), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric (+37 more)
>>>>>>> main

### Community 52 - "DevModePage/index.jsx"
<<<<<<< HEAD
Cohesion: 0.14
Nodes (16): ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldRow, Header, JsonTextarea (+8 more)
||||||| 9ad631f
Cohesion: 0.11
Nodes (23): COMPUTE_FLOPS_TIER_DEFINITIONS, TIER_DEFINITIONS, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode() (+15 more)
=======
Cohesion: 0.12
Nodes (21): ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow, Header (+13 more)
>>>>>>> main

### Community 53 - "App.test.jsx"
<<<<<<< HEAD
Cohesion: 0.10
Nodes (16): ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, DATA_LAKE_CAPACITY_MAX_LEVEL (+8 more)
||||||| 9ad631f
Cohesion: 0.11
Nodes (14): ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_CORES_PER_NODE, COMPUTE_ENTITY_CAP, DATA_LAKE_CAPACITY_MAX_LEVEL (+6 more)
=======
Cohesion: 0.07
Nodes (24): version, ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS (+16 more)
>>>>>>> main

### Community 54 - "MilestonesPage/index.jsx"
<<<<<<< HEAD
Cohesion: 0.11
Nodes (19): VisuallyHidden, getFlopsAutobuyerUnlockEra(), COMPUTE_FLOPS_TIER_DEFINITIONS, ERA_ELIGIBILITY_PP, TIER_DEFINITIONS, FieldNode(), FLOPS_TIER_NAME_BY_ID, isEditableScalar() (+11 more)
||||||| 9ad631f
Cohesion: 0.16
Nodes (13): getTierTickspeedAutobuyerMilestone(), isEraEligible(), ERA_ELIGIBILITY_PP, Badge, Category, CategoryHeading, Header, List (+5 more)
=======
Cohesion: 0.16
Nodes (16): applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getFlopsAutobuyerUnlockEra(), getTierTickspeedAutobuyerMilestone(), isEraEligible(), InfoPage(), Badge, Category (+8 more)
>>>>>>> main

### Community 55 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

<<<<<<< HEAD
### Community 56 - "ByteFoundryPage"
Cohesion: 0.17
Nodes (20): applyIntroProductionDoublingToIntro(), eraseAllComputeTokens(), getComputeBandwidthSacrificeField(), getComputeBandwidthSacrificeLabel(), getEffectiveComputeBandwidthSacrificeIndex(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), isBandwidthTurnAvailable() (+12 more)
||||||| 9ad631f
### Community 56 - "pickIntroProductionMilestone"
Cohesion: 0.27
Nodes (11): applyIntroProductionDoublingToIntro(), getComputeBandwidthSacrificeField(), getComputeBandwidthSacrificeLabel(), getEffectiveComputeBandwidthSacrificeIndex(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), isBitFundedBandwidthAvailable(), isComputeFundedBandwidthAvailable() (+3 more)
=======
### Community 56 - "applyDevGameStateJson"
Cohesion: 0.23
Nodes (13): applyDevGameStateJson(), discardIncompatibleActiveSaveIfNeeded(), getActiveSlotId(), isPlainObject(), loadGameState(), loadLastSaveTimestamp(), mergeStateForDevWrite(), readActiveSavePayload() (+5 more)
>>>>>>> main

### Community 57 - "SettingsPage/index.jsx"
<<<<<<< HEAD
Cohesion: 0.09
Nodes (24): buildEraIntroReset(), eraGame(), getEonsAwarded(), MUSEUM_PIN_CAP, buildClearSlotConfirmMessage(), buildEraseAllSavesConfirmMessage(), FREE_SLOT_COUNT, SUPPORTER_UNLOCK_CODE (+16 more)
||||||| 9ad631f
Cohesion: 0.12
Nodes (16): MUSEUM_PIN_CAP, buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem, MuseumList (+8 more)
=======
Cohesion: 0.12
Nodes (24): formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getEonsAwarded(), RESOURCE_SYMBOL(), formatCost() (+16 more)
>>>>>>> main

### Community 58 - "InfoPage/index.jsx"
<<<<<<< HEAD
Cohesion: 0.10
Nodes (19): CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_ENTITY_CAP, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, DATA_LAKE_OVERFLOW_MIN_PERCENT (+11 more)
||||||| 9ad631f
Cohesion: 0.11
Nodes (17): COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, COMPUTE_MERGE_RESERVE_CAP, DATA_LAKE_OVERFLOW_MIN_PERCENT, DATA_LAKE_SUB_SIZE_DISK_CAPS (+9 more)
=======
Cohesion: 0.07
Nodes (26): CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, COMPUTE_MERGE_RESERVE_CAP (+18 more)
>>>>>>> main

### Community 59 - "Button/index.jsx"
Cohesion: 0.19
Nodes (13): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+5 more)

### Community 60 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 61 - "DiskArrayRow/index.jsx"
Cohesion: 0.08
<<<<<<< HEAD
Nodes (37): CacheBlock, CacheBlocksRow, CacheFlushFill, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, pullPulse (+29 more)
||||||| 9ad631f
Nodes (34): CacheBlock, CacheBlocksRow, CacheFlushFill, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, pullPulse (+26 more)
=======
Nodes (39): CacheBlock, CacheBlocksRow, CacheFlushFill, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, pullPulse (+31 more)
>>>>>>> main

<<<<<<< HEAD
### Community 62 - "tickGame"
Cohesion: 0.19
Nodes (22): wouldAutobuyerStall(), buyTier(), buyTierQuantity(), convertIntroBitsToKilobytes(), getAutoPrestigeAttemptRate(), getCostEpochExponent(), getIntroKilobyteConversionCost(), getPrestigeProductionMultiplier() (+14 more)
||||||| 9ad631f
### Community 62 - "ByteFoundryPage"
Cohesion: 0.15
Nodes (28): canActivateComputeBoost(), getDiskCost(), getDiskProvisionPassesCollected(), getDiskRedeemTierName(), getDiskSize(), getDiskSizesToShow(), getMaxActiveDiskLadderStep(), getNextComputeMergeDurationUpgradeIndex() (+20 more)
=======
### Community 62 - "ByteFoundryPage"
Cohesion: 0.19
Nodes (20): canStackComputeBoost(), getDiskProvisionPassesCollected(), getDiskSize(), getMaxActiveDiskLadderStep(), getPoolBufferBits(), getProvisionDiskSeconds(), isBandwidthAvailable(), isBandwidthTurnAvailable() (+12 more)
>>>>>>> main

### Community 63 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 64 - "App.jsx"
<<<<<<< HEAD
Cohesion: 0.16
Nodes (18): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon, MenuButton (+10 more)
||||||| 9ad631f
Cohesion: 0.32
Nodes (11): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), isComputeFlopsPageRevealed(), buildResetActiveSlotConfirmMessage(), buildResetByteFoundryConfirmMessage(), getActiveSlotDisplayName() (+3 more)
=======
Cohesion: 0.10
Nodes (24): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon, MenuButton (+16 more)
>>>>>>> main

<<<<<<< HEAD
### Community 65 - "storage.test.js"
Cohesion: 0.20
Nodes (17): INTRO_CAPACITY_CAP_BITS, MONEY_STARTING_AMOUNT, PRESTIGE_UNBOUNDED_MIN_COUNT, clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot(), discardIncompatibleActiveSaveIfNeeded() (+9 more)
||||||| 9ad631f
### Community 65 - "isAutoMergeUnlockAvailable"
Cohesion: 0.18
Nodes (11): enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+3 more)
=======
### Community 65 - "save-migration/index.js"
Cohesion: 0.36
Nodes (7): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()
>>>>>>> main

<<<<<<< HEAD
### Community 66 - "tickComputeMergeBoundary"
Cohesion: 0.15
Nodes (14): getComputeMergeDurationSeconds(), startComputeMergeReserve(), startComputeMergeReserveAtBoundary(), tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer(), tickAutoMergeFabricsIntoCloud() (+6 more)
||||||| 9ad631f
### Community 66 - "engine.js"
Cohesion: 0.05
Nodes (53): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, clearIntroCapacityUpgradeQueue(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, DATA_LAKE_OVERFLOW_SEGMENT_LIMIT, getComputeMergeDurationSeconds(), getCoreEarnTimeSeconds() (+45 more)
=======
### Community 66 - "engine.test.js"
Cohesion: 0.04
Nodes (41): actFoundry(), activateComputeBoost(), buyBooster(), canActivateComputeBoost(), clearIntroCapacityUpgradeQueue(), combineIntroByte(), eraseAllComputeTokens(), getBiggestComputeTierWaitingOnMerge() (+33 more)
>>>>>>> main

### Community 67 - "navAttention.js"
<<<<<<< HEAD
Cohesion: 0.07
Nodes (49): APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem, pulseHigh (+41 more)
||||||| 9ad631f
Cohesion: 0.18
Nodes (23): isComputeCoreConversionUnlocked(), isIntroConversionUnlocked(), COMPUTE_AUTO_MERGE_UNLOCKS, COMPUTE_INSTANT_MERGE_BOUNDARIES, COMPUTE_RESERVE_MERGE_STARTS, getComputeAttentionLevel(), getComputeFlopsAttentionLevel(), getFoundryAttentionLevel() (+15 more)
=======
Cohesion: 0.09
Nodes (41): enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+33 more)
>>>>>>> main

### Community 68 - "navAttention.test.js"
<<<<<<< HEAD
Cohesion: 0.12
Nodes (17): seedState(), seedDataLakeSave(), allResourceIds(), createInitialGameState(), COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_BYTE_COMBINE_COST, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY (+9 more)
||||||| 9ad631f
Cohesion: 0.12
Nodes (18): AUTO_SPEED_UP_COST, BYTES_ID, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_BYTE_COMBINE_COST, INTRO_CONVERSION_UNLOCK_CAPACITY (+10 more)
=======
Cohesion: 0.11
Nodes (17): vitest, BYTES_ID, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_BYTE_COMBINE_COST, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY (+9 more)
>>>>>>> main

<<<<<<< HEAD
### Community 69 - "loadSavesMeta"
Cohesion: 0.23
Nodes (13): buildDefaultMeta(), coerceMeta(), completeDummySupporterPurchase(), defaultSlotName(), grantSupporterUnlock(), isSupporterUnlocked(), loadSavesMeta(), normalizeUnlockCode() (+5 more)
||||||| 9ad631f
### Community 69 - "run-simulation.mjs"
Cohesion: 0.08
Nodes (34): actPlayer(), actSoftResets(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+26 more)
=======
### Community 69 - "createInitialGameState"
Cohesion: 0.12
Nodes (21): seedState(), seedDataLakeSave(), allResourceIds(), applyFlopsAutobuyerMilestones(), buildEraIntroReset(), captureFoundryUpgradeCaps(), createEmptyDataLakes(), createEmptyDataLakeTier() (+13 more)
>>>>>>> main

<<<<<<< HEAD
### Community 70 - "styled-components"
Cohesion: 0.12
Nodes (19): react, styled-components, Actions, Body, Card, ConfirmDialog(), Overlay, Title (+11 more)
||||||| 9ad631f
### Community 70 - "ConfirmDialog/index.jsx"
Cohesion: 0.15
Nodes (12): Actions, Body, Card, ConfirmDialog(), Overlay, Title, Body, Card (+4 more)
=======
### Community 70 - "ConfirmDialog/index.jsx"
Cohesion: 0.11
Nodes (16): react, web-vitals, Actions, Body, Card, ConfirmDialog(), Overlay, Title (+8 more)
>>>>>>> main

### Community 71 - "DataLakePanel/index.jsx"
<<<<<<< HEAD
Cohesion: 0.08
Nodes (55): ActionButton, BareDivider, clampFraction(), DataLakePanel(), getVisibleLakeTierIndexes(), LakeActionsRow, LakeBlock, LakeHeaderRow (+47 more)
||||||| 9ad631f
Cohesion: 0.08
Nodes (53): ActionButton, BareDivider, clampFraction(), DataLakePanel(), getVisibleLakeTierIndexes(), LakeActionsRow, LakeBlock, LakeHeaderRow (+45 more)
=======
Cohesion: 0.09
Nodes (49): ActionButton, BareDivider, clampFraction(), DataLakePanel(), getVisibleLakeTierIndexes(), LakeActionsRow, LakeBlock, LakeHeaderRow (+41 more)
>>>>>>> main

<<<<<<< HEAD
### Community 72 - "getOverclockRequirement"
Cohesion: 0.24
Nodes (12): actSoftResets(), applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getOverclockRequirement(), getSpeedUpRequirement(), getTierTickspeedAutobuyerMilestone(), isEraEligible(), isUnboundedPrestigeUnlocked() (+4 more)
||||||| 9ad631f
### Community 72 - "AppNav/index.jsx"
Cohesion: 0.20
Nodes (9): APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem, pulseHigh (+1 more)
=======
### Community 72 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes
>>>>>>> main

### Community 73 - "clampNonNegative"
<<<<<<< HEAD
Cohesion: 0.20
Nodes (25): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyComputeAutoBoost(), buyHyperscaler(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus(), buySmartAutobuyer() (+17 more)
||||||| 9ad631f
Cohesion: 0.23
Nodes (20): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyComputeAutoBoost(), buyHyperscaler(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus(), buySmartAutobuyer() (+12 more)
=======
Cohesion: 0.13
Nodes (36): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyComputeAutoBoost(), buyComputeFlopsTier(), buyHyperscaler(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus() (+28 more)
>>>>>>> main

### Community 74 - "Testing"
Cohesion: 0.04
<<<<<<< HEAD
Nodes (57): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk (+49 more)

### Community 75 - "isTierUnlocked"
Cohesion: 0.24
Nodes (12): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), isGlobalTickspeedMultiplierUnlocked(), isTierUnlocked(), getTiersAttentionLevel(), hasAffordableFullLevel(), hasAffordableGlobalTickspeed(), hasOverclockAvailable() (+4 more)
||||||| 9ad631f
Nodes (54): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk (+46 more)
=======
Nodes (56): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever (+48 more)

### Community 75 - "pickIntroProductionMilestone"
Cohesion: 0.36
Nodes (9): applyIntroProductionDoublingToIntro(), getComputeBandwidthSacrificeField(), getComputeBandwidthSacrificeLabel(), getEffectiveComputeBandwidthSacrificeIndex(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), isBitFundedBandwidthAvailable(), isComputeFundedBandwidthAvailable() (+1 more)
>>>>>>> main

### Community 76 - "sentinel.md"
Cohesion: 0.33
Nodes (5): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs., 2026-08-29 - Prototype Pollution in Dev Mode Field Editing

### Community 77 - "palette.md"
Cohesion: 0.33
Nodes (5): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2026-09-04 - Focus Visible Styles for styled native summary elements, 2026-09-06 - Focus Visible Styles for custom interactive components and Disclosure summary elements

### Community 78 - "Design history & rationale"
Cohesion: 0.10
Nodes (21): Architecture / MainPage UI decisions, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale, Distribution (+13 more)

<<<<<<< HEAD
### Community 79 - "save-migration/index.js"
Cohesion: 0.36
Nodes (7): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()

### Community 80 - "tapPoolBuffer"
Cohesion: 0.29
Nodes (10): getDataStreamBaseMultiplierPercent(), getDataStreamFillFraction(), getFillMultiplierPercent(), getPoolBaseMultiplierPercent(), getPoolBufferBits(), getPoolBufferFillFraction(), getPoolMultiplierPercent(), getPoolTapBonusPercent() (+2 more)
||||||| 9ad631f
### Community 80 - "AppMenu/index.jsx"
Cohesion: 0.29
Nodes (6): AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle
=======
### Community 79 - "buyGlobalTickspeedMultiplier"
Cohesion: 0.32
Nodes (8): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), isGlobalTickspeedMultiplierUnlocked(), hasAffordableGlobalTickspeed(), hasOverclockAvailable(), hasSpeedUpAvailable(), hasTiersGameAttention(), lastTier()

### Community 80 - "isDevModeActive"
Cohesion: 0.53
Nodes (6): clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot(), isDevModeActive(), removeSlotStorage()
>>>>>>> main

### Community 81 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 83 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 85 - "ComputeFlopsPage/index.jsx"
<<<<<<< HEAD
Cohesion: 0.13
Nodes (22): Money, buyComputeFlopsTier(), canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight() (+14 more)

### Community 86 - "buyTickspeedMultiplier"
Cohesion: 0.48
Nodes (7): actTickspeed(), buyTickspeedMultiplier(), consumeXpForLastTierTickspeed(), getLastTierId(), getLastTierXpTickspeedMinConsumption(), getTickspeedMultiplierCost(), isLastTierTickspeedXpUnlocked()
||||||| 9ad631f
Cohesion: 0.09
Nodes (29): ButtonContent(), Money, buyComputeFlopsTier(), canBuyComputeFlopsTier(), flooredBitsLabel(), floorToDecimals(), formatAmount(), formatBitsInNearestSiUnit() (+21 more)
=======
Cohesion: 0.17
Nodes (11): ButtonContent(), Money, FlopsHero, Header, Hint, RootDiv, TierList, TierMeta (+3 more)
>>>>>>> main

### Community 87 - "MainPage"
<<<<<<< HEAD
Cohesion: 0.19
Nodes (20): formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier(), getLastTierXpTickspeedMultiplier() (+12 more)
||||||| 9ad631f
Cohesion: 0.16
Nodes (22): countGlobalTickspeedMilestones(), formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getAutoPrestigeAttemptRate(), getEffectiveTierTickSpeedSeconds() (+14 more)
=======
Cohesion: 0.12
Nodes (24): checkMilestones(), countGlobalTickspeedMilestones(), getAutoPrestigeAttemptRate(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier(), getLastTierXpTickspeedMultiplier(), getMoneyExponent(), getNextBytePowerProgressFraction() (+16 more)
>>>>>>> main

### Community 88 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 89 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 90 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

<<<<<<< HEAD
### Community 91 - "src/index.jsx"
Cohesion: 0.40
Nodes (3): web-vitals, rootElement, reportWebVitals()

### Community 96 - "engine.computeFlops.test.js"
Cohesion: 0.33
Nodes (5): AUTO_SPEED_UP_COST, BYTES_ID, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, PRESTIGE_THRESHOLD, TICK_RATE_MS

||||||| 9ad631f
### Community 91 - "react"
Cohesion: 0.33
Nodes (4): react, web-vitals, rootElement, reportWebVitals()

### Community 96 - "buyGlobalTickspeedMultiplier"
Cohesion: 0.67
Nodes (4): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), isGlobalTickspeedMultiplierUnlocked(), hasAffordableGlobalTickspeed()

=======
>>>>>>> main
### Community 99 - "Era ascension and Eons (#407)"
Cohesion: 0.25
Nodes (8): Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 100 - "Issue tracking for interactive sessions"
Cohesion: 0.67
Nodes (3): Cursor Cloud GitHub access, GitHub Milestones (release grouping), Issue tracking for interactive sessions

### Community 105 - "Tier production tickspeed"
Cohesion: 0.67
Nodes (3): Multiplier outcomes are floored, Production figure (tick-progress ring removed), Tier production tickspeed

## Knowledge Gaps
<<<<<<< HEAD
- **668 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+663 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 743 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
||||||| 9ad631f
- **664 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+659 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 739 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
=======
- **666 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+661 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 741 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
>>>>>>> main
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

<<<<<<< HEAD
- **Why does `styled-components` connect `styled-components` to `App.jsx`, `MainPage/index.jsx`, `navAttention.js`, `ByteFoundryPage/index.jsx`, `tokens.js`, `DataLakePanel/index.jsx`, `package.json`, `ComputePage/index.jsx`, `DevModePage/index.jsx`, `ComputeFlopsPage/index.jsx`, `MilestonesPage/index.jsx`, `SettingsPage/index.jsx`, `InfoPage/index.jsx`, `Button/index.jsx`, `DiskArrayRow/index.jsx`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
||||||| 9ad631f
- **Why does `styled-components` connect `styled-components` to `App.jsx`, `MainPage/index.jsx`, `ByteFoundryPage/index.jsx`, `ConfirmDialog/index.jsx`, `DataLakePanel/index.jsx`, `AppNav/index.jsx`, `AppMenu/index.jsx`, `package.json`, `ComputePage/index.jsx`, `DevModePage/index.jsx`, `ComputeFlopsPage/index.jsx`, `MilestonesPage/index.jsx`, `SettingsPage/index.jsx`, `InfoPage/index.jsx`, `Button/index.jsx`, `DiskArrayRow/index.jsx`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
=======
- **Why does `styled-components` connect `styled-components` to `App.jsx`, `MainPage/index.jsx`, `ByteFoundryPage/index.jsx`, `ConfirmDialog/index.jsx`, `DataLakePanel/index.jsx`, `package.json`, `ComputePage/index.jsx`, `DevModePage/index.jsx`, `ComputeFlopsPage/index.jsx`, `MilestonesPage/index.jsx`, `SettingsPage/index.jsx`, `InfoPage/index.jsx`, `Button/index.jsx`, `DiskArrayRow/index.jsx`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
>>>>>>> main
- **Why does `Design history & rationale` connect `Design history & rationale` to `README.md`, `Automation workflows`, `Testing`, `Economy model`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
<<<<<<< HEAD
- **Why does `vitest` connect `vitest` to `storage.test.js`, `layers.js`, `navAttention.test.js`, `engine.test.js`, `save-migration/index.js`, `package.json`, `App.test.jsx`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
||||||| 9ad631f
- **Why does `react` connect `react` to `App.jsx`, `MainPage/index.jsx`, `ByteFoundryPage/index.jsx`, `ConfirmDialog/index.jsx`, `package.json`, `engine.test.js`, `ComputePage/index.jsx`, `DevModePage/index.jsx`, `SettingsPage/index.jsx`, `Button/index.jsx`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
=======
- **Why does `react` connect `ConfirmDialog/index.jsx` to `App.jsx`, `MainPage/index.jsx`, `ByteFoundryPage/index.jsx`, `package.json`, `useIncrementalGame.js`, `ComputePage/index.jsx`, `DevModePage/index.jsx`, `SettingsPage/index.jsx`, `Button/index.jsx`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
>>>>>>> main
- **Are the 27 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 27 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
<<<<<<< HEAD
  _668 weakly-connected nodes found - possible documentation gaps or missing edges._
||||||| 9ad631f
  _664 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `storage.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08020344287949922 - nodes in this community are weakly interconnected._
=======
  _666 weakly-connected nodes found - possible documentation gaps or missing edges._
>>>>>>> main
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
<<<<<<< HEAD
  _Cohesion score 0.03508771929824561 - nodes in this community are weakly interconnected._
- **Should `layers.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05387205387205387 - nodes in this community are weakly interconnected._
||||||| 9ad631f
  _Cohesion score 0.03442622950819672 - nodes in this community are weakly interconnected._
=======
  _Cohesion score 0.03502824858757062 - nodes in this community are weakly interconnected._
- **Should `layers.js` be split into smaller, more focused modules?**
  _Cohesion score 0.052600818234950324 - nodes in this community are weakly interconnected._
>>>>>>> main
