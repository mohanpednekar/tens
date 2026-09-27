#!/usr/bin/env bash
# classify-claude-failure.sh — companion to `continue-on-error: true` on an
# anthropics/claude-code-action step: re-fails real errors but downgrades
# transient, Claude-side failures to a workflow ::warning:: so they don't
# leave a false red check behind (#752).
#
# Usage:
#   classify-claude-failure.sh [execution-file]
#
#   execution-file — the action step's `outputs.execution_file`. Falls back to
#   $RUNNER_TEMP/claude-execution-output.json when unset or unreadable.
#
# Exit 0 → transient (job stays green; the next trigger retries on its own).
# Exit 1 → real or unclassifiable failure (job goes red). Anything that can't
# be positively classified as transient fails red — conservative by default.
#
# Transient shapes — both require is_error:true on the LAST `type:"result"`
# entry of the execution JSON (which may be a bare object or an array):
#
#   1. api_error_status ∈ {429, 500, 502, 503, 529} — usage-quota exhaustion
#      ("session limit") or an Anthropic-side 5xx overload (e.g. 529
#      "Overloaded"). Confirmed live 2026-07-29 on autonomous-maintenance.yml —
#      see docs/AUTOMATION.md / docs/DESIGN_HISTORY.md.
#   2. Dead-before-work — no api_error_status, num_turns <= 1,
#      total_cost_usd == 0, empty modelUsage: the engine errored on startup
#      before doing any work. Confirmed live 2026-09-27 on
#      autonomous-pr-followup.yml runs 36286193578 / 36286282545 (#752), whose
#      result entry carried none of the api_error_status field shape 1 keys on.
#
# A run that did real work and then hit a real error fails red as before.
#
# Both workflows invoke this from a copy staged into $RUNNER_TEMP BEFORE the
# Claude step runs — never straight out of the workspace. In
# autonomous-pr-followup.yml the staged copy comes from the sparse `main`
# checkout (the pinned-SHA checkout would otherwise substitute the PR's own
# version of this script, or delete it); in autonomous-maintenance.yml the
# staging just stops a run that can Edit/Write scripts/ from weakening the
# classification of its own failure.

set -euo pipefail

out="${1:-}"
[ -n "$out" ] && [ -f "$out" ] || out="${RUNNER_TEMP:-${TMPDIR:-/tmp}}/claude-execution-output.json"

reason=""
if [ -f "$out" ]; then
  reason=$(jq -r '
        (if type == "array" then . else [.] end)
        | map(select(.type == "result"))
        | last
        | if (.is_error == true)
             and (.api_error_status as $s | [429, 500, 502, 503, 529] | index($s) != null)
          then "transient Claude API error (HTTP \(.api_error_status))"
          elif (.is_error == true)
               and (.api_error_status == null)
               and ((.num_turns // 999) <= 1)
               and ((.total_cost_usd // 999) == 0)
               and (((.modelUsage // {"_": true}) | length) == 0)
          then "the engine died before doing any work (is_error:true with num_turns <= 1, total_cost_usd == 0, empty modelUsage, no api_error_status)"
          else empty
          end
      ' "$out" 2>/dev/null) || reason=""
fi

if [ -n "$reason" ]; then
  echo "::warning::Run skipped: $reason — nothing was done, and the next trigger retries automatically."
  exit 0
fi
echo "::error::Claude run failed for a reason other than a transient Claude-side error — see the Claude step's logs."
exit 1
