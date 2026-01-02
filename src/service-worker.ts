/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

// Take control immediately
self.skipWaiting()
clientsClaim()

// Clean up old caches
cleanupOutdatedCaches()

// Precache all static assets built by Vite (js, css, html, fonts, icons)
// API responses are cached via TanStack Query persistence in localStorage
precacheAndRoute(self.__WB_MANIFEST)
