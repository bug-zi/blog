# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build (must pass before committing)
npm run start     # Start production server
npm run lint      # ESLint
```

No test framework is configured.

## Architecture

**Content flow**: MDX files in `src/content/{posts,works,stars}/` → `src/lib/posts.ts` reads and parses them with `gray-matter` → Next.js pages consume them via SSG (`generateStaticParams`).

**Three content types** share the same `PostMeta` interface (slug, title, date, description, category, tags, featured, cover, type). The `type` field distinguishes `"post" | "work" | "star"`.

**Dynamic routes**: Only `/passage/[slug]` has dynamic rendering with `generateStaticParams`. Work and star detail pages don't exist yet — they're list-only.

**Site config**: Everything personalizable lives in `src/lib/config.ts` — site name, owner info, nav items, social links, category trees. Edit this file to personalize the blog; don't hardcode user info elsewhere.

**Theme system**: `ThemeProvider` (client component) toggles a `dark` class on `<html>`, persisted to `localStorage`. An inline `<script>` in `layout.tsx` prevents FOUC by applying the class before React hydrates. CSS variables in `globals.css` define colors for both modes; Tailwind v4 `@theme inline` maps them to utility classes (`bg-background`, `text-accent`, etc.).

**Decap CMS admin panel**: `public/admin/index.html` loads Decap CMS from CDN with `window.CMS_MANUAL_INIT = true` and calls `CMS.init()` with inline config (no external config.yml). Content collections (posts/works/stars) with Chinese locale.

**GitHub OAuth**: `src/app/api/auth/route.ts` handles the OAuth flow. It exchanges GitHub code for access token, then sends it back to the CMS popup via `window.opener.postMessage` using the string format: `'authorization:github:success:' + JSON.stringify({token, provider})`. Requires `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables.

## Key Patterns

- Pages under `src/app/` are Server Components by default. Only components needing interactivity (Navbar, ThemeToggle, ThemeProvider) are marked `"use client"`.
- The `PostCard` component is shared across all content types and constructs the correct href based on `post.type`.
- MDX rendering uses `next-mdx-remote/rsc` (async version for RSC).
- The `Sakura` component is a client-side canvas animation added to the root layout.
- Image uploads go to `public/images/`; R2 CDN (`cdn.debugzi.com`) can be used for production images.
- Deployed on Vercel, auto-deploys from GitHub `main` branch. Domain: `wiki.debugzi.com`.
