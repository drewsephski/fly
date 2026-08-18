"use client"

import type { CSSProperties } from "react"
import { useState } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface BentoEntry {
  title: string
  url: string
  image: string
  tags: string[]
}

function BentoCard({
  project,
  index,
}: {
  project: BentoEntry
  index: number
}) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "atelier-bento__card",
        (index % 6 === 0 || index % 6 === 5) && "atelier-bento__card--wide"
      )}
      style={{ "--i": index } as CSSProperties}
      aria-label={`Open ${project.title}`}
    >
      {imageFailed ? (
        <div className="atelier-bento__fallback" role="img" aria-label={`${project.title} preview unavailable`}>
          <span>{project.title}</span>
        </div>
      ) : (
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          fill
          sizes="(max-width: 700px) 50vw, 33vw"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="atelier-bento__scrim">
        <p className="atelier-bento__title">{project.title}</p>
        <span className="atelier-bento__meta">
          {project.tags.slice(0, 2).join(" · ")}
        </span>
      </div>
      <span className="atelier-bento__arrow" aria-hidden="true">
        <ArrowUpRight />
      </span>
    </a>
  )
}

export function ProjectBento({ projects }: { projects: BentoEntry[] }) {
  if (projects.length === 0) {
    return (
      <div className="atelier-bento-empty">
        <p>No projects in this view yet.</p>
      </div>
    )
  }

  return (
    <div className="atelier-bento">
      {projects.map((project, index) => (
        <BentoCard key={project.url} project={project} index={index} />
      ))}
    </div>
  )
}
