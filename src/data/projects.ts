export type Project = {
  slug: string
  title: string
  description: string
  coverSrc: string
  coverAlt: string
  demoHref?: string
  demoLabel?: string
  codeHref?: string
  tech?: string[]
  /** Deeper info used only by the chat, not shown on the card */
  details?: string[]
}

export const projects: Project[] = [
  {
    slug: 'portfolio-chat-api',
    title: 'Portfolio Chat API',
    description:
      'Backend service behind the chat on this site. Contains only the chat logic: streaming AI answers, ' +
      'request validation, rate limiting and an origin allow-list. All content is loaded from this portfolio, ' +
      'so the data lives in one place. Built as a separate API so I can plug it into my future projects with any UI.',
    coverSrc: '/chat-api.png',
    coverAlt: 'Portfolio chat widget answering a question',
    codeHref: 'https://github.com/nastasia8811/chat',
    tech: [
      'Next.js 15',
      'TypeScript',
      'Vercel AI SDK',
      'Anthropic API',
      'Zod',
      'Redis',
      'Vitest',
      'GitHub Actions',
      'Vercel'
    ],
    details: [
      'Separated from the portfolio into its own repo: the UI stays in each site, the API runs as an independent service on Vercel',
      'Streams answers in real time using the Vercel AI SDK message stream, compatible with the useChat hook',
      'Portfolio content is loaded at runtime from the portfolio site, so the data lives in one place and the assistant only knows what is published about me',
      'Security layers: strict request validation with Zod, per-IP rate limiting with Redis, an allow-list of origins (CORS), capped response length, and generic error messages',
      'The API key lives only in server environment variables and never reaches the browser',
      'Unit tests for every security rule with Vitest, and CI on GitHub Actions running lint, type check and tests',
      'Mock mode for local development without API costs'
    ]
  },
  {
    slug: 'my-portfolio',
    title: 'My Portfolio',
    description:
      'Personal portfolio site with theme switching, parallax hero, scroll animations, and an AI-powered chat. Built with Next.js App Router and Vercel AI SDK.',
    coverSrc: '/my-portfolio.png',
    coverAlt: 'My Portfolio website',
    demoHref: 'https://anastasiia-melnyk.vercel.app',
    demoLabel: 'Live site',
    codeHref: 'https://github.com/nastasia8811/My-Portfolio',
    tech: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vercel AI SDK',
      'Chat API integration'
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
  },
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
      'React Testing Library',
      'Biome',
      'Vercel'
    ],
    details: [
      'Completed client project, built end to end: requirements, UI design, development, testing and deployment',
      'Presents her paintings, biography and exhibitions, plus Impressum and Datenschutz pages',
      'The scroll-reactive artwork gallery can be paused and respects reduced motion',
      'Images optimized from 55 MB to about 2 MB per page load, with GPS/camera metadata removed',
      'One-click email copy and tap-to-call',
      'SEO setup: Open Graph, sitemap, Search Console',
      'Lighthouse mobile: Performance 100, SEO 100, Best Practices 96, Accessibility 96'
    ]
  }
]
