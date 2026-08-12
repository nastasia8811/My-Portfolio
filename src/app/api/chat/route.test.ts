import { describe, it, expect, vi, beforeEach } from 'vitest'
import { buildSystemPrompt } from './route'

vi.mock('ai', () => ({
  streamText: vi.fn(() => ({ toUIMessageStreamResponse: () => new Response('stream') })),
  convertToModelMessages: vi.fn(() => []),
  createUIMessageStream: vi.fn(({ execute: _execute }: { execute: unknown }) => {
    return new ReadableStream()
  }),
  createUIMessageStreamResponse: vi.fn(() => new Response('mock'))
}))

vi.mock('@ai-sdk/anthropic', () => ({
  anthropic: vi.fn(() => 'mock-model')
}))

describe('buildSystemPrompt', () => {
  it('includes the developer name', () => {
    const prompt = buildSystemPrompt('general')
    expect(prompt).toContain('Anastasiia Melnyk')
  })

  it('includes skills in general mode', () => {
    const prompt = buildSystemPrompt('general')
    expect(prompt).toContain('Skills')
  })

  it('includes all projects section in general mode', () => {
    const prompt = buildSystemPrompt('general')
    expect(prompt).toContain('All Projects')
  })

  it('includes project-specific context in project mode', () => {
    const prompt = buildSystemPrompt('project', 'movie-explorer')
    expect(prompt).toContain('Current Project Context')
    expect(prompt).toContain('FrameIT')
  })

  it('falls back to general mode if project slug is invalid', () => {
    const prompt = buildSystemPrompt('project', 'nonexistent')
    expect(prompt).toContain('All Projects')
    expect(prompt).not.toContain('Current Project Context')
  })
})

describe('POST handler', () => {
  beforeEach(() => {
    vi.stubEnv('CHAT_MOCK', 'true')
  })

  it('returns a Response in mock mode', async () => {
    const { POST } = await import('./route')
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [], mode: 'general' })
    })
    const response = await POST(req)
    expect(response).toBeInstanceOf(Response)
  })
})
