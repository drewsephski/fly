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
    title: "NodeBase",
    url: "https://nodebasev2.vercel.app/",
    description:
      "Visual workflow studio for builders who want to compose, run, and share AI pipelines without locking into a closed platform.",
    tags: ["Open Source", "AI", "Visual Editor"],
    status: ["Live", "Open Source", "SaaS"],
    index: "01",
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
    title: "PortfolioOS",
    url: "https://portfolios.chat/",
    description:
      "AI-native portfolio for job seekers and founders — recruiters ask follow-ups and your site answers from resume, GitHub, and LinkedIn.",
    tags: ["AI", "Portfolio", "SaaS"],
    status: ["Live", "SaaS"],
    index: "02",
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
  {
    title: "RagBase",
    url: "https://ragbase.dev/",
    description:
      "Private document Q&A for anyone drowning in PDFs — drop a file or URL, get cited answers in-browser with no signup.",
    tags: ["AI", "RAG", "Privacy"],
    status: ["Live", "Open Source"],
    index: "03",
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
    title: "Trace",
    url: "https://trace.builders/",
    description:
      "AI screen recorder for founders who need polished launch videos, GIFs, and product demos without editing complexity.",
    tags: ["Mac App", "AI Video", "Launch Assets", "Electron"],
    status: ["Live", "Open Source", "Mac App"],
    index: "04",
    featured: true,
    image: "/projects/trace.png",
    depth: {
      problem: "Pro screen recorders cost $29/month and lock you to macOS",
      solution:
        "Cross-platform recorder with on-device AI zoom, captions, and cursor effects",
      tech: ["Electron", "Rust", "Local AI", "FFmpeg", "MIT License"],
      challenge:
        "Auto-zoom and caption pipelines that run fully on-device with zero uploads",
    },
  },
  {
    title: "Squido",
    url: "https://squidagent.app/",
    description:
      "Terminal coding agent for developers who live in the shell — read, bash, edit, and write across messy real codebases.",
    tags: ["CLI", "AI Agents", "Open Source"],
    status: ["Live", "Open Source", "CLI"],
    index: "05",
    featured: true,
    image: "/projects/squido.png",
    depth: {
      problem: "IDE agents pull you out of the shell where real work happens",
      solution: "Terminal-native agent with five tools and 19+ model providers",
      tech: ["TypeScript", "CLI", "Anthropic", "OpenRouter", "MIT License"],
      challenge:
        "Reliable read/bash/edit/write loop across messy real-world codebases",
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
    title: "PixelMint",
    url: "https://pixel-mint-sigma.vercel.app/",
    description:
      "Generative studio for creators — AI image and video generation in one workspace.",
    tags: ["Image/Video", "Creative", "Generative"],
    status: ["Live"],
    index: "11",
    featured: false,
    image: "/projects/pixelmint.png",
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
  "tell me about PortfolioOS",
  "tell me about Squido",
  "should founders learn to code?",
] as const

const FEATURED_PROJECT_CHAT_DETAILS: Record<
  string,
  { bullets: string[]; domain: string }
> = {
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
  Trace: {
    bullets: [
      "Screen Studio alternative for $9 one-time (not $29/month)",
      "cross-platform screen recorder for macOS, Windows, and Linux",
      "on-device AI auto zoom, smart captions, and cursor effects",
      "MIT-licensed open source core with lifetime updates",
    ],
    domain: "trace.builders",
  },
  Squido: {
    bullets: [
      "open-source coding agent for the terminal",
      "read, bash, edit, and write tools from one CLI session",
      "supports 19+ model providers (Anthropic, OpenAI, OpenRouter, etc.)",
      "built for developers who live in the shell",
    ],
    domain: "squidagent.app",
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
