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
    slug: 'movie-explorer',
    title: 'FrameIT',
    description: 'Movie Explorer',
    coverSrc: '/frame-it.png',
    coverAlt: 'Movie Explorer',
    demoHref: 'https://frame-it.vercel.app/',
    codeHref: 'https://github.com/nastasia8811/FrameIT',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'TMDB API', 'React Context']
  }
] satisfies Project[]
