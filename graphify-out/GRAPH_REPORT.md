# Graph Report - wt-447  (2026-08-25)

## Corpus Check
- 99 files · ~303,398 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1353 nodes · 3388 edges · 96 communities (79 shown, 17 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 82 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a30c1091`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- navAttention.js
- MainPage/index.jsx
- layers.js
- tickComputeMergeBoundary
- App.jsx
- SettingsPage/index.jsx
- devDependencies
- Economy model
- run-simulation.mjs
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
- tickGame
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- Copilot Instructions
- graphify
- extraction-spec.md
- MAINPAGE_REFERENCE.md
- PWA_REFERENCE.md
- THEMING_REFERENCE.md
- clampNonNegative
- dependencies
- ComputePage/index.jsx
- MilestonesPage/index.jsx
- DevModePage/index.jsx
- ComputePage
- Design history & rationale
- development
- storage.js
- Button/index.jsx
- isAutoMergeUnlockAvailable
- scripts
- DiskArrayRow/index.jsx
- Era ascension and Eons (#407)
- actFoundry
- App.test.jsx
- package.json
- engine.test.js
- isDiskRedeemable
- DataLakePanel/index.jsx
- ComputeFlopsPage/index.jsx
- save-migration/index.js
- Tier production tickspeed
- canDepositDiskToDataLake
- InfoPage/index.jsx
- Testing
- isComputeMergeReserveStartAvailable
- sentinel.md
- startDiskBuild
- StatCard/index.js
- OfflineProgressNotice/index.jsx
- ConfirmDialog/index.jsx
- backlog-issue-hygiene.sh
- formatCurrency
- epic-407-issue-hygiene.sh
- getIntroProductionRate
- createEmptyDataLakes
- getComputeBoostTierMultiplier
- eraEligibleState
- sync-release-milestones.sh
- adversarialReviewMarker.js
- Issue tracking for interactive sessions
- publish-strategy.sh
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- pr-low-risk-eligible.test.js

## God Nodes (most connected - your core abstractions)
1. `clampNonNegative()` - 71 edges
2. `useIncrementalGame()` - 68 edges
3. `Economy model` - 55 edges
4. `MainPage()` - 49 edges
5. `tickGame()` - 47 edges
6. `isProductionFrozen()` - 36 edges
7. `ByteFoundryPage()` - 28 edges
8. `createInitialGameState()` - 24 edges
9. `ComputePage()` - 24 edges
10. `formatAmount()` - 22 edges

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

## Communities (96 total, 17 thin omitted)

### Community 0 - "navAttention.js"
Cohesion: 0.05
Nodes (91): applyIntroProductionDoublingToIntro(), buyGlobalTickspeedMultiplier(), canActivateComputeBoost(), canStackComputeBoost(), floorToDecimals(), formatBitsInNearestUnit(), formatMemoryAmount(), getAutobuyerUnlockCost() (+83 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (60): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments, CategoryHeading (+52 more)

### Community 2 - "layers.js"
Cohesion: 0.05
Nodes (50): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_BOOST_TIER_FIELDS (+42 more)

### Community 3 - "tickComputeMergeBoundary"
Cohesion: 0.15
Nodes (14): getComputeMergeDurationSeconds(), startComputeMergeReserve(), startComputeMergeReserveAtBoundary(), tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer(), tickAutoMergeFabricsIntoCloud() (+6 more)

### Community 4 - "App.jsx"
Cohesion: 0.05
Nodes (45): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon, MenuButton (+37 more)

### Community 5 - "SettingsPage/index.jsx"
Cohesion: 0.11
Nodes (21): buildEraIntroReset(), eraGame(), getEonsAwarded(), isEraEligible(), MUSEUM_PIN_CAP, buildSparklinePath(), CodeForm, CodeInput (+13 more)

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): jsdom, devDependencies, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom, @testing-library/react (+15 more)

### Community 7 - "Economy model"
Cohesion: 0.04
Nodes (55): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+47 more)

### Community 8 - "run-simulation.mjs"
Cohesion: 0.11
Nodes (28): actMainBuys(), actPlayer(), actSoftResets(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+20 more)

### Community 9 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 10 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 15 - "engine.js"
Cohesion: 0.06
Nodes (74): applyOfflineProgress(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyComputeAutoBoost(), buyComputeFlopsTier() (+66 more)

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

### Community 39 - "tickGame"
Cohesion: 0.20
Nodes (22): actTickspeed(), wouldAutobuyerStall(), buyTickspeedMultiplier(), buyTier(), buyTierQuantity(), consumeXpForLastTierTickspeed(), getLastTierId(), getLastTierXpTickspeedMinConsumption() (+14 more)

### Community 48 - "clampNonNegative"
Cohesion: 0.13
Nodes (31): checkMilestones(), clampNonNegative(), countGlobalTickspeedMilestones(), getAutoPrestigeAttemptRate(), getAutoPrestigeCost(), getCostEpochExponent(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier() (+23 more)

### Community 49 - "dependencies"
Cohesion: 0.13
Nodes (15): @fontsource/inter, @fontsource/space-grotesk, dependencies, @fontsource/inter, @fontsource/space-grotesk, react, react-dom, react-is (+7 more)

### Community 50 - "ComputePage/index.jsx"
Cohesion: 0.07
Nodes (29): COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_MERGE_RESERVE_CAP, ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostRow, CompactButton (+21 more)

### Community 51 - "MilestonesPage/index.jsx"
Cohesion: 0.15
Nodes (12): applyFlopsAutobuyerMilestones(), getFlopsAutobuyerUnlockEra(), ERA_ELIGIBILITY_PP, Badge, Category, CategoryHeading, Header, List (+4 more)

### Community 52 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (23): COMPUTE_FLOPS_TIER_DEFINITIONS, TIER_DEFINITIONS, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode() (+15 more)

### Community 53 - "ComputePage"
Cohesion: 0.25
Nodes (9): canForfeitComputeBoost(), canPurchaseBoosterFromDataLake(), canReclaimComputeBoost(), getDataLakeAvailableUnits(), getNextComputeMergeDurationUpgradeIndex(), isUpgradeComputeMergeDurationAvailable(), canMerge(), ComputePage() (+1 more)

### Community 54 - "Design history & rationale"
Cohesion: 0.22
Nodes (9): Architecture / MainPage UI decisions, Design history & rationale, Distribution, Documentation, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Sacrifice confirm: in-game dialog; Core warning only when unlocked, Save persistence, Why a PWA instead of Capacitor/native app-store distribution (+1 more)

### Community 55 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 57 - "storage.js"
Cohesion: 0.12
Nodes (48): PRESTIGE_UNBOUNDED_MIN_COUNT, applyDevGameStateJson(), buildClearSlotConfirmMessage(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), buildResetActiveSlotConfirmMessage(), buildResetByteFoundryConfirmMessage(), clearAllSaveProgress() (+40 more)

### Community 58 - "Button/index.jsx"
Cohesion: 0.21
Nodes (12): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+4 more)

### Community 59 - "isAutoMergeUnlockAvailable"
Cohesion: 0.18
Nodes (11): enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+3 more)

### Community 60 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, audit, build, dev, gen-pwa-icons, start, test, test:e2e (+1 more)

### Community 61 - "DiskArrayRow/index.jsx"
Cohesion: 0.08
Nodes (34): CacheBlock, CacheBlocksRow, CacheFlushFill, CellLabel, DepositRow, DiskArrayRow(), DiskSizeRow, DiskSquare (+26 more)

### Community 62 - "Era ascension and Eons (#407)"
Cohesion: 0.25
Nodes (8): Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 63 - "actFoundry"
Cohesion: 0.19
Nodes (14): actFoundry(), activateComputeBoost(), convertIntroBitsToKilobytes(), eraseAllComputeTokens(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), isValidComputeBoostTier(), pickIntroCapacityMilestone() (+6 more)

### Community 64 - "App.test.jsx"
Cohesion: 0.08
Nodes (25): seedDataLakeSave(), ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, COMPUTE_BOOST_PRESETS, COMPUTE_CORES_PER_NODE, COMPUTE_MERGE_RATIO (+17 more)

### Community 65 - "package.json"
Cohesion: 0.18
Nodes (10): name, packageManager, private, resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid (+2 more)

### Community 66 - "engine.test.js"
Cohesion: 0.06
Nodes (5): clearIntroCapacityUpgradeQueue(), isAnyComputeMergeInFlight(), noOtherUpgradesLeft, unlockedLastTierState(), withOwned()

### Community 67 - "isDiskRedeemable"
Cohesion: 0.23
Nodes (14): getMatchingTierForDiskSize(), getTierDiskRedeemCost(), hasFullRedeemableDiskAtSize(), isDiskAutoRedeemEligible(), isDiskCacheBlockAutoReleaseEligible(), isDiskCacheBlockManualReleaseAvailable(), isDiskCacheBlockReleasable(), isDiskManualRedeemAvailable() (+6 more)

### Community 68 - "DataLakePanel/index.jsx"
Cohesion: 0.20
Nodes (9): LakeList, LakeName, LakeRow, LakeStats, getBoosterPurchaseTotalCost(), getMaxBoosterPurchasesForCapacity(), COMPUTE_TIER_LABELS, DATA_LAKE_CAPACITY (+1 more)

### Community 69 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.09
Nodes (28): Money, formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierProductionMultiplier(), getComputeFlopsTierWeight(), getComputeFlopsTotal(), getHyperscalerFlopsBoostRate() (+20 more)

### Community 70 - "save-migration/index.js"
Cohesion: 0.36
Nodes (7): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()

### Community 71 - "Tier production tickspeed"
Cohesion: 0.67
Nodes (3): Multiplier outcomes are floored, Production figure (tick-progress ring removed), Tier production tickspeed

### Community 72 - "canDepositDiskToDataLake"
Cohesion: 0.36
Nodes (10): DataLakePanel(), getVisibleLakeTierIndexes(), canDepositDiskToDataLake(), decomposeDataLakeDeposits(), getBoosterPurchaseCost(), getDataLakeDepositedUnits(), getDataLakeTier(), isDiskArrayFullyBuilt() (+2 more)

### Community 73 - "InfoPage/index.jsx"
Cohesion: 0.12
Nodes (15): COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, DATA_LAKE_SLOT_MAX, DISK_BUILD_COST_MULTIPLIER (+7 more)

### Community 74 - "Testing"
Cohesion: 0.22
Nodes (9): Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake refill gating: staged 9 → 99 → 999 capacity from disk-array completion, Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382), Disk ladder offers every Byte power-of-ten size (issue #368), Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Removing Claim Core: superseded by Data Lake Boosters, Testing (+1 more)

### Community 75 - "isComputeMergeReserveStartAvailable"
Cohesion: 0.20
Nodes (10): isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable(), isComputeFabricsMergeStartAvailable(), isComputeGridsMergeStartAvailable(), isComputeMergeReserveStartAvailable(), isComputeNetworksMergeStartAvailable() (+2 more)

### Community 77 - "startDiskBuild"
Cohesion: 0.13
Nodes (17): canStartDiskWriteCacheMerge(), combineIntroByte(), decrementFullDiskCount(), depositDiskToDataLake(), getDataLakeSubSize(), getDataLakeTierIndex(), getDiskBuildBaseSeconds(), getDiskBuildSeconds() (+9 more)

### Community 78 - "StatCard/index.js"
Cohesion: 0.29
Nodes (6): Body, Card, IncompatibleSaveNotice(), Overlay, Title, StatCard

### Community 79 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.33
Nodes (6): VisuallyHidden, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), formatOfflineDuration()

### Community 80 - "ConfirmDialog/index.jsx"
Cohesion: 0.29
Nodes (6): Actions, Body, Card, ConfirmDialog(), Overlay, Title

### Community 81 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 82 - "formatCurrency"
Cohesion: 0.60
Nodes (6): formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), RESOURCE_SYMBOL(), formatCost()

### Community 83 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 84 - "getIntroProductionRate"
Cohesion: 0.50
Nodes (4): getCoreEarnTimeSeconds(), getDiskReadCacheFlushSeconds(), getIntroProductionRate(), tickDiskAutoFill()

### Community 85 - "createEmptyDataLakes"
Cohesion: 0.67
Nodes (3): createEmptyDataLakes(), createEmptyDataLakeTier(), mergeDataLakes()

### Community 86 - "getComputeBoostTierMultiplier"
Cohesion: 0.67
Nodes (3): getComputeBoostMultiplier(), getComputeBoostTierMultiplier(), tickIntroProduction()

### Community 87 - "eraEligibleState"
Cohesion: 0.67
Nodes (3): eraEligibleState(), withIntro(), withPrestigePoints()

### Community 88 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 89 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 91 - "Issue tracking for interactive sessions"
Cohesion: 0.67
Nodes (3): Cursor Cloud GitHub access, GitHub Milestones (release grouping), Issue tracking for interactive sessions

## Knowledge Gaps
- **542 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+537 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `Design history & rationale` to `Automation workflows`, `Tens`, `Testing`, `Economy model`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 25 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 25 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _542 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `navAttention.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05049088359046283 - nodes in this community are weakly interconnected._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.033844526705446853 - nodes in this community are weakly interconnected._