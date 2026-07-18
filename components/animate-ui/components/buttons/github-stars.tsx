"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { StarIcon } from "lucide-react"

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "@/components/animate-ui/primitives/buttons/button"
import {
  GithubStars,
  GithubStarsIcon,
  GithubStarsLogo,
  GithubStarsNumber,
  GithubStarsParticles,
  type GithubStarsProps,
} from "@/components/animate-ui/primitives/animate/github-stars"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[box-shadow,_color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        accent: "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const buttonStarVariants = cva("", {
  variants: {
    variant: {
      default:
        "fill-neutral-700 stroke-neutral-700 dark:fill-neutral-300 dark:stroke-neutral-300",
      accent:
        "fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700",
      outline:
        "fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700",
      ghost:
        "fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type GitHubStarsButtonProps = Omit<
  ButtonPrimitiveProps & GithubStarsProps,
  "asChild" | "children"
> &
  VariantProps<typeof buttonVariants>

function GitHubStarsButton({
  className,
  username,
  repo,
  value,
  delay,
  inView,
  inViewMargin,
  inViewOnce,
  variant,
  size,
  hoverScale = 1.03,
  tapScale = 0.97,
  ...props
}: GitHubStarsButtonProps) {
  if (!username || !repo) return null

  function handleOpenRepo() {
    window.open(
      `https://github.com/${username}/${repo}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <GithubStars
      asChild
      username={username}
      repo={repo}
      value={value}
      delay={delay}
      inView={inView}
      inViewMargin={inViewMargin}
      inViewOnce={inViewOnce}
    >
      <ButtonPrimitive
        type="button"
        onClick={handleOpenRepo}
        className={cn(buttonVariants({ variant, size, className }))}
        hoverScale={hoverScale}
        tapScale={tapScale}
        aria-label={`View ${username}/${repo} on GitHub`}
        {...props}
      >
        <GithubStarsLogo />
        <GithubStarsNumber />
        <GithubStarsParticles className="text-yellow-500">
          <GithubStarsIcon
            icon={StarIcon}
            data-variant={variant}
            className={cn(buttonStarVariants({ variant }))}
            activeClassName="text-yellow-500"
            size={18}
          />
        </GithubStarsParticles>
      </ButtonPrimitive>
    </GithubStars>
  )
}

export { GitHubStarsButton, type GitHubStarsButtonProps }
