import React from 'react'
import App from './App'
import { render, screen } from '@testing-library/react'
import * as api from './lib/api'
import { Settings, Ticker } from './lib/types'

describe('App', function () {
    const initSettings = {
        refresh_interval: 1000,
        inactive_settings: {
            author: 'Systemli Ticker Team',
            email: 'admin@systemli.org',
            homepage: '',
            twitter: '',
            headline: 'The ticker is currently inactive.',
            sub_headline: 'Please contact us if you want to use it.',
            description: '...',
        },
    } as Settings
    const ticker = {
        id: '1',
        active: true,
        creation_date: new Date(),
        title: 'Ticker Title',
        description: 'Ticker Description',
        domain: 'example.com',
        information: {
            author: 'Systemli Ticker Team',
            url: '',
            email: '',
            twitter: '',
            facebook: '',
        },
    } as Ticker

    test('renders OfflineView', async function () {
        jest.spyOn(api, 'getInit').mockRejectedValue(new TypeError())
        render(<App />)

        expect(screen.getByText('Loading')).toBeInTheDocument()

        expect(
            await screen.findByText('It seems that you are offline.')
        ).toBeInTheDocument()
    })

    test('renders InactiveView', async function () {
        jest.spyOn(api, 'getInit').mockResolvedValue({
            data: {
                settings: initSettings,
                ticker: null,
            },
        })
        render(<App />)

        expect(screen.getByText('Loading')).toBeInTheDocument()

        expect(
            await screen.findByText('The ticker is currently inactive.')
        ).toBeInTheDocument()
    })

    test('renders ActiveView', async function () {
        jest.spyOn(api, 'getInit').mockResolvedValue({
            data: {
                settings: initSettings,
                ticker: ticker,
            },
        })
        jest.spyOn(api, 'getTimeline').mockResolvedValue({
            data: {
                messages: [],
            },
        })
        const intersectionObserverMock = () => ({
            observe: () => null,
        })
        window.IntersectionObserver = jest
            .fn()
            .mockImplementation(intersectionObserverMock)
        render(<App />)

        expect(screen.getByText('Loading')).toBeInTheDocument()

        expect(
            await screen.findByText(
                'The messages update automatically. There is no need to reload the entire page.'
            )
        ).toBeInTheDocument()

        expect(
            screen.getByText('We dont have any messages at the moment.')
        ).toBeInTheDocument()
    })
})
