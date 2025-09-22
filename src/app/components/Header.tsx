'use client'

import { useState } from 'react'
import { useTheme } from '@/app/context/ThemeContext'
import ModeButton from '@/app/components/ModeButton'
import { renderLinks } from '../../../utils/renderLinks'

const Header = () => {
  const { colors } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className='fixed top-0 left-0 w-full z-50 shadow-md'
      style={{
        // Use CSS vars already applied to :root, but also set explicit in case
        background: colors.background,
        color: colors.primary
      }}
    >
      <div className='max-w-screen-xl mx-auto flex items-center justify-between p-4'>
        <h3 className='h-8 cursor-pointer'>
          <a href={'#'} aria-label='Skip to home section'>
            Anastasiia Melnyk
          </a>
        </h3>

        <nav className='hidden md:flex space-x-6' style={{ color: colors.primary }}>
          {renderLinks()}
        </nav>
        <ModeButton className='hidden md:inline-flex' />

        <button
          type='button'
          className='md:hidden p-2'
          onClick={() => setMenuOpen(true)}
          aria-label='Open menu'
          aria-expanded={menuOpen}
          style={{ color: colors.text }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          className='fixed inset-0 z-40 backdrop-blur-sm flex flex-col items-center justify-center space-y-8 text-2xl px-6 transition-all duration-300 md:hidden'
          style={{
            background: typeof colors.background === 'string' ? colors.background : undefined,
            color: colors.text
          }}
        >
          <button
            type='button'
            onClick={() => setMenuOpen(false)}
            className='absolute top-5 right-5 text-3xl'
            aria-label='Close menu'
            style={{ color: colors.text }}
          >
            ✕
          </button>

          {renderLinks(() => setMenuOpen(false))}
          <ModeButton mobile />
        </div>
      )}
    </header>
  )
}

export default Header
