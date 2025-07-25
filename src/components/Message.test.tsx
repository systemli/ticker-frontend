import { render, screen } from '@testing-library/react'
import Message from './Message'

describe('Message', function () {
  test('renders correctly', function () {
    const message = {
      id: 1,
      createdAt: new Date().toISOString(),
      text: 'message',
      ticker: 1,
      attachments: [],
    }
    render(<Message message={message} />)
    expect(screen.getByText('a few seconds ago')).toBeInTheDocument()
  })

  test('renders with animation for very new messages (< 1 minute)', function () {
    const veryNewMessage = {
      id: 1,
      createdAt: new Date().toISOString(), // Current time = very new
      text: 'very new message',
      ticker: 1,
      attachments: [],
    }
    render(<Message message={veryNewMessage} />)

    // Check for the pulsing ring element with animate-pulse
    const ringElement = screen.getByRole('article').querySelector('.animate-pulse')
    expect(ringElement).toBeInTheDocument()
    expect(ringElement).toHaveClass('animate-pulse')
    expect(ringElement).toHaveClass('bg-pink-200')
    expect(ringElement).toHaveClass('dark:bg-pink-900')

    // Check that the timeline dot is scaled up for very new messages
    const timelineDot = screen.getByRole('article').querySelector('.scale-110')
    expect(timelineDot).toBeInTheDocument()
  })

  test('renders without animation when older than 1 minute', function () {
    const olderMessage = {
      id: 1,
      createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
      text: 'older message',
      ticker: 1,
      attachments: [],
    }
    render(<Message message={olderMessage} />)

    // Should not have the pulsing ring
    const ringElement = screen.getByRole('article').querySelector('.animate-ping')
    expect(ringElement).not.toBeInTheDocument()

    // Should not have the very new message scaling
    const timelineDot = screen.getByRole('article').querySelector('.scale-110')
    expect(timelineDot).not.toBeInTheDocument()
  })

  test('shows pink dot for recent messages (< 5 minutes)', function () {
    const recentMessage = {
      id: 1,
      createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
      text: 'recent message',
      ticker: 1,
      attachments: [],
    }
    render(<Message message={recentMessage} />)

    const timelineDot = screen.getByRole('article').querySelector('.bg-pink-600')
    expect(timelineDot).toBeInTheDocument()
    expect(timelineDot).toHaveClass('scale-105')
  })

  test('shows gray dot for old messages (> 30 minutes)', function () {
    const oldMessage = {
      id: 1,
      createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
      text: 'old message',
      ticker: 1,
      attachments: [],
    }
    render(<Message message={oldMessage} />)

    const timelineDot = screen.getByRole('article').querySelector('.bg-gray-200')
    expect(timelineDot).toBeInTheDocument()
  })
})
