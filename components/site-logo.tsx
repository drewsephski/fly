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
      <rect width="32" height="32" rx="7" fill="#1C1A18" />
      <defs>
        <linearGradient
          id="site-logo-gold"
          x1="4"
          y1="26"
          x2="28"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A67C2E" />
          <stop offset="0.45" stopColor="#D4AB4A" />
          <stop offset="1" stopColor="#F0D890" />
        </linearGradient>
      </defs>
      <path
        d="M5 23.5C9.5 13.5 14.5 10 27 7"
        stroke="url(#site-logo-gold)"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M11 8V24M11 8H16.25C19.75 8 21.75 11.25 21.75 16C21.75 20.75 19.75 24 16.25 24H11"
        stroke="#F2EDE4"
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
