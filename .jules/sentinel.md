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
