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
