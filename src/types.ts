export interface Ticker {
    active: boolean
    creation_date: Date
    description: string
    domain: string
    id: string
    title: string
    information: string
}

export interface Settings {
    refresh_interval: number
    inactive_settings: InactiveSettings
}

export interface InactiveSettings {
    author: string
    email: string
    homepage: string
    twitter: string
    headline: string
    sub_headline: string
    description: string
}
