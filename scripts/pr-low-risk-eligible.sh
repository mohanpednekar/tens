#!/usr/bin/env bash
# Shared low-risk eligibility for approval-free auto-merge.
#
# Same bar as docs/AUTOMATION.md / pr-auto-merge.yml:
#   - bot-authored branch prefixes only (claude/*, cursor/*, dependabot/*)
#   - never a fork (isCrossRepository)
#   - never touches .github/workflows/
#   - docs/tests-only (CLAUDE.md / *.test.js / *.test.jsx), OR total lines ≤ 50,
#     OR Dependabot patch/minor semver bump
#
# Usage:
#   pr-low-risk-eligible.sh --from-json < pr.json
#   pr-low-risk-eligible.sh --pr <number>          # fetches via gh
#
# pr.json shape (stdin / --from-json):
#   {
#     "branch": "cursor/auto-…",
#     "title": "…",
#     "isCrossRepository": false,
#     "additions": 12,
#     "deletions": 3,
#     "files": ["path/a.js", "path/b.test.js"]
#   }
#
# Exit 0 if eligible, 1 if not, 2 on usage/IO error.
# On success, prints a one-line reason to stdout.

set -euo pipefail

usage() {
  echo "Usage: $0 --from-json < pr.json | $0 --pr <number>" >&2
  exit 2
}

mode=""
pr_number=""
while [ $# -gt 0 ]; do
  case "$1" in
    --from-json) mode=from-json; shift ;;
    --pr)
      mode=pr
      pr_number="${2:-}"
      shift 2
      ;;
    -h|--help) usage ;;
    *) usage ;;
  esac
done

[ -n "$mode" ] || usage

if [ "$mode" = "pr" ]; then
  [ -n "$pr_number" ] || usage
  if ! command -v gh >/dev/null 2>&1; then
    echo "gh is required for --pr mode" >&2
    exit 2
  fi
  pr_json=$(gh pr view "$pr_number" --json title,additions,deletions,files,isCrossRepository,headRefName)
  branch=$(jq -r '.headRefName' <<<"$pr_json")
  title=$(jq -r '.title' <<<"$pr_json")
  is_cross_repo=$(jq -r '.isCrossRepository' <<<"$pr_json")
  additions=$(jq -r '.additions' <<<"$pr_json")
  deletions=$(jq -r '.deletions' <<<"$pr_json")
  files=$(jq -r '.files[].path' <<<"$pr_json")
else
  input=$(cat)
  branch=$(jq -r '.branch // empty' <<<"$input")
  title=$(jq -r '.title // ""' <<<"$input")
  is_cross_repo=$(jq -r '.isCrossRepository // false' <<<"$input")
  additions=$(jq -r '.additions // 0' <<<"$input")
  deletions=$(jq -r '.deletions // 0' <<<"$input")
  files=$(jq -r '.files // [] | .[]' <<<"$input")
fi

if [ -z "$branch" ]; then
  echo "missing branch" >&2
  exit 2
fi

case "$branch" in
  claude/auto-*|claude/self-heal-*|claude/heal-main-*|cursor/auto-*|cursor/heal-main-*|dependabot/*) ;;
  *)
    echo "not a bot-authored branch ($branch)"
    exit 1
    ;;
esac

if [ "$is_cross_repo" = "true" ]; then
  echo "fork PR (isCrossRepository)"
  exit 1
fi

if grep -q '^\.github/workflows/' <<<"$files"; then
  echo "touches .github/workflows/"
  exit 1
fi

docs_tests_only=true
while IFS= read -r f; do
  [ -z "$f" ] && continue
  case "$f" in
    CLAUDE.md|*.test.js|*.test.jsx) ;;
    *) docs_tests_only=false ;;
  esac
done <<<"$files"

total=$((additions + deletions))

if [ "$docs_tests_only" = "true" ]; then
  # Empty file list (no paths) is vacuously docs/tests-only — treat as ineligible
  # unless there is at least one path, matching "whole diff touches only …".
  if [ -n "$(echo "$files" | tr -d '[:space:]')" ]; then
    echo "docs/tests-only diff"
    exit 0
  fi
fi

if [ "$total" -le 50 ]; then
  echo "small diff ($total changed lines)"
  exit 0
fi

if [[ "$branch" == dependabot/* ]]; then
  from_ver=$(grep -oP 'from \K[0-9]+\.[0-9]+\.[0-9]+' <<<"$title" || true)
  to_ver=$(grep -oP 'to \K[0-9]+\.[0-9]+\.[0-9]+' <<<"$title" || true)
  if [ -n "$from_ver" ] && [ -n "$to_ver" ]; then
    from_major=$(cut -d. -f1 <<<"$from_ver")
    to_major=$(cut -d. -f1 <<<"$to_ver")
    if [ "$from_major" = "$to_major" ]; then
      echo "Dependabot patch/minor bump ($from_ver -> $to_ver)"
      exit 0
    fi
  fi
fi

echo "does not meet the low-risk bar"
exit 1
