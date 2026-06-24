"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FeaturedProject } from "@/lib/projects"
import { GitHubStarsButton } from "@/components/animate-ui/components/buttons/github-stars"

interface ProjectsBentoGridProps {
  projects: FeaturedProject[]
  onPreview: (image: { src: string; alt: string }) => void
  onAsk: (title: string) => void
}

function FeaturedProjectCard({
  project,
  onPreview,
  onAsk,
  priority,
  reversed,
}: {
  project: FeaturedProject
  onPreview: (image: { src: string; alt: string }) => void
  onAsk: (title: string) => void
  priority?: boolean
  reversed?: boolean
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border/35 bg-card/50 shadow-[0_1px_0_0_oklch(1_0_0/0.04)_inset] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border/60 hover:bg-card/70 hover:shadow-[0_12px_40px_-20px_oklch(0_0_0/0.45),0_1px_0_0_oklch(1_0_0/0.06)_inset] sm:h-[180px] sm:flex-row",
        reversed && "sm:flex-row-reverse"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--spin-accent-warm)]/0 to-transparent transition-all duration-500 group-hover:via-[var(--spin-accent-warm)]/35" />

      <button
        type="button"
        onClick={() => onPreview({ src: project.image, alt: project.title })}
        className={cn(
          "relative aspect-[16/9] w-full shrink-0 overflow-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:aspect-auto sm:h-full sm:w-[38%] sm:border-border/25",
          reversed ? "sm:border-l" : "sm:border-r"
        )}
        aria-label={`Preview ${project.title}`}
      >
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, 38vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          priority={priority}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="flex items-baseline gap-2.5">
          <span
            className="shrink-0 font-mono text-[10px] text-muted-foreground/55 tabular-nums transition-colors duration-300 group-hover:text-[var(--spin-accent-warm)]/70"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            {project.index}
          </span>
          <h3 className="truncate text-sm font-medium tracking-tight text-foreground sm:text-base">
            {project.title}
          </h3>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground/90 sm:line-clamp-1">
          {project.description}
        </p>

        <p
          className="truncate text-[10px] text-muted-foreground/60"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          {project.tags.join(" · ")}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => onAsk(project.title)}
            className="inline-flex items-center gap-1 rounded-sm text-[11px] text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <MessageCircle className="h-3 w-3" />
            Ask
          </button>
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-sm text-[11px] text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            View
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px" />
          </Link>
          {project.github && (
            <GitHubStarsButton
              username={project.github.username}
              repo={project.github.repo}
              value={project.github.value}
              variant="outline"
              size="sm"
              inView
            />
          )}
        </div>
      </div>
    </article>
  )
}

export function ProjectsBentoGrid({
  projects,
  onPreview,
  onAsk,
}: ProjectsBentoGridProps) {
  return (
    <div className="flex flex-col gap-3">
      {projects.map((project, i) => (
        <div
          key={project.url}
          className={cn("animate-fade-up")}
          style={{ animationDelay: `${i * 35 + 80}ms` }}
        >
          <FeaturedProjectCard
            project={project}
            onPreview={onPreview}
            onAsk={onAsk}
            priority={i === 0}
            reversed={i % 2 === 1}
          />
        </div>
      ))}
    </div>
  )
}

export type { FeaturedProject }
