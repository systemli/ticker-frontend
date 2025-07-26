import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import MessageTime from './MessageTime'

// Mock setInterval and clearInterval
beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('MessageTime', () => {
  it('renders with relative time display', () => {
    // Use a fixed time for predictable results
    const fixedTime = new Date('2025-01-15T12:00:00Z')
    vi.setSystemTime(fixedTime)

    const creationTime = new Date('2025-01-15T11:59:50Z').toISOString() // 10 seconds ago

    const { getByLabelText } = render(<MessageTime creationTime={creationTime} />)
    const timeElement = getByLabelText('Creation Time')

    expect(timeElement).toBeInTheDocument()
    // Should show something like "a few seconds ago" or "10 seconds ago"
    expect(timeElement.textContent).toMatch(/second/)
  })

  it('shows full date in title attribute', () => {
    const testDate = new Date('2025-01-15T14:30:00Z')
    const creationTime = testDate.toISOString()

    const { getByLabelText } = render(<MessageTime creationTime={creationTime} />)
    const timeElement = getByLabelText('Creation Time')

    expect(timeElement).toHaveAttribute('title')
    expect(timeElement.getAttribute('title')).toContain('January')
    expect(timeElement.getAttribute('title')).toContain('2025')
  })

  it('renders clock icon', () => {
    const now = new Date()
    const creationTime = now.toISOString()

    const { container } = render(<MessageTime creationTime={creationTime} />)
    const clockIcon = container.querySelector('svg')

    expect(clockIcon).toBeInTheDocument()
    expect(clockIcon).toHaveClass('size-3')
  })

  it('updates relative time over time', () => {
    // Test that component renders correctly with different times
    const fixedTime = new Date('2025-01-15T12:00:00Z')
    vi.setSystemTime(fixedTime)

    const creationTime = new Date('2025-01-15T11:58:00Z').toISOString() // 2 minutes ago

    const { getByLabelText } = render(<MessageTime creationTime={creationTime} />)
    const timeElement = getByLabelText('Creation Time')

    // Should show "2 minutes ago"
    expect(timeElement.textContent).toMatch(/minute/)
  })

  it('uses appropriate update intervals based on age', () => {
    const setIntervalSpy = vi.spyOn(global, 'setInterval')

    // Set fixed time for predictable behavior
    const fixedTime = new Date('2025-01-15T12:00:00Z')
    vi.setSystemTime(fixedTime)

    // Test very recent message (should use 30s interval)
    const recentTime = new Date('2025-01-15T11:59:30Z').toISOString() // 30 seconds ago
    const { unmount } = render(<MessageTime creationTime={recentTime} />)

    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 30000)

    unmount()
    setIntervalSpy.mockClear()

    // Test older message (should use longer interval)
    const olderTime = new Date('2025-01-15T10:00:00Z').toISOString() // 2 hours ago
    render(<MessageTime creationTime={olderTime} />)

    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 300000) // 5 minutes
  })

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

    // Set fixed time
    const fixedTime = new Date('2025-01-15T12:00:00Z')
    vi.setSystemTime(fixedTime)

    const creationTime = new Date('2025-01-15T11:59:00Z').toISOString()

    const { unmount } = render(<MessageTime creationTime={creationTime} />)
    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })

  it('handles different time formats correctly', () => {
    // Test 5 minutes ago
    vi.setSystemTime(new Date('2025-01-15T12:00:00Z'))
    const fiveMinutesAgo = new Date('2025-01-15T11:55:00Z').toISOString()
    const { getByLabelText, unmount } = render(<MessageTime creationTime={fiveMinutesAgo} />)

    const content = getByLabelText('Creation Time').textContent
    expect(content).toMatch(/minute/)
    unmount()

    // Test 2 hours ago - create new component instance
    vi.setSystemTime(new Date('2025-01-15T12:00:00Z'))
    const twoHoursAgo = new Date('2025-01-15T10:00:00Z').toISOString()
    const { getByLabelText: getByLabelText2, unmount: unmount2 } = render(<MessageTime creationTime={twoHoursAgo} />)

    const hourContent = getByLabelText2('Creation Time').textContent
    expect(hourContent).toMatch(/hour/)
    unmount2()

    // Test 3 days ago - create new component instance
    vi.setSystemTime(new Date('2025-01-15T12:00:00Z'))
    const threeDaysAgo = new Date('2025-01-12T12:00:00Z').toISOString()
    const { getByLabelText: getByLabelText3 } = render(<MessageTime creationTime={threeDaysAgo} />)

    const dayContent = getByLabelText3('Creation Time').textContent
    expect(dayContent).toMatch(/day/)
  })

  it('maintains accessibility attributes', () => {
    // Set fixed time
    const fixedTime = new Date('2025-01-15T12:00:00Z')
    vi.setSystemTime(fixedTime)

    const creationTime = new Date('2025-01-15T11:59:00Z').toISOString()

    const { getByLabelText } = render(<MessageTime creationTime={creationTime} />)
    const timeElement = getByLabelText('Creation Time')

    expect(timeElement.tagName).toBe('TIME')
    expect(timeElement).toHaveAttribute('aria-label', 'Creation Time')
    expect(timeElement).toHaveAttribute('title')
  })
})
