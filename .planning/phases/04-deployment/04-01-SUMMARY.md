---
phase: 04-deployment
plan: 01
subsystem: infra
tags: [docker, caddy, prerender, sveltekit, hetzner, coolify]

# Dependency graph
requires:
  - phase: 03-functionality-and-seo
    provides: all pages, SEO meta, contact form, sitemap
provides:
  - Hybrid prerendering config (all content static, /contact SSR)
  - Multi-stage Dockerfile for SvelteKit adapter-node
  - Coolify-compatible Docker Compose with Caddy reverse proxy
  - .env.example with all production environment variables
affects: [04-deployment]

# Tech tracking
tech-stack:
  added: [docker, caddy]
  patterns: [hybrid-prerendering, multi-stage-docker-build, caddy-reverse-proxy]

key-files:
  created:
    - Dockerfile
    - .dockerignore
    - docker-compose.prod.yml
    - Caddyfile
  modified:
    - .env.example
    - src/routes/+page.ts
    - src/routes/automation/+page.ts
    - src/routes/data-verrijking/+page.ts
    - src/routes/api/+page.ts
    - src/routes/maatwerk-software/+page.ts
    - src/routes/offerte-automatisering/+page.ts
    - src/routes/ai-agent/+page.ts
    - src/routes/chatbot/+page.ts
    - src/routes/over-ons/+page.ts
    - src/routes/blogs/+page.server.ts
    - src/routes/blogs/[slug]/+page.ts
    - src/routes/cases/+page.server.ts
    - src/routes/cases/[slug]/+page.ts
    - src/routes/privacy-policy/+page.ts
    - src/routes/terms-conditions/+page.ts
    - src/routes/betalings-voorwaarden/+page.ts
    - src/routes/sitemap.xml/+server.ts
    - src/content/blogs/is-jouw-ai-agent-bestand-tegen-prompt-injectie-van-cybercriminelen.md

key-decisions:
  - "Docker restart policy replaces PM2 for crash recovery (simpler, Coolify-native)"
  - "Caddy handles HTTPS + security headers at proxy level (defense-in-depth with SvelteKit hooks)"
  - ".dockerignore excludes root-level docs but preserves src/content/*.md for build"
  - "entries() uses import.meta.glob for build-time slug enumeration in [slug] routes"

patterns-established:
  - "Prerender pattern: export const prerender = true in +page.ts for static pages"
  - "Dynamic route prerender: entries() function returns all slugs from import.meta.glob"
  - "Docker multi-stage: build with devDeps, prune, copy only build output to production"

requirements-completed: [DEPL-01, DEPL-02, DEPL-03, DEPL-04]

# Metrics
duration: 7min
completed: 2026-03-22
---

# Phase 4 Plan 1: Docker Deployment Infrastructure Summary

**Hybrid prerendering on 17 routes with Coolify-compatible Docker Compose stack (Caddy + Node) for Hetzner VPS deployment**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-22T19:12:57Z
- **Completed:** 2026-03-22T19:20:20Z
- **Tasks:** 2
- **Files modified:** 23

## Accomplishments
- Configured hybrid prerendering: 17 routes prerendered as static HTML, only /contact stays SSR
- Created multi-stage Dockerfile producing minimal production image with health check
- Built Coolify-compatible Docker Compose stack with Caddy reverse proxy and automatic HTTPS
- Documented all production environment variables in .env.example (RESEND_API_KEY, ORIGIN, PORT)

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure hybrid prerendering and environment variables** - `ebc7e77` (feat)
2. **Task 2: Create Docker infrastructure files with Caddy reverse proxy** - `b8d7318` (feat)

## Files Created/Modified
- `Dockerfile` - Multi-stage Docker build (build + production) with health check
- `.dockerignore` - Excludes dev files, preserves src/content markdown for build
- `docker-compose.prod.yml` - Coolify-compatible stack: app (Node) + caddy (reverse proxy)
- `Caddyfile` - Reverse proxy with auto HTTPS, gzip/zstd compression, security headers
- `.env.example` - Production env vars: RESEND_API_KEY, ORIGIN, PORT
- `src/routes/+page.ts` + 11 more static routes - Added prerender = true
- `src/routes/blogs/+page.server.ts` - Added prerender = true for blog listing
- `src/routes/cases/+page.server.ts` - Added prerender = true for case listing
- `src/routes/blogs/[slug]/+page.ts` - Added prerender + entries() for dynamic slug enumeration
- `src/routes/cases/[slug]/+page.ts` - Added prerender + entries() for dynamic slug enumeration
- `src/routes/sitemap.xml/+server.ts` - Added prerender = true for static sitemap generation
- `src/content/blogs/is-jouw-ai-agent-bestand-tegen-prompt-injectie-van-cybercriminelen.md` - Fixed mdsvex template syntax

## Decisions Made
- Docker restart policy (`unless-stopped`) replaces PM2 -- simpler, Coolify-native, one less dependency
- Caddy security headers duplicate SvelteKit hooks headers at proxy level for defense-in-depth (covers static files too)
- .dockerignore uses explicit root-level doc exclusions instead of `*.md` glob to preserve src/content markdown files needed at build time
- entries() function uses import.meta.glob (same as content.ts) for build-time slug enumeration in [slug] routes

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed mdsvex template syntax in blog post**
- **Found during:** Task 1 (prerender verification build)
- **Issue:** Blog post `is-jouw-ai-agent-bestand-tegen-prompt-injectie-van-cybercriminelen.md` contained `{{input}}` which mdsvex interprets as a Svelte expression referencing undefined variable `input`, causing prerender to fail with ReferenceError
- **Fix:** Replaced `'{{input}}'` with backtick-wrapped inline code `\`input\`` to prevent mdsvex from parsing as Svelte expression
- **Files modified:** `src/content/blogs/is-jouw-ai-agent-bestand-tegen-prompt-injectie-van-cybercriminelen.md`
- **Verification:** Build succeeds, all 17 routes prerender without errors
- **Committed in:** ebc7e77 (Task 1 commit)

**2. [Rule 1 - Bug] Fixed .dockerignore excluding content markdown**
- **Found during:** Task 2 (Docker file creation)
- **Issue:** Plan specified `*.md` in .dockerignore which would exclude `src/content/blogs/*.md` and `src/content/cases/*.md` needed for build
- **Fix:** Replaced wildcard `*.md` with explicit root-level doc exclusions (README.md, CLAUDE.md, CHANGELOG.md)
- **Files modified:** `.dockerignore`
- **Verification:** Docker context would include all src/content markdown files
- **Committed in:** b8d7318 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 bugs)
**Impact on plan:** Both fixes necessary for correct build. No scope creep.

## Issues Encountered
None beyond the auto-fixed deviations above.

## User Setup Required
None - no external service configuration required. Environment variables are documented in .env.example for production deployment.

## Next Phase Readiness
- Deployment infrastructure complete, ready for DNS cutover plan (04-02)
- Docker Compose stack can be deployed via Coolify on Hetzner VPS
- All content pages prerendered for optimal performance

## Self-Check: PASSED

All created files verified present. All commit hashes verified in git log.

---
*Phase: 04-deployment*
*Completed: 2026-03-22*
