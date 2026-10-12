# Graph Report - wt786  (2026-10-12)

## Corpus Check
- 125 files · ~567,583 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 31 file(s) not represented in the graph (top: .xml 10, (none) 9, .properties 2)

## Summary
- 1730 nodes · 6676 edges · 90 communities (64 shown, 26 thin omitted)
- Extraction: 68% EXTRACTED · 32% INFERRED · 0% AMBIGUOUS · INFERRED: 2131 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a12a5c0a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AppNav
- MainPage
- AppDelegate
- engine.js
- navAttention.js
- ComputePage
- Pool-local resets
- Automation workflows
- Key engine functions (`src/game/engine.js`)
- App.jsx
- CLAUDE.md
- MilestonesPage/index.jsx
- getTierCost
- Economy model
- DevModePage/index.jsx
- Testing
- clampNonNegative
- App.test.jsx
- run-simulation.mjs
- useIncrementalGame
- check-graphify-freshness.mjs
- bump-version.mjs
- engine.test.js
- Byte Foundry
- ComputeFlopsPage/index.jsx
- contrast.js
- AGENTS.md
- InfoPage/index.jsx
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- provisionDisk
- createInitialGameState
- Shared components reference
- DataLakePanel
- buyComputeFlopsTier
- package.json
- tickGame
- MainActivity.java
- [Unreleased]
- isMemoryCapacityAtCap
- devDependencies
- DiskArrayRow
- scripts
- ByteFoundryPage
- engine.computeFlops.test.js
- MainPage reference
- Procedure
- Automation workflows
- capacitorConfig.test.js
- backlog-issue-hygiene.sh
- Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- orphan-branch-scan.sh
- generate-pwa-icons.mjs
- Package.swift
- CapApp-SPM/README.md
- classify-claude-failure.sh
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- react
- palette.md
- formatCurrency
- sync-release-milestones.sh
- adversarialReviewMarker.js
- tickIntroProduction
- pull_request_template.md
- jsconfig.json
- Button/index.jsx
- publish-strategy.sh
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- graphify
- session-start.sh
- PWA_REFERENCE.md
- resolve-pr-threads.sh
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 238 edges
2. `Byte Foundry` - 158 edges
3. `MainPage()` - 146 edges
4. `ByteFoundryPage()` - 118 edges
5. `tickGame()` - 106 edges
6. `MainPage reference` - 99 edges
7. `Testing` - 85 edges
8. `Pool-local resets` - 80 edges
9. `useIncrementalGame()` - 77 edges
10. `clampNonNegative()` - 76 edges

## Surprising Connections (you probably didn't know these)
- `A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too` --references--> `formatCapacityLabel()`  [INFERRED]
  docs/DESIGN_HISTORY.md → .claude/skills/simulate-run-times/run-simulation.mjs
- `Release (`release.yml`)` --references--> `extractVersionSection()`  [INFERRED]
  docs/AUTOMATION.md → scripts/bump-version.mjs
- `Mobile build (`mobile-build.yml`)` --references--> `App()`  [INFERRED]
  docs/AUTOMATION.md → src/App.jsx
- `Changed` --references--> `DiskArrayRow()`  [INFERRED]
  CHANGELOG.md → src/components/DiskArrayRow/index.jsx
- `Read cache blocks (`DiskArrayRow`) render a proportional fill overlay, not just full/empty` --references--> `DiskArrayRow()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/components/DiskArrayRow/index.jsx

## Import Cycles
- None detected.

## Communities (90 total, 26 thin omitted)

### Community 0 - "AppNav"
Cohesion: 0.22
Nodes (12): Adding a new tier, Architecture, Path aliases (`vite.config.js`), Project, APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar (+4 more)

### Community 1 - "MainPage"
Cohesion: 0.06
Nodes (69): ButtonContent(), ButtonIcon, ButtonLabel, progressFill(), formatOfflineDuration(), getAutoPrestigeAttemptRate(), getAutoPrestigeCost(), getNextBytePowerProgressFraction() (+61 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "engine.js"
Cohesion: 0.06
Nodes (67): BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, fixedMemoryAmountFormatter, getBoosterBulkPurchase(), isAnyComputeMergeInFlight(), LOG10_2, MEMORY_BINARY_UNIT_SYMBOLS (+59 more)

### Community 4 - "navAttention.js"
Cohesion: 0.07
Nodes (54): Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, vitest, isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoreConversionUnlocked(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable() (+46 more)

### Community 5 - "ComputePage"
Cohesion: 0.11
Nodes (35): Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, canActivateComputeBoost(), isComputeBoostTurnAvailable(), isComputeMergeStartAvailableAtBoundary(), isComputeUpgradeAvailable(), isDiskFillAvailable(), ActiveBoostRow, ArmedStatusText (+27 more)

### Community 6 - "Pool-local resets"
Cohesion: 0.14
Nodes (45): Changed, Architecture, Pool-local resets, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe (+37 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.11
Nodes (31): Key engine functions (`src/game/engine.js`), getComputeFieldEffectiveCap(), getComputeMergeDurationSeconds(), getDataStreamFillFraction(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable() (+23 more)

### Community 9 - "App.jsx"
Cohesion: 0.12
Nodes (24): Theming reference, styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), loadThemePreference(), saveThemePreference() (+16 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.06
Nodes (28): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+20 more)

### Community 11 - "MilestonesPage/index.jsx"
Cohesion: 0.24
Nodes (16): Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getFlopsAutobuyerUnlockEra(), getTierTickspeedAutobuyerMilestone(), isEraEligible(), Badge, Category (+8 more)

### Community 12 - "getTierCost"
Cohesion: 0.18
Nodes (29): 5. Authorization boundary, wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check (+21 more)

### Community 13 - "Economy model"
Cohesion: 0.08
Nodes (35): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Multiplier overflow safety: the switch to compounding needed a floor, Prestige history: why PP replaced direct production doubling (+27 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.16
Nodes (20): ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow, Header (+12 more)

### Community 15 - "Testing"
Cohesion: 0.10
Nodes (37): A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug, Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755), `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever, Data Lake capacity Upgrade removed from the forced priority order — array completion is now the only gate (+29 more)

### Community 16 - "clampNonNegative"
Cohesion: 0.16
Nodes (27): Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), buyAutoPrestigeAutobuyer(), buyAutoScaleUp(), buyComputeAutoBoost(), buyHyperscaler(), buyPrestigeDoublePp(), buyPrestigeSpeedBonus() (+19 more)

### Community 17 - "App.test.jsx"
Cohesion: 0.08
Nodes (24): version, ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), allResourceIds(), withScaleUpCount(), AUTO_PRESTIGE_AUTOBUYER_COST (+16 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.16
Nodes (16): actCapacityUpgrade(), actMainBuys(), actPlayer(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+8 more)

### Community 19 - "useIncrementalGame"
Cohesion: 0.07
Nodes (76): Dev Mode, Security notes, Dev Mode Reference, 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy (+68 more)

### Community 20 - "check-graphify-freshness.mjs"
Cohesion: 0.12
Nodes (12): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+4 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 22 - "engine.test.js"
Cohesion: 0.04
Nodes (42): enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric, enableAutoMergeNetworksIntoGrid, enableAutoMergeNodesIntoCluster (+34 more)

### Community 23 - "Byte Foundry"
Cohesion: 0.18
Nodes (32): actFoundry(), `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch, `getDataLakeManualFillBitsNeeded` could offer a fill that Scale Out would immediately erase (+24 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.15
Nodes (24): PP Compute (Flops), Money, canBuyComputeFlopsTier(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierProductionMultiplier(), getComputeFlopsTierWeight() (+16 more)

### Community 25 - "contrast.js"
Cohesion: 0.38
Nodes (7): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear()

### Community 26 - "AGENTS.md"
Cohesion: 0.11
Nodes (17): AI-instruction file cost hygiene, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling, Commands, Funding (+9 more)

### Community 27 - "InfoPage/index.jsx"
Cohesion: 0.10
Nodes (25): TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_CORES_PER_NODE, COMPUTE_ENTITY_CAP, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_LAST_TIER_COST_PP (+17 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.20
Nodes (18): getEonsAwarded(), buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem (+10 more)

### Community 30 - "provisionDisk"
Cohesion: 0.10
Nodes (57): Fixed, Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09 (+49 more)

### Community 32 - "createInitialGameState"
Cohesion: 0.20
Nodes (17): Byte Foundry, End-to-end testing, seedState(), Testing, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Migration in `src/save-migration/`, runs on every load — 2026-08-22, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09 (+9 more)

### Community 33 - "Shared components reference"
Cohesion: 0.18
Nodes (13): `AppMenu/index.jsx`, `AppNav/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`, AppMenu() (+5 more)

### Community 34 - "DataLakePanel"
Cohesion: 0.10
Nodes (55): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit (+47 more)

### Community 35 - "buyComputeFlopsTier"
Cohesion: 0.23
Nodes (11): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-07-28 - Replace O(N) attempts loop with O(1) batch processing for tickGame autobuyers, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, 2024-10-24 - Replace O(N) iterative loop in tickDiskAutoFill with O(1) mathematical formulation, buyComputeFlopsTier() (+3 more)

### Community 36 - "package.json"
Cohesion: 0.07
Nodes (26): browserslist, development, production, name, packageManager, private, resolutions, **/fast-uri (+18 more)

### Community 37 - "tickGame"
Cohesion: 0.14
Nodes (40): 2. Load the repo's invariants, actSoftResets(), actTickspeed(), Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run (+32 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (31): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+23 more)

### Community 40 - "isMemoryCapacityAtCap"
Cohesion: 0.22
Nodes (17): Added, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Pool Capacity's SI-clean mechanic restored — decoupled from the Data Stream's binary value instead of shared with it, Precision loss at large magnitudes in the SI-clean transform — fixed with a closed-form computation, Sacrifice confirm: in-game dialog; Core warning only when unlocked (+9 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.07
Nodes (61): Project, `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim (+53 more)

### Community 43 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+6 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.07
Nodes (70): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Provision Disk button no longer previews progress before the player has ever clicked it, Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix, The multiplier bar moved below the balance, with its percent readout below the bar itself (+62 more)

### Community 45 - "engine.computeFlops.test.js"
Cohesion: 0.25
Nodes (7): getComputeFlopsAffordableQuantity(), AUTO_SCALE_UP_COST, BYTES_ID, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_REVEAL_PP, PRESTIGE_THRESHOLD, TICK_RATE_MS

### Community 46 - "MainPage reference"
Cohesion: 0.18
Nodes (24): Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, The Byte Foundry becomes a per-Prestige-cycle mechanic, not a one-time gate, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Multiplier outcomes are floored, Overclock (+16 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.13
Nodes (14): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Mobile build (`mobile-build.yml`), Orchestration model (+6 more)

### Community 49 - "capacitorConfig.test.js"
Cohesion: 0.24
Nodes (6): vite, vite-plugin-pwa, @vitejs/plugin-react, root, srcPath, createViteConfig()

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 51 - "Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03"
Cohesion: 0.28
Nodes (17): Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, activateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), forfeitComputeBoost() (+9 more)

### Community 52 - "dependencies"
Cohesion: 0.18
Nodes (11): dependencies, @capacitor/android, @capacitor/core, @capacitor/ios, @fontsource/inter, @fontsource/space-grotesk, react, react-dom (+3 more)

### Community 53 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 54 - "file-task-issue/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.21
Nodes (11): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), overwrite(), pngSize() (+3 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 63 - "react"
Cohesion: 0.29
Nodes (5): react, react-dom, web-vitals, rootElement, reportWebVitals()

### Community 66 - "palette.md"
Cohesion: 0.18
Nodes (10): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+2 more)

### Community 68 - "formatCurrency"
Cohesion: 0.42
Nodes (9): Fixed, Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), RESOURCE_SYMBOL() (+1 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 75 - "tickIntroProduction"
Cohesion: 0.43
Nodes (8): `OfflineProgressNotice/index.jsx`, Offline progress, applyOfflineProgress(), getComputeBoostMultiplier(), getComputeBoostTierMultiplier(), getOfflineEffectiveSeconds(), tickIntroProduction(), computeOfflineCatchUp()

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "Button/index.jsx"
Cohesion: 0.12
Nodes (28): Changed, `Button/index.jsx`, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Button, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+20 more)

## Knowledge Gaps
- **8 isolated node(s):** `PackageDescription`, `@capacitor/android`, `@capacitor/core`, `@capacitor/ios`, `react-is` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 363 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MainPage()` connect `MainPage` to `Key engine functions (`src/game/engine.js`)`, `App.jsx`, `MilestonesPage/index.jsx`, `getTierCost`, `Economy model`, `Testing`, `clampNonNegative`, `App.test.jsx`, `Byte Foundry`, `provisionDisk`, `createInitialGameState`, `Shared components reference`, `tickGame`, `DiskArrayRow`, `ByteFoundryPage`, `MainPage reference`, `Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03`, `formatCurrency`, `tickIntroProduction`, `Button/index.jsx`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Are the 237 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 237 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `@capacitor/android`, `@capacitor/core` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage` be split into smaller, more focused modules?**
  _Cohesion score 0.05755693581780538 - nodes in this community are weakly interconnected._
- **Why does `Key engine functions (`src/game/engine.js`)` connect `Key engine functions (`src/game/engine.js`)` to `MainPage`, `navAttention.js`, `ComputePage`, `Pool-local resets`, `MilestonesPage/index.jsx`, `getTierCost`, `Economy model`, `Testing`, `clampNonNegative`, `useIncrementalGame`, `engine.test.js`, `Byte Foundry`, `ComputeFlopsPage/index.jsx`, `SettingsPage/index.jsx`, `provisionDisk`, `createInitialGameState`, `DataLakePanel`, `tickGame`, `isMemoryCapacityAtCap`, `DiskArrayRow`, `ByteFoundryPage`, `MainPage reference`, `Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03`, `formatCurrency`, `tickIntroProduction`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._