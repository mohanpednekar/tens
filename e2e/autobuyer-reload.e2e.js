import { test, expect } from '@playwright/test'

// Regression test: an already-unlocked autobuyer must survive a real browser reload/load cycle.
const seededState = {
  intro: { mainGameUnlocked: true },
  resources: { base: 100000 },
  owned: { tier01: 50 },
  purchased: { tier01: 50 },
  autobuyers: { tier01: 1 },
  prestige: { points: 50, count: 1, xp: 0, highestMilestone: 1 },
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
  await expect(kilobytesLayer).toContainText(/owned: 50\b/i)
  await expect(page.getByRole('button', { name: /level 50\)/i })).toBeVisible()

  await page.getByRole('button', { name: /^open perks$/i }).click()

  const unlockRow = page.locator('[aria-label="Kilobytes PP unlocks"]')
  await expect(unlockRow).toBeVisible()

  // The autobuyer was already unlocked in the seeded save — it must read as unlocked, not locked
  // (a locked badge would mean the reload silently relocked it), with bulk mode offered in its place.
  await expect(unlockRow.getByLabel(/^kilobytes's autobuyer unlocked at prestige 1$/i)).toBeVisible()
  await expect(unlockRow.getByLabel(/^kilobytes's autobuyer unlocks at prestige/i)).toHaveCount(0)
  await expect(unlockRow.getByRole('button', { name: /let kilobytes's autobuyer buy 10 levels at once/i })).toBeVisible()
})
