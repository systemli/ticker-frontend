/// <reference types="vitest" />

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'TICKER_',
  server: {
    port: 4000,
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      srcDir: 'src',
      filename: 'service-worker.ts',
      strategies: 'injectManifest',
      injectRegister: false,
      manifest: false,
      injectManifest: {
        rollupFormat: 'iife',
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest-setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
    },
  },
})
