"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, ArrowUpRight, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"
import { BlogPostList } from "@/components/blog-post"
import TimelineContent from "@/components/shadcn-studio/blocks/timeline-component-05/timeline-component-05"
import CareerPresentContent from "@/components/shadcn-studio/blocks/timeline-component-05/content/career-present"
import CareerConsultantContent from "@/components/shadcn-studio/blocks/timeline-component-05/content/career-consultant"
import CareerPortfoliosContent from "@/components/shadcn-studio/blocks/timeline-component-05/content/career-portfolios"
import { BackToTop } from "@/components/back-to-top"
import { TalkToDrew } from "@/components/talk-to-drew"
import { HeroChat } from "@/components/hero-chat"
import { QuickLook } from "@/components/quick-look"
import { ProjectsBentoGrid } from "@/components/projects-bento-grid"
import { ProofStrip } from "@/components/proof-strip"
import { ProjectStatusBadges } from "@/components/project-status-badges"
import { SiteHeader } from "@/components/site-header"
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
      className="group animate-fade-up relative flex flex-col overflow-hidden rounded-xl border border-border bg-card/55 transition-[border-color,background-color] duration-200 hover:border-[var(--color-accent)] hover:bg-card/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="pointer-events-none absolute top-0 left-0 h-px w-10 bg-[var(--color-accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

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
            <span className="shrink-0 text-xs text-muted-foreground/60 tabular-nums transition-colors duration-200 group-hover:text-[var(--color-accent-hover)]">
              {project.index}
            </span>
            <h4 className="truncate text-base font-medium tracking-tight text-foreground">
              {project.title}
            </h4>
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-colors duration-200 group-hover:text-[var(--color-accent-hover)]" />
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
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onAsk(project.title)
            }}
            className="ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-muted-foreground transition-[border-color,color,transform] duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent-hover)] active:translate-y-px"
          >
            <MessageCircle className="h-3 w-3" />
            Ask
          </button>
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
      <SiteHeader />

      <div className="portfolio-shell">
        <section className="portfolio-hero" aria-labelledby="hero-title">
          <div className="portfolio-hero__copy">
            <p className="portfolio-hero__meta animate-fade-up">
              AI product engineer · Chicago
            </p>
            <h1
              id="hero-title"
              className="portfolio-hero__title animate-fade-up delay-100"
            >
              Drew Sepeczi builds <span>AI products.</span>
            </h1>
            <p className="portfolio-hero__lede animate-fade-up delay-200">
              I turn rough ideas into shipped software—product strategy,
              interfaces, AI systems, infrastructure, and launch execution.
            </p>
            <div className="portfolio-hero__actions animate-fade-up delay-300">
              <a
                href="mailto:drewsepeczi@gmail.com"
                className="portfolio-hero__primary"
              >
                <Mail aria-hidden="true" />
                Email Drew
              </a>
              <a
                href="https://squidagent.app"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-hero__secondary"
              >
                Open Squid Agent
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div
              className="portfolio-hero__outcomes animate-fade-up delay-400"
              aria-label="Primary destinations"
            >
              <a href="#products">
                <span>Selected work</span>
                <span>{FEATURED_PROJECTS.length} featured products</span>
              </a>
              <a
                href="https://github.com/drewsephski"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Source and experiments</span>
                <span>github.com/drewsephski</span>
              </a>
            </div>
          </div>

          <div className="portfolio-hero__proof animate-fade-up delay-200">
            <div className="portfolio-hero__proof-label">
              <span>Ask the portfolio</span>
              <a href="#products" className="inline-flex min-h-11 items-center">
                Browse work ↓
              </a>
            </div>
            <HeroChat />
          </div>
        </section>

        <ProofStrip />

        <Separator className="mb-24 opacity-50 max-sm:mb-16" />

        {/* ── Featured Products ── */}
        <section id="products" className="pb-28 max-sm:pb-16">
          <div className="portfolio-section-head animate-fade-up">
            <div>
              <h2>Selected work</h2>
              <p>
                AI tools, infrastructure, and products designed to survive
                contact with real users.
              </p>
            </div>
            <span className="portfolio-section-head__meta">
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
            <div className="portfolio-section-head animate-fade-up">
              <div>
                <h3>Other builds</h3>
                <p>Experiments, side projects, and shipped apps.</p>
              </div>
              <span className="portfolio-section-head__meta">
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

            <div className="mt-10 max-sm:mt-8">
              <Link
                href="/gallery"
                className="group animate-fade-up flex min-h-20 w-full items-center justify-between gap-4 border-y border-border py-5 text-left transition-colors duration-200 hover:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                style={{
                  animationDelay: `${ARCHIVE_PROJECTS.length * 20 + 320}ms`,
                }}
                aria-label="View all projects in the gallery"
              >
                <span>
                  <span className="block text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    View the full project archive
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    Screenshots and links for every shipped build
                  </span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-[var(--color-accent)] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        <Separator className="mb-28 opacity-50 max-sm:mb-16" />

        {/* ── About ── */}
        <section id="about" className="pb-28 max-sm:pb-16">
          <div className="portfolio-section-head animate-fade-up">
            <div>
              <h2>How I work</h2>
              <p>
                Product judgment, design craft, and engineering execution in one
                loop.
              </p>
            </div>
          </div>

          <div className="grid gap-10 border-t border-border pt-8 md:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] md:gap-16">
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
                My work sits between founder, engineer, and product designer — I
                care about shipping real tools, not polished mockups.
              </p>
            </div>

            <div className="animate-fade-up delay-200">
              <p className="mb-4 text-sm font-medium text-foreground">
                Core competencies
              </p>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                {[
                  "AI System Design",
                  "Full-Stack Architecture",
                  "Rapid Prototyping",
                  "Performance Optimization",
                  "API Development",
                  "Database Design",
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span className="text-base text-muted-foreground">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Separator className="mb-28 opacity-50 max-sm:mb-16" />

        {/* ── Experience ── */}
        <section id="experience" className="pb-28 max-sm:pb-16">
          <div className="portfolio-section-head animate-fade-up">
            <div>
              <h2>Experience</h2>
              <p>
                Agencies, consulting, and founder-led products—from brief to
                production.
              </p>
            </div>
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
        <section id="contact" className="portfolio-contact animate-fade-up">
          <div className="portfolio-contact__copy">
            <h2>Send the messy brief. I&apos;ll help ship it.</h2>
            <p>
              For product work, consulting, or a role where broad execution
              matters, email me directly. If you want to see the product
              I&apos;m focused on now, open Squid Agent.
            </p>
          </div>
          <div className="portfolio-contact__actions">
            <a
              href="mailto:drewsepeczi@gmail.com"
              className="portfolio-hero__primary"
            >
              <Mail aria-hidden="true" />
              Email Drew
            </a>
            <a
              href="https://squidagent.app"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-hero__secondary"
            >
              Open Squid Agent
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <footer className="portfolio-shell portfolio-footer">
        <p className="portfolio-footer__statement">
          Ideas are cheap. Shipped software is the proof.
        </p>
        <div className="portfolio-footer__meta">
          <span>© 2026 Drew Sepeczi</span>
          <div className="portfolio-footer__links">
            <a
              href="https://github.com/drewsephski"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/drewsepeczi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center"
            >
              LinkedIn
            </a>
            <a
              href="mailto:drewsepeczi@gmail.com"
              className="inline-flex min-h-11 items-center px-2"
            >
              Email
            </a>
          </div>
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
