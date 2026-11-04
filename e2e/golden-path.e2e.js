import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    window.localStorage.clear()
    // Seed mainGameUnlocked so this spec lands directly on MainPage, plus 2,500 Bits —
    // enough for two Kilobytes purchases at 1,000 b each (flat within the first block).
    window.localStorage.setItem('tens_game_state', JSON.stringify({ intro: { mainGameUnlocked: true }, resources: { base: 2500 } }))
  })
  await page.reload()
})

test('buying Kilobytes increases Owned and updates the money balance', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1, name: /byte factory/i })).toBeVisible()

  const kilobytesLayer = page.getByLabel(/^kilobytes layer$/i)
  await expect(kilobytesLayer).toBeVisible()
  await expect(kilobytesLayer).toContainText(/owned: 0\b/i)
  const money = page.getByRole('button', { name: /^money display$/i })
  await expect(money).toContainText(/^2,500\s*b/i)

  // A manual Buy batches every unit affordable inside the current cost block: 2,500 b buys two
  // Kilobytes at 1,000 b each (flat within the block), shown on the button as "Buy ×2 for 2,000 b".
  const buyButton = kilobytesLayer.getByRole('button', { name: /^buy ×2 for 2,000 b\b/i })
  await expect(buyButton).toBeEnabled()
  await buyButton.click()

  await expect(kilobytesLayer).toContainText(/owned: 2\b/i)
  // The 2,000 b spend leaves ~500 b (production only adds a little on top).
  await expect(money).toContainText(/^[5-9]\d\d\s*b/i)
  await expect(kilobytesLayer.getByRole('button', { name: /^buy for 1,000 b\b/i })).toBeDisabled()

  // Production then adds to the balance over time: the owned Kilobytes produce Bytes (8 b each).
  const readBits = async () => Number((((await money.textContent()) ?? '').match(/([\d,]+)\s*b/i)?.[1] ?? '0').replace(/,/g, ''))
  const afterPurchase = await readBits()
  await expect.poll(readBits, { timeout: 10000 }).toBeGreaterThan(afterPurchase)
})
