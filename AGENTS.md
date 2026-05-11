# OpenCode Agent Instructions for create-maha-stack

## Project Overview
`create-maha-stack` is a high-performance, AI-native CLI tool that scaffolds monorepo architectures. Version **1.2.2**. Published to npm as `create-maha-stack`.

### Stacks
1. **Maha-Perf**: Speed-optimized. **Hono** (API), **Svelte 5** (Web/Vite 8), **tRPC v11**, **ArkType**, **Turborepo**, **Bun** (locked).
2. **Maha-Grand**: Scale-optimized. **NestJS 11** (API), **Angular 21** (Web/Nx), **tRPC v11**, **Zod**, **Zoneless Change Detection**, **pnpm** (locked).
3. **Maha-Grand-Next**: Edge experimental. Same as Grand but with **Vite 8 + Rolldown**. Experimental — not production-ready.

## CLI Pipeline (`src/index.ts`)
```
Interactive Prompts → Scaffold → Render Eta → Install Deps → Git Init
```

1. **Prompts** (`utils/prompts.ts`): Collects `projectName`, `author`, `stackType`, `packageManager` (locked per stack), `enableOnboarding`.
2. **Scaffold** (`utils/scaffolder.ts`): Copies `templates/{stackType}/` → target dir, then overlays `templates/shared-ui/` → design-tokens location.
3. **Render** (`utils/renderer.ts`): Processes `.eta` files + config files (package.json, tsconfig, vite.config, etc.) with Eta.
4. **Install** (`utils/runner.ts`): Runs package manager install.
5. **Git** (`utils/git.ts`): `git init` + initial commit.

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
  - `index.ts`: Tool entry point — banner, pipeline orchestration, outro.
  - `utils/prompts.ts`: Interactive `@clack/prompts` — collects `ProjectConfig`.
  - `utils/scaffolder.ts`: Copies template files + shared-ui overlay.
  - `utils/renderer.ts`: Walks project dir, renders `.eta` and config files via Eta.
  - `utils/runner.ts`: Package manager detection and `install` execution.
  - `utils/git.ts`: `git init --initial-branch=main` + add + commit.
  - `utils/updater.ts`: npm registry version check and self-update.
  - `types/index.ts`: `ProjectConfig`, `TemplateContext`, `EtaFileResult`, `StackType`, `PackageManager`.
- `templates/`: Base project structures.
  - `maha-perf/`: Turborepo + Bun + Svelte + Hono templates.
  - `maha-grand/`: Nx + Angular + NestJS templates.
  - `maha-grand-next/`: Nx + Angular + NestJS + Vite 8 experimental templates.
  - `shared-ui/`: Framework-agnostic design tokens (copied into every stack).
  - `CONTRIBUTING.md.eta`: Onboarding doc (optional, gated by `enableOnboarding`).
- `prototype-perf/`: Hand-crafted reference project — the "desired output" for maha-perf.
- `prototype-grand/`: Hand-crafted reference project for maha-grand.
- `prototype-grand-next/`: Hand-crafted reference project for maha-grand-next.
- `amm/`: Test/sandbox directory.

## Template System — Architecture

### Eta Rendering (`renderer.ts`)
- **Tags**: `<% ... %>` (Eta default).
- **Input**: `TemplateContext` object (available as `it` in templates).
- **Two processing paths**:
  1. **`.eta` files**: Rendered → `.eta` extension stripped → original `.eta` deleted.
  2. **Config file patterns** (no `.eta` needed): `package.json`, `tsconfig.*.json`, `vite.config.*`, `nx.json`, `angular.json`, `tailwind.config.*` — rendered in-place.
- **Concurrency**: Uses `availableParallelism()` for batch parallel rendering.

### TemplateContext Variables
| Variable | Type | Source | Used in |
|----------|------|--------|---------|
| `it.projectName` | `string` | User prompt | package.json, HTML title, CLAUDE.md, README, hello.router.ts, App.svelte |
| `it.author` | `string` | User prompt | hello.router.ts |
| `it.packageManager` | `'npm' \| 'pnpm' \| 'bun'` | Locked per stack | Taskfile.yml, clean:deps |
| `it.useZoneless` | `boolean` | Always `true` | Angular grand templates |
| `it.enableOnboarding` | `boolean` | User prompt | CONTRIBUTING.md inclusion |

### Package Manager Locking
- **maha-perf** → locked to `bun`
- **maha-grand** → locked to `pnpm`
- **maha-grand-next** → locked to `pnpm`

### Design Tokens — Single Source of Truth
`templates/shared-ui/` is the **sole source** for design tokens. It is copied by `scaffolder.ts` into every generated project:
- **maha-perf** → `packages/design-tokens/`
- **maha-grand / maha-grand-next** → `libs/design-tokens/`

**Do NOT create per-stack design-tokens `.eta` duplicates.** The `shared-ui/` directory contains:
- `package.json.eta` — rendered with `@<%= it.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-') %>/design-tokens`
- Static files (no `.eta`): `src/index.ts`, `src/styles/tokens.css`, `src/styles/components.css`, `src/tokens/*.ts`, `tsconfig.json`
- CSS exports are declared in `package.json.eta` (`./styles/tokens.css`, `./styles/components.css`)

## Scaffolder — Copy Order (matters!)
1. `templates/{stackType}/` → target directory (recursive, filters out `node_modules/` and `.git/`)
2. `templates/shared-ui/` → design-tokens location (`force: true` — overwrites any stack-local copies)
3. `templates/CONTRIBUTING.md.eta` → project root (only if `enableOnboarding === true`)

Because of step 2, **never place design-tokens files in per-stack template directories**. They will be overwritten.

## Workflow Rules
1. **Validation First**: When modifying templates, always verify against the latest framework versions (Angular 21, NestJS 11, Svelte 5, Vite 8).
2. **Path Resolution**: Ensure that `tsconfig.json` mappings in templates correctly resolve workspace packages (`api`, `shared`, `ui`) after renaming.
3. **Environment Safety**: Browser-side code in templates MUST safely handle `process.env` and `import.meta.env` to prevent runtime crashes.
4. **CI/CD Integration**: Templates should favor Dockerized builds using Alpine-based images (`oven/bun:1.3-alpine` or `node:20-alpine`).
5. **Prototype Sync**: When reflecting prototype changes to templates, compare the prototype source against the corresponding `.eta` template — replacing concrete values with `it.*` variables.

## Testing Strategy
- **Unit Tests**: `src/__tests__/` — tests for scaffolder, renderer, git, runner, types.
- **E2E/Smoke Tests**: Generate a project using `npm run dev -- maha-test` and verify it builds/runs.
- **Reference Projects**: `prototype-perf/`, `prototype-grand/`, `prototype-grand-next/` — these are the "desired output" for each stack.

## AI Optimization
- The CLI is designed to be "Agent-Friendly."
- Every generated project ships with `CLAUDE.md` and `.geminiignore`.
- When generating files, prioritize readability and structural clarity.
- Consolidation of logic into clean abstractions is preferred over threading state across layers.

## Project State
- **npm Package**: `create-maha-stack` v1.2.2 (https://www.npmjs.com/package/create-maha-stack)
- **Git Remote**: `https://github.com/jackapdx/maha-stack.git`
- **Default Branch**: `main` — stable releases
- **Develop Branch**: `develop` — ongoing work; merge to `main` on release
- **Registry**: npmjs.org (authenticated as `adpx`)
