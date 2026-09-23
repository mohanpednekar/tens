# Graph Report - tens  (2026-09-23)

## Corpus Check
- 116 files · ~477,568 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .ico 1)

## Summary
- 1679 nodes · 6190 edges · 91 communities (76 shown, 15 thin omitted)
- Extraction: 66% EXTRACTED · 34% INFERRED · 0% AMBIGUOUS · INFERRED: 2080 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `683abe44`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Testing
- MainPage/index.jsx
- Economy model
- engine.js
- navAttention.js
- ComputePage/index.jsx
- ByteFoundryPage/index.jsx
- Automation workflows
- engine.test.js
- DiskArrayRow
- DataLakePanel/index.jsx
- Constants (`src/game/layers.js`)
- tickGame
- provisionDisk
- ComputeFlopsPage/index.jsx
- [Unreleased]
- engine.computeFlops.test.js
- ref_child_process
- run-simulation.mjs
- getSaveIncompatibilityReason
- What You Must Do When Invoked
- bump-version.mjs
- DevModePage/index.jsx
- Button/index.jsx
- useIncrementalGame
- tokens.js
- AGENTS.md
- App.jsx
- SettingsPage/index.jsx
- formatCurrency
- Key engine functions (`src/game/engine.js`)
- CLAUDE.md
- tickPoolBufferFill
- MainPage reference
- MilestonesPage/index.jsx
- formatMemoryAmount
- package.json
- isProductionFrozen
- Byte Foundry
- Changelog
- devDependencies
- Shared components reference
- scripts
- isMemoryCapacityAtCap
- Procedure
- main
- vitest
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- ByteFoundryPage
- generate-pwa-icons.mjs
- Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes
- tickComputeMergeBoundary
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- graphify reference: query, path, explain
- simulate-run-times/SKILL.md
- resolutions
- sync-release-milestones.sh
- AppNav/index.jsx
- adversarialReviewMarker.js
- AppMenu/index.jsx
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- pull_request_template.md
- jsconfig.json
- ConfirmDialog/index.jsx
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- publish-strategy.sh
- contrast.js
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- fix-scale-up-test.cjs
- react
- graphify
- isComputeUpgradeTurnAvailable
- session-start.sh
- extraction-spec.md
- PWA_REFERENCE.md
- resolve-pr-threads.sh
- mergeState
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 226 edges
2. `Byte Foundry` - 155 edges
3. `tickGame()` - 102 edges
4. `MainPage reference` - 95 edges
5. `ByteFoundryPage()` - 88 edges
6. `MainPage()` - 86 edges
7. `Testing` - 82 edges
8. `useIncrementalGame()` - 77 edges
9. `clampNonNegative()` - 76 edges
10. `Pool-local resets` - 74 edges

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

## Communities (91 total, 15 thin omitted)

### Community 0 - "Testing"
Cohesion: 0.11
Nodes (36): Fixed, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever, Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card (+28 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (56): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments, CategoryHeading (+48 more)

### Community 2 - "Economy model"
Cohesion: 0.11
Nodes (27): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Economy model, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Prestige history: why PP replaced direct production doubling, Reintroducing the 1s-10s tickspeed ladder (+19 more)

### Community 3 - "engine.js"
Cohesion: 0.04
Nodes (127): seedDataLakeSave(), ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), allResourceIds(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS (+119 more)

### Community 4 - "navAttention.js"
Cohesion: 0.10
Nodes (32): enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+24 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (57): Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost() (+49 more)

### Community 6 - "ByteFoundryPage/index.jsx"
Cohesion: 0.05
Nodes (50): Pool-local resets, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, The multiplier bar moved below the balance, with its percent readout below the bar itself, formatDiskSizeInPoolUnit(), formatPoolBalance(), formatPoolBalanceStable(), getDataStreamBaseMultiplierPercent(), getDataStreamFillFraction() (+42 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "engine.test.js"
Cohesion: 0.04
Nodes (52): clearIntroCapacityUpgradeQueue(), combineIntroByte(), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric (+44 more)

### Community 9 - "DiskArrayRow"
Cohesion: 0.06
Nodes (62): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping (+54 more)

### Community 10 - "DataLakePanel/index.jsx"
Cohesion: 0.08
Nodes (48): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit, Pool gauge's separate bottom-half Data Lake arc replaced with one dial that switches meaning once the buffer is full, Three more findings from a Devin bot review pass on the pool-overflow Data Lake rework PR: an overflow rate that asymptotically never completes, a lifetime-counter bug, and dropped legacy transfers (+40 more)

### Community 11 - "Constants (`src/game/layers.js`)"
Cohesion: 0.24
Nodes (14): Why "Smart" autobuyers exist, Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Prestige and the Googol freeze, buySmartAutobuyer(), getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded() (+6 more)

### Community 12 - "tickGame"
Cohesion: 0.19
Nodes (31): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check (+23 more)

### Community 13 - "provisionDisk"
Cohesion: 0.08
Nodes (60): Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+52 more)

### Community 14 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.14
Nodes (20): PP Compute (Flops), Money, formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierWeight(), getComputeFlopsTotal(), isComputeFlopsPageRevealed() (+12 more)

### Community 15 - "[Unreleased]"
Cohesion: 0.14
Nodes (14): Accessibility, Added, Added, Changed, Changed, Changed, Changed, Fixed (+6 more)

### Community 16 - "engine.computeFlops.test.js"
Cohesion: 0.17
Nodes (15): buyAutoPrestigeAutobuyer(), buyAutoScaleUp(), buyComputeAutoBoost(), buyComputeFlopsTier(), buyComputeFlopsTierQuantity(), buyPrestigeDoublePp(), canBuyComputeFlopsTier(), getComputeFlopsAffordableAndCost() (+7 more)

### Community 17 - "ref_child_process"
Cohesion: 0.15
Nodes (7): { execSync }, { execSync }, ref_child_process, { execSync }, { execSync }, { execSync }, { execSync }

### Community 18 - "run-simulation.mjs"
Cohesion: 0.13
Nodes (24): actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+16 more)

### Community 19 - "getSaveIncompatibilityReason"
Cohesion: 0.36
Nodes (7): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): ref_node_os, assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+12 more)

### Community 22 - "DevModePage/index.jsx"
Cohesion: 0.13
Nodes (15): COMPUTE_FLOPS_REVEAL_PP, ButtonGrid, coerceDraft(), Details, FieldLabel, FieldRow, Header, JsonTextarea (+7 more)

### Community 23 - "Button/index.jsx"
Cohesion: 0.12
Nodes (21): Fixed, `Button/index.jsx`, The transfer budget becomes dynamic (tied to the Kilobyte tier's own block size); a real ButtonContent bug fixed along the way, Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent() (+13 more)

### Community 24 - "useIncrementalGame"
Cohesion: 0.11
Nodes (57): Dev Mode, Security notes, `OfflineProgressNotice/index.jsx`, Offline progress, applyOfflineProgress(), createEmptyDataLakes(), createEmptyDataLakeTier(), getOfflineEffectiveSeconds() (+49 more)

### Community 25 - "tokens.js"
Cohesion: 0.18
Nodes (10): DEFAULT_MODE, font, MODES, motion, palette, radius, shadow, space (+2 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.12
Nodes (15): AI-instruction file cost hygiene, Automation design principles, Budget discipline, Changelog convention, Commands, Funding, Issue-authoring tooling, Issue tracking conventions (+7 more)

### Community 27 - "App.jsx"
Cohesion: 0.17
Nodes (18): Theming reference, styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), getNavAttention(), buildResetActiveSlotConfirmMessage() (+10 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.12
Nodes (16): MUSEUM_PIN_CAP, buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem, MuseumList (+8 more)

### Community 29 - "formatCurrency"
Cohesion: 0.38
Nodes (10): Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), RESOURCE_SYMBOL() (+2 more)

### Community 30 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.14
Nodes (35): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Last tier's XP-funded tickspeed: from additive to multiplicative, Era ascension and Eons (#407), Key engine functions (`src/game/engine.js`), Multiplier overflow safety, The global tickspeed multiplier, applyFlopsAutobuyerMilestones(), buyAutoPrestige() (+27 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Documentation, Economy model, Funding (+10 more)

### Community 32 - "tickPoolBufferFill"
Cohesion: 0.18
Nodes (29): A fourth Codex round: the "absolute ceiling" clamp itself was too high, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Idle disk liquidation removed entirely — stranded disks now just sit idle instead of being converted to Bits, Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Pool cards gated on a capacity threshold too; read cache pre-fills on pool unlock; manual transfer-block UI removed, Provision Disk moved back inside its pool card; pool Capacity switched from SI-clean to a plain decade-of-10 ladder, Read cache pre-fills on pool unlock, reinstated, Storage's own reveal threshold lowered to pool 1's own capacity gate; Data Lake panel redesigned; Dev Mode's raw state-updater gap closed (+21 more)

### Community 33 - "MainPage reference"
Cohesion: 0.16
Nodes (32): seedState(), Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Why the tick-progress ring was removed, Multiplier outcomes are floored (+24 more)

### Community 34 - "MilestonesPage/index.jsx"
Cohesion: 0.20
Nodes (9): Badge, Category, CategoryHeading, Header, List, RootDiv, Row, RowControls (+1 more)

### Community 35 - "formatMemoryAmount"
Cohesion: 0.25
Nodes (17): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, flooredBitsLabel(), floorToDecimals(), formatBitsInNearestSiUnit() (+9 more)

### Community 36 - "package.json"
Cohesion: 0.10
Nodes (19): browserslist, development, production, name, packageManager, private, type, version (+11 more)

### Community 37 - "isProductionFrozen"
Cohesion: 0.19
Nodes (30): 2. Load the repo's invariants, actSoftResets(), What it does, When editing the simulation, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, `scaleUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry, Speed Up renamed to Scale Up and redesigned from a last-tier-only gate to a per-tier unlock ladder — 2026-09-09, Starting Money reduced from 10 to 1 (+22 more)

### Community 38 - "Byte Foundry"
Cohesion: 0.19
Nodes (32): Changed, `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap, Byte Foundry (+24 more)

### Community 39 - "Changelog"
Cohesion: 0.11
Nodes (18): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+10 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "Shared components reference"
Cohesion: 0.29
Nodes (6): `AppMenu/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`

### Community 43 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 44 - "isMemoryCapacityAtCap"
Cohesion: 0.33
Nodes (12): Added, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity's SI-clean mechanic restored — decoupled from the Data Stream's binary value instead of shared with it, Sacrifice for 10x Capacity gated behind every other currently-possible action, isMemoryCapacityAtCap(), isMemoryCapacityUpgradeAvailable() (+4 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "main"
Cohesion: 0.14
Nodes (19): Automation engine, Code review tooling, Interactive session startup, AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`) (+11 more)

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

### Community 55 - "ByteFoundryPage"
Cohesion: 0.15
Nodes (27): Adding a new tier, Architecture, Byte Foundry, Path aliases (`vite.config.js`), Project, Architecture, Project, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02 (+19 more)

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.22
Nodes (7): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), targets

### Community 58 - "Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes"
Cohesion: 0.35
Nodes (13): actFoundry(), A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch, `getDataLakeManualFillBitsNeeded` could offer a fill that Scale Out would immediately erase, Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes, fillDataLakeManually(), getDataLakeManualFillBitsNeeded(), getDataLakeUnitBits() (+5 more)

### Community 59 - "tickComputeMergeBoundary"
Cohesion: 0.15
Nodes (14): getComputeMergeDurationSeconds(), startComputeMergeReserve(), startComputeMergeReserveAtBoundary(), tickAutoMergeCloudsIntoDatacenter(), tickAutoMergeClustersIntoNetwork(), tickAutoMergeCoresIntoNode(), tickAutoMergeDatacentersIntoSupercomputer(), tickAutoMergeFabricsIntoCloud() (+6 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 65 - "simulate-run-times/SKILL.md"
Cohesion: 0.50
Nodes (3): Strategy snapshots (orphan branch) — required after every run, Usage, When to re-run

### Community 68 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 70 - "AppNav/index.jsx"
Cohesion: 0.22
Nodes (8): APP_NAV_BOTTOM_PAD, AttentionDot, Bar, Icon, Label, NavItem, pulseHigh, ATTENTION_HIGH

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 72 - "AppMenu/index.jsx"
Cohesion: 0.25
Nodes (7): `AppNav/index.jsx`, AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle

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

### Community 78 - "ConfirmDialog/index.jsx"
Cohesion: 0.18
Nodes (10): Actions, Body, Card, Overlay, Title, Body, Card, Overlay (+2 more)

### Community 82 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 89 - "fix-scale-up-test.cjs"
Cohesion: 0.22
Nodes (6): content, content, fs, ref_fs, lines, text

### Community 90 - "react"
Cohesion: 0.29
Nodes (5): react, react-dom, web-vitals, rootElement, reportWebVitals()

### Community 93 - "isComputeUpgradeTurnAvailable"
Cohesion: 0.32
Nodes (8): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, isComputeUpgradeTurnAvailable(), getComputeAttentionLevel(), getTiersAttentionLevel(), hasComputeAttention(), hasInstantMergeAvailable(), hasTiersAttention(), pickLevel()

### Community 110 - "mergeState"
Cohesion: 0.18
Nodes (13): Added, Removed, End-to-end testing, Testing, Migration in `src/save-migration/`, runs on every load — 2026-08-22, IncompatibleSaveNotice(), applyPendingComputeGrants(), mergeState() (+5 more)

## Knowledge Gaps
- **487 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+482 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 563 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `main` to `tickPoolBufferFill`, `simulate-run-times/SKILL.md`, `MainPage reference`, `isProductionFrozen`, `ByteFoundryPage/index.jsx`, `Byte Foundry`, `Automation workflows`, `provisionDisk`, `bump-version.mjs`, `file-task-issue/SKILL.md`, `ByteFoundryPage`, `CLAUDE.md`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `MainPage()` connect `MainPage reference` to `Testing`, `MainPage/index.jsx`, `Economy model`, `formatMemoryAmount`, `isProductionFrozen`, `ComputePage/index.jsx`, `Byte Foundry`, `Shared components reference`, `Constants (`src/game/layers.js`)`, `tickGame`, `ComputeFlopsPage/index.jsx`, `run-simulation.mjs`, `ByteFoundryPage`, `useIncrementalGame`, `App.jsx`, `formatCurrency`, `Key engine functions (`src/game/engine.js`)`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `Pool-local resets` connect `ByteFoundryPage/index.jsx` to `Testing`, `Economy model`, `ComputePage/index.jsx`, `DiskArrayRow`, `DataLakePanel/index.jsx`, `Constants (`src/game/layers.js`)`, `tickGame`, `provisionDisk`, `ComputeFlopsPage/index.jsx`, `formatCurrency`, `Key engine functions (`src/game/engine.js`)`, `CLAUDE.md`, `tickPoolBufferFill`, `formatMemoryAmount`, `isProductionFrozen`, `Byte Foundry`, `isMemoryCapacityAtCap`, `main`, `ByteFoundryPage`, `Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 225 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 225 INFERRED edges - model-reasoned connections that need verification._
- **Are the 154 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 154 INFERRED edges - model-reasoned connections that need verification._
- **Are the 50 inferred relationships involving `tickGame()` (e.g. with `2. Load the repo's invariants` and `Architecture`) actually correct?**
  _`tickGame()` has 50 INFERRED edges - model-reasoned connections that need verification._
- **Are the 94 inferred relationships involving `MainPage reference` (e.g. with `AppNav()` and `progressFill()`) actually correct?**
  _`MainPage reference` has 94 INFERRED edges - model-reasoned connections that need verification._