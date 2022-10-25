import * as api from '../lib/api'
import MessageList from './MessageList'
import { render, screen } from '@testing-library/react'

describe('MessageList', function () {
  test('renders empty Messages', async function () {
    jest.spyOn(api, 'getTimeline').mockResolvedValue({
      data: { messages: [] },
    })
    const intersectionObserverMock = () => ({
      observe: () => null,
    })
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock)

    render(<MessageList />)

    expect(screen.getByText('Loading messages')).toBeInTheDocument()
    expect(
      await screen.findByText('We dont have any messages at the moment.')
    ).toBeInTheDocument()
  })
})
