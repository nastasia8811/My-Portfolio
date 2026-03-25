import type { Variants } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

export const makeProjectsVariants = (reduce: boolean): { container: Variants; item: Variants } => ({
  container: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.05
      }
    }
  },
  item: {
    hidden: (custom: { index: number }) => {
      if (reduce) return { opacity: 0 }
      const fromLeft = custom.index % 2 === 1
      return { opacity: 0, x: fromLeft ? -32 : 0, y: fromLeft ? 0 : 40 }
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: reduce ? { duration: 0.2 } : { duration: 0.5, ease: EASE }
    }
  }
})
