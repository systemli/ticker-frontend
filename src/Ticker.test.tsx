import Ticker from './Ticker'
import { render, screen } from '@testing-library/react'
import * as api from './lib/api'
import { Settings, Ticker as TickerType } from './lib/types'
import { TickerProvider } from './components/useTicker'
import { vi } from 'vitest'

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
    id: '1',
    createdAt: new Date(),
    title: 'Ticker Title',
    description: 'Ticker Description',
    domain: 'example.com',
    information: {
      author: 'Systemli Ticker Team',
      url: 'https://demoticker.org',
      email: 'admin@demoticker.org',
      twitter: 'systemli',
      facebook: 'betternot',
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

    expect(await screen.findByText('The messages update automatically. There is no need to reload the entire page.')).toBeInTheDocument()

    expect(await screen.findByText('We dont have any messages at the moment.')).toBeInTheDocument()
  })
})
