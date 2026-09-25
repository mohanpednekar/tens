# Graph Report - tens  (2026-09-25)

## Corpus Check
- 110 files · ~483,004 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .ico 1)

## Summary
- 1695 nodes · 6294 edges · 100 communities (83 shown, 17 thin omitted)
- Extraction: 66% EXTRACTED · 34% INFERRED · 0% AMBIGUOUS · INFERRED: 2133 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dd4953cf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.jsx
- MainPage/index.jsx
- mergeDataLakes
- layers.js
- Key engine functions (`src/game/engine.js`)
- ComputePage/index.jsx
- applyDevGameStateJson
- Automation workflows
- ComputeFlopsPage/index.jsx
- Shared components reference
- Tens
- clampNonNegative
- tickGame
- getSaveIncompatibilityReason
- DevModePage/index.jsx
- engine.js
- App.test.jsx
- ref_child_process
- run-simulation.mjs
- DataLakePanel/index.jsx
- What You Must Do When Invoked
- bump-version.mjs
- engine.test.js
- provisionDisk
- MilestonesPage/index.jsx
- tokens.js
- AGENTS.md
- Offline progress
- SettingsPage/index.jsx
- Testing
- tickPoolBufferFill
- CLAUDE.md
- navAttention.test.js
- MainPage
- MainPage reference
- Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit
- package.json
- createInitialGameState
- isMemoryCapacityAtCap
- Changelog
- buyBooster
- devDependencies
- Byte Foundry
- scripts
- ByteFoundryPage/index.jsx
- fillDataLakeManually
- Pool-local resets
- Procedure
- main
- capacitorConfig.test.js
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- [Unreleased]
- generate-pwa-icons.mjs
- AppNav/index.jsx
- DiskArrayRow
- DiskArrayRow/index.jsx
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03
- graphify reference: query, path, explain
- formatCurrency
- palette.md
- tickComputeFlopsAutobuyers
- resolutions
- sync-release-milestones.sh
- Fixed
- adversarialReviewMarker.js
- buyTickspeedMultiplier
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- pull_request_template.md
- jsconfig.json
- Button/index.jsx
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- publish-strategy.sh
- simulate-run-times/SKILL.md
- Copilot Instructions
- [0.3.0] - 2026-07-13
- MultiplierBar
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- defaultSlotName
- ref_fs
- StoragePage/index.jsx
- graphify
- session-start.sh
- extraction-spec.md
- PWA_REFERENCE.md
- resolve-pr-threads.sh
- useIncrementalGame
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 234 edges
2. `Byte Foundry` - 157 edges
3. `tickGame()` - 103 edges
4. `MainPage reference` - 96 edges
5. `ByteFoundryPage()` - 90 edges
6. `MainPage()` - 86 edges
7. `Testing` - 83 edges
8. `Pool-local resets` - 80 edges
9. `useIncrementalGame()` - 78 edges
10. `clampNonNegative()` - 76 edges

## Surprising Connections (you probably didn't know these)
- `A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too` --references--> `formatCapacityLabel()`  [INFERRED]
  docs/DESIGN_HISTORY.md → .claude/skills/simulate-run-times/run-simulation.mjs
- `Automation engine` --references--> `main()`  [INFERRED]
  AGENTS.md → scripts/bump-version.mjs
- `Code review tooling` --references--> `main()`  [INFERRED]
  AGENTS.md → scripts/bump-version.mjs
- `Automation workflows` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `Changelog convention` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs

## Import Cycles
- None detected.

## Communities (100 total, 17 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.12
Nodes (22): Theming reference, react, react-dom, styled-components, web-vitals, App(), GATE_EXEMPT_PAGES, PageShell (+14 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (57): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments, CategoryHeading (+49 more)

### Community 2 - "mergeDataLakes"
Cohesion: 0.47
Nodes (6): createEmptyDataLakes(), createEmptyDataLakeTier(), getLegacyPendingTransferCount(), isLegacyDataLakeTier(), mergeDataLakes(), migrateLegacyDataLakeTier()

### Community 3 - "layers.js"
Cohesion: 0.05
Nodes (63): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_BOOST_TIER_FIELDS (+55 more)

### Community 4 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.09
Nodes (48): seedState(), Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Key engine functions (`src/game/engine.js`), PP Compute (Flops), applyAutobuyerMilestones(), canBuyComputeFlopsTier(), getAutobuyerUnlockCost() (+40 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.05
Nodes (56): A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Storage funding rebuilt push→pull: the manual Redeem button and autobuyer-gated auto-redeem are gone (issue #571), canActivateComputeBoost(), canForfeitComputeBoost(), forfeitComputeBoost(), getBiggestComputeTierWaitingOnMerge() (+48 more)

### Community 6 - "applyDevGameStateJson"
Cohesion: 0.21
Nodes (15): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs. (+7 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.17
Nodes (14): Money, formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), ComputeFlopsPage(), FlopsHero, Header, Hint (+6 more)

### Community 9 - "Shared components reference"
Cohesion: 0.14
Nodes (12): `AppMenu/index.jsx`, `AppNav/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`, AppMenu(), Backdrop (+4 more)

### Community 10 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 11 - "clampNonNegative"
Cohesion: 0.10
Nodes (49): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Era ascension and Eons (#407), Pause/resume for the global automations, Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier (+41 more)

### Community 12 - "tickGame"
Cohesion: 0.08
Nodes (40): Architecture / MainPage UI decisions, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative (+32 more)

### Community 13 - "getSaveIncompatibilityReason"
Cohesion: 0.36
Nodes (7): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.12
Nodes (17): ButtonGrid, coerceDraft(), Details, FieldLabel, FieldNode(), FieldRow, Header, JsonTextarea (+9 more)

### Community 15 - "engine.js"
Cohesion: 0.06
Nodes (58): areStoragePoolDisksFull(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, combineIntroByte(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, decrementFullDiskCount(), enableAutoMergeCloudsIntoDatacenter (+50 more)

### Community 16 - "App.test.jsx"
Cohesion: 0.05
Nodes (48): version, ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER (+40 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.11
Nodes (40): actCapacityUpgrade(), actMainBuys(), actPlayer(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+32 more)

### Community 19 - "DataLakePanel/index.jsx"
Cohesion: 0.10
Nodes (31): Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Pool gauge's separate bottom-half Data Lake arc replaced with one dial that switches meaning once the buffer is full, ActionButton, BareDivider, clampFraction(), DataLakePanel(), getVisibleLakeTierIndexes(), LakeBlock (+23 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.17
Nodes (21): ref_node_fs, ref_node_os, assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY (+13 more)

### Community 22 - "engine.test.js"
Cohesion: 0.04
Nodes (38): getComputeMergeDurationSeconds(), getDataStreamBaseMultiplierPercent(), getDataStreamEffectMultiplier(), getDataStreamFillFraction(), getDataStreamMultiplierPercent(), getFillMultiplierPercent(), getPoolBaseMultiplierPercent(), getPoolBufferFillFraction() (+30 more)

### Community 23 - "provisionDisk"
Cohesion: 0.15
Nodes (38): Added, Removed, CLAUDE.md Economy model duplication trim — 2026-09-03, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09 (+30 more)

### Community 24 - "MilestonesPage/index.jsx"
Cohesion: 0.12
Nodes (16): Body, Card, Overlay, Title, StatCard, getFlopsAutobuyerUnlockEra(), Badge, Category (+8 more)

### Community 25 - "tokens.js"
Cohesion: 0.13
Nodes (18): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), DEFAULT_MODE (+10 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.11
Nodes (17): AI-instruction file cost hygiene, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling, Commands, Funding (+9 more)

### Community 27 - "Offline progress"
Cohesion: 0.73
Nodes (6): `OfflineProgressNotice/index.jsx`, Offline progress, applyOfflineProgress(), getOfflineEffectiveSeconds(), computeInitialGame(), computeOfflineCatchUp()

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.07
Nodes (29): Changed, `ConfirmDialog/index.jsx`, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Actions, Body, Card, ConfirmDialog(), Overlay (+21 more)

### Community 29 - "Testing"
Cohesion: 0.11
Nodes (33): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap, Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever, Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card, Data Lake capacity Upgrade removed from the forced priority order — array completion is now the only gate (+25 more)

### Community 30 - "tickPoolBufferFill"
Cohesion: 0.14
Nodes (41): Adding a new tier, Architecture, Byte Foundry, Path aliases (`vite.config.js`), Project, Architecture, Project, A fourth Codex round: the "absolute ceiling" clamp itself was too high (+33 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.10
Nodes (19): AI-instruction file cost hygiene, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Documentation, Economy model, Funding (+11 more)

### Community 32 - "navAttention.test.js"
Cohesion: 0.11
Nodes (21): vitest, buyComputeFlopsTier(), getComputeFlopsAffordableQuantity(), getComputeFlopsTierCost(), AUTO_SCALE_UP_COST, BYTES_ID, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP (+13 more)

### Community 33 - "MainPage"
Cohesion: 0.17
Nodes (29): 5. Authorization boundary, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Why the tick-progress ring was removed, Adding a new tier (+21 more)

### Community 34 - "MainPage reference"
Cohesion: 0.17
Nodes (30): `DiskArrayRow/index.jsx`, "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Provision Disk button no longer previews progress before the player has ever clicked it, Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix (+22 more)

### Community 35 - "Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit"
Cohesion: 0.22
Nodes (21): A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit, Three more findings from a Devin bot review pass on the pool-overflow Data Lake rework PR: an overflow rate that asymptotically never completes, a lifetime-counter bug, and dropped legacy transfers, applyDataLakeOverflow(), decomposeDataLakeUnits() (+13 more)

### Community 36 - "package.json"
Cohesion: 0.10
Nodes (18): browserslist, development, production, name, packageManager, private, type, @capacitor/cli (+10 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.15
Nodes (32): 2. Load the repo's invariants, End-to-end testing, actSoftResets(), Testing, Migration in `src/save-migration/`, runs on every load — 2026-08-22, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, Removing Claim Core: superseded by Data Lake Boosters, `scaleUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry (+24 more)

### Community 38 - "isMemoryCapacityAtCap"
Cohesion: 0.20
Nodes (18): A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool 10's buffer ceiling landed a ULP below its own largest disk's face value — 2026-09-08, Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024, Pool Capacity's SI-clean mechanic restored — decoupled from the Data Stream's binary value instead of shared with it, Sacrifice confirm: in-game dialog; Core warning only when unlocked (+10 more)

### Community 39 - "Changelog"
Cohesion: 0.13
Nodes (14): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added, Added (+6 more)

### Community 40 - "buyBooster"
Cohesion: 0.34
Nodes (16): `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, buyBooster(), getComputeEntityEffectiveCap(), getComputeEntityFieldRoom(), getComputeReserveHeld() (+8 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "Byte Foundry"
Cohesion: 0.16
Nodes (29): A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping, Idle disk liquidation removed entirely — stranded disks now just sit idle instead of being converted to Bits (+21 more)

### Community 43 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 44 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (30): getPoolTapBonusPercent(), ActionsRow, BalanceSeparator, BalanceText, BarFillBase, BarFillBonus, BarFillLake, BarPercentLabel (+22 more)

### Community 45 - "fillDataLakeManually"
Cohesion: 0.24
Nodes (15): Changed, actFoundry(), A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch, `getDataLakeManualFillBitsNeeded` could offer a fill that Scale Out would immediately erase, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity), fillDataLakeManually() (+7 more)

### Community 46 - "Pool-local resets"
Cohesion: 0.27
Nodes (15): Pool-local resets, Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Provision Disk's post-funding build timer duplicated the wait already spent funding it, Upgrade Data Stream arms below a full Buffer (outflow pause), clearIntroCapacityUpgradeQueue(), getDiskProvisionPassesRequired(), getPoolBufferBits(), getPoolCacheReservationBits() (+7 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "main"
Cohesion: 0.18
Nodes (15): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Orchestration model, PR conflict sweep (`pr-conflict-sweep.yml`) (+7 more)

### Community 49 - "capacitorConfig.test.js"
Cohesion: 0.14
Nodes (11): ref_node_child_process, ref_node_module, ref_node_path, ref_node_url, vite, vite-plugin-pwa, @vitejs/plugin-react, script (+3 more)

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

### Community 55 - "[Unreleased]"
Cohesion: 0.15
Nodes (13): Accessibility, Added, Added, Added, Changed, Changed, Changed, Fixed (+5 more)

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.22
Nodes (7): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), targets

### Community 57 - "AppNav/index.jsx"
Cohesion: 0.22
Nodes (8): APP_NAV_BOTTOM_PAD, AttentionDot, Bar, Icon, Label, NavItem, pulseHigh, ATTENTION_HIGH

### Community 58 - "DiskArrayRow"
Cohesion: 0.18
Nodes (13): Foundry Memory always keeps the highest Disk row (issue #389), Read cache blocks (`DiskArrayRow`) render a proportional fill overlay, not just full/empty, `tickDiskAutoFill`: a fully-staged cache could get starved out by an unrelated smaller size, DiskArrayRow(), formatDiskSize, getDiskReadCacheFlush(), getDiskReadCacheFlushFill(), getDiskRedeemTierName() (+5 more)

### Community 59 - "DiskArrayRow/index.jsx"
Cohesion: 0.15
Nodes (12): CacheBlock, CacheBlocksRow, CacheFillIndicator, CellLabel, DiskSizeRow, DiskSquare, pullPulse, RebuildingText (+4 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 63 - "Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03"
Cohesion: 0.47
Nodes (10): Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, activateComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), getComputeBoostTierDurationSeconds(), getComputeBoostTierField(), isValidComputeBoostTier() (+2 more)

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 65 - "formatCurrency"
Cohesion: 0.42
Nodes (9): Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), RESOURCE_SYMBOL() (+1 more)

### Community 66 - "palette.md"
Cohesion: 0.20
Nodes (9): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements, 2026-09-06 - Focus Visible Styles for custom interactive components and Disclosure summary elements (+1 more)

### Community 67 - "tickComputeFlopsAutobuyers"
Cohesion: 0.31
Nodes (8): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, buyComputeFlopsTierQuantity(), getComputeFlopsAffordableAndCost(), tickComputeFlopsAutobuyers()

### Community 68 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 70 - "Fixed"
Cohesion: 0.50
Nodes (8): Fixed, Reset Byte Foundry convenience-auto now includes Capacity/Sacrifice — 2026-08-25, Reset Byte Foundry's convenience replay didn't cover partial Provision Disk passes — 2026-09-08, Two more gaps in Reset Byte Foundry's convenience-replay caps — 2026-09-08, captureFoundryUpgradeCaps(), getSiCleanEquivalentBits(), mergeFoundryUpgradeCaps(), resetByteFoundry()

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 72 - "buyTickspeedMultiplier"
Cohesion: 0.54
Nodes (8): actTickspeed(), `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, The last tier's XP-funded tickspeed, buyTickspeedMultiplier(), consumeXpForLastTierTickspeed(), getLastTierId(), getLastTierXpTickspeedMinConsumption(), isLastTierTickspeedXpUnlocked()

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
Nodes (21): Fixed, `Button/index.jsx`, Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb() (+13 more)

### Community 82 - "simulate-run-times/SKILL.md"
Cohesion: 0.40
Nodes (4): Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run

### Community 84 - "[0.3.0] - 2026-07-13"
Cohesion: 0.50
Nodes (4): [0.3.0] - 2026-07-13, Added, Changed, Fixed

### Community 85 - "MultiplierBar"
Cohesion: 0.67
Nodes (4): The multiplier bar moved below the balance, with its percent readout below the bar itself, clampBarValue(), MultiplierBar(), percentToBarWidthPercent()

### Community 88 - "defaultSlotName"
Cohesion: 0.83
Nodes (4): buildDefaultMeta(), coerceMeta(), defaultSlotName(), withSupporterSlots()

### Community 90 - "StoragePage/index.jsx"
Cohesion: 0.50
Nodes (3): Header, RootDiv, Title

### Community 106 - "useIncrementalGame"
Cohesion: 0.22
Nodes (32): Dev Mode, Security notes, buildEraseAllSavesConfirmMessage(), clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot(), completeDummySupporterPurchase() (+24 more)

## Knowledge Gaps
- **491 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+486 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 569 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `main` to `MainPage`, `createInitialGameState`, `Automation workflows`, `buyBooster`, `fillDataLakeManually`, `Pool-local resets`, `simulate-run-times/SKILL.md`, `run-simulation.mjs`, `bump-version.mjs`, `file-task-issue/SKILL.md`, `provisionDisk`, `AGENTS.md`, `tickPoolBufferFill`, `CLAUDE.md`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `Pool-local resets` connect `Pool-local resets` to `ComputePage/index.jsx`, `ComputeFlopsPage/index.jsx`, `clampNonNegative`, `tickGame`, `run-simulation.mjs`, `DataLakePanel/index.jsx`, `engine.test.js`, `provisionDisk`, `tickPoolBufferFill`, `CLAUDE.md`, `MainPage reference`, `Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit`, `isMemoryCapacityAtCap`, `buyBooster`, `Byte Foundry`, `fillDataLakeManually`, `main`, `DiskArrayRow`, `formatCurrency`, `Fixed`, `MultiplierBar`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `ByteFoundryPage()` connect `MainPage reference` to `App.jsx`, `Key engine functions (`src/game/engine.js`)`, `ComputePage/index.jsx`, `clampNonNegative`, `tickGame`, `run-simulation.mjs`, `DataLakePanel/index.jsx`, `engine.test.js`, `provisionDisk`, `Offline progress`, `SettingsPage/index.jsx`, `Testing`, `tickPoolBufferFill`, `Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit`, `createInitialGameState`, `isMemoryCapacityAtCap`, `buyBooster`, `Byte Foundry`, `ByteFoundryPage/index.jsx`, `fillDataLakeManually`, `Pool-local resets`, `DiskArrayRow`, `Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 233 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 233 INFERRED edges - model-reasoned connections that need verification._
- **Are the 156 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 156 INFERRED edges - model-reasoned connections that need verification._
- **Are the 51 inferred relationships involving `tickGame()` (e.g. with `2. Load the repo's invariants` and `Architecture`) actually correct?**
  _`tickGame()` has 51 INFERRED edges - model-reasoned connections that need verification._
- **Are the 95 inferred relationships involving `MainPage reference` (e.g. with `AppNav()` and `progressFill()`) actually correct?**
  _`MainPage reference` has 95 INFERRED edges - model-reasoned connections that need verification._