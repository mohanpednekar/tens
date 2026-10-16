# Graph Report - tens  (2026-10-16)

## Corpus Check
- 140 files · ~587,415 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1850 nodes · 4492 edges · 121 communities (99 shown, 22 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 85 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c12479a5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lint-workflow-shell.mjs
- MainPage/index.jsx
- AppDelegate
- layers.js
- navAttention.js
- ComputePage/index.jsx
- engine.js
- Automation workflows
- Economy model
- App.jsx
- CLAUDE.md
- MilestonesPage/index.jsx
- tickGame
- getStoragePoolBandwidth
- DevModePage/index.jsx
- engine.test.js
- createInitialGameState
- getPoolIndexForDiskSize
- run-simulation.mjs
- storage.js
- What You Must Do When Invoked
- bump-version.mjs
- getDataStreamBaseMultiplierPercent
- isDataLakePoolReady
- ComputeFlopsPage/index.jsx
- tokens.js
- AGENTS.md
- AppNav/index.jsx
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- Design history & rationale
- gradlew
- DEVMODE_REFERENCE.md
- Shared components reference
- DataLakePanel/index.jsx
- Pool-local reset loop
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
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- formatCurrency
- pull_request_template.md
- jsconfig.json
- Button
- Tens
- graphify reference: transcribe video and audio
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- development
- save-migration/index.js
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- InfoPage/index.jsx
- App.test.jsx
- ByteFoundryPage
- formatMemoryAmount
- graphify
- check-graphify-freshness.mjs
- Button/index.jsx
- session-start.sh
- extraction-spec.md
- applyDevGameStateJson
- PWA_REFERENCE.md
- upgradePoolCapacity
- listSaveSlots
- isDiskPullEligible
- resolve-pr-threads.sh
- StoragePage/index.jsx
- OfflineProgressNotice/index.jsx
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- claude-deny-settings.sh
- pr-head-guard.sh
- MAINPAGE_REFERENCE.md
- THEMING_REFERENCE.md

## God Nodes (most connected - your core abstractions)
1. `Testing` - 85 edges
2. `clampNonNegative()` - 75 edges
3. `useIncrementalGame()` - 75 edges
4. `Economy model` - 56 edges
5. `tickGame()` - 54 edges
6. `MainPage()` - 44 edges
7. `isProductionFrozen()` - 42 edges
8. `ByteFoundryPage()` - 38 edges
9. `Design history & rationale` - 37 edges
10. `getDataLakeTier()` - 28 edges

## Surprising Connections (you probably didn't know these)
- `actCapacityUpgrade()` --calls--> `queueIntroCapacityUpgrade()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actCapacityUpgrade()` --calls--> `upgradePoolCapacity()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `activateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `canActivateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `combineIntroByte()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (121 total, 22 thin omitted)

### Community 0 - "lint-workflow-shell.mjs"
Cohesion: 0.40
Nodes (7): bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main(), sanitizeExpressions()

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (53): Money, GLOBAL_TICKSPEED_PRODUCTION_STEP, PURCHASE_MILESTONE_MULTIPLIER_BASE, BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment (+45 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (20): Any, Bool, Capacitor, AppDelegate, UIScene, UISceneSession, UIWindow, SceneDelegate (+12 more)

### Community 3 - "layers.js"
Cohesion: 0.06
Nodes (48): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, BUY_MAX_ITERATION_CAP, COMPUTE_BOOST_TIER_DURATION_STEP (+40 more)

### Community 4 - "navAttention.js"
Cohesion: 0.11
Nodes (38): canBuyComputeFlopsTier(), getIntroKilobyteConversionCost(), isComputeFlopsPageRevealed(), isComputeUpgradeTurnAvailable(), isGlobalTickspeedMultiplierUnlocked(), isIntroConversionUnlocked(), AUTO_PRESTIGE_AUTOBUYER_COST, COMPUTE_MERGE_RATIO (+30 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (52): activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), getComputeBoostTierMultiplier() (+44 more)

### Community 6 - "engine.js"
Cohesion: 0.05
Nodes (60): BIT_UNIT_SYMBOLS, buyHyperscaler(), canBuyHyperscaler(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMerge(), fixedMemoryAmountFormatter, getAutobuyerUnlockCost() (+52 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "Economy model"
Cohesion: 0.04
Nodes (56): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+48 more)

### Community 9 - "App.jsx"
Cohesion: 0.13
Nodes (21): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon, MenuButton (+13 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.07
Nodes (28): AI-instruction file cost hygiene, Architecture, Automation workflows, Byte Foundry, Changelog convention, Commands, Dev Mode, Documentation (+20 more)

### Community 11 - "MilestonesPage/index.jsx"
Cohesion: 0.22
Nodes (9): ERA_ELIGIBILITY_PP, Badge, Category, CategoryHeading, Header, List, MilestonesPage(), RootDiv (+1 more)

### Community 12 - "tickGame"
Cohesion: 0.25
Nodes (21): actMainBuys(), wouldAutobuyerStall(), AUTO_MERGE_TICKERS, buyTier(), buyTierMaxLevels(), buyTierQuantity(), canAffordFullTierLevel(), getPurchaseBlockSize() (+13 more)

### Community 13 - "getStoragePoolBandwidth"
Cohesion: 0.12
Nodes (28): getComputeMergeDurationSeconds(), getDataStreamSpeedBytesPerSecond(), getDecadePowerEquivalentBits(), getDiskReadCacheFlushSeconds(), getIntroProductionRate(), getPoolBufferCapacity(), getPoolBufferClampCeilingBits(), getPoolCapacityUnlockThresholdBits() (+20 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (22): PRESTIGE_THRESHOLD, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow (+14 more)

### Community 15 - "engine.test.js"
Cohesion: 0.04
Nodes (67): applyOfflineProgress(), buyAutoPrestigeAutobuyer(), buyAutoScaleUp(), buyComputeAutoBoost(), buyComputeFlopsTier(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus(), buySmartAutobuyer() (+59 more)

### Community 16 - "createInitialGameState"
Cohesion: 0.40
Nodes (5): seedDataLakeSave(), allResourceIds(), createInitialGameState(), INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, withIntro()

### Community 17 - "getPoolIndexForDiskSize"
Cohesion: 0.20
Nodes (15): areStoragePoolDisksFull(), canDiskSizeFeedWriteCache(), canStartDiskWriteCacheMerge(), decrementFullDiskCount(), getDataLakeSubSize(), getDataLakeTierIndex(), getDiskLadderSizeBits(), getDiskLadderStep() (+7 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.13
Nodes (23): actPlayer(), actSoftResets(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+15 more)

### Community 19 - "storage.js"
Cohesion: 0.15
Nodes (36): PRESTIGE_UNBOUNDED_MIN_COUNT, applyPendingComputeGrants(), BUY_MAX_PREFERENCE_KEY, clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot(), completeDummySupporterPurchase() (+28 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.17
Nodes (21): ref_node_os, assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+13 more)

### Community 22 - "getDataStreamBaseMultiplierPercent"
Cohesion: 0.29
Nodes (7): getComputeBoostMultiplier(), getDataStreamBaseMultiplierPercent(), getDataStreamEffectMultiplier(), getDataStreamFillFraction(), getDataStreamMultiplierPercent(), getFillMultiplierPercent(), tickIntroProduction()

### Community 23 - "isDataLakePoolReady"
Cohesion: 0.40
Nodes (6): isDataLakeAutoConvertStartAvailable(), isDataLakeBoosterUnlocked(), isDataLakePoolReady(), setDataLakeAutoConvertActive(), startDataLakeAutoConvert(), tickPoolResetReprovision()

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.09
Nodes (31): applyFlopsAutobuyerMilestones(), buyComputeFlopsTierQuantity(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsAffordableAndCost(), getComputeFlopsAffordableQuantity(), getComputeFlopsTierCost() (+23 more)

### Community 25 - "tokens.js"
Cohesion: 0.11
Nodes (22): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), GlobalStyle (+14 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.08
Nodes (22): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Byte Foundry, Changelog convention (+14 more)

### Community 27 - "AppNav/index.jsx"
Cohesion: 0.22
Nodes (8): APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem, pulseHigh

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.10
Nodes (25): buildEraIntroReset(), eraGame(), getEonsAwarded(), isEraEligible(), MUSEUM_PIN_CAP, buildClearSlotConfirmMessage(), buildEraseAllSavesConfirmMessage(), FREE_SLOT_COUNT (+17 more)

### Community 29 - "ExampleInstrumentedTest.java"
Cohesion: 0.25
Nodes (7): ExampleInstrumentedTest, ExampleUnitTest, assert, context, instrumentationregistry, org.junit.runner.RunWith, org.junit.Test

### Community 30 - "Design history & rationale"
Cohesion: 0.05
Nodes (37): Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Architecture / MainPage UI decisions, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09 (+29 more)

### Community 31 - "gradlew"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 33 - "Shared components reference"
Cohesion: 0.15
Nodes (12): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `BuyMaxToggle/index.jsx`, `ByteFoundryPage` pool layout, `ConfirmDialog/index.jsx`, `DiskArrayRow/index.jsx`, `IncompatibleSaveNotice/index.jsx` (+4 more)

### Community 34 - "DataLakePanel/index.jsx"
Cohesion: 0.08
Nodes (61): actCapacityUpgrade(), actFoundry(), ActionButton, BareDivider, clampFraction(), DataLakePanel(), getVisibleLakeTierIndexes(), LakeBlock (+53 more)

### Community 35 - "Pool-local reset loop"
Cohesion: 0.07
Nodes (27): Adding a new tier, Buy max mode, Byte Foundry, Constants (`src/game/layers.js`), Era ascension and Eons (#407), Game state shape, Key engine functions (`src/game/engine.js`), Multiplier outcomes are floored (+19 more)

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
Nodes (85): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent (+77 more)

### Community 41 - "devDependencies"
Cohesion: 0.07
Nodes (29): @capacitor/cli, fast-check, jsdom, devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test (+21 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.12
Nodes (25): CacheBlock, CacheBlocksRow, CacheFillIndicator, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, pullPulse (+17 more)

### Community 43 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+7 more)

### Community 44 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (34): FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT, FILL_MULTIPLIER_TAP_CAP_PERCENT, ActionsRow, BalanceSeparator, BalanceText, BarFillBase, BarFillBonus, BarFillLake (+26 more)

### Community 45 - "sentinel.md"
Cohesion: 0.18
Nodes (10): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, 2026-08-25 - Defense in Depth: Content Security Policy (+2 more)

### Community 46 - "clampNonNegative"
Cohesion: 0.14
Nodes (30): checkMilestones(), clampNonNegative(), getClampedScaleUpTargetTierIndex(), getCostEpochExponent(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedMultiplierCost(), getGlobalTickspeedProductionMultiplier(), getLastTierXpTickspeedMultiplier() (+22 more)

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
Nodes (36): seedState(), BuyMaxToggle(), applyAutobuyerMilestones(), buyAutoPrestige(), getAutoPrestigeAttemptRate(), getAutoPrestigeCost(), getPrestigeDoublePpUpgradeCost(), getSmartAutobuyerCost() (+28 more)

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

### Community 73 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 74 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 75 - "formatCurrency"
Cohesion: 0.57
Nodes (7): formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), RESOURCE_SYMBOL(), formatCost()

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 78 - "Button"
Cohesion: 0.15
Nodes (13): Button, Actions, Body, Card, ConfirmDialog(), Overlay, Title, Body (+5 more)

### Community 79 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 84 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 85 - "save-migration/index.js"
Cohesion: 0.35
Nodes (9): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), isPlainObject(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), isPlainObject() (+1 more)

### Community 88 - "InfoPage/index.jsx"
Cohesion: 0.09
Nodes (24): getAutobuyerUnlockMilestone(), CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_CORES_PER_NODE, COMPUTE_FLOPS_LAST_TIER_COST_PP (+16 more)

### Community 89 - "App.test.jsx"
Cohesion: 0.08
Nodes (19): ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), BITS_PER_BYTE, COMPUTE_ENTITY_AUTO_MERGE_CAP, COMPUTE_ENTITY_CAP, DATA_LAKE_CAPACITY_MAX_LEVEL (+11 more)

### Community 90 - "ByteFoundryPage"
Cohesion: 0.14
Nodes (31): combineIntroByte(), getDiskCost(), getDiskProvisionPassesCollected(), getDiskProvisionPassesRequired(), getDiskReplayPassAllowance(), getDiskSize(), getDiskSizesToShow(), getMaxActiveDiskLadderStep() (+23 more)

### Community 91 - "formatMemoryAmount"
Cohesion: 0.16
Nodes (20): flooredBitsLabel(), floorToDecimals(), formatBitsInNearestSiUnit(), formatBitsInNearestUnit(), formatDiskSizeBare(), formatDiskSizeInPoolUnit(), formatDiskSizeStable(), formatMemoryAmount() (+12 more)

### Community 93 - "check-graphify-freshness.mjs"
Cohesion: 0.26
Nodes (9): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+1 more)

### Community 94 - "Button/index.jsx"
Cohesion: 0.20
Nodes (10): ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, progressFill() (+2 more)

### Community 98 - "applyDevGameStateJson"
Cohesion: 0.31
Nodes (9): createEmptyDataLakes(), createEmptyDataLakeTier(), applyDevGameStateJson(), getLegacyPendingTransferCount(), isLegacyDataLakeTier(), isPlainObject(), mergeDataLakes(), mergeStateForDevWrite() (+1 more)

### Community 100 - "upgradePoolCapacity"
Cohesion: 0.21
Nodes (12): eraseAllComputeTokens(), isMemoryCapacityAtCap(), isMemoryCapacityUpgradeArmable(), isMemoryCapacityUpgradeAvailable(), isPoolCapacityUpgradeAvailable(), isStorageUnlocked(), latchMainGameUnlocked(), pickIntroCapacityMilestone() (+4 more)

### Community 101 - "listSaveSlots"
Cohesion: 0.60
Nodes (5): buildDefaultMeta(), coerceMeta(), defaultSlotName(), listSaveSlots(), withSupporterSlots()

### Community 102 - "isDiskPullEligible"
Cohesion: 0.38
Nodes (7): getDiskRedeemTierName(), getDiskRequiredTierLevel(), getMatchingTierForDiskSize(), isDiskPullEligible(), isDiskStrandedByAdvancedTier(), pullDiskForCurrentLevel(), tickDiskPull()

### Community 108 - "StoragePage/index.jsx"
Cohesion: 0.40
Nodes (4): Header, RootDiv, StoragePage(), Title

### Community 110 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.33
Nodes (6): VisuallyHidden, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), formatOfflineDuration()

### Community 113 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

## Knowledge Gaps
- **752 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+747 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `Design history & rationale` to `Economy model`, `Testing`, `Automation workflows`, `Tens`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 27 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 27 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _752 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.03831168831168831 - nodes in this community are weakly interconnected._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08866995073891626 - nodes in this community are weakly interconnected._