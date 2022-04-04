import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Dimmer, Header, Icon, Loader, Segment } from 'semantic-ui-react'
import { Message as MessageType } from '../lib/types'
import Message from './Message'
import { getTimeline } from '../lib/api'

interface Props {
  refreshInterval: number
  prependTime: boolean
}

const MessageList: FC<Props> = props => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [lastMessageReceived, setLastMessageReceived] = useState<boolean>(false)

  const loadMoreSpinnerRef = useRef<HTMLDivElement>(null)

  const fetchMessages = useCallback(() => {
    const after = messages[0]?.id

    getTimeline({ after: after ? after : null })
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

  const fetchOlderMessages = useCallback(() => {
    const oldestMessage = messages[messages.length - 1]
    if (oldestMessage !== undefined) {
      getTimeline({ before: oldestMessage.id })
        .then(response => {
          if (response.data.messages !== null) {
            setMessages([...messages, ...response.data.messages])
          } else {
            setLastMessageReceived(true)
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
    }
  }, [messages])

  // FIXME: possibly triggers unnecessary rerenders
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
    const observer = new IntersectionObserver(
      fetchOlderMessagesCallback,
      intersectionObserverOptions
    )
    const currentRef = loadMoreSpinnerRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [
    fetchOlderMessagesCallback,
    intersectionObserverOptions,
    loadMoreSpinnerRef,
  ])

  // periodically fetch new messages
  useEffect(() => {
    const interval = setInterval(() => fetchMessages(), props.refreshInterval)

    return () => clearInterval(interval)
  }, [fetchMessages, messages, props.refreshInterval])

  const renderPlaceholder = () => (
    <Segment placeholder>
      <Header icon>
        <Icon color={'grey'} name="hourglass half" />
        We dont have any messages at the moment.
      </Header>
    </Segment>
  )

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
        <Message
          key={message.id}
          message={message}
          prependTime={props.prependTime}
        />
      ))}
      {!lastMessageReceived && (
        <div ref={loadMoreSpinnerRef}>
          <Loader active inline="centered" size="tiny" />
        </div>
      )}
    </div>
  )
}

export default MessageList
