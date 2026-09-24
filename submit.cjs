const { execSync } = require('child_process');

try {
  // Push branch
  const remoteUrl = `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/mohanpednekar/tens.git`;
  execSync(`git push ${remoteUrl} sentinel-remove-unsafe-inline-csp --force`);

  console.log('Successfully pushed branch.');
} catch (error) {
  console.error('Error during git operations:', error.message);
  if (error.stdout) console.error('stdout:', error.stdout.toString());
  if (error.stderr) console.error('stderr:', error.stderr.toString());
  process.exit(1);
}
