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

  // If offline and no cached ticker data, show error
  if (isOffline && ticker === null) {
    return <ErrorView message={t('offline')} />
  }

  if (ticker === null && settings?.inactiveSettings !== undefined) {
    return <InactiveView settings={settings.inactiveSettings} />
  }

  // Show ActiveView with OfflineWarning if we have ticker data (even when offline)
  return <ActiveView />
}

export default Ticker
