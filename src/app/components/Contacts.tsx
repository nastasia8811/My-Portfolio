'use client'

import { useCallback, useMemo, useState } from 'react'
import { LazyMotion, domAnimation, m, type Variants, useReducedMotion } from 'motion/react'
import { useTheme } from '@/app/context/ThemeContext'
import PageTitle from '@/app/componentsReused/PageTitle'

const EASE = [0.22, 1, 0.36, 1] as const

const makeVariants = (reduce: boolean): { container: Variants; item: Variants } => ({
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.15, delayChildren: reduce ? 0 : 0.1 }
    }
  },
  item: {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0.2 } : { duration: 0.6, ease: EASE }
    }
  }
})

const EMAIL_PARTS = ['melnykk', '.ana', '@', 'gmail', '.com'] as const
const EMAIL_CHARS = EMAIL_PARTS.join('').split('')

const IDLE_OPACITY = 0.3
const ACTIVE_OPACITY = 1
const CHAR_STAGGER = 0.025

const Contacts = () => {
  const { colors } = useTheme()
  const reduce = useReducedMotion() ?? false
  const { container, item } = useMemo(() => makeVariants(reduce), [reduce])
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)

  const email = useMemo(() => EMAIL_PARTS.join(''), [])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard access denied */
    }
  }, [email])

  return (
    <section
      id='contact'
      aria-labelledby='contact-heading'
      className='min-h-screen flex flex-col items-center justify-center px-4 text-center'
      style={{ background: colors.background }}
    >
      <PageTitle id='contact-heading' title='Say Hi' />

      <LazyMotion features={domAnimation}>
        <m.div
          className='flex flex-col items-center gap-6'
          variants={container}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.3 }}
        >
          <m.p
            className='text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight cursor-pointer select-all break-all'
            style={{ color: colors.accent }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              void handleCopy()
            }}
            role='text'
            aria-label={`Email: ${email}. Click to copy.`}
            variants={item}
          >
            {EMAIL_CHARS.map((char, i) => (
              <m.span
                key={i}
                animate={{
                  opacity: hovered ? ACTIVE_OPACITY : IDLE_OPACITY
                }}
                transition={
                  reduce
                    ? { duration: 0.15 }
                    : {
                        delay: hovered
                          ? i * CHAR_STAGGER
                          : (EMAIL_CHARS.length - 1 - i) * CHAR_STAGGER,
                        duration: 0.3,
                        ease: EASE
                      }
                }
              >
                {char}
              </m.span>
            ))}
          </m.p>

          <m.p
            className='text-sm tracking-wide transition-opacity duration-300'
            style={{
              color: copied ? colors.accent : colors.secondaryText,
              opacity: copied ? 1 : 0.7
            }}
            variants={item}
          >
            {copied ? 'Copied to clipboard!' : 'Click to copy'}
          </m.p>
        </m.div>
      </LazyMotion>
    </section>
  )
}

export default Contacts
