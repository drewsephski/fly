import Link from "next/link"

import { cn } from "@/lib/utils"

interface SiteLogoMarkProps {
  className?: string
  title?: string
}

export function SiteLogoMark({
  className,
  title = "Drew Sepeczi",
}: SiteLogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <title>{title}</title>
      <rect width="32" height="32" rx="7" fill="var(--color-ink)" />
      <path
        d="M5 23.5C9.5 13.5 14.5 10 27 7"
        stroke="var(--color-accent)"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M11 8V24M11 8H16.25C19.75 8 21.75 11.25 21.75 16C21.75 20.75 19.75 24 16.25 24H11"
        stroke="var(--color-paper)"
        strokeWidth="2.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface SiteLogoProps {
  className?: string
  markClassName?: string
}

export function SiteLogo({ className, markClassName }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center rounded-sm transition-opacity hover:opacity-80",
        className
      )}
      aria-label="Drew Sepeczi home"
    >
      <SiteLogoMark className={cn("size-7", markClassName)} />
    </Link>
  )
}
