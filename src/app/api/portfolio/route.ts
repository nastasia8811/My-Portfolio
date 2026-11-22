import { portfolioData } from '@/lib/portfolio-data'

// Content is fixed at build time, so the response can be served statically
export const dynamic = 'force-static'

// Public portfolio content, read by the chat API (nastasia8811/chat) at runtime
export const GET = () => Response.json(portfolioData)
