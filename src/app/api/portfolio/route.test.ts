// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { portfolioData } from '@/lib/portfolio-data'
import { GET } from './route'

describe('GET /api/portfolio', () => {
  it('returns the portfolio data as JSON', async () => {
    const res = GET()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('application/json')
    expect(await res.json()).toEqual(JSON.parse(JSON.stringify(portfolioData)))
  })

  it('includes project details for the chat', async () => {
    const data = (await GET().json()) as typeof portfolioData
    const chatApi = data.projects.find(p => p.slug === 'portfolio-chat-api')
    expect(chatApi?.details?.length).toBeGreaterThan(0)
  })
})
