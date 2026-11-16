# Graph Report - tens  (2026-11-16)

## Corpus Check
- 225 files · ~574,179 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 9, (none) 8, .properties 2)

## Summary
- 3194 nodes · 9901 edges · 161 communities (120 shown, 41 thin omitted)
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 2182 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bfe08df4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lint-workflow-shell.mjs
- MainPage/index.jsx
- AppDelegate
- engine.js
- navAttention.js
- ComputePage/index.jsx
- engine.test.js
- Automation workflows
- tickGame
- App.jsx
- CLAUDE.md
- with
- createInitialGameState
- Key engine functions (`src/game/engine.js`)
- DevModePage/index.jsx
- engine.js
- getEffectiveTierTickSpeedSeconds
- App.test.jsx
- dailyChallenges.js
- storage.js
- with
- bump-version.mjs
- MilestonesPage/index.jsx
- getStoragePoolBandwidth
- ComputeFlopsPage/index.jsx
- tokens.js
- AGENTS.md
- MainPage reference
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- Economy model — Byte Foundry (full text)
- createInitialGameState
- Shared components reference
- DataLakePanel
- getTierCost
- resolutions
- simulate-run-times/SKILL.md
- MainActivity.java
- [Unreleased]
- getStoragePoolBandwidth
- devDependencies
- DiskArrayRow/index.jsx
- scripts
- ByteFoundryPage
- steps
- clampNonNegative
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
- with
- sync-release-milestones.sh
- adversarialReviewMarker.js
- config.js
- steps
- Byte Foundry
- pull_request_template.md
- jsconfig.json
- styled-components
- env
- capacitorConfig.test.js
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- Economy model
- Testing
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- browserslist
- formatCurrency
- src/index.jsx
- steps
- .claude/CLAUDE.md
- check-graphify-freshness.mjs
- simulate-challenges.mjs
- session-start.sh
- slot
- Store listing drafts
- Native apps (Capacitor — #70)
- dev-team/SKILL.md
- with
- isProductionFrozen
- autonomous-maintenance.yml
- OfflineProgressNotice/index.jsx
- resolve-pr-threads.sh
- steps
- Design history & rationale
- getFillMultiplierPercent
- updates
- AppMenu
- AchievementsPage/index.jsx
- claude-deny-settings.sh
- pr-head-guard.sh
- Architecture / MainPage UI decisions
- dependencies
- capacitorConfig.test.js
- Dev Mode Reference
- stryker.config.json
- engine.challengesTier.test.js
- config.js
- ref_node_fs
- firebaseBackend.js
- Store listing drafts
- isComputeMergeReserveStartAvailable
- Android release (Google Play)
- admobAdapter.js
- verify-maintainer-checklist.mjs
- ChallengesPage/index.jsx
- contrast.js
- getDiskSizesToShow
- simulate-daily-challenges.mjs
- Android release (Google Play)
- env
- on
- Tens
- lint-conflict-markers.mjs
- Foundry multiplier bar: one diverging bar tried and dropped (2026-10)
- steps
- mergeDataLakes
- iOS release (App Store)
- autonomous-pr-followup.yml
- README.md
- model
- permissions
- followup
- PWA support reference
- Distribution
- Documentation
- android-boot-smoke.sh
- file:scripts/lint-conflict-markers.mjs
- file:scripts/lint-conflict-markers.test.js
- file:src/game/storagePrefix.js
- file:src/game/storagePrefix.test.js
- file:src/pages/SettingsPage/ManualSaveSection.jsx

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 258 edges
2. `Byte Foundry` - 178 edges
3. `MainPage()` - 119 edges
4. `useIncrementalGame()` - 109 edges
5. `ByteFoundryPage()` - 109 edges
6. `MainPage reference` - 105 edges
7. `Testing` - 87 edges
8. `Economy model — Byte Foundry (full text)` - 86 edges
9. `createInitialGameState()` - 80 edges
10. `clampNonNegative()` - 79 edges

## Surprising Connections (you probably didn't know these)
- `A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too` --references--> `formatCapacityLabel()`  [INFERRED]
  docs/DESIGN_HISTORY.md → .claude/skills/simulate-run-times/run-simulation.mjs
- `Release (`release.yml`)` --references--> `extractVersionSection()`  [INFERRED]
  docs/AUTOMATION.md → scripts/bump-version.mjs
- `Automation workflows` --references--> `gh()`  [INFERRED]
  CLAUDE.md → scripts/verify-maintainer-checklist.mjs
- `Scheduled maintenance (`autonomous-maintenance.yml`)` --references--> `gh()`  [INFERRED]
  docs/AUTOMATION.md → scripts/verify-maintainer-checklist.mjs
- `Storage auto-redeem toggle button removed for now, default flipped to always-on` --references--> `createInitialGameState()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (161 total, 41 thin omitted)

### Community 0 - "lint-workflow-shell.mjs"
Cohesion: 0.40
Nodes (7): bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main(), sanitizeExpressions()

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.06
Nodes (73): Bits subline under MoneyHero; `+n/8` dropped from tier Buy buttons — 2026-11-09, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, progressFill(), formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency() (+65 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "engine.js"
Cohesion: 0.04
Nodes (108): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, CHALLENGE_BOUNDARIES, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, decrementFullDiskCount(), FILL_CURVE_LN_A, FILL_CURVE_LN_B (+100 more)

### Community 4 - "navAttention.js"
Cohesion: 0.08
Nodes (42): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, enableAutoMerge(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable(), isAutoMergeGridsIntoFabricUnlockAvailable() (+34 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.05
Nodes (89): Boosters: timer bar with Pop / Forfeit / Stack; preset switch refunds unused stacks (2026-10), Compute Boost lanes (parallel multipliers + same-multiplier queue), Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Architecture 4b — `ComputePage/index.jsx`, AutoBoostPresetPicker(), PresetButton (+81 more)

### Community 6 - "engine.test.js"
Cohesion: 0.05
Nodes (13): Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, getDataLakeCurrentDiskFillFraction, eraEligibleState(), noOtherUpgradesLeft, PROV_FIRST, provBase(), unlockedLastTierState(), withIntro() (+5 more)

### Community 7 - "Automation workflows"
Cohesion: 0.12
Nodes (16): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Main CI heal checkout is default-branch tip, not `workflow_run.head_sha` — 2026-11-11, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit (+8 more)

### Community 8 - "tickGame"
Cohesion: 0.09
Nodes (35): Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock no longer banks completed levels — 2026-11-11, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Reintroducing the 1s-10s tickspeed ladder, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14 (+27 more)

### Community 9 - "App.jsx"
Cohesion: 0.13
Nodes (25): Prestige info is hidden until first prestige, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot (+17 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.09
Nodes (22): Achievements (epic #1046, basic slice), AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding (+14 more)

### Community 11 - "with"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, fetch-depth, github_token, node-version (+5 more)

### Community 12 - "createInitialGameState"
Cohesion: 0.08
Nodes (39): actPlayer(), actSoftResets(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPurges, defaultPPValues (+31 more)

### Community 13 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.08
Nodes (60): Byte Foundry, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Tap bonuses moved from buffer fills to their consumers (2026-11), Byte Foundry (+52 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.10
Nodes (43): Switch, ButtonGrid, describeNumber(), Details, DevModePage(), FieldControls, FieldLabel, FieldNode() (+35 more)

### Community 15 - "engine.js"
Cohesion: 0.06
Nodes (56): Architecture, `OfflineProgressNotice/index.jsx`, Buy max mode, Offline progress, addActivePlaySeconds(), applyOfflineProgress(), applyOfflineRewardBonus(), enableAutoMergeCloudsIntoDatacenter (+48 more)

### Community 16 - "getEffectiveTierTickSpeedSeconds"
Cohesion: 0.05
Nodes (39): concurrency, cancel-in-progress, group, GH_TOKEN, RUN_CONCLUSION, RUN_HEAD_SHA, RUN_ID, RUN_NAME (+31 more)

### Community 17 - "App.test.jsx"
Cohesion: 0.05
Nodes (52): version, ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), withExpediteDisks(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTOBUYER_UNLOCK_MILESTONE_STEP (+44 more)

### Community 18 - "dailyChallenges.js"
Cohesion: 0.08
Nodes (63): Daily challenges (epic #1062), Daily challenges (epic #1062), vitest, applyRunAction(), botAct(), buildDailyCandidate(), buyDailyClockSpeed(), buyDailyTier() (+55 more)

### Community 19 - "storage.js"
Cohesion: 0.15
Nodes (29): PURGE_UNBOUNDED_MIN_COUNT, applyPendingComputeGrants(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), buildResetActiveSlotConfirmMessage(), buildResetByteFoundryConfirmMessage(), BUY_MAX_PREFERENCE_KEY, coerceMeta() (+21 more)

### Community 20 - "with"
Cohesion: 0.05
Nodes (41): concurrency, cancel-in-progress, group, CI_RUN_BRANCH, CI_RUN_CONCLUSION, GH_TOKEN, if, runs-on (+33 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 22 - "MilestonesPage/index.jsx"
Cohesion: 0.35
Nodes (10): isEraEligible(), Badge, Category, CategoryHeading, Header, List, MilestonesPage(), RootDiv (+2 more)

### Community 23 - "getStoragePoolBandwidth"
Cohesion: 0.06
Nodes (37): env, if, runs-on, steps, timeout-minutes, env, if, runs-on (+29 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.19
Nodes (18): Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), isComputeFlopsPageRevealed(), hasAffordableComputeFlopsTier(), BuyButton (+10 more)

### Community 25 - "tokens.js"
Cohesion: 0.10
Nodes (23): Theming reference, @testing-library/react, renderDiskArrayRow(), renderButton(), renderWithTheme(), wrap(), wrap(), renderInTheme() (+15 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.09
Nodes (20): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+12 more)

### Community 27 - "MainPage reference"
Cohesion: 0.19
Nodes (22): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix, MainPage reference (+14 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.12
Nodes (39): `Button/index.jsx`, Button, ButtonContent(), clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, pulse (+31 more)

### Community 30 - "Economy model — Byte Foundry (full text)"
Cohesion: 0.15
Nodes (48): Removed, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09, Devin Review on PR #614: a false-update bug, a stale comment, and a deliberately-unfixed legacy-save ambiguity — 2026-09-09, Foundry-reset rebuild moved off the fill multiplier (2026-10) (+40 more)

### Community 32 - "createInitialGameState"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 33 - "Shared components reference"
Cohesion: 0.10
Nodes (26): Changed, Testing, `AppMenu/index.jsx`, `AppNav/index.jsx`, `BoostBadge/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx` (+18 more)

### Community 34 - "DataLakePanel"
Cohesion: 0.06
Nodes (100): Changed, Pool-local flushes, `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17 (+92 more)

### Community 35 - "getTierCost"
Cohesion: 0.12
Nodes (46): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Factory tier cost series: shared linear increments → per-tier constant increments — 2026-11-16 (#1098), Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price (+38 more)

### Community 36 - "resolutions"
Cohesion: 0.29
Nodes (7): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/@grpc/grpc-js, **/nanoid, **/uuid

### Community 37 - "simulate-run-times/SKILL.md"
Cohesion: 0.40
Nodes (4): Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run

### Community 39 - "[Unreleased]"
Cohesion: 0.05
Nodes (38): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+30 more)

### Community 40 - "getStoragePoolBandwidth"
Cohesion: 0.11
Nodes (43): Fixed, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool 10's buffer ceiling landed a ULP below its own largest disk's face value — 2026-09-08, Pool Bandwidth's formula corrected — follows the raw Speed doublings via the SI transform, not sqrt(Capacity), Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps, Pool Capacity end bounds corrected to SI powers of 1000, not binary powers of 1024 (+35 more)

### Community 41 - "devDependencies"
Cohesion: 0.07
Nodes (36): browserslist, development, production, devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2, jsdom@^31.0.0, sharp@^0.35.5 (+28 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.08
Nodes (60): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk arrays and Data Lakes moved from 10 disks per size to 9 + cache/buffer as the 10th unit, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping (+52 more)

### Community 43 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, android:aab, android:apk:release, audit, build, build:capacitor, build:dev, bump-version (+11 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.05
Nodes (86): Fill multiplier 10× → 0.1× (log-linear) and a multiplicative tap bonus — 2026-10-30, formatDiskSizeInPoolUnit(), formatPoolBalance(), formatPoolBalanceStable(), formatSpeedText(), formatThreeSignificant(), getComputeBoostPoolMultiplier(), getDataStreamBaseMultiplierPercent() (+78 more)

### Community 45 - "steps"
Cohesion: 0.06
Nodes (39): runs-on, steps, runs-on, steps, concurrency, cancel-in-progress, group, runs-on (+31 more)

### Community 46 - "clampNonNegative"
Cohesion: 0.13
Nodes (32): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Reboot and Kernels (#407), Tier autobuyer/tier-tickspeed-autobuyer milestones, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, applyFlopsAutobuyerMilestones(), buyComputeFlopsTier(), buyComputeFlopsTierQuantity(), buyHyperscaler() (+24 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, CodeQL (`codeql.yml`), Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Main CI heal (`main-ci-heal.yml`, #37) (+10 more)

### Community 49 - "ref_node_fs"
Cohesion: 0.13
Nodes (6): workflow, workflowPath, script, zeroWork, script, script

### Community 50 - "backlog-issue-hygiene.sh"
Cohesion: 0.49
Nodes (9): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), remove_label_if_present(), run(), set_milestone_if_missing() (+1 more)

### Community 51 - "steps"
Cohesion: 0.08
Nodes (24): runs-on, steps, timeout-minutes, concurrency, cancel-in-progress, group, FAIL_MARKER, GH_TOKEN (+16 more)

### Community 52 - "package.json"
Cohesion: 0.09
Nodes (22): description, inputs, install, node-version, default, description, required, name (+14 more)

### Community 53 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 54 - "file-task-issue/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.23
Nodes (10): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), overwrite(), pngSize(), renderSplash() (+2 more)

### Community 60 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 62 - "@playwright/test"
Cohesion: 0.20
Nodes (3): seededState, @playwright/test@^1.64.1, @playwright/test

### Community 63 - "PerksPage/index.jsx"
Cohesion: 0.06
Nodes (77): Perks regrouped by feature: Unlocks / Upgrades / Toggles → Automation / Prestige — 2026-11-03, Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, ButtonIcon, ButtonLabel, VisuallyHidden, BuyMaxToggle(), getChallengeTitle(), getChallengeUnlockCondition() (+69 more)

### Community 64 - "pr-conflict-sweep.yml"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_REPO, GH_TOKEN, jobs, sweep, name (+14 more)

### Community 66 - "palette.md"
Cohesion: 0.14
Nodes (13): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+5 more)

### Community 68 - "with"
Cohesion: 0.05
Nodes (42): concurrency, cancel-in-progress, group, if, runs-on, steps, timeout-minutes, GH_TOKEN (+34 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 73 - "config.js"
Cohesion: 0.09
Nodes (22): BEFORE_SHA, GH_TOKEN, jobs, tag-and-release, name, on, push, permissions (+14 more)

### Community 74 - "steps"
Cohesion: 0.06
Nodes (31): name, permissions, runs-on, steps, strategy, jobs, analyze, include (+23 more)

### Community 75 - "Byte Foundry"
Cohesion: 0.19
Nodes (23): Byte Foundry, What it does, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Pool cards gated on a capacity threshold too; read cache pre-fills on pool unlock; manual transfer-block UI removed, Speed exponent rises with Foundry-reset Disk-size unlocks (2026-10), Storage funding rebuilt push→pull: the manual Redeem button and autobuyer-gated auto-redeem are gone (issue #571) (+15 more)

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "styled-components"
Cohesion: 0.16
Nodes (24): react, styled-components, Banner, ChallengeBanner(), Rule, Text, Title, ChallengeExitButton() (+16 more)

### Community 79 - "env"
Cohesion: 0.08
Nodes (26): CEILING_FULL, CLAUDE_OUTCOME, CODE_SCANNING_ALERTS, DEPENDABOT_ALERTS, DEPENDABOT_PRS, FAILING_PRS, GH_TOKEN, INPUT_MODEL (+18 more)

### Community 80 - "capacitorConfig.test.js"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, on, push, permissions (+8 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 84 - "Economy model"
Cohesion: 0.08
Nodes (39): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Prestige history: why PP replaced direct production doubling, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, Reset button history, `scaleUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry (+31 more)

### Community 85 - "Testing"
Cohesion: 0.07
Nodes (57): actCapacityUpgrade(), actFoundry(), A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main` (+49 more)

### Community 88 - "browserslist"
Cohesion: 0.13
Nodes (14): jobs, test, name, on, pull_request, push, permissions, contents (+6 more)

### Community 89 - "formatCurrency"
Cohesion: 0.14
Nodes (13): description, label, placeholder, value, body, attributes, id, type (+5 more)

### Community 90 - "src/index.jsx"
Cohesion: 0.17
Nodes (12): with, base_branch, branch_prefix, claude_args, claude_code_oauth_token, fetch-depth, github_token, install (+4 more)

### Community 91 - "steps"
Cohesion: 0.06
Nodes (31): concurrency, cancel-in-progress, group, MUTATE_OVERRIDE, mutate, jobs, mutation, default (+23 more)

### Community 93 - "check-graphify-freshness.mjs"
Cohesion: 0.21
Nodes (12): ALLOWED_TOP_LEVEL_KEYS, analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findMalformedGraphEntries(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef() (+4 more)

### Community 94 - "simulate-challenges.mjs"
Cohesion: 0.11
Nodes (26): E, actCapacityUpgrade(), actFoundry(), actMainBuys(), actPlayer(), actPlayerBitRot(), actSoftResets(), actSpeedBonus() (+18 more)

### Community 96 - "slot"
Cohesion: 0.20
Nodes (10): slot, on, schedule, workflow_dispatch, cron, default, description, options (+2 more)

### Community 98 - "Store listing drafts"
Cohesion: 0.18
Nodes (11): jobs, maintenance, runs-on, steps, timeout-minutes, continue-on-error, id, if (+3 more)

### Community 99 - "Native apps (Capacitor — #70)"
Cohesion: 0.50
Nodes (3): Native apps (Capacitor — #70), Native apps (Capacitor) reference, serializeSaveForExport()

### Community 101 - "with"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 102 - "isProductionFrozen"
Cohesion: 0.12
Nodes (46): Security notes, 2. Load the repo's invariants, Tiers, Prestige, Reboot (Era ascension), Purge code rename: reboot → purge (2026-11, #987), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Achievements (epic #1046, basic slice), Pause/resume for the global automations, Prestige and the Googol freeze (+38 more)

### Community 103 - "autonomous-maintenance.yml"
Cohesion: 0.18
Nodes (10): concurrency, cancel-in-progress, group, name, permissions, contents, id-token, issues (+2 more)

### Community 104 - "OfflineProgressNotice/index.jsx"
Cohesion: 0.09
Nodes (18): NoticeActions, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), renderNotice(), summary, createPrefixedStorage() (+10 more)

### Community 106 - "steps"
Cohesion: 0.07
Nodes (28): concurrency, cancel-in-progress, group, GH_TOKEN, TARGET_INPUT, target_sha, jobs, open-revert-pr (+20 more)

### Community 107 - "Design history & rationale"
Cohesion: 0.08
Nodes (24): #988 leftover mixed labels after stacking onto #990 (2026-11), Bits subline adds no Factory header height — 2026-11-09, CLAUDE.md Economy model duplication trim — 2026-09-03, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Daily challenges: seeded conditions, head start, calculated targets (2026-11), Data Stream balance kept through Prestige (#1096), Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale (+16 more)

### Community 114 - "AchievementsPage/index.jsx"
Cohesion: 0.17
Nodes (21): AppMenu(), Backdrop, Icon, MenuButton, Sheet, SheetTitle, getCompletedAchievementGroups(), isAchievementEarned() (+13 more)

### Community 117 - "Architecture / MainPage UI decisions"
Cohesion: 0.14
Nodes (21): Security notes, Architecture / MainPage UI decisions, 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline (+13 more)

### Community 118 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, @capacitor/android@^8.5.3, @capacitor/ios@^8.5.3, @capacitor/splash-screen@^8.0.2, firebase@^13.2.0, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0, react@^19.3.1 (+13 more)

### Community 119 - "capacitorConfig.test.js"
Cohesion: 0.16
Nodes (15): ADS_PLUGIN, BASE_PLUGINS, buildIncludePlugins(), config, IAP_PLUGIN, root, srcPath, buildFeaturesModule() (+7 more)

### Community 120 - "Dev Mode Reference"
Cohesion: 0.23
Nodes (18): Dev Mode, Dev Mode Reference, adaptSaveForLoad(), clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot(), discardIncompatibleActiveSaveIfNeeded() (+10 more)

### Community 121 - "stryker.config.json"
Cohesion: 0.10
Nodes (19): concurrency, coverageAnalysis, htmlReporter, fileName, jsonReporter, fileName, mutate, plugins (+11 more)

### Community 122 - "engine.challengesTier.test.js"
Cohesion: 0.20
Nodes (15): buyTickspeedMultiplier(), withChallenge(), withRun(), getChallengeEffectTier(), getEffectiveTickspeedLevel(), getLastTierId(), getTickspeedChargeLevel(), getTickspeedMultiplierBaseCost() (+7 more)

### Community 125 - "config.js"
Cohesion: 0.16
Nodes (11): ADMOB_TEST_REWARDED_IDS, FIREBASE_CONFIG, IAP_PRODUCTS, PRIVACY_POLICY_URL, realRewardedIds, REMOVE_ADS_ENTITLEMENT, REVENUECAT_API_KEYS, SITE_URL (+3 more)

### Community 126 - "ref_node_fs"
Cohesion: 0.19
Nodes (11): match, yml, ADMOB_TEST_APP_ID_IOS, applyManagedAdsKeys(), buildManagedBlock(), END_MARKER, escapeXml(), SKADNETWORK_IDS (+3 more)

### Community 127 - "firebaseBackend.js"
Cohesion: 0.18
Nodes (9): deleteAccountAndData(), app, auth, db, deleteAccount(), downloadSave(), requireUser(), saveDocFor() (+1 more)

### Community 129 - "Store listing drafts"
Cohesion: 0.15
Nodes (12): Apple — App Privacy ("nutrition label"), Content rating (Play IARC questionnaire / App Store age rating), Default build, Default build (cloud save on, ads and IAP off), Google Play — Data safety, Listing text, Store assets still needed, Store listing drafts (+4 more)

### Community 130 - "isComputeMergeReserveStartAvailable"
Cohesion: 0.17
Nodes (12): Boosters: manual merge on automated tiers became instant (2026-10), instantComputeMergeAtBoundary(), isComputeCloudsMergeStartAvailable(), isComputeClustersMergeStartAvailable(), isComputeCoresMergeStartAvailable(), isComputeDatacentersMergeStartAvailable(), isComputeFabricsMergeStartAvailable(), isComputeGridsMergeStartAvailable() (+4 more)

### Community 131 - "Android release (Google Play)"
Cohesion: 0.39
Nodes (7): react-dom@^19.3.1, react-dom, Heading, Note, Panel, Rows, SpeedDetailsPopover()

### Community 132 - "admobAdapter.js"
Cohesion: 0.25
Nodes (8): @capacitor-community/admob@^8.2.1, @capacitor/core@^8.5.3, @capacitor-community/admob, @capacitor/core, getRewardedAdUnit(), createAdMobAdapter(), createRewardedAdCache(), REWARDED_AD_MAX_AGE_MS

### Community 133 - "verify-maintainer-checklist.mjs"
Cohesion: 0.38
Nodes (9): allVerifiableChecked(), applyChecks(), CHECKLIST_ISSUE, CHECKS, gh(), main(), runChecks(), BODY (+1 more)

### Community 134 - "ChallengesPage/index.jsx"
Cohesion: 0.29
Nodes (10): allChallengesCompleted(), withPpForInterval(), CHALLENGE_DEFINITIONS, describeLevers(), CHALLENGE_TABS, ChallengesPage(), Header, RootDiv (+2 more)

### Community 135 - "contrast.js"
Cohesion: 0.38
Nodes (7): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear()

### Community 136 - "getDiskSizesToShow"
Cohesion: 0.36
Nodes (8): Foundry Memory always keeps the highest Disk row (issue #389), `tickDiskAutoFill`: a fully-staged cache could get starved out by an unrelated smaller size, getDiskSizesToShow(), getRelevantDiskSizesForFoundry(), Header, RootDiv, StoragePage(), Title

### Community 137 - "simulate-daily-challenges.mjs"
Cohesion: 0.22
Nodes (5): args, dates, DAYS, FROM, ONE

### Community 138 - "Android release (Google Play)"
Cohesion: 0.25
Nodes (7): Android release (Google Play), Build the signed AAB, Edge-to-edge, splash, icon, One-time setup, Optional features (all off by default), Permission audit, Upload to a testing track

### Community 139 - "env"
Cohesion: 0.25
Nodes (8): CI_RUN_BRANCH, CI_RUN_CONCLUSION, EVENT_NAME, GH_TOKEN, ISSUE_IS_PR, ISSUE_NUMBER, REVIEW_PR_NUMBER, env

### Community 140 - "on"
Cohesion: 0.25
Nodes (8): types, on, issue_comment, pull_request_review, workflow_run, types, types, workflows

### Community 141 - "Tens"
Cohesion: 0.25
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Manual, Scripts, Security notes, Tens

### Community 142 - "lint-conflict-markers.mjs"
Cohesion: 0.43
Nodes (6): findConflictMarkers(), isScannable(), main(), MARKER_RE, L, R

### Community 143 - "Foundry multiplier bar: one diverging bar tried and dropped (2026-10)"
Cohesion: 0.29
Nodes (7): Bitrate exponent moves 10% toward 1.0 per new Disk size (2026-11), Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Pool-reset achievements tune Bitrate's within-pool exponent steps (2026-11), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), basisBitsForRawRate()

### Community 144 - "steps"
Cohesion: 0.29
Nodes (7): steps, continue-on-error, id, if, name, run, uses

### Community 145 - "mergeDataLakes"
Cohesion: 0.38
Nodes (7): 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, createEmptyDataLakes(), createEmptyDataLakeTier(), getLegacyPendingTransferCount(), isLegacyDataLakeTier(), mergeDataLakes(), migrateLegacyDataLakeTier()

### Community 146 - "iOS release (App Store)"
Cohesion: 0.33
Nodes (5): App Store submission, iOS release (App Store), One-time setup, Prepare the project, TestFlight

### Community 147 - "autonomous-pr-followup.yml"
Cohesion: 0.33
Nodes (5): concurrency, cancel-in-progress, group, jobs, name

### Community 149 - "model"
Cohesion: 0.40
Nodes (5): model, default, description, options, type

### Community 150 - "permissions"
Cohesion: 0.40
Nodes (5): permissions, actions, contents, id-token, pull-requests

### Community 151 - "followup"
Cohesion: 0.50
Nodes (4): if, runs-on, timeout-minutes, followup

## Knowledge Gaps
- **7 isolated node(s):** `PackageDescription`, `scripts/autonomous-maintenance-workflow.test.js`, `file:src/game/storagePrefix.js`, `file:src/game/storagePrefix.test.js`, `file:src/pages/SettingsPage/ManualSaveSection.jsx` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 958 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `dailyChallenges.js` to `engine.js`, `navAttention.js`, `admobAdapter.js`, `engine.test.js`, `createInitialGameState`, `App.test.jsx`, `storage.js`, `tokens.js`, `SettingsPage/index.jsx`, `Shared components reference`, `devDependencies`, `isProductionFrozen`, `OfflineProgressNotice/index.jsx`, `AchievementsPage/index.jsx`, `capacitorConfig.test.js`, `Dev Mode Reference`, `engine.challengesTier.test.js`, `config.js`, `ref_node_fs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 257 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `activateComputeBoost()` and `applyAutobuyerMilestones()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 257 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `scripts/autonomous-maintenance-workflow.test.js`, `file:src/game/storagePrefix.js` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05693693693693694 - nodes in this community are weakly interconnected._
- **Why does `Design history & rationale` connect `Design history & rationale` to `MainPage/index.jsx`, `isComputeMergeReserveStartAvailable`, `navAttention.js`, `ComputePage/index.jsx`, `Automation workflows`, `tickGame`, `createInitialGameState`, `Key engine functions (`src/game/engine.js`)`, `Foundry multiplier bar: one diverging bar tried and dropped (2026-10)`, `README.md`, `Distribution`, `Documentation`, `Economy model — Byte Foundry (full text)`, `DataLakePanel`, `getTierCost`, `getStoragePoolBandwidth`, `ByteFoundryPage`, `PerksPage/index.jsx`, `Economy model`, `Testing`, `isProductionFrozen`, `Architecture / MainPage UI decisions`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 177 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 177 INFERRED edges - model-reasoned connections that need verification._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._