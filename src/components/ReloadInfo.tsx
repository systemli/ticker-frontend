import { FC, useState } from 'react'

const ReloadInfo: FC = () => {
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
      <div className="absolute right-0 left-0 z-20 bg-amber-300 p-2 text-black shadow-xl sm:fixed">
        <div className="flex items-center justify-center">
          <p>New messages will load automatically.</p>
          <button
            onClick={handleDismiss}
            className="ml-2 rounded-lg bg-gray-700 p-1 px-3 py-2 text-center text-xs font-medium text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-400 focus:outline-none"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReloadInfo
