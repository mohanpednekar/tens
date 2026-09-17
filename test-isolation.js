const { execSync } = require('child_process');

try {
  console.log("Running isolated test...");
  execSync('yarn test src/App.test.jsx -t "the Clock Speed panel\'s Lv./bonus line is collapsed until the heading is clicked, and clicking the revealed line collapses it again"', { stdio: 'inherit' });
} catch (e) {
  console.error("Failed:", e.message);
}
