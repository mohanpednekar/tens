## 2026-08-25 - Defense in Depth: Content Security Policy
**Vulnerability:** No Content Security Policy (CSP) headers or meta tags were present.
**Learning:** Even static frontend-only applications can benefit from CSP as a defense-in-depth measure against injected scripts or malicious dependencies.
**Prevention:** Apply a strict CSP meta tag limiting execution and asset loading to expected sources.

## 2024-05-27 - Prototype Pollution Prevention in LocalStorage
**Vulnerability:** Game state and metadata loaded from localStorage via `JSON.parse` was vulnerable to prototype pollution if maliciously crafted data was provided (e.g. `{"__proto__": {"polluted": true}}`).
**Learning:** Even without an active backend, untrusted data loading processes such as localStorage must be sanitized. Deep merging operations can be particularly vulnerable to prototype pollution if the input is not sanitized first.
**Prevention:** Created a `safeJsonParse` utility that uses the `JSON.parse` reviver parameter to drop `__proto__` and `constructor` keys to neutralize pollution payloads at the parse boundary.
