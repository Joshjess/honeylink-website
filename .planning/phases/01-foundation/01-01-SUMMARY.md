---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [sveltekit, svelte5, tailwindcss-v4, adapter-node, playwright, fontsource, satoshi]

# Dependency graph
requires:
  - phase: none
    provides: greenfield project
provides:
  - SvelteKit project with Svelte 5, TypeScript, Tailwind v4, adapter-node
  - Brand color palette and typography tokens in Tailwind @theme
  - IntersectionObserver action for scroll animations
  - Playwright scraper with 35 page screenshots, content JSON, and downloaded images
  - Satoshi font files (woff2) self-hosted in static/fonts/satoshi/
affects: [01-02, 01-03, 02-content, 03-seo]

# Tech tracking
tech-stack:
  added: [svelte@5.51.0, sveltekit@2.50.2, tailwindcss@4.2.2, adapter-node@5.5.4, playwright@1.58.2, fontsource-inter, fontsource-geist, fontsource-fragment-mono, tsx]
  patterns: [svelte5-runes, tailwindcss-v4-theme, css-first-config, intersection-observer-action]

key-files:
  created:
    - package.json
    - svelte.config.js
    - vite.config.ts
    - src/app.css
    - src/app.html
    - src/routes/+layout.svelte
    - src/routes/+page.svelte
    - src/routes/+error.svelte
    - src/lib/types/index.ts
    - src/lib/actions/inview.ts
    - static/fonts/satoshi/Satoshi-Regular.woff2
    - static/fonts/satoshi/Satoshi-Medium.woff2
    - static/fonts/satoshi/Satoshi-Bold.woff2
    - static/fonts/satoshi/Satoshi-Black.woff2
    - scripts/scrape-framer.ts
  modified: []

key-decisions:
  - "Used adapter-node instead of adapter-auto for Hetzner VPS deployment"
  - "Self-hosted Satoshi font from fontshare.com (not on npm/fontsource)"
  - "Tailwind v4 CSS-first @theme config instead of tailwind.config.js"
  - "HTML lang set to 'nl' for Dutch site SEO"
  - "Sitemap has 35 URLs (not 36 as plan estimated)"

patterns-established:
  - "Svelte 5 runes: $props() with Snippet type for children, $state for reactive values"
  - "Tailwind v4: @import tailwindcss + @theme in app.css, no JS config"
  - "Font strategy: fontsource for Inter/Geist/Fragment Mono, self-hosted woff2 for Satoshi"
  - "IntersectionObserver Svelte action for scroll-triggered animations"
  - "Scraper output: JSON content + PNG screenshots + downloaded images in scripts/scraped-data/"

requirements-completed: [FOUN-01]

# Metrics
duration: 16min
completed: 2026-03-20
---

# Phase 01 Plan 01: Project Scaffold and Framer Scraper Summary

**SvelteKit 5 project with Tailwind v4 @theme tokens, 4 font families, adapter-node, and Playwright scraper capturing all 35 honeylink.nl pages with desktop/mobile screenshots, structured content JSON, and 58 downloaded images**

## Performance

- **Duration:** 16 min
- **Started:** 2026-03-20T21:56:57Z
- **Completed:** 2026-03-20T22:13:05Z
- **Tasks:** 2
- **Files modified:** 26

## Accomplishments
- SvelteKit project scaffolded with Svelte 5, TypeScript, Tailwind v4 via vite plugin, and adapter-node -- builds without errors
- Brand color palette (7 primary + 6 accent colors) and 4 font families configured in Tailwind @theme
- Playwright scraper captured all 35 honeylink.nl pages with 70 screenshots (35 desktop + 35 mobile), 35 content JSON files, and 58 downloaded images
- Navigation structure and footer content extracted in scraped JSON for use in Plans 02 and 03

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold SvelteKit project with Svelte 5, TypeScript, Tailwind v4, adapter-node, fonts, and design tokens** - `8718464` (feat)
2. **Task 2: Build and run Playwright scraper to capture all honeylink.nl content, images, and screenshots** - `d69de49` (feat)

## Files Created/Modified
- `package.json` - Project manifest with all Phase 1 dependencies
- `svelte.config.js` - SvelteKit config with adapter-node and vitePreprocess
- `vite.config.ts` - Vite config with Tailwind CSS v4 plugin + SvelteKit
- `src/app.css` - Tailwind import, fontsource imports, Satoshi @font-face, @theme with brand colors and fonts
- `src/app.html` - HTML template with font preload and lang="nl"
- `src/routes/+layout.svelte` - Root layout with Svelte 5 $props/children pattern
- `src/routes/+page.svelte` - Minimal placeholder homepage
- `src/routes/+error.svelte` - Branded error page using $app/state
- `src/lib/types/index.ts` - NavLink and SiteConfig interfaces
- `src/lib/actions/inview.ts` - IntersectionObserver Svelte action for scroll animations
- `static/fonts/satoshi/*.woff2` - 4 Satoshi font weight files (Regular, Medium, Bold, Black)
- `scripts/scrape-framer.ts` - Playwright scraper for all 35 honeylink.nl pages
- `.gitignore` - Updated with scraped-data exclusion

## Decisions Made
- Used adapter-node instead of adapter-auto (VPS deployment requirement)
- Downloaded and self-hosted Satoshi font from fontshare.com (not available via npm/fontsource)
- Set HTML lang to "nl" for Dutch site SEO (deviation from default "en")
- Tailwind v4 CSS-first config via @theme (no tailwind.config.js)
- Sitemap contains 35 URLs, not 36 as plan estimated (verified from sitemap.xml)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Set HTML lang attribute to "nl" instead of "en"**
- **Found during:** Task 1 (app.html update)
- **Issue:** SvelteKit scaffolding defaults to lang="en" but this is a Dutch-language site
- **Fix:** Changed `<html lang="en">` to `<html lang="nl">` for correct SEO
- **Files modified:** src/app.html
- **Verification:** Build passes, lang attribute correct
- **Committed in:** 8718464 (Task 1 commit)

**2. [Rule 3 - Blocking] Removed adapter-auto, installed adapter-node**
- **Found during:** Task 1 (dependency setup)
- **Issue:** Scaffolding installed @sveltejs/adapter-auto which does not support Hetzner VPS
- **Fix:** Uninstalled adapter-auto, installed adapter-node as dev dependency
- **Files modified:** package.json, svelte.config.js
- **Verification:** npm run build succeeds with adapter-node output
- **Committed in:** 8718464 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (1 bug, 1 blocking)
**Impact on plan:** Both fixes necessary for correct deployment target and SEO. No scope creep.

## Issues Encountered
- `npx sv add tailwindcss` interactive prompts required manual Tailwind setup instead of using the sv CLI add-on system. Configured Tailwind v4 manually via @tailwindcss/vite plugin and app.css @theme directive -- same end result.
- Plan referenced 36 URLs but sitemap.xml contains 35 (the /blogs listing page is not in the sitemap but was not in the provided list either). All 35 sitemap URLs were scraped successfully.

## User Setup Required

None - no external service configuration required.

## Known Stubs

- `src/routes/+page.svelte` - Placeholder homepage text "Homepage coming in Plan 03." This is intentional -- the full homepage will be built in Plan 03 after scraped data provides the exact content and layout.

## Next Phase Readiness
- SvelteKit project builds and serves without errors
- Scraped data (screenshots, content JSON, images) available for Plans 02 and 03
- Brand colors and typography tokens established for all UI work
- Navigation structure and footer content captured in home.json for Plan 02 (global layout)

## Self-Check: PASSED

All 16 key files verified present. Both commit hashes (8718464, d69de49) confirmed in git log. Scraped data verified: 70 screenshots, 35 content JSON files, 58 images.

---
*Phase: 01-foundation*
*Completed: 2026-03-20*
