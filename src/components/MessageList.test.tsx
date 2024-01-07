import * as api from '../lib/api'
import MessageList from './MessageList'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

describe('MessageList', function () {
  test('renders empty Messages', async function () {
    vi.spyOn(api, 'getTimeline').mockResolvedValue({
      data: { messages: [] },
    })
    const intersectionObserverMock = () => ({
      observe: () => null,
    })
    window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock)

    render(<MessageList />)

    expect(screen.getByText('Loading messages')).toBeInTheDocument()
    expect(await screen.findByText('We dont have any messages at the moment.')).toBeInTheDocument()
  })
})
