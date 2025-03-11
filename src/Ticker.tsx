import { FC, useEffect } from 'react'
import Loader from './components/Loader'
import useTicker from './components/useTicker'
import ActiveView from './views/ActiveView'
import ErrorView from './views/ErrorView'
import InactiveView from './views/InactiveView'

const Ticker: FC = () => {
  const { ticker, settings, isLoading, isOffline, hasError } = useTicker()

  useEffect(() => {
    if (ticker?.title) {
      document.title = ticker.title
    }
  }, [ticker])

  if (isLoading) {
    return <Loader content="Loading" />
  }

  if (hasError) {
    return <ErrorView message="There seems to be a problem connecting to the server." />
  }

  if (isOffline) {
    return <ErrorView message="It seems that you are offline." />
  }

  if (ticker === null && settings?.inactiveSettings !== undefined) {
    return <InactiveView settings={settings.inactiveSettings} />
  }

  return <ActiveView />
}

export default Ticker
