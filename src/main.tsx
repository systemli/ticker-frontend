import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n/i18n' // Import i18n configuration

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours - must match or exceed maxAge for persistence
      retry: 3,
    },
  },
})

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: 'ticker-query-cache',
  throttleTime: 1000,
})

// Register service worker (production only)
if ('serviceWorker' in navigator && import.meta.env.MODE === 'production') {
  navigator.serviceWorker.register('/service-worker.js', { type: 'classic' })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      }}
    >
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  </StrictMode>
)
