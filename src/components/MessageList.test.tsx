import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import * as api from '../lib/api'
import MessageList from './MessageList'

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

    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(await screen.findByText("We don't have any messages at the moment.")).toBeInTheDocument()
  })
})
