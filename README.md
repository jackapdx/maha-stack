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
- **Architecture:** Bun Monorepo
- **Stack:** Hono (Backend) + React 19/Vite (Frontend) + tRPC + TanStack Query
- **Validation:** ArkType (100% TypeScript syntax, faster than Zod)
- **Tooling:** Oxlint + Vite

### 2. Maha-Grand (Enterprise Scale)
**Scalable architecture for large-scale "Grand" applications.**
- **Architecture:** Nx Monorepo
- **Stack:** NestJS (Backend) + Angular 21 (Frontend)
- **Patterns:** Default Angular Zoneless + Zod Validation
- **Testing:** Isolated structure (No TestBed) for faster unit tests.

## Key Features
- 🔱 **Pali-Inspired Aesthetic:** Gold-to-orange gradient visual identity.
- 🤖 **AI-Ready:** Pre-configured with `CLAUDE.md` and `.geminiignore`.
- 📦 **Onboarding Support:** Optional "Intern Onboarding" module with `CONTRIBUTING.md` and commitlint.

## Technical Specifications
- **Language:** TypeScript (ESM)
- **Template Engine:** Eta
- **Fetcher:** Local high-performance source copying
- **UI:** Clack Prompts

## Development

```bash
# Clone the repository
git clone https://github.com/your-username/create-maha-stack.git
cd create-maha-stack

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build the project
npm run build
```

## License
MIT
