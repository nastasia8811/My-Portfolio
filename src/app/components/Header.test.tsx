import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@/test/helpers'
import Header from './Header'

vi.mock('next/link', () => ({
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: unknown
  }) => <a {...props}>{children}</a>
}))

describe('Header', () => {
  it('renders the site name', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('Anastasiia')).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    renderWithTheme(<Header />)
    expect(screen.getByText('My Projects')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Say hi')).toBeInTheDocument()
  })

  it('renders the hamburger button for mobile', () => {
    renderWithTheme(<Header />)
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
  })

  it('opens mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Header />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()
  })

  it('closes mobile menu when close button is clicked', async () => {
    const user = userEvent.setup()
    renderWithTheme(<Header />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.queryByRole('button', { name: 'Close menu' })).not.toBeInTheDocument()
  })

  it('renders the theme toggle button', () => {
    renderWithTheme(<Header />)
    expect(screen.getByRole('button', { name: 'Toggle color mode' })).toBeInTheDocument()
  })

  it('applies scrolled styles when scrollY > 8', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    window.dispatchEvent(new Event('scroll'))
    renderWithTheme(<Header />)
    const header = screen.getByRole('banner')
    expect(header.className).toContain('backdrop-blur')
  })
})
