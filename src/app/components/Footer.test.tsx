import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@/test/helpers'
import Footer from './Footer'

describe('Footer', () => {
  it('displays the current year', () => {
    renderWithTheme(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('displays the name', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByText(/Anastasiia Melnyk/)).toBeInTheDocument()
  })

  it('renders Learn and Contact nav links', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByText('Learn')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('applies background style from theme', () => {
    renderWithTheme(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer.style.background).toBeTruthy()
  })
})
