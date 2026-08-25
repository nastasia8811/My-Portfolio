'use client'

import { useEffect, useRef } from 'react'
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from 'motion/react'
import type { MotionValue } from 'motion/react'
import { useTheme } from '@/app/context/ThemeContext'
import type { ThemeColors } from '@/app/theme'

/* ── types & constants ───────────────────────────────────────── */

type ShapeType = 'circle' | 'square' | 'triangle'

interface ShapeDef {
  id: number
  type: ShapeType
  x: number
  y: number
  size: number
  colorKey: keyof ThemeColors
  opacity: number
}

const SHAPES: ShapeDef[] = [
  { id: 0, type: 'circle', x: 10, y: 20, size: 60, colorKey: 'accent', opacity: 0.2 },
  { id: 1, type: 'square', x: 85, y: 15, size: 45, colorKey: 'primary', opacity: 0.15 },
  { id: 2, type: 'triangle', x: 20, y: 75, size: 50, colorKey: 'secondaryText', opacity: 0.18 },
  { id: 3, type: 'circle', x: 75, y: 70, size: 70, colorKey: 'accent', opacity: 0.22 },
  { id: 4, type: 'square', x: 50, y: 10, size: 35, colorKey: 'secondaryText', opacity: 0.15 },
  { id: 5, type: 'circle', x: 90, y: 50, size: 55, colorKey: 'primary', opacity: 0.2 },
  { id: 6, type: 'triangle', x: 30, y: 40, size: 40, colorKey: 'accent', opacity: 0.17 },
  { id: 7, type: 'square', x: 65, y: 85, size: 50, colorKey: 'secondaryText', opacity: 0.2 },
  { id: 8, type: 'circle', x: 5, y: 50, size: 45, colorKey: 'primary', opacity: 0.15 },
  { id: 9, type: 'triangle', x: 45, y: 90, size: 55, colorKey: 'accent', opacity: 0.22 }
]

const LETTERS = ['H', 'e', 'l', 'l', 'o', '!'] as const

const SHAPE_SPRING = { stiffness: 300, damping: 25 }
const LETTER_SPRING = { stiffness: 150, damping: 12 }

const SHAPE_THRESHOLD = 150
const SHAPE_FORCE = 40
const LETTER_THRESHOLD = 120
const LETTER_FORCE = 25

/* ── hooks ───────────────────────────────────────────────────── */

const useRepulsion = (
  cursorX: MotionValue<number>,
  cursorY: MotionValue<number>,
  ref: React.RefObject<HTMLElement | null>,
  threshold: number,
  maxForce: number,
  shouldAnimate: boolean,
  springConfig: { stiffness: number; damping: number }
) => {
  const rawX = useTransform([cursorX, cursorY], ([cx, cy]) => {
    if (!shouldAnimate || !ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    const dx = (cx as number) - (rect.left + rect.width / 2)
    const dy = (cy as number) - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist > threshold || dist === 0) return 0
    return -(dx / dist) * (1 - dist / threshold) * maxForce
  })

  const rawY = useTransform([cursorX, cursorY], ([cx, cy]) => {
    if (!shouldAnimate || !ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    const dx = (cx as number) - (rect.left + rect.width / 2)
    const dy = (cy as number) - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist > threshold || dist === 0) return 0
    return -(dy / dist) * (1 - dist / threshold) * maxForce
  })

  return { x: useSpring(rawX, springConfig), y: useSpring(rawY, springConfig) }
}

/* ── sub-components ──────────────────────────────────────────── */

const FloatingShape = ({
  shape,
  color,
  cursorX,
  cursorY,
  shouldAnimate
}: {
  shape: ShapeDef
  color: string
  cursorX: MotionValue<number>
  cursorY: MotionValue<number>
  shouldAnimate: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = useRepulsion(
    cursorX,
    cursorY,
    ref,
    SHAPE_THRESHOLD,
    SHAPE_FORCE,
    shouldAnimate,
    SHAPE_SPRING
  )

  const shapeClass =
    shape.type === 'circle' ? 'rounded-full' : shape.type === 'square' ? 'rounded-lg' : ''

  const clipPath = shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined

  return (
    <m.div
      ref={ref}
      aria-hidden='true'
      className={`absolute ${shapeClass}`}
      style={{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        width: shape.size,
        height: shape.size,
        backgroundColor: color,
        opacity: shape.opacity,
        clipPath,
        x,
        y
      }}
    />
  )
}

const MagneticLetter = ({
  letter,
  cursorX,
  cursorY,
  shouldAnimate
}: {
  letter: string
  cursorX: MotionValue<number>
  cursorY: MotionValue<number>
  shouldAnimate: boolean
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const { x, y } = useRepulsion(
    cursorX,
    cursorY,
    ref,
    LETTER_THRESHOLD,
    LETTER_FORCE,
    shouldAnimate,
    LETTER_SPRING
  )

  return (
    <m.span ref={ref} className='inline-block' style={{ x, y }}>
      {letter}
    </m.span>
  )
}

/* ── main component ──────────────────────────────────────────── */

const Effects = () => {
  const { colors } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const cursorX = useMotionValue(-9999)
  const cursorY = useMotionValue(-9999)

  const shouldAnimate = !prefersReducedMotion

  useEffect(() => {
    if (!shouldAnimate) return
    const section = sectionRef.current
    if (!section) return

    let rafId = 0

    const onPointerMove = (e: PointerEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
      })
    }

    section.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      section.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(rafId)
    }
  }, [shouldAnimate, cursorX, cursorY])

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        id='effects'
        className='relative flex min-h-screen items-center justify-center'
        style={{ background: colors.background }}
      >
        <div
          data-testid='shapes-layer'
          className='pointer-events-none absolute inset-0 overflow-hidden'
        >
          {SHAPES.map(shape => (
            <FloatingShape
              key={shape.id}
              shape={shape}
              color={colors[shape.colorKey]}
              cursorX={cursorX}
              cursorY={cursorY}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>

        <h2
          aria-label='Hello!'
          className='relative z-10 text-6xl font-bold tracking-tight sm:text-8xl'
          style={{ color: colors.primary }}
        >
          {LETTERS.map((letter, i) => (
            <MagneticLetter
              key={i}
              letter={letter}
              cursorX={cursorX}
              cursorY={cursorY}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </h2>
      </section>
    </LazyMotion>
  )
}

export default Effects
