import { FC } from 'react'
import { Message as MessageType } from '../lib/types'
import Attachments from './Attachments'
import Links from './Links'
import MessageTime from './MessageTime'

interface Props {
  message: MessageType
}

const Message: FC<Props> = ({ message }) => {
  const messageAge = Date.now() - new Date(message.createdAt).getTime()
  const ageInMinutes = messageAge / (1000 * 60)

  const getMessageDotClasses = () => {
    if (ageInMinutes < 1) {
      return 'bg-pink-600 dark:bg-pink-500 scale-110'
    } else if (ageInMinutes < 5) {
      return 'bg-pink-600 dark:bg-pink-500 scale-105'
    } else if (ageInMinutes < 15) {
      return 'bg-pink-400 dark:bg-pink-400 scale-102'
    } else if (ageInMinutes < 30) {
      return 'bg-pink-300 dark:bg-pink-300 scale-101'
    } else {
      return 'bg-gray-200 dark:bg-gray-600'
    }
  }

  const isVeryNew = ageInMinutes < 1

  return (
    <article className="relative">
      <div className="ms-4 mb-10">
        <div
          className={`absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white transition-all duration-1000 ease-out ${getMessageDotClasses()} dark:border-gray-950`}
        >
          {isVeryNew && <div className="absolute inset-0 scale-200 animate-pulse rounded-full bg-pink-200 opacity-75 dark:bg-pink-900"></div>}
        </div>
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
