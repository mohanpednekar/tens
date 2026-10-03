const { execSync } = require('child_process');

try {
  // Commit changes
  execSync('git add -A', { stdio: 'inherit' });
  execSync('git commit -m "🎨 Palette: Data Lake Auto-buy accessibility"', { stdio: 'inherit' });

  // Get current branch
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

  // Get repository from remote
  const remoteUrl = execSync('git remote get-url origin').toString().trim();
  const repoMatch = remoteUrl.match(/github\.com[/:](.+?)\.git$/);
  
  if (!repoMatch) {
    throw new Error('Could not determine repository from remote URL: ' + remoteUrl);
  }
  
  const repo = repoMatch[1];
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }

  // Push branch
  console.log(`Pushing to ${branch}...`);
  const pushUrl = `https://x-access-token:${token}@github.com/${repo}.git`;
  execSync(`git push -u ${pushUrl} ${branch}`, { stdio: 'inherit' });

  // Create PR
  console.log('Creating PR...');
  
  const title = '🎨 Palette: Data Lake Auto-buy accessibility';
  const body = `💡 What: Added aria-pressed and static aria-label to the Data Lake Auto-buy action button. Also added missing &:focus-visible styling.
🎯 Why: Enhances screen reader communication and keyboard accessibility.
♿ Accessibility: Improved semantic state and focus styling for auto-conversion button.`;

  const prData = JSON.stringify({
    title: title,
    body: body,
    head: branch,
    base: 'main'
  });

  const curlCmd = `curl -s -X POST -H "Authorization: token ${token}" -H "Accept: application/vnd.github.v3+json" -d '${prData}' "https://api.github.com/repos/${repo}/pulls"`;
  
  const response = execSync(curlCmd).toString();
  const result = JSON.parse(response);

  if (result.html_url) {
    console.log(`PR created successfully: ${result.html_url}`);
  } else {
    console.error('Failed to create PR:', result);
  }

} catch (error) {
  console.error('Error during submission:', error.message);
  process.exit(1);
}
