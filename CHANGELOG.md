# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Auto-Prestige Autobuyer: a new PP Upgrades purchase that automates re-leveling Auto-Prestige itself once activated, with its own pause/resume toggle.
- A new **Milestones** view (a third page tab alongside Game/Upgrades) tracking every tier's autobuyer-unlock and tier-tickspeed-autobuyer-unlock progress in one place — which tiers are already unlocked, and how many more prestiges each locked tier still needs.

### Changed
- Tier autobuyer unlock and the tier tickspeed autobuyer are no longer Prestige Point purchases — each unlocks automatically once you've prestiged enough times: the unit-buying autobuyer unlocks after the 1st prestige for the first tier, the 2nd for the second tier, … the 10th for the last tier; its own tickspeed autobuyer unlocks later, starting at the 12th prestige for the first tier and every 2 prestiges after that per subsequent tier (up to the 30th for the last tier). The PP Upgrades page's "Tier Autobuyers" category shows a locked tier as a `🔒 Prestige N` badge instead of a Buy button while its milestone is still pending. Every other PP Upgrades purchase (Smart, Auto Speed Up, the Tickspeed Autobuyer, Auto-Prestige, Auto-Prestige Autobuyer, the production speed bonus) is unaffected and still costs PP as before.
- The Milestones page's two category descriptions are now collapsed by default (click the category heading to expand), matching the collapsed-by-default convention every other card description in the app already follows, and their text is shorter.
- Trimmed redundant tooltip/label text on the milestone badges (locked/unlocked tier autobuyer and tier tickspeed autobuyer indicators, on both the PP Upgrades and Milestones pages) — a badge no longer restates the same milestone number its own visible text already shows; a locked badge's tooltip now surfaces only the one thing it wasn't already showing (your current prestige count), and an already-unlocked badge has no tooltip at all.
- The PP Upgrades page's "Tier Autobuyers" category now shows one shared, collapsible "How these controls work" panel above the per-tier rows (unlock timing, pause/resume, and what Smart does) instead of repeating that explanation in every badge/button's hover tooltip, which are now removed. Each tier's row is also reordered — the tier tickspeed autobuyer cluster now comes before the unit-buying autobuyer cluster, with Smart grouped alongside the unit-buying autobuyer control it modifies — to match the same badge order already used on the tier's Game-view row, making the two views easier to correlate at a glance.
- Speed Up's stacking production multiplier (`speedUpCount`) now resets to 0 on Prestige instead of carrying over permanently — it must be rebuilt within each Prestige cycle. The Auto Speed Up automation toggle itself is unaffected and still carries over.
- The Buy button's visible block-progress text drops the `Lv.` prefix and now shows `{progress}+{affordable}/{blockSize}` (e.g. `5+3/8`) instead of `Lv.{level} ({progress}/{blockSize})`.
- Once the last tier's XP-funded tickspeed is unlocked, its existing tier tickspeed autobuyer (if bought) now automatically consumes XP each tick instead of sitting inert — no manual click needed. This repurposes the existing toggle: a player who bought it earlier for its original Money-funded purpose will start getting automatic, periodic resets of every other tier's progress once the last tier crosses the XP-unlock threshold.
- Removed the per-tier unit-autobuyer pause/resume button from the Game view tier rows to reduce clutter — the row still shows a read-only status badge, and the actual pause/resume control now lives on the PP Upgrades page's Tier Autobuyers category alongside the tier tickspeed autobuyer's own toggle.
- Renamed the tier tickspeed autobuyer's PP Upgrades purchase button from the ambiguous "Auto for {cost} PP" to "Auto-Tickspeed for {cost} PP".
- Every automation status badge (unit autobuyer, tier tickspeed autobuyer, global tickspeed autobuyer, Auto Speed Up, Auto-Prestige Autobuyer, Auto-Prestige) now shows as a single icon — dimmed while paused, full opacity while active — instead of spelling out the word "Active"/"Paused"; the full status still reaches assistive tech via `aria-label`/`title`.
- Any production-speed bonus that reaches or exceeds +100% (tier/global tickspeed bonus, Prestige's production speed bonus) now displays as an "Nx" multiplier (e.g. `2x`) instead of a percentage, matching Speed Up's own multiplier convention; bonuses under +100% still show as a percentage.
- Removed the bottom Prestige panel (Game view) entirely — the Prestige Points display at the top of the page already doubles as the Prestige button once available, so once the bottom panel's own button was removed as redundant, the panel had nothing left to offer beyond what's already shown in the sticky PP display and the PP Upgrades page.
- A tier row's expanded Details, and every other expandable card description (Header, Global Tickspeed Multiplier, Speed Up, Prestige, the PP Upgrades "full smart autobuyer" notice), now automatically collapses once it scrolls fully out of the viewport.
- The Money balance's hero figure now renders in the body font (Inter) instead of the display font (Space Grotesk) — its large size/elevation is unchanged, only the typeface.

### Fixed
- On iOS home-screen installs (the app's `black-translucent` status bar draws content edge-to-edge), the page's scrollable area didn't clear the home-indicator safe zone at the bottom, so on a tall tier list the last row's Buy button could be scrolled to but never fully into reach — not just visually clipped, unclickable. `index.html`'s viewport meta now sets `viewport-fit=cover`, and the page content plus every fixed/sticky overlay (offline-progress notice, sticky balances bar, the full-screen and top Prestige banners) now pad for `env(safe-area-inset-*)` so scrolling reaches the full page and none of that chrome sits under the status bar or home indicator.
- Light theme's `good` token (`#12a150`) only reached 3.37:1 contrast against the `surface`/`surfaceSunken` backgrounds it renders text on — below WCAG AA's 4.5:1 threshold — caught by a new automated contrast audit (`src/theme/tokens.contrast.test.js`). Darkened to `#0a6b30` (6.65:1 / 5.87:1). No visible effect yet since light mode isn't activated until #140.
- The Speed Up card's displayed last-tier level and requirement (`Lv.{level}/{requirement}`) were both off by one from what a player would intuitively expect from purchase counts — completing the last tier's first purchase block (8 purchases at the default block size) showed `Lv.2` instead of `Lv.1`, and two blocks (16 purchases) showed `Lv.3` instead of `Lv.2`. The displayed numbers (and the requirement shown in the card's description/`aria-label`/money-balance breakdown) now read as completed blocks, matching purchase counts directly; the underlying eligibility check is unchanged.
- Fixed a visual flicker in the sticky Money/Prestige Points balance bar while scrolling, caused by its compressed/expanded layout toggling right at the scroll boundary that triggers it.
- Speed Up left `prestige.highestMilestone` (the money-exponent watermark XP is earned against) untouched instead of resetting it like Prestige already did, so a run after at least one Speed Up earned far less XP than it should have — money had to silently re-climb past the previous run's peak exponent before any new XP accrued. `highestMilestone` now resets on Speed Up too, so a fresh run's unspent XP always matches its current money exponent.

### Security
- Pinned the `vite-plugin-pwa` build toolchain's `glob > minimatch > brace-expansion` dependency to `^5.0.8` via a `resolutions` override, fixing a high-severity ReDoS/OOM advisory (`yarn audit`) in the version it previously resolved to. Build-time only — no runtime/user-facing impact.
- Pinned the `vite-plugin-pwa` build toolchain's `workbox-build > ajv > fast-uri` dependency to `^3.1.5` via a `resolutions` override, fixing a high-severity host-confusion advisory (`yarn audit`) in the `3.1.4` version it previously resolved to. Build-time only — no runtime/user-facing impact.

## [0.5.0] - 2026-07-14

### Added
- Low-risk auto-merge, recurring gap analysis, and per-run budget discipline for the autonomous maintenance workflow.
- The Bulk (×1/×10) toggle now persists across page reloads.

### Changed
- Buttons use short symbols with a more compact tier row layout; autobuyer upgrades are now guarded against zeroing out a tier's own generator count.
- Full agent output is now shown in maintenance workflow runs for diagnosability.

### Fixed
- Granted the `issues` permission so the maintenance workflow's guard step can see the task backlog.

## [0.4.0] - 2026-07-13

### Added
- Scheduled autonomous maintenance workflow, PR follow-up automation, and auto-merge-on-approval.
- Cost-block progress folded into the Buy button's fill, with tooltips and a denser mobile layout.

### Changed
- Buy button moved to the rightmost column, ahead of Upgrade/Unlock.
- Pivoted autonomous maintenance to a GitHub Issues task backlog; raised unattended-run turn budgets.

### Fixed
- CodeQL-flagged injection and untrusted-checkout risks; a TOCTOU gap in PR follow-up, fixed by pinning checkout to a commit SHA.
- Gated `autonomous-pr-followup.yml` on commenter/reviewer write access.
- Disabled-button contrast, a focus-visible ring, and `aria-describedby` wiring for destructive actions.
- Minimised duplicate autonomous PRs without blocking genuinely independent ones.

## [0.3.0] - 2026-07-13

### Added
- Separate Owned vs. Purchased tracking, with exponential formatting above 1,000,000.
- Prestige progress shown as a percentage of the money exponent.
- A pull request template.

### Changed
- Decoupled manual Buy from the ×1/×10 toggle; autobuyers now batch independently.
- Autobuyers prioritize higher tiers when competing for shared funds.
- Manual Buy grabs the maximum affordable quantity instead of always buying 1.
- Tier row layout made stable regardless of value length.

### Fixed
- The Upgrade mechanic now correctly boosts autobuyer purchase yield instead of passive production.
- Inconsistent currency notation in the per-tier production rate.

## [0.2.0] - 2026-07-12

### Added
- `CLAUDE.md` documenting the project's architecture and conventions.
- Redesign to a compact one-line-per-tier layout with currency formatting.
- A Googol-based prestige system.

### Fixed
- Tier-rename regressions and a broken Copilot review workflow.
- Next-XP currency formatting and `formatCurrency` rounding up fractional balances.
- Legacy XP migration, bulk-buy affordability, and accessibility issues raised in PR review.

## [0.1.0] - 2026-07-05

### Added
- Initial incremental-game engine, tier layers, and page scaffold.
