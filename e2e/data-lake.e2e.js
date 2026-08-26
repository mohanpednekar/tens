import { test, expect } from '@playwright/test'
import { createInitialGameState } from '../src/game/engine.js'
import { DISK_ARRAY_LADDER_CAP, INTRO_COMPUTE_CORE_UNLOCK_CAPACITY } from '../src/game/layers.js'

const seedDataLakeSave = () => {
  const state = createInitialGameState()
  return {
    saveSchemaVersion: 2,
    ...state,
    // tier01's default (level 1) per-unit cost is exactly 8000 bits — the same size as the 1 KB
    // disk array below — which would make it currently redeemable and block auto-deposit (see
    // tickDiskAutoDeposit's own isDiskRedeemable guard: disks always defer to a matching tier
    // first). Bumping the level moves the cost off 8000 so the disks are free to auto-deposit.
    purchaseLevels: { ...state.purchaseLevels, tier01: 2 },
    intro: {
      ...state.intro,
      mainGameUnlocked: true,
      byteCreated: true,
      capacity: INTRO_COMPUTE_CORE_UNLOCK_CAPACITY,
      bits: 50000,
      disks: { 8000: 2 },
      // Fully built (DISK_ARRAY_LADDER_CAP) so both auto-depositing and starting a live Data Lake
      // transfer are actually available — see canDepositDiskToDataLake/getDataLakeTransferCapacity.
      disksBuiltTotal: { 8000: DISK_ARRAY_LADDER_CAP },
      diskCache: { 8000: 8000 },
      computeMergePageUnlocked: true,
    },
  }
}

test('data lake auto-deposit and booster start', async ({ page }) => {
  await page.goto('/tens/')
  await page.evaluate(save => {
    localStorage.setItem('tens_game_state', JSON.stringify(save))
  }, seedDataLakeSave())
  await page.reload()

  await page.getByRole('button', { name: 'open byte foundry' }).click()
  // No manual deposit button any more — a full, non-redeemable disk auto-feeds its pool's single
  // Data Lake on the next tick (see tickDiskAutoDeposit). Foundry renders DataLakePanel in `bare`
  // mode (no own "Data Lakes" aria-label — see components/DataLakePanel), so assert on the
  // per-lake row text itself once it appears.
  await expect(page.getByText(/KB Data Lake → Core/)).toBeVisible()

  await page.getByRole('button', { name: 'open boosters' }).click()
  // The auto-deposit above covers the 1st Booster's cost in full, so starting it grants the Core
  // instantly — no live transfer wait (see startBoosterTransfer's deposits-first path).
  await page.getByRole('button', { name: /start 1 core from the KB Data Lake/i }).click()
  await expect(page.getByText('Cores 1/10')).toBeVisible()
})
