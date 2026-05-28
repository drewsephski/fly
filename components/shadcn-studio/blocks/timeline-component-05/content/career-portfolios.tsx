import Link from "next/link"
import { ExternalLink } from "lucide-react"

const CareerPortfoliosContent = () => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold">Founder</h3>
        <p className="text-sm text-muted-foreground">
          Portfolios.chat · Feb 2026 – Present
        </p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Building an AI-native portfolio platform that turns resumes, GitHub, and
        LinkedIn profiles into conversational, SEO-optimized sites that answer
        recruiters for you. Multi-source ingestion, edge deployment,
        subscription at $12/mo.
      </p>
      <Link
        href="https://portfolios.chat"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-sm border border-border/40 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        portfolios.chat
      </Link>
    </div>
  )
}

export default CareerPortfoliosContent
