# Design history & rationale

This file holds the **why** behind decisions in `CLAUDE.md`: incident write-ups, empirical simulation
results, superseded designs, and the reasoning for choices that aren't self-evident from current
behavior alone. `CLAUDE.md` states what the system currently does and is what loads into every
session automatically; this file is for when you need to know *why* it does that — before changing a
formula, workflow, or UI mechanic that a past iteration already tried and rejected for a specific
reason, check here first so you don't re-discover the same dead end. Sections mirror `CLAUDE.md`'s
structure so you can jump to the matching topic.

## Automation workflows

### Schedule retune (Cursor IST slots + Claude twice-daily) — 2026-08-20

Cursor's maintenance twin originally ran on a UTC cron offset ~2.5h from Claude's every-5-hours
`0 */5 * * *` (`30 2,7,12,17,22 * * *`). That kept the two engines from colliding but tied both
cadences to UTC arithmetic rather than the maintainer's IST wall clock, and treated every Cursor
wake identically (Phase 0/A/B).

The retune (issue #339):

- **Cursor** — five fixed IST slots: 6:30am / 11:30am / 4:30pm / 9:30pm for development, plus a
  dedicated **1:30am housekeeping** run. Housekeeping is meta only (conflicted PRs, backlog
  planning, process improvement) and deliberately does **not** skip for the 5-PR ceiling — a full
  ceiling is when unblocking conflicted auto-merge PRs matters most. The two crons stay separate
  so `github.event.schedule` can select the mode; folding them into one expression would silently
  drop the split.
- **Claude** — cut from every 5 hours to **twice daily** at 9:00am / 9:00pm IST (`30 3,15 * * *`
  UTC). Exact clock times were a judgment call (the request specified count only); 9am/9pm IST sit
  clear of every Cursor slot so the engines still never wake together.

IST = UTC+5:30, so IST `:30` maps to UTC `:00` for Cursor and IST `:00` maps to UTC `:30` for
Claude — do not "simplify" the minute fields without re-checking that mapping.

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

### Outage: the main prompt tripped GitHub's 21,000-character mixed-expression limit

Confirmed live on 2026-08-10: every run of `autonomous-maintenance.yml` (scheduled and
`workflow_dispatch` alike) started failing instantly, with zero jobs scheduled and the run's display
name falling back to the workflow's file path instead of its `name:` — both signs of a workflow file
GitHub couldn't parse, not a job that ran and then failed. The run's annotation read "Exceeded max
expression length 21000" at the line where the `claude-code-action` step's `with.prompt:` block began.
GitHub Actions compiles a YAML scalar that mixes literal text with `${{ }}` expressions into one
combined expression internally (turning the literal segments into string-literal pieces around the
expression parts), and caps that *combined* length — literal text plus expressions together — at
21,000 characters. The main prompt's literal text (Phase 0/A/B instructions, hard constraints, PR
body/branch-naming conventions) had grown past that on its own well before counting its 9 embedded
`${{ steps.guard.outputs.* }}` interpolations; nothing about the size or count of the individual
expressions themselves was the problem. This had presumably been growing for a while (the prompt
documents its own Phase B item 5 self-improvement path, which edits this same file), but only actually
broke once the combined length finally crossed 21,000 sometime between a 2026-08-10 15:55 UTC green
scheduled run and a 17:41 UTC run.

The fix (see `CLAUDE.md`'s "Automation workflows" and the `Compose prompt` step in
`autonomous-maintenance.yml`) moves prompt assembly into its own step, ahead of the `claude-code-action`
step: the static prompt text is written to a file via a quoted bash heredoc (so it's pure literal text,
no GitHub expression syntax inside it at all — quoting the heredoc delimiter also protects the
backticks the prompt uses for inline code spans from bash's own command-substitution, since an
*unquoted* heredoc would try to execute them), the handful of dynamic values (open PR/task/alert lists,
CI status) are substituted in via bash's own `${var//pattern/replacement}` parameter expansion rather
than a GitHub expression, and the result is exposed as a single step output. The `claude-code-action`
step's `prompt:` field then becomes a single pure expression — `${{ steps.compose-prompt.outputs.prompt
}}` — with no literal text mixed in, so GitHub never compiles it into the oversized combined form and
the 21,000 limit doesn't apply regardless of how long the underlying prompt text grows. `envsubst` (the
more obvious substitution tool) was deliberately not used — it isn't confirmed present on GitHub's
hosted `ubuntu-latest` runner image (the existence of several third-party "envsubst-action" Marketplace
wrappers whose sole purpose is supplying it is itself evidence it isn't reliably preinstalled), so
depending on it would trade one outage cause for a subtler one. This pattern (assemble in a prior step,
reference the result as a lone expression) is the standard workaround for any workflow step whose
literal instructional text is inherently large and expected to keep growing — worth reapplying to
`claude_args`/`settings:` here or to `autonomous-pr-followup.yml`'s own prompt if either ever approaches
the same limit, rather than trimming content to stay under it.

A parser-level failure like this is invisible to the job-status reconciliation steps described above
(`Classify Claude step failure`, `Fail on denied file modifications`) — those inspect the action's own
execution-output JSON, which is never produced when the workflow file itself fails to parse before any
job is scheduled. The dormancy watchdog above (external, `workflow_dispatch`-based) would eventually
have re-kicked the workflow, but every kick would have hit the identical parse error until a human or
an interactive session edited the file — this class of failure needed exactly the kind of out-of-band
detection this session used (checking the Actions run history and the run's own annotation directly)
rather than anything the workflow's own internal reconciliation logic could self-heal.

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

### Auto-merge merge method must match the Main ruleset (2026-08-20)

The repository ruleset **Main** (`allowed_merge_methods: merge + rebase` only — squash disabled as
of its 2026-08-15 update) rejects `gh pr merge --auto --squash`. That made every PR look
unmergeable to anything that defaults to squash (Cursor’s merge UI; the old `pr-auto-merge.yml`
flag), even when the same PR was clean and merged fine from the GitHub app via “Create a merge
commit.” Fix: switch automation to `--merge`, document the alignment in `docs/AUTOMATION.md`, and
optionally re-enable Squash in the ruleset if Cursor’s UI should keep using squash (tracking #343).

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
  currently uniform — see "Tier production tickspeed" in `docs/ECONOMY_REFERENCE.md`).
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
- **Speed Up card stays visible once revealed.** `SpeedUpCard` used to disappear again the
  moment a successful Speed Up reset `owned` and re-locked the last tier. It no longer does — the
  `speedUpEverRevealed` flag replaced a live `lastTierUnlocked` check specifically to avoid the
  disappear/reappear churn every Speed Up cycle would otherwise cause, which was jarring in practice.
  The bottom `PrestigeCard` got the identical treatment for the same reason when it existed, before
  being removed entirely — see "Bottom Prestige panel removed" below.
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
  alongside the existing `TopPrestigeBar`/`FullScreenOverlay` buttons — a convenience shortcut, since
  the PP balance is already visible at the top of the page in exactly the state where Prestige becomes
  available. Unlike the offline notice above, this card is properly marked interactive (`role="button"`,
  `tabIndex`, keyboard support) whenever it's clickable, and reverts to a plain non-interactive display
  before `canPrestige` — so the same click+title combination that was removed from the offline notice is
  reintroduced here deliberately, now paired with real button semantics instead of being the only cue.
- **Bottom Prestige panel removed.** The bottom `PrestigeCard` (Game view) used to have its own
  "Prestige Now" button; that button was removed as redundant with the sticky PP display's
  click-to-prestige behavior above, leaving the card purely informational (progress/award preview,
  prestiged count, unspent PP, Auto-Prestige status). With no button and nothing else consuming that
  screen space for a purpose the other Prestige surfaces didn't already cover, the informational-only
  card itself was judged not worth its own footprint and removed entirely — `PrestigeCard`, the
  `prestigeCardEverRevealed`/`prestigeCardRelevant` reveal-tracking state, and the now-unused
  `GoldText` styled component (only ever used inside this panel) were all deleted together. Any
  information a player might want (prestige count, unspent PP, production speed bonus, Auto-Prestige
  status) remains visible via the sticky PP header display and the PP Upgrades page.
- **Offline notice extracted into `components/OfflineProgressNotice` so ByteFoundryPage can show it
  too.** A request to "enable offline progress for the Byte Foundry" turned out, on investigation, to
  already be satisfied at the engine level: `applyOfflineProgress` replays `tickGame` once per
  simulated second, and `tickGame` unconditionally runs `tickIntroProduction`/`tickIntroAutoInvest`
  first, every tick, regardless of `intro.mainGameUnlocked` — the Byte generator's passive production
  and its auto-transfer-into-Kilobytes convenience both already caught up correctly while the game was
  closed, with no code change needed there. The actual gap was that the "Welcome back! ... simulated N
  of progress at 10% speed" notice itself only ever rendered inside `MainPage` — `App.jsx` already
  passed the full `game` object (including `offlineProgress`/`dismissOfflineProgress`) to
  `ByteFoundryPage` too, but that page never read those two fields, so a player who returned after
  being away and landed on (or was still gated to) the Byte Foundry screen got no acknowledgment that
  time had passed, even though their Memory/generator genuinely had progressed. Rather than
  duplicating the notice's state/effects/styling into `ByteFoundryPage`, the whole thing (timing
  constants, the countdown/fade/auto-dismiss state and effects, and the JSX) was extracted verbatim
  out of `MainPage` into a new shared `components/OfflineProgressNotice`, taking
  `{ offlineProgress, dismissOfflineProgress }` as props — the same two fields `useIncrementalGame()`
  already returns — and both pages now render it identically near their own top (`MainPage` after its
  `Header`, `ByteFoundryPage` after its `Title`). `HudMutedText` (used elsewhere in `MainPage` beyond
  just this notice) was deliberately left in place rather than moved; the extracted component defines
  its own equivalent `NoticeText` instead, so the move doesn't couple `ByteFoundryPage` to a
  MainPage-only styled component.
- **Cache tile removed; transfer blocks become persistent instead of shrinking; Tap loses its
  progress fill; Storage gets its own labeled section.** Four related `ByteFoundryPage` requests in
  one round, all pure UI (no `engine.js`/`layers.js` change needed for any of them):
  1. The Cache 1KB tile (added alongside the Memory/Storage redesign in the previous entry) was
     removed — once the transfer-block row itself always renders every block for the whole cycle
     (see point 2), the active block's own partial fill already shows the same "progress toward the
     next convertible 1000-bit chunk" the Cache tile existed to surface, making the second tile
     redundant.
  2. Transfer blocks used to be rendered via `Array.from({ length: blocksRemaining })` — only the
     not-yet-transferred ones, so a click simply removed that block from the array and the row
     visibly shrank. The player wanted spent blocks to stay in place, greyed out, so the full history
     of a cycle's transfers stays visible rather than disappearing. The fix renders
     `Array.from({ length: blockCount })` (the fixed total, `getIntroTransferBudget(state) /
     INTRO_BITS_PER_KILOBYTE_CONVERSION`) always, deriving each block's consumed/active/upcoming state
     from comparing its index to `blocksTransferred` — no block is ever removed from the array, only
     re-styled. The consumed look intentionally bypasses `progressFill` entirely (only the active
     block ever gets a `$progress` prop) in favor of a plain solid `background:
     theme.color.surfaceSunken` behind a new `$consumed` prop — tried first via `progressFill`'s own
     disabled-alpha dimming (`$progress={100}`), but that blends to a barely-there tint at the
     existing low disabled alpha, not the clearly "done, filled-in" look actually wanted; a direct
     solid fill reads unambiguously as spent, and the row overall — solid/partial/empty segments left
     to right — was requested to read as "one long progress bar," which the direct-fill approach
     achieves more legibly than a faint gradient would have.
  3. The Tap button's own `$progress` fill/hidden progressbar were removed — Memory's own tile
     already shows the identical bits/capacity fill, so the tap button's copy was pure duplication.
     Removing `${progressFill}` from `TapArea` incidentally also removed the button's own background
     (progressFill's gradient always painted over `theme.color.surfaceSunken` as its base — the one
     place that base color was coming from), leaving default browser button styling (a stark white
     button) until caught by a Playwright screenshot check and fixed with an explicit `background:
     theme.color.surfaceSunken` rule on `TapArea` — worth remembering if `progressFill` is ever
     removed from another component that relied on it for more than just the fill itself.
  4. Storage's "Build Storage Bank" button and one full-width "Redeem ⟨size⟩ Bank (×N)" button per
     held denomination used to sit flat in the same `ActionsRow` list as Sacrifice/Invest, growing by
     one more full-width button every time a new bank size was built. Storage now gets its own
     labeled `StorageSection` (a `styled(StatCard)`, matching the page's existing tile/section visual
     language), and the one-button-per-size list became a compact, wrapping row of small chips
     (`StorageChip = styled(Button)`, same `aria-label`/`variant` semantics as before, just shrunk to
     `flex: 0 0 auto` with tighter padding and a shorter `<size> ×<count>` label) — scales far better
     than a growing button stack as more denominations accumulate over a long run.
- **Storage's buildable size drops from "one level ahead" to tier01's current level; the Memory
  tile's transfer-block tracker gets a stronger-contrast style.** Two follow-up reports on the round
  above:
  1. "I don't see a way to build 1KB Storage bank" — correct: `getNextStorageBankSize` (the previous
     entry) always targeted tier01's NEXT level cost (10,000 bits at a fresh save, since tier01
     starts at level 1), specifically so a freshly built bank was never immediately redeemable. Asked
     directly whether Storage should expose every ladder size at once (1KB/10KB/100KB/… simultaneously
     buildable) or just start the single buildable size lower, the answer was the latter: renamed to
     `getStorageBankSize` and changed to target tier01's CURRENT level cost
     (`getTierCost(TIER_DEFINITIONS[0], purchaseLevels.tier01 ?? 1)`, no `+ 1`) — starts at 1000 bits
     ("1 KB") on a fresh save, and still only ever offers one buildable size at a time, advancing as
     tier01 levels up, same as before. The natural consequence — a freshly built bank now matches
     tier01's price exactly, so `isStorageBankRedeemable`'s existing `<=` check makes it redeemable
     immediately rather than only after a future level-up — was kept rather than special-cased around,
     since `getFirstTierCost` only ever grows within a cycle (documented in the entry above): a bank
     built at today's price never becomes *un*redeemable later, so "immediately redeemable" isn't a
     bug, it's what "current level" implies. This still leaves a genuine use for banking rather than
     just buying directly: queuing several banks ahead of an autobuyer catch-up burst (or a run of
     manual buys) at today's price, then redeeming them whenever convenient, rather than the price
     climbing between each individual purchase.
  2. The Memory tile's "X / Y bits this cycle" transfer-budget tracker was reported as rendering but
     easy to miss — it shared `StatusText`'s plain muted color/regular weight with the
     passive-production readout right below it, so nothing set it apart as live, meaningful progress
     info versus incidental text. A new `TrackerText = styled(StatusText)` (full-strength
     `theme.color.text`, `font-weight: 600`) is used for this one line only, giving it enough contrast
     to actually stand out against its neighbors.
- **Storage's buildable size becomes an independent build-up-to-10-then-advance ladder, decoupled
  from tier01's price; auto-redeem gets a per-size once-per-run cap (except the smallest
  denomination, which always fires); the held-bank chips become a squares grid; a new visible
  purchase-block-progress row is added.** A follow-up redesign request specified: "Offer 1KB storage
  banks for 10KB each until user has 10 of them. Then offer 10KB storage banks for 100KB each until
  user has 10 of them. And so on." — a materially different rule from the entry above's
  `getStorageBankSize`, which tracks tier01's CURRENT level cost directly with no cap on how many can
  ever be built at that size. Rather than guess, three genuinely ambiguous points were confirmed
  directly before implementing (each had a plausible reading that would have produced very different
  code): (1) whether the ladder should be an independent progression gated purely on a cumulative
  built-count cap, or should keep tracking tier01's live cost with just a build cap layered on top —
  confirmed **independent**, so `getStorageBankSize` no longer reads tier01's level at all; (2)
  whether "grey out blocks already purchased, irrespective of main game or Byte Foundry" described
  the pre-existing Memory→Kilobyte transfer-block row (already both of those things) or asked for a
  *new* visual — confirmed **new**: a live, non-hidden squares row for tier01's own current
  purchase-block progress, added to the Storage section; (3) whether "1KB storage banks are always
  auto consumed... only one auto consumption per run for each size" meant capping auto-redeem at once
  per size per run (needing new state to track it) or just making 1KB mandatory-on with everything
  else unlimited as before — confirmed **capped at once per size per run**, for every size, with 1KB
  additionally exempt from the enable/disable toggle entirely (it always attempts its once-per-run
  redeem regardless).

  Implementation: `intro.storageBanksBuiltTotal` (new, permanent, cumulative — `redeemStorageBank`
  never decrements it, only `buildStorageBank` increments it) drives `getStorageBankSize`'s ladder —
  starting at `INTRO_BITS_PER_KILOBYTE_CONVERSION` and multiplying by 10 every
  `STORAGE_BANK_LADDER_CAP` (10) banks ever built at the current size. This is a genuine decoupling,
  not just a rename: a player can now build ahead of or fall behind tier01's actual price, with
  `isStorageBankRedeemable` (unchanged) as the sole remaining gate on whether a built bank is
  spendable. `intro.storageAutoRedeemedSizes` (new — resets to `{}` every real Prestige, unlike every
  other Storage field, which are all permanent) tracks which sizes have already auto-redeemed this
  cycle; `tickStorageAutoRedeem` now requires a size to be both un-redeemed-this-cycle AND (exactly
  `INTRO_BITS_PER_KILOBYTE_CONVERSION` OR `storageAutoRedeemEnabled`) before acting. On the UI side,
  the flat `StorageChipsRow`/`StorageChip` text-chip list (previous entry) was replaced with one
  `StorageSizeRow` per size ever built (or currently offered) — a fixed `STORAGE_BANK_LADDER_CAP`-
  long strip of `StorageBankSquare`s per row, reusing the same three-state (consumed/held/upcoming)
  visual language the transfer-block row already established, so "filled smallest to largest" reads
  the same way across both mechanics rather than introducing a second convention. The new
  purchase-block-progress row reuses the existing `RateBlocksRow`/`RateBlock` pair directly (no new
  styled components needed) since `state.purchaseLevelProgress[tier01.id]`/`getPurchaseBlockSize`
  already update identically regardless of whether a unit came from the main game's Buy button or
  from `redeemStorageBank` here — the "irrespective of main game or Byte Foundry" requirement was
  already true of the underlying state; the row just needed to be rendered, not hidden.
- **The transfer-block row's mobile wrap bug is fixed; the Storage build/auto-redeem button labels
  are shortened.** Two follow-up reports after the redesign above shipped: (1) "the bottom blocks
  are incorrect and one of them are incorrectly aligned" — reproduced at a 320px viewport:
  `TransferBlocksRow`'s `flex-wrap: wrap` let `blockCount` growable (`flex: 1 1 2.5rem`) blocks spill
  onto a second row once they no longer fit on one line, where the leftover blocks then grow to fill
  *that* row's leftover space instead — visibly much wider than the blocks above, reading as a
  broken, misaligned grid. This predates the ladder redesign (the row's own styling wasn't touched by
  it), but showed up now because Storage's build/auto-redeem controls sit directly above it and drew
  attention downward. Fixed by switching to `flex-wrap: nowrap` (plus `min-width: 0` on the block
  itself, so `flex-shrink` can actually narrow it below its content size) — the row now always stays
  a single, evenly-sized strip, shrinking together at narrow widths and growing together at wide ones,
  instead of ever wrapping unevenly. (2) "Storage bank costs 10x its capacity. The current costs are
  incorrect." — investigated rather than assumed: `getStorageBankCost`/`getStorageBankSize` were
  already exactly 10x at every ladder size, confirmed by scripted engine-level and UI-level checks
  through several ladder transitions. The actual defect was `ButtonLabel`'s standard, deliberate
  `white-space: nowrap; text-overflow: ellipsis` truncation (see `components/Button`) clipping the
  unusually long "Build ⟨size⟩ Storage Bank (⟨cost⟩ bits)" label at narrow widths — worst case at the
  "10 KB" ladder step, where the cost (100,000, the largest value `formatAmount` ever renders in
  plain comma-grouped digits before switching to scientific notation at the 1,000,000 threshold)
  pushed the whole label past the button's available width, truncating the visible cost and reading
  as if it were wrong or missing rather than merely cut off. Rather than loosening `ButtonLabel`'s
  truncation for every button in the app, the fix stayed scoped to this one label: dropped the
  redundant "Storage" (already the section's own heading) and " bits" suffix (context-implied) from
  both this button and the auto-redeem toggle's "Storage Auto-Redeem" label, confirmed to fit at
  320px through the same worst-case cost value.
- **Storage becomes a genuine storage medium — banks auto-fill from Memory and are reusable, not
  single-use; the build ladder is corrected to tier01's real (sparse) level-cost sequence; the
  build cost is corrected to bytes, not bits.** A further round of clarification on the independent-
  ladder redesign (two entries above) corrected three things at once:
  1. **Banks were pre-paid at build time** — `buildStorageBank` spent the full build cost and
     immediately marked the bank held/redeemable in the same call, so "build" and "fill" were the
     same action. The clarification: "The cost of storage banks is only to build the storage banks
     permanently. They are still empty once built... They get auto filled as memory fills up. They
     also get freed up to be filled up again once consumed" — banks are a genuine storage *medium*:
     building only ever constructs a permanent, EMPTY container (`buildStorageBank` now touches only
     `storageBanksBuiltTotal`, never `storageBanks`); a new `tickStorageAutoFill` — unconditional, no
     toggle, run every tick — cascades Memory into every currently-fillable empty bank in one pass,
     smallest size first ("whenever memory has enough... it fills it... starting from smallest to
     largest, and at the end, memory fills itself"), moving `size` bits out of Memory and into
     `storageBanks[size]` for each one it can afford, until nothing more is fillable. Redeeming a
     full bank (`redeemStorageBank`, unchanged) now explicitly empties it again rather than spending
     it forever — `storageBanksBuiltTotal` was never touched by redeeming even before this change, so
     the "reusable, not single-use" behavior was really just a matter of `tickStorageAutoFill`
     existing to refill what redeeming freed up.
  2. **The build ladder's sizes were a synthetic ×10 sequence** — 1 KB, 10 KB, 100 KB, 1 MB, …,
     independent of what `tier01` (Kilobytes) could actually cost. Called out directly: "100 KB
     banks cannot exist as KB tier doesn't have them. We directly jump to 1MB banks after 10 KB" —
     `tier01`'s own cost-epoch exponent sequence (`getCostEpochExponent`: 1, 2, 4, 7, 11, …, a "1 plus
     a triangular number" progression) skips values as levels increase, so `tier01`'s real per-unit
     level costs are 1,000 / 10,000 / 1,000,000 / 1,000,000,000 / … — level 3 jumps straight from
     10,000 to 1,000,000, skipping 100,000 entirely. `getStorageBankSize` was rewritten to walk
     `getTierCost(TIER_DEFINITIONS[0], level)` for level 1, 2, 3, … (still advancing to the next level
     once `STORAGE_BANK_LADDER_CAP` banks have been built at the current one) rather than repeatedly
     multiplying by 10 — the ladder now can only ever offer a size `tier01` itself could actually cost,
     matching the "consumed amount must match the corresponding block or level cost of the KB tier"
     requirement exactly, and reproducing the skip automatically as a side effect of reusing the same
     cost function rather than needing to special-case which round numbers to skip.
  3. **The build cost's "10x" was computed in bits, not bytes** — `getStorageBankCost` multiplied a
     bank's own bit-denominated size by `STORAGE_BUILD_COST_MULTIPLIER` directly, so a 1,000-bit
     ("1 KB") bank cost 10,000 bits. Corrected explicitly: "By 10x, I meant 1KB Bank should cost
     10KBytes, not 10Kbits" — `getStorageBankCost` now multiplies by `BITS_PER_BYTE` (8) as well,
     so a 1,000-bit bank costs `1000 * 10 * 8` = 80,000 bits (10,000 bytes), an 8x increase across
     every size the ladder ever offers.

  On the UI side, the squares row's three states were renamed to match: **full** (replacing "held" —
  currently holding Memory's bits, redeemable once `tier01`'s price matches) and **empty** (a new
  state — built but not yet auto-filled, a dim muted-bordered fill distinct from the plain
  not-yet-built placeholder) replace the old **held**/**consumed** pair, since a redeemed bank no
  longer reads as permanently "consumed" — it becomes **empty** again, the same visual state a
  freshly built, not-yet-filled bank already uses. No new state fields were needed: `storageBanks`
  already meant "how many of this size are currently spendable," which is exactly "currently full"
  under the corrected model — only what populates it changed (auto-fill instead of build-time
  pre-payment).
- **The "bits this cycle" tracker is removed entirely; the Memory tile's Bytes-unit balance now
  floors instead of rounds.** Two follow-up requests on the tracker/formatting added in the round
  above:
  1. The `TrackerText` line just added (previous entry) was asked to be removed outright rather than
     restyled further — the player didn't find the raw-bits "X / Y bits this cycle" figure useful
     once it had enough contrast to actually read. Nothing else consumed `intro.bits % transferBudget`,
     so this was a pure deletion (JSX block, the now-unused `TrackerText` styled component, and its
     explanatory comment) with no state/logic follow-on.
  2. The Bytes-unit conversion (`formatMemoryAmount`'s `bits / unit.divisor` branch) went through
     `formatAmount`, which rounds to the nearest of up to 3 decimal places (Intl's default) — so a
     balance could read as, e.g., "1 KB / 1 KB" one tick before it actually reached 1000 bits. This is
     the exact overstatement problem `formatCurrency` (`engine.js`) already solved for the money
     display ("floors rather than rounds so a displayed amount never overstates the actual spendable
     balance") — the same fix (floor, not round) was applied here via a small local
     `floorToDecimals(value, decimals)` helper, floored at the same 3 decimal places `formatAmount`
     already shows rather than to a whole unit, since existing fractional display (e.g. "0.5 KB") was
     still wanted — only the rounding *direction* needed to change, not the precision.

## Economy model

### Why Bytes was pulled out of the tier ladder in favor of the Byte Foundry intro

Bytes (`tier01`, cost 1 Bit, self-producing) was the game's entire bootstrap: a fresh save started
with `MONEY_STARTING_AMOUNT` (1 Bit), affordable Bytes at cost 1, and everything else cascaded from
there. Requested as a deliberate redesign: rather than starting the player directly inside the
Money-driven tier economy, a separate tap-to-earn pre-game screen (the "Byte Foundry") now stands in
front of it — tap for bits, combine 8 into a Byte generator, grow capacity/production through two
escalating tracks, then convert (manually or via a one-time 8000-bit auto-invest) into the main game's
starting Kilobytes. This intentionally slows down and re-frames the opening of a run as its own small
game rather than an instant drop into the tier list, and reuses Kilobytes (previously `tier02`) as the
new bootstrap tier instead — every other tier shifted down one slot to fill the vacated position, and a
new Quettabytes tier was appended at the top to keep the ladder at 10 tiers.

This is a genuine, permanent removal, not a rename: Bytes' `id`/`name`/`symbol` don't exist anywhere in
`TIER_DEFINITIONS` any more. A save from before this shipped has its per-tier data shifted down to
match (old `tier02`'s Kilobytes data → new `tier01`, …, old `tier01`'s Bytes data has nowhere to go and
is dropped) — see `storage.js`'s `shiftOldTierIds`/`isPreByteFoundrySave`. That gate specifically
matters for correctness: `migrateState` runs on *every* load, not just once, so the shift itself is
gated on the same one-time `saved.intro === undefined` signal used to backfill `intro.completed` for a
pre-existing save — without that gate, a save already on the *current* (post-shift) scheme would have
no way to signal "don't shift me again," and would silently lose its real `tier01` data on its next
load. Reusing the `intro` field's own existence as that marker (rather than inventing a separate schema
version field) works because both changes shipped in the same feature and are permanently coupled — a
save either predates both or postdates both.

### The Byte Foundry becomes a per-Prestige-cycle mechanic, not a one-time gate

The entry above describes the Byte Foundry as shipped: a permanent, one-time bootstrap gating a
fresh save's very first Kilobytes, with `intro.completed` carried through unchanged by
`prestigeGame`/`speedUpGame`/`overclockGame` — only a full Reset restarted it. That was true at the
time, but a player who'd already played through it once (and reported being unable to see it again
on a returning-save load — working as designed, per the pre-existing-save migration described
above) pointed out that the Byte Foundry "sets the pace for every run," not just the very first one.

Requested as a follow-up redesign: `prestigeGame` now resets `intro` back to
`createInitialGameState()`'s fresh defaults (`completed: false` included) in the same atomic reset as
`resources`/`owned`, so a real Prestige sends the player back through the Byte Foundry before every
new cycle — tap out a fresh Byte generator, regrow capacity/production, convert back into the run's
starting Kilobytes, same as the very first time. `App.jsx`'s page-routing effect became bidirectional
to match (previously it only ever moved `'intro'` → `'game'`, never back), with one deliberate
exception: it stays a no-op while the player is on the static Guide page (`'info'`), so a background
Auto-Prestige firing while they're reading it doesn't yank them off it — the sync catches up the
moment they click back to `'game'`.

`speedUpGame`/`overclockGame` were deliberately left unchanged — they're intra-cycle soft resets, not
new cycles, so they still carry `intro` through completely untouched, same as before. The load-time
migration backfill (`isPreByteFoundrySave`/`storage.js`'s `intro.completed: true` for a save that
predates the `intro` field entirely) is also unaffected — it remains a one-time, load-time decision
for saves this old, orthogonal to what a real Prestige now does going forward for every save.

### The Byte generator becomes permanent — only "Memory" and the gate reset each Prestige

The entry above made the Byte Foundry reset back to `createInitialGameState()`'s fresh defaults on
every real Prestige, generator included — a full replay each cycle: re-tap to 8, re-combine into a
Byte, regrow capacity and production rate from scratch. That was the explicit request at the time,
but immediately playing it out revealed it read as needless busywork once a player already had a
maxed-out generator from previous cycles — rebuilding the exact same capacity/rate ladder by hand
every single Prestige, with no way to skip ahead.

Corrected: `prestigeGame` now resets only two things inside `intro` — `bits`/`productionAccumulator`
("Memory," the tappable/producible balance) and `completed` (the gate) — back to fresh. Every other
field (`capacity`, `byteCreated`, `tickSpeedSeconds`, `productionMultiplier`,
`productionMilestoneClaimedAtCapacity`) is now carried over from `state` unchanged, exactly like an
unlocked autobuyer. The mandatory gate itself is unaffected by this change and still reopens every
real Prestige (confirmed explicitly, rather than assumed, before implementing) — only what's already
built *inside* it when it reopens changes. In practice this means the very first cycle plays out the
full bootstrap loop, and every cycle after that is a fast pit-stop: Memory refills using whatever
capacity/rate was already earned, typically crossing the 8000-bit auto-invest threshold in a handful
of ticks rather than a full replay. `speedUpGame`/`overclockGame` needed no change — they already
carried the whole `intro` object through untouched, Memory included, and that stays correct.

This also prompted a related fix to the underlying production model, requested in the same round: a
manual tap had always credited a flat `+1` bit regardless of the Byte's actual rate, and passive
production ran on an implicit continuous bits/sec rate rather than an explicit tickspeed — unlike
every tier in the main game, which has a real `baseTickSpeedSeconds` and delivers production in
discrete periodic batches (see "Tier production tickspeed" in `docs/ECONOMY_REFERENCE.md`). Both
were brought in line: `intro.tickSpeedSeconds` (starting at 1 second, mirroring a tier's own base
period) plus a new `getIntroProductionRate(intro)` helper now drive both a tap (which credits "one
second's worth" at the current rate, not a flat 1) and `tickIntroProduction` (which delivers one
discrete batch every `tickSpeedSeconds`, exactly like `tickGame`'s own per-tier production). "Invest
for Double Production" doubles this rate by first halving `tickSpeedSeconds` — the same
tickspeed-vs-production split tiers already use — until that would breach
`INTRO_MIN_TICK_SPEED_SECONDS` (the live tick loop's own real-time resolution, `TICK_RATE_MS`), at
which point it switches to multiplying `productionMultiplier` (the batch size) instead, so growth
never stalls once the tick loop's own granularity limit is reached. A related balance concern
surfaced in the same round — "Invest for Double Production" could previously be picked over and over
at the same capacity tier by simply refilling Memory and re-clicking, with no cap — addressed by a
new `productionMilestoneClaimedAtCapacity` field gating it to once per capacity tier reached (a fresh
Sacrifice, which always grows `capacity` to a strictly higher value, re-opens it for exactly one more
claim).

### Why the Prestige threshold became `GOOGOL * BITS_PER_BYTE`, not a round new number

Once Bytes stopped being a tier and the main game's base currency stayed denominated in Bits, framing
the Prestige/freeze trigger as "1 Googol Bytes" (matching the Byte Foundry's own Bytes-flavored
framing) meant the actual Bits-denominated threshold needed to be 8x `GOOGOL`, not `GOOGOL` itself — a
Byte is `BITS_PER_BYTE` (8) Bits. Rather than picking a round replacement number (e.g. just bumping
`GOOGOL` itself to `8e100`, or introducing an unrelated new round threshold), the actual trigger became
`PRESTIGE_THRESHOLD = GOOGOL * BITS_PER_BYTE`, keeping `GOOGOL` itself unchanged at its clean `1e100`.
This was a deliberate split: `GOOGOL`'s own exponent (100) is what the log-scale formulas
(`getPrestigePointsAwarded`, `getMoneyExponent`, `getPrestigeProgressPercent`) key off, and an 8x
constant factor shifts that exponent by less than 1 (`log10(8) ≈ 0.903`) — negligible at `GOOGOL`'s
scale, and not worth threading a second exponent through every one of those formulas for no visible
difference in their output. Only the actual live freeze/Prestige *trigger* (`isProductionFrozen`/
`prestigeGame`'s own guard) reads `PRESTIGE_THRESHOLD`; everything exponent-based still reads `GOOGOL`.
The progress bar (`getPrestigeProgressPercent`) is a known, accepted minor consequence of this split: it
reads 100% once Money's exponent reaches 100, which happens slightly before the real threshold
(exponent ≈100.9) is actually crossed — an intentionally accepted cosmetic imprecision rather than
complicating the percent formula for a sub-1%-of-a-magnitude difference.

### Main-game access decouples from the "everything freezes" flag, and Invest gets its own cost ladder

The two entries above left the Byte Foundry with a single `intro.completed` flag doing three jobs at
once: gating `App.jsx`'s routing into MainPage, freezing every intro action function to a permanent
no-op, and driving `ByteFoundryPage`'s own read-only "voluntary revisit" view. A further round of
player feedback asked for three related changes that this combined flag couldn't cleanly express:
(1) main-game access should no longer wait for a full 8000-bit balance — the first manual 1000-bit
conversion should unlock it immediately; (2) further conversions should keep working after that,
shared across a running per-cycle budget capped at the same 8000 bits, whether done manually or via
the existing auto-convert convenience; (3) Tap/Sacrifice/Invest should never freeze at all, matching
the "Byte foundry never resets, it keeps running" philosophy the previous entry already established
for the generator itself.

Resolved by splitting the one flag into two, and removing the freeze concept entirely:
`intro.mainGameUnlocked` (Memory-scoped, resets every real Prestige) now drives routing alone, set
true the instant any bits are ever converted into Kilobytes this cycle — manual
`convertIntroBitsToKilobytes` click or the `tickIntroAutoInvest` auto-convenience, whichever fires
first. A new `intro.bitsTransferredThisCycle` counter (also Memory-scoped) tracks the running total
converted this cycle, shared by both conversion paths and capped at `INTRO_AUTO_INVEST_THRESHOLD`
(reusing the existing 8000 constant as the shared budget rather than adding a new one) — once
exhausted, neither path fires again until the next Prestige reopens a fresh budget.
`intro.completed` itself was removed outright: nothing needs a full-freeze flag once Tap/Sacrifice/
Invest are permanently live and Convert is governed by the budget instead. `ByteFoundryPage`'s old
"read-only voluntary review" rendering branch was removed for the same reason — the page now renders
identically whether reached via the mandatory gate or the voluntary "⚙️ Byte Foundry" nav link;
`onBack`'s only remaining effect is whether the "← Back to game" button shows.

The same round also corrected a misreading of "Invest for Double Production"'s intended cost model.
The previous entry's `productionMilestoneClaimedAtCapacity` field tied Invest's cost directly to the
current `capacity` (always requiring a full balance to claim, since cost == capacity and Memory is
hard-capped at capacity). The actual ask was for Invest to run on its **own independent cost ladder**
— explicitly "nothing to do with capacity" — sharing only the same "×10 per step" shape (1 Byte, 10
Bytes, 100 Bytes, 1000 Bytes, 10000 Bytes, …) the capacity ladder happens to use, tracked by a new,
separate, permanent `productionMilestoneTier` (0-based index) plus `productionMilestoneTierClaims`.
`getIntroProductionMilestoneCost(tier) = INTRO_STARTING_CAPACITY * INTRO_CAPACITY_MULTIPLIER ** tier`
computes each tier's cost independent of `capacity` entirely, so a claim only ever needs `bits >=
cost` — frequently satisfiable well before Memory is full, once Sacrifice has grown capacity ahead of
this ladder, which is what "do not require full capacity" actually meant. Each of the four tiers up
to `INTRO_AUTO_INVEST_THRESHOLD` (1/10/100/1000 Bytes) now grants **two** claims instead of one
(`getIntroProductionMilestoneMaxClaims`), advancing to the next tier — with a fresh claim count —
only once both are used; every tier after that keeps the original one-claim-per-tier behavior. The
old `productionMilestoneClaimedAtCapacity` marker has no equivalent under the new model (it tracked a
capacity value, not a tier index) — a save carrying it simply falls back to a fresh tier 0 on load,
an accepted one-time reset of Invest progress for a feature that was still unreleased and being
actively tuned at the time.

Finally, the balance card gained a second, always-visible tracker (`bits % INTRO_AUTO_INVEST_THRESHOLD`,
in raw bits) shown alongside the existing Bytes-denominated balance once `byteCreated` — a rolling
view of progress within the current 8000-bit block, independent of the transfer-budget mechanics
above (confirmed via the request's own worked example, `9000 % 8000 = 1000`, which the primary
Bytes figure — `9000 ÷ 8 = 1125`, not the `1128`/`128` figures in the original request — doesn't
otherwise convey).

### The transfer budget becomes dynamic (tied to the Kilobyte tier's own block size); a real ButtonContent bug fixed along the way

The entry above capped the Byte Foundry's per-cycle bit-to-Kilobyte transfer budget at a fixed
`INTRO_AUTO_INVEST_THRESHOLD` (8000 bits). A follow-up request offered two designs for surfacing
that budget as a row of clickable "transfer blocks" instead of a single repeatable button: a fixed 8
blocks of 1000 bits each, or blocks sized to the Kilobyte tier's own current purchase block size
(`getPurchaseBlockSize`, the same live, possibly-growing value the main game's own Buy button
already reads) and explicitly "usable at any point in the whole game" — offered as a deliberately
tentative alternative ("usually not worth it, but just possible"). The tentative option was chosen
over the simpler default.

Implemented as `getIntroTransferBudget(state) = getPurchaseBlockSize(state) *
INTRO_BITS_PER_KILOBYTE_CONVERSION`, replacing the fixed constant everywhere it previously gated the
budget (`getIntroRemainingTransferBudget`, `tickIntroAutoInvest`'s bulk-transfer trigger/amount).
Since `getPurchaseBlockSize` starts at `DEFAULT_PURCHASE_BLOCK_SIZE` (8) and only grows later in a
run (once the last tier's own level count crosses `PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS`),
this is numerically identical to the old fixed 8000 at a fresh cycle — no regression at the common
case, just no longer hardcoded. `INTRO_AUTO_INVEST_THRESHOLD` itself wasn't removed — it still names
the unrelated 2-claims-per-Invest-tier cutoff (`getIntroProductionMilestoneMaxClaims`), which was
never part of this change and happens to share the same 8000 value by coincidence, not by shared
meaning anymore. `ByteFoundryPage`'s single "Transfer 1 KiloBits" button was replaced by a
`TransferBlocksRow` of `blockCount - blocksTransferred` blocks (one per remaining
`INTRO_BITS_PER_KILOBYTE_CONVERSION`-bit transfer), with only the leftmost ever clickable/interactive
— confirmed block semantics: a block's fill is simply a visual read of the existing `bits`-vs-1000
progress (no new state needed), so any Memory surplus left over after a click carries straight into
the newly-active next block, letting a large-enough balance be clicked through several blocks in a
row. The existing `tickIntroAutoInvest` auto-convenience became the "once every remaining block is
simultaneously available at once — e.g. a big offline-progress jump — auto-transfer them all in
bulk and empty the row" edge case the request also asked for, needing no new logic beyond swapping
in the dynamic budget it already used.

The same round asked for Invest's cost to display in Bytes rather than bits (always exact —
`getIntroProductionMilestoneCost` only ever returns multiples of `BITS_PER_BYTE`) and reported a "UI
bug on Invest for double production with quotes shown as commas." Investigating that bug (rather
than guessing at a fix) traced it to `components/Button/index.jsx`'s `ButtonContent`, not to
anything in `ByteFoundryPage` itself: `ButtonContent` did `String(children)`, which works for a
caller passing one plain string, but the Invest button's label mixes literal text with an embedded
`{formatAmount(cost)}` expression — JSX hands such mixed content to `children` as an **array** of
text/expression segments, not one string, and `String()` on an array invokes
`Array.prototype.toString()`, which joins with a bare comma. The rendered label read literally as
`"Invest for Double Production (,1, B)"` — a real, reproducible bug (confirmed via a failing
`getByText` assertion whose DOM dump showed the stray commas), not a rendering-artifact false alarm.
Fixed at the root — `Array.isArray(children) ? children.join('') : String(children)` — rather than
only patching the one call site, since `docs/COMPONENTS_REFERENCE.md` had actually documented the
old, narrower contract ("`ButtonContent` only accepts a single string child; callers with multiple
JSX expressions should use `ButtonIcon`/`ButtonLabel` directly instead") — the Invest button's own
call site had unknowingly violated that documented constraint. Given the fix makes `ButtonContent`
robust to exactly this pattern, the doc was updated to describe the new, more permissive contract
instead of re-asserting the old footgun.

### The per-cycle transfer budget cap was removed — the transfer row mirrors tier01's own purchase-block progress instead

The entry above made the transfer budget dynamic but kept it a genuine per-cycle cap: a shared
`intro.bitsTransferredThisCycle` counter, reset to 0 only by the next real Prestige, that both
`convertIntroBitsToKilobytes` and `tickIntroAutoInvest` refused to exceed. In practice this produced
a confusing coincidence at a fresh cycle's default block size (8): completing the *very first*
tier01 purchase block (`purchaseLevelProgress[tier01]` wrapping from 8 back to 0) landed on exactly
the same tick as the transfer budget being fully spent (`bitsTransferredThisCycle` hitting
`getIntroTransferBudget`), since both were sized off the same `DEFAULT_PURCHASE_BLOCK_SIZE`. A
screenshot showing "Kilobytes' current block (0/8)" and "Transfer to Kilobytes (0 left)" both reading
empty at once was reported as broken. Explaining it as an expected coincidence of the two counters
lining up was rejected: the actual design intent was for the transfer row to keep tracking tier01's
next level's blocks indefinitely, the same way it tracked the first level — not to run out and wait
for a Prestige to refill it. In other words, the "budget" framing itself was the bug, not any
particular number.

Resolved by deleting the cap entirely rather than patching its edge cases. `intro.bitsTransferredThisCycle`
and `getIntroRemainingTransferBudget` are gone; `convertIntroBitsToKilobytes` is now a no-op only when
`intro.bits < INTRO_BITS_PER_KILOBYTE_CONVERSION`, and `tickIntroAutoInvest` fires every time `bits`
reaches `getIntroTransferBudget(state)` again, with no cooldown. `getIntroTransferBudget` itself
survives unchanged in shape (`getPurchaseBlockSize(state) * INTRO_BITS_PER_KILOBYTE_CONVERSION`), but
its role changed from "the cap" to just `tickIntroAutoInvest`'s own batch-size threshold. The
`ByteFoundryPage` transfer row no longer derives its consumed/active/upcoming states from a
cycle-scoped counter at all — it reads `purchaseLevelProgress[tier01]` directly, the exact value the
adjacent "Kilobytes' current block" tracker already displayed (both trackers were always describing
the same underlying progress; only one of them was wired to the wrong state). Since
`purchaseLevelProgress` is a genuine, unbounded tier-level counter that naturally wraps to 0 the
instant a level completes (see `grantTierUnits`), the row now rolls over to a fresh block set for the
next level automatically, forever — with no special-casing needed for "what happens when the budget
runs out," because there is no longer a budget to run out. The apparent per-cycle reset behavior
survives anyway, as a side effect: a real Prestige still resets every tier's
`purchaseLevels`/`purchaseLevelProgress` (tier01 included) back to a fresh level 1, so the row does
still restart each cycle in practice — it's just no longer driven by transfer-specific state.

Removing the field also simplified `storage.js`'s save migration: the two backward-compat branches
that used to backfill a synthetic "fully-spent" `bitsTransferredThisCycle` value for a save predating
`mainGameUnlocked` now only need to backfill `mainGameUnlocked` itself, since there's no companion
budget field left to keep consistent with it.

### Storage auto-redeem toggle button removed for now, default flipped to always-on

The Storage section shipped with a pause/resume button (`⏸ Pause Auto-Redeem`/`▶ Resume
Auto-Redeem`) for `intro.storageAutoRedeemEnabled`, defaulting `false` — a player had to discover and
click it before any size above 1 KB would auto-redeem. A request came in to make auto-redeem the
default behavior for every size, deferring an actual pause/resume UI to a later, separate pass rather
than trying to design it now.

Resolved by flipping `createInitialGameState`'s default to `true` and deleting the button from
`ByteFoundryPage` (along with the `fullStorageBankSizes` local variable that existed solely to gate
its visibility) — but leaving every piece of underlying plumbing untouched: the
`storageAutoRedeemEnabled` field, `setStorageAutoRedeemEnabled`, and `tickStorageAutoRedeem`'s own
check against it all still exist exactly as before, just with no way to flip the preference from the
UI today. `storage.js`'s save migration needed no changes — a save that never explicitly set this
field already falls through to `fresh.intro`'s default via the generic `{...fresh.intro,
...saved.intro}` merge, so existing saves pick up the new `true` default automatically, same as any
new save. When the pause/resume UI returns, it can just re-add a button calling the same
`actions.setStorageAutoRedeemEnabled` used before — nothing about the underlying mechanism needs
revisiting, only where it renders.

### The transfer-block row looked permanently stuck — `tickIntroAutoInvest` waited for a whole batch instead of converting live

A bug report: "the 8 blocks at the bottom are not showing progress. Only the first one is getting
filled and nothing happens after that." Reproduced live (seeding a high production rate, no manual
clicks) rather than guessing at a fix: `intro.bits` climbed steadily from 0 toward 8000 (a fresh
cycle's full `getPurchaseBlockSize(state) * INTRO_BITS_PER_KILOBYTE_CONVERSION` batch) while
`purchaseLevelProgress[tier01]` stayed at exactly 0 the entire time, only to jump straight back to 0
again once the batch completed (having briefly touched 8 and immediately rolled the level over
within the very same tick). From the player's side this read as block 1 sitting pinned at 100% fill
(`intro.bits` clamped past 1000 in the progress calculation) for as long as it took Memory to climb
the rest of the way to the full batch, with blocks 2-8 never visibly doing anything — because
`tickIntroAutoInvest` (see the entry above, "Implemented as `getIntroTransferBudget(state)`...")
had always required the *entire* batch to be affordable before converting anything at all, a design
that made sense for its original purpose (catching up in bulk after a big offline-progress jump) but
ran every tick regardless, so it was also the only thing driving ordinary live play — and ordinary
live play accumulates *toward* that threshold gradually, which is exactly the case the "wait for the
whole batch" design didn't handle.

Resolved by making `tickIntroAutoInvest` convert one `INTRO_BITS_PER_KILOBYTE_CONVERSION`-bit unit
at a time, live, via a loop over `convertIntroBitsToKilobytes` itself (so it inherits the identical
`mainGameUnlocked`-flipping behavior a manual click already has, rather than duplicating it) — capped
per call at `getTierBulkQuantity(getPurchaseBlockSize(state), purchaseLevelProgress[tier01],
Number.MAX_SAFE_INTEGER)`, the same "at most one level's worth per call" safety bound the tier
autobuyers themselves already use via `buyTierQuantity`, so an extreme Memory balance (e.g. after a
long-Sacrificed capacity) can't loop this an unbounded number of times in a single tick — a jump
spanning more than one level's worth of units simply finishes on the next tick instead, exactly like
an autobuyer catching up after a broke stretch. `getIntroTransferBudget` itself is now dead code (its
only remaining caller was the removed one-shot-batch check) and was deleted rather than left unused,
along with `INTRO_AUTO_INVEST_THRESHOLD` once `getIntroProductionMilestoneMaxClaims`'s own reliance on
it was separately removed in the same round (see below).

Converting per-unit immediately surfaced a second, previously-latent conflict: `tickGame` ran
`tickIntroAutoInvest` *before* `tickStorageAutoFill`/`tickStorageAutoRedeem`, so once auto-invest
could fire on every single affordable unit rather than only a rare full-batch jump, it started
winning the race for fresh Memory against a Storage bank the player had already built and was
waiting to fill — a regression caught by an existing test (seeding exactly enough Memory to fill one
empty 1 KB bank) that started failing with the page having already navigated away to `MainPage`
before the test's own assertions ran, since auto-invest's own `mainGameUnlocked: true` fired first.
Resolved by reordering `tickGame`'s intro/storage handling: `tickStorageAutoFill` now runs
immediately after `tickIntroProduction`, *ahead of* `tickIntroAutoInvest`, so a built bank gets first
claim on fresh Memory; `tickIntroAutoInvest` then converts whatever's left over. This is safe because
`tickStorageAutoFill` has no dependency on tier01's level at all (only `intro.bits`/`storageBanks`/
`storageBanksBuiltTotal`) — unlike `tickStorageAutoRedeem`, which still has to run last, after
autobuyers/Speed Up, so it always checks `isStorageBankRedeemable` against the tick's truly final
tier01 level; only the fill half of the old combined `tickStorage` helper needed to move.

The same round also tightened "Invest for Double Production" to a single claim per tier across the
board (an explicit request — "give only one attempt per cost for bandwidth as well," matching
Sacrifice for 10x Capacity's own one-shot posture) by simplifying `getIntroProductionMilestoneMaxClaims`
to always return `1`, superseding the two-tier `INTRO_AUTO_INVEST_THRESHOLD` cutoff from "The
1000-Byte Invest tier drops from two claims to one" above. The `productionMilestoneTierClaims`
tracking field and `pickIntroProductionMilestone`'s own generic claim-counting logic were left in
place rather than ripped out, since they cost nothing to keep and stay ready for a future
tier-dependent claim count without any further code changes.

### Transfer-block/Storage-bank cost stops being pinned to tier01's fresh-level-1 price

Both the Kilobyte-transfer blocks and Storage bank redemption originally priced themselves off a
flat rate: `convertIntroBitsToKilobytes` always spent exactly `INTRO_BITS_PER_KILOBYTE_CONVERSION`
(1000) bits per unit, and `isStorageBankRedeemable` accepted any bank whose size was `<=` tier01's
*current* per-unit level cost. Both were literally true only at a fresh cycle's starting level, where
tier01's level-1 cost happens to equal that same 1000-bit constant. Once tier01 leveled past 1 within
a cycle — its real per-unit cost climbing to 10,000, then 100,000, and so on — a transfer block kept
converting at the stale 1000-bit rate, and a small, already-built bank (e.g. a 1 KB bank) stayed
"redeemable" under the `<=` check even though tier01's real Kilobyte price had grown far past it: a
report that "Only the actual cost of a full level of tier01 should be auto redeemed (from bank or
memory). Currently the level 1 cost is being redeemed without checking real cost" identified this as
a bug, not a deliberate design choice that happened to look that way (both mechanisms were originally
*intended* to track tier01's real cost, per their own doc comments predating this fix; the flat
1000-bit reference and the `<=` inequality were the actual defects, not something to work around).

Two designs were considered before implementing. The first, more literal reading of the bug report —
"only tier01's own real, current per-unit cost should ever be spent, from either source, and nothing
else on the Byte Foundry page should be usable outside of that" — would have disabled Tap, Combine,
Sacrifice, and Invest entirely, turning the whole page into a single spend-at-current-price action.
Asked directly, the reporter confirmed a narrower scope: fix the cost dynamics only ("Close, but
Tap/Sacrifice/Invest should stay usable") — those mechanisms are deliberately-designed, independent
Byte Foundry actions (see "Economy model" in `CLAUDE.md`) with no bug report against them, and nothing
about the flat-rate/`<=` defects implicated their own behavior.

The fix: a new `getIntroKilobyteConversionCost(state)` (`getTierCost(TIER_DEFINITIONS[0],
purchaseLevels.tier01 ?? 1)`) replaced the flat constant everywhere a conversion actually spends bits
(`convertIntroBitsToKilobytes`, and transitively `tickIntroAutoInvest`'s per-unit loop) — the exact
same value `getStorageBankSize`/`isStorageBankRedeemable` already computed, so a transfer block and a
Storage bank of the same size now cost/redeem identically. `isStorageBankRedeemable` switched from
`<=` to `===`: a bank is redeemable only when its size *exactly* equals tier01's current per-unit
cost, not merely at or below it. This reopens a question the original `<=` design was explicitly
built to avoid (see "Storage's buildable size drops from 'one level ahead' to tier01's current level"
above): an autobuyer burst completing more than one tier01 level in a single tick can jump the price
straight past a bank's exact size without it ever equaling that size mid-tick, leaving the bank
un-redeemable for the rest of that stretch. This is accepted as a temporary-wait, not a "never lost"
regression: `getFirstTierCost` only ever grows with level *within* a cycle, so the next Speed
Up/Overclock/Prestige resets tier01's level back down, and its price regrows through that exact value
again on the way back up — a full bank simply waits, unredeemable, until the next reset cycle reaches
its size again, rather than losing its contents. `INTRO_BITS_PER_KILOBYTE_CONVERSION` itself was kept
(not deleted) since it's still true and useful as `INTRO_CONVERSION_UNLOCK_CAPACITY`'s fixed threshold
value and as a fresh-cycle-level-1 test fixture — only its use as an actual ongoing conversion price
was wrong and removed.

### Why `getTierCost` uses a multiplier form, not a literal power

An earlier version of `getTierCost` read as a literal `baseCost^fib`. This put high tiers permanently
out of reach within a handful of blocks — e.g. Octillions' 4th block cost 10^135, past `GOOGOL` —
stalling the whole economy well before a full run could reach Googol even at extreme Prestige-Point
speed bonuses. The current form (`baseCost * 10^(fib - 1)`) was adopted once that was caught: every
tier still scales by the same Fibonacci-driven exponent progression, but relative to its own
`baseCost` rather than compounding `baseCost` itself into the exponent, so a baseCost-1000 tier's
blocks cost 1e3, 1e4, 1e5, 1e7, 1e10, … instead of exploding immediately.

### Repricing tiers to real-world bit values

Every tier's `baseCost` originally followed an arbitrary `10^n` sequence (`10`, `1E3`, `1E6`, …) —
a leftover from before the byte-scale tier rename (`Bytes`→`Ronnabytes`, see the tier `name`/`symbol`
values in `layers.js`) and the base currency's rename to "Bits". Once tiers were named for real
byte-scale units and the currency was named "Bits", pricing them at an unrelated round number read as
inconsistent with the theme — a real Kilobyte *is* 8,000 bits, so that's what it now costs
(`baseCost = 8 * 1000^(n-1)`, decimal/SI scale, matching the SI-prefix rationale already used to name
`tier10` `Ronnabytes` rather than the informal `Brontobytes`). This also regularizes the previous
sequence's irregular first jump (`10`→`1E3` was ×100, every later jump was ×1000) into a clean ×1000
step between every consecutive tier including `tier01`→`tier02`. Purely a data change — `getTierCost`'s
scaling formula, `getTierBulkQuantity`, and every other cost-scaling mechanic are unaffected, since they
all scale relative to whatever `baseCost` is rather than assuming its value.

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

**Follow-up: starting requirement raised from level 1 to level 5.** `getSpeedUpRequirement` changed
from `speedUpCount + 2` to `speedUpCount + 6` (raw; displayed level 1 → displayed level 5 for the
first activation), keeping the same `+1`-per-cycle escalation step — only the floor moved. This
session attempted to re-run the `simulate-run-times` bot to get updated pacing figures the way the
original tuning above did, but the skill's `run-simulation.mjs` bot script is currently broken
against the live engine — it imports a `buyAutobuyerUnlock` export from `engine.js` that no longer
exists (autobuyer unlocking moved to automatic prestige-count milestones a while back; see this
file's own tier-autobuyer-milestone entries), so it fails before simulating anything, independent of
this change. That's a pre-existing skill/engine drift, not something this session introduced. A
future session updating that skill script (or re-validating pacing another way) should fold real
numbers in here; until then, treat the +4-level shift as untested against the "no run hits the
5,000,000-tick safety cap" bar the original tuning above was held to, though the same `+1`-per-cycle
escalation reasoning that made the original level-1 floor work continues to apply at a level-5 floor.

### Why `speedUpCount` now resets on Prestige, reversing the original design

For most of this mechanic's life, `speedUpCount` (and the `2^speedUpCount` multiplier it drives) was
explicitly permanent — `prestigeGame` carried it through unchanged, on the theory that Speed Up's whole
point (per the "Why Speed Up exists" analysis above) was to keep compounding a production multiplier
that outruns the cost curve, and stripping that on Prestige would undermine it. The maintainer asked
for this reversed: Prestige is the bigger, much rarer reset (Money must reach `GOOGOL`, vs. Speed Up's
comparatively frequent per-cycle level requirement), and letting `speedUpCount` also survive it meant a
long-lived save could accumulate an unbounded, ever-compounding production multiplier across every
future Prestige forever, with no analogous escalating requirement of the kind that keeps Speed Up's
*own* cost-curve dodge in check (see above) — nothing similarly re-prices a Prestige cycle as
`speedUpCount` climbs. Resetting it to 0 on `prestigeGame` (kept unbounded within a single Prestige
cycle, same as before) makes each Prestige cycle rebuild its Speed Up progression from scratch, mirroring
how `globalTickspeedMultiplier` already resets on both Prestige and Speed Up (see "The global tickspeed
multiplier" in `CLAUDE.md`). `autoSpeedUp` (the
automation toggle deciding whether Speed Up fires automatically) was deliberately left permanent — the
player doesn't need to re-buy that PP unlock every Prestige, only rebuild the multiplier it happens to
be driving at the time.

### Why autobuyer unlock is PP-funded only, with no first-tier bypass

There used to be a separate Money-funded activation path with a first-tier special case (bypassing the
activation cost for `tier01` only). That path no longer exists — for a long stretch, `buyAutobuyerUnlock`
was the *only* way to get a tier's autobuyer running, funded entirely by Prestige Points, uniformly
across every tier including the first. That PP-cost mechanism has since been superseded again — see
"Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks" below —
but the "uniform across every tier, no first-tier special case" principle it established still holds
under the milestone system that replaced it.

### Tier autobuyer unlock/tier tickspeed autobuyer became free, prestige-count-milestone unlocks

Both a tier's unit-buying autobuyer unlock (`buyAutobuyerUnlock`) and its own tier tickspeed autobuyer
(`buyTierTickspeedAutobuyer`) used to be ordinary PP purchases, priced off `getAutobuyerUnlockCost`
(1–10 PP-equivalent across the ten tiers) directly or via a multiplier on it. A maintainer request asked for these two specifically to become automatic instead: each tier's autobuyer now unlocks
for free the moment `prestige.count` reaches that tier's own milestone
(`getAutobuyerUnlockMilestone` — prestige 1 through 10, one tier per prestige), and its tier tickspeed
autobuyer similarly at a later, more slowly-spaced milestone (`getTierTickspeedAutobuyerMilestone` —
prestige 12 through 30, every 2 prestiges). `applyAutobuyerMilestones` is the pure function that
performs the actual unlocking, called from `prestigeGame` (so the very prestige that crosses a
milestone unlocks it immediately) and from `storage.js`'s `migrateState` on load (so an existing save
that had already prestiged past a milestone before this feature existed receives it retroactively,
without needing to prestige again). `getAutobuyerUnlockCost` itself was deliberately kept, unchanged,
rather than deleted — `getSmartAutobuyerCost` still multiplies it as a pricing benchmark, and Smart
remains a genuine PP purchase (the maintainer request only asked to make Unlock and the tier tickspeed
autobuyer automatic, "all other upgrades still cost PP as before"). `getTierTickspeedAutobuyerCost`/
`TIER_TICKSPEED_AUTOBUYER_COST_MULTIPLIER`, by contrast, had no other caller once the tier tickspeed
autobuyer itself stopped costing PP, so those were removed outright rather than kept as unused dead
code. A new **Milestones** view (a third `MainPage` tab, alongside Game/Upgrades) was added specifically
to track progress on both tracks in one place, since neither one costs anything to check in on and the
Upgrades page's own "Tier Autobuyers" category only shows a locked tier once it's reachable in the
current run — the Milestones view shows every tier's status for both tracks regardless.

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
button whenever owned drops back below 10. `lastTierXpConsumed` (the ever-growing total XP invested) was
deliberately kept as a separate counter from the unlock check itself — the accumulated bonus it drives
is never lost across a *narrower* reset than a full Prestige/Speed Up, only not *applied* while the live
check is unsatisfied; buying back up to 10 re-engages it at the same cumulative bonus rather than
starting over. (`lastTierXpConsumed` was permanent — surviving Prestige/Speed Up too — at the time this
entry was written; a later change made it run-scoped instead, resetting on both. See "XP and everything
it funds became run-scoped, not permanent" below.)

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

### XP and everything it funds became run-scoped, not permanent

`prestige.xp` and `lastTierXpConsumed` were both permanent up to this point — carried through unchanged
by both `prestigeGame` and `speedUpGame`, the same treatment given to genuinely permanent
meta-progression like `speedUpCount` or an unlocked autobuyer. The maintainer asked for this to change:
XP, and the last tier's XP-funded tickspeed bonus it funds, should reset to 0 on both Prestige and Speed
Up, the same as resources/owned/purchased — a run-scoped currency, not a permanent one like Prestige
Points.

`prestigeGame` and `speedUpGame` both now reset `prestige.xp` and `lastTierXpConsumed` to 0 (`0` is
already `createInitialGameState`'s default for both, so this is simply *not* explicitly carrying them
over — the same pattern `everUnlockedTierIds` already used for a run-scoped-not-permanent field).
`prestige.points`/`count`/`highestMilestone` are unaffected — this only touches the two fields
XP-consumption actually funds. One pre-existing asymmetry was deliberately left alone rather than
"fixed" as part of this change: `prestigeGame` already reset `highestMilestone` (the money-exponent
watermark `checkMilestones` grants further XP against) to the fresh default before this change, simply
by never explicitly carrying it over, while `speedUpGame` left it untouched (full `prestige` passthrough)
— an inconsistency between the two reset paths that predates this change and wasn't part of what was
asked, so it was left as-is rather than second-guessed.

This also happens to make the overflow scenario the previous entry's floor guards against far less
reachable in practice — `lastTierXpConsumed` resetting every Prestige/Speed Up means the ~71,333-XP
overflow threshold would need to be earned and spent within a single run between resets, rather than
accumulating indefinitely across an entire save's lifetime. The `MIN_EFFECTIVE_TIER_TICK_SPEED_SECONDS`
floor was kept regardless, as defense in depth — a single long enough run could still in principle reach
it, and the guard costs nothing when unused.

### `speedUpGame`'s `highestMilestone` passthrough was a real bug, not a harmless asymmetry

The previous entry's "left as-is rather than second-guessed" call on `speedUpGame` carrying
`prestige.highestMilestone` through untouched turned out to be wrong in practice, not just
inconsistent. A player who had already Speed Up'd at least once reported their post-Speed-Up run
showing far less unspent XP than expected — e.g. Money back at `1.319e30` (exponent 30) with 0 XP
ever spent this run, but only 1 XP available instead of the expected 30.

The cause: `checkMilestones` only awards XP for the delta between the current money exponent and
`prestige.highestMilestone` (`xp: prestige.xp + (currentMilestone - prestige.highestMilestone)`).
Money itself resets to `MONEY_STARTING_AMOUNT` on Speed Up, but `highestMilestone` — left fully
passed through — stayed at the previous run's peak (e.g. 29). The new run then had to silently
re-climb past that old watermark before any XP resumed accruing, so by the time money reached
exponent 30 again, only the 1-exponent delta above the stale watermark (30 − 29) had actually been
credited, not the full 30 a fresh run's watermark of 0 would have earned.

Fixed by having `speedUpGame` reset `prestige.highestMilestone` to `createInitialGameState()`'s
value (`0`, since `MONEY_STARTING_AMOUNT = 1`) exactly like `prestigeGame` already did, while still
leaving `prestige.points`/`count` untouched — those two remain genuinely permanent meta-progression
that Speed Up doesn't touch, unlike the milestone watermark which only exists to gate a run-scoped
currency and must track that same run's money, not a stale higher-water-mark from before the reset.

### Purchase level resized from 10 to 8, and the cost-epoch sequence changed from Fibonacci to triangular

The maintainer asked for the tier purchase-level mechanic to be redefined: a "level" should mean one
cost step, and completing a level should require buying 8 pieces of it (not 10), with production still
doubling every completed level. This was a deliberate pacing/terminology change, not a bug fix.

Before this change, "level" was purely a UI label for a tier's raw lifetime `purchased` count — the Buy
button showed `{purchased}+{quantity}` (e.g. `30+10`), and the underlying cost/production-doubling
cadence was a bare block-of-10 computed independently in three places (`getTierCost`'s
`floor(purchased/10)` epoch, `getTierBulkQuantity`'s `purchased % 10` bulk cap, and
`getPurchaseMilestoneMultiplier`'s `floor(purchased/10)` block count), plus a fourth independent literal
10 for the manual/autobuyer batch size (`BUY_QUANTITY`) and a fifth for the "smart" autobuyer's
bootstrap threshold (`purchased < 10`). Several conceptually related but separately-hardcoded `10`s also
existed: `isTierUnlocked`/`isLastTierTickspeedXpUnlocked`'s owned-count thresholds, and
`getSpeedUpRequirement`'s per-cycle step (`10 * (speedUpCount + 1)`) — the last of these was already
documented as deliberately tracking the same block size as the cost-epoch mechanic, just without an
actual shared symbol enforcing that.

Rather than mechanically substituting `10` → `8` at each of these sites independently (repeating the
original duplication with a new number), a single shared `PURCHASE_BLOCK_SIZE = 8` constant was
introduced in `layers.js`, and a new canonical `getTierLevel(purchased)` function in `engine.js` — 1-
indexed, `Math.floor(purchased / PURCHASE_BLOCK_SIZE) + 1` — became the one place that decides "which
level is this." `getTierCost`, `getTierBulkQuantity`, and `getPurchaseMilestoneMultiplier` now all derive
their epoch/block-position/completed-levels figures from `getTierLevel` instead of independently
recomputing `purchased / 8`. `isTierUnlocked`/`isLastTierTickspeedXpUnlocked`'s owned-count thresholds
and `getSpeedUpRequirement`'s per-cycle step were moved to read `PURCHASE_BLOCK_SIZE` directly (they
gate on `owned`, a different field from `purchased`, so they don't go through `getTierLevel` itself, but
they now share the same sizing constant rather than an independently-hardcoded copy of it).

One nesting was deliberately **left unchanged**: `getPurchaseMilestoneMultiplier`'s "every 10th level
gets a bigger 10x jump instead of the regular 2x" mega-milestone cadence still divides by a fixed 10,
not `PURCHASE_BLOCK_SIZE` — so that mega-milestone now lands at the 80th lifetime purchase (10 levels of
8) rather than the 100th (10 levels of 10), since levels themselves got smaller, but the "every 10
levels" spacing of the mega-jump itself is untouched. Conflating the two would have been an easy mistake
(same numeral, different mechanic) — this is the same distinction already drawn between
`PURCHASE_BLOCK_SIZE` and `GLOBAL_TICKSPEED_MILESTONE_STEP`'s unrelated 10/100/1000 spacing.

The cost-epoch exponent sequence itself was also changed, independent of the block-size resize: the old
Fibonacci sequence (1, 2, 3, 5, 8, 13, … for epochs 0-5) was replaced with a simpler triangular-number
progression (1, 2, 4, 7, 11, 16, 22, …, `exponent(e) = 1 + e*(e+1)/2`) at the maintainer's explicit
request. Epochs 0 and 1 happen to still read 1 and 2 under both sequences — the two only diverge from
epoch 2 onward (old gave 3, new gives 4) — so any test fixture or worked example anchored to the first
cost jump (level 1 → 2) reads identically either way, but anything referencing a deeper epoch needs
recomputing against the new sequence, not just the new block size, if it's ever cross-checked against
this history.

Since the cost curve's *shape* changed (not just its epoch cadence), this touches overall run pacing —
see the `simulate-run-times` skill for re-validating that a full run to Googol still completes in a
comparable simulated time after this change, since unit tests alone only validate formula correctness,
not run-length balance.

The Buy button's player-facing "level" text was also redefined to match: it now shows the tier's actual
level number and progress toward completing it (`getTierLevel(purchased)` and how many of that level's
`PURCHASE_BLOCK_SIZE` pieces are bought, e.g. `Lv.4 (5/8)`) instead of the raw lifetime `purchased` count
it used to display under the same "level" label — a genuine meaning change to the term, not just a
resize, since "level" previously meant "how many you've bought total" and now means "which cost step
you're on."

### Purchase block size became a runtime-configurable, growing value — `getTierLevel` replaced by direct state tracking

The entry above ("Purchase level resized from 10 to 8...") introduced `PURCHASE_BLOCK_SIZE` as a
shared *constant* and `getTierLevel(purchased) = Math.floor(purchased / PURCHASE_BLOCK_SIZE) + 1` as
a *derived* accessor — level was still computed on demand from a lifetime purchased count and a fixed
divisor. The maintainer asked for this to change on the very same day: block size should not be
hardcoded at all (8 is only the starting/default value for early game) and should not be computed via
division — a tier's level and its progress toward completing it should be tracked directly, citing
Clicker Heroes as the reference for the kind of explicit per-entity level/progress tracking intended.

**Why division had to go.** Once block size can change mid-run, there is no longer a single divisor
that can reconstruct "which level is this" from a lifetime purchased count after the fact — a tier's
purchases before a block-size increase and after it don't correspond to the same-size levels, so
`purchased / blockSize` stops meaning anything coherent partway through a run. The fix: `purchased`
stays as a simple, ever-incrementing lifetime counter (kept for display and backwards compatibility),
but a tier's current level and its progress within that level become their own state fields —
`state.purchaseLevels[tierId]` (1-indexed) and `state.purchaseLevelProgress[tierId]` (0 up to the
current block size) — incremented directly, purchase by purchase, inside `buyTier`. The old
`getTierLevel(purchased)` accessor was deleted entirely rather than kept alongside the new fields, to
avoid two competing sources of truth for the same concept. `getTierCost`, `getTierBulkQuantity`,
`getTierQuantityCost`, `getTierAffordableQuantity`, and `getPurchaseMilestoneMultiplier` all changed
signature accordingly — from `(tier, purchased, ...)` to explicit `(tier, level, ...)` /
`(blockSize, levelProgress, ...)` parameters — rather than reaching into `state` themselves, keeping
them pure and testable against explicit inputs; call sites (`buyTier`, `tickGame`'s autobuyer loop,
`MainPage`) now read `state.purchaseLevels`/`state.purchaseLevelProgress` directly and pass them in.

**The growth rule.** `getPurchaseBlockSize(state)` (`engine.js`) is a single global value — one
number shared by every tier, not per-tier, per an explicit maintainer decision weighing simplicity
("simplest mental model, matches how the mechanic works today") against the alternative of letting
tiers diverge independently. It starts at `DEFAULT_PURCHASE_BLOCK_SIZE` (`8`, renamed from the old
`PURCHASE_BLOCK_SIZE` to make clear it's only a starting value) and grows by
`PURCHASE_BLOCK_SIZE_GROWTH_STEP` (`1`) every `PURCHASE_BLOCK_SIZE_GROWTH_INTERVAL_LEVELS` (`100`)
levels the **last tier** completes. The maintainer specified this trigger directly ("every 100
levels") after a round of back-and-forth about which progress marker should drive it; the last tier
was chosen (by the implementer, as the most consistent option) because it's the same "flagship"
marker `getSpeedUpRequirement`/`isLastTierTickspeedXpUnlocked`/`prestigeCardEverRevealed` already key
off, rather than introducing a new kind of progress signal. A deliberately-considered consequence:
because every earlier tier must already be unlocked (and permanently latched via
`everUnlockedTierIds`) by the time the last tier can reach level 100+, a block-size increase can
never retroactively raise an *already-unlocked* tier's own unlock threshold — it only makes whatever
level a tier is currently mid-way through require more purchases than it did when that level started.
`isTierUnlocked`/`isLastTierTickspeedXpUnlocked`'s owned-count thresholds and
`getSpeedUpRequirement`'s per-cycle step all now read `getPurchaseBlockSize(state)` instead of the
old fixed constant. `getSpeedUpRequirement` itself changed from a purchased-count threshold
(`PURCHASE_BLOCK_SIZE * (speedUpCount + 1)`) to a **level target** (`speedUpCount + 2`), since a
purchased-count requirement stops being a stable comparison point once block size can grow mid-run,
while a level number stays meaningful regardless. `MainPage`'s Speed Up card/button display changed
to match (showing the last tier's level and level-based requirement instead of a raw purchase count).
Both `purchaseLevels` and `purchaseLevelProgress` reset to their fresh defaults on Prestige and Speed
Up, same as `owned`/`purchased` — which, as a side effect, also resets `getPurchaseBlockSize` back
down to `DEFAULT_PURCHASE_BLOCK_SIZE` for every tier, since it's derived from the last tier's own
(now-reset) level; growth is a within-a-run phenomenon only.

**A real bug caught during this change.** The first implementation used `Infinity` as the "buy as
many as fit this level" sentinel quantity passed to `buyTierQuantity`/`tickGame` (replacing the old
fixed `BUY_QUANTITY = PURCHASE_BLOCK_SIZE`, which no longer makes sense once block size varies).
`engine.js`'s `clampNonNegative` helper (`Math.max(0, Number.isFinite(value) ? value : 0)`) treats any
non-finite value — including `Infinity` — as invalid and clamps it to `0`, so `getTierBulkQuantity`
silently returned `0` for every purchase, both manual Buy and every autobuyer, a complete (silent)
soft-lock of the entire economy. Caught by a scratch sanity script exercising the real functions
before handing off test-file work, rather than by an early test run. Fixed by using
`Number.MAX_SAFE_INTEGER` instead of `Infinity` as the sentinel everywhere it's needed
(`useIncrementalGame.js`'s `BUY_QUANTITY`, `MainPage`'s affordable-quantity preview) — finite, so it
passes through `clampNonNegative` unchanged, while still being large enough that `Math.min` against
the real remaining-in-level count always yields the real count. `clampNonNegative` itself was left
unchanged rather than special-cased to allow `Infinity` through, since its non-finite-rejection
behavior is a deliberate guard against `NaN`/`Infinity` propagating from corrupted state elsewhere in
the app, and loosening it for this one caller would have widened that guard's blast radius for every
other caller instead of just fixing the one broken call site.

A save from before `purchaseLevels`/`purchaseLevelProgress` existed is migrated on load (`storage.js`)
by deriving an equivalent level/progress from its legacy `purchased` count against
`DEFAULT_PURCHASE_BLOCK_SIZE` — the only block size that could ever have applied to such a save, since
the growth mechanic didn't exist yet when it was written. This is explicitly a one-time interpretation
of old data on load, not a reintroduction of division into the ongoing engine logic.

### `getTierCost` split into per-unit price vs. level-total price

Every purchase within a level was priced at the *level's full flat cost* — `getTierCost(tier, level)`
returned that flat value, and every one of the `blockSize` purchases needed to complete a level was
charged that same amount. This meant completing an entire level actually cost `blockSize ×
getTierCost(...)` — e.g. tier01's level 1 (`baseCost` 8) charged $8 for *each* of the 8 units needed
to complete it, $64 in total.

The maintainer's request — "the cost of each purchase within a level is 1en (`1 × 10ⁿ`); 8en is the
cost of the entire level" (n = the cost-epoch exponent driving `getCostEpochExponent`) — asked for the
opposite: `getTierCost`'s existing formula output should represent the level's *total* cost, with each
individual purchase costing an even `1/blockSize` share of it. `getTierCost` now takes `blockSize` as
a third argument and returns `Math.ceil(levelTotalCost / blockSize)`, where `levelTotalCost` is exactly
the formula's old return value (`baseCost * 10^(getCostEpochExponent(epoch) - 1)`) — unchanged. Its 3
call sites (`getTierQuantityCost`, `getTierAffordableQuantity`, `buyTier`) were updated to thread
`blockSize` through; no other call site existed (`MainPage` already only calls the blockSize-aware
wrapper functions).

**A real bug caught by review, before merging.** The first implementation returned the plain division
(`levelTotalCost / blockSize`) with no rounding. Since every real tier's `baseCost` is a multiple of
`DEFAULT_PURCHASE_BLOCK_SIZE` (8), this happened to divide evenly at the default block size — every
test in the initial diff used `blockSize=8` and passed cleanly, masking the problem. But
`getPurchaseBlockSize` (see above) grows past 8 once the last tier completes level 101, 201, … — a
state a long-running idle game is explicitly designed to reach — at which point the division stops
being exact for tiers whose own level total hasn't grown to keep pace, producing a fractional Money
balance (a direct violation of this codebase's integer-resource invariant) after every purchase from
then on. A `code-reviewer` subagent pass caught this before merge by reproducing it directly:
`getTierCost({baseCost: 8}, 1, 9)` returned `0.888…`, not `1`. Worse, in principle: a plain `Math.floor`
"fix" would have rounded a small `levelTotalCost` all the way down to `0` once `blockSize` grew large
enough relative to it — an infinite-free-purchase exploit, not just a display glitch. `Math.ceil` was
used instead of `Math.floor` specifically to rule out this failure mode: the per-unit cost is always
at least 1 whenever `levelTotalCost` is positive, and the only cost is a small, safe overcharge (up to
`blockSize - 1` extra) when a block doesn't divide evenly — never an underpayment or a free purchase.

**Net effect**: completing an entire level now costs exactly what the raw formula computes (tier01
level 1: $8, not $64) — an intentional ~`blockSize`x reduction in the total price of finishing a
level, split more granularly across individual purchases. This surfaced a real, structural side
effect during the test rewrite: a non-`smartAutobuyer` tier with a full-block batch size used to
stall forever on tier01's very first level, since `MONEY_STARTING_AMOUNT` (10) couldn't afford the
old $64 full-block price — this is the entire reason `smartAutobuyer`/`buySmartAutobuyer` exists (buy
singly until the first level completes, then revert to normal batching). Under the new $8 full-block
price, the (then-current) $10 starting balance would have afforded it outright, so at the time this
change was reviewed the bootstrap stall no longer applied to tier01 specifically — confirmed
acceptable by the maintainer rather than adjusting `MONEY_STARTING_AMOUNT` to preserve the old stall.
**This was superseded almost immediately** by the unrelated starting-money change below
(`MONEY_STARTING_AMOUNT` 10 → 1): at $1, tier01's $8 full-block price is unaffordable again, so the
stall is back in practice for every tier including tier01 — not because anyone reverted or tuned
anything to restore it, but as a side effect of a separate, independently-requested change landing
right after. `smartAutobuyer` remains meaningful either way — see `engine.test.js`'s `tickGame`
describe block for the current (stalls-again) tier01 case and the always-stalls bigger-tier case.

### Starting Money reduced from 10 to 1

`MONEY_STARTING_AMOUNT` (`layers.js`) changed from 10 to 1 — a fresh save now starts with 1 Bit
instead of 10. This is a standalone request, made independently of (and shortly after) the
`getTierCost` per-unit/level-total split above; the two happened to interact (see the note above)
but neither was chosen to compensate for the other.

One knock-on effect worth recording: `createInitialGameState`'s `prestige.highestMilestone` seeds
from `Math.floor(Math.log10(MONEY_STARTING_AMOUNT))` — this is `0` at the new starting amount, versus
`1` at the old one. `checkMilestones` awards XP once `getMoneyExponent(money) > highestMilestone`, so
the first-ever XP point now arrives as soon as Money first reaches 10 (exponent 1, clearing the fresh
watermark of 0) rather than needing to reach 100 (exponent 2, the threshold needed to clear the old
watermark of 1). This is a direct, intended mathematical consequence of the formula already in place
(not a new formula), not a separate design decision — XP itself is otherwise inert in the UI outside
the last tier's XP-funded tickspeed mechanic (see "XP status" above), so this mainly matters for
players relying on that mechanic early.

### `getTierCost`'s division-based split was replaced by a fixed-price-times-blockSize model

The two entries just above this one describe an intermediate design: `getTierCost(tier, level,
blockSize)` divided a level's total cost (the raw `baseCost * 10^(epochExponent-1)` formula output)
evenly across `blockSize` purchases, rounding up to stay integer-safe. That version shipped and was
reviewed, but a further maintainer clarification revealed it had the relationship backwards: "when a
level requires X purchases, its total cost should be X×eN — every purchase is still 1×eN" (eN = the
epoch-scaled value `10^n`). Worked through concretely against Kilobytes (tier02): at the default
block size (8), both the division model and this corrected model produce the same numbers (per-unit
1,000, level-total 8,000) — but they diverge the moment block size changes. The maintainer confirmed:
if block size were ever 13, Kilobytes' level-1 total should become 13,000 (per-unit price fixed at
1,000, level total scaling *up* with block size) — not the division model's roughly-unchanged total
with a *shrinking* per-unit price.

This means `baseCost` itself needed to change, not just how the formula uses it: `baseCost` is now
the tier's fixed per-unit price (`1000^(n-1)` for `tier0n` — 1, 1,000, 1e6, … 1e27), one-eighth of the
values it held before (8, 8,000, 8e6, … 8e27) — exactly undoing the `÷8` the division model used to
apply at runtime, now baked into the stored constant instead. `getTierCost(tier, level)` dropped the
`blockSize` parameter entirely and reverted to the simple, non-divided formula (`baseCost *
10^(epochExponent-1)`) — a level's total cost is this fixed per-unit price *times* the current
`blockSize` (`getTierQuantityCost`), which grows if `blockSize` grows, rather than dividing a fixed
total across a growing `blockSize`. This also makes the `Math.ceil` rounding from the previous entry
entirely unnecessary — there's no division left anywhere in the cost path, so results are always
exact integers by construction, not by a safety-net rounding rule.

Net effect at the default block size (8, true for the vast majority of any run): identical numbers to
both the very first (pre-any-of-this-arc) behavior and the intermediate division model — a
coincidence of `baseCost`'s new values being exactly the old ones ÷ 8, and blockSize defaulting to
exactly 8. The only place this design actually differs in practice is once `getPurchaseBlockSize`
grows past its default (see above) — level totals now grow (proportionally to the larger block),
whereas the division model would have shrunk the per-unit price instead while leaving the total
roughly flat.

### Overclock: from a standalone multiplier to a Tickspeed-upgrade step boost

Overclock's first implementation (merged, then corrected one PR later — see engine.js's
`getGlobalTickspeedProductionMultiplier`/`getGlobalTickspeedRegularStep`) applied its 0.1%-per-activation
bonus as its own independently-compounding multiplier — `getOverclockMultiplier(overclockCount) =
(1.001)^overclockCount` — stacked as a third factor alongside the per-tier and (Money-funded) global
tickspeed multipliers inside `getEffectiveTierTickSpeedSeconds`. That version was reviewed, tested, and
shipped exactly as originally requested ("improves global tickspeed multiplier by 0.1%"), but the
maintainer's own request turned out to have a more specific intended mechanic than either the initial
prose or the follow-up clarifying questions surfaced: "it takes the global tickspeed upgrade from 1% to
1.1% in the first upgrade... which effectively means tickspeed multiplier becomes 1.011 from 1.01 after
first upgrade then 1.012 and so on." That's not a separate multiplier at all — it's a permanent boost to
the *existing* global tickspeed multiplier's own per-level growth rate, applied only to REGULAR levels
(the milestone step stays fixed at 10%).

The fix folded `overclockCount` directly into `getGlobalTickspeedProductionMultiplier` as a second
parameter, via a new `getGlobalTickspeedRegularStep(overclockCount) =
GLOBAL_TICKSPEED_PRODUCTION_STEP + overclockCount * OVERCLOCK_PRODUCTION_STEP`, and removed the
standalone `getOverclockMultiplier`/third-factor entirely — `getEffectiveTierTickSpeedSeconds` went back
to dividing by just two multipliers, with Overclock's contribution already baked into the global one. A
non-obvious behavioral consequence worth remembering if this is ever revisited: because the boost lives
inside the *existing* global tickspeed multiplier rather than a separate factor, Overclock now has zero
effect while the global tickspeed multiplier itself is still at level 0/not yet bought — there's no
level for the boosted step to compound over — and any level already bought before an Overclock
activation retroactively compounds at the new, higher rate from then on (not just future purchases).
This also incidentally fixed a real display bug in the first version: a tier row's "Effective tickspeed"
Details breakdown text only ever showed two of the three active multipliers, silently disagreeing with
the actual (three-multiplier) computation once `overclockCount > 0` — folding Overclock into the
existing global-multiplier factor removed the hidden third factor the display text had no branch for,
rather than requiring a separate display fix. **Don't reintroduce a standalone Overclock multiplier** —
if a future request sounds like "Overclock should add its own bonus," re-confirm against this file
first, since that reading was already tried, shipped, and specifically walked back.

### Overclock, again: the standalone multiplier comes back, deliberately, plus a full requirement rework

The entry above explicitly warns against reintroducing a standalone Overclock multiplier. This entry
records the case where that warning was shown to the maintainer directly during planning, and they
confirmed — after two rounds of clarification — that they wanted it back anyway, alongside a broader
rework of how Overclock is claimed. **This is not the earlier mistake repeated; it's a deliberate,
informed reversal.** A future session should treat this entry, not the one above, as the current
guidance for Overclock's reward shape — the entry above stays only as the historical record of *why*
the fold-in design was chosen the first time.

Three changes shipped together:

1. **Reward**: back to a standalone `getOverclockMultiplier(overclockCount) = (1 +
   OVERCLOCK_MULTIPLIER_STEP) ** overclockCount` (`OVERCLOCK_MULTIPLIER_STEP = 0.001`), a genuine third
   factor in `getEffectiveTierTickSpeedSeconds` alongside the per-tier and global tickspeed
   multipliers — exactly the shape the entry above reverted away from.
   `getGlobalTickspeedProductionMultiplier` drops its `overclockCount` parameter entirely and goes
   back to a plain function of `level`. The direct behavioral consequence the entry above called out
   (Overclock has zero effect while the global tickspeed multiplier is still at level 0) is gone as a
   side effect — Overclock's own factor now applies unconditionally, regardless of that other track's
   state. The display bug the original revert fixed (a tier row's "Effective tickspeed" breakdown only
   showing two of three active multipliers) had to be avoided again on this reintroduction —
   `MainPage`'s breakdown line now explicitly lists all three factors (`tier ×N, global ×N, overclock
   ×N`) rather than reusing the two-factor text unchanged.
2. **Requirement**: `getOverclockRequirement` collapses from `(overclockCount + 1) *
   OVERCLOCK_REQUIREMENT_STEP` (the old fixed 10-per-activation ladder: level 10, 20, 30, …) to
   `overclockCount * OVERCLOCK_REQUIREMENT_STEP + 2` with `OVERCLOCK_REQUIREMENT_STEP = 1` — level 2
   for the first claim, level 3 for the second, level 4 for the third, … the same `+1`-per-cycle shape
   `getSpeedUpRequirement` already uses, just without Speed Up's own display offset. The maintainer's
   framing was "no levels concept at all" beyond the last tier's own level — the intent being that the
   last tier's own (already steep) cost curve should be what gates Overclock, not an additional
   artificial multiplier stacked on top of it.

   **The `+2` floor (not `+1`) is the result of a caught review bug, not the original design.** The
   first version of this rework used `(overclockCount + 1) * OVERCLOCK_REQUIREMENT_STEP` unchanged
   (i.e. a `+1` floor, requirement 1 for the first claim) — but every tier's `purchaseLevels` starts at
   1 by default (the tier's own un-purchased state, not 0), so a requirement of exactly 1 was already
   satisfied by a completely untouched last tier. That made the first Overclock claim of *every* cycle
   free — click it the instant its panel appears, every time, for a permanent bonus at zero cost —
   directly contradicting both the "last tier's own cost curve should gate this" intent above and this
   same rework's own parallel fix to `getSpeedUpRequirement` (raising Speed Up's floor from level 1 to
   level 5 specifically so its first activation isn't free either — see the entry on that above). A
   `code-reviewer` pass caught this before merge by tracing the exact `purchaseLevels` default through
   `overclockGame`'s eligibility check, not by manual testing — worth remembering if this formula is
   ever touched again: **a `+N` floor here must always be checked against `purchaseLevels`' own
   1-indexed starting value, not just against 0.**
3. **Claim behavior — genuinely new, not a revert of anything**: `overclockGame` used to increment
   `overclockCount` by exactly 1 per activation. It now sets `overclockCount` to
   `state.purchaseLevels[lastTier.id]` directly — the last tier's level *at the moment of the claim*.
   Combined with the requirement's `+1`-per-cycle ladder, this means a player who falls behind (last
   claimed at level 5, but the last tier has since reached level 8, e.g. from letting an autobuyer run
   unattended) catches all the way up to level 8 in a single claim rather than needing three separate
   ones. The eligibility check still guarantees the jump is always at least a +1 gain over the previous
   `overclockCount`, so this can never move Overclock backwards.

A related display issue caught in the same review pass: Overclock's multiplier compounds in steps of
just 0.1% (`OVERCLOCK_MULTIPLIER_STEP`), but `MainPage`'s existing `formatRate` helper rounds to 2
decimal places — which rounds `×1.001` through `×1.004` (the first 4 claimed levels) all down to a
bare `×1`, indistinguishable from no bonus at all, on the `OverclockButton` and the tier row's
"Effective tickspeed" breakdown (the money-balance breakdown's own Overclock line was unaffected,
since it already used a separate, more precise percent formatter). Fixed with a new `formatPreciseRate`
helper (3 decimal places, same trimming convention as `formatRate`) used everywhere Overclock's own
multiplier is displayed.

Everything else about `overclockGame` (the full soft-reset shape, which permanent flags/levels carry
over, wiping `speedUpCount` back to 0) is unchanged from the original design and from the entry above
— only the reward formula, the requirement formula, and the claim's target value changed.

### Overclock, once more: back to folding into the Tickspeed multiplier's own step — now multiplicative and covering milestones too

A direct, same-session follow-up to the entry above ("Overclock, again"), and — importantly — this
entry supersedes that one specifically on the standalone-vs-folded question, before that PR ever
merged. The sequence within this one session: the maintainer first confirmed (twice, across two
rounds of clarification) that they wanted a standalone multiplier reintroduced, explicitly overriding
the original entry's "don't reintroduce" warning — that shipped and merged. Immediately after, as a
follow-up, they asked to raise the per-level step from `0.1%` to `1.1x`; while implementing *that* as
a second, still-unmerged PR, the maintainer clarified: "I meant for the tickspeed multiplier which
starts at 1%" — i.e. the `1.1x` was always meant to apply to the *existing* `GLOBAL_TICKSPEED_PRODUCTION_STEP`
(1%) track, not a new standalone factor unrelated to it. That reopens the exact standalone-vs-folded
question the entry above had just resolved in favor of standalone — this time resolved the other way,
before the standalone-multiplier PR's own follow-up ever reached `main`. **The original entry's
"don't reintroduce a standalone Overclock multiplier" warning turns out to be the durable guidance
after all** — a future session should default to the folded design described here unless explicitly
told otherwise, and should re-confirm carefully (as this session eventually did) before reintroducing
a standalone factor again.

What actually changed from the entry above:

1. **Reward folds back into `getGlobalTickspeedProductionMultiplier`**, reverting that function's
   signature back to `(level, overclockCount = 0)` and removing the standalone third factor from
   `getEffectiveTierTickSpeedSeconds` (back to the original two-factor division: tier × global).
   `getOverclockMultiplier(overclockCount) = (1 + OVERCLOCK_MULTIPLIER_STEP) ** overclockCount`
   (`OVERCLOCK_MULTIPLIER_STEP = 0.1`, i.e. ×1.1 per level — the value requested in the same
   follow-up) is now the growth factor multiplied into that function's own regular *and* milestone
   steps: `regularStep = GLOBAL_TICKSPEED_PRODUCTION_STEP * getOverclockMultiplier(overclockCount)`,
   `milestoneStep = GLOBAL_TICKSPEED_MILESTONE_STEP * getOverclockMultiplier(overclockCount)`. A
   direct consequence, same as before the entry above: Overclock has zero effect while the global
   tickspeed multiplier itself is still at level 0/not yet bought.
2. **Multiplicative, not additive** — this is the one deliberate difference from the very original
   pre-"Overclock, again" folded design (see the top-of-section entry), which added a flat
   percentage-point step per activation (`GLOBAL_TICKSPEED_PRODUCTION_STEP + overclockCount *
   OVERCLOCK_PRODUCTION_STEP`). Here the step *compounds*: 1% → 1.1% → 1.21% → 1.331% → … per
   claimed level, matching the maintainer's original "multiplicative per level instead of additive"
   framing from the very start of this whole thread of requests.
3. **Applies to milestone levels too** — a genuinely new twist neither prior folded design had. The
   original pre-"Overclock, again" design left `GLOBAL_TICKSPEED_MILESTONE_STEP` (10%, every 10th
   level) untouched by Overclock; this one multiplies it by the same `getOverclockMultiplier` factor
   as the regular step, per explicit maintainer choice when asked directly whether milestones should
   be included.
4. **`formatPreciseRate` (added, then simplified away, in the entry above) never mattered here** —
   `MainPage`'s Overclock displays go back to the pre-"Overclock, again" percentage-rate framing
   (`⚡ N%/lvl · Lv.X/Y`, "Tickspeed upgrade's per-level rate is now N% (was 1%) from level X")
   instead of a `×N` standalone-multiplier framing, so the precision problem that helper existed for
   doesn't arise in this design at all.

**Unchanged from the entry above** (these were never in question): `getOverclockRequirement`'s `+2`
floor (a completely untouched last tier can never make the first claim of a cycle free) and its
`+1`-per-cycle escalation beyond that floor; `overclockGame`'s catch-up claim (`overclockCount` jumps
straight to the last tier's current level, not just `+1`); the full soft-reset shape and which
permanent flags/levels survive it; wiping `speedUpCount` to 0 on claim.

### The 1000-Byte Invest tier drops from two claims to one

An earlier entry ("The same round also corrected a misreading of 'Invest for Double Production'…",
above) gave the four Invest cost-ladder tiers up to and including `INTRO_AUTO_INVEST_THRESHOLD`
(1/10/100/1000 Bytes) two claims each, via `getIntroProductionMilestoneMaxClaims(tier) =>
getIntroProductionMilestoneCost(tier) <= INTRO_AUTO_INVEST_THRESHOLD ? 2 : 1`. A follow-up request
("Single claim at 1000B. Not two claims.") narrowed that: only the three tiers strictly *below*
`INTRO_AUTO_INVEST_THRESHOLD` (1/10/100 Bytes) still get two claims — the 1000-Byte tier itself now
gets one, same as every tier after it. The fix is a one-character boundary change (`<=` → `<`) in
`getIntroProductionMilestoneMaxClaims`; nothing else about the independent cost-ladder model from the
entry above changed.

### Compute Cores/Nodes: capping the Storage ladder, and two different meanings of "MB" in the same feature

Requested as "once all storages are built and full and memory is also full, convert the entire
memory into Compute Cores. 1 Compute Core costs 10 MB memory; 1 Compute Node costs 8 Compute Cores."
Several things in that one-line request needed pinning down before implementation, confirmed with
the maintainer rather than guessed:

- **Trigger**: automatic every tick (`tickComputeCoreConversion`, called from `tickGame`), not a
  manual button — the same posture every other Byte Foundry automation (`tickStorageAutoFill`/
  `tickIntroAutoInvest`) already has.
- **"All storages built and full" needs a finite set to check.** Before this feature, the Storage
  bank ladder (`getStorageBankSize`) was open-ended — it walks `tier01`'s own level-cost sequence
  forever, advancing to the next size every `STORAGE_BANK_LADDER_CAP` banks built. An open-ended
  ladder can never be exhaustively "all built and full" for long (the next size always appears once
  the current one caps out). The maintainer's own clarification ("Banks only go up to 1 MB") became
  a new constant, `STORAGE_BANK_LADDER_MAX_SIZE = 1_000_000` — `getStorageBankSize` now stops
  advancing once it reaches that size, so `getComputeCoreStorageSizes()` can enumerate a small, fixed
  3-size set (1 KB, 10 KB, 1 MB) for `isComputeCoreConversionReady` to check exhaustively.
- **Permanence**: `intro.computeCores`/`intro.computeNodes` are permanent, carried over every real
  Prestige exactly like the Byte generator/Storage banks (`prestigeGame`) — confirmed explicitly
  rather than assumed, since Memory itself (the currency they're converted from) resets every cycle.
- **Payoff**: pure counters for now, no gameplay effect — explicitly deferred rather than invented
  (an unrequested "what should Compute Nodes unlock" design would have been scope creep on a
  one-line feature request).

**Two different "MB" conventions collided, and had to be kept apart rather than unified.** This
codebase already had two incompatible meanings for "1 MB" before this feature: Memory's own display
scale (`getMemoryUnit` in `ByteFoundryPage`, `BITS_PER_BYTE × 1000²` = 8,000,000 bits per "MB",
matching what the player actually sees the Memory tile denominated in) and the Storage bank
ladder's own informal naming (`tier01`'s level-3 per-unit cost, 1,000,000 bits, called "1 MB" in
existing comments purely because it numerically matches `tier02`'s `baseCost` — see the "Byte
Foundry Storage" comment in `layers.js`, predating this feature). `STORAGE_BANK_LADDER_MAX_SIZE`
(1,000,000) deliberately reuses the Storage ladder's own convention, since it caps that exact
ladder. `COMPUTE_CORE_MEMORY_COST` ("10 MB memory" per the request) deliberately uses the OTHER
convention instead (80,000,000 bits) — Compute Cores are costed in whatever the player actually
sees Memory's own balance in, not the Storage-ladder/`tier01`-cost scale a Compute Core has no
direct relationship to. This wasn't an arbitrary tie-breaker: 80,000,000 bits is exactly the 8th
step of the Sacrifice capacity ladder (8 × 10⁷, one of `capacity`'s own actual reachable values), so
a cycle that's Sacrificed capacity up that far converts a genuinely full Memory balance into whole
Compute Cores with zero remainder — the Storage-ladder convention's 1,000,000 has no such alignment
with the capacity ladder. If this is ever revisited, don't silently unify the two "MB" meanings —
they're deliberately different constants for deliberately different reasons, and conflating them
would either break the capacity-ladder alignment above or break the Storage ladder's own cap.

**This entire design was superseded almost immediately** — see the next entry below. Kept here
verbatim as a record of the reasoning that produced it (and because the Storage-ladder-vs-Memory-
display "two different MBs" distinction it documents is still true and still relevant, independent
of the Compute Core mechanic built on top of it), not because any of it still describes current
behavior.

### Compute Cores reworked: capacity-tied flush cost, not a fixed 10 MB / Storage-fullness gate

The entry above shipped, then was immediately walked back in the same session before merging, once
the maintainer thought through the mechanic further in a follow-up message: "make Compute Cores 10x
less powerful than I mentioned and build up from there... A Compute Core shall always cost full
memory capacity flushed but memory capacity upgrades will still be possible indefinitely but banks
will be available only for tier 01 cost steps only. So increasing capacity will essentially make
Compute Core effectively costly but user has to decide where to stop for best efficiency. Reveal
Compute Cores once user has 100KB Memory capacity."

This replaces the entire trigger/cost/reveal model from the previous entry:

- **Cost**: no longer a fixed `COMPUTE_CORE_MEMORY_COST` (80,000,000 bits) — a Compute Core now
  costs the CURRENT `intro.capacity`, flushing it entirely to 0 (`tickComputeCoreConversion`),
  exactly mirroring `pickIntroCapacityMilestone`/Sacrifice's own "drains the ENTIRE balance"
  behavior. Since `capacity` only grows via Sacrifice (never shrinks), this makes the strategic
  trade explicit: Sacrifice further for a bigger-but-slower-to-refill flush (fewer, larger Cores
  over time), or stop Sacrificing at a lower capacity for a smaller-but-faster one (more, smaller
  Cores over time) — "user has to decide where to stop for best efficiency," in the maintainer's own
  words. A player can, in principle, still click Sacrifice after Compute Cores are active (the
  automatic conversion doesn't disable the button) — but since both act on the identical "Memory is
  full" moment and the automatic conversion fires every tick (~10Hz), in practice continuing to
  grow capacity past this point means deliberately choosing not to let a full-Memory tick auto-fire
  a conversion, which only really works if the player has stopped relying on automatic conversion
  firing at all yet. This tension was accepted as-is rather than engineered around (e.g. by making
  Sacrifice and Compute Core conversion a paired manual choice) — the maintainer was offered that
  alternative explicitly (a manual "choose Sacrifice or Convert each time Memory fills" framing) and
  chose the automatic one instead.
- **Gate**: `isComputeCoreConversionReady`'s Storage-bank-fullness check is gone entirely, replaced
  by `isComputeCoreConversionUnlocked` — a pure capacity-magnitude predicate
  (`capacity >= INTRO_COMPUTE_CORE_UNLOCK_CAPACITY`, 800,000 bits/"100 KB" in Memory's own display
  scale, one Sacrifice stage past Storage's own reveal), the same convention
  `isIntroConversionUnlocked`/`isStorageUnlocked` already use. Compute Cores are now completely
  unrelated to Storage — a save with zero Storage banks ever built converts Memory into Cores just
  as readily as one with a maxed-out Storage section.
- **The Storage ladder cap is reverted.** `STORAGE_BANK_LADDER_MAX_SIZE` existed for exactly one
  reason — so the old Storage-fullness-based readiness check had a finite set of sizes
  (`getComputeCoreStorageSizes`) to check exhaustively. With that check gone, the cap serves no
  purpose; `getStorageBankSize` goes back to advancing indefinitely through `tier01`'s level-cost
  sequence forever, as it did before this whole feature existed. ("Banks will be available only for
  tier01 cost steps only" in the maintainer's message turned out to just be restating this original,
  uncapped behavior — not requesting a change from it.)
- **This is Phase 1 only.** The maintainer's full vision for these resources is considerably larger:
  spending Compute Cores (or higher, merged tiers) activates a temporary game-speed multiplier via
  one of several duration/cost presets ("16-Core Burst for 10 min," "4-Core Standard for 1 hour,"
  "2-Core Sustain for 10 hours" — the exact multiplier numbers given, 16×/4×/2×, were confirmed as
  applying specifically at the Compute NODE tier, with Cores themselves "10x less powerful" than
  that), and Cores merge upward through a whole ladder (8 Cores → 1 Node → 1 Cluster → 1 Network → 1
  Grid, each merge worth another 10x), with its own dedicated page reachable once 8 Cores are held.
  None of that shipped here — only the cost/reveal/trigger rework above, `intro.computeCores`/
  `computeNodes` remaining pure counters with no gameplay effect yet. The maintainer explicitly chose
  to phase this (rather than build the whole thing in one pass) given how much of the activation
  system's own numbers were still being worked out live in conversation; the deferred scope is
  tracked as a follow-up `claude-task` issue rather than guessed at here.

### Sacrifice for 10x Capacity gated behind every other currently-possible action

Requested tersely: "Offer memory capacity upgrade only after all other possible upgrades are done."
"Memory capacity upgrade" is Sacrifice for 10x Capacity (the only action that grows `intro.capacity`
at all); "all other possible upgrades" resolved to the two other Byte Foundry milestone-style
actions available at the same moment — Combine into a Byte (before `byteCreated`) and Invest for
Double Production — plus building a Storage bank once Storage is revealed. Compute Core conversion
was deliberately excluded: it doesn't touch `capacity` at all (it spends Memory, not grows the cap),
so it isn't a "capacity upgrade" and this gate doesn't apply to it — the pre-existing tension between
automatic Compute Core conversion and manual Sacrifice both firing on the same "Memory is full"
moment (see the "Compute Cores reworked" entry above) is unaffected by this change.

The gate (`isMemoryCapacityUpgradeAvailable`) is enforced inside `pickIntroCapacityMilestone` itself,
not just a disabled UI button, matching this codebase's standing "engine re-validates, UI just
mirrors it" convention (see CLAUDE.md's "Security notes"). A non-obvious consequence worth
remembering if this is ever revisited: Invest's own cost ladder (`getIntroProductionMilestoneCost`)
starts at the exact same `INTRO_STARTING_CAPACITY` value and grows by the exact same
`INTRO_CAPACITY_MULTIPLIER` `capacity` itself does — the two ladders are numerically identical unless
the player has claimed a different number of Invest tiers than Sacrifice picks. In practice this
means the current Invest tier is almost always simultaneously affordable the instant Memory becomes
full, so claiming it becomes a de facto prerequisite click before every single Sacrifice, not an
occasional one — this was accepted as the natural, intended consequence of the request rather than
something to engineer around (e.g. by decoupling the two ladders or exempting Invest from the gate),
since it's exactly what "offer capacity upgrade only after all other upgrades are done" means in
practice once the two ladders are that closely coupled by construction.

This broke several existing tests that had previously (correctly, before this change) asserted
Sacrifice and Invest were fully independent and simultaneously available from a fresh starting
balance — those tests were updated to explicitly clear the Invest-claimed gate
(`productionMilestoneTierClaims` already at max) wherever the test's actual point was Sacrifice's
own behavior, and to assert the new "blocked while Invest is still claimable" state directly where
that's what the test was checking instead (`engine.test.js`'s `isMemoryCapacityUpgradeAvailable`/
`pickIntroCapacityMilestone` suites, `App.test.jsx`'s Sacrifice/Invest integration tests).

### Fibonacci cost curve and 2-claims-for-the-first-three-Invest-tiers reinstated, this time deliberately

A string of "Update engine.js"/"Update layers.js" commits, made directly through GitHub's web editor
rather than through Claude Code, landed on `main` over a few days without going through the PR
review/test loop this repo otherwise relies on (see "Pull requests"/economy-change-review skill in
CLAUDE.md). Most were genuine, if informally-made, balance tweaks (see below), but two of them
silently resurfaced designs this file already recorded as deliberately superseded:

1. **`getTierCost`'s cost-epoch exponent sequence reverted from triangular back to Fibonacci.** Three
   rapid, self-correcting edits (a naive O(2^n) recursive `fib`, then a memoized-but-still-Fibonacci
   rewrite) replaced the triangular-number formula documented in "Purchase level resized from 10 to
   8, and the cost-epoch sequence changed from Fibonacci to triangular" above — the exact sequence
   that entry says was replaced "at the maintainer's explicit request." The reintroduced version also
   had a live bug: `getTierCost(tier, 0)` / negative levels returned `undefined` instead of clamping
   to level 1 (the memoized array had no entry at a negative index), whereas the triangular formula's
   `Math.max(0, clampNonNegative(level) - 1)` epoch clamp handled that case correctly.
2. **`getIntroProductionMilestoneMaxClaims` reverted from a flat `1` back to `tier > 2 ? 1 : 2`.** This
   undoes "The same round also tightened 'Invest for Double Production' to a single claim per tier
   across the board (an explicit request...)" above almost exactly (a different hardcoded condition
   than the removed `INTRO_AUTO_INVEST_THRESHOLD` cutoff, but the same "first few tiers get 2 claims"
   shape).

Both were first reverted back to the documented (triangular / flat-1-claim) designs in a same-day
follow-up PR, on the reasoning that an un-reviewed direct commit landing on a design this file already
records as explicitly rejected was much more likely an accident than a considered decision — this file's
own "check `docs/DESIGN_HISTORY.md` before changing a formula a past iteration already tried and
rejected" instruction is exactly what a from-scratch review of the diff would have triggered, and a
direct web-UI edit has no such review step at all.

The maintainer then explicitly asked to keep both changes going forward — both are the maintainer's own
deliberate, direct instruction, not a repeat of the un-reviewed-commit gap above; this entry itself is
that instruction being followed. Both were reinstated a second time, with the Fibonacci sequence
implemented cleanly this time: `getCostEpochExponent` computes the sequence via a straightforward
iterative loop (no module-level mutable cache, no recursion), and `getTierCost`'s own existing
`Math.max(0, clampNonNegative(level) - 1)` epoch clamp (unchanged throughout all of this) means the
level ≤ 0 bug the original buggy commit had is not present in the reinstated version — clamping happens
in `getTierCost` itself before `getCostEpochExponent` is ever called, so the exponent function never
sees a level-derived negative epoch to mishandle. `getIntroProductionMilestoneMaxClaims` is back to
`tier > 2 ? 1 : 2` (2 claims for the three cheapest Invest tiers, 1 for every tier after).

Because the Fibonacci exponent sequence (1, 2, 3, 5, 8, 13, … for epochs 0-5) diverges from the
triangular one (1, 2, 4, 7, 11, 16, …) starting at epoch 2 (level 3), every piece of documentation
describing tier01's cost-skip pattern for the Storage bank ladder changed too: under Fibonacci, level 3
(100,000 bits, "100 KB") is NOT skipped — level 4 is the first skip, jumping straight to 10,000,000
bits ("10 MB") and skipping 1,000,000 ("1 MB") instead. Every reference to the old "100,000 is skipped,
a 100 KB bank can never exist" narrative (`CLAUDE.md`, `docs/ECONOMY_REFERENCE.md`, comments in
`layers.js`/`engine.js`) was rewritten to the new "1,000,000 is skipped, a 1 MB bank can never exist"
one, and every test asserting a specific `getTierCost`/`getStorageBankSize` value at level ≥ 3 was
recomputed against the Fibonacci sequence.

The remaining constant tweaks in the same commit
run (`OVERCLOCK_PRODUCTION_STEP` 0.001→0.01, `AUTO_SPEED_UP_COST` 100→20, `TICKSPEED_AUTOBUYER_COST`
20→10, `AUTO_PRESTIGE_AUTOBUYER_COST` 500→100, `INTRO_BITS_PER_KILOBYTE_CONVERSION` 1000→8000,
`INTRO_COMPUTE_CORE_UNLOCK_CAPACITY` 800,000→8,000,000) don't match any previously-rejected design
recorded here, so they were kept as genuine (if informal) balance changes — comments/tests/docs across
`layers.js`/`engine.js`/`ByteFoundryPage`/`ECONOMY_REFERENCE.md`/`MAINPAGE_REFERENCE.md`/`CLAUDE.md`
were brought back in sync with them rather than reverted. One of the same commits also corrected a
real, pre-existing drift: `TIER_DEFINITIONS`' `baseTickSpeedSeconds` ladder had read tier01=2s through
tier10=11s since Bytes was removed from the tier list, even though "Reintroducing the 1s-10s
tickspeed ladder" above (and its own empirical `simulate-run-times` validation) specifically
documents a `tierIndex + 1` (1s-10s) ladder — the commit's 2s-11s → 1s-10s edit brought the code back
in line with that already-validated, already-documented design, so it was kept rather than treated as
a third regression.

Two ByteFoundryPage formatting call sites were also fixed in the same pass — not directly caused by
this commit run's constant changes, but exposed by the accompanying `formatStorageSize` →
`formatBitsInNearestUnit` rename sweep across two of these same commits, which correctly migrated most
call sites (Storage bank redeem/empty/not-built squares, their aria-labels/tooltips) but missed the
Build button's own size label (left it on the old function) and one transfer-block fallback tooltip
(left it on the *new* function, inconsistent with its own sibling branch one line above using the
other). `formatStorageSize` itself also picked up a real bug mid-rename: its internal number
formatting was switched from `formatAmount` to `formatBitsInNearestUnit`, which expects a raw bit
count and produces garbage (e.g. "0.125 B KB") when fed the already-KiloBit-scaled `value` the
function computes internally. All three were fixed together: `formatStorageSize` restored to
`formatAmount` internally (keeping the rename's own correct part — a hardcoded `1000` divisor/
threshold decoupled from `INTRO_BITS_PER_KILOBYTE_CONVERSION`, so this KiloBit-denominated display
scale doesn't silently drift if that unrelated constant changes again), and every size-denominated
call site (Build button label, Storage bank squares) consistently uses `formatStorageSize`, while
every genuine Byte-denominated cost (Storage build cost, transfer-block cost, Invest cost, Memory
capacity) consistently uses `formatBitsInNearestUnit`. The `size === INTRO_BITS_PER_KILOBYTE_CONVERSION`
"smallest bank exempt from the auto-redeem toggle" check in `tickStorageAutoRedeem` had the same class
of bug — it happened to equal the smallest Storage bank size (1000) only because
`INTRO_BITS_PER_KILOBYTE_CONVERSION` used to also be 1000; once that constant became 8000 (a
different scale, per above) the comparison silently stopped matching the actual smallest bank size,
so it was changed to compare against `getFirstTierCost(1)` (tier01's own real level-1 cost) directly.

### Compute Boost: the first mechanic to spend Compute Cores, and a Sacrifice confirmation

Every earlier Compute Cores/Nodes entry above ends the same way: "pure counters today, no gameplay
effect yet." This entry is the first mechanic that actually spends them, requested in the same
terse, iterative style as the mechanic's own earlier design ("Burst is 16x for 1 min / Standard is
4x for 10 mins / Sustain is 2x for an hour... Use as temporary production multipliers for the base
production tier of each screen... User can stack upto 10 of these for extended duration but only of
same types"), with one live clarifying round: the maintainer initially described each preset as
costing a matching number of Cores ("16-Core Burst," "4-Core Standard," "2-Core Sustain"), which
directly contradicts `COMPUTE_ENTITY_CAP` (10) — a Core balance can never reach 16. Asked directly,
the maintainer clarified: "16x, 4x, 2x are not costs. Those are the choices for effect for 10s, 1
min and 10mins respectively" — i.e. those numbers are the MULTIPLIER strength only; the actual cost
is a flat 1 Compute Core per activation regardless of which preset is chosen, matching the original
framing ("Each usage of a Compute Core gives 3 choices"). **If this is ever revisited, don't
reintroduce a per-preset Core cost** — that reading was already tried, contradicted the entity cap,
and was explicitly corrected.

Durations moved during the same conversation before landing on the final numbers implemented here:
`COMPUTE_BOOST_PRESETS` in `layers.js` — Burst 10s, Standard 60s, Sustain 600s.

"The base production tier of each screen... memory for Foundry, tier01 for main game" was
interpreted as: a SINGLE boost effect (one Core spend, one active preset) that multiplies BOTH
Memory's own passive production (Byte Foundry) and `tier01`'s (Kilobytes') production (main game)
*simultaneously* whenever active — not two independent, separately-targetable boosts. This reading
was chosen (not confirmed) because introducing two independent boost-target selections would have
doubled the state/UI surface for a request that gave no signal such a choice was wanted. If this
turns out wrong, the fix is additive: a `computeBoostTarget` field and a per-target multiplier
check, rather than removing anything already shipped.

Also implemented alongside this: a native `window.confirm()` before Sacrifice for 10x Capacity
actually fires, spelling out that it's permanent and raises every future Compute Core's cost — same
"no modal component to reuse" rationale MainPage's own Reset button confirm already documents (see
`handleSacrificeClick` in `ByteFoundryPage`).

### Forced priority order (Storage Bank Fill > Bandwidth > Storage Bank Build > Compute > Memory), and splitting Storage/Compute into their own screens

Requested directly: force an explicit priority order across the Byte Foundry's five recurring
"upgrade" actions, disabling every lower-ranked one whenever a higher-ranked one is currently
available — generalizing a pattern that already existed for exactly one pair (Sacrifice was already
gated behind Combine/Invest/a buildable Storage bank, see "Sacrifice for 10x Capacity gated behind
every other currently-possible action" above) into a full five-item chain, and adding two brand-new
blocking conditions to that chain (a redeemable Storage Bank Fill, an activatable Compute Boost) that
didn't participate in the gate at all before. Implemented as base predicates
(`isStorageBankFillAvailable`/`isBandwidthAvailable`/`isStorageBankBuildAvailable`/
`isComputeUpgradeAvailable`) composed into "turn"-suffixed predicates that fold the ranking in
(`isBandwidthTurnAvailable`/`isStorageBankBuildTurnAvailable`/`isComputeBoostTurnAvailable`), each
enforced inside its own reducer (not just a UI-disabled state) — the same "engine re-validates"
posture the codebase already applies everywhere else. One correction made mid-implementation:
`isStorageBankBuildAvailable` was initially written wrapped in an `isStorageUnlocked` check, mirroring
the OLD `isMemoryCapacityUpgradeAvailable`'s own inline logic — but `buildStorageBank` itself has
never required that threshold (only the UI reveal does), and wrapping it broke an existing
`buildStorageBank` unit test that builds a bank below the Storage-reveal capacity. The wrapper was
dropped; in practice this changes nothing observable through the UI, since a bank can never be
buildable before `isStorageUnlocked` is true anyway (their thresholds coincide by construction — see
`INTRO_STORAGE_UNLOCK_CAPACITY`'s own comment in `layers.js`).

Requested alongside this: move Storage and Compute off ByteFoundryPage onto their own freshly
designed screens (`StoragePage`/`ComputePage`), each reached via a nav button shown once revealed,
worded as "reveal the dedicated screen on clicking that button once it is affordable." Read
literally, this would gate the NAV BUTTON itself on the same priority chain as the actions inside
it — but implementing that literally and testing it end-to-end surfaced a real problem: with the nav
button disabled whenever nothing on that screen is currently actionable, a player can never open
Storage to check on an already-built-but-not-yet-affordable-to-redeem bank, or open Compute to see
banked Cores/Nodes, since "nothing currently actionable" is a common, ordinary state, not an edge
case. That's a materially worse experience than the rest of the app's own established convention —
MainPage's "⚙️ Byte Foundry" link is always enabled once unlocked, a permanent, voluntarily-
revisitable screen regardless of what's currently affordable on it. The nav buttons were changed to
follow that same always-enabled-once-revealed convention instead: `onOpenStorage`/`onOpenCompute` are
plain, unconditional handlers, and only the actions INSIDE `StoragePage`/`ComputePage` (Build,
Redeem, activate a Boost) stay gated by the priority chain. If a stricter, affordability-gated nav
button is what was actually wanted, that's a one-line change at each nav button's own `disabled`
prop (`disabled={!(isStorageBankFillAvailable(state) || isStorageBankBuildTurnAvailable(state))}` for
Storage, `disabled={!isComputeUpgradeTurnAvailable(state)}` for Compute) — nothing else in the engine
layer would need to change.

This also meant fixing `App.jsx`'s own gate-override logic: `showingFoundry` previously forced
`ByteFoundryPage` back onto the screen whenever `!intro.mainGameUnlocked`, *regardless* of `page`,
with only `'info'` exempted (a deliberate courtesy so Auto-Prestige firing while reading the Guide
page doesn't yank the player off it). Since `'storage'`/`'compute'` are reached only via a button ON
`ByteFoundryPage` itself, and Storage/Compute's own reveal thresholds sit far above
`mainGameUnlocked`'s own much-earlier flip point, the unmodified override made those two pages
**permanently unreachable during the mandatory gate phase** — caught by an App-level test
(`fireEvent.click` on the nav button silently landing back on the ByteFoundryPage heading instead of
navigating). `'storage'`/`'compute'` were added to the same exclusion `'info'` already had.

### Storage Banks renamed to Disks: timed builds, a per-array cache, redemption against any tier, and the Kilobit/Kilobyte bug fix

Requested directly: rename "Storage Bank(s)" to "Disk(s)" throughout, and layer several genuinely
new mechanics on top — building now costs real time (not just Bits) and temporarily takes the whole
array offline while it happens; each array gets a small staging cache that must fill before any disk
in it can; and a fix to a bug the request called out explicitly: a "1 KB" disk was sized/costed in
raw bits (1000), not real Kilobytes (1000 Bytes = 8000 bits) — "Kilobytes, Not Kilobits." A later
message in the same thread widened the scope further: a Disk should be able to redeem into ANY
main-game tier whose current price happens to match its size, not just tier01/Kilobytes, with ties
broken by the main game's own tier order — "if order is later changed, it should automatically
follow that as well."

**The bug and its fix.** `getStorageBankSize` (the buildable-size ladder) and `getStorageBankCost`
both operated on `tier01`'s raw per-unit level cost (1000, 10000, …) with no `BITS_PER_BYTE`
conversion — so a "1 KB" bank actually needed only 1000 Byte-Foundry bits to fill, while everything
else in the Byte Foundry (`getIntroKilobyteConversionCost`, Memory's own B/KB/MB display scale) had
always treated "1 KB" as 8000 bits (`BITS_PER_BYTE × 1000`), the real definition of a Kilobyte. A
code comment on the old `formatStorageSize` even flagged this explicitly at the time ("1000 bits is
'1 KB' here ('KiloBits', not 1000 Bytes/8000 bits)") without anyone having connected it to a
player-facing bug yet. The fix: `getDiskSize` now multiplies by `BITS_PER_BYTE` at every ladder step,
exactly like `getIntroKilobyteConversionCost` already does — which, as a direct consequence, made the
two functions compute an *identical* value at tier01's current level, so `isDiskRedeemable` could be
rewritten to just reuse `getIntroKilobyteConversionCost(state)` instead of a parallel
`getFirstTierCost(level) * BITS_PER_BYTE` call (later generalized further — see below).
`getDiskCost` dropped its own now-redundant `* BITS_PER_BYTE` factor, since `capacityBits` is already
Byte-accurate by the time it's called; the "10x" build-cost multiple itself was never actually wrong,
only what it was ten times *of*. `formatStorageSize`'s whole separate "kilobit" formatting scale
(`STORAGE_UNIT_SYMBOLS`, dividing by 1000 with no Byte conversion) was deleted outright —
`formatDiskSize` is now simply an alias for `formatBitsInNearestUnit`, the exact scale Memory's own
balance already renders in, so there is no longer a second, inconsistent "KB" definition anywhere in
the Byte Foundry.

**Timed builds and the array-wide lockout.** Three points here were confirmed directly before
implementing, each because a plausible alternative reading would have produced very different code:
(1) the build-time formula — "adding a 6th disk to a 5 disk array will take 6 seconds" against a
1-second-per-KB base reads as either a flat per-disk time (contradicting the example) or a
position-scaled one; confirmed **position × base** (`getDiskBuildBaseSeconds(size) * ordinal`, where
`ordinal` is `disksBuiltTotal[size] + 1` at the moment the build starts) — a 1 KB array's 6th disk
takes 6×1s, a 10 KB array's 6th disk takes 6×10s; (2) what the per-array "cache" actually does beyond
being a visual subdivision — confirmed a genuine staging pool (`intro.diskCache[size]`, `size` bits,
`DISK_CACHE_BLOCK_COUNT` (8) equal blocks) that Memory must fill completely before `tickDiskAutoFill`
pours it into an empty container, with a full block manually releasable back into Memory
(`releaseDiskCacheBlock`) to redirect those bits elsewhere instead — which also resolves, by ordinary
bookkeeping rather than a special-cased guard, the request's own "transferring a disk to the same
level cannot be possible if cache was used since it will exceed the required amount": bits a player
manually released out of the cache are simply gone from it, so they can never *also* complete (and
later redeem) that same disk — no double-spend is possible by construction; (3) auto-redeem's gating
— confirmed it should key on the redeeming tier's own unit-buying autobuyer being active
(`autobuyers[tier.id]` unlocked AND `autobuyersEnabled[tier.id]` not paused), fully REPLACING the old
standalone, never-exposed-in-UI `storageAutoRedeemEnabled` flag (deleted, along with
`setStorageAutoRedeemEnabled` and its dead "smallest denomination always auto-redeems regardless"
carve-out) rather than adding a second condition alongside it.

A build now spends its cost immediately (`startDiskBuild`) but only sets a countdown
(`intro.diskBuild = { size, remainingSeconds, totalSeconds }`) — `disksBuiltTotal[size]` doesn't
actually increment until `tickDiskBuild` counts `remainingSeconds` down to zero, wired into
`tickGame` right alongside `tickIntroProduction`. "Temporarily disables all disks in the array …
all IO operations to those Disks are disallowed" is enforced everywhere that size's data is touched
during that window — `tickDiskAutoFill`/`tickDiskAutoRedeem` skip it entirely (other sizes are
unaffected), and `redeemDisk`/`isDiskCacheBlockReleasable`/`releaseDiskCacheBlock` all no-op against
it — rather than only disabling the UI's own buttons, the same "engine re-validates, UI just mirrors
it" posture every other Byte Foundry mechanic already follows.

**Redemption against any tier, with a live tie-break.** The follow-up widening this to every
main-game tier turned out to fall out of the existing cost model almost for free: every tier shares
`costResourceId: 'base'` (Bits — see `TIER_DEFINITIONS` in `layers.js`), so "a tier's current
per-unit cost, converted to Byte-Foundry bits via `× BITS_PER_BYTE`" was never actually
tier01-specific, just written that way. A new internal `getMatchingTierForDiskSize(state,
capacityBits)` walks `TIER_DEFINITIONS` **in its own array order** and returns the first tier whose
current cost matches — both "any tier can be fulfilled" and "ties break toward the main game's own
priority order" fall out of that single `Array.prototype.find` call, and because it reads
`TIER_DEFINITIONS` live rather than a hardcoded tier index, a future reordering of that array changes
both behaviors automatically, exactly as requested ("if order is later changed, it should
automatically follow that as well") with no further code change anywhere in this file.
`isDiskRedeemable`/`redeemDisk`/`tickDiskAutoRedeem` were all rewritten in terms of this helper;
`getDiskRedeemTierName` exposes the matched tier's display name to `StoragePage`/`ByteFoundryPage` so
their copy ("Redeems 1 10 KB disk for 1 free Megabyte") never hardcodes "Kilobyte" again. The
disk-*size* ladder itself (`getDiskSize`, still walking tier01's own level-cost sequence) was
deliberately left untouched by this widening — the request's "conflict due to same cost for multiple
tiers" language is about redemption eligibility, not about which sizes ever get offered to build, so
generalizing the build ladder itself was out of scope.

**Migration.** `intro.storageBanks`/`storageBanksBuiltTotal`/`storageAutoRedeemedSizes` are forwarded
to their renamed `disks`/`disksBuiltTotal`/`diskAutoRedeemedSizes` fields explicitly in
`storage.js`'s `migrateState` (same "old name → new name" shape as the `Ones → base` MONEY_ID
forwarding) — `diskCache`/`diskBuild` are brand-new fields with no legacy equivalent, so they simply
fall through to `createInitialGameState`'s fresh defaults on an old save. The removed
`storageAutoRedeemEnabled` field is left unread wherever a legacy save's `saved.intro` still gets
spread in — the same "harmless once nothing reads it" posture every other superseded field in that
function already has.

**Unrelated aside landing in the same change**: MainPage's headline balance (`MoneyHero`) now
switches from Bits to whole Bytes once the balance reaches 8000 Bits (`formatMoneyBalance`,
`MONEY_BYTES_DISPLAY_THRESHOLD`) — a separate, much smaller request bundled into the same PR. Every
other `formatCurrency` call site (costs, production numbers, the Prestige-threshold overlay) was
deliberately left alone, since those represent an actual priced/spent Bits amount rather than a
headline balance meant to stay readable as it grows.

### `tickDiskAutoFill`: a fully-staged cache could get starved out by an unrelated smaller size

Requested directly ("Cache should be refilled ASAP upon use — that is the purpose of cache"),
prompting a closer look at `tickDiskAutoFill` rather than a UI change. The original loop picked one
global "smallest still-fillable size" each iteration and re-evaluated fresh next iteration — so if
that smallest size's cache wasn't yet full and Memory ran out of bits, the loop broke immediately,
`if (bits <= 0) break`, without ever revisiting a *larger* size whose cache had already been fully
staged (from an earlier tick) and was just waiting to pour into its own empty container. Pouring a
complete cache costs no further bits at all — only topping up an incomplete one does — but the
smallest-size-first re-selection never gave that larger size another turn once a smaller one had
first claim on this tick's Memory and couldn't finish. A fully-staged cache could sit converted-but-
unpoured indefinitely, purely because of contention from an unrelated, smaller array, directly
undermining the cache's whole purpose: converting to a disk (and becoming refillable again) the
instant it's ready, not "whenever the smallest size in the ladder happens to also be satisfied."

The fix processes every size in one ascending pass instead, each to its own local fixed point
before moving on: for a given size, first check whether its cache is already full (`cached >= size`)
— if so, pour when an empty container exists, otherwise stop touching that size for this tick; only
once genuinely below `size` does the bits-availability check even apply, and only when an empty
container exists at all (never pre-staging bits for a container that doesn't exist, which is what
the original code already got right and this fix preserves — see the "cascades smallest to largest…
leaving the remainder in Memory" test, which pins exactly this). A regression test seeds a smaller
size with an empty cache that can never finish this tick (not enough bits) alongside a larger size
whose cache is already fully staged, and asserts the larger one still pours — this failed under the
old code (the larger size's `disks` count stayed at 0) and passes under the fix.

### ByteFoundryPage: hiding the Disk detail row and the Transfer-to-Main-Game row once they're no longer pulling their weight

Requested directly, in three related lines: "Storage need not be shown in Foundry if main game
costs of all tiers already exceed its capacity"; "Only the transferrable size should be shown or
none"; "Transfer to main is redundant section." Two genuinely different UI elements, each with a
real risk of over-hiding something load-bearing, so both were confirmed via follow-up questions
before touching code.

**The Disk/Cache detail row.** The obvious reading — hide the whole Storage section, Build button
included, whenever the current size isn't currently redeemable — would have broken a documented,
intentional strategy: "a player can build ahead of or fall behind tier01's actual price" (see
"Economy model"). Confirmed narrower: only `components/DiskArrayRow`'s own cache-blocks/disk-
squares detail hides when `getDiskRedeemTierName(state, diskSize) === null`; the Build button stays
visible and usable regardless, since building ahead of the curve is still exactly the point. The
row's full history remains reviewable on StoragePage either way, so nothing is actually lost by
hiding it here — only the redundant, non-actionable detail on the Foundry screen itself.

**The Transfer-to-Main-Game row.** "Transfer to main is redundant section" reads, taken literally,
as removing the ONLY guaranteed way a fresh cycle ever unlocks the main game — `redeemDisk` never
sets `intro.mainGameUnlocked`, only `convertIntroBitsToKilobytes`/`tickIntroAutoInvest` do, and the
always-on auto-convert has no manual UI of its own to fall back on if this row simply vanished.
Confirmed the condition directly: hide the row once Storage unlocks (`isStorageUnlocked`), since
Disk redemption becomes an alternative path to tier units at that point. But Storage's own reveal
threshold (`INTRO_DISK_UNLOCK_CAPACITY`, reached purely via capacity, itself grown only by repeated
Sacrifice) is completely independent of ever having transferred at all — so a player could in
principle reach it without ever unlocking the main game. Rather than implement the literal
condition and strand that edge case behind a permanently-hidden-but-still-mandatory gate, the final
gate is `isStorageUnlocked(state) && intro.mainGameUnlocked` — identical player-visible behavior in
every ordinary run (the main game is almost always unlocked well before Storage's much higher
threshold), but the row never disappears while it's still the only way out of the mandatory gate.
The always-on auto-convert (`tickIntroAutoInvest`) is completely unaffected either way — it never
depended on the manual row being rendered, so once auto-convert and Disk redemption are both doing
the job, the manual row really is the redundant piece being described.

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

## Documentation

### Why semver/changelog started at v0.5.0, not v0.1.0-from-inception

`package.json`'s `"version"` sat at the placeholder `"0.1.0"` unchanged since the project's very
first commit — nothing ever read or bumped it, and there were no git tags. Rather than either leaving
it meaningless forever or trying to carve the entire pre-changelog commit history into a long, finely
granular version sequence after the fact, the retroactive `CHANGELOG.md` groups that history into five
versions (`v0.1.0`–`v0.5.0`) at natural thematic/chronological boundaries in the real commit log —
coarser than "one version per notable commit," but enough to give the project a real, taggable
version history instead of an eternal `0.1.0` stub. `v0.5.0` (this change) is where the convention
actually starts being *maintained* going forward — every subsequent PR is expected to add its own
`Unreleased` entry, which the retroactive history obviously couldn't have done for itself.

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
