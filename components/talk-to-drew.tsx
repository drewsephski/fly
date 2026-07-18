"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react"

import { MessageResponse } from "@/components/ai-elements/message"
import { cn } from "@/lib/utils"
import { CHAT_SUGGESTED_PROMPTS } from "@/lib/projects"

const CHAT_TRANSPORT = new DefaultChatTransport({ api: "/api/chat" })
const CHAT_ERROR_MESSAGE =
  "The portfolio assistant is temporarily unavailable. Try again shortly."
const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [{ type: "text", text: "hi!" }],
  },
]

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("")
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
  const lastAutoSendRef = useRef<string | undefined>(undefined)
  const {
    messages,
    sendMessage,
    status,
    error,
    clearError,
    setMessages,
    stop,
  } = useChat({
    transport: CHAT_TRANSPORT,
    messages: INITIAL_MESSAGES,
  })
  const isLoading = status === "submitted" || status === "streaming"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, status])

  const submitMessage = useCallback(
    async (text: string) => {
      const question = text.trim()
      if (!question || isLoading) return

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

  return (
    <>
      {/* Floating toggle button */}
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
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>

      {/* Chat panel */}
      <div
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
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border/50 bg-muted">
              <Bot className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Talk to Drew
              </p>
              <p className="text-xs text-muted-foreground/70">
                AI-powered assistant
              </p>
            </div>
          </div>
          {messages.length > 1 && (
            <button
              onClick={clearChat}
              className="min-h-11 px-2 text-xs text-muted-foreground transition-colors duration-200 hover:text-[var(--color-accent-hover)]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="custom-scrollbar flex-1 scrollbar-thin space-y-4 overflow-y-auto px-4 py-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "var(--border) transparent",
          }}
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
                    "max-w-[80%] rounded-lg border px-3 py-2 text-xs leading-relaxed",
                    isUser
                      ? "border-border/40 bg-muted/40 text-foreground"
                      : "border-border/30 bg-transparent text-muted-foreground"
                  )}
                >
                  {isUser ? (
                    <p>{text}</p>
                  ) : (
                    <MessageResponse
                      className="prose prose-sm prose-neutral dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:my-1.5 prose-headings:text-sm prose-headings:font-semibold prose-a:text-foreground prose-a:underline prose-a:underline-offset-2 max-w-none"
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
            <div className="flex gap-2.5">
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
            <div
              className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive"
              role="alert"
            >
              {CHAT_ERROR_MESSAGE}
            </div>
          )}
        </div>

        {/* Prompt pills */}
        <div className="border-t border-border/40 px-2 pt-3 pb-1.5">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CHAT_SUGGESTED_PROMPTS.map((pill) => (
              <button
                key={pill}
                onClick={() => {
                  setInput(pill)
                }}
                disabled={isLoading}
                className="min-h-11 shrink-0 rounded-md border border-border bg-muted/30 px-3 text-xs whitespace-nowrap text-muted-foreground transition-[border-color,background-color,color] duration-200 hover:border-[var(--color-accent)] hover:bg-muted/60 hover:text-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
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
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/40"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
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
