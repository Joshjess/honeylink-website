# Stage 1: Build
FROM oven/bun:1-alpine AS build

WORKDIR /app

# Copy package files first for layer caching.
# bun.lockb OR bun.lock — copy whichever exists. Using a glob keeps the
# Dockerfile compatible whether Bun emitted the binary or text lockfile.
COPY package.json bun.lock* bun.lockb* ./

# Install all dependencies (including devDependencies) for the build.
# --frozen-lockfile guarantees the committed lockfile is authoritative.
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the SvelteKit app (adapter-node output goes to ./build)
RUN bun run build

# Reinstall production-only deps into a clean tree for the runtime stage.
# (Bun has no `bun prune` equivalent yet; cleanest path is a fresh prod install.)
RUN rm -rf node_modules && bun install --frozen-lockfile --production

# Stage 2: Production
FROM oven/bun:1-alpine AS production

WORKDIR /app

# Copy built output and production node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Set environment defaults
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Health check (wget is present in oven/bun:1-alpine via busybox)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Run the SvelteKit server under Bun's Node-compat layer
CMD ["bun", "./build/index.js"]
