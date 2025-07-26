import { FC, useCallback, useEffect, useState } from 'react'

interface Props {
  creationTime: string
}

const MessageDot: FC<Props> = ({ creationTime }) => {
  const calculateAge = useCallback(() => {
    const messageAge = Date.now() - new Date(creationTime).getTime()
    return messageAge / (1000 * 60) // age in minutes
  }, [creationTime])

  const [ageInMinutes, setAgeInMinutes] = useState(calculateAge)

  const getMessageDotClasses = useCallback((age: number) => {
    if (age < 1) {
      return 'bg-pink-600 dark:bg-pink-500 scale-110'
    } else if (age < 5) {
      return 'bg-pink-600 dark:bg-pink-500 scale-105'
    } else if (age < 15) {
      return 'bg-pink-400 dark:bg-pink-400 scale-102'
    } else if (age < 30) {
      return 'bg-pink-300 dark:bg-pink-300 scale-101'
    } else {
      return 'bg-gray-200 dark:bg-gray-600'
    }
  }, [])

  const getUpdateInterval = useCallback(() => {
    // Same adaptive logic as MessageTime
    if (ageInMinutes < 5) return 30000 // 30 seconds for very recent messages
    if (ageInMinutes < 60) return 60000 // 1 minute for messages under 1 hour
    if (ageInMinutes < 1440) return 300000 // 5 minutes for messages under 1 day
    return 1800000 // 30 minutes for older messages
  }, [ageInMinutes])

  useEffect(() => {
    const updateAge = () => {
      setAgeInMinutes(calculateAge())
    }

    const interval = setInterval(updateAge, getUpdateInterval())

    return () => clearInterval(interval)
  }, [calculateAge, getUpdateInterval])

  const isVeryNew = ageInMinutes < 1

  return (
    <div
      className={`absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white transition-all duration-1000 ease-out ${getMessageDotClasses(ageInMinutes)} dark:border-gray-950`}
    >
      {isVeryNew && <div className="absolute inset-0 scale-200 animate-pulse rounded-full bg-pink-200 opacity-75 dark:bg-pink-900"></div>}
    </div>
  )
}

export default MessageDot
