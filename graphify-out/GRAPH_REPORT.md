# Graph Report - tens  (2026-10-13)

## Corpus Check
- 126 files · ~569,842 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 31 file(s) not represented in the graph (top: .xml 10, (none) 9, .properties 2)

## Summary
- 1745 nodes · 6754 edges · 99 communities (73 shown, 26 thin omitted)
- Extraction: 68% EXTRACTED · 32% INFERRED · 0% AMBIGUOUS · INFERRED: 2149 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9ecee160`
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
- App.test.jsx
- App.jsx
- CLAUDE.md
- MilestonesPage/index.jsx
- Key engine functions (`src/game/engine.js`)
- getStoragePoolBandwidth
- DevModePage/index.jsx
- engine.js
- tickGame
- formatMemoryAmount
- run-simulation.mjs
- storage.js
- check-graphify-freshness.mjs
- bump-version.mjs
- engine.test.js
- tickDiskLevelOneCachePull
- ComputeFlopsPage/index.jsx
- contrast.js
- AGENTS.md
- Design history & rationale
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- provisionDisk
- Byte Foundry
- Shared components reference
- DataLakePanel
- tickComputeFlopsAutobuyers
- package.json
- createInitialGameState
- MainActivity.java
- [Unreleased]
- Testing
- devDependencies
- DiskArrayRow
- scripts
- ByteFoundryPage
- MainPage reference
- Economy model
- Procedure
- Automation workflows
- ref_node_fs
- backlog-issue-hygiene.sh
- Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit
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
- mergeStateForDevWrite
- sync-release-milestones.sh
- adversarialReviewMarker.js
- Dev Mode Reference
- pull_request_template.md
- jsconfig.json
- Button/index.jsx
- useIncrementalGame
- getSaveIncompatibilityReason
- publish-strategy.sh
- Tens
- Copilot Instructions
- classify-claude-failure.test.js
- Offline progress
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- getIntroProductionRate
- mergeState
- resolutions
- browserslist
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
- `Mobile build (`mobile-build.yml`)` --references--> `App()`  [INFERRED]
  docs/AUTOMATION.md → src/App.jsx
- `Changed` --references--> `DiskArrayRow()`  [INFERRED]
  CHANGELOG.md → src/components/DiskArrayRow/index.jsx
- `Read cache blocks (`DiskArrayRow`) render a proportional fill overlay, not just full/empty` --references--> `DiskArrayRow()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/components/DiskArrayRow/index.jsx
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent` --references--> `getCostEpochExponent()`  [INFERRED]
  .jules/bolt.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (99 total, 26 thin omitted)

### Community 0 - "AppNav"
Cohesion: 0.31
Nodes (9): Project, APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem (+1 more)

### Community 1 - "MainPage"
Cohesion: 0.06
Nodes (71): ButtonIcon, ButtonLabel, BuyMaxToggle(), ToggleRow, formatOfflineDuration(), getAutoPrestigeCost(), getNextBytePowerProgressFraction(), getPrestigeDoublePpUpgradeCost() (+63 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "layers.js"
Cohesion: 0.05
Nodes (64): seedDataLakeSave(), AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST, AUTO_PRESTIGE_COST_MULTIPLIER, AUTO_SCALE_UP_COST, AUTOBUYER_UNLOCK_BASE_COST, AUTOBUYER_UNLOCK_MILESTONE_START, AUTOBUYER_UNLOCK_MILESTONE_STEP (+56 more)

### Community 4 - "navAttention.js"
Cohesion: 0.07
Nodes (55): Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, vitest, getComputeFieldEffectiveCap(), getIntroKilobyteConversionCost(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoreConversionUnlocked() (+47 more)

### Community 5 - "ComputePage"
Cohesion: 0.08
Nodes (53): Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, ButtonContent(), activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost() (+45 more)

### Community 6 - "Pool-local resets"
Cohesion: 0.13
Nodes (37): Pool-local resets, actFoundry(), A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending (+29 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "App.test.jsx"
Cohesion: 0.06
Nodes (47): version, ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, BITS_PER_BYTE (+39 more)

### Community 9 - "App.jsx"
Cohesion: 0.11
Nodes (29): Theming reference, styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop (+21 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.10
Nodes (20): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+12 more)

### Community 11 - "MilestonesPage/index.jsx"
Cohesion: 0.29
Nodes (12): getFlopsAutobuyerUnlockEra(), isEraEligible(), Badge, Category, CategoryHeading, Header, List, MilestonesPage() (+4 more)

### Community 12 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.18
Nodes (35): 5. Authorization boundary, wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check, Purchase block size became a runtime-configurable, growing value — `getTierLevel` replaced by direct state tracking (+27 more)

### Community 13 - "getStoragePoolBandwidth"
Cohesion: 0.16
Nodes (32): Fixed, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool 10's buffer ceiling landed a ULP below its own largest disk's face value — 2026-09-08, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity), Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024 (+24 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.16
Nodes (22): Testing, ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow (+14 more)

### Community 15 - "engine.js"
Cohesion: 0.08
Nodes (43): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, buyComputeFlopsTier(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode (+35 more)

### Community 16 - "tickGame"
Cohesion: 0.11
Nodes (50): 2. Load the repo's invariants, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Era ascension and Eons (#407), Multiplier outcomes are floored, Pause/resume for the global automations, Prestige and the Googol freeze (+42 more)

### Community 17 - "formatMemoryAmount"
Cohesion: 0.24
Nodes (17): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), combineIntroByte(), flooredBitsLabel(), floorToDecimals() (+9 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.13
Nodes (26): actCapacityUpgrade(), actMainBuys(), actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges (+18 more)

### Community 19 - "storage.js"
Cohesion: 0.14
Nodes (32): createEmptyDataLakes(), createEmptyDataLakeTier(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), buildResetActiveSlotConfirmMessage(), buildResetByteFoundryConfirmMessage(), BUY_MAX_PREFERENCE_KEY, coerceMeta() (+24 more)

### Community 20 - "check-graphify-freshness.mjs"
Cohesion: 0.26
Nodes (9): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+1 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.16
Nodes (21): Release (`release.yml`), assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+13 more)

### Community 22 - "engine.test.js"
Cohesion: 0.04
Nodes (34): Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755), getComputeMergeDurationSeconds(), isAnyComputeMergeInFlight(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable() (+26 more)

### Community 23 - "tickDiskLevelOneCachePull"
Cohesion: 0.19
Nodes (18): `DiskArrayRow/index.jsx`, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, CLAUDE.md Economy model duplication trim — 2026-09-03, Foundry Memory always keeps the highest Disk row (issue #389), Storage funding rebuilt push→pull: the manual Redeem button and autobuyer-gated auto-redeem are gone (issue #571), `tickDiskAutoFill`: a fully-staged cache could get starved out by an unrelated smaller size, getDiskSizeForTierLevel() (+10 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.18
Nodes (22): PP Compute (Flops), Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight() (+14 more)

### Community 25 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 26 - "AGENTS.md"
Cohesion: 0.08
Nodes (23): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Byte Foundry, Changelog convention (+15 more)

### Community 27 - "Design history & rationale"
Cohesion: 0.17
Nodes (17): Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Distribution, Documentation, First ten Scale Ups standardized at three completed levels — 2026-09-13, Reset Byte Foundry convenience-auto now includes Capacity/Sacrifice — 2026-08-25, Reset Byte Foundry's convenience replay didn't cover partial Provision Disk passes — 2026-09-08, Sacrifice confirm: in-game dialog; Core warning only when unlocked (+9 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.20
Nodes (18): getEonsAwarded(), buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem (+10 more)

### Community 30 - "provisionDisk"
Cohesion: 0.22
Nodes (33): Removed, Architecture, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09, Devin Review on PR #614: a false-update bug, a stale comment, and a deliberately-unfixed legacy-save ambiguity — 2026-09-09 (+25 more)

### Community 32 - "Byte Foundry"
Cohesion: 0.18
Nodes (32): formatCapacityLabel(), `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch (+24 more)

### Community 33 - "Shared components reference"
Cohesion: 0.20
Nodes (9): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference (+1 more)

### Community 34 - "DataLakePanel"
Cohesion: 0.11
Nodes (45): Changed, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap, Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever, Data Lake capacity ladder brought under the same SI-clean sequence; pool Memory UI restyled to match the Data Stream card, Data Lake capacity Upgrade removed from the forced priority order — array completion is now the only gate, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Idle disk liquidation could destroy a disk from a still-mid-build array, not just a genuinely full lake (+37 more)

### Community 35 - "tickComputeFlopsAutobuyers"
Cohesion: 0.27
Nodes (9): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, 2024-10-24 - Replace O(N) iterative loop in tickDiskAutoFill with O(1) mathematical formulation, buyComputeFlopsTierQuantity(), getComputeFlopsAffordableAndCost() (+1 more)

### Community 36 - "package.json"
Cohesion: 0.11
Nodes (17): name, packageManager, private, type, @capacitor/android, @capacitor/cli, @capacitor/core, @capacitor/ios (+9 more)

### Community 37 - "createInitialGameState"
Cohesion: 0.18
Nodes (27): actSoftResets(), Strategy snapshots (orphan branch) — required after every run, Usage, What it does, When editing the simulation, When to re-run, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09 (+19 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (30): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+22 more)

### Community 40 - "Testing"
Cohesion: 0.09
Nodes (46): A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Compute Boost base presets: fixing a total-extra-production ordering bug (+38 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.15
Nodes (24): CacheBlock, CacheBlocksRow, CacheFillIndicator, CellLabel, DiskArrayRow(), DiskSizeRow, DiskSquare, pullPulse (+16 more)

### Community 43 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+6 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.08
Nodes (53): Provision Disk button no longer previews progress before the player has ever clicked it, Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix, The multiplier bar moved below the balance, with its percent readout below the bar itself, formatPoolBalance(), formatPoolBalanceStable(), getDataStreamBaseMultiplierPercent(), getDataStreamFillFraction(), getDataStreamMultiplierPercent() (+45 more)

### Community 45 - "MainPage reference"
Cohesion: 0.20
Nodes (18): Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, Tier autobuyer/tier-tickspeed-autobuyer milestones, MainPage reference, applyAutobuyerMilestones(), formatAsCleanBytesIfExactMultiple(), formatBytes() (+10 more)

### Community 46 - "Economy model"
Cohesion: 0.09
Nodes (36): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too (+28 more)

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

### Community 51 - "Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit"
Cohesion: 0.25
Nodes (18): A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit, applyDataLakeOverflow(), decomposeDataLakeUnits(), fillDataLakeDisks() (+10 more)

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

### Community 68 - "mergeStateForDevWrite"
Cohesion: 0.18
Nodes (15): Security, 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation (+7 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 75 - "Dev Mode Reference"
Cohesion: 0.27
Nodes (15): Dev Mode, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Save persistence, Dev Mode Reference, clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot() (+7 more)

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "Button/index.jsx"
Cohesion: 0.12
Nodes (27): Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Button, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, progressFill(), pulse (+19 more)

### Community 79 - "useIncrementalGame"
Cohesion: 0.15
Nodes (15): Buy max mode, pinMuseumEntry(), repeatPurchaseMax(), setAutobuyerEnabled(), setAutoGlobalTickspeedEnabled(), setAutoPrestigeAutobuyerEnabled(), setAutoPrestigeEnabled(), setAutoScaleUpEnabled() (+7 more)

### Community 80 - "getSaveIncompatibilityReason"
Cohesion: 0.31
Nodes (10): Changed, SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), isPlainObject(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema() (+2 more)

### Community 82 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 84 - "classify-claude-failure.test.js"
Cohesion: 0.18
Nodes (3): script, zeroWork, script

### Community 85 - "Offline progress"
Cohesion: 0.36
Nodes (11): Security notes, `OfflineProgressNotice/index.jsx`, Offline progress, applyOfflineProgress(), getOfflineEffectiveSeconds(), loadGameState(), loadLastSaveTimestamp(), saveGameState() (+3 more)

### Community 88 - "getIntroProductionRate"
Cohesion: 0.33
Nodes (7): Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Provision Disk's idle label now shows "0/N" up front; write-cache collect sped up to 5x, getDiskReadCacheFlushSeconds(), getDiskWriteCacheFlushSeconds(), getDiskWriteCacheSegmentSeconds(), getIntroProductionRate()

### Community 89 - "mergeState"
Cohesion: 0.33
Nodes (6): Added, Removed, End-to-end testing, applyPendingComputeGrants(), mergeState(), mergeTierMap()

### Community 90 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 91 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

## Knowledge Gaps
- **8 isolated node(s):** `PackageDescription`, `@capacitor/android`, `@capacitor/core`, `@capacitor/ios`, `react-is` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 365 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MainPage()` connect `MainPage` to `Byte Foundry`, `Shared components reference`, `DataLakePanel`, `ComputePage`, `createInitialGameState`, `App.jsx`, `CLAUDE.md`, `Key engine functions (`src/game/engine.js`)`, `getStoragePoolBandwidth`, `Economy model`, `MainPage reference`, `tickGame`, `formatMemoryAmount`, `run-simulation.mjs`, `Button/index.jsx`, `Offline progress`, `ComputeFlopsPage/index.jsx`, `AGENTS.md`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Are the 241 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 241 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `@capacitor/android`, `@capacitor/core` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Why does `Key engine functions (`src/game/engine.js`)` connect `Key engine functions (`src/game/engine.js`)` to `MainPage`, `navAttention.js`, `ComputePage`, `Pool-local resets`, `MilestonesPage/index.jsx`, `getStoragePoolBandwidth`, `tickGame`, `formatMemoryAmount`, `run-simulation.mjs`, `engine.test.js`, `tickDiskLevelOneCachePull`, `ComputeFlopsPage/index.jsx`, `AGENTS.md`, `Design history & rationale`, `SettingsPage/index.jsx`, `provisionDisk`, `Byte Foundry`, `DataLakePanel`, `createInitialGameState`, `Testing`, `DiskArrayRow`, `ByteFoundryPage`, `MainPage reference`, `Economy model`, `Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit`, `useIncrementalGame`, `Offline progress`, `getIntroProductionRate`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._