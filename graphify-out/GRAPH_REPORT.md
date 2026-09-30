# Graph Report - tens  (2026-09-29)

## Corpus Check
- 126 files · ~486,294 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .ico 1)

## Summary
- 1726 nodes · 6336 edges · 92 communities (77 shown, 15 thin omitted)
- Extraction: 66% EXTRACTED · 34% INFERRED · 0% AMBIGUOUS · INFERRED: 2146 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8717ddc0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- contrast.js
- MainPage/index.jsx
- ComputePage
- layers.js
- navAttention.js
- ComputePage/index.jsx
- Pool-local resets
- Automation workflows
- Key engine functions (`src/game/engine.js`)
- App.jsx
- Tens
- ByteFoundryPage
- run-simulation.mjs
- Economy model
- DevModePage/index.jsx
- engine.js
- clampNonNegative
- ref_child_process
- fillDataLakeManually
- useIncrementalGame
- What You Must Do When Invoked
- bump-version.mjs
- engine.test.js
- Byte Foundry
- ComputeFlopsPage/index.jsx
- Theming reference
- AGENTS.md
- Testing
- SettingsPage/index.jsx
- MilestonesPage/index.jsx
- provisionDisk
- CLAUDE.md
- buyBooster
- Shared components reference
- DataLakePanel/index.jsx
- engine.computeFlops.test.js
- package.json
- createInitialGameState
- applyDevGameStateJson
- [Unreleased]
- isMemoryCapacityAtCap
- devDependencies
- DiskArrayRow
- scripts
- ByteFoundryPage/index.jsx
- navAttention.test.js
- MainPage reference
- Procedure
- main
- capacitorConfig.test.js
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- getSaveIncompatibilityReason
- generate-pwa-icons.mjs
- tickGame
- AppMenu/index.jsx
- isDataLakeCapacityDoublingAvailable
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- src/index.jsx
- graphify reference: query, path, explain
- mergeDataLakes
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
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
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
1. `Key engine functions (`src/game/engine.js`)` - 236 edges
2. `Byte Foundry` - 158 edges
3. `tickGame()` - 103 edges
4. `MainPage reference` - 99 edges
5. `ByteFoundryPage()` - 90 edges
6. `MainPage()` - 86 edges
7. `Testing` - 85 edges
8. `Pool-local resets` - 83 edges
9. `useIncrementalGame()` - 77 edges
10. `clampNonNegative()` - 76 edges

## Surprising Connections (you probably didn't know these)
- `Automation workflows` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `Changelog convention` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `Pull requests` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `5. Specs go stale — write defensively, and re-verify before filing a rewrite` --references--> `main()`  [INFERRED]
  .claude/skills/file-task-issue/SKILL.md → scripts/bump-version.mjs
- `Why a PAT instead of the default `GITHUB_TOKEN`` --references--> `main()`  [INFERRED]
  docs/DESIGN_HISTORY.md → scripts/bump-version.mjs

## Import Cycles
- None detected.

## Communities (92 total, 15 thin omitted)

### Community 0 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (65): Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), RESOURCE_SYMBOL() (+57 more)

### Community 2 - "ComputePage"
Cohesion: 0.22
Nodes (24): actFoundry(), Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost() (+16 more)

### Community 3 - "layers.js"
Cohesion: 0.03
Nodes (103): seedDataLakeSave(), version, ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS (+95 more)

### Community 4 - "navAttention.js"
Cohesion: 0.10
Nodes (34): canBuyComputeFlopsTier(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+26 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.07
Nodes (29): isComputeMergeStartAvailableAtBoundary(), ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostRow, canMerge(), CompactButton (+21 more)

### Community 6 - "Pool-local resets"
Cohesion: 0.19
Nodes (24): Pool-local resets, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card, Load-time migration clamps for the decade-power Capacity change; Data Lake capacity ladder moved onto the same shape, Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Provision Disk moved back inside its pool card; pool Capacity switched from SI-clean to a plain decade-of-10 ladder, Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix (+16 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.19
Nodes (21): A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity), Precision loss at large magnitudes in the SI-clean transform — fixed with a closed-form computation, Key engine functions (`src/game/engine.js`), getDataStreamBaseMultiplierPercent(), getDataStreamEffectMultiplier(), getDataStreamFillFraction(), getDataStreamMultiplierPercent() (+13 more)

### Community 9 - "App.jsx"
Cohesion: 0.10
Nodes (28): `AppNav/index.jsx`, Sacrifice confirm: in-game dialog; Core warning only when unlocked, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), APP_NAV_BOTTOM_PAD (+20 more)

### Community 10 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 11 - "ByteFoundryPage"
Cohesion: 0.16
Nodes (31): Adding a new tier, Architecture, Byte Foundry, Path aliases (`vite.config.js`), Project, Added, Architecture, Project (+23 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.11
Nodes (40): actMainBuys(), actPlayer(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+32 more)

### Community 13 - "Economy model"
Cohesion: 0.11
Nodes (20): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Prestige history: why PP replaced direct production doubling, Reset button history (+12 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (19): ButtonGrid, coerceDraft(), Details, FieldLabel, FieldNode(), FieldRow, Header, JsonTextarea (+11 more)

### Community 15 - "engine.js"
Cohesion: 0.07
Nodes (50): allResourceIds(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode (+42 more)

### Community 16 - "clampNonNegative"
Cohesion: 0.12
Nodes (40): actCapacityUpgrade(), What it does, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier (+32 more)

### Community 17 - "ref_child_process"
Cohesion: 0.15
Nodes (7): { execSync }, { execSync }, { execSync }, ref_child_process, { execSync }, { execSync }, { execSync }

### Community 18 - "fillDataLakeManually"
Cohesion: 0.46
Nodes (8): formatCapacityLabel(), A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, `getDataLakeManualFillBitsNeeded` could offer a fill that Scale Out would immediately erase, fillDataLakeManually(), getBoosterPurchaseCost(), getDataLakeManualFillBitsNeeded(), isDataLakeManualFillAvailable()

### Community 19 - "useIncrementalGame"
Cohesion: 0.24
Nodes (24): Dev Mode, Security notes, `OfflineProgressNotice/index.jsx`, Offline progress, applyOfflineProgress(), getOfflineEffectiveSeconds(), clearAllSaveProgress(), clearDevGameState() (+16 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.17
Nodes (21): ref_node_fs, ref_node_os, assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY (+13 more)

### Community 22 - "engine.test.js"
Cohesion: 0.05
Nodes (19): getBiggestComputeTierWaitingOnMerge(), isAnyComputeMergeInFlight(), eraEligibleState(), noOtherUpgradesLeft, unlockedLastTierState(), withIntro(), withOwned(), withPoolBuffer() (+11 more)

### Community 23 - "Byte Foundry"
Cohesion: 0.13
Nodes (30): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755), Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit, Three more findings from a Devin bot review pass on the pool-overflow Data Lake rework PR: an overflow rate that asymptotically never completes, a lifetime-counter bug, and dropped legacy transfers, Byte Foundry (+22 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.18
Nodes (16): PP Compute (Flops), Money, formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), isComputeFlopsPageRevealed(), ComputeFlopsPage(), FlopsHero (+8 more)

### Community 25 - "Theming reference"
Cohesion: 0.11
Nodes (19): Changed, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Theming reference, ConfirmDialog(), IncompatibleSaveNotice(), GlobalStyle, getSystemThemeMode(), ThemeProvider() (+11 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.12
Nodes (15): AI-instruction file cost hygiene, Automation design principles, Budget discipline, Changelog convention, Commands, Funding, Issue-authoring tooling, Issue tracking conventions (+7 more)

### Community 27 - "Testing"
Cohesion: 0.17
Nodes (22): A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake refill gating: staged 9 → 99 → 999 capacity from disk-array completion, Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382), Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Disk ladder offers every Byte power-of-ten size (issue #368), Icons added to the Byte Foundry footer figures; 🧠 replaced on "Capacity ×2" (+14 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.12
Nodes (19): getEonsAwarded(), isEraEligible(), buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote (+11 more)

### Community 29 - "MilestonesPage/index.jsx"
Cohesion: 0.08
Nodes (28): Fixed, react, styled-components, VisuallyHidden, Actions, Body, Card, Overlay (+20 more)

### Community 30 - "provisionDisk"
Cohesion: 0.13
Nodes (49): Fixed, Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+41 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Documentation, Economy model, Funding (+10 more)

### Community 32 - "buyBooster"
Cohesion: 0.29
Nodes (18): `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, buyBooster(), getBoosterBulkPurchase(), getComputeEntityEffectiveCap(), getComputeEntityFieldRoom() (+10 more)

### Community 33 - "Shared components reference"
Cohesion: 0.33
Nodes (5): `AppMenu/index.jsx`, `ConfirmDialog/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`

### Community 34 - "DataLakePanel/index.jsx"
Cohesion: 0.10
Nodes (41): Changed, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap, Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever, Idle disk liquidation could destroy a disk from a still-mid-build array, not just a genuinely full lake, Two more migration/logic gaps found by a Devin review pass on this same PR: unbounded-below capacityLevel edits, and idle liquidation confusing "maxed" with "full", ActionButton (+33 more)

### Community 35 - "engine.computeFlops.test.js"
Cohesion: 0.12
Nodes (20): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, buyComputeFlopsTier(), buyComputeFlopsTierQuantity(), getComputeFlopsAffordableAndCost() (+12 more)

### Community 36 - "package.json"
Cohesion: 0.10
Nodes (18): browserslist, development, production, name, packageManager, private, type, @capacitor/cli (+10 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.14
Nodes (37): 2. Load the repo's invariants, End-to-end testing, actSoftResets(), When editing the simulation, Testing, Migration in `src/save-migration/`, runs on every load — 2026-08-22, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, Removing Claim Core: superseded by Data Lake Boosters (+29 more)

### Community 38 - "applyDevGameStateJson"
Cohesion: 0.21
Nodes (15): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs. (+7 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (31): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+23 more)

### Community 40 - "isMemoryCapacityAtCap"
Cohesion: 0.16
Nodes (22): A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool 10's buffer ceiling landed a ULP below its own largest disk's face value — 2026-09-08, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024 (+14 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.06
Nodes (70): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight (+62 more)

### Community 43 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 44 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (56): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Provision Disk button no longer previews progress before the player has ever clicked it, The multiplier bar moved below the balance, with its percent readout below the bar itself, combineIntroByte() (+48 more)

### Community 45 - "navAttention.test.js"
Cohesion: 0.12
Nodes (15): vitest, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_BYTE_COMBINE_COST, INTRO_CONVERSION_UNLOCK_CAPACITY, INTRO_DISK_UNLOCK_CAPACITY, INTRO_STARTING_CAPACITY, MONEY_ID (+7 more)

### Community 46 - "MainPage reference"
Cohesion: 0.14
Nodes (36): seedState(), Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Reintroducing the 1s-10s tickspeed ladder, Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Why the tick-progress ring was removed (+28 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "main"
Cohesion: 0.11
Nodes (21): Automation engine, Code review tooling, Interactive session startup, Strategy snapshots (orphan branch) — required after every run, Usage, When to re-run, AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`) (+13 more)

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

### Community 55 - "getSaveIncompatibilityReason"
Cohesion: 0.32
Nodes (8): `IncompatibleSaveNotice/index.jsx`, SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.22
Nodes (7): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), targets

### Community 57 - "tickGame"
Cohesion: 0.21
Nodes (20): 5. Authorization boundary, actTickspeed(), Architecture / MainPage UI decisions, `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Multiplier outcomes are floored, The last tier's XP-funded tickspeed, 2024-07-28 - Replace O(N) attempts loop with O(1) batch processing for tickGame autobuyers (+12 more)

### Community 58 - "AppMenu/index.jsx"
Cohesion: 0.33
Nodes (5): Backdrop, Icon, MenuButton, Sheet, SheetTitle

### Community 59 - "isDataLakeCapacityDoublingAvailable"
Cohesion: 0.33
Nodes (9): Data Lake capacity Upgrade removed from the forced priority order — array completion is now the only gate, getDataLakeCapacityUnlockArraySize(), getDataLakeSubSizeStep(), getDiskLadderSizeBits(), getDiskSizeForTierLevel(), getStoragePoolSizes(), isDataLakeCapacityDoublingAvailable(), isDataLakeCapacityDoublingTurnAvailable() (+1 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 63 - "src/index.jsx"
Cohesion: 0.33
Nodes (4): react-dom, web-vitals, rootElement, reportWebVitals()

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 65 - "mergeDataLakes"
Cohesion: 0.47
Nodes (6): createEmptyDataLakes(), createEmptyDataLakeTier(), getLegacyPendingTransferCount(), isLegacyDataLakeTier(), mergeDataLakes(), migrateLegacyDataLakeTier()

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
Cohesion: 0.17
Nodes (15): `Button/index.jsx`, The transfer budget becomes dynamic (tied to the Kilobyte tier's own block size); a real ButtonContent bug fixed along the way, Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb() (+7 more)

### Community 89 - "ref_fs"
Cohesion: 0.08
Nodes (14): content, content, content, content, content, content, content, mdContent (+6 more)

### Community 106 - "storage.js"
Cohesion: 0.19
Nodes (23): applyPendingComputeGrants(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), coerceMeta(), completeDummySupporterPurchase(), defaultSlotName(), FREE_SLOT_COUNT, grantSupporterUnlock() (+15 more)

## Knowledge Gaps
- **509 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+504 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 585 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `main` to `buyBooster`, `DataLakePanel/index.jsx`, `createInitialGameState`, `Pool-local resets`, `Automation workflows`, `ByteFoundryPage`, `run-simulation.mjs`, `MainPage reference`, `bump-version.mjs`, `file-task-issue/SKILL.md`, `Testing`, `provisionDisk`, `CLAUDE.md`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `ByteFoundryPage()` connect `ByteFoundryPage` to `ComputePage`, `Pool-local resets`, `Key engine functions (`src/game/engine.js`)`, `App.jsx`, `run-simulation.mjs`, `Economy model`, `clampNonNegative`, `useIncrementalGame`, `Byte Foundry`, `Theming reference`, `Testing`, `provisionDisk`, `buyBooster`, `Shared components reference`, `createInitialGameState`, `isMemoryCapacityAtCap`, `DiskArrayRow`, `ByteFoundryPage/index.jsx`, `MainPage reference`, `tickGame`, `Button/index.jsx`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `Pool-local resets` connect `Pool-local resets` to `MainPage/index.jsx`, `ComputePage`, `Key engine functions (`src/game/engine.js`)`, `ByteFoundryPage`, `clampNonNegative`, `fillDataLakeManually`, `Byte Foundry`, `ComputeFlopsPage/index.jsx`, `Testing`, `provisionDisk`, `CLAUDE.md`, `buyBooster`, `DataLakePanel/index.jsx`, `createInitialGameState`, `isMemoryCapacityAtCap`, `DiskArrayRow`, `ByteFoundryPage/index.jsx`, `main`, `tickGame`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Are the 235 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 235 INFERRED edges - model-reasoned connections that need verification._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Are the 51 inferred relationships involving `tickGame()` (e.g. with `2. Load the repo's invariants` and `Architecture`) actually correct?**
  _`tickGame()` has 51 INFERRED edges - model-reasoned connections that need verification._
- **Are the 98 inferred relationships involving `MainPage reference` (e.g. with `AppNav()` and `progressFill()`) actually correct?**
  _`MainPage reference` has 98 INFERRED edges - model-reasoned connections that need verification._