import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@/test/helpers'
import ProjectCard from './ProjectCard'

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

const baseProps = {
  title: 'Test Project',
  description: 'A test project description',
  coverSrc: '/test.jpg',
  coverAlt: 'Test project cover',
  demoHref: 'https://example.com'
}

describe('ProjectCard', () => {
  it('renders the project title', () => {
    renderWithTheme(<ProjectCard {...baseProps} />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders the project description', () => {
    renderWithTheme(<ProjectCard {...baseProps} />)
    expect(screen.getByText('A test project description')).toBeInTheDocument()
  })

  it('renders a cover image with alt text', () => {
    renderWithTheme(<ProjectCard {...baseProps} />)
    const img = screen.getByAltText('Test project cover')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test.jpg')
  })

  it('renders a Demo link pointing to demoHref', () => {
    renderWithTheme(<ProjectCard {...baseProps} />)
    const demoLink = screen.getByText('Demo')
    expect(demoLink).toHaveAttribute('href', 'https://example.com')
  })

  it('renders a GitHub link when codeHref is provided', () => {
    renderWithTheme(<ProjectCard {...baseProps} codeHref='https://github.com/test' />)
    const githubLink = screen.getByText('GitHub')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test')
  })

  it('does not render a GitHub link when codeHref is absent', () => {
    renderWithTheme(<ProjectCard {...baseProps} />)
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
  })

  it('renders tech stack badges when provided', () => {
    renderWithTheme(<ProjectCard {...baseProps} tech={['React', 'TypeScript', 'Next.js']} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('does not render tech stack list when tech is empty', () => {
    renderWithTheme(<ProjectCard {...baseProps} tech={[]} />)
    expect(screen.queryByRole('list', { name: 'Tech stack' })).not.toBeInTheDocument()
  })
})
