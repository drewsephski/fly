'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

interface QuickLookProps {
  src: string | null
  alt: string
  onClose: () => void
}

export function QuickLook({ src, alt, onClose }: QuickLookProps) {
  const close = useCallback(() => onClose(), [onClose])

  useEffect(() => {
    if (!src) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [src, close])

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[88vh] max-w-[92vw] overflow-hidden rounded-xl border border-border/40 bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={src}
                alt={alt}
                className="max-h-[78vh] max-w-[88vw] object-contain"
                draggable={false}
              />
              <button
                onClick={close}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background/90 text-foreground/70 backdrop-blur-sm transition-colors hover:border-border hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="border-t border-border/30 px-4 py-3">
              <p className="text-xs font-medium text-foreground">{alt}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
