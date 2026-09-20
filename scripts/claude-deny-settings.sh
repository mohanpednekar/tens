#!/usr/bin/env bash
# Emit the claude-code-action `settings` JSON with the repo's shared workflow
# deny-list, plus any extra workflow files the calling workflow must protect.
#
# Usage:
#   settings=$(scripts/claude-deny-settings.sh [extra-workflow-file...])
#
# The base deny-list always protects the files no unattended agent may touch:
# ci.yml (required checks), deploy.yml (release path), and
# automation-self-heal.yml (the healer must not heal itself). Callers pass their
# OWN workflow file (and any other agent-restricted files) as extra args —
# e.g. the PR-follow-up workflows forbid all workflow edits, so they pass every
# workflow file; automation-self-heal passes none of the healable ones.
#
# Prints compact JSON on stdout, shaped for `with.settings` of
# anthropics/claude-code-action.

set -euo pipefail

BASE=(ci.yml deploy.yml automation-self-heal.yml)

files=("${BASE[@]}")
for extra in "$@"; do
  case "$extra" in
    .github/workflows/*) ;;
    *) echo "error: deny entries must be workflow paths under .github/workflows/ (got '$extra')" >&2; exit 1 ;;
  esac
  files+=("${extra#.github/workflows/}")
done

jq -nc \
  --argjson files "$(printf '%s\n' "${files[@]}" | sort -u | jq -R . | jq -sc .)" \
  '{permissions: {deny: [$files[] as $f | "Edit(.github/workflows/\($f))", "Write(.github/workflows/\($f))"]}}'
