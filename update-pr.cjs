const { execSync } = require('child_process');

function run(cmd) {
  console.log(`Running: ${cmd}`);
  try {
    const out = execSync(cmd, { stdio: 'pipe' }).toString();
    console.log(out);
    return true;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(err.stdout ? err.stdout.toString() : '');
    console.error(err.stderr ? err.stderr.toString() : '');
    return false;
  }
}

const branch = process.argv[2];
if (!branch) {
  console.error("No branch provided");
  process.exit(1);
}

run(`git checkout ${branch}`);
const success = run(`git merge origin/main --no-edit`);
if (success) {
  run(`git push https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/mohanpednekar/tens.git ${branch}`);
} else {
  run(`git merge --abort`);
  console.log(`Failed to merge origin/main into ${branch}`);
  process.exit(1);
}

