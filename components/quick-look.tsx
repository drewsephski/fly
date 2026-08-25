"use client"

import { useEffect, useCallback, useId } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"

import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock"
import type { ProjectPreviewMedia } from "@/lib/projects"

interface QuickLookProps {
  media: ProjectPreviewMedia | null
  alt: string
  onClose: () => void
}

export function QuickLook({ media, alt, onClose }: QuickLookProps) {
  const titleId = useId()
  const close = useCallback(() => onClose(), [onClose])
  const isOpen = Boolean(media)

  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (!media) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [media, close])

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={close}
          role="presentation"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[88vh] max-w-[92vw] overflow-hidden rounded-xl border border-border/40 bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={media.poster}
                className="block max-h-[78vh] max-w-[88vw] object-contain"
              >
                <source src={media.webm} type="video/webm" />
                <source src={media.mp4} type="video/mp4" />
                <img src={media.poster} alt={alt} />
              </video>
              <button
                type="button"
                onClick={close}
                aria-label="Close preview"
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background/90 text-foreground/70 backdrop-blur-sm transition-colors hover:border-border hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="border-t border-border/30 px-4 py-3">
              <p
                id={titleId}
                className="truncate text-xs font-medium text-foreground"
              >
                {alt}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
