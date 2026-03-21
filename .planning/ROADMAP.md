# Roadmap: HoneyLink Website

## Overview

Migrate honeylink.nl from Framer to a self-hosted SvelteKit site on Hetzner VPS. Phase 1 scaffolds the project and establishes the layout system with homepage. Phase 2 migrates all content: Markdown CMS for blogs and cases, 7 service pages, about page, and legal pages. Phase 3 adds the contact form, SEO layer, and security hardening across all pages. Phase 4 provisions the VPS, deploys, and cuts over DNS.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - SvelteKit scaffold, global layout, responsive design, and homepage
- [ ] **Phase 2: Content and Pages** - Markdown CMS for blogs/cases, all 7 service pages, about page, and 3 legal pages
- [ ] **Phase 3: Functionality and SEO** - Contact form with email delivery, SEO meta/sitemap/structured data, and security headers
- [ ] **Phase 4: Deployment** - Hetzner VPS provisioning, Caddy reverse proxy, PM2 process management, deploy pipeline, and DNS cutover

## Phase Details

### Phase 1: Foundation
**Goal**: A runnable SvelteKit project with global layout, responsive design, and homepage that matches the current Framer site
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` serves a SvelteKit app with Svelte 5, TypeScript, and Tailwind v4 working
  2. Every page displays a header with navigation and footer matching the current honeylink.nl structure
  3. The homepage at / renders content matching the current Framer homepage design
  4. The layout adapts correctly between mobile, tablet, and desktop screen widths
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md -- Scaffold SvelteKit project and run Playwright scraper to capture Framer site
- [x] 01-02-PLAN.md -- Global layout with sticky header, responsive navigation, and footer
- [x] 01-03-PLAN.md -- Homepage with all sections matching honeylink.nl

### Phase 2: Content and Pages
**Goal**: Every content page on honeylink.nl exists in the SvelteKit site -- all 16 blog posts, 5 case studies, 7 service pages, about page, and 3 legal pages are browsable
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08, CONT-09, SERV-01, SERV-02, SERV-03, SERV-04, SERV-05, SERV-06, SERV-07, STAT-01, STAT-02, STAT-03, STAT-04
**Success Criteria** (what must be TRUE):
  1. Visiting /blogs shows a listing of all 16 blog posts with titles, excerpts, and dates
  2. Visiting /blogs/[any-existing-slug] renders the full blog post from Markdown with reading time displayed
  3. Visiting /cases shows a listing of all 5 case studies with titles and excerpts
  4. Visiting /cases/[any-existing-slug] renders the full case study from Markdown
  5. All 7 service pages (/automation, /data-verrijking, /api, /maatwerk-software, /offerte-automatisering, /ai-agent, /chatbot), /over-ons, and 3 legal pages (/terms-conditions, /betalings-voorwaarden, /privacy-policy) render with content matching the Framer originals
**Plans**: 6 plans

Plans:
- [x] 02-01-PLAN.md -- mdsvex pipeline, content types, content helpers, and 9 shared UI components
- [x] 02-02-PLAN.md -- Migrate 16 blog posts to Markdown and create blog listing + post routes
- [x] 02-03-PLAN.md -- Migrate 5 case studies to Markdown and create case listing + post routes
- [x] 02-04-PLAN.md -- Create all 7 service pages with typed content data and shared layout
- [x] 02-05-PLAN.md -- About page with team/mission/FAQ and 3 legal pages from Markdown
- [x] 02-06-PLAN.md -- Visual verification checkpoint for all content pages

### Phase 3: Functionality and SEO
**Goal**: The site has a working contact form that delivers email, comprehensive SEO coverage on every page, and security hardening -- making it production-ready
**Depends on**: Phase 2
**Requirements**: CNTC-01, CNTC-02, CNTC-03, CNTC-04, CNTC-05, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08, SECR-01, SECR-02, SECR-03, SECR-04
**Success Criteria** (what must be TRUE):
  1. Visiting /contact shows a form with name, email, company, and message fields that validates input and shows clear success/error feedback
  2. Submitting the contact form delivers an email to the HoneyLink inbox via Resend
  3. Submitting the form more than 5 times from the same IP within an hour is rejected with a rate-limit message
  4. Every page has correct meta title, description, Open Graph tags, canonical URL, and relevant JSON-LD structured data visible in page source
  5. Visiting /sitemap.xml returns a valid sitemap listing all routes including blog and case slugs
**Plans**: 4 plans

Plans:
- [ ] 03-01-PLAN.md -- Contact form with Superforms + Zod validation, Resend email delivery, rate limiting, and FAQ section
- [ ] 03-02-PLAN.md -- SEO meta tags on all pages via svelte-meta-tags, sitemap.xml endpoint, robots.txt, OG default image
- [ ] 03-03-PLAN.md -- Security headers (CSP) in hooks.server.ts and enhanced-img image optimization
- [ ] 03-04-PLAN.md -- JSON-LD structured data on all pages and visual verification checkpoint

### Phase 4: Deployment
**Goal**: The site is live at honeylink.nl on Hetzner VPS with automatic HTTPS, process management, and a repeatable deploy pipeline
**Depends on**: Phase 3
**Requirements**: DEPL-01, DEPL-02, DEPL-03, DEPL-04, DEPL-05
**Success Criteria** (what must be TRUE):
  1. Visiting https://honeylink.nl serves the SvelteKit site with a valid TLS certificate
  2. The Node.js process auto-restarts after a crash (PM2 process management)
  3. Running the deploy script (git push or manual trigger) builds and restarts the site without downtime
  4. All 36 existing URLs from the Framer site resolve correctly (no 404s for previously indexed pages)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | - |
| 2. Content and Pages | 6/6 | Complete | - |
| 3. Functionality and SEO | 0/4 | Planning complete | - |
| 4. Deployment | 0/2 | Not started | - |
