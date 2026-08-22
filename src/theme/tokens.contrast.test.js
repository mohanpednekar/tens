import { getContrastRatio, AA_LARGE_TEXT, AA_NORMAL_TEXT, AA_UI_COMPONENT } from './contrast'
import { themes } from './tokens'

// AA audit for the design-token color pairs actually rendered as plain (unblended) text/UI
// surfaces in the tier row (see #138's "Both themes AA" acceptance criterion) plus the
// foundational body text/page pairing every surface descends from. Deliberately excludes Button's
// progress-fill states — those blend a token color at a tuned alpha over `surfaceSunken` and are
// already validated by the alpha choices documented next to `progressFill` in
// `src/components/Button/index.jsx`; recomputing that blended contrast here would duplicate that
// reasoning rather than testing a plain token pair.
describe('theme token AA contrast', () => {
  // Normal text (WCAG 4.5:1): body copy, tier names, owned/production labels, the tickspeed-bonus
  // GreenText line, and unblended button text/borders (Button's `color`/`border` share one value).
  const normalTextPairs = {
    'text on page (GlobalStyle body text)': ['text', 'page'],
    'text on surface (StatCard / tier row default text)': ['text', 'surface'],
    'textMuted on surface (owned/production labels, details list)': ['textMuted', 'surface'],
    'text on surfaceRaised (prestige full-screen card body)': ['text', 'surfaceRaised'],
    'textMuted on surfaceRaised (prestige overlay copy)': ['textMuted', 'surfaceRaised'],
    'good on surface (GreenText tickspeed-bonus label)': ['good', 'surface'],
    'text on surfaceSunken (unblended Buy/Upgrade button text)': ['text', 'surfaceSunken'],
    'good on surfaceSunken (unblended tickspeed-upgrade button text)': ['good', 'surfaceSunken'],
    'violet on surfaceSunken (unblended XP-consume button text)': ['violet', 'surfaceSunken'],
  }

  test.each(Object.entries(normalTextPairs))('%s meets 4.5:1 in both themes', (_label, [fg, bg]) => {
    for (const mode of ['dark', 'light']) {
      const c = themes[mode].color
      expect(getContrastRatio(c[fg], c[bg])).toBeGreaterThanOrEqual(AA_NORMAL_TEXT)
    }
  })

  const largeTextPairs = {
    'warn on surfaceRaised (prestige overlay h2 — type.scale.xl, bold)': ['warn', 'surfaceRaised'],
  }

  test.each(Object.entries(largeTextPairs))('%s meets 3:1 in both themes', (_label, [fg, bg]) => {
    for (const mode of ['dark', 'light']) {
      const c = themes[mode].color
      expect(getContrastRatio(c[fg], c[bg])).toBeGreaterThanOrEqual(AA_LARGE_TEXT)
    }
  })

  // Non-text UI components (WCAG 1.4.11, 3:1): the per-tier accent stripe (decorative scanability
  // only, never carries text) and the autobuyer-status badge icon (redundant with $dimmed opacity
  // and an aria-label — not the sole way the state is conveyed).
  it('every tierAccents hue meets 3:1 against surface in both themes', () => {
    for (const mode of ['dark', 'light']) {
      const c = themes[mode].color
      for (const hex of themes[mode].tierAccents) {
        expect(getContrastRatio(hex, c.surface)).toBeGreaterThanOrEqual(AA_UI_COMPONENT)
      }
    }
  })

  it('warn on surface meets 3:1 in both themes (PpUpgradeBadge paused-state icon)', () => {
    for (const mode of ['dark', 'light']) {
      const c = themes[mode].color
      expect(getContrastRatio(c.warn, c.surface)).toBeGreaterThanOrEqual(AA_UI_COMPONENT)
    }
  })
})
