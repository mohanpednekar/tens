import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    window.localStorage.clear()
    // 8e100 (PRESTIGE_THRESHOLD = GOOGOL * BITS_PER_BYTE — "1 Googol Bytes," in Bits) is the real
    // freeze/Prestige trigger now, not the bare 1e100 GOOGOL value. mainGameUnlocked: true lands
    // this seed directly on MainPage rather than the Byte Foundry intro screen.
    window.localStorage.setItem('tens_game_state', JSON.stringify({
      intro: { mainGameUnlocked: true },
      resources: { base: 8e100 },
    }))
  })
  await page.reload()
})

test('prestiging from the first-time overlay resets resources, awards Prestige Points, and sends the player back through the Byte Foundry', async ({ page }) => {
  const overlay = page.getByRole('dialog', { name: /prestige required/i })
  await expect(overlay).toBeVisible()

  await overlay.getByRole('button', { name: /prestige now/i }).click()

  await expect(overlay).not.toBeVisible()
  // A real Prestige now resets the Byte Foundry intro too (see engine.js's prestigeGame), so the
  // app navigates back there instead of straight to MainPage — money/owned-tier assertions for the
  // main game itself are already covered by golden-path.e2e.js.
  await expect(page.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeVisible()

  const saved = await page.evaluate(() => JSON.parse(window.localStorage.getItem('tens_game_state')))
  expect(saved.intro.mainGameUnlocked).toBe(false)
  expect(saved.prestige.points).toBeGreaterThan(0)
})
