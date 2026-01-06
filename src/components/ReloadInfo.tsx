import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ReloadInfo: FC = () => {
  const { t } = useTranslation()
  const [showReloadInfo, setShowReloadInfo] = useState<boolean>(localStorage.getItem('showReloadInfo') === null)

  const handleDismiss = () => {
    setShowReloadInfo(false)
    localStorage.setItem('showReloadInfo', '0')
  }

  if (!showReloadInfo) {
    return null
  }

  return (
    <div className="h-10">
      <div className="absolute left-1/2 z-20 w-screen -translate-x-1/2 transform bg-amber-300 p-2 text-black shadow-xl">
        <div className="flex items-center justify-center">
          <p>{t('automaticLoad')}</p>
          <button
            onClick={handleDismiss}
            className="ml-2 rounded-lg bg-gray-700 p-1 px-3 py-2 text-center text-xs font-medium text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 focus:outline-none"
          >
            {t('dismiss')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReloadInfo
