# Theming reference

Referenced from `CLAUDE.md`'s "Theming" section. Full per-file breakdown of the design-token system,
so `CLAUDE.md` keeps only a short summary — the same split already applied to
`docs/MAINPAGE_REFERENCE.md`/`docs/COMPONENTS_REFERENCE.md`. Read this before touching
`src/theme/tokens.js`, `src/theme/fonts.js`, `src/theme/GlobalStyle.js`, or `src/theme/index.jsx`. For
the *why* behind the token/font choices (rejected alternatives, trade-off reasoning), see
`docs/DESIGN_HISTORY.md`.

All component styling resolves to **semantic design tokens** defined once in `src/theme/tokens.js`, so
the app's two themes — an evolved **dark** (default) and a **light** theme — fall out of swapping palette
values rather than forking any component on mode. This was the foundation for the now-complete
UI-revamp epic (#132, all 8 sub-issues shipped, including light mode's activation in #140); every
component consumes these tokens.

- **`tokens.js`** exports `buildTheme(mode)` (flattens the right palette for styled-components'
  `ThemeProvider`) and the two pre-built `themes.dark` / `themes.light`. A theme object exposes:
  `color` (per-mode: `page`, `surface`, `surfaceRaised`, `surfaceSunken`, `border`, `borderStrong`,
  `text`, `textMuted`, `textFaint`, `accent` (indigo brand), `good`/`warn`/`info`/`violet`/`danger`
  semantics kept distinct from the accent, `disabled`), `shadow` (`sm`/`md`, per-mode), `tierAccents`
  (per-mode 8-hue cycle for the tier left-edge stripe), plus mode-independent `space`, `radius`,
  `motion` (`duration`/`easing`), `font` (`display`/`body`/`mono`), and `type` (`scale` + `numeric`).
  `font.display` is `"Space Grotesk"` (a characterful geometric sans fitting the byte-scale/computing
  theme) and `font.body` is `"Inter"` (chosen for legibility and strong tabular figures — numbers are
  the star of an incremental game); both are locally bundled (see `fonts.js` below), each with
  the prior system-stack values kept as a fallback. `font.mono` stays a system stack — no bundled mono
  face was needed. `type.scale` pairs each step (`xs`/`sm`/`md`/`lg`/`xl`/`hero`) with a `{ size,
  lineHeight }` rem pair; `type.numeric` is `'tabular-nums'`. Now applied across every page/component
  (`MainPage`, `ByteFoundryPage`, `ComputePage`, `SettingsPage`, `DevModePage`, `StoragePage`,
  `InfoPage`, `AppMenu`, `DataLakePanel`, `ConfirmDialog`, `DiskArrayRow`, `IncompatibleSaveNotice`,
  …) via the per-surface redesign sub-issues (HUD #137/tier-row #138/prestige #139), not just the
  base body size and wordmark heading.
- **`fonts.js`** locally bundles the two faces above via `@fontsource/inter`/`@fontsource/space-grotesk`
  side-effect imports (`import '@fontsource/inter/latin-400.css'`, etc.) — no runtime CDN fetch, so the
  game stays fully self-contained after the GH Pages deploy (confirmed via `yarn build`: `dist/assets/`
  carries the woff2/woff files directly, no external font URL in the built output). Only 4 specific
  weight/subset files are imported, not each package's full weight/subset set: Inter 400 (body
  baseline), 600 (`Button`'s `font-weight: 600`), and 700 (h2/h3 headings, which inherit the body face
  at the browser's default heading bold weight), plus Space Grotesk 700 (the wordmark). Each import
  targets the package's `latin-*.css` file specifically (not the aggregate `NNN.css`, which pulls in
  every script subset — cyrillic, greek, vietnamese, …) to keep the bundled weight/subset count
  intentionally small. Imported once from `theme/index.jsx` as a side effect, so it loads regardless of
  theme mode.
- **`GlobalStyle.js`** (`createGlobalStyle`) replaces the removed `src/index.css` + `src/App.css`: the
  `box-sizing` reset, base font/smoothing, the form-control `font: inherit` rule, and the token-driven
  page background + text color (so the whole page repaints on a mode change).
- **`theme/index.jsx`** exports `<ThemeProvider mode>` (wrapping styled-components' `ThemeProvider`) and
  re-exports `GlobalStyle`/`themes`/`buildTheme`/`MODES`/`DEFAULT_MODE`/`resolveThemeMode`.
  `App.jsx` renders `<ThemeProvider mode={…}><GlobalStyle/>…</ThemeProvider>`. **`mode`** is the
  resolved palette (`light`/`dark`); **`tens_theme_preference`** in `localStorage` stores
  `system` (default), `light`, or `dark`. System follows `prefers-color-scheme: light` (defaulting
  to `dark` when unknown). OS theme changes apply only while preference is System. Settings →
  Appearance controls the preference. `clearGameState` / reset do **not** clear the theme key.
- **`contrast.js`** is a standalone WCAG 2.x relative-luminance contrast-ratio utility
  (`getContrastRatio(hexA, hexB)`, plus the `AA_NORMAL_TEXT`/`AA_LARGE_TEXT`/`AA_UI_COMPONENT`
  threshold constants — 4.5/3/3), not test-only, so future token or component work can reuse it.
  `tokens.contrast.test.js` uses it to audit AA compliance for the design tokens' plain (unblended)
  text/UI-component color pairs in both themes — `text`/`textMuted`/`good`/`violet` against the
  `page`/`surface`/`surfaceSunken` backgrounds they're actually rendered on (tier row + base body
  text), and every `tierAccents` hue plus `warn` against `surface` at the looser 3:1 non-text-UI
  threshold (the accent stripe is decorative; the `warn`-colored `PpUpgradeBadge` icon is redundant
  with its own `$dimmed` opacity and `aria-label`). It deliberately skips `Button`'s progress-fill
  states — those blend a token color at a tuned alpha over `surfaceSunken`, already validated by the
  alpha choices next to `progressFill` in `src/components/Button/index.jsx`, not a plain token pair.
  This audit is what caught light mode's original `good` (`#12a150`, 3.37:1 against `surface`) failing
  AA — it's now `#0a6b30` (6.65:1 against `surface`, 5.87:1 against `surfaceSunken`). Light `warn`
  was darkened to `#875600` so prestige (`variant="prestige"`) button text clears 4.5:1 on light
  `surfaceSunken` (`#dfe4ec`).
