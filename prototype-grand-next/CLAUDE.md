# prototype-grand - Enterprise Scale Developer Guide

## Commands
- **Dev:** `npx nx serve <app-name>`
- **Build:** `npx nx build <app-name>`
- **Test:** `npx nx test <app-name>`
- **Lint All:** `npm run lint` (Oxlint)

## Project Structure
- `apps/api/`: NestJS backend
- `apps/web/`: Angular frontend
- `libs/shared/`: Shared TypeScript libraries/DTOs

## Tech Stack
- Frontend: Angular 21
- Backend: NestJS
- Validation: Zod
- Workspace: Nx Monorepo
