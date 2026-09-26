const { execSync } = require('child_process');

try {
  const branchName = 'jules-4957829963364709055-25ca5808';

  // Push the branch
  const remoteUrl = `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`;
  execSync(`git push ${remoteUrl} ${branchName} --force`, { stdio: 'inherit' });

  // Create PR
  const title = "⚡ Bolt: Replace O(N) chunk loop with O(1) mathematical formulation";
  const body = `💡 **What:** The iterative O(N) \`for (;;)\` loop transferring chunks in \`tickDataLakeDiskReadCacheFill\` has been replaced with an O(1) mathematical calculation.
🎯 **Why:** When resolving massive amounts of \`available\` storage or \`memoryToCacheBudget\` (e.g. offline progress calculation), the original looping chunk-transfer created thousands of deep object clones which crashed the garbage collector and froze the main thread.
📊 **Impact:** Reduces processing iterations and memory allocations inside \`tickDataLakeDiskReadCacheFill\` from potentially thousands down to 1. Expected to prevent thread freezing for massive offline accumulation.
🔬 **Measurement:** Verify tests run properly by executing \`yarn test --run\`. Benchmarks with large \`available\` offline budgets will not loop internally over chunks.
`;

  const prData = JSON.stringify({
    title,
    body,
    head: branchName,
    base: 'main'
  });

  const curlCmd = `curl -s -X POST -H "Authorization: token ${process.env.GITHUB_TOKEN}" -H "Accept: application/vnd.github.v3+json" -d '${prData.replace(/'/g, "'\\''")}' https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/pulls`;

  const response = execSync(curlCmd).toString();
  const json = JSON.parse(response);

  if (json.html_url) {
    console.log(`PR created successfully: ${json.html_url}`);
  } else {
    console.error(`Failed to create PR: ${JSON.stringify(json, null, 2)}`);
  }

} catch (error) {
  console.error('Error during PR creation:', error.message);
}
