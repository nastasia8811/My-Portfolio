'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const HeroParallax = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const video = videoRef.current
    const section = wrapperRef.current
    if (!video || !section) return

    let raf = 0
    let lastY = 0
    const speed = 0.35

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onScroll = () => {
      if (reduceMotion) return
      lastY = window.scrollY
      if (!raf) raf = requestAnimationFrame(update)
    }

    const update = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight
      const progress = 1 - Math.min(Math.max(rect.top / viewportH, -1), 1)
      const translate = progress * 100 * speed
      video.style.transform = `translateY(${translate}px) scale(1.05)`
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id='home' ref={wrapperRef} className='relative min-h-[100svh] overflow-hidden'>
      <video
        ref={videoRef}
        className='pointer-events-none absolute inset-0 h-full w-full object-cover will-change-transform'
        src='/anastasiia.mp4'
        poster='/me.png'
        autoPlay
        muted
        loop
        playsInline
      />

      <div className='absolute inset-0 bg-black/30' />

      {/* Контент поверх */}
      <div className='relative z-10 mx-auto grid min-h-[100svh] max-w-5xl content-center px-6 pt-28 pb-20'>
        {/*<div className='relative z-10 mx-auto flex h-full max-w-5xl flex-col items-start justify-center px-6'>*/}
        <h1 className='text-4xl/tight md:text-6xl font-semibold text-white'>
          I’m Anastasiia — Frontend Developer
        </h1>
        <p className='mt-4 max-w-2xl text-white/90 md:text-lg'>
          {' '}
          Creating fast, accessible, and beautiful interfaces with a passion for React, Next.js, and
          caring UX
        </p>
        <Link
          href='#projects'
          aria-label='Skip to projects section'
          className='mt-8 inline-flex w-auto justify-center rounded-full bg-white/90 px-6 py-3 text-sm font-medium text-gray-900 backdrop-blur hover:bg-white place-self-start transform transition duration-300 hover:-translate-y-1 hover:scale-105'
        >
          Explore My Projects
        </Link>
      </div>
    </section>
  )
}

export default HeroParallax
