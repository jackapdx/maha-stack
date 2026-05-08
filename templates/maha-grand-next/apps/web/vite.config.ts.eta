import { defineConfig } from 'vite'
import { angular } from '@oxc-angular/vite'

export default defineConfig({
  plugins: [
    angular({
      tsconfig: './tsconfig.app.json',
      sourceMap: true,
    }),
  ],

  root: '.',

  build: {
    outDir: '../../dist/apps/web',
    emptyOutDir: true,
  },

  server: {
    port: 4200,
    strictPort: true,
  },

  preview: {
    port: 4300,
  },

  css: {
    postcss: './postcss.config.json',
  },
})
