import { FC } from 'react'
import Description from '../components/Description'
import Divider from '../components/Divider'
import Play from '../components/icons/Play'
import MessageList from '../components/MessageList'
import ReloadInfo from '../components/ReloadInfo'
import useTicker from '../components/useTicker'

const ActiveView: FC = () => {
  const { ticker } = useTicker()

  return (
    <section className="w-full px-3 sm:w-xl md:m-auto md:w-2xl md:px-0">
      <ReloadInfo />
      <div className="border-s border-gray-200 dark:border-gray-600">
        <div className="mt-4 p-4">
          <Description ticker={ticker!} />
        </div>
        <div className="mb-4 px-20 sm:px-36">
          <Divider>
            <Play className="size-6" />
          </Divider>
        </div>
        <div className="mb-4">
          <MessageList />
        </div>
      </div>
    </section>
  )
}

export default ActiveView
