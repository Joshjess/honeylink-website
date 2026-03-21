---
phase: 03-functionality-and-seo
plan: 04
subsystem: seo
tags: [json-ld, structured-data, svelte-meta-tags, breadcrumbs, organization-schema, article-schema, service-schema]

# Dependency graph
requires:
  - phase: 03-functionality-and-seo/02
    provides: svelte-meta-tags installed, MetaTags in root layout, per-page SEO data pattern
provides:
  - Organization JSON-LD on homepage
  - Article JSON-LD on blog and case study pages
  - Service JSON-LD on all 7 service pages
  - BreadcrumbList JSON-LD on all 16 inner pages
  - Complete Phase 3 SEO layer (meta tags + structured data + sitemap)
affects: [deployment, seo-audit, google-search-console]

# Tech tracking
tech-stack:
  added: []
  patterns: [JsonLd component from svelte-meta-tags for structured data, BreadcrumbList on all inner pages]

key-files:
  created: []
  modified:
    - src/routes/+page.svelte
    - src/routes/blogs/[slug]/+page.svelte
    - src/routes/cases/[slug]/+page.svelte
    - src/routes/automation/+page.svelte
    - src/routes/data-verrijking/+page.svelte
    - src/routes/api/+page.svelte
    - src/routes/maatwerk-software/+page.svelte
    - src/routes/offerte-automatisering/+page.svelte
    - src/routes/ai-agent/+page.svelte
    - src/routes/chatbot/+page.svelte
    - src/routes/blogs/+page.svelte
    - src/routes/cases/+page.svelte
    - src/routes/over-ons/+page.svelte
    - src/routes/contact/+page.svelte
    - src/routes/terms-conditions/+page.svelte
    - src/routes/betalings-voorwaarden/+page.svelte
    - src/routes/privacy-policy/+page.svelte

key-decisions:
  - "JsonLd component placed at top of template (before visible HTML) per svelte-meta-tags convention"
  - "BreadcrumbList uses absolute URLs for item property, omits item on last breadcrumb per Google spec"

patterns-established:
  - "JSON-LD pattern: import JsonLd from svelte-meta-tags, place before first visible element"
  - "Service pages: Service + BreadcrumbList; Blog/Case pages: Article + BreadcrumbList; Legal pages: BreadcrumbList only"

requirements-completed: [SEO-06, SEO-08]

# Metrics
duration: 3min
completed: 2026-03-21
---

# Phase 03 Plan 04: JSON-LD Structured Data Summary

**JSON-LD structured data on all 17 pages: Organization on homepage, Article on blog/case posts, Service on 7 service pages, BreadcrumbList on all inner pages**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-21T16:36:21Z
- **Completed:** 2026-03-21T16:39:36Z
- **Tasks:** 1 of 2 (Task 2 is human verification checkpoint)
- **Files modified:** 17

## Accomplishments
- Added Organization JSON-LD on homepage with full contact details and postal address
- Added Article JSON-LD on blog post and case study pages with author, publisher, and image data
- Added Service JSON-LD on all 7 service pages with provider organization details
- Added BreadcrumbList JSON-LD on all 16 inner pages for Google breadcrumb trails
- Build passes cleanly with all structured data in place

## Task Commits

Each task was committed atomically:

1. **Task 1: Add JSON-LD structured data to all page types** - `1f37588` (feat)

**Task 2 (checkpoint:human-verify):** Awaiting human verification of complete Phase 3 output.

## Files Created/Modified
- `src/routes/+page.svelte` - Organization JSON-LD with HoneyLink details
- `src/routes/blogs/[slug]/+page.svelte` - Article + BreadcrumbList JSON-LD for blog posts
- `src/routes/cases/[slug]/+page.svelte` - Article + BreadcrumbList JSON-LD for case studies
- `src/routes/automation/+page.svelte` - Service + BreadcrumbList JSON-LD
- `src/routes/data-verrijking/+page.svelte` - Service + BreadcrumbList JSON-LD
- `src/routes/api/+page.svelte` - Service + BreadcrumbList JSON-LD
- `src/routes/maatwerk-software/+page.svelte` - Service + BreadcrumbList JSON-LD
- `src/routes/offerte-automatisering/+page.svelte` - Service + BreadcrumbList JSON-LD
- `src/routes/ai-agent/+page.svelte` - Service + BreadcrumbList JSON-LD
- `src/routes/chatbot/+page.svelte` - Service + BreadcrumbList JSON-LD
- `src/routes/blogs/+page.svelte` - BreadcrumbList JSON-LD for blog listing
- `src/routes/cases/+page.svelte` - BreadcrumbList JSON-LD for case listing
- `src/routes/over-ons/+page.svelte` - BreadcrumbList JSON-LD for about page
- `src/routes/contact/+page.svelte` - BreadcrumbList JSON-LD for contact page
- `src/routes/terms-conditions/+page.svelte` - BreadcrumbList JSON-LD for terms page
- `src/routes/betalings-voorwaarden/+page.svelte` - BreadcrumbList JSON-LD for payment terms
- `src/routes/privacy-policy/+page.svelte` - BreadcrumbList JSON-LD for privacy policy

## Decisions Made
- JsonLd component placed before first visible element in template, per svelte-meta-tags convention
- BreadcrumbList uses absolute URLs for `item` property; last breadcrumb omits `item` per Google structured data spec
- Most pages already had JsonLd from parallel agent execution; this plan committed them and added the 3 missing legal pages

## Deviations from Plan

None - plan executed exactly as written. The 14 pages that already had JsonLd added (uncommitted from parallel agent) were verified and committed together with the 3 legal pages added in this execution.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Checkpoint: Human Verification Needed (Task 2)

**Task 2 is a `checkpoint:human-verify` for complete Phase 3 visual/functional verification.**

The following needs human verification by running `npm run dev` and checking:

1. **Contact form** (http://localhost:5173/contact)
   - Two-column layout: left side heading + contact details, right side form
   - Form has 4 fields: Naam, E-mail, Bedrijf (optioneel), Bericht
   - Submit button says "Verstuur bericht"
   - Empty form shows Dutch validation errors
   - FAQ section below with 5 questions
   - Mobile viewport: single column layout

2. **Page source SEO** (Ctrl+U on any page)
   - `<title>Page Name | HoneyLink</title>` format
   - `<meta name="description"` with Dutch content
   - `og:title`, `og:description`, `og:image`, `og:url` meta tags
   - `<link rel="canonical"` with absolute URL
   - `<script type="application/ld+json">` with appropriate schema

3. **Sitemap** (http://localhost:5173/sitemap.xml)
   - XML with all routes listed
   - Includes /blogs/[slug] entries for all blog posts
   - Includes /cases/[slug] entries for all case studies

4. **Security headers** (DevTools > Network > Headers)
   - Content-Security-Policy header present
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff

5. **Images** load correctly on homepage (no broken images)

## Next Phase Readiness
- Phase 3 automated work is complete (all 4 plans: contact form, SEO meta tags, security/images, JSON-LD)
- Awaiting human verification before declaring Phase 3 complete
- After verification approval, site is ready for Phase 4 (deployment)

## Self-Check: PASSED

All 17 modified files verified present. Commit `1f37588` verified in git log. SUMMARY.md created at expected path.

---
*Phase: 03-functionality-and-seo*
*Completed: 2026-03-21*
