"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { ArrowUpRight, Loader2, Send } from "lucide-react"

import { MessageResponse } from "@/components/ai-elements/message"
import { ChatErrorBanner } from "@/components/chat-error-banner"
import {
  CHAT_MAX_MESSAGE_LENGTH,
  getMessageTextFromParts,
} from "@/lib/chat-config"
import { CHAT_SUGGESTED_PROMPTS } from "@/lib/projects"
import { cn } from "@/lib/utils"

const PREBUILT_PROMPTS = CHAT_SUGGESTED_PROMPTS.slice(0, 3)
const CHAT_TRANSPORT = new DefaultChatTransport({ api: "/api/chat" })

function getMessageText(message: UIMessage) {
  return getMessageTextFromParts(message.parts)
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
    regenerate,
  } = useChat({ transport: CHAT_TRANSPORT })
  const isLoading = status === "submitted" || status === "streaming"
  const hasStarted = messages.length > 0
  const inputTooLong = input.length > CHAT_MAX_MESSAGE_LENGTH

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, status])

  const submitMessage = (text: string) => {
    const question = text.trim()
    if (!question || isLoading || question.length > CHAT_MAX_MESSAGE_LENGTH) {
      return
    }

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

  const handleRetry = () => {
    clearError()
    if (messages.some((message) => message.role === "assistant")) {
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
    <div className="dossier-chat" aria-busy={isLoading}>
      <div
        ref={scrollRef}
        className={cn(
          "dossier-chat__messages custom-scrollbar",
          hasStarted && "dossier-chat__messages--active"
        )}
        aria-live="polite"
        aria-relevant="additions"
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
                      <p className="dossier-chat__user-text">{text}</p>
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
              <div className="dossier-chat__loading" aria-live="polite">
                <Loader2 aria-hidden="true" />
                <span>Reading the project notes…</span>
              </div>
            )}

            {error && (
              <ChatErrorBanner
                className="dossier-chat__error"
                onRetry={handleRetry}
              />
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
              <span className="dossier-chat__prompt-label">{prompt}</span>
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
            maxLength={CHAT_MAX_MESSAGE_LENGTH}
            disabled={isLoading}
            aria-invalid={inputTooLong}
            aria-describedby={
              input.length > CHAT_MAX_MESSAGE_LENGTH * 0.85
                ? "portfolio-question-count"
                : undefined
            }
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || inputTooLong}
            aria-label="Send question"
          >
            <Send aria-hidden="true" />
          </button>
        </form>
        {input.length > CHAT_MAX_MESSAGE_LENGTH * 0.85 && (
          <p
            id="portfolio-question-count"
            className={cn(
              "dossier-chat__count",
              inputTooLong && "dossier-chat__count--over"
            )}
          >
            {input.length.toLocaleString()} /{" "}
            {CHAT_MAX_MESSAGE_LENGTH.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}
