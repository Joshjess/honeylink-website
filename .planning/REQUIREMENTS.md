# Requirements: HoneyLink Website

**Defined:** 2026-03-20
**Core Value:** Faithfully present HoneyLink's services and case studies with fast load times, strong SEO, and professional appearance -- replacing Framer without losing content, URLs, or search rankings.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUN-01**: SvelteKit project scaffolded with Svelte 5, TypeScript, Tailwind v4, adapter-node
- [x] **FOUN-02**: Global layout with header, footer, and navigation matching current site structure
- [x] **FOUN-03**: Responsive design working across mobile, tablet, and desktop breakpoints
- [x] **FOUN-04**: Homepage migrated from Framer with existing design (small tweaks allowed)

### Content

- [x] **CONT-01**: Markdown CMS pipeline for blog posts with frontmatter schema (title, date, slug, excerpt, image, author)
- [x] **CONT-02**: Blog listing page at /blogs showing all posts with pagination or scroll
- [x] **CONT-03**: Individual blog post pages at /blogs/[slug] rendered from Markdown
- [x] **CONT-04**: All 15 existing blog posts migrated from Framer to Markdown files
- [x] **CONT-05**: Markdown CMS pipeline for case studies with frontmatter schema (title, client, industry, slug, excerpt, image)
- [x] **CONT-06**: Case study listing page at /cases showing all cases
- [x] **CONT-07**: Individual case study pages at /cases/[slug] rendered from Markdown
- [x] **CONT-08**: All 5 existing case studies migrated from Framer to Markdown files
- [x] **CONT-09**: Reading time estimate displayed on blog posts

### Services

- [ ] **SERV-01**: /automation service page migrated from Framer
- [ ] **SERV-02**: /data-verrijking service page migrated from Framer
- [ ] **SERV-03**: /api service page migrated from Framer
- [ ] **SERV-04**: /maatwerk-software service page migrated from Framer
- [ ] **SERV-05**: /offerte-automatisering service page migrated from Framer
- [ ] **SERV-06**: /ai-agent service page migrated from Framer
- [ ] **SERV-07**: /chatbot service page migrated from Framer

### Static Pages

- [x] **STAT-01**: /over-ons (about) page migrated from Framer
- [x] **STAT-02**: /terms-conditions legal page migrated from Framer
- [x] **STAT-03**: /betalings-voorwaarden legal page migrated from Framer
- [x] **STAT-04**: /privacy-policy legal page migrated from Framer

### Contact

- [ ] **CNTC-01**: Contact form at /contact with name, email, company, message fields
- [ ] **CNTC-02**: Form validation with Superforms + Zod (client and server-side)
- [ ] **CNTC-03**: Email delivery of form submissions via Resend
- [ ] **CNTC-04**: Rate limiting on contact form (5 submissions per IP per hour)
- [ ] **CNTC-05**: Success/error feedback after form submission

### SEO

- [ ] **SEO-01**: All 36 existing URLs preserved with identical paths (no trailing slash changes)
- [ ] **SEO-02**: Meta tags (title, description) on every page
- [ ] **SEO-03**: Open Graph and Twitter card meta tags on every page
- [ ] **SEO-04**: Auto-generated sitemap.xml with all routes
- [ ] **SEO-05**: Canonical URLs on all pages
- [ ] **SEO-06**: Structured data (JSON-LD) -- Organization on homepage, Article on blogs, Service on service pages
- [ ] **SEO-07**: robots.txt configured correctly
- [ ] **SEO-08**: Image optimization with AVIF/WebP automatic conversion

### Security

- [ ] **SECR-01**: CSP headers configured in hooks.server.ts
- [ ] **SECR-02**: HTTPS enforced via Caddy with automatic Let's Encrypt certificates
- [ ] **SECR-03**: Input sanitization on contact form
- [ ] **SECR-04**: Environment variables for secrets (Resend API key) -- never in client bundle

### Deployment

- [ ] **DEPL-01**: Hetzner VPS provisioned and configured
- [ ] **DEPL-02**: Caddy reverse proxy with automatic HTTPS
- [ ] **DEPL-03**: PM2 process management for Node.js
- [ ] **DEPL-04**: Build and deployment pipeline (git push -> build -> restart)
- [ ] **DEPL-05**: DNS migration from Framer to Hetzner VPS

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Content

- **ECNT-01**: Dark/light mode toggle
- **ECNT-02**: Blog post categories/tags with filtering
- **ECNT-03**: Related posts on blog post pages
- **ECNT-04**: RSS feed for blog posts
- **ECNT-05**: Social share buttons on blog/case pages

### Analytics

- **ANLY-01**: Privacy-friendly analytics (Plausible or Umami)
- **ANLY-02**: Cookie consent banner (required if analytics added)

### Communication

- **COMM-01**: Newsletter signup integration
- **COMM-02**: Email notification system for new blog posts

## Out of Scope

| Feature | Reason |
|---------|--------|
| Admin dashboard / CMS UI | One person edits content -- Markdown files in repo are sufficient |
| User authentication | No user accounts needed -- pure public site |
| Real-time features (WebSocket) | Zero use case for a static content site |
| Database | No dynamic data -- contact form sends email, content is Markdown |
| Multi-language (i18n) | Dutch only for now -- clean structure allows adding later |
| Comment system on blogs | Rarely used on agency blogs, attracts spam, moderation overhead |
| Search functionality | 15 blog posts don't warrant a search feature |
| Quote calculator / pricing | Contact form is the sole entry point for leads |
| Video hosting | Storage/bandwidth costs, use embedded YouTube/Vimeo if needed |
| AI chatbot on site | Scope creep -- contact form is the lead channel |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 | Complete |
| FOUN-02 | Phase 1 | Complete |
| FOUN-03 | Phase 1 | Complete |
| FOUN-04 | Phase 1 | Complete |
| CONT-01 | Phase 2 | Complete |
| CONT-02 | Phase 2 | Complete |
| CONT-03 | Phase 2 | Complete |
| CONT-04 | Phase 2 | Complete |
| CONT-05 | Phase 2 | Complete |
| CONT-06 | Phase 2 | Complete |
| CONT-07 | Phase 2 | Complete |
| CONT-08 | Phase 2 | Complete |
| CONT-09 | Phase 2 | Complete |
| SERV-01 | Phase 2 | Pending |
| SERV-02 | Phase 2 | Pending |
| SERV-03 | Phase 2 | Pending |
| SERV-04 | Phase 2 | Pending |
| SERV-05 | Phase 2 | Pending |
| SERV-06 | Phase 2 | Pending |
| SERV-07 | Phase 2 | Pending |
| STAT-01 | Phase 2 | Complete |
| STAT-02 | Phase 2 | Complete |
| STAT-03 | Phase 2 | Complete |
| STAT-04 | Phase 2 | Complete |
| CNTC-01 | Phase 3 | Pending |
| CNTC-02 | Phase 3 | Pending |
| CNTC-03 | Phase 3 | Pending |
| CNTC-04 | Phase 3 | Pending |
| CNTC-05 | Phase 3 | Pending |
| SEO-01 | Phase 3 | Pending |
| SEO-02 | Phase 3 | Pending |
| SEO-03 | Phase 3 | Pending |
| SEO-04 | Phase 3 | Pending |
| SEO-05 | Phase 3 | Pending |
| SEO-06 | Phase 3 | Pending |
| SEO-07 | Phase 3 | Pending |
| SEO-08 | Phase 3 | Pending |
| SECR-01 | Phase 3 | Pending |
| SECR-02 | Phase 3 | Pending |
| SECR-03 | Phase 3 | Pending |
| SECR-04 | Phase 3 | Pending |
| DEPL-01 | Phase 4 | Pending |
| DEPL-02 | Phase 4 | Pending |
| DEPL-03 | Phase 4 | Pending |
| DEPL-04 | Phase 4 | Pending |
| DEPL-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 46 total
- Mapped to phases: 46
- Unmapped: 0

---
*Requirements defined: 2026-03-20*
*Last updated: 2026-03-20 after roadmap creation*
