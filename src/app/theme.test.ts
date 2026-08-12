import { describe, it, expect } from 'vitest'
import { colorsGradient, darkColorsGradient } from './theme'
import { getThemeColors } from './context/ThemeContext'

describe('theme colors', () => {
  it('colorsGradient has all required color keys', () => {
    const keys = [
      'primary',
      'accent',
      'background',
      'cardBackground',
      'text',
      'secondaryText',
      'buttonBackground',
      'buttonText',
      'border',
      'primaryGeneral',
      'skillText'
    ] as const
    for (const key of keys) {
      expect(colorsGradient[key]).toBeDefined()
    }
  })

  it('darkColorsGradient has all required color keys', () => {
    const keys = Object.keys(colorsGradient)
    for (const key of keys) {
      expect(darkColorsGradient).toHaveProperty(key)
    }
  })

  it('light and dark themes have different primary colors', () => {
    expect(colorsGradient.primary).not.toBe(darkColorsGradient.primary)
  })
})

describe('getThemeColors', () => {
  it('returns light colors for "light" theme', () => {
    expect(getThemeColors('light')).toBe(colorsGradient)
  })

  it('returns dark colors for "dark" theme', () => {
    expect(getThemeColors('dark')).toBe(darkColorsGradient)
  })
})
