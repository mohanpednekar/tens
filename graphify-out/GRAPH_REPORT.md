# Graph Report - tens  (2026-09-23)

## Corpus Check
- 107 files · ~477,001 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .ico 1)

## Summary
- 1659 nodes · 6170 edges · 85 communities (68 shown, 17 thin omitted)
- Extraction: 66% EXTRACTED · 34% INFERRED · 0% AMBIGUOUS · INFERRED: 2080 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8fc88f03`
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
- Byte Foundry
- Key engine functions (`src/game/engine.js`)
- tickGame
- ByteFoundryPage
- ComputeFlopsPage/index.jsx
- applyDevGameStateJson
- useIncrementalGame
- ref_child_process
- run-simulation.mjs
- getSaveIncompatibilityReason
- What You Must Do When Invoked
- bump-version.mjs
- DevModePage/index.jsx
- Button/index.jsx
- storage.js
- tokens.js
- AGENTS.md
- App.jsx
- SettingsPage/index.jsx
- formatCurrency
- clampNonNegative
- CLAUDE.md
- Tens
- MainPage reference
- MilestonesPage/index.jsx
- mergeDataLakes
- package.json
- createInitialGameState
- Changelog
- devDependencies
- Shared components reference
- scripts
- getStoragePoolMemoryBounds
- Procedure
- main
- vitest
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- latchMainGameUnlocked
- generate-pwa-icons.mjs
- engine.test.js
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- graphify reference: query, path, explain
- simulate-run-times/SKILL.md
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
- ConfirmDialog/index.jsx
- graphify
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

## Communities (85 total, 17 thin omitted)

### Community 0 - "Testing"
Cohesion: 0.10
Nodes (59): A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake Boosters: spending real deposits, not a separate "used" ledger (+51 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.03
Nodes (58): GLOBAL_TICKSPEED_PRODUCTION_STEP, PURCHASE_MILESTONE_MULTIPLIER_BASE, BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill (+50 more)

### Community 2 - "Economy model"
Cohesion: 0.10
Nodes (35): What it does, `DiskArrayRow/index.jsx`, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Economy model (+27 more)

### Community 3 - "layers.js"
Cohesion: 0.03
Nodes (113): seedDataLakeSave(), ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST (+105 more)

### Community 4 - "navAttention.js"
Cohesion: 0.08
Nodes (43): Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, APP_NAV_BOTTOM_PAD, AttentionDot, Bar, Icon, Label, NavItem (+35 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.05
Nodes (59): Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), forfeitComputeBoost() (+51 more)

### Community 6 - "ByteFoundryPage/index.jsx"
Cohesion: 0.05
Nodes (72): Pool-local resets, "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456) (+64 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "engine.js"
Cohesion: 0.06
Nodes (60): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, buyHyperscaler(), canBuyHyperscaler(), combineIntroByte(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter (+52 more)

### Community 9 - "DiskArrayRow"
Cohesion: 0.07
Nodes (50): A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping, Foundry Memory always keeps the highest Disk row (issue #389), Read cache blocks (`DiskArrayRow`) render a proportional fill overlay, not just full/empty (+42 more)

### Community 10 - "Byte Foundry"
Cohesion: 0.08
Nodes (82): Changed, `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17 (+74 more)

### Community 11 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.22
Nodes (20): Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Key engine functions (`src/game/engine.js`), Prestige and the Googol freeze, getComputeBoostMultiplier(), getComputeBoostTierMultiplier(), getDataStreamBaseMultiplierPercent(), getDataStreamEffectMultiplier() (+12 more)

### Community 12 - "tickGame"
Cohesion: 0.15
Nodes (36): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price (+28 more)

### Community 13 - "ByteFoundryPage"
Cohesion: 0.12
Nodes (56): Fixed, Removed, Architecture, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09 (+48 more)

### Community 14 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.11
Nodes (24): PP Compute (Flops), styled-components, Body, Card, Overlay, Title, Money, StatCard (+16 more)

### Community 15 - "applyDevGameStateJson"
Cohesion: 0.50
Nodes (5): Security, applyDevGameStateJson(), isPlainObject(), mergeStateForDevWrite(), safeJsonParse()

### Community 16 - "useIncrementalGame"
Cohesion: 0.24
Nodes (24): Dev Mode, Security notes, `OfflineProgressNotice/index.jsx`, Offline progress, applyOfflineProgress(), getOfflineEffectiveSeconds(), clearAllSaveProgress(), clearDevGameState() (+16 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.12
Nodes (26): actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+18 more)

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
Cohesion: 0.14
Nodes (14): ButtonGrid, coerceDraft(), Details, FieldLabel, FieldRow, Header, JsonTextarea, NumberInput (+6 more)

### Community 23 - "Button/index.jsx"
Cohesion: 0.13
Nodes (20): Fixed, `Button/index.jsx`, Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb() (+12 more)

### Community 24 - "storage.js"
Cohesion: 0.19
Nodes (24): PRESTIGE_UNBOUNDED_MIN_COUNT, buildClearSlotConfirmMessage(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), coerceMeta(), completeDummySupporterPurchase(), defaultSlotName(), FREE_SLOT_COUNT (+16 more)

### Community 25 - "tokens.js"
Cohesion: 0.15
Nodes (14): GlobalStyle, getSystemThemeMode(), buildTheme(), DEFAULT_MODE, font, MODES, motion, palette (+6 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.11
Nodes (17): AI-instruction file cost hygiene, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling, Commands, Funding (+9 more)

### Community 27 - "App.jsx"
Cohesion: 0.10
Nodes (27): Changed, `AppNav/index.jsx`, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Migration in `src/save-migration/`, runs on every load — 2026-08-22, Save persistence, Theming reference, App(), GATE_EXEMPT_PAGES (+19 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.12
Nodes (16): MUSEUM_PIN_CAP, buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem, MuseumList (+8 more)

### Community 29 - "formatCurrency"
Cohesion: 0.29
Nodes (12): Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific(), getEonsAwarded() (+4 more)

### Community 30 - "clampNonNegative"
Cohesion: 0.14
Nodes (34): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Era ascension and Eons (#407), Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier, applyFlopsAutobuyerMilestones(), buyAutoPrestige(), buyAutoPrestigeAutobuyer(), buyAutoScaleUp() (+26 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.10
Nodes (19): AI-instruction file cost hygiene, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Documentation, Economy model, Funding (+11 more)

### Community 32 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 33 - "MainPage reference"
Cohesion: 0.12
Nodes (43): seedState(), Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14 (+35 more)

### Community 34 - "MilestonesPage/index.jsx"
Cohesion: 0.18
Nodes (10): ERA_ELIGIBILITY_PP, Badge, Category, CategoryHeading, Header, List, RootDiv, Row (+2 more)

### Community 35 - "mergeDataLakes"
Cohesion: 0.47
Nodes (6): createEmptyDataLakes(), createEmptyDataLakeTier(), getLegacyPendingTransferCount(), isLegacyDataLakeTier(), mergeDataLakes(), migrateLegacyDataLakeTier()

### Community 36 - "package.json"
Cohesion: 0.10
Nodes (19): browserslist, development, production, name, packageManager, private, type, version (+11 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.19
Nodes (28): 2. Load the repo's invariants, actSoftResets(), Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, Removing Claim Core: superseded by Data Lake Boosters, `scaleUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry, Speed Up renamed to Scale Up and redesigned from a last-tier-only gate to a per-tier unlock ladder — 2026-09-09, Starting Money reduced from 10 to 1 (+20 more)

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

### Community 44 - "getStoragePoolMemoryBounds"
Cohesion: 0.19
Nodes (21): actFoundry(), A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool 10's buffer ceiling landed a ULP below its own largest disk's face value — 2026-09-08, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024, Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display (+13 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "main"
Cohesion: 0.18
Nodes (15): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Orchestration model, PR conflict sweep (`pr-conflict-sweep.yml`) (+7 more)

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

### Community 55 - "latchMainGameUnlocked"
Cohesion: 0.24
Nodes (12): Adding a new tier, Architecture, Byte Foundry, Path aliases (`vite.config.js`), Project, Added, Project, CLAUDE.md Economy model duplication trim — 2026-09-03 (+4 more)

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.22
Nodes (7): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), targets

### Community 59 - "engine.test.js"
Cohesion: 0.04
Nodes (31): clearIntroCapacityUpgradeQueue(), isAnyComputeMergeInFlight(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable(), isComputeFabricsMergeStartAvailable(), isComputeGridsMergeStartAvailable() (+23 more)

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
Cohesion: 0.40
Nodes (4): Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run

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
Cohesion: 0.38
Nodes (7): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear()

### Community 90 - "ConfirmDialog/index.jsx"
Cohesion: 0.15
Nodes (10): react, react-dom, web-vitals, Actions, Body, Card, Overlay, Title (+2 more)

### Community 110 - "mergeState"
Cohesion: 0.11
Nodes (21): Accessibility, Added, Added, Added, Changed, Changed, Changed, Fixed (+13 more)

## Knowledge Gaps
- **476 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+471 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 554 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `main` to `Testing`, `simulate-run-times/SKILL.md`, `MainPage reference`, `createInitialGameState`, `ByteFoundryPage/index.jsx`, `Automation workflows`, `Byte Foundry`, `tickGame`, `ByteFoundryPage`, `bump-version.mjs`, `file-task-issue/SKILL.md`, `latchMainGameUnlocked`, `AGENTS.md`, `CLAUDE.md`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `Architecture` connect `latchMainGameUnlocked` to `MainPage reference`, `ComputePage/index.jsx`, `ByteFoundryPage`, `ComputeFlopsPage/index.jsx`, `AGENTS.md`, `formatCurrency`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `ByteFoundryPage` to `Tens`, `Testing`, `Economy model`, `MainPage reference`, `navAttention.js`, `createInitialGameState`, `ComputePage/index.jsx`, `Automation workflows`, `Byte Foundry`, `tickGame`, `getStoragePoolMemoryBounds`, `latchMainGameUnlocked`, `App.jsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Are the 225 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 225 INFERRED edges - model-reasoned connections that need verification._
- **Are the 154 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 154 INFERRED edges - model-reasoned connections that need verification._
- **Are the 50 inferred relationships involving `tickGame()` (e.g. with `2. Load the repo's invariants` and `Architecture`) actually correct?**
  _`tickGame()` has 50 INFERRED edges - model-reasoned connections that need verification._
- **Are the 94 inferred relationships involving `MainPage reference` (e.g. with `AppNav()` and `progressFill()`) actually correct?**
  _`MainPage reference` has 94 INFERRED edges - model-reasoned connections that need verification._