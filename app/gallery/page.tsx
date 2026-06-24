"use client"

import { useState } from "react"
import Link from "next/link"
import { ParallaxGallery } from "@/components/parallax-gallery"
import { StaticGallery } from "@/components/static-gallery"
import { LayoutGrid, Columns3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { SiteLogo } from "@/components/site-logo"
import { getPriorityGalleryImages } from "@/lib/projects"

const legacyGalleryImages = [
  {
    src: "/projects/phoenixdesign.png",
    alt: "Red Noir",
    depth: "background" as const,
    url: "https://red-noir.vercel.app/",
    description:
      "Phoenix Design Labs combines advanced generative algorithms with human creativity to create world-class products rapidly.",
  },
  {
    src: "/projects/aisdk.png",
    alt: "AI Chat SDK",
    depth: "mid" as const,
    url: "https://aisdk.shop/",
    description:
      "Assistant UI offers an interactive platform for AI-powered assistance including weather updates, programming help, SQL queries, and meal planning.",
  },
  {
    src: "/projects/andrewsautomations.png",
    alt: "Andrew's Automations",
    depth: "foreground" as const,
    url: "https://drewsautomations.world/",
    description:
      "Andrew's Automations is an AI app marketplace offering ready-to-use templates for deploying AI-powered applications with built-in user management and monetization.",
  },
  {
    src: "/projects/astra.png",
    alt: "Astra",
    depth: "background" as const,
    url: "https://astra.motorcycles/",
    description:
      "A starter kit for launching SaaS applications, offering simple features like payment processing and Clerk authentication.",
  },
  {
    src: "/projects/slot-flow.png",
    alt: "SlotFlow",
    depth: "mid" as const,
    url: "https://slotflow.fit",
    description:
      "An all-in-one Next.js starter kit for rapid SaaS deployment with pre-configured authentication, billing, and a dashboard.",
  },
  {
    src: "/projects/bento.png",
    alt: "BentoBox",
    depth: "mid" as const,
    url: "https://bentobox-roan.vercel.app/",
    description:
      "A clean bento-grid portfolio layout for showcasing projects and skills.",
  },
  {
    src: "/projects/betterauth.png",
    alt: "Better Auth",
    depth: "foreground" as const,
    url: "https://betterauth.netlify.app/",
    description:
      "Better Auth is a production-ready authentication starter kit with Next.js, Better Auth, PostgreSQL, and Drizzle ORM.",
  },
  {
    src: "/projects/clean-fluid.png",
    alt: "Clean Fluid",
    depth: "background" as const,
    url: "https://clean-fluid.vercel.app/",
    description:
      "Organic Intelligence is an editorial-tech hybrid design agency specializing in design and technology integration.",
  },
  {
    src: "/projects/cypher.png",
    alt: "CodeCypher",
    depth: "mid" as const,
    url: "https://codecypher.lol/",
    description:
      "An AI-powered coding environment for rapid development and debugging.",
  },
  {
    src: "/projects/ez.png",
    alt: "EZ UI",
    depth: "foreground" as const,
    url: "https://ez-ui.netlify.app/",
    description:
      "A component and template marketplace platform ofering AI-driven tools for product teams to streamline content creation and enhance collaboration.",
  },
  {
    src: "/projects/getcracked.png",
    alt: "Get Cracked",
    depth: "background" as const,
    url: "https://getcracked.lol/",
    description:
      "Get Cracked offers an AI-powered SaaS platform to accelerate the development and launch of applications, saving time and costs.",
  },
  {
    src: "/projects/homeowner.png",
    alt: "Home Owner AI",
    depth: "mid" as const,
    url: "https://home-owner-ai.vercel.app/",
    description:
      "Relay is a platform that provides AI-powered solutions for homeowners.",
  },
  {
    src: "/projects/slotflow.png",
    alt: "SlotFlow Dark",
    depth: "foreground" as const,
    url: "https://slotflow.fit",
    description:
      "An all-in-one Next.js starter kit for rapid SaaS deployment with pre-configured authentication, billing, and a dashboard.",
  },
  {
    src: "/projects/linkify.png",
    alt: "LinkFree",
    depth: "foreground" as const,
    url: "https://linkfree-beta.vercel.app/",
    description:
      "Drew Sepeczi — full stack engineer with a portfolio showcasing various projects and experiments.",
  },
  {
    src: "/projects/neon-genz.png",
    alt: "Neon Gen Z",
    depth: "background" as const,
    url: "https://neon-genz.vercel.app/",
    description:
      "A vibrant design system that encourages creativity and boldness with a focus on brutalist aesthetics.",
  },
  {
    src: "/projects/promptsh.png",
    alt: "PromptMarket",
    depth: "mid" as const,
    url: "https://promptmarket.sh/",
    description:
      "A public collection of system prompts engineered for precision.",
  },
  {
    src: "/projects/recruit-box.png",
    alt: "RecruitBox",
    depth: "foreground" as const,
    url: "https://recruit-box.vercel.app/",
    description: "RecruitBox is a platform for managing the hiring process.",
  },
  {
    src: "/projects/red-noir.png",
    alt: "Red Sun",
    depth: "background" as const,
    url: "https://red-sun-tau.vercel.app/",
    description:
      "Red Sun Design System is a modern editorial design system that combines bold coral accents with deep ink tones to create premium, crafted experiences quickly.",
  },
  {
    src: "/projects/roastmyui.png",
    alt: "Roast My UI",
    depth: "mid" as const,
    url: "https://roastmyui.me/",
    description: "Get your UI roasted by a savage Gen Z AI.",
  },
  {
    src: "/projects/shipspree-dark.png",
    alt: "ShipSpree Dark",
    depth: "foreground" as const,
    url: "https://phoenixdev.agency/",
    description:
      "ShipSpree is a production-ready Next.js SaaS boilerplate with built-in authentication, payment integrations, and production-ready features.",
  },
  {
    src: "/projects/shipspree-light.png",
    alt: "ShipSpree Light",
    depth: "background" as const,
    url: "https://phoenixdev.agency/",
    description:
      "ShipSpree is a production-ready Next.js SaaS boilerplate with built-in authentication, payment integrations, and production-ready features.",
  },

  {
    src: "/projects/linkfolio.png",
    alt: "Linkfolio",
    depth: "mid" as const,
    url: "https://linkfolio-cyan.vercel.app/",
    description:
      "An AI-powered tool that creates clean and shareable portfolios from LinkedIn profiles instantly.",
  },
  {
    src: "/projects/voxflow.png",
    alt: "VoxFlow",
    depth: "mid" as const,
    url: "https://voxflow.netlify.app/",
    description:
      "VoxFlow provides an AI Voice Agent Template designed for SaaS startups, enabling quick development and deployment of voice agents.",
  },
]

const galleryImages = [...getPriorityGalleryImages(), ...legacyGalleryImages]

const GalleryPage = () => {
  const [viewMode, setViewMode] = useState<"scroll" | "grid">("scroll")

  return (
    <main className="relative z-10 min-h-screen">
      {/* ── Header / Navbar ── */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <SiteLogo />
          <nav className="flex items-center gap-1 text-base text-muted-foreground">
            <Link
              href="/#products"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="/#experience"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Experience
            </Link>
            <Link
              href="/#about"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/#writing"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Writing
            </Link>
            <Link
              href="/gallery"
              className="rounded-sm bg-muted px-3 py-1.5 text-foreground transition-colors hover:bg-muted/80"
            >
              Gallery
            </Link>
            <a
              href="mailto:drew@drewsepeczi.xyz"
              className="ml-2 inline-flex items-center gap-1.5 rounded-sm border border-border bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-all hover:opacity-80"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* ── Gallery Header ── */}
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-6">
        <div className="flex items-end justify-between">
          <div>
            <p
              className="mb-3 text-[10px] font-medium tracking-[0.3em] text-muted-foreground/70 uppercase"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              Visual archive
            </p>
            <h1
              className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Gallery
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A running log of interfaces, experiments, and shipped work.
            </p>
          </div>

          {/* ── View Toggle ── */}
          <div className="flex items-center gap-1 rounded-md border border-border/50 bg-muted/30 p-1">
            <button
              onClick={() => setViewMode("scroll")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs transition-all",
                viewMode === "scroll"
                  ? "border border-border/40 bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              <Columns3 className="h-3.5 w-3.5" />
              Scroll
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs transition-all",
                viewMode === "grid"
                  ? "border border-border/40 bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* ── Gallery Content ── */}
      {viewMode === "scroll" ? (
        <ParallaxGallery images={galleryImages} popupBackdrop="blurred-color" />
      ) : (
        <StaticGallery images={galleryImages} popupBackdrop="blurred-color" />
      )}
    </main>
  )
}

export default GalleryPage
