import {
  portfolioData,
  type Developer,
  type Experience,
  type Education,
  type PortfolioProject
} from '@/lib/portfolio-data'

export type DeveloperInfo = {
  developer: Developer
  experience: Experience[]
  education: Education[]
}

export const getDeveloperInfo = (): DeveloperInfo => ({
  developer: portfolioData.developer,
  experience: portfolioData.experience,
  education: portfolioData.education
})

export const getProjects = (): PortfolioProject[] => portfolioData.projects

export const getProjectBySlug = (slug: string): PortfolioProject | undefined =>
  portfolioData.projects.find(p => p.slug === slug)
