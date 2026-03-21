# Phase 3: Functionality and SEO - Research

**Researched:** 2026-03-21
**Domain:** Contact form, SEO meta/structured data, sitemap, security headers, image optimization
**Confidence:** HIGH

## Summary

Phase 3 adds the final production-readiness features: a contact form with email delivery via Resend, comprehensive SEO coverage (meta tags, OG, JSON-LD, sitemap, robots.txt), security hardening (CSP headers, rate limiting, input sanitization), and build-time image optimization. All libraries are already decided in CLAUDE.md and verified as current stable versions. The integration patterns are well-documented with official examples for each.

The main architectural decision is where to place SEO meta tags. The recommended pattern is a `MetaTags` component in the root `+layout.svelte` fed by page-level data from load functions, with page-specific overrides. For the contact form, sveltekit-superforms v2 with the Zod 4 adapter provides the standard pattern -- schema definition, server-side validation, progressive enhancement via `use:enhance`. Superforms officially requires `bind:value` on form inputs for two-way binding; this is valid Svelte 5 syntax despite the project's general "dont use bind" guideline.

**Primary recommendation:** Build the contact form with superforms + Zod 4 in a single `+page.server.ts` form action. Add SEO via svelte-meta-tags `MetaTags` and `JsonLd` components with page-level data. Use hooks.server.ts for CSP headers and the rate limiter. Apply enhanced-img incrementally to existing images.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01: Two-column layout matching Framer structure -- left side has heading, description text, and contact details (phone, email, address, KvK, BTW); right side has the contact form instead of the calendar widget
- D-02: Contact details preserved from Framer: phone 020 308 68 40, email info@honeylink.nl, address Marco Polostraat 275-3, 1056DN Amsterdam, KvK 96561556, BTW NL005216613B11
- D-03: FAQ section below the form area, reusing FaqAccordion/FaqItem components with contact-specific questions from Framer scrape
- D-04: Form fields: name, email, company, message (as specified in requirements)
- D-05: Inline success message on the same page (no redirect) -- green confirmation banner replacing the form temporarily
- D-06: Error feedback shown inline below the form with field-level validation errors
- D-07: Form submissions sent to info@honeylink.nl
- D-08: No confirmation email to submitter -- just deliver the lead to HoneyLink
- D-09: Email contains all form fields (name, email, company, message) with reply-to set to the submitter's email address
- D-10: Plain HTML email template -- professional but simple, no heavy design
- D-11: Title format: "Page Name | HoneyLink" (page-first for SEO weight)
- D-12: Homepage title: "HoneyLink | Automation en AI Agency"
- D-13: Default OG image: use the HoneyLink logo or a branded social card image from static/images/
- D-14: Descriptions: page-specific Dutch descriptions for each page type
- D-15: Blog posts use their frontmatter excerpt as meta description, featured image as OG image
- D-16: Case studies use their frontmatter excerpt as meta description, featured image as OG image
- D-17: Organization schema on homepage (name, url, logo, contactPoint)
- D-18: Article schema on blog posts (headline, author, datePublished, image)
- D-19: Service schema on service pages (name, description, provider)
- D-20: BreadcrumbList on all inner pages
- D-21: No third-party analytics at launch -- CSP can be strict (self + fonts only)
- D-22: CSP configured in hooks.server.ts using SvelteKit's handle hook for response headers
- D-23: Rate limiting applied only to the contact form action, not to page loads
- D-24: Resend API key stored in environment variable RESEND_API_KEY, never in client bundle
- D-25: @sveltejs/enhanced-img for automatic AVIF/WebP conversion at build time
- D-26: Apply to existing images already in use across the site (hero, team, blog, case images)

### Claude's Discretion
- Exact CSP directives and nonce strategy
- robots.txt content
- Sitemap route discovery configuration
- Form animation/transition details
- Email HTML template styling
- Enhanced-img srcset breakpoints

### Deferred Ideas (OUT OF SCOPE)
- Privacy-friendly analytics (Plausible/Umami) -- tracked as ANLY-01 in v2 requirements
- Cookie consent banner -- tracked as ANLY-02, only needed if analytics added
- Confirmation email to form submitter -- can add later if needed
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CNTC-01 | Contact form at /contact with name, email, company, message fields | Superforms + Zod 4 schema, two-column layout per D-01 |
| CNTC-02 | Form validation with Superforms + Zod (client and server-side) | zod4 adapter, superValidate in load + actions |
| CNTC-03 | Email delivery of form submissions via Resend | Resend SDK in form action, $env/static/private for API key |
| CNTC-04 | Rate limiting on contact form (5 submissions per IP per hour) | sveltekit-rate-limiter IP: [5, 'h'] in form action |
| CNTC-05 | Success/error feedback after form submission | Superforms message() and $message store, inline UI per D-05/D-06 |
| SEO-01 | All 36 existing URLs preserved with identical paths | super-sitemap paramValues for all 36 URLs from sitemap.xml |
| SEO-02 | Meta tags (title, description) on every page | svelte-meta-tags MetaTags component in layout + page overrides |
| SEO-03 | Open Graph and Twitter card meta tags on every page | MetaTags openGraph and twitter props |
| SEO-04 | Auto-generated sitemap.xml with all routes | super-sitemap /sitemap.xml/+server.ts endpoint |
| SEO-05 | Canonical URLs on all pages | MetaTags canonical prop using siteConfig.url + page.url.pathname |
| SEO-06 | Structured data (JSON-LD) | svelte-meta-tags JsonLd component per D-17/D-18/D-19/D-20 |
| SEO-07 | robots.txt configured correctly | Static file at static/robots.txt |
| SEO-08 | Image optimization with AVIF/WebP | @sveltejs/enhanced-img in vite.config.ts + enhanced:img tags |
| SECR-01 | CSP headers configured in hooks.server.ts | SvelteKit handle hook with Content-Security-Policy header |
| SECR-02 | HTTPS enforced via Caddy | Phase 4 (deployment) -- Caddy config, not code |
| SECR-03 | Input sanitization on contact form | Zod schema validation + HTML entity escaping in email body |
| SECR-04 | Environment variables for secrets | $env/static/private for RESEND_API_KEY |
</phase_requirements>

## Standard Stack

### Core (Phase 3 additions)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| sveltekit-superforms | ^2.30.0 | Form handling with progressive enhancement | Gold standard for SvelteKit forms. Auto-coercion, tainted detection, $message store for success/error feedback. Same author as rate-limiter. |
| zod | ^4.3.6 | Schema validation (client + server) | Superforms has dedicated `zod4` adapter. Single schema drives both client-side and server-side validation. |
| resend | ^6.9.4 | Transactional email API | Simple one-function API. Free tier 3000 emails/month. Official SvelteKit guide. Server-side only via $env/static/private. |
| svelte-meta-tags | ^4.5.0 | SEO meta tags + JSON-LD | MetaTags component for title/description/OG/Twitter. JsonLd component for structured data. Deep merge for layout + page overrides. |
| super-sitemap | ^1.0.7 | Sitemap generation | Auto-discovers routes from /src/routes. Supports paramValues for [slug] routes. Throws error on missing param data (prevents omissions). |
| sveltekit-rate-limiter | ^0.7.0 | Rate limiting | Built for SvelteKit form actions. In-memory (no Redis needed). IP-based limiting with configurable windows. |
| @sveltejs/enhanced-img | ^0.10.4 | Build-time image optimization | Official SvelteKit package. Auto AVIF/WebP, intrinsic dimensions (no CLS), responsive srcset. Vite plugin. |

### Already Installed (from Phase 1-2)
| Library | Version | Purpose |
|---------|---------|---------|
| svelte | ^5.51.0 | UI framework (runes syntax) |
| @sveltejs/kit | ^2.50.2 | Application framework |
| tailwindcss | ^4.2.2 | Utility-first CSS |
| mdsvex | ^0.12.7 | Markdown preprocessor |

**Installation:**
```bash
npm install sveltekit-superforms zod resend svelte-meta-tags super-sitemap sveltekit-rate-limiter
npm install -D @sveltejs/enhanced-img
```

## Architecture Patterns

### Recommended Project Structure (new files for Phase 3)
```
src/
├── hooks.server.ts                        # NEW: CSP headers (handle hook)
├── routes/
│   ├── contact/
│   │   ├── +page.server.ts                # NEW: form load + action (superforms + resend + rate-limiter)
│   │   └── +page.svelte                   # NEW: contact page with form UI
│   ├── sitemap.xml/
│   │   └── +server.ts                     # NEW: super-sitemap endpoint
│   ├── robots.txt/
│   │   └── +server.ts                     # NEW: robots.txt endpoint (or static/robots.txt)
│   ├── +layout.svelte                     # MODIFY: add MetaTags component
│   └── +layout.server.ts                  # MODIFY: add SEO data to layout load
├── lib/
│   ├── server/
│   │   └── email.ts                       # NEW: Resend email helper
│   └── schemas/
│       └── contact.ts                     # NEW: Zod schema for contact form
static/
├── robots.txt                             # ALTERNATIVE: static robots.txt (simpler)
└── images/
    └── og-default.jpg                     # NEW: default OG image for social sharing
```

### Pattern 1: Superforms Contact Form with Zod 4
**What:** Complete form lifecycle -- schema, server validation, client rendering, progressive enhancement.
**When to use:** The contact form at /contact.

**Schema (src/lib/schemas/contact.ts):**
```typescript
// Source: https://superforms.rocks/get-started
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Naam is verplicht'),
  email: z.email('Ongeldig e-mailadres'),
  company: z.string().optional(),
  message: z.string().min(10, 'Bericht moet minimaal 10 tekens bevatten')
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

**Server (+page.server.ts):**
```typescript
// Source: https://superforms.rocks/get-started, https://github.com/ciscoheat/sveltekit-rate-limiter
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail, error } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { contactSchema } from '$lib/schemas/contact';
import { sendContactEmail } from '$lib/server/email';
import type { PageServerLoad, Actions } from './$types';

const limiter = new RateLimiter({
  IP: [5, 'h'] // 5 submissions per hour per IP (per CNTC-04)
});

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod4(contactSchema));
  return { form };
};

export const actions: Actions = {
  default: async (event) => {
    if (await limiter.isLimited(event)) {
      return error(429, 'Te veel verzoeken. Probeer het later opnieuw.');
    }

    const form = await superValidate(event.request, zod4(contactSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { name, email, company, message: msg } = form.data;

    const result = await sendContactEmail({ name, email, company, message: msg });

    if (!result.success) {
      return message(form, 'Er is iets misgegaan. Probeer het later opnieuw.', { status: 500 });
    }

    return message(form, 'Bedankt! We nemen zo snel mogelijk contact met u op.');
  }
};
```

**Client (+page.svelte):**
```svelte
<script lang="ts">
  import { superForm } from 'sveltekit-superforms';

  let { data } = $props();

  const { form, errors, constraints, message, enhance, delayed } =
    superForm(data.form);
</script>

{#if $message}
  <div class="bg-green-100 text-green-800 p-4 rounded-lg">
    {$message}
  </div>
{:else}
  <form method="POST" use:enhance>
    <input
      type="text"
      name="name"
      aria-invalid={$errors.name ? 'true' : undefined}
      bind:value={$form.name}
      {...$constraints.name}
    />
    {#if $errors.name}<span class="text-red-500">{$errors.name}</span>{/if}
    <!-- repeat for email, company, message -->
    <button type="submit" disabled={$delayed}>Versturen</button>
  </form>
{/if}
```

**IMPORTANT NOTE on bind:value:** Superforms requires `bind:value` for two-way reactive binding between form stores and inputs. The project guideline "dont use bind" was intended for Svelte 4's `bind:this` pattern and component bindings. `bind:value` on native HTML elements IS valid Svelte 5 syntax and is the official Superforms approach. Use it for form inputs only.

### Pattern 2: SEO Meta Tags via Layout + Page Data
**What:** Centralized meta tags in root layout with per-page overrides from load functions.
**When to use:** Every page in the site.

**Layout approach (src/routes/+layout.svelte):**
```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import { MetaTags } from 'svelte-meta-tags';

  let { children, data } = $props();

  // Derive page-specific SEO data from page.data
  let seoTitle = $derived(
    $page.data.seo?.title ?? `${data.siteConfig.name} | Automation en AI Agency`
  );
  let seoDescription = $derived(
    $page.data.seo?.description ?? data.siteConfig.description
  );
  let canonicalUrl = $derived(
    `${data.siteConfig.url}${$page.url.pathname}`
  );
</script>

<MetaTags
  title={seoTitle}
  description={seoDescription}
  canonical={canonicalUrl}
  openGraph={{
    type: 'website',
    url: canonicalUrl,
    title: seoTitle,
    description: seoDescription,
    siteName: data.siteConfig.name,
    images: [
      {
        url: $page.data.seo?.image ?? `${data.siteConfig.url}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: seoTitle
      }
    ]
  }}
  twitter={{
    cardType: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    image: $page.data.seo?.image ?? `${data.siteConfig.url}/images/og-default.jpg`
  }}
/>
```

**Page load function returns seo data:**
```typescript
// Example: src/routes/automation/+page.ts
export const load = () => ({
  seo: {
    title: 'Automation | HoneyLink',
    description: 'Automatiseer uw bedrijfsprocessen met HoneyLink...'
  }
});
```

**Blog post seo from frontmatter:**
```typescript
// src/routes/blogs/[slug]/+page.ts (extends existing load)
return {
  content: post.default,
  meta: { ...post.metadata, readingTime },
  seo: {
    title: `${post.metadata.title} | HoneyLink`,
    description: post.metadata.excerpt,
    image: `https://honeylink.nl${post.metadata.image}`
  }
};
```

### Pattern 3: JSON-LD Structured Data
**What:** Schema.org structured data for search engine rich results.
**When to use:** Homepage (Organization), blog posts (Article), service pages (Service), all inner pages (BreadcrumbList).

```svelte
<script lang="ts">
  import { JsonLd } from 'svelte-meta-tags';
</script>

<!-- Homepage: Organization -->
<JsonLd schema={{
  '@type': 'Organization',
  name: 'HoneyLink',
  url: 'https://honeylink.nl',
  logo: 'https://honeylink.nl/images/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+31-20-308-68-40',
    email: 'info@honeylink.nl',
    contactType: 'customer service'
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Marco Polostraat 275-3',
    addressLocality: 'Amsterdam',
    postalCode: '1056DN',
    addressCountry: 'NL'
  }
}} />

<!-- Blog post: Article -->
<JsonLd schema={{
  '@type': 'Article',
  headline: meta.title,
  author: { '@type': 'Person', name: meta.author },
  datePublished: meta.date,
  image: `https://honeylink.nl${meta.image}`,
  publisher: {
    '@type': 'Organization',
    name: 'HoneyLink',
    logo: { '@type': 'ImageObject', url: 'https://honeylink.nl/images/logo.png' }
  }
}} />

<!-- Service page: Service -->
<JsonLd schema={{
  '@type': 'Service',
  name: 'Automation',
  description: 'Automatiseer uw bedrijfsprocessen...',
  provider: {
    '@type': 'Organization',
    name: 'HoneyLink',
    url: 'https://honeylink.nl'
  }
}} />

<!-- BreadcrumbList on all inner pages -->
<JsonLd schema={{
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://honeylink.nl' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://honeylink.nl/blogs' },
    { '@type': 'ListItem', position: 3, name: meta.title }
  ]
}} />
```

### Pattern 4: Super-Sitemap with Parameterized Routes
**What:** Auto-generated sitemap.xml with blog and case slugs.
**When to use:** /sitemap.xml endpoint.

```typescript
// src/routes/sitemap.xml/+server.ts
// Source: https://github.com/jasongitmail/super-sitemap
import type { RequestHandler } from '@sveltejs/kit';
import * as sitemap from 'super-sitemap';
import { getBlogPosts, getCases } from '$lib/server/content';

export const GET: RequestHandler = async () => {
  const blogSlugs = getBlogPosts().map((p) => p.slug);
  const caseSlugs = getCases().map((c) => c.slug);

  return await sitemap.response({
    origin: 'https://honeylink.nl',
    paramValues: {
      '/blogs/[slug]': blogSlugs,
      '/cases/[slug]': caseSlugs
    },
    excludeRoutePatterns: [
      '^/sitemap\\.xml$'  // exclude the sitemap route itself
    ]
  });
};
```

### Pattern 5: CSP Headers via hooks.server.ts
**What:** Content Security Policy headers applied to all SSR responses.
**When to use:** Global security hardening.

```typescript
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  // Strict CSP -- no third-party services at launch (D-21)
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",  // Tailwind injects inline styles
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'"
    ].join('; ')
  );

  // Additional security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
};
```

**NOTE on CSP approach:** Decision D-22 says "CSP configured in hooks.server.ts using SvelteKit's handle hook for response headers." This means setting headers manually in the handle hook, NOT using SvelteKit's built-in `kit.csp` config in svelte.config.js. The handle hook approach gives full control and is simpler for a site with no third-party scripts. SvelteKit's kit.csp is designed for nonce/hash management of inline scripts, which is not needed when no inline scripts exist. Since Tailwind injects inline styles, `'unsafe-inline'` is needed for `style-src` or alternatively use SvelteKit's `kit.csp` with mode: 'nonce' for style nonces. The simpler approach is `'unsafe-inline'` for styles only.

### Pattern 6: Resend Email Helper
**What:** Server-side email sending isolated in $lib/server/.
**When to use:** Contact form action.

```typescript
// src/lib/server/email.ts
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  try {
    const { error } = await resend.emails.send({
      from: 'HoneyLink Contact <noreply@honeylink.nl>',
      to: 'info@honeylink.nl',
      replyTo: data.email,
      subject: `Nieuw contactformulier: ${data.name}`,
      html: buildEmailHtml(data)
    });

    return { success: !error, error };
  } catch (err) {
    return { success: false, error: err };
  }
}

function buildEmailHtml(data: ContactEmailData): string {
  // Sanitize HTML entities to prevent XSS in email body
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">Nieuw bericht via honeylink.nl</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">Naam:</td><td style="padding: 8px;">${esc(data.name)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">E-mail:</td><td style="padding: 8px;">${esc(data.email)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Bedrijf:</td><td style="padding: 8px;">${esc(data.company ?? '-')}</td></tr>
      </table>
      <h3 style="color: #1a1a1a; margin-top: 24px;">Bericht:</h3>
      <p style="white-space: pre-wrap;">${esc(data.message)}</p>
    </div>
  `;
}
```

### Pattern 7: Enhanced Image Optimization
**What:** Build-time AVIF/WebP conversion with responsive srcset.
**When to use:** All static images throughout the site.

**Vite config (vite.config.ts -- add enhancedImages):**
```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    enhancedImages(),  // MUST come before sveltekit()
    tailwindcss(),
    sveltekit()
  ]
});
```

**Usage in components:**
```svelte
<!-- Replace <img src="/images/homepage/hero-illustration.png"> with: -->
<enhanced:img src="$lib/assets/homepage/hero-illustration.png" alt="Hero" />

<!-- For hero/large images, specify sizes: -->
<enhanced:img
  src="$lib/assets/homepage/hero-illustration.png"
  alt="Hero illustratie"
  sizes="min(1280px, 100vw)"
/>
```

**CRITICAL LIMITATION:** enhanced:img only works with static imports resolved at build time. Images must be in `src/` (e.g., `src/lib/assets/`) -- NOT in `static/`. This means existing images in `static/images/` need to be moved to `src/lib/assets/` (or a similar src-relative path) and imported via Vite paths. Images referenced dynamically from Markdown frontmatter (blog/case hero images at `/images/blogs/...`) cannot use enhanced:img because they are runtime paths. The optimization applies to component-level images only (hero sections, team photos, client logos, etc.).

### Anti-Patterns to Avoid
- **Putting Resend API key in +page.ts (universal load):** This leaks the key to the client. Use +page.server.ts exclusively with $env/static/private.
- **Using kit.csp AND manual CSP headers:** Choose one approach. Using both creates duplicate/conflicting headers.
- **Forgetting to await rate limiter preflight:** If using cookie-based rate limiting, the load function must await the preflight. With IP-only limiting this is not needed.
- **Using native SvelteKit form actions without Superforms:** Loses progressive enhancement, auto-coercion, field-level error binding, and tainted form detection.
- **Putting meta tags in individual page `<svelte:head>` AND using MetaTags component:** Creates duplicate meta tags. Use one approach consistently.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation | Custom validation logic | sveltekit-superforms + Zod 4 | Edge cases: coercion from FormData strings, progressive enhancement without JS, field-level error tracking, tainted detection |
| Rate limiting | IP tracking Map/Set | sveltekit-rate-limiter | Memory leaks, timer management, race conditions, multi-layer limiting |
| Email delivery | Nodemailer + SMTP | Resend SDK | SMTP server management, connection pooling, retry logic, delivery monitoring |
| Meta tags | Manual `<svelte:head>` on 30+ pages | svelte-meta-tags | Consistency, OG image dimensions, Twitter card types, JSON-LD serialization, deep merge for layout inheritance |
| Sitemap | Manual XML string | super-sitemap | Route auto-discovery, parameterized routes, forgetting to add new pages |
| Image optimization | Sharp pipeline | @sveltejs/enhanced-img | Vite integration, automatic srcset, format negotiation, CLS prevention |
| CSP nonces | Manual nonce generation | SvelteKit kit.csp (if nonces needed) | Cryptographic nonce generation, per-request injection, prerender compatibility |
| HTML sanitization in emails | Regex-based sanitization | Simple HTML entity escaping (manual is fine here) | Email context is limited -- entity escaping of &, <, > is sufficient for a known-format template |

**Key insight:** This phase has 7 distinct problem domains (forms, email, rate limiting, SEO, sitemap, security, images). Each has a small, focused library purpose-built for SvelteKit. Hand-rolling any of these creates maintenance burden and misses edge cases the library authors have already solved.

## Common Pitfalls

### Pitfall 1: Resend "from" Domain Must Be Verified
**What goes wrong:** Emails fail to send or go to spam because the `from` domain is not verified in Resend.
**Why it happens:** Resend requires domain verification for production sending. The `onboarding@resend.dev` test address only works in development.
**How to avoid:** Before production deployment, verify `honeylink.nl` domain in Resend dashboard (add DNS records: SPF, DKIM, DMARC). During development, use `onboarding@resend.dev` as the from address.
**Warning signs:** Resend API returns error about unverified domain. Check error response in the `sendContactEmail` return value.

### Pitfall 2: Superforms bind:value is Required
**What goes wrong:** Form inputs don't update the form store, validation doesn't trigger.
**Why it happens:** Using `value={$form.name}` (one-way) instead of `bind:value={$form.name}` (two-way). Or using oninput handlers manually.
**How to avoid:** Always use `bind:value={$form.name}` for Superforms inputs. This IS valid Svelte 5 syntax. The project guideline about avoiding bind was about Svelte 4 component binding patterns, not native element `bind:value`.
**Warning signs:** Form submits with empty/stale values despite typing in inputs.

### Pitfall 3: Enhanced-img Only Works with Static Imports
**What goes wrong:** `enhanced:img` fails with runtime/dynamic image paths.
**Why it happens:** It is a build-time Vite plugin that transforms imports at compile time. Paths must be statically analyzable.
**How to avoid:** Use `enhanced:img` only for images known at build time (hero images, team photos, logos). For Markdown blog/case images stored in `static/`, keep using standard `<img>` tags. Move component-referenced images from `static/` to `src/lib/assets/`.
**Warning signs:** Build errors mentioning "could not resolve" or images not being optimized.

### Pitfall 4: Duplicate Meta Tags
**What goes wrong:** Each page renders both layout MetaTags AND page-specific MetaTags, creating duplicate title/description in HTML head.
**Why it happens:** Using MetaTags in both +layout.svelte and individual +page.svelte files.
**How to avoid:** Use MetaTags ONLY in +layout.svelte. Pass page-specific SEO data via the load function (page.data.seo) and let the layout derive the correct values. Pages that need special tags (like JsonLd) import only the JsonLd component, not MetaTags.
**Warning signs:** View page source shows duplicate `<title>` or `<meta name="description">` tags.

### Pitfall 5: CSP Blocks Tailwind Inline Styles
**What goes wrong:** Page renders without styles. Console shows CSP violation for inline styles.
**Why it happens:** Tailwind CSS (especially with Vite plugin) may inject inline `<style>` blocks. A strict `style-src 'self'` policy blocks them.
**How to avoid:** Use `style-src 'self' 'unsafe-inline'` in the CSP policy. This is acceptable because CSS injection is not a meaningful attack vector (XSS comes from scripts, not styles). Alternatively, use SvelteKit's `kit.csp` with mode: 'nonce' to auto-nonce inline styles.
**Warning signs:** Unstyled page content (FOUC), CSP violation errors in browser console.

### Pitfall 6: Rate Limiter Returns error() Not fail()
**What goes wrong:** Rate-limited requests get a full error page instead of inline form feedback.
**Why it happens:** Using `error(429)` throws a SvelteKit error page. Using `fail(429, { form })` returns the form with error state for inline display.
**How to avoid:** For Superforms integration, use `return message(form, 'Te veel verzoeken...', { status: 429 })` instead of `error(429)`. This shows the rate limit message inline in the form UI.
**Warning signs:** User sees a generic 429 error page instead of a message in the form.

### Pitfall 7: Sitemap Missing Blog/Case Slugs
**What goes wrong:** Sitemap.xml only shows static routes, missing all /blogs/[slug] and /cases/[slug] URLs.
**Why it happens:** Not providing paramValues to super-sitemap for parameterized routes.
**How to avoid:** Pass all slugs via paramValues object. Super-sitemap throws an error if parameterized routes exist without corresponding paramValues (this is a safety feature).
**Warning signs:** Build/runtime error from super-sitemap about missing param data.

### Pitfall 8: OG Images Need Absolute URLs
**What goes wrong:** Social media previews show broken images.
**Why it happens:** Using relative paths like `/images/blogs/hero.jpg` instead of absolute `https://honeylink.nl/images/blogs/hero.jpg`.
**How to avoid:** Always prefix OG image URLs with the site origin (`siteConfig.url`). Use `${siteConfig.url}${meta.image}` pattern.
**Warning signs:** Facebook/Twitter/LinkedIn debugger tools show "image not found".

## Code Examples

### robots.txt
```
# static/robots.txt
User-agent: *
Allow: /
Sitemap: https://honeylink.nl/sitemap.xml
```

### Contact Page FAQ Data (from Framer scrape)
```typescript
// src/lib/data/contact.ts
import type { FaqItemData } from '$lib/types';

export const contactFaqItems: FaqItemData[] = [
  {
    question: 'Wat zijn praktische voorbeelden van diensten die HoneyLink aanbiedt?',
    answer: 'Een automation kan je efficienter laten werken door het vereenvoudigen van administratie...'
  },
  {
    question: 'Welke bedrijven hebben baat bij een samenwerking met HoneyLink?',
    answer: '...'  // From Framer scrape or reconstructed
  },
  {
    question: 'Wat kan ik verwachten van een adviesgesprek?',
    answer: '...'
  },
  {
    question: 'Hoe ziet de samenwerking eruit nadat ik klant ben geworden bij HoneyLink?',
    answer: '...'
  },
  {
    question: 'Wat is een workflow automation?',
    answer: '...'
  }
];
```

### SEO Data Per-Page Pattern
```typescript
// Each page's load function returns seo data for the layout MetaTags
// Homepage
export const load = () => ({
  seo: {
    title: 'HoneyLink | Automation en AI Agency',
    description: 'HoneyLink helpt ondernemers met het automatiseren van bedrijfsprocessen middels chatbots en slimme workflows.'
  }
});

// Service page
export const load = () => ({
  seo: {
    title: 'Automation | HoneyLink',
    description: 'Automatiseer uw bedrijfsprocessen met HoneyLink. Efficienter werken en kosten besparen.'
  }
});

// Blog post (already has frontmatter)
return {
  seo: {
    title: `${metadata.title} | HoneyLink`,
    description: metadata.excerpt,
    image: `https://honeylink.nl${metadata.image}`,
    type: 'article'
  }
};
```

### Enhanced Image Migration Pattern
```svelte
<!-- BEFORE (current, using static/ path): -->
<img src="/images/homepage/hero-illustration.png" alt="Hero" />

<!-- AFTER (using enhanced:img with src/ path): -->
<enhanced:img src="$lib/assets/homepage/hero-illustration.png" alt="Hero" />

<!-- For images that must stay dynamic (Markdown blog images), keep as-is: -->
<img src={meta.image} alt={meta.title} />
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| svelte:head manually | svelte-meta-tags component | 2024 (v4+) | Type-safe props, deep merge, OG/Twitter built-in |
| zod v3 + `zod` adapter | Zod v4 + `zod4` adapter | 2025 (zod 4.0) | New adapter import, `.email()` instead of `.string().email()` |
| Superforms with `export let` | Superforms with `$props()` | 2024 (Svelte 5) | Use `let { data } = $props()` in runes mode |
| Hand-rolled sitemap endpoint | super-sitemap library | 2023+ | Auto route discovery, param validation |
| vite-imagetools | @sveltejs/enhanced-img | 2024+ | Official SvelteKit support, simpler API |

**Deprecated/outdated:**
- `zod` adapter (for Zod 3): Use `zod4` adapter for Zod 4.x
- `svelte:component` for dynamic components: Use `$derived()` + direct render in Svelte 5
- `export let` in Svelte components: Use `$props()` runes

## Open Questions

1. **Enhanced-img and existing static/ images**
   - What we know: enhanced:img requires images in src/ for build-time processing. Current images are in static/images/.
   - What's unclear: How many images should be moved from static/ to src/lib/assets/ vs left as-is? Moving breaks existing Markdown frontmatter paths.
   - Recommendation: Move only component-referenced images (hero, team, client logos) to src/lib/assets/. Leave Markdown-referenced images (blog/case heroes) in static/ as standard `<img>` tags. This gives optimization on the most impactful images without breaking content.

2. **Resend Domain Verification**
   - What we know: Resend requires domain verification for production sending. Free tier allows 3000 emails/month.
   - What's unclear: When should domain verification happen? Is honeylink.nl already set up in Resend?
   - Recommendation: Use `onboarding@resend.dev` during development. Domain verification is a deployment-time task (Phase 4 adjacent). Code should use environment variable for the from address or a constant that can be changed.

3. **CSP nonce vs unsafe-inline for styles**
   - What we know: Tailwind may inject inline styles. SvelteKit can auto-generate nonces via kit.csp.
   - What's unclear: Does Tailwind v4 with @tailwindcss/vite inject inline `<style>` blocks that need nonces?
   - Recommendation: Start with `'unsafe-inline'` for style-src (pragmatic, low risk). If the build shows no inline styles, tighten to `'self'` only. CSS injection is not a meaningful attack vector.

## Sources

### Primary (HIGH confidence)
- [Superforms official docs](https://superforms.rocks/get-started) - Zod 4 adapter, form lifecycle, progressive enhancement
- [Superforms rate limiting guide](https://superforms.rocks/rate-limiting) - Integration with sveltekit-rate-limiter
- [Resend SvelteKit docs](https://resend.com/docs/send-with-sveltekit) - SDK setup, email sending
- [SvelteKit CSP Configuration](https://svelte.dev/docs/kit/configuration) - kit.csp modes, nonces/hashes
- [SvelteKit Images docs](https://svelte.dev/docs/kit/images) - @sveltejs/enhanced-img setup and usage
- [SvelteKit SEO docs](https://svelte.dev/docs/kit/seo) - Official SEO guidance
- [super-sitemap GitHub](https://github.com/jasongitmail/super-sitemap) - paramValues, route discovery
- [sveltekit-rate-limiter GitHub](https://github.com/ciscoheat/sveltekit-rate-limiter) - IP limiting, form action integration

### Secondary (MEDIUM confidence)
- [svelte-meta-tags npm](https://www.npmjs.com/package/svelte-meta-tags) - v4.5.0, MetaTags and JsonLd components
- [svelte-meta-tags GitHub](https://github.com/oekazuma/svelte-meta-tags) - Repository and examples
- [SvelteKit CSP guide (Hugo Sum)](https://hugosum.com/blog/creating-content-security-policy-in-sveltekit) - Practical CSP setup patterns
- [Superforms Zod 4 issue #594](https://github.com/ciscoheat/sveltekit-superforms/issues/594) - Zod 4 adapter compatibility
- [Superforms Svelte 5 runes issue #577](https://github.com/ciscoheat/sveltekit-superforms/issues/577) - $props() compatibility

### Version Verification (npm registry, 2026-03-21)
- sveltekit-superforms: 2.30.0 (latest)
- zod: 4.3.6 (latest)
- resend: 6.9.4 (latest)
- svelte-meta-tags: 4.5.0 (latest)
- super-sitemap: 1.0.7 (latest)
- sveltekit-rate-limiter: 0.7.0 (latest)
- @sveltejs/enhanced-img: 0.10.4 (latest)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified current on npm. Versions match CLAUDE.md recommendations.
- Architecture: HIGH - Patterns from official docs and verified examples. Superforms + Zod 4 adapter confirmed working.
- Pitfalls: HIGH - Known issues documented in GitHub issues and official docs. bind:value requirement confirmed.
- SEO patterns: MEDIUM - svelte-meta-tags docs hard to access directly, but API inferred from npm/GitHub/playground examples.
- Enhanced-img: MEDIUM - Static import limitation verified in official docs. Migration strategy for existing images is recommendation, not verified pattern.

**Research date:** 2026-03-21
**Valid until:** 2026-04-21 (stable libraries, 30-day window)
