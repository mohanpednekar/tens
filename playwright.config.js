import { defineConfig, devices } from '@playwright/test'

const PORT = 5173
const BASE_URL = `http://127.0.0.1:${PORT}/tens/`

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.js',
  fullyParallel: true,
  reporter: 'list',
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
