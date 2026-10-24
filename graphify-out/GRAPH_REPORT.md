# Graph Report - tens  (2026-10-24)

## Corpus Check
- 182 files · ~514,071 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 9, (none) 8, .properties 2)

## Summary
- 2490 nodes · 8070 edges · 125 communities (92 shown, 33 thin omitted)
- Extraction: 72% EXTRACTED · 28% INFERRED · 0% AMBIGUOUS · INFERRED: 2254 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aa4cd904`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lint-workflow-shell.mjs
- MainPage/index.jsx
- AppDelegate
- layers.js
- navAttention.js
- ComputePage/index.jsx
- engine.test.js
- Automation workflows
- Economy model
- App.jsx
- CLAUDE.md
- with
- run-simulation.mjs
- Key engine functions (`src/game/engine.js`)
- DevModePage/index.jsx
- engine.js
- getEffectiveTierTickSpeedSeconds
- steps
- with
- storage.js
- with
- bump-version.mjs
- MilestonesPage/index.jsx
- getStoragePoolBandwidth
- ComputeFlopsPage/index.jsx
- tokens.js
- MainPage reference
- formatMemoryAmount
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- Economy model — Byte Foundry (full text)
- createInitialGameState
- auto-merge-after-adversarial-approve
- DataLakePanel/index.jsx
- getTierCost
- resolutions
- env
- MainActivity.java
- [Unreleased]
- Testing
- devDependencies
- DiskArrayRow/index.jsx
- scripts
- ByteFoundryPage/index.jsx
- steps
- tickGame
- Procedure
- Automation workflows
- ref_node_fs
- backlog-issue-hygiene.sh
- steps
- package.json
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
- pr-conflict-sweep.yml
- palette.md
- steps
- sync-release-milestones.sh
- adversarialReviewMarker.js
- config.js
- env
- isDiskLadderExhaustedForActivePools
- pull_request_template.md
- jsconfig.json
- Button
- Tens
- capacitorConfig.test.js
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- steps
- isMemoryCapacityAtCap
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- browserslist
- formatCurrency
- src/index.jsx
- firebaseBackend.js
- .claude/CLAUDE.md
- check-graphify-freshness.mjs
- ci.yml
- session-start.sh
- body
- Store listing drafts
- PWA_REFERENCE.md
- dev-team/SKILL.md
- with
- configure-ios-plist.mjs
- autonomous-maintenance.yml
- steps
- resolve-pr-threads.sh
- formatOfflineDuration
- Android release (Google Play)
- getFillMultiplierPercent
- updates
- AppMenu
- iOS release (App Store)
- claude-deny-settings.sh
- pr-head-guard.sh
- permissions
- sweep-stalled-auto-prs.sh
- FUNDING.yml
- android-boot-smoke.sh
- scripts/autonomous-maintenance-workflow.test.js

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 247 edges
2. `Byte Foundry` - 165 edges
3. `ByteFoundryPage()` - 140 edges
4. `MainPage()` - 131 edges
5. `tickGame()` - 117 edges
6. `MainPage reference` - 111 edges
7. `useIncrementalGame()` - 92 edges
8. `Testing` - 87 edges
9. `DataLakePanel()` - 82 edges
10. `Economy model — Byte Foundry (full text)` - 82 edges

## Surprising Connections (you probably didn't know these)
- `A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too` --references--> `formatCapacityLabel()`  [INFERRED]
  docs/DESIGN_HISTORY.md → .claude/skills/simulate-run-times/run-simulation.mjs
- `Release (`release.yml`)` --references--> `extractVersionSection()`  [INFERRED]
  docs/AUTOMATION.md → scripts/bump-version.mjs
- ``Switch/index.js`` --references--> `BuyMaxToggle()`  [INFERRED]
  docs/COMPONENTS_REFERENCE.md → src/components/BuyMaxToggle/index.jsx
- `Changed` --references--> `DiskArrayRow()`  [INFERRED]
  CHANGELOG.md → src/components/DiskArrayRow/index.jsx
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (125 total, 33 thin omitted)

### Community 0 - "lint-workflow-shell.mjs"
Cohesion: 0.31
Nodes (9): yaml@^2.9.1, yaml, bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main() (+1 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.05
Nodes (82): Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Why the tick-progress ring was removed, Multiplier outcomes are floored, Production figure (tick-progress ring removed), Tier production tickspeed, Theming reference, ButtonContent(), ButtonIcon (+74 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "layers.js"
Cohesion: 0.03
Nodes (120): Data Lake Boosters, take two: from a spendable balance to a live transfer pipe, version, vitest, ALL_TIER_IDS, allTiersSmartSeed(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST, AUTOBUYER_BASE_INTERVAL_SECONDS (+112 more)

### Community 4 - "navAttention.js"
Cohesion: 0.10
Nodes (36): isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable(), isAutoMergeNetworksIntoGridUnlockAvailable(), isAutoMergeNodesIntoClusterUnlockAvailable() (+28 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.11
Nodes (34): canForfeitComputeBoost(), isComputeMergeStartAvailableAtBoundary(), ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostCard, BoostRow (+26 more)

### Community 6 - "engine.test.js"
Cohesion: 0.04
Nodes (24): eraseAllComputeTokens(), getAutomationIntervalSeconds(), getAutoPrestigeAttemptRate(), getBiggestComputeTierWaitingOnMerge(), isAnyComputeMergeInFlight(), AUTO_SCALE_UP_COST, eraEligibleState(), noOtherUpgradesLeft (+16 more)

### Community 7 - "Automation workflows"
Cohesion: 0.13
Nodes (15): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+7 more)

### Community 8 - "Economy model"
Cohesion: 0.11
Nodes (27): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Prestige history: why PP replaced direct production doubling (+19 more)

### Community 9 - "App.jsx"
Cohesion: 0.16
Nodes (22): styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot (+14 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.10
Nodes (20): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+12 more)

### Community 11 - "with"
Cohesion: 0.04
Nodes (48): types, concurrency, cancel-in-progress, group, CHECK_SUITE_BRANCH, CHECK_SUITE_CONCLUSION, EVENT_NAME, GH_TOKEN (+40 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.15
Nodes (22): actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit() (+14 more)

### Community 13 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.10
Nodes (59): A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Compute merge timers switched from a Core-earn ×10 chain to 8 normal-disk fills (#755), Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity) (+51 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.07
Nodes (38): AI-instruction file cost hygiene, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling, Commands, Funding (+30 more)

### Community 15 - "engine.js"
Cohesion: 0.07
Nodes (50): BIT_UNIT_SYMBOLS, clearIntroCapacityUpgradeQueue(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer (+42 more)

### Community 16 - "getEffectiveTierTickSpeedSeconds"
Cohesion: 0.29
Nodes (14): Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Multiplier overflow safety, Overclock (+6 more)

### Community 17 - "steps"
Cohesion: 0.05
Nodes (39): concurrency, cancel-in-progress, group, GH_TOKEN, RUN_CONCLUSION, RUN_HEAD_SHA, RUN_ID, RUN_NAME (+31 more)

### Community 18 - "with"
Cohesion: 0.06
Nodes (39): runs-on, steps, runs-on, steps, concurrency, cancel-in-progress, group, runs-on (+31 more)

### Community 19 - "storage.js"
Cohesion: 0.06
Nodes (97): Architecture, Dev Mode, Native apps (Capacitor — #70), Security notes, `AppMenu/index.jsx`, `AppNav/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx` (+89 more)

### Community 20 - "with"
Cohesion: 0.05
Nodes (37): types, concurrency, cancel-in-progress, group, CHECK_SUITE_BRANCH, CHECK_SUITE_CONCLUSION, GH_TOKEN, runs-on (+29 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 22 - "MilestonesPage/index.jsx"
Cohesion: 0.38
Nodes (9): isEraEligible(), Badge, Category, CategoryHeading, Header, List, MilestonesPage(), RootDiv (+1 more)

### Community 23 - "getStoragePoolBandwidth"
Cohesion: 0.15
Nodes (33): A fourth Codex round: the "absolute ceiling" clamp itself was too high, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Disk Cache: always-full reserve, whole-block Memory transfers, no pour into disks (issue #382), Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Foundry Memory always keeps the highest Disk row (issue #389), Idle disk liquidation removed entirely — stranded disks now just sit idle instead of being converted to Bits, Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending (+25 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.16
Nodes (23): Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight(), getComputeFlopsTotal() (+15 more)

### Community 25 - "tokens.js"
Cohesion: 0.13
Nodes (19): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), buildTheme() (+11 more)

### Community 26 - "MainPage reference"
Cohesion: 0.13
Nodes (23): Adding a new tier, Architecture, Byte Foundry, Path aliases (`vite.config.js`), Byte Foundry, App.jsx routing and the Foundry gate, MainPage reference, doubleIntroCapacity() (+15 more)

### Community 27 - "formatMemoryAmount"
Cohesion: 0.20
Nodes (19): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), flooredBitsLabel(), floorToDecimals() (+11 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.13
Nodes (30): getEonsAwarded(), buildClearSlotConfirmMessage(), CloudSaveSection(), DELETE_STEP_MESSAGES, errorStatus(), buildSparklinePath(), Header, LockedNote (+22 more)

### Community 30 - "Economy model — Byte Foundry (full text)"
Cohesion: 0.10
Nodes (67): Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09 (+59 more)

### Community 32 - "createInitialGameState"
Cohesion: 0.09
Nodes (45): Fixed, 2. Load the repo's invariants, End-to-end testing, actCapacityUpgrade(), actSoftResets(), seedState(), Strategy snapshots (orphan branch) — required after every run, Usage (+37 more)

### Community 33 - "auto-merge-after-adversarial-approve"
Cohesion: 0.06
Nodes (37): env, if, runs-on, steps, timeout-minutes, env, if, runs-on (+29 more)

### Community 34 - "DataLakePanel/index.jsx"
Cohesion: 0.08
Nodes (72): Changed, `ByteFoundryPage` pool layout, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Data Lake capacity-doubling cost: fixing a unit-count/real-bits conflation found while wiring up the Byte-scale display, Data Lake capacity doubling reinstated, redesigned as a level-based ladder with a hard cap, Data Lake capacity doubling removed: the cap was always a fixed physical ceiling, not a lever (+64 more)

### Community 35 - "getTierCost"
Cohesion: 0.18
Nodes (33): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Purchase block size became a runtime-configurable, growing value — `getTierLevel` replaced by direct state tracking (+25 more)

### Community 36 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 37 - "env"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (35): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+27 more)

### Community 40 - "Testing"
Cohesion: 0.11
Nodes (41): actFoundry(), A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest (+33 more)

### Community 41 - "devDependencies"
Cohesion: 0.10
Nodes (20): devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2, jsdom@^30.1.2, @testing-library/dom@^10.4.1, @testing-library/jest-dom@^7.0.1, @testing-library/user-event@^14.6.8, vite@^8.3.4 (+12 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.08
Nodes (60): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, CLAUDE.md Economy model duplication trim — 2026-09-03 (+52 more)

### Community 43 - "scripts"
Cohesion: 0.11
Nodes (18): scripts, android:aab, android:apk:release, audit, build, build:capacitor, bump-version, cap:android (+10 more)

### Community 44 - "ByteFoundryPage/index.jsx"
Cohesion: 0.07
Nodes (51): Provision Disk button no longer previews progress before the player has ever clicked it, COST_ICON, ActionsRow, BarFillBase, BarFillBonus, BarTrack, BonusText, ByteFoundryPage() (+43 more)

### Community 45 - "steps"
Cohesion: 0.08
Nodes (24): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, FAIL_MARKER, GH_TOKEN (+16 more)

### Community 46 - "tickGame"
Cohesion: 0.09
Nodes (53): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, Why "Smart" autobuyers exist, Era ascension and Eons (#407), Pause/resume for the global automations, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier, Tickspeed multiplier (+45 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.13
Nodes (14): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Mobile build (`mobile-build.yml`), Orchestration model (+6 more)

### Community 49 - "ref_node_fs"
Cohesion: 0.12
Nodes (6): workflow, workflowPath, script, zeroWork, script, script

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 51 - "steps"
Cohesion: 0.09
Nodes (22): description, inputs, install, node-version, default, description, required, name (+14 more)

### Community 52 - "package.json"
Cohesion: 0.09
Nodes (28): dependencies, @capacitor/android@^8.5.3, @capacitor-community/admob@^8.2.1, @capacitor/ios@^8.5.3, @capacitor/splash-screen@^8.0.2, firebase@^13.1.0, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0 (+20 more)

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
Cohesion: 0.07
Nodes (60): Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Tier autobuyer/tier-tickspeed-autobuyer milestones, derivePurchaseFieldsFromCounts(), seedMainGameState(), VisuallyHidden, BuyMaxToggle(), Switch, applyAutobuyerMilestones() (+52 more)

### Community 64 - "pr-conflict-sweep.yml"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_REPO, GH_TOKEN, jobs, sweep, name (+14 more)

### Community 66 - "palette.md"
Cohesion: 0.18
Nodes (10): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+2 more)

### Community 68 - "steps"
Cohesion: 0.09
Nodes (22): BEFORE_SHA, GH_TOKEN, jobs, tag-and-release, name, permissions, contents, branches (+14 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 73 - "config.js"
Cohesion: 0.15
Nodes (13): @capacitor/core@^8.5.3, @capacitor/core, ADMOB_TEST_REWARDED_IDS, getRewardedAdUnit(), IAP_PRODUCTS, PRIVACY_POLICY_URL, realRewardedIds, REMOVE_ADS_ENTITLEMENT (+5 more)

### Community 74 - "env"
Cohesion: 0.11
Nodes (19): CLAUDE_OUTCOME, CODE_SCANNING_ALERTS, DEPENDABOT_ALERTS, DEPENDABOT_PRS, FAILING_PRS, GH_TOKEN, MAIN_CI_BROKEN, MAIN_CI_RUN_URL (+11 more)

### Community 75 - "isDiskLadderExhaustedForActivePools"
Cohesion: 0.21
Nodes (13): Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Speed exponent rises with Foundry-reset Disk-size unlocks (2026-10), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), getMaxActiveDiskLadderStep(), getPoolReachableDiskLadderStep(), getPresentedDiskSize() (+5 more)

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "Button"
Cohesion: 0.12
Nodes (23): Changed, `Button/index.jsx`, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), react@^19.2.8, @testing-library/react@^16.3.3, react, @testing-library/react, Button (+15 more)

### Community 79 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 80 - "capacitorConfig.test.js"
Cohesion: 0.18
Nodes (12): ADS_PLUGIN, BASE_PLUGINS, buildIncludePlugins(), config, IAP_PLUGIN, root, srcPath, buildFeaturesModule() (+4 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 84 - "steps"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, permissions, contents, branches (+8 more)

### Community 85 - "isMemoryCapacityAtCap"
Cohesion: 0.18
Nodes (20): A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool 10's buffer ceiling landed a ULP below its own largest disk's face value — 2026-09-08, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024, Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Pool Capacity's SI-clean mechanic restored — decoupled from the Data Stream's binary value instead of shared with it (+12 more)

### Community 88 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

### Community 89 - "formatCurrency"
Cohesion: 0.22
Nodes (17): Tiers, Prestige, Era ascension, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix, Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Prestige and the Googol freeze, formatAsCleanBytesIfExactMultiple(), formatCurrency() (+9 more)

### Community 90 - "src/index.jsx"
Cohesion: 0.21
Nodes (7): rootElement, reportWebVitals(), createMonetizationService(), getMonetizationService(), createNoopMonetizationService(), NO_ENTITLEMENTS, initNativeShell()

### Community 91 - "firebaseBackend.js"
Cohesion: 0.17
Nodes (10): deleteAccountAndData(), app, auth, db, deleteAccount(), downloadSave(), requireUser(), saveDocFor() (+2 more)

### Community 93 - "check-graphify-freshness.mjs"
Cohesion: 0.23
Nodes (10): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), ALLOWED_ROOT_CODE_FILES (+2 more)

### Community 94 - "ci.yml"
Cohesion: 0.13
Nodes (14): jobs, test, name, permissions, contents, branches, name, run (+6 more)

### Community 96 - "body"
Cohesion: 0.14
Nodes (13): description, label, placeholder, value, body, attributes, id, type (+5 more)

### Community 98 - "Store listing drafts"
Cohesion: 0.15
Nodes (12): Apple — App Privacy ("nutrition label"), Content rating (Play IARC questionnaire / App Store age rating), Default build, Default build (cloud save on, ads and IAP off), Google Play — Data safety, Listing text, Store assets still needed, Store listing drafts (+4 more)

### Community 101 - "with"
Cohesion: 0.17
Nodes (12): with, base_branch, branch_prefix, claude_args, claude_code_oauth_token, fetch-depth, github_token, install (+4 more)

### Community 102 - "configure-ios-plist.mjs"
Cohesion: 0.31
Nodes (9): ADMOB_TEST_APP_ID_IOS, applyManagedAdsKeys(), buildManagedBlock(), END_MARKER, escapeXml(), SKADNETWORK_IDS, START_MARKER, plist (+1 more)

### Community 103 - "autonomous-maintenance.yml"
Cohesion: 0.20
Nodes (9): concurrency, cancel-in-progress, group, jobs, name, cron, True, schedule (+1 more)

### Community 104 - "steps"
Cohesion: 0.20
Nodes (10): maintenance, runs-on, steps, timeout-minutes, continue-on-error, id, if, name (+2 more)

### Community 106 - "formatOfflineDuration"
Cohesion: 0.33
Nodes (8): NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), formatOfflineDuration(), formatBufferTimeToFull(), formatUpgradeTimeLeft(), getBufferSecondsToFull()

### Community 107 - "Android release (Google Play)"
Cohesion: 0.25
Nodes (7): Android release (Google Play), Build the signed AAB, Edge-to-edge, splash, icon, One-time setup, Optional features (all off by default), Permission audit, Upload to a testing track

### Community 108 - "getFillMultiplierPercent"
Cohesion: 0.29
Nodes (8): getFillMultiplierPercent(), getPoolBaseMultiplierPercent(), getPoolMultiplierPercent(), getPoolTapBonusPercent(), getSpeedUpgradeCostBits(), isSpeedUpgradeArmable(), tickSpeedUpgradeDrain(), upgradePoolSpeed()

### Community 112 - "updates"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 113 - "AppMenu"
Cohesion: 0.52
Nodes (6): AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle

### Community 114 - "iOS release (App Store)"
Cohesion: 0.33
Nodes (5): App Store submission, iOS release (App Store), One-time setup, Prepare the project, TestFlight

### Community 117 - "permissions"
Cohesion: 0.33
Nodes (6): permissions, contents, id-token, issues, pull-requests, security-events

## Knowledge Gaps
- **2 isolated node(s):** `PackageDescription`, `scripts/autonomous-maintenance-workflow.test.js`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 729 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design history & rationale` connect `Economy model — Byte Foundry (full text)` to `createInitialGameState`, `MainPage/index.jsx`, `DataLakePanel/index.jsx`, `getTierCost`, `Automation workflows`, `Economy model`, `Testing`, `DiskArrayRow/index.jsx`, `isDiskLadderExhaustedForActivePools`, `Key engine functions (`src/game/engine.js`)`, `tickGame`, `Tens`, `isMemoryCapacityAtCap`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 246 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 246 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `scripts/autonomous-maintenance-workflow.test.js` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.048153214774281805 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `layers.js` to `configure-ios-plist.mjs`, `engine.test.js`, `devDependencies`, `config.js`, `capacitorConfig.test.js`, `storage.js`, `package.json`, `src/index.jsx`, `SettingsPage/index.jsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Are the 164 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 164 INFERRED edges - model-reasoned connections that need verification._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._