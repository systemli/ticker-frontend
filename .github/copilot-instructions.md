# Ticker Frontend - AI Agent Instructions

## Architecture Overview

This is a React frontend for the Systemli Ticker project - a real-time messaging system. The app displays ticker messages from a backend API with automatic polling and infinite scroll functionality.

### Core Data Flow

- **Context**: `TickerProvider` wraps the app and manages global state (ticker info, settings, loading states)
- **API Layer**: Simple fetch-based API client in `src/lib/api.ts` with two endpoints: `/init` (ticker metadata) and `/timeline` (messages)
- **View Logic**: Three main views: `ActiveView` (live ticker), `InactiveView` (placeholder), `ErrorView` (connection issues)
- **Message Loading**: Bidirectional infinite scroll - newer messages via polling, older via intersection observer

## Key Patterns & Conventions

### Component Structure

- Functional components with TypeScript interfaces for props
- Custom hooks pattern: `useTicker()` for accessing ticker context
- View components handle layout, smaller components handle specific UI elements
- Test files alongside components using `*.test.tsx` naming

### API Integration

```typescript
// Environment-driven API URL
export const ApiUrl = import.meta.env.TICKER_API_URL

// Simple fetch wrapper with error handling
async function get<T>(path: string): Promise<T>
```

### State Management

- React Context for global ticker state (no external state library)
- Local component state for UI interactions
- No data caching layer - direct API calls with periodic refresh

### Styling Approach

- **Tailwind CSS v4** with `@tailwindcss/vite` plugin (no separate config file)
- Responsive design with `max-sm:` variants for mobile-specific behavior
- Dark mode support via `dark:` classes
- Custom CSS utilities defined inline or in component styles

## Development Commands

```bash
# Development
npm run dev        # Starts dev server on port 4000
npm run build      # Production build
npm run preview    # Preview production build

# Testing
npm run test       # Run vitest in watch mode
npm run coverage   # Generate test coverage report

# Code Quality
npm run lint       # ESLint with TypeScript rules
```

## Testing Patterns

### Test Setup

- **Vitest** with jsdom environment for React testing
- `vitest-fetch-mock` for API mocking in tests
- `@testing-library/react` for component testing
- Global test setup in `vitest-setup.ts`

### Common Test Patterns

```typescript
// Mock API calls
fetchMock.mockResponseOnce(JSON.stringify({ data: { messages: [] } }))

// Test components with context
const { ticker, settings } = useTicker()

// Intersection Observer mocking
window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock)
```

## Message Timeline Logic

### Infinite Scroll Implementation

- **Newer messages**: Polling via `setInterval` using `after` parameter with newest message ID
- **Older messages**: Intersection Observer triggers loading with `before` parameter using oldest message ID
- **State tracking**: `lastMessageReceived` boolean prevents infinite older message requests

### API Pagination

```typescript
getTimeline({ after: newestId }) // Fetch newer messages
getTimeline({ before: oldestId }) // Fetch older messages
getTimeline({}) // Initial load
```

## Mobile-Specific Features

### Responsive Scroll Behavior

Components like `Title.tsx` use conditional styling with Tailwind responsive variants:

```typescript
// Only apply on small screens
h1Ref.current.classList.toggle('max-sm:scale-66', scrolled)
// Style adjustments via window.innerWidth checks
```

## Integration Points

### Backend Dependencies

- Expects ticker backend API at `TICKER_API_URL` environment variable (default: localhost:8080)
- API returns structured responses with `data` property containing actual content
- Handles offline detection via TypeError catch blocks

### Build Integration

- Vite-based build with React and TypeScript
- GitHub Actions CI/CD with Node.js LTS (lts/jod from `.nvmrc`)
- SonarCloud integration for code quality
- Environment variables prefixed with `TICKER_`

## Error Handling Patterns

- Network errors (TypeError) → offline state
- API errors → error state with user message
- Graceful degradation: shows appropriate view based on connection/data state
- No global error boundaries - component-level error handling

## Development Notes

- Use `npm` (specified in `packageManager` field)
- TypeScript strict mode enabled
- ESLint with React hooks plugin for hook dependency checking
- Prettier with Tailwind plugin for class ordering
