import { act, render, screen } from '@testing-library/react'
import { LayoutProvider, useLayoutClass } from './LayoutContext'

const Probe = () => <span>{useLayoutClass().layoutClass}</span>

const setSize = (w, h) => {
  window.innerWidth = w
  window.innerHeight = h
}

afterEach(() => setSize(1024, 768))

test('defaults to compact without a provider', () => {
  render(<Probe />)
  expect(screen.getByText('compact')).toBeTruthy()
})

test('updates live on resize and cleans up', async () => {
  setSize(1000, 700)
  const { unmount } = render(<LayoutProvider><Probe /></LayoutProvider>)
  expect(screen.getByText('expanded')).toBeTruthy()
  setSize(500, 900)
  await act(async () => {
    window.dispatchEvent(new Event('resize'))
    await new Promise(r => setTimeout(r, 50))
  })
  expect(screen.getByText('compact')).toBeTruthy()
  unmount()
})
