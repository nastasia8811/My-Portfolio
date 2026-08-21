'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react'
import { Fredoka } from 'next/font/google'

const fredoka = Fredoka({ subsets: ['latin'], weight: '700' })

const LETTERS = 'Anastasiia'.split('')

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let timedOut = false
    let loaded = document.readyState === 'complete'

    const tryFinish = () => {
      if (timedOut && loaded) setIsLoading(false)
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

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isLoading && (
          <m.div
            key='loader'
            className='fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0B0C10]'
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Ambient background orbs — brand accent + primary */}
            <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
              <div className='loader-orb loader-orb--accent' />
              <div className='loader-orb loader-orb--primary' />
              <div className='loader-orb loader-orb--blend' />
            </div>

            {/* Floating text + arrow container — all CSS-animated */}
            <div className={`loader-text-wrap relative ${fredoka.className}`}>
              {/* Glow behind text — accent purple */}
              <div
                className='pointer-events-none absolute inset-0 flex items-center justify-center'
                aria-hidden='true'
              >
                <span className='loader-glow whitespace-nowrap text-[clamp(2.5rem,10vw,7rem)] font-bold leading-none select-none'>
                  Anastasiia
                </span>
              </div>

              {/* Staggered bubble letters — CSS entrance via --i variable */}
              <div
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

              {/* Decorative cursor arrow — brand gradient primary → accent */}
              <svg
                className='loader-arrow absolute -bottom-4 -right-6 h-10 w-10 sm:-bottom-6 sm:-right-8 sm:h-14 sm:w-14'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <defs>
                  <linearGradient id='loader-arrow-grad' x1='0%' y1='0%' x2='100%' y2='100%'>
                    <stop offset='0%' stopColor='#2C3E50' />
                    <stop offset='100%' stopColor='#A259FF' />
                  </linearGradient>
                </defs>
                <path d='M5.5 2L21 12.5L13.5 13.5L16.5 22L12.5 20L9.5 13L5.5 17.5Z' />
              </svg>
            </div>

            <span className='sr-only' role='status'>
              Loading
            </span>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

export default LoadingScreen
