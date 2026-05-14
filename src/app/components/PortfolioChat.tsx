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
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          background: colors.buttonBackground,
          color: colors.buttonText,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
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
        style={{
          position: 'fixed',
          bottom: 92,
          right: 24,
          zIndex: 999,
          width: 'min(400px, calc(100vw - 48px))',
          height: 'min(560px, calc(100vh - 140px))',
          borderRadius: 16,
          overflow: 'hidden',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          border: `1px solid ${colors.secondaryText}33`
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px 12px',
            background: colors.buttonBackground,
            color: colors.buttonText,
            flexShrink: 0
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              marginBottom: 10
            }}
          >
            Ask me anything
          </div>

          {/* Mode tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {(['general', 'project'] as const).map(m => (
              <button
                key={m}
                onClick={() => onModeChange(m)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 500,
                  transition: 'background 0.15s ease',
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
              style={{
                marginTop: 8,
                width: '100%',
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.15)',
                color: colors.buttonText,
                fontSize: 13,
                outline: 'none',
                cursor: 'pointer'
              }}
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
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 16px 8px',
            background: colors.background,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                color: colors.secondaryText,
                fontSize: 13,
                padding: '32px 16px',
                lineHeight: 1.6
              }}
            >
              {mode === 'general'
                ? "Hi! Ask me about Anastasiia's skills, experience, or approach."
                : `Ask me about the ${projects.find(p => p.slug === selectedProjectSlug)?.name ?? 'selected'} project.`}
            </div>
          )}

          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: 12,
                  fontSize: 13,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  ...(msg.role === 'user'
                    ? {
                        background: colors.buttonBackground,
                        color: colors.buttonText,
                        borderBottomRightRadius: 4
                      }
                    : {
                        background: colors.cardBackground.startsWith('linear')
                          ? colors.secondaryText + '18'
                          : colors.cardBackground,
                        color: colors.text,
                        borderBottomLeftRadius: 4,
                        border: `1px solid ${colors.secondaryText}22`
                      })
                }}
              >
                {getTextContent(msg)}
              </div>
            </div>
          ))}

          {status === 'submitted' && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  fontSize: 13,
                  color: colors.secondaryText,
                  background: colors.cardBackground.startsWith('linear')
                    ? colors.secondaryText + '18'
                    : colors.cardBackground,
                  border: `1px solid ${colors.secondaryText}22`,
                  borderBottomLeftRadius: 4
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
          style={{
            padding: '12px 16px',
            borderTop: `1px solid ${colors.secondaryText}22`,
            background: colors.background,
            display: 'flex',
            gap: 8,
            flexShrink: 0
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Type a message...'
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 10,
              border: `1px solid ${colors.secondaryText}33`,
              background: 'transparent',
              color: colors.text,
              fontSize: 13,
              outline: 'none'
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
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: 'none',
              background: colors.buttonBackground,
              color: colors.buttonText,
              cursor: isLoading || !input.trim() ? 'default' : 'pointer',
              opacity: isLoading || !input.trim() ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'opacity 0.15s ease'
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
