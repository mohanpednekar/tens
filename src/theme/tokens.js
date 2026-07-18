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
    page: '#eef1f6', // cool paper — the grey ground white surfaces sit on
    surface: '#ffffff',
    surfaceRaised: '#ffffff', // elevation carried by shadow in light mode, not a lighter fill
    surfaceSunken: '#eef1f6',
    border: '#dde2ea',
    borderStrong: '#c7ceda',
    text: '#171a21',
    textMuted: '#5c6675',
    textFaint: '#808a99',
    accent: '#3b5bdb',
    good: '#12a150',
    warn: '#b7791f',
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
    sm: '0 1px 2px rgba(20, 30, 60, 0.06)',
    md: '0 6px 18px rgba(20, 30, 60, 0.10)',
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

// Font families are a deliberate seam: system stacks for now, swapped for locally-bundled faces in
// the typography sub-issue (#136). `display` is for the wordmark/headings, `body` for UI/running
// text, `mono` for any code-like/data display. Numeric UI pairs these with
// `font-variant-numeric: tabular-nums` (see `type.numeric`).
const font = {
  display:
    'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  body: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
}

// A starting type scale (rem). The typography sub-issue refines sizes/line-heights alongside the
// bundled faces; kept minimal here so the foundation stays visually inert.
const type = {
  scale: {
    xs: '0.72rem',
    sm: '0.82rem',
    md: '0.95rem',
    lg: '1.1rem',
    xl: '1.75rem',
    hero: '2.4rem',
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
