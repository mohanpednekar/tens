import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    window.localStorage.clear()
    window.localStorage.setItem('tens_game_state', JSON.stringify({ resources: { Ones: 1e100 } }))
  })
  await page.reload()
})

test('prestiging from the first-time overlay resets resources and awards Prestige Points', async ({ page }) => {
  const overlay = page.getByRole('dialog', { name: /prestige required/i })
  await expect(overlay).toBeVisible()

  await overlay.getByRole('button', { name: /prestige now/i }).click()

  await expect(overlay).not.toBeVisible()
  await expect(page.getByLabel('money display')).toContainText('$10')

  const ppDisplay = page.getByLabel('prestige points display')
  await expect(ppDisplay).toBeVisible()
  await expect(ppDisplay).toContainText(/\d+ PP/)
  await expect(ppDisplay).not.toContainText('0 PP')
})
