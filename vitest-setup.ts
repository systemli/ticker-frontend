import '@testing-library/jest-dom'
import { vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

// Mock WebSocket globally for all tests using a class
class MockWebSocket {
  static CONNECTING = 0
  static OPEN = 1
  static CLOSING = 2
  static CLOSED = 3

  CONNECTING = MockWebSocket.CONNECTING
  OPEN = MockWebSocket.OPEN
  CLOSING = MockWebSocket.CLOSING
  CLOSED = MockWebSocket.CLOSED

  readyState = MockWebSocket.OPEN
  close = vi.fn()
  send = vi.fn()
  addEventListener = vi.fn()
  removeEventListener = vi.fn()
  onopen: ((event: Event) => void) | null = null
  onclose: ((event: CloseEvent) => void) | null = null
  onmessage: ((event: MessageEvent) => void) | null = null
  onerror: ((event: Event) => void) | null = null

  constructor(_url: string) {
    // Constructor for WebSocket mock
  }
}

global.WebSocket = MockWebSocket as unknown as typeof WebSocket

// Mock IntersectionObserver globally using a class
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()

  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
    // Constructor for IntersectionObserver mock
  }
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

const fetchMocker = createFetchMock(vi)

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks()
