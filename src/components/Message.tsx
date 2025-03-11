import { FC } from 'react'
import { Message as MessageType } from '../lib/types'
import Attachments from './Attachments'
import Links from './Links'
import MessageTime from './MessageTime'

interface Props {
  message: MessageType
}

const Message: FC<Props> = ({ message }) => {
  return (
    <article className="relative">
      <div className="ms-4 mb-10">
        <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-950 dark:bg-gray-600"></div>
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
