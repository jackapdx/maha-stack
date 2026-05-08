FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml .npmrc ./
COPY package.json nx.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec nx build api --configuration=production

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/nx.json ./
COPY --from=builder /app/.npmrc ./

RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist/apps/api ./dist/apps/api

EXPOSE 3000

CMD ["node", "dist/apps/api/main.js"]
