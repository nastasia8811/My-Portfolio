import {
  streamText,
  convertToModelMessages,
  type UIMessage,
  createUIMessageStream,
  createUIMessageStreamResponse
} from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { getDeveloperInfo, getProjects, getProjectBySlug } from '@/lib/data'

const USE_MOCK = process.env.CHAT_MOCK === 'true'

type ChatMode = 'general' | 'project'

type ChatRequestBody = {
  messages: UIMessage[]
  mode: ChatMode
  projectId?: string
}

const buildSystemPrompt = (mode: ChatMode, projectId?: string): string => {
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

const MOCK_RESPONSES: Record<string, string> = {
  general:
    'Anastasiia is a Frontend Engineer based in Hamburg, Germany with 3 years of experience. ' +
    'She specializes in React 18, Next.js App Router, and TypeScript. ' +
    'She previously worked at PINKTUM (AI SaaS) and Neuland (e-commerce). ' +
    'Her unique strength is combining strong business communication skills with clean, performant code.',
  project:
    'This project showcases modern frontend techniques including Next.js 15, TypeScript, ' +
    'Tailwind CSS, and Framer Motion. It was built with a focus on performance, ' +
    'accessibility, and a smooth user experience.'
}

const mockResponse = (mode: ChatMode) => {
  const text = MOCK_RESPONSES[mode] ?? MOCK_RESPONSES.general
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
  const { messages, mode = 'general', projectId } = (await req.json()) as ChatRequestBody

  if (USE_MOCK) {
    return mockResponse(mode)
  }

  const systemPrompt = buildSystemPrompt(mode, projectId)
  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: systemPrompt,
    messages: modelMessages
  })

  return result.toUIMessageStreamResponse()
}
