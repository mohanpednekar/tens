#!/bin/bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
REPO=$(git remote -v | grep push | awk '{print $2}' | sed 's/https:\/\/github.com\///' | sed 's/\.git//')

cat << 'JSON' > pr_data.json
{
  "title": "🛡️ Sentinel: [MEDIUM] Fix prototype pollution vector in typeof validation",
  "body": "🚨 **Severity:** MEDIUM\n\n💡 **Vulnerability:** Several legacy detection routines and state processing logic validated parsed state objects using `typeof obj === 'object'`. This allowed arrays or objects with manipulated prototypes (including those instantiated with `Object.create(null)`) to bypass structure checks, creating potential logic flaws or downstream prototype pollution vectors.\n\n🎯 **Impact:** Using `typeof` for plain object verification is overly permissive, potentially resulting in corrupted game state operations or unexpected property access, opening vectors for downstream prototype pollution when merging or verifying legacy and developer data structures.\n\n🔧 **Fix:** Replaced weak `typeof` checks with strict structure checks through `isPlainObject`. This verifies the `Object.prototype.toString.call` output and validates the prototype specifically to ensure dictionaries are actual plain objects. `isPlainObject` was moved to scope in `src/game/storage.js`.\n\n✅ **Verification:** Verified by checking that `yarn test --run` executes and passes all test suites, ensuring game load routines maintain their strict typing bounds without crashing.",
  "head": "'$BRANCH'",
  "base": "main"
}
JSON

jq --arg branch "$BRANCH" '.head = $branch' pr_data.json > pr_data_tmp.json && mv pr_data_tmp.json pr_data.json

curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/$REPO/pulls \
  -d @pr_data.json
