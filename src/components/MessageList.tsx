import { FC, useState } from 'react'
import { Dimmer, Header, Icon, Loader, Segment } from 'semantic-ui-react'
import { Ticker } from '../types'

interface Props {
    ticker: Ticker
    refreshInterval: number
}

const MessageList: FC<Props> = props => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    if (isLoading) {
        return (
            <Dimmer active inverted>
                <Loader size="small" inverted>
                    Loading messages
                </Loader>
            </Dimmer>
        )
    }

    return <p>TODO</p>
}

export default MessageList
