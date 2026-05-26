# HoneyLink Website

SvelteKit site for HoneyLink, a Dutch automation and AI agency. Self-hosted on Hetzner via Docker.

## Prerequisites

- [Bun](https://bun.sh) ≥ 1.3.0 (managed runtime + package manager)

## Developing

Install dependencies and start the dev server:

```sh
bun install
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

## Building

Create a production build:

```sh
bun run build
```

Preview the production build with `bun run preview`.

To run the production server directly:

```sh
bun ./build/index.js
```

## Deployment

Deployment is via Docker on Hetzner. See `Dockerfile` and `docker-compose.prod.yml`. The build uses Bun (`oven/bun:1-alpine`) and the SvelteKit `@sveltejs/adapter-node` output runs under Bun's Node compatibility layer.
