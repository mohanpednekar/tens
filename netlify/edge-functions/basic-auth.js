// Gates every request to the Dev Mode staging site behind HTTP Basic Auth — real credentials,
// not just an unlisted URL, so the site stays "only I can access it" even if the URL leaks (a
// bookmark synced somewhere, a screenshot, browser history). See netlify.toml and
// CLAUDE.md's "Dev Mode" section.
//
// Credentials are Netlify site environment variables (STAGING_AUTH_USER/STAGING_AUTH_PASS), set
// via `netlify env:set` from GitHub Actions secrets in deploy-staging.yml — never committed to
// this (public) repo. Runs on Netlify's Deno-based Edge Functions runtime, not Node.
//
// This has not been exercised against a live Netlify deployment as part of this change (no
// Netlify account/deploy access from this session) — verify it manually once the site and its
// env vars are actually configured, per the setup steps in CLAUDE.md.
export default async (request, context) => {
  const expectedUser = Netlify.env.get('STAGING_AUTH_USER')
  const expectedPass = Netlify.env.get('STAGING_AUTH_PASS')

  // Fails closed: if the site env vars aren't set yet, nobody gets through (rather than
  // accidentally leaving the staging site wide open because setup isn't finished).
  if (!expectedUser || !expectedPass) {
    return new Response('Staging site not yet configured (missing auth credentials).', { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Basic ')) {
    const decoded = atob(authHeader.slice('Basic '.length))
    const separatorIndex = decoded.indexOf(':')
    const user = separatorIndex === -1 ? decoded : decoded.slice(0, separatorIndex)
    const pass = separatorIndex === -1 ? '' : decoded.slice(separatorIndex + 1)
    if (user === expectedUser && pass === expectedPass) {
      return context.next()
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Tens Dev Mode staging", charset="UTF-8"' },
  })
}

export const config = { path: '/*' }
