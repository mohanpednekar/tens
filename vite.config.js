import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { createViteConfig } from './viteConfigFactory.js'

const srcPath = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig(createViteConfig({ srcPath }))
