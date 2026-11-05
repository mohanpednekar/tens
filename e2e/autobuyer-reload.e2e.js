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
  // The seeded 50 owned survived the load, and the autobuyer kept buying afterwards (it, not
  // production, is what raises Owned here), so poll for Owned climbing past the seeded 50.
  await expect(kilobytesLayer).toContainText(/owned: ([5-9]\d|\d{3,})\b/i)
  const readOwned = async () => Number((((await kilobytesLayer.textContent()) ?? '').match(/owned: ([\d,]+)/i)?.[1] ?? '0').replace(/,/g, ''))
  await expect.poll(readOwned, { timeout: 10000 }).toBeGreaterThan(50)
  await expect(kilobytesLayer.getByRole('button', { name: /^buy .*for .*completed levels/i })).toBeVisible()

  await page.getByRole('button', { name: /^open firmware$/i }).click()

  const row = page.locator('[aria-label="Kilobytes autobuyer"]')
  await expect(row).toBeVisible()

  // The autobuyer was already unlocked in the seeded save — its row must show the pause Switch, not
  // a locked milestone badge (which would mean the reload silently relocked it).
  await expect(row.getByRole('button', { name: /^kilobytes's autobuyer$/i })).toBeVisible()
  await expect(row.getByLabel(/^kilobytes's autobuyer unlocks at purge/i)).toHaveCount(0)
})
