import { createPrefixedStorage } from './storagePrefix'

describe('createPrefixedStorage', () => {
  beforeEach(() => localStorage.clear())

  it('isolates dev keys from the main game in both directions', () => {
    const dev = createPrefixedStorage(localStorage, 'dev:')
    localStorage.setItem('tens_game_state', 'main')
    dev.setItem('tens_game_state', 'dev')
    expect(localStorage.getItem('tens_game_state')).toBe('main')
    expect(dev.getItem('tens_game_state')).toBe('dev')
    expect(localStorage.getItem('dev:tens_game_state')).toBe('dev')
    expect(dev.length).toBe(1)
    expect(dev.key(0)).toBe('tens_game_state')
  })

  it('clear and removeItem only touch dev keys', () => {
    const dev = createPrefixedStorage(localStorage, 'dev:')
    localStorage.setItem('tens_game_state', 'main')
    dev.setItem('a', '1')
    dev.removeItem('a')
    dev.setItem('b', '2')
    dev.clear()
    expect(dev.length).toBe(0)
    expect(localStorage.getItem('tens_game_state')).toBe('main')
  })
})
