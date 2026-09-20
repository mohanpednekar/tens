#!/usr/bin/env bash
# Resolve every unresolved review thread on a PR.
#
# Thread resolution requires the GraphQL resolveReviewThread mutation, which is
# deliberately NOT exposed to the autonomous maintenance agent as a raw
# `gh api graphql` capability (an unrestricted mutation surface could merge PRs).
# This script is the narrow, whitelistable form: give the agent
# `Bash(scripts/resolve-pr-threads.sh:*)` and it can resolve threads but nothing
# else GraphQL can do.
#
# Usage: scripts/resolve-pr-threads.sh <pr-number>
#
# Only resolves threads; replying to a thread first is the caller's job
# (`gh api repos/<owner>/<repo>/pulls/<pr>/comments -f in_reply_to=<comment-id>`).

set -euo pipefail

pr="${1:?usage: resolve-pr-threads.sh <pr-number>}"

full_repo="${GITHUB_REPOSITORY:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}"
owner="${full_repo%%/*}"
repo="${full_repo##*/}"

threads=$(gh api graphql -f query='
  query($owner: String!, $repo: String!, $pr: Int!) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $pr) {
        reviewThreads(first: 100) {
          nodes { id isResolved }
        }
      }
    }
  }' -f owner="$owner" -f repo="$repo" -F pr="$pr" \
  --jq '[.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved | not) | .id]')

count=$(jq 'length' <<<"$threads")
echo "$count unresolved thread(s) on PR #$pr"
[ "$count" -eq 0 ] && exit 0

jq -r '.[]' <<<"$threads" | while read -r tid; do
  gh api graphql -f query='
    mutation($tid: ID!) {
      resolveReviewThread(input: {threadId: $tid}) {
        thread { id isResolved }
      }
    }' -f tid="$tid" --jq '.data.resolveReviewThread.thread.isResolved' \
    | xargs -I{} echo "  thread {} resolved={}"
done
