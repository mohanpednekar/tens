# Graph Report - tens  (2026-11-20)

## Corpus Check
- 229 files · ~597,785 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 9, (none) 8, .properties 2)

## Summary
- 3357 nodes · 10371 edges · 175 communities (134 shown, 41 thin omitted)
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 2288 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aa699a5c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DailyTab.jsx
- MainPage/index.jsx
- AppDelegate
- layers.js
- navAttention.js
- ComputePage/index.jsx
- engine.test.js
- Automation workflows
- Constants (`src/game/layers.js`)
- App.jsx
- CLAUDE.md
- with
- run-simulation.mjs
- dailyChallenges.js
- DevModePage/index.jsx
- useIncrementalGame
- getEffectiveTierTickSpeedSeconds
- dependencies
- App.test.jsx
- storage.js
- with
- bump-version.mjs
- Economy model — Byte Foundry (full text)
- getStoragePoolBandwidth
- ComputeFlopsPage/index.jsx
- theme/index.jsx
- AGENTS.md
- Key engine functions (`src/game/engine.js`)
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- Economy model — Byte Foundry (full text)
- createInitialGameState
- Shared components reference
- Byte Foundry
- isProductionFrozen
- tickGame
- Achievements (epic #1046, basic slice)
- MainActivity.java
- [Unreleased]
- Testing
- package.json
- DiskArrayRow/index.jsx
- scripts
- ByteFoundryPage
- steps
- MainPage reference
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
- adaptSaveForCurrentSchema
- optimize-ai-files/SKILL.md
- @playwright/test
- PerksPage/index.jsx
- pr-conflict-sweep.yml
- palette.md
- useIncrementalGame
- sync-release-milestones.sh
- adversarialReviewMarker.js
- config.js
- BoostBadge/index.jsx
- Foundry multiplier bar: one diverging bar tried and dropped (2026-10)
- pull_request_template.md
- jsconfig.json
- FactoryTab.jsx
- env
- capacitorConfig.test.js
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- createInitialGameState
- Design history & rationale
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- browserslist
- formatCurrency
- src/index.jsx
- activateComputeBoost
- .claude/CLAUDE.md
- check-graphify-freshness.mjs
- AutoBoostPresetPicker/index.jsx
- session-start.sh
- slot
- Store listing drafts
- dailyChallenges.test.js
- dev-team/SKILL.md
- with
- ChallengesPage/index.jsx
- autonomous-maintenance.yml
- admobAdapter.js
- resolve-pr-threads.sh
- with
- lint-workflow-shell.mjs
- getFillMultiplierPercent
- updates
- AppMenu
- steps
- claude-deny-settings.sh
- pr-head-guard.sh
- steps
- simulate-challenges.mjs
- steps
- config.js
- firebaseBackend.js
- src/index.jsx
- stryker.config.json
- capacitorConfig.test.js
- navAttention.test.js
- startDailyRun
- playDailyRun
- Android release (Google Play)
- Tens
- mergeStateForDevWrite
- engine.challengesTier.test.js
- mergeState
- Store listing drafts
- verify-maintainer-checklist.mjs
- resolutions
- configure-ios-plist.mjs
- Dev Mode Reference
- One-shot auto-convert
- Android release (Google Play)
- env
- on
- lint-conflict-markers.mjs
- steps
- README.md
- iOS release (App Store)
- autonomous-pr-followup.yml
- model
- permissions
- FactoryTab.test.jsx
- Distribution
- BoostTimerBar/index.jsx
- followup
- PWA support reference
- Documentation
- android-boot-smoke.sh
- file:scripts/lint-conflict-markers.mjs
- file:scripts/lint-conflict-markers.test.js
- file:src/game/storagePrefix.js
- file:src/game/storagePrefix.test.js
- file:src/pages/SettingsPage/ManualSaveSection.jsx
- isBuyMaxUnlocked
- hasAffordableAutomationPerk
- AchievementsPage/index.jsx
- AppNav/index.jsx
- applyAutobuyerMilestones
- Compact screen layouts (epic #1135)
- economy-change-review/SKILL.md
- simulate-run-times/SKILL.md
- BuyModeToggle/index.jsx
- getPrestigePowersPerPp
- browserslist

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 267 edges
2. `MainPage()` - 122 edges
3. `useIncrementalGame()` - 112 edges
4. `ByteFoundryPage()` - 110 edges
5. `MainPage reference` - 103 edges
6. `Testing` - 87 edges
7. `tickGame()` - 86 edges
8. `clampNonNegative()` - 85 edges
9. `Economy model — Byte Foundry (full text)` - 85 edges
10. `createInitialGameState()` - 81 edges

## Surprising Connections (you probably didn't know these)
- `A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too` --references--> `formatCapacityLabel()`  [INFERRED]
  docs/DESIGN_HISTORY.md → .claude/skills/simulate-run-times/run-simulation.mjs
- `Release (`release.yml`)` --references--> `extractVersionSection()`  [INFERRED]
  docs/AUTOMATION.md → scripts/bump-version.mjs
- `Scheduled maintenance (`autonomous-maintenance.yml`)` --references--> `gh()`  [INFERRED]
  docs/AUTOMATION.md → scripts/verify-maintainer-checklist.mjs
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `Production speed bonus: automatic log10 → 1 PP purchase, 1 + log10(n) with ×1.1 first Purge — 2026-11-15 (#1098, #1097, #1100)` --references--> `buyPrestigeSpeedBonus()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (175 total, 41 thin omitted)

### Community 0 - "DailyTab.jsx"
Cohesion: 0.14
Nodes (27): canRestartDailyRun(), getDailyCredits(), getMsUntilNextUtcDay(), getUtcDateId(), isDailyAutomationOn(), ActionButton, AUTOMATION_GROUPS, AutomationSwitches() (+19 more)

### Community 1 - "MainPage/index.jsx"
Cohesion: 0.06
Nodes (68): Fixed, Bits subline under MoneyHero; `+n/8` dropped from tier Buy buttons — 2026-11-09, Single-line tier rows; exponential notation from 10,000 (2026-11), Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance() (+60 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "layers.js"
Cohesion: 0.04
Nodes (120): AUTO_MERGE_TICKERS, BIT_UNIT_SYMBOLS, CHALLENGE_BOUNDARIES, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, FILL_CURVE_LN_A, FILL_CURVE_LN_B, fixedMemoryAmountFormatters (+112 more)

### Community 4 - "navAttention.js"
Cohesion: 0.10
Nodes (35): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, getAutobuyerIntervalSeconds(), getAutomationIntervalSeconds(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable() (+27 more)

### Community 5 - "ComputePage/index.jsx"
Cohesion: 0.12
Nodes (30): isComputeMergeStartAvailableAtBoundary(), isDiskFillAvailable(), ArmedStatusText, BoostCard, BoostRow, BoostsHint, canMerge(), ChargerBadge (+22 more)

### Community 6 - "engine.test.js"
Cohesion: 0.03
Nodes (68): Boosters: manual merge on automated tiers became instant (2026-10), enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud, enableAutoMergeGridsIntoFabric, enableAutoMergeNetworksIntoGrid (+60 more)

### Community 7 - "Automation workflows"
Cohesion: 0.12
Nodes (16): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Main CI heal checkout is default-branch tip, not `workflow_run.head_sha` — 2026-11-11, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit (+8 more)

### Community 8 - "Constants (`src/game/layers.js`)"
Cohesion: 0.07
Nodes (47): Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost: tier funds breadth, not strength (reverses the 4× power / 2× duration scaling), Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Economy model, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework (+39 more)

### Community 9 - "App.jsx"
Cohesion: 0.09
Nodes (37): Prestige info is hidden until first prestige, styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop (+29 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.09
Nodes (21): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+13 more)

### Community 11 - "with"
Cohesion: 0.15
Nodes (13): with, allowed_bots, cache, claude_args, claude_code_oauth_token, fetch-depth, github_token, node-version (+5 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.14
Nodes (20): actCapacityUpgrade(), actMainBuys(), actPlayer(), actSpeedBonus(), actTickspeed(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPurges (+12 more)

### Community 13 - "dailyChallenges.js"
Cohesion: 0.08
Nodes (43): AUTOMATION_BY_KEY, buildDailyCandidate(), calculateAttemptMark(), calculateTarget(), createRng(), DAILY_CHECK_IN_PLANS, DAILY_MAX_CREDITS, DAILY_MAX_GENERATION_ATTEMPTS (+35 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.11
Nodes (42): ButtonGrid, describeNumber(), Details, DevModePage(), FieldControls, FieldLabel, FieldNode(), FieldRow (+34 more)

### Community 15 - "useIncrementalGame"
Cohesion: 0.27
Nodes (14): Architecture, `OfflineProgressNotice/index.jsx`, Offline progress, Native apps (Capacitor — #70), Native apps (Capacitor) reference, applyOfflineProgress(), applyOfflineRewardBonus(), getMaxOfflineSeconds() (+6 more)

### Community 16 - "getEffectiveTierTickSpeedSeconds"
Cohesion: 0.05
Nodes (39): concurrency, cancel-in-progress, group, GH_TOKEN, RUN_CONCLUSION, RUN_HEAD_SHA, RUN_ID, RUN_NAME (+31 more)

### Community 17 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, @capacitor/android@^8.5.3, @capacitor/ios@^8.5.3, @capacitor/splash-screen@^8.0.2, firebase@^13.2.0, @fontsource/inter@^5.3.0, @fontsource/space-grotesk@^5.3.0, react@^19.3.1 (+13 more)

### Community 18 - "App.test.jsx"
Cohesion: 0.07
Nodes (35): version, @testing-library/user-event, derivePurchaseFieldsFromCounts(), expandSettingsSections(), openSettings(), seedMainGameState(), ALL_TIER_IDS, derivePurchaseFieldsFromCounts() (+27 more)

### Community 19 - "storage.js"
Cohesion: 0.17
Nodes (25): buildClearSlotConfirmMessage(), buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), BUY_MAX_PREFERENCE_KEY, BUY_UNIT_PREFERENCE_KEY, coerceMeta(), completeDummySupporterPurchase(), defaultSlotName() (+17 more)

### Community 20 - "with"
Cohesion: 0.05
Nodes (41): concurrency, cancel-in-progress, group, CI_RUN_BRANCH, CI_RUN_CONCLUSION, GH_TOKEN, if, runs-on (+33 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.18
Nodes (20): assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection(), formatChangelogDate() (+12 more)

### Community 22 - "Economy model — Byte Foundry (full text)"
Cohesion: 0.16
Nodes (31): Foundry-reset rebuild moved off the fill multiplier (2026-10), "Free" Foundry-reset rebuild means one fill per disk, not zero bits (2026-11), Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Provision Disk: buffer-funded at a fixed speed, never fill-multiplied (2026-11), Provision Disk's post-funding build timer duplicated the wait already spent funding it, The read-cache pre-fill design was never reconciled with the later decade-of-10 Capacity ladder, starving a freshly-unlocked pool's buffer, Upgrade Capacity / Upgrade Speed, Economy model — Byte Foundry (full text) (+23 more)

### Community 23 - "getStoragePoolBandwidth"
Cohesion: 0.06
Nodes (38): env, if, runs-on, steps, timeout-minutes, env, if, runs-on (+30 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.14
Nodes (24): Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight(), getComputeFlopsTotal(), isComputeFlopsPageRevealed() (+16 more)

### Community 25 - "theme/index.jsx"
Cohesion: 0.11
Nodes (20): Theming reference, renderWithTheme(), AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance() (+12 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.10
Nodes (18): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+10 more)

### Community 27 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.23
Nodes (18): Fill multiplier 10× → 0.1× (log-linear) and a multiplicative tap bonus — 2026-10-30, Lake disk fills: full-pool start, uninterruptible (2026-11), Upgrade Data Stream arms below a full Buffer (outflow pause) — SUPERSEDED, Key engine functions (`src/game/engine.js`), areStoragePoolDisksFull(), clearIntroCapacityUpgradeQueue(), doubleIntroCapacity(), eraseAllComputeTokens() (+10 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.10
Nodes (45): Settings + Milestones (#1143), ButtonContent(), getEonsAwarded(), CloudSaveSection(), DELETE_STEP_MESSAGES, errorStatus(), Body, buildSparklinePath() (+37 more)

### Community 30 - "Economy model — Byte Foundry (full text)"
Cohesion: 0.15
Nodes (41): Fixed, Removed, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09, Devin Review on PR #608, round 6: a provenance-tracking fix superseding an incomplete bot revert — 2026-09-09, Devin Review on PR #614: a false-update bug, a stale comment, and a deliberately-unfixed legacy-save ambiguity — 2026-09-09 (+33 more)

### Community 32 - "createInitialGameState"
Cohesion: 0.06
Nodes (34): concurrency, cancel-in-progress, group, CODE_SCANNING_ALERTS, DEVIN_CLI_CREDENTIALS, GH_TOKEN, MAIN_CI_BROKEN, OPEN_BUG_ISSUES (+26 more)

### Community 33 - "Shared components reference"
Cohesion: 0.20
Nodes (9): `AppMenu/index.jsx`, `AppNav/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js` (+1 more)

### Community 34 - "Byte Foundry"
Cohesion: 0.06
Nodes (106): Changed, actFoundry(), `ByteFoundryPage` pool layout, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split (+98 more)

### Community 35 - "isProductionFrozen"
Cohesion: 0.13
Nodes (43): wouldAutobuyerStall(), `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Factory tier cost series: shared linear increments → per-tier constant increments — 2026-11-16 (#1098), Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check (+35 more)

### Community 36 - "tickGame"
Cohesion: 0.09
Nodes (55): Byte Foundry, What it does, `BoostBadge/index.jsx`, `DiskArrayRow/index.jsx`, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, Architecture / MainPage UI decisions, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight (+47 more)

### Community 37 - "Achievements (epic #1046, basic slice)"
Cohesion: 0.10
Nodes (46): Security notes, Purge code rename: reboot → purge (2026-11, #987), Achievements (epic #1046, basic slice), Pause/resume for the global automations, Prestige Points, autobuyer unlock, and the tickspeed multiplier, Reboot and Kernels (#407), The global tickspeed multiplier, The last tier's XP-funded tickspeed (+38 more)

### Community 39 - "[Unreleased]"
Cohesion: 0.05
Nodes (42): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+34 more)

### Community 40 - "Testing"
Cohesion: 0.07
Nodes (74): A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main` (+66 more)

### Community 41 - "package.json"
Cohesion: 0.08
Nodes (32): devDependencies, @capacitor/cli@^8.5.3, fast-check@^4.10.2, jsdom@^31.0.0, sharp@^0.35.5, @stryker-mutator/core@^10.1.1, @stryker-mutator/vitest-runner@^10.1.1, @testing-library/dom@^10.4.1 (+24 more)

### Community 42 - "DiskArrayRow/index.jsx"
Cohesion: 0.07
Nodes (62): A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping, Pool isolation: disk write-cache merges no longer cross pool boundaries, The "stranded disks never touch write-cache either" rule (from the two Devin Review findings above) itself turned out to be the bug: it permanently starved every disk size past the first one (+54 more)

### Community 43 - "scripts"
Cohesion: 0.11
Nodes (19): scripts, android:aab, android:apk:release, audit, build, build:capacitor, build:dev, bump-version (+11 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.05
Nodes (90): Pool Memory Capacity and Bandwidth, formatDiskSizeInPoolUnit(), formatPoolBalance(), formatPoolBalanceStable(), formatSpeedText(), formatThreeSignificant(), getComputeBoostMultiplier(), getComputeBoostPoolMultiplier() (+82 more)

### Community 45 - "steps"
Cohesion: 0.06
Nodes (39): runs-on, steps, runs-on, steps, concurrency, cancel-in-progress, group, runs-on (+31 more)

### Community 46 - "MainPage reference"
Cohesion: 0.20
Nodes (23): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Forced priority order, App.jsx routing and the Foundry gate, MainPage reference (+15 more)

### Community 47 - "Procedure"
Cohesion: 0.22
Nodes (8): 1. Establish scope, 3. Per-change adversarial pass, 4. Cross-cutting checks, 5. Verify, then report, Ground rules: factual, Machine-readable marker (required on every report), Procedure, Stance: adversarial

### Community 48 - "Automation workflows"
Cohesion: 0.11
Nodes (18): AI-instruction file cost hygiene, Auto-merge (`pr-auto-merge.yml`), Automation self-heal (`automation-self-heal.yml`), Automation workflows, CodeQL (`codeql.yml`), Dependabot PR follow-up (`dependabot-pr-followup.yml`), Devin autonomous maintenance (`devin-autonomous-maintenance.yml`), Main CI heal (`main-ci-heal.yml`, #37) (+10 more)

### Community 49 - "ref_node_fs"
Cohesion: 0.11
Nodes (8): workflow, workflowPath, match, yml, script, zeroWork, script, script

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
Cohesion: 0.21
Nodes (10): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), overwrite(), pngSize(), renderSplash() (+2 more)

### Community 60 - "adaptSaveForCurrentSchema"
Cohesion: 0.18
Nodes (15): Changed, SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), isPlainObject(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema() (+7 more)

### Community 61 - "optimize-ai-files/SKILL.md"
Cohesion: 0.29
Nodes (6): Hard invariants — never remove or weaken these, Process, Report, Safe reduction techniques, Scope, in priority order, What not to do

### Community 62 - "@playwright/test"
Cohesion: 0.20
Nodes (3): seededState, @playwright/test@^1.64.1, @playwright/test

### Community 63 - "PerksPage/index.jsx"
Cohesion: 0.08
Nodes (50): VisuallyHidden, getChallengeTitle(), getChallengeUnlockCondition(), getAutobuyerBulkExtraLevels(), getAutobuyerBulkLevels(), getAutobuyerIntervalMaxLevel(), getAutobuyerSpeedUpgradeMaxLevel(), getFlopsAutobuyerUnlockEra() (+42 more)

### Community 64 - "pr-conflict-sweep.yml"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_REPO, GH_TOKEN, jobs, sweep, name (+14 more)

### Community 66 - "palette.md"
Cohesion: 0.14
Nodes (13): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+5 more)

### Community 68 - "useIncrementalGame"
Cohesion: 0.16
Nodes (29): Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Buy max mode, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, addActivePlaySeconds(), buyAutobuyerIntervalUpgrade(), buyAutomationIntervalUpgrade(), buyBuyMaxUnlock(), buyCacheWarm() (+21 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 73 - "config.js"
Cohesion: 0.09
Nodes (22): BEFORE_SHA, GH_TOKEN, jobs, tag-and-release, name, on, push, permissions (+14 more)

### Community 74 - "BoostBadge/index.jsx"
Cohesion: 0.21
Nodes (15): Compute Boost lanes (parallel multipliers + same-multiplier queue), Architecture 4b — `ComputePage/index.jsx`, boostGlow, boostPulse, COMPUTE_BOOST_LABELS, getComputeBoostDescription(), isBoostActive(), isDataStreamBoosted() (+7 more)

### Community 75 - "Foundry multiplier bar: one diverging bar tried and dropped (2026-10)"
Cohesion: 0.29
Nodes (7): Bitrate exponent moves 10% toward 1.0 per new Disk size (2026-11), Data Stream Speed exponent 0.5 → 0.8 (2026-10), Foundry multiplier bar: one diverging bar tried and dropped (2026-10), Pool Bandwidth cap exponent 0.5 → 0.8 (2026-10), Pool-reset achievements tune Bitrate's within-pool exponent steps (2026-11), Speed exponent set to 0.75, with later upgrades expected to raise it (2026-10), basisBitsForRawRate()

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "FactoryTab.jsx"
Cohesion: 0.09
Nodes (41): `Button/index.jsx`, react, Button, ButtonIcon, ButtonLabel, clampPercent(), getGlowRgb(), hexToRgb() (+33 more)

### Community 79 - "env"
Cohesion: 0.07
Nodes (27): CEILING_FULL, CLAUDE_OUTCOME, CODE_SCANNING_ALERTS, DEPENDABOT_ALERTS, DEPENDABOT_PRS, EVENT_SCHEDULE, FAILING_PRS, GH_TOKEN (+19 more)

### Community 80 - "capacitorConfig.test.js"
Cohesion: 0.12
Nodes (16): runs-on, steps, jobs, deploy, name, on, push, permissions (+8 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 84 - "createInitialGameState"
Cohesion: 0.08
Nodes (41): 2. Load the repo's invariants, actSoftResets(), `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, `scaleUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry, Speed Up renamed to Scale Up and redesigned from a last-tier-only gate to a per-tier unlock ladder — 2026-09-09, Starting Money reduced from 10 to 1, Storage auto-redeem toggle button removed for now, default flipped to always-on, The Byte Foundry becomes a per-Prestige-cycle mechanic, not a one-time gate (+33 more)

### Community 85 - "Design history & rationale"
Cohesion: 0.07
Nodes (29): #988 leftover mixed labels after stacking onto #990 (2026-11), Bits subline adds no Factory header height — 2026-11-09, CLAUDE.md Economy model duplication trim — 2026-09-03, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Daily challenges: seeded conditions, head start, calculated targets (2026-11), Data Stream balance kept through Prestige (#1096), Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale (+21 more)

### Community 88 - "browserslist"
Cohesion: 0.13
Nodes (14): jobs, test, name, on, pull_request, push, permissions, contents (+6 more)

### Community 89 - "formatCurrency"
Cohesion: 0.14
Nodes (13): description, label, placeholder, value, body, attributes, id, type (+5 more)

### Community 90 - "src/index.jsx"
Cohesion: 0.17
Nodes (12): with, base_branch, branch_prefix, claude_args, claude_code_oauth_token, fetch-depth, github_token, install (+4 more)

### Community 91 - "activateComputeBoost"
Cohesion: 0.19
Nodes (22): Boosters: timer bar with Pop / Forfeit / Stack; preset switch refunds unused stacks (2026-10), Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, Compute Boost, activateComputeBoost(), autoBoostFromTier(), canActivateComputeBoost(), canForfeitComputeBoost() (+14 more)

### Community 93 - "check-graphify-freshness.mjs"
Cohesion: 0.11
Nodes (17): ALLOWED_TOP_LEVEL_KEYS, analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findMalformedGraphEntries(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef() (+9 more)

### Community 94 - "AutoBoostPresetPicker/index.jsx"
Cohesion: 0.60
Nodes (4): AutoBoostPresetPicker(), PresetButton, Row, COMPUTE_BOOST_DISPLAY

### Community 96 - "slot"
Cohesion: 0.20
Nodes (10): slot, on, schedule, workflow_dispatch, cron, default, description, options (+2 more)

### Community 98 - "Store listing drafts"
Cohesion: 0.20
Nodes (10): maintenance, runs-on, steps, timeout-minutes, continue-on-error, id, if, name (+2 more)

### Community 99 - "dailyChallenges.test.js"
Cohesion: 0.12
Nodes (13): DAILY_AUTOMATIONS, DAILY_BOT_ACTION_ORDER, DAILY_FORMAT_BY_ID, DAILY_FORMATS, DAILY_GENERATOR_VERSION, DAILY_MODIFIER_POOL, DAILY_OBJECTIVE_KINDS, forfeitDailyRun() (+5 more)

### Community 101 - "with"
Cohesion: 0.29
Nodes (6): interval, updates, directory, package-ecosystem, schedule, version

### Community 102 - "ChallengesPage/index.jsx"
Cohesion: 0.22
Nodes (11): isDailyChallengesAvailable(), DAILY_CHALLENGES_FEATURE, describeDailyChallenge(), describeManual(), base(), CHALLENGE_TABS, ChallengesPage(), Header (+3 more)

### Community 103 - "autonomous-maintenance.yml"
Cohesion: 0.17
Nodes (11): concurrency, cancel-in-progress, group, jobs, name, permissions, contents, id-token (+3 more)

### Community 104 - "admobAdapter.js"
Cohesion: 0.25
Nodes (8): @capacitor-community/admob@^8.2.1, @capacitor/core@^8.5.3, @capacitor-community/admob, @capacitor/core, getRewardedAdUnit(), createAdMobAdapter(), createRewardedAdCache(), REWARDED_AD_MAX_AGE_MS

### Community 106 - "with"
Cohesion: 0.05
Nodes (42): concurrency, cancel-in-progress, group, if, runs-on, steps, timeout-minutes, GH_TOKEN (+34 more)

### Community 107 - "lint-workflow-shell.mjs"
Cohesion: 0.36
Nodes (7): bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main(), sanitizeExpressions()

### Community 114 - "steps"
Cohesion: 0.06
Nodes (31): name, permissions, runs-on, steps, strategy, jobs, analyze, include (+23 more)

### Community 117 - "steps"
Cohesion: 0.06
Nodes (31): concurrency, cancel-in-progress, group, MUTATE_OVERRIDE, mutate, jobs, mutation, default (+23 more)

### Community 118 - "simulate-challenges.mjs"
Cohesion: 0.10
Nodes (25): actCapacityUpgrade(), actFoundry(), actMainBuys(), actPlayer(), actPlayerBitRot(), actSoftResets(), actSpeedBonus(), actTickspeed() (+17 more)

### Community 119 - "steps"
Cohesion: 0.07
Nodes (28): concurrency, cancel-in-progress, group, GH_TOKEN, TARGET_INPUT, target_sha, jobs, open-revert-pr (+20 more)

### Community 120 - "config.js"
Cohesion: 0.19
Nodes (10): ADMOB_TEST_REWARDED_IDS, IAP_PRODUCTS, PRIVACY_POLICY_URL, realRewardedIds, REMOVE_ADS_ENTITLEMENT, REVENUECAT_API_KEYS, SITE_URL, TERMS_URL (+2 more)

### Community 121 - "firebaseBackend.js"
Cohesion: 0.15
Nodes (10): deleteAccountAndData(), app, auth, db, deleteAccount(), downloadSave(), requireUser(), saveDocFor() (+2 more)

### Community 122 - "src/index.jsx"
Cohesion: 0.11
Nodes (16): NoticeActions, NoticeText, OfflineNoticeCard, OfflineNoticeOverlay, OfflineProgressNotice(), renderNotice(), summary, createPrefixedStorage() (+8 more)

### Community 125 - "stryker.config.json"
Cohesion: 0.10
Nodes (19): concurrency, coverageAnalysis, htmlReporter, fileName, jsonReporter, fileName, mutate, plugins (+11 more)

### Community 126 - "capacitorConfig.test.js"
Cohesion: 0.16
Nodes (15): ADS_PLUGIN, BASE_PLUGINS, buildIncludePlugins(), config, IAP_PLUGIN, root, srcPath, buildFeaturesModule() (+7 more)

### Community 127 - "navAttention.test.js"
Cohesion: 0.07
Nodes (28): @testing-library/react, vitest, ACHIEVEMENT_DEFINITIONS, ACHIEVEMENT_GROUPS, ACHIEVEMENTS_FEATURE, AUTOMATION_INTERVAL_CONFIG, BITS_PER_BYTE, CHALLENGE_DEFINITIONS (+20 more)

### Community 129 - "startDailyRun"
Cohesion: 0.25
Nodes (7): Achievements (epic #1046, basic slice), Daily challenges (epic #1062), Economy model, generate(), generateDailyChallenge(), getDailyChallengeValidation(), startDailyRun()

### Community 130 - "playDailyRun"
Cohesion: 0.46
Nodes (8): Daily challenges (epic #1062), getRunProgress(), getRunValue(), isRunWon(), playDailyRun(), setRun(), settleRun(), tickDailyRuns()

### Community 131 - "Android release (Google Play)"
Cohesion: 0.39
Nodes (7): react-dom@^19.3.1, react-dom, Heading, Note, Panel, Rows, SpeedDetailsPopover()

### Community 132 - "Tens"
Cohesion: 0.25
Nodes (8): Byte Foundry, Core economy, Game architecture, Game design, Manual, Scripts, Security notes, Tens

### Community 133 - "mergeStateForDevWrite"
Cohesion: 0.16
Nodes (19): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation (DevModePage) (+11 more)

### Community 134 - "engine.challengesTier.test.js"
Cohesion: 0.13
Nodes (28): 5. Authorization boundary, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped, Multiplier outcomes are floored, Tickspeed multiplier, buyTickspeedMultiplier(), withChallenge(), withRun(), getAutobuyerUnlockCost() (+20 more)

### Community 135 - "mergeState"
Cohesion: 0.18
Nodes (15): Testing, Migration in `src/save-migration/`, runs on every load — 2026-08-22, Removing Claim Core: superseded by Data Lake Boosters, Save persistence, Three more findings from a Devin bot review pass on the pool-overflow Data Lake rework PR: an overflow rate that asymptotically never completes, a lifetime-counter bug, and dropped legacy transfers, createEmptyDataLakes(), createEmptyDataLakeTier(), latchComputeMergePageIfNeeded() (+7 more)

### Community 136 - "Store listing drafts"
Cohesion: 0.15
Nodes (12): Apple — App Privacy ("nutrition label"), Content rating (Play IARC questionnaire / App Store age rating), Default build, Default build (cloud save on, ads and IAP off), Google Play — Data safety, Listing text, Store assets still needed, Store listing drafts (+4 more)

### Community 137 - "verify-maintainer-checklist.mjs"
Cohesion: 0.35
Nodes (9): allVerifiableChecked(), applyChecks(), CHECKLIST_ISSUE, CHECKS, gh(), main(), runChecks(), BODY (+1 more)

### Community 138 - "resolutions"
Cohesion: 0.25
Nodes (8): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/@grpc/grpc-js, **/nanoid, **/typed-rest-client/qs, **/uuid

### Community 139 - "configure-ios-plist.mjs"
Cohesion: 0.29
Nodes (9): ADMOB_TEST_APP_ID_IOS, applyManagedAdsKeys(), buildManagedBlock(), END_MARKER, escapeXml(), SKADNETWORK_IDS, START_MARKER, plist (+1 more)

### Community 140 - "Dev Mode Reference"
Cohesion: 0.24
Nodes (19): Dev Mode, Security notes, Dev Mode Reference, adaptSaveForLoad(), clearAllSaveProgress(), clearDevGameState(), clearGameState(), clearSaveSlot() (+11 more)

### Community 141 - "One-shot auto-convert"
Cohesion: 0.09
Nodes (37): Compact layouts per screen — three reversed decisions (2026-11-19, epic #1135), Faster autobuyer unlocks, 5× challenge unlocks, cheaper PP upgrades (2026-11), No grandfathering of unpurchased or unearned unlocks (2026-11-18, #1130), Power merge chain and charge-built Chargers (2026-11-20, #1141), Sacrifice confirm: in-game dialog; Core warning only when unlocked, One-shot auto-convert, Architecture — page renderers, enableAutoMerge() (+29 more)

### Community 142 - "Android release (Google Play)"
Cohesion: 0.25
Nodes (7): Android release (Google Play), Build the signed AAB, Edge-to-edge, splash, icon, One-time setup, Optional features (all off by default), Permission audit, Upload to a testing track

### Community 143 - "env"
Cohesion: 0.25
Nodes (8): CI_RUN_BRANCH, CI_RUN_CONCLUSION, EVENT_NAME, GH_TOKEN, ISSUE_IS_PR, ISSUE_NUMBER, REVIEW_PR_NUMBER, env

### Community 144 - "on"
Cohesion: 0.25
Nodes (8): types, on, issue_comment, pull_request_review, workflow_run, types, types, workflows

### Community 145 - "lint-conflict-markers.mjs"
Cohesion: 0.33
Nodes (7): findConflictMarkers(), isScannable(), main(), MARKER_RE, E, L, R

### Community 146 - "steps"
Cohesion: 0.29
Nodes (7): steps, continue-on-error, id, if, name, run, uses

### Community 148 - "iOS release (App Store)"
Cohesion: 0.33
Nodes (5): App Store submission, iOS release (App Store), One-time setup, Prepare the project, TestFlight

### Community 149 - "autonomous-pr-followup.yml"
Cohesion: 0.33
Nodes (5): concurrency, cancel-in-progress, group, jobs, name

### Community 150 - "model"
Cohesion: 0.40
Nodes (5): model, default, description, options, type

### Community 151 - "permissions"
Cohesion: 0.40
Nodes (5): permissions, actions, contents, id-token, pull-requests

### Community 152 - "FactoryTab.test.jsx"
Cohesion: 0.16
Nodes (16): renderDiskArrayRow(), renderButton(), Banner, ChallengeBanner(), Rule, Text, Title, formatChallengeGoal() (+8 more)

### Community 154 - "BoostTimerBar/index.jsx"
Cohesion: 0.20
Nodes (18): BoostLane, BoostLaneRow(), BoostTimerBar(), BoostTimerRow, BoostTimerStack, CompactButton, describeCoveredTiers(), formatPresetDuration() (+10 more)

### Community 155 - "followup"
Cohesion: 0.50
Nodes (4): if, runs-on, timeout-minutes, followup

### Community 164 - "isBuyMaxUnlocked"
Cohesion: 0.14
Nodes (16): BuyMaxToggle(), Switch, isBuyMaxUnlocked(), AutomationRow(), CellAction, Details, InlineAction, InlineMeta (+8 more)

### Community 165 - "hasAffordableAutomationPerk"
Cohesion: 0.16
Nodes (15): Perks regrouped by feature: Unlocks / Upgrades / Toggles → Automation / Prestige — 2026-11-03, getAutobuyerIntervalUpgradeCost(), getAutomationIntervalMaxLevel(), getAutomationIntervalUpgradeCost(), getIntervalMaxLevelForBase(), getLiveChallengeForAutomation(), getPrestigeDoublePpUpgradeCost(), getSiCleanDoublingFactor() (+7 more)

### Community 166 - "AchievementsPage/index.jsx"
Cohesion: 0.29
Nodes (13): getCompletedAchievementGroups(), isAchievementEarned(), AchievementsPage(), Badge, Detail, Group, GroupHeading, Header (+5 more)

### Community 167 - "AppNav/index.jsx"
Cohesion: 0.31
Nodes (9): APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar, Icon, Label, NavItem, pulseHigh (+1 more)

### Community 168 - "applyAutobuyerMilestones"
Cohesion: 0.43
Nodes (7): Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getChallengeUnlockPurges(), getTierTickspeedAutobuyerMilestone(), isAutomationIntervalChainAvailable(), isChallengeUnlocked()

### Community 169 - "Compact screen layouts (epic #1135)"
Cohesion: 0.29
Nodes (7): Challenges — `ChallengesPage` Factory / Daily tabs (#1139), Compact screen layouts (epic #1135), Compute (Flops) — `ComputeFlopsPage` (#1138), Factory feature cards (#1137), Firmware → Automation (#1140), Foundry open pool (#1142), Power merge chain (#1141)

### Community 170 - "economy-change-review/SKILL.md"
Cohesion: 0.33
Nodes (5): 1. Scope check, 2. Find the originating issue, 3. Field-by-field diff against the approved table, 4. Migration coverage for renamed/removed ids, 6. Report

### Community 171 - "simulate-run-times/SKILL.md"
Cohesion: 0.40
Nodes (4): Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run

### Community 172 - "BuyModeToggle/index.jsx"
Cohesion: 0.60
Nodes (4): BuyModeToggle(), ChoiceButton, OPTIONS, Row

### Community 173 - "getPrestigePowersPerPp"
Cohesion: 0.67
Nodes (4): getPrestigeDoublePpHalvingLevels(), getPrestigePowersPerPp(), getPrestigePpPerPower(), compressionStep()

### Community 174 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

## Knowledge Gaps
- **7 isolated node(s):** `PackageDescription`, `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js`, `file:src/game/storagePrefix.js`, `file:src/game/storagePrefix.test.js` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1030 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design history & rationale` connect `Design history & rationale` to `MainPage/index.jsx`, `navAttention.js`, `engine.test.js`, `Automation workflows`, `Constants (`src/game/layers.js`)`, `mergeState`, `One-shot auto-convert`, `README.md`, `Economy model — Byte Foundry (full text)`, `Distribution`, `Key engine functions (`src/game/engine.js`)`, `Documentation`, `Economy model — Byte Foundry (full text)`, `Byte Foundry`, `isProductionFrozen`, `tickGame`, `hasAffordableAutomationPerk`, `Achievements (epic #1046, basic slice)`, `Testing`, `BoostBadge/index.jsx`, `Foundry multiplier bar: one diverging bar tried and dropped (2026-10)`, `createInitialGameState`, `activateComputeBoost`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Are the 266 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `activateComputeBoost()` and `applyAutobuyerMilestones()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 266 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `file:scripts/lint-conflict-markers.mjs`, `file:scripts/lint-conflict-markers.test.js` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DailyTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `navAttention.test.js` to `layers.js`, `engine.challengesTier.test.js`, `engine.test.js`, `configure-ios-plist.mjs`, `App.test.jsx`, `storage.js`, `FactoryTab.test.jsx`, `SettingsPage/index.jsx`, `Achievements (epic #1046, basic slice)`, `package.json`, `ref_node_fs`, `adaptSaveForCurrentSchema`, `dailyChallenges.test.js`, `ChallengesPage/index.jsx`, `admobAdapter.js`, `config.js`, `firebaseBackend.js`, `src/index.jsx`, `capacitorConfig.test.js`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `MainPage()` (e.g. with `Byte Foundry` and `Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework`) actually correct?**
  _`MainPage()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `MainPage/index.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05921325051759834 - nodes in this community are weakly interconnected._