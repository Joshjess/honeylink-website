# Phase 1: Foundation - Context

**Gathered:** 2026-03-20
**Status:** Ready for planning

<domain>
## Phase Boundary

SvelteKit project scaffold with Svelte 5, TypeScript, Tailwind v4, and adapter-node. Global layout with header, footer, and navigation. Responsive design across breakpoints. Homepage migrated from Framer with modernized hero section. Automated content/image scraping from honeylink.nl as a build step for this and later phases.

</domain>

<decisions>
## Implementation Decisions

### Navigation & Header
- **D-01:** Match the current Framer navigation structure for desktop (replicate link order, grouping, dropdown behavior)
- **D-02:** Hamburger menu on mobile -- classic 3-line icon with slide-out panel
- **D-03:** Sticky header -- stays visible when scrolling down on all breakpoints
- **D-04:** Footer matches the current Framer footer layout and links

### Design System
- **D-05:** Color palette extracted from the current Framer site CSS -- replicate exact hex values into Tailwind config
- **D-06:** Typography matches Framer fonts -- use the same typefaces (self-hosted for performance)
- **D-07:** Subtle fade-in scroll animations on section entry -- not distracting, modern feel
- **D-08:** Tailwind default spacing scale for component padding/margins -- no custom spacing tokens needed

### Homepage Layout
- **D-09:** Hero section modernized -- same content (headline, subtext, CTA) but improved layout/sizing compared to Framer
- **D-10:** Homepage sections (services, testimonials, etc.) keep the same order and structure as current Framer site
- **D-11:** Primary CTA buttons on homepage link to /contact

### Content Scraping
- **D-12:** Automated scraping via Playwright -- visit each page programmatically, extract text content and DOM structure
- **D-13:** Download all images from Framer site, optimize locally (AVIF/WebP conversion handled in Phase 3)
- **D-14:** Take full-page screenshots of every Framer page as design reference for side-by-side comparison during development

### Claude's Discretion
- Exact animation timing and easing curves for scroll fade-ins
- Responsive breakpoint values (Tailwind defaults likely sufficient)
- Component file organization within src/lib/components/
- Scraping script output format (JSON, Markdown, or structured directories)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project context
- `.planning/PROJECT.md` -- Core value, constraints, key decisions
- `.planning/REQUIREMENTS.md` -- FOUN-01 through FOUN-04 requirements for this phase
- `.planning/research/STACK.md` -- Recommended stack: SvelteKit 2.55, Svelte 5.54, Tailwind v4.2, adapter-node
- `.planning/research/ARCHITECTURE.md` -- Hybrid rendering strategy, project layout conventions
- `.planning/research/PITFALLS.md` -- Svelte 5 runes enforcement, Tailwind v4 @apply limitation, URL preservation

### Framer site reference
- `sitemap.xml` -- All 36 URLs that must be preserved (local copy in project root)

No external specs -- requirements fully captured in decisions above and research documents.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None -- greenfield project, no existing code

### Established Patterns
- None yet -- this phase establishes the patterns (Svelte 5 runes, Tailwind v4 utility classes, component structure)

### Integration Points
- Scraping output feeds into Phase 2 (Content and Pages) for Markdown conversion
- Layout components (Header, Footer, Nav) used by every subsequent phase
- Tailwind config (colors, fonts) used by all pages across all phases

</code_context>

<specifics>
## Specific Ideas

- Navigation should replicate the current Framer site's exact structure -- scrape to understand it before building
- Hero section should feel like an improvement over Framer, not a downgrade -- modernize sizing and layout
- Full-page screenshots serve as the "acceptance criteria" visual reference during development
- Fonts should be self-hosted (no Google Fonts CDN dependency) for privacy and performance

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-20*
