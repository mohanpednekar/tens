# Testing reference

Full detail for the unit/component suite (Vitest + jsdom) and the Playwright end-to-end suite.
`CLAUDE.md`'s "Testing" section keeps only the rules every session needs; this file is the complete
version — read it before writing or restructuring tests, or touching `e2e/` / `playwright.config.js`.

## Unit and component tests (Vitest)

- Test files live next to source: `engine.test.js`, `layers.test.js`, `storage.test.js`,
  `save-migration/index.test.js`, `navAttention.test.js`, `App.test.jsx`.
- Environment: jsdom, globals enabled (`describe`/`it`/`expect` without imports), setup file
  `src/setupTests.js` (imports `@testing-library/jest-dom/vitest`).
- Component tests use Testing Library (`render`, `screen`, `userEvent`) and query by role/label text
  rather than test IDs; `StatCard` panels carry `aria-label="<tier name> layer"` for this purpose, and
  each tier row's Buy button nests a visually-hidden `role="progressbar"` (via `VisuallyHidden`) with
  `aria-label="<tier name> cost-block progress"` plus `aria-valuenow`/`aria-valuemin`/`aria-valuemax` —
  the Buy/tickspeed-multiplier/Unlock/Prestige buttons also carry an explicit `aria-label` with the
  full descriptive sentence (independent of their compact icon-based visible text), so
  `getByRole('button', { name: … })` still matches despite the nested labeled node.
- Tests that seed `localStorage` directly must clear it in `beforeEach` (see `App.test.jsx`). Tests for
  the Reset (Settings → Danger zone) `window.confirm` guard mock it via `vi.spyOn(window, 'confirm')` and
  restore it in `afterEach`. If a test ever needs to observe behavior across real tick boundaries (none
  currently does), use `vi.useFakeTimers()` + `act(() => vi.advanceTimersByTime(TICK_RATE_MS))` **once
  per tick** (not one large jump per assertion — more than one tick fires the live `setInterval` several
  times synchronously, which React 18 batches into a single render), and **unmount the rendered
  component before calling `vi.useRealTimers()`**, not after — see `docs/DESIGN_HISTORY.md` for the real
  regression this ordering avoids.
- Where several near-identical automations/buttons exercise the same generic UI behavior (a
  pause/resume toggle beside a status badge; a purchase button disabled below its own PP cost), prefer a
  single `test.each` table over hand-copied tests — same coverage (each row reports as its own test),
  far less duplicated setup. See `App.test.jsx`'s pause-toggle and disabled-without-enough-PP tables.
- A starter set of `engine.js`'s core economy formulas (`getTierCost`, `getPrestigePointsAwarded`,
  `buyTierQuantity`'s cost-resource spend) also carry property-based tests via `fast-check`
  (devDependency), alongside — not replacing — their example-based tests: `describe('<fn>
  (property-based)', …)` blocks right after that function's example-based `describe` in
  `engine.test.js`, asserting invariants (monotonicity in level/money-exponent, resource balances never
  negative) across generated inputs. `fc.assert(fc.property(...), { numRuns: 200 })` bounds generated
  cases so this stays fast in CI.
- `yarn test` is green (run it for the current count — counts are deliberately not recorded here: every PR bumped them, so they went stale and made CLAUDE.md the top merge-conflict hot-spot). The four core test files (`engine.test.js`, `layers.test.js`,
  `storage.test.js`, `App.test.jsx`) assert against the current tier/resource id scheme (`MONEY_ID =
  'base'`, display name "Bits", symbol `b`; Bytes unit marker `BYTES_ID = 'bytes'` (no stored pool — Bits only), symbol `B`; tier ids
  `tier01`/`tier02`/… with display names `Kilobytes`/`Megabytes`/…) — don't reintroduce an older scheme
  (`'Ones'`, `'money'`, `'hundreds'`, or a purchasable Bytes tier) left behind by prior renames/removals
  (see `docs/DESIGN_HISTORY.md`). Saves must use the current schema (`resources.base`,
  `resources.bytes`, `intro.mainGameUnlocked`, tier ids `tier01`–`tier10`);
  `save-migration/adaptSaveForCurrentSchema` runs on every load; `storage.js`'s `mergeState` only fills
  in missing fields from `createInitialGameState()`. Legacy payloads with no migration step yet are
  discarded and surfaced via `IncompatibleSaveNotice`. Current saves stamp `saveSchemaVersion: 3` on
  every write (v1/v2 saves run `migrateToV3` then forward-fill via `mergeState`). `src/theme/contrast.js` (standalone WCAG utility) has `contrast.test.js`, and `tokens.contrast.test.js` audits the
  design tokens' plain text/UI color pairs for AA in both themes (`docs/THEMING_REFERENCE.md`). All other tests sit beside
  their source (`engine.computeFlops.test.js` = PP Compute screen; `capacitorConfig.test.js` = Capacitor Vite path;
  `pages/DevModePage/stateFields.test.js` = Dev Mode helpers; components, services, `save-migration/`, `scripts/*.test.js`)
  and are all picked up by Vitest's default glob (`vite.config.js`'s `test` block sets no custom `include`).

## End-to-end testing

`yarn test:e2e` (Playwright, config at `playwright.config.js`) is a separate, real-browser suite —
distinct from, and not a replacement for, `yarn test`'s Vitest/jsdom suite. It drives the actual app in
headless Chromium against a real `yarn dev` server (Playwright's `webServer` starts and waits on it;
`reuseExistingServer` is enabled outside CI so a session's already-running `yarn dev` is reused). Bound
to `127.0.0.1` (never `0.0.0.0`), matching the dev/test server convention, and targets the real `/tens/`
base path.

- **One-time setup**: `npx playwright install --with-deps chromium` (or `yarn playwright install
  chromium` if the sandbox can't install system package dependencies) — the browser binary isn't bundled
  with `@playwright/test` and isn't pre-installed on the GitHub Actions `ubuntu-latest` runner.
  Chromium-only; no cross-browser coverage needed.
- Specs live under `e2e/` (a sibling of `src/`), named `*.e2e.js` — deliberately not
  `*.test.js`/`*.spec.js`, so Vitest's default glob never picks them up; `yarn test`'s test count is
  unaffected by anything under `e2e/`.
- Specs seed `localStorage`'s `tens_game_state` key directly (via `page.evaluate`, after an initial
  `page.goto` to establish the origin, then `page.reload()`) rather than playing through the early game
  — the same convention `App.test.jsx` uses. A seeded object only needs the fields a test cares about;
  `storage.js`'s `mergeState` fills in the rest from `createInitialGameState()` — including
  `intro: { mainGameUnlocked: true }`, needed by every spec that seeds state to land directly on MainPage
  rather than the Byte Foundry intro screen.
- Current specs: `golden-path` (buy Kilobytes via the real Buy button; Owned/balance update), `autobuyer-reload`
  (an unlocked autobuyer survives a real reload), `purge` (seeding Money ≥ `PURGE_THRESHOLD`; first-time `FullScreenOverlay`), `reboot`
  (seed at 1 Googol PP → Settings Reboot → assert `era.count`, Kernels award, and the permanent
  `intro.mainGameUnlocked` latch carrying forward), `data-lake` (seeded KB Data Lake renders its disk-square breakdown; manual Buy Cell grants a Cell, verified on Power), and `visual-regression` (Linux-only
  full-page screenshot baselines of Byte Foundry/Byte Factory in both themes; see `e2e/README.md`).
- **Not wired into `ci.yml`** — deliberately. Wiring it in (installing Playwright's browser on the
  runner, adding a job/step) means editing `ci.yml`, which is off-limits to `autonomous-maintenance.yml`
  (see docs/AUTOMATION.md) — a human needs to do that directly. `yarn test:e2e` is a local/manual suite
  for now.
