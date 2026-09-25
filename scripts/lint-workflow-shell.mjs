/**
 * `bash -n` lint for the shell scripts embedded in .github/workflows/*.yml and
 * .github/actions/** — i.e. every step `run:` block (#738).
 *
 * Motivation: a `run:` block with broken bash (e.g. #709's dropped `}` closer,
 * which silently took every scheduled autonomous-maintenance.yml run down for two
 * days) merges green today — nothing executes or parses it until the workflow's
 * next real trigger. This script extracts every `run:` script and runs `bash -n`
 * on it, so a broken block fails CI on the PR that introduces it.
 *
 * Extraction is indentation-based (no YAML dependency). It understands the two
 * scalar shapes that can contain — or masquerade as — a script:
 *  - `run:` followed by a block-scalar header (`|`/`>` with optional chomping
 *    `+`/`-` and indentation `1-9` indicators) owns every following line indented
 *    deeper than the `run` key column;
 *  - `run:` with an inline value is a one-line script.
 * A bare `run:` (a mapping, e.g. `defaults.run.shell`) is skipped, and lines that
 * live inside *other* scalars — `prompt: |`/`body: >` block scalars, or the
 * deeper-indented continuation lines of any plain `key: value` — are never
 * mistaken for `run:` keys, so embedded example YAML/prose can't false-positive.
 * `${{ ... }}` GitHub expressions are replaced with a placeholder before parsing
 * — Actions substitutes them at runtime; they are not bash and would otherwise
 * read as a `bad substitution` syntax error.
 *
 * Assumes every `run:` is bash — true for this repo today (the only `shell:` keys
 * anywhere set `shell: bash`). A future `shell: python`/`pwsh` step would need an
 * exemption added here.
 *
 * Usage: yarn lint:workflows
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// `run:` as a YAML key — plain (`        run: |`) or as a step's first key
// (`      - run: |`). The key column is where `run` itself starts; a block
// scalar's content is everything indented strictly deeper than that (verified
// against PyYAML: content at exactly the key column is a scanner error).
const RUN_KEY_RE = /^(\s*)(-[ \t]+)?run:[ \t]*(.*)$/;
// Any other `key:` opening a block scalar (`prompt: |`, `body: >-`, ...) — its
// content must be skipped so a `run:`-looking line inside it is never linted.
const BLOCK_KEY_RE = /^(\s*)(-[ \t]+)?[A-Za-z_][\w.-]*:[ \t]*[|>][0-9+-]*\s*(#.*)?$/;
// Any `key:` with a non-empty plain value — deeper-indented following lines are
// folded continuations of that value, not new keys.
const PLAIN_KEY_RE = /^(\s*)(-[ \t]+)?[A-Za-z_][\w.-]*:[ \t]*\S/;
// A `- scalar` sequence entry that isn't a `key:` line — same continuation rule.
const DASH_SCALAR_RE = /^(\s*)-[ \t]+\S/;
// Block-scalar header: `|` or `>`, optional chomping (`-`/`+`) and a single
// explicit-indent digit, in either order (`|2-` and `|-2` are both valid).
const BLOCK_HEADER_RE = /^[|>]([+-]*)(\d?)([+-]*)$/;
const GH_EXPR_RE = /\$\{\{[\s\S]*?\}\}/g;
const EXPR_PLACEHOLDER = 'GH_EXPR';

function indentOf(line) {
  return line.length - line.trimStart().length;
}

function keyColumn(m) {
  return m[1].length + (m[2] ? m[2].length : 0);
}

/**
 * Extract every `run:` script from a workflow/action file's text.
 * @param {string} yamlText
 * @returns {{line: number, script: string}[]} line = 1-based line of the `run:` key
 */
export function extractRunBlocks(yamlText) {
  const lines = yamlText.split(/\r?\n/);
  const blocks = [];
  // Lines indented deeper than `skipBelow` belong to a scalar that isn't a run
  // script (another key's block scalar, or a plain value's folded continuation)
  // and are never scanned for keys. -1 = not inside such a scalar.
  let skipBelow = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    const indent = indentOf(line);
    if (skipBelow >= 0) {
      if (indent > skipBelow) continue;
      skipBelow = -1;
    }
    const m = RUN_KEY_RE.exec(line);
    if (m) {
      const keyIndent = keyColumn(m);
      const rest = m[3].trim();
      if (rest === '') continue; // mapping value (e.g. defaults.run.shell), not a script
      const header = BLOCK_HEADER_RE.exec(rest.split(/\s/)[0]);
      if (header) {
        const raw = [];
        let j = i + 1;
        for (; j < lines.length; j++) {
          const l = lines[j];
          if (l.trim() === '') {
            raw.push('');
            continue;
          }
          if (indentOf(l) > keyIndent) raw.push(l);
          else break;
        }
        const explicit = header[2] === '' ? null : keyIndent + Number(header[2]);
        const first = raw.find((l) => l.trim() !== '');
        const base =
          explicit ?? (first === undefined ? keyIndent + 1 : indentOf(first));
        blocks.push({
          line: i + 1,
          script: raw.map((l) => (l.trim() === '' ? '' : l.slice(base))).join('\n'),
        });
        i = j - 1;
      } else {
        blocks.push({ line: i + 1, script: rest });
        skipBelow = keyIndent; // deeper lines are continuations of the inline value
      }
      continue;
    }
    const blockKey = BLOCK_KEY_RE.exec(line);
    if (blockKey) {
      skipBelow = keyColumn(blockKey);
      continue;
    }
    const plainKey = PLAIN_KEY_RE.exec(line);
    if (plainKey) {
      skipBelow = keyColumn(plainKey);
      continue;
    }
    const dashScalar = DASH_SCALAR_RE.exec(line);
    if (dashScalar) skipBelow = dashScalar[1].length;
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
 * @param {string[]} paths yaml files to lint
 * @returns {{files: number, blocks: number, failures: {file: string, line: number, error: string}[]}}
 */
export function lintFiles(paths) {
  const failures = [];
  let blocks = 0;
  for (const file of paths) {
    const text = fs.readFileSync(file, 'utf8');
    for (const block of extractRunBlocks(text)) {
      blocks++;
      if (block.script.trim() === '') {
        failures.push({
          file,
          line: block.line,
          error: 'extracted an empty run: script — block indentation may be malformed',
        });
        continue;
      }
      const error = bashSyntaxError(block.script);
      if (error !== null) {
        // bash's `line N` is relative to the extracted script; script line 1 sits
        // on file line `block.line + 1`, so map it back for the reader.
        const mapped = error.replace(/line (\d+)/g, (_, n) => `line ${n} (file line ~${block.line + Number(n)})`);
        failures.push({ file, line: block.line, error: mapped });
      }
    }
  }
  return { files: paths.length, blocks, failures };
}

/** All `*.yml`/`*.yaml` files in a dir, optionally recursing (sorted). */
export function collectYamlFiles(dir, { recursive = false } = {}) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (recursive) out.push(...collectYamlFiles(p, { recursive }));
    } else if (/\.ya?ml$/.test(name)) {
      out.push(p);
    }
  }
  return out.sort();
}

/** Every file this lint covers: workflows + composite actions. */
export function defaultLintPaths(root = '.github') {
  const paths = collectYamlFiles(path.join(root, 'workflows'));
  const actionsDir = path.join(root, 'actions');
  if (fs.existsSync(actionsDir)) {
    paths.push(...collectYamlFiles(actionsDir, { recursive: true }));
  }
  return paths;
}

function isMainModule() {
  const thisFile = path.resolve(fileURLToPath(import.meta.url));
  const invoked = process.argv[1] && path.resolve(process.argv[1]);
  return invoked === thisFile;
}

function main() {
  const { files, blocks, failures } = lintFiles(defaultLintPaths());
  if (failures.length === 0) {
    console.log(
      `lint-workflow-shell: ${blocks} run block(s) across ${files} file(s) all parse (bash -n)`,
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
