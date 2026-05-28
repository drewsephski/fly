"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Send, Loader2, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const PREBUILT_PROMPTS = [
  "what's your favorite stack?",
  "what are you building now?",
  "tell me about NodeBase",
  "should founders learn to code?",
];

export function HeroChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text.trim(),
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
      setHasStarted(true);

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
          setError("Something went wrong. Try again.");
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [isLoading, messages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setHasStarted(false);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="relative flex flex-col rounded-xl border border-border/50 bg-muted/30">
      {/* Subtle top accent */}
      <div className="absolute left-0 top-0 h-[2px] w-full rounded-t-xl bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

      {/* Messages area */}
      <div
        ref={scrollRef}
        className={cn(
          "flex-1 overflow-y-auto px-4 transition-all duration-300 scrollbar-thin custom-scrollbar",
          hasStarted ? "py-4 space-y-3 max-h-[280px]" : "py-6"
        )}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--border) transparent",
        }}
      >
        {!hasStarted ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/50"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                AI Assistant
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ask about projects, stack, or anything. Drew&apos;s AI twin will respond in his voice.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="sticky -top-4 z-10 -mx-4 px-4 py-2 flex items-center justify-between bg-muted/90 border-b border-border/80">
              <p
                className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/40"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                Conversation
              </p>
              <button
                onClick={clearChat}
                disabled={isLoading}
                className="text-[10px] text-muted-foreground/90 transition-colors hover:text-muted-foreground disabled:opacity-30"
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
                    <div className="prose prose-xs prose-neutral max-w-none dark:prose-invert prose-p:my-0.5 prose-ul:my-0.5 prose-li:my-0 prose-headings:my-1 prose-headings:text-xs prose-headings:font-semibold prose-a:text-foreground prose-a:underline prose-a:underline-offset-2">
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
                  <span className="text-[10px] text-muted-foreground/60 font-mono">
                    thinking...
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-[10px] text-destructive">
                {error}
              </div>
            )}
          </>
        )}
      </div>

      {/* Prompt pills + input */}
      <div className="border-t border-border/40 px-4 pt-3 pb-3 space-y-3">
        {/* Prompt pills */}
        <div className="flex flex-wrap gap-1.5">
          {PREBUILT_PROMPTS.map((pill) => (
            <button
              key={pill}
              onClick={() => sendMessage(pill)}
              disabled={isLoading}
              className="group inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/60 px-2.5 py-1 text-[10px] text-muted-foreground transition-all hover:border-foreground/20 hover:bg-muted/50 hover:text-foreground disabled:opacity-40"
            >
              {pill}
              <ArrowUpRight className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-60" />
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask anything..."
            rows={2}
            className="w-full resize-none rounded-lg border border-border/40 bg-muted/30 px-3 py-2 pr-9 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors focus:border-border/80 focus:bg-muted/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="absolute right-2 bottom-2 flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-background transition-all hover:bg-foreground/90 disabled:opacity-30"
          >
            <Send className="h-3 w-3" />
          </button>
        </form>
      </div>
    </div>
  );
}
