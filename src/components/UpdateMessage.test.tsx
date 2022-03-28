import React from 'react'
import { render, screen } from '@testing-library/react'
import { UpdateMessage } from './index'

describe('UpdateMessage', function () {
  const original = window.location

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    })
  })

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: original,
    })
  })

  test('renders correctly when active', function () {
    const { asFragment } = render(<UpdateMessage update />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders nothing when dismissed', function () {
    const { asFragment } = render(<UpdateMessage update={false} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('triggers reload correctly', function () {
    render(<UpdateMessage update />)

    expect(
      screen.findByText('An update is available. Click here to update the App.')
    )

    screen.getByText('here').click()

    expect(window.location.reload).toHaveBeenCalled()
  })
})
