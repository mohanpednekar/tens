import { defineConfig, devices } from '@playwright/test'

const PORT = 5173
const BASE_URL = `http://127.0.0.1:${PORT}/tens/`

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.js',
  fullyParallel: true,
  reporter: 'list',
  expect: {
    toHaveScreenshot: {
      // Deterministic capture for the visual-regression spec (#593): freeze CSS
      // animations/transitions, and allow a small diff headroom so cross-runner font
      // antialiasing noise doesn't flake while real layout regressions still fail.
      animations: 'disabled',
      maxDiffPixelRatio: 0.005,
    },
  },
  use: {
    baseURL: BASE_URL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'yarn dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
})
