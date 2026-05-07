"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GradientTracing } from "@/components/ui/gradient-tracing"
import { ArrowUpRight, ExternalLink, GitBranch, MessageCircle, Eye } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { BlogPostList } from "@/components/blog-post"
import TimelineContent from "@/components/shadcn-studio/blocks/timeline-component-05/timeline-component-05"
import CareerPresentContent from "@/components/shadcn-studio/blocks/timeline-component-05/content/career-present"
import CareerConsultantContent from "@/components/shadcn-studio/blocks/timeline-component-05/content/career-consultant"
import { TalkToDrew } from "@/components/talk-to-drew"
import { HeroChat } from "@/components/hero-chat"
import { AuroraText } from "@/components/ui/aurora-text"
import { QuickLook } from "@/components/quick-look"
import SpinButton from "@/components/ui/spin-button"
import { GoldenButton } from "@/components/ui/golden-button"

const FEATURED_PROJECTS = [
  {
    title: "NodeBase",
    url: "https://nodebasev2.vercel.app/",
    description: "Open-source visual studio for building, running, and sharing AI workflows with a node graph editor.",
    tags: ["Open Source", "AI", "Visual"],
    index: "01",
    featured: true,
    centerpiece: true,
    image: "/projects/nodebase.png",
    depth: {
      problem: "AI workflow tools were either too simple (no-coding) or required deep expertise (full programming)",
      solution: "Visual node-based editor with drag-and-drop AI pipeline building + real-time collaboration",
      tech: ["React Flow", "TypeScript", "Supabase", "Edge Functions"],
      challenge: "Implemented operational transformation for real-time collaboration across complex node graphs",
      architecture: "Client-side node editor + Supabase real-time + Edge Functions for AI execution",
      dataflow: "User creates nodes → Graph state syncs → AI executes at edge → Results stream back"
    }
  },
  {
    title: "NovaHub",
    url: "https://novahub.dev/",
    description: "Make Your Projects Look 10x More Credible. AI-powered analysis, intelligent insights, and seamless data management for your projects.",
    tags: ["AI", "PM", "Insights"],
    index: "03",
    featured: true,
    image: "/projects/novahub.png",
    depth: {
      problem: "Developers struggled to showcase their projects effectively to recruiters and stakeholders",
      solution: "Built AI-powered platform that transforms projects into recruiter-ready portfolios with actionable insights",
      tech: ["React", "Node.js", "OpenAI API", "PostgreSQL", "Vercel"],
      challenge: "Developed custom AI scoring system that evaluates projects and generates compelling summaries hiring managers want to read"
    }
  },
  {
    title: "Fight Intel",
    url: "https://fight.dog/",
    description: "Real-time UFC odds, fighter analytics, and AI-powered predictive insights for MMA events.",
    tags: ["AI", "Sports", "Analytics"],
    index: "02",
    featured: true,
    image: "/projects/ufc.png",
    depth: {
      problem: "MMA betting data was fragmented across bookmakers with no unified analytics",
      solution: "Built real-time odds aggregation with ML prediction engine",
      tech: ["Next.js", "Python", "PostgreSQL", "Redis", "WebSocket"],
      challenge: "Kept odds sync under 200ms across 3 sources using WebSockets + Redis caching"
    }
  },

  {
    title: "ReelDiff",
    url: "https://reeldiff.vercel.app/",
    description: "Transforms code changes into visual stories by generating shareable videos from GitHub PRs.",
    tags: ["Dev Tools", "Video", "GitHub"],
    index: "04",
    featured: true,
    image: "/projects/reeldiff.png",
    depth: {
      problem: "Code changes were impossible to share with non-technical stakeholders",
      solution: "Automated video generation from git diffs using AI narration",
      tech: ["GitHub API", "FFmpeg", "OpenAI", "Next.js"],
      challenge: "Built git parser that extracts semantic changes and generates natural language descriptions"
    }
  }
]

const postsArray = [
  {
    title: "Agentic AI in Production: Patterns That Actually Work",
    description: "After two years of real-world deployments, the patterns for reliable agentic systems have crystallized. Bounded autonomy, multi-agent governance, and hierarchical memory are the new standard.",
    author: "Drew Sepeczi",
    date: "May 7, 2026",
    readTime: "7 min read",
    tags: ["AI Agents", "Architecture", "Production"],
    content: "",
    slug: "agentic-ai-production-patterns-2026"
  },
  {
    title: "Building AI-First Frontend Architectures in 2026",
    description: "The React Compiler is out, AI agents scaffold entire features autonomously, and Edge AI personalizes bundle delivery. Here's what the modern frontend stack actually looks like.",
    author: "Drew Sepeczi",
    date: "May 5, 2026",
    readTime: "6 min read",
    tags: ["React", "AI", "Architecture"],
    content: "",
    slug: "building-ai-first-frontend-architectures"
  },
  {
    title: "The Internet of Agents: MCP, A2A, and What Comes Next",
    description: "Open protocols are turning isolated AI automations into a global network. MCP, A2A, and ACP are the early infrastructure of a world where agents discover, transact, and coordinate across boundaries.",
    author: "Drew Sepeczi",
    date: "May 3, 2026",
    readTime: "8 min read",
    tags: ["MCP", "AI Agents", "Protocols"],
    content: "",
    slug: "internet-of-agents-mcp-a2a-protocols"
  }
]

const ARCHIVE_PROJECTS = [
  {
    title: "PromptMarket",
    url: "https://promptmarket.sh/",
    description: "A public collection of precision-engineered system prompts for LLMs.",
    tags: ["AI", "Prompts", "Tools"],
    index: "05",
    featured: false,
    image: "/projects/promptsh.png"
  },
  {
    title: "PixelMint",
    url: "https://pixel-mint-sigma.vercel.app/",
    description: "AI creative studio for generating images and videos — built for creators making viral content.",
    tags: ["AI", "Creative", "Generative"],
    index: "06",
    featured: false
  },
  {
    title: "Roast My UI",
    url: "https://roastmyui.me/",
    description: "Get your UI savagely critiqued by a brutally honest Gen Z AI.",
    tags: ["AI", "Design", "Fun"],
    index: "07",
    featured: false,
    image: "/projects/roastmyui.png"
  },
  {
    title: "Phoenix Notebook",
    url: "https://phoenixnotebook.netlify.app/",
    description: "AI research assistant that aggregates sources, generates summaries, and creates presentations.",
    tags: ["AI", "Research", "Productivity"],
    index: "08",
    featured: false
  },
  {
    title: "Drew's AI Twin",
    url: "https://drewchats.vercel.app/",
    description: "Personal AI twin that answers questions and shares information about Drew and his work.",
    tags: ["AI", "Personal"],
    index: "09",
    featured: false
  },
  {
    title: "Get Cracked",
    url: "https://getcracked.lol/",
    description: "AI-powered SaaS template with pre-built features for rapid development.",
    tags: ["AI", "SaaS", "Template"],
    index: "10",
    featured: false,
    image: "/projects/getcracked.png"
  }
]

export default function Page() {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatPrompt, setChatPrompt] = useState<string | undefined>(undefined)
  const [quickLook, setQuickLook] = useState<{ src: string; alt: string } | null>(null)

  return (
    <main
      className="relative z-10 min-h-svh text-foreground"
      style={{ fontFamily: "var(--font-body)" }}
    >

      {/* ── Grain overlay (subtle, complements dot-matrix) ── */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span
            className="text-sm font-semibold tracking-[0.15em] text-foreground"
            style={{ fontFamily: "var(--font-body)" }}
          >
            DS
          </span>
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <a
              href="#work"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Work
            </a>
            <a
              href="#journey"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Journey
            </a>
            <a
              href="#about"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              About
            </a>
            <Link
              href="/gallery"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Gallery
            </Link>
            <a
              href="mailto:drew@example.com"
              className="ml-2 inline-flex items-center gap-1.5 rounded-sm border border-border bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-all hover:opacity-80"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6">

        {/* ── Hero ── */}
        <section className="relative pb-24 pt-28 lg:grid lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Left column — hero content */}
          <div className="relative">
            {/* Decorative rule */}
            <div className="absolute left-0 top-20 h-px w-12 bg-border" />

            {/* Gradient tracing — responsive on all sizes */}
            <div className="absolute right-4 top-4 flex flex-col items-center gap-6 md:right-20 md:top-48 lg:right-8 lg:top-12 opacity-70 md:opacity-100">
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
                className="mb-5 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                Full-Stack Engineer · Builder
              </p>
            </div>

            <div className="animate-fade-up delay-100">
              <h1
                className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-[5.5rem]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <AuroraText
                  className="font-semibold"
                  colors={["oklch(0.96 0.006 75)", "oklch(0.78 0.10 70)", "oklch(0.68 0.12 70)", "oklch(0.85 0.06 70)"]}
                  speed={0.8}
                >
                  Drew<br />
                  Sepeczi
                </AuroraText>
              </h1>
            </div>

            <div className="animate-fade-up delay-200">
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
                I build AI-native products and developer tools with production-ready architecture.
                <span className="text-foreground"> <br />Fast shipping, scalable systems, real impact.</span>
              </p>
            </div>

            <div className="animate-fade-up delay-300 mt-10">
              <SpinButton onClick={() => setChatOpen(true)} onClose={() => setChatOpen(false)} isOpen={chatOpen} />
            </div>
          </div>

          {/* Right column — inline chat (lg only) */}
          <div className="hidden lg:block animate-fade-up delay-200">
            <div className="lg:pt-12">
              <div className="flex items-center gap-5 mb-4">
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
                  href="https://portfoliosys.vercel.app/"
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

        <Separator className="mb-24 opacity-50" />

        {/* ── Work ── */}
        <section id="work" className="pb-28">
          <div className="animate-fade-up mb-14 flex items-end justify-between">
            <div>
              <p
                className="mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/50"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                Selected Projects
              </p>
              <h2
                className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                Featured Work
              </h2>
            </div>
            <span
              className="text-[10px] text-muted-foreground/30 font-mono"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              {FEATURED_PROJECTS.length} projects
            </span>
          </div>

          <div className="space-y-6">
            {FEATURED_PROJECTS.map((project, i) => (
              <div
                key={project.url}
                className={cn(
                  "group relative rounded-xl border animate-fade-up transition-colors",
                  project.centerpiece
                    ? "border-foreground/20 bg-card/85"
                    : "border-border/40 bg-card/50 hover:bg-muted/30"
                )}
                style={{ animationDelay: `${i * 35 + 80}ms` }}
              >
                {/* Centerpiece accent line */}
                {project.centerpiece && (
                  <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl bg-gradient-to-b from-foreground/40 via-foreground/20 to-transparent" />
                )}

                <div className="p-6 md:p-8">
                  {/* Header row */}
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="shrink-0 text-[10px] font-mono text-muted-foreground/30 tabular-nums"
                        style={{ fontFamily: "var(--font-mono, monospace)" }}
                      >
                        {project.index}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3 className={cn(
                            "font-semibold text-foreground leading-tight",
                            project.centerpiece ? "text-xl" : "text-lg"
                          )}>
                            {project.title}
                          </h3>
                          {project.centerpiece && (
                            <Badge className="text-[10px] bg-foreground/10 border-foreground/20 text-foreground/80 shrink-0">
                              Featured
                            </Badge>
                          )}
                          <div className="flex flex-wrap gap-1 ml-1">
                            {project.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="border border-border/30 text-[10px] font-normal text-muted-foreground/70"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <GoldenButton
                        onClick={() => {
                          setChatPrompt(`Tell me about ${project.title}`);
                          setChatOpen(true);
                        }}
                      >
                        <MessageCircle className="h-3 w-3" />
                        Ask about it
                      </GoldenButton>
                      {'image' in project && project.image && (
                        <button
                          onClick={() => setQuickLook({ src: project.image as string, alt: project.title })}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border/40 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-border/80 hover:bg-muted/30 hover:text-foreground"
                        >
                          <Eye className="h-3 w-3" />
                          Quick look
                        </button>
                      )}
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-border/40 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-border/80 hover:bg-muted/30 hover:text-foreground"
                      >
                        View
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Depth spec sheet */}
                  <div className={cn(
                    "rounded-lg border border-border/30 bg-background/60 p-4",
                    project.centerpiece && "border-border/50 bg-muted/30"
                  )}>
                    <div className="grid gap-y-2.5 gap-x-6 sm:grid-cols-2 mb-4">
                      <div className="space-y-0.5">
                        <p
                          className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted-foreground/40"
                          style={{ fontFamily: "var(--font-mono, monospace)" }}
                        >
                          Problem
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground/70">
                          {project.depth.problem}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <p
                          className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted-foreground/40"
                          style={{ fontFamily: "var(--font-mono, monospace)" }}
                        >
                          Solution
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground/70">
                          {project.depth.solution}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        <p
                          className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted-foreground/40"
                          style={{ fontFamily: "var(--font-mono, monospace)" }}
                        >
                          Challenge
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground/70">
                          {project.depth.challenge}
                        </p>
                      </div>
                      {project.depth.architecture && (
                        <div className="space-y-0.5">
                          <p
                            className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted-foreground/40"
                            style={{ fontFamily: "var(--font-mono, monospace)" }}
                          >
                            Architecture
                          </p>
                          <p className="text-xs leading-relaxed text-muted-foreground/70">
                            {project.depth.architecture}
                          </p>
                        </div>
                      )}
                    </div>


                    {/* Footer: tech + optional data flow */}
                    <div className="border-t border-border/30 pt-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.depth.tech.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded border border-border/40 bg-background px-2 py-0.5 text-[10px] text-muted-foreground/70 font-mono"
                            style={{ fontFamily: "var(--font-mono, monospace)" }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.depth.dataflow && (
                        <p className="text-[10px] text-muted-foreground/40 font-mono hidden lg:block" style={{ fontFamily: "var(--font-mono, monospace)" }}>
                          {project.depth.dataflow}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Centerpiece extra CTA */}
                  {project.centerpiece && (
                    <div className="mt-4 flex items-center gap-4">
                      <a
                        href="https://github.com/drewsephski/nodebase"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow cursor-pointer border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:[filter:blur(calc(0.8*1rem))] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] hover:saturate-150 hover:contrast-110 h-10 px-4 py-2 inline-flex"
                      >
                        <div className="flex items-center">
                          <svg className="size-4" viewBox="0 0 438.549 438.549">
                            <path
                              d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                              fill="#fff"
                            />
                          </svg>
                          <span className="ml-1 text-white lg:inline p-1">Star on GitHub</span>
                        </div>
                        <div className="ml-2 flex items-center gap-1 text-sm md:flex">
                          <svg
                            className="size-4 text-gray-500 transition-all duration-200 group-hover:text-yellow-300"
                            data-slot="icon"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clip-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              fill-rule="evenodd"
                            />
                          </svg>
                          <span className="inline-block tabular-nums tracking-wider font-bold text-base text-black dark:text-white">
                            22
                          </span>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Archive section */}
          <div className="mt-20">
            <div className="animate-fade-up mb-8 flex items-end justify-between">
              <h3
                className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground/60"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                Archive
              </h3>
              <span
                className="text-[10px] text-muted-foreground/30 font-mono"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                {ARCHIVE_PROJECTS.length} more
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {ARCHIVE_PROJECTS.map((project, i) => (
                <Link
                  key={project.url}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2.5 rounded-lg border border-border/30 px-4 py-3.5 transition-all hover:border-border/60 hover:bg-muted/20 animate-fade-up"
                  style={{ animationDelay: `${i * 20 + 300}ms` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="shrink-0 text-[10px] text-muted-foreground/30 font-mono tabular-nums" style={{ fontFamily: "var(--font-mono, monospace)" }}>
                        {project.index}
                      </span>
                      <h4 className="text-sm font-medium text-foreground truncate">{project.title}</h4>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/30 transition-all group-hover:text-muted-foreground group-hover:-translate-y-px" />
                  </div>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed line-clamp-2 pl-[1.625rem]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pl-[1.625rem]">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="border border-border/30 text-[10px] font-normal text-muted-foreground/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {'image' in project && project.image && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setQuickLook({ src: project.image as string, alt: project.title });
                        }}
                        className="ml-auto inline-flex items-center gap-1 rounded-md border border-border/40 px-2 py-0.5 text-[10px] text-muted-foreground transition-all hover:border-border/80 hover:bg-muted/30 hover:text-foreground"
                      >
                        <Eye className="h-2.5 w-2.5" />
                        Quick look
                      </button>
                    )}
                    <GoldenButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setChatPrompt(`Tell me about ${project.title}`);
                        setChatOpen(true);
                      }}
                      className="h-[2.5em] text-[10px] px-2"
                    >
                      <MessageCircle className="h-2.5 w-2.5" />
                      Ask about it
                    </GoldenButton>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Separator className="mb-28 opacity-50" />

        {/* ── About ── */}
        <section id="about" className="pb-28">
          <div className="grid gap-20 md:grid-cols-[200px_1fr]">

            <div className="animate-fade-up">
              <h2
                className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                About
              </h2>
            </div>

            <div className="animate-fade-up delay-100 space-y-6">
              <p className="text-base leading-relaxed text-muted-foreground">
                I&apos;m Drew, a full-stack engineer who ships fast. I specialize in
                AI-native products with production-ready architecture, not just demos.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                My approach: <span className="text-foreground">rapid MVP production</span> without sacrificing quality,
                <span className="text-foreground"> scalable multi-tenant systems</span> that handle real users,
                and <span className="text-foreground"> AI integration</span> that goes beyond API wrapping.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                When I&apos;m not building, I&apos;m watching UFC and probably building
                something UFC-related.
              </p>

              <div className="pt-6 border-t border-border/50">
                <p
                  className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/60"
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
                    "Database Design"
                  ].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                      <span className="text-sm text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Separator className="mb-28 opacity-50" />

        {/* ── Timeline / Journey ── */}
        <section id="journey" className="pb-28">
          <div className="animate-fade-up mb-14">
            <h2
              className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              Journey
            </h2>
          </div>

          <div className="animate-fade-up delay-100">
            <TimelineContent
              entries={[
                {
                  company: 'Phoenix Agency',
                  period: 'June 2025 – Present',
                  content: <CareerPresentContent />
                },
                {
                  company: 'Independent Consultant',
                  period: 'Oct 2025 – Feb 2026',
                  content: <CareerConsultantContent />
                }
              ]}
            />
          </div>
        </section>

        <Separator className="mb-28 opacity-50" />

        <BlogPostList posts={postsArray} />

        {/* ── CTA ── */}
        <section className="animate-fade-up pb-36">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 px-10 py-16 text-center">
            {/* Corner marks */}
            <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-border/60" />
            <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-border/60" />
            <span className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-border/60" />
            <span className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-border/60" />

            <p
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/50"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              Get in touch
            </p>
            <h2
              className="text-4xl font-semibold text-foreground sm:text-5xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Let&apos;s build something.
            </h2>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Have a project in mind? I&apos;m always open to interesting collaborations.
            </p>
            <a
              href="mailto:drew@example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-sm border border-foreground bg-foreground px-7 py-3 text-sm font-medium text-background transition-all hover:bg-background hover:text-foreground"
            >
              Send an email
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <a href="https://github.com/drewsephski" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                GitHub
              </a>
              <span>•</span>
              <a href="https://linkedin.com/in/drewsepeczi" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                LinkedIn
              </a>
              <span>•</span>
              <a href="https://instagram.com/drew.sepeczi" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span
            className="text-[11px] text-muted-foreground/50"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            © 2026 Drew Sepeczi
          </span>
          <div className="group relative flex items-center">
            <a
              href="https://github.com/drewsephski"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/40 transition-colors duration-200 hover:text-muted-foreground/80"
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
              className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 scale-0 rounded px-2 py-1 text-[10px] text-muted-foreground/60 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              github
            </span>
          </div>
          <a
            href="https://portfoliosys.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50 transition-colors hover:text-foreground"
            style={{ fontFamily: "var(--font-mono, monospace)" }}
          >
            portfolio
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </footer>

      <TalkToDrew open={chatOpen} setOpen={setChatOpen} autoSend={chatPrompt} />

      <QuickLook
        src={quickLook?.src ?? null}
        alt={quickLook?.alt ?? ''}
        onClose={() => setQuickLook(null)}
      />

    </main>
  )
}