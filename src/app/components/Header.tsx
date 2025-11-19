'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/app/context/ThemeContext'
import ModeButton from '@/app/components/ModeButton'
import NavLinks from '@/app/componentsReused/NavLinks'

const Header = () => {
  const { colors } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
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
          <h3 className='h-8 cursor-pointer'>
            <a href='#' aria-label='Skip to home section' className='text-white'>
              Anastasiia Melnyk
            </a>
          </h3>

          <nav className='hidden md:flex space-x-6'>
            <NavLinks onClick={() => {}} />
          </nav>
          <ModeButton className='hidden md:inline-flex' />

          <button
            type='button'
            className='md:hidden p-2 text-white'
            onClick={() => setMenuOpen(true)}
            aria-label='Open menu'
            aria-expanded={menuOpen}
          >
            <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
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
          <ModeButton mobile />
        </div>
      )}
    </>
  )
}
export default Header
