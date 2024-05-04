import Linkify from 'linkify-react'
import { FC } from 'react'

interface Props {
  message: string
}
const Links: FC<Props> = ({ message }) => {
  const render = ({ attributes }: { attributes: unknown }) => {
    const { href } = attributes as { href: string }
    const url = new URL(href)
    const content = url.hostname + url.pathname.slice(0, 20) + '...'

    return (
      <a href={href} target="_blank" title={href}>
        {content}
      </a>
    )
  }

  return <Linkify options={{ defaultProtocol: 'https', render: render }}>{message}</Linkify>
}

export default Links
