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
    expect(headline).toHaveClass('text-3xl')
  })
})
