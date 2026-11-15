import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

// cap_lines lives inline in autonomous-maintenance.yml (#81); extract and run it in bash.
const yml = readFileSync('.github/workflows/autonomous-maintenance.yml', 'utf8');
const match = yml.match(/^ *cap_lines\(\) \{\n[\s\S]*?\n {10}\}\n/m);

const run = (cap, text) =>
  execFileSync(
    'bash',
    ['-c', `set -eo pipefail\n${match[0]}\ncap_lines "$1" "$2"`, 'bash', String(cap), text],
    { encoding: 'utf8' },
  );

describe('cap_lines (autonomous-maintenance.yml feed cap)', () => {
  test('is extractable from the workflow', () => {
    expect(match).not.toBeNull();
  });

  test('empty input prints nothing', () => {
    expect(run(3, '')).toBe('');
  });

  test('under/at the cap passes through unchanged', () => {
    expect(run(3, 'a\nb\nc')).toBe('a\nb\nc\n');
  });

  test('over the cap truncates and appends a +N more note', () => {
    expect(run(2, 'a\nb\nc\nd\ne')).toBe(
      'a\nb\n- (+3 more not shown - query the tracker directly)\n',
    );
  });

  test('large feeds do not trip SIGPIPE under pipefail', () => {
    const big = Array.from({ length: 1000 }, (_, i) => `line ${i} ${'x'.repeat(100)}`).join('\n');
    const out = run(15, big);
    expect(out.split('\n')).toHaveLength(17);
    expect(out).toContain('+985 more');
  });
});
