import Link from "next/link"
import { ExternalLink } from "lucide-react"

const CareerPortfoliosContent = () => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-xl font-semibold">Founder</h3>
        <p className="text-base text-muted-foreground">
          Portfolios.chat · Feb 2026 – Present
        </p>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">
        AI portfolio platform. Resumes, GitHub, and LinkedIn become conversational
        sites that answer recruiters for you.
      </p>
      <Link
        href="https://portfolios.chat"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-sm border border-border/40 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        portfolios.chat
      </Link>
    </div>
  )
}

export default CareerPortfoliosContent
