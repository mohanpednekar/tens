import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()
})

test('buying Bytes increases Owned and grows the money balance over time', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1, name: /tens/i })).toBeVisible()

  const bytesLayer = page.getByLabel(/^bytes layer$/i)
  await expect(bytesLayer).toBeVisible()
  await expect(bytesLayer).toContainText(/owned: 0\b/i)

  const buyButton = page.getByRole('button', { name: /^buy for \$10\b/i })
  await expect(buyButton).toBeEnabled()
  await buyButton.click()

  await expect(bytesLayer).toContainText(/owned: 1\b/i)
  // Money is spent down to $0, so the same $10 unit is no longer affordable — flat cost within
  // the first block of 10 purchases (see getTierCost in engine.js).
  await expect(page.getByRole('button', { name: /^buy for \$10\b/i })).toBeDisabled()

  // Owning 1 Byte produces $1/tick at the base 1s tickspeed — wait for enough production ticks
  // to afford the next $10 unit again, then buy a second time.
  const buyAgain = page.getByRole('button', { name: /^buy for \$10\b/i })
  await expect(buyAgain).toBeEnabled({ timeout: 15000 })
  await buyAgain.click()

  await expect(bytesLayer).toContainText(/owned: 2\b/i)
})
