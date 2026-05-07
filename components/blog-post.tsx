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

export function BlogPost({ title, description, date, readTime, tags, slug }: BlogPostProps) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <article className="group relative flex flex-col gap-3 rounded-sm border border-border/30 p-5 transition-all hover:border-border/60 hover:bg-muted/20">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/50 font-mono">
          <span>{date}</span>
          <span className="h-3 w-px bg-border/50" />
          <span>{readTime}</span>
        </div>
        <h4 className="text-sm font-semibold text-foreground leading-snug">{title}</h4>
        <p className="text-xs leading-relaxed text-muted-foreground/60 line-clamp-2">{description}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/20">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] border-border/40 font-normal text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 opacity-0 transition-all group-hover:opacity-100" />
        </div>
      </article>
    </Link>
  )
}

export function BlogPostList({ posts }: { posts: BlogPostProps[] }) {
  return (
    <section id="writing" className="pb-28">
      <div className="animate-fade-up mb-8">
        <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground" style={{ fontFamily: "var(--font-mono, monospace)" }}>
          Writing
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 40 + 100}ms` }}>
            <BlogPost {...post} />
          </div>
        ))}
      </div>
    </section>
  )
}
