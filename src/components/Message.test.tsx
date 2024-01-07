import { render, screen } from '@testing-library/react'
import Message from './Message'

describe('Message', function () {
  test('renders correctly', function () {
    const message = {
      id: '1',
      text: 'message',
      ticker: 1,
      createdAt: new Date(),
      attachments: [],
      geoInformation: '{"type":"FeatureCollection","features":[]}',
    }
    render(<Message message={message} />)
    expect(screen.getByText('a few seconds ago')).toBeInTheDocument()
  })
})
