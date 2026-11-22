import { describe, it, expect } from 'vitest'
import { projects } from './projects'
import { getProjects } from '@/lib/data'

describe('projects', () => {
  it('has unique slugs', () => {
    const slugs = projects.map(p => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('is the source of the chat project list', () => {
    expect(getProjects().map(p => p.slug)).toEqual(projects.map(p => p.slug))
  })

  it('maps card fields to chat fields', () => {
    const card = projects.find(p => p.slug === 'movie-explorer')!
    const chat = getProjects().find(p => p.slug === 'movie-explorer')!
    expect(chat.name).toBe(card.title)
    expect(chat.techStack).toEqual(card.tech)
    expect(chat.liveUrl).toBe(card.demoHref)
    expect(chat.githubUrl).toBe(card.codeHref)
  })
})
