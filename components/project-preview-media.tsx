"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"

import type { ProjectPreviewMedia as ProjectPreviewMediaSource } from "@/lib/projects"
import { cn } from "@/lib/utils"

interface ProjectPreviewMediaProps {
  media: ProjectPreviewMediaSource
  title: string
  className?: string
  priority?: boolean
  sizes: string
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener("change", onChange)

  return () => mediaQuery.removeEventListener("change", onChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getServerReducedMotionSnapshot() {
  return false
}

export function ProjectPreviewMedia({
  media,
  title,
  className,
  priority = false,
  sizes,
}: ProjectPreviewMediaProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(priority)
  const [isInViewport, setIsInViewport] = useState(priority)
  const [videoFailed, setVideoFailed] = useState(false)
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false
        setIsInViewport(visible)
        if (visible) setHasEnteredViewport(true)
      },
      { rootMargin: "320px 0px", threshold: 0.15 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const shouldRenderVideo =
    !reducedMotion && !videoFailed && (priority || hasEnteredViewport)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!reducedMotion && isInViewport) {
      void video.play().catch(() => {
        // The generated poster remains visible when autoplay is unavailable.
      })
      return
    }

    video.pause()
  }, [isInViewport, reducedMotion, shouldRenderVideo])

  return (
    <span
      ref={containerRef}
      className={cn("project-preview-media", className)}
      data-reduced-motion={reducedMotion ? "true" : "false"}
    >
      {shouldRenderVideo ? (
        <video
          ref={videoRef}
          className="project-preview-media__asset"
          poster={media.poster}
          muted
          playsInline
          loop
          preload={priority ? "metadata" : "none"}
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setVideoFailed(true)}
        >
          <source src={media.webm} type="video/webm" />
          <source src={media.mp4} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={media.poster}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="project-preview-media__asset"
          aria-hidden="true"
        />
      )}
      <span className="sr-only">Animated live-site preview of {title}</span>
    </span>
  )
}
