export type Project = {
  slug: string
  title: string
  description: string
  coverSrc: string
  coverAlt: string
  demoHref: string
  codeHref?: string
  tech?: string[]
}

export const projects = [
  {
    slug: 'anna-wiebe-portfolio',
    title: 'Anna Wiebe — Artist Portfolio',
    description:
      'A bilingual artist portfolio featuring a velocity-reactive infinite-scroll gallery, scroll-triggered CSS animations,' +
      'and an immersive exhibition showcase. Created as a landing page for the artist, with plans to grow it into a full website.',
    coverSrc: '/anna-wiebe.png',
    coverAlt: 'Anna Wiebe artist portfolio website',
    demoHref: 'https://www.annawiebe.de',
    tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vitest']
  },
  {
    slug: 'movie-explorer',
    title: 'FrameIT',
    description:
      'A movie discovery app powered by the TMDB API. Browse trending films, search by title, and explore detailed info with a clean, responsive UI. Built with Next.js and React Context for state management.',
    coverSrc: '/frame-it.png',
    coverAlt: 'Movie Explorer',
    demoHref: 'https://frame-it.vercel.app/',
    codeHref: 'https://github.com/nastasia8811/FrameIT',
    tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Query', 'TMDB API']
  }
] satisfies Project[]
