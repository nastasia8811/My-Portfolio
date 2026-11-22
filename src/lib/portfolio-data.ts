import { SKILL_CATEGORIES, type SkillCategory } from '@/data/skillCategories'

export type Experience = {
  company: string
  title: string
  period: string
  description: string
  highlights: string[]
}

export type Education = {
  institution: string
  degree: string
  period: string
  description?: string
}

export type PortfolioProject = {
  slug: string
  name: string
  description: string
  techStack: string[]
  details?: string[]
  githubUrl?: string
  liveUrl?: string
}

export type Developer = {
  name: string
  title: string
  location: string
  bio: string
  summary: string
  skills: readonly SkillCategory[]
  yearsOfExperience: number
  contacts: {
    email: string
    github: string
    linkedin: string
  }
}

export type PortfolioData = {
  developer: Developer
  experience: Experience[]
  education: Education[]
  projects: PortfolioProject[]
}

export const portfolioData: PortfolioData = {
  developer: {
    name: 'Anastasiia Melnyk',
    title: 'Full-stack Engineer',
    location: 'Hamburg, Germany',
    bio: 'Full-stack Engineer (Next.js, React, Node.js, TypeScript, SQL) with a non-linear career path — from managing complex B2B partnerships to building fast, accessible web apps and client websites. Works with companies as an engineer and with clients who need a website taken from first idea to launch, combining strong communication skills from years in business with a deep love for clean code and thoughtful user experiences.',
    summary:
      'Full-stack Engineer in Hamburg building fast, accessible websites and web apps with Next.js, React, Node.js and TypeScript, for product teams and for clients.',
    skills: SKILL_CATEGORIES,
    yearsOfExperience: 2.2,
    contacts: {
      email: 'melnykk.ana@gmail.com',
      github: 'https://github.com/nastasia8811',
      linkedin: 'https://www.linkedin.com/in/anastasiia-melnyk-frontend'
    }
  },

  experience: [
    {
      company: 'PINKTUM',
      title: 'Frontend Engineer',
      period: '01.08.2024 - 31.10.2025',
      description:
        'AI-powered SaaS e-learning platform used by enterprise clients across multiple countries.',
      highlights: [
        'Built UI components from design systems using React, TypeScript, and Material UI',
        'Integrated RESTful APIs and contributed to code architecture decisions',
        'Worked in an agile team with designers, backend developers, and product managers',
        'Received strong reference praising motivation, resilience, and reliability under high workloads'
      ]
    },
    {
      company: 'Relocation & Upskilling',
      title: 'Bremen → Hamburg',
      period: '07.2023 - 06.2024',
      description:
        'Relocated from Bremen to Hamburg (07.2023 - 12.2023); upskilled at ReDI School (03.2024 - 06.2024), focusing on backend fundamentals (Node.js, Express.js).',
      highlights: [
        'Relocated from Bremen to Hamburg, including settling in and handling German administrative processes',
        'Studied backend development at ReDI School (03.2024 - 06.2024) with a focus on Node.js and Express.js',
        'Built foundational backend skills that later supported full-stack work'
      ]
    },
    {
      company: 'neuland - buro fur informatik',
      title: 'Frontend Developer',
      period: '07.2022 - 06.2023',
      description: 'E-commerce agency in Bremen building custom web solutions for clients.',
      highlights: [
        'Built e-commerce features in direct collaboration with clients',
        'Worked with React, TypeScript, and modern frontend tooling',
        'Learned early that clean code and clear communication are two sides of the same coin'
      ]
    },
    {
      company: 'MIRS',
      title: 'Key Account Manager',
      period: '06.2019 - 05.2022',
      description: 'Managed complex B2B partnerships and high-stakes business relationships.',
      highlights: [
        'Managed key client accounts and business relationships',
        'Developed strong communication and stakeholder management skills',
        'Transitioned from business roles into software development'
      ]
    },
    {
      company: 'Foxtrot',
      title: 'Wholesale Purchasing Manager',
      period: '09.2018 - 06.2019',
      description: 'Large electronics retail chain — managed wholesale purchasing operations.',
      highlights: [
        'Managed wholesale purchasing for a major electronics retailer',
        'Negotiated with suppliers and optimized procurement processes'
      ]
    },
    {
      company: 'Eldorado',
      title: 'Sales & Procurement',
      period: '03.2017 - 09.2018',
      description: 'Electronics retail — sales and procurement responsibilities.',
      highlights: [
        'Handled sales and procurement operations',
        'Built foundational business and negotiation skills'
      ]
    }
  ],

  education: [
    {
      institution: 'Dan.It Education',
      degree: 'Frontend Development course',
      period: '2021 - 2022',
      description:
        'Intensive Frontend Development program covering JavaScript, React, Node.js, and modern web technologies.'
    },
    {
      institution: 'Central Ukrainian National Technical University',
      degree: 'Faculty of Economics and Entrepreneurship, specialization in Finance',
      period: '2005 - 2010'
    }
  ],

  projects: [
    {
      slug: 'anna-wiebe-portfolio',
      name: 'Anna Wiebe - Artist Portfolio',
      description:
        'Completed client project for painter Anna Wiebe, built end to end (requirements, UI design, development, testing, deployment). A German single-page portfolio presenting her paintings, biography and exhibitions, plus Impressum and Datenschutz pages. Features a scroll-reactive artwork gallery that can be paused and respects reduced motion, full keyboard accessibility, images optimized from 55 MB to about 2 MB per page load with GPS/camera metadata removed, one-click email copy and tap-to-call, and SEO setup (Open Graph, sitemap, Search Console). Lighthouse mobile: Performance 100, SEO 100, Best Practices 96, Accessibility 96.',
      techStack: [
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
      liveUrl: 'https://www.annawiebe.de'
    },
    {
      slug: 'movie-explorer',
      name: 'FrameIT',
      description:
        'A movie discovery app powered by the TMDB API. Browse trending films, search by title, and explore detailed info with a clean, responsive UI.',
      techStack: [
        'Next.js 15',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'React Query',
        'TMDB API'
      ],
      githubUrl: 'https://github.com/nastasia8811/FrameIT',
      liveUrl: 'https://frame-it.vercel.app/'
    },
    {
      slug: 'my-portfolio',
      name: 'My Portfolio',
      description:
        'Personal portfolio site with theme switching, parallax hero, scroll animations, and an AI-powered chat. Built with Next.js App Router and Vercel AI SDK.',
      techStack: [
        'Next.js 15',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Vercel AI SDK',
        'Chat API integration'
      ],
      githubUrl: 'https://github.com/nastasia8811/My-Portfolio',
      liveUrl: 'https://anastasiia-melnyk.vercel.app'
    },
    {
      slug: 'portfolio-chat-api',
      name: 'Portfolio Chat API',
      description:
        'Standalone AI chat service that answers questions about my experience and projects. Powers the chat on this site and is built to be reused by other sites with their own UI.',
      techStack: [
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
        'Portfolio content is kept as typed data and turned into the assistant context, so the assistant only knows what is published about me',
        'Security layers: strict request validation with Zod, per-IP rate limiting with Redis, an allow-list of origins (CORS), capped response length, and generic error messages',
        'The API key lives only in server environment variables and never reaches the browser',
        'Unit tests for every security rule with Vitest, and CI on GitHub Actions running lint, type check and tests',
        'Mock mode for local development without API costs'
      ],
      githubUrl: 'https://github.com/nastasia8811/chat',
      liveUrl: 'https://anastasiia-melnyk.vercel.app'
    }
  ]
}
