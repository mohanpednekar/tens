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
 * Extraction uses the `yaml` package's real parser, so every scalar style
 * (block `|`/`>` with chomping/indentation indicators, plain, single/double
 * quoted, flow mappings/sequences) resolves to exactly the string Actions
 * receives. Only a scalar `run` value of an item in a `steps:` sequence is
 * linted — `defaults.run.shell` (a mapping) and look-alike keys under `with:`/
 * `env:` or inside other scalars are never mistaken for scripts. `${{ ... }}`
 * GitHub expressions are replaced with a placeholder before parsing — Actions
 * substitutes them at runtime; they are not bash and would otherwise read as a
 * `bad substitution` syntax error. A file that isn't valid YAML is reported as
 * a failure rather than skipped.
 *
 * Known approximation: every `run:` is assumed bash — true for this repo today
 * (the only `shell:` keys anywhere set `shell: bash`); a future
 * `shell: python`/`pwsh` step would need an exemption.
 *
 * Usage: yarn lint:workflows
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { isAlias, isMap, isScalar, isSeq, LineCounter, parseDocument, visit } from 'yaml';

const EXPR_PLACEHOLDER = 'GH_EXPR';
const STEP_LIST_KEYS = new Set(['steps', 'parallel']);

/**
 * Extract every step `run:` script from a workflow/action file's text.
 * @param {string} yamlText
 * @returns {{line: number, script: string, inline?: true}[]} line = 1-based
 *   line of the `run:` key; `inline` marks a non-block (plain/quoted) value,
 *   whose script line 1 sits on the key line itself.
 * @throws {Error} when the text isn't valid YAML
 */
export function extractRunBlocks(yamlText) {
  const lineCounter = new LineCounter();
  const doc = parseDocument(yamlText, { lineCounter, prettyErrors: false });
  if (doc.errors.length > 0) throw doc.errors[0];
  const blocks = [];
  visit(doc, {
    Pair(_, pair) {
      // `steps:` and the `parallel:` step groups nested inside them both hold ordinary steps.
      if (!isScalar(pair.key) || !STEP_LIST_KEYS.has(pair.key.value) || !isSeq(pair.value)) return;
      for (const step of pair.value.items) {
        if (!isMap(step)) continue;
        const keyOf = (p) => (isAlias(p.key) ? p.key.resolve(doc) : p.key);
        const run = step.items.find((p) => {
          const key = keyOf(p);
          return isScalar(key) && key.value === 'run';
        });
        if (!run) continue;
        // `run: *cmd` reuses an anchored scalar — lint the value Actions resolves it to.
        const value = isAlias(run.value) ? run.value.resolve(doc) : run.value;
        if (!isScalar(value) || typeof value.value !== 'string') continue;
        const block = {
          line: lineCounter.linePos(run.key.range[0]).line,
          script: value.value,
        };
        if (value.type !== 'BLOCK_LITERAL' && value.type !== 'BLOCK_FOLDED') {
          block.inline = true;
        }
        blocks.push(block);
      }
    },
  });
  return blocks.sort((a, b) => a.line - b.line);
}

/**
 * Replace `${{ ... }}` GitHub expressions with a bash-safe placeholder.
 * Hand-scanned rather than regex (a nested alternation trips ReDoS lint):
 * expression bodies may contain `}}` inside single-quoted string literals
 * (e.g. `${{ '}}' }}`), and `''` is an escaped quote. An unterminated `${{` is
 * left verbatim so `bash -n` flags it rather than silently passing.
 */
export function sanitizeExpressions(script) {
  let out = '';
  let i = 0;
  while (i < script.length) {
    if (!script.startsWith('${{', i)) {
      out += script[i++];
      continue;
    }
    let j = i + 3;
    let inStr = false;
    let closed = false;
    while (j < script.length) {
      const c = script[j];
      if (inStr) {
        if (c === "'" && script[j + 1] === "'") {
          j += 2;
          continue;
        }
        if (c === "'") inStr = false;
        j++;
        continue;
      }
      if (c === "'") {
        inStr = true;
        j++;
        continue;
      }
      if (c === '}' && script[j + 1] === '}') {
        j += 2;
        closed = true;
        break;
      }
      j++;
    }
    out += closed ? EXPR_PLACEHOLDER : script.slice(i, j);
    i = j;
  }
  return out;
}

/**
 * @param {string} script
 * @returns {string|null} bash's stderr on a syntax failure, null when it parses
 */
export function bashSyntaxError(script) {
  // Parsed with bash's default options only. A script that enables
  // parse-affecting options itself (`shopt -s extglob`) is rejected rather than
  // emulated: `bash -n` runs nothing, so guessing which `shopt` lines execute
  // could mask a real parse error, while a false failure here is loud and easy
  // to fix (e.g. move extglob-dependent code into a checked-in script file).
  const res = spawnSync('bash', ['-n'], {
    input: sanitizeExpressions(script),
    encoding: 'utf8',
  });
  if (res.error) return String(res.error.message || res.error).trim();
  const stderr = String(res.stderr || '').trim();
  // a 0 exit with stderr output is bash warning about a construct Actions will
  // still run — just not the way it reads. An unterminated heredoc swallows
  // the rest of the block as input and `bash -n` only warns, so treat
  // warning output as a failure rather than a pass.
  if (res.status !== 0 || stderr !== '') {
    return stderr || `bash -n exited with status ${res.status}`;
  }
  return null;
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
    let extracted;
    try {
      extracted = extractRunBlocks(text);
    } catch (err) {
      failures.push({
        file,
        line: err.linePos?.[0]?.line ?? 1,
        error: `invalid YAML: ${err.message}`,
      });
      continue;
    }
    for (const block of extracted) {
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
