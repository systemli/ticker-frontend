import { FC } from 'react'
import Description from '../components/Description'
import MessageList from '../components/MessageList'
import ReloadInfo from '../components/ReloadInfo'
import Title from '../components/Title'
import useTicker from '../components/useTicker'

const ActiveView: FC = () => {
  const { ticker } = useTicker()

  return (
    <section className="mx-auto w-full px-3 sm:w-xl md:w-2xl md:px-0">
      <div className="static">
        <div className="sticky top-0 z-10 -mx-3 bg-white dark:bg-gray-950">
          <ReloadInfo />
          <Title title={ticker!.title} />
        </div>
        <div className="border-s border-gray-200 dark:border-gray-600">
          <div className="px-4 pt-4">
            <Description ticker={ticker!} />
          </div>
          <div className="px-8 py-8 sm:px-16 md:px-24 dark:border-gray-600">
            <div className="border-t border-dotted border-gray-200 dark:border-gray-600"></div>
          </div>
          <div className="mb-4">
            <MessageList />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ActiveView
