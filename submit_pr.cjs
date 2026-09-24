const { execSync } = require('child_process');

try {
  const branchName = 'bolt-flops-optimization';

  // Push the branch
  const remoteUrl = `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/mohanpednekar/tens.git`;
  execSync(`git push ${remoteUrl} ${branchName} --force`, { stdio: 'inherit' });

  // Create PR
  const body = `💡 What: Replaced the O(N) iterative \`while\` loop in \`tickComputeFlopsAutobuyers\` with an O(1) bulk processing equivalent. The new mechanism (\`getComputeFlopsAffordableAndCost\` and \`buyComputeFlopsTierQuantity\`) computes the affordable quantity upfront for the maximum allowable attempts given the budget.

🎯 Why: In situations with extremely high attempt budgets (e.g. returning after a long idle period or large offline progress), the previous implementation iteratively re-evaluated cost curves and performed a full shallow-clone of the immutable state tree in \`buyComputeFlopsTier\` for each purchased unit. This created severe main-thread lockups and unnecessary garbage collection overhead by updating the state N times.

📊 Impact: Massive reduction in memory allocations and CPU cycles spent duplicating the state object. Reduces state transitions per autobuyer invocation from O(N) to exactly 1.

🔬 Measurement: Run the test suite or manually inject an extremely large \`computeFlopsAutobuyerAttemptBudgets\` alongside huge PP in Dev Mode, and observe the main thread processing offline ticks instantly rather than locking up.`;

  const prData = JSON.stringify({
    title: '⚡ Bolt: Replace O(N) Compute Flops autobuyer with O(1) bulk processing',
    body: body,
    head: branchName,
    base: 'main'
  });

  console.log('Creating PR...');
  execSync(`curl -s -X POST -H "Authorization: token ${process.env.GITHUB_TOKEN}" -H "Accept: application/vnd.github.v3+json" -d '${prData.replace(/'/g, "'\\''")}' https://api.github.com/repos/mohanpednekar/tens/pulls`, { stdio: 'inherit' });
  console.log('Done.');
} catch (error) {
  console.error(error);
}
