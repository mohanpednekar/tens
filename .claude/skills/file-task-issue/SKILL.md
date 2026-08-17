---
name: file-task-issue
description: Authors a well-formed GitHub issue — either a claude-task issue for this repo's autonomous maintenance backlog, or a plain tracking issue for an interactive session's own work — using the full Goal/Context/Spec/Files/Out-of-scope/Verification/Explicit-authorizations/Dependencies structure, correct size/priority labeling, the conflict-avoidance Blocked-by sequencing heuristic, and the narrow cases where no PR is expected. Use whenever asked to file a claude-task issue, file a tracking issue for interactive work, split a large feature into a sequence of issues, or review/tighten an existing issue's spec before it's picked up.
---

Filing a sloppy `claude-task` issue is expensive here: the implementing run is unattended and
cannot ask questions, so anything ambiguous gets guessed at, and a spec that goes stale after
later work ships (see "Specs go stale — write defensively" below) can gridlock the whole Phase A
backlog for weeks behind a `blocked` label nobody revisits. This skill packages the conventions
this repo has actually converged on, across ~90 filed issues, so a new issue reproduces that rigor
by default instead of by luck.

## 0. `claude-task` backlog issue vs. interactive tracking issue

This skill authors two different kinds of issue, and they must not be confused:

- **`claude-task` backlog issue** — filed for `autonomous-maintenance.yml`'s Phase A backlog. Carries
  the `claude-task` label plus a size/priority label (section 2 below).
- **Interactive tracking issue** — filed by an interactive session for its own work, per CLAUDE.md's
  "Issue tracking for interactive sessions" section. Same template sections make a good body, but it
  **must not** carry the `claude-task` label — that label means "available for the autonomous backlog
  to pick up," and applying it to a tracking issue for work already underway would make the automation
  try to claim it too. Size/priority labels don't apply either, since nothing queues it. Comment on it
  as the session's status changes and close it when the work concludes.

Everything below (template sections, size/priority labels, `blocked`, sequencing, epics/sub-issues,
"specs go stale", no-PR cases) is written for the backlog case but applies equally to a tracking
issue's body and sub-issue structure — just skip the `claude-task` label and the size/priority labels
for the tracking-issue case.

## 1. Use the template, section by section

Always start from `.github/ISSUE_TEMPLATE/claude-task.yml` — don't restate its section
skeleton here, just fill it in with this repo's conventions in mind:

- **Goal** — one sentence, outcome-framed ("the Prestige panel shows X"), not task-framed
  ("update the Prestige panel").
- **Context / why** — motivation, links to prior discussion, and — critically — a note on
  *where this issue's assumptions could go stale* (see section 5).
- **Spec / acceptance criteria** — a concrete checklist. Prefer describing **behavior and
  acceptance criteria** over hardcoding specific component/file names, exact test counts, or
  literal code snippets wherever the two can be separated — the former survives refactors, the
  latter is exactly what goes stale first (a real, repeated failure mode — see #138/#45's history).
- **Files likely touched** — a hint, not a contract.
- **Out of scope** — explicit non-goals. This is what stops an unattended run's scope creep more
  reliably than anything else in the template.
- **Verification** — beyond `yarn test`: what to manually check in `yarn dev`, and any invariant
  worth calling out by name (accessibility labels, layout invariants, migration coverage).
- **Explicit authorizations** — required, verbatim, for anything the workflow otherwise hard-bans
  (see `CLAUDE.md`'s Automation workflows section): a `TIER_DEFINITIONS`/economy change, a rename
  that needs a save-migration, or similar. Security constraints (no `--no-verify`, no editing
  another protected workflow file, never push to main, never self-merge) can never be authorized
  away, and saying so explicitly in this section prevents a future session from assuming a broad
  authorization implicitly covers them.
- **Dependencies** — `Blocked by #N`, one per line. See section 3 for when to add one even without
  a strict functional dependency.

## 2. Label conventions

- **Size** (`size:S`/`size:M`/`size:L`) — required. S = a single small focused change; M = the
  normal run-sized task the template implies (implement, test, commit, push, PR in one scheduled
  run); L = large enough that a single run will likely only land a partial slice (`Part of #N`
  instead of `Closes #N`, plus a comment on what remains) rather than finish outright.
- **Priority** (`priority:high` / `priority:low`, unlabeled = normal) — `priority:high` jumps the
  FIFO queue; use it sparingly and for a real reason (e.g. #44/#45's rationale: foundational
  game-feature work the sole maintainer wanted developing in parallel with infra hardening, not
  queued behind it — stated explicitly in the issue body, not left implicit). `priority:low` sinks
  to the back, picked only once nothing higher-tier is eligible.
- **`blocked`** — never applied when filing a new issue. It's applied later, by an implementing
  run, and means one of two distinct things (teach both if writing docs/tooling about it):
  1. **An environment/permission restriction of the unattended session itself** — e.g. the
     `Workflows: write` PAT gap (see #62), or a protected path (`.claude/**`) that only an
     interactive session can write to. Applied on the *first* occurrence, since there's nothing to
     re-derive — the restriction is a fact about the environment, not a judgment call.
  2. **A second consecutive independent run reaching the same "infeasible as written" conclusion**,
     with nothing new in between (no maintainer reply, no issue edit, no relevant code change).
     Comment-only on the *first* such finding; only the second occurrence gets the label — this
     stops a stale-spec issue from re-deriving the identical dead end indefinitely (issue #101 did
     this 6 times before manual closure).

  Either way, **the label is a filing-time no-op and a maintenance-time trigger**: don't add it
  when authoring a new issue, and when triaging the backlog, don't treat a `blocked` label as
  permanent — its cause can resolve (a dependency issue closes, a tooling gap gets fixed) while the
  label itself doesn't auto-clear. A repo-state refresh that finds the original cause resolved
  should remove the label (or, if the spec itself is what's stale, rewrite the spec and then remove
  the label) rather than leaving a technically-unblocked issue sitting inert.

## 3. Conflict-avoidance sequencing

When splitting one large feature into a sequence of issues, add `Blocked by #N` between two issues
whenever they'd edit the same lines/files — **even with no strict functional dependency** — purely
to avoid two autonomous runs producing conflicting concurrent edits. See the byte-scale-rename
chain (#44→#46→#47→#48) and the changelog/semver chain (#50→#51→#52) for real examples: each link
in both chains exists to serialize edits to the same files, not because the later issue is
functionally impossible without the earlier one.

This is one of three automation-design principles documented in `docs/DESIGN_HISTORY.md`'s
"Automation design principles" section — **determinism-first** (prefer a plain script over a Claude
invocation when no genuine judgment is needed) and **judgment-call transparency** (state reasoning
explicitly when a spec gap forces a judgment call, rather than deciding silently) are the other two,
and apply to how an issue's spec itself should be worded, not just to workflow implementation.

## 4. Epics and sub-issues

Group a multi-issue feature under a parent "epic" issue (see #87–#92, #132) and attach each
concrete issue as a GitHub sub-issue of it (the `sub_issue_write` tool, or the repo's established
convention — see #93). This is what makes a large in-flight initiative collapse to one row in the
default Issues view instead of a dozen.

For an interactive-session tracking epic (CLAUDE.md's "Issue tracking for interactive sessions")
that's `size:M`/`size:L`-shaped, prefer splitting sub-issues along **coding / testing /
documentation** phase lines over pure feature-slices — see that CLAUDE.md section for the exact
split and which requirements stay mandatory in the coding sub-issue (green `yarn test`, core-logic
tests, `CHANGELOG.md`, same-commit `CLAUDE.md` updates) versus which are genuinely deferrable to the
testing/documentation sub-issues. This lets the coding sub-issue merge without waiting on the other
two, while keeping them visible instead of dropped. A `size:S` task doesn't need this — one tracking
issue is enough.

## 5. Specs go stale — write defensively, and re-verify before filing a rewrite

This repo ships fast enough that a spec written against "today's" UI/code can describe elements
that no longer exist a few weeks later (#138's `TickProgressRing`, #45's Bulk toggle and XP
display both hit this — see their comment histories). Before filing or rewriting any issue whose
subject is a specific piece of existing UI or code:

- Grep the actual current source for the component/function names the spec is about to name.
  Don't assume a description from an older issue, PR, or conversation still matches reality.
- Prefer phrasing acceptance criteria around behavior/accessibility contracts (aria-labels, test
  query patterns, invariants) over specific styled-component names, exact grid layouts, or literal
  hex values — the former tends to survive a restyle, the latter doesn't.
- If you're reviewing an *existing* issue that looks stale, verify against current `main` before
  concluding it's stale — cite the specific file/line or doc section that's out of date rather than
  asserting it from memory.

## 6. When an issue needs no PR

The default is one issue → one PR. A small number of narrow, explicitly-justified exceptions exist
in this repo's history — direct tag pushes (#51), GitHub Project/Milestone-board metadata updates
(#53, #58), and pure issue-filing (gap-analysis, #55, #57's bug-filing). If an issue is one of
these, its body must say so explicitly ("This task does not open a pull request... do not create a
branch") and explain why — silence defaults to expecting a PR.
