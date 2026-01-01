import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { createElement, ReactNode } from 'react'
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest'
import { WebSocketMessage } from '../../lib/types'
import { useMessages } from '../useMessages'
import { useWebSocket } from '../useWebSocket'

// Mock dependencies
vi.mock('../../components/useTicker', () => ({
  default: vi.fn(() => ({
    ticker: { id: 1, title: 'Test Ticker' },
    setIsOffline: vi.fn(),
  })),
}))

vi.mock('../useWebSocket')

vi.mock('../../lib/api', () => ({
  getTimeline: vi.fn(() =>
    Promise.resolve({
      data: {
        messages: [
          { id: 1, text: 'Message 1', ticker: 1, createdAt: '2023-01-01', attachments: [] },
          { id: 2, text: 'Message 2', ticker: 1, createdAt: '2023-01-02', attachments: [] },
        ],
      },
    })
  ),
}))

const mockUseWebSocket = useWebSocket as MockedFunction<typeof useWebSocket>

describe('useMessages', () => {
  let queryClient: QueryClient

  const createWrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client: queryClient }, children)

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    vi.clearAllMocks()
  })

  it('loads messages initially', async () => {
    const { result } = renderHook(() => useMessages(), {
      wrapper: createWrapper,
    })

    // Initially loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.messages).toEqual([])

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.messages).toHaveLength(2)
    expect(result.current.messages[0].text).toBe('Message 1')
    expect(result.current.messages[1].text).toBe('Message 2')
  })

  it('provides pagination interface', async () => {
    const { result } = renderHook(() => useMessages(), {
      wrapper: createWrapper,
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Check pagination properties exist
    expect(typeof result.current.fetchNextPage).toBe('function')
    expect(typeof result.current.hasNextPage).toBe('boolean')
    expect(typeof result.current.isFetchingNextPage).toBe('boolean')
  })

  it('provides error state', async () => {
    const { result } = renderHook(() => useMessages(), {
      wrapper: createWrapper,
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(typeof result.current.isError).toBe('boolean')
    expect(result.current.error).toBeDefined()
  })

  it('integrates with WebSocket', () => {
    renderHook(() => useMessages(), {
      wrapper: createWrapper,
    })

    // Verify WebSocket hook is called with correct parameters
    expect(mockUseWebSocket).toHaveBeenCalledWith({
      enabled: true, // ticker exists
      onMessage: expect.any(Function),
    })
  })

  it('handles WebSocket message_created', async () => {
    let onMessageHandler: ((message: WebSocketMessage) => void) | undefined

    // Capture the onMessage handler
    mockUseWebSocket.mockImplementation(options => {
      onMessageHandler = options?.onMessage
      return {
        socket: null,
        disconnect: vi.fn(),
        reconnect: vi.fn(),
        isConnected: false,
      }
    })

    const { result } = renderHook(() => useMessages(), {
      wrapper: createWrapper,
    })

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Simulate WebSocket message
    const newMessage = {
      id: 3,
      text: 'New WebSocket Message',
      ticker: 1,
      createdAt: '2023-01-03',
      attachments: [],
    }

    const wsMessage: WebSocketMessage = {
      type: 'message_created',
      tickerId: 1,
      data: { message: newMessage },
    }

    onMessageHandler?.(wsMessage)

    // New message should be added to the beginning
    await waitFor(() => {
      expect(result.current.messages).toHaveLength(3)
      expect(result.current.messages[0]).toEqual(newMessage)
    })
  })

  it('handles WebSocket message_deleted', async () => {
    let onMessageHandler: ((message: WebSocketMessage) => void) | undefined

    mockUseWebSocket.mockImplementation(options => {
      onMessageHandler = options?.onMessage
      return {
        socket: null,
        disconnect: vi.fn(),
        reconnect: vi.fn(),
        isConnected: false,
      }
    })

    const { result } = renderHook(() => useMessages(), {
      wrapper: createWrapper,
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Simulate WebSocket message deletion
    const wsMessage: WebSocketMessage = {
      type: 'message_deleted',
      tickerId: 1,
      data: { messageId: 1 },
    }

    onMessageHandler?.(wsMessage)

    // Message with id 1 should be removed
    await waitFor(() => {
      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages.find(msg => msg.id === 1)).toBeUndefined()
    })
  })

  it('ignores WebSocket messages from different tickers', async () => {
    let onMessageHandler: ((message: WebSocketMessage) => void) | undefined

    mockUseWebSocket.mockImplementation(options => {
      onMessageHandler = options?.onMessage
      return {
        socket: null,
        disconnect: vi.fn(),
        reconnect: vi.fn(),
        isConnected: false,
      }
    })

    const { result } = renderHook(() => useMessages(), {
      wrapper: createWrapper,
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    const initialMessageCount = result.current.messages.length

    // Simulate WebSocket message from different ticker
    const wsMessage: WebSocketMessage = {
      type: 'message_created',
      tickerId: 999, // Different ticker ID
      data: {
        message: {
          id: 999,
          text: 'Message from other ticker',
          ticker: 999,
          createdAt: '2023-01-03',
          attachments: [],
        },
      },
    }

    onMessageHandler?.(wsMessage)

    // Message count should remain the same
    expect(result.current.messages).toHaveLength(initialMessageCount)
  })
})
