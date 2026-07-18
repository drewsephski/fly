"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Send, Loader2, ArrowUpRight } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CHAT_SUGGESTED_PROMPTS } from "@/lib/projects"
import { parseChatStreamChunk } from "@/lib/chat-stream"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

const PREBUILT_PROMPTS = [...CHAT_SUGGESTED_PROMPTS]

export function HeroChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text.trim(),
      }

      const assistantId = `assistant-${Date.now()}`
      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, userMessage, assistantMessage])
      setInput("")
      setIsLoading(true)
      setError(null)
      setHasStarted(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              id: m.id,
              role: m.role,
              content: m.content,
              parts: [{ type: "text", text: m.content }],
            })),
          }),
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error("No response body")

        const decoder = new TextDecoder()
        let buffer = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const chunks = buffer.split("\n\n")
          buffer = chunks.pop() ?? ""

          for (const chunkStr of chunks) {
            const dataLine = chunkStr
              .split("\n")
              .find((l) => l.startsWith("data:"))
            if (!dataLine) continue

            const data = dataLine.slice(5).trim()
            if (data === "[DONE]") continue

            const parsed = parseChatStreamChunk(data)
            if (!parsed) continue

            if (parsed.type === "error") {
              throw new Error(parsed.errorText ?? "The AI request failed")
            }

            if (parsed.type === "text-delta" && parsed.delta) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + parsed.delta }
                    : m
                )
              )
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("The portfolio assistant did not respond. Try again.")
          setMessages((prev) => prev.filter((m) => m.id !== assistantId))
        }
      } finally {
        setIsLoading(false)
        abortRef.current = null
      }
    },
    [isLoading, messages]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const clearChat = () => {
    abortRef.current?.abort()
    setMessages([])
    setHasStarted(false)
    setError(null)
    setIsLoading(false)
  }

  return (
    <div className="relative flex min-w-0 flex-col rounded-xl border border-border bg-muted/30">
      <div className="absolute top-0 left-0 h-px w-12 bg-[var(--color-accent)]" />

      {/* Messages area */}
      <div
        ref={scrollRef}
        className={cn(
          "custom-scrollbar flex-1 scrollbar-thin overflow-y-auto px-4",
          hasStarted ? "max-h-[280px] space-y-3 py-4" : "py-6"
        )}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--border) transparent",
        }}
      >
        {!hasStarted ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[var(--color-accent-hover)]">
                AI assistant
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ask about projects, stack, or anything. Drew&apos;s AI twin will
                respond in his voice.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="sticky -top-4 z-10 -mx-4 flex items-center justify-between border-b border-border/80 bg-muted/90 px-4 py-2">
              <p className="text-xs font-medium text-muted-foreground/70">
                Conversation
              </p>
              <button
                onClick={clearChat}
                disabled={isLoading}
                className="min-h-11 px-2 text-xs text-muted-foreground transition-colors duration-200 hover:text-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear
              </button>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg border px-3 py-2 text-xs leading-relaxed",
                    msg.role === "user"
                      ? "border-border/40 bg-muted/50 text-foreground"
                      : "border-border/30 bg-transparent text-muted-foreground"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-xs prose-neutral dark:prose-invert prose-p:my-0.5 prose-ul:my-0.5 prose-li:my-0 prose-headings:my-1 prose-headings:text-xs prose-headings:font-semibold prose-a:text-foreground prose-a:underline prose-a:underline-offset-2 max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content || "\u00A0"}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 rounded-lg border border-border/30 px-3 py-2">
                  <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground/60">
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
                {error}
              </div>
            )}
          </>
        )}
      </div>

      {/* Prompt pills + input */}
      <div className="space-y-3 border-t border-border/40 px-4 pt-3 pb-3">
        {/* Prompt pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {PREBUILT_PROMPTS.map((pill) => (
            <button
              key={pill}
              onClick={() => sendMessage(pill)}
              disabled={isLoading}
              className="group inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md border border-border bg-background/60 px-3 text-xs whitespace-nowrap text-muted-foreground transition-[border-color,background-color,color] duration-200 hover:border-[var(--color-accent)] hover:bg-muted/50 hover:text-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pill}
              <ArrowUpRight className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-60" />
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="relative">
          <label htmlFor="portfolio-question" className="sr-only">
            Ask about Drew&apos;s work
          </label>
          <textarea
            id="portfolio-question"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendMessage(input)
              }
            }}
            placeholder="Ask about a project…"
            rows={2}
            className="min-h-24 w-full resize-y rounded-lg border border-border bg-muted/30 px-3 py-3 pr-14 text-sm text-foreground outline-2 outline-transparent transition-colors duration-200 placeholder:text-muted-foreground/60 hover:bg-muted/45 focus-visible:border-[var(--color-accent)] focus-visible:bg-muted/50 focus-visible:outline-[var(--color-focus)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bottom-2 flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-accent)] text-[var(--color-accent-ink)] transition-[background-color,transform] duration-200 hover:bg-[var(--color-accent-hover)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send question"
          >
            <Send className="h-3 w-3" />
          </button>
        </form>
      </div>
    </div>
  )
}
