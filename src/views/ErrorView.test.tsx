import React from 'react'
import { render, screen } from '@testing-library/react'
import { ErrorView } from './index'

describe('ErrorView', function () {
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

  test('renders correctly', function () {
    render(<ErrorView message="Errormessage" />)

    expect(screen.getByText('Errormessage'))

    screen.getByText('Try reload').click()

    expect(window.location.reload).toHaveBeenCalled()
  })
})
