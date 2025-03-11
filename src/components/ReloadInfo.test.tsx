import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReloadInfo from './ReloadInfo'

describe('ReloadInfo', () => {
  it('should dismiss the reload info', async () => {
    render(<ReloadInfo />)

    const dismissButton = screen.getByText('Dismiss')
    expect(dismissButton).toBeInTheDocument()

    await userEvent.click(dismissButton)

    expect(dismissButton).not.toBeInTheDocument()
  })
})
