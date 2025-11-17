'use client'

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  ReactNode,
  useCallback
} from 'react'
import { colorsGradient, darkColorsGradient, Theme, ThemeColors } from '@/app/theme'

export const getThemeColors = (theme: Theme): ThemeColors =>
  theme === 'light' ? colorsGradient : darkColorsGradient

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  colors: ThemeColors
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const applyCssVariables = (colors: ReturnType<typeof getThemeColors>) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  Object.entries(colors).forEach(([k, v]) => {
    root.style.setProperty(`--${k}`, String(v))
  })
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light')
  const colors = useMemo(() => getThemeColors(theme), [theme])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as Theme | null
      if (saved === 'light' || saved === 'dark') setTheme(saved)
    } catch {
      /* empty */
    }
  }, [])

  useEffect(() => {
    applyCssVariables(colors)
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme
    }
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* empty */
    }
  }, [theme, colors])

  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme, colors }), [theme, toggleTheme, colors])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
