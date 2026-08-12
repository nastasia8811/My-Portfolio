import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeContext'
import { colorsGradient, darkColorsGradient } from '@/app/theme'

const ThemeConsumer = () => {
  const { theme, toggleTheme, colors } = useTheme()
  return (
    <div>
      <span data-testid='theme'>{theme}</span>
      <span data-testid='primary'>{colors.primary}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.style.cssText = ''
})

describe('ThemeProvider', () => {
  it('defaults to light theme', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('provides light color values by default', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('primary').textContent).toBe(colorsGradient.primary)
  })

  it('toggles from light to dark', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(screen.getByTestId('primary').textContent).toBe(darkColorsGradient.primary)
  })

  it('toggles back from dark to light', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: 'toggle' }))
    await user.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('persists theme to localStorage on toggle', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    await user.click(screen.getByRole('button', { name: 'toggle' }))
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('reads saved theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark')
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme').textContent).toBe('dark')
  })

  it('sets CSS custom properties on document.documentElement', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    const root = document.documentElement
    expect(root.style.getPropertyValue('--primary')).toBe(colorsGradient.primary)
    expect(root.style.getPropertyValue('--accent')).toBe(colorsGradient.accent)
  })

  it('sets data-theme attribute on html element', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(document.documentElement.dataset.theme).toBe('light')
    await user.click(screen.getByRole('button', { name: 'toggle' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})

describe('useTheme', () => {
  it('throws when used outside ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeConsumer />)).toThrow('useTheme must be used within a ThemeProvider')
    spy.mockRestore()
  })
})
