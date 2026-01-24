import { FC } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { Message as MessageType } from '../lib/types'
import Attachments from './Attachments'
import MessageDot from './MessageDot'
import MessageTime from './MessageTime'

// Configure marked to support GitHub Flavored Markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
})

interface Props {
  message: MessageType
}

const Message: FC<Props> = ({ message }) => {
  // Process the message text with Markdown and sanitize the result
  const processedMessage = message.text ?
    DOMPurify.sanitize(marked.parse(message.text)) : null

  return (
    <article className="relative">
      <div className="ms-4 mb-10">
        <MessageDot creationTime={message.createdAt} />
        <div>
          {processedMessage && (
            <div
              className="prose prose-gray max-w-none prose-p:pt-1 first:prose-p:pt-0"
              dangerouslySetInnerHTML={{ __html: processedMessage }}
            />
          )}
          <Attachments attachments={message.attachments} />
          <MessageTime creationTime={message.createdAt} />
        </div>
      </div>
    </article>
  )
}

export default Message
