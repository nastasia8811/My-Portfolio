import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { useReducedMotion } from 'motion/react'
import { renderWithTheme } from '@/test/helpers'
import Effects from './Effects'

describe('Effects', () => {
  it('renders all letters of the heading', () => {
    renderWithTheme(<Effects />)
    expect(screen.getByRole('heading', { level: 2, name: 'Hello!' })).toBeInTheDocument()
  })

  it('wraps content in a section with shapes and text layers', () => {
    const { container } = renderWithTheme(<Effects />)
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section?.querySelector('[data-testid="shapes-layer"]')).toBeInTheDocument()
    expect(section?.querySelector('h2')).toBeInTheDocument()
  })

  it('renders all floating shapes', () => {
    const { container } = renderWithTheme(<Effects />)
    const shapesLayer = container.querySelector('[data-testid="shapes-layer"]')
    expect(shapesLayer?.children).toHaveLength(10)
  })

  it('renders shapes and heading when reduced motion is preferred', () => {
    vi.mocked(useReducedMotion).mockReturnValue(true)

    const { container } = renderWithTheme(<Effects />)
    expect(screen.getByRole('heading', { level: 2, name: 'Hello!' })).toBeInTheDocument()
    const shapesLayer = container.querySelector('[data-testid="shapes-layer"]')
    expect(shapesLayer?.children).toHaveLength(10)

    vi.mocked(useReducedMotion).mockReturnValue(false)
  })
})
