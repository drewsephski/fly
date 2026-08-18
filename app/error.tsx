"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RotateCcw } from "lucide-react"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[app] Route error:", error)
  }, [error])

  return (
    <main
      id="main-content"
      className="atelier-shell flex min-h-[70vh] flex-col justify-center py-32"
    >
      <p className="atelier-kicker">Something broke</p>
      <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        The page failed to load.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        This is usually temporary. Retry the page, or return home if the problem
        keeps showing up.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-muted/30 px-4 py-2 text-sm text-foreground transition-colors hover:border-border/70 hover:bg-muted/50"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </main>
  )
}
