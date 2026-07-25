# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

### Changed

### Fixed

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
