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
    <Link
      href={`/blog/${slug}`}
      className="block rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <article className="group relative flex h-full flex-col gap-3 rounded-lg border border-border bg-card/55 p-5 transition-[border-color,background-color] duration-200 hover:border-[var(--color-accent)] hover:bg-card/80 sm:p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{date}</span>
          <span className="h-3 w-px bg-border/50" />
          <span>{readTime}</span>
        </div>
        <h3 className="text-base leading-snug font-semibold text-foreground sm:text-lg">
          {title}
        </h3>
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
          <ArrowUpRight className="h-4 w-4 text-[var(--color-accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
      </article>
    </Link>
  )
}

export function BlogPostList({ posts }: { posts: BlogPostProps[] }) {
  return (
    <section id="writing" className="pb-28">
      <div className="portfolio-section-head animate-fade-up">
        <div>
          <h2>Writing</h2>
          <p>Notes on AI, architecture, and what holds up in production.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post, i) => (
          <div
            key={i}
            className="animate-fade-up last:sm:col-span-2"
            style={{ animationDelay: `${i * 40 + 100}ms` }}
          >
            <BlogPost {...post} />
          </div>
        ))}
      </div>
    </section>
  )
}
