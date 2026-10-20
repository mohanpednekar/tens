# Graph Report - tens  (2026-10-17)

## Corpus Check
- 134 files · ~578,220 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 30 file(s) not represented in the graph (top: .xml 10, (none) 8, .properties 2)

## Summary
- 1799 nodes · 6900 edges · 95 communities (69 shown, 26 thin omitted)
- Extraction: 69% EXTRACTED · 31% INFERRED · 0% AMBIGUOUS · INFERRED: 2155 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eb7a4852`
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
- loadGameState
- run-simulation.mjs
- Key engine functions (`src/game/engine.js`)
- DevModePage/index.jsx
- engine.js
- createInitialGameState
- AppNav
- tickGame
- useIncrementalGame
- fillDataLakeManually
- bump-version.mjs
- formatCurrency
- Byte Foundry
- ComputeFlopsPage/index.jsx
- theme/index.jsx
- AGENTS.md
- MilestonesPage/index.jsx
- SettingsPage/index.jsx
- ExampleInstrumentedTest.java
- provisionDisk
- react
- Offline progress
- DataLakePanel
- getTierCost
- package.json
- simulate-run-times/SKILL.md
- MainActivity.java
- [Unreleased]
- Testing
- devDependencies
- DiskArrayRow
- scripts
- ByteFoundryPage
- mergeStateForDevWrite
- clampNonNegative
- Procedure
- Automation workflows
- ref_node_path
- backlog-issue-hygiene.sh
- stateFields.js
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
- mergeDataLakes
- palette.md
- buyComputeFlopsTier
- sync-release-milestones.sh
- adversarialReviewMarker.js
- coerceMeta
- pull_request_template.md
- jsconfig.json
- styled-components
- Tens
- publish-strategy.sh
- End-to-end specs (Playwright)
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- graphify
- check-graphify-freshness.mjs
- Button/index.jsx
- session-start.sh
- PWA_REFERENCE.md
- resolve-pr-threads.sh
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 242 edges
2. `Byte Foundry` - 158 edges
3. `MainPage()` - 128 edges
4. `ByteFoundryPage()` - 119 edges
5. `tickGame()` - 106 edges
6. `MainPage reference` - 104 edges
7. `Testing` - 87 edges
8. `useIncrementalGame()` - 83 edges
9. `clampNonNegative()` - 77 edges
10. `Byte Foundry` - 74 edges

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

## Communities (95 total, 26 thin omitted)

### Community 0 - "lint-workflow-shell.mjs"
Cohesion: 0.35
Nodes (8): yaml, bashSyntaxError(), collectYamlFiles(), defaultLintPaths(), extractRunBlocks(), lintFiles(), main(), sanitizeExpressions()

### Community 1 - "MainPage"
Cohesion: 0.06
Nodes (59): Architecture / MainPage UI decisions, Prestige info is hidden until first prestige, clampPercent(), progressFill(), getNextBytePowerProgressFraction(), getTierPurchasedCount(), AutoChip, BalancesSentinel (+51 more)

### Community 2 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 3 - "layers.js"
Cohesion: 0.03
Nodes (108): version, ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_BASE_INTERVAL_SECONDS, AUTO_PRESTIGE_COST (+100 more)

### Community 4 - "navAttention.js"
Cohesion: 0.06
Nodes (73): Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, vitest, allResourceIds(), getComputeFieldEffectiveCap(), getIntroKilobyteConversionCost(), getPrestigeDoublePpUpgradeCost(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable() (+65 more)

### Community 5 - "ComputePage"
Cohesion: 0.09
Nodes (53): Boosters UI revamp: buyBooster now pauses at COMPUTE_ENTITY_CAP; tier row buttons no longer clump left — 2026-09-17, Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, Data Lake unlock/capacity tied to real Storage progress; giant-circle CSS bug; Compute Boost reclaim floor — 2026-09-03, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost() (+45 more)

### Community 6 - "engine.test.js"
Cohesion: 0.05
Nodes (18): isAnyComputeMergeInFlight(), eraEligibleState(), noOtherUpgradesLeft, unlockedLastTierState(), withIntro(), withOwned(), withPoolBuffer(), withPrestigePoints() (+10 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "Economy model"
Cohesion: 0.10
Nodes (28): ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model, Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Prestige history: why PP replaced direct production doubling, Reintroducing the 1s-10s tickspeed ladder, Repricing tiers to real-world bit values (+20 more)

### Community 9 - "App.jsx"
Cohesion: 0.19
Nodes (18): App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), AppMenu(), Backdrop, Icon, MenuButton (+10 more)

### Community 10 - "CLAUDE.md"
Cohesion: 0.09
Nodes (21): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+13 more)

### Community 11 - "loadGameState"
Cohesion: 0.31
Nodes (10): loadGameState(), SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), isPlainObject(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema() (+2 more)

### Community 12 - "run-simulation.mjs"
Cohesion: 0.16
Nodes (15): actPlayer(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit(), formatCapacityLabel() (+7 more)

### Community 13 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.12
Nodes (38): Byte Foundry, Added, Byte Foundry, actCapacityUpgrade(), A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Sacrifice confirm: in-game dialog; Core warning only when unlocked (+30 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.23
Nodes (16): ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow, Header (+8 more)

### Community 15 - "engine.js"
Cohesion: 0.06
Nodes (55): BIT_UNIT_SYMBOLS, COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode, enableAutoMergeDatacentersIntoSupercomputer, enableAutoMergeFabricsIntoCloud (+47 more)

### Community 16 - "createInitialGameState"
Cohesion: 0.15
Nodes (33): Fixed, 2. Load the repo's invariants, End-to-end testing, actSoftResets(), Testing, Migration in `src/save-migration/`, runs on every load — 2026-08-22, `prestigeGame` wiped era/eons/hyperscalerCount/eonsUpgrades/Flops-autobuyer state on every ordinary Prestige (#626) — 2026-09-09, Removing Claim Core: superseded by Data Lake Boosters (+25 more)

### Community 17 - "AppNav"
Cohesion: 0.22
Nodes (12): Adding a new tier, Architecture, Path aliases (`vite.config.js`), Project, APP_NAV_BOTTOM_PAD, AppNav(), AttentionDot, Bar (+4 more)

### Community 18 - "tickGame"
Cohesion: 0.13
Nodes (39): actTickspeed(), `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, `PURCHASE_MILESTONE_MULTIPLIER_BASE` raised 1.1 → 1.25; a 2-vs-3-Overclock-claim "stretch/easy" retune was explored and dropped (+31 more)

### Community 19 - "useIncrementalGame"
Cohesion: 0.16
Nodes (39): Dev Mode, Security notes, Dev Mode Reference, Buy max mode, buildEraseAllSavesConfirmMessage(), BUY_MAX_PREFERENCE_KEY, clearAllSaveProgress(), clearDevGameState() (+31 more)

### Community 20 - "fillDataLakeManually"
Cohesion: 0.40
Nodes (10): actFoundry(), A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch, `getDataLakeManualFillBitsNeeded` could offer a fill that Scale Out would immediately erase, combineIntroByte(), fillDataLakeManually(), getDataLakeManualFillBitsNeeded(), getPoolBufferBits() (+2 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.16
Nodes (21): Release (`release.yml`), assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+13 more)

### Community 22 - "formatCurrency"
Cohesion: 0.38
Nodes (10): Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix, Whole-Byte tier costs converted from an arbitrary-looking bit count to Bytes in scientific notation, formatAsCleanBytesIfExactMultiple(), formatBytes(), formatCurrency(), formatMoneyBalance(), formatScientific() (+2 more)

### Community 23 - "Byte Foundry"
Cohesion: 0.19
Nodes (26): Adversarial-review follow-up to the extended-cap/one-shot-conversion PR: a stray merge corruption, a real reserve-wipe bug, and a stuck-conversion bug — 2026-09-18, Auto-merge Booster progress display, a gradually-filling 18-slot extended cap, and one-shot Data Lake conversion replacing the persistent Auto/Manual toggle — 2026-09-17, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Disk/Cache fill speeds tied to Memory bandwidth, not flat/hardcoded rates, Byte Foundry, MainPage reference, buyBooster(), enableAutoMerge() (+18 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.21
Nodes (19): canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight(), getComputeFlopsTotal(), COMPUTE_FLOPS_TIER_DEFINITIONS (+11 more)

### Community 25 - "theme/index.jsx"
Cohesion: 0.12
Nodes (21): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), GlobalStyle (+13 more)

### Community 26 - "AGENTS.md"
Cohesion: 0.11
Nodes (17): AI-instruction file cost hygiene, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling, Commands, Funding (+9 more)

### Community 27 - "MilestonesPage/index.jsx"
Cohesion: 0.38
Nodes (9): isEraEligible(), Badge, Category, CategoryHeading, Header, List, MilestonesPage(), RootDiv (+1 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.20
Nodes (18): getEonsAwarded(), buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem (+10 more)

### Community 30 - "provisionDisk"
Cohesion: 0.12
Nodes (50): Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+42 more)

### Community 32 - "react"
Cohesion: 0.29
Nodes (5): react, react-dom, web-vitals, rootElement, reportWebVitals()

### Community 33 - "Offline progress"
Cohesion: 0.17
Nodes (15): `AppMenu/index.jsx`, `AppNav/index.jsx`, `BuyMaxToggle/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, `OfflineProgressNotice/index.jsx`, Shared components reference (+7 more)

### Community 34 - "DataLakePanel"
Cohesion: 0.08
Nodes (73): Changed, `ByteFoundryPage` pool layout, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, An eighth finding: a tick spanning more than one lake-disk completion reused the first disk's stale overflow rate for the rest, An eleventh finding: the Data Lake overflow taper was sampled once per disk-completion segment, not truly continuous — making a single tick's own result depend on how it was split (+65 more)

### Community 35 - "getTierCost"
Cohesion: 0.17
Nodes (31): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), When editing the simulation, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price, Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check (+23 more)

### Community 36 - "package.json"
Cohesion: 0.07
Nodes (25): browserslist, development, production, name, packageManager, private, resolutions, **/fast-uri (+17 more)

### Community 37 - "simulate-run-times/SKILL.md"
Cohesion: 0.50
Nodes (3): Strategy snapshots (orphan branch) — required after every run, Usage, When to re-run

### Community 39 - "[Unreleased]"
Cohesion: 0.06
Nodes (32): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Accessibility, Added, Added (+24 more)

### Community 40 - "Testing"
Cohesion: 0.10
Nodes (59): Architecture, What it does, A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, Compute Boost base presets: fixing a total-extra-production ordering bug (+51 more)

### Community 41 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+7 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.07
Nodes (64): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, CLAUDE.md Economy model duplication trim — 2026-09-03 (+56 more)

### Community 43 - "scripts"
Cohesion: 0.13
Nodes (15): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+7 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.07
Nodes (66): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, Provision Disk button no longer previews progress before the player has ever clicked it (+58 more)

### Community 45 - "mergeStateForDevWrite"
Cohesion: 0.18
Nodes (16): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, 2026-08-25 - Defense in Depth: Content Security Policy (+8 more)

### Community 46 - "clampNonNegative"
Cohesion: 0.17
Nodes (32): Tiers, Prestige, Era ascension, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Era ascension and Eons (#407), Prestige and the Googol freeze, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier, buyAutoPrestige() (+24 more)

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

### Community 51 - "stateFields.js"
Cohesion: 0.38
Nodes (4): FLOPS_TIER_NAME_BY_ID, isEditableScalar(), prettifySegment(), TIER_NAME_BY_ID

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
Cohesion: 0.12
Nodes (35): Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks, Tier autobuyer/tier-tickspeed-autobuyer milestones, BuyMaxToggle(), Switch, applyAutobuyerMilestones(), getAutobuyerUnlockMilestone(), getFlopsAutobuyerUnlockEra(), getPrestigeDoublePpHalvingLevels() (+27 more)

### Community 64 - "mergeDataLakes"
Cohesion: 0.47
Nodes (6): createEmptyDataLakes(), createEmptyDataLakeTier(), getLegacyPendingTransferCount(), isLegacyDataLakeTier(), mergeDataLakes(), migrateLegacyDataLakeTier()

### Community 66 - "palette.md"
Cohesion: 0.18
Nodes (10): 2024-08-28 - Focus Visible Styles for styled-components, 2024-08-29 - Interactive polymorphic components missing focus states, 2024-09-11 - Static aria-label for Toggle Buttons with aria-pressed, 2024-10-24 - Testing Toggle Button aria-labels, 2024-11-20 - Data Lake Auto-buy button accessibility, 2025-01-31 - Focus Visible Styles for custom trigger elements, 2025-05-15 - Focus States on Styled Inputs, 2026-09-04 - Focus Visible Styles for styled native summary elements (+2 more)

### Community 68 - "buyComputeFlopsTier"
Cohesion: 0.21
Nodes (12): 2024-05-24 - Bulk Purchase State Updates in React Incremental Game, 2024-05-25 - Replace O(N) while loop for Booster bulk purchases with O(1) mathematical formulation, 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent, 2024-06-25 - Replace O(N) while loop for Compute Flops bulk purchases with O(1) loop equivalent calculation, 2024-07-28 - Replace O(N) attempts loop with O(1) batch processing for tickGame autobuyers, 2024-09-20 - Replace O(N) Compute Flops autobuyer with O(1) mathematical formulation, 2024-10-24 - Replace O(N) iterative loop in tickDiskAutoFill with O(1) mathematical formulation, buyComputeFlopsTier() (+4 more)

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 73 - "coerceMeta"
Cohesion: 0.83
Nodes (4): buildDefaultMeta(), coerceMeta(), defaultSlotName(), withSupporterSlots()

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "styled-components"
Cohesion: 0.16
Nodes (17): Changed, Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Theming reference, styled-components, Actions, Body, Card, ConfirmDialog() (+9 more)

### Community 79 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 82 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 93 - "check-graphify-freshness.mjs"
Cohesion: 0.12
Nodes (12): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+4 more)

### Community 94 - "Button/index.jsx"
Cohesion: 0.14
Nodes (23): `Button/index.jsx`, @testing-library/react, Button, ButtonContent(), ButtonIcon, ButtonLabel, getGlowRgb(), hexToRgb() (+15 more)

## Knowledge Gaps
- **8 isolated node(s):** `PackageDescription`, `@capacitor/android`, `@capacitor/core`, `@capacitor/ios`, `react-is` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 379 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design history & rationale` connect `provisionDisk` to `MainPage`, `navAttention.js`, `ComputePage`, `Automation workflows`, `Economy model`, `Testing`, `DiskArrayRow`, `Key engine functions (`src/game/engine.js`)`, `Tens`, `createInitialGameState`, `tickGame`, `Byte Foundry`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Are the 241 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 241 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `@capacitor/android`, `@capacitor/core` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MainPage` be split into smaller, more focused modules?**
  _Cohesion score 0.06284153005464481 - nodes in this community are weakly interconnected._
- **Why does `MainPage()` connect `MainPage` to `layers.js`, `navAttention.js`, `ComputePage`, `Economy model`, `App.jsx`, `CLAUDE.md`, `Key engine functions (`src/game/engine.js`)`, `createInitialGameState`, `tickGame`, `formatCurrency`, `Byte Foundry`, `ComputeFlopsPage/index.jsx`, `Offline progress`, `DataLakePanel`, `getTierCost`, `ByteFoundryPage`, `clampNonNegative`, `PerksPage/index.jsx`, `styled-components`, `Button/index.jsx`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._