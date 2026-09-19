import Link from "next/link"
import type { ReactNode } from "react"

interface ComplianceDocumentProps {
  title: string
  effectiveDate: string
  children: ReactNode
}

export function ComplianceDocument({
  title,
  effectiveDate,
  children,
}: ComplianceDocumentProps) {
  return (
    <main id="main-content" className="atelier-shell py-16 sm:py-24">
      <article className="mx-auto max-w-3xl">
        <p className="atelier-kicker">Legal</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Effective date: {effectiveDate}
        </p>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-medium [&_li]:ml-5 [&_li]:list-disc [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:space-y-2">
          {children}
        </div>

        <nav
          className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-8 text-sm"
          aria-label="Related policies"
        >
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/sms-opt-in">SMS Opt-In</Link>
          <Link href="/">Back to home</Link>
        </nav>
      </article>
    </main>
  )
}
