import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Loader from './Loader'

describe('Loader', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.style.overflow = ''
  })

  it('shows the animated name while the page is loading', () => {
    render(<Loader />)
    expect(screen.getByRole('status', { name: 'Loading portfolio' })).toBeInTheDocument()
    'Anastasiia'.split('').forEach(char => {
      expect(screen.getAllByText(char).length).toBeGreaterThan(0)
    })
  })

  it('locks body scroll while visible', () => {
    render(<Loader />)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('hides itself after the page finishes loading', async () => {
    Object.defineProperty(document, 'readyState', { value: 'complete', configurable: true })
    render(<Loader />)

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500)
    })

    expect(screen.queryByRole('status', { name: 'Loading portfolio' })).not.toBeInTheDocument()
  })
})
