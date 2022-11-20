import { FC, useEffect } from 'react'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
import ErrorView from './views/ErrorView'
import ActiveView from './views/ActiveView'
import InactiveView from './views/InactiveView'
import useTicker from './components/useTicker'
import EmbedActiveView from './views/EmbedActiveView'

const ViewRenderer: FC = () => {
  const { ticker, settings, isLoading, isOffline, hasError } = useTicker()

  useEffect(() => {
    if (ticker?.title) {
      document.title = ticker.title
    }
  }, [ticker])

  if (isLoading) {
    return (
      <Container>
        <Dimmer active>
          <Loader content="Loading" size="large" />
        </Dimmer>
      </Container>
    )
  }

  if (hasError) {
    return (
      <ErrorView message="There seems to be a problem connecting to the server." />
    )
  }

  if (isOffline) {
    return <ErrorView message="It seems that you are offline." />
  }

  if (ticker?.active) {
    return process.env.REACT_APP_BUILD_TARGET === 'embed' ? (
      <EmbedActiveView />
    ) : (
      <ActiveView />
    )
  }

  if (ticker === null && settings?.inactive_settings !== undefined) {
    return <InactiveView settings={settings.inactive_settings} />
  }

  return <div>...</div>
}

export default ViewRenderer
