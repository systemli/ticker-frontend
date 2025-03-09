import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { getTimeline } from '../lib/api'
import { Message as MessageType } from '../lib/types'
import EmptyMessageList from './EmptyMessageList'
import Loader from './Loader'
import Message from './Message'
import useTicker from './useTicker'

const MessageList: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [lastMessageReceived, setLastMessageReceived] = useState<boolean>(false)

  const { settings } = useTicker()

  const loadMoreSpinnerRef = useRef<HTMLDivElement>(null)

  const fetchMessages = useCallback(() => {
    const after = messages[0]?.id

    getTimeline({ after: after })
      .then(response => {
        if (response.data.messages) {
          setMessages([...response.data.messages, ...messages])
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [messages])

  const fetchOlderMessages = useCallback(() => {
    const oldestMessage = messages[messages.length - 1]
    if (oldestMessage !== undefined) {
      getTimeline({ before: oldestMessage.id })
        .then(response => {
          if (response.data.messages.length !== 0) {
            setMessages([...messages, ...response.data.messages])
          } else {
            setLastMessageReceived(true)
          }
        })
        .catch(() => {})
    }
  }, [messages])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const intersectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }

  const fetchOlderMessagesCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchOlderMessages()
      }
    },
    [fetchOlderMessages]
  )

  useEffect(() => {
    fetchMessages()

    // This should only be executed once on load (~ componentDidMount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(fetchOlderMessagesCallback, intersectionObserverOptions)
    const currentRef = loadMoreSpinnerRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [fetchOlderMessagesCallback, intersectionObserverOptions, loadMoreSpinnerRef])

  // periodically fetch new messages
  useEffect(() => {
    const interval = setInterval(() => fetchMessages(), settings?.refreshInterval ?? 60000)

    return () => clearInterval(interval)
  }, [fetchMessages, messages, settings?.refreshInterval])

  if (isLoading) {
    return <Loader content="Loading" />
  }

  if (messages.length === 0) {
    return <EmptyMessageList />
  }

  return (
    <div>
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
      {!lastMessageReceived && <div ref={loadMoreSpinnerRef}>Loading...</div>}
    </div>
  )
}

export default MessageList
