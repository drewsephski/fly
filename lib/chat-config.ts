export const CHAT_MAX_MESSAGE_LENGTH = 2000
export const CHAT_MAX_MESSAGES = 40
export const CHAT_RATE_LIMIT_WINDOW_MS = 60_000
export const CHAT_RATE_LIMIT_MAX_REQUESTS = 24

export const CHAT_ERROR_MESSAGE =
  "The portfolio assistant hit a snag. Check your connection and try again."
export const CHAT_ERROR_RETRY_LABEL = "Try again"

export function getMessageTextFromParts(
  parts: Array<{ type: string; text?: string }>
) {
  return parts
    .filter((part) => part.type === "text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("")
}
