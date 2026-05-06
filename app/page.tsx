"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GradientTracing } from "@/components/ui/gradient-tracing"
import { ArrowUpRight, GitBranch, ExternalLink } from "lucide-react"
import Link from "next/link"

const FEATURED_PROJECTS = [
  {
    title: "Fight Intel",
    url: "https://fight.dog/",
    description: "Real-time UFC odds, fighter analytics, and AI-powered predictive insights for MMA events.",
    tags: ["AI", "Sports", "Analytics"],
    index: "01",
    featured: true,
    depth: {
      problem: "MMA betting lacked accessible data and predictive analytics",
      solution: "Built real-time odds aggregation with ML prediction engine",
      tech: ["Next.js", "Python", "PostgreSQL", "Redis", "WebSocket"],
      challenge: "Processing live odds from multiple bookmakers with low latency"
    }
  },
  {
    title: "NodeBase",
    url: "https://nodebasev2.vercel.app/",
    description: "Open-source visual studio for building, running, and sharing AI workflows with a node graph editor.",
    tags: ["Open Source", "AI", "Visual"],
    index: "02",
    featured: true,
    depth: {
      problem: "AI workflow tools were either too simple or required coding expertise",
      solution: "Visual node-based editor with drag-and-drop AI pipeline building",
      tech: ["React Flow", "TypeScript", "Supabase", "Edge Functions"],
      challenge: "Real-time collaboration and state synchronization across complex graphs"
    }
  },
  {
    title: "ReelDiff",
    url: "https://reeldiff.vercel.app/",
    description: "Transforms code changes into visual stories by generating shareable videos from GitHub PRs.",
    tags: ["Dev Tools", "Video", "GitHub"],
    index: "03",
    featured: true,
    depth: {
      problem: "Code changes were hard to share with non-technical stakeholders",
      solution: "Automated video generation from git diffs using AI narration",
      tech: ["GitHub API", "FFmpeg", "OpenAI", "Next.js"],
      challenge: "Synthesizing natural language descriptions from code changes"
    }
  }
]

const ARCHIVE_PROJECTS = [
  {
    title: "NovaHub",
    url: "https://novahub.dev/",
    description: "AI-powered analysis and intelligent insights platform for project management.",
    tags: ["AI", "PM", "Insights"],
    index: "04",
    featured: false
  },
  {
    title: "PromptMarket",
    url: "https://promptmarket.sh/",
    description: "A public collection of precision-engineered system prompts for LLMs.",
    tags: ["AI", "Prompts", "Tools"],
    index: "05",
    featured: false
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
    featured: false
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
    featured: false
  }
]


export default function Page() {
  return (
    <main
      className="min-h-svh bg-background text-foreground"
      style={{ fontFamily: "var(--font-body)" }}
    >

      {/* ── Grain overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
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
              href="#about"
              className="rounded-sm px-3 py-1.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              About
            </a>
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
        <section className="relative pb-24 pt-28">
          {/* Decorative rule */}
          <div className="absolute left-0 top-28 h-px w-12 bg-border" />

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
              className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-[5.5rem]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Drew<br />
              <span className="text-muted-foreground/50">Sepeczi</span>
            </h1>
          </div>

          <div className="animate-fade-up delay-200">
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              I build AI-native products and developer tools with production-ready architecture.
              <span className="text-foreground"> Fast shipping, scalable systems, real impact.</span>
            </p>
          </div>

          <div className="animate-fade-up delay-300 mt-10 flex items-center gap-5">
            <a
              href="https://github.com/drewsepeczi"
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

          {/* Floating project count */}
          <div className="absolute right-20 top-48 hidden flex-col items-center gap-6 md:flex">
            <GradientTracing
              width={240}
              height={240}
              path="M120,0 L90,90 L150,90 L60,240 L120,120 L60,120 L120,0"
              gradientColors={["#2EB9DF", "#2EB9DF", "#1ba4ff"]}
              strokeWidth={2}
              animationDuration={2}
            />
          </div>
        </section>

        <Separator className="mb-24 opacity-50" />

        {/* ── Work ── */}
        <section id="work" className="pb-28">
          <div className="animate-fade-up mb-14">
            <h2
              className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
              style={{ fontFamily: "var(--font-mono, monospace)" }}
            >
              Featured Work
            </h2>
          </div>

          <div className="divide-y divide-border/50">
            {FEATURED_PROJECTS.map((project, i) => (
              <div key={project.url} className="group relative py-8 animate-fade-up" style={{ animationDelay: `${i * 35 + 80}ms` }}>
                <div className="grid gap-8 md:grid-cols-[1fr_200px]">
                  {/* Main content */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span
                            className="text-[10px] text-muted-foreground/40 font-mono"
                          >
                            {project.index}
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground max-w-lg">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Depth section */}
                    <div className="space-y-3 pl-6">
                      <div className="text-xs space-y-1">
                        <p className="text-muted-foreground/60">
                          <span className="font-medium text-foreground">Problem:</span> {project.depth.problem}
                        </p>
                        <p className="text-muted-foreground/60">
                          <span className="font-medium text-foreground">Solution:</span> {project.depth.solution}
                        </p>
                        <p className="text-muted-foreground/60">
                          <span className="font-medium text-foreground">Challenge:</span> {project.depth.challenge}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.depth.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-[10px] border-border/40">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      View project
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px" />
                    </Link>
                  </div>

                  {/* Tech stack sidebar */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/40 font-mono">
                        Technology
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.depth.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-[10px] border-border/40">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="border border-border/40 text-[10px] font-normal text-muted-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Archive section */}
          <div className="mt-20">
            <div className="animate-fade-up mb-8">
              <h3
                className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground/60"
                style={{ fontFamily: "var(--font-mono, monospace)" }}
              >
                Archive
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {ARCHIVE_PROJECTS.map((project, i) => (
                <Link
                  key={project.url}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-sm border border-border/30 px-4 py-3 transition-all hover:border-border/60 hover:bg-muted/20 animate-fade-up"
                  style={{ animationDelay: `${i * 20 + 300}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground/30 font-mono">
                      {project.index}
                    </span>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{project.title}</h4>
                      <p className="text-xs text-muted-foreground/60 mt-0.5 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 opacity-0 transition-all group-hover:opacity-100" />
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
                I&apos;m Drew — a full-stack engineer who ships fast. I specialize in
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

        {/* ── CTA ── */}
        <section className="animate-fade-up pb-36">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 px-10 py-16 text-center">
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
              <a href="https://github.com/drewsepeczi" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
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

    </main>
  )
}