#!/usr/bin/env node
// Entry point — registers ext-loader.mjs (so plain Node can resolve engine.js/layers.js's
// extensionless relative imports, same as Vite does) before dynamically importing the actual
// simulation, then forwards this process's CLI args to it.
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

register(pathToFileURL(new URL('./ext-loader.mjs', import.meta.url).pathname), import.meta.url)

await import('./run-simulation.mjs')
