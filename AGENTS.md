# OpenCode Agent Instructions for create-maha-stack

## Project Overview
`create-maha-stack` is a high-performance, AI-native CLI tool built for modern software engineering. It scaffolds monorepo architectures optimized for both performance and enterprise scale.

### Stacks
1. **Maha-Perf**: Optimized for speed. Uses **Hono** (API), **React 19** (Web/Vite), **tRPC v11**, and **Bun**.
2. **Maha-Grand**: Optimized for scale. Uses **NestJS 11** (API), **Angular 21** (Web/Nx), **tRPC v11**, and **Zoneless Change Detection**.

## Core Mandates
- **Template Extension**: All project template source files MUST use the `.eta` extension.
- **Rendering**: Templates are processed via `utils/renderer.ts`. Always verify the `TemplateContext` in `src/types/index.ts` matches template variables.
- **AI Readiness**: Every generated project MUST include a `CLAUDE.md` and `.geminiignore` to facilitate agentic workflows.
- **Zoneless by Default**: `Maha-Grand` uses Angular Zoneless by default for superior performance.

## Key Development Commands
- `npm run dev`: Executes the CLI locally using `tsx` for rapid iteration.
- `npm run build`: Bundles the CLI using `tsup` into `dist/index.js`.
- `npm run lint`: Type-checks the entire source tree (`tsc --noEmit`).
- `npm run test`: Executes the unit test suite via `Vitest`.

## Repository Structure
- `src/`: CLI source code.
  - `index.ts`: Tool entry point.
  - `utils/scaffolder.ts`: Handles initial file copying.
  - `utils/renderer.ts`: Orchestrates Eta rendering.
- `templates/`: Base project structures.
  - `maha-perf/`: Bun + React + Hono templates.
  - `maha-grand/`: Nx + Angular + NestJS templates.

## Workflow Rules
1. **Validation First**: When modifying templates, always verify against the latest framework versions (Angular 21, NestJS 11, React 19).
2. **Path Resolution**: Ensure that `tsconfig.json` mappings in templates correctly resolve workspace packages (`api`, `shared`, `ui`) after renaming.
3. **Environment Safety**: Browser-side code in templates MUST safely handle `process.env` and `import.meta.env` to prevent runtime crashes.
4. **CI/CD Integration**: Templates should favor Dockerized builds using Alpine-based images (`oven/bun:1.3-alpine` or `node:20-alpine`).

## Testing Strategy
- **Unit Tests**: Place in `src/__tests__/`.
- **E2E/Smoke Tests**: Generate a project using `npm run dev -- maha-test` and verify it builds/runs.
- **Reference Project**: Use the `/hh` or `/amm` directories for debugging complex template rendering issues.

## AI Optimization
- The CLI is designed to be "Agent-Friendly." 
- When generating files, prioritize readability and structural clarity.
- Consolidation of logic into clean abstractions is preferred over threading state across layers.
