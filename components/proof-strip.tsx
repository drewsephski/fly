import { PROOF_METRICS } from "@/lib/projects"

export function ProofStrip() {
  return (
    <div
      className="animate-fade-up border-y border-border delay-300"
      aria-label="Credibility highlights"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {PROOF_METRICS.map((metric, index) => (
          <div
            key={metric.label}
            className={`flex min-w-0 flex-col justify-center gap-1 px-3 py-4 sm:px-4 ${
              index > 0 ? "border-l border-border" : ""
            } ${index === PROOF_METRICS.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
              {metric.value}
            </span>
            <span className="truncate text-xs text-muted-foreground sm:text-sm">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
