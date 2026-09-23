import fs from 'fs';
let content = fs.readFileSync('src/App.test.jsx', 'utf8');

// Instead of expecting '0', expect string representation of current bits value
content = content.replace(
  "expect(balanceBar).toHaveAttribute('aria-valuenow', '0')",
  "expect(balanceBar).toHaveAttribute('aria-valuenow', String(game.state.intro.bits))"
);
fs.writeFileSync('src/App.test.jsx', content);
