#!/usr/bin/env bash
# Runs simulate-run-times and publishes one new run file to the stable orphan
# branch `ideal-run-strategy` (never merge into main). See SKILL.md.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
SKILL_DIR="$(cd "$(dirname "$0")" && pwd)"
# Stable name — no agent/session suffix. Do not rename casually.
STRATEGY_BRANCH="ideal-run-strategy"
WORKTREE="${TMPDIR:-/tmp}/tens-ideal-strategy-docs"
STAGING="${TMPDIR:-/tmp}/tens-ideal-strategy-staging"
mkdir -p "$STAGING"
cd "$ROOT"

ENGINE_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
# UTC stamp safe for filenames; sorts chronologically. One file per run.
RUN_STAMP="$(date -u +%Y-%m-%dT%H%M%SZ)"
RUN_BASENAME="${RUN_STAMP}-${ENGINE_SHA}.md"
STAGED_DOC="${STAGING}/${RUN_BASENAME}"

# Forward any extra args to the simulator (default = full career + PP sweep).
node "$SKILL_DIR/simulate.mjs" --strategy-out "$STAGED_DOC" "$@"

CURRENT_BRANCH="$(git branch --show-current)"
cleanup() {
  git worktree remove --force "$WORKTREE" 2>/dev/null || true
  rm -rf "$WORKTREE"
}
trap cleanup EXIT

git worktree remove --force "$WORKTREE" 2>/dev/null || true
rm -rf "$WORKTREE"

if git fetch origin "$STRATEGY_BRANCH" 2>/dev/null && git rev-parse --verify "origin/${STRATEGY_BRANCH}" >/dev/null 2>&1; then
  git worktree add "$WORKTREE" "origin/${STRATEGY_BRANCH}"
  cd "$WORKTREE"
  git checkout -B "$STRATEGY_BRANCH"
else
  # First publish (or migration from a retired name): orphan branch.
  git worktree add --detach "$WORKTREE"
  cd "$WORKTREE"
  git checkout --orphan "$STRATEGY_BRANCH"
  git rm -rf . >/dev/null 2>&1 || true
  find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
fi

mkdir -p "$WORKTREE/runs"
cp "$STAGED_DOC" "$WORKTREE/runs/$RUN_BASENAME"

# Index: newest run first (filename sort is chronological ascending).
{
  cat <<'EOF'
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

EOF
  # shellcheck disable=SC2012
  ls -1 "$WORKTREE/runs"/*.md 2>/dev/null | xargs -n1 basename | sort | while read -r f; do
    echo "- [\`runs/${f}\`](./runs/${f})"
  done
} > "$WORKTREE/README.md"

git add README.md "runs/$RUN_BASENAME"
if git diff --cached --quiet; then
  echo "Strategy run unchanged; nothing to publish."
else
  git -c user.email="$(git -C "$ROOT" config user.email)" \
      -c user.name="$(git -C "$ROOT" config user.name)" \
      commit -m "Add ideal run strategy ${RUN_BASENAME}"
  git push -u origin "$STRATEGY_BRANCH"
  echo "Published runs/${RUN_BASENAME} → origin/${STRATEGY_BRANCH}"
fi

cd "$ROOT"
if [[ -n "$CURRENT_BRANCH" ]]; then
  git checkout "$CURRENT_BRANCH" >/dev/null 2>&1 || true
fi
