// Single source of truth for the design system. Every color decision in the app resolves to a
// *semantic* token here (surface / text / accent / good / warn …) rather than a raw hex, so the
// two themes (dark + light) fall out of swapping palette values — components never fork on mode.
// See CLAUDE.md → "Theming" for the full rationale and the token vocabulary.
//
// Structure: per-mode color/shadow/tier-accent sets, plus mode-independent scales (space, radius,
// motion, font, type). `buildTheme(mode)` flattens the right set for styled-components'
// ThemeProvider; `themes.dark` / `themes.light` are the two pre-built results.

// ---- Per-mode color palettes -------------------------------------------------------------------
// Semantic roles, not literal color names. Brand `accent` (indigo) is deliberately kept distinct
// from the `good`/`warn`/`info`/`violet`/`danger` semantic hues so affordability/state coloring
// never collides with the brand accent.
const palette = {
  dark: {
    page: '#0c0d11', // blue-biased near-black ground
    surface: '#16181f', // cards / rows
    surfaceRaised: '#1e212a', // hero / elevated panels
    surfaceSunken: '#262a34', // inputs / progress tracks / button base
    border: '#2a2e39',
    borderStrong: '#3a3f4d',
    text: '#eef1f7',
    textMuted: '#98a1b2',
    textFaint: '#6b7280',
    accent: '#7c9bff', // indigo brand accent
    good: '#57d98a', // affordable / positive
    warn: '#f0c260', // prestige gold / caution
    info: '#56b6f0', // automate
    violet: '#b39bff', // smart
    danger: '#f87171',
    disabled: '#7d8595', // replaces the old `darkgrey` for disabled controls
  },
  light: {
    page: '#e8ecf2', // cool paper — grey ground white surfaces sit on
    surface: '#ffffff',
    surfaceRaised: '#ffffff', // elevation carried by shadow in light mode, not a lighter fill
    surfaceSunken: '#dfe4ec', // distinct from page so buttons/nav active states read clearly
    border: '#d4dae4',
    borderStrong: '#bec7d4',
    text: '#171a21',
    textMuted: '#5c6675',
    textFaint: '#808a99',
    accent: '#3b5bdb',
    good: '#0a6b30', // darkened from #12a150 — that shade only cleared 3.37:1 against `surface`,
    // below WCAG AA's 4.5:1 normal-text threshold (see tokens.contrast.test.js); this shade clears
    // both `surface` and `surfaceSunken` with margin.
    warn: '#875600', // darkened from #966100 — #dfe4ec surfaceSunken dropped prestige button text to ~4.1:1
    info: '#1f7ac0',
    violet: '#7048c4',
    danger: '#d64545',
    disabled: '#9aa0ab',
  },
}

// ---- Per-mode elevation ------------------------------------------------------------------------
// Shadows read differently on each ground, so they're per-mode rather than shared.
const shadow = {
  dark: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.45)',
    md: '0 6px 18px rgba(0, 0, 0, 0.55)',
  },
  light: {
    sm: '0 1px 3px rgba(20, 30, 60, 0.08)',
    md: '0 8px 24px rgba(20, 30, 60, 0.12)',
  },
}

// ---- Per-mode tier-accent cycle ----------------------------------------------------------------
// The 8-hue cycle used as a thin per-tier left-edge stripe (cosmetic scanability only — kept off
// text/buttons so it never collides with the semantic affordability colors). Light values are
// deepened so a 3px stripe still reads against a white surface.
const tierAccents = {
  dark: ['#60a5fa', '#f472b6', '#a78bfa', '#fb923c', '#22d3ee', '#38bdf8', '#f87171', '#818cf8'],
  light: ['#2563eb', '#db2777', '#7c3aed', '#ea580c', '#0891b2', '#0284c7', '#dc2626', '#4f46e5'],
}

// ---- Mode-independent scales -------------------------------------------------------------------
const space = {
  xs: '0.25rem',
  sm: '0.4rem',
  md: '0.6rem',
  lg: '0.85rem',
  xl: '1.25rem',
  '2xl': '2rem',
}

const radius = {
  sm: '6px', // buttons
  md: '10px', // cards / rows
  lg: '12px', // hero / overlay cards
  pill: '999px',
}

const motion = {
  duration: {
    fast: '0.05s',
    base: '0.15s',
    slow: '0.4s',
  },
  easing: {
    standard: 'ease',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },
}

// Font families: `display` (Space Grotesk, a characterful geometric sans that fits the byte-scale/
// computing theme) is for the wordmark/headings, `body` (Inter, chosen for its legibility and strong
// tabular figures — numbers are the star of an incremental game) for UI/running text, `mono` for any
// code-like/data display (still a system stack — no bundled mono face needed today). Both bundled
// faces are imported locally from `theme/fonts.js` (no runtime CDN fetch); each family keeps the
// system stack as a fallback for any weight/character the bundled subset doesn't cover. Numeric UI
// pairs these with `font-variant-numeric: tabular-nums` (see `type.numeric`).
const font = {
  display:
    '"Space Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  body: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
}

// Type scale (rem), each step paired with a line-height. Not yet applied per-component beyond the
// base body size (GlobalStyle) and the wordmark heading (MainPage's Header) — later per-surface
// redesign sub-issues (HUD/tier-row/prestige) apply the rest of the scale to their own text.
const type = {
  scale: {
    xs: { size: '0.72rem', lineHeight: '1rem' },
    sm: { size: '0.82rem', lineHeight: '1.15rem' },
    md: { size: '0.95rem', lineHeight: '1.35rem' },
    lg: { size: '1.1rem', lineHeight: '1.5rem' },
    xl: { size: '1.75rem', lineHeight: '2.1rem' },
    hero: { size: '2.4rem', lineHeight: '2.7rem' },
  },
  numeric: 'tabular-nums',
}

// ---- Assembly ----------------------------------------------------------------------------------
export const MODES = ['dark', 'light']
export const DEFAULT_MODE = 'dark'

export const buildTheme = mode => {
  const resolved = MODES.includes(mode) ? mode : DEFAULT_MODE
  return {
    mode: resolved,
    color: palette[resolved],
    shadow: shadow[resolved],
    tierAccents: tierAccents[resolved],
    space,
    radius,
    motion,
    font,
    type,
  }
}

export const themes = {
  dark: buildTheme('dark'),
  light: buildTheme('light'),
}
