import { FC, useState, useEffect } from 'react'
import { Dimmer, Header, Icon, Loader, Segment } from 'semantic-ui-react'
import { apiUrl } from '../lib/helper'
import { Message as MessageType, Ticker } from '../lib/types'
import Message from './Message'

interface Props {
    ticker: Ticker
    refreshInterval: number
}

const MessageList: FC<Props> = props => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [messages, setMessages] = useState<MessageType[]>([])

    const fetchMessages = () => {
        const after = messages[0]?.id
        const url = `${apiUrl}/timeline` + (after ? `?after=${after}` : '')

        fetch(url)
            .then(response => response.json())
            .then(response => {
                if (response.data?.messages) {
                    setMessages(response.data?.messages)
                }
                setIsLoading(false)
            })
            .catch(error => {
                // eslint-disable-next-line no-console
                console.error(error)
                setIsLoading(false)
            })
    }

    const renderPlaceholder = () => (
        <Segment placeholder>
            <Header icon>
                <Icon color={'grey'} name="hourglass half" />
                We dont have any messages at the moment.
            </Header>
        </Segment>
    )

    useEffect(() => {
        fetchMessages()
        // This should only be executed once on load (~ componentDidMount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return (
            <Dimmer active inverted>
                <Loader size="small" inverted>
                    Loading messages
                </Loader>
            </Dimmer>
        )
    }

    if (!messages.length) {
        return renderPlaceholder()
    }

    return (
        <div>
            {messages.map(message => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    )
}

export default MessageList
