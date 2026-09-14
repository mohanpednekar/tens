const { execSync } = require('child_process');

try {
  console.log("Running isolated test...");
  execSync('yarn test src/App.test.jsx', { stdio: 'inherit' });
} catch (e) {
  console.error("Failed:", e.message);
}
