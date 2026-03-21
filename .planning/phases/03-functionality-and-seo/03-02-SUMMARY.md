---
phase: 03-functionality-and-seo
plan: 02
subsystem: seo
tags: [svelte-meta-tags, super-sitemap, open-graph, canonical, twitter-card, sitemap-xml, robots-txt]

# Dependency graph
requires:
  - phase: 02-content-migration
    provides: blog and case study content with frontmatter metadata (excerpt, image)
  - phase: 01-foundation
    provides: root layout, siteConfig in layout server load
provides:
  - MetaTags component in root layout with per-page SEO data
  - sitemap.xml auto-generated endpoint with all static and parameterized routes
  - robots.txt with Sitemap directive
  - OG default social card image
  - seo return pattern in all page load functions
affects: [deployment, future-pages]

# Tech tracking
tech-stack:
  added: [svelte-meta-tags, super-sitemap]
  patterns: [seo-data-via-page-load, metatags-in-layout-only]

key-files:
  created:
    - src/routes/+page.ts
    - src/routes/sitemap.xml/+server.ts
    - src/routes/automation/+page.ts
    - src/routes/data-verrijking/+page.ts
    - src/routes/api/+page.ts
    - src/routes/maatwerk-software/+page.ts
    - src/routes/offerte-automatisering/+page.ts
    - src/routes/ai-agent/+page.ts
    - src/routes/chatbot/+page.ts
    - src/routes/over-ons/+page.ts
    - src/routes/contact/+page.ts
    - static/images/og-default.jpg
  modified:
    - src/routes/+layout.svelte
    - src/routes/blogs/+page.server.ts
    - src/routes/cases/+page.server.ts
    - src/routes/blogs/[slug]/+page.ts
    - src/routes/cases/[slug]/+page.ts
    - src/routes/terms-conditions/+page.ts
    - src/routes/betalings-voorwaarden/+page.ts
    - src/routes/privacy-policy/+page.ts
    - static/robots.txt
    - package.json

key-decisions:
  - "MetaTags rendered once in root layout only, per-page seo data via $page.data.seo"
  - "Homepage title 'HoneyLink | Automation en AI Agency' (brand-first), all other pages 'Page Name | HoneyLink' (page-first for SEO)"
  - "Blog/case posts use frontmatter excerpt as meta description and featured image as OG image"
  - "super-sitemap for auto-route discovery with paramValues for blog/case slugs"

patterns-established:
  - "SEO data pattern: each page +page.ts or +page.server.ts returns seo: { title, description, image?, type? }"
  - "MetaTags in layout only: never render MetaTags in individual pages"
  - "Canonical URL built from siteConfig.url + $page.url.pathname"

requirements-completed: [SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-07]

# Metrics
duration: 4min
completed: 2026-03-21
---

# Phase 3 Plan 2: SEO Meta Tags and Sitemap Summary

**svelte-meta-tags in root layout with per-page seo data, auto-generated sitemap.xml via super-sitemap, and robots.txt with Sitemap directive**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-21T15:38:35Z
- **Completed:** 2026-03-21T15:43:10Z
- **Tasks:** 2
- **Files modified:** 21

## Accomplishments
- MetaTags component in root layout renders title, description, canonical URL, Open Graph, and Twitter card for every page
- All 20+ pages have page-specific seo data with Dutch descriptions following "Page Name | HoneyLink" title format
- Blog and case study pages use frontmatter excerpt and image for meta description and OG image
- sitemap.xml endpoint auto-discovers all routes and includes all blog/case slug routes via paramValues
- robots.txt updated with Allow and Sitemap directive
- OG default social card image (1200x630) created with HoneyLink brand colors

## Task Commits

Each task was committed atomically:

1. **Task 1: Add MetaTags component to root layout and create seo data in all page load functions** - `9427792` (feat)
2. **Task 2: Create sitemap.xml endpoint, update robots.txt, and add OG default image** - `3eae0b7` (feat)

## Files Created/Modified
- `src/routes/+layout.svelte` - Added MetaTags component with $derived seo values from $page.data.seo
- `src/routes/+page.ts` - Homepage seo data (brand-first title)
- `src/routes/automation/+page.ts` - Automation service page seo data
- `src/routes/data-verrijking/+page.ts` - Data verrijking service page seo data
- `src/routes/api/+page.ts` - API integratie service page seo data
- `src/routes/maatwerk-software/+page.ts` - Maatwerk software service page seo data
- `src/routes/offerte-automatisering/+page.ts` - Offerte automatisering service page seo data
- `src/routes/ai-agent/+page.ts` - AI agent service page seo data
- `src/routes/chatbot/+page.ts` - Chatbot service page seo data
- `src/routes/over-ons/+page.ts` - Over ons page seo data
- `src/routes/contact/+page.ts` - Contact page seo data
- `src/routes/blogs/+page.server.ts` - Added seo to blog listing return
- `src/routes/cases/+page.server.ts` - Added seo to cases listing return
- `src/routes/blogs/[slug]/+page.ts` - Added seo with frontmatter excerpt/image and type article
- `src/routes/cases/[slug]/+page.ts` - Added seo with frontmatter excerpt/image and type article
- `src/routes/terms-conditions/+page.ts` - Added seo to legal page return
- `src/routes/betalings-voorwaarden/+page.ts` - Added seo to legal page return
- `src/routes/privacy-policy/+page.ts` - Added seo to legal page return
- `src/routes/sitemap.xml/+server.ts` - Auto-generated sitemap with all routes and parameterized slugs
- `static/robots.txt` - Updated with Allow and Sitemap directive
- `static/images/og-default.jpg` - 1200x630 branded social card image

## Decisions Made
- MetaTags rendered once in root layout only (never in individual pages) per Research pitfall guidance
- Homepage uses brand-first title "HoneyLink | Automation en AI Agency" per D-12; all other pages use "Page Name | HoneyLink" per D-11
- Blog/case posts use frontmatter excerpt as meta description and featured image as OG image per D-15, D-16
- super-sitemap chosen for auto-route discovery; paramValues passed for blog and case slugs
- OG default image created with ImageMagick (gold background with centered logo) -- can be replaced with a proper branded design later

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Build verification showed failure due to missing `valibot` dependency in contact page server file from parallel agent (plan 03-01). This is NOT caused by this plan's changes. svelte-check confirmed 0 errors for all SEO-related files.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All pages have SEO meta data ready for search engine crawling
- Sitemap is auto-generated and will include any new routes added in future
- Structured data (JSON-LD) for Organization, Article, Service, and BreadcrumbList is noted in D-17 through D-20 but was not part of this plan scope
- OG default image is a placeholder; can be replaced with a proper branded design

## Self-Check: PASSED

- All 12 created files: FOUND
- Commit 9427792 (Task 1): FOUND
- Commit 3eae0b7 (Task 2): FOUND

---
*Phase: 03-functionality-and-seo*
*Completed: 2026-03-21*
