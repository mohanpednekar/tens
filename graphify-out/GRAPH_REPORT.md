# Graph Report - tens  (2026-10-12)

## Corpus Check
- 124 files · ~567,471 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 10, (none) 8, .properties 2)

## Summary
- 1728 nodes · 6666 edges · 89 communities (63 shown, 26 thin omitted)
- Extraction: 68% EXTRACTED · 32% INFERRED · 0% AMBIGUOUS · INFERRED: 2122 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `98aca15b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AppNav
- MainPage
- AppDelegate
- layers.js
- navAttention.js
- ComputePage
- Pool-local resets
- Automation workflows
- Key engine functions (`src/game/engine.js`)
- App.jsx
- Tens
- MilestonesPage/index.jsx
- getTierCost
- Economy model
- DevModePage/index.jsx
- engine.js
- clampNonNegative
- [Unreleased]
- run-simulation.mjs
- useIncrementalGame
- check-graphify-freshness.mjs
- bump-version.mjs
- engine.test.js
- Byte Foundry
- ComputeFlopsPage/index.jsx
- contrast.js
- AGENTS.md
- classify-claude-failure.test.js
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- provisionDisk
- getDiskSizesToShow
- Shared components reference
- Testing
- tickComputeFlopsAutobuyers
- package.json
- createInitialGameState
- MainActivity.java
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
- ref_node_fs
- backlog-issue-hygiene.sh
- browserslist
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
- ConfirmDialog/index.jsx
- palette.md
- resolutions
- sync-release-milestones.sh
- adversarialReviewMarker.js
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
- `Mobile build (`mobile-build.yml`)` --references--> `App()`  [INFERRED]
  docs/AUTOMATION.md → src/App.jsx
- `Changed` --references--> `DiskArrayRow()`  [INFERRED]
  CHANGELOG.md → src/components/DiskArrayRow/index.jsx
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent` --references--> `getCostEpochExponent()`  [INFERRED]
  .jules/bolt.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (89 total, 26 thin omitted)

### Community 0 - "AppNav"
Cohesion: 0.22
Nodes (12): Adding a new tier, Architecture, Path aliases (`vite.config.js`), APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon (+4 more)

### Community 1 - "MainPage"
Cohesion: 0.06
Nodes (73): Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatOfflineDuration(), formatScientific() (+65 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "layers.js"
Cohesion: 0.04
Nodes (99): version, ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), allResourceIds(), withScaleUpCount(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT (+91 more)

### Community 4 - "navAttention.js"
Cohesion: 0.09
Nodes (45): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, enableAutoMerge(), getComputeFieldEffectiveCap(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable() (+37 more)

### Community 5 - "ComputePage"
Cohesion: 0.08
Nodes (51): Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), forfeitComputeBoost() (+43 more)

### Community 6 - "Pool-local resets"
Cohesion: 0.16
Nodes (40): Byte Foundry, Architecture, Pool-local resets, A fourth Codex round: the "absolute ceiling" clamp itself was too high, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity), Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes (+32 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.16
Nodes (22): A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Key engine functions (`src/game/engine.js`), areStoragePoolDisksFull(), getDataStreamBaseMultiplierPercent(), getDataStreamEffectMultiplier(), getDataStreamFillFraction(), getDataStreamMultiplierPercent(), getFillMultiplierPercent() (+14 more)

### Community 9 - "App.jsx"
Cohesion: 0.13
Nodes (23): Theming reference, styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), loadThemePreference(), saveThemePreference() (+15 more)

### Community 10 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 11 - "MilestonesPage/index.jsx"
Cohesion: 0.23
Nodes (15): applyFlopsAutobuyerMilestones(), getFlopsAutobuyerUnlockEra(), isEraEligible(), setComputeFlopsAutobuyerEnabled(), COMPUTE_FLOPS_TIER_DEFINITIONS, Badge, Category, CategoryHeading (+7 more)

### Community 12 - "getTierCost"
Cohesion: 0.17
Nodes (31): End-to-end testing, 5. Authorization boundary, wouldAutobuyerStall(), Testing, Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model (+23 more)

### Community 13 - "Economy model"
Cohesion: 0.10
Nodes (21): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Economy model, Prestige history: why PP replaced direct production doubling, Reintroducing the 1s-10s tickspeed ladder, Reset button history, Sacrifice for 10x Capacity gated behind every other currently-possible action (+13 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.16
Nodes (20): ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow, Header (+12 more)

### Community 15 - "engine.js"
Cohesion: 0.07
Nodes (45): BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud (+37 more)

### Community 16 - "clampNonNegative"
Cohesion: 0.12
Nodes (46): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Era ascension and Eons (#407), Multiplier outcomes are floored, Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier (+38 more)

### Community 17 - "[Unreleased]"
Cohesion: 0.13
Nodes (15): Accessibility, Added, Added, Added, Added, Changed, Changed, Changed (+7 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.12
Nodes (23): actCapacityUpgrade(), actMainBuys(), actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges (+15 more)

### Community 19 - "useIncrementalGame"
Cohesion: 0.05
Nodes (99): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Dev Mode, Documentation, Economy model, Funding (+91 more)

### Community 20 - "check-graphify-freshness.mjs"
Cohesion: 0.26
Nodes (9): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+1 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.16
Nodes (21): Release (`release.yml`), assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+13 more)

### Community 22 - "engine.test.js"
Cohesion: 0.05
Nodes (23): Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755), getComputeMergeDurationSeconds(), getTickspeedMultiplierBaseCost(), isAnyComputeMergeInFlight(), startComputeMergeReserve(), startComputeMergeReserveAtBoundary(), eraEligibleState(), noOtherUpgradesLeft (+15 more)

### Community 23 - "Byte Foundry"
Cohesion: 0.13
Nodes (39): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool cards gated on a capacity threshold too; read cache pre-fills on pool unlock; manual transfer-block UI removed (+31 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.17
Nodes (22): PP Compute (Flops), Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierProductionMultiplier() (+14 more)

### Community 25 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 26 - "AGENTS.md"
Cohesion: 0.10
Nodes (18): AI-instruction file cost hygiene, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling, Commands, Funding (+10 more)

### Community 27 - "classify-claude-failure.test.js"
Cohesion: 0.18
Nodes (3): script, zeroWork, script

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.20
Nodes (18): getEonsAwarded(), buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem (+10 more)

### Community 30 - "provisionDisk"
Cohesion: 0.12
Nodes (50): Fixed, Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+42 more)

### Community 32 - "getDiskSizesToShow"
Cohesion: 0.67
Nodes (4): Foundry Memory always keeps the highest Disk row (issue #389), `tickDiskAutoFill`: a fully-staged cache could get starved out by an unrelated smaller size, getDiskSizesToShow(), getRelevantDiskSizesForFoundry()

### Community 33 - "Shared components reference"
Cohesion: 0.18
Nodes (13): `AppMenu/index.jsx`, `AppNav/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`, AppMenu() (+5 more)

### Community 34 - "Testing"
Cohesion: 0.06
Nodes (116): Changed, actFoundry(), `ByteFoundryPage` pool layout, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake (+108 more)

### Community 35 - "tickComputeFlopsAutobuyers"
Cohesion: 0.24
Nodes (10): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-07-28 - Replace O(N) attempts loop with O(1) batch processing for tickGame autobuyers, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, 2024-10-24 - Replace O(N) iterative loop in tickDiskAutoFill with O(1) mathematical formulation, buyComputeFlopsTierQuantity() (+2 more)

### Community 36 - "package.json"
Cohesion: 0.11
Nodes (17): name, packageManager, private, type, @capacitor/android, @capacitor/cli, @capacitor/core, @capacitor/ios (+9 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.13
Nodes (35): 2. Load the repo's invariants, actSoftResets(), Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02 (+27 more)

### Community 39 - "Changelog"
Cohesion: 0.11
Nodes (18): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+10 more)

### Community 40 - "isMemoryCapacityAtCap"
Cohesion: 0.17
Nodes (22): A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool 10's buffer ceiling landed a ULP below its own largest disk's face value — 2026-09-08, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024, Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display (+14 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.07
Nodes (62): Project, `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim (+54 more)

### Community 43 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+6 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.09
Nodes (45): Provision Disk button no longer previews progress before the player has ever clicked it, The multiplier bar moved below the balance, with its percent readout below the bar itself, formatDiskSizeInPoolUnit(), formatPoolBalance(), formatPoolBalanceStable(), getDiskRedeemTierName(), getPoolBalanceUnit(), getPoolFixedUnit() (+37 more)

### Community 45 - "navAttention.test.js"
Cohesion: 0.10
Nodes (22): vitest, buyComputeFlopsTier(), getComputeFlopsAffordableQuantity(), AUTO_SCALE_UP_COST, BYTES_ID, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP (+14 more)

### Community 46 - "tickGame"
Cohesion: 0.16
Nodes (28): `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Read cache pre-fills on pool unlock, reinstated (+20 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.14
Nodes (13): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Mobile build (`mobile-build.yml`), Orchestration model (+5 more)

### Community 49 - "ref_node_fs"
Cohesion: 0.22
Nodes (6): vite, vite-plugin-pwa, @vitejs/plugin-react, root, srcPath, createViteConfig()

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 51 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

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

### Community 63 - "ConfirmDialog/index.jsx"
Cohesion: 0.17
Nodes (12): Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), react, react-dom, web-vitals, Actions, Body, Card, ConfirmDialog() (+4 more)

### Community 66 - "palette.md"
Cohesion: 0.18
Nodes (10): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+2 more)

### Community 68 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "Button/index.jsx"
Cohesion: 0.13
Nodes (25): Fixed, `Button/index.jsx`, The transfer budget becomes dynamic (tied to the Kilobyte tier's own block size); a real ButtonContent bug fixed along the way, Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent() (+17 more)

## Knowledge Gaps
- **8 isolated node(s):** `PackageDescription`, `@capacitor/android`, `@capacitor/core`, `@capacitor/ios`, `react-is` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 362 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MainPage()` connect `MainPage` to `Shared components reference`, `Testing`, `layers.js`, `createInitialGameState`, `Pool-local resets`, `Key engine functions (`src/game/engine.js`)`, `App.jsx`, `DiskArrayRow`, `getTierCost`, `Economy model`, `tickGame`, `Button/index.jsx`, `clampNonNegative`, `run-simulation.mjs`, `useIncrementalGame`, `Byte Foundry`, `ComputeFlopsPage/index.jsx`, `provisionDisk`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Are the 237 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 237 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `@capacitor/android`, `@capacitor/core` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage` be split into smaller, more focused modules?**
  _Cohesion score 0.055534987041836355 - nodes in this community are weakly interconnected._
- **Why does `Key engine functions (`src/game/engine.js`)` connect `Key engine functions (`src/game/engine.js`)` to `MainPage`, `navAttention.js`, `ComputePage`, `Pool-local resets`, `MilestonesPage/index.jsx`, `getTierCost`, `engine.js`, `clampNonNegative`, `run-simulation.mjs`, `useIncrementalGame`, `engine.test.js`, `Byte Foundry`, `ComputeFlopsPage/index.jsx`, `SettingsPage/index.jsx`, `provisionDisk`, `getDiskSizesToShow`, `Testing`, `createInitialGameState`, `isMemoryCapacityAtCap`, `DiskArrayRow`, `ByteFoundryPage`, `tickGame`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._