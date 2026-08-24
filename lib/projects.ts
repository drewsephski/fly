export interface ProjectDepth {
  problem: string
  solution: string
  tech: string[]
  challenge: string
}

export interface ProjectPreviewMedia {
  mp4: string
  webm: string
  poster: string
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
  preview: ProjectPreviewMedia
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
  preview: ProjectPreviewMedia
}

const PROJECT_PREVIEW_VERSION = "20260824"

function projectPreview(slug: string): ProjectPreviewMedia {
  const base = `/projects/previews/${slug}-${PROJECT_PREVIEW_VERSION}`

  return {
    mp4: `${base}.mp4`,
    webm: `${base}.webm`,
    poster: `${base}-poster.jpg`,
  }
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
    title: "Vault Zero",
    url: "https://vaultzero.dev/",
    description:
      "Voice receptionist for plumbing, HVAC, roofing, and electrical. Missed and after-hours calls get a handoff.",
    tags: ["Voice AI", "Home Services", "SaaS"],
    status: ["Live", "SaaS"],
    index: "01",
    featured: true,
    image: "/projects/vault-zero-site.png",
    preview: projectPreview("vault-zero"),
    depth: {
      problem:
        "Home-service jobs are lost when the crew is on a call, the office is overflowed, or the phone hits voicemail after hours",
      solution:
        "Custom call-flow, approved routing, call summaries, and a human fallback on the desk.",
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Voice AI",
        "Supabase",
        "Vercel",
      ],
      challenge:
        "Useful intake without diagnosing gear, inventing prices, or skipping the human fallback.",
    },
  },
  {
    title: "Squid Agent",
    url: "https://squidagent.app/",
    description:
      "Turns prompts, screenshots, or live sites into working React prototypes, with evidence on every revision.",
    tags: ["AI Prototyping", "React", "Verification"],
    status: ["Live", "SaaS"],
    index: "02",
    featured: true,
    image: "/projects/squid-agent.png",
    preview: projectPreview("squid-agent"),
    depth: {
      problem:
        "Prototypes are easy to demo but hard to defend without revision-specific evidence and portable code",
      solution:
        "Generate from a prompt, screenshot, or URL. Verify each revision. Export the source.",
      tech: ["Next.js", "React", "TypeScript", "AI SDK", "Sandpack", "Vercel"],
      challenge:
        "Generation, repair, verification, history, and source ownership in one visible flow.",
    },
  },
  {
    title: "Trace",
    url: "https://www.trace.builders/",
    description:
      "Local desktop workspace for AI agents, real project files, skills, MCP tools, and review of every approval.",
    tags: ["Desktop App", "AI Agents", "MCP", "Electron"],
    status: ["Live", "Open Source", "Desktop App"],
    index: "03",
    featured: true,
    image: "/projects/trace.png",
    preview: projectPreview("trace"),
    github: {
      username: "drewsephski",
      repo: "trace-ai",
    },
    depth: {
      problem:
        "Agent sessions, workspace context, tools, and approvals are scattered across terminals and vendor-specific apps",
      solution:
        "One local workspace for agent runtimes, files, skills, MCP tools, and human review.",
      tech: ["Electron", "React", "Bun", "MCP", "ACP", "Vitest"],
      challenge:
        "Multi-agent work that stays portable and reviewable on macOS, Windows, and Linux.",
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
    preview: projectPreview("nodebase"),
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
    preview: projectPreview("ragbase"),
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
      "Edge-native scraper API for AI agents. One-command deploy, cleaned HTML, and page output tuned for LLMs.",
    tags: ["Infrastructure", "AI", "Open Source"],
    status: ["Live", "Open Source"],
    index: "06",
    featured: true,
    image: "/projects/squidcrawl.png",
    preview: projectPreview("squidcrawl"),
    depth: {
      problem: "Web scraping for AI agents is slow, expensive, and token-heavy",
      solution:
        "An edge-native scraper with HTML cleaners and page output shaped for LLM intake.",
      tech: ["Cloudflare Workers", "Hono", "oRPC", "Better Auth", "Next.js"],
      challenge:
        "Millisecond V8 parses for most HTML pages, without spinning up a headless browser.",
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
    preview: projectPreview("portfolio-os"),
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
    preview: projectPreview("fight-intel"),
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
    preview: projectPreview("novahub"),
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
    preview: projectPreview("reeldiff"),
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
    preview: projectPreview("promptmarket"),
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
    preview: projectPreview("roast-my-ui"),
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
    preview: projectPreview("phoenix-notebook"),
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
    preview: projectPreview("drews-ai-twin"),
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
    preview: projectPreview("get-cracked"),
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
    preview: projectPreview("shoo"),
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
  "tell me about Vault Zero",
  "tell me about Squid Agent",
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
  "Vault Zero": {
    bullets: [
      "AI receptionist studio for plumbing, HVAC, roofing, and electrical teams",
      "covers missed calls, overflow while the office is busy, and after-hours intake with a human fallback",
      "custom call-flow, approved routing rules, and call summaries in a client dashboard. Usage included, no per-minute overages",
      "voice receptionist from $99/month plus $250 setup; complete front desk from $139/month plus $600 setup with website and web assistant",
      "live demo with Elliot at (847) 792-9623. Identifies as AI, does not book or dispatch real work",
      "will not diagnose technical problems, invent pricing, promise unverified dispatch, or hide that it is virtual",
    ],
    domain: "vaultzero.dev",
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
