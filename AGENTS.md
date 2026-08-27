# AGENTS.md

Context for AI agents working on this repository. This is a condensed pointer, not a second source
of truth — `CLAUDE.md` (plus its `docs/*.md` references) is authoritative for current behavior. If
anything below ever conflicts with `CLAUDE.md`, `CLAUDE.md` wins; fix this file to match in the same
change rather than letting the two drift (a stale mirror here is worse than no mirror at all).

## Project

**Tens** — a React incremental game. Every mechanic uses powers of ten. Top-level destinations via
shared bottom `AppNav` in progression order: **Foundry → Boosters → Compute → Ladder → Guide → More**. Storage
is under Foundry as continuous **Data Stream + Disk** sections on the same screen (not its own AppNav
item, and no second-level Memory | Storage tabs). Ladder uses **Ladder | Upgrades**
after the first Prestige. Guide and More (Milestones, Settings) are always available — even
during the Byte Foundry gate. A third More entry, **Dev Mode** (`DevModePage`), renders only in a
dev build (`import.meta.env.DEV`) — a local sandbox for seeding/experimenting with an isolated save,
never a player-facing feature; see `CLAUDE.md`'s "Dev Mode" section. Reset (full save wipe) and
Reset Byte Foundry live under Settings → Danger zone (see CLAUDE.md's SettingsPage entry for what
each wipes/keeps). No backend — state lives in React and persists to `localStorage`.

## Tech stack

| Tool | Version | Notes |
|------|---------|-------|
| React | 19 | JSX transform enabled |
| Vite | 8 | OXC-based; JSX files **must** use the `.jsx` extension |
| Vitest | 4 | Runs via `yarn test` |
| Playwright | 1 | Real-browser e2e suite, `yarn test:e2e`, chromium only |
| styled-components | 6 | All component styling |
| Yarn | 1 (Classic) | `yarn@1.22.22` via Corepack; lockfile is v1 format |

## Commands

```sh
yarn install --frozen-lockfile   # CI does this; use plain `yarn install` locally after lockfile changes
yarn dev          # dev server → http://127.0.0.1:<port>/tens/
yarn build        # production build (Pages base + PWA)
yarn build:capacitor # CAPACITOR=1 build for native wrap (relative base, no PWA plugin)
yarn cap:sync     # cap sync (after android/ios platforms exist — see #70)
yarn test         # run all tests once (Vitest)
yarn test:watch   # watch mode
yarn test:e2e     # Playwright end-to-end suite (real chromium, against yarn dev)
yarn audit        # dependency audit
yarn bump-version # cut CHANGELOG Unreleased → dated release + bump package.json
yarn gen-pwa-icons # regenerate public/pwa-*.png + apple-touch-icon.png
```

> **Critical:** Vite 8 uses OXC, which infers JSX from the file extension. Any file containing JSX
> **must** be `.jsx`, not `.js`, or the build/tests will fail.

## Repo layout

```
CLAUDE.md                ← authoritative current-behavior reference (start here)
docs/
  DESIGN_HISTORY.md       ← the "why": superseded formulas, incident write-ups, rejected alternatives —
                            check before changing a formula/workflow a past iteration may have tried
  AUTOMATION.md           ← full autonomous-workflow phase-by-phase reference
  ECONOMY_REFERENCE.md    ← full economy/prestige/tickspeed mechanic + engine function/constants reference
  MAINPAGE_REFERENCE.md   ← full MainPage UI field-by-field reference
  COMPONENTS_REFERENCE.md ← full Button/Money/StatCard prop/styling reference
  THEMING_REFERENCE.md    ← full design-token/font/ThemeProvider reference
  PWA_REFERENCE.md        ← full installable-PWA (manifest/icons/service-worker) reference
src/
  game/
    layers.js             ← TIER_DEFINITIONS array + all constants (single source of truth)
    engine.js              ← pure state functions (no React, no side effects)
    useIncrementalGame.js  ← React hook; wires the engine to useState + localStorage
    save-migration/        ← offloads save adaptation; adaptSaveForCurrentSchema returns current-compatible state
    storage.js             ← localStorage persistence; calls save-migration on every load, then mergeState.
                              Also Dev Mode's own isolated `'dev'` slot (separate from numbered player slots)
  components/
    AppNav/, AppMenu/      ← bottom nav (Foundry → Boosters → Compute → Ladder → Guide → More) + More sheet
    Button/, Money/, ConfirmDialog/, OfflineProgressNotice/, IncompatibleSaveNotice/, StatCard/, DiskArrayRow/
                            ← shared styled components; see docs/COMPONENTS_REFERENCE.md
    DataLakePanel/          ← the 10 Data Lake rows on ByteFoundryPage; see "Byte Foundry" below
  pages/
    ByteFoundryPage/index.jsx ← pre-game tap-to-earn bootstrap; Data Stream + Disks continuous sections; see
                               "Byte Foundry" below
    StoragePage/index.jsx  ← thin Disks list wrapper (primary UI is Foundry; not top-level AppNav)
    ComputePage/index.jsx  ← Foundry Boosters (Cores/merge/Boost); nav Boosters, page id `'boosters'`
    ComputeFlopsPage/index.jsx ← PP Compute (Flops); nav Compute, page id `'compute'`; reveals at 100 PP
    MainPage/index.jsx     ← the game; Ladder | Upgrades; data-driven from TIER_DEFINITIONS
    InfoPage/index.jsx     ← Guide; static mechanic explanations; reads no game state
    MilestonesPage/index.jsx ← Chapters / autobuyer milestones; via AppNav → More
    SettingsPage/index.jsx ← Supporter / saves / museum / Era ascension / Ops / Reset; via AppNav → More
    DevModePage/index.jsx  ← dev-build-only sandbox; isolated save toggle, quick-seed presets, a
                              Variables tree auto-generated by recursively walking live game.state
                              (stays in sync with engine.js with no hand-maintained field list —
                              see stateFields.js), raw state-JSON editor; via AppNav → More, gated
                              behind `import.meta.env.DEV` (absent from `yarn build`'s output)
  theme/                   ← design tokens (dark+light) + ThemeProvider + GlobalStyle
  App.jsx                  ← root component; page toggle + AppNav/AppMenu (not a router)
  index.jsx                ← ReactDOM.createRoot entry
capacitor.config.json      ← Capacitor app id/name + webDir dist (#70 foundation; no android/ios yet)
vite.config.js             ← thin wrapper delegating to viteConfigFactory.js
viteConfigFactory.js       ← real Vite config: path aliases (below) + dev/test server config +
                           VitePWA plugin (omitted when CAPACITOR=1)
```

## Architecture

**All game logic is pure** (`src/game/engine.js`) — functions of `(args) => state => newState`, no
React, no side effects. `useIncrementalGame.js` is the only place holding React state (tick timer,
localStorage persistence), called once in `App.jsx` and shared by every page via a `game` prop.
`MainPage/index.jsx` is a pure renderer driven entirely by `TIER_DEFINITIONS` and hook state;
`InfoPage/index.jsx` is a separate static page (evergreen mechanic explanations only, reads no game
state); `StoragePage`/`ComputePage`/`ComputeFlopsPage`/`MilestonesPage`/`SettingsPage`/`DevModePage`
are pure renderers. `App.jsx`
switches pages via a local `page` `useState` and a shared bottom `AppNav` (Foundry → Boosters → Compute →
Ladder → Guide → More), with `ByteFoundryPage` additionally forced onto screen — overriding whatever
`page` says, except on gate-exempt utility pages (`'info'`/`'boosters'`/`'compute'`/`'milestones'`/`'settings'`/`'dev'`)
— whenever the current Prestige cycle's `intro.mainGameUnlocked` is still false (see "Byte Foundry"
below). Storage is continuous Foundry sections (Data Stream + Disks), not gate-exempt on its own. Ladder
stays hidden during the gate; Guide and More stay reachable so utilities never require unlocking the
main game. Once unlocked, Foundry is just another AppNav destination.

There are 10 tiers, ids `tier01`–`tier10` (display names `Kilobytes`–`Quettabytes`, a byte-scale
theme). Every tier is bought with the base currency (`MONEY_ID = 'base'`, display "Bits") and
produces the tier below it; `tier01` costs Bits but produces Factory Bytes (`BYTES_ID = 'bytes'`),
mirroring each Byte × `BITS_PER_BYTE` into Bits so MoneyHero / Prestige keep moving. Bytes are still
not a purchasable tier — the ladder starts at Kilobytes; a fresh
save earns its first Kilobytes via the Byte Foundry below, not by buying a `tier00`/Bytes entry.
**Do not guess at cost/production formulas, the purchase-level system, prestige, Era ascension,
or tickspeed mechanics here** — they're intricate and have changed shape multiple times (see
`docs/DESIGN_HISTORY.md`). Read `docs/ECONOMY_REFERENCE.md` (or the matching section of `CLAUDE.md`)
before touching `src/game/engine.js`, `src/game/layers.js`, or any economy constant.

### Byte Foundry

`ByteFoundryPage` is a separate pre-game tap-to-earn screen every fresh save — and every real Prestige
cycle after that — must pass through before `MainPage` (`tier01`/Kilobytes onward) is reachable. The
player taps to accumulate bits into the **Data Stream** (Buffer-capped, displayed in binary units —
B/KiB/MiB/…, 1 KiB = 1024 Bytes — Disks/Data Lake/caches stay SI), combines the first 8 into a
permanent, passively-producing Byte generator (on Combine / save-load with `byteCreated`, Buffer snaps
to 1 MiB / `INTRO_CAPACITY_CAP_BITS`), then grows production via **Speed ×2** (Invest — own cost ladder
now ×4/tier; the old Sacrifice / "Memory ×2" capacity ladder is removed), plus — once
far enough along — Disks (`StoragePage`, timed builds — a fresh disk takes exactly the time to fill
it at 1x Memory bandwidth (current production rate), ×N for the array's Nth disk; only the pool's
smallest size gets an always-full **read cache** (Data Stream → read cache → timed flush to disk when
tier allows; the Memory→cache refill is itself bandwidth-capped at 10x rate, and the cache→disk
flush duration is one cache block at 2x rate) — every larger size fills exclusively via write-cache
upward merges from the size below (collect from Disks at 2x rate, flush into the disk at 2x rate),
never its own read cache (running both was redundant); as fallback tier funding when no matching disk exists,
Smart autobuyers auto-release read cache; disks always take priority) — each disk size has a fixed,
permanent one-to-one mapping to one tier+level (KB sizes → Kilobytes, MB sizes → Megabytes, etc.,
1st/2nd/3rd size → that tier's level 1/2/3); redeeming only fires while the tier is currently at
exactly that level, and completes the whole level in one shot rather than granting 1 unit)
and Compute Cores/Nodes/Compute Boost (`ComputePage`, nav **Boosters**). **Data Lakes** (KB … QB) fund
Boosters, escalating cost (nth = n units, counting in-flight starts too): a fully-built disk array
auto-deposits into its lake (no manual action — deferring to a still-redeemable disk first) as a
prepaid buffer that spends first/instantly, any remaining cost live-transfers off built Disks over
time (10x the Byte Foundry's bits/sec rate), up to 3 concurrent transfers per lake — a Data Lake
never itself banks a spendable reserve beyond its deposits. A lake's own deposit capacity is a
purchasable doubling ladder: starts at 1 unit, doubles per purchase (spending the lake's current
capacity in Bits, same shape the removed Sacrifice once used), hard-capped at 1,024 units
(`DATA_LAKE_CAPACITY_MAX_LEVEL` = level 10) — the intentional limit a player actually experiences.
Each sub-slot's own deposit count is separately backstopped at `DISK_ARRAY_LADDER_CAP` (10, since
only 10 disks of a given size can ever exist) purely so the counter can't exceed what's physically
possible — not a second design cap, just incidental headroom (1,110 if ever fully filled) that sits
well above the 1,024 ladder which is what actually gates deposits. Deposited/capacity/
next-cost/doubling-cost all display in Byte-scale (KB/MB/GB), matching Disks, not a bare unit count. A
separate PP **Compute (Flops)**
screen (`ComputeFlopsPage`, nav **Compute**) reveals at 100 PP with KFlops→QFlops tiers (1,000–10³⁰ PP).
Manual transfer blocks (plus an always-on
auto-convert) turn Data Stream bits into free `tier01` units at tier01's own current per-unit cost, with **no
per-cycle cap**; the first successful transfer unlocks the main game. The generator, Disks,
Data Lakes, and Compute Cores/Nodes are permanent across every real Prestige; only Data Stream balance
and the main-game-unlock gate reset each cycle. After **100 lifetime prestiges**, production no longer
freezes at 1 Googol Bytes (optional Prestige to claim PP); PP earns 1 per 64 money-exponent powers
beyond Googol, improvable via Double PP upgrades on the Upgrades tab.

For run times / pacing questions — and after any change that can significantly affect ideal Foundry
or prestige timings — use the `simulate-run-times` skill and publish via `publish-strategy.sh`.
Snapshots land on the stable orphan branch `ideal-run-strategy` as **one file per run** under
`runs/` (never merge into `main`; do not rename with an agent/session suffix). Details:
`.claude/skills/simulate-run-times/SKILL.md` / `CLAUDE.md`.

### Adding a new tier

Add one entry to `TIER_DEFINITIONS` in `src/game/layers.js` (naming-agnostic `id` next in the
`tier0N`/`tierNN` sequence, `name`, `symbol`, `baseCost`, `costResourceId: MONEY_ID`,
`producesResourceId` set to the previous tier's `id`, `baseTickSpeedSeconds` set to the next integer
in the sequence). No other file needs changing.

### Path aliases (`vite.config.js`)

`components/X` → `src/components/X`, `game/X` → `src/game/X`, `pages/X` → `src/pages/X`,
`theme/X` → `src/theme/X`, `save-migration/X` → `src/save-migration/X`. Use these aliases in imports, not relative paths. Directory imports
resolve to that dir's `index.jsx`/`index.js`.

## Testing

- Test files live next to source: `engine.test.js`, `layers.test.js`, `storage.test.js`,
  `App.test.jsx`. Environment: jsdom, globals enabled. Setup file: `src/setupTests.js`.
- `yarn test` is green — see `CLAUDE.md`'s Testing section for the current test count (the
  authoritative number; don't restate it here, to avoid the two drifting apart).

## Changelog convention

`CHANGELOG.md` (repo root, Keep a Changelog format) tracks user-facing/behaviorally-relevant changes
from `v0.5.0` onward — add an entry under `## [Unreleased]`'s matching subheading for any such PR;
skip it for docs-only/internal CI changes. `package.json`'s `"version"` mirrors this file's released
sections. To cut Unreleased into a dated release on a PR branch, run `yarn bump-version` (see
`CLAUDE.md`'s Changelog convention; major bumps stay manual).

## Issue tracking conventions

- **Maintainer checklist (#62):** pinned at the top of the Issues tab, deliberately **unlabeled** (not
  a `claude-task` work item — see `CLAUDE.md`'s Issue tracking section). Do not add labels or unpin
  without understanding why.
- `claude-task`-labeled issues are the work backlog for the scheduled automation (see `CLAUDE.md`'s
  Orchestration model / `docs/AUTOMATION.md`). Order: `priority:high` first, then normal (unlabeled)
  issues by lowest issue number, then `priority:low` last (only picked once nothing higher-tier is
  eligible — not an absolute ban, a maintainer/interactive session can still ask for one directly).
- Whoever files a `claude-task` issue should also apply a `size:S`/`size:M`/`size:L` label (S = a
  single small focused change; M = a normal run-sized task; L = large, likely needs a partial
  `Part of #N` slice) — Phase A weighs this against its own remaining budget when picking a task.
- **GitHub Milestones vs Project `Track`:** complementary axes, not duplicates. A Milestone
  targets one planned release (due date + automatic X/Y-closed progress); `Track` groups issues by
  theme/dependency chain and can span multiple releases. Interactive sessions and Planning (#53)
  should assign **player-facing** feature/economy issues to a milestone for the next planned
  release. `v0.6.0` (UI revamp) has shipped; `v0.7.0` (Era ascension) is the current next-release
  milestone. Process/infrastructure `claude-task` issues typically stay off a versioned milestone.

## Budget discipline

Applies to every session, not just automation:

- **Claude:** self-estimate remaining 5-hour Claude usage window and target roughly **half** of it
  per session (soft).
- **Cursor:** soft guidance of roughly **~1% of Cursor Pro quota per session** for every Cursor
  session (not planning-only); prefer one small coherent unit and file non-trivial findings instead
  of half-implementing.

See `CLAUDE.md`'s "Budget discipline" paragraph and `docs/AUTOMATION.md` Cost implications for the
full soft-target/overshoot/partial-slice policy — not restated here to avoid drift between the two
copies.

## Cursor Cloud GitHub access

Interactive **Cursor Cloud Agent** runs authenticate `gh` with a GitHub App integration
(`ghs_*`) that **cannot** comment on, label, or close issues (403 on those REST endpoints).
Unattended GitHub Actions workflows use the `GH_AUTOMATION_PAT` repo secret instead and
work normally.

To let Cloud Agents perform issue hygiene (comments, labels, closes) from the VM:

1. Create or reuse a fine-grained PAT with **Issues: read/write** (same scope as
   `GH_AUTOMATION_PAT`; Contents + Pull requests if the agent also pushes branches).
2. Add it in **Cursor Dashboard → Cloud Agents → Secrets** as **`GH_TOKEN`** (exact name —
   `gh` reads this env var automatically).
3. Re-run the agent session; verify with `gh issue comment` on a test issue or run
   `scripts/backlog-issue-hygiene.sh --dry-run`.

Without `GH_TOKEN`, land issue-only changes via a housekeeping GHA run (deterministic step in
`cursor-autonomous-maintenance.yml`) or a maintainer's local `gh` session.

## Automation engines (Claude now, Cursor successor)

The unattended pipeline currently runs the **Claude** engine (`autonomous-maintenance.yml` +
`autonomous-pr-followup.yml` + `dependabot-pr-followup.yml` + `pr-auto-merge.yml` +
`automation-self-heal.yml`, via `anthropics/claude-code-action` where an agent is involved). Two
twin workflows — `cursor-autonomous-maintenance.yml` + `cursor-pr-followup.yml` — run the same
orchestration on the **Cursor CLI** (`cursor-agent -p`) and are intended to eventually replace the
Claude engine, but not immediately: both coexist for now. The Cursor twins share the `claude-task`
backlog and the same `CLAUDE.md`/`docs/AUTOMATION.md` spec, open work on `cursor/*` branches,
authenticate with a `CURSOR_API_KEY` repo secret (optional `CURSOR_MODEL` variable), and are **inert
until that secret is added**. While both are live, the Cursor guard counts both engines' `*/auto-*`
PRs so they never double-pick, and `pr-auto-merge.yml` recognizes `cursor/*` branches too. Cursor
runs five IST slots/day (including a 1:30am housekeeping/planning run: security-first, CI failures,
conflicts, spec drift, backlog, process) and the same housekeeping sweep on every push to `main`;
Claude runs twice daily at 9:00am/9:00pm IST. All Cursor sessions share the ~1% Cursor Pro soft
quota guidance (see Budget discipline). `automation-self-heal.yml` watches orchestration-workflow
failures and opens draft `claude/self-heal-*` fixes or `automation-failure` issues (see
`docs/AUTOMATION.md`).
Full design + staged cutover: `docs/AUTOMATION.md`'s "Cursor-powered successor engine" section
(authoritative: `CLAUDE.md`).

## Reliability: cron dormancy

GitHub Actions disables a workflow's `schedule` (cron) trigger after 60 days with no repository
activity. `autonomous-maintenance.yml`'s primary mitigation is its own regular activity (merged PRs
reset the dormancy clock) plus Phase B gap analysis keeping the backlog non-empty; the actual backstop
is an external, out-of-band periodic check that re-triggers the workflow via `workflow_dispatch` if
it's gone quiet longer than expected.

## Reliability: concurrent runs

`autonomous-maintenance.yml` carries a top-level `concurrency: { group: autonomous-maintenance,
cancel-in-progress: false }` block so a manual `workflow_dispatch` can never race an in-progress
scheduled run — it queues instead, since cancelling mid-task would orphan a `claude/auto-task-*`
branch.

## Code review tooling

- `.claude/agents/code-reviewer.md` — a comprehensive, adversarial reviewer subagent for any PR or
  working diff: verified `file:line`-cited findings with confidence labels, a merge verdict, and an
  explicit coverage report. Read-only. Use before merging any non-trivial change.
- `.claude/skills/economy-change-review/SKILL.md` — a narrow, mechanical spec-vs-implementation
  cross-check for diffs touching `TIER_DEFINITIONS`/economy constants in `src/game/layers.js`; the
  code-reviewer agent invokes its checklist as a required step on economy-touching diffs.

**After the final commit** on a finished PR: run the adversarial `code-reviewer`, post its
`<!-- adversarial-review sha=… verdict=… -->` marker as a PR comment, mark the PR ready, and —
when the verdict is `APPROVE` and the PR meets the low-risk bar — **always** enable auto-merge via
`scripts/enable-auto-merge-if-eligible.sh <pr> --require-adversarial-approve` (or rely on
`pr-auto-merge.yml` Path 3 reacting to the marker). That enables GitHub auto-merge only; never
force-merge, never push to `main`, never GitHub-approve your own PR. Full detail:
`CLAUDE.md` Pull requests + `docs/AUTOMATION.md` Auto-merge.

## Issue-authoring tooling

- `.claude/skills/file-task-issue/SKILL.md` — full `claude-task` issue-template guidance,
  size/priority labeling, conflict-avoidance `Blocked by #N` sequencing, the `blocked` label's two
  meanings, epic/sub-issue grouping, and when an issue needs no PR. Use when filing a new backlog
  issue, splitting a feature into a sequence, or tightening an existing issue's spec.

## Automation design principles

Three conventions guide this repo's automation design (see `CLAUDE.md` / `docs/AUTOMATION.md` for the
full rationale and examples):

1. **Determinism-first** — prefer a plain deterministic script over a Claude invocation whenever no
   genuine judgment is needed (e.g. `pr-auto-merge.yml`'s auto-merge path is a plain script).
2. **Judgment-call transparency** — when a genuine judgment call is made on something the spec didn't
   pin down, state the reasoning explicitly (e.g. in a PR description or issue comment) rather than
   deciding silently.
3. **Conflict-avoidance sequencing** — when splitting large work into a sequence of issues, chain them
   with `Blocked by #N` whenever two issues would edit the same lines/files, even without a strict
   functional dependency, purely to avoid concurrent-edit conflicts.

## Funding

`.github/FUNDING.yml` declares GitHub Sponsors for `mohanpednekar` (native repo "Sponsor" button).
Enrollment on `github.com/sponsors` is a separate maintainer-only step tracked in issue #62.

## License

`LICENSE` (repo root) is an explicit all-rights-reserved notice, not an OSS license — code stays
publicly visible but isn't legally reusable without written permission. No `CODE_OF_CONDUCT`/
`CONTRIBUTING` — deliberately omitted for this solo, AI-driven hobby project.

## Security notes

- Dev and test servers bind to `127.0.0.1` — do not change to `0.0.0.0`.
- All purchases, autobuyer upgrades, and prestige are validated in `engine.js`, not just via disabled
  UI buttons — every action is re-checked server-side-equivalent (there is no server, but the engine
  is the single point of truth regardless of which UI control triggered it).
- Timer effects are cleaned up on unmount.
- Save/load wraps `localStorage` in try/catch (quota/private-browsing) and strips
  `__proto__`/`constructor` from parsed JSON before merge.
- `.github/workflows/**` changes require the repo owner's review, enforced two ways:
  `pr-auto-merge.yml`'s script-level exclusion, and (once branch protection enables "Require review
  from Code Owners") `.github/CODEOWNERS`.
