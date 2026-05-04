FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY nx.json ./

RUN npm ci

COPY . .

RUN npx nx build api --prod

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/nx.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist/apps/api ./dist/apps/api

EXPOSE 3000

CMD ["node", "dist/apps/api/main.js"]