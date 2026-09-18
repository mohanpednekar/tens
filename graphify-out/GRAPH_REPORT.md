# Graph Report - tens  (2026-09-18)

## Corpus Check
- 112 files · ~463,386 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .ico 1)

## Summary
- 1656 nodes · 4102 edges · 103 communities (79 shown, 21 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 83 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `12941e8b`
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
- Automation workflows
- engine.js
- DiskArrayRow/index.jsx
- DataLakePanel/index.jsx
- prestigeGame
- isDiskPullEligible
- Design history & rationale
- ComputeFlopsPage/index.jsx
- contrast.js
- navAttention.test.js
- test-isolation.cjs
- run-simulation.mjs
- App.test.jsx
- What You Must Do When Invoked
- bump-version.mjs
- DevModePage/index.jsx
- Button/index.jsx
- storage.js
- tokens.js
- AGENTS.md
- App.jsx
- SettingsPage/index.jsx
- MainPage
- clampNonNegative
- CLAUDE.md
- getStoragePoolCount
- buyGlobalTickspeedMultiplier
- MilestonesPage/index.jsx
- TIER_DEFINITIONS
- package.json
- Economy model reference
- engine.test.js
- [Unreleased]
- Era ascension and Eons (#407)
- devDependencies
- Shared components reference
- scripts
- isMemoryCapacityUpgradeAvailable
- Tens
- InfoPage/index.jsx
- Procedure
- Automation workflows
- capacitorConfig.test.js
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- getDiskSizesToShow
- generate-pwa-icons.mjs
- ByteFoundryPage
- formatMemoryAmount
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- tickComputeMergeBoundary
- graphify reference: query, path, explain
- simulate-run-times/SKILL.md
- palette.md
- sentinel.md
- resolutions
- sync-release-milestones.sh
- adversarialReviewMarker.js
- AppMenu/index.jsx
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- pull_request_template.md
- jsconfig.json
- styled-components
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- publish-strategy.sh
- Copilot Instructions
- bolt.md
- browserslist
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- pr-low-risk-eligible.test.js
- fix-scale-up-test.cjs
- ComputePage
- graphify
- session-start.sh
- extraction-spec.md
- MAINPAGE_REFERENCE.md
- PWA_REFERENCE.md
- THEMING_REFERENCE.md
- Tier production tickspeed
- submit.cjs
- test-all.cjs
- Documentation
- Testing
- Issue tracking for interactive sessions

## God Nodes (most connected - your core abstractions)
1. `Testing` - 82 edges
2. `clampNonNegative()` - 72 edges
3. `useIncrementalGame()` - 69 edges
4. `Economy model` - 56 edges
5. `tickGame()` - 51 edges
6. `MainPage()` - 50 edges
7. `isProductionFrozen()` - 36 edges
8. `ByteFoundryPage()` - 35 edges
9. `Design history & rationale` - 35 edges
10. `createInitialGameState()` - 25 edges

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

## Communities (103 total, 21 thin omitted)

### Community 0 - "Testing"
Cohesion: 0.02
Nodes (82): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent (+74 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (60): GLOBAL_TICKSPEED_PRODUCTION_STEP, PURCHASE_MILESTONE_MULTIPLIER_BASE, BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill (+52 more)

### Community 2 - "Economy model"
Cohesion: 0.04
Nodes (56): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+48 more)

### Community 3 - "layers.js"
Cohesion: 0.06
Nodes (53): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_BOOST_TIER_FIELDS (+45 more)

### Community 4 - "navAttention.js"
Cohesion: 0.09
Nodes (40): enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+32 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.07
Nodes (29): ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostRow, canMerge(), CompactButton, COMPUTE_BOOST_DISPLAY (+21 more)

### Community 6 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (34): getDataLakeOverflowRatePercent(), getMemoryUnit(), ActionsRow, BalanceSeparator, BalanceText, BarFillBase, BarFillBonus, BarFillLake (+26 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "engine.js"
Cohesion: 0.05
Nodes (73): applyOfflineProgress(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, buyHyperscaler(), canBuyHyperscaler(), clearDiskBuildQueue(), clearIntroCapacityUpgradeQueue(), COMPUTE_MERGE_TIMER_FIELDS (+65 more)

### Community 9 - "DiskArrayRow/index.jsx"
Cohesion: 0.12
Nodes (24): CacheBlock, CacheBlocksRow, CacheFillIndicator, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, pullPulse (+16 more)

### Community 10 - "DataLakePanel/index.jsx"
Cohesion: 0.09
Nodes (57): ActionButton, BareDivider, clampFraction(), DataLakePanel(), getVisibleLakeTierIndexes(), LakeBlock, LakeHeaderRow, LakePoolFill (+49 more)

### Community 11 - "prestigeGame"
Cohesion: 0.21
Nodes (12): seedState(), applyAutobuyerMilestones(), checkMilestones(), getAutobuyerUnlockMilestone(), getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp() (+4 more)

### Community 12 - "isDiskPullEligible"
Cohesion: 0.47
Nodes (6): getDiskRedeemTierName(), getMatchingTierForDiskSize(), getRelevantDiskSizesForFoundry(), isDiskPullEligible(), pullDiskForCurrentLevel(), tickDiskPull()

### Community 13 - "Design history & rationale"
Cohesion: 0.06
Nodes (35): Architecture / MainPage UI decisions, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03 (+27 more)

### Community 14 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.15
Nodes (20): buyComputeFlopsTier(), canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight(), getComputeFlopsTotal() (+12 more)

### Community 15 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 16 - "navAttention.test.js"
Cohesion: 0.11
Nodes (19): vitest, AUTO_SCALE_UP_COST, BYTES_ID, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE (+11 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.11
Nodes (39): actMainBuys(), actPlayer(), actSoftResets(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges (+31 more)

### Community 19 - "App.test.jsx"
Cohesion: 0.08
Nodes (21): version, ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS (+13 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 22 - "DevModePage/index.jsx"
Cohesion: 0.13
Nodes (19): ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow, Header (+11 more)

### Community 23 - "Button/index.jsx"
Cohesion: 0.13
Nodes (19): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+11 more)

### Community 24 - "storage.js"
Cohesion: 0.08
Nodes (71): seedDataLakeSave(), allResourceIds(), applyFlopsAutobuyerMilestones(), buildEraIntroReset(), createEmptyDataLakes(), createInitialGameState(), eraGame(), overclockGame() (+63 more)

### Community 25 - "tokens.js"
Cohesion: 0.14
Nodes (14): GlobalStyle, getSystemThemeMode(), ThemeProvider(), buildTheme(), DEFAULT_MODE, font, MODES, motion (+6 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.08
Nodes (22): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Byte Foundry, Changelog convention (+14 more)

### Community 27 - "App.jsx"
Cohesion: 0.11
Nodes (21): react, web-vitals, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), APP_NAV_BOTTOM_PAD, AppNav() (+13 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.12
Nodes (18): getEonsAwarded(), MUSEUM_PIN_CAP, buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem (+10 more)

### Community 29 - "MainPage"
Cohesion: 0.17
Nodes (21): formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getAutoPrestigeAttemptRate(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier() (+13 more)

### Community 30 - "clampNonNegative"
Cohesion: 0.15
Nodes (30): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoScaleUp(), buyComputeAutoBoost(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus(), buySmartAutobuyer(), buyTickspeedAutobuyer() (+22 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.10
Nodes (19): AI-instruction file cost hygiene, Architecture, Automation workflows, Capacitor foundation (in progress — #70), Commands, Dev Mode, Economy model, Funding (+11 more)

### Community 32 - "getStoragePoolCount"
Cohesion: 0.12
Nodes (21): canStartDiskWriteCacheMerge(), decrementFullDiskCount(), getDataLakeCapacityUnlockArraySize(), getDataLakeSubSize(), getDataLakeSubSizeStep(), getDataLakeTierIndex(), getDiskLadderSizeBits(), getDiskLadderStep() (+13 more)

### Community 33 - "buyGlobalTickspeedMultiplier"
Cohesion: 0.67
Nodes (4): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), isGlobalTickspeedMultiplierUnlocked(), hasAffordableGlobalTickspeed()

### Community 34 - "MilestonesPage/index.jsx"
Cohesion: 0.18
Nodes (13): getFlopsAutobuyerUnlockEra(), getTierTickspeedAutobuyerMilestone(), isEraEligible(), Badge, Category, CategoryHeading, Header, List (+5 more)

### Community 35 - "TIER_DEFINITIONS"
Cohesion: 0.40
Nodes (4): COMPUTE_FLOPS_TIER_DEFINITIONS, TIER_DEFINITIONS, FLOPS_TIER_NAME_BY_ID, TIER_NAME_BY_ID

### Community 36 - "package.json"
Cohesion: 0.12
Nodes (16): name, packageManager, private, type, @capacitor/cli, @capacitor/core, fast-check, @fontsource/inter (+8 more)

### Community 37 - "Economy model reference"
Cohesion: 0.13
Nodes (15): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Game state shape, Key engine functions (`src/game/engine.js`), Offline progress, Overclock (+7 more)

### Community 38 - "engine.test.js"
Cohesion: 0.05
Nodes (24): canForfeitComputeBoost(), captureFoundryUpgradeCaps(), forfeitComputeBoost(), getComputeBoostMultiplier(), getDataStreamBaseMultiplierPercent(), getDataStreamEffectMultiplier(), getDataStreamFillFraction(), getDataStreamMultiplierPercent() (+16 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.05
Nodes (36): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+28 more)

### Community 40 - "Era ascension and Eons (#407)"
Cohesion: 0.25
Nodes (8): Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "Shared components reference"
Cohesion: 0.17
Nodes (11): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `ByteFoundryPage` pool layout, `ConfirmDialog/index.jsx`, `DiskArrayRow/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js` (+3 more)

### Community 43 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 44 - "isMemoryCapacityUpgradeAvailable"
Cohesion: 0.25
Nodes (9): eraseAllComputeTokens(), isMemoryCapacityAtCap(), isMemoryCapacityUpgradeAvailable(), isPoolCapacityUpgradeAvailable(), latchMainGameUnlocked(), pickIntroCapacityMilestone(), queueIntroCapacityUpgrade(), tickQueuedCapacityUpgrade() (+1 more)

### Community 45 - "Tens"
Cohesion: 0.25
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes, Tens

### Community 46 - "InfoPage/index.jsx"
Cohesion: 0.08
Nodes (27): formatBitsInNearestUnit(), CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_ENTITY_AUTO_MERGE_CAP, COMPUTE_ENTITY_CAP, COMPUTE_FLOPS_LAST_TIER_COST_PP (+19 more)

### Community 47 - "Procedure"
Cohesion: 0.20
Nodes (9): 1. Establish scope, 2. Load the repo's invariants, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure (+1 more)

### Community 48 - "Automation workflows"
Cohesion: 0.20
Nodes (9): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Orchestration model, PR follow-up (`autonomous-pr-followup.yml`), PR review & testing cadence (+1 more)

### Community 49 - "capacitorConfig.test.js"
Cohesion: 0.24
Nodes (6): vite, vite-plugin-pwa, @vitejs/plugin-react, root, srcPath, createViteConfig()

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

### Community 55 - "getDiskSizesToShow"
Cohesion: 0.40
Nodes (5): getDiskSizesToShow(), Header, RootDiv, StoragePage(), Title

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.25
Nodes (5): sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, targets

### Community 58 - "ByteFoundryPage"
Cohesion: 0.13
Nodes (38): actFoundry(), combineIntroByte(), getDiskCost(), getDiskProvisionPassesCollected(), getDiskProvisionPassesRequired(), getDiskReadCacheFlushSeconds(), getDiskReplayPassAllowance(), getDiskSize() (+30 more)

### Community 59 - "formatMemoryAmount"
Cohesion: 0.18
Nodes (17): flooredBitsLabel(), floorToDecimals(), formatBitsInNearestSiUnit(), formatDiskSizeBare(), formatDiskSizeInPoolUnit(), formatDiskSizeStable(), formatMemoryAmount(), formatMemoryAmountStable() (+9 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.29
Nodes (6): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 5. Authorization boundary, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 63 - "tickComputeMergeBoundary"
Cohesion: 0.14
Nodes (15): getComputeMergeDurationSeconds(), getCoreEarnTimeSeconds(), startComputeMergeReserve(), startComputeMergeReserveAtBoundary(), tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer() (+7 more)

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 65 - "simulate-run-times/SKILL.md"
Cohesion: 0.33
Nodes (5): Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run

### Community 66 - "palette.md"
Cohesion: 0.20
Nodes (9): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements, 2026-09-06 - Focus Visible Styles for custom interactive components and Disclosure summary elements (+1 more)

### Community 67 - "sentinel.md"
Cohesion: 0.25
Nodes (7): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs., 2026-08-29 - Prototype Pollution in Dev Mode Field Editing

### Community 68 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 72 - "AppMenu/index.jsx"
Cohesion: 0.29
Nodes (6): AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle

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

### Community 78 - "styled-components"
Cohesion: 0.14
Nodes (14): styled-components, Actions, Body, Card, ConfirmDialog(), Overlay, Title, Body (+6 more)

### Community 84 - "bolt.md"
Cohesion: 0.50
Nodes (3): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent

### Community 85 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 91 - "ComputePage"
Cohesion: 0.16
Nodes (22): activateComputeBoost(), canActivateComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), getBiggestComputeTierWaitingOnMerge(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), getComputeBoostTierMultiplier() (+14 more)

### Community 102 - "Tier production tickspeed"
Cohesion: 0.67
Nodes (3): Multiplier outcomes are floored, Production figure (tick-progress ring removed), Tier production tickspeed

## Knowledge Gaps
- **724 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+719 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 803 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `styled-components` connect `styled-components` to `MainPage/index.jsx`, `MilestonesPage/index.jsx`, `package.json`, `ComputePage/index.jsx`, `ByteFoundryPage/index.jsx`, `AppMenu/index.jsx`, `DiskArrayRow/index.jsx`, `DataLakePanel/index.jsx`, `ComputeFlopsPage/index.jsx`, `InfoPage/index.jsx`, `getDiskSizesToShow`, `DevModePage/index.jsx`, `Button/index.jsx`, `tokens.js`, `App.jsx`, `SettingsPage/index.jsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `Design history & rationale` to `Testing`, `Economy model`, `README.md`, `Automation workflows`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 26 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 26 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _724 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Testing` be split into smaller, more focused modules?**
  _Cohesion score 0.024390243902439025 - nodes in this community are weakly interconnected._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.033844526705446853 - nodes in this community are weakly interconnected._