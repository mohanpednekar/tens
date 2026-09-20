#!/usr/bin/env bash
# Shared guard for "follow up on an existing PR" workflows: re-resolve a PR's
# head branch/SHA from the GitHub API and verify it is safe to check out.
#
# Usage:
#   pr-head-guard.sh <pr-number> <branch-prefix-glob...>
#
# Prints "branch<TAB>sha" on success; exits 1 with a stderr message when the PR
# head lives in a fork or the branch matches none of the allowed globs.
#
# Design constraints (do not weaken):
# - Event payloads are never trusted for identity: check_suite / issue_comment /
#   pull_request_review all fire for fork PRs, and a fork's head branch can be
#   named anything (including something that *looks* like claude/auto-*). Only
#   a head that lives in THIS repository may be checked out by a privileged
#   workflow — the API lookup is the source of truth.
# - Callers must check out the printed SHA (immutable), not the branch name —
#   the branch is mutable and re-resolving it later reopens a TOCTOU window
#   between this check and the code that actually runs.

set -euo pipefail

pr="${1:?usage: pr-head-guard.sh <pr-number> <branch-glob...>}"
shift
[ "$#" -ge 1 ] || { echo "error: at least one branch glob is required" >&2; exit 1; }

repo="${GITHUB_REPOSITORY:?GITHUB_REPOSITORY must be set}"

pr_json=$(gh pr view "$pr" --repo "$repo" --json headRefName,headRefOid,isCrossRepository)
branch=$(jq -r '.headRefName' <<<"$pr_json")
sha=$(jq -r '.headRefOid' <<<"$pr_json")
is_cross_repo=$(jq -r '.isCrossRepository' <<<"$pr_json")

if [ "$is_cross_repo" = "true" ]; then
  echo "PR #$pr head is in a fork, not this repository — refusing to check it out." >&2
  exit 1
fi

matched=""
for glob in "$@"; do
  if [[ "$branch" == $glob ]]; then
    matched=1
    break
  fi
done
if [ -z "$matched" ]; then
  echo "PR #$pr branch '$branch' matches none of the allowed patterns: $*" >&2
  exit 1
fi

printf '%s\t%s\n' "$branch" "$sha"
