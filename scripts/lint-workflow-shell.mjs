/**
 * `bash -n` lint for the shell scripts embedded in .github/workflows/*.yml (#738).
 *
 * Motivation: a `run:` block with broken bash (e.g. #709's dropped `}` closer,
 * which silently took every scheduled autonomous-maintenance.yml run down for two
 * days) merges green today — nothing executes or parses it until the workflow's
 * next real trigger. This script extracts every `run:` script in each workflow
 * file and runs `bash -n` on it, so a broken block fails CI on the PR that
 * introduces it.
 *
 * Extraction is indentation-based (no YAML dependency): a `run:` key followed by
 * a block-scalar header (`|`/`>` with optional +/- chomping) owns every following
 * line indented deeper than the key; a `run:` key with an inline value is checked
 * as a one-line script; a bare `run:` (a mapping, e.g. `defaults.run.shell`) is
 * skipped. `${{ ... }}` GitHub expressions are replaced with a placeholder before
 * parsing — Actions substitutes them at runtime; they are not bash and would
 * otherwise read as a `bad substitution` syntax error.
 *
 * Usage: yarn lint:workflows   (or: node scripts/lint-workflow-shell.mjs [dir])
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Matches `run:` as a YAML key — plain (`        run: |`) or as a step's first
// key (`      - run: |`). keyIndent is the column where `run` itself starts;
// block-scalar content is everything indented deeper than that.
const RUN_KEY_RE = /^(\s*)(-[ \t]+)?run:[ \t]*(.*)$/;
const BLOCK_SCALAR_RE = /^[|>][+-]?(\s|$)/;
const GH_EXPR_RE = /\$\{\{[\s\S]*?\}\}/g;
const EXPR_PLACEHOLDER = 'GH_EXPR';

/**
 * Extract every `run:` script from a workflow file's text.
 * @param {string} yamlText
 * @returns {{line: number, script: string}[]} line = 1-based line of the `run:` key
 */
export function extractRunBlocks(yamlText) {
  const lines = yamlText.split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const m = RUN_KEY_RE.exec(lines[i]);
    if (!m) continue;
    const keyIndent = m[1].length + (m[2] ? m[2].length : 0);
    const rest = m[3].trim();
    if (rest === '') continue; // mapping value (e.g. defaults.run.shell), not a script
    if (BLOCK_SCALAR_RE.test(rest)) {
      const raw = [];
      let j = i + 1;
      for (; j < lines.length; j++) {
        const line = lines[j];
        if (line.trim() === '') {
          raw.push('');
          continue;
        }
        if (line.length - line.trimStart().length > keyIndent) raw.push(line);
        else break;
      }
      const first = raw.find((l) => l.trim() !== '');
      const base = first === undefined ? keyIndent + 1 : first.length - first.trimStart().length;
      blocks.push({
        line: i + 1,
        script: raw.map((l) => (l.trim() === '' ? '' : l.slice(base))).join('\n'),
      });
      i = j - 1;
    } else {
      blocks.push({ line: i + 1, script: rest });
    }
  }
  return blocks;
}

/** Replace `${{ ... }}` GitHub expressions with a bash-safe placeholder. */
export function sanitizeExpressions(script) {
  return script.replace(GH_EXPR_RE, EXPR_PLACEHOLDER);
}

/**
 * @param {string} script
 * @returns {string|null} bash's stderr on a syntax failure, null when it parses
 */
export function bashSyntaxError(script) {
  try {
    execFileSync('bash', ['-n'], { input: sanitizeExpressions(script), encoding: 'utf8' });
    return null;
  } catch (err) {
    return String(err.stderr || err.message).trim();
  }
}

/**
 * @param {string} dir directory of workflow files (default .github/workflows)
 * @returns {{files: number, blocks: number, failures: {file: string, line: number, error: string}[]}}
 */
export function lintWorkflowDir(dir) {
  const names = fs
    .readdirSync(dir)
    .filter((f) => /\.ya?ml$/.test(f))
    .sort();
  const failures = [];
  let blocks = 0;
  for (const name of names) {
    const text = fs.readFileSync(path.join(dir, name), 'utf8');
    for (const block of extractRunBlocks(text)) {
      blocks++;
      const error = bashSyntaxError(block.script);
      if (error !== null) failures.push({ file: name, line: block.line, error });
    }
  }
  return { files: names.length, blocks, failures };
}

function isMainModule() {
  const thisFile = path.resolve(fileURLToPath(import.meta.url));
  const invoked = process.argv[1] && path.resolve(process.argv[1]);
  return invoked === thisFile;
}

function main() {
  const dir = process.argv[2] ?? '.github/workflows';
  const { files, blocks, failures } = lintWorkflowDir(dir);
  if (failures.length === 0) {
    console.log(
      `lint-workflow-shell: ${blocks} run block(s) across ${files} workflow file(s) all parse (bash -n)`,
    );
    process.exitCode = 0;
    return;
  }
  for (const f of failures) {
    console.error(`lint-workflow-shell: ${f.file}:${f.line} — bash -n failed:\n${f.error}\n`);
  }
  console.error(`lint-workflow-shell: ${failures.length} run block(s) failed bash -n`);
  process.exitCode = 1;
}

if (isMainModule()) {
  main();
}
