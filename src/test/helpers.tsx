import { render, type RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@/app/context/ThemeContext'
import type { ReactElement } from 'react'

export const renderWithTheme = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    ...options
  })
