'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const HeroParallax = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = wrapperRef.current
    if (!video || !section) return

    let raf = 0
    const speed = 0.35
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduceMotion = mql.matches

    const onMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches
      if (reduceMotion) {
        video.style.transform = 'scale(1.1)'
      } else {
        requestAnimationFrame(update)
      }
    }

    mql.addEventListener('change', onMotionChange)

    const onScroll = () => {
      if (reduceMotion) return
      if (!raf) raf = requestAnimationFrame(update)
    }

    const update = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight
      const progress = 1 - Math.min(Math.max(rect.top / viewportH, -1), 1)
      const translate = progress * 100 * speed
      video.style.transform = `translateY(${translate}px) scale(1.1)`
    }
    requestAnimationFrame(update)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      mql.removeEventListener('change', onMotionChange)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id='home' ref={wrapperRef} className='relative h-screen w-full overflow-hidden'>
      <video
        ref={videoRef}
        className='pointer-events-none absolute inset-0 h-full w-full object-cover block will-change-transform'
        src='/hero1.mp4'
        poster='/me.png'
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
      />

      <div className='absolute inset-0 bg-black/30' />

      <div className='relative z-10 mx-auto grid min-h-full max-w-5xl content-center px-6 pt-28 pb-20'>
        <h1 className='text-4xl/tight md:text-6xl font-semibold text-white'>Frontend Engineer</h1>

        <div className='mt-8 flex flex-wrap items-center gap-4'>
          <a
            href='https://www.linkedin.com/in/anastasiia-melnyk-frontend'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='LinkedIn'
            className='inline-flex items-center justify-center size-11 rounded-full bg-white/20 text-white backdrop-blur
                   transform transition duration-300 hover:bg-white/40 hover:-translate-y-1 hover:scale-110'
          >
            <FaLinkedin size={20} />
          </a>

          <a
            href='https://github.com/nastasia8811'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub'
            className='inline-flex items-center justify-center size-11 rounded-full bg-white/20 text-white backdrop-blur
                   transform transition duration-300 hover:bg-white/40 hover:-translate-y-1 hover:scale-110'
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroParallax
