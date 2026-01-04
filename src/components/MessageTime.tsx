import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/de'
import 'dayjs/locale/en'
import 'dayjs/locale/fr'
import { useTranslation } from 'react-i18next'
import { FC, useCallback, useEffect, useState } from 'react'
import Clock from './icons/Clock'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

interface Props {
  creationTime: string
}

const MessageTime: FC<Props> = ({ creationTime }) => {
  const getRelativeTime = useCallback((messageCreationTime: string) => {
    const now = dayjs()
    const messageTime = dayjs(messageCreationTime)
    const diffInSeconds = now.diff(messageTime, 'second')

    // Handle edge case where message appears to be in the future
    if (diffInSeconds < 0) {
      return 'a few seconds ago'
    }

    return messageTime.fromNow()
  }, [])

  const [relativeTime, setRelativeTime] = useState(() => getRelativeTime(creationTime))
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

  const { i18n } = useTranslation()
  const normalizedLang = i18n.language.split('-')[0].toLowerCase()
  let dayjsLocale = 'en'
  if (['en', 'de', 'fr'].includes(normalizedLang)) {
    dayjsLocale = normalizedLang
  }
  dayjs.locale(dayjsLocale)

  useEffect(() => {
    const updateRelativeTime = () => {
      setRelativeTime(getRelativeTime(creationTime))
    }
    // Call once to apply locale dayjs
    updateRelativeTime()

    const interval = setInterval(updateRelativeTime, getUpdateInterval())

    return () => clearInterval(interval)
  }, [creationTime, getUpdateInterval, getRelativeTime])

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
