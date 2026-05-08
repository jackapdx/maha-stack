FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml .npmrc ./
COPY package.json nx.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec nx build web --configuration=production

FROM nginx:alpine

COPY --from=builder /app/dist/apps/web /usr/share/nginx/html
COPY ./apps/web/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
