import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  bashSyntaxError,
  extractRunBlocks,
  lintWorkflowDir,
  sanitizeExpressions,
} from './lint-workflow-shell.mjs';

const SAMPLE = `name: CI
on:
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - name: Run tests
        run: |
          echo "hello"
          yarn test
      - name: Inline
        run: yarn build
`;

describe('extractRunBlocks', () => {
  it('extracts a block scalar and an inline run value with line numbers', () => {
    const blocks = extractRunBlocks(SAMPLE);
    expect(blocks).toHaveLength(2);
    expect(blocks[0].line).toBe(10);
    expect(blocks[0].script).toBe('echo "hello"\nyarn test');
    expect(blocks[1]).toEqual({ line: 14, script: 'yarn build' });
  });

  it('supports folded scalars and chomping indicators', () => {
    const text = `steps:\n  - run: >-\n      echo one\n      echo two\n`;
    expect(extractRunBlocks(text)[0].script.trim()).toBe('echo one\necho two');
  });

  it('skips a bare run: mapping (defaults.run.shell)', () => {
    const text = `defaults:\n  run:\n    shell: bash\n`;
    expect(extractRunBlocks(text)).toHaveLength(0);
  });

  it('does not treat a run: inside a block scalar as a new key', () => {
    const text = `steps:\n  - run: |\n      cat <<'EOF'\n      run: not-a-key\n      EOF\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script).toContain('run: not-a-key');
  });

  it('stops a block at the next same-or-shallower-indent key', () => {
    const text = `steps:\n  - run: |\n      echo hi\n    env:\n      X: 1\n  - run: echo bye\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(2);
    expect(blocks[0].script).toBe('echo hi');
    expect(blocks[1].script).toBe('echo bye');
  });
});

describe('sanitizeExpressions', () => {
  it('replaces ${{ }} expressions so bash -n does not see bad substitution', () => {
    expect(sanitizeExpressions('echo ${{ github.sha }}')).toBe('echo GH_EXPR');
    expect(sanitizeExpressions('a\n${{\n  multiline\n}}\nb')).toBe('a\nGH_EXPR\nb');
  });
});

describe('bashSyntaxError', () => {
  it('returns null for valid bash', () => {
    expect(bashSyntaxError('echo hi\nif true; then\n  echo yes\nfi\n')).toBeNull();
  });

  it('flags an unclosed brace (the #709 failure shape)', () => {
    expect(bashSyntaxError('{ echo "a<<EOF"\n  echo x\n  echo "EOF"')).toMatch(
      /syntax error|unexpected end of file/,
    );
  });

  it('flags an unterminated if', () => {
    expect(bashSyntaxError('if true; then\n  echo hi\n')).not.toBeNull();
  });
});

describe('lintWorkflowDir', () => {
  function withTempDir(fn) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wf-lint-'));
    try {
      return fn(dir);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }

  it('reports the file and run-key line of a broken block', () => {
    withTempDir((dir) => {
      fs.writeFileSync(
        path.join(dir, 'bad.yml'),
        `jobs:\n  t:\n    steps:\n      - run: |\n          if true; then\n            echo hi\n`,
      );
      fs.writeFileSync(path.join(dir, 'good.yml'), SAMPLE);
      const { failures } = lintWorkflowDir(dir);
      expect(failures).toHaveLength(1);
      expect(failures[0].file).toBe('bad.yml');
      expect(failures[0].line).toBe(4);
    });
  });

  it('passes on the repo\'s real .github/workflows directory', () => {
    const { files, blocks, failures } = lintWorkflowDir('.github/workflows');
    expect(files).toBeGreaterThan(0);
    expect(blocks).toBeGreaterThan(0);
    expect(failures).toEqual([]);
  });
});
