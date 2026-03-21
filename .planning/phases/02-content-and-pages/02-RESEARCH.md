# Phase 2: Content and Pages - Research

**Researched:** 2026-03-21
**Domain:** Markdown CMS, SvelteKit content routing, page migration
**Confidence:** HIGH

## Summary

Phase 2 requires building three distinct content systems: (1) a Markdown CMS pipeline for blogs and case studies using mdsvex with `import.meta.glob` dynamic loading, (2) seven service pages as structured Svelte components with shared sections (hero, features, FAQ accordion, testimonials, CTA), and (3) static pages (about, three legal pages) mixing Svelte components and prose content. All content originates from the Framer scrape in `scripts/scraped-data/content/` (JSON files) and `scripts/scraped-data/images/` (58 downloaded images).

The project already has a solid Phase 1 foundation: Svelte 5 with runes, Tailwind v4 CSS-first config, reusable components (CtaSection, TestimonialsSection, ClientsSection, Button), an `inview` action for scroll animations, and a responsive layout with Header/Footer. mdsvex 0.12.7 is the established choice with a "plain-Markdown constraint" (no embedded Svelte components in .md files). The primary challenge is content volume: 16 blog posts (not 15 -- the scrape captured 16), 5 case studies, 7 service pages, 1 about page, and 3 legal pages must all be migrated from scraped JSON to either Markdown files or Svelte route components.

**Primary recommendation:** Use mdsvex for blog/case Markdown rendering with `import.meta.glob` for dynamic slug routing. Build service pages as structured Svelte route components (not Markdown) because they contain complex layouts with hero gradients, feature card grids, FAQ accordions, testimonials, and mini CTAs. Extract shared service-page patterns into reusable components (PageHero, FaqAccordion, ServiceFeatureCard). Legal pages can be plain Markdown with a minimal layout.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Markdown CMS pipeline for blog posts with frontmatter schema | mdsvex 0.12.7 preprocessor + frontmatter YAML schema + `import.meta.glob` loading pattern |
| CONT-02 | Blog listing page at /blogs | `+page.server.ts` with `import.meta.glob('/src/content/blogs/*.md', { eager: true })` returning sorted posts |
| CONT-03 | Individual blog post pages at /blogs/[slug] | Dynamic `+page.ts` load function importing `.md` files by slug, mdsvex returns Svelte component as default export |
| CONT-04 | All 15 existing blog posts migrated | 16 JSON files in scraped-data/content (16 found, not 15) need manual conversion to Markdown with frontmatter |
| CONT-05 | Markdown CMS pipeline for case studies with frontmatter schema | Same mdsvex pipeline as blogs, separate frontmatter schema (client, industry fields) |
| CONT-06 | Case study listing page at /cases | Same pattern as blog listing with different card layout |
| CONT-07 | Individual case study pages at /cases/[slug] | Same dynamic import pattern as blogs |
| CONT-08 | All 5 existing case studies migrated | 5 JSON files in scraped-data/content need conversion to Markdown |
| CONT-09 | Reading time estimate on blog posts | `reading-time` npm package (1.5.0) calculated in `+page.server.ts` or via `mdsvex-reading-time` remark plugin |
| SERV-01 | /automation service page | Svelte route component using shared service-page pattern with scraped content |
| SERV-02 | /data-verrijking service page | Same pattern as SERV-01 |
| SERV-03 | /api service page | Same pattern as SERV-01 |
| SERV-04 | /maatwerk-software service page | Same pattern as SERV-01 |
| SERV-05 | /offerte-automatisering service page | Same pattern as SERV-01 |
| SERV-06 | /ai-agent service page | Same pattern as SERV-01 |
| SERV-07 | /chatbot service page | Same pattern as SERV-01 |
| STAT-01 | /over-ons page | Svelte route component with mission section, team grid, FAQ, CTA |
| STAT-02 | /terms-conditions legal page | Markdown content rendered with prose typography, max-w-4xl |
| STAT-03 | /betalings-voorwaarden legal page | Same pattern as STAT-02 |
| STAT-04 | /privacy-policy legal page | Same pattern as STAT-02 |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| SvelteKit | ^2.50.2 | Application framework | Already installed in Phase 1 |
| Svelte | ^5.51.0 | UI framework | Already installed, using runes syntax |
| Tailwind CSS | ^4.2.2 | Utility-first CSS | Already installed with Vite plugin |
| TypeScript | ^5.9.3 | Type safety | Already installed |

### New for Phase 2
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| mdsvex | 0.12.7 | Markdown preprocessor for Svelte | Locked decision from STATE.md. Converts .md files to Svelte components. Supports frontmatter, remark/rehype plugins. |
| remark-gfm | 4.0.1 | GitHub-flavored Markdown | Tables, strikethrough, task lists in blog content. Minimal overhead. |
| rehype-slug | 6.0.0 | Heading ID generation | Adds `id` attributes to headings for anchor links in prose content |
| rehype-autolink-headings | 7.1.0 | Heading anchor links | Adds clickable links to headings, requires rehype-slug |
| reading-time | 1.5.0 | Reading time calculation | Calculates word count and estimated reading time. Used in `+page.server.ts` load function rather than as remark plugin (simpler, more control over output format). |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| reading-time (in load fn) | mdsvex-reading-time (remark plugin) | Plugin auto-injects into frontmatter but adds coupling. Manual calculation in load function is 3 lines of code and gives full control over the "[N] min leestijd" format. |
| Service pages as Markdown | Service pages as Svelte components | Service pages have complex layouts (hero gradients, feature grids, FAQ accordions, testimonials). Markdown cannot express this. Use Svelte route components. |
| Shiki (syntax highlighting) | PrismJS (mdsvex default) | Blog posts are business content, not code tutorials. Default PrismJS is sufficient. No Shiki setup needed. |

**Installation:**
```bash
npm install -D mdsvex remark-gfm rehype-slug rehype-autolink-headings
npm install reading-time
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── content/
│   ├── blogs/                    # 16 Markdown blog posts
│   │   ├── waarom-ben-ik-honeylink-begonnen.md
│   │   ├── ai-agents-hype-of-de-toekomst-van-jouw-mkb-bedrijf.md
│   │   └── ... (16 total)
│   ├── cases/                    # 5 Markdown case studies
│   │   ├── van-volgers-naar-kunstenaars-novus-arte-s-geautomatiseerde-talentscouting.md
│   │   └── ... (5 total)
│   └── legal/                    # 3 Markdown legal pages
│       ├── terms-conditions.md
│       ├── betalings-voorwaarden.md
│       └── privacy-policy.md
├── lib/
│   ├── components/
│   │   ├── blog/
│   │   │   └── BlogCard.svelte
│   │   ├── cases/
│   │   │   └── CaseCard.svelte
│   │   ├── content/
│   │   │   ├── ProseContent.svelte
│   │   │   └── AuthorInfo.svelte
│   │   ├── about/
│   │   │   └── TeamMember.svelte
│   │   ├── services/
│   │   │   └── ServiceFeatureCard.svelte
│   │   ├── ui/
│   │   │   ├── Button.svelte          # (exists)
│   │   │   ├── FaqAccordion.svelte
│   │   │   ├── FaqItem.svelte
│   │   │   └── PageHero.svelte
│   │   ├── homepage/                   # (exists)
│   │   │   ├── CtaSection.svelte       # (reused)
│   │   │   └── TestimonialsSection.svelte  # (reused)
│   │   └── layout/                     # (exists)
│   ├── types/
│   │   └── index.ts                    # Add BlogPost, CaseStudy, FaqItem types
│   └── server/
│       └── content.ts                  # getPosts(), getCases() helper functions
├── routes/
│   ├── blogs/
│   │   ├── +page.server.ts             # Blog listing load
│   │   ├── +page.svelte                # Blog listing UI
│   │   └── [slug]/
│   │       ├── +page.ts                # Individual blog load (client-side import)
│   │       └── +page.svelte            # Blog post layout
│   ├── cases/
│   │   ├── +page.server.ts             # Case listing load
│   │   ├── +page.svelte                # Case listing UI
│   │   └── [slug]/
│   │       ├── +page.ts                # Individual case load
│   │       └── +page.svelte            # Case study layout
│   ├── automation/
│   │   └── +page.svelte                # Service page
│   ├── data-verrijking/
│   │   └── +page.svelte
│   ├── api/
│   │   └── +page.svelte
│   ├── maatwerk-software/
│   │   └── +page.svelte
│   ├── offerte-automatisering/
│   │   └── +page.svelte
│   ├── ai-agent/
│   │   └── +page.svelte
│   ├── chatbot/
│   │   └── +page.svelte
│   ├── over-ons/
│   │   └── +page.svelte                # About page
│   ├── terms-conditions/
│   │   ├── +page.server.ts             # Load Markdown content
│   │   └── +page.svelte
│   ├── betalings-voorwaarden/
│   │   ├── +page.server.ts
│   │   └── +page.svelte
│   └── privacy-policy/
│       ├── +page.server.ts
│       └── +page.svelte
└── static/
    └── images/
        ├── blogs/                      # Blog post images (from scraped-data)
        │   ├── waarom-ben-ik-honeylink-begonnen/
        │   │   ├── hero.jpg
        │   │   └── author.jpeg
        │   └── .../
        ├── cases/                      # Case study images
        ├── services/                   # Service page images
        ├── team/                       # Team member photos
        └── ...
```

### Pattern 1: Blog/Case Markdown Frontmatter Schema

**What:** Standardized YAML frontmatter for all blog posts and case studies.
**When to use:** Every Markdown file in `src/content/blogs/` and `src/content/cases/`.

Blog post frontmatter:
```yaml
---
title: "Waarom ben ik HoneyLink begonnen?"
slug: "waarom-ben-ik-honeylink-begonnen"
date: "2025-04-17"
author: "Joshua Offermans"
authorImage: "/images/team/joshua-offermans.jpeg"
excerpt: "Mijn interesse in technologie begon al vroeg..."
image: "/images/blogs/waarom-ben-ik-honeylink-begonnen/hero.jpg"
published: true
---
```

Case study frontmatter:
```yaml
---
title: "Van volgers naar kunstenaars: Novus Arte's geautomatiseerde talentscouting"
slug: "van-volgers-naar-kunstenaars-novus-arte-s-geautomatiseerde-talentscouting"
client: "Novus Arte"
industry: "Artiestenmanagement"
author: "Joshua Offermans"
authorImage: "/images/team/joshua-offermans.jpeg"
excerpt: "Novus Arte's geautomatiseerde talentscouting..."
image: "/images/cases/novus-arte/hero.png"
published: true
---
```

### Pattern 2: Dynamic Slug Routing with import.meta.glob

**What:** Load Markdown files dynamically by slug using Vite's glob import.
**When to use:** Blog and case study `[slug]` routes.

```typescript
// src/routes/blogs/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../../content/blogs/${params.slug}.md`);
    return {
      content: post.default,
      meta: post.metadata
    };
  } catch {
    error(404, `Blog post niet gevonden: ${params.slug}`);
  }
};
```

### Pattern 3: Blog/Case Listing with import.meta.glob (eager)

**What:** Load all Markdown metadata at build/request time for listing pages.
**When to use:** `/blogs` and `/cases` listing pages.

```typescript
// src/lib/server/content.ts
import type { BlogPost } from '$lib/types';
import readingTime from 'reading-time';

export function getBlogPosts(): BlogPost[] {
  const paths = import.meta.glob<{ metadata: Omit<BlogPost, 'slug' | 'readingTime'> }>(
    '/src/content/blogs/*.md',
    { eager: true }
  );

  const posts: BlogPost[] = [];

  for (const [path, file] of Object.entries(paths)) {
    const slug = path.split('/').pop()?.replace('.md', '') ?? '';
    const metadata = file.metadata;

    if (metadata.published) {
      posts.push({ ...metadata, slug });
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// src/routes/blogs/+page.server.ts
import { getBlogPosts } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const posts = getBlogPosts();
  return { posts };
};
```

### Pattern 4: Reading Time Calculation

**What:** Calculate reading time from Markdown content, display as "[N] min leestijd".
**When to use:** Blog post pages only (not case studies per UI spec).

```typescript
// In the [slug]/+page.ts load function, after importing the .md file:
import readingTime from 'reading-time';

// The raw text content can be accessed from the file's source
// Option A: Calculate from the Markdown source using a remark plugin that injects word count
// Option B: Calculate at listing time by reading the raw file content

// Simplest approach -- calculate from word count in frontmatter or from rendered text:
// In the blog listing helper:
const raw = await import(`../../../content/blogs/${params.slug}.md?raw`);
const stats = readingTime(raw.default);
// stats.minutes -> round to nearest integer -> "3 min leestijd"
```

Note: The cleanest approach is to use the `mdsvex-reading-time` remark plugin which automatically injects `readingTime` into frontmatter metadata. This avoids a separate raw import.

### Pattern 5: ProseContent Component for Markdown Styling

**What:** A wrapper component that applies the prose typography styles from the UI spec to Markdown-rendered HTML.
**When to use:** Every page that renders Markdown content (blog posts, case studies, legal pages).

```svelte
<!-- src/lib/components/content/ProseContent.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children }: { children: Snippet } = $props();
</script>

<div class="prose-content max-w-3xl mx-auto">
  {@render children()}
</div>

<style>
  /* Apply the prose typography from UI spec using :global() selectors */
  .prose-content :global(h2) {
    @apply font-heading text-2xl md:text-3xl font-bold text-brand-black mt-12 mb-4;
  }
  .prose-content :global(h3) {
    @apply font-heading text-xl md:text-2xl font-bold text-brand-black mt-8 mb-3;
  }
  .prose-content :global(p) {
    @apply text-lg text-brand-gray-dark leading-relaxed mb-6;
  }
  /* ... all other elements per UI spec */
</style>
```

### Pattern 6: Service Page Structure (Shared Components)

**What:** All 7 service pages follow the same layout pattern with different content.
**When to use:** Every service page route.

Service page sections, in order:
1. `PageHero` -- bg-brand-gold gradient, h1 title, subtitle paragraph
2. Value proposition section -- h2 + body text, optional image (2-col layout)
3. Features section -- bg-brand-gray-light, feature cards with accent backgrounds
4. Practical examples section -- problem/solution pairs
5. Mini CTA block -- bg-brand-gold rounded-2xl, "Nieuwsgierig?" heading + contact button
6. `TestimonialsSection` -- reuse from homepage (already exists)
7. FAQ section -- `FaqAccordion` with page-specific questions/answers
8. `CtaSection` -- reuse from homepage (already exists)

Each service page imports shared components and passes page-specific content as props or inline data.

### Pattern 7: FaqAccordion with Svelte 5 Runes

**What:** Accessible accordion component for FAQ sections.
**When to use:** Service pages and about page.

```svelte
<!-- src/lib/components/ui/FaqItem.svelte -->
<script lang="ts">
  let { question, answer }: { question: string; answer: string } = $props();
  let isOpen = $state(false);

  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="border-b border-gray-200">
  <button
    onclick={toggle}
    class="w-full flex items-center justify-between py-4 text-left"
    aria-expanded={isOpen}
  >
    <span class="font-heading font-bold text-brand-black">{question}</span>
    <svg
      class="w-5 h-5 transition-transform duration-300 {isOpen ? 'rotate-180' : ''}"
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  <div
    class="overflow-hidden transition-[max-height] duration-300 ease-out"
    style="max-height: {isOpen ? '500px' : '0'}"
  >
    <p class="pb-4 text-brand-gray-dark leading-relaxed">{answer}</p>
  </div>
</div>
```

### Anti-Patterns to Avoid

- **Embedding Svelte components in .md files:** Locked decision: plain Markdown only. No `<Component />` tags inside blog/case .md files. All Svelte rendering happens in the route's `+page.svelte` wrapper, not inside the Markdown.
- **Using mdsvex layouts for blog/case rendering:** Instead of relying on mdsvex's layout feature (which uses `export let` props, clashing with Svelte 5 runes), render the mdsvex component in the route's `+page.svelte` using `<svelte:component>` or by rendering `{@render}` from the imported default. This keeps full control in the route file.
- **Storing content in /src/routes/ as +page.md:** This would couple content to routing. Keep content in `src/content/` and route in `src/routes/` separately. The `[slug]` dynamic route handles the mapping.
- **Building a custom Markdown-to-HTML pipeline:** mdsvex already wraps unified/remark/rehype. Do not build a parallel pipeline.
- **Hardcoding service page content in component files:** Extract service page data (titles, descriptions, features, FAQ Q&A) into typed data objects. This makes content updates easy without touching component structure.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown to HTML rendering | Custom unified pipeline | mdsvex 0.12.7 | mdsvex handles preprocessing, frontmatter extraction, Svelte component output. Rolling your own duplicates this. |
| Reading time calculation | Word-count regex | `reading-time` 1.5.0 | Handles edge cases (code blocks, images, CJK characters). 3-line integration. |
| Heading IDs for anchor links | Manual ID insertion | rehype-slug + rehype-autolink-headings | Automatic, consistent, handles duplicate headings. |
| GFM tables/strikethrough | Custom remark transforms | remark-gfm 4.0.1 | Standard plugin, zero config. |
| Prose typography scoping | Manual CSS for each element | ProseContent component with scoped `:global()` styles | Single component, all Markdown pages use it. Matches UI spec exactly. |
| FAQ accordion accessibility | Custom aria implementation | Proper ARIA pattern (button + aria-expanded + role="region") | Built into the FaqItem component per UI spec. |

**Key insight:** This phase is primarily a content migration task, not a library-building task. The main effort is converting 16 blog posts, 5 case studies, 7 service pages, 1 about page, and 3 legal pages from scraped JSON into properly structured Markdown/Svelte content. The tooling (mdsvex, remark plugins, reading-time) is mature and well-documented.

## Common Pitfalls

### Pitfall 1: mdsvex Layout Components and Svelte 5 Runes Clash
**What goes wrong:** mdsvex's layout feature passes frontmatter as props using the old `export let` syntax. In a Svelte 5 runes-mode project, this creates a mismatch.
**Why it happens:** mdsvex 0.12.7 was designed pre-Svelte 5. Its layout injection uses `export let` internally.
**How to avoid:** Do NOT use mdsvex's `layout` config option. Instead, render the Markdown component directly in the route's `+page.svelte` file. The route file uses `$props()` runes normally, and the mdsvex component is rendered as a child.
**Warning signs:** Svelte 5 deprecation warnings about `export let` in layout components.

### Pitfall 2: Dynamic Import Path Must Be Partially Static
**What goes wrong:** `import(\`${variable}\`)` fails because Vite cannot analyze fully dynamic imports.
**Why it happens:** Vite uses static analysis to determine which files to include in the bundle. Fully dynamic paths defeat this analysis.
**How to avoid:** Use a pattern where the path has a static prefix: `import(\`../../../content/blogs/${params.slug}.md\`)`. The static part (`../../../content/blogs/`) tells Vite which directory to scan; only the filename is dynamic.
**Warning signs:** Build errors about "dynamic imports" or 404s at runtime.

### Pitfall 3: Missing Dates in Scraped Blog Posts
**What goes wrong:** Only 5 of the 16 blog posts had visible dates in the Framer scrape. If you leave dates empty, sorting breaks.
**Why it happens:** Framer may render dates dynamically or some posts genuinely don't display dates.
**How to avoid:** For posts without scraped dates, check the Framer site directly or assign reasonable dates based on publication order. Every post MUST have a `date` field in frontmatter for sorting to work.
**Warning signs:** Posts appearing in wrong order on the listing page.

### Pitfall 4: Blog Count Mismatch (16 vs 15)
**What goes wrong:** The requirements say 15 blog posts, but the Framer scrape captured 16 JSON files.
**Why it happens:** The scrape may have captured a post published after the requirements were written, or one post may be unpublished/draft on Framer.
**How to avoid:** Migrate all 16 posts with `published: true`. If one should be excluded, set `published: false` in its frontmatter. The listing page filters by `published` field.
**Warning signs:** Count mismatch during verification.

### Pitfall 5: Image Path Mapping from Framer to Local
**What goes wrong:** Scraped JSON references Framer URLs (`framerusercontent.com/images/...`). These must be mapped to local paths.
**Why it happens:** The scrape script downloaded images to `scripts/scraped-data/images/` with Framer's hash filenames (e.g., `d5l3idnyW5bmIuF6hwsBYJBUjxk.jpg`).
**How to avoid:** Create a clear directory structure in `static/images/` organized by content type. Copy and rename images from scraped-data with descriptive names. Reference using `/images/blogs/[slug]/hero.jpg` pattern in frontmatter and Markdown.
**Warning signs:** Broken images on pages, 404s in browser console.

### Pitfall 6: Prose Styling Not Applied to Markdown Output
**What goes wrong:** Rendered Markdown HTML has no styling -- plain unstyled `<h2>`, `<p>`, `<ul>` elements.
**Why it happens:** Tailwind CSS resets all element styles. Markdown-rendered HTML needs explicit styling since there are no utility classes on the elements.
**How to avoid:** Use the ProseContent component that applies `:global()` styles to all child HTML elements. Apply it to every page that renders Markdown content. The UI spec defines exact Tailwind classes for each prose element.
**Warning signs:** Blog posts rendering as unstyled plain text.

### Pitfall 7: Special Characters in Slugs
**What goes wrong:** The slug `krijg-weer-grip-op-je-data-met-model-context-protocol-(mcp)` contains parentheses. The slug `digitale-collega-s-die-met-elkaar-praten-...` contains an apostrophe replacement.
**Why it happens:** Framer generated these slugs from Dutch titles with special characters.
**How to avoid:** Keep slugs exactly as they are on the Framer site (URL preservation is critical for SEO -- Phase 3's SEO-01). Name the Markdown files with the exact slug. Test that SvelteKit can route to these filenames.
**Warning signs:** 404 errors for posts with special characters in slugs.

### Pitfall 8: Service Page Content Extraction from Scraped JSON
**What goes wrong:** Scraped JSON has flat arrays of paragraphs and headings. Mapping these to structured sections (hero, features, FAQ Q&A pairs) requires careful manual work.
**Why it happens:** The Playwright scraper captured text content without semantic structure beyond HTML tags. FAQ questions vs answers are mixed in the paragraphs array.
**How to avoid:** Cross-reference the JSON content with the Framer screenshots in `scripts/scraped-data/screenshots/`. The screenshots show the visual structure. Map paragraphs to sections by position relative to headings.
**Warning signs:** Content in wrong sections, FAQ answers attributed to wrong questions.

## Code Examples

### svelte.config.js with mdsvex
```javascript
// Source: mdsvex docs (https://mdsvex.pngwn.io/docs)
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter()
  }
};

export default config;
```

### TypeScript Types for Content
```typescript
// src/lib/types/index.ts (additions)
export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  author: string;
  authorImage: string;
  excerpt: string;
  image: string;
  published: boolean;
}

export interface CaseStudy {
  title: string;
  slug: string;
  client: string;
  industry: string;
  author: string;
  authorImage: string;
  excerpt: string;
  image: string;
  published: boolean;
}

export interface FaqItemData {
  question: string;
  answer: string;
}

export interface ServicePageData {
  title: string;
  subtitle: string;
  sections: ServiceSection[];
  faq: FaqItemData[];
}

export interface ServiceSection {
  heading: string;
  body: string;
  type: 'value-proposition' | 'features' | 'examples' | 'process' | 'pricing';
  items?: ServiceFeature[];
  image?: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  accentColor?: string;
}
```

### Blog Listing Page
```svelte
<!-- src/routes/blogs/+page.svelte -->
<script lang="ts">
  import BlogCard from '$lib/components/blog/BlogCard.svelte';
  import CtaSection from '$lib/components/homepage/CtaSection.svelte';
  import PageHero from '$lib/components/ui/PageHero.svelte';
  import { inview } from '$lib/actions/inview';

  let { data } = $props();
</script>

<PageHero title="Blogs" />

{#if data.posts.length === 0}
  <section class="px-4 py-16 text-center">
    <h2 class="font-heading text-2xl font-bold mb-4">Nog geen blogs gepubliceerd</h2>
    <p class="text-brand-gray-dark">We zijn druk bezig met het schrijven van nieuwe content. Kom binnenkort terug!</p>
  </section>
{:else}
  <section
    use:inview
    class="px-4 py-16 md:py-24 opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
  >
    <div class="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.posts as post}
        <BlogCard {post} />
      {/each}
    </div>
  </section>
{/if}

<CtaSection />
```

### Blog Post [slug] Page with Markdown Rendering
```svelte
<!-- src/routes/blogs/[slug]/+page.svelte -->
<script lang="ts">
  import ProseContent from '$lib/components/content/ProseContent.svelte';
  import AuthorInfo from '$lib/components/content/AuthorInfo.svelte';
  import CtaSection from '$lib/components/homepage/CtaSection.svelte';

  let { data } = $props();
  const { meta, content: Content } = data;
</script>

<article class="px-4 py-16 md:py-24">
  <div class="max-w-4xl mx-auto text-center mb-8">
    <p class="text-sm font-normal text-brand-purple mb-4">{meta.date}</p>
    <h1 class="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8">
      {meta.title}
    </h1>
  </div>

  {#if meta.image}
    <div class="max-w-3xl mx-auto mb-8">
      <div class="bg-brand-gold rounded-xl overflow-hidden">
        <img src={meta.image} alt={meta.title} class="rounded-xl w-full h-auto" />
      </div>
    </div>
  {/if}

  <div class="max-w-3xl mx-auto mb-8">
    <AuthorInfo
      name={meta.author}
      image={meta.authorImage}
      readingTime={data.readingTime}
    />
  </div>

  <ProseContent>
    <Content />
  </ProseContent>
</article>

<CtaSection />
```

### TypeScript Module Declaration for .md Files
```typescript
// src/app.d.ts (add to existing)
declare module '*.md' {
  import type { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
  export const metadata: Record<string, unknown>;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| mdsvex layouts with `export let` | Render mdsvex component in route `+page.svelte` with `$props()` | Svelte 5 (Oct 2024) | Avoid layout feature, render content component directly |
| `import.meta.globEager()` | `import.meta.glob('...', { eager: true })` | Vite 3+ (2022) | Use the non-deprecated API |
| PostCSS for Tailwind | `@tailwindcss/vite` plugin | Tailwind v4 (Jan 2025) | Already set up in Phase 1 |
| `export let` for props | `$props()` rune | Svelte 5 (Oct 2024) | All new components must use runes |

**Deprecated/outdated:**
- `import.meta.globEager()`: Removed in Vite 4+. Use `import.meta.glob('...', { eager: true })`.
- mdsvex `layout` config with `export let` props: Technically still works in Svelte 5 (backward compatible) but produces deprecation warnings and is not recommended for runes-mode projects.

## Scraped Content Inventory

### Blog Posts (16 total)
All authored by Joshua Offermans. Posts with confirmed dates:
| Slug | Date | Has Hero Image |
|------|------|---------------|
| waarom-grote-bedrijven-miljoenen-uitgeven-aan-iets-wat-het-mkb-slimmer-kan-aanpakken | 2025-03-21 | Yes |
| chatbots-met-spelfouten-om-menselijk-te-lijken | 2025-03-25 | Yes |
| ai-agents-hype-of-de-toekomst-van-jouw-mkb-bedrijf | 2025-04-01 | Yes |
| krijg-weer-grip-op-je-data-met-model-context-protocol-(mcp) | 2025-04-11 | Yes |
| waarom-ben-ik-honeylink-begonnen | 2025-04-17 | Yes |
| 5-manieren-waarop-een-chatbot-jouw-mkb-bedrijf-tijd-kan-besparen | 2025-05-20 | Yes |
| 10 others | NOT FOUND in scrape | Yes |

Each blog JSON has ~5 images (3 are logo/footer duplicates, ~2 are unique to the post).

### Case Studies (5 total)
| Slug | Client |
|------|--------|
| van-binnen-mijn-bedrijf-valt-weinig-te-automatiseren-naar-voor-de-file-naar-huis | Unknown |
| minimalpad-s-naadloze-verzendervaring-via-webflow-en-sendcloud | MinimalPad |
| van-volgers-naar-kunstenaars-novus-arte-s-geautomatiseerde-talentscouting | Novus Arte |
| van-handleidingen-naar-interactieve-chatbot-ondersteuning | OWL Integrations |
| hoe-honeylink-de-software-koppeling-facilteerde-voor-surinaams-betaal-en-spaarprogramma-pietpiet | Wan2connect |

### Service Pages (7 total)
All share: hero, value proposition, features, practical examples, mini CTA, testimonials, FAQ, CTA.

| Route | h1 Title |
|-------|----------|
| /automation | Wij automatiseren jouw kantoor |
| /data-verrijking | Dataverrijking op maat: kies je bronnen, wij koppelen ze! |
| /api | API Integratie: Wij koppelen je systemen zonder zorgen |
| /maatwerk-software | Wij maken de software die je concurrent niet heeft. |
| /offerte-automatisering | Personeelsbeheer zonder gedoe. Wij regelen het! |
| /ai-agent | AI-agents: intelligente digitale medewerkers |
| /chatbot | Automatiseer gesprekken en bespaar tijd met chatbots op maat |

### Images Available
58 images downloaded to `scripts/scraped-data/images/`. These include blog hero images, case study images, service page illustrations, team photos, client logos, and testimonial avatars. All images from Framer's CDN have been saved locally with their hash-based filenames.

## Open Questions

1. **Missing blog post dates (10 of 16)**
   - What we know: Only 6 of 16 blog posts had visible dates in the scraped content. The Framer site may render dates from a CMS that wasn't captured in the text scrape.
   - What's unclear: The actual publication dates for the remaining 10 posts.
   - Recommendation: Visit the live Framer site to extract dates from the blog listing page, or check page source/meta tags. If unavailable, assign sequential dates before the earliest known date (2025-03-21) or use the Framer page's last-modified headers.

2. **Blog count: 15 vs 16**
   - What we know: The scrape captured 16 blog post JSONs. Requirements say 15.
   - What's unclear: Whether one post is a draft/unpublished on Framer, or was added after requirements were written.
   - Recommendation: Migrate all 16 with `published: true`. Flag in verification if count differs from expectations.

3. **Service page content fidelity**
   - What we know: Scraped JSON has flat text arrays. Visual structure comes from screenshots.
   - What's unclear: Exact mapping of paragraphs to sections for each service page.
   - Recommendation: Use screenshots as primary reference. Cross-reference with JSON for exact copy. Build one service page first as a template, then replicate for the other six.

## Sources

### Primary (HIGH confidence)
- [mdsvex docs](https://mdsvex.pngwn.io/docs) - Configuration, extensions, layout, remark/rehype plugins, frontmatter handling
- [Svelte CLI mdsvex docs](https://svelte.dev/docs/cli/mdsvex) - Official SvelteKit integration command
- [mdsvex npm](https://www.npmjs.com/package/mdsvex) - Version 0.12.7 confirmed
- [reading-time npm](https://www.npmjs.com/package/reading-time) - Version 1.5.0 confirmed
- [mdsvex-reading-time GitHub](https://github.com/lubiah/mdsvex-reading-time) - Remark plugin alternative, v1.0.6
- [SvelteKit Markdown Blog (Joy of Code)](https://joyofcode.xyz/sveltekit-markdown-blog) - Complete `import.meta.glob` pattern, `+page.ts` slug routing, frontmatter schema

### Secondary (MEDIUM confidence)
- [mdsvex + Svelte 5 runes compatibility](https://svelte.dev/docs/svelte/v5-migration-guide) - Layout props migration
- [Dynamically rendering markdown on SvelteKit using mdsvex](https://mli.puffinsystems.com/blog/sveltekit-blog-docs-with-mdsvex) - Dynamic import patterns
- [Integrate mdsvex, SvelteKit, Tailwind Guide](https://michaelish.hashnode.dev/step-by-step-guide-to-integrating-mdsvex-sveltekit-v5-and-tailwind-css-for-best-performance) - Tailwind prose styling approach

### Tertiary (LOW confidence)
- Blog post dates for 10 of 16 posts: Not found in scraped data, needs live site verification

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - mdsvex 0.12.7, reading-time 1.5.0, remark-gfm 4.0.1, rehype-slug 6.0.0 all verified on npm registry
- Architecture: HIGH - `import.meta.glob` pattern is well-documented, multiple production examples exist
- Pitfalls: HIGH - mdsvex/Svelte 5 layout clash and dynamic import constraints are well-documented issues
- Content inventory: MEDIUM - 16 blog posts found vs 15 expected; 10 missing dates needs resolution

**Research date:** 2026-03-21
**Valid until:** 2026-04-21 (stable ecosystem, 30 days)
