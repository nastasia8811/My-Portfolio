'use client'

import { useTheme } from '@/app/context/ThemeContext'

const Footer = () => {
  const { colors } = useTheme()

  return (
    <footer
      className='w-full py-6'
      style={{
        background: colors.background,
        borderTop: `1px solid ${colors.secondaryText}`
      }}
    >
      <div className='max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm'>
        <p style={{ color: colors.secondaryText }}>
          © {new Date().getFullYear()} Anastasiia Melnyk. All rights reserved.
        </p>

        <nav className='flex gap-6'>
          <a href='#' style={{ color: colors.text }} className='transition hover:opacity-80'>
            Learn
          </a>

          <a href='#' style={{ color: colors.text }} className='transition hover:opacity-80'>
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
