FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY nx.json ./

RUN npm ci

COPY . .

RUN npx nx build web --prod

FROM nginx:alpine

COPY --from=builder /app/dist/apps/web /usr/share/nginx/html
COPY ./apps/web/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]