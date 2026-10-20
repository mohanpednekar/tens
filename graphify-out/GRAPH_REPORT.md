# Graph Report - tens  (2026-10-19)

## Corpus Check
- 147 files · ~591,631 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1879 nodes · 4533 edges · 125 communities (99 shown, 26 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 85 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6aa87194`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lint-workflow-shell.mjs
- MainPage/index.jsx
- AppDelegate
- layers.js
- navAttention.js
- ComputePage/index.jsx
- engine.test.js
- Automation workflows
- Economy model
- App.jsx
- CLAUDE.md
- save-migration/index.js
- run-simulation.mjs
- ComputePage
- DevModePage/index.jsx
- engine.js
- Pool-local reset loop
- App.test.jsx
- InfoPage/index.jsx
- storage.js
- What You Must Do When Invoked
- bump-version.mjs
- MilestonesPage/index.jsx
- getPoolIndexForDiskSize
- ComputeFlopsPage/index.jsx
- tokens.js
- AGENTS.md
- formatMemoryAmount
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- Design history & rationale
- gradlew
- createInitialGameState
- Shared components reference
- DataLakePanel/index.jsx
- getPurchaseBlockSize
- package.json
- simulate-run-times/SKILL.md
- MainActivity.java
- [Unreleased]
- Testing
- devDependencies
- DiskArrayRow/index.jsx
- scripts
- ByteFoundryPage/index.jsx
- sentinel.md
- clampNonNegative
- Procedure
- Automation workflows
- ref_node_fs
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- orphan-branch-scan.sh
- generate-pwa-icons.mjs
- Package.swift
- CapApp-SPM/README.md
- classify-claude-failure.sh
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- autobuyer-reload.e2e.js
- PerksPage/index.jsx
- graphify reference: query, path, explain
- palette.md
- bolt.md
- sync-release-milestones.sh
- adversarialReviewMarker.js
- eraGame
- graphify reference: commit hook and native CLAUDE.md integration
- ByteFoundryPage
- pull_request_template.md
- jsconfig.json
- Button
- Tens
- graphify reference: transcribe video and audio
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- Era ascension and Eons (#407)
- getIntroProductionRate
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- development
- getPrestigePointsAwarded
- getDiskSizesToShow
- Economy model
- graphify
- check-graphify-freshness.mjs
- Button/index.jsx
- session-start.sh
- extraction-spec.md
- graphify reference: add a URL and watch a folder
- PWA_REFERENCE.md
- dev-team/SKILL.md
- Distribution
- README.md
- Tier production tickspeed
- DEVMODE_REFERENCE.md
- resolve-pr-threads.sh
- MAINPAGE_REFERENCE.md
- THEMING_REFERENCE.md
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- claude-deny-settings.sh
- pr-head-guard.sh
- PWA support

## God Nodes (most connected - your core abstractions)
1. `Testing` - 87 edges
2. `clampNonNegative()` - 75 edges
3. `useIncrementalGame()` - 75 edges
4. `Economy model` - 56 edges
5. `tickGame()` - 54 edges
6. `MainPage()` - 46 edges
7. `isProductionFrozen()` - 42 edges
8. `Design history & rationale` - 38 edges
9. `ByteFoundryPage()` - 37 edges
10. `getDataLakeTier()` - 28 edges

## Surprising Connections (you probably didn't know these)
- `actFoundry()` --calls--> `buyBooster()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `fillDataLakeManually()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `getVisibleStoragePoolCount()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `isBoosterPurchaseAvailable()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `isDataLakeManualFillAvailable()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (125 total, 26 thin omitted)

### Community 0 - "lint-workflow-shell.mjs"
Cohesion: 0.40
Nodes (7): bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main(), sanitizeExpressions()

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (71): OfflineProgressNotice(), buyGlobalTickspeedMultiplier(), formatBytes(), formatOfflineDuration(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedMultiplierCost(), getGlobalTickspeedMultiplierCostBits(), getGlobalTickspeedProductionMultiplier() (+63 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (20): Any, Bool, Capacitor, AppDelegate, UIScene, UISceneSession, UIWindow, SceneDelegate (+12 more)

### Community 3 - "layers.js"
Cohesion: 0.05
Nodes (53): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SCALE_UP_COST, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, BITS_PER_BYTE (+45 more)

### Community 4 - "navAttention.js"
Cohesion: 0.11
Nodes (41): canBuyComputeFlopsTier(), getIntroKilobyteConversionCost(), getScaleUpRequirement(), isComputeCoreConversionUnlocked(), isComputeUpgradeTurnAvailable(), isGlobalTickspeedAffordable(), isGlobalTickspeedMultiplierUnlocked(), isIntroConversionUnlocked() (+33 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (32): COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_MAX_STACKS, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RESERVE_CAP, ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow (+24 more)

### Community 6 - "engine.test.js"
Cohesion: 0.03
Nodes (52): captureFoundryUpgradeCaps(), enableAutoMerge(), getAutobuyerUnlockCost(), getDataStreamBaseMultiplierPercent(), getDataStreamEffectMultiplier(), getDataStreamFillFraction(), getDataStreamMultiplierPercent(), getFillMultiplierPercent() (+44 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "Economy model"
Cohesion: 0.04
Nodes (56): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+48 more)

### Community 9 - "App.jsx"
Cohesion: 0.09
Nodes (26): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon, MenuButton (+18 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.09
Nodes (22): AI-instruction file cost hygiene, Architecture, Automation workflows, Changelog convention, Commands, Dev Mode, Documentation, End-to-end testing (+14 more)

### Community 11 - "save-migration/index.js"
Cohesion: 0.35
Nodes (9): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), isPlainObject(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), isPlainObject() (+1 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.15
Nodes (16): actPlayer(), actSoftResets(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+8 more)

### Community 13 - "ComputePage"
Cohesion: 0.11
Nodes (31): actFoundry(), activateComputeBoost(), canActivateComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), combineIntroByte(), convertIntroBitsToKilobytes(), getBiggestComputeTierWaitingOnMerge() (+23 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (22): COMPUTE_FLOPS_REVEAL_PP, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow (+14 more)

### Community 15 - "engine.js"
Cohesion: 0.05
Nodes (67): applyOfflineProgress(), areStoragePoolDisksFull(), BIT_UNIT_SYMBOLS, buyComputeFlopsTier(), buyHyperscaler(), canBuyHyperscaler(), canForfeitComputeBoost(), clearDiskBuildQueue() (+59 more)

### Community 16 - "Pool-local reset loop"
Cohesion: 0.12
Nodes (16): Adding a new tier, Buy max mode, Byte Foundry, Constants (`src/game/layers.js`), Game state shape, Key engine functions (`src/game/engine.js`), Offline progress, Overclock (+8 more)

### Community 17 - "App.test.jsx"
Cohesion: 0.09
Nodes (16): ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), COMPUTE_CORES_PER_NODE, COMPUTE_ENTITY_AUTO_MERGE_CAP, DATA_LAKE_CAPACITY_MAX_LEVEL, DATA_LAKE_OVERFLOW_MAX_PERCENT (+8 more)

### Community 18 - "InfoPage/index.jsx"
Cohesion: 0.10
Nodes (22): TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_LAST_TIER_COST_PP, DATA_LAKE_SUB_SIZE_DISK_CAPS, DISK_BUILD_COST_MULTIPLIER (+14 more)

### Community 19 - "storage.js"
Cohesion: 0.09
Nodes (63): createEmptyDataLakes(), createEmptyDataLakeTier(), MONEY_STARTING_AMOUNT, PRESTIGE_UNBOUNDED_MIN_COUNT, applyDevGameStateJson(), applyPendingComputeGrants(), buildClearSlotConfirmMessage(), buildDefaultMeta() (+55 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.17
Nodes (21): ref_node_os, assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+13 more)

### Community 22 - "MilestonesPage/index.jsx"
Cohesion: 0.21
Nodes (11): isEraEligible(), isUnboundedPrestigeUnlocked(), ERA_ELIGIBILITY_PP, Badge, Category, CategoryHeading, Header, List (+3 more)

### Community 23 - "getPoolIndexForDiskSize"
Cohesion: 0.19
Nodes (20): canDiskSizeFeedWriteCache(), canStartDiskWriteCacheMerge(), decrementFullDiskCount(), getComputeMergeDurationSeconds(), getDecadePowerEquivalentBits(), getDiskReadCacheFlushSeconds(), getDiskWriteCacheFlushSeconds(), getDiskWriteCacheSegmentSeconds() (+12 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.14
Nodes (18): Money, formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierWeight(), getComputeFlopsTotal(), COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, BuyButton (+10 more)

### Community 25 - "tokens.js"
Cohesion: 0.11
Nodes (21): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), GlobalStyle (+13 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.08
Nodes (22): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Byte Foundry, Changelog convention (+14 more)

### Community 27 - "formatMemoryAmount"
Cohesion: 0.16
Nodes (20): flooredBitsLabel(), floorToDecimals(), formatBitsInNearestSiUnit(), formatBitsInNearestUnit(), formatDiskSizeBare(), formatDiskSizeInPoolUnit(), formatDiskSizeStable(), formatMemoryAmount() (+12 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.11
Nodes (23): ConfirmDialog(), formatAsCleanBytesIfExactMultiple(), formatCurrency(), formatMoneyBalance(), formatScientific(), getEonsAwarded(), MUSEUM_PIN_CAP, buildSparklinePath() (+15 more)

### Community 29 - "ExampleInstrumentedTest.java"
Cohesion: 0.25
Nodes (7): ExampleInstrumentedTest, ExampleUnitTest, assert, context, instrumentationregistry, org.junit.runner.RunWith, org.junit.Test

### Community 30 - "Design history & rationale"
Cohesion: 0.06
Nodes (36): Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Architecture / MainPage UI decisions, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09 (+28 more)

### Community 31 - "gradlew"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 32 - "createInitialGameState"
Cohesion: 0.12
Nodes (18): seedState(), seedDataLakeSave(), allResourceIds(), applyAutobuyerMilestones(), createInitialGameState(), getAutobuyerUnlockMilestone(), getTierTickspeedAutobuyerMilestone(), prestigeGame() (+10 more)

### Community 33 - "Shared components reference"
Cohesion: 0.14
Nodes (13): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `BuyMaxToggle/index.jsx`, `ByteFoundryPage` pool layout, `ConfirmDialog/index.jsx`, `DiskArrayRow/index.jsx`, `IncompatibleSaveNotice/index.jsx` (+5 more)

### Community 34 - "DataLakePanel/index.jsx"
Cohesion: 0.08
Nodes (68): ActionButton, BareDivider, clampFraction(), DataLakePanel(), getVisibleLakeTierIndexes(), LakeBlock, LakeHeaderRow, LakePoolFill (+60 more)

### Community 35 - "getPurchaseBlockSize"
Cohesion: 0.26
Nodes (19): actMainBuys(), wouldAutobuyerStall(), buyTier(), buyTierMaxLevels(), buyTierQuantity(), canAffordFullTierLevel(), getCostEpochExponent(), getPurchaseBlockSize() (+11 more)

### Community 36 - "package.json"
Cohesion: 0.17
Nodes (11): name, packageManager, private, resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid (+3 more)

### Community 37 - "simulate-run-times/SKILL.md"
Cohesion: 0.33
Nodes (5): Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run

### Community 39 - "[Unreleased]"
Cohesion: 0.05
Nodes (37): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+29 more)

### Community 40 - "Testing"
Cohesion: 0.02
Nodes (87): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent (+79 more)

### Community 41 - "devDependencies"
Cohesion: 0.07
Nodes (29): @capacitor/cli, fast-check, jsdom, devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test (+21 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.08
Nodes (37): CacheBlock, CacheBlocksRow, CacheFillIndicator, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, pullPulse (+29 more)

### Community 43 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+7 more)

### Community 44 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (37): COST_ICON, INTRO_CAPACITY_DOUBLING_STEP, ActionsRow, BalanceSeparator, BalanceText, BarFillBase, BarFillBonus, BarFillLake (+29 more)

### Community 45 - "sentinel.md"
Cohesion: 0.18
Nodes (10): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, 2026-08-25 - Defense in Depth: Content Security Policy (+2 more)

### Community 46 - "clampNonNegative"
Cohesion: 0.11
Nodes (40): actTickspeed(), AUTO_MERGE_TICKERS, buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoScaleUp(), buyComputeAutoBoost(), buyComputeFlopsTierQuantity(), buyPrestigeDoublePp() (+32 more)

### Community 47 - "Procedure"
Cohesion: 0.20
Nodes (9): 1. Establish scope, 2. Load the repo's invariants, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure (+1 more)

### Community 48 - "Automation workflows"
Cohesion: 0.13
Nodes (14): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Mobile build (`mobile-build.yml`), Orchestration model (+6 more)

### Community 49 - "ref_node_fs"
Cohesion: 0.13
Nodes (11): ref_node_child_process, ref_node_fs, ref_node_module, ref_node_path, ref_node_url, script, zeroWork, script (+3 more)

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.47
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing(), backlog-issue-hygiene.sh script

### Community 51 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 52 - "dependencies"
Cohesion: 0.10
Nodes (21): @capacitor/android, @capacitor/core, @capacitor/ios, @fontsource/inter, @fontsource/space-grotesk, dependencies, @capacitor/android, @capacitor/core (+13 more)

### Community 53 - "epic-407-issue-hygiene.sh"
Cohesion: 0.50
Nodes (7): add_label_if_missing(), close_if_open(), has_marker_comment(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 54 - "file-task-issue/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.24
Nodes (9): faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), overwrite(), pngSize(), renderSplash(), renderSquare() (+1 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.29
Nodes (6): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 5. Authorization boundary, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 63 - "PerksPage/index.jsx"
Cohesion: 0.08
Nodes (31): BuyMaxToggle(), Switch, getAutoPrestigeCost(), getPrestigeDoublePpUpgradeCost(), getSmartAutobuyerCost(), isBuyMaxUnlocked(), TIER_DEFINITIONS, hasAffordablePpLevelUpgrade() (+23 more)

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 66 - "palette.md"
Cohesion: 0.18
Nodes (10): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+2 more)

### Community 68 - "bolt.md"
Cohesion: 0.25
Nodes (7): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-07-28 - Replace O(N) attempts loop with O(1) batch processing for tickGame autobuyers, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, 2024-10-24 - Replace O(N) iterative loop in tickDiskAutoFill with O(1) mathematical formulation

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.60
Nodes (4): assign_milestone(), ensure_milestone(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 73 - "eraGame"
Cohesion: 0.50
Nodes (4): applyFlopsAutobuyerMilestones(), buildEraIntroReset(), eraGame(), getFlopsAutobuyerUnlockEra()

### Community 74 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 75 - "ByteFoundryPage"
Cohesion: 0.18
Nodes (25): getDiskCost(), getDiskProvisionPassesCollected(), getDiskProvisionPassesRequired(), getDiskReplayPassAllowance(), getDiskSize(), getMaxActiveDiskLadderStep(), getPoolBufferBits(), getPoolCacheReservationBits() (+17 more)

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 78 - "Button"
Cohesion: 0.13
Nodes (16): Button, VisuallyHidden, Actions, Body, Card, Overlay, Title, Body (+8 more)

### Community 79 - "Tens"
Cohesion: 0.25
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes, Tens

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 84 - "Era ascension and Eons (#407)"
Cohesion: 0.25
Nodes (8): Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 85 - "getIntroProductionRate"
Cohesion: 0.14
Nodes (17): actCapacityUpgrade(), clearIntroCapacityUpgradeQueue(), doubleIntroCapacity(), eraseAllComputeTokens(), getDataStreamSpeedBytesPerSecond(), getIntroProductionRate(), isMemoryCapacityAtCap(), isMemoryCapacityUpgradeArmable() (+9 more)

### Community 88 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 89 - "getPrestigePointsAwarded"
Cohesion: 0.36
Nodes (8): checkMilestones(), getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp(), getPrestigePpEarnProgressPercent(), getPrestigePpPerPower(), getPrestigeProgressPercent()

### Community 90 - "getDiskSizesToShow"
Cohesion: 0.29
Nodes (7): getDiskRedeemTierName(), getDiskSizesToShow(), getRelevantDiskSizesForFoundry(), Header, RootDiv, StoragePage(), Title

### Community 91 - "Economy model"
Cohesion: 0.50
Nodes (4): Byte Foundry, Economy model, Pool-local resets, Tiers, Prestige, Era ascension

### Community 93 - "check-graphify-freshness.mjs"
Cohesion: 0.26
Nodes (9): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+1 more)

### Community 94 - "Button/index.jsx"
Cohesion: 0.18
Nodes (10): ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, progressFill() (+2 more)

### Community 98 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 103 - "Tier production tickspeed"
Cohesion: 0.67
Nodes (3): Multiplier outcomes are floored, Production figure (tick-progress ring removed), Tier production tickspeed

### Community 113 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

## Knowledge Gaps
- **764 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+759 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `Design history & rationale` to `Distribution`, `README.md`, `Automation workflows`, `Economy model`, `Testing`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 27 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 27 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _764 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.03881278538812785 - nodes in this community are weakly interconnected._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08866995073891626 - nodes in this community are weakly interconnected._