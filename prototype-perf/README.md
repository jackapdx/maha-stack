# prototype-perf - Maha-Perf Stack 🚀

A high-performance full-stack application built with modern web technologies optimized for speed and developer experience.

## Architecture

- **Frontend**: React 19 + Vite + TypeScript
- **Backend**: Hono + tRPC + TypeScript
- **Validation**: Zod
- **State Management**: TanStack Query
- **Linting**: Oxlint
- **Package Manager**: Bun
- **Containerization**: Docker

## Getting Started

### Prerequisites
- Node.js >= 20.0.0
- Bun >= 1.1.34
- Docker & Docker Compose (optional)

### Installation
```bash
bun install
```

### Development
```bash
# Start all services
bun dev

# Or start individually
cd apps/web && bun dev
cd apps/api && bun dev
```

### Docker Development
```bash
# Start with Docker Compose
bun docker:up

# Stop containers
bun docker:down
```

### Build
```bash
bun build
```

### Quality
```bash
# Type checking
bun typecheck

# Linting
bun lint

# Formatting
bun format

# Testing
bun test
```

## Project Structure

```
prototype-perf/
├── apps/
│   ├── web/          # React frontend
│   └── api/          # Hono backend
├── packages/
│   ├── shared/       # Shared types and utilities
│   └── ui/           # Shared UI components
├── docker-compose.yml
└── oxlint.json
```

## Features

- ⚡ **Blazing Fast**: Vite + Hono optimized builds
- 🔒 **Type Safety**: Full TypeScript with tRPC end-to-end types
- 🎨 **Modern UI**: React 19 with latest features
- 🐳 **Container Ready**: Docker configuration included
- 📦 **Monorepo**: PNPM workspaces for code sharing
- ✅ **Quality**: Oxlint for linting

## API Documentation

The API is built with Hono and tRPC. Visit `http://localhost:3000/trpc` for the tRPC playground.

## Deployment

### Vercel (Frontend)
```bash
vercel deploy
```

### Railway/Heroku (Backend)
```bash
# Build and deploy
bun run --cwd apps/api build
```

### Docker
```bash
docker-compose up --build
```

## License

MIT

---

Built with ❤️ using the [Maha-Perf](https://github.com/your-org/create-maha-stack) stack generator.