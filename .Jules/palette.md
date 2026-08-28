## 2024-08-25 - Focus-visible styles on interactive styled components
**Learning:** Custom components created via `styled.button` (or similar interactive elements) often miss the global focus states applied to primary interactive elements if not explicitly added.
**Action:** When auditing custom interactive components, always check for `:focus-visible` to ensure keyboard navigability matches primary elements like `Button`.
