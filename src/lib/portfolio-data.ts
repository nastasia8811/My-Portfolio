export type SkillCategory = {
  title: string
  skills: string[]
}

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
  githubUrl?: string
  liveUrl?: string
}

export type Developer = {
  name: string
  title: string
  location: string
  bio: string
  summary: string
  skills: SkillCategory[]
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
    title: 'Frontend Engineer',
    location: 'Hamburg, Germany',
    bio: 'Frontend Engineer with a non-linear career path — from managing complex B2B partnerships to building performant, accessible UIs with React, TypeScript, and Next.js. Combines strong communication skills from years in business with a deep love for clean code and thoughtful user experiences.',
    summary:
      'I build interfaces people actually enjoy using. Experienced in React 18, Next.js App Router, TypeScript, and modern frontend tooling. I care about the small things — the transition that feels right, the component that is a joy to reuse, the codebase your future self will not curse.',
    skills: [
      {
        title: 'Core',
        skills: [
          'JavaScript',
          'TypeScript',
          'React 18',
          'Next.js App Router',
          'HTML5',
          'CSS3 / SCSS',
          'Redux',
          'Zustand',
          'React Query',
          'REST APIs'
        ]
      },
      {
        title: 'UI & Styling',
        skills: [
          'Tailwind CSS',
          'shadcn/ui',
          'Material UI',
          'Bootstrap',
          'CSS Modules',
          'Responsive Design',
          'Framer Motion'
        ]
      },
      {
        title: 'Backend & DevOps',
        skills: ['Node.js', 'Express', 'MongoDB', 'Docker']
      },
      {
        title: 'Tools & AI',
        skills: [
          'Git',
          'GitHub',
          'Vercel AI SDK',
          'OpenAI API',
          'Jest',
          'Vitest',
          'AI-assisted Development'
        ]
      }
    ],
    yearsOfExperience: 3,
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
      period: '08.2024 - 10.2025',
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
      company: 'Neuland',
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
      institution: 'DCI Digital Career Institute',
      degree: 'Web Development Bootcamp',
      period: '2021 - 2022',
      description:
        'Intensive full-stack web development program covering JavaScript, React, Node.js, and modern web technologies.'
    }
  ],

  projects: [
    {
      slug: 'anna-wiebe-portfolio',
      name: 'Anna Wiebe - Artist Portfolio',
      description:
        'A bilingual artist portfolio featuring a velocity-reactive infinite-scroll gallery, scroll-triggered CSS animations, and an immersive exhibition showcase. Created as a landing page for the artist.',
      techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vitest'],
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
        'Anthropic API'
      ],
      githubUrl: 'https://github.com/nastasia8811/My-Portfolio',
      liveUrl: 'https://anastasiia-melnyk.vercel.app'
    },
    {
      slug: 'ecoswap',
      name: 'EcoSwap',
      description:
        'A sustainable event platform connecting communities for eco-friendly item exchanges. Full-stack application with separate frontend and backend repositories.',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com/nastasia8811/EcoSwap-frontend'
    }
  ]
}
