import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Lightbox from './Lightbox'

describe('Lightbox', () => {
  it('renders correctly', async () => {
    const onClose = vi.fn()
    const images = ['http://example.org/image1.jpg']

    render(<Lightbox images={images} onClose={onClose} />)

    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('navigates images correctly', async () => {
    const onClose = vi.fn()
    const images = ['http://example.org/image1.jpg', 'http://example.org/image2.jpg']

    render(<Lightbox images={images} onClose={onClose} />)

    expect(screen.getByRole('presentation')).toHaveAttribute('src', images[0])

    await userEvent.keyboard('{arrowright}')
    expect(screen.getByRole('presentation')).toHaveAttribute('src', images[1])

    await userEvent.keyboard('{arrowleft}')
    expect(screen.getByRole('presentation')).toHaveAttribute('src', images[0])

    await userEvent.keyboard('{escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
