# Graph Report - tens  (2026-09-24)

## Corpus Check
- 110 files · ~479,374 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .ico 1)

## Summary
- 1686 nodes · 6214 edges · 84 communities (67 shown, 17 thin omitted)
- Extraction: 66% EXTRACTED · 34% INFERRED · 0% AMBIGUOUS · INFERRED: 2101 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e7d76d1b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Testing
- MainPage/index.jsx
- Economy model
- layers.js
- navAttention.js
- ComputePage/index.jsx
- ByteFoundryPage/index.jsx
- Automation workflows
- engine.js
- DiskArrayRow
- DataLakePanel/index.jsx
- engine.computeFlops.test.js
- tickGame
- provisionDisk
- ComputeFlopsPage/index.jsx
- ByteFoundryPage
- Key engine functions (`src/game/engine.js`)
- ref_child_process
- run-simulation.mjs
- palette.md
- What You Must Do When Invoked
- bump-version.mjs
- DevModePage/index.jsx
- Button/index.jsx
- useIncrementalGame
- App.jsx
- AGENTS.md
- src/index.jsx
- SettingsPage/index.jsx
- formatCurrency
- clampNonNegative
- CLAUDE.md
- Tens
- MainPage reference
- MilestonesPage/index.jsx
- Shared components reference
- package.json
- createInitialGameState
- tickComputeFlopsAutobuyers
- [Unreleased]
- getPrestigePointsAwarded
- devDependencies
- browserslist
- scripts
- getStoragePoolMemoryBounds
- Procedure
- main
- capacitorConfig.test.js
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- Architecture
- generate-pwa-icons.mjs
- engine.test.js
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- graphify reference: query, path, explain
- resolutions
- sync-release-milestones.sh
- adversarialReviewMarker.js
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- pull_request_template.md
- jsconfig.json
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- publish-strategy.sh
- contrast.js
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- ref_fs
- graphify
- session-start.sh
- extraction-spec.md
- PWA_REFERENCE.md
- resolve-pr-threads.sh
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

## Communities (84 total, 17 thin omitted)

### Community 0 - "Testing"
Cohesion: 0.12
Nodes (41): A fourth Codex round: the "absolute ceiling" clamp itself was too high, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card, Data Lake refill gating: staged 9 → 99 → 999 capacity from disk-array completion, Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382), Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Disk ladder offers every Byte power-of-ten size (issue #368) (+33 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (55): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments, CategoryHeading (+47 more)

### Community 2 - "Economy model"
Cohesion: 0.11
Nodes (28): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Multiplier overflow safety: the switch to compounding needed a floor (+20 more)

### Community 3 - "layers.js"
Cohesion: 0.03
Nodes (105): version, ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST (+97 more)

### Community 4 - "navAttention.js"
Cohesion: 0.06
Nodes (62): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, vitest, canBuyComputeFlopsTier(), enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable() (+54 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.07
Nodes (29): getNextComputeMergeDurationUpgradeIndex(), ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostRow, CompactButton, COMPUTE_BOOST_DISPLAY (+21 more)

### Community 6 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (56): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, The multiplier bar moved below the balance, with its percent readout below the bar itself, flooredBitsLabel(), floorToDecimals() (+48 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "engine.js"
Cohesion: 0.07
Nodes (51): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer (+43 more)

### Community 9 - "DiskArrayRow"
Cohesion: 0.07
Nodes (52): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping (+44 more)

### Community 10 - "DataLakePanel/index.jsx"
Cohesion: 0.06
Nodes (87): Changed, `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04 (+79 more)

### Community 11 - "engine.computeFlops.test.js"
Cohesion: 0.22
Nodes (10): buyComputeFlopsTier(), getComputeFlopsAffordableQuantity(), getComputeFlopsTierCost(), AUTO_SCALE_UP_COST, BYTES_ID, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP (+2 more)

### Community 12 - "tickGame"
Cohesion: 0.15
Nodes (36): 5. Authorization boundary, wouldAutobuyerStall(), `OfflineProgressNotice/index.jsx`, Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price (+28 more)

### Community 13 - "provisionDisk"
Cohesion: 0.13
Nodes (47): Fixed, Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+39 more)

### Community 14 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.17
Nodes (15): PP Compute (Flops), Money, formatComputeFlopsBoost(), formatComputeFlopsTotal(), isComputeFlopsPageRevealed(), ComputeFlopsPage(), FlopsHero, Header (+7 more)

### Community 15 - "ByteFoundryPage"
Cohesion: 0.13
Nodes (38): actFoundry(), A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit (+30 more)

### Community 16 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.15
Nodes (38): Pool-local resets, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity), Byte Foundry, Constants (`src/game/layers.js`), Key engine functions (`src/game/engine.js`) (+30 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.14
Nodes (23): actMainBuys(), actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+15 more)

### Community 19 - "palette.md"
Cohesion: 0.20
Nodes (9): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements, 2026-09-06 - Focus Visible Styles for custom interactive components and Disclosure summary elements (+1 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): ref_node_os, assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+12 more)

### Community 22 - "DevModePage/index.jsx"
Cohesion: 0.14
Nodes (14): ButtonGrid, coerceDraft(), Details, FieldLabel, FieldRow, Header, JsonTextarea, NumberInput (+6 more)

### Community 23 - "Button/index.jsx"
Cohesion: 0.12
Nodes (21): Fixed, `Button/index.jsx`, Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb() (+13 more)

### Community 24 - "useIncrementalGame"
Cohesion: 0.06
Nodes (93): Dev Mode, End-to-end testing, Security notes, Testing, `IncompatibleSaveNotice/index.jsx`, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Save persistence, Offline progress (+85 more)

### Community 25 - "App.jsx"
Cohesion: 0.08
Nodes (32): Changed, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Theming reference, styled-components, GATE_EXEMPT_PAGES, PageShell, APP_NAV_BOTTOM_PAD, AttentionDot (+24 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.11
Nodes (17): AI-instruction file cost hygiene, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling, Commands, Funding (+9 more)

### Community 27 - "src/index.jsx"
Cohesion: 0.33
Nodes (4): react-dom, web-vitals, rootElement, reportWebVitals()

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.12
Nodes (15): buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem, MuseumList, RootDiv (+7 more)

### Community 29 - "formatCurrency"
Cohesion: 0.42
Nodes (9): Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), RESOURCE_SYMBOL() (+1 more)

### Community 30 - "clampNonNegative"
Cohesion: 0.13
Nodes (37): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for the global automations, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier, applyFlopsAutobuyerMilestones(), buyAutoPrestige() (+29 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.10
Nodes (19): AI-instruction file cost hygiene, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Documentation, Economy model, Funding (+11 more)

### Community 32 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 33 - "MainPage reference"
Cohesion: 0.13
Nodes (40): seedState(), Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Why the tick-progress ring was removed, Multiplier outcomes are floored (+32 more)

### Community 34 - "MilestonesPage/index.jsx"
Cohesion: 0.10
Nodes (20): react, Actions, Body, Card, Overlay, Title, Body, Card (+12 more)

### Community 35 - "Shared components reference"
Cohesion: 0.14
Nodes (12): `AppMenu/index.jsx`, `AppNav/index.jsx`, `ConfirmDialog/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`, AppMenu(), Backdrop (+4 more)

### Community 36 - "package.json"
Cohesion: 0.12
Nodes (15): name, packageManager, private, type, @capacitor/cli, @capacitor/core, fast-check, @fontsource/inter (+7 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.13
Nodes (31): 2. Load the repo's invariants, actSoftResets(), Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09 (+23 more)

### Community 38 - "tickComputeFlopsAutobuyers"
Cohesion: 0.27
Nodes (9): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-07-28 - Replace O(N) attempts loop with O(1) batch processing for tickGame autobuyers, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, buyComputeFlopsTierQuantity(), getComputeFlopsAffordableAndCost() (+1 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (31): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+23 more)

### Community 40 - "getPrestigePointsAwarded"
Cohesion: 0.42
Nodes (9): Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Prestige and the Googol freeze, getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp(), getPrestigePpEarnProgressPercent(), getPrestigePpPerPower() (+1 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 43 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 44 - "getStoragePoolMemoryBounds"
Cohesion: 0.13
Nodes (29): Added, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024 (+21 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "main"
Cohesion: 0.18
Nodes (15): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Orchestration model, PR conflict sweep (`pr-conflict-sweep.yml`) (+7 more)

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

### Community 55 - "Architecture"
Cohesion: 0.22
Nodes (14): Adding a new tier, Architecture, Byte Foundry, Path aliases (`vite.config.js`), Project, Architecture, Project, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either (+6 more)

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.22
Nodes (7): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), targets

### Community 59 - "engine.test.js"
Cohesion: 0.05
Nodes (23): getComputeMergeDurationSeconds(), getTickspeedMultiplierBaseCost(), isAnyComputeMergeInFlight(), isLaterPoolProvisioningLocked(), startComputeMergeReserve(), startComputeMergeReserveAtBoundary(), eraEligibleState(), noOtherUpgradesLeft (+15 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

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

### Community 82 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

## Knowledge Gaps
- **490 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+485 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 568 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `main` to `Testing`, `MainPage reference`, `createInitialGameState`, `Automation workflows`, `DataLakePanel/index.jsx`, `tickGame`, `provisionDisk`, `getStoragePoolMemoryBounds`, `Key engine functions (`src/game/engine.js`)`, `bump-version.mjs`, `file-task-issue/SKILL.md`, `Architecture`, `AGENTS.md`, `CLAUDE.md`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `provisionDisk` to `Tens`, `Testing`, `Economy model`, `MainPage reference`, `navAttention.js`, `createInitialGameState`, `Automation workflows`, `DataLakePanel/index.jsx`, `tickGame`, `getStoragePoolMemoryBounds`, `Architecture`, `useIncrementalGame`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `MainPage()` connect `MainPage reference` to `Testing`, `MainPage/index.jsx`, `Economy model`, `Shared components reference`, `createInitialGameState`, `ByteFoundryPage/index.jsx`, `getPrestigePointsAwarded`, `DataLakePanel/index.jsx`, `tickGame`, `provisionDisk`, `Key engine functions (`src/game/engine.js`)`, `run-simulation.mjs`, `Button/index.jsx`, `Architecture`, `App.jsx`, `formatCurrency`, `clampNonNegative`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 225 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 225 INFERRED edges - model-reasoned connections that need verification._
- **Are the 154 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 154 INFERRED edges - model-reasoned connections that need verification._
- **Are the 51 inferred relationships involving `tickGame()` (e.g. with `2. Load the repo's invariants` and `Architecture`) actually correct?**
  _`tickGame()` has 51 INFERRED edges - model-reasoned connections that need verification._
- **Are the 94 inferred relationships involving `MainPage reference` (e.g. with `AppNav()` and `progressFill()`) actually correct?**
  _`MainPage reference` has 94 INFERRED edges - model-reasoned connections that need verification._