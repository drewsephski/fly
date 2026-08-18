"use client"

import { useState, useCallback, useEffect, useId } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GalleryThumbImage } from "@/components/gallery-thumb-image"
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock"

interface GalleryImage {
  src: string
  alt: string
  depth?: "background" | "mid" | "foreground" | "special"
  url?: string
  description?: string
}

interface StaticGalleryProps {
  images: GalleryImage[]
  className?: string
  popupBackdrop?: "blurred-image" | "blurred-color"
  popupBackgroundColor?: string
}

export function StaticGallery({
  images,
  className,
  popupBackdrop = "blurred-color",
  popupBackgroundColor,
}: StaticGalleryProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const lightboxTitleId = useId()

  useBodyScrollLock(Boolean(selected))

  const openImage = useCallback((image: GalleryImage) => {
    setSelected(image)
  }, [])

  const closeModal = useCallback(() => setSelected(null), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [closeModal])

  return (
    <>
      <div className={cn("mx-auto max-w-6xl px-4 pb-20 md:px-8", className)}>
        <div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          style={{ gridAutoRows: "200px" }}
        >
          {images.map((image, idx) => (
            <motion.div
              key={image.src + idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "group relative col-span-1 row-span-1 cursor-pointer overflow-hidden border border-border/8 transition-colors hover:border-border/20"
              )}
              style={{
                borderRadius: "3px",
              }}
              onClick={() => openImage(image)}
            >
              <div className="relative h-full w-full">
                <GalleryThumbImage
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Hover overlay with CSS group-hover */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[oklch(0.12_0.008_60/0.85)] via-[oklch(0.12_0.008_60/0.4)] to-transparent p-3 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 md:p-4">
                  <span
                    className="text-[10px] tracking-[0.18em] text-white/70"
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      textTransform: "uppercase",
                    }}
                  >
                    {image.alt}
                  </span>
                  {image.description && (
                    <span className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/55">
                      {image.description}
                    </span>
                  )}
                </div>

                {/* Always-visible top-right index */}
                <div
                  className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-[2px] border border-white/20 bg-black/30 text-[9px] text-white/60 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0"
                  style={{ fontFamily: "var(--font-mono, monospace)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 flex items-center justify-between border-t border-border/40 pt-6">
          <p
            className="text-[10px] tracking-[0.2em] text-muted-foreground/70"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              textTransform: "uppercase",
            }}
          >
            {images.length} projects archived
          </p>
          <p
            className="text-[10px] tracking-[0.2em] text-muted-foreground/70"
            style={{
              fontFamily: "var(--font-mono, monospace)",
              textTransform: "uppercase",
            }}
          >
            Static view
          </p>
        </div>
      </div>

      {/* Lightbox - same as parallax gallery */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeModal}
            role="presentation"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  popupBackdrop === "blurred-image"
                    ? `url(${selected.src}) center/cover no-repeat`
                    : popupBackgroundColor || "oklch(0.12 0.008 60 / 0.96)",
                filter:
                  popupBackdrop === "blurred-image"
                    ? "blur(48px) brightness(0.35) saturate(1.4)"
                    : "none",
              }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close gallery preview"
              className="absolute top-6 right-6 z-50 flex h-9 w-9 items-center justify-center border border-border/40 bg-background/80 text-foreground/70 backdrop-blur-sm transition-colors hover:border-border hover:text-foreground"
              style={{ borderRadius: "2px" }}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby={lightboxTitleId}
            >
              <div
                className="overflow-hidden border border-border/30"
                style={{ borderRadius: "3px" }}
              >
                <GalleryThumbImage
                  src={selected.src}
                  alt={selected.alt}
                  className="max-h-[72vh] max-w-[88vw] object-contain"
                  loading="eager"
                />
              </div>
              <div className="flex w-full max-w-[88vw] items-start justify-between gap-6 px-1">
                <div className="min-w-0 flex-1">
                  <p
                    id={lightboxTitleId}
                    className="mb-1 truncate text-xs tracking-[0.2em] text-muted-foreground/60"
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      textTransform: "uppercase",
                    }}
                  >
                    {selected.alt}
                  </p>
                  {selected.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground/90">
                      {selected.description}
                    </p>
                  )}
                </div>
                {selected.url && (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex shrink-0 items-center gap-1 border border-border/40 bg-background/80 px-3 py-1.5 text-xs text-foreground/70 transition-colors hover:border-border/70 hover:text-foreground"
                    style={{
                      borderRadius: "2px",
                      fontFamily: "var(--font-mono, monospace)",
                    }}
                  >
                    Visit
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default StaticGallery
