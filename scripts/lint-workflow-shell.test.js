import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  bashSyntaxError,
  collectYamlFiles,
  defaultLintPaths,
  extractRunBlocks,
  lintFiles,
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
    expect(blocks[1]).toEqual({ line: 14, inline: true, script: 'yarn build' });
  });

  it('supports folded scalars and chomping indicators', () => {
    // `>` folds same-indent lines together with spaces — linting them
    // newline-separated would pass scripts that are broken once folded.
    const text = `steps:\n  - run: >-\n      if true; then\n      echo one\n      fi\n`;
    const script = extractRunBlocks(text)[0].script;
    expect(script).toBe('if true; then echo one fi');
    // the folded value is broken bash (`fi` reads as an echo argument) — the
    // lint must see it that way too, not pass the line-wise version.
    expect(bashSyntaxError(script)).not.toBeNull();
  });

  it('keeps more-indented lines literal inside a folded scalar', () => {
    // YAML preserves newlines around lines deeper than the block's base
    // indent — folding them flat would false-fail valid bash.
    const text = `steps:\n  - run: >\n      if true; then\n        echo one\n      fi\n`;
    const script = extractRunBlocks(text)[0].script;
    expect(script).toBe('if true; then\n  echo one\nfi');
    expect(bashSyntaxError(script)).toBeNull();
  });

  it('emits two newlines for a blank line followed by a more-indented line', () => {
    // PyYAML: 'echo start\\\n\n  && echo y' — the paragraph break AND the
    // literal-line boundary are both real newlines; collapsing them lets a
    // backslash escape swallow the `&&` line (silent false-pass).
    const text = `steps:\n  - run: >\n      echo start\\\n\n        && echo y\n`;
    const script = extractRunBlocks(text)[0].script;
    expect(script).toBe('echo start\\\n\n  && echo y');
    expect(bashSyntaxError(script)).not.toBeNull();
  });

  it('supports an explicit indentation indicator (run: |2)', () => {
    const text = `steps:\n  - run: |2\n        echo hi\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script.trim()).toBe('echo hi');
  });

  it('accepts whitespace before the colon (run : is valid YAML)', () => {
    // GitHub Actions parses `run :` as the run key — a mundane typo that must
    // not silently bypass the lint.
    const text = `steps:\n  - run : |\n      echo hi\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script.trim()).toBe('echo hi');
  });

  it('handles CRLF line endings', () => {
    const text = 'steps:\r\n  - run: |\r\n      echo hi\r\n';
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script.trim()).toBe('echo hi');
  });

  it('skips a bare run: mapping (defaults.run.shell)', () => {
    const text = `defaults:\n  run:\n    shell: bash\n`;
    expect(extractRunBlocks(text)).toHaveLength(0);
  });

  it('lints a next-line plain scalar as a bare run: value', () => {
    // `run:` ⏎ `        echo a &&` is valid YAML — the value is the folded
    // scalar, not null (verified vs PyYAML).
    const text = `steps:\n  - run:\n        echo a &&\n        echo b\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script).toBe('echo a && echo b');
    expect(bashSyntaxError(blocks[0].script)).toBeNull();
  });

  it('joins an inline paragraph break with a bare newline, not a space', () => {
    // real value: 'echo a\\\necho b' (backslash-newline continuation, valid);
    // inserting a space makes `fi`-style fragments falsely broken.
    const text = `steps:\n  - run: echo a\\\n\n        echo b\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script).toBe('echo a\\\necho b');
    expect(bashSyntaxError(blocks[0].script)).toBeNull();
  });

  it('extracts quoted run keys ("run": |)', () => {
    const text = `steps:\n  - "run": |\n      echo hi\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script.trim()).toBe('echo hi');
  });

  it('extracts run values from flow-style step mappings', () => {
    const ok = extractRunBlocks(`steps:\n  - {name: x, run: echo hi}\n`);
    expect(ok).toHaveLength(1);
    expect(ok[0].script).toBe('echo hi');
    const broken = extractRunBlocks(`steps:\n  - {name: x, run: if true; then}\n`);
    expect(bashSyntaxError(broken[0].script)).not.toBeNull();
  });

  it('unquotes quoted run: values so bash -n sees the real script', () => {
    // a quoted value lints as one opaque word otherwise — silent false-pass.
    expect(extractRunBlocks(`steps:\n  - run: 'echo hi'\n`)[0].script).toBe('echo hi');
    const broken = extractRunBlocks(`steps:\n  - run: "echo 'unterminated"\n`)[0];
    expect(bashSyntaxError(broken.script)).not.toBeNull();
    // multi-line double-quoted scalar — continuations fold inside the quotes.
    const multi = extractRunBlocks(`steps:\n  - run: "echo a\n        echo b"\n`)[0];
    expect(multi.script).toBe('echo a echo b');
  });

  it('decodes hex/unicode escapes inside double-quoted run values', () => {
    // `\\x3b` resolves to `;` — linting the raw text would pass `echo hix3b`
    // while the real value `echo hi; then` is broken bash.
    const block = extractRunBlocks(`steps:\n  - run: "echo hi\\x3b then"\n`)[0];
    expect(block.script).toBe('echo hi; then');
    expect(bashSyntaxError(block.script)).not.toBeNull();
  });

  it('does not let a trailing comment on a parent key swallow nested run: steps', () => {
    // `steps: # build` — the `#` must not read as a scalar value, or every
    // nested run: would be silently skipped as a "continuation".
    const text = `steps: # build\n  - run: |\n      echo hi\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script.trim()).toBe('echo hi');
  });

  it('appends deeper-indented continuation lines to an inline run value', () => {
    const text = `steps:\n  - run: echo a &&\n        echo b\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script).toBe('echo a && echo b');
    expect(bashSyntaxError(blocks[0].script)).toBeNull();
  });

  it('spans blank lines and skips # comment lines inside an inline continuation', () => {
    // YAML plain scalars continue across blank lines and `#` lines are
    // comments, never content — gluing them in would corrupt the linted
    // script in both directions (false pass and false fail).
    const text = `steps:\n  - run: if true; then\n        # why\n\n        echo ok\n      fi\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script).not.toContain('# why');
    expect(blocks[0].script).toContain('echo ok');
    expect(blocks[0].script).toContain('fi');
    // under real YAML semantics this value folds to broken bash (`fi` reads as
    // an echo argument) — the lint must see the same broken shape, not a
    // truncated prefix that happens to parse.
    expect(bashSyntaxError(blocks[0].script)).not.toBeNull();
  });

  it('does not treat a run: inside a block scalar as a new key', () => {
    const text = `steps:\n  - run: |\n      cat <<'EOF'\n      run: not-a-key\n      EOF\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script).toContain('run: not-a-key');
  });

  it('does not lint run:-shaped text inside a non-run block scalar', () => {
    const text = `steps:\n  - uses: some/action\n    with:\n      prompt: |\n        example:\n          run: |\n            this is prose not bash(((\n  - run: |\n      echo real\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script.trim()).toBe('echo real');
  });

  it('does not lint run:-shaped continuation lines of a plain scalar', () => {
    const text = `steps:\n  - name: a title that wraps\n      run: still-the-name-value\n    run: |\n      echo real\n`;
    const blocks = extractRunBlocks(text);
    expect(blocks).toHaveLength(1);
    expect(blocks[0].script.trim()).toBe('echo real');
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

  it('does not truncate expressions containing }} inside a string literal', () => {
    // `${{ '}}' }}` — the first `}}` is inside the expression's own string
    // literal; stopping there leaves a dangling quote that false-fails bash -n.
    expect(sanitizeExpressions("echo '${{ '}}' }}'")).toBe("echo 'GH_EXPR'");
    expect(bashSyntaxError(sanitizeExpressions("echo '${{ '}}' }}'"))).toBeNull();
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

describe('lintFiles', () => {
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
      const bad = path.join(dir, 'bad.yml');
      const good = path.join(dir, 'good.yml');
      fs.writeFileSync(
        bad,
        `jobs:\n  t:\n    steps:\n      - run: |\n          if true; then\n            echo hi\n`,
      );
      fs.writeFileSync(good, SAMPLE);
      const { failures } = lintFiles([bad, good]);
      expect(failures).toHaveLength(1);
      expect(failures[0].file).toBe(bad);
      expect(failures[0].line).toBe(4);
      // bash's extracted-script line is mapped back to the file's line numbering:
      // run key at file line 4, 2-line script, bash reports EOF at script line 3
      // → file line ~7.
      expect(failures[0].error).toMatch(/file line ~7/);
    });
  });

  it('flags an extracted empty run: block rather than silently passing', () => {
    withTempDir((dir) => {
      const empty = path.join(dir, 'empty.yml');
      fs.writeFileSync(empty, `steps:\n  - run: |\n`);
      fs.writeFileSync(path.join(dir, 'good.yml'), SAMPLE);
      const { failures } = lintFiles(collectYamlFiles(dir));
      expect(failures).toHaveLength(1);
      expect(failures[0].file).toBe(empty);
      expect(failures[0].error).toMatch(/empty run: script/);
    });
  });

  it('collectYamlFiles recurses composite-action directories', () => {
    withTempDir((dir) => {
      fs.mkdirSync(path.join(dir, 'setup'), { recursive: true });
      fs.writeFileSync(path.join(dir, 'top.yml'), SAMPLE);
      fs.writeFileSync(path.join(dir, 'setup', 'action.yml'), SAMPLE);
      expect(collectYamlFiles(dir, { recursive: true })).toHaveLength(2);
      expect(collectYamlFiles(dir)).toHaveLength(1);
    });
  });
});

describe('real repository lint', () => {
  it('discovers workflow + composite-action files and finds no broken blocks', () => {
    const paths = defaultLintPaths();
    expect(paths.some((p) => p.includes('workflows'))).toBe(true);
    expect(paths.some((p) => p.includes(path.join('actions', 'setup-node-yarn')))).toBe(true);
    const { blocks, failures } = lintFiles(paths);
    // A floor, not an exact count — a regression that silently drops blocks
    // fails loudly, while new legit run: blocks don't require a test bump.
    expect(blocks).toBeGreaterThanOrEqual(34);
    expect(failures).toEqual([]);
  });
});
