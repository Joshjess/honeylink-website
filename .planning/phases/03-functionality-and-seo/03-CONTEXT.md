# Phase 3: Functionality and SEO - Context

**Gathered:** 2026-03-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Working contact form with email delivery via Resend, comprehensive SEO meta tags and structured data on every page, sitemap.xml generation, and security hardening (CSP headers, rate limiting, input sanitization). Makes the site production-ready.

</domain>

<decisions>
## Implementation Decisions

### Contact Page Layout
- **D-01:** Two-column layout matching Framer structure — left side has heading, description text, and contact details (phone, email, address, KvK, BTW); right side has the contact form instead of the calendar widget
- **D-02:** Contact details preserved from Framer: phone 020 308 68 40, email info@honeylink.nl, address Marco Polostraat 275-3, 1056DN Amsterdam, KvK 96561556, BTW NL005216613B11
- **D-03:** FAQ section below the form area, reusing FaqAccordion/FaqItem components with contact-specific questions from Framer scrape
- **D-04:** Form fields: name, email, company, message (as specified in requirements)

### Post-Submission Behavior
- **D-05:** Inline success message on the same page (no redirect) — green confirmation banner replacing the form temporarily
- **D-06:** Error feedback shown inline below the form with field-level validation errors

### Email Delivery
- **D-07:** Form submissions sent to info@honeylink.nl
- **D-08:** No confirmation email to submitter — keep it simple, just deliver the lead to HoneyLink
- **D-09:** Email contains all form fields (name, email, company, message) with reply-to set to the submitter's email address
- **D-10:** Plain HTML email template — professional but simple, no heavy design

### SEO Meta Patterns
- **D-11:** Title format: "Page Name | HoneyLink" (page-first for SEO weight)
- **D-12:** Homepage title: "HoneyLink | Automation en AI Agency"
- **D-13:** Default OG image: use the HoneyLink logo or a branded social card image from static/images/
- **D-14:** Descriptions: page-specific Dutch descriptions for each page type — derived from existing page content/excerpts
- **D-15:** Blog posts use their frontmatter excerpt as meta description, featured image as OG image
- **D-16:** Case studies use their frontmatter excerpt as meta description, featured image as OG image

### Structured Data (JSON-LD)
- **D-17:** Organization schema on homepage (name, url, logo, contactPoint)
- **D-18:** Article schema on blog posts (headline, author, datePublished, image)
- **D-19:** Service schema on service pages (name, description, provider)
- **D-20:** BreadcrumbList on all inner pages

### Security & CSP
- **D-21:** No third-party analytics at launch — CSP can be strict (self + fonts only)
- **D-22:** CSP configured in hooks.server.ts using SvelteKit's handle hook for response headers
- **D-23:** Rate limiting applied only to the contact form action, not to page loads
- **D-24:** Resend API key stored in environment variable RESEND_API_KEY, never in client bundle

### Image Optimization
- **D-25:** @sveltejs/enhanced-img for automatic AVIF/WebP conversion at build time
- **D-26:** Apply to existing images already in use across the site (hero, team, blog, case images)

### Claude's Discretion
- Exact CSP directives and nonce strategy
- robots.txt content
- Sitemap route discovery configuration
- Form animation/transition details
- Email HTML template styling
- Enhanced-img srcset breakpoints

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project context
- `.planning/PROJECT.md` — Core value, constraints, key decisions
- `.planning/REQUIREMENTS.md` — CNTC-01 through CNTC-05, SEO-01 through SEO-08, SECR-01 through SECR-04
- `.planning/research/STACK.md` — Recommended stack versions for all Phase 3 packages

### Design reference
- `scripts/scraped-data/screenshots/contact.png` — Framer contact page desktop layout
- `scripts/scraped-data/screenshots/contact--mobile.png` — Framer contact page mobile layout
- `scripts/scraped-data/content/contact.json` — Contact page content (headings, paragraphs, contact details, FAQ questions)

### Existing code patterns
- `src/lib/components/ui/FaqAccordion.svelte` — Reusable FAQ component (already built in Phase 2)
- `src/lib/components/ui/FaqItem.svelte` — Individual accordion item component
- `src/routes/+layout.server.ts` — Root layout data provider with siteConfig
- `src/lib/data/navigation.ts` — Navigation structure (already includes /contact link)
- `src/app.html` — HTML template (needs meta tag injection points)

### URL preservation
- `sitemap.xml` — All 36 URLs that must appear in generated sitemap

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `FaqAccordion` + `FaqItem`: Accordion components ready for contact page FAQ section
- `PageHero`: Hero component used on service/about pages — may suit contact page header
- `Button`: Supports href and click variants — use for form submit
- `inview.ts`: Intersection observer action for scroll animations
- `ProseContent`: Markdown prose wrapper (not needed for contact form but available)

### Established Patterns
- Svelte 5 runes ($props, $state, $derived) — all new components must use runes syntax
- Tailwind v4 utility classes with custom brand tokens (brand-gold, brand-black, brand-white, brand-gray-dark)
- Page data loading via +page.server.ts (server) or +page.ts (universal)
- siteConfig available via root layout load (name, url, description)
- Blog/case metadata in frontmatter — source for per-page SEO meta

### Integration Points
- `src/routes/+layout.svelte` — needs MetaTags component integration for global SEO
- `src/routes/+layout.server.ts` — may need to provide SEO data to all pages
- `svelte.config.js` — CSP configuration option available in kit.csp
- `src/hooks.server.ts` — new file for security headers and rate limiting middleware
- Every existing page route — needs page-specific meta data added to load functions

</code_context>

<specifics>
## Specific Ideas

- Contact page replaces Framer's calendar booking widget with a traditional form — same two-column layout, form on right instead of calendar
- All contact details from Framer preserved verbatim (phone, email, address, KvK, BTW numbers)
- FAQ questions on contact page taken directly from Framer scrape content
- No third-party services at launch keeps CSP simple and strict

</specifics>

<deferred>
## Deferred Ideas

- Privacy-friendly analytics (Plausible/Umami) — tracked as ANLY-01 in v2 requirements
- Cookie consent banner — tracked as ANLY-02, only needed if analytics added
- Confirmation email to form submitter — can add later if needed

</deferred>

---

*Phase: 03-functionality-and-seo*
*Context gathered: 2026-03-21*
