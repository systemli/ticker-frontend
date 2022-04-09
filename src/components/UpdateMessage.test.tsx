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

  test('renders when no update is waiting', function () {
    const { asFragment } = render(<UpdateMessage />)

    expect(asFragment()).toMatchSnapshot()
  })
})
