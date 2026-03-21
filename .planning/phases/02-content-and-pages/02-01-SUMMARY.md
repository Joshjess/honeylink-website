---
phase: 02-content-and-pages
plan: 01
subsystem: content
tags: [mdsvex, markdown, svelte5, remark-gfm, rehype, content-types, components]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Tailwind CSS theme, font setup, base layout, inview action, Button component
provides:
  - mdsvex preprocessor configured for .md file processing
  - Content types (BlogPost, CaseStudy, FaqItemData, ServicePageData, ServiceSection, ServiceFeature)
  - Content loading helpers (getBlogPosts, getCases) with reading-time calculation
  - 9 shared UI components (ProseContent, AuthorInfo, PageHero, FaqAccordion, FaqItem, BlogCard, CaseCard, ServiceFeatureCard, TeamMember)
  - Content directories (blogs, cases, legal) ready for Markdown files
affects: [02-02, 02-03, 02-04, 02-05, 02-06]

# Tech tracking
tech-stack:
  added: [mdsvex, remark-gfm, rehype-slug, rehype-autolink-headings, reading-time]
  patterns: [import.meta.glob for content loading, $derived for reactive derived values, scoped :global() styles for prose typography]

key-files:
  created:
    - src/lib/server/content.ts
    - src/lib/components/content/ProseContent.svelte
    - src/lib/components/content/AuthorInfo.svelte
    - src/lib/components/ui/PageHero.svelte
    - src/lib/components/ui/FaqAccordion.svelte
    - src/lib/components/ui/FaqItem.svelte
    - src/lib/components/blog/BlogCard.svelte
    - src/lib/components/cases/CaseCard.svelte
    - src/lib/components/services/ServiceFeatureCard.svelte
    - src/lib/components/about/TeamMember.svelte
  modified:
    - svelte.config.js
    - package.json
    - src/lib/types/index.ts

key-decisions:
  - "No mdsvex layout config -- layouts would use Svelte 4 export let syntax, incompatible with runes mode"
  - "Used Math.random ID generation for FAQ ARIA IDs instead of crypto.randomUUID for SSR compatibility"
  - "Used $derived for reactive derived values to eliminate Svelte 5 state_referenced_locally warnings"

patterns-established:
  - "Content loading: import.meta.glob with eager:true for Markdown files, filter by published flag"
  - "Prose typography: scoped :global() styles in ProseContent wrapper component"
  - "Component props: always use $props() destructuring with TypeScript types inline"
  - "Reactive derivations: use $derived() for any value computed from props"

requirements-completed: [CONT-01, CONT-05, CONT-09]

# Metrics
duration: 3min
completed: 2026-03-21
---

# Phase 02 Plan 01: Content Foundation Summary

**mdsvex pipeline with remark-gfm/rehype plugins, 6 content types, 2 content loaders, and 9 shared Svelte 5 components for blogs/cases/services/about pages**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-21T11:27:44Z
- **Completed:** 2026-03-21T11:31:05Z
- **Tasks:** 2
- **Files modified:** 17

## Accomplishments
- Configured mdsvex preprocessor with remark-gfm, rehype-slug, and rehype-autolink-headings for Markdown processing
- Defined all content types (BlogPost, CaseStudy, FaqItemData, ServicePageData, ServiceSection, ServiceFeature) with full TypeScript contracts
- Created getBlogPosts() and getCases() content loaders using import.meta.glob with reading-time calculation
- Built 9 reusable Svelte 5 components following UI spec typography, spacing, and color patterns exactly

## Task Commits

Each task was committed atomically:

1. **Task 1: Install mdsvex dependencies and configure preprocessor + define content types** - `8906b41` (feat)
2. **Task 2: Create all shared UI components for content pages** - `2948cdc` (feat)

## Files Created/Modified
- `svelte.config.js` - Added mdsvex preprocessor with remark/rehype plugins
- `package.json` - Added mdsvex, remark-gfm, rehype-slug, rehype-autolink-headings, reading-time
- `src/lib/types/index.ts` - Added BlogPost, CaseStudy, FaqItemData, ServicePageData, ServiceSection, ServiceFeature types
- `src/lib/server/content.ts` - Content loading helpers with import.meta.glob and reading-time
- `src/lib/components/content/ProseContent.svelte` - Markdown prose typography wrapper with scoped global styles
- `src/lib/components/content/AuthorInfo.svelte` - Author avatar with name and optional reading time
- `src/lib/components/ui/PageHero.svelte` - Reusable page header with optional gold gradient background
- `src/lib/components/ui/FaqAccordion.svelte` - FAQ section container with heading and item iteration
- `src/lib/components/ui/FaqItem.svelte` - Accessible FAQ item with ARIA, chevron animation, max-height transition
- `src/lib/components/blog/BlogCard.svelte` - Blog listing card with date, title, excerpt, hover shadow
- `src/lib/components/cases/CaseCard.svelte` - Case study card with image fallback to gold background
- `src/lib/components/services/ServiceFeatureCard.svelte` - Feature card with configurable accent color
- `src/lib/components/about/TeamMember.svelte` - Team member card with photo, name, role
- `src/content/blogs/.gitkeep` - Empty content directory for blog posts
- `src/content/cases/.gitkeep` - Empty content directory for case studies
- `src/content/legal/.gitkeep` - Empty content directory for legal pages

## Decisions Made
- Avoided mdsvex `layout` config option because it uses Svelte 4 `export let` syntax internally, which conflicts with Svelte 5 runes mode
- Used `Math.random().toString(36).slice(2, 9)` for FAQ item ARIA IDs instead of `crypto.randomUUID()` to ensure SSR compatibility
- Used `$derived()` for computed values from props (BlogCard date formatting, ProseContent width class) to satisfy Svelte 5 reactivity model

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Svelte 5 state_referenced_locally warnings**
- **Found during:** Task 2 (Component creation)
- **Issue:** BlogCard and ProseContent computed values from props using plain `const`, triggering Svelte 5 warnings about capturing initial state values
- **Fix:** Changed to `$derived()` for reactive derivations from props
- **Files modified:** src/lib/components/blog/BlogCard.svelte, src/lib/components/content/ProseContent.svelte
- **Verification:** `npm run check` passes with zero errors and zero warnings
- **Committed in:** 2948cdc (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor fix for Svelte 5 best practices. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all components are fully implemented with real prop interfaces and rendering logic. Content directories are intentionally empty (populated by Plans 02-05).

## Next Phase Readiness
- All shared components ready for import by Plans 02 through 05
- Content types and loaders ready for blog/case route implementations
- mdsvex pipeline ready to process Markdown files once content is added
- ProseContent wrapper ready to style rendered Markdown output

## Self-Check: PASSED

All 15 created files verified present on disk. Both task commits (8906b41, 2948cdc) verified in git history.

---
*Phase: 02-content-and-pages*
*Completed: 2026-03-21*
