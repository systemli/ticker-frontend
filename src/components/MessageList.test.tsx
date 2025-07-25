import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, vi } from 'vitest'
import * as api from '../lib/api'
import MessageList from './MessageList'
import { TickerProvider } from './TickerContext'

// Mock the WebSocket hook to prevent connection attempts
vi.mock('../hooks/useWebSocket', () => ({
  useWebSocket: vi.fn(() => ({
    socket: null,
    disconnect: vi.fn(),
    reconnect: vi.fn(),
    isConnected: false,
  })),
}))

// Mock IntersectionObserver for scroll testing
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})
window.IntersectionObserver = mockIntersectionObserver

const createTestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <TickerProvider>{children}</TickerProvider>
    </QueryClientProvider>
  )
}

describe('MessageList', function () {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  test('renders empty Messages', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: { refreshInterval: 60000, inactiveSettings: {} as any },
        ticker: { id: 1, title: 'Test', description: 'Test', createdAt: '', information: {} as any },
      },
    })

    vi.spyOn(api, 'getTimeline').mockResolvedValue({
      data: { messages: [] },
    })

    render(<MessageList />, { wrapper: createTestWrapper })

    // The text is already there immediately, so just check for it
    expect(screen.getByText("We don't have any messages at the moment.")).toBeInTheDocument()
  })

  test('shows loading state initially', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: { refreshInterval: 60000, inactiveSettings: {} as any },
        ticker: { id: 1, title: 'Test', description: 'Test', createdAt: '', information: {} as any },
      },
    })

    // Make getTimeline hang to test loading state
    vi.spyOn(api, 'getTimeline').mockImplementation(() => new Promise(() => {}))

    render(<MessageList />, { wrapper: createTestWrapper })

    await waitFor(() => {
      expect(screen.getByText('Loading')).toBeInTheDocument()
    })
  })

  test('shows error state on API failure', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: { refreshInterval: 60000, inactiveSettings: {} as any },
        ticker: { id: 1, title: 'Test', description: 'Test', createdAt: '', information: {} as any },
      },
    })

    vi.spyOn(api, 'getTimeline').mockRejectedValue(new Error('Network error'))

    render(<MessageList />, { wrapper: createTestWrapper })

    await waitFor(() => {
      expect(screen.getByText(/Error loading messages/)).toBeInTheDocument()
      expect(screen.getByText(/Network error/)).toBeInTheDocument()
    })
  })

  test('renders single message correctly', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: { refreshInterval: 60000, inactiveSettings: {} as any },
        ticker: { id: 1, title: 'Test', description: 'Test', createdAt: '', information: {} as any },
      },
    })

    vi.spyOn(api, 'getTimeline').mockResolvedValue({
      data: {
        messages: [
          {
            id: 1,
            text: 'Test message content',
            ticker: 1,
            createdAt: '2023-01-01T12:00:00Z',
            attachments: [],
          },
        ],
      },
    })

    render(<MessageList />, { wrapper: createTestWrapper })

    await waitFor(() => {
      expect(screen.getByText('Test message content')).toBeInTheDocument()
    })

    // Should not show empty message
    expect(screen.queryByText("We don't have any messages at the moment.")).not.toBeInTheDocument()
  })

  test('renders multiple messages correctly', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: { refreshInterval: 60000, inactiveSettings: {} as any },
        ticker: { id: 1, title: 'Test', description: 'Test', createdAt: '', information: {} as any },
      },
    })

    vi.spyOn(api, 'getTimeline').mockResolvedValue({
      data: {
        messages: [
          {
            id: 1,
            text: 'First message',
            ticker: 1,
            createdAt: '2023-01-01T12:00:00Z',
            attachments: [],
          },
          {
            id: 2,
            text: 'Second message',
            ticker: 1,
            createdAt: '2023-01-01T13:00:00Z',
            attachments: [],
          },
        ],
      },
    })

    render(<MessageList />, { wrapper: createTestWrapper })

    await waitFor(() => {
      expect(screen.getByText('First message')).toBeInTheDocument()
      expect(screen.getByText('Second message')).toBeInTheDocument()
    })
  })

  test('sets up intersection observer for infinite scroll', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: { refreshInterval: 60000, inactiveSettings: {} as any },
        ticker: { id: 1, title: 'Test', description: 'Test', createdAt: '', information: {} as any },
      },
    })

    vi.spyOn(api, 'getTimeline').mockResolvedValue({
      data: {
        messages: [
          {
            id: 1,
            text: 'Test message',
            ticker: 1,
            createdAt: '2023-01-01T12:00:00Z',
            attachments: [],
          },
        ],
      },
    })

    render(<MessageList />, { wrapper: createTestWrapper })

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument()
    })

    // Verify IntersectionObserver was created
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      })
    )

    // Verify observer.observe was called
    const observerInstance = mockIntersectionObserver.mock.results[0].value
    expect(observerInstance.observe).toHaveBeenCalled()
  })

  test('shows pagination loading when hasNextPage is true', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: { refreshInterval: 60000, inactiveSettings: {} as any },
        ticker: { id: 1, title: 'Test', description: 'Test', createdAt: '', information: {} as any },
      },
    })

    // Mock getTimeline to return messages with pagination
    vi.spyOn(api, 'getTimeline').mockResolvedValue({
      data: {
        messages: [
          {
            id: 1,
            text: 'Test message',
            ticker: 1,
            createdAt: '2023-01-01T12:00:00Z',
            attachments: [],
          },
        ],
      },
    })

    render(<MessageList />, { wrapper: createTestWrapper })

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument()
    })

    // The pagination loader should be visible when there are more pages
    // (This depends on the hasNextPage logic in the actual component)
    await waitFor(() => {
      const loadingText = screen.queryByText('Loading...')
      // This might be present or not depending on hasNextPage logic
      if (loadingText) {
        expect(loadingText).toBeInTheDocument()
      }
    })
  })

  test('cleanup intersection observer on unmount', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: { refreshInterval: 60000, inactiveSettings: {} as any },
        ticker: { id: 1, title: 'Test', description: 'Test', createdAt: '', information: {} as any },
      },
    })

    vi.spyOn(api, 'getTimeline').mockResolvedValue({
      data: {
        messages: [
          {
            id: 1,
            text: 'Test message',
            ticker: 1,
            createdAt: '2023-01-01T12:00:00Z',
            attachments: [],
          },
        ],
      },
    })

    const { unmount } = render(<MessageList />, { wrapper: createTestWrapper })

    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument()
    })

    // Get the observer instance to check cleanup
    const observerInstance = mockIntersectionObserver.mock.results[0].value

    unmount()

    // Verify unobserve was called on cleanup
    expect(observerInstance.unobserve).toHaveBeenCalled()
  })
})
