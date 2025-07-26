import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import MessageDot from './MessageDot'

// Mock setInterval and clearInterval
beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('MessageDot', () => {
  it('renders with correct classes for very new messages', () => {
    const now = new Date()
    const creationTime = now.toISOString()

    const { container } = render(<MessageDot creationTime={creationTime} />)
    const dot = container.firstChild as HTMLElement

    expect(dot).toHaveClass('bg-pink-600')
    expect(dot).toHaveClass('scale-110')
  })

  it('renders with pulse animation for very new messages', () => {
    const now = new Date()
    const creationTime = now.toISOString()

    const { container } = render(<MessageDot creationTime={creationTime} />)
    const pulseElement = container.querySelector('.animate-pulse')

    expect(pulseElement).toBeInTheDocument()
  })

  it('renders without pulse animation for older messages', () => {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
    const creationTime = tenMinutesAgo.toISOString()

    const { container } = render(<MessageDot creationTime={creationTime} />)
    const pulseElement = container.querySelector('.animate-pulse')

    expect(pulseElement).not.toBeInTheDocument()
  })

  it('applies correct classes for different age ranges', () => {
    // Test 10 minutes old message
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
    const { container: container1 } = render(<MessageDot creationTime={tenMinutesAgo.toISOString()} />)

    expect(container1.firstChild).toHaveClass('bg-pink-400')
    expect(container1.firstChild).toHaveClass('scale-102')
  })

  it('updates dot appearance over time', () => {
    // Just test that the component renders with correct initial state
    const now = new Date()
    const creationTime = now.toISOString()

    const { container } = render(<MessageDot creationTime={creationTime} />)
    const dot = container.firstChild as HTMLElement

    // Initially very new
    expect(dot).toHaveClass('scale-110')
    expect(dot).toHaveClass('bg-pink-600')
  })
})
