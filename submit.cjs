const { execSync } = require('child_process');

try {
  const branchName = 'bolt-optimize-fill-datalake-disks';
  execSync(`git checkout -b ${branchName}`);
  execSync('git add src/game/engine.js .jules/bolt.md');
  execSync('git commit -m "⚡ Bolt: Optimize fillDataLakeDisks O(N) offline progress loop"');
  
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not found.");

  const remoteUrl = execSync('git config --get remote.origin.url').toString().trim();
  const repoPath = remoteUrl.replace('https://github.com/', '').replace('.git', '');
  
  const authUrl = \`https://x-access-token:\${token}@github.com/\${repoPath}.git\`;
  
  execSync(\`git push \${authUrl} \${branchName} --force\`);

  const prData = {
    title: '⚡ Bolt: Optimize fillDataLakeDisks O(N) offline progress loop',
    body: '💡 What: Replaced iterative O(N) `while` loop processing offline progress in `fillDataLakeDisks` with an O(1) mathematical batch calculation.\n🎯 Why: Processing huge influxes of `fillBits` (like from offline progress) one disk at a time causes application freezing/hanging.\n📊 Impact: Converts millions of iterations to a handful of boundary jump calculations, greatly speeding up offline game loading and performance without losing exact accuracy.\n🔬 Measurement: The unit tests natively pass without any regressions or timeouts due to loop iteration freezes.',
    head: branchName,
    base: 'main'
  };

  const curlCommand = \`curl -s -o /dev/null -w "%{http_code}" -X POST -H "Authorization: token \${token}" -H "Accept: application/vnd.github.v3+json" -d '\${JSON.stringify(prData)}' https://api.github.com/repos/\${repoPath}/pulls\`;
  
  const status = execSync(curlCommand).toString().trim();
  console.log("PR creation status:", status);

} catch (err) {
  console.error("Submission failed:", err.message);
}
