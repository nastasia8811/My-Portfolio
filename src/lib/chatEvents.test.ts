import { describe, it, expect, vi, afterEach } from 'vitest'
import { OPEN_CHAT_EVENT, openChat, type OpenChatDetail } from './chatEvents'

describe('openChat', () => {
  const listener = vi.fn()

  afterEach(() => {
    window.removeEventListener(OPEN_CHAT_EVENT, listener)
    listener.mockClear()
  })

  it('dispatches the open-chat event with the project slug', () => {
    window.addEventListener(OPEN_CHAT_EVENT, listener)
    openChat('portfolio-chat-api')
    expect(listener).toHaveBeenCalledTimes(1)
    const event = listener.mock.calls[0][0] as CustomEvent<OpenChatDetail>
    expect(event.detail).toEqual({ projectSlug: 'portfolio-chat-api' })
  })

  it('dispatches without a project slug', () => {
    window.addEventListener(OPEN_CHAT_EVENT, listener)
    openChat()
    const event = listener.mock.calls[0][0] as CustomEvent<OpenChatDetail>
    expect(event.detail.projectSlug).toBeUndefined()
  })
})
