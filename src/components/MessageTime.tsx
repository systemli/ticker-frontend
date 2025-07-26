import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FC, useCallback, useEffect, useState } from 'react'
import Clock from './icons/Clock'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

interface Props {
  creationTime: string
}

const MessageTime: FC<Props> = ({ creationTime }) => {
  const [relativeTime, setRelativeTime] = useState(() => dayjs(creationTime).fromNow())
  const creationDate = dayjs(creationTime).format('LLLL')

  const getUpdateInterval = useCallback(() => {
    const now = dayjs()
    const messageTime = dayjs(creationTime)
    const diffInMinutes = now.diff(messageTime, 'minute')

    // Adaptive intervals based on message age
    if (diffInMinutes < 5) return 30000 // 30 seconds for very recent messages
    if (diffInMinutes < 60) return 60000 // 1 minute for messages under 1 hour
    if (diffInMinutes < 1440) return 300000 // 5 minutes for messages under 1 day
    return 1800000 // 30 minutes for older messages
  }, [creationTime])

  useEffect(() => {
    const updateRelativeTime = () => {
      setRelativeTime(dayjs(creationTime).fromNow())
    }

    const interval = setInterval(updateRelativeTime, getUpdateInterval())

    return () => clearInterval(interval)
  }, [creationTime, getUpdateInterval])

  return (
    <div className="flex-column mt-2 flex items-center text-xs">
      <div className="pr-1">
        <Clock className="size-3" />
      </div>
      <div>
        <time aria-label="Creation Time" title={creationDate}>
          <div>{relativeTime}</div>
        </time>
      </div>
    </div>
  )
}

export default MessageTime
