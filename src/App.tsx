import { FC, useEffect, useState } from 'react'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
import { Ticker, Settings } from './types'
import { ActiveView, InactiveView, OfflineView } from './views'

const App: FC = () => {
    const [ticker, setTicker] = useState<Ticker | null>(null)
    const [settings, setSettings] = useState<Settings>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [offline, setOffline] = useState<boolean>(false)
    const [isUpdateAvailable, setisUpdateAvailable] = useState<boolean>(false)

    const fetchInit = () => {
        const url =
            process.env.REACT_APP_API_URL || 'http://localhost:8080/v1/init'

        fetch(url)
            .then(response => response.json())
            .then(response => {
                if (response.data?.settings) {
                    setSettings(response.data.settings)
                }

                if (response.data?.ticker?.active) {
                    setTicker(response.data.ticker)
                    if (ticker?.title) {
                        document.title = ticker.title
                    }
                }

                setIsLoading(false)
                setOffline(false)
            })
            .catch(() => {
                setOffline(true)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchInit()
        // This should only be executed once on load (~ componentDidMount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return (
            <Container>
                <Dimmer active>
                    <Loader content="Loading" size="large" />
                </Dimmer>
            </Container>
        )
    }

    if (offline) {
        return <OfflineView />
    }

    if (ticker?.active) {
        return (
            <ActiveView
                refreshInterval={settings?.refresh_interval || 0}
                ticker={ticker}
                update={isUpdateAvailable}
            />
        )
    }

    if (ticker === null && settings?.inactive_settings !== undefined) {
        return <InactiveView settings={settings.inactive_settings} />
    }

    return <div>...</div>
}

export default App
