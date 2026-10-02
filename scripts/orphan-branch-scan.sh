#!/usr/bin/env bash
# Orphaned-autonomous-branch scan (#59): lists remote branches under the
# automation engines' prefixes (claude/*, devin/*, cursor/*) that have no open
# PR — the signature of a run that died mid-task after pushing but before
# opening a PR, plus stale branches nobody cleaned up after a merge.
#
# Output: one "- <branch>[ (issue #N)] — <merged into main|not merged>" line per
# orphaned branch, capped at ORPHAN_DISPLAY_CAP (default 30) with a "+N more"
# overflow note — the standing #81 rule for guard-step feeds. Prints nothing
# when there are no orphans (callers render the "(none)" default), or a single
# "(unavailable ...)" marker line on failure — fail-soft, always exits 0, so a
# guard step's feed degrades visibly instead of breaking the whole run.
#
# Requires: git with a fetch-capable `origin` remote, gh (for the open-PR list).

set -uo pipefail

SCAN_NS="orphan-scan"
DISPLAY_CAP="${ORPHAN_DISPLAY_CAP:-30}"

unavailable() {
  printf -- '- (unavailable — orphan-branch scan failed: %s; see the guard step log)\n' "$1"
  exit 0
}

# Fetch every engine branch (plus main, for the merged check) into a private
# refs/remotes/orphan-scan/* namespace — never disturbs the checkout's own
# remote-tracking refs, and --prune drops scan refs whose source branch was
# deleted since the last run.
refspecs=()
for prefix in claude devin cursor; do
  refspecs+=("+refs/heads/${prefix}/*:refs/remotes/${SCAN_NS}/${prefix}/*")
done
refspecs+=("+refs/heads/main:refs/remotes/${SCAN_NS}/main")
git fetch --quiet --prune origin "${refspecs[@]}" || unavailable "git fetch"

main_ref="refs/remotes/${SCAN_NS}/main"
git rev-parse --verify --quiet "$main_ref" >/dev/null || unavailable "no main ref"

# One call for every open PR's head branch: a branch with an open PR is owned by
# the PR/follow-up machinery, not an orphan — it never reaches the list.
open_pr_heads=$(gh pr list --state open --limit 200 --json headRefName \
  --jq '.[].headRefName') || unavailable "gh pr list"

total=0
shown=0
while IFS=$'\t' read -r branch sha; do
  [ "$branch" = "main" ] && continue
  if printf '%s\n' "$open_pr_heads" | grep -qxF "$branch"; then
    continue
  fi
  total=$((total + 1))
  [ "$shown" -ge "$DISPLAY_CAP" ] && continue
  if git merge-base --is-ancestor "$sha" "$main_ref"; then
    state="merged into main"
  else
    state="not merged"
  fi
  # The documented naming conventions embed the issue number right after
  # auto-task-/auto-; other real-world names embed it mid-slug (e.g.
  # cursor/<slug>-399-<hex>) — left for the agent to spot, only the unambiguous
  # conventions get the parsed annotation here.
  issue=""
  if [[ "$branch" =~ auto-task-([0-9]+) ]] || [[ "$branch" =~ auto-([0-9]+) ]]; then
    issue=" (issue #${BASH_REMATCH[1]})"
  fi
  printf -- '- %s%s — %s\n' "$branch" "$issue" "$state"
  shown=$((shown + 1))
done < <(git for-each-ref "refs/remotes/${SCAN_NS}" \
         --format='%(refname:strip=3)%09%(objectname)')

if [ "$total" -gt "$shown" ]; then
  printf -- '- (+%d more orphaned branch(es) not shown — see `git ls-remote --heads origin` for the rest)\n' \
    "$((total - shown))"
fi
