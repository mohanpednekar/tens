const { execSync } = require('child_process');

try {
  // Commit changes
  execSync('git config user.name "Jules"');
  execSync('git config user.email "jules@example.com"');
  execSync('git checkout -b fix-prototype-pollution');
  execSync('git add src/game/storage.js .jules/sentinel.md');
  execSync('git commit -m "🛡️ Sentinel: [MEDIUM] Fix Prototype Pollution" -m "🚨 Severity: MEDIUM\n💡 Vulnerability: The `isPlainObject` function was susceptible to objects instantiated with a null prototype or forged object-like entities, enabling prototype pollution.\n🎯 Impact: An attacker could craft a payload that overrides properties on `Object.prototype`, affecting all objects in the application.\n🔧 Fix: Implemented strict prototype validation in `isPlainObject`.\n✅ Verification: Verified fix using unit tests and deep object merge scenarios."');

  // Push changes
  const repoUrl = `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`;
  execSync(`git push -u ${repoUrl} fix-prototype-pollution`);

  // Create PR
  const prData = {
    title: '🛡️ Sentinel: [MEDIUM] Fix Prototype Pollution',
    head: 'fix-prototype-pollution',
    base: 'main',
    body: `🚨 **Severity:** MEDIUM\n\n💡 **Vulnerability:** The \`isPlainObject\` function was susceptible to objects instantiated with a null prototype or forged object-like entities, enabling prototype pollution.\n\n🎯 **Impact:** An attacker could craft a payload that overrides properties on \`Object.prototype\`, affecting all objects in the application.\n\n🔧 **Fix:** Implemented strict prototype validation in \`isPlainObject\`.\n\n✅ **Verification:** Verified fix using unit tests and deep object merge scenarios.`
  };

  const curlCommand = `curl -X POST -H "Authorization: token ${process.env.GITHUB_TOKEN}" -H "Accept: application/vnd.github.v3+json" -d '${JSON.stringify(prData)}' https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/pulls`;
  const output = execSync(curlCommand, { encoding: 'utf8' });
  console.log(output);

} catch (error) {
  console.error('Error:', error.message);
  if (error.stdout) console.error('stdout:', error.stdout.toString());
  if (error.stderr) console.error('stderr:', error.stderr.toString());
}
