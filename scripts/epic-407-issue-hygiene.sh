#!/usr/bin/env bash
# Idempotent GitHub issue hygiene for epic #407 (Era ascension / Eons).
# Closes merged/stray issues, posts design-lock comments, and labels remaining
# sub-issues so Phase A can pick them up.
#
# Requires `gh` authenticated with Issues read/write (GH_AUTOMATION_PAT in GHA,
# or GH_TOKEN in Cursor Cloud Agents — see docs/AUTOMATION.md).
#
# Usage: epic-407-issue-hygiene.sh [--dry-run]
#
# Exit 0 when finished (including no-op runs), 2 on usage/tooling error.

set -euo pipefail

MARKER='<!-- epic-407-hygiene-v1 -->'
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

DESIGN_LOCKIN="$(cat <<'EOF'
## Design lock-in (shipped naming — supersede stale "meta-prestige" / `metaPrestige` wording)

**Player-facing names:** **Era** (ascension action) and **Eons** (permanent meta currency). Ordinary **Prestige / PP** naming is unchanged.

**Eligibility:** voluntary when unspent `prestige.points >= ERA_ELIGIBILITY_PP` (`GOOGOL` = 1 Googol PP). No production freeze.

**Engine:** `eraGame()` / `actions.eraAscend()` in `src/game/engine.js` (merged PR #415, closes #410).

**Carry (persists across Era):** automation unlocks + enabled/paused flags, museum, supporter entitlements, save slots, Byte generator existence (`byteCreated`), hyperscaler count, Eons balance + Eon upgrades, `prestige.unboundedUnlocked`, Compute/Foundry page latches, Flops page reveal latch.

**Reset (wipes on Era):** full Foundry cycle (Memory, Sacrifice/Invest tiers, gate), Factory run (`tier01`–`tier10`, PP balance, ordinary prestige count, Double PP level), all Disks/builds/cache, Compute ladder + Boost state, `computeFlops.owned`.

**Award:** Eons per ascension via `getEonsAwarded()` (flat + Eon Amplifier bonus).

**Milestones:** Era N unlocks the Nth Compute Flops autobuyer tier (KFlops at Era 1, scaling per `FLOPS_AUTOBUYER_ERA_START` / `FLOPS_AUTOBUYER_ERA_STEP`).

Sub-issues #411–#414: use Era/Eons field names and `eraAscend` — not `metaPrestige` / `actions.metaPrestige()`.
EOF
)"

close_if_open 410 "**Merged via PR #415.** Era ascension engine, save migration v2, hook action \`actions.eraAscend()\`, and carry/reset tests landed on \`main\`."

close_if_open 409 "Stray \`test\` issue with no linked work — closing during #407 epic hygiene."

post_comment_once 407 "$DESIGN_LOCKIN"

post_comment_once 411 "**Dependency update:** Engine shipped in #410 / PR #415. Use **Era** / **Eons** naming, \`isEraEligible\`, \`actions.eraAscend()\`, \`era.count\`, \`eons.balance\` — not \`metaPrestige\`. Settings/Milestones ascend UI + Guide section. **Blocked by nothing** — ready for Phase A pickup."

post_comment_once 412 "**Dependency update:** Engine in #410 / PR #415; UI trigger in #411. Integration tests + \`e2e/era-ascension.e2e.js\` (seed eligible save → Settings ascend). Engine-only integration tests can land before #411; **browser e2e is blocked by #411**."

post_comment_once 413 "**Dependency update:** #410 merged — document final shipped behavior (\`eraGame\` carry/reset table in \`docs/ECONOMY_REFERENCE.md\`). Narrative *why* only; no code unless drift fix. **Blocked by #410** is satisfied."

post_comment_once 414 "**Dependency update:** v1 engine awards Eons with hyperscaler spend only; full Eon shop tree still needs maintainer-approved spend design before coding. **Blocked by maintainer spend spec** — do not implement until design is recorded here. Phase A must skip until unblocked."

for num in 411 412 413 414; do
  if [ "$(issue_state "$num")" = 'MISSING' ]; then
    echo "Issue #$num: not found — skipping labels."
    continue
  fi
  add_label_if_missing "$num" 'claude-task'
  set_milestone_if_missing "$num" 'v0.6.0'
done

add_label_if_missing 411 'size:M'
add_label_if_missing 412 'size:M'
add_label_if_missing 413 'size:S'
add_label_if_missing 414 'size:L'
add_label_if_missing 414 'priority:low'
add_label_if_missing 414 'blocked'

echo "epic-407-issue-hygiene: done."
