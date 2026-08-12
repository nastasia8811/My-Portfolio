import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@/test/helpers'
import PageTitle from './PageTitle'

describe('PageTitle', () => {
  it('renders an h2 element', () => {
    renderWithTheme(<PageTitle title='Test Title' id='test' />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('sets the id attribute', () => {
    renderWithTheme(<PageTitle title='Test Title' id='my-section' />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'my-section')
  })

  it('displays the title text', () => {
    renderWithTheme(<PageTitle title='About Me' id='about' />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('About Me')
  })

  it('applies theme primary color', () => {
    renderWithTheme(<PageTitle title='Title' id='test' />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.style.color).toBeTruthy()
  })
})
