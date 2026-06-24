import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface BlogPostProps {
  title: string
  description: string
  author: string
  date: string
  readTime: string
  tags: string[]
  content?: string
  slug: string
}

export function BlogPost({
  title,
  description,
  date,
  readTime,
  tags,
  slug,
}: BlogPostProps) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <article className="group relative flex flex-col gap-3 rounded-sm border border-border/40 bg-card/55 p-5 transition-all hover:border-border/70 hover:bg-card/80 sm:p-6">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>{date}</span>
          <span className="h-3 w-px bg-border/50" />
          <span>{readTime}</span>
        </div>
        <h4 className="text-base leading-snug font-semibold text-foreground sm:text-lg">
          {title}
        </h4>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-border/20 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-border/50 text-xs font-normal text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
        </div>
      </article>
    </Link>
  )
}

export function BlogPostList({ posts }: { posts: BlogPostProps[] }) {
  return (
    <section id="writing" className="pb-28">
      <div className="animate-fade-up mb-8">
        <h2
          className="text-sm font-bold tracking-[0.3em] text-foreground/80 uppercase"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          Writing
        </h2>
        <p className="mt-3 max-w-md text-base text-muted-foreground">
          Notes on AI, architecture, and what holds up in production.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <div
            key={i}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 40 + 100}ms` }}
          >
            <BlogPost {...post} />
          </div>
        ))}
      </div>
    </section>
  )
}
