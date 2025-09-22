export type Theme = 'light' | 'dark'

export type ThemeColors = {
  primary: string
  accent: string
  background: string
  cardBackground: string
  text: string
  secondaryText: string
  buttonBackground: string
  buttonText: string
  border: string
  primaryGeneral: string
}
export const colorsGradient: ThemeColors = {
  primary: '#2C3E50',
  accent: '#A259FF',
  background: '#FAFAFA',
  cardBackground: 'linear-gradient(135deg, #2C3E50, #A259FF)',
  text: '#1C1C1E',
  secondaryText: '#6E6E73',
  buttonBackground: '#A259FF',
  buttonText: '#FFFFFF',
  border: 'linear-gradient(135deg, #2C3E50, #A259FF)',
  primaryGeneral: '#2C3E50'
} as const

export const darkColorsGradient: ThemeColors = {
  primary: '#FFFFFF',
  accent: '#A259FF',
  background: 'linear-gradient(135deg, #0B0C10, #2C3E50)',
  cardBackground: '#1E1E1E',
  text: '#FAFAFA',
  secondaryText: '#A1A1AA',
  buttonBackground: '#A259FF',
  buttonText: '#FFFFFF',
  border: '#3A3A3C',
  primaryGeneral: '#2C3E50'
} as const
