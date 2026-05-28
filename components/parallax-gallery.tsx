'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryImage {
  src: string
  alt: string
  depth?: 'background' | 'mid' | 'foreground' | 'special'
  url?: string
  description?: string
}

interface ParallaxGalleryProps {
  images: GalleryImage[]
  className?: string
  popupBackdrop?: 'blurred-image' | 'blurred-color'
  popupBackgroundColor?: string
}

export function ParallaxGallery({
  images,
  className,
  popupBackdrop = 'blurred-color',
  popupBackgroundColor,
}: ParallaxGalleryProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const [hoveredSrc, setHoveredSrc] = useState<string | null>(null)

  const openImage = useCallback((image: GalleryImage) => {
    setSelected(image)
  }, [])

  const closeModal = useCallback(() => setSelected(null), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeModal])

  const col1 = images.filter((_, i) => i % 3 === 0)
  const col2 = images.filter((_, i) => i % 3 === 1)
  const col3 = images.filter((_, i) => i % 3 === 2)

  return (
    <>
      <div
        className={cn('relative overflow-hidden', className)}
        style={{ height: '90vh' }}
      >
        {/* Fade masks top & bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32"
          style={{ background: 'linear-gradient(to bottom, var(--color-background, hsl(var(--background))), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
          style={{ background: 'linear-gradient(to top, var(--color-background, hsl(var(--background))), transparent)' }}
        />

        <div className="flex h-full gap-3 px-4 md:gap-5 md:px-8">
          <ScrollColumn
            images={col1}
            duration={38}
            direction="up"
            hoveredSrc={hoveredSrc}
            onHover={setHoveredSrc}
            onLeave={() => setHoveredSrc(null)}
            onOpen={openImage}
          />
          <ScrollColumn
            images={col2}
            duration={52}
            direction="down"
            hoveredSrc={hoveredSrc}
            onHover={setHoveredSrc}
            onLeave={() => setHoveredSrc(null)}
            onOpen={openImage}
          />
          <ScrollColumn
            images={col3}
            duration={44}
            direction="up"
            hoveredSrc={hoveredSrc}
            onHover={setHoveredSrc}
            onLeave={() => setHoveredSrc(null)}
            onOpen={openImage}
          />
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{
                background: popupBackdrop === 'blurred-image'
                  ? `url(${selected.src}) center/cover no-repeat`
                  : popupBackgroundColor || 'oklch(0.12 0.008 60 / 0.96)',
                filter: popupBackdrop === 'blurred-image' ? 'blur(48px) brightness(0.35) saturate(1.4)' : 'none',
              }}
            />

            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute right-6 top-6 z-50 flex h-9 w-9 items-center justify-center border border-border/40 bg-background/80 text-foreground/70 backdrop-blur-sm transition-colors hover:border-border hover:text-foreground"
              style={{ borderRadius: '2px' }}
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
            >
              <div
                className="overflow-hidden border border-border/30"
                style={{ borderRadius: '3px' }}
              >
                <img
                  src={selected.src}
                  alt={selected.alt}
                  className="max-h-[72vh] max-w-[88vw] object-contain"
                />
              </div>
              <div className="flex w-full max-w-[88vw] items-start justify-between gap-6 px-1">
                <div className="min-w-0 flex-1">
                  <p
                    className="mb-1 text-xs tracking-[0.2em] text-muted-foreground/60"
                    style={{ fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase' }}
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
                    className="shrink-0 inline-flex items-center gap-1 border border-border/40 bg-background/80 px-3 py-1.5 text-xs text-foreground/70 transition-colors hover:border-border/70 hover:text-foreground"
                    style={{ borderRadius: '2px', fontFamily: 'var(--font-mono, monospace)' }}
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

interface ScrollColumnProps {
  images: GalleryImage[]
  duration: number
  direction: 'up' | 'down'
  hoveredSrc: string | null
  onHover: (src: string) => void
  onLeave: () => void
  onOpen: (image: GalleryImage) => void
}

function ScrollColumn({
  images,
  duration,
  direction,
  hoveredSrc,
  onHover,
  onLeave,
  onOpen,
}: ScrollColumnProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const repeated = [...images, ...images, ...images, ...images]

  const keyframes = direction === 'up'
    ? `@keyframes scroll-up { from { transform: translateY(0) } to { transform: translateY(-50%) } }`
    : `@keyframes scroll-down { from { transform: translateY(-50%) } to { transform: translateY(0) } }`

  const animName = direction === 'up' ? 'scroll-up' : 'scroll-down'

  return (
    <div
      className="relative flex-1 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{keyframes}</style>
      <div
        ref={trackRef}
        style={{
          animation: `${animName} ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {repeated.map((image, idx) => (
          <GalleryTile
            key={`${image.src}-${idx}`}
            image={image}
            isActive={hoveredSrc === image.src}
            isAnyHovered={hoveredSrc !== null}
            onHover={() => onHover(image.src)}
            onLeave={onLeave}
            onOpen={() => onOpen(image)}
          />
        ))}
      </div>
    </div>
  )
}

interface GalleryTileProps {
  image: GalleryImage
  isActive: boolean
  isAnyHovered: boolean
  onHover: () => void
  onLeave: () => void
  onOpen: () => void
}

function GalleryTile({ image, isActive, isAnyHovered, onHover, onLeave, onOpen }: GalleryTileProps) {
  return (
    <div
      className="group relative mb-3 cursor-pointer overflow-hidden md:mb-4"
      style={{
        borderRadius: '3px',
        border: '1px solid',
        borderColor: isActive
          ? 'oklch(0.52 0.018 65 / 0.5)'
          : 'oklch(0.88 0.014 72 / 0.6)',
        transition: 'border-color 0.25s ease, opacity 0.25s ease',
        opacity: isAnyHovered && !isActive ? 0.45 : 1,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onOpen}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="block w-full object-cover"
        style={{
          aspectRatio: '4/3',
          transform: isActive ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        draggable={false}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-3"
        style={{
          background: 'linear-gradient(to top, oklch(0.12 0.008 60 / 0.85) 0%, oklch(0.12 0.008 60 / 0.4) 60%, transparent 100%)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.22s ease',
        }}
      >
        <span
          className="text-[10px] tracking-[0.18em] text-white/70"
          style={{ fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase' }}
        >
          {image.alt}
        </span>
        {image.description && (
          <span
            className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/55"
          >
            {image.description}
          </span>
        )}
      </div>
    </div>
  )
}

export default ParallaxGallery
