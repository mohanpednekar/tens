import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Pins the Content-Security-Policy meta tag in index.html (the shell for web, PWA and Capacitor builds).
const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
const csp = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1] ?? ''
const directives = Object.fromEntries(
  csp.split(';').map(part => part.trim()).filter(Boolean).map(part => {
    const [name, ...sources] = part.split(/\s+/)
    return [name, sources]
  }),
)

describe('index.html Content-Security-Policy', () => {
  it('is present', () => {
    expect(csp).not.toBe('')
  })

  it.each(['default-src', 'script-src', 'style-src', 'font-src', 'img-src'])('%s allows no scheme-wide or wildcard source', name => {
    expect(directives[name]).toBeDefined()
    expect(directives[name].filter(source => source === '*' || source === 'https:' || source === 'http:')).toEqual([])
  })

  it('keeps scripts same-origin only and blocks plugins and inline handlers', () => {
    expect(directives['script-src']).toEqual(["'self'"])
    expect(directives['script-src-attr']).toEqual(["'none'"])
    expect(directives['object-src']).toEqual(["'none'"])
  })

  it('omits directives browsers ignore in a meta-delivered policy', () => {
    expect(directives['frame-ancestors']).toBeUndefined()
  })
})
