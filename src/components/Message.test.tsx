import { render, screen } from '@testing-library/react'
import dayjs from 'dayjs'
import React from 'react'
import Message from './Message'

describe('Message', function () {
  test('renders correctly', function () {
    const message = {
      id: '1',
      text: 'message',
      ticker: 1,
      creation_date: new Date(),
      tweet_id: '',
      tweet_user: '',
      attachments: [],
      geo_information: '{"type":"FeatureCollection","features":[]}',
    }
    const { asFragment } = render(
      <Message message={message} prependTime={false} />
    )

    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByText('a few seconds ago')).toBeInTheDocument()
  })

  test('renders with prepended time', function () {
    const time = new Date()
    const message = {
      id: '1',
      text: 'message',
      ticker: 1,
      creation_date: time,
      tweet_id: '',
      tweet_user: '',
      attachments: [],
      geo_information: '{"type":"FeatureCollection","features":[]}',
    }

    render(<Message message={message} prependTime />)

    expect(screen.getByText(dayjs(time).format('HH:mm') + ' message'))
  })

  test('renders with map correctly', function () {
    const message = {
      id: '1',
      text: 'message',
      ticker: 1,
      creation_date: new Date(),
      tweet_id: '',
      tweet_user: '',
      attachments: [],
      geo_information:
        '{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[13.466282,52.5024]},"properties":null}]}',
    }
    const { asFragment } = render(
      <Message message={message} prependTime={false} />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
