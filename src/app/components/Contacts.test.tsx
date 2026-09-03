import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import Contacts from './Contacts'
import { renderWithTheme } from '@/test/helpers'

describe('Contacts', () => {
  it('renders the section with "Contact" title', () => {
    renderWithTheme(<Contacts />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders the email assembled from parts with correct aria-label', () => {
    renderWithTheme(<Contacts />)
    expect(screen.getByRole('text')).toHaveAttribute(
      'aria-label',
      'Email: melnykk.ana@gmail.com. Click to copy.'
    )
  })

  it('renders all email characters', () => {
    renderWithTheme(<Contacts />)
    const emailText = screen.getByRole('text')
    expect(emailText).toHaveTextContent('melnykk.ana@gmail.com')
  })

  it('shows "Click to copy" hint by default', () => {
    renderWithTheme(<Contacts />)
    expect(screen.getByText('Click to copy')).toBeInTheDocument()
  })

  it('has the correct section id for navigation', () => {
    renderWithTheme(<Contacts />)
    expect(document.getElementById('contact')).toBeInTheDocument()
  })

  it('email element has cursor-pointer class indicating it is clickable', () => {
    renderWithTheme(<Contacts />)
    const emailElement = screen.getByRole('text')
    expect(emailElement).toHaveClass('cursor-pointer')
  })
})
