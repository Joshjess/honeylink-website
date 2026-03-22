# Phase 4: Deployment - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Get the site live at honeylink.nl on Hetzner VPS with automatic HTTPS, process management, and a repeatable deploy pipeline. DNS cutover from Framer to self-hosted.

</domain>

<decisions>
## Implementation Decisions

### Containerization
- **D-01:** Docker Compose production setup via `docker-compose.prod.yml`
- **D-02:** Must be Coolify-compatible (Coolify deploys via Docker Compose)
- **D-03:** Multi-stage Dockerfile: build stage (npm ci + npm run build) → production stage (Node.js slim + build output only)

### Rendering strategy
- **D-04:** Keep adapter-node (required for contact form SSR — Superforms actions, Resend API, rate limiting)
- **D-05:** Enable `prerender = true` on all content pages (blogs, cases, services, about, legal, homepage) for static-site performance
- **D-06:** Only /contact remains SSR (server-side form action)

### Reverse proxy & HTTPS
- **D-07:** Caddy runs as a service in the Docker Compose stack — reverse proxies to the Node app container
- **D-08:** Caddy handles automatic HTTPS via Let's Encrypt (zero config TLS)

### Process management
- **D-09:** No PM2 needed — Docker handles restart policy (`restart: unless-stopped`)
- **D-10:** Docker's restart policy replaces PM2 crash recovery

### Deploy pipeline
- **D-11:** Keep it simple — Coolify handles git push → build → deploy automatically
- **D-12:** No separate CI/CD pipeline needed — Coolify is the CI/CD

### Environment variables
- **D-13:** `RESEND_API_KEY` — Resend email API key (required for contact form)
- **D-14:** `ORIGIN` — SvelteKit origin for CSRF protection (set to `https://honeylink.nl`)
- **D-15:** `PORT` — Node.js port inside container (default 3000)

### DNS cutover
- **D-16:** Update DNS A record from Framer to Hetzner VPS IP
- **D-17:** Keep TTL low (300s) before cutover for fast propagation

### Claude's Discretion
- Dockerfile layer optimization and caching strategy
- Caddy config specifics (Caddyfile format)
- Health check implementation
- `.dockerignore` contents

</decisions>

<specifics>
## Specific Ideas

- "Keep deployment very simple"
- Docker Compose must be Coolify-compatible (Coolify reads `docker-compose.prod.yml` or `docker-compose.yml`)
- Static build for optimal performance → hybrid prerendering (all pages static except /contact)

</specifics>

<canonical_refs>
## Canonical References

No external specs — requirements are fully captured in decisions above and:
- `.planning/REQUIREMENTS.md` — DEPL-01 through DEPL-05
- `CLAUDE.md` — Technology stack section (adapter-node, Caddy, PM2/Docker, Hetzner)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.env.example` — Already has RESEND_API_KEY placeholder
- `svelte.config.js` — adapter-node already configured, kit.csp already set up
- `vite.config.ts` — Build config with enhanced-img, Tailwind, stubOptionalPeerDeps plugins

### Established Patterns
- `npm run build` → produces `build/` directory with `index.js` entry point
- SvelteKit adapter-node serves on configurable PORT (env var, default 3000)
- CSP nonces generated per-request by SvelteKit (requires SSR, not static)

### Integration Points
- `build/index.js` — production server entry point
- `build/client/` — static assets with content hashing
- Environment variables loaded by SvelteKit at runtime (not build time) for secrets

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-deployment*
*Context gathered: 2026-03-22*
