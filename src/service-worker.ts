/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

// Take control immediately
self.skipWaiting()
clientsClaim()

// Clean up old caches
cleanupOutdatedCaches()

// Precache all assets built by Vite (js, css, html, fonts, icons)
precacheAndRoute(self.__WB_MANIFEST)

// NetworkFirst strategy for API init endpoint
registerRoute(
  ({ url }) => url.pathname.endsWith('/init'),
  new NetworkFirst({
    cacheName: 'ticker-init',
    networkTimeoutSeconds: 10,
  })
)

// NetworkFirst strategy for API timeline endpoint
registerRoute(
  ({ url }) => url.pathname.includes('/timeline'),
  new NetworkFirst({
    cacheName: 'ticker-messages',
    networkTimeoutSeconds: 10,
  })
)
