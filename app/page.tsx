"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, GitBranch, ExternalLink } from "lucide-react"
import Link from "next/link"
import { title } from "node:process"

const PROJECTS = [
    {
    title: "Fight Intel",
    url: "https://fight.dog/",
    description: "Real-time UFC odds, fighter analytics, and AI-powered predictive insights for MMA events.",
    tags: ["AI", "Sports", "Analytics"],
  },
    {
    title: "NodeBase",
    url: "https://nodebasev2.vercel.app/",
    description: "Open-source visual studio for building, running, and sharing AI workflows with a node graph editor.",
    tags: ["Open Source", "AI", "Visual"],
  },
    {
    title: "NovaHub",
    url: "https://novahub.dev/",
    description: "AI-powered analysis and intelligent insights platform for project management.",
    tags: ["AI", "PM", "Insights"],
  },
    {
    title: "PromptMarket",
    url: "https://promptmarket.sh/",
    description: "A public collection of precision-engineered system prompts for LLMs.",
    tags: ["AI", "Prompts", "Tools"],
  },

  {
    title: "ReelDiff",
    url: "https://reeldiff.vercel.app/",
    description: "Transforms code changes into visual stories by generating shareable videos from GitHub PRs.",
    tags: ["Dev Tools", "Video", "GitHub"],
  },
    {
    title: "PixelMint",
    url: "https://pixel-mint-sigma.vercel.app/",
    description: "AI creative studio for generating images and videos — built for creators making viral content.",
    tags: ["AI", "Creative", "Generative"],
  },
  {
    title: "Roast My UI",
    url: "https://roastmyui.me/",
    description: "Get your UI savagely critiqued by a brutally honest Gen Z AI.",
    tags: ["AI", "Design", "Fun"],
  },
  {
    title: "Phoenix Notebook",
    url: "https://phoenixnotebook.netlify.app/",
    description: "AI research assistant that aggregates sources, generates summaries, and creates presentations.",
    tags: ["AI", "Research", "Productivity"],
  },

  {
    title: "Drew's AI Twin",
    url: "https://drewchats.vercel.app/",
    description: "Personal AI twin that answers questions and shares information about Drew and his work.",
    tags: ["AI", "Personal"],
  },

  {
    title: "Get Cracked",
    url: "https://getcracked.lol/",
    description: "AI-powered SaaS template with pre-built features for rapid development.",
    tags: ["AI", "SaaS", "Template"],
  }
]

const SKILLS = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "AI Integration", "Supabase", "Postgres", "Stripe",
  "Clerk Auth", "Node.js", "API Design", "Vercel",
]

export default function Page() {
  return (
    <main className="min-h-svh" style={{ fontFamily: "var(--font-body)" }}>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span
            className="text-sm font-medium tracking-wide text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            DS
          </span>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a
              href="https://instagram.com/drew.sepeczi"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border px-3 py-1 text-foreground transition-colors hover:bg-muted"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6">

        {/* ── Hero ── */}
        <section className="pb-20 pt-24">
          <div className="animate-fade-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Full-Stack Engineer · Builder
            </p>
          </div>
          <div className="animate-fade-up delay-100">
            <h1
              className="max-w-3xl text-5xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Drew Sepeczi
            </h1>
          </div>
          <div className="animate-fade-up delay-200">
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Systems architect and full-stack engineer. I build AI-powered products, SaaS platforms, and developer tools — fast.
            </p>
          </div>
          <div className="animate-fade-up delay-300 mt-8 flex items-center gap-4">
            <a
              href="https://github.com/drewsepeczi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitBranch className="h-4 w-4" />
              GitHub
            </a>
            <span className="text-border">·</span>
            <a
              href="https://drewsportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Portfolio
            </a>
          </div>
        </section>

        <Separator className="mb-20" />

        {/* ── Work ── */}
        <section id="work" className="pb-24">
          <div className="animate-fade-up mb-12 flex items-baseline justify-between">
            <h2
              className="text-3xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Selected Work
            </h2>
            <span className="text-sm text-muted-foreground">{PROJECTS.length} projects</span>
          </div>

          <div className="grid gap-px border border-border bg-border">
            {PROJECTS.map((project, i) => (
              <Link
                key={project.url}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col gap-3 bg-background p-6 transition-colors hover:bg-muted sm:flex-row sm:items-start sm:justify-between animate-fade-up`}
                style={{ animationDelay: `${i * 40 + 100}ms` }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground transition-colors group-hover:text-foreground">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-1.5 sm:ml-8 sm:justify-end">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="mb-24" />

        {/* ── About ── */}
        <section id="about" className="pb-24">
          <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
            <div className="animate-fade-up">
              <h2
                className="text-3xl font-semibold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                About
              </h2>
            </div>
            <div className="animate-fade-up delay-100 space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                I&apos;m Drew — a full-stack engineer who ships fast. I specialize in scalable multi-tenant architectures, rapid MVP production, and AI-powered applications.
              </p>
              <p>
                My work spans SaaS boilerplates, AI tooling, developer platforms, and creative experiments. I care deeply about clean interfaces, well-structured systems, and products that actually get used.
              </p>
              <p>
                When I&apos;m not building, I&apos;m watching UFC and probably building something UFC-related.
              </p>
              <div className="pt-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <Badge key={skill} variant="outline" className="font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="mb-24" />

        {/* ── Contact CTA ── */}
        <section className="animate-fade-up pb-32 text-center">
          <h2
            className="text-4xl font-semibold text-foreground sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground">
            Have a project in mind? I&apos;m always open to interesting collaborations.
          </p>
          <a
            href="https://instagram.com/drew.sepeczi"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>

      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>© 2026 Drew Sepeczi</span>
          <a
            href="https://drewsepeczi.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors hover:text-foreground"
          >
            portfolio
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </footer>

    </main>
  )
}
