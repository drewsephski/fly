"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface GalleryThumbImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  loading?: "lazy" | "eager"
}

export function GalleryThumbImage({
  src,
  alt,
  className,
  style,
  loading = "lazy",
}: GalleryThumbImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted/40 px-3 text-center text-muted-foreground",
          className
        )}
        style={style}
        role="img"
        aria-label={`${alt} preview unavailable`}
      >
        <span className="text-[10px] tracking-[0.14em] uppercase">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      draggable={false}
      onError={() => setFailed(true)}
    />
  )
}
