import { fireEvent, render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import Title from './Title'

describe('Title', () => {
  it('should render the title', () => {
    render(<Title title="Hello, world!" />)

    const headline = screen.getByRole('heading')
    expect(headline).toBeInTheDocument()
    expect(headline).toHaveClass('text-5xl')

    fireEvent.scroll(window, { target: { scrollY: 101 } })
    expect(headline).toHaveClass('max-sm:scale-66')
    expect(headline).toHaveClass('max-sm:-translate-x-15')
    expect(headline).toHaveClass('max-sm:-translate-y-5')
    expect(headline).not.toHaveClass('max-sm:scale-none')

    fireEvent.scroll(window, { target: { scrollY: 99 } })
    expect(headline).not.toHaveClass('max-sm:scale-66')
    expect(headline).not.toHaveClass('max-sm:-translate-x-15')
    expect(headline).not.toHaveClass('max-sm:-translate-y-5')
    expect(headline).toHaveClass('max-sm:scale-none')
  })
})
