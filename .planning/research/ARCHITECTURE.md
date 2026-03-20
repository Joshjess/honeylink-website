# Architecture Patterns

**Domain:** SvelteKit agency website with file-based Markdown CMS
**Researched:** 2026-03-20

## Recommended Architecture

### High-Level Overview

```
                    Internet
                       |
                   Caddy (HTTPS + reverse proxy)
                       |
                  PM2 (process manager)
                       |
                SvelteKit Node Server (port 3000)
                   /        \
          Prerendered      SSR Pages
          Static HTML      (contact form)
                |
         Markdown Files (content)
         /src/content/blogs/*.md
         /src/content/cases/*.md
```

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| Caddy | TLS termination, reverse proxy, static asset serving, HTTP/2 | PM2-managed Node process on localhost:3000 |
| PM2 | Process management, auto-restart, log rotation | Caddy (upstream), Node.js SvelteKit server |
| SvelteKit Server | SSR rendering, form actions, API routes | Caddy (downstream), Resend API (email), filesystem (Markdown content) |
| mdsvex Preprocessor | Markdown-to-Svelte compilation at build time | Filesystem (.md files), remark/rehype plugins |
| Resend API | Transactional email delivery | SvelteKit form action (server-side only) |
| Filesystem (content) | Blog posts, case studies stored as .md with frontmatter | mdsvex preprocessor, SvelteKit load functions |

### Data Flow

**Content rendering (build time + request time):**
```
.md files with frontmatter
  --> mdsvex preprocessor (build time)
  --> Svelte components
  --> SvelteKit prerender (build time) OR SSR (request time)
  --> HTML response
```

**Contact form submission:**
```
User fills form
  --> Browser submits to SvelteKit form action (+page.server.ts)
  --> Zod validates input (server-side)
  --> Rate limiter checks IP (in-memory)
  --> Resend API sends email
  --> Return success/error to form (progressive enhancement)
```

**Page request flow:**
```
Browser --> Caddy (HTTPS) --> SvelteKit Node server
  If prerendered: serve static HTML from build/prerendered/
  If SSR: render on server, return HTML
  --> Client-side hydration (Svelte 5)
```

## Project Structure

```
src/
  routes/
    +layout.svelte              # Global layout (header, footer, meta)
    +layout.server.ts           # Global load (site-wide data)
    +page.svelte                # Homepage
    +page.server.ts             # Homepage load
    over-ons/
      +page.svelte              # About page
    contact/
      +page.svelte              # Contact form UI
      +page.server.ts           # Form action (Resend + validation)
    blogs/
      +page.svelte              # Blog listing
      +page.server.ts           # Load all blog metadata
      [slug]/
        +page.svelte            # Individual blog post
        +page.server.ts         # Load single post by slug
    cases/
      +page.svelte              # Case listing
      +page.server.ts           # Load all case metadata
      [slug]/
        +page.svelte            # Individual case study
        +page.server.ts         # Load single case by slug
    (services)/
      automation/+page.svelte
      data-verrijking/+page.svelte
      api/+page.svelte
      maatwerk-software/+page.svelte
      offerte-automatisering/+page.svelte
      ai-agent/+page.svelte
      chatbot/+page.svelte
    (legal)/
      terms-conditions/+page.svelte
      betalings-voorwaarden/+page.svelte
      privacy-policy/+page.svelte
    sitemap.xml/
      +server.ts                # Dynamic sitemap generation
  lib/
    components/
      layout/
        Header.svelte
        Footer.svelte
        Navigation.svelte
      ui/
        Button.svelte
        Card.svelte
        ContactForm.svelte
      seo/
        MetaTags.svelte         # Wrapper around svelte-meta-tags
        JsonLd.svelte           # Structured data helper
      blog/
        BlogCard.svelte
        BlogList.svelte
      cases/
        CaseCard.svelte
        CaseList.svelte
    server/
      email.ts                  # Resend email sending utility
      content.ts                # Markdown content loading utilities
    schemas/
      contact.ts                # Zod schema for contact form
      blog.ts                   # Blog frontmatter type
      case.ts                   # Case study frontmatter type
    utils/
      reading-time.ts
      date-format.ts
  content/
    blogs/
      slug-1.md
      slug-2.md
      ...                       # 15 blog posts
    cases/
      slug-1.md
      slug-2.md
      ...                       # 5 case studies
  app.css                       # Tailwind CSS import + custom styles
  app.html                      # HTML template
static/
  images/                       # Optimized images (via enhanced-img)
  favicon.ico
  robots.txt
```

## Patterns to Follow

### Pattern 1: Content Loading via Vite Glob Import

**What:** Use Vite's `import.meta.glob` to load all Markdown files and their frontmatter at build time.
**When:** Blog listing pages, case listing pages, sitemap generation.
**Why:** No filesystem reads at runtime. Content is compiled into the build.

```typescript
// src/lib/server/content.ts
import type { BlogPost } from '$lib/schemas/blog';

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const modules = import.meta.glob('/src/content/blogs/*.md', { eager: true });
  const posts = Object.entries(modules).map(([path, module]) => {
    const slug = path.split('/').pop()?.replace('.md', '') ?? '';
    return { ...module.metadata, slug };
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

### Pattern 2: Typed Frontmatter with Zod

**What:** Define frontmatter schemas with Zod and validate at load time.
**When:** Every Markdown content file.
**Why:** Catches missing/malformed frontmatter at build time rather than in production.

```typescript
// src/lib/schemas/blog.ts
import { z } from 'zod';

export const blogFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().date(),
  author: z.string().default('HoneyLink'),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true)
});

export type BlogPost = z.infer<typeof blogFrontmatterSchema> & { slug: string };
```

### Pattern 3: Layout-Level SEO with Page-Level Overrides

**What:** Set default meta tags in +layout.svelte, override per page via page data.
**When:** Every page.
**Why:** Guarantees every page has meta tags. Pages that need custom tags override via load functions.

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { MetaTags } from 'svelte-meta-tags';
  let { data, children } = $props();
</script>

<MetaTags
  title={data.seo?.title ?? 'HoneyLink - Automation & AI Agency'}
  description={data.seo?.description ?? 'Default description'}
  canonical={data.seo?.canonical}
  openGraph={data.seo?.openGraph}
/>

{@render children()}
```

### Pattern 4: Progressive Enhancement Contact Form

**What:** Form works without JavaScript. Enhanced with client-side validation when JS is available.
**When:** Contact form.
**Why:** Works for users with slow connections or disabled JS. Better UX with JS.

```typescript
// src/routes/contact/+page.server.ts
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { contactSchema } from '$lib/schemas/contact';
import { sendContactEmail } from '$lib/server/email';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

const limiter = new RateLimiter({ IP: [5, 'h'] }); // 5 per hour per IP

export const actions = {
  default: async (event) => {
    if (await limiter.isLimited(event)) {
      return message(form, 'Te veel verzoeken. Probeer het later opnieuw.', { status: 429 });
    }
    const form = await superValidate(event, zod(contactSchema));
    if (!form.valid) return { form };

    await sendContactEmail(form.data);
    return message(form, 'Bedankt! We nemen snel contact op.');
  }
};
```

### Pattern 5: Hybrid Prerendering

**What:** Prerender all content pages, keep form-handling pages as SSR.
**When:** Site-wide rendering strategy.
**Why:** Prerendered pages are served as static files (fast), while SSR pages handle dynamic logic (forms, rate limiting).

```typescript
// src/routes/blogs/[slug]/+page.ts
export const prerender = true;  // Blog posts are static

// src/routes/contact/+page.ts
// No prerender export = SSR by default
```

### Pattern 6: Route Groups for Organization

**What:** Use SvelteKit's route groups `(groupName)` to organize related pages without affecting URLs.
**When:** Service pages and legal pages that share layout/logic but have different URL paths.
**Why:** Keeps file system organized. Groups can share layouts without affecting URL structure.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Loading Markdown at Runtime via fs.readFile

**What:** Reading .md files from disk on every request using Node.js fs module.
**Why bad:** Slower than prerendered pages, unnecessary disk I/O, breaks if file paths change after build.
**Instead:** Use `import.meta.glob` or mdsvex preprocessing to compile content at build time. Prerender content pages.

### Anti-Pattern 2: Client-Side Only Form Submission

**What:** Using fetch() to submit the contact form from the client only.
**Why bad:** Breaks without JavaScript. No progressive enhancement. Exposes API endpoints.
**Instead:** Use SvelteKit form actions (+page.server.ts) with Superforms for progressive enhancement.

### Anti-Pattern 3: Storing Secrets in Client-Accessible Code

**What:** Importing Resend API key or other secrets in +page.svelte or +page.ts.
**Why bad:** Client-accessible code is sent to the browser. API keys leaked.
**Instead:** Only import secrets in +page.server.ts or $lib/server/ files. Use $env/static/private.

### Anti-Pattern 4: One Giant +layout.svelte

**What:** Putting all page logic (header, footer, meta, SEO, analytics) in a single root layout.
**Why bad:** Becomes unmaintainable. Hard to test. Blocks reuse.
**Instead:** Use small, focused components. Layout imports Header, Footer, MetaTags. Each is independently testable.

### Anti-Pattern 5: Using adapter-static with SSR Form Actions

**What:** Using adapter-static when you need server-side form handling.
**Why bad:** adapter-static prerenders everything. Form actions require a running server.
**Instead:** Use adapter-node. Prerender content pages selectively. Keep form pages as SSR.

### Anti-Pattern 6: bind: Directive in Svelte 5

**What:** Using `bind:value` syntax from Svelte 4.
**Why bad:** Not idiomatic Svelte 5. Project guidelines explicitly forbid it.
**Instead:** Use `$state()` rune and event handlers for two-way binding in Svelte 5.

## Scalability Considerations

| Concern | Current (launch) | At 10K monthly visitors | At 100K monthly visitors |
|---------|-------------------|------------------------|--------------------------|
| Server load | CPX11 (2 vCPU, 2GB) handles easily. Most pages prerendered = static file serving. | Same server. PM2 cluster mode (2 workers) if needed. | Upgrade to CPX21 (3 vCPU, 4GB). Add Cloudflare CDN for static assets. |
| Content volume | 15 blogs + 5 cases. Build time negligible. | 50-100 posts. Build time still under 30s. | 500+ posts. Consider incremental builds or paginated glob imports. |
| Email delivery | Resend free tier (3000/month). Contact form gets maybe 10-50/month. | Still free tier. | Still free tier unless doing newsletters. |
| Image assets | @sveltejs/enhanced-img at build time. ~50 images. | 200 images. Build time increases by ~1 min. | 1000+ images. Move to runtime image optimization (IPX/sharp endpoint). |
| Deployment | Manual git pull + npm run build + pm2 restart. | Same, but add simple CI/CD (GitHub Actions). | Same CI/CD. Blue-green deployment with PM2. |

## Sources

- [SvelteKit docs: project structure](https://svelte.dev/docs/kit/project-types)
- [SvelteKit docs: page options](https://svelte.dev/docs/kit/page-options)
- [SvelteKit docs: form actions](https://svelte.dev/docs/kit/form-actions)
- [SvelteKit docs: adapter-node](https://svelte.dev/docs/kit/adapter-node)
- [mdsvex docs](https://mdsvex.pngwn.io/docs)
- [Superforms docs](https://superforms.rocks/)
- [SvelteKit Markdown blog guide (Joy of Code)](https://joyofcode.xyz/sveltekit-markdown-blog)
- [SvelteKit Hetzner VPS deployment](https://dev.to/mandrasch/deploy-sveltekit-with-ssr-on-coolify-hetzner-vps-24c5)
