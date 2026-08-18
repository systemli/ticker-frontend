# Ticker Frontend - AI Agent Instructions

## Architecture Overview

React frontend for the Systemli Ticker project - a real-time messaging system displaying live ticker messages.

### Core Data Flow

1. **Entry**: `main.tsx` → `QueryClientProvider` → `App` → `TickerProvider` → `Ticker`
2. **Init**: `TickerContext.tsx` fetches `/init` for ticker metadata and settings
3. **Messages**: `useMessages` hook uses TanStack Query for infinite scroll + WebSocket for real-time updates
4. **Views**: `Ticker.tsx` routes to `ActiveView`, `InactiveView`, or `ErrorView` based on state

### State Management Architecture

```
QueryClientProvider (TanStack Query - caching, pagination)
  └── TickerProvider (React Context - ticker metadata, settings, connection state)
        └── Ticker → Views → Components
```

- **TanStack Query**: Message caching, infinite scroll pagination, background refetching
- **React Context**: Ticker info, settings, loading/offline/error states via `useTicker()` hook
- **WebSocket**: Real-time message push via `useWebSocket` hook with auto-reconnect

## Key Patterns

### Hook Composition (`src/hooks/`)

`useMessages` combines TanStack Query + WebSocket for hybrid data fetching:

```typescript
// Infinite scroll with useInfiniteQuery
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['messages'],
  queryFn: ({ pageParam }) => getTimeline(pageParam || {}),
  getNextPageParam: lastPage => ({ before: oldestMessageId }),
})

// WebSocket updates via callback
useWebSocket({ onMessage: wsMsg => addMessage(wsMsg.data.message) })
```

### Component Testing Pattern

Tests use wrapper with QueryClientProvider for hook testing:

```typescript
const createWrapper = ({ children }) => createElement(QueryClientProvider, { client: queryClient }, children)

renderHook(() => useMessages(), { wrapper: createWrapper })
```

### Global Test Mocks (`vitest-setup.ts`)

WebSocket, IntersectionObserver, and fetch are mocked globally - no per-test setup needed.

## Development Commands

```bash
npm run dev        # Dev server on port 4000
npm run test       # Vitest watch mode
npm run coverage   # Coverage report
npm run lint       # ESLint
```

## Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no tailwind.config.js)
- Global styles in `src/styles.css` with `@import 'tailwindcss'`
- Dark mode: `dark:` variants
- Mobile-first: `max-sm:` for small screen overrides

## API Integration

- Backend URL: `TICKER_API_URL` env var (Vite prefix: `TICKER_`)
- Endpoints: `/init` (metadata), `/timeline` (messages), `/ws` (WebSocket)
- Response format: `{ data: { ... } }` wrapper

## File Organization

- `src/components/` - UI components + context
- `src/hooks/` - Data fetching hooks (`useMessages`, `useWebSocket`)
- `src/views/` - Page-level layouts
- `src/lib/` - API client + TypeScript types
- Tests: `*.test.tsx` alongside source files, `hooks/__tests__/` for hook tests
