import { describe, it, expect } from 'vitest'
import { getDeveloperInfo, getProjects, getProjectBySlug } from './data'

describe('getDeveloperInfo', () => {
  it('returns developer, experience, and education', () => {
    const info = getDeveloperInfo()
    expect(info).toHaveProperty('developer')
    expect(info).toHaveProperty('experience')
    expect(info).toHaveProperty('education')
  })

  it('developer has required fields', () => {
    const { developer } = getDeveloperInfo()
    expect(developer.name).toBe('Anastasiia Melnyk')
    expect(developer.title).toBe('Frontend Engineer')
    expect(developer.contacts.email).toBeDefined()
  })
})

describe('getProjects', () => {
  it('returns an array of projects', () => {
    const projects = getProjects()
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('each project has slug, name, description, and techStack', () => {
    for (const p of getProjects()) {
      expect(p.slug).toBeDefined()
      expect(p.name).toBeDefined()
      expect(p.description).toBeDefined()
      expect(Array.isArray(p.techStack)).toBe(true)
    }
  })
})

describe('getProjectBySlug', () => {
  it('returns a project when the slug matches', () => {
    const project = getProjectBySlug('movie-explorer')
    expect(project).toBeDefined()
    expect(project!.name).toBe('FrameIT')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('nonexistent')).toBeUndefined()
  })
})
