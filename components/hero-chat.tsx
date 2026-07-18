"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { ArrowUpRight, Loader2, Send } from "lucide-react"

import { MessageResponse } from "@/components/ai-elements/message"
import { cn } from "@/lib/utils"
import { CHAT_SUGGESTED_PROMPTS } from "@/lib/projects"

const PREBUILT_PROMPTS = CHAT_SUGGESTED_PROMPTS.slice(0, 3)
const CHAT_TRANSPORT = new DefaultChatTransport({ api: "/api/chat" })
const CHAT_ERROR_MESSAGE =
  "The portfolio assistant is temporarily unavailable. Try again shortly."

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("")
}

export function HeroChat() {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const {
    messages,
    sendMessage,
    status,
    error,
    clearError,
    setMessages,
    stop,
  } = useChat({ transport: CHAT_TRANSPORT })
  const isLoading = status === "submitted" || status === "streaming"
  const hasStarted = messages.length > 0

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, status])

  const submitMessage = (text: string) => {
    const question = text.trim()
    if (!question || isLoading) return

    clearError()
    setInput("")
    void sendMessage({ text: question })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    submitMessage(input)
  }

  const clearChat = () => {
    stop()
    setMessages([])
    clearError()
  }

  return (
    <div className="dossier-chat" aria-busy={isLoading}>
      <div
        ref={scrollRef}
        className={cn(
          "dossier-chat__messages custom-scrollbar",
          hasStarted && "dossier-chat__messages--active"
        )}
      >
        {!hasStarted ? (
          <div className="dossier-chat__empty">
            <p>Ask about projects, stack, tradeoffs, or outcomes.</p>
            <span>The answer comes from Drew’s actual work.</span>
          </div>
        ) : (
          <>
            <div className="dossier-chat__conversation-head">
              <p>Conversation</p>
              <button type="button" onClick={clearChat} disabled={isLoading}>
                Clear
              </button>
            </div>

            {messages.map((message) => {
              const text = getMessageText(message)
              const isUser = message.role === "user"

              return (
                <div
                  key={message.id}
                  className={cn(
                    "dossier-chat__message",
                    isUser && "dossier-chat__message--user"
                  )}
                >
                  <div className="dossier-chat__bubble">
                    {isUser ? (
                      <p>{text}</p>
                    ) : (
                      <MessageResponse
                        className="dossier-chat__markdown"
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
              <div className="dossier-chat__loading">
                <Loader2 aria-hidden="true" />
                <span>Reading the project notes…</span>
              </div>
            )}

            {error && (
              <div className="dossier-chat__error" role="alert">
                {CHAT_ERROR_MESSAGE}
              </div>
            )}
          </>
        )}
      </div>

      <div className="dossier-chat__composer">
        <div className="dossier-chat__prompts" aria-label="Suggested questions">
          {PREBUILT_PROMPTS.map((prompt) => (
            <button
              type="button"
              key={prompt}
              onClick={() => submitMessage(prompt)}
              disabled={isLoading}
            >
              {prompt}
              <ArrowUpRight aria-hidden="true" />
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="dossier-chat__form">
          <label htmlFor="portfolio-question" className="sr-only">
            Ask about Drew&apos;s work
          </label>
          <textarea
            id="portfolio-question"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                submitMessage(input)
              }
            }}
            placeholder="Ask about a project…"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send question"
          >
            <Send aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  )
}
