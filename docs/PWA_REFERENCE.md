# PWA support reference

Referenced from `CLAUDE.md`'s "PWA support" section. Full breakdown of the installable-PWA setup, so
`CLAUDE.md` keeps only a short summary — the same split already applied to
`docs/MAINPAGE_REFERENCE.md`/`docs/COMPONENTS_REFERENCE.md`. Read this before touching `vite.config.js`'s
`VitePWA` block, the manifest fields, `public/pwa-*.png`/`apple-touch-icon.png`, or
`scripts/generate-pwa-icons.mjs`. For the *why* behind choosing this over Capacitor/native app-store
publishing or a React Native rewrite, see `docs/DESIGN_HISTORY.md`.

The app is installable as a Progressive Web App on both Android Chrome and iOS Safari — home-screen
icon, standalone display with no browser chrome, offline-capable after a first visit — via
`vite-plugin-pwa`, without any app-store presence.

- **`vite.config.js`** registers `VitePWA({ registerType: 'autoUpdate', includeAssets: [...], manifest:
  {...} })` alongside the existing `react()` plugin, using the plugin's default `generateSW` strategy
  (appropriate for this fully static, no-backend SPA — no custom runtime caching rules are configured).
  `start_url`/`scope` are **not** set explicitly in the manifest config — `vite-plugin-pwa` derives both
  from the top-level `base: '/tens/'` config automatically, confirmed by inspecting
  `dist/manifest.webmanifest` after `yarn build` (both resolve to `/tens/`, matching the GitHub Pages
  project-page subpath).
- **Manifest fields:** `name`/`short_name: 'Tens'`, `display: 'standalone'`, and `theme_color`/
  `background_color` both set to `#0c0d11` — the dark theme's `color.page` token value (see
  `docs/THEMING_REFERENCE.md`) — so the OS install/splash chrome matches the app's own dark ground
  rather than introducing an unrelated color.
- **Icons:** `public/pwa-192x192.png`, `public/pwa-512x512.png` (both `purpose` unset, i.e. `any`), and
  `public/pwa-maskable-512x512.png` (`purpose: 'maskable'`, with extra interior padding so the glyph
  survives an OS's own icon-mask cropping), plus `public/apple-touch-icon.png` (180×180, iOS's own
  convention, referenced directly from `index.html` rather than the web manifest since iOS Safari
  doesn't fully respect the manifest icons list). All four are generated PNGs — see
  `scripts/generate-pwa-icons.mjs` — rasterized via `sharp` from small inline SVG sources (a centered
  "10" glyph in the dark theme's `accent` color, `#7c9bff`, on the `page` background, `#0c0d11`) rather
  than hand-crafted per size.
- **`index.html`** carries the iOS-specific meta tags `vite-plugin-pwa` doesn't inject on its own:
  `apple-touch-icon` link, `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`
  (`black-translucent`), `apple-mobile-web-app-title`, plus a `theme-color` meta tag (browser-chrome
  coloring, independent of the manifest's own `theme_color`).
- **Save data is unaffected.** The service worker (`generateSW`'s precache) only caches build-time
  static assets (JS/CSS/HTML/icons) — it has no interaction with `localStorage`, which is what
  `src/game/storage.js`'s save/load already uses exclusively. No change was needed there.
- **Not wired into `ci.yml`.** `yarn build` already produces a valid `manifest.webmanifest` + service
  worker as part of the normal production build — no separate PWA-specific CI step exists or is needed;
  `ci.yml` itself is one of the protected workflow files `autonomous-maintenance.yml` can't edit anyway
  (see `docs/AUTOMATION.md`).
