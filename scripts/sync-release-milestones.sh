#!/usr/bin/env bash
# Idempotent release-milestone setup for player-facing feature tracks.
# Creates/updates version milestones and assigns the Era (#407) and UI-revamp
# (#138–#140) issue groups. Safe to rerun on every housekeeping pass.
#
# Requires `gh` with Issues read/write (GH_AUTOMATION_PAT in GHA, GH_TOKEN in
# Cursor Cloud Agents — see docs/AUTOMATION.md).
#
# Usage: sync-release-milestones.sh [--dry-run]
#
# Exit 0 when finished, 2 on usage/tooling error.

set -euo pipefail

DRY_RUN=false
if [ "${1:-}" = '--dry-run' ]; then
  DRY_RUN=true
elif [ -n "${1:-}" ]; then
  echo "Usage: $0 [--dry-run]" >&2
  exit 2
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "gh is required" >&2
  exit 2
fi

run() {
  if [ "$DRY_RUN" = true ]; then
    echo "[dry-run] $*"
  else
    "$@"
  fi
}

milestone_number() {
  local title=$1
  gh api repos/{owner}/{repo}/milestones --paginate \
    --jq ".[] | select(.title==\"$title\") | .number" | head -1
}

ensure_milestone() {
  local title=$1
  local description=$2
  local num
  num=$(milestone_number "$title")
  if [ -n "$num" ]; then
    echo "Milestone '$title' already exists (#$num)."
    run gh api "repos/{owner}/{repo}/milestones/$num" -X PATCH \
      -f "description=$description" >/dev/null
    echo "  Updated description."
    echo "$num"
    return 0
  fi
  num=$(run gh api repos/{owner}/{repo}/milestones -X POST \
    -f "title=$title" -f "description=$description" -f state=open \
    --jq '.number')
  echo "Created milestone '$title' (#$num)."
  echo "$num"
}

assign_milestone() {
  local issue=$1
  local milestone_title=$2
  if ! gh issue view "$issue" --json number >/dev/null 2>&1; then
    echo "Issue #$issue: not found — skipping."
    return 0
  fi
  local current
  current=$(gh issue view "$issue" --json milestone --jq '.milestone.title // ""')
  if [ "$current" = "$milestone_title" ]; then
    echo "Issue #$issue: already on '$milestone_title' — skipping."
    return 0
  fi
  run gh issue edit "$issue" --milestone "$milestone_title"
  echo "Issue #$issue: set milestone '$milestone_title' (was '${current:-none}')."
}

V06_DESC='UI revamp release — tier row redesign (#138), prestige surfaces (#139), light mode (#140). Shipped prestige/Flops foundations (#404, #405) grouped here for release tracking.'
V07_DESC='Era ascension release — voluntary Googol PP Era ascension, Eons meta currency, deep Foundry/Factory reset (#407 epic: engine #410, UI #411, tests #412, docs #413, Eon shop #414).'

ensure_milestone 'v0.6.0' "$V06_DESC" >/dev/null
ensure_milestone 'v0.7.0' "$V07_DESC" >/dev/null

# UI revamp (open)
for issue in 138 139 140; do
  assign_milestone "$issue" 'v0.6.0'
done

# Prestige / Flops foundations (shipped — retrospective milestone for release notes)
for issue in 404 405; do
  assign_milestone "$issue" 'v0.6.0'
done

# Era ascension epic + sub-issues (open + shipped engine)
for issue in 407 410 411 412 413 414; do
  assign_milestone "$issue" 'v0.7.0'
done

echo "sync-release-milestones: done."
