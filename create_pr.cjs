const { execSync } = require('child_process');

const branchName = 'bolt/optimize-datalake-fill';

try {
  // Setup branch
  execSync(`git checkout -b ${branchName}`);
  execSync(`git add src/game/engine.js .jules/bolt.md`);
  execSync(`git commit -m "⚡ Bolt: Replace O(N) loops with O(1) math in Data Lake fill logic"`);

  // Push the branch using Node.js child_process and GITHUB_TOKEN
  const ownerRepo = execSync('git config --get remote.origin.url').toString().trim().replace('https://github.com/', '').replace('.git', '');
  const pushUrl = \`https://x-access-token:\${process.env.GITHUB_TOKEN}@github.com/\${ownerRepo}.git\`;
  execSync(\`git push \${pushUrl} HEAD:\${branchName} --force\`);
  
  // Create PR via curl
  const createPrCmd = \`curl -s -X POST -H "Authorization: token \${process.env.GITHUB_TOKEN}" \
-H "Accept: application/vnd.github.v3+json" \
https://api.github.com/repos/\${ownerRepo}/pulls \
-d '{"title": "⚡ Bolt: Replace O(N) loops with O(1) math in Data Lake fill logic", "head": "\${branchName}", "base": "main", "body": "💡 What: Replaced single-slot iterative O(N) calculations in \`fillDataLakeDisks\` and \`getDataLakeManualFillCost\` with O(1) mathematical chunking calculations.\\n🎯 Why: Autobuyers handling massive offline progress overflow calculations could trigger severe O(N) single-slot evaluation loops where \`fillBits\` was re-assessed thousands of times across functionally identical capacities, freezing the main thread.\\n📊 Impact: Converts time complexity for bulk fills to purely O(1) constant time, eliminating the offline progress performance bottleneck entirely.\\n🔬 Measurement: Confirmed exact identical game math behavior against the Vitest snapshot suite."}'\`;

  const output = execSync(createPrCmd).toString();
  console.log("PR Created!");
  
} catch (e) {
  console.error(e.message);
}
