# ComputePage reference

Referenced from `CLAUDE.md`'s Repo layout/Architecture sections. Read this before touching
`src/pages/ComputePage/index.jsx` — the field-by-field reference for the Compute merge chain page
(issue #280). See `docs/ECONOMY_REFERENCE.md`'s "Byte Foundry" section (step 9's "Merging Cores
upward" subsection) for the full engine-level spec of the merge functions themselves
(`mergeComputeNodesIntoCluster`/`mergeComputeClustersIntoNetwork`/`mergeComputeNetworksIntoGrid`
in `engine.js`) — this doc only covers the page's own layout and wiring.

## Reachability

`ComputePage` is a separate top-level page, alongside `MainPage`/`ByteFoundryPage`/`InfoPage`,
toggled via `App.jsx`'s local `page` `useState` (`page === 'compute'`) — no routing library, same
convention every other page switch already uses. Reachable only via MainPage's own header link,
"🖥️ Compute" (`onOpenCompute` prop, rendered beside "⚙️ Byte Foundry"/"ℹ️ Guide"), which is itself
hidden until `state.intro.computeMergePageUnlocked` is true — a permanent, one-time reveal latch
(see `docs/ECONOMY_REFERENCE.md`) that flips the first time the player's cumulative Compute Core
total ever reaches 8, regardless of Node conversion happening the very same tick. Its own
`onBack` always navigates back to `'game'` (MainPage) — unlike `ByteFoundryPage`, there's no
mandatory-gate variant of this page; it's purely voluntary once unlocked. `App.jsx`'s
`showingFoundry` gate check explicitly excludes `page === 'compute'` (the same courtesy already
extended to `'info'`), so a Prestige/Auto-Prestige firing in the background while this page is
open doesn't yank the player off it.

## Layout, top to bottom

1. A `Header` row (`display: flex`, `justify-content: space-between` — the same title/nav-link
   placement convention `MainPage`/`ByteFoundryPage`/`InfoPage` all already use) pairing the page
   title ("🖥️ Compute") with a "← Back to game" button (`aria-label="Back to game"`, calling
   `onBack` — always present, unlike `ByteFoundryPage`'s conditional one).
2. A one-line `StatusText` explainer: merging is manual (nothing merges automatically), and every
   compute-ladder entity is capped at `COMPUTE_ENTITY_CAP` (10).
3. A `StatCard` (`aria-label="compute counters"`) showing all five compute-ladder counters —
   Cores, Nodes, Clusters, Networks, Grids, each as `N/10` — even though only the latter three are
   ever spent/produced by this page's own buttons. Cores/Nodes are shown here too, for context:
   deciding whether to merge Nodes into a Cluster needs the current Node count visible right next
   to the button that spends it. `ByteFoundryPage`'s own "Compute" status section deliberately
   keeps showing only Cores/Nodes — Clusters/Networks/Grids live on this page and nowhere else, so
   the two pages never show duplicate copies of the same numbers (see the comment on
   `ComputeSection` in `ByteFoundryPage/index.jsx`).
4. Three merge buttons, one per tier boundary, top to bottom: "Merge 8 Nodes → 1 Cluster", "Merge
   8 Clusters → 1 Network", "Merge 8 Networks → 1 Grid" (`variant="prestige"`, matching
   `ByteFoundryPage`'s own Compute Boost buttons' styling). Each calls its matching
   `game.actions.mergeComputeNodesIntoCluster`/`mergeComputeClustersIntoNetwork`/
   `mergeComputeNetworksIntoGrid` (wired in `useIncrementalGame.js`, no arguments). `disabled`
   mirrors the engine's own gate (`canMerge(input, output)`: input ≥ `COMPUTE_MERGE_RATIO` (8) and
   output < `COMPUTE_ENTITY_CAP`) — a UI-only mirror, not a replacement for it; `engine.js`
   re-validates on every call regardless (see "Security notes" in CLAUDE.md). Each button's
   `aria-label` spells out the full action (e.g. "merge 8 compute nodes into 1 compute cluster");
   its `title` explains the cost when enabled, or why it's blocked (input balance, or the output
   already at cap) when disabled.

## Props

`ComputePage` takes `{ game, onBack }` — `game` is the full `{ state, actions, ... }` object from
`useIncrementalGame`, same shape every other page receives (see CLAUDE.md's Architecture section).
Unlike `ByteFoundryPage`, `onBack` is unconditional here (always passed by `App.jsx`) since this
page has no mandatory-gate variant.
