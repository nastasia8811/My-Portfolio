'use client'

import { ButtonHTMLAttributes } from 'react'
import { useTheme } from '@/app/context/ThemeContext'

const ModeButton = ({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label='Toggle color mode'
      className={`cursor-pointer px-3 py-2 rounded-2xl shadow transition active:scale-[0.98] ${className}`}
      {...props}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
export default ModeButton
