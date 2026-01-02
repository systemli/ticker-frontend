import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import useTicker from '../components/useTicker'
import { getTimeline, TimelineResponse } from '../lib/api'
import { Message, WebSocketMessage } from '../lib/types'
import { useWebSocket } from './useWebSocket'

const MESSAGES_QUERY_KEY = ['messages'] as const

export type MessagesPageParam = {
  before?: number
  after?: number
}

/**
 * Hook for managing messages with infinite loading and real-time updates.
 * Handles initial loading, pagination, and live WebSocket updates.
 */
export const useMessages = () => {
  const queryClient = useQueryClient()
  const { ticker, isOffline, setIsOffline } = useTicker()
  const wasOfflineRef = useRef(isOffline)

  // When coming back online, refetch messages to fill any gaps
  useEffect(() => {
    if (wasOfflineRef.current && !isOffline) {
      // We just came back online - refetch to fill any gaps
      queryClient.refetchQueries({ queryKey: MESSAGES_QUERY_KEY })
    }
    wasOfflineRef.current = isOffline
  }, [isOffline, queryClient])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: MESSAGES_QUERY_KEY,
    queryFn: async ({ pageParam }: { pageParam?: MessagesPageParam }) => {
      try {
        return await getTimeline(pageParam || {})
      } catch (err) {
        if (err instanceof TypeError) {
          setIsOffline(true)
        }
        throw err
      }
    },
    getNextPageParam: (lastPage: TimelineResponse) => {
      // Check if there are messages in the last page
      if (lastPage.data.messages.length === 0) {
        return undefined
      }

      // Get the oldest message ID from the last page for pagination
      const oldestMessage = lastPage.data.messages[lastPage.data.messages.length - 1]
      return { before: oldestMessage.id }
    },
    initialPageParam: undefined,
    enabled: !!ticker, // Only fetch when ticker is available
  })

  // Memoized messages array from all pages
  const messages: Message[] = useMemo(() => {
    return data?.pages.flatMap(page => page.data.messages) ?? []
  }, [data?.pages])

  // Add new message to the beginning of the first page
  const addMessage = useCallback(
    (newMessage: Message) => {
      queryClient.setQueryData<InfiniteData<TimelineResponse>>(MESSAGES_QUERY_KEY, oldData => {
        if (!oldData) return oldData

        // Prevent duplicate messages
        const messageExists = oldData.pages.some(page => page.data.messages.some(msg => msg.id === newMessage.id))
        if (messageExists) return oldData

        // Add to the first page or create one if needed
        const newPages = [...oldData.pages]
        if (newPages.length > 0) {
          newPages[0] = {
            ...newPages[0],
            data: {
              ...newPages[0].data,
              messages: [newMessage, ...newPages[0].data.messages],
            },
          }
        } else {
          // Create first page if none exists
          newPages.push({
            data: { messages: [newMessage] },
          })
        }

        return {
          ...oldData,
          pages: newPages,
        }
      })
    },
    [queryClient]
  )

  // Remove message from all pages
  const removeMessage = useCallback(
    (messageId: number) => {
      queryClient.setQueryData<InfiniteData<TimelineResponse>>(MESSAGES_QUERY_KEY, oldData => {
        if (!oldData) return oldData

        const newPages = oldData.pages.map(page => ({
          ...page,
          data: {
            ...page.data,
            messages: page.data.messages.filter(msg => msg.id !== messageId),
          },
        }))

        return {
          ...oldData,
          pages: newPages,
        }
      })
    },
    [queryClient]
  )

  // WebSocket integration for real-time updates
  useWebSocket({
    enabled: !!ticker,
    onMessage: (wsMessage: WebSocketMessage) => {
      // Only handle messages for the current ticker
      if (wsMessage.tickerId !== ticker?.id) return

      switch (wsMessage.type) {
        case 'message_created':
          addMessage(wsMessage.data.message)
          break
        case 'message_deleted':
          removeMessage(wsMessage.data.messageId)
          break
        default: {
          // Log unknown message types for debugging
          const exhaustiveCheck: never = wsMessage
          console.warn('Received unknown WebSocket message type:', exhaustiveCheck)
        }
      }
    },
  })

  return {
    messages,
    fetchNextPage, // Load older messages
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  }
}
