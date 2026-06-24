import { PROOF_METRICS } from "@/lib/projects"

export function ProofStrip() {
  return (
    <div
      className="animate-fade-up border-y border-border/40 bg-muted/20 py-5 delay-300"
      aria-label="Credibility highlights"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-2 sm:gap-x-10">
        {PROOF_METRICS.map((metric) => (
          <div
            key={metric.label}
            className="flex items-baseline gap-2 text-center sm:text-left"
          >
            <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
              {metric.value}
            </span>
            <span className="text-sm text-muted-foreground">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
