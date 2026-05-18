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

  resolve: {
    // Force Vite to always resolve Angular packages from the project root
    // node_modules, preventing pnpm's strict resolution from creating
    // duplicate module instances (which causes NG0203 at bootstrap).
    dedupe: [
      '@angular/core',
      '@angular/common',
      '@angular/router',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/compiler',
    ],
  },

  build: {
    outDir: '../../dist/apps/web',
    emptyOutDir: true,
    cssMinify: 'esbuild',
  },

  server: {
    port: 4200,
    strictPort: true,
  },

  preview: {
    port: 4300,
  },

  css: {
    transformer: 'postcss',
    postcss: './postcss.config.json',
  },
})
