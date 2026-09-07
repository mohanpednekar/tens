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

echo "== AI-instruction file cost hygiene =="
# Informational only, never blocking. Looks for the most recent commit carrying the
# "AI-File-Cost-Pass: <timestamp>" trailer that .claude/skills/optimize-ai-files/SKILL.md
# writes on every pass. Scoped to main's own ancestry (not --all, and deliberately NOT falling
# back to HEAD) so a stray trailer on an unmerged/abandoned branch can never under-report
# staleness: if neither origin/main nor main resolves (e.g. a shallow, single-branch clone),
# this reports "no pass found" rather than risk trusting the current branch's own history.
main_ref=""
for ref in origin/main main; do
  if git rev-parse --verify "$ref" >/dev/null 2>&1; then
    main_ref="$ref"
    break
  fi
done
# Read the trailer's own timestamp VALUE out of the commit message body, not the commit's
# committer date (%cI) — the committer date is mutable (a rebase or cherry-pick of an old pass
# commit refreshes it to "now", which would make a stale pass look current for another 30 days).
last_pass_iso=""
if [ -n "$main_ref" ]; then
  pass_commit_body=$(git log -1 --grep='^AI-File-Cost-Pass:' --format=%B "$main_ref" -- . 2>/dev/null || true)
  # tail -n1 (not the first match) so a commit that somehow carries more than one trailer line
  # uses the last/most-authoritative one rather than silently preferring an earlier value.
  last_pass_iso=$(printf '%s\n' "$pass_commit_body" | grep -E '^AI-File-Cost-Pass:' | tail -n1 | sed -E 's/^AI-File-Cost-Pass:[[:space:]]*//')
fi
if [ -z "$last_pass_iso" ]; then
  echo "ℹ️  No recorded AI-instruction-file cost-optimization pass found yet. Consider running the"
  echo "   optimize-ai-files skill this session (.claude/skills/optimize-ai-files/SKILL.md)."
elif last_epoch=$(date -d "$last_pass_iso" +%s 2>/dev/null) && now_epoch=$(date +%s); then
  if [ "$last_epoch" -gt "$now_epoch" ]; then
    # Compare raw epochs BEFORE deriving days: bash integer division truncates toward zero, so
    # a less-than-24h-future timestamp would otherwise compute days=0 and read as "fresh" — this
    # catches any future timestamp, not just ones large enough to survive the /86400 truncation.
    echo "ℹ️  Last AI-instruction-file cost-optimization pass trailer ($last_pass_iso) is in the"
    echo "   future — ignoring it rather than treating it as fresh; check for a bad timestamp."
  else
    days=$(( (now_epoch - last_epoch) / 86400 ))
    if [ "$days" -gt 30 ]; then
      echo "ℹ️  Last AI-instruction-file cost-optimization pass was $days day(s) ago (> 30-day target)."
      echo "   Consider running the optimize-ai-files skill this session."
    else
      echo "✅ AI-instruction-file cost hygiene: last pass $days day(s) ago — within the 30-day target."
    fi
  fi
else
  echo "ℹ️  Last AI-instruction-file cost-optimization pass: $last_pass_iso (could not compute age here)."
fi

exit 0
