import React, { type ReactNode } from 'react'
import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

// Mock next/image — render a plain <img> with the same props
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, priority: _priority, ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />
  }
}))

// Mock motion/react — proxy that renders plain HTML elements and strips animation props
vi.mock('motion/react', () => {
  const animationProps = new Set([
    'initial',
    'animate',
    'exit',
    'variants',
    'transition',
    'whileHover',
    'whileTap',
    'whileFocus',
    'whileDrag',
    'whileInView',
    'layout',
    'layoutId',
    'custom',
    'viewport',
    'onAnimationStart',
    'onAnimationComplete'
  ])

  const stripMotionProps = (props: Record<string, unknown>) => {
    const clean: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(props)) {
      if (!animationProps.has(k)) clean[k] = v
    }
    return clean
  }

  const handler: ProxyHandler<object> = {
    get: (_target, prop: string) => (props: Record<string, unknown> & { children?: ReactNode }) => {
      const { children, ...rest } = props ?? {}
      const clean = stripMotionProps(rest)
      return React.createElement(prop, clean, children)
    }
  }

  const mockMotionValue = (initial = 0) => ({
    get: () => initial,
    set: () => {},
    on: () => () => {},
    onChange: () => () => {},
    destroy: () => {}
  })

  return {
    m: new Proxy({}, handler),
    motion: new Proxy({}, handler),
    AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
    LazyMotion: ({ children }: { children: ReactNode }) => <>{children}</>,
    domAnimation: {},
    useReducedMotion: vi.fn(() => false),
    useMotionValue: (initial: number) => mockMotionValue(initial),
    useTransform: () => mockMotionValue(0),
    useSpring: () => mockMotionValue(0)
  }
})
