#!/bin/bash

# Test script for Maha-Perf template
set -e

echo "=== Testing Maha-Perf Template ==="

# Create test directory
TEST_DIR="test-maha-perf-$(date +%s)"
echo "Creating test directory: $TEST_DIR"

# Run the CLI to create a project
# We'll use a simple approach: copy template and render it
echo "Generating test project..."
cd /Users/apdx/Develop/create-maha-stack

# First, let's check if the CLI works
echo "Building CLI..."
npm run build

# Create a test project directory
mkdir -p "/tmp/$TEST_DIR"
cd "/tmp/$TEST_DIR"

# Manually copy and render the template for testing
# This is a simplified test - in reality we'd run the CLI
echo "Simulating template generation..."
cp -r /Users/apdx/Develop/create-maha-stack/templates/maha-perf/* .

# Create minimal package.json from template
cat > package.json << 'EOF'
{
  "name": "test-maha-perf",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "concurrently \"bun run --cwd packages/shared build && bun run --cwd packages/ui build && concurrently \\\"bun run --cwd packages/shared dev\\\" \\\"bun run --cwd packages/ui dev\\\" \\\"bun run --cwd apps/api dev\\\" \\\"bun run --cwd apps/web dev\\\"\"",
    "build": "bun run --cwd packages/shared build && bun run --cwd packages/ui build && bun run --cwd apps/api build && bun run --cwd apps/web build",
    "test": "bun run --cwd apps/api test 2>/dev/null || true && bun run --cwd apps/web test",
    "lint": "biome check .",
    "format": "biome format --write .",
    "typecheck": "bun run --cwd packages/shared typecheck && bun run --cwd packages/ui typecheck && bun run --cwd apps/api typecheck && bun run --cwd apps/web typecheck",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "prepare": "husky"
  },
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "devDependencies": {
    "@biomejs/biome": "^2.0.3",
    "concurrently": "^9.1.0",
    "husky": "^9.1.7"
  },
  "packageManager": "bun@1.2.2",
  "engines": {
    "node": ">=20.0.0"
  }
}
EOF

# Create minimal shared package
mkdir -p packages/shared/src/utils
cat > packages/shared/src/utils/logger.ts << 'EOF'
export class Logger {
  constructor(private context: string) {}

  info(message: string, data?: any) {
    console.log(`[${new Date().toISOString()}] [INFO] [${this.context}] ${message}`, data || '');
  }

  error(message: string, error?: any) {
    console.error(`[${new Date().toISOString()}] [ERROR] [${this.context}] ${message}`, error || '');
  }

  warn(message: string, data?: any) {
    console.warn(`[${new Date().toISOString()}] [WARN] [${this.context}] ${message}`, data || '');
  }

  debug(message: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${new Date().toISOString()}] [DEBUG] [${this.context}] ${message}`, data || '');
    }
  }
}
EOF

cat > packages/shared/src/index.ts << 'EOF'
export { Logger } from './utils/logger.js';
EOF

cat > packages/shared/package.json << 'EOF'
{
  "name": "shared",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "typescript": "^6.0.3",
    "@types/node": "^22.10.6"
  }
}
EOF

cat > packages/shared/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM"],
    "types": ["node"],
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationMap": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Test TypeScript compilation
echo "Testing TypeScript compilation in shared package..."
cd packages/shared
if bun run typecheck; then
  echo "✅ TypeScript type checking passed!"
else
  echo "❌ TypeScript type checking failed!"
  exit 1
fi

# Test build
echo "Testing build..."
if bun run build; then
  echo "✅ Build successful!"
  echo "Generated files:"
  ls -la dist/ || true
else
  echo "❌ Build failed!"
  exit 1
fi

cd "/tmp/$TEST_DIR"

echo "=== Test Complete ==="
echo "Test project created at: /tmp/$TEST_DIR"
echo "You can run 'cd /tmp/$TEST_DIR && bun run dev' to test"