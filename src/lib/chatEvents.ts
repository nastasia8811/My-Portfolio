/** Window event that opens the chat widget, optionally on a specific project */
export const OPEN_CHAT_EVENT = 'portfolio-chat:open'

export type OpenChatDetail = {
  projectSlug?: string
}

export const openChat = (projectSlug?: string) => {
  window.dispatchEvent(
    new CustomEvent<OpenChatDetail>(OPEN_CHAT_EVENT, { detail: { projectSlug } })
  )
}
