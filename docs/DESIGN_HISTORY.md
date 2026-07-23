# Design history & rationale

This file holds the **why** behind decisions in `CLAUDE.md`: incident write-ups, empirical simulation
results, superseded designs, and the reasoning for choices that aren't self-evident from current
behavior alone. `CLAUDE.md` states what the system currently does and is what loads into every
session automatically; this file is for when you need to know *why* it does that — before changing a
formula, workflow, or UI mechanic that a past iteration already tried and rejected for a specific
reason, check here first so you don't re-discover the same dead end. Sections mirror `CLAUDE.md`'s
structure so you can jump to the matching topic.

## Automation workflows

### Why a PAT instead of the default `GITHUB_TOKEN`

All three workflows authenticate with `GH_AUTOMATION_PAT` instead of `GITHUB_TOKEN`. This isn't
optional: GitHub does not let commits, pushes, or merges authored by the default `GITHUB_TOKEN`
trigger other workflows (an anti-recursion safeguard). With the default token, `ci.yml` would
silently stop re-running on the bot's own pushed fixes, and `deploy.yml` would silently stop firing
when the bot's PRs get merged to `main`. A PAT for these specific operations avoids that gap without
any workaround.

### Permission block reasoning

`autonomous-maintenance.yml` and `autonomous-pr-followup.yml` need `id-token: write` because
`claude-code-action`'s `claude_code_oauth_token` auth path requests a GitHub Actions OIDC token as
part of its setup; without that permission the step fails immediately with "Could not fetch an OIDC
token" before ever reaching the actual task. `pr-auto-merge.yml` doesn't invoke Claude, so it doesn't
need this. `autonomous-maintenance.yml` additionally needs `issues: write` — an explicit
`permissions:` block zeroes out everything unlisted, and without the issues permission the guard
step's `gh issue list --label claude-task` (which runs with the default `GITHUB_TOKEN`) silently
returns an empty backlog, so every run skips Phase A and falls through to the Phase B menu.

### Turn-budget history

`--max-turns` is a best-effort proxy for cost, not a hard programmatic budget cutoff — every tool
call counts as a turn, and a real implement-test-PR run needs 30–50 of them.
`autonomous-maintenance.yml`'s cap started at 25 and was raised in two steps after two separate live
failures: the first run under the new Phase A/B prompt hit `error_max_turns` at only 26 turns / ~$0.79
of cost (25→40 — not enough headroom for the fuller read-CLAUDE.md → choose → implement → test →
commit → push → open-PR round trip), and a subsequent Phase A smoke-test run (task issue #33) failed
the same way even at 40 (40→50) — confirming every tool call, not just each higher-level step, counts
against the cap. `autonomous-pr-followup.yml` was raised 20→30 for the same reason. Watch actual usage
against your plan's weekly quota and tighten `--max-turns` (or pin a cheaper model via `claude_args`)
further if runs consistently use too much, but not below what a real task run needs (~30–50 turns), or
every run will fail with `error_max_turns` before finishing.

This `25→40→50` retuning history is now historical for `autonomous-maintenance.yml` specifically: issue
#49 removed its fixed `--max-turns` cap entirely in favor of a self-estimated, soft ~50%-of-window
budget recalculated fresh every run (see `CLAUDE.md`'s "Cost implications"/"Budget discipline"), because
a number picked in advance couldn't adapt to how large a given task turned out to be or to how much
quota headroom actually remained going into a run — the mechanism this history describes tuning no
longer exists for that workflow. The lesson generalizes, though, and still applies as-is to
`autonomous-pr-followup.yml`, which keeps its own fixed `--max-turns 30` cap unchanged.

### Orchestration model — background

The maintainer orchestrates; the scheduled workflow develops. Interactive Claude Code sessions are
primarily for strategy discussion and for turning that strategy into a backlog of well-defined,
run-sized tasks — GitHub issues labeled `claude-task`, created via the issue-form template at
`.github/ISSUE_TEMPLATE/claude-task.yml` (Goal / Context / Spec & acceptance criteria / Files likely
touched / Out of scope / Verification / Explicit authorizations / Dependencies). The scheduled
maintenance workflow then implements those tasks unattended, one per run, and the follow-up +
auto-merge workflows carry each PR to merge. Write each issue so an unattended 50-turn run can
complete it without asking questions: one issue = one PR = one run. Split anything bigger into a
sequence of issues ordered with "Blocked by #N" lines in the Dependencies section. An issue's optional
"Explicit authorizations" section is the maintainer's written sign-off for changes the workflow
otherwise hard-bans (e.g. adding a tier to `TIER_DEFINITIONS`); security constraints (no
`--no-verify`, no editing other workflow files, never push to main, never self-merge) can never be
authorized away.

**Milestones vs. the Project's `Track` field.** These are complementary grouping axes, not
duplicates. A GitHub Milestone targets a specific planned release and gets GitHub's native due-date
and automatic X/Y-closed progress tracking for free; a `Track` (the Project's grouping field — see
#53) groups issues by theme or dependency chain (e.g. "Byte-scale rename"), and can span multiple
releases. A `Track` can outlive any single Milestone; a Milestone pulls together whichever issues —
possibly from several Tracks — are actually planned for one release. Assign a player-facing
feature/economy issue to the milestone representing its next planned release when one exists; pure
process/infrastructure/automation issues typically don't need a milestone. Milestone creation and
issue assignment are GitHub metadata operations (`gh api repos/<owner>/<repo>/milestones`, `gh issue
edit --milestone`), not file changes.

### Automation design principles

Three conventions have guided this repo's automation design so far, mostly discoverable only by
reading old issues/PRs until now:

1. **Determinism-first.** Prefer a plain deterministic script over a Claude invocation whenever no
   genuine judgment is needed — a script is cheaper, faster, and can't drift in interpretation
   between runs. See `pr-auto-merge.yml`: its low-risk auto-merge path is a plain shell script with
   no Claude invocation at all, precisely because "is this diff small/safe enough to auto-merge" is
   a mechanical check, not a judgment call.
2. **Judgment-call transparency.** When a genuine judgment call is made on something the spec or the
   user didn't pin down, state the reasoning explicitly rather than deciding silently. A run that
   scopes down or skips a task because of its own turn-budget estimate is required to note that
   reasoning in the PR description/issue comment, not just silently do less than the full spec.
3. **Conflict-avoidance sequencing.** When splitting a large body of work into a sequence of issues,
   chain them with a `Blocked by #N` line whenever two issues would edit the same lines/files — even
   without a strict *functional* dependency between them — purely to avoid two concurrently-open PRs
   conflicting over the same region. See e.g. issue #69's dependency on #49 (both edit the same
   Phase A selection-logic prose).

### Scheduled maintenance (`autonomous-maintenance.yml`) — job status reconciliation

The action step's exit code alone misreports both directions, so two follow-up steps re-align the
job's red/green with reality by inspecting the action's execution-output JSON
(`$RUNNER_TEMP/claude-execution-output.json`):

- *Green that should be red:* the action exits 0 whenever the agent runs to completion — including
  a run that completed by giving up. This happened for real: three consecutive green runs each
  picked task #78, had every `Write` into `.claude/skills/`/`.claude/agents/` refused by the
  harness's unattended-session guardrail (creating new skill/agent files needs an interactive
  approval no one is present to grant), and ended having only left an issue comment — each burning
  a full run's quota, every 5 hours, indefinitely. The "Fail on denied file modifications" step
  now fails the job whenever the final result's `permission_denials` include a `Write`/`Edit`/
  `NotebookEdit` denial (a file the run wanted to change and couldn't); Bash denials stay
  non-fatal since allowlist misses are routine and worked around. To stop the every-5-hours retry
  loop itself, a run that hits an environment/permission blocker on a task issue also labels it
  `blocked` (created idempotently), and the guard step excludes `blocked`-labeled issues from the
  Phase A backlog — a human removes the label after unblocking (e.g. by creating the `.claude/`
  file interactively, where the approval prompt can actually be granted).

  This was later relaxed once it produced its own false positive: a run picked task #79 (add a
  SessionStart hook, needing `.claude/settings.json`), hit the identical `.claude/` write refusal,
  and — exactly per the Phase A guidance above — commented on the issue with the specifics and
  labeled it `blocked`. That's the intended graceful-degradation path, not the silent #78 failure
  mode this step exists to catch, yet the job still went red for a run that did precisely what it
  was told to do. The step now only fails the job if the denial *wasn't* followed by the run
  itself labeling the affected issue `blocked` (detected by scanning the execution output for a
  `gh issue edit ... --add-label blocked` command) — a run that leaves that comment-plus-label
  trail has already handed the blocker to a human as a durable, actionable signal on the issue
  itself, so an additional red workflow badge on top adds no further action a human would take
  differently, while a run that hits a denial and gives up *without* that hand-off still fails the
  job exactly as before (the original #78 case).
- *Red that should be green:* because `CLAUDE_CODE_OAUTH_TOKEN` is subscription-quota-based, a
  scheduled run can die on turn 1 with HTTP 429 ("You've hit your session limit") whenever the
  quota happens to be exhausted at fire time — purely transient, no work attempted, and the next
  5-hourly run retries by itself. The Claude step therefore runs with `continue-on-error: true`,
  and the "Classify Claude step failure" step downgrades a final result with `is_error: true` and
  `api_error_status: 429` to a `::warning::` (job stays green), while any other failure —
  including `error_max_turns`, a real budget signal worth keeping red — re-fails the job as
  before.

**Reliability: cron dormancy.** GitHub Actions automatically disables a workflow's `schedule` (cron)
trigger after 60 days with no repository activity — if the `claude-task` backlog ever fully drained
and nothing filed new work for an extended stretch, `autonomous-maintenance.yml`'s cron trigger could
go dormant with no error or notification anywhere; GitHub just silently stops firing it. In practice
this is unlikely while the backlog stays active, since the automation's own merged PRs already count
as repository activity (resetting the dormancy clock), and Phase B menu item 6 (gap analysis) exists
specifically to keep proposing new work when the backlog thins. The actual backstop is external to
GitHub Actions entirely: a periodic check running on separate infrastructure — not subject to GitHub's
cron-dormancy rule, since manual/API `workflow_dispatch` always works regardless of whether the
`schedule` trigger is currently disabled — that notices if `autonomous-maintenance.yml` has gone quiet
longer than expected and manually re-kicks it via `workflow_dispatch`. This note documents the risk and
the mitigation that's actually in place; the watchdog mechanism itself lives outside this repo/issue
system and isn't something a `claude-task` PR implements.

### PR follow-up (`autonomous-pr-followup.yml`) — security reasoning

Because it's triggered by events that can fire on any PR (including one opened from a fork), it
resolves the target branch via `gh pr view --json headRefName,isCrossRepository` rather than trusting
`github.event.*` fields directly, and refuses to check out anything where `isCrossRepository` is true
— a fork branch can be named anything, including something that merely looks like `claude/auto-*`.
All untrusted event fields are passed through `env:` rather than interpolated straight into the shell
script, to avoid script injection via a crafted branch/comment. On top of that, the job itself has a
native `if:` gate requiring the triggering `issue_comment`/`pull_request_review` author to have write
access (`author_association` in `OWNER`/`COLLABORATOR`/`MEMBER`) before checkout ever runs — on a
public repo, anyone can comment on or review a PR without write access, which is the standard "pwn
request" surface for privileged workflows on these trigger types; a runtime bash check alone isn't
visible to CodeQL's static analysis, so this authorization check needs to live in the workflow YAML's
`if:` to actually register as a mitigation. Checkout is pinned to the exact commit SHA (`headRefOid`)
resolved at the same time as the authorization check, not the branch name — the branch is mutable, so
re-resolving "the current tip" at checkout time would reopen a TOCTOU window between authorization and
execution; a SHA is immutable. Since that leaves a detached HEAD, the prompt has Claude run
`git checkout -B <branch>` before committing so it can push back normally.

### Auto-merge (`pr-auto-merge.yml`) — why the low-risk path is safe even if heuristics mis-fire

`gh pr merge --auto` doesn't merge immediately, it only enables auto-merge, which still waits on the
real required `test` check from branch protection either way. The workflow-file exclusion is enforced
entirely by the script's own `if` logic, so it's backed by a second, structural layer independent of
the script staying correct: a `.github/CODEOWNERS` entry maps `.github/workflows/**` to the repo
owner, and once branch protection requires Code Owner review, GitHub itself blocks any workflow-file
PR from merging without that review — defense in depth, not a replacement for the script-level check.

## Architecture / MainPage UI decisions

The following records *why* specific MainPage/component behaviors were built the way they were —
`CLAUDE.md`'s Architecture section states the current behavior; this is the reasoning trail.

- **`Lv.N` on the Buy button instead of a separate Purchased cell.** Buy is the action that raises
  `purchased`, so folding the level into the Buy button's own label (plus a `(level N)` `aria-label`
  suffix) avoids a redundant grid cell. The player-facing term is "level" (it only ever increases and
  gates both cost and production milestones); underlying state/function names (`state.purchased`,
  `getTierPurchasedCount`, `getPurchaseMilestoneMultiplier`) were left unchanged to avoid an
  unnecessary rename across engine/tests.
- **Sticky balances via IntersectionObserver, not CSS alone.** CSS can't detect "currently stuck", so
  a zero-height `BalancesSentinel` rendered just above the balance pair drives an IntersectionObserver
  that toggles the compact/expanded presentation; its negative margin cancels the extra `RootDiv`
  flex-gap slot it would otherwise add. The observer effect guards for environments without
  IntersectionObserver (jsdom in tests), where the balances simply stay expanded.
- **`InfoDetails` disclosure for description prose.** Native `<details>`/`<summary>` needs no JS
  state, and collapsed content stays in the DOM, so `aria-describedby` references into it (and
  `toHaveTextContent`-based tests) resolve whether or not the section is expanded — this is why a
  disclosure was chosen over conditionally rendering the prose. The marker (▸) is hidden deliberately
  (`list-style: none` + `::-webkit-details-marker`), leaving no visual clue that the heading expands —
  players discover it by clicking; screen readers still announce collapsed/expanded state.
- **No aggregate `+X/sec` line.** Previously summed `owned` across every money-producing tier; removed
  once each tier row got its own `+X` production figure (the per-tier replacement), since an
  aggregate no longer added information once tickspeeds diverged in principle (even though they're
  currently uniform — see "Tier production tickspeed" below).
- **On-button gradient fill instead of a separate progress bar.** Buy/Prestige/Speed Up/PP-spending
  buttons all render `$progress`/`$secondaryProgress` fills rather than a bar below them, to avoid a
  second visual element per row; green = units already bought in the current cost block, amber = units
  affordable but not yet bought.
- **Compact icon + `aria-label` split.** Buy/Prestige/Reset render compact visible text (an icon in
  place of the action word, e.g. 🛒 Buy, plus the cost and the tier's short symbol) to keep rows
  narrow, while the full descriptive sentence lives in `aria-label` for assistive tech and
  `getByRole('button', { name })` tests. Because each PP-spending button also nests a `VisuallyHidden`
  `role="progressbar"` span, the explicit `aria-label` on the button itself is required regardless of
  the visible/accessible-name split — without it, the accessible-name computation would recurse into
  the nested node and pick up its label too.
- **Game view vs. PP Upgrades view — why a second view instead of more grid columns.** Every
  PP-spending control used to compete for space in the tier row's grid; moving all of it to a
  dedicated PP Upgrades view is the "redistribution" that reclaimed the tier row's old `automate`
  grid column. The tab pair only appears once `!isFirstRun` since there's nothing to switch to before
  the player's first prestige (every PP Upgrades control spends Prestige Points, which don't exist as
  a concept until then). The `NavDot` affordable-upgrade indicator exists so the player knows to check
  in without opening the page on spec every time.
- **Tickspeed multiplier badge: "+N%" over "×N".** The badge used to read `⚙ ×1.1` when it represented
  a purchase-*frequency* multiplier under the old Upgrade mechanic. Once the mechanic was repurposed
  to a straight production multiplier (see "Tickspeed multiplier" in CLAUDE.md), "+N%" was chosen
  specifically because the badge no longer represents a purchase-frequency multiplier at all — the old
  "×N" phrasing would have implied the wrong mechanic to a returning player.
- **Unlock has no first-tier special-case (unlike the old Automate button).** The predecessor
  "Automate" button had a bypass for the first tier's Money-funded activation step; that step no
  longer exists (autobuyer unlock is PP-funded uniformly across all tiers now), so the special-casing
  was simply removed rather than ported forward.
- **Speed Up / Prestige cards stay visible once revealed.** `SpeedUpCard` used to disappear again the
  moment a successful Speed Up reset `owned` and re-locked the last tier. It no longer does — the
  `speedUpEverRevealed` flag replaced a live `lastTierUnlocked` check specifically to avoid the
  disappear/reappear churn every Speed Up cycle would otherwise cause, which was jarring in practice.
  `PrestigeCard` got the identical treatment for the same reason.
- **`aria-describedby` only on Prestige and Reset.** These two are the app's only irreversible
  actions, and their most important fact (resources get wiped) previously lived only in a mouse-hover
  `title` — undiscoverable to keyboard/screen-reader users. Every other button's `title` genuinely just
  restates what's already visible/in the `aria-label`, so those were left as-is rather than adding
  `aria-describedby` everywhere for consistency's sake.
- **Tier row reveal animation keyed off a mount-time snapshot, not live mount timing.** Since locked
  tiers render `null`, every unlocked row technically "mounts" on every page load — a naive
  mount-triggered animation would replay for tiers unlocked long ago. A `useState(() => new
  Set(...))` baseline snapshot of which tier ids were already unlocked at mount time (captured once,
  from whatever `loadGameState()` returned) is compared against on each row instead, so only tiers
  that unlock *during the current session* animate.
- **Grid layout: fixed `grid-template-areas` at every width, not flexbox content-sizing.** A field's
  on-screen position needs to depend only on viewport width, never on how many digits a value has (or
  on whether the tickspeed multiplier button currently has anything to render — it stays reserved even
  when empty). This was a deliberate reaction to a layout that previously shifted around based on
  content length.
- **Buy sits to the right of the tickspeed multiplier button.** Buy is clicked constantly, the
  tickspeed button only occasionally, so the more-clicked control gets the rightmost
  (thumb/cursor-resting) position — a small ergonomics call, not an arbitrary ordering.
- **Offline notice self-dismiss timing.** Uses a plain `setInterval` computing `remaining/total` from
  two `Date.now()`-based timestamps, not a CSS transition — matching the codebase's established
  on-button-fill convention rather than reintroducing the removed tick-progress ring's animation
  machinery. The countdown interval effect is keyed on `offlineProgress` itself (not just the timing
  state) specifically to avoid a real regression that was caught during development: without that
  guard, a timer could leak and run forever in the background once the card was dismissed by the
  auto-fade path rather than a manual click.
- **Offline notice: click-to-extend removed; card became a centered overlay.** The card used to carry
  both a whole-tile `onClick` (re-seeding the auto-dismiss deadline to a longer duration from that
  click) and a `title` explaining that click behavior — "extend from now" was more intuitive than
  adding +60s on top of whatever remained, at the time. That combination was flagged specifically for
  *this* card: the card had no other indication it was interactive (no `role="button"`, no cursor
  affordance beyond CSS `cursor: pointer`, no visible control), so a hover-only tooltip was the *only*
  way to discover the whole-tile click at all — undiscoverable to touch/keyboard users, and easy to
  trigger by accident while merely reading the notice. The click-to-extend behavior and its `title`
  were removed; only the explicit Dismiss button remains interactive. Separately, the card moved from
  an inline block (pushed into the normal document flow, above the money display) into a fixed,
  viewport-centered `OfflineNoticeOverlay` — presenting it as a true centered overlay/dialog instead of
  content that shifts the page underneath it, with `pointer-events` scoped so only the card itself (not
  the overlay's surrounding space) intercepts clicks. Note this is *not* a blanket rule against ever
  pairing a whole-tile click with a `title` — see the next entry and the tier rows' own
  `TierNameTrigger` (CLAUDE.md's "Tier row details disclosure"), both of which combine the two
  properly: `role="button"` (or an equivalent semantic cue) plus a supplementary tooltip, rather than
  the tooltip being the sole explanation of an otherwise-invisible affordance.
- **Sticky PP display doubles as a Prestige button.** Once Prestige is actually available
  (`canPrestige`), clicking the sticky "prestige points display" card triggers Prestige directly,
  alongside the existing `TopPrestigeBar`/`FullScreenOverlay`/`PrestigeCard` buttons (none of which
  were removed) — a convenience shortcut, since the PP balance is already visible at the top of the
  page in exactly the state where Prestige becomes available. Unlike the offline notice above, this
  card is properly marked interactive (`role="button"`, `tabIndex`, keyboard support) whenever it's
  clickable, and reverts to a plain non-interactive display before `canPrestige` — so the same
  click+title combination that was removed from the offline notice is reintroduced here deliberately,
  now paired with real button semantics instead of being the only cue.

## Economy model

### Why `getTierCost` uses a multiplier form, not a literal power

An earlier version of `getTierCost` read as a literal `baseCost^fib`. This put high tiers permanently
out of reach within a handful of blocks — e.g. Octillions' 4th block cost 10^135, past `GOOGOL` —
stalling the whole economy well before a full run could reach Googol even at extreme Prestige-Point
speed bonuses. The current form (`baseCost * 10^(fib - 1)`) was adopted once that was caught: every
tier still scales by the same Fibonacci-driven exponent progression, but relative to its own
`baseCost` rather than compounding `baseCost` itself into the exponent, so a baseCost-1000 tier's
blocks cost 1e3, 1e4, 1e5, 1e7, 1e10, … instead of exploding immediately.

### Why every tier's tickspeed is uniform at 1s

An earlier design had `tier02` = 2s, `tier03` = 3s, … `tier10` = 10s (each subsequent tier producing
more slowly). This was **not** balance-neutral: dividing later tiers' throughput by up to 10x, stacked
on top of the Fibonacci-driven cost curve, made a full run unable to reach `GOOGOL` within any
practical amount of time — confirmed empirically with the `simulate-run-times` skill, which showed
every tested starting Prestige Point balance (0–5000, i.e. up to +5000% production speed) still
hitting the simulator's safety cap without reaching Googol. All tiers were set to the same 1s value
instead. `baseTickSpeedSeconds` remains a plain explicit per-tier field rather than a computed one, so
nothing prevents a future tier or upgrade from diverging again — the uniform-1s state is a balance
choice, not a structural constraint the field itself enforces.

### Reintroducing the 1s-10s tickspeed ladder

The uniform-1s state above held until the tickspeed-multiplier system (`tickspeedLevels`,
`globalTickspeedMultiplier`, see "Tickspeed multiplier"/"The global tickspeed multiplier" in
`CLAUDE.md`) was added — a mechanism that didn't exist when the original 1s-10s ladder was tried and
reverted, and that specifically shrinks `getEffectiveTierTickSpeedSeconds` back down per tier or
globally. Once that system existed, the original 1s-10s values (`baseTickSpeedSeconds = tierIndex + 1`)
were restored on the theory that players could now offset later tiers' slower base cadence by investing
in tickspeed multipliers, rather than the game being structurally unable to reach Googol as before.

This was re-verified empirically with the `simulate-run-times` skill before merging, using the same
starting-PP values as the original test (0, 100, 500, 1000, 5000, plus the skill's wider default range).
Unlike the original attempt — where every one of those values hit the simulator's safety cap without
reaching Googol — every run now completes, in ~4 days 21 hours of simulated time for the lower PP
values (0-10000, where the bot's PP gets spent on autobuyer unlocks before it can afford the
10,000-PP passive speed bonus) down to under an hour for 25,000+ PP (once the passive bonus affords
unlocking). The tickspeed-multiplier system is enough to compensate this time — confirming the
original revert's caveat (no compensating mechanism existed yet) was the actual root cause, not
something inherent to an increasing per-tier tickspeed itself.

### Why the tick-progress ring was removed

A circular per-tier tick-progress ring (`TickProgressRing`, a conic-gradient "watch face" fed by
`getTierProductionProgressPercent`) used to render beside each tier's production figure, visualizing
`tierProductionAccumulators` filling toward each delivery. It was removed once every tier's tickspeed
was unified at 1s: with all ten rings sweeping the same constant 1-second cycle in unison, the ring
carried no per-tier information and was pure motion noise. `getTierProductionProgressPercent` (and its
unit tests) remains in `engine.js` as a read-only accessor — it would be the starting point if any
future design re-surfaces per-tier tickspeed divergence. When per-tier tickspeed divergence was in fact
reintroduced (see "Reintroducing the 1s-10s tickspeed ladder" above), the ring itself wasn't restored —
instead each tier row gained a collapsed-by-default `Details` disclosure (`TierDetails` in `MainPage`)
that surfaces the base/effective tickspeed numbers as text on demand, which doesn't add the ring's
always-on animation cost/clutter to the compact row layout.

### Why Speed Up exists, and why its requirement escalates

Even with the Fibonacci-driven cost curve and every tier sharing a uniform 1s tickspeed, a single
unbroken run's cost still eventually outpaces any *constant*-factor production speedup — confirmed
empirically via the `simulate-run-times` skill, where every tested starting Prestige Point balance
still hit the simulator's 5,000,000-tick safety cap without ever reaching Googol. Speed Up restarts
the cost curve from block 0 every time while permanently doubling production, so each cycle is faster
than the last — the compounding multiplier outruns the compounding cost, rather than losing to it the
way a flat bonus eventually does.

The escalating requirement (`getSpeedUpRequirement`) exists because a flat "always 10 more" trigger
lets the last tier dodge the Fibonacci cost curve entirely, forever: since the requirement would
otherwise sit exactly at the epoch-0/epoch-1 boundary, every cycle's 10 units would be bought at the
same flat `baseCost` no matter how many cycles had already happened — the last tier's cost would never
actually escalate. Scaling the requirement up by a full block of 10 each cycle means later cycles'
purchases *do* cross into deeper cost epochs, so the mechanic can't be spammed for cost-free
compounding indefinitely.

Re-running the `simulate-run-times` bot (updated to always accept Speed Up the instant each cycle's
requirement is met) confirmed the run still completes at every tested starting PP balance, just with
far fewer, more consequential cycles: **9 Speed Ups** over **~94,900 simulated ticks** (about 1
simulated day) instead of the flat-requirement version's 333 cycles over ~3,900 ticks (~1 hour) —
slower overall, but the mechanic no longer sidesteps the cost curve that everything else in this
economy is built around.

`speedUpGame`'s reset pattern deliberately mirrors `prestigeGame`'s, matching the original framing for
this feature: "similar to starting the first run but with automations retained and 2x the speed."

### Why autobuyer unlock is PP-funded only, with no first-tier bypass

There used to be a separate Money-funded activation path with a first-tier special case (bypassing the
activation cost for `tier01` only). That path no longer exists — `buyAutobuyerUnlock` is now the
*only* way to get a tier's autobuyer running, funded entirely by Prestige Points, uniformly across
every tier including the first. Unlocking now does both what "activation" and "automation upgrade"
used to do separately: it makes the tier self-buy and self-upgrade its own tickspeed level, with no
further purchase needed.

### Why "Smart" autobuyers exist

`tickGame`'s autobuyer purchase loop normally requires affording an *entire* `autobuyerBatchSize`-unit
block before buying anything. A freshly-unlocked tier with 0 owned generators earns $0/tick, so at the
app's fixed batch size of 10 it can never afford the first 10-unit block on its own and stalls at
whatever balance it started with, forever, every run. "Smart" (`buySmartAutobuyer`, a separate PP
purchase 10x the unlock cost) fixes this real stall by buying one unit at a time until the tier
reaches 10 lifetime purchases, then reverting to normal full-block batching.

### Why the tickspeed multiplier no longer affects purchase frequency

The mechanic now called "tickspeed multiplier" is the renamed, re-purposed replacement for what used
to be a tier's autobuyer "Upgrade": a Money-funded, per-tier level that used to compound
purchase-attempt *frequency* by 10% per level. It no longer does that at all — autobuyer
purchase-attempt frequency is now a flat, level-independent rate; each tickspeed multiplier level
instead affects that tier's own **production** by another 10% (originally by scaling the amount
delivered per batch — see the next entry for why that changed to scaling delivery frequency instead).
This is a deliberate decoupling: the old design conflated "how fast this tier buys itself" with "how
much/how often this tier produces," which made balancing either independently impossible.

### Why tickspeed multipliers shrink the delivery period instead of scaling production

The tickspeed multiplier (per-tier and global) originally worked by multiplying directly into a tier's
production credit each time it delivered — i.e. a higher level meant *bigger* batches at the same
cadence, not more frequent ones. This was changed so both multipliers instead divide into
`getEffectiveTierTickSpeedSeconds`'s effective period (see "Tier production tickspeed" in CLAUDE.md),
making a higher level mean *more frequent, same-sized* deliveries instead. The aggregate output over
any fixed time window is mathematically identical either way (multiplying the amount by ×1.21 and
dividing the period by ×1.21 both scale total throughput by the same factor), but the change makes the
mechanic honest about its own name: a "tickspeed" multiplier now actually speeds up the tick, rather
than being a production multiplier wearing a tickspeed-flavored label. It also keeps a tier's `+X`
production preview meaningful as "what one delivery is worth" — under the old scheme that figure
changed with tickspeed level even though the player never *saw* individual deliveries speed up or slow
down, only a bigger number that had nothing to do with the "tickspeed" name on the button that produced
it.

### Prestige history: why PP replaced direct production doubling

Prestiging no longer doubles production directly — it now awards **Prestige Points (PP)**, a
permanent, cumulative currency that never resets. This is the direct replacement for the old "prestige
level doubles production" mechanic, chosen so that Prestige could fund an explicit menu of upgrades
(autobuyer unlocks, Smart, the passive speed bonus, Auto Speed Up, Auto-Prestige) rather than a single
undifferentiated multiplier.

### Why Prestige/PP info is hidden until first prestige

Prestige Points don't exist as a concept for the player until they've prestiged at least once, so
`MainPage` keeps every PP-related display and control out of the page entirely during the first run,
rather than showing a premature "0 PP" or a button costing points the player has never earned. PP
upgrades additionally reveal one by one, cheapest first — e.g. the 10000 PP Speed Bonus unlock stays
hidden until the far cheaper Auto Speed Up (100 PP) has been bought, so a fresh post-prestige page
isn't fronting a cost that's still thousands of points away.

### Reset button history

An earlier version of the Reset feature restricted it to `yarn dev`/`yarn test` builds only
(dead-code-eliminated from production); that gate was removed after a player on the deployed site had
no way to reach it. It's now always rendered, gated only by a native `window.confirm(...)` prompt
(chosen over a custom two-step UI since there's no existing modal/confirm component elsewhere in the
app to reuse for a single irreversible action).

### XP status

XP (`prestige.xp`, earned via money milestones — see `checkMilestones`) has been removed from the UI;
the underlying mechanic (accumulation, `highestMilestone` tracking) is untouched in `engine.js`, just
no longer displayed, pending being repurposed for something else later.

### Last tier's XP-funded tickspeed: from a permanent latch to a live owned >= 10 check

`isLastTierTickspeedXpUnlocked` originally read a stored `state.lastTierTickspeedXpUnlocked` flag,
latched permanently true by `buyTier` the first time the last tier's lifetime `purchased` count ever
reached 10, and never cleared again — not even by a Prestige or Speed Up, both of which reset the last
tier's own `owned`/`purchased` back to 0 like every other tier's. The explicit reasoning at the time was
that a live `purchased >= 10` check "would hide the mechanic again" once a reset dropped the count back
below 10, which read as a regression for a player who'd already earned it once.

In practice this meant a player could Prestige or Speed Up, immediately own 0 of the last tier, and
still see the XP-funded tickspeed button/bonus presented as active on a tier they no longer meaningfully
had — the mechanic never actually reverted to reflect the reset it was supposed to respect. This was
changed so `isLastTierTickspeedXpUnlocked` is a live check (`owned[lastTierId] >= 10`) instead, with the
stored latch flag removed entirely — matching the same live `>= 10` threshold `isTierUnlocked` already
uses for ordinary tier unlocking, and reverting the last tier's row to its normal Money-funded tickspeed
button whenever owned drops back below 10. `lastTierXpConsumed` (the permanent, ever-growing total XP
invested) was deliberately kept as a separate, still-permanent counter — the accumulated bonus it drives
is never lost across a reset, only not *applied* while the live check is unsatisfied; buying back up to
10 re-engages it at the same cumulative bonus rather than starting over.

### Last tier's XP-funded tickspeed: from additive to multiplicative

`getLastTierXpTickspeedMultiplier` originally computed `1 + LAST_TIER_XP_TICKSPEED_STEP * xpConsumed`
— a flat, linear +1% per cumulative XP ever consumed (37 XP consumed = exactly +37%, ×1.37). This was a
deliberate departure at the time from every other tickspeed multiplier in the game (the per-tier
Money-funded ladder and the global multiplier both compound: `(1 + step) ** level`), chosen so the
displayed bonus would "directly match the amount invested" — spend 37 XP, see +37%, no mental math.

This was changed to the same multiplicative, compounding form every other tickspeed multiplier uses:
`(1 + LAST_TIER_XP_TICKSPEED_STEP) ** xpConsumed`. The additive version meant the last tier's own
mechanic was the only tickspeed multiplier in the game that didn't compound, an inconsistency with no
strong gameplay justification once weighed against consistency — and it made the last tier's own
ceiling different in kind from every other tier's (linear growth is bounded in a way exponential growth
isn't, which matters for a resource meant to scale toward Prestige-level numbers). The MainPage
XP-consume button's `+N%` label was updated alongside this to report the actual marginal speedup a given
consumption contributes (`getLastTierXpTickspeedMultiplier(amount)`, i.e. the ratio of the new multiplier
to the old one) rather than echoing the raw XP amount spent — under compounding those two numbers
diverge quickly (100 XP consumed compounds to ×2.70, not ×2.00).

### Multiplier overflow safety: the switch to compounding needed a floor

Switching `getLastTierXpTickspeedMultiplier` to compound (previous entry) introduced a real overflow
path that a code review caught before merge: `lastTierXpConsumed` is a permanent counter, never reset or
capped, and `1.01 ** xpConsumed` overflows double-precision float to `Infinity` around `xpConsumed ≈
71,333` — a magnitude that's astronomical but not actually unreachable over a long enough
heavily-automated save, since nothing in the economy bounds `prestige.xp`/`lastTierXpConsumed` the way
`GOOGOL` implicitly bounds every Money-funded multiplier. `getEffectiveTierTickSpeedSeconds` used to
divide the tier's base period by this multiplier with no guard; once the multiplier overflowed, the
division gave exactly `0`. That `0` period wasn't a safe "instant delivery" — it corrupted
`tickGame`'s accumulator math: `ticksElapsed = accumulated / 0` became `Infinity`, and `accumulated -
ticksElapsed * tickSpeed` collapsed to `Infinity * 0 = NaN`. Because `clampNonNegative` treats any
non-finite value as `0`, the produced (second-to-last) tier's `owned`/`resources` got silently zeroed on
every tick from that point on — a permanent corruption, not a one-tick glitch, since the `NaN`
accumulator never recovered on its own.

This is a materially different failure mode than the already-documented, already-accepted overflow in
`getTierCost` (see "Why `getTierCost` uses a multiplier form" above) — a cost overflowing to `Infinity`
is harmless because an infinite cost is simply never affordable, a clean no-op. Here the overflowing
value was a *divisor* feeding a stateful accumulator, so the failure didn't fail safely. The fix adds a
floor, `MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS` (`1e-9`, module-private in `engine.js`, deliberately not a
tunable/exported constant since it's a pure numerical-safety guard rather than a balance value):
`getEffectiveTierTickSpeedSeconds` now falls back to it whenever the computed period is non-finite or
`<= 0`. A `1e-9`-second floor still lets `ticksElapsed` grow into a very large but always-finite integer
(effectively "deliver many times per real tick"), which is safe — only the literal zero/non-finite case
needed guarding against.

## Distribution

### Why a PWA instead of Capacitor/native app-store distribution

The maintainer originally asked for Android/iOS "native app" support. Two native routes were
considered and rejected: Capacitor-wrapped app-store publishing needs an Apple Developer account, a
Google Play Console account, code-signing secrets, and a human-gated store-review process the
automation can never fully own end-to-end; a full React Native rewrite is a much larger, indefinitely
dual-maintained codebase sharing only the DOM-free `engine.js` layer with the web app. A PWA (via
`vite-plugin-pwa`) was chosen instead specifically because it stays 100% within what this repo's
existing fully-automated PR/CI/deploy pipeline can build and ship end-to-end, with zero new accounts,
secrets, or ongoing manual review — at the cost of no real app-store listing. If app-store presence
becomes a real requirement later, Capacitor is the natural next step (it can wrap the same built
`dist/` output), but that's a deliberate, human-initiated escalation, not something this repo's
automation should reach for on its own.

## Testing

The unmount-before-`vi.useRealTimers()` ordering requirement (see CLAUDE.md's Testing section) isn't
merely a style preference — it's a real regression that was caught while raising `TICK_RATE_MS` to
10Hz: unmounting while fake timers are still active lets the effect cleanup's `clearInterval` cancel
the pending periodic callback against the same (fake) timer implementation that scheduled it;
unmounting afterward calls the *real* `clearInterval` with a stale fake-timer id, which silently fails
to cancel it, leaving a live interval running that starves subsequent `userEvent`-based tests into
timing out.

`yarn test`'s 356 tests all assert against the current tier/resource id scheme (`MONEY_ID = 'Ones'`,
tier ids `tier01`/`tier02`/… with display names `Tens`/`Thousands`/…) — don't reintroduce the older
lowercase scheme (`'money'`, `'ones'`, `'hundreds'`) that a previous, unfinished rename left behind in
the tests; that mismatch has been reconciled in favor of the current `layers.js`/`engine.js` source.
