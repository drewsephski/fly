import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { MarkdownRenderer } from "@/components/markdown-renderer"

const blogPosts = [
  {
    slug: "agentic-ai-production-patterns-2026",
    title: "Agentic AI in Production: Patterns That Actually Work",
    description: "After two years of real-world deployments, the patterns for reliable agentic systems have crystallized. Bounded autonomy, multi-agent governance, and hierarchical memory are the new standard.",
    author: "Drew Sepeczi",
    date: "May 7, 2026",
    readTime: "7 min read",
    tags: ["AI Agents", "Architecture", "Production"],
    content: `# Agentic AI in Production: Patterns That Actually Work

In 2024, we called agents chatbots with tools. In 2025, we learned that letting an LLM freely call APIs is a recipe for disaster. Now, in 2026, we finally have patterns that work in production — not because AI has become more reliable, but because we've learned to build systems around it.

## The Three Pillars of Production-Grade Agents

### 1. Bounded Autonomy

Full AI autonomy turned out to be a dead end — not because models can't plan (they can), but because the problem is **controllability**. If an agent can do anything, you can't guarantee it won't do something catastrophic.

Bounded autonomy has become the standard in production: an agent has a clearly defined space of actions it can perform without approval, and everything outside that space requires human confirmation.

\`\`\`typescript
const agent = new BoundedAgent({
  allowedActions: ["read_db", "send_email", "create_ticket"],
  requiresApproval: ["delete_record", "charge_customer", "send_bulk_email"],
  onApprovalRequired: async (action) => {
    return await humanApprovalQueue.submit(action)
  }
})
\`\`\`

### 2. Multi-Agent Governance

The second major shift: **agents that watch other agents**. In multi-agent systems today, a governance layer is standard — an agent (or deterministic logic) that validates the outputs of other agents before execution.

It checks compliance with policies, RBAC rules, regulatory requirements, and business logic. No agent executes directly — everything passes through the governance layer.

\`\`\`typescript
const pipeline = new MultiAgentPipeline({
  executor: taskAgent,
  governance: governanceAgent,  // validates every output
  onViolation: (violation) => {
    audit.log(violation)
    return { blocked: true, reason: violation.message }
  }
})
\`\`\`

### 3. Hierarchical Memory

The context window is still finite. Even with million-token windows in models like Gemini 2.0, the naive "cram everything into context" approach is expensive and unreliable.

Production agents in 2026 work with **hierarchical memory**:

- **Working memory**: current conversation and active task state
- **Episodic memory**: past interactions, indexed by recency and relevance
- **Semantic memory**: domain knowledge base (vector DB)
- **Procedural memory**: learned procedures and successful action patterns

## The Ecosystem Has Crystallized

Instead of dozens of experimental libraries, there are now four mature frameworks, each with clear specialization:

| Framework | Best For |
|-----------|----------|
| LangGraph | Complex workflows with branching, retry logic, human-in-loop |
| LlamaIndex | Knowledge retrieval and RAG pipelines |
| AutoGen/AG2 | Multi-agent coordination and research tasks |
| CrewAI | Role-based agent teams |

In practice, production systems combine frameworks: LangGraph as the orchestrator, LlamaIndex for retrieval, and a custom governance layer for action validation. No single framework solves everything.

## Tool Calls as Middleware

Every tool call should pass through a validation layer — not because the LLM can't call an API correctly, but because you want an audit trail, rate limiting, input sanitization, and the ability to veto a call.

\`\`\`typescript
const toolMiddleware = createToolMiddleware({
  beforeCall: async (tool, args) => {
    await rateLimiter.check(tool.name)
    await auditLog.record({ tool: tool.name, args, timestamp: Date.now() })
    validateArgs(tool.schema, args)
  },
  afterCall: async (tool, result) => {
    await auditLog.recordResult({ tool: tool.name, result })
  }
})
\`\`\`

## The Biggest Lesson

**Agentic AI is not primarily an ML problem — it's a software engineering problem.** The models are capable enough. What determines success is the architecture around them: how you manage data flow, how you define boundaries, how you measure quality, and how you respond to failures.

Companies that treat agents as software systems — with tests, CI/CD, monitoring, and an incident process — will succeed. Those that build them as prompt engineering projects will keep prototyping forever.`
  },
  {
    slug: "building-ai-first-frontend-architectures",
    title: "Building AI-First Frontend Architectures in 2026",
    description: "The React Compiler is out, AI agents scaffold entire features autonomously, and Edge AI personalizes bundle delivery. Here's what the modern frontend stack actually looks like.",
    author: "Drew Sepeczi",
    date: "May 5, 2026",
    readTime: "6 min read",
    tags: ["React", "AI", "Architecture"],
    content: `# Building AI-First Frontend Architectures in 2026

We've officially moved past the era where AI was just a "copilot" suggesting the next line of code. In 2026, the industry has pivoted toward **Agentic AI** — autonomous systems capable of understanding high-level requirements, scaffolding complex features, and self-correcting bugs before they reach production.

## The 2026 Stack: What's Changed

### React Compiler Is Finally Here

With the full release of the React Compiler, we no longer spend time manually optimizing with \`useMemo\` or \`useCallback\`. The compiler handles all of that automatically.

This is significant for AI-assisted development: agents can now focus on **business logic** rather than micro-optimizations. The cognitive load of performance-aware React is largely gone.

\`\`\`tsx
// Before React Compiler — you managed this manually
const ExpensiveComponent = memo(({ data, onAction }) => {
  const processedData = useMemo(() => process(data), [data])
  const handleAction = useCallback(() => onAction(data.id), [onAction, data.id])
  return <UI data={processedData} onAction={handleAction} />
})

// After React Compiler — just write the component
function ExpensiveComponent({ data, onAction }) {
  const processedData = process(data)  // compiler optimizes this
  return <UI data={processedData} onAction={() => onAction(data.id)} />
}
\`\`\`

### Server Components as the Default

React Server Components have settled into the default architecture. The mental model is now clear:

- **Server Components**: data fetching, database queries, sensitive logic
- **Client Components**: interactivity, state, browser APIs
- **Shared Components**: pure UI, no side effects

AI agents scaffolding new features know this distinction natively. They generate the correct component type based on the feature's requirements.

## Autonomous Debugging with Watcher Agents

The most immediately valuable use of agentic AI today is **autonomous debugging**. Instead of hunting through logs manually, you deploy "Watcher Agents" that monitor your local dev environment.

When an error occurs:

1. The agent captures the stack trace and surrounding context
2. Searches the codebase for the root cause (not just the symptom)
3. Proposes a fix in a new git branch
4. Writes a regression test to prevent recurrence

\`\`\`typescript
const watcherAgent = new WatcherAgent({
  watchPaths: ["src/", "app/"],
  onError: async (error) => {
    const analysis = await agent.analyze(error)
    const fix = await agent.proposeFix(analysis)
    await git.createBranch(\`fix/\${analysis.id}\`)
    await git.applyPatch(fix.patch)
    await agent.writeRegressionTest(fix)
  }
})
\`\`\`

## Edge AI and Personalized Bundle Delivery

In 2026, Edge AI enables personalization at the infrastructure level. Rather than serving the same bundle to every user, you predict what a user is likely to interact with next and **pre-stream those specific Server Components** to the edge node closest to them.

This is particularly powerful for:

- **E-commerce**: pre-loading product detail components as users browse
- **Dashboards**: pre-fetching the next report a user is likely to open
- **SaaS apps**: personalizing the feature surface based on usage patterns

## The Human-in-the-Loop Necessity

Despite the power of these agents, generation is easy — **verification is valuable**. The role of the senior developer has shifted toward:

- **Prompt Engineering**: defining clear constraints and "golden paths" for agents to follow
- **Architectural Oversight**: ensuring AI-generated code doesn't drift from established patterns
- **Quality Gates**: reviewing agent output before it reaches production

Without human criteria, AI-generated code leads to "architectural drift" — a codebase that becomes a fragmented mess of inconsistent patterns, each one locally reasonable, globally incoherent.

## Getting Started

If you're building a new project in 2026, the minimal AI-first setup is:

1. **Next.js 16** with Server Components as default
2. **Cursor or Windsurf** with a project-level rules file that encodes your architectural patterns
3. **A watcher agent** connected to your error tracking (Sentry, etc.)
4. **Human review gates** in your CI/CD for AI-generated PRs

The goal isn't to remove yourself from the loop — it's to ensure you're operating at the level of architecture and judgment, not syntax.`
  },
  {
    slug: "internet-of-agents-mcp-a2a-protocols",
    title: "The Internet of Agents: MCP, A2A, and What Comes Next",
    description: "Open protocols are turning isolated AI automations into a global network. MCP, A2A, and ACP are the early infrastructure of a world where agents discover, transact, and coordinate across organizational boundaries.",
    author: "Drew Sepeczi",
    date: "May 3, 2026",
    readTime: "8 min read",
    tags: ["MCP", "AI Agents", "Protocols"],
    content: `# The Internet of Agents: MCP, A2A, and What Comes Next

2025 witnessed the early formation and consolidation of open protocols for agentic AI. 2026 is when those protocols started to matter in production. We're watching the outlines of an "**internet of agents**" emerge — a world where autonomous agents discover one another, communicate, invoke tools, transact value, and coordinate work across organizational and platform boundaries.

## The Protocol Stack

The current agentic protocol stack has three layers:

### Tool Calling: MCP (Model Context Protocol)

MCP, developed by Anthropic and now widely adopted, defines how agents invoke external tools and data sources. It's the HTTP of the agentic web — a simple, standardized way for agents to call capabilities they don't own.

\`\`\`typescript
// MCP server definition — any agent can now call your tools
import { MCPServer } from "@anthropic/mcp"

const server = new MCPServer({
  tools: {
    search_codebase: {
      description: "Search the codebase for patterns or symbols",
      parameters: z.object({
        query: z.string(),
        path: z.string().optional()
      }),
      handler: async ({ query, path }) => {
        return await ripgrep.search(query, path)
      }
    }
  }
})

server.listen(3001)
\`\`\`

Once you expose a tool via MCP, it's callable by any MCP-compatible agent — Cursor, Claude Code, or your own custom agent. You write the tool once; any agent benefits.

### Agent-to-Agent: A2A Protocol

While MCP handles tool invocation, A2A handles **agent coordination**. Two agents that speak A2A can delegate subtasks to each other, exchange context, and compose their capabilities.

A practical example: your customer support agent receives a billing question. Instead of trying to answer it directly, it delegates to your billing agent via A2A, receives a structured response, and synthesizes the final answer for the customer. Neither agent needs to know the other's internals.

\`\`\`typescript
// A2A delegation
const supportAgent = new A2AAgent({
  capabilities: ["handle_support_request"],
  peers: {
    billing: "https://agents.yourcompany.com/billing",
    technical: "https://agents.yourcompany.com/technical"
  }
})

const response = await supportAgent.delegate({
  to: "billing",
  task: "explain_invoice",
  context: { customer_id: "cus_123", invoice_id: "inv_456" }
})
\`\`\`

### Commerce: ACP and x402

The most experimental layer — but the one with the most interesting implications — is agentic commerce. ACP (Agentic Commerce Protocol) and x402 define how agents **transact value** autonomously.

An agent that needs to search a premium database can pay for that query micropayment-by-micropayment, without any human authorizing each transaction. Budget limits and spending policies are encoded at the agent level.

## What This Changes for Developers

### Your API is Now an Agent Interface

If you're building a public API in 2026, you need to think about how agents will consume it, not just humans. This means:

- **Semantic descriptions** for every endpoint (not just parameter types)
- **Structured outputs** that agents can reliably parse
- **Idempotent operations** that agents can safely retry
- **Budget/rate-limit signals** so agents know when to back off

### Multi-Agent Architecture as Default

For any non-trivial workflow, the right architecture is now a **network of specialized agents** rather than a single general-purpose one:

| Agent | Responsibility |
|-------|---------------|
| Router | Classifies intent, delegates to specialists |
| Domain Agents | Handle specific task types (billing, support, code) |
| Governance | Validates all outputs before execution |
| Memory | Manages context retrieval and storage |

This mirrors the move from monoliths to microservices — and comes with the same benefits (specialization, independent scaling, fault isolation) and challenges (distributed system complexity, network latency, debugging difficulty).

## The Open Questions

We're still in early days. The key unsolved problems:

1. **Discovery**: How does an agent find another agent with the right capability? There's no DNS for agents yet.
2. **Trust**: When agent A delegates to agent B, how does A verify B won't do something unsafe?
3. **Debugging**: Tracing a failure across five agents calling each other is significantly harder than debugging a single monolith.
4. **Cost attribution**: In a multi-agent system, which agent is responsible for which LLM cost?

The teams solving these problems — with open protocols rather than proprietary platforms — are building the foundational infrastructure of the next decade of software. It's genuinely the most interesting systems-level work happening right now.`
  }
]

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="relative z-10 min-h-svh text-foreground" style={{ fontFamily: "var(--font-body)" }}>
      {/* Grain overlay (subtle, complements dot-matrix) */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground font-mono">
            ← Drew Sepeczi
          </Link>
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/#writing" className="rounded-sm px-3 py-1.5 text-xs transition-colors hover:bg-muted hover:text-foreground">
              Writing
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

      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Back link */}
        <div className="animate-fade-up mb-8">
          <Link
            href="/#writing"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground/60 transition-colors hover:text-muted-foreground font-mono"
          >
            ← all posts
          </Link>
        </div>

        <article className="animate-fade-up">
          {/* Article header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {post!.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] border-border/40 font-normal text-muted-foreground">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-foreground mb-6 sm:text-5xl">
              {post!.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 opacity-60" />
                <span>{post!.date}</span>
              </div>
              <span className="h-3 w-px bg-border/50" />
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 opacity-60" />
                <span>{post!.readTime}</span>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {post!.description}
            </p>
          </header>

          <Separator className="mb-12 opacity-50" />

          {/* Article content */}
          <div className="animate-fade-up delay-100">
            <MarkdownRenderer content={post!.content} />
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Written by {post!.author}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{post!.date}</p>
              </div>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just read: ${post!.title}`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Share on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </main>
  )
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return { title: 'Post not found' }
  }

  return {
    title: post.title,
    description: post.description,
  }
}
