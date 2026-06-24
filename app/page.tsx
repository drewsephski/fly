"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GradientTracing } from "@/components/ui/gradient-tracing"
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { BlogPostList } from "@/components/blog-post"
import TimelineContent from "@/components/shadcn-studio/blocks/timeline-component-05/timeline-component-05"
import CareerPresentContent from "@/components/shadcn-studio/blocks/timeline-component-05/content/career-present"
import CareerConsultantContent from "@/components/shadcn-studio/blocks/timeline-component-05/content/career-consultant"
import CareerPortfoliosContent from "@/components/shadcn-studio/blocks/timeline-component-05/content/career-portfolios"
import { BackToTop } from "@/components/back-to-top"
import { TalkToDrew } from "@/components/talk-to-drew"
import { HeroChat } from "@/components/hero-chat"
import { AuroraText } from "@/components/ui/aurora-text"
import { QuickLook } from "@/components/quick-look"
import SpinButton from "@/components/ui/spin-button"
import { GoldenButton } from "@/components/ui/golden-button"
import { ProjectsBentoGrid } from "@/components/projects-bento-grid"
import { ProofStrip } from "@/components/proof-strip"
import { ProjectStatusBadges } from "@/components/project-status-badges"
import { SiteLogo } from "@/components/site-logo"
import { ARCHIVE_PROJECTS, FEATURED_PROJECTS } from "@/lib/projects"

const postsArray = [
  {
    title: "Agentic AI in Production: Patterns That Actually Work",
    description:
      "Bounded autonomy, multi-agent governance, and hierarchical memory — what holds up after two years in production.",
    author: "Drew Sepeczi",
    date: "May 7, 2026",
    readTime: "7 min read",
    tags: ["AI Agents", "Architecture", "Production"],
    content: "",
    slug: "agentic-ai-production-patterns-2026",
  },
  {
    title: "Building AI-First Frontend Architectures in 2026",
    description:
      "React Compiler, agent-scaffolded features, and edge-personalized bundles — the stack that's actually shipping.",
    author: "Drew Sepeczi",
    date: "May 5, 2026",
    readTime: "6 min read",
    tags: ["React", "AI", "Architecture"],
    content: "",
    slug: "building-ai-first-frontend-architectures",
  },
  {
    title: "The Internet of Agents: MCP, A2A, and What Comes Next",
    description:
      "How MCP, A2A, and ACP turn isolated automations into a network where agents discover and coordinate.",
    author: "Drew Sepeczi",
    date: "May 3, 2026",
    readTime: "8 min read",
    tags: ["MCP", "AI Agents", "Protocols"],
    content: "",
    slug: "internet-of-agents-mcp-a2a-protocols",
  },
]

type ArchiveProject = (typeof ARCHIVE_PROJECTS)[number]

function ArchiveProjectCard({
  project,
  animationDelay,
  onAsk,
}: {
  project: ArchiveProject
  animationDelay: number
  onAsk: (title: string) => void
}) {
  return (
    <Link
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group animate-fade-up relative flex flex-col overflow-hidden rounded-xl border border-border/35 bg-card/50 shadow-[0_1px_0_0_oklch(1_0_0/0.04)_inset] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border/60 hover:bg-card/75 hover:shadow-[0_12px_40px_-20px_oklch(0_0_0/0.45),0_1px_0_0_oklch(1_0_0/0.06)_inset] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--spin-accent-warm)]/0 to-transparent transition-all duration-500 group-hover:via-[var(--spin-accent-warm)]/35" />

      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border/25 bg-muted/15">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/70 via-card/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2.5 px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="shrink-0 font-mono text-[10px] text-muted-foreground/35 tabular-nums transition-colors duration-300 group-hover:text-[var(--spin-accent-warm)]/70"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              {project.index}
            </span>
            <h4 className="truncate text-base font-medium tracking-tight text-foreground">
              {project.title}
            </h4>
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/70" />
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        {project.status && project.status.length > 0 && (
          <ProjectStatusBadges status={project.status} />
        )}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1.5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="border border-border/30 bg-muted/30 text-xs font-normal text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
          <GoldenButton
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onAsk(project.title)
            }}
            className="ml-auto h-[2.5em] px-2.5 text-xs"
          >
            <MessageCircle className="h-3 w-3" />
            Ask
          </GoldenButton>
        </div>
      </div>
    </Link>
  )
}

export default function Page() {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatPrompt, setChatPrompt] = useState<string | undefined>(undefined)
  const [quickLook, setQuickLook] = useState<{
    src: string
    alt: string
  } | null>(null)

  return (
    <main id="main-content" className="relative z-10 min-h-svh text-foreground">
      {/* ── Grain overlay (subtle, complements dot-matrix) ── */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.007]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <SiteLogo />
          <nav className="flex items-center gap-1 text-base text-muted-foreground">
            <a
              href="#products"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Products
            </a>
            <a
              href="#experience"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Experience
            </a>
            <a
              href="#about"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              About
            </a>
            <a
              href="#writing"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Writing
            </a>
            <Link
              href="/gallery"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Gallery
            </Link>
            <a
              href="#contact"
              className="ml-2 inline-flex items-center gap-1.5 rounded-sm border border-border bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-all hover:opacity-80"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6">
        {/* ── Hero ── */}
        <section className="relative pt-28 pb-24 max-sm:pt-20 max-sm:pb-16 lg:grid lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Left column — hero content */}
          <div className="relative">
            {/* Decorative rule */}
            <div className="absolute top-20 left-0 h-px w-12 bg-border" />

            {/* Gradient tracing — responsive on all sizes */}
            <div className="absolute top-4 right-4 flex flex-col items-center gap-6 opacity-40 md:top-48 md:right-20 md:opacity-100 lg:top-12 lg:right-8">
              <div className="md:hidden">
                <GradientTracing
                  width={120}
                  height={120}
                  path="M60,0 L45,45 L75,45 L30,120 L60,60 L30,60 L60,0"
                  gradientColors={["#2EB9DF", "#2EB9DF", "#1ba4ff"]}
                  strokeWidth={2}
                  animationDuration={2}
                />
              </div>
              <div className="hidden md:block lg:hidden">
                <GradientTracing
                  width={240}
                  height={240}
                  path="M120,0 L90,90 L150,90 L60,240 L120,120 L60,120 L120,0"
                  gradientColors={["#2EB9DF", "#2EB9DF", "#1ba4ff"]}
                  strokeWidth={2}
                  animationDuration={2}
                />
              </div>
              <div className="hidden lg:block">
                <GradientTracing
                  width={180}
                  height={180}
                  path="M90,0 L67.5,67.5 L112.5,67.5 L45,180 L90,90 L45,90 L90,0"
                  strokeWidth={2}
                  animationDuration={2}
                />
              </div>
            </div>

            <div className="animate-fade-up">
              <p
                className="mb-5 text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                AI-Native · Full-Stack
              </p>
            </div>

            <div className="animate-fade-up delay-100">
              <h1
                className="max-w-3xl leading-[1.05] font-semibold tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 6vw + 0.5rem, 5.5rem)" }}
              >
                <AuroraText
                  className="font-semibold"
                  colors={[
                    "oklch(0.96 0.006 75)",
                    "oklch(0.78 0.10 70)",
                    "oklch(0.68 0.12 70)",
                    "oklch(0.85 0.06 70)",
                  ]}
                  speed={0.8}
                >
                  Drew
                  <br />
                  Sepeczi
                </AuroraText>
              </h1>
            </div>

            <div className="animate-fade-up delay-200">
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
                I turn rough ideas into shipped AI products, tools, and
                infrastructure.
              </p>
            </div>

            <div className="animate-fade-up mt-12 rotate-6 delay-300">
              <SpinButton
                onClick={() => setChatOpen(true)}
                onClose={() => setChatOpen(false)}
                isOpen={chatOpen}
              />
            </div>
          </div>

          {/* Right column — inline chat (lg only) */}
          <div className="animate-fade-up hidden delay-200 lg:block">
            <div className="lg:pt-12">
              <div className="mb-4 flex items-center gap-5">
                <a
                  href="https://github.com/drewsephski"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GitBranch className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px" />
                  <span className="tracking-wide">GitHub</span>
                </a>
                <div className="h-3.5 w-px bg-border" />
                <a
                  href="https://portfolios.chat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px" />
                  <span className="tracking-wide">Portfolio</span>
                </a>
              </div>
              <HeroChat />
            </div>
          </div>
        </section>

        <ProofStrip />

        <Separator className="mb-24 opacity-50 max-sm:mb-16" />

        {/* ── Featured Products ── */}
        <section id="products" className="pb-28 max-sm:pb-16">
          <div className="animate-fade-up mb-14 flex items-end justify-between max-sm:mb-8">
            <div>
              <h2
                className="text-sm font-bold tracking-[0.3em] text-foreground/80 uppercase"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                Featured Products
              </h2>
              <p className="mt-3 max-w-md text-base text-muted-foreground">
                What I build — AI tools, infra, and products that ship.
              </p>
            </div>
            <span
              className="font-mono text-[10px] text-muted-foreground/30"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              {FEATURED_PROJECTS.length} projects
            </span>
          </div>

          <ProjectsBentoGrid
            projects={FEATURED_PROJECTS}
            onPreview={setQuickLook}
            onAsk={(title) => {
              setChatPrompt(`Tell me about ${title}`)
              setChatOpen(true)
            }}
          />

          {/* Other builds */}
          <div className="mt-20 max-sm:mt-12">
            <div className="animate-fade-up mb-8 flex items-end justify-between border-b border-border/25 pb-4">
              <div>
                <h3
                  className="text-sm font-bold tracking-[0.25em] text-foreground/75 uppercase"
                  style={{ fontFamily: "var(--font-mono, monospace)" }}
                >
                  Other Builds
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Experiments, side projects, and shipped apps.
                </p>
              </div>
              <span
                className="font-mono text-[10px] text-muted-foreground/30"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {ARCHIVE_PROJECTS.length} more
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ARCHIVE_PROJECTS.map((project, i) => (
                <ArchiveProjectCard
                  key={project.url}
                  project={project}
                  animationDelay={i * 20 + 300}
                  onAsk={(title) => {
                    setChatPrompt(`Tell me about ${title}`)
                    setChatOpen(true)
                  }}
                />
              ))}
            </div>

            <div className="mt-10 flex justify-center max-sm:mt-8">
              <Link
                href="/gallery"
                className="group animate-fade-up relative flex w-full max-w-md flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-dashed border-border/45 bg-card/25 px-8 py-10 text-center shadow-[0_1px_0_0_oklch(1_0_0/0.03)_inset] transition-all duration-300 hover:border-[var(--spin-accent-warm)]/30 hover:bg-card/45 hover:shadow-[0_16px_48px_-24px_oklch(0_0_0/0.5)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:max-w-lg sm:gap-4 sm:px-12 sm:py-12"
                style={{
                  animationDelay: `${ARCHIVE_PROJECTS.length * 20 + 320}ms`,
                }}
                aria-label="View all projects in the gallery"
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--spin-accent-warm)]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span
                  className="text-[10px] font-medium tracking-[0.28em] text-muted-foreground/55 uppercase"
                  style={{ fontFamily: "var(--font-mono, monospace)" }}
                >
                  Explore
                </span>
                <span className="flex items-center justify-center gap-3 text-2xl font-semibold tracking-tight text-foreground sm:gap-4 sm:text-3xl">
                  All Projects
                  <ArrowRight className="arrow-nudge-on-hover size-6 shrink-0 text-muted-foreground/70 transition-colors duration-300 group-hover:text-[var(--spin-accent-warm)] sm:size-7" />
                </span>
                <span className="max-w-[22ch] text-sm leading-relaxed text-muted-foreground/85">
                  Full visual archive in the gallery
                </span>
              </Link>
            </div>
          </div>
        </section>

        <Separator className="mb-28 opacity-50 max-sm:mb-16" />

        {/* ── About ── */}
        <section id="about" className="pb-28 max-sm:pb-16">
          <div className="grid gap-12 md:grid-cols-[200px_1fr] md:gap-20">
            <div className="animate-fade-up">
              <h2
                className="text-sm font-bold tracking-[0.3em] text-foreground/80 uppercase"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                About
              </h2>
            </div>

            <div className="animate-fade-up space-y-6 delay-100">
              <p className="max-w-2xl text-lg leading-relaxed text-foreground/90 sm:text-xl sm:leading-relaxed">
                I&apos;m an AI product engineer focused on turning rough ideas
                into working products fast.
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
                I build across the full stack: product strategy, UI, backend
                systems, AI workflows, billing, auth, deployment, and launch
                infrastructure.
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                My work sits between founder, engineer, and product designer —
                I care about shipping real tools, not polished mockups.
              </p>

              <div className="border-t border-border/50 pt-6">
                <p
                  className="mb-4 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase"
                  style={{ fontFamily: "var(--font-mono, monospace)" }}
                >
                  Core Competencies
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "AI System Design",
                    "Full-Stack Architecture",
                    "Rapid Prototyping",
                    "Performance Optimization",
                    "API Development",
                    "Database Design",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                      <span className="text-base text-muted-foreground">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Separator className="mb-28 opacity-50 max-sm:mb-16" />

        {/* ── Experience ── */}
        <section id="experience" className="pb-28 max-sm:pb-16">
          <div className="animate-fade-up mb-14 max-sm:mb-8">
            <h2
              className="text-sm font-bold tracking-[0.3em] text-foreground/80 uppercase"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              Experience
            </h2>
            <p className="mt-3 max-w-md text-base text-muted-foreground">
              Where I&apos;ve built — agencies, consulting, and my own products.
            </p>
          </div>

          <div className="animate-fade-up delay-100">
            <TimelineContent
              entries={[
                {
                  company: "Portfolios.chat",
                  period: "Feb 2026 – Present",
                  content: <CareerPortfoliosContent />,
                },
                {
                  company: "Independent Consultant",
                  period: "Sep 2024 – Jan 2026",
                  content: <CareerConsultantContent />,
                },
                {
                  company: "Phoenix Agency",
                  period: "Jul 2023 – Aug 2024",
                  content: <CareerPresentContent />,
                },
              ]}
            />
          </div>
        </section>

        <Separator className="mb-28 opacity-50" />

        <BlogPostList posts={postsArray} />

        {/* ── CTA ── */}
        <section id="contact" className="animate-fade-up pb-36">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 px-10 py-16 text-center">
            {/* Gold accent bar */}
            <div className="absolute top-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-[var(--spin-accent-warm)]/50 to-transparent" />

            {/* Gold-toned corner marks */}
            <span
              className="absolute top-4 left-4 h-3 w-3 border-t border-l"
              style={{ borderColor: "var(--spin-accent-warm)" }}
            />
            <span
              className="absolute top-4 right-4 h-3 w-3 border-t border-r"
              style={{ borderColor: "var(--spin-accent-warm)" }}
            />
            <span
              className="absolute bottom-4 left-4 h-3 w-3 border-b border-l"
              style={{ borderColor: "var(--spin-accent-warm)" }}
            />
            <span
              className="absolute right-4 bottom-4 h-3 w-3 border-r border-b"
              style={{ borderColor: "var(--spin-accent-warm)" }}
            />

            <p
              className="mb-3 text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              Contact
            </p>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
              Need an AI product built fast?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              I help founders turn messy ideas into shipped software — product
              strategy, AI workflows, full-stack architecture, and
              launch-ready execution.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:drew@drewsepeczi.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-amber-700/30 bg-background px-7 py-3 text-base font-medium text-foreground transition-all duration-300 hover:border-amber-500/60 hover:shadow-[0_0_24px_-6px_#d97706]"
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-sm border border-border/60 px-7 py-3 text-base font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                View My Work
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <a
                href="https://github.com/drewsephski"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com/in/drewsepeczi"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a
                href="https://instagram.com/drew.sepeczi"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <span
            className="text-sm text-muted-foreground"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            © 2026 Drew Sepeczi
          </span>
          <div className="group relative flex items-center">
            <a
              href="https://github.com/drewsephski"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 transition-colors duration-200 hover:text-muted-foreground/80"
            >
              <svg
                stroke-linejoin="round"
                stroke-linecap="round"
                strokeWidth={1.5}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <span
              className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 scale-0 rounded px-2 py-1 text-xs text-muted-foreground opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              github
            </span>
          </div>
          <a
            href="https://portfolios.chat/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            portfolio
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </footer>

      <TalkToDrew open={chatOpen} setOpen={setChatOpen} autoSend={chatPrompt} />
      <BackToTop />

      <QuickLook
        src={quickLook?.src ?? null}
        alt={quickLook?.alt ?? ""}
        onClose={() => setQuickLook(null)}
      />
    </main>
  )
}
