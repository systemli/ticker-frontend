# AGENTS.md

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
npm run build      # Production build
npm run preview    # Serve the production build
```

Node 24 (see `.nvmrc`), npm as package manager. Deployment, configuration and troubleshooting
for the whole stack are documented at <https://systemli.github.io/ticker/>.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no tailwind.config.js)
- Global styles in `src/styles.css` with `@import 'tailwindcss'`
- Dark mode: `dark:` variants
- Mobile-first: `max-sm:` for small screen overrides

## API Integration

- Backend URL: `TICKER_API_URL` env var (Vite prefix: `TICKER_`). Must include the `/v1`
  suffix; falls back to a relative `/api` that a proxy is expected to forward — the dev server and
  the Docker image both provide one, so leaving it unset is the normal case.
- Endpoints: `/init` (metadata), `/timeline` (messages), `/ws` (WebSocket), `/media/<file>`
  (attachments). Attachment URLs come back relative as `/api/media/<file>`; resolve them with
  `mediaUrl()` from `src/lib/api.ts` so they also work with an absolute `TICKER_API_URL`.
- Response format: `{ data: { ... } }` wrapper
- The API resolves which ticker to serve from the request's `Origin`, so the address the app is
  served from must be registered on the ticker in the admin interface.

## File Organization

- `src/components/` - UI components + context
- `src/hooks/` - Data fetching hooks (`useMessages`, `useWebSocket`)
- `src/views/` - Page-level layouts
- `src/lib/` - API client + TypeScript types
- Tests: `*.test.tsx` alongside source files, `hooks/__tests__/` for hook tests

## Commits and Pull Requests

### Commit messages

Start every commit with a [Gitmoji](https://gitmoji.dev/), followed by a space and a short
description in the imperative mood. Use the **Unicode emoji**, not the `:shortcode:` form — both
occur in the history, but new commits should use the emoji.

| Emoji | Use for |
| ----- | ------- |
| ✨ | New feature |
| 🐛 | Bug fix |
| 🩹 | Minor, non-critical fix |
| ♻️ | Refactor |
| ✅ | Add, update or pass tests |
| 🧪 | Add a deliberately failing test |
| 📝 | Documentation |
| ⬆️ | Upgrade dependencies |
| ➖ | Remove a dependency |
| 🔥 | Remove code or files |
| 👷 | CI / build system |
| 🔧 | Configuration files |
| 🚨 | Fix linter or compiler warnings |
| ⚡️ | Performance |
| 🔒️ | Security fix |
| 🗃️ | Database schema or storage changes |
| 🔊 | Logging |
| 💄 | UI and styling |
| 🌐 | Internationalization and localization |

Examples:

```
✨ Add Bluesky reply restrictions
🐛 Fix message ordering on the public timeline
♻️ Extract origin handling into a helper
✅ Cover the upload handler
⬆️ Upgrade dependencies
```

### Pull requests

PR titles follow the same Gitmoji convention as commits.

Every PR must be labeled. `release-drafter` (`.github/release-drafter.yml`) uses the label to
choose both the changelog category and the version bump:

| Label                   | Category       | Version bump |
| ----------------------- | -------------- | ------------ |
| `feature`               | 🚀 Features    | major        |
| `enhancement`           | 🚀 Features    | minor        |
| `fix`, `bugfix`, `bug`  | 🐛 Bug Fixes   | patch        |
| `chore`, `dependencies` | 🧹 Maintenance | patch        |

An unlabeled PR falls back to a patch bump. A release draft is kept up to date on every push to
`main`; drafts that are a pure patch bump are published automatically on the first of each month.
