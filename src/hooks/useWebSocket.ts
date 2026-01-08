import { useCallback, useEffect, useRef } from 'react'
import { ApiUrl } from '../lib/api'
import { WebSocketMessage } from '../lib/types'

type UseWebSocketOptions = {
  onMessage?: (message: WebSocketMessage) => void
  onOpen?: () => void
  onClose?: () => void
  onError?: (error: Event) => void
  enabled?: boolean
}

export const useWebSocket = ({ onMessage, onOpen, onClose, onError, enabled = true }: UseWebSocketOptions = {}) => {
  const socketRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const reconnectAttemptsRef = useRef(0)
  const enabledRef = useRef(enabled)

  // Keep enabled ref in sync
  enabledRef.current = enabled

  const maxReconnectAttempts = 5
  const baseReconnectDelay = 1000

  const connect = useCallback(() => {
    // Use ref to check current enabled state (prevents React StrictMode issues)
    if (!enabledRef.current) return

    // Prevent multiple connections - only check if already connected or connecting
    if (socketRef.current && (socketRef.current.readyState === WebSocket.CONNECTING || socketRef.current.readyState === WebSocket.OPEN)) {
      return
    }

    try {
      // Convert HTTP(S) URL to WS(S) URL
      let wsUrl: string
      if (ApiUrl === '/api') {
        const loc = window.location
        wsUrl = (loc.protocol === 'https:' ? 'wss://' : 'ws://') + loc.host + '/api/ws'
      } else if (ApiUrl?.startsWith('https://')) {
        wsUrl = ApiUrl.replace('https://', 'wss://') + '/ws'
      } else if (ApiUrl?.startsWith('http://')) {
        wsUrl = ApiUrl.replace('http://', 'ws://') + '/ws'
      } else {
        throw new Error('Invalid API URL: must start with http:// or https://')
      }

      socketRef.current = new WebSocket(wsUrl)

      socketRef.current.onopen = () => {
        reconnectAttemptsRef.current = 0
        onOpen?.()
      }

      socketRef.current.onmessage = event => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          onMessage?.(message)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      socketRef.current.onclose = event => {
        onClose?.()

        // Only reconnect if it's not a normal closure (1000) or server shutdown (1001)
        if (event.code === 1000 || event.code === 1001) {
          return
        }

        // Don't reconnect if component is being unmounted (disabled)
        if (!enabledRef.current) {
          return
        }

        // Attempt reconnect with exponential backoff
        if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          console.warn('Max reconnection attempts reached')
          return
        }

        const delay = baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current)
        reconnectAttemptsRef.current += 1

        reconnectTimeoutRef.current = setTimeout(() => {
          connect()
        }, delay)
      }

      socketRef.current.onerror = error => {
        onError?.(error)
      }
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
      // Attempt reconnect with exponential backoff
      if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
        return
      }

      const delay = baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current)
      reconnectAttemptsRef.current += 1

      reconnectTimeoutRef.current = setTimeout(() => {
        connect()
      }, delay)
    }
  }, [onMessage, onOpen, onClose, onError])

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
    }
  }

  useEffect(() => {
    // Add a small delay to prevent React StrictMode issues while using ref-based protection.
    // React StrictMode may invoke effects multiple times during development, and this delay ensures
    // that the WebSocket connection logic does not conflict with React's lifecycle behavior.
    // Use the strictModeDelay option to handle React StrictMode behavior.
    // The default value of 50ms was chosen as a reasonable delay to prevent conflicts
    // with React's lifecycle behavior during development. Adjust this value if needed.
    const STRICT_MODE_DELAY_MS = 50
    let timeoutId: NodeJS.Timeout | undefined
    if (enabled) {
      timeoutId = setTimeout(() => {
        connect()
      }, STRICT_MODE_DELAY_MS)
    } else {
      disconnect()
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      disconnect()
    }
  }, [enabled, connect])

  return {
    socket: socketRef.current,
    disconnect,
    reconnect: connect,
    isConnected: socketRef.current?.readyState === WebSocket.OPEN,
  }
}
