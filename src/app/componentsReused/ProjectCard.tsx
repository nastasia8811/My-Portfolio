'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'motion/react'
import { useTheme } from '@/app/context/ThemeContext'

type ProjectCardProps = {
  title: string
  description: string
  coverSrc: string
  coverAlt: string
  demoHref: string
  codeHref?: string
  tech?: string[]
}

const ProjectCard = ({
  title,
  description,
  coverSrc,
  coverAlt,
  demoHref,
  codeHref,
  tech
}: ProjectCardProps) => {
  const { colors } = useTheme()

  const borderColor = colors.border

  return (
    <m.article
      layout
      className='group relative overflow-hidden rounded-2xl border shadow-sm ring-1 transition'
      style={{
        background: colors.cardBackground,
        borderColor
      }}
    >
      <Link
        href={demoHref}
        aria-label={`${title} – Demo`}
        target='_blank'
        rel='noopener noreferrer'
        className='block focus:outline-none'
      >
        <figure className='relative aspect-[16/9] overflow-hidden'>
          <Image
            src={coverSrc}
            alt={coverAlt}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
            className='object-cover transition-transform duration-500 group-hover:scale-[1.04]'
            priority={false}
          />
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
        </figure>
      </Link>

      <div className='relative z-0 p-5' style={{ color: colors.text }}>
        <h3 className='text-lg font-semibold leading-snug' style={{ color: colors.primary }}>
          {title}
        </h3>

        {tech?.length ? (
          <ul className='mt-2 flex flex-wrap gap-1.5 text-xs' aria-label='Tech stack'>
            {tech.map(t => (
              <li
                key={t}
                className='rounded-full px-2 py-0.5'
                style={{
                  color: colors.secondaryText,
                  border: `1px solid ${borderColor}`,
                  background: !colors.background.includes('gradient')
                    ? colors.background
                    : 'transparent'
                }}
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        <p className='mt-3 text-sm' style={{ color: colors.primary }}>
          {description}
        </p>

        <nav aria-label='Project links' className='mt-4 flex items-center gap-3'>
          <Link
            href={demoHref}
            target='_blank'
            rel='noopener noreferrer'
            className='rounded-full px-3 py-1.5 text-sm font-medium underline-offset-4 transition hover:underline focus:outline-none focus-visible:ring-2'
            style={{
              color: colors.buttonText,
              background: colors.buttonBackground
            }}
          >
            Demo
          </Link>

          {codeHref ? (
            <Link
              href={codeHref}
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-full px-3 py-1.5 text-sm transition hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2'
              style={{ color: colors.primary }}
            >
              GitHub
            </Link>
          ) : null}
        </nav>
      </div>
      <span className='pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-transparent transition group-focus-within:ring-black/50 dark:group-focus-within:ring-white/50' />
    </m.article>
  )
}

export default ProjectCard
