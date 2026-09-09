# Graph Report - tens  (2026-09-09)

## Corpus Check
- 108 files · ~439,846 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1610 nodes · 4039 edges · 109 communities (88 shown, 18 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `33ac9df2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- tokens.js
- hasFoundryAttention
- useIncrementalGame.js
- MainPage/index.jsx
- DataLakePanel/index.jsx
- layers.js
- getStoragePoolBandwidth
- ComputePage/index.jsx
- getPurchaseBlockSize
- ByteFoundryPage/index.jsx
- engine.js
- tickGame
- contrast.js
- DiskArrayRow/index.jsx
- getPoolBufferCapacity
- bump-version.mjs
- styled-components
- DevModePage/index.jsx
- ByteFoundryPage
- Button/index.jsx
- clampNonNegative
- Era ascension and Eons (#407)
- App.test.jsx
- run-simulation.mjs
- navAttention.js
- InfoPage/index.jsx
- package.json
- prestigeGame
- ComputePage
- navAttention.test.js
- devDependencies
- scripts
- vitest
- SettingsPage/index.jsx
- actFoundry
- backlog-issue-hygiene.sh
- dependencies
- epic-407-issue-hygiene.sh
- formatMemoryAmount
- storage.js
- generate-pwa-icons.mjs
- AppMenu/index.jsx
- ComputeFlopsPage/index.jsx
- @playwright/test
- App.jsx
- formatCurrency
- MilestonesPage/index.jsx
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
- engine.test.js
- AppNav/index.jsx
- Economy model reference
- Automation workflows
- applyAutobuyerMilestones
- Shared components reference
- Automation workflows
- react
- Procedure
- graphify reference: extra exports and benchmark
- file-task-issue/SKILL.md
- OfflineProgressNotice/index.jsx
- Tens
- isMemoryCapacityUpgradeAvailable
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- graphify reference: query, path, explain
- simulate-run-times/SKILL.md
- palette.md
- sentinel.md
- isComputeCoreConversionUnlocked
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- pull_request_template.md
- eraEligibleState
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- Issue tracking for interactive sessions
- Copilot Instructions
- Tier production tickspeed
- graphify
- extraction-spec.md
- MAINPAGE_REFERENCE.md
- PWA_REFERENCE.md
- THEMING_REFERENCE.md
- bolt.md
- applyOfflineProgress
- resetByteFoundry
- Documentation
- canForfeitComputeBoost
- isUpgradeComputeMergeDurationAvailable

## God Nodes (most connected - your core abstractions)
1. `clampNonNegative()` - 74 edges
2. `useIncrementalGame()` - 71 edges
3. `Testing` - 65 edges
4. `Economy model` - 56 edges
5. `tickGame()` - 52 edges
6. `MainPage()` - 50 edges
7. `ByteFoundryPage()` - 39 edges
8. `isProductionFrozen()` - 36 edges
9. `Design history & rationale` - 29 edges
10. `DataLakePanel()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `seedDataLakeSave()` --calls--> `createInitialGameState()`  [EXTRACTED]
  e2e/data-lake.e2e.js → src/game/engine.js
- `actFoundry()` --calls--> `activateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `buyBooster()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `canActivateComputeBoost()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js
- `actFoundry()` --calls--> `convertIntroBitsToKilobytes()`  [EXTRACTED]
  .claude/skills/simulate-run-times/run-simulation.mjs → src/game/engine.js

## Import Cycles
- None detected.

## Communities (109 total, 18 thin omitted)

### Community 0 - "tokens.js"
Cohesion: 0.14
Nodes (14): GlobalStyle, getSystemThemeMode(), ThemeProvider(), buildTheme(), DEFAULT_MODE, font, MODES, motion (+6 more)

### Community 1 - "hasFoundryAttention"
Cohesion: 0.38
Nodes (7): isIntroConversionUnlocked(), getFoundryAttentionLevel(), hasFoundryAttention(), isCombineAvailable(), isMemoryFull(), isTransferBlockAffordable(), pickLevel()

### Community 2 - "useIncrementalGame.js"
Cohesion: 0.05
Nodes (39): clearDiskBuildQueue(), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric, enableAutoMergeNetworksIntoGrid (+31 more)

### Community 3 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (59): GLOBAL_TICKSPEED_PRODUCTION_STEP, BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments (+51 more)

### Community 4 - "DataLakePanel/index.jsx"
Cohesion: 0.07
Nodes (61): ActionButton, BareDivider, clampFraction(), DataLakePanel(), getVisibleLakeTierIndexes(), LakeActionsRow, LakeBlock, LakeHeaderRow (+53 more)

### Community 5 - "layers.js"
Cohesion: 0.05
Nodes (54): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_FLOPS_TIER_BY_ID (+46 more)

### Community 6 - "getStoragePoolBandwidth"
Cohesion: 0.27
Nodes (12): getDiskReadCacheFlushSeconds(), getDiskWriteCacheFlushSeconds(), getDiskWriteCacheSegmentSeconds(), getPoolIndexForDiskSize(), getProvisionDiskBaseSeconds(), getProvisionDiskSeconds(), getSiCleanEquivalentBits(), getStoragePoolBandwidth() (+4 more)

### Community 7 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (35): getNextComputeMergeDurationUpgradeIndex(), COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RESERVE_CAP, COMPUTE_MERGE_STEP_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, ActiveBoostRow, ArmedStatusText (+27 more)

### Community 8 - "getPurchaseBlockSize"
Cohesion: 0.15
Nodes (27): actMainBuys(), wouldAutobuyerStall(), buyTier(), buyTierQuantity(), convertIntroBitsToKilobytes(), getCostEpochExponent(), getIntroKilobyteConversionCost(), getPurchaseBlockSize() (+19 more)

### Community 9 - "ByteFoundryPage/index.jsx"
Cohesion: 0.07
Nodes (29): FILL_MULTIPLIER_TAP_CAP_PERCENT, ActionsRow, BalanceText, BarFillBase, BarFillBonus, BarFillLake, BarPercentLabel, BarRow (+21 more)

### Community 10 - "engine.js"
Cohesion: 0.07
Nodes (46): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, countGlobalTickspeedMilestones(), currencyNumberFormatter, DATA_LAKE_OVERFLOW_SEGMENT_LIMIT, fixedMemoryAmountFormatter, getComputeBoostMultiplier() (+38 more)

### Community 11 - "tickGame"
Cohesion: 0.16
Nodes (25): actTickspeed(), buyGlobalTickspeedMultiplier(), buyTickspeedMultiplier(), consumeXpForLastTierTickspeed(), getAutoPrestigeAttemptRate(), getEffectiveTierTickSpeedSeconds(), getGlobalTickspeedMultiplierCost(), getGlobalTickspeedProductionMultiplier() (+17 more)

### Community 12 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 13 - "DiskArrayRow/index.jsx"
Cohesion: 0.06
Nodes (47): CacheBlock, CacheBlocksRow, CacheFillIndicator, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, pullPulse (+39 more)

### Community 14 - "getPoolBufferCapacity"
Cohesion: 0.33
Nodes (9): getPoolBaseMultiplierPercent(), getPoolBufferBits(), getPoolBufferCapacity(), getPoolBufferFillFraction(), getPoolEffectMultiplier(), getPoolMultiplierPercent(), getPoolTapBonusPercent(), tapPoolBuffer() (+1 more)

### Community 15 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 16 - "styled-components"
Cohesion: 0.16
Nodes (13): styled-components, Actions, Body, Card, ConfirmDialog(), Overlay, Title, Body (+5 more)

### Community 17 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (24): COMPUTE_FLOPS_TIER_DEFINITIONS, PRESTIGE_THRESHOLD, TIER_DEFINITIONS, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel (+16 more)

### Community 18 - "ByteFoundryPage"
Cohesion: 0.29
Nodes (14): applyIntroProductionDoublingToIntro(), getComputeBandwidthSacrificeField(), getComputeBandwidthSacrificeLabel(), getEffectiveComputeBandwidthSacrificeIndex(), getIntroProductionMilestoneCost(), getIntroProductionMilestoneMaxClaims(), isBandwidthAvailable(), isBandwidthTurnAvailable() (+6 more)

### Community 19 - "Button/index.jsx"
Cohesion: 0.19
Nodes (13): Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+5 more)

### Community 20 - "clampNonNegative"
Cohesion: 0.16
Nodes (27): buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoScaleUp(), buyComputeAutoBoost(), buyHyperscaler(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus(), buySmartAutobuyer() (+19 more)

### Community 21 - "Era ascension and Eons (#407)"
Cohesion: 0.25
Nodes (8): Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for per-tier automations, Pause/resume for the global automations, The global tickspeed multiplier, The last tier's XP-funded tickspeed, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones

### Community 22 - "App.test.jsx"
Cohesion: 0.10
Nodes (17): ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, COMPUTE_BOOST_MAX_STACKS, COMPUTE_CORES_PER_NODE, DATA_LAKE_CAPACITY_MAX_LEVEL (+9 more)

### Community 23 - "run-simulation.mjs"
Cohesion: 0.11
Nodes (20): actPlayer(), actSoftResets(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+12 more)

### Community 24 - "navAttention.js"
Cohesion: 0.12
Nodes (26): enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+18 more)

### Community 25 - "InfoPage/index.jsx"
Cohesion: 0.10
Nodes (19): TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_CORE_EARN_MULTIPLIER, DATA_LAKE_OVERFLOW_MIN_PERCENT, DATA_LAKE_SUB_SIZE_DISK_CAPS (+11 more)

### Community 26 - "package.json"
Cohesion: 0.12
Nodes (16): name, packageManager, private, type, version, @capacitor/cli, @capacitor/core, @fontsource/inter (+8 more)

### Community 27 - "prestigeGame"
Cohesion: 0.31
Nodes (9): checkMilestones(), getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp(), getPrestigePpEarnProgressPercent(), getPrestigePpPerPower(), getPrestigeProgressPercent() (+1 more)

### Community 28 - "ComputePage"
Cohesion: 0.26
Nodes (16): activateComputeBoost(), canActivateComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), getComputeBoostTierMultiplier(), isComputeBoostTurnAvailable() (+8 more)

### Community 29 - "navAttention.test.js"
Cohesion: 0.11
Nodes (16): seedDataLakeSave(), BYTES_ID, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_BYTE_COMBINE_COST, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY, INTRO_CONVERSION_UNLOCK_CAPACITY, INTRO_DISK_UNLOCK_CAPACITY (+8 more)

### Community 30 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, @capacitor/cli, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom, @testing-library/react (+5 more)

### Community 31 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 32 - "vitest"
Cohesion: 0.22
Nodes (7): vite, vite-plugin-pwa, @vitejs/plugin-react, vitest, root, srcPath, createViteConfig()

### Community 33 - "SettingsPage/index.jsx"
Cohesion: 0.12
Nodes (15): MUSEUM_PIN_CAP, CodeForm, CodeInput, Header, LockedNote, MuseumItem, MuseumList, RootDiv (+7 more)

### Community 34 - "actFoundry"
Cohesion: 0.20
Nodes (18): actFoundry(), combineIntroByte(), getDiskCost(), getDiskProvisionPassesCollected(), getDiskProvisionPassesRequired(), getDiskReplayPassAllowance(), getDiskSize(), getMaxActiveDiskLadderStep() (+10 more)

### Community 35 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 36 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, @capacitor/core, @fontsource/inter, @fontsource/space-grotesk, react, react-dom, react-is, styled-components (+1 more)

### Community 37 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 38 - "formatMemoryAmount"
Cohesion: 0.25
Nodes (11): flooredBitsLabel(), floorToDecimals(), formatBitsInNearestSiUnit(), formatBitsInNearestUnit(), formatDiskSizeStable(), formatMemoryAmount(), formatMemoryAmountStable(), getMemoryUnit() (+3 more)

### Community 39 - "storage.js"
Cohesion: 0.08
Nodes (65): allResourceIds(), applyFlopsAutobuyerMilestones(), buildEraIntroReset(), createEmptyDataLakes(), createInitialGameState(), eraGame(), PRESTIGE_UNBOUNDED_MIN_COUNT, applyDevGameStateJson() (+57 more)

### Community 40 - "generate-pwa-icons.mjs"
Cohesion: 0.25
Nodes (5): sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, targets

### Community 41 - "AppMenu/index.jsx"
Cohesion: 0.29
Nodes (6): AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle

### Community 42 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.13
Nodes (21): Money, buyComputeFlopsTier(), canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), tickComputeFlopsAutobuyers() (+13 more)

### Community 44 - "App.jsx"
Cohesion: 0.25
Nodes (14): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), isComputeFlopsPageRevealed(), getComputeFlopsAttentionLevel(), getNavAttention(), hasAffordableComputeFlopsTier() (+6 more)

### Community 45 - "formatCurrency"
Cohesion: 0.31
Nodes (11): formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getEonsAwarded(), isEraEligible(), RESOURCE_SYMBOL() (+3 more)

### Community 46 - "MilestonesPage/index.jsx"
Cohesion: 0.17
Nodes (11): getFlopsAutobuyerUnlockEra(), ERA_ELIGIBILITY_PP, Badge, Category, CategoryHeading, Header, List, RootDiv (+3 more)

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
Nodes (65): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever (+57 more)

### Community 60 - "Economy model"
Cohesion: 0.04
Nodes (56): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405) (+48 more)

### Community 61 - "[Unreleased]"
Cohesion: 0.06
Nodes (34): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+26 more)

### Community 62 - "AGENTS.md"
Cohesion: 0.08
Nodes (22): AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engines (Claude now, Cursor successor), Budget discipline, Byte Foundry, Changelog convention, Code review tooling (+14 more)

### Community 63 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 64 - "CLAUDE.md"
Cohesion: 0.09
Nodes (21): AI-instruction file cost hygiene, Architecture, Automation workflows, Capacitor foundation (in progress — #70), Commands, Dev Mode, Economy model, End-to-end testing (+13 more)

### Community 65 - "Design history & rationale"
Cohesion: 0.07
Nodes (29): Architecture / MainPage UI decisions, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale (+21 more)

### Community 66 - "engine.test.js"
Cohesion: 0.05
Nodes (13): clearIntroCapacityUpgradeQueue(), eraseAllComputeTokens(), getAutobuyerUnlockCost(), getBiggestComputeTierWaitingOnMerge(), getNextSiDoubledValue(), getTickspeedMultiplierBaseCost(), getTierProductionProgressPercent(), isAnyComputeMergeInFlight() (+5 more)

### Community 67 - "AppNav/index.jsx"
Cohesion: 0.20
Nodes (9): APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem, pulseHigh (+1 more)

### Community 68 - "Economy model reference"
Cohesion: 0.13
Nodes (15): Adding a new tier, Byte Foundry, Constants (`src/game/layers.js`), Economy model reference, Game state shape, Key engine functions (`src/game/engine.js`), Offline progress, Overclock (+7 more)

### Community 69 - "Automation workflows"
Cohesion: 0.15
Nodes (13): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning, PR follow-up (`autonomous-pr-followup.yml`) — security reasoning (+5 more)

### Community 70 - "applyAutobuyerMilestones"
Cohesion: 0.38
Nodes (7): seedState(), applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getTierTickspeedAutobuyerMilestone(), isUnboundedPrestigeUnlocked(), InfoPage(), MilestonesPage()

### Community 71 - "Shared components reference"
Cohesion: 0.17
Nodes (11): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `ByteFoundryPage` pool layout, `ConfirmDialog/index.jsx`, `DiskArrayRow/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js` (+3 more)

### Community 72 - "Automation workflows"
Cohesion: 0.18
Nodes (10): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Cursor-powered successor engine, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Orchestration model, PR follow-up (`autonomous-pr-followup.yml`) (+2 more)

### Community 73 - "react"
Cohesion: 0.33
Nodes (4): react, web-vitals, rootElement, reportWebVitals()

### Community 74 - "Procedure"
Cohesion: 0.20
Nodes (9): 1. Establish scope, 2. Load the repo's invariants, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure (+1 more)

### Community 75 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 76 - "file-task-issue/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 77 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.33
Nodes (6): VisuallyHidden, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), formatOfflineDuration()

### Community 78 - "Tens"
Cohesion: 0.25
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes, Tens

### Community 79 - "isMemoryCapacityUpgradeAvailable"
Cohesion: 0.33
Nodes (7): isMemoryCapacityUpgradeAvailable(), isStorageUnlocked(), latchMainGameUnlocked(), rewindOneIntroProductionClaim(), rollbackComputeFundedBandwidth(), tickQueuedCapacityUpgrade(), upgradePoolCapacity()

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

### Community 86 - "isComputeCoreConversionUnlocked"
Cohesion: 0.53
Nodes (6): isComputeCoreConversionUnlocked(), isComputeUpgradeAvailable(), isComputeUpgradeTurnAvailable(), getComputeAttentionLevel(), hasComputeAttention(), hasInstantMergeAvailable()

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

### Community 92 - "eraEligibleState"
Cohesion: 0.50
Nodes (4): eraEligibleState(), withIntro(), withPoolBuffer(), withPrestigePoints()

### Community 95 - "Issue tracking for interactive sessions"
Cohesion: 0.67
Nodes (3): Cursor Cloud GitHub access, GitHub Milestones (release grouping), Issue tracking for interactive sessions

### Community 97 - "Tier production tickspeed"
Cohesion: 0.67
Nodes (3): Multiplier outcomes are floored, Production figure (tick-progress ring removed), Tier production tickspeed

### Community 104 - "applyOfflineProgress"
Cohesion: 1.00
Nodes (3): applyOfflineProgress(), getOfflineEffectiveSeconds(), computeOfflineCatchUp()

### Community 105 - "resetByteFoundry"
Cohesion: 1.00
Nodes (3): captureFoundryUpgradeCaps(), mergeFoundryUpgradeCaps(), resetByteFoundry()

## Knowledge Gaps
- **685 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+680 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 760 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `styled-components` connect `styled-components` to `tokens.js`, `SettingsPage/index.jsx`, `AppNav/index.jsx`, `DataLakePanel/index.jsx`, `MainPage/index.jsx`, `ComputePage/index.jsx`, `AppMenu/index.jsx`, `ComputeFlopsPage/index.jsx`, `ByteFoundryPage/index.jsx`, `App.jsx`, `DiskArrayRow/index.jsx`, `OfflineProgressNotice/index.jsx`, `MilestonesPage/index.jsx`, `DevModePage/index.jsx`, `Button/index.jsx`, `InfoPage/index.jsx`, `package.json`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `Design history & rationale` to `Testing`, `Economy model`, `Automation workflows`, `README.md`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `SettingsPage/index.jsx`, `useIncrementalGame.js`, `MainPage/index.jsx`, `ComputePage/index.jsx`, `ByteFoundryPage/index.jsx`, `App.jsx`, `OfflineProgressNotice/index.jsx`, `styled-components`, `DevModePage/index.jsx`, `package.json`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 27 inferred relationships involving `useIncrementalGame()` (e.g. with `buyAutoPrestige()` and `buyAutoPrestigeAutobuyer()`) actually correct?**
  _`useIncrementalGame()` has 27 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS` to the rest of the system?**
  _685 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `tokens.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13725490196078433 - nodes in this community are weakly interconnected._
- **Should `useIncrementalGame.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._