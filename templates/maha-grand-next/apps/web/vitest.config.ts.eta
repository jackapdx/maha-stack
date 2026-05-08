import { defineConfig } from 'vitest/config'
import { angular } from '@oxc-angular/vite'

export default defineConfig({
  plugins: [
    angular({
      tsconfig: './tsconfig.spec.json',
    }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: '../../coverage/apps/web',
    },
  },
})
