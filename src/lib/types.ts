export type Ticker = {
  active: boolean
  createdAt: Date
  description: string
  domain: string
  id: string
  title: string
  information: TickerInformation
}

type TickerInformation = {
  author: string
  email: string
  facebook: string
  telegram: string
  twitter: string
  url: string
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

export enum DescriptionTypes {
  Author = 'AUTHOR',
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Homepage = 'HOMEPAGE',
  Twitter = 'TWITTER',
  Telegram = 'TELEGRAM',
}

export type Message = {
  id: string
  text: string
  ticker: number
  createdAt: Date
  attachments: Attachment[]
  // Stringified GeoJSON.FeatureCollection
  geoInformation: string
}

export type Attachment = {
  // FIXME: Enum?
  contentType: string
  url: string
}
