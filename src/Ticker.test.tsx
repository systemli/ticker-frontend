import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { TickerProvider } from './components/useTicker'
import * as api from './lib/api'
import { Settings, Ticker as TickerType } from './lib/types'
import Ticker from './Ticker'

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
    return render(
      <TickerProvider>
        <Ticker />
      </TickerProvider>
    )
  }

  test('renders OfflineView', async function () {
    vi.spyOn(api, 'getInit').mockRejectedValue(new TypeError())
    renderTicker()

    expect(screen.getByText('Loading')).toBeInTheDocument()

    expect(await screen.findByText('It seems that you are offline.')).toBeInTheDocument()
  })

  test('renders ErrorView', async function () {
    vi.spyOn(api, 'getInit').mockRejectedValue(new Error('The server responses with an error: Internal Server Error (500)'))
    renderTicker()

    expect(screen.getByText('Loading')).toBeInTheDocument()

    expect(await screen.findByText('There seems to be a problem connecting to the server.')).toBeInTheDocument()
  })

  test('renders InactiveView', async function () {
    vi.spyOn(api, 'getInit').mockResolvedValue({
      data: {
        settings: initSettings,
        ticker: null,
      },
    })
    renderTicker()

    expect(screen.getByText('Loading')).toBeInTheDocument()

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
    const intersectionObserverMock = () => ({
      observe: () => null,
    })
    window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock)
    renderTicker()

    expect(screen.getByText('Loading')).toBeInTheDocument()

    expect(await screen.findByText("We don't have any messages at the moment.")).toBeInTheDocument()
  })
})
