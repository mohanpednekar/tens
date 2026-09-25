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
 *    deeper than the `run` key column — `>`-folded scalars are folded (lines
 *    joined with spaces, blank-line paragraph breaks) before linting;
 *  - `run:` with an inline value is a script possibly continued by deeper-
 *    indented folded lines, which are appended before linting.
 * A bare `run:` (a mapping, e.g. `defaults.run.shell`, or `run:` with only a
 * `# comment`) is skipped, and lines that live inside *other* scalars —
 * `prompt: |`/`body: >` block scalars, or the deeper-indented continuation
 * lines of any plain `key: value` — are never mistaken for `run:` keys, so
 * embedded example YAML/prose can't false-positive. `${{ ... }}` GitHub
 * expressions are replaced with a placeholder before parsing — Actions
 * substitutes them at runtime; they are not bash and would otherwise read as a
 * `bad substitution` syntax error.
 *
 * Known approximations: every `run:` is assumed bash — true for this repo today
 * (the only `shell:` keys anywhere set `shell: bash`); a future
 * `shell: python`/`pwsh` step would need an exemption. A `run:` key nested
 * under a non-step mapping (`with.run`, `env.run`) would be linted as bash too —
 * none exist in this repo, and most such values still parse harmlessly.
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
// Any other `key:` line. If it carries a non-empty value — a block-scalar
// header (`|`, `>-`, `|2`, ...) or a plain scalar — deeper-indented following
// lines belong to that value (block content or folded continuation) and are
// skipped so a `run:`-looking line inside them is never linted. A bare `key:`
// (or `key:` with only a `# comment`) is a mapping: its children are real keys.
const ANY_KEY_RE = /^(\s*)(-[ \t]+)?[A-Za-z_][\w.-]*:[ \t]*(.*)$/;
// A `- scalar` sequence entry that isn't a `key:` line — same continuation rule.
const DASH_SCALAR_RE = /^(\s*)-[ \t]+\S/;
// Block-scalar header: `|` or `>`, optional chomping (`-`/`+`) and a single
// explicit-indent digit, in either order (`|2-` and `|-2` are both valid).
const BLOCK_HEADER_RE = /^([|>])([+-]*)(\d?)([+-]*)$/;
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
/** YAML `>`-fold: non-blank lines join with a space, blank lines split paragraphs. */
function foldScalar(lines) {
  const paragraphs = [];
  let cur = [];
  for (const l of lines) {
    if (l === '') {
      if (cur.length) paragraphs.push(cur.join(' '));
      cur = [];
    } else {
      cur.push(l);
    }
  }
  if (cur.length) paragraphs.push(cur.join(' '));
  return paragraphs.join('\n');
}

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
      // bare `run:` or `run: # comment` — a mapping (e.g. defaults.run.shell), not a script
      if (rest === '' || rest.startsWith('#')) continue;
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
        const explicit = header[3] === '' ? null : keyIndent + Number(header[3]);
        const first = raw.find((l) => l.trim() !== '');
        const base =
          explicit ?? (first === undefined ? keyIndent + 1 : indentOf(first));
        const content = raw.map((l) => (l.trim() === '' ? '' : l.slice(base)));
        blocks.push({
          line: i + 1,
          script: header[1] === '>' ? foldScalar(content) : content.join('\n'),
        });
        i = j - 1;
      } else {
        // inline scalar — deeper-indented following lines are folded
        // continuations of the value, so append them to the script.
        const cont = [];
        let j = i + 1;
        for (; j < lines.length; j++) {
          const l = lines[j];
          if (l.trim() !== '' && indentOf(l) > keyIndent) cont.push(l.trim());
          else break;
        }
        blocks.push({
          line: i + 1,
          inline: true,
          script: cont.length ? `${rest} ${cont.join(' ')}` : rest,
        });
        i = j - 1;
      }
      continue;
    }
    const km = ANY_KEY_RE.exec(line);
    if (km) {
      const val = km[3].trim();
      if (val !== '' && !val.startsWith('#')) skipBelow = keyColumn(km);
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
        // bash's `line N` is relative to the extracted script: for a block
        // scalar, script line 1 sits on file line `block.line + 1`; for an
        // inline `run:` value it sits on the key line itself.
        const offset = block.inline ? 0 : 1;
        const mapped = error.replace(
          /line (\d+)/g,
          (_, n) => `line ${n} (file line ~${block.line + Number(n) - 1 + offset})`,
        );
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
