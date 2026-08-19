# Graph Report - tens  (2026-08-19)

## Corpus Check
- 68 files · ~221,648 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 842 nodes · 1706 edges · 66 communities (51 shown, 15 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bc0f1ba1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- engine.test.js
- MainPage/index.jsx
- engine.js
- ByteFoundryPage
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
- useIncrementalGame.js
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
- formatOfflineDuration
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- Copilot Instructions
- graphify
- extraction-spec.md
- MAINPAGE_REFERENCE.md
- PWA_REFERENCE.md
- THEMING_REFERENCE.md
- useIncrementalGame
- dependencies
- ComputePage/index.jsx
- storage.js
- MainPage
- package.json
- Design history & rationale
- development
- StoragePage/index.jsx
- clampNonNegative
- scripts
- isComputeCoreConversionUnlocked
- formatAmount
- tickGame
- enableAutoClaimCore
- getIntroProductionRate
- getOverclockRequirement

## God Nodes (most connected - your core abstractions)
1. `Economy model` - 47 edges
2. `clampNonNegative()` - 41 edges
3. `MainPage()` - 41 edges
4. `useIncrementalGame()` - 40 edges
5. `tickGame()` - 37 edges
6. `ByteFoundryPage()` - 24 edges
7. `isProductionFrozen()` - 20 edges
8. `createInitialGameState()` - 15 edges
9. `Economy model reference` - 15 edges
10. `getPurchaseBlockSize()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `simulateRun()` --calls--> `buyTierQuantity()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `createInitialGameState()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `tickGame()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `buyPrestigeSpeedBonus()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `getSpeedUpRequirement()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (66 total, 15 thin omitted)

### Community 0 - "engine.test.js"
Cohesion: 0.05
Nodes (11): noOtherUpgradesLeft, unlockedLastTierState(), withOwned(), tickAutoMergeCloudsIntoDatacenter, tickAutoMergeClustersIntoNetwork, tickAutoMergeDatacentersIntoSupercomputer, tickAutoMergeFabricsIntoCloud, tickAutoMergeGridsIntoFabric (+3 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (56): Money, BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, CategoryHeading, CenteredCard, COMPUTE_BOOST_LABELS (+48 more)

### Community 2 - "engine.js"
Cohesion: 0.05
Nodes (82): version, ALL_TIER_IDS, AUTO_MERGE_TICKERS, currencyNumberFormatter, enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable() (+74 more)

### Community 3 - "ByteFoundryPage"
Cohesion: 0.18
Nodes (22): buildStorageBank(), canActivateComputeBoost(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), getStorageBankCost(), getStorageBankSize(), isBandwidthAvailable(), isBandwidthTurnAvailable() (+14 more)

### Community 4 - "App.jsx"
Cohesion: 0.09
Nodes (24): App(), rootElement, reportWebVitals(), AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb() (+16 more)

### Community 5 - "Button/index.jsx"
Cohesion: 0.15
Nodes (16): Button, ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, progressFill() (+8 more)

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): jsdom, devDependencies, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom, @testing-library/react (+15 more)

### Community 7 - "Economy model"
Cohesion: 0.04
Nodes (47): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Economy model, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price (+39 more)

### Community 8 - "ByteFoundryPage/index.jsx"
Cohesion: 0.09
Nodes (24): floorToDecimals(), formatBitsInNearestUnit(), formatMemoryAmount(), getMemoryUnit(), ActionsRow, BalanceText, FillableStatCard, formatMemoryBalance() (+16 more)

### Community 9 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 10 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 15 - "useIncrementalGame.js"
Cohesion: 0.12
Nodes (19): applyOfflineProgress(), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric, enableAutoMergeNetworksIntoGrid, enableAutoMergeNodesIntoCluster (+11 more)

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
Cohesion: 0.33
Nodes (5): `Button/index.jsx`, `Money/index.js`, `OfflineProgressNotice/index.jsx`, Shared components reference, `StatCard/index.js`

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

### Community 39 - "formatOfflineDuration"
Cohesion: 0.40
Nodes (6): OfflineProgressNotice(), applyAutobuyerMilestones(), formatOfflineDuration(), getAutobuyerUnlockMilestone(), getTierTickspeedAutobuyerMilestone(), InfoPage()

### Community 48 - "useIncrementalGame"
Cohesion: 0.13
Nodes (15): activateComputeBoost(), canReclaimComputeBoost(), combineIntroByte(), getPrestigePointsAwarded(), pickIntroCapacityMilestone(), prestigeGame(), reclaimComputeBoost(), setAutobuyerEnabled() (+7 more)

### Community 49 - "dependencies"
Cohesion: 0.13
Nodes (15): @fontsource/inter, @fontsource/space-grotesk, dependencies, @fontsource/inter, @fontsource/space-grotesk, react, react-dom, react-is (+7 more)

### Community 50 - "ComputePage/index.jsx"
Cohesion: 0.11
Nodes (17): ActiveBoostRow, AutoBadge, BoostRow, CompactButton, COMPUTE_BOOST_DISPLAY, CoresAvailable, ENTITY_ROWS, EntityActions (+9 more)

### Community 51 - "storage.js"
Cohesion: 0.25
Nodes (13): allResourceIds(), createInitialGameState(), clearGameState(), LEGACY_REMOVED_TIER_IDS, LEGACY_TIER_ID_MAP, loadGameState(), loadLastSaveTimestamp(), migrateState() (+5 more)

### Community 52 - "MainPage"
Cohesion: 0.12
Nodes (22): buyGlobalTickspeedMultiplier(), countGlobalTickspeedMilestones(), getAutoPrestigeAttemptRate(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedMultiplierCost(), getGlobalTickspeedProductionMultiplier(), getLastTierXpTickspeedMultiplier(), getOverclockMultiplier() (+14 more)

### Community 53 - "package.json"
Cohesion: 0.20
Nodes (9): name, packageManager, private, resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid (+1 more)

### Community 54 - "Design history & rationale"
Cohesion: 0.25
Nodes (7): Architecture / MainPage UI decisions, Design history & rationale, Distribution, Documentation, Testing, Why a PWA instead of Capacitor/native app-store distribution, Why semver/changelog started at v0.5.0, not v0.1.0-from-inception

### Community 55 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 57 - "StoragePage/index.jsx"
Cohesion: 0.17
Nodes (15): ButtonContent(), formatStorageSize(), getFirstTierCost(), getStorageSizesToShow(), isStorageBankRedeemable(), redeemStorageBank(), tickStorageAutoRedeem(), Header (+7 more)

### Community 58 - "clampNonNegative"
Cohesion: 0.15
Nodes (20): cliValues, defaultPPValues, simulateRun(), buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyPrestigeSpeedBonus(), buySmartAutobuyer() (+12 more)

### Community 59 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, audit, build, dev, gen-pwa-icons, start, test, test:e2e (+1 more)

### Community 60 - "isComputeCoreConversionUnlocked"
Cohesion: 0.50
Nodes (5): claimComputeCore(), isComputeCoreClaimAvailable(), isComputeCoreConversionUnlocked(), mintComputeCoreIfReady(), tickComputeCoreConversion()

### Community 61 - "formatAmount"
Cohesion: 0.60
Nodes (5): formatAmount(), formatCurrency(), formatScientific(), RESOURCE_SYMBOL(), formatCost()

### Community 62 - "tickGame"
Cohesion: 0.15
Nodes (27): buyTickspeedMultiplier(), buyTier(), buyTierQuantity(), consumeXpForLastTierTickspeed(), convertIntroBitsToKilobytes(), getComputeBoostMultiplier(), getCostEpochExponent(), getIntroKilobyteConversionCost() (+19 more)

## Knowledge Gaps
- **397 isolated node(s):** `session-start.sh script`, `defaultPPValues`, `cliValues`, `seededState`, `baseUrl` (+392 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 19 inferred relationships involving `useIncrementalGame()` (e.g. with `buildStorageBank()` and `buyAutoPrestige()`) actually correct?**
  _`useIncrementalGame()` has 19 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `defaultPPValues`, `cliValues` to the rest of the system?**
  _397 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `engine.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.034482758620689655 - nodes in this community are weakly interconnected._