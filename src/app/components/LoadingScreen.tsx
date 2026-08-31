'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({ subsets: ['latin'], weight: '700' })

const LETTERS = 'Anastasiia'.split('')

type Phase = 'loading' | 'exiting' | 'done'

type FlipValues = { x: number; y: number; scale: number }

const FLIP_DURATION = 0.7
const FLIP_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const LoadingScreen = () => {
  const [phase, setPhase] = useState<Phase>('loading')
  const [flip, setFlip] = useState<FlipValues | null>(null)
  const letterContainerRef = useRef<HTMLDivElement>(null)
  const nameWrapperRef = useRef<HTMLDivElement>(null)

  // Gate: wait for both min-time and page load
  useEffect(() => {
    let timedOut = false
    let loaded = document.readyState === 'complete'

    const tryFinish = () => {
      if (timedOut && loaded) setPhase('exiting')
    }

    const timer = setTimeout(() => {
      timedOut = true
      tryFinish()
    }, 1500)

    const onLoad = () => {
      loaded = true
      tryFinish()
    }

    if (!loaded) {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  // Lock scroll during loading
  useEffect(() => {
    if (phase !== 'done') {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase])

  // FLIP measurement when entering 'exiting' phase
  useEffect(() => {
    if (phase !== 'exiting') return

    // Reduced motion: skip FLIP, just finish immediately after a short fade
    if (prefersReducedMotion()) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('preloader-done'))
        setPhase('done')
      }, 800)
      return () => clearTimeout(timer)
    }

    // Freeze CSS animations before measuring
    const wrapper = nameWrapperRef.current
    if (wrapper) {
      wrapper.classList.add('loader-exiting')
      // Force reflow so animation: none takes effect before measurement
      void wrapper.offsetHeight
    }

    const first = letterContainerRef.current?.getBoundingClientRect()
    const headerLogo = document.querySelector('[data-header-logo]')
    const last = headerLogo?.getBoundingClientRect()

    if (first && last) {
      setFlip({
        x: last.left - first.left,
        y: last.top - first.top,
        scale: last.height / first.height
      })
    } else {
      // Fallback: if header logo not found, just fade out
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('preloader-done'))
        setPhase('done')
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const onFlipComplete = useCallback(() => {
    window.dispatchEvent(new CustomEvent('preloader-done'))
    setPhase('done')
  }, [])

  if (phase === 'done') return null

  const isExiting = phase === 'exiting'
  const reducedMotion = prefersReducedMotion()

  return (
    <LazyMotion features={domAnimation}>
      <div className='fixed inset-0 z-[9999] overflow-hidden' aria-live='polite'>
        {/* Background */}
        <m.div
          className='absolute inset-0 bg-[#0B0C10]'
          animate={isExiting ? { opacity: 0 } : undefined}
          transition={{ duration: reducedMotion ? 0.8 : 0.4, ease: 'easeOut' }}
        />

        {/* Orbs */}
        <m.div
          className='pointer-events-none absolute inset-0'
          aria-hidden='true'
          animate={isExiting ? { opacity: 0 } : undefined}
          transition={{ duration: reducedMotion ? 0.8 : 0.4, ease: 'easeOut' }}
        >
          <div className='loader-orb loader-orb--accent' />
          <div className='loader-orb loader-orb--primary' />
          <div className='loader-orb loader-orb--blend' />
        </m.div>

        {/* Name wrapper — FLIP animated */}
        <m.div
          ref={nameWrapperRef}
          className={`absolute inset-0 flex items-center justify-center ${fredoka.className}`}
          style={{ transformOrigin: '0 0' }}
          animate={
            isExiting && flip
              ? { x: flip.x, y: flip.y, scale: flip.scale }
              : isExiting && reducedMotion
                ? { opacity: 0 }
                : undefined
          }
          transition={{
            duration: FLIP_DURATION,
            ease: FLIP_EASE
          }}
          onAnimationComplete={isExiting && flip ? onFlipComplete : undefined}
        >
          {/* Glow */}
          <m.div
            className='pointer-events-none absolute inset-0 flex items-center justify-center'
            aria-hidden='true'
            animate={isExiting ? { opacity: 0 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <span className='loader-glow whitespace-nowrap text-[clamp(2.5rem,10vw,7rem)] font-bold leading-none select-none'>
              Anastasiia
            </span>
          </m.div>

          {/* Letter container — measured for FLIP */}
          <div
            ref={letterContainerRef}
            className='relative flex whitespace-nowrap select-none'
            role='img'
            aria-label='Anastasiia'
          >
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                className='loader-letter text-[clamp(2.5rem,10vw,7rem)] font-bold leading-none'
                style={{ '--i': i } as React.CSSProperties}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <m.svg
            className='loader-arrow absolute -bottom-4 -right-6 h-10 w-10 sm:-bottom-6 sm:-right-8 sm:h-14 sm:w-14'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            animate={isExiting ? { opacity: 0 } : undefined}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <defs>
              <linearGradient id='loader-arrow-grad' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='#2C3E50' />
                <stop offset='100%' stopColor='#A259FF' />
              </linearGradient>
            </defs>
            <path d='M5.5 2L21 12.5L13.5 13.5L16.5 22L12.5 20L9.5 13L5.5 17.5Z' />
          </m.svg>
        </m.div>

        <span className='sr-only' role='status'>
          Loading
        </span>
      </div>
    </LazyMotion>
  )
}

export default LoadingScreen
