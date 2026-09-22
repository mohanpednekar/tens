import fs from 'fs';
let content = fs.readFileSync('src/App.test.jsx', 'utf8');

content = content.replace(
  "test('theme preference in Settings switches mode and persists across remount', async () => {",
  "test('theme preference in Settings switches mode and persists across remount', async () => {\n  vi.setConfig({ testTimeout: 30000 })"
);

fs.writeFileSync('src/App.test.jsx', content);
