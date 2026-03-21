---
phase: 03-functionality-and-seo
plan: 03
subsystem: security, images
tags: [csp, security-headers, enhanced-img, avif, webp, image-optimization]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: SvelteKit project structure, Vite config, static images, component templates
provides:
  - Security headers on every SSR response (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
  - Enhanced-img Vite plugin for automatic AVIF/WebP image optimization
  - 5 component images migrated to build-time optimized enhanced:img
affects: [04-deployment, all-future-components]

# Tech tracking
tech-stack:
  added: ["@sveltejs/enhanced-img"]
  patterns: ["Security headers via hooks.server.ts handle hook", "enhanced:img for static component images, standard img for dynamic/runtime images"]

key-files:
  created:
    - src/hooks.server.ts
    - src/lib/assets/homepage/hero-illustration.png
    - src/lib/assets/homepage/cta-bg.jpg
    - src/lib/assets/homepage/ai-agent.png
    - src/lib/assets/about/team-office.jpg
    - src/lib/assets/logo.png
  modified:
    - vite.config.ts
    - src/lib/components/homepage/HeroSection.svelte
    - src/lib/components/homepage/CtaSection.svelte
    - src/lib/components/homepage/AiAgentSection.svelte
    - src/lib/components/layout/Header.svelte
    - src/routes/over-ons/+page.svelte

key-decisions:
  - "CSP in hooks.server.ts handle hook (not kit.csp in svelte.config.js) to avoid duplicate headers"
  - "style-src unsafe-inline allowed for Tailwind CSS inline style injection"
  - "Images copied to src/lib/assets/ (originals kept in static/ for backward compatibility)"
  - "enhanced:img only for static component images; dynamic/Markdown images stay as standard img"

patterns-established:
  - "Security headers pattern: Set in hooks.server.ts resolve callback, not in svelte.config.js"
  - "Image optimization pattern: Static component images in src/lib/assets/ with enhanced:img; runtime images in static/"

requirements-completed: [SECR-01, SECR-02, SEO-08]

# Metrics
duration: 2min
completed: 2026-03-21
---

# Phase 03 Plan 03: Security Headers & Image Optimization Summary

**Strict CSP and security headers via hooks.server.ts, plus @sveltejs/enhanced-img for automatic AVIF/WebP optimization on 5 component images**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-21T15:38:27Z
- **Completed:** 2026-03-21T15:40:48Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments
- Every SSR response now includes Content-Security-Policy with strict self-only directives, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, and Permissions-Policy
- Enhanced-img Vite plugin configured with proper ordering (before sveltekit())
- 5 component-referenced images migrated to enhanced:img with responsive sizes attributes for optimal Core Web Vitals

## Task Commits

Each task was committed atomically:

1. **Task 1: Create hooks.server.ts with CSP and security headers** - `98dabf4` (feat)
2. **Task 2: Set up enhanced-img Vite plugin and migrate component images** - `b0f3fbd` (feat)

## Files Created/Modified
- `src/hooks.server.ts` - Global security headers handle hook (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- `vite.config.ts` - Added enhancedImages() plugin before sveltekit()
- `src/lib/assets/homepage/hero-illustration.png` - Build-time optimizable copy of hero image
- `src/lib/assets/homepage/cta-bg.jpg` - Build-time optimizable copy of CTA background
- `src/lib/assets/homepage/ai-agent.png` - Build-time optimizable copy of AI agent illustration
- `src/lib/assets/about/team-office.jpg` - Build-time optimizable copy of team photo
- `src/lib/assets/logo.png` - Build-time optimizable copy of logo
- `src/lib/components/homepage/HeroSection.svelte` - Migrated to enhanced:img with sizes="min(1280px, 100vw)"
- `src/lib/components/homepage/CtaSection.svelte` - Migrated to enhanced:img with sizes="100vw"
- `src/lib/components/homepage/AiAgentSection.svelte` - Migrated to enhanced:img with sizes="(min-width: 1024px) 50vw, 100vw"
- `src/lib/components/layout/Header.svelte` - Migrated logo to enhanced:img
- `src/routes/over-ons/+page.svelte` - Migrated team photo to enhanced:img with sizes="(min-width: 1024px) 50vw, 100vw"

## Decisions Made
- CSP placed in hooks.server.ts handle hook (not kit.csp in svelte.config.js) to avoid duplicate/conflicting headers per D-22
- `style-src 'unsafe-inline'` included because Tailwind CSS may inject inline styles; CSS injection is not a meaningful attack vector
- Images copied (not moved) from static/ to src/lib/assets/ so existing references (Markdown frontmatter, OG paths) continue to work
- Only 5 statically-resolvable component images migrated; blog/case dynamic images intentionally left as standard img tags

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed missing @sveltejs/enhanced-img dependency**
- **Found during:** Task 2 (enhanced-img Vite plugin setup)
- **Issue:** @sveltejs/enhanced-img was not installed in the project
- **Fix:** Ran `npm install -D @sveltejs/enhanced-img`
- **Files modified:** package.json, package-lock.json
- **Verification:** Import succeeds, build passes
- **Committed in:** b0f3fbd (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary dependency installation. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Security headers are active on every SSR response
- Image optimization produces AVIF/WebP variants at build time
- Phase 4 deployment (Caddy) will add HTTPS enforcement on top of these code-side security headers

## Self-Check: PASSED

All 7 created files verified on disk. Both commit hashes (98dabf4, b0f3fbd) confirmed in git log.

---
*Phase: 03-functionality-and-seo*
*Completed: 2026-03-21*
