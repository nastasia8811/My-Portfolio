'use client'

import { useState, useRef, useEffect, useMemo, useCallback, type FormEvent } from 'react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { useChat } from '@ai-sdk/react'
import { useTheme } from '@/app/context/ThemeContext'
import type { PortfolioProject } from '@/lib/portfolio-data'

type ChatMode = 'general' | 'project'

type PortfolioChatProps = {
  projects: PortfolioProject[]
}

const getTextContent = (msg: { parts: Array<{ type: string; text?: string }> }) =>
  msg.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map(p => p.text)
    .join('')

const assistantBubbleBg = (colors: { cardBackground: string; secondaryText: string }) =>
  colors.cardBackground.startsWith('linear') ? colors.secondaryText + '18' : colors.cardBackground

const PortfolioChat = ({ projects }: PortfolioChatProps) => {
  const { colors } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<ChatMode>('general')
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(projects[0]?.slug ?? '')
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Store message history per mode/project so switching tabs preserves conversations
  const [history, setHistory] = useState<Record<string, UIMessage[]>>({})

  const historyKey = mode === 'general' ? 'general' : `project:${selectedProjectSlug}`

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: () => ({
          mode,
          projectId: mode === 'project' ? selectedProjectSlug : undefined
        })
      }),
    [mode, selectedProjectSlug]
  )

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
    messages: history[historyKey] ?? []
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  // Sync messages back to history whenever they change
  const prevMessagesRef = useRef(messages)
  useEffect(() => {
    if (messages !== prevMessagesRef.current && messages.length > 0) {
      setHistory(prev => ({ ...prev, [historyKey]: messages }))
    }
    prevMessagesRef.current = messages
  }, [messages, historyKey])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const onModeChange = useCallback(
    (newMode: ChatMode) => {
      // Save current messages before switching
      if (messages.length > 0) {
        setHistory(prev => ({ ...prev, [historyKey]: messages }))
      }
      setMode(newMode)
      setInput('')
      // Restore messages for the new mode
      const newKey = newMode === 'general' ? 'general' : `project:${selectedProjectSlug}`
      setMessages(history[newKey] ?? [])
    },
    [messages, historyKey, selectedProjectSlug, history, setMessages]
  )

  const onProjectChange = useCallback(
    (slug: string) => {
      // Save current messages before switching
      if (messages.length > 0) {
        setHistory(prev => ({ ...prev, [historyKey]: messages }))
      }
      setSelectedProjectSlug(slug)
      setInput('')
      // Restore messages for the new project
      const newKey = `project:${slug}`
      setMessages(history[newKey] ?? [])
    },
    [messages, historyKey, history, setMessages]
  )

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    void sendMessage({ text: input })
    setInput('')
  }

  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className='fixed bottom-6 right-6 z-[1000] flex h-14 w-14 cursor-pointer items-center
          justify-center rounded-full border-none shadow-[0_4px_20px_rgba(0,0,0,0.25)]
          transition-transform duration-200 ease-in-out hover:scale-110'
        style={{
          background: colors.buttonBackground,
          color: colors.buttonText
        }}
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          {isOpen ? (
            <>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </>
          ) : (
            <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
          )}
        </svg>
      </button>

      {/* Chat panel — hidden via CSS instead of unmounting to preserve state */}
      <div
        className={`fixed bottom-[92px] right-6 z-[999] w-[min(400px,calc(100vw-48px))]
          h-[min(560px,calc(100vh-140px))] overflow-hidden rounded-2xl
          shadow-[0_8px_40px_rgba(0,0,0,0.2)] ${isOpen ? 'flex' : 'hidden'} flex-col`}
        style={{ border: `1px solid ${colors.secondaryText}33` }}
      >
        {/* Header */}
        <div
          className='shrink-0 px-5 pt-4 pb-3'
          style={{
            background: colors.buttonBackground,
            color: colors.buttonText
          }}
        >
          <div className='mb-2.5 text-[15px] font-semibold'>Ask me anything</div>

          {/* Mode tabs */}
          <div className='flex gap-1'>
            {(['general', 'project'] as const).map(m => (
              <button
                key={m}
                onClick={() => onModeChange(m)}
                className='cursor-pointer rounded-lg border-none px-3.5 py-[5px] text-xs
                  font-medium transition-[background] duration-150 ease-in-out'
                style={{
                  background: mode === m ? 'rgba(255,255,255,0.25)' : 'transparent',
                  color: colors.buttonText
                }}
              >
                {m === 'general' ? 'About Me' : 'Projects'}
              </button>
            ))}
          </div>

          {/* Project selector */}
          {mode === 'project' && (
            <select
              value={selectedProjectSlug}
              onChange={e => onProjectChange(e.target.value)}
              className='mt-2 w-full cursor-pointer rounded-lg border border-white/30
                bg-white/15 px-2.5 py-1.5 text-[13px] outline-none'
              style={{ color: colors.buttonText }}
            >
              {projects.map(p => (
                <option key={p.slug} value={p.slug} style={{ color: '#1C1C1E' }}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Messages area */}
        <div
          className='flex flex-1 flex-col gap-3 overflow-y-auto px-4 pt-4 pb-2'
          style={{ background: colors.background }}
        >
          {messages.length === 0 && (
            <div
              className='px-4 py-8 text-center text-[13px] leading-relaxed'
              style={{ color: colors.secondaryText }}
            >
              {mode === 'general'
                ? "Hi! Ask me about Anastasiia's skills, experience, or approach."
                : `Ask me about the ${projects.find(p => p.slug === selectedProjectSlug)?.name ?? 'selected'} project.`}
            </div>
          )}

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap break-words px-3.5 py-2.5
                  text-[13px] leading-relaxed ${
                    msg.role === 'user' ? 'rounded-xl rounded-br-sm' : 'rounded-xl rounded-bl-sm'
                  }`}
                style={
                  msg.role === 'user'
                    ? {
                        background: colors.buttonBackground,
                        color: colors.buttonText
                      }
                    : {
                        background: assistantBubbleBg(colors),
                        color: colors.text,
                        border: `1px solid ${colors.secondaryText}22`
                      }
                }
              >
                {getTextContent(msg)}
              </div>
            </div>
          ))}

          {status === 'submitted' && (
            <div className='flex justify-start'>
              <div
                className='rounded-xl rounded-bl-sm px-3.5 py-2.5 text-[13px]'
                style={{
                  color: colors.secondaryText,
                  background: assistantBubbleBg(colors),
                  border: `1px solid ${colors.secondaryText}22`
                }}
              >
                Thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={onSubmit}
          className='flex shrink-0 gap-2 px-4 py-3'
          style={{
            borderTop: `1px solid ${colors.secondaryText}22`,
            background: colors.background
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Type a message...'
            disabled={isLoading}
            className='flex-1 rounded-[10px] bg-transparent px-3.5 py-2.5 text-[13px]
              outline-none focus:[border-color:var(--accent)]'
            style={{
              border: `1px solid ${colors.secondaryText}33`,
              color: colors.text
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = colors.accent
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = colors.secondaryText + '33'
            }}
          />
          <button
            type='submit'
            disabled={isLoading || !input.trim()}
            aria-label='Send message'
            className='flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center
              rounded-[10px] border-none transition-opacity duration-150 ease-in-out
              disabled:cursor-default disabled:opacity-50'
            style={{
              background: colors.buttonBackground,
              color: colors.buttonText
            }}
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='22' y1='2' x2='11' y2='13' />
              <polygon points='22 2 15 22 11 13 2 9 22 2' />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}

export default PortfolioChat
