#!/usr/bin/env bash
# After a PR's final commit + adversarial APPROVE, enable GitHub auto-merge when
# the PR meets the low-risk bar. See docs/AUTOMATION.md ("After final commit").
#
# Usage:
#   enable-auto-merge-if-eligible.sh <pr-number>
#   enable-auto-merge-if-eligible.sh <pr-number> --require-adversarial-approve
#   enable-auto-merge-if-eligible.sh <pr-number> --mark-ready
#
# Steps:
#   1. Refuse forks.
#   2. Optionally require an issue comment on the PR containing
#        <!-- adversarial-review sha=<headOid> verdict=APPROVE -->
#      matching the current head SHA (posted after the final commit's review).
#   3. Check low-risk eligibility via scripts/pr-low-risk-eligible.sh *before*
#      any draft promotion — a premature --mark-ready must not ready ineligible
#      / WIP PRs.
#   4. Optionally mark the PR ready if it is still a draft (drafts cannot
#      auto-merge). `--require-adversarial-approve` implies `--mark-ready` so
#      the post-review ritual never leaves a finished low-risk PR stuck in
#      draft; the plain green-checks path does NOT mark ready (avoids promoting
#      WIP drafts).
#   5. Enable auto-merge with --merge (Main ruleset: merge + rebase only).
#
# Exit 0 on success (auto-merge enabled or already enabled), 1 if skipped /
# ineligible, 2 on usage/tooling error.
#
# Never force-merges and never pushes to main — only enables GitHub's native
# auto-merge so required checks can finish the job.

set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ELIGIBLE_SCRIPT="$SCRIPT_DIR/pr-low-risk-eligible.sh"

usage() {
  echo "Usage: $0 <pr-number> [--require-adversarial-approve] [--mark-ready]" >&2
  exit 2
}

pr_number="${1:-}"
[ -n "$pr_number" ] || usage
shift || true

require_review=false
mark_ready=false
while [ $# -gt 0 ]; do
  case "$1" in
    --require-adversarial-approve) require_review=true; mark_ready=true; shift ;;
    --mark-ready) mark_ready=true; shift ;;
    *) usage ;;
  esac
done

if ! command -v gh >/dev/null 2>&1; then
  echo "gh is required" >&2
  exit 2
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required" >&2
  exit 2
fi

pr_json=$(gh pr view "$pr_number" --json number,isDraft,isCrossRepository,headRefOid,headRefName,url,autoMergeRequest)

if [ "$(jq -r '.isCrossRepository' <<<"$pr_json")" = "true" ]; then
  echo "PR #$pr_number is from a fork; refusing."
  exit 1
fi

head_sha=$(jq -r '.headRefOid' <<<"$pr_json")
branch=$(jq -r '.headRefName' <<<"$pr_json")

if [ "$require_review" = "true" ]; then
  # Issue comments on the PR (not review threads). Paginate lightly.
  comments=$(gh api --paginate "repos/{owner}/{repo}/issues/${pr_number}/comments" \
    --jq '.[].body')
  # Case-insensitive verdict to match scripts/adversarialReviewMarker.js.
  marker_re="<!--[[:space:]]*adversarial-review[[:space:]]+sha=${head_sha}[[:space:]]+verdict=APPROVE[[:space:]]*-->"
  if ! grep -Eiq "$marker_re" <<<"$comments"; then
    echo "PR #$pr_number ($branch @ ${head_sha:0:7}): no adversarial APPROVE marker for current HEAD."
    exit 1
  fi
  echo "Found adversarial APPROVE marker for $head_sha"
fi

# Eligibility before mark-ready: never promote a draft that cannot auto-merge.
if ! reason=$("$ELIGIBLE_SCRIPT" --pr "$pr_number"); then
  echo "PR #$pr_number is not low-risk eligible: $reason"
  exit 1
fi

if [ "$(jq -r '.isDraft' <<<"$pr_json")" = "true" ]; then
  if [ "$mark_ready" = "true" ]; then
    echo "PR #$pr_number is draft; marking ready for review (required for auto-merge)."
    gh pr ready "$pr_number"
  else
    echo "PR #$pr_number is still a draft; not enabling auto-merge (pass --mark-ready after final review)."
    exit 1
  fi
fi

# Re-fetch in case we just marked ready or auto-merge raced.
pr_json=$(gh pr view "$pr_number" --json autoMergeRequest)
if [ "$(jq -r '.autoMergeRequest != null' <<<"$pr_json")" = "true" ]; then
  echo "PR #$pr_number already has auto-merge enabled ($reason)."
  exit 0
fi

echo "Enabling auto-merge on PR #$pr_number: $reason"
# --merge (not --squash): Main ruleset allows merge + rebase only.
gh pr merge --auto --merge "$pr_number"
echo "Auto-merge enabled for PR #$pr_number ($branch)."
exit 0
