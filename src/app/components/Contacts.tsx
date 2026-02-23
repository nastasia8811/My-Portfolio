'use client'

import { useMemo } from 'react'
import { LazyMotion, domAnimation, m, type Variants, useReducedMotion } from 'motion/react'
import { useTheme } from '@/app/context/ThemeContext'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import PageTitle from '@/app/componentsReused/PageTitle'

const EASE = [0.22, 1, 0.36, 1] as const

const makeVariants = (reduce: boolean): { container: Variants; item: Variants } => ({
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.05 }
    }
  },
  item: {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0.2 } : { duration: 0.5, ease: EASE }
    }
  }
})

const Contacts = () => {
  const { colors } = useTheme()
  const reduce = useReducedMotion() ?? false
  const { container, item } = useMemo(() => makeVariants(reduce), [reduce])

  return (
    <div
      aria-labelledby='contact-heading'
      className='min-h-screen flex flex-col items-center justify-center px-4 text-center'
      style={{ background: colors.background }}
    >
      <PageTitle id='contact-heading' title='Contact Me' />

      <LazyMotion features={domAnimation}>
        <m.div
          className='flex flex-col md:flex-row flex-wrap items-center justify-center gap-6'
          variants={container}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true, amount: 0.3 }}
        >
          <m.a
            href='https://www.linkedin.com/in/anastasiia-melnyk-frontend'
            target='_blank'
            className='group flex items-center gap-2 px-4 py-2 rounded-xl transition
              transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg'
            style={{
              background: colors.buttonBackground,
              color: colors.buttonText
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.accent}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = ''
            }}
            variants={item}
          >
            <span className='group-hover:scale-110 transition-transform duration-300'>
              <FaLinkedin size={20} />
            </span>
            <span>LinkedIn</span>
          </m.a>

          <m.a
            href='https://github.com/nastasia8811'
            target='_blank'
            className='group flex items-center gap-2 px-4 py-2 rounded-xl transition
              transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg'
            style={{
              background: colors.buttonBackground,
              color: colors.buttonText
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.accent}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = ''
            }}
            variants={item}
          >
            <span className='group-hover:scale-110 transition-transform duration-300'>
              <FaGithub size={20} />
            </span>
            <span>GitHub</span>
          </m.a>

          <m.a
            href='mailto:melnykk.ana@gmail.com'
            className='group flex items-center gap-2 px-4 py-2 rounded-xl transition
              transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg'
            style={{
              background: colors.buttonBackground,
              color: colors.buttonText
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.accent}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = ''
            }}
            variants={item}
          >
            <span className='group-hover:scale-110 transition-transform duration-300'>
              <MdEmail size={22} />
            </span>
            <span>Send Email</span>
          </m.a>

          <m.p className='w-full mt-8' style={{ color: colors.secondaryText }} variants={item}>
            Let&apos;s build something great together. Get in touch with me!
          </m.p>
        </m.div>
      </LazyMotion>
    </div>
  )
}

export default Contacts
