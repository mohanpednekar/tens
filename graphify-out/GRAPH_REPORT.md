# Graph Report - tens  (2026-10-16)

## Corpus Check
- 130 files · ~578,478 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 10, (none) 8, .properties 2)

## Summary
- 1771 nodes · 6822 edges · 92 communities (66 shown, 26 thin omitted)
- Extraction: 68% EXTRACTED · 32% INFERRED · 0% AMBIGUOUS · INFERRED: 2156 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `38872b7f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lint-workflow-shell.mjs
- MainPage
- AppDelegate
- layers.js
- navAttention.js
- ComputePage
- tickDiskAutoFill
- Automation workflows
- tickIntroAutoInvest
- App.jsx
- CLAUDE.md
- MilestonesPage/index.jsx
- getTierCost
- tickPoolBufferFill
- DevModePage/index.jsx
- engine.js
- navAttention.test.js
- tickGame
- run-simulation.mjs
- useIncrementalGame
- check-graphify-freshness.mjs
- bump-version.mjs
- engine.test.js
- App.test.jsx
- ComputeFlopsPage/index.jsx
- contrast.js
- AGENTS.md
- AppNav
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- provisionDisk
- InfoPage/index.jsx
- Shared components reference
- Byte Foundry
- Key engine functions (`src/game/engine.js`)
- package.json
- createInitialGameState
- MainActivity.java
- [Unreleased]
- What it does
- devDependencies
- Testing
- scripts
- ByteFoundryPage
- StatCard
- Economy model
- Procedure
- Automation workflows
- ref_node_fs
- backlog-issue-hygiene.sh
- getComputeFieldEffectiveCap
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
- isComputeCoreConversionUnlocked
- palette.md
- sync-release-milestones.sh
- adversarialReviewMarker.js
- applyAutobuyerMilestones
- pull_request_template.md
- jsconfig.json
- Button/index.jsx
- resolutions
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- browserslist
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- graphify
- session-start.sh
- PWA_REFERENCE.md
- resolve-pr-threads.sh
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 242 edges
2. `Byte Foundry` - 158 edges
3. `MainPage()` - 152 edges
4. `ByteFoundryPage()` - 118 edges
5. `MainPage reference` - 107 edges
6. `tickGame()` - 106 edges
7. `Testing` - 85 edges
8. `useIncrementalGame()` - 83 edges
9. `clampNonNegative()` - 77 edges
10. `Byte Foundry` - 74 edges

## Surprising Connections (you probably didn't know these)
- `A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too` --references--> `formatCapacityLabel()`  [INFERRED]
  docs/DESIGN_HISTORY.md → .claude/skills/simulate-run-times/run-simulation.mjs
- `Mobile build (`mobile-build.yml`)` --references--> `App()`  [INFERRED]
  docs/AUTOMATION.md → src/App.jsx
- `Changed` --references--> `DiskArrayRow()`  [INFERRED]
  CHANGELOG.md → src/components/DiskArrayRow/index.jsx
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `Why `getTierCost` uses a multiplier form, not a literal power` --references--> `getTierCost()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (92 total, 26 thin omitted)

### Community 0 - "lint-workflow-shell.mjs"
Cohesion: 0.40
Nodes (7): bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main(), sanitizeExpressions()

### Community 1 - "MainPage"
Cohesion: 0.05
Nodes (84): Architecture / MainPage UI decisions, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, MainPage reference, ButtonContent(), ButtonIcon, ButtonLabel, progressFill() (+76 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "layers.js"
Cohesion: 0.05
Nodes (56): AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP, BUY_MAX_ITERATION_CAP, COMPUTE_BOOST_TIER_DURATION_STEP (+48 more)

### Community 4 - "navAttention.js"
Cohesion: 0.14
Nodes (26): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable(), isComputeFabricsMergeStartAvailable(), isComputeGridsMergeStartAvailable(), isComputeMergeReserveStartAvailable() (+18 more)

### Community 5 - "ComputePage"
Cohesion: 0.11
Nodes (34): getComputeBoostMultiplier(), getComputeBoostTierMultiplier(), getComputeMergeDurationSeconds(), isComputeMergeStartAvailableAtBoundary(), startComputeMergeReserveAtBoundary(), ActiveBoostRow, ArmedStatusText, AutoBoostLabel (+26 more)

### Community 6 - "tickDiskAutoFill"
Cohesion: 0.14
Nodes (30): Fixed, "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Idle disk liquidation removed entirely — stranded disks now just sit idle instead of being converted to Bits, Per-pool Bandwidth capped at sqrt(Capacity); Data Lake capacity doubling funded by draining the lake; idle output liquidates into Bits (+22 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "tickIntroAutoInvest"
Cohesion: 0.36
Nodes (10): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, The per-cycle transfer budget cap was removed — the transfer row mirrors tier01's own purchase-block progress instead, The transfer-block row looked permanently stuck — `tickIntroAutoInvest` waited for a whole batch instead of converting live, The transfer budget becomes dynamic (tied to the Kilobyte tier's own block size); a real ButtonContent bug fixed along the way, Transfer-block/Storage-bank cost stops being pinned to tier01's fresh-level-1 price, convertIntroBitsToKilobytes(), getIntroKilobyteConversionCost() (+2 more)

### Community 9 - "App.jsx"
Cohesion: 0.10
Nodes (27): Theming reference, react, styled-components, web-vitals, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode() (+19 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.06
Nodes (30): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+22 more)

### Community 11 - "MilestonesPage/index.jsx"
Cohesion: 0.29
Nodes (12): getFlopsAutobuyerUnlockEra(), isEraEligible(), Badge, Category, CategoryHeading, Header, List, MilestonesPage() (+4 more)

### Community 12 - "getTierCost"
Cohesion: 0.16
Nodes (33): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check (+25 more)

### Community 13 - "tickPoolBufferFill"
Cohesion: 0.23
Nodes (27): Architecture, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Load-time migration clamps for the decade-power Capacity change; Data Lake capacity ladder moved onto the same shape, Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Pool cards gated on a capacity threshold too; read cache pre-fills on pool unlock; manual transfer-block UI removed, Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes (+19 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.16
Nodes (22): Testing, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow (+14 more)

### Community 15 - "engine.js"
Cohesion: 0.07
Nodes (49): BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud (+41 more)

### Community 16 - "navAttention.test.js"
Cohesion: 0.12
Nodes (17): vitest, AUTO_SCALE_UP_COST, BYTES_ID, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_REVEAL_PP, COMPUTE_MERGE_RATIO, DEFAULT_PURCHASE_BLOCK_SIZE, INTRO_BYTE_COMBINE_COST (+9 more)

### Community 17 - "tickGame"
Cohesion: 0.09
Nodes (60): Tiers, Prestige, Era ascension, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Era ascension and Eons (#407), Multiplier outcomes are floored, Pause/resume for the global automations, Prestige and the Googol freeze (+52 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.15
Nodes (22): actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+14 more)

### Community 19 - "useIncrementalGame"
Cohesion: 0.07
Nodes (83): Dev Mode, Security notes, `OfflineProgressNotice/index.jsx`, Dev Mode Reference, Buy max mode, Offline progress, 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function (+75 more)

### Community 20 - "check-graphify-freshness.mjs"
Cohesion: 0.26
Nodes (9): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+1 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.16
Nodes (21): Release (`release.yml`), assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+13 more)

### Community 22 - "engine.test.js"
Cohesion: 0.04
Nodes (30): isAnyComputeMergeInFlight(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable() (+22 more)

### Community 23 - "App.test.jsx"
Cohesion: 0.08
Nodes (23): version, ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), allResourceIds(), withScaleUpCount(), AUTO_PRESTIGE_AUTOBUYER_COST (+15 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.18
Nodes (22): PP Compute (Flops), Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight() (+14 more)

### Community 25 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 26 - "AGENTS.md"
Cohesion: 0.09
Nodes (20): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+12 more)

### Community 27 - "AppNav"
Cohesion: 0.27
Nodes (10): Project, APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem (+2 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.20
Nodes (18): getEonsAwarded(), buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem (+10 more)

### Community 30 - "provisionDisk"
Cohesion: 0.12
Nodes (48): Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+40 more)

### Community 32 - "InfoPage/index.jsx"
Cohesion: 0.09
Nodes (27): TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_MAX_STACKS, COMPUTE_BOOST_PRESETS, COMPUTE_BOOST_TIER_POWER_STEP, COMPUTE_ENTITY_AUTO_MERGE_CAP (+19 more)

### Community 33 - "Shared components reference"
Cohesion: 0.17
Nodes (14): `AppMenu/index.jsx`, `AppNav/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js` (+6 more)

### Community 34 - "Byte Foundry"
Cohesion: 0.06
Nodes (116): Changed, actFoundry(), `ByteFoundryPage` pool layout, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake (+108 more)

### Community 35 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.19
Nodes (26): Byte Foundry, Byte Foundry, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Upgrade Data Stream arms below a full Buffer (outflow pause), Key engine functions (`src/game/engine.js`), areStoragePoolDisksFull(), clearIntroCapacityUpgradeQueue(), getDataStreamBaseMultiplierPercent() (+18 more)

### Community 36 - "package.json"
Cohesion: 0.10
Nodes (19): name, packageManager, private, type, @capacitor/android, @capacitor/cli, @capacitor/core, @capacitor/ios (+11 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.11
Nodes (40): 2. Load the repo's invariants, End-to-end testing, actSoftResets(), Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02 (+32 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (33): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+25 more)

### Community 40 - "What it does"
Cohesion: 0.17
Nodes (22): actCapacityUpgrade(), What it does, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Pool Capacity's SI-clean mechanic restored — decoupled from the Data Stream's binary value instead of shared with it, Precision loss at large magnitudes in the SI-clean transform — fixed with a closed-form computation, Reset Byte Foundry convenience-auto now includes Capacity/Sacrifice — 2026-08-25 (+14 more)

### Community 41 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+7 more)

### Community 42 - "Testing"
Cohesion: 0.06
Nodes (77): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim (+69 more)

### Community 43 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+7 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.09
Nodes (47): Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Provision Disk button no longer previews progress before the player has ever clicked it, The multiplier bar moved below the balance, with its percent readout below the bar itself, formatDiskSizeStable(), formatMemoryAmountStable(), formatPoolBalance(), formatPoolBalanceStable(), getPoolBalanceUnit() (+39 more)

### Community 45 - "StatCard"
Cohesion: 0.21
Nodes (14): Changed, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Actions, Body, Card, ConfirmDialog(), Overlay, Title (+6 more)

### Community 46 - "Economy model"
Cohesion: 0.09
Nodes (34): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Prestige history: why PP replaced direct production doubling (+26 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.14
Nodes (13): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Mobile build (`mobile-build.yml`), Orchestration model (+5 more)

### Community 49 - "ref_node_fs"
Cohesion: 0.11
Nodes (9): vite, vite-plugin-pwa, @vitejs/plugin-react, script, zeroWork, script, root, srcPath (+1 more)

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 51 - "getComputeFieldEffectiveCap"
Cohesion: 0.23
Nodes (12): Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, canActivateComputeBoost(), getBiggestComputeTierWaitingOnMerge(), getComputeFieldEffectiveCap(), isComputeBoostTurnAvailable(), isComputeUpgradeAvailable(), isComputeUpgradeTurnAvailable(), isDiskFillAvailable() (+4 more)

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

### Community 63 - "isComputeCoreConversionUnlocked"
Cohesion: 0.24
Nodes (10): Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, isComputeCoreConversionUnlocked(), isIntroConversionUnlocked(), COMPUTE_AUTO_MERGE_UNLOCKS, COMPUTE_INSTANT_MERGE_BOUNDARIES, COMPUTE_RESERVE_MERGE_STARTS, getComputeAttentionLevel(), hasComputeAttention() (+2 more)

### Community 66 - "palette.md"
Cohesion: 0.18
Nodes (10): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+2 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 75 - "applyAutobuyerMilestones"
Cohesion: 0.31
Nodes (9): seedState(), Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones, applyAutobuyerMilestones(), getAutobuyerUnlockCost(), getAutobuyerUnlockMilestone(), getSmartAutobuyerCost() (+1 more)

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "Button/index.jsx"
Cohesion: 0.17
Nodes (17): `Button/index.jsx`, Button, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, pulse, resolveColor() (+9 more)

### Community 80 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 84 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

## Knowledge Gaps
- **8 isolated node(s):** `PackageDescription`, `@capacitor/android`, `@capacitor/core`, `@capacitor/ios`, `react-is` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 373 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MainPage()` connect `MainPage` to `tickDiskAutoFill`, `tickIntroAutoInvest`, `App.jsx`, `CLAUDE.md`, `getTierCost`, `tickGame`, `run-simulation.mjs`, `useIncrementalGame`, `App.test.jsx`, `ComputeFlopsPage/index.jsx`, `Shared components reference`, `Byte Foundry`, `Key engine functions (`src/game/engine.js`)`, `createInitialGameState`, `ByteFoundryPage`, `StatCard`, `Economy model`, `applyAutobuyerMilestones`, `Button/index.jsx`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 241 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 241 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `@capacitor/android`, `@capacitor/core` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage` be split into smaller, more focused modules?**
  _Cohesion score 0.05389876880984952 - nodes in this community are weakly interconnected._
- **Why does `[Unreleased]` connect `[Unreleased]` to `Byte Foundry`, `StatCard`, `tickDiskAutoFill`, `provisionDisk`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._