# Graph Report - app  (2026-10-03)

## Corpus Check
- 122 files · ~494,103 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .ico 1)

## Summary
- 1759 nodes · 6654 edges · 96 communities (78 shown, 18 thin omitted)
- Extraction: 68% EXTRACTED · 32% INFERRED · 0% AMBIGUOUS · INFERRED: 2121 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `23a40aa1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- InfoPage
- MainPage
- engine.js
- layers.js
- navAttention.js
- ComputePage
- tickPoolBufferFill
- lint-workflow-shell.mjs
- Pool-local resets
- App.jsx
- [Unreleased]
- check-graphify-freshness.mjs
- getTierCost
- Economy model
- DevModePage/index.jsx
- useIncrementalGame.js
- Key engine functions (`src/game/engine.js`)
- ref_child_process
- run-simulation.mjs
- storage.js
- What You Must Do When Invoked
- bump-version.mjs
- engine.test.js
- fillDataLakeManually
- ComputeFlopsPage/index.jsx
- contrast.js
- AGENTS.md
- Testing
- SettingsPage/index.jsx
- App.test.jsx
- provisionDisk
- CLAUDE.md
- Byte Foundry
- Shared components reference
- DataLakePanel
- bolt.md
- package.json
- createInitialGameState
- applyDevGameStateJson
- Changelog
- isMemoryCapacityAtCap
- devDependencies
- DiskArrayRow
- scripts
- ByteFoundryPage
- navAttention.test.js
- tickGame
- Procedure
- Automation workflows
- ref_node_path
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- getSaveIncompatibilityReason
- generate-pwa-icons.mjs
- Button/index.jsx
- MilestonesPage/index.jsx
- Dev Mode
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- react
- graphify reference: query, path, explain
- mergeState
- palette.md
- Offline progress
- resolutions
- sync-release-milestones.sh
- INTRO_COMPUTE_CORE_UNLOCK_CAPACITY
- adversarialReviewMarker.js
- browserslist
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- pull_request_template.md
- jsconfig.json
- Button
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- publish-strategy.sh
- orphan-branch-scan.sh
- Copilot Instructions
- classify-claude-failure.sh
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- graphify
- session-start.sh
- extraction-spec.md
- PWA_REFERENCE.md
- resolve-pr-threads.sh
- mergeDataLakes
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 238 edges
2. `Byte Foundry` - 158 edges
3. `MainPage()` - 145 edges
4. `ByteFoundryPage()` - 118 edges
5. `tickGame()` - 104 edges
6. `MainPage reference` - 99 edges
7. `Testing` - 85 edges
8. `Pool-local resets` - 80 edges
9. `useIncrementalGame()` - 77 edges
10. `clampNonNegative()` - 76 edges

## Surprising Connections (you probably didn't know these)
- `Changed` --references--> `DiskArrayRow()`  [INFERRED]
  CHANGELOG.md → src/components/DiskArrayRow/index.jsx
- `Read cache blocks (`DiskArrayRow`) render a proportional fill overlay, not just full/empty` --references--> `DiskArrayRow()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/components/DiskArrayRow/index.jsx
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent` --references--> `getCostEpochExponent()`  [INFERRED]
  .jules/bolt.md → src/game/engine.js
- `Why `getTierCost` uses a multiplier form, not a literal power` --references--> `getTierCost()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (96 total, 18 thin omitted)

### Community 0 - "InfoPage"
Cohesion: 0.14
Nodes (17): Project, Added, Project, APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon (+9 more)

### Community 1 - "MainPage"
Cohesion: 0.06
Nodes (76): Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, MainPage reference, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatOfflineDuration() (+68 more)

### Community 2 - "engine.js"
Cohesion: 0.10
Nodes (28): allResourceIds(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, fixedMemoryAmountFormatter, getBoosterBulkPurchase(), getComputeFieldEffectiveCap() (+20 more)

### Community 3 - "layers.js"
Cohesion: 0.05
Nodes (55): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, COMPUTE_BOOST_TIER_DURATION_STEP, COMPUTE_BOOST_TIER_FIELDS (+47 more)

### Community 4 - "navAttention.js"
Cohesion: 0.08
Nodes (41): Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Sacrifice confirm: in-game dialog; Core warning only when unlocked, isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable() (+33 more)

### Community 5 - "ComputePage"
Cohesion: 0.09
Nodes (43): Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, canActivateComputeBoost(), canForfeitComputeBoost(), forfeitComputeBoost(), getBiggestComputeTierWaitingOnMerge(), getComputeBoostTierMultiplier(), isComputeBoostTurnAvailable() (+35 more)

### Community 6 - "tickPoolBufferFill"
Cohesion: 0.16
Nodes (37): Changed, Architecture, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card, Foundry Memory always keeps the highest Disk row (issue #389) (+29 more)

### Community 7 - "lint-workflow-shell.mjs"
Cohesion: 0.20
Nodes (17): bashSyntaxError(), collectContinuation(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), foldScalar(), indentOf(), keyColumn() (+9 more)

### Community 8 - "Pool-local resets"
Cohesion: 0.18
Nodes (26): Pool-local resets, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit, Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Provision Disk's post-funding build timer duplicated the wait already spent funding it, Upgrade Data Stream arms below a full Buffer (outflow pause), clearIntroCapacityUpgradeQueue(), decomposeDataLakeUnits() (+18 more)

### Community 9 - "App.jsx"
Cohesion: 0.11
Nodes (28): Theming reference, styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), getNavAttention(), buildResetActiveSlotConfirmMessage() (+20 more)

### Community 10 - "[Unreleased]"
Cohesion: 0.13
Nodes (15): Accessibility, Added, Added, Added, Changed, Changed, Changed, Changed (+7 more)

### Community 11 - "check-graphify-freshness.mjs"
Cohesion: 0.24
Nodes (9): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+1 more)

### Community 12 - "getTierCost"
Cohesion: 0.20
Nodes (28): 5. Authorization boundary, wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check, Purchase block size became a runtime-configurable, growing value — `getTierLevel` replaced by direct state tracking (+20 more)

### Community 13 - "Economy model"
Cohesion: 0.10
Nodes (28): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Prestige history: why PP replaced direct production doubling, Reintroducing the 1s-10s tickspeed ladder, Reset button history (+20 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.15
Nodes (23): End-to-end testing, Testing, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode() (+15 more)

### Community 15 - "useIncrementalGame.js"
Cohesion: 0.06
Nodes (40): enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric, enableAutoMergeNetworksIntoGrid, enableAutoMergeNodesIntoCluster (+32 more)

### Community 16 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.12
Nodes (49): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Era ascension and Eons (#407), Key engine functions (`src/game/engine.js`), Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier (+41 more)

### Community 17 - "ref_child_process"
Cohesion: 0.11
Nodes (10): { execSync }, prs, branches, { execSync }, { execSync }, output, prs, { execSync } (+2 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.13
Nodes (20): actCapacityUpgrade(), actMainBuys(), actPlayer(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+12 more)

### Community 19 - "storage.js"
Cohesion: 0.20
Nodes (23): buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), coerceMeta(), completeDummySupporterPurchase(), defaultSlotName(), FREE_SLOT_COUNT, grantSupporterUnlock(), hasStoredStateForSlot() (+15 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.16
Nodes (21): Release (`release.yml`), assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+13 more)

### Community 22 - "engine.test.js"
Cohesion: 0.05
Nodes (16): areStoragePoolDisksFull(), getDataStreamEffectMultiplier(), getPoolBufferFillFraction(), getStoragePoolSizes(), isLaterPoolProvisioningLocked(), eraEligibleState(), getFinalPoolCapacityCapBits(), noOtherUpgradesLeft (+8 more)

### Community 23 - "fillDataLakeManually"
Cohesion: 0.57
Nodes (7): formatCapacityLabel(), A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch, `getDataLakeManualFillBitsNeeded` could offer a fill that Scale Out would immediately erase, fillDataLakeManually(), getDataLakeManualFillBitsNeeded(), isDataLakeManualFillAvailable()

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.19
Nodes (20): PP Compute (Flops), Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight() (+12 more)

### Community 25 - "contrast.js"
Cohesion: 0.38
Nodes (7): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear()

### Community 26 - "AGENTS.md"
Cohesion: 0.09
Nodes (22): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Byte Foundry, Changelog convention (+14 more)

### Community 27 - "Testing"
Cohesion: 0.09
Nodes (38): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, Compute Boost base presets: fixing a total-extra-production ordering bug, Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755), Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap, Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever (+30 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.20
Nodes (18): getEonsAwarded(), buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem (+10 more)

### Community 29 - "App.test.jsx"
Cohesion: 0.06
Nodes (40): version, ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER (+32 more)

### Community 30 - "provisionDisk"
Cohesion: 0.08
Nodes (58): Fixed, Removed, Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Cursor-powered successor engine removed (never enabled) — 2026-09-14 (+50 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.06
Nodes (28): AI-instruction file cost hygiene, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Documentation, Economy model, Funding (+20 more)

### Community 32 - "Byte Foundry"
Cohesion: 0.17
Nodes (36): actFoundry(), `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Byte Foundry (+28 more)

### Community 33 - "Shared components reference"
Cohesion: 0.18
Nodes (13): `AppMenu/index.jsx`, `AppNav/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`, AppMenu() (+5 more)

### Community 34 - "DataLakePanel"
Cohesion: 0.12
Nodes (43): A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Pool gauge's separate bottom-half Data Lake arc replaced with one dial that switches meaning once the buffer is full, Three more findings from a Devin bot review pass on the pool-overflow Data Lake rework PR: an overflow rate that asymptotically never completes, a lifetime-counter bug, and dropped legacy transfers, ActionButton, BareDivider (+35 more)

### Community 35 - "bolt.md"
Cohesion: 0.27
Nodes (9): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, 2024-10-24 - Replace O(N) iterative loop in tickDiskAutoFill with O(1) mathematical formulation, buyComputeFlopsTierQuantity(), getComputeFlopsAffordableAndCost() (+1 more)

### Community 36 - "package.json"
Cohesion: 0.12
Nodes (15): name, packageManager, private, type, @capacitor/cli, @capacitor/core, fast-check, @fontsource/inter (+7 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.15
Nodes (32): 2. Load the repo's invariants, actSoftResets(), Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02 (+24 more)

### Community 38 - "applyDevGameStateJson"
Cohesion: 0.20
Nodes (14): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs. (+6 more)

### Community 39 - "Changelog"
Cohesion: 0.11
Nodes (18): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+10 more)

### Community 40 - "isMemoryCapacityAtCap"
Cohesion: 0.25
Nodes (16): A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Pool Capacity's SI-clean mechanic restored — decoupled from the Data Stream's binary value instead of shared with it, Precision loss at large magnitudes in the SI-clean transform — fixed with a closed-form computation, Sacrifice for 10x Capacity gated behind every other currently-possible action, eraseAllComputeTokens() (+8 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.07
Nodes (62): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, CLAUDE.md Economy model duplication trim — 2026-09-03 (+54 more)

### Community 43 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+5 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.07
Nodes (69): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Provision Disk button no longer previews progress before the player has ever clicked it (+61 more)

### Community 45 - "navAttention.test.js"
Cohesion: 0.09
Nodes (24): vitest, buyComputeFlopsTier(), getComputeFlopsAffordableQuantity(), AUTO_SCALE_UP_COST, BYTES_ID, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP (+16 more)

### Community 46 - "tickGame"
Cohesion: 0.16
Nodes (33): actTickspeed(), `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14 (+25 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.15
Nodes (12): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Orchestration model, PR conflict sweep (`pr-conflict-sweep.yml`) (+4 more)

### Community 49 - "ref_node_path"
Cohesion: 0.11
Nodes (9): vite, vite-plugin-pwa, @vitejs/plugin-react, script, zeroWork, script, root, srcPath (+1 more)

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
Cohesion: 0.35
Nodes (8): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), isPlainObject(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.22
Nodes (7): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), targets

### Community 57 - "Button/index.jsx"
Cohesion: 0.20
Nodes (13): `Button/index.jsx`, The transfer budget becomes dynamic (tied to the Kilobyte tier's own block size); a real ButtonContent bug fixed along the way, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb() (+5 more)

### Community 58 - "MilestonesPage/index.jsx"
Cohesion: 0.29
Nodes (12): getFlopsAutobuyerUnlockEra(), isEraEligible(), Badge, Category, CategoryHeading, Header, List, MilestonesPage() (+4 more)

### Community 59 - "Dev Mode"
Cohesion: 0.38
Nodes (12): Dev Mode, Security notes, clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot(), getActiveSlotId(), isDevModeActive() (+4 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 63 - "react"
Cohesion: 0.29
Nodes (5): react, react-dom, web-vitals, rootElement, reportWebVitals()

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 65 - "mergeState"
Cohesion: 0.33
Nodes (7): Migration in `src/save-migration/`, runs on every load — 2026-08-22, applyPendingComputeGrants(), discardIncompatibleActiveSaveIfNeeded(), loadGameState(), mergeState(), mergeTierMap(), readActiveSavePayload()

### Community 66 - "palette.md"
Cohesion: 0.18
Nodes (10): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+2 more)

### Community 67 - "Offline progress"
Cohesion: 0.73
Nodes (6): `OfflineProgressNotice/index.jsx`, Offline progress, applyOfflineProgress(), getOfflineEffectiveSeconds(), computeInitialGame(), computeOfflineCatchUp()

### Community 68 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 72 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

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

### Community 78 - "Button"
Cohesion: 0.17
Nodes (19): Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Button, VisuallyHidden, Actions, Body, Card, ConfirmDialog(), Overlay (+11 more)

### Community 106 - "mergeDataLakes"
Cohesion: 0.38
Nodes (7): 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, createEmptyDataLakes(), createEmptyDataLakeTier(), getLegacyPendingTransferCount(), isLegacyDataLakeTier(), mergeDataLakes(), migrateLegacyDataLakeTier()

## Knowledge Gaps
- **326 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+321 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 411 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MainPage()` connect `MainPage` to `InfoPage`, `Shared components reference`, `Byte Foundry`, `Offline progress`, `createInitialGameState`, `App.jsx`, `getTierCost`, `ByteFoundryPage`, `tickGame`, `Economy model`, `Key engine functions (`src/game/engine.js`)`, `Button`, `run-simulation.mjs`, `ComputeFlopsPage/index.jsx`, `Button/index.jsx`, `AGENTS.md`, `Testing`, `provisionDisk`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `provisionDisk` to `Byte Foundry`, `navAttention.js`, `createInitialGameState`, `ComputePage`, `DiskArrayRow`, `getTierCost`, `Economy model`, `tickGame`, `Key engine functions (`src/game/engine.js`)`, `Testing`, `CLAUDE.md`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `Key engine functions (`src/game/engine.js`)` connect `Key engine functions (`src/game/engine.js`)` to `MainPage`, `engine.js`, `navAttention.js`, `ComputePage`, `tickPoolBufferFill`, `Pool-local resets`, `getTierCost`, `Economy model`, `useIncrementalGame.js`, `run-simulation.mjs`, `engine.test.js`, `ComputeFlopsPage/index.jsx`, `AGENTS.md`, `Testing`, `SettingsPage/index.jsx`, `provisionDisk`, `Byte Foundry`, `DataLakePanel`, `createInitialGameState`, `isMemoryCapacityAtCap`, `DiskArrayRow`, `ByteFoundryPage`, `tickGame`, `MilestonesPage/index.jsx`, `Offline progress`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 237 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 237 INFERRED edges - model-reasoned connections that need verification._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Are the 36 inferred relationships involving `MainPage()` (e.g. with `Byte Foundry` and `Fixed`) actually correct?**
  _`MainPage()` has 36 INFERRED edges - model-reasoned connections that need verification._
- **Are the 52 inferred relationships involving `ByteFoundryPage()` (e.g. with `Architecture` and `Byte Foundry`) actually correct?**
  _`ByteFoundryPage()` has 52 INFERRED edges - model-reasoned connections that need verification._