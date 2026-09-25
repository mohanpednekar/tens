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
 * none exist in this repo, and most such values still parse harmlessly. YAML
 * anchors/tags/aliases (`key: &a`, `!!t`, `*a`) and quoted keys (`'run':`) are
 * unsupported GitHub Actions features and not handled.
 *
 * Usage: yarn lint:workflows
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// `run:` as a YAML key — plain (`        run: |`) or as a step's first key
// (`      - run: |`), including the `run :` typo shape (whitespace before the
// colon is valid YAML that GitHub accepts — verified vs PyYAML). The key column
// is where `run` itself starts; a block scalar's content is everything indented
// strictly deeper than that (content at exactly the key column is a scanner
// error).
const RUN_KEY_RE = /^(\s*)(-[ \t]+)?(?:"run"|'run'|run)[ \t]*:[ \t]*(.*)$/;
// Flow-style step entry `- { name: x, run: cmd }` — valid YAML; extract the
// inline `run:` value (plain text up to `,`/`}`, or a quoted scalar).
const FLOW_STEP_RE = /^\s*-[ \t]*\{/;
const FLOW_RUN_RE = /\brun[ \t]*:[ \t]*/;
// Any other `key:` line. If it carries a non-empty value — a block-scalar
// header (`|`, `>-`, `|2`, ...) or a plain scalar — deeper-indented following
// lines belong to that value (block content or folded continuation) and are
// skipped so a `run:`-looking line inside them is never linted. A bare `key:`
// (or `key:` with only a `# comment`) is a mapping: its children are real keys.
const ANY_KEY_RE = /^(\s*)(-[ \t]+)?[A-Za-z_][\w.-]*[ \t]*:[ \t]*(.*)$/;
// A `- scalar` sequence entry that isn't a `key:` line — same continuation rule.
const DASH_SCALAR_RE = /^(\s*)-[ \t]+\S/;
// Block-scalar header: `|` or `>`, optional chomping (`-`/`+`) and a single
// explicit-indent digit, in either order (`|2-` and `|-2` are both valid).
const BLOCK_HEADER_RE = /^([|>])([+-]*)(\d?)([+-]*)$/;
// `${{ ... }}` — the expression body is non-brace chars or a single-quoted
// string (which may itself contain `}}`, e.g. `${{ '}}' }}`); quoted parts use
// `''` escaping per Actions expression rules.
const GH_EXPR_RE = /\$\{\{(?:'(?:[^']|'')*'|[^{}])*\}\}/g;
const EXPR_PLACEHOLDER = 'GH_EXPR';

// YAML double-quoted escape set (single-quoted scalars only escape `''`).
const YAML_UNESCAPE = {
  '0': '\0', a: '\x07', b: '\b', t: '\t', n: '\n', v: '\v', f: '\f', r: '\r',
  e: '\x1b', ' ': ' ', '"': '"', "'": "'", '/': '/', '\\': '\\',
  N: '\u0085', _: ' ', L: '\u2028', P: '\u2029',
};

/**
 * Parse a YAML quoted scalar starting at s[0] (`"` or `'`). Returns the
 * unquoted value, or null when the quote never closes — left for the caller to
 * lint raw so `bash -n` flags it rather than silently passing.
 */
function parseQuotedScalar(s) {
  const q = s[0];
  let out = '';
  let i = 1;
  while (i < s.length) {
    const c = s[i];
    if (q === "'" && c === "'") {
      if (s[i + 1] === "'") {
        out += "'";
        i += 2;
        continue;
      }
      return out;
    }
    if (q === '"' && c === '\\') {
      const esc = s[i + 1];
      if (esc === 'x' || esc === 'u' || esc === 'U') {
        const len = esc === 'x' ? 2 : esc === 'u' ? 4 : 8;
        const hex = s.slice(i + 2, i + 2 + len);
        if (hex.length === len && /^[0-9a-fA-F]+$/.test(hex)) {
          out += String.fromCodePoint(parseInt(hex, 16));
          i += 2 + len;
          continue;
        }
      }
      out += YAML_UNESCAPE[esc] ?? esc;
      i += 2;
      continue;
    }
    if (q === '"' && c === '"') return out;
    out += c;
    i++;
  }
  return null;
}

/** Unquote a scalar text when it is quoted; otherwise return it unchanged. */
function unquote(text) {
  const t = text.trim();
  if (t.startsWith('"') || t.startsWith("'")) {
    return parseQuotedScalar(t) ?? t;
  }
  return text;
}

/**
 * Collect a plain/quoted scalar's folded continuation lines: deeper-indented
 * non-blank lines (blank lines span, `#` lines are YAML comments). Stops at the
 * first dedented non-blank line.
 */
function collectContinuation(lines, j, keyIndent) {
  const cont = [];
  for (; j < lines.length; j++) {
    const l = lines[j];
    const t = l.trim();
    if (t === '') {
      cont.push('');
      continue;
    }
    if (t.startsWith('#')) continue;
    if (indentOf(l) > keyIndent) cont.push(t);
    else break;
  }
  return { cont, next: j };
}

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
/**
 * YAML folded-scalar (`>`) and plain-scalar folding: same-indent lines join
 * with ' ', each blank line emits a '\n', and lines deeper than the scalar's
 * base indent (still leading-spaced after the base slice — block scalars only;
 * plain scalars fold everything) are preserved verbatim with their newlines.
 * Trailing blank runs are dropped.
 */
function foldScalar(lines) {
  let out = '';
  let prev = null; // 'text' | 'lit' | 'blank'
  for (const l of lines) {
    if (l === '') {
      out += '\n';
      prev = 'blank';
    } else if (l.startsWith(' ')) {
      // A more-indented line is literal — YAML emits a boundary newline before
      // it even after a paragraph-break newline (blank + lit = two newlines).
      if (prev === 'text' || prev === 'blank') out += '\n';
      out += `${l}\n`;
      prev = 'lit';
    } else {
      if (prev === 'text') out += ' ';
      out += l;
      prev = 'text';
    }
  }
  return out.replace(/\n+$/, '');
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
      // bare `run:` or `run: # comment` — either a mapping (defaults.run.shell,
      // whose children are key-shaped) or a next-line scalar value
      // (`run:` ⏎ `        if true; then` is valid YAML — verified vs PyYAML).
      if (rest === '' || rest.startsWith('#')) {
        const { cont, next } = collectContinuation(lines, i + 1, keyIndent);
        const first = cont.find((l) => l !== '');
        if (first !== undefined && !/^[A-Za-z_][\w.-]*[ \t]*:/.test(first)) {
          const script = unquote(foldScalar(cont));
          blocks.push({ line: i + 1, script });
          i = next - 1;
        }
        // mapping: leave children to the main loop — their own keys still scan
        continue;
      }
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
        // continuations of the value, so append them; a quoted value is then
        // unquoted so `bash -n` sees the real script, not an opaque quoted word.
        const { cont, next } = collectContinuation(lines, i + 1, keyIndent);
        const extra = foldScalar(cont);
        // a paragraph break folds to a bare newline — no space separator
        const joined =
          extra === '' ? rest : extra.startsWith('\n') ? rest + extra : `${rest} ${extra}`;
        blocks.push({ line: i + 1, inline: true, script: unquote(joined) });
        i = next - 1;
      }
      continue;
    }
    // flow-style step `- { name: x, run: cmd }` — extract the run value.
    if (FLOW_STEP_RE.test(line)) {
      const rm = FLOW_RUN_RE.exec(line);
      if (rm) {
        const after = line.slice(rm.index + rm[0].length);
        const script =
          after.startsWith('"') || after.startsWith("'")
            ? (parseQuotedScalar(after) ?? after)
            : after.split(/[,}]/)[0].trim();
        if (script !== '') blocks.push({ line: i + 1, inline: true, script });
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
