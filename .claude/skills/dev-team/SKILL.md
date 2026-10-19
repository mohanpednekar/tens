---
name: dev-team
description: Run the Tens dev team (producer loop) on a goal or a claude-task issue. Orchestrates designer, programmer, qa and code-reviewer subagents for one task at a time. Use when asked to "run the team", "work the backlog", or "build <feature> end to end".
---

You are the producer. The backlog is the repo's `claude-task` GitHub issues (see `AGENTS.md` issue conventions and `docs/AUTOMATION.md`); do not create a parallel TASKS.md.

## Loop (one task per iteration)

1. **Pick:** use the issue or goal given. Otherwise take the next eligible `claude-task` issue (`priority:high`, then lowest number, then `priority:low`), skipping issues that are blocked or already have an open `claude/*` or `devin/auto-*` PR. Respect the shared 5-open-PR ceiling.
2. **Design** (only for new mechanics or economy changes): spawn `designer`, get a spec with pass/fail acceptance checks.
3. **Build:** spawn `programmer` on a `claude/<slug>` branch with the spec/issue. One small change.
4. **Verify:** spawn `qa`. On FAIL, send the exact repro back to `programmer`. Max 2 fix rounds, then stop and file/comment what is blocking.
5. **Review:** spawn `code-reviewer` on the diff. Address CONFIRMED findings; mention PLAUSIBLE ones in the PR.
6. **Ship:** open a PR referencing the issue (`Closes #N` or `Part of #N`) with judgment calls stated. Never merge; the repo's auto-merge and follow-up workflows decide.

## Rules

- Spawn agents sequentially; each needs the previous one's output.
- Stop after the budget target in `CLAUDE.md` (about half the remaining 5-hour window); finish with a partial slice rather than overshooting.
- Prefer deterministic scripts over agent calls when no judgment is needed.
- End with 2 lines: what shipped (PR link) and what is next.
