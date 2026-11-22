export type SkillCategory = {
  title: string
  skills: readonly string[]
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    title: 'AI-Driven Development',
    skills: [
      'Claude Code (CLAUDE.md, subagents, skills)',
      'Reviewing and debugging AI-generated code',
      'LLM integration (Anthropic API, Vercel AI SDK)',
      'Prompt engineering',
      'Streaming UI'
    ]
  },
  {
    title: 'Frontend',
    skills: [
      'React & Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'HTML5, CSS3, SCSS',
      'Redux, Zustand, React Query',
      'Accessibility'
    ]
  },
  {
    title: 'Backend & Data',
    skills: [
      'Node.js, Express, NestJS',
      'REST APIs',
      'PostgreSQL, SQL',
      'TypeORM & migrations',
      'WebSockets',
      'MongoDB',
      'Redis (Upstash)'
    ]
  },
  {
    title: 'Testing',
    skills: [
      'Unit testing',
      'Integration testing',
      'End-to-end testing',
      'Jest, Vitest, React Testing Library'
    ]
  },
  {
    title: 'Security & API Design',
    skills: [
      'Input validation (Zod)',
      'Rate limiting',
      'CORS and origin allow-lists',
      'Secrets management',
      'API versioning'
    ]
  },
  {
    title: 'Quality & Delivery',
    skills: [
      'ESLint, Prettier, Husky',
      'Git',
      'CI/CD (GitHub Actions)',
      'Docker',
      'Swagger/OpenAPI, Postman',
      'Vercel'
    ]
  }
]
