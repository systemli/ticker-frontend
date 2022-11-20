import { FC, useCallback, useEffect, useState } from 'react'
import { Message as MessageType } from '../lib/types'
import Message from './Message'
import { getTimeline } from '../lib/api'
import useTicker from './useTicker'
import MessagesLoader from './MessagesLoader'
import MessagesPlaceholder from './MessagesPlaceholder'

const EmbedMessageList: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<MessageType[]>([])
  const { ticker } = useTicker()

  const fetchMessages = useCallback(() => {
    getTimeline({ limit: '10' })
      .then(response => {
        if (response.data.messages) {
          setMessages([...response.data.messages, ...messages])
        }
        setIsLoading(false)
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error)
        setIsLoading(false)
      })
  }, [messages])

  useEffect(() => {
    fetchMessages()

    // This should only be executed once on load (~ componentDidMount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <MessagesLoader />
  }

  if (!messages.length) {
    return <MessagesPlaceholder />
  }

  return (
    <div>
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
      <a href={ticker?.domain} rel="noopener noreferrer" target="_blank">
        View more on Ticker Website
      </a>
    </div>
  )
}

export default EmbedMessageList
