# End-to-end specs (Playwright)

`yarn test:e2e` runs these specs in headless Chromium against a real `yarn dev` server (started
automatically via `playwright.config.js`'s `webServer`). One-time setup:
`npx playwright install chromium` (see `CLAUDE.md`'s "End-to-end testing" section).

Specs seed `localStorage`'s `tens_game_state` directly, then reload — same convention as the Vitest
suite. `tens_theme_preference` (`'dark'`/`'light'`) controls the rendered theme independently of the
OS `prefers-color-scheme`.

## Visual regression (`visual-regression.e2e.js`)

`visual-regression.e2e.js` compares full-page screenshots of the Byte Foundry and Byte Factory
pages against committed baselines in `e2e/visual-regression.e2e.js-snapshots/`, in both themes
(Part of #593). Capture stability comes from `playwright.config.js`'s `expect.toHaveScreenshot`
defaults: CSS animations/transitions are disabled during capture, and `maxDiffPixelRatio: 0.005`
absorbs cross-runner font-antialiasing noise without hiding real layout changes.

Baselines are generated on **Linux** — the CI platform (`ubuntu-latest`) — so the spec skips on
other OSes (`process.platform !== 'linux'`) rather than fail on OS-specific rasterization. On a
non-Linux machine the rest of the e2e suite still runs; only the screenshot spec is skipped.

### Updating baselines when a PR intentionally changes the UI

1. Make the UI change.
2. On Linux (or in the CI environment), run:
   `npx playwright test e2e/visual-regression.e2e.js --update-snapshots`
3. Review the regenerated PNGs — they should differ from the previous baselines only where the
   intended change shows.
4. Commit the updated `*-chromium-linux.png` files **in the same PR** as the UI change, so the
   baselines and the code that produces them land together.

If a screenshot test fails and the diff is *not* an intended change, that's the check working —
fix the regression rather than regenerating baselines.
