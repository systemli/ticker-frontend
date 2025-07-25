import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useWebSocket } from '../useWebSocket'

// Mock WebSocket
const mockWebSocket = {
  close: vi.fn(),
  send: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  readyState: WebSocket.OPEN,
  CONNECTING: WebSocket.CONNECTING,
  OPEN: WebSocket.OPEN,
  CLOSING: WebSocket.CLOSING,
  CLOSED: WebSocket.CLOSED,
} as unknown as WebSocket

const mockWebSocketConstructor = vi.fn(() => mockWebSocket)

// eslint-disable-next-line
global.WebSocket = mockWebSocketConstructor as any

// Mock API URL
vi.mock('../../lib/api', () => ({
  ApiUrl: 'http://localhost:8080/v1',
}))

describe('useWebSocket', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })

    return ({ children }: { children: ReactNode }) => QueryClientProvider({ client: queryClient, children })
  }

  it('should create WebSocket connection when enabled', async () => {
    const onMessage = vi.fn()
    const onOpen = vi.fn()

    renderHook(
      () =>
        useWebSocket({
          onMessage,
          onOpen,
          enabled: true,
        }),
      { wrapper: createWrapper() }
    )

    // Wait for the timeout to complete
    await waitFor(() => {
      expect(mockWebSocketConstructor).toHaveBeenCalledWith('ws://localhost:8080/v1/ws')
    })
  })

  it('should not create WebSocket connection when disabled', () => {
    renderHook(
      () =>
        useWebSocket({
          enabled: false,
        }),
      { wrapper: createWrapper() }
    )

    expect(mockWebSocketConstructor).not.toHaveBeenCalled()
  })

  it('should handle WebSocket messages', async () => {
    const onMessage = vi.fn()

    // Mock the WebSocket constructor to capture the onmessage handler
    const mockWebSocketInstance = {
      close: vi.fn(),
      send: vi.fn(),
      readyState: WebSocket.OPEN,
      onopen: null as ((event: Event) => void) | null,
      onmessage: null as ((event: MessageEvent) => void) | null,
      onclose: null as ((event: CloseEvent) => void) | null,
      onerror: null as ((event: Event) => void) | null,
    }

    mockWebSocketConstructor.mockReturnValue(mockWebSocketInstance as unknown as WebSocket)

    renderHook(
      () =>
        useWebSocket({
          onMessage,
          enabled: true,
        }),
      { wrapper: createWrapper() }
    )

    // Wait for WebSocket to be created
    await waitFor(() => {
      expect(mockWebSocketConstructor).toHaveBeenCalled()
    })

    const mockMessage = {
      type: 'message_created',
      tickerId: 1,
      data: {
        message: {
          id: 1,
          text: 'Test message',
          ticker: 1,
          createdAt: new Date().toISOString(),
          attachments: [],
        },
      },
    }

    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify(mockMessage),
    })

    // Simulate receiving a message
    mockWebSocketInstance.onmessage!(messageEvent)

    await waitFor(() => {
      expect(onMessage).toHaveBeenCalledWith(mockMessage)
    })
  })

  it('should handle malformed WebSocket messages gracefully', async () => {
    const onMessage = vi.fn()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Mock the WebSocket constructor to capture the onmessage handler
    const mockWebSocketInstance = {
      close: vi.fn(),
      send: vi.fn(),
      readyState: WebSocket.OPEN,
      onopen: null as ((event: Event) => void) | null,
      onmessage: null as ((event: MessageEvent) => void) | null,
      onclose: null as ((event: CloseEvent) => void) | null,
      onerror: null as ((event: Event) => void) | null,
    }

    mockWebSocketConstructor.mockReturnValue(mockWebSocketInstance as unknown as WebSocket)

    renderHook(
      () =>
        useWebSocket({
          onMessage,
          enabled: true,
        }),
      { wrapper: createWrapper() }
    )

    // Wait for WebSocket to be created
    await waitFor(() => {
      expect(mockWebSocketConstructor).toHaveBeenCalled()
    })

    const messageEvent = new MessageEvent('message', {
      data: 'invalid json',
    })

    // Simulate receiving a malformed message
    mockWebSocketInstance.onmessage!(messageEvent)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to parse WebSocket message:', expect.any(Error))
      expect(onMessage).not.toHaveBeenCalled()
    })

    consoleSpy.mockRestore()
  })
})
