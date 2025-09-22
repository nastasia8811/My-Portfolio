'use client'

import { ButtonHTMLAttributes } from 'react'
import { useTheme } from '@/app/context/ThemeContext'

interface ModeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mobile?: boolean
}

const ModeButton = ({ mobile, className = '', ...props }: ModeButtonProps) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-label='Toggle color mode'
      className={`cursor-pointer px-3 py-2 rounded-2xl shadow transition active:scale-[0.98] ${className}`}
      {...props}
    >
      {mobile ? (theme === 'dark' ? 'Light mode' : 'Dark mode') : theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
export default ModeButton
