FROM node:22-alpine AS base

WORKDIR /app


# ---------------------------------------
# Install dependencies
# ---------------------------------------

FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile


# ---------------------------------------
# Build stage
# ---------------------------------------

FROM base AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time ARG
ARG NEXT_PUBLIC_URL_API
ARG NEXT_PUBLIC_PUSHER_KEY
ARG UPLOADTHING_TOKEN
ARG JWT_SECRET

ENV NEXT_PUBLIC_URL_API=${NEXT_PUBLIC_URL_API}
ENV NEXT_PUBLIC_PUSHER_KEY=${NEXT_PUBLIC_PUSHER_KEY}
ENV UPLOADTHING_TOKEN=${UPLOADTHING_TOKEN}
ENV JWT_SECRET=${JWT_SECRET}

ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN pnpm build


# ---------------------------------------
# Runner (production)
# ---------------------------------------
  FROM base AS runner
WORKDIR /app

# ADD THIS (bắt buộc)
ARG NEXT_PUBLIC_URL_API
ARG NEXT_PUBLIC_PUSHER_KEY
ARG UPLOADTHING_TOKEN
ARG JWT_SECRET
# COPY ENV TO RUNTIME
ENV NEXT_PUBLIC_URL_API=${NEXT_PUBLIC_URL_API}
ENV NEXT_PUBLIC_PUSHER_KEY=${NEXT_PUBLIC_PUSHER_KEY}
ENV UPLOADTHING_TOKEN=${UPLOADTHING_TOKEN}
ENV JWT_SECRET=${JWT_SECRET}

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]