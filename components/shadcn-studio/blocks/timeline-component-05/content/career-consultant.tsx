import Link from "next/link"
import { ExternalLink } from "lucide-react"

const CareerConsultantContent = () => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold">Independent Consultant</h3>
        <p className="text-sm text-muted-foreground">
          Remote · Sep 2024 – Jan 2026
        </p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Built SlotFlow, a multi-tenant event management platform with AI-powered
        scheduling that cut admin overhead by 50%. Designed complex domain logic
        for event optimization, data isolation across tenants, and LLM pipelines
        for intelligent recommendations.
      </p>
      <Link
        href="https://slotflow.fit"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-sm border border-border/40 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        slotflow.fit
      </Link>
    </div>
  )
}

export default CareerConsultantContent
