import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NavLinks from './NavLinks'

vi.mock('next/link', () => ({
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    href: string
    onClick?: () => void
  }) => <a {...props}>{children}</a>
}))

describe('NavLinks', () => {
  it('renders three navigation links', () => {
    render(<NavLinks />)
    expect(screen.getAllByRole('link')).toHaveLength(3)
  })

  it('renders correct labels', () => {
    render(<NavLinks />)
    expect(screen.getByText('My Projects')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Say hi')).toBeInTheDocument()
  })

  it('links point to correct anchors', () => {
    render(<NavLinks />)
    expect(screen.getByText('My Projects')).toHaveAttribute('href', '#projects')
    expect(screen.getByText('About')).toHaveAttribute('href', '#about')
    expect(screen.getByText('Say hi')).toHaveAttribute('href', '#contact')
  })

  it('calls onClick handler when a link is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<NavLinks onClick={handleClick} />)
    await user.click(screen.getByText('About'))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
