"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface PracticeAccordionItem {
  title: string
  detail: string
}

export function PracticeAccordion({
  items,
}: {
  items: readonly PracticeAccordionItem[]
}) {
  const [active, setActive] = useState<string | null>(items[0]?.title ?? null)

  const handleToggle = (title: string) => {
    setActive((current) => (current === title ? null : title))
  }

  const activeItem = items.find((item) => item.title === active)

  return (
    <div className="atelier-practice__accordion">
      <ul className="atelier-practice__accordion-triggers">
        {items.map((item) => {
          const isActive = active === item.title

          return (
            <li key={item.title}>
              <button
                type="button"
                className={cn(
                  "atelier-practice__accordion-trigger",
                  isActive && "is-active"
                )}
                aria-expanded={isActive}
                onClick={() => handleToggle(item.title)}
              >
                <span>{item.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "atelier-practice__accordion-icon",
                    isActive && "is-active"
                  )}
                />
              </button>
            </li>
          )
        })}
      </ul>

      <div
        className="atelier-practice__accordion-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        {activeItem ? (
          <p
            key={activeItem.title}
            className="atelier-practice__accordion-copy"
          >
            {activeItem.detail}
          </p>
        ) : (
          <p className="atelier-practice__accordion-copy atelier-practice__accordion-copy--idle">
            Choose a capability.
          </p>
        )}
      </div>
    </div>
  )
}
