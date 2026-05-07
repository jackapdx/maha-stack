# prototype-perf - Maha-Perf Developer Guide

## Commands
- **Dev:** `bun run dev` (Starts all apps via Turborepo)
- **Build:** `bun run build` (Turborepo build pipeline)

## Project Structure
- `apps/api/`: Hono API + tRPC Server
- `apps/web/`: Svelte + tRPC Client

## Tech Stack
- Frontend: Svelte 5 + Vite 8
- Backend: Hono + tRPC
- Monorepo: Turborepo + Bun
- Validation: ArkType
