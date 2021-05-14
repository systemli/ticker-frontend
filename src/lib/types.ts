export type Ticker = {
    active: boolean
    creation_date: Date
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
    twitter: string
    url: string
}

export type Settings = {
    refresh_interval: number
    inactive_settings: InactiveSettings
}

export type InactiveSettings = {
    author: string
    email: string
    homepage: string
    twitter: string
    headline: string
    sub_headline: string
    description: string
}

export enum DescriptionTypes {
    Author = 'AUTHOR',
    Email = 'EMAIL',
    Facebook = 'FACEBOOK',
    Homepage = 'HOMEPAGE',
    Twitter = 'TWITTER',
}

export type Message = {
    id: string
    text: string
    ticker: number
    creation_date: Date
    tweet_id: string
    tweet_user: string
    // FIXME
    attachements: any
    geo_information: any
}
