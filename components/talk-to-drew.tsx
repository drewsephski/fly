"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function TalkToDrew() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "hi!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: input.trim(),
      };

      const assistantId = `assistant-${Date.now()}`;
      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setInput("");
      setIsLoading(true);
      setError(null);

      const controller = new AbortController();
      abortRef.current = controller;

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
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response body");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // SSE messages are separated by double newlines
          const chunks = buffer.split("\n\n");
          buffer = chunks.pop() ?? "";

          for (const chunkStr of chunks) {
            const dataLine = chunkStr
              .split("\n")
              .find((l) => l.startsWith("data:"));
            if (!dataLine) continue;

            const data = dataLine.slice(5).trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.type === "text-delta" && parsed.delta) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + parsed.delta }
                      : m
                  )
                );
              }
            } catch {
              // ignore malformed chunks
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Something went wrong. Try again in a moment.");
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [input, isLoading, messages]
  );

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "hi!",
      },
    ]);
    setError(null);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 shadow-lg hover:scale-105",
          open
            ? "border-border bg-muted text-foreground"
            : "border-foreground/20 bg-foreground text-background hover:bg-foreground/90"
        )}
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
          "fixed bottom-20 right-6 z-50 flex w-[380px] max-w-[calc(100vw-3rem)] flex-col rounded-xl border border-border/60 bg-background shadow-2xl transition-all duration-300 origin-bottom-right",
          open
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        )}
        style={{ height: "520px", maxHeight: "calc(100vh - 7rem)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border/50 bg-muted">
              <Bot className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Talk to Drew</p>
              <p className="text-[10px] text-muted-foreground/60 font-mono">
                AI-powered assistant
              </p>
            </div>
          </div>
          {messages.length > 1 && (
            <button
              onClick={clearChat}
              className="text-[10px] text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        >
          {messages.map((msg: ChatMessage) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-2.5",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                  msg.role === "user"
                    ? "border-border/50 bg-muted"
                    : "border-foreground/10 bg-foreground/5"
                )}
              >
                {msg.role === "user" ? (
                  <User className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <Bot className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-lg border px-3 py-2 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "border-border/40 bg-muted/40 text-foreground"
                    : "border-border/30 bg-transparent text-muted-foreground"
                )}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm prose-neutral max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:my-1.5 prose-headings:text-sm prose-headings:font-semibold prose-a:text-foreground prose-a:underline prose-a:underline-offset-2">
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
            <div className="flex gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5">
                <Bot className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-border/30 px-3 py-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                <span className="text-xs text-muted-foreground/60 font-mono">
                  Thinking...
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-border/40 px-4 py-3"
        >
          <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-muted/30 px-3 py-2 focus-within:border-border/80 focus-within:bg-muted/50 transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Drew's projects..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground text-background transition-all hover:bg-foreground/90 disabled:opacity-30 disabled:hover:bg-foreground"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
