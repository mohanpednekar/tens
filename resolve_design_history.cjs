const fs = require('fs');
let content = fs.readFileSync('docs/DESIGN_HISTORY.md', 'utf8');

const regex = /<<<<<<< HEAD\n([\s\S]*?)=======\n([\s\S]*?)>>>>>>> origin\/main\n/g;

content = content.replace(regex, '$1$2');

fs.writeFileSync('docs/DESIGN_HISTORY.md', content);
