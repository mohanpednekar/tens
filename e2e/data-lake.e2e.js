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
      bits: 0,
      computeMergePageUnlocked: true,
      // The KB lake already holds 1 banked unit — its own level-1 capacity is 10, so this isn't
      // full, just enough to afford the very first Booster (cost 1) — and boostersUnlocked is
      // already latched, as it would be the moment a lake's own first (×1) disk ever completes
      // (see fillDataLakeDisks in engine.js). Seeded directly rather than played through the real
      // pool-overflow fill (a real-time mechanic) to keep this e2e spec fast and deterministic.
      dataLakes: {
        ...state.intro.dataLakes,
        1: { depositedUnits: 1, fillBits: 0, purchased: 0, boostersUnlocked: true, autoBuyEnabled: false, capacityLevel: 1 },
      },
    },
  }
}

test('data lake disk display and manual Booster buy', async ({ page }) => {
  await page.goto('/tens/')
  await page.evaluate(save => {
    localStorage.setItem('tens_game_state', JSON.stringify(save))
  }, seedDataLakeSave())
  await page.reload()

  await page.getByRole('button', { name: 'open byte foundry' }).click()
  // The largest unlocked pool is expanded by default, so its embedded (bare) Data Lake panel is
  // already visible with no extra click — see components/DataLakePanel.
  await expect(page.getByText('Lake')).toBeVisible()
  await expect(page.getByLabelText(/full 1 KB lake disk/i)).toBeVisible()

  const buyButton = page.getByRole('button', { name: /buy 1 Cores from the KB Data Lake/i })
  await expect(buyButton).toBeEnabled()
  await buyButton.click()

  await page.getByRole('button', { name: 'open boosters' }).click()
  await expect(page.getByText('Cores 1/10')).toBeVisible()
})
