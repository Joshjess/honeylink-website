# Technology Stack

**Project:** HoneyLink Agency Website
**Researched:** 2026-03-20

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Svelte | ^5.54.0 | UI framework | Required by project constraints. Svelte 5 with runes is the current stable, actively maintained, and provides best-in-class performance with minimal bundle size. | HIGH |
| SvelteKit | ^2.55.0 | Application framework | Required by project constraints. SSR by default gives excellent SEO. Hybrid rendering allows prerendering blog/case pages as static while keeping the contact form SSR. | HIGH |
| TypeScript | ^5.9.3 | Type safety | SvelteKit ships with first-class TS support. Use 5.9.x stable -- do NOT use the 6.0 RC (released March 6 2026) as it is the last JS-based compiler and not production-ready yet. | HIGH |
| @sveltejs/adapter-node | ^5.5.4 | Node.js server output | Required for Hetzner VPS deployment with SSR. Produces a standalone Node.js server (build/index.js) that runs on a configurable PORT (default 3000). | HIGH |

### Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Tailwind CSS | ^4.2.2 | Utility-first CSS | v4 is stable, 5x faster full builds than v3. New CSS-first config (no tailwind.config.js). Use the `@tailwindcss/vite` plugin -- NOT PostCSS -- for SvelteKit integration. | HIGH |
| @tailwindcss/vite | ^4.2.2 | Vite plugin for Tailwind | The official recommended integration path for SvelteKit. Simpler than PostCSS, no autoprefixer needed. | HIGH |

### Content / Markdown CMS

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| mdsvex | ^0.12.7 | Markdown preprocessor | The standard for Markdown in SvelteKit. Allows Svelte components inside .md files. Supports remark/rehype plugins. Actively maintained, compatible with Svelte 5. | HIGH |
| remark-gfm | ^4.0.1 | GitHub-flavored Markdown | Tables, strikethrough, task lists, autolinks. Table stakes for blog content. | HIGH |
| rehype-slug | ^6.0.0 | Heading IDs | Adds id attributes to headings for anchor links. Required for case study/blog navigation. | MEDIUM |
| rehype-autolink-headings | ^7.1.0 | Heading anchor links | Adds clickable links to headings. Requires rehype-slug. | MEDIUM |

### Email Delivery

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Resend | ^6.9.4 | Transactional email API | Official SvelteKit guide exists. Simple API (one function call). Free tier: 3000 emails/month (more than enough for a contact form). No SMTP server management. Use in a SvelteKit form action (+page.server.ts) to keep the API key server-side. | HIGH |

### Forms & Validation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| sveltekit-superforms | ^2.29.1 | Form handling | The gold standard for SvelteKit forms. Progressive enhancement, auto-coercion of FormData, tainted form detection, auto-focus on invalid fields. Same author as sveltekit-rate-limiter. | HIGH |
| Zod | ^4.3.6 | Schema validation | Superforms has a dedicated Zod 4 adapter. Single source of truth for form validation on client AND server. TypeScript-first with full type inference. | HIGH |

### Security

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| sveltekit-rate-limiter | ^0.7.0 | Rate limiting | Built specifically for SvelteKit form actions. In-memory limiter (no Redis needed for a single-server VPS). Same author as superforms -- plays well together. | HIGH |
| SvelteKit built-in CSP | N/A | Content Security Policy | SvelteKit has native CSP support via kit.csp config in svelte.config.js. Generates nonces/hashes for inline scripts/styles automatically. No extra library needed. | HIGH |

### SEO

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| svelte-meta-tags | ^4.5.0 | Meta tags & Open Graph | More actively maintained and feature-complete than svead. Provides MetaTags component and JsonLd component for structured data. Supports Svelte 5. | MEDIUM |
| super-sitemap | ^1.0.7 | Sitemap generation | Auto-discovers routes from /src/routes. Supports parameterized routes for blog/case slugs. Easier than hand-rolling sitemap.xml endpoint. | MEDIUM |

### Images

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @sveltejs/enhanced-img | ^0.10.4 | Build-time image optimization | Official SvelteKit package. Auto-generates AVIF/WebP, sets intrinsic dimensions (no CLS), creates responsive sizes. Note: still pre-1.0 / experimental, but actively maintained and shipped weekly. | MEDIUM |

### Infrastructure / Deployment

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Caddy | ^2.x (latest) | Reverse proxy + HTTPS | Automatic Let's Encrypt certificate provisioning and renewal. Zero-config HTTPS. Far simpler than Nginx + certbot. Two-line Caddyfile: `honeylink.nl { reverse_proxy localhost:3000 }`. | HIGH |
| PM2 | ^6.0.14 | Node.js process manager | Auto-restart on crash, cluster mode, log management, startup scripts. Industry standard for Node apps on VPS. | HIGH |
| Docker | latest | Containerization | Multi-stage build for reproducible deployments. Isolates the app from the host. Makes CI/CD straightforward. Optional but recommended. | MEDIUM |
| Hetzner Cloud | CPX11+ | VPS hosting | Project requirement. CPX11 (2 vCPU, 2GB RAM, 40GB SSD) at ~EUR 4.50/month is more than sufficient for this site. | HIGH |

### Dev Tooling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vite | (bundled with SvelteKit) | Build tool | Ships with SvelteKit. No separate install. | HIGH |
| ESLint | ^9.x | Linting | Flat config. SvelteKit scaffolds this with `npx sv create`. | HIGH |
| Prettier | ^3.x | Formatting | Ships with SvelteKit project scaffolding. Use prettier-plugin-svelte for .svelte files. | HIGH |
| prettier-plugin-svelte | ^3.x | Svelte formatting | Formats Svelte 5 syntax correctly. | HIGH |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| CSS | Tailwind CSS v4 | Plain CSS / SCSS | Tailwind is faster to prototype, consistent design tokens, smaller production CSS with purging. Plain CSS is viable but slower for an agency site with many pages. |
| Email | Resend | Mailgun / Nodemailer+SMTP | Mailgun requires DNS verification and has more complex pricing. Nodemailer needs an SMTP server to manage. Resend is simplest with best DX. |
| Markdown | mdsvex | unified pipeline (custom) | mdsvex wraps unified/remark/rehype already. Rolling your own is unnecessary complexity for a blog. mdsvex 1.0 may move away from unified, but 0.12.x is stable now. |
| Forms | sveltekit-superforms | Native SvelteKit form actions | Native actions work but lack progressive enhancement helpers, auto-coercion, tainted detection. Superforms adds these with minimal overhead. |
| Sitemap | super-sitemap | Hand-rolled endpoint | Hand-rolling works (SvelteKit docs show how) but super-sitemap auto-discovers routes and prevents forgetting paths. Worth the small dependency. |
| SEO meta | svelte-meta-tags | svead / hand-rolled svelte:head | svelte-meta-tags is more feature-complete (JSON-LD component built in). Hand-rolling svelte:head works but is error-prone across 30+ pages. |
| Reverse proxy | Caddy | Nginx | Nginx requires manual certbot setup, renewal cron jobs, verbose config. Caddy handles HTTPS automatically with a 2-line config. |
| Process manager | PM2 | systemd service | PM2 provides clustering, log rotation, and ecosystem file. systemd is more minimal but lacks these features. |
| Hosting | Hetzner VPS | Vercel / Netlify | Project requires self-hosted VPS. Vercel/Netlify have vendor lock-in and can get expensive. |
| Images | @sveltejs/enhanced-img | sharp (custom) | Enhanced-img is the official solution, integrates with Vite pipeline. Custom sharp setup is unnecessary work. |
| Validation | Zod 4 | Valibot / ArkType | Zod has the largest ecosystem, best Superforms integration (dedicated adapter), and most community familiarity. Valibot is smaller but less mature. |

## What NOT to Use

| Technology | Why Not |
|------------|---------|
| adapter-static | Site needs SSR for the contact form action and rate limiting. Adapter-static would require a separate API. |
| adapter-auto | Only useful for auto-detecting deploy targets (Vercel, Netlify, etc.). We know our target is Node on a VPS. |
| PostCSS for Tailwind | Tailwind v4 recommends the Vite plugin. PostCSS path adds unnecessary complexity and is slower. |
| svelte-email / react-email | Over-engineering for a simple contact form confirmation email. A plain HTML string in the Resend call is sufficient. |
| Prisma / any database | No database needed. Content is file-based Markdown. Contact form sends email only (no storage). |
| Any headless CMS | Project explicitly chose file-based Markdown for simplicity and zero external dependencies. |
| Next.js / Nuxt | Project requires SvelteKit. |
| TypeScript 6.0 RC | Released March 6, 2026 as RC. Not production-ready. Last JS-based compiler before Go rewrite. Stick with 5.9.x. |

## Installation

```bash
# Scaffold project
npx sv create honeylink-website
# Select: SvelteKit, TypeScript, Tailwind CSS, ESLint, Prettier

# Core dependencies
npm install svelte-meta-tags super-sitemap resend sveltekit-superforms zod sveltekit-rate-limiter

# Markdown/Content
npm install -D mdsvex remark-gfm rehype-slug rehype-autolink-headings

# Images (dev dependency -- runs at build time)
npm install -D @sveltejs/enhanced-img

# Adapter (dev dependency)
npm install -D @sveltejs/adapter-node

# Production process manager (global on VPS)
npm install -g pm2
```

## Key Configuration Notes

### svelte.config.js
```javascript
import adapter from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';

const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
    })
  ],
  kit: {
    adapter: adapter(),
    csp: {
      directives: {
        'script-src': ['self'],
        'style-src': ['self', 'unsafe-inline'] // Tailwind needs this
      }
    },
    prerender: {
      entries: ['*'] // Prerender all discoverable pages
    }
  }
};
```

### Tailwind v4 (vite.config.ts)
```typescript
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
  plugins: [
    enhancedImages(),
    tailwindcss(),
    sveltekit()
  ]
});
```

### Hybrid Rendering Strategy
```
Static (prerendered):     /, /over-ons, /blogs, /blogs/[slug], /cases, /cases/[slug],
                          /services/*, /legal/*, /sitemap.xml
SSR (server-rendered):    /contact (form action + rate limiting)
```

Set `export const prerender = true` in +page.ts for static pages. The contact page stays SSR by default (no prerender export).

## Version Pinning Strategy

Pin major versions with caret (^) to get patches and minor updates. Lock with package-lock.json. Svelte ecosystem moves fast -- update monthly but test thoroughly.

## Sources

- [SvelteKit npm](https://www.npmjs.com/package/@sveltejs/kit) - v2.55.0
- [Svelte npm](https://www.npmjs.com/package/svelte) - v5.54.0
- [SvelteKit Node Adapter docs](https://svelte.dev/docs/kit/adapter-node)
- [SvelteKit SEO docs](https://svelte.dev/docs/kit/seo)
- [SvelteKit Page Options docs](https://svelte.dev/docs/kit/page-options)
- [SvelteKit CSP Configuration](https://svelte.dev/docs/kit/configuration)
- [mdsvex docs](https://mdsvex.pngwn.io/docs) - v0.12.7
- [Tailwind CSS v4 announcement](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS v4 SvelteKit setup guide](https://dev.to/fedor-pasynkov/setting-up-tailwind-css-v4-in-sveltekit-the-vite-plugin-way-a-guide-based-on-real-issues-380n)
- [Resend SvelteKit docs](https://resend.com/docs/send-with-sveltekit) - v6.9.4
- [Superforms docs](https://superforms.rocks/) - v2.29.1
- [sveltekit-rate-limiter GitHub](https://github.com/ciscoheat/sveltekit-rate-limiter) - v0.7.0
- [super-sitemap GitHub](https://github.com/jasongitmail/super-sitemap) - v1.0.7
- [svelte-meta-tags npm](https://www.npmjs.com/package/svelte-meta-tags) - v4.5.0
- [@sveltejs/enhanced-img npm](https://www.npmjs.com/package/@sveltejs/enhanced-img) - v0.10.4
- [Caddy automatic HTTPS docs](https://caddyserver.com/docs/automatic-https)
- [PM2 docs](https://pm2.keymetrics.io/) - v6.0.14
- [SvelteKit Hetzner VPS deployment guide](https://dev.to/mandrasch/deploy-sveltekit-with-ssr-on-coolify-hetzner-vps-24c5)
- [SvelteKit Docker containerization (Feb 2026)](https://oneuptime.com/blog/post/2026-02-08-how-to-containerize-a-sveltekit-application-with-docker/view)
- [TypeScript npm](https://www.npmjs.com/package/typescript) - v5.9.3
- [Zod npm](https://www.npmjs.com/package/zod) - v4.3.6
