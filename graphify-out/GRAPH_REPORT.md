# Graph Report - tens  (2026-09-16)

## Corpus Check
- 108 files · ~454,818 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .ico 1)

## Summary
- 1628 nodes · 4057 edges · 92 communities (72 shown, 18 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 83 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `03e89f74`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Testing
- MainPage/index.jsx
- Economy model
- layers.js
- navAttention.js
- ComputePage/index.jsx
- ByteFoundryPage/index.jsx
- clampNonNegative
- engine.js
- DiskArrayRow/index.jsx
- DataLakePanel/index.jsx
- App.jsx
- DataLakePanel
- Design history & rationale
- ComputeFlopsPage/index.jsx
- Automation workflows
- Distribution
- tickGame
- run-simulation.mjs
- App.test.jsx
- What You Must Do When Invoked
- bump-version.mjs
- DevModePage/index.jsx
- Button/index.jsx
- storage.js
- tokens.js
- AGENTS.md
- Documentation
- SettingsPage/index.jsx
- MainPage
- getPrestigePointsAwarded
- CLAUDE.md
- ComputePage
- Save persistence
- MilestonesPage/index.jsx
- getStoragePoolCount
- package.json
- Economy model reference
- engine.test.js
- [Unreleased]
- contrast.js
- devDependencies
- Shared components reference
- scripts
- actFoundry
- Tens
- InfoPage/index.jsx
- Procedure
- Automation workflows
- vitest
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- Era ascension and Eons (#407)
- generate-pwa-icons.mjs
- formatCurrency
- ByteFoundryPage
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- graphify reference: query, path, explain
- simulate-run-times/SKILL.md
- palette.md
- sentinel.md
- resolutions
- sync-release-milestones.sh
- adversarialReviewMarker.js
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- pull_request_template.md
- jsconfig.json
- AppMenu/index.jsx
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- publish-strategy.sh
- Copilot Instructions
- bolt.md
- browserslist
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- pr-low-risk-eligible.test.js
- graphify
- session-start.sh
- extraction-spec.md
- MAINPAGE_REFERENCE.md
- PWA_REFERENCE.md
- THEMING_REFERENCE.md

## God Nodes (most connected - your core abstractions)
1. `Testing` - 81 edges
2. `clampNonNegative()` - 72 edges
3. `useIncrementalGame()` - 71 edges
4. `Economy model` - 56 edges
5. `tickGame()` - 51 edges
6. `MainPage()` - 50 edges
7. `isProductionFrozen()` - 36 edges
8. `ByteFoundryPage()` - 35 edges
9. `Design history & rationale` - 33 edges
10. `DataLakePanel()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `actFoundry()` --calls--> `activateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `buyBooster()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `canActivateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `convertIntroBitsToKilobytes()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `fillDataLakeManually()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (92 total, 18 thin omitted)

### Community 0 - "Testing"
Cohesion: 0.02
Nodes (81): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent (+73 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (61): OfflineProgressNotice(), formatOfflineDuration(), GLOBAL_TICKSPEED_PRODUCTION_STEP, BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment (+53 more)

### Community 2 - "Economy model"
Cohesion: 0.04
Nodes (56): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+48 more)

### Community 3 - "layers.js"
Cohesion: 0.05
Nodes (55): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_BOOST_TIER_FIELDS (+47 more)

### Community 4 - "navAttention.js"
Cohesion: 0.12
Nodes (36): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), getOverclockRequirement(), getScaleUpRequirement(), isComputeCoreConversionUnlocked(), isComputeFlopsPageRevealed(), isGlobalTickspeedMultiplierUnlocked(), isIntroConversionUnlocked() (+28 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (33): COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_PRESETS, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RATIO, ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow (+25 more)

### Community 6 - "ByteFoundryPage/index.jsx"
Cohesion: 0.05
Nodes (53): flooredBitsLabel(), floorToDecimals(), formatBitsInNearestSiUnit(), formatBitsInNearestUnit(), formatDiskSizeBare(), formatDiskSizeInPoolUnit(), formatDiskSizeStable(), formatMemoryAmount() (+45 more)

### Community 7 - "clampNonNegative"
Cohesion: 0.14
Nodes (31): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoScaleUp(), buyComputeAutoBoost(), buyComputeFlopsTier(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus(), buySmartAutobuyer() (+23 more)

### Community 8 - "engine.js"
Cohesion: 0.05
Nodes (66): applyOfflineProgress(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, buyHyperscaler(), canBuyHyperscaler(), canForfeitComputeBoost(), captureFoundryUpgradeCaps(), clearDiskBuildQueue() (+58 more)

### Community 9 - "DiskArrayRow/index.jsx"
Cohesion: 0.07
Nodes (41): CacheBlock, CacheBlocksRow, CacheFillIndicator, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, pullPulse (+33 more)

### Community 10 - "DataLakePanel/index.jsx"
Cohesion: 0.09
Nodes (22): ActionButton, BareDivider, clampFraction(), LakeActionsRow, LakeBlock, LakeHeaderRow, LakePoolFill, LakePoolLabel (+14 more)

### Community 11 - "App.jsx"
Cohesion: 0.10
Nodes (24): react, web-vitals, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), APP_NAV_BOTTOM_PAD, AppNav() (+16 more)

### Community 12 - "DataLakePanel"
Cohesion: 0.15
Nodes (36): DataLakePanel(), getVisibleLakeTierIndexes(), applyDataLakeOverflow(), buyBooster(), decomposeDataLakeUnits(), doubleDataLakeCapacity(), fillDataLakeDisks(), fillDataLakeManually() (+28 more)

### Community 13 - "Design history & rationale"
Cohesion: 0.07
Nodes (27): Architecture / MainPage UI decisions, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale (+19 more)

### Community 14 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.15
Nodes (17): styled-components, Money, formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_REVEAL_PP, ComputeFlopsPage() (+9 more)

### Community 15 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 17 - "tickGame"
Cohesion: 0.26
Nodes (19): actMainBuys(), wouldAutobuyerStall(), buyTier(), buyTierQuantity(), getCostEpochExponent(), getIntroKilobyteConversionCost(), getPurchaseBlockSize(), getTierAffordableQuantity() (+11 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.11
Nodes (25): actPlayer(), actSoftResets(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+17 more)

### Community 19 - "App.test.jsx"
Cohesion: 0.09
Nodes (18): ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_CORES_PER_NODE, DATA_LAKE_CAPACITY_MAX_LEVEL, DATA_LAKE_OVERFLOW_MAX_PERCENT (+10 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 22 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (24): COMPUTE_FLOPS_TIER_DEFINITIONS, PRESTIGE_THRESHOLD, TIER_DEFINITIONS, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel (+16 more)

### Community 23 - "Button/index.jsx"
Cohesion: 0.14
Nodes (17): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+9 more)

### Community 24 - "storage.js"
Cohesion: 0.07
Nodes (76): seedDataLakeSave(), allResourceIds(), applyFlopsAutobuyerMilestones(), buildEraIntroReset(), createEmptyDataLakes(), createEmptyDataLakeTier(), createInitialGameState(), eraGame() (+68 more)

### Community 25 - "tokens.js"
Cohesion: 0.14
Nodes (14): GlobalStyle, getSystemThemeMode(), ThemeProvider(), buildTheme(), DEFAULT_MODE, font, MODES, motion (+6 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.08
Nodes (22): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Byte Foundry, Changelog convention (+14 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.09
Nodes (22): Actions, Body, Card, ConfirmDialog(), Overlay, Title, StatCard, MUSEUM_PIN_CAP (+14 more)

### Community 29 - "MainPage"
Cohesion: 0.17
Nodes (18): buyTickspeedMultiplier(), getAutoPrestigeAttemptRate(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier(), getLastTierId(), getLastTierXpTickspeedMultiplier(), getNextBytePowerProgressFraction(), getOverclockMultiplier() (+10 more)

### Community 30 - "getPrestigePointsAwarded"
Cohesion: 0.36
Nodes (8): checkMilestones(), getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp(), getPrestigePpEarnProgressPercent(), getPrestigePpPerPower(), getPrestigeProgressPercent()

### Community 31 - "CLAUDE.md"
Cohesion: 0.08
Nodes (25): AI-instruction file cost hygiene, Architecture, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Dev Mode, Documentation (+17 more)

### Community 32 - "ComputePage"
Cohesion: 0.18
Nodes (22): activateComputeBoost(), canActivateComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), getBiggestComputeTierWaitingOnMerge(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), getComputeBoostTierMultiplier() (+14 more)

### Community 34 - "MilestonesPage/index.jsx"
Cohesion: 0.17
Nodes (12): isEraEligible(), ERA_ELIGIBILITY_PP, Badge, Category, CategoryHeading, Header, List, MilestonesPage() (+4 more)

### Community 35 - "getStoragePoolCount"
Cohesion: 0.14
Nodes (20): getDataLakeCapacityUnlockArraySize(), getDataLakeSubSizeStep(), getDecadePowerEquivalentBits(), getDiskLadderSizeBits(), getDiskLadderStep(), getDiskSizeForTierLevel(), getMaxActiveDiskLadderStep(), getNextDiskLadderSize() (+12 more)

### Community 36 - "package.json"
Cohesion: 0.11
Nodes (17): name, packageManager, private, type, version, @capacitor/cli, @capacitor/core, fast-check (+9 more)

### Community 37 - "Economy model reference"
Cohesion: 0.11
Nodes (18): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Game state shape, Key engine functions (`src/game/engine.js`), Multiplier outcomes are floored, Offline progress (+10 more)

### Community 38 - "engine.test.js"
Cohesion: 0.03
Nodes (49): clearIntroCapacityUpgradeQueue(), enableAutoMerge(), getAutobuyerUnlockCost(), getComputeMergeDurationSeconds(), getCoreEarnTimeSeconds(), getNextSiDoubledValue(), getTickspeedMultiplierBaseCost(), getTierProductionProgressPercent() (+41 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.05
Nodes (36): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+28 more)

### Community 40 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "Shared components reference"
Cohesion: 0.17
Nodes (11): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `ByteFoundryPage` pool layout, `ConfirmDialog/index.jsx`, `DiskArrayRow/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js` (+3 more)

### Community 43 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 44 - "actFoundry"
Cohesion: 0.20
Nodes (18): actFoundry(), combineIntroByte(), eraseAllComputeTokens(), getDiskProvisionPassesCollected(), getDiskReplayPassAllowance(), getDiskSize(), isDiskBuildBelowCap(), isMemoryCapacityUpgradeAvailable() (+10 more)

### Community 45 - "Tens"
Cohesion: 0.17
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes, Tens

### Community 46 - "InfoPage/index.jsx"
Cohesion: 0.09
Nodes (21): TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, COMPUTE_MERGE_RESERVE_CAP (+13 more)

### Community 47 - "Procedure"
Cohesion: 0.20
Nodes (9): 1. Establish scope, 2. Load the repo's invariants, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure (+1 more)

### Community 48 - "Automation workflows"
Cohesion: 0.20
Nodes (9): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Orchestration model, PR follow-up (`autonomous-pr-followup.yml`), PR review & testing cadence (+1 more)

### Community 49 - "vitest"
Cohesion: 0.22
Nodes (7): vite, vite-plugin-pwa, @vitejs/plugin-react, vitest, root, srcPath, createViteConfig()

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 51 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 52 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, @capacitor/core, @fontsource/inter, @fontsource/space-grotesk, react, react-dom, react-is, styled-components (+1 more)

### Community 53 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 54 - "file-task-issue/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 55 - "Era ascension and Eons (#407)"
Cohesion: 0.25
Nodes (8): Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.25
Nodes (5): sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, targets

### Community 57 - "formatCurrency"
Cohesion: 0.42
Nodes (9): formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), RESOURCE_SYMBOL(), formatCost(), buildSparklinePath() (+1 more)

### Community 58 - "ByteFoundryPage"
Cohesion: 0.09
Nodes (36): canStartDiskWriteCacheMerge(), decrementFullDiskCount(), formatDiskSize, getComputeBoostMultiplier(), getDataLakeOverflowRatePercent(), getDataStreamBaseMultiplierPercent(), getDataStreamEffectMultiplier(), getDataStreamFillFraction() (+28 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.29
Nodes (6): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 5. Authorization boundary, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 65 - "simulate-run-times/SKILL.md"
Cohesion: 0.33
Nodes (5): Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run

### Community 66 - "palette.md"
Cohesion: 0.33
Nodes (5): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2026-09-04 - Focus Visible Styles for styled native summary elements, 2026-09-06 - Focus Visible Styles for custom interactive components and Disclosure summary elements

### Community 67 - "sentinel.md"
Cohesion: 0.33
Nodes (5): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs., 2026-08-29 - Prototype Pollution in Dev Mode Field Editing

### Community 68 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 73 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 74 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 75 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "AppMenu/index.jsx"
Cohesion: 0.29
Nodes (6): AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle

### Community 85 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

## Knowledge Gaps
- **710 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+705 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 785 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `styled-components` connect `ComputeFlopsPage/index.jsx` to `MainPage/index.jsx`, `MilestonesPage/index.jsx`, `package.json`, `ComputePage/index.jsx`, `ByteFoundryPage/index.jsx`, `DiskArrayRow/index.jsx`, `DataLakePanel/index.jsx`, `App.jsx`, `AppMenu/index.jsx`, `InfoPage/index.jsx`, `DevModePage/index.jsx`, `Button/index.jsx`, `tokens.js`, `SettingsPage/index.jsx`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `Design history & rationale` to `Testing`, `Save persistence`, `Economy model`, `Tens`, `Automation workflows`, `Distribution`, `Documentation`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `Testing` connect `Testing` to `Design history & rationale`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 26 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 26 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _710 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Testing` be split into smaller, more focused modules?**
  _Cohesion score 0.024691358024691357 - nodes in this community are weakly interconnected._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.03379416282642089 - nodes in this community are weakly interconnected._