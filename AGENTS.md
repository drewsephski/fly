# AGENTS.md — fly-portfolio

## Commands

```sh
npm run dev       # next dev --turbopack (port 3000)
npm run build     # next build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
npm run format    # prettier --write "**/*.{ts,tsx}"
npx shadcn@latest add button  # add shadcn/ui components to @/components/ui/
```

Run `lint -> typecheck -> format` before committing. No test script exists.

## Architecture

- **Framework:** Next.js 16 App Router, Server Components default
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`), `tw-animate-css`, shadcn/ui "radix-nova" style
- **Fonts:** Playfair Display (`--font-display`) headings, DM Sans (`--font-sans`) body — configured in `layout.tsx`
- **Theme:** `next-themes` with class-based toggle. Press `d` key to toggle dark/light
- **Animations:** `motion` (motion.dev), custom CSS keyframes (`fade-up`, `fade-in`) in `globals.css`

## Routes

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Main portfolio SPA, `"use client"` |
| `/gallery` | `app/gallery/page.tsx` | `"use client"`, parallax scroll + grid views |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Hardcoded blog posts (no CMS/MD), static generated metadata |
| `/api/chat` | `app/api/chat/route.ts` | OpenRouter fallback chain (5 free models → `openrouter/free`) |

## Code Conventions

- **No semicolons**, no single quotes (double quotes), tabWidth 2, trailingComma es5
- **Imports:** Path alias `@/` → root (e.g. `@/components/ui/button`, `@/lib/utils`)
- **Class merging:** `cn()` from `@/lib/utils` (clsx + tailwind-merge)
- **UI components:** shadcn/ui in `@/components/ui/`, app-specific in `@/components/`
- **CSS variables** in `app/globals.css` for theming (oklch color space). `--spin-*` vars for accent colors

## Key Dependencies (non-obvious)

- `@openrouter/ai-sdk-provider` + `ai` SDK for `/api/chat`
- `motion` (not `framer-motion`) — `motion` v12
- `next-themes` — theme provider in `layout.tsx`
- `zod` v4, `lucide-react` icons, `react-markdown` + `react-syntax-highlighter` for blog

## Environment

- `OPENROUTER_API_KEY` required for chat API (falls back to error response if missing)
- `.env`, `.env*.local` in `.gitignore`

## CI / GitHub Actions

- `opencode.yml`: triggers on comments containing `/oc` or `/opencode` — runs `opencode github run`
- `screenshot.yml`: screenshots landing page on push/PR to main, creates UI audit issue

## Project Data

- Featured projects and blog posts are hardcoded (inline) in `app/page.tsx` and `app/blog/[slug]/page.tsx`
- `projects.json` and `projects.csv` exist at root but are **not consumed** by the app — they appear to be data exports

## Cursor Cloud specific instructions

- **Package manager:** the repo only ships a `bun.lock`, but `bun` is not installed in this environment. Use `npm` (matches the documented scripts above); `npm install` regenerates a `package-lock.json` locally — leave it untracked, do not commit it.
- **Dev server:** `npm run dev` serves on port 3000. It's the only service; the app is a single Next.js portfolio with no database/backend dependencies.
- **Chat feature is optional:** `/api/chat` needs `OPENROUTER_API_KEY`. Without it the endpoint returns `{"error":"OPENROUTER_API_KEY is not set"}` (HTTP 500) but the rest of the site works fully. Set the secret only when testing the AI chat.
- **Verification:** `npm run lint` (warnings only, 0 errors), `npm run typecheck`, and `npm run build` all pass clean.
