const fs = require('fs');
let content = fs.readFileSync('CLAUDE.md', 'utf-8');

const search = `<<<<<<< HEAD
- \`yarn test\` is green (2005 tests). The four core test files (\`engine.test.js\`, \`layers.test.js\`,
=======
- \`yarn test\` is green (2016 tests). The four core test files (\`engine.test.js\`, \`layers.test.js\`,
>>>>>>> main`;

const replace = `- \`yarn test\` is green (2016 tests). The four core test files (\`engine.test.js\`, \`layers.test.js\`,`;

content = content.replace(search, replace);
fs.writeFileSync('CLAUDE.md', content);
