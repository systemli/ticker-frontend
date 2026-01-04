import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from './test-utils'
import { vi } from 'vitest'
import { TickerProvider } from './components/TickerContext'
import * as api from './lib/api'
import { Settings, Ticker as TickerType } from './lib/types'
import Ticker from './Ticker'
import en from './i18n/locales/en.json'

describe('Ticker', function () {
  const initSettings = {
    refreshInterval: 1000,
    inactiveSettings: {
      author: 'Systemli Ticker Team',
      email: 'admin@systemli.org',
      homepage: '',
      twitter: '',
      headline: 'The ticker is currently inactive.',
      subHeadline: 'Please contact us if you want to use it.',
      description: '...',
    },
  } as Settings
  const ticker = {
    id: 1,
    createdAt: new Date().toISOString(),
    title: 'Ticker Title',
    description: 'Ticker Description',
    information: {
      author: 'Systemli Ticker Team',
      url: 'https://demoticker.org',
      email: 'admin@demoticker.org',
      twitter: 'systemli',
      facebook: 'systemli',
      instagram: 'systemli',
      mastodon: 'systemli',
      telegram: 'systemli',
      threads: 'systemli',
      bluesky: 'systemli',
    },
  } as TickerType

  const renderTicker = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })

    return render(
      <QueryClientProvider client={queryClient}>
        <TickerProvider>
          <Ticker />
        </TickerProvider>
      </QueryClientProvider>
    )
  }

  test('renders OfflineView', async function () {
    vi.spyOn(api, 'getInit').mockRejectedValue(new TypeError())
    renderTicker()

    expect(screen.getByText(en.loading)).toBeInTheDocument()

    expect(await screen.findByText(en.offline)).toBeInTheDocument()
  })

  test('renders ErrorView', async function () {
    vi.spyOn(api, 'getInit').mockRejectedValue(new Error('The server responses with an error: Internal Server Error (500)'))
    renderTicker()

    expect(screen.getByText(en.loading)).toBeInTheDocument()

    expect(await screen.findByText(en.errorConnection)).toBeInTheDocument()
  })

  test('renders InactiveView', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: initSettings,
        ticker: null,
      },
    })
    renderTicker()

    expect(screen.getByText(en.loading)).toBeInTheDocument()

    expect(await screen.findByText('The ticker is currently inactive.')).toBeInTheDocument()
  })

  test('renders ActiveView', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: initSettings,
        ticker: ticker,
      },
    })
    vi.spyOn(api, 'getTimeline').mockResolvedValue({
      data: {
        messages: [],
      },
    })
    renderTicker()

    expect(screen.getByText(en.loading)).toBeInTheDocument()

    expect(await screen.findByText(en.noMessages)).toBeInTheDocument()
  })
})
