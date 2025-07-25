import '@testing-library/jest-dom'
import { vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

// Mock WebSocket globally for all tests
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
  onopen: null,
  onclose: null,
  onmessage: null,
  onerror: null,
} as unknown as WebSocket

global.WebSocket = vi.fn(() => mockWebSocket) as any

// Mock IntersectionObserver globally
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

const fetchMocker = createFetchMock(vi)

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks()
