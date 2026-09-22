const { execSync } = require('child_process');
try {
  const token = process.env.GITHUB_TOKEN;
  execSync(`git push https://x-access-token:${token}@github.com/mohanpednekar/tens.git claude/auto-storage-coverage-gaps`);
  console.log('Push successful');
} catch (e) {
  console.error('Push failed', e.stdout?.toString(), e.stderr?.toString());
}
