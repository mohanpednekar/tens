import fs from 'fs';
const text = fs.readFileSync('src/App.test.jsx', 'utf8');
const lines = text.split('\n');
console.log(lines.slice(4560, 4580).join('\n'));
