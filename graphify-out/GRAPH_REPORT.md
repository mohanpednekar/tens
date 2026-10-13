# Graph Report - tens  (2026-10-13)

## Corpus Check
- 127 files · ~573,547 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 31 file(s) not represented in the graph (top: .xml 10, (none) 9, .properties 2)

## Summary
- 1749 nodes · 6748 edges · 91 communities (64 shown, 27 thin omitted)
- Extraction: 68% EXTRACTED · 32% INFERRED · 0% AMBIGUOUS · INFERRED: 2139 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `513e0bfb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- StoragePage
- MainPage
- AppDelegate
- layers.js
- navAttention.js
- ComputePage
- Testing
- Automation workflows
- applyAutobuyerMilestones
- App.jsx
- CLAUDE.md
- MilestonesPage/index.jsx
- getTierCost
- Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes
- DevModePage/index.jsx
- engine.js
- clampNonNegative
- Key engine functions (`src/game/engine.js`)
- tickGame
- useIncrementalGame
- check-graphify-freshness.mjs
- bump-version.mjs
- engine.test.js
- Byte Foundry
- ComputeFlopsPage/index.jsx
- contrast.js
- AGENTS.md
- resetByteFoundry
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- Pool-local resets
- Design history & rationale
- Shared components reference
- DataLakePanel
- tickComputeFlopsAutobuyers
- package.json
- createInitialGameState
- MainActivity.java
- [Unreleased]
- Tens
- devDependencies
- DiskArrayRow
- scripts
- ByteFoundryPage
- react
- Economy model
- Procedure
- Automation workflows
- vitest
- backlog-issue-hygiene.sh
- resolutions
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
- README.md
- sync-release-milestones.sh
- adversarialReviewMarker.js
- simulate-run-times/SKILL.md
- pull_request_template.md
- jsconfig.json
- Button/index.jsx
- End-to-end specs (Playwright)
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
1. `Key engine functions (`src/game/engine.js`)` - 242 edges
2. `Byte Foundry` - 158 edges
3. `MainPage()` - 149 edges
4. `ByteFoundryPage()` - 118 edges
5. `tickGame()` - 106 edges
6. `MainPage reference` - 103 edges
7. `Testing` - 85 edges
8. `useIncrementalGame()` - 83 edges
9. `Pool-local resets` - 83 edges
10. `clampNonNegative()` - 77 edges

## Surprising Connections (you probably didn't know these)
- `Release (`release.yml`)` --references--> `extractVersionSection()`  [INFERRED]
  docs/AUTOMATION.md → scripts/bump-version.mjs
- `Mobile build (`mobile-build.yml`)` --references--> `App()`  [INFERRED]
  docs/AUTOMATION.md → src/App.jsx
- `Changed` --references--> `DiskArrayRow()`  [INFERRED]
  CHANGELOG.md → src/components/DiskArrayRow/index.jsx
- `Read cache blocks (`DiskArrayRow`) render a proportional fill overlay, not just full/empty` --references--> `DiskArrayRow()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/components/DiskArrayRow/index.jsx
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (91 total, 27 thin omitted)

### Community 0 - "StoragePage"
Cohesion: 0.15
Nodes (18): Adding a new tier, Architecture, Path aliases (`vite.config.js`), Project, CLAUDE.md Economy model duplication trim — 2026-09-03, APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot (+10 more)

### Community 1 - "MainPage"
Cohesion: 0.05
Nodes (82): Fixed, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, MainPage reference, ButtonContent(), ButtonIcon, ButtonLabel, progressFill() (+74 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "layers.js"
Cohesion: 0.04
Nodes (105): seedDataLakeSave(), ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS (+97 more)

### Community 4 - "navAttention.js"
Cohesion: 0.07
Nodes (51): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable() (+43 more)

### Community 5 - "ComputePage"
Cohesion: 0.08
Nodes (53): Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), forfeitComputeBoost() (+45 more)

### Community 6 - "Testing"
Cohesion: 0.10
Nodes (49): A fourth Codex round: the "absolute ceiling" clamp itself was too high, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug, Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755), Data Lake refill gating: staged 9 → 99 → 999 capacity from disk-array completion (+41 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "applyAutobuyerMilestones"
Cohesion: 0.21
Nodes (13): seedState(), Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Multiplier outcomes are floored, Tickspeed multiplier, Tier autobuyer/tier-tickspeed-autobuyer milestones, applyAutobuyerMilestones(), getAutobuyerUnlockCost(), getAutobuyerUnlockMilestone() (+5 more)

### Community 9 - "App.jsx"
Cohesion: 0.12
Nodes (25): Theming reference, styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), getComputeFlopsAttentionLevel(), getNavAttention() (+17 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.10
Nodes (19): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+11 more)

### Community 11 - "MilestonesPage/index.jsx"
Cohesion: 0.27
Nodes (13): getFlopsAutobuyerUnlockEra(), isEraEligible(), ERA_ELIGIBILITY_PP, Badge, Category, CategoryHeading, Header, List (+5 more)

### Community 12 - "getTierCost"
Cohesion: 0.17
Nodes (32): 5. Authorization boundary, wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check (+24 more)

### Community 13 - "Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes"
Cohesion: 0.28
Nodes (16): A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool 10's buffer ceiling landed a ULP below its own largest disk's face value — 2026-09-08, Pool Capacity's SI-clean mechanic restored — decoupled from the Data Stream's binary value instead of shared with it, Pool cards gated on a capacity threshold too; read cache pre-fills on pool unlock; manual transfer-block UI removed, Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes, getMaxActiveDiskLadderStep(), getStoragePoolCount() (+8 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.13
Nodes (25): Project, Testing, COMPUTE_FLOPS_REVEAL_PP, PRESTIGE_THRESHOLD, ButtonGrid, coerceDraft(), Details, DevModePage() (+17 more)

### Community 15 - "engine.js"
Cohesion: 0.06
Nodes (60): areStoragePoolDisksFull(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, buyComputeFlopsTier(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork (+52 more)

### Community 16 - "clampNonNegative"
Cohesion: 0.13
Nodes (42): What it does, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Era ascension and Eons (#407), Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier (+34 more)

### Community 17 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.11
Nodes (41): Added, actCapacityUpgrade(), actFoundry(), A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder (+33 more)

### Community 18 - "tickGame"
Cohesion: 0.15
Nodes (26): actMainBuys(), actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+18 more)

### Community 19 - "useIncrementalGame"
Cohesion: 0.06
Nodes (85): Dev Mode, Security notes, `OfflineProgressNotice/index.jsx`, Buy max mode, Offline progress, 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key (+77 more)

### Community 20 - "check-graphify-freshness.mjs"
Cohesion: 0.12
Nodes (12): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+4 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 22 - "engine.test.js"
Cohesion: 0.05
Nodes (22): getTickspeedMultiplierBaseCost(), isAnyComputeMergeInFlight(), eraEligibleState(), noOtherUpgradesLeft, unlockedLastTierState(), withIntro(), withOwned(), withPoolBuffer() (+14 more)

### Community 23 - "Byte Foundry"
Cohesion: 0.18
Nodes (25): Byte Foundry, `DiskArrayRow/index.jsx`, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping, Foundry Memory always keeps the highest Disk row (issue #389), Read cache pre-fills on pool unlock, reinstated, Storage funding rebuilt push→pull: the manual Redeem button and autobuyer-gated auto-redeem are gone (issue #571), `tickDiskAutoFill`: a fully-staged cache could get starved out by an unrelated smaller size (+17 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.18
Nodes (22): PP Compute (Flops), Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight() (+14 more)

### Community 25 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 26 - "AGENTS.md"
Cohesion: 0.11
Nodes (17): AI-instruction file cost hygiene, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling, Commands, Funding (+9 more)

### Community 27 - "resetByteFoundry"
Cohesion: 0.73
Nodes (6): Reset Byte Foundry convenience-auto now includes Capacity/Sacrifice — 2026-08-25, Reset Byte Foundry's convenience replay didn't cover partial Provision Disk passes — 2026-09-08, Two more gaps in Reset Byte Foundry's convenience-replay caps — 2026-09-08, captureFoundryUpgradeCaps(), mergeFoundryUpgradeCaps(), resetByteFoundry()

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.19
Nodes (19): getEonsAwarded(), MUSEUM_PIN_CAP, buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote (+11 more)

### Community 30 - "Pool-local resets"
Cohesion: 0.20
Nodes (37): Removed, Architecture, Pool-local resets, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09 (+29 more)

### Community 32 - "Design history & rationale"
Cohesion: 0.15
Nodes (13): Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale, Distribution, Documentation, First ten Scale Ups standardized at three completed levels — 2026-09-13, Sacrifice confirm: in-game dialog; Core warning only when unlocked, Save persistence (+5 more)

### Community 33 - "Shared components reference"
Cohesion: 0.17
Nodes (14): `AppMenu/index.jsx`, `AppNav/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js` (+6 more)

### Community 34 - "DataLakePanel"
Cohesion: 0.07
Nodes (95): Changed, formatCapacityLabel(), `ByteFoundryPage` pool layout, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either (+87 more)

### Community 35 - "tickComputeFlopsAutobuyers"
Cohesion: 0.24
Nodes (10): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-07-28 - Replace O(N) attempts loop with O(1) batch processing for tickGame autobuyers, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, 2024-10-24 - Replace O(N) iterative loop in tickDiskAutoFill with O(1) mathematical formulation, buyComputeFlopsTierQuantity() (+2 more)

### Community 36 - "package.json"
Cohesion: 0.09
Nodes (21): browserslist, development, production, name, packageManager, private, type, version (+13 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.17
Nodes (31): 2. Load the repo's invariants, End-to-end testing, actSoftResets(), When editing the simulation, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, Removing Claim Core: superseded by Data Lake Boosters (+23 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (31): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+23 more)

### Community 40 - "Tens"
Cohesion: 0.25
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes, Tens

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.11
Nodes (39): Fixed, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Pool isolation: disk write-cache merges no longer cross pool boundaries, The "stranded disks never touch write-cache either" rule (from the two Devin Review findings above) itself turned out to be the bug: it permanently starved every disk size past the first one (+31 more)

### Community 43 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+6 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.07
Nodes (64): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024, Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Provision Disk button no longer previews progress before the player has ever clicked it (+56 more)

### Community 45 - "react"
Cohesion: 0.29
Nodes (5): react, react-dom, web-vitals, rootElement, reportWebVitals()

### Community 46 - "Economy model"
Cohesion: 0.08
Nodes (36): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Prestige history: why PP replaced direct production doubling (+28 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.13
Nodes (14): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Mobile build (`mobile-build.yml`), Orchestration model (+6 more)

### Community 49 - "vitest"
Cohesion: 0.22
Nodes (7): vite, vite-plugin-pwa, @vitejs/plugin-react, vitest, root, srcPath, createViteConfig()

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 51 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

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
Cohesion: 0.21
Nodes (14): Changed, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Actions, Body, Card, ConfirmDialog(), Overlay, Title (+6 more)

### Community 66 - "palette.md"
Cohesion: 0.18
Nodes (10): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+2 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 75 - "simulate-run-times/SKILL.md"
Cohesion: 0.50
Nodes (3): Strategy snapshots (orphan branch) — required after every run, Usage, When to re-run

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "Button/index.jsx"
Cohesion: 0.18
Nodes (16): `Button/index.jsx`, Button, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, pulse, resolveColor() (+8 more)

### Community 79 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

## Knowledge Gaps
- **8 isolated node(s):** `PackageDescription`, `@capacitor/android`, `@capacitor/core`, `@capacitor/ios`, `react-is` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 367 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MainPage()` connect `MainPage` to `StoragePage`, `Shared components reference`, `DataLakePanel`, `createInitialGameState`, `Testing`, `applyAutobuyerMilestones`, `App.jsx`, `DiskArrayRow`, `getTierCost`, `ByteFoundryPage`, `Economy model`, `Button/index.jsx`, `clampNonNegative`, `Key engine functions (`src/game/engine.js`)`, `tickGame`, `useIncrementalGame`, `Byte Foundry`, `ComputeFlopsPage/index.jsx`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Are the 241 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 241 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `@capacitor/android`, `@capacitor/core` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `StoragePage` be split into smaller, more focused modules?**
  _Cohesion score 0.14736842105263157 - nodes in this community are weakly interconnected._
- **Why does `Key engine functions (`src/game/engine.js`)` connect `Key engine functions (`src/game/engine.js`)` to `StoragePage`, `MainPage`, `navAttention.js`, `ComputePage`, `Testing`, `applyAutobuyerMilestones`, `MilestonesPage/index.jsx`, `getTierCost`, `Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes`, `engine.js`, `clampNonNegative`, `tickGame`, `useIncrementalGame`, `engine.test.js`, `Byte Foundry`, `ComputeFlopsPage/index.jsx`, `resetByteFoundry`, `SettingsPage/index.jsx`, `Pool-local resets`, `DataLakePanel`, `createInitialGameState`, `DiskArrayRow`, `ByteFoundryPage`, `Economy model`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Should `MainPage` be split into smaller, more focused modules?**
  _Cohesion score 0.05249569707401033 - nodes in this community are weakly interconnected._