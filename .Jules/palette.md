## 2026-08-29 - Missing tooltips on icon-only buttons
**Learning:** `PauseToggleButton` instances used an `aria-label` but lacked a visual `title` attribute for tooltips in the autobuyer tiers, reducing clarity.
**Action:** Always ensure `title` matches `aria-label` for icon-only button implementations if the surrounding components do so, ensuring visual context for mouse users.
