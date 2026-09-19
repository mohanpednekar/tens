const { execSync } = require('child_process');
execSync(`git pull origin main`, { stdio: 'inherit' });
