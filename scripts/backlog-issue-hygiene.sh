#!/usr/bin/env bash
# Idempotent GitHub backlog hygiene: close shipped issues, unblock ready work, label
# actionable items, and run epic-specific hygiene scripts.
#
# Requires `gh` authenticated with Issues read/write (unset invalid GH_TOKEN so the
# Cursor/install token is used — see docs/AUTOMATION.md).
#
# Usage: backlog-issue-hygiene.sh [--dry-run]
#
# Exit 0 when finished (including no-op runs), 2 on usage/tooling error.

set -euo pipefail

MARKER='<!-- backlog-hygiene-v1 -->'
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

issue_state() {
  gh issue view "$1" --json state --jq '.state' 2>/dev/null || echo 'MISSING'
}

has_marker_comment() {
  local num=$1
  gh api --paginate "repos/{owner}/{repo}/issues/${num}/comments" \
    --jq '.[].body' 2>/dev/null | grep -Fq "$MARKER" || return 1
}

post_comment_once() {
  local num=$1
  local body=$2
  if has_marker_comment "$num"; then
    echo "Issue #$num: hygiene comment already present — skipping."
    return 0
  fi
  run gh issue comment "$num" --body "${body}

${MARKER}"
  echo "Issue #$num: posted hygiene comment."
}

close_if_open() {
  local num=$1
  local reason=$2
  local state
  state=$(issue_state "$num")
  if [ "$state" = 'MISSING' ]; then
    echo "Issue #$num: not found — skipping."
    return 0
  fi
  if [ "$state" = 'CLOSED' ]; then
    echo "Issue #$num: already closed — skipping."
    return 0
  fi
  post_comment_once "$num" "$reason"
  run gh issue close "$num"
  echo "Issue #$num: closed."
}

remove_label_if_present() {
  local num=$1
  local label=$2
  if ! gh issue view "$num" --json labels --jq '.labels[].name' 2>/dev/null | grep -Fxq "$label"; then
    echo "Issue #$num: label '$label' not present — skipping."
    return 0
  fi
  run gh issue edit "$num" --remove-label "$label"
  echo "Issue #$num: removed label '$label'."
}

add_label_if_missing() {
  local num=$1
  local label=$2
  if gh issue view "$num" --json labels --jq '.labels[].name' 2>/dev/null | grep -Fxq "$label"; then
    echo "Issue #$num: label '$label' already set — skipping."
    return 0
  fi
  run gh issue edit "$num" --add-label "$label"
  echo "Issue #$num: added label '$label'."
}

set_milestone_if_missing() {
  local num=$1
  local milestone=$2
  local current
  current=$(gh issue view "$num" --json milestone --jq '.milestone.title // ""' 2>/dev/null || echo '')
  if [ "$current" = "$milestone" ]; then
    echo "Issue #$num: milestone '$milestone' already set — skipping."
    return 0
  fi
  run gh issue edit "$num" --milestone "$milestone"
  echo "Issue #$num: set milestone '$milestone'."
}

# --- Shipped infrastructure / navigation (close) ---

close_if_open 339 "**Shipped.** \`cursor-autonomous-maintenance.yml\` runs five IST wall-clock slots (four development + dedicated **1:30am IST** housekeeping/planning) and post-merge housekeeping on every push to \`main\`. Documented in \`CLAUDE.md\` / \`docs/AUTOMATION.md\`."

close_if_open 343 "**Shipped.** \`pr-auto-merge.yml\` uses \`gh pr merge --auto --merge\` (not \`--squash\`) on all paths, aligned with the Main ruleset's allowed merge methods. Documented in \`docs/AUTOMATION.md\`."

close_if_open 347 "**Shipped.** Shared bottom \`AppNav\` (Foundry → Boosters → Compute → Factory → Guide → More) plus \`AppMenu\` (More → Milestones / Settings) in \`App.jsx\`. Gate-exempt utilities stay reachable during the Byte Foundry gate; Factory stays progress-gated. Tests in \`App.test.jsx\`."

# --- Epic #321 compute chain (close sub-issues + epic) ---

close_if_open 322 "**Shipped.** Reserve-slot timed merge system (engine) + ComputePage two-row UI landed on \`main\`."

close_if_open 323 "**Shipped.** Bandwidth ×2 claims fundable by sacrificing compute tokens when Invest bit cost exceeds Memory capacity."

close_if_open 324 "**Shipped.** Sacrifice once Compute is unlocked wipes all compute tokens + merge timers, rolls back compute-funded Bandwidth only (\`rollbackComputeFundedBandwidth\` / \`eraseAllComputeTokens\`), and keeps \`autoMerge*\` unlock flags permanent. Covered in \`engine.test.js\`."

close_if_open 367 "**Shipped.** Nine sequential one-time \`upgradeComputeMergeDuration\` sacrifices (10 of each input tier) permanently halve that boundary's step multiplier (\`COMPUTE_MERGE_STEP_MULTIPLIER_UPGRADED\`). Engine + tests landed on \`main\`."

close_if_open 370 "**Superseded by #380.** Merge durations derive from live Core earn × \`COMPUTE_MERGE_CORE_EARN_MULTIPLIER\` (10) with ×10 (or ×5 once upgraded) per boundary — not a fixed 1s×10ⁿ table. Closing stale spec."

close_if_open 376 "**Shipped (implements #323).** Compute-funded Bandwidth ×2 via sequential 10-token sacrifices when Invest bit cost exceeds Memory capacity. State: \`computeBandwidthSacrificeIndex\` / \`computeFundedBandwidthClaims\`. Tests in \`engine.test.js\`."

close_if_open 380 "**Shipped.** \`getComputeMergeDurationSeconds\` uses Core earn time × \`COMPUTE_MERGE_CORE_EARN_MULTIPLIER\` (10), then ×10 per boundary (×5 once upgraded). Documented in \`layers.js\` / \`docs/ECONOMY_REFERENCE.md\`."

close_if_open 321 "**Epic complete.** All three sub-issues shipped: reserve-slot timed merging (#322), Bandwidth-via-compute-tokens (#323), Capacity-upgrade compute wipe (#324). Merge-duration upgrades (#367/#380) also landed. No remaining open sub-issues."

# --- #395: unblocked once workflow fix lands (remove blocked label) ---

remove_label_if_present 395 'blocked'

# --- Label actionable player-facing work for Phase A ---

for spec in \
  '399|claude-task|size:S' \
  '139|claude-task|size:M' \
  '140|claude-task|size:M' \
  '411|claude-task|size:M' \
  '412|claude-task|size:M' \
  '413|claude-task|size:S'; do
  num="${spec%%|*}"
  rest="${spec#*|}"
  label1="${rest%%|*}"
  label2="${rest#*|}"
  if [ "$(issue_state "$num")" = 'OPEN' ]; then
    add_label_if_missing "$num" "$label1"
    add_label_if_missing "$num" "$label2"
    set_milestone_if_missing "$num" 'v0.6.0'
  fi
done

# #138: tier-row redesign — blockers #134/#137 are closed; #139 is blocked *by* #138 (not the reverse).
remove_label_if_present 138 'blocked'
post_comment_once 138 "**Backlog hygiene:** Removed stale \`blocked\` label — dependencies #134 and #137 are closed. #139 (Prestige surfaces) is sequenced **after** this issue; ready for Phase A pickup."

# --- Delegate epic-specific hygiene ---

if [ -x scripts/epic-407-issue-hygiene.sh ]; then
  echo "Running scripts/epic-407-issue-hygiene.sh …"
  if [ "$DRY_RUN" = true ]; then
    scripts/epic-407-issue-hygiene.sh --dry-run
  else
    scripts/epic-407-issue-hygiene.sh
  fi
else
  echo "scripts/epic-407-issue-hygiene.sh missing — skipping epic #407 pass."
fi

echo "backlog-issue-hygiene: done."
