import { render } from '@testing-library/react'
import InformationItem from './InformationItem'

const Icon = () => null

describe('InformationItem', () => {
  it('should link to the given url', () => {
    render(<InformationItem icon={Icon} label="mastodon.social/@ticker" url="https://mastodon.social/@ticker" />)

    expect(document.querySelector('a')).toHaveAttribute('href', 'https://mastodon.social/@ticker')
    expect(document.querySelector('a')).toHaveTextContent('mastodon.social/@ticker')
  })

  it('should render a mailto link when given one', () => {
    render(<InformationItem icon={Icon} label="ticker@example.com" url="mailto:ticker@example.com" />)

    expect(document.querySelector('a')).toHaveAttribute('href', 'mailto:ticker@example.com')
  })

  it('should render plain text without url', () => {
    render(<InformationItem icon={Icon} label="Author" />)

    expect(document.querySelector('a')).toBeNull()
  })
})
