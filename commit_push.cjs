const { execSync } = require('child_process');

try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "⚡ Bolt: Optimized compute flops affordable math for unbounded quantities"', { stdio: 'inherit' });
  
  const branchName = 'bolt-compute-flops-opt';
  execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
  
  const remoteUrl = `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`;
  execSync(`git push -u ${remoteUrl} ${branchName}`, { stdio: 'inherit' });
  
  console.log('Successfully pushed branch:', branchName);
} catch (e) {
  console.error('Failed to commit and push:', e.message);
  process.exit(1);
}
