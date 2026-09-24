import { test, expect } from '@playwright/test'

// Visual-regression coverage (Part of #593): baseline screenshots for the two highest-traffic
// pages in both themes. Baselines are generated on Linux — the CI platform (ubuntu-latest) — so
// this spec skips on other platforms rather than fail on OS-specific antialiasing; see
// e2e/README.md for how to regenerate baselines when a PR intentionally changes the UI.
test.skip(
  process.platform !== 'linux',
  'screenshot baselines are generated on Linux (the CI platform) only',
)

const THEME_PREFERENCE_KEY = 'tens_theme_preference'
const GAME_STATE_KEY = 'tens_game_state'

const loadSeededPage = async (page, { theme, state }) => {
  await page.goto('/')
  await page.evaluate(
    ({ themeKey, theme, stateKey, state }) => {
      window.localStorage.clear()
      window.localStorage.setItem(themeKey, theme)
      if (state) window.localStorage.setItem(stateKey, JSON.stringify(state))
    },
    { themeKey: THEME_PREFERENCE_KEY, theme, stateKey: GAME_STATE_KEY, state },
  )
  await page.reload()
  // Fonts are bundled (@fontsource — no runtime CDN fetch); wait for them so the capture never
  // races a late font swap.
  await page.waitForFunction(() => document.fonts.status === 'loaded')
}

for (const theme of ['dark', 'light']) {
  test(`Byte Foundry page — ${theme} theme`, async ({ page }) => {
    // No seeded save: a fresh save is gated behind the Byte Foundry until it unlocks the main
    // game, so this captures the Foundry exactly as a brand-new player sees it.
    await loadSeededPage(page, { theme })
    await expect(page.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeVisible()
    await expect(page).toHaveScreenshot(`byte-foundry-${theme}.png`, { fullPage: true })
  })

  test(`Byte Factory page — ${theme} theme`, async ({ page }) => {
    // mainGameUnlocked is the permanent one-time latch past the Foundry gate (see CLAUDE.md);
    // seeding it lands directly on MainPage, same as every other seeded e2e spec.
    await loadSeededPage(page, { theme, state: { intro: { mainGameUnlocked: true } } })
    await expect(page.getByRole('heading', { level: 1, name: /byte factory/i })).toBeVisible()
    await expect(page).toHaveScreenshot(`byte-factory-${theme}.png`, { fullPage: true })
  })
}
