import { render, screen } from '../test-utils'
import { vi } from 'vitest'
import ErrorView from './ErrorView'

describe('ErrorView', function () {
  const original = window.location

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: vi.fn() },
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
    expect(screen.getByRole('button')).toBeInTheDocument()

    screen.getByRole('button').click()

    expect(window.location.reload).toHaveBeenCalled()
  })
})
