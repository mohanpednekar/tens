import { test, expect } from '@playwright/test'

// Regression test for the storage-schema migration class of bug where a reload could silently
// relock an already-unlocked autobuyer (see storage.js's migrateState and its handling of
// legacy boolean vs. numeric autobuyer values). Seeds a save with tier01's autobuyer already
// unlocked and confirms that state survives a real browser reload/load cycle.
const seededState = {
  resources: { Ones: 100000 },
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
  const bytesLayer = page.getByLabel(/^bytes layer$/i)
  await expect(bytesLayer).toContainText(/owned: 50\b/i)
  await expect(page.getByRole('button', { name: /level 50\)/i })).toBeVisible()

  await page.getByRole('tab', { name: /upgrades/i }).click()

  const upgradeRow = page.locator('[aria-label="Bytes PP upgrades"]')
  await expect(upgradeRow).toBeVisible()

  // The autobuyer was already unlocked in the seeded save — it must not show the Unlock
  // button (that would mean the reload silently relocked it).
  await expect(upgradeRow.getByRole('button', { name: /unlock .*autobuyer/i })).toHaveCount(0)

  // Rows that only appear once the autobuyer is unlocked should be present instead.
  await expect(
    upgradeRow.getByRole('button', { name: /tickspeed multiplier upgrade itself automatically/i })
  ).toBeVisible()
  await expect(upgradeRow.getByRole('button', { name: /make bytes's autobuyer smart/i })).toBeVisible()
})
