interface ChatStreamChunk {
  type: string
  delta?: string
  errorText?: string
}

export function parseChatStreamChunk(data: string): ChatStreamChunk | null {
  try {
    const value: unknown = JSON.parse(data)

    if (!value || typeof value !== "object") return null

    const chunk = value as Record<string, unknown>
    if (typeof chunk.type !== "string") return null

    return {
      type: chunk.type,
      delta: typeof chunk.delta === "string" ? chunk.delta : undefined,
      errorText:
        typeof chunk.errorText === "string" ? chunk.errorText : undefined,
    }
  } catch {
    return null
  }
}
