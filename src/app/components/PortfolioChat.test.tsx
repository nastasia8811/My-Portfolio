import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from '@/test/helpers'
import PortfolioChat from './PortfolioChat'
import type { PortfolioProject } from '@/lib/portfolio-data'
import type { UIMessage } from 'ai'

// ── mock useChat ────────────────────────────────────────────────────────
const mockSendMessage = vi.fn()
const mockSetMessages = vi.fn()
let mockMessages: UIMessage[] = []
let mockStatus: 'ready' | 'submitted' | 'streaming' = 'ready'

vi.mock('@ai-sdk/react', () => ({
  useChat: () => ({
    messages: mockMessages,
    sendMessage: mockSendMessage,
    status: mockStatus,
    setMessages: mockSetMessages
  })
}))

vi.mock('ai', () => ({
  DefaultChatTransport: vi.fn()
}))

// ── test data ───────────────────────────────────────────────────────────
const projects: PortfolioProject[] = [
  {
    slug: 'project-a',
    name: 'Project Alpha',
    description: 'First project',
    techStack: ['React', 'TypeScript']
  },
  {
    slug: 'project-b',
    name: 'Project Beta',
    description: 'Second project',
    techStack: ['Next.js']
  }
]

const makeMessage = (id: string, role: 'user' | 'assistant', text: string): UIMessage => ({
  id,
  role,
  parts: [{ type: 'text' as const, text }]
})

// ── helpers ─────────────────────────────────────────────────────────────
const renderChat = () => renderWithTheme(<PortfolioChat projects={projects} />)

const openChat = async () => {
  const user = userEvent.setup()
  renderChat()
  await user.click(screen.getByRole('button', { name: 'Open chat' }))
  return user
}

// ── tests ───────────────────────────────────────────────────────────────
beforeEach(() => {
  mockMessages = []
  mockStatus = 'ready'
  mockSendMessage.mockClear()
  mockSetMessages.mockClear()
})

describe('PortfolioChat', () => {
  describe('floating action button', () => {
    it('renders with "Open chat" label when closed', () => {
      renderChat()
      expect(screen.getByRole('button', { name: 'Open chat' })).toBeInTheDocument()
    })

    it('changes label to "Close chat" after opening', async () => {
      const user = userEvent.setup()
      renderChat()
      await user.click(screen.getByRole('button', { name: 'Open chat' }))
      expect(screen.getByRole('button', { name: 'Close chat' })).toBeInTheDocument()
    })

    it('toggles back to "Open chat" on second click', async () => {
      const user = userEvent.setup()
      renderChat()
      const btn = screen.getByRole('button', { name: 'Open chat' })
      await user.click(btn)
      await user.click(screen.getByRole('button', { name: 'Close chat' }))
      expect(screen.getByRole('button', { name: 'Open chat' })).toBeInTheDocument()
    })

    it('applies theme button colors', () => {
      renderChat()
      const btn = screen.getByRole('button', { name: 'Open chat' })
      expect(btn.style.background).toBeTruthy()
      expect(btn.style.color).toBeTruthy()
    })
  })

  describe('chat panel visibility', () => {
    it('is hidden when chat is closed', () => {
      renderChat()
      const heading = screen.getByText('Ask me anything')
      expect(heading.closest('.fixed')).toHaveClass('hidden')
    })

    it('becomes visible when chat is opened', async () => {
      await openChat()
      const heading = screen.getByText('Ask me anything')
      expect(heading.closest('.fixed')).toHaveClass('flex')
      expect(heading.closest('.fixed')).not.toHaveClass('hidden')
    })
  })

  describe('header', () => {
    it('displays "Ask me anything"', async () => {
      await openChat()
      expect(screen.getByText('Ask me anything')).toBeInTheDocument()
    })

    it('renders mode tabs "About Me" and "Projects"', async () => {
      await openChat()
      expect(screen.getByRole('button', { name: 'About Me' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument()
    })
  })

  describe('empty state messages', () => {
    it('shows general greeting in general mode', async () => {
      await openChat()
      expect(
        screen.getByText(/Ask me about Anastasiia's skills, experience, or approach/)
      ).toBeInTheDocument()
    })

    it('shows project-specific greeting in project mode', async () => {
      const user = await openChat()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      expect(screen.getByText(/Ask me about the Project Alpha project/)).toBeInTheDocument()
    })
  })

  describe('mode switching', () => {
    it('shows project selector when switching to Projects mode', async () => {
      const user = await openChat()
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('hides project selector when switching back to About Me', async () => {
      const user = await openChat()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      expect(screen.getByRole('combobox')).toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'About Me' }))
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    })

    it('calls setMessages when switching modes to restore history', async () => {
      const user = await openChat()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      expect(mockSetMessages).toHaveBeenCalled()
    })
  })

  describe('project selector', () => {
    it('lists all projects as options', async () => {
      const user = await openChat()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      const select = screen.getByRole('combobox')
      const options = within(select).getAllByRole('option')
      expect(options).toHaveLength(2)
      expect(options[0]).toHaveTextContent('Project Alpha')
      expect(options[1]).toHaveTextContent('Project Beta')
    })

    it('defaults to the first project', async () => {
      const user = await openChat()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      expect(screen.getByRole('combobox')).toHaveValue('project-a')
    })

    it('updates greeting when selecting a different project', async () => {
      const user = await openChat()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      await user.selectOptions(screen.getByRole('combobox'), 'project-b')
      expect(screen.getByText(/Ask me about the Project Beta project/)).toBeInTheDocument()
    })

    it('calls setMessages when changing project to restore history', async () => {
      const user = await openChat()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      mockSetMessages.mockClear()
      await user.selectOptions(screen.getByRole('combobox'), 'project-b')
      expect(mockSetMessages).toHaveBeenCalled()
    })
  })

  describe('message rendering', () => {
    it('renders user messages aligned to the right', async () => {
      mockMessages = [makeMessage('1', 'user', 'Hello')]
      await openChat()
      const wrapper = screen.getByText('Hello').closest('.flex')
      expect(wrapper).toHaveClass('justify-end')
    })

    it('renders assistant messages aligned to the left', async () => {
      mockMessages = [makeMessage('1', 'assistant', 'Hi there')]
      await openChat()
      const wrapper = screen.getByText('Hi there').closest('.flex')
      expect(wrapper).toHaveClass('justify-start')
    })

    it('applies rounded-br-sm to user message bubbles', async () => {
      mockMessages = [makeMessage('1', 'user', 'Hello')]
      await openChat()
      const bubble = screen.getByText('Hello')
      expect(bubble.className).toContain('rounded-br-sm')
    })

    it('applies rounded-bl-sm to assistant message bubbles', async () => {
      mockMessages = [makeMessage('1', 'assistant', 'Hi there')]
      await openChat()
      const bubble = screen.getByText('Hi there')
      expect(bubble.className).toContain('rounded-bl-sm')
    })

    it('renders multiple messages in order', async () => {
      mockMessages = [
        makeMessage('1', 'user', 'First message'),
        makeMessage('2', 'assistant', 'Second message'),
        makeMessage('3', 'user', 'Third message')
      ]
      await openChat()
      const msgs = [
        screen.getByText('First message'),
        screen.getByText('Second message'),
        screen.getByText('Third message')
      ]
      msgs.forEach(el => expect(el).toBeInTheDocument())
    })

    it('hides empty-state greeting when messages exist', async () => {
      mockMessages = [makeMessage('1', 'user', 'Hello')]
      await openChat()
      expect(screen.queryByText(/Ask me about Anastasiia/)).not.toBeInTheDocument()
    })

    it('concatenates multiple text parts in a single message', async () => {
      mockMessages = [
        {
          id: '1',
          role: 'assistant',
          parts: [
            { type: 'text' as const, text: 'Part one ' },
            { type: 'text' as const, text: 'Part two' }
          ]
        }
      ]
      await openChat()
      expect(screen.getByText('Part one Part two')).toBeInTheDocument()
    })

    it('ignores non-text parts', async () => {
      mockMessages = [
        {
          id: '1',
          role: 'assistant',
          parts: [
            { type: 'text' as const, text: 'Visible' },
            { type: 'reasoning' as const, reasoning: 'hidden' } as unknown as {
              type: 'text'
              text: string
            }
          ]
        }
      ]
      await openChat()
      expect(screen.getByText('Visible')).toBeInTheDocument()
      expect(screen.queryByText('hidden')).not.toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('shows "Thinking..." indicator when status is submitted', async () => {
      mockStatus = 'submitted'
      await openChat()
      expect(screen.getByText('Thinking...')).toBeInTheDocument()
    })

    it('does not show "Thinking..." when status is ready', async () => {
      mockStatus = 'ready'
      await openChat()
      expect(screen.queryByText('Thinking...')).not.toBeInTheDocument()
    })

    it('aligns "Thinking..." bubble to the left like an assistant message', async () => {
      mockStatus = 'submitted'
      await openChat()
      const wrapper = screen.getByText('Thinking...').closest('.flex')
      expect(wrapper).toHaveClass('justify-start')
    })
  })

  describe('form submission', () => {
    it('renders an input with placeholder', async () => {
      await openChat()
      expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument()
    })

    it('renders a send button', async () => {
      await openChat()
      expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument()
    })

    it('calls sendMessage with the input text on submit', async () => {
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      await user.type(input, 'Hello AI')
      await user.click(screen.getByRole('button', { name: 'Send message' }))
      expect(mockSendMessage).toHaveBeenCalledWith({ text: 'Hello AI' })
    })

    it('clears input after submission', async () => {
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      await user.type(input, 'Hello AI')
      await user.click(screen.getByRole('button', { name: 'Send message' }))
      expect(input).toHaveValue('')
    })

    it('submits on Enter key press', async () => {
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      await user.type(input, 'Enter test{Enter}')
      expect(mockSendMessage).toHaveBeenCalledWith({ text: 'Enter test' })
    })

    it('does not submit empty or whitespace-only input', async () => {
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      await user.type(input, '   {Enter}')
      expect(mockSendMessage).not.toHaveBeenCalled()
    })

    it('does not submit when status is submitted (loading)', async () => {
      mockStatus = 'submitted'
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      await user.type(input, 'message{Enter}')
      expect(mockSendMessage).not.toHaveBeenCalled()
    })

    it('does not submit when status is streaming (loading)', async () => {
      mockStatus = 'streaming'
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      await user.type(input, 'message{Enter}')
      expect(mockSendMessage).not.toHaveBeenCalled()
    })

    it('disables the input when loading', async () => {
      mockStatus = 'submitted'
      await openChat()
      expect(screen.getByPlaceholderText('Type a message...')).toBeDisabled()
    })

    it('disables the send button when loading', async () => {
      mockStatus = 'submitted'
      await openChat()
      expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled()
    })

    it('disables the send button when input is empty', async () => {
      await openChat()
      expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled()
    })

    it('enables the send button when input has text', async () => {
      const user = await openChat()
      await user.type(screen.getByPlaceholderText('Type a message...'), 'text')
      expect(screen.getByRole('button', { name: 'Send message' })).not.toBeDisabled()
    })
  })

  describe('input focus behavior', () => {
    it('changes border color on focus', async () => {
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      const borderBefore = input.style.borderColor
      await user.click(input)
      // Focus handler sets borderColor to the accent color
      expect(input.style.borderColor).not.toBe(borderBefore)
    })

    it('restores border color on blur', async () => {
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      const borderBefore = input.style.borderColor
      await user.click(input)
      await user.tab() // blur
      // Blur handler restores the original secondaryText-based border
      expect(input.style.borderColor).toBe(borderBefore)
    })
  })

  describe('edge cases', () => {
    it('renders with an empty projects array', () => {
      renderWithTheme(<PortfolioChat projects={[]} />)
      expect(screen.getByRole('button', { name: 'Open chat' })).toBeInTheDocument()
    })

    it('shows "selected" fallback when project slug not found', async () => {
      // Render with empty projects — the empty-state message falls back
      const user = userEvent.setup()
      renderWithTheme(<PortfolioChat projects={[]} />)
      await user.click(screen.getByRole('button', { name: 'Open chat' }))
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      expect(screen.getByText(/Ask me about the selected project/)).toBeInTheDocument()
    })

    it('does not render project selector in general mode', async () => {
      await openChat()
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    })
  })

  describe('theme integration', () => {
    it('applies theme background to the messages area', async () => {
      await openChat()
      const messagesArea = screen.getByText(/Ask me about Anastasiia/).closest('div.flex')
      expect(messagesArea).toBeInstanceOf(HTMLElement)
      expect((messagesArea as HTMLElement).style.background).toBeTruthy()
    })

    it('applies button theme colors to user message bubbles', async () => {
      mockMessages = [makeMessage('1', 'user', 'Hello')]
      await openChat()
      const bubble = screen.getByText('Hello')
      expect(bubble.style.background).toBeTruthy()
      expect(bubble.style.color).toBeTruthy()
    })

    it('applies text theme color to assistant message bubbles', async () => {
      mockMessages = [makeMessage('1', 'assistant', 'Hi')]
      await openChat()
      const bubble = screen.getByText('Hi')
      expect(bubble.style.color).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('FAB has correct aria-label reflecting state', async () => {
      const user = userEvent.setup()
      renderChat()
      expect(screen.getByLabelText('Open chat')).toBeInTheDocument()
      await user.click(screen.getByLabelText('Open chat'))
      expect(screen.getByLabelText('Close chat')).toBeInTheDocument()
    })

    it('send button has aria-label', async () => {
      await openChat()
      expect(screen.getByLabelText('Send message')).toBeInTheDocument()
    })

    it('input has a placeholder for affordance', async () => {
      await openChat()
      expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument()
    })

    it('project selector is accessible as a combobox', async () => {
      const user = await openChat()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('mode tabs are accessible as buttons', async () => {
      await openChat()
      const aboutBtn = screen.getByRole('button', { name: 'About Me' })
      const projBtn = screen.getByRole('button', { name: 'Projects' })
      expect(aboutBtn).toBeInTheDocument()
      expect(projBtn).toBeInTheDocument()
    })

    it('send button is disabled when input is empty, preventing accidental submission', async () => {
      await openChat()
      const sendBtn = screen.getByRole('button', { name: 'Send message' })
      expect(sendBtn).toBeDisabled()
    })
  })

  describe('active mode tab styling', () => {
    it('applies active background to selected mode tab', async () => {
      await openChat()
      const aboutBtn = screen.getByRole('button', { name: 'About Me' })
      expect(aboutBtn.style.background).toBe('rgba(255, 255, 255, 0.25)')
    })

    it('applies transparent background to inactive mode tab', async () => {
      await openChat()
      const projBtn = screen.getByRole('button', { name: 'Projects' })
      expect(projBtn.style.background).toBe('transparent')
    })

    it('swaps active styling when switching tabs', async () => {
      const user = await openChat()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      const aboutBtn = screen.getByRole('button', { name: 'About Me' })
      const projBtn = screen.getByRole('button', { name: 'Projects' })
      expect(projBtn.style.background).toBe('rgba(255, 255, 255, 0.25)')
      expect(aboutBtn.style.background).toBe('transparent')
    })
  })

  describe('mode switching clears input', () => {
    it('clears input text when switching from general to project mode', async () => {
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      await user.type(input, 'draft message')
      expect(input).toHaveValue('draft message')
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      expect(input).toHaveValue('')
    })

    it('clears input text when switching projects', async () => {
      const user = await openChat()
      await user.click(screen.getByRole('button', { name: 'Projects' }))
      const input = screen.getByPlaceholderText('Type a message...')
      await user.type(input, 'draft')
      expect(input).toHaveValue('draft')
      await user.selectOptions(screen.getByRole('combobox'), 'project-b')
      expect(input).toHaveValue('')
    })
  })

  describe('sendMessage integration', () => {
    it('passes exact trimmed input without extra whitespace', async () => {
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      await user.type(input, 'Hello AI')
      await user.click(screen.getByRole('button', { name: 'Send message' }))
      expect(mockSendMessage).toHaveBeenCalledTimes(1)
      expect((mockSendMessage as Mock).mock.calls[0][0]).toEqual({ text: 'Hello AI' })
    })

    it('is not called multiple times for a single submission', async () => {
      const user = await openChat()
      const input = screen.getByPlaceholderText('Type a message...')
      await user.type(input, 'Test{Enter}')
      expect(mockSendMessage).toHaveBeenCalledTimes(1)
    })
  })
})
