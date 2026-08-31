'use client'

import { useEffect, useState } from 'react'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { useTheme } from '@/app/context/ThemeContext'
import ModeButton from '@/app/components/ModeButton'
import NavLinks from '@/app/componentsReused/NavLinks'

const Header = () => {
  const { colors } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Listen for preloader FLIP completion
  useEffect(() => {
    // If no preloader letters in DOM (tests, dev HMR), reveal immediately
    if (!document.querySelector('.loader-letter')) {
      setRevealed(true)
      return
    }

    const onPreloaderDone = () => setRevealed(true)
    window.addEventListener('preloader-done', onPreloaderDone, { once: true })
    return () => window.removeEventListener('preloader-done', onPreloaderDone)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <>
        <header
          className={[
            'fixed top-0 left-0 w-full z-50 transition-colors duration-300',
            scrolled
              ? 'bg-white/10 dark:bg-zinc-900/50 backdrop-blur border-b border-white/10 dark:border-white/10'
              : 'bg-transparent border-b border-transparent'
          ].join(' ')}
          style={{ color: colors.primary }}
        >
          <div className='max-w-screen-xl mx-auto flex items-center justify-between p-4'>
            <m.h3
              className='h-8 cursor-pointer'
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.01 }}
            >
              <a
                href='#'
                aria-label='Skip to home section'
                className='text-white uppercase'
                data-header-logo
              >
                Anastasiia
              </a>
            </m.h3>

            <m.nav
              className='hidden md:flex space-x-6'
              initial={{ opacity: 0, x: 20 }}
              animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
            >
              <NavLinks onClick={() => {}} />
            </m.nav>

            <m.div
              className='hidden md:inline-flex'
              initial={{ opacity: 0, x: 20 }}
              animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            >
              <ModeButton />
            </m.div>

            <m.button
              type='button'
              className='md:hidden p-2 text-white'
              onClick={() => setMenuOpen(true)}
              aria-label='Open menu'
              aria-expanded={menuOpen}
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.01 }}
            >
              <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </m.button>
          </div>
        </header>

        {menuOpen && (
          <div
            className={`
      fixed inset-0 z-[9999] flex flex-col items-center justify-center
      space-y-8 text-2xl px-6 md:hidden
      transition-all duration-300
      ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      backdrop-blur-sm
    `}
          >
            <button
              type='button'
              onClick={() => setMenuOpen(false)}
              className='absolute top-5 right-5 text-3xl text-white dark:text-zinc-200'
              aria-label='Close menu'
            >
              ✕
            </button>

            <NavLinks onClick={() => setMenuOpen(false)} />
            <ModeButton />
          </div>
        )}
      </>
    </LazyMotion>
  )
}
export default Header
