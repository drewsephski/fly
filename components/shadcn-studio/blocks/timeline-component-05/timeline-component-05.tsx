import type { ReactNode } from "react"

export interface TimelineEntry {
  company: string
  period: string
  content: ReactNode
}

interface TimelineProps {
  entries: TimelineEntry[]
}

const TimelineContent = ({ entries }: TimelineProps) => {
  return (
    <>
      {entries.map((entry, index) => (
        <div
          key={entry.company}
          id={String(index + 1)}
          className="relative flex scroll-mt-18 justify-end gap-4"
        >
          <div className="sticky top-19 flex w-36 flex-col items-end gap-1 self-start pb-4 max-md:hidden">
            <div className="text-right text-base font-semibold text-foreground">
              {entry.company}
            </div>
            <div className="text-right font-mono text-sm text-muted-foreground">
              {entry.period}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="sticky top-19 flex size-6 items-center justify-center max-sm:top-5">
              <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-foreground/10">
                <span className="size-2 rounded-full bg-foreground/60" />
              </span>
            </div>
            {index !== entries.length - 1 && (
              <span className="-mt-2.5 w-px flex-1 bg-border" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-4 pb-11 pl-3 md:pl-6 lg:pl-9">
            <div className="flex flex-col gap-1 md:hidden">
              <div className="text-base font-semibold text-foreground">
                {entry.company}
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                {entry.period}
              </div>
            </div>
            {entry.content}
          </div>
        </div>
      ))}
    </>
  )
}

export default TimelineContent
