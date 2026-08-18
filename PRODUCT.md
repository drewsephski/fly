# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Hiring managers, technical recruiters, and engineering leaders evaluating Drew Sepeczi for AI product engineering roles.

**Secondary:** Founders and product leaders looking for a builder who can own strategy, interface craft, AI infrastructure, and launch execution end to end.

**Tertiary:** Fellow engineers and creators browsing for collaboration, open-source work, or technical perspective.

Visitors arrive with a specific job: quickly understand whether Drew can ship credible AI products, inspect representative work, and start a conversation without a scavenger hunt through scattered links.

## Product Purpose

Drew Sepeczi's personal portfolio at [drewsepeczi.xyz](https://drewsepeczi.xyz). The site makes his AI product engineering practice legible: what he builds, how he thinks, and proof that he ships full-stack products—not mockups.

Success means a visitor can (1) grasp positioning within seconds, (2) explore flagship and archive work with enough depth to judge craft, (3) ask the embedded assistant about projects and working style, and (4) reach out when ready.

## Positioning

An interactive portfolio you can question. Unlike static case-study pages, this site pairs editorial project storytelling with a live AI assistant grounded in Drew's real project dossier—so evaluation feels like a conversation, not a brochure.

Drew is positioned as an **AI product engineer** who works across product strategy, interface design, AI systems, and production infrastructure in one loop.

## Operating Context

- **Surface type:** Brand / portfolio (Experience mode in Impeccable terms—the work is the artifact; the interface recedes).
- **Deployment:** Next.js on Vercel; production domain `drewsepeczi.xyz`.
- **Dev command:** `npm run dev` (Next.js with Turbopack on port 3000).
- **Key routes:** `/` (main portfolio SPA), `/gallery` (parallax archive), `/blog/[slug]` (static blog posts), `/api/chat` (OpenRouter-backed assistant).
- **Theme:** Light/dark via `next-themes`; toggle with `d` key.
- **Content model:** Featured and archive projects in `lib/projects.ts`; blog posts hardcoded in `app/blog/[slug]/page.tsx`. Root `projects.json` / `projects.csv` are data exports and are not consumed by the app.

## Capabilities and Constraints

**Confirmed capabilities**

- Hero and editorial sections presenting positioning, capabilities, experience, and writing.
- Flagship case studies (Squid Agent, Trace, SquidCrawl) with problem/solution/challenge depth.
- Project index / bento grid and link to full gallery archive.
- Embedded portfolio chat (`HeroChat`, `TalkToDrew`) backed by `/api/chat` with project-aware system prompt.
- Quick-look image previews for project screenshots.
- Blog with syntax-highlighted technical writing.
- Gallery page with parallax scroll and grid views.
- Responsive layout, skip-to-content link, and semantic/ARIA structure on key sections.

**Technical constraints**

- Next.js 16 App Router; client components on interactive routes.
- Styling: Tailwind CSS v4, shadcn/ui (radix-nova), custom tokens in `tokens.css` and `app/globals.css`.
- Fonts: Fraunces (display), DM Sans (body), IBM Plex Mono (mono).
- Chat requires `OPENROUTER_API_KEY`; falls back to error response when missing.
- No CMS; content changes require code edits.

**Terminology**

- "Products" / "work" = shipped projects and client builds.
- "Assistant" / "portfolio you can question" = chat grounded in project data.
- "Full bench" = complete project index beyond the three flagship case studies.

## Brand Commitments

- **Name and identity:** Drew Sepeczi; site title "Drew Sepeczi — AI Product Engineer."
- **Voice (assistant):** Confident, technical, concise, slightly blunt, casual builder tone—not corporate support copy. Defined in `app/api/chat/route.ts`.
- **Visual lane:** Premium technical editorial; cobalt anchor hue; studied-DNA theme lineage noted in `app/globals.css` and `.hallmark/` metadata.
- **Proof metrics on site:** 30+ web projects shipped, 10+ AI products built, full-stack product ownership. Treat as author-provided claims unless independently verified.
- **Contact:** drew@drewsepeczi.xyz; Chicago-based, remote-friendly.

## Evidence on Hand

| Asset | Location / notes |
|-------|------------------|
| Resume / bio source | `aboutme.md` |
| Project catalog | `lib/projects.ts` (featured + archive), images in `public/projects/` |
| Blog posts | `app/blog/[slug]/page.tsx` (hardcoded) |
| OG / social image | `https://drewsepeczi.xyz/me-coffee.jpg` |
| Author photo | `public/` assets referenced in layout metadata |
| External proof links | Live product URLs, GitHub repos per project entries |

**Do not fabricate:** client logos, testimonials, revenue figures, user counts, or press quotes not present in repository content.

## Product Principles

1. **Show the real work.** Lead with shipped products and concrete problem/solution/challenge framing—not skill buzzwords alone.
2. **Make evaluation conversational.** The assistant should reduce friction for recruiters and founders who want specifics without scheduling a call first.
3. **One person, whole product.** Emphasize end-to-end ownership from strategy through interface, AI systems, and launch.
4. **Editorial restraint.** Let project imagery and case-study copy carry weight; avoid dashboard or SaaS-app chrome on a portfolio surface.
5. **Preserve accessibility basics.** Maintain skip links, labels, and readable hierarchy as the design evolves.

## Accessibility & Inclusion

- Skip-to-content link in root layout (`#skip-to-content` → `#main-content`).
- Section headings and `aria-labelledby` on major landmarks.
- Interactive controls include accessible names (e.g. quick-look buttons, chat triggers).
- Light/dark themes supported; no additional WCAG conformance level explicitly claimed in repo.
