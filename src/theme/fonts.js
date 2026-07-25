// Locally bundled font faces (via @fontsource) — no runtime CDN fetch, so the game stays fully
// self-contained after the GH Pages deploy. Only the specific weight/subset files actually used by
// `theme.font.display`/`theme.font.body` (see tokens.js) are imported — each fontsource package ships
// every weight and script subset (cyrillic, greek, vietnamese, …), so importing the `latin-*.css`
// files directly (rather than the package's aggregate `NNN.css`, which pulls every subset in) keeps
// the bundled weight count/size intentionally small. See CLAUDE.md → "Theming" for the face choices.
import '@fontsource/inter/latin-400.css' // body text baseline
import '@fontsource/inter/latin-600.css' // Button label weight
import '@fontsource/inter/latin-700.css' // headings (h2/h3 inherit the body face at browser-default bold)
import '@fontsource/space-grotesk/latin-700.css' // the "Tens" wordmark
