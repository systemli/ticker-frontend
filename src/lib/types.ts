export type Ticker = {
  createdAt: string
  description: string
  id: number
  title: string
  information: TickerInformation
}

type TickerInformation = {
  author: string
  email: string
  facebook: string
  instagram: string
  threads: string
  telegram: string
  twitter: string
  url: string
  mastodon: string
  bluesky: string
}

export type Settings = {
  refreshInterval: number
  inactiveSettings: InactiveSettings
}

export type InactiveSettings = {
  author: string
  email: string
  homepage: string
  twitter: string
  headline: string
  subHeadline: string
  description: string
}

export type Message = {
  id: number
  text: string
  ticker: number
  createdAt: string
  attachments: Attachment[]
}

export type Attachment = {
  contentType: string
  url: string
}

// WebSocket message types
export type WebSocketMessageCreated = {
  type: 'message_created'
  tickerId: number
  data: {
    message: Message
  }
}

export type WebSocketMessageDeleted = {
  type: 'message_deleted'
  tickerId: number
  data: {
    messageId: number
  }
}

export type WebSocketMessage = WebSocketMessageCreated | WebSocketMessageDeleted
