---
phase: 260519-g6h
plan: 01
subsystem: performance
tags: [enhanced-img, caddy, cache-control, lcp, preload, avif, webp, svelte5]

requires:
  - phase: 04-deployment
    provides: Caddy reverse proxy with Docker stack (Caddyfile)
  - phase: 03-03
    provides: enhanced-img pipeline (vite.config.ts plugin, hero/CTA/AI images)
provides:
  - Universal image optimization via enhanced:img (testimonials, clients, cases, blogs)
  - Caddy edge cache headers (immutable + static-asset tiers)
  - Homepage LCP preload via <svelte:head> + Picture srcset
  - Lazy-loading + async-decoding site-wide on below-fold images
  - Shared heroes.ts helper for slug/folder -> Picture map
affects: [SEO, social previews, performance, infrastructure]

tech-stack:
  added: []  # No new dependencies (uses existing enhanced-img + imagetools-core)
  patterns:
    - "import.meta.glob with { query: { enhanced: true }, eager: true } for dynamic asset maps"
    - "Picture.sources[format] for preload imagesrcset (Picture.img.srcset does not exist)"
    - "OG image derived from optimized Picture URL (no per-slug /static/images/og/ copies)"
    - "Caddy @immutable + @staticAssets named matchers for tiered cache policy"

key-files:
  created:
    - "src/lib/assets/heroes.ts (shared eager glob + helpers)"
    - ".planning/quick/260519-g6h-implement-approved-image-performance-pla/deferred-items.md"
  modified:
    - "Caddyfile (cache headers)"
    - "src/lib/components/homepage/TestimonialsSection.svelte"
    - "src/lib/components/homepage/ClientsSection.svelte"
    - "src/lib/components/homepage/HeroSection.svelte (Picture import + preload)"
    - "src/lib/components/homepage/AiAgentSection.svelte"
    - "src/lib/components/homepage/CtaSection.svelte"
    - "src/lib/components/cases/CaseCard.svelte"
    - "src/lib/components/blog/BlogCard.svelte"
    - "src/lib/components/about/TeamMember.svelte"
    - "src/lib/components/content/AuthorInfo.svelte"
    - "src/lib/components/layout/Header.svelte"
    - "src/lib/server/content.ts (attach heroPicture)"
    - "src/lib/types/index.ts (heroPicture?: Picture | null)"
    - "src/routes/cases/[slug]/+page.{ts,svelte}"
    - "src/routes/blogs/[slug]/+page.{ts,svelte}"
    - "src/routes/over-ons/+page.svelte"
    - "7 service-page routes (api, ai-agent, automation, chatbot, data-verrijking, maatwerk-software, offerte-automatisering)"

key-decisions:
  - "OG strategy: option (a) - derive seo.image from optimized Picture URL in /_app/immutable/, no per-slug og copies, frontmatter strings untouched"
  - "Case heroes: lookup by frontmatter image path (folder segment), NOT by slug, because case markdown slugs and case image folders use different identifiers (e.g. slug 'van-handleidingen-...' but folder 'owl-integrations')"
  - "Path B chosen for cards: extract heroes glob into src/lib/assets/heroes.ts, edited src/lib/server/content.ts to attach heroPicture, switched CaseCard + BlogCard to <enhanced:img>"
  - "Preload imagesrcset uses webp source's srcset (Picture.sources['webp']) - Picture.img.srcset does not exist per imagetools-core types"
  - "svelte.config.js precompress flag intentionally NOT modified - that's part of Task 5 (human-verify checkpoint)"
  - "Static /static/images/{logo,honeylink-logo,og-default,favicon,team,about,clients/webfabrikant,homepage}/* preserved - logo/og-default are external-crawler-visible, SVG is not enhanced-img-transformable, /homepage/ duplicates flagged as deferred"

patterns-established:
  - "Frontmatter image strings remain a stable contract: format unchanged, path resolution lifted into a loader (heroes.ts)"
  - "<enhanced:img> + fetchpriority='high' + no loading=lazy for LCP elements; everything else gets loading=lazy + decoding=async"
  - "Preload pattern: import Picture, pick source format, render imagesrcset from picture.sources[format]"
  - "Cache tiers: _app/immutable/* = 1yr immutable; /images/* /fonts/* etc = 1d + stale-while-revalidate"

requirements-completed: []

duration: 19min
completed: 2026-05-19
---

# Phase 260519-g6h Plan 01: Image Performance Summary

**Universal enhanced:img coverage (24 raster assets), Caddy immutable cache headers, LCP preload via Picture.sources, and lazy/async attributes site-wide -- CDN performance without paying for a CDN.**

## Performance

- **Duration:** 19 min
- **Started:** 2026-05-19T09:48:52Z
- **Completed:** 2026-05-19T10:07:26Z
- **Tasks:** 4 of 5 completed (Task 5 awaits human verification)
- **Files modified:** ~40 (incl. 24 moved + 1 new + ~15 edited)

## Accomplishments

- **Caddy cache headers** (Task 1): `@immutable` matcher emits `Cache-Control: public, max-age=31536000, immutable` for `/_app/immutable/*`. `@staticAssets` matcher emits `Cache-Control: public, max-age=86400, stale-while-revalidate=604800` + `Vary: Accept` for `/images/*`, `/fonts/*`, favicon variants, `/robots.txt`. caddy validate exits 0.
- **Testimonials + clients** (Task 2): 3 avatars and 5 raster client logos moved into `src/lib/assets/` and rendered via `<enhanced:img>` with `sizes="40-48px"`/`"160px"`. SVG (`webfabrikant.svg`) preserved as plain `<img>` with a discriminated union type.
- **Case + blog heroes** (Task 3): 5 case heroes + 16 blog heroes (incl. one `.gif`) migrated. New `src/lib/assets/heroes.ts` provides `getCaseHero`/`getBlogHero`/`pictureToOgUrl`. Index pages render thumbnail `<enhanced:img>` with responsive sizes. JSON-LD `image` now references the optimized Picture URL.
- **LCP preload + perf attributes** (Task 4): Homepage hero gets `<link rel="preload" as="image" imagesrcset=... imagesizes=... fetchpriority="high">` + matching `<enhanced:img fetchpriority="high" decoding="async">`. Every below-fold `<img>` / `<enhanced:img>` gets `loading="lazy" decoding="async"`. Header logo + AuthorInfo avatar get explicit width/height to avoid CLS.

## Task Commits

1. **Task 1: Caddyfile cache headers** - `0c3712b` (feat)
2. **Task 2: Testimonials + clients to enhanced:img** - `d2a0029` (feat)
3. **Task 3: Case + blog heroes via heroes.ts map** - `47622b1` (feat)
4. **Task 4: Perf attributes + homepage hero preload** - `0dbf6fc` (feat)

Task 5 (`checkpoint:human-verify`) was NOT executed -- it requires:
- Editing `svelte.config.js` to add `adapter({ precompress: true })`
- Running the full Docker stack (`docker compose -f docker-compose.prod.yml up -d --build`)
- Verifying Caddy `Cache-Control` headers via `curl -sI`
- Running Lighthouse Performance audits on `/`, a case page, a blog page
- Verifying repeat-visit disk-cache hits in DevTools Network panel
- Visual regression spot-check

## Image Inventory (post-build)

**Optimized via enhanced:img → AVIF/WebP/fallback in `/_app/immutable/assets/`:**
- 5 homepage assets (hero, ai-agent, cta-bg) + 3 testimonial avatars + 5 raster client logos
- 5 case hero images + 16 blog hero images
- About page (team-office.jpg)
- **Build output:** 73 AVIF + 73 WebP + responsive raster variants (251 files total, 11 MB)

**Raw-served from `/static/images/` (intentional, NOT enhanced-img):**
- `logo.png`, `honeylink-logo.png` - JSON-LD-referenced, must keep stable absolute URLs (1-day cache tier)
- `og-default.jpg` - Open Graph fallback for homepage + non-article pages (external-crawler cached)
- `favicon.svg`, `favicon.png`, etc - SvelteKit/browser convention
- `clients/webfabrikant.svg` - enhanced-img doesn't transform SVG; SVG is already optimal
- `team/joshua-offermans.jpeg` - referenced by markdown frontmatter `authorImage` strings (not migrated this plan)
- `about/team-office.jpg` - NOTE: this is the **build-output static copy**; the actual source used by `<enhanced:img>` lives in `src/lib/assets/about/team-office.jpg`. The static one is orphan (see `deferred-items.md`).
- `homepage/{ai-agent.png,cta-bg.jpg,hero-illustration.png}` - orphan duplicates from Phase 03-03 (see `deferred-items.md`)

## OG Image Strategy (decision)

The plan offered two options:
- **(a) leave frontmatter strings untouched, derive seo.image in the loader from the optimized Picture URL**
- (b) copy each hero to `/static/images/og/{slug}.{ext}` and update frontmatter `image` fields

**Chosen: option (a).** Rationale:
- Honors user constraint: "Frontmatter `image` strings in markdown files should NOT be changed in format"
- Honors plan Step 1: "DO NOT modify the markdown frontmatter"
- OG URL is now `https://honeylink.nl/_app/immutable/assets/hero.{hash}.{ext}` - a stable hashed absolute URL
- When image content changes, hash changes, social caches are naturally invalidated
- No content-migration script needed
- No `static/images/og/` directory proliferation

**Validation:** Built and inspected:
- `/cases/{any-slug}.html` → `og:image" content="https://honeylink.nl/_app/immutable/assets/hero.{hash}.jpeg"`
- `/blogs/{any-slug}.html` → same pattern
- `/index.html` → `og:image" content="https://honeylink.nl/images/og-default.jpg"` (unchanged)

JSON-LD `image` field also switched from `data.meta.image` → `data.seo.image` so schema.org crawlers get the stable hashed URL (would have 404'd otherwise after the file moves).

## Files Created

- `src/lib/assets/heroes.ts` - eager glob + `getCaseHero`/`getBlogHero`/`pictureToOgUrl` helpers
- `.planning/quick/260519-g6h-implement-approved-image-performance-pla/deferred-items.md` - tracks orphan static homepage images (out of scope)

## Files Modified

**Config + infra:**
- `Caddyfile` - 9 lines added (immutable + staticAssets cache rules with Vary: Accept)

**Type system:**
- `src/lib/types/index.ts` - import Picture from imagetools-core, add `heroPicture?: Picture | null` to BlogPost + CaseStudy

**Content layer:**
- `src/lib/server/content.ts` - attach `heroPicture` to each item in `getCases()` + `getBlogPosts()`

**Homepage components:**
- `HeroSection.svelte` - Picture import, fetchpriority + decoding, `<svelte:head>` preload
- `TestimonialsSection.svelte` - 3 avatars via static imports, enhanced:img
- `ClientsSection.svelte` - raster/svg discriminator, enhanced:img for 5 raster, plain img for 1 SVG
- `AiAgentSection.svelte` - loading=lazy, decoding=async
- `CtaSection.svelte` - loading=lazy, decoding=async

**Cards + content:**
- `CaseCard.svelte` - enhanced:img + responsive sizes for thumbnail
- `BlogCard.svelte` - same
- `TeamMember.svelte` - loading=lazy, decoding=async
- `AuthorInfo.svelte` - loading=lazy, decoding=async, width=40 height=40 (CLS-safe)
- `Header.svelte` - decoding=async, width=458 height=98 (CLS-safe, no lazy because above-fold)

**Dynamic routes:**
- `cases/[slug]/+page.ts` - resolve heroPicture from frontmatter image; derive ogImage from Picture URL
- `cases/[slug]/+page.svelte` - render enhanced:img with fetchpriority + decoding; fallback plain img
- `blogs/[slug]/+page.ts` - same shape
- `blogs/[slug]/+page.svelte` - same shape
- `over-ons/+page.svelte` - team-office enhanced:img gets lazy + async
- 7 service pages (`automation`, `offerte-automatisering`, `api`, `maatwerk-software`, `ai-agent`, `chatbot`, `data-verrijking`) - section image gets lazy + async

**File moves (git history preserved via `git mv`):**
- `static/images/testimonials/*` → `src/lib/assets/testimonials/`
- `static/images/clients/*.{png,webp}` → `src/lib/assets/clients/` (SVG stays)
- `static/images/cases/{slug}/*` → `src/lib/assets/cases/{slug}/`
- `static/images/blogs/{slug}/*` → `src/lib/assets/blogs/{slug}/`

## Decisions Made

1. **OG strategy = option (a):** Derive `seo.image` from optimized Picture URL in loader; frontmatter strings untouched. Documented above.
2. **Case hero lookup by `frontmatter.image` path (not slug):** Case markdown slug (e.g. `van-handleidingen-naar-interactieve-chatbot-ondersteuning`) and image folder (`owl-integrations`) don't match. Loader passes the frontmatter `image` string to `getCaseHero()` which extracts the folder segment.
3. **Cards take path B (recommended in plan):** Extracted heroes glob into `src/lib/assets/heroes.ts`, edited `src/lib/server/content.ts` to attach `heroPicture`, switched CaseCard + BlogCard to `<enhanced:img>`. `content.ts` exists with the implied shape, so the fallback to path A was not needed.
4. **`heroImg.img.srcset` is NOT real:** The plan's preload snippet `imagesrcset={heroImg.img.srcset}` doesn't compile -- `imagetools-core`'s `Picture.img` type has only `src`/`w`/`h`. Implementation reads `heroImg.sources[preferredFormat]` (prefers webp) for the preload srcset instead. The runtime never had `img.srcset` on Picture.
5. **JSON-LD switched to `data.seo.image`:** The JSON-LD schema's `image` field was previously `https://honeylink.nl${data.meta.image}` which would 404 after file moves. Switched to `data.seo.image` (same value the OG tag uses) so schema.org crawlers also see the hashed Picture URL.
6. **svelte.config.js precompress = part of Task 5:** The plan's Task 5 includes editing `svelte.config.js` to add `adapter({ precompress: true })`. Per constraint "Task 5 is a checkpoint:human-verify and you should stop before it", svelte.config.js was NOT touched in this run.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Plan's `heroImg.img.srcset` does not exist on Picture type**

- **Found during:** Task 4 (HeroSection preload). `svelte-check` reported: `Property 'srcset' does not exist on type '{ src: string; w: number; h: number; }'`.
- **Issue:** Plan instructed `<link rel="preload" imagesrcset={heroImg.img.srcset}>`. Inspecting `imagetools-core/dist/types.d.ts` (`export interface Picture`) confirmed `Picture.img` has only `src`, `w`, `h`. The `srcset` lives in `Picture.sources[format]`.
- **Fix:** Pick `webp` source (or fall back to the last source key) and use `heroImg.sources[preferredFormat]` as `imagesrcset`. Preserve `Picture.img.src` as the `href` fallback for browsers that don't read `imagesrcset`.
- **Files modified:** `src/lib/components/homepage/HeroSection.svelte`
- **Verification:** `svelte-check` 0 errors (after the fix). `grep 'rel="preload"' build/prerendered/index.html` shows the rendered link with `imagesrcset="/_app/immutable/assets/hero-illustration.DfJbX-Q_.webp 1x, /_app/immutable/assets/hero-illustration.dhooFGpG.webp 2x"`.
- **Committed in:** `0dbf6fc` (Task 4 commit)

**2. [Rule 3 - Blocking] Case markdown slugs do not match image folder names**

- **Found during:** Task 3 (first `npm run build` attempt). Build failed with `Error: 404 /images/cases/wan2connect/hero.jpg (linked from /cases)`.
- **Issue:** Case markdown filenames use long descriptive slugs (`hoe-honeylink-de-software-koppeling-...`) while case image folders use short company identifiers (`wan2connect`). My initial `getCaseHero(slug)` keyed by markdown slug, returning null for every case → CaseCard fell back to the stale `caseStudy.image` string which 404'd after the file moves.
- **Fix:** Changed `getCaseHero(slug)` → `getCaseHero(imagePath)` -- now parses the frontmatter `image` field (e.g. `/images/cases/wan2connect/hero.jpg`) to extract the folder segment (`wan2connect`). Blogs unaffected (folder name = slug for blogs).
- **Files modified:** `src/lib/assets/heroes.ts`, `src/lib/server/content.ts`, `src/routes/cases/[slug]/+page.ts`
- **Verification:** Subsequent `RESEND_API_KEY=stub npm run build` exits 0 with no 404 errors. `grep -oE '<picture' build/prerendered/cases.html | wc -l` = 5 (one per case card on the index).
- **Committed in:** `47622b1` (Task 3 commit)

**3. [Rule 2 - Missing critical] JSON-LD `image` field would 404 after file moves**

- **Found during:** Task 3, while reviewing `cases/[slug]/+page.svelte`. The plan focused on `og:image` but the page also emits a JSON-LD `Article` schema whose `image` was built from `data.meta.image` -- the same stale string.
- **Issue:** Search engines consume JSON-LD `image` URLs. After Task 3 moves the file, `https://honeylink.nl/images/cases/owl-integrations/hero.jpg` 404s for Googlebot etc.
- **Fix:** Switched both case and blog JSON-LD `image` to read from `data.seo.image` (the same optimized Picture URL the og:image uses).
- **Files modified:** `src/routes/cases/[slug]/+page.svelte`, `src/routes/blogs/[slug]/+page.svelte`
- **Verification:** Built HTML inspected: `<script type="application/ld+json">{...,"image":"https://honeylink.nl/_app/immutable/assets/hero.{hash}.jpeg",...}</script>`.
- **Committed in:** `47622b1` (Task 3 commit)

---

**Total deviations:** 3 auto-fixed (1 plan-API-mismatch bug, 1 blocking type issue, 1 missing-critical SEO)
**Impact on plan:** All three were necessary for the plan to function correctly. No scope creep. Documented for future plans referencing imagetools-core Picture shape.

## Issues Encountered

- **Empty static directories left behind by `git mv`:** Each `git mv` of folder contents leaves the parent directory in place. Manually `rmdir`'d after moves. No data lost.
- **Pre-existing `svelte-check` error for `RESEND_API_KEY`:** `src/lib/server/email.ts` references `$env/static/private` for `RESEND_API_KEY` which isn't set in this worktree. Confirmed pre-existing on clean HEAD before my changes -- not in scope.
- **GIF blog hero (`het-is-misschien-een-open-deur.../hero.gif`):** enhanced:img handles GIFs (emits AVIF/WebP variants alongside the GIF fallback). Verified by inspecting the built `<picture>` element.

## Deferred Items

- **Orphan duplicates of homepage images in `static/images/homepage/`** (`ai-agent.png`, `cta-bg.jpg`, `hero-illustration.png`). These predate this plan (Phase 03-03 moved sources to `src/lib/assets/homepage/` but left the static copies). Out of scope per "DIRECTLY caused by current task's changes". Documented in `.planning/quick/260519-g6h-implement-approved-image-performance-pla/deferred-items.md`. Recommended follow-up: `git rm -r static/images/homepage/`.

## Task 5 (Awaiting Human Verification)

Task 5 is a `checkpoint:human-verify gate="blocking"`. It requires:

1. Edit `svelte.config.js`: change `adapter()` → `adapter({ precompress: true })`.
2. Clean build: `rm -rf .svelte-kit build && npm run build`.
3. Verify build artefacts:
   - `ls build/client/_app/immutable/assets/ | grep -cE '\.avif$'` > 0 ✓ (already 73 from prior build)
   - `ls build/client/_app/immutable/assets/ | grep -cE '\.webp$'` > 0 ✓ (already 73)
   - `ls build/client/images/` should NOT contain `cases/`, `blogs/`, `testimonials/`, or raster `clients/` ✓ (verified)
4. Sanity-grep for stale references (all should be zero or only OG/JSON-LD):
   ```bash
   grep -rn '/images/testimonials/' src/ | grep -v '.md:'
   grep -rn '/images/clients/' src/ | grep -v 'webfabrikant.svg' | grep -v '.md:'
   grep -rn '/images/cases/' src/ | grep -v '.md:' | grep -v 'og/'
   grep -rn '/images/blogs/' src/ | grep -v '.md:' | grep -v 'og/'
   ```
5. Full Docker stack header check:
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   HASH=$(ls build/client/_app/immutable/assets/ | grep -m1 avif)
   curl -ksI https://localhost/_app/immutable/assets/$HASH | grep -i cache-control
   curl -ksI https://localhost/images/logo.png | grep -iE 'cache-control|vary'
   ```
   Expect: `_app/immutable/*` → `Cache-Control: public, max-age=31536000, immutable`; `/images/logo.png` → `Cache-Control: public, max-age=86400, stale-while-revalidate=604800` + `Vary: Accept`.
6. Lighthouse Performance audit on `/`, one `/cases/[slug]`, one `/blogs/[slug]`. Targets: LCP < 1.5s wired, CLS < 0.05, "Properly size images" + "Serve images in next-gen formats" passing.
7. Repeat-visit disk-cache test: load homepage twice in DevTools; second load's `_app/immutable/*` images should show "(disk cache)" with 0 bytes transferred.
8. Visual regression spot-check: homepage hero, testimonials, clients marquee, one case study, one blog post.

## Next Phase Readiness

- All code changes committed atomically. Task 5 can be executed by a human or a fresh agent with Docker access.
- `svelte.config.js` change for precompress is a 1-character edit (still in Task 5 scope).
- Deferred items file documents the orphan static homepage duplicates for a future cleanup plan.

## Self-Check: PASSED

- `Caddyfile` exists with new matchers: ✓
- `src/lib/assets/heroes.ts` exists: ✓
- Task commits exist:
  - `0c3712b`: ✓
  - `d2a0029`: ✓
  - `47622b1`: ✓
  - `0dbf6fc`: ✓
- `static/images/{cases,blogs}/` removed: ✓
- `static/images/testimonials/` removed: ✓
- `static/images/clients/webfabrikant.svg` preserved: ✓
- `static/images/{logo.png,honeylink-logo.png,og-default.jpg}` preserved: ✓
- Build exit 0: ✓ (last build at end of Task 4)
- Rendered HTML uses `_app/immutable/...` for og:image on case + blog pages: ✓
- 73 AVIF + 73 WebP variants in build output: ✓

---
*Phase: 260519-g6h*
*Completed: 2026-05-19*
