export type SkillCategory = {
  title: string
  skills: readonly string[]
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    title: 'Core',
    skills: ['TypeScript', 'React & Next.js', 'HTML', 'CSS (SCSS)', 'Redux', 'REST']
  },
  {
    title: 'UI & Styling',
    skills: ['Tailwind CSS', 'Material UI', 'Bootstrap', 'CSS Modules', 'Responsive Design']
  },
  {
    title: 'Backend (Basic)',
    skills: ['Node.js', 'Express', 'MongoDB']
  },
  {
    title: 'Tools & AI',
    skills: ['Git', 'GitHub', 'AI-assisted Development & Claude Code (Anthropic AI)']
  }
]
