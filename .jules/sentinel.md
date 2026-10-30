## 2026-08-25 - Defense in Depth: Content Security Policy
**Vulnerability:** No Content Security Policy (CSP) headers or meta tags were present.
**Learning:** Even static frontend-only applications can benefit from CSP as a defense-in-depth measure against injected scripts or malicious dependencies.
**Prevention:** Apply a strict CSP meta tag limiting execution and asset loading to expected sources.
## 2026-08-28 - Prototype Pollution in Dev Mode State Merge\n**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`) iterated over all object keys without filtering out `__proto__` and `constructor`, creating a prototype pollution vulnerability vector.\n**Learning:** Even if the initial parsing step (`safeJsonParse`) attempts to sanitize inputs, custom deep merge logic can easily re-introduce the vulnerability if an object with these properties sneaks past, or when merging nested objects.\n**Prevention:** Always explicitly check for and skip `__proto__` and `constructor` inside any custom object mapping, reduction, or deep-merge logic, especially when dealing with parsed JSON or external state inputs.
## 2026-08-29 - Prototype Pollution in Dev Mode Field Editing
**Vulnerability:** A recursive property setter (`setValueAtPath`) didn't validate keys, allowing arbitrary properties like `__proto__` and `constructor` to be modified on objects.
**Learning:** Functions that recursively assign values into an object based on an array of path keys are highly susceptible to prototype pollution if the path segments are not validated against sensitive keys. Spread operations in recursive setups don't natively prevent prototype mutation if `__proto__` is explicitly accessed.
**Prevention:** Always check if the current property name (or `head` of the path array) is `__proto__` or `constructor` and early-return to block the assignment within recursive setter functions.

## 2024-05-24 - Content Security Policy (CSP) unsafe-eval
**Vulnerability:** The Content Security Policy in `index.html` included `'unsafe-eval'` in the `script-src` directive.
**Learning:** This directive allows code passed to `eval()`, `setTimeout()`, `setInterval()`, and `new Function()` to be executed, which opens up the potential for severe Cross-Site Scripting (XSS) attacks if any unsanitized user input is evaluated. Even if no immediate vector exists, it violates the principle of least privilege. The codebase memory explicitly states that new code/dependencies must not require `unsafe-eval`.
**Prevention:** Implement strict CSP rules by default, explicitly denying `'unsafe-eval'` unless strictly necessary and with thorough justification/mitigation.
## 2024-10-25 - Prototype Pollution in `isPlainObject` Function
**Vulnerability:** The `isPlainObject` function relied solely on `typeof value === 'object'` and `!Array.isArray(value)` to identify plain objects, rendering it susceptible to objects instantiated with a null prototype or forged object-like entities. This vulnerability was exploited within the game's internal data-merging routines (`mergeStateForDevWrite`), enabling prototype pollution when merging crafted state structures.
**Learning:** Checking for an object type and array absence is insufficient for verifying plain objects. Complex operations like recursive merging must strictly authenticate the object's prototype to prevent pollution vectors.
**Prevention:** Always validate an object's prototype by ensuring `Object.prototype.toString.call(value) === '[object Object]'` and checking if its prototype strictly equals `Object.prototype` or `null`.
## 2024-11-20 - Prototype Pollution Vector via `prototype` key
**Vulnerability:** The `prototype` key was not blocked in internal recursive merging and parsing functions (`safeJsonParse`, `mergeStateForDevWrite`, `setValueAtPath`), leaving a potential prototype pollution vector alongside `__proto__` and `constructor`.
**Learning:** Checking for `__proto__` and `constructor` is insufficient for comprehensive protection against prototype pollution. If an attacker can overwrite a constructor function's `prototype` property, they can pollute the prototype chain of instances created from it. The unholy trinity of prototype pollution keys is `__proto__`, `constructor`, and `prototype`.
**Prevention:** Always explicitly check for and skip the `prototype` key in addition to `__proto__` and `constructor` when iterating over untrusted object keys for merging, assignment, or parsing.
## 2024-10-27 - Prototype Pollution via 'prototype' Key
**Vulnerability:** A recursive deep merge function (`mergeStateForDevWrite`), json parse (`safeJsonParse`), and property setter (`setValueAtPath`) were filtering out `__proto__` and `constructor` to prevent prototype pollution, but failed to filter out the `prototype` key. This could allow pollution if the target object happens to be a constructor function or class.
**Learning:** Filtering `__proto__` and `constructor` is insufficient if the target of a recursive merge or path setter can be a function. Attackers can pollute the `prototype` property of the function, which then affects all instances created from it.
**Prevention:** Always explicitly check for and block the `prototype` key alongside `__proto__` and `constructor` when validating keys for deep object assignment or merging.
## 2024-11-25 - Defense in Depth: Referrer Policy
**Vulnerability:** No Referrer Policy meta tag was present.
**Learning:** Adding a Referrer Policy is a defense-in-depth measure that prevents the application's URL and potentially sensitive query parameters from being leaked in the `Referer` header when navigating to external links.
**Prevention:** Always include a strict Referrer Policy meta tag (e.g., `no-referrer` or `strict-origin-when-cross-origin`).
## 2024-12-07 - Content Security Policy (CSP) unsafe-inline
**Vulnerability:** The Content Security Policy in `index.html` included `'unsafe-inline'` in the `script-src` directive.
**Learning:** This directive allows execution of inline scripts and event handlers (e.g., `<script>...</script>`, `onclick="..."`), which opens up the potential for severe Cross-Site Scripting (XSS) attacks if any unsanitized user input is reflected into the HTML. Even if no immediate vector exists, it violates the principle of least privilege.
**Prevention:** Implement strict CSP rules by default, explicitly denying `'unsafe-inline'` for `script-src` to enforce the execution of external, trusted scripts only.
## 2024-12-08 - Prototype Pollution Vector via `typeof === 'object'` Validation
**Vulnerability:** Several legacy detection routines (`detectLegacy.js`, `isLegacyDataLakeTier`) validated parsed state objects using `typeof obj === 'object'`. This allowed arrays or objects with manipulated prototypes (including those instantiated with `Object.create(null)`) to bypass structure checks, creating potential logic flaws or downstream prototype pollution vectors.
**Learning:** Checking `typeof === 'object'` is dangerously permissive for validating plain objects expected to act as dictionaries, especially when handling untrusted or potentially crafted JSON/storage states. It matches arrays and ignores prototype constraints.
**Prevention:** Always use a strict validator like `isPlainObject` (which checks `Object.prototype.toString.call` and verifies the prototype strictly equals `null` or `Object.prototype`) when authenticating object inputs for state management, mapping, or legacy migrations.
