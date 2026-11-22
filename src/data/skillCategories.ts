export type SkillCategory = {
  title: string
  skills: readonly string[]
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    title: 'Core',
    skills: ['TypeScript', 'React & Next.js', 'HTML', 'CSS (SCSS)', 'Redux', 'REST APIs']
  },
  {
    title: 'UI & Styling',
    skills: [
      'Tailwind CSS',
      'Material UI',
      'Bootstrap',
      'CSS Modules',
      'Framer Motion',
      'Responsive Design'
    ]
  },
  {
    title: 'Backend & Databases',
    skills: ['Node.js', 'Express', 'TypeORM', 'SQL (PostgreSQL, MySQL)', 'MongoDB']
  },
  {
    title: 'Testing',
    skills: ['Jest', 'Vitest', 'React Testing Library']
  },
  {
    title: 'AI',
    skills: [
      'Vercel AI SDK',
      'Anthropic API',
      'OpenAI API',
      'AI-assisted Development',
      'Streaming UI'
    ]
  },
  {
    title: 'Tools',
    skills: ['Git', 'CI/CD (GitHub Actions)', 'Docker', 'Postman', 'Vercel']
  }
]
