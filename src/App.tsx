import { FC, useEffect, useState } from 'react'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
// import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { apiUrl } from './lib/helper'
import { Ticker, Settings } from './lib/types'
import { ActiveView, ErrorView, InactiveView } from './views'

const App: FC = () => {
    const [ticker, setTicker] = useState<Ticker | null>(null)
    const [settings, setSettings] = useState<Settings>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isOffline, setIsOffline] = useState<boolean>(false)
    const [gotError, setGotError] = useState<boolean>(false)

    // TODO: install and configure offline plugin
    // const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false)
    const isUpdateAvailable = false

    // OfflinePluginRuntime.install({
    //     onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    //     onUpdated: () => setIsUpdateAvailable(true),
    // })

    const fetchInit = () => {
        const url = `${apiUrl}/init`
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    setGotError(true)
                    return
                }
                return response.json()
            })
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
            })
            .catch(() => {
                setIsOffline(true)
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

    if (gotError) {
        return (
            <ErrorView message="There seems to be a problem connecting to the server." />
        )
    }

    if (isOffline) {
        return <ErrorView message="It seems that you are offline." />
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
        return (
            <InactiveView
                settings={settings.inactive_settings}
                update={isUpdateAvailable}
            />
        )
    }

    return <div>...</div>
}

export default App
