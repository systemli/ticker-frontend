import { render } from '@testing-library/react'
import Links from './Links'

describe('Links', () => {
  it('should render links', () => {
    const message = 'https://example.com/'

    render(<Links message={message} />)

    expect(document.querySelector('a')).toHaveAttribute('href', 'https://example.com/')
    expect(document.querySelector('a')).toHaveTextContent('example.com')
  })

  it('should render links without protocol', () => {
    const message = 'example.com'

    render(<Links message={message} />)

    expect(document.querySelector('a')).toHaveAttribute('href', 'https://example.com')
    expect(document.querySelector('a')).toHaveTextContent('example.com')
  })

  it('should shorten long links', () => {
    const message = 'https://www.systemli.org/2024/01/11/neue-sicherheitsma%C3%9Fnahme-gegen-mitm-angriffe-eingef%C3%BChrt/'

    render(<Links message={message} />)

    expect(document.querySelector('a')).toHaveAttribute(
      'href',
      'https://www.systemli.org/2024/01/11/neue-sicherheitsma%C3%9Fnahme-gegen-mitm-angriffe-eingef%C3%BChrt/'
    )
    expect(document.querySelector('a')).toHaveTextContent('www.systemli.org/2024/01/11/neue-sic...')
  })
})
