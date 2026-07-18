import { cn } from "@/lib/utils"
import type { ProjectStatus } from "@/lib/projects"

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  "Open Source":
    "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400",
  "In Progress":
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  SaaS: "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-400",
  "Mac App":
    "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  "Desktop App":
    "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  CLI: "border-zinc-500/30 bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
  "Product Hunt":
    "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400",
  "Client Work":
    "border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-400",
}

interface ProjectStatusBadgesProps {
  status: ProjectStatus[]
  className?: string
}

export function ProjectStatusBadges({
  status,
  className,
}: ProjectStatusBadgesProps) {
  if (status.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {status.map((item) => (
        <span
          key={item}
          className={cn(
            "inline-flex rounded-sm border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase sm:text-[11px]",
            STATUS_STYLES[item]
          )}
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
