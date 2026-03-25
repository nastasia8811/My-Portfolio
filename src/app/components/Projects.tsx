'use client'

import { useMemo } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { useTheme } from '@/app/context/ThemeContext'
import ProjectCard from '@/app/componentsReused/ProjectCard'
import { projects } from '@/data/projects'
import PageTitle from '@/app/componentsReused/PageTitle'
import { makeProjectsVariants } from '@/lib/projectsVariants'

const Projects = () => {
  const { colors } = useTheme()
  const reduce = useReducedMotion() ?? false
  const { container, item } = useMemo(() => makeProjectsVariants(reduce), [reduce])

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
