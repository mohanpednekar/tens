const { execSync } = require('child_process');

try {
  // Commit changes
  execSync('git config user.name "Jules"', { stdio: 'inherit' });
  execSync('git config user.email "jules@example.com"', { stdio: 'inherit' });
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "🛡️ Sentinel: [MEDIUM] Fix prototype pollution vector in typeof validation"', { stdio: 'inherit' });

  // Get current branch
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

  // Push branch
  const remoteUrl = execSync('git remote get-url origin').toString().trim();
  const pushUrl = remoteUrl.replace('https://', `https://x-access-token:${process.env.GITHUB_TOKEN}@`);
  execSync(`git push ${pushUrl} ${branch}`, { stdio: 'inherit' });

  console.log('Successfully pushed branch.');
} catch (error) {
  console.error('Failed to submit:', error.message);
  process.exit(1);
}
