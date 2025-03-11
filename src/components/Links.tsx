import Linkify from 'linkify-react'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}
const Links: FC<Props> = ({ children }) => {
  const format = (value: string, type: string) => {
    if (type === 'url') {
      value = value.replace(/https?:\/\//, '')
      return value.length > 30 ? `${value.slice(0, 30)}…` : value
    }
    return value
  }

  return <Linkify options={{ defaultProtocol: 'https', format: format }}>{children}</Linkify>
}

export default Links
