# PWA support reference

Referenced from `CLAUDE.md`'s "PWA support" section. Full breakdown of the installable-PWA setup, so
`CLAUDE.md` keeps only a short summary — the same split already applied to
`docs/MAINPAGE_REFERENCE.md`/`docs/COMPONENTS_REFERENCE.md`. Read this before touching `vite.config.js`'s
`VitePWA` block, the manifest fields, `public/pwa-*.png`/`apple-touch-icon.png`, or
`scripts/generate-pwa-icons.mjs`. For the *why* behind choosing this over Capacitor/native app-store
publishing or a React Native rewrite, see `docs/DESIGN_HISTORY.md`. A Capacitor foundation is in
progress (#70): `yarn build:capacitor` (`CAPACITOR=1`) rebuilds `dist/` with `base: './'` and
**without** `VitePWA`, so a Workbox SW is not injected into the native shell. Ordinary `yarn build`
(Pages + PWA) is unchanged.

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
  doesn't fully respect the manifest icons list), plus `public/favicon.ico` (browser-tab icon,
  served from the implicit `/favicon.ico` convention — no explicit `<link rel="icon">` in
  `index.html`). All five are generated — see `scripts/generate-pwa-icons.mjs` — rasterized via
  `sharp` from a small inline SVG source: an 8-cell "byte" grid (4 columns × 2 rows of rounded
  squares, each filled with a diagonal gradient sweeping through the dark theme's `accent` →
  `violet` → `good` tokens, `#7c9bff` → `#b39bff` → `#57d98a`, on the `page` background, `#0c0d11`)
  — replacing an earlier plain serif "10" text glyph; see `docs/DESIGN_HISTORY.md` for the redesign
  and why `favicon.ico`'s three embedded frames (16/32/48px) use a simplified 2×2/4-cell version of
  the same grid instead of the full 8-cell one (illegible at a true 16×16 render). `favicon.ico` is
  hand-assembled by the same script (a minimal ICO container embedding modern-format PNG frames
  directly — no extra dependency beyond `sharp`, already required for the PNG rasterization).
- **`index.html`** carries the iOS-specific meta tags `vite-plugin-pwa` doesn't inject on its own:
  `apple-touch-icon` link, `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`
  (`black-translucent`), `apple-mobile-web-app-title`, plus a `theme-color` meta tag (browser-chrome
  coloring, independent of the manifest's own `theme_color`).
- **Safe-area insets.** The viewport meta tag includes `viewport-fit=cover` — required for
  `black-translucent` (content draws under the iOS status bar/home indicator on a home-screen
  install) to pair with non-zero `env(safe-area-inset-*)` values; without `viewport-fit=cover` those
  env vars always resolve to `0`. `MainPage/index.jsx`'s `RootDiv` (the page's own top/bottom
  padding) and every `position: fixed`/`sticky` element (`OfflineNoticeOverlay`, `FullScreenOverlay`,
  `TopPrestigeBar`, `StickyBalances`) pad/offset for the relevant insets so page content always
  scrolls fully clear of the status bar and home indicator, and fixed/sticky chrome never renders
  underneath either — see the "Fixed" entry in `CHANGELOG.md` for the bug this closes (a tier row's
  Buy button could become unscrollable-to, not just visually clipped, once the tier list grew tall
  enough on an iOS home-screen install).
- **Save data is unaffected.** The service worker (`generateSW`'s precache) only caches build-time
  static assets (JS/CSS/HTML/icons) — it has no interaction with `localStorage`, which is what
  `src/game/storage.js`'s save/load already uses exclusively. No change was needed there.
- **Not wired into `ci.yml`.** `yarn build` already produces a valid `manifest.webmanifest` + service
  worker as part of the normal production build — no separate PWA-specific CI step exists or is needed;
  `ci.yml` itself is one of the protected workflow files `autonomous-maintenance.yml` can't edit anyway
  (see `docs/AUTOMATION.md`).
