const { execSync } = require('child_process');

try {
  const remoteUrl = execSync('git remote -v', { encoding: 'utf8' });
  const repoMatch = remoteUrl.match(/github\.com[:/](.+?)\.git/);
  if (!repoMatch) {
    throw new Error('Could not determine repository from git remote');
  }
  const repoPath = repoMatch[1];
  const branchName = 'sentinel-fix-prototype-pollution';
  
  execSync(`git checkout -b ${branchName}`);
  execSync('git add src/save-migration/index.js src/game/storage.js .jules/sentinel.md');
  execSync('git commit -m "🛡️ Sentinel: [CRITICAL] Fix Prototype Pollution via Insecure isPlainObject Checks"');
  
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.log('No GITHUB_TOKEN found, skipping PR creation. (Assuming this is a local/test environment)');
    process.exit(0);
  }
  
  console.log(`Pushing to ${branchName}...`);
  execSync(`git push https://x-access-token:${token}@github.com/${repoPath}.git ${branchName}`);
  
  console.log('Creating PR...');
  
  const title = "🛡️ Sentinel: [CRITICAL] Fix Prototype Pollution via Insecure isPlainObject Checks";
  const body = `🚨 **Severity:** CRITICAL
💡 **Vulnerability:** The save ingestion and storage merging logic previously relied on weak type checking (\`typeof raw !== 'object'\`), which made the application vulnerable to prototype pollution when parsing potentially untrusted object payloads (e.g. game saves modified manually or by an external tool) where objects with custom prototypes could bypass validation.
🎯 **Impact:** An attacker could craft a malicious save file containing forged objects (like \`Object.assign(Object.create(null), {a: 1})\`) that bypass plain object validation, leading to arbitrary prototype pollution during recursive deep merges. This could lead to Denial of Service (DoS) or unexpected application behavior depending on how the polluted properties are accessed globally.
🔧 **Fix:** Replaced weak \`typeof\` object validations with a strict \`isPlainObject\` check across ingestion boundaries (\`adaptSaveForCurrentSchema\` in \`save-migration/index.js\` and \`coerceMeta\` in \`src/game/storage.js\`). The strict validation ensures that only objects with a standard \`Object.prototype\` or a \`null\` prototype are treated as plain objects for merging and state building.
✅ **Verification:** Verified by checking the updated files and successfully running the Vitest test suite (\`yarn test --run\`) to ensure no functionality regressions occurred.`;

  const curlCmd = `curl -L \\
  -X POST \\
  -H "Accept: application/vnd.github+json" \\
  -H "Authorization: Bearer ${token}" \\
  -H "X-GitHub-Api-Version: 2022-11-28" \\
  https://api.github.com/repos/${repoPath}/pulls \\
  -d '{"title":"${title}","body":"${body}","head":"${branchName}","base":"main"}'`;
  
  const result = execSync(curlCmd, { encoding: 'utf8' });
  console.log('PR Created successfully');
} catch (e) {
  console.error('Error creating PR:', e.message);
  if (e.stdout) console.error(e.stdout.toString());
  if (e.stderr) console.error(e.stderr.toString());
}
