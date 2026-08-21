# Graph Report - workspace  (2026-08-21)

## Corpus Check
- 76 files · ~249,278 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 975 nodes · 2145 edges · 74 communities (60 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 75 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4498e1c2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- navAttention.js
- MainPage/index.jsx
- layers.js
- engine.test.js
- App.jsx
- MilestonesPage/index.jsx
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
- formatCurrency
- dependencies
- ComputePage/index.jsx
- App.test.jsx
- getComputeBoostTierDurationSeconds
- isDiskFillAvailable
- Design history & rationale
- development
- storage.js
- InfoPage/index.jsx
- MainPage
- scripts
- DiskArrayRow/index.jsx
- Prestige Points, autobuyer unlock, and the tickspeed multiplier
- isDiskBuildAvailable
- ByteFoundryPage
- package.json
- clampNonNegative
- run-simulation.mjs
- getAutoPrestigeCost
- resolutions
- Tier production tickspeed
- Testing
- Money/index.js

## God Nodes (most connected - your core abstractions)
1. `Economy model` - 50 edges
2. `MainPage()` - 43 edges
3. `clampNonNegative()` - 42 edges
4. `useIncrementalGame()` - 41 edges
5. `tickGame()` - 37 edges
6. `isProductionFrozen()` - 32 edges
7. `ByteFoundryPage()` - 23 edges
8. `createInitialGameState()` - 17 edges
9. `getPurchaseBlockSize()` - 16 edges
10. `isDiskFillAvailable()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `simulateRun()` --calls--> `buyPrestigeSpeedBonus()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `buyTierQuantity()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `isProductionFrozen()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `tickGame()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `createInitialGameState()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (74 total, 14 thin omitted)

### Community 0 - "navAttention.js"
Cohesion: 0.08
Nodes (50): App(), enableAutoMerge(), getGlobalTickspeedMultiplierCost(), getOverclockRequirement(), getTierSpendableAmount(), isAutoClaimCoreUnlockAvailable(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable() (+42 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (54): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, CategoryHeading, CenteredCard, COMPUTE_BOOST_LABELS, Disclosure (+46 more)

### Community 2 - "layers.js"
Cohesion: 0.08
Nodes (33): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SPEED_UP_COST, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_FIELDS (+25 more)

### Community 3 - "engine.test.js"
Cohesion: 0.05
Nodes (17): getTickspeedMultiplierBaseCost(), getTickspeedMultiplierCost(), startComputeMergeReserve(), noOtherUpgradesLeft, unlockedLastTierState(), withOwned(), tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork() (+9 more)

### Community 4 - "App.jsx"
Cohesion: 0.05
Nodes (40): GATE_EXEMPT_PAGES, PageShell, AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle (+32 more)

### Community 5 - "MilestonesPage/index.jsx"
Cohesion: 0.07
Nodes (39): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+31 more)

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): jsdom, devDependencies, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom, @testing-library/react (+15 more)

### Community 7 - "Economy model"
Cohesion: 0.04
Nodes (50): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Economy model, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model (+42 more)

### Community 8 - "ByteFoundryPage/index.jsx"
Cohesion: 0.10
Nodes (23): floorToDecimals(), formatAmount(), formatBitsInNearestUnit(), formatMemoryAmount(), getMemoryUnit(), ActionsRow, BalanceText, FillableStatCard (+15 more)

### Community 9 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 10 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 15 - "engine.js"
Cohesion: 0.07
Nodes (48): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, claimComputeCore(), combineIntroByte(), currencyNumberFormatter, enableAutoClaimCore(), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork (+40 more)

### Community 17 - "Automation workflows"
Cohesion: 0.15
Nodes (13): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning, PR follow-up (`autonomous-pr-followup.yml`) — security reasoning (+5 more)

### Community 22 - "Changelog"
Cohesion: 0.08
Nodes (23): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+15 more)

### Community 23 - "Economy model reference"
Cohesion: 0.15
Nodes (13): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Game state shape, Key engine functions (`src/game/engine.js`), Offline progress, Overclock (+5 more)

### Community 24 - "CLAUDE.md"
Cohesion: 0.10
Nodes (19): Architecture, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, graphify (+11 more)

### Community 25 - "AGENTS.md"
Cohesion: 0.09
Nodes (21): Adding a new tier, Architecture, Automation design principles, Automation engines (Claude now, Cursor successor), Budget discipline, Byte Foundry, Changelog convention, Code review tooling (+13 more)

### Community 26 - "Tens"
Cohesion: 0.25
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes, Tens

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
Cohesion: 0.29
Nodes (6): Auto-merge (`pr-auto-merge.yml`), Automation workflows, Cursor-powered successor engine, Orchestration model, PR follow-up (`autonomous-pr-followup.yml`), Scheduled maintenance (`autonomous-maintenance.yml`)

### Community 33 - "Shared components reference"
Cohesion: 0.22
Nodes (8): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `DiskArrayRow/index.jsx`, `Money/index.js`, `OfflineProgressNotice/index.jsx`, Shared components reference, `StatCard/index.js`

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

### Community 39 - "getPurchaseBlockSize"
Cohesion: 0.13
Nodes (23): buyTier(), buyTierQuantity(), convertIntroBitsToKilobytes(), getCostEpochExponent(), getDiskBuildBaseSeconds(), getDiskBuildSeconds(), getFirstTierCost(), getMatchingTierForDiskSize() (+15 more)

### Community 48 - "formatCurrency"
Cohesion: 0.60
Nodes (5): formatCurrency(), formatMoneyBalance(), formatScientific(), RESOURCE_SYMBOL(), formatCost()

### Community 49 - "dependencies"
Cohesion: 0.13
Nodes (15): @fontsource/inter, @fontsource/space-grotesk, dependencies, @fontsource/inter, @fontsource/space-grotesk, react, react-dom, react-is (+7 more)

### Community 50 - "ComputePage/index.jsx"
Cohesion: 0.07
Nodes (31): canActivateComputeBoost(), canReclaimComputeBoost(), isComputeBoostTurnAvailable(), ActiveBoostRow, ArmedStatusText, AutoBadge, BoostRow, canMerge() (+23 more)

### Community 51 - "App.test.jsx"
Cohesion: 0.12
Nodes (15): ALL_TIER_IDS, AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_ENTITY_CAP, INTRO_BITS_PER_KILOBYTE_CONVERSION, INTRO_BYTE_COMBINE_COST, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, INTRO_CONVERSION_UNLOCK_CAPACITY (+7 more)

### Community 52 - "getComputeBoostTierDurationSeconds"
Cohesion: 0.31
Nodes (9): activateComputeBoost(), getComputeBoostMultiplier(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), getComputeBoostTierMultiplier(), isValidComputeBoostTier(), reclaimComputeBoost(), stackComputeBoost() (+1 more)

### Community 53 - "isDiskFillAvailable"
Cohesion: 0.31
Nodes (11): canStackComputeBoost(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), isBandwidthAvailable(), isBandwidthTurnAvailable(), isComputeUpgradeAvailable(), isDiskFillAvailable(), isMemoryCapacityUpgradeAvailable() (+3 more)

### Community 54 - "Design history & rationale"
Cohesion: 0.29
Nodes (7): Architecture / MainPage UI decisions, Design history & rationale, Distribution, Documentation, Testing, Why a PWA instead of Capacitor/native app-store distribution, Why semver/changelog started at v0.5.0, not v0.1.0-from-inception

### Community 55 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 57 - "storage.js"
Cohesion: 0.22
Nodes (13): COMPUTE_CORES_PER_NODE, DEFAULT_PURCHASE_BLOCK_SIZE, MONEY_ID, clearGameState(), LEGACY_REMOVED_TIER_IDS, LEGACY_TIER_ID_MAP, loadGameState(), loadLastSaveTimestamp() (+5 more)

### Community 58 - "InfoPage/index.jsx"
Cohesion: 0.13
Nodes (14): COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_MERGE_DURATIONS_SECONDS, COMPUTE_MERGE_RATIO, COMPUTE_MERGE_RESERVE_CAP, DISK_BUILD_COST_MULTIPLIER, INTRO_CAPACITY_MULTIPLIER (+6 more)

### Community 59 - "MainPage"
Cohesion: 0.20
Nodes (15): countGlobalTickspeedMilestones(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier(), getLastTierXpTickspeedMultiplier(), getOverclockMultiplier(), getPrestigeProgressPercent(), getTickspeedProductionMultiplier(), getTierProductionProgressPercent() (+7 more)

### Community 60 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, audit, build, dev, gen-pwa-icons, start, test, test:e2e (+1 more)

### Community 61 - "DiskArrayRow/index.jsx"
Cohesion: 0.11
Nodes (21): CacheBlock, CacheBlocksRow, DiskArrayRow(), DiskSizeRow, DiskSquare, RebuildingText, RowLabel, SquaresRow (+13 more)

### Community 62 - "Prestige Points, autobuyer unlock, and the tickspeed multiplier"
Cohesion: 0.25
Nodes (8): Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 63 - "isDiskBuildAvailable"
Cohesion: 0.60
Nodes (5): getDiskCost(), getDiskSize(), isDiskBuildAvailable(), isDiskBuildTurnAvailable(), startDiskBuild()

### Community 64 - "ByteFoundryPage"
Cohesion: 0.32
Nodes (8): getIntroKilobyteConversionCost(), getIntroProductionRate(), isComputeCoreClaimAvailable(), isComputeCoreConversionUnlocked(), isIntroConversionUnlocked(), isTransferBlockAffordable(), ByteFoundryPage(), clampPercent()

### Community 65 - "package.json"
Cohesion: 0.33
Nodes (5): name, packageManager, private, type, version

### Community 66 - "clampNonNegative"
Cohesion: 0.17
Nodes (28): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyGlobalTickspeedMultiplier(), buyPrestigeSpeedBonus(), buySmartAutobuyer(), buyTickspeedAutobuyer(), buyTickspeedMultiplier() (+20 more)

### Community 67 - "run-simulation.mjs"
Cohesion: 0.19
Nodes (12): cliValues, defaultPPValues, simulateRun(), allResourceIds(), applyOfflineProgress(), createInitialGameState(), getOfflineEffectiveSeconds(), getSpeedUpRequirement() (+4 more)

### Community 68 - "getAutoPrestigeCost"
Cohesion: 0.50
Nodes (4): getAutobuyerUnlockCost(), getAutoPrestigeCost(), getSmartAutobuyerCost(), hasAffordablePpUpgrade()

### Community 69 - "resolutions"
Cohesion: 0.40
Nodes (5): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid

### Community 71 - "Tier production tickspeed"
Cohesion: 0.67
Nodes (3): Multiplier outcomes are floored, Production figure (tick-progress ring removed), Tier production tickspeed

## Knowledge Gaps
- **446 isolated node(s):** `session-start.sh script`, `defaultPPValues`, `cliValues`, `seededState`, `baseUrl` (+441 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 20 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 20 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `defaultPPValues`, `cliValues` to the rest of the system?**
  _446 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `navAttention.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07607843137254902 - nodes in this community are weakly interconnected._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.03571428571428571 - nodes in this community are weakly interconnected._