import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createViteConfig } from './viteConfigFactory.js'

const srcPath = fileURLToPath(new URL('./src', import.meta.url))

// `env` (process env + .env files) decides which optional features (ads, IAP, cloud save) are
// compiled in — see tensFeaturesPlugin in viteConfigFactory.js.
export default defineConfig(({ mode }) => createViteConfig({ srcPath, env: loadEnv(mode, process.cwd(), '') }))
