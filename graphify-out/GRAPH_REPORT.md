# Graph Report - tens  (2026-09-24)

## Corpus Check
- 125 files · ~481,523 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .ico 1)

## Summary
- 1721 nodes · 6264 edges · 86 communities (71 shown, 15 thin omitted)
- Extraction: 66% EXTRACTED · 34% INFERRED · 0% AMBIGUOUS · INFERRED: 2106 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `520485cf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- MilestonesPage/index.jsx
- MainPage/index.jsx
- Economy model
- layers.js
- engine.js
- ComputePage/index.jsx
- formatAmount
- Automation workflows
- ComputeFlopsPage/index.jsx
- DiskArrayRow
- DataLakePanel
- Key engine functions (`src/game/engine.js`)
- getTierCost
- ByteFoundryPage
- DevModePage/index.jsx
- Byte Foundry
- engine.computeFlops.test.js
- ref_child_process
- run-simulation.mjs
- DataLakePanel/index.jsx
- What You Must Do When Invoked
- bump-version.mjs
- engine.test.js
- isComputeCoreConversionUnlocked
- getNavAttention
- Theming reference
- AGENTS.md
- AppMenu/index.jsx
- SettingsPage/index.jsx
- buyComputeFlopsTier
- CLAUDE.md
- Architecture
- MainPage reference
- Testing
- package.json
- createInitialGameState
- [Unreleased]
- tickGame
- devDependencies
- scripts
- ByteFoundryPage/index.jsx
- Tens
- Pool-local resets
- Procedure
- main
- vitest
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- App.jsx
- generate-pwa-icons.mjs
- navAttention.js
- provisionDisk
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- graphify reference: query, path, explain
- palette.md
- resolutions
- sync-release-milestones.sh
- adversarialReviewMarker.js
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- pull_request_template.md
- jsconfig.json
- Button/index.jsx
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- publish-strategy.sh
- contrast.js
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- ref_fs
- graphify
- session-start.sh
- extraction-spec.md
- PWA_REFERENCE.md
- resolve-pr-threads.sh
- useIncrementalGame
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 228 edges
2. `Byte Foundry` - 155 edges
3. `tickGame()` - 102 edges
4. `MainPage reference` - 95 edges
5. `ByteFoundryPage()` - 89 edges
6. `MainPage()` - 86 edges
7. `Testing` - 82 edges
8. `useIncrementalGame()` - 77 edges
9. `Pool-local resets` - 77 edges
10. `clampNonNegative()` - 76 edges

## Surprising Connections (you probably didn't know these)
- `A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too` --references--> `formatCapacityLabel()`  [INFERRED]
  docs/DESIGN_HISTORY.md → .claude/skills/simulate-run-times/run-simulation.mjs
- `Automation workflows` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `Changelog convention` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `Pull requests` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `5. Specs go stale — write defensively, and re-verify before filing a rewrite` --references--> `main()`  [INFERRED]
  .claude/skills/file-task-issue/SKILL.md → scripts/bump-version.mjs

## Import Cycles
- None detected.

## Communities (86 total, 15 thin omitted)

### Community 0 - "MilestonesPage/index.jsx"
Cohesion: 0.09
Nodes (22): styled-components, Actions, Body, Card, Overlay, Title, Body, Card (+14 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (66): Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), PURCHASE_MILESTONE_MULTIPLIER_BASE (+58 more)

### Community 2 - "Economy model"
Cohesion: 0.09
Nodes (34): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Multiplier overflow safety: the switch to compounding needed a floor, Prestige history: why PP replaced direct production doubling (+26 more)

### Community 3 - "layers.js"
Cohesion: 0.04
Nodes (94): seedDataLakeSave(), ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST (+86 more)

### Community 4 - "engine.js"
Cohesion: 0.06
Nodes (56): allResourceIds(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, buyHyperscaler(), canBuyHyperscaler(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMerge() (+48 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (35): getNextComputeMergeDurationUpgradeIndex(), COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RESERVE_CAP, COMPUTE_MERGE_STEP_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, ActiveBoostRow, ArmedStatusText (+27 more)

### Community 6 - "formatAmount"
Cohesion: 0.24
Nodes (17): Data Stream/pool balances skip their padded trailing zeros once full for more than a second, flooredBitsLabel(), floorToDecimals(), formatAmount(), formatBitsInNearestSiUnit(), formatDiskSizeBare(), formatDiskSizeInPoolUnit(), formatDiskSizeStable() (+9 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.13
Nodes (21): PP Compute (Flops), Money, canBuyComputeFlopsTier(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierWeight(), getComputeFlopsTotal(), isComputeFlopsPageRevealed() (+13 more)

### Community 9 - "DiskArrayRow"
Cohesion: 0.06
Nodes (60): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping (+52 more)

### Community 10 - "DataLakePanel"
Cohesion: 0.15
Nodes (43): Changed, `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap (+35 more)

### Community 11 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.12
Nodes (51): What it does, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Era ascension and Eons (#407), Key engine functions (`src/game/engine.js`) (+43 more)

### Community 12 - "getTierCost"
Cohesion: 0.20
Nodes (26): actMainBuys(), wouldAutobuyerStall(), Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check, Purchase block size became a runtime-configurable, growing value — `getTierLevel` replaced by direct state tracking (+18 more)

### Community 13 - "ByteFoundryPage"
Cohesion: 0.12
Nodes (35): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, CLAUDE.md Economy model duplication trim — 2026-09-03, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable (+27 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.13
Nodes (15): PRESTIGE_THRESHOLD, ButtonGrid, coerceDraft(), Details, FieldLabel, FieldRow, Header, JsonTextarea (+7 more)

### Community 15 - "Byte Foundry"
Cohesion: 0.22
Nodes (26): Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Byte Foundry, activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost() (+18 more)

### Community 16 - "engine.computeFlops.test.js"
Cohesion: 0.25
Nodes (8): getComputeFlopsAffordableQuantity(), getComputeFlopsTierCost(), AUTO_SCALE_UP_COST, BYTES_ID, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP, TICK_RATE_MS

### Community 17 - "ref_child_process"
Cohesion: 0.18
Nodes (6): { execSync }, { execSync }, ref_child_process, { execSync }, { execSync }, { execSync }

### Community 18 - "run-simulation.mjs"
Cohesion: 0.13
Nodes (25): actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+17 more)

### Community 19 - "DataLakePanel/index.jsx"
Cohesion: 0.09
Nodes (21): ActionButton, BareDivider, clampFraction(), LakeBlock, LakeHeaderRow, LakePoolFill, LakePoolLabel, LakePoolTile (+13 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): ref_node_os, assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+12 more)

### Community 22 - "engine.test.js"
Cohesion: 0.04
Nodes (48): enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric, enableAutoMergeNetworksIntoGrid, enableAutoMergeNodesIntoCluster (+40 more)

### Community 23 - "isComputeCoreConversionUnlocked"
Cohesion: 0.43
Nodes (7): Sacrifice confirm: in-game dialog; Core warning only when unlocked, isComputeCoreConversionUnlocked(), isComputeUpgradeAvailable(), isComputeUpgradeTurnAvailable(), getComputeAttentionLevel(), hasComputeAttention(), hasInstantMergeAvailable()

### Community 24 - "getNavAttention"
Cohesion: 0.43
Nodes (7): getFoundryAttentionLevel(), getNavAttention(), getTiersAttentionLevel(), hasFoundryAttention(), isCombineAvailable(), isMemoryFull(), pickLevel()

### Community 25 - "Theming reference"
Cohesion: 0.14
Nodes (17): Theming reference, resolveInitialThemeMode(), getSystemThemeMode(), resolveThemeMode(), ThemeProvider(), buildTheme(), DEFAULT_MODE, font (+9 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.12
Nodes (15): AI-instruction file cost hygiene, Automation design principles, Budget discipline, Changelog convention, Commands, Funding, Issue-authoring tooling, Issue tracking conventions (+7 more)

### Community 27 - "AppMenu/index.jsx"
Cohesion: 0.25
Nodes (7): `AppNav/index.jsx`, AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.10
Nodes (19): Changed, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), ConfirmDialog(), MUSEUM_PIN_CAP, buildSparklinePath(), CodeForm, CodeInput, Header (+11 more)

### Community 30 - "buyComputeFlopsTier"
Cohesion: 0.25
Nodes (10): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-07-28 - Replace O(N) attempts loop with O(1) batch processing for tickGame autobuyers, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, buyComputeFlopsTier(), buyComputeFlopsTierQuantity() (+2 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Documentation, Economy model, Funding (+10 more)

### Community 32 - "Architecture"
Cohesion: 0.14
Nodes (40): Byte Foundry, Architecture, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity) (+32 more)

### Community 33 - "MainPage reference"
Cohesion: 0.18
Nodes (23): seedState(), Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Tier autobuyer/tier-tickspeed-autobuyer milestones, MainPage reference, applyAutobuyerMilestones(), formatOfflineDuration() (+15 more)

### Community 34 - "Testing"
Cohesion: 0.11
Nodes (30): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake refill gating: staged 9 → 99 → 999 capacity from disk-array completion (+22 more)

### Community 36 - "package.json"
Cohesion: 0.10
Nodes (19): browserslist, development, production, name, packageManager, private, type, version (+11 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.22
Nodes (24): 2. Load the repo's invariants, actSoftResets(), When editing the simulation, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, `scaleUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry, Speed Up renamed to Scale Up and redesigned from a last-tier-only gate to a per-tier unlock ladder — 2026-09-09, Starting Money reduced from 10 to 1, The Byte Foundry becomes a per-Prestige-cycle mechanic, not a one-time gate (+16 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (31): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+23 more)

### Community 40 - "tickGame"
Cohesion: 0.25
Nodes (16): 5. Authorization boundary, `OfflineProgressNotice/index.jsx`, Architecture / MainPage UI decisions, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Multiplier outcomes are floored, Tickspeed multiplier, Tier production tickspeed, applyOfflineProgress() (+8 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 43 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 44 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (33): The multiplier bar moved below the balance, with its percent readout below the bar itself, FILL_MULTIPLIER_TAP_BONUS_CAP_PERCENT, ActionsRow, BalanceSeparator, BalanceText, BarFillBase, BarFillBonus, BarFillLake (+25 more)

### Community 45 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 46 - "Pool-local resets"
Cohesion: 0.14
Nodes (32): Pool-local resets, actFoundry(), A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch, `getDataLakeManualFillBitsNeeded` could offer a fill that Scale Out would immediately erase, Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes (+24 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "main"
Cohesion: 0.11
Nodes (21): Automation engine, Code review tooling, Interactive session startup, Strategy snapshots (orphan branch) — required after every run, Usage, When to re-run, AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`) (+13 more)

### Community 49 - "vitest"
Cohesion: 0.13
Nodes (13): ref_node_child_process, ref_node_fs, ref_node_module, ref_node_path, ref_node_url, vite, vite-plugin-pwa, @vitejs/plugin-react (+5 more)

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

### Community 55 - "App.jsx"
Cohesion: 0.09
Nodes (23): Adding a new tier, Architecture, Path aliases (`vite.config.js`), Project, Added, Project, react, react-dom (+15 more)

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.22
Nodes (7): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), targets

### Community 57 - "navAttention.js"
Cohesion: 0.15
Nodes (23): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, getIntroKilobyteConversionCost(), isIntroConversionUnlocked(), COMPUTE_MERGE_RATIO, INTRO_BYTE_COMBINE_COST, TICKSPEED_AUTOBUYER_COST, ATTENTION_HIGH, ATTENTION_NORMAL (+15 more)

### Community 58 - "provisionDisk"
Cohesion: 0.12
Nodes (49): Fixed, Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+41 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 66 - "palette.md"
Cohesion: 0.20
Nodes (9): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements, 2026-09-06 - Focus Visible Styles for custom interactive components and Disclosure summary elements (+1 more)

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

### Community 78 - "Button/index.jsx"
Cohesion: 0.12
Nodes (21): Fixed, `Button/index.jsx`, The transfer budget becomes dynamic (tied to the Kilobyte tier's own block size); a real ButtonContent bug fixed along the way, Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent() (+13 more)

### Community 82 - "contrast.js"
Cohesion: 0.38
Nodes (7): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear()

### Community 89 - "ref_fs"
Cohesion: 0.08
Nodes (14): content, content, content, content, content, content, content, mdContent (+6 more)

### Community 106 - "useIncrementalGame"
Cohesion: 0.05
Nodes (99): Dev Mode, End-to-end testing, Security notes, Testing, `AppMenu/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js` (+91 more)

## Knowledge Gaps
- **508 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+503 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 584 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `main` to `Architecture`, `Testing`, `createInitialGameState`, `Automation workflows`, `DataLakePanel`, `Key engine functions (`src/game/engine.js`)`, `getTierCost`, `ByteFoundryPage`, `Pool-local resets`, `bump-version.mjs`, `file-task-issue/SKILL.md`, `provisionDisk`, `CLAUDE.md`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `provisionDisk` to `Architecture`, `MainPage reference`, `Economy model`, `Testing`, `createInitialGameState`, `Automation workflows`, `tickGame`, `DataLakePanel`, `useIncrementalGame`, `Tens`, `ByteFoundryPage`, `Byte Foundry`, `isComputeCoreConversionUnlocked`, `navAttention.js`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `Architecture` connect `App.jsx` to `Architecture`, `MainPage reference`, `ComputeFlopsPage/index.jsx`, `useIncrementalGame`, `ByteFoundryPage`, `Byte Foundry`, `AGENTS.md`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Are the 227 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 227 INFERRED edges - model-reasoned connections that need verification._
- **Are the 154 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 154 INFERRED edges - model-reasoned connections that need verification._
- **Are the 51 inferred relationships involving `tickGame()` (e.g. with `2. Load the repo's invariants` and `Architecture`) actually correct?**
  _`tickGame()` has 51 INFERRED edges - model-reasoned connections that need verification._
- **Are the 94 inferred relationships involving `MainPage reference` (e.g. with `AppNav()` and `progressFill()`) actually correct?**
  _`MainPage reference` has 94 INFERRED edges - model-reasoned connections that need verification._