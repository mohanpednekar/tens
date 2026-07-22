#!/bin/bash
# SessionStart hook: confirms a green yarn install/test baseline before an interactive
# session starts working, instead of discovering broken state mid-task. Intentionally
# always exits 0 — the point is a visible pass/fail summary, not blocking session start.
set -uo pipefail

echo "== Baseline check: yarn install --frozen-lockfile =="
if ! yarn install --frozen-lockfile; then
  echo "‼️  yarn install --frozen-lockfile FAILED — dependencies could not be installed cleanly."
  exit 0
fi

echo "== Baseline check: yarn test =="
if yarn test; then
  echo "✅ Baseline check passed: yarn install and yarn test are both green."
else
  echo "‼️  Baseline check FAILED: yarn test did not pass on a fresh checkout. Investigate before starting new work."
fi

exit 0
