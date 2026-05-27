# ---------- Dependencies Stage ----------
FROM node:20-alpine AS deps

WORKDIR /app

# Install only package files first for better caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install all deps (including dev deps if needed)
RUN npm ci

COPY . .

# If you have build step like TypeScript:
# RUN npm run build

# ---------- Production Stage ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only production node_modules
COPY --from=deps /app/node_modules ./node_modules

# Copy application files
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

EXPOSE 9595

CMD ["node", "src/index.js"]