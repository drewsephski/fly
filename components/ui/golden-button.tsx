"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface GoldenButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const GoldenButton = React.forwardRef<HTMLButtonElement, GoldenButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        role="button"
        ref={ref}
        className={cn(
          "touch-manipulation inline-flex items-center justify-center gap-1.5 outline-none font-inherit box-border border-none rounded-[0.3em] px-4 py-2",
          "shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(110,80,20,0.4),inset_0_-2px_5px_1px_rgba(139,66,8,1),inset_0_-1px_1px_3px_rgba(250,227,133,1)]",
          "bg-[linear-gradient(160deg,#a54e07_0%,#b47e11_20%,#fef1a2_45%,#bc881b_70%,#a54e07_100%)]",
          "border border-[#a55d07]",
          "text-[rgb(120,50,5)] text-xs uppercase whitespace-nowrap",
          "[text-shadow:0_2px_2px_rgba(250,227,133,1)]",
          "cursor-pointer transition-all duration-200 ease-in-out",
          "bg-[length:100%_100%] bg-center",
          "hover:bg-[length:150%_150%]",
          "hover:shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23),inset_0_-2px_5px_1px_#b17d10,inset_0_-1px_1px_3px_rgba(250,227,133,1)]",
          "hover:border-[rgba(165,93,7,0.6)] hover:text-[rgba(120,50,5,0.8)]",
          "active:shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(110,80,20,0.4),inset_0_-2px_5px_1px_#b17d10,inset_0_-1px_1px_3px_rgba(250,227,133,1)]",
          "focus:bg-[length:150%_150%]",
          "focus:shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23),inset_0_-2px_5px_1px_#b17d10,inset_0_-1px_1px_3px_rgba(250,227,133,1)]",
          "focus:border-[rgba(165,93,7,0.6)] focus:text-[rgba(120,50,5,0.8)]",
          className
        )}
        {...props}
      >
        <span className="font-semibold tracking-wide flex items-center gap-1.5">{children}</span>
      </button>
    )
  }
)
GoldenButton.displayName = "GoldenButton"

export { GoldenButton }
