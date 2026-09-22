import {
  streamText,
  convertToModelMessages,
  type UIMessage,
  createUIMessageStream,
  createUIMessageStreamResponse
} from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { getDeveloperInfo, getProjects, getProjectBySlug } from '@/lib/data'
import { z } from 'zod/v4'

const USE_MOCK = process.env.CHAT_MOCK === 'true'

type ChatMode = 'general' | 'project'

const chatRequestSchema = z
  .object({
    messages: z
      .array(
        z
          .object({
            id: z.string(),
            role: z.enum(['user', 'assistant', 'system']),
            parts: z.array(z.object({ type: z.string() }).passthrough()).min(1)
          })
          .passthrough()
      )
      .min(1),
    mode: z.enum(['general', 'project']).default('general'),
    projectId: z.string().optional()
  })
  .passthrough()

export const buildSystemPrompt = (mode: ChatMode, projectId?: string): string => {
  const { developer, experience, education } = getDeveloperInfo()
  const projects = getProjects()

  const baseContext = `You are a knowledgeable and friendly assistant on Anastasiia Melnyk's portfolio website.
You answer questions about Anastasiia as a developer — her skills, experience, projects, and approach.
Stay factual and concise. Only use the information provided below. If you don't know something, say so honestly.
Respond in the same language the visitor uses. Default to English.

## Developer Profile
- Name: ${developer.name}
- Title: ${developer.title}
- Location: ${developer.location}
- Years of Experience: ${developer.yearsOfExperience}
- Bio: ${developer.bio}
- Summary: ${developer.summary}

## Skills
${developer.skills.map(cat => `### ${cat.title}\n${cat.skills.join(', ')}`).join('\n\n')}

## Experience
${experience.map(e => `### ${e.title} at ${e.company} (${e.period})\n${e.description}\n- ${e.highlights.join('\n- ')}`).join('\n\n')}

## Education
${education.map(e => `### ${e.degree} — ${e.institution} (${e.period})\n${e.description ?? ''}`).join('\n\n')}

## Contact
- Email: ${developer.contacts.email}
- GitHub: ${developer.contacts.github}
- LinkedIn: ${developer.contacts.linkedin}`

  if (mode === 'project' && projectId) {
    const project = getProjectBySlug(projectId)
    if (project) {
      return `${baseContext}

## Current Project Context
You are answering questions specifically about this project:
- Name: ${project.name}
- Description: ${project.description}
- Tech Stack: ${project.techStack.join(', ')}
${project.githubUrl ? `- GitHub: ${project.githubUrl}` : ''}
${project.liveUrl ? `- Live: ${project.liveUrl}` : ''}

Focus your answers on this project while still being able to reference Anastasiia's general background when relevant.`
    }
  }

  const projectList = projects
    .map(
      p =>
        `- **${p.name}** (${p.slug}): ${p.description} | Tech: ${p.techStack.join(', ')}${p.liveUrl ? ` | Live: ${p.liveUrl}` : ''}${p.githubUrl ? ` | GitHub: ${p.githubUrl}` : ''}`
    )
    .join('\n')

  return `${baseContext}

## All Projects
${projectList}`
}

const buildMockText = (mode: ChatMode, projectId?: string): string => {
  const { developer, experience } = getDeveloperInfo()
  const companies = experience
    .filter(
      e => e.title.toLowerCase().includes('engineer') || e.title.toLowerCase().includes('developer')
    )
    .map(e => e.company)
    .join(' and ')

  if (mode === 'project' && projectId) {
    const project = getProjectBySlug(projectId)
    if (project) {
      return (
        `${project.name} is built with ${project.techStack.join(', ')}. ` + `${project.description}`
      )
    }
  }

  return (
    `${developer.name} is a ${developer.title} based in ${developer.location} ` +
    `with ${developer.yearsOfExperience}+ years of experience. ` +
    `She previously worked at ${companies}. ${developer.summary}`
  )
}

const mockResponse = (mode: ChatMode, projectId?: string) => {
  const text = buildMockText(mode, projectId)
  const words = text.split(' ')

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      writer.write({ type: 'text-start', id: 'mock' })
      for (const word of words) {
        await new Promise(resolve => setTimeout(resolve, 30))
        writer.write({ type: 'text-delta', delta: word + ' ', id: 'mock' })
      }
      writer.write({ type: 'text-end', id: 'mock' })
    }
  })

  return createUIMessageStreamResponse({ stream })
}

export const POST = async (req: Request) => {
  const body: unknown = await req.json()
  const parsed = chatRequestSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      { error: 'Invalid request', details: parsed.error.issues },
      { status: 400 }
    )
  }

  const { messages, mode, projectId } = parsed.data

  if (USE_MOCK) {
    return mockResponse(mode, projectId)
  }

  const systemPrompt = buildSystemPrompt(mode, projectId)
  const modelMessages = await convertToModelMessages(messages as UIMessage[])

  const result = streamText({
    model: anthropic('claude-sonnet-4-5-20250929'),
    system: systemPrompt,
    messages: modelMessages
  })

  return result.toUIMessageStreamResponse()
}
