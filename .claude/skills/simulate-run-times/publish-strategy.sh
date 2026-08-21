#!/usr/bin/env bash
# Runs simulate-run-times and publishes IDEAL_STRATEGY.md to the orphan branch
# cursor/ideal-run-strategy-4551. Invoke after every skill run (see SKILL.md).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
SKILL_DIR="$(cd "$(dirname "$0")" && pwd)"
STRATEGY_BRANCH="cursor/ideal-run-strategy-4551"
WORKTREE="${TMPDIR:-/tmp}/tens-ideal-strategy-docs"
DOC_NAME="IDEAL_STRATEGY.md"
STAGING="${TMPDIR:-/tmp}/tens-ideal-strategy-staging"
STAGED_DOC="${STAGING}/${DOC_NAME}"

mkdir -p "$STAGING"
cd "$ROOT"

# Preserve prior run log when the orphan branch already exists.
PRIOR_DOC=""
if git fetch origin "$STRATEGY_BRANCH" 2>/dev/null; then
  PRIOR_DOC="$(git show "origin/${STRATEGY_BRANCH}:${DOC_NAME}" 2>/dev/null || true)"
fi
if [[ -n "$PRIOR_DOC" ]]; then
  printf '%s\n' "$PRIOR_DOC" > "$STAGED_DOC"
else
  rm -f "$STAGED_DOC"
fi

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
  # First publish: orphan branch with only the strategy doc.
  git worktree add --detach "$WORKTREE"
  cd "$WORKTREE"
  git checkout --orphan "$STRATEGY_BRANCH"
  git rm -rf . >/dev/null 2>&1 || true
  # Remove leftover untracked files from the detached worktree checkout.
  find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
fi

cp "$STAGED_DOC" "$WORKTREE/$DOC_NAME"
# Small pointer README so the orphan branch isn't a single mystery file.
cat > "$WORKTREE/README.md" <<'EOF'
# Ideal run strategy (orphan branch)

This branch is **orphaned** from `main` on purpose — it only holds the living
ideal-playthrough strategy document produced by the `simulate-run-times` skill.

- Canonical doc: [`IDEAL_STRATEGY.md`](./IDEAL_STRATEGY.md)
- Updated by: `.claude/skills/simulate-run-times/publish-strategy.sh`
- Do not merge this branch into `main`.
EOF

git add "$DOC_NAME" README.md
if git diff --cached --quiet; then
  echo "Strategy doc unchanged; nothing to publish."
else
  git -c user.email="$(git -C "$ROOT" config user.email)" \
      -c user.name="$(git -C "$ROOT" config user.name)" \
      commit -m "Update ideal run strategy $(date -u +%Y-%m-%dT%H:%MZ)"
  git push -u origin "$STRATEGY_BRANCH"
  echo "Published ${DOC_NAME} → origin/${STRATEGY_BRANCH}"
fi

cd "$ROOT"
# Stay on the branch we started from (worktree operations shouldn't move it, but be explicit).
if [[ -n "$CURRENT_BRANCH" ]]; then
  git checkout "$CURRENT_BRANCH" >/dev/null 2>&1 || true
fi
