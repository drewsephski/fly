"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import type { FeaturedProject } from "@/lib/projects"
import { GitHubStarsButton } from "@/components/animate-ui/components/buttons/github-stars"
import { ProjectStatusBadges } from "@/components/project-status-badges"

interface ProjectsBentoGridProps {
  projects: FeaturedProject[]
  onPreview: (image: { src: string; alt: string }) => void
  onAsk: (title: string) => void
}

function ProjectActions({
  project,
  onAsk,
}: {
  project: FeaturedProject
  onAsk: (title: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <button
        type="button"
        onClick={() => onAsk(project.title)}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-[var(--color-accent-hover)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        Ask
      </button>
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-[var(--color-accent-hover)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        View
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px" />
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
  )
}

function HeroProjectCard({
  project,
  onPreview,
  onAsk,
  priority,
}: {
  project: FeaturedProject
  onPreview: (image: { src: string; alt: string }) => void
  onAsk: (title: string) => void
  priority?: boolean
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/55 transition-[border-color,background-color] duration-200 focus-within:border-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-card/80">
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-px w-12 bg-[var(--color-accent)] opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100" />

      <button
        type="button"
        onClick={() => onPreview({ src: project.image, alt: project.title })}
        className="relative aspect-[16/10] w-full overflow-hidden border-b border-border/25 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        aria-label={`Preview ${project.title}`}
      >
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          priority={priority}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent opacity-70" />
      </button>

      <div className="flex flex-col gap-3 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <div className="flex items-baseline gap-2.5">
              <span className="shrink-0 text-xs text-muted-foreground/60 tabular-nums transition-colors duration-200 group-hover:text-[var(--color-accent-hover)]">
                {project.index}
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {project.title}
              </h3>
            </div>
          </div>
        </div>

        <ProjectStatusBadges status={project.status} />

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <p className="text-xs text-muted-foreground/80">
          {project.tags.join(" · ")}
        </p>

        <ProjectActions project={project} onAsk={onAsk} />
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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {projects.map((project, i) => (
        <div
          key={project.url}
          className={`animate-fade-up${i === 0 ? "sm:col-span-2" : ""}`}
          style={{ animationDelay: `${i * 40 + 80}ms` }}
        >
          <HeroProjectCard
            project={project}
            onPreview={onPreview}
            onAsk={onAsk}
            priority={i < 2}
          />
        </div>
      ))}
    </div>
  )
}

export type { FeaturedProject }
