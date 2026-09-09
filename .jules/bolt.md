## 2024-05-24 - Bulk Purchase State Updates in React Incremental Game
**Learning:** Performing `O(n)` loop state updates for bulk purchases (`N` iterations deep-cloning an immutable state tree) creates a major performance bottleneck, especially in incremental games with autobuyers running continuously.
**Action:** Replace `for` or `while` loops with mathematical formulas using division/modulo for `O(1)` updates for resource costs and level crossing boundary math to maintain fast and predictable state updates for bulk processing. Also, refactor the underlying action (like `buyBooster`) to accept a `quantity` parameter rather than manually updating state inside the autobuyer, preventing code duplication and side-effect bypasses.

## 2024-06-25 - Replace O(N) cost epoch exponent calculation with O(1) mathematical equivalent
**Learning:** Performing `O(N)` loop calculation for `getCostEpochExponent` creates an unnecessary overhead that grows linearly with the level, especially since this is called frequently for every level of bulk purchase loops.
**Action:** Replace `for` or `while` loops with `O(1)` mathematical equivalent formulas where possible to maintain fast and predictable calculation for long-running incremental games. For instance, the summation of linear increments used in cost curves can be replaced with quadratic functions (e.g. `2 + ((e - 1) * e) / 2`).
