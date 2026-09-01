# Graph Report - tens  (2026-09-01)

## Corpus Check
- 107 files · ~364,748 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1505 nodes · 3778 edges · 102 communities (78 shown, 16 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 82 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5b2a8a1f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ByteFoundryPage/index.jsx
- MainPage/index.jsx
- layers.js
- ByteFoundryPage
- tokens.js
- InfoPage/index.jsx
- devDependencies
- Economy model
- getStoragePoolBandwidth
- What You Must Do When Invoked
- jsconfig.json
- generate-pwa-icons.mjs
- session-start.sh
- autobuyer-reload.e2e.js
- engine.js
- capacitorConfig.test.js
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
- engine.test.js
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
- App.jsx
- ComputeFlopsPage/index.jsx
- App.test.jsx
- MilestonesPage/index.jsx
- development
- SettingsPage/index.jsx
- ComputePage
- Button/index.jsx
- scripts
- DiskArrayRow/index.jsx
- StatCard/index.js
- bump-version.mjs
- MainPage
- clampNonNegative
- run-simulation.mjs
- DevModePage/index.jsx
- navAttention.test.js
- AppNav/index.jsx
- contrast.js
- DataLakePanel/index.jsx
- isMemoryCapacityUpgradeAvailable
- buyTickspeedMultiplier
- Testing
- Era ascension and Eons (#407)
- sentinel.md
- palette.md
- Design history & rationale
- package.json
- tickGame
- backlog-issue-hygiene.sh
- bolt.md
- epic-407-issue-hygiene.sh
- getPrestigePointsAwarded
- navAttention.js
- TIER_DEFINITIONS
- tickComputeMergeBoundary
- sync-release-milestones.sh
- adversarialReviewMarker.js
- INTRO_COMPUTE_CORE_UNLOCK_CAPACITY
- publish-strategy.sh
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- pr-low-risk-eligible.test.js
- getUnlockedStoragePoolCount
- Issue tracking for interactive sessions
- Tier production tickspeed
- Documentation
- isTierUnlocked

## God Nodes (most connected - your core abstractions)
1. `clampNonNegative()` - 72 edges
2. `useIncrementalGame()` - 69 edges
3. `Economy model` - 56 edges
4. `tickGame()` - 51 edges
5. `MainPage()` - 49 edges
6. `isProductionFrozen()` - 36 edges
7. `Testing` - 34 edges
8. `ByteFoundryPage()` - 29 edges
9. `ComputePage()` - 26 edges
10. `createInitialGameState()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `seedDataLakeSave()` --calls--> `createInitialGameState()`  [EXTRACTED]
  e2e/data-lake.e2e.js → src/game/engine.js
- `actFoundry()` --calls--> `combineIntroByte()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `isBandwidthAvailable()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `isDiskRedeemable()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `pickIntroCapacityMilestone()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (102 total, 16 thin omitted)

### Community 0 - "ByteFoundryPage/index.jsx"
Cohesion: 0.07
Nodes (31): flooredBitsLabel(), floorToDecimals(), formatBitsInNearestSiUnit(), formatBitsInNearestUnit(), formatMemoryAmount(), getMemoryUnit(), getSiByteUnit(), BITS_PER_BYTE (+23 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (57): OfflineProgressNotice(), formatOfflineDuration(), GLOBAL_TICKSPEED_PRODUCTION_STEP, BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment (+49 more)

### Community 2 - "layers.js"
Cohesion: 0.05
Nodes (54): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_FLOPS_TIER_BY_ID (+46 more)

### Community 3 - "ByteFoundryPage"
Cohesion: 0.15
Nodes (26): applyIntroProductionDoublingToIntro(), combineIntroByte(), getComputeBandwidthSacrificeField(), getComputeBandwidthSacrificeLabel(), getDiskCost(), getDiskSize(), getEffectiveComputeBandwidthSacrificeIndex(), getIntroProductionMilestoneCost() (+18 more)

### Community 4 - "tokens.js"
Cohesion: 0.13
Nodes (15): GlobalStyle, getSystemThemeMode(), ThemeProvider(), buildTheme(), DEFAULT_MODE, font, MODES, motion (+7 more)

### Community 5 - "InfoPage/index.jsx"
Cohesion: 0.10
Nodes (20): CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, COMPUTE_MERGE_RESERVE_CAP, COMPUTE_MERGE_STEP_MULTIPLIER (+12 more)

### Community 6 - "devDependencies"
Cohesion: 0.08
Nodes (25): @capacitor/cli, jsdom, devDependencies, @capacitor/cli, jsdom, @playwright/test, sharp, @testing-library/dom (+17 more)

### Community 7 - "Economy model"
Cohesion: 0.04
Nodes (56): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+48 more)

### Community 8 - "getStoragePoolBandwidth"
Cohesion: 0.16
Nodes (19): canStartDiskWriteCacheMerge(), decrementFullDiskCount(), getDecadePowerEquivalentBits(), getDiskReadCacheFlushSeconds(), getDiskWriteCacheFlushSeconds(), getDiskWriteCacheSegmentSeconds(), getIntroProductionRate(), getNextDiskLadderSize() (+11 more)

### Community 9 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 10 - "jsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, baseUrl, include, src

### Community 11 - "generate-pwa-icons.mjs"
Cohesion: 0.29
Nodes (4): faviconSizes, faviconSvg, GRADIENT_STOPS, targets

### Community 15 - "engine.js"
Cohesion: 0.06
Nodes (60): applyOfflineProgress(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, canForfeitComputeBoost(), captureFoundryUpgradeCaps(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, DATA_LAKE_SUB_SIZE_TOTAL (+52 more)

### Community 16 - "capacitorConfig.test.js"
Cohesion: 0.38
Nodes (3): root, srcPath, createViteConfig()

### Community 17 - "Automation workflows"
Cohesion: 0.15
Nodes (13): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning, PR follow-up (`autonomous-pr-followup.yml`) — security reasoning (+5 more)

### Community 22 - "[Unreleased]"
Cohesion: 0.06
Nodes (31): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+23 more)

### Community 23 - "Economy model reference"
Cohesion: 0.13
Nodes (15): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Game state shape, Key engine functions (`src/game/engine.js`), Offline progress, Overclock (+7 more)

### Community 24 - "CLAUDE.md"
Cohesion: 0.10
Nodes (20): Architecture, Automation workflows, Capacitor foundation (in progress — #70), Commands, Dev Mode, Economy model, End-to-end testing, Funding (+12 more)

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
Cohesion: 0.22
Nodes (8): Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Cursor-powered successor engine, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Orchestration model, PR follow-up (`autonomous-pr-followup.yml`), Scheduled maintenance (`autonomous-maintenance.yml`)

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

### Community 39 - "engine.test.js"
Cohesion: 0.05
Nodes (22): clearIntroCapacityUpgradeQueue(), getComputeBoostMultiplier(), getNextSiDoubledValue(), isAnyComputeMergeInFlight(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable() (+14 more)

### Community 48 - "useIncrementalGame"
Cohesion: 0.09
Nodes (61): allResourceIds(), applyFlopsAutobuyerMilestones(), buildEraIntroReset(), createEmptyDataLakes(), createInitialGameState(), eraGame(), normalizePoolMemoryCapacity(), prestigeGame() (+53 more)

### Community 49 - "dependencies"
Cohesion: 0.12
Nodes (17): @capacitor/core, @fontsource/inter, @fontsource/space-grotesk, dependencies, @capacitor/core, @fontsource/inter, @fontsource/space-grotesk, react (+9 more)

### Community 50 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (31): COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostRow, canMerge(), CompactButton (+23 more)

### Community 51 - "App.jsx"
Cohesion: 0.14
Nodes (19): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon, MenuButton (+11 more)

### Community 52 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.11
Nodes (28): Money, buyComputeFlopsTier(), canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierProductionMultiplier() (+20 more)

### Community 53 - "App.test.jsx"
Cohesion: 0.09
Nodes (19): seedState(), ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), applyAutobuyerMilestones(), getTierTickspeedAutobuyerMilestone(), AUTO_PRESTIGE_AUTOBUYER_COST, COMPUTE_BOOST_MAX_STACKS (+11 more)

### Community 54 - "MilestonesPage/index.jsx"
Cohesion: 0.16
Nodes (14): getAutobuyerUnlockMilestone(), getFlopsAutobuyerUnlockEra(), isEraEligible(), ERA_ELIGIBILITY_PP, Badge, Category, CategoryHeading, Header (+6 more)

### Community 55 - "development"
Cohesion: 0.22
Nodes (9): browserslist, development, production, >0.2%, last 1 chrome version, last 1 firefox version, last 1 safari version, not dead (+1 more)

### Community 57 - "SettingsPage/index.jsx"
Cohesion: 0.12
Nodes (19): getEonsAwarded(), MUSEUM_PIN_CAP, buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote (+11 more)

### Community 58 - "ComputePage"
Cohesion: 0.15
Nodes (25): actFoundry(), activateComputeBoost(), canActivateComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), canStartBoosterTransfer(), convertIntroBitsToKilobytes(), doubleDataLakeCapacity() (+17 more)

### Community 59 - "Button/index.jsx"
Cohesion: 0.14
Nodes (17): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+9 more)

### Community 60 - "scripts"
Cohesion: 0.10
Nodes (18): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid, scripts, audit (+10 more)

### Community 61 - "DiskArrayRow/index.jsx"
Cohesion: 0.08
Nodes (44): CacheBlock, CacheBlocksRow, CacheFlushFill, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, manualPulse (+36 more)

### Community 62 - "StatCard/index.js"
Cohesion: 0.15
Nodes (12): Actions, Body, Card, ConfirmDialog(), Overlay, Title, Body, Card (+4 more)

### Community 63 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 64 - "MainPage"
Cohesion: 0.16
Nodes (22): countGlobalTickspeedMilestones(), formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier() (+14 more)

### Community 65 - "clampNonNegative"
Cohesion: 0.25
Nodes (18): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyComputeAutoBoost(), buyHyperscaler(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus(), buySmartAutobuyer() (+10 more)

### Community 66 - "run-simulation.mjs"
Cohesion: 0.10
Nodes (25): actMainBuys(), actPlayer(), actSoftResets(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+17 more)

### Community 67 - "DevModePage/index.jsx"
Cohesion: 0.12
Nodes (20): PRESTIGE_THRESHOLD, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow (+12 more)

### Community 68 - "navAttention.test.js"
Cohesion: 0.21
Nodes (12): isStorageUnlocked(), TICKSPEED_AUTOBUYER_COST, ATTENTION_NORMAL, getComputeFlopsAttentionLevel(), getNavAttention(), getStorageAttentionLevel(), hasAffordableComputeFlopsTier(), hasStorageAttention() (+4 more)

### Community 69 - "AppNav/index.jsx"
Cohesion: 0.20
Nodes (9): APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem, pulseHigh (+1 more)

### Community 70 - "contrast.js"
Cohesion: 0.38
Nodes (7): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear()

### Community 71 - "DataLakePanel/index.jsx"
Cohesion: 0.09
Nodes (45): BalanceText, BareDivider, clampPercent(), DataLakePanel(), FillableStatCard, getVisibleLakeTierIndexes(), LakeActionsRow, LakeBlock (+37 more)

### Community 72 - "isMemoryCapacityUpgradeAvailable"
Cohesion: 0.25
Nodes (9): eraseAllComputeTokens(), isMemoryCapacityAtCap(), isMemoryCapacityUpgradeAvailable(), isPoolCapacityUpgradeAvailable(), queueIntroCapacityUpgrade(), rewindOneIntroProductionClaim(), rollbackComputeFundedBandwidth(), tickQueuedCapacityUpgrade() (+1 more)

### Community 73 - "buyTickspeedMultiplier"
Cohesion: 0.39
Nodes (8): actTickspeed(), buyTickspeedMultiplier(), consumeXpForLastTierTickspeed(), getLastTierId(), getLastTierXpTickspeedMinConsumption(), getTickspeedMultiplierBaseCost(), getTickspeedMultiplierCost(), isLastTierTickspeedXpUnlocked()

### Community 74 - "Testing"
Cohesion: 0.06
Nodes (34): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap (+26 more)

### Community 75 - "Era ascension and Eons (#407)"
Cohesion: 0.25
Nodes (8): Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 76 - "sentinel.md"
Cohesion: 0.40
Nodes (4): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs., 2026-08-29 - Prototype Pollution in Dev Mode Field Editing

### Community 77 - "palette.md"
Cohesion: 0.50
Nodes (3): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2025-01-31 - Focus Visible Styles for custom trigger elements

### Community 78 - "Design history & rationale"
Cohesion: 0.17
Nodes (12): Architecture / MainPage UI decisions, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale, Distribution, Documentation, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Sacrifice confirm: in-game dialog; Core warning only when unlocked (+4 more)

### Community 79 - "package.json"
Cohesion: 0.33
Nodes (5): name, packageManager, private, type, version

### Community 80 - "tickGame"
Cohesion: 0.17
Nodes (22): wouldAutobuyerStall(), buyTier(), buyTierQuantity(), getAutoPrestigeAttemptRate(), getCostEpochExponent(), getPrestigeProductionMultiplier(), getPurchaseBlockSize(), getPurchaseMilestoneMultiplier() (+14 more)

### Community 81 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 83 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 84 - "getPrestigePointsAwarded"
Cohesion: 0.36
Nodes (8): checkMilestones(), getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp(), getPrestigePpEarnProgressPercent(), getPrestigePpPerPower(), getPrestigeProgressPercent()

### Community 85 - "navAttention.js"
Cohesion: 0.12
Nodes (32): enableAutoMerge(), getAutobuyerUnlockCost(), getIntroKilobyteConversionCost(), getSmartAutobuyerCost(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable() (+24 more)

### Community 86 - "TIER_DEFINITIONS"
Cohesion: 0.40
Nodes (4): COMPUTE_FLOPS_TIER_DEFINITIONS, TIER_DEFINITIONS, FLOPS_TIER_NAME_BY_ID, TIER_NAME_BY_ID

### Community 87 - "tickComputeMergeBoundary"
Cohesion: 0.14
Nodes (15): getComputeMergeDurationSeconds(), getCoreEarnTimeSeconds(), startComputeMergeReserve(), startComputeMergeReserveAtBoundary(), tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer() (+7 more)

### Community 88 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 89 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 90 - "INTRO_COMPUTE_CORE_UNLOCK_CAPACITY"
Cohesion: 0.50
Nodes (3): seedDataLakeSave(), DISK_ARRAY_LADDER_CAP, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY

### Community 97 - "getUnlockedStoragePoolCount"
Cohesion: 0.24
Nodes (11): getPoolCapacityUnlockThresholdBits(), getPoolLastDiskSize(), getStoragePoolCount(), getUnlockedStoragePoolCount(), getVisibleStoragePoolCount(), isAnyDataLakeCapacityDoublingAvailable(), isIdleDiskLiquidationAvailable(), isIdleDiskLiquidationTurnAvailable() (+3 more)

### Community 100 - "Issue tracking for interactive sessions"
Cohesion: 0.67
Nodes (3): Cursor Cloud GitHub access, GitHub Milestones (release grouping), Issue tracking for interactive sessions

### Community 101 - "Tier production tickspeed"
Cohesion: 0.67
Nodes (3): Multiplier outcomes are floored, Production figure (tick-progress ring removed), Tier production tickspeed

### Community 103 - "isTierUnlocked"
Cohesion: 0.29
Nodes (10): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), isGlobalTickspeedMultiplierUnlocked(), isTierUnlocked(), hasAffordableFullLevel(), hasAffordableGlobalTickspeed(), hasOverclockAvailable(), hasSpeedUpAvailable() (+2 more)

## Knowledge Gaps
- **606 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+601 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 682 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `Design history & rationale` to `Automation workflows`, `Testing`, `README.md`, `Economy model`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 25 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 25 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _606 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ByteFoundryPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07056451612903226 - nodes in this community are weakly interconnected._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.034482758620689655 - nodes in this community are weakly interconnected._