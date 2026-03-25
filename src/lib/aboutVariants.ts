import type { Variants } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

export const makeAboutVariants = (
  reduce: boolean
): { paragraphs: Variants; paragraphItem: Variants; cards: Variants; cardItem: Variants } => ({
  paragraphs: {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1 }
    }
  },
  paragraphItem: {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0.2 } : { duration: 0.5, ease: EASE }
    }
  },
  cards: {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.05 }
    }
  },
  cardItem: {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0.2 } : { duration: 0.5, ease: EASE }
    }
  }
})
