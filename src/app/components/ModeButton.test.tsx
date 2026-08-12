import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@/test/helpers'
import ModeButton from './ModeButton'

describe('ModeButton', () => {
  it('renders a button with aria-label', () => {
    renderWithTheme(<ModeButton />)
    expect(screen.getByRole('button', { name: 'Toggle color mode' })).toBeInTheDocument()
  })

  it('shows moon emoji in light mode', () => {
    renderWithTheme(<ModeButton />)
    expect(screen.getByRole('button')).toHaveTextContent('🌙')
  })

  it('shows sun emoji after toggling to dark mode', async () => {
    const user = userEvent.setup()
    renderWithTheme(<ModeButton />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('☀️')
  })

  it('passes through className', () => {
    renderWithTheme(<ModeButton className='extra-class' />)
    expect(screen.getByRole('button').className).toContain('extra-class')
  })

  it('has button type="button"', () => {
    renderWithTheme(<ModeButton />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })
})
