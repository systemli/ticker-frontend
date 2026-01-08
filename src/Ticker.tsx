import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Loader from './components/Loader'
import useTicker from './components/useTicker'
import ActiveView from './views/ActiveView'
import ErrorView from './views/ErrorView'
import InactiveView from './views/InactiveView'

const Ticker: FC = () => {
  const { t } = useTranslation()
  const { ticker, settings, isLoading, isOffline, hasError } = useTicker()

  if (isLoading) {
    return <Loader content={t('loading')} />
  }

  if (hasError) {
    return <ErrorView message={t('errorConnection')} />
  }

  if (ticker === null && settings?.inactiveSettings !== undefined) {
    return <InactiveView settings={settings.inactiveSettings} />
  }

  // If we have no data at all and can't fetch (offline or error), show error
  if (ticker === null) {
    return <ErrorView message={isOffline ? t('offline') : t('errorConnection')} />
  }

  // Show ActiveView with OfflineWarning if we have ticker data (even when offline)
  return <ActiveView />
}

export default Ticker
