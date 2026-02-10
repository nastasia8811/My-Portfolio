'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import DownloadButton from '@/app/componentsReused/DownloadButton'

const HeroParallax = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = wrapperRef.current
    if (!video || !section) return

    let raf = 0
    const speed = 0.35
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section
      id='home'
      ref={wrapperRef}
      className='relative h-screen w-full overflow-hidden aspect-[16/9]'
    >
      <video
        ref={videoRef}
        className='pointer-events-none absolute inset-0 h-full w-full object-cover block aspect-[16/9]'
        src='/hero1.mp4'
        poster='/me.png'
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
      />

      <div className='absolute inset-0 bg-black/30' />

      <div className='relative z-10 mx-auto grid  min-h-screen max-w-5xl content-center px-6 pt-28 pb-20'>
        <h1 className='text-4xl/tight md:text-6xl font-semibold text-white'>
          I’m Anastasiia — Frontend Developer
        </h1>
        <p className='mt-4 max-w-2xl text-white/90 md:text-lg'>
          Creating fast, accessible, and beautiful interfaces with a passion for React, Next.js, and
          caring UX
        </p>
        <div className='mt-8 flex flex-wrap gap-4'>
          <Link
            href='#projects'
            className='inline-flex w-auto justify-center rounded-full bg-white/90 px-6 py-3 text-sm font-medium text-gray-900 backdrop-blur
                   transform transition duration-300 hover:bg-white hover:-translate-y-1 hover:scale-105'
          >
            Explore My Projects
          </Link>
          <DownloadButton
            href='/CV_Frontend_Melnyk_Anastasiia.pdf'
            filename='CV_Frontend_Melnyk_Anastasiia.pdf'
            label='Download CV'
            className='inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium
                       bg-transparent text-white border border-white/70
                       transition-all duration-300
                       hover:bg-white hover:text-gray-900 hover:-translate-y-1 hover:scale-105
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white'
          />
        </div>
      </div>
    </section>
  )
}

export default HeroParallax
