import { FC } from 'react'
import { Message as MessageType } from '../lib/types'
import Attachments from './Attachments'
import Links from './Links'
import MessageDot from './MessageDot'
import MessageTime from './MessageTime'

interface Props {
  message: MessageType
}

const Message: FC<Props> = ({ message }) => {
  return (
    <article className="relative">
      <div className="ms-4 mb-10">
        <MessageDot creationTime={message.createdAt} />
        <div>
          {message.text.split('\n').map(paragraph => (
            <p key={paragraph} className="pt-1 first:pt-0">
              <Links>{paragraph}</Links>
            </p>
          ))}
          <Attachments attachments={message.attachments} />
          <MessageTime creationTime={message.createdAt} />
        </div>
      </div>
    </article>
  )
}

export default Message
