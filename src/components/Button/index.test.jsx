import { render } from '@testing-library/react'
import Button, { ButtonContent } from 'components/Button'
import { ThemeProvider, themes } from 'theme'

const renderButton = children => render(
  <ThemeProvider mode="dark"><Button type="button">{children}</Button></ThemeProvider>,
).container.querySelector('button')

describe('ButtonContent', () => {
  it('splits a leading icon glyph into its own slot', () => {
    const button = renderButton(<ButtonContent>🛒 Lv.10 $100</ButtonContent>)
    expect(button.querySelector('[aria-hidden="true"]')).toHaveTextContent('🛒')
    expect(button).toHaveTextContent('Lv.10 $100')
  })

  it('keeps a plain-word label whole instead of treating its first word as an icon', () => {
    const button = renderButton(<ButtonContent>Redeem code</ButtonContent>)
    expect(button.querySelector('[aria-hidden="true"]')).toBeNull()
    expect(button.textContent).toBe('Redeem code')
  })

  it('joins mixed text/expression children without commas', () => {
    const button = renderButton(<ButtonContent>Cost ({String(5)} B)</ButtonContent>)
    expect(button.textContent).toBe('Cost (5 B)')
  })

  it('renders element children as-is rather than "[object Object]"', () => {
    const button = renderButton(<ButtonContent><span>1,000 PP</span></ButtonContent>)
    expect(button.textContent).toBe('1,000 PP')
  })
})

describe('variant', () => {
  it('maps prestige to the warn/prestige-gold token', () => {
    const button = render(
      <ThemeProvider mode="dark"><Button type="button" variant="prestige">Go</Button></ThemeProvider>,
    ).container.querySelector('button')
    expect(button).toHaveStyle({ color: themes.dark.color.warn })
  })

  it('does not treat purge as a semantic variant — callers must use prestige (#988)', () => {
    const button = render(
      <ThemeProvider mode="dark"><Button type="button" variant="purge">Go</Button></ThemeProvider>,
    ).container.querySelector('button')
    expect(button).not.toHaveStyle({ color: themes.dark.color.warn })
  })
})
