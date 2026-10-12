# Graph Report - wt730  (2026-10-12)

## Corpus Check
- 126 files · ~571,420 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 31 file(s) not represented in the graph (top: .xml 10, (none) 9, .properties 2)

## Summary
- 1734 nodes · 6671 edges · 94 communities (68 shown, 26 thin omitted)
- Extraction: 68% EXTRACTED · 32% INFERRED · 0% AMBIGUOUS · INFERRED: 2122 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `14f0e6b1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AppDelegate
- MainPage
- activateComputeBoost
- layers.js
- navAttention.js
- ComputePage
- storage.js
- Automation workflows
- Pool-local resets
- App.jsx
- Tens
- MainPage reference
- tickGame
- Key engine functions (`src/game/engine.js`)
- DevModePage/index.jsx
- engine.js
- clampNonNegative
- Constants (`src/game/layers.js`)
- run-simulation.mjs
- useIncrementalGame
- [Unreleased]
- bump-version.mjs
- engine.test.js
- check-graphify-freshness.mjs
- ComputeFlopsPage/index.jsx
- contrast.js
- AGENTS.md
- Testing
- SettingsPage/index.jsx
- InfoPage
- provisionDisk
- CLAUDE.md
- classify-claude-failure.test.js
- Shared components reference
- Byte Foundry
- ExampleInstrumentedTest.java
- package.json
- Economy model
- applyDevGameStateJson
- Changelog
- isMemoryCapacityAtCap
- devDependencies
- DiskArrayRow
- scripts
- ByteFoundryPage
- TIER_DEFINITIONS
- getEffectiveTierTickSpeedSeconds
- Procedure
- Automation workflows
- ref_node_fs
- backlog-issue-hygiene.sh
- dependencies
- epic-407-issue-hygiene.sh
- file-task-issue/SKILL.md
- getSaveIncompatibilityReason
- generate-pwa-icons.mjs
- End-to-end specs (Playwright)
- MainActivity.java
- browserslist
- economy-change-review/SKILL.md
- optimize-ai-files/SKILL.md
- @playwright/test
- react
- orphan-branch-scan.sh
- Package.swift
- palette.md
- CapApp-SPM/README.md
- resolutions
- sync-release-milestones.sh
- classify-claude-failure.sh
- adversarialReviewMarker.js
- pull_request_template.md
- jsconfig.json
- Button/index.jsx
- publish-strategy.sh
- Copilot Instructions
- enable-auto-merge-if-eligible.sh
- pr-low-risk-eligible.sh
- graphify
- session-start.sh
- PWA_REFERENCE.md
- resolve-pr-threads.sh
- mergeState
- claude-deny-settings.sh
- pr-head-guard.sh

## God Nodes (most connected - your core abstractions)
1. `Key engine functions (`src/game/engine.js`)` - 238 edges
2. `Byte Foundry` - 158 edges
3. `MainPage()` - 146 edges
4. `ByteFoundryPage()` - 118 edges
5. `tickGame()` - 106 edges
6. `MainPage reference` - 99 edges
7. `Testing` - 85 edges
8. `Pool-local resets` - 80 edges
9. `useIncrementalGame()` - 77 edges
10. `clampNonNegative()` - 76 edges

## Surprising Connections (you probably didn't know these)
- `A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too` --references--> `formatCapacityLabel()`  [INFERRED]
  docs/DESIGN_HISTORY.md → .claude/skills/simulate-run-times/run-simulation.mjs
- `Mobile build (`mobile-build.yml`)` --references--> `App()`  [INFERRED]
  docs/AUTOMATION.md → src/App.jsx
- `Changed` --references--> `DiskArrayRow()`  [INFERRED]
  CHANGELOG.md → src/components/DiskArrayRow/index.jsx
- `Fixed` --references--> `formatCurrency()`  [INFERRED]
  CHANGELOG.md → src/game/engine.js
- `Why `getTierCost` uses a multiplier form, not a literal power` --references--> `getTierCost()`  [INFERRED]
  docs/DESIGN_HISTORY.md → src/game/engine.js

## Import Cycles
- None detected.

## Communities (94 total, 26 thin omitted)

### Community 0 - "AppDelegate"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 1 - "MainPage"
Cohesion: 0.06
Nodes (74): ButtonContent(), ButtonIcon, ButtonLabel, formatBytes(), getAutoPrestigeAttemptRate(), getAutoPrestigeCost(), getNextBytePowerProgressFraction(), getPrestigeDoublePpUpgradeCost() (+66 more)

### Community 2 - "activateComputeBoost"
Cohesion: 0.18
Nodes (20): Compute Boost: Reclaim and Forfeit made mutually exclusive — 2026-09-04, activateComputeBoost(), canActivateComputeBoost(), canForfeitComputeBoost(), canReclaimComputeBoost(), canStackComputeBoost(), forfeitComputeBoost(), getBiggestComputeTierWaitingOnMerge() (+12 more)

### Community 3 - "layers.js"
Cohesion: 0.04
Nodes (110): version, vitest, ALL_TIER_IDS, allTiersSmartSeed(), derivePurchaseFieldsFromCounts(), seedMainGameState(), TIER_UNLOCK_PREV_LEVEL_REQUIREMENT, AUTO_PRESTIGE_AUTOBUYER_COST (+102 more)

### Community 4 - "navAttention.js"
Cohesion: 0.07
Nodes (52): Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate, Ladder screen renamed back to Byte Factory (reverses #399/#431) — 2026-08-31, getComputeFieldEffectiveCap(), isAutoMergeCloudsIntoDatacenterUnlockAvailable(), isAutoMergeClustersIntoNetworkUnlockAvailable(), isAutoMergeCoresIntoNodeUnlockAvailable(), isAutoMergeDatacentersIntoSupercomputerUnlockAvailable(), isAutoMergeFabricsIntoCloudUnlockAvailable() (+44 more)

### Community 5 - "ComputePage"
Cohesion: 0.12
Nodes (30): isComputeMergeStartAvailableAtBoundary(), ActiveBoostRow, ArmedStatusText, AutoBoostLabel, AutoBoostRow, BoostRow, canMerge(), CompactButton (+22 more)

### Community 6 - "storage.js"
Cohesion: 0.19
Nodes (25): buildDefaultMeta(), buildEraseAllSavesConfirmMessage(), buildResetActiveSlotConfirmMessage(), buildResetByteFoundryConfirmMessage(), coerceMeta(), completeDummySupporterPurchase(), defaultSlotName(), FREE_SLOT_COUNT (+17 more)

### Community 7 - "Automation workflows"
Cohesion: 0.14
Nodes (14): Auto-merge merge method must match the Main ruleset (2026-08-20), Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire, Automation design principles, Automation workflows, Cursor-powered successor engine removed (never enabled) — 2026-09-14, Orchestration model — background, Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit, Permission block reasoning (+6 more)

### Community 8 - "Pool-local resets"
Cohesion: 0.29
Nodes (14): Pool-local resets, Four bot-review findings on the pool-liveness/Data-Lake PR: manual-fill overspend, a dead Fill button, a stale doc paragraph, and a UI/engine buffer mismatch, Per-pool Memory buffers: a real intermediary reservoir between the Data Stream and Storage spending, Provision Disk's post-funding build timer duplicated the wait already spent funding it, getDiskCost(), getDiskProvisionPassesRequired(), getPoolBufferBits(), getPoolBufferFillFraction() (+6 more)

### Community 9 - "App.jsx"
Cohesion: 0.13
Nodes (23): styled-components, App(), GATE_EXEMPT_PAGES, PageShell, resolveInitialThemeMode(), isComputeCoreConversionUnlocked(), loadThemePreference(), saveThemePreference() (+15 more)

### Community 10 - "Tens"
Cohesion: 0.15
Nodes (9): Economy model reference, Byte Foundry, Core economy, Game architecture, Game design, Guide, Scripts, Security notes (+1 more)

### Community 11 - "MainPage reference"
Cohesion: 0.19
Nodes (23): "0.xyz <unit>" fractions eliminated from every Byte/bit-denominated display, Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature, Data Stream balance: raw-bits fallback narrowed to self-sizing into a finer unit; Pool Bandwidth moved beside its title, Data Stream/pool balances skip their padded trailing zeros once full for more than a second, Pool 1 byte generator: binary Memory units, doubling capacity cap, ×4 Bandwidth ladder (#457, epic #456), Pool Capacity's SI-clean doubling mechanic reverted — it broke the Data Stream tile's own binary display, MainPage reference, flooredBitsLabel() (+15 more)

### Community 12 - "tickGame"
Cohesion: 0.12
Nodes (43): 5. Authorization boundary, actMainBuys(), wouldAutobuyerStall(), Architecture / MainPage UI decisions, Cost-epoch exponent sequence changed a third time: Fibonacci replaced with a linear-increment one, Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately, `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model, `getTierCost` split into per-unit price vs. level-total price (+35 more)

### Community 13 - "Key engine functions (`src/game/engine.js`)"
Cohesion: 0.12
Nodes (34): Byte Foundry, Byte Foundry gate made permanent, one-time-ever; fill-multiplier instant loss beyond 200%; gauge relocated inside the tile — 2026-09-02, ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight, Factory MoneyHero frozen after Kilobytes → Bytes (#430 / #442), Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder, Removing Claim Core: superseded by Data Lake Boosters, Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix, The per-cycle transfer budget cap was removed — the transfer row mirrors tier01's own purchase-block progress instead (+26 more)

### Community 14 - "DevModePage/index.jsx"
Cohesion: 0.16
Nodes (20): ButtonGrid, coerceDraft(), Details, DevModePage(), FieldLabel, FieldNode(), FieldRow, Header (+12 more)

### Community 15 - "engine.js"
Cohesion: 0.06
Nodes (54): areStoragePoolDisksFull(), BIT_UNIT_SYMBOLS, combineIntroByte(), COMPUTE_MERGE_TIMER_FIELDS, currencyNumberFormatter, enableAutoMergeCloudsIntoDatacenter, enableAutoMergeClustersIntoNetwork, enableAutoMergeCoresIntoNode (+46 more)

### Community 16 - "clampNonNegative"
Cohesion: 0.13
Nodes (39): 2. Load the repo's invariants, What it does, Era ascension and Eons — meta-prestige above Unbounded (#407 / #405), Era ascension and Eons (#407), Pause/resume for per-tier automations, Pause/resume for the global automations, Prestige Points, autobuyer unlock, and the tickspeed multiplier, The global tickspeed multiplier (+31 more)

### Community 17 - "Constants (`src/game/layers.js`)"
Cohesion: 0.23
Nodes (16): actTickspeed(), `consumeXpForLastTierTickspeed` gained an owned-count guard after a real softlock report, Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number, Constants (`src/game/layers.js`), Prestige and the Googol freeze, consumeXpForLastTierTickspeed(), getLastTierXpTickspeedMinConsumption(), getMoneyExponent() (+8 more)

### Community 18 - "run-simulation.mjs"
Cohesion: 0.14
Nodes (19): actPlayer(), actSpeedBonus(), countUnlockedAutobuyers(), DEFAULT_CAPACITY_CAPS_BITS, defaultCareerPrestiges, defaultPPValues, emit(), formatCapacityLabel() (+11 more)

### Community 19 - "useIncrementalGame"
Cohesion: 0.24
Nodes (24): Dev Mode, Security notes, `OfflineProgressNotice/index.jsx`, Offline progress, applyOfflineProgress(), getOfflineEffectiveSeconds(), clearAllSaveProgress(), clearDevGameState() (+16 more)

### Community 20 - "[Unreleased]"
Cohesion: 0.13
Nodes (15): Accessibility, Added, Added, Added, Changed, Changed, Changed, Changed (+7 more)

### Community 21 - "bump-version.mjs"
Cohesion: 0.16
Nodes (21): Release (`release.yml`), assertUnreleasedWellFormed(), buildReleasedBody(), bumpSemver(), determineBumpType(), EMPTY_UNRELEASED, EMPTY_UNRELEASED_BODY, extractVersionSection() (+13 more)

### Community 22 - "engine.test.js"
Cohesion: 0.05
Nodes (22): eraseAllComputeTokens(), getDataStreamFillFraction(), isAnyComputeMergeInFlight(), isLaterPoolProvisioningLocked(), eraEligibleState(), noOtherUpgradesLeft, unlockedLastTierState(), withIntro() (+14 more)

### Community 23 - "check-graphify-freshness.mjs"
Cohesion: 0.26
Nodes (9): analyzeGraphifyFreshness(), collectGraphifySourceFiles(), externalSourceNames(), findUncoveredGraphifyFiles(), GRAPHIFY_INDEXED_EXTENSIONS, isExternalModuleRef(), main(), REPO_ROOT (+1 more)

### Community 24 - "ComputeFlopsPage/index.jsx"
Cohesion: 0.18
Nodes (22): PP Compute (Flops), Money, canBuyComputeFlopsTier(), formatAmount(), formatComputeFlopsBoost(), formatComputeFlopsTotal(), getComputeFlopsTierCost(), getComputeFlopsTierWeight() (+14 more)

### Community 25 - "contrast.js"
Cohesion: 0.33
Nodes (8): AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT, getContrastRatio(), hexToRgb(), relativeLuminance(), srgbChannelToLinear(), themes

### Community 26 - "AGENTS.md"
Cohesion: 0.07
Nodes (30): Adding a new tier, AI-instruction file cost hygiene, Architecture, Automation design principles, Automation engine, Budget discipline, Changelog convention, Code review tooling (+22 more)

### Community 27 - "Testing"
Cohesion: 0.11
Nodes (54): Architecture, actFoundry(), A fourth Codex round: the "absolute ceiling" clamp itself was too high, A live tap bonus could survive into the pool gauge's mode switch, breaking the "clean transition at 50%" claim, A third Codex round: invisible cache activity, a stale Fill tooltip, a Buy button hidden behind Scale Out, and an unclamped legacy-save buffer, A third-party automation agent's merge-conflict resolution left insecure scratch scripts and a corrupted committed graph on `main`, Bandwidth cap corrected to sqrt(Capacity in Bytes), not raw bits; Storage pools switched to SI display, Compute Boost base presets: fixing a total-extra-production ordering bug (+46 more)

### Community 28 - "SettingsPage/index.jsx"
Cohesion: 0.22
Nodes (17): buildClearSlotConfirmMessage(), buildSparklinePath(), CodeForm, CodeInput, Header, LockedNote, MuseumItem, MuseumList (+9 more)

### Community 29 - "InfoPage"
Cohesion: 0.19
Nodes (12): Project, CLAUDE.md Economy model duplication trim — 2026-09-03, Theming reference, Header, InfoPage(), RootDiv, Section, VersionText (+4 more)

### Community 30 - "provisionDisk"
Cohesion: 0.13
Nodes (46): Fixed, Removed, Critical: reverted a broken `buyBooster` bulk-purchase optimization that had merged onto `main` — 2026-09-09, Design history & rationale, Devin Review on PR #608: an unreachable self-heal branch, a legacy-save wake-up gap, two stale docs — 2026-09-08, Devin Review on PR #608, round 2: Reset Byte Foundry's replay cap could be bypassed by the new auto-continue — 2026-09-08, Devin Review on PR #608, round 3: the cap-clearing fix above didn't stop a single-call overshoot or the same gap via save load — 2026-09-09, Devin Review on PR #608, round 4: closed the bug class at its one true chokepoint instead of patching another arming site — 2026-09-09 (+38 more)

### Community 31 - "CLAUDE.md"
Cohesion: 0.10
Nodes (19): AI-instruction file cost hygiene, Automation workflows, Changelog convention, Commands, Documentation, Economy model, Funding, GitHub Milestones (release grouping) (+11 more)

### Community 32 - "classify-claude-failure.test.js"
Cohesion: 0.18
Nodes (3): script, zeroWork, script

### Community 33 - "Shared components reference"
Cohesion: 0.17
Nodes (14): `AppMenu/index.jsx`, `AppNav/index.jsx`, `Button/index.jsx`, `ConfirmDialog/index.jsx`, `IncompatibleSaveNotice/index.jsx`, `Money/index.js`, Shared components reference, `StatCard/index.js` (+6 more)

### Community 34 - "Byte Foundry"
Cohesion: 0.07
Nodes (100): Changed, `ByteFoundryPage` pool layout, A fifth and sixth Devin finding on the same PR: a one-tick lake-overflow lag, and a currency-destroying overshoot in fillDataLakeDisks it exposed, A fourth Devin finding on the same PR: the disk-square decomposition could strand real, spendable units with no square to show for them, A ninth finding: a lake's escalating Booster cost could outgrow its own permanently-capped capacity, bricking it forever, A seventh Codex round: a real engine bug, and the simulator's own "hard cap" had gone stale too, A seventh finding: the pool gauge could display a nonzero incoming-overflow rate on an already-full lake, A sixth Codex round: the player-facing Guide and the pacing simulator hadn't caught up either (+92 more)

### Community 36 - "package.json"
Cohesion: 0.11
Nodes (17): name, packageManager, private, type, @capacitor/android, @capacitor/cli, @capacitor/core, @capacitor/ios (+9 more)

### Community 37 - "Economy model"
Cohesion: 0.08
Nodes (43): actSoftResets(), Strategy snapshots (orphan branch) — required after every run, Usage, When editing the simulation, When to re-run, Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation, Compute Boost tier scaling: 4× effect only, no duration enhancement (#363), Economy model (+35 more)

### Community 38 - "applyDevGameStateJson"
Cohesion: 0.20
Nodes (15): 2024-05-24 - Content Security Policy (CSP) unsafe-eval, 2024-10-25 - Prototype Pollution in `isPlainObject` Function, 2024-10-27 - Prototype Pollution via 'prototype' Key, 2024-11-20 - Prototype Pollution Vector via `prototype` key, 2024-11-25 - Defense in Depth: Referrer Policy, 2024-12-07 - Content Security Policy (CSP) unsafe-inline, 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation, 2026-08-25 - Defense in Depth: Content Security Policy (+7 more)

### Community 39 - "Changelog"
Cohesion: 0.11
Nodes (18): [0.1.0] - 2026-07-05, [0.2.0] - 2026-07-12, [0.3.0] - 2026-07-13, [0.4.0] - 2026-07-13, [0.5.0] - 2026-07-14, Added, Added, Added (+10 more)

### Community 40 - "isMemoryCapacityAtCap"
Cohesion: 0.14
Nodes (26): Added, actCapacityUpgrade(), A fifth Codex round: three doc/UI-text stragglers left by the earlier fix rounds, Data Stream / Buffer rename; Capacity Sacrifice removed (#506; superseded by #456) — 2026-08-27, Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens, `isMemoryCapacityAtCap` silently re-coupled Capacity growth to disk-build progress, making the pool-liveness decoupling above unreachable, Pool 10's buffer ceiling landed a ULP below its own largest disk's face value — 2026-09-08, Pool Capacity doubling mechanic itself corrected to land on SI-clean intermediate steps (+18 more)

### Community 41 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, @capacitor/cli, fast-check, jsdom, @playwright/test, sharp, @testing-library/dom, @testing-library/jest-dom (+6 more)

### Community 42 - "DiskArrayRow"
Cohesion: 0.08
Nodes (57): `DiskArrayRow/index.jsx`, A Devin Review finding on the PR above: the target-stranded gate broke cross-tier-boundary write-cache chains — removed the "stranded" gate from write-cache entirely, A Devin Review pass on the idle-disk-liquidation removal found write-cache still consuming stranded disks, A further Devin Review finding on the same area: pausing a stranded write-cache merge still lost its progress to Prestige — fixed by making diskWriteCache/diskReadCacheFlush Prestige-permanent, A second Devin Review finding on the same PR: the level-1 cache fallback could spend cache out from under an in-flight read-cache flush, leaving it stuck for its whole remaining duration then producing no disk, A tenth finding: idle disk liquidation could starve a still-needed write-cache merge of its own source disks, An adversarial review pass on PR #603 caught the new cross-tier-boundary test asserting a false "would have failed under the prior fix" claim, Disk redemption: from price coincidence to a fixed one-to-one tier+level mapping (+49 more)

### Community 43 - "scripts"
Cohesion: 0.14
Nodes (14): scripts, audit, build, build:capacitor, bump-version, cap:android, cap:ios, cap:sync (+6 more)

### Community 44 - "ByteFoundryPage"
Cohesion: 0.09
Nodes (44): The multiplier bar moved below the balance, with its percent readout below the bar itself, getDataStreamBaseMultiplierPercent(), getDataStreamMultiplierPercent(), getFillMultiplierPercent(), getPoolBaseMultiplierPercent(), getPoolMultiplierPercent(), getPoolTapBonusPercent(), isMemoryCapacityUpgradeArmable() (+36 more)

### Community 45 - "TIER_DEFINITIONS"
Cohesion: 0.23
Nodes (15): allResourceIds(), getFlopsAutobuyerUnlockEra(), isEraEligible(), withScaleUpCount(), TIER_DEFINITIONS, Badge, Category, CategoryHeading (+7 more)

### Community 46 - "getEffectiveTierTickSpeedSeconds"
Cohesion: 0.19
Nodes (20): Last tier's XP-funded tickspeed: from additive to multiplicative, Multiplier overflow safety: the switch to compounding needed a floor, Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework, Overclock: from a standalone multiplier to a Tickscale-upgrade step boost, Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too, Tier tickspeed upgrade reverted from +1% to +10% per level — 2026-09-14, Multiplier outcomes are floored, Multiplier overflow safety (+12 more)

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

### Community 52 - "dependencies"
Cohesion: 0.18
Nodes (11): dependencies, @capacitor/android, @capacitor/core, @capacitor/ios, @fontsource/inter, @fontsource/space-grotesk, react, react-dom (+3 more)

### Community 53 - "epic-407-issue-hygiene.sh"
Cohesion: 0.53
Nodes (8): add_label_if_missing(), close_if_open(), has_marker_comment(), issue_state(), post_comment_once(), run(), set_milestone_if_missing(), epic-407-issue-hygiene.sh script

### Community 54 - "file-task-issue/SKILL.md"
Cohesion: 0.25
Nodes (7): 0. `claude-task` backlog issue vs. interactive tracking issue, 1. Use the template, section by section, 2. Label conventions, 3. Conflict-avoidance sequencing, 4. Epics and sub-issues, 5. Specs go stale — write defensively, and re-verify before filing a rewrite, 6. When an issue needs no PR

### Community 55 - "getSaveIncompatibilityReason"
Cohesion: 0.38
Nodes (8): SAVE_SCHEMA_VERSION, getSaveIncompatibilityReason(), isPlainObject(), LEGACY_TIER_IDS, mapHasLegacyTierId(), TIER_MAP_FIELDS, adaptSaveForCurrentSchema(), stripSaveEnvelope()

### Community 56 - "generate-pwa-icons.mjs"
Cohesion: 0.21
Nodes (11): App icon redesigned from a plain "10" text glyph to an 8-cell "byte" grid, sharp, faviconSizes, faviconSvg, GRADIENT_STOPS, gridSvg(), overwrite(), pngSize() (+3 more)

### Community 57 - "End-to-end specs (Playwright)"
Cohesion: 0.50
Nodes (3): End-to-end specs (Playwright), Updating baselines when a PR intentionally changes the UI, Visual regression (`visual-regression.e2e.js`)

### Community 59 - "browserslist"
Cohesion: 0.67
Nodes (3): browserslist, development, production

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

### Community 68 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, **/fast-uri, **/filelist/minimatch/brace-expansion, **/glob/minimatch/brace-expansion, **/nanoid, **/uuid

### Community 69 - "sync-release-milestones.sh"
Cohesion: 0.67
Nodes (5): assign_milestone(), ensure_milestone(), milestone_number(), run(), sync-release-milestones.sh script

### Community 71 - "adversarialReviewMarker.js"
Cohesion: 0.80
Nodes (3): formatAdversarialReviewMarker(), hasAdversarialApproveForHead(), parseAdversarialReviewMarker()

### Community 76 - "pull_request_template.md"
Cohesion: 0.50
Nodes (3): Documentation, Summary, Test plan

### Community 77 - "jsconfig.json"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, include

### Community 78 - "Button/index.jsx"
Cohesion: 0.12
Nodes (28): Compute merge timers from live Core earn ×10; Auto-Boost 30 PP; forfeit with confirm (#377/#380), Button, clampPercent(), getGlowRgb(), hexToRgb(), NAMED_GLOW_RGB, progressFill(), pulse (+20 more)

### Community 106 - "mergeState"
Cohesion: 0.21
Nodes (12): End-to-end testing, Testing, Migration in `src/save-migration/`, runs on every load — 2026-08-22, createEmptyDataLakes(), createEmptyDataLakeTier(), applyPendingComputeGrants(), getLegacyPendingTransferCount(), isLegacyDataLakeTier() (+4 more)

## Knowledge Gaps
- **8 isolated node(s):** `PackageDescription`, `@capacitor/android`, `@capacitor/core`, `@capacitor/ios`, `react-is` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 365 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design history & rationale` connect `provisionDisk` to `Byte Foundry`, `activateComputeBoost`, `navAttention.js`, `Economy model`, `Automation workflows`, `isMemoryCapacityAtCap`, `Tens`, `tickGame`, `Key engine functions (`src/game/engine.js`)`, `getEffectiveTierTickSpeedSeconds`, `Testing`, `InfoPage`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Are the 237 inferred relationships involving `Key engine functions (`src/game/engine.js`)` (e.g. with `DataLakePanel()` and `DiskArrayRow()`) actually correct?**
  _`Key engine functions (`src/game/engine.js`)` has 237 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `@capacitor/android`, `@capacitor/core` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AppDelegate` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._
- **Why does `MainPage()` connect `MainPage` to `Shared components reference`, `Byte Foundry`, `layers.js`, `Economy model`, `App.jsx`, `MainPage reference`, `tickGame`, `Key engine functions (`src/game/engine.js`)`, `getEffectiveTierTickSpeedSeconds`, `Button/index.jsx`, `clampNonNegative`, `Constants (`src/game/layers.js`)`, `run-simulation.mjs`, `useIncrementalGame`, `TIER_DEFINITIONS`, `ComputeFlopsPage/index.jsx`, `InfoPage`, `provisionDisk`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 157 inferred relationships involving `Byte Foundry` (e.g. with `ButtonContent()` and `progressFill()`) actually correct?**
  _`Byte Foundry` has 157 INFERRED edges - model-reasoned connections that need verification._
- **Should `MainPage` be split into smaller, more focused modules?**
  _Cohesion score 0.055135135135135134 - nodes in this community are weakly interconnected._