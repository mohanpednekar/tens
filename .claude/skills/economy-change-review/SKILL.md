---
name: economy-change-review
description: Cross-checks a PR or working diff that touches TIER_DEFINITIONS or other economy constants (MONEY_ID, GOOGOL, baseCost, costResourceId, producesResourceId, baseTickSpeedSeconds) in src/game/layers.js against its originating issue's approved spec table and Explicit Authorizations section, flagging drift between what was authorized and what was actually implemented. Use before merging any economy-touching PR, autonomous or interactive, or when asked to review/check an economy change against its issue.
---

This is a narrow, mechanical spec-vs-implementation cross-check for the repo's highest-stakes
surface (`TIER_DEFINITIONS` and the economy constants in `src/game/layers.js`) — it does not
replace general code review (see the `code-review` skill for that). Do not eyeball the diff and
call it good; work through every step below and report an explicit pass/fail per check.

## 1. Scope check

Get the diff (`git diff main...HEAD`, or `gh pr diff <number>` if reviewing an already-open PR).
If it does not touch `src/game/layers.js`'s `TIER_DEFINITIONS` array or any economy constant
(`MONEY_ID`, `GOOGOL`, `MONEY_STARTING_AMOUNT`, `PRESTIGE_POINT_SPEED_BONUS`, or similar), this
skill doesn't apply — say so and stop rather than forcing the rest of the checklist.

## 2. Find the originating issue

Read the PR body for a `Closes #N` or `Part of #N` line. If neither is present, ask the user
which issue this diff is meant to implement rather than guessing. Then `gh issue view N` and pull
out two things verbatim:
- The **Spec / acceptance criteria** section — specifically any approved table of tier
  `id`/`name`/`symbol`/`baseCost`/`costResourceId`/`producesResourceId`/`baseTickSpeedSeconds`
  values, or of old→new key mappings for a rename.
- The **Explicit authorizations** section — the maintainer's written sign-off for exactly which
  economy-rule changes this issue permits. Per `CLAUDE.md`'s "Adding a new tier" and Automation
  workflows sections, a change to `TIER_DEFINITIONS` or other game-design/economy behavior is
  banned outside of a task issue whose Explicit Authorizations section explicitly permits that
  specific change.

## 3. Field-by-field diff against the approved table

For every `TIER_DEFINITIONS` entry the diff adds, removes, or edits, compare each field
(`id`, `name`, `symbol`, `baseCost`, `costResourceId`, `producesResourceId`,
`baseTickSpeedSeconds`) against the issue's approved table **exactly** — not "close enough". Watch
specifically for:
- An off-by-one in a `baseCost` exponent, or a `baseCost` that doesn't match the table at all.
- A `producesResourceId` that doesn't chain to the correct previous tier's `id` (this is what
  cascades production down to `MONEY_ID` — a wrong link silently breaks a tier's output).
- A `baseTickSpeedSeconds` that doesn't match the table's intended progression (see "Tier
  production tickspeed" in `CLAUDE.md` — currently each tier is one second slower than the last).
- An `id`/`name`/`symbol` that doesn't match the table's naming exactly, including case.
- Any tier reordered, added, or removed beyond what the table specifies.

## 4. Migration coverage for renamed/removed ids

If any tier `id` is renamed or removed, check `src/game/storage.js`'s `LEGACY_TIER_ID_MAP` (old id
→ new id) and `LEGACY_REMOVED_TIER_IDS` (dropped entirely) cover **every** old→new mapping the
issue specifies — an old id missing from either one silently orphans that tier's saved
`resources`/`owned`/`purchased`/`autobuyers`/`autobuyerAttemptBudgets`/
`tierProductionAccumulators`/`autobuyerAutomation`/`smartAutobuyer` data on existing players' next
load, rather than carrying it forward or making a deliberate, spec'd decision to discard it (see
`migrateTierKeys`/`migrateState` in `storage.js`, and the `LEGACY_REMOVED_TIER_IDS` comment for an
example of a deliberate, documented drop).

## 5. Authorization boundary

Diff every file the PR touches against the issue's **Files likely touched** and **Explicit
authorizations** sections. Flag:
- Any economy-rule change (a `TIER_DEFINITIONS` field, a constant in `layers.js`, a formula in
  `engine.js` like `getTierCost`/`getPurchaseMilestoneMultiplier`/`getPrestigeProductionMultiplier`)
  that the issue's Explicit Authorizations section does not specifically permit.
- Any file changed that has nothing to do with the issue's stated goal and isn't an expected
  accompanying change (test updates for the new behavior, and a `CLAUDE.md` doc sync are expected
  per `CLAUDE.md`'s own Documentation section — those are not drift).

## 6. Report

Report one line per check (1–5 above) as PASS, FAIL, or N/A (scope check said this skill doesn't
apply), each FAIL naming the exact file:line and what it should have been per the issue's table.
End with a one-sentence overall verdict: safe to merge as-is, or blocked pending a fix/maintainer
sign-off.
