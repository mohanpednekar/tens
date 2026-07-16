// Node ESM module hook: engine.js/layers.js use Vite-style extensionless relative imports
// (e.g. `from './layers'`), which Vite/Vitest resolve automatically but plain Node does not.
// This hook retries a failed relative-import resolution with a `.js` suffix, so the simulation
// script can import the real game source files directly under plain `node` — no bundler, no
// duplicated game logic to drift out of sync with src/game/*.
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND' && (specifier.startsWith('./') || specifier.startsWith('../'))) {
      return nextResolve(`${specifier}.js`, context)
    }
    throw err
  }
}
