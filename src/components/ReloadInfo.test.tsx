import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReloadInfo } from './index'

describe('ReloadInfo', function () {
  beforeAll(function () {
    localStorage.removeItem('showReloadInfo')
  })

  test('renders correctly', async function () {
    const { container } = render(<ReloadInfo />)

    expect(
      screen.getByText(
        'The messages update automatically. There is no need to reload the entire page.'
      )
    ).toBeVisible()

    const close = container.querySelector('i.close') as HTMLElement
    const user = userEvent.setup()
    await user.click(close)

    expect(localStorage.getItem('showReloadInfo')).toBe('0')
  })

  test('not renders if dismissed', function () {
    localStorage.setItem('showReloadInfo', '0')
    const { container } = render(<ReloadInfo />)

    expect(
      screen.getByText(
        'The messages update automatically. There is no need to reload the entire page.'
      )
    ).toBeInTheDocument()
    expect(container.firstElementChild).toHaveClass('hidden')
  })
})
