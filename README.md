# Ideal run strategy (orphan branch)

This branch is **orphaned** from `main` on purpose — it only holds ideal-playthrough
strategy snapshots from the `simulate-run-times` skill.

- **Stable branch name:** `ideal-run-strategy` (do not add agent/session suffixes)
- **One file per run:** `runs/<UTC-stamp>-<engine-sha>.md`
- **Do not merge** this branch into `main`
- Produced by: `.claude/skills/simulate-run-times/publish-strategy.sh`

Re-run and publish whenever answering pacing questions **or** after any code change
that can significantly affect ideal Foundry / prestige timings (see the skill's
SKILL.md).

## Runs (newest last in listing; open the last path for latest)

- [`runs/2026-08-21T082515Z-0248b43.md`](./runs/2026-08-21T082515Z-0248b43.md)
