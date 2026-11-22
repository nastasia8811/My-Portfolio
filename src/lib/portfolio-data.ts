import { projects } from '@/data/projects'
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

  projects: projects.map(p => ({
    slug: p.slug,
    name: p.title,
    description: p.description,
    techStack: p.tech ?? [],
    details: p.details,
    githubUrl: p.codeHref,
    liveUrl: p.demoHref
  }))
}
