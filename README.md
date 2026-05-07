# create-maha-stack 🔱

🚀 **The "Great" Stack Generator**

A high-performance project generator designed for modern Full Stack Developers. Named after the Pali word for "Great/Grand," `create-maha-stack` is built for high-velocity engineering.

## Quick Start

```bash
npm i -g create-maha-stack
```

Then scaffold a project:

```bash
npx create-maha-stack
```

or with Bun:

```bash
bun x create-maha-stack
```

## The Two "Maha" Paths

### 1. Maha-Perf (Modern Speed)
**Extreme speed and lightweight footprint.**
- **Architecture:** Turborepo-powered Bun Monorepo
- **Stack:** Hono (Backend) + Svelte 5/Vite 8 (Frontend) + tRPC
- **Validation:** ArkType (100% TypeScript syntax, faster than Zod)
- **Tooling:** Turborepo + Oxlint + Vite 8

### 2. Maha-Grand (Enterprise Scale)
**Scalable architecture for large-scale "Grand" applications.**
- **Architecture:** Nx Monorepo
- **Stack:** NestJS (Backend) + Angular 21 (Frontend)
- **Patterns:** Default Angular Zoneless + Zod Validation
- **Testing:** Isolated structure (No TestBed) for faster unit tests.

## Key Features
- 🔱 **Two Curated Stacks** — Maha-Perf for speed (Turborepo + Bun + Hono + Svelte 5) or Maha-Grand for scale (Nx + NestJS + Angular 21).
- 🧩 **Interactive Setup** — guided prompts for project name, author, stack, and package manager. No CLI flags to memorize.
- 📦 **Auto-Install & Git Init** — dependencies installed and repository initialized before you even `cd` in.
- 🤖 **AI-Ready** — every generated project includes `CLAUDE.md` and `.geminiignore` for agentic workflows.
- 🔄 **Self-Update** — background version check notifies you when an update is available. Run `create-maha-stack --self-update` to upgrade in place.
- 📘 **Onboarding Mode** — optional `CONTRIBUTING.md` and commitlint setup for team projects.

## License
MIT
