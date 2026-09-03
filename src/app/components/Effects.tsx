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

const STICKER_SPRING = { stiffness: 200, damping: 20 }
const STICKER_THRESHOLD = 200
const STICKER_FORCE = 50

interface StickerDef {
  id: number
  src: string
  srcSet: string
  alt: string
  left: string
  top: string
  width: string
  maxWidth: number
  rotation: number
}

const STICKERS: StickerDef[] = [
  {
    id: 0,
    src: 'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse.webp',
    srcSet:
      'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf3288a762026817436_papier-froisse.webp 1359w',
    alt: 'Shiny crumpled metallic blue foil sheet on black background.',
    left: '3%',
    top: '8%',
    width: '18vw',
    maxWidth: 220,
    rotation: 0
  },
  {
    id: 1,
    src: 'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing.webp',
    srcSet:
      'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101c34913dd6111b16324e_chwing.webp 1250w',
    alt: 'Close-up of a swirl of smooth pink frosting or cream against a transparent background.',
    left: '80%',
    top: '3%',
    width: '14vw',
    maxWidth: 180,
    rotation: 0
  },
  {
    id: 2,
    src: 'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon.webp',
    srcSet:
      'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon-p-2000.webp 2000w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4d60716b3d6959657_bonbon.webp 2048w',
    alt: 'Candy wrapped in shiny silver foil with twisted ends on a white background.',
    left: '5%',
    top: '72%',
    width: '16vw',
    maxWidth: 200,
    rotation: 112
  },
  {
    id: 3,
    src: 'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix.webp',
    srcSet:
      'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf33377567d8f2bd507_asterix.webp 2048w',
    alt: 'Shiny black balloon shaped like an asterisk symbol on a white background.',
    left: '78%',
    top: '32%',
    width: '18vw',
    maxWidth: 240,
    rotation: 0
  },
  {
    id: 4,
    src: 'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb.webp',
    srcSet:
      'https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-500.webp 500w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-800.webp 800w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-1600.webp 1600w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb-p-2000.webp 2000w, https://cdn.prod.website-files.com/6a0c501c42b9751b78a9d1a7/6a101bf4026551468ed05521_coeur-bulle-nb.webp 2048w',
    alt: 'Heart-shaped object made of transparent bubble wrap in black and white.',
    left: '70%',
    top: '75%',
    width: '16vw',
    maxWidth: 220,
    rotation: -18
  }
]

interface NameLetterDef {
  id: number
  letter: string
  left: string
  top: string
  fontSize: string
  rotation: number
  colorKey: keyof ThemeColors
  opacity: number
}

const NAME_LETTERS: NameLetterDef[] = [
  {
    id: 0,
    letter: 'A',
    left: '20%',
    top: '12%',
    fontSize: '5vw',
    rotation: -15,
    colorKey: 'accent',
    opacity: 0.5
  },
  {
    id: 1,
    letter: 'N',
    left: '52%',
    top: '5%',
    fontSize: '4vw',
    rotation: 8,
    colorKey: 'primary',
    opacity: 0.45
  },
  {
    id: 2,
    letter: 'A',
    left: '82%',
    top: '14%',
    fontSize: '5.5vw',
    rotation: 12,
    colorKey: 'secondaryText',
    opacity: 0.5
  },
  {
    id: 3,
    letter: 'S',
    left: '6%',
    top: '45%',
    fontSize: '4.5vw',
    rotation: -10,
    colorKey: 'primary',
    opacity: 0.45
  },
  {
    id: 4,
    letter: 'T',
    left: '60%',
    top: '38%',
    fontSize: '4vw',
    rotation: 20,
    colorKey: 'accent',
    opacity: 0.5
  },
  {
    id: 5,
    letter: 'A',
    left: '88%',
    top: '55%',
    fontSize: '5vw',
    rotation: -8,
    colorKey: 'secondaryText',
    opacity: 0.45
  },
  {
    id: 6,
    letter: 'S',
    left: '22%',
    top: '80%',
    fontSize: '4.5vw',
    rotation: 15,
    colorKey: 'accent',
    opacity: 0.5
  },
  {
    id: 7,
    letter: 'I',
    left: '48%',
    top: '86%',
    fontSize: '3.5vw',
    rotation: -5,
    colorKey: 'primary',
    opacity: 0.45
  },
  {
    id: 8,
    letter: 'I',
    left: '68%',
    top: '82%',
    fontSize: '3.5vw',
    rotation: 10,
    colorKey: 'secondaryText',
    opacity: 0.5
  },
  {
    id: 9,
    letter: 'A',
    left: '38%',
    top: '62%',
    fontSize: '5vw',
    rotation: -18,
    colorKey: 'accent',
    opacity: 0.45
  }
]

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

const FloatingSticker = ({
  sticker,
  cursorX,
  cursorY,
  shouldAnimate
}: {
  sticker: StickerDef
  cursorX: MotionValue<number>
  cursorY: MotionValue<number>
  shouldAnimate: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = useRepulsion(
    cursorX,
    cursorY,
    ref,
    STICKER_THRESHOLD,
    STICKER_FORCE,
    shouldAnimate,
    STICKER_SPRING
  )

  return (
    <m.div
      ref={ref}
      className='absolute'
      style={{
        left: sticker.left,
        top: sticker.top,
        width: sticker.width,
        maxWidth: sticker.maxWidth,
        x,
        y,
        rotate: sticker.rotation
      }}
    >
      <img
        src={sticker.src}
        srcSet={sticker.srcSet}
        alt={sticker.alt}
        loading='eager'
        sizes='100vw'
        className='h-auto w-full'
      />
    </m.div>
  )
}

const ScatteredLetter = ({
  def,
  color,
  cursorX,
  cursorY,
  shouldAnimate
}: {
  def: NameLetterDef
  color: string
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
    <m.span
      ref={ref}
      className='absolute font-bold select-none'
      style={{
        left: def.left,
        top: def.top,
        fontSize: def.fontSize,
        color,
        opacity: def.opacity,
        x,
        y,
        rotate: def.rotation
      }}
    >
      {def.letter}
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
        {/* Decorative stickers — repel on hover */}
        <div aria-hidden='true' className='pointer-events-none absolute inset-0 overflow-hidden'>
          {STICKERS.map(sticker => (
            <FloatingSticker
              key={sticker.id}
              sticker={sticker}
              cursorX={cursorX}
              cursorY={cursorY}
              shouldAnimate={shouldAnimate}
            />
          ))}

          {/* Scattered name letters — ANASTASIIA */}
          {NAME_LETTERS.map(def => (
            <ScatteredLetter
              key={def.id}
              def={def}
              color={colors[def.colorKey]}
              cursorX={cursorX}
              cursorY={cursorY}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>
      </section>
    </LazyMotion>
  )
}

export default Effects
