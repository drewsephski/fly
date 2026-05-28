"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import { Copy, Check } from "lucide-react"

interface MarkdownRendererProps {
  content: string
}

// Copy button component for code blocks
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-white/80"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  )
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-neutral prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="mt-12 mb-6 text-3xl leading-tight font-semibold tracking-tight text-foreground first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-10 mb-4 text-2xl leading-tight font-semibold tracking-tight text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-xl leading-snug font-semibold text-foreground">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-6 mb-3 text-lg font-semibold text-foreground">
              {children}
            </h4>
          ),

          // Paragraphs and text
          p: ({ children }) => (
            <p className="mb-5 leading-7 text-muted-foreground">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-foreground/90 italic">{children}</em>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="mb-5 ml-6 list-disc space-y-2 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-5 ml-6 list-decimal space-y-2 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-7 marker:text-muted-foreground/60">
              {children}
            </li>
          ),

          // Code blocks with syntax highlighting
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            const language = match ? match[1] : ""
            const codeString = String(children).replace(/\n$/, "")

            if (match) {
              return (
                <div className="group relative my-6 overflow-hidden rounded-lg border border-border/40 bg-[#1e1e1e] shadow-md">
                  <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                      </div>
                      <span className="ml-1 font-mono text-[10px] font-medium tracking-widest text-white/30 uppercase">
                        {language}
                      </span>
                    </div>
                    <CopyButton code={codeString} />
                  </div>
                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1.25rem 1.5rem",
                      background: "transparent",
                      fontSize: "0.8125rem",
                      lineHeight: "1.7",
                    }}
                    showLineNumbers={false}
                    wrapLongLines={false}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              )
            }

            // Inline code
            return (
              <code
                className="rounded-md border border-border/40 bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground/90 before:content-none after:content-none"
                {...props}
              >
                {children}
              </code>
            )
          },

          // Pre-formatted blocks (fallback)
          pre: ({ children }) => <>{children}</>,

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-2 border-border pl-5 text-muted-foreground italic">
              {children}
            </blockquote>
          ),

          // Links
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),

          // Horizontal rule
          hr: () => <hr className="my-8 border-t border-border/50" />,

          // Tables (via remark-gfm)
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-border/50">
              <table className="w-full text-left text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50 text-xs text-muted-foreground uppercase">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border/50">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-medium text-muted-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-muted-foreground/80">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
