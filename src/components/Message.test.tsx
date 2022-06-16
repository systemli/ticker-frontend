import { render, screen } from '@testing-library/react'
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
    const { asFragment } = render(<Message message={message} />)

    expect(asFragment()).toMatchSnapshot()

    expect(screen.getByText('a few seconds ago')).toBeInTheDocument()
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
    const { asFragment } = render(<Message message={message} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
