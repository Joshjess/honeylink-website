# Project Research Summary

**Project:** HoneyLink Agency Website
**Domain:** SvelteKit agency website with Framer migration and file-based Markdown CMS
**Researched:** 2026-03-20
**Confidence:** HIGH

## Executive Summary

HoneyLink is a Dutch automation/AI agency migrating from Framer to a self-hosted SvelteKit site on Hetzner VPS. The site is content-marketing-focused (15 blog posts, 5 case studies, 7 service pages, contact form) with no database, no user accounts, and no admin UI. The right approach is a hybrid rendering strategy: prerender all content pages as static HTML at build time for speed and SEO, keep only the contact page as SSR for form actions and rate limiting. The full stack is well-researched and well-matched — Svelte 5 + SvelteKit 2 + Tailwind v4 + adapter-node, deployed behind Caddy on a Hetzner CPX11 — and every dependency has been confirmed on npm as of 2026-03-20.

The primary risk is the Framer-to-SvelteKit URL migration. HoneyLink has existing Google rankings and backlinks that will be destroyed by unmapped URLs returning 404. This must be addressed before any code is written: crawl the existing site, produce a URL mapping document, and implement redirects in hooks.server.ts for any URL that changes. The secondary risk is the mdsvex/Svelte 5 compatibility question documented in detail in the section below. All other risks are well-understood and have clear mitigations.

One important technical decision surfaces a disagreement between two research dimensions: whether to use mdsvex 0.12.7 or a custom unified/remark/rehype pipeline for Markdown processing. The stack researcher recommends mdsvex as the established, well-maintained solution. The pitfalls researcher flags potential Svelte 5 runes edge cases when Markdown files embed Svelte components. The resolution is to use mdsvex 0.12.7 with a strict content constraint (no embedded Svelte components in .md files), which eliminates the risk surface entirely. See the dedicated section below.

## Key Findings

### Recommended Stack

SvelteKit 2.55 with Svelte 5.54 forms the foundation. TypeScript 5.9.x is required — the 6.0 RC released March 6 2026 is not production-ready and must be avoided. Tailwind CSS v4.2 replaces all CSS configuration files and integrates via the Vite plugin, not PostCSS. The Node adapter (adapter-node 5.5) produces a standalone server for Hetzner VPS deployment. Caddy (automatic HTTPS) and PM2 (process management) handle the production infrastructure layer.

**Core technologies:**
- SvelteKit 2.55 + Svelte 5.54: Application framework with SSR, hybrid prerendering, and form actions
- TypeScript 5.9.x: Type safety — avoid 6.0 RC (released March 2026, not stable)
- Tailwind CSS v4.2 via @tailwindcss/vite: Utility CSS — Vite plugin only, not PostCSS
- @sveltejs/adapter-node 5.5: Required for SSR contact form on Hetzner VPS
- mdsvex 0.12.7: Markdown preprocessor — with plain-Markdown constraint; see Conflict Resolution
- remark-gfm 4.0.1 + rehype-slug 6.0.0 + rehype-autolink-headings 7.1.0: Markdown plugins
- Resend 6.9.4: Transactional email, simplest API, free tier covers contact form volume
- sveltekit-superforms 2.29.1 + Zod 4.3.6: Progressive-enhancement form with typed validation
- sveltekit-rate-limiter 0.7.0: In-memory rate limiting for contact form (same author as Superforms)
- svelte-meta-tags 4.5.0: Meta tags, Open Graph, and JSON-LD structured data
- super-sitemap 1.0.7: Auto-discovers routes for sitemap.xml
- @sveltejs/enhanced-img 0.10.4: Build-time AVIF/WebP image optimization (pre-1.0, actively maintained)
- Caddy 2.x: Reverse proxy with automatic Let's Encrypt — 2-line Caddyfile
- PM2 6.0.14: Node.js process manager with auto-restart, log rotation, cluster mode

See `.planning/research/STACK.md` for version rationale, alternatives considered, and configuration snippets.

### Expected Features

**Must have (table stakes):**
- Responsive design (mobile-first, Google mobile-first indexing)
- Fast page loads, LCP under 2s (prerendering + Tailwind v4 delivers this by default)
- SEO meta tags and Open Graph on every page
- Sitemap.xml covering all routes including dynamic blog/case slugs
- Working contact form with progressive enhancement and email delivery
- Blog listing and 15 individual post pages rendered from Markdown
- Case study listing and 5 individual case pages rendered from Markdown
- 7 service pages, about page (/over-ons), 3 legal pages (GDPR compliance)
- URL preservation from Framer (301 redirects for any changed URLs)
- HTTPS (Caddy handles automatically)

**Should have (differentiators):**
- Structured data / JSON-LD (Organization, Article, Service schemas) — most agencies skip this
- Prerendered content pages served as static HTML — faster than WordPress/Framer competitors
- Image optimization (AVIF/WebP) via enhanced-img
- Reading time estimate on blog posts
- Rate-limited contact form (signals security competence for an automation agency)
- CSP headers via SvelteKit built-in config
- Canonical URLs on every page

**Explicit anti-features — do not build:**
- Admin dashboard or CMS UI (git is the CMS)
- Database (content is file-based, contact form sends email only)
- User authentication, real-time features, i18n, newsletter, comment system, search

**Defer to v2+:**
- Newsletter signup, site-wide search, analytics (external script tag, not a feature to build)

See `.planning/research/FEATURES.md` for the complete feature table with complexity estimates.

### Architecture Approach

The architecture is straightforward: Caddy terminates HTTPS and reverse-proxies to a PM2-managed SvelteKit Node server on port 3000. Content (15 blogs, 5 cases) lives as Markdown files in /src/content/ and is compiled at build time by mdsvex, then loaded via Vite's `import.meta.glob` (no runtime filesystem reads). All content pages carry `export const prerender = true`. Only /contact remains as SSR to support form actions and in-memory rate limiting. Secrets (Resend API key) are isolated exclusively to server-only modules: +page.server.ts files and $lib/server/ — never +page.svelte or +page.ts.

**Major components:**
1. Caddy — TLS termination, HTTP/2, reverse proxy to localhost:3000
2. PM2 — auto-restart, log rotation, production env via ecosystem.config.cjs
3. SvelteKit Node server — SSR rendering, form actions, serves prerendered HTML from build/
4. mdsvex preprocessor — compiles .md files to Svelte components at build time
5. Vite glob import layer — loads all blog/case metadata without runtime disk I/O
6. Resend API (external) — email delivery, called from server-side form action only
7. Zod schemas — typed frontmatter validation for blogs/cases, typed contact form validation

**Key patterns to follow:**
- `import.meta.glob` for content loading, never `fs.readFile` at runtime
- Typed Zod frontmatter schemas per content type (validate at build time)
- Layout-level SEO with per-page overrides via load functions
- Hybrid prerendering: `export const prerender = true` on content pages, no export on /contact
- Secrets only in +page.server.ts and $lib/server/ files — SvelteKit enforces this at build time
- Svelte 5 runes syntax throughout — no `bind:` directives
- Route groups `(services)` and `(legal)` for filesystem organization without affecting URLs

See `.planning/research/ARCHITECTURE.md` for the full project structure tree, data flow diagrams, code examples for all 6 patterns, and anti-patterns to avoid.

### Critical Pitfalls

See `.planning/research/PITFALLS.md` for the full list with per-phase warnings.

1. **Broken URLs after Framer migration** — Crawl honeylink.nl before any code. Create a URL mapping document. Implement 301 redirects in hooks.server.ts. Verify in Google Search Console within 48 hours of DNS switch. This is the highest-impact risk.
2. **mdsvex + Svelte 5 edge cases** — See Conflict Resolution below. Mitigation: enforce plain Markdown (no embedded Svelte components in .md files). Test all 15 posts + 5 cases in Phase 2 before proceeding.
3. **Tailwind v4 @apply broken in Svelte style blocks** — Do not use @apply inside `<style>` blocks. Use utility classes in class attributes exclusively. If @apply is unavoidable, prepend `@reference "../../app.css";` to the style block.
4. **Resend API key leaked to client bundle** — Only import Resend in +page.server.ts and $lib/server/. Use `$env/static/private`. SvelteKit throws a build-time error if violated — do not suppress it.
5. **enhanced-img cannot process dynamic image paths** — Use enhanced:img only for static literal paths in .svelte templates. For blog/case cover images from Markdown frontmatter, pre-optimize with sharp CLI and serve from /static/images/.

## Conflict Resolution: mdsvex vs Custom Unified Pipeline

**The disagreement:**

The stack researcher recommends **mdsvex 0.12.7** as the standard, well-maintained Markdown solution for SvelteKit, citing active maintenance and documented Svelte 5 compatibility.

The pitfalls researcher flags **mdsvex + Svelte 5 runes edge cases** (Pitfall 2, rated Critical) and suggests using the unified/remark/rehype pipeline directly to avoid compilation surprises when Markdown files embed Svelte components.

**Analysis:**

Both researchers identify real considerations. mdsvex wraps unified/remark/rehype internally — the difference is whether the project uses mdsvex's abstraction layer or constructs the pipeline manually. The pitfall is specifically scoped to .md files that embed Svelte components using runes syntax, a pattern mdsvex's Markdown-to-Svelte compilation did not originally target. For plain Markdown content (no script blocks, no embedded components in .md files), this edge case does not arise.

A custom unified pipeline would require significant additional configuration, would forfeit mdsvex's Vite/SvelteKit integration, and would solve a problem that only exists if content authors write Svelte inside Markdown. For 15 blog posts and 5 case studies on an agency site, there is no compelling reason to use embedded Svelte components in .md files.

**Recommendation: Use mdsvex 0.12.7 with a strict content constraint.**

- Install and configure mdsvex 0.12.7 per the stack researcher's recommendation.
- Establish an enforced rule: .md files contain only plain Markdown — no script blocks, no embedded Svelte component syntax, no runes.
- Interactive or dynamic elements (if needed in the future) are built as standalone .svelte components and imported in +page.svelte wrappers, not inserted into .md files.
- This eliminates the entire risk surface the pitfalls researcher identified.
- If a future requirement genuinely demands embedded Svelte in Markdown, migrate to a custom unified pipeline at that point. The content files do not change; only the preprocessor changes.

**Confidence in this decision:** HIGH. The version (0.12.7) is confirmed stable. The pitfalls concern is valid but fully mitigated by the content constraint. Rolling a custom pipeline now adds implementation complexity for zero current benefit.

## Implications for Roadmap

### Phase 1: Foundation and Infrastructure Setup

**Rationale:** All subsequent phases depend on the project scaffold, Tailwind configuration, adapter setup, and layout system. The Framer URL crawl is a prerequisite — it must complete before creating any routes.
**Delivers:** Runnable SvelteKit project with Tailwind v4, TypeScript, adapter-node; global layout (header, footer, navigation); branded error pages (+error.svelte); static/robots.txt; URL mapping document from Framer crawl.
**Addresses:** Project setup, responsive layout, HTTPS groundwork, URL preservation prerequisite.
**Avoids:** Tailwind v4 @apply pitfall (establish utility-class-only convention from day one); adapter-static mistake (use adapter-node from initial scaffold); trailing slash inconsistency (configure trailingSlash in svelte.config.js once URL mapping is known).

### Phase 2: Content Migration (Markdown CMS)

**Rationale:** Blog posts and case studies are the site's primary SEO value and the bulk of the content work. The mdsvex pipeline and content loading utilities must be established before building any listing or detail pages. All 15 blog posts and 5 cases should be migrated and run through `npm run build` together before proceeding to Phase 3 — this is the validation gate for mdsvex/Svelte 5 compatibility.
**Delivers:** Typed Zod frontmatter schemas for blogs and cases; content loading utilities using import.meta.glob; blog listing and detail pages; case listing and detail pages; reading time calculation utility; all 15 blog posts and 5 cases in Markdown.
**Addresses:** Blog and case study pages (table stakes), reading time (differentiator).
**Avoids:** mdsvex + Svelte 5 edge cases (plain-Markdown rule established here, all content tested early); enhanced-img dynamic path issue (blog/case images pre-optimized to /static/images/ during content migration).
**Needs research phase:** No — mdsvex + import.meta.glob is a well-documented pattern with multiple community guides.

### Phase 3: Static Content Pages

**Rationale:** Service pages, about page, and legal pages are straightforward Svelte components. They share the layout system from Phase 1 and the component library established there. Building after content infrastructure means shared UI components (Card, Button) can be reused.
**Delivers:** 7 service pages, about page (/over-ons), 3 legal pages; route groups (services) and (legal); prerendering configured on all static pages.
**Addresses:** Service pages, about page, legal pages including GDPR compliance (all table stakes).
**Avoids:** Prerender + dynamic content mismatch (no form actions on these pages — safe to prerender).
**Needs research phase:** No — standard Svelte components with prerendering.

### Phase 4: Contact Form and Functionality

**Rationale:** The contact form is the site's sole lead generation mechanism and the only SSR page. Building it after all static content is complete isolates the Superforms + Resend + rate limiter integration and prevents prerender setting confusion.
**Delivers:** Progressive-enhancement contact form; Zod schema for contact data; server-side and client-side validation; Resend email delivery; rate limiting (5 submissions/IP/hour); Dutch-language form messages and error states.
**Addresses:** Contact form (table stakes), rate-limited form (differentiator).
**Avoids:** API key in client bundle (strict server-only file usage enforced); prerender on contact page (explicitly omit the prerender export).
**Needs research phase:** No — Superforms + Zod 4 adapter + Resend integration is documented by all three libraries.

### Phase 5: SEO and Performance

**Rationale:** SEO is best applied as a layer once all pages exist, ensuring complete coverage. Structured data requires accurate page content. Sitemap generation requires finalized routes. Image optimization applies to static component images established in earlier phases.
**Delivers:** svelte-meta-tags in root layout with per-page overrides; Open Graph images and meta; JSON-LD structured data (Organization on homepage, Article on blogs, Service on service pages); canonical URLs on every page; sitemap.xml via super-sitemap; enhanced-img on static .svelte templates; CSP headers via SvelteKit built-in config.
**Addresses:** SEO meta tags, Open Graph, sitemap, structured data, canonical URLs, image optimization, CSP (both table stakes and differentiators).
**Avoids:** Missing canonical URLs pitfall; missing robots.txt pitfall (confirm robots.txt from Phase 1 is complete); duplicate content signals.
**Needs research phase:** Narrow lookup only — JSON-LD schema type for a Dutch automation agency (LocalBusiness vs ProfessionalService) should be verified against schema.org before implementation.

### Phase 6: Deployment and Go-Live

**Rationale:** Deployment requires a complete, tested build. The URL redirect verification must happen immediately after DNS switch while Google Search Console data is fresh.
**Delivers:** Hetzner VPS provisioning; Caddy with automatic HTTPS (Caddyfile: `honeylink.nl { reverse_proxy localhost:3000 }`); PM2 with ecosystem.config.cjs (NODE_ENV=production, PORT=3000, max_memory_restart=500M); deploy script (git pull + npm ci + npm run build + pm2 restart); DNS cutover; redirect verification against URL mapping document; Google Search Console verification.
**Addresses:** HTTPS, URL preservation, production process management (table stakes).
**Avoids:** DNS before Caddy HTTPS pitfall (set DNS A record first, verify with dig, then start Caddy); PM2 without production env; build output missing after git pull; Google Search Console 404 errors post-migration.
**Needs research phase:** No — Caddy + PM2 + adapter-node on Hetzner is documented with multiple community guides from 2025-2026.

### Phase Ordering Rationale

- Phase 1 before everything: scaffold and layout system are universal dependencies; URL crawl is a prerequisite for all routing decisions.
- Phase 2 before Phase 3: content infrastructure (mdsvex, schemas, import.meta.glob) is established before building static pages that reuse shared components.
- Phase 4 after content: isolates the only SSR page to avoid prerender setting cross-contamination.
- Phase 5 after all pages: SEO applied once to a complete page set is less error-prone than retrofitting across incomplete content.
- Phase 6 last: requires a complete, tested build.
- Framer URL crawl must happen before Phase 1 routing work begins (blocking prerequisite).

### Research Flags

Phases with standard, well-documented patterns — skip research-phase:
- **Phase 1:** SvelteKit scaffold + Tailwind v4 Vite plugin setup is documented with an official guide.
- **Phase 2:** mdsvex + import.meta.glob pattern is documented (Joy of Code, official mdsvex docs). No research phase needed.
- **Phase 3:** Static Svelte pages with prerendering — core SvelteKit feature.
- **Phase 4:** Superforms + Zod 4 + Resend has documentation from all three libraries. Pattern is established.
- **Phase 6:** Caddy + PM2 + adapter-node on Hetzner VPS has a documented community guide from 2025-2026.

Phases needing targeted research during planning:
- **Phase 5 (Structured data):** JSON-LD schema type for a Dutch automation agency needs a narrow schema.org lookup. Not a full research phase — a targeted lookup at planning time is sufficient.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions confirmed on npm as of 2026-03-20. All libraries actively maintained. Every library has official documentation. |
| Features | HIGH | Feature set derived directly from HoneyLink PROJECT.md requirements and standard agency website patterns. No speculation. |
| Architecture | HIGH | SvelteKit-official patterns throughout — import.meta.glob, hybrid prerendering, form actions, server-only secrets. Documented core features. |
| Pitfalls | HIGH | Most pitfalls reflect verifiable SvelteKit/Tailwind v4 behavior. mdsvex edge case is real but fully mitigated by plain-Markdown constraint. |

**Overall confidence:** HIGH

### Gaps to Address

- **mdsvex Svelte 5 build behavior with existing 15 posts:** The pitfall is real but unquantified for plain Markdown. Validation gate: run `npm run build` after migrating all 15 posts in Phase 2, before starting Phase 3.
- **Framer URL structure:** Exact URL patterns of honeylink.nl are unknown until the pre-Phase-1 crawl. Redirect requirements and trailingSlash config cannot be finalized until the URL mapping document exists.
- **JSON-LD schema type for Dutch automation agency:** LocalBusiness vs Organization vs ProfessionalService. Narrow schema.org lookup needed before Phase 5 implementation.
- **@sveltejs/enhanced-img pre-1.0 stability:** If build-time issues arise, the fallback is sharp CLI pre-processing with standard img tags. Impact is low — only affects automatic AVIF/WebP generation.
- **TypeScript 6.0 RC:** Pin to 5.9.x now. If 6.0 exits RC before the project completes, evaluate at that point.
- **OG image strategy:** Static per-page OG images vs dynamically generated (satori). Static images work fine for launch — defer this decision.

## Sources

### Primary (HIGH confidence)
- [SvelteKit docs](https://svelte.dev/docs/kit/) — adapter-node, page options, form actions, CSP, images, SEO, project structure
- [Svelte npm](https://www.npmjs.com/package/svelte) — v5.54.0 confirmed
- [SvelteKit npm](https://www.npmjs.com/package/@sveltejs/kit) — v2.55.0 confirmed
- [mdsvex docs](https://mdsvex.pngwn.io/docs) — v0.12.7 confirmed
- [Tailwind CSS v4 announcement](https://tailwindcss.com/blog/tailwindcss-v4) — v4 stable, Vite plugin recommended
- [Resend SvelteKit docs](https://resend.com/docs/send-with-sveltekit) — v6.9.4
- [Superforms docs](https://superforms.rocks/) — v2.29.1, Zod 4 adapter
- [sveltekit-rate-limiter GitHub](https://github.com/ciscoheat/sveltekit-rate-limiter) — v0.7.0
- [Caddy automatic HTTPS docs](https://caddyserver.com/docs/automatic-https)
- [PM2 docs](https://pm2.keymetrics.io/) — v6.0.14
- [TypeScript npm](https://www.npmjs.com/package/typescript) — v5.9.3
- [Zod npm](https://www.npmjs.com/package/zod) — v4.3.6
- [svelte-meta-tags npm](https://www.npmjs.com/package/svelte-meta-tags) — v4.5.0
- [super-sitemap GitHub](https://github.com/jasongitmail/super-sitemap) — v1.0.7
- [@sveltejs/enhanced-img npm](https://www.npmjs.com/package/@sveltejs/enhanced-img) — v0.10.4

### Secondary (MEDIUM confidence)
- [Tailwind v4 SvelteKit Vite plugin guide](https://dev.to/fedor-pasynkov/setting-up-tailwind-css-v4-in-sveltekit-the-vite-plugin-way-a-guide-based-on-real-issues-380n) — @apply breakage in Svelte style blocks confirmed
- [SvelteKit Hetzner VPS deployment guide](https://dev.to/mandrasch/deploy-sveltekit-with-ssr-on-coolify-hetzner-vps-24c5) — Caddy + PM2 deployment pattern
- [SvelteKit Docker containerization (Feb 2026)](https://oneuptime.com/blog/post/2026-02-08-how-to-containerize-a-sveltekit-application-with-docker/view)
- [SvelteKit Markdown blog guide (Joy of Code)](https://joyofcode.xyz/sveltekit-markdown-blog) — import.meta.glob pattern
- [SvelteKit structured data guide](https://sveltekit.io/blog/structured-data) — JSON-LD via svelte-meta-tags
- [SvelteKit security headers guide](https://edoverflow.com/2023/sveltekit-security-headers/)
- HoneyLink PROJECT.md requirements

### Tertiary (LOW confidence — validate during implementation)
- [mdsvex GitHub](https://github.com/pngwn/MDsveX) — Svelte 5 edge case behavior with embedded components; confirmed as known risk, specific runes compatibility in .md files not comprehensively tested
- schema.org — JSON-LD schema type selection for Dutch automation agency; needs targeted lookup

---
*Research completed: 2026-03-20*
*Synthesized from: STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md*
*Ready for roadmap: yes*
