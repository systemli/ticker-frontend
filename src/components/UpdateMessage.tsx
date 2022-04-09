import { FC, useCallback, useEffect, useState } from 'react'
import { Message } from 'semantic-ui-react'
import styled from 'styled-components'
import { spacing, zIndex } from '../lib/theme'
import * as serviceWorker from '../serviceWorker'

const Wrapper = styled.div`
  position: fixed;
  left: ${spacing.normal};
  bottom: ${spacing.normal};
  right: ${spacing.normal};
  text-align: center;
  z-index: ${zIndex.updateMessage};
`

const Link = styled.a`
  cursor: pointer;
`

const UpdateMessage: FC = () => {
  const [showReload, setShowReload] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true)
    setWaitingWorker(registration.waiting)
  }

  const reloadPage = useCallback(() => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' })
    setShowReload(false)
    window.location.reload()
  }, [waitingWorker])

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate })
  }, [])

  if (!showReload) {
    return <></>
  }

  return (
    <Wrapper>
      <Message color={'yellow'} negative>
        An update is available. Click <Link onClick={reloadPage}>here</Link> to update the App.
      </Message>
    </Wrapper>
  )
}

export default UpdateMessage
