const { execSync } = require('child_process');

try {
  // Commit the changes
  execSync('git add src/components/DataLakePanel/index.jsx .Jules/palette.md', { stdio: 'inherit' });
  execSync('git commit -m "🎨 Palette: Fix Data Lake Auto-buy button accessibility" -m "Adds \`aria-pressed\` to correctly indicate toggle state to screen readers, and simplifies the \`aria-label\` to be static since \`aria-pressed\` conveys the state."', { stdio: 'inherit' });

  // Push to remote using the provided token
  execSync(`git push https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git jules-4386911919178572317-d26b889f`, { stdio: 'inherit' });

  console.log("Successfully pushed changes.");
} catch (error) {
  console.error("Error during submission:", error.message);
}
