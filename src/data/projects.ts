export type Project = {
  slug: string
  title: string
  description: string
  coverSrc: string
  coverAlt: string
  demoHref: string
  demoLabel?: string
  codeHref?: string
  tech?: string[]
}

export const projects = [
  {
    slug: 'anna-wiebe-portfolio',
    title: 'Anna Wiebe — Artist Portfolio',
    description:
      'Client project built end to end for painter Anna Wiebe: a German single-page portfolio with a scroll-reactive, ' +
      'pausable artwork gallery and full keyboard accessibility. Images cut from 55 MB to about 2 MB per page load; ' +
      'Lighthouse mobile scores 100 for Performance and SEO.',
    coverSrc: '/anna-wiebe.png',
    coverAlt: 'Anna Wiebe artist portfolio website',
    demoHref: 'https://www.annawiebe.de',
    demoLabel: 'Live site',
    tech: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vitest',
      'Vercel'
    ]
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
