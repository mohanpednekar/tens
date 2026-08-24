import { test, expect } from '@playwright/test'
import { createInitialGameState } from '../src/game/engine.js'
import { INTRO_COMPUTE_CORE_UNLOCK_CAPACITY } from '../src/game/layers.js'

const seedDataLakeSave = () => {
  const state = createInitialGameState()
  return {
    saveSchemaVersion: 2,
    ...state,
    intro: {
      ...state.intro,
      mainGameUnlocked: true,
      byteCreated: true,
      capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
      bits: 50000,
      disks: { 8000: 2 },
      disksBuiltTotal: { 8000: 2 },
      diskCache: { 8000: 8000 },
      computeMergePageUnlocked: true,
    },
  }
}

test('data lake deposit and booster purchase', async ({ page }) => {
  await page.goto('/tens/')
  await page.evaluate(save => {
    localStorage.setItem('tens_game_state', JSON.stringify(save))
  }, seedDataLakeSave())
  await page.reload()

  await page.getByRole('button', { name: 'open byte foundry' }).click()
  await expect(page.getByRole('button', { name: /deposit one .* disk into the KB Data Lake/i })).toBeVisible()
  await page.getByRole('button', { name: /deposit one .* disk into the KB Data Lake/i }).click()
  await expect(page.getByLabel('Data Lakes')).toBeVisible()

  await page.getByRole('button', { name: 'open boosters' }).click()
  await page.getByRole('button', { name: /buy 1 core from the KB Data Lake/i }).click()
  await expect(page.getByText('Cores 1/10')).toBeVisible()
})
