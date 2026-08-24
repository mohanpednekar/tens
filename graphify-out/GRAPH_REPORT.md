# Graph Report - tens  (2026-08-24)

## Corpus Check
- 97 files · ~294,126 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1328 nodes · 3321 edges · 94 communities (77 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f04b4c46`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- hasFoundryAttention
- MainPage/index.jsx
- layers.js
- navAttention.js
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
- engine.test.js
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
- getPurchaseBlockSize
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
- activateComputeBoost
- ByteFoundryPage
- Design history & rationale
- development
- useIncrementalGame
- Button/index.jsx
- engine.js
- scripts
- DiskArrayRow/index.jsx
- Era ascension and Eons (#407)
- startDiskBuild
- App.test.jsx
- package.json
- clampNonNegative
- isProductionFrozen
- run-simulation.mjs
- ComputeFlopsPage/index.jsx
- layers.test.js
- Tier production tickspeed
- ConfirmDialog/index.jsx
- InfoPage/index.jsx
- OfflineProgressNotice/index.jsx
- getDiskSizesToShow
- actFoundry
- DevModePage/index.jsx
- getIntroProductionRate
- navAttention.test.js
- getOverclockRequirement
- backlog-issue-hygiene.sh
- AppNav/index.jsx
- epic-407-issue-hygiene.sh
- sync-release-milestones.sh
- engine.computeFlops.test.js
- adversarialReviewMarker.js
- Issue tracking for interactive sessions
- publish-strategy.sh
- INTRO_COMPUTE_CORE_UNLOCK_CAPACITY
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- pr-low-risk-eligible.test.js

## God Nodes (most connected - your core abstractions)
1. `clampNonNegative()` - 71 edges
2. `useIncrementalGame()` - 70 edges
3. `Economy model` - 54 edges
4. `MainPage()` - 49 edges
5. `tickGame()` - 48 edges
6. `isProductionFrozen()` - 36 edges
7. `ByteFoundryPage()` - 27 edges
8. `createInitialGameState()` - 24 edges
9. `ComputePage()` - 24 edges
10. `formatAmount()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `seedDataLakeSave()` --calls--> `createInitialGameState()`  [EXTRACTED]
  e2e/data-lake.e2e.js → src/game/engine.js
- `actFoundry()` --calls--> `activateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `canActivateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `combineIntroByte()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `convertIntroBitsToKilobytes()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (94 total, 17 thin omitted)

### Community 0 - "hasFoundryAttention"
Cohesion: 0.38
Nodes (7): getIntroKilobyteConversionCost(), isIntroConversionUnlocked(), getFoundryAttentionLevel(), hasFoundryAttention(), isCombineAvailable(), isMemoryFull(), isTransferBlockAffordable()

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (60): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments, CategoryHeading (+52 more)

### Community 2 - "layers.js"
Cohesion: 0.07
Nodes (26): AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_MERGE_BOUNDARIES, DATA_LAKE_MAX_DISK_LADDER_STEP, DATA_LAKE_SUB_SIZES, FLOPS_AUTOBUYER_ERA_START, FLOPS_AUTOBUYER_ERA_STEP (+18 more)

### Community 3 - "navAttention.js"
Cohesion: 0.15
Nodes (23): enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+15 more)

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
Cohesion: 0.10
Nodes (23): floorToDecimals(), formatBitsInNearestUnit(), formatMemoryAmount(), getMemoryUnit(), COMPUTE_ENTITY_CAP, ActionsRow, BalanceText, FillableStatCard (+15 more)

### Community 9 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 10 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 15 - "engine.test.js"
Cohesion: 0.03
Nodes (59): applyOfflineProgress(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyComputeAutoBoost(), buyTickspeedAutobuyer(), enableAutoClaimCore(), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork (+51 more)

### Community 17 - "Automation workflows"
Cohesion: 0.15
Nodes (13): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning, PR follow-up (`autonomous-pr-followup.yml`) — security reasoning (+5 more)

### Community 22 - "[Unreleased]"
Cohesion: 0.07
Nodes (29): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+21 more)

### Community 23 - "Economy model reference"
Cohesion: 0.13
Nodes (15): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Game state shape, Key engine functions (`src/game/engine.js`), Offline progress, Overclock (+7 more)

### Community 24 - "CLAUDE.md"
Cohesion: 0.09
Nodes (21): Architecture, Automation workflows, Changelog convention, Commands, Dev Mode, Documentation, Economy model, End-to-end testing (+13 more)

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

### Community 39 - "getPurchaseBlockSize"
Cohesion: 0.19
Nodes (16): actTickspeed(), buyTickspeedMultiplier(), buyTier(), consumeXpForLastTierTickspeed(), convertIntroBitsToKilobytes(), getLastTierId(), getLastTierXpTickspeedMinConsumption(), getPurchaseBlockSize() (+8 more)

### Community 48 - "MainPage"
Cohesion: 0.23
Nodes (16): countGlobalTickspeedMilestones(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier(), getLastTierXpTickspeedMultiplier() (+8 more)

### Community 49 - "dependencies"
Cohesion: 0.13
Nodes (15): @fontsource/inter, @fontsource/space-grotesk, dependencies, @fontsource/inter, @fontsource/space-grotesk, react, react-dom, react-is (+7 more)

### Community 50 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (56): DataLakePanel(), getVisibleLakeTierIndexes(), LakeList, LakeName, LakeRow, LakeStats, canActivateComputeBoost(), canForfeitComputeBoost() (+48 more)

### Community 51 - "MilestonesPage/index.jsx"
Cohesion: 0.14
Nodes (13): getFlopsAutobuyerUnlockEra(), COMPUTE_FLOPS_TIER_DEFINITIONS, ERA_ELIGIBILITY_PP, TIER_DEFINITIONS, Badge, Category, CategoryHeading, Header (+5 more)

### Community 52 - "activateComputeBoost"
Cohesion: 0.21
Nodes (13): activateComputeBoost(), canStackComputeBoost(), getBiggestComputeTierWaitingOnMerge(), getComputeBoostMultiplier(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), getComputeBoostTierMultiplier(), isComputeUpgradeAvailable() (+5 more)

### Community 53 - "ByteFoundryPage"
Cohesion: 0.27
Nodes (15): applyIntroProductionDoublingToIntro(), getComputeBandwidthSacrificeField(), getComputeBandwidthSacrificeLabel(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), isBandwidthAvailable(), isBandwidthTurnAvailable(), isBitFundedBandwidthAvailable() (+7 more)

### Community 54 - "Design history & rationale"
Cohesion: 0.14
Nodes (14): Architecture / MainPage UI decisions, Design history & rationale, Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382), Disk ladder offers every Byte power-of-ten size (issue #368), Distribution, Documentation, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Migration in `src/save-migration/`, runs on every load — 2026-08-22 (+6 more)

### Community 55 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 57 - "useIncrementalGame"
Cohesion: 0.06
Nodes (77): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon, MenuButton (+69 more)

### Community 58 - "Button/index.jsx"
Cohesion: 0.21
Nodes (12): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+4 more)

### Community 59 - "engine.js"
Cohesion: 0.05
Nodes (57): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, buyHyperscaler(), canBuyHyperscaler(), canStartDiskWriteCacheMerge(), captureFoundryUpgradeCaps(), clearIntroCapacityUpgradeQueue(), COMPUTE_MERGE_TIMER_FIELDS (+49 more)

### Community 60 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, audit, build, dev, gen-pwa-icons, start, test, test:e2e (+1 more)

### Community 61 - "DiskArrayRow/index.jsx"
Cohesion: 0.08
Nodes (42): CacheBlock, CacheBlocksRow, CacheFlushFill, CellLabel, DepositRow, DiskArrayRow(), DiskSizeRow, DiskSquare (+34 more)

### Community 62 - "Era ascension and Eons (#407)"
Cohesion: 0.25
Nodes (8): Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 63 - "startDiskBuild"
Cohesion: 0.21
Nodes (13): canDepositDiskToDataLake(), combineIntroByte(), depositDiskToDataLake(), getDataLakeSubSize(), getDataLakeTierIndex(), getDiskCost(), getDiskLadderSizeBits(), getDiskLadderStep() (+5 more)

### Community 64 - "App.test.jsx"
Cohesion: 0.12
Nodes (12): ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_CORES_PER_NODE (+4 more)

### Community 65 - "package.json"
Cohesion: 0.18
Nodes (10): name, packageManager, private, resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid (+2 more)

### Community 66 - "clampNonNegative"
Cohesion: 0.18
Nodes (23): buyAutoPrestige(), buyPrestigeDoublePp(), checkMilestones(), clampNonNegative(), getAutoPrestigeAttemptRate(), getAutoPrestigeCost(), getComputeFlopsTierProductionMultiplier(), getHyperscalerFlopsBoostRate() (+15 more)

### Community 67 - "isProductionFrozen"
Cohesion: 0.26
Nodes (14): buyGlobalTickspeedMultiplier(), buySmartAutobuyer(), getGlobalTickspeedMultiplierCost(), getSmartAutobuyerCost(), isGlobalTickspeedMultiplierUnlocked(), isProductionFrozen(), isTierUnlocked(), hasAffordableFullLevel() (+6 more)

### Community 68 - "run-simulation.mjs"
Cohesion: 0.11
Nodes (25): actMainBuys(), actPlayer(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+17 more)

### Community 69 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.13
Nodes (22): Money, buyComputeFlopsTier(), canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight() (+14 more)

### Community 70 - "layers.test.js"
Cohesion: 0.11
Nodes (17): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, COMPUTE_BOOST_TIER_FIELDS, DATA_LAKE_CAPACITY, DATA_LAKE_TIER_COUNT, DATA_LAKE_TIER_LABELS, OVERCLOCK_MULTIPLIER_STEP (+9 more)

### Community 71 - "Tier production tickspeed"
Cohesion: 0.67
Nodes (3): Multiplier outcomes are floored, Production figure (tick-progress ring removed), Tier production tickspeed

### Community 72 - "ConfirmDialog/index.jsx"
Cohesion: 0.15
Nodes (12): Actions, Body, Card, ConfirmDialog(), Overlay, Title, Body, Card (+4 more)

### Community 73 - "InfoPage/index.jsx"
Cohesion: 0.13
Nodes (14): COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, COMPUTE_MERGE_RESERVE_CAP, COMPUTE_MERGE_STEP_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, EON_AMPLIFIER_AWARD_PER_LEVEL (+6 more)

### Community 74 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.33
Nodes (6): VisuallyHidden, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), formatOfflineDuration()

### Community 75 - "getDiskSizesToShow"
Cohesion: 0.28
Nodes (8): getDiskSizesToShow(), isStorageUnlocked(), getStorageAttentionLevel(), hasStorageAttention(), Header, RootDiv, StoragePage(), Title

### Community 76 - "actFoundry"
Cohesion: 0.23
Nodes (13): actFoundry(), claimComputeCore(), eraseAllComputeTokens(), isComputeCoreClaimAvailable(), isComputeCoreConversionUnlocked(), mintComputeCoreIfReady(), pickIntroCapacityMilestone(), queueIntroCapacityUpgrade() (+5 more)

### Community 77 - "DevModePage/index.jsx"
Cohesion: 0.15
Nodes (13): ButtonGrid, DevModePage(), FieldLabel, FieldRow, Header, JsonTextarea, NumberInput, PRESETS (+5 more)

### Community 78 - "getIntroProductionRate"
Cohesion: 0.40
Nodes (5): getCoreEarnTimeSeconds(), getDiskReadCacheFlushSeconds(), getIntroProductionRate(), tapIntroBit(), tickDiskAutoFill()

### Community 79 - "navAttention.test.js"
Cohesion: 0.18
Nodes (10): COMPUTE_MERGE_RATIO, INTRO_BYTE_COMBINE_COST, INTRO_DISK_UNLOCK_CAPACITY, INTRO_STARTING_CAPACITY, MONEY_ID, TICKSPEED_AUTOBUYER_COST, ATTENTION_NORMAL, computeBoostReadyIntro (+2 more)

### Community 80 - "getOverclockRequirement"
Cohesion: 0.29
Nodes (10): actSoftResets(), getAutobuyerUnlockMilestone(), getOverclockRequirement(), getSpeedUpRequirement(), getTierTickspeedAutobuyerMilestone(), isEraEligible(), overclockGame(), speedUpGame() (+2 more)

### Community 81 - "backlog-issue-hygiene.sh"
Cohesion: 0.47
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing(), backlog-issue-hygiene.sh script

### Community 82 - "AppNav/index.jsx"
Cohesion: 0.20
Nodes (9): APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem, pulseHigh (+1 more)

### Community 83 - "epic-407-issue-hygiene.sh"
Cohesion: 0.50
Nodes (7): add_label_if_missing(), close_if_open(), has_marker_comment(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 84 - "sync-release-milestones.sh"
Cohesion: 0.60
Nodes (4): assign_milestone(), ensure_milestone(), run(), sync-release-milestones.sh script

### Community 85 - "engine.computeFlops.test.js"
Cohesion: 0.33
Nodes (5): AUTO_SPEED_UP_COST, BYTES_ID, COMPUTE_FLOPS_REVEAL_PP, PRESTIGE_THRESHOLD, TICK_RATE_MS

### Community 86 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 87 - "Issue tracking for interactive sessions"
Cohesion: 0.67
Nodes (3): Cursor Cloud GitHub access, GitHub Milestones (release grouping), Issue tracking for interactive sessions

## Knowledge Gaps
- **530 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+525 more)
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
- **Are the 27 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 27 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _530 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.033844526705446853 - nodes in this community are weakly interconnected._
- **Should `layers.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._