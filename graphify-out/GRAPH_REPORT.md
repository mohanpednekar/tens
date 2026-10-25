# Graph Report - tens  (2026-10-25)

## Corpus Check
- 161 files · ~503,295 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 10, (none) 8, .properties 2)

## Summary
- 2358 nodes · 7820 edges · 123 communities (91 shown, 32 thin omitted)
- Extraction: 71% EXTRACTED · 29% INFERRED · 0% AMBIGUOUS · INFERRED: 2251 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `51916bbf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lint-workflow-shell.mjs
- MainPage/index.jsx
- AppDelegate
- layers.js
- navAttention.js
- ComputePage
- engine.test.js
- Automation workflows
- Economy model
- AppNav
- CLAUDE.md
- save-migration/index.js
- run-simulation.mjs
- Byte Foundry
- DevModePage/index.jsx
- engine.js
- Architecture
- App.test.jsx
- InfoPage/index.jsx
- storage.js
- with
- bump-version.mjs
- MilestonesPage/index.jsx
- tickPoolBufferFill
- ComputeFlopsPage/index.jsx
- tokens.js
- AGENTS.md
- steps
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- Economy model — Byte Foundry (full text)
- with
- Shared components reference
- DataLakePanel/index.jsx
- tickGame
- resolutions
- simulate-run-times/SKILL.md
- MainActivity.java
- Changelog
- Testing
- package.json
- DiskArrayRow/index.jsx
- scripts
- ByteFoundryPage
- sentinel.md
- clampNonNegative
- Procedure
- Automation workflows
- ref_node_fs
- backlog-issue-hygiene.sh
- auto-merge-after-adversarial-approve
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
- env
- palette.md
- with
- sync-release-milestones.sh
- adversarialReviewMarker.js
- steps
- App.jsx
- Key engine functions (`src/game/engine.js`)
- pull_request_template.md
- jsconfig.json
- react
- steps
- pr-conflict-sweep.yml
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- getEffectiveTierTickSpeedSeconds
- steps
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- browserslist
- mergeState
- getDiskSizesToShow
- env
- .claude/CLAUDE.md
- check-graphify-freshness.mjs
- Button/index.jsx
- session-start.sh
- steps
- ci.yml
- PWA_REFERENCE.md
- dev-team/SKILL.md
- body
- with
- autonomous-maintenance.yml
- useIncrementalGame
- resolve-pr-threads.sh
- MainPage reference
- steps
- engine.computeFlops.test.js
- updates
- permissions
- mergeDataLakes
- claude-deny-settings.sh
- pr-head-guard.sh
- sweep-stalled-auto-prs.sh
- FUNDING.yml
- scripts/autonomous-maintenance-workflow.test.js

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 247 edges
2. `Byte Foundry` - 165 edges
3. `ByteFoundryPage()` - 142 edges
4. `MainPage()` - 134 edges
5. `tickGame()` - 117 edges
6. `MainPage reference` - 111 edges
7. `useIncrementalGame()` - 90 edges
8. `Testing` - 87 edges
9. `DataLakePanel()` - 82 edges
10. `Economy model — Byte Foundry (full text)` - 82 edges

## Surprising Connections (you probably didn't know these)
- `A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too` --references--> `formatCapacityLabel()`  [INFERRED]
  docs/DESIGN_HISTORY.md → .claude/skills/simulate-run-times/run-simulation.mjs
- `Mobile build (`mobile-build.yml`)` --references--> `App()`  [INFERRED]
  docs/AUTOMATION.md → src/App.jsx
- ``Switch/index.js`` --references--> `BuyMaxToggle()`  [INFERRED]
  docs/COMPONENTS_REFERENCE.md → src/components/BuyMaxToggle/index.jsx
- `Changed` --references--> `DiskArrayRow()`  [INFERRED]
  CHANGELOG.md → src/components/DiskArrayRow/index.jsx
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (123 total, 32 thin omitted)

### Community 0 - "lint-workflow-shell.mjs"
Cohesion: 0.40
Nodes (7): bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main(), sanitizeExpressions()

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.05
Nodes (77): Fixed, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, The global tickspeed multiplier, Theming reference, ButtonContent(), ButtonIcon, ButtonLabel (+69 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "layers.js"
Cohesion: 0.04
Nodes (59): seedDataLakeSave(), AUTOBUYER_BASE_INTERVAL_SECONDS, AUTOBUYER_BULK_LEVELS_BASE, AUTOBUYER_INTERVAL_MULTIPLIER, AUTOBUYER_MIN_INTERVAL_SECONDS, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP (+51 more)

### Community 4 - "navAttention.js"
Cohesion: 0.12
Nodes (29): isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable(), isAutoMergeNodesIntoClusterUnlockAvailable() (+21 more)

### Community 5 - "ComputePage"
Cohesion: 0.05
Nodes (78): Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Architecture 4b — `ComputePage/index.jsx`, Foundry Mechanics Reference, Badge, BoostBadge() (+70 more)

### Community 6 - "engine.test.js"
Cohesion: 0.04
Nodes (25): getBiggestComputeTierWaitingOnMerge(), getTickspeedMultiplierBaseCost(), isAnyComputeMergeInFlight(), AUTO_SCALE_UP_COST, eraEligibleState(), noOtherUpgradesLeft, TICKSPEED_AUTOBUYER_COST, unlockedLastTierState() (+17 more)

### Community 7 - "Automation workflows"
Cohesion: 0.13
Nodes (15): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+7 more)

### Community 8 - "Economy model"
Cohesion: 0.09
Nodes (48): 2. Load the repo's invariants, actSoftResets(), When editing the simulation, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31 (+40 more)

### Community 9 - "AppNav"
Cohesion: 0.27
Nodes (10): Project, APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem (+2 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.06
Nodes (31): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+23 more)

### Community 11 - "save-migration/index.js"
Cohesion: 0.35
Nodes (9): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), isPlainObject(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), isPlainObject() (+1 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.15
Nodes (22): actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+14 more)

### Community 13 - "Byte Foundry"
Cohesion: 0.14
Nodes (34): actCapacityUpgrade(), actFoundry(), A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split (+26 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.16
Nodes (22): Testing, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow (+14 more)

### Community 15 - "engine.js"
Cohesion: 0.06
Nodes (54): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, doubleIntroCapacity(), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode (+46 more)

### Community 16 - "Architecture"
Cohesion: 0.50
Nodes (9): Architecture, `OfflineProgressNotice/index.jsx`, Offline progress, applyOfflineProgress(), getOfflineEffectiveSeconds(), discardIncompatibleActiveSaveIfNeeded(), loadLastSaveTimestamp(), computeInitialGame() (+1 more)

### Community 17 - "App.test.jsx"
Cohesion: 0.06
Nodes (31): vitest, ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), AUTO_PRESTIGE_AUTOBUYER_COST, COMPUTE_AUTO_BOOST_UNLOCK_COST, COMPUTE_BOOST_MAX_STACKS (+23 more)

### Community 18 - "InfoPage/index.jsx"
Cohesion: 0.09
Nodes (27): version, TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, CACHE_FILL_FROM_DISK_BANDWIDTH_MULTIPLIER, COMPUTE_CORES_PER_NODE, COMPUTE_ENTITY_CAP, COMPUTE_FLOPS_FIRST_TIER_COST_PP, COMPUTE_FLOPS_LAST_TIER_COST_PP, COMPUTE_MERGE_RESERVE_CAP (+19 more)

### Community 19 - "storage.js"
Cohesion: 0.20
Nodes (22): buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), BUY_MAX_PREFERENCE_KEY, coerceMeta(), completeDummySupporterPurchase(), defaultSlotName(), FREE_SLOT_COUNT, grantSupporterUnlock() (+14 more)

### Community 20 - "with"
Cohesion: 0.04
Nodes (48): types, concurrency, cancel-in-progress, group, CHECK_SUITE_BRANCH, CHECK_SUITE_CONCLUSION, EVENT_NAME, GH_TOKEN (+40 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.17
Nodes (21): Release (`release.yml`), assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+13 more)

### Community 22 - "MilestonesPage/index.jsx"
Cohesion: 0.38
Nodes (9): isEraEligible(), Badge, Category, CategoryHeading, Header, List, MilestonesPage(), RootDiv (+1 more)

### Community 23 - "tickPoolBufferFill"
Cohesion: 0.13
Nodes (47): Byte Foundry, Byte Foundry, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable (+39 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.15
Nodes (25): PP Compute (Flops), styled-components, Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost() (+17 more)

### Community 25 - "tokens.js"
Cohesion: 0.13
Nodes (19): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), buildTheme() (+11 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.11
Nodes (17): AI-instruction file cost hygiene, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling, Commands, Funding (+9 more)

### Community 27 - "steps"
Cohesion: 0.05
Nodes (39): concurrency, cancel-in-progress, group, GH_TOKEN, RUN_CONCLUSION, RUN_HEAD_SHA, RUN_ID, RUN_NAME (+31 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.14
Nodes (26): Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Actions, Body, Card, ConfirmDialog(), Overlay, Title, StatCard (+18 more)

### Community 30 - "Economy model — Byte Foundry (full text)"
Cohesion: 0.10
Nodes (66): Fixed, Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+58 more)

### Community 32 - "with"
Cohesion: 0.05
Nodes (37): types, concurrency, cancel-in-progress, group, CHECK_SUITE_BRANCH, CHECK_SUITE_CONCLUSION, GH_TOKEN, runs-on (+29 more)

### Community 33 - "Shared components reference"
Cohesion: 0.15
Nodes (15): `AppMenu/index.jsx`, `AppNav/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js` (+7 more)

### Community 34 - "DataLakePanel/index.jsx"
Cohesion: 0.08
Nodes (74): Changed, `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Data Lake Boosters: spending real deposits, not a separate "used" ledger, Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap (+66 more)

### Community 35 - "tickGame"
Cohesion: 0.13
Nodes (43): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price (+35 more)

### Community 36 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 37 - "simulate-run-times/SKILL.md"
Cohesion: 0.50
Nodes (3): Strategy snapshots (orphan branch) — required after every run, Usage, When to re-run

### Community 39 - "Changelog"
Cohesion: 0.11
Nodes (18): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+10 more)

### Community 40 - "Testing"
Cohesion: 0.09
Nodes (48): A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Compute Boost base presets: fixing a total-extra-production ordering bug, Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755) (+40 more)

### Community 41 - "package.json"
Cohesion: 0.09
Nodes (28): devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2, jsdom@^30.1.2, @testing-library/dom@^10.4.1, @testing-library/jest-dom@^7.0.1, @testing-library/react@^16.3.3, @testing-library/user-event@^14.6.8 (+20 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.10
Nodes (31): Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Pool titles simplified to "<symbol> Pool"; each pool's Data Lake moved inside its own card, Read cache blocks (`DiskArrayRow`) render a proportional fill overlay, not just full/empty, Speed exponent rises with Foundry-reset Disk-size unlocks (2026-10), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), CacheBlock (+23 more)

### Community 43 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+7 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.05
Nodes (85): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix (+77 more)

### Community 45 - "sentinel.md"
Cohesion: 0.18
Nodes (15): Security, 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation (+7 more)

### Community 46 - "clampNonNegative"
Cohesion: 0.12
Nodes (45): Tiers, Prestige, Era ascension, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Era ascension and Eons (#407), Pause/resume for the global automations, Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier (+37 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.14
Nodes (13): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Mobile build (`mobile-build.yml`), Orchestration model (+5 more)

### Community 49 - "ref_node_fs"
Cohesion: 0.10
Nodes (9): workflow, workflowPath, script, zeroWork, script, script, root, srcPath (+1 more)

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 51 - "auto-merge-after-adversarial-approve"
Cohesion: 0.06
Nodes (37): env, if, runs-on, steps, timeout-minutes, env, if, runs-on (+29 more)

### Community 52 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, @capacitor/android@^8.5.3, @capacitor/core@^8.5.3, @capacitor/ios@^8.5.3, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0, react@^19.3.1, react-dom@^19.3.1 (+11 more)

### Community 53 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 54 - "file-task-issue/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.19
Nodes (12): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp@^0.35.5, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), overwrite() (+4 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 62 - "@playwright/test"
Cohesion: 0.20
Nodes (3): seededState, @playwright/test@^1.64.0, @playwright/test

### Community 63 - "PerksPage/index.jsx"
Cohesion: 0.08
Nodes (53): seedState(), Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, VisuallyHidden, BuyMaxToggle(), Switch, applyAutobuyerMilestones(), getAutobuyerBaseIntervalSeconds(), getAutobuyerIntervalMaxLevel() (+45 more)

### Community 64 - "env"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 66 - "palette.md"
Cohesion: 0.18
Nodes (10): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+2 more)

### Community 68 - "with"
Cohesion: 0.07
Nodes (31): runs-on, steps, concurrency, cancel-in-progress, group, runs-on, steps, jobs (+23 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 73 - "steps"
Cohesion: 0.08
Nodes (24): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, FAIL_MARKER, GH_TOKEN (+16 more)

### Community 74 - "App.jsx"
Cohesion: 0.16
Nodes (22): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), isComputeCoreConversionUnlocked(), isPerksPageRevealed, COMPUTE_AUTO_MERGE_UNLOCKS, COMPUTE_INSTANT_MERGE_BOUNDARIES (+14 more)

### Community 75 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.16
Nodes (26): A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Sacrifice confirm: in-game dialog; Core warning only when unlocked, Sacrifice for 10x Capacity gated behind every other currently-possible action, Upgrade Data Stream arms below a full Buffer (outflow pause) — SUPERSEDED, Key engine functions (`src/game/engine.js`), areStoragePoolDisksFull(), clearIntroCapacityUpgradeQueue(), getDataStreamBaseMultiplierPercent() (+18 more)

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "react"
Cohesion: 0.22
Nodes (9): Changed, react, Body, Card, IncompatibleSaveNotice(), Overlay, Title, rootElement (+1 more)

### Community 79 - "steps"
Cohesion: 0.09
Nodes (22): description, inputs, install, node-version, default, description, required, name (+14 more)

### Community 80 - "pr-conflict-sweep.yml"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_REPO, GH_TOKEN, jobs, sweep, name (+14 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 84 - "getEffectiveTierTickSpeedSeconds"
Cohesion: 0.13
Nodes (25): Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Reintroducing the 1s-10s tickspeed ladder, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Why the tick-progress ring was removed, Why tickspeed multipliers shrink the delivery period instead of scaling production (+17 more)

### Community 85 - "steps"
Cohesion: 0.09
Nodes (22): BEFORE_SHA, GH_TOKEN, jobs, tag-and-release, name, permissions, contents, branches (+14 more)

### Community 88 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 89 - "mergeState"
Cohesion: 0.11
Nodes (20): Accessibility, Added, Added, Added, Added, Changed, Changed, Changed (+12 more)

### Community 90 - "getDiskSizesToShow"
Cohesion: 0.22
Nodes (12): Adding a new tier, Architecture, Path aliases (`vite.config.js`), CLAUDE.md Economy model duplication trim — 2026-09-03, Foundry Memory always keeps the highest Disk row (issue #389), `tickDiskAutoFill`: a fully-staged cache could get starved out by an unrelated smaller size, getDiskSizesToShow(), getRelevantDiskSizesForFoundry() (+4 more)

### Community 91 - "env"
Cohesion: 0.11
Nodes (19): CLAUDE_OUTCOME, CODE_SCANNING_ALERTS, DEPENDABOT_ALERTS, DEPENDABOT_PRS, FAILING_PRS, GH_TOKEN, MAIN_CI_BROKEN, MAIN_CI_RUN_URL (+11 more)

### Community 93 - "check-graphify-freshness.mjs"
Cohesion: 0.23
Nodes (10): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), ALLOWED_ROOT_CODE_FILES (+2 more)

### Community 94 - "Button/index.jsx"
Cohesion: 0.18
Nodes (15): `Button/index.jsx`, Button, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, pulse, resolveColor() (+7 more)

### Community 96 - "steps"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, permissions, contents, branches (+8 more)

### Community 98 - "ci.yml"
Cohesion: 0.13
Nodes (14): jobs, test, name, permissions, contents, branches, name, run (+6 more)

### Community 101 - "body"
Cohesion: 0.14
Nodes (13): description, label, placeholder, value, body, attributes, id, type (+5 more)

### Community 102 - "with"
Cohesion: 0.17
Nodes (12): with, base_branch, branch_prefix, claude_args, claude_code_oauth_token, fetch-depth, github_token, install (+4 more)

### Community 103 - "autonomous-maintenance.yml"
Cohesion: 0.20
Nodes (9): concurrency, cancel-in-progress, group, jobs, name, cron, True, schedule (+1 more)

### Community 104 - "useIncrementalGame"
Cohesion: 0.23
Nodes (21): Dev Mode, Security notes, Dev Mode Reference, Buy max mode, clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot() (+13 more)

### Community 106 - "MainPage reference"
Cohesion: 0.16
Nodes (25): What it does, `DiskArrayRow/index.jsx`, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Storage funding rebuilt push→pull: the manual Redeem button and autobuyer-gated auto-redeem are gone (issue #571) (+17 more)

### Community 107 - "steps"
Cohesion: 0.20
Nodes (10): maintenance, runs-on, steps, timeout-minutes, continue-on-error, id, if, name (+2 more)

### Community 108 - "engine.computeFlops.test.js"
Cohesion: 0.22
Nodes (8): buyComputeFlopsTier(), getComputeFlopsAffordableQuantity(), BITS_PER_BYTE, COMPUTE_FLOPS_BOOST_RATE_PER_UNIT_PER_SEC, COMPUTE_FLOPS_REVEAL_PP, MONEY_ID, PRESTIGE_THRESHOLD, TICK_RATE_MS

### Community 112 - "updates"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 113 - "permissions"
Cohesion: 0.33
Nodes (6): permissions, contents, id-token, issues, pull-requests, security-events

### Community 114 - "mergeDataLakes"
Cohesion: 0.47
Nodes (6): createEmptyDataLakes(), createEmptyDataLakeTier(), getLegacyPendingTransferCount(), isLegacyDataLakeTier(), mergeDataLakes(), migrateLegacyDataLakeTier()

## Knowledge Gaps
- **2 isolated node(s):** `PackageDescription`, `scripts/autonomous-maintenance-workflow.test.js`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 670 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Testing` connect `Testing` to `MainPage/index.jsx`, `DataLakePanel/index.jsx`, `tickGame`, `MainPage reference`, `Key engine functions (`src/game/engine.js`)`, `ByteFoundryPage`, `Byte Foundry`, `run-simulation.mjs`, `DiskArrayRow/index.jsx`, `tickPoolBufferFill`, `generate-pwa-icons.mjs`, `Economy model — Byte Foundry (full text)`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 246 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 246 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `scripts/autonomous-maintenance-workflow.test.js` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.053164556962025315 - nodes in this community are weakly interconnected._
- **Why does `MainPage()` connect `MainPage/index.jsx` to `ComputePage`, `Economy model`, `CLAUDE.md`, `run-simulation.mjs`, `Byte Foundry`, `Architecture`, `tickPoolBufferFill`, `ComputeFlopsPage/index.jsx`, `Economy model — Byte Foundry (full text)`, `Shared components reference`, `DataLakePanel/index.jsx`, `tickGame`, `ByteFoundryPage`, `clampNonNegative`, `PerksPage/index.jsx`, `App.jsx`, `Key engine functions (`src/game/engine.js`)`, `getEffectiveTierTickSpeedSeconds`, `Button/index.jsx`, `MainPage reference`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Are the 164 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 164 INFERRED edges - model-reasoned connections that need verification._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._