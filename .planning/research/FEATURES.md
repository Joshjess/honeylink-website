# Feature Landscape

**Domain:** Agency website with file-based Markdown CMS
**Researched:** 2026-03-20

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Responsive design (mobile/desktop) | 70%+ traffic is mobile. Google uses mobile-first indexing. | Medium | Tailwind responsive utilities make this straightforward. Match Framer breakpoints. |
| Fast page loads (<2s LCP) | Users bounce after 3s. Core Web Vitals affect SEO ranking. | Low | SvelteKit SSR + prerendering + Tailwind v4 (tiny CSS) delivers this by default. |
| SEO meta tags on every page | Google uses title/description for SERP display. Missing = invisible. | Low | svelte-meta-tags component in +layout.svelte with per-page overrides from load functions. |
| Open Graph / Twitter cards | Links shared on social media need proper previews. Agency credibility. | Low | Part of svelte-meta-tags. OG image, title, description per page. |
| Sitemap.xml | Helps search engines discover all pages. Required for 30+ page site. | Low | super-sitemap auto-generates from routes + dynamic blog/case slugs. |
| Working contact form | Primary lead generation mechanism. No form = no business. | Medium | Superforms + Zod validation + Resend email delivery. Progressive enhancement. |
| Blog listing + individual posts | 15 existing posts. Content marketing is core to agency visibility. | Medium | mdsvex renders .md files as Svelte components. Listing page reads frontmatter. |
| Case study listing + individual cases | 5 existing cases. Social proof for potential clients. | Medium | Same pattern as blog. Different frontmatter schema (client, industry, results). |
| Service pages (7 pages) | Core service offering pages. Organic search entry points. | Low | Static Svelte components. Design-heavy, content from Framer scrape. |
| URL preservation (301 redirects if needed) | Existing Google rankings and backlinks must not break. | Low | SvelteKit routing matches existing URL structure. Add redirects in hooks.server.ts if any URLs change. |
| HTTPS | Browser security warnings without it. Google ranking signal. | Low | Caddy handles automatically with Let's Encrypt. |
| Legal pages (3) | GDPR compliance (Dutch law). Privacy policy, terms, payment terms. | Low | Static .svelte or .md pages. Content from existing site. |

## Differentiators

Features that set the product apart from a basic agency website.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Structured data (JSON-LD) | Rich snippets in Google (star ratings, breadcrumbs, FAQ). Most agency sites skip this. | Medium | svelte-meta-tags JsonLd component. Organization schema on homepage, Article on blogs, Service on service pages. |
| Prerendered blog/case pages | Near-instant page loads. Static HTML served from disk via Caddy. Competitors using WordPress/Framer are slower. | Low | Set `export const prerender = true` on content pages. SvelteKit generates HTML at build time. |
| Image optimization (AVIF/WebP) | Smaller images = faster loads. Most agency sites serve unoptimized PNGs/JPGs. | Low | @sveltejs/enhanced-img handles at build time. Automatic format negotiation. |
| Reading time estimate on blog posts | Small UX touch that signals content quality and respects reader's time. | Low | Calculate from word count in frontmatter or load function. ~200 words/min. |
| Rate-limited contact form | Prevents spam abuse. Shows technical proficiency (meta for an automation agency). | Low | sveltekit-rate-limiter in form action. 5 submissions per IP per hour. |
| CSP headers | XSS protection. Signals security competence for an agency that builds software. | Low | SvelteKit built-in CSP config. Nonces auto-generated. |
| Canonical URLs | Prevents duplicate content penalties when URLs have query params or trailing slashes. | Low | svelte-meta-tags supports canonical. Set in layout. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Admin dashboard / CMS UI | Massive complexity for minimal value. Only one person edits content. | Edit Markdown files directly in the repo. Git is the CMS. |
| User authentication | No user accounts needed. No gated content. Pure public site. | N/A -- no login flows. |
| Real-time features (WebSocket/SSE) | Adds server complexity. Zero use case for a static content site. | N/A -- standard request/response. |
| Database | No dynamic data to store. Contact form sends email, does not persist. | Resend for email delivery. Markdown files for content. |
| i18n / multi-language | Dutch only for now. i18n adds routing complexity and translation burden. | Build with clean component structure so i18n can be added later if needed. |
| Newsletter signup / email list | Scope creep. Can be added later with Resend audience or external tool. | Contact form is the sole lead capture for now. |
| Analytics dashboard | Use existing third-party analytics (Plausible, Umami, or Google Analytics). | Add a script tag in app.html or +layout.svelte. Not a feature to build. |
| Quote calculator / pricing tool | Out of scope per PROJECT.md. Contact form is the entry point. | Informational service pages only. |
| Comment system on blog posts | Rarely used on agency blogs. Attracts spam. Moderation overhead. | N/A -- no comments. |
| Search functionality | 15 blog posts and 5 cases do not warrant a search feature. | Simple category/tag filtering if needed later. |

## Feature Dependencies

```
Tailwind CSS setup --> All page layouts
mdsvex setup --> Blog posts, Case studies
Blog/Case frontmatter schema --> Blog listing, Case listing, Sitemap, Structured data
Resend API key --> Contact form email delivery
Contact form (Superforms + Zod) --> Rate limiting
svelte-meta-tags in layout --> All pages get meta tags
URL structure finalized --> Sitemap generation, Redirect rules
Image assets scraped from Framer --> Image optimization with enhanced-img
```

## MVP Recommendation

**Prioritize (Phase 1 - Foundation):**
1. SvelteKit project setup with Tailwind v4, TypeScript, adapter-node
2. Layout system (header, footer, navigation)
3. Homepage migration from Framer

**Prioritize (Phase 2 - Content):**
4. mdsvex setup with blog/case frontmatter schemas
5. Blog listing + individual post pages (15 posts)
6. Case study listing + individual case pages (5 cases)
7. 7 service pages
8. About page, legal pages

**Prioritize (Phase 3 - Functionality):**
9. Contact form with Superforms + Zod + Resend
10. Rate limiting on contact form
11. SEO: meta tags, Open Graph, structured data, sitemap
12. Image optimization

**Prioritize (Phase 4 - Deployment):**
13. CSP headers and security hardening
14. Hetzner VPS setup with Caddy + PM2
15. CI/CD pipeline
16. URL verification and redirect rules

**Defer:**
- Newsletter signup: Add only when there is content strategy to support it
- Search: Not needed at current content volume
- Analytics: External tool, add script tag after launch

## Sources

- [SvelteKit SEO docs](https://svelte.dev/docs/kit/seo)
- [SvelteKit page options (prerender)](https://svelte.dev/docs/kit/page-options)
- [Superforms rate limiting guide](https://superforms.rocks/rate-limiting)
- [Resend SvelteKit integration](https://resend.com/docs/send-with-sveltekit)
- [SvelteKit structured data guide](https://sveltekit.io/blog/structured-data)
- [SvelteKit images docs](https://svelte.dev/docs/kit/images)
- HoneyLink PROJECT.md requirements
