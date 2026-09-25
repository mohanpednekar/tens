# Graph Report - tens  (2026-09-24)

## Corpus Check
- 125 files · ~484,039 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .ico 1)

## Summary
- 1727 nodes · 6324 edges · 82 communities (67 shown, 15 thin omitted)
- Extraction: 66% EXTRACTED · 34% INFERRED · 0% AMBIGUOUS · INFERRED: 2132 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `364a0337`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.jsx
- MainPage/index.jsx
- storage.js
- layers.js
- navAttention.js
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
- Constants (`src/game/layers.js`)
- ref_child_process
- run-simulation.mjs
- DataLakePanel/index.jsx
- What You Must Do When Invoked
- bump-version.mjs
- engine.test.js
- Theming reference
- MilestonesPage/index.jsx
- tokens.js
- AGENTS.md
- Offline progress
- SettingsPage/index.jsx
- hasAffordableFullLevel
- Byte Foundry
- CLAUDE.md
- TIER_DEFINITIONS
- MainPage
- Key engine functions (`src/game/engine.js`)
- package.json
- createInitialGameState
- [Unreleased]
- devDependencies
- DiskArrayRow
- scripts
- ByteFoundryPage/index.jsx
- Procedure
- main
- vitest
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- generate-pwa-icons.mjs
- AppNav/index.jsx
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- graphify reference: query, path, explain
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
- `Automation workflows` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `Changelog convention` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `Pull requests` --references--> `main()`  [INFERRED]
  CLAUDE.md → scripts/bump-version.mjs
- `5. Specs go stale — write defensively, and re-verify before filing a rewrite` --references--> `main()`  [INFERRED]
  .claude/skills/file-task-issue/SKILL.md → scripts/bump-version.mjs

## Import Cycles
- None detected.

## Communities (82 total, 15 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.16
Nodes (17): react, web-vitals, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), getComputeFlopsAttentionLevel(), getNavAttention() (+9 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.04
Nodes (56): BalancesSentinel, BuyButton, BuyButtonCostLabel, BuyButtonIcon, BytePowerSegment, BytePowerSegmentFill, BytePowerSegments, CategoryHeading (+48 more)

### Community 2 - "storage.js"
Cohesion: 0.17
Nodes (22): createEmptyDataLakes(), createEmptyDataLakeTier(), PRESTIGE_UNBOUNDED_MIN_COUNT, applyPendingComputeGrants(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), coerceMeta(), defaultSlotName() (+14 more)

### Community 3 - "layers.js"
Cohesion: 0.04
Nodes (90): seedDataLakeSave(), ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST (+82 more)

### Community 4 - "navAttention.js"
Cohesion: 0.07
Nodes (51): enableAutoMerge(), getIntroKilobyteConversionCost(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable() (+43 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.06
Nodes (35): getNextComputeMergeDurationUpgradeIndex(), COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_MAX_STACKS, COMPUTE_ENTITY_CAP, COMPUTE_MERGE_RESERVE_CAP, COMPUTE_MERGE_STEP_MULTIPLIER, COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED, ActiveBoostRow (+27 more)

### Community 6 - "applyDevGameStateJson"
Cohesion: 0.21
Nodes (15): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs. (+7 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.14
Nodes (13): Money, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_REVEAL_PP, FlopsHero, Header, Hint, RootDiv (+5 more)

### Community 9 - "Shared components reference"
Cohesion: 0.13
Nodes (13): `AppMenu/index.jsx`, `AppNav/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js`, AppMenu() (+5 more)

### Community 10 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 11 - "clampNonNegative"
Cohesion: 0.10
Nodes (48): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Era ascension and Eons (#407), Pause/resume for the global automations, PP Compute (Flops), Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier, 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation (+40 more)

### Community 12 - "tickGame"
Cohesion: 0.09
Nodes (56): 5. Authorization boundary, What it does, Architecture / MainPage UI decisions, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one (+48 more)

### Community 13 - "getSaveIncompatibilityReason"
Cohesion: 0.36
Nodes (7): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (18): PRESTIGE_THRESHOLD, ButtonGrid, coerceDraft(), Details, FieldLabel, FieldNode(), FieldRow, Header (+10 more)

### Community 15 - "engine.js"
Cohesion: 0.05
Nodes (64): allResourceIds(), areStoragePoolDisksFull(), AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, clearIntroCapacityUpgradeQueue(), combineIntroByte(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter (+56 more)

### Community 16 - "Constants (`src/game/layers.js`)"
Cohesion: 0.32
Nodes (12): Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Prestige and the Googol freeze, getComputeBoostMultiplier(), getComputeBoostTierMultiplier(), getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded() (+4 more)

### Community 17 - "ref_child_process"
Cohesion: 0.18
Nodes (6): { execSync }, { execSync }, ref_child_process, { execSync }, { execSync }, { execSync }

### Community 18 - "run-simulation.mjs"
Cohesion: 0.11
Nodes (29): actMainBuys(), actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues (+21 more)

### Community 19 - "DataLakePanel/index.jsx"
Cohesion: 0.05
Nodes (112): Changed, actFoundry(), `ByteFoundryPage` pool layout, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18 (+104 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): ref_node_os, assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+12 more)

### Community 22 - "engine.test.js"
Cohesion: 0.05
Nodes (21): eraseAllComputeTokens(), isAnyComputeMergeInFlight(), isLaterPoolProvisioningLocked(), eraEligibleState(), noOtherUpgradesLeft, unlockedLastTierState(), withIntro(), withOwned() (+13 more)

### Community 23 - "Theming reference"
Cohesion: 0.25
Nodes (8): Changed, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Migration in `src/save-migration/`, runs on every load — 2026-08-22, Save persistence, Theming reference, ConfirmDialog(), IncompatibleSaveNotice(), ThemeProvider()

### Community 24 - "MilestonesPage/index.jsx"
Cohesion: 0.09
Nodes (22): styled-components, Actions, Body, Card, Overlay, Title, Body, Card (+14 more)

### Community 25 - "tokens.js"
Cohesion: 0.12
Nodes (20): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), getSystemThemeMode() (+12 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.12
Nodes (15): AI-instruction file cost hygiene, Automation design principles, Budget discipline, Changelog convention, Commands, Funding, Issue-authoring tooling, Issue tracking conventions (+7 more)

### Community 27 - "Offline progress"
Cohesion: 0.73
Nodes (6): `OfflineProgressNotice/index.jsx`, Offline progress, applyOfflineProgress(), getOfflineEffectiveSeconds(), computeInitialGame(), computeOfflineCatchUp()

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.10
Nodes (20): MUSEUM_PIN_CAP, buildClearSlotConfirmMessage(), FREE_SLOT_COUNT, SUPPORTER_SLOT_COUNT, SUPPORTER_UNLOCK_CODE, buildSparklinePath(), CodeForm, CodeInput (+12 more)

### Community 29 - "hasAffordableFullLevel"
Cohesion: 0.60
Nodes (5): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, getTiersAttentionLevel(), hasAffordableFullLevel(), hasTiersAttention(), hasTiersGameAttention()

### Community 30 - "Byte Foundry"
Cohesion: 0.05
Nodes (168): Adding a new tier, Architecture, Byte Foundry, Path aliases (`vite.config.js`), Project, Added, Removed, Architecture (+160 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Documentation, Economy model, Funding (+10 more)

### Community 32 - "TIER_DEFINITIONS"
Cohesion: 0.40
Nodes (4): COMPUTE_FLOPS_TIER_DEFINITIONS, TIER_DEFINITIONS, FLOPS_TIER_NAME_BY_ID, TIER_NAME_BY_ID

### Community 33 - "MainPage"
Cohesion: 0.10
Nodes (41): Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Reintroducing the 1s-10s tickspeed ladder, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14 (+33 more)

### Community 34 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.10
Nodes (50): seedState(), "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, Key engine functions (`src/game/engine.js`) (+42 more)

### Community 36 - "package.json"
Cohesion: 0.09
Nodes (20): browserslist, development, production, name, packageManager, private, type, version (+12 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.20
Nodes (28): Fixed, 2. Load the repo's invariants, End-to-end testing, actSoftResets(), When editing the simulation, Testing, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, `scaleUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry (+20 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (31): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+23 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.06
Nodes (59): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping (+51 more)

### Community 43 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 44 - "ByteFoundryPage/index.jsx"
Cohesion: 0.06
Nodes (34): The multiplier bar moved below the balance, with its percent readout below the bar itself, ActionsRow, BalanceSeparator, BalanceText, BarFillBase, BarFillBonus, BarFillLake, BarPercentLabel (+26 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "main"
Cohesion: 0.11
Nodes (21): Automation engine, Code review tooling, Interactive session startup, Strategy snapshots (orphan branch) — required after every run, Usage, When to re-run, AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`) (+13 more)

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

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.22
Nodes (7): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), targets

### Community 57 - "AppNav/index.jsx"
Cohesion: 0.22
Nodes (8): APP_NAV_BOTTOM_PAD, AttentionDot, Bar, Icon, Label, NavItem, pulseHigh, ATTENTION_HIGH

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 64 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

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
Cohesion: 0.13
Nodes (20): Fixed, `Button/index.jsx`, Button, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb() (+12 more)

### Community 89 - "ref_fs"
Cohesion: 0.08
Nodes (14): content, content, content, content, content, content, content, mdContent (+6 more)

### Community 106 - "useIncrementalGame"
Cohesion: 0.26
Nodes (23): Dev Mode, Security notes, clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot(), completeDummySupporterPurchase(), discardIncompatibleActiveSaveIfNeeded() (+15 more)

## Knowledge Gaps
- **509 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+504 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 585 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `main()` connect `main` to `MainPage`, `createInitialGameState`, `Automation workflows`, `tickGame`, `DataLakePanel/index.jsx`, `bump-version.mjs`, `file-task-issue/SKILL.md`, `Byte Foundry`, `CLAUDE.md`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `MainPage()` connect `MainPage` to `App.jsx`, `MainPage/index.jsx`, `Key engine functions (`src/game/engine.js`)`, `createInitialGameState`, `Shared components reference`, `clampNonNegative`, `tickGame`, `Constants (`src/game/layers.js`)`, `run-simulation.mjs`, `DataLakePanel/index.jsx`, `Theming reference`, `Offline progress`, `Byte Foundry`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `Design history & rationale` connect `Byte Foundry` to `MainPage`, `createInitialGameState`, `Automation workflows`, `Tens`, `tickGame`, `DataLakePanel/index.jsx`, `Theming reference`, `hasAffordableFullLevel`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Are the 233 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 233 INFERRED edges - model-reasoned connections that need verification._
- **Are the 156 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 156 INFERRED edges - model-reasoned connections that need verification._
- **Are the 51 inferred relationships involving `tickGame()` (e.g. with `2. Load the repo's invariants` and `Architecture`) actually correct?**
  _`tickGame()` has 51 INFERRED edges - model-reasoned connections that need verification._
- **Are the 95 inferred relationships involving `MainPage reference` (e.g. with `AppNav()` and `progressFill()`) actually correct?**
  _`MainPage reference` has 95 INFERRED edges - model-reasoned connections that need verification._