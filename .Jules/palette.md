## 2024-08-28 - Focus Visible Styles for styled-components
**Learning:** Custom `styled.button` components in this app often lack explicit `&:focus-visible` styles, which degrades keyboard accessibility.
**Action:** Always ensure `&:focus-visible` is added to any new or modified custom interactive elements.
## 2024-08-29 - Interactive polymorphic components missing focus states
**Learning:** Components that dynamically switch to an interactive role (e.g. `as="button"` and `$tappable` props) often omit base focus states because they were originally styled as static containers (e.g., `styled.div`). This creates significant keyboard navigation blind spots for core interactions.
**Action:** When working with polymorphic components or conditional interactivity, ensure keyboard focus states (`&:focus-visible`) are explicitly declared alongside hover and active states.
