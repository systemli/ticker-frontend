import { FC, useEffect, useState } from 'react'

const ReloadInfo: FC = () => {
  const [showReloadInfo, setShowReloadInfo] = useState<boolean>(localStorage.getItem('showReloadInfo') === null)

  const handleDismiss = () => {
    setShowReloadInfo(false)
    localStorage.setItem('showReloadInfo', '0')
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowReloadInfo(false)
    }, 10000)
    return () => clearTimeout(timeoutId)
  }, [])

  if (!showReloadInfo) {
    return null
  }

  return (
    <div className="absolute top-0 right-0 left-0 bg-amber-300 p-2 text-black shadow-xl transition-all transition-discrete duration-700">
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
  )
}

export default ReloadInfo
