import { cn } from "@/lib/utils"
import Image from "next/image"

interface ArchiveItem {
  src: string
  alt: string
  title?: string
  description?: string
  span?: "small" | "medium" | "large" | "wide"
}

interface VisualArchiveProps {
  items: ArchiveItem[]
  className?: string
}

const spanClasses = {
  small: "col-span-1 row-span-1 aspect-square",
  medium: "col-span-1 row-span-2 aspect-[1/2]",
  large: "col-span-2 row-span-2 aspect-square",
  wide: "col-span-2 row-span-1 aspect-[2/1]",
}

export function VisualArchive({ items, className }: VisualArchiveProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid auto-rows-auto grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "group relative overflow-hidden rounded-lg border border-border/40 bg-muted/20 transition-all duration-300 hover:border-border/80 hover:shadow-lg",
              spanClasses[item.span || "small"]
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content overlay */}
            {(item.title || item.description) && (
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.title && (
                  <p className="truncate text-xs font-medium text-foreground">
                    {item.title}
                  </p>
                )}
                {item.description && (
                  <p className="mt-0.5 line-clamp-2 text-[10px] text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Preset archive items for the portfolio
export const portfolioArchiveItems: ArchiveItem[] = [
  {
    src: "/archive/project-1.jpg",
    alt: "Phoenix Agency Dashboard",
    title: "Phoenix Agency",
    description: "SaaS boilerplate marketplace",
    span: "large",
  },
  {
    src: "/archive/project-2.jpg",
    alt: "NodeBase Workflow",
    title: "NodeBase",
    description: "Open-source automation platform",
    span: "medium",
  },
  {
    src: "/archive/project-3.jpg",
    alt: "Astra Template",
    title: "Astra",
    description: "Top 15 Product Hunt",
    span: "small",
  },
  {
    src: "/archive/project-4.jpg",
    alt: "Stehnova Website",
    title: "Stehnova",
    description: "Real estate holdings",
    span: "small",
  },
  {
    src: "/archive/project-5.jpg",
    alt: "SlotFlow Platform",
    title: "SlotFlow",
    description: "Event management system",
    span: "wide",
  },
  {
    src: "/archive/project-6.jpg",
    alt: "AI Agent Interface",
    title: "AI Agents",
    description: "Autonomous workflow systems",
    span: "medium",
  },
  {
    src: "/archive/project-7.jpg",
    alt: "Multi-tenant Architecture",
    title: "Multi-tenancy",
    description: "RBAC & tenant isolation",
    span: "small",
  },
  {
    src: "/archive/project-8.jpg",
    alt: "Stripe Integration",
    title: "Billing Systems",
    description: "Stripe Connect & subscriptions",
    span: "small",
  },
]
