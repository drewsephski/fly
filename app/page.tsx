"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MessageCircle,
} from "lucide-react"

import { BackToTop } from "@/components/back-to-top"
import { HeroChat } from "@/components/hero-chat"
import { ProjectBento } from "@/components/project-bento"
import { QuickLook } from "@/components/quick-look"
import { TalkToDrew } from "@/components/talk-to-drew"
import { ARCHIVE_PROJECTS, FEATURED_PROJECTS } from "@/lib/projects"
import { cn } from "@/lib/utils"

const FLAGSHIP_TITLES = ["Squid Agent", "Trace", "SquidCrawl"] as const

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
  "Product strategy and interaction design",
  "AI systems, agents, and retrieval",
  "Full-stack architecture and data",
  "Auth, billing, deployment, and recovery",
]

const EXPERIENCE = [
  {
    company: "Portfolios.chat",
    period: "2026 — present",
    role: "Founder and product engineer",
  },
  {
    company: "Independent",
    period: "2024 — 2026",
    role: "AI product consultant",
  },
  {
    company: "Phoenix Agency",
    period: "2023 — 2024",
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
    src: string
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
          <span>Drew builds AI products.</span>
          <span>All the way through.</span>
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
            Meet the portfolio
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
            <p className="atelier-kicker">A portfolio you can question</p>
            <h2 id="assistant-title">Skip the scavenger hunt.</h2>
          </div>
          <p>
            Ask about a product, a technical decision, or how I work. The
            assistant answers from the projects on this site.
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
            <span className="atelier-live-dot">Live project dossier</span>
            <span>Ask anything about the work</span>
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
            <h2 id="work-title">Three products, given room to breathe.</h2>
          </div>
          <p>
            The strongest work is more than a thumbnail. Each project below
            shows the problem, the system, and the hard part.
          </p>
        </header>

        <div className="atelier-case-studies">
          {FLAGSHIP_PROJECTS.map((project, index) => (
            <article className="atelier-case" key={project.title}>
              <div className="atelier-case__story">
                <div className="atelier-case__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.status.join(" · ")}</span>
                </div>
                <div>
                  <h3>{project.title}</h3>
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
                  <button type="button" onClick={() => askAbout(project.title)}>
                    <MessageCircle aria-hidden="true" />
                    Ask about this build
                  </button>
                </div>
              </div>

              <button
                type="button"
                className={cn(
                  "atelier-case__visual",
                  project.title === "Squid Agent" &&
                    "atelier-case__visual--light-shot"
                )}
                onClick={() =>
                  setQuickLook({
                    src: project.image,
                    alt: `${project.title} product interface`,
                  })
                }
                aria-label={`Open a larger preview of ${project.title}`}
              >
                <span className="atelier-case__visual-label">
                  Product view
                  <ArrowUpRight aria-hidden="true" />
                </span>
                <span className="atelier-case__image-frame">
                  <Image
                    src={project.image}
                    alt={`${project.title} product interface`}
                    fill
                    sizes="(max-width: 900px) 100vw, 58vw"
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
            <h2 id="index-title">The full bench.</h2>
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
            I work between founder, engineer, and product designer. The goal is
            not a polished mockup—it is useful software that survives contact
            with real users.
          </p>
        </div>
        <ul className="atelier-practice__list">
          {CAPABILITIES.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
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
          <h2 id="writing-title">Notes from the work.</h2>
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
          <p className="atelier-kicker">Start a conversation</p>
          <h2 id="contact-title">Send the messy brief.</h2>
          <p>I’ll help turn it into a product people can actually use.</p>
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
        <p>Ideas are cheap. Shipped software is the proof.</p>
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
        src={quickLook?.src ?? null}
        alt={quickLook?.alt ?? ""}
        onClose={() => setQuickLook(null)}
      />
    </main>
  )
}
