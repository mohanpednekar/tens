#!/usr/bin/env bash
# Inspect or resolve review threads on an automation-owned PR.
#
# Usage:
#   resolve-pr-threads.sh list <pr>             — one JSON line per review thread
#                                                 (id, isResolved, first comment's
#                                                 author/body/path/line) so the caller
#                                                 can map threads to feedback
#   resolve-pr-threads.sh resolve <pr> <id>...  — resolve ONLY the given thread IDs
#
# Design constraints (do not weaken):
# - Resolving requires the GraphQL resolveReviewThread mutation; raw
#   `gh api graphql` is deliberately NOT granted to the unattended agent
#   (an unrestricted mutation surface could merge PRs). This script is the
#   narrow, whitelistable form.
# - Only PRs whose head branch matches this repo's automation prefixes
#   (claude/*, devin/*) may be touched — the agent can never resolve threads on
#   a human's or external contributor's PR.
# - `resolve` takes explicit IDs the caller selected after replying to each one;
#   it never bulk-resolves "all unresolved", so feedback the agent missed (or
#   that arrived mid-run) stays open and keeps branch protection engaged.
#   `list` is the read-only sweep to confirm nothing is left.
# - Replying to a thread is the caller's job first:
#   `gh api repos/<owner>/<repo>/pulls/<pr>/comments -f in_reply_to=<comment-id>`.

set -euo pipefail

cmd="${1:?usage: resolve-pr-threads.sh list|resolve <pr> [thread-id...]}"
pr="${2:?usage: resolve-pr-threads.sh list|resolve <pr> [thread-id...]}"

full_repo="${GITHUB_REPOSITORY:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}"
owner="${full_repo%%/*}"
repo="${full_repo##*/}"

# Guard: automation branches only.
branch=$(gh pr view "$pr" --json headRefName --jq .headRefName)
case "$branch" in
  claude/*|devin/*) ;;
  *)
    echo "error: PR #$pr head branch '$branch' is not an automation branch (claude/*|devin/*)" >&2
    exit 1
    ;;
esac

list_threads() {
  local after=""
  while :; do
    local page
    if [ -n "$after" ]; then
      page=$(gh api graphql -f query='
        query($owner: String!, $repo: String!, $pr: Int!, $after: String!) {
          repository(owner: $owner, name: $repo) {
            pullRequest(number: $pr) {
              reviewThreads(first: 100, after: $after) {
                nodes { id isResolved comments(first: 1) { nodes { body path line author { login } } } }
                pageInfo { hasNextPage endCursor }
              }
            }
          }
        }' -f owner="$owner" -f repo="$repo" -F pr="$pr" -f after="$after")
    else
      page=$(gh api graphql -f query='
        query($owner: String!, $repo: String!, $pr: Int!) {
          repository(owner: $owner, name: $repo) {
            pullRequest(number: $pr) {
              reviewThreads(first: 100) {
                nodes { id isResolved comments(first: 1) { nodes { body path line author { login } } } }
                pageInfo { hasNextPage endCursor }
              }
            }
          }
        }' -f owner="$owner" -f repo="$repo" -F pr="$pr")
    fi
    jq -c '.data.repository.pullRequest.reviewThreads.nodes[] |
      {id, isResolved, path: .comments.nodes[0].path, line: .comments.nodes[0].line,
       author: .comments.nodes[0].author.login, body: (.comments.nodes[0].body | .[0:200])}' <<<"$page"
    local next
    next=$(jq -r '.data.repository.pullRequest.reviewThreads.pageInfo | select(.hasNextPage) | .endCursor // empty' <<<"$page")
    [ -n "$next" ] || break
    after="$next"
  done
}

case "$cmd" in
  list)
    list_threads
    ;;
  resolve)
    shift 2
    [ "$#" -gt 0 ] || { echo "error: resolve needs at least one thread id" >&2; exit 1; }
    for tid in "$@"; do
      gh api graphql -f query='
        mutation($tid: ID!) {
          resolveReviewThread(input: {threadId: $tid}) {
            thread { id isResolved }
          }
        }' -f tid="$tid" --jq '.data.resolveReviewThread.thread.isResolved' \
        | xargs -I{} echo "thread $tid resolved={}"
    done
    ;;
  *)
    echo "error: unknown command '$cmd' (expected list|resolve)" >&2
    exit 1
    ;;
esac
