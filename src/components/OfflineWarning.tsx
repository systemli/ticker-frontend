import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useTicker from './useTicker'

const OfflineWarning: FC = () => {
  const { isOffline } = useTicker()
  const { t } = useTranslation()

  if (!isOffline) {
    return null
  }

  return (
    <div className="h-10">
      <div className="absolute left-1/2 z-20 w-screen -translate-x-1/2 transform bg-orange-500 p-2 text-white shadow-xl">
        <div className="flex items-center justify-center">
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636a9 9 0 010 12.728M5.636 5.636a9 9 0 000 12.728M12 12h.01M8.464 8.464a5 5 0 017.072 7.072M8.464 15.536a5 5 0 010-7.072"
            />
          </svg>
          <p>{t('appearsOffline')}</p>
        </div>
      </div>
    </div>
  )
}

export default OfflineWarning
