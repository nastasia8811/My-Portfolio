'use client'

import { useMemo } from 'react'
import { LazyMotion, domAnimation, m, type Variants, useReducedMotion } from 'motion/react'
import { useTheme } from '@/app/context/ThemeContext'
import PageTitle from '@/app/componentsReused/PageTitle'

const EASE = [0.22, 1, 0.36, 1] as const

const SKILL_CATEGORIES = [
  {
    title: 'Core',
    skills: ['TypeScript', 'React & Next.js', 'HTML', 'CSS (SCSS)', 'Redux', 'REST']
  },
  {
    title: 'UI & Styling',
    skills: ['Tailwind CSS', 'Material UI', 'Bootstrap', 'CSS Modules', 'Responsive Design']
  },
  {
    title: 'Backend (Basic)',
    skills: ['Node.js', 'Express', 'MongoDB']
  },
  {
    title: 'Tools & AI',
    skills: ['Git', 'GitHub', 'AI-assisted Development & Claude Code (Anthropic AI)']
  }
] as const

const makeVariants = (
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

const About = () => {
  const { colors } = useTheme()
  const reduce = useReducedMotion() ?? false
  const { paragraphs, paragraphItem, cards, cardItem } = useMemo(
    () => makeVariants(reduce),
    [reduce]
  )

  return (
    <div
      aria-labelledby='about-heading'
      className='min-h-screen flex flex-col items-center justify-center px-4'
      style={{ background: colors.background }}
    >
      <PageTitle id='about-heading' title='About me' />

      <div className='max-w-screen-xl mx-auto px-4 w-full'>
        <LazyMotion features={domAnimation}>
          {/* Intro paragraphs */}
          <m.div
            className='grid grid-cols-1 gap-8 md:grid-cols-2'
            variants={paragraphs}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.3 }}
          >
            <m.p
              className='leading-7'
              style={{ color: colors.secondaryText }}
              variants={paragraphItem}
            >
              Frontend Developer with 2+ years of experience building high-performance web
              applications using React, Next.js, and TypeScript. I design scalable, maintainable UI
              architectures and deliver clean, user-focused interfaces aligned with product goals.
            </m.p>
            <m.p
              className='leading-7'
              style={{ color: colors.secondaryText }}
              variants={paragraphItem}
            >
              Leverage modern AI-assisted development tools including Claude Code for enhanced
              productivity in code generation, refactoring, and workflow automation. Experienced in
              API integration, performance optimization, and delivering production-ready solutions
              in cross-functional teams.
            </m.p>
          </m.div>

          {/* Skill cards */}
          <m.div
            className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-10'
            variants={cards}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.05 }}
          >
            {SKILL_CATEGORIES.map(category => (
              <m.div
                key={category.title}
                className='rounded-3xl p-6 shadow border'
                style={{
                  background: colors.cardBackground,
                  borderColor: colors.secondaryText + '22'
                }}
                variants={cardItem}
              >
                <h3 className='text-lg font-semibold mb-4' style={{ color: colors.buttonText }}>
                  {category.title}
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {category.skills.map(skill => (
                    <span
                      key={skill}
                      className='rounded-full px-3 py-1 text-sm border transition-transform duration-200 hover:scale-105'
                      style={{
                        color: colors.secondaryText,
                        borderColor: colors.secondaryText + '44',
                        background: colors.background
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = colors.accent
                        e.currentTarget.style.color = colors.accent
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = colors.secondaryText + '44'
                        e.currentTarget.style.color = colors.secondaryText
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </m.div>
            ))}
          </m.div>
        </LazyMotion>
      </div>
    </div>
  )
}

export default About
