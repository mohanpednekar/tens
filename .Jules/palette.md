## 2024-08-28 - Focus Visible Styles for styled-components
**Learning:** Custom `styled.button` components in this app often lack explicit `&:focus-visible` styles, which degrades keyboard accessibility.
**Action:** Always ensure `&:focus-visible` is added to any new or modified custom interactive elements.
## 2024-08-29 - Interactive polymorphic components missing focus states
**Learning:** Components that dynamically switch to an interactive role (e.g. `as="button"` and `$tappable` props) often omit base focus states because they were originally styled as static containers (e.g., `styled.div`). This creates significant keyboard navigation blind spots for core interactions.
**Action:** When working with polymorphic components or conditional interactivity, ensure keyboard focus states (`&:focus-visible`) are explicitly declared alongside hover and active states.
## 2025-01-31 - Focus Visible Styles for custom trigger elements
**Learning:** Elements acting as triggers with `role="button"` and `tabIndex={0}` (like `TierNameTrigger`) that are built with `styled.div` often lack explicit `&:focus-visible` styles, which degrades keyboard accessibility.
**Action:** Ensure `&:focus-visible` is added to any custom interactive elements masquerading as buttons to maintain keyboard navigation flow.
## 2026-09-04 - Focus Visible Styles for styled native summary elements
**Learning:** Native `<summary>` elements in styled `<details>` (like `Disclosure`) or standard components like `TierLine` using `cursor: pointer` can lack explicit `&:focus-visible` styles, leading to inconsistent keyboard accessibility when they're customized with `styled-components`.
**Action:** When restyling `<details>` or elements indicating interactivity via `cursor: pointer`, always ensure explicit `&:focus-visible` outlines are provided for keyboard navigation visibility.
## 2026-09-06 - Focus Visible Styles for custom interactive components and Disclosure summary elements
**Learning:** Custom components with `cursor: pointer` like `TierLine` that simulate button functionality often omit focus states, impairing keyboard navigation. Furthermore, native `<summary>` elements inside custom `<details>` (like `Disclosure`) require an explicit `:focus-visible` ring rather than relying on browser defaults to ensure proper keyboard accessibility within a styled-components environment.
**Action:** When creating or modifying custom interactive elements with styled-components (such as `TierLine` and `Disclosure` summary elements), ensure `&:focus-visible` outlines are explicitly added to maintain standard keyboard accessibility flow.
## 2024-11-20 - Data Lake Auto-buy button accessibility
**Learning:** Found a toggle button component missing the `aria-pressed` attribute which is important to communicate the current state to screen reader users correctly. Other automation toggles in the app had it, but the Data Lake Auto-buy button was missing it. Also dynamic `aria-label` changing between enable/disable is confusing for screen readers when `aria-pressed` is used, the label should be static.
**Action:** Always verify `aria-pressed` on toggle buttons acting as on/off states and ensure `aria-label` is static when `aria-pressed` is managing the announcement of the state.
