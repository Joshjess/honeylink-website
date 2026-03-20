# Phase 1: Foundation - Research

**Researched:** 2026-03-20
**Domain:** SvelteKit project scaffolding, global layout, responsive design, homepage migration, content scraping
**Confidence:** HIGH

## Summary

Phase 1 establishes the runnable SvelteKit project with Svelte 5, TypeScript, and Tailwind CSS v4. It includes the global layout (sticky header with responsive navigation, footer), the homepage migrated from the current Framer site at honeylink.nl, and an automated Playwright scraping pipeline to extract content, images, and full-page screenshots from the live site as reference material.

The technical foundation is well-understood: SvelteKit 2.55 with `npx sv create`, Tailwind v4 via the `@tailwindcss/vite` plugin with CSS-first configuration, and adapter-node for VPS deployment. The main complexity lies in faithfully replicating the Framer site's design (colors, typography with 4 font families, section layout) and building a reusable Playwright scraper that captures all content for this and later phases.

**Primary recommendation:** Scaffold with `npx sv create` using the `--add tailwindcss,eslint,prettier` flags, self-host all 4 font families (Inter, Satoshi, Geist, Fragment Mono), build the Playwright scraper first to gather design reference before building UI components, and use a Svelte 5 action for scroll-triggered fade-in animations.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Match the current Framer navigation structure for desktop (replicate link order, grouping, dropdown behavior)
- **D-02:** Hamburger menu on mobile -- classic 3-line icon with slide-out panel
- **D-03:** Sticky header -- stays visible when scrolling down on all breakpoints
- **D-04:** Footer matches the current Framer footer layout and links
- **D-05:** Color palette extracted from the current Framer site CSS -- replicate exact hex values into Tailwind config
- **D-06:** Typography matches Framer fonts -- use the same typefaces (self-hosted for performance)
- **D-07:** Subtle fade-in scroll animations on section entry -- not distracting, modern feel
- **D-08:** Tailwind default spacing scale for component padding/margins -- no custom spacing tokens needed
- **D-09:** Hero section modernized -- same content (headline, subtext, CTA) but improved layout/sizing compared to Framer
- **D-10:** Homepage sections (services, testimonials, etc.) keep the same order and structure as current Framer site
- **D-11:** Primary CTA buttons on homepage link to /contact
- **D-12:** Automated scraping via Playwright -- visit each page programmatically, extract text content and DOM structure
- **D-13:** Download all images from Framer site, optimize locally (AVIF/WebP conversion handled in Phase 3)
- **D-14:** Take full-page screenshots of every Framer page as design reference for side-by-side comparison during development

### Claude's Discretion
- Exact animation timing and easing curves for scroll fade-ins
- Responsive breakpoint values (Tailwind defaults likely sufficient)
- Component file organization within src/lib/components/
- Scraping script output format (JSON, Markdown, or structured directories)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUN-01 | SvelteKit project scaffolded with Svelte 5, TypeScript, Tailwind v4, adapter-node | Standard Stack section covers exact versions, scaffolding command, Vite plugin config, and CSS-first Tailwind setup |
| FOUN-02 | Global layout with header, footer, and navigation matching current site structure | Architecture Patterns section covers layout component structure, sticky header pattern, hamburger menu, and Svelte 5 $props/children pattern |
| FOUN-03 | Responsive design working across mobile, tablet, and desktop breakpoints | Breakpoints section documents the Framer site's 3 breakpoints and maps them to Tailwind's defaults |
| FOUN-04 | Homepage migrated from Framer with existing design (small tweaks allowed) | Homepage Structure section documents observed sections, color palette, typography, and the scraping-first workflow to capture exact content |
</phase_requirements>

## Standard Stack

### Core (Phase 1 specific)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Svelte | ^5.54.0 | UI framework | Current stable. Runes ($state, $derived, $effect, $props) replace Svelte 4 patterns. |
| SvelteKit | ^2.55.0 | Application framework | Current stable. SSR by default, file-based routing, form actions. |
| TypeScript | ^5.9.3 | Type safety | Current stable. Do NOT use 6.0 RC. |
| @sveltejs/adapter-node | ^5.5.4 | Node.js server output | Required for Hetzner VPS. Dev dependency. |
| Tailwind CSS | ^4.2.2 | Utility-first CSS | v4 stable. CSS-first config via @theme directive. No tailwind.config.js needed. |
| @tailwindcss/vite | ^4.2.2 | Vite plugin for Tailwind | Official recommended path for SvelteKit. NOT PostCSS. |
| Playwright | ^1.58.2 | Web scraping | Headless browser for extracting content and screenshots from Framer site. |

### Supporting (Fonts)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource-variable/inter | ^5.2.8 | Inter variable font (primary) | Import in app.css. Weights 400, 600, 700, 900. |
| @fontsource/geist | ^5.2.8 | Geist font (secondary) | Import in app.css. Weights 500, 700. SIL Open Font License. |
| @fontsource/fragment-mono | ^5.2.8 | Fragment Mono (monospace) | Import in app.css. Weight 400. SIL Open Font License. |
| Satoshi (manual) | N/A | Satoshi font (accent) | NOT on Fontsource npm. Download WOFF2 from fontshare.com, place in static/fonts/. ITF Free Font License (commercial OK). |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Playwright for scraping | Puppeteer | Playwright has better multi-browser support and auto-wait. Playwright is already an sv create add-on option. |
| Fontsource for Inter | Manual @font-face | Fontsource auto-handles subsets, formats, and CSS generation. Less manual work. |
| @tailwindcss/vite | PostCSS | Tailwind v4 officially recommends the Vite plugin. PostCSS adds complexity. |
| Custom IntersectionObserver action | svelte-inview library | Custom action is ~20 lines, zero dependencies. Library adds unnecessary weight for simple fade-ins. |

**Installation:**
```bash
# Scaffold project (select: SvelteKit minimal, TypeScript, no add-ons via flags)
npx sv create honeylink-website --template minimal --types ts --add tailwindcss,eslint,prettier

# Adapter
npm install -D @sveltejs/adapter-node

# Fonts (3 of 4 via fontsource)
npm install @fontsource-variable/inter @fontsource/geist @fontsource/fragment-mono

# Scraping tool (dev dependency)
npm install -D playwright
npx playwright install chromium

# Satoshi font: download manually from https://www.fontshare.com/fonts/satoshi
# Place WOFF2 files in static/fonts/satoshi/
```

**Version verification:** All versions confirmed against npm registry on 2026-03-20:
- svelte: 5.54.0
- @sveltejs/kit: 2.55.0
- @sveltejs/adapter-node: 5.5.4
- tailwindcss: 4.2.2
- @tailwindcss/vite: 4.2.2
- typescript: 5.9.3
- playwright: 1.58.2
- @fontsource-variable/inter: 5.2.8
- @fontsource/geist: 5.2.8
- @fontsource/fragment-mono: 5.2.8

## Architecture Patterns

### Recommended Project Structure (Phase 1 scope)

```
src/
  routes/
    +layout.svelte              # Global layout: Header, Footer, CSS import
    +layout.server.ts           # Site-wide data (navigation links)
    +page.svelte                # Homepage
    +error.svelte               # Branded 404/500 error page
  lib/
    components/
      layout/
        Header.svelte           # Sticky header with desktop nav + mobile hamburger
        Footer.svelte           # Footer matching Framer layout
        Navigation.svelte       # Desktop navigation links
        MobileMenu.svelte       # Slide-out mobile menu panel
      ui/
        Button.svelte           # Reusable CTA button component
        FadeIn.svelte           # Scroll-triggered fade-in wrapper (or use action)
      homepage/
        HeroSection.svelte      # Hero with gold gradient, headline, CTA
        ServicesSection.svelte   # Services overview cards
        TestimonialsSection.svelte
        [other homepage sections].svelte
    actions/
      inview.ts                 # IntersectionObserver action for scroll animations
    types/
      index.ts                  # Shared TypeScript types (NavLink, etc.)
  app.css                       # Tailwind import + @theme + @font-face for Satoshi
  app.html                      # HTML template with font preloads
static/
  fonts/
    satoshi/                    # Manually downloaded Satoshi WOFF2 files
  images/                       # Downloaded from Framer (via scraper)
  favicon.ico
  robots.txt
scripts/
  scrape-framer.ts              # Playwright scraping script
  scraped-data/                 # Output directory for scraped content
    screenshots/                # Full-page screenshots
    content/                    # Extracted text/DOM per page
    images/                     # Downloaded images
```

### Pattern 1: Svelte 5 Layout with $props and Children

**What:** Root layout receives children as a snippet, renders Header/Footer around page content.
**When:** +layout.svelte (the one and only root layout in Phase 1).
**Example:**
```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import '../app.css';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Header />
<main>
  {@render children()}
</main>
<Footer />
```

### Pattern 2: Sticky Header with Mobile Toggle

**What:** Fixed-position header with nav links on desktop, hamburger menu on mobile. Uses $state for menu open/close.
**When:** Header component.
**Example:**
```svelte
<!-- src/lib/components/layout/Header.svelte -->
<script lang="ts">
  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }
</script>

<header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
  <nav class="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
    <!-- Logo -->
    <a href="/" class="flex-shrink-0">
      <img src="/images/logo.svg" alt="HoneyLink" class="h-8" />
    </a>

    <!-- Desktop nav (hidden on mobile) -->
    <div class="hidden md:flex items-center gap-6">
      <!-- nav links here -->
    </div>

    <!-- Mobile hamburger (hidden on desktop) -->
    <button
      class="md:hidden p-2"
      onclick={toggleMenu}
      aria-label="Menu"
      aria-expanded={menuOpen}
    >
      <!-- 3-line hamburger icon -->
    </button>
  </nav>
</header>

<!-- Mobile slide-out panel -->
{#if menuOpen}
  <!-- backdrop + slide-in panel -->
{/if}
```

### Pattern 3: IntersectionObserver Action for Scroll Animations

**What:** Reusable Svelte action that adds a CSS class when element enters viewport. Lightweight alternative to a library.
**When:** Any element needing fade-in on scroll (D-07).
**Example:**
```typescript
// src/lib/actions/inview.ts
export function inview(node: HTMLElement, options?: { threshold?: number; once?: boolean }) {
  const { threshold = 0.15, once = true } = options ?? {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.classList.add('in-view');
          if (once) observer.unobserve(node);
        }
      });
    },
    { threshold }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
```

Usage in component:
```svelte
<script>
  import { inview } from '$lib/actions/inview';
</script>

<section use:inview class="opacity-0 translate-y-4 transition-all duration-700 ease-out [&.in-view]:opacity-100 [&.in-view]:translate-y-0">
  <!-- content -->
</section>
```

### Pattern 4: Tailwind v4 CSS-First Theme Configuration

**What:** Define brand colors, fonts, and custom tokens in app.css using @theme directive.
**When:** Project setup (Phase 1, first task).
**Example:**
```css
/* src/app.css */
@import "tailwindcss";

/* Font imports via fontsource */
@import "@fontsource-variable/inter";
@import "@fontsource/geist/500.css";
@import "@fontsource/geist/700.css";
@import "@fontsource/fragment-mono/400.css";

/* Manual Satoshi @font-face */
@font-face {
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/satoshi/Satoshi-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/satoshi/Satoshi-Medium.woff2') format('woff2');
}
@font-face {
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/satoshi/Satoshi-Bold.woff2') format('woff2');
}
@font-face {
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('/fonts/satoshi/Satoshi-Black.woff2') format('woff2');
}

@theme {
  /* Brand colors extracted from honeylink.nl */
  --color-brand-purple: #5f09de;
  --color-brand-gold: #fcc00a;
  --color-brand-black: #000000;
  --color-brand-white: #ffffff;
  --color-brand-gray-light: #f6f7f9;
  --color-brand-gray-dark: #3b3b3b;
  --color-brand-blue: #0099ff;

  /* Pastel accent palette */
  --color-accent-purple: #cdc4ff;
  --color-accent-pink: #eeddea;
  --color-accent-teal: #d4ede9;
  --color-accent-yellow: #feecba;
  --color-accent-blue: #c9defd;
  --color-accent-green: #dcedb4;

  /* Font families */
  --font-sans: 'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-heading: 'Satoshi', 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
  --font-accent: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Fragment Mono', ui-monospace, monospace;
}
```

### Pattern 5: Playwright Scraping Script

**What:** Node.js script using Playwright to visit honeylink.nl, extract text/DOM, download images, and take full-page screenshots.
**When:** Run once before building UI (produces reference material for all phases).
**Example:**
```typescript
// scripts/scrape-framer.ts
import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://honeylink.nl';
const OUTPUT_DIR = 'scripts/scraped-data';

const URLS = [
  '/',
  '/over-ons',
  '/automation',
  '/data-verrijking',
  '/api',
  '/maatwerk-software',
  '/offerte-automatisering',
  '/ai-agent',
  '/chatbot',
  '/contact',
  '/cases',
  '/blogs',
  // ... all case and blog slugs from sitemap.xml
];

async function scrape() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  for (const url of URLS) {
    const fullUrl = `${BASE_URL}${url}`;
    await page.goto(fullUrl, { waitUntil: 'networkidle' });

    // Full-page screenshot
    const screenshotPath = path.join(OUTPUT_DIR, 'screenshots', `${url.replace(/\//g, '_') || 'home'}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Extract text content
    const textContent = await page.evaluate(() => {
      // Extract structured content from DOM
      return {
        title: document.title,
        headings: [...document.querySelectorAll('h1,h2,h3')].map(h => ({
          tag: h.tagName,
          text: h.textContent?.trim()
        })),
        paragraphs: [...document.querySelectorAll('p')].map(p => p.textContent?.trim()).filter(Boolean),
        links: [...document.querySelectorAll('a')].map(a => ({
          text: a.textContent?.trim(),
          href: a.getAttribute('href')
        })),
        images: [...document.querySelectorAll('img')].map(img => ({
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt')
        }))
      };
    });

    // Save content JSON
    const contentPath = path.join(OUTPUT_DIR, 'content', `${url.replace(/\//g, '_') || 'home'}.json`);
    fs.writeFileSync(contentPath, JSON.stringify(textContent, null, 2));
  }

  // Download images
  // ... image download logic

  await browser.close();
}

scrape();
```

### Anti-Patterns to Avoid

- **Using `bind:value` in Svelte 5:** Project guidelines explicitly forbid it. Use `$state()` + `oninput` event handlers instead.
- **Using `<slot>` in Svelte 5:** Deprecated. Use `{@render children()}` with `$props()`.
- **Using `@apply` in Svelte `<style>` blocks without `@reference`:** Will silently fail with Tailwind v4. Prefer utility classes in markup. If you must use `@apply`, add `@reference "tailwindcss";` at top of the `<style>` block.
- **Using tailwind.config.js:** Tailwind v4 uses CSS-first configuration via `@theme` in app.css. No JS config file needed.
- **Importing from `$app/stores`:** Svelte 5 / SvelteKit 2 uses `$app/state` instead. The stores module is deprecated.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font hosting/subsetting | Manual font file management with custom CSS | @fontsource packages (for Inter, Geist, Fragment Mono) | Handles subsets, formats, CSS generation, updates via npm |
| Project scaffolding | Manual file creation | `npx sv create` with add-ons | Configures TS, ESLint, Prettier, Tailwind correctly out of the box |
| CSS utility framework | Custom CSS variables + classes | Tailwind v4 @theme directive | Responsive, purged, consistent design tokens with zero custom build tooling |
| Web scraping with JS rendering | curl/wget (cannot render JS) | Playwright | Framer site is client-rendered; needs a real browser to extract content |
| Responsive breakpoints | Custom media queries | Tailwind responsive prefixes (sm:, md:, lg:) | Battle-tested breakpoints, consistent across project |

**Key insight:** The Framer site uses heavy client-side rendering (React-based). Simple HTTP requests return only CSS/JS framework code without rendered content. Playwright is the only viable scraping approach.

## Common Pitfalls

### Pitfall 1: Tailwind v4 @apply in Svelte Style Blocks

**What goes wrong:** `@apply` does not work inside `<style>` blocks in .svelte files with Tailwind v4. Styles silently fail to apply.
**Why it happens:** Tailwind v4 processes styles separately per file. Svelte `<style>` blocks are isolated and do not have access to Tailwind's definitions unless explicitly referenced.
**How to avoid:** Use utility classes directly in markup (Tailwind's intended pattern). If absolutely necessary, add `@reference "tailwindcss";` at the top of the `<style>` block. Better yet, avoid `@apply` entirely.
**Warning signs:** Missing styles in dev, components looking unstyled despite having `@apply` directives.

### Pitfall 2: Svelte 5 Syntax Mistakes

**What goes wrong:** Using Svelte 4 patterns (export let, $:, bind:, <slot>) causes build errors or runtime bugs.
**Why it happens:** Muscle memory from Svelte 4 or outdated tutorials/examples.
**How to avoid:**
- Props: Use `let { propName } = $props()` not `export let propName`
- Reactive values: Use `$derived()` not `$: value = ...`
- Side effects: Use `$effect()` not `$: { ... }`
- Children: Use `{@render children()}` not `<slot />`
- State: Use `let x = $state(value)` not `let x = value`
- Event handlers: Use `onclick={handler}` not `on:click={handler}`
**Warning signs:** Build warnings about deprecated syntax, TypeScript errors.

### Pitfall 3: Framer Site Content Not Extractable Without JavaScript

**What goes wrong:** Attempting to scrape honeylink.nl with `fetch()` or `wget` returns only Framer's shell HTML with no actual content.
**Why it happens:** Framer sites are React SPAs that render content client-side. The initial HTML is empty scaffolding.
**How to avoid:** Use Playwright with `waitUntil: 'networkidle'` to ensure all content renders before extraction.
**Warning signs:** Scraped HTML contains only `<div>` containers with cryptic class names and no text content.

### Pitfall 4: Satoshi Font Not Available via npm

**What goes wrong:** Trying to `npm install @fontsource/satoshi` fails -- the package does not exist.
**Why it happens:** Satoshi is licensed under ITF Free Font License (not SIL OFL). Fontsource only packages SIL-licensed fonts.
**How to avoid:** Download Satoshi WOFF2 files from fontshare.com manually. Place in `static/fonts/satoshi/`. Write `@font-face` declarations in app.css.
**Warning signs:** npm install fails, font not loading in browser.

### Pitfall 5: Sticky Header Covering Page Content

**What goes wrong:** Content at the top of the page is hidden behind the sticky header.
**Why it happens:** `position: sticky` or `position: fixed` removes the header from normal document flow, but page content does not account for the header height.
**How to avoid:** Use `sticky top-0` (not fixed). Sticky keeps the element in flow until scroll, then sticks. If using fixed, add padding-top to the main content equal to header height.
**Warning signs:** First section of page partially hidden, anchor links scrolling to content behind header.

### Pitfall 6: Wrong Breakpoints Causing Layout Mismatch

**What goes wrong:** Components look correct on desktop but break at tablet/mobile widths that don't match the Framer site's breakpoints.
**Why it happens:** Framer uses custom breakpoints (810px, 1440px) while Tailwind has different defaults (640, 768, 1024, 1280).
**How to avoid:** The Framer site uses 810px as the mobile breakpoint. Tailwind's `md:` (768px) is close enough. Use `md:` for tablet-and-up and `lg:` (1024px) for desktop. Fine-tune with Tailwind v4 custom breakpoints in @theme if needed.
**Warning signs:** Layout looks off at specific screen widths between Tailwind breakpoints.

## Code Examples

### SvelteKit Project Configuration

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter()
  }
};

export default config;
```

```typescript
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit()
  ]
});
```

### Root Layout with Font Imports

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import '../app.css';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen flex flex-col font-sans text-brand-black bg-brand-white">
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>
```

### Responsive Section Component

```svelte
<!-- Example homepage section with responsive grid -->
<script lang="ts">
  import { inview } from '$lib/actions/inview';
</script>

<section
  use:inview
  class="px-4 py-16 md:py-24 mx-auto max-w-7xl
         opacity-0 translate-y-4 transition-all duration-700 ease-out
         [&.in-view]:opacity-100 [&.in-view]:translate-y-0"
>
  <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
    <!-- Dutch heading text -->
  </h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Cards/content -->
  </div>
</section>
```

### Error Page

```svelte
<!-- src/routes/+error.svelte -->
<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
  <h1 class="font-heading text-6xl font-bold mb-4">{page.status}</h1>
  <p class="text-xl text-brand-gray-dark mb-8">{page.error?.message ?? 'Pagina niet gevonden'}</p>
  <a href="/" class="bg-brand-black text-white px-6 py-3 rounded-lg hover:bg-brand-purple transition-colors">
    Terug naar home
  </a>
</div>
```

## Responsive Breakpoints

### Framer Site Observed Breakpoints

| Breakpoint | Framer Width | Tailwind Equivalent | Mapping |
|------------|-------------|---------------------|---------|
| Mobile | <= 809px | default (mobile-first) | Base styles, single column |
| Tablet | 810px - 1439px | `md:` (768px+) | Close match. 768 vs 810 is 42px difference -- acceptable. |
| Desktop | >= 1440px | `lg:` (1024px+) or `xl:` (1280px+) | Use `lg:` for 2-column, `xl:` for full desktop layout |

**Recommendation:** Use Tailwind defaults. The 42px gap between Framer's 810px and Tailwind's 768px `md:` breakpoint is negligible. If exact match is needed, add a custom breakpoint in @theme:
```css
@theme {
  --breakpoint-tablet: 810px;
}
```
Then use `tablet:` prefix in classes. However, Tailwind defaults are likely sufficient per the discretion area.

## Typography Plan

### Font Stack

| Role | Font | Weights | Source | License |
|------|------|---------|--------|---------|
| Primary (body text) | Inter Variable | 400, 600, 700, 900 | @fontsource-variable/inter (npm) | SIL OFL 1.1 |
| Headings | Satoshi | 400, 500, 700, 900 | fontshare.com (manual download) | ITF FFL (commercial OK) |
| Accent / UI | Geist | 500, 700 | @fontsource/geist (npm) | SIL OFL 1.1 |
| Monospace / code | Fragment Mono | 400 | @fontsource/fragment-mono (npm) | SIL OFL 1.1 |

### Font Performance Strategy

1. Use `font-display: swap` on all @font-face declarations (fontsource does this by default)
2. Preload critical fonts in `app.html`:
```html
<link rel="preload" href="/fonts/satoshi/Satoshi-Bold.woff2" as="font" type="font/woff2" crossorigin>
```
3. Only import the specific weights needed (not entire font families)
4. Variable font for Inter reduces file count (one file covers all weights)

## Color Palette (Extracted from honeylink.nl)

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| Purple | #5f09de | Primary accent, CTA hover states |
| Gold | #fcc00a | Hero gradient, highlights |
| Black | #000000 | Primary text, dark backgrounds |
| White | #ffffff | Backgrounds, light text |
| Light Gray | #f6f7f9 | Section backgrounds |
| Dark Gray | #3b3b3b | Secondary text |
| Blue | #0099ff | Links |

### Pastel Accents

| Name | Hex | Usage |
|------|-----|-------|
| Purple | #cdc4ff | Card backgrounds, accents |
| Pink | #eeddea | Card backgrounds |
| Teal | #d4ede9 | Card backgrounds |
| Yellow | #feecba | Card backgrounds |
| Blue | #c9defd | Card backgrounds |
| Green | #dcedb4 | Card backgrounds |

**Confidence:** MEDIUM -- Colors extracted via page inspection. The Playwright scraper should confirm exact values from computed styles.

## Homepage Structure (Observed)

Based on inspection of honeylink.nl:

1. **Hero Section** -- Gold radial gradient background, main headline, subtitle text, CTA button ("Neem contact op" or similar linking to /contact)
2. **Client/trust indicators** -- Logos or trust badges
3. **Services overview** -- Cards or grid showing service categories
4. **Case studies preview** -- Featured case studies with images
5. **Testimonials** -- Client quotes or reviews
6. **Blog preview** -- Recent blog posts
7. **Final CTA** -- Bottom call-to-action section

**Confidence:** MEDIUM -- The Framer site's client-side rendering makes remote inspection difficult. The Playwright scraper (D-12) must run first to capture exact section order, headings, and content. Planner should sequence scraping BEFORE homepage implementation.

## Content Max Width

The Framer site uses a 1260px max-width for content containers. Map this to Tailwind:
```css
@theme {
  --container-7xl: 1260px;
}
```
Or use `max-w-[1260px]` as an arbitrary value. Tailwind's built-in `max-w-7xl` is 1280px -- close enough and may be preferred for simplicity.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | @theme in CSS (v4) | Jan 2025 | No JS config file. All design tokens in app.css |
| PostCSS + autoprefixer | @tailwindcss/vite plugin | Jan 2025 | Simpler setup, faster builds |
| Svelte 4 export let / $: / on:event | Svelte 5 $props / $derived / onclick | Oct 2024 | Runes are the only supported pattern |
| `<slot />` | `{@render children()}` | Oct 2024 | Snippets replace slots entirely |
| `$app/stores` | `$app/state` | SvelteKit 2.x | Stores deprecated in favor of runes-compatible API |
| create-svelte | npx sv create | Late 2024 | New CLI with add-on system |

**Deprecated/outdated:**
- `create-svelte`: Replaced by `npx sv create` (Svelte CLI)
- `tailwind.config.js`: Not needed with Tailwind v4 CSS-first config
- Svelte 4 reactivity patterns ($:, export let, bind:, <slot>): All replaced by runes

## Open Questions

1. **Exact navigation link structure**
   - What we know: The Framer site has a desktop nav with multiple links and at least one CTA button
   - What's unclear: Exact link labels, order, and whether there are dropdown sub-menus
   - Recommendation: The Playwright scraper must extract navigation structure first. Build nav component after scraper runs.

2. **Exact footer layout**
   - What we know: Footer exists with links and content
   - What's unclear: Number of columns, social media links, legal links in footer
   - Recommendation: Same as above -- scraper captures this. Build footer after scraper runs.

3. **Hero section exact content**
   - What we know: Gold radial gradient, headline text, CTA button
   - What's unclear: Exact headline text, subtext, CTA label, gradient parameters
   - Recommendation: Scraper captures this. Hero component built to match scraped content.

4. **Satoshi font exact weights used**
   - What we know: CSS shows weights 400, 500, 700, 900
   - What's unclear: Which weights are actually used in visible elements vs just declared
   - Recommendation: Download all 4 weights. Audit after scraping reveals which headings/text use which weights.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 SvelteKit installation guide](https://tailwindcss.com/docs/guides/sveltekit) - Official setup steps
- [sv create CLI docs](https://svelte.dev/docs/cli/sv-create) - Project scaffolding options
- [Svelte 5 $props docs](https://svelte.dev/docs/svelte/$props) - Component props pattern
- [Svelte 5 snippet docs](https://svelte.dev/docs/svelte/snippet) - Children rendering
- npm registry - All package versions verified 2026-03-20

### Secondary (MEDIUM confidence)
- [Tailwind v4 @apply in Svelte discussion](https://github.com/tailwindlabs/tailwindcss/discussions/15205) - @reference workaround
- [Tailwind v4 SvelteKit real issues guide](https://dev.to/fedor-pasynkov/setting-up-tailwind-css-v4-in-sveltekit-the-vite-plugin-way-a-guide-based-on-real-issues-380n)
- [Fontsource Inter install](https://fontsource.org/fonts/inter/install) - Font package usage
- [Fontshare Satoshi license](https://www.fontshare.com/licenses/itf-ffl) - ITF FFL commercial use confirmed
- [Geist font GitHub](https://github.com/vercel/geist-font) - SIL OFL license confirmed
- [Fragment Mono Google Fonts](https://fonts.google.com/specimen/Fragment+Mono) - SIL OFL confirmed

### Tertiary (LOW confidence)
- honeylink.nl design inspection via WebFetch - Color and font extraction (Framer's CSR limits accuracy; must verify with Playwright scraper)
- [Svelte playground IntersectionObserver examples](https://svelte.dev/playground/ee27d91a967948e3bb10ae71b1875e22) - Action pattern reference

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All versions verified against npm, official docs confirm setup patterns
- Architecture: HIGH - SvelteKit project structure is well-documented, Svelte 5 patterns are stable
- Typography/Design: MEDIUM - Font families confirmed but exact usage patterns need scraper verification
- Homepage structure: MEDIUM - Client-rendered Framer site limits remote inspection; Playwright scraper will confirm
- Pitfalls: HIGH - Tailwind v4 + Svelte 5 pitfalls well-documented in community discussions

**Research date:** 2026-03-20
**Valid until:** 2026-04-20 (stable ecosystem, 30-day validity)
