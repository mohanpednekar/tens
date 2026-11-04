import { test, expect } from '@playwright/test'

// Regression test: an already-unlocked autobuyer must survive a real browser reload/load cycle.
const seededState = {
  intro: { mainGameUnlocked: true },
  resources: { base: 100000 },
  owned: { tier01: 50 },
  purchased: { tier01: 50 },
  autobuyers: { tier01: 1 },
  purge: { points: 50, count: 1, xp: 0, highestMilestone: 1 },
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(state => {
    window.localStorage.clear()
    window.localStorage.setItem('tens_game_state', JSON.stringify(state))
  }, seededState)
  await page.reload()
})

test('an already-unlocked tier autobuyer stays unlocked after a reload', async ({ page }) => {
  // Owned/purchased ("level") counts round-tripped through the save/load cycle correctly.
  const kilobytesLayer = page.getByLabel(/^kilobytes layer$/i)
  // Owned grows with production after load, so only assert it stayed at/above the seeded 50.
  await expect(kilobytesLayer).toContainText(/owned: ([5-9]\d|\d{3,})\b/i)
  await expect(kilobytesLayer.getByRole('button', { name: /^buy .*for .*completed levels/i })).toBeVisible()

  await page.getByRole('button', { name: /^open firmware$/i }).click()

  const row = page.locator('[aria-label="Kilobytes autobuyer"]')
  await expect(row).toBeVisible()

  // The autobuyer was already unlocked in the seeded save — its row must show the pause Switch, not
  // a locked milestone badge (which would mean the reload silently relocked it).
  await expect(row.getByRole('button', { name: /^kilobytes's autobuyer$/i })).toBeVisible()
  await expect(row.getByLabel(/^kilobytes's autobuyer unlocks at purge/i)).toHaveCount(0)
})
