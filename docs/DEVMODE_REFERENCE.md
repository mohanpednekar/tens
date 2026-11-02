# Dev Mode Reference

Full mechanism reference for Dev Mode (moved verbatim from `CLAUDE.md`'s "Dev Mode" section).

A local testing sandbox for seeding/experimenting with game state — **not** a player-facing feature:
its entry point (`AppMenu`'s "Dev Mode" button) and page route both render only when
`import.meta.env.DEV` is true, so `yarn build`'s production bundle contains neither (verified by
grepping `dist/assets/*.js` for page-specific strings — see this feature's own PR). `yarn dev`/`yarn
test` (Vitest defaults `import.meta.env.DEV` to true) both expose it.

**Dev build.** `yarn build:dev` (`TENS_DEV_BUILD=1`, `viteConfigFactory.js`'s `devBuild`) is a minified
production bundle with `import.meta.env.DEV` forced true, base `/tens/dev/`, and no service worker, so
Dev Mode works on a phone. `deploy.yml` builds prod into `dist/` then dev into `dist/dev/`, so Pages
serves prod at `/tens/` and dev at `/tens/dev/`. Both share one origin, so the dev build wraps
`localStorage` (`game/storagePrefix.js`, `VITE_TENS_STORAGE_PREFIX=dev:`) and every key it touches is
`dev:<key>` — its saves, slots, meta and preferences never appear in the main game and vice versa. Dev Mode (any build) and the dev build
(`VITE_TENS_DEV_BUILD=1`) have no backward-compat obligation (`isBackwardCompatExempt`): `storage.js`'s
`adaptSaveForLoad` accepts any plain-object save (missing fields filled by `mergeState`, no
save-migration, no `IncompatibleSaveNotice`; an unreadable save is silently dropped). Production keeps
the full migration path.
The prod SW denylists `/tens/dev/`.

Dev Mode edits never touch real player progress. Toggling it (`game.toggleDevMode()`) first saves the
currently loaded state to whichever slot is active, exactly as `switchSaveSlot` does, so enabling it
writes the real slot one last time before switching away. After that, `game/storage.js`
resolves every save read/write through `getActiveSlotId()`, which — while `isDevModeActive()` is true —
returns a dedicated `'dev'` slot id (its own storage keys, `tens_dev_state`/`tens_dev_timestamp`,
distinct from any of the `FREE_SLOT_COUNT`/`SUPPORTER_SLOT_COUNT` player slots and never counted or
listed by `listSaveSlots`), so every existing save/load helper (`loadGameState`, `saveGameState`,
`clearGameState`, …) is transparently redirected. Toggling off resumes the real save where it was left;
toggling on for the first time starts from a fresh `createInitialGameState()`.
`isDevModeActive`/`setDevModeActive` persist the flag itself (`tens_dev_mode_active`) separately from
`tens_saves_meta`, so flipping it never touches player slot bookkeeping.

`DevModePage` mirrors the real game's UI: a header card with a Perks-style `Switch` (`aria-label="dev
mode"`) and HUD-style readouts (Bits, PP, Prestiges, Era · Eons, Capacity), then three ways to
seed/experiment, all going through `useIncrementalGame`'s `setDevState`/`applyDevStateJson` (both
no-op outside Dev Mode as a defense-in-depth guard, though the UI only renders them while active):
- **Quick seed** — one-click presets (`PRESET_GROUPS` in `DevModePage`, grouped Foundry / Factory /
  Prestige / Era) applying a small delta onto the live state via `game.setDevState(updater)`, e.g.
  unlocking the Byte Factory gate, Bits to the Prestige threshold, +1 Prestige count. They reference
  the same `layers.js` constants (`PRESTIGE_THRESHOLD`/`ERA_ELIGIBILITY_PP`/etc.) the real game gates
  on, so they can't drift.
- **Variables** — not a hand-maintained field list: `FieldNode` recursively walks `game.state`, one
  row per leaf, nested under a collapsible `<details>` per object ancestor. Top-level keys are split
  into AppNav-style icon tabs (Foundry / Compute / Factory / Perks / Prestige / Era) by
  `stateFields.js`'s rule-based `VARIABLE_AREAS`/`getVariableAreaId` (key-pattern match, unmatched
  keys fall through to Factory — never dropped). A `type="search"` box (`collectLeaves` +
  `leafMatchesQuery`) filters every leaf across all tabs by dotted path or prettified label
  (`describePath`, e.g. "owned › Kilobytes"), capped at 60 rows. Input per type: booleans are a
  `Switch` (applies instantly); numbers are a `inputMode="decimal"` text input that shows the live
  value, commits on Enter or ✓ (`set <path>`), reverts on Escape, parses `1e100` / `1,000` / `10^6`
  via `parseNumberDraft` (anything else is flagged `aria-invalid` and ✓ disabled — never coerced to 0),
  echoes large values through `formatAmount`, and offers ÷10 / ×10 steppers (plus −1 / +1 for whole
  numbers, floored at 0); strings are a plain text input with the same Enter/✓ commit. `null` and
  array leaves render read-only ("not set" / "[n items]") — only the raw JSON editor can touch them.
  `prettifySegment` relabels tier ids with display names (cosmetic only). `setValueAtPath` sets one
  leaf immutably by its full path array. `setDevState` then runs the result through
  `normalizePoolMemoryCapacity` (the same clamp a real load applies), so bounded fields don't keep
  out-of-range edits: e.g. a Data Lake's `capacityLevel` is clamped to
  `[0, DATA_LAKE_CAPACITY_MAX_LEVEL]` and truncated to a whole level, `intro.capacity` is floored at 0,
  and an armed Upgrade Data Stream that can't fire is cleared. A value that "doesn't stick" was
  normalized, not ignored.
- **Raw state JSON** — collapsed under "Advanced"; a textarea pre-filled with
  `JSON.stringify(game.state, null, 2)` (reloaded whenever Dev Mode toggles), with live parse
  validation (Apply disabled on invalid JSON or a non-object), ↻ Load live state, and ⧉ Copy. Apply
  calls `game.applyDevStateJson(text)` → `storage.js`'s `applyDevGameStateJson(jsonText, currentState)`.
  A caller only specifies the fields they're changing (e.g. `{ "resources": { "base": 1e50 } }`) —
  `mergeStateForDevWrite` recursively merges the parsed object onto `currentState` at every depth
  before writing, so untouched top-level fields and untouched siblings inside any edited object (e.g.
  `resources.bytes`, or `intro.dataLakes.2` when only `intro.dataLakes.1` is given) survive. The merge is required, not cosmetic: a bare `{ "resources": {...} }`
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
