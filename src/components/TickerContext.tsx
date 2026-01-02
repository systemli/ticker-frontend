import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, JSX, ReactNode, useEffect, useMemo, useState } from 'react'
import { getInit } from '../lib/api'
import { Settings, Ticker } from '../lib/types'

export function TickerProvider({ children }: Readonly<{ children: ReactNode }>): JSX.Element {
  const queryClient = useQueryClient()
  const [browserOffline, setBrowserOffline] = useState<boolean>(!navigator.onLine)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['init'],
    queryFn: getInit,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const ticker = data?.data.ticker ?? null
  const settings = data?.data.settings

  // Detect offline via network errors (TypeError indicates network failure)
  const networkOffline = isError && error instanceof TypeError
  const isOffline = browserOffline || networkOffline
  const hasError = isError && !networkOffline

  // Listen to browser online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setBrowserOffline(false)
      // Refetch init data when coming back online
      queryClient.refetchQueries({ queryKey: ['init'] })
    }
    const handleOffline = () => setBrowserOffline(true)

    globalThis.addEventListener('online', handleOnline)
    globalThis.addEventListener('offline', handleOffline)

    return () => {
      globalThis.removeEventListener('online', handleOnline)
      globalThis.removeEventListener('offline', handleOffline)
    }
  }, [queryClient])

  // setIsOffline updates the browser offline state (used by useMessages for network error detection)
  const setIsOffline = (offline: boolean) => setBrowserOffline(offline)

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
