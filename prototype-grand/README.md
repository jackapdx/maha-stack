# prototype-grand

## Overview

A production-ready enterprise application built with the **Maha-Grand Stack** featuring:
- **Angular 21** with Signals and Zoneless architecture
- **NestJS** for robust API development
- **Nx Monorepo** for scalable project management
- **tRPC** for type-safe API communication
- **Docker** containerization for consistent deployments

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm installed globally
- Docker & Docker Compose (optional)

### Installation
```bash
npm install
```

### Development
Start both API and Web applications:
```bash
npm run dev
```

- **API Server**: http://localhost:3000
- **Web Application**: http://localhost:4200

### Available Scripts
```bash
npm run build     # Build all applications
npm run test      # Run all tests
npm run lint      # Lint all applications
npm run docker:up  # Start Docker containers
npm run start    # Start production build
```

## Project Structure

```
apps/
├── api/                    # NestJS API application
│   ├── src/
│   │   ├── app.module.ts  # Main module
│   │   ├── main.ts        # Entry point
│   │   └── modules/       # Feature modules
│   └── Dockerfile         # Container configuration
├── web/                    # Angular 21 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts
│   │   │   ├── app.routes.ts
│   │   │   └── pages/     # Feature pages
│   └── Dockerfile         # Container configuration
libs/
├── shared/                 # Shared utilities and DTOs
└── ui/                     # Reusable UI components
```

## Docker Deployment

### Development with Docker Compose
```bash
npm run docker:up
```

Services:
- **Web**: http://localhost:4200
- **API**: http://localhost:3000

### Production Build
```bash
npm run docker:build
docker-compose up -d
```

## Architecture Highlights

### Angular 21 (Signals & Zoneless)
- **Signals**: Reactive state management with fine-grained reactivity
- **Zoneless**: Improved performance without zone.js overhead
- **Standalone Components**: Modular component architecture
- **Route Guards**: Type-safe authentication and authorization

### NestJS API Features
- **Modular Architecture**: Clean separation of concerns
- **tRPC Integration**: End-to-end type safety
- **Validation**: Comprehensive request validation with Zod
- **Error Handling**: Global exception filters and interceptors

### Shared Libraries
- **Type Safety**: Shared types between frontend and backend
- **Validation Schemas**: Centralized validation rules
- **Utility Functions**: Common business logic and helpers

### Development Tools
- **Nx Workspace**: Monorepo management with affected projects
- **Oxlint**: Fast Rust-based linting
- **Husky**: Git hooks for code quality

## Environment Configuration

Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

## Testing

Run tests for all applications:
```bash
npm run test
```

Run tests for specific application:
```bash
npx nx test api
npx nx test web
```

## Code Quality

### Linting
```bash
npm run lint
```

Linting is powered by **Oxlint** — a Rust-based linter that is significantly faster than ESLint.

### Type Checking
```bash
npm run typecheck
```


## License

MIT
```

Generated with ❤️ by Maha-Grand Stack