const { execSync } = require('child_process');

try {
  const branchName = 'bolt-tickdiskautofill-optimization';
  
  // Create and checkout branch
  execSync(`git checkout -b ${branchName}`);
  
  // Add changes
  execSync('git add src/game/engine.js .jules/bolt.md');
  
  // Commit
  execSync('git commit -m "⚡ Bolt: Replace O(N) object spreading in tickDiskAutoFill" -m "💡 What: Replaced O(N) object spreading inside the tickDiskAutoFill loops with an upfront shallow clone and direct local mutations.
🎯 Why: Object spreading inside a high-frequency (~10Hz) game tick loop creates thousands of intermediate objects per second during massive offline progress, freezing the main thread and destroying garbage collector performance.
📊 Impact: Converts O(N) memory allocations into O(1) upfront cost per tick loop, completely eliminating GC-induced frame drops during Data Lake / disk array build-ups.
🔬 Measurement: Verify with tests and by profiling memory allocations during rapid disk Provisioning."');
  
  // Get remote URL and push
  const repo = execSync('git config --get remote.origin.url').toString().trim();
  const tokenUrl = repo.replace('https://', `https://x-access-token:${process.env.GITHUB_TOKEN}@`);
  execSync(`git push ${tokenUrl} ${branchName} --force`);
  
  // Create PR using curl
  const prData = {
    title: '⚡ Bolt: Replace O(N) object spreading in tickDiskAutoFill',
    body: `💡 What: Replaced O(N) object spreading inside the tickDiskAutoFill loops with an upfront shallow clone and direct local mutations.
🎯 Why: Object spreading inside a high-frequency (~10Hz) game tick loop creates thousands of intermediate objects per second during massive offline progress, freezing the main thread and destroying garbage collector performance.
📊 Impact: Converts O(N) memory allocations into O(1) upfront cost per tick loop, completely eliminating GC-induced frame drops during Data Lake / disk array build-ups.
🔬 Measurement: Verify with tests and by profiling memory allocations during rapid disk Provisioning.`,
    head: branchName,
    base: 'main'
  };

  const ownerRepo = repo.match(/github\.com\/([^\/]+\/[^\.]+)\.git/)[1];
  const curlCmd = `curl -s -X POST -H "Authorization: token ${process.env.GITHUB_TOKEN}" -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/${ownerRepo}/pulls -d '${JSON.stringify(prData)}'`;
  
  const result = execSync(curlCmd).toString();
  console.log("PR Created:", JSON.parse(result).html_url);

} catch (error) {
  console.error("Failed:", error.message);
}
