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
    // Mirrors production: the app requests /api and the proxy maps it onto the
    // API's /v1 routes. Origin has to be set explicitly, because a same-origin
    // GET does not send one and the API resolves the ticker from it.
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        rewrite: path => path.replace(/^\/api/, '/v1'),
        ws: true,
        headers: { Origin: 'http://localhost:4000' },
      },
    },
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
