'use client'

import { useMemo } from 'react'
import { LazyMotion, domAnimation, m, type Variants, useReducedMotion } from 'motion/react'
import { useTheme } from '@/app/context/ThemeContext'
import ProjectCard from '@/app/componentsReused/ProjectCard'
import { projects } from '../../../public/projects'
import PageTitle from '@/app/componentsReused/PageTitle'

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
    <div
      aria-labelledby='projects-heading'
      className='min-h-screen flex flex-col items-center justify-center px-4 text-center'
      style={{ background: colors.background }}
    >
      <PageTitle id='projects-heading' title='Selected Projects' />
      <LazyMotion features={domAnimation}>
        <m.ul
          role='list'
          className='grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3'
          variants={container}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.22 }}
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
    </div>
  )
}

export default Projects
