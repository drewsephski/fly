import Link from "next/link"
import { ExternalLink } from "lucide-react"

const CareerPresentContent = () => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-xl font-semibold">
          Founder & Lead Software Engineer
        </h3>
        <p className="text-base text-muted-foreground">
          Phoenix Agency · Jul 2023 – Aug 2024
        </p>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">
        Founded phoenixdev.agency. Shipped NodeBase, Astra (Top 15 Product Hunt),
        and client MVPs with 60% faster delivery.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="https://phoenixdev.agency"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-sm border border-border/40 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          phoenixdev.agency
        </Link>
      </div>
    </div>
  )
}

export default CareerPresentContent
