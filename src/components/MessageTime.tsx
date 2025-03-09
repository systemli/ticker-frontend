import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FC } from 'react'
import Clock from './icons/Clock'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

interface Props {
  creationTime: string
}

const MessageTime: FC<Props> = ({ creationTime }) => {
  const relativeCreationDate = <div>{dayjs(creationTime).fromNow()}</div>
  const creationDate = dayjs(creationTime).format('LLLL')

  return (
    <div className="fley-column mt-2 flex items-center text-xs">
      <div className="pr-1">
        <Clock className="size-3" />
      </div>
      <div>
        <time aria-label="Creation Time" title={creationDate}>
          {relativeCreationDate}
        </time>
      </div>
    </div>
  )
}

export default MessageTime
