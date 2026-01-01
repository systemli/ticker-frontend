import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as api from '../lib/api'
import OfflineWarning from './OfflineWarning'
import { TickerProvider } from './TickerContext'

// Mock navigator.onLine
const mockNavigatorOnLine = (value: boolean) => {
  Object.defineProperty(navigator, 'onLine', {
    value,
    writable: true,
    configurable: true,
  })
}

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

describe('OfflineWarning', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigatorOnLine(true)
  })

  it('should not render when online', async () => {
    mockNavigatorOnLine(true)

    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: { refreshInterval: 60000, inactiveSettings: {} as any },
        ticker: { id: 1, title: 'Test', description: 'Test', createdAt: '', information: {} as any },
      },
    })

    render(<OfflineWarning />, { wrapper: createTestWrapper })

    // Wait for init to complete
    await vi.waitFor(() => {
      expect(screen.queryByText(/offline/i)).not.toBeInTheDocument()
    })
  })

  it('should render when offline (TypeError on fetch)', async () => {
    mockNavigatorOnLine(false)

    vi.spyOn(api, 'getInit').mockRejectedValue(new TypeError('Failed to fetch'))

    render(<OfflineWarning />, { wrapper: createTestWrapper })

    expect(await screen.findByText(/You appear to be offline/i)).toBeInTheDocument()
  })

  it('should render when navigator.onLine is false', async () => {
    mockNavigatorOnLine(false)

    // Even if API succeeds (from cache), should show offline if navigator.onLine is false
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: { refreshInterval: 60000, inactiveSettings: {} as any },
        ticker: { id: 1, title: 'Test', description: 'Test', createdAt: '', information: {} as any },
      },
    })

    render(<OfflineWarning />, { wrapper: createTestWrapper })

    // Should still show offline warning since navigator.onLine is false
    expect(await screen.findByText(/You appear to be offline/i)).toBeInTheDocument()
  })
})
