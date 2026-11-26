'use client'

import { useMemo } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { useTheme } from '@/app/context/ThemeContext'
import PageTitle from '@/app/componentsReused/PageTitle'
import { SKILL_CATEGORIES } from '@/data/skillCategories'
import { makeAboutVariants } from '@/lib/aboutVariants'

const About = () => {
  const { colors } = useTheme()
  const reduce = useReducedMotion() ?? false
  const { paragraphs, paragraphItem, cards, cardItem } = useMemo(
    () => makeAboutVariants(reduce),
    [reduce]
  )

  return (
    <section
      id='about'
      aria-labelledby='about-heading'
      className='min-h-screen flex flex-col items-center justify-center px-4 py-32'
      style={{ background: colors.background }}
    >
      <div className='mx-auto w-full max-w-3xl px-6 pb-12 pt-10'>
        <LazyMotion features={domAnimation}>
          <m.div
            variants={paragraphs}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.2 }}
          >
            <PageTitle id='about-heading' title='About me' />

            <m.h2
              className='mb-1 text-[clamp(2rem,5vw,3.2rem)] font-normal leading-[1.15]'
              style={{ color: colors.primary, fontFamily: 'serif' }}
              variants={paragraphItem}
            >
              I build websites
              <br />
              people <em style={{ color: colors.accent }}>actually</em> enjoy using.
            </m.h2>

            <m.div
              className='my-6 h-0.5 w-12 rounded-full'
              style={{ background: colors.accent }}
              variants={paragraphItem}
            />

            <m.p
              className='mb-5 text-base font-light leading-[1.8]'
              style={{ color: colors.secondaryText }}
              variants={paragraphItem}
            >
              My path to engineering wasn&apos;t a straight line — and that&apos;s probably what
              makes me a better developer. Before writing code, I spent years managing B2B
              partnerships, so I know how to understand what people actually need.
            </m.p>

            <m.p
              className='mb-5 text-base font-light leading-[1.8]'
              style={{ color: colors.secondaryText }}
              variants={paragraphItem}
            >
              Today I work across the full stack{' '}
            </m.p>
          </m.div>
          <m.div
            className='mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2'
            variants={cards}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.15 }}
          >
            {SKILL_CATEGORIES.map(category => (
              <m.div
                key={category.title}
                className='rounded-2xl border p-5'
                style={{
                  borderColor: colors.secondaryText + '22',
                  background: colors.cardBackground
                }}
                variants={cardItem}
              >
                <h3
                  className='mb-3 flex items-center gap-2 text-[11px] font-normal uppercase tracking-[0.18em]'
                  style={{ color: colors.accent }}
                >
                  <span
                    className='inline-block h-1.5 w-1.5 rounded-full'
                    style={{ background: colors.accent }}
                  />
                  {category.title}
                </h3>
                <ul className='flex flex-wrap gap-2 list-none p-0'>
                  {category.skills.map(skill => (
                    <li
                      key={skill}
                      className='rounded-full border px-3 py-1 text-xs tracking-wide'
                      style={{
                        color: colors.skillText,
                        borderColor: colors.secondaryText + '33',
                        background: 'transparent'
                      }}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </m.div>
            ))}
          </m.div>

          <m.blockquote
            className='my-8 border-l-2 py-2 pl-6 italic'
            style={{
              borderColor: colors.accent,
              color: colors.secondaryText,
              fontFamily: 'serif',
              fontSize: '1.15rem',
              lineHeight: 1.6
            }}
            variants={paragraphItem}
          >
            &quot;Her exceptional motivation and enthusiasm for her work were particularly
            noteworthy. Even under high workloads, she proved herself to be highly resilient and
            reliable.&quot;
            <cite
              className='mt-2 block not-italic'
              style={{ color: colors.secondaryText, fontFamily: 'sans-serif', fontSize: '12px' }}
            >
              — PINKTUM, Reference Letter 2025
            </cite>
          </m.blockquote>
        </LazyMotion>
      </div>
    </section>
  )
}

export default About
