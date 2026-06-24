import Link from "next/link"
import { ExternalLink } from "lucide-react"

const CareerConsultantContent = () => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-xl font-semibold">Independent Consultant</h3>
        <p className="text-base text-muted-foreground">
          Remote · Sep 2024 – Jan 2026
        </p>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">
        Built SlotFlow — multi-tenant event platform with AI scheduling that cut
        admin overhead in half.
      </p>
      <Link
        href="https://slotflow.fit"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-sm border border-border/40 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        slotflow.fit
      </Link>
    </div>
  )
}

export default CareerConsultantContent
