const { execSync } = require('child_process');

try {
  const token = process.env.GITHUB_TOKEN;
  execSync(`git push https://x-access-token:${token}@github.com/mohanpednekar/tens.git claude/pool-bandwidth-layout-4qpeci`, { stdio: 'inherit' });
  console.log('Successfully pushed to claude/pool-bandwidth-layout-4qpeci');
} catch (error) {
  console.error('Error pushing:', error.message);
  process.exit(1);
}
