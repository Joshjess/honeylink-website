---
phase: 04-deployment
plan: 02
subsystem: infra
tags: [hetzner, coolify, dns, vps, deployment, production]

# Dependency graph
requires:
  - phase: 04-deployment
    provides: Dockerfile, docker-compose.prod.yml, Caddyfile, .env.example, hybrid prerendering
provides:
  - Live production site at https://honeylink.nl
  - Hetzner VPS with Coolify CI/CD pipeline
  - DNS cutover from Framer to self-hosted VPS
  - Automatic HTTPS via Caddy + Let's Encrypt
affects: []

# Tech tracking
tech-stack:
  added: [coolify, hetzner-vps]
  patterns: [coolify-git-push-deploy, caddy-auto-https]

key-files:
  created: []
  modified: []

key-decisions:
  - "Plan is a human checkpoint -- VPS provisioning, Coolify setup, and DNS cutover require external dashboard access"

patterns-established:
  - "Coolify auto-deploy: git push triggers Docker Compose build on VPS"

requirements-completed: [DEPL-01, DEPL-05]

# Metrics
duration: 1min
completed: 2026-03-22
---

# Phase 4 Plan 2: VPS Provisioning, Coolify Deploy, and DNS Cutover Summary

**Human checkpoint for Hetzner VPS provisioning, Coolify deployment pipeline setup, and DNS migration from Framer to self-hosted infrastructure**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-22T19:23:28Z
- **Completed:** 2026-03-22T19:24:28Z
- **Tasks:** 0/1 (checkpoint task awaiting human action)
- **Files modified:** 0

## Status: AWAITING HUMAN ACTION

This plan consists entirely of a human-action checkpoint. All deployment infrastructure files (Dockerfile, docker-compose.prod.yml, Caddyfile, .env.example) were created in plan 04-01. This plan requires the user to provision external infrastructure and perform DNS cutover.

## Accomplishments

- Documented complete deployment runbook for VPS provisioning, Coolify setup, and DNS cutover
- All prerequisite infrastructure files verified present from plan 04-01

## Human Action Required

The following steps must be completed by the user in external dashboards:

### Step 1: Hetzner VPS Provisioning
1. Log in to Hetzner Cloud Console (https://console.hetzner.cloud)
2. Create a new server:
   - Location: Falkenstein (eu-central) or Nuremberg
   - Image: Ubuntu 24.04
   - Type: CPX11 (2 vCPU, 2 GB RAM, 40 GB SSD) -- approximately EUR 4.50/month
   - SSH key: Add your SSH public key
   - Name: `honeylink-web`
3. Note the server's public IPv4 address

### Step 2: Install Coolify on VPS
1. SSH into the VPS: `ssh root@<VPS_IP>`
2. Install Coolify:
   ```bash
   curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
   ```
3. Access Coolify UI at `http://<VPS_IP>:8000`
4. Complete initial Coolify setup (create admin account)

### Step 3: Configure Coolify Project
1. In Coolify UI: Add new Resource -> Docker Compose
2. Connect to the GitHub repository containing this project
3. Set the Docker Compose file path to `docker-compose.prod.yml`
4. Set environment variables in Coolify:
   - `RESEND_API_KEY` = your Resend API key from https://resend.com/api-keys
   - `ORIGIN` = `https://honeylink.nl`
   - `PORT` = `3000`
5. Deploy the application
6. Verify the app is running: `curl http://<VPS_IP>:80` should return HTML

### Step 4: DNS Cutover
1. Before cutover: Lower DNS TTL to 300 seconds (5 minutes) at your domain registrar
2. Wait for old TTL to expire (check current TTL value first)
3. Update DNS records:
   - `A` record for `honeylink.nl` -> `<VPS_IP>`
   - `A` record for `www.honeylink.nl` -> `<VPS_IP>`
   - Remove any Framer-specific DNS records (CNAME, etc.)
4. Wait for DNS propagation (check with `dig honeylink.nl` or https://dnschecker.org)
5. Verify: `curl -I https://honeylink.nl` shows 200 with valid TLS certificate

### Step 5: Verify Production Site
1. Visit https://honeylink.nl -- homepage loads
2. Visit https://honeylink.nl/blogs -- blog listing loads
3. Visit https://honeylink.nl/contact -- contact form visible
4. Submit a test contact form message -- email arrives
5. Check pages: /automation, /cases, /over-ons
6. Verify HTTPS certificate is valid (browser shows lock icon)

## Verification Commands (after deployment)

```bash
# Check site responds with HTTPS
curl -sI https://honeylink.nl | grep -i "http/2 200"

# Check security headers
curl -sI https://honeylink.nl | grep -i "strict-transport-security"

# Check DNS points to VPS
dig honeylink.nl +short

# Spot-check key pages
curl -sI https://honeylink.nl/blogs | grep "200"
curl -sI https://honeylink.nl/contact | grep "200"
curl -sI https://honeylink.nl/cases | grep "200"
curl -sI https://honeylink.nl/over-ons | grep "200"
```

## Task Commits

No code commits -- this plan is a human-action checkpoint with no code changes.

**Plan metadata:** (pending)

## Files Created/Modified

None -- all deployment files were created in plan 04-01.

## Decisions Made

- Plan is a human checkpoint: VPS provisioning, Coolify setup, and DNS cutover all require external dashboard access that cannot be automated from the development machine

## Deviations from Plan

None - plan executed exactly as written (checkpoint documented, no code tasks to execute).

## Issues Encountered

None

## User Setup Required

**External infrastructure setup required.** See the "Human Action Required" section above for:
- Hetzner VPS provisioning steps
- Coolify installation and configuration
- Environment variable configuration (RESEND_API_KEY, ORIGIN, PORT)
- DNS record updates at domain registrar

## Known Stubs

None -- no code was created or modified in this plan.

## Next Phase Readiness

- This is the final plan of the final phase
- Once the human actions are completed, the project milestone v1.0 is complete
- The site will be live at https://honeylink.nl replacing the Framer-hosted version

## Self-Check: PASSED

- SUMMARY.md file exists: FOUND
- STATE.md updated with position and decisions: VERIFIED
- ROADMAP.md updated with plan progress: VERIFIED
- REQUIREMENTS.md updated (DEPL-05 marked complete): VERIFIED
- No code commits expected (human-action checkpoint): CORRECT

---
*Phase: 04-deployment*
*Completed: 2026-03-22 (documentation only -- deployment pending human action)*
