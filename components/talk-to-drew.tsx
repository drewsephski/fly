"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react"

import { MessageResponse } from "@/components/ai-elements/message"
import { ChatErrorBanner } from "@/components/chat-error-banner"
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock"
import {
  CHAT_MAX_MESSAGE_LENGTH,
  getMessageTextFromParts,
} from "@/lib/chat-config"
import { CHAT_SUGGESTED_PROMPTS } from "@/lib/projects"
import { cn } from "@/lib/utils"

const CHAT_TRANSPORT = new DefaultChatTransport({ api: "/api/chat" })
const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [{ type: "text", text: "hi!" }],
  },
]

function getMessageText(message: UIMessage) {
  return getMessageTextFromParts(message.parts)
}

interface TalkToDrewProps {
  open?: boolean
  setOpen?: (open: boolean) => void
  autoSend?: string
}

export function TalkToDrew({
  open: controlledOpen,
  setOpen: controlledSetOpen,
  autoSend,
}: TalkToDrewProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = controlledSetOpen ?? setInternalOpen
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const lastAutoSendRef = useRef<string | undefined>(undefined)
  const {
    messages,
    sendMessage,
    status,
    error,
    clearError,
    setMessages,
    stop,
    regenerate,
  } = useChat({
    transport: CHAT_TRANSPORT,
    messages: INITIAL_MESSAGES,
  })
  const isLoading = status === "submitted" || status === "streaming"
  const inputTooLong = input.length > CHAT_MAX_MESSAGE_LENGTH

  useBodyScrollLock(open)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, status, open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, setOpen])

  const submitMessage = useCallback(
    async (text: string) => {
      const question = text.trim()
      if (!question || isLoading || question.length > CHAT_MAX_MESSAGE_LENGTH) {
        return
      }

      clearError()
      setInput("")
      await sendMessage({ text: question })
    },
    [clearError, isLoading, sendMessage]
  )

  useEffect(() => {
    if (open && autoSend && autoSend !== lastAutoSendRef.current) {
      lastAutoSendRef.current = autoSend
      void submitMessage(autoSend)
    }
    if (!open) {
      lastAutoSendRef.current = undefined
    }
  }, [open, autoSend, submitMessage])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      void submitMessage(input)
    },
    [input, submitMessage]
  )

  const clearChat = () => {
    stop()
    setMessages(INITIAL_MESSAGES)
    clearError()
  }

  const handleRetry = () => {
    clearError()
    if (
      messages.some(
        (message) => message.role === "assistant" && message.id !== "welcome"
      )
    ) {
      void regenerate()
      return
    }

    const lastUser = [...messages]
      .reverse()
      .find((message) => message.role === "user")
    if (lastUser) {
      void sendMessage({ text: getMessageText(lastUser) })
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-[transform,background-color,border-color] duration-200 hover:-translate-y-px active:translate-y-px",
          open
            ? "border-border bg-muted text-foreground"
            : "border-foreground/20 bg-foreground text-background hover:bg-foreground/90"
        )}
        style={{
          bottom: "calc(1.5rem + var(--safe-bottom, 0px))",
          right: "calc(1.5rem + var(--safe-right, 0px))",
        }}
        aria-label={open ? "Close chat" : "Talk to Drew"}
        aria-expanded={open}
        aria-controls="talk-to-drew-panel"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>

      <div
        id="talk-to-drew-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Talk to Drew"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          "fixed right-6 bottom-20 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] origin-bottom-right flex-col rounded-xl border border-border bg-background shadow-2xl transition-[transform,opacity] duration-300",
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        )}
        style={{
          bottom: "calc(5rem + var(--safe-bottom, 0px))",
          right: "calc(1.5rem + var(--safe-right, 0px))",
          height: "520px",
          maxHeight: "calc(100vh - 7rem - var(--safe-bottom, 0px))",
        }}
      >
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/50 bg-muted">
              <Bot className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                Talk to Drew
              </p>
              <p className="truncate text-xs text-muted-foreground/70">
                AI-powered assistant
              </p>
            </div>
          </div>
          {messages.length > 1 && (
            <button
              type="button"
              onClick={clearChat}
              disabled={isLoading}
              className="min-h-11 shrink-0 px-2 text-xs text-muted-foreground transition-colors duration-200 hover:text-[var(--color-accent-hover)] disabled:opacity-50"
            >
              Clear
            </button>
          )}
        </div>

        <div
          ref={scrollRef}
          className="custom-scrollbar flex-1 scrollbar-thin space-y-4 overflow-y-auto px-4 py-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "var(--border) transparent",
          }}
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((message) => {
            const text = getMessageText(message)
            const isUser = message.role === "user"

            return (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2.5",
                  isUser ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                    isUser
                      ? "border-border/50 bg-muted"
                      : "border-foreground/10 bg-foreground/5"
                  )}
                >
                  {isUser ? (
                    <User className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    <Bot className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] min-w-0 rounded-lg border px-3 py-2 text-xs leading-relaxed",
                    isUser
                      ? "border-border/40 bg-muted/40 text-foreground"
                      : "border-border/30 bg-transparent text-muted-foreground"
                  )}
                >
                  {isUser ? (
                    <p className="break-words">{text}</p>
                  ) : (
                    <MessageResponse
                      className="prose prose-sm prose-neutral dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:my-1.5 prose-headings:text-sm prose-headings:font-semibold prose-a:text-foreground prose-a:underline prose-a:underline-offset-2 max-w-none break-words"
                      isAnimating={
                        status === "streaming" &&
                        message.id === messages.at(-1)?.id
                      }
                    >
                      {text || "\u00A0"}
                    </MessageResponse>
                  )}
                </div>
              </div>
            )
          })}

          {status === "submitted" && (
            <div className="flex gap-2.5" aria-live="polite">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5">
                <Bot className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-border/30 px-3 py-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground/60">
                  Thinking…
                </span>
              </div>
            </div>
          )}

          {error && (
            <ChatErrorBanner
              className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive [&_button]:mt-2 [&_button]:min-h-11 [&_button]:rounded-md [&_button]:border [&_button]:border-destructive/30 [&_button]:px-3 [&_button]:py-1.5 [&_button]:text-destructive [&_button]:transition-colors hover:[&_button]:bg-destructive/10"
              onRetry={handleRetry}
            />
          )}
        </div>

        <div className="border-t border-border/40 px-2 pt-3 pb-1.5">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CHAT_SUGGESTED_PROMPTS.map((pill) => (
              <button
                type="button"
                key={pill}
                onClick={() => {
                  setInput(pill)
                }}
                disabled={isLoading}
                className="min-h-11 max-w-[16rem] shrink-0 truncate rounded-md border border-border bg-muted/30 px-3 text-xs text-muted-foreground transition-[border-color,background-color,color] duration-200 hover:border-[var(--color-accent)] hover:bg-muted/60 hover:text-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-border/40 px-4 py-3"
        >
          <label htmlFor="floating-portfolio-question" className="sr-only">
            Ask about Drew&apos;s work
          </label>
          <div className="flex min-h-12 items-center gap-2 rounded-lg border border-border bg-muted/30 pl-3 transition-colors duration-200 focus-within:border-[var(--color-accent)] focus-within:bg-muted/50">
            <input
              id="floating-portfolio-question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a project…"
              maxLength={CHAT_MAX_MESSAGE_LENGTH}
              className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/40 sm:text-sm"
              disabled={isLoading}
              aria-invalid={inputTooLong}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || inputTooLong}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--color-accent)] text-[var(--color-accent-ink)] transition-[background-color,transform] duration-200 hover:bg-[var(--color-accent-hover)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send question"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
