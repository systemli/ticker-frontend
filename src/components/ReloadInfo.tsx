import { FC, useCallback, useState } from 'react'
import { Message } from 'semantic-ui-react'

const ReloadInfo: FC = () => {
  const [showReloadInfo, setShowReloadInfo] = useState<boolean>(localStorage.getItem('showReloadInfo') === null)

  const handleDismiss = useCallback(() => {
    setShowReloadInfo(false)
    localStorage.setItem('showReloadInfo', '0')
  }, [])

  return (
    <Message
      color="teal"
      content="The messages update automatically. There is no need to reload the entire page."
      header="Information"
      hidden={!showReloadInfo}
      icon="info"
      onDismiss={handleDismiss}
    />
  )
}

export default ReloadInfo
