import { Message, Settings, Ticker } from './types'

export const ApiUrl = import.meta.env.TICKER_API_URL

type InitResponseData = {
  settings: Settings
  ticker: Ticker | null
}

export type InitResponse = {
  data: InitResponseData
}

type TimelineResponseData = {
  messages: Message[]
}

export type TimelineResponse = {
  data: TimelineResponseData
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`The server responses with an error: ${response.statusText} (${response.status})`)
  }

  return response.json().catch(() => ({}))
}

export async function getInit(): Promise<InitResponse> {
  return get(`${ApiUrl}/init`)
}

export type TimelineOpts = {
  after?: number
  before?: number
}

export async function getTimeline(opts: TimelineOpts): Promise<TimelineResponse> {
  if (opts.after != null) {
    return get(`${ApiUrl}/timeline?after=${opts.after}`)
  }

  if (opts.before != null) {
    return get(`${ApiUrl}/timeline?before=${opts.before}`)
  }

  return get(`${ApiUrl}/timeline`)
}
