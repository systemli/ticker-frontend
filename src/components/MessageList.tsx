import { FC, useState, useEffect, useCallback } from 'react'
import { Dimmer, Header, Icon, Loader, Segment } from 'semantic-ui-react'
import { apiUrl } from '../lib/helper'
import { Message as MessageType, Ticker } from '../lib/types'
import Message from './Message'

interface Props {
    ticker: Ticker
    refreshInterval: number
}

const MessageList: FC<Props> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [
        isLoadingOlderMessages,
        setIsLoadingOlderMessages,
    ] = useState<boolean>(false)
    const [messages, setMessages] = useState<MessageType[]>([])

    const fetchMessages = useCallback(() => {
        // TODO: in which case would this value be defined?
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
    }, [messages])

    // FIXME: messages are currently empty on first load
    const fetchOlderMessages = useCallback(() => {
        const root = document.getElementById('root')
        if (
            root &&
            Math.floor(root.getBoundingClientRect().bottom) <=
                window.innerHeight
        ) {
            const oldestMessage = messages[messages.length - 1]
            if (oldestMessage !== undefined) {
                setIsLoadingOlderMessages(true)
                fetch(`${apiUrl}/timeline?before=${oldestMessage.id}`)
                    .then(response => response.json())
                    .then(response => {
                        if (response.data?.messages !== null) {
                            setMessages([
                                ...messages,
                                ...response.data.messages,
                            ])
                        }
                    })
                    .catch(error => {
                        // eslint-disable-next-line no-console
                        console.error(error)
                    })
                    .finally(() => {
                        setIsLoadingOlderMessages(false)
                    })
            }
        }
    }, [messages])

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
        document.addEventListener('scroll', fetchOlderMessages)

        //clean up (~ componentDidUnmount)
        return () => {
            document.removeEventListener('scroll', fetchOlderMessages)
        }

        // This should only be executed once on load (~ componentDidMount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return (
            <Dimmer active inverted>
                <Loader inverted size="small">
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
            {isLoadingOlderMessages && (
                <Loader active inline="centered" size="tiny" />
            )}
        </div>
    )
}

export default MessageList
