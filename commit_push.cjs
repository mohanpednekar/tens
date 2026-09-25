const { execSync } = require('child_process');

try {
  const branchName = 'bolt-compute-flops-opt';
  const remoteUrl = `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/mohanpednekar/tens.git`;
  execSync(`git push -u ${remoteUrl} ${branchName}`, { stdio: 'inherit' });

  console.log('Successfully pushed branch:', branchName);
} catch (e) {
  console.error('Failed to push:', e.message);
  process.exit(1);
}
