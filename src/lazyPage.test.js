import { loadWithReload, RELOAD_FLAG } from './lazyPage'

describe('loadWithReload', () => {
  const reload = vi.fn()
  beforeEach(() => {
    sessionStorage.clear()
    reload.mockReset()
    vi.stubGlobal('location', { ...window.location, reload })
  })
  afterEach(() => vi.unstubAllGlobals())

  test('returns the module and clears the guard on success', async () => {
    sessionStorage.setItem(RELOAD_FLAG, '1')
    await expect(loadWithReload(() => Promise.resolve({ default: 1 }))).resolves.toEqual({ default: 1 })
    expect(sessionStorage.getItem(RELOAD_FLAG)).toBeNull()
  })

  test('first failure reloads once and stays pending; second rethrows', async () => {
    const fail = () => Promise.reject(new Error('404'))
    const pending = loadWithReload(fail)
    const settled = vi.fn()
    pending.then(settled, settled)
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve()
    expect(reload).toHaveBeenCalledTimes(1)
    expect(settled).not.toHaveBeenCalled()
    await expect(loadWithReload(fail)).rejects.toThrow('404')
    expect(reload).toHaveBeenCalledTimes(1)
  })
})
