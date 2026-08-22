import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    window.localStorage.clear()
    window.localStorage.setItem('tens_game_state', JSON.stringify({
      intro: { mainGameUnlocked: true, byteCreated: true },
      prestige: { xp: 0, points: 1e100, count: 5, highestMilestone: 1 },
      era: { count: 0 },
      eons: { balance: 0 },
    }))
  })
  await page.reload()
})

test('ascending an Era from Settings awards Eons and resets the Foundry gate', async ({ page }) => {
  await page.getByRole('button', { name: /open more menu/i }).click()
  await page.getByRole('button', { name: /open settings/i }).click()
  await page.getByRole('button', { name: /ascend an era — open confirmation/i }).click()
  await page.getByRole('button', { name: /^ascend era$/i }).click()

  const saved = await page.evaluate(() => JSON.parse(window.localStorage.getItem('tens_game_state')))
  expect(saved.era.count).toBe(1)
  expect(saved.eons.balance).toBeGreaterThanOrEqual(1)
  expect(saved.intro.mainGameUnlocked).toBe(false)
  expect(saved.intro.capacity).toBe(8)

  await page.getByRole('button', { name: /open byte foundry/i }).click()
  await expect(page.getByRole('heading', { level: 1, name: /byte foundry/i })).toBeVisible()
})
