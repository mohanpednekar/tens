# Graph Report - tens  (2026-08-18)

## Corpus Check
- 66 files · ~200,415 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 762 nodes · 1448 edges · 59 communities (46 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cb65b830`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- engine.test.js
- MainPage/index.jsx
- engine.js
- Money/index.js
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
- storage.js
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- Copilot Instructions
- graphify
- extraction-spec.md
- MAINPAGE_REFERENCE.md
- PWA_REFERENCE.md
- THEMING_REFERENCE.md
- clampNonNegative
- InfoPage/index.jsx
- formatCurrency
- package.json
- MainPage
- formatBonusOrMultiplier
- Design history & rationale
- OfflineProgressNotice/index.jsx
- isProductionFrozen
- buyGlobalTickspeedMultiplier

## God Nodes (most connected - your core abstractions)
1. `Economy model` - 45 edges
2. `clampNonNegative()` - 41 edges
3. `MainPage()` - 41 edges
4. `tickGame()` - 37 edges
5. `useIncrementalGame()` - 37 edges
6. `ByteFoundryPage()` - 21 edges
7. `isProductionFrozen()` - 20 edges
8. `createInitialGameState()` - 15 edges
9. `Economy model reference` - 15 edges
10. `getPurchaseBlockSize()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `simulateRun()` --calls--> `createInitialGameState()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `tickGame()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `buyPrestigeSpeedBonus()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `buyTierQuantity()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `simulateRun()` --calls--> `getSpeedUpRequirement()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (59 total, 13 thin omitted)

### Community 0 - "engine.test.js"
Cohesion: 0.06
Nodes (8): buySmartAutobuyer(), getAutobuyerUnlockCost(), getComputeBoostMultiplier(), getSmartAutobuyerCost(), noOtherUpgradesLeft, unlockedLastTierState(), withOwned(), tickIntroProduction()

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (57): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, CategoryHeading, CenteredCard, COMPUTE_BOOST_LABELS, Disclosure (+49 more)

### Community 2 - "engine.js"
Cohesion: 0.07
Nodes (61): ALL_TIER_IDS, allResourceIds(), currencyNumberFormatter, plainNumberFormatter, scientificNumberFormatter, AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST (+53 more)

### Community 4 - "App.jsx"
Cohesion: 0.09
Nodes (24): App(), rootElement, reportWebVitals(), AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb() (+16 more)

### Community 5 - "Button/index.jsx"
Cohesion: 0.23
Nodes (11): Button, ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, progressFill() (+3 more)

### Community 6 - "devDependencies"
Cohesion: 0.09
Nodes (23): jsdom, devDependencies, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom, @testing-library/react (+15 more)

### Community 7 - "Economy model"
Cohesion: 0.04
Nodes (45): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Economy model, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check (+37 more)

### Community 8 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (53): buildStorageBank(), canActivateComputeBoost(), formatAmount(), formatScientific(), getFirstTierCost(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), getIntroProductionRate() (+45 more)

### Community 9 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 10 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 15 - "useIncrementalGame.js"
Cohesion: 0.19
Nodes (22): activateComputeBoost(), applyOfflineProgress(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyTickspeedAutobuyer(), combineIntroByte(), createInitialGameState(), getOfflineEffectiveSeconds() (+14 more)

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

### Community 39 - "storage.js"
Cohesion: 0.27
Nodes (11): applyAutobuyerMilestones(), clearGameState(), LEGACY_REMOVED_TIER_IDS, LEGACY_TIER_ID_MAP, loadGameState(), loadLastSaveTimestamp(), migrateState(), migrateTierKeys() (+3 more)

### Community 48 - "clampNonNegative"
Cohesion: 0.15
Nodes (23): buyAutoPrestige(), checkMilestones(), clampNonNegative(), convertIntroBitsToKilobytes(), getAutoPrestigeAttemptRate(), getAutoPrestigeCost(), getCostEpochExponent(), getIntroKilobyteConversionCost() (+15 more)

### Community 49 - "InfoPage/index.jsx"
Cohesion: 0.27
Nodes (9): ButtonContent(), getAutobuyerUnlockMilestone(), getOverclockRequirement(), getTierTickspeedAutobuyerMilestone(), Header, InfoPage(), RootDiv, Section (+1 more)

### Community 50 - "formatCurrency"
Cohesion: 1.00
Nodes (3): formatCurrency(), RESOURCE_SYMBOL(), formatCost()

### Community 51 - "package.json"
Cohesion: 0.05
Nodes (43): @fontsource/inter, @fontsource/space-grotesk, browserslist, development, production, dependencies, @fontsource/inter, @fontsource/space-grotesk (+35 more)

### Community 52 - "MainPage"
Cohesion: 0.16
Nodes (23): buyTickspeedMultiplier(), buyTier(), consumeXpForLastTierTickspeed(), countGlobalTickspeedMilestones(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier(), getLastTierId(), getLastTierXpTickspeedMinConsumption() (+15 more)

### Community 53 - "formatBonusOrMultiplier"
Cohesion: 0.50
Nodes (4): formatBonusOrMultiplier(), formatBonusPercent(), formatGlobalTickspeedBonusPercent(), formatRate()

### Community 54 - "Design history & rationale"
Cohesion: 0.25
Nodes (7): Architecture / MainPage UI decisions, Design history & rationale, Distribution, Documentation, Testing, Why a PWA instead of Capacitor/native app-store distribution, Why semver/changelog started at v0.5.0, not v0.1.0-from-inception

### Community 55 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.28
Nodes (7): VisuallyHidden, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), StatCard, formatOfflineDuration()

### Community 57 - "isProductionFrozen"
Cohesion: 0.33
Nodes (8): cliValues, defaultPPValues, simulateRun(), buyPrestigeSpeedBonus(), buyTierQuantity(), getSpeedUpRequirement(), isProductionFrozen(), speedUpGame()

### Community 58 - "buyGlobalTickspeedMultiplier"
Cohesion: 0.67
Nodes (3): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), isGlobalTickspeedMultiplierUnlocked()

## Knowledge Gaps
- **375 isolated node(s):** `session-start.sh script`, `defaultPPValues`, `cliValues`, `seededState`, `baseUrl` (+370 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Are the 16 inferred relationships involving `useIncrementalGame()` (e.g. with `buildStorageBank()` and `buyAutoPrestige()`) actually correct?**
  _`useIncrementalGame()` has 16 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `defaultPPValues`, `cliValues` to the rest of the system?**
  _375 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `engine.test.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05512820512820513 - nodes in this community are weakly interconnected._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.03389830508474576 - nodes in this community are weakly interconnected._
- **Should `engine.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07067603160667252 - nodes in this community are weakly interconnected._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08912655971479501 - nodes in this community are weakly interconnected._