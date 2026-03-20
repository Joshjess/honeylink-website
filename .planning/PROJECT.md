# HoneyLink Website

## What This Is

A self-hosted SvelteKit website for HoneyLink, a Dutch automation and AI agency. The site replaces the current Framer-hosted honeylink.nl with an equivalent design, file-based Markdown content management for blogs and case studies, and a contact form with email delivery. Deployed on a VPS (Hetzner).

## Core Value

The website must faithfully present HoneyLink's services and case studies with fast load times, strong SEO, and a professional appearance — replacing Framer without losing any existing content, URLs, or search rankings.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Migrate all 7 service pages from Framer to SvelteKit (automation, data-verrijking, API, maatwerk-software, offerte-automatisering, ai-agent, chatbot)
- [ ] Migrate homepage with existing design (small tweaks allowed)
- [ ] Migrate about page (/over-ons)
- [ ] Migrate contact page with email-delivery form (e.g. Resend, Mailgun)
- [ ] File-based Markdown CMS for blog posts (15 existing posts)
- [ ] File-based Markdown CMS for case studies (5 existing cases)
- [ ] Blog listing page (/blogs) with all posts
- [ ] Cases listing page (/cases) with all case studies
- [ ] Preserve all existing URL structure for SEO (/over-ons, /blogs/slug, /cases/slug, etc.)
- [ ] 3 legal pages (terms-conditions, betalings-voorwaarden, privacy-policy)
- [ ] SEO: meta tags, Open Graph, structured data, sitemap.xml generation
- [ ] Security: CSP headers, input sanitization, rate limiting on forms, HTTPS
- [ ] Responsive design matching current site's mobile/desktop layouts
- [ ] VPS deployment setup (Hetzner) with Node adapter
- [ ] Latest SvelteKit, Svelte 5, and dependency versions

### Out of Scope

- Multi-language / i18n — Dutch only for now
- Custom admin dashboard — Markdown files edited directly in repo
- OAuth or user authentication — no user accounts needed
- Real-time features — static/SSR site
- Quote request form on offerte page — informational only, contact form is the entry point

## Context

- Current site: honeylink.nl hosted on Framer (paid subscription)
- Domain: honeylink.nl
- Language: Dutch
- Current content: 7 service pages, 1 about, 1 contact, 5 cases, 15 blogs, 3 legal pages
- The site will be scraped page-by-page from the current Framer site to extract content and design
- Blog and case content migrated to Markdown files with frontmatter metadata
- Svelte 5 syntax required (no bind:, runes-based)

## Constraints

- **Tech stack**: SvelteKit with Svelte 5, latest stable versions
- **Hosting**: Self-hosted VPS on Hetzner with Node adapter
- **Design**: Closely match existing Framer design with minor improvements
- **SEO**: Zero broken links — all current URLs must work after migration
- **Security**: CSP headers, sanitized inputs, rate limiting, HTTPS enforcement
- **Language**: Dutch only, English variable/file/class names in code

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| SvelteKit over Next.js/Nuxt | User's preferred framework, Svelte 5 syntax specified in guidelines | — Pending |
| File-based Markdown over headless CMS | Simplicity, no external service dependency, full control, free | — Pending |
| VPS over serverless | Full control, cost-effective for a mostly static site | — Pending |
| Preserve URL structure | SEO continuity, no broken links from Google/backlinks | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-20 after initialization*
