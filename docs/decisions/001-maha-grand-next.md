# ADR-001: Introduce Maha-Grand-Next as Experimental Edge Tier

- **Status:** Proposed
- **Date:** 2026-05-08
- **Author:** CLI maintainers
- **Deciders:** TBD

## Context

The JavaScript build tooling landscape is undergoing a generational shift. Vite 8 shipped with
Rolldown 1.0 (Rust-based unified bundler) in March 2026. VoidZero released an experimental
Oxc Angular Compiler in April 2026 claiming 6-20x build speed improvements over Angular CLI.
Real users are testing Angular 20 + Vite 8 + `@analogjs/vite-plugin-angular` in production
monorepos today.

Maha-Grand currently targets stability: Angular 21 + `@angular-devkit/build-angular:application`
(esbuild-based) + Jest 30. This is safe, tested, and supported. But staying on esbuild
indefinitely means leaving the 10-30x build speed gains on the table and falling behind
the ecosystem standard that frameworks like Astro, Nuxt, SvelteKit, and React Router
have already adopted.

The tension: enterprise users want stability; early adopters want speed. Both are valid
and both are our users.

## Decision

**Introduce a third stack variant: Maha-Grand-Next.**

It lives alongside Maha-Perf and Maha-Grand as an experimental edge tier. It uses the
same Angular 21 + NestJS 11 core but swaps the build tooling to the Vite 8 + Rolldown
ecosystem with the VoidZero Oxc Angular Compiler (or `@analogjs/vite-plugin-angular` as
fallback).

### Stack Definition

| Concern           | Maha-Grand (stable)                        | Maha-Grand-Next (experimental)              |
|-------------------|--------------------------------------------|---------------------------------------------|
| Web framework     | Angular 21                                 | Angular 21 (same)                           |
| API framework     | NestJS 11                                  | NestJS 11 (same)                            |
| RPC               | tRPC v11 + Zod                             | tRPC v11 + Zod (same)                       |
| Monorepo          | Nx 22                                      | Nx 22 (same)                                |
| **Build tool**    | `@angular-devkit/build-angular` (esbuild)  | **Vite 8 + Rolldown**                       |
| **Compiler**      | ngc (Angular compiler)                     | **Oxc Angular Compiler** (VoidZero, Rust)   |
| **Test runner**   | Jest 30                                    | **Vitest 4** (shares Vite config)           |
| **Lint/Format**   | Oxlint + Oxfmt                             | Oxlint + Oxfmt (same)                       |
| Package manager   | pnpm                                       | pnpm (same)                                 |

### Template Naming

```
templates/
  maha-perf/          # Svelte 5 + Hono + Turborepo + Bun
  maha-grand/         # Angular 21 + NestJS + Nx + esbuild
  maha-grand-next/    # Angular 21 + NestJS + Nx + Vite 8 + Rolldown (EXPERIMENTAL)
```

### Template Implementation Strategy

**Decision: Option A — Full duplication with source-of-truth discipline.**

Templates are fully independent copies. No shared base layer, no CI sync, no symlinks.

| Option | Approach | Verdict |
|--------|----------|---------|
| A | Full duplication | **Chosen** |
| B | Shared base + overlays | Rejected — adds rendering complexity for experimental stack |
| C | CI sync / symlinks | Rejected — incompatible with `.eta` template rendering |

Rationale:
- Option B requires composable template layers, overlay merging, and conditional file
  inclusion in the Eta renderer. That's infrastructure investment in an experimental stack.
- Option C breaks `.eta` rendering — symlinks can't distinguish which template context
  to render against.
- The shared surface area is small (~15-20 application files). Config files (the bulk of
  the difference) are unique to each stack by definition.

Discipline rule:
> **Maha-Grand is always the source of truth for shared application code.** When a
> component, service, or controller changes, update `templates/maha-grand/` first,
> then mirror to `templates/maha-grand-next/`. When Maha-Grand-Next graduates,
> config files flow the opposite direction.

### CLI Integration

The interactive selector gains a third option with clear experimental labeling:

```
  Maha-Grand (Enterprise)
  NestJS + Angular 21 + Zod | PNPM Monorepo

  Maha-Grand-Next (Edge)
  NestJS + Angular 21 + Vite 8 + Rolldown | Experimental
```

CLI warning before scaffolding Maha-Grand-Next:

```
⚠ Maha-Grand-Next is experimental.
  - Oxc Angular Compiler is not production-ready (VoidZero, April 2026)
  - Bundle size regressions reported with Vite 8 + Angular (+8%)
  - Breaking changes expected in Vite 8.x patch releases
  - Not recommended for production deployments
```

### Launch Criteria

Maha-Grand-Next ships as a CLI option only when:

1. A `prototype-grand-next/` reference project exists and passes:
   - `pnpm run build` (all projects)
   - `pnpm run test` (all projects)
   - `pnpm run lint` (0 errors)
   - `pnpm run typecheck` (0 errors)
2. VoidZero Oxc Angular Compiler is used as the primary compiler. If it fails
   the above checks, launch is delayed — we do NOT fall back to
   `@analogjs/vite-plugin-angular` only.
3. The `--next` warning dialog is implemented in the CLI (see above).

### Graduation Criteria

Maha-Grand-Next graduates into Maha-Grand when:

1. VoidZero Oxc Angular Compiler reaches stable (1.0) — OR —
2. Angular team announces official Vite production build support — OR —
3. `@analogjs/vite-plugin-angular` resolves Vite 8 bundle size regression — AND —
4. 3+ months of community usage without critical issues
5. Build speed benchmark shows >=5x improvement over current esbuild builder

When graduation happens:
- Maha-Grand absorbs Maha-Grand-Next's build tooling
- Maha-Grand-Next is deprecated with migration guide to Maha-Grand
- A new experimental tier can be introduced for whatever is next

## Consequences

### Positive

- **Users self-select into risk tolerance.** Enterprises stay on Maha-Grand. Build-speed-sensitive
  teams get 10-20x faster builds on Maha-Grand-Next.
- **Proving ground for Maha-Grand.** Features proven in Maha-Grand-Next graduate into Maha-Grand
  with confidence, reducing regression risk for enterprise users.
- **Ecosystem positioning.** Shows the project tracks cutting-edge tooling without forcing it on
  users who need stability.
- **Template sharing.** 90%+ of template files are shared between Maha-Grand and Maha-Grand-Next
  (same Angular components, NestJS services, shared packages). Only build configs differ.

### Negative

- **Maintenance surface increases.** Three stacks instead of two. Template divergence risk if
  Maha-Grand-Next drifts from Maha-Grand core.
- **Template drift.** Over time, Maha-Grand-Next could accumulate Angular/NestJS changes that
  aren't backported to Maha-Grand, creating two divergent Angular stacks.
- **Confusion.** Users may not understand why there are two Angular stacks. Clear labeling is
  essential.
- **Graduation friction.** Migrating Maha-Grand to Vite 8 later means updating every Maha-Grand
  project. A codemod/schematic will be needed.

### Mitigations

- **Source-of-truth rule:** Maha-Grand is always the canonical source for shared application
  code (components, services, controllers). When a shared file changes, update
  `templates/maha-grand/` first, then mirror to `templates/maha-grand-next/`. Build configs
  flow the opposite direction at graduation time. This is enforced by convention, documented
  in AGENTS.md, not by tooling.
- CI pipeline that diffs Maha-Grand vs Maha-Grand-Next shared files weekly, flagging drift
- `--next` flag on Maha-Grand instead of a separate stack name (alternative approach)
- Automatic migration schematic when Next graduates into Grand

## Alternatives Considered

### A: Stay with two stacks, wait for official Angular Vite support

Rejected. The Angular team has no timeline for Vite production builds. Waiting could mean
years of slower builds while competitors move forward. The ecosystem is already testing
this path — we should provide a structured way to participate.

### B: Immediately migrate Maha-Grand to Vite 8

Rejected. The +8% bundle regression and experimental compiler status make this premature
for enterprise users who depend on Maha-Grand's stability guarantee.

### C: Vite 8 as opt-in flag on Maha-Grand (`--vite`)

Considered. Simpler than a third stack but creates a combinatorial explosion of tested
configurations (Angular with/without Vite, Jest/Vitest, etc.). A separate stack keeps
the matrix clean and the experimental surface explicit.

### D: Use only `@analogjs/vite-plugin-angular`, not VoidZero Oxc

Considered. `@analogjs/vite-plugin-angular` is more mature but slower (no Rust compiler).
Maha-Grand-Next should push boundaries — Oxc is the differentiator. We fall back to Analog
if Oxc is too unstable.

## References

- [Vite 8.0 Announcement](https://vite.dev/blog/announcing-vite8) — March 2026
- [VoidZero Oxc Angular Compiler](https://voidzero.dev/posts/oxc-angular-compiler) — April 2026
- [GitHub Issue #22007: Vite 8 + Angular bundle regression](https://github.com/vitejs/vite/issues/22007)
- [Angular Build System Migration Guide](https://angular.dev/tools/cli/build-system-migration)
- [@analogjs/vite-plugin-angular](https://github.com/analogjs/analog)
