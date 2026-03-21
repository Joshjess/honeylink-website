---
phase: 03-functionality-and-seo
plan: 01
subsystem: forms
tags: [sveltekit, superforms, zod4, resend, rate-limiter, contact-form, email]

# Dependency graph
requires:
  - phase: 02-content-migration
    provides: FaqAccordion/FaqItem components, Button component, inview action, brand design tokens
provides:
  - Contact form page at /contact with superforms + Zod 4 validation
  - Email delivery via Resend to info@honeylink.nl
  - Rate limiting (5 submissions/hour/IP) via sveltekit-rate-limiter
  - Contact data module with FAQ items and contact details
  - Zod 4 contact schema with Dutch validation messages
  - Vite plugin for stubbing unused superforms adapter optional peer dependencies
affects: [03-02-seo-meta, 03-04-deployment, future-contact-enhancements]

# Tech tracking
tech-stack:
  added: [sveltekit-superforms@2.30.0, zod@4.3.6, resend@6.9.4, sveltekit-rate-limiter@0.7.0, svelte-meta-tags@4.5.0, super-sitemap@1.0.7, "@sveltejs/enhanced-img@0.10.4"]
  patterns: [superforms-zod4-server-action, typed-message-responses, vite-plugin-stub-optional-deps]

key-files:
  created:
    - src/lib/schemas/contact.ts
    - src/lib/server/email.ts
    - src/lib/data/contact.ts
    - src/routes/contact/+page.server.ts
    - src/routes/contact/+page.svelte
    - .env.example
  modified:
    - vite.config.ts
    - package.json

key-decisions:
  - "Vite plugin to stub unused superforms adapter optional peer deps (valibot, arktype, etc.) to fix barrel-export build failures"
  - "Superforms typed message responses with { type, text } object to differentiate success/error/rate-limit UI banners"
  - "bind:value on form inputs per superforms requirement (valid Svelte 5 syntax for native elements)"

patterns-established:
  - "Superforms pattern: zod4 adapter + superValidate in load + form action with typed message responses"
  - "Rate limiter pattern: IP-based limiter in form action, validation before rate limit check"
  - "Vite stubOptionalPeerDeps plugin: syntheticNamedExports proxy for unused optional deps"

requirements-completed: [CNTC-01, CNTC-02, CNTC-03, CNTC-04, CNTC-05, SECR-03, SECR-04]

# Metrics
duration: 10min
completed: 2026-03-21
---

# Phase 03 Plan 01: Contact Form Summary

**Contact form at /contact with Superforms + Zod 4 validation, Resend email delivery, IP-based rate limiting, two-column layout with contact info and FAQ section**

## Performance

- **Duration:** 10 min
- **Started:** 2026-03-21T15:38:22Z
- **Completed:** 2026-03-21T15:48:23Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Complete contact form page at /contact with two-column desktop layout (info left, form right)
- Zod 4 schema with Dutch validation messages for name, email, optional company, and message fields
- Email delivery via Resend to info@honeylink.nl with HTML entity escaping and reply-to submitter
- Rate limiting at 5 submissions per hour per IP using sveltekit-rate-limiter
- Success/error/rate-limit inline banners with focus management for accessibility
- FAQ section with 5 accordion items reusing existing FaqAccordion component

## Task Commits

Each task was committed atomically:

1. **Task 1: Install deps, create schema, email helper, data, and server action** - `6712e88` (feat)
2. **Task 2: Build contact page UI with form, contact info, and FAQ** - `9f0b53b` (feat)

## Files Created/Modified
- `src/lib/schemas/contact.ts` - Zod 4 schema with Dutch validation (contactSchema, ContactFormData)
- `src/lib/server/email.ts` - Resend email helper with HTML escaping (sendContactEmail)
- `src/lib/data/contact.ts` - Contact details and FAQ items (contactDetails, contactFaqItems)
- `src/routes/contact/+page.server.ts` - Form load + action with superforms, rate limiter, Resend
- `src/routes/contact/+page.svelte` - Contact page with two-column layout, form, contact info, FAQ
- `.env.example` - RESEND_API_KEY template
- `vite.config.ts` - Added stubOptionalPeerDeps plugin for superforms build compatibility
- `package.json` - Added Phase 3 dependencies (superforms, zod, resend, rate-limiter, meta-tags, sitemap, enhanced-img)

## Decisions Made
- **Vite stub plugin for superforms:** sveltekit-superforms barrel-exports all adapter modules (valibot, arktype, etc.) even when only zod4 is used. Created a Vite plugin using Rollup's syntheticNamedExports to stub out unused optional peer deps and prevent build failures.
- **Typed message responses:** Used `{ type: 'success' | 'error' | 'rate-limit', text: string }` as the superforms message payload to differentiate UI banner states in the template.
- **bind:value on form inputs:** Superforms requires `bind:value` for two-way data binding on native form elements. This is valid Svelte 5 syntax (bind is only discouraged for component props, not native HTML elements).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Superforms barrel import causes build failure with missing optional peer dependencies**
- **Found during:** Task 1 (build verification)
- **Issue:** `sveltekit-superforms/adapters` barrel-exports all adapters. The valibot, arktype, etc. adapters import their respective libraries which are not installed, causing Rollup build errors and SvelteKit postbuild analysis failures.
- **Fix:** Created a `stubOptionalPeerDeps()` Vite plugin that resolves unused optional deps to a Proxy-based stub module using Rollup's `syntheticNamedExports` feature.
- **Files modified:** vite.config.ts
- **Verification:** `npm run build` passes cleanly
- **Committed in:** 6712e88 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential for build to succeed. No scope creep. The stub plugin is a standard pattern for libraries with optional peer dependencies.

## Issues Encountered
- Superforms optional peer dependency resolution required three iterations: first tried Rollup `external` (build passed but postbuild analysis failed), then `ssr.external` and `ssr.noExternal` (neither resolved the barrel import), finally created a Vite plugin with `syntheticNamedExports` which worked correctly.

## User Setup Required

The contact form requires a Resend API key for email delivery:
- Add `RESEND_API_KEY=re_your_real_key` to `.env`
- Get the key from Resend Dashboard -> API Keys -> Create API Key
- For production: verify honeylink.nl domain in Resend Dashboard -> Domains -> Add Domain (add SPF, DKIM, DMARC DNS records)

## Next Phase Readiness
- Contact form page complete and building without errors
- Ready for SEO meta tags integration (plan 03-02) and security headers (plan 03-03)
- Email delivery requires real RESEND_API_KEY in .env for functional testing

## Self-Check: PASSED

All 7 created files verified on disk. Both task commits (6712e88, 9f0b53b) verified in git log.

---
*Phase: 03-functionality-and-seo*
*Completed: 2026-03-21*
