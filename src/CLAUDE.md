# src/CLAUDE.md

Loaded automatically when a Claude Code session reads files under `src/`; the root `CLAUDE.md` points
here. Same rules as the root file: **current behavior only**, terse, detail in the `docs/*_REFERENCE.md`
it names, and update this file in the same commit as any code change it describes (and `AGENTS.md`'s
condensed copy). Sessions working outside `src/` that need a game rule (designer specs, economy-touching
issues, docs sync) must read this file explicitly.

## Architecture — page renderers

Continues the root `CLAUDE.md`'s "Architecture" (layers 1–2: `engine.js`, `useIncrementalGame.js`).

3. **`MainPage/index.jsx`** — a pure renderer driven by `TIER_DEFINITIONS` and the hook's `state`
   (a `game` prop from `App.jsx`, not its own `useIncrementalGame()` call). Renders each unlocked tier
   as one compact grid row. Purely game — live controls, numbers, status text; top-level destinations
   live in `App.jsx`'s shared `AppNav` (Byte Factory is this page), so MainPage carries no page-to-page
   open-* links. Full layout: `docs/MAINPAGE_REFERENCE.md`.
4. **`ByteFoundryPage/index.jsx`** — the tap screen, a pure renderer taking `{ game, focusNonce }`; how a
   save's first Prestige cycle earns its first Kilobytes. A mandatory gate while `intro.mainGameUnlocked`
   is false (AppNav omits Factory; More stays), permanently latched true the instant Storage's
   capacity threshold ("1 KiB") is crossed (`latchMainGameUnlocked`/`isStorageUnlocked`) — one-time-ever,
   never resets. Once latched, the Data Stream tile itself is the tap target (`actions.tapIntroBit`).
   Shows Data Stream (shared Compile/Bitrate/Capacity + Provision Disk in its own card) then one `PoolCard`
   per VISIBLE pool (`getVisibleStoragePoolCount`: PURE Capacity-based, independent of
   `isStoragePoolUnlocked`/`getUnlockedStoragePoolCount`, which stay disk-build-only — see "Pool liveness"
   below); each pool embeds its `DiskArrayRow`s and `DataLakePanel` (`bare`, `tierIndex={poolIndex}`).
   Disk Fill is automatic. Every action is gated by the forced priority order — Data Lake Booster
   purchases, its capacity Upgrade, and Upgrade Capacity / Bitrate are the three exceptions. Pool/staging/
   Bandwidth/Provision Disk/queue detail: **`docs/FOUNDRY_MECHANICS_REFERENCE.md`**; UI layout:
   `docs/MAINPAGE_REFERENCE.md`; formulas: `docs/ECONOMY_REFERENCE.md`; component contracts:
   `docs/COMPONENTS_REFERENCE.md`.
4a. **`StoragePage/index.jsx`** — thin reusable every-size DiskArrayRow list (ascending, via
   `getDiskSizesToShow`) — NOT the Provision Disk button, which stays on ByteFoundryPage. Takes
   `{ game }`. Primary UI path is Foundry's continuous sections; this file remains for reuse/tests. A
   pure renderer ("engine re-validates, UI just mirrors it", like every page here).
4b. **`ComputePage/index.jsx`** — Foundry **Power** screen (page id `'boosters'`; player label only), `{ game }`; reached
   via AppNav once `isComputeCoreConversionUnlocked`. Hosts the nine-boundary merge chain (Cell → Battery → … → Fusion,
   "Charge up"/"Auto-charge"; ⚡ Charge button = 1 unit/s top→bottom row then instant 8→1, `startComputeCharge`/`tickComputeCharges`) behind a later one-time `intro.computeMergePageUnlocked` reveal. "Compute" names the
   page/feature only — entities drop the word in every player-visible label. Deliberately terse (icon-only controls,
   full sentence in `title`/`aria-label`; mechanic prose lives in the Manual). Top card = Boost timer bars per running multiplier lane
   (`intro.computeBoosts`: different multipliers run in parallel and add up; same multiplier queues behind the running boost, waiting ones strongest-tier-first; one row per same-tier group, Pop-or-Forfeit on the lane's last row, Stack on its first, per `boostType`, enforced in the engine too) (Auto Boost is automatic: one token per automated charge start, `autoBoostFromTier`; its Switch + preset, like Auto-charge's pause Switch `computeAutoChargeEnabled`, live on Firmware → Automation → Power Automation);
   then per-tier rows — the ONE selected tier shows the 3 Boost presets inline. Constants: `COMPUTE_ENTITY_CAP` 10,
   `COMPUTE_MERGE_RATIO` 8, `COMPUTE_MERGE_RESERVE_CAP` 8. A boundary's first 10 manual charges build its Charger
   (`intro.chargerUnlockProgress`, `getChargerUnlockProgress`) instead of the next tier; the 10th unlocks Auto-charge
   with no sacrifice (legacy sacrifice-10 kept only for saves already holding them). Cells (`computeCores`) are bought from the matching Data Lake,
   not minted from Capacity. Detail: `docs/FOUNDRY_MECHANICS_REFERENCE.md`, `docs/MAINPAGE_REFERENCE.md`, `docs/DESIGN_HISTORY.md`.
4c. **`ComputeFlopsPage/index.jsx`** — PP **Compute (Flops)** screen (page id `'compute'`), `{ game }`; AppNav once
   `isComputeFlopsPageRevealed` (spendable PP ≥ 100, latched in `computeFlops.pageUnlocked`). Ten tiers Cores→Superclouds,
   outputs KFlops→QFlops (`COMPUTE_FLOPS_TIER_DEFINITIONS`; page keeps "Compute" + 🖥), PP-funded on the same 10³ ladder as Factory tiers, priced
   per-unit via `getCostEpochExponent` (not 8-buy blocks). Owned counts permanent across Prestige; per-cycle boost resets.
   Pure renderer — spec: `docs/ECONOMY_REFERENCE.md` "PP Compute (Flops)".
5. **`InfoPage/index.jsx`** — a static Manual page holding every mechanic's evergreen explanation in
   short bullets/sub-headings (what used to be MainPage's click-to-expand `InfoDetails` disclosures —
   Overview, Prestige ladder, Byte Foundry, Storage, Power, Compute, Accelerate, Scale Up, Overclock,
   Tier Autobuyers, Milestones, Purge, Sleep mode, Reboot). Numbers come from the same `engine.js`/`layers.js`
   constants the game uses, so they can't drift. Reads no `useIncrementalGame` state — only pure
   constants/formulas. Header shows the app version (`v{version}` from `package.json` via build-time
   import) — the **only** in-app version surface. Reached via AppNav → More → Manual.
6. **`MilestonesPage/index.jsx`** — Milestones / Reboot status screen (autobuyer unlock
   milestones live once, on Firmware → Automation — not repeated here). A timeline with no version numbers:
   The first Kilobyte, Go Googol, Open Compute, DeGoogoled, First Reboot; then one Reboots · Kernels line. Reached via AppNav → More (`page = 'milestones'`); always
   reachable, including during the Foundry gate. Takes `{ game }`. Pure renderer.
7. **`SettingsPage/index.jsx`** — always-reachable utilities via AppNav → More (`page = 'settings'`), laid out as a
    grouped list (`SettingsGroup`/`SettingsItem` in `index.jsx`: Game / Data / Display / Danger zone captions; each `SettingsItem` row shows its
    key value and expands its section in place, aria-label `"<name> settings"`; Theme is an inline control):
    Supporter pack (unlock code / dummy checkout), Cloud save (`CloudSaveSection.jsx`, only when
    `CLOUD_SAVE_ENABLED`: sign-in, upload/download, Delete account and data), Backup / Restore
    (`ManualSaveSection.jsx`, always: copy/download/paste/file → `applyCloudSave`), Store
    (`StoreSection.jsx`, only when IAP is on), multi-slot saves, System log, Reboot
    (Reboots/Kernels display + confirm-guarded `actions.eraAscend()`), Appearance (theme preference), Task
    Manager, Legal (`LegalSection.jsx`: Privacy Policy / Terms links), and Danger zone — Reset (full save wipe) and **Reformat Byte Foundry** (Capacity /
    Storage / Compute + upgrades wipe to scratch; Compile / Upgrade Capacity / Upgrade Bitrate
    convenience-auto up to prior highs; smaller Disk sizes re-provision with no provisioning cost (one buffer fill per disk); Factory + Prestige kept). Takes `{ game, onReset,
    onResetByteFoundry, themePreference = 'system', onThemePreferenceChange }` (`onReset`/
    `onResetByteFoundry` are the confirm-guarded callbacks owned by `App.jsx`). Pure renderer
    aside from local form state.
8. **`DevModePage/index.jsx`** — dev-build-only sandbox, see "Dev Mode". Reached via AppNav → More
   (`page = 'dev'`), gate-exempt like Settings/Milestones. Takes `{ game }`.

## Economy model

### Pool-local flushes

**Lake hierarchy (#1087):** each Data Lake is one permanent 1-unit buffer (`fillBits`) + ×1/×10/×100/×1000 disks (`depositedUnits`, counts derived); pool input feeds the buffer, then timed `lakeTransfer`s move it into ×1 disks and consolidate 9 smaller disks of every denomination + a full buffer into the next size (×1000 slots come only from Flush). Boosters spend banked disks + a full buffer only; the collapsed lake shows `getDataLakeBoosterProgressPercent`. Detail: `docs/ECONOMY_REFERENCE.md` "Hierarchical lake disks".

Each Storage pool has an independent end-of-progression **flush** (`flushStoragePool`; formerly "reset"), offered only at 9/9/9 disks, with a
completely full Data Lake, when the next Booster costs more than the lake can hold. It empties only that
pool's disks, buffer, and lake (Booster state and prior reset rewards remain) and permanently adds 1,000
units of lake-only capacity. Lake speed is 10% of its pool's base Bandwidth, +10% additive per flush (`getDataLakeSpeedMultiplier`; 70% after 6; Reclamation III/IV add 5% each to every lake); flushes no longer change pool Bandwidth. After a flush the pool provisions its disks automatically and for
free, one at a time smallest-first, waiting for each disk to fill; while it rebuilds, later pools cannot
start new provisioning (already-active work may finish). Whenever all 9/9/9 disks are provisioned
(including before the first reset) — a status latched per lake (`boosterAuto`) for the whole Reboot cycle, surviving pool resets, Reformat Byte Foundry and Prestige — the lake's Booster control becomes a non-clickable cost label and
the lake automatically buys every affordable Booster until slots fill or the next cost exceeds capacity;
filling the lake at that wall enables the next reset. Pools never transfer or share resources through
this loop. Full detail: `docs/ECONOMY_REFERENCE.md`'s "Pool-local reset loop" (now the flush loop).

### Achievements (epic #1046, basic slice)

State `achievements` (`earned`, lifetime `counters.pings`) survives every reset but a full Reset; registry `ACHIEVEMENT_GROUPS`/`ACHIEVEMENT_DEFINITIONS` in `layers.js`; `detectAchievements` runs after each tick/Ping; `AchievementsPage` (page id `'achievements'`, More entry) renders them; rows show requirement progress (`getAchievementProgress(state, condition)` → `{ current, target }`, null for one-shot events (any threshold of 1) and for the `maxFirstOverclock` record counter) and the reward (`getAchievementReward(def)` = its `bonus` text or null — stars are score, not a reward; 'Reward' → 'Reward earned'; collapsed rows/toasts use the short `short`/`shortBonus` text via `getAchievementShortRequirement`/`getAchievementShortReward`), and the unlock toast shows the reward line; ordered steps of one entity (`ACHIEVEMENT_SERIES`: Ping, Reclamation (5 levels: flush 1/3/6/8/all 10 distinct pools), tier First purchase, Accelerate, Level power, Overclock step) collapse into one leveled row — display-only, each step keeps its own id/earned flag/toast. **Stars** (derived, never stored; `getAchievementGroupStars`/`getAchievementStars`): 1 per earned achievement + a completion bonus of 10% of the group's stars (rounded up) when every member is earned; total shown atop the page; a group shows only its completion bonus (⭐ +N) once complete, no per-group star counts. Long series (>4 levels, e.g. First purchase) list one short line per level. `components/AchievementToasts` (mounted in `App.jsx`) toasts each newly earned id — 5 s visible once shown, 0.25 s stagger, max 5 at once, held while the tab is hidden, offline unlocks announced via the hook's `achievementBaseline` `{ epoch, earned }` (epoch bumps on every wholesale state replacement — slot switch, import, reset, Dev Mode — which rebaselines silently and drops queued toasts). Whole feature behind `ACHIEVEMENTS_FEATURE.enabled` (on in every build). The 5 Foundry **Reclamation** achievements (`reclaim1`–`5`, `RECLAMATION_POOL_THRESHOLDS`, condition `poolsCompacted`) — flushing 1/3/6/8/every distinct pools; rewards are `RECLAMATION_LEVEL_REWARDS` applied from `getReclamationLevel(intro)` (derived from `poolExponentBonuses`, so they apply at once and need only `intro`): I/II replace the 1% plain within-pool exponent step with 2%/3% (`getDataStreamSpeedExponent`; Flush-Pool-upgraded steps stay 10%), III/IV each add +0.05 to EVERY lake's speed multiplier (`getReclamationLakeSpeedBonus` in `getDataLakeSpeedMultiplier`); V (every pool, the grand reward) syncs Bitrate to Capacity (`isBitrateSyncedToCapacity`/`getSpeedBasisBits`): Speed derives from Capacity itself, `isSpeedUpgradeArmable` is false so Upgrade Bitrate disappears from the UI, and one Upgrade doubles both; an in-flight Bitrate bar is refunded when V is earned. Without V the split Upgrade Capacity / Upgrade Bitrate stays the default. The per-pool Bitrate exponent upgrades are NOT achievements: Flush Pool itself sets `intro.poolExponentBonuses` (a pool's first two flushes upgrade its two within-pool steps; retained across Reformat/Purge/Reboot). Legacy `poolNNResetI/II` earned flags in old saves still backfill that map on load. **Spent QB** is the first achievement bonus: it gates the last tier's per-level credit (see Scale Up paragraph below). **Level power** (`levelPower1`–`10`, group `levelPower`): reaching level 10 on each tier adds `LEVEL_POWER_ACHIEVEMENT_BONUS` (0.05) to the per-level production multiplier base, which starts at `PURCHASE_MILESTONE_MULTIPLIER_BASE` (1.0) and reaches 1.5 with all ten (`getLevelMultiplierBase(state)` feeds `getPurchaseMilestoneMultiplier(level, base)`). **Overclock step** (`overclockStep1`–`3`): Patient Overclock (first Overclock of a Purge at 6+ completed last-tier levels), Overclock fast (a second claim with no Accelerate bought this Purge — `accelerateBoughtThisCycle`) and Beyond Googol (an Overclock at 12+ levels after DeGoogol) each take 1 off the Overclock step (`getOverclockRequirementStep`: `OVERCLOCK_REQUIREMENT_STEP` 4 → 1); strictly ordered — each only counts once the previous is earned. **Achievement design rule:** earning an achievement through a challenge's modified rules is a valid strategy, and some achievements may even be trivial in a challenge but extremely hard/impossible in the normal game — never mention or hint at this in any player-facing text (trigger/bonus strings, Manual, toasts, changelog). **#1051 groups (effect-free):** `power`, `firstPurge`, `latePurge`, `reboot` (25 achievements; the Storage group and the Secrets are not yet registered). New condition kinds in `isAchievementConditionMet` are state-based "at least" checks; event triggers record lifetime `achievements.counters` through `bumpAchievementCounter` (`purges`, `reformats`, `kernelsEarned`, `quickReboots`/`lastRebootPlaySeconds`, `turboBoosts`, `maxBoostStack`, `automatedPings`, `handsFreePurges`, `purgeWaitSeconds`, `overflowPurges`) from thin wrappers at the end of `engine.js` and from `tickGame`/`tickGameCore` (Overflow, Remind me later) (`purgeGame`, `eraGame`, `resetByteFoundry`, `activateComputeBoost` wrap `*Core` functions). `getLifetimePurges` = max(counter, `purge.count`). `mergeState` seeds `kernelsEarned` from the Kernel balance on load. Cycle-scoped `manualPurchaseThisCycle` is set by the hook's manual Buy via `withManualPurchaseMark`, reset by Purge/Reboot, carried through Scale Up/Overclock; saves lacking it count as manual when they show any purchase or any Scale Up / Overclock / Accelerate history. Tuning constants: `REMIND_ME_LATER_SECONDS` (60), `KERNEL_PANIC_WINDOW_SECONDS` (3600 s of `activePlaySeconds`). While a Purge is available and unclaimed, `tickGame` advances `purgeWaitSeconds`, so the Googol freeze is not a same-reference no-op until 'Remind me later' is earned. Other achievement bonuses remain deferred. Detail: `docs/ECONOMY_REFERENCE.md` "Achievements".

### Daily challenges (epic #1062)

State `daily` (`runs[formatId]`, `results[dateId][formatId]`) survives every reset but a full Reset; logic in `src/game/dailyChallenges.js` (`generateDailyChallenge`/`getDailyChallengeValidation(dateId, formatId)`, `startDailyRun`/`restartDailyRun(formatId, nowMs)`, `forfeitDailyRun(formatId)`, `tickDailyRuns(nowMs)`, `playDailyRun(formatId, actionName, arg, nowMs)`, `getDailyCredits(state, dateId)`; none reads the clock itself). Three definitions per UTC date (10 min / 1 h / 10 h), seeded by date + format + `DAILY_GENERATOR_VERSION` (bump it whenever generator data, the reference bot, or engine behavior it simulates changes — an engine diff can silently invalidate every definition), each with `DAILY_MODIFIER_POOL` levers (run game's `runLevers`, read by `getChallengeLever`), seeded progress, a seeded `startBytes`, real engine automations (`DAILY_AUTOMATIONS`) and a seeded objective (`DAILY_OBJECTIVE_KINDS`, tracked in `run.metrics` from `runPeaks`) whose target is calculated from a reference bot. A run is an isolated Factory-only game played on the real Factory page (`DailyTab`'s `RunView` renders `MainPage` with the run's game; actions → `actions.dailyPlay`). Hard rules: the bot's time must land in 5–9 min / 30–50 min / 5–8 h or the candidate is discarded; a definition reads nothing from the main save; an untouched run reaches neither the target nor `objective.attemptMark`. Sweep: `scripts/simulate-daily-challenges.mjs`. Behind `DAILY_CHALLENGES_FEATURE` + first Purge; UI = Challenges page 📅 Daily tab. Deferred: server time, fetched definitions, rewards, weekly/monthly milestones, streak, Checkpoints, Antimatter (#1063–#1072). Detail: `docs/ECONOMY_REFERENCE.md` "Daily challenges".

### Tiers, Prestige, Reboot (Era ascension)

**Player label ↔ code (issue #988; code identifiers never renamed):** Power = page id `'boosters'`; Cell → Fusion = `computeCores` → `computeMegacomputers` (merge verbs "Charge up"/"Auto-charge"); Cores → Superclouds = `flop01`–`flop10` (outputs KFlops → QFlops); Accelerate = `globalTickspeed*`/`speedUp`; Charger = a tier's 8-slot reserve row (bottom row, `getComputeReserveHeld`); Turbo/Balanced/Eco = presets `burst`/`standard`/`sustain`; Bitrate = Data Stream Speed; Bandwidth = pool speed; Staging = pool buffer; Compile = Combine; Ping = tap; Flush Pool = pool reset; Disk full = Purge-threshold overlay headline; Overflow mode = `isOverflowModeUnlocked`; Firmware = page id `'perks'`/`PerksPage`; Compression = `prestigeDoublePpLevel`; Reboot = `era`/`eraGame` (Era ascension); Kernels = `eons`; Kernel Amplifier = `eonAmplifier*`; Reformat (Byte Foundry) = `resetByteFoundry`; Milestones = page id `'milestones'` (renamed back from Releases, #1143); System log = `prestigeMuseum`; Task Manager = Ops dashboard (`opsSamples`); Backup / Restore = import/export save; Sleep mode = offline progress; Manual = page id `'info'`.

**Terminology:** "Prestige" is the umbrella term for every reset-for-rewards (Purge, Reboot,
Reformat Byte Foundry, pool resets); the Factory reset at 1 Googol Bytes is **Purge** (formerly the name Reboot, now the Era-ascension layer) and
PP reads **Purge Points**; the global tickspeed track is **Accelerate** (formerly Clock Speed/Speed Up/Latency). The Purge
rename is carried through the code too (#987): `state.purge`, `purgeGame`,
`PURGE_THRESHOLD`, `autoPurge`, automation keys `'speedUp'`/`'purge'` — while Prestige-Point,
Compression, speed-bonus, `prestigeMuseum` identifiers keep `prestige`. Pre-rename
save keys (`prestige`/`reboot` → `purge`, etc.) are renamed on load by `save-migration/migrateToV3`.

There are 10 tiers, ids `tier01` through `tier10` (`TIER_DEFINITIONS` in `src/game/layers.js`), with
display names `Kilobytes` through `Quettabytes`. Every tier is bought directly with the base currency
(`MONEY_ID = 'base'`, display name "Bits") and, once owned, produces the tier immediately below it,
cascading down the ladder; `tier01` (Kilobytes) is the special case where cost is still Bits but
production is a whole-Byte amount (`BYTES_ID = 'bytes'`, displayed as `B`) credited to Bits at
`BITS_PER_BYTE` (8) per Byte. A tier's per-level cost is `getTierCost` = `baseCost × 10^(getTierCostExponent − 1)`: exponent 1, 2, 3 for the first three levels on every tier, then +spacing per level, where spacing starts at tierNumber (tier01 1 … tier10 10) and grows by 1 after every `TIER_COST_SPACING_GROWTH_LEVELS` (10) levels at the same spacing. **Bytes and Bits are ONE pool** (`resources.base`) — there is no separate
Bytes balance; 8 Bits = 1 Byte everywhere (see `docs/DESIGN_HISTORY.md`). **Accelerate** (the global
tickspeed multiplier on MainPage, formerly "Clock Speed"/"Latency"/"Tickspeed"; code: `globalTickspeed*`, automation key `speedUp`) is paid from that Bits balance —
initial activation costs **10 Bytes (80 Bits)**. It unlocks once level 1 of tier01 is purchased; there
are no milestone bonus levels — every level compounds the same Overclock-scaled 1% step.
Reaching Money ≥ `PURGE_THRESHOLD` (`GOOGOL * BITS_PER_BYTE` = 8e100 — "1 Googol Bytes," in Bits
since a Byte is 8 Bits) freezes the economy except for Prestige — unless `isOverflowModeUnlocked(state)`
is true (permanent `purge.unboundedUnlocked` latch; unlocked once Auto-Prestige's interval is upgraded to
`OVERFLOW_MODE_MAX_INTERVAL_SECONDS` (1 s) or less, carried through Reboot), in which case production
continues and Prestige is optional (see `isProductionFrozen`). **Reboot** (`eraGame`) is a separate voluntary meta-prestige at **1 Googol unspent PP**
(`ERA_ELIGIBILITY_PP`): it awards **Kernels** (+1 base, +1 per Kernel Amplifier level — shop deferred to #414),
increments `era.count`, resets the full Foundry (generator upgrades, Disks, Data Lakes, compute ladder
entities, Memory/gate) plus the ordinary Factory cycle (`purge.points`/`count`/`prestigeDoublePpLevel`
→ 0, `computeFlops.owned` → 0, `cumulativeBoost` fresh), while keeping automation unlocks/pause flags
(except Compression level), tier/tickspeed autobuyer milestone objects, `purge.unboundedUnlocked`,
System log, hyperscalers, Kernel upgrade levels, Flops autobuyer unlock flags, and page latches. Reboot *N*
free-unlocks the *N*th Flops tier's autobuyer (Cores (KFlops) at Reboot 1, …). Hyperscalers (bought with Kernels in
#414) add permanent +0.01%/s each to every Factory tier's Flops multiplier via
`getHyperscalerFlopsBoostRate` — the engine/hook action (`buyHyperscaler`) is wired, but no page renders
a purchase control yet (deferred to #414, blocked pending maintainer-approved spend design). Full detail:
`docs/ECONOMY_REFERENCE.md`'s "Reboot and Kernels". Prestige (Purge) Points are awarded by
`getPrestigePointsAwarded`: 1 base PP at 1 Googol Bytes, then 1 PP per `PRESTIGE_POWERS_PER_PP_BASE` (64)
additional money-exponent powers beyond Googol's own 10^100 exponent, scaled by permanent Compression
upgrades (`prestigeDoublePpLevel` — each halves powers-per-PP until 1, then doubles PP-per-power; cost
`10^(level+1)` PP). Production speed bonus (`getPrestigeProductionMultiplier`) is a one-time 1 PP purchase
(`buyPrestigeSpeedBonus`/`prestigeSpeedBonusUnlocked`; Firmware → Prestige opens with a PP tutorial callout) giving
×1.1 for the 1st Purge (hardcoded `PRESTIGE_SPEED_BONUS_FIRST_PURGE_MULTIPLIER`), then ×`1 + log10(count)` (×2 at 10, ×3 at 100, ×4 at 1,000…); see `docs/ECONOMY_REFERENCE.md`. `GOOGOL` (1e100) is still exported and used by the exponent-based formulas
(`getMoneyExponent`/`getPurgePercent`) — only the live freeze/Prestige trigger moved to
`PURGE_THRESHOLD`; see `docs/DESIGN_HISTORY.md` for why. MainPage's headline balance (`MoneyHero`) switches from Bits to whole Bytes once the balance reaches
8000 Bits (`formatMoneyBalance`, `MONEY_BYTES_DISPLAY_THRESHOLD`); a small Bits subline then shows
the exact `formatCurrency` amount (absolutely positioned in the existing gap — adds no height; hidden while `balancesCompressed`). Every other `formatCurrency` call
(costs, production, the Prestige-threshold overlay) keeps reading in Bits.

**Challenge mode (epic #1037; engine #1038 + UI #1039: Challenges page 🏁 Factory tab, inline start on Global Automation rows, `ChallengeBanner` atop Factory):** state `challenges` (`active`, `activeSeconds`, `completed`, `bestSeconds`, `enteredCount`, `exitedCount`); registry `CHALLENGE_DEFINITIONS` + the `LIVE_CHALLENGE_IDS` rollout Set (F1–F25 live; tier rules are `effect`-keyed with run-scoped `challenges.run`) in `layers.js`; `enterChallenge`/`exitChallenge`/`getPurgeGoalBits`/`autoCompleteChallenges` in `engine.js` gate the three speed-upgrade buyers on completion. A challenge unlocks at `CHALLENGE_UNLOCK_PURGE_MULTIPLIER` (5) × its automation's unlock Purge (`getChallengeUnlockPurges`); tier autobuyers unlock at Purge n, tier tickspeed autobuyers at n + 10. Definitions may also carry run-wide `levers` (`production`, `clockSpeedPower`, `scaleUpPower`, `costMultiplier`; read via `getChallengeLever`, active only inside the challenge); F9 Bit Rot's corruption also falls with unlocked Foundry disk sizes (unadvertised). Balance bands + per-challenge values: `docs/ECONOMY_REFERENCE.md` "Challenge mode"; sim: `scripts/simulate-challenges.mjs`.

### Byte Foundry

Bytes are produced entirely by the **Byte Foundry** (`ByteFoundryPage`), a tap-to-earn screen every fresh
save passes through once before the main game — a ONE-TIME-EVER gate (`latchMainGameUnlocked`/
`intro.mainGameUnlocked`) gone permanently across every Prestige and Reboot once Storage's
capacity threshold is reached. Pinging fills the **Data Stream** (Buffer-capped) which Compile turns into
a permanent Byte generator; **Upgrade Capacity** / **Upgrade Bitrate** grow it one at a time
(`queueIntroSpeedUpgrade`, `tickCapacityUpgradeDrain`; sit OUTSIDE the forced priority order). Displayed
Speed is derived (`getDataStreamSpeedBytesPerSecond`, exponent `getDataStreamSpeedExponent`);
the exponent starts at 0.5, climbs by 10% toward 1.0 at each pool boundary and by 10% toward
its next pool within an array (1% by default; Reclamation I/II raise that plain step to 2%/3%); a pool's first two Flush Pool
actions upgrade that pool's two array steps to 10% toward 1.0 (`getDataStreamSpeedExponent`; details in `docs/ECONOMY_REFERENCE.md`). Reboot keeps the generator and
gate latch but resets Capacity (`buildEraIntroReset`). Recurring actions follow a **forced priority
order** Disk Fill > Provision Disk (Compute Boosts are exempt — a held token always activates; a lower one is disabled, in UI and engine, while a
higher one is available; Provision Disk outranks Compute only while ARMED — `isProvisionDiskInProgress`). An always-on auto-convert (`convertIntroBitsToKilobytes`/`tickIntroAutoInvest`)
turns Data Stream bits into free `tier01` units. Generator, Disks, Data Lakes, and every compute-ladder
entity (Cell → … → Fusion) are PERMANENT across real Prestige; only tier01's purchase-block
progress resets per cycle (the Data Stream balance is kept). Nothing here ever fully freezes.

**Hard rules (full text and the rest of the Foundry mechanics: `docs/FOUNDRY_MECHANICS_REFERENCE.md`):**
- **Fill multiplier** (`FILL_MULTIPLIER_*`, `getFillMultiplierPercent`): displayed Speed/Bandwidth never
  change; a fill-dependent multiplier (1000% empty → 100% at 50% → 10% full (log-linear)) scales only the
  real per-tick amount delivered (`getFillCurveDelta` integrates the curve so a 1s offline tick matches live 0.1s ticks).
  **Tap bonuses never scale a fill** (the curve already reaches 10×); they speed CONSUMERS ×(1 + bonus%),
  decaying 1%/s: Data Stream ping → Upgrade Capacity/Bitrate drains (`getDataStreamTapMultiplier`); pool ping →
  Provision Disk draw, read-cache flush, write-cache merges, lower-size rebuild, Data Lake drain (`getPoolTapMultiplier`).
- **Standing rule — `intro.capacity` keeps doubling plainly in binary** (IEC `KiB`/`MiB`, step 1024);
  non-binary (SI-clean/decade-power) transforms are for storage-pool-scoped values only
  (`getStoragePoolCapacity`, `getDecadePowerEquivalentBits`, `getSiCleanEquivalentBits`) — two earlier
  attempts shared one raw value between both displays and got this wrong (`docs/DESIGN_HISTORY.md`).
- **Pool liveness is Capacity-only**: a pool is live (visible, buffer/Bandwidth, read cache) once
  `intro.capacity` reaches `getPoolCapacityUnlockThresholdBits`, independent of disk builds
  (`getVisibleStoragePoolCount`). `isStoragePoolUnlocked`/`getUnlockedStoragePoolCount` stay
  disk-build-only and drive the disk ladder. Folding them into one primitive was tried and reverted.
- **Disks** (`provisionDisk`, `tickDiskAutoFill`, `tickDiskPull`, `tickDiskLevelOneCachePull`): ladder
  advances every `DISK_ARRAY_LADDER_CAP` (9) disks; Factory is funded **pull-based** from full disks,
  fully automatic (no click, no autobuyer gate). Disks/caches/builds are PERMANENT across Prestige.
  The pool's smallest size's read cache fills from its pool buffer as a timed 5× transfer (`CACHE_FILL_FROM_MEMORY_BANDWIDTH_MULTIPLIER`). Every size above its pool's smallest fills DIRECTLY from the pool buffer by default — landing the instant it is funded, no write-cache flush stage (#1087) (pool fill
  order: read cache, then write caches smallest size first); clicking an empty disk expedites it
  (`expediteDiskFill`) — it jumps ahead of the other write caches for the pool buffer, consumes the smaller full
  disks of its pool it needs in parallel alongside that buffer, and lands the instant it is funded (`docs/ECONOMY_REFERENCE.md`).
  Stranded disks are never destroyed or swept into Bits; merges never cross a pool boundary.
- **Data Lakes** (`intro.dataLakes`): a lake fill waits for a full pool buffer only to START a Booster acquisition (`acquiring`, cleared on purchase; Boosters are paid with whole disks, exact change, never broken) and is never
  interrupted once under way (`isDataLakeDiskFillStartAllowed`). Booster control is "one click, one full fill-then-buy conversion,
  then stop" until the pool's era-long `boosterAuto` latch is set (then it auto-buys); `buyBooster` spends only banked lake units, outside the
  forced priority order; sub-sizes capped 9/9/9 (`DATA_LAKE_SUB_SIZE_DISK_CAPS`).
- **Display**: each disk/cache row states its size once with its unit (`1 Kb` cache, `1 KB` disks; cells
  unlabeled; disks are circles — squares reserved for SSDs); pool/lake CAPACITY in its fixed unit
  (`formatDiskSizeInPoolUnit`); buffer BALANCE self-sizes (`formatPoolBalance`).

**The above is a summary only.** The full mechanic reference — the complete tap/combine/Speed
loop, auto-convert conversion mechanics, Storage's build/auto-fill/redeem lifecycle, Power
Cells/Batteries/Boost, every forced-priority-order predicate, cost/production formulas, the (configurable,
growing) purchase block size and level system, Prestige Points and every PP-funded automation, the
per-tier and global tickspeed multipliers, the last tier's XP-funded tickspeed, Scale Up, Overclock,
Reset, the complete game state shape, and the engine function/constants tables — lives in
`docs/ECONOMY_REFERENCE.md`. Read it (and `docs/FOUNDRY_MECHANICS_REFERENCE.md` for Foundry/Storage/Lake/Power) before touching `src/game/engine.js`, `src/game/layers.js`,
`TIER_DEFINITIONS`, `ByteFoundryPage`/`StoragePage`/`ComputePage`, or any economy/prestige/tickspeed
constant or formula — and check `docs/DESIGN_HISTORY.md` first if you're about to change a
formula/gate a past iteration may already have tried and rejected (e.g. the `<=` vs. `===`
bank-redeemability check, the flat vs. dynamic transfer cost).

**Buy max mode** (one-time `BUY_MAX_UNLOCK_COST` 2 PP purchase, `buyMaxUnlocked`/`isBuyMaxUnlocked`, never granted for free; toggled on Firmware → Prestige) — a per-device toggle
(`tens_buy_max_mode`, not game state) making each manual leveled purchase buy every affordable level:
`buyTierMaxLevels` for Factory tiers (FULL levels only; partial progress or an unaffordable full level
falls back to the ordinary single-level click) and `repeatPurchaseMax` for single-level ladders.
**Buy mode** (Level / Single; Firmware → Prestige → Purchasing, `components/BuyModeToggle`, per-device `tens_buy_unit_mode`, `buyUnitMode`/`setBuyUnitMode` on the hook): *Level* (default) = a manual Factory tier Buy fills up to the level boundary; *Single* = exactly one unit per click (`buyTierQuantity(tierId, 1)`), overriding Buy max for that button only. Tier autobuyers follow it at the same interval (`AUTOBUYER_UNIT_BATCH` passed as `autobuyerBatchSize`): one unit per attempt (a level takes a whole block of attempts; speed-upgrade bulk levels are suspended); the hook reads `buyUnitModeRef` for every tick/catch-up call (`autobuyerBatchFor`).
Detail: `docs/ECONOMY_REFERENCE.md`'s "Buy max mode".

Scale Up uses persisted, run-scoped `scaleUpTierCounts`: each claim doubles the current target and all
earlier tiers, while the newly recorded successor begins at ×1. Requirements are based on the target
tier's **completed levels** (`purchaseLevels − 1`): each of the first ten Scale Ups requires 3 completed
levels on the last unlocked tier; repeated final-tier claims then require 6, 9, 12, …. This is separate
from the re-reveal mechanic: after a reset, a tier already unlocked by a previous Scale Up within the
same Overclock re-reveals when its predecessor reaches 2 completed levels (`purchaseLevels` 3).
The last tier's (QB) tickspeed may always spend down to 0; a 0 balance alone is never a stall. The real stall is a Restage **clicked** at 0 owned QB: `restageManually` (MainPage button / Daily-run action) bypasses `consumeXpForLastTierTickspeed`'s 0-owned guard (Auto Restage keeps it), wipes every tier and Bits, and bumps lifetime `achievements.counters.emptyRestages`, which earns **Spent QB** (`condition: counter emptyRestages ≥ 1`), and once earned the last tier is credited exactly 1 unit every `10/(1 + log10 completed levels)` s regardless of balance (`getLastTierLevelCreditIntervalSeconds`, `lastTierLevelCreditTimer`; `ECONOMY_REFERENCE`). Overclock keys off the **final** tier's completed levels: first available at 5, then dynamically at (the
completed-level count the previous Overclock was taken at) + `getOverclockRequirementStep` (4, minus 1 per Overclock step achievement, min 1) — `overclockLastClaimCompletedLevels`
(the single Overclock level; each claim replaces it, nothing is banked; the Accelerate step is ×1.1 per level),
not a fixed ladder (the Accelerate Overclock-scaled 1% step is under "Tiers, Prestige, Reboot" above).

For questions about run times, time-to-prestige, or pacing/balance (e.g. how starting Prestige Points
affect a single run's length), use the `simulate-run-times` skill
(`.claude/skills/simulate-run-times/SKILL.md`): it plays out full runs with the real engine functions
rather than reasoning about the formulas by hand. **Also re-run and publish** that skill whenever
making a change that can significantly affect ideal Foundry / prestige timings (economy constants
or formulas in `engine.js`/`layers.js`, Foundry/Disk/Compute/Capacity/tickspeed/autobuyer/
prestige rules, purchase-batch behavior, or the skill's own bot strategy). Publishing writes **one
new file per run** onto the stable orphan branch `ideal-run-strategy` via
`publish-strategy.sh` (`runs/<UTC-stamp>-<sha>.md` + `README.md` index) — never merge that branch
into `main`, and do not rename it with an agent/session suffix.

**Cache Warm** (`CACHE_WARM_UNLOCK_COST` 20 PP, `cacheWarmUnlocked`): `applyCacheWarm` completes level 1 of `getCacheWarmTier` (tier of the highest Storage pool being filled — highest pool live by Capacity, `getVisibleStoragePoolCount`, disks or not; pool N ↔ tier N) free after every Purge/Scale Up/Overclock/challenge exit/Reboot (`ECONOMY_REFERENCE`). **Firmware → Prestige rows** are `UpgradeRow`s: name toggles the description, one short plain value line, usually `now → after` (`MAINPAGE_REFERENCE`).
**Sleep mode cap:** offline progress simulates at most `getMaxOfflineSeconds(state)` = 4 h + 4 h per `sleepModeCapLevel` (0–5, PP costs `SLEEP_MODE_CAP_UPGRADE_COSTS` 4/40/400/4,000/40,000; `buySleepModeCapUpgrade`) up to 24 h. Detail: `docs/ECONOMY_REFERENCE.md` "Offline progress".

**Expand/collapse convention:** only a disclosure's name/label (pool title, tier label, Accelerate/Overclock
heading, money balance) toggles it — never the surrounding card/row, a chevron strip, or revealed content.
**No link styling:** it's a game — never underline (solid, dotted or on hover) just because something is
clickable; use `cursor: pointer` and a `:focus-visible` outline instead.
**Minimal UI text (standing rule, all future work):** game screens carry only the text strictly needed (labels, numbers, state). Explanations, rules, hints and flavor go in an expandable description (disclosure per the convention above, or the Manual) — never inline.
**Segmented choices** (pick-one controls like the Boost preset): full width, equal-width buttons with a text label beside the icon — never tiny icon-only squares (`docs/COMPONENTS_REFERENCE.md`).
