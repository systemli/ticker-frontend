import { FC, useCallback, useEffect, useRef } from 'react'
import { useMessages } from '../hooks/useMessages'
import EmptyMessageList from './EmptyMessageList'
import Loader from './Loader'
import Message from './Message'
import { useTranslation } from 'react-i18next'

const MessageList: FC = () => {
  const { t } = useTranslation()
  const { messages, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useMessages()

  const loadMoreSpinnerRef = useRef<HTMLDivElement>(null)

  const fetchOlderMessagesCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  // Intersection Observer for loading older messages
  useEffect(() => {
    const observer = new IntersectionObserver(fetchOlderMessagesCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    })

    const currentRef = loadMoreSpinnerRef.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [fetchOlderMessagesCallback])

  if (isLoading) {
    return <Loader content={t('loading')} />
  }

  if (isError) {
    return <div className="p-4 text-red-600 dark:text-red-400">{t('errorLoading', { message: error?.message || t('unknownError') })}</div>
  }

  if (messages.length === 0) {
    return <EmptyMessageList />
  }

  return (
    <div>
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
      {hasNextPage && (
        <div ref={loadMoreSpinnerRef} className="py-4 text-center">
          {isFetchingNextPage ? <Loader content={t('loadingMore')} /> : <span className="text-gray-500 dark:text-gray-400">{t('loading')}</span>}
        </div>
      )}
    </div>
  )
}

export default MessageList
