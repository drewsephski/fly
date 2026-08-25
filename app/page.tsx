"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MessageCircle,
} from "lucide-react"

import { BackToTop } from "@/components/back-to-top"
import { cn } from "@/lib/utils"
import { HeroChat } from "@/components/hero-chat"
import { PracticeAccordion } from "@/components/practice-accordion"
import { ProjectBento } from "@/components/project-bento"
import { ProjectPreviewMedia } from "@/components/project-preview-media"
import { QuickLook } from "@/components/quick-look"
import { TalkToDrew } from "@/components/talk-to-drew"
import { ARCHIVE_PROJECTS, FEATURED_PROJECTS } from "@/lib/projects"

const FLAGSHIP_TITLES = [
  "Vault Zero",
  "Squid Agent",
  "Trace",
  "SquidCrawl",
] as const

const FLAGSHIP_PROJECTS = FLAGSHIP_TITLES.map((title) =>
  FEATURED_PROJECTS.find((project) => project.title === title)
).filter((project): project is (typeof FEATURED_PROJECTS)[number] =>
  Boolean(project)
)

const PROJECT_INDEX = [
  ...FEATURED_PROJECTS.filter(
    (project) =>
      !FLAGSHIP_TITLES.includes(
        project.title as (typeof FLAGSHIP_TITLES)[number]
      )
  ),
  ...ARCHIVE_PROJECTS,
]

const CAPABILITIES = [
  {
    title: "Product strategy and interaction design",
    detail: "Problem framing, user flows, and interface craft before launch.",
  },
  {
    title: "AI systems, agents, and retrieval",
    detail: "Agents, RAG pipelines, and tooling that run in production.",
  },
  {
    title: "Full-stack architecture and data",
    detail: "Next.js apps, APIs, and data models built to ship.",
  },
  {
    title: "Auth, billing, deployment, and recovery",
    detail: "Stripe, auth, CI/CD, and the ops layer that keeps products live.",
  },
] as const

const EXPERIENCE = [
  {
    company: "Vault Zero",
    period: "2026 to present",
    role: "Founder and product engineer",
  },
  {
    company: "PortfolioOS",
    period: "2025 to 2026",
    role: "Founder and product engineer",
  },
  {
    company: "Independent",
    period: "2024 to 2026",
    role: "AI product consultant",
  },
  {
    company: "Phoenix Agency",
    period: "2023 to 2024",
    role: "Full-stack product engineer",
  },
] as const

const WRITING = [
  {
    title: "Agentic AI in Production: Patterns That Actually Work",
    slug: "agentic-ai-production-patterns-2026",
    meta: "7 min · AI agents",
  },
  {
    title: "Building AI-First Frontend Architectures in 2026",
    slug: "building-ai-first-frontend-architectures",
    meta: "6 min · React",
  },
  {
    title: "The Internet of Agents: MCP, A2A, and What Comes Next",
    slug: "internet-of-agents-mcp-a2a-protocols",
    meta: "8 min · Protocols",
  },
] as const

export default function Page() {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatPrompt, setChatPrompt] = useState<string | undefined>()
  const [quickLook, setQuickLook] = useState<{
    media: (typeof FEATURED_PROJECTS)[number]["preview"]
    alt: string
  } | null>(null)

  const askAbout = (title: string) => {
    setChatPrompt(`Tell me about ${title}`)
    setChatOpen(true)
  }

  return (
    <main id="main-content" className="atelier-page">
      <section className="atelier-hero" aria-labelledby="hero-title">
        <div
          className="atelier-hero__status reveal"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <span>AI product engineer</span>
          <span aria-hidden="true">·</span>
          <span>Chicago</span>
        </div>
        <h1
          id="hero-title"
          className="atelier-hero__title reveal"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <span>Useful software,</span>
          <span>under real pressure.</span>
        </h1>
        <div
          className="atelier-hero__foot reveal"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <p>
            Product strategy, interface craft, AI infrastructure, and launch
            execution in one loop.
          </p>
          <a href="#assistant">
            Ask about the work
            <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        id="assistant"
        className="atelier-assistant atelier-shell"
        aria-labelledby="assistant-title"
      >
        <div className="atelier-assistant__intro">
          <div>
            <h2 id="assistant-title">Ask a product question.</h2>
          </div>
          <p>
            The assistant answers from the products, decisions, and process on
            this site.
          </p>
          <div className="atelier-proof" aria-label="Credibility highlights">
            <span>
              <strong>30+</strong> web projects shipped
            </span>
            <span>
              <strong>10+</strong> AI products built
            </span>
            <span>
              <strong>Full-stack</strong> product ownership
            </span>
          </div>
        </div>
        <div className="atelier-assistant__surface">
          <div className="atelier-assistant__topline">
            <span className="atelier-live-dot">Live</span>
            <span>Answers from the work on this site</span>
          </div>
          <HeroChat />
        </div>
      </section>

      <section
        id="products"
        className="atelier-work atelier-shell"
        aria-labelledby="work-title"
      >
        <header className="atelier-section-head">
          <div>
            <h2 id="work-title">Four products in production.</h2>
          </div>
          <p>Each one names the job, the system, and the hard part.</p>
        </header>

        <div className="atelier-case-studies">
          {FLAGSHIP_PROJECTS.map((project, index) => (
            <article
              className={cn(
                "atelier-case",
                index % 2 === 1 && "atelier-case--reverse"
              )}
              key={project.title}
              aria-labelledby={`case-title-${index}`}
            >
              <div className="atelier-case__story">
                <div className="atelier-case__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.status.join(" · ")}</span>
                </div>
                <div>
                  <h3 id={`case-title-${index}`}>{project.title}</h3>
                  <p className="atelier-case__lede">{project.description}</p>
                </div>
                <dl className="atelier-case__details">
                  <div>
                    <dt>What changed</dt>
                    <dd>{project.depth.solution}</dd>
                  </div>
                  <div>
                    <dt>Hard part</dt>
                    <dd>{project.depth.challenge}</dd>
                  </div>
                </dl>
                <div className="atelier-case__actions">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open {project.title}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => askAbout(project.title)}
                    aria-label={`Ask about the ${project.title} build`}
                  >
                    <MessageCircle aria-hidden="true" />
                    Ask about this build
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="atelier-case__visual"
                onClick={() =>
                  setQuickLook({
                    media: project.preview,
                    alt: `${project.title} live-site preview`,
                  })
                }
                aria-label={`Open a larger preview of ${project.title}`}
              >
                <span className="atelier-case__visual-label" aria-hidden="true">
                  Live site tour
                  <ArrowUpRight aria-hidden="true" />
                </span>
                <span className="atelier-case__image-frame">
                  <ProjectPreviewMedia
                    media={project.preview}
                    title={project.title}
                    sizes="(max-width: 832px) 100vw, 62vw"
                    priority={index === 0}
                    className="atelier-case__image"
                  />
                </span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section
        className="atelier-index atelier-shell"
        aria-labelledby="index-title"
      >
        <header className="atelier-section-head atelier-section-head--compact">
          <div>
            <h2 id="index-title">More projects.</h2>
          </div>
          <Link href="/gallery">
            View the full archive
            <ArrowRight aria-hidden="true" />
          </Link>
        </header>

        <ProjectBento projects={PROJECT_INDEX} />
      </section>

      <section
        id="about"
        className="atelier-practice atelier-shell"
        aria-labelledby="practice-title"
      >
        <div className="atelier-practice__statement">
          <h2 id="practice-title">One person across the whole product.</h2>
          <p>
            I work as founder, engineer, and product designer. The goal is
            useful software that survives contact with real users.
          </p>
        </div>
        <PracticeAccordion items={CAPABILITIES} />
      </section>

      <div className="atelier-columns atelier-shell">
        <section id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">Where I’ve worked.</h2>
          <div className="atelier-simple-list">
            {EXPERIENCE.map((item) => (
              <div key={item.company} className="atelier-simple-list__row">
                <div>
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                </div>
                <span>{item.period}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="writing" aria-labelledby="writing-title">
          <h2 id="writing-title">Writing and insights.</h2>
          <div className="atelier-simple-list">
            {WRITING.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="atelier-simple-list__row atelier-simple-list__row--link"
              >
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.meta}</p>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section
        id="contact"
        className="atelier-contact atelier-shell"
        aria-labelledby="contact-title"
      >
        <div>
          <h2 id="contact-title">Send the brief.</h2>
          <p>I’ll help turn it into a product people can use.</p>
        </div>
        <a
          href="mailto:drewsepeczi@gmail.com"
          className="atelier-contact__button"
        >
          <Mail aria-hidden="true" />
          Email Drew
        </a>
      </section>

      <footer className="atelier-footer atelier-shell">
        <p>Shipped software is the proof.</p>
        <p className="atelier-footer__tagline">
          Currently building with AI agents, Next.js, and production-grade
          infrastructure.
        </p>
        <div>
          <span>© 2026 Drew Sepeczi</span>
          <nav aria-label="Social links">
            <a
              href="https://github.com/drewsephski"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/drewsepeczi"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:drewsepeczi@gmail.com">Email</a>
          </nav>
        </div>
      </footer>

      <TalkToDrew open={chatOpen} setOpen={setChatOpen} autoSend={chatPrompt} />
      <BackToTop />
      <QuickLook
        media={quickLook?.media ?? null}
        alt={quickLook?.alt ?? ""}
        onClose={() => setQuickLook(null)}
      />
    </main>
  )
}
