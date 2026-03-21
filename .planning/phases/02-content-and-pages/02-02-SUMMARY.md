---
phase: 02-content-and-pages
plan: 02
subsystem: content
tags: [markdown, mdsvex, blog, sveltekit-routes, reading-time]

# Dependency graph
requires:
  - phase: 02-01
    provides: "Content types (BlogPost), server helpers (getBlogPosts), reusable components (BlogCard, ProseContent, AuthorInfo, PageHero, CtaSection)"
provides:
  - "16 Markdown blog post files with valid frontmatter and body content"
  - "Blog listing page at /blogs with responsive card grid"
  - "Individual blog post page at /blogs/[slug] with prose typography and reading time"
  - "Organized blog hero images in static/images/blogs/"
  - "Author image at static/images/team/joshua-offermans.jpeg"
affects: [seo, deployment]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Dynamic Markdown import with Vite's import() for slug-based blog loading"
    - "Reading time calculation via reading-time package on rendered HTML"
    - "Svelte 5 dynamic component rendering (no svelte:component deprecated syntax)"

key-files:
  created:
    - "src/content/blogs/*.md (16 files)"
    - "static/images/blogs/*/hero.* (16 hero images)"
    - "static/images/team/joshua-offermans.jpeg"
    - "src/routes/blogs/+page.server.ts"
    - "src/routes/blogs/+page.svelte"
    - "src/routes/blogs/[slug]/+page.ts"
    - "src/routes/blogs/[slug]/+page.svelte"
    - "scripts/migrate-blogs.cjs"
  modified: []

key-decisions:
  - "Used Node.js migration script (scripts/migrate-blogs.cjs) for reproducible JSON-to-Markdown conversion"
  - "Svelte 5 dynamic component syntax (ContentComponent instead of svelte:component) to avoid deprecation warning"

patterns-established:
  - "Blog Markdown frontmatter schema: title, slug, date (ISO), author, authorImage, excerpt, image, published"
  - "Blog image organization: static/images/blogs/[slug]/hero.[ext]"

requirements-completed: [CONT-02, CONT-03, CONT-04, CONT-09]

# Metrics
duration: 4min
completed: 2026-03-21
---

# Phase 02 Plan 02: Blog Posts Migration and Routes Summary

**16 blog posts migrated from Framer JSON to Markdown with listing page and individual post routes using mdsvex and reading-time**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-21T11:33:36Z
- **Completed:** 2026-03-21T11:37:36Z
- **Tasks:** 2
- **Files modified:** 37

## Accomplishments
- Migrated all 16 blog posts from scraped Framer JSON to Markdown files with proper frontmatter
- Created blog listing page at /blogs with responsive 3-column card grid and empty state
- Created individual blog post pages at /blogs/[slug] with prose typography, author info, and reading time

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate all 16 blog posts from scraped JSON to Markdown files with images** - `ce9881d` (feat)
2. **Task 2: Create blog listing page and individual blog post routes** - `090ef09` (feat)

## Files Created/Modified
- `src/content/blogs/*.md` (16 files) - Blog post Markdown content with YAML frontmatter
- `static/images/blogs/*/hero.*` (16 directories) - Hero images organized per slug
- `static/images/team/joshua-offermans.jpeg` - Author photo for all posts
- `src/routes/blogs/+page.server.ts` - Blog listing data loader using getBlogPosts()
- `src/routes/blogs/+page.svelte` - Blog listing page with card grid and empty state
- `src/routes/blogs/[slug]/+page.ts` - Individual post loader with dynamic import and reading time
- `src/routes/blogs/[slug]/+page.svelte` - Individual post page with date, title, hero, author, prose, CTA
- `scripts/migrate-blogs.cjs` - Reproducible migration script for JSON-to-Markdown conversion

## Decisions Made
- Used a Node.js migration script for reproducible content conversion rather than manual copy
- Applied Svelte 5 dynamic component syntax (derived variable + direct rendering) instead of deprecated svelte:component

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed svelte:component deprecation in Svelte 5 runes mode**
- **Found during:** Task 2 (blog post page)
- **Issue:** Plan specified `<svelte:component this={data.content} />` which triggers deprecation warning in Svelte 5
- **Fix:** Used `$derived` to create `ContentComponent` and rendered it directly as `<ContentComponent />`
- **Files modified:** src/routes/blogs/[slug]/+page.svelte
- **Verification:** `npm run check` passes with zero warnings
- **Committed in:** 090ef09 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor syntax modernization for Svelte 5 compatibility. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Blog system fully operational with 16 posts and listing/detail routes
- Ready for case studies migration (Plan 03) following the same content pattern
- SEO meta tags to be added in Phase 3

## Self-Check: PASSED

All files verified:
- 16 Markdown blog posts exist in src/content/blogs/
- 16 hero images exist in static/images/blogs/
- Author image exists at static/images/team/joshua-offermans.jpeg
- All 4 route files exist (listing + detail)
- Both task commits verified (ce9881d, 090ef09)

---
*Phase: 02-content-and-pages*
*Completed: 2026-03-21*
