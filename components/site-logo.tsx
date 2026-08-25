import Link from "next/link"

import { cn } from "@/lib/utils"

interface SiteLogoProps {
  className?: string
}

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center rounded-sm", className)}
      aria-label="Drew Sepeczi home"
    >
      <span aria-hidden="true">Drew</span>
    </Link>
  )
}
