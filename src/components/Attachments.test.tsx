import { render } from '@testing-library/react'
import React from 'react'
import Attachments from './Attachments'

describe('Attachment', function () {
  test('renders single image correctly', function () {
    const attachments = [
      { content_type: 'image/jpeg', url: 'https://example.com/image.jpg' },
    ]
    const { asFragment } = render(<Attachments attachments={attachments} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders multiple images as slider', function () {
    const attachments = [
      { content_type: 'image/jpeg', url: 'https://example.com/image.jpg' },
      { content_type: 'image/jpeg', url: 'https://example.com/image.jpg' },
    ]
    const { asFragment } = render(<Attachments attachments={attachments} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
