#!/usr/bin/env bash
# Stalled auto-PR sweep (#60): finds open PRs on `claude/auto-*` / `devin/auto-*`
# branches that are stuck — a failing check, a real merge conflict against main, or
# all-green checks that simply never merged (unresolved threads, no review marker) —
# with no activity (commit, comment, review: GitHub's `updatedAt`) for STALL_HOURS
# (default 24). A PR merely BEHIND main is refreshed directly via the update-branch
# API (no staleness wait). Stalled PRs get a marker comment via GH_AUTOMATION_PAT. The comment re-fires
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
  --json number,headRefName,updatedAt,mergeable,mergeStateStatus,statusCheckRollup,comments) || {
  echo "::warning::stalled-PR sweep: gh pr list failed — skipping."
  exit 0
}

# Behind main (but not conflicted): merge main in right away. A behind PR can't
# auto-merge under an up-to-date-branch rule and nothing else refreshes it. 422 =
# nothing to do; tolerated.
behind=$(jq -r '.[]
  | select(.headRefName | startswith("claude/auto-") or startswith("devin/auto-"))
  | select(.mergeStateStatus == "BEHIND" and .mergeable != "CONFLICTING")
  | .number' <<<"$prs")
for n in $behind; do
  echo "PR #$n is behind main — requesting update-branch."
  run gh api -X PUT "repos/{owner}/{repo}/pulls/$n/update-branch" || true
done

cutoff=$(( $(date +%s) - STALL_HOURS * 3600 ))

# One TSV row per stalled PR: number, reason (conflict|failing-check), prior sweep comments.
rows=$(jq -r --argjson cutoff "$cutoff" --arg marker "$MARKER" '
  .[]
  | select(.headRefName | startswith("claude/auto-") or startswith("devin/auto-"))
  | select(.mergeStateStatus != "BEHIND")
  | select((.updatedAt | fromdateiso8601) < $cutoff)
  | (if .mergeable == "CONFLICTING" then "conflict"
     elif ([.statusCheckRollup[]? | (.conclusion // .state // "")]
           | any(. == "FAILURE" or . == "TIMED_OUT" or . == "ERROR" or . == "STARTUP_FAILURE"))
       then "failing-check"
     elif ([.statusCheckRollup[]? | (.conclusion // .state // "")]
           | length > 0 and all(. == "SUCCESS" or . == "NEUTRAL" or . == "SKIPPED"))
       then "green-unmerged"
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
  elif [ "$reason" = green-unmerged ]; then
    text="automation: all checks are green but this PR has not merged for ${STALL_HOURS}h+. Get it merge-ready: reply to and resolve every open review thread (fix real findings, answer the rest), run the code-reviewer subagent on the head SHA and post its adversarial-review marker, then — if the diff touches no \`.github/workflows/**\` file and the verdict is APPROVE — mark the PR ready and enable auto-merge. Otherwise say once what blocks it."
  else
    text="automation: retrying after an apparent stall — a check on this PR is failing and nothing has happened for ${STALL_HOURS}h+. Investigate the failing check and push a fix."
  fi
  echo "PR #$number stalled ($reason, retry $((retries + 1))/$MAX_RETRIES) — commenting."
  run gh pr comment "$number" --body "${MARKER}
${text}"
done <<<"$rows"
exit 0
