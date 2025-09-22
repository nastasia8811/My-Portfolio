'use client'

import { useMemo } from 'react'
import { LazyMotion, domAnimation, m, type Variants, useReducedMotion } from 'motion/react'
import { useTheme } from '@/app/context/ThemeContext'
import ProjectCard from '@/app/components/ProjectCard'
import { projects } from '../../../public/projects'

const EASE = [0.22, 1, 0.36, 1] as const

const makeVariants = (reduce: boolean): { container: Variants; item: Variants } => ({
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

const Projects = () => {
  const { colors } = useTheme()
  const reduce = useReducedMotion() ?? false
  const { container, item } = useMemo(() => makeVariants(reduce), [reduce])

  return (
    <section
      aria-labelledby='projects-heading'
      className='mx-auto max-w-screen-xl px-4 py-12 md:py-16'
      style={{ background: colors.background }}
    >
      <header className='mb-8 md:mb-10'>
        <h2
          id='projects-heading'
          className='text-3xl font-semibold tracking-tight md:text-4xl'
          style={{ color: colors.primary }}
        >
          Selected Projects
        </h2>
      </header>

      <LazyMotion features={domAnimation}>
        <m.ul
          role='list'
          className='grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3'
          variants={container}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.22 }} // тригер під час скролу
        >
          {projects.map((project, i) => (
            <m.li
              key={project.slug}
              role='listitem'
              className='will-change-transform'
              variants={item}
              custom={{ index: i }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                coverSrc={project.coverSrc}
                coverAlt={project.coverAlt}
                demoHref={project.demoHref}
                codeHref={project.codeHref}
                tech={project.tech}
              />
            </m.li>
          ))}
        </m.ul>
      </LazyMotion>
    </section>
  )
}

export default Projects
