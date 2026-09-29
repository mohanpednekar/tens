# Graph Report - tens  (2026-09-29)

## Corpus Check
- 128 files · ~488,075 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 5, .ico 1)

## Summary
- 1741 nodes · 6593 edges · 89 communities (74 shown, 15 thin omitted)
- Extraction: 68% EXTRACTED · 32% INFERRED · 0% AMBIGUOUS · INFERRED: 2114 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9cc240a5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- InfoPage
- MainPage
- check-graphify-freshness.mjs
- layers.js
- navAttention.js
- Constants (`src/game/layers.js`)
- Key engine functions (`src/game/engine.js`)
- run-simulation.mjs
- mergeDataLakes
- Offline progress
- Tens
- getTierCost
- Economy model
- formatMemoryAmount
- DevModePage/index.jsx
- engine.js
- tickGame
- ref_child_process
- isMemoryCapacityAtCap
- useIncrementalGame
- What You Must Do When Invoked
- bump-version.mjs
- engine.test.js
- Automation workflows
- ComputeFlopsPage/index.jsx
- Theming reference
- AGENTS.md
- Byte Foundry
- SettingsPage/index.jsx
- Button/index.jsx
- provisionDisk
- CLAUDE.md
- mergeState
- Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes
- DataLakePanel
- getPrestigePointsAwarded
- package.json
- createInitialGameState
- applyDevGameStateJson
- [Unreleased]
- isStorageUnlocked
- devDependencies
- DiskArrayRow
- scripts
- ByteFoundryPage
- MainPage reference
- Procedure
- Automation workflows
- capacitorConfig.test.js
- backlog-issue-hygiene.sh
- graphify reference: extra exports and benchmark
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- getSaveIncompatibilityReason
- generate-pwa-icons.mjs
- getEffectiveTierTickSpeedSeconds
- MilestonesPage/index.jsx
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- App.jsx
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
- styled-components
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
- storage.js
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 236 edges
2. `Byte Foundry` - 158 edges
3. `MainPage()` - 145 edges
4. `ByteFoundryPage()` - 118 edges
5. `tickGame()` - 103 edges
6. `MainPage reference` - 99 edges
7. `Testing` - 85 edges
8. `Pool-local resets` - 80 edges
9. `useIncrementalGame()` - 77 edges
10. `clampNonNegative()` - 76 edges

## Surprising Connections (you probably didn't know these)
- `Changed` --references--> `DiskArrayRow()`  [INFERRED]
  CHANGELOG.md → src/components/DiskArrayRow/index.jsx
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent` --references--> `getCostEpochExponent()`  [INFERRED]
  .jules/bolt.md → src/game/engine.js
- `Why `getTierCost` uses a multiplier form, not a literal power` --references--> `getTierCost()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js
- `XP status` --references--> `checkMilestones()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (89 total, 15 thin omitted)

### Community 0 - "InfoPage"
Cohesion: 0.13
Nodes (18): Adding a new tier, Architecture, Path aliases (`vite.config.js`), Project, APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar (+10 more)

### Community 1 - "MainPage"
Cohesion: 0.06
Nodes (68): Multiplier outcomes are floored, Tier autobuyer/tier-tickspeed-autobuyer milestones, getAutoPrestigeAttemptRate(), getAutoPrestigeCost(), getNextBytePowerProgressFraction(), getPrestigeDoublePpUpgradeCost(), getPrestigeProductionMultiplier(), getSmartAutobuyerCost() (+60 more)

### Community 2 - "check-graphify-freshness.mjs"
Cohesion: 0.15
Nodes (15): ref_node_child_process, ref_node_fs, ref_node_module, ref_node_path, ref_node_url, analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames() (+7 more)

### Community 3 - "layers.js"
Cohesion: 0.04
Nodes (106): version, ALL_TIER_IDS, derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST (+98 more)

### Community 4 - "navAttention.js"
Cohesion: 0.06
Nodes (62): Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Sacrifice confirm: in-game dialog; Core warning only when unlocked, vitest, enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable() (+54 more)

### Community 5 - "Constants (`src/game/layers.js`)"
Cohesion: 0.08
Nodes (60): Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755), Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Constants (`src/game/layers.js`), activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost() (+52 more)

### Community 6 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.19
Nodes (35): Pool-local resets, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Provision Disk moved back inside its pool card; pool Capacity switched from SI-clean to a plain decade-of-10 ladder, Provision Disk's post-funding build timer duplicated the wait already spent funding it, Storage's own reveal threshold lowered to pool 1's own capacity gate; Data Lake panel redesigned; Dev Mode's raw state-updater gap closed, The read-cache pre-fill design was never reconciled with the later decade-of-10 Capacity ladder, starving a freshly-unlocked pool's buffer (+27 more)

### Community 7 - "run-simulation.mjs"
Cohesion: 0.16
Nodes (17): actCapacityUpgrade(), actMainBuys(), actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges (+9 more)

### Community 8 - "mergeDataLakes"
Cohesion: 0.47
Nodes (6): createEmptyDataLakes(), createEmptyDataLakeTier(), getLegacyPendingTransferCount(), isLegacyDataLakeTier(), mergeDataLakes(), migrateLegacyDataLakeTier()

### Community 9 - "Offline progress"
Cohesion: 0.21
Nodes (13): `AppMenu/index.jsx`, `AppNav/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, `OfflineProgressNotice/index.jsx`, Shared components reference, `StatCard/index.js` (+5 more)

### Community 10 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 11 - "getTierCost"
Cohesion: 0.18
Nodes (30): 5. Authorization boundary, wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check (+22 more)

### Community 12 - "Economy model"
Cohesion: 0.12
Nodes (26): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Economy model, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Prestige history: why PP replaced direct production doubling, Reset button history (+18 more)

### Community 13 - "formatMemoryAmount"
Cohesion: 0.26
Nodes (16): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, combineIntroByte(), flooredBitsLabel(), floorToDecimals() (+8 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.22
Nodes (16): ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow, Header (+8 more)

### Community 15 - "engine.js"
Cohesion: 0.07
Nodes (48): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer (+40 more)

### Community 16 - "tickGame"
Cohesion: 0.10
Nodes (50): `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Why "Smart" autobuyers exist, Era ascension and Eons (#407), Multiplier overflow safety, Pause/resume for the global automations, Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier (+42 more)

### Community 17 - "ref_child_process"
Cohesion: 0.15
Nodes (7): { execSync }, { execSync }, { execSync }, ref_child_process, { execSync }, { execSync }, { execSync }

### Community 18 - "isMemoryCapacityAtCap"
Cohesion: 0.26
Nodes (15): A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024, Pool Capacity's SI-clean mechanic restored — decoupled from the Data Stream's binary value instead of shared with it, Sacrifice for 10x Capacity gated behind every other currently-possible action, eraseAllComputeTokens() (+7 more)

### Community 19 - "useIncrementalGame"
Cohesion: 0.31
Nodes (18): Dev Mode, Security notes, clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot(), discardIncompatibleActiveSaveIfNeeded(), getActiveSlotId() (+10 more)

### Community 20 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.16
Nodes (22): Release (`release.yml`), ref_node_os, assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY (+14 more)

### Community 22 - "engine.test.js"
Cohesion: 0.05
Nodes (20): getBiggestComputeTierWaitingOnMerge(), getTickspeedMultiplierBaseCost(), isAnyComputeMergeInFlight(), eraEligibleState(), noOtherUpgradesLeft, unlockedLastTierState(), withIntro(), withOwned() (+12 more)

### Community 23 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.18
Nodes (20): Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight(), getComputeFlopsTotal() (+12 more)

### Community 25 - "Theming reference"
Cohesion: 0.11
Nodes (21): Theming reference, AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear() (+13 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.10
Nodes (18): AI-instruction file cost hygiene, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling, Commands, Funding (+10 more)

### Community 27 - "Byte Foundry"
Cohesion: 0.11
Nodes (40): A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug, Data Lake refill gating: staged 9 → 99 → 999 capacity from disk-array completion, Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382), Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates (+32 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.20
Nodes (18): getEonsAwarded(), buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem (+10 more)

### Community 29 - "Button/index.jsx"
Cohesion: 0.22
Nodes (12): `Button/index.jsx`, ButtonContent(), ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB (+4 more)

### Community 30 - "provisionDisk"
Cohesion: 0.14
Nodes (44): Removed, Architecture, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+36 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.10
Nodes (19): AI-instruction file cost hygiene, Automation workflows, Capacitor foundation (in progress — #70), Changelog convention, Commands, Documentation, Economy model, Funding (+11 more)

### Community 32 - "mergeState"
Cohesion: 0.16
Nodes (15): End-to-end testing, Testing, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Removing Claim Core: superseded by Data Lake Boosters, Save persistence, Three more findings from a Devin bot review pass on the pool-overflow Data Lake rework PR: an overflow rate that asymptotically never completes, a lifetime-counter bug, and dropped legacy transfers, latchComputeMergePageIfNeeded(), applyPendingComputeGrants() (+7 more)

### Community 33 - "Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes"
Cohesion: 0.29
Nodes (13): A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Foundry Memory always keeps the highest Disk row (issue #389), Pool cards gated on a capacity threshold too; read cache pre-fills on pool unlock; manual transfer-block UI removed, Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes, `tickDiskAutoFill`: a fully-staged cache could get starved out by an unrelated smaller size, getDiskSizesToShow(), getMaxActiveDiskLadderStep(), getRelevantDiskSizesForFoundry() (+5 more)

### Community 34 - "DataLakePanel"
Cohesion: 0.07
Nodes (90): Changed, actFoundry(), formatCapacityLabel(), `ByteFoundryPage` pool layout, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too (+82 more)

### Community 35 - "getPrestigePointsAwarded"
Cohesion: 0.43
Nodes (8): Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, getMoneyExponent(), getPrestigeDoublePpHalvingLevels(), getPrestigePointsAwarded(), getPrestigePowersPerPp(), getPrestigePpEarnProgressPercent(), getPrestigePpPerPower(), getPrestigeProgressPercent()

### Community 36 - "package.json"
Cohesion: 0.10
Nodes (18): browserslist, development, production, name, packageManager, private, type, @capacitor/cli (+10 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.13
Nodes (35): Fixed, 2. Load the repo's invariants, actSoftResets(), Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run (+27 more)

### Community 38 - "applyDevGameStateJson"
Cohesion: 0.23
Nodes (13): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2026-08-25 - Defense in Depth: Content Security Policy, 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs. (+5 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (32): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+24 more)

### Community 40 - "isStorageUnlocked"
Cohesion: 0.60
Nodes (5): Byte Foundry, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, buildEraIntroReset(), isStorageUnlocked(), latchMainGameUnlocked()

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.07
Nodes (60): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, CLAUDE.md Economy model duplication trim — 2026-09-03 (+52 more)

### Community 43 - "scripts"
Cohesion: 0.17
Nodes (12): scripts, audit, build, build:capacitor, bump-version, cap:sync, dev, gen-pwa-icons (+4 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.08
Nodes (53): Provision Disk button no longer previews progress before the player has ever clicked it, The multiplier bar moved below the balance, with its percent readout below the bar itself, formatDiskSizeInPoolUnit(), formatPoolBalance(), formatPoolBalanceStable(), getDataStreamBaseMultiplierPercent(), getDataStreamMultiplierPercent(), getDiskRedeemTierName() (+45 more)

### Community 46 - "MainPage reference"
Cohesion: 0.14
Nodes (23): Fixed, seedState(), Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, MainPage reference, applyAutobuyerMilestones(), formatAsCleanBytesIfExactMultiple() (+15 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.15
Nodes (12): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Orchestration model, PR conflict sweep (`pr-conflict-sweep.yml`) (+4 more)

### Community 49 - "capacitorConfig.test.js"
Cohesion: 0.24
Nodes (6): vite, vite-plugin-pwa, @vitejs/plugin-react, root, srcPath, createViteConfig()

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
Cohesion: 0.36
Nodes (7): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.22
Nodes (7): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), targets

### Community 57 - "getEffectiveTierTickSpeedSeconds"
Cohesion: 0.19
Nodes (17): Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Reintroducing the 1s-10s tickspeed ladder, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Why the tick-progress ring was removed (+9 more)

### Community 58 - "MilestonesPage/index.jsx"
Cohesion: 0.29
Nodes (12): getFlopsAutobuyerUnlockEra(), isEraEligible(), Badge, Category, CategoryHeading, Header, List, MilestonesPage() (+4 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 63 - "App.jsx"
Cohesion: 0.12
Nodes (24): react, react-dom, web-vitals, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu() (+16 more)

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

### Community 78 - "styled-components"
Cohesion: 0.15
Nodes (22): Changed, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), styled-components, Button, VisuallyHidden, Actions, Body, Card (+14 more)

### Community 89 - "ref_fs"
Cohesion: 0.08
Nodes (14): content, content, content, content, content, content, content, mdContent (+6 more)

### Community 106 - "storage.js"
Cohesion: 0.21
Nodes (22): buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), coerceMeta(), completeDummySupporterPurchase(), defaultSlotName(), FREE_SLOT_COUNT, grantSupporterUnlock(), hasStoredStateForSlot() (+14 more)

## Knowledge Gaps
- **329 isolated node(s):** `session-start.sh script`, `publish-strategy.sh script`, `DEFAULT_CAPACITY_CAPS_BITS`, `defaultPPValues`, `defaultCareerPrestiges` (+324 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 406 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MainPage()` connect `MainPage` to `InfoPage`, `layers.js`, `Key engine functions (`src/game/engine.js`)`, `run-simulation.mjs`, `Offline progress`, `getTierCost`, `Economy model`, `formatMemoryAmount`, `tickGame`, `ComputeFlopsPage/index.jsx`, `Theming reference`, `Byte Foundry`, `Button/index.jsx`, `DataLakePanel`, `getPrestigePointsAwarded`, `createInitialGameState`, `isStorageUnlocked`, `MainPage reference`, `getEffectiveTierTickSpeedSeconds`, `App.jsx`, `styled-components`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `Key engine functions (`src/game/engine.js`)` connect `Key engine functions (`src/game/engine.js`)` to `MainPage`, `layers.js`, `navAttention.js`, `Constants (`src/game/layers.js`)`, `run-simulation.mjs`, `Offline progress`, `getTierCost`, `Economy model`, `formatMemoryAmount`, `engine.js`, `tickGame`, `isMemoryCapacityAtCap`, `useIncrementalGame`, `engine.test.js`, `ComputeFlopsPage/index.jsx`, `Byte Foundry`, `SettingsPage/index.jsx`, `provisionDisk`, `Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes`, `DataLakePanel`, `getPrestigePointsAwarded`, `createInitialGameState`, `isStorageUnlocked`, `DiskArrayRow`, `ByteFoundryPage`, `MainPage reference`, `getEffectiveTierTickSpeedSeconds`, `MilestonesPage/index.jsx`, `styled-components`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `tickGame()` connect `tickGame` to `MainPage`, `layers.js`, `Constants (`src/game/layers.js`)`, `Key engine functions (`src/game/engine.js`)`, `run-simulation.mjs`, `Offline progress`, `getTierCost`, `Economy model`, `engine.js`, `useIncrementalGame`, `engine.test.js`, `Byte Foundry`, `provisionDisk`, `Pool liveness decoupled from disk-build progress; Data Lakes fill manually before their pool completes`, `DataLakePanel`, `createInitialGameState`, `isStorageUnlocked`, `DiskArrayRow`, `MainPage reference`, `getEffectiveTierTickSpeedSeconds`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Are the 235 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 235 INFERRED edges - model-reasoned connections that need verification._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Are the 36 inferred relationships involving `MainPage()` (e.g. with `Byte Foundry` and `Fixed`) actually correct?**
  _`MainPage()` has 36 INFERRED edges - model-reasoned connections that need verification._
- **Are the 52 inferred relationships involving `ByteFoundryPage()` (e.g. with `Architecture` and `Byte Foundry`) actually correct?**
  _`ByteFoundryPage()` has 52 INFERRED edges - model-reasoned connections that need verification._