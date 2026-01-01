import { createContext, JSX, ReactNode, useEffect, useMemo, useState } from 'react'
import { getInit } from '../lib/api'
import { Settings, Ticker } from '../lib/types'

export function TickerProvider({ children }: Readonly<{ children: ReactNode }>): JSX.Element {
  const [ticker, setTicker] = useState<Ticker | null>(null)
  const [settings, setSettings] = useState<Settings>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine)
  const [hasError, setHasError] = useState<boolean>(false)

  // Listen to browser online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const fetchInit = () => {
    getInit()
      .then(response => {
        if (response.data.settings) {
          setSettings(response.data.settings)
        }

        setTicker(response.data.ticker)
        setIsLoading(false)
        // Only set online if browser reports online (cache responses don't mean we're online)
        if (navigator.onLine) {
          setIsOffline(false)
        }
      })
      .catch(error => {
        if (error instanceof TypeError) {
          setIsOffline(true)
        } else {
          setHasError(true)
        }
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchInit()
  }, [])

  const memoedValue = useMemo(
    () => ({
      ticker,
      settings,
      isLoading,
      isOffline,
      hasError,
      setIsOffline,
    }),
    [ticker, settings, isLoading, isOffline, hasError]
  )

  return <TickerContext.Provider value={memoedValue}>{children}</TickerContext.Provider>
}

interface TickerContext {
  ticker: Ticker | null
  settings?: Settings
  isLoading: boolean
  isOffline: boolean
  hasError: boolean
  setIsOffline: (offline: boolean) => void
}

const TickerContext = createContext<TickerContext>({} as TickerContext)

export default TickerContext
