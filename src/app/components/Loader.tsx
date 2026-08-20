'use client'

import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants
} from 'motion/react'

const NAME = 'Anastasiia'
const MIN_VISIBLE_MS = 1500

const makeContainerVariants = (reduce: boolean): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.1 }
  }
})

const makeLetterVariants = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 46, scale: 0.55 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: reduce ? { duration: 0.2 } : { type: 'spring', stiffness: 260, damping: 16 }
  }
})

const Loader = () => {
  const [visible, setVisible] = useState(true)
  const reduce = useReducedMotion() ?? false

  useEffect(() => {
    const start = Date.now()
    const reveal = () => {
      const elapsed = Date.now() - start
      const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0)
      window.setTimeout(() => setVisible(false), remaining)
    }

    if (document.readyState === 'complete') {
      reveal()
      return
    }
    window.addEventListener('load', reveal)
    return () => window.removeEventListener('load', reveal)
  }, [])

  useEffect(() => {
    if (!visible) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {visible && (
          <m.div
            className='fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#07070c]'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
            role='status'
            aria-live='polite'
            aria-label='Loading portfolio'
          >
            <span
              aria-hidden='true'
              className='pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand-500/30 blur-[110px] animate-loader-float motion-reduce:animate-none'
            />
            <span
              aria-hidden='true'
              className='pointer-events-none absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-[#A259FF]/35 blur-[120px] animate-loader-float-delayed motion-reduce:animate-none'
            />

            <m.div
              animate={reduce ? undefined : { scale: [1, 1.015, 1] }}
              transition={
                reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
              }
              className='relative rounded-[2.5rem] border border-white/10 bg-white/[0.04] px-10 py-8 sm:px-16 sm:py-10 shadow-2xl backdrop-blur-xl'
            >
              <span
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-[#A259FF]/10'
              />
              <m.div
                className='loader-name relative flex select-none'
                variants={makeContainerVariants(reduce)}
                initial='hidden'
                animate='show'
              >
                {NAME.split('').map((char, i) => (
                  <m.span
                    key={`${char}-${i}`}
                    data-char={char}
                    variants={makeLetterVariants(reduce)}
                    className='loader-letter text-5xl sm:text-6xl md:text-8xl font-black'
                  >
                    {char}
                  </m.span>
                ))}
              </m.div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

export default Loader
