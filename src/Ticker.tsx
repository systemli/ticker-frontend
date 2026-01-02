import { FC } from 'react'
import Loader from './components/Loader'
import useTicker from './components/useTicker'
import ActiveView from './views/ActiveView'
import ErrorView from './views/ErrorView'
import InactiveView from './views/InactiveView'

const Ticker: FC = () => {
  const { ticker, settings, isLoading, isOffline, hasError } = useTicker()

  if (isLoading) {
    return <Loader content="Loading" />
  }

  if (hasError) {
    return <ErrorView message="There seems to be a problem connecting to the server." />
  }

  // If offline and no cached ticker data, show error
  if (isOffline && ticker === null) {
    return <ErrorView message="It seems that you are offline." />
  }

  if (ticker === null && settings?.inactiveSettings !== undefined) {
    return <InactiveView settings={settings.inactiveSettings} />
  }

  // Show ActiveView with OfflineWarning if we have ticker data (even when offline)
  return <ActiveView />
}

export default Ticker
