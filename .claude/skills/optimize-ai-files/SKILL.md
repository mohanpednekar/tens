---
name: optimize-ai-files
description: Reduces the token footprint of this repo's AI-instruction files (CLAUDE.md, .claude/CLAUDE.md, AGENTS.md, .claude/agents/*.md, .claude/skills/*/SKILL.md) without changing any instructed behavior — a content-independent, meaning-preserving compaction pass. Use when asked to cut Claude/AI-file costs, when a session notices these files have grown bloated or repetitive, or when the periodic AI-file-cost-hygiene routine fires.
---

This skill is deliberately a **process**, not a list of things to cut from today's files — it must
stay correct as CLAUDE.md and its sibling files change shape over time. Never hardcode a specific
sentence/section to remove; always re-derive what's redundant from the current text.

## Scope, in priority order

1. `CLAUDE.md` and `.claude/CLAUDE.md` — loaded into **every** session unconditionally. Highest
   value per word cut.
2. `AGENTS.md` — a condensed mirror read by non-Claude tools; also loaded whenever those tools work
   in this repo.
3. `.claude/agents/*.md`, `.claude/skills/*/SKILL.md` — loaded only when that agent/skill is
   invoked, but still worth trimming since some (`code-reviewer`, `file-task-issue`) run often.

This glob-based scope means a new skill or agent file added later is automatically in scope next
time this runs — don't maintain a hardcoded file list anywhere else.

## Hard invariants — never remove or weaken these

- Any documented signature, constant, state-shape fact, or naming convention (this is what
  `CLAUDE.md` says it exists to document — "current behavior only").
- Any explicit "never" / "always" / safety rule, anywhere.
- Any pointer to `docs/DESIGN_HISTORY.md` (or another reference doc) that exists specifically
  because a past iteration already tried the thing being warned against — the pointer can be
  shortened but not deleted; deleting it is how the mistake gets repeated.
- Any concrete number that's load-bearing for tests or behavior (test counts, thresholds,
  version numbers). Never edit the number itself — only the prose around it.
- Skill/agent YAML frontmatter, and any heading another file links to by name/anchor.
- The distinction between what a file documents directly vs. what it only points at (e.g.
  `CLAUDE.md`'s stated convention of keeping formula-level detail in `docs/*_REFERENCE.md` and
  only a pointer here — preserve that split, don't collapse it back to inline detail).

## Safe reduction techniques

- **Prose tightening.** Shorten sentences while keeping every distinct fact: cut filler
  transitions, redundant qualifiers, and repeated restatement of a fact already established
  earlier in the same file.
- **Point at rationale that's already been moved.** If a passage is narrative/rationale (why a
  formula was rejected, an incident write-up, a design trade-off) rather than current-behavior
  fact, and the *same* content already exists in full in its designated home (`docs/DESIGN_HISTORY.md`
  for CLAUDE.md's "why", the matching `docs/*_REFERENCE.md` for formula/field-level detail), replace
  the inline passage with one pointer sentence to it. This skill's own scope is the AI-instruction
  files listed above only — it never writes new content into `docs/DESIGN_HISTORY.md` or a
  `docs/*_REFERENCE.md` file, so if the rationale ISN'T already duplicated there, this technique
  doesn't apply: leave the passage in place and prose-tighten it instead (or flag it as a candidate
  for a separate documentation task — writing it into a reference doc for the first time is outside
  this skill). Only ever apply the pointer-replacement for genuinely narrative content that's
  already fully preserved elsewhere — not for the current-behavior facts CLAUDE.md exists to state
  directly.
- **Cross-file dedup.** If `AGENTS.md` restates something `CLAUDE.md` already says in more than a
  condensed form, tighten the `AGENTS.md` copy — it's explicitly a condensed mirror, not a second
  full copy.
- **Structural collapse.** Several near-identical bullet entries that share a shape can become one
  table row or one generalized sentence, but only if no per-item nuance is lost in the process.

## Process

1. **Inventory.** For each in-scope file present in the repo, record its current size (`wc -w
   <file>`) as a baseline.
2. **Read the whole file**, not an excerpt — a partial read risks "deduplicating" a fact that was
   actually stated only once and needed.
3. **Draft the edit** using the techniques above.
4. **Self-check before applying.** Build a checklist of every distinct fact/instruction in the OLD
   text. Confirm each one still appears in the NEW text — verbatim, reworded, or via an explicit
   pointer to a doc that itself states it. Anything unaccounted for must be restored, not left
   dropped. This is the step that makes the pass "without adverse effect on outcome" — do not skip
   it or rush it.
5. **Re-measure.** Only keep an edit if it's a genuine word-count reduction with the checklist
   fully accounted for. If a file already has no safe reduction available, say so and leave it
   alone — that's a legitimate, honest outcome, not a failure to report around.
6. **Verify.** Run `yarn test` once after all files are edited. Doc-only edits rarely break tests,
   but a stale test-count reference or similar is cheap to catch here.
7. **Commit.** Include this exact trailer line in the commit message body (its own line, verbatim):

   ```
   AI-File-Cost-Pass: <UTC ISO-8601 timestamp, e.g. 2026-09-07T06:00:00Z>
   ```

   `.claude/hooks/session-start.sh` greps for this trailer to report how long it's been since the
   last pass — it must be present exactly like this for that check to find it.
8. **PR as normal.** This is an ordinary PR — follow `CLAUDE.md`'s "Pull requests" section in
   full: open it (draft while anything's still pending), run the adversarial `code-reviewer`
   subagent before considering it done, post its marker, and follow the repo's auto-merge policy.
   Nothing about this being a docs-cost pass exempts it from review.

## What not to do

- Don't chase a percentage or byte-count target. The goal is removing genuine redundancy and
  verbosity, not maximum compression at the cost of nuance.
- Don't touch anything outside the listed AI-instruction files (no source code, no
  `TIER_DEFINITIONS`, no workflow YAML behavior).
- Don't remove a `docs/DESIGN_HISTORY.md` pointer just because it makes a sentence longer.
- Don't force an edit onto a file that's already tight — report "no safe reduction found" instead.

## Report

End with a short table: one row per file touched, before/after word count, and one phrase on the
kind of reduction applied (moved-to-reference / cross-file-dedup / prose-tightened / none-found).
