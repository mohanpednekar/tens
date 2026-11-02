const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("GITHUB_TOKEN not found.");
  process.exit(1);
}

try {
  // Determine repo dynamically
  const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
  const repoMatch = remoteUrl.match(/github\.com[/:](.+?)\.git$/) || remoteUrl.match(/github\.com[/:](.+?)$/);
  const repo = repoMatch ? repoMatch[1] : null;

  if (!repo) {
      console.error("Could not parse repository from remote URL:", remoteUrl);
      process.exit(1);
  }

  // Ensure git user is configured
  execSync('git config --global user.email "bot@example.com"');
  execSync('git config --global user.name "Bot"');

  const branchName = `sentinel-proto-poll-fix-${Date.now()}`;
  execSync(`git checkout -b ${branchName}`);
  execSync('git add .');
  execSync('git commit -m "🛡️ Sentinel: [MEDIUM] Fix Prototype Pollution Vector via `typeof === \'object\'` Validation"');

  // Push
  const pushUrl = `https://x-access-token:${token}@github.com/${repo}.git`;
  execSync(`git push ${pushUrl} HEAD:${branchName}`);
  console.log(`Branch ${branchName} pushed successfully.`);

  const data = JSON.stringify({
      title: "🛡️ Sentinel: [MEDIUM] Fix Prototype Pollution Vector via `typeof === 'object'` Validation",
      body: "🚨 **Severity:** MEDIUM\n💡 **Vulnerability:** The dev mode state inspector and editor (`src/pages/DevModePage/index.jsx` and `src/pages/DevModePage/stateFields.js`) validated parsed JSON and nested game state objects using `typeof value === 'object' && !Array.isArray(value)`. This allowed objects instantiated with `Object.create(null)` or having manipulated prototypes to bypass structure checks or corrupt data merging/rendering, creating potential prototype pollution vectors.\n🎯 **Impact:** Manipulated input could bypass plain object checks, potentially leading to polluted properties across the game state if deeply merged, or incorrect evaluation inside dev tools.\n🔧 **Fix:** Replaced the permissive `typeof` check with a strict plain object validator ensuring `Object.prototype.toString.call(value) === '[object Object]'` and explicitly verifying the prototype.\n✅ **Verification:** Verified by ensuring the dev mode still operates seamlessly with valid plain objects and confirming tests continue to pass.",
      head: branchName,
      base: "main"
  });

  const req = https.request({
      hostname: 'api.github.com',
      path: `/repos/${repo}/pulls`,
      method: 'POST',
      headers: {
          'Authorization': `token ${token}`,
          'User-Agent': 'Node.js',
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'Content-Length': data.length
      }
  }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
              const pr = JSON.parse(body);
              console.log(`Pull request created: ${pr.html_url}`);
          } else {
              console.error(`Failed to create PR. Status: ${res.statusCode}`);
              console.error(body);
          }
      });
  });

  req.on('error', (e) => {
      console.error(`Request error: ${e.message}`);
  });

  req.write(data);
  req.end();

} catch (e) {
  console.error(e.message);
  if (e.stdout) console.error(e.stdout.toString());
  if (e.stderr) console.error(e.stderr.toString());
}
