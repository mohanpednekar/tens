# Graph Report - tens  (2026-09-09)

## Corpus Check
- 108 files · ~438,490 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1605 nodes · 4027 edges · 96 communities (78 shown, 16 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4cf04763`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- tokens.js
- isProductionFrozen
- useIncrementalGame.js
- MainPage/index.jsx
- DataLakePanel/index.jsx
- layers.js
- navAttention.js
- ComputePage/index.jsx
- MainPage
- ByteFoundryPage/index.jsx
- getStoragePoolBandwidth
- run-simulation.mjs
- engine.js
- DiskArrayRow/index.jsx
- getPoolBufferCapacity
- bump-version.mjs
- App.test.jsx
- DevModePage/index.jsx
- tickComputeMergeBoundary
- styled-components
- actFoundry
- MilestonesPage/index.jsx
- InfoPage/index.jsx
- getPurchaseBlockSize
- ComputePage
- getPrestigePointsAwarded
- package.json
- provisionDisk
- engine.test.js
- clampNonNegative
- devDependencies
- scripts
- capacitorConfig.test.js
- SettingsPage/index.jsx
- ByteFoundryPage
- backlog-issue-hygiene.sh
- dependencies
- epic-407-issue-hygiene.sh
- OfflineProgressNotice/index.jsx
- storage.js
- generate-pwa-icons.mjs
- Button/index.jsx
- ComputeFlopsPage/index.jsx
- @playwright/test
- react
- pickIntroCapacityMilestone
- resetByteFoundry
- resolutions
- sync-release-milestones.sh
- adversarialReviewMarker.js
- jsconfig.json
- publish-strategy.sh
- browserslist
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- pr-low-risk-eligible.test.js
- session-start.sh
- Testing
- Economy model
- [Unreleased]
- AGENTS.md
- What You Must Do When Invoked
- CLAUDE.md
- Design history & rationale
- Distribution
- Economy model reference
- Automation workflows
- buyTickspeedMultiplier
- Shared components reference
- Automation workflows
- Procedure
- graphify reference: extra exports and benchmark
- file-task-issue/SKILL.md
- Tens
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- graphify reference: query, path, explain
- simulate-run-times/SKILL.md
- palette.md
- sentinel.md
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- pull_request_template.md
- Issue tracking for interactive sessions
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- Copilot Instructions
- graphify
- extraction-spec.md
- MAINPAGE_REFERENCE.md
- PWA_REFERENCE.md
- THEMING_REFERENCE.md
- bolt.md

## God Nodes (most connected - your core abstractions)
1. `clampNonNegative()` - 72 edges
2. `useIncrementalGame()` - 71 edges
3. `Testing` - 68 edges
4. `Economy model` - 56 edges
5. `tickGame()` - 52 edges
6. `MainPage()` - 49 edges
7. `ByteFoundryPage()` - 39 edges
8. `isProductionFrozen()` - 36 edges
9. `Design history & rationale` - 28 edges
10. `DataLakePanel()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `actFoundry()` --calls--> `activateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `buyBooster()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `canActivateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `convertIntroBitsToKilobytes()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `isBandwidthAvailable()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (96 total, 16 thin omitted)

### Community 0 - "tokens.js"
Cohesion: 0.10
Nodes (22): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), GlobalStyle (+14 more)

### Community 1 - "isProductionFrozen"
Cohesion: 0.29
Nodes (14): buyGlobalTickspeedMultiplier(), getGlobalTickspeedMultiplierCost(), isGlobalTickspeedMultiplierUnlocked(), isProductionFrozen(), isTierUnlocked(), getTiersAttentionLevel(), hasAffordableFullLevel(), hasAffordableGlobalTickspeed() (+6 more)

### Community 2 - "useIncrementalGame.js"
Cohesion: 0.05
Nodes (43): applyOfflineProgress(), clearDiskBuildQueue(), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric (+35 more)

### Community 3 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (54): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments, CategoryHeading (+46 more)

### Community 4 - "DataLakePanel/index.jsx"
Cohesion: 0.08
Nodes (53): ActionButton, BareDivider, clampFraction(), DataLakePanel(), getVisibleLakeTierIndexes(), LakeActionsRow, LakeBlock, LakeHeaderRow (+45 more)

### Community 5 - "layers.js"
Cohesion: 0.06
Nodes (55): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SPEED_UP_COST, BYTES_ID, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_BOOST_TIER_FIELDS, COMPUTE_FLOPS_TIER_BY_ID, COMPUTE_FLOPS_TIER_DEFINITIONS (+47 more)

### Community 6 - "navAttention.js"
Cohesion: 0.07
Nodes (49): APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem, pulseHigh (+41 more)

### Community 7 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (31): canForfeitComputeBoost(), forfeitComputeBoost(), isUpgradeComputeMergeDurationAvailable(), upgradeComputeMergeDuration(), ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow (+23 more)

### Community 8 - "MainPage"
Cohesion: 0.17
Nodes (21): countGlobalTickspeedMilestones(), formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedProductionMultiplier() (+13 more)

### Community 9 - "ByteFoundryPage/index.jsx"
Cohesion: 0.07
Nodes (42): flooredBitsLabel(), floorToDecimals(), formatBitsInNearestSiUnit(), formatBitsInNearestUnit(), formatDiskSize, formatDiskSizeStable(), formatMemoryAmount(), formatMemoryAmountStable() (+34 more)

### Community 10 - "getStoragePoolBandwidth"
Cohesion: 0.14
Nodes (22): canStartDiskWriteCacheMerge(), decrementFullDiskCount(), getDataLakeCapacityUnlockArraySize(), getDataLakeSubSizeStep(), getDiskLadderSizeBits(), getDiskLadderStep(), getDiskReadCacheFlushSeconds(), getDiskSizeForTierLevel() (+14 more)

### Community 11 - "run-simulation.mjs"
Cohesion: 0.11
Nodes (25): actMainBuys(), actPlayer(), actSoftResets(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+17 more)

### Community 12 - "engine.js"
Cohesion: 0.08
Nodes (24): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, DATA_LAKE_OVERFLOW_SEGMENT_LIMIT, fixedMemoryAmountFormatter, LOG10_2, MEMORY_BINARY_UNIT_SYMBOLS (+16 more)

### Community 13 - "DiskArrayRow/index.jsx"
Cohesion: 0.08
Nodes (39): CacheBlock, CacheBlocksRow, CacheFillIndicator, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, pullPulse (+31 more)

### Community 14 - "getPoolBufferCapacity"
Cohesion: 0.17
Nodes (16): getDataStreamBaseMultiplierPercent(), getDataStreamFillFraction(), getDecadePowerEquivalentBits(), getFillMultiplierPercent(), getPoolBaseMultiplierPercent(), getPoolBufferBits(), getPoolBufferCapacity(), getPoolBufferFillFraction() (+8 more)

### Community 15 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 16 - "App.test.jsx"
Cohesion: 0.07
Nodes (29): version, vitest, ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), BITS_PER_BYTE, COMPUTE_BOOST_PRESETS, COMPUTE_CORES_PER_NODE (+21 more)

### Community 17 - "DevModePage/index.jsx"
Cohesion: 0.12
Nodes (21): ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow, Header (+13 more)

### Community 18 - "tickComputeMergeBoundary"
Cohesion: 0.14
Nodes (15): getComputeMergeDurationSeconds(), getCoreEarnTimeSeconds(), startComputeMergeReserve(), startComputeMergeReserveAtBoundary(), tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer() (+7 more)

### Community 19 - "styled-components"
Cohesion: 0.16
Nodes (13): styled-components, Actions, Body, Card, ConfirmDialog(), Overlay, Title, Body (+5 more)

### Community 20 - "actFoundry"
Cohesion: 0.20
Nodes (11): actFoundry(), combineIntroByte(), getDataStreamEffectMultiplier(), getDataStreamMultiplierPercent(), getIntroProductionRate(), getPoolCapacityUnlockThresholdBits(), getVisibleStoragePoolCount(), isMemoryCapacityAtCap() (+3 more)

### Community 21 - "MilestonesPage/index.jsx"
Cohesion: 0.20
Nodes (9): Badge, Category, CategoryHeading, Header, List, RootDiv, Row, RowControls (+1 more)

### Community 22 - "InfoPage/index.jsx"
Cohesion: 0.06
Nodes (34): CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_ENTITY_CAP, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP (+26 more)

### Community 23 - "getPurchaseBlockSize"
Cohesion: 0.24
Nodes (17): wouldAutobuyerStall(), buyTier(), buyTierQuantity(), convertIntroBitsToKilobytes(), getCostEpochExponent(), getIntroKilobyteConversionCost(), getPurchaseBlockSize(), getTierAffordableQuantity() (+9 more)

### Community 24 - "ComputePage"
Cohesion: 0.19
Nodes (19): activateComputeBoost(), canActivateComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), getBiggestComputeTierWaitingOnMerge(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), getComputeBoostTierMultiplier() (+11 more)

### Community 25 - "getPrestigePointsAwarded"
Cohesion: 0.36
Nodes (8): checkMilestones(), getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp(), getPrestigePpEarnProgressPercent(), getPrestigePpPerPower(), getPrestigeProgressPercent()

### Community 26 - "package.json"
Cohesion: 0.12
Nodes (15): name, packageManager, private, type, @capacitor/cli, @capacitor/core, @fontsource/inter, @fontsource/space-grotesk (+7 more)

### Community 27 - "provisionDisk"
Cohesion: 0.46
Nodes (8): getDiskProvisionPassesCollected(), getDiskReplayPassAllowance(), getDiskSize(), isDiskBuildBelowCap(), isInvestProgressBelowCap(), provisionDisk(), tickFoundryResetConvenience(), tickQueuedDiskBuild()

### Community 28 - "engine.test.js"
Cohesion: 0.05
Nodes (18): clearIntroCapacityUpgradeQueue(), getAutobuyerUnlockCost(), getComputeBoostMultiplier(), getNextSiDoubledValue(), getTickspeedMultiplierBaseCost(), getTierProductionProgressPercent(), isAnyComputeMergeInFlight(), eraEligibleState() (+10 more)

### Community 29 - "clampNonNegative"
Cohesion: 0.14
Nodes (31): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoSpeedUp(), buyComputeAutoBoost(), buyComputeFlopsTier(), buyHyperscaler(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus() (+23 more)

### Community 30 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, @capacitor/cli, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom, @testing-library/react (+5 more)

### Community 31 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 32 - "capacitorConfig.test.js"
Cohesion: 0.24
Nodes (6): vite, vite-plugin-pwa, @vitejs/plugin-react, root, srcPath, createViteConfig()

### Community 33 - "SettingsPage/index.jsx"
Cohesion: 0.12
Nodes (15): buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem, MuseumList, RootDiv (+7 more)

### Community 34 - "ByteFoundryPage"
Cohesion: 0.21
Nodes (20): applyIntroProductionDoublingToIntro(), getComputeBandwidthSacrificeField(), getComputeBandwidthSacrificeLabel(), getDiskCost(), getDiskProvisionPassesRequired(), getEffectiveComputeBandwidthSacrificeIndex(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims() (+12 more)

### Community 35 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 36 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, @capacitor/core, @fontsource/inter, @fontsource/space-grotesk, react, react-dom, react-is, styled-components (+1 more)

### Community 37 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 38 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.33
Nodes (6): VisuallyHidden, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), formatOfflineDuration()

### Community 39 - "storage.js"
Cohesion: 0.06
Nodes (90): seedDataLakeSave(), App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon (+82 more)

### Community 40 - "generate-pwa-icons.mjs"
Cohesion: 0.25
Nodes (5): sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, targets

### Community 41 - "Button/index.jsx"
Cohesion: 0.19
Nodes (13): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+5 more)

### Community 42 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.17
Nodes (14): Money, formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), ComputeFlopsPage(), FlopsHero, Header, Hint (+6 more)

### Community 44 - "react"
Cohesion: 0.33
Nodes (4): react, web-vitals, rootElement, reportWebVitals()

### Community 45 - "pickIntroCapacityMilestone"
Cohesion: 0.33
Nodes (6): eraseAllComputeTokens(), latchMainGameUnlocked(), pickIntroCapacityMilestone(), rewindOneIntroProductionClaim(), rollbackComputeFundedBandwidth(), upgradePoolCapacity()

### Community 46 - "resetByteFoundry"
Cohesion: 1.00
Nodes (3): captureFoundryUpgradeCaps(), mergeFoundryUpgradeCaps(), resetByteFoundry()

### Community 47 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 48 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 49 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 50 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 52 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 59 - "Testing"
Cohesion: 0.03
Nodes (68): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever (+60 more)

### Community 60 - "Economy model"
Cohesion: 0.04
Nodes (56): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+48 more)

### Community 61 - "[Unreleased]"
Cohesion: 0.06
Nodes (32): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+24 more)

### Community 62 - "AGENTS.md"
Cohesion: 0.08
Nodes (22): AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engines (Claude now, Cursor successor), Budget discipline, Byte Foundry, Changelog convention, Code review tooling (+14 more)

### Community 63 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 64 - "CLAUDE.md"
Cohesion: 0.08
Nodes (23): AI-instruction file cost hygiene, Architecture, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Dev Mode, Documentation (+15 more)

### Community 65 - "Design history & rationale"
Cohesion: 0.08
Nodes (26): Architecture / MainPage UI decisions, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale (+18 more)

### Community 68 - "Economy model reference"
Cohesion: 0.08
Nodes (26): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Era ascension and Eons (#407), Game state shape, Key engine functions (`src/game/engine.js`), Multiplier outcomes are floored (+18 more)

### Community 69 - "Automation workflows"
Cohesion: 0.15
Nodes (13): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning, PR follow-up (`autonomous-pr-followup.yml`) — security reasoning (+5 more)

### Community 70 - "buyTickspeedMultiplier"
Cohesion: 0.48
Nodes (7): actTickspeed(), buyTickspeedMultiplier(), consumeXpForLastTierTickspeed(), getLastTierId(), getLastTierXpTickspeedMinConsumption(), getTickspeedMultiplierCost(), isLastTierTickspeedXpUnlocked()

### Community 71 - "Shared components reference"
Cohesion: 0.17
Nodes (11): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `ByteFoundryPage` pool layout, `ConfirmDialog/index.jsx`, `DiskArrayRow/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js` (+3 more)

### Community 72 - "Automation workflows"
Cohesion: 0.18
Nodes (10): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Cursor-powered successor engine, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Orchestration model, PR follow-up (`autonomous-pr-followup.yml`) (+2 more)

### Community 74 - "Procedure"
Cohesion: 0.20
Nodes (9): 1. Establish scope, 2. Load the repo's invariants, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure (+1 more)

### Community 75 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 76 - "file-task-issue/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 78 - "Tens"
Cohesion: 0.17
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes, Tens

### Community 80 - "economy-change-review/SKILL.md"
Cohesion: 0.29
Nodes (6): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 5. Authorization boundary, 6. Report

### Community 81 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 82 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 83 - "simulate-run-times/SKILL.md"
Cohesion: 0.33
Nodes (5): Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run

### Community 84 - "palette.md"
Cohesion: 0.33
Nodes (5): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2026-09-04 - Focus Visible Styles for styled native summary elements, 2026-09-06 - Focus Visible Styles for custom interactive components and Disclosure summary elements

### Community 85 - "sentinel.md"
Cohesion: 0.33
Nodes (5): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs., 2026-08-29 - Prototype Pollution in Dev Mode Field Editing

### Community 88 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 89 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 90 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 91 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 92 - "Issue tracking for interactive sessions"
Cohesion: 0.67
Nodes (3): Cursor Cloud GitHub access, GitHub Milestones (release grouping), Issue tracking for interactive sessions

## Knowledge Gaps
- **685 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+680 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 760 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `styled-components` connect `styled-components` to `tokens.js`, `SettingsPage/index.jsx`, `MainPage/index.jsx`, `DataLakePanel/index.jsx`, `navAttention.js`, `storage.js`, `OfflineProgressNotice/index.jsx`, `Button/index.jsx`, `ComputeFlopsPage/index.jsx`, `ByteFoundryPage/index.jsx`, `ComputePage/index.jsx`, `DiskArrayRow/index.jsx`, `DevModePage/index.jsx`, `MilestonesPage/index.jsx`, `InfoPage/index.jsx`, `package.json`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `Design history & rationale` to `Distribution`, `Automation workflows`, `Tens`, `Testing`, `Economy model`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `Testing` connect `Testing` to `Design history & rationale`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 27 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 27 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _685 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `tokens.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10344827586206896 - nodes in this community are weakly interconnected._
- **Should `useIncrementalGame.js` be split into smaller, more focused modules?**
  _Cohesion score 0.048625792811839326 - nodes in this community are weakly interconnected._