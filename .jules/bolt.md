## 2024-05-24 - Bulk Purchase State Updates in React Incremental Game
**Learning:** Performing `O(n)` loop state updates for bulk purchases (`N` iterations deep-cloning an immutable state tree) creates a major performance bottleneck, especially in incremental games with autobuyers running continuously.
**Action:** Replace `for` loops with mathematical formulas using division/modulo for `O(1)` updates for resource costs and level crossing boundary math to maintain fast and predictable state updates for bulk processing.
