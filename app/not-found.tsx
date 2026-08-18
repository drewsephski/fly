import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="atelier-shell flex min-h-[70vh] flex-col justify-center py-32"
    >
      <p className="atelier-kicker">404</p>
      <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        This page isn&apos;t in the archive.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        The link may be outdated, or the page was moved. Head back to the
        portfolio and keep browsing.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-border bg-muted/30 px-4 py-2 text-sm text-foreground transition-colors hover:border-border/70 hover:bg-muted/50"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to home
      </Link>
    </main>
  )
}
