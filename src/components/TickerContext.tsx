import { createContext, JSX, ReactNode, useEffect, useMemo, useState } from 'react'
import { getInit } from '../lib/api'
import { Settings, Ticker } from '../lib/types'

export function TickerProvider({ children }: Readonly<{ children: ReactNode }>): JSX.Element {
  const [ticker, setTicker] = useState<Ticker | null>(null)
  const [settings, setSettings] = useState<Settings>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isOffline, setIsOffline] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  const fetchInit = () => {
    getInit()
      .then(response => {
        if (response.data.settings) {
          setSettings(response.data.settings)
        }

        setTicker(response.data.ticker)
        setIsLoading(false)
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
}

const TickerContext = createContext<TickerContext>({} as TickerContext)

export default TickerContext
