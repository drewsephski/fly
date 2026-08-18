export interface ProjectDepth {
  problem: string
  solution: string
  tech: string[]
  challenge: string
}

export type ProjectStatus =
  | "Live"
  | "Open Source"
  | "In Progress"
  | "SaaS"
  | "Mac App"
  | "Desktop App"
  | "CLI"
  | "Product Hunt"
  | "Client Work"

export interface FeaturedProject {
  title: string
  url: string
  description: string
  tags: string[]
  status: ProjectStatus[]
  index: string
  featured: boolean
  image: string
  depth: ProjectDepth
  github?: {
    username: string
    repo: string
    value?: number
  }
}

export interface ArchiveProject {
  title: string
  url: string
  description: string
  tags: string[]
  status?: ProjectStatus[]
  index: string
  featured: boolean
  image: string
}

export const PROOF_METRICS = [
  { value: "30+", label: "shipped web projects" },
  { value: "10+", label: "AI products built" },
  { value: "Full-stack", label: "AI + infra" },
  { value: "Open source", label: "maintainer" },
  { value: "Product Hunt", label: "launches" },
] as const

export type GalleryDepth = "background" | "mid" | "foreground"

export interface GalleryImage {
  src: string
  alt: string
  depth: GalleryDepth
  url: string
  description: string
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: "Squid Agent",
    url: "https://squidagent.app/",
    description:
      "Verified prototype builder that turns prompts, screenshots, and live sites into working React interfaces with revision-specific evidence and portable source code.",
    tags: ["AI Prototyping", "React", "Verification"],
    status: ["Live", "SaaS"],
    index: "01",
    featured: true,
    image: "/projects/squid-agent.png",
    depth: {
      problem:
        "Prototypes are easy to demo but hard to defend without revision-specific evidence and portable code",
      solution:
        "Turn prompts, screenshots, or URLs into working React prototypes, verify each revision, then export or share the result",
      tech: ["Next.js", "React", "TypeScript", "AI SDK", "Sandpack", "Vercel"],
      challenge:
        "Keeping generation, preview repair, verification, version history, deployment, and source ownership in one visible workflow",
    },
  },
  {
    title: "Trace",
    url: "https://www.trace.builders/",
    description:
      "Local-first desktop workspace for running AI agents, managing real project files, sharing skills and MCP tools, and reviewing every approval.",
    tags: ["Desktop App", "AI Agents", "MCP", "Electron"],
    status: ["Live", "Open Source", "Desktop App"],
    index: "02",
    featured: true,
    image: "/projects/trace.png",
    github: {
      username: "drewsephski",
      repo: "trace-ai",
    },
    depth: {
      problem:
        "Agent sessions, workspace context, tools, and approvals are scattered across terminals and vendor-specific apps",
      solution:
        "One local-first desktop workspace for agent runtimes, files, skills, MCP tools, automations, and review",
      tech: ["Electron", "React", "Bun", "MCP", "ACP", "Vitest"],
      challenge:
        "Keeping powerful multi-agent workflows portable and reviewable across macOS, Windows, and Linux",
    },
  },
  {
    title: "NodeBase",
    url: "https://nodebasev2.vercel.app/",
    description:
      "Visual workflow studio for builders who want to compose, run, and share AI pipelines without locking into a closed platform.",
    tags: ["Open Source", "AI", "Visual Editor"],
    status: ["Live", "Open Source", "SaaS"],
    index: "04",
    featured: true,
    image: "/projects/nodebase.png",
    github: {
      username: "drewsephski",
      repo: "nodebase",
      value: 23,
    },
    depth: {
      problem:
        "Visual AI workflow tools are closed-source or too rigid for sharing",
      solution:
        "Open-source node graph studio to build, run, and share AI workflows",
      tech: ["Next.js", "React Flow", "TypeScript", "AI SDK", "MIT License"],
      challenge:
        "Composable node execution with shareable graphs that stay performant at scale",
    },
  },
  {
    title: "RagBase",
    url: "https://ragbase.dev/",
    description:
      "Private document Q&A for anyone drowning in PDFs — drop a file or URL, get cited answers in-browser with no signup.",
    tags: ["AI", "RAG", "Privacy"],
    status: ["Live", "Open Source"],
    index: "05",
    featured: true,
    image: "/projects/ragbase.png",
    depth: {
      problem: "Reading contracts and reports for one answer wastes hours",
      solution:
        "Browser-local RAG workspace with source citations on every response",
      tech: ["Next.js", "Vector Search", "PDF Parsing", "Local Storage"],
      challenge:
        "Citation-backed answers that stay trustworthy across PDFs, docs, and URLs",
    },
  },

  {
    title: "SquidCrawl",
    url: "https://squidcrawl.dev/",
    description:
      "Edge-native scraper API for AI agents — deploy in one command, 5–10× faster than Firecrawl with LLM-optimized output.",
    tags: ["Infrastructure", "AI", "Open Source"],
    status: ["Live", "Open Source"],
    index: "06",
    featured: true,
    image: "/projects/squidcrawl.png",
    depth: {
      problem: "Web scraping for AI agents is slow, expensive, and token-heavy",
      solution:
        "Edge-native scraper with tuned HTML cleaners and LLM-optimized output",
      tech: ["Cloudflare Workers", "Hono", "oRPC", "Better Auth", "Next.js"],
      challenge:
        "Millisecond parses on V8 without headless browsers for most HTML pages",
    },
  },
  {
    title: "PortfolioOS",
    url: "https://portfolios.chat/",
    description:
      "AI-native portfolio for job seekers and founders — recruiters ask follow-ups and your site answers from resume, GitHub, and LinkedIn.",
    tags: ["AI", "Portfolio", "SaaS"],
    status: ["Live", "SaaS"],
    index: "03",
    featured: true,
    image: "/projects/portfoliosos.png",
    depth: {
      problem:
        "Static portfolios can't respond when recruiters have follow-up questions",
      solution:
        "Multi-source ingestion into a conversational portfolio with edge deploy",
      tech: ["Next.js", "OpenAI", "Vercel", "RAG", "Stripe"],
      challenge:
        "Structuring resume, GitHub, and LinkedIn into a knowledge base that answers accurately",
    },
  },
]

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    title: "Fight Intel",
    url: "https://fight.dog/",
    description:
      "Live UFC analytics for fight fans — odds, fighter stats, and AI predictions in one dashboard.",
    tags: ["AI", "Sports", "Analytics"],
    status: ["Live"],
    index: "07",
    featured: false,
    image: "/projects/ufc.png",
  },
  {
    title: "NovaHub",
    url: "https://novahub.dev/",
    description:
      "Repo-to-portfolio tool for engineers — AI turns GitHub projects into recruiter-ready case studies.",
    tags: ["AI", "PM", "Insights"],
    status: ["Live"],
    index: "08",
    featured: false,
    image: "/projects/novahub.png",
  },
  {
    title: "ReelDiff",
    url: "https://reeldiff.vercel.app/",
    description:
      "PR walkthrough generator for dev teams — turn GitHub diffs into shareable video explainers.",
    tags: ["Dev Tools", "Video", "GitHub"],
    status: ["Live"],
    index: "09",
    featured: false,
    image: "/projects/reeldiff.png",
  },
  {
    title: "PromptMarket",
    url: "https://promptmarket.sh/",
    description:
      "Curated system prompt marketplace for teams shipping with LLMs.",
    tags: ["AI", "Prompts", "Tools"],
    status: ["Live"],
    index: "10",
    featured: false,
    image: "/projects/promptsh.png",
  },
  {
    title: "Roast My UI",
    url: "https://roastmyui.me/",
    description:
      "Design feedback tool with personality — AI roasts your UI and suggests fixes.",
    tags: ["AI", "Design", "Fun"],
    status: ["Live"],
    index: "12",
    featured: false,
    image: "/projects/roastmyui.png",
  },
  {
    title: "Phoenix Notebook",
    url: "https://phoenixnotebook.netlify.app/",
    description:
      "Research workspace for students and analysts — sources, summaries, and slides from one upload.",
    tags: ["AI", "Research", "Productivity"],
    status: ["Live"],
    index: "13",
    featured: false,
    image: "/projects/phoenixnotebook.png",
  },
  {
    title: "Drew's AI Twin",
    url: "https://drewchats.vercel.app/",
    description:
      "Conversational clone of my portfolio — ask about my work, stack, and projects.",
    tags: ["AI", "Personal", "Chatbot"],
    status: ["Live"],
    index: "14",
    featured: false,
    image: "/projects/drewchats.png",
  },
  {
    title: "Get Cracked",
    url: "https://getcracked.lol/",
    description:
      "AI SaaS boilerplate for founders who want auth, billing, and deploy wired on day one.",
    tags: ["AI", "SaaS", "Template"],
    status: ["Live", "Open Source"],
    index: "15",
    featured: false,
    image: "/projects/getcracked.png",
  },
  {
    title: "Shoo",
    url: "https://shooauth.com/",
    description:
      "Hosted authentication infrastructure with sessions, audit logs, and team management built in.",
    tags: ["Auth", "Infrastructure", "SaaS"],
    status: ["In Progress", "SaaS"],
    index: "16",
    featured: false,
    image: "/projects/shoo.png",
  },
]

const GALLERY_DEPTHS: GalleryDepth[] = ["foreground", "mid", "background"]

function projectToGalleryImage(
  project: Pick<
    FeaturedProject | ArchiveProject,
    "title" | "url" | "description" | "image"
  >,
  depth: GalleryDepth
): GalleryImage {
  return {
    src: project.image,
    alt: project.title,
    depth,
    url: project.url,
    description: project.description,
  }
}

/** Featured + recent archive entries for the top of the gallery. */
export function getPriorityGalleryImages(): GalleryImage[] {
  const featured = FEATURED_PROJECTS.map((project, i) =>
    projectToGalleryImage(project, GALLERY_DEPTHS[i % GALLERY_DEPTHS.length]!)
  )

  const recentArchive = ARCHIVE_PROJECTS.slice(0, 4).map((project, i) =>
    projectToGalleryImage(
      project,
      GALLERY_DEPTHS[(i + 1) % GALLERY_DEPTHS.length]!
    )
  )

  return [...featured, ...recentArchive]
}

export const CHAT_SUGGESTED_PROMPTS = [
  "what are you building now?",
  "tell me about Squid Agent",
  "tell me about Trace",
  "should founders learn to code?",
] as const

const FEATURED_PROJECT_CHAT_DETAILS: Record<
  string,
  { bullets: string[]; domain: string }
> = {
  "Squid Agent": {
    bullets: [
      "verified prototype builder that turns prompts, screenshots, and live sites into working React interfaces",
      "optional plan mode for ambiguous ideas before generation starts",
      "verifies each revision with separate source, runtime, and export evidence",
      "supports GitHub publishing, Vercel deployment, sharing, remixing, and portable source export",
    ],
    domain: "squidagent.app",
  },
  Trace: {
    bullets: [
      "local-first desktop workspace for real AI agent work",
      "runs Claude Code, Codex, OpenCode, Gemini, Qwen Code, Hermes Agent, Cursor Agent, and compatible ACP runtimes",
      "keeps project files, skills, MCP tools, automations, and approval-gated actions in one visible workspace",
      "open source and available for macOS, Windows, and Linux",
    ],
    domain: "trace.builders",
  },
  NodeBase: {
    bullets: [
      "open-source visual studio for AI workflows",
      "node graph editor to build, run, and share workflows",
      "composable execution with shareable graphs",
      "23 GitHub stars",
    ],
    domain: "nodebasev2.vercel.app",
  },
  PortfolioOS: {
    bullets: [
      "AI-native portfolio platform",
      "imports resume, GitHub, and LinkedIn into a conversational site",
      "visitors ask questions and get answers about your experience in real time",
      "SEO-optimized with custom domain support",
    ],
    domain: "portfolios.chat",
  },
  RagBase: {
    bullets: [
      "instant document Q&A with cited answers",
      "upload PDFs, Word docs, or paste URLs — no signup",
      "browser-local private workspace, never used for training",
      "industry templates for contracts, research, compliance, and more",
    ],
    domain: "ragbase.dev",
  },
  SquidCrawl: {
    bullets: [
      "free open-source agentic web scraping toolkit",
      "deploy a fullstack AI scraper API with npx create-squidcrawl",
      "5-10x faster than Firecrawl on edge Workers with LLM-optimized output",
      "includes Hono/oRPC backend, Better Auth, and Next.js playground",
    ],
    domain: "squidcrawl.dev",
  },
}

export function formatFeaturedProjectsForPrompt(): string {
  return FEATURED_PROJECTS.map((project) => {
    const details = FEATURED_PROJECT_CHAT_DETAILS[project.title]
    if (!details) return ""

    const lines = details.bullets.map((line) => `- ${line}`).join("\n")
    return `${project.title}\n${lines}\n- ${details.domain}`
  }).join("\n\n")
}

export function formatArchiveProjectsForPrompt(): string {
  return ARCHIVE_PROJECTS.map(
    (project) => `${project.title} - ${project.url} - ${project.description}`
  ).join("\n")
}
