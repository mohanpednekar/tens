# Dev Mode Reference

Full mechanism reference for Dev Mode (moved verbatim from `CLAUDE.md`'s "Dev Mode" section).

A local testing sandbox for seeding/experimenting with game state — **not** a player-facing feature:
its entry point (`AppMenu`'s "Dev Mode" button) and page route both render only when
`import.meta.env.DEV` is true, so `yarn build`'s production bundle contains neither (verified by
grepping `dist/assets/*.js` for page-specific strings — see this feature's own PR). `yarn dev`/`yarn
test` (Vitest defaults `import.meta.env.DEV` to true) both expose it.

Enabling Dev Mode (`game.toggleDevMode()`) does **not** touch any real player save. `game/storage.js`
resolves every save read/write through `getActiveSlotId()`, which — while `isDevModeActive()` is true —
returns a dedicated `'dev'` slot id (its own storage keys, `tens_dev_state`/`tens_dev_timestamp`,
distinct from any of the `FREE_SLOT_COUNT`/`SUPPORTER_SLOT_COUNT` player slots and never counted or
listed by `listSaveSlots`), so every existing save/load helper (`loadGameState`, `saveGameState`,
`clearGameState`, …) is transparently redirected. Toggling off resumes the real save where it was left;
toggling on for the first time starts from a fresh `createInitialGameState()`.
`isDevModeActive`/`setDevModeActive` persist the flag itself (`tens_dev_mode_active`) separately from
`tens_saves_meta`, so flipping it never touches player slot bookkeeping.

`DevModePage` offers three ways to seed/experiment, all going through `useIncrementalGame`'s
`setDevState`/`applyDevStateJson` (both no-op outside Dev Mode as a defense-in-depth guard, though the UI
only renders them while active):
- **Quick seed** — one-click presets (`PRESETS` in `DevModePage`) applying a small delta onto the live
  state via `game.setDevState(updater)`, e.g. unlocking the Byte Factory gate or setting Bits to the
  Prestige threshold. They reference the same `layers.js` constants
  (`PRESTIGE_THRESHOLD`/`ERA_ELIGIBILITY_PP`/etc.) the real game gates on, so they can't drift.
- **Variables** — not a hand-maintained field list: `DevModePage`'s `FieldNode` recursively walks
  `game.state` and renders one row per scalar leaf (number/string get a text input + Set; booleans
  toggle on click), nested under a collapsible `<details>` per object ancestor (so
  `intro.dataLakes.1.purchased` renders under `intro` → `dataLakes` → `1`, mirroring the state shape).
  `stateFields.js`'s `prettifySegment` relabels a key that is a known tier id (e.g. `owned.tier01`)
  with that tier's display name via a `TIER_DEFINITIONS`/`COMPUTE_FLOPS_TIER_DEFINITIONS` lookup — the
  only place this page references tier data, purely cosmetic. A new state key shows up automatically
  with zero changes here — the "always in sync with the game code" property this section exists for.
  `null`/`undefined` leaves (structural "not yet built" sentinels, e.g. `intro.diskBuild`) and arrays
  (e.g. `prestigeMuseum.history`) are skipped; only the raw JSON editor can touch them.
  `setValueAtPath` sets one leaf immutably by its full path array, at any depth, without disturbing
  siblings.
- **Raw state JSON** — a textarea pre-filled with `JSON.stringify(game.state, null, 2)`; Apply calls
  `game.applyDevStateJson(text)` → `storage.js`'s `applyDevGameStateJson(jsonText, currentState)`.
  A caller only specifies the fields they're changing (e.g. `{ "resources": { "base": 1e50 } }`) —
  `mergeStateForDevWrite` one-level-deep merges the parsed object onto `currentState` before writing,
  so untouched top-level fields (and untouched siblings inside an edited object, e.g.
  `resources.bytes`) survive. The merge is required, not cosmetic: a bare `{ "resources": {...} }`
  would omit `intro`, which `save-migration/detectLegacy.js`'s `getSaveIncompatibilityReason` treats as
  a legacy save (`'missing_intro'`) and rejects. The merged payload is then re-read through the same
  `adaptSaveForCurrentSchema` + `mergeState` pipeline a real load uses, filling any remaining gap from
  `createInitialGameState()`.

`resetDevState` (Settings-style confirm in the UI) wipes the dev save back to fresh via
`clearDevGameState` (bypasses `clearSaveSlot`'s numbered-slot validation — `'dev'` is never one of
the numbered player slots it checks against).

**Real-slot isolation is enforced at the storage layer, not just by hiding UI.** `setActiveSaveSlot`,
`clearSaveSlot`, `clearAllSaveProgress` (all in `storage.js`, reachable from `SettingsPage`) target an
explicit numbered slot or iterate every real slot, bypassing `getActiveSlotId`'s dev-mode redirect
(which only helps `loadGameState`/`saveGameState`/`clearGameState`). All three now refuse to run
(`{ ok: false, reason: 'dev_mode_active' }`) whenever `isDevModeActive()` is true, so Settings'
"Play"/"Clear"/"Erase all save progress" can never destroy or repoint a real save while Dev Mode shows
the dev save — a real bug this feature's adversarial review caught before merge.
`useIncrementalGame`'s `eraseAllSaveProgress`/`clearSlot`/`switchSaveSlot` check that `ok` flag before
touching React state. `SettingsPage` additionally disables those buttons
(`title="Disable Dev Mode first"`) while `game.devModeActive`, written as
`import.meta.env.DEV && Boolean(game.devModeActive)` so Terser/Rollup fold the branch (and its "Dev
Mode" copy) out of a production build — `SettingsPage` isn't itself dev-gated. `clearGameState` (used
by `resetGame`) routes to `clearDevGameState` instead of the now-guarded
`clearSaveSlot(getActiveSlotId())` while Dev Mode is active, so "Reset active save" still wipes the dev
save rather than no-op-ing against a refused call.
