import { CHAT_ERROR_MESSAGE, CHAT_ERROR_RETRY_LABEL } from "@/lib/chat-config"

interface ChatErrorBannerProps {
  onRetry: () => void
  className?: string
}

export function ChatErrorBanner({ onRetry, className }: ChatErrorBannerProps) {
  return (
    <div className={className} role="alert">
      <p>{CHAT_ERROR_MESSAGE}</p>
      <button type="button" onClick={onRetry}>
        {CHAT_ERROR_RETRY_LABEL}
      </button>
    </div>
  )
}
