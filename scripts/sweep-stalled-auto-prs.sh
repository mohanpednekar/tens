#!/usr/bin/env bash
# Stalled claude/auto-* PR sweep (#60): finds open PRs on `claude/auto-*` branches
# that are stuck — a failing check, or a real merge conflict against main — with no
# activity (commit, comment, review: GitHub's `updatedAt`) for STALL_HOURS (default
# 24), and posts a marker comment via GH_AUTOMATION_PAT. The comment re-fires
# autonomous-pr-followup.yml's existing `issue_comment` trigger (no edit to that
# protected workflow). After MAX_RETRIES (default 3) sweep comments on one PR it
# files an `automation-retro` issue instead of retrying forever.
#
# Usage: sweep-stalled-auto-prs.sh [--dry-run]
# Requires gh authenticated as the PAT account. Fail-soft: exits 0 on gh errors so a
# guard step can't break the run; 2 only on usage/tooling errors.

set -uo pipefail

MARKER='<!-- stalled-pr-sweep-v1 -->'
STALL_HOURS="${STALL_HOURS:-24}"
MAX_RETRIES="${MAX_RETRIES:-3}"
DRY_RUN=false
if [ "${1:-}" = '--dry-run' ]; then
  DRY_RUN=true
elif [ -n "${1:-}" ]; then
  echo "Usage: $0 [--dry-run]" >&2
  exit 2
fi
command -v gh >/dev/null 2>&1 || { echo "gh is required" >&2; exit 2; }
command -v jq >/dev/null 2>&1 || { echo "jq is required" >&2; exit 2; }

run() {
  if [ "$DRY_RUN" = true ]; then echo "[dry-run] $*"; else "$@"; fi
}

prs=$(gh pr list --state open --limit 100 \
  --json number,headRefName,updatedAt,mergeable,statusCheckRollup,comments) || {
  echo "::warning::stalled-PR sweep: gh pr list failed — skipping."
  exit 0
}

cutoff=$(( $(date +%s) - STALL_HOURS * 3600 ))

# One TSV row per stalled PR: number, reason (conflict|failing-check), prior sweep comments.
rows=$(jq -r --argjson cutoff "$cutoff" --arg marker "$MARKER" '
  .[]
  | select(.headRefName | startswith("claude/auto-"))
  | select((.updatedAt | fromdateiso8601) < $cutoff)
  | (if .mergeable == "CONFLICTING" then "conflict"
     elif ([.statusCheckRollup[]? | (.conclusion // .state // "")]
           | any(. == "FAILURE" or . == "TIMED_OUT" or . == "ERROR" or . == "STARTUP_FAILURE"))
       then "failing-check"
     else empty end) as $reason
  | [.number, $reason, ([.comments[]?.body | select(contains($marker))] | length)]
  | @tsv' <<<"$prs")

if [ -z "$rows" ]; then
  echo "No stalled claude/auto-* PRs."
  exit 0
fi

while IFS=$'\t' read -r number reason retries; do
  if [ "$retries" -ge "$MAX_RETRIES" ]; then
    existing=$(gh issue list --label automation-retro --state open \
      --search "in:body \"stalled-pr-sweep PR #${number}\"" \
      --limit 1 --json number --jq '.[0].number // empty')
    if [ -n "$existing" ]; then
      echo "PR #$number already escalated in #$existing; skipping."
      continue
    fi
    run gh label create automation-retro --color 6f42c1 \
      --description "Post-mortem of an automation misfire, filed by a run" --force
    body="stalled-pr-sweep PR #${number}

PR #${number} (${reason}) is still stalled after ${retries} sweep-triggered follow-up retries (each at least ${STALL_HOURS}h apart). The synthetic-comment retry is not recovering it.

**Should have happened:** the follow-up workflow fixes the failing check / resolves the conflict within a retry or two.
**Suggested next step:** inspect the PR's latest autonomous-pr-followup.yml runs for a repeated failure (likely a quota wall or a conflict needing a human); close or hand-fix the PR."
    run gh issue create --label claude-task --label automation-retro \
      --title "Stalled PR #${number} not recovering after ${retries} sweep retries" --body "$body"
    continue
  fi
  if [ "$reason" = conflict ]; then
    text="automation: this PR has a merge conflict against \`main\` and needs attention — merge \`main\` into the branch, resolve the conflicts for real, rerun \`yarn test\`, and push."
  else
    text="automation: retrying after an apparent stall — a check on this PR is failing and nothing has happened for ${STALL_HOURS}h+. Investigate the failing check and push a fix."
  fi
  echo "PR #$number stalled ($reason, retry $((retries + 1))/$MAX_RETRIES) — commenting."
  run gh pr comment "$number" --body "${MARKER}
${text}"
done <<<"$rows"
exit 0
