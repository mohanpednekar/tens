# Graph Report - tens  (2026-10-17)

## Corpus Check
- 133 files · ~577,598 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 10, (none) 8, .properties 2)

## Summary
- 1795 nodes · 6890 edges · 86 communities (60 shown, 26 thin omitted)
- Extraction: 69% EXTRACTED · 31% INFERRED · 0% AMBIGUOUS · INFERRED: 2156 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b0ee2017`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lint-workflow-shell.mjs
- MainPage
- AppDelegate
- layers.js
- navAttention.js
- ComputePage
- engine.test.js
- Automation workflows
- Economy model
- App.jsx
- CLAUDE.md
- AppNav
- run-simulation.mjs
- Byte Foundry
- DevModePage/index.jsx
- engine.js
- createInitialGameState
- Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit
- contrast.js
- storage.js
- react
- bump-version.mjs
- ComputeFlopsPage/index.jsx
- tokens.js
- AGENTS.md
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- provisionDisk
- Shared components reference
- DataLakePanel
- getTierCost
- package.json
- Key engine functions (`src/game/engine.js`)
- MainActivity.java
- Changelog
- Testing
- devDependencies
- DiskArrayRow
- scripts
- ByteFoundryPage
- clampNonNegative
- Procedure
- Automation workflows
- ref_node_path
- backlog-issue-hygiene.sh
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
- PerksPage/index.jsx
- palette.md
- tickComputeFlopsAutobuyers
- sync-release-milestones.sh
- adversarialReviewMarker.js
- pull_request_template.md
- jsconfig.json
- Button/index.jsx
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- graphify
- check-graphify-freshness.mjs
- MilestonesPage/index.jsx
- session-start.sh
- PWA_REFERENCE.md
- resolve-pr-threads.sh
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 242 edges
2. `Byte Foundry` - 158 edges
3. `MainPage()` - 128 edges
4. `ByteFoundryPage()` - 118 edges
5. `tickGame()` - 106 edges
6. `MainPage reference` - 105 edges
7. `Testing` - 86 edges
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
- `2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent` --references--> `getCostEpochExponent()`  [INFERRED]
  .jules/bolt.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (86 total, 26 thin omitted)

### Community 0 - "lint-workflow-shell.mjs"
Cohesion: 0.35
Nodes (8): yaml, bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main(), sanitizeExpressions()

### Community 1 - "MainPage"
Cohesion: 0.06
Nodes (64): Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, MainPage reference, progressFill(), formatBytes(), formatOfflineDuration(), getNextBytePowerProgressFraction(), getOverclockRequirement(), isBuyMaxUnlocked() (+56 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "layers.js"
Cohesion: 0.03
Nodes (106): version, ALL_TIER_IDS, allTiersSmartSeed(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SCALE_UP_COST (+98 more)

### Community 4 - "navAttention.js"
Cohesion: 0.07
Nodes (54): Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, vitest, getComputeFieldEffectiveCap(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable() (+46 more)

### Community 5 - "ComputePage"
Cohesion: 0.09
Nodes (49): Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), getBiggestComputeTierWaitingOnMerge() (+41 more)

### Community 6 - "engine.test.js"
Cohesion: 0.04
Nodes (34): Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755), getComputeMergeDurationSeconds(), getDataStreamFillFraction(), isAnyComputeMergeInFlight(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable() (+26 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "Economy model"
Cohesion: 0.08
Nodes (37): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Prestige history: why PP replaced direct production doubling (+29 more)

### Community 9 - "App.jsx"
Cohesion: 0.19
Nodes (17): styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon (+9 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.06
Nodes (30): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+22 more)

### Community 11 - "AppNav"
Cohesion: 0.27
Nodes (10): Project, APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem (+2 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.14
Nodes (23): actMainBuys(), actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+15 more)

### Community 13 - "Byte Foundry"
Cohesion: 0.18
Nodes (26): Byte Foundry, actFoundry(), A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch, `getDataLakeManualFillBitsNeeded` could offer a fill that Scale Out would immediately erase, Byte Foundry, buildEraIntroReset() (+18 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.16
Nodes (23): Testing, ButtonContent(), ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode() (+15 more)

### Community 15 - "engine.js"
Cohesion: 0.07
Nodes (60): Buy max mode, BIT_UNIT_SYMBOLS, buyComputeFlopsTier(), clearIntroCapacityUpgradeQueue(), combineIntroByte(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter (+52 more)

### Community 16 - "createInitialGameState"
Cohesion: 0.15
Nodes (30): 2. Load the repo's invariants, actSoftResets(), Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, Removing Claim Core: superseded by Data Lake Boosters (+22 more)

### Community 17 - "Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit"
Cohesion: 0.20
Nodes (20): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit, Three more findings from a Devin bot review pass on the pool-overflow Data Lake rework PR: an overflow rate that asymptotically never completes, a lifetime-counter bug, and dropped legacy transfers, applyDataLakeOverflow() (+12 more)

### Community 18 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 19 - "storage.js"
Cohesion: 0.06
Nodes (81): Removed, Dev Mode, End-to-end testing, Security notes, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Save persistence, Dev Mode Reference, 2024-05-24 - Content Security Policy (CSP) unsafe-eval (+73 more)

### Community 20 - "react"
Cohesion: 0.29
Nodes (5): react, react-dom, web-vitals, rootElement, reportWebVitals()

### Community 21 - "bump-version.mjs"
Cohesion: 0.16
Nodes (21): Release (`release.yml`), assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+13 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.17
Nodes (23): PP Compute (Flops), Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight() (+15 more)

### Community 25 - "tokens.js"
Cohesion: 0.18
Nodes (11): buildTheme(), DEFAULT_MODE, font, MODES, motion, palette, radius, shadow (+3 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.09
Nodes (21): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Byte Foundry, Changelog convention (+13 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.15
Nodes (25): Fixed, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatCurrency(), formatMoneyBalance(), formatScientific(), getEonsAwarded() (+17 more)

### Community 30 - "provisionDisk"
Cohesion: 0.08
Nodes (64): Accessibility, Added, Added, Added, Added, Changed, Changed, Changed (+56 more)

### Community 33 - "Shared components reference"
Cohesion: 0.22
Nodes (8): `AppMenu/index.jsx`, `AppNav/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`

### Community 34 - "DataLakePanel"
Cohesion: 0.09
Nodes (70): Changed, `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display (+62 more)

### Community 35 - "getTierCost"
Cohesion: 0.20
Nodes (28): wouldAutobuyerStall(), Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check, Purchase block size became a runtime-configurable, growing value — `getTierLevel` replaced by direct state tracking, Purchase level resized from 10 to 8, and the cost-epoch sequence changed from Fibonacci to triangular, Repricing tiers to real-world bit values (+20 more)

### Community 36 - "package.json"
Cohesion: 0.07
Nodes (25): browserslist, development, production, name, packageManager, private, resolutions, **/fast-uri (+17 more)

### Community 37 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.10
Nodes (53): 5. Authorization boundary, actCapacityUpgrade(), What it does, `DiskArrayRow/index.jsx`, `OfflineProgressNotice/index.jsx`, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, Architecture / MainPage UI decisions, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02 (+45 more)

### Community 39 - "Changelog"
Cohesion: 0.11
Nodes (18): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+10 more)

### Community 40 - "Testing"
Cohesion: 0.10
Nodes (63): Architecture, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug (+55 more)

### Community 41 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+7 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.08
Nodes (52): A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, CLAUDE.md Economy model duplication trim — 2026-09-03, Foundry Memory always keeps the highest Disk row (issue #389), Pool isolation: disk write-cache merges no longer cross pool boundaries (+44 more)

### Community 43 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+7 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.07
Nodes (64): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024, Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display (+56 more)

### Community 46 - "clampNonNegative"
Cohesion: 0.14
Nodes (41): Tiers, Prestige, Era ascension, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Era ascension and Eons (#407), Pause/resume for the global automations, Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier (+33 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.14
Nodes (13): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Mobile build (`mobile-build.yml`), Orchestration model (+5 more)

### Community 49 - "ref_node_path"
Cohesion: 0.24
Nodes (6): vite, vite-plugin-pwa, @vitejs/plugin-react, root, srcPath, createViteConfig()

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

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

### Community 63 - "PerksPage/index.jsx"
Cohesion: 0.08
Nodes (51): seedState(), `Switch/index.js`, Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Tier autobuyer/tier-tickspeed-autobuyer milestones, derivePurchaseFieldsFromCounts(), seedMainGameState(), ButtonIcon, ButtonLabel (+43 more)

### Community 66 - "palette.md"
Cohesion: 0.18
Nodes (10): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+2 more)

### Community 68 - "tickComputeFlopsAutobuyers"
Cohesion: 0.27
Nodes (9): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, 2024-10-24 - Replace O(N) iterative loop in tickDiskAutoFill with O(1) mathematical formulation, buyComputeFlopsTierQuantity(), getComputeFlopsAffordableAndCost() (+1 more)

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
Cohesion: 0.11
Nodes (26): Changed, `Button/index.jsx`, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Theming reference, @testing-library/react, Button, clampPercent(), getGlowRgb() (+18 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 93 - "check-graphify-freshness.mjs"
Cohesion: 0.12
Nodes (12): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+4 more)

### Community 94 - "MilestonesPage/index.jsx"
Cohesion: 0.21
Nodes (14): NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), StatCard, isEraEligible(), Badge, Category (+6 more)

## Knowledge Gaps
- **8 isolated node(s):** `PackageDescription`, `@capacitor/android`, `@capacitor/core`, `@capacitor/ios`, `react-is` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 378 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MainPage()` connect `MainPage` to `Economy model`, `App.jsx`, `CLAUDE.md`, `run-simulation.mjs`, `Byte Foundry`, `DevModePage/index.jsx`, `createInitialGameState`, `ComputeFlopsPage/index.jsx`, `AGENTS.md`, `SettingsPage/index.jsx`, `provisionDisk`, `Shared components reference`, `DataLakePanel`, `getTierCost`, `Key engine functions (`src/game/engine.js`)`, `Testing`, `ByteFoundryPage`, `clampNonNegative`, `PerksPage/index.jsx`, `Button/index.jsx`, `MilestonesPage/index.jsx`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Are the 241 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 241 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `@capacitor/android`, `@capacitor/core` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage` be split into smaller, more focused modules?**
  _Cohesion score 0.06467661691542288 - nodes in this community are weakly interconnected._
- **Why does `Design history & rationale` connect `provisionDisk` to `DataLakePanel`, `navAttention.js`, `Key engine functions (`src/game/engine.js`)`, `ComputePage`, `Automation workflows`, `Economy model`, `Testing`, `CLAUDE.md`, `DiskArrayRow`, `createInitialGameState`, `storage.js`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._