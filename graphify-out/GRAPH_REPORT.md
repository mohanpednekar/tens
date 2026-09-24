# Graph Report - tens  (2026-09-24)

## Corpus Check
- 125 files · ~482,005 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .ico 1)

## Summary
- 1722 nodes · 6279 edges · 99 communities (84 shown, 15 thin omitted)
- Extraction: 66% EXTRACTED · 34% INFERRED · 0% AMBIGUOUS · INFERRED: 2119 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ac8f5b6b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ConfirmDialog/index.jsx
- MainPage/index.jsx
- Economy model
- engine.js
- navAttention.js
- ComputePage/index.jsx
- formatMemoryAmount
- Automation workflows
- ComputeFlopsPage/index.jsx
- Byte Foundry
- DataLakePanel
- clampNonNegative
- getTierCost
- isMemoryCapacityAtCap
- DevModePage/index.jsx
- useIncrementalGame.js
- DiskArrayRow
- ref_child_process
- run-simulation.mjs
- DataLakePanel/index.jsx
- What You Must Do When Invoked
- bump-version.mjs
- engine.test.js
- Fixed
- MilestonesPage/index.jsx
- tokens.js
- AGENTS.md
- getStoragePoolBandwidth
- SettingsPage/index.jsx
- Architecture
- fillDataLakeManually
- CLAUDE.md
- tickPoolBufferFill
- Key engine functions (`src/game/engine.js`)
- getDataLakeCapacity
- simulate-run-times/SKILL.md
- package.json
- createInitialGameState
- App.test.jsx
- [Unreleased]
- tickGame
- devDependencies
- Testing
- scripts
- ByteFoundryPage/index.jsx
- Tens
- Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit
- Procedure
- main
- capacitorConfig.test.js
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- App.jsx
- generate-pwa-icons.mjs
- AppNav/index.jsx
- provisionDisk
- navAttention.test.js
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- ByteFoundryPage
- graphify reference: query, path, explain
- applyDevGameStateJson
- palette.md
- ComputePage
- resolutions
- sync-release-milestones.sh
- Architecture / MainPage UI decisions
- adversarialReviewMarker.js
- activateComputeBoost
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- pull_request_template.md
- jsconfig.json
- Button/index.jsx
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- publish-strategy.sh
- getSaveIncompatibilityReason
- Copilot Instructions
- getPrestigePointsAwarded
- Shared components reference
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- mergeDataLakes
- ref_fs
- graphify
- session-start.sh
- extraction-spec.md
- PWA_REFERENCE.md
- resolve-pr-threads.sh
- storage.js
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 228 edges
2. `Byte Foundry` - 155 edges
3. `tickGame()` - 102 edges
4. `MainPage reference` - 95 edges
5. `ByteFoundryPage()` - 89 edges
6. `MainPage()` - 86 edges
7. `Testing` - 83 edges
8. `useIncrementalGame()` - 78 edges
9. `Pool-local resets` - 78 edges
10. `clampNonNegative()` - 76 edges

## Surprising Connections (you probably didn't know these)
- `Changelog convention` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `Interactive session startup` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `Pull requests` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `5. Specs go stale — write defensively, and re-verify before filing a rewrite` --references--> `main()`  [INFERRED]
  .claude/skills/file-task-issue/SKILL.md → scripts/bump-version.mjs
- `Strategy snapshots (orphan branch) — required after every run` --references--> `main()`  [INFERRED]
  .claude/skills/simulate-run-times/SKILL.md → scripts/bump-version.mjs

## Import Cycles
- None detected.

## Communities (99 total, 15 thin omitted)

### Community 0 - "ConfirmDialog/index.jsx"
Cohesion: 0.14
Nodes (11): Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), react, web-vitals, Actions, Body, Card, ConfirmDialog(), Overlay (+3 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (56): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments, CategoryHeading (+48 more)

### Community 2 - "Economy model"
Cohesion: 0.10
Nodes (30): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Multiplier overflow safety: the switch to compounding needed a floor, Prestige history: why PP replaced direct production doubling (+22 more)

### Community 3 - "engine.js"
Cohesion: 0.06
Nodes (71): seedDataLakeSave(), allResourceIds(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, fixedMemoryAmountFormatter, LOG10_2 (+63 more)

### Community 4 - "navAttention.js"
Cohesion: 0.08
Nodes (42): isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable(), isAutoMergeNodesIntoClusterUnlockAvailable() (+34 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.07
Nodes (27): ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostRow, CompactButton, COMPUTE_BOOST_DISPLAY, DurationUpgradeRow (+19 more)

### Community 6 - "formatMemoryAmount"
Cohesion: 0.31
Nodes (14): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), flooredBitsLabel(), formatBitsInNearestSiUnit(), formatBitsInNearestUnit(), formatDiskSizeStable() (+6 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.18
Nodes (10): Money, FlopsHero, Header, Hint, RootDiv, TierList, TierMeta, TierName (+2 more)

### Community 9 - "Byte Foundry"
Cohesion: 0.24
Nodes (20): `DiskArrayRow/index.jsx`, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping, Storage funding rebuilt push→pull: the manual Redeem button and autobuyer-gated auto-redeem are gone (issue #571), Byte Foundry, enableAutoMerge(), getDataLakeSubSize(), getDataLakeTierIndex() (+12 more)

### Community 10 - "DataLakePanel"
Cohesion: 0.24
Nodes (25): Changed, `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03 (+17 more)

### Community 11 - "clampNonNegative"
Cohesion: 0.11
Nodes (35): Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, PP Compute (Flops), 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-07-28 - Replace O(N) attempts loop with O(1) batch processing for tickGame autobuyers, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation (+27 more)

### Community 12 - "getTierCost"
Cohesion: 0.21
Nodes (26): 5. Authorization boundary, wouldAutobuyerStall(), `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check, Purchase block size became a runtime-configurable, growing value — `getTierLevel` replaced by direct state tracking, Purchase level resized from 10 to 8, and the cost-epoch sequence changed from Fibonacci to triangular, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped (+18 more)

### Community 13 - "isMemoryCapacityAtCap"
Cohesion: 0.19
Nodes (22): actFoundry(), A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool 10's buffer ceiling landed a ULP below its own largest disk's face value — 2026-09-08, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024, Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display (+14 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.12
Nodes (17): ButtonGrid, coerceDraft(), Details, FieldLabel, FieldNode(), FieldRow, Header, JsonTextarea (+9 more)

### Community 15 - "useIncrementalGame.js"
Cohesion: 0.06
Nodes (43): clearIntroCapacityUpgradeQueue(), combineIntroByte(), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric (+35 more)

### Community 16 - "DiskArrayRow"
Cohesion: 0.09
Nodes (27): Pool titles simplified to "<symbol> Pool"; each pool's Data Lake moved inside its own card, Read cache blocks (`DiskArrayRow`) render a proportional fill overlay, not just full/empty, CacheBlock, CacheBlocksRow, CacheFillIndicator, CellLabel, DiskArrayRow(), DiskSizeRow (+19 more)

### Community 17 - "ref_child_process"
Cohesion: 0.18
Nodes (6): { execSync }, { execSync }, ref_child_process, { execSync }, { execSync }, { execSync }

### Community 18 - "run-simulation.mjs"
Cohesion: 0.14
Nodes (24): actMainBuys(), actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+16 more)

### Community 19 - "DataLakePanel/index.jsx"
Cohesion: 0.09
Nodes (29): Pool gauge's separate bottom-half Data Lake arc replaced with one dial that switches meaning once the buffer is full, ActionButton, BareDivider, clampFraction(), getVisibleLakeTierIndexes(), LakeBlock, LakeHeaderRow, LakePoolFill (+21 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): ref_node_os, assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+12 more)

### Community 22 - "engine.test.js"
Cohesion: 0.04
Nodes (29): eraseAllComputeTokens(), getComputeMergeDurationSeconds(), getDataStreamBaseMultiplierPercent(), getDataStreamEffectMultiplier(), getDataStreamFillFraction(), getDataStreamMultiplierPercent(), getFillMultiplierPercent(), isAnyComputeMergeInFlight() (+21 more)

### Community 23 - "Fixed"
Cohesion: 0.36
Nodes (10): Fixed, Reset Byte Foundry convenience-auto now includes Capacity/Sacrifice — 2026-08-25, Reset Byte Foundry's convenience replay didn't cover partial Provision Disk passes — 2026-09-08, Two more gaps in Reset Byte Foundry's convenience-replay caps — 2026-09-08, captureFoundryUpgradeCaps(), formatCacheSize(), getBitUnit(), mergeFoundryUpgradeCaps() (+2 more)

### Community 24 - "MilestonesPage/index.jsx"
Cohesion: 0.13
Nodes (14): Body, Card, Overlay, Title, StatCard, Badge, Category, CategoryHeading (+6 more)

### Community 25 - "tokens.js"
Cohesion: 0.13
Nodes (18): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), DEFAULT_MODE (+10 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.12
Nodes (15): AI-instruction file cost hygiene, Automation design principles, Budget discipline, Changelog convention, Commands, Funding, Issue-authoring tooling, Issue tracking conventions (+7 more)

### Community 27 - "getStoragePoolBandwidth"
Cohesion: 0.23
Nodes (15): Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity), Precision loss at large magnitudes in the SI-clean transform — fixed with a closed-form computation, Provision Disk's idle label now shows "0/N" up front; write-cache collect sped up to 5x, getCoreEarnTimeSeconds(), getDataStreamSpeedBytesPerSecond(), getDiskReadCacheFlushSeconds() (+7 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.09
Nodes (33): Project, Project, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, AppNav(), formatAmount(), formatAsCleanBytesIfExactMultiple(), formatBytes() (+25 more)

### Community 29 - "Architecture"
Cohesion: 0.20
Nodes (15): Adding a new tier, Architecture, Byte Foundry, Path aliases (`vite.config.js`), Architecture, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Foundry Memory always keeps the highest Disk row (issue #389) (+7 more)

### Community 30 - "fillDataLakeManually"
Cohesion: 0.42
Nodes (9): formatCapacityLabel(), A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch, `getDataLakeManualFillBitsNeeded` could offer a fill that Scale Out would immediately erase, fillDataLakeManually(), getDataLakeManualFillBitsNeeded(), isDataLakeManualFillAvailable() (+1 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Capacitor foundation (in progress — #70), Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+10 more)

### Community 32 - "tickPoolBufferFill"
Cohesion: 0.20
Nodes (27): A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382), Pool cards gated on a capacity threshold too; read cache pre-fills on pool unlock; manual transfer-block UI removed, Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes, Provision Disk moved back inside its pool card; pool Capacity switched from SI-clean to a plain decade-of-10 ladder, Read cache pre-fills on pool unlock, reinstated (+19 more)

### Community 33 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.14
Nodes (46): Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Why the tick-progress ring was removed, Constants (`src/game/layers.js`), Key engine functions (`src/game/engine.js`) (+38 more)

### Community 34 - "getDataLakeCapacity"
Cohesion: 0.27
Nodes (18): Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap, Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever, Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card, Data Lake capacity Upgrade removed from the forced priority order — array completion is now the only gate, Load-time migration clamps for the decade-power Capacity change; Data Lake capacity ladder moved onto the same shape, Per-pool Bandwidth capped at sqrt(Capacity); Data Lake capacity doubling funded by draining the lake; idle output liquidates into Bits, Two more migration/logic gaps found by a Devin review pass on this same PR: unbounded-below capacityLevel edits, and idle liquidation confusing "maxed" with "full" (+10 more)

### Community 35 - "simulate-run-times/SKILL.md"
Cohesion: 0.50
Nodes (3): Strategy snapshots (orphan branch) — required after every run, Usage, When to re-run

### Community 36 - "package.json"
Cohesion: 0.10
Nodes (19): browserslist, development, production, name, packageManager, private, type, @capacitor/cli (+11 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.17
Nodes (32): Changed, End-to-end testing, actSoftResets(), What it does, When editing the simulation, Testing, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, Migration in `src/save-migration/`, runs on every load — 2026-08-22 (+24 more)

### Community 38 - "App.test.jsx"
Cohesion: 0.05
Nodes (48): version, ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER (+40 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (31): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+23 more)

### Community 40 - "tickGame"
Cohesion: 0.19
Nodes (23): 2. Load the repo's invariants, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for the global automations, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier (+15 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "Testing"
Cohesion: 0.18
Nodes (21): A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake refill gating: staged 9 → 99 → 999 capacity from disk-array completion (+13 more)

### Community 43 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 44 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (39): Pool-local resets, The multiplier bar moved below the balance, with its percent readout below the bar itself, formatPoolBalance(), formatPoolBalanceStable(), getPoolBalanceUnit(), getPoolFixedUnit(), isDataStreamOutflowPaused(), ActionsRow (+31 more)

### Community 45 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 46 - "Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit"
Cohesion: 0.24
Nodes (18): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit, Three more findings from a Devin bot review pass on the pool-overflow Data Lake rework PR: an overflow rate that asymptotically never completes, a lifetime-counter bug, and dropped legacy transfers, applyDataLakeOverflow() (+10 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "main"
Cohesion: 0.14
Nodes (19): Automation engine, Code review tooling, Automation workflows, AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`) (+11 more)

### Community 49 - "capacitorConfig.test.js"
Cohesion: 0.13
Nodes (12): ref_node_child_process, ref_node_fs, ref_node_module, ref_node_path, ref_node_url, vite, vite-plugin-pwa, @vitejs/plugin-react (+4 more)

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
Cohesion: 0.11
Nodes (27): `AppNav/index.jsx`, Sacrifice confirm: in-game dialog; Core warning only when unlocked, Theming reference, styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode() (+19 more)

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.22
Nodes (7): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), targets

### Community 57 - "AppNav/index.jsx"
Cohesion: 0.22
Nodes (8): APP_NAV_BOTTOM_PAD, AttentionDot, Bar, Icon, Label, NavItem, pulseHigh, ATTENTION_HIGH

### Community 58 - "provisionDisk"
Cohesion: 0.16
Nodes (36): Removed, CLAUDE.md Economy model duplication trim — 2026-09-03, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+28 more)

### Community 59 - "navAttention.test.js"
Cohesion: 0.10
Nodes (18): vitest, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP, COMPUTE_FLOPS_TIER_DEFINITIONS, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_CONVERSION_UNLOCK_CAPACITY, INTRO_DISK_UNLOCK_CAPACITY (+10 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 63 - "ByteFoundryPage"
Cohesion: 0.19
Nodes (19): Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Provision Disk button no longer previews progress before the player has ever clicked it, Provision Disk: ordinal-scaled pass counts, and passes auto-continue after a manual start, Provision Disk's post-funding build timer duplicated the wait already spent funding it, Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix, getDiskCost(), getDiskProvisionPassesRequired(), getDiskRedeemTierName() (+11 more)

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 65 - "applyDevGameStateJson"
Cohesion: 0.21
Nodes (15): Security, 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2026-08-25 - Defense in Depth: Content Security Policy (+7 more)

### Community 66 - "palette.md"
Cohesion: 0.20
Nodes (9): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements, 2026-09-06 - Focus Visible Styles for custom interactive components and Disclosure summary elements (+1 more)

### Community 67 - "ComputePage"
Cohesion: 0.26
Nodes (12): Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), canForfeitComputeBoost(), canReclaimComputeBoost(), forfeitComputeBoost(), getComputeBoostTierDurationSeconds(), getNextComputeMergeDurationUpgradeIndex(), isUpgradeComputeMergeDurationAvailable() (+4 more)

### Community 68 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 70 - "Architecture / MainPage UI decisions"
Cohesion: 0.38
Nodes (11): Security notes, `OfflineProgressNotice/index.jsx`, Architecture / MainPage UI decisions, Offline progress, applyOfflineProgress(), getOfflineEffectiveSeconds(), tickIntroProduction(), loadGameState() (+3 more)

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 72 - "activateComputeBoost"
Cohesion: 0.27
Nodes (11): activateComputeBoost(), canActivateComputeBoost(), canStackComputeBoost(), getBiggestComputeTierWaitingOnMerge(), getComputeBoostTierField(), isComputeBoostTurnAvailable(), isComputeUpgradeAvailable(), isStackComputeBoostTurnAvailable() (+3 more)

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

### Community 82 - "getSaveIncompatibilityReason"
Cohesion: 0.36
Nodes (7): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()

### Community 84 - "getPrestigePointsAwarded"
Cohesion: 0.42
Nodes (9): Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Prestige and the Googol freeze, getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp(), getPrestigePpEarnProgressPercent(), getPrestigePpPerPower() (+1 more)

### Community 85 - "Shared components reference"
Cohesion: 0.29
Nodes (6): `AppMenu/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`

### Community 88 - "mergeDataLakes"
Cohesion: 0.47
Nodes (6): createEmptyDataLakes(), createEmptyDataLakeTier(), getLegacyPendingTransferCount(), isLegacyDataLakeTier(), mergeDataLakes(), migrateLegacyDataLakeTier()

### Community 89 - "ref_fs"
Cohesion: 0.08
Nodes (14): content, content, content, content, content, content, content, mdContent (+6 more)

### Community 106 - "storage.js"
Cohesion: 0.14
Nodes (41): Dev Mode, applyPendingComputeGrants(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), buildResetActiveSlotConfirmMessage(), buildResetByteFoundryConfirmMessage(), clearAllSaveProgress(), clearDevGameState() (+33 more)

## Knowledge Gaps
- **508 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+503 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 584 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `main` to `tickPoolBufferFill`, `Key engine functions (`src/game/engine.js`)`, `simulate-run-times/SKILL.md`, `createInitialGameState`, `Automation workflows`, `DataLakePanel`, `ByteFoundryPage/index.jsx`, `bump-version.mjs`, `file-task-issue/SKILL.md`, `provisionDisk`, `Architecture`, `CLAUDE.md`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `provisionDisk` to `Key engine functions (`src/game/engine.js`)`, `Economy model`, `ComputePage`, `createInitialGameState`, `Architecture / MainPage UI decisions`, `Automation workflows`, `tickGame`, `DataLakePanel`, `Testing`, `Tens`, `isMemoryCapacityAtCap`, `App.jsx`, `Fixed`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `tickGame()` connect `tickGame` to `Economy model`, `engine.js`, `Byte Foundry`, `DataLakePanel`, `clampNonNegative`, `getTierCost`, `isMemoryCapacityAtCap`, `useIncrementalGame.js`, `run-simulation.mjs`, `DataLakePanel/index.jsx`, `engine.test.js`, `Fixed`, `getStoragePoolBandwidth`, `SettingsPage/index.jsx`, `Architecture`, `tickPoolBufferFill`, `Key engine functions (`src/game/engine.js`)`, `createInitialGameState`, `Testing`, `ByteFoundryPage/index.jsx`, `Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit`, `provisionDisk`, `ByteFoundryPage`, `Architecture / MainPage UI decisions`, `activateComputeBoost`, `getPrestigePointsAwarded`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Are the 227 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 227 INFERRED edges - model-reasoned connections that need verification._
- **Are the 154 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 154 INFERRED edges - model-reasoned connections that need verification._
- **Are the 51 inferred relationships involving `tickGame()` (e.g. with `2. Load the repo's invariants` and `Architecture`) actually correct?**
  _`tickGame()` has 51 INFERRED edges - model-reasoned connections that need verification._
- **Are the 94 inferred relationships involving `MainPage reference` (e.g. with `AppNav()` and `progressFill()`) actually correct?**
  _`MainPage reference` has 94 INFERRED edges - model-reasoned connections that need verification._