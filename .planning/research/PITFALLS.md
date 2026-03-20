# Domain Pitfalls

**Domain:** SvelteKit agency website with Framer migration and Markdown CMS
**Researched:** 2026-03-20

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: Broken URLs After Migration (SEO Disaster)

**What goes wrong:** Framer URLs do not match SvelteKit route structure. Google drops rankings for pages returning 404.
**Why it happens:** Framer may use different URL patterns (trailing slashes, case sensitivity, encoded characters). Not mapping every URL before building routes.
**Consequences:** Loss of Google rankings built over months/years. Backlinks from external sites break. 404 errors in Search Console.
**Prevention:**
1. Before any code: crawl honeylink.nl with a sitemap crawler or `wget --spider` to get every URL.
2. Create a URL mapping document: Framer URL -> SvelteKit route.
3. Implement redirects in hooks.server.ts for any URL that changes.
4. After deployment: test every URL from the mapping. Use Google Search Console to verify no 404s.
**Detection:** Google Search Console "Coverage" report shows 404 errors. Check within 48 hours of DNS switch.

### Pitfall 2: mdsvex + Svelte 5 Compatibility Issues

**What goes wrong:** mdsvex 0.12.x may have edge cases with Svelte 5 runes syntax, especially in Markdown files that embed Svelte components.
**Why it happens:** mdsvex was originally built for Svelte 3/4. While 0.12.x supports Svelte 5, the Markdown-to-Svelte compilation pipeline has edge cases with new syntax.
**Consequences:** Build errors, runtime crashes, or subtly broken rendering in blog posts that use embedded Svelte components.
**Prevention:**
1. Keep Markdown content simple -- plain Markdown without embedded Svelte components for blog posts and case studies.
2. If you need interactive elements, create standalone Svelte components and import them in +page.svelte wrappers, not inside .md files.
3. Test the mdsvex build with all 15 blog posts and 5 cases early in development.
**Detection:** Build-time errors or hydration mismatches in browser console.

### Pitfall 3: Tailwind v4 @apply Breaks in Svelte Style Blocks

**What goes wrong:** `@apply` does not work inside `<style>` blocks in .svelte files with Tailwind v4. Build fails or styles silently missing.
**Why it happens:** Tailwind v4 changed how `@apply` works. In Svelte `<style>` blocks, you need to use `@reference` to point to the CSS file that imports Tailwind.
**Consequences:** Styles do not apply. Components look broken. Developers waste hours debugging.
**Prevention:**
1. Prefer utility classes directly in the template (Tailwind's intended usage).
2. If you must use `@apply` in a `<style>` block, add `@reference "../../app.css";` at the top of the style block.
3. Better yet: avoid `@apply` entirely. Use Tailwind utilities in class attributes.
**Detection:** Missing styles in development. Visual regression testing catches it.

### Pitfall 4: Contact Form Secrets Leaked to Client

**What goes wrong:** Resend API key imported in a +page.ts or +page.svelte file ends up in the client bundle.
**Why it happens:** SvelteKit has two module contexts: server-only (+page.server.ts, $lib/server/) and shared (+page.ts, +page.svelte). Easy to import from the wrong one.
**Consequences:** API key exposed in browser DevTools. Anyone can send emails via your Resend account.
**Prevention:**
1. ONLY use $env/static/private (not $env/static/public) for the Resend API key.
2. ONLY import Resend in +page.server.ts or files under $lib/server/.
3. SvelteKit will throw a build error if you try to import $env/static/private in client code -- do not suppress this error.
**Detection:** Build error (SvelteKit's built-in protection). If suppressed, check network tab for exposed keys.

## Moderate Pitfalls

### Pitfall 5: Prerender + Dynamic Content Mismatch

**What goes wrong:** A page marked `prerender = true` tries to access request-time data (cookies, form actions, URL search params).
**Prevention:** Only prerender truly static pages. The contact page must NOT be prerendered (it has form actions). Blog/case pages are safe to prerender because they only read Markdown files.

### Pitfall 6: Missing robots.txt Blocks Search Indexing

**What goes wrong:** Forgetting to add or misconfiguring robots.txt results in search engines not indexing the site, or indexing pages that should be excluded.
**Prevention:** Add a static/robots.txt file early. Allow all user agents. Point to sitemap.xml. Disallow /api/ routes if any exist.

### Pitfall 7: Image Path Breakage with enhanced-img

**What goes wrong:** @sveltejs/enhanced-img requires static import paths. Dynamic image paths (from Markdown frontmatter) cannot be processed.
**Prevention:**
1. Use enhanced-img for static images in .svelte component templates (hero images, service page graphics).
2. For blog/case images referenced in Markdown frontmatter, store optimized images in /static/images/ and reference them with standard `<img>` tags. Pre-optimize these with sharp CLI during content migration.
3. Do NOT try to use enhanced:img with dynamic src attributes -- it only works with static literal paths.

### Pitfall 8: Rate Limiter State Lost on Restart

**What goes wrong:** sveltekit-rate-limiter uses in-memory storage by default. PM2 restart or deployment clears all rate limit counters.
**Prevention:** Accept this for a contact form (5/hour limit resets on deploy -- acceptable). If you need persistent rate limiting later, the library supports Redis as a backing store. For now, in-memory is fine.

### Pitfall 9: Caddy DNS Not Propagated Before HTTPS Setup

**What goes wrong:** Caddy tries to obtain a Let's Encrypt certificate before DNS A record points to the VPS IP. Certificate provisioning fails.
**Prevention:**
1. Point DNS A record to Hetzner VPS IP FIRST.
2. Wait for propagation (check with `dig honeylink.nl`).
3. Then start Caddy with the Caddyfile.
4. Caddy will automatically retry certificate provisioning.

### Pitfall 10: PM2 Not Configured for Production Environment

**What goes wrong:** PM2 starts the app without NODE_ENV=production. SvelteKit serves development-oriented responses.
**Prevention:** Create an ecosystem.config.cjs:
```javascript
module.exports = {
  apps: [{
    name: 'honeylink',
    script: 'build/index.js',
    env: { NODE_ENV: 'production', PORT: 3000 },
    instances: 1,
    autorestart: true,
    max_memory_restart: '500M'
  }]
};
```

## Minor Pitfalls

### Pitfall 11: Trailing Slash Inconsistency

**What goes wrong:** Some Framer URLs have trailing slashes, SvelteKit by default does not. Causes 301 redirects (slower) or 404s.
**Prevention:** Check Framer URLs for trailing slash patterns. Configure `trailingSlash` in svelte.config.js to match. Options: 'never', 'always', 'ignore'.

### Pitfall 12: Missing Error Pages

**What goes wrong:** 404 and 500 errors show SvelteKit's default error page, which looks unprofessional.
**Prevention:** Create src/routes/+error.svelte with a branded error page early in development. Include navigation back to homepage.

### Pitfall 13: Dutch Content with English Variable Names

**What goes wrong:** Confusion between Dutch content strings and English code variables. Template strings mix languages.
**Prevention:** Keep all variable names, file names, and comments in English (per project guidelines). Dutch text lives only in template markup and content files. Consider a $lib/content/strings.ts for reusable Dutch UI strings.

### Pitfall 14: Forgetting to Set canonical URLs

**What goes wrong:** Pages accessible via multiple URLs (with/without trailing slash, with query params) create duplicate content signals.
**Prevention:** Set canonical URL on every page via svelte-meta-tags. Use `$page.url.pathname` to construct canonical URL dynamically.

### Pitfall 15: Build Output Missing on VPS After git pull

**What goes wrong:** git pull only gets source files. `npm run build` must be run to generate the /build directory.
**Prevention:** Either:
1. Add a deploy script: `git pull && npm ci && npm run build && pm2 restart honeylink`
2. Or use GitHub Actions to build + rsync the build output to the VPS.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project setup | Tailwind v4 @apply in style blocks (#3) | Use utility classes, avoid @apply |
| Framer content scraping | URL mismatch (#1) | Crawl all URLs first, create mapping document |
| Markdown CMS | mdsvex + Svelte 5 edge cases (#2) | Keep .md content simple, test all posts early |
| Markdown CMS | enhanced-img with dynamic paths (#7) | Static images in components, pre-optimized in /static/ for content |
| Contact form | Secrets in client bundle (#4) | Only use +page.server.ts and $lib/server/ |
| Contact form | Rate limiter reset on deploy (#8) | Accept for contact form, Redis if needed later |
| SEO setup | Missing canonical URLs (#14) | Set in layout with $page.url.pathname |
| SEO setup | Missing robots.txt (#6) | Add static/robots.txt early |
| Deployment | DNS before Caddy HTTPS (#9) | DNS first, then Caddy |
| Deployment | PM2 production env (#10) | Use ecosystem.config.cjs |
| Deployment | Build output missing (#15) | Deploy script or CI/CD |

## Sources

- [SvelteKit CSP docs](https://svelte.dev/docs/kit/configuration)
- [Tailwind v4 SvelteKit integration issues](https://dev.to/fedor-pasynkov/setting-up-tailwind-css-v4-in-sveltekit-the-vite-plugin-way-a-guide-based-on-real-issues-380n)
- [SvelteKit adapter-node docs](https://svelte.dev/docs/kit/adapter-node)
- [Caddy automatic HTTPS docs](https://caddyserver.com/docs/automatic-https)
- [sveltekit-rate-limiter GitHub](https://github.com/ciscoheat/sveltekit-rate-limiter)
- [SvelteKit images docs](https://svelte.dev/docs/kit/images)
- [mdsvex GitHub](https://github.com/pngwn/MDsveX)
- [SvelteKit security headers guide](https://edoverflow.com/2023/sveltekit-security-headers/)
